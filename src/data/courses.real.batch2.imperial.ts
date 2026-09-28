/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 2, PART A: IMPERIAL COLLEGE LONDON
 *  2027 entry. Read from Imperial's own course pages on 2026-09-01.
 * ---------------------------------------------------------------------------
 *  Every value below was read from the official page for that course. Imperial
 *  publishes entry requirements as a "Minimum entry standard" grade string, a
 *  "To include:" bullet list, and a separately-labelled "Typical offer" — never
 *  as one flowing sentence. So `raw` is null throughout and the university's
 *  exact bullet wording is preserved in the pathway notes instead of being
 *  stitched into a fabricated sentence.
 *
 *  Two Imperial facts that must not be generalised:
 *   • The ESAT module set is course-specific. Chemical Engineering sits
 *     Mathematics 1 + Mathematics 2 + CHEMISTRY, not Physics.
 *   • Minimum entry standard and typical offer genuinely differ on the
 *     engineering courses, and the typical offer differs between departments
 *     (Mechanical and Aeronautical publish A*A*A*; Civil publishes A*A*A).
 *
 *  Batch 1 already holds Imperial Physics BSc (F300) and Electrical and
 *  Electronic Engineering MEng (H604). They are not repeated here.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-01';

const NOT_2028 =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';

/** Imperial's own wording, identical across every course page checked. */
const CTX: ContextualOfferInfo = {
  availability: 'yes',
  details:
    'Contextual admissions route for UK applicants. Imperial states: “Our contextual admissions route for UK applicants may entitle you to additional considerations within the application process.” No reduced grade profile is published on the course page, and eligibility is assessed separately by the university.',
};

const NOT_ACCEPTED = 'Not accepted: General Studies and Critical Thinking.';
const ENDORSEMENT =
  'Science Practical Endorsement: If you are made an offer you will be required to achieve a pass in the practical endorsement in all science subjects that form part of the offer.';

const ESAT_PHYSICS = ['Mathematics 1', 'Mathematics 2', 'Physics'];
const ESAT_CHEMISTRY = ['Mathematics 1', 'Mathematics 2', 'Chemistry'];
const ESAT_NOTE =
  'Imperial states: “To be eligible for selection for this course, you will need to sit three ESAT modules.” The combination is fixed by the course — it is not a choice.';

const DEADLINE_NOTE = 'Application deadline: Wednesday 13 January 2027 at 18.00 (UK time).';

const P = (slug: string) => `https://www.imperial.ac.uk/study/courses/undergraduate/2027/${slug}/`;

const PHYSICS_MSCI_URL = P('physics-msci');
const PHYS_THEO_BSC_URL = P('physics-theoretical-bsc');
const PHYS_THEO_MSCI_URL = P('physics-theoretical-msci');
const MECHANICAL_URL = P('mechanical-engineering');
const AERONAUTICAL_URL = P('aeronautical-engineering');
const CIVIL_URL = P('civil-engineering');
const CHEMICAL_URL = P('chemical-engineering');
const EIE_URL = P('electronic-information-meng');

/**
 * The Physics department's requirement, identical verbatim on all three of its
 * remaining 2027 course pages. Repeated per record rather than shared by
 * reference so that a later change to one course cannot silently move another.
 */
const PHYSICS_TO_INCLUDE =
  'To include: A* in Mathematics; A* in Physics; A in another subject (Further Mathematics is recommended, but not essential).';

