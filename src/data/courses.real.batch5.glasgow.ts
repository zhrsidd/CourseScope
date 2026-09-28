/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 5, PART A: THE UNIVERSITY OF GLASGOW
 *  2027 entry. Read from Glasgow's own 2027 Degree programmes A–Z on
 *  2026-09-14. Every page fetched self-identified as 2027 entry.
 * ---------------------------------------------------------------------------
 *  Glasgow is Scottish, but it is NOT Edinburgh, and the differences matter.
 *
 *  1. THE A-LEVEL FIGURE IS A RANGE WITH A DIFFERENT MEANING FROM EDINBURGH'S.
 *     Glasgow's heading is "A-level standard entry requirements" and the value
 *     is, verbatim, "AAB – BBB". Glasgow's central admissions guidance defines
 *     it as "the range of grades required to be considered for an offer" — a
 *     CONSIDERATION window, not the spread of offers actually issued, which is
 *     what Edinburgh's band describes. It is stored verbatim; the engine
 *     cannot score a range, so the overall-grade check returns review and the
 *     subject conditions are still evaluated.
 *
 *     (That definition sentence lives on a page headed "2026 Admissions
 *     guidance". The FIGURES come from 2027-dated course pages; only the
 *     definition is evidenced by a 2026-dated page. Recorded, not glossed.)
 *
 *  2. GLASGOW PUBLISHES NO A-LEVEL "MINIMUM ENTRY REQUIREMENTS" AT ALL.
 *     Reading BBB as a widening-access threshold — the Edinburgh shape — would
 *     be wrong. BBB is the bottom of the standard consideration range that
 *     every A-level applicant is assessed against. Glasgow's real
 *     widening-access route ("Scottish Higher adjusted entry requirements") is
 *     published in SQA Higher terms ONLY (MD20: BBBB, MD40: AABB) and has no
 *     A-level equivalent. It is recorded as an access offer that says exactly
 *     that, and `minimumEntryStandard` is deliberately left null.
 *
 *  3. BEng IS A RANGE; MEng IS A SINGLE PROFILE. On every engineering page the
 *     BEng figure is "AAB – BBB" and the MEng figure is "AAA" — Glasgow changes
 *     the KIND of figure between the two awards of the same course, and AAA is
 *     above the top of the BEng range. So a Glasgow MEng is scorable and its
 *     BEng sibling is not. That asymmetry is real and is preserved.
 *
 *  4. ONE PAGE, TEN UCAS CODES. /degrees/physics/ is a single page titled
 *     "Physics / Theoretical Physics" carrying ten codes across BSc and MSci,
 *     all sharing one identical set of requirements. Separate UCAS codes are
 *     separate applications, so each becomes its own record with its own
 *     identity — they are not merged, and they are not invented either: every
 *     code is printed on that page.
 *
 *  5. "FASTER ROUTE" IS A SEPARATE UCAS APPLICATION at A*AA — a single
 *     profile, roughly three grade-steps above the bottom of the standard
 *     range for the same subject — and publishes NO widening-access route at
 *     all. "Advanced entry" is different again: same UCAS code, requested by
 *     choosing point of entry 2, and recorded as a note, never as an offer.
 *
 *  6. The only accepted-alternative rule Glasgow publishes for these courses is
 *     narrow: "Design & Technology may be accepted in place of Physics, 3D or
 *     Product Design options only". It substitutes for Physics only, never for
 *     Mathematics. SQA applicants may offer Engineering Science instead of
 *     Physics; A-level applicants may not, so that concession is NOT modelled.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer } from './builders';

const VERIFIED_ON = '2026-09-14';

const CYCLE =
  'Published requirements for 2027 entry, read from Glasgow’s 2027 Degree programmes A–Z. This is not confirmed 2028 data.';

const G = (path: string) => `https://www.gla.ac.uk/undergraduate/degrees/${path}/`;

const DEADLINE_NOTE =
  'Application deadlines Glasgow publishes: 15 October if the application includes Dentistry, Medicine or Veterinary Medicine, or also goes to Oxford or Cambridge; 13 January for all other UK applicants; 30 June for international students.';

const NO_TEST_NOTE =
  'No admissions test is mentioned anywhere on this course page. Glasgow publishes no statement either way, so this is silence, not a published “no test”.';

const NO_INTERVIEW_NOTE =
  'No interview is mentioned anywhere on this course page. This is silence rather than a published “we do not interview”.';

