/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 5, PART C: THE UNIVERSITY OF NOTTINGHAM
 *  2027 entry. Read from Nottingham's own course pages on 2026-09-14.
 * ---------------------------------------------------------------------------
 *  Findings that shaped how this is stored:
 *
 *  1. INDUSTRIAL-YEAR VARIANTS HAVE THEIR OWN UCAS CODES HERE. Mechanical
 *     Engineering BEng is H302; "including an Industrial Year" BEng is H30A;
 *     the MEng is H300 and its industrial-year version H30C. These are genuinely
 *     separate UCAS applications, so they are separate records — the opposite of
 *     the Bath/Sheffield pattern where a placement is a route inside one code.
 *     The identity rule is what a UCAS code says, not what the word "variant"
 *     suggests.
 *
 *  2. MATHEMATICAL PHYSICS IS A*AA WHILE EVERY OTHER PHYSICS BSc IS AAA, and
 *     its IB figure is 38 rather than 34. Sibling inference would have produced
 *     the wrong number.
 *
 *  3. THE MEng UPLIFT IS DEPARTMENT-SPECIFIC. Mechanical BEng AAA / MEng A*AA;
 *     Civil BEng AAB / MEng AAA; EEE BEng AAB / MEng AAA; but Chemical BEng AAA
 *     = MEng AAA, no uplift at all.
 *
 *  4. FOUR DIFFERENT ENGINEERING SUBJECT RULES, none interchangeable:
 *     Mechanical and Aerospace — A in maths plus (physics or further maths) or
 *     any TWO of chemistry/biology/design/electronics;
 *     Civil — maths at A plus ONE from a twelve-subject list;
 *     Chemical — A in maths AND A in chemistry or physics;
 *     Product Design — maths only (grade B on the BEng, no grade on the MEng).
 *
 *  5. PHYSICS AND ENGINEERING DIFFER ON TWO WHOLE MECHANISMS. Physics courses
 *     require a science practical pass and carry NO offer-reduction scheme;
 *     engineering courses carry the Additional Qualifications Offer Reduction
 *     Scheme and NO practical requirement. Both verified by explicit absence.
 *
 *  6. Two CMS artefacts are transcribed rather than silently repaired: the
 *     stray "H404" inside the EEE required-subjects string, and Physics with
 *     Theoretical Physics BSc printing its duration as "3 years part-time"
 *     where every sibling is full-time.
 *
 *  Not imported: Physics with Computer Science MSci — the page renders no
 *  entry-requirements panel at all and its UCAS code could not be read.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-14';

const CYCLE =
  'Published requirements for 2027 entry, with a September 2027 start. Nottingham folders older cycles under /UG/2026/ and /UG/2025/; the bare unfoldered URL is the current 2027 cycle and is what was read.';

const N = (file: string) =>
  `https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/${file}.html`;

const NO_TEST_NOTE =
  'No admissions test is mentioned anywhere on this course page — the page has no admissions-test section at all. This is silence, not a published “no admissions test”.';

const NO_INTERVIEW_NOTE =
  'No interview is mentioned anywhere on this course page — the page has no interview section. This is silence rather than a published “we do not interview”.';

const NO_DEADLINE_NOTE =
  'Nottingham publishes no application deadline on the course page; it links only to a generic “How to apply” page.';

const CONTEXTUAL_WORDING =
  'Nottingham’s heading is “Contextual offers”: “We make contextual offers to students who may have experienced barriers that have restricted progress at school or college. Our standard contextual offer is usually one grade lower than the advertised entry requirements, and our enhanced contextual offer is usually two grades lower than the advertised entry requirements.” Eligibility requires Home/UK fee status and meeting specific criteria. It is a separate access route and is not matched against grades here.';

const contextual = (grades: string | null): ContextualOfferInfo => ({
  availability: 'yes',
  details: grades
    ? `Contextual offer: ${grades}. ${CONTEXTUAL_WORDING}`
    : `Contextual offer: one grade below the advertised requirement (enhanced: two grades below); Nottingham does not print the resulting profile on this page. ${CONTEXTUAL_WORDING}`,
});

