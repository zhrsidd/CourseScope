/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 4, PART D: BRISTOL AND BATH
 *  2027 entry. Read from each university's own course pages on 2026-09-03.
 * ---------------------------------------------------------------------------
 *  BRISTOL
 *  Every Physics degree publishes the same rule: "A*AA including A*A (in any
 *  order) in Mathematics and Physics", with a labelled "A-level contextual
 *  offer" of "AAB including AA in Mathematics and Physics". Mathematics and
 *  Physics is the exception and publishes two routes, one needing Further
 *  Mathematics. Engineering splits three ways and the differences are real:
 *    • Aerospace — A*AA including Mathematics, with a stated PREFERENCE for two
 *      named subjects. Only Mathematics is actually required.
 *    • Mechanical — A*AA including A*A in Mathematics and one of five subjects.
 *      A hard requirement, not a preference.
 *    • Civil — A*AA including A*A in Mathematics and a "science-related
 *      subject", where Bristol's own list includes Geography, Geology,
 *      Electronics and Design & Technology.
 *    • Electrical and Electronic — AAA including Mathematics. No asterisk at
 *      all, a full grade below the rest of Bristol engineering.
 *  Bristol defers its selection-process detail (tests, interviews) to a
 *  per-school Admissions Statement PDF that was not read, so no test or
 *  interview policy is asserted and each record says so.
 *
 *  BATH
 *  Bath publishes NO UCAS code on any course page checked — Physics or
 *  Engineering. Records therefore carry no course code and fall back to the
 *  name-and-award identity rule. Bath also publishes each placement variant as
 *  its own page while stating that the choice is made after enrolment: "you can
 *  decide whether this is right for you up until the end of your second year".
 *  Because Bath publishes no code, there is no way to tell from its own pages
 *  whether a placement variant is a separate UCAS choice. Rather than guess in
 *  either direction, only the base courses are imported and the placement route
 *  is recorded as a study option with that ambiguity stated.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-03';

const CYCLE_BRISTOL =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';
const CYCLE_BATH =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data. The official page gives a start date of September 2027.';

const BR = (school: string, slug: string) =>
  `https://www.bristol.ac.uk/study/undergraduate/2027/${school}/${slug}/`;
const BA = (subject: string, slug: string) =>
  `https://www.bath.ac.uk/courses/undergraduate-2027/${subject}/${slug}/`;

const BRISTOL_SELECTION_NOTE =
  'Bristol does not publish its admissions-test or interview policy on the course page. It states only: “Full information about our selection processes for this subject can be found in the Admissions Statement”, linking to a per-school PDF that was not read for this record. No test or interview policy has been asserted.';

const BRISTOL_NO_DEADLINE =
  'Bristol publishes no dated application deadline on its course pages; none has been recorded.';

const BATH_DEADLINE =
  'Bath publishes the deadline on a separate university-wide page, not the course page: “You can submit your application by 18:00 (GMT) on 13 January 2027.”';

const BATH_GCSE = 'GCSE English Language or Literature grade 4 or C.';

const ctxBristol = (grades: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `${grades} Bristol labels this an “A-level contextual offer”. It has its own eligibility criteria, assessed by the university, and is not matched against grades here.`,
});

const ctxBath = (grades: string, extra?: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `${grades}${extra ? ` ${extra}` : ''} Bath labels this an “A level Contextual offer”. It has its own eligibility criteria, assessed by the university, and is not matched against grades here.`,
});

/* ================================================================== */
/* BRISTOL — Physics                                                   */
/* ================================================================== */

const BRISTOL_PHYS_RAW = 'A*AA including A*A (in any order) in Mathematics and Physics';

function bristolPhysicsOffer() {
  return offer({
    label: 'Standard offer',
    gradeProfile: 'A*AA',
    // "A*A in any order" states both subject grades: both at A or better, and
    // one of the two at A*. Nothing is inferred.
    required: [['Mathematics', 'A'], ['Physics', 'A']],
    constraints: [
      atLeastAt(
        ['Mathematics', 'Physics'],
        'A*',
        1,
        'The A* must be in Mathematics or Physics — an A* in another subject does not satisfy this.',
      ),
    ],
    notes: `A-level standard offer: “${BRISTOL_PHYS_RAW}”.`,
  });
}

