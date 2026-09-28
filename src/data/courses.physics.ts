/**
 * ---------------------------------------------------------------------------
 *  DEMO SEED DATA — NOT REAL ADMISSIONS INFORMATION
 * ---------------------------------------------------------------------------
 *  Course titles, award types and durations follow the usual UK pattern, but
 *  every offer, subject requirement, admissions test, interview policy and
 *  contextual-offer value below is PLACEHOLDER data flagged `dataStatus:'demo'`.
 *  Source URLs are deliberately `null` and `lastVerified` is `null`, so the UI
 *  reports "not yet verified" rather than implying a check that never happened.
 *
 *  To enter real data: edit the seed, set `dataStatus: 'verified'`, add
 *  `officialUrl`, `sourceUrl`, `sourceName` and `lastVerified` (YYYY-MM-DD).
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { atLeastAt, course, offer } from './builders';

const CTX_YES: ContextualOfferInfo = { availability: 'yes', details: null };
const CTX_CHECK: ContextualOfferInfo = { availability: 'check-website', details: null };
const CTX_UNKNOWN: ContextualOfferInfo = { availability: 'unknown', details: null };

export const physicsCourses: Course[] = [
  /* ---------------------------------------------------------------- */
  /* Cambridge — 2028 requirements not published yet; 2027 record kept */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'cambridge-natural-sciences-physical',
    universityId: 'cambridge',
    name: 'Natural Sciences (Physical) BA/MSci',
    category: 'physics',
    sub: 'natural-sciences-physical',
    degree: 'MSci',
    years: 4,
    code: 'BCF0',
    year: '2028',
    publication: 'not-yet-published',
    latestPublishedYear: '2027',
    fm: 'recommended',
    fmNote: 'Demo value. Verify against the official course page before relying on it.',
    test: 'esat',
    interview: 'yes',
    contextual: CTX_YES,
    notes: 'Physics is chosen as a first-year option within Natural Sciences.',
  }),
  course({
    slug: 'cambridge-natural-sciences-physical',
    universityId: 'cambridge',
    name: 'Natural Sciences (Physical) BA/MSci',
    category: 'physics',
    sub: 'natural-sciences-physical',
    degree: 'MSci',
    years: 4,
    code: 'BCF0',
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

  /* ---------------------------------------------------------------- */
  /* Oxford                                                            */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'oxford-physics',
    universityId: 'oxford',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    year: '2028',
    publication: 'not-yet-published',
    latestPublishedYear: '2027',
    fm: 'recommended',
    test: 'pat',
    interview: 'yes',
    contextual: CTX_YES,
  }),
  course({
    slug: 'oxford-physics',
    universityId: 'oxford',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    year: '2027',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], 'Physics'],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    // The 2027 Oxford Physics admissions test is the ESAT, not the PAT. This
    // sample row is superseded by the verified batch-1 record, but it must not
    // carry a wrong 2027 test code.
    test: 'esat',
    interview: 'yes',
    contextual: CTX_YES,
  }),

  /* ---------------------------------------------------------------- */
  /* Imperial                                                          */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'imperial-physics',
    universityId: 'imperial',
    name: 'Physics MSci',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
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
    gcse: 'English and Mathematics at grade 4/C or above (demo).',
  }),
  /*
   * REMOVED IN BATCH 6 — a phantom identity. Imperial publishes no standalone
   * "Theoretical Physics MSci", and no course of ANY title under UCAS code
   * F340. Its Department of Physics admissions page lists the department's
   * complete undergraduate range with codes — F300 BSc Physics, F303 MSci
   * Physics, F325 BSc Physics with Theoretical Physics, F390 MSci Physics with
   * Theoretical Physics, F309 MSci Physics with a Year Abroad — and F340
   * appears nowhere on it. The real degree is "Physics with Theoretical Physics
   * MSci", UCAS F390, which is already verified in
   * courses.real.batch2.imperial.ts. This row was therefore producing a
   * research target pointing at a course that does not exist, and is deleted
   * rather than kept as a permanent placeholder for a phantom.
   *
   * (F340 is a real code at other institutions — Bristol's Theoretical Physics
   * MSci uses it — which is exactly how a wrong code survives a plausibility
   * check.)
   */

  /* ---------------------------------------------------------------- */
  /* UCL                                                               */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'ucl-physics',
    universityId: 'ucl',
    name: 'Physics MSci',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'ucl-astrophysics',
    universityId: 'ucl',
    name: 'Astrophysics MSci',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'MSci',
    years: 4,
    code: 'F511',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
      }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),

  /* ---------------------------------------------------------------- */
  /* Manchester                                                        */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'manchester-physics',
    universityId: 'manchester',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    raw: 'AAA including Mathematics and Physics. (Demo wording — not taken from the university.)',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
        rawText: 'AAA including Mathematics and Physics.',
      }),
      offer({
        label: 'Contextual offer',
        gradeProfile: 'AAB',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        isContextual: true,
        notes: 'Applies only to applicants who meet the published contextual criteria.',
      }),
    ],
    fm: 'strongly-recommended',
    fmNote:
      'Demo value: applicants taking Further Mathematics are said to be at an advantage, but it is not required.',
    test: 'none',
    interview: 'no',
    contextual: { availability: 'yes', details: 'AAB for eligible applicants (demo).' },
  }),
  course({
    slug: 'manchester-physics-with-astrophysics',
    universityId: 'manchester',
    name: 'Physics with Astrophysics MPhys',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'MPhys',
    years: 4,
    code: 'F3F5',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'manchester-mathematics-and-physics',
    universityId: 'manchester',
    name: 'Mathematics and Physics MMath&Phys',
    category: 'physics',
    sub: 'mathematical-physics',
    degree: 'MMath',
    years: 4,
    code: 'FG31',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], ['Physics', 'A'], 'Further Mathematics'],
      }),
      offer({
        label: 'Without Further Mathematics',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        notes: 'Demo alternative offer for applicants whose school does not offer Further Mathematics.',
      }),
    ],
    fm: 'required',
    fmNote: 'Required for the standard offer; an alternative offer is published without it (demo).',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),

  /* ---------------------------------------------------------------- */
  /* Edinburgh                                                         */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'edinburgh-physics',
    universityId: 'edinburgh',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 5,
    code: 'F300',
    offers: [
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
    notes: 'Scottish integrated Master’s degrees normally run for five years.',
  }),
  course({
    slug: 'edinburgh-theoretical-physics',
    universityId: 'edinburgh',
    name: 'Theoretical Physics MPhys',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'MPhys',
    years: 5,
    code: 'F344',
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

  /* ---------------------------------------------------------------- */
  /* Bristol                                                           */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'bristol-physics',
    universityId: 'bristol',
    name: 'Physics MSci',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
    raw: 'AAA including Mathematics and Physics, with an A* in either Mathematics or Physics. (Demo wording — not taken from the university.)',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: ['Mathematics', 'Physics'],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics'],
            'A*',
            1,
            'An A* is required in either Mathematics or Physics.',
          ),
        ],
        rawText: 'AAA including Mathematics and Physics, with an A* in either Mathematics or Physics.',
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: { availability: 'yes', details: 'ABB for eligible applicants (demo).' },
  }),
  course({
    slug: 'bristol-physics-with-astrophysics',
    universityId: 'bristol',
    name: 'Physics with Astrophysics MSci',
    category: 'physics',
    sub: 'physics-with-astronomy',
    degree: 'MSci',
    years: 4,
    code: 'F3F5',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),

  /* ---------------------------------------------------------------- */
  /* Warwick                                                           */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'warwick-physics',
    universityId: 'warwick',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    raw: 'A*AA including Mathematics and Physics, or AAA including Mathematics, Physics and Further Mathematics. (Demo wording — not taken from the university.)',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
        rawText: 'A*AA including Mathematics and Physics.',
      }),
      offer({
        label: 'With Further Mathematics',
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A'], ['Physics', 'A'], ['Further Mathematics', 'A']],
        appliesOnlyIfTaking: ['Further Mathematics'],
        rawText: 'AAA including Mathematics, Physics and Further Mathematics.',
        notes: 'Demo alternative: reduced overall profile where Further Mathematics is taken.',
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'warwick-mathematics-and-physics',
    universityId: 'warwick',
    name: 'Mathematics and Physics MMathPhys',
    category: 'physics',
    sub: 'mathematical-physics',
    degree: 'MMath',
    years: 4,
    code: 'FG33',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Further Mathematics', 'A*'], ['Physics', 'A']],
      }),
    ],
    fm: 'required',
    test: 'tmua',
    testNote: 'Demo value: a strong result may attract a reduced offer.',
    interview: 'no',
    contextual: CTX_YES,
  }),

  /* ---------------------------------------------------------------- */
  /* Southampton                                                       */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'southampton-physics',
    universityId: 'southampton',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  /*
   * REMOVED IN BATCH 6 — the course is real but this row's UCAS code was wrong.
   * Southampton's own course page and its own subject listing both give
   * "Physics with Astronomy (MPhys)" the code F3FM, not F3F5, and F3FM is
   * additionally shared with "Astrophysics with Year Abroad". The verified
   * record in courses.real.batch6.southampton.ts carries the correct code and
   * that shared-code relationship; keeping this row would have left a second,
   * mis-coded row for the same degree.
   */

  /* ---------------------------------------------------------------- */
  /* Birmingham / Leeds / Sheffield / Nottingham                       */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'birmingham-physics',
    universityId: 'birmingham',
    name: 'Physics BSc',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  /*
   * REMOVED IN BATCH 5 — this sample row invented an identity that Birmingham
   * does not operate. Birmingham's real degree is "Physics and Astrophysics
   * MSci", UCAS FFH5, verified from its own page; F3F5 belongs to other
   * universities entirely. The research target it produced pointed at a course
   * that does not exist under that name, so it is deleted rather than kept as
   * a permanent placeholder for a phantom.
   */
  course({
    slug: 'leeds-physics',
    universityId: 'leeds',
    name: 'Physics BSc',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: { availability: 'yes', details: 'ABB for eligible applicants (demo).' },
  }),
  course({
    slug: 'leeds-theoretical-physics',
    universityId: 'leeds',
    name: 'Theoretical Physics BSc',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'BSc',
    years: 3,
    code: 'F340',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'sheffield-physics',
    universityId: 'sheffield',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  /*
   * REMOVED IN BATCH 5 — Sheffield publishes no course called "Physics with
   * Computer Science". Confirmed against Sheffield's own 2027 A-Z and course
   * search, which return exactly eight physics courses, none of them this one.
   * The row's UCAS code F3G4 was invented along with the title, so the
   * research target it produced is deleted rather than retained.
   */
  course({
    slug: 'nottingham-physics',
    universityId: 'nottingham',
    name: 'Physics MSci',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'nottingham-mathematical-physics',
    universityId: 'nottingham',
    name: 'Mathematical Physics BSc',
    category: 'physics',
    sub: 'mathematical-physics',
    degree: 'BSc',
    years: 3,
    code: 'FG31',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: [['Further Mathematics', 'A']],
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),

  /* ---------------------------------------------------------------- */
  /* Durham / Bath                                                     */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'durham-physics',
    universityId: 'durham',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'durham-theoretical-physics',
    universityId: 'durham',
    name: 'Theoretical Physics MPhys',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'MPhys',
    years: 4,
    code: 'F344',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A'], ['Further Mathematics', 'A']],
      }),
    ],
    fm: 'required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'bath-physics',
    universityId: 'bath',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
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
      offer({ gradeProfile: 'A*AA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
    placement: 'Optional professional placement year available (demo).',
  }),

  /* ---------------------------------------------------------------- */
  /* Scotland                                                          */
  /* ---------------------------------------------------------------- */
  course({
    slug: 'glasgow-physics',
    universityId: 'glasgow',
    name: 'Physics MSci',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 5,
    code: 'F300',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'B']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'glasgow-theoretical-physics',
    universityId: 'glasgow',
    name: 'Theoretical Physics BSc',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'BSc',
    years: 4,
    code: 'F340',
    offers: [
      offer({
        gradeProfile: 'AAB',
        required: [['Mathematics', 'A'], ['Physics', 'B']],
        recommended: ['Further Mathematics'],
      }),
    ],
    fm: 'recommended',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),
  course({
    slug: 'st-andrews-physics',
    universityId: 'st-andrews',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 5,
    code: 'F300',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'st-andrews-astrophysics',
    universityId: 'st-andrews',
    name: 'Astrophysics MPhys',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'MPhys',
    years: 5,
    code: 'F510',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'no-stated-preference',
    test: 'none',
    interview: 'no',
    contextual: CTX_UNKNOWN,
  }),

  /* ---------------------------------------------------------------- */
  /* London (KCL, QMUL) + Lancaster / Loughborough / York              */
  /* ---------------------------------------------------------------- */
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
  course({
    slug: 'lancaster-physics',
    universityId: 'lancaster',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  /*
   * REMOVED IN BATCH 7 — wrong award AND wrong code, both disproved by
   * Lancaster's own Department of Physics undergraduate listing, which
   * enumerates all 25 of its physics codes. Lancaster's integrated Master's in
   * this family is an MSci, UCAS F3G1 — there is NO MPhys in the Theoretical
   * Physics with Mathematics family, and no course at all under FG31. The row
   * therefore asserted an application that cannot be made, under a code that
   * does not exist, and it survived supersession precisely because both its
   * award and its code were wrong: neither identity key could match the real
   * record. The verified identity is in courses.real.batch7.lancaster.ts.
   */
  course({
    slug: 'loughborough-physics',
    universityId: 'loughborough',
    name: 'Physics BSc',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    offers: [
      offer({ gradeProfile: 'AAB', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
    placement: 'Optional sandwich placement year (demo).',
  }),
  course({
    slug: 'york-physics',
    universityId: 'york',
    name: 'Physics MPhys',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_YES,
  }),
  course({
    slug: 'york-physics-with-astrophysics',
    universityId: 'york',
    name: 'Physics with Astrophysics BSc',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'BSc',
    years: 3,
    code: 'F3F5',
    offers: [
      offer({ gradeProfile: 'AAA', required: [['Mathematics', 'A'], ['Physics', 'A']] }),
    ],
    fm: 'not-required',
    test: 'none',
    interview: 'no',
    contextual: CTX_CHECK,
  }),
];
