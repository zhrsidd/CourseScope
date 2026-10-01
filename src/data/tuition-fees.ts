/**
 * Tuition fees, assembled for the app (v1.1).
 *
 * One relation, separate from course records: every row belongs to one course
 * id (slug + entry year). There are no 2028 rows — no university in the
 * catalogue had published 2028-entry fees when this was researched, and a 2027
 * figure is never copied forward. A 2028 course therefore shows "not yet
 * published", not last year's fee.
 */
import type { Course, TuitionFee } from '@/types';
import { sortFees } from '@/lib/fees';
import { TUITION_FEES_2027, TUITION_FEE_GAPS_2027, type TuitionFeeGap } from './tuition-fees.2027';

export type { TuitionFeeGap } from './tuition-fees.2027';

export const TUITION_FEES: TuitionFee[] = [...TUITION_FEES_2027];

/** Courses researched but with nothing established, and why. Admin/report only. */
export const TUITION_FEE_GAPS: TuitionFeeGap[] = [...TUITION_FEE_GAPS_2027];

const byCourse = new Map<string, TuitionFee[]>();
for (const f of TUITION_FEES) {
  const list = byCourse.get(f.courseId) ?? [];
  list.push(f);
  byCourse.set(f.courseId, list);
}

/**
 * The fee rows for this course record, in display order. Only rows for the
 * course's own entry year are ever returned, whatever the data contains.
 */
export function feesForCourse(course: Course): TuitionFee[] {
  return sortFees((byCourse.get(course.id) ?? []).filter((f) => f.feeYear === course.applicationYear));
}

/** Researched entry years. A year outside this set has no fee rows at all. */
export const FEE_RESEARCHED_YEARS = new Set(TUITION_FEES.map((f) => f.feeYear));

/**
 * The 2027 research also checked every university for 2028-entry fees and
 * found none published (see data/research/fees-2027, `notes2028`). The date is
 * shown beside "not yet published" so the statement is never open-ended.
 */
export const FEES_2028_CHECKED_ON = '2026-09-30';
