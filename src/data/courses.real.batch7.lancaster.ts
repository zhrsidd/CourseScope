/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 7, PART B: LANCASTER UNIVERSITY
 *  2027 entry. Read from Lancaster's own course pages and its own 2027
 *  departmental brochures on 2026-09-16/17.
 * ---------------------------------------------------------------------------
 *  THE STRUCTURE QUESTION, ANSWERED: NAMED DISCIPLINES AND GENERAL ENGINEERING
 *  ARE ALL REAL APPLICATIONS, AND THE COMMON FIRST YEAR DOES NOT MERGE THEM.
 *
 *  Batch 6 suspected this and could not prove it. The proof is Lancaster's own
 *  School of Engineering undergraduate listing, which enumerates 42 titles with
 *  42 distinct UCAS codes and 42 distinct course-page URLs. Every family —
 *  Engineering, Chemical, Electronic and Electrical, Mechanical, Mechatronic,
 *  Nuclear — has a COMPLETE INDEPENDENT SET OF SEVEN CODES:
 *
 *      BEng · MEng · Study Abroad BEng · Study Abroad MEng ·
 *      Placement Year BEng · Placement Year MEng · Foundation Year BEng
 *
 *  So of the four possible structures, the answer is the both/and one:
 *
 *    A. General Engineering is a real application AND the named disciplines are
 *       also real applications.                                    ← TRUE
 *    B. Named disciplines share a first year but keep distinct identities.
 *                                                                   ← ALSO TRUE
 *    C. Some named disciplines are merely pathways under General Engineering.
 *                                                                   ← FALSE
 *
 *  A Mechanical Engineering applicant types H300 or H303 into UCAS. They do not
 *  type H100. The shared first year is a fact about what they will study, not
 *  about what they apply to — and this is exactly the case where collapsing
 *  applications into one "because they share a first year" would have destroyed
 *  real information.
 *
 *  Lancaster's own words, from its 2027 Engineering brochure:
 *      "In Year 1, no matter which degree you choose, all students study the
 *       same general engineering modules."
 *      "By studying a common first year, you can change your specialism at the
 *       end of Year 1."
 *      "Not sure which specialism? That's ok too! When you apply, select the
 *       one of our General Engineering degree schemes."
 *  And from the H100 course page:
 *      "The common first year lets you change your specialisation allowing a
 *       more informed choice at the end of year one, subject to meeting the
 *       requirements of that course."
 *
 *  Note that last condition. Changing specialism is NOT unconditional, and the
 *  catalogue says so rather than implying a free choice.
 *
 *  THE SAME PATTERN EXISTS IN PHYSICS and is easy to miss: "All our single
 *  honours subjects have a common first year… you can change your degree scheme
 *  up until the end of your first year", and "you can easily transfer from 3 to
 *  4 years up until term 2 of your third year".
 *
 *  ---------------------------------------------------------------------------
 *  WHY MOST ENGINEERING RECORDS HERE ARE PARTIALLY VERIFIED
 *  ---------------------------------------------------------------------------
 *  Lancaster renders its entry requirements as a ten-section accordion. A deep
 *  probe established exactly which parts are served and which are not: only the
 *  last two sections — GCSE requirements and English language requirements —
 *  have server-rendered bodies. The eight qualification sections, INCLUDING
 *  "A levels", render as bare headings with no body.
 *
 *  So the A-LEVEL SUBJECT REQUIREMENT IS A RETRIEVAL FAILURE ON EVERY LANCASTER
 *  ENGINEERING PAGE, not a silence. Lancaster's own intro sentence proves a body
 *  is there: "This section will tell you whether you need qualifications in
 *  specific subjects." The 2027 Engineering brochure offers only "We accept a
 *  wide variety of qualifications but have minimum prerequisite levels in
 *  mathematics and prefer a technical/scientific bias" — no subject, no grade.
 *
 *  These records therefore carry the grade string, which IS genuine 2027
 *  course-page text, plus an explicit unresolved-condition marker so the engine
 *  returns "review required" rather than telling a student with ABB in three
 *  arts subjects that they meet a Lancaster engineering offer. That is the
 *  brief's rule applied literally: where a structure cannot be represented
 *  safely, return review rather than invent logic.
 *
 *  PHYSICS IS DIFFERENT. Lancaster's own 2027 Physics brochure DOES carry the
 *  subject requirement — "Typical A level offer (all include an A in both
 *  Mathematics and Physics): AAA" and "Physics at A level (or equivalent) is
 *  essential, as is Mathematics" — so the two fully-read Physics records are
 *  scorable. Those subject grades are labelled as departmental-brochure
 *  statements, not as course-page text, because that is what they are.
 *
 *  ---------------------------------------------------------------------------
 *  FIVE THINGS THAT WOULD BE GOT WRONG BY ASSUMPTION
 *  ---------------------------------------------------------------------------
 *
 *  1. THE PLACEMENT-YEAR CODE ORDER IS INVERTED FOR GENERAL ENGINEERING ONLY.
 *     Every other family runs BEng-then-MEng; General Engineering's placement
 *     pair is BEng H106, MEng H105. Reproduced as Lancaster prints it.
 *
 *  2. THE INTEGRATED MASTER'S AWARD DIFFERS BY FAMILY. MPhys for Physics,
 *     Physics with Astrophysics and Theoretical Physics — but MSci for
 *     Theoretical Physics with Mathematics. The old scaffold claimed an MPhys
 *     there; there is no MPhys in that family.
 *
 *  3. PHYSICS BSc AND MPhys CARRY THE SAME GRADE STRING (AAA), so the integrated
 *     Master's is NOT a higher offer in Physics. In Engineering they differ:
 *     ABB for BEng, AAA for MEng.
 *
 *  4. THE INTERVIEW WORDING DIFFERS BY AWARD AND BY DEPARTMENT. Engineering
 *     MEng pages say "You will typically be asked to attend an interview";
 *     Engineering BEng pages say nothing; Physics says "You may be asked".
 *     Three different strengths, recorded per course.
 *
 *  5. GCSE MATHEMATICS IS REQUIRED ON EVERY ENGINEERING PAGE (grade 6/B) AND ON
 *     NO PHYSICS PAGE. That is the reverse of what most readers would guess.
 *
 *  ---------------------------------------------------------------------------
 *  ONE CORRECTION TO AN EARLIER READING, MADE WITHIN THIS BATCH
 *  ---------------------------------------------------------------------------
 *  A first, shallower fetch reported Chemical Engineering as requiring A-level
 *  Chemistry. A deep probe with the heading context disproved it: the sentence
 *  "Chemistry at grade 6/B required with an A level in Physics or Biology" sits
 *  UNDER THE "GCSE requirements" HEADING and uses GCSE grade notation. It is a
 *  conditional GCSE rule — GCSE Chemistry at 6/B where the applicant's A-level
 *  science is Physics or Biology rather than Chemistry. The Foundation Year
 *  page words it more plainly: "Chemistry at grade 6/B required if you do not
 *  have A level Chemistry." Both wordings are kept; they are not flattened.
 *
 *  This is also the only sentence on any Lancaster Engineering page that names
 *  an A-level subject at all, and it names Physics or Biology only as the
 *  CONDITION of a GCSE rule. No A-level Mathematics grade is recorded for any
 *  Lancaster Engineering course, because none was ever retrieved.
 *
 *  ---------------------------------------------------------------------------
 *  WHAT IS NOT HERE, AND WHY
 *  ---------------------------------------------------------------------------
 *  · 23 of the 25 Physics codes are identity-only: the research pass that would
 *    have read their pages ran out of session budget after the first two. Their
 *    titles, awards and codes come from Lancaster's own Department of Physics
 *    listing and are solid; their requirements have not been read.
 *  · H824 and H825 (Nuclear Engineering with Placement Year, BEng and MEng) are
 *    identity-only for a different reason: their fetches returned a session
 *    limit and an HTTP 429. The regular pattern across the other 40 predicts
 *    what they would say — and prediction is not retrieval, so their duration,
 *    grade string and interview line are left empty on purpose.
 *  · Lancaster publishes NO numeric contextual reduction on any course page,
 *    only the heading and a sentence. The size of the reduction is unpublished,
 *    not unknown to us.
 *  · The EPQ dual-offer is known only from an UNDATED university-wide page and
 *    is explicitly scoped to "the majority of our degree programmes". Whether
 *    Engineering is inside that majority is unpublished, so no Engineering EPQ
 *    route is asserted anywhere in this file.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, oneOf } from './builders';

