/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 7, PART A: THE UNIVERSITY OF YORK
 *  2027 entry (2027/28). Read from York's own course pages on 2026-09-16/17.
 * ---------------------------------------------------------------------------
 *  YORK DOES NOT OFFER MECHANICAL, CIVIL, CHEMICAL OR AEROSPACE ENGINEERING.
 *
 *  That is the headline finding, and it was verified twice rather than assumed.
 *  York's own central undergraduate A–Z, header "Courses 2027/28", was fetched
 *  in full with the filter at "Showing all courses" so nothing sat behind a
 *  subject facet, and each of the following titles was searched for in it:
 *
 *      Mechanical Engineering       ABSENT      Materials Engineering   ABSENT
 *      Civil Engineering            ABSENT      Materials Science       ABSENT
 *      Chemical Engineering         ABSENT      Manufacturing Eng.      ABSENT
 *      Aerospace Engineering        ABSENT      Mechatronics            ABSENT
 *      Aeronautical Engineering     ABSENT      Mathematical Physics    ABSENT
 *      Automotive Engineering       ABSENT
 *
 *  "Electrical Engineering" exists only inside the compound title Electronic
 *  and Electrical Engineering. Two scaffold-era claims are also disproved:
 *  "Computer Systems and Software Engineering MEng" does not exist, and neither
 *  does "Mathematical Physics".
 *
 *  What this evidence is: an absence from York's own complete course index for
 *  2027/28 — the strongest negative evidence a university publishes about
 *  itself. What it is not: a claim about York's past provision or its
 *  postgraduate courses. No admissions figure exists anywhere in this file for
 *  any of those titles, and no record has been created for one.
 *
 *  ---------------------------------------------------------------------------
 *  THE TRAP THIS FILE EXISTS TO AVOID
 *  ---------------------------------------------------------------------------
 *
 *  York's general Engineering BEng (H105) publishes Year 3 OPTION MODULES named
 *  "Renewable Power Generation", "Communications Systems", "Biomedical
 *  Engineering" and "Robotics". Three of those are the same words as three
 *  separately coded York DEGREES — Engineering with Renewable Energy MEng H221,
 *  Biomedical Engineering BEng H160, Robotic Engineering MEng H659.
 *
 *  They are option modules inside H105. They are not pathways, they are not
 *  applications, and they have not been conflated with the real degrees that
 *  share their names. This is exactly the shape the identity invariant exists
 *  to catch: a named thing with its own description that an applicant cannot
 *  apply to.
 *
 *  ---------------------------------------------------------------------------
 *  H105 AND H109 ARE TWO APPLICATIONS, AND THERE IS NO COMMON FIRST YEAR
 *  ---------------------------------------------------------------------------
 *  Both pages were fetched in full. The A–Z codes them separately, each page
 *  carries its own UCAS code field, and their offers differ by two grades
 *  (BEng "ABB including Maths." vs MEng "AAA including Maths."). Neither page
 *  tells the applicant to apply to the other's code, and neither presents the
 *  other award as an option inside itself. An applicant types either H105 or
 *  H109 into UCAS.
 *
 *  Neither page publishes a common first year, a shared entry point, a named
 *  later specialisation, or transfer between awards. Recorded as NOT PUBLISHED
 *  on those pages — not as "does not exist".
 *
 *  The one genuine progression mechanism York publishes here is a foundation
 *  year, and it holds a surprise: BOTH Engineering pages send foundation-year
 *  applicants to "BEng Electronic Engineering with a Foundation Year" (H604),
 *  NOT to Engineering (with a Foundation Year) (H100), which exists in the A–Z
 *  under its own code. That is York's own cross-reference, transcribed as
 *  printed. It is not evidence that H100 does not exist, and the two have not
 *  been merged. Note too that the progression it describes is decided by
 *  "Foundation Year average marks" — an outcome of performance, not an option
 *  the applicant selects.
 *
 *  ---------------------------------------------------------------------------
 *  WHAT IS VERIFIED HERE, AND WHAT IS IDENTITY ONLY
 *  ---------------------------------------------------------------------------
 *  PHYSICS — 25 applications, every page fetched individually, all verified.
 *  ENGINEERING — 22 applications, identity confirmed from York's own 2027/28
 *  A–Z (title, award, UCAS code), admissions fields NOT YET READ. They are
 *  imported as identity-only records rather than left out, because a student
 *  searching for Electronic Engineering at York should find that it exists.
 *  Keeping identity separate from cycle verification is the point: we know what
 *  can be applied to, and we do not yet know what it asks for.
 *
 *  ---------------------------------------------------------------------------
 *  FOUR THINGS THAT WOULD BE GOT WRONG BY ASSUMPTION
 *  ---------------------------------------------------------------------------
 *
 *  1. THE VARIANT GRID IS NOT SYMMETRIC. Physics, Physics with Astrophysics and
 *     Theoretical Physics each have BSc and MPhys in plain, year-abroad and
 *     year-in-industry forms. Physics with Philosophy has only THREE coded
 *     courses — BSc F3V5, MPhys F3VM, BSc year abroad F3V7 — with no MPhys
 *     year abroad and no year-in-industry at either level. The joint
 *     Mathematics/Physics degrees have no year-in-industry variant at all.
 *
 *  2. "THE YORK TUTORIAL PROGRAMME" IS A FOURTH ALTERNATIVE-OFFER ROW THAT
 *     APPEARS ON ONLY FOUR OF THE 25 PAGES — F3F5, F3F8, F346 and F3VM — and
 *     its presence does not follow award level or variant. Three of those four
 *     have a sibling that lacks it. Recorded per course from the page that was
 *     read, never generalised.
 *
 *  3. THE EPQ THRESHOLD IS NOT UNIFORM. Twenty-three courses publish "C or
 *     higher in the EPQ"; the two joint Mathematics-and-Physics BSc degrees
 *     (GF13, GF14) publish "B or higher", confirmed character-for-character.
 *
 *  4. THE JOINT DEGREES PIN THEIR SUBJECT GRADES AND THE PHYSICS DEGREES DO
 *     NOT. "AAB including Physics and Mathematics" names two subjects and pins
 *     no grade to either; "AAB including A in Mathematics and B in Physics" is
 *     the same three-letter aggregate and materially stricter. And GFC3 states
 *     its standard offer UNPINNED while stating its contextual offers PINNED —
 *     York's own inconsistency, reproduced rather than harmonised.
 *
 *  ---------------------------------------------------------------------------
 *  ONE COURSE IN 47 HAS A GCSE MODERN-FOREIGN-LANGUAGE REQUIREMENT
 *  ---------------------------------------------------------------------------
 *  GF14 alone, under its own "Additional requirements" heading: "You should
 *  also have a GCSE at grade 4 (C) or above in French, German or Italian",
 *  presented as applying to all applicants and confirmed by a targeted re-read.
 *  Its own three-year parent GF13 has no such requirement, and neither does the
 *  other year-abroad physics degree. It must not be generalised, and it must
 *  not be dropped. Neither reduced-offer row waives it.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer, type SubjectSpec } from './builders';

