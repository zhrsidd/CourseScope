import type {
  ALevelGrade,
  AdmissionsTestRecord,
  ApplicationDeadline,
  ApplicationYear,
  ContextualOfferInfo,
  Course,
  DeadlineScope,
  FurtherMathsStatus,
  InterviewPolicy,
  Ranking,
  RankingCategory,
  SubjectStatus,
  University,
  VerificationStatus,
} from '@/types';
import {
  ADMISSIONS_TEST_BY_CODE,
  FURTHER_MATHS_LABEL,
  SUBJECT_STATUS_LABEL,
  TEST_REQUIREMENT_LABEL,
  VERIFICATION_LABEL,
} from '@/data/taxonomy';
import { profileWeight, subjectsMatch } from './grades';

export const NOT_AVAILABLE = 'Not available';

export { FURTHER_MATHS_LABEL, SUBJECT_STATUS_LABEL, VERIFICATION_LABEL, TEST_REQUIREMENT_LABEL };

export const INTERVIEW_LABEL: Record<InterviewPolicy, string> = {
  yes: 'Yes',
  no: 'No',
  sometimes: 'Sometimes',
  'not-stated': 'No information published',
};

export function contextualLabel(info: ContextualOfferInfo): string {
  switch (info.availability) {
    case 'yes':
      return info.details ?? 'Available';
    case 'no':
      return 'Not offered';
    case 'check-website':
      return 'Check university website';
    default:
      return 'No information published';
  }
}

/** Short label for a course's admissions test, e.g. "ESAT" or "None". */
export function admissionsTestLabel(test: AdmissionsTestRecord): string {
  if (test.code === 'university-specific' || test.code === 'other') {
    return test.name ?? ADMISSIONS_TEST_BY_CODE[test.code]?.shortName ?? 'Other';
  }
  return ADMISSIONS_TEST_BY_CODE[test.code]?.shortName ?? test.code;
}

