/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 5, PART D: THE UNIVERSITY OF SHEFFIELD
 *  2027 entry. Read from Sheffield's own 2027 course pages on 2026-09-14.
 *  Every page's requirements panel showed "2027-28 entry".
 * ---------------------------------------------------------------------------
 *  1. EVERY NON-FOUNDATION COURSE PUBLISHES TWO OFFER COLUMNS SIDE BY SIDE:
 *     "Standard Offer" and "Access Sheffield Offer". The second is Sheffield's
 *     contextual offer and is stored separately throughout — never merged into
 *     the headline, never matched against grades.
 *
 *  2. THE CONTEXTUAL OFFER IS NOT ALWAYS A PLAIN GRADE DECREMENT. Mechanical
 *     Engineering's standard offer is "A*AA including Maths and at least one of
 *     Physics, Chemistry or Biology"; its Access Sheffield offer is "AAB
 *     including A in Maths and B in at least one of Physics, Chemistry or
 *     Biology" — it ADDS per-subject minimum grades the standard offer does not
 *     impose. Modelling contextual offers as "one grade lower" would be wrong
 *     here.
 *
 *  3. FOUNDATION-YEAR COURSES PUBLISH NO ACCESS SHEFFIELD COLUMN AT ALL — a
 *     genuine structural difference, verified on all fourteen of them, not a
 *     retrieval failure.
 *
 *  4. THE FOUNDATION-YEAR OFFER IS A DUAL-FORMAT STRING, "BBB; BBC". Not a
 *     range and not a typo: Sheffield expands it as "BBB (any A Level); BBC
 *     including Maths and at least one of Physics, Chemistry or Biology" — two
 *     alternative routes in one cell, so it is stored as two pathways.
 *
 *  5. SIX DIFFERENT SUBJECT RULES ACROSS ENGINEERING, none interchangeable:
 *     Aerospace/Biomedical/EEE/Computer Systems/Mechatronic — Maths + "a
 *     science" (with different accepted-science lists per department);
 *     Chemical — Maths + "a science or technology subject" (the broadest list);
 *     Civil/Civil and Structural/Architectural — Maths ONLY, and the only
 *     subject-EXCLUSION rule in the catalogue;
 *     General Engineering — Maths AND Physics, both named;
 *     Materials — "two of Maths, Physics or Chemistry", where Maths is not
 *     individually mandatory;
 *     Mechanical — Maths + at least one of Physics, Chemistry or Biology.
 *
 *  6. CIVIL AND STRUCTURAL IS ASYMMETRIC ACROSS AWARDS. The BEng is titled
 *     Civil Engineering (H202); the MEng is Civil and Structural Engineering
 *     (H210). There is no Civil Engineering MEng and no Civil and Structural
 *     BEng, and the foundation pair mirrors it.
 *
 *  7. Year in industry and year abroad are STUDY OPTIONS everywhere at
 *     Sheffield — no "with a Year in Industry" course has its own UCAS code in
 *     the 2027 catalogue. Foundation years, by contrast, DO have their own
 *     codes and are separate applications.
 *
 *  8. No admissions test and no interview is stated on ANY of the 49 pages.
 *     Recorded as not stated; Sheffield publishes no "we do not use a test"
 *     statement either.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, atLeastAt, oneOf } from './builders';

const VERIFIED_ON = '2026-09-14';

const CYCLE =
  'Published requirements for 2027 entry. Every page read carried a “2027-28 entry” requirements panel. This is not confirmed 2028 data.';

const S = (slug: string) => `https://www.sheffield.ac.uk/undergraduate/courses/2027/${slug}`;

const NO_TEST_NOTE =
  'The page contains no admissions-test statement of any kind. No Physics or Engineering course at Sheffield references PAT, ESAT, TMUA, MAT or any other test. This is silence, not a published “no admissions test”.';

const NO_INTERVIEW_NOTE =
  'The page contains no interview statement of any kind. This is silence rather than a published “we do not interview”.';

const NO_DEADLINE_NOTE = 'Sheffield publishes no application deadline on the course page.';

const GCSE_ENGLISH = 'GCSE English Language at grade 4/C.';

const BTEC_NOTE =
  'Sheffield states that the BTEC Extended Diploma and BTEC Diploma are “Not accepted” on their own for this course.';

const ACCESS_POLICY =
  'Sheffield’s scheme is “Access Sheffield”, printed as a second offer column beside the standard one on every non-foundation course page. Its policy page allows A-Level contextual offers “one, two or three grades below the standard requirements”, which is wider than the one-grade reduction actually printed on these course pages. A named sub-scheme, “Access+”, covers residents of IMD quintile 1–2 areas, free-school-meal recipients, care-experienced students, care leavers, young carers, estranged students, student parents and forced migrants (asylum seekers, refugees and humanitarian-protection recipients), plus completers of Realising Opportunities, Access to Sheffield and Sutton Trust programmes. Applicants must have home fee status. Care-experienced and estranged students are covered inside Access+ rather than as a separate published offer. This is a separate access route and is not matched against grades here.';