interface BrPhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MSci';
  sub: 'physics' | 'astrophysics' | 'theoretical-physics' | 'physics-with-computing';
  years: number;
  code: string;
  school: string;
  path: string;
  extraNotes?: string;
  gcse?: string;
  placement?: string;
}

const BR_PHYS: BrPhysSeed[] = [
  { slug: 'bristol-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F300', school: 'physics', path: 'bsc-physics' },
  { slug: 'bristol-physics-msci', name: 'Physics', degree: 'MSci', sub: 'physics', years: 4, code: 'F303', school: 'physics', path: 'msci-physics' },
  { slug: 'bristol-physics-with-astrophysics-bsc', name: 'Physics with Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, code: 'F3F5', school: 'physics', path: 'bsc-physics-with-astrophysics' },
  { slug: 'bristol-physics-with-astrophysics-msci', name: 'Physics with Astrophysics', degree: 'MSci', sub: 'astrophysics', years: 4, code: 'F3FM', school: 'physics', path: 'msci-physics-with-astrophysics' },
  { slug: 'bristol-theoretical-physics-msci', name: 'Theoretical Physics', degree: 'MSci', sub: 'theoretical-physics', years: 4, code: 'F340', school: 'physics', path: 'msci-theoretical-physics', extraNotes: 'Bristol offers Theoretical Physics only as an MSci; there is no BSc version, and none has been invented.' },
  { slug: 'bristol-physics-with-computing-bsc', name: 'Physics with Computing', degree: 'BSc', sub: 'physics-with-computing', years: 3, code: 'F330', school: 'physics-computing', path: 'bsc-physics-with-computing', extraNotes: 'Despite the name, no Computer Science A-Level is required or mentioned in the entry requirements.' },
  { slug: 'bristol-physics-with-computing-msci', name: 'Physics with Computing', degree: 'MSci', sub: 'physics-with-computing', years: 4, code: 'F331', school: 'physics-computing', path: 'msci-physics-with-computing' },
  { slug: 'bristol-physics-with-computing-industrial-msci', name: 'Physics with Computing with Industrial Experience', degree: 'MSci', sub: 'physics-with-computing', years: 4, code: 'F334', school: 'physics-computing', path: 'msci-physics-with-computing-with-industrial-experience', placement: 'Includes a year of industrial experience. Bristol publishes it under its own UCAS code, so it is a separate application.' },
  { slug: 'bristol-physics-with-study-abroad-msci', name: 'Physics with Study Abroad in a Modern Language', degree: 'MSci', sub: 'physics', years: 4, code: 'F304', school: 'physics', path: 'msci-physics-with-study-abroad-in-a-modern-language', gcse: 'No specific subjects required for the standard offer. This course additionally publishes an “Advanced Modern Language requirement in French, German or Spanish (7 or A at GCSE)”, which no other Bristol Physics course carries.', placement: 'A year abroad studying in a modern language. Published under its own UCAS code, so it is a separate application.' },
  { slug: 'bristol-physics-with-international-experience-msci', name: 'Physics with International Experience', degree: 'MSci', sub: 'physics', years: 4, code: 'F307', school: 'physics', path: 'msci-physics-with-international-experience', placement: 'Bristol states Year 3 is spent at a partner university studying or researching abroad. Published under its own UCAS code, so it is a separate application.' },
];

const bristolPhysics: Course[] = BR_PHYS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'bristol',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE_BRISTOL,
    raw: null,
    offers: [bristolPhysicsOffer()],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: BRISTOL_SELECTION_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_SELECTION_NOTE,
    contextual: ctxBristol('AAB including AA in Mathematics and Physics.'),
    gcse: s.gcse ?? 'No specific subjects required.',
    placement: s.placement ?? null,
    verification: 'verified',
    officialUrl: BR(s.school, s.path),
    sourceUrl: BR(s.school, s.path),
    sourceTitle: `${s.degree} ${s.name} | Study at Bristol | University of Bristol`,
    lastVerified: VERIFIED_ON,
    notes: `${s.extraNotes ? `${s.extraNotes} ` : ''}${BRISTOL_NO_DEADLINE}`,
  }),
);