export const batch2ImperialCourses: Course[] = [
  /* ================================================================ */
  /* 1. Imperial — Physics MSci (F303)                                */
  /* ================================================================ */
  course({
    slug: 'imperial-physics-msci',
    universityId: 'imperial',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A',
    typicalOffer: 'A*A*A (applicants studying three A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard (three A-Levels)',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes: `${PHYSICS_TO_INCLUDE} ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],

    fm: 'recommended',
    fmNote: 'Further Mathematics is recommended, but not essential.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: PHYSICS_MSCI_URL,
    interview: 'no',
    interviewNote: 'Generally, the department does not hold interviews.',
    contextual: CTX,

    verification: 'verified',
    officialUrl: PHYSICS_MSCI_URL,
    sourceUrl: PHYSICS_MSCI_URL,
    sourceTitle: 'Physics MSci | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer published separately as A*A*A (applicants studying three A-levels) — the same string as the minimum entry standard. ${DEADLINE_NOTE} A separate "Physics with a Year Abroad" study option is offered on the same page under UCAS code F309 and is held as its own record.`,
  }),

  /* ================================================================ */
  /* 2. Imperial — Physics with a Year Abroad MSci (F309)             */
  /* ================================================================ */
  course({
    slug: 'imperial-physics-year-abroad-msci',
    universityId: 'imperial',
    name: 'Physics with a Year Abroad',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F309',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A',
    typicalOffer: 'A*A*A (applicants studying three A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard (three A-Levels)',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes: `${PHYSICS_TO_INCLUDE} ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],

    fm: 'recommended',
    fmNote: 'Further Mathematics is recommended, but not essential.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: PHYSICS_MSCI_URL,
    interview: 'no',
    interviewNote: 'Generally, the department does not hold interviews.',
    contextual: CTX,
    gcse:
      'Language requirement: You will also need an appropriate modern language at GCSE grade B/6. (Published for this study option only.)',
    placement: 'Year 3 is spent abroad.',

    verification: 'verified',
    officialUrl: PHYSICS_MSCI_URL,
    sourceUrl: PHYSICS_MSCI_URL,
    sourceTitle: 'Physics MSci | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `A distinct UCAS choice (F309) presented as a study option on the Physics MSci page, with its own "Submit your application via UCAS | F309" link. Kept as a separate record because the UCAS code differs and it carries an extra GCSE modern-language requirement. Academic requirements are otherwise the same as F303 on the same page. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 3. Imperial — Physics with Theoretical Physics BSc (F325)        */
  /* ================================================================ */
  course({
    slug: 'imperial-physics-theoretical-bsc',
    universityId: 'imperial',
    name: 'Physics with Theoretical Physics',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'BSc',
    years: 3,
    code: 'F325',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A',
    typicalOffer: 'A*A*A (applicants studying three A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard (three A-Levels)',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes: `${PHYSICS_TO_INCLUDE} ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],

    fm: 'recommended',
    fmNote: 'Further Mathematics is recommended, but not essential.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: PHYS_THEO_BSC_URL,
    interview: 'no',
    interviewNote: 'Generally, the department does not hold interviews.',
    contextual: CTX,

    verification: 'verified',
    officialUrl: PHYS_THEO_BSC_URL,
    sourceUrl: PHYS_THEO_BSC_URL,
    sourceTitle: 'Physics with Theoretical Physics BSc | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer published separately as A*A*A (applicants studying three A-levels). No Year Abroad study option is offered on this page. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 4. Imperial — Physics with Theoretical Physics MSci (F390)       */
  /* ================================================================ */
  course({
    slug: 'imperial-physics-theoretical-msci',
    universityId: 'imperial',
    name: 'Physics with Theoretical Physics',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'MSci',
    years: 4,
    code: 'F390',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A',
    typicalOffer: 'A*A*A (applicants studying three A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard (three A-Levels)',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes: `${PHYSICS_TO_INCLUDE} ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],

    fm: 'recommended',
    fmNote: 'Further Mathematics is recommended, but not essential.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: PHYS_THEO_MSCI_URL,
    interview: 'no',
    interviewNote: 'Generally, the department does not hold interviews.',
    contextual: CTX,

    verification: 'verified',
    officialUrl: PHYS_THEO_MSCI_URL,
    sourceUrl: PHYS_THEO_MSCI_URL,
    sourceTitle: 'Physics with Theoretical Physics MSci | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer published separately as A*A*A (applicants studying three A-levels). No Year Abroad study option is offered on this page. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 5. Imperial — Mechanical Engineering MEng (H301)                 */
  /* ================================================================ */
  course({
    slug: 'imperial-mechanical-engineering-meng',
    universityId: 'imperial',
    name: 'Mechanical Engineering',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H301',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A or A*AAA',
    typicalOffer: 'A*A*A* (applicants studying three A-levels); A*A*AA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard — three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        notes: `To include: A* in Mathematics; A/A* in Physics (A* is required if applying with three A-levels. At least an A is required if applying with four A-levels); A in a third and/or fourth subject. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
      offer({
        label: 'Minimum entry standard — four A-Levels',
        gradeProfile: 'A*AAA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        appliesOnlyIfTakingAtLeast: 4,
        notes:
          'Applies to applicants taking four A-Levels. Imperial states that at least an A in Physics is required on this route rather than an A*.',
      }),
    ],

    // Batch 4: "Mechanical Engineering with Nuclear Engineering" has its own
    // Imperial course page but tells applicants to apply to H301 — this
    // application. Recorded as a route, not a separate course.
    studyOptions: [
      {
        name: 'Mechanical Engineering with Nuclear Engineering',
        description:
          'Imperial publishes this as a named MEng course with its own page, but the application is made to this course. Its published minimum entry standard (A*A*A or A*AAA), subject conditions and ESAT modules match this record. A "with a Year in Industry" variant of it also applies to this code.',
        ucasCode: 'H301',
        chosenWhen: 'Applied for through this course’s UCAS code.',
        officialUrl: P('mechanical-engineering-nuclear'),
      },
      {
        name: 'Mechanical Engineering with a Year Abroad / Year in Industry',
        description:
          'Study options on the same application. Imperial states these variants apply to UCAS code H301; the Year Abroad routes are not IMechE-accredited.',
        ucasCode: 'H301',
        chosenWhen: 'A study option on this application.',
        officialUrl: MECHANICAL_URL,
      },
    ],

    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: MECHANICAL_URL,
    interview: 'not-stated',
    contextual: CTX,

    verification: 'verified',
    officialUrl: MECHANICAL_URL,
    sourceUrl: MECHANICAL_URL,
    sourceTitle: 'Mechanical Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer is published separately and is HIGHER than the minimum entry standard: A*A*A* (applicants studying three A-levels) and A*A*AA (applicants studying four A-levels). Imperial states typical offers "can be higher than the minimum entry requirements". The pathways above encode the published MINIMUM entry standard; the typical offer is recorded here rather than as a matchable pathway because Imperial presents it as an observed statistic, not a stated condition. Year Abroad and Year in Industry variants are study options applying to the same UCAS code H301, so they are not separate records. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 6. Imperial — Aeronautical Engineering MEng (H401)               */
  /* ================================================================ */
  course({
    slug: 'imperial-aeronautical-engineering-meng',
    universityId: 'imperial',
    name: 'Aeronautical Engineering',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H401',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A or A*AAA',
    typicalOffer: 'A*A*A* (applicants studying three A-levels); A*A*AA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard — three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes: `To include: A* in Mathematics; A/A* in Physics (A* is required if applying with three A-levels. At least an A is required if applying with four A-levels); A in a third and/or fourth subject. ${NOT_ACCEPTED} Preferred subjects: Further Mathematics is recommended but not essential. ${ENDORSEMENT}`,
      }),
      offer({
        label: 'Minimum entry standard — four A-Levels',
        gradeProfile: 'A*AAA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
        appliesOnlyIfTakingAtLeast: 4,
        notes:
          'Applies to applicants taking four A-Levels. Imperial states that at least an A in Physics is required on this route rather than an A*.',
      }),
    ],

    // Batch 4: Imperial publishes "Aeronautics with Spacecraft Engineering" on
    // its own course page but directs applicants to THIS application (H401).
    // It is therefore a route within this course, not a separate UCAS choice,
    // and is recorded as a study option rather than a second course record.
    studyOptions: [
      {
        name: 'Aeronautics with Spacecraft Engineering',
        description:
          'Imperial publishes this as a named MEng course with its own page, but the application is made to this course. Its published minimum entry standard (A*A*A or A*AAA), subject conditions and ESAT modules match this record.',
        ucasCode: 'H401',
        chosenWhen: 'Applied for through this course’s UCAS code.',
        officialUrl: P('aeronautics-spacecraft-engineering'),
      },
    ],

    fm: 'recommended',
    fmNote: 'Preferred subjects: Further Mathematics is recommended but not essential.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: AERONAUTICAL_URL,
    interview: 'not-stated',
    contextual: CTX,

    verification: 'verified',
    officialUrl: AERONAUTICAL_URL,
    sourceUrl: AERONAUTICAL_URL,
    sourceTitle: 'Aeronautical Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer is published separately and is HIGHER than the minimum entry standard: A*A*A* (applicants studying three A-levels) and A*A*AA (applicants studying four A-levels). Year Abroad and Year in Industry variants apply to the same UCAS code H401. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 7. Imperial — Civil Engineering MEng (H201)                      */
  /* ================================================================ */
  course({
    slug: 'imperial-civil-engineering-meng',
    universityId: 'imperial',
    name: 'Civil Engineering',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H201',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A or A*AAA',
    typicalOffer: 'A*A*A (applicants studying three A-levels); A*AAA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard — three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        notes: `To include: A* in Mathematics; A/A* in Physics (A* is required if applying with three A-levels. At least an A is required if applying with four A-levels); A in a third/fourth subject. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
      offer({
        label: 'Minimum entry standard — four A-Levels',
        gradeProfile: 'A*AAA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        appliesOnlyIfTakingAtLeast: 4,
        notes:
          'Applies to applicants taking four A-Levels. Imperial states that at least an A in Physics is required on this route rather than an A*.',
      }),
    ],

    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: CIVIL_URL,
    interview: 'not-stated',
    contextual: CTX,

    verification: 'verified',
    officialUrl: CIVIL_URL,
    sourceUrl: CIVIL_URL,
    sourceTitle: 'Civil Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer published separately as A*A*A (three A-levels) and A*AAA (four A-levels) — note this is LOWER than the Mechanical and Aeronautical typical offers, so the departments must not be treated as interchangeable. A "Civil Engineering with a Year Abroad" study option exists on the same page; its UCAS code was not confirmed on the page view checked, so no alternative code is recorded. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 8. Imperial — Chemical Engineering MEng (H801)                   */
  /* ================================================================ */
  course({
    slug: 'imperial-chemical-engineering-meng',
    universityId: 'imperial',
    name: 'Chemical Engineering',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 4,
    code: 'H801',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A',
    typicalOffer: 'A*A*A (applicants studying three A-levels); A*A*AA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'A*A*A',
        // Physics is NOT required here. It is one of five accepted third
        // subjects. Chemistry is required and Physics is not.
        required: [['Chemistry', 'A*'], ['Mathematics', 'A*']],
        constraints: [
          oneOf(
            ['Biology', 'Business Studies', 'Economics', 'Further Mathematics', 'Physics'],
            'A',
            'A in Biology, Business Studies, Economics, Further Mathematics or Physics.',
          ),
        ],
        notes: `To include: A* in Chemistry; A* in Mathematics; A in Biology, Business Studies, Economics, Further Mathematics or Physics. ${NOT_ACCEPTED} Preferred subjects: If you’re studying four A-levels, we prefer the fourth to be in Physics, Biology, Further Mathematics, Business Studies or Economics at grade A. ${ENDORSEMENT}`,
      }),
    ],

    fm: 'useful',
    fmNote:
      'Further Mathematics is one of the five accepted third subjects, and one of the preferred fourth subjects. It is not required.',
    test: 'esat',
    testRequirement: 'required',
    // Chemistry, not Physics — this course's ESAT combination is different.
    testModules: ESAT_CHEMISTRY,
    testModuleNote: `${ESAT_NOTE} This course requires the Chemistry module, not Physics.`,
    testUrl: CHEMICAL_URL,
    interview: 'not-stated',
    contextual: CTX,

    verification: 'verified',
    officialUrl: CHEMICAL_URL,
    sourceUrl: CHEMICAL_URL,
    sourceTitle: 'Chemical Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Physics is NOT a required subject for this course — Chemistry and Mathematics are. Typical offer published separately as A*A*A (three A-levels) and A*A*AA (four A-levels). The minimum entry standard is published as a single string with no separate four-A-Level variant. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 9. Imperial — Electronic and Information Engineering MEng (GH56) */
  /* ================================================================ */
  course({
    slug: 'imperial-electronic-information-engineering-meng',
    universityId: 'imperial',
    name: 'Electronic and Information Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'GH56',
    year: '2027',
    cycleNote: `${NOT_2028} The official page gives a start date of October 2027.`,

    raw: null,
    minimumEntryStandard: 'A*A*A or A*AAA',
    typicalOffer: 'A*A*A (applicants studying three A-levels); A*AAA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard — three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics'],
        notes: `To include: A* in Mathematics; A*/A in Physics (A* is required if applying with three A-levels. At least an A is required if applying with four A-levels); A in a third and/or fourth subject. ${NOT_ACCEPTED} Recommended: Further Mathematics (strongly encouraged but not essential). ${ENDORSEMENT}`,
      }),
      offer({
        label: 'Minimum entry standard — four A-Levels',
        gradeProfile: 'A*AAA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        recommended: ['Further Mathematics'],
        appliesOnlyIfTakingAtLeast: 4,
        notes:
          'Applies to applicants taking four A-Levels. Imperial states that at least an A in Physics is required on this route rather than an A*.',
      }),
    ],

    fm: 'strongly-recommended',
    fmNote: 'Further Mathematics (strongly encouraged but not essential).',
    test: 'esat',
    testRequirement: 'required',
    testModules: ESAT_PHYSICS,
    testModuleNote: ESAT_NOTE,
    testUrl: EIE_URL,
    interview: 'sometimes',
    interviewNote:
      'If your UCAS application indicates that you are likely to satisfy our requirements, your personal statement shows a clear interest in the subject, and you perform well in the admissions test, you may be invited for an online interview.',
    contextual: CTX,

    verification: 'verified',
    officialUrl: EIE_URL,
    sourceUrl: EIE_URL,
    sourceTitle: 'Electronic and Information Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Typical offer published separately as A*A*A (three A-levels) and A*AAA (four A-levels). A "with a Year Abroad" study option sits on the same page under the same UCAS code. ${DEADLINE_NOTE}`,
  }),
];
