/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 6, PART A: THE UNIVERSITY OF SOUTHAMPTON
 *  2027 entry (2027/28). Read from Southampton's own course pages on
 *  2026-09-16.
 * ---------------------------------------------------------------------------
 *  THE BATCH 4 CONCLUSION ABOUT SOUTHAMPTON WAS WRONG, AND IS CORRECTED HERE.
 *
 *  Batch 4 recorded that Southampton gates its 2027/28 entry-requirements
 *  panels behind JavaScript and that no 2027 data could be obtained. That is
 *  wrong as a general claim. Southampton renders the panel SERVER-SIDE on most
 *  course pages, under the heading “Entry requirements” / “For Academic year
 *  202728”, corroborated by the Modules label “For entry in academic year 2027
 *  to 2028”. No cycle parameter, no login, no workaround. 29 pages were read;
 *  23 served a confirmed 2027/28 panel.
 *
 *  But the Batch 4 observation was not imaginary — it describes a real pattern
 *  affecting a minority of pages. CYCLE ROLLOVER AT SOUTHAMPTON IS PER PAGE,
 *  NOT SITE-WIDE, and siblings diverge:
 *
 *      J641 Maritime MEng serves 2027   ·   J640 Maritime BEng does not
 *      H610 Electronic BEng serves 2027 ·   H603 Electronic MEng does not
 *      HH72 Acoustical BEng serves 2027 ·   H722 Acoustical MEng does not
 *
 *  So no sibling's 2027 offer is ever inferred from another's. The six pages
 *  that would not yield 2027 data are recorded here as `awaiting-data` course
 *  IDENTITY ONLY. Their 2026/27 figures were seen and are quarantined in the
 *  research file; not one of them is imported here, in any field.
 *
 *  ---------------------------------------------------------------------------
 *  FOUR THINGS ABOUT SOUTHAMPTON THAT SHAPE THESE RECORDS
 *  ---------------------------------------------------------------------------
 *
 *  1. SHARED UCAS CODES ARE REAL — BUT ONLY IN THREE PLACES.
 *
 *     F303 carries FOUR separately named MPhys degrees. Each of the four pages
 *     independently prints “When you apply use: UCAS course code: F303”, so
 *     this is four confirmations from four pages, not an inference. F3FM
 *     carries TWO. J641 carries SIX named Year-2 pathways. Those are study
 *     options on ONE record each — never separate applications.
 *
 *     Everywhere else the hypothesis FAILS, and flattening it would be wrong.
 *     F300, F3GC, F3FX, F391 and F3QT each have their own code. So do the
 *     Aeronautics “slash” streams (H401, H422, H490, H493, HH34), which read
 *     like sub-routes and are not. Each of those is its own course record.
 *
 *  2. THE PHYSICS OFFERS ARE RANGES, AND SOUTHAMPTON NEVER DEFINES THEM.
 *
 *     Every MPhys prints “A*AA-AAA …”; the BSc prints “AAA-AAB …”. Nowhere on
 *     any page is the meaning of the range explained — the only adjacent
 *     sentence is the optional-interview one. The ranges are therefore stored
 *     exactly as printed and are deliberately NOT scorable, so these courses
 *     report “review required” rather than a verdict the university's own
 *     wording does not support. Same treatment as Glasgow's range and
 *     Edinburgh's band.
 *
 *  3. BEng IS NOT ALWAYS A LOWER OFFER THAN MEng HERE.
 *
 *     Aeronautics BEng H422 carries the SAME A*AA as the MEng H401. But
 *     Mechanical, EEE and Electronic BEngs *are* a grade lower. Checked per
 *     course; never assumed.
 *
 *  4. THE SECOND-SUBJECT RULE IS THE REAL DISCRIMINATOR BETWEEN ENGINEERING
 *     COURSES, AND IT VARIES SHARPLY:
 *
 *       Civil H201       — Mathematics ONLY. No second subject at all.
 *       Mechanical / A&A — Mathematics AND Physics, both compulsory.
 *       ECS H600/H602/H610 — Maths + one of physics, further mathematics,
 *                            electronics or computer science.
 *       Maritime J641    — Maths + one of physics, chemistry or further maths.
 *       Biomedical BB97  — Maths + one of biology, chemistry or physics.
 *       Acoustical HH72  — Maths + one of an ELEVEN-subject list that admits
 *                          Psychology, Statistics, Geography and Geology.
 *
 *  ---------------------------------------------------------------------------
 *  WHAT IS DELIBERATELY NOT STORED
 *  ---------------------------------------------------------------------------
 *
 *  · CONTEXTUAL OFFERS are stored as contextual information, never as an offer
 *    pathway, so they can never flatter an eligibility verdict.
 *  · EPQ ROUTES are stored as notes, not pathways. We do not hold a student's
 *    EPQ, so an EPQ pathway would be unevaluable.
 *  · ADMISSIONS TESTS: no Southampton Physics or Engineering page read mentions
 *    any test — and none says a test is not required. That is SILENCE, recorded
 *    as `unknown`, never as “no admissions test”.
 *  · WIDENING PARTICIPATION / CARE-EXPERIENCED / REFUGEE routes are absent from
 *    every course page read. Recorded as not published on the course page.
 *  · The `Show more entry requirements` routes (Access to HE, Irish Leaving
 *    Certificate, Scottish Highers, Welsh Baccalaureate, T Level) sit behind an
 *    expand control and were NOT RETRIEVED. They exist; they were not read.
 *  · MAXIMUM DURATION and APPLICATION DEADLINES are not published on any
 *    Southampton course page read.
 *
 *  ---------------------------------------------------------------------------
 *  THREE SCAFFOLD IDENTITIES CORRECTED (see courses.physics.ts /
 *  courses.engineering.ts)
 *  ---------------------------------------------------------------------------
 *      “Physics with Astronomy MPhys”     scaffold F3F5 → real code F3FM
 *      “Aeronautics and Astronautics MEng” scaffold H400 → real code H401
 *      “Electronic Engineering MEng”      scaffold H610 → H610 is the BEng
 *                                         code; the MEng is H603
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { awaitingCourse, course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-16';

const S = (slug: string) => `https://www.southampton.ac.uk/courses/${slug}`;

const CYCLE =
  'Published requirements for 2027 entry. The page’s own entry-requirements panel is headed “For Academic year 202728”, corroborated by its Modules label “For entry in academic year 2027 to 2028”. This is not confirmed 2028 data.';

const NO_TEST_NOTE =
  'No admissions test is mentioned in any form on this course page, and Southampton does not state that no test is required either. A targeted whole-page search for “admissions test”, “entrance test”, “aptitude test”, ESAT, PAT, TMUA and “written test” returned no mention on any of the 29 Southampton pages read. This is silence, not a published “no admissions test”.';

const EXCLUSIONS =
  'Southampton prints one genuinely university-wide rule on all 29 pages read: “Offers typically exclude General Studies and Critical Thinking.”';

const GCSE =
  'Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C).';

const NO_DEADLINE_NOTE =
  'Southampton publishes no application deadline on any course page read, so none is recorded here.';

const SHOW_MORE_NOTE =
  'Southampton holds its Access to HE Diploma, Irish Leaving Certificate, Scottish Highers, Welsh Baccalaureate and T Level routes behind a “Show more entry requirements” control that could not be expanded. Those routes exist and were NOT RETRIEVED — that is different from Southampton not publishing them.';

const WP_ABSENT_NOTE =
  'No widening-participation, care-experienced, refugee or access-programme reduced-offer heading appears on this page. Southampton publishes only a generic contextual-offer heading. No central widening-participation policy page was located, so nothing is recorded for those routes.';

/* ------------------------------------------------------------------ */
/* Physics                                                             */
/* ------------------------------------------------------------------ */

const PHYSICS_INTERVIEW_NOTE =
  'Southampton states on every Physics page read: “Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.” The interview is optional and can only help, so it never blocks a match here.';

const ENG_INTERVIEW_NOTE =
  'No interview is mentioned anywhere on this page. Interview policy splits cleanly by school at Southampton: every Physics page explicitly offers an optional, offer-reducing interview, while no Engineering page mentions an interview at all. Southampton does not say “no interview”, so this is silence.';

const PHYSICS_PRACTICAL =
  'Science practical endorsement, verbatim: “A pass in the physics Practical exam is required where it is separately endorsed.”';

const RANGE_NOTE =
  'THE OFFER IS A RANGE AND SOUTHAMPTON NEVER DEFINES IT. The page prints the range and no explanation of what moves an applicant within it; the only adjacent sentence is the optional-interview one. The range is stored exactly as printed and is deliberately not scored against a grade profile, so this course reports “review required” rather than a verdict Southampton’s own wording does not support.';

const FM_ALTERNATIVE_NOTE =
  'Further Mathematics is accepted as an ALTERNATIVE to Mathematics on this course, not as an additional subject and not for any grade reduction. Southampton’s wording is “either mathematics or further mathematics (minimum grade A)”. That acceptance is modelled structurally in the pathway constraint rather than as a stated preference, so this field records that Southampton expresses no preference between them.';

const FM_SECOND_SUBJECT_NOTE =
  'Further Mathematics is accepted as one of the acceptable SECOND subjects, alongside the others listed in the pathway constraint. It is not a substitute for Mathematics, which is separately required, and it carries no grade reduction.';

/*
 * These pages were read in full and say nothing about Further Mathematics. That
 * is a finding about what Southampton PUBLISHES, not a gap in our research, so
 * the value is "no stated preference" — which the app renders as "The
 * university publishes no stated preference either way". It is deliberately NOT
 * "not required" (Southampton never says that) and deliberately NOT "unknown"
 * (which would mean we had not looked, and would stop the whole course from
 * being checkable over a field that does not bear on the published offer).
 */
const FM_NOT_MENTIONED_NOTE =
  'Further Mathematics is not mentioned anywhere on this page — it is neither required nor named as a substitute for Mathematics or Physics. The page was read in full, so this is Southampton publishing no preference either way, and it is recorded as that rather than as “not required”.';

/** One shared MPhys physics offer shape: a range, plus a four-subject range. */
const physicsMPhysOffers = () => [
  offer({
    label: 'Standard offer (three A-Levels)',
    gradeProfile: 'A*AA-AAA',
    required: [['Physics', 'A']],
    constraints: [
      oneOf(
        ['Mathematics', 'Further Mathematics'],
        'A',
        'Either mathematics or further mathematics (minimum grade A).',
      ),
    ],
    rawText:
      'A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)',
    notes: RANGE_NOTE,
  }),
  offer({
    label: 'Four-A-Level offer',
    gradeProfile: 'AABB-AABC',
    required: [['Physics', 'A']],
    constraints: [
      oneOf(
        ['Mathematics', 'Further Mathematics'],
        'A',
        'Either mathematics or further mathematics (minimum grade A).',
      ),
    ],
    appliesOnlyIfTakingAtLeast: 4,
    rawText:
      'AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)',
    notes:
      'A four-subject string, published by Southampton as an alternative to the three-subject offer rather than as a reduction. It applies only to applicants taking at least four A-Levels — a three-A-Level applicant does not fail it, it does not apply to them. Also a range, and also undefined.',
  }),
];

const physicsContextual = (details: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under Southampton’s own heading “A-levels contextual offer”: ${details} Southampton’s standing contextual paragraph reads: “We are committed to ensuring that all learners with the potential to succeed, regardless of their background, are encouraged to apply to study with us. The additional information gained through contextual data allows us to recognise a learner’s potential to succeed in the context of their background and experience. Applicants who are highlighted in this way will be made an offer which is lower than the typical offer for that programme as follows:”. ${WP_ABSENT_NOTE}`,
});

const MPHYS_CONTEXTUAL = physicsContextual(
  '“AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A).”',
);

/** The four named MPhys degrees that share UCAS code F303. */
const F303_OPTIONS: StudyOption[] = [
  {
    name: 'Physics',
    description:
      'The parent named degree. Its page prints “When you apply use: UCAS course code: F303”.',
    ucasCode: 'F303',
    chosenWhen: null,
    officialUrl: S('physics-degree-mphys'),
  },
  {
    name: 'Physics with Industrial Placement',
    description:
      'A separately named MPhys with its own page, which itself prints “When you apply use: UCAS course code: F303”. It is a route within this one application, not a separate application.',
    ucasCode: 'F303',
    chosenWhen: null,
    officialUrl: S('physics-with-industrial-placement-degree-mphys'),
  },
  {
    name: 'Physics with Year of Experimental Research',
    description:
      'A separately named MPhys with its own page, which itself prints “When you apply use: UCAS course code: F303”. Southampton’s own listing title string reads “F303 MPhys Physics with Year of Experimental Research 4426 (4 years)”.',
    ucasCode: 'F303',
    chosenWhen: null,
    officialUrl: S('physics-with-year-of-experimental-research-degree-mphys'),
  },
  {
    name: 'Particle Physics with Research Year Abroad',
    description:
      'A separately named MPhys with its own page, which itself prints “When you apply use: UCAS course code: F303” and “UCAS institution code: S27”. Reads like a separate degree; is not a separate application.',
    ucasCode: 'F303',
    chosenWhen: null,
    officialUrl: S('particle-physics-with-research-year-abroad-degree-mphys'),
  },
];

/** The two named MPhys degrees that share UCAS code F3FM. */
const F3FM_OPTIONS: StudyOption[] = [
  {
    name: 'Physics with Astronomy',
    description: 'The parent named degree for UCAS code F3FM.',
    ucasCode: 'F3FM',
    chosenWhen: null,
    officialUrl: S('physics-with-astronomy-degree-mphys'),
  },
  {
    name: 'Astrophysics with Year Abroad',
    description:
      'A separately named MPhys with its own page, which prints “When you apply use: UCAS course code: F3FM” and “UCAS institution code: S27” — so it is a route within this application. Its own page serves 2026/27 requirements rather than 2027/28, so no requirement figure is taken from it; only the code evidence, which is year-independent page furniture.',
    ucasCode: 'F3FM',
    chosenWhen: null,
    officialUrl: S('astrophysics-with-year-abroad-degree-mphys'),
  },
];

/** The six named Year-2 pathways inside the single Maritime MEng application. */
const J641_OPTIONS: StudyOption[] = [
  'Advanced Computational Engineering',
  'Marine Engineering and Autonomy',
  'Naval Architecture',
  'International Naval Architecture',
  'Ocean Energy and Offshore Engineering',
  'Yacht and High Performance Craft',
].map((name) => ({
  name,
  description:
    'One of six named pathways published under the single UCAS code J641. Chosen in Year 2, not applied for separately. The BEng sibling J640 publishes no Year-2 pathways at all — these belong to the MEng only.',
  ucasCode: 'J641',
  chosenWhen: 'In Year 2, after admission.',
  officialUrl: S('maritime-engineering-degree-meng'),
}));

/* ------------------------------------------------------------------ */
/* Engineering helpers                                                 */
/* ------------------------------------------------------------------ */

const engContextual = (details: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under Southampton’s own contextual-offer heading: ${details} Contextual offers at Southampton are not a uniform reduction — they range from AAB through ABB and AAC to BBB, and several drop a SUBJECT minimum rather than the aggregate. ${WP_ABSENT_NOTE}`,
});

