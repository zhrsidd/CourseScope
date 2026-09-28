/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 5, PART F: THE UNIVERSITY OF LEEDS
 *  2027 entry ONLY. Read from Leeds' own course pages on 2026-09-14.
 * ---------------------------------------------------------------------------
 *  THE MOST IMPORTANT FINDING IS ABOUT WHAT IS *NOT* HERE.
 *
 *  Leeds' live catalogue is mixed across entry cycles. Of the 41 in-scope
 *  pages that were fetched and read, only 28 displayed 2027 entry. Six showed
 *  2026, three showed 2025, one — Theoretical Physics MPhys, BSc (F340) —
 *  served a 2021-entry page at its canonical URL, corroborated by a printed
 *  2021/22 fee, and three contradicted themselves (for example Product Design,
 *  labelled "2026 course information" beside "Start Date: September 2027").
 *  No course page has a year-of-entry selector and ?year=2027 returns 403, so
 *  the 2027 view cannot be forced.
 *
 *  Only the pages that actually displayed 2027 are imported. Everything else
 *  stays a research target. The stale pages are not merely a year out of date:
 *  they carry materially different wording — an exclusion of General Studies
 *  and Critical Thinking, older GCSE phrasing, and an Access to Leeds offer
 *  without the "pass in the Access to Leeds scheme" clause that every 2027 page
 *  carries. Importing them as 2027 would have imported a different policy.
 *
 *  Other findings that shaped this file:
 *
 *  1. YEAR IN INDUSTRY AND YEAR ABROAD ARE SEPARATE UCAS CODES at Leeds —
 *     the "(Industrial)" and "(International)" suffixes — AND ALSO study
 *     options inside the base code. Physics BSc (F300) states that if you take
 *     a placement "you'll be awarded the 'industrial' variant in your degree
 *     title", while Physics (Industrial) BSc (F303) exists as its own
 *     application. Both routes to the same award exist at once, so both are
 *     recorded: separate codes as separate records, the in-course option as a
 *     study option.
 *
 *  2. THE BEng → MEng UPLIFT IS FAMILY-SPECIFIC. Mechanical, Automotive,
 *     Medical, Chemical and Materials price both awards identically; but
 *     Architectural, Electronics and Computer, Mechatronics and Civil and
 *     Environmental all jump AAB → AAA, and their subject rules change shape
 *     too (the BEng pins "an A in Mathematics" inside AAB; the MEng just
 *     requires Mathematics inside AAA).
 *
 *  3. CIVIL ENGINEERING PUBLISHES A REAL TEST AND INTERVIEW — a "diagnostic
 *     Maths test" and, on the BTEC D*D*D route, "an interview". Both are
 *     conditional on applying with something other than A-Levels, so for an
 *     A-Level applicant they do not bind. Every other in-scope Leeds course is
 *     silent, recorded as not stated.
 *
 *  4. FOUR INCOMPATIBLE EPQ MECHANISMS. Physics reduces AAA to AAB on an A in
 *     the EPQ; Mechanical and its siblings reduce A*AA to AAA AND require the
 *     EPQ grade A as an extra condition; Civil and Architectural reduce with an
 *     A in Mathematics attached; Product Design reduces with no subject clause
 *     at all. They are recorded per course and never normalised.
 *
 *  NOTE ON UCAS CODES: Leeds serves course pages from courses.leeds.ac.uk/<id>/,
 *  where <id> is SOMETIMES the UCAS code (h203, hk26) and sometimes an unrelated
 *  page number (5200, f411). The UCAS code is taken from Leeds' own course
 *  listing, never from the URL.
 *
 *  5. FURTHER MATHEMATICS IS UNPUBLISHED ON EVERY PHYSICS AND ENGINEERING PAGE
 *     CHECKED. It appears only on Mathematics and Physics BSc (FG31) — which is
 *     also the only Leeds course with a RANGE offer ("AAA - AAB") and the only
 *     one using the string "A*BB".
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-14';

const CYCLE =
  'Published requirements for 2027 entry. This page displayed “Year of entry 2027”. Leeds serves a mixed catalogue in which some course pages still show 2026, 2025 or even 2021 entry at their canonical URLs, so only pages confirmed to be showing 2027 were imported.';

