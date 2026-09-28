/**
 * ---------------------------------------------------------------------------
 *  2028 DIRECT-ENTRY SHELLS — NO REQUIREMENTS
 * ---------------------------------------------------------------------------
 *  One record per verified 2027 course (batches 1 and 2) for 2028 entry,
 *  carrying course identity only.
 *  These exist so the catalogue can say "2028 requirements are not published"
 *  rather than leaving a gap that reads as "no such course".
 *
 *      requirementsPublicationStatus: 'not-yet-published'
 *      verificationStatus:            'awaiting-publication'
 *      offers:                        []
 *      latestPublishedYear:           '2027'
 *
 *  The 2027 requirements are NOT copied here, and the course page links to the
 *  2027 record as a separate, visually distinguished historical record. The
 *  public UI can therefore never describe 2027 requirements as confirmed 2028
 *  direct-entry requirements.
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { awaitingCourse } from './builders';
import { batch1Courses } from './courses.real.batch1';
import { batch2ImperialCourses } from './courses.real.batch2.imperial';
import { batch2UclCourses } from './courses.real.batch2.ucl';
import { batch3ImperialCourses } from './courses.real.batch3.imperial';
import { batch3UclCourses } from './courses.real.batch3.ucl';
import { batch3ManchesterCourses } from './courses.real.batch3.manchester';
import { batch4DurhamCourses } from './courses.real.batch4.durham';
import { batch4WarwickCourses } from './courses.real.batch4.warwick';
import { batch4EdinburghCourses } from './courses.real.batch4.edinburgh';
import { batch4BristolCourses, batch4BathCourses } from './courses.real.batch4.bristol-bath';
import { batch5GlasgowCourses } from './courses.real.batch5.glasgow';
import { batch5StAndrewsCourses } from './courses.real.batch5.st-andrews';
import { batch5NottinghamCourses } from './courses.real.batch5.nottingham';
import { batch5SheffieldCourses } from './courses.real.batch5.sheffield';
import { batch5BirminghamCourses } from './courses.real.batch5.birmingham';
import { batch5LeedsCourses } from './courses.real.batch5.leeds';
import { batch6SouthamptonCourses } from './courses.real.batch6.southampton';
import { v08VerifiedCourses } from './courses.v08.closure';
import { v09QmulCourses } from './courses.v09.qmul';
import { v09KclBEng } from './courses.v09.kcl';
import { batch6LoughboroughCourses } from './courses.real.batch6.loughborough';
import { batch6GapCourses } from './courses.real.batch6.gaps';
import { batch7YorkCourses } from './courses.real.batch7.york';
import { batch7LancasterCourses } from './courses.real.batch7.lancaster';
import { batch7ManchesterCourses } from './courses.real.batch7.manchester';

/**
 * Cambridge is a special case worth spelling out: its 2027 page covers deferred
 * entry to 2028, which is not the same as the 2028 admissions cycle.
 */
const CAMBRIDGE_2028_NOTE =
  'Cambridge has published requirements for 2027 entry and for applicants deferring that entry to 2028. This is not the same as published requirements for applicants applying in the 2027–28 admissions cycle for fresh 2028 entry.';

const GENERIC_2028_NOTE =
  'Requirements for 2028 direct entry have not been published. The 2027 record is kept separately and is not carried forward.';

/** Every verified 2027 record that needs a 2028 counterpart. */
const verified2027: Course[] = [
  ...batch1Courses,
  ...batch2ImperialCourses,
  ...batch2UclCourses,
  ...batch3ImperialCourses,
  ...batch3UclCourses,
  ...batch3ManchesterCourses,
  ...batch4DurhamCourses,
  ...batch4WarwickCourses,
  ...batch4EdinburghCourses,
  ...batch4BristolCourses,
  ...batch4BathCourses,
  ...batch5GlasgowCourses,
  ...batch5StAndrewsCourses,
  ...batch5NottinghamCourses,
  ...batch5SheffieldCourses,
  ...batch5BirminghamCourses,
  ...batch5LeedsCourses,
  // Batch 6. Only the VERIFIED 2027 records earn a shell. Southampton's five
  // awaiting-data rows are excluded on purpose: a shell asserts
  // `latestPublishedYear: '2027'`, and for those five courses no 2027 cycle was
  // ever retrieved, so claiming one would be the exact error this file exists
  // to prevent.
  ...batch6SouthamptonCourses,
  ...batch6LoughboroughCourses,
  ...batch6GapCourses,
  // Batch 7. Records carrying real 2027 admissions data earn a shell, whether
  // fully or partially verified — a partially-verified record still proves the
  // 2027 cycle was published for that application. Identity-only records do
  // NOT: for those, no 2027 cycle was ever retrieved, so a shell asserting
  // `latestPublishedYear: '2027'` would be a claim nobody has checked.
  ...batch7YorkCourses,
  ...batch7LancasterCourses,
  ...batch7ManchesterCourses,
  // v0.8 data closure. Same rule: a record earns a shell when its own 2027
  // cycle was actually retrieved. KCL's Physics MSci and General Engineering
  // MEng and Bath's Electrical and Electronic Engineering MEng all qualify.
  // KCL's Physics with Astrophysics and Cosmology BSc does NOT, even though
  // its identity is fully evidenced: KCL states on that page that its details
  // apply to 2026 entry, so no 2027 cycle has been read for it and a shell
  // asserting `latestPublishedYear: '2027'` would be exactly the false claim
  // this file exists to prevent. Queen Mary's four are excluded for the same
  // reason.
  ...v08VerifiedCourses,
  // v0.9. Queen Mary's 21 applications and KCL's General Engineering BEng all
  // had their own 2027 cycle read from year-scoped official pages, so each earns
  // a shell on the same rule as everything above it.
  ...v09QmulCourses,
  v09KclBEng,
];

export const shells2028: Course[] = verified2027.map((c) =>
  awaitingCourse({
    slug: c.slug,
    universityId: c.universityId,
    name: c.name,
    awardLabel: c.awardLabel,
    category: c.subjectCategory,
    sub: c.subjectSubcategory,
    degree: c.degreeType,
    // Identity only. The UCAS code is not a requirement, and carrying it makes
    // the shell able to displace an older invented row for the same course.
    code: c.courseCode,
    years: c.durationYears,
    yearsMax: c.durationYearsMax,
    year: '2028',
    publication: 'not-yet-published',
    latestPublishedYear: '2027',
    verification: 'awaiting-publication',
    cycleNote: c.universityId === 'cambridge' ? CAMBRIDGE_2028_NOTE : GENERIC_2028_NOTE,
    notes:
      'Course identity carried across from the 2027 record. No requirements, admissions-test arrangements or deadlines are copied.',
  }),
);
