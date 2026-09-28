/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 4, PART B: UNIVERSITY OF WARWICK
 *  2027 entry. Read from Warwick's own course pages on 2026-09-03.
 * ---------------------------------------------------------------------------
 *  The structural question this batch had to answer was whether Warwick admits
 *  to one General Engineering programme or to named disciplines. The answer is
 *  BOTH, and Warwick says so plainly:
 *
 *    "All first year students study a general engineering programme, which is
 *     much favoured by industry. From second year onwards you can specialise in
 *     one of eight engineering disciplines, or continue on the general
 *     Engineering pathway."
 *
 *  Each named discipline has its OWN UCAS code, so each is a genuine separate
 *  application and a genuine separate record. The shared first year and the
 *  ability to change discipline afterwards are recorded as study options, not
 *  as a reason to merge records.
 *
 *  Two clean patterns, both read per course rather than assumed:
 *    • BEng standard offer AAA, contextual AAB.
 *    • MEng standard offer A*AA, contextual AAA.
 *  Computer Systems Engineering is the exception — it does NOT require Physics.
 *
 *  Warwick has not published a 2027 application deadline: its key-dates page
 *  still showed only the 2026 cycle when checked. None is recorded.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-03';

const CYCLE =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data. The official page gives a start date of 27 September 2027.';

const W = (slug: string) => `https://warwick.ac.uk/study/undergraduate/courses/${slug}/`;

const NO_INTERVIEW =
  'Warwick does not typically interview applicants. Offers are made based on the UCAS application, including predicted and achieved grades, the personal statement, and the school reference.';

const GCSE =
  'A minimum of GCSE grade 4 or C (or an equivalent qualification) in English Language and either Mathematics or a Science subject.';

const NO_TEST_NOTE =
  'No admissions test is mentioned on this course page. Warwick’s admissions-tests page lists the TMUA for Computer Science, Mathematics, Economics and Statistics/MORSE/Data Science, and does not list this course.';

const NO_DEADLINE_NOTE =
  'Warwick had not published a 2027-entry application deadline when this record was checked — its key dates page still showed the 2026 cycle. No deadline has been recorded.';

const EXCLUDED_NOTE =
  'Warwick states university-wide, on its admissions FAQ rather than the course page: “Please be aware we do not accept General Studies or Critical Thinking as part of your A Level studies.”';

const ctx = (grades: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `${grades} Warwick labels this a “contextual offer”. It is separate from the university-wide Warwick Scholars widening-participation scheme, has its own eligibility criteria, and is not matched against grades here.`,
});

/* ------------------------------------------------------------------ */
/* Physics                                                             */
/* ------------------------------------------------------------------ */

const PHYS_RAW = 'A*AA to include A in Mathematics (or Further Mathematics) and Physics.';

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys';
  sub: 'physics' | 'astrophysics';
  years: number;
  code: string;
  path: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'warwick-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F300', path: 'bsc-physics' },
  { slug: 'warwick-physics-mphys', name: 'Physics', degree: 'MPhys', sub: 'physics', years: 4, code: 'F303', path: 'mphys-physics' },
  { slug: 'warwick-physics-with-astrophysics-bsc', name: 'Physics with Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, code: 'F3F5', path: 'bsc-physics-astrophysics' },
  { slug: 'warwick-physics-with-astrophysics-mphys', name: 'Physics with Astrophysics', degree: 'MPhys', sub: 'astrophysics', years: 4, code: 'F3FA', path: 'mphys-physics-astrophysics' },
];

const warwickPhysics: Course[] = PHYS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'warwick',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: PHYS_RAW,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        // Physics is required at A. Mathematics is required at A but Further
        // Mathematics is accepted in its place — Warwick's own alternative.
        required: [['Physics', 'A']],
        alternatives: { Mathematics: ['Further Mathematics'] },
        constraints: [
          oneOf(
            ['Mathematics', 'Further Mathematics'],
            'A',
            'A in Mathematics, or Further Mathematics in its place.',
          ),
        ],
        notes: PHYS_RAW,
      }),
    ],
    fm: 'useful',
    fmNote:
      'Further Mathematics is accepted in place of Mathematics for the A grade requirement. It is not itself required, and no additional preference is published.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    contextual: ctx('AAA including A Level Maths and Physics.'),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: W(s.path),
    sourceUrl: W(s.path),
    sourceTitle: `${s.name} (${s.degree}) | University of Warwick`,
    lastVerified: VERIFIED_ON,
    notes: `${EXCLUDED_NOTE} ${NO_DEADLINE_NOTE}`,
  }),
);

