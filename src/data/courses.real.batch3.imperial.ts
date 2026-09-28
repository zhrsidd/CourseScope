/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 3, PART A: IMPERIAL COLLEGE LONDON
 *  2027 entry. Read from Imperial's own course pages on 2026-09-02.
 * ---------------------------------------------------------------------------
 *  What this batch showed that earlier ones did not:
 *
 *   • The Materials department publishes AAA as its minimum and A*AA as its
 *     typical offer, and states outright that it uses NO admissions test.
 *     That is an explicit "none", not an absence of information.
 *   • Design Engineering sits only TWO ESAT modules (Mathematics 1 and
 *     Mathematics 2 — no Physics), and names no science subject at all in its
 *     A-Level requirement.
 *   • Molecular Bioengineering requires CHEMISTRY where Biomedical Engineering
 *     requires Physics — two courses in the same department, different rules.
 *   • Biomedical Engineering and Molecular Bioengineering publish their typical
 *     offer as a RANGE ("A*AA - A*A*A"), which is display-only and is never
 *     matched against a student's grades.
 *
 *  Two courses in the research brief are NOT here, and deliberately so.
 *  Imperial publishes "Aeronautics with Spacecraft Engineering" under UCAS code
 *  H401 — the same code as Aeronautical Engineering MEng — and "Mechanical
 *  Engineering with Nuclear Engineering" under H301, the same code as Mechanical
 *  Engineering MEng. Neither is a separate UCAS choice, so neither can honestly
 *  be presented as a separate course record. See the batch 3 report.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { course, manualReview, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-02';

const NOT_2028 =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';

const CYCLE = `${NOT_2028} The official page gives a start date of October 2027.`;

const CTX: ContextualOfferInfo = {
  availability: 'yes',
  details:
    'Contextual admissions route for UK applicants. Imperial states: “Our contextual admissions route for UK applicants may entitle you to additional considerations within the application process.” No reduced grade profile is published on the course page, and eligibility is assessed separately by the university.',
};

const NOT_ACCEPTED = 'Not accepted: General Studies and Critical Thinking.';

/** The Materials department publishes a longer exclusion than the rest of Imperial. */
const NOT_ACCEPTED_MATERIALS =
  'Not accepted: General Studies and Critical Thinking, nor are A-levels in foreign languages that are studied in the applicant’s native language.';

const ENDORSEMENT =
  'Science Practical Endorsement: If you are made an offer you will be required to achieve a pass in the practical endorsement in all science subjects that form part of the offer.';

const ESAT_PHYSICS = ['Mathematics 1', 'Mathematics 2', 'Physics'];
const ESAT_THREE_NOTE =
  'Imperial states: “To be eligible for selection for this course, you will need to sit three ESAT modules.” The combination is fixed by the course — it is not a choice.';

const NO_TEST_NOTE = 'This department does not use a test as part of its selection process.';

const DEADLINE_NOTE = 'Application deadline: Wednesday 13 January 2027 at 18.00 (UK time).';

const P = (slug: string) => `https://www.imperial.ac.uk/study/courses/undergraduate/2027/${slug}/`;

/**
 * The Materials department's requirement, printed identically on all four of
 * its course pages. Written out per record rather than shared by reference so
 * that a later change to one course cannot silently move the others.
 */
const MATERIALS_TO_INCLUDE =
  'To include: A in Mathematics; A in Chemistry or Physics; A in a useful subject (listed below).';

const MATERIALS_USEFUL =
  'Useful subjects: Biology, Computing, Design and Technology, Economics, Electronics, English Language, English Literature, Further Mathematics, Geography, History, Languages, Philosophy, Politics, Psychology.';

/** The third-subject rule, stated but not mechanically resolvable — see notes. */
const materialsThirdSubject = () =>
  manualReview(
    `Imperial also requires “A in a useful subject”. ${MATERIALS_USEFUL} The published list does not say whether a second science counts as the useful subject, so this condition is flagged for checking rather than evaluated — it is never used to reject a profile.`,
  );

/** The Materials interview day, quoted identically on all four course pages. */
const MATERIALS_INTERVIEW =
  'Post-application open day and interview, held on Wednesdays between November and March: a 30 minute one-to-one interview with one of our lecturers, a 45 minute group task, an engineering-based problem-solving challenge and a 45 minute Q&A with current student ambassadors.';

export const batch3ImperialCourses: Course[] = [
  /* ================================================================ */
  /* 1. Electrical and Electronic Engineering BEng (H600)             */
  /* ================================================================ */
  course({
    slug: 'imperial-electrical-electronic-engineering-beng',
    universityId: 'imperial',
    name: 'Electrical and Electronic Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'H600',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'A*A*A or A*AAA',
    typicalOffer: 'A*A*A (applicants studying three A-levels); A*AAA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard — three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics', 'Chemistry', 'Computer Science', 'Design and Technology', 'Electronics'],
        notes: `To include: A* in Mathematics; A*/A in Physics (A* is required if applying with three A-levels. At least an A is required if applying with four A-levels); A in a third and/or fourth subject. Recommended subjects: Further Mathematics (strongly encouraged but not essential), Chemistry, Computer Science/Computing, Design and Technology, Electronics. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
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
    testModuleNote: ESAT_THREE_NOTE,
    testUrl: P('electrical-electronic-engineering-beng'),
    interview: 'sometimes',
    interviewNote:
      'You may be invited to an online interview of 25-30 minutes with a member of academic staff, to understand your thought process, how you solve problems and your motivation for the course.',
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('electrical-electronic-engineering-beng'),
    sourceUrl: P('electrical-electronic-engineering-beng'),
    sourceTitle: 'Electrical and Electronic Engineering BEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `The three-year BEng companion to the four-year MEng (H604) already in the catalogue. Its published typical offer is A*A*A, lower than the MEng aeronautical/mechanical departments' A*A*A*. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 2. Electronic and Information Engineering BEng (HG65)            */
  /* ================================================================ */
  course({
    slug: 'imperial-electronic-information-engineering-beng',
    universityId: 'imperial',
    name: 'Electronic and Information Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'HG65',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'A*A*A or A*AAA',
    typicalOffer: 'A*A*A (applicants studying three A-levels); A*AAA (applicants studying four A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard — three A-Levels',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        recommended: ['Further Mathematics', 'Chemistry', 'Computer Science', 'Design and Technology', 'Electronics'],
        notes: `To include: A* in Mathematics; A*/A in Physics (A* is required if applying with three A-levels. At least an A is required if applying with four A-levels); A in a third and/or fourth subject. Recommended subjects: Further Mathematics (strongly encouraged but not essential), Chemistry, Computer Science/Computing, Design and Technology, Electronics. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
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
    testModuleNote: ESAT_THREE_NOTE,
    testUrl: P('electronic-information-beng'),
    interview: 'sometimes',
    interviewNote:
      'You may be invited to an online interview of 25-30 minutes with a member of academic staff.',
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('electronic-information-beng'),
    sourceUrl: P('electronic-information-beng'),
    sourceTitle: 'Electronic and Information Engineering BEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `The three-year BEng companion to the four-year MEng (GH56) already in the catalogue. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 3. Materials Science and Engineering BEng (JF52)                 */
  /* ================================================================ */
  course({
    slug: 'imperial-materials-science-engineering-beng',
    universityId: 'imperial',
    name: 'Materials Science and Engineering',
    category: 'engineering',
    sub: 'materials',
    degree: 'BEng',
    years: 3,
    code: 'JF52',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'AAA',
    typicalOffer: 'A*AA',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(['Chemistry', 'Physics'], 'A', 'A in Chemistry or Physics.'),
          materialsThirdSubject(),
        ],
        notes: `${MATERIALS_TO_INCLUDE} ${MATERIALS_USEFUL} ${NOT_ACCEPTED_MATERIALS} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'useful',
    fmNote:
      'Further Mathematics appears in the department’s “useful subjects” list. No requirement or recommendation language is attached to it.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: NO_TEST_NOTE,
    testUrl: P('materials-science-engineering-beng'),
    interview: 'yes',
    interviewNote: MATERIALS_INTERVIEW,
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('materials-science-engineering-beng'),
    sourceUrl: P('materials-science-engineering-beng'),
    sourceTitle: 'Materials Science and Engineering BEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Physics is NOT individually required — Chemistry or Physics satisfies the science condition. The department states outright that it uses no admissions test, which is a published “none”, not missing information. Typical offer (A*AA) is a grade above the minimum (AAA). ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 4. Materials Science and Engineering MEng (JFM2)                 */
  /* ================================================================ */
  course({
    slug: 'imperial-materials-science-engineering-meng',
    universityId: 'imperial',
    name: 'Materials Science and Engineering',
    category: 'engineering',
    sub: 'materials',
    degree: 'MEng',
    years: 4,
    code: 'JFM2',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'AAA',
    typicalOffer: 'A*AA',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(['Chemistry', 'Physics'], 'A', 'A in Chemistry or Physics.'),
          materialsThirdSubject(),
        ],
        notes: `${MATERIALS_TO_INCLUDE} ${MATERIALS_USEFUL} ${NOT_ACCEPTED_MATERIALS} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'useful',
    fmNote:
      'Further Mathematics appears in the department’s “useful subjects” list. No requirement or recommendation language is attached to it.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: NO_TEST_NOTE,
    testUrl: P('materials-science-engineering-meng'),
    interview: 'yes',
    interviewNote: MATERIALS_INTERVIEW,
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('materials-science-engineering-meng'),
    sourceUrl: P('materials-science-engineering-meng'),
    sourceTitle: 'Materials Science and Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Published entry requirements are identical to the BEng (JF52); the award, duration and UCAS code differ. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 5. Materials with Nuclear Engineering MEng (J5H8)                */
  /* ================================================================ */
  course({
    slug: 'imperial-materials-nuclear-engineering-meng',
    universityId: 'imperial',
    name: 'Materials with Nuclear Engineering',
    category: 'engineering',
    sub: 'materials',
    degree: 'MEng',
    years: 4,
    code: 'J5H8',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'AAA',
    typicalOffer: 'A*AA',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(['Chemistry', 'Physics'], 'A', 'A in Chemistry or Physics.'),
          materialsThirdSubject(),
        ],
        notes: `${MATERIALS_TO_INCLUDE} ${MATERIALS_USEFUL} ${NOT_ACCEPTED_MATERIALS} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'useful',
    fmNote:
      'Further Mathematics appears in the department’s “useful subjects” list. No requirement or recommendation language is attached to it.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: NO_TEST_NOTE,
    testUrl: P('materials-nuclear-engineering'),
    interview: 'yes',
    interviewNote: MATERIALS_INTERVIEW,
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('materials-nuclear-engineering'),
    sourceUrl: P('materials-nuclear-engineering'),
    sourceTitle: 'Materials with Nuclear Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `A distinct UCAS choice (J5H8) with its own course page, unlike Imperial's Mechanical and Aeronautical nuclear/spacecraft specialisms, which share their parent course's UCAS code. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 6. Biomaterials and Tissue Engineering MEng (BJ95)               */
  /* ================================================================ */
  course({
    slug: 'imperial-biomaterials-tissue-engineering-meng',
    universityId: 'imperial',
    name: 'Biomaterials and Tissue Engineering',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'MEng',
    years: 4,
    code: 'BJ95',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'AAA',
    typicalOffer: 'A*AA',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(['Chemistry', 'Physics'], 'A', 'A in Chemistry or Physics.'),
          materialsThirdSubject(),
        ],
        notes: `${MATERIALS_TO_INCLUDE} ${MATERIALS_USEFUL} ${NOT_ACCEPTED_MATERIALS} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'useful',
    fmNote:
      'Further Mathematics appears in the department’s “useful subjects” list. No requirement or recommendation language is attached to it.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: NO_TEST_NOTE,
    testUrl: P('biomaterials-tissue-engineering-meng'),
    interview: 'yes',
    interviewNote: MATERIALS_INTERVIEW,
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('biomaterials-tissue-engineering-meng'),
    sourceUrl: P('biomaterials-tissue-engineering-meng'),
    sourceTitle: 'Biomaterials and Tissue Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Run by the Materials department and published under its requirements, not the Bioengineering department's. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 7. Biomedical Engineering MEng (BH9C)                            */
  /* ================================================================ */
  course({
    slug: 'imperial-biomedical-engineering-meng',
    universityId: 'imperial',
    name: 'Biomedical Engineering',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'MEng',
    years: 4,
    code: 'BH9C',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'A*AA',
    typicalOffer: 'A*AA - A*A*A (applicants studying three A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        notes: `To include: A* in Mathematics; A in Physics; A in a third subject. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: NO_TEST_NOTE,
    testUrl: P('biomedical-engineering'),
    interview: 'sometimes',
    interviewNote:
      'You may be invited to an online interview if your UCAS application indicates that you are likely to satisfy our entry requirements and you demonstrate interest and motivation to study this course.',
    contextual: {
      availability: 'yes',
      details:
        'Under “Contextual admissions schemes for this course” Imperial states: “If your predicted grades meet the minimum university entry standard of AAA at A-level or an equivalent level qualification in the relevant subjects and demonstrate motivation to study within the specific subject area, this department will guarantee you an interview and, if successful will typically make a minimum offer to the majority of applicants.” Eligibility is assessed separately by the university and is not matched here.',
    },
    verification: 'verified',
    officialUrl: P('biomedical-engineering'),
    sourceUrl: P('biomedical-engineering'),
    sourceTitle: 'Biomedical Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `The typical offer is published as a RANGE (A*AA - A*A*A) rather than a single string. It is recorded for display only and is never matched against grades — the matched pathway is the published minimum entry standard. Year Abroad and Year in Industry variants apply to the same UCAS code BH9C and are therefore not separate records. This department publishes a course-specific contextual scheme, unlike the rest of Imperial. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 8. Molecular Bioengineering MEng (H160)                          */
  /* ================================================================ */
  course({
    slug: 'imperial-molecular-bioengineering-meng',
    universityId: 'imperial',
    name: 'Molecular Bioengineering',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'MEng',
    years: 4,
    code: 'H160',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'A*AA',
    typicalOffer: 'A*AA - A*A*A (applicants studying three A-levels)',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'A*AA',
        // Chemistry, not Physics — the sibling Biomedical Engineering course in
        // the same department requires Physics instead.
        required: [['Mathematics', 'A*'], ['Chemistry', 'A']],
        notes: `To include: A* in Mathematics; A in Chemistry; A in a third subject. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: NO_TEST_NOTE,
    testUrl: P('molecular-bioengineering'),
    interview: 'sometimes',
    interviewNote:
      'You may be invited to an online interview if your UCAS application indicates that you are likely to satisfy our entry requirements and you demonstrate interest and motivation to study this course.',
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('molecular-bioengineering'),
    sourceUrl: P('molecular-bioengineering'),
    sourceTitle: 'Molecular Bioengineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `Requires CHEMISTRY where the sibling Biomedical Engineering course requires Physics — the two must not be treated as interchangeable. Typical offer is published as a range and is display-only. Year Abroad and Year in Industry variants apply to the same UCAS code H160. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 9. Design Engineering MEng (28G3)                                */
  /* ================================================================ */
  course({
    slug: 'imperial-design-engineering-meng',
    universityId: 'imperial',
    name: 'Design Engineering',
    category: 'engineering',
    sub: 'design',
    degree: 'MEng',
    years: 4,
    code: '28G3',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    minimumEntryStandard: 'A*AA',
    typicalOffer: 'A*AA',
    offers: [
      offer({
        label: 'Minimum entry standard',
        gradeProfile: 'A*AA',
        // No science subject is named. Only Mathematics is required.
        required: [['Mathematics', 'A*']],
        notes: `To include: A* in Mathematics; A, A in two further subjects. No science subject is named as required. ${NOT_ACCEPTED} ${ENDORSEMENT}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'esat',
    testRequirement: 'required',
    // Two modules, not three, and no Physics module.
    testModules: ['Mathematics 1', 'Mathematics 2'],
    testModuleNote:
      'Imperial states: “To be eligible for selection for this course, you will need to sit two ESAT modules: Mathematics 1 and Mathematics 2.” This course sits TWO modules and no Physics module, unlike the rest of Imperial Engineering.',
    testUrl: P('design-engineering'),
    interview: 'sometimes',
    interviewNote:
      'You may be invited for an online interview. These typically run from November to March, and your interest and aptitude will be assessed through a range of questions and problems. You are encouraged to present some examples of your own work or projects towards the end of the interview, for two minutes maximum.',
    contextual: CTX,
    verification: 'verified',
    officialUrl: P('design-engineering'),
    sourceUrl: P('design-engineering'),
    sourceTitle: 'Design Engineering MEng | Study | Imperial College London',
    lastVerified: VERIFIED_ON,
    notes: `The only Imperial engineering course found that names no science subject in its A-Level requirement and sits only two ESAT modules. Despite that, the science practical endorsement condition is still published for it. ${DEADLINE_NOTE}`,
  }),
];
