/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 4, PART A: DURHAM UNIVERSITY
 *  2027 entry. Read from Durham's own course pages on 2026-09-03.
 * ---------------------------------------------------------------------------
 *  Two findings worth stating up front.
 *
 *  1. THE PHYSICS FAMILY IS SMALLER THAN IT LOOKS. Durham's department page
 *     states: "We offer four courses accredited by the Institute of Physics –
 *     MPhys qualifications in Physics, Physics and Astronomy, Theoretical
 *     Physics and BSc Physics – which follow the same core curriculum in the
 *     first two years." There is no BSc Theoretical Physics and no BSc Physics
 *     and Astronomy: those exist only as MPhys choices. No record has been
 *     invented for the missing BSc versions.
 *
 *  2. ENGINEERING IS A COMMON PROGRAMME WITH DISCIPLINE-ALIGNED ENTRY CODES.
 *     Durham states: "As a unified General Engineering department… students
 *     still choose a specialisation towards the end of their degree", and
 *     separately: "In addition to these General Engineering programmes, you can
 *     also apply to study discipline-specific courses with us via UCAS." Every
 *     discipline page adds: "The course structure offers a huge amount of
 *     flexibility – you could join us on a[n] [X] engineering pathway but
 *     decide to pursue [Y] engineering at the end of your second year."
 *
 *     So the named disciplines ARE separate UCAS choices — each has its own
 *     code and is a real application — but they share a common first two years
 *     and identical entry requirements. They are therefore separate records,
 *     and the later-specialisation flexibility is recorded as a study option on
 *     each. Nothing has been split into a course that is not a UCAS choice, and
 *     nothing that is a UCAS choice has been collapsed into an option.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-03';

const CYCLE = 'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';

const D = (slug: string) => `https://www.durham.ac.uk/study/courses/${slug}/`;

/**
 * Durham publishes no admissions-test statement and no interview statement on
 * any Physics or Engineering course page. Its general admissions page does
 * carry an explicit university-wide negative, which is quoted here — a
 * published "we do not interview" is stronger information than silence.
 */
const NO_INTERVIEW_NOTE =
  'Durham states university-wide: “The only course for which an interview forms a compulsory part of the selection process is BA (Hons) Primary Education.” This is published on Durham’s general admissions pages, not on the course page.';

const NO_TEST_NOTE = 'No admissions test is mentioned on this course page.';

const NO_DEADLINE_NOTE =
  'Durham publishes no dated deadline on its course pages. Its general guidance says only: “For the best chance of receiving a Durham offer, you’ll need to apply by the January UCAS Equal Consideration Date.” No date has been recorded, because none is published.';

const ctx = (details: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `${details} Durham labels this a “Contextual offer”. Contextual eligibility is assessed separately by the university and is not matched against grades here.`,
});

/* ------------------------------------------------------------------ */
/* Physics                                                             */
/* ------------------------------------------------------------------ */

const PHYSICS_SWITCHING: StudyOption[] = [
  {
    name: 'Switching between the four accredited physics degrees',
    description:
      'Durham states the four Institute of Physics accredited courses “follow the same core curriculum in the first two years”, and students may move between Physics, Physics and Astronomy and Theoretical Physics, or down to the BSc, up to the end of Year 2.',
    ucasCode: null,
    chosenWhen: 'Up to the end of Year 2.',
    officialUrl: null,
  },
  {
    name: 'Year Abroad / Placement Year',
    description:
      'Each physics degree offers a Year Abroad or Placement route extending the course by a year. Durham publishes no separate UCAS code for these routes.',
    ucasCode: null,
    chosenWhen: 'During the course.',
    officialUrl: null,
  },
];

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys' | 'MSci';
  sub: 'physics' | 'theoretical-physics' | 'astrophysics' | 'physics-with-mathematics';
  years: number;
  code: string;
  path: string;
  title: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'durham-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F300', path: 'physics-f300', title: 'Physics F300 - Durham University' },
  { slug: 'durham-physics-mphys', name: 'Physics', degree: 'MPhys', sub: 'physics', years: 4, code: 'F301', path: 'physics-f301', title: 'Physics F301 - Durham University' },
  { slug: 'durham-theoretical-physics-mphys', name: 'Theoretical Physics', degree: 'MPhys', sub: 'theoretical-physics', years: 4, code: 'F344', path: 'theoretical-physics-f344', title: 'Theoretical Physics F344 - Durham University' },
  { slug: 'durham-physics-and-astronomy-mphys', name: 'Physics and Astronomy', degree: 'MPhys', sub: 'astrophysics', years: 4, code: 'FF3N', path: 'physics-and-astronomy-ff3n', title: 'Physics and Astronomy FF3N - Durham University' },
];