const accessOffer = (grades: string, restructured?: boolean): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Access Sheffield Offer: ${grades}${
    restructured
      ? ' — note that this contextual offer RESTRUCTURES the subject rule rather than simply lowering the grades: it adds per-subject minimum grades (A in Mathematics, B in the science) that the standard offer does not impose.'
      : ''
  } ${ACCESS_POLICY}`,
});

const NO_ACCESS: ContextualOfferInfo = {
  availability: 'no',
  details:
    'Sheffield publishes no Access Sheffield column on its foundation-year courses. Every one of the fourteen foundation-year pages prints a single offer only — a genuine structural difference from the direct-entry courses, not a missing figure.',
};

const EPQ_NOTE =
  'Sheffield also prints a row for “A Levels + a fourth Level 3 qualification”, whose figure is identical in the Standard and Access Sheffield columns — so a contextual applicant gains no further reduction through the EPQ route. It is an alternative offer route, not the standard offer, and is not matched here.';

const placementOption = (from: number, to: number): StudyOption => ({
  name: 'Optional placement year',
  description: `Sheffield states: “You may have the opportunity to add an optional placement year as part of your course, converting the ${
    from === 3 ? 'three' : 'four'
  }-year course to a ${to === 4 ? 'four' : 'five'}-year Degree with Placement Year.” No separate UCAS code — at Sheffield no “with a Year in Industry” course has its own code in the 2027 catalogue.`,
  ucasCode: null,
  chosenWhen: 'During the degree.',
  officialUrl: null,
});

const YEAR_ABROAD: StudyOption = {
  name: 'Year abroad',
  description:
    'Sheffield states: “You can apply to extend this course with a year abroad, usually between the second and third year.” No separate UCAS code. This is Sheffield’s only study-abroad provision for these subjects — there is no separate “Physics with Study in Europe / North America” course.',
  ucasCode: null,
  chosenWhen: 'Usually between the second and third year.',
  officialUrl: null,
};

/* ------------------------------------------------------------------ */
/* Physics — School of Mathematical and Physical Sciences              */
/* ------------------------------------------------------------------ */

const PHYS_PRACTICAL = 'pass in the practical element of any science A Levels taken';

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys';
  sub: 'physics' | 'astrophysics' | 'theoretical-physics';
  years: number;
  yearsMax?: number;
  code: string;
  page: string;
  profile: string;
  access: string | null;
  foundation?: boolean;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'sheffield-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, yearsMax: 4, code: 'F300', page: 'physics-bsc', profile: 'AAB', access: 'ABB' },
  { slug: 'sheffield-physics-mphys', name: 'Physics', degree: 'MPhys', sub: 'physics', years: 4, yearsMax: 5, code: 'F301', page: 'physics-mphys', profile: 'AAA', access: 'AAB' },
  { slug: 'sheffield-physics-and-astrophysics-bsc', name: 'Physics and Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, yearsMax: 4, code: 'FF35', page: 'physics-and-astrophysics-bsc', profile: 'AAB', access: 'ABB' },
  { slug: 'sheffield-physics-and-astrophysics-mphys', name: 'Physics and Astrophysics', degree: 'MPhys', sub: 'astrophysics', years: 4, yearsMax: 5, code: 'F3F5', page: 'physics-and-astrophysics-mphys', profile: 'AAA', access: 'AAB' },
  { slug: 'sheffield-theoretical-physics-bsc', name: 'Theoretical Physics', degree: 'BSc', sub: 'theoretical-physics', years: 3, yearsMax: 4, code: 'F344', page: 'theoretical-physics-bsc', profile: 'AAB', access: 'ABB' },
  { slug: 'sheffield-theoretical-physics-mphys', name: 'Theoretical Physics', degree: 'MPhys', sub: 'theoretical-physics', years: 4, yearsMax: 5, code: 'F321', page: 'theoretical-physics-mphys', profile: 'AAA', access: 'AAB' },
  { slug: 'sheffield-physics-with-a-foundation-year-bsc', name: 'Physics with a Foundation Year', degree: 'BSc', sub: 'physics', years: 4, code: 'F302', page: 'physics-with-a-foundation-year-bsc', profile: 'BBB', access: null, foundation: true },
  { slug: 'sheffield-physics-with-a-foundation-year-mphys', name: 'Physics with a Foundation Year', degree: 'MPhys', sub: 'physics', years: 5, code: 'F309', page: 'physics-with-a-foundation-year-mphys', profile: 'BBB', access: null, foundation: true },
];

const sheffieldPhysics: Course[] = PHYS_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'sheffield',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    yearsMax: s.yearsMax ?? null,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: s.foundation ? null : `${s.profile} including Maths and Physics + ${PHYS_PRACTICAL}`,
    offers: s.foundation
      ? [
          offer({
            label: 'Standard Offer — first published route',
            gradeProfile: 'BBB',
            rawText: 'BBB; BBC',
            notes:
              'Sheffield prints the foundation-year A-Level cell as “BBB; BBC” and expands it as “BBB (any A Level); BBC including Maths and at least one of Physics, Chemistry or Biology”. This is the first of the two routes: BBB in any A-Levels, with no subject condition. Sheffield’s framing: “If you don’t have the usual scientific or mathematical background for an engineering degree, a foundation year is for you.”',
          }),
          offer({
            label: 'Standard Offer — second published route',
            gradeProfile: 'BBC',
            required: ['Mathematics'],
            constraints: [
              oneOf(['Physics', 'Chemistry', 'Biology'], null, 'At least one of Physics, Chemistry or Biology.'),
            ],
            rawText: 'BBB; BBC',
            notes:
              'The second of the two routes Sheffield packs into the single cell “BBB; BBC”: “BBC including Maths and at least one of Physics, Chemistry or Biology”. Note the physics foundation year says “Maths and/or Physics” in places where the degree pages say “Maths and Physics” — one word apart, a different rule.',
          }),
        ]
      : [
          offer({
            label: 'Standard Offer',
            gradeProfile: s.profile,
            required: ['Mathematics', 'Physics'],
            rawText: `${s.profile} including Maths and Physics + ${PHYS_PRACTICAL}`,
            notes: `Sheffield’s Standard Offer column: “${s.profile} including Maths and Physics + ${PHYS_PRACTICAL}”. Both subjects are named with no alternation and no per-subject minimum grade. ${EPQ_NOTE} ${BTEC_NOTE}`,
          }),
        ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics does not appear anywhere in this course’s offer rows. Sheffield names it in its central Access Sheffield policy as a qualification-based route, but not as a requirement or preference for this course.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: s.access ? accessOffer(`${s.access} including Maths and Physics + ${PHYS_PRACTICAL}`) : NO_ACCESS,
    gcse: s.foundation
      ? `${GCSE_ENGLISH} Sheffield adds a conditional rule for foundation years: “If you are studying both Maths and at least one of Physics, Chemistry or Biology at A Level (or equivalent), there are no additional GCSE requirements. If studying any other subject combination, we require GCSE Science grade 6/B (or 65 in GCSE Double Award Science) and Maths grade 7/A.”`
      : GCSE_ENGLISH,
    studyOptions: s.foundation ? [] : [placementOption(s.years, (s.yearsMax ?? s.years + 1)), YEAR_ABROAD],
    verification: 'verified',
    officialUrl: S(s.page),
    sourceUrl: S(s.page),
    sourceTitle: `${s.name} ${s.degree} | The University of Sheffield`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.foundation
        ? 'Foundation-year courses at Sheffield have their own UCAS codes and are separate applications. They publish no Access Sheffield column at all.'
        : `Science practical: Sheffield requires a “${PHYS_PRACTICAL}”.`,
      NO_DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

/* ------------------------------------------------------------------ */
/* Engineering — Faculty of Engineering                                */
/* ------------------------------------------------------------------ */

const SCIENCE_AEROSPACE = ['Biology', 'Human Biology', 'Chemistry', 'Further Mathematics', 'Physics', 'Statistics'];
const SCIENCE_GENERAL = [
  'Chemistry',
  'Physics',
  'Biology',
  'Human Biology',
  'Electronics',
  'Engineering',
  'Technology',
  'Environmental Science',
  'Computer Science',
  'Further Mathematics',
  'Statistics',
];
const SCIENCE_CHEMICAL = [
  'Biology',
  'Human Biology',
  'Chemistry',
  'Computer Science',
  'Electronics',
  'Environmental Science',
  'Further Mathematics',
  'Physics',
  'Design and Technology',
];
const MECH_SCIENCES = ['Physics', 'Chemistry', 'Biology'];

const CIVIL_EXCLUSION =
  'Sheffield publishes the only subject-exclusion rule in its whole Physics and Engineering catalogue here: “Acceptable Maths subjects include Maths, Maths with Mechanics, Further Maths or Applied Maths, but not Statistics or Use of Maths. Pure Maths is only acceptable when combined with Physics.”';

type EngRule =
  | 'science-aerospace'
  | 'science-general'
  | 'science-chemical'
  | 'maths-only'
  | 'maths-and-physics'
  | 'two-of-three'
  | 'mech'
  | 'foundation';

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng';
  sub:
    | 'aerospace'
    | 'biomedical'
    | 'chemical'
    | 'civil'
    | 'electrical'
    | 'computer-engineering'
    | 'mechanical'
    | 'general-engineering'
    | 'materials';
  years: number;
  yearsMax?: number;
  code: string;
  page: string;
  profile: string;
  access: string | null;
  rule: EngRule;
  gcseExtra?: string;
  options?: StudyOption[];
  extra?: string;
}

/**
 * BATCH 7 — H100 was partially verified for two batches and is now fully
 * verified. The blocker was never Sheffield: ten WebFetch attempts across two
 * batches were each truncated by page length before the "Entry requirements"
 * heading, because the module lists for the six MEng streams sit between the
 * key-facts panel and the requirements table. A RENDERED BROWSER read returns
 * the whole document body in one pass, so page length stops being the
 * constraint, and every outstanding field came back at once — subject wording,
 * cross-subject rules, the Further Mathematics position, the Access Sheffield
 * cell, the fourth-qualification row and the GCSE rule.
 *
 * Nothing here was taken from the General Engineering BEng. The two records
 * happen to agree on the A-level rows, which is exactly why inferring one from
 * the other would have looked safe and been unjustified.
 */
const H100_RESOLVED =
  'RESOLVED IN BATCH 7 BY A RENDERED BROWSER READ, after ten text fetches across two batches had each been truncated by page length before the entry-requirements table. The page’s own cycle switcher reads “2027-28 entry View 2026-27 entry”, so this is the 2027-28 record and it links away to 2026-27. Every previously missing field is now supported: the offer is “A*AA including Maths and Physics”; the Access Sheffield offer is AAA including Maths and Physics; the fourth-qualification row reads “AAA, including Maths and Physics + A in a relevant EPQ; AAA, including Maths and Physics + A in AS or B in A Level Further Maths”; and the only GCSE rule published is English Language grade 4/C, under the English language requirement — Sheffield publishes NO GCSE Mathematics rule on this record. A whole-DOM string audit (visible text and hidden tab panels) found no occurrence of “admissions test”, “entrance test”, “aptitude”, “selection day”, TMUA, STEP, PAT or ESAT, and no admissions interview — the two “interview” hits are careers-service mock interviews in the Placements section. Chemistry and Biology appear nowhere in the document at all. Sheffield’s own note on the streams: “At the beginning of your degree, you’ll study modules across all disciplines, after which you’ll choose one of six possible specialisms - or continue studying a variety of subjects.” Accreditation is stream-dependent, so no single professional body is named.';

const GEN_ENG_STREAMS: StudyOption = {
  name: 'Six named streams chosen in Year 3',
  description:
    'Sheffield admits to one General Engineering code and lets students choose a stream in Year 3: Biomedical; Civil & Structural; Electrical & Software; Energy & Sustainability; Mechanical & Aerospace; or General (continue varied studies). These are routes inside one UCAS application, not separate courses.',
  ucasCode: null,
  chosenWhen: 'In Year 3.',
  officialUrl: null,
};

const CS_PATHWAYS: StudyOption = {
  name: 'Two third-year pathways: Microelectronics or AI Systems',
  description:
    'Sheffield offers a choice of two third-year pathways within this single UCAS code: Microelectronics, or AI Systems.',
  ucasCode: null,
  chosenWhen: 'In the third year.',
  officialUrl: null,
};

const MECHATRONIC_PATHWAYS: StudyOption = {
  name: 'Year-3 specialisation: Mechatronics and Robotics, or Control',
  description:
    'Sheffield offers a Year-3 choice between “Mechatronics and Robotics” and “Control” inside this one UCAS code. This is where Sheffield’s former Automatic Control and Systems Engineering content now sits — there is no separate degree of that name.',
  ucasCode: null,
  chosenWhen: 'In Year 3.',
  officialUrl: null,
};

const ENG_SEEDS: EngSeed[] = [
  { slug: 'sheffield-aerospace-engineering-beng', name: 'Aerospace Engineering', degree: 'BEng', sub: 'aerospace', years: 3, yearsMax: 4, code: 'H402', page: 'aerospace-engineering-beng', profile: 'A*AA', access: 'AAB', rule: 'science-aerospace', extra: 'Sheffield lists Avionics and Aeromechanics streams within this code.' },
  { slug: 'sheffield-aerospace-engineering-meng', name: 'Aerospace Engineering', degree: 'MEng', sub: 'aerospace', years: 4, yearsMax: 5, code: 'H400', page: 'aerospace-engineering-meng', profile: 'A*AA', access: 'AAB', rule: 'science-aerospace', extra: 'Sheffield lists Avionics and Aeromechanics streams within this code. Aerospace is one of the few Sheffield departments where the BEng and MEng share the same standard offer.' },
  { slug: 'sheffield-aerospace-engineering-foundation-beng', name: 'Aerospace Engineering with a Foundation Year', degree: 'BEng', sub: 'aerospace', years: 4, code: 'H409', page: 'aerospace-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-aerospace-engineering-foundation-meng', name: 'Aerospace Engineering with a Foundation Year', degree: 'MEng', sub: 'aerospace', years: 5, code: 'H407', page: 'aerospace-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-biomedical-engineering-beng', name: 'Biomedical Engineering', degree: 'BEng', sub: 'biomedical', years: 3, yearsMax: 4, code: 'H673', page: 'biomedical-engineering-beng', profile: 'AAB', access: 'ABB', rule: 'science-general', extra: 'Sheffield calls this Biomedical Engineering; there is no degree titled Bioengineering. Four named final-year specialisms sit within this code.' },
  { slug: 'sheffield-biomedical-engineering-meng', name: 'Biomedical Engineering', degree: 'MEng', sub: 'biomedical', years: 4, yearsMax: 5, code: 'H675', page: 'biomedical-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'science-general' },
  { slug: 'sheffield-biomedical-engineering-foundation-beng', name: 'Biomedical Engineering with a Foundation Year', degree: 'BEng', sub: 'biomedical', years: 4, code: 'H169', page: 'biomedical-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-biomedical-engineering-foundation-meng', name: 'Biomedical Engineering with a Foundation Year', degree: 'MEng', sub: 'biomedical', years: 5, code: 'H160', page: 'biomedical-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-chemical-engineering-beng', name: 'Chemical Engineering', degree: 'BEng', sub: 'chemical', years: 3, yearsMax: 4, code: 'H810', page: 'chemical-engineering-beng', profile: 'AAA', access: 'AAB', rule: 'science-chemical' },
  { slug: 'sheffield-chemical-engineering-meng', name: 'Chemical Engineering', degree: 'MEng', sub: 'chemical', years: 4, yearsMax: 5, code: 'H800', page: 'chemical-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'science-chemical' },
  { slug: 'sheffield-chemical-engineering-foundation-beng', name: 'Chemical Engineering with a Foundation Year', degree: 'BEng', sub: 'chemical', years: 4, code: 'H809', page: 'chemical-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-chemical-engineering-foundation-meng', name: 'Chemical Engineering with a Foundation Year', degree: 'MEng', sub: 'chemical', years: 5, code: 'H801', page: 'chemical-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, yearsMax: 4, code: 'H202', page: 'civil-engineering-beng', profile: 'AAA', access: 'AAB', rule: 'maths-only', gcseExtra: 'GCSE Physics (or Combined Science) grade 6/B.', extra: 'Sheffield’s civil family is asymmetric across awards: the BEng is titled Civil Engineering (H202) and the MEng is titled Civil and Structural Engineering (H210). There is no Civil Engineering MEng and no Civil and Structural Engineering BEng.' },
  { slug: 'sheffield-civil-and-structural-engineering-meng', name: 'Civil and Structural Engineering', degree: 'MEng', sub: 'civil', years: 4, yearsMax: 5, code: 'H210', page: 'civil-and-structural-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'maths-only', gcseExtra: 'GCSE Physics (or Combined Science) grade 6/B.' },
  { slug: 'sheffield-architectural-engineering-meng', name: 'Architectural Engineering', degree: 'MEng', sub: 'civil', years: 4, yearsMax: 5, code: 'HK2D', page: 'architectural-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'maths-only', gcseExtra: 'GCSE Physics (or Combined Science) grade 6/B.', extra: 'Sheffield publishes no course titled “Structural Engineering and Architecture”; the nearest are this course and Civil and Structural Engineering MEng.' },
  { slug: 'sheffield-civil-engineering-foundation-beng', name: 'Civil Engineering with a Foundation Year', degree: 'BEng', sub: 'civil', years: 4, code: 'H209', page: 'civil-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-civil-and-structural-engineering-foundation-meng', name: 'Civil and Structural Engineering with a Foundation Year', degree: 'MEng', sub: 'civil', years: 5, code: 'H201', page: 'civil-and-structural-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-electrical-and-electronic-engineering-beng', name: 'Electrical and Electronic Engineering', degree: 'BEng', sub: 'electrical', years: 3, yearsMax: 4, code: 'H628', page: 'electrical-and-electronic-engineering-beng', profile: 'AAB', access: 'ABB', rule: 'science-general', extra: 'Sheffield publishes no standalone Electrical Engineering or Electronic Engineering degree — only the combined course.' },
  { slug: 'sheffield-electrical-and-electronic-engineering-meng', name: 'Electrical and Electronic Engineering', degree: 'MEng', sub: 'electrical', years: 4, yearsMax: 5, code: 'H629', page: 'electrical-and-electronic-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'science-general' },
  { slug: 'sheffield-electrical-and-electronic-engineering-foundation-beng', name: 'Electrical and Electronic Engineering with a Foundation Year', degree: 'BEng', sub: 'electrical', years: 4, code: 'H609', page: 'electrical-and-electronic-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-electrical-and-electronic-engineering-foundation-meng', name: 'Electrical and Electronic Engineering with a Foundation Year', degree: 'MEng', sub: 'electrical', years: 5, code: 'H602', page: 'electrical-and-electronic-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-computer-systems-engineering-beng', name: 'Computer Systems Engineering', degree: 'BEng', sub: 'computer-engineering', years: 3, yearsMax: 4, code: 'H130', page: 'computer-systems-engineering-beng', profile: 'AAB', access: 'ABB', rule: 'science-general', options: [CS_PATHWAYS] },
  { slug: 'sheffield-computer-systems-engineering-meng', name: 'Computer Systems Engineering', degree: 'MEng', sub: 'computer-engineering', years: 4, yearsMax: 5, code: 'G500', page: 'computer-systems-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'science-general', options: [CS_PATHWAYS], extra: 'This MEng carries the computing-style UCAS code G500 while its BEng sibling is H130. Verified twice on the page; it is not a transcription slip.' },
  { slug: 'sheffield-computer-systems-engineering-foundation-beng', name: 'Computer Systems Engineering with a Foundation Year', degree: 'BEng', sub: 'computer-engineering', years: 4, code: 'H139', page: 'computer-systems-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-computer-systems-engineering-foundation-meng', name: 'Computer Systems Engineering with a Foundation Year', degree: 'MEng', sub: 'computer-engineering', years: 5, code: 'H131', page: 'computer-systems-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-mechatronic-and-robotic-engineering-beng', name: 'Mechatronic and Robotic Engineering', degree: 'BEng', sub: 'mechanical', years: 3, yearsMax: 4, code: 'H361', page: 'mechatronic-and-robotic-engineering-beng', profile: 'AAB', access: 'ABB', rule: 'science-general', options: [MECHATRONIC_PATHWAYS] },
  { slug: 'sheffield-mechatronic-and-robotic-engineering-meng', name: 'Mechatronic and Robotic Engineering', degree: 'MEng', sub: 'mechanical', years: 4, yearsMax: 5, code: 'H360', page: 'mechatronic-and-robotic-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'science-general', options: [MECHATRONIC_PATHWAYS] },
  { slug: 'sheffield-mechatronic-and-robotic-engineering-foundation-beng', name: 'Mechatronic and Robotic Engineering with a Foundation Year', degree: 'BEng', sub: 'mechanical', years: 4, code: 'H653', page: 'mechatronic-and-robotic-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-mechatronic-and-robotic-engineering-foundation-meng', name: 'Mechatronic and Robotic Engineering with a Foundation Year', degree: 'MEng', sub: 'mechanical', years: 5, code: 'H659', page: 'mechatronic-and-robotic-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-general-engineering-beng', name: 'General Engineering', degree: 'BEng', sub: 'general-engineering', years: 3, yearsMax: 4, code: 'H103', page: 'general-engineering-beng', profile: 'A*AA', access: 'AAA', rule: 'maths-and-physics', options: [GEN_ENG_STREAMS], extra: 'Sheffield publishes no course titled “Multidisciplinary Engineering”; this is its equivalent. Note the Access Sheffield offer here is AAA — a contextual offer that equals or exceeds several other Sheffield courses’ standard offers.' },
  { slug: 'sheffield-general-engineering-meng', name: 'General Engineering', degree: 'MEng', sub: 'general-engineering', years: 4, yearsMax: 5, code: 'H100', page: 'general-engineering-meng', profile: 'A*AA', access: 'AAA', rule: 'maths-and-physics', options: [GEN_ENG_STREAMS], extra: H100_RESOLVED },
  { slug: 'sheffield-general-engineering-foundation-beng', name: 'General Engineering with a Foundation Year', degree: 'BEng', sub: 'general-engineering', years: 4, code: 'H109', page: 'general-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-general-engineering-foundation-meng', name: 'General Engineering with a Foundation Year', degree: 'MEng', sub: 'general-engineering', years: 5, code: 'H101', page: 'general-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-materials-science-and-engineering-beng', name: 'Materials Science and Engineering', degree: 'BEng', sub: 'materials', years: 3, yearsMax: 4, code: 'JH51', page: 'materials-science-and-engineering-beng', profile: 'AAB', access: 'ABB', rule: 'two-of-three', gcseExtra: 'GCSE Maths grade 6/B, and grade 4/C in Physics and Chemistry if not studied at A Level.' },
  { slug: 'sheffield-materials-science-and-engineering-meng', name: 'Materials Science and Engineering', degree: 'MEng', sub: 'materials', years: 4, yearsMax: 5, code: 'J500', page: 'materials-science-and-engineering-meng', profile: 'AAA', access: 'AAB', rule: 'two-of-three', gcseExtra: 'GCSE Maths grade 6/B, and grade 4/C in Physics and Chemistry if not studied at A Level.' },
  { slug: 'sheffield-materials-science-and-engineering-foundation-beng', name: 'Materials Science and Engineering with a Foundation Year', degree: 'BEng', sub: 'materials', years: 4, code: 'J509', page: 'materials-science-and-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-materials-science-and-engineering-foundation-meng', name: 'Materials Science and Engineering with a Foundation Year', degree: 'MEng', sub: 'materials', years: 5, code: 'J501', page: 'materials-science-and-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },

  { slug: 'sheffield-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, yearsMax: 4, code: 'H302', page: 'mechanical-engineering-beng', profile: 'A*AA', access: 'AAB', rule: 'mech' },
  { slug: 'sheffield-mechanical-engineering-meng', name: 'Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, yearsMax: 5, code: 'H300', page: 'mechanical-engineering-meng', profile: 'A*AA', access: 'AAB', rule: 'mech', extra: 'Sheffield runs Route A (Mechanical Engineering) and Route B (Mechanical Engineering with Biomechanics) within this one code.' },
  { slug: 'sheffield-mechanical-engineering-foundation-beng', name: 'Mechanical Engineering with a Foundation Year', degree: 'BEng', sub: 'mechanical', years: 4, code: 'H309', page: 'mechanical-engineering-with-a-foundation-year-beng', profile: 'BBB', access: null, rule: 'foundation' },
  { slug: 'sheffield-mechanical-engineering-foundation-meng', name: 'Mechanical Engineering with a Foundation Year', degree: 'MEng', sub: 'mechanical', years: 5, code: 'H301', page: 'mechanical-engineering-with-a-foundation-year-meng', profile: 'BBB', access: null, rule: 'foundation' },
];

const isFoundation = (s: EngSeed) => s.name.includes('Foundation Year');

function engOffers(s: EngSeed) {
  if (isFoundation(s)) {
    return [
      offer({
        label: 'Standard Offer — first published route',
        gradeProfile: 'BBB',
        rawText: 'BBB; BBC',
        notes:
          'Sheffield prints the foundation-year A-Level cell as “BBB; BBC” and expands it as “BBB (any A Level); BBC including Maths and at least one of Physics, Chemistry or Biology”. This is the first route: BBB in any A-Levels, with no subject condition.',
      }),
      offer({
        label: 'Standard Offer — second published route',
        gradeProfile: 'BBC',
        required: ['Mathematics'],
        constraints: [oneOf(MECH_SCIENCES, null, 'At least one of Physics, Chemistry or Biology.')],
        rawText: 'BBB; BBC',
        notes:
          'The second route inside the same cell: “BBC including Maths and at least one of Physics, Chemistry or Biology”.',
      }),
    ];
  }
  const label = 'Standard Offer';
  switch (s.rule) {
    case 'science-aerospace':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          required: ['Mathematics'],
          constraints: [oneOf(SCIENCE_AEROSPACE, null, `A science: ${SCIENCE_AEROSPACE.join(', ')}.`)],
          rawText: `${s.profile} including Maths and a science`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including Maths and a science”. Sheffield’s science list for this course: “Science subjects include Biology/Human Biology, Chemistry, Further Maths, Physics or Statistics”. Statistics IS accepted here, unlike on the Civil courses where it is explicitly excluded. ${EPQ_NOTE}`,
        }),
      ];
    case 'science-general':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          required: ['Mathematics'],
          constraints: [oneOf(SCIENCE_GENERAL, null, `A science: ${SCIENCE_GENERAL.join(', ')}.`)],
          rawText: `${s.profile} including Maths and a science`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including Maths and a science”. Sheffield’s science list for this course: “Science subjects include Chemistry, Physics, Biology/Human Biology, Electronics, Engineering, Technology, Environmental Science, Computer Science, Further Mathematics or Statistics”. ${EPQ_NOTE}`,
        }),
      ];
    case 'science-chemical':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          required: ['Mathematics'],
          constraints: [
            oneOf(SCIENCE_CHEMICAL, null, `A science or technology subject: ${SCIENCE_CHEMICAL.join(', ')}.`),
          ],
          rawText: `${s.profile} including Maths and a science or technology subject`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including Maths and a science or technology subject” — the broader “or technology” formulation is unique to Chemical Engineering. Sheffield’s list: “Science and technology subjects include Biology/Human Biology, Chemistry, Computer Science, Electronics, Environmental Science, Further Maths, Physics and Design & Technology (including Textiles, Food Production, Product Design, Systems and Control Technology, and Design Engineering)”. ${EPQ_NOTE}`,
        }),
      ];
    case 'maths-only':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          required: ['Mathematics'],
          rawText: `${s.profile} including Maths`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including Maths”. Mathematics is the only required subject — no science is demanded. ${CIVIL_EXCLUSION} ${EPQ_NOTE}`,
        }),
      ];
    case 'maths-and-physics':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          required: ['Mathematics', 'Physics'],
          rawText: `${s.profile} including Maths and Physics`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including Maths and Physics”. Both subjects are named directly, which is stricter than the other engineering courses’ “a science” formulation, and Sheffield publishes no alternative-science list here. ${EPQ_NOTE}`,
        }),
      ];
    case 'two-of-three':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          constraints: [
            atLeastAt(['Mathematics', 'Physics', 'Chemistry'], 'E', 2, 'Two of Mathematics, Physics or Chemistry.'),
          ],
          rawText: `${s.profile} including two of Maths, Physics or Chemistry`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including two of Maths, Physics or Chemistry” — a two-of-three rule unique in this catalogue, in which Mathematics is NOT individually mandatory. Sheffield states no per-subject minimum grade, so the constraint here checks only that two of the three are being taken. ${EPQ_NOTE}`,
        }),
      ];
    case 'mech':
      return [
        offer({
          label,
          gradeProfile: s.profile,
          required: ['Mathematics'],
          constraints: [oneOf(MECH_SCIENCES, null, 'At least one of Physics, Chemistry or Biology.')],
          rawText: `${s.profile} including Maths and at least one of Physics, Chemistry or Biology`,
          notes: `Sheffield’s Standard Offer: “${s.profile} including Maths and at least one of Physics, Chemistry or Biology” — a narrower accepted list than Aerospace, EEE or Biomedical. ${EPQ_NOTE}`,
        }),
      ];
    default:
      return [
        offer({
          label,
          gradeProfile: s.profile,
          rawText: s.profile,
          notes: `Sheffield’s Standard Offer grade profile is “${s.profile}”, read from the key-facts panel. The accompanying subject wording could not be retrieved from this page, so no subject requirement is recorded — it is unknown, not absent.`,
        }),
      ];
  }
}

const sheffieldEngineering: Course[] = ENG_SEEDS.map((s) => {
  const foundation = isFoundation(s);
  return course({
    slug: s.slug,
    universityId: 'sheffield',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    yearsMax: s.yearsMax ?? null,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: engOffers(s),
    fm: 'no-stated-preference',
    fmNote:
      s.rule === 'science-aerospace' || s.rule === 'science-general' || s.rule === 'science-chemical'
        ? 'Sheffield names Further Mathematics inside this course’s accepted-science list, so it can satisfy the second-subject rule. It is not required and Sheffield states no preference for it.'
        : 'Further Mathematics is not named in this course’s subject rule.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: s.access
      ? accessOffer(
          s.rule === 'mech'
            ? `${s.access} including A in Maths and B in at least one of Physics, Chemistry or Biology`
            : `${s.access}`,
          s.rule === 'mech',
        )
      : NO_ACCESS,
    gcse: [GCSE_ENGLISH, s.gcseExtra ?? null, foundation
      ? 'Sheffield adds a conditional foundation-year rule: “If you are studying both Maths and at least one of Physics, Chemistry or Biology at A Level (or equivalent), there are no additional GCSE requirements. If studying any other subject combination, we require GCSE Science grade 6/B (or 65 in GCSE Double Award Science) and Maths grade 7/A.”'
      : null]
      .filter(Boolean)
      .join(' '),
    studyOptions: foundation
      ? []
      : [placementOption(s.years, s.yearsMax ?? s.years + 1), YEAR_ABROAD, ...(s.options ?? [])],
    verification: 'verified',
    officialUrl: S(s.page),
    sourceUrl: S(s.page),
    sourceTitle: `${s.name} ${s.degree} | The University of Sheffield`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      foundation
        ? 'Foundation-year courses at Sheffield have their own UCAS codes and are separate applications, and publish no Access Sheffield column. Sheffield’s framing: “If you don’t have the usual scientific or mathematical background for an engineering degree, a foundation year is for you.”'
        : null,
      null,
      NO_DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  });
});

export const batch5SheffieldCourses: Course[] = [...sheffieldPhysics, ...sheffieldEngineering];
