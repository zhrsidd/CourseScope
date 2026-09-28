/**
 * ---------------------------------------------------------------------------
 *  RESEARCH TARGETS — COURSE SHELLS, NO ADMISSIONS DATA
 * ---------------------------------------------------------------------------
 *  Real courses at real universities that are queued for verified data entry.
 *  They carry course identity only — university, course name, award, subject
 *  area, duration — and every admissions field is deliberately empty:
 *
 *      offers: []                       requirementsPublicationStatus: 'unknown'
 *      mathematics / physics / chemistry / furtherMathematics: 'unknown'
 *      admissionsTest.code: 'unknown'   interview: 'not-stated'
 *      rawRequirementText: null         sourceUrl / lastVerified: null
 *      verificationStatus: 'awaiting-data'
 *
 *  Nothing here may be back-filled with a plausible value. A shell is more
 *  useful than a guess: the eligibility engine reports INSUFFICIENT INFORMATION
 *  and the UI says "awaiting verification" until a human enters a real source.
 *
 *  Batch 3 note. This list used to be DERIVED from the sample catalogue, which
 *  meant retiring the samples would have silently deleted the research queue.
 *  It is now an explicit list, audited against the verified data:
 *
 *   • Imperial, UCL and Manchester shells were removed once Batches 1–3
 *     verified those courses from the universities' own pages.
 *   • Edinburgh, Bristol and Warwick shells are retained — those universities
 *     are still unresearched, and these rows say so honestly.
 *   • Manchester Mathematics and Physics is retained: Manchester does offer it,
 *     but its 2027 requirements were not retrieved in batch 3.
 * ---------------------------------------------------------------------------
 */

import type { ApplicationYear, Course } from '@/types';
import { awaitingCourse } from './builders';

/** Universities queued for verified data entry, in priority order. */
export const PRIORITY_UNIVERSITY_IDS = [
  'cambridge',
  'oxford',
  'imperial',
  'ucl',
  'manchester',
  'warwick',
  'bristol',
  'edinburgh',
] as const;

const TARGET_YEAR: ApplicationYear = '2027';

interface TargetSeed {
  slug: string;
  universityId: string;
  name: string;
  category: 'physics' | 'engineering';
  sub: Parameters<typeof awaitingCourse>[0]['sub'];
  degree: Parameters<typeof awaitingCourse>[0]['degree'];
  years: number;
  /** Why this row is still here rather than verified or deleted. */
  why: string;
}

const TARGETS: TargetSeed[] = [
  /* --- Manchester: the one course batch 3 could not complete --------- */
  {
    slug: 'manchester-mathematics-and-physics',
    universityId: 'manchester',
    name: 'Mathematics and Physics',
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: 'MMath',
    years: 4,
    why: 'Manchester offers this jointly with the School of Mathematics. Its 2027 course page was not retrieved during batch 3, so no requirements are recorded.',
  },

  /* --- Warwick ------------------------------------------------------- */
  {
    slug: 'warwick-physics',
    universityId: 'warwick',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    why: 'Warwick has not been researched yet.',
  },
  {
    slug: 'warwick-mathematics-and-physics',
    universityId: 'warwick',
    name: 'Mathematics and Physics',
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: 'MMath',
    years: 4,
    why: 'Warwick has not been researched yet.',
  },
  {
    slug: 'warwick-engineering',
    universityId: 'warwick',
    name: 'Engineering',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    why: 'Warwick has not been researched yet.',
  },

  /* --- Bristol ------------------------------------------------------- */
  {
    slug: 'bristol-physics',
    universityId: 'bristol',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    why: 'Bristol has not been researched yet.',
  },
  {
    slug: 'bristol-physics-with-astrophysics',
    universityId: 'bristol',
    name: 'Physics with Astrophysics',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'MSci',
    years: 4,
    why: 'Bristol has not been researched yet.',
  },
  {
    slug: 'bristol-aerospace-engineering',
    universityId: 'bristol',
    name: 'Aerospace Engineering',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 4,
    why: 'Bristol has not been researched yet.',
  },
  {
    slug: 'bristol-civil-engineering',
    universityId: 'bristol',
    name: 'Civil Engineering',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    why: 'Bristol has not been researched yet.',
  },

  /* --- Edinburgh ----------------------------------------------------- */
  {
    slug: 'edinburgh-physics',
    universityId: 'edinburgh',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 5,
    why: 'Edinburgh has not been researched yet. Scottish degree lengths and Highers-based entry will need care.',
  },
  {
    slug: 'edinburgh-theoretical-physics',
    universityId: 'edinburgh',
    name: 'Theoretical Physics',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'MPhys',
    years: 5,
    why: 'Edinburgh has not been researched yet.',
  },
  {
    slug: 'edinburgh-mechanical-engineering',
    universityId: 'edinburgh',
    name: 'Mechanical Engineering',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 5,
    why: 'Edinburgh has not been researched yet.',
  },
  {
    slug: 'edinburgh-chemical-engineering',
    universityId: 'edinburgh',
    name: 'Chemical Engineering',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 5,
    why: 'Edinburgh has not been researched yet.',
  },

  /*
   * REMOVED IN BATCH 6 — these two rows were research targets for courses that
   * turn out not to be courses.
   *
   * Batch 3 saw "Materials Science and Engineering with Biomaterials" and
   * "… with Nanomaterials" on Manchester's own 2027 listing, could not load
   * their pages, and recorded them as real courses awaiting research. Batch 6
   * read the parent pages and found the answer: Manchester publishes exactly
   * TWO UCAS codes in this family — J500 for the three-year BSc and J501 for
   * the four- or five-year MEng — and Biomaterials, Metallurgy, Nanomaterials,
   * Polymers and Textiles Technology are pathways chosen INSIDE J501 after the
   * first two years ("can transfer onto one of our specialist pathways and
   * graduate with an MEng degree in…"). On the BSc the same subject areas are
   * optional final-year units.
   *
   * So these two rows were promising students two applications that do not
   * exist, while quietly omitting the other three specialisms. They are now
   * study options on the J500 and J501 records in
   * courses.real.batch3.manchester.ts, and the rows are deleted rather than
   * left as permanent placeholders for phantoms.
   */
];

export const awaitingCourses: Course[] = TARGETS.map((t) =>
  awaitingCourse({
    slug: t.slug,
    universityId: t.universityId,
    name: t.name,
    category: t.category,
    sub: t.sub,
    degree: t.degree,
    years: t.years,
    year: TARGET_YEAR,
    notes: `Awaiting verified admissions data. ${t.why}`,
  }),
);
