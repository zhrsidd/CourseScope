import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import type {
  AdmissionsTestCode,
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
  countActiveFilters,
  defaultFilters,
  type FilterState,
  type TriState,
} from '@/lib/filters';
import { VERDICT_LABEL } from '@/lib/eligibility';
import { INTERVIEW_LABEL } from '@/lib/format';
import { InfoTooltip } from './InfoTooltip';
import { IconChevron, IconSearch } from './ui/icons';
import { Collapse } from './ui/Collapse';
import { CheckboxRow, Segmented, cx } from './ui/primitives';

function FilterSection({
  title,
  children,
  defaultOpen = false,
  hint,
  selected = 0,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  hint?: ReactNode;
  /** How many options are chosen in this group. Shown, so a closed group still tells you. */
  selected?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
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
    <div className="fgroup">
      <button
        type="button"
        onClick={() => {
          touched.current = true;
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-controls={bodyId}
        className="fgroup-btn"
      >
        <span className="flex items-center gap-1">
          {title}
          {hint}
        </span>
        {selected > 0 ? (
          <span className="sel" aria-hidden="true">
            {selected}
          </span>
        ) : null}
        <IconChevron className="chev" aria-hidden />
      </button>
      <Collapse open={open} id={bodyId}>
        <div className="fgroup-body">{children}</div>
      </Collapse>
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
    <div className="py-1">
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
  variant = 'rail',
}: {
  variant?: 'rail' | 'sheet';
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

  const ranked = universities.some((u) => u.rankings.length > 0);
  const subjectReqCount =
    (filters.mathematics !== 'any' ? 1 : 0) +
    (filters.physics !== 'any' ? 1 : 0) +
    (filters.chemistry !== 'any' ? 1 : 0) +
    (filters.furtherMathematics !== 'any' ? 1 : 0);

  return (
    <aside
      className={cx(variant === 'rail' ? 'rail' : 'sheet-filters')}
      aria-label="Filters"
    >
      <div className="rail-head">
        {variant === 'rail' ? (
          <h2>Filters{active > 0 ? <span className="ml-2 text-sm font-medium text-accent">{active} active</span> : null}</h2>
        ) : (
          <p className="text-base font-semibold">
            {active > 0 ? `${active} filters active` : 'Filter courses'}
          </p>
        )}
        <button
          type="button"
          className="rail-reset"
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

      {hasProfile ? (
        <FilterSection title="Match against your grades" defaultOpen selected={filters.eligibility.length}>
          <p className="rail-note">These are the same results shown on each course. This only filters by them.</p>
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

      <FilterSection title="Physics or Engineering" defaultOpen selected={filters.categories.length}>
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

      <FilterSection title="Course subject" selected={filters.subcategories.length}>
        <div className="max-h-72 overflow-y-auto pr-1">
          {SUBJECT_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div className="rail-label">{cat.label}</div>
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

      <FilterSection title="University" selected={filters.universityIds.length}>
        <div className="relative mb-2">
          <IconSearch
            width={16}
            height={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            className="field pl-9"
            placeholder="Find a university"
            aria-label="Find a university"
            value={uniQuery}
            onChange={(e) => setUniQuery(e.target.value)}
          />
        </div>
        <div className="max-h-64 overflow-y-auto pr-1">
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

      <p className="rail-label" style={{ marginTop: 20 }}>
        Entry requirements
      </p>

      <FilterSection title="Subject requirements" selected={subjectReqCount}>
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
          <div className="mb-1.5 flex items-center gap-1 text-sm text-ink">
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
            className="field"
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

      <FilterSection title="Grades" selected={filters.maxOffer ? 1 : 0}>
        <p className="rail-note">Show offers at or below</p>
        <div className="flex flex-wrap gap-1.5">
          {['A*A*A', 'A*AA', 'AAA', 'AAB', 'ABB', 'BBB'].map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={filters.maxOffer === p}
              onClick={() => set('maxOffer', filters.maxOffer === p ? null : p)}
              className="rail-chip"
            >
              {p}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Admissions test" selected={filters.admissionsTests.length}>
        {ADMISSIONS_TESTS.filter((t) => (testCounts.get(t.code) ?? 0) > 0 || filters.admissionsTests.includes(t.code)).map(
          (t) => (
            <CheckboxRow
              key={t.code}
              checked={filters.admissionsTests.includes(t.code)}
              onChange={() =>
                set('admissionsTests', toggle(filters.admissionsTests, t.code as AdmissionsTestCode))
              }
              label={<span title={t.fullName}>{t.shortName}</span>}
              count={testCounts.get(t.code) ?? 0}
            />
          ),
        )}
      </FilterSection>

      <FilterSection title="Interview" selected={filters.interview.length}>
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

      <p className="rail-label" style={{ marginTop: 20 }}>
        About the course
      </p>

      <FilterSection title="Qualification" selected={filters.degreeTypes.length}>
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

      <FilterSection title="Course duration" selected={filters.durations.length}>
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

      <FilterSection title="Location" selected={filters.regions.length}>
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

      {ranked ? (
        <FilterSection title="University ranking" selected={filters.maxOverallRank ? 1 : 0}>
          <p className="rail-note">
            Uses the overall ranking recorded for each university. Universities with no ranking data are
            excluded when this filter is on.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[10, 25, 50, 100, 200].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={filters.maxOverallRank === n}
                onClick={() => set('maxOverallRank', filters.maxOverallRank === n ? null : n)}
                className="rail-chip"
              >
                Top {n}
              </button>
            ))}
          </div>
        </FilterSection>
      ) : null}

      <FilterSection
        title="Data status"
        defaultOpen={hasVerifiedData}
        selected={(filters.showSampleData && statusCounts.demo > 0 ? 1 : 0) + (filters.showAwaitingData ? 1 : 0)}
      >
        <p className="rail-note">Records are kept separate by how far they have been checked.</p>
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
        <p className="rail-note" style={{ marginTop: 8 }}>
          Courses awaiting research are real courses whose admissions information we have not verified
          yet. They are different from courses whose university has not yet published its requirements.
          Those always appear, labelled “awaiting publication”.
        </p>
      </FilterSection>

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