/** Glasgow's own wording for the standard A-level range, stored verbatim. */
const RANGE = 'AAB – BBB';

const RANGE_NOTE =
  'Glasgow publishes this under the heading “A-level standard entry requirements” as a RANGE, not a single grade profile. Glasgow’s own admissions guidance defines the range as “the range of grades required to be considered for an offer”, and adds “If you have predicted grades below our standard range, we may still consider you for an offer.” Because a range cannot be compared with a set of three grades, the overall-grade check returns “review required” and the range is shown exactly as Glasgow printed it. The subject conditions are checked normally.';

const MENG_NOTE =
  'Glasgow publishes the MEng figure as a single grade profile (AAA) while the BEng figure for the same course is the range “AAB – BBB”. The two awards are priced differently and in a different kind of unit; AAA is above the top of the BEng range.';

/**
 * Glasgow's widening-access route. Published in SQA Higher units only — there
 * is no A-level adjusted figure anywhere on these pages — so it is recorded as
 * an access offer that says so, and is never matched against A-Levels.
 */
const ADJUSTED = (opts: { subjects: string; engineering?: boolean; mengAbsent?: boolean }): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Adjusted (widening access) offer — published in Scottish Higher units only: MD20: BBBB (also other target groups); MD40: AABB. Additional requirements: ${opts.subjects} Successful completion of Top-Up or one of Glasgow’s Summer Schools is required, and eligibility is set out under “Access Glasgow”.${opts.engineering ? ' The lines are prefixed “BEng:”, so no adjusted figure is published for the MEng.' : ''}${opts.mengAbsent ? '' : ''} Glasgow publishes NO A-level adjusted or minimum-entry figure for this course, so there is nothing here that an A-Level applicant can be matched against. Care-experienced, refugee and asylum-seeking applicants are named as target groups on Glasgow’s widening-participation pages, but no figure is published for them.`,
});

const STUDY_ABROAD: StudyOption = {
  name: 'Study abroad',
  description:
    'Glasgow states: “You will have the opportunity to study abroad at one of our partner universities as part of your degree. This won’t add any extra time to your studies.”',
  ucasCode: null,
  chosenWhen: 'During the degree; no separate application.',
  officialUrl: null,
};

/* ------------------------------------------------------------------ */
/* Physics and Astronomy                                               */
/* ------------------------------------------------------------------ */

const PHYS_SUBJECTS = 'Higher Mathematics and Physics.';

const PHYS_ADVANCED_ENTRY =
  'Glasgow also runs advanced (second-year) entry on the SAME UCAS code — applicants choose “point of entry 2nd year” on the UCAS application rather than applying to a different course. Glasgow states advanced entry is “not permitted for the following programmes: Physics/Astronomy (FF53/FF5H), Physics/Computing Science (FG34/IF13)”. Advanced entry is recorded here as a note, never as this course’s offer.';

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MSci';
  sub:
    | 'physics'
    | 'theoretical-physics'
    | 'astrophysics'
    | 'physics-with-computing'
    | 'physics-with-mathematics'
    | 'physics-with-astronomy';
  years: number;
  code: string;
  path: string;
  pageTitle: string;
  /** Chemical Physics also requires Chemistry. */
  chemistry?: boolean;
  /** Faster-route courses are a separate application at a single profile. */
  faster?: boolean;
  advancedEntry?: string | null;
  placement?: string | null;
  extra?: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  /* /degrees/physics/ — one page, ten UCAS codes, one identical requirement set. */
  { slug: 'glasgow-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 4, code: 'F300', path: 'physics', pageTitle: 'Physics / Theoretical Physics' },
  { slug: 'glasgow-physics-msci', name: 'Physics', degree: 'MSci', sub: 'physics', years: 5, code: 'F301', path: 'physics', pageTitle: 'Physics / Theoretical Physics' },
  { slug: 'glasgow-theoretical-physics-bsc', name: 'Theoretical Physics', degree: 'BSc', sub: 'theoretical-physics', years: 4, code: 'F344', path: 'physics', pageTitle: 'Physics / Theoretical Physics' },
  { slug: 'glasgow-theoretical-physics-msci', name: 'Theoretical Physics', degree: 'MSci', sub: 'theoretical-physics', years: 5, code: 'F340', path: 'physics', pageTitle: 'Physics / Theoretical Physics' },
  { slug: 'glasgow-physics-astronomy-bsc', name: 'Physics/Astronomy', degree: 'BSc', sub: 'physics-with-astronomy', years: 4, code: 'FF53', path: 'physics', pageTitle: 'Physics / Theoretical Physics', advancedEntry: 'Glasgow states advanced entry is “not permitted” for Physics/Astronomy (FF53/FF5H).' },
  { slug: 'glasgow-physics-astronomy-msci', name: 'Physics/Astronomy', degree: 'MSci', sub: 'physics-with-astronomy', years: 5, code: 'FF5H', path: 'physics', pageTitle: 'Physics / Theoretical Physics', advancedEntry: 'Glasgow states advanced entry is “not permitted” for Physics/Astronomy (FF53/FF5H).' },
  { slug: 'glasgow-physics-computing-science-bsc', name: 'Physics/Computing Science', degree: 'BSc', sub: 'physics-with-computing', years: 4, code: 'FG34', path: 'physics', pageTitle: 'Physics / Theoretical Physics', advancedEntry: 'Glasgow states advanced entry is “not permitted” for Physics/Computing Science (FG34/IF13).' },
  { slug: 'glasgow-physics-computing-science-msci', name: 'Physics/Computing Science', degree: 'MSci', sub: 'physics-with-computing', years: 5, code: 'IF13', path: 'physics', pageTitle: 'Physics / Theoretical Physics', advancedEntry: 'Glasgow states advanced entry is “not permitted” for Physics/Computing Science (FG34/IF13).' },
  { slug: 'glasgow-physics-mathematics-bsc', name: 'Physics/Mathematics', degree: 'BSc', sub: 'physics-with-mathematics', years: 4, code: 'GF14', path: 'physics', pageTitle: 'Physics / Theoretical Physics', extra: 'Glasgow states: “2nd year entrants to Physics programmes cannot change degree to study Mathematics at honours level.”' },
  { slug: 'glasgow-physics-mathematics-msci', name: 'Physics/Mathematics', degree: 'MSci', sub: 'physics-with-mathematics', years: 5, code: 'FGJ1', path: 'physics', pageTitle: 'Physics / Theoretical Physics', extra: 'Glasgow states: “2nd year entrants to Physics programmes cannot change degree to study Mathematics at honours level.”' },

  /* Faster route — its own page, its own codes, a single profile, no access route. */
  { slug: 'glasgow-physics-faster-route-bsc', name: 'Physics (Faster Route)', degree: 'BSc', sub: 'physics', years: 3, code: 'F303', path: 'physics-faster-route', pageTitle: 'Physics / Theoretical Physics (faster route)', faster: true },
  { slug: 'glasgow-physics-faster-route-msci', name: 'Physics (Faster Route)', degree: 'MSci', sub: 'physics', years: 4, code: 'F302', path: 'physics-faster-route', pageTitle: 'Physics / Theoretical Physics (faster route)', faster: true },
  { slug: 'glasgow-theoretical-physics-faster-route-bsc', name: 'Theoretical Physics (Faster Route)', degree: 'BSc', sub: 'theoretical-physics', years: 3, code: 'F345', path: 'physics-faster-route', pageTitle: 'Physics / Theoretical Physics (faster route)', faster: true },
  { slug: 'glasgow-theoretical-physics-faster-route-msci', name: 'Theoretical Physics (Faster Route)', degree: 'MSci', sub: 'theoretical-physics', years: 4, code: 'F341', path: 'physics-faster-route', pageTitle: 'Physics / Theoretical Physics (faster route)', faster: true },

  /* Physics with Astrophysics. */
  { slug: 'glasgow-physics-with-astrophysics-bsc', name: 'Physics with Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 4, code: 'F3F5', path: 'physicswithastrophysics', pageTitle: 'Physics with Astrophysics', advancedEntry: 'This page publishes no advanced-entry section.' },
  { slug: 'glasgow-physics-with-astrophysics-msci', name: 'Physics with Astrophysics', degree: 'MSci', sub: 'astrophysics', years: 5, code: 'F3FM', path: 'physicswithastrophysics', pageTitle: 'Physics with Astrophysics', advancedEntry: 'This page publishes no advanced-entry section.' },
  { slug: 'glasgow-physics-with-astrophysics-faster-route-bsc', name: 'Physics with Astrophysics (Faster Route)', degree: 'BSc', sub: 'astrophysics', years: 3, code: 'F3F2', path: 'physics-with-astrophysics-faster-route', pageTitle: 'Physics with Astrophysics (faster route) BSc/MSci', faster: true },
  { slug: 'glasgow-physics-with-astrophysics-faster-route-msci', name: 'Physics with Astrophysics (Faster Route)', degree: 'MSci', sub: 'astrophysics', years: 4, code: 'F3F1', path: 'physics-with-astrophysics-faster-route', pageTitle: 'Physics with Astrophysics (faster route) BSc/MSci', faster: true },

  /* Chemical Physics — the only Glasgow physics course requiring three subjects. */
  { slug: 'glasgow-chemical-physics-bsc', name: 'Chemical Physics', degree: 'BSc', sub: 'physics', years: 4, code: 'F335', path: 'chemicalphysics', pageTitle: 'Chemical Physics BSc/MSci', chemistry: true, advancedEntry: 'Glasgow publishes a per-qualification advanced-entry figure for this course: “Three A-levels at grades A*AA in Mathematics, Chemistry and Physics attained in one exam year and at the first attempt.” That is a second-year entry route on the same UCAS code, not this first-year offer.' },
  { slug: 'glasgow-chemical-physics-msci', name: 'Chemical Physics', degree: 'MSci', sub: 'physics', years: 5, code: 'F322', path: 'chemicalphysics', pageTitle: 'Chemical Physics BSc/MSci', chemistry: true, advancedEntry: 'Glasgow publishes a per-qualification advanced-entry figure for this course: “Three A-levels at grades A*AA in Mathematics, Chemistry and Physics attained in one exam year and at the first attempt.” That is a second-year entry route on the same UCAS code, not this first-year offer.' },
  { slug: 'glasgow-chemical-physics-work-placement-msci', name: 'Chemical Physics with work placement', degree: 'MSci', sub: 'physics', years: 5, code: 'F320', path: 'chemicalphysics', pageTitle: 'Chemical Physics BSc/MSci', chemistry: true, placement: 'Glasgow publishes this as its own UCAS code (F320), so the work placement is a separate application rather than a route chosen later. The placement sits “between year 3 and the final year”, is “normally spent doing research in industry or some other organisation” including “CERN or an academic laboratory”, and “may be in the UK, but are often taken overseas”. It does not extend the degree beyond five years.' },

  /* Astronomy — joint honours only; FF53/FF5H are the SAME codes as the Physics page. */
  { slug: 'glasgow-astronomy-mathematics-bsc', name: 'Astronomy/Mathematics', degree: 'BSc', sub: 'astrophysics', years: 4, code: 'FGM1', path: 'astronomy', pageTitle: 'Astronomy' },
  { slug: 'glasgow-astronomy-mathematics-msci', name: 'Astronomy/Mathematics', degree: 'MSci', sub: 'astrophysics', years: 5, code: 'FG5D', path: 'astronomy', pageTitle: 'Astronomy' },
];

const FASTER_PROFILE = 'Three A-levels at Grades A*AA';

const FASTER_NOTE =
  'Glasgow publishes the faster route as a separate UCAS application with its own code and a SINGLE grade profile (A*AA), not the “AAB – BBB” range used for the standard route. Glasgow describes it as offering “focused, high achieving candidates joining us straight from school the option to complete the Honours Degree in three years or MSci degree in four years”. The page publishes NO widening-access, adjusted, care-experienced or refugee offer of any kind.';

const glasgowPhysics: Course[] = PHYS_SEEDS.map((s) => {
  const required: [string, null][] = s.chemistry
    ? [['Chemistry', null], ['Mathematics', null], ['Physics', null]]
    : [['Mathematics', null], ['Physics', null]];
  const subjectWording = s.chemistry
    ? 'A-level Chemistry, Mathematics and Physics.'
    : 'A-level Mathematics and Physics.';
  return course({
    slug: s.slug,
    universityId: 'glasgow',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: s.faster ? 'A-level faster route entry requirements' : 'A-level standard entry requirements',
        gradeProfile: s.faster ? FASTER_PROFILE : RANGE,
        required: required.map(([subject]) => subject),
        notes: s.faster
          ? `Glasgow heading “A-level faster route entry requirements”: “${FASTER_PROFILE}”, “which include Physics and Mathematics attained in one exam year and at the first attempt”. Both conditions — one exam year, first attempt — exclude resits. ${FASTER_NOTE}`
          : `Glasgow heading “A-level standard entry requirements”: “${RANGE}”. Additional requirements: “${subjectWording}” No subject-specific minimum grade is published for A-Levels. ${RANGE_NOTE}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned anywhere on this course page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: s.faster
      ? {
          availability: 'no',
          details:
            'Glasgow publishes no adjusted, widening-access, care-experienced or refugee offer on the faster-route page. The sub-heading block contains no adjusted-entry section at all — unlike the standard route for the same subject.',
        }
      : ADJUSTED({ subjects: s.chemistry ? 'Higher Chemistry, Mathematics and Physics.' : PHYS_SUBJECTS }),
    gcse: null,
    placement: s.placement ?? null,
    studyOptions: [STUDY_ABROAD],
    verification: 'verified',
    officialUrl: G(s.path),
    sourceUrl: G(s.path),
    sourceTitle: `${s.pageTitle} | University of Glasgow`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.path === 'physics'
        ? 'Glasgow publishes ten UCAS codes on this one page — Physics, Theoretical Physics, Physics/Astronomy, Physics/Computing Science and Physics/Mathematics, each as BSc and MSci — all sharing one identical set of entry requirements. Theoretical Physics has no page of its own.'
        : null,
      s.path === 'astronomy'
        ? 'Glasgow offers no single-honours Astronomy degree; every award on this page is joint honours. Physics is a required A-level subject even for the Astronomy/Mathematics route. The page also prints FF53 and FF5H (Astronomy/Physics), which are the SAME UCAS codes published on the Physics page as Physics/Astronomy — one application, cross-listed under two subjects, so they are recorded once, under Physics.'
        : null,
      s.advancedEntry ?? (s.faster ? null : PHYS_ADVANCED_ENTRY),
      s.extra ?? null,
      'Glasgow publishes Scottish Higher figures alongside the A-level ones (“BBBB is the minimum requirement from S5 to be reviewed for an S6 offer… Typically offers will be made at AAAAA by end of S6”). Those are SQA figures for a two-stage S5/S6 process with no A-level analogue, and are not matched here.',
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  });
});

