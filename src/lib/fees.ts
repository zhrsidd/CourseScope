/**
 * Tuition fees — display rules and validation (v1.1).
 *
 * Fees are a separate relation from course records (see `TuitionFee`). They are
 * never part of entry requirements and never reach the eligibility engine.
 *
 * The rules here exist to make one promise hold: A FEE IS ONLY EVER SHOWN AS
 * CURRENT WHEN IT IS PUBLISHED, FOR THIS COURSE'S OWN ENTRY YEAR, WITH AN
 * OFFICIAL SOURCE AND A RECENT CHECK DATE. Anything else — awaiting
 * publication, unknown, from another year, or stale — is shown as exactly that.
 */

import type {
  Course,
  FeeBasis,
  FeeCategoryKind,
  FeeStatus,
  TuitionFee,
  University,
  ValidationIssue,
} from '@/types';

/** After this many days without a re-check, a published fee is shown as needing re-checking. */
export const FEE_STALE_AFTER_DAYS = 365;

/** Display order: home-type categories first, international last. */
export const FEE_CATEGORY_ORDER: FeeCategoryKind[] = [
  'home',
  'scotland',
  'rest-of-uk',
  'republic-of-ireland',
  'islands',
  'eu',
  'international',
  'other',
];

export const FEE_STATUS_LABEL: Record<FeeStatus, string> = {
  published: 'Published',
  'awaiting-publication': 'Not yet confirmed',
  unknown: 'Not established',
};

export const FEE_BASIS_LABEL: Record<FeeBasis, string> = {
  'per-year': 'per year',
  total: 'total for the course',
  other: 'basis not stated',
};

export function sortFees(fees: TuitionFee[]): TuitionFee[] {
  return [...fees].sort(
    (a, b) =>
      FEE_CATEGORY_ORDER.indexOf(a.categoryKind) - FEE_CATEGORY_ORDER.indexOf(b.categoryKind) ||
      a.category.localeCompare(b.category),
  );
}

export function formatGBP(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}

/**
 * Does a verbatim quote name `year` as the ENTRY year?
 *
 * "2027/28", "2027-2028", "September 2027" and "2027 entry" all name 2027. A
 * quote that mentions 2027 only as the second half of "2026/27" or
 * "2026-2027" does NOT — that is the 2026 cycle, and exactly the shape a
 * copied-forward figure would have.
 */
export function entryYearNamedIn(evidence: string | null, year: string): boolean {
  if (!evidence) return false;
  const y = Number(year);
  const prior = String(y - 1);
  const stripped = evidence.replace(
    new RegExp(`${prior}\\s*[/–-]\\s*(?:${year}|${year.slice(2)})(?!\\d)`, 'g'),
    ' ',
  );
  return new RegExp(`(^|\\D)${year}(\\D|$)`).test(stripped);
}

export function daysBetween(fromIso: string, to: Date): number {
  const from = new Date(`${fromIso}T00:00:00Z`).getTime();
  return Math.floor((to.getTime() - from) / 86_400_000);
}

/**
 * How a fee may be presented on a given day, for a given course.
 *
 *  current     — published, this course's year, sourced, checked recently
 *  awaiting    — the university has not confirmed it (maybe an expected figure)
 *  unknown     — not established
 *  stale       — was published, but not re-checked within FEE_STALE_AFTER_DAYS
 *  wrong-year  — belongs to another entry year; never displayed for this course
 *  unsourced   — published but missing provenance; never displayed as a fee
 */
export type FeeDisplayState = 'current' | 'awaiting' | 'unknown' | 'stale' | 'wrong-year' | 'unsourced';

