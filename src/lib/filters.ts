import { DEFAULT_APPLICATION_YEAR } from './entry-year';
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
  VerificationStatus,
} from '@/types';
import {
  courseSubjectStatus,
  getRanking,
  highestOfferWeight,
  lowestOfferWeight,
} from './format';
import { parseProfileString, profileWeight } from './grades';
import type { ParsedQuery } from './search';

export type TriState = 'any' | 'required' | 'not-required';

export type SortKey =
  | 'relevance'
  | 'university-asc'
  | 'course-asc'
  | 'offer-asc'
  | 'offer-desc'
  | 'rank-overall'
  | 'rank-physics'
  | 'rank-engineering'
  | 'duration-asc'
  | 'verification';

export const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: 'relevance', label: 'Best match' },
  { id: 'university-asc', label: 'University A–Z' },
  { id: 'course-asc', label: 'Course A–Z' },
  { id: 'offer-asc', label: 'Lowest required grades' },
  { id: 'offer-desc', label: 'Highest required grades' },
  { id: 'rank-overall', label: 'Overall ranking' },
  { id: 'rank-physics', label: 'Physics ranking' },
  { id: 'rank-engineering', label: 'Engineering ranking' },
  { id: 'duration-asc', label: 'Course duration' },
  { id: 'verification', label: 'Verified data first' },
];

export interface FilterState {
  query: string;
  applicationYear: ApplicationYear;
  universityIds: string[];
  categories: SubjectCategory[];
  subcategories: SubjectSubcategory[];
  degreeTypes: DegreeType[];
  durations: number[];
  regions: string[];
  admissionsTests: AdmissionsTestCode[];
  interview: InterviewPolicy[];
  mathematics: TriState;
  furtherMathematics: 'any' | FurtherMathsStatus;
  physics: TriState;
  chemistry: TriState;
  /** Show only courses whose easiest published pathway is at or below this. */
  maxOffer: string | null;
  maxOverallRank: number | null;
  eligibility: EligibilityVerdict[];
  onlyShortlisted: boolean;
  /** Sample (demo) records are labelled, and can be switched off entirely. */
  showSampleData: boolean;
  /** Course shells with no admissions data yet — off by default for students. */
  showAwaitingData: boolean;
  sort: SortKey;
}

export const APPLICATION_YEARS: ApplicationYear[] = ['2027', '2028'];

/**
 * How many result cards the discovery list renders at once.
 *
 * Filtering the whole catalogue costs single-digit milliseconds; rendering
 * every match is what cost seconds once a search could return several hundred
 * cards. The list therefore renders a page at a time. The total result count is
 * always shown alongside, so a smaller page never hides how much matched.
 */
export const RESULT_PAGE_SIZE = 40;

export function defaultFilters(hasVerifiedData = false): FilterState {
  return {
    query: '',
    applicationYear: DEFAULT_APPLICATION_YEAR,
    universityIds: [],
    categories: [],
    subcategories: [],
    degreeTypes: [],
    durations: [],
    regions: [],
    admissionsTests: [],
    interview: [],
    mathematics: 'any',
    furtherMathematics: 'any',
    physics: 'any',
    chemistry: 'any',
    maxOffer: null,
    maxOverallRank: null,
    eligibility: [],
    onlyShortlisted: false,
    // Once real records exist, placeholders stop being the default view.
    showSampleData: !hasVerifiedData,
    showAwaitingData: false,
    sort: 'relevance',
  };
}

export function countActiveFilters(f: FilterState): number {
  let n = 0;
  n += f.universityIds.length ? 1 : 0;
  n += f.categories.length ? 1 : 0;
  n += f.subcategories.length ? 1 : 0;
  n += f.degreeTypes.length ? 1 : 0;
  n += f.durations.length ? 1 : 0;
  n += f.regions.length ? 1 : 0;
  n += f.admissionsTests.length ? 1 : 0;
  n += f.interview.length ? 1 : 0;
  n += f.mathematics !== 'any' ? 1 : 0;
  n += f.furtherMathematics !== 'any' ? 1 : 0;
  n += f.physics !== 'any' ? 1 : 0;
  n += f.chemistry !== 'any' ? 1 : 0;
  n += f.maxOffer ? 1 : 0;
  n += f.maxOverallRank ? 1 : 0;
  n += f.eligibility.length ? 1 : 0;
  n += f.onlyShortlisted ? 1 : 0;
  n += f.showAwaitingData ? 1 : 0;
  return n;
}

