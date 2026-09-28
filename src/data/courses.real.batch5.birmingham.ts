/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 5, PART E: THE UNIVERSITY OF BIRMINGHAM
 *  2027 entry. Read from Birmingham's own course pages on 2026-09-14.
 *  Every page's requirements panel was confirmed to be showing 2027.
 * ---------------------------------------------------------------------------
 *  1. TWO SEPARATE REDUCED-OFFER SCHEMES, NEVER MERGED. Birmingham publishes
 *     "Pathways to Birmingham" (the deeper reduction, a widening-participation
 *     programme) and "Contextual Offer" (the shallower one) as distinct named
 *     routes with different grades. Both are stored, both as access offers,
 *     and neither ever improves the headline verdict.
 *
 *  2. A CONTEXTUAL OFFER CAN EQUAL ANOTHER COURSE'S STANDARD OFFER. Chemical
 *     Engineering MEng (H810) has standard A*AA/AAAA and contextual AAA — the
 *     same string that is Chemical Engineering BEng's STANDARD offer. And
 *     generosity is inconsistent inside one school: H810 and Energy Engineering
 *     MEng (H805) share the standard A*AA/AAAA but reduce to AAA and AAB
 *     respectively.
 *
 *  3. MOST OFFERS CARRY TWO GRADE ROUTES IN ONE STRING. "A*AA/AAAA to include
 *     A-level Mathematics and Physics grades A*A (or AA as part of the four A
 *     level offer)" is two pathways: three A-Levels at A*AA with Maths A* and
 *     Physics A, or four A-Levels at AAAA with Maths A and Physics A. They are
 *     stored as two matchable routes, the four-A-Level one gated on actually
 *     offering four A-Levels.
 *
 *  4. THREE MSci COURSES USE A DIFFERENT AND HIGHER FORMAT — "A*A*A or A*AAA"
 *     — and they are the only Physics courses that name Further Mathematics as
 *     a route: Theoretical Physics MSci (F343), Physics with Data Science MSci
 *     (FG14) and Theoretical Physics and Applied Mathematics MSci (F3DG).
 *     Same school, same page template, genuinely different requirement.
 *
 *  5. THE ADMISSIONS-TEST POSITION DIFFERS BY SCHOOL. School of Engineering
 *     pages (Engineering, Mechanical, Civil, EEE, Mechatronic, Computer
 *     Engineering) all carry an explicit conditional Mathematics Aptitude test.
 *     Aerospace, Materials, Chemical, Energy and every Physics course say
 *     nothing at all. Silence is recorded as not stated, never as "none", and
 *     the test is never copied across schools.
 *
 *  6. BIRMINGHAM RUNS A GENERAL "ENGINEERING" DEGREE ALONGSIDE the named ones,
 *     not instead of them. Its /engineering-courses subject page lists only the
 *     general degree, which makes it look as if the named disciplines were
 *     consolidated; they were not.
 *
 *  7. Two UCAS codes end in a capital letter I, not a digit one: H64I and H65I.
 *     Materials BEng is J5F2 while its MEng is F2H1 — they share no prefix.
 *
 *  8. Not one of the 56 pages mentions an interview, and no course publishes a
 *     2027 deadline ("to be confirmed"). Excluded from this dataset: Birmingham
 *     Dubai courses, which the UK subject listings interleave without UCAS
 *     codes.
 *
 *  A note on confidence: pages were read through a rendering fetch rather than
 *  raw HTML, so a quoted string is strong evidence while a reported absence is
 *  weaker. That mainly affects GCSE and practical-endorsement fields, which
 *  came back empty for nearly every course.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-14';

const CYCLE =
  'Published requirements for 2027 entry, read from a panel confirmed to be showing 2027. Birmingham publishes no 2027 application deadline — every page reads “Application deadline for September 2027 entry to be confirmed.” The concrete 14 January 2026 date that appears on some pages belongs to the 2026 panel.';

const B = (subject: string, slug: string) =>
  `https://www.birmingham.ac.uk/study/undergraduate/subjects/${subject}/${slug}`;

const NO_TEST_NOTE =
  'No admissions-test wording of any kind appears on this page. Birmingham’s School of Engineering pages do carry an explicit Mathematics Aptitude test clause, but this course is not in that school and its page says nothing — which is silence, not a published “no admissions test”, and the other school’s test is not copied across.';

const MATHS_APTITUDE_NOTE =
  'Birmingham states: “If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test.” It is conditional — it applies to applicants without A-level Mathematics, and BTEC applicants must pass it. No modules are published.';

const NO_INTERVIEW_NOTE =
  'No interview is mentioned on this page. Not one of Birmingham’s 56 in-scope pages mentions an admissions interview, and none publishes a “we do not interview” statement either.';

const EXCLUDED = 'Birmingham states “General Studies not accepted”.';

const ALT_ROUTES =
  'Birmingham publishes three further alternative-offer routes for this course, each one grade lower than the standard offer: an EPQ route (“one grade lower plus a grade B in the EPQ”), a music-performance route (“one grade lower plus the Music qualification”, grade 8 or above) and a high-level-sports route (county level or above). They are alternative offers, not the standard offer, and are not matched here.';

