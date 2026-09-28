/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 6, PART B: LOUGHBOROUGH UNIVERSITY
 *  2027 entry. Read from Loughborough's own course pages on 2026-09-16.
 *  28 courses, every one of them read from a page whose own panel showed
 *  “Start date September 2027” and “Fees for 2027-28”.
 * ---------------------------------------------------------------------------
 *  A CACHING TRAP THAT SILENTLY SERVES THE WRONG ENTRY YEAR.
 *
 *  Fetching a Loughborough course page with NO query string returns a stale
 *  cached render: “October 2026” and “Fees for 2026-27”. Re-fetching the
 *  IDENTICAL url with a cache-busting query string (`?v=2`) returns
 *  “September 2027” and “Fees for 2027-28”. Anyone reading the bare URL would
 *  record 2026 figures and believe they were current.
 *
 *  Every figure in this file was read from a cache-busted URL, and the entry
 *  year was re-confirmed on each page from that page's own start-date line and
 *  fee heading. The `sourceUrl` on each record keeps the query string that was
 *  actually used, so the provenance points at what was really read.
 *
 *  ---------------------------------------------------------------------------
 *  HOW PLACEMENT IS MODELLED, AND WHY
 *  ---------------------------------------------------------------------------
 *
 *  Every one of the 28 courses publishes TWO UCAS codes in one key-facts box,
 *  under one course title — one with a placement year, one without. Because a
 *  non-placement code exists on every course, placement is never compulsory;
 *  and because the two versions carry different codes, the applicant does pick
 *  between them in UCAS rather than choosing inside one application.
 *
 *  But the two codes are NOT two courses. They share one page, one title, one
 *  entry-requirements panel and ONE offer. Loughborough publishes no different
 *  A-level offer for the placement code on any of the 28. Modelling the
 *  placement code as its own course record would either duplicate the identical
 *  offer 28 times or invent a distinction Loughborough does not make.
 *
 *  So each course is ONE record: the three- or four-year code is the course
 *  code, the placement code sits in `alternativeCourseCodes` — which exists for
 *  exactly this, “course options that share one admissions process” — and
 *  `durationYearsMax` carries the longer duration. Two things Loughborough does
 *  NOT publish are recorded as unpublished rather than guessed: whether the
 *  UCAS choice is binding, and whether a student can switch routes mid-degree.
 *  And the placement itself is not guaranteed — several pages state it is
 *  “ultimately the student's responsibility to source and secure”.
 *
 *  Year abroad, the UNITECH scheme, the Engineering Physics named streams and
 *  the Chemical Engineering MEng specialisms ARE options inside a single code,
 *  and are recorded as study options.
 *
 *  ---------------------------------------------------------------------------
 *  FIVE THINGS THAT WOULD BE GOT WRONG BY ASSUMPTION
 *  ---------------------------------------------------------------------------
 *
 *  1. LOUGHBOROUGH PUBLISHES NO EPQ OFFER REDUCTION — the opposite of the
 *     common UK pattern, and of every other university in this catalogue that
 *     publishes one. Verbatim, university-wide: “While we do not generally
 *     include them as part of our offer conditions, they may be used to further
 *     consider an application upon receipt of final examination results”.
 *
 *  2. THREE MEngs CARRY A PLACED-A* RULE. Mechanical, Aeronautical and
 *     Automotive MEng are “A*AA … with A* in Maths or Physics”. Storing A*AA
 *     alone would drop a binding condition, so the placement of the A* is
 *     stored as a cross-subject constraint. The other six MEngs are AAA with no
 *     A* at all.
 *
 *  3. CIVIL ENGINEERING DOES NOT REQUIRE PHYSICS — ABB including Maths (BEng),
 *     AAB including Maths (MEng). Every other engineering course here names a
 *     second subject. Civil MEng at AAB also sits a full band below the A*AA
 *     MEngs.
 *
 *  4. MATERIALS SCIENCE AND ENGINEERING NAMES NO INDIVIDUALLY MANDATORY
 *     SUBJECT — “two from Mathematics, Further Mathematics, Physics, Chemistry,
 *     Biology and Design Technology”. Mathematics itself is optional. An
 *     applicant with Chemistry and Biology and no Maths satisfies the published
 *     rule. Materials is also the ONLY in-scope course stating a GCSE Maths
 *     requirement on its own page.
 *
 *  5. UCAS CODES ARE NOT SEQUENTIAL, NOT ORDERED BY DURATION, AND NOT ALWAYS
 *     NUMERIC. Physics with Theoretical Physics BSc pairs F342 (placement,
 *     longer) with F346 (3-year) — the lower number is the longer course.
 *     Mathematics and Physics BSc does the same with F340/F341. Product Design
 *     Engineering uses HH1R, HHD7 and HHC7. Aeronautical BEng's three-year code
 *     is H410, not H400.
 *
 *  ---------------------------------------------------------------------------
 *  A NOTE ON THE “TWO FROM SIX” CONSTRAINT (Materials Science and Engineering)
 *  ---------------------------------------------------------------------------
 *  Loughborough requires two subjects from a six-item list and states NO
 *  minimum grade for them. The engine's count constraint is expressed as
 *  “at least N of these at grade G or better”, so grade E — the lowest passing
 *  A-Level grade — is used to mean “taken and passed”, which is the weakest
 *  reading and cannot invent a requirement Loughborough did not publish. The
 *  description the reader sees carries Loughborough's own wording and no grade.
 *
 *  ---------------------------------------------------------------------------
 *  COURSES THE SCAFFOLD AND THE BRIEF EXPECTED THAT DO NOT EXIST
 *  ---------------------------------------------------------------------------
 *  Checked against Loughborough's own A–Z, which states “Browse our A-Z course
 *  listing for 2027 entry below”:
 *
 *      Physics with Astrophysics  — NO SUCH TITLE. The “Physics with…” pair is
 *                                   Computing and Theoretical Physics.
 *      Manufacturing Engineering  — NO SUCH DEGREE. The word survives only in
 *                                   the Wolfson School's name and in BTEC
 *                                   preference lists.
 *      Systems Engineering        — NO SUCH DEGREE. It exists only as a named
 *                                   stream inside Engineering Physics.
 *      “Electronic and Electrical
 *       Engineering”              — WRONG WORD ORDER. Loughborough's title is
 *                                   Electrical and Electronic Engineering.
 *
 *  The scaffold's four guesses — Physics BSc, Mechanical Engineering MEng,
 *  Aeronautical Engineering MEng, Civil Engineering MEng — all do exist and are
 *  verified here.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, OfferConstraint, StudyOption } from '@/types';