/** Mathematics and Physics publishes two routes, one of them needing Further Maths. */
const bristolMathsPhysics: Course[] = (
  [
    { slug: 'bristol-mathematics-and-physics-bsc', degree: 'BSc' as const, years: 3, code: 'GFD3', path: 'bsc-mathematics-and-physics', ctx: 'AAA including Mathematics and Physics, or AAB including AB (in any order) in Mathematics and Further Mathematics, and A in Physics.' },
    { slug: 'bristol-mathematics-and-physics-msci', degree: 'MSci' as const, years: 4, code: 'GFC3', path: 'msci-mathematics-and-physics', ctx: 'AAA including Maths and Physics, or AAB including A in any one of Maths and Further Maths, and A in Physics.' },
  ]
).map((s) =>
  course({
    slug: s.slug,
    universityId: 'bristol',
    name: 'Mathematics and Physics',
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE_BRISTOL,
    raw: 'A*A*A including A* in Maths and A in Physics, or A*AA including A*A (in any order) in Maths and Further Maths, and A in Physics.',
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        notes: 'A-level standard offer, first route: “A*A*A including A* in Maths and A in Physics”.',
      }),
      offer({
        label: 'Alternative offer with Further Mathematics',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Further Mathematics', 'A'], ['Physics', 'A']],
        appliesOnlyIfTaking: ['Further Mathematics'],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Further Mathematics'],
            'A*',
            1,
            'The A* must be in Mathematics or Further Mathematics, in any order.',
          ),
        ],
        notes:
          'A-level standard offer, second route: “or A*AA including A*A (in any order) in Maths and Further Maths, and A in Physics”.',
      }),
    ],
    fm: 'conditional',
    fmNote:
      'Further Mathematics is not required on the first published route, which asks for A* in Mathematics instead. It is required on the second, lower-profile route.',
    test: 'unknown',
    testNote: BRISTOL_SELECTION_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_SELECTION_NOTE,
    contextual: ctxBristol(s.ctx),
    gcse: 'No specific subjects required.',
    verification: 'verified',
    officialUrl: BR('maths', s.path),
    sourceUrl: BR('maths', s.path),
    sourceTitle: `${s.degree} Mathematics and Physics | Study at Bristol | University of Bristol`,
    lastVerified: VERIFIED_ON,
    notes: `The standard offer is A*A*A — two A*s — a genuinely higher string than the A*AA used across the rest of Bristol Physics. The BSc and MSci publish differently worded contextual offers, and both are recorded as printed. ${BRISTOL_NO_DEADLINE}`,
  }),
);

/* ================================================================== */
/* BRISTOL — Engineering                                               */
/* ================================================================== */

const CIVIL_SCIENCES = [
  'Biology',
  'Chemistry',
  'Computer Science',
  'Further Mathematics',
  'Geography',
  'Geology',
  'Physics',
  'Electronics',
  'Design and Technology',
];

