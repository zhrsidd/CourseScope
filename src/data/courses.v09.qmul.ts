/**
 * ---------------------------------------------------------------------------
 *  v0.9 — QUEEN MARY UNIVERSITY OF LONDON
 *  Read from Queen Mary's own 2027-entry course finder on 2026-09-28.
 * ---------------------------------------------------------------------------
 *
 *  QMUL was the last university in the catalogue with no verified data. v0.8
 *  held four identity-only rows for it and could not do better: every attempt
 *  at the course finder returned a redirect loop, so the only reachable sources
 *  were departmental pages that name programmes without codes, cycles or
 *  offers.
 *
 *  The course finder is JS-rendered. A rendered browser reaches it, and it is
 *  the most complete source any university in this catalogue publishes: one
 *  page per subject, every separately-coded option enumerated with its own
 *  code, award, duration, start date and offer, plus a shared entry-requirement
 *  panel carrying contextual offers, GCSE and EPQ.
 *
 *  THE DECISION, PER v0.9 PART 3, IS OPTION A — VERIFY AND KEEP.
 *
 *  ---------------------------------------------------------------------------
 *  THE IDENTITY CORRECTION THAT MATTERS MOST: ASTROPHYSICS IS A STREAM
 *  ---------------------------------------------------------------------------
 *
 *  The catalogue held "Astrophysics BSc" as a QMUL application. It is not one
 *  for 2027 entry.
 *
 *  Queen Mary's Physics page publishes four PHYSICS STREAMS — Physics,
 *  Theoretical Physics, Astrophysics, and Physics with Artificial Intelligence
 *  — chosen after the first year, inside the one application. Its "Study
 *  options" block then enumerates the seven things you CAN apply to, each with
 *  its own code, and Astrophysics is not among them. There is no Astrophysics
 *  course page for 2027 at all: the course-finder URL returns Queen Mary's own
 *  404 page, while Physics, Biomedical Engineering and Materials Science and
 *  Engineering all return 200.
 *
 *  So the previous record asserted an application a student cannot make. It is
 *  removed, and the four streams are recorded as study options on the Physics
 *  BSc and MSci records — which is what they are, and which means a student
 *  searching "Astrophysics" still finds Queen Mary and is routed to the code
 *  they would actually enter on UCAS.
 *
 *  A departmental page read in v0.8 does describe a "BSc/MSci Astrophysics",
 *  and that is why the v0.8 row was kept rather than deleted. The course finder
 *  is the authoritative source for what is applied to, it is explicitly
 *  2027-scoped, and it enumerates the codes. Where a department page and the
 *  course finder disagree about whether something is an application, the
 *  course finder wins — it is the thing that feeds UCAS.
 *
 *  ---------------------------------------------------------------------------
 *  BOTH REMAINING SCAFFOLD CODES WERE ALSO WRONG
 *  ---------------------------------------------------------------------------
 *   · Biomedical Engineering BEng: the scaffold said H160. Queen Mary publishes
 *     HBF2. (H160 is York's Biomedical Engineering BEng — a different
 *     university's code entirely.)
 *   · Materials Science and Engineering BEng: the scaffold said J500. Queen
 *     Mary publishes J511. (J500 is Manchester's and Sheffield's.)
 *
 *  Only Physics BSc F300 was right. Three of four scaffold codes wrong, and the
 *  two wrong ones were both codes that exist at OTHER universities for the same
 *  subject — which is exactly how a plausible-looking invented code gets made,
 *  and exactly why v0.8 stripped them rather than trusting them.
 *
 *  ---------------------------------------------------------------------------
 *  THREE DIFFERENT SUBJECT RULES, READ PER PAGE
 *  ---------------------------------------------------------------------------
 *  Queen Mary writes its subject requirements three different ways, and the
 *  differences are load-bearing rather than stylistic:
 *
 *   · PHYSICS BSc — "grade A or above in at least one of Mathematics and
 *     Physics. Both subjects are required." Two requirements in one sentence:
 *     both subjects present, AND at least one of them at A. A student with
 *     B in Maths and B in Physics is excluded even at ABB overall.
 *   · PHYSICS MSci — "grade A or above in BOTH A-Level Mathematics and
 *     Physics." Stricter, and a different shape: two pinned grades, not a
 *     count.
 *   · MATERIALS — "at least two A-Level subjects of Mathematics, Physics or
 *     Chemistry." A count over a set, with no subject individually compulsory.
 *   · BIOMEDICAL — "A-Level Mathematics, and Physics or Chemistry or Biology."
 *     One compulsory subject plus a one-of.
 *
 *  Four shapes across three subjects at one university. Each is stored with the
 *  constraint that matches it, and Queen Mary's sentence is kept verbatim.
 */