const EPQ_SCHEME =
  'Nottingham publishes an “Additional Qualifications Offer Reduction Scheme” for this course: “If you achieve a grade A in an EPQ, Core Maths, IB Extended Essay or additional AS level qualification then you will receive a one grade reduced offer for this course. A grade B in the IB Extended Essay is also accepted.” It adds: “if you qualify for an enhanced contextual offer or receive an alternative offer based on taking four A levels, your additional qualification will not be taken into consideration”. This is an offer-reduction route, not the standard offer, and is not matched here.';

const EPQ_NOT_VERIFIED =
  'The Additional Qualifications Offer Reduction Scheme was verified on Mechanical, Civil and Chemical Engineering BEng. It is very likely faculty-wide, but it was not individually confirmed on this page, so it is not asserted as present here.';

const PHYS_EXCLUDED =
  'Nottingham lists A-Levels it does not accept: “General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives”.';

const ENG_EXCLUDED =
  'Nottingham lists A-Levels it does not accept: “General studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills”.';

const PRACTICAL =
  'A pass is normally required in science practical tests, where these are assessed separately.';

/* ------------------------------------------------------------------ */
/* Physics — School of Physics and Astronomy                           */
/* ------------------------------------------------------------------ */

const PHYS_OPTIONS: StudyOption[] = [
  {
    name: 'Specialise in astronomy, nanoscience, medical physics or theoretical physics',
    description:
      'The School of Physics and Astronomy states that students specialise within the degree in “astronomy, nanoscience, medical physics or theoretical physics”. Of medical physics it says: “students who choose to specialise in medical physics take modules in health physics, molecular biophysics, and structural and functional medical imaging.” These are module choices inside one application, not separate UCAS courses — Nottingham’s standalone Physics with Medical Physics and Physics with Nanoscience course pages no longer exist for 2027.',
    ucasCode: null,
    chosenWhen: 'Within the degree, through module choice.',
    officialUrl:
      'https://www.nottingham.ac.uk/physics/studywithus/undergraduate/undergraduates.aspx',
  },
  {
    name: 'Study abroad or a paid summer research internship',
    description:
      'Nottingham lists “Study abroad (several months at partner institutions for final year project)”, “Year of overseas study at selected partner institutions” and “Paid summer research internships”. Chosen after admission; no separate UCAS code.',
    ucasCode: null,
    chosenWhen: 'After admission.',
    officialUrl: null,
  },
];

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MSci';
  sub: 'physics' | 'theoretical-physics' | 'astrophysics' | 'mathematical-physics';
  years: number;
  code: string;
  file: string;
  profile: string;
  contextualGrades: string;
  extra?: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'nottingham-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F300', file: 'Physics-BSc-Hons', profile: 'AAA', contextualGrades: 'AAB' },
  { slug: 'nottingham-physics-msci', name: 'Physics', degree: 'MSci', sub: 'physics', years: 4, code: 'F303', file: 'Physics-MSci-Hons', profile: 'AAA', contextualGrades: 'AAB' },
  { slug: 'nottingham-physics-with-theoretical-physics-bsc', name: 'Physics with Theoretical Physics', degree: 'BSc', sub: 'theoretical-physics', years: 3, code: 'F344', file: 'Physics-with-Theoretical-Physics-BSc-Hons', profile: 'AAA', contextualGrades: 'AAB', extra: 'Nottingham’s own page prints this course’s duration as “3 years part-time”, where every sibling course is full-time. That is transcribed rather than repaired, and looks like an error in Nottingham’s CMS.' },
  { slug: 'nottingham-physics-with-theoretical-physics-msci', name: 'Physics with Theoretical Physics', degree: 'MSci', sub: 'theoretical-physics', years: 4, code: 'F340', file: 'Physics-with-Theoretical-Physics-MSci-Hons', profile: 'AAA', contextualGrades: 'AAB' },
  { slug: 'nottingham-physics-with-astrophysics-bsc', name: 'Physics with Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, code: 'F3F5', file: 'Physics-with-Astrophysics-BSc-Hons', profile: 'AAA', contextualGrades: 'AAB', extra: 'Nottingham offers no course called “Physics with Astronomy”; the real course is Physics with Astrophysics.' },
  { slug: 'nottingham-physics-with-astrophysics-msci', name: 'Physics with Astrophysics', degree: 'MSci', sub: 'astrophysics', years: 4, code: 'F3FM', file: 'Physics-with-Astrophysics-MSci-Hons', profile: 'AAA', contextualGrades: 'AAB' },
  { slug: 'nottingham-mathematical-physics-bsc', name: 'Mathematical Physics', degree: 'BSc', sub: 'mathematical-physics', years: 3, code: 'F326', file: 'Mathematical-Physics-BSc-Hons', profile: 'A*AA', contextualGrades: 'AAA', extra: 'This is the only Nottingham Physics course with a starred offer, and its IB figure is 38 points where the rest of Physics is 34. Nottingham does not state which subject the A* must be in. Nottingham publishes no Mathematical Physics MSci — only the BSc exists in the live catalogue.' },
];

