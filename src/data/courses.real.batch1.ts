/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — PILOT BATCH 1
 *  Imported 2026-09-01, corrected against the official pages 2026-09-01.
 * ---------------------------------------------------------------------------
 *  Values here were taken from each university's own course page, which is what
 *  the correction patch asked for. Where the patch's transcribed values still
 *  disagreed with the official page, the OFFICIAL page wins and the divergence
 *  is noted on the record.
 *
 *  Five of the six records had asterisks missing from the offer in the supplied
 *  text (AAA where the page says A*A*A, and so on). Those are corrected below.
 *
 *  Anything the official page did not state is still absent, not inferred —
 *  see the per-record notes for exactly what remains unconfirmed.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { atLeastAt, conditionalSubject, course, manualReview, offer } from './builders';

const CTX_YES: ContextualOfferInfo = { availability: 'yes', details: null };
const CTX_UNKNOWN: ContextualOfferInfo = { availability: 'unknown', details: null };

const VERIFIED_ON = '2026-09-01';

const OXFORD_PHYSICS_URL =
  'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/physics';
const OXFORD_ENGSCI_URL =
  'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/engineering-science';
const CAMBRIDGE_ENG_URL =
  'https://www.undergraduate.study.cam.ac.uk/courses/engineering-ba-hons-meng';
const CAMBRIDGE_NATSCI_URL =
  'https://www.undergraduate.study.cam.ac.uk/courses/natural-sciences-ba-hons-msci';
const IMPERIAL_PHYSICS_URL = 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-bsc/';
const IMPERIAL_EEE_URL =
  'https://www.imperial.ac.uk/study/courses/undergraduate/electrical-electronic-engineering-meng/';

const NOT_2028 =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';

const CAMBRIDGE_CYCLE =
  'The university states: “The entry requirements listed are for entry in 2027 or deferred entry in 2028.” They are not verified requirements for a fresh 2028-entry application cycle.';

