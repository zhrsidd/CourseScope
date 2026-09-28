import type { Course, VerificationStatus } from '@/types';
import { obsoletePlaceholderIds, supersededIds } from '@/lib/identity';
import { toResearchTarget } from './builders';
import { FIXTURE_IDS } from './fixtures';
import { awaitingCourses } from './courses.awaiting';
import { engineeringCourses } from './courses.engineering';
import { physicsCourses } from './courses.physics';
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
import {
  batch6SouthamptonCourses,
  batch6SouthamptonAwaitingCourses,
} from './courses.real.batch6.southampton';
import { batch6LoughboroughCourses } from './courses.real.batch6.loughborough';
import { batch6GapCourses } from './courses.real.batch6.gaps';
import { batch7YorkCourses, batch7YorkAwaitingCourses } from './courses.real.batch7.york';
import {
  batch7LancasterCourses,
  batch7LancasterAwaitingCourses,
} from './courses.real.batch7.lancaster';
import { batch7ManchesterCourses } from './courses.real.batch7.manchester';
import { shells2028 } from './courses.2028-shells';

export {
  universities,
  universityById,
  allUniversities,
  publicUniversity,
  HAS_PUBLIC_RANKINGS,
} from './universities';
export { PRIORITY_UNIVERSITY_IDS } from './courses.awaiting';
export { batch1Courses } from './courses.real.batch1';
export { batch2ImperialCourses } from './courses.real.batch2.imperial';
export { batch2UclCourses } from './courses.real.batch2.ucl';
export { batch3ImperialCourses } from './courses.real.batch3.imperial';
export { batch3UclCourses } from './courses.real.batch3.ucl';
export { batch3ManchesterCourses } from './courses.real.batch3.manchester';
export { batch4DurhamCourses } from './courses.real.batch4.durham';
export { batch4WarwickCourses } from './courses.real.batch4.warwick';
export { batch4EdinburghCourses } from './courses.real.batch4.edinburgh';
export { batch4BristolCourses, batch4BathCourses } from './courses.real.batch4.bristol-bath';
export { batch5GlasgowCourses } from './courses.real.batch5.glasgow';
export { batch5StAndrewsCourses, ST_ANDREWS_UNPUBLISHED_JOINT_CODES } from './courses.real.batch5.st-andrews';
export { batch5NottinghamCourses } from './courses.real.batch5.nottingham';
export { batch5SheffieldCourses } from './courses.real.batch5.sheffield';
export { batch5BirminghamCourses } from './courses.real.batch5.birmingham';
export { batch5LeedsCourses, LEEDS_NON_2027_PAGES } from './courses.real.batch5.leeds';
export {
  batch6SouthamptonCourses,
  batch6SouthamptonAwaitingCourses,
  batch6SouthamptonAll,
} from './courses.real.batch6.southampton';
export {
  batch6LoughboroughCourses,
  LOUGHBOROUGH_NONEXISTENT_TITLES,
} from './courses.real.batch6.loughborough';
export {
  batch6BristolCourses,
  batch6BathCourses,
  batch6GapCourses,
} from './courses.real.batch6.gaps';
export {
  batch7YorkCourses,
  batch7YorkAwaitingCourses,
  batch7YorkAll,
  YORK_NONEXISTENT_TITLES,
  YORK_H105_OPTION_MODULES,
} from './courses.real.batch7.york';
export {
  batch7LancasterCourses,
  batch7LancasterAwaitingCourses,
  batch7LancasterAll,
  LANCASTER_NONEXISTENT_TITLES,
  LANCASTER_ENGINEERING_FAMILIES,
} from './courses.real.batch7.lancaster';
export { batch7ManchesterCourses } from './courses.real.batch7.manchester';
export {
  v08VerifiedCourses,
  v08AwaitingCourses,
  V08_RESOLVED_UNEVIDENCED,
} from './courses.v08.closure';
import { v08ClosureCourses } from './courses.v08.closure';
export { v09QmulCourses, QMUL_NOT_APPLICATIONS } from './courses.v09.qmul';
export { v09KclBEng } from './courses.v09.kcl';
import { v09QmulCourses } from './courses.v09.qmul';
import { v09KclBEng } from './courses.v09.kcl';
export { FIXTURE_IDS, FIXTURE_NOTES, isTestFixture } from './fixtures';