import type { Course, StudyOption } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const READ_ON = '2026-09-28';

const Q = (slug: string) => `https://www.qmul.ac.uk/undergraduate/coursefinder/courses/2027/${slug}/`;

const CYCLE =
  'Published requirements for 2027 entry. Queen Mary scopes its course finder by year in the URL path (/courses/2027/) and each option repeats "Start September 2027" in its own key-information block, so the cycle is stated per option rather than inferred from a page banner.';

const GCSE =
  'Queen Mary publishes one GCSE rule, shared across these courses: “Both GCSE English and Maths at grade C or 4 or an acceptable equivalent will be required.”';

const EPQ =
  'EPQ route, in Queen Mary’s own words: “Alternative offers may be made to applicants taking the Extended Project Qualification.” Note what is NOT published — the size of the reduction. Queen Mary links out to its EPQ page rather than stating a grade, so no reduced profile is recorded here.';

const EXCLUSIONS =
  'Explicit exclusions: “Please note that General Studies and Critical Thinking are excluded from any A-Level offer and cannot be considered.”';

const NO_TEST =
  'No admissions test is mentioned anywhere on this course page or in its entry-requirements panel. Queen Mary does not state that no test is required either, so this is silence rather than a published “no admissions test”.';

const NO_INTERVIEW =
  'No admissions interview is mentioned. The only interview wording on these pages concerns support for securing a placement year, which is careers support after admission rather than a selection stage.';

const INSTITUTION =
  'Queen Mary’s institution code is Q50. It is printed beside every course code and is NOT a course code — the distinction that produced a false positive in the Batch 7 identity checker when Southampton’s S27 was read as one.';

const APPLY_WARNING =
  'Queen Mary attaches a warning to its own list of codes: “Take care to use the correct UCAS code — it may not be possible to change your selection later.” That is a university telling applicants these options are separate applications, which is why each is a separate record here rather than a study option.';

/*
 * The four Physics streams — routes inside the application, not applications.
 * Recorded so that a student searching "Astrophysics" or "Theoretical Physics"
 * finds Queen Mary and is routed to the code they must actually apply to.
 */
const physicsStreams = (parentCode: string): StudyOption[] =>
  [
    ['Physics', 'The most versatile stream, mixing experimental, theoretical and computational work.'],
    ['Theoretical Physics', 'Queen Mary’s most mathematically oriented stream.'],
    ['Astrophysics', 'Exoplanets, stellar birth and death, galaxy formation and cosmology, using the rooftop observatory.'],
    ['Physics with Artificial Intelligence', 'Programming, modern statistical methods and machine learning, applied to an AI-driven final-year project.'],
  ].map(([name, description]) => ({
    name,
    description: `${description} A STREAM INSIDE THIS APPLICATION, NOT A SEPARATE COURSE — Queen Mary’s own words are that students “tailor your degree to your interests and passion through our Physics Streams”, chosen after the first year. Queen Mary publishes no UCAS code for any stream, and its list of things you can apply to does not include them.`,
    ucasCode: parentCode,
    chosenWhen: 'After the first year.',
    officialUrl: null,
  }));

/* ================================================================== */
/* Physics — 7 separately coded applications                           */
/* ================================================================== */

const PHYS_BSC_RAW =
  'Grades ABB at A-Level. This must include grade A or above in at least one of Mathematics and Physics. Both subjects are required.';