const ENG_PRACTICAL_IN_OFFER =
  'The science practical endorsement is embedded inside the offer string itself rather than published separately: “with a pass in the physics Practical (where it is separately endorsed)”.';

const NO_PRACTICAL_NOTE =
  'No science practical endorsement is mentioned on this page — notably absent, unlike the Mechanical and Aeronautics pages which embed a physics-practical pass inside the offer string itself. Recorded as unpublished, not as “not required”.';

/* ------------------------------------------------------------------ */
/* Verified 2027 records                                               */
/* ------------------------------------------------------------------ */

export const batch6SouthamptonCourses: Course[] = [
  /* ---------------------------- Physics ---------------------------- */
  course({
    slug: 'southampton-physics-mphys',
    universityId: 'southampton',
    name: 'Physics (MPhys)',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F303',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), or AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: physicsMPhysOffers(),
    fm: 'no-stated-preference',
    fmNote: FM_ALTERNATIVE_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: MPHYS_CONTEXTUAL,
    gcse: GCSE,
    studyOptions: F303_OPTIONS,
    verification: 'verified',
    officialUrl: S('physics-degree-mphys'),
    sourceUrl: S('physics-degree-mphys'),
    sourceTitle: 'Physics Degree | MPhys | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `FOUR NAMED MPhys DEGREES SHARE THIS ONE UCAS CODE. Southampton’s related-courses listing assigns F303 to Physics, Physics with Industrial Placement, Physics with Year of Experimental Research and Particle Physics with Research Year Abroad, and each of those four pages independently prints “When you apply use: UCAS course code: F303”. Four confirmations from four separate pages. They are recorded as named routes within this single application and never as separate courses. ${PHYSICS_PRACTICAL} ${EXCLUSIONS} EPQ route, verbatim: “If you are taking an EPQ in addition to three A levels, you will receive the following offer in addition to the standard A level offer: AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ”. Stored as a note rather than a pathway, because the profile does not record an EPQ. IB route: “Pass, with 38-36 points overall, with 19-18 points required at Higher Level, including 6 at Higher Level in mathematics (Analysis and Approaches or Applications and Interpretation) and 6 at Higher Level in physics”. Foundation-year route, verbatim: “Applicants who have not studied mathematics/further mathematics and/or physics at A-level can apply for the Engineering/Physics/Mathematics Foundation Year”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-physics-bsc',
    universityId: 'southampton',
    name: 'Physics (BSc)',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'AAA-AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        label: 'Standard offer (three A-Levels)',
        gradeProfile: 'AAA-AAB',
        required: [['Physics', 'A']],
        constraints: [
          oneOf(
            ['Mathematics', 'Further Mathematics'],
            'A',
            'Either mathematics or further mathematics (minimum grade A).',
          ),
        ],
        rawText:
          'AAA-AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)',
        notes: RANGE_NOTE,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_ALTERNATIVE_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: physicsContextual(
      '“ABB including grades AB in physics and either mathematics or further mathematics.”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('physics-degree-bsc'),
    sourceUrl: S('physics-degree-bsc'),
    sourceTitle: 'Physics Degree (Hons) | BSc | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `F300 IS ITS OWN CODE AND ITS OWN APPLICATION — the BSc carries no shared-code wording and is not part of the F303 family. ONLY THE THREE-SUBJECT OFFER IS STORED. The page also serves four-subject strings (“AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)” and “ABBC including grades AB in physics and either mathematics or further mathematics”), but the retrieval could not pair those two strings to their headings with confidence, so neither is stored as a pathway. Southampton’s own subject-listing page independently tabulates “BSc Physics — Typical offer: AAA-AAB”, which corroborates the three-subject figure. ${PHYSICS_PRACTICAL} ${EXCLUSIONS} EPQ route: “AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A) plus grade A in the EPQ”. IB: “36-34 points overall with 18-17 points at Higher Level, including 6 at Higher Level in Mathematics and 6 at Higher Level in Physics”. BTEC (RQF): “D in the BTEC Extended Certificate plus grades AA from two A-levels including physics and either mathematics or further mathematics.” ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-physics-with-astronomy-mphys',
    universityId: 'southampton',
    name: 'Physics with Astronomy (MPhys)',
    category: 'physics',
    sub: 'physics-with-astronomy',
    degree: 'MPhys',
    years: 4,
    code: 'F3FM',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), or AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: physicsMPhysOffers(),
    fm: 'no-stated-preference',
    fmNote: FM_ALTERNATIVE_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: MPHYS_CONTEXTUAL,
    gcse: GCSE,
    studyOptions: F3FM_OPTIONS,
    verification: 'verified',
    officialUrl: S('physics-with-astronomy-degree-mphys'),
    sourceUrl: S('physics-with-astronomy-degree-mphys'),
    sourceTitle: 'Physics with Astronomy | MPhys | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `THIS IS THE PAGE BATCH 4 RECORDED AS JAVASCRIPT-GATED ON 2026/27. It is not — it served a clean 2027/28 panel on this run, and the earlier negative does not reproduce. TWO NAMED MPhys DEGREES SHARE F3FM: this one and “Astrophysics with Year Abroad”, whose own page prints “When you apply use: UCAS course code: F3FM”. That second page serves 2026/27 requirements, so nothing but its code evidence is taken from it. The scaffold record this replaces carried UCAS code F3F5, which is wrong; Southampton’s own pages and its subject listing both give F3FM. ${PHYSICS_PRACTICAL} ${EXCLUSIONS} EPQ route: “AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ”. IB: “38-36 points overall, with 19-18 points required at Higher Level, including 6 at Higher Level in mathematics (Analysis and Approaches or Applications and Interpretation) and 6 at Higher Level in physics”. BTEC (RQF): “D*-D in the BTEC National Extended Certificate plus grades AA-A*A in A-level physics and A-level mathematics or further mathematics.” ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-physics-with-space-science-mphys',
    universityId: 'southampton',
    name: 'Physics with Space Science (MPhys)',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F3FX',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), or AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: physicsMPhysOffers(),
    fm: 'no-stated-preference',
    fmNote: FM_ALTERNATIVE_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: MPHYS_CONTEXTUAL,
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('physics-with-space-science-degree-mphys'),
    sourceUrl: S('physics-with-space-science-degree-mphys'),
    sourceTitle: 'Physics with Space Science | MPhys | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `ITS OWN CODE, ITS OWN APPLICATION — F3FX is not part of the F303 or F3FM shared families, even though it is a named physics variant like the ones that are. Southampton’s own listing title string reads “F3FX MPhys Physics with Space Science 4414 (4 years)”. Filed under the general Physics subcategory because this catalogue has no Space Science heading and inventing one would misstate Southampton’s own classification; the full course name is preserved exactly. ${PHYSICS_PRACTICAL} ${EXCLUSIONS} EPQ route: “AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ”. IB: “38-36 points overall, with 19-18 points at Higher Level, including 6 at HL in mathematics and 6 at HL in physics”. BTEC: “D*-D in BTEC National Extended Certificate plus grades AA-A*A in A-level physics and mathematics/further mathematics”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-physics-with-artificial-intelligence-mphys',
    universityId: 'southampton',
    name: 'Physics with Artificial Intelligence (MPhys)',
    category: 'physics',
    sub: 'physics-with-computing',
    degree: 'MPhys',
    years: 4,
    code: 'F391',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), or AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: physicsMPhysOffers(),
    fm: 'no-stated-preference',
    fmNote: FM_ALTERNATIVE_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: MPHYS_CONTEXTUAL,
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('physics-with-artificial-intelligence-masters-mphys'),
    sourceUrl: S('physics-with-artificial-intelligence-masters-mphys'),
    sourceTitle: 'Physics with Artificial Intelligence | MPhys | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `DISCREPANCY BETWEEN TWO OFFICIAL SOUTHAMPTON PAGES, FLAGGED RATHER THAN SILENTLY RESOLVED: the subject-listing page tabulates this course’s typical offer as “A*AA” with no range, while the course page itself serves “A*AA-AAA”. The course page is the more detailed source and is what is stored; the listing page carries no academic-year label at all, so it could not have served as a 2027 source in any case. ITS OWN CODE — F391 is not part of the F303 or F3FM families. Southampton’s own listing title string reads “F391 MPhys Physics with Artificial Intelligence 9431 (4 years)”. ${PHYSICS_PRACTICAL} ${EXCLUSIONS} EPQ route: “AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ”. IB: “38-36 points overall, with 19-18 points required at Higher Level, including 6 at Higher Level in mathematics and 6 at Higher Level in physics”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-physics-with-quantum-science-and-technologies-mphys',
    universityId: 'southampton',
    name: 'Physics with Quantum Science and Technologies (MPhys)',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    code: 'F3QT',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), or AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: physicsMPhysOffers(),
    fm: 'no-stated-preference',
    fmNote: FM_ALTERNATIVE_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote: PHYSICS_INTERVIEW_NOTE,
    contextual: MPHYS_CONTEXTUAL,
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('physics-with-quantum-science-technologies-degree-mphys'),
    sourceUrl: S('physics-with-quantum-science-technologies-degree-mphys'),
    sourceTitle: 'MPhys Physics with Quantum Science | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `ITS OWN CODE — F3QT prints “When you apply use: UCAS course code: F3QT; UCAS institution code: S27” on its own page, so it is a separate application and not part of the F303 family. SLUG TRAP: the obvious URL ending “-quantum-science-and-technologies-degree-mphys” does NOT resolve and redirects to Southampton’s CourseFinder index; the working slug omits the word “and”. Southampton’s own listing title string reads “F3QT MPhys Physics with Quantum Science and Technologies 9111 (4 years)”. ${PHYSICS_PRACTICAL} ${EXCLUSIONS} EPQ route: “AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ”. IB: “38-36 points overall, with 19-18 points at Higher Level, including 6 at Higher Level in mathematics and 6 at Higher Level in physics”. BTEC: “D*-D in BTEC National Extended Certificate plus grades AA-A*A in A-level physics and mathematics/further mathematics”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* -------------------- Aeronautics and Astronautics ---------------- */
  course({
    slug: 'southampton-aeronautics-and-astronautics-meng',
    universityId: 'southampton',
    name: 'Aeronautics and Astronautics (MEng)',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H401',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).',
        notes:
          'A single string, not a range — unlike every Southampton Physics offer. Not to be normalised to AAA.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('aeronautics-astronautics-degree-meng'),
    sourceUrl: S('aeronautics-astronautics-degree-meng'),
    sourceTitle: 'Aeronautics and Astronautics | MEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `THE A&A “SLASH” STREAMS ARE SEPARATE UCAS APPLICATIONS, NOT ROUTES INSIDE THIS ONE, despite reading like sub-routes: H422 (BEng), H490 (/Aerodynamics), H493 (/Spacecraft Engineering) and HH34 (Mechanical Engineering / Aerospace Engineering) each print their own “When you apply use” code. Each is its own record here. Southampton’s own listing title string reads “H401 MEng Aeronautics and Astronautics 3825 (4 years)”. The scaffold record this replaces carried UCAS code H400, which is wrong. BOTH subjects are compulsory here — unlike the Physics degrees, where Further Mathematics may substitute for Mathematics. ${ENG_PRACTICAL_IN_OFFER} ${EXCLUSIONS} EPQ route: “AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed) plus grade A in the EPQ”. IB: “38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics”. BTEC (RQF): “D in the BTEC National Extended Certificate plus grades A*A in A-level mathematics and physics” or “D* in the BTEC National Extended Certificate plus grades AA in A-level mathematics and physics”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-aeronautics-and-astronautics-beng',
    universityId: 'southampton',
    name: 'Aeronautics and Astronautics (BEng)',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'BEng',
    years: 3,
    code: 'H422',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).',
        notes:
          'THE SAME A*AA AS THE FOUR-YEAR MEng H401. There is no grade reduction for the three-year route here.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and physics (minimum grade A).”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('aeronautics-astronautics-degree-beng'),
    sourceUrl: S('aeronautics-astronautics-degree-beng'),
    sourceTitle: 'Aeronautics and Astronautics | BEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `BEng IS NOT A LOWER OFFER THAN MEng HERE — this carries the same A*AA as H401. Southampton’s Mechanical, EEE and Electronic BEngs *are* a grade lower than their MEng siblings, so the pattern must be checked per course and never assumed. Southampton’s own listing title string reads “H422 BEng Aeronautics and Astronautics 3810 (3 years)”. ${ENG_PRACTICAL_IN_OFFER} ${EXCLUSIONS} The EPQ route was returned with an ellipsis mid-string and its exact full wording is NOT RETRIEVED, so it is not quoted here; the elided clause appears to be the physics-practical wording carried by the MEng sibling, but that has not been imported. IB: “38 points overall with 19 points at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics”. BTEC routes are listed but their exact strings were NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-aeronautics-and-astronautics-aerodynamics-meng',
    universityId: 'southampton',
    name: 'Aeronautics and Astronautics / Aerodynamics (MEng)',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H490',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('aeronautics-astronautics-aerodynamics-degree-meng'),
    sourceUrl: S('aeronautics-astronautics-aerodynamics-degree-meng'),
    sourceTitle: 'Aerodynamics | Aeronautics & Astronautics | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `THIS RECORD EXISTS BECAUSE A CACHE-BUSTING RE-READ SETTLED AN AMBIGUOUS PAGE. The first read of this page could not establish which YEAR block the requirements sat under, so nothing from it was recorded as 2027. A second read with the query string “?v=2” reported verbatim that the content sits under “For Academic year 202728” and that all three offers are inside the 2027/28 section. Only then were these figures recorded. The first read also returned the fuller “(where it is separately endorsed)” clause that the second truncated; the fuller string is what is stored. H490 prints its own “When you apply use: UCAS course code: H490”, so it is a separate application and not a route inside H401. Southampton’s own listing title string reads “H490 MEng Aeronautics and Astronautics / Aerodynamics 3829 (4 years)”. ${ENG_PRACTICAL_IN_OFFER} ${EXCLUSIONS} EPQ route: “AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed) plus grade A in the EPQ”. IB: “38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics”. BTEC: “D in the BTEC National Extended Certificate plus grades A*A in A-level mathematics and physics”; the remaining BTEC combinations were NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-aeronautics-and-astronautics-spacecraft-engineering-meng',
    universityId: 'southampton',
    name: 'Aeronautics and Astronautics / Spacecraft Engineering (MEng)',
    category: 'engineering',
    sub: 'aeronautical',
    degree: 'MEng',
    years: 4,
    code: 'H493',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical. Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical.”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('aeronautics-astronautics-spacecraft-engineering-degree-meng'),
    sourceUrl: S('aeronautics-astronautics-spacecraft-engineering-degree-meng'),
    sourceTitle: 'Aerospace Spacecraft Engineering | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `A SEPARATE APPLICATION, NOT A ROUTE INSIDE H401 — the page prints “When you apply use: UCAS course code: H493 / UCAS institution code: S27”. Southampton’s own listing title string reads “H493 MEng Aeronautics and Astronautics / Spacecraft Engineering 3831 (4 years)”. ${ENG_PRACTICAL_IN_OFFER} ${EXCLUSIONS} EPQ route: “AAA including mathematics and physics, plus grade A in the EPQ”. IB: “38 points overall with 19 points at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics”. BTEC pathways are listed but their exact strings were NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* -------------------------- Mechanical ---------------------------- */
  course({
    slug: 'southampton-mechanical-engineering-meng',
    universityId: 'southampton',
    name: 'Mechanical Engineering (MEng)',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H301',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('mechanical-engineering-degree-meng'),
    sourceUrl: S('mechanical-engineering-degree-meng'),
    sourceTitle: 'MEng Mechanical Engineering | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `THE MECHANICAL NAMED STREAMS ARE SEPARATE UCAS APPLICATIONS, NOT ROUTES INSIDE THIS ONE. Southampton prints codes for each: BEng Mechanical Engineering H300; MEng Mechanical Engineering H301; MEng Mechanical Engineering / Aerospace Engineering HH34; / Automotive Engineering H390; / Biomedical Engineering 4R29; / Manufacturing HH38; / Mechatronics HH37; / Sustainable Energy Systems HH32; plus, verbatim, “Course name: Mechanical Engineering with Industrial Placement Year UCAS code: 30HH”. Only H301, H300 and HH34 were verified on a 2027/28 panel in this batch; the others are named here as identity evidence only and no requirements are claimed for them. CHEMISTRY IS NOT MENTIONED ON THIS PAGE — contrast Maritime Engineering, which does accept Chemistry as a second subject. ${ENG_PRACTICAL_IN_OFFER} ${EXCLUSIONS} EPQ route: “AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed) plus grade A in the EPQ”. IB: “38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics (Analysis and Approaches) or 7 at Higher Level in Mathematics (Applications and Interpretation)” — note the different Higher Level Maths grade depending on which IB Maths route is taken. BTEC routes exist but came back summarised rather than verbatim, so no exact BTEC string is imported for this course. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-mechanical-engineering-beng',
    universityId: 'southampton',
    name: 'Mechanical Engineering (BEng)',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'BEng',
    years: 3,
    code: 'H300',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed).',
        notes: 'A full grade below its MEng sibling H301, which asks A*AA.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“ABB including mathematics (minimum grade A) and physics (minimum grade B), with a pass in the physics Practical.” Note that the PHYSICS minimum drops to B on the contextual route while mathematics stays at A — Southampton’s contextual offers sometimes move a subject minimum rather than only the aggregate.',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('mechanical-engineering-degree-beng'),
    sourceUrl: S('mechanical-engineering-degree-beng'),
    sourceTitle: 'Mechanical Engineering | BEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `${ENG_PRACTICAL_IN_OFFER} ${EXCLUSIONS} The EPQ route was returned with an ellipsis mid-string (“AAB including mathematics (minimum grade A) and physics (minimum grade A)...plus grade A in the EPQ”) and its exact full wording is NOT RETRIEVED, so it is not stored as a complete quotation. IB: “36 points overall with 18 points required at Higher Level” — the Higher Level subject digits were NOT RETRIEVED and have not been copied from a sibling. BTEC: “D in the BTEC National Extended Certificate plus grades AA in A-level mathematics and physics”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-mechanical-engineering-aerospace-engineering-meng',
    universityId: 'southampton',
    name: 'Mechanical Engineering / Aerospace Engineering (MEng)',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 4,
    code: 'HH34',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical.”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('mechanical-engineering-aerospace-engineering-degree-meng'),
    sourceUrl: S('mechanical-engineering-aerospace-engineering-degree-meng'),
    sourceTitle: 'Mechanical Aerospace Engineering | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `A SEPARATELY CODED NAMED STREAM OF THE MECHANICAL FAMILY, NOT A ROUTE — the page prints “When you apply use: UCAS course code: HH34, UCAS institution code: S27”. Southampton’s own listing title string reads “HH34 MEng Mechanical Engineering / Aerospace Engineering 3844 (4 years)”. Science practical endorsement on this page is printed separately as “Physics Practical: pass (where separately endorsed)”. ${EXCLUSIONS} The EPQ route was returned with an ellipsis mid-string and its exact full wording is NOT RETRIEVED. IB: “38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics”. BTEC is accepted with specified A-level mathematics and physics requirements, but the exact strings were NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* ------------------------ ECS (electrical) ------------------------ */
  course({
    slug: 'southampton-electrical-and-electronic-engineering-meng',
    universityId: 'southampton',
    name: 'Electrical and Electronic Engineering (MEng)',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H602',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            ['Physics', 'Further Mathematics', 'Electronics', 'Computer Science'],
            'A',
            'Either physics, further mathematics, electronics or computer science (minimum grade A).',
          ),
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A)',
        notes:
          'THE WIDEST SECOND-SUBJECT LIST OF ANY SOUTHAMPTON ENGINEERING COURSE READ EXCEPT ACOUSTICAL. Physics is NOT compulsory here.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_SECOND_SUBJECT_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A).”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('electrical-electronic-engineering-degree-meng'),
    sourceUrl: S('electrical-electronic-engineering-degree-meng'),
    sourceTitle: 'Electrical & Electronic Engineering | MEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `MATHEMATICS CANNOT BE REPLACED BY FURTHER MATHEMATICS HERE — Mathematics is separately required and Further Mathematics sits in the SECOND-subject list. That is the opposite arrangement to Southampton’s Physics degrees, where Further Mathematics substitutes FOR Mathematics. CHEMISTRY IS NOT IN THE ACCEPTED SECOND-SUBJECT LIST: Southampton closes it to physics, further mathematics, electronics or computer science, so Chemistry alone would not satisfy it. NO SCIENCE PRACTICAL ENDORSEMENT IS MENTIONED on this page, unlike the Mechanical and Aeronautics pages. THE ECS FAMILY MEMBERS ARE SEPARATE UCAS APPLICATIONS: BEng EEE H600, MEng EEE H602, MEng Electrical Engineering H601, BEng Electronic Engineering H610, MEng Electronic Engineering H603, MEng Aerospace Electronic Engineering H402, and EEE with Industrial Studies HH60. ${EXCLUSIONS} EPQ route: “AAA including mathematics and either physics, further mathematics, electronics or computer science, plus grade A in the EPQ”. IB: “38 points overall, 19 at Higher Level”, with Higher Level Mathematics at 6 (Analysis and Approaches) or 7 (Applications and Interpretation), and Higher Level Physics or Computer Science at 6. BTEC: “D in Extended Certificate plus AA from two A-levels”, or D* plus AA A-levels — the exact BTEC subject wording was NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-electrical-and-electronic-engineering-beng',
    universityId: 'southampton',
    name: 'Electrical and Electronic Engineering (BEng)',
    category: 'engineering',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'H600',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'AAA including mathematics and either physics, further mathematics, electronics or computer science. Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            ['Physics', 'Further Mathematics', 'Electronics', 'Computer Science'],
            'A',
            'Either physics, further mathematics, electronics or computer science.',
          ),
        ],
        rawText:
          'AAA including mathematics and either physics, further mathematics, electronics or computer science',
        notes: 'A full grade below its MEng sibling H602, which asks A*AA.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_SECOND_SUBJECT_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAC including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A).” AAC is an unusual contextual string and is transcribed exactly rather than normalised to AAB or ABB.',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('electrical-electronic-engineering-degree-beng'),
    sourceUrl: S('electrical-electronic-engineering-degree-beng'),
    sourceTitle: 'Electrical & Electronic Engineering | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `Southampton’s own listing title string reads “H600 BEng Electrical and Electronic Engineering 5160 (3 years)”. Mathematics is separately required and is not replaceable by Further Mathematics; Chemistry is not in the accepted second-subject list. ${NO_PRACTICAL_NOTE} ${EXCLUSIONS} EPQ route: “AAB including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A), plus grade A in the EPQ”. IB: “36 points overall with 18 points required at Higher Level” — the Higher Level subject digits were NOT RETRIEVED for this course. They WERE retrieved for the H610 sibling, and have deliberately not been copied across. BTEC: “D in the BTEC National Extended Certificate plus grade A in A-level mathematics and grade A in either physics, further mathematics, electronics or computer science”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  course({
    slug: 'southampton-electronic-engineering-beng',
    universityId: 'southampton',
    name: 'Electronic Engineering (BEng)',
    category: 'engineering',
    sub: 'electronic',
    degree: 'BEng',
    years: 3,
    code: 'H610',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'AAA including mathematics and either physics, electronics, further mathematics or computer science. Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            ['Physics', 'Electronics', 'Further Mathematics', 'Computer Science'],
            'A',
            'Either physics, electronics, further mathematics or computer science (minimum grade A).',
          ),
        ],
        rawText:
          'AAA including mathematics and either physics, electronics, further mathematics or computer science.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_SECOND_SUBJECT_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAC including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A).” AAC is transcribed exactly, not normalised.',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('electronic-engineering-degree-beng'),
    sourceUrl: S('electronic-engineering-degree-beng'),
    sourceTitle: 'Electronic Engineering (Hons) | BEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `H610 IS THE BEng CODE. The scaffold record this replaces attached H610 to an MEng, which is wrong — Southampton’s own listing title string reads “H610 BEng Electronic Engineering 4429 (3 years)”, and the MEng is H603. THIS PAGE SERVED 2027 WHILE ITS MEng SIBLING H603 DID NOT: rollover at Southampton is per page, not per family, so nothing here has been carried to H603. ${NO_PRACTICAL_NOTE} ${EXCLUSIONS} EPQ route: “AAB including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A), plus grade A in the EPQ”. IB: “36 points overall with 18 points at Higher Level”, including 6 at Higher Level in Mathematics and 6 at Higher Level in either Physics or Computer Science. BTEC: “D in the BTEC National Extended Certificate plus grade A in A-level mathematics and grade A in either physics, further mathematics, electronics or computer science”. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* ----------------------------- Civil ------------------------------ */
  course({
    slug: 'southampton-civil-engineering-meng',
    universityId: 'southampton',
    name: 'Civil Engineering (MEng)',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H201',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        rawText: 'A*AA including mathematics (minimum grade A)',
        notes:
          'MATHEMATICS ONLY. No second science subject is required at all — materially different from Mechanical, Aeronautics, Electrical and Maritime, every one of which requires a second subject.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOT_MENTIONED_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade B).” The contextual route drops the Mathematics minimum from A to B as well as the aggregate.',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('civil-engineering-degree-meng'),
    sourceUrl: S('civil-engineering-degree-meng'),
    sourceTitle: 'Civil Engineering (Hons) | MEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `A STALE STRING ON THE PAGE, NOTED SO IT IS NOT MISTAKEN FOR A CYCLE LABEL: the page also carries “starting September 2023 for 4 years”. Both of the page’s actual entry-year labels read 2027/28 and no 2026/27 label is present, so the requirements panel is 2027; the 2023 string is recorded here only so a later reader does not take it for the cycle. ${NO_PRACTICAL_NOTE} ${EXCLUSIONS} The Civil family members are separate applications: BEng H200, MEng H201, MEng Civil Engineering with Architectural Design HK21, and Civil Engineering with Industrial Placement Year HH20. EPQ route: “AAA including mathematics, plus grade A in the EPQ”. IB: “38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Mathematics (Analysis and Approaches) or 7 at Higher Level in Mathematics (Applications and Interpretation)”. BTEC (RQF): one published combination is “D in the BTEC National Extended Certificate plus grades A*A from two A-levels”; the remaining BTEC combinations were NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* --------------------------- Acoustical --------------------------- */
  course({
    slug: 'southampton-acoustical-engineering-beng',
    universityId: 'southampton',
    name: 'Acoustical Engineering (BEng)',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'BEng',
    years: 3,
    code: 'HH72',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'AAB including mathematics and another accepted science subject. Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'AAB',
        required: ['Mathematics'],
        constraints: [
          oneOf(
            [
              'Biology',
              'Chemistry',
              'Physics',
              'Mathematics',
              'Further Mathematics',
              'Psychology',
              'Statistics',
              'Environmental Science',
              'Environmental Studies',
              'Geography',
              'Geology',
            ],
            null,
            'Another accepted science subject, from Southampton’s published list: “Biology, Chemistry, Physics, Maths, Further Maths, Psychology, Statistics, Environmental Science, Environmental Studies, Geography and Geology.”',
          ),
        ],
        rawText: 'AAB including mathematics and another accepted science subject',
        notes:
          'NO PER-SUBJECT MINIMUM GRADE IS STATED in the standard offer string, so none is recorded. The lowest standard A-Level offer of any Southampton course verified in this batch.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is accepted only as one member of Southampton’s eleven-subject accepted-science list for this course. It is not required, carries no grade reduction, and is not a substitute for Mathematics.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“BBB including mathematics and another accepted science subject.” BBB is the lowest contextual offer found anywhere in the Southampton research.',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('acoustical-engineering-degree-beng'),
    sourceUrl: S('acoustical-engineering-degree-beng'),
    sourceTitle: 'Acoustical Engineering (Hons) | BEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `THE WIDEST ACCEPTED-SUBJECT LIST AT SOUTHAMPTON BY A LONG WAY — it admits Psychology, Statistics, Geography and Geology, which no other Southampton course read accepts. The full list is quoted verbatim in the pathway constraint. THIS BEng SERVED 2027 WHILE ITS MEng SIBLING H722 DID NOT: the MEng’s 2027/28 tab exists but is empty. Nothing on this page has been carried to H722. Filed under general engineering because this catalogue has no acoustics heading; Southampton’s own title is preserved exactly. Siblings are separate applications: MEng H722, and Acoustical Engineering with Industrial Placement Year FF38. ${NO_PRACTICAL_NOTE} ${EXCLUSIONS} EPQ route: “ABB including mathematics and another accepted science subject, plus grade A in the EPQ”. IB: “34 points overall with 17 points at Higher Level”, including a “minimum of 5 at Higher Level in Mathematics” and a “minimum of 5 at Higher Level in another accepted science subject.” BTEC (RQF): “D in the BTEC National Extended Certificate plus grades AA from two A-levels.” ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* ---------------------------- Maritime ---------------------------- */
  course({
    slug: 'southampton-maritime-engineering-meng',
    universityId: 'southampton',
    name: 'Maritime Engineering (MEng)',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'J641',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'AAA including mathematics and either physics, chemistry or further mathematics. Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: ['Mathematics'],
        constraints: [
          oneOf(
            ['Physics', 'Chemistry', 'Further Mathematics'],
            null,
            'Either physics, chemistry or further mathematics.',
          ),
        ],
        rawText: 'AAA including mathematics and either physics, chemistry or further mathematics',
        notes:
          'A LOWER OFFER THAN MECHANICAL OR AERONAUTICS, both of which ask A*AA. The standard offer states no separate per-subject minimum grades — all three grades are A in any case — so none is recorded. Per-subject minima DO appear in the contextual and EPQ variants.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_SECOND_SUBJECT_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote:
      'No general selection interview is mentioned. The page carries one qualified mention for MATURE applicants only, who “may also be invited”. That is recorded here rather than turned into a general interview policy.',
    contextual: engContextual(
      '“ABB including mathematics (minimum grade B) and either physics, chemistry or further mathematics.” This route drops the Mathematics minimum to B, which is unusual — most Southampton contextual offers hold Mathematics at A.',
    ),
    gcse: GCSE,
    studyOptions: J641_OPTIONS,
    verification: 'verified',
    officialUrl: S('maritime-engineering-degree-meng'),
    sourceUrl: S('maritime-engineering-degree-meng'),
    sourceTitle: 'Maritime Engineering (Hons) | MEng | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `SIX NAMED YEAR-2 PATHWAYS UNDER ONE UCAS CODE. Southampton states that Advanced Computational Engineering, Marine Engineering and Autonomy, Naval Architecture, International Naval Architecture, Ocean Energy and Offshore Engineering, and Yacht and High Performance Craft are all applied for under the single code J641 and chosen in Year 2. They are named routes within this one application and never separate courses. The BEng sibling J640 publishes NO Year-2 pathways — they belong to the MEng only — and J640’s own page serves 2026/27, so nothing here is carried to it. THE ONLY SOUTHAMPTON ENGINEERING COURSE OUTSIDE BIOMEDICAL THAT NAMES CHEMISTRY as an acceptable second subject. Filed under general engineering because this catalogue has no naval-architecture heading. ${NO_PRACTICAL_NOTE} ${EXCLUSIONS} EPQ route: “AAB including Mathematics (minimum Grade A) and either physics, chemistry or further mathematics (minimum Grade B) plus grade A in the EPQ”. IB: “36 points overall with 18 points at Higher Level”, including Mathematics and Chemistry or Physics at Higher Level — the exact Higher Level grade digits were NOT RETRIEVED. BTEC routes exist with A-level combinations, but their exact strings were NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),

  /* --------------------------- Biomedical --------------------------- */
  course({
    slug: 'southampton-biomedical-engineering-meng',
    universityId: 'southampton',
    name: 'Biomedical Engineering (MEng)',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'MEng',
    years: 4,
    code: 'BB97',
    year: '2027',
    cycleNote: CYCLE,
    raw: 'A*AA including mathematics (minimum grade A) and either biology, chemistry or physics (minimum grade A). Offers typically exclude General Studies and Critical Thinking.',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            ['Biology', 'Chemistry', 'Physics'],
            'A',
            'Either biology, chemistry or physics (minimum grade A).',
          ),
        ],
        rawText:
          'A*AA including mathematics (minimum grade A) and either biology, chemistry or physics (minimum grade A)',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not mentioned on this page, and is notably ABSENT from the accepted second-subject list — unlike the Electrical, Electronic and Maritime courses, which all name it. Recorded as unrecorded rather than as “not accepted”.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: ENG_INTERVIEW_NOTE,
    contextual: engContextual(
      '“AAB including mathematics (minimum grade A) and either biology, chemistry or physics.”',
    ),
    gcse: GCSE,
    verification: 'verified',
    officialUrl: S('biomedical-engineering-degree-meng'),
    sourceUrl: S('biomedical-engineering-degree-meng'),
    sourceTitle: 'MEng Biomedical Engineering | University of Southampton',
    lastVerified: VERIFIED_ON,
    notes: `THE ONLY SOUTHAMPTON ENGINEERING COURSE READ THAT ACCEPTS BIOLOGY as a qualifying second subject. THE BIOMEDICAL FAMILY ARE SEPARATE UCAS APPLICATIONS, each with its own code, taken from Southampton’s own Biomedical engineering subject listing: MEng Biomedical Engineering BB97 (4 years); BEng BB95 (3 years); MEng with Industrial Studies BB98 (5 years); BEng (Mechanics and Materials) H625 (3 years); MEng (Mechanics and Materials) H619 (4 years); BEng (Mechanics and Materials) with Industrial Placement Year H675 (4 years); MEng (Mechanics and Materials) with Industrial Placement Year H674 (5 years). THAT LISTING PAGE CARRIES NO ACADEMIC-YEAR LABEL, so only its codes and titles are used here and none of its typical-offer figures is recorded as 2027 anywhere. RETIRED TITLE: Southampton now routes the URL for “Biomedical Electronic Engineering” to the Biomedical engineering subject page; no current standalone course page of that title exists, and the only such document found was a 2020-21 programme specification. ${NO_PRACTICAL_NOTE} ${EXCLUSIONS} EPQ route: “AAA including mathematics and either biology, chemistry or physics, plus grade A in the EPQ”. IB: “38 points overall with 19 points required at Higher Level” — the Higher Level subject digits were NOT RETRIEVED. BTEC runs to multiple tiers (D in Extended Certificate plus AA/A*A in A-levels; D* plus AA) but the exact subject wording was NOT RETRIEVED. ${SHOW_MORE_NOTE} ${NO_DEADLINE_NOTE}`,
  }),
];

/* ------------------------------------------------------------------ */
/* The six pages that would not yield 2027 data                        */
/* ------------------------------------------------------------------ */

/**
 * Course IDENTITY ONLY. Every one of these pages was read; each served its
 * requirements under a 2026/27 label, or (Acoustical MEng) carried an empty
 * 2027/28 tab. Their 2026/27 figures are quarantined in the research file and
 * NOT ONE FIELD of them is imported here. A sibling's 2027 offer is never
 * substituted, which is the whole point of keeping these as shells: rollover at
 * Southampton is per page, and three of these five have a sibling that DID
 * serve 2027.
 *
 * "Astrophysics with Year Abroad" is deliberately NOT in this list. It is a
 * named route inside the F3FM application, so it belongs on that record as a
 * study option — making it a separate shell would invent an application
 * Southampton does not operate.
 */
const NOT_RETRIEVED_NOTE =
  'This Southampton page was read but would not serve 2027 entry requirements. The identity below — title, award, UCAS code, duration — is confirmed from Southampton’s own page furniture, which is not year-gated. No entry requirement, contextual offer, GCSE rule, admissions-test statement or interview policy has been recorded, and nothing has been copied from the sibling course or from the page’s own 2026/27 figures.';

export const batch6SouthamptonAwaitingCourses: Course[] = [
  awaitingCourse({
    slug: 'southampton-acoustical-engineering-meng',
    universityId: 'southampton',
    name: 'Acoustical Engineering (MEng)',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'MEng',
    years: 4,
    code: 'H722',
    year: '2027',
    identityVerification: 'official-page',
    identityNote:
      'This course’s own Southampton page was retrieved and read. Its title, award, UCAS code and duration come from that page’s own furniture, which is not year-gated. The page would not serve 2027 entry requirements, which is why the admissions fields are empty — a cycle problem, not an identity problem.',
    officialUrl: S('acoustical-engineering-degree-meng'),
    notes: `${NOT_RETRIEVED_NOTE} Specifically: the 2027/28 tab is PRESENT BUT EMPTY — an inactive label with no content underneath — while the requirements served sit under 2026/27. Its BEng sibling HH72 did serve a populated 2027/28 panel, and none of that BEng’s figures have been carried here.`,
  }),
  awaitingCourse({
    slug: 'southampton-physics-with-mathematics-mphys',
    universityId: 'southampton',
    name: 'Physics with Mathematics (MPhys)',
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: 'MPhys',
    years: 4,
    code: 'F3GC',
    year: '2027',
    identityVerification: 'official-page',
    identityNote:
      'This course’s own Southampton page was retrieved and read. Its title, award, UCAS code and duration come from that page’s own furniture, which is not year-gated. The page would not serve 2027 entry requirements, which is why the admissions fields are empty — a cycle problem, not an identity problem.',
    officialUrl: S('physics-with-mathematics-degree-mphys'),
    notes: `${NOT_RETRIEVED_NOTE} Specifically: this page carries NO 2027 label at all — it has not rolled over. Every other named Southampton physics variant read did serve 2027, and not one of their offers has been carried here.`,
  }),
  awaitingCourse({
    slug: 'southampton-maritime-engineering-beng',
    universityId: 'southampton',
    name: 'Maritime Engineering (BEng)',
    category: 'engineering',
    sub: 'general-engineering',
    degree: 'BEng',
    years: 3,
    code: 'J640',
    year: '2027',
    identityVerification: 'official-page',
    identityNote:
      'This course’s own Southampton page was retrieved and read. Its title, award, UCAS code and duration come from that page’s own furniture, which is not year-gated. The page would not serve 2027 entry requirements, which is why the admissions fields are empty — a cycle problem, not an identity problem.',
    officialUrl: S('maritime-engineering-degree-beng'),
    notes: `${NOT_RETRIEVED_NOTE} Specifically: both a 2026/27 and a 2027/28 tab are present, and the content sits under 2026/27. Its MEng sibling J641 DID serve a 2027/28 panel — the clearest single illustration that rollover at Southampton is per page, not per subject family. This BEng also publishes no Year-2 pathways; the six named pathways belong to the MEng alone. Southampton’s own listing title string reads “J640 BEng Maritime Engineering 9159 (3 years)”, and the industrial-placement variant is a separate code, J60P.`,
  }),
  awaitingCourse({
    slug: 'southampton-electronic-engineering-meng',
    universityId: 'southampton',
    name: 'Electronic Engineering (MEng)',
    category: 'engineering',
    sub: 'electronic',
    degree: 'MEng',
    years: 4,
    code: 'H603',
    year: '2027',
    identityVerification: 'official-page',
    identityNote:
      'This course’s own Southampton page was retrieved and read. Its title, award, UCAS code and duration come from that page’s own furniture, which is not year-gated. The page would not serve 2027 entry requirements, which is why the admissions fields are empty — a cycle problem, not an identity problem.',
    officialUrl: S('electronic-engineering-degree-meng'),
    notes: `${NOT_RETRIEVED_NOTE} Specifically: both tabs are present and the requirements are displayed under 2026/27, while its BEng sibling H610 did serve 2027/28. THE CODE CORRECTION MATTERS HERE: the scaffold record this replaces gave this MEng the code H610, which is in fact the BEng’s code. Southampton’s own pages give the MEng H603.`,
  }),
  awaitingCourse({
    slug: 'southampton-electrical-engineering-meng',
    universityId: 'southampton',
    name: 'Electrical Engineering (MEng)',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H601',
    year: '2027',
    identityVerification: 'official-page',
    identityNote:
      'This course’s own Southampton page was retrieved and read. Its title, award, UCAS code and duration come from that page’s own furniture, which is not year-gated. The page would not serve 2027 entry requirements, which is why the admissions fields are empty — a cycle problem, not an identity problem.',
    officialUrl: S('electrical-engineering-degree-meng'),
    notes: `${NOT_RETRIEVED_NOTE} Specifically: the entry-requirements section displays “For Academic Year 2026/27” with a filter option for 2027/28, and the A-level offer appears under the 2026/27 heading. Worth a re-check next cycle for a specific reason: on 2026/27 this course’s second-subject list omitted computer science, unlike its H600, H602 and H610 siblings — a real difference that may or may not persist into 2027, and which has NOT been assumed either way.`,
  }),
];

/** Southampton, verified and awaiting-data records together. */
export const batch6SouthamptonAll: Course[] = [
  ...batch6SouthamptonCourses,
  ...batch6SouthamptonAwaitingCourses,
];