/* ------------------------------------------------------------------ */
/* Engineering — James Watt School of Engineering                      */
/* ------------------------------------------------------------------ */

const ENG_SUBJECT_CLAUSE =
  'A-level Mathematics and Physics. (Design & Technology may be accepted in place of Physics, 3D or Product Design options only).';

const ENG_ALTERNATIVES = { Physics: ['Design and Technology'] };

const ENG_SQA_ONLY_NOTE =
  'Glasgow’s Scottish Higher clause lets SQA applicants offer Engineering Science in place of Physics. That concession is published for SQA only and is NOT offered to A-level applicants, so it is not modelled here. The IB clause adds a further concession absent from A-level (“SL6 can be accepted for either Mathematics or Physics”).';

const ENG_ADVANCED_ENTRY =
  'Advanced (second-year) entry is on the SAME UCAS code — chosen as point of entry 2 on the UCAS application. Glasgow’s A-level figure for it is “Three A-levels at grades A*A*A which include Mathematics and Physics or Design and Technology (3D or Product Design only) attained in one exam year and at the first attempt”. Note two starred grades: engineering advanced entry is A*A*A, where Chemical Physics in the Physics school is A*AA. Recorded as a note, never as this course’s offer.';

const ENG_ARTICULATION =
  'Glasgow also publishes a “Widening Participation Articulation Programmes” heading, absent from every Physics page: “The University has bespoke HNC Articulation Programmes running at various colleges, offering direct entry to Year 2 of this degree.” That mechanism shortens the degree rather than lowering the grades, so it is not an offer and is not matched.';