function matchesTriState(course: Course, subject: string, state: TriState): boolean {
  if (state === 'any') return true;
  const status = courseSubjectStatus(course, subject);
  if (state === 'required') return status === 'required';
  return status !== 'required';
}

/**
 * Everything about a course's own IDENTITY that a student might type: its
 * title, its university, its UCAS code and any alternative codes the
 * university itself prints for the same application, and its award label.
 * Nothing here is invented — every part is a stored field.
 */
function identityHaystack(course: Course, university: University | undefined): string {
  return [
    course.name,
    course.awardLabel ?? '',
    course.degreeType,
    university?.name ?? '',
    university?.shortName ?? '',
    university?.city ?? '',
    course.courseCode ?? '',
    ...course.alternativeCourseCodes.flatMap((a) => [a.code, a.label]),
  ]
    .join(' ')
    .toLowerCase();
}

/**
 * Study options are routes WITHIN one UCAS application, not applications of
 * their own. A student who types "Spacecraft" is looking for Imperial's
 * Aeronautical Engineering MEng (H401), because that is the application the
 * Spacecraft route is admitted through — so the option's name is searchable,
 * but the result is always the parent course. The option never becomes a
 * record, an identity, an eligibility result or a 2028 shell.
 */
function optionNames(course: Course): string[] {
  return course.studyOptions.map((o) => o.name);
}

export interface TextMatch {
  /** -1 when the course does not match at all. */
  score: number;
  /**
   * Study options that explain part of the match — that is, options carrying a
   * term the course's own identity does not. These are what the result card
   * shows as "Route within this application".
   */
  matchedOptions: string[];
}

export function matchCourseText(
  course: Course,
  university: University | undefined,
  text: string,
): TextMatch {
  if (!text) return { score: 0, matchedOptions: [] };
  const terms = text.split(' ').filter(Boolean);
  if (!terms.length) return { score: 0, matchedOptions: [] };

  const identity = identityHaystack(course, university);
  const options = optionNames(course);
  const lowered = options.map((n) => n.toLowerCase());

  let score = 0;
  let covered = 0;
  const explaining = new Set<string>();

  for (const term of terms) {
    const inIdentity = identity.includes(term);
    // An identity hit scores higher than a route hit, so a course that really
    // is called "Nuclear Engineering" outranks one that merely contains that
    // route.
    if (inIdentity) {
      score += 2;
      covered += 1;
      continue;
    }
    let matchedHere = false;
    for (let i = 0; i < lowered.length; i += 1) {
      if (lowered[i].includes(term)) {
        explaining.add(options[i]);
        matchedHere = true;
      }
    }
    if (matchedHere) {
      score += 1;
      covered += 1;
    }
  }

  if (covered !== terms.length) return { score: -1, matchedOptions: [] };
  return { score, matchedOptions: [...explaining] };
}

/**
 * Which routes inside this application explain a match against `text`.
 * Used by the result card to say why a course came back for a term that is
 * nowhere in its title.
 */
export function matchedStudyOptionNames(
  course: Course,
  university: University | undefined,
  text: string,
): string[] {
  const m = matchCourseText(course, university, text);
  return m.score < 0 ? [] : m.matchedOptions;
}

export interface FilterInput {
  courses: Course[];
  universities: Record<string, University>;
  filters: FilterState;
  parsed: ParsedQuery;
  eligibility: Record<string, EligibilityReport>;
  shortlistedCourseIds: string[];
}