const V08_READ_ON = '2026-09-23';
const VERIFIED_ON = '2026-09-17';

const L = (slug: string) => `https://www.lancaster.ac.uk/study/undergraduate/courses/${slug}/2027/`;

const CYCLE =
  'Published requirements for 2027 entry. Lancaster’s course pages carry an “Entry year 2027 or 2026” selector rather than a printed caption, and the 2027 view is selected by the /2027/ path segment; every page was fetched through that path with a cache-busting query string. The cycle is therefore established by the URL path and the selector offering 2027, not by a caption over the requirements panel — recorded as a caveat rather than glossed over.';

const NO_TEST_NOTE =
  'No admissions test is mentioned on this course page, and none appears in Lancaster’s own 2027 departmental brochure. Lancaster does not state that no test is required either, so this is silence rather than a published “no admissions test”.';

const CONTEXTUAL: ContextualOfferInfo = {
  availability: 'yes',
  details:
    'Lancaster publishes one heading, “Contextual admissions”, and one sentence beneath it: “Contextual admissions could help you gain a place at university if you have faced additional challenges during your education which might have impacted your results.” NO NUMERIC REDUCED OFFER IS PUBLISHED ON ANY LANCASTER COURSE PAGE, so the size of the reduction is unpublished rather than unknown to us. No widening-participation, care-experienced, refugee, estranged-student or access-programme heading appears on any Lancaster course page read.',
};


/*
 * ---------------------------------------------------------------------------
 *  RESOLVED IN v0.8 — THE ACCORDION FINALLY OPENED
 * ---------------------------------------------------------------------------
 *
 *  Batch 7 could not read Lancaster's subject requirements. They live inside an
 *  accordion that a text fetch never receives: the server sends the section
 *  headings and withholds the bodies, so ten retrieval attempts produced the
 *  grade tile ("A level requirements ABB") and nothing underneath it. Every one
 *  of these 40 records therefore carried a manual-review constraint saying, in
 *  effect, "Lancaster publishes a subject rule and we cannot see it."
 *
 *  A rendered browser receives the whole accordion. Every one of the 40 pages
 *  was then fetched same-origin and parsed, and the rule was there all along.
 *
 *  AND IT IS NOT ONE RULE. Reading the pages one at a time rather than assuming
 *  a house style turned up THREE genuinely different subject requirements, plus
 *  a GCSE rule that only one family carries:
 *
 *    1. MOST DISCIPLINES — Engineering, Electronic and Electrical, Mechanical,
 *       Mechatronic, Nuclear:
 *         "This should include Mathematics and a physical science subject, for
 *          example, Physics, Chemistry, Electronics, Design & Technology or
 *          Further Mathematics."
 *       Note "for example". The list is ILLUSTRATIVE, not closed.
 *
 *    2. CHEMICAL ENGINEERING:
 *         "This should include Mathematics and a science subject from:
 *          Chemistry, Physics or Biology."
 *       Note "from:". This list IS closed, it admits Biology where the others
 *       do not, and it excludes Electronics, Design & Technology and Further
 *       Mathematics, which the others accept. Chemical Engineering also carries
 *       a GCSE Chemistry rule no other family has.
 *
 *    3. FOUNDATION YEARS — stricter about subjects, far lower on grades:
 *         "CCC. This should include Mathematics, and either Chemistry or
 *          Physics."
 *       except Chemical Engineering's, which names one subject outright:
 *         "CCC. This should include Mathematics and Chemistry."
 *
 *  Had these been inferred from a sibling — the thing the brief forbids and the
 *  thing a regular-looking portfolio invites — Chemical Engineering would have
 *  been given the wrong list in both directions at once, and every foundation
 *  year would have been given a rule that does not apply to it.
 *
 *  ---------------------------------------------------------------------------
 *  HOW THE ILLUSTRATIVE LIST IS STORED, AND WHY IT IS NOT A CLOSED ONE
 *  ---------------------------------------------------------------------------
 *  "for example" means a student holding some other physical science may well
 *  qualify. Storing the five named subjects as a closed `one-of` would fail
 *  such a student outright, which would be wrong. Storing nothing would pass
 *  a student with no science at all, which would also be wrong.
 *
 *  So the named subjects are stored as a `one-of` — anyone holding one of them
 *  gets a clean, correct answer — and the openness of the list is preserved in
 *  the constraint's own description and in the offer text, where a student
 *  reads Lancaster's actual words. A catalogue cannot enumerate a list the
 *  university declined to close; it can refuse to pretend the list is closed.
 */

const PHYSICAL_SCIENCE_LIST = ['Physics', 'Chemistry', 'Electronics', 'Design & Technology', 'Further Mathematics'];

const PHYSICAL_SCIENCE_RULE = oneOf(
  PHYSICAL_SCIENCE_LIST,
  null,
  'Lancaster asks for “a physical science subject, for example, Physics, Chemistry, Electronics, Design & Technology or Further Mathematics”. THE LIST IS ILLUSTRATIVE, NOT EXHAUSTIVE — Lancaster says “for example” — so another physical science may also be accepted and this check should not be read as a closed set. Holding one of the named subjects satisfies what Lancaster publishes.',
);

const CHEM_SCIENCE_RULE = oneOf(
  ['Chemistry', 'Physics', 'Biology'],
  null,
  'Lancaster asks for “a science subject from: Chemistry, Physics or Biology”. THIS LIST IS CLOSED — the wording is “from:”, not “for example” — and it differs from every other Lancaster engineering discipline in both directions: it admits Biology, and it does not name Electronics, Design & Technology or Further Mathematics.',
);

const FOUNDATION_SCIENCE_RULE = oneOf(
  ['Chemistry', 'Physics'],
  null,
  'Lancaster asks for “Mathematics, and either Chemistry or Physics” on this foundation-year route. A two-subject closed list, narrower than the illustrative physical-science list its own non-foundation siblings use.',
);

const ENG_ALEVEL_TEXT = (profile: string) =>
  `${profile}. This should include Mathematics and a physical science subject, for example, Physics, Chemistry, Electronics, Design & Technology or Further Mathematics.`;