const VERIFIED_ON = '2026-09-17';
/** York's engineering pages were read a day later, in the v0.8 closure pass. */
const ENG_VERIFIED_ON = '2026-09-18';

const Y = (slug: string) => `https://www.york.ac.uk/study/undergraduate/courses/${slug}/`;

const CYCLE =
  'Published requirements for 2027 entry. The page’s own key-information panel reads “Year of entry: 2027/28”, and York’s central course A–Z that lists it is headed “Courses 2027/28”. This is not confirmed 2028 data.';

const NO_TEST_NOTE =
  'No admissions test is mentioned anywhere on this course page — there is no sentence to quote. York does not state that no test is required either, so this is silence rather than a published “no admissions test”.';

const NO_INTERVIEW_NOTE =
  'No interview is mentioned on this course page. Across York’s whole Physics portfolio only the foundation-year course (F304) publishes an interview requirement, and that difference is real — it was checked page by page rather than assumed from the family.';

const FM_NOTE =
  'Further Mathematics is never raised on this course page. The page was read in full, so this is York publishing no preference either way rather than a gap in our research, and it is not recorded as “not required” — York never says that.';

const GCSE_ENGLISH =
  'No GCSE Mathematics or Science requirement is published on this course page. An English language requirement appears in the English language qualifications table: “GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4”.';

const T_LEVEL_NOTE =
  'The one explicit exclusion-style restriction York publishes on these courses is on T Levels: “We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken.”';

const DEADLINE_NOTE =
  'York publishes no application deadline on the course page. Its central contextual-offers page does carry one deadline, attached specifically to the care-experienced and estranged-student route: “Friday 28 May 2027”.';

const CENTRAL_POLICY =
  'York publishes FOUR distinct reduced or alternative offer routes centrally, and they are separate schemes with different eligibility and different sizes of reduction — they must not be conflated. “Contextual offer”: automatic and postcode-driven for applicants at UK state-funded schools paying Home fees, or holding refugee or humanitarian-protection status, worth “an offer up to two grades below”. “Additional Information Form”: for applicants with experience of local authority care or estrangement, also “up to two grades below”. “Access & Outreach alternative offer”: requires actually completing a named programme — Next Step York, Black Access, Realising Opportunities — and is worth “an alternative offer up to three grades below”. “Other options” (EPQ, Core Maths, York short courses): “an alternative offer one grade below”. York’s own worked example shows the reduction applies to the grade profile “excluding subject-specific requirements”, so a reduced offer does not waive a named subject — which is exactly what the joint degrees demonstrate, where the A in Mathematics survives every reduction.';

const TUTORIAL_ROW =
  'THIS PAGE CARRIES THE “The York Tutorial Programme” ROW, which only four of York’s twenty-five physics pages do: “If you successfully complete the York Tutorial Programme, you may be eligible for an alternative offer up to one A level grade (or equivalent) below your offer.” Its presence follows neither award level nor variant, and three of the four courses that have it have a sibling that does not. Read on this page; never inferred.';

const NO_TUTORIAL_ROW =
  'The “The York Tutorial Programme” row is ABSENT from this page, confirmed by direct check. So is the “Core Maths” row. Four of York’s twenty-five physics pages do publish the Tutorial row, so its absence here is a fact about this page rather than about the family.';

const epqNote = (threshold: 'B' | 'C') =>
  `EPQ route, under York’s own heading: “If you achieve ${threshold} or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer.” Note the threshold: twenty-three of York’s twenty-five physics courses publish C, and only the two joint Mathematics-and-Physics BSc degrees publish B.`;