const L = (path: string) => `https://courses.leeds.ac.uk/${path}`;

const NO_TEST_NOTE =
  'No admissions-test statement of any kind appears for the standard A-Level route. The only test wording on Leeds’ pages belongs to its Alternative Entry Scheme for mature applicants (“you may be asked to take tests in English and maths and to write an essay”), which is a different route. Recorded as not stated, never as “no admissions test”.';

const NO_INTERVIEW_NOTE =
  'No interview wording of any kind appears on this page. Recorded as not stated, never as “no interview”.';

const CIVIL_TEST_NOTE =
  'Leeds publishes a conditional test on this course: “Applicants for whom this requirement is to be fulfilled via qualifications other than A-levels (eg BTEC Maths and Additional/Further Maths modules) may be required to take a diagnostic Maths test in addition to their other level 3 maths studies.” It binds applicants who are NOT applying with A-Levels, so it does not apply to the standard A-Level route. Leeds also states, inside its BTEC requirement, “D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test” — so the BTEC route requires both an interview and the test.';

const CIVIL_INTERVIEW_NOTE =
  'Leeds publishes an interview requirement on the BTEC D*D*D route for this course: “plus an interview and diagnostic Maths test”. For the standard A-Level route the page states nothing, so the A-Level position is not stated rather than “no interview”.';

const DEADLINE_NOTE =
  'Leeds prints no deadline: “Apply to this course and check the deadline for applications through the UCAS website.”';

const PRAC_PHYS =
  'Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.';
const PRAC_ENG =
  'Where an A-level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-level at the stated grade.';

const GCSE_PHYS =
  'English Language grade 4 (C) or higher, or an equivalent English language qualification. Leeds will accept Level 2 Functional Skills English instead of GCSE English.';
const GCSE_ENG = 'English Language grade 4 (C) or higher, or an equivalent English language qualification.';

const A2L_DESC =
  'Leeds’ scheme is “Access to Leeds”: “a contextual admissions scheme which accepts applications from individuals who might be from low income households, in the first generation of their immediate family to apply to higher education, or have had their studies disrupted.” It requires a pass in the Access to Leeds scheme itself, and it is a separate access route that is not matched against grades here. Leeds also runs an Alternative Entry Scheme for mature applicants. No separate care-experienced offer is published on this page.';

const accessToLeeds = (offerText: string, heading?: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `${heading ?? 'Access to Leeds'} offer: “${offerText}” ${A2L_DESC}`,
});

const epqNote = (text: string) => `Leeds publishes an EPQ/IPQ route for this course: “${text}” It is an alternative offer, not the standard one, and is not matched here. Leeds’ EPQ mechanics differ by faculty and are never normalised across courses.`;

const PHYS_OPTIONS: StudyOption[] = [
  {
    name: 'Study abroad year',
    description:
      'Leeds states: “This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months.” Chosen after admission — although Leeds ALSO sells an “(International)” variant of the same degree as its own UCAS code, so both routes to the same award exist at once.',
    ucasCode: null,
    chosenWhen: 'After admission.',
    officialUrl: null,
  },
  {
    name: 'Placement year',
    description:
      'Leeds states: “If you decide to undertake a placement year, this will extend your period of study by 12 months and, on successful completion, you’ll be awarded the ‘industrial’ variant in your degree title.” Chosen after admission — although Leeds ALSO sells an “(Industrial)” variant as its own UCAS code.',
    ucasCode: null,
    chosenWhen: 'After admission.',
    officialUrl: null,
  },
];