const CHEM_ALEVEL_TEXT = (profile: string) =>
  `${profile}. This should include Mathematics and a science subject from: Chemistry, Physics or Biology.`;

const FOUNDATION_ALEVEL_TEXT = 'CCC. This should include Mathematics, and either Chemistry or Physics.';

const CHEM_FOUNDATION_ALEVEL_TEXT = 'CCC. This should include Mathematics and Chemistry.';

const RESOLVED_NOTE =
  'THE SUBJECT REQUIREMENT WAS RESOLVED IN v0.8 BY A RENDERED-BROWSER READ, after text fetches across two batches had returned the accordion’s headings without its bodies. All 40 Lancaster engineering pages were then fetched same-origin and parsed individually; none of this was inferred from a sibling, and reading them one at a time is what revealed that Chemical Engineering and the foundation years publish different rules from the rest.';


const ENG_GCSE =
  'Genuine course-page text, identical across all 42 Lancaster Engineering codes: “Mathematics grade 6/B, English Language grade 4/C.” Lancaster adds: “We will also look at your overall GCSE profile when considering your application as a whole” and “We do have flexibility when considering GCSE requirements.” NOTE THE CONTRAST WITH LANCASTER PHYSICS, which states no GCSE Mathematics requirement at all.';

const CHEM_GCSE_EXTRA =
  ' CHEMICAL ENGINEERING ADDS ONE CONDITIONAL GCSE RULE, and it is the only cross-subject rule on any Lancaster Engineering page: “Chemistry at grade 6/B required with an A level in Physics or Biology.” The Foundation Year page words the same rule more plainly: “Chemistry at grade 6/B required if you do not have A level Chemistry.” Read together they mean GCSE Chemistry at 6/B is required where Chemistry is not the applicant’s A-level science. An earlier, shallower read mistook this for an A-level Chemistry requirement; the deep probe with heading context disproved that.';

const ENG_IELTS =
  'English language, genuine course-page text: “If English is not your first language, we require an IELTS score of 6.5 overall with at least 5.5 in each component for this programme.” Note this is higher than Lancaster Physics, which asks 6.0 / 5.5.';

const NO_EPQ_ENG =
  'NO ENGINEERING EPQ ROUTE IS ASSERTED. Lancaster’s 2027 Engineering brochure states no EPQ or four-subject alternative, and no Engineering course page mentions the EPQ at all. The EPQ dual-offer is known only from an UNDATED university-wide page which scopes itself to “the majority of our degree programmes” — and whether Engineering is inside that majority is not published. Contrast Physics, which publishes an explicit AABB alternative.';

const NO_DEADLINE = 'No application deadline is published on any Lancaster course page read.';

const COMMON_FIRST_YEAR: StudyOption = {
  name: 'Common first year, with specialism change at the end of Year 1',
  description:
    'A genuine shared first year across the whole School of Engineering, and a route to change specialism afterwards — but NOT a merger of applications. Lancaster: “In Year 1, no matter which degree you choose, all students study the same general engineering modules”, and “By studying a common first year, you can change your specialism at the end of Year 1.” The change is conditional, in Lancaster’s own words: “subject to meeting the requirements of that course.” Every named discipline still has its own UCAS code and is applied to separately.',
  ucasCode: null,
  chosenWhen: 'At the end of Year 1, subject to meeting the requirements of the target course.',
  officialUrl: null,
};

const UNDECIDED_ROUTE: StudyOption = {
  name: 'The route for applicants who have not chosen a discipline',
  description:
    'Lancaster publishes General Engineering specifically for the undecided, and says so: “Not sure which specialism? That’s ok too! When you apply, select the one of our General Engineering degree schemes.” The H100 page adds: “If you’re unsure of which area of specialisation you’d like to go into upon application, you can use the UCA code H100 Engineering to leave your options open.” (“UCA code” is Lancaster’s own typo for UCAS code, reproduced as written.) This is a real application in its own right, not a label for the named disciplines.',
  ucasCode: 'H100',
  chosenWhen: 'At application.',
  officialUrl: null,
};

const PHYS_COMMON: StudyOption = {
  name: 'Common first year, with scheme change to the end of Year 1',
  description:
    'Lancaster’s 2027 Physics brochure: “All our single honours subjects have a common first year, meaning you will benefit from exploring all areas of physics before making a decision on your specialism. With this in mind, you can change your degree scheme up until the end of your first year.” The course page repeats it: “You may discover that your interests change throughout the year, and you have the flexibility to switch to any other of our degree schemes until the end of Year 1.” The same structural pattern as Engineering, and just as easy to miss.',
  ucasCode: null,
  chosenWhen: 'Up to the end of Year 1.',
  officialUrl: null,
};

const PHYS_TRANSFER: StudyOption = {
  name: 'Transfer between the three-year and four-year schemes',
  description:
    'Lancaster’s 2027 Physics brochure: “Providing you are meeting academic requirements you can easily transfer from 3 to 4 years up until term 2 of your third year.” So the BSc / integrated-Master’s choice is revisable well after admission — but the Placement Year and Study Abroad variants are NOT options inside this application; each is its own UCAS code and its own record.',
  ucasCode: null,
  chosenWhen: 'Up to term 2 of the third year, subject to academic requirements.',
  officialUrl: null,
};

/* ------------------------------------------------------------------ */
/* Engineering — 42 codes, 6 families, 40 individually fetched          */
/* ------------------------------------------------------------------ */

type Variant = 'plain' | 'study-abroad' | 'placement' | 'foundation';

interface EngRow {
  code: string;
  award: 'BEng' | 'MEng';
  variant: Variant;
}

interface EngFamily {
  key: string;
  name: string;
  sub: 'general-engineering' | 'chemical' | 'electrical' | 'mechanical' | 'robotics-mechatronics' | 'nuclear';
  rows: EngRow[];
  extra?: string;
}

/**
 * Lancaster's own slug pattern, e.g.
 * `mechanical-engineering-beng-hons-h300`. The Study Abroad and Placement Year
 * variants carry the suffix in the slug too.
 */
const engSlug = (family: string, award: string, variant: Variant, code: string) => {
  const suffix =
    variant === 'study-abroad'
      ? '-study-abroad'
      : variant === 'placement'
        ? '-placement-year'
        : variant === 'foundation'
          ? '-with-a-foundation-year'
          : '';
  return `${family}${suffix}-${award.toLowerCase()}-hons-${code.toLowerCase()}`;
};

const VARIANT_TITLE: Record<Variant, (n: string) => string> = {
  plain: (n) => n,
  'study-abroad': (n) => `${n} (Study Abroad)`,
  placement: (n) => `${n} with Placement Year`,
  foundation: (n) => `${n} (with a Foundation Year)`,
};

const DURATION: Record<Variant, Record<'BEng' | 'MEng', number>> = {
  plain: { BEng: 3, MEng: 4 },
  'study-abroad': { BEng: 4, MEng: 5 },
  placement: { BEng: 4, MEng: 5 },
  foundation: { BEng: 4, MEng: 5 },
};

const PROFILE: Record<Variant, Record<'BEng' | 'MEng', string>> = {
  plain: { BEng: 'ABB', MEng: 'AAA' },
  'study-abroad': { BEng: 'ABB', MEng: 'AAA' },
  placement: { BEng: 'ABB', MEng: 'AAA' },
  foundation: { BEng: 'CCC', MEng: 'CCC' },
};