const MECH_SCIENCES = ['Further Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

const bristolEngineering: Course[] = [
  course({
    slug: 'bristol-aerospace-engineering-beng',
    universityId: 'bristol',
    name: 'Aerospace Engineering',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'BEng',
    years: 3,
    code: 'H405',
    year: '2027',
    cycleNote: CYCLE_BRISTOL,
    raw: 'A*AA including Mathematics. Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science',
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        // Only Mathematics is required. The named subjects are a stated
        // PREFERENCE, so they are recommended, not required.
        required: ['Mathematics'],
        recommended: MECH_SCIENCES,
        notes:
          'A-level standard offer: “A*AA including Mathematics. Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science”. Only Mathematics is required; the rest are a preference.',
      }),
    ],
    fm: 'recommended',
    fmNote:
      'Further Mathematics is one of five subjects Bristol says it prefers applicants to be taking. It is not required.',
    test: 'unknown',
    testNote: `${BRISTOL_SELECTION_NOTE} The page does mention one test in a non-A-level context: applicants on the Engineering BTEC route “may be invited to take the University of Bristol mathematics test in place of A-level Mathematics”.`,
    interview: 'not-stated',
    interviewNote: BRISTOL_SELECTION_NOTE,
    contextual: ctxBristol(
      'AAB including A in Mathematics. Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science.',
    ),
    gcse: 'No specific subjects required.',
    verification: 'verified',
    officialUrl: BR('aerospace', 'beng-aerospace-engineering'),
    sourceUrl: BR('aerospace', 'beng-aerospace-engineering'),
    sourceTitle: 'BEng Aerospace Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `Physics is NOT required for this course — it is one of five preferred subjects. That is a materially different rule from Bristol Mechanical Engineering, which requires A*A across Mathematics and one named science. ${BRISTOL_NO_DEADLINE}`,
  }),

  ...(
    [
      { slug: 'bristol-mechanical-engineering-beng', degree: 'BEng' as const, years: 3, code: 'H305', path: 'beng-mechanical-engineering' },
      { slug: 'bristol-mechanical-engineering-meng', degree: 'MEng' as const, years: 4, code: 'H300', path: 'meng-mechanical-engineering' },
    ]
  ).map((s) =>
    course({
      slug: s.slug,
      universityId: 'bristol',
      name: 'Mechanical Engineering',
      category: 'engineering',
      sub: 'mechanical',
      degree: s.degree,
      years: s.years,
      code: s.code,
      year: '2027',
      cycleNote: CYCLE_BRISTOL,
      raw: 'A*AA including A*A (in any order) in Mathematics and any one of Further Mathematics, Physics, Chemistry, Biology or Computer Science.',
      offers: [
        offer({
          label: 'Standard offer',
          gradeProfile: 'A*AA',
          required: [['Mathematics', 'A']],
          constraints: [
            oneOf(
              MECH_SCIENCES,
              'A',
              'Any one of Further Mathematics, Physics, Chemistry, Biology or Computer Science at A.',
            ),
            atLeastAt(
              ['Mathematics', ...MECH_SCIENCES],
              'A*',
              1,
              'The A* must be in Mathematics or in the named second subject, in any order.',
            ),
          ],
          notes:
            'A-level standard offer: “A*AA including A*A (in any order) in Mathematics and any one of Further Mathematics, Physics, Chemistry, Biology or Computer Science. In the event of a large number of applications, preference may be given to applicants taking three subjects from the above list, including Mathematics.”',
        }),
      ],
      fm: 'useful',
      fmNote:
        'Further Mathematics is one of five subjects that can satisfy the second-subject requirement. It is not itself required.',
      test: 'unknown',
      testNote: BRISTOL_SELECTION_NOTE,
      interview: 'not-stated',
      interviewNote: BRISTOL_SELECTION_NOTE,
      contextual: ctxBristol(
        'AAB including AA (in any order) in Mathematics and any one of Further Mathematics, Physics, Chemistry, Biology or Computer Science.',
      ),
      gcse: 'No specific subjects required.',
      verification: 'verified',
      officialUrl: BR('mechanical-engineering', s.path),
      sourceUrl: BR('mechanical-engineering', s.path),
      sourceTitle: `${s.degree} Mechanical Engineering | Study at Bristol | University of Bristol`,
      lastVerified: VERIFIED_ON,
      notes: `Physics is not individually required: it is one of five subjects that can fill the second slot. Bristol also notes this course is in a scheduled IMechE re-accreditation review, with an outcome “expected by 2027”. ${BRISTOL_NO_DEADLINE}`,
    }),
  ),

  course({
    slug: 'bristol-civil-engineering-beng',
    universityId: 'bristol',
    name: 'Civil Engineering',
    category: 'engineering',
    sub: 'civil',
    degree: 'BEng',
    years: 3,
    code: 'H205',
    year: '2027',
    cycleNote: CYCLE_BRISTOL,
    raw: 'A*AA including A*A (in any order) in Mathematics and a science-related subject.',
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            CIVIL_SCIENCES,
            'A',
            'A science-related subject at A. Bristol’s list: Biology; Chemistry; Computer Science; Further Mathematics; Geography; Geology; Physics; Electronics; and Design & Technology (Product Design or Design Engineering).',
          ),
          atLeastAt(
            ['Mathematics', ...CIVIL_SCIENCES],
            'A*',
            1,
            'The A* must be in Mathematics or in the science-related subject, in any order.',
          ),
        ],
        notes:
          'A-level standard offer: “A*AA including A*A (in any order) in Mathematics and a science-related subject. Science-related subjects include: Biology; Chemistry; Computer Science; Further Mathematics; Geography; Geology; Physics; Electronics; and Design & Technology (Product Design or Design Engineering).”',
      }),
    ],
    fm: 'useful',
    fmNote:
      'Further Mathematics appears in Bristol’s list of science-related subjects. It is not itself required.',
    test: 'unknown',
    testNote: BRISTOL_SELECTION_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_SELECTION_NOTE,
    contextual: ctxBristol('AAB including AA in Mathematics and a science-related subject.'),
    gcse: 'No specific subjects required.',
    verification: 'verified',
    officialUrl: BR('civil-engineering', 'beng-civil-engineering'),
    sourceUrl: BR('civil-engineering', 'beng-civil-engineering'),
    sourceTitle: 'BEng Civil Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `Bristol's "science-related" list for this course is unusually broad — Geography, Geology, Electronics and Design & Technology all qualify. That is a genuinely wider door than Mechanical Engineering's five-subject list. ${BRISTOL_NO_DEADLINE}`,
  }),

  course({
    slug: 'bristol-electrical-electronic-engineering-meng',
    universityId: 'bristol',
    name: 'Electrical and Electronic Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H606',
    year: '2027',
    cycleNote: CYCLE_BRISTOL,
    raw: 'AAA including Mathematics.',
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'AAA',
        // No asterisk, and no second named subject: only Mathematics.
        required: ['Mathematics'],
        notes: 'A-level standard offer: “AAA including Mathematics.”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: BRISTOL_SELECTION_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_SELECTION_NOTE,
    contextual: ctxBristol('ABB including A in Mathematics.'),
    gcse: 'No specific subjects required.',
    verification: 'verified',
    officialUrl: BR('electrical-electronic-engineering', 'meng-electrical-and-electronic-engineering'),
    sourceUrl: BR('electrical-electronic-engineering', 'meng-electrical-and-electronic-engineering'),
    sourceTitle:
      'MEng Electrical and Electronic Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `This course asks for AAA with NO A* — a full grade below every other Bristol engineering and physics course in this batch — and names only Mathematics, with no second-subject condition at all. Bristol states the first three years are common with the BEng and that transfer to the BEng is possible before the end of Year 3. ${BRISTOL_NO_DEADLINE}`,
  }),
];

