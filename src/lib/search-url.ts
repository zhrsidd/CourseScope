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
 *  UNRECOGNISED VALUES NEVER BECOME A QUIETLY DIFFERENT SEARCH. Values are checked
 *  against the real vocabularies, and anything that does not match is kept apart
 *  (`raw`), written back to the address unchanged, and reported in `problems`:
 *
 *    - a filter whose values are ALL unrecognised blocks: the page shows no courses
 *      and says why (an impossible filter matches nothing, as it always did);
 *    - a filter with SOME recognised values is applied to those, and the page says
 *      which values were ignored;
 *    - `sort`, `year` and `awaiting` are not narrowing filters, so an unrecognised
 *      value falls back to the default, and the page says so;
 *    - a parameter name that is a near-miss of a real one (`categroy`) is reported.
 *  "Remove unrecognised filters" on the page clears them from state and address.
 *  Other unknown parameter names (tracking tags and the like) are ignored.
 *  `university` and `region` are checked against the catalogue once it is loaded.
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

/** One thing in an address that could not be applied as written. */
export interface UrlProblem {
  /** Parameter name as written. */
  key: string;
  /** The unrecognised value(s), joined with commas. Empty for a bare unknown name. */
  value: string;
  /**
   * `blocks`: no recognised value is left, so nothing can match and no courses are shown.
   * `partial`: some values were applied, these were ignored.
   * `fallback`: a non-narrowing option (sort, year, awaiting) reverted to its default.
   * `typo`: a parameter name that looks like a misspelling of a real one.
   */
  kind: 'blocks' | 'partial' | 'fallback' | 'typo';
}

export interface ParsedSearch {
  filters: FilterState;
  problems: UrlProblem[];
  /** Entries that could not be applied, preserved so the address is not silently rewritten. */
  raw: [string, string][];
}


const isNear = (a: string, b: string): boolean => {
  if (Math.abs(a.length - b.length) > 2) return false;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j += 1) d[0][j] = j;
  for (let i = 1; i <= a.length; i += 1)
    for (let j = 1; j <= b.length; j += 1)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length] <= 2;
};

/** The real parameter a misspelt name most likely meant, if any. */
export function closestKey(name: string): string | null {
  return (SEARCH_PARAM_KEYS as readonly string[]).find((k) => isNear(name.toLowerCase(), k)) ?? null;
}

/**
 * Apply an address to a filter state. Every URL-carried field is replaced by what
 * the address says (or its default); every other field is kept from `base`.
 * `applicationYear` is not set here: the year is applied through the app context.
 */