/** York publishes both rows in one "Alternative offers" table, under its own headings. */
const yorkContextual = (wp: string, contextual: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under York’s own heading “Widening participation”: “${wp}” — this route is conditional on completing a widening-participation programme. Under York’s own heading “Contextual offer”: “${contextual}”. ${CENTRAL_POLICY}`,
});

const NO_PATHWAYS_NOTE =
  'YORK’S VARIANTS ARE SEPARATELY CODED COURSES, NOT OPTIONS INSIDE THIS APPLICATION. The page signposts its year-abroad and year-in-industry siblings as distinct courses to apply to, each with its own UCAS code. No common first year, no named later specialisation and no transfer mechanism between awards is published anywhere in York’s physics portfolio. The in-degree choice York does publish is elective modules in Years 2 and 3, which is module choice rather than a route.';

/* ------------------------------------------------------------------ */
/* Physics — 25 applications, every page fetched individually           */
/* ------------------------------------------------------------------ */

interface PhysSeed {
  slug: string;
  name: string;
  sub: 'physics' | 'astrophysics' | 'theoretical-physics' | 'physics-with-mathematics';
  degree: 'BSc' | 'MPhys';
  awardLabel?: string;
  years: number;
  yearsMax?: number;
  code: string;
  page: string;
  title: string;
  profile: string;
  /** The exact string York prints, kept per page — trailing stops and all. */
  raw: string;
  required: SubjectSpec[];
  wp: string;
  contextual: string;
  epq?: 'B' | 'C';
  tutorial?: boolean;
  gcse?: string;
  extra?: string;
}

const PHYS: PhysSeed[] = [
  /* --- Physics --- */
  { slug: 'york-physics-bsc', name: 'Physics', sub: 'physics', degree: 'BSc', years: 3, yearsMax: 4, code: 'F300', page: 'bsc-physics', title: 'Physics (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.', extra: 'The typical-offer string names both subjects but pins no grade to either. The Widening participation row DOES pin one — “BBC including B in Mathematics and Physics” — so the reduced route is more specific than the standard one, not less.' },
  { slug: 'york-physics-mphys', name: 'Physics', sub: 'physics', degree: 'MPhys', years: 4, yearsMax: 5, code: 'F303', page: 'mphys-physics', title: 'Physics (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics', extra: 'A FULL GRADE ABOVE THE BSc (AAB), and the gap is consistent across qualification types rather than only at A level: European Baccalaureate 85% against the BSc’s 80%, International Baccalaureate 36 against 35, Scottish Advanced Highers AB against BB.' },
  { slug: 'york-physics-year-abroad-bsc', name: 'Physics (with a year abroad)', sub: 'physics', degree: 'BSc', years: 4, code: 'F302', page: 'bsc-physics-year-abroad', title: 'Physics (with a year abroad) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.' },
  { slug: 'york-physics-year-in-industry-bsc', name: 'Physics (with a year in industry)', sub: 'physics', degree: 'BSc', years: 4, code: 'F301', page: 'bsc-physics-industry', title: 'Physics (with a year in industry) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.' },
  { slug: 'york-physics-year-abroad-mphys', name: 'Physics (with a year abroad)', sub: 'physics', degree: 'MPhys', years: 5, code: 'F305', page: 'mphys-physics-year-abroad', title: 'Physics (with a year abroad) (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.', extra: 'The year abroad is Year 4 of the five; no further placement extension is published.' },
  { slug: 'york-physics-year-in-industry-mphys', name: 'Physics (with a year in industry)', sub: 'physics', degree: 'MPhys', years: 5, code: 'F306', page: 'mphys-physics-industry', title: 'Physics (with a year in industry) (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics', extra: 'The industrial placement IS Year 4 of the five. Note York prints this page’s offer string WITHOUT a trailing full stop where its year-abroad sibling F305 has one; both are transcribed as read rather than normalised.' },

  /* --- Physics with Astrophysics --- */
  { slug: 'york-physics-with-astrophysics-bsc', name: 'Physics with Astrophysics', sub: 'astrophysics', degree: 'BSc', years: 3, yearsMax: 4, code: 'F3F5', page: 'bsc-physics-astrophysics', title: 'Physics with Astrophysics (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.', tutorial: true },
  { slug: 'york-physics-with-astrophysics-mphys', name: 'Physics with Astrophysics', sub: 'astrophysics', degree: 'MPhys', years: 4, code: 'F3FN', page: 'mphys-physics-astrophysics', title: 'Physics with Astrophysics (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.', extra: 'A full grade above its BSc F3F5. York does not state a consolidated maximum duration on this page; the extended variants are separately coded (F3F8, F3F9) at five years, so no maximum is recorded here rather than inferred from them.' },
  { slug: 'york-physics-with-astrophysics-year-abroad-bsc', name: 'Physics with Astrophysics (with a year abroad)', sub: 'astrophysics', degree: 'BSc', years: 4, code: 'F3F7', page: 'bsc-physics-astrophysics-year-abroad', title: 'Physics with Astrophysics (with a year abroad) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.', extra: 'The Tutorial-programme row is explicitly absent here even though its three-year parent F3F5 has one AND its own MPhys counterpart F3F8 has one — the asymmetry runs in both directions and was checked on all three pages.' },
  { slug: 'york-physics-with-astrophysics-year-abroad-mphys', name: 'Physics with Astrophysics (with a year abroad)', sub: 'astrophysics', degree: 'MPhys', years: 5, code: 'F3F8', page: 'mphys-physics-astrophysics-year-abroad', title: 'Physics with Astrophysics (with a year abroad) (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.', tutorial: true },
  { slug: 'york-physics-with-astrophysics-year-in-industry-bsc', name: 'Physics with Astrophysics (with a year in industry)', sub: 'astrophysics', degree: 'BSc', years: 4, code: 'F3F6', page: 'bsc-physics-astrophysics-industry', title: 'Physics with Astrophysics (with a year in industry) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics', extra: 'Printed without a trailing full stop on this page, where F3F5 and F3F7 have one. Transcribed as read.' },
  { slug: 'york-physics-with-astrophysics-year-in-industry-mphys', name: 'Physics with Astrophysics (with a year in industry)', sub: 'astrophysics', degree: 'MPhys', years: 5, code: 'F3F9', page: 'mphys-physics-astrophysics-industry', title: 'Physics with Astrophysics (with a year in industry) (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.' },

  /* --- Theoretical Physics --- */
  { slug: 'york-theoretical-physics-bsc', name: 'Theoretical Physics', sub: 'theoretical-physics', degree: 'BSc', years: 3, yearsMax: 4, code: 'F345', page: 'bsc-theoretical-physics', title: 'Theoretical Physics (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.', extra: 'Its own MPhys sibling F346 carries the York Tutorial Programme row and this page does not.' },
  { slug: 'york-theoretical-physics-mphys', name: 'Theoretical Physics', sub: 'theoretical-physics', degree: 'MPhys', years: 4, yearsMax: 5, code: 'F346', page: 'mphys-theoretical-physics', title: 'Theoretical Physics (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.', tutorial: true },
  { slug: 'york-theoretical-physics-year-abroad-bsc', name: 'Theoretical Physics (with a year abroad)', sub: 'theoretical-physics', degree: 'BSc', years: 4, code: 'F347', page: 'bsc-theoretical-physics-year-abroad', title: 'Theoretical Physics (with a year abroad) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.' },
  { slug: 'york-theoretical-physics-year-abroad-mphys', name: 'Theoretical Physics (with a year abroad)', sub: 'theoretical-physics', degree: 'MPhys', years: 5, code: 'F348', page: 'mphys-theoretical-physics-year-abroad', title: 'Theoretical Physics (with a year abroad) (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.' },
  { slug: 'york-theoretical-physics-year-in-industry-bsc', name: 'Theoretical Physics (with a year in industry)', sub: 'theoretical-physics', degree: 'BSc', years: 4, code: 'F344', page: 'bsc-theoretical-physics-industry', title: 'Theoretical Physics (with a year in industry) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.' },
  { slug: 'york-theoretical-physics-year-in-industry-mphys', name: 'Theoretical Physics (with a year in industry)', sub: 'theoretical-physics', degree: 'MPhys', years: 5, code: 'F349', page: 'mphys-theoretical-physics-industry', title: 'Theoretical Physics (with a year in industry) (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.' },

  /* --- Physics with Philosophy --- */
  { slug: 'york-physics-with-philosophy-bsc', name: 'Physics with Philosophy', sub: 'physics', degree: 'BSc', years: 3, yearsMax: 4, code: 'F3V5', page: 'bsc-physics-philosophy', title: 'Physics with Philosophy (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.', extra: 'NO GRADE REDUCTION FOR THE WITH-PHILOSOPHY STRUCTURE — the string matches straight Physics BSc F300 exactly. Its own MPhys sibling F3VM carries the York Tutorial Programme row and this page does not.' },
  { slug: 'york-physics-with-philosophy-mphys', name: 'Physics with Philosophy', sub: 'physics', degree: 'MPhys', years: 4, yearsMax: 5, code: 'F3VM', page: 'mphys-physics-philosophy', title: 'Physics with Philosophy (MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBB including Mathematics and Physics', contextual: 'ABB including Physics and Mathematics.', tutorial: true },
  { slug: 'york-physics-with-philosophy-year-abroad-bsc', name: 'Physics with Philosophy (with a year abroad)', sub: 'physics', degree: 'BSc', years: 4, code: 'F3V7', page: 'bsc-physics-philosophy-year-abroad', title: 'Physics with Philosophy (with a year abroad) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'BBC including B in Mathematics and Physics', contextual: 'BBB including Physics and Mathematics.', extra: 'THE PHYSICS WITH PHILOSOPHY GRID IS THE ONE THAT IS NOT SYMMETRIC: this family has only three coded courses — BSc F3V5, MPhys F3VM and this year-abroad BSc. There is no MPhys year abroad and no year-in-industry variant at either award level, confirmed against York’s own 2027/28 A–Z.' },

  /* --- Mathematics and Physics (joint) --- */
  { slug: 'york-mathematics-and-physics-bsc', name: 'Mathematics and Physics', sub: 'physics-with-mathematics', degree: 'BSc', years: 3, yearsMax: 4, code: 'GF13', page: 'bsc-mathematics-physics', title: 'Mathematics and Physics (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including A in Mathematics and B in Physics', required: [['Mathematics', 'A'], ['Physics', 'B']], wp: 'ABC including A in Mathematics and B in Physics', contextual: 'ABB including grade A in Mathematics and grade B in Physics.', epq: 'B', extra: 'THE SAME THREE-LETTER AGGREGATE AS PHYSICS BSc F300, AND MATERIALLY STRICTER: the A must be in Mathematics. Note that the A in Mathematics survives BOTH reductions — the Widening participation row is “ABC including A in Mathematics and B in Physics” and the contextual row is “ABB including grade A in Mathematics and grade B in Physics”. That is a concrete instance of York’s central rule that reductions apply “excluding subject-specific requirements”. Run jointly by the Department of Mathematics and the School of Physics, Engineering and Technology. York’s A–Z titles it “Mathematics/Physics (Equal)”.' },
  { slug: 'york-mathematics-and-physics-mmath-mphys', name: 'Mathematics and Physics', sub: 'physics-with-mathematics', degree: 'MPhys', awardLabel: 'MMath / MPhys', years: 4, code: 'GFC3', page: 'mmath-mphys-mathematics-physics', title: 'Mathematics and Physics (MMath/MPhys) - Undergraduate, University of York', profile: 'AAA', raw: 'AAA including Physics and Mathematics.', required: ['Physics', 'Mathematics'], wp: 'ABC including A in Mathematics and B in Physics', contextual: 'ABB including grade A in Mathematics and grade B in Physics.', epq: 'B', extra: 'YORK STATES THIS COURSE’S STANDARD OFFER UNPINNED AND ITS REDUCED OFFERS PINNED — “AAA including Physics and Mathematics.” against “ABC including A in Mathematics and B in Physics”. Its own BSc sibling GF13 pins the standard offer too. The two joint degrees state their subject requirements in different grammatical forms; both are recorded as read rather than harmonised. THE MMath/MPhys QUESTION IS SETTLED AND THE ANSWER IS THAT YORK DOES NOT PUBLISH A CHOICE: no statement about selecting between the MMath and the MPhys award appears anywhere on the page, so York presents this as a single combined degree with a dual award designation. No second record has been created for a separate MMath or MPhys variant. The one in-degree choice published is a Year 4 project choice — “You’ll choose a project focusing either on maths or physics” — which is a project topic, not a route and not an award choice. There is no year-abroad and no year-in-industry variant of this integrated Master’s.' },
  { slug: 'york-mathematics-and-physics-year-abroad-bsc', name: 'Mathematics and Physics (with a year abroad)', sub: 'physics-with-mathematics', degree: 'BSc', years: 4, code: 'GF14', page: 'bsc-mathematics-physics-year-abroad', title: 'Mathematics and Physics (with a year abroad) (BSc) - Undergraduate, University of York', profile: 'AAB', raw: 'AAB including A in Mathematics and B in Physics', required: [['Mathematics', 'A'], ['Physics', 'B']], wp: 'ABC including A in Mathematics and B in Physics', contextual: 'ABB including grade A in Mathematics and grade B in Physics', epq: 'B', gcse: 'THE ONLY COURSE IN YORK’S ENTIRE 47-COURSE PORTFOLIO WITH A GCSE MODERN-FOREIGN-LANGUAGE REQUIREMENT. Under the page’s own “Additional requirements” heading: “You should also have a GCSE at grade 4 (C) or above in French, German or Italian”, presented as applying to all applicants and confirmed by a targeted re-read. Its own three-year parent GF13 has no such requirement, and neither does the other year-abroad physics degree F3V7. York names an exhaustive accepted list — French, German or Italian — which functions as an exclusion of every other language. Neither reduced-offer row waives it: no statement to that effect is published, so it stands. No GCSE Mathematics or Science requirement is published, and the English language qualifications table separately carries the usual English-proficiency row.', extra: 'TWO OFFICIAL TITLES: the course page says “BSc (Hons) Mathematics and Physics (with a year abroad)” while York’s 2027/28 A–Z says “Mathematics/Physics (equal) (with a year abroad)” — with a lower-case “equal” where GF13 and GFC3 use “(Equal)”. York’s own capitalisation is inconsistent between them. The year abroad is supported by “an additional language module where you will study a European language to an intermediate or advanced level” — a support module, not a named route and not a choice of destination-specific pathway. The page also cross-references its three-year form: “This course is also available as a three-year degree without a year abroad”, which is GF13, a separate UCAS code and a separate application. On this page the T levels, International foundation and Other qualifications cells came back compressed — their substance is recorded but their exact wording is NOT RETRIEVED, while the A levels, EPQ and Additional requirements strings were confirmed character-for-character.' },
];

const physicsCourses: Course[] = PHYS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'york',
    name: s.name,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    awardLabel: s.awardLabel ?? null,
    years: s.years,
    yearsMax: s.yearsMax ?? null,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: s.raw,
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: s.profile,
        required: s.required,
        rawText: s.raw,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_NOTE,
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: yorkContextual(s.wp, s.contextual),
    gcse: s.gcse ?? GCSE_ENGLISH,
    studyOptions: [],
    verification: 'verified',
    officialUrl: Y(s.page),
    sourceUrl: Y(s.page),
    sourceTitle: s.title,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra,
      epqNote(s.epq ?? 'C'),
      s.tutorial ? TUTORIAL_ROW : NO_TUTORIAL_ROW,
      T_LEVEL_NOTE,
      NO_PATHWAYS_NOTE,
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  }),
);

/* ------------------------------------------------------------------ */
/* Physics with a foundation year — the one page that breaks the mould  */
/* ------------------------------------------------------------------ */

const FOUNDATION_ROUTES: StudyOption[] = [
  'Physics',
  'Physics with Astrophysics',
  'Theoretical Physics',
  'Mathematics and Physics',
  'Physics with Philosophy',
].map((name) => ({
  name: `Progression to ${name}`,
  description:
    'A named progression destination out of the foundation year, inside this one application. York: “After completing the foundation year, you’ll transfer into the Year 1 of a physics degree of your choice. All our degree programmes are offered as three-year Bachelors (BSc) courses or four-year integrated Masters (MPhys/MMath) courses.” This is the ONE place in York’s physics portfolio where a single application leads to a later choice of named degree.',
  ucasCode: 'F304',
  chosenWhen: 'After the foundation year.',
  officialUrl: null,
}));

const foundationCourse: Course = course({
  slug: 'york-physics-foundation-year-bsc',
  universityId: 'york',
  name: 'Physics (with a foundation year)',
  category: 'physics',
  sub: 'physics',
  degree: 'BSc',
  years: 4,
  yearsMax: 5,
  code: 'F304',
  year: '2027',
  cycleNote: CYCLE,
  raw: 'BBB. If you already have, or are currently studying A level Maths and Physics you should apply for one of our degree programmes without a foundation year.',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'BBB',
      rawText:
        'BBB. If you already have, or are currently studying A level Maths and Physics you should apply for one of our degree programmes without a foundation year.',
      notes:
        'NO REQUIRED A-LEVEL SUBJECTS, AND THE OPPOSITE OF A SUBJECT REQUIREMENT: holding A level Maths and Physics is a reason NOT to apply for this course. York attaches a redirection instruction to the same cell as the grade profile.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: FM_NOTE,
  test: 'unknown',
  testNote: NO_TEST_NOTE,
  interview: 'yes',
  interviewNote:
    'THE ONLY COURSE IN YORK’S PHYSICS PORTFOLIO THAT PUBLISHES AN INTERVIEW REQUIREMENT, and it is explicit: “Applicants will be required to attend an interview prior to any offer being made.” York adds: “Applicants are usually interviewed and we will look for evidence during our discussion that you are capable of dealing with the workload of the foundation year.”',
  contextual: {
    availability: 'yes',
    details: `Under York’s own heading “Widening participation”: “BCC. This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities” — THE ONLY PHYSICS COURSE WHOSE WIDENING-PARTICIPATION ROW NAMES THE INDIVIDUAL PROGRAMMES AND THE YorJourney MODULE. Under York’s own heading “Contextual offer”: “BBC”. ${CENTRAL_POLICY}`,
  },
  gcse:
    'PUBLISHED AND SPECIFIC, unlike every other York physics course: “We typically expect applicants to have GCSE Maths at grade 5 (or equivalent).”',
  studyOptions: FOUNDATION_ROUTES,
  verification: 'verified',
  officialUrl: Y('bsc-physics-foundation-year'),
  sourceUrl: Y('bsc-physics-foundation-year'),
  sourceTitle: 'Physics (with a foundation year) (BSc) - Undergraduate, University of York',
  lastVerified: VERIFIED_ON,
  notes: `THIS PAGE BREAKS THE PATTERN OF EVERY OTHER YORK PHYSICS COURSE, in four separate ways: it requires an interview, it publishes a GCSE Maths requirement, it carries an eligibility restriction that EXCLUDES applicants already holding A level Maths and Physics, and its qualifications table is different — Access to HE and BTEC rows appear where European Baccalaureate does not. It is also the only physics course where T Levels are accepted rather than restricted: York names a long list of accepted T Level subjects. The International Baccalaureate row carries the same redirection logic as the A level row: “If you are studying Mathematics - Applications and Interpretation at Higher Level or Mathematics - Analysis and Approaches at Standard Level or Higher Level, and Physics at Higher Level, please apply for one of our degree courses without a foundation year.” ${epqNote('C')} ${DEADLINE_NOTE}`,
});

/* ------------------------------------------------------------------ */
/* Engineering — 22 applications, identity confirmed, fields not read   */
/* ------------------------------------------------------------------ */


interface EngSeed {
  slug: string;
  name: string;
  sub:
    | 'general-engineering'
    | 'electronic'
    | 'electrical'
    | 'computer-engineering'
    | 'biomedical'
    | 'robotics-mechatronics';
  degree: 'BEng' | 'MEng';
  years: number;
  code: string;
  /** Course page slug — York's engineering slugs are NOT uniformly formed. */
  page: string;
  title: string;
  profile: string;
  raw: string;
  /** Named subject requirement. Foundation-year courses publish none. */
  required: SubjectSpec[];
  wp: string;
  contextual: string;
  gcse?: string;
  interview?: 'yes' | 'sometimes';
  interviewNote?: string;
  extra?: string;
  /** A v0.9 resolution note — what was ambiguous, and what settled it. */
  extra2?: string;
}

/*
 * ---------------------------------------------------------------------------
 *  YORK ENGINEERING — READ IN v0.8, ONE PAGE AT A TIME
 * ---------------------------------------------------------------------------
 *
 *  Batch 7 imported these 22 applications as identity only: York's own
 *  "Courses 2027/28" A–Z gave their titles, awards and UCAS codes, and nothing
 *  else had been read. v0.8 closes 21 of the 22 from their own course pages.
 *
 *  WHAT THE PAGES SAY, AND WHY THE REGULARITY IS A RESULT AND NOT AN ASSUMPTION
 *
 *  The offers fall into three shapes. Each page was fetched and read on its
 *  own, so the pattern below is what was found rather than what was applied:
 *
 *    · BEng, three years      ABB including Maths   WP BBC   contextual BBB
 *    · MEng, four years       AAA including Maths   WP BBB   contextual ABB
 *    · Foundation year, four  BBB, no named subject WP BCC   contextual BBC
 *
 *  THE SUBJECT RULE IS THE HEADLINE DIFFERENCE FROM YORK PHYSICS. All 25 York
 *  physics applications require Physics AND Mathematics. All 21 engineering
 *  applications name MATHEMATICS ALONE. Physics, Chemistry and Further
 *  Mathematics are not mentioned as required or preferred on any engineering
 *  page read — silence on all 21, checked page by page, recorded as "no stated
 *  preference" rather than "not required", because York never says that.
 *
 *  THE FOUNDATION-YEAR COURSES ARE GENUINELY DIFFERENT, NOT A GRADE VARIANT.
 *  They publish no A-level subject requirement at all ("You don't need any
 *  formal qualifications in maths or physics to be accepted for our foundation
 *  year"), they are the only engineering courses with a published GCSE rule,
 *  and they are the only ones that REQUIRE an interview. Three separate facts,
 *  all page-level.
 *
 *  INTERVIEWS SPLIT THREE WAYS, WHICH IS WHY THEY ARE STORED PER PAGE.
 *  Required on the three foundation-year courses. Conditional on the six
 *  music and audio courses, where York's wording is explicitly about applicants
 *  who are invited. Not mentioned at all on the remaining twelve. Recording one
 *  policy for "York Engineering" would have been wrong three times over.
 *
 *  ONE COURSE IS NOT BEING GUESSED: H640 Engineering with Audio Technology
 *  BEng. See its own record below.
 */

const ENG_CYCLE =
  'Published requirements for 2027 entry. Every page in this set was checked for its own cycle label and all 21 read "2027/28"; several also offer a toggle back to 2026/27, which is a link away from this cycle rather than a statement about it.';

const ENG_FM_NOTE =
  'Further Mathematics is never raised on this course page. York names Mathematics and nothing else. The page was read in full, so this is York publishing no preference rather than a gap in our research, and it is not recorded as "not required" — York never says that.';

const ENG_NO_TEST =
  'No admissions test is mentioned anywhere on this course page, and none is mentioned on any of the 21 York engineering pages read. York does not state that no test is required either, so this is silence rather than a published "no admissions test".';

const ENG_NO_INTERVIEW =
  'No interview is mentioned on this course page. That is a fact about this page: York DOES publish an interview requirement on its three engineering foundation-year courses and a conditional interview on its six music and audio courses, so the silence here was checked rather than assumed from the family.';

const ENG_EPQ =
  'EPQ route, under York’s own heading: “If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer.” This string appeared on every one of the 21 engineering pages read, and is recorded per page rather than inferred across the family.';

const ENG_MATHS_ONLY =
  'THE SUBJECT RULE IS MATHEMATICS ALONE. Unlike every York physics application, which requires Physics and Mathematics together, this engineering page names only Mathematics. Physics and Chemistry are not mentioned as required or preferred anywhere on it.';

const ENG_GCSE_NONE =
  'No GCSE requirement is published on this course page. Among York’s engineering courses only the three foundation-year routes publish one.';

const ENG_GCSE_FOUNDATION =
  'PUBLISHED AND SPECIFIC, unlike the non-foundation engineering courses: “We typically expect applicants to have GCSE Maths at grade 5 (or equivalent).”';

const ENG_FOUNDATION_NO_SUBJECT =
  'NO A-LEVEL SUBJECT REQUIREMENT IS PUBLISHED. York: “You don’t need any formal qualifications in maths or physics to be accepted for our foundation year.” The page also redirects applicants who already have A level Maths: “If you already have, or are currently studying A level Maths you should apply for one of our degree programmes without a foundation year.” That is a routing instruction between two separately coded applications, not a pathway inside this one.';

const ENG_MUSIC_INTERVIEW =
  'CONDITIONAL, AND THE WORDING MATTERS: “If you are based in the UK and are invited to interview, we will discuss your musical interests and motivation as part of the interview process.” York frames this as what happens to applicants who ARE invited, not as a requirement on all of them, so it is stored as a sometimes-interview rather than a required one.';

const ENG_FOUNDATION_INTERVIEW =
  'REQUIRED, in York’s own words: “Applicants will be required to attend an interview prior to any offer being made.” All three engineering foundation-year courses publish this and no other engineering course does.';

const ENG_OPTIONS_NOTE =
  'YEAR 2–3 OPTION MODULES ARE NOT APPLICATIONS. Several of these pages publish later-year option modules whose names — Robotics, Biomedical Engineering, Renewable Power Generation, Communications Systems — are the same words as separately coded York degrees. York states the options are confirmed after the course begins. They are module choices inside this one application; no record has been created for any of them and none carries a UCAS code.';

const yorkEngContextual = (wp: string, contextual: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under York’s own heading “Widening participation”: “${wp}” — this route is conditional on completing a widening-participation programme. Under York’s own heading “Contextual offer”: “${contextual}”. ${CENTRAL_POLICY}`,
});