const ENG_OPTIONS: StudyOption[] = [
  STUDY_ABROAD,
  {
    name: 'Switch engineering discipline at the end of year 1',
    description:
      'Glasgow states the shared structure “makes it easy to switch to most other engineering disciplines at the end of year 1”. An effective common first year, with no separate UCAS code.',
    ucasCode: null,
    chosenWhen: 'At the end of year 1.',
    officialUrl: null,
  },
  {
    name: 'Transfer from BEng to MEng',
    description:
      'Glasgow states: “BEng students who perform well may transfer to the MEng programme on completion of years 1, 2 and 3.” The first three years are shared — “You will study the same courses in the first three years whether you are on the BEng or MEng degree programme.”',
    ucasCode: null,
    chosenWhen: 'After years 1–3.',
    officialUrl: null,
  },
  {
    name: 'Project in industry',
    description:
      'Glasgow states: “half of this year is devoted to project work, which can be carried out in industry, within the University or via a placement abroad”. No separate UCAS code and no stated extension to the degree length.',
    ucasCode: null,
    chosenWhen: 'In the final year.',
    officialUrl: null,
  },
];

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng';
  sub: 'aeronautical' | 'aerospace' | 'biomedical' | 'civil' | 'general-engineering';
  years: number;
  code: string;
  path: string;
  pageTitle: string;
  /**
   * Product Design Engineering — jointly delivered with The Glasgow School of
   * Art. Carried its own open questions, all of them resolved in Batch 6.
   */
  pde?: boolean;
  extra?: string;
}