/** Mathematics and Physics publishes a second route for applicants without Further Maths. */
const MATHS_PHYS_RAW =
  'A*AA to include A* in Mathematics, A in Further Mathematics and A in Physics.';

const warwickMathsPhysics: Course[] = (
  [
    { slug: 'warwick-mathematics-and-physics-bsc', degree: 'BSc' as const, years: 3, code: 'GF13', path: 'bsc-mathematics-physics', award: null },
    { slug: 'warwick-mathematics-and-physics-mmathphys', degree: 'MMath' as const, years: 4, code: 'FG31', path: 'mmathphys-mathematics-physics', award: 'MMathPhys' },
  ]
).map((s) =>
  course({
    slug: s.slug,
    universityId: 'warwick',
    name: 'Mathematics and Physics',
    awardLabel: s.award,
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: MATHS_PHYS_RAW,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], ['Further Mathematics', 'A'], ['Physics', 'A']],
        notes: MATHS_PHYS_RAW,
      }),
      offer({
        label: 'Alternative offer without Further Mathematics',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        notes:
          'Warwick’s published alternative for applicants not taking Further Mathematics: “A* (Mathematics), A* (Physics) and A in a third subject at A level.”',
      }),
    ],
    fm: 'conditional',
    fmNote:
      'Further Mathematics is required on the standard route. Applicants without it have a published alternative route requiring A* in both Mathematics and Physics instead.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    contextual: ctx(
      'A*AB including A* in A Level Maths plus either A in A Level Further Maths and B in A Level Physics, or A in A Level Physics and B in a third A Level.',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: W(s.path),
    sourceUrl: W(s.path),
    sourceTitle: `Mathematics and Physics (${s.award ?? s.degree}) | University of Warwick`,
    lastVerified: VERIFIED_ON,
    notes: `Unlike the single-subject Physics degrees, this course pins the A* to Mathematics and names Further Mathematics explicitly. ${EXCLUDED_NOTE} ${NO_DEADLINE_NOTE}`,
  }),
);

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

const COMMON_FIRST_YEAR: StudyOption[] = [
  {
    name: 'Common general engineering first year, then specialisation',
    description:
      'Warwick states: “All first year students study a general engineering programme, which is much favoured by industry. From second year onwards you can specialise in one of eight engineering disciplines, or continue on the general Engineering pathway.” Each named discipline is still its own UCAS application.',
    ucasCode: null,
    chosenWhen: 'From Year 2 onwards.',
    officialUrl: null,
  },
  {
    name: 'Switching between BEng and MEng',
    description:
      'Warwick states: “You can also switch from the three-year BEng to the four-year MEng if academic requirements and regulations are met. Alternatively, you can switch from the MEng to the BEng if you prefer to graduate earlier.”',
    ucasCode: null,
    chosenWhen: 'During the course.',
    officialUrl: null,
  },
];

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng';
  sub:
    | 'general-engineering'
    | 'mechanical'
    | 'civil'
    | 'electrical'
    | 'biomedical'
    | 'robotics-mechatronics'
    | 'computer-engineering';
  years: number;
  code: string;
  path: string;
  /** Computer Systems Engineering does not require Physics. */
  mathsOnly?: boolean;
  extraNotes?: string;
}