const durhamPhysics: Course[] = PHYS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'durham',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*A*A including Mathematics and Physics.',
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*A*A',
        // Durham names both subjects but publishes no per-subject grade, so
        // none is recorded.
        required: ['Mathematics', 'Physics'],
        notes: 'A*A*A including Mathematics and Physics.',
      }),
    ],
    studyOptions: PHYSICS_SWITCHING,
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'no',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: ctx('A*AB, including A*A in Mathematics and Physics (either way round).'),
    verification: 'verified',
    officialUrl: D(s.path),
    sourceUrl: D(s.path),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: `One of the four Institute of Physics accredited Durham physics degrees sharing a common first two years. ${NO_DEADLINE_NOTE}`,
  }),
);

/** Mathematics and Physics is the one physics-family course that names Further Maths. */
const MATHS_PHYSICS_RAW =
  'A*A*A including Physics, Mathematics and Further Mathematics at A Level, or including A*A* in Physics and Mathematics at A Level plus A in AS Further Mathematics for students unable to take A Level Further Mathematics.';

const durhamMathsPhysics: Course[] = (
  [
    { slug: 'durham-mathematics-and-physics-bsc', degree: 'BSc' as const, years: 3, code: 'G427', path: 'mathematics-and-physics-g427', title: 'Mathematics and Physics G427 - Durham University' },
    { slug: 'durham-mathematics-and-physics-msci', degree: 'MSci' as const, years: 4, code: 'G430', path: 'mathematics-and-physics-g430', title: 'Mathematics and Physics G430 - Durham University' },
  ]
).map((s) =>
  course({
    slug: s.slug,
    universityId: 'durham',
    name: 'Mathematics and Physics',
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: MATHS_PHYSICS_RAW,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*A*A',
        required: ['Physics', 'Mathematics', 'Further Mathematics'],
        notes: MATHS_PHYSICS_RAW,
      }),
    ],
    fm: 'required',
    fmNote:
      'Further Mathematics is required at A Level, or at AS Level for students unable to take the full A Level. This is the only Durham physics-family course that names it.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'no',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: ctx(
      'A*AB, including either A*A in Maths and Further Maths at A level and B in Physics, or A*AB with A*A in Maths and Physics, and A in AS Further Mathematics for students unable to take A Level Further Mathematics.',
    ),
    verification: 'verified',
    officialUrl: D(s.path),
    sourceUrl: D(s.path),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: `A joint-honours course, separate from the four accredited single-subject physics degrees. ${NO_DEADLINE_NOTE}`,
  }),
);

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

const ENG_RAW = 'A*AA including Mathematics and one of either Biology, Chemistry, Geology or Physics.';

const ENG_SWITCHING: StudyOption[] = [
  {
    name: 'Change of engineering specialism at the end of Year 2',
    description:
      'Durham states: “The course structure offers a huge amount of flexibility – you could join us on an engineering pathway but decide to pursue a different engineering discipline at the end of your second year.” All Durham engineering degrees share a common first two years in General Engineering.',
    ucasCode: null,
    chosenWhen: 'At the end of Year 2.',
    officialUrl: null,
  },
];

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng';
  sub: 'general-engineering' | 'civil' | 'electrical' | 'electronic' | 'mechanical' | 'aeronautical' | 'biomedical' | 'chemical';
  years: number;
  code: string;
  path: string;
}

