/**
 * ---------------------------------------------------------------------------
 *  DEMO SEED DATA — NOT REAL ADMISSIONS INFORMATION
 * ---------------------------------------------------------------------------
 *  See the note at the top of `courses.physics.ts`. Everything admissions
 *  related below is placeholder data flagged `dataStatus: 'demo'`.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { course, offer, oneOf } from './builders';

const CTX_YES: ContextualOfferInfo = { availability: 'yes', details: null };
const CTX_CHECK: ContextualOfferInfo = { availability: 'check-website', details: null };

export const engineeringCourses: Course[] = [
  /* ---------------------------- Oxbridge --------------------------- */
  course({
    slug: 'cambridge-engineering',
    universityId: 'cambridge',
    name: 'Engineering MEng',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    year: '2028',
    publication: 'not-yet-published',
    latestPublishedYear: '2027',
    fm: 'recommended',
    test: 'esat',
    interview: 'yes',
    contextual: CTX_YES,
    notes: 'Broad first two years before specialising into a named engineering stream.',
  }),
  course({
    slug: 'cambridge-engineering',
    universityId: 'cambridge',
    name: 'Engineering MEng',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    year: '2027',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'esat',
    interview: 'yes',
    contextual: CTX_YES,
  }),
  course({
    slug: 'oxford-engineering-science',
    universityId: 'oxford',
    name: 'Engineering Science MEng',
    category: 'engineering',
    sub: 'engineering-science',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'pat',
    interview: 'yes',
    contextual: CTX_YES,
  }),

  /* ---------------------------- Imperial --------------------------- */
  course({
    slug: 'imperial-mechanical-engineering',
    universityId: 'imperial',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H300',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'esat',
    interview: 'sometimes',
    contextual: CTX_YES,
  }),
  course({
    slug: 'imperial-aeronautical-engineering',
    universityId: 'imperial',
    name: 'Aeronautical Engineering MEng',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H400',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'esat',
    interview: 'sometimes',
    contextual: CTX_YES,
  }),
  course({
    slug: 'imperial-civil-engineering',
    universityId: 'imperial',
    name: 'Civil Engineering MEng',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H200',
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A*'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'esat',
    interview: 'sometimes',
    contextual: CTX_YES,
  }),
  course({
    slug: 'imperial-chemical-engineering',
    universityId: 'imperial',
    name: 'Chemical Engineering MEng',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 4,
    code: 'H800',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Chemistry', 'A']],
        recommended: ['Physics', 'Further Mathematics'],
        alternatives: { Chemistry: [] },
      }),
    ],
    fm: 'recommended',
    test: 'esat',
    interview: 'sometimes',
    contextual: CTX_YES,
    notes: 'Chemistry is a required subject for this route (demo).',
  }),
  course({
    slug: 'imperial-electrical-electronic-engineering',
    universityId: 'imperial',
    name: 'Electrical and Electronic Engineering MEng',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H600',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'esat',
    interview: 'sometimes',
    contextual: CTX_YES,
  }),
  course({
    slug: 'imperial-electronic-information-engineering',
    universityId: 'imperial',
    name: 'Electronic and Information Engineering MEng',
    category: 'engineering',
    sub: 'information-engineering',
    degree: 'MEng',
    years: 4,
    code: 'HG65',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'esat',
    interview: 'sometimes',
    contextual: CTX_YES,
  }),

  /* ------------------------------- UCL ----------------------------- */
  course({
    slug: 'ucl-mechanical-engineering',
    universityId: 'ucl',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H302',
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'ucl-civil-engineering',
    universityId: 'ucl',
    name: 'Civil Engineering BEng',
    category: 'engineering',
    sub: 'civil',
    degree: 'BEng',
    years: 3,
    code: 'H200',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        recommended: ['Physics'],
        alternatives: { Mathematics: [] },
      }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'ucl-electronic-electrical-engineering',
    universityId: 'ucl',
    name: 'Electronic and Electrical Engineering MEng',
    category: 'engineering',
    sub: 'electronic',
    degree: 'MEng',
    years: 4,
    code: 'H602',
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'ucl-biomedical-engineering',
    universityId: 'ucl',
    name: 'Biomedical Engineering MEng',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'MEng',
    years: 4,
    code: 'H160',
    raw: 'A*AA including Mathematics and one of Physics, Chemistry or Biology. (Demo wording — not taken from the university.)',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            ['Physics', 'Chemistry', 'Biology'],
            'A',
            'One further science subject at grade A: Physics, Chemistry or Biology.',
          ),
        ],
        rawText: 'A*AA including Mathematics and one of Physics, Chemistry or Biology.',
      }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),

  /* --------------------------- Manchester -------------------------- */
  course({
    slug: 'manchester-mechanical-engineering',
    universityId: 'manchester',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H300',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: { availability: 'yes', details: 'AAB for eligible applicants (demo).' },
  }),
  course({
    slug: 'manchester-aerospace-engineering',
    universityId: 'manchester',
    name: 'Aerospace Engineering MEng',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 4,
    code: 'H401',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'manchester-chemical-engineering',
    universityId: 'manchester',
    name: 'Chemical Engineering MEng',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 4,
    code: 'H803',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A'], ['Chemistry', 'A']],
        recommended: ['Physics'],
      }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'manchester-electrical-electronic-engineering',
    universityId: 'manchester',
    name: 'Electrical and Electronic Engineering BEng',
    category: 'engineering',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'H600',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),

  /* ---------------------------- Edinburgh -------------------------- */
  course({
    slug: 'edinburgh-mechanical-engineering',
    universityId: 'edinburgh',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 5,
    code: 'H300',
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'edinburgh-chemical-engineering',
    universityId: 'edinburgh',
    name: 'Chemical Engineering MEng',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 5,
    code: 'H800',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Chemistry', 'A']],
        recommended: ['Physics'],
      }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),

  /* ------------------------------ Bristol -------------------------- */
  course({
    slug: 'bristol-aerospace-engineering',
    universityId: 'bristol',
    name: 'Aerospace Engineering MEng',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 4,
    code: 'H401',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'bristol-civil-engineering',
    universityId: 'bristol',
    name: 'Civil Engineering MEng',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H201',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A']], recommended: ['Physics'] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),

  /* ------------------------------ Warwick -------------------------- */
  course({
    slug: 'warwick-engineering',
    universityId: 'warwick',
    name: 'Engineering MEng',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
      offer({
        label: 'Alternative science subject',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Chemistry', 'A']],
        notes: 'Demo alternative: Chemistry accepted in place of Physics.',
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
    notes: 'General first two years, then specialisation into a named stream.',
  }),

  /* --------------------------- Southampton ------------------------- */
  /*
   * REMOVED IN BATCH 6 — real course, wrong UCAS code. Southampton's own page
   * prints "When you apply use: UCAS course code: H401" and its own listing
   * title string reads "H401 MEng Aeronautics and Astronautics 3825 (4 years)".
   * H400 is not Southampton's code for it. The verified record lives in
   * courses.real.batch6.southampton.ts.
   */
  /*
   * REMOVED IN BATCH 6 — this row attached H610 to the MEng, and H610 is in
   * fact Southampton's BEng code ("H610 BEng Electronic Engineering 4429
   * (3 years)", from Southampton's own listing). The MEng is H603. Left in
   * place, this row would have collided with the verified BEng record on the
   * same code while carrying a different award — the exact shape the identity
   * rules classify as a conflict. Both courses now exist in
   * courses.real.batch6.southampton.ts under their correct codes: H610 as a
   * verified BEng, H603 as an awaiting-data MEng whose 2027 panel would not
   * load.
   */

  /* ------------------- Birmingham / Leeds / Sheffield --------------- */
  course({
    slug: 'birmingham-mechanical-engineering',
    universityId: 'birmingham',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H302',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'birmingham-civil-engineering',
    universityId: 'birmingham',
    name: 'Civil Engineering BEng',
    category: 'engineering',
    sub: 'civil',
    degree: 'BEng',
    years: 3,
    code: 'H200',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A']], recommended: ['Physics'] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'leeds-mechanical-engineering',
    universityId: 'leeds',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H301',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'leeds-chemical-engineering',
    universityId: 'leeds',
    name: 'Chemical Engineering MEng',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 4,
    code: 'H801',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A'], ['Chemistry', 'A']],
      }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'sheffield-aerospace-engineering',
    universityId: 'sheffield',
    name: 'Aerospace Engineering MEng',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 4,
    code: 'H401',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'sheffield-materials-science-engineering',
    universityId: 'sheffield',
    name: 'Materials Science and Engineering MEng',
    category: 'engineering',
    sub: 'materials',
    degree: 'MEng',
    years: 4,
    code: 'J500',
    offers: [
      offer({
        gradeProfile: 'AAB',
        required: [['Mathematics', 'A']],
        recommended: ['Physics', 'Chemistry'],
      }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),

  /* ------------------------ Nottingham / Durham -------------------- */
  course({
    slug: 'nottingham-mechanical-engineering',
    universityId: 'nottingham',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H301',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'nottingham-electrical-electronic-engineering',
    universityId: 'nottingham',
    name: 'Electrical and Electronic Engineering BEng',
    category: 'engineering',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'H600',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),
  course({
    slug: 'durham-general-engineering',
    universityId: 'durham',
    name: 'General Engineering MEng',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),

  /* ------------------------------- Bath ---------------------------- */
  course({
    slug: 'bath-mechanical-engineering',
    universityId: 'bath',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    /*
     * CODE STRIPPED IN BATCH 7, for the same reason as every other Bath code.
     * Bath publishes NO UCAS code in the body of any of its course pages, and
     * its course-search page — which does carry codes — is disallowed by
     * bath.ac.uk's robots.txt. So no Bath code in this catalogue has ever had
     * provenance, and the audit that found this one found it precisely because
     * every VERIFIED Bath record already carries none.
     */
    code: null,
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A*'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'sometimes',
    contextual: CTX_YES,
    placement: 'Optional placement year available (demo).',
  }),
  /*
   * REMOVED IN v0.8 — resolved against the university’s own pages.
   *
   * This was one of eight scaffold rows that cited no source at all: no course
   * page, no listing, no check date, and a note saying only that requirements
   * were unresearched. All eight also sat in the 2028 cycle with no 2027
   * counterpart, a shape no researched university in this catalogue produces.
   *
   * It has NOT been deleted on suspicion. The university's own pages were
   * searched, the application was resolved, and the replacement record lives in
   * courses.v08.closure.ts with its evidence attached.
   */

  /* ----------------------------- Glasgow --------------------------- */
  course({
    slug: 'glasgow-aerospace-engineering',
    universityId: 'glasgow',
    name: 'Aerospace Engineering MEng',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 5,
    code: 'H401',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'glasgow-civil-engineering',
    universityId: 'glasgow',
    name: 'Civil Engineering BEng',
    category: 'engineering',
    sub: 'civil',
    degree: 'BEng',
    years: 4,
    code: 'H200',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A']], recommended: ['Physics'] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),

  /* ------------------------- KCL / QMUL ---------------------------- */
  /*
   * REMOVED IN v0.8 — resolved against the university’s own pages.
   *
   * This was one of eight scaffold rows that cited no source at all: no course
   * page, no listing, no check date, and a note saying only that requirements
   * were unresearched. All eight also sat in the 2028 cycle with no 2027
   * counterpart, a shape no researched university in this catalogue produces.
   *
   * It has NOT been deleted on suspicion. The university's own pages were
   * searched, the application was resolved, and the replacement record lives in
   * courses.v08.closure.ts with its evidence attached.
   */
  /*
   * REMOVED IN v0.8 — resolved against the university’s own pages.
   *
   * This was one of eight scaffold rows that cited no source at all: no course
   * page, no listing, no check date, and a note saying only that requirements
   * were unresearched. All eight also sat in the 2028 cycle with no 2027
   * counterpart, a shape no researched university in this catalogue produces.
   *
   * It has NOT been deleted on suspicion. The university's own pages were
   * searched, the application was resolved, and the replacement record lives in
   * courses.v08.closure.ts with its evidence attached.
   */
  /*
   * REMOVED IN v0.8 — resolved against the university’s own pages.
   *
   * This was one of eight scaffold rows that cited no source at all: no course
   * page, no listing, no check date, and a note saying only that requirements
   * were unresearched. All eight also sat in the 2028 cycle with no 2027
   * counterpart, a shape no researched university in this catalogue produces.
   *
   * It has NOT been deleted on suspicion. The university's own pages were
   * searched, the application was resolved, and the replacement record lives in
   * courses.v08.closure.ts with its evidence attached.
   */

  /* ------------------- Lancaster / Loughborough / York -------------- */
  course({
    slug: 'lancaster-mechanical-engineering',
    universityId: 'lancaster',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H300',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'loughborough-mechanical-engineering',
    universityId: 'loughborough',
    name: 'Mechanical Engineering MEng',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H300',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
    placement: 'Optional sandwich placement year (demo).',
  }),
  course({
    slug: 'loughborough-aeronautical-engineering',
    universityId: 'loughborough',
    name: 'Aeronautical Engineering MEng',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H400',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),
  course({
    slug: 'loughborough-civil-engineering',
    universityId: 'loughborough',
    name: 'Civil Engineering MEng',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H201',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A']], recommended: ['Physics'] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),
  /*
   * REMOVED IN BATCH 7 — right title, wrong code, and the code belongs to a
   * different award. York's own 2027/28 A–Z gives H610 to Electronic
   * Engineering BEng and H609 to the MEng. Left in place this row would have
   * held the BEng's code against an MEng at the same university — the same
   * shape as the Southampton H610 error Batch 6 removed, and the exact case the
   * same-code-multiple-live-identities rule exists to catch. Both York courses
   * now exist under their correct codes in courses.real.batch7.york.ts.
   */
  /*
   * REMOVED IN BATCH 7 — a phantom application. "Computer Systems and Software
   * Engineering MEng" does not appear anywhere in York's own 2027/28
   * undergraduate A–Z, which was fetched in full with the filter at "Showing
   * all courses" so nothing was hidden behind a subject facet. The nearest
   * genuinely existing York degree is Electronic and Computer Engineering
   * (BEng H634 / MEng H639) — a different title with a different code, and the
   * two must not be renamed into one another. The invented code GH66 has no
   * referent at York either.
   */
];