/** Batch 2 as one list, for tests and admin reporting. */
export const batch2Courses: Course[] = [...batch2ImperialCourses, ...batch2UclCourses];

/** Batch 3 as one list, for tests and admin reporting. */
export const batch3Courses: Course[] = [
  ...batch3ImperialCourses,
  ...batch3UclCourses,
  ...batch3ManchesterCourses,
];

/** Batch 4 as one list, for tests and admin reporting. */
export const batch4Courses: Course[] = [
  ...batch4DurhamCourses,
  ...batch4WarwickCourses,
  ...batch4EdinburghCourses,
  ...batch4BristolCourses,
  ...batch4BathCourses,
];
/** Batch 5 as one list, for tests and admin reporting. */
export const batch5Courses: Course[] = [
  ...batch5GlasgowCourses,
  ...batch5StAndrewsCourses,
  ...batch5NottinghamCourses,
  ...batch5SheffieldCourses,
  ...batch5BirminghamCourses,
  ...batch5LeedsCourses,
];

/**
 * Batch 6 as one list, for tests and admin reporting.
 *
 * `batch6VerifiedCourses` is what earns a 2028 shell. The Southampton
 * awaiting-data rows are real courses whose 2027 pages would not serve 2027
 * requirements, so they carry identity only and must not imply that a 2027
 * cycle was published for them.
 */
export const batch6VerifiedCourses: Course[] = [
  ...batch6SouthamptonCourses,
  ...batch6LoughboroughCourses,
  ...batch6GapCourses,
];
export const batch6Courses: Course[] = [
  ...batch6VerifiedCourses,
  ...batch6SouthamptonAwaitingCourses,
];

/**
 * Batch 7 as one list.
 *
 * `batch7VerifiedCourses` is what earns a 2028 shell: records carrying real
 * 2027 admissions data, whether fully or partially verified. The awaiting list
 * is records whose APPLICATION IDENTITY is confirmed from the university's own
 * listing but whose requirements have not been read — real courses a student
 * should be able to find, with nothing asserted about what they ask for.
 */
export const batch7VerifiedCourses: Course[] = [
  ...batch7YorkCourses,
  ...batch7LancasterCourses,
  ...batch7ManchesterCourses,
];
export const batch7AwaitingCourses: Course[] = [
  ...batch7YorkAwaitingCourses,
  ...batch7LancasterAwaitingCourses,
];
export const batch7Courses: Course[] = [...batch7VerifiedCourses, ...batch7AwaitingCourses];

/**
 * v0.8 data closure. Kept as its own layer rather than folded into the batch
 * files, so the numbered batches stay exactly as they were locked and the
 * closure work can be audited on its own.
 */
export const v08Courses: Course[] = [...v08ClosureCourses];

/**
 * v0.9 release-candidate data. Two additions, both closures rather than
 * expansion: Queen Mary becomes a verified university, and KCL's General
 * Engineering BEng — read in v0.8 to prove what H100 is, then deliberately
 * held back — is imported alongside the MEng it was always paired with.
 */
export const v09Courses: Course[] = [...v09QmulCourses, v09KclBEng];
export * from './taxonomy';

/* ------------------------------------------------------------------ */
/* Production data versus test fixtures                                */
/* ------------------------------------------------------------------ */

/** Every hand-written seed row, before production filtering. */
const seedRows: Course[] = [
  ...physicsCourses,
  ...engineeringCourses,
  ...awaitingCourses,
  ...batch1Courses,
  ...batch2Courses,
  ...batch3Courses,
  ...batch4Courses,
  ...batch5Courses,
  ...batch6Courses,
  ...batch7Courses,
  ...v08Courses,
  ...v09Courses,
  ...shells2028,
];

/**
 * Synthetic records kept solely to exercise engine and validation behaviour.
 * They never enter the production catalogue — see `src/data/fixtures.ts`.
 */
export const testFixtureCourses: Course[] = seedRows.filter((c) => FIXTURE_IDS.has(c.id));

/**
 * The original sample rows carried invented offers, subject statuses and
 * admissions tests. Their course IDENTITY is real and worth keeping — someone
 * searching for Physics at Leeds should find that the course exists — but the
 * invented requirements are not. Every remaining sample row is therefore
 * demoted to an identity-only research target, which says plainly that its
 * requirements have not been checked yet.
 */