const PHYS_MSCI_RAW =
  'Grades AAB at A-Level. This must include grade A or above in both A-Level Mathematics and Physics.';

const PHYS_BSC_CONTEXTUAL =
  'Under Queen Mary’s own “Contextualised admissions” heading, TWO tiers: “Our standard contextual offer: BBC including BB in Maths and Physics at A-Level.” and “Our enhanced contextual offer: BCC including BC in Maths and Physics at A-Level.” Note that both tiers PIN the subject grades where the standard offer only requires one of them at A — the reduced routes are more specific about subjects, not less.';
const PHYS_MSCI_CONTEXTUAL =
  'Under Queen Mary’s own “Contextualised admissions” heading, TWO tiers: “Our standard contextual offer: BBB including BB in Maths and Physics at A-Level.” and “Our enhanced contextual offer: BBC including BB in Maths and Physics at A-Level.”';

interface PhysSeed {
  slug: string;
  name: string;
  award: 'BSc' | 'MSci';
  years: number;
  code: string;
  variant: 'plain' | 'foundation' | 'placement' | 'abroad';
  extra?: string;
}

const PHYS: PhysSeed[] = [
  { slug: 'qmul-physics-bsc', name: 'Physics', award: 'BSc', years: 3, code: 'F300', variant: 'plain', extra: 'THE ONE SCAFFOLD CODE AT QUEEN MARY THAT WAS CORRECT. The v0.8 record carried no code because none could be sourced; F300 is now confirmed on Queen Mary’s own 2027 course finder.' },
  { slug: 'qmul-physics-foundation-bsc', name: 'Physics with Foundation', award: 'BSc', years: 4, code: 'FFX0', variant: 'foundation', extra: 'NO SUBJECT REQUIREMENT IS PUBLISHED and the aggregate drops three grades, from ABB to CCC — the widest foundation-year gap at any university in this catalogue. Queen Mary describes progression as conditional: “At the end of the foundation programme, students will be required to meet the progression requirements for admission to BSc Physics.” That is a condition, not an automatic transfer, and it is not recorded as one.' },
  { slug: 'qmul-physics-professional-experience-bsc', name: 'Physics with Professional Experience', award: 'BSc', years: 4, code: 'F306', variant: 'placement' },
  { slug: 'qmul-physics-year-abroad-bsc', name: 'Physics with Year Abroad', award: 'BSc', years: 4, code: 'F302', variant: 'abroad' },
  { slug: 'qmul-physics-msci', name: 'Physics', award: 'MSci', years: 4, code: 'F303', variant: 'plain', extra: 'A DIFFERENT SUBJECT RULE FROM ITS OWN BSc, not merely a higher one. The BSc asks for grade A in at least ONE of Mathematics and Physics; this asks for grade A in BOTH. Queen Mary also states the MSci is reachable from the BSc after starting — “It is possible to transfer to the four-year MSci programme after starting your BSc degree” — which is a transfer between two separate applications, not an option inside either.' },
  { slug: 'qmul-physics-professional-experience-msci', name: 'Physics with Professional Experience', award: 'MSci', years: 5, code: 'F307', variant: 'placement' },
  { slug: 'qmul-physics-year-abroad-msci', name: 'Physics with Year Abroad', award: 'MSci', years: 5, code: 'F301', variant: 'abroad' },
];