/* ================================================================== */
/* BATH                                                                */
/* ================================================================== */

const BATH_PLACEMENT: StudyOption[] = [
  {
    name: 'Professional placement year',
    description:
      'Bath publishes a separate page for the placement version of each course but states the decision is made after enrolment: “Over half of our students choose to take a placement but you can decide whether this is right for you up until the end of your second year.” Bath publishes no UCAS code on any course page checked, so whether the placement version is a separate UCAS choice cannot be established from Bath’s own pages. It is recorded here as a route rather than guessed either way.',
    ucasCode: null,
    chosenWhen: 'Up until the end of Year 2.',
    officialUrl: null,
  },
  {
    name: 'Moving between BEng and MEng',
    description:
      'Bath states: “Once you’re here at Bath, you’ll have until the end of your second year to move between any of our BEng and MEng courses.”',
    ucasCode: null,
    chosenWhen: 'Up until the end of Year 2.',
    officialUrl: null,
  },
];

const BATH_NO_CODE_NOTE =
  'Bath publishes no UCAS course code on this page, so this record carries none and is identified by university, course name, award and cycle instead.';

interface BathSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys' | 'BEng';
  category: 'physics' | 'engineering';
  sub: 'physics' | 'mechanical' | 'aerospace' | 'civil' | 'electrical' | 'chemical';
  years: number;
  subject: string;
  path: string;
  profile: string;
  /**
   * Where Bath publishes two alternative profiles in one string ("AAA or
   * A*AB"), the second is held here and becomes its own pathway. They are
   * genuine alternatives, not a band, so each is matchable on its own.
   */
  altProfile?: string;
  raw: string;
  required: ([string, 'A*' | 'A' | 'B'] | string)[];
  constraints?: ReturnType<typeof oneOf>[];
  contextual: string;
  contextualExtra?: string;
  fm: 'no-stated-preference' | 'not-required' | 'useful';
  fmNote: string;
  altOffer?: { profile: string; note: string };
  extraNotes?: string;
  studyOptions?: StudyOption[];
}