export function applyFilters({
  courses,
  universities,
  filters,
  parsed,
  eligibility,
  shortlistedCourseIds,
}: FilterInput): Course[] {
  const maxOfferWeight = filters.maxOffer ? profileWeight(parseProfileString(filters.maxOffer)) : null;
  const queryOfferWeight = parsed.gradeProfile ? profileWeight(parsed.gradeProfile) : null;

  const scored: { course: Course; score: number }[] = [];

  for (const course of courses) {
    const uni = universities[course.universityId];
    const status = course.provenance.verificationStatus;

    if (course.applicationYear !== filters.applicationYear) continue;
    if (!filters.showSampleData && status === 'demo') continue;
    if (!filters.showAwaitingData && status === 'awaiting-data') continue;
    if (filters.universityIds.length && !filters.universityIds.includes(course.universityId)) continue;
    if (filters.categories.length && !filters.categories.includes(course.subjectCategory)) continue;
    if (filters.subcategories.length && !filters.subcategories.includes(course.subjectSubcategory)) continue;
    if (filters.degreeTypes.length && !filters.degreeTypes.includes(course.degreeType)) continue;
    if (filters.durations.length && (course.durationYears === null || !filters.durations.includes(course.durationYears)))
      continue;
    if (filters.regions.length && (!uni || !filters.regions.includes(uni.region))) continue;
    if (filters.admissionsTests.length && !filters.admissionsTests.includes(course.admissionsTest.code)) continue;
    if (filters.interview.length && !filters.interview.includes(course.interview)) continue;

    if (!matchesTriState(course, 'Mathematics', filters.mathematics)) continue;
    if (!matchesTriState(course, 'Physics', filters.physics)) continue;
    if (!matchesTriState(course, 'Chemistry', filters.chemistry)) continue;
    if (filters.furtherMathematics !== 'any' && course.furtherMathematics !== filters.furtherMathematics) continue;

    if (maxOfferWeight !== null) {
      const w = lowestOfferWeight(course);
      if (!Number.isFinite(w) || w > maxOfferWeight) continue;
    }

    if (filters.maxOverallRank !== null) {
      const r = uni ? getRanking(uni, 'overall') : null;
      if (!r || r.rank > filters.maxOverallRank) continue;
    }

    if (filters.eligibility.length) {
      const verdict = eligibility[course.id]?.verdict ?? 'insufficient-information';
      if (!filters.eligibility.includes(verdict)) continue;
    }

    if (filters.onlyShortlisted && !shortlistedCourseIds.includes(course.id)) continue;

    /* ---- parsed query constraints ---- */
    if (parsed.categories.length && !parsed.categories.includes(course.subjectCategory)) continue;
    if (parsed.subcategories.length && !parsed.subcategories.includes(course.subjectSubcategory)) continue;
    if (parsed.requireNoTest && course.admissionsTest.code !== 'none') continue;
    if (parsed.requireNoInterview && course.interview !== 'no') continue;
    if (parsed.tests.length && !parsed.tests.includes(course.admissionsTest.code)) continue;
    if (parsed.furtherMaths.length && !parsed.furtherMaths.includes(course.furtherMathematics)) continue;

    let subjectOk = true;
    for (const subject of parsed.requireSubjects) {
      if (courseSubjectStatus(course, subject) !== 'required') subjectOk = false;
    }
    for (const subject of parsed.excludeSubjects) {
      if (courseSubjectStatus(course, subject) === 'required') subjectOk = false;
    }
    if (!subjectOk) continue;

    if (queryOfferWeight !== null) {
      const w = lowestOfferWeight(course);
      if (!Number.isFinite(w) || w > queryOfferWeight) continue;
    }

    const { score } = matchCourseText(course, uni, parsed.text);
    if (score < 0) continue;

    scored.push({ course, score });
  }

  return sortCourses(scored, filters, universities, eligibility);
}

const VERIFICATION_ORDER: Record<VerificationStatus, number> = {
  verified: 0,
  'partially-verified': 1,
  'awaiting-publication': 2,
  demo: 3,
  'awaiting-data': 4,
  unknown: 5,
};