const physicsCourses: Course[] = PHYS.map((s) => {
  const isFoundation = s.variant === 'foundation';
  const isMsci = s.award === 'MSci';
  const raw = isFoundation ? 'Grades CCC at A-Level.' : isMsci ? PHYS_MSCI_RAW : PHYS_BSC_RAW;
  return course({
    slug: s.slug,
    universityId: 'qmul',
    name: s.name,
    category: 'physics',
    sub: s.name.includes('Foundation') ? 'physics' : 'physics',
    degree: s.award,
    awardLabel: `${s.award} (Hons)`,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw,
    offers: [
      offer({
        label: 'Typical A-Level offer',
        gradeProfile: isFoundation ? 'CCC' : isMsci ? 'AAB' : 'ABB',
        required: isFoundation
          ? []
          : isMsci
            ? [
                ['Mathematics', 'A'],
                ['Physics', 'A'],
              ]
            : ['Mathematics', 'Physics'],
        // The BSc rule is a COUNT over two compulsory subjects, which a pair of
        // pinned grades cannot express: both must be present, and only one of
        // them needs the A. Storing two A requirements would wrongly fail a
        // student with A in Maths and B in Physics, whom Queen Mary accepts.
        constraints: isFoundation || isMsci
          ? []
          : [
              atLeastAt(
                ['Mathematics', 'Physics'],
                'A',
                1,
                'Queen Mary requires BOTH Mathematics and Physics, and at least ONE of them at grade A or above: “This must include grade A or above in at least one of Mathematics and Physics. Both subjects are required.” A profile holding B in each does not meet this offer even at ABB overall.',
              ),
            ],
        rawText: raw,
      }),
    ],
    maths: isFoundation ? 'unknown' : 'required',
    physicsStatus: isFoundation ? 'unknown' : 'required',
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is never raised on this course page or in its entry-requirements panel, both of which were read in full. Queen Mary publishes no preference either way. Note that Further Mathematics DOES appear as a compulsory module inside the foundation year — that is content taught after admission, not an entry requirement, and it is not stored as one.',
    test: 'unknown',
    testNote: NO_TEST,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW,
    contextual: {
      availability: isFoundation ? 'check-website' : 'yes',
      details: isFoundation
        ? 'Queen Mary links “Full entry requirements (including contextual admissions)” from this option, but publishes no contextual grade profile for the foundation route specifically. Its two contextual tiers are stated for the three-year BSc and the MSci; neither has been applied here.'
        : isMsci
          ? PHYS_MSCI_CONTEXTUAL
          : PHYS_BSC_CONTEXTUAL,
    },
    gcse: GCSE,
    studyOptions: isFoundation ? [] : physicsStreams(s.code),
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'Queen Mary’s own 2027-entry course finder page for Physics was read in a rendered browser. It enumerates all seven separately coded options under “Study options”, each with its own UCAS code, award, duration and start date, and this record’s code was read from that list and from the option’s own key-information block. Two places on one official, year-scoped page.',
    officialUrl: Q('physics'),
    sourceUrl: Q('physics'),
    sourceTitle: 'Physics - Queen Mary University of London (2027 entry)',
    lastVerified: READ_ON,
    notes: [
      s.extra,
      'THE FOUR PHYSICS STREAMS ARE NOT APPLICATIONS. Queen Mary publishes Physics, Theoretical Physics, Astrophysics and Physics with Artificial Intelligence as streams chosen after the first year, inside this one application. They are recorded as study options. THE CATALOGUE PREVIOUSLY HELD “Astrophysics BSc” AS A SEPARATE QUEEN MARY COURSE; it is not one for 2027 — Queen Mary publishes no Astrophysics course page for this cycle and no Astrophysics code, and that record has been removed.',
      APPLY_WARNING,
      EPQ,
      EXCLUSIONS,
      INSTITUTION,
      'Queen Mary publishes no application deadline on this page.',
    ]
      .filter(Boolean)
      .join(' '),
  });
});

/* ================================================================== */
/* Biomedical Engineering — 7 separately coded applications             */
/* ================================================================== */

const BIO_BENG_RAW =
  'Grades AAB at A-Level. This must include A-Level Mathematics, and Physics or Chemistry or Biology.';
const BIO_MENG_RAW =
  'Grades AAA at A-Level. This must include A-Level Mathematics, and Physics or Chemistry or Biology.';

const BIO_SCIENCE_RULE = oneOf(
  ['Physics', 'Chemistry', 'Biology'],
  null,
  'Queen Mary requires Mathematics plus one of Physics, Chemistry or Biology. THE LIST IS CLOSED — the wording is “Physics or Chemistry or Biology”, not “for example” — and it admits Biology, which its own Materials Science courses do not.',
);