const ENG_FAMILIES: EngFamily[] = [
  {
    key: 'engineering',
    name: 'Engineering',
    sub: 'general-engineering',
    rows: [
      { code: 'H100', award: 'BEng', variant: 'plain' },
      { code: 'H102', award: 'MEng', variant: 'plain' },
      { code: 'H103', award: 'BEng', variant: 'study-abroad' },
      { code: 'H104', award: 'MEng', variant: 'study-abroad' },
      { code: 'H106', award: 'BEng', variant: 'placement' },
      { code: 'H105', award: 'MEng', variant: 'placement' },
      { code: 'H10F', award: 'BEng', variant: 'foundation' },
    ],
    extra:
      'THE TITLE IS PLAIN “Engineering”, NOT “General Engineering” — the latter is the heading Lancaster groups it under on its listing page, not the degree title. THE PLACEMENT-YEAR CODE ORDER IS INVERTED IN THIS FAMILY ONLY: BEng H106, MEng H105, where every other family runs BEng first. Reproduced as Lancaster prints it rather than normalised.',
  },
  {
    key: 'chemical-engineering',
    name: 'Chemical Engineering',
    sub: 'chemical',
    rows: [
      { code: 'H800', award: 'BEng', variant: 'plain' },
      { code: 'H811', award: 'MEng', variant: 'plain' },
      { code: 'H812', award: 'BEng', variant: 'study-abroad' },
      { code: 'H813', award: 'MEng', variant: 'study-abroad' },
      { code: 'H814', award: 'BEng', variant: 'placement' },
      { code: 'H815', award: 'MEng', variant: 'placement' },
      { code: 'H80F', award: 'BEng', variant: 'foundation' },
    ],
  },
  {
    key: 'electronic-and-electrical-engineering',
    name: 'Electronic and Electrical Engineering',
    sub: 'electrical',
    rows: [
      { code: 'H607', award: 'BEng', variant: 'plain' },
      { code: 'H606', award: 'MEng', variant: 'plain' },
      { code: 'H608', award: 'BEng', variant: 'study-abroad' },
      { code: 'H609', award: 'MEng', variant: 'study-abroad' },
      { code: 'H610', award: 'BEng', variant: 'placement' },
      { code: 'H611', award: 'MEng', variant: 'placement' },
      { code: 'H60F', award: 'BEng', variant: 'foundation' },
    ],
  },
  {
    key: 'mechanical-engineering',
    name: 'Mechanical Engineering',
    sub: 'mechanical',
    rows: [
      { code: 'H300', award: 'BEng', variant: 'plain' },
      { code: 'H303', award: 'MEng', variant: 'plain' },
      { code: 'H305', award: 'BEng', variant: 'study-abroad' },
      { code: 'H306', award: 'MEng', variant: 'study-abroad' },
      { code: 'H307', award: 'BEng', variant: 'placement' },
      { code: 'H308', award: 'MEng', variant: 'placement' },
      { code: 'H30F', award: 'BEng', variant: 'foundation' },
    ],
    extra:
      'THIS FAMILY SETTLES THE OLD SCAFFOLD’S CODE QUESTION: Mechanical Engineering MEng is H303 and the BEng is H300. Both pages were fetched individually and both are live 2027 pages.',
  },
  {
    key: 'mechatronic-engineering',
    name: 'Mechatronic Engineering',
    sub: 'robotics-mechatronics',
    rows: [
      { code: 'HH63', award: 'BEng', variant: 'plain' },
      { code: 'HHH6', award: 'MEng', variant: 'plain' },
      { code: 'HH64', award: 'BEng', variant: 'study-abroad' },
      { code: 'HHH7', award: 'MEng', variant: 'study-abroad' },
      { code: 'HH65', award: 'BEng', variant: 'placement' },
      { code: 'HHH8', award: 'MEng', variant: 'placement' },
      { code: 'HH6F', award: 'BEng', variant: 'foundation' },
    ],
    extra:
      'EVERY CODE IN THIS FAMILY IS ALPHANUMERIC — HH63, HHH6, HH64, HHH7, HH65, HHH8, HH6F — and none would survive a validator that assumed a four-digit numeric UCAS code.',
  },
  {
    key: 'nuclear-engineering',
    name: 'Nuclear Engineering',
    sub: 'nuclear',
    rows: [
      { code: 'H820', award: 'BEng', variant: 'plain' },
      { code: 'H821', award: 'MEng', variant: 'plain' },
      { code: 'H822', award: 'BEng', variant: 'study-abroad' },
      { code: 'H823', award: 'MEng', variant: 'study-abroad' },
      { code: 'H82F', award: 'BEng', variant: 'foundation' },
    ],
    extra:
      'TWO CODES IN THIS FAMILY ARE MISSING FROM THE VERIFIED SET ON PURPOSE. H824 and H825 (Nuclear Engineering with Placement Year, BEng and MEng) exist — their titles, awards and codes are on Lancaster’s own School listing — but their pages could not be fetched: one returned a session limit, the other an HTTP 429. The regular pattern across the other 40 pages predicts what they would say, and prediction is not retrieval, so they are identity-only records with no duration, no grade string and no interview line.',
  },
];

const FOUNDATION_ROUTE_NOTE =
  'FOUNDATION-YEAR ROUTE, RESTRICTED TO HOME STUDENTS, verbatim from the page: “Our UK Foundation Years offer the opportunity for Home students who don’t meet our standard entry grades to prepare for a STEM degree at Lancaster University.” This is a genuine alternative-entry route pitched at applicants below the standard grades, and it is its own UCAS code rather than an option inside another application.';

