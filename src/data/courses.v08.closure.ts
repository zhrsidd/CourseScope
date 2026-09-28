/**
 * ---------------------------------------------------------------------------
 *  v0.8 — DATA CLOSURE
 *  Read from each university's own pages on 2026-09-18.
 * ---------------------------------------------------------------------------
 *
 *  Two jobs, both about closing gaps the numbered batches left open rather than
 *  about growing the catalogue.
 *
 *  1. YORK ENGINEERING. Batch 7 imported 22 York engineering applications as
 *     identity only — York's own "Courses 2027/28" A–Z gave their titles,
 *     awards and UCAS codes and nothing else had been read. This file closes 21
 *     of them from their own course pages. The 22nd, H640, stays identity-only
 *     for a documented reason set out on its record in the Batch 7 file.
 *
 *  2. THE EIGHT UNEVIDENCED IDENTITIES. Three at King's College London, four at
 *     Queen Mary, one at Bath — scaffold rows that cited no source at all, sat
 *     in 2028 with no 2027 counterpart, and asserted courses nobody had ever
 *     checked. All eight are resolved here. None was deleted on suspicion and
 *     none was kept on faith.
 *
 *  ---------------------------------------------------------------------------
 *  WHAT THE EIGHT TURNED OUT TO BE
 *  ---------------------------------------------------------------------------
 *
 *  The scaffold was wrong about the details far more often than it was wrong
 *  about the existence of a course, which is precisely the pattern the
 *  application-identity invariant predicts:
 *
 *   · "Engineering MEng, H100" at KCL is really GENERAL ENGINEERING MEng, H101.
 *     H100 is the BEng — a three-year, separately-coded application. The
 *     scaffold had taken a real code and hung the wrong award on it, which is
 *     the same error as York's H610 MEng that Batch 7 deleted. Both real KCL
 *     applications were read and the MEng is imported here.
 *   · "Physics with Astrophysics BSc, F3F5" at KCL is really PHYSICS WITH
 *     ASTROPHYSICS AND COSMOLOGY BSc, FF35. Wrong title, wrong code.
 *   · "Physics MSci, F303" at KCL was RIGHT — the one scaffold row in the eight
 *     that survives unchanged, now with its requirements read.
 *   · Queen Mary's four are all real programmes under titles Queen Mary itself
 *     publishes, but NOT ONE of their UCAS codes appears on any Queen Mary page
 *     that could be reached. The codes are stripped, exactly as three invented
 *     Bath codes were stripped in Batch 7.
 *   · Bath's "Electrical and Electronic Engineering MEng" is REAL and is
 *     offered for 2027 entry — confirmed on Bath's own 2027 department listing,
 *     which also settles that the scaffold's guess happened to be right. Its
 *     requirements were read in full.
 *
 *  So: three become verified applications with admissions data, five keep their
 *  identity and lose their unsupported codes or cycle claims. Zero remain
 *  unevidenced, and zero were deleted.
 *
 *  ---------------------------------------------------------------------------
 *  THE CYCLE TRAP THAT CAUGHT KCL, AND WHY ONE KCL RECORD IS NOT VERIFIED
 *  ---------------------------------------------------------------------------
 *
 *  KCL's Physics with Astrophysics and Cosmology BSc page shows "September 2027"
 *  in its header and then says, in its own words, that "course details apply to
 *  2026 entry" and that "Details for 2027 entry for our undergraduate courses
 *  will be published from September 2026."
 *
 *  A 2027 header over 2026 figures. The header alone would have been enough to
 *  import AAA as a 2027 offer, and it would have been wrong.
 *
 *  The disclaimer was then checked on the other two KCL courses and is NOT
 *  there — so KCL rolls its courses over page by page, exactly as Southampton
 *  does. The two clean pages are imported as 2027; the disclaimed one keeps its
 *  identity and none of its numbers. Same university, same day, different
 *  answers, because the pages say different things.
 */

import type { Course } from '@/types';
import { awaitingCourse, course, offer } from './builders';

const READ_ON = '2026-09-18';

/* ================================================================== */
/* King's College London                                               */
/* ================================================================== */

