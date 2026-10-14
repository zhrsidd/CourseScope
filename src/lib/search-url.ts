import type {
  AdmissionsTestCode,
  ApplicationYear,
  DegreeType,
  FurtherMathsStatus,
  InterviewPolicy,
  SubjectCategory,
  SubjectSubcategory,
} from '@/types';
import {
  ADMISSIONS_TESTS,
  DEGREE_TYPES,
  FURTHER_MATHS_STATUSES,
  SUBCATEGORIES,
  SUBJECT_CATEGORIES,
} from '@/data/taxonomy';
import { isSelectableYear } from './entry-year';
import { SORT_OPTIONS, defaultFilters, type FilterState, type SortKey, type TriState } from './filters';

/**
 * ---------------------------------------------------------------------------
 *  SEARCH ADDRESSES: WHAT A LINK CAN SAY, AND WHAT IT NEVER SAYS
 * ---------------------------------------------------------------------------
 *
 *  `#/search?...` carries the selections that define WHICH COURSES are listed,
 *  so a link reproduces a search for whoever opens it:
 *
 *    q  university  category  subcategory  degree  duration  region  test
 *    interview  maths  fm  physics  chemistry  maxoffer  rank  sort  awaiting
 *    year
 *
 *  Lists are comma-separated (`category=physics,engineering`). Defaults are
 *  left out, so the address of an unfiltered search is just `#/search?year=…`.
 *
 *  WHAT IT DELIBERATELY NEVER CARRIES
 *    - the student's A-Level profile (grades are private and stay in storage),
 *    - the shortlist or the comparison set,
 *    - the "my verdict" filters, which only mean something with a private profile,
 *    - the "show sample records" switch, which is not a search selection.
 *  Those fields are left exactly as they are when an address is applied.
 *
 *  YEAR. `year` is a property of the LINK. Applying it shows that year for the
 *  visit and never writes the saved choice (see AppContext.setYearOverride).
 *
 *  Values are validated against the real vocabularies, so a hand-edited or
 *  stale address cannot put an impossible filter into state; an unknown value is
 *  dropped rather than producing an empty, unexplained result. `university`
 *  accepts any id, as the original discovery route did.
 */

/** Parameter names that mean "this address describes a search". Used by the legacy redirect. */
export const SEARCH_PARAM_KEYS = [
  'q',
  'university',
  'category',
  'subcategory',
  'degree',
  'duration',
  'region',
  'test',
  'interview',
  'maths',
  'fm',
  'physics',
  'chemistry',
  'maxoffer',
  'rank',
  'sort',
  'awaiting',
  'year',
] as const;