const BATH_SEEDS: BathSeed[] = [
  {
    slug: 'bath-physics-bsc',
    name: 'Physics',
    degree: 'BSc',
    category: 'physics',
    sub: 'physics',
    years: 3,
    subject: 'physics',
    path: 'bsc-physics',
    profile: 'A*AA',
    raw: 'A*AA in three A levels including Mathematics and Physics with A* in Mathematics or Physics (or Further Mathematics if applicable).',
    required: [['Mathematics', 'A'], ['Physics', 'A']],
    contextual: 'AAB in three A levels including A in Mathematics and A in Physics.',
    fm: 'not-required',
    fmNote:
      'Bath states: “Further Mathematics is not required for this course. If you do study Further Mathematics, you must still achieve A in both Maths and Physics.”',
    extraNotes:
      'Accredited by the Institute of Physics “for the purpose of partially meeting the educational requirements for a Chartered Physicist” — the MPhys page says “fully”.',
  },
  {
    slug: 'bath-physics-mphys',
    name: 'Physics',
    degree: 'MPhys',
    category: 'physics',
    sub: 'physics',
    years: 4,
    subject: 'physics',
    path: 'mphys-physics',
    profile: 'A*AA',
    raw: 'A*AA in three A levels including Mathematics and Physics with A* in Mathematics or Physics (or Further Mathematics if applicable).',
    required: [['Mathematics', 'A'], ['Physics', 'A']],
    contextual: 'AAB in three A levels including A in Mathematics and A in Physics.',
    fm: 'not-required',
    fmNote:
      'Bath states: “Further Mathematics is not required for this course. If you do study Further Mathematics, you must still achieve A in both Maths and Physics.”',
    extraNotes:
      'Accredited by the Institute of Physics “for the purpose of fully meeting the educational requirements for a Chartered Physicist”.',
  },
  {
    slug: 'bath-mechanical-engineering-beng',
    name: 'Mechanical Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'mechanical',
    years: 3,
    subject: 'mechanical-engineering',
    path: 'beng-mechanical-engineering',
    profile: 'A*A*A',
    raw: 'A*A*A in three A levels including A* in Mathematics and A in Physics',
    required: [['Mathematics', 'A*'], ['Physics', 'A']],
    contextual: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics.',
    fm: 'useful',
    fmNote:
      'Further Mathematics is not required. It appears only inside Bath’s published alternative offer, as one way of meeting the extra qualification condition.',
    altOffer: {
      profile: 'A*AA or A*A*B',
      note:
        'Bath publishes an alternative offer: “A*AA or A*A*B in three A levels including A* in Mathematics and A in Physics plus one of: grade A in an EPQ or IEPQ; grade A in AS level Further Mathematics (except if you are studying an A level in that subject); grade B in a fourth A level, where your four A levels include A level Further Mathematics; an appropriate grade in any other project qualification we recognise.” It depends on qualifications this tool does not hold, so it is recorded as published information rather than as a matchable route.',
    },
    studyOptions: BATH_PLACEMENT,
  },
  {
    slug: 'bath-aerospace-engineering-beng',
    name: 'Aerospace Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'aerospace',
    years: 3,
    subject: 'mechanical-engineering',
    path: 'beng-aerospace-engineering',
    profile: 'A*A*A',
    raw: 'A*A*A in three A levels including A* in Mathematics and A in Physics',
    required: [['Mathematics', 'A*'], ['Physics', 'A']],
    contextual: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics.',
    fm: 'useful',
    fmNote: 'Further Mathematics is not required. It appears only inside Bath’s alternative offer.',
    altOffer: {
      profile: 'A*AA or A*A*B',
      note:
        'Bath publishes the same alternative offer as its other Mechanical Engineering department courses: “A*AA or A*A*B in three A levels including A* in Mathematics and A in Physics plus one of…”. It depends on qualifications this tool does not hold and is recorded as published information only.',
    },
    studyOptions: BATH_PLACEMENT,
  },
  {
    slug: 'bath-mechanical-with-automotive-engineering-beng',
    name: 'Mechanical with Automotive Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'mechanical',
    years: 3,
    subject: 'mechanical-engineering',
    path: 'beng-mechanical-with-automotive-engineering',
    profile: 'A*A*A',
    raw: 'A*A*A in three A levels including A* in Mathematics and A in Physics',
    required: [['Mathematics', 'A*'], ['Physics', 'A']],
    contextual: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics.',
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned as required on this course page.',
    extraNotes:
      'Bath offers no standalone Automotive Engineering degree; automotive study is offered only through this Mechanical Engineering course.',
    studyOptions: BATH_PLACEMENT,
  },
  {
    slug: 'bath-civil-engineering-beng',
    name: 'Civil Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'civil',
    years: 3,
    subject: 'civil-engineering',
    path: 'beng-civil-engineering',
    profile: 'A*AA',
    raw: 'A*AA in three A levels including Mathematics.',
    required: ['Mathematics'],
    contextual: 'AAB in three A levels including A in Mathematics.',
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    extraNotes:
      'Physics is explicitly NOT required. Bath states: “You will need a strong performance in Mathematics as part of your entry qualifications. Many applicants also study Physics but you do not need to have done so to study this degree and a challenging arts or humanities subject may be as useful in preparing you for the course.”',
    studyOptions: BATH_PLACEMENT,
  },
  {
    slug: 'bath-electrical-and-electronic-engineering-beng',
    name: 'Electrical and Electronic Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'electrical',
    years: 3,
    subject: 'electronic-and-electrical-engineering',
    path: 'beng-electrical-and-electronic-engineering',
    profile: 'AAA',
    altProfile: 'A*AB',
    raw: 'AAA or A*AB including A in Mathematics and A in a second science or technology subject',
    required: [['Mathematics', 'A']],
    constraints: [
      oneOf(
        [
          'Biology',
          'Chemistry',
          'Computer Science',
          'Design and Technology',
          'Electronics',
          'Environmental Science',
          'Further Mathematics',
          'Information and Communication Technology',
          'Music Technology',
          'Physics',
        ],
        'A',
        'A second science or technology subject at A. Bath’s list: Biology, Chemistry, Computer Science, Design and Technology, Electronics, Environmental Science, Further Mathematics, Information and Communication Technology, Music Technology, or Physics.',
      ),
    ],
    contextual: 'ABB including A in Mathematics and B in one other science or technology subject.',
    fm: 'useful',
    fmNote:
      'Further Mathematics is one of ten subjects Bath accepts as the second science or technology subject. It is not itself required.',
    extraNotes:
      'Bath publishes this offer as two alternatives in one sentence, “AAA or A*AB”. Both are stored as separate matchable routes rather than collapsed into one string.',
    studyOptions: BATH_PLACEMENT,
  },
  {
    slug: 'bath-chemical-engineering-beng',
    name: 'Chemical Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'chemical',
    years: 3,
    subject: 'chemical-engineering',
    path: 'beng-chemical-engineering',
    profile: 'A*AA',
    raw: 'A*AA in three A levels including Chemistry and Mathematics.',
    required: ['Chemistry', 'Mathematics'],
    contextual: 'AAB in three A levels including A in Chemistry and A in Mathematics.',
    fm: 'useful',
    fmNote:
      'Further Mathematics is mentioned only inside Bath’s alternative-offer wording, as one of the extra qualifications that can be offered.',
    extraNotes: 'Chemistry is required and Physics is not mentioned as a requirement.',
    studyOptions: BATH_PLACEMENT,
  },
  {
    slug: 'bath-integrated-mechanical-and-electrical-engineering-beng',
    name: 'Integrated Mechanical and Electrical Engineering',
    degree: 'BEng',
    category: 'engineering',
    sub: 'mechanical',
    years: 3,
    subject: 'integrated-mechanical-and-electrical-engineering',
    path: 'beng-integrated-mechanical-and-electrical-engineering',
    profile: 'AAA',
    altProfile: 'A*AB',
    raw: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics.',
    required: [['Mathematics', 'A'], ['Physics', 'A']],
    contextual: 'ABB in three A levels including A in Mathematics and B in Physics.',
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    extraNotes:
      'Bath publishes this offer as two alternatives in one sentence, “AAA or A*AB”. Both are stored as separate matchable routes.',
    studyOptions: BATH_PLACEMENT,
  },
];