export const batch1Courses: Course[] = [
  /* ================================================================ */
  /* 1. Oxford — Physics                                              */
  /* ================================================================ */
  course({
    slug: 'oxford-physics-mphys',
    universityId: 'oxford',
    name: 'Physics',
    awardLabel: 'MPhys / BA',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 3,
    yearsMax: 4,
    code: 'F303',
    year: '2027',
    cycleNote: NOT_2028,

    // Verbatim from the official course page. The earlier "AAA … The A must be"
    // wording was a transcription error; the page reads A*AA throughout.
    raw: 'A*AA to include Mathematics and Physics. The A* must be in Mathematics, Physics or Further Mathematics.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: ['Mathematics', 'Physics'],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics', 'Further Mathematics'],
            'A*',
            1,
            'The A* must be in Mathematics, Physics or Further Mathematics.',
          ),
        ],
        rawText:
          'A*AA to include Mathematics and Physics. The A* must be in Mathematics, Physics or Further Mathematics.',
      }),
    ],

    fm: 'recommended',
    fmNote: 'Helpful and recommended, but not required.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1', 'Mathematics 2', 'Physics'],
    testUrl: OXFORD_PHYSICS_URL,
    interview: 'yes',
    interviewNote: 'Interviews are held for shortlisted applicants.',
    contextual: CTX_YES,

    verification: 'verified',
    officialUrl: OXFORD_PHYSICS_URL,
    sourceUrl: OXFORD_PHYSICS_URL,
    sourceTitle: 'Physics | University of Oxford',
    lastVerified: VERIFIED_ON,
    notes:
      'Offer, subject conditions, ESAT modules and the 15 October 2026 deadline all read from the official course page.',
  }),

  /* ================================================================ */
  /* 2. Oxford — Engineering Science                                  */
  /* ================================================================ */
  course({
    slug: 'oxford-engineering-science-meng',
    universityId: 'oxford',
    name: 'Engineering Science',
    category: 'engineering',
    sub: 'engineering-science',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    altCodes: [
      { code: 'H811', label: 'Biomedical Engineering option' },
      { code: 'H800', label: 'Chemical Engineering option' },
      { code: 'H200', label: 'Civil Engineering option' },
      { code: 'H620', label: 'Electrical Engineering option' },
      { code: 'H630', label: 'Information Engineering option' },
      { code: 'H300', label: 'Mechanical Engineering option' },
    ],
    year: '2027',
    cycleNote: NOT_2028,

    // The official page reads A*A*A, not AAA. That resolves the earlier
    // contradiction between an AAA profile and a "two A* grades" condition.
    raw: 'A*A*A to include Mathematics and Physics. The A*s must be in Mathematics, Physics or Further Mathematics.',
    offers: [
      offer({
        gradeProfile: 'A*A*A',
        required: ['Mathematics', 'Physics'],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics', 'Further Mathematics'],
            'A*',
            2,
            'The A*s must be in Mathematics, Physics or Further Mathematics.',
          ),
        ],
        rawText:
          'A*A*A to include Mathematics and Physics. The A*s must be in Mathematics, Physics or Further Mathematics.',
      }),
    ],

    fm: 'useful',
    fmNote: 'Described as helpful, not required.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1', 'Mathematics 2', 'Physics'],
    testUrl: OXFORD_ENGSCI_URL,
    interview: 'yes',
    interviewNote: 'Interviews are held for shortlisted applicants. No written work is required.',
    contextual: CTX_YES,

    verification: 'verified',
    officialUrl: OXFORD_ENGSCI_URL,
    sourceUrl: OXFORD_ENGSCI_URL,
    sourceTitle: 'Engineering Science | University of Oxford',
    lastVerified: VERIFIED_ON,
    notes:
      'Offer corrected from AAA to A*A*A against the official page. Oxford treats the specialisms above as course options within Engineering Science, with specialisation generally deferred; they are recorded as alternative UCAS codes on this one record, not as independent programmes.',
  }),

  /* ================================================================ */
  /* 3. Cambridge — Engineering                                       */
  /* ================================================================ */
  course({
    slug: 'cambridge-engineering-meng',
    universityId: 'cambridge',
    name: 'Engineering',
    awardLabel: 'BA (Hons) / MEng',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 3,
    yearsMax: 4,
    year: '2027',
    cycleNote: CAMBRIDGE_CYCLE,

    raw: 'A level: A*A*A. You must have A levels/IB Higher Levels in Mathematics, Physics, and Further Mathematics to AS or A level if your school offers it.',
    // The official page gives A*A*A as the minimum, not AAA.
    minimumEntryStandard: 'A*A*A',
    offers: [
      offer({
        label: 'Minimum university offer',
        gradeProfile: 'A*A*A',
        required: ['Mathematics', 'Physics'],
        rawText: 'A level: A*A*A, to include Mathematics and Physics.',
        constraints: [
          conditionalSubject('school-offers-further-mathematics', 'Further Mathematics', {
            acceptsAsLevel: true,
            description:
              'Further Mathematics to AS or A level is required if your school offers it. If it is unavailable at your school, contact the college before applying.',
          }),
          manualReview(
            'Colleges usually require A* in Mathematics and/or Further Mathematics, and will often ask for A*/7 in Physics or another science subject. Most colleges set offers at the minimum level, though Churchill and Selwyn often make a higher offer. This varies by college and is deliberately not applied as a university-wide subject-grade rule.',
          ),
          manualReview(
            'Applicants to Peterhouse may additionally be asked for grade 2 in STEP II. This does not apply to Cambridge Engineering generally.',
          ),
        ],
      }),
    ],

    fm: 'conditional',
    fmNote:
      'Required to AS or A level if your school offers it; otherwise the requirement does not apply and you should contact the college. Not a simple recommendation.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1', 'Mathematics 2', 'Physics'],
    testDetails:
      'Registration in advance at an authorised assessment centre is required. For applicants using the standard October deadline, the October 2026 sitting applies to the 2027 cycle.',
    testUrl: CAMBRIDGE_ENG_URL,
    interview: 'yes',
    contextual: CTX_YES,

    verification: 'verified',
    officialUrl: CAMBRIDGE_ENG_URL,
    sourceUrl: CAMBRIDGE_ENG_URL,
    sourceTitle: 'Engineering, BA (Hons) and MEng | University of Cambridge',
    lastVerified: VERIFIED_ON,
    notes:
      'Minimum offer corrected from AAA to A*A*A against the official page. College-level variation and the Peterhouse STEP note are recorded as manual-review conditions rather than raising the university-wide minimum.',
  }),

  /* ================================================================ */
  /* 4. Cambridge — Natural Sciences                                  */
  /* ================================================================ */
  course({
    slug: 'cambridge-natural-sciences',
    universityId: 'cambridge',
    name: 'Natural Sciences',
    awardLabel: 'BA (Hons) / MSci',
    category: 'physics',
    sub: 'natural-sciences-physical',
    degree: 'MSci',
    years: 3,
    yearsMax: 4,
    code: 'BCF0',
    year: '2027',
    cycleNote: CAMBRIDGE_CYCLE,

    raw: 'A level: A*A*A. You must have A levels/IB Higher Levels in Mathematics and 2 other science or mathematics subjects (Biology, Chemistry, Physics, and, for A level only, Further Mathematics).',
    minimumEntryStandard: 'A*A*A',
    offers: [
      offer({
        label: 'Minimum university offer',
        gradeProfile: 'A*A*A',
        required: ['Mathematics'],
        constraints: [
          atLeastAt(
            ['Biology', 'Chemistry', 'Physics', 'Further Mathematics'],
            'A',
            2,
            'Two other science or mathematics subjects: Biology, Chemistry, Physics, or (A level only) Further Mathematics.',
          ),
        ],
        rawText:
          'A*A*A, to include Mathematics and 2 other science or mathematics subjects.',
        notes:
          'Physics is one of the accepted subjects, not a universal requirement — Natural Sciences covers both Physical and Biological routes.',
      }),
    ],

    fm: 'recommended',
    fmNote:
      'Further Mathematics (A level only) counts as one of the two other science or mathematics subjects. It is not separately required.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1'],
    testModuleNote:
      'Mathematics 1 plus two further modules chosen from Biology, Chemistry, Physics and Mathematics 2. No specific combination is assumed for physics-oriented applicants, because the course page does not set one out.',
    testUrl: CAMBRIDGE_NATSCI_URL,
    interview: 'yes',
    contextual: CTX_UNKNOWN,

    verification: 'verified',
    officialUrl: CAMBRIDGE_NATSCI_URL,
    sourceUrl: CAMBRIDGE_NATSCI_URL,
    sourceTitle: 'Natural Sciences, BA (Hons) and MSci | University of Cambridge',
    lastVerified: VERIFIED_ON,
    notes:
      'This is the route through which Physics is studied at Cambridge; there is no standalone Cambridge Physics undergraduate course. Applicants with Physics and Mathematics who intend to pursue Physics should apply for the Physical Sciences stream. The ESAT module structure is not set out on the course page, so only Mathematics 1 is recorded as confirmed.',
  }),

  /* ================================================================ */
  /* 5. Imperial — Physics BSc                                        */
  /* ================================================================ */
  course({
    slug: 'imperial-physics-bsc',
    universityId: 'imperial',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    year: '2027',
    cycleNote: NOT_2028,

    // The official page sets the requirement out as a bulleted list rather than
    // a single sentence, so there is no verbatim paragraph to quote. The
    // supplied "AAA overall…" text is the asterisk-stripped version and is not
    // stored. Every element below is taken from that list.
    raw: null,
    minimumEntryStandard: 'A*A*A',
    offers: [
      offer({
        label: 'Minimum entry standard (three A-Levels)',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes:
          'A* in Mathematics, A* in Physics and A in another subject. General Studies and Critical Thinking are not accepted. If you are made an offer you will be required to achieve a pass in the practical endorsement in all science subjects that form part of the offer.',
      }),
    ],

    fm: 'recommended',
    fmNote: 'Further Mathematics is recommended, but not essential.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1', 'Mathematics 2', 'Physics'],
    testUrl: IMPERIAL_PHYSICS_URL,
    interview: 'not-stated',
    contextual: CTX_UNKNOWN,

    verification: 'verified',
    officialUrl: IMPERIAL_PHYSICS_URL,
    sourceUrl: IMPERIAL_PHYSICS_URL,
    sourceTitle: 'Physics BSc | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes:
      'All fields read from the official 2027-entry course page: minimum entry standard A*A*A with A* Mathematics, A* Physics and A in another subject; Further Mathematics recommended but not essential; General Studies and Critical Thinking not accepted; practical endorsement required in science subjects forming part of the offer; ESAT with Mathematics 1, Mathematics 2 and Physics; UCAS F300; three years; October 2027 start; application deadline Wednesday 13 January 2027 at 18.00 UK time. The page states the requirement as a bulleted list, so no single verbatim sentence is stored.',
  }),

  /* ================================================================ */
  /* 6. Imperial — Electrical and Electronic Engineering MEng         */
  /* ================================================================ */
  course({
    slug: 'imperial-eee-meng',
    universityId: 'imperial',
    name: 'Electrical and Electronic Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H604',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    // The official page states "A*A*A or A*AAA (A-level)" — the two-pathway
    // structure, with the three-A-Level profile corrected from AAA to A*A*A.
    minimumEntryStandard: 'A*A*A or A*AAA',
    offers: [
      offer({
        label: 'Three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes:
          'A* in Mathematics and A* in Physics; the third subject is covered by the overall profile at a minimum of A. General Studies and Critical Thinking are not accepted. If you are made an offer you will be required to achieve a pass in the practical endorsement in all science subjects that form part of the offer.',
      }),
      offer({
        label: 'Four A-Levels',
        gradeProfile: 'A*AAA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
        appliesOnlyIfTakingAtLeast: 4,
        notes:
          'Applies to applicants taking four A-Levels. Physics is required at a minimum of A on this pathway rather than A*.',
      }),
    ],

    fm: 'strongly-recommended',
    fmNote:
      'Further Mathematics is strongly encouraged but not essential. Chemistry, Computer Science/Computing, Design and Technology and Electronics are also listed as recommended third subjects.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1', 'Mathematics 2', 'Physics'],
    testUrl: IMPERIAL_EEE_URL,
    interview: 'not-stated',
    contextual: CTX_UNKNOWN,

    verification: 'verified',
    officialUrl: IMPERIAL_EEE_URL,
    sourceUrl: IMPERIAL_EEE_URL,
    sourceTitle: 'Electrical and Electronic Engineering MEng | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes:
      'All fields read from the official 2027-entry course page: A*A*A (three A-Levels) or A*AAA (four A-Levels), with A* Mathematics and Physics at A* on the three-subject route and A on the four-subject route; Further Mathematics strongly encouraged but not essential; General Studies and Critical Thinking not accepted; practical endorsement required in science subjects forming part of the offer; ESAT with Mathematics 1, Mathematics 2 and Physics; UCAS H604; four years; October 2027 start; application deadline Wednesday 13 January 2027 at 18.00 UK time. The page states the requirement as a bulleted list, so no single verbatim sentence is stored.',
  }),
];