/* ------------------------------------------------------------------ */
/* Physics — School of Physics and Astronomy                           */
/* ------------------------------------------------------------------ */

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys';
  awardLabel?: string;
  sub: 'physics' | 'astrophysics' | 'theoretical-physics' | 'physics-with-computing' | 'physics-with-mathematics';
  years: number;
  code: string;
  path: string;
  options?: StudyOption[];
  extra?: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'leeds-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, code: 'F300', path: '3580/physics-bsc', options: PHYS_OPTIONS, extra: 'Leeds sells Physics (Industrial) (F303) and Physics (International) (F304) as separate UCAS codes for the same outcomes this course already offers as in-application options. Both routes exist simultaneously.' },
  { slug: 'leeds-physics-international-mphys-bsc', name: 'Physics (International)', degree: 'MPhys', awardLabel: 'MPhys, BSc', sub: 'physics', years: 4, code: 'F306', path: 'g380/physics-international-mphys-bsc', extra: 'Leeds prints the same four-year duration as the non-international MPhys, despite the study-abroad year.' },
  { slug: 'leeds-physics-with-artificial-intelligence-bsc', name: 'Physics with Artificial Intelligence', degree: 'BSc', sub: 'physics-with-computing', years: 3, code: 'F310', path: 'k050/physics-with-artificial-intelligence-bsc', options: PHYS_OPTIONS, extra: 'Leeds runs a six-code Physics with Artificial Intelligence family that appears in no standard course list. This page prints its start date as October 2027, not September, unlike every other Physics page checked, and prints the offer as a bare “AAA” without the “(specific subject requirements)” parenthetical its siblings carry.' },
  { slug: 'leeds-physics-with-astrophysics-bsc', name: 'Physics with Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, code: 'F3F5', path: '3600/physics-with-astrophysics-bsc', options: PHYS_OPTIONS, extra: 'Leeds publishes no standalone Astrophysics degree — only Physics with Astrophysics.' },
  { slug: 'leeds-physics-with-astrophysics-mphys-bsc', name: 'Physics with Astrophysics', degree: 'MPhys', awardLabel: 'MPhys, BSc', sub: 'astrophysics', years: 4, code: 'F3FM', path: 'f334/physics-with-astrophysics-mphys-bsc', options: PHYS_OPTIONS },
  { slug: 'leeds-theoretical-physics-bsc', name: 'Theoretical Physics', degree: 'BSc', sub: 'theoretical-physics', years: 3, code: 'F3K0', path: '3686/theoretical-physics-bsc', options: PHYS_OPTIONS, extra: 'The Theoretical Physics MPhys sibling (F340) is NOT imported: its canonical page serves a 2021-entry document, corroborated by a printed 2021/22 fee.' },
];

