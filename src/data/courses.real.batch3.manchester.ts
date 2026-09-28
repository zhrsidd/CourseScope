/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 3, PART C: THE UNIVERSITY OF MANCHESTER
 *  2027 entry. Read from Manchester's own course pages on 2026-09-02.
 * ---------------------------------------------------------------------------
 *  Manchester publishes admissions data in a shape neither Imperial nor UCL
 *  uses, and the differences are recorded rather than flattened:
 *
 *  1. THREE published offers per course, as separate labelled fields:
 *       "Typical offer"  ·  "Contextual offer"  ·  "UK refugee/care-experienced
 *       offer"
 *     Only the typical offer is a matchable pathway. The other two are stored as
 *     published information — they have their own eligibility criteria, decided
 *     by the university, which this tool does not evaluate.
 *
 *  2. No offer RANGES. Every Manchester grade string checked is a single
 *     profile, so nothing had to be flattened. (Imperial's Bioengineering
 *     courses use ranges; Manchester does not.)
 *
 *  3. Subject rules differ sharply by department, and must never be shared:
 *       Physics       — A* in Physics AND A* in Mathematics or Further Maths
 *       Mechanical    — Mathematics and Physics, third subject open
 *       Aerospace     — Mathematics and Physics, third subject open
 *       Civil         — Mathematics and Physics, third subject open
 *       EEE           — A* Mathematics + A in ONE OF five listed subjects
 *       Mechatronic   — same five-subject list as EEE
 *       Chemical      — Mathematics + EITHER Chemistry OR Physics
 *       Materials     — TWO from Mathematics, Physics and Chemistry
 *
 *  4. No application deadline is published on any Manchester course page
 *     checked. None is recorded; none is inferred from the other universities.
 *
 *  5. Interview policy varies within the same faculty: Mechanical, Aerospace
 *     and Civil state "We do not hold interviews"; Chemical requires a UCAS
 *     Interview Day; Materials requires a Virtual Visit including an interview.
 *
 *  6. Where a page states no admissions test at all, the record says "unknown"
 *     with a note, NOT "none" — absence of a statement is not a published "no".
 *     Compare Imperial Materials, which states outright that it uses no test.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { atLeastAt, course, manualReview, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-02';

const CYCLE =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';

const M = (id: string, slug: string) =>
  `https://www.manchester.ac.uk/study/undergraduate/courses/2027/${id}/${slug}/`;

const NO_DEADLINE_NOTE =
  'Manchester publishes no application deadline on this course page; none has been recorded.';

const ENDORSEMENT =
  'Practical skills are a crucial part of science education and therefore there will be a requirement to pass the practical element of any science A Level taken.';

const GCSE_PHYSICS =
  'Applicants must demonstrate a broad general education, typically a minimum of five GCSE/IGCSEs, including acceptable levels of literacy and numeracy, equivalent to at least grade 4/C in GCSE/IGCSE English Language and grade 4/C in GCSE/IGCSE Mathematics. GCSE/IGCSE English Literature will not be accepted in lieu of GCSE/IGCSE English Language.';

const GCSE_ENG_STANDARD =
  'Applicants must demonstrate a broad general education, typically five GCSEs/IGCSEs, including acceptable levels of literacy and numeracy, equivalent to at least Grade C/4 in GCSE/IGCSE English Language and Mathematics.';

const GCSE_ENG_B6 =
  'Applicants must demonstrate a broad general education, typically five GCSEs/IGCSEs, including acceptable levels of literacy and numeracy, equivalent to at least grade B/6 in GCSE/IGCSE English Language and grade C/4 in GCSE/IGCSE Mathematics.';

const NO_TEST_STATED = 'The course page does not state an admissions-test requirement.';

const NO_INTERVIEW =
  'We do not hold interviews but applicants who receive an offer may be invited to a virtual webinar or an on-campus offer holder day which generally take place on Wednesday afternoons from February to April.';

/**
 * Manchester publishes a contextual offer AND a separate UK refugee /
 * care-experienced offer. Both are recorded as published information only.
 */
const ctx = (contextual: string, refugee: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Contextual offer: ${contextual} UK refugee or care-experienced offer: ${refugee} Both are separate published routes with their own eligibility criteria, assessed by the university; neither is matched against grades here.`,
});

/* ------------------------------------------------------------------ */
/* Physics — Department of Physics and Astronomy                       */
/* ------------------------------------------------------------------ */

const PHYSICS_RULE = 'A*A*A, including A* in Physics and A* in Mathematics or Further Mathematics.';

const PHYSICS_CTX = ctx(
  '“A*AA, including Physics and Mathematics or Further Mathematics. The A* must be in Physics, Mathematics or Further Mathematics.”',
  '“AAA, including Physics and Mathematics or Further Mathematics.”',
);

const PHYSICS_TEST_NOTE =
  'Manchester states: “Candidates may also be interviewed online or in person or required to take an academic skills diagnostic test.” No named admissions test is published for this course.';

const PHYSICS_INTERVIEW_NOTE =
  'Manchester states: “Eligible UK-based applicants were required to attend an in-person academic interview as part of the selection process for 2026 entry. We are currently reviewing our interview requirements for 2027 entry.” The 2027 position is therefore not settled.';

/**
 * The Physics department's rule, identical on every one of its 2027 course
 * pages: Physics at A*, and Mathematics OR Further Mathematics at A*.
 * Mathematics alone is not required — Further Mathematics can carry the A*.
 */
function physicsOffers() {
  return [
    offer({
      label: 'Typical offer',
      gradeProfile: 'A*A*A',
      required: [['Physics', 'A*']],
      constraints: [
        atLeastAt(
          ['Mathematics', 'Further Mathematics'],
          'A*',
          1,
          'A* in Mathematics or Further Mathematics.',
        ),
      ],
      notes: `${PHYSICS_RULE} ${ENDORSEMENT}`,
    }),
  ];
}

interface PhysicsSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys' | 'MMath';
  awardLabel?: string;
  sub: 'physics' | 'astrophysics' | 'theoretical-physics' | 'physics-with-mathematics';
  years: number;
  code: string;
  id: string;
  path: string;
  title: string;
  extraNotes?: string;
  placement?: string;
  international?: string;
}

const PHYSICS_SEEDS: PhysicsSeed[] = [
  {
    slug: 'manchester-physics-bsc',
    name: 'Physics',
    degree: 'BSc',
    sub: 'physics',
    years: 3,
    code: 'F300',
    id: '00638',
    path: 'bsc-physics',
    title: 'BSc Physics (2027 entry) | The University of Manchester',
  },
  {
    slug: 'manchester-physics-mphys',
    name: 'Physics',
    degree: 'MPhys',
    sub: 'physics',
    years: 4,
    code: 'F305',
    id: '02021',
    path: 'mphys-physics',
    title: 'MPhys Physics (2027 entry) | The University of Manchester',
    international:
      'This course requires ATAS. You should apply for an ATAS clearance certificate unless you are exempt.',
  },
  {
    slug: 'manchester-physics-with-astrophysics-bsc',
    name: 'Physics with Astrophysics',
    degree: 'BSc',
    sub: 'astrophysics',
    years: 3,
    code: 'F3F5',
    id: '00639',
    path: 'bsc-physics-with-astrophysics',
    title: 'BSc Physics with Astrophysics (2027 entry) | The University of Manchester',
  },
  {
    slug: 'manchester-physics-with-astrophysics-mphys',
    name: 'Physics with Astrophysics',
    degree: 'MPhys',
    sub: 'astrophysics',
    years: 4,
    code: 'F3FA',
    id: '02024',
    path: 'mphys-physics-with-astrophysics',
    title: 'MPhys Physics with Astrophysics (2027 entry) | The University of Manchester',
    international:
      'This course requires ATAS. You should apply for an ATAS clearance certificate unless you are exempt.',
  },
  {
    slug: 'manchester-physics-with-theoretical-physics-bsc',
    name: 'Physics with Theoretical Physics',
    degree: 'BSc',
    sub: 'theoretical-physics',
    years: 3,
    code: 'F345',
    id: '00642',
    path: 'bsc-physics-with-theoretical-physics',
    title: 'BSc Physics with Theoretical Physics (2027 entry) | The University of Manchester',
  },
  {
    slug: 'manchester-physics-with-theoretical-physics-mphys',
    name: 'Physics with Theoretical Physics',
    degree: 'MPhys',
    sub: 'theoretical-physics',
    years: 4,
    code: 'F346',
    id: '02029',
    path: 'mphys-physics-with-theoretical-physics',
    title: 'MPhys Physics with Theoretical Physics (2027 entry) | The University of Manchester',
    international:
      'This course requires ATAS. You should apply for an ATAS clearance certificate unless you are exempt.',
  },
  {
    slug: 'manchester-physics-with-study-in-europe-mphys',
    name: 'Physics with Study in Europe',
    degree: 'MPhys',
    sub: 'physics',
    years: 4,
    code: 'F301',
    id: '02026',
    path: 'mphys-physics-with-study-in-europe',
    title: 'MPhys Physics with Study in Europe (2027 entry) | The University of Manchester',
    placement: 'Year 3 is spent at a European partner institution.',
    international:
      'Manchester states: “We do not require an A Level in the relevant European language at the point of application for this course. However, applicants applying to this course should have prior knowledge of the relevant European language, and must have a CEFR B2 Level qualification or equivalent upon the start of the placement in Year 3.” This course also requires ATAS unless you are exempt.',
    extraNotes:
      'The language condition applies at the start of the Year 3 placement, not at application.',
  },
  {
    slug: 'manchester-mathematics-and-physics-bsc',
    name: 'Mathematics and Physics',
    degree: 'BSc',
    sub: 'physics-with-mathematics',
    years: 3,
    code: 'FG31',
    id: '00592',
    path: 'bsc-mathematics-and-physics',
    title: 'BSc Mathematics and Physics (2027 entry) | The University of Manchester',
    extraNotes:
      'Administered by the Department of Physics and Astronomy admissions team, and published under the same requirement as single-honours Physics.',
  },
  {
    slug: 'manchester-mathematics-and-physics-mmathphys',
    name: 'Mathematics and Physics',
    degree: 'MMath',
    awardLabel: 'MMath&Phys',
    sub: 'physics-with-mathematics',
    years: 4,
    code: 'FG3C',
    id: '01684',
    path: 'mmathphys-mathematics-and-physics',
    title: 'MMath&Phys Mathematics and Physics (2027 entry) | The University of Manchester',
  },
];

const manchesterPhysics: Course[] = PHYSICS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'manchester',
    name: s.name,
    awardLabel: s.awardLabel ?? null,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: PHYSICS_RULE,
    typicalOffer: 'A*A*A',
    offers: physicsOffers(),
    fm: 'useful',
    fmNote:
      'Further Mathematics is accepted in place of Mathematics for the A* requirement. It is not itself required.',
    test: 'unknown',
    testNote: PHYSICS_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: PHYSICS_CTX,
    gcse: GCSE_PHYSICS,
    placement: s.placement ?? null,
    international: s.international ?? null,
    verification: 'verified',
    officialUrl: M(s.id, s.path),
    sourceUrl: M(s.id, s.path),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: `${s.extraNotes ? `${s.extraNotes} ` : ''}${NO_DEADLINE_NOTE}`,
  }),
);

/* ------------------------------------------------------------------ */
/* Engineering — Faculty of Science and Engineering                    */
/* ------------------------------------------------------------------ */

/** "We are willing to consider applicants without Physics if they have studied Further Mathematics." */
const fmInsteadOfPhysics = () =>
  manualReview(
    'Manchester states: “We are willing to consider applicants without Physics if they have studied Further Mathematics; applications will be considered on a case by case basis.” Because the university decides these individually, this route is flagged for checking rather than evaluated.',
  );

/** The five subjects Manchester accepts as the second subject for EEE and Mechatronic. */
const EEE_SECOND_SUBJECTS = [
  'Physics',
  'Electronics',
  'Further Mathematics',
  'Chemistry',
  'Computer Science',
];

/**
 * BATCH 6 — the Manchester Materials specialisms, settled.
 *
 * The open question was whether “Materials Science and Engineering with
 * Biomaterials”, “… with Metallurgy”, “… with Nanomaterials”, “… with
 * Polymers” and “… with Textiles Technology” are separate UCAS applications.
 * They are not. Manchester publishes exactly TWO parent codes — J500 for the
 * three-year BSc and J501 for the four- or five-year MEng — and the named
 * specialisms sit inside them. Creating a record per specialism would have
 * invented five applications that do not exist and five UCAS codes that were
 * never published.
 *
 * The two levels differ in HOW the specialism is reached, so they are worded
 * differently rather than shared: on the MEng the student transfers onto a
 * specialist pathway after the first two years and graduates with that title;
 * on the BSc the same subject areas are optional final-year units and do not
 * change the award.
 */
const MATERIALS_MENG_PATHWAYS: StudyOption[] = [
  'Biomaterials',
  'Metallurgy',
  'Nanomaterials',
  'Polymers',
  'Textiles Technology',
].map((name) => ({
  name: `Materials Science and Engineering with ${name}`,
  description:
    'A named pathway inside the single J501 application, not a separate UCAS course. Manchester’s wording is that applicants “can transfer onto one of our specialist pathways and graduate with an MEng degree in…”, with the choice made after the first two years.',
  ucasCode: 'J501',
  chosenWhen: 'After the first two years.',
  officialUrl: null,
}));

const MATERIALS_BSC_UNITS: StudyOption[] = [
  'Nanomaterials',
  'Metallurgy',
  'Polymers',
  'Biomaterials',
  'Textiles',
  'Corrosion science',
].map((name) => ({
  name,
  description:
    'On the BSc these are FINAL-YEAR RESEARCH PROJECT TOPICS inside the single J500 application, not award-changing pathways and not separate UCAS codes. Manchester’s wording is illustrative rather than a closed list: “In your final year, for example, you can choose to focus on a specific topic such as …”. Contrast the MEng, where the five named pathways do change the award title.',
  ucasCode: 'J500',
  chosenWhen: 'In the final year, as a research-project topic.',
  officialUrl: null,
}));

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng' | 'BSc';
  sub: 'mechanical' | 'aerospace' | 'electrical' | 'civil' | 'chemical' | 'materials' | 'robotics-mechatronics';
  years: number;
  code: string;
  id: string;
  path: string;
  title: string;
  profile: string;
  raw: string;
  contextual: [string, string];
  gcse: string;
  interview: 'yes' | 'no' | 'not-stated';
  interviewNote: string | null;
  /** Which offer shape this department publishes. */
  shape: 'maths-physics' | 'maths-plus-one-of-five' | 'maths-plus-chem-or-physics' | 'two-of-three';
  /** Named routes WITHIN this one application. Never separate courses. */
  options?: StudyOption[];
  extraNotes?: string;
}

const ENG_SEEDS: EngSeed[] = [
  {
    slug: 'manchester-mechanical-engineering-beng',
    name: 'Mechanical Engineering',
    degree: 'BEng',
    sub: 'mechanical',
    years: 3,
    code: 'H300',
    id: '03389',
    path: 'beng-mechanical-engineering',
    title: 'BEng Mechanical Engineering (2027 entry) | The University of Manchester',
    profile: 'A*A*A',
    raw: 'A*A*A in Mathematics, Physics, and one other subject.',
    contextual: ['“A*AA in Mathematics, Physics, and one other subject.”', '“AAA, including Mathematics, Physics, and one other subject.”'],
    gcse:
      'Typically, this is a minimum of five GCSEs/IGCSEs at grade A*/8 to B/6, including Mathematics and a science subject.',
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    shape: 'maths-physics',
    extraNotes:
      'A relevant science and technology subject is preferred as the third subject, but not essential. Manchester lists Biology, Chemistry, Computer Science, Design Technology, Economics, Engineering, Further Mathematics, IT and Statistics as examples, and says the list is not exhaustive.',
  },
  {
    slug: 'manchester-mechanical-engineering-meng',
    name: 'Mechanical Engineering',
    degree: 'MEng',
    sub: 'mechanical',
    years: 4,
    code: 'H303',
    id: '03921',
    path: 'meng-mechanical-engineering',
    title: 'MEng Mechanical Engineering (2027 entry) | The University of Manchester',
    profile: 'A*A*A',
    raw: 'A*A*A in Mathematics, Physics, and one other subject.',
    contextual: ['“A*AA in Mathematics, Physics, and one other subject.”', '“AAA, including Mathematics, Physics, and one other subject.”'],
    gcse:
      'Typically, this is a minimum of five GCSEs/IGCSEs at grade A*/8 to B/6, including Mathematics and a science subject.',
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    shape: 'maths-physics',
    extraNotes: 'Published entry requirements are identical to the BEng (H300).',
  },
  {
    slug: 'manchester-aerospace-engineering-beng',
    name: 'Aerospace Engineering',
    degree: 'BEng',
    sub: 'aerospace',
    years: 3,
    code: 'H400',
    id: '03333',
    path: 'beng-aerospace-engineering',
    title: 'BEng Aerospace Engineering (2027 entry) | The University of Manchester',
    profile: 'A*AA',
    raw: 'A*AA including Mathematics, Physics, and one other subject.',
    contextual: ['“AAA in Mathematics, Physics, and one other subject.”', '“AAB, including Mathematics, Physics, and one other subject.”'],
    gcse: GCSE_ENG_STANDARD,
    interview: 'no',
    interviewNote:
      'We do not hold interviews but applicants who receive an offer may be invited to a virtual webinar or an on-campus offer holder day.',
    shape: 'maths-physics',
  },
  {
    slug: 'manchester-aerospace-engineering-meng',
    name: 'Aerospace Engineering',
    degree: 'MEng',
    sub: 'aerospace',
    years: 4,
    code: 'H402',
    id: '03826',
    path: 'meng-aerospace-engineering',
    title: 'MEng Aerospace Engineering (2027 entry) | The University of Manchester',
    profile: 'A*AA',
    raw: 'A*AA in any order, including Mathematics, Physics, and one other subject.',
    contextual: ['“AAA in Mathematics, Physics, and one other subject.”', '“AAB, including Mathematics, Physics, and one other subject.”'],
    gcse: GCSE_ENG_STANDARD,
    interview: 'no',
    interviewNote:
      'We do not hold interviews but applicants who receive an offer may be invited to a virtual webinar or an on-campus offer holder day.',
    shape: 'maths-physics',
    extraNotes:
      'The grade string matches the BEng, but the MEng page adds the words “in any order” which the BEng page does not carry. The wording is recorded as published on each page.',
  },
  {
    slug: 'manchester-electrical-electronic-engineering-beng',
    name: 'Electrical and Electronic Engineering',
    degree: 'BEng',
    sub: 'electrical',
    years: 3,
    code: 'H600',
    id: '03363',
    path: 'beng-electrical-and-electronic-engineering',
    title: 'BEng Electrical and Electronic Engineering (2027 entry) | The University of Manchester',
    profile: 'A*AA',
    raw: 'A*AA including A* in Mathematics and A in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.',
    contextual: [
      '“AAA including Mathematics and either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
      '“AAB including A in Mathematics and A or B in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
    ],
    gcse: GCSE_ENG_B6,
    interview: 'not-stated',
    interviewNote: null,
    shape: 'maths-plus-one-of-five',
    extraNotes:
      'Manchester also states: “Please note that GCSE/IGCSE English as a Second Language will not be accepted for this course.” Physics is NOT individually required — it is one of five accepted second subjects.',
  },
  {
    slug: 'manchester-electrical-electronic-engineering-meng',
    name: 'Electrical and Electronic Engineering',
    degree: 'MEng',
    sub: 'electrical',
    years: 4,
    code: 'H605',
    id: '03894',
    path: 'meng-electrical-and-electronic-engineering',
    title: 'MEng Electrical and Electronic Engineering (2027 entry) | The University of Manchester',
    profile: 'A*AA',
    raw: 'A*AA including A* in Mathematics and A in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.',
    contextual: [
      '“AAA including Mathematics and either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
      '“AAB including A in Mathematics and A or B in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
    ],
    gcse: GCSE_ENG_B6,
    interview: 'not-stated',
    interviewNote: null,
    shape: 'maths-plus-one-of-five',
    extraNotes: 'Published entry requirements are identical to the BEng (H600).',
  },
  {
    slug: 'manchester-civil-engineering-beng',
    name: 'Civil Engineering',
    degree: 'BEng',
    sub: 'civil',
    years: 3,
    code: 'H200',
    id: '03343',
    path: 'beng-civil-engineering',
    title: 'BEng Civil Engineering (2027 entry) | The University of Manchester',
    profile: 'AAA',
    raw: 'AAA including Mathematics, Physics, and one other subject.',
    contextual: ['“AAB including Mathematics, Physics, and one other subject.”', '“ABB including Mathematics, Physics, and one other subject.”'],
    gcse: GCSE_ENG_STANDARD,
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    shape: 'maths-physics',
  },
  {
    slug: 'manchester-civil-engineering-meng',
    name: 'Civil Engineering',
    degree: 'MEng',
    sub: 'civil',
    years: 4,
    code: 'H201',
    id: '03869',
    path: 'meng-civil-engineering',
    title: 'MEng Civil Engineering (2027 entry) | The University of Manchester',
    profile: 'AAA',
    raw: 'AAA including Mathematics, Physics, and one other subject.',
    contextual: ['“AAB including Mathematics, Physics, and one other subject.”', '“ABB including Mathematics, Physics, and one other subject.”'],
    gcse: GCSE_ENG_STANDARD,
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    shape: 'maths-physics',
    extraNotes: 'Published entry requirements are identical to the BEng (H200).',
  },
  {
    slug: 'manchester-chemical-engineering-beng',
    name: 'Chemical Engineering',
    degree: 'BEng',
    sub: 'chemical',
    years: 3,
    code: 'H800',
    id: '03340',
    path: 'beng-chemical-engineering',
    title: 'BEng Chemical Engineering (2027 entry) | The University of Manchester',
    profile: 'AAA',
    raw: 'AAA including Mathematics and either Chemistry or Physics.',
    contextual: ['“AAB including A in Mathematics and B or above in Chemistry or Physics.”', '“ABB including A in Mathematics, and B or above in Chemistry or Physics.”'],
    gcse: GCSE_ENG_STANDARD,
    interview: 'yes',
    interviewNote:
      'Applicants based in the UK will be invited to attend one of our UCAS Interview Days to meet staff and current students, take part in an academic interview, and find out what it’s like to be a student here. These normally take place online and normally run from November until April.',
    shape: 'maths-plus-chem-or-physics',
    extraNotes:
      'Chemistry is NOT uniquely required — Physics is an equally accepted alternative. This is also the only Manchester engineering department checked that requires an interview day.',
  },
  {
    slug: 'manchester-chemical-engineering-meng',
    name: 'Chemical Engineering',
    degree: 'MEng',
    sub: 'chemical',
    years: 4,
    code: 'H801',
    id: '03848',
    path: 'meng-chemical-engineering',
    title: 'MEng Chemical Engineering (2027 entry) | The University of Manchester',
    profile: 'AAA',
    raw: 'AAA including Mathematics and either Chemistry or Physics.',
    contextual: ['“AAB including A in Mathematics and B or above in Chemistry or Physics.”', '“ABB including A in Mathematics, and B or above in Chemistry or Physics.”'],
    gcse: GCSE_ENG_STANDARD,
    interview: 'yes',
    interviewNote:
      'Applicants based in the UK will be invited to attend one of our UCAS Interview Days. These normally take place online and normally run from November until April.',
    shape: 'maths-plus-chem-or-physics',
    extraNotes: 'Published entry requirements are identical to the BEng (H800).',
  },
  {
    slug: 'manchester-materials-science-and-engineering-bsc',
    name: 'Materials Science and Engineering',
    degree: 'BSc',
    sub: 'materials',
    years: 3,
    code: 'J500',
    id: '09894',
    path: 'bsc-materials-science-and-engineering',
    title: 'BSc Materials Science and Engineering (2027 entry) | The University of Manchester',
    profile: 'AAB',
    raw: 'AAB including two from Mathematics, Physics and Chemistry.',
    contextual: ['“ABB including two from Mathematics, Physics and Chemistry.”', '“BBB including 2 from Mathematics, Physics and Chemistry.”'],
    gcse:
      'Applicants must demonstrate a broad general education including acceptable levels of literacy and numeracy, equivalent to at least Grade C/4 in GCSE/IGCSE English Language, Mathematics and Science. If you are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required.',
    interview: 'yes',
    interviewNote:
      'All students who apply to us through UCAS, and who live on the UK mainland and meet our application criteria, are currently invited to a Virtual Visit event which will include an interview as part of the application process.',
    shape: 'two-of-three',
    options: MATERIALS_BSC_UNITS,
    extraNotes:
      'THE NAMED MATERIALS SPECIALISMS ARE NOT SEPARATE COURSES. On this BSc, Nanomaterials, Metallurgy, Polymers, Biomaterials, Textiles and Corrosion science are optional FINAL-YEAR UNITS inside the single J500 application — they do not change the award and they have no UCAS code of their own. Manchester publishes only two parent codes in this family, J500 and J501. Manchester’s Bachelor’s award here is a BSc, not a BEng. The subject rule is broader than Mechanical or Aerospace: any TWO of Mathematics, Physics and Chemistry satisfy it, so an applicant without Physics can still meet it.',
  },
  {
    slug: 'manchester-materials-science-and-engineering-meng',
    name: 'Materials Science and Engineering',
    degree: 'MEng',
    sub: 'materials',
    years: 4,
    code: 'J501',
    id: '09895',
    path: 'meng-materials-science-and-engineering',
    title: 'MEng Materials Science and Engineering (2027 entry) | The University of Manchester',
    profile: 'AAA',
    raw: 'AAA including two from Mathematics, Physics and Chemistry.',
    contextual: ['“AAB including two from Mathematics, Physics and Chemistry.”', '“ABB including two from Mathematics, Physics and Chemistry.”'],
    gcse:
      'Applicants must demonstrate a broad general education including acceptable levels of literacy and numeracy, equivalent to at least Grade C/4 in GCSE/IGCSE English Language, Mathematics and Science. If you are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required.',
    interview: 'yes',
    interviewNote:
      'All students who apply to us through UCAS, and who live on the UK mainland and meet our application criteria, are currently invited to a Virtual Visit event which will include an interview as part of the application process.',
    shape: 'two-of-three',
    options: MATERIALS_MENG_PATHWAYS,
    extraNotes:
      'THE NAMED MATERIALS SPECIALISMS ARE NOT SEPARATE COURSES. Biomaterials, Metallurgy, Nanomaterials, Polymers and Textiles Technology are pathways inside the single J501 application: Manchester states that applicants “can transfer onto one of our specialist pathways and graduate with an MEng degree in…”, with the choice made after the first two years. No separate UCAS code is published for any of them, and none has been invented. The one Manchester pairing checked where the two awards do NOT share a grade requirement: the BSc asks for AAB and this MEng asks for AAA. Duration is 4 years, or 5 years including a year in industry.',
  },
  {
    slug: 'manchester-mechatronic-engineering-beng',
    name: 'Mechatronic Engineering',
    degree: 'BEng',
    sub: 'robotics-mechatronics',
    years: 3,
    code: 'HH36',
    id: '03394',
    path: 'beng-mechatronic-engineering',
    title: 'BEng Mechatronic Engineering (2027 entry) | The University of Manchester',
    profile: 'A*AA',
    raw: 'A*AA including A* in Mathematics and A in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.',
    contextual: [
      '“AAA including Mathematics and either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
      '“AAB including A in Mathematics and A or B in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
    ],
    gcse: GCSE_ENG_B6,
    interview: 'not-stated',
    interviewNote: null,
    shape: 'maths-plus-one-of-five',
  },
  {
    slug: 'manchester-mechatronic-engineering-meng',
    name: 'Mechatronic Engineering',
    degree: 'MEng',
    sub: 'robotics-mechatronics',
    years: 4,
    code: 'HHH6',
    id: '03927',
    path: 'meng-mechatronic-engineering',
    title: 'MEng Mechatronic Engineering (2027 entry) | The University of Manchester',
    profile: 'A*AA',
    raw: 'A*AA including A* in Mathematics and A in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.',
    contextual: [
      '“AAA including Mathematics and either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
      '“AAB including A in Mathematics and A or B in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.”',
    ],
    gcse: GCSE_ENG_B6,
    interview: 'not-stated',
    interviewNote: null,
    shape: 'maths-plus-one-of-five',
    extraNotes: 'Published entry requirements are identical to the BEng (HH36).',
  },
];

function engineeringOffer(seed: EngSeed) {
  switch (seed.shape) {
    case 'maths-physics':
      // "including Mathematics, Physics, and one other subject" — the subjects
      // are named, but no per-subject grade is published, so none is recorded.
      return offer({
        label: 'Typical offer',
        gradeProfile: seed.profile,
        required: ['Mathematics', 'Physics'],
        constraints: [fmInsteadOfPhysics()],
        notes: `${seed.raw} ${ENDORSEMENT}`,
      });
    case 'maths-plus-one-of-five':
      return offer({
        label: 'Typical offer',
        gradeProfile: seed.profile,
        required: [['Mathematics', 'A*']],
        constraints: [
          oneOf(
            EEE_SECOND_SUBJECTS,
            'A',
            'A in either Physics, Electronics, Further Mathematics, Chemistry or Computer Science.',
          ),
        ],
        notes: `${seed.raw} ${ENDORSEMENT}`,
      });
    case 'maths-plus-chem-or-physics':
      return offer({
        label: 'Typical offer',
        gradeProfile: seed.profile,
        required: ['Mathematics'],
        constraints: [oneOf(['Chemistry', 'Physics'], null, 'Either Chemistry or Physics.')],
        notes: `${seed.raw} ${ENDORSEMENT}`,
      });
    case 'two-of-three':
      return offer({
        label: 'Typical offer',
        gradeProfile: seed.profile,
        // "two from Mathematics, Physics and Chemistry" — Manchester publishes
        // no grade for the two subjects, so the constraint counts subjects at
        // any A-Level grade (E or above) rather than inventing a minimum.
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics', 'Chemistry'],
            'E',
            2,
            'Two from Mathematics, Physics and Chemistry. Manchester publishes no minimum grade for these two subjects.',
          ),
        ],
        notes: `${seed.raw} ${ENDORSEMENT}`,
      });
  }
}

const manchesterEngineering: Course[] = ENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'manchester',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: s.raw,
    typicalOffer: s.profile,
    offers: [engineeringOffer(s)],
    fm:
      s.shape === 'maths-plus-one-of-five'
        ? 'useful'
        : s.shape === 'maths-physics'
          ? 'useful'
          : 'no-stated-preference',
    fmNote:
      s.shape === 'maths-plus-one-of-five'
        ? 'Further Mathematics is one of five subjects accepted as the second subject. It is not itself required.'
        : s.shape === 'maths-physics'
          ? 'Manchester states it is willing to consider applicants without Physics if they have studied Further Mathematics, case by case. Further Mathematics is not required.'
          : 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_STATED,
    interview: s.interview,
    interviewNote: s.interviewNote,
    contextual: ctx(s.contextual[0], s.contextual[1]),
    gcse: s.gcse,
    studyOptions: s.options ?? [],
    verification: 'verified',
    officialUrl: M(s.id, s.path),
    sourceUrl: M(s.id, s.path),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: `${s.extraNotes ? `${s.extraNotes} ` : ''}${NO_DEADLINE_NOTE}`,
  }),
);

export const batch3ManchesterCourses: Course[] = [...manchesterPhysics, ...manchesterEngineering];
