import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type {
  AdmissionsTestCode,
  ApplicationYear,
  Course,
  DegreeType,
  EligibilityReport,
  EligibilityVerdict,
  FurtherMathsStatus,
  InterviewPolicy,
  SubjectCategory,
  SubjectSubcategory,
  University,
} from '@/types';
import {
  ADMISSIONS_TESTS,
  DEGREE_TYPES,
  FURTHER_MATHS_LABEL,
  FURTHER_MATHS_STATUSES,
  SUBCATEGORIES,
  SUBJECT_CATEGORIES,
} from '@/data/taxonomy';
import {
  APPLICATION_YEARS,
  countActiveFilters,
  defaultFilters,
  type FilterState,
  type TriState,
} from '@/lib/filters';
import { VERDICT_LABEL } from '@/lib/eligibility';
import { INTERVIEW_LABEL } from '@/lib/format';
import { InfoTooltip } from './InfoTooltip';
import { useApp } from '@/state/AppContext';
import { IconChevron, IconSearch } from './ui/icons';
import { Badge, CheckboxRow, Segmented, cx } from './ui/primitives';

function FilterSection({
  title,
  children,
  defaultOpen = false,
  hint,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  hint?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  /*
   * The catalogue loads asynchronously, so a section whose `defaultOpen`
   * depends on the data (Data status opens only once verified records exist)
   * mounts before the answer is known. Without this, the section stayed shut
   * for the whole session and the wording explaining the difference between
   * "awaiting research" and "awaiting publication" was never on screen.
   * Once the reader has touched the section, their choice wins.
   */
  const touched = useRef(false);
  useEffect(() => {
    if (!touched.current) setOpen(defaultOpen);
  }, [defaultOpen]);
  return (
    <div className="border-b border-slate-200 py-2.5 last:border-0">
      <button
        type="button"
        onClick={() => {
          touched.current = true;
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="flex items-center gap-1 text-[13px] font-semibold text-navy-950">
          {title}
          {hint}
        </span>
        <IconChevron
          width={14}
          height={14}
          className={cx('shrink-0 text-slate-400 transition-transform', open && 'rotate-90')}
        />
      </button>
      {open ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}

function TriStateControl({
  value,
  onChange,
  label,
  term,
}: {
  value: TriState;
  onChange: (next: TriState) => void;
  label: string;
  term?: string;
}) {
  return (
    <div className="py-1.5">
      <span className="mb-1 flex items-center gap-1 text-sm text-ink">
        {label}
        {term ? <InfoTooltip term={term} /> : null}
      </span>
      <Segmented<TriState>
        size="sm"
        value={value}
        onChange={onChange}
        options={[
          { id: 'any', label: 'Any' },
          { id: 'required', label: 'Required' },
          { id: 'not-required', label: 'Not req.' },
        ]}
      />
    </div>
  );
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function FilterSidebar({
  filters,
  onChange,
  universities,
  courses,
  hasProfile,
  hasVerifiedData,
  eligibility,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  universities: University[];
  courses: Course[];
  hasProfile: boolean;
  hasVerifiedData: boolean;
  /**
   * The engine's verdicts, exactly as the result list uses them. The sidebar
   * only counts them — it never re-derives eligibility of its own.
   */
  eligibility: Record<string, EligibilityReport>;
}) {
  const { setProfile } = useApp();
  const [uniQuery, setUniQuery] = useState('');
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const active = countActiveFilters(filters);

  /**
   * Every facet count is taken over the SAME universe the results list shows.
   *
   * Before this, the sidebar counted records the list was hiding: "Physics 31"
   * next to 25 visible courses, because research targets were counted but not
   * displayed. A count that disagrees with the list reads as though courses are
   * being withheld, so both now start from the same set — the entry year plus
   * whichever data-status switches are on.
   */
  const visibleUniverse = useMemo(
    () =>
      courses.filter(
        (c) =>
          c.applicationYear === filters.applicationYear &&
          (filters.showSampleData || c.provenance.verificationStatus !== 'demo') &&
          (filters.showAwaitingData || c.provenance.verificationStatus !== 'awaiting-data'),
      ),
    [courses, filters.applicationYear, filters.showSampleData, filters.showAwaitingData],
  );

  /**
   * The data-status switches themselves must count what turning them ON would
   * add, so they are counted over the year alone.
   */
  const yearCourses = useMemo(
    () => courses.filter((c) => c.applicationYear === filters.applicationYear),
    [courses, filters.applicationYear],
  );

  const countBy = <T extends string | number>(pick: (c: Course) => T) => {
    const map = new Map<T, number>();
    for (const c of visibleUniverse) map.set(pick(c), (map.get(pick(c)) ?? 0) + 1);
    return map;
  };

  const uniCounts = countBy((c) => c.universityId);
  const subCounts = countBy((c) => c.subjectSubcategory);
  const degreeCounts = countBy((c) => c.degreeType);
  // -1 stands for "duration not recorded" and is filtered out of the UI below.
  const durationCounts = countBy((c) => c.durationYears ?? -1);
  const testCounts = countBy((c) => c.admissionsTest.code);
  const interviewCounts = countBy((c) => c.interview);
  const regionCounts = new Map<string, number>();
  for (const c of visibleUniverse) {
    const region = universities.find((u) => u.id === c.universityId)?.region;
    if (region) regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
  }

  const statusCounts = {
    demo: yearCourses.filter((c) => c.provenance.verificationStatus === 'demo').length,
    awaiting: yearCourses.filter((c) => c.provenance.verificationStatus === 'awaiting-data').length,
  };

  const filteredUniversities = universities
    .filter((u) => u.name.toLowerCase().includes(uniQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <aside className="surface sticky top-[76px] max-h-[calc(100vh-96px)] overflow-y-auto p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-navy-950">Filters</h2>
        <div className="flex items-center gap-2">
          {active > 0 ? <Badge tone="navy">{active} active</Badge> : null}
          <button
            type="button"
            className="text-xs text-navy-700 hover:underline"
            onClick={() =>
              onChange({
                ...defaultFilters(hasVerifiedData),
                query: filters.query,
                sort: filters.sort,
                // Reset clears filters, not the student's chosen entry year.
                applicationYear: filters.applicationYear,
              })
            }
          >
            Reset
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 pb-3">
        <div className="label mb-1.5 flex items-center gap-1">
          Entry year
          <InfoTooltip term="application-year" />
        </div>
        <Segmented<ApplicationYear>
          size="sm"
          value={filters.applicationYear}
          onChange={(y) => {
            set('applicationYear', y);
            // The entry year is ONE saved choice, whichever switch sets it. Without
            // this, picking 2028 here was forgotten on reload while the same
            // choice in "Your A-Levels" was remembered.
            setProfile((prev) => (prev.applicationYear === y ? prev : { ...prev, applicationYear: y }));
          }}
          options={APPLICATION_YEARS.map((y) => ({ id: y, label: `${y} entry` }))}
        />
      </div>

      {hasProfile ? (
        <FilterSection title="Match against your grades" defaultOpen>
          <p className="mb-1.5 text-xs leading-relaxed text-ink-muted">
            These are the same results shown on each course — this only filters by them.
          </p>
          {/* Ticking nothing is "all courses"; the row makes that visible and
              gives a one-click way back to it. */}
          <CheckboxRow
            checked={filters.eligibility.length === 0}
            onChange={() => set('eligibility', [])}
            label="All courses"
            count={visibleUniverse.length}
          />
          {(
            ['meets', 'review-required', 'does-not-meet', 'insufficient-information'] as EligibilityVerdict[]
          ).map((s) => (
            <CheckboxRow
              key={s}
              checked={filters.eligibility.includes(s)}
              onChange={() => set('eligibility', toggle(filters.eligibility, s))}
              label={VERDICT_LABEL[s]}
              count={
                visibleUniverse.filter(
                  (c) => (eligibility[c.id]?.verdict ?? 'insufficient-information') === s,
                ).length
              }
            />
          ))}
        </FilterSection>
      ) : null}

      <FilterSection title="Data status" defaultOpen={hasVerifiedData}>
        <p className="mb-1.5 text-xs leading-relaxed text-ink-muted">
          Records are kept separate by how far they have been checked.
        </p>
        {/* Hidden once no sample records remain: an always-zero toggle reads
            as though real courses were being withheld. */}
        {statusCounts.demo > 0 ? (
          <CheckboxRow
            checked={filters.showSampleData}
            onChange={(v) => set('showSampleData', v)}
            label="Include sample data"
            count={statusCounts.demo}
          />
        ) : null}
        <CheckboxRow
          checked={filters.showAwaitingData}
          onChange={(v) => set('showAwaitingData', v)}
          label="Include courses awaiting research"
          count={statusCounts.awaiting}
        />
        <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
          Courses awaiting research are real courses whose admissions
          information we have not verified yet. They are different from courses
          whose university has not yet published its requirements — those always
          appear, labelled “awaiting publication”.
        </p>
      </FilterSection>

      <FilterSection title="Physics or Engineering" defaultOpen>
        {SUBJECT_CATEGORIES.map((c) => (
          <CheckboxRow
            key={c.id}
            checked={filters.categories.includes(c.id)}
            onChange={() => set('categories', toggle(filters.categories, c.id as SubjectCategory))}
            label={c.label}
            count={visibleUniverse.filter((x) => x.subjectCategory === c.id).length}
          />
        ))}
      </FilterSection>

      <FilterSection title="Course subject">
        <div className="max-h-64 overflow-y-auto pr-1">
          {SUBJECT_CATEGORIES.map((cat) => (
            <div key={cat.id} className="mb-2">
              <div className="label mb-1">{cat.label}</div>
              {SUBCATEGORIES.filter((s) => s.category === cat.id).map((s) => (
                <CheckboxRow
                  key={s.id}
                  checked={filters.subcategories.includes(s.id)}
                  onChange={() =>
                    set('subcategories', toggle(filters.subcategories, s.id as SubjectSubcategory))
                  }
                  label={s.label}
                  count={subCounts.get(s.id) ?? 0}
                />
              ))}
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Subject requirements" defaultOpen>
        <TriStateControl
          label="Mathematics"
          value={filters.mathematics}
          onChange={(v) => set('mathematics', v)}
          term="required-subject"
        />
        <TriStateControl label="Physics" value={filters.physics} onChange={(v) => set('physics', v)} />
        <TriStateControl
          label="Chemistry"
          value={filters.chemistry}
          onChange={(v) => set('chemistry', v)}
        />
        <div className="mt-2 border-t border-slate-100 pt-2">
          <div className="label mb-1.5 flex items-center gap-1">
            Further Mathematics
            <InfoTooltip term="further-maths" />
          </div>
          {/*
            The visible "Further Mathematics" label sits in a div rather than a
            <label>, because it also hosts a tooltip trigger — so the select had
            no programmatic name. An explicit aria-label is the smallest correct
            fix and does not disturb the layout.
          */}
          <select
            className="field h-9 py-1.5"
            aria-label="Filter by Further Mathematics requirement"
            value={filters.furtherMathematics}
            onChange={(e) => set('furtherMathematics', e.target.value as 'any' | FurtherMathsStatus)}
          >
            <option value="any">Any</option>
            {FURTHER_MATHS_STATUSES.map((level) => (
              <option key={level} value={level}>
                {FURTHER_MATHS_LABEL[level]}
              </option>
            ))}
          </select>
        </div>
      </FilterSection>

      <FilterSection title="Grades">
        <label className="label mb-1.5 block">Show offers at or below</label>
        <div className="flex flex-wrap gap-1.5">
          {['A*A*A', 'A*AA', 'AAA', 'AAB', 'ABB', 'BBB'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => set('maxOffer', filters.maxOffer === p ? null : p)}
              className={cx(
                'rounded border px-2 py-1 text-xs font-semibold tabular-nums',
                filters.maxOffer === p
                  ? 'border-navy-800 bg-navy-900 text-white'
                  : 'border-slate-300 bg-white text-ink-muted hover:bg-slate-50',
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Admissions test">
        {ADMISSIONS_TESTS.filter((t) => (testCounts.get(t.code) ?? 0) > 0 || filters.admissionsTests.includes(t.code)).map(
          (t) => (
            <CheckboxRow
              key={t.code}
              checked={filters.admissionsTests.includes(t.code)}
              onChange={() =>
                set('admissionsTests', toggle(filters.admissionsTests, t.code as AdmissionsTestCode))
              }
              label={
                <span title={t.fullName}>
                  {t.shortName}
                </span>
              }
              count={testCounts.get(t.code) ?? 0}
            />
          ),
        )}
      </FilterSection>

      <FilterSection title="Interview">
        {(['yes', 'sometimes', 'no', 'not-stated'] as InterviewPolicy[]).map((i) => (
          <CheckboxRow
            key={i}
            checked={filters.interview.includes(i)}
            onChange={() => set('interview', toggle(filters.interview, i))}
            label={INTERVIEW_LABEL[i]}
            count={interviewCounts.get(i) ?? 0}
          />
        ))}
      </FilterSection>

      <FilterSection title="Qualification">
        {DEGREE_TYPES.filter((d) => (degreeCounts.get(d.id) ?? 0) > 0).map((d) => (
          <CheckboxRow
            key={d.id}
            checked={filters.degreeTypes.includes(d.id)}
            onChange={() => set('degreeTypes', toggle(filters.degreeTypes, d.id as DegreeType))}
            label={<span title={d.description}>{d.label}</span>}
            count={degreeCounts.get(d.id) ?? 0}
          />
        ))}
      </FilterSection>

      <FilterSection title="Course duration">
        {[...durationCounts.keys()]
          .filter((y) => y > 0)
          .sort((a, b) => a - b)
          .map((years) => (
            <CheckboxRow
              key={years}
              checked={filters.durations.includes(years)}
              onChange={() => set('durations', toggle(filters.durations, years))}
              label={`${years} years`}
              count={durationCounts.get(years) ?? 0}
            />
          ))}
      </FilterSection>

      <FilterSection title="University">
        <div className="relative mb-2">
          <IconSearch
            width={14}
            height={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="field h-8 py-1 pl-8 text-xs"
            placeholder="Find a university"
            value={uniQuery}
            onChange={(e) => setUniQuery(e.target.value)}
          />
        </div>
        <div className="max-h-56 overflow-y-auto pr-1">
          {filteredUniversities.map((u) => (
            <CheckboxRow
              key={u.id}
              checked={filters.universityIds.includes(u.id)}
              onChange={() => set('universityIds', toggle(filters.universityIds, u.id))}
              label={u.name}
              count={uniCounts.get(u.id) ?? 0}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Location">
        {[...regionCounts.keys()].sort().map((region) => (
          <CheckboxRow
            key={region}
            checked={filters.regions.includes(region)}
            onChange={() => set('regions', toggle(filters.regions, region))}
            label={region}
            count={regionCounts.get(region) ?? 0}
          />
        ))}
      </FilterSection>

      {universities.some((u) => u.rankings.length > 0) ? (
      <FilterSection title="University ranking">
        <p className="mb-2 text-xs text-ink-muted">
          Uses the overall ranking recorded for each university. Universities with no ranking data are
          excluded when this filter is on.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[10, 25, 50, 100, 200].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set('maxOverallRank', filters.maxOverallRank === n ? null : n)}
              className={cx(
                'rounded border px-2 py-1 text-xs font-medium tabular-nums',
                filters.maxOverallRank === n
                  ? 'border-navy-800 bg-navy-900 text-white'
                  : 'border-slate-300 bg-white text-ink-muted hover:bg-slate-50',
              )}
            >
              Top {n}
            </button>
          ))}
        </div>
      </FilterSection>
      ) : null}

      <div className="pt-3">
        <CheckboxRow
          checked={filters.onlyShortlisted}
          onChange={(v) => set('onlyShortlisted', v)}
          label="Only my saved courses"
        />
      </div>
    </aside>
  );
}