function sortCourses(
  scored: { course: Course; score: number }[],
  filters: FilterState,
  universities: Record<string, University>,
  eligibility: Record<string, EligibilityReport>,
): Course[] {
  const rankOf = (c: Course, category: 'overall' | 'physics-astronomy' | 'engineering-technology') => {
    const uni = universities[c.universityId];
    const r = uni ? getRanking(uni, category) : null;
    return r ? r.rank : Number.POSITIVE_INFINITY;
  };
  const verdictRank: Record<EligibilityVerdict, number> = {
    meets: 0,
    'review-required': 1,
    'insufficient-information': 2,
    'does-not-meet': 3,
  };

  const sorted = [...scored];
  sorted.sort((a, b) => {
    switch (filters.sort) {
      case 'university-asc':
        return (universities[a.course.universityId]?.name ?? '').localeCompare(
          universities[b.course.universityId]?.name ?? '',
        );
      case 'course-asc':
        return a.course.name.localeCompare(b.course.name);
      case 'offer-asc':
        return lowestOfferWeight(a.course) - lowestOfferWeight(b.course);
      case 'offer-desc':
        return highestOfferWeight(b.course) - highestOfferWeight(a.course);
      case 'rank-overall':
        return rankOf(a.course, 'overall') - rankOf(b.course, 'overall');
      case 'rank-physics':
        return rankOf(a.course, 'physics-astronomy') - rankOf(b.course, 'physics-astronomy');
      case 'rank-engineering':
        return rankOf(a.course, 'engineering-technology') - rankOf(b.course, 'engineering-technology');
      case 'duration-asc':
        return (a.course.durationYears ?? 99) - (b.course.durationYears ?? 99);
      case 'verification':
        return (
          VERIFICATION_ORDER[a.course.provenance.verificationStatus] -
          VERIFICATION_ORDER[b.course.provenance.verificationStatus]
        );
      default: {
        const ea = verdictRank[eligibility[a.course.id]?.verdict ?? 'insufficient-information'];
        const eb = verdictRank[eligibility[b.course.id]?.verdict ?? 'insufficient-information'];
        if (ea !== eb) return ea - eb;
        if (b.score !== a.score) return b.score - a.score;
        return rankOf(a.course, 'overall') - rankOf(b.course, 'overall');
      }
    }
  });

  return sorted.map((s) => s.course);
}

/* ------------------------------------------------------------------ */
/* University sorting (catalogue page)                                 */
/* ------------------------------------------------------------------ */

export type UniversitySortKey =
  | 'name-asc'
  | 'rank-overall'
  | 'rank-physics'
  | 'rank-engineering'
  | 'offer-asc'
  | 'offer-desc'
  | 'courses-desc';

export const UNIVERSITY_SORT_OPTIONS: { id: UniversitySortKey; label: string }[] = [
  { id: 'name-asc', label: 'University name' },
  { id: 'rank-overall', label: 'Overall ranking' },
  { id: 'rank-physics', label: 'Physics ranking' },
  { id: 'rank-engineering', label: 'Engineering ranking' },
  { id: 'offer-asc', label: 'Lowest required grades' },
  { id: 'offer-desc', label: 'Highest required grades' },
  { id: 'courses-desc', label: 'Number of courses' },
];

export function sortUniversities(
  list: University[],
  courses: Course[],
  sort: UniversitySortKey,
): University[] {
  const byUni = new Map<string, Course[]>();
  for (const c of courses) {
    const arr = byUni.get(c.universityId) ?? [];
    arr.push(c);
    byUni.set(c.universityId, arr);
  }
  const rank = (u: University, cat: 'overall' | 'physics-astronomy' | 'engineering-technology') =>
    getRanking(u, cat)?.rank ?? Number.POSITIVE_INFINITY;

  const lowest = (u: University) => {
    const ws = (byUni.get(u.id) ?? []).map(lowestOfferWeight).filter(Number.isFinite);
    return ws.length ? Math.min(...ws) : Number.POSITIVE_INFINITY;
  };
  const highest = (u: University) => {
    const ws = (byUni.get(u.id) ?? []).map(highestOfferWeight).filter(Number.isFinite);
    return ws.length ? Math.max(...ws) : Number.NEGATIVE_INFINITY;
  };

  return [...list].sort((a, b) => {
    switch (sort) {
      case 'rank-overall':
        return rank(a, 'overall') - rank(b, 'overall');
      case 'rank-physics':
        return rank(a, 'physics-astronomy') - rank(b, 'physics-astronomy');
      case 'rank-engineering':
        return rank(a, 'engineering-technology') - rank(b, 'engineering-technology');
      case 'offer-asc':
        return lowest(a) - lowest(b);
      case 'offer-desc':
        return highest(b) - highest(a);
      case 'courses-desc':
        return (byUni.get(b.id)?.length ?? 0) - (byUni.get(a.id)?.length ?? 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });
}