const nottinghamPhysics: Course[] = PHYS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'nottingham',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: `Including AA in A level maths and physics. ${PRACTICAL}`,
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: s.profile,
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        rawText: `Including AA in A level maths and physics. ${PRACTICAL}`,
        notes: `Nottingham’s offer is “${s.profile}”, “Including AA in A level maths and physics.” Both named subjects carry a grade-A minimum inside the overall profile.${s.profile === 'A*AA' ? ' The page does not say which subject the A* must be in.' : ''} ${PHYS_EXCLUDED}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: contextual(s.contextualGrades),
    gcse: 'GCSE English language 4 (C).',
    studyOptions: PHYS_OPTIONS,
    verification: 'verified',
    officialUrl: N(s.file),
    sourceUrl: N(s.file),
    sourceTitle: `${s.name} ${s.degree} (Hons) | University of Nottingham`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      `Science practical: “${PRACTICAL}” Nottingham requires this on Physics courses and not on Engineering ones.`,
      'Nottingham’s Additional Qualifications Offer Reduction Scheme is NOT offered on Physics courses — verified by explicit absence on the Physics pages.',
      NO_DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

/* ------------------------------------------------------------------ */
/* Engineering — Faculty of Engineering                                */
/* ------------------------------------------------------------------ */

const MECH_LIST = ['Chemistry', 'Biology', 'Design', 'Electronics'];
const CIVIL_LIST = [
  'Physics',
  'Economics',
  'Psychology',
  '3D Design',
  'Chemistry',
  'Biology',
  'Design and Technology',
  'Geography',
  'Geology',
  'Computing',
  'Computer Science',
  'Further Mathematics',
];
const EEE_LIST = [
  'Electronics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Further Mathematics',
  'Design and Technology',
];

type EngRule = 'mech' | 'civil' | 'eee' | 'chemical' | 'design' | 'architecture' | 'foundation';

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng';
  sub:
    | 'mechanical'
    | 'aerospace'
    | 'civil'
    | 'electrical'
    | 'chemical'
    | 'general-engineering';
  years: number;
  code: string;
  file: string;
  profile: string;
  rule: EngRule;
  altProfile?: string;
  epqVerified?: boolean;
  industrialYear?: boolean;
  mathsGrade?: 'A' | 'B' | null;
  extra?: string;
}

const ENG_SEEDS: EngSeed[] = [
  { slug: 'nottingham-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H302', file: 'Mechanical-Engineering-BEng-Hons', profile: 'AAA', rule: 'mech', mathsGrade: 'A', epqVerified: true },
  { slug: 'nottingham-mechanical-engineering-meng', name: 'Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H300', file: 'Mechanical-Engineering-MEng-Hons', profile: 'A*AA', rule: 'mech', mathsGrade: 'A' },
  { slug: 'nottingham-mechanical-engineering-industrial-year-beng', name: 'Mechanical Engineering including an Industrial Year', degree: 'BEng', sub: 'mechanical', years: 4, code: 'H30A', file: 'Mechanical-Engineering-including-an-Industrial-Year-BEng-Hons', profile: 'AAA', rule: 'mech', mathsGrade: 'A', industrialYear: true },
  { slug: 'nottingham-mechanical-engineering-industrial-year-meng', name: 'Mechanical Engineering including an Industrial Year', degree: 'MEng', sub: 'mechanical', years: 5, code: 'H30C', file: 'Mechanical-Engineering-including-an-Industrial-Year-MEng-Hons', profile: 'A*AA', rule: 'mech', mathsGrade: 'A', industrialYear: true },
  { slug: 'nottingham-mechanical-engineering-with-manufacturing-meng', name: 'Mechanical Engineering with Manufacturing', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H707', file: 'Manufacturing-Engineering-MEng-Hons', profile: 'A*AA', rule: 'mech', mathsGrade: null, extra: 'Nottingham serves this course from a URL named “Manufacturing-Engineering-MEng-Hons”, but the page itself is titled “Mechanical Engineering with Manufacturing MEng (Hons)” and carries code H707. There is no standalone Manufacturing Engineering degree. The title on the page wins over the URL. This page also states the subject rule without a grade on maths, unlike its Mechanical siblings.' },
  { slug: 'nottingham-aerospace-engineering-beng', name: 'Aerospace Engineering', degree: 'BEng', sub: 'aerospace', years: 3, code: 'H402', file: 'Aerospace-Engineering-BEng-Hons', profile: 'AAA', rule: 'mech', mathsGrade: 'A', extra: 'Aerospace Engineering is missing from Nottingham’s own Faculty of Engineering course listing page, but the courses genuinely exist with live 2027 requirements. The faculty listing is not the catalogue of record.' },
  { slug: 'nottingham-aerospace-engineering-meng', name: 'Aerospace Engineering', degree: 'MEng', sub: 'aerospace', years: 4, code: 'H400', file: 'Aerospace-Engineering-MEng-Hons', profile: 'A*AA', rule: 'mech', mathsGrade: 'A' },
  { slug: 'nottingham-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'H201', file: 'Civil-Engineering-BEng-Hons', profile: 'AAB', rule: 'civil', mathsGrade: 'A', epqVerified: true },
  { slug: 'nottingham-civil-engineering-meng', name: 'Civil Engineering', degree: 'MEng', sub: 'civil', years: 4, code: 'H200', file: 'Civil-Engineering-MEng-Hons', profile: 'AAA', rule: 'civil', mathsGrade: 'A' },
  { slug: 'nottingham-electrical-and-electronic-engineering-beng', name: 'Electrical and Electronic Engineering', degree: 'BEng', sub: 'electrical', years: 3, code: 'H603', file: 'Electrical-and-Electronic-Engineering-BEng-Hons', profile: 'AAB', rule: 'eee', mathsGrade: null },
  { slug: 'nottingham-electrical-and-electronic-engineering-meng', name: 'Electrical and Electronic Engineering', degree: 'MEng', sub: 'electrical', years: 4, code: 'H600', file: 'Electrical-and-Electronic-Engineering-MEng-Hons', profile: 'AAA', rule: 'eee', mathsGrade: null },
  { slug: 'nottingham-chemical-engineering-beng', name: 'Chemical Engineering', degree: 'BEng', sub: 'chemical', years: 3, code: 'H810', file: 'Chemical-Engineering-BEng-Hons', profile: 'AAA', rule: 'chemical', mathsGrade: 'A', epqVerified: true },
  { slug: 'nottingham-chemical-engineering-meng', name: 'Chemical Engineering', degree: 'MEng', sub: 'chemical', years: 4, code: 'H800', file: 'Chemical-Engineering-MEng-Hons', profile: 'AAA', rule: 'chemical', mathsGrade: 'A', extra: 'Chemical Engineering is the one Nottingham department with NO grade uplift between BEng and MEng — both are AAA.' },
  { slug: 'nottingham-chemical-engineering-with-environmental-engineering-beng', name: 'Chemical Engineering with Environmental Engineering', degree: 'BEng', sub: 'chemical', years: 3, code: 'H8HF', file: 'Chemical-Engineering-with-Environmental-Engineering-BEng-Hons', profile: 'AAA', rule: 'chemical', mathsGrade: 'A' },
  { slug: 'nottingham-chemical-engineering-with-environmental-engineering-meng', name: 'Chemical Engineering with Environmental Engineering', degree: 'MEng', sub: 'chemical', years: 4, code: 'H8H2', file: 'Chemical-Engineering-with-Environmental-Engineering-MEng-Hons', profile: 'AAA', rule: 'chemical', mathsGrade: 'A' },
  { slug: 'nottingham-product-design-and-manufacture-beng', name: 'Product Design and Manufacture', degree: 'BEng', sub: 'general-engineering', years: 3, code: 'H700', file: 'Product-Design-and-Manufacture-BEng-Hons', profile: 'ABB', rule: 'design', mathsGrade: 'B' },
  { slug: 'nottingham-product-design-and-manufacture-meng', name: 'Product Design and Manufacture', degree: 'MEng', sub: 'general-engineering', years: 4, code: 'H715', file: 'Product-Design-and-Manufacture-MEng-Hons', profile: 'AAB', rule: 'design', mathsGrade: null },
  { slug: 'nottingham-architecture-and-environmental-design-meng', name: 'Architecture and Environmental Design', degree: 'MEng', sub: 'general-engineering', years: 4, code: 'K230', file: 'Architecture-and-Environmental-Design-MEng-Hons', profile: 'AAA', altProfile: 'A*AB', rule: 'architecture', mathsGrade: 'B', extra: 'This is the only in-scope Nottingham course whose offer string itself carries two alternative grade profiles — “AAA / A*AB including B in mathematics” — so it is stored as two matchable routes rather than one unparseable string.' },
  { slug: 'nottingham-engineering-and-physical-sciences-foundation-meng', name: 'Engineering and Physical Sciences Foundation (integrated honours programme)', degree: 'MEng', sub: 'general-engineering', years: 1, code: 'H100', file: 'Engineering-and-Physical-Sciences-Foundation-MEng-Hons', profile: 'BBB', altProfile: 'ABC', rule: 'foundation', mathsGrade: null, extra: 'This single shared foundation programme feeds every engineering department at Nottingham, including Mechanical; there is no per-department “with a foundation year” course. Its subject rule is conditional — “including maths and physics if taken” — so the subjects are required only of applicants who took them, which the engine treats as needing review rather than as a pass or a fail.' },
];

const INDUSTRIAL_NOTE =
  'At Nottingham the industrial year is its own UCAS application, not a route inside another one: Mechanical Engineering BEng is H302 and the industrial-year BEng is H30A; the MEng is H300 and its industrial-year version H30C. They are therefore separate records here.';

function engOffer(s: EngSeed, profile: string, label: string) {
  const mathsSpec: [string, 'A' | 'B'] | string = s.mathsGrade
    ? ['Mathematics', s.mathsGrade]
    : 'Mathematics';
  switch (s.rule) {
    case 'mech':
      return offer({
        label,
        gradeProfile: profile,
        required: [mathsSpec],
        constraints: [
          oneOf(
            ['Physics', 'Further Mathematics'],
            null,
            'Either Physics or Further Mathematics. Nottingham accepts Further Mathematics as a direct substitute for Physics here — not merely as a second mathematics.',
          ),
        ],
        rawText: `A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics.`,
        notes: `Nottingham’s rule: “A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics.” The second limb — any TWO of ${MECH_LIST.join(', ')} — is an alternative route that this tool does not score; a student on that route should read the university’s wording. ${ENG_EXCLUDED}`,
      });
    case 'civil':
      return offer({
        label,
        gradeProfile: profile,
        required: [mathsSpec],
        constraints: [
          oneOf(
            CIVIL_LIST,
            null,
            `One from ${CIVIL_LIST.join(', ')}.`,
          ),
        ],
        rawText:
          'Mathematics grade A at A level and one from physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science or further maths',
        notes: `Nottingham’s rule: “Mathematics grade A at A level and one from physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science or further maths”. Note the grade-A condition on Mathematics sits above what the overall profile alone implies, and the second-subject list is unusually broad. ${ENG_EXCLUDED}`,
      });
    case 'eee':
      return offer({
        label,
        gradeProfile: profile,
        required: [mathsSpec],
        constraints: [oneOf(EEE_LIST, null, `One of ${EEE_LIST.join(', ')}.`)],
        rawText:
          'Maths and one of electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control or design technology: design engineering H404',
        notes: `Nottingham’s rule, transcribed verbatim including the stray course code its CMS prints mid-sentence: “Maths and one of electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control or design technology: design engineering H404”. No subject-specific grade is stated for Mathematics on this page, unlike Civil. ${ENG_EXCLUDED}`,
      });
    case 'chemical':
      return offer({
        label,
        gradeProfile: profile,
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(['Chemistry', 'Physics'], 'A', 'Either Chemistry or Physics, at grade A.'),
        ],
        rawText: 'A in maths and A in either chemistry or physics',
        notes: `Nottingham’s rule: “A in maths and A in either chemistry or physics” — two subject-specific A grades. Further Mathematics is not mentioned and is not an accepted alternative here. ${ENG_EXCLUDED}`,
      });
    case 'design':
      return offer({
        label,
        gradeProfile: profile,
        required: [mathsSpec],
        recommended: ['Art', 'Design and Technology'],
        rawText: s.mathsGrade === 'B' ? 'B in maths is required' : 'Maths is required.',
        notes: `Nottingham’s rule: “${s.mathsGrade === 'B' ? 'B in maths is required' : 'Maths is required.'}” Only Mathematics is mandatory. Nottingham adds: “Art or design and technology are also desirable as second subjects for the course but are not required”. ${ENG_EXCLUDED}`,
      });
    case 'architecture':
      return offer({
        label,
        gradeProfile: profile,
        required: [['Mathematics', 'B']],
        rawText: 'AAA / A*AB including B in mathematics',
        notes: `Nottingham prints this offer as two alternative profiles: “AAA / A*AB including B in mathematics”. Both routes require at least grade B in Mathematics. ${ENG_EXCLUDED}`,
      });
    case 'foundation':
    default:
      return offer({
        label,
        gradeProfile: profile,
        rawText: 'A level grades BBB/ABC, including maths and physics if taken',
        notes: `Nottingham’s rule: “A level grades BBB/ABC, including maths and physics if taken”. The subject condition is conditional on the applicant having taken those subjects, so no unconditional subject requirement is recorded. ${ENG_EXCLUDED}`,
      });
  }
}

const nottinghamEngineering: Course[] = ENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'nottingham',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      engOffer(s, s.profile, s.altProfile ? 'Typical offer — first published route' : 'Typical offer'),
      ...(s.altProfile
        ? [engOffer(s, s.altProfile, 'Typical offer — second published route')]
        : []),
    ],
    /*
     * Nottingham never states a preference for Further Mathematics itself — it
     * only names it as one acceptable subject among others. That acceptance is
     * already modelled structurally, in the pathway's `one-of` list, so the
     * stance field stays at "no stated preference" rather than being promoted
     * to a recommendation the university did not make.
     */
    fm: 'no-stated-preference',
    fmNote:
      s.rule === 'mech'
        ? 'Nottingham accepts Further Mathematics in place of Physics on this course — “either physics or further maths” — so it satisfies the second-subject rule outright rather than counting as an extra mathematics.'
        : s.rule === 'civil' || s.rule === 'eee'
          ? 'Further Mathematics appears as one of the permitted second subjects on this course. It is neither required nor the source of any uplift.'
          : 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: contextual(null),
    gcse: 'English grade 4 (C).',
    placement: s.industrialYear
      ? 'This is Nottingham’s industrial-year course, which has its own UCAS code and is a separate application from the version without the industrial year.'
      : null,
    studyOptions: [],
    verification: 'verified',
    officialUrl: N(s.file),
    sourceUrl: N(s.file),
    sourceTitle: `${s.name} ${s.degree} (Hons) | University of Nottingham`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      INDUSTRIAL_NOTE,
      s.epqVerified ? EPQ_SCHEME : EPQ_NOT_VERIFIED,
      'Nottingham publishes no science-practical requirement on Engineering courses — verified by explicit absence on Mechanical and Chemical Engineering BEng. Its Physics courses do require one.',
      NO_DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

export const batch5NottinghamCourses: Course[] = [
  ...nottinghamPhysics,
  ...nottinghamEngineering,
];