/**
 * Birmingham's two named reduced-offer schemes, stored together but described
 * separately so they are never read as one thing. Neither is matched.
 */
const reduced = (pathways: string | null, contextual: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Birmingham publishes TWO separate reduced-offer schemes with different grades, and they must not be merged. Contextual Offer: ${contextual}. Pathways to Birmingham: ${
    pathways ?? 'explicitly not available for this course'
  }. “Pathways to Birmingham” is the deeper widening-participation reduction and “Contextual Offer” the shallower one. The central page defining eligibility for both schemes returned a 404, so their criteria — and whether Birmingham runs a separate care-experienced or estranged-student route — are unknown rather than absent. Neither scheme is matched against grades here.`,
});

/* ------------------------------------------------------------------ */
/* Physics and Astronomy                                               */
/* ------------------------------------------------------------------ */

const PHYS = 'physics-and-astronomy-courses';

type PhysShape = 'standard' | 'flat-a-star-aa' | 'high-msci';

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MSci';
  sub:
    | 'physics'
    | 'astrophysics'
    | 'theoretical-physics'
    | 'physics-with-computing'
    | 'mathematical-physics';
  years: number;
  code: string;
  page: string;
  shape: PhysShape;
  raw: string;
  pathways: string;
  contextual: string;
  gcse?: string;
  international?: boolean;
  extra?: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'birmingham-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F300', page: 'physics-bsc', shape: 'standard', raw: 'A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)', pathways: 'AAC to include Maths and Physics grades AA', contextual: 'A*AB to include Maths and Physics grades A*A' },
  { slug: 'birmingham-physics-msci', name: 'Physics', degree: 'MSci', sub: 'physics', years: 4, code: 'F302', page: 'physics-msci', shape: 'standard', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)', pathways: 'A*AC to include A-level in Maths and Physics grades A*A', contextual: 'A*AB to include A-level Maths and Physics grades A*A', extra: 'Note the BSc/MSci divergence in the reduced offers: the Physics BSc Pathways offer is AAC while this MSci’s is A*AC, even though the Contextual Offer is A*AB for both.' },
  { slug: 'birmingham-physics-international-study-bsc', name: 'Physics (International Study)', degree: 'BSc', sub: 'physics', years: 4, code: 'F301', page: 'physics-international-bsc', shape: 'standard', raw: 'A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)', pathways: 'AAC to include Maths and Physics grades AA', contextual: 'A*AB to include Maths and Physics grades A*A', gcse: 'GCSE Grade 6 in relevant language to study abroad at a non-English speaking university.', international: true },
  { slug: 'birmingham-physics-international-study-msci', name: 'Physics (International Study)', degree: 'MSci', sub: 'physics', years: 4, code: 'F303', page: 'physics-international-msci', shape: 'standard', raw: 'A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)', pathways: 'A*AC to include A-level in Maths and Physics grades A*A', contextual: 'A*AB to include A-level Maths and Physics grades A*A', international: true, extra: 'This MSci page does NOT repeat the GCSE language requirement its BSc sibling publishes. That gap is recorded as published silence rather than inferred across.' },
  { slug: 'birmingham-physics-and-astrophysics-bsc', name: 'Physics and Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, code: 'FF35', page: 'physics-and-astrophysics-bsc', shape: 'standard', raw: 'A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)', pathways: 'AAC to include Maths and Physics grades AA', contextual: 'A*AB to include Maths and Physics grades A*A' },
  { slug: 'birmingham-physics-and-astrophysics-msci', name: 'Physics and Astrophysics', degree: 'MSci', sub: 'astrophysics', years: 4, code: 'FFH5', page: 'physics-and-astrophysics-msci', shape: 'standard', raw: 'A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)', pathways: 'A*AC to include A-level in Maths and Physics grades A*A', contextual: 'A*AB to include A-level Maths and Physics grades A*A' },
  { slug: 'birmingham-physics-and-astrophysics-international-study-bsc', name: 'Physics and Astrophysics (International Study)', degree: 'BSc', sub: 'astrophysics', years: 4, code: 'FF3M', page: 'physics-and-astrophysics-international-bsc', shape: 'flat-a-star-aa', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A', pathways: 'AAC to include Maths and Physics grades AA', contextual: 'A*AB to include Maths and Physics grades A*A', international: true, extra: 'Birmingham publishes the International Study variant of Astrophysics as a BSc ONLY. Plain Physics has International Study in both BSc (F301) and MSci (F303); Astrophysics does not. That asymmetry is real and has not been “corrected”.' },
  { slug: 'birmingham-physics-with-particle-physics-and-cosmology-bsc', name: 'Physics with Particle Physics and Cosmology', degree: 'BSc', sub: 'physics', years: 3, code: 'F372', page: 'physics-with-particle-physics-and-cosmology-bsc', shape: 'standard', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer).', pathways: 'AAC to include Maths and Physics grades AA.', contextual: 'A*AB to include Maths and Physics grades A*A.' },
  { slug: 'birmingham-physics-with-particle-physics-and-cosmology-msci', name: 'Physics with Particle Physics and Cosmology', degree: 'MSci', sub: 'physics', years: 4, code: 'F373', page: 'physics-with-particle-physics-and-cosmology-msci', shape: 'standard', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)', pathways: 'A*AC to include A-level in Maths and Physics grades A*A', contextual: 'A*AB to include A-level Maths and Physics grades A*A' },
  { slug: 'birmingham-physics-with-data-science-bsc', name: 'Physics with Data Science', degree: 'BSc', sub: 'physics-with-computing', years: 3, code: 'FG13', page: 'physics-with-data-science-bsc', shape: 'standard', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer).', pathways: 'A*BC to include A* in Maths and B in Physics', contextual: 'A*AB to include A* in Maths and A in Physics', extra: 'The Pathways offer for this course has a different SHAPE from its siblings: A*BC keeps the A* in Mathematics even in the widening-participation offer while letting Physics fall to B. Physics BSc (F300), with the same standard offer, reduces to AAC instead.' },
  { slug: 'birmingham-physics-with-data-science-msci', name: 'Physics with Data Science', degree: 'MSci', sub: 'physics-with-computing', years: 4, code: 'FG14', page: 'physics-with-data-science-msci', shape: 'high-msci', raw: 'A*A*A or A*AAA', pathways: 'A*A*C to include A*A* in Maths and Physics; OR A*A*C including A* in Maths and A*C in Physics and Further Maths', contextual: 'A*A*B to include A*A* in Maths and Physics; OR A*A*B including A* in Maths and A*B in Physics and Further Maths' },
  { slug: 'birmingham-physics-with-medical-physics-bsc', name: 'Physics with Medical Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F350', page: 'physics-with-medical-physics-bsc', shape: 'standard', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)', pathways: 'AAC to include Maths and Physics grades AA', contextual: 'A*AB to include Maths and Physics grades A*A' },
  { slug: 'birmingham-physics-with-medical-physics-msci', name: 'Physics with Medical Physics', degree: 'MSci', sub: 'physics', years: 4, code: 'F351', page: 'physics-with-medical-physics-msci', shape: 'flat-a-star-aa', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A', pathways: 'A*AC to include A-level in Maths and Physics grades A*A', contextual: 'A*AB to include A-level Maths and Physics grades A*A' },
  { slug: 'birmingham-theoretical-physics-bsc', name: 'Theoretical Physics', degree: 'BSc', sub: 'theoretical-physics', years: 3, code: 'F342', page: 'theoretical-physics-bsc', shape: 'standard', raw: 'A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer).', pathways: 'A*BC to include A* in Maths and B in Physics', contextual: 'A*AB to include A* in Maths and A in Physics' },
  { slug: 'birmingham-theoretical-physics-msci', name: 'Theoretical Physics', degree: 'MSci', sub: 'theoretical-physics', years: 4, code: 'F343', page: 'theoretical-physics-msci', shape: 'high-msci', raw: 'A*A*A or A*AAA', pathways: 'A*A*C to include A*A* in Maths and Physics OR A*A*C including A* in Maths and A*C in Physics & Further Maths', contextual: 'A*A*B to include A*A* in Maths and Physics OR A*A*B including A* in Maths and A*B in Physics & Further Maths' },
  { slug: 'birmingham-theoretical-physics-and-applied-mathematics-bsc', name: 'Theoretical Physics and Applied Mathematics', degree: 'BSc', sub: 'mathematical-physics', years: 3, code: 'FG31', page: 'theoretical-physics-and-applied-mathematics-bsc', shape: 'flat-a-star-aa', raw: 'A*AA to include A-level Mathematics A* and A-level Physics A', pathways: 'A*BC to include A* in Maths and B in Physics', contextual: 'A*AB to include A* in Maths and A in Physics', extra: 'This is the one Physics BSc with NO four-A-Level alternative — Birmingham publishes a flat A*AA with no “/AAAA” branch, unlike nearly every sibling.' },
  { slug: 'birmingham-theoretical-physics-and-applied-mathematics-msci', name: 'Theoretical Physics and Applied Mathematics', degree: 'MSci', sub: 'mathematical-physics', years: 4, code: 'F3DG', page: 'theoretical-physics-and-applied-mathematics-msci', shape: 'high-msci', raw: 'A*A*A or A*AAA', pathways: 'A*A*C to include A*A* in Maths and Physics OR A*A*C including A* in Maths and A*C in Physics & Further Maths', contextual: 'A*A*B to include A*A* in Maths and Physics OR A*A*B including A* in Maths and A*B in Physics & Further Maths' },
];

const INTERNATIONAL_YEAR: StudyOption = {
  name: 'International Year',
  description:
    'Birmingham states: “This is your international study year, and your modules will depend upon your chosen university. Your programme of study will be devised through liaison with the academic tutors at Birmingham and those at your host institution.” The host university is chosen during the degree; the year sits inside this UCAS code.',
  ucasCode: null,
  chosenWhen: 'During the degree.',
  officialUrl: null,
};

function physOffers(s: PhysSeed) {
  if (s.shape === 'high-msci') {
    return [
      offer({
        label: 'Typical offer — three A-Levels, Mathematics and Physics',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Physics', 'A*']],
        rawText: s.raw,
        notes: `Birmingham prints “${s.raw}” and publishes three routes beneath it. This is the first: A*A*A with A* in Mathematics and A* in Physics. An A* in Mathematics is required on EVERY published route for this course. ${EXCLUDED}`,
      }),
      offer({
        label: 'Typical offer — three A-Levels including Further Mathematics',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*']],
        constraints: [
          oneOf(
            ['Physics', 'Further Mathematics'],
            'A',
            'Physics and Further Mathematics at A*/A as the remaining two subjects.',
          ),
        ],
        rawText: s.raw,
        notes: `Birmingham’s second published route: A*A*A with A* Mathematics plus A*/A Physics and A*/A Further Mathematics. This is one of only three Physics courses at Birmingham where Further Mathematics is named as a route at all. ${EXCLUDED}`,
      }),
      offer({
        label: 'Typical offer — four A-Levels',
        gradeProfile: 'A*AAA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        appliesOnlyIfTakingAtLeast: 4,
        rawText: s.raw,
        notes: `Birmingham’s third published route: A*AAA across four A-Levels, with A* in Mathematics and A in Physics. It applies only to applicants offering four A-Levels. ${EXCLUDED}`,
      }),
    ];
  }
  if (s.shape === 'flat-a-star-aa') {
    return [
      offer({
        label: 'Typical offer',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*'], ['Physics', 'A']],
        rawText: s.raw,
        notes: `Birmingham prints “${s.raw}”. Mathematics must be at A* and Physics at A. ${
          s.code === 'FG31'
            ? 'Unusually, no four-A-Level alternative is published for this course.'
            : 'Where a “/AAAA” branch is printed for this course its subject wording does not name a separate four-A-Level concession, so only the three-A-Level route is stored as matchable.'
        } ${EXCLUDED}`,
      }),
    ];
  }
  return [
    offer({
      label: 'Typical offer — three A-Levels',
      gradeProfile: 'A*AA',
      required: [['Mathematics', 'A*'], ['Physics', 'A']],
      rawText: s.raw,
      notes: `Birmingham prints “${s.raw}”. On the three-A-Level route Mathematics must be at A* and Physics at A. ${EXCLUDED}`,
    }),
    offer({
      label: 'Typical offer — four A-Levels',
      gradeProfile: 'AAAA',
      required: [['Mathematics', 'A'], ['Physics', 'A']],
      appliesOnlyIfTakingAtLeast: 4,
      rawText: s.raw,
      notes: `Birmingham’s four-A-Level alternative inside the same string: AAAA with Mathematics and Physics at AA, which Birmingham describes as “AA as part of the four A level offer”. It applies only to applicants offering four A-Levels. ${EXCLUDED}`,
    }),
  ];
}

const birminghamPhysics: Course[] = PHYS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'birmingham',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: s.raw,
    offers: physOffers(s),
    fm:
      s.shape === 'high-msci'
        ? 'useful'
        : 'no-stated-preference',
    fmNote:
      s.shape === 'high-msci'
        ? 'Birmingham names Further Mathematics as one of the published routes for this course — “A* Maths + A*/A Physics + A*/A Further Maths”. It is an alternative way to meet the offer, not a requirement. Only three Birmingham Physics courses mention it at all.'
        : 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: reduced(s.pathways, s.contextual),
    gcse: s.gcse ?? null,
    studyOptions: s.international ? [INTERNATIONAL_YEAR] : [],
    verification: 'verified',
    officialUrl: B(PHYS, s.page),
    sourceUrl: B(PHYS, s.page),
    sourceTitle: `${s.name} ${s.degree} - University of Birmingham`,
    lastVerified: VERIFIED_ON,
    notes: [s.extra ?? null, ALT_ROUTES].filter(Boolean).join(' '),
  }),
);

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

type EngRule = 'maths-only' | 'aerospace' | 'materials' | 'chemical' | 'foundation';

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng' | 'BSc';
  sub:
    | 'general-engineering'
    | 'mechanical'
    | 'civil'
    | 'electrical'
    | 'computer-engineering'
    | 'aerospace'
    | 'materials'
    | 'chemical';
  years: number;
  yearsMax?: number;
  code: string;
  subject: string;
  page: string;
  profile: string;
  altProfile?: string;
  raw: string;
  rule: EngRule;
  test: boolean;
  pathways: string | null;
  contextual: string;
  gcse?: string;
  extra?: string;
}

const ENG = 'engineering-courses';
const MECH = 'mechanical-engineering-courses';
const CIVIL = 'civil-engineering-courses';
const EESE = 'electronic-electrical-and-systems-engineering-courses';
const AERO = 'aerospace-engineering-courses';
const MAT = 'materials-science-and-engineering-courses';
const CHEM = 'chemical-engineering-courses';

const MATHS_ONLY_RAW = 'to include A-level Mathematics';
const AERO_LIST = ['Physics', 'Chemistry', 'Further Mathematics', 'Computer Science'];
const MAT_LIST = ['Further Mathematics', 'Computer Science', 'Biology', 'Physics', 'Chemistry', 'Design and Technology'];

const ENG_SEEDS: EngSeed[] = [
  { slug: 'birmingham-engineering-beng', name: 'Engineering', degree: 'BEng', sub: 'general-engineering', years: 3, yearsMax: 4, code: 'H236', subject: ENG, page: 'engineering-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths', extra: 'Birmingham runs this deferred-choice degree ALONGSIDE its named engineering degrees, not instead of them. Its duration is printed as a range (3/4 years) because an optional industrial year sits inside this one UCAS code.' },
  { slug: 'birmingham-engineering-meng', name: 'Engineering', degree: 'MEng', sub: 'general-engineering', years: 4, yearsMax: 5, code: 'H632', subject: ENG, page: 'engineering-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H300', subject: MECH, page: 'mechanical-engineering-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths' },
  { slug: 'birmingham-mechanical-engineering-meng', name: 'Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H301', subject: MECH, page: 'mechanical-engineering-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-mechanical-engineering-automotive-beng', name: 'Mechanical Engineering (Automotive)', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H302', subject: MECH, page: 'mechanical-engineering-automotive-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths' },
  { slug: 'birmingham-mechanical-engineering-automotive-meng', name: 'Mechanical Engineering (Automotive)', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H330', subject: MECH, page: 'mechanical-engineering-automotive-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths', extra: 'The Automotive MEng code is H330, not sequential with the BEng’s H302.' },
  { slug: 'birmingham-mechanical-engineering-industrial-year-beng', name: 'Mechanical Engineering with Industrial Year', degree: 'BEng', sub: 'mechanical', years: 4, code: 'H304', subject: MECH, page: 'mechanical-engineering-with-industrial-year-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths' },
  { slug: 'birmingham-mechanical-engineering-industrial-year-meng', name: 'Mechanical Engineering with Industrial Year', degree: 'MEng', sub: 'mechanical', years: 5, code: 'H303', subject: MECH, page: 'mechanical-engineering-with-industrial-year-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-mechanical-engineering-year-abroad-meng', name: 'Mechanical Engineering with a Year Abroad', degree: 'MEng', sub: 'mechanical', years: 4, code: 'H305', subject: MECH, page: 'mechanical-engineering-with-a-year-abroad-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'H200', subject: CIVIL, page: 'civil-engineering-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths' },
  { slug: 'birmingham-civil-engineering-meng', name: 'Civil Engineering', degree: 'MEng', sub: 'civil', years: 4, code: 'H201', subject: CIVIL, page: 'civil-engineering-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-civil-engineering-industrial-experience-meng', name: 'Civil Engineering with Industrial Experience', degree: 'MEng', sub: 'civil', years: 4, code: 'H202', subject: CIVIL, page: 'civil-engineering-with-industrial-experience-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths', extra: 'Birmingham publishes two near-identically named Civil codes that differ materially: H202 “Industrial Experience” is a 10-week placement inside a four-year degree, while H204 “Industrial Year” is a full year across five. The same phrase means a full year in Materials (J200).' },
  { slug: 'birmingham-civil-engineering-industrial-year-meng', name: 'Civil Engineering with Industrial Year', degree: 'MEng', sub: 'civil', years: 5, code: 'H204', subject: CIVIL, page: 'civil-engineering-with-industrial-year-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-civil-engineering-international-study-meng', name: 'Civil Engineering with International Study', degree: 'MEng', sub: 'civil', years: 4, code: 'H203', subject: CIVIL, page: 'civil-engineering-with-international-study-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-computer-engineering-bsc', name: 'Computer Engineering', degree: 'BSc', sub: 'computer-engineering', years: 3, code: 'HH64', subject: EESE, page: 'computer-engineering-bsc', profile: 'AAB', raw: 'AAB. To include A-level Mathematics.', rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths', extra: 'This is a BSc, not a BEng, despite sitting in an engineering school.' },
  { slug: 'birmingham-electronic-and-electrical-engineering-beng', name: 'Electronic and Electrical Engineering', degree: 'BEng', sub: 'electrical', years: 3, code: 'H600', subject: EESE, page: 'electronic-and-electrical-engineering-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths' },
  { slug: 'birmingham-electronic-and-electrical-engineering-meng', name: 'Electronic and Electrical Engineering', degree: 'MEng', sub: 'electrical', years: 4, code: 'H605', subject: EESE, page: 'electronic-and-electrical-engineering-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include A in Maths or Further Maths', contextual: 'AAB to include A in Maths or Further Maths' },
  { slug: 'birmingham-electronic-and-electrical-engineering-industrial-year-beng', name: 'Electronic and Electrical Engineering with Industrial Year', degree: 'BEng', sub: 'electrical', years: 4, code: 'H606', subject: EESE, page: 'electronic-and-electrical-engineering-with-industrial-year-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths' },
  { slug: 'birmingham-electronic-and-electrical-engineering-industrial-year-meng', name: 'Electronic and Electrical Engineering with Industrial Year', degree: 'MEng', sub: 'electrical', years: 5, code: 'H607', subject: EESE, page: 'electronic-and-electrical-engineering-with-industrial-year-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include an A in Maths or Further Maths', contextual: 'AAB to include an A in Maths or Further Maths' },
  { slug: 'birmingham-mechatronic-and-robotic-engineering-beng', name: 'Mechatronic and Robotic Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H6H3', subject: EESE, page: 'mechatronic-and-robotic-engineering-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths', extra: 'Birmingham publishes no degree titled simply “Mechatronic Engineering”; this is the real title.' },
  { slug: 'birmingham-mechatronic-and-robotic-engineering-meng', name: 'Mechatronic and Robotic Engineering', degree: 'MEng', sub: 'mechanical', years: 4, code: 'HH63', subject: EESE, page: 'mechatronic-and-robotic-engineering-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include an A in Maths or Further Maths', contextual: 'AAB to include an A in Maths or Further Maths' },
  { slug: 'birmingham-mechatronic-and-robotic-engineering-industrial-year-beng', name: 'Mechatronic and Robotic Engineering with Industrial Year', degree: 'BEng', sub: 'mechanical', years: 4, code: 'H64I', subject: EESE, page: 'mechatronic-and-robotic-engineering-with-industrial-year-beng', profile: 'AAB', raw: `AAB ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'BBB to include Maths or Further Maths', contextual: 'ABB to include Maths or Further Maths', extra: 'The final character of this UCAS code is a capital letter I, not the digit 1.' },
  { slug: 'birmingham-mechatronic-and-robotic-engineering-industrial-year-meng', name: 'Mechatronic and Robotic Engineering with Industrial Year', degree: 'MEng', sub: 'mechanical', years: 5, code: 'H65I', subject: EESE, page: 'mechatronic-and-robotic-engineering-with-industrial-year-meng', profile: 'AAA', raw: `AAA ${MATHS_ONLY_RAW}`, rule: 'maths-only', test: true, pathways: 'ABB to include an A in Maths or Further Maths', contextual: 'AAB to include an A in Maths or Further Maths', extra: 'The final character of this UCAS code is a capital letter I, not the digit 1.' },
  { slug: 'birmingham-aerospace-engineering-beng', name: 'Aerospace Engineering', degree: 'BEng', sub: 'aerospace', years: 3, code: 'H400', subject: AERO, page: 'aerospace-engineering-beng', profile: 'AAB', raw: 'AAB to include A-level Mathematics and Physics or Chemistry or Further Maths or Computer Science', rule: 'aerospace', test: false, pathways: 'BBB to include B Maths or Further Maths and B in either Physics or Chemistry', contextual: 'ABB to include Maths or Further Maths and either Physics or Chemistry', extra: 'Physics is NOT individually required here — it is one of four acceptable second subjects. Note also that both reduced offers NARROW that list to Physics or Chemistry only, dropping Computer Science.' },
  { slug: 'birmingham-aerospace-engineering-meng', name: 'Aerospace Engineering', degree: 'MEng', sub: 'aerospace', years: 4, code: 'H402', subject: AERO, page: 'aerospace-engineering-meng', profile: 'AAA', raw: 'AAA to include A-level Mathematics and Physics or Chemistry or Further Maths or Computer Science', rule: 'aerospace', test: false, pathways: 'ABB to include B in Maths or Further Maths and B in either Physics or Chemistry', contextual: 'AAB to include Maths or Further Maths and either Physics or Chemistry' },
  { slug: 'birmingham-materials-science-and-engineering-beng', name: 'Materials Science and Engineering', degree: 'BEng', sub: 'materials', years: 3, code: 'J5F2', subject: MAT, page: 'materials-science-and-engineering-beng', profile: 'AAB', raw: 'AAB to include A-level Maths and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology', rule: 'materials', test: false, pathways: 'BBB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology', contextual: 'ABB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology', extra: 'Birmingham publishes no degree titled Metallurgy — the School of Metallurgy and Materials awards this. Note the BEng code J5F2 shares no prefix with the MEng’s F2H1.' },
  { slug: 'birmingham-materials-science-and-engineering-meng', name: 'Materials Science and Engineering', degree: 'MEng', sub: 'materials', years: 4, code: 'F2H1', subject: MAT, page: 'materials-science-and-engineering-meng', profile: 'AAA', raw: 'AAA to include A-level Maths and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology', rule: 'materials', test: false, pathways: 'ABB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology', contextual: 'AAB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology' },
  { slug: 'birmingham-materials-science-and-engineering-industrial-experience-meng', name: 'Materials Science and Engineering with Industrial Experience', degree: 'MEng', sub: 'materials', years: 5, code: 'J200', subject: MAT, page: 'materials-science-and-engineering-with-industrial-experience-meng', profile: 'AAA', raw: 'AAA to include A-level Maths and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology', rule: 'materials', test: false, pathways: 'ABB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology', contextual: 'AAB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology', extra: 'Here “Industrial Experience” means a full year across five years — unlike Civil Engineering’s H202, where the same phrase means a 10-week placement.' },
  { slug: 'birmingham-chemical-engineering-beng', name: 'Chemical Engineering', degree: 'BEng', sub: 'chemical', years: 3, code: 'H800', subject: CHEM, page: 'chemical-engineering-beng', profile: 'AAA', raw: 'AAA to include A level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and either Chemistry or Physics', contextual: 'AAB to include A in Maths and A in either Chemistry or Physics' },
  { slug: 'birmingham-chemical-engineering-meng', name: 'Chemical Engineering', degree: 'MEng', sub: 'chemical', years: 4, code: 'H810', subject: CHEM, page: 'chemical-engineering-meng', profile: 'A*AA', altProfile: 'AAAA', raw: 'A*AA/AAAA to include A level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and Chemistry or Physics', contextual: 'AAA to include Maths and Chemistry or Physics', extra: 'This course’s Contextual Offer, AAA, is the same string as Chemical Engineering BEng’s STANDARD offer — a contextual offer that equals a sibling course’s full requirement. Energy Engineering MEng (H805) shares this standard offer but reduces to AAB instead, a full grade further: generosity is inconsistent inside one school.' },
  { slug: 'birmingham-chemical-engineering-industrial-study-beng', name: 'Chemical Engineering with Industrial Study', degree: 'BEng', sub: 'chemical', years: 4, code: 'HV10', subject: CHEM, page: 'chemical-engineering-with-industrial-study-beng', profile: 'AAA', raw: 'AAA to include A-level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and either Chemistry or Physics', contextual: 'AAB to include A in Maths and A in either Chemistry or Physics' },
  { slug: 'birmingham-chemical-engineering-industrial-study-meng', name: 'Chemical Engineering with Industrial Study', degree: 'MEng', sub: 'chemical', years: 5, code: 'H802', subject: CHEM, page: 'chemical-engineering-with-industrial-study-meng', profile: 'A*AA', altProfile: 'AAAA', raw: 'A*AA/AAAA to include A-level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and Chemistry or Physics', contextual: 'AAA to include Maths and Chemistry or Physics' },
  { slug: 'birmingham-chemical-engineering-international-study-meng', name: 'Chemical Engineering (International Study)', degree: 'MEng', sub: 'chemical', years: 4, code: 'H801', subject: CHEM, page: 'chemical-engineering-international-study-meng', profile: 'A*AA', altProfile: 'AAAA', raw: 'A*AA/AAAA', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and Chemistry or Physics', contextual: 'AAA to include Maths and Chemistry or Physics', extra: 'On this page the grade string and the subject rule are printed in separate fields, so they are recorded separately rather than stitched into one quoted phrase.' },
  { slug: 'birmingham-chemical-engineering-international-and-industrial-study-meng', name: 'Chemical Engineering with International and Industrial Study', degree: 'MEng', sub: 'chemical', years: 5, code: 'HW10', subject: CHEM, page: 'chemical-engineering-with-international-and-industrial-study-meng', profile: 'A*AA', altProfile: 'AAAA', raw: 'A*AA/AAAA to include A-level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and either Chemistry or Physics', contextual: 'AAB to include A in Maths and A in either Chemistry or Physics' },
  { slug: 'birmingham-energy-engineering-beng', name: 'Energy Engineering', degree: 'BEng', sub: 'chemical', years: 3, code: 'H804', subject: CHEM, page: 'energy-engineering-beng', profile: 'AAA', raw: 'AAA to include A level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and Chemistry or Physics', contextual: 'AAA to include Maths and Chemistry or Physics' },
  { slug: 'birmingham-energy-engineering-meng', name: 'Energy Engineering', degree: 'MEng', sub: 'chemical', years: 4, code: 'H805', subject: CHEM, page: 'energy-engineering-meng', profile: 'A*AA', altProfile: 'AAAA', raw: 'A*AA /AAAA to include A level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and Chemistry or Physics', contextual: 'AAB to include A in Maths and A in either Chemistry or Physics' },
  { slug: 'birmingham-energy-engineering-industrial-study-beng', name: 'Energy Engineering with Industrial Study', degree: 'BEng', sub: 'chemical', years: 4, code: 'H806', subject: CHEM, page: 'energy-engineering-with-industrial-study-beng', profile: 'AAA', raw: 'AAA to include A level Mathematics and Chemistry or Physics.', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and either Chemistry or Physics.', contextual: 'AAB to include A in Maths and A in either Chemistry or Physics.' },
  { slug: 'birmingham-energy-engineering-industrial-study-meng', name: 'Energy Engineering with Industrial Study', degree: 'MEng', sub: 'chemical', years: 5, code: 'H807', subject: CHEM, page: 'energy-engineering-with-industrial-study-meng', profile: 'A*AA', altProfile: 'AAAA', raw: 'A*AA/AAAA to include A level Mathematics and Chemistry or Physics', rule: 'chemical', test: false, pathways: 'ABB to include A in Maths and either Chemistry or Physics.', contextual: 'AAB to include A in Maths and A in either Chemistry or Physics.' },
  { slug: 'birmingham-engineering-and-physical-sciences-foundation-year-beng', name: 'Engineering and Physical Sciences Foundation Year', degree: 'BEng', sub: 'general-engineering', years: 4, yearsMax: 5, code: 'HFJ0', subject: ENG, page: 'engineering-physical-sciences-foundation-year', profile: 'BBB', raw: 'BBB A-level Mathematics and General Studies are not considered.', rule: 'foundation', test: false, pathways: null, contextual: 'BBC', gcse: 'Minimum 6/B in GCSE Mathematics.', extra: 'Birmingham prints this course’s offer as “BBB A-level Mathematics and General Studies are not considered.” Read literally that says A-level Mathematics is not considered, which inverts the requirement on every other engineering course here. It is consistent with a foundation route aimed at applicants without the standard qualifications, but the sentence is genuinely ambiguous as printed, so it is stored verbatim and uninterpreted, with no Mathematics requirement asserted either way. This is also the only course where Pathways to Birmingham is explicitly not available, the only one with a published GCSE Mathematics requirement, and the only one restricted by nationality: “Please note this course is only open to UK students.” Progression after the foundation year is to any BEng or MEng honours programme in the College of Engineering and Physical Sciences, making it the broadest deferred-choice route at Birmingham.' },
];

function engOffer(s: EngSeed, profile: string, label: string, fourALevels = false) {
  const base = { label, gradeProfile: profile, rawText: s.raw };
  const four = fourALevels ? { appliesOnlyIfTakingAtLeast: 4 } : {};
  switch (s.rule) {
    case 'aerospace':
      return offer({
        ...base,
        ...four,
        required: ['Mathematics'],
        constraints: [oneOf(AERO_LIST, null, `One of ${AERO_LIST.join(', ')}.`)],
        notes: `Birmingham prints “${s.raw}”. Mathematics is compulsory; the second subject may be any one of Physics, Chemistry, Further Mathematics or Computer Science — so Physics is not individually required on this course. ${EXCLUDED}`,
      });
    case 'materials':
      return offer({
        ...base,
        ...four,
        required: ['Mathematics'],
        constraints: [oneOf(MAT_LIST, null, `One of ${MAT_LIST.join(', ')}.`)],
        notes: `Birmingham prints “${s.raw}” — note the page writes “Maths”, not “Mathematics”, in the offer string. Mathematics is compulsory plus one from a six-subject list. ${EXCLUDED}`,
      });
    case 'chemical':
      return offer({
        ...base,
        ...four,
        required: ['Mathematics'],
        constraints: [oneOf(['Chemistry', 'Physics'], null, 'Either Chemistry or Physics.')],
        notes: `Birmingham prints “${s.raw}”. Mathematics is compulsory plus either Chemistry or Physics. ${EXCLUDED}`,
      });
    case 'foundation':
      return offer({
        ...base,
        notes: `Birmingham prints this offer verbatim as “${s.raw}”. Read literally it states that A-level Mathematics is NOT considered, the opposite of every other engineering course here. Because the sentence is ambiguous as printed, no subject requirement is asserted in either direction and the string is stored exactly as published. ${EXCLUDED}`,
      });
    case 'maths-only':
    default:
      return offer({
        ...base,
        ...four,
        required: ['Mathematics'],
        notes: `Birmingham prints “${s.raw}”. Mathematics is the only named subject — no science is required. Note that both reduced offers for this course accept “Maths or Further Maths”, a widening the standard offer does not state. ${EXCLUDED}`,
      });
  }
}

const birminghamEngineering: Course[] = ENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'birmingham',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    yearsMax: s.yearsMax ?? null,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: s.raw,
    offers: [
      engOffer(s, s.profile, s.altProfile ? 'Typical offer — three A-Levels' : 'Typical offer'),
      ...(s.altProfile ? [engOffer(s, s.altProfile, 'Typical offer — four A-Levels', true)] : []),
    ],
    fm: 'no-stated-preference',
    fmNote:
      s.rule === 'aerospace' || s.rule === 'materials'
        ? 'Birmingham names Further Mathematics as one of this course’s acceptable second subjects, so it can satisfy the subject rule outright. It is not required and Birmingham states no preference for it.'
        : s.rule === 'maths-only'
          ? 'The standard offer names only Mathematics. Birmingham’s two reduced offers for this course accept “Maths or Further Maths”, but the standard offer does not state that widening.'
          : 'Further Mathematics is not mentioned on this course page.',
    test: s.test ? 'other' : 'unknown',
    testRequirement: s.test ? 'conditional' : 'unknown',
    testName: s.test ? 'Mathematics Aptitude test' : null,
    testNote: s.test ? MATHS_APTITUDE_NOTE : NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: reduced(s.pathways, s.contextual),
    gcse: s.gcse ?? null,
    studyOptions: [],
    verification: 'verified',
    officialUrl: B(s.subject, s.page),
    sourceUrl: B(s.subject, s.page),
    sourceTitle: `${s.name} ${s.degree} - University of Birmingham`,
    lastVerified: VERIFIED_ON,
    notes: [s.extra ?? null, s.rule === 'foundation' ? null : ALT_ROUTES].filter(Boolean).join(' '),
  }),
);

export const batch5BirminghamCourses: Course[] = [...birminghamPhysics, ...birminghamEngineering];