interface EngSeed {
  slug: string;
  name: string;
  award: 'BEng' | 'MEng';
  years: number;
  code: string;
  variant: 'plain' | 'foundation' | 'placement' | 'abroad';
  extra?: string;
}

const BIO: EngSeed[] = [
  { slug: 'qmul-biomedical-engineering-beng', name: 'Biomedical Engineering', award: 'BEng', years: 3, code: 'HBF2', variant: 'plain', extra: 'THE SCAFFOLD SAID H160 AND WAS WRONG. Queen Mary publishes HBF2. H160 is YORK’S Biomedical Engineering BEng — a different university’s code for a similarly named degree, which is exactly how a plausible invented code comes about and exactly why v0.8 stripped it rather than trusting it.' },
  { slug: 'qmul-engineering-foundation-beng', name: 'Engineering with Foundation', award: 'BEng', years: 4, code: 'HHX3', variant: 'foundation', extra: 'A SHARED FOUNDATION ROUTE, NOT A BIOMEDICAL ONE. Queen Mary lists this code under Biomedical Engineering but titles it “Engineering with Foundation”, and its subject rule is Mathematics alone rather than Biomedical’s Maths-plus-a-science. It is recorded under its own published title rather than renamed to match the page it appears on.' },
  { slug: 'qmul-biomedical-engineering-industrial-experience-beng', name: 'Biomedical Engineering with Industrial Experience', award: 'BEng', years: 4, code: 'HBF1', variant: 'placement' },
  { slug: 'qmul-biomedical-engineering-year-abroad-beng', name: 'Biomedical Engineering with Year Abroad', award: 'BEng', years: 4, code: 'HBFY', variant: 'abroad' },
  { slug: 'qmul-biomedical-engineering-meng', name: 'Biomedical Engineering', award: 'MEng', years: 4, code: 'HBF5', variant: 'plain' },
  { slug: 'qmul-biomedical-engineering-industrial-experience-meng', name: 'Biomedical Engineering with Industrial Experience', award: 'MEng', years: 5, code: 'HBF3', variant: 'placement' },
  { slug: 'qmul-biomedical-engineering-year-abroad-meng', name: 'Biomedical Engineering with Year Abroad', award: 'MEng', years: 5, code: 'HBFX', variant: 'abroad' },
];

const biomedicalCourses: Course[] = BIO.map((s) => {
  const isFoundation = s.variant === 'foundation';
  const isMeng = s.award === 'MEng';
  const raw = isFoundation
    ? 'Grades BBB at A-Level. This must include A-Level Mathematics.'
    : isMeng
      ? BIO_MENG_RAW
      : BIO_BENG_RAW;
  return course({
    slug: s.slug,
    universityId: 'qmul',
    name: s.name,
    category: 'engineering',
    sub: isFoundation ? 'general-engineering' : 'biomedical',
    degree: s.award,
    awardLabel: `${s.award} (Hons)`,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw,
    offers: [
      offer({
        label: 'Typical A-Level offer',
        gradeProfile: isFoundation ? 'BBB' : isMeng ? 'AAA' : 'AAB',
        required: ['Mathematics'],
        constraints: isFoundation ? [] : [BIO_SCIENCE_RULE],
        rawText: raw,
      }),
    ],
    maths: 'required',
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is never raised on this course page or in its entry-requirements panel, both read in full. Queen Mary publishes no preference either way, and Further Mathematics is not among the accepted second subjects.',
    test: 'unknown',
    testNote: NO_TEST,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW,
    contextual: {
      availability: isFoundation ? 'check-website' : 'yes',
      details: isFoundation
        ? 'Queen Mary links “Full entry requirements (including contextual admissions)” from this option but publishes no contextual grade profile for the foundation route specifically. The tiers it does publish belong to the BEng and MEng, and neither has been applied here.'
        : isMeng
          ? 'Under Queen Mary’s own “Contextualised admissions” heading, TWO tiers: “Our standard contextual offer: ABB including AB in Maths and Physics or Chemistry or Biology at A-Level.” and “Our enhanced contextual offer: BBB including in Maths and Physics, or Chemistry or Biology at A-Level.” The enhanced string is printed with a missing word after “including”; it is transcribed exactly as published rather than repaired.'
          : 'Under Queen Mary’s own “Contextualised admissions” heading, TWO tiers: “Our standard contextual offer: BBB including Maths and Physics or Chemistry or Biology at A-Level.” and “Our enhanced contextual offer: BBC including BB in Maths and Physics, or Chemistry or Biology at A-Level.”',
    },
    gcse: GCSE,
    studyOptions: [],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'Queen Mary’s own 2027-entry course finder page for Biomedical Engineering was read in a rendered browser. It enumerates all seven separately coded options with their own codes, awards, durations and start dates, and this record’s code was read from that list and from the option’s own key-information block.',
    officialUrl: Q('biomedical-engineering'),
    sourceUrl: Q('biomedical-engineering'),
    sourceTitle: 'Biomedical Engineering - Queen Mary University of London (2027 entry)',
    lastVerified: READ_ON,
    notes: [s.extra, APPLY_WARNING, EPQ, EXCLUSIONS, INSTITUTION].filter(Boolean).join(' '),
  });
});