const KCL_EPQ_NOT_COUNTED =
  'KCL publishes an explicit EXCLUSION rather than the usual EPQ concession: "The EPQ is not considered." Most universities in this catalogue publish an EPQ route that lowers an offer; KCL rules it out. Recorded because an absence of an EPQ route and a refusal of one are different facts.';

const KCL_PRACTICAL =
  'Practical endorsement: "If you are taking linear A-levels in England, you will be required to pass the practical endorsement in all Science subjects."';

const KCL_NO_TEST =
  'No admissions test is mentioned on this course page or on its entry-requirements page. KCL does not state that no test is required either, so this is silence rather than a published "no admissions test".';

const KCL_NO_INTERVIEW =
  'No interview is mentioned on this course page or its entry-requirements page.';

const KCL_FM =
  'Further Mathematics is never raised on this course page or its entry-requirements page. Both were read in full, so this is KCL publishing no preference rather than a gap in our research. It is not recorded as "not required" — KCL never says that.';

const KCL_NO_GCSE =
  'No GCSE requirement is published on this course page or its entry-requirements page.';

const KCL_CYCLE =
  'Published requirements for 2027 entry. This page shows a September 2027 start date and, unlike KCL’s Physics with Astrophysics and Cosmology BSc, carries NO statement that its details apply to an earlier cycle — checked specifically, because that sibling page does carry one. KCL rolls its courses over page by page.';

const kclCourses: Course[] = [
  course({
    slug: 'kcl-physics-msci',
    universityId: 'kcl',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
    year: '2027',
    cycleNote: KCL_CYCLE,
    raw: 'A-level (or equivalent) grade A in Mathematics and Physics',
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: 'AAA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText: 'AAA. A-level (or equivalent) grade A in Mathematics and Physics.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: KCL_FM,
    test: 'unknown',
    testNote: KCL_NO_TEST,
    interview: 'not-stated',
    interviewNote: KCL_NO_INTERVIEW,
    contextual: {
      availability: 'yes',
      details:
        'KCL publishes a contextual A-level offer of "AAC" against the standard AAA, and a contextual International Baccalaureate offer of "33 points overall or aggregate score of 16 from three Higher Levels". A separate contextual Access to HE Diploma requirement is published too. THE SUBJECT RULE IS NOT WAIVED: grade A in Mathematics and Physics is stated for the contextual route as well, so the reduction is to the aggregate only.',
    },
    gcse: KCL_NO_GCSE,
    studyOptions: [],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'KCL’s own course page and its dedicated entry-requirements page were both read. Both print the title "Physics MSci" and UCAS code F303. THIS IS THE ONE SCAFFOLD ROW OF THE EIGHT THAT WAS ALREADY CORRECT — title, award and code all match what KCL publishes. It was unevidenced rather than wrong.',
    officialUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/physics-msci',
    sourceUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/physics-msci/requirements',
    sourceTitle: 'Physics MSci - Entry Requirements | King’s College London',
    lastVerified: READ_ON,
    notes: `THE SUBJECT RULE IS PINNED, WHICH MOST OF THIS CATALOGUE’S AAA COURSES ARE NOT: KCL does not merely say "AAA including Mathematics and Physics", it requires grade A in each of them by name. An applicant with A*AB where the B is in Physics does not meet this offer despite a stronger aggregate. ${KCL_EPQ_NOT_COUNTED} ${KCL_PRACTICAL} KCL publishes no BSc counterpart under this exact title in the catalogue’s scope, and none has been invented.`,
  }),

  course({
    slug: 'kcl-general-engineering-meng',
    universityId: 'kcl',
    name: 'General Engineering',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'H101',
    year: '2027',
    cycleNote: KCL_CYCLE,
    raw: 'A-level (or equivalent) grade A in Mathematics',
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        rawText: 'AAA. A-level (or equivalent) grade A in Mathematics.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: KCL_FM,
    test: 'unknown',
    testNote: KCL_NO_TEST,
    interview: 'not-stated',
    interviewNote: KCL_NO_INTERVIEW,
    contextual: {
      availability: 'yes',
      details:
        'KCL publishes a contextual A-level offer of "ABB" against the standard AAA — a two-grade reduction — and a contextual International Baccalaureate offer of "33 points overall or aggregate score of 16 from three Higher Levels". THE SUBJECT RULE IS NOT WAIVED: grade A in Mathematics is stated for the contextual route as well.',
    },
    gcse: KCL_NO_GCSE,
    studyOptions: [],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'KCL’s own course page and its dedicated entry-requirements page were both read, and both print "General Engineering MEng" with UCAS code H101. THE SCAFFOLD ROW THIS REPLACES SAID "Engineering MEng, H100" — WRONG ON BOTH COUNTS. KCL’s H100 is the General Engineering BEng, a separate three-year application whose own page was read to confirm it. This is the same error shape as York’s H610 MEng, deleted in Batch 7: a real code attached to the wrong award.',
    officialUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/general-engineering-meng',
    sourceUrl:
      'https://www.kcl.ac.uk/study/undergraduate/courses/general-engineering-meng/entry-requirements',
    sourceTitle: 'General Engineering MEng - Entry Requirements | King’s College London',
    lastVerified: READ_ON,
    notes: `MATHEMATICS ALONE. No second science or technology subject is named, which is unusually permissive for an engineering MEng at this grade level — compare Bath’s Electrical and Electronic Engineering MEng, which asks for Mathematics plus a second science at the same A grade. KCL’S BEng COUNTERPART EXISTS AND IS NOT IN THIS CATALOGUE: "General Engineering BEng", UCAS H100, three years, same AAA offer and same "grade A in Mathematics" rule, with a contextual offer KCL words as "two A-Level grades (or equivalent) lower than the advertised entry requirements". It was read in order to prove what H100 actually is, and it is recorded here as evidence rather than imported as a course, because v0.8 is a data-closure stage and not an ingestion wave. It is a known omission, not an oversight. ${KCL_EPQ_NOT_COUNTED} ${KCL_PRACTICAL} KCL also publishes "General Studies, Critical Thinking, and equivalent subjects are not accepted."`,
  }),
];