const bathCourses: Course[] = BATH_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'bath',
    name: s.name,
    category: s.category,
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    // Bath publishes no UCAS codes on its course pages.
    code: null,
    year: '2027',
    cycleNote: CYCLE_BATH,
    raw: s.raw,
    offers: [
      offer({
        label: s.altProfile ? 'Typical offer — first published route' : 'Typical offer',
        gradeProfile: s.profile,
        required: s.required as never,
        constraints: s.constraints ?? [],
        notes: `A level typical offer: “${s.raw}”`,
      }),
      ...(s.altProfile
        ? [
            offer({
              label: 'Typical offer — second published route',
              gradeProfile: s.altProfile,
              required: s.required as never,
              constraints: s.constraints ?? [],
              notes: `Bath publishes this offer as two alternatives in one sentence: “${s.raw}”. Both are recorded, each matchable on its own.`,
            }),
          ]
        : []),
    ],
    studyOptions: s.studyOptions ?? [],
    fm: s.fm,
    fmNote: s.fmNote,
    test: 'unknown',
    testNote: 'No admissions test is mentioned anywhere on this course page.',
    interview: 'not-stated',
    interviewNote:
      'No general admissions interview is published. An interview is mentioned only for applicants progressing via the Access to HE Diploma route.',
    contextual: ctxBath(s.contextual, s.altOffer ? `Bath also publishes a separate alternative offer: ${s.altOffer.note}` : undefined),
    gcse: BATH_GCSE,
    verification: 'verified',
    officialUrl: BA(s.subject, s.path),
    sourceUrl: BA(s.subject, s.path),
    sourceTitle: `${s.name} ${s.degree} (Hons) | University of Bath`,
    lastVerified: VERIFIED_ON,
    notes: `${s.extraNotes ? `${s.extraNotes} ` : ''}${BATH_NO_CODE_NOTE} ${BATH_DEADLINE}`,
  }),
);

export const batch4BristolCourses: Course[] = [
  ...bristolPhysics,
  ...bristolMathsPhysics,
  ...bristolEngineering,
];

export const batch4BathCourses: Course[] = bathCourses;
