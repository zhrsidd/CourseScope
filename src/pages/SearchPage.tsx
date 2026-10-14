import { useEffect, useMemo, useRef, useState } from 'react';
import { usePageTitle } from '@/lib/page-title';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ActiveFilters } from '@/components/ActiveFilters';
import { CourseRow } from '@/components/CourseRow';
import { EntryYearSwitch } from '@/components/EntryYearSwitch';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchBar } from '@/components/SearchBar';
import { UrlNotice } from '@/components/UrlNotice';
import { StudentProfileForm } from '@/components/StudentProfilePanel';
import { Drawer } from '@/components/ui/Drawer';
import { IconFilter, IconGrades, IconSearch } from '@/components/ui/icons';
import { Badge, EmptyState, RowSkeleton, Select, cx } from '@/components/ui/primitives';
import {
  SORT_OPTIONS,
  applyFilters,
  defaultFilters,
  matchedStudyOptionNames,
  RESULT_PAGE_SIZE,
  type FilterState,
  type SortKey,
} from '@/lib/filters';
import { parseQuery } from '@/lib/search';
import { filtersToSearch, parseSearch, yearFromSearch, type UrlProblem } from '@/lib/search-url';
import { filledGrades, profileIsEmpty, sortGradesDesc } from '@/lib/grades';
import { useApp } from '@/state/AppContext';

const PAGE_SIZE = RESULT_PAGE_SIZE;