import { atLeastAt, course, offer, oneOf, type OfferSeed, type SubjectSpec } from './builders';

const VERIFIED_ON = '2026-09-16';

const L = (slug: string, v = 2) =>
  `https://www.lboro.ac.uk/study/undergraduate/courses/${slug}/?v=${v}`;

const CYCLE =
  'Published requirements for 2027 entry. The page’s own panel showed “Start date September 2027” and “Fees for 2027-28”, read through a cache-busting query string — the same URL without one serves a stale 2026 render. This is not confirmed 2028 data.';

const NO_TEST_NOTE =
  'No admissions test is mentioned on this course page, and none is mentioned on Loughborough’s university-wide entry-requirements page either. Loughborough does not state that no test is required. This is silence, not a published “no admissions test”.';

const INTERVIEW_NOTE =
  'Loughborough prints one sentence on this page, verbatim: “Applicants are usually selected solely on the basis of their UCAS application, but in exceptional cases, an interview may be required.”';

const INTERVIEW_NOTE_SHORT =
  'Loughborough prints a slightly shorter variant on this page, verbatim: “Applicants are usually selected based on their UCAS application, but in exceptional cases, an interview may be required.” Recorded as printed rather than harmonised with the sibling pages’ wording.';

const GCSE_ENGLISH = 'GCSE English Language grade 4/C.';
const GCSE_MATHS_AND_ENGLISH = 'GCSE Maths and GCSE English Language grade 4/C.';

const GCSE_UNIVERSITY_NOTE =
  'The course page itself states English Language only. Loughborough’s university-wide entry-requirements page adds a broader expectation — “We normally expect applicants to have a minimum of grade 4/C in GCSE English Language and, for most courses, GCSE grade 4/C in Mathematics” — but that appears nowhere on this course page, so it is not promoted to a course-level requirement here.';

const NO_EPQ_NOTE =
  'LOUGHBOROUGH PUBLISHES NO EPQ OFFER REDUCTION, which is the opposite of the common UK pattern. Its university-wide wording is: “While we do not generally include them as part of our offer conditions, they may be used to further consider an application upon receipt of final examination results”. No EPQ pathway is stored because there is none to store.';

const PRACTICAL_NOTE =
  'No in-scope course page restates the science practical endorsement. Loughborough’s university-wide policy page says only: “While we do not widely include the passing of the practical skills element in the conditions of an offer, it is our expectation that this element will be successfully completed”. So the endorsement is expected but is not normally an offer condition. That policy page carries no entry-year label.';

const DEADLINE_NOTE =
  'No deadline is published on this course page, and no 2027 deadline was retrievable university-wide: Loughborough’s Key dates page was still showing the 2026 cycle when read. Recorded as NOT RETRIEVED for 2027 rather than as “no deadline”.';

const PLACEMENT_NOTE =
  'PLACEMENT IS A SECOND UCAS CODE ON THE SAME COURSE, NOT A SEPARATE COURSE. Loughborough publishes both codes in one key-facts box, under one title, with one entry-requirements panel and one offer — there is no different A-level offer for the placement code. The placement code is recorded as an alternative code on this record rather than as its own programme. Loughborough does NOT publish whether the UCAS choice is binding, or whether a student can switch onto or off the placement route mid-degree; both are recorded as unpublished rather than guessed. The placement is also not guaranteed by the university: “whilst the department offers great support for students to find a placement, it is ultimately the student’s responsibility to source and secure their industrial placement.” The placement awards are the Diploma in Professional Studies (DPS) and the Diploma in Industrial Studies (DIS).';

/**
 * Loughborough's own contextual heading. The reduced-contextual-offers policy
 * page was still on the 2026 admissions cycle when read, so its eligibility
 * mechanics and its “up to two grades” figure are NOT recorded as 2027 values.
 * The per-course grade strings below ARE 2027 values, because they are printed
 * inside each course's own 2027 requirements panel.
 */