export function feeDisplayState(fee: TuitionFee, course: Course, today: Date = new Date()): FeeDisplayState {
  if (fee.feeYear !== course.applicationYear || fee.courseId !== course.id) return 'wrong-year';
  if (fee.status === 'unknown') return 'unknown';
  if (fee.status === 'awaiting-publication') return 'awaiting';
  if (fee.amount === null || !fee.sourceUrl || !fee.lastVerified || !entryYearNamedIn(fee.yearEvidence, fee.feeYear)) {
    return 'unsourced';
  }
  if (daysBetween(fee.lastVerified, today) > FEE_STALE_AFTER_DAYS) return 'stale';
  return 'current';
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const feeIssue = (ruleId: string, severity: ValidationIssue['severity'], message: string, fee: TuitionFee): ValidationIssue => ({
  ruleId,
  severity,
  message: `${fee.category} (${fee.feeYear}): ${message}`,
  entity: 'course',
  entityId: fee.courseId,
  field: 'tuitionFees',
});

/** `www.ed.ac.uk` → `ed.ac.uk`; the registrable part of a UK university host. */
export function universityDomain(website: string): string {
  const host = new URL(website).hostname.replace(/^www\./, '');
  const parts = host.split('.');
  return parts.length > 3 && host.endsWith('.ac.uk') ? parts.slice(-3).join('.') : host;
}

export function isOfficialFeeSource(url: string, university: University): boolean {
  try {
    const u = new URL(url);
    const domain = universityDomain(university.website);
    return u.protocol === 'https:' && (u.hostname === domain || u.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

/**
 * Every rule a fee row must satisfy. Errors mean the row must not ship.
 *
 * `courses` should be every record the fees could refer to (production
 * catalogue, including non-public rows), so an orphaned fee is caught.
 */
export function validateTuitionFees(
  fees: TuitionFee[],
  courses: Course[],
  universities: University[],
): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  const courseById = new Map(courses.map((c) => [c.id, c]));
  const uniById = new Map(universities.map((u) => [u.id, u]));
  const seen = new Map<string, TuitionFee>();

  for (const fee of fees) {
    const course = courseById.get(fee.courseId);
    const uni = uniById.get(fee.universityId);

    if (!course) {
      out.push(feeIssue('fee-orphan', 'error', 'No course record has this id.', fee));
      continue;
    }
    if (course.universityId !== fee.universityId || !uni) {
      out.push(feeIssue('fee-university-mismatch', 'error', `Fee says ${fee.universityId}; course belongs to ${course.universityId}.`, fee));
    }

    // Year leakage: a fee belongs to exactly one entry year, the course's own.
    if (fee.feeYear !== course.applicationYear) {
      out.push(
        feeIssue('fee-year-leakage', 'error', `Fee year ${fee.feeYear} attached to a ${course.applicationYear} course record. Fees are never carried between entry years.`, fee),
      );
    }
    if (fee.status !== 'unknown' && !entryYearNamedIn(fee.yearEvidence, fee.feeYear)) {
      out.push(
        feeIssue('fee-year-unevidenced', 'error', `The year evidence does not name ${fee.feeYear} as the entry year: "${fee.yearEvidence ?? ''}".`, fee),
      );
    }

    // Provenance.
    if (fee.status !== 'unknown') {
      if (!fee.sourceUrl) out.push(feeIssue('fee-missing-source', 'error', 'No official source URL.', fee));
      if (!fee.sourceTitle) out.push(feeIssue('fee-missing-source-title', 'error', 'No source title.', fee));
      if (!fee.lastVerified || !ISO_DATE.test(fee.lastVerified)) {
        out.push(feeIssue('fee-missing-verified-date', 'error', 'No ISO last-verified date.', fee));
      }
    }
    if (fee.sourceUrl && uni && !isOfficialFeeSource(fee.sourceUrl, uni)) {
      out.push(feeIssue('fee-unofficial-source', 'error', `Source is not on ${universityDomain(uni.website)}: ${fee.sourceUrl}`, fee));
    }

    // Amount and status agree.
    if (fee.status === 'published') {
      if (fee.amount === null || !Number.isInteger(fee.amount) || fee.amount < 500 || fee.amount > 100_000) {
        out.push(feeIssue('fee-published-amount', 'error', `A published fee needs a whole-pound amount; got ${fee.amount}.`, fee));
      }
      if (fee.indicativeAmount !== null) {
        out.push(feeIssue('fee-indicative-on-published', 'error', 'An indicative figure belongs only on an unconfirmed fee.', fee));
      }
    } else {
      if (fee.amount !== null) {
        out.push(feeIssue('fee-amount-on-unpublished', 'error', `A fee that is ${fee.status} cannot carry an amount; record an expected figure as indicativeAmount.`, fee));
      }
      if (fee.status === 'unknown' && fee.indicativeAmount !== null) {
        out.push(feeIssue('fee-indicative-on-unknown', 'error', 'An unknown fee cannot carry an indicative figure.', fee));
      }
      if (fee.indicativeAmount !== null && !fee.note) {
        out.push(feeIssue('fee-indicative-unexplained', 'error', 'An expected figure needs the university’s caveat quoted in the note.', fee));
      }
      if (fee.status === 'unknown' && !fee.note) {
        out.push(feeIssue('fee-unknown-unexplained', 'error', 'An unknown fee must say why it is unknown.', fee));
      }
    }
    if (fee.currency !== 'GBP') out.push(feeIssue('fee-currency', 'error', `Unexpected currency ${fee.currency}.`, fee));

    // Duplicate categories: one row per category per course per year. A
    // course-specific and a university-wide row for the same category would
    // also land here — the course-specific figure is never silently overridden.
    const key = `${fee.courseId}|${fee.feeYear}|${fee.category.trim().toLowerCase()}`;
    const prior = seen.get(key);
    if (prior) {
      out.push(
        feeIssue('fee-duplicate-category', 'error', `Category recorded twice for this course and year (scopes: ${prior.scope}, ${fee.scope}).`, fee),
      );
    } else {
      seen.set(key, fee);
    }

    // Scottish classifications are preserved, never collapsed into "Home".
    if (uni?.region === 'Scotland' && fee.categoryKind === 'home') {
      out.push(
        feeIssue('fee-scottish-home-collapse', 'error', 'Scottish universities classify fees as Scotland / Rest of UK / …; a generic "home" category loses that distinction.', fee),
      );
    }
    if (uni && uni.region !== 'Scotland' && (fee.categoryKind === 'scotland' || fee.categoryKind === 'rest-of-uk')) {
      out.push(feeIssue('fee-scottish-category-outside-scotland', 'warning', 'Scotland / Rest of UK categories are expected only at Scottish universities.', fee));
    }

    // University-wide fees are never assumed: the statement itself is required.
    if (fee.scope === 'university-wide' && !fee.scopeNote) {
      out.push(
        feeIssue('fee-university-wide-unstated', 'error', 'A university-wide fee needs the university’s explicit statement quoted in scopeNote.', fee),
      );
    }
    if (fee.scope === 'fee-band' && !fee.scopeNote) {
      out.push(feeIssue('fee-band-unnamed', 'warning', 'A fee-band figure should name its band.', fee));
    }
  }
  return out;
}