/* ================================================================== */
/* Materials Science and Engineering — 7 separately coded applications  */
/* ================================================================== */

const MAT_BENG_RAW =
  'Grades ABB at A-Level. This must include at least two A-Level subjects of Mathematics, Physics or Chemistry.';
const MAT_MENG_RAW =
  'Grades AAA at A-Level. This must include at least two A-Level subjects of Mathematics, Physics or Chemistry.';

const MAT_TWO_OF_THREE = atLeastAt(
  ['Mathematics', 'Physics', 'Chemistry'],
  'E',
  2,
  'Queen Mary requires “at least two A-Level subjects of Mathematics, Physics or Chemistry”. NO SINGLE SUBJECT IS COMPULSORY — a student with Physics and Chemistry and no Mathematics meets this rule, which is unusual for an engineering degree and is exactly why the requirement is stored as a count over a set rather than as a compulsory Mathematics plus a one-of. The grade floor is a pass, because Queen Mary pins no grade to either subject in the standard offer.',
);

const MAT: EngSeed[] = [
  { slug: 'qmul-materials-science-and-engineering-beng', name: 'Materials Science and Engineering', award: 'BEng', years: 3, code: 'J511', variant: 'plain', extra: 'THE SCAFFOLD SAID J500 AND WAS WRONG. Queen Mary publishes J511. J500 belongs to Manchester and to Sheffield for their own Materials degrees — another instance of a scaffold code that exists elsewhere for the same subject, and the second of three wrong Queen Mary codes.' },
  { slug: 'qmul-materials-science-foundation-beng', name: 'Materials Science with Foundation', award: 'BEng', years: 4, code: 'JJX3', variant: 'foundation', extra: 'NOTE THE TITLE: “Materials Science with Foundation”, without “and Engineering”. Queen Mary drops two words from the family name on the foundation route, and the title is recorded as published rather than harmonised with its siblings.' },
  { slug: 'qmul-materials-science-and-engineering-industrial-experience-beng', name: 'Materials Science and Engineering with Industrial Experience', award: 'BEng', years: 4, code: 'JM11', variant: 'placement' },
  { slug: 'qmul-materials-science-and-engineering-year-abroad-beng', name: 'Materials Science and Engineering with Year Abroad', award: 'BEng', years: 4, code: 'J51Y', variant: 'abroad' },
  { slug: 'qmul-materials-science-and-engineering-meng', name: 'Materials Science and Engineering', award: 'MEng', years: 4, code: 'J512', variant: 'plain' },
  { slug: 'qmul-materials-science-and-engineering-industrial-experience-meng', name: 'Materials Science and Engineering with Industrial Experience', award: 'MEng', years: 5, code: 'JM10', variant: 'placement' },
  { slug: 'qmul-materials-science-and-engineering-year-abroad-meng', name: 'Materials Science and Engineering with Year Abroad', award: 'MEng', years: 5, code: 'J52Y', variant: 'abroad' },
];