const BENG = { profile: 'ABB', raw: 'ABB including Maths', wp: 'BBC including B in Mathematics', contextual: 'BBB including Mathematics' };
const MENG = { profile: 'AAA', raw: 'AAA including Maths', wp: 'BBB including Mathematics', contextual: 'ABB including Mathematics' };
const FOUND = { profile: 'BBB', raw: 'BBB', wp: 'BCC', contextual: 'BBC' };

const ENG: EngSeed[] = [
  { slug: 'york-engineering-beng', name: 'Engineering', sub: 'general-engineering', degree: 'BEng', years: 3, code: 'H105', page: 'beng-engineering', title: 'Engineering (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], extra: 'York’s general Engineering application, and a separate application from the MEng H109 rather than a shorter version of it: separate code, separate page, and an offer two grades lower. Neither page instructs the applicant to apply to the other’s code and neither presents the other award as an option inside itself. No common first year and no transfer mechanism is published on either page — the exact opposite of Lancaster, where a real common first year sits underneath separately coded disciplines.' },
  { slug: 'york-engineering-meng', name: 'Engineering', sub: 'general-engineering', degree: 'MEng', years: 4, code: 'H109', page: 'meng-engineering', title: 'Engineering (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], extra: 'A separate application from the BEng H105. The two-grade gap between them (AAA against ABB) repeats across York’s whole engineering portfolio.' },
  { slug: 'york-engineering-foundation-year-beng', name: 'Engineering (with a Foundation Year)', sub: 'general-engineering', degree: 'BEng', years: 4, code: 'H100', page: 'beng-engineering-foundation-year', title: 'Engineering (with a foundation year) (BEng) - Undergraduate, University of York', ...FOUND, required: [], gcse: ENG_GCSE_FOUNDATION, interview: 'yes', interviewNote: ENG_FOUNDATION_INTERVIEW, extra: `${ENG_FOUNDATION_NO_SUBJECT} Listed in York’s central A–Z under its own code but ABSENT from the School of Physics, Engineering and Technology’s own study page — one of two courses where York’s two official listings disagree. Both general Engineering pages direct foundation-year applicants to “BEng Electronic Engineering with a Foundation Year” (H604) rather than here; that is York’s own cross-reference, transcribed as printed, and is not evidence that this course does not exist. Progression is automatic: “If you successfully complete the foundation year you’ll automatically continue onto the first year of our BEng Engineering course.”` },

  { slug: 'york-electronic-engineering-beng', name: 'Electronic Engineering', sub: 'electronic', degree: 'BEng', years: 3, code: 'H610', page: 'beng-electronic-engineering', title: 'Electronic Engineering (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], extra: 'THIS RECORD SETTLES THE CODE QUESTION BATCH 7 RAISED. The old scaffold held H610 against an MEng; York’s own course page confirms H610 is the BEng and H609 the MEng. The Batch 7 deletion was correct and is now independently reconfirmed from the course pages rather than from the A–Z alone.' },
  { slug: 'york-electronic-engineering-meng', name: 'Electronic Engineering', sub: 'electronic', degree: 'MEng', years: 4, code: 'H609', page: 'meng-electronic-engineering', title: 'Electronic Engineering (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], extra: 'The scaffold row this replaces carried the BEng’s code H610 against this MEng title. York’s own page confirms H609.' },
  { slug: 'york-electronic-engineering-foundation-year-beng', name: 'Electronic Engineering (with a Foundation Year)', sub: 'electronic', degree: 'BEng', years: 4, code: 'H604', page: 'beng-electronic-engineering-foundation-year', title: 'Electronic Engineering (with a foundation year) (BEng) - Undergraduate, University of York', ...FOUND, required: [], gcse: ENG_GCSE_FOUNDATION, interview: 'yes', interviewNote: ENG_FOUNDATION_INTERVIEW, extra: `${ENG_FOUNDATION_NO_SUBJECT} This is the foundation-year course that BOTH of York’s general Engineering pages name as their progression route, in preference to Engineering (with a Foundation Year) H100, and it is also where the Electronic and Electrical Engineering pages send Maths-less applicants. It carries three different families’ foundation traffic under one code.` },

  { slug: 'york-electronic-and-electrical-engineering-beng', name: 'Electronic and Electrical Engineering', sub: 'electrical', degree: 'BEng', years: 3, code: 'H600', page: 'beng-electronic-electrical-engineering', title: 'Electronic and Electrical Engineering (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], extra: 'THE ONLY PLACE “Electrical” APPEARS IN YORK’S 2027/28 A–Z. There is no standalone Electrical Engineering degree at York; the word exists only inside this compound title and its MEng sibling. NO FOUNDATION-YEAR VARIANT CARRIES THIS NAME — the page sends applicants without A level Maths to “BEng Electronic Engineering with a Foundation Year” (H604), a differently named course under a different code. A catalogue must not cast H604 as a variant of this application.' },
  { slug: 'york-electronic-and-electrical-engineering-meng', name: 'Electronic and Electrical Engineering', sub: 'electrical', degree: 'MEng', years: 4, code: 'H606', page: 'meng-electronic-electrical-engineering', title: 'Electronic and Electrical Engineering (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'] },

  { slug: 'york-electronic-and-computer-engineering-beng', name: 'Electronic and Computer Engineering', sub: 'computer-engineering', degree: 'BEng', years: 3, code: 'H634', page: 'beng-electronic-computer-engineering', title: 'Electronic and Computer Engineering (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'] },
  { slug: 'york-electronic-and-computer-engineering-meng', name: 'Electronic and Computer Engineering', sub: 'computer-engineering', degree: 'MEng', years: 4, code: 'H639', page: 'meng-electronic-computer-engineering', title: 'Electronic and Computer Engineering (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], extra: 'THE NEAREST REAL COURSE TO THE SCAFFOLD’S PHANTOM “Computer Systems and Software Engineering MEng”, and it is a different degree with a different name and a different code. The two must not be renamed into one another; the phantom does not exist in York’s A–Z and has no course page.' },

  { slug: 'york-music-technology-systems-beng', name: 'Music Technology Systems', sub: 'electronic', degree: 'BEng', years: 3, code: 'H663', page: 'beng-music-technology-systems', title: 'Music Technology Systems (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], interview: 'sometimes', interviewNote: ENG_MUSIC_INTERVIEW, extra: 'AN ENGINEERING DEGREE WITH AN ENGINEERING SUBJECT RULE: despite the title, the published requirement is “ABB including Maths” and no musical qualification is required. The musical element appears only in the conditional interview wording.' },
  { slug: 'york-music-technology-systems-meng', name: 'Music Technology Systems', sub: 'electronic', degree: 'MEng', years: 4, code: 'H666', page: 'meng-music-technology-systems', title: 'Music Technology Systems (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], interview: 'sometimes', interviewNote: ENG_MUSIC_INTERVIEW },
  { slug: 'york-music-technology-systems-foundation-year-beng', name: 'Music Technology Systems (with a Foundation Year)', sub: 'electronic', degree: 'BEng', years: 4, code: 'H662', page: 'beng-music-technology-systems-foundation-year', title: 'Music Technology Systems (with a foundation year) (BEng) - Undergraduate, University of York', ...FOUND, required: [], gcse: ENG_GCSE_FOUNDATION, interview: 'yes', interviewNote: `${ENG_FOUNDATION_INTERVIEW} ${ENG_MUSIC_INTERVIEW}`, extra: `${ENG_FOUNDATION_NO_SUBJECT} THE ONLY YORK ENGINEERING COURSE THAT CARRIES BOTH INTERVIEW POLICIES — the mandatory foundation-year interview and the conditional musical-interests interview.`, extra2: 'RESOLVED IN v0.9. v0.8 held this at partially verified because the widening-participation string came back truncated mid-sentence. A rendered-browser read returns it in full: “BCC. This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities.” The same read also confirms the Core Maths row — “If you achieve B or higher in Core Maths, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer” — and York’s interview wording, “Applicants are usually interviewed.”' },
  { slug: 'york-electronic-engineering-with-music-technology-systems-beng', name: 'Electronic Engineering with Music Technology Systems', sub: 'electronic', degree: 'BEng', years: 3, code: 'H667', page: 'beng-ee-music-technology-systems', title: 'Electronic Engineering with Music Technology Systems (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], interview: 'sometimes', interviewNote: ENG_MUSIC_INTERVIEW },
  { slug: 'york-electronic-engineering-with-music-technology-systems-meng', name: 'Electronic Engineering with Music Technology Systems', sub: 'electronic', degree: 'MEng', years: 4, code: 'H669', page: 'meng-ee-music-technology-systems', title: 'Electronic Engineering with Music Technology Systems (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], interview: 'sometimes', interviewNote: ENG_MUSIC_INTERVIEW },

  { slug: 'york-engineering-with-audio-technology-beng', name: 'Engineering with Audio Technology', sub: 'electronic', degree: 'BEng', years: 3, code: 'H640', page: 'beng-engineering-audio-technology', title: 'Engineering with Audio Technology (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], interview: 'sometimes', interviewNote: ENG_MUSIC_INTERVIEW, extra: 'THE COURSE EXISTS, AND THE v0.8 \u201CFIRST-PARTY CONFLICT\u201D WAS OUR RETRIEVAL FAILURE RATHER THAN YORK\u2019S INCONSISTENCY. v0.8 concluded that York\u2019s A\u2013Z listed this course while York\u2019s course tree did not publish it, and preserved that as an unresolved conflict rather than deleting either side. A rendered-browser check settles it: the page is at beng-engineering-audio-technology \u2014 the very slug v0.8 reported as a 404 \u2014 and it returns 200 with a full requirements table. York\u2019s A\u2013Z also lists both the BEng and the MEng under \u201CSingle Subject\u201D. So the two official sources agreed all along. The lesson is the one v0.8 drew for Lancaster in reverse: refusing to reconcile a conflict was right, but the conflict was never real, and a 404 from a text fetch is not evidence that a page does not exist.', extra2: 'Read in full in v0.9: \u201CABB including Maths.\u201D, widening participation \u201CBBC including B in Mathematics\u201D with the standard conditionality clause, contextual offer \u201CBBB including Mathematics.\u201D, no GCSE requirement published, no admissions test mentioned anywhere, and the conditional musical-interests interview. NONE of this was carried across from its MEng sibling H641 \u2014 which asks AAA \u2014 and the values were read before the sibling\u2019s were compared.' },
  { slug: 'york-engineering-with-audio-technology-meng', name: 'Engineering with Audio Technology', sub: 'electronic', degree: 'MEng', years: 4, code: 'H641', page: 'meng-engineering-audio-technology', title: 'Engineering with Audio Technology (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], interview: 'sometimes', interviewNote: ENG_MUSIC_INTERVIEW, extra2: 'RESOLVED IN v0.9, AND THE CONFLICT WAS OURS RATHER THAN YORK’S. v0.8 held this record at partially verified because two retrievals disagreed — one surfaced “ABB” somewhere on the page, another found only “AAA including Maths”. A rendered-browser read settles it: “ABB” appears EXACTLY ONCE on the page and it is the CONTEXTUAL offer, “Contextual offer ABB including Mathematics.” The typical offer is AAA, printed twice — in the key-facts panel as “Typical offer AAA” and in the requirements table as “AAA including Maths.” There was never an inconsistency in York’s page; a text-fetch summariser had collapsed two different offers into one ambiguous sighting. The widening-participation string is also now confirmed character-for-character.', extra: 'THE COUNTERPART PROBLEM. This page states “You may be able to change course, add a year in industry or change between MEng and BEng” — implying a BEng exists — yet no BEng Engineering with Audio Technology course page could be found on york.ac.uk under any slug tried, and this page’s own “Related courses” list names only itself, Engineering BEng/MEng and the two Electronic Engineering with Music Technology Systems courses. York’s A–Z lists H640; York’s course pages do not. That conflict is recorded on the H640 record and has NOT been resolved by deleting either side.' },

  { slug: 'york-biomedical-engineering-beng', name: 'Biomedical Engineering', sub: 'biomedical', degree: 'BEng', years: 3, code: 'H160', page: 'beng-biomedical-engineering', title: 'Biomedical Engineering (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], extra: 'BEng-ONLY. York publishes no MEng counterpart for this title, and none has been invented. Its nearest MEng neighbour is Medical Engineering H119 — a different title under a different code, not this course’s missing half. NOTE THE SUBJECT RULE: a biomedical engineering degree that requires Mathematics and does not require Biology, Chemistry or Physics.' },
  { slug: 'york-medical-engineering-meng', name: 'Medical Engineering', sub: 'biomedical', degree: 'MEng', years: 4, code: 'H119', page: 'meng-medical-engineering', title: 'Medical Engineering (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], extra2: 'RESOLVED IN v0.9. v0.8 held this at partially verified because the widening-participation string came back truncated. A rendered-browser read returns it in full: “BBB including Mathematics. This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities.” The same read confirms that NO GCSE requirement is published on this page, which the v0.8 record already stated.', extra: 'MEng-ONLY. York publishes no BEng counterpart for this title, and none has been invented. An MEng does not imply a BEng — and York proves the rule in both directions at once, since its Biomedical Engineering H160 is BEng-only.' },
  { slug: 'york-intelligent-digital-health-engineering-beng', name: 'Intelligent Digital Health Engineering', sub: 'biomedical', degree: 'BEng', years: 3, code: 'H116', page: 'intelligent-digital-health-engineering-beng', title: 'Intelligent Digital Health Engineering (BEng) - Undergraduate, University of York', ...BENG, required: ['Mathematics'], extra: 'BEng-only in York’s 2027/28 A–Z. Its page slug puts the award as a SUFFIX where every other York engineering course puts it as a prefix — an internal inconsistency in York’s own URLs, recorded because a catalogue that derives course URLs by pattern would silently lose this course.' },
  { slug: 'york-robotic-engineering-meng', name: 'Robotic Engineering', sub: 'robotics-mechatronics', degree: 'MEng', years: 4, code: 'H659', page: 'meng-robotic-engineering', title: 'Robotic Engineering (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], extra: 'MEng-only. The nearest real York degree to “Mechatronics”, a title York does not use at all — recorded under its own name rather than as a Mechatronics substitute. “Robotics” ALSO APPEARS AS A YEAR 3 OPTION MODULE inside Engineering BEng H105 and Electronic Engineering BEng H610. The module and this degree are different things, and only this one is an application.' },
  { slug: 'york-engineering-with-renewable-energy-meng', name: 'Engineering with Renewable Energy', sub: 'general-engineering', degree: 'MEng', years: 4, code: 'H221', page: 'meng-engineering-renewable-energy', title: 'Engineering with Renewable Energy (MEng) - Undergraduate, University of York', ...MENG, required: ['Mathematics'], extra: 'MEng-only, and the second of the two courses that appear in York’s central A–Z but are ABSENT from the School of Physics, Engineering and Technology’s own study page. “Renewable Power Generation” also appears as a Year 3 option module inside Engineering BEng H105; the module and this degree are different things.' },
];

const engineeringCourses: Course[] = ENG.map((s) =>
  course({
    slug: s.slug,
    universityId: 'york',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: ENG_CYCLE,
    raw: s.raw,
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: s.profile,
        required: s.required,
        rawText: s.raw,
      }),
    ],
    maths: s.required.length ? 'required' : 'not-required',
    fm: 'no-stated-preference',
    fmNote: ENG_FM_NOTE,
    test: 'unknown',
    testNote: ENG_NO_TEST,
    interview: s.interview ?? 'not-stated',
    interviewNote: s.interviewNote ?? ENG_NO_INTERVIEW,
    contextual: yorkEngContextual(s.wp, s.contextual),
    gcse: s.gcse ?? ENG_GCSE_NONE,
    studyOptions: [],
    verification: 'verified',
    identityVerification: 'official-page',
    identityNote:
      'York’s own course page for this application was retrieved and read, and its title, award and UCAS code were confirmed against York’s central “Courses 2027/28” A–Z as well. Two independent official sources agree on the identity.',
    officialUrl: Y(s.page),
    sourceUrl: Y(s.page),
    sourceTitle: s.title,
    lastVerified: ENG_VERIFIED_ON,
    notes: [s.extra, s.extra2, ENG_MATHS_ONLY, ENG_EPQ, ENG_OPTIONS_NOTE, DEADLINE_NOTE]
      .filter(Boolean)
      .join(' '),
  }),
);

/*
 * H640 — CLOSED IN v0.9, AND THE RECORD OF WHY IS WORTH KEEPING.
 *
 * v0.8 held Engineering with Audio Technology BEng as the catalogue's one
 * identity-only York row, on the grounds that York's A–Z listed it while York's
 * course-page tree appeared not to publish it. It treated that as a first-party
 * conflict and refused to reconcile it — the right instinct, and the rule the
 * Leeds H795 case established.
 *
 * The conflict did not exist. A rendered-browser check found the page at
 * beng-engineering-audio-technology, the exact slug a v0.8 text fetch had
 * reported as a 404, and York's A–Z lists both awards. The record is now a
 * fully verified seed in the ENG array above.
 *
 * What this cost: one row sat empty for a stage because a 404 from a text fetch
 * was read as evidence about the world rather than about the fetch. Twice now
 * — here and at Lancaster — a retrieval limit has been mistaken for a fact
 * about a university. That is the single most repeated error in this project's
 * history, and it is why every remaining gap in the backlog names the specific
 * thing that could not be read rather than concluding something about what
 * exists.
 */

/** York's verified 2027 applications — these earn 2028 shells. */
export const batch7YorkCourses: Course[] = [
  ...physicsCourses,
  foundationCourse,
  ...engineeringCourses,
];

/** York's identity-only 2027 applications — real courses, requirements unread. */
export const batch7YorkAwaitingCourses: Course[] = [];

export const batch7YorkAll: Course[] = [...batch7YorkCourses, ...batch7YorkAwaitingCourses];

/**
 * Titles searched for in York's own 2027/28 A–Z and absent from it. Exported so
 * the assertion suite can prove no record was ever created for any of them.
 */
export const YORK_NONEXISTENT_TITLES: readonly string[] = [
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Aeronautical Engineering',
  'Automotive Engineering',
  'Materials Engineering',
  'Materials Science',
  'Manufacturing Engineering',
  'Mechatronics',
  'Mathematical Physics',
  'Computer Systems and Software Engineering',
] as const;

/**
 * Year 3 option modules inside Engineering BEng H105 whose names collide with
 * separately coded York degrees. Exported so the suite can prove none of them
 * became a course or a study option of its own.
 */
export const YORK_H105_OPTION_MODULES: readonly string[] = [
  'Renewable Power Generation',
  'Communications Systems',
  'Biomedical Engineering',
  'Robotics',
] as const;
