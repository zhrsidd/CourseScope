/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 4, PART C: THE UNIVERSITY OF EDINBURGH
 *  2027 entry. Read from Edinburgh's own Degree Finder on 2026-09-03.
 * ---------------------------------------------------------------------------
 *  Edinburgh publishes admissions data in a shape no earlier batch used, and
 *  the differences are recorded rather than flattened.
 *
 *  1. THE STANDARD OFFER IS A RANGE, NOT A PROFILE. Edinburgh's heading is
 *     "A levels: standard entry requirements" and the value is, verbatim,
 *     "from AAA to ABB in one set of exams". That is a band, not a single
 *     grade profile, so it is stored verbatim as the pathway's grade string.
 *     The engine cannot parse a band into three grades, so it returns REVIEW
 *     REQUIRED for the overall-grade check and says why. Collapsing the band to
 *     AAA would overstate the requirement; collapsing it to ABB would
 *     understate it. A review verdict is the honest answer, and the subject
 *     conditions are still checked normally.
 *
 *  2. "MINIMUM ENTRY REQUIREMENTS" IS A WIDENING-ACCESS THRESHOLD, NOT A
 *     FLOOR ON THE NORMAL OFFER. Edinburgh's heading is "A levels minimum
 *     requirements (for widening access applicants)" and the eligibility text
 *     is "applicants who are permanent residents in the UK and eligible to be
 *     considered for a widening access Plus Flag offer". This is NOT the same
 *     concept as Imperial's "minimum entry standard", which is a university
 *     floor applying to everyone. It is therefore stored as an access offer
 *     alongside the contextual field, never as the headline offer, and never
 *     in `minimumEntryStandard`.
 *
 *  3. TWO GENUINELY DIFFERENT ENGINEERING BANDS. Most engineering degrees ask
 *     "from AAA to ABB"; Civil Engineering and Structural and Fire Safety
 *     Engineering ask "from ABB to BBB". They are not interchangeable.
 *
 *  4. Not a single A* appears in any Edinburgh first-year A-level requirement.
 *     The only A* found anywhere is in Mathematical Physics's second-year
 *     direct-entry route, which is recorded as a note, not as an offer.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-03';

const CYCLE =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data. The official page gives a start date of September 2027.';

const E = (path: string) => `https://study.ed.ac.uk/programmes/undergraduate/${path}`;

const DEADLINE_NOTE = 'Application deadline: 13 January 2027 (6:00pm GMT).';

const NO_TEST_NOTE =
  'No admissions test is mentioned anywhere on this programme page. The word “test” does not appear.';

const NO_INTERVIEW_NOTE =
  'No interview is mentioned anywhere on this programme page. Edinburgh does not publish an explicit “we do not interview” statement for it, so this is silence rather than a published negative.';

const RANGE_NOTE =
  'Edinburgh publishes this as a BAND, not a single grade profile. Because a band cannot be compared with a set of three grades, the overall-grade check returns “review required” and the band is shown as the university printed it. The subject conditions below are checked normally.';

/**
 * Edinburgh's widening-access threshold. Recorded as an access offer, never as
 * the headline offer and never as a "minimum entry standard".
 */