const researchTargets: Course[] = seedRows
  .filter((c) => c.provenance.verificationStatus === 'demo' && !FIXTURE_IDS.has(c.id))
  .map(toResearchTarget);

/** Every record the production catalogue holds, including superseded rows. */
export const allCourses: Course[] = [
  ...seedRows.filter((c) => c.provenance.verificationStatus !== 'demo' && !FIXTURE_IDS.has(c.id)),
  ...researchTargets,
];

/** Production records plus fixtures — for the assertion suite only. */
export const allCoursesWithFixtures: Course[] = [...allCourses, ...testFixtureCourses];

/**
 * Placeholder rows (`demo` and `awaiting-data`) are dropped once a real,
 * checked record exists for the same course and cycle. Matching uses the
 * identity rules in `src/lib/identity.ts` — UCAS code first, canonical course
 * name and award as the fallback — so harmless formatting differences such as
 * "Physics (MPhys)" versus "MPhys Physics" do not leave a duplicate behind.
 */
export { obsoletePlaceholderIds, supersededIds } from '@/lib/identity';
export { isPubliclyDiscoverable } from '@/lib/identity-invariant';
import { isPubliclyDiscoverable } from '@/lib/identity-invariant';

const superseded = supersededIds(allCourses);

/**
 * Rows that a proper "not yet published" 2028 shell has made redundant.
 */
const obsolete = obsoletePlaceholderIds(allCourses);

/** Everything dropped from the served catalogue, with the reason kept. */
export const suppressedIds: Set<string> = new Set([...superseded, ...obsolete]);

/**
 * What the app actually serves: everything except superseded placeholders AND
 * anything the v1 public-data policy excludes.
 *
 * The policy check is `isPubliclyDiscoverable`, and it removes exactly one
 * class of record: an awaiting-data row whose IDENTITY rests on no official
 * source. Those rows remain in `allCourses`, remain visible in the admin
 * tools, and remain in the research backlog — they are simply not offered to
 * a student as courses, and they are not counted in anything a student sees.
 */
export const courses: Course[] = allCourses.filter(
  (c) => !suppressedIds.has(c.id) && isPubliclyDiscoverable(c),
);

/** Records held back from public discovery by the v1 policy, for the admin view. */
export const policyExcludedCourses: Course[] = allCourses.filter(
  (c) => !suppressedIds.has(c.id) && !isPubliclyDiscoverable(c),
);

export const courseById: Record<string, Course> = Object.fromEntries(
  courses.map((c) => [c.id, c]),
);

export function countByVerification(list: Course[]): Record<VerificationStatus, number> {
  const out: Record<VerificationStatus, number> = {
    verified: 0,
    'partially-verified': 0,
    'awaiting-publication': 0,
    'awaiting-data': 0,
    demo: 0,
    unknown: 0,
  };
  for (const c of list) out[c.provenance.verificationStatus] += 1;
  return out;
}

/** True once any record has been checked against a real source. */
export const hasVerifiedData = courses.some(
  (c) =>
    c.provenance.verificationStatus === 'verified' ||
    c.provenance.verificationStatus === 'partially-verified',
);

/**
 * The footer line, and the shortest honest statement of what this is.
 *
 * Kept to four sentences on purpose. v0.9's trust pass added the two facts a
 * reader most needs and the previous wording left out — that this is an
 * independent tool rather than anything official, and that the data comes from
 * the universities' own pages — while resisting the temptation to move the whole
 * methodology page into the footer. The detail lives one click away, on a page
 * built for it. A product that buries itself in disclaimers is not more
 * trustworthy, only harder to use.
 */
export const CATALOGUE_DISCLAIMER =
  'An independent research tool, not affiliated with any university or with UCAS. Entry requirements are read from universities’ own pages and are tied to a single entry year. Meeting them does not guarantee an offer — interviews, admissions tests and competition for places all apply. Always confirm the final details with the university before you apply.';

export {
  subjectGuidanceFor,
  SUBJECT_GUIDANCE_BY_UNIVERSITY,
  UCL_A_LEVEL_SUBJECT_GUIDANCE,
  type UniversitySubjectGuidance,
} from './university-subject-guidance';
