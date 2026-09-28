/**
 * ---------------------------------------------------------------------------
 *  WHY DID I GET THAT VERDICT?
 * ---------------------------------------------------------------------------
 *  This file adds NO admissions logic. Every sentence it produces is already
 *  computed by the eligibility engine — `EligibilityReport` carries one
 *  `EligibilityPart` per requirement, each with an outcome and the engine's own
 *  wording. All that happens here is selection and ordering: pick the parts
 *  that actually explain the verdict, put the decisive ones first, and drop the
 *  ones that say nothing ("not required for this course").
 *
 *  Two consequences are deliberate:
 *
 *  1. The reasons can only ever come from the pathway the engine chose as the
 *     headline, and the engine chooses that from NON-CONTEXTUAL pathways
 *     whenever a course publishes any. A contextual or access offer therefore
 *     cannot appear as the reason a headline requirement is met — not because
 *     this file filters it out, but because it was never in the report.
 *
 *  2. "Insufficient information" keeps the engine's own distinct summaries, so
 *     a year the university has not published yet never reads like a course we
 *     have not researched yet.
 * ---------------------------------------------------------------------------
 */

import type {
  Course,
  EligibilityPart,
  EligibilityReport,
  EligibilityVerdict,
  PartOutcome,
} from '@/types';

/** How a single reason should read to the student. */
export type ReasonTone = 'pass' | 'fail' | 'review' | 'info';

export interface EligibilityReason {
  /** The engine part this came from — stable, so tests can name it. */
  id: string;
  tone: ReasonTone;
  /** "Physics", "Overall grade requirement", … */
  label: string;
  /** The engine's own wording, unchanged. */
  detail: string;
}

const TONE: Record<PartOutcome, ReasonTone | null> = {
  fail: 'fail',
  review: 'review',
  pass: 'pass',
  advisory: 'info',
  unknown: 'info',
  // A requirement the course does not have explains nothing.
  'not-required': null,
};

/** Decisive reasons first: what failed, then what needs a human, then what passed. */
const ORDER: Record<ReasonTone, number> = { fail: 0, review: 1, info: 2, pass: 3 };

function toReason(part: EligibilityPart): EligibilityReason | null {
  const tone = TONE[part.outcome];
  if (!tone) return null;
  return { id: part.id, tone, label: part.label, detail: part.detail };
}

/**
 * The headline sentence for a verdict — the engine's `summary`, which already
 * distinguishes "not published yet" from "not researched yet" from "add your
 * grades".
 */
export function verdictHeadline(report: EligibilityReport): string {
  return report.summary;
}

/**
 * Why this course got this verdict, most decisive first.
 *
 * `limit` trims the list for a compact surface such as a result card; the
 * course page passes no limit and shows everything.
 */
export function explainEligibility(
  report: EligibilityReport,
  course: Course,
  limit?: number,
): EligibilityReason[] {
  const reasons: EligibilityReason[] = [];

  if (report.verdict === 'insufficient-information') {
    /*
     * Nothing was evaluated, so there are no parts worth listing. The single
     * reason is the cycle/record state itself, and the three cases must stay
     * distinguishable: an unpublished year, an unresearched course, and an
     * empty student profile.
     */
    const id =
      course.requirementsPublicationStatus === 'not-yet-published'
        ? 'cycle-not-published'
        : course.offers.length === 0
          ? 'not-yet-researched'
          : 'no-profile';
    reasons.push({
      id,
      tone: 'info',
      label:
        id === 'cycle-not-published'
          ? `${course.applicationYear} entry requirements`
          : id === 'not-yet-researched'
            ? 'Admissions information'
            : 'Your A-Levels',
      detail: report.summary,
    });
    return limit ? reasons.slice(0, limit) : reasons;
  }

  const parts: EligibilityPart[] = [
    report.overallGrades,
    report.mathematics,
    report.physics,
    report.furtherMathematics,
    report.chemistry,
    report.otherSubjects,
    ...report.constraints,
  ];
  for (const p of parts) {
    const r = toReason(p);
    if (r) reasons.push(r);
  }

  // The admissions test never changes the academic verdict, so it is context,
  // never a cause — but a student still needs to know it exists.
  if (report.admissionsTest.outcome !== 'none' || course.admissionsTest.code === 'none') {
    reasons.push({
      id: 'admissions-test',
      tone: 'info',
      label: 'Admissions test',
      detail: report.admissionsTest.detail,
    });
  }

  reasons.sort((a, b) => ORDER[a.tone] - ORDER[b.tone]);
  return limit ? reasons.slice(0, limit) : reasons;
}

/**
 * The single most useful line for a result card: the first decisive reason, or
 * the headline when nothing was decisive.
 */
export function keyEligibilityReason(
  report: EligibilityReport,
  course: Course,
): EligibilityReason | null {
  const [first] = explainEligibility(report, course, 1);
  return first ?? null;
}

/**
 * Why a `review-required` verdict needs a human, as a coarse kind that tests
 * and the UI can name. Derived from which engine part produced the review — no
 * new judgement is made here.
 */
export type ReviewKind =
  | 'unscorable-grade-profile'
  | 'manual-review-pathway'
  | 'conditional-requirement'
  | 'other-review'
  | 'not-a-review';

export function reviewKind(report: EligibilityReport, course: Course): ReviewKind {
  if (report.verdict !== 'review-required') return 'not-a-review';
  // An unscorable grade string — a published range or band the catalogue
  // refuses to flatten — is the most common and most important case.
  if (report.overallGrades.outcome === 'review') return 'unscorable-grade-profile';

  /*
   * Otherwise a constraint asked for a human. The engine names constraint parts
   * `constraint-N`, positionally against the pathway's own constraint list, so
   * the KIND is read back off the course rather than guessed from the label.
   */
  const pathway = report.pathways.find((p) => p.pathwayId === report.bestPathwayId);
  const offer = course.offers.find((o) => o.id === report.bestPathwayId);
  const reviewing = (pathway?.constraintParts ?? report.constraints).filter(
    (c) => c.outcome === 'review',
  );
  const kinds = reviewing
    .map((c) => Number(c.id.replace('constraint-', '')) - 1)
    .map((i) => offer?.constraints[i]?.kind)
    .filter(Boolean);
  if (kinds.includes('manual-review')) return 'manual-review-pathway';
  if (kinds.includes('conditional-subject')) return 'conditional-requirement';
  return 'other-review';
}

export const VERDICT_TONE: Record<EligibilityVerdict, ReasonTone> = {
  meets: 'pass',
  'does-not-meet': 'fail',
  'review-required': 'review',
  'insufficient-information': 'info',
};