const access = (grades: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Widening access offer: ${grades} Edinburgh publishes this under the heading “A levels minimum requirements (for widening access applicants)” and restricts it to “applicants who are permanent residents in the UK and eligible to be considered for a widening access Plus Flag offer”. It is a separate access route with its own eligibility criteria, not a lower version of the standard offer, and it is not matched against grades here.`,
});

const GCSE_PHYSICS = 'English at C or 4.';
const GCSE_ENGINEERING = 'English at C or 4. Physics or Science at B or 6.';

/* ------------------------------------------------------------------ */
/* Physics and Astronomy                                               */
/* ------------------------------------------------------------------ */

const PHYS_BAND = 'from AAA to ABB in one set of exams';
const PHYS_ACCESS = 'ABB.';

interface PhysSeed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys' | 'Other';
  awardLabel?: string;
  sub: 'physics' | 'astrophysics' | 'theoretical-physics' | 'physics-with-computing' | 'mathematical-physics';
  years: number;
  yearsMax?: number;
  code: string;
  path: string;
  /** Chemical Physics and Mathematical Physics differ from the main group. */
  variant?: 'chemical' | 'mathematical';
  placement?: string;
}

const PHYS_SEEDS: PhysSeed[] = [
  { slug: 'edinburgh-physics-bsc', name: 'Physics', degree: 'BSc', sub: 'physics', years: 3, yearsMax: 4, code: 'F300', path: '33-physics' },
  { slug: 'edinburgh-physics-mphys', name: 'Physics', degree: 'MPhys', sub: 'physics', years: 4, yearsMax: 5, code: 'F303', path: '34-physics' },
  { slug: 'edinburgh-physics-with-a-year-abroad-mphys', name: 'Physics with a Year Abroad', degree: 'MPhys', sub: 'physics', years: 4, yearsMax: 5, code: 'W2S4', path: '643-physics-with-a-year-abroad', placement: 'Edinburgh states: “In Year 4, you will complete an innovative research project at a partner institution overseas.” Named partners include the University of Sydney, the University of Melbourne, TRIUMF in Vancouver, Nagoya University and GSI in Germany. The year abroad is a compulsory part of this degree, not an option.' },
  { slug: 'edinburgh-astrophysics-bsc', name: 'Astrophysics', degree: 'BSc', sub: 'astrophysics', years: 3, yearsMax: 4, code: 'F510', path: '46-astrophysics' },
  { slug: 'edinburgh-astrophysics-mphys', name: 'Astrophysics', degree: 'MPhys', sub: 'astrophysics', years: 4, yearsMax: 5, code: 'F361', path: '44-astrophysics' },
  { slug: 'edinburgh-theoretical-physics-bsc', name: 'Theoretical Physics', degree: 'BSc', sub: 'theoretical-physics', years: 3, yearsMax: 4, code: 'F302', path: '582-theoretical-physics' },
  { slug: 'edinburgh-theoretical-physics-mphys', name: 'Theoretical Physics', degree: 'MPhys', sub: 'theoretical-physics', years: 4, yearsMax: 5, code: 'F306', path: '583-theoretical-physics' },
  { slug: 'edinburgh-computational-physics-bsc', name: 'Computational Physics', degree: 'BSc', sub: 'physics-with-computing', years: 3, yearsMax: 4, code: 'F343', path: '42-computational-physics' },
  { slug: 'edinburgh-computational-physics-mphys', name: 'Computational Physics', degree: 'MPhys', sub: 'physics-with-computing', years: 4, yearsMax: 5, code: 'F355', path: '43-computational-physics' },
  { slug: 'edinburgh-mathematical-physics-bsc', name: 'Mathematical Physics', degree: 'BSc', sub: 'mathematical-physics', years: 3, yearsMax: 4, code: 'F326', path: '38-mathematical-physics', variant: 'mathematical' },
  { slug: 'edinburgh-mathematical-physics-mphys', name: 'Mathematical Physics', degree: 'MPhys', sub: 'mathematical-physics', years: 4, yearsMax: 5, code: 'F325', path: '37-mathematical-physics', variant: 'mathematical' },
  { slug: 'edinburgh-chemical-physics-bsc', name: 'Chemical Physics', degree: 'BSc', sub: 'physics', years: 3, yearsMax: 4, code: 'F334', path: '40-chemical-physics', variant: 'chemical' },
  { slug: 'edinburgh-chemical-physics-mchemphys', name: 'Chemical Physics', degree: 'Other', awardLabel: 'MChemPhys', sub: 'physics', years: 4, yearsMax: 5, code: 'F333', path: '39-chemical-physics', variant: 'chemical' },
];

const edinburghPhysics: Course[] = PHYS_SEEDS.map((s) => {
  const chemical = s.variant === 'chemical';
  const mathematical = s.variant === 'mathematical';
  const subjects = chemical
    ? 'Chemistry at B, Mathematics at B, Physics at B.'
    : 'Mathematics at A, Physics at B.';
  return course({
    slug: s.slug,
    universityId: 'edinburgh',
    name: s.name,
    awardLabel: s.awardLabel ?? null,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    yearsMax: s.yearsMax ?? null,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard entry requirements',
        gradeProfile: PHYS_BAND,
        required: chemical
          ? [['Chemistry', 'B'], ['Mathematics', 'B'], ['Physics', 'B']]
          : [['Mathematics', 'A'], ['Physics', 'B']],
        recommended: mathematical ? ['Further Mathematics'] : [],
        notes: `Edinburgh heading “A levels: standard entry requirements”: “${PHYS_BAND}”. Required subjects: ${subjects}${mathematical ? ' Further Mathematics is recommended.' : ''} ${RANGE_NOTE}`,
      }),
    ],
    fm: mathematical ? 'recommended' : 'no-stated-preference',
    fmNote: mathematical
      ? 'Edinburgh states “Further Mathematics is recommended” for this programme. It is not required.'
      : 'Further Mathematics is not mentioned on this programme page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: access(PHYS_ACCESS),
    gcse: GCSE_PHYSICS,
    placement:
      s.placement ??
      'Edinburgh states: “You will have the opportunity to study abroad in Year 3 of this degree at one of our partner universities.” No separate UCAS code is published for it.',
    verification: 'verified',
    officialUrl: E(s.path),
    sourceUrl: E(s.path),
    sourceTitle: `${s.name} | The University of Edinburgh`,
    lastVerified: VERIFIED_ON,
    notes: `${mathematical ? 'Edinburgh also publishes a Year 2 direct-entry route requiring “A*AA in one set of exams to include Mathematics at A*, Further Mathematics, and Physics”. That is a second-year entry route, not this first-year offer, and is recorded here as a note only. ' : ''}${DEADLINE_NOTE}`,
  });
});

/* ------------------------------------------------------------------ */
/* Engineering                                                         */
/* ------------------------------------------------------------------ */

const ENG_BAND_HIGH = 'from AAA to ABB in one set of exams';
const ENG_BAND_LOW = 'from ABB to BBB in one set of exams';

const ENG_SCIENCES = [
  'Physics',
  'Biology',
  'Chemistry',
  'Computer Science',
  'Design and Technology',
  'Engineering',
];

interface EngSeed {
  slug: string;
  name: string;
  degree: 'BEng' | 'MEng';
  sub: 'mechanical' | 'electrical' | 'civil' | 'chemical' | 'general-engineering' | 'computer-engineering';
  years: number;
  yearsMax?: number;
  code: string;
  path: string;
  band: 'high' | 'low';
  /** Chemical Engineering requires Chemistry; Electronics and CS raises Maths to A. */
  variant?: 'chemical' | 'maths-a';
  extraNotes?: string;
}

const ENG_SEEDS: EngSeed[] = [
  { slug: 'edinburgh-engineering-h100', name: 'Engineering', degree: 'BEng', sub: 'general-engineering', years: 4, yearsMax: 5, code: 'H100', path: '75-engineering', band: 'high', extraNotes: 'This is Edinburgh’s shared first-year entry route. Its page states that students “explore all our engineering disciplines in Year 1” and then “will join one of the following degree programmes” from Year 2 — Chemical, Civil, Electrical and Mechanical, Electronics and Computer Science, Electronics and Electrical, Mechanical, or Structural and Fire Safety Engineering — all under this single UCAS code. Edinburgh adds that Chemical Engineering transfer needs prerequisite courses, Electronics and Computer Science transfer is “competitive and limited”, and Structural Engineering with Architecture is not reachable by this route.' },
  { slug: 'edinburgh-mechanical-engineering-beng', name: 'Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, yearsMax: 4, code: 'H300', path: '82-mechanical-engineering', band: 'high' },
  { slug: 'edinburgh-mechanical-engineering-meng', name: 'Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, yearsMax: 5, code: 'H303', path: '83-mechanical-engineering', band: 'high' },
  { slug: 'edinburgh-electronics-and-electrical-engineering-beng', name: 'Electronics and Electrical Engineering', degree: 'BEng', sub: 'electrical', years: 3, yearsMax: 4, code: 'H600', path: '88-electronics-and-electrical-engineering', band: 'high' },
  { slug: 'edinburgh-electronics-and-electrical-engineering-meng', name: 'Electronics and Electrical Engineering', degree: 'MEng', sub: 'electrical', years: 4, yearsMax: 5, code: 'H601', path: '89-electronics-and-electrical-engineering', band: 'high' },
  { slug: 'edinburgh-electrical-and-mechanical-engineering-beng', name: 'Electrical and Mechanical Engineering', degree: 'BEng', sub: 'mechanical', years: 3, yearsMax: 4, code: 'HH36', path: '107-electrical-and-mechanical-engineering', band: 'high' },
  { slug: 'edinburgh-electrical-and-mechanical-engineering-meng', name: 'Electrical and Mechanical Engineering', degree: 'MEng', sub: 'mechanical', years: 4, yearsMax: 5, code: 'HHH6', path: '109-electrical-and-mechanical-engineering', band: 'high' },
  { slug: 'edinburgh-electronics-and-computer-science-beng', name: 'Electronics and Computer Science', degree: 'BEng', sub: 'computer-engineering', years: 4, code: 'GH60', path: '654-electronics-and-computer-science', band: 'high', variant: 'maths-a' },
  { slug: 'edinburgh-electronics-and-computer-science-meng', name: 'Electronics and Computer Science', degree: 'MEng', sub: 'computer-engineering', years: 5, code: 'GHK6', path: '70-electronics-and-computer-science', band: 'high', variant: 'maths-a' },
  { slug: 'edinburgh-structural-engineering-with-architecture-beng', name: 'Structural Engineering with Architecture', degree: 'BEng', sub: 'civil', years: 4, code: 'H2K1', path: '80-structural-engineering-with-architecture', band: 'high' },
  { slug: 'edinburgh-structural-engineering-with-architecture-meng', name: 'Structural Engineering with Architecture', degree: 'MEng', sub: 'civil', years: 5, code: 'H2KC', path: '81-structural-engineering-with-architecture', band: 'high' },
  { slug: 'edinburgh-chemical-engineering-beng', name: 'Chemical Engineering', degree: 'BEng', sub: 'chemical', years: 3, yearsMax: 4, code: 'H800', path: '99-chemical-engineering', band: 'high', variant: 'chemical' },
  { slug: 'edinburgh-chemical-engineering-meng', name: 'Chemical Engineering', degree: 'MEng', sub: 'chemical', years: 4, yearsMax: 5, code: 'H804', path: '100-chemical-engineering', band: 'high', variant: 'chemical' },
  { slug: 'edinburgh-civil-engineering-beng', name: 'Civil Engineering', degree: 'BEng', sub: 'civil', years: 3, yearsMax: 4, code: 'H200', path: '76-civil-engineering', band: 'low' },
  { slug: 'edinburgh-civil-engineering-meng', name: 'Civil Engineering', degree: 'MEng', sub: 'civil', years: 4, yearsMax: 5, code: 'H203', path: '77-civil-engineering', band: 'low' },
  { slug: 'edinburgh-structural-and-fire-safety-engineering-beng', name: 'Structural and Fire Safety Engineering', degree: 'BEng', sub: 'civil', years: 3, yearsMax: 4, code: 'HH21', path: '106-structural-and-fire-safety-engineering', band: 'low' },
  { slug: 'edinburgh-structural-and-fire-safety-engineering-meng', name: 'Structural and Fire Safety Engineering', degree: 'MEng', sub: 'civil', years: 4, yearsMax: 5, code: 'HHF1', path: '108-structural-and-fire-safety-engineering', band: 'low' },
];

const edinburghEngineering: Course[] = ENG_SEEDS.map((s) => {
  const band = s.band === 'high' ? ENG_BAND_HIGH : ENG_BAND_LOW;
  const accessGrades = s.band === 'high' ? 'ABB.' : 'BBB.';
  const chemical = s.variant === 'chemical';
  const mathsA = s.variant === 'maths-a';
  const subjectText = chemical
    ? 'Mathematics at B and Chemistry at B.'
    : `Mathematics at ${mathsA ? 'A' : 'B'} and one of Physics, Biology, Chemistry, Computer Science/Computing, Design and Technology (excluding Food Technology) or Engineering at B.`;
  return course({
    slug: s.slug,
    universityId: 'edinburgh',
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
    offers: [
      offer({
        label: 'Standard entry requirements',
        gradeProfile: band,
        required: chemical
          ? [['Mathematics', 'B'], ['Chemistry', 'B']]
          : [['Mathematics', mathsA ? 'A' : 'B']],
        constraints: chemical
          ? []
          : [
              oneOf(
                ENG_SCIENCES,
                'B',
                'One of Physics, Biology, Chemistry, Computer Science/Computing, Design and Technology (excluding Food Technology) or Engineering at B.',
              ),
            ],
        notes: `Edinburgh heading “A levels: standard entry requirements”: “${band}”. Required subjects: ${subjectText} ${RANGE_NOTE}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not required for first-year entry and is not mentioned as a preference on this programme page.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: access(accessGrades),
    gcse: GCSE_ENGINEERING,
    placement:
      'Edinburgh states: “In Year 3, you will have opportunities to study abroad… Common destinations include: USA, Canada, Australia, Europe, Asia.” No separate UCAS code is published for it.',
    verification: 'verified',
    officialUrl: E(s.path),
    sourceUrl: E(s.path),
    sourceTitle: `${s.name} | The University of Edinburgh`,
    lastVerified: VERIFIED_ON,
    notes: `${s.extraNotes ? `${s.extraNotes} ` : ''}${s.band === 'low' ? 'This programme sits in Edinburgh’s LOWER engineering band (ABB to BBB), not the AAA to ABB band used by most of its engineering degrees. ' : ''}${chemical ? 'Chemistry is required by name here — the six-way science choice used by the other engineering programmes does not apply. ' : ''}The only subject exclusion Edinburgh publishes is Food Technology, excluded from the Design and Technology option. ${DEADLINE_NOTE}`,
  });
});

export const batch4EdinburghCourses: Course[] = [...edinburghPhysics, ...edinburghEngineering];