const engineeringCourses: Course[] = ENG_FAMILIES.flatMap((f) =>
  f.rows.map((r) => {
    const title = VARIANT_TITLE[r.variant](f.name);
    const profile = PROFILE[r.variant][r.award];
    const isMEng = r.award === 'MEng';
    const isChem = f.key === 'chemical-engineering';
    const isFoundation = r.variant === 'foundation';
    const aLevelText = isFoundation
      ? isChem
        ? CHEM_FOUNDATION_ALEVEL_TEXT
        : FOUNDATION_ALEVEL_TEXT
      : isChem
        ? CHEM_ALEVEL_TEXT(profile)
        : ENG_ALEVEL_TEXT(profile);
    return course({
      slug: `lancaster-${engSlug(f.key, r.award, r.variant, r.code)}`,
      universityId: 'lancaster',
      name: title,
      category: 'engineering',
      sub: f.sub,
      degree: r.award,
      awardLabel: `${r.award} Hons`,
      years: DURATION[r.variant][r.award],
      code: r.code,
      year: '2027',
      cycleNote: CYCLE,
      raw: aLevelText,
      offers: [
        offer({
          label: 'A level requirements',
          gradeProfile: profile,
          required: isFoundation && isChem ? ['Mathematics', 'Chemistry'] : ['Mathematics'],
          constraints: isFoundation
            ? isChem
              ? []
              : [FOUNDATION_SCIENCE_RULE]
            : isChem
              ? [CHEM_SCIENCE_RULE]
              : [PHYSICAL_SCIENCE_RULE],
          rawText: aLevelText,
          notes: `Lancaster prints the grade as a standalone key-fact tile reading “A level requirements ${profile}” and the subject rule separately inside the entry-requirements accordion. Both were read and are stored together here, with Lancaster’s own sentence kept verbatim.`,
        }),
      ],
      maths: 'required',
      physicsStatus: isFoundation && isChem ? 'unknown' : 'recommended',
      chemistryStatus: isChem ? (isFoundation ? 'required' : 'recommended') : 'recommended',
      fm: 'no-stated-preference',
      fmNote: isChem
        ? 'Further Mathematics is NOT an accepted second subject on this course. Lancaster\u2019s closed list here reads \u201Ca science subject from: Chemistry, Physics or Biology\u201D \u2014 and unlike every other Lancaster engineering discipline, it does not name Further Mathematics. The v0.8 accordion read settles this: the Batch 7 caveat that a position \u201Ccould exist\u201D in the unread body is resolved, and the answer is that Further Mathematics carries no stated preference for entry while being explicitly absent from the accepted-subject list.'
        : 'Further Mathematics appears on this course ONLY as one of the illustrative examples of an acceptable second subject \u2014 \u201Cfor example, Physics, Chemistry, Electronics, Design & Technology or Further Mathematics\u201D. Being a way to satisfy the physical-science rule is not a preference for taking it, and it is not stored as one. The Batch 7 caveat that a position might lurk in the unread accordion body is now resolved: the body was read in v0.8 and states no preference.',
      test: 'unknown',
      testNote: NO_TEST_NOTE,
      interview: isMEng ? 'sometimes' : 'not-stated',
      interviewNote: isMEng
        ? 'Lancaster prints, verbatim: “You will typically be asked to attend an interview.” Note the strength of that wording — Lancaster’s Physics pages say only “You may be asked”, and Lancaster’s Engineering BEng pages say nothing at all. Three different strengths across the same university, recorded per course.'
        : 'No interview sentence appears on this page. Its MEng sibling DOES carry one — “You will typically be asked to attend an interview” — and that difference is real across all six Engineering families, checked page by page rather than assumed.',
      contextual: CONTEXTUAL,
      gcse: isChem ? `${ENG_GCSE}${CHEM_GCSE_EXTRA}` : ENG_GCSE,
      english: ENG_IELTS,
      studyOptions:
        f.key === 'engineering' ? [COMMON_FIRST_YEAR, UNDECIDED_ROUTE] : [COMMON_FIRST_YEAR],
      verification: 'verified',
      identityVerification: 'official-page',
      identityNote:
        'Lancaster\u2019s own 2027 course page for this application was retrieved and read, and its title, award and UCAS code were separately confirmed against Lancaster\u2019s School of Engineering undergraduate listing, which enumerates all 42 Engineering codes. Two independent official sources agree on the identity.',
      officialUrl: L(engSlug(f.key, r.award, r.variant, r.code)),
      sourceUrl: L(engSlug(f.key, r.award, r.variant, r.code)),
      sourceTitle: `${title} ${r.award} Hons (${r.code}) - Lancaster University`,
      lastVerified: VERIFIED_ON,
      notes: [
        f.extra,
        r.variant === 'foundation' ? FOUNDATION_ROUTE_NOTE : null,
        r.variant === 'placement' || r.variant === 'study-abroad'
          ? 'THIS IS ITS OWN UCAS APPLICATION, NOT AN OPTION INSIDE THE PLAIN DEGREE. Lancaster codes the Study Abroad, Placement Year and Foundation Year forms of every discipline separately, so each is a separate record rather than a study option — the opposite of the Loughborough pattern, where one page carries two codes and one offer.'
          : null,
        RESOLVED_NOTE,
        NO_EPQ_ENG,
        'Science practical endorsement: not mentioned on any Engineering course page. Lancaster’s university-wide page carries “Lancaster University will require students taking these A levels to pass the science practical skills assessment as well as achieving the required subject grade” — but that page is UNDATED, and the list “these A levels” refers to was not itself captured, so which subjects it binds is unretrieved and it is not year-attributable to 2027.',
        NO_DEADLINE,
      ]
        .filter(Boolean)
        .join(' '),
    });
  }),
);

/*
 * H824 and H825 — the two codes Batch 7 could not reach for infrastructure
 * reasons rather than publishing ones.
 *
 * Batch 7's fetches returned "You've hit your session limit" and HTTP 429. It
 * declined to fill the gap from the regular pattern of the other 40 pages, and
 * said so: "prediction is not retrieval". In v0.8 both pages loaded on the
 * first attempt through a rendered browser and confirmed, independently, what
 * that prediction would have been — ABB for the BEng, AAA for the MEng, with
 * the same illustrative physical-science rule as every non-chemical family.
 *
 * Being right by luck is still not evidence, which is why these two rows sat
 * empty for a whole batch rather than being quietly completed.
 */
const nuclearPlacementCourses: Course[] = [
  { code: 'H824', award: 'BEng' as const, profile: 'ABB', years: 4 },
  { code: 'H825', award: 'MEng' as const, profile: 'AAA', years: 5 },
].map((r) => {
  const page = `nuclear-engineering-with-placement-year-${r.award.toLowerCase()}-hons-${r.code.toLowerCase()}`;
  const aLevelText = ENG_ALEVEL_TEXT(r.profile);
  return course({
    slug: `lancaster-nuclear-engineering-placement-year-${r.award.toLowerCase()}-hons-${r.code.toLowerCase()}`,
    universityId: 'lancaster',
    name: 'Nuclear Engineering with Placement Year',
    category: 'engineering',
    sub: 'nuclear',
    degree: r.award,
    awardLabel: `${r.award} Hons`,
    years: r.years,
    code: r.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: aLevelText,
    offers: [
      offer({
        label: 'A level requirements',
        gradeProfile: r.profile,
        required: ['Mathematics'],
        constraints: [PHYSICAL_SCIENCE_RULE],
        rawText: aLevelText,
        notes: `Lancaster prints the grade as a key-fact tile reading “A level requirements ${r.profile}” and the subject rule inside the entry-requirements accordion. Both were read directly on this course’s own page.`,
      }),
    ],
    maths: 'required',
    physicsStatus: 'recommended',
    chemistryStatus: 'recommended',
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics appears only as one of the illustrative examples of an acceptable second subject. Being a way to satisfy the physical-science rule is not a preference for taking it, and it is not stored as one.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: r.award === 'MEng' ? 'sometimes' : 'not-stated',
    interviewNote:
      r.award === 'MEng'
        ? 'Lancaster prints, verbatim: “You will typically be asked to attend an interview.” Stronger than its Physics wording (“You may be asked”) and stronger than its own Engineering BEng pages, which say nothing.'
        : 'No interview sentence appears on this page. Its MEng sibling does carry one, and that BEng/MEng difference holds across all six Lancaster engineering families.',
    contextual: CONTEXTUAL,
    gcse: ENG_GCSE,
    english: ENG_IELTS,
    studyOptions: [COMMON_FIRST_YEAR],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'Lancaster’s own 2027 course page was retrieved and read in v0.8, confirming the title, award and UCAS code that Batch 7 had taken from the School of Engineering listing. Two independent official sources now agree.',
    officialUrl: L(page),
    sourceUrl: L(page),
    sourceTitle: `Nuclear Engineering with Placement Year ${r.award} Hons (${r.code}) - Lancaster University`,
    lastVerified: V08_READ_ON,
    notes: [
      'CLOSED IN v0.8. Batch 7 left this record identity-only because its page would not load — one attempt hit a session limit and the other returned HTTP 429 — and it deliberately refused to fill the gap from the 40 sibling pages that follow an identical pattern. The page loaded first time through a rendered browser in v0.8 and confirms exactly what the pattern predicted. The prediction was still not evidence when it was made.',
      'THIS IS ITS OWN UCAS APPLICATION, NOT AN OPTION INSIDE THE PLAIN NUCLEAR ENGINEERING DEGREE. Lancaster codes the placement-year form separately, as it does for every discipline.',
      'NUCLEAR ENGINEERING IS THE ONE LANCASTER FAMILY WITHOUT A FULL SET OF SEVEN CODES: it has no study-abroad MEng pairing beyond H823 and no placement-year foundation route, so it runs to five plain codes plus these two. The asymmetry is Lancaster’s and has not been evened out.',
      NO_EPQ_ENG,
      NO_DEADLINE,
    ].join(' '),
  });
});