/*
 * The KCL course whose page disqualifies its own figures.
 *
 * The header says September 2027. The page then says its details apply to 2026
 * entry and that 2027 details will be published later. The requirements it
 * currently serves — AAA, grade A in Mathematics and Physics, contextual AAC —
 * are therefore 2026 figures and are NOT imported, in line with the rule that a
 * page on the wrong entry cycle cannot supply 2027 requirements.
 *
 * The identity is a different question and it is answered: KCL publishes this
 * course, under this title, under this code.
 */
const kclAstrophysics: Course = awaitingCourse({
  slug: 'kcl-physics-with-astrophysics-and-cosmology-bsc',
  universityId: 'kcl',
  name: 'Physics with Astrophysics and Cosmology',
  category: 'physics',
  sub: 'astrophysics',
  degree: 'BSc',
  years: 3,
  code: 'FF35',
  year: '2027',
  identityVerification: 'official-page',
  identityNote:
    'KCL’s own course page and its dedicated entry-requirements page were both read. Both print the title "Physics with Astrophysics and Cosmology BSc", UCAS code FF35 and a three-year duration. THE SCAFFOLD ROW THIS REPLACES SAID "Physics with Astrophysics BSc, F3F5" — the title was truncated and the code was wrong. A course named "Physics with Astrophysics" does not exist at KCL; the word "Cosmology" is part of the degree title, not decoration.',
  officialUrl:
    'https://www.kcl.ac.uk/study/undergraduate/courses/physics-with-astrophysics-and-cosmology-bsc',
  notes:
    'IDENTITY VERIFIED, REQUIREMENTS DELIBERATELY NOT IMPORTED — AND THE REASON IS KCL’S OWN WORDS. The page header reads September 2027, but the page also states that "course details apply to 2026 entry" and that "Details for 2027 entry for our undergraduate courses will be published from September 2026." The figures it currently serves are therefore 2026 figures. They were read and are recorded here as evidence of what the page says rather than as this record’s requirements: AAA with grade A in Mathematics and Physics, contextual AAC, plus the practical-endorsement statement. NONE of that is stored as a 2027 offer, and nothing has been carried across from KCL’s Physics MSci F303, whose page carries no such disclaimer and IS imported as 2027. Two KCL pages, read the same day, at different stages of rollover — which is exactly the page-by-page pattern Southampton established in Batch 6.',
});