/** Test label with its requirement level, e.g. "TMUA (optional)". */
export function admissionsTestFullLabel(test: AdmissionsTestRecord): string {
  const base = admissionsTestLabel(test);
  if (test.code === 'none' || test.code === 'not-announced' || test.code === 'unknown') return base;
  if (test.requirement === 'required') return base;
  return `${base} (${TEST_REQUIREMENT_LABEL[test.requirement].toLowerCase()})`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return 'Not yet verified';
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function durationLabel(years: number | null, yearsMax?: number | null): string {
  if (years === null) return 'Duration not recorded';
  if (yearsMax && yearsMax !== years) return `${years} or ${yearsMax} years`;
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}

/** "MPhys / BA" where a course leads to more than one award. */
export function awardLabel(course: Course): string {
  return course.awardLabel ?? course.degreeType;
}

export function furtherMathsLabel(status: FurtherMathsStatus): string {
  return FURTHER_MATHS_LABEL[status];
}

export function subjectStatusLabel(status: SubjectStatus): string {
  return SUBJECT_STATUS_LABEL[status];
}

export function verificationLabel(status: VerificationStatus): string {
  return VERIFICATION_LABEL[status];
}

/* ------------------------------------------------------------------ */
/* Rankings                                                            */
/* ------------------------------------------------------------------ */

/** Every position recorded for a category, newest edition first. */
export function getRankings(university: University, category: RankingCategory): Ranking[] {
  return university.rankings
    .filter((r) => r.category === category)
    .sort((a, b) => b.edition - a.edition || a.provider.localeCompare(b.provider));
}

/**
 * One position to show where there is room for only one — chosen, never merged.
 * Verified positions win over unverified, then the newest edition. The provider
 * and edition always travel with the number, so two providers are never
 * conflated even when only one is displayed.
 */
export function preferredRanking(university: University, category: RankingCategory): Ranking | null {
  const all = getRankings(university, category);
  if (all.length === 0) return null;
  const verified = all.filter((r) => r.verificationStatus === 'verified');
  return (verified.length ? verified : all)[0];
}

/** Kept as the single-value accessor used across the UI and sorting. */
export function getRanking(university: University, category: RankingCategory): Ranking | null {
  return preferredRanking(university, category);
}

export function rankingIsVerified(ranking: Ranking): boolean {
  return (
    ranking.verificationStatus === 'verified' &&
    Boolean(ranking.sourceUrl) &&
    Boolean(ranking.sourceTitle) &&
    Boolean(ranking.lastVerified)
  );
}

export function rankLabel(ranking: Ranking | null): string {
  return ranking ? `#${ranking.rank}` : NOT_AVAILABLE;
}

/** "QS 2027" — always shown next to a position. */
export function rankingProvenanceLabel(ranking: Ranking): string {
  return `${ranking.providerShort} ${ranking.edition}`;
}

/* ------------------------------------------------------------------ */
/* Application deadlines                                               */
/* ------------------------------------------------------------------ */

/**
 * Deadlines that apply to one course in one cycle. Entry-year specific by
 * construction: a 2027 deadline is never returned for a 2028 record.
 */
export function deadlinesForCourse(
  university: University | undefined,
  course: Course,
): ApplicationDeadline[] {
  if (!university) return [];
  return university.applicationDeadlines.filter((d) => {
    if (d.applicationYear !== course.applicationYear) return false;
    switch (d.appliesTo.kind) {
      case 'all-courses':
        return true;
      case 'course-slugs':
        return d.appliesTo.slugs.includes(course.slug);
      case 'subject-category':
        return d.appliesTo.category === course.subjectCategory;
      default:
        return false;
    }
  });
}

export function deadlinesForYear(
  university: University,
  applicationYear: ApplicationYear,
): ApplicationDeadline[] {
  return university.applicationDeadlines.filter((d) => d.applicationYear === applicationYear);
}

export function deadlineScopeLabel(scope: DeadlineScope): string {
  switch (scope.kind) {
    case 'all-courses':
      return 'All courses';
    case 'course-slugs':
      return `${scope.slugs.length} specific course${scope.slugs.length === 1 ? '' : 's'}`;
    case 'subject-category':
      return scope.category === 'physics' ? 'Physics courses' : 'Engineering courses';
    default:
      return scope.description;
  }
}

export function deadlineDateLabel(deadline: ApplicationDeadline): string {
  return deadline.date ? formatDate(deadline.date) : 'Date not recorded';
}

/* ------------------------------------------------------------------ */
/* Course-level derived helpers                                        */
/* ------------------------------------------------------------------ */

/** Lowest published minimum grade for a subject, across all pathways. */
export function subjectMinimumGrade(course: Course, subject: string): ALevelGrade | null {
  const grades = course.offers
    .flatMap((o) => o.subjectRequirements)
    .filter((r) => subjectsMatch(r.subject, subject) && r.minimumGrade)
    .map((r) => r.minimumGrade!);
  if (grades.length === 0) return null;
  return grades.sort((a, b) => profileWeight([a]) - profileWeight([b]))[0];
}

/** Subject status plus its minimum grade, for cards and the comparison table. */
export function subjectSummary(course: Course, subject: string): string {
  const status =
    subject === 'Mathematics'
      ? course.mathematics
      : subject === 'Physics'
        ? course.physics
        : subject === 'Chemistry'
          ? course.chemistry
          : 'unknown';
  if (status === 'unknown') return 'Not recorded';
  if (status === 'not-required') return 'Not required';
  const min = subjectMinimumGrade(course, subject);
  return `${SUBJECT_STATUS_LABEL[status]}${min ? ` ${min}` : ''}`;
}

export function courseSubjectStatus(course: Course, subject: string): SubjectStatus {
  if (subjectsMatch(subject, 'Mathematics')) return course.mathematics;
  if (subjectsMatch(subject, 'Physics')) return course.physics;
  if (subjectsMatch(subject, 'Chemistry')) return course.chemistry;
  if (subjectsMatch(subject, 'Further Mathematics')) {
    const fm = course.furtherMathematics;
    if (fm === 'required') return 'required';
    if (fm === 'not-required' || fm === 'no-stated-preference') return 'not-required';
    if (fm === 'unknown') return 'unknown';
    return 'recommended';
  }
  return 'unknown';
}

/** The standard (non-contextual) pathway, if there is one. */
export function primaryOffer(course: Course) {
  return course.offers.find((o) => !o.isContextual) ?? course.offers[0] ?? null;
}

export function typicalOfferLabel(course: Course): string {
  if (course.requirementsPublicationStatus === 'not-yet-published') {
    return `${course.applicationYear} requirements not yet published`;
  }
  const offer = primaryOffer(course);
  if (offer) return offer.gradeProfile;
  return course.provenance.verificationStatus === 'awaiting-data'
    ? 'Awaiting verification'
    : 'Not recorded yet';
}

/** Ordinal weight of the easiest published pathway — for sorting only. */
export function lowestOfferWeight(course: Course): number {
  const weights = course.offers.map((o) => profileWeight(o.gradeProfileGrades));
  return weights.length ? Math.min(...weights) : Number.POSITIVE_INFINITY;
}

export function highestOfferWeight(course: Course): number {
  const weights = course.offers
    .map((o) => profileWeight(o.gradeProfileGrades))
    .filter((w) => Number.isFinite(w));
  return weights.length ? Math.max(...weights) : Number.NEGATIVE_INFINITY;
}

export function pluralise(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : plural ?? `${singular}s`}`;
}