const CATEGORY_IDS = SUBJECT_CATEGORIES.map((c) => c.id) as string[];
const SUBCATEGORY_IDS = SUBCATEGORIES.map((s) => s.id) as string[];
const DEGREE_IDS = DEGREE_TYPES.map((d) => d.id) as string[];
const TEST_CODES = ADMISSIONS_TESTS.map((t) => t.code) as string[];
const INTERVIEW_VALUES: readonly string[] = ['yes', 'no', 'sometimes', 'not-stated'];
const SORT_IDS = SORT_OPTIONS.map((o) => o.id) as string[];
const GRADE_STRING = /^(A\*|[A-E]){3,5}$/;
const SAFE_TOKEN = /^[A-Za-z0-9 _.\-&()/']{1,80}$/;

const list = (raw: string | null): string[] =>
  raw ? raw.split(',').map((x) => x.trim()).filter(Boolean).slice(0, 40) : [];
const pick = <T extends string>(raw: string | null, allowed: readonly string[]): T[] =>
  [...new Set(list(raw).filter((x) => allowed.includes(x)))] as T[];
const tri = (raw: string | null): TriState => (raw === 'required' || raw === 'not-required' ? raw : 'any');

/** True when a query string names any search selection (including a bare `q=`). */
export function hasSearchParams(search: string): boolean {
  const p = new URLSearchParams(search);
  return SEARCH_PARAM_KEYS.some((k) => p.has(k));
}

/** The year a search address names, if it names a valid one. */
export function yearFromSearch(search: string): ApplicationYear | null {
  const y = new URLSearchParams(search).get('year');
  return isSelectableYear(y) ? y : null;
}

/**
 * Apply an address to a filter state. Every URL-carried field is replaced by what
 * the address says (or its default); every other field is kept from `base`.
 * `applicationYear` is not set here: the year is applied through the app context.
 */
export function searchToFilters(search: string, base: FilterState): FilterState {
  const p = new URLSearchParams(search);
  const d = defaultFilters(false);
  const q = (p.get('q') ?? '').slice(0, 200);
  const universityIds = list(p.get('university')).filter((u) => SAFE_TOKEN.test(u));
  const durations = list(p.get('duration'))
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0 && n <= 10);
  const regions = list(p.get('region')).filter((r) => SAFE_TOKEN.test(r));
  const fm = p.get('fm');
  const sort = p.get('sort');
  const maxoffer = p.get('maxoffer');
  const rank = Number(p.get('rank'));
  return {
    ...base,
    query: q,
    universityIds,
    categories: pick<SubjectCategory>(p.get('category'), CATEGORY_IDS),
    subcategories: pick<SubjectSubcategory>(p.get('subcategory'), SUBCATEGORY_IDS),
    degreeTypes: pick<DegreeType>(p.get('degree'), DEGREE_IDS),
    durations,
    regions,
    admissionsTests: pick<AdmissionsTestCode>(p.get('test'), TEST_CODES),
    interview: pick<InterviewPolicy>(p.get('interview'), INTERVIEW_VALUES),
    mathematics: tri(p.get('maths')),
    furtherMathematics:
      fm && (FURTHER_MATHS_STATUSES as readonly string[]).includes(fm) ? (fm as FurtherMathsStatus) : d.furtherMathematics,
    physics: tri(p.get('physics')),
    chemistry: tri(p.get('chemistry')),
    maxOffer: maxoffer && GRADE_STRING.test(maxoffer) ? maxoffer : null,
    maxOverallRank: Number.isInteger(rank) && rank > 0 && rank <= 1000 ? rank : null,
    sort: sort && SORT_IDS.includes(sort) ? (sort as SortKey) : d.sort,
    showAwaitingData: p.get('awaiting') === '1',
  };
}

/**
 * The canonical address for a filter state, as a `?…` string. Defaults are
 * omitted; keys are in a fixed order, so equal searches give equal strings.
 */
export function filtersToSearch(f: FilterState): string {
  const parts: [string, string][] = [];
  const add = (k: string, v: string | number | null | undefined) => {
    if (v !== null && v !== undefined && v !== '') parts.push([k, String(v)]);
  };
  const csv = (k: string, v: readonly (string | number)[]) => v.length && add(k, v.join(','));
  add('q', f.query);
  csv('university', f.universityIds);
  csv('category', f.categories);
  csv('subcategory', f.subcategories);
  csv('degree', f.degreeTypes);
  csv('duration', f.durations);
  csv('region', f.regions);
  csv('test', f.admissionsTests);
  csv('interview', f.interview);
  if (f.mathematics !== 'any') add('maths', f.mathematics);
  if (f.furtherMathematics !== 'any') add('fm', f.furtherMathematics);
  if (f.physics !== 'any') add('physics', f.physics);
  if (f.chemistry !== 'any') add('chemistry', f.chemistry);
  add('maxoffer', f.maxOffer);
  add('rank', f.maxOverallRank);
  if (f.sort !== 'relevance') add('sort', f.sort);
  if (f.showAwaitingData) add('awaiting', '1');
  add('year', f.applicationYear);
  // Commas stay literal: they are legal in a query string and keep links readable.
  return parts.length
    ? '?' + parts.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v).replace(/%2C/g, ',')}`).join('&')
    : '';
}

/** Build an address for a search that starts from the landing page. */
export function searchHref(opts: {
  q?: string;
  year: ApplicationYear;
  category?: SubjectCategory;
  subcategory?: SubjectSubcategory;
  university?: string;
}): string {
  const f = defaultFilters(false);
  f.applicationYear = opts.year;
  if (opts.q) f.query = opts.q;
  if (opts.category) f.categories = [opts.category];
  if (opts.subcategory) f.subcategories = [opts.subcategory];
  if (opts.university) f.universityIds = [opts.university];
  return `/search${filtersToSearch(f)}`;
}