/* ==================================================================  */
/* Queen Mary University of London — SUPERSEDED IN v0.9                 */
/* ==================================================================  */
/*
 * v0.8 held four identity-only Queen Mary rows here. Its reasoning was correct
 * on every point that could be checked at the time: the programmes were real,
 * the UCAS codes the scaffold asserted had no provenance and were stripped, and
 * the whole set stayed awaiting-data because Queen Mary's course finder
 * returned redirect loops under text fetch.
 *
 * v0.9 reached that course finder in a rendered browser, and it turned out to be
 * the most complete source any university in this catalogue publishes. All four
 * rows are replaced by verified records in courses.v09.qmul.ts, and the outcome
 * vindicates the caution twice over:
 *
 *   · THREE OF THE FOUR SCAFFOLD CODES WERE WRONG. Biomedical Engineering is
 *     HBF2, not H160 (which is York's). Materials Science and Engineering is
 *     J511, not J500 (which is Manchester's and Sheffield's). Only Physics F300
 *     was right. Had v0.8 trusted them, the catalogue would have shipped three
 *     wrong codes at the one university it could not otherwise verify.
 *   · ASTROPHYSICS IS NOT AN APPLICATION AT ALL. Queen Mary publishes it as a
 *     stream inside Physics, chosen after year one, with no course page and no
 *     code of its own. The v0.8 row asserted an application a student cannot
 *     make — which is exactly why it was kept awaiting-data rather than promoted
 *     on the strength of a department page.
 */

/* ================================================================== */
/* University of Bath                                                  */
/* ================================================================== */

const bathEee: Course = course({
  slug: 'bath-electrical-and-electronic-engineering-meng',
  universityId: 'bath',
  name: 'Electrical and Electronic Engineering',
  category: 'engineering',
  sub: 'electrical',
  degree: 'MEng',
  awardLabel: 'MEng (Hons)',
  years: 4,
  code: null,
  year: '2027',
  cycleNote:
    'Published requirements for 2027 entry. Both the course page and the department listing that links to it sit under Bath’s own /courses/undergraduate-2027/ path, and the page states a September 2027 start.',
  raw: 'AAA or A*AB including A in Mathematics and A in a second science or technology subject',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'AAA',
      required: [['Mathematics', 'A']],
      rawText:
        'AAA or A*AB including A in Mathematics and A in a second science or technology subject',
    }),
    offer({
      label: 'Typical offer — second published profile',
      gradeProfile: 'A*AB',
      required: [['Mathematics', 'A']],
      rawText:
        'AAA or A*AB including A in Mathematics and A in a second science or technology subject',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote:
    'Bath does not require or recommend Further Mathematics on this course. It appears only inside the separately headed alternative offer, as one of four ways to qualify for a reduced aggregate — "grade A in AS level Further Mathematics" or "grade B in a fourth A level where your four A levels include A level Further Mathematics". Being a route to a concession is not a preference, and it is not stored as one.',
  test: 'unknown',
  testNote:
    'No admissions test is mentioned on this course page. Bath does not state that no test is required either, so this is silence rather than a published "no admissions test".',
  interview: 'not-stated',
  interviewNote: 'No interview is mentioned on this course page.',
  contextual: {
    availability: 'yes',
    details:
      'Under Bath’s own "A level Contextual offer" heading: "ABB including A in Mathematics and B in one other science or technology subject". Note what moves and what does not — the aggregate drops two grades and the Mathematics A is UNCHANGED, while the second subject drops from A to B. Bath publishes a separately headed "A level Alternative offer" as well: "AAB including A in Mathematics and A in one other science or technology subject plus one of: grade A in an EPQ or IEPQ; grade A in AS level Further Mathematics; grade B in a fourth A level where your four A levels include A level Further Mathematics; an appropriate grade in any other project qualification". That alternative depends on an EPQ, an AS level or a fourth A level, none of which this tool holds, so it is recorded as published information rather than matched.',
  },
  gcse:
    'Bath publishes one GCSE rule on this page: "GCSE English Language or Literature grade 4 or C (or equivalent from English language category C)". No GCSE Mathematics or Science requirement is published.',
  studyOptions: [],
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'Bath’s own 2027-entry Electronic and Electrical Engineering department listing enumerates twelve courses and names "Electrical and Electronic Engineering MEng (Hons) — 4 years" among them; that course’s own 2027 page was then read in full. THE SCAFFOLD GUESSED RIGHT ABOUT THIS ONE, which is exactly why unevidenced rows could not simply be deleted: absence of evidence was not evidence of absence, and here the course is real.',
  officialUrl:
    'https://www.bath.ac.uk/courses/undergraduate-2027/electronic-and-electrical-engineering/meng-electrical-and-electronic-engineering/',
  sourceUrl:
    'https://www.bath.ac.uk/courses/undergraduate-2027/electronic-and-electrical-engineering/meng-electrical-and-electronic-engineering/',
  sourceTitle: 'Electrical and Electronic Engineering MEng (Hons) - University of Bath',
  lastVerified: READ_ON,
  notes:
    'NO UCAS CODE, AND THAT IS BATH’S PRACTICE RATHER THAN A GAP IN OURS. Bath publishes no UCAS code in the body of any course page, and its course-search page, which does carry codes, is disallowed by bath.ac.uk’s robots.txt. Every one of the catalogue’s other Bath records carries no code for the same reason, and three Bath codes that HAD been asserted were stripped in Batch 7 as unsourced. THE SUBJECT RULE IS "MATHEMATICS PLUS A SECOND SCIENCE OR TECHNOLOGY SUBJECT" — an open category rather than a named subject, so only the Mathematics A is stored as a structured requirement and the second-subject rule is preserved verbatim in the offer text rather than flattened into a guess about which subjects qualify. BATH PUBLISHES TWO GRADE PROFILES FOR ONE OFFER, "AAA or A*AB", and both are stored as separate pathways rather than collapsed to the lower one: a student holding A*AB meets this offer and would be told otherwise by a catalogue that kept only AAA. BATH’S 2027 LISTING ALSO NAMES COURSES THIS CATALOGUE DOES NOT HOLD — Computer Systems Engineering at BEng and MEng, Electronic Engineering with Space Science and Technology at BEng and MEng, and placement-year forms of several — recorded here as a known omission rather than imported, because v0.8 is a closure stage and not an ingestion wave.',
});