const ENG_SEEDS: EngSeed[] = [
  { slug: 'durham-general-engineering-beng', name: 'General Engineering', degree: 'BEng', sub: 'general-engineering', years: 3, code: 'H103', path: 'engineering-h103' },
  { slug: 'durham-general-engineering-meng', name: 'General Engineering', degree: 'MEng', sub: 'general-engineering', years: 4, code: 'H100', path: 'engineering-h100' },
  { slug: 'durham-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'H214', path: 'civil-engineering-h214' },
  { slug: 'durham-civil-engineering-meng', name: 'Civil Engineering', degree: 'MEng', sub: 'civil', years: 4, code: 'H211', path: 'civil-engineering-h211' },
  { slug: 'durham-electrical-engineering-beng', name: 'Electrical Engineering', degree: 'BEng', sub: 'electrical', years: 3, code: 'H514', path: 'electrical-engineering-h514' },
  { slug: 'durham-electrical-engineering-meng', name: 'Electrical Engineering', degree: 'MEng', sub: 'electrical', years: 4, code: 'H511', path: 'electrical-engineering-h511' },
  { slug: 'durham-electronic-engineering-beng', name: 'Electronic Engineering', degree: 'BEng', sub: 'electronic', years: 3, code: 'H714', path: 'electronic-engineering-h714' },
  { slug: 'durham-electronic-engineering-meng', name: 'Electronic Engineering', degree: 'MEng', sub: 'electronic', years: 4, code: 'H711', path: 'electronic-engineering-h711' },
  { slug: 'durham-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H314', path: 'mechanical-engineering-h314' },
  { slug: 'durham-mechanical-engineering-meng', name: 'Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H311', path: 'mechanical-engineering-h311' },
  { slug: 'durham-aeronautical-engineering-meng', name: 'Aeronautical Engineering', degree: 'MEng', sub: 'aeronautical', years: 4, code: 'H411', path: 'aeronautical-engineering-h411' },
  { slug: 'durham-bioengineering-meng', name: 'Bioengineering', degree: 'MEng', sub: 'biomedical', years: 4, code: 'H911', path: 'bioengineering-h911' },
  { slug: 'durham-renewable-energy-engineering-meng', name: 'Renewable Energy Engineering', degree: 'MEng', sub: 'chemical', years: 4, code: 'H811', path: 'renewable-energy-engineering-h811' },
];

const durhamEngineering: Course[] = ENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'durham',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: ENG_RAW,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        // Only Mathematics is required by name. The science is a four-way
        // choice, and Geology counts — a broader list than most engineering
        // departments in this catalogue.
        required: ['Mathematics'],
        constraints: [
          oneOf(
            ['Biology', 'Chemistry', 'Geology', 'Physics'],
            null,
            'One of Biology, Chemistry, Geology or Physics.',
          ),
        ],
        notes: ENG_RAW,
      }),
    ],
    studyOptions: ENG_SWITCHING,
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'no',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: ctx('AAB, including A in Mathematics and one of either Biology, Chemistry, Geology or Physics.'),
    verification: 'verified',
    officialUrl: D(s.path),
    sourceUrl: D(s.path),
    sourceTitle: `${s.name} ${s.code} - Durham University`,
    lastVerified: VERIFIED_ON,
    notes: `Physics is NOT individually required: Biology, Chemistry or Geology satisfies the science condition equally. Entry requirements are identical across every Durham engineering code, BEng and MEng alike; the award and length differ. ${NO_DEADLINE_NOTE}`,
  }),
);

export const batch4DurhamCourses: Course[] = [
  ...durhamPhysics,
  ...durhamMathsPhysics,
  ...durhamEngineering,
];