const leedsPhysics: Course[] = PHYS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'leeds',
    name: s.name,
    awardLabel: s.awardLabel ?? null,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A-level: AAA including Physics and Mathematics.',
    offers: [
      offer({
        label: 'Typical A-level offer',
        gradeProfile: 'AAA',
        required: ['Physics', 'Mathematics'],
        rawText: 'A-level: AAA including Physics and Mathematics.',
        notes:
          'Leeds’ typical A-level offer is “AAA including Physics and Mathematics.” Both subjects are required at the offer grade; no separate lower subject minimum is published, and no “one of X/Y/Z” alternation appears.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not mentioned in any form on this page. It is unpublished on every Leeds Physics and Engineering page checked — the sole exception is Mathematics and Physics BSc (FG31).',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: accessToLeeds(
      'Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.',
    ),
    gcse: GCSE_PHYS,
    studyOptions: s.options ?? [],
    verification: 'verified',
    officialUrl: L(s.path),
    sourceUrl: L(s.path),
    sourceTitle: `${s.name} ${s.awardLabel ?? s.degree}`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      `Science practical: “${PRAC_PHYS}”`,
      epqNote(
        'where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.',
      ),
      'Leeds states: “We do not accept T Levels as entry onto this course.”',
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

/* ------------------------------------------------------------------ */
/* Mathematics and Physics — the one course with a range and an        */
/* explicit Further Mathematics rule                                   */
/* ------------------------------------------------------------------ */

const leedsMathsPhysics: Course = course({
  slug: 'leeds-mathematics-and-physics-bsc',
  universityId: 'leeds',
  name: 'Mathematics and Physics',
  category: 'physics',
  sub: 'physics-with-mathematics',
  degree: 'BSc',
  years: 3,
  code: 'FG31',
  year: '2027',
  cycleNote: CYCLE,
  raw: 'including Physics and a minimum of grade A in Mathematics',
  offers: [
    offer({
      label: 'Typical A-level offer',
      gradeProfile: 'AAA - AAB',
      required: ['Physics', ['Mathematics', 'A']],
      rawText: 'including Physics and a minimum of grade A in Mathematics',
      notes:
        'Leeds publishes this offer as a RANGE — “AAA - AAB (specific subject requirements)” — the only range in its Physics and Engineering catalogue. It is stored exactly as printed and must not be flattened to AAA or to AAB, so the overall-grade check returns “review required” while the subject conditions are still evaluated. Leeds unlocks the lower end only through Further Mathematics: “or AAB/A*BB including Physics and a minimum of grade A in Mathematics plus Further Mathematics or AAB/A*BB including Physics and a minimum of grade A in Mathematics, plus an A in AS Further Mathematics.” Note the grade string A*BB, which appears nowhere else in this catalogue.',
    }),
  ],
  fm: 'conditional',
  fmNote:
    'This is the ONLY Leeds course in scope where Further Mathematics is mentioned at all, and it is load-bearing: a full Further Mathematics A-Level, or an A in AS Further Mathematics, is what unlocks the reduced end of the AAA–AAB range. Without it the higher end applies.',
  test: 'unknown',
  testNote: NO_TEST_NOTE,
  interview: 'not-stated',
  interviewNote: NO_INTERVIEW_NOTE,
  contextual: accessToLeeds(
    'Typical Access to Leeds A Level offer: ABB including Physics and a minimum of grade A in Mathematics and a pass in the Access to Leeds scheme.',
  ),
  gcse: GCSE_ENG,
  studyOptions: [
    {
      name: 'One-year optional work placement or study abroad',
      description: 'Leeds presents this as a single either/or option: “One-year optional work placement or study abroad.”',
      ucasCode: null,
      chosenWhen: 'During the degree.',
      officialUrl: null,
    },
  ],
  verification: 'verified',
  officialUrl: L('k279/mathematics-and-physics-bsc'),
  sourceUrl: L('k279/mathematics-and-physics-bsc'),
  sourceTitle: 'Mathematics and Physics BSc',
  lastVerified: VERIFIED_ON,
  notes: [
    'This joint degree with the School of Mathematics is the only in-scope Leeds course with a range offer, the only one naming Further Mathematics, and the only one using the string A*BB.',
    `Science practical: “${PRAC_PHYS}”`,
    epqNote('where an applicant offers an A in the EPQ or IPQ, we may make an offer of AAB at A-level'),
    DEADLINE_NOTE,
  ].join(' '),
});

/* ------------------------------------------------------------------ */
/* Engineering — Faculty of Engineering and Physical Sciences          */
/* ------------------------------------------------------------------ */

type EngRule = 'maths-science' | 'maths-science-bio' | 'maths-only' | 'maths-a' | 'none';

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng' | 'BSc';
  awardLabel?: string;
  sub:
    | 'mechanical'
    | 'aerospace'
    | 'civil'
    | 'chemical'
    | 'electrical'
    | 'computer-engineering'
    | 'materials'
    | 'biomedical'
    | 'general-engineering';
  years: number;
  code: string;
  path: string;
  profile: string;
  rawSubjects: string;
  rule: EngRule;
  access: string;
  accessHeading?: string;
  epq: string;
  civilTest?: boolean;
  gcse?: string;
  extra?: string;
}

const ENG_SEEDS: EngSeed[] = [
  { slug: 'leeds-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H305', path: '5200/mechanical-engineering-beng', profile: 'A*AA', rawSubjects: 'A-level: A*AA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds Scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and either Physics or Chemistry, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.', extra: 'The A* is not pinned to a named subject on this page. Note also that Leeds does not raise the offer for the integrated masters in this family — the MEng is also A*AA.' },
  { slug: 'leeds-mechanical-engineering-meng-beng', name: 'Mechanical Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'mechanical', years: 4, code: 'H300', path: 'f411/mechanical-engineering-meng-beng', profile: 'A*AA', rawSubjects: 'A*AA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and either Physics or Chemistry, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.', extra: 'Identical to the BEng — Leeds asks no higher grade for the integrated masters in Mechanical Engineering.' },
  { slug: 'leeds-aeronautical-and-aerospace-engineering-meng-beng', name: 'Aeronautical and Aerospace Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'aerospace', years: 4, code: 'H410', path: 'f414/aeronautical-and-aerospace-engineering-meng-beng', profile: 'A*AA', rawSubjects: 'A-level: A*AA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and either Physics or Chemistry, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.', extra: 'Leeds publishes no degree titled simply “Aerospace Engineering”; this is the real title.' },
  { slug: 'leeds-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'H203', path: 'i444/civil-engineering-beng', profile: 'AAB', rawSubjects: 'AAB with an A in Mathematics.', rule: 'maths-a', access: 'Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.', accessHeading: 'Alternative entry', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer including an A in Mathematics.', civilTest: true, extra: 'Leeds files this course’s reduced offer under the heading “Alternative entry” rather than “Access to Leeds”, and its BBB is the lowest contextual offer found anywhere in this research — five grade-steps below Mechanical’s A*AA standard offer.' },
  { slug: 'leeds-chemical-engineering-beng', name: 'Chemical Engineering', degree: 'BEng', sub: 'chemical', years: 3, code: 'H805', path: '4810/chemical-engineering-beng', profile: 'AAA', rawSubjects: 'A-level: AAA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: ABB including an A in Mathematics and B in either Physics or Chemistry and a pass in the Access to Leeds scheme', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'Chemical Engineering does NOT compel Chemistry — Physics is an equally acceptable second subject. This course’s contextual offer pins per-subject grades (A in Mathematics, B in the science) that the standard offer does not impose.' },
  { slug: 'leeds-chemical-engineering-meng-beng', name: 'Chemical Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'chemical', years: 4, code: 'H800', path: 'f463/chemical-engineering-meng-beng', profile: 'AAA', rawSubjects: 'AAA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: ABB including an A in Mathematics and B in either Physics or Chemistry and a pass in the Access to Leeds scheme', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'Identical to the BEng — no uplift for the integrated masters in this family.' },
  { slug: 'leeds-chemical-engineering-industrial-beng', name: 'Chemical Engineering (Industrial)', degree: 'BEng', sub: 'chemical', years: 4, code: 'H807', path: 'g832/chemical-engineering-industrial-beng', profile: 'AAA', rawSubjects: 'Mathematics and either Physics or Chemistry', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: ABB including an A in Mathematics and B in either Physics or Chemistry and a pass in the Access to Leeds scheme', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'At Leeds the industrial year is its own UCAS code, so this is a separate application from Chemical Engineering BEng — even though the base code also offers a placement year as an in-application option. The fully verbatim subject sentence could not be retrieved from this page; the page states “Mathematics and either Physics or Chemistry”.' },
  { slug: 'leeds-electronic-and-electrical-engineering-beng', name: 'Electronic and Electrical Engineering', degree: 'BEng', sub: 'electrical', years: 3, code: 'H605', path: '5000/electronic-and-electrical-engineering-beng', profile: 'AAB', rawSubjects: 'A-level: AAB including Mathematics.', rule: 'maths-only', access: 'Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'Mathematics is the only named subject — Leeds requires no science at all on this course.' },
  { slug: 'leeds-architectural-engineering-beng', name: 'Architectural Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'HK26', path: 'a248/architectural-engineering-beng', profile: 'AAB', rawSubjects: 'A-level: AAB with an A in Mathematics.', rule: 'maths-a', access: 'Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer including an A in Mathematics.' },
  { slug: 'leeds-architectural-engineering-meng-beng', name: 'Architectural Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'civil', years: 4, code: 'HK21', path: 'f416/architectural-engineering-meng-beng', profile: 'AAA', rawSubjects: 'A-level: AAA including Mathematics.', rule: 'maths-only', access: 'Typical Access to Leeds A Level offer: ABB including Mathematics and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'Both the grades AND the shape of the subject rule differ from the BEng: the BEng pins “an A in Mathematics” inside AAB, while this MEng simply requires Mathematics inside AAA.' },
  { slug: 'leeds-automotive-engineering-beng', name: 'Automotive Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'H335', path: '4794/automotive-engineering-beng', profile: 'A*AA', rawSubjects: 'A-level: A*AA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus, a pass in the Access to Leeds Scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level plus grade A in EPQ/IPQ/Welsh Bacc ASCC.' },
  { slug: 'leeds-automotive-engineering-meng-beng', name: 'Automotive Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'mechanical', years: 4, code: 'H330', path: 'f413/automotive-engineering-meng-beng', profile: 'A*AA', rawSubjects: 'A-level: A*AA including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds Scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level plus grade A in EPQ/IPQ/Welsh Bacc ASCC.' },
  { slug: 'leeds-medical-engineering-beng', name: 'Medical Engineering', degree: 'BEng', sub: 'biomedical', years: 3, code: 'HHH1', path: 'a239/medical-engineering-beng', profile: 'A*AA', rawSubjects: 'A*AA including Mathematics and one of the sciences, Physics, Chemistry or Biology.', rule: 'maths-science-bio', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and one of the sciences, Physics, Chemistry or Biology, Plus a pass in the Access to Leeds Scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level plus grade A in EPQ/IPQ/Welsh Bacc ASCC.', extra: 'This is the only in-scope Leeds course that accepts Biology as the qualifying science.' },
  { slug: 'leeds-medical-engineering-meng-beng', name: 'Medical Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'biomedical', years: 4, code: 'HHH6', path: 'f447/medical-engineering-meng-beng', profile: 'A*AA', rawSubjects: 'A*AA including Mathematics and one of the sciences, Physics, Chemistry or Biology.', rule: 'maths-science-bio', access: 'Typical Access to Leeds A Level offer: AAB including Mathematics and one of the sciences, Physics, Chemistry or Biology, Plus a pass in the Access to Leeds Scheme.', epq: 'where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level plus grade A in EPQ/IPQ/Welsh Bacc ASCC.' },
  { slug: 'leeds-product-design-bsc', name: 'Product Design', degree: 'BSc', sub: 'general-engineering', years: 3, code: 'H795', path: 'a602/product-design-bsc', profile: 'AAB', rawSubjects: 'An Art and Design related A-level such as Design, Design Technology or Art and Design is desirable but not essential. An interest in art and design is essential.', rule: 'none', access: 'Typical Access to Leeds A Level offer: ABB and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make an offer of ABB at A-level.', gcse: 'English Language grade 4 (C) or higher; Mathematics grade 6 (B); Combined Science 6-6 (B-B).', extra: 'CYCLE AMBIGUITY RESOLVED IN BATCH 7 — AND IT WAS NEVER A CONFLICT. Batch 6 read this page as carrying four contradictory official labels at once and marked the record partially verified for that reason. A RENDERED BROWSER read of the same page shows what the markup actually is: the “2026 course information” string is not a banner on this page, it is the text of an arrow LINK immediately below the heading, pointing away to courses.leeds.ac.uk/202627/a602/product-design-bsc — the exact structural analogue of Sheffield’s “View 2026-27 entry” switcher. Batch 6 read a navigation link as an assertion, because it was reading flattened text rather than the DOM. Today the page’s own cycle heading reads “Year of entry 2027”, with “Start date September 2027”, “Tuition fees for UK undergraduate students starting in 2027/28 are £10,050”, and a footer link to the University of Leeds Admissions Policy 2027 — four labels, all 2027, none in conflict. Leeds’ own course search settles the identity: its “Year of entry” radio group defaults to “Academic year 2027” (value 202728, checked), and under that 2027 scope it returns “Product Design BSc / Duration 3 Years (Full time) / Typical A-level offer AAB / UCAS code H795”, linking to this exact bare URL. The bare /a602/ URL IS Leeds’ 2027 record; the 2026 record lives at the year-prefixed path. No cache-buster was needed, so Batch 6’s HTTP 403 on query strings is bypassed rather than worked around. ONE GENUINE FIRST-PARTY INCONSISTENCY REMAINS, FLAGGED AND NOT RECONCILED: the course-structure section links to the module catalogue as “BA Product Design” — BA, where this record and the page title both say BSc — and that link resolves into the 202627 catalogue from a 2027 entry page. That is Leeds’ own inconsistency about a module list, not about admissions, and it is left exactly as published. Product Design is also the only in-scope Leeds engineering-faculty course awarding a BSc, the only one with no required A-level subject, the one with the heaviest GCSE bar, and the only page that explicitly rules a portfolio OUT of the decision — wording re-confirmed still present in Batch 6, verbatim: “Whilst a portfolio is not required as part of the decision/offer making process, successful offer holders will be invited to attend an optional in-person offer holder event, which will include an interactive portfolio review session.”' },
  { slug: 'leeds-mechatronics-and-robotics-engineering-beng', name: 'Mechatronics and Robotics Engineering', degree: 'BEng', sub: 'mechanical', years: 3, code: 'HH41', path: 'j914/mechatronics-and-robotics-engineering-beng', profile: 'AAB', rawSubjects: 'AAB including Mathematics.', rule: 'maths-only', access: 'Typical Access to Leeds A Level offer: BBB including Mathematics plus a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'Leeds’ printed title includes the word “Engineering”; there is no degree titled simply “Mechatronics and Robotics”.' },
  { slug: 'leeds-mechatronics-and-robotics-engineering-meng-beng', name: 'Mechatronics and Robotics Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'mechanical', years: 4, code: 'HH36', path: 'j915/mechatronics-and-robotics-engineering-meng-beng', profile: 'AAA', rawSubjects: 'A-level: AAA including Mathematics.', rule: 'maths-only', access: 'Typical Access to Leeds A Level offer: ABB including Mathematics plus a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'A full grade above its BEng sibling (AAA versus AAB), and its contextual offer moves too (ABB versus BBB).' },
  { slug: 'leeds-materials-science-and-engineering-beng', name: 'Materials Science and Engineering', degree: 'BEng', sub: 'materials', years: 3, code: 'J510', path: 'i984/materials-science-and-engineering-beng', profile: 'AAB', rawSubjects: 'A-level: AAB including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: ABC including an A in Mathematics and a B in Physics or Chemistry and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'The ABC contextual offer is the only one of its shape found in this research and must not be normalised to ABB.' },
  { slug: 'leeds-materials-science-and-engineering-meng-beng', name: 'Materials Science and Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'materials', years: 4, code: 'J511', path: 'i981/materials-science-and-engineering-meng-beng', profile: 'AAB', rawSubjects: 'A-level: AAB including Mathematics and either Physics or Chemistry.', rule: 'maths-science', access: 'Typical Access to Leeds A Level offer: ABC including an A in Mathematics and a B in Physics or Chemistry', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', extra: 'Same offer as the BEng. Its Access to Leeds sentence, as printed, omits the trailing “and a pass in the Access to Leeds scheme” clause the BEng carries — recorded as printed rather than harmonised.' },
  { slug: 'leeds-electronics-and-computer-engineering-beng', name: 'Electronics and Computer Engineering', degree: 'BEng', sub: 'computer-engineering', years: 3, code: 'H6B7', path: 'j749/electronics-and-computer-engineering-beng', profile: 'AAB', rawSubjects: 'A-level: AAB including Mathematics.', rule: 'maths-only', access: 'Typical Access to Leeds A Level offer: BBB including Mathematics plus a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.' },
  { slug: 'leeds-civil-and-environmental-engineering-beng', name: 'Civil and Environmental Engineering', degree: 'BEng', sub: 'civil', years: 3, code: 'H296', path: '4836/civil-and-environmental-engineering-beng', profile: 'AAB', rawSubjects: 'AAB with an A in Mathematics', rule: 'maths-a', access: 'Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer including an A in Mathematics.', civilTest: true },
  { slug: 'leeds-civil-and-environmental-engineering-meng-beng', name: 'Civil and Environmental Engineering', degree: 'MEng', awardLabel: 'MEng, BEng', sub: 'civil', years: 4, code: 'H291', path: 'f443/civil-and-environmental-engineering-meng-beng', profile: 'AAA', rawSubjects: 'A-level: AAA including Mathematics.', rule: 'maths-only', access: 'Typical Access to Leeds A Level offer: ABB including Mathematics and a pass in the Access to Leeds scheme.', epq: 'where an applicant offers an A in the EPQ or IPQ we may make a reduced offer.', civilTest: true, extra: 'Both the grades and the subject-rule shape differ from the BEng: the BEng pins “an A in Mathematics” inside AAB; this MEng requires Mathematics inside AAA.' },
];

function engOffer(s: EngSeed) {
  const base = { label: 'Typical A-level offer', gradeProfile: s.profile, rawText: s.rawSubjects };
  switch (s.rule) {
    case 'maths-science':
      return offer({
        ...base,
        required: ['Mathematics'],
        constraints: [oneOf(['Physics', 'Chemistry'], null, 'Either Physics or Chemistry.')],
        notes: `Leeds’ typical A-level offer: “${s.profile} including Mathematics and either Physics or Chemistry.” Mathematics is required outright plus one of the two sciences; no subject-specific minimum grade is published and the A*, where there is one, is not pinned to a named subject.`,
      });
    case 'maths-science-bio':
      return offer({
        ...base,
        required: ['Mathematics'],
        constraints: [
          oneOf(['Physics', 'Chemistry', 'Biology'], null, 'One of Physics, Chemistry or Biology.'),
        ],
        notes: `Leeds’ typical A-level offer: “${s.profile} including Mathematics and one of the sciences, Physics, Chemistry or Biology.” This is the only in-scope Leeds course that accepts Biology as the qualifying science.`,
      });
    case 'maths-a':
      return offer({
        ...base,
        required: [['Mathematics', 'A']],
        notes: `Leeds’ typical A-level offer: “${s.profile} with an A in Mathematics.” Mathematics carries a subject-specific minimum of grade A, above what the overall profile alone implies, and no other subject is named.`,
      });
    case 'maths-only':
      return offer({
        ...base,
        required: ['Mathematics'],
        notes: `Leeds’ typical A-level offer: “${s.profile} including Mathematics.” Mathematics is the only named subject — no science is required — and no subject-specific minimum grade is attached to it.`,
      });
    case 'none':
    default:
      return offer({
        ...base,
        recommended: ['Design', 'Design and Technology', 'Art and Design'],
        notes: `Leeds’ typical A-level offer is “${s.profile}” with NO required A-level subject. Leeds states: “An Art and Design related A-level such as Design, Design Technology or Art and Design is desirable but not essential. An interest in art and design is essential.” The page also explicitly rules a portfolio out of the decision.`,
      });
  }
}

const leedsEngineering: Course[] = ENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'leeds',
    name: s.name,
    awardLabel: s.awardLabel ?? null,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: s.rawSubjects,
    offers: [engOffer(s)],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not mentioned in any form on this page. It is unpublished on every Leeds Physics and Engineering page checked.',
    test: s.civilTest ? 'university-specific' : 'unknown',
    testRequirement: s.civilTest ? 'conditional' : 'unknown',
    testName: s.civilTest ? 'Diagnostic Maths test' : null,
    testNote: s.civilTest ? CIVIL_TEST_NOTE : NO_TEST_NOTE,
    interview: s.civilTest ? 'sometimes' : 'not-stated',
    interviewNote: s.civilTest ? CIVIL_INTERVIEW_NOTE : NO_INTERVIEW_NOTE,
    contextual: accessToLeeds(s.access, s.accessHeading),
    gcse: s.gcse ?? GCSE_ENG,
    studyOptions: [],
    verification: 'verified',
    officialUrl: L(s.path),
    sourceUrl: L(s.path),
    sourceTitle: `${s.name} ${s.awardLabel ?? s.degree}`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      `Science practical: “${PRAC_ENG}”`,
      epqNote(s.epq),
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

export const batch5LeedsCourses: Course[] = [
  ...leedsPhysics,
  leedsMathsPhysics,
  ...leedsEngineering,
];

/**
 * Leeds pages that were read but showed an entry year other than 2027, and are
 * therefore NOT imported. Kept here so the omission is deliberate and visible.
 */
export const LEEDS_NON_2027_PAGES = [
  'Physics MPhys, BSc (F302) — page showed 2026',
  'Physics (Industrial) BSc (F303) — page showed 2026',
  'Physics (Industrial) MPhys, BSc (F305) — page showed 2026',
  'Physics with Astrophysics (International) MPhys, BSc (F3F1) — page showed 2026',
  'Physics with Artificial Intelligence (International) BSc (F312) — page showed 2026',
  'Civil and Structural Engineering MEng, BEng (H200) — page showed 2026',
  'Physics with Astrophysics (Industrial) BSc (F3F7) — page showed 2025',
  'Physics with Astrophysics (Industrial) MPhys, BSc (F3F2) — page showed 2025',
  'Theoretical Physics (International) BSc (F3K3) — page showed 2025',
  'Theoretical Physics MPhys, BSc (F340) — page served a 2021-entry document',
  'Electronics and Computer Engineering MEng, BEng (H6B8) — page contradicted itself on the year',
  'Physics with Artificial Intelligence (Industrial) BSc (F311) — page contradicted itself on the year',
] as const;