const materialsCourses: Course[] = MAT.map((s) => {
  const isFoundation = s.variant === 'foundation';
  const isMeng = s.award === 'MEng';
  const raw = isFoundation
    ? 'Grades BBB at A-Level. This must include A-Level Mathematics.'
    : isMeng
      ? MAT_MENG_RAW
      : MAT_BENG_RAW;
  return course({
    slug: s.slug,
    universityId: 'qmul',
    name: s.name,
    category: 'engineering',
    sub: 'materials',
    degree: s.award,
    awardLabel: `${s.award} (Hons)`,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw,
    offers: [
      offer({
        label: 'Typical A-Level offer',
        gradeProfile: isFoundation ? 'BBB' : isMeng ? 'AAA' : 'ABB',
        required: isFoundation ? ['Mathematics'] : [],
        constraints: isFoundation ? [] : [MAT_TWO_OF_THREE],
        rawText: raw,
      }),
    ],
    maths: isFoundation ? 'required' : 'recommended',
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is never raised on this course page or in its entry-requirements panel, both read in full. Queen Mary publishes no preference either way, and Further Mathematics is not one of the three named subjects.',
    test: 'unknown',
    testNote: NO_TEST,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW,
    contextual: {
      availability: isFoundation ? 'check-website' : 'yes',
      details: isFoundation
        ? 'Queen Mary links “Full entry requirements (including contextual admissions)” from this option but publishes no contextual grade profile for the foundation route specifically, and neither of the tiers it publishes for the BEng and MEng has been applied here.'
        : isMeng
          ? 'Under Queen Mary’s own “Contextualised admissions” heading, TWO tiers: “Our standard contextual offer: ABB including AB in Maths and Physics or Chemistry at A-Level.” and “Our enhanced contextual offer: BBB including Maths and Physics or Chemistry at A-Level.” NOTE THAT THE CONTEXTUAL ROUTE IS NARROWER THAN THE STANDARD ONE: the standard offer accepts any two of Mathematics, Physics and Chemistry, while both contextual tiers name Mathematics specifically. That is Queen Mary’s wording and it has not been smoothed.'
          : 'Under Queen Mary’s own “Contextualised admissions” heading, TWO tiers: “Our standard contextual offer: BBC including BB in two subjects from Maths, Physics and Chemistry at A-Level.” and “Our enhanced contextual offer: BCC including BC in two subjects from Maths, Physics and Chemistry at A-Level.”',
    },
    gcse: GCSE,
    studyOptions: [],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'Queen Mary’s own 2027-entry course finder page for Materials Science and Engineering was read in a rendered browser. It enumerates all seven separately coded options with their own codes, awards, durations and start dates, and this record’s code was read from that list and from the option’s own key-information block.',
    officialUrl: Q('materials-science-and-engineering'),
    sourceUrl: Q('materials-science-and-engineering'),
    sourceTitle: 'Materials Science and Engineering - Queen Mary University of London (2027 entry)',
    lastVerified: READ_ON,
    notes: [s.extra, APPLY_WARNING, EPQ, EXCLUSIONS, INSTITUTION].filter(Boolean).join(' '),
  });
});

/* ================================================================== */
/* Exports                                                             */
/* ================================================================== */

export const v09QmulCourses: Course[] = [
  ...physicsCourses,
  ...biomedicalCourses,
  ...materialsCourses,
];

/**
 * Titles the catalogue previously held at Queen Mary that are NOT separate
 * applications for 2027 entry. Exported so the assertion suite can prove no
 * record exists for them.
 */
export const QMUL_NOT_APPLICATIONS: readonly string[] = [
  // A stream inside Physics, chosen after year one. No course page, no code.
  'Astrophysics',
  'Theoretical Physics',
  'Physics with Artificial Intelligence',
] as const;