const access = (details: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under Loughborough’s own heading “Access Loughborough Contextual Offer”: ${details} Loughborough publishes three separately named reduced-offer routes — Access Loughborough, Realising Opportunities and LUDUS Gold — but only Access Loughborough is quantified per course. Its scheme mechanics were published on a page still showing the 2026 admissions cycle, so no eligibility criterion or “grades lower” figure from that page is recorded here as a 2027 value; only the grade string printed inside this course’s own 2027 panel is. A separate unquantified route also appears: “If you don’t meet the Access Loughborough eligibility criteria but have circumstances that may have impacted your academic achievements, then we may take this into account when considering your application.” No dedicated care-experienced or refugee heading was found on the page read.`,
});

const YEAR_ABROAD: StudyOption = {
  name: 'Year abroad',
  description:
    'Chosen inside this single UCAS application, unlike the placement year, which is a second code. Loughborough: “This course comes with the option to study abroad for a year”, at the end of which the student gains a Diploma in International Studies (DIntS).',
  ucasCode: null,
  chosenWhen: 'After admission.',
  officialUrl: null,
};

const UNITECH: StudyOption = {
  name: 'UNITECH scheme',
  description:
    'A competitive scheme open to MEng students, taken within this application. Loughborough: “MEng students can also take part competitively in the UNITECH scheme.”',
  ucasCode: null,
  chosenWhen: 'After admission, competitively.',
  officialUrl: null,
};

/* ------------------------------------------------------------------ */
/* Offer shapes                                                        */
/* ------------------------------------------------------------------ */

const PHYSICS_WAIVER =
  'Loughborough attaches a discretionary sentence to this offer: “Applicants without A level Physics may be considered on a case-by-case basis.” That is a case-by-case consideration, not a second published offer with its own grades, so no alternative pathway is created for it — an applicant without Physics is shown as not meeting the PUBLISHED requirement, with this sentence alongside. The waiver appears on every Physics-side course and on none of the Engineering ones.';

const EEE_SUBJECTS = [
  'Computing',
  'Computer Science',
  'Electronics',
  'Further Mathematics',
  'Physics',
];

const MATERIALS_SUBJECTS = [
  'Mathematics',
  'Further Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Design Technology',
];

const DESIGN_SUBJECTS = ['Physics', 'Design and Technology'];

/** “Two from” a six-subject list, with no minimum grade published. */
const twoFromSix = (): OfferConstraint =>
  atLeastAt(
    MATERIALS_SUBJECTS,
    'E',
    2,
    'Two subjects from Mathematics, Further Mathematics, Physics, Chemistry, Biology and Design Technology. Loughborough names no individually mandatory subject here and states no minimum grade for the two.',
  );

/** The placed-A* rule on the three A*AA MEngs. */
const placedAStar = (): OfferConstraint =>
  atLeastAt(
    ['Mathematics', 'Physics'],
    'A*',
    1,
    'The A* must fall on Mathematics or Physics — it is not free. Loughborough’s wording is “with A* in Maths or Physics”.',
  );

const singleOffer = (seed: {
  profile: string;
  required?: SubjectSpec[];
  constraints?: OfferConstraint[];
  raw: string;
  notes?: string;
}): OfferSeed[] => [
  offer({
    gradeProfile: seed.profile,
    required: seed.required ?? [],
    constraints: seed.constraints ?? [],
    rawText: seed.raw,
    notes: seed.notes,
  }),
];

/* ------------------------------------------------------------------ */
/* Physics — ten courses, one departmental template                    */
/* ------------------------------------------------------------------ */

interface PhysicsSeed {
  slug: string;
  name: string;
  sub: 'physics' | 'physics-with-computing' | 'theoretical-physics' | 'physics-with-mathematics';
  degree: 'BSc' | 'MPhys';
  years: number;
  code: string;
  placementCode: string;
  page: string;
  pageVersion?: number;
  title: string;
  access: string;
  gcse?: string;
  options?: StudyOption[];
  extra?: string;
}

const PHYSICS_SEEDS: PhysicsSeed[] = [
  {
    slug: 'loughborough-physics-bsc',
    name: 'Physics BSc',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    placementCode: 'F301',
    page: 'physics-bsc',
    pageVersion: 3,
    title: 'Physics BSc | Undergraduate study | Loughborough University',
    access:
      '“A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction.”',
    extra:
      'THE CACHING TRAP WAS FIRST REPRODUCED ON THIS PAGE: the bare URL served “October 2026” and “Fees for 2026-27”; the same URL with a cache-busting query string served “Start date September 2027” and “Fees for 2027-28”. Every Loughborough figure in this batch was read cache-busted as a result.',
  },
  {
    slug: 'loughborough-physics-mphys',
    name: 'Physics MPhys',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    placementCode: 'F304',
    page: 'physics-mphys',
    pageVersion: 3,
    title: 'Physics MPhys | Undergraduate study | Loughborough University',
    access:
      '“A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case by case-basis.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.”',
    extra:
      'Note the “in any order” construction: the contextual offer, unlike the standard offer, says which subjects carry which grades and then explicitly relaxes the ordering between them.',
  },
  {
    slug: 'loughborough-physics-with-computing-bsc',
    name: 'Physics with Computing BSc',
    sub: 'physics-with-computing',
    degree: 'BSc',
    years: 3,
    code: 'FG33',
    placementCode: 'FG34',
    page: 'physics-with-computing-bsc',
    title: 'Physics with Computing BSc | Undergraduate study | Loughborough University',
    access:
      '“A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
    extra:
      'A CONTENT DEFECT ON LOUGHBOROUGH’S OWN PAGE, recorded because it shows what placement prose is worth as evidence: the placement section of this Physics course advertises “an insight into the role of the chemist”. Loughborough reuses one shared placement block across departments, so placement prose on any Loughborough page is boilerplate and must not be read as course-specific.',
  },
  {
    slug: 'loughborough-physics-with-computing-mphys',
    name: 'Physics with Computing MPhys',
    sub: 'physics-with-computing',
    degree: 'MPhys',
    years: 4,
    code: 'F331',
    placementCode: 'F330',
    page: 'physics-with-computing-mphys',
    title: 'Physics with Computing MPhys (Hons) degree',
    access:
      '“A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
    extra:
      'Carries the same “role of the chemist” placement boilerplate as its BSc sibling. Also note the code order: F330 is the five-year placement code and F331 the four-year code, so the lower number is the longer course.',
  },
  {
    slug: 'loughborough-physics-with-theoretical-physics-bsc',
    name: 'Physics with Theoretical Physics BSc',
    sub: 'theoretical-physics',
    degree: 'BSc',
    years: 3,
    code: 'F346',
    placementCode: 'F342',
    page: 'physics-with-theoretical-physics-bsc',
    title:
      'Physics with Theoretical Physics BSc | Undergraduate study | Loughborough University',
    access:
      '“A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
    extra:
      'NON-SEQUENTIAL CODES: F342 is the four-year PLACEMENT code and F346 the three-year code. The numerically lower code is the longer course. Any assumption that code order tracks duration gets this course backwards.',
  },
  {
    slug: 'loughborough-physics-with-theoretical-physics-mphys',
    name: 'Physics with Theoretical Physics MPhys',
    sub: 'theoretical-physics',
    degree: 'MPhys',
    years: 4,
    code: 'F348',
    placementCode: 'F347',
    page: 'physics-with-theoretical-physics-mphys',
    title: 'Physics with Theoretical Physics MPhys (Hons) degree',
    access:
      '“A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
  },
  {
    slug: 'loughborough-engineering-physics-bsc',
    name: 'Engineering Physics BSc',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F311',
    placementCode: 'F382',
    page: 'engineering-physics-bsc',
    title: 'Engineering Physics BSc | Undergraduate study | Loughborough University',
    access:
      '“A level: BBB including Maths and Physics (Applicants without A level Physics may be considered on a case by case basis).” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction.” This course puts the Physics waiver INSIDE parentheses, unlike its siblings — transcribed as printed.',
    options: [
      {
        name: 'Materials engineering',
        description: 'One of four named streams inside this single UCAS application.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      {
        name: 'Electrical engineering',
        description: 'One of four named streams inside this single UCAS application.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      {
        name: 'Mechanical and manufacturing engineering',
        description: 'One of four named streams inside this single UCAS application.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      {
        name: 'Systems Engineering',
        description:
          'One of four named streams inside this single UCAS application. This is the ONLY place “Systems Engineering” exists at Loughborough — there is no Systems Engineering degree in the 2027 A–Z, so anyone searching for one should be routed here rather than shown a course that does not exist.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      YEAR_ABROAD,
    ],
    extra:
      'This page carries a stronger placement claim than its siblings — “All of our degrees offer a paid placement year in industry” — but still “offer”, i.e. optional. It also prints the Physics waiver without a trailing full stop, which is why the wording differs slightly from the other Physics pages.',
  },
  {
    slug: 'loughborough-engineering-physics-mphys',
    name: 'Engineering Physics MPhys',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F312',
    placementCode: 'F313',
    page: 'engineering-physics-mphys',
    title: 'Engineering Physics MPhys | Undergraduate study | Loughborough University',
    access:
      '“A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
  },
  {
    slug: 'loughborough-mathematics-and-physics-bsc',
    name: 'Mathematics and Physics BSc',
    sub: 'physics-with-mathematics',
    degree: 'BSc',
    years: 3,
    code: 'F341',
    placementCode: 'F340',
    page: 'mathematics-and-physics-bsc',
    title: 'Mathematics and Physics BSc | Undergraduate study | Loughborough University',
    access:
      '“A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
    extra:
      'NON-SEQUENTIAL CODES AGAIN: F340 is the four-year placement code and F341 the three-year code. The pairing was ambiguous on the first read and was re-verified on a second, separately cache-busted fetch before being recorded.',
  },
  {
    slug: 'loughborough-mathematics-and-physics-mphys',
    name: 'Mathematics and Physics MPhys',
    sub: 'physics-with-mathematics',
    degree: 'MPhys',
    years: 4,
    code: 'F344',
    placementCode: 'F345',
    page: 'mathematics-and-physics-mphys',
    title: 'Mathematics and Physics MPhys | Undergraduate study | Loughborough University',
    access:
      '“A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
  },
];

const physicsCoursesLboro: Course[] = PHYSICS_SEEDS.map((s) => {
  const profile = s.degree === 'BSc' ? 'AAB' : 'AAA';
  const raw = `${profile} including Maths and Physics`;
  return course({
    slug: s.slug,
    universityId: 'loughborough',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    yearsMax: s.years + 1,
    code: s.code,
    altCodes: [{ code: s.placementCode, label: `With placement year (${s.years + 1} years)` }],
    year: '2027',
    cycleNote: CYCLE,
    raw,
    offers: singleOffer({
      profile,
      required: [
        ['Mathematics', profile === 'AAA' ? 'A' : 'B'],
        ['Physics', profile === 'AAA' ? 'A' : 'B'],
      ],
      raw,
      notes: PHYSICS_WAIVER,
    }),
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not mentioned anywhere on this course page. Loughborough states a Further Mathematics position on only six of its twenty-eight in-scope courses — the Electrical and Electronic, Robotics and Materials pairs — and this is not one of them. The page was read in full, so this is Loughborough publishing no preference either way; it is not recorded as “not required”, which Loughborough never says.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: INTERVIEW_NOTE,
    contextual: access(s.access),
    gcse: s.gcse ?? GCSE_ENGLISH,
    studyOptions: s.options ?? [],
    placement: `Optional placement year under a separate UCAS code, ${s.placementCode} (${s.years + 1} years). Loughborough: “All our undergraduate courses offer the option of a placement year, giving you an unforgettable opportunity to test drive a career and help you stand out to employers.”`,
    verification: 'verified',
    officialUrl: L(s.page, s.pageVersion),
    sourceUrl: L(s.page, s.pageVersion),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra,
      'The BSc/MPhys split is the only thing that moves the grades across all five Loughborough physics subject pairs: BSc AAB, MPhys AAA, on every one of them.',
      PHYSICS_WAIVER,
      PLACEMENT_NOTE,
      GCSE_UNIVERSITY_NOTE,
      NO_EPQ_NOTE,
      PRACTICAL_NOTE,
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  });
});

/* ------------------------------------------------------------------ */
/* Engineering — eighteen courses, nine BEng/MEng pairs                */
/* ------------------------------------------------------------------ */

interface EngSeed {
  slug: string;
  name: string;
  sub:
    | 'mechanical'
    | 'aeronautical'
    | 'civil'
    | 'electrical'
    | 'chemical'
    | 'materials'
    | 'design'
    | 'robotics-mechatronics';
  degree: 'BEng' | 'MEng';
  years: number;
  code: string;
  placementCode: string;
  page: string;
  pageVersion?: number;
  title: string;
  profile: string;
  raw: string;
  required: SubjectSpec[];
  constraints?: OfferConstraint[];
  offerNotes?: string;
  access: string;
  gcse?: string;
  fm?: 'no-stated-preference';
  fmNote?: string;
  interviewShort?: boolean;
  interviewNone?: boolean;
  interviewNote?: string;
  options?: StudyOption[];
  extra?: string;
}

const FM_ACCEPTED_NOTE =
  'Further Mathematics is PUBLISHED and load-bearing on this course: it is one of the named subjects that satisfies the second-subject requirement in its own right, without Physics. That acceptance is modelled structurally in the pathway constraint rather than as a stated preference, so this field records that Loughborough expresses no preference between the accepted subjects. Only six of Loughborough’s twenty-eight in-scope courses mention Further Mathematics at all.';

const FM_COUNTED_NOTE =
  'Further Mathematics is PUBLISHED and fully counted on this course: it is one of the six qualifying subjects, on equal footing with Mathematics itself. That is modelled structurally in the pathway constraint rather than as a stated preference.';

const FM_ABSENT_NOTE =
  'Further Mathematics is not mentioned anywhere on this course page. Loughborough states a Further Mathematics position on only six of its twenty-eight in-scope courses, and this is not one of them. The page was read in full, so this is Loughborough publishing no preference either way; it is not recorded as “not required”, which Loughborough never says.';

const ENG_SEEDS: EngSeed[] = [
  /* -------------------------- Mechanical -------------------------- */
  {
    slug: 'loughborough-mechanical-engineering-beng',
    name: 'Mechanical Engineering BEng',
    sub: 'mechanical',
    degree: 'BEng',
    years: 3,
    code: 'H300',
    placementCode: 'H301',
    page: 'mechanical-engineering-beng',
    title: 'Mechanical Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'AAB',
    raw: 'AAB including Maths and Physics',
    required: [
      ['Mathematics', 'B'],
      ['Physics', 'B'],
    ],
    access:
      '“A level: BBB including Maths and Physics or ABC with AB in Maths and Physics in any order.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction in Engineering.” Note that the A-level contextual offer here is TWO ALTERNATIVE GRADE PROFILES, not a range — BBB, or ABC with AB in the required subjects in any order. Recorded as the exact alternatives rather than collapsed into one.',
    options: [YEAR_ABROAD],
    extra:
      'NO PHYSICS WAIVER ON THIS PAGE. Every Loughborough Physics course prints “Applicants without A level Physics may be considered on a case-by-case basis”; no Engineering course does. The absence is real and is not an omission in the reading.',
  },
  {
    slug: 'loughborough-mechanical-engineering-meng',
    name: 'Mechanical Engineering MEng',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H303',
    placementCode: 'H302',
    page: 'mechanical-engineering-meng',
    title: 'Mechanical Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'A*AA',
    raw: 'A*AA including Maths and Physics with A* in Maths or Physics',
    required: [
      ['Mathematics', 'A'],
      ['Physics', 'A'],
    ],
    constraints: [placedAStar()],
    offerNotes:
      'THE A* IS NOT FREE. Loughborough places it: “with A* in Maths or Physics”. Storing A*AA alone would drop a binding condition, so the placement is stored as a cross-subject rule and is checked separately from the aggregate.',
    access:
      '“A level: AAB including A in Maths and Physics.” and “A level and BTEC Level 3 National Extended Certificate: A in Maths, B in Physics, and Distinction in Engineering.” The contextual offer keeps a PER-SUBJECT minimum — A in both named subjects — rather than only lowering the aggregate.',
    options: [YEAR_ABROAD, UNITECH],
  },
  /* ------------------------- Aeronautical -------------------------- */
  {
    slug: 'loughborough-aeronautical-engineering-beng',
    name: 'Aeronautical Engineering BEng',
    sub: 'aeronautical',
    degree: 'BEng',
    years: 3,
    code: 'H410',
    placementCode: 'H401',
    page: 'aeronautical-engineering-beng',
    title: 'Aeronautical Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'AAB',
    raw: 'AAB including Maths and Physics',
    required: [
      ['Mathematics', 'B'],
      ['Physics', 'B'],
    ],
    access:
      '“A level: BBB including Maths and Physics.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction.”',
    options: [YEAR_ABROAD],
    extra:
      'CODE CAUTION: the three-year code is H410, NOT H400. H401 is the four-year placement code. A reader expecting the familiar H400 aeronautical code will not find it here.',
  },
  {
    slug: 'loughborough-aeronautical-engineering-meng',
    name: 'Aeronautical Engineering MEng',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H403',
    placementCode: 'H402',
    page: 'aeronautical-engineering-meng',
    title: 'Aeronautical Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'A*AA',
    raw: 'A*AA including Maths and Physics with A* in Maths or Physics',
    required: [
      ['Mathematics', 'A'],
      ['Physics', 'A'],
    ],
    constraints: [placedAStar()],
    offerNotes:
      'THE A* IS PLACED: “with A* in Maths or Physics”. Same load-bearing rule as Mechanical MEng.',
    access:
      '“A level: AAB including Maths and Physics with A in Maths or Physics.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.” The contextual offer PRESERVES the cross-subject rule, moving it from A* down to A rather than dropping it.',
    options: [YEAR_ABROAD, UNITECH],
    extra:
      'THE ONLY EXPLICIT “NOT ACCEPTED” RULE IN THE WHOLE LOUGHBOROUGH SET, shared with Automotive MEng, verbatim: “BTEC Level 3 National Extended Diploma is not accepted for MEng but considered for BEng in combination with A level Maths”.',
  },
  /* -------------------------- Automotive --------------------------- */
  {
    slug: 'loughborough-automotive-engineering-beng',
    name: 'Automotive Engineering BEng',
    sub: 'mechanical',
    degree: 'BEng',
    years: 3,
    code: 'H330',
    placementCode: 'H341',
    page: 'automotive-engineering-beng',
    title: 'Automotive Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'AAB',
    raw: 'AAB including Maths and Physics',
    required: [
      ['Mathematics', 'B'],
      ['Physics', 'B'],
    ],
    access:
      '“A level: BBB including Maths and Physics” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction”, plus the unquantified circumstances route.',
    interviewNone: true,
    interviewNote:
      'THIS PAGE DOES NOT PRINT LOUGHBOROUGH’S STANDARD INTERVIEW SENTENCE, which every other in-scope course carries. What it prints instead is a post-offer visit invitation: “If applicants are made an offer of a place, they will be invited to visit the department giving them the opportunity to meet staff and students, see facilities and get an insight into what it is like to be a student at Loughborough.” That is not an interview policy. The status is therefore unstated here, and has deliberately NOT been copied from its MEng sibling, which does carry an interview sentence.',
    options: [YEAR_ABROAD],
  },
  {
    slug: 'loughborough-automotive-engineering-meng',
    name: 'Automotive Engineering MEng',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H343',
    placementCode: 'H342',
    page: 'automotive-engineering-meng',
    title: 'Automotive Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'A*AA',
    raw: 'A*AA including Maths and Physics with A* in Maths or Physics',
    required: [
      ['Mathematics', 'A'],
      ['Physics', 'A'],
    ],
    constraints: [placedAStar()],
    offerNotes: 'THE A* IS PLACED: “with A* in Maths or Physics”.',
    access:
      '“A level: AAB including Maths and Physics with A in Maths or Physics.” and “A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction.”',
    interviewShort: true,
    options: [YEAR_ABROAD, UNITECH],
    extra:
      'Carries the same explicit not-accepted rule as Aeronautical MEng: “BTEC Level 3 National Extended Diploma is not accepted for MEng but considered for BEng in combination with A level Maths.” Its BEng sibling prints no interview sentence at all, and this page’s wording has not been carried across to it.',
  },
  /* ----------------------------- Civil ----------------------------- */
  {
    slug: 'loughborough-civil-engineering-beng',
    name: 'Civil Engineering BEng',
    sub: 'civil',
    degree: 'BEng',
    years: 3,
    code: 'H200',
    placementCode: 'H201',
    page: 'civil-engineering-beng',
    title: 'Civil Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'ABB',
    raw: 'ABB including Maths',
    required: [['Mathematics', 'B']],
    offerNotes:
      'MATHEMATICS ONLY. Civil is the structural outlier of Loughborough’s engineering set: every other engineering course here names a second required subject, and this one names none. There is no “one of” list and no A* condition.',
    access:
      '“A level: BBC including grade B in Maths” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths, and Merit.” Note the BTEC tier: Civil BEng accepts a MERIT where almost every other in-scope Loughborough course requires a Distinction.',
    options: [YEAR_ABROAD],
    extra:
      'The BTEC preference list on this page is unusually broad — “Engineering, Mechanical Engineering, Manufacturing Engineering, Aeronautical Engineering, Construction & Built Environment, Applied Science or Physical Science” — but that governs BTEC entry only and says nothing about acceptable A-level subjects.',
  },
  {
    slug: 'loughborough-civil-engineering-meng',
    name: 'Civil Engineering MEng',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H203',
    placementCode: 'H202',
    page: 'civil-engineering-meng',
    title: 'Civil Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'AAB',
    raw: 'AAB including Maths',
    required: [['Mathematics', 'B']],
    offerNotes:
      'MATHEMATICS ONLY, AND A FULL BAND BELOW THE OTHER MEngs. Civil MEng asks AAB where Mechanical, Aeronautical and Automotive MEng ask A*AA with a placed A*, and it requires no Physics at all.',
    access:
      '“A level: BBB including Maths” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths, and Distinction”, plus the unquantified circumstances route. Note the MEng requires a Distinction where its own BEng sibling accepts a Merit.',
    options: [YEAR_ABROAD, UNITECH],
  },
  /* -------------------- Electrical and Electronic ------------------ */
  {
    slug: 'loughborough-electrical-and-electronic-engineering-beng',
    name: 'Electrical and Electronic Engineering BEng',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'H600',
    placementCode: 'H604',
    page: 'electrical-and-electronic-engineering-beng',
    title:
      'Electrical and Electronic Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'ABB',
    raw: 'ABB including Maths and either Computing, Computer Science, Electronics, Further Maths or Physics',
    required: [['Mathematics', 'B']],
    constraints: [
      oneOf(
        EEE_SUBJECTS,
        null,
        'Either Computing, Computer Science, Electronics, Further Maths or Physics. Loughborough states this twice on the page — once inside the offer and once on its own line: “A level subjects: All offers include Maths and either Computing, Computer Science, Electronics, Further Maths or Physics”.',
      ),
    ],
    offerNotes:
      'PHYSICS IS OPTIONAL HERE — it is one of five acceptable second subjects, and Further Mathematics satisfies the requirement in its own right. Chemistry is not among them.',
    access:
      '“A level: BBC including grades BB in Maths and either Computing, Computer Science, Electronics, Further Maths or Physics.” and “A level and BTEC Level 3 National Extended Certificate: BB in Maths and either Computing, Computer Science, Electronics, Further Maths or Physics, and Merit in Engineering.”',
    fm: 'no-stated-preference',
    fmNote: FM_ACCEPTED_NOTE,
    options: [YEAR_ABROAD],
    extra:
      'TITLE CAUTION: the scaffold’s “Electronic and Electrical Engineering” is the wrong word order; Loughborough’s degree is Electrical and Electronic Engineering. THE IB LIST IS NARROWER THAN THE A-LEVEL LIST on this course: IB accepts only “Computer Science or Physics” while A level accepts five subjects. Mirroring one onto the other would invent acceptances, so neither has been.',
  },
  {
    slug: 'loughborough-electrical-and-electronic-engineering-meng',
    name: 'Electrical and Electronic Engineering MEng',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H601',
    placementCode: 'H605',
    page: 'electrical-and-electronic-engineering-meng',
    title:
      'Electrical and Electronic Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'AAA',
    raw: 'AAA including Maths and either Computing, Computer Science, Electronics, Further Maths or Physics',
    required: [['Mathematics', 'A']],
    constraints: [
      oneOf(
        EEE_SUBJECTS,
        'A',
        'Either Computing, Computer Science, Electronics, Further Maths or Physics.',
      ),
    ],
    offerNotes:
      'AAA WITH NO A* AND NO PLACED-A* RULE — unlike Mechanical, Aeronautical and Automotive MEng, which are A*AA with the A* pinned to Maths or Physics. Six of Loughborough’s nine MEngs are plain AAA.',
    access:
      '“A level: ABB including grade A in Maths and grade B in either Computing, Computer Science, Electronics, Further Maths or Physics.” and “A level and BTEC Level 3 National Extended Certificate: A in Maths, B in either Computing, Computer Science, Electronics, Further Maths or Physics, and Distinction in Engineering.” The contextual offer PINS specific grades to specific subjects — A to Maths, B to the chosen second subject.',
    fm: 'no-stated-preference',
    fmNote: FM_ACCEPTED_NOTE,
    options: [YEAR_ABROAD, UNITECH],
  },
  /* --------------------------- Chemical ---------------------------- */
  {
    slug: 'loughborough-chemical-engineering-beng',
    name: 'Chemical Engineering BEng',
    sub: 'chemical',
    degree: 'BEng',
    years: 3,
    code: 'H805',
    placementCode: 'H806',
    page: 'chemical-engineering-beng',
    title: 'Chemical Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'AAB',
    raw: 'AAB including Maths and at least one from Chemistry or Physics',
    required: [['Mathematics', 'B']],
    constraints: [
      oneOf(
        ['Chemistry', 'Physics'],
        null,
        'At least one from Chemistry or Physics. The two are interchangeable and neither alone is mandatory.',
      ),
    ],
    offerNotes:
      'CHEMISTRY AND PHYSICS ARE INTERCHANGEABLE, and neither alone is mandatory. This is the only Loughborough course in the set where Chemistry is explicitly named and accepted as a qualifying science.',
    access:
      '“A level: BBB including Maths and at least one from Chemistry or Physics.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and either Chemistry or Physics, and Distinction.”',
    interviewShort: true,
    options: [YEAR_ABROAD],
  },
  {
    slug: 'loughborough-chemical-engineering-meng',
    name: 'Chemical Engineering MEng',
    sub: 'chemical',
    degree: 'MEng',
    years: 4,
    code: 'H803',
    placementCode: 'H802',
    page: 'chemical-engineering-meng',
    title: 'Chemical Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'AAA',
    raw: 'AAA including Maths and at least one from Chemistry or Physics',
    required: [['Mathematics', 'A']],
    constraints: [
      oneOf(
        ['Chemistry', 'Physics'],
        'A',
        'At least one from Chemistry or Physics. The two are interchangeable.',
      ),
    ],
    offerNotes: 'AAA with no A* and no placed-A* rule.',
    access:
      '“A level: ABB including Maths and at least one from Chemistry or Physics.” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and either Chemistry or Physics, and Distinction.”',
    interviewShort: true,
    options: [
      YEAR_ABROAD,
      {
        name: 'Sustainability and low-carbon technologies',
        description:
          'A named specialism route inside this single application: “Circular Economy in Chemical and Biochemical Engineering, Clean Energy, Materials and Sustainability, Process Intensification”.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      {
        name: '21st Century Manufacturing',
        description:
          'A named specialism route inside this single application: “Chemical Product Design, Process Intensification, Mixing of Fluids and Particles”.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      {
        name: 'Biotechnology',
        description:
          'A named specialism route inside this single application: “Biochemical Engineering, Downstream Processing, Healthcare Engineering”.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
      {
        name: 'Business and Management',
        description:
          'A named specialism route inside this single application: “Business Systems, Entrepreneurship & Innovation, Operations Management”.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
    ],
    extra:
      'AN ODDITY IN LOUGHBOROUGH’S OWN TEXT, TRANSCRIBED RATHER THAN RECONCILED: this MEng’s contextual A-level offer is ABB while the BEng’s is BBB — but the MEng’s BTEC-combination contextual line reads “BB …”, identical to the BEng’s. Both are recorded exactly as published; neither has been “corrected”.',
  },
  /* --------------------------- Materials --------------------------- */
  {
    slug: 'loughborough-materials-science-and-engineering-beng',
    name: 'Materials Science and Engineering BEng',
    sub: 'materials',
    degree: 'BEng',
    years: 3,
    code: 'J500',
    placementCode: 'J501',
    page: 'materials-science-engineering-beng',
    title:
      'Materials Science and Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'ABB',
    raw: 'ABB including two from Mathematics, Further Mathematics, Physics, Chemistry, Biology and Design Technology.',
    required: [],
    constraints: [twoFromSix()],
    offerNotes:
      'NO SINGLE SUBJECT IS INDIVIDUALLY MANDATORY — not even Mathematics. The requirement is any two from a six-item list, and Loughborough states no minimum grade for them. An applicant with Chemistry and Biology and no Maths satisfies the published rule. Loughborough’s own contextual wording makes the pick-two reading explicit: “any two from”.',
    access:
      '“A level: BBC including grades BB in any two from Mathematics, Further Mathematics, Physics, Chemistry, Biology and Design Technology.” and “A level and BTEC Level 3 National Extended Certificate: BB including any two from the same list, and Merit.”',
    gcse: GCSE_MATHS_AND_ENGLISH,
    fm: 'no-stated-preference',
    fmNote: FM_COUNTED_NOTE,
    interviewShort: true,
    options: [
      YEAR_ABROAD,
      {
        name: 'University-wide Language Programme',
        description:
          'Taken inside this single application. Loughborough names French, German, Spanish and Mandarin Chinese.',
        ucasCode: null,
        chosenWhen: 'After admission.',
        officialUrl: null,
      },
    ],
    extra:
      'THE GCSE EXCEPTION IN THIS DATASET: Materials Science and Engineering, BEng and MEng, are the ONLY two of Loughborough’s twenty-eight in-scope courses that state a GCSE Maths requirement on the course page itself. All twenty-six others state English Language only. URL CAUTION: the real slug drops the “and” — the guessable “materials-science-and-engineering-beng” returns a 404. This is also the broadest accepted-subject list in the whole Loughborough set.',
  },
  {
    slug: 'loughborough-materials-science-and-engineering-meng',
    name: 'Materials Science and Engineering MEng',
    sub: 'materials',
    degree: 'MEng',
    years: 4,
    code: 'J502',
    placementCode: 'J503',
    page: 'materials-science-engineering-meng',
    title:
      'Materials Science and Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'AAA',
    raw: 'AAA including two from Mathematics, Further Mathematics, Physics, Chemistry, Biology and Design Technology.',
    required: [],
    constraints: [twoFromSix()],
    offerNotes:
      'Any two from the same six-item list, at AAA. No A* and no placed-A* rule, and again no individually mandatory subject.',
    access:
      '“A level: ABB including two from Mathematics, Further Mathematics, Physics, Chemistry, Biology and Design Technology with grade A in one of these subjects.” and “A level and BTEC Level 3 National Extended Certificate: AB including any two from the same list, and Distinction.” Note that the contextual offer ADDS a per-subject minimum that the standard offer does not state.',
    gcse: GCSE_MATHS_AND_ENGLISH,
    fm: 'no-stated-preference',
    fmNote: FM_COUNTED_NOTE,
    interviewShort: true,
    options: [YEAR_ABROAD, UNITECH],
  },
  /* --------------------- Product Design Engineering ---------------- */
  {
    slug: 'loughborough-product-design-engineering-beng',
    name: 'Product Design Engineering BEng',
    sub: 'design',
    degree: 'BEng',
    years: 3,
    code: 'HH1R',
    placementCode: 'H715',
    page: 'product-design-engineering-beng',
    pageVersion: 11,
    title: 'Product Design Engineering BEng | Undergraduate study | Loughborough University',
    profile: 'ABB',
    raw: 'ABB including Maths and either Physics or Design and Technology (Design Engineering/Engineering Design/Product Design).',
    required: [['Mathematics', 'B']],
    constraints: [
      oneOf(
        DESIGN_SUBJECTS,
        null,
        'Either Physics or Design and Technology. Loughborough names the three qualifying Design and Technology titles explicitly: Design Engineering, Engineering Design, Product Design.',
      ),
    ],
    offerNotes:
      'Mathematics is individually required; Physics is optional because Design and Technology substitutes for it. Chemistry is not among the accepted alternatives.',
    access:
      '“A level: BBC including grades BB from Maths and either Physics or Design and Technology (Design Engineering/Engineering Design/Product Design).” and “A level and BTEC Level 3 National Extended Certificate: BB including Maths and either Design and Technology (…) or Physics, and Merit in Engineering.”',
    options: [YEAR_ABROAD],
    extra:
      'NO PORTFOLIO REQUIREMENT IS STATED ANYWHERE ON THIS PAGE — worth recording because a design-titled engineering degree is precisely where one would be assumed. That is silence, not a published “no portfolio”. CODE CAUTION: the three-year code HH1R is alphanumeric, does not resemble its placement partner H715, and would be rejected by any validation assuming a four-digit numeric UCAS code.',
  },
  {
    slug: 'loughborough-product-design-engineering-meng',
    name: 'Product Design Engineering MEng',
    sub: 'design',
    degree: 'MEng',
    years: 4,
    code: 'HHC7',
    placementCode: 'HHD7',
    page: 'product-design-engineering-meng',
    pageVersion: 11,
    title: 'Product Design Engineering MEng (Hons) degree',
    profile: 'AAA',
    raw: 'AAA including Maths and either Physics or Design and Technology (Design Engineering/Engineering Design/Product Design).',
    required: [['Mathematics', 'A']],
    constraints: [
      oneOf(
        DESIGN_SUBJECTS,
        null,
        'Either Physics or Design and Technology (Design Engineering, Engineering Design or Product Design).',
      ),
    ],
    offerNotes: 'AAA with no A* and no placed-A* rule.',
    access:
      '“A level: ABB including grade A in Maths and grade B in either Physics or Design and Technology (…).” and “A level and BTEC Level 3 National Extended Certificate: A in Maths, B in either Design and Technology (…) or Physics, and Distinction in Engineering.” Grades are again pinned to specific subjects in the contextual offer.',
    extra:
      'NO PORTFOLIO REQUIREMENT IS STATED. No named study options are published either: the page lists only teaching methods — lectures, seminars, tutorials, independent study, group work, workshops, laboratory work, practical sessions — which are not study options and are not recorded as such. Both codes are alphanumeric: HHC7 for the four-year route, HHD7 with placement.',
  },
  /* ------------- Robotics, Mechatronics and Control ---------------- */
  {
    slug: 'loughborough-robotics-mechatronics-and-control-engineering-beng',
    name: 'Robotics, Mechatronics and Control Engineering BEng',
    sub: 'robotics-mechatronics',
    degree: 'BEng',
    years: 3,
    code: 'H671',
    placementCode: 'H672',
    page: 'robotics-mechatronics-control-engineering-beng',
    title: 'Robotics, Mechatronics and Control Engineering BEng (Hons) degree',
    profile: 'ABB',
    raw: 'ABB including Maths and either Computing, Computer Science, Electronics, Further Maths or Physics.',
    required: [['Mathematics', 'B']],
    constraints: [
      oneOf(
        EEE_SUBJECTS,
        null,
        'Either Computing, Computer Science, Electronics, Further Maths or Physics. Restated by Loughborough on its own line: “A level subjects: All offers include Maths and either Computing, Computer Science, Electronics, Further Maths or Physics.”',
      ),
    ],
    offerNotes:
      'Physics is optional — one of five acceptable second subjects. Chemistry is not accepted as an alternative.',
    access:
      '“A level: BBC including grades BB in Maths and either Computing, Computer Science, Electronics, Further Maths or Physics.” and “A level and BTEC Level 3 National Extended Certificate: BB in Maths and either the same list, and Merit in Engineering.”',
    fm: 'no-stated-preference',
    fmNote: FM_ACCEPTED_NOTE,
    extra:
      'URL CAUTION: the real slug drops the “and” — the guessable “robotics-mechatronics-and-control-engineering-beng” returns a 404. THE IB LIST IS NARROWER than the A-level list here too (Computer Science or Physics only), and has not been mirrored onto it. No named study options are published; the page lists teaching methods only.',
  },
  {
    slug: 'loughborough-robotics-mechatronics-and-control-engineering-meng',
    name: 'Robotics, Mechatronics and Control Engineering MEng',
    sub: 'robotics-mechatronics',
    degree: 'MEng',
    years: 4,
    code: 'H673',
    placementCode: 'H674',
    page: 'robotics-mechatronics-control-engineering-meng',
    title:
      'Robotics, Mechatronics and Control Engineering MEng | Undergraduate study | Loughborough University',
    profile: 'AAA',
    raw: 'AAA including Maths and either Computing, Computer Science, Electronics, Further Maths or Physics.',
    required: [['Mathematics', 'A']],
    constraints: [
      oneOf(
        EEE_SUBJECTS,
        'A',
        'Either Computing, Computer Science, Electronics, Further Maths or Physics.',
      ),
    ],
    offerNotes: 'AAA with no A* and no placed-A* rule.',
    access:
      '“A level: ABB including grade A in Maths and grade B in either Computing, Computer Science, Electronics, Further Maths or Physics.” and “A level and BTEC Level 3 National Extended Certificate: A in Maths, B in either the same list, and Distinction in Engineering.” Plus the unquantified circumstances route.',
    fm: 'no-stated-preference',
    fmNote: FM_ACCEPTED_NOTE,
    extra:
      'THE ONLY T LEVEL ROUTE IN THE WHOLE LOUGHBOROUGH IN-SCOPE SET, printed under the page’s own “Other” heading, verbatim: “T Level in Design and Development for Engineering and Manufacturing and Electrical and Electronic Engineering or Control and Instrumentation Engineering Occupational Specialism is considered. Distinction overall with A in core component, Distinction in Occupational Specialism, Pass in Industry Placement and A in A level Maths.” There is still no EPQ route. No named study options are published; the page lists teaching methods only.',
  },
];

const engineeringCoursesLboro: Course[] = ENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'loughborough',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    yearsMax: s.years + 1,
    code: s.code,
    altCodes: [{ code: s.placementCode, label: `With placement year (${s.years + 1} years)` }],
    year: '2027',
    cycleNote: CYCLE,
    raw: s.raw,
    offers: singleOffer({
      profile: s.profile,
      required: s.required,
      constraints: s.constraints,
      raw: s.raw,
      notes: s.offerNotes,
    }),
    fm: s.fm ?? 'no-stated-preference',
    fmNote: s.fmNote ?? FM_ABSENT_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: s.interviewNone ? 'not-stated' : 'sometimes',
    interviewNote:
      s.interviewNote ?? (s.interviewShort ? INTERVIEW_NOTE_SHORT : INTERVIEW_NOTE),
    contextual: access(s.access),
    gcse: s.gcse ?? GCSE_ENGLISH,
    studyOptions: s.options ?? [],
    placement: `Optional placement year under a separate UCAS code, ${s.placementCode} (${s.years + 1} years). Loughborough’s Wolfson School wording: “The majority of undergraduate degree programmes within the Wolfson School of Mechanical, Electrical and Manufacturing Engineering provide students with the opportunity to undertake a salaried placement year”, and “If you choose to undertake a year in industry, you will complete a full year of assessed industrial training typically between years two and three of your academic studies.”`,
    verification: 'verified',
    officialUrl: L(s.page, s.pageVersion),
    sourceUrl: L(s.page, s.pageVersion),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra,
      PLACEMENT_NOTE,
      s.gcse === GCSE_MATHS_AND_ENGLISH ? null : GCSE_UNIVERSITY_NOTE,
      NO_EPQ_NOTE,
      PRACTICAL_NOTE,
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

export const batch6LoughboroughCourses: Course[] = [
  ...physicsCoursesLboro,
  ...engineeringCoursesLboro,
];

/**
 * Titles the scaffold or the brief expected at Loughborough that its own 2027
 * A–Z does not contain. Exported so the assertion suite can prove no record was
 * ever invented for them.
 */
export const LOUGHBOROUGH_NONEXISTENT_TITLES: readonly string[] = [
  'Physics with Astrophysics',
  'Manufacturing Engineering',
  'Systems Engineering',
  'Electronic and Electrical Engineering',
] as const;