const ENG_SEEDS: EngSeed[] = [
  { slug: 'warwick-engineering-beng', name: 'Engineering', degree: 'BEng', sub: 'general-engineering', years: 3, code: 'H100', path: 'beng-engineering' },
  { slug: 'warwick-engineering-meng', name: 'Engineering', degree: 'MEng', sub: 'general-engineering', years: 4, code: 'H102', path: 'meng-engineering' },
  { slug: 'warwick-automotive-engineering-beng', name: 'Automotive Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H330', path: 'beng-automotive-engineering' },
  { slug: 'warwick-automotive-engineering-meng', name: 'Automotive Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H335', path: 'meng-automotive-engineering' },
  { slug: 'warwick-biomedical-systems-engineering-beng', name: 'Biomedical Systems Engineering', degree: 'BEng', sub: 'biomedical', years: 3, code: 'H161', path: 'beng-biomedical-systems-engineering' },
  { slug: 'warwick-biomedical-systems-engineering-meng', name: 'Biomedical Systems Engineering', degree: 'MEng', sub: 'biomedical', years: 4, code: 'H163', path: 'meng-biomedical-systems-engineering' },
  { slug: 'warwick-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'H200', path: 'beng-civil-engineering' },
  { slug: 'warwick-civil-engineering-meng', name: 'Civil Engineering', degree: 'MEng', sub: 'civil', years: 4, code: 'H202', path: 'meng-civil-engineering' },
  { slug: 'warwick-electrical-electronic-engineering-beng', name: 'Electrical and Electronic Engineering', degree: 'BEng', sub: 'electrical', years: 3, code: 'H605', path: 'beng-electrical-electronic-engineering' },
  { slug: 'warwick-electrical-electronic-engineering-meng', name: 'Electrical and Electronic Engineering', degree: 'MEng', sub: 'electrical', years: 4, code: 'H606', path: 'meng-electrical-electronic-engineering' },
  { slug: 'warwick-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H300', path: 'beng-mechanical-engineering' },
  { slug: 'warwick-mechanical-engineering-meng', name: 'Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H302', path: 'meng-mechanical-engineering' },
  { slug: 'warwick-manufacturing-mechanical-engineering-beng', name: 'Manufacturing and Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'HH73', path: 'beng-manufacturing-mechanical-engineering' },
  { slug: 'warwick-manufacturing-mechanical-engineering-meng', name: 'Manufacturing and Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'HH37', path: 'meng-manufacturing-mechanical-engineering' },
  { slug: 'warwick-systems-engineering-beng', name: 'Systems Engineering', degree: 'BEng', sub: 'robotics-mechatronics', years: 3, code: 'HH35', path: 'beng-systems-engineering' },
  { slug: 'warwick-systems-engineering-meng', name: 'Systems Engineering', degree: 'MEng', sub: 'robotics-mechatronics', years: 4, code: 'HH31', path: 'meng-systems-engineering' },
  {
    slug: 'warwick-computer-systems-engineering-beng',
    name: 'Computer Systems Engineering',
    degree: 'BEng',
    sub: 'computer-engineering',
    years: 3,
    code: 'G406',
    path: 'beng-computer-systems-engineering',
    mathsOnly: true,
    extraNotes:
      'Taught jointly with the Department of Computer Science and outside the general-engineering common first year. Warwick’s admissions-tests page states explicitly: “TMUA does not form part of the requirements for applicants to: BEng Computer Systems Engineering (G406) or MEng Computer Systems Engineering (G408).”',
  },
  {
    slug: 'warwick-computer-systems-engineering-meng',
    name: 'Computer Systems Engineering',
    degree: 'MEng',
    sub: 'computer-engineering',
    years: 4,
    code: 'G408',
    path: 'meng-computer-systems-engineering',
    mathsOnly: true,
    extraNotes:
      'Taught jointly with the Department of Computer Science and outside the general-engineering common first year. The TMUA is explicitly excluded from its requirements.',
  },
];

const warwickEngineering: Course[] = ENG_SEEDS.map((s) => {
  const isMeng = s.degree === 'MEng';
  const profile = isMeng ? 'A*AA' : 'AAA';
  const raw = s.mathsOnly
    ? `${profile} to include A in Mathematics.`
    : `${profile} to include Mathematics and Physics.`;
  return course({
    slug: s.slug,
    universityId: 'warwick',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: profile,
        required: s.mathsOnly ? [['Mathematics', 'A']] : ['Mathematics', 'Physics'],
        notes: raw,
      }),
    ],
    studyOptions: s.mathsOnly ? [] : COMMON_FIRST_YEAR,
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'no',
    interviewNote: NO_INTERVIEW,
    contextual: ctx(isMeng ? 'AAA.' : 'AAB.'),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: W(s.path),
    sourceUrl: W(s.path),
    sourceTitle: `${s.name} (${s.degree}) | University of Warwick`,
    lastVerified: VERIFIED_ON,
    notes: `${s.extraNotes ? `${s.extraNotes} ` : ''}${EXCLUDED_NOTE} ${NO_DEADLINE_NOTE}`,
  });
});

export const batch4WarwickCourses: Course[] = [
  ...warwickPhysics,
  ...warwickMathsPhysics,
  ...warwickEngineering,
];
