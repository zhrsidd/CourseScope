import { useEffect, useMemo, useRef, useState } from 'react';
import { usePageTitle } from '@/lib/page-title';
import { Link, useSearchParams } from 'react-router-dom';
import type { SubjectCategory, SubjectSubcategory } from '@/types';
import { CourseCard } from '@/components/CourseCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchBar } from '@/components/SearchBar';
import { StudentProfilePanel } from '@/components/StudentProfilePanel';
import { IconFilter, IconSearch } from '@/components/ui/icons';
import {
  Badge,
  CardSkeleton,
  EmptyState,
  Select,
  cx,
} from '@/components/ui/primitives';
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
import { profileIsEmpty } from '@/lib/grades';
import { useApp } from '@/state/AppContext';

const PAGE_SIZE = RESULT_PAGE_SIZE;

export function SearchPage() {
  // The home page carries the full descriptive title: "CourseScope — UK Physics
  // & Engineering Course Finder". Inner pages put their own subject first.
  usePageTitle(null);
  const {
    loading,
    error,
    courses,
    universities,
    universityById,
    eligibility,
    profile,
    savedCourseIds,
    hasVerifiedData,
  } = useApp();

  // Ranking sorts are offered only when verified rankings exist to sort by.
  const hasRankings = universities.some((u) => u.rankings.length > 0);

  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const base = defaultFilters(false);
    const uni = params.get('university');
    const category = params.get('category') as SubjectCategory | null;
    const sub = params.get('subcategory') as SubjectSubcategory | null;
    const q = params.get('q');
    if (uni) base.universityIds = [uni];
    if (category) base.categories = [category];
    if (sub) base.subcategories = [sub];
    if (q) base.query = q;
    return base;
  });
  const [showFilters, setShowFilters] = useState(false);

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

  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.query) next.set('q', filters.query);
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.query]);

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

  const results = useMemo(
    () =>
      applyFilters({
        courses,
        universities: universityById,
        filters,
        parsed,
        eligibility,
        shortlistedCourseIds: savedCourseIds,
      }),
    [courses, universityById, filters, parsed, eligibility, savedCourseIds],
  );

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

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <section className="mb-6">
        <h1 className="max-w-3xl text-[26px] font-semibold leading-tight text-navy-950 md:text-[34px]">
          Find the right UK Physics or Engineering course
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Compare published entry requirements, admissions tests and application routes across UK
          universities.
        </p>
        {/*
          One line, above the fold, doing two jobs the footer cannot: it says
          where the data comes from, and it says what a match does and does not
          mean. A reader who never opens the methodology page should still not
          be able to mistake a green badge for an offer.
        */}
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-faint">
          Every requirement here is read from the university’s own page for a specific entry year.
          Matching them means you meet the published academic requirements — it does not predict an
          offer.{' '}
          <Link to="/about" className="link">
            How this works
          </Link>
        </p>
        <div className="mt-5 max-w-3xl">
          <SearchBar
            value={filters.query}
            onChange={(query) => setFilters((f) => ({ ...f, query }))}
            parsed={parsed}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <div className={cx('lg:block', showFilters ? 'block' : 'hidden')}>
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            universities={universities}
            courses={courses}
            hasProfile={hasProfile}
            hasVerifiedData={hasVerifiedData}
            eligibility={eligibility}
          />
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn-secondary h-8 px-2.5 text-xs lg:hidden"
                onClick={() => setShowFilters((s) => !s)}
              >
                <IconFilter width={14} height={14} />
                {showFilters ? 'Hide filters' : 'Filters'}
              </button>
              <span className="text-sm text-ink-muted">
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
                  {matchCounts.review > 0 ? (
                    <Badge tone="amber">{matchCounts.review} need review</Badge>
                  ) : null}
                </>
              ) : null}
            </div>
            <Select<SortKey>
              id="sort"
              label="Sort by"
              value={filters.sort}
              onChange={(sort) => setFilters((f) => ({ ...f, sort }))}
              options={hasRankings ? SORT_OPTIONS : SORT_OPTIONS.filter((o) => !o.id.startsWith('rank-'))}
            />
          </div>

          {error ? (
            <EmptyState title="The catalogue could not be loaded" description={error} />
          ) : loading ? (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<IconSearch width={28} height={28} />}
              title="No courses match these filters"
              description="Try removing a filter, lowering the grade profile, or clearing the search box. The demo catalogue only contains a sample of courses at each university."
              action={
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setFilters(defaultFilters(hasVerifiedData))}
                >
                  Reset all filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {visible.map((course) => (
                <CourseCard
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
            <div className="mt-5 flex flex-col items-center gap-2">
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
              <p role="status" aria-live="polite" className="text-xs text-ink-muted">
                {remaining > 0
                  ? `Showing ${visible.length} of ${results.length} courses.`
                  : `Showing all ${results.length} courses.`}
              </p>
            </div>
          ) : null}
        </div>

        <div className="xl:sticky xl:top-[76px] xl:self-start">
          <StudentProfilePanel />
        </div>
      </div>
    </div>
  );
}