/* ------------------------------------------------------------------ */
/* Physics — 25 codes, 2 fully read, 23 identity-only                   */
/* ------------------------------------------------------------------ */

/*
 * ---------------------------------------------------------------------------
 *  PHYSICS CLOSED IN v0.8 — THE SAME ACCORDION, THE SAME FIX
 * ---------------------------------------------------------------------------
 *
 *  Batch 7 read two Physics pages and left 23 as identity only, because the
 *  same accordion that hid Engineering's subject rule hid Physics's too, and
 *  because a research pass ran out of budget. All 25 were fetched same-origin
 *  through a rendered browser in v0.8 and every one of them served its
 *  requirements.
 *
 *  THE ANSWER TO THE QUESTION BATCH 7 LEFT OPEN — "do the Physics variants
 *  really all share one offer?" — IS YES FOR 24 OF 25, AND NO FOR THE 25th:
 *
 *    · 24 courses, every award and every variant:
 *        "AAA. This should include Mathematics grade A and Physics grade A."
 *    · Physics (with a Foundation Year), F30F:
 *        "CCC. This should include Mathematics and Physics."
 *
 *  That uniformity was NOT assumed. Batch 7 explicitly refused to copy the
 *  shared string across the unread variants on the grounds that a shared string
 *  on the pages you read is not evidence about the pages you did not. It turned
 *  out to be right — and it also turned out that checking was the only way to
 *  discover the foundation year is a genuine exception.
 *
 *  ONE THING THE COURSE PAGES NOW SETTLE THAT THE BROCHURE ONLY IMPLIED: the
 *  subject GRADES. Batch 7 took "an A in both Mathematics and Physics" from
 *  Lancaster's 2027 departmental brochure and labelled it as brochure-sourced
 *  precisely because the course page would not serve it. The course pages now
 *  say it themselves, word for word, so the two independent official sources
 *  agree and the caveat can be retired rather than carried.
 *
 *  AND THE GCSE ASYMMETRY SURVIVES THE FULL READ, which is worth stating because
 *  it is counter-intuitive: Lancaster Physics requires NO GCSE Mathematics
 *  ("English Language grade 4/C" only), while all 42 Engineering codes require
 *  GCSE Mathematics at 6/B. The physics foundation year is the single exception
 *  on the physics side, and it asks for GCSE Maths 6/B like engineering does.
 */

const PHYS_ALEVEL_TEXT = 'AAA. This should include Mathematics grade A and Physics grade A.';

const PHYS_FOUNDATION_ALEVEL_TEXT = 'CCC. This should include Mathematics and Physics.';

const PHYS_RESOLVED_NOTE =
  'RESOLVED IN v0.8 BY A RENDERED-BROWSER READ. Batch 7 reached this course’s identity from Lancaster’s Department of Physics listing but could not reach its page; a text fetch of the /2027/ URL returned a redirect loop, and where a page did load, its entry-requirements accordion served headings without bodies. All 25 physics pages were fetched same-origin and parsed individually in v0.8. Nothing here is copied from a sibling: the shared AAA string is what each page independently says, and the foundation year’s CCC is what its own page says instead.';

const PHYS_FM_RESOLVED =
  'Further Mathematics is never raised — not on the course page, not in its entry-requirements accordion, not in the 2027 Physics brochure. The accordion was read IN FULL in v0.8, which is what changes this from “unknown” to “no stated preference”: Batch 7 recorded unknown because the section that would carry a position had never been served, and that is no longer true. Lancaster publishes no preference either way. It is not recorded as required, accepted or excluded.';

const PHYS_FOUNDATION_GCSE =
  'Genuine course-page text: “Mathematics grade 6/B, English Language grade 4/C.” THE ONE PHYSICS COURSE THAT ASKS FOR GCSE MATHEMATICS — Lancaster’s other 24 physics codes publish an English Language requirement only, while all 42 of its engineering codes ask for Maths 6/B. The foundation year sits with engineering on this, and it was read rather than assumed.';

const PHYS_CYCLE_NOTE =
  'Published requirements for 2027 entry, with a caveat kept rather than smoothed: Lancaster’s page carries an “Entry year 2027 or 2026” selector and the 2027 view is selected by the /2027/ path, so the cycle is established by path and selector rather than by a caption over the requirements panel.';

const PHYS_SUBJECTS_NOTE =
  'TWO INDEPENDENT OFFICIAL SOURCES NOW AGREE ON THE SUBJECT GRADES, so the Batch 7 caveat is retired rather than carried. Batch 7 could only take these from Lancaster’s 2027 Department of Physics brochure — “Typical A level offer (all include an A in both Mathematics and Physics): AAA” and “Physics at A level (or equivalent) is essential, as is Mathematics” — because the course page’s accordion body was never served. In v0.8 the page itself served it, and says the same thing in its own words: “AAA. This should include Mathematics grade A and Physics grade A.”';

const PHYS_EPQ =
  'Alternative offer route, from the 2027 Physics brochure: “For those doing more than three A levels or an Extended Project Qualification (EPQ), the entry requirement is AABB, including A in Physics and A in Maths, plus B or higher in your 4th A level or EPQ.” Lancaster also runs a university-wide EPQ DUAL-OFFER under which eligible applicants may receive two offers — the usual one, plus one a grade lower with a B in the EPQ — but that statement sits on an UNDATED page and is not year-attributable to 2027.';

const PHYS_GCSE =
  'Genuine course-page text: “English Language grade 4/C.” Lancaster adds “We will also look at your overall GCSE profile when considering your application as a whole” and “We do have flexibility when considering GCSE requirements.” NOTE WHAT IS ABSENT: no GCSE Mathematics requirement is stated for Lancaster Physics, where every one of the 42 Engineering codes requires GCSE Mathematics at 6/B. That is the reverse of what most readers would guess.';