export function SearchPage() {
  // The home page carries the full descriptive title: "CourseScope — UK Physics
  // & Engineering Course Finder". Inner pages put their own subject first.
  usePageTitle('Search courses');
  const {
    loading,
    error,
    courses,
    universities,
    universityById,
    eligibility,
    profile,
    setEntryYear,
    setYearOverride,
    savedEntryYear,
    savedCourseIds,
    compareIds,
    hasVerifiedData,
  } = useApp();

  // Ranking sorts are offered only when verified rankings exist to sort by.
  const hasRankings = universities.some((u) => u.rankings.length > 0);

  const location = useLocation();
  const navigate = useNavigate();
  // Start on the visitor's year from the first render, so the list never
  // flashes the default year before the sync effect below corrects it. The
  // address supplies every other selection (legacy q / category / subcategory /
  // university links included); see src/lib/search-url.ts.
  const [initial] = useState(() =>
    parseSearch(location.search, { ...defaultFilters(false), applicationYear: profile.applicationYear }),
  );
  const [filters, setFilters] = useState<FilterState>(initial.filters);
  // Values in the address that could not be applied. They stay in the address and are
  // reported on the page until the reader removes them; they are never dropped quietly.
  const [problems, setProblems] = useState<UrlProblem[]>(initial.problems);
  const [unknownRaw, setUnknownRaw] = useState<[string, string][]>(initial.raw);
  const unknownRef = useRef(unknownRaw);
  unknownRef.current = unknownRaw;
  const lastAddress = useRef<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const filtersBtnRef = useRef<HTMLButtonElement>(null);

  /* Once real records exist, placeholders stop being shown by default. */
  const appliedVerifiedDefault = useRef(false);
  useEffect(() => {
    if (!loading && hasVerifiedData && !appliedVerifiedDefault.current) {
      appliedVerifiedDefault.current = true;
      setFilters((f) => ({ ...f, showSampleData: false }));
    }
  }, [loading, hasVerifiedData]);

  /* Keep the entry-year selector and the student profile in step. */
  useEffect(() => {
    setFilters((f) =>
      f.applicationYear === profile.applicationYear ? f : { ...f, applicationYear: profile.applicationYear },
    );
  }, [profile.applicationYear]);

  /*
   * THE ADDRESS AND THE FILTERS STAY IN STEP, IN BOTH DIRECTIONS.
   *
   * Filters -> address: each change rewrites `#/search?...` so the page can be
   * shared, bookmarked and refreshed. Typing and year changes REPLACE the current
   * history entry; any other change PUSHES one, so Back steps through filter
   * changes without a keystroke-by-keystroke trail.
   *
   * Address -> filters: Back, Forward, or a pasted link change the address; the
   * filters follow. Both effects compare canonical strings, so neither can
   * trigger the other in a loop. A year in the address is shown for this visit
   * only (setYearOverride) and is never saved.
   */
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const lastWritten = useRef<{ filters: FilterState; raw: string } | null>(null);
  useEffect(() => {
    // Our own rewrites of the address are not news: only Back, Forward or a pasted link are.
    if (location.search === lastAddress.current) {
      lastAddress.current = null;
      return;
    }
    const parsedUrl = parseSearch(location.search, filtersRef.current);
    const fromUrl = parsedUrl.filters;
    const wantYear = yearFromSearch(location.search);
    if (wantYear) {
      fromUrl.applicationYear = wantYear;
      setYearOverride(wantYear);
    } else {
      // An address with no year means "my saved choice", not "whatever a previous link said".
      setYearOverride(null);
      fromUrl.applicationYear = savedEntryYear;
    }
    setProblems(parsedUrl.problems);
    if (JSON.stringify(parsedUrl.raw) !== JSON.stringify(unknownRef.current)) setUnknownRaw(parsedUrl.raw);
    if (
      filtersToSearch(fromUrl, parsedUrl.raw) !== filtersToSearch(filtersRef.current, unknownRef.current)
    )
      setFilters(fromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const next = filtersToSearch(filters, unknownRaw);
    if (next === location.search) return;
    const prev = lastWritten.current;
    lastWritten.current = { filters, raw: JSON.stringify(unknownRaw) };
    const sameButTyping =
      prev === null ||
      (prev.raw === JSON.stringify(unknownRaw) &&
        filtersToSearch({ ...prev.filters, query: '', applicationYear: '2027' }) ===
          filtersToSearch({ ...filters, query: '', applicationYear: '2027' }));
    // Rewriting an address into its canonical spelling (adding the year, ordering the
    // parameters, merging unrecognised values back in) is the same search, so it
    // replaces the entry instead of adding one that Back would have to step through.
    const current = parseSearch(location.search, filters);
    current.filters.applicationYear = yearFromSearch(location.search) ?? filters.applicationYear;
    const onlyCanonicalising = filtersToSearch(current.filters, current.raw) === next;
    lastAddress.current = next;
    navigate({ pathname: '/search', search: next }, { replace: sameButTyping || onlyCanonicalising });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, unknownRaw]);

  const parsed = useMemo(() => parseQuery(filters.query), [filters.query]);

  /*
   * Progressive rendering. Filtering the whole catalogue costs a couple of
   * milliseconds; RENDERING every match is what cost seconds once a search
   * could return several hundred cards. So the list renders one page at a
   * time and the reader asks for more.
   *
   * The slice resets only when the RESULT SET ITSELF changes — a new query, a
   * new filter, a different sort or entry year. It deliberately does not reset
   * when the student profile or the shortlist changes, because those alter the
   * verdicts shown on cards rather than which courses matched, and resetting
   * would throw away a reader's place mid-scroll.
   */
  const resetKey = useMemo(() => JSON.stringify(filters), [filters]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [resetKey]);

  /*
   * A filter in the address whose values are ALL unrecognised can match nothing, so the
   * list is empty rather than quietly unfiltered. Unknown universities and locations
   * stay in the filters and match nothing on their own; they are only reported here.
   */
  const catalogueProblems = useMemo<UrlProblem[]>(() => {
    if (loading) return [];
    const out: UrlProblem[] = [];
    const badUnis = filters.universityIds.filter((id) => !universityById[id]);
    if (badUnis.length)
      out.push({ key: 'university', value: badUnis.join(','), kind: badUnis.length === filters.universityIds.length ? 'blocks' : 'partial' });
    const knownRegions = new Set(universities.map((u) => u.region));
    const badRegions = filters.regions.filter((r) => !knownRegions.has(r));
    if (badRegions.length)
      out.push({ key: 'region', value: badRegions.join(','), kind: badRegions.length === filters.regions.length ? 'blocks' : 'partial' });
    return out;
  }, [loading, filters.universityIds, filters.regions, universityById, universities]);
  const allProblems = useMemo(() => [...problems, ...catalogueProblems], [problems, catalogueProblems]);
  const blocked = allProblems.some((p) => p.kind === 'blocks');

  const results = useMemo(
    () =>
      problems.some((p) => p.kind === 'blocks')
        ? []
        : applyFilters({
            courses,
            universities: universityById,
            filters,
            parsed,
            eligibility,
            shortlistedCourseIds: savedCourseIds,
          }),
    [problems, courses, universityById, filters, parsed, eligibility, savedCourseIds],
  );
  const clearProblems = () => {
    setProblems([]);
    setUnknownRaw([]);
    const knownRegions = new Set(universities.map((u) => u.region));
    setFilters((f) => ({
      ...f,
      universityIds: f.universityIds.filter((id) => universityById[id]),
      regions: f.regions.filter((r) => knownRegions.has(r)),
    }));
  };

  const visible = useMemo(() => results.slice(0, visibleCount), [results, visibleCount]);
  const remaining = results.length - visible.length;

  const hasProfile = !profileIsEmpty(profile);
  const matchCounts = useMemo(() => {
    const counts = { meets: 0, review: 0 };
    for (const c of results) {
      const verdict = eligibility[c.id]?.verdict;
      if (verdict === 'meets') counts.meets += 1;
      if (verdict === 'review-required') counts.review += 1;
    }
    return counts;
  }, [results, eligibility]);

  const gradeString = sortGradesDesc(filledGrades(profile).map((e) => e.grade)).join('');
  const resetFilters = () => {
    setProblems([]);
    setUnknownRaw([]);
    setFilters({
      ...defaultFilters(hasVerifiedData),
      query: filters.query,
      sort: filters.sort,
      applicationYear: filters.applicationYear,
    });
  };
  const chooseYear = (y: FilterState['applicationYear']) => {
    setFilters((f) => ({ ...f, applicationYear: y }));
    // The entry year is ONE saved choice, whichever switch sets it, and it is
    // saved only here, in response to someone pressing a year.
    setEntryYear(y);
  };

  return (
    <>
      <div className="ex-top">
        <div className="wrap ex-top-in">
          <div>
            <h1>Find the right UK Physics or Engineering course</h1>
            <p className="ex-lede">
              Compare published entry requirements, admissions tests and application routes across UK
              universities.
            </p>
            {/*
              One line, above the fold, doing two jobs the footer cannot: it says
              where the data comes from, and it says what a match does and does not
              mean. A reader who never opens the methodology page should still not
              be able to mistake a green badge for an offer.
            */}
            <p className="ex-trust">
              Every requirement here is read from the university’s own page for a specific entry year.
              Matching them means you meet the published academic requirements. It does not predict an
              offer.{' '}
              <Link to="/about" className="link">
                How this works
              </Link>
            </p>
          </div>
          <div className="ex-tools">
            <EntryYearSwitch value={filters.applicationYear} onChange={chooseYear} />
            <button
              ref={profileBtnRef}
              type="button"
              className="btn-secondary"
              aria-haspopup="dialog"
              aria-expanded={showProfile}
              onClick={() => setShowProfile(true)}
            >
              <IconGrades width={18} height={18} />
              <span>Your A-Levels</span>
              {hasProfile ? (
                <span className="rounded-chip bg-navy-900 px-1.5 text-xs font-semibold tabular-nums text-white">
                  {gradeString}
                </span>
              ) : null}
            </button>
          </div>
        </div>
        <div className="wrap ex-search">
          <SearchBar
            value={filters.query}
            onChange={(query) => setFilters((f) => ({ ...f, query }))}
            parsed={parsed}
          />
        </div>
      </div>

      <div className="wrap ex" style={compareIds.length > 0 ? { paddingBottom: 120 } : undefined}>
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          universities={universities}
          courses={courses}
          hasProfile={hasProfile}
          hasVerifiedData={hasVerifiedData}
          eligibility={eligibility}
        />

        <section className="min-w-0" aria-labelledby="results-heading">
          <h2 id="results-heading" className="sr-only">
            Results
          </h2>
          <div className="res-bar">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="res-count" aria-live="polite">
                {loading
                  ? 'Loading courses…'
                  : remaining > 0
                    ? `Showing ${visible.length} of ${results.length} courses`
                    : `${results.length} courses`}
              </span>
              {hasProfile && !loading ? (
                <>
                  {matchCounts.meets > 0 ? (
                    <Badge tone="green">{matchCounts.meets} meet published requirements</Badge>
                  ) : null}
                  {matchCounts.review > 0 ? <Badge tone="neutral">{matchCounts.review} need review</Badge> : null}
                </>
              ) : null}
            </div>
            <div className="res-tools">
              <button
                ref={filtersBtnRef}
                type="button"
                className="btn-secondary btn-sm ex-mobile-only"
                aria-haspopup="dialog"
                aria-expanded={showFilters}
                onClick={() => setShowFilters(true)}
              >
                <IconFilter width={16} height={16} />
                Filters
              </button>
              <Select<SortKey>
                id="sort"
                label="Sort by"
                value={filters.sort}
                onChange={(sort) => setFilters((f) => ({ ...f, sort }))}
                options={hasRankings ? SORT_OPTIONS : SORT_OPTIONS.filter((o) => !o.id.startsWith('rank-'))}
              />
            </div>
          </div>

          <ActiveFilters
            filters={filters}
            universityById={universityById}
            onChange={setFilters}
            onClear={resetFilters}
          />

          <UrlNotice problems={allProblems} blocked={blocked} onClear={clearProblems} />

          {/*
            One invitation, once, instead of an "Insufficient information" label on
            every row. Without grades the rows say nothing about eligibility; with
            them each row carries one concise verdict.
          */}
          {!loading && !error && filters.applicationYear === '2028' ? (
            <div className="invite invite-wait">
              <IconSearch className="lead-icon" aria-hidden />
              <p>
                <b>2028 requirements are not published yet.</b>
                <span className="sub">
                  These courses are listed so you can plan. Requirements appear once each university
                  publishes them, and 2027 records are never carried forward.
                </span>
              </p>
            </div>
          ) : !loading && !error && !hasProfile ? (
            <div className="invite">
              <IconGrades className="lead-icon" aria-hidden />
              <p>
                <b>See which of these courses your grades meet.</b>
                <span className="sub">
                  Add your A-Levels once. Every result then shows how your grades compare with the
                  published requirements.
                </span>
              </p>
              <button type="button" className="btn-primary btn-sm" onClick={() => setShowProfile(true)}>
                Add your A-Levels
              </button>
            </div>
          ) : null}

          {error ? (
            <EmptyState title="The catalogue could not be loaded" description={error} />
          ) : loading ? (
            <div aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <RowSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<IconSearch width={28} height={28} />}
              title={blocked ? 'This link’s filters cannot match any course' : 'No courses match these filters'}
              description={blocked ? 'A filter in the address is not one CourseScope recognises, so nothing can match it. Remove the unrecognised filters above to see courses.' : 'Try removing a filter, lowering the grade profile, or clearing the search box. The demo catalogue only contains a sample of courses at each university.'}
              action={
                <button type="button" className="btn-secondary" onClick={resetFilters}>
                  Reset all filters
                </button>
              }
            />
          ) : (
            <div className="rows">
              {visible.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  university={universityById[course.universityId]}
                  eligibility={eligibility[course.id]}
                  matchedRoutes={matchedStudyOptionNames(
                    course,
                    universityById[course.universityId],
                    parsed.text,
                  )}
                />
              ))}
            </div>
          )}

          {!error && !loading && results.length > 0 ? (
            <div className="more-results">
              {/*
                aria-disabled rather than disabled: a truly disabled button
                loses focus when it becomes disabled, which would drop the
                reader out of the page after the final "Load more" click. This
                way the control keeps focus and simply stops doing anything.
              */}
              <button
                type="button"
                className={cx('btn-secondary', remaining === 0 && 'cursor-default opacity-60')}
                aria-disabled={remaining === 0}
                onClick={() => {
                  if (remaining > 0) setVisibleCount((n) => n + PAGE_SIZE);
                }}
              >
                {remaining > 0
                  ? `Load more (${Math.min(PAGE_SIZE, remaining)} of ${remaining} remaining)`
                  : `All ${results.length} courses shown`}
              </button>
              <p role="status" aria-live="polite" className="text-[13px] text-ink-muted">
                {remaining > 0
                  ? `Showing ${visible.length} of ${results.length} courses.`
                  : `Showing all ${results.length} courses.`}
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <Drawer
        open={showProfile}
        onClose={() => setShowProfile(false)}
        title="Your A-Levels"
        returnFocusRef={profileBtnRef}
        footer={
          <button type="button" className="btn-primary" onClick={() => setShowProfile(false)}>
            Done
          </button>
        }
      >
        <StudentProfileForm />
      </Drawer>

      <Drawer
        open={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
        side="left"
        hideTitle
        returnFocusRef={filtersBtnRef}
        footer={
          <button type="button" className="btn-primary" onClick={() => setShowFilters(false)}>
            Show {results.length} {results.length === 1 ? 'course' : 'courses'}
          </button>
        }
      >
        <FilterSidebar
          variant="sheet"
          filters={filters}
          onChange={setFilters}
          universities={universities}
          courses={courses}
          hasProfile={hasProfile}
          hasVerifiedData={hasVerifiedData}
          eligibility={eligibility}
        />
      </Drawer>
    </>
  );
}