const ENG_SEEDS: EngSeed[] = [
  { slug: 'glasgow-aeronautical-engineering-beng', name: 'Aeronautical Engineering', degree: 'BEng', sub: 'aeronautical', years: 4, code: 'H415', path: 'aeronauticalengineering', pageTitle: 'Aeronautical Engineering' },
  { slug: 'glasgow-aeronautical-engineering-meng', name: 'Aeronautical Engineering', degree: 'MEng', sub: 'aeronautical', years: 5, code: 'H410', path: 'aeronauticalengineering', pageTitle: 'Aeronautical Engineering' },
  { slug: 'glasgow-aerospace-systems-beng', name: 'Aerospace Systems', degree: 'BEng', sub: 'aerospace', years: 4, code: 'H402', path: 'aerospacesystems', pageTitle: 'Aerospace Systems' },
  { slug: 'glasgow-aerospace-systems-meng', name: 'Aerospace Systems', degree: 'MEng', sub: 'aerospace', years: 5, code: 'H401', path: 'aerospacesystems', pageTitle: 'Aerospace Systems' },
  { slug: 'glasgow-biomedical-engineering-beng', name: 'Biomedical Engineering', degree: 'BEng', sub: 'biomedical', years: 4, code: 'J750', path: 'biomedicalengineering', pageTitle: 'Biomedical Engineering', extra: 'Despite being a biomedical degree, Biology is not mentioned anywhere in the entry requirements; Physics is still the required science.' },
  { slug: 'glasgow-biomedical-engineering-meng', name: 'Biomedical Engineering', degree: 'MEng', sub: 'biomedical', years: 5, code: 'J751', path: 'biomedicalengineering', pageTitle: 'Biomedical Engineering', extra: 'Despite being a biomedical degree, Biology is not mentioned anywhere in the entry requirements; Physics is still the required science.' },
  { slug: 'glasgow-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 4, code: 'H202', path: 'civilengineering', pageTitle: 'Civil Engineering' },
  { slug: 'glasgow-civil-engineering-meng', name: 'Civil Engineering', degree: 'MEng', sub: 'civil', years: 5, code: 'H200', path: 'civilengineering', pageTitle: 'Civil Engineering' },
  { slug: 'glasgow-product-design-engineering-beng', name: 'Product Design Engineering', degree: 'BEng', sub: 'general-engineering', years: 4, code: 'H3W2', path: 'productdesignengineering', pageTitle: 'Product Design Engineering', pde: true },
  { slug: 'glasgow-product-design-engineering-meng', name: 'Product Design Engineering', degree: 'MEng', sub: 'general-engineering', years: 5, code: 'H3WG', path: 'productdesignengineering', pageTitle: 'Product Design Engineering', pde: true },
];

/**
 * BATCH 6 — the two Product Design Engineering records were partially verified
 * and are now fully verified. What was outstanding, and what closed it:
 *
 *  · The page had returned only part of its structure on the first attempt. A
 *    second read with a cache-busting query string returned the complete entry
 *    requirements section, including the ordered sub-heading list and the full
 *    adjusted-entry footnote, still under the page's own label “for entry in
 *    2027”.
 *  · The adjusted-entry footnote in full, under Glasgow's own heading “Scottish
 *    Higher adjusted entry requirements* (by end of S5 or S6)”: “BEng: MD20 —
 *    BBBB (also other target groups*)”; “BEng: MD40 — AABB*”; “Additional
 *    requirements: Higher Mathematics and Physics or Engineering Science.
 *    Successful completion of Top-Up or one of our Summer Schools.”; and the
 *    footnote marker resolves to “* See Access Glasgow for eligibility”.
 *    It is published for the BEng ONLY — which confirms, rather than
 *    contradicts, what this file already recorded for the MEng.
 *  · The portfolio question is answered. See PDE_PORTFOLIO_RESOLVED.
 */
const PDE_RESOLVED_NOTE =
  'RESOLVED IN BATCH 6. This page returned only part of its structure on the first attempt; a cache-busted re-read returned the complete entry-requirements section under Glasgow’s own label “for entry in 2027”, including the ordered sub-heading list and the full adjusted-entry footnote. The footnote, verbatim, under the heading “Scottish Higher adjusted entry requirements* (by end of S5 or S6)”: “BEng: MD20 — BBBB (also other target groups*)”, “BEng: MD40 — AABB*”, “Additional requirements: Higher Mathematics and Physics or Engineering Science. Successful completion of Top-Up or one of our Summer Schools.”, with the marker resolving to “* See Access Glasgow for eligibility”. Glasgow publishes it for the BEng only. Glasgow also states: “BEng students who perform well may transfer to the MEng programme on completion of years 1, 2 and 3”, and “The tuition fees for Product Design Engineering are payable to Glasgow School of Art.”';

const PDE_PORTFOLIO_RESOLVED =
  'NO PORTFOLIO IS REQUIRED, AND THAT IS A POSITIVE STATEMENT RATHER THAN SILENCE. This degree is “jointly delivered by the University and The Glasgow School of Art”, and art-school-delivered design degrees commonly require one, so the question was chased to both institutions. On Glasgow’s own domain the words portfolio, interview, test and submitted work do not appear anywhere in the entry requirements, degrees-and-UCAS-codes or how-to-apply sections — Glasgow publishes nothing either way. The Glasgow School of Art states it directly, verbatim: “Applicants to all programmes (with the exception of Product Design Engineering) are required to submit a Digital Portfolio”, and “Applications for Engineering with Architecture and Product Design Engineering are made via the University of Glasgow.” So this degree is explicitly EXCLUDED from the art school’s portfolio requirement. One caveat kept with the finding: that Glasgow School of Art page was running the 2026 entry cycle when read, so the exclusion is recorded as a policy statement sourced to gsa.ac.uk on a 2026-cycle page, not as a 2027-confirmed Glasgow statement, and none of that page’s dates have been imported. No admissions test is published for this course on either domain.';

const glasgowEngineering: Course[] = ENG_SEEDS.map((s) => {
  const meng = s.degree === 'MEng';
  return course({
    slug: s.slug,
    universityId: 'glasgow',
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
      offer({
        label: 'A-level standard entry requirements',
        gradeProfile: meng ? 'AAA' : RANGE,
        required: ['Mathematics', 'Physics'],
        alternatives: ENG_ALTERNATIVES,
        notes: meng
          ? `Glasgow heading “A-level standard entry requirements”, MEng line: “AAA”. Additional requirements: “${ENG_SUBJECT_CLAUSE}” No subject-specific minimum grade is published. ${MENG_NOTE}`
          : `Glasgow heading “A-level standard entry requirements”, BEng line: “${RANGE}”. Additional requirements: “${ENG_SUBJECT_CLAUSE}” No subject-specific minimum grade is published. ${RANGE_NOTE}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned anywhere on this course page.',
    test: 'unknown',
    testNote: s.pde ? PDE_PORTFOLIO_RESOLVED : NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: meng
      ? {
          availability: 'unknown',
          details:
            'Glasgow prefixes every adjusted-entry line on this page with “BEng:”, and states no MEng adjusted requirement. No widening-access figure is published for the MEng in any qualification system, including SQA. Glasgow also publishes no A-level adjusted or minimum-entry figure at all.',
        }
      : ADJUSTED({
          subjects: 'Higher Mathematics and Physics or Engineering Science.',
          engineering: true,
        }),
    gcse: null,
    studyOptions: ENG_OPTIONS,
    verification: 'verified',
    officialUrl: G(s.path),
    sourceUrl: G(s.path),
    sourceTitle: `${s.pageTitle} | University of Glasgow`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      ENG_SQA_ONLY_NOTE,
      ENG_ADVANCED_ENTRY,
      ENG_ARTICULATION,
      s.pde ? PDE_RESOLVED_NOTE : null,
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  });
});

export const batch5GlasgowCourses: Course[] = [...glasgowPhysics, ...glasgowEngineering];