/* ================================================================== */
/* Exports                                                             */
/* ================================================================== */

/** v0.8 records with verified admissions data — these earn 2028 shells. */
export const v08VerifiedCourses: Course[] = [...kclCourses, bathEee];

/** v0.8 records whose identity is evidenced but whose requirements are not. */
export const v08AwaitingCourses: Course[] = [kclAstrophysics];

export const v08ClosureCourses: Course[] = [...v08VerifiedCourses, ...v08AwaitingCourses];

/**
 * The eight rows that carried no identity evidence at the v0.8 baseline, by the
 * slug of the record that now answers for each. Exported so the assertion suite
 * can prove every one was actually resolved rather than quietly dropped.
 */
export const V08_RESOLVED_UNEVIDENCED: readonly {
  university: string;
  scaffold: string;
  outcome: 'verified' | 'identity-evidenced';
}[] = [
  { university: 'kcl', scaffold: 'Physics MSci F303', outcome: 'verified' },
  { university: 'kcl', scaffold: 'Engineering MEng H100', outcome: 'verified' },
  { university: 'kcl', scaffold: 'Physics with Astrophysics BSc F3F5', outcome: 'identity-evidenced' },
  { university: 'qmul', scaffold: 'Physics BSc F300', outcome: 'identity-evidenced' },
  { university: 'qmul', scaffold: 'Astrophysics BSc F510', outcome: 'identity-evidenced' },
  { university: 'qmul', scaffold: 'Biomedical Engineering BEng H160', outcome: 'identity-evidenced' },
  { university: 'qmul', scaffold: 'Materials Science and Engineering BEng J500', outcome: 'identity-evidenced' },
  { university: 'bath', scaffold: 'Electrical and Electronic Engineering MEng', outcome: 'verified' },
] as const;