export function parseSearch(search: string, base: FilterState): ParsedSearch {
  const p = new URLSearchParams(search);
  const d = defaultFilters(false);
  const problems: UrlProblem[] = [];
  const raw: [string, string][] = [];
  const bad = (key: string, tokens: string[], kind: UrlProblem['kind']) => {
    if (!tokens.length) return;
    raw.push([key, tokens.join(',')]);
    problems.push({ key, value: tokens.join(','), kind });
  };

  /** Split a list parameter into recognised and unrecognised tokens. */
  const sortTokens = (key: string, resolve: (t: string) => string | null) => {
    const all = list(p.get(key));
    const good = [...new Set(all.map(resolve).filter((t): t is string => t !== null))];
    const rejected = [...new Set(all.filter((t) => resolve(t) === null))];
    bad(key, rejected, good.length ? 'partial' : 'blocks');
    return good;
  };
  /** Matches a vocabulary ignoring case, returning the canonical spelling. */
  const vocab = (ids: readonly string[]) => (t: string) => ids.find((id) => id.toLowerCase() === t.toLowerCase()) ?? null;
  const safe = (t: string) => (SAFE_TOKEN.test(t) ? t : null);
  /** A single-valued parameter: recognised value, or null (and a problem if one was given). */
  const single = (key: string, ok: (v: string) => boolean, kind: UrlProblem['kind']): string | null => {
    const v = p.get(key);
    if (v === null || v === '') return null;
    if (ok(v)) return v;
    bad(key, [v], kind);
    return null;
  };
  const triOf = (key: string): TriState => {
    const v = single(key, (x) => x === 'any' || x === 'required' || x === 'not-required', 'blocks');
    return v === 'required' || v === 'not-required' ? v : 'any';
  };

  const qRaw = p.get('q') ?? '';
  const q = qRaw.slice(0, 200);
  if (qRaw.length > 200) problems.push({ key: 'q', value: `${qRaw.length} characters`, kind: 'fallback' });

  const fm = single('fm', (v) => v === 'any' || (FURTHER_MATHS_STATUSES as readonly string[]).includes(v), 'blocks');
  const sort = single('sort', (v) => SORT_IDS.includes(v), 'fallback');
  const maxoffer = single('maxoffer', (v) => GRADE_STRING.test(v), 'blocks');
  const rankRaw = single('rank', (v) => /^\d{1,4}$/.test(v) && Number(v) > 0 && Number(v) <= 1000, 'blocks');
  const awaiting = single('awaiting', (v) => v === '1' || v === '0', 'fallback');
  // An unrecognised year is reported but not preserved: the address always carries a real one.
  const yearRaw = p.get('year');
  if (yearRaw && !isSelectableYear(yearRaw)) problems.push({ key: 'year', value: yearRaw, kind: 'fallback' });

  const universityIds = sortTokens('university', safe);
  const regions = sortTokens('region', safe);
  const durations = sortTokens('duration', (t) => (Number.isFinite(Number(t)) && Number(t) > 0 && Number(t) <= 10 ? String(Number(t)) : null)).map(Number);

  // Parameter names that are probably misspellings of real ones.
  const known = new Set<string>(SEARCH_PARAM_KEYS);
  for (const [k, v] of p.entries()) {
    if (known.has(k)) continue;
    if ((SEARCH_PARAM_KEYS as readonly string[]).some((real) => isNear(k.toLowerCase(), real))) {
      raw.push([k, v]);
      problems.push({ key: k, value: v, kind: 'typo' });
    }
  }

  const filters: FilterState = {
    ...base,
    query: q,
    universityIds,
    categories: sortTokens('category', vocab(CATEGORY_IDS)) as SubjectCategory[],
    subcategories: sortTokens('subcategory', vocab(SUBCATEGORY_IDS)) as SubjectSubcategory[],
    degreeTypes: sortTokens('degree', vocab(DEGREE_IDS)) as DegreeType[],
    durations,
    regions,
    admissionsTests: sortTokens('test', vocab(TEST_CODES)) as AdmissionsTestCode[],
    interview: sortTokens('interview', vocab(INTERVIEW_VALUES)) as InterviewPolicy[],
    mathematics: triOf('maths'),
    furtherMathematics: fm && fm !== 'any' ? (fm as FurtherMathsStatus) : d.furtherMathematics,
    physics: triOf('physics'),
    chemistry: triOf('chemistry'),
    maxOffer: maxoffer,
    maxOverallRank: rankRaw ? Number(rankRaw) : null,
    sort: sort ? (sort as SortKey) : d.sort,
    showAwaitingData: awaiting === '1',
  };
  return { filters, problems, raw };
}

/**
 * The canonical address for a filter state, as a `?…` string. Defaults are
 * omitted; keys are in a fixed order, so equal searches give equal strings.
 */
export function filtersToSearch(f: FilterState, raw: readonly [string, string][] = []): string {
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
  // Unrecognised entries go back exactly as they came, merged into the same parameter
  // when a recognised value is also present, so reading an address never rewrites it.
  for (const [k, v] of raw) {
    const i = parts.findIndex(([pk]) => pk === k);
    if (i >= 0) parts[i][1] += `,${v}`;
    else parts.push([k, v]);
  }
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