const physicsVerified: Course[] = (
  [
    {
      slug: 'lancaster-physics-bsc-hons-f300',
      name: 'Physics',
      award: 'BSc' as const,
      years: 3,
      code: 'F300',
      page: 'physics-bsc-hons-f300',
      extra:
        'Note the retrieval history, because it shaped the method: the first fetch of this page returned “Too many redirects” and a cache-busted retry succeeded. That is the second independent confirmation in this research that a cache-buster turns a failed Lancaster fetch into a successful one.',
    },
    {
      slug: 'lancaster-physics-mphys-hons-f303',
      name: 'Physics',
      award: 'MPhys' as const,
      years: 4,
      code: 'F303',
      page: 'physics-mphys-hons-f303',
      extra:
        'THE SAME GRADE STRING AS THE BSc (AAA) — the integrated Master’s is NOT a higher offer in Lancaster Physics, which is the opposite of the Engineering pattern in the same university, where BEng asks ABB and MEng asks AAA.',
    },
  ] as const
).map((s) =>
  course({
    slug: s.slug,
    universityId: 'lancaster',
    name: s.name,
    category: 'physics',
    sub: 'physics',
    degree: s.award,
    awardLabel: `${s.award} Hons`,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: PHYS_CYCLE_NOTE,
    raw: PHYS_ALEVEL_TEXT,
    offers: [
      offer({
        label: 'A level requirements',
        gradeProfile: 'AAA',
        required: [
          ['Mathematics', 'A'],
          ['Physics', 'A'],
        ],
        rawText: PHYS_ALEVEL_TEXT,
        notes: `Lancaster prints the grade as a standalone key-fact tile reading “A level requirements AAA” and the subject rule separately inside the entry-requirements accordion, which now reads: “${PHYS_ALEVEL_TEXT}” ${PHYS_SUBJECTS_NOTE}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: PHYS_FM_RESOLVED,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote:
      'Course page, verbatim: “You may be asked to attend an interview.” The 2027 Physics brochure frames it as something offered rather than imposed: “As part of the application process, we will offer you the option of an interview…” Note this is weaker than Lancaster’s own Engineering MEng wording, “You will typically be asked”.',
    contextual: CONTEXTUAL,
    gcse: PHYS_GCSE,
    english:
      'Genuine course-page text: “If English is not your first language, we require an IELTS score of 6.0 overall with at least 5.5 in each component for this programme.” Lower than Lancaster Engineering, which asks 6.5 / 5.5.',
    studyOptions: [PHYS_COMMON, PHYS_TRANSFER],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'Lancaster’s own 2027 course page for this application was retrieved and read, and its title, award and UCAS code were separately confirmed against the Department of Physics undergraduate listing, which enumerates all 25 Physics codes.',
    officialUrl: L(s.page),
    sourceUrl: L(s.page),
    sourceTitle: `${s.name} ${s.award} Hons (${s.code}) - Lancaster University`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra,
      PHYS_EPQ,
      'Science practical endorsement: not stated at course level. Lancaster’s university-wide page carries a practical-skills sentence, but that page is undated and the subject list it refers to was not captured.',
      'PLACEMENT YEAR AND STUDY ABROAD ARE SEPARATE UCAS CODES, not options inside this application — F306/F307 for placement and F304/F305 for study abroad. Each is its own record.',
      NO_DEADLINE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

/** The 23 Physics codes whose own pages were not reached. */
const PHYS_SHELLS: {
  slug: string;
  name: string;
  award: 'BSc' | 'MPhys' | 'MSci';
  years: number;
  code: string;
  sub: 'physics' | 'astrophysics' | 'theoretical-physics' | 'physics-with-mathematics';
  extra?: string;
}[] = [
  { slug: 'lancaster-physics-placement-year-bsc-hons-f306', name: 'Physics (Placement Year)', award: 'BSc', years: 4, code: 'F306', sub: 'physics' },
  { slug: 'lancaster-physics-placement-year-mphys-hons-f307', name: 'Physics (Placement Year)', award: 'MPhys', years: 5, code: 'F307', sub: 'physics' },
  { slug: 'lancaster-physics-study-abroad-bsc-hons-f304', name: 'Physics (Study Abroad)', award: 'BSc', years: 4, code: 'F304', sub: 'physics' },
  { slug: 'lancaster-physics-study-abroad-mphys-hons-f305', name: 'Physics (Study Abroad)', award: 'MPhys', years: 5, code: 'F305', sub: 'physics' },
  { slug: 'lancaster-physics-foundation-year-bsc-hons-f30f', name: 'Physics (with a Foundation Year)', award: 'BSc', years: 4, code: 'F30F', sub: 'physics', extra: 'THE ONLY FOUNDATION-YEAR ROUTE IN LANCASTER’S PHYSICS PORTFOLIO — the other three physics families have none, unlike Engineering where every one of the six families has one.' },
  { slug: 'lancaster-physics-with-astrophysics-bsc-hons-f3fm', name: 'Physics with Astrophysics', award: 'BSc', years: 3, code: 'F3FM', sub: 'astrophysics', extra: 'A CROSS-INSTITUTION CODE COLLISION WORTH NOTING: F3FM is also Southampton’s code for Physics with Astronomy MPhys. UCAS codes are unique within an institution, not between them, and the two must never be merged.' },
  { slug: 'lancaster-physics-with-astrophysics-mphys-hons-f3f5', name: 'Physics with Astrophysics', award: 'MPhys', years: 4, code: 'F3F5', sub: 'astrophysics', extra: 'F3F5 is also Bristol’s and York’s code for their own Physics with Astrophysics degrees — three universities, one code, three different applications.' },
  { slug: 'lancaster-physics-with-astrophysics-placement-year-bsc-hons-f3f8', name: 'Physics with Astrophysics (Placement Year)', award: 'BSc', years: 4, code: 'F3F8', sub: 'astrophysics' },
  { slug: 'lancaster-physics-with-astrophysics-placement-year-mphys-hons-f3f9', name: 'Physics with Astrophysics (Placement Year)', award: 'MPhys', years: 5, code: 'F3F9', sub: 'astrophysics' },
  { slug: 'lancaster-physics-with-astrophysics-study-abroad-bsc-hons-f3f1', name: 'Physics with Astrophysics (Study Abroad)', award: 'BSc', years: 4, code: 'F3F1', sub: 'astrophysics' },
  { slug: 'lancaster-physics-with-astrophysics-study-abroad-mphys-hons-f3f7', name: 'Physics with Astrophysics (Study Abroad)', award: 'MPhys', years: 5, code: 'F3F7', sub: 'astrophysics' },
  { slug: 'lancaster-theoretical-physics-bsc-hons-f340', name: 'Theoretical Physics', award: 'BSc', years: 3, code: 'F340', sub: 'theoretical-physics', extra: 'ANOTHER CROSS-INSTITUTION COLLISION: F340 is Bristol’s code for its Theoretical Physics MSci, and it was also the code an old scaffold row wrongly attached to a non-existent Imperial degree. Here it is Lancaster’s, and it is real.' },
  { slug: 'lancaster-theoretical-physics-mphys-hons-f321', name: 'Theoretical Physics', award: 'MPhys', years: 4, code: 'F321', sub: 'theoretical-physics' },
  { slug: 'lancaster-theoretical-physics-placement-year-bsc-hons-f342', name: 'Theoretical Physics (Placement Year)', award: 'BSc', years: 4, code: 'F342', sub: 'theoretical-physics' },
  { slug: 'lancaster-theoretical-physics-placement-year-mphys-hons-f323', name: 'Theoretical Physics (Placement Year)', award: 'MPhys', years: 5, code: 'F323', sub: 'theoretical-physics' },
  { slug: 'lancaster-theoretical-physics-study-abroad-bsc-hons-f341', name: 'Theoretical Physics (Study Abroad)', award: 'BSc', years: 4, code: 'F341', sub: 'theoretical-physics' },
  { slug: 'lancaster-theoretical-physics-study-abroad-mphys-hons-f322', name: 'Theoretical Physics (Study Abroad)', award: 'MPhys', years: 5, code: 'F322', sub: 'theoretical-physics' },
  { slug: 'lancaster-theoretical-physics-with-mathematics-bsc-hons-f3gc', name: 'Theoretical Physics with Mathematics', award: 'BSc', years: 3, code: 'F3GC', sub: 'physics-with-mathematics' },
  { slug: 'lancaster-theoretical-physics-with-mathematics-msci-hons-f3g1', name: 'Theoretical Physics with Mathematics', award: 'MSci', years: 4, code: 'F3G1', sub: 'physics-with-mathematics', extra: 'THE OLD SCAFFOLD CLAIMED AN MPhys HERE AND WAS WRONG ABOUT THE AWARD. Lancaster’s integrated Master’s in this family is an MSci, UCAS F3G1. There is no MPhys in the Theoretical Physics with Mathematics family — it is the one physics family of the four that does not award MPhys.' },
  { slug: 'lancaster-theoretical-physics-with-mathematics-placement-year-bsc-hons-f3g6', name: 'Theoretical Physics with Mathematics (Placement Year)', award: 'BSc', years: 4, code: 'F3G6', sub: 'physics-with-mathematics' },
  { slug: 'lancaster-theoretical-physics-with-mathematics-placement-year-msci-hons-f3g7', name: 'Theoretical Physics with Mathematics (Placement Year)', award: 'MSci', years: 5, code: 'F3G7', sub: 'physics-with-mathematics' },
  { slug: 'lancaster-theoretical-physics-with-mathematics-study-abroad-bsc-hons-f3g4', name: 'Theoretical Physics with Mathematics (Study Abroad)', award: 'BSc', years: 4, code: 'F3G4', sub: 'physics-with-mathematics' },
  { slug: 'lancaster-theoretical-physics-with-mathematics-study-abroad-msci-hons-f3g5', name: 'Theoretical Physics with Mathematics (Study Abroad)', award: 'MSci', years: 5, code: 'F3G5', sub: 'physics-with-mathematics' },
];


const physicsShells: Course[] = PHYS_SHELLS.map((s) => {
  const isFoundation = s.code === 'F30F';
  const aLevelText = isFoundation ? PHYS_FOUNDATION_ALEVEL_TEXT : PHYS_ALEVEL_TEXT;
  const page = s.slug.replace(/^lancaster-/, '');
  return course({
    slug: s.slug,
    universityId: 'lancaster',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.award === 'BSc' ? 'BSc' : s.award === 'MSci' ? 'MSci' : 'MPhys',
    awardLabel: `${s.award} Hons`,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: PHYS_CYCLE_NOTE,
    raw: aLevelText,
    offers: [
      offer({
        label: 'A level requirements',
        gradeProfile: isFoundation ? 'CCC' : 'AAA',
        required: isFoundation
          ? ['Mathematics', 'Physics']
          : [
              ['Mathematics', 'A'],
              ['Physics', 'A'],
            ],
        rawText: aLevelText,
        notes: isFoundation
          ? `Lancaster prints the grade as a key-fact tile reading “A level requirements CCC” and the subject rule inside the entry-requirements accordion: “${PHYS_FOUNDATION_ALEVEL_TEXT}” NO SUBJECT GRADE IS PINNED HERE, unlike the other 24 physics codes, which all require grade A in both named subjects. The foundation year asks for the subjects without naming a grade in either.`
          : `Lancaster prints the grade as a key-fact tile reading “A level requirements AAA” and the subject rule inside the entry-requirements accordion: “${PHYS_ALEVEL_TEXT}” Both grades are pinned by name, so a stronger aggregate cannot compensate for a B in Mathematics or Physics.`,
      }),
    ],
    maths: 'required',
    physicsStatus: 'required',
    chemistryStatus: 'unknown',
    fm: 'no-stated-preference',
    fmNote: PHYS_FM_RESOLVED,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'sometimes',
    interviewNote:
      'Lancaster’s physics wording is an offer rather than an imposition — course page: “You may be asked to attend an interview.” and the 2027 Physics brochure: “As part of the application process, we will offer you the option of an interview…” Weaker than Lancaster’s own Engineering MEng wording, “You will typically be asked”, and that difference is real rather than editorial.',
    contextual: CONTEXTUAL,
    gcse: isFoundation ? PHYS_FOUNDATION_GCSE : PHYS_GCSE,
    english:
      'Genuine course-page text: “If English is not your first language, we require an IELTS score of 6.0 overall with at least 5.5 in each component for this programme.” Lower than Lancaster Engineering, which asks 6.5 / 5.5.',
    studyOptions: [PHYS_COMMON, PHYS_TRANSFER],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'Lancaster’s own 2027 course page for this application was retrieved and read in v0.8, and its title, award and UCAS code were separately confirmed against the Department of Physics undergraduate listing, which enumerates all 25 Physics codes. Two independent official sources agree on the identity.',
    officialUrl: L(page),
    sourceUrl: L(page),
    sourceTitle: `${s.name} ${s.award} Hons (${s.code}) - Lancaster University`,
    lastVerified: V08_READ_ON,
    notes: [
      s.extra,
      PHYS_RESOLVED_NOTE,
      isFoundation
        ? 'THE ONE PHYSICS COURSE THAT BREAKS THE SHARED OFFER. Every other Lancaster physics code asks AAA with grade A in Mathematics and Physics; this one asks CCC with the two subjects named and no grade pinned to either. Finding it is the reason the 24 identical strings were checked individually instead of copied — a single exception is invisible to an assumption.'
        : null,
      isFoundation ? null : PHYS_EPQ,
      'PLACEMENT YEAR, STUDY ABROAD AND THE FOUNDATION YEAR ARE SEPARATE UCAS CODES, not options inside another application. Lancaster codes each form of each physics family separately, exactly as it does across its six engineering families.',
      NO_DEADLINE,
    ]
      .filter(Boolean)
      .join(' '),
  });
});

/** Lancaster records carrying real 2027 admissions data. */
export const batch7LancasterCourses: Course[] = [
  ...physicsVerified,
  ...physicsShells,
  ...engineeringCourses,
  ...nuclearPlacementCourses,
];

/** Lancaster records carrying confirmed identity and nothing else. */
export const batch7LancasterAwaitingCourses: Course[] = [];

export const batch7LancasterAll: Course[] = [
  ...batch7LancasterCourses,
  ...batch7LancasterAwaitingCourses,
];

/**
 * Titles searched for at Lancaster and absent from its own 2027 listings.
 * Exported so the assertion suite can prove no record was created for them.
 */
export const LANCASTER_NONEXISTENT_TITLES: readonly string[] = [
  'Particle Physics',
  'Cosmology',
  'Astrophysics',
  'Physics with Mathematics',
] as const;

/**
 * The six Engineering disciplines that are each a real, separately coded family
 * at Lancaster. Exported so the suite can prove the common first year never
 * collapses them into General Engineering.
 */
export const LANCASTER_ENGINEERING_FAMILIES: readonly string[] = [
  'Engineering',
  'Chemical Engineering',
  'Electronic and Electrical Engineering',
  'Mechanical Engineering',
  'Mechatronic Engineering',
  'Nuclear Engineering',
] as const;
