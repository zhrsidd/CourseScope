/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 2, PART B: UNIVERSITY COLLEGE LONDON
 *  2027 entry. Read from UCL's own course pages on 2026-09-01.
 * ---------------------------------------------------------------------------
 *  UCL presents entry requirements as separate labelled fields — "Grades",
 *  "Subjects", "GCSEs", and a separate "Contextual offer" block — never as one
 *  flowing sentence. `raw` is therefore null on every record, and UCL's exact
 *  Subjects sentence is preserved verbatim in the pathway notes.
 *
 *  Three things here that must not be generalised from one course to another:
 *
 *   • The A*A rule. Most Physics-family courses say "A*A in Mathematics and
 *     Physics required (in any order)" — encoded as both subjects at A or
 *     better plus a constraint requiring one of the two at A*. A Further
 *     Mathematics A* cannot satisfy it.
 *   • Chemical Engineering requires Mathematics and CHEMISTRY. Physics is only
 *     "preferred". A four-A-Level applicant with Maths, Further Maths, Physics
 *     and Economics does not meet it however high the grades.
 *   • Electronic and Electrical Engineering's ESAT requirement is a CHOICE:
 *     Mathematics 1 plus any two of Physics, Mathematics 2, Chemistry and
 *     Biology. It is stored as a mandatory module plus a structured choice, not
 *     flattened into Imperial's fixed three-module set.
 *
 *  Contextual offers are stored as published information only. They are never
 *  offer pathways, so no student is ever matched against one.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { atLeastAt, course, manualReview, offer } from './builders';

const VERIFIED_ON = '2026-09-01';

const NOT_2028 =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data.';

const U = (slug: string) =>
  `https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/${slug}`;

const GCSE_STANDARD = 'English Language and Mathematics at grade C or 4.';

const DEADLINE_NOTE =
  'Application deadline: 13 January 2027. Applications close at 6pm UK time.';

const CYCLE = `${NOT_2028} The official page gives a start date of September 2027.`;

/**
 * UCL publishes a reduced contextual offer for most courses. It is recorded as
 * information, not as a matchable pathway: eligibility is decided by UCL
 * against criteria this tool does not hold.
 */
const ctx = (grades: string, subjects: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `${grades} — ${subjects} Contextual eligibility is assessed separately by UCL against its own published criteria; meeting these grades does not by itself make an applicant eligible.`,
});

/** The Physics-family subject rule, quoted from UCL. */
const A_STAR_A_RULE = 'A*A in Mathematics and Physics required (in any order).';

const PREFERRED_SUBJECTS_NOTE =
  'UCL also states: “At least two A level subjects should be taken from UCL’s list of preferred A level subjects.”';

/**
 * Shared shape for the six Physics-family courses that publish an identical
 * requirement. Each record still passes its own source URL and title, so a
 * later divergence on one page cannot silently propagate to the others.
 */
function physicsFamilyOffers() {
  return [
    offer({
      label: 'Standard offer',
      gradeProfile: 'A*AA',
      // "A*A in Mathematics and Physics" states both subject grades outright:
      // both at A or better, and one of the two at A*. Nothing is inferred.
      required: [['Mathematics', 'A'], ['Physics', 'A']],
      constraints: [
        atLeastAt(
          ['Mathematics', 'Physics'],
          'A*',
          1,
          'The A* must be in Mathematics or Physics — an A* in another subject does not satisfy this.',
        ),
      ],
      notes: `Subjects: ${A_STAR_A_RULE}`,
    }),
  ];
}

export const batch2UclCourses: Course[] = [
  /* ================================================================ */
  /* PHYSICS                                                          */
  /* ================================================================ */

  /* 1. Physics BSc (F300) */
  course({
    slug: 'ucl-physics-bsc',
    universityId: 'ucl',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F300',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: physicsFamilyOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'AA in Mathematics and Physics.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('physics-bsc'),
    sourceUrl: U('physics-bsc'),
    sourceTitle: 'Physics BSc | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `${PREFERRED_SUBJECTS_NOTE} ${DEADLINE_NOTE}`,
  }),

  /* 2. Physics MSci (F303) */
  course({
    slug: 'ucl-physics-msci',
    universityId: 'ucl',
    name: 'Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F303',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: physicsFamilyOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'AA in Mathematics and Physics.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('physics-msci'),
    sourceUrl: U('physics-msci'),
    sourceTitle: 'Physics MSci | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: DEADLINE_NOTE,
  }),

  /* 3. Theoretical Physics BSc (F340) */
  course({
    slug: 'ucl-theoretical-physics-bsc',
    universityId: 'ucl',
    name: 'Theoretical Physics',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'BSc',
    years: 3,
    code: 'F340',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: physicsFamilyOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'AA in Mathematics and Physics.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('theoretical-physics-bsc'),
    sourceUrl: U('theoretical-physics-bsc'),
    sourceTitle: 'Theoretical Physics BSc | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: DEADLINE_NOTE,
  }),

  /* 4. Theoretical Physics MSci (F345) */
  course({
    slug: 'ucl-theoretical-physics-msci',
    universityId: 'ucl',
    name: 'Theoretical Physics',
    category: 'physics',
    sub: 'theoretical-physics',
    degree: 'MSci',
    years: 4,
    code: 'F345',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: physicsFamilyOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'AA in Mathematics and Physics.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('theoretical-physics-msci'),
    sourceUrl: U('theoretical-physics-msci'),
    sourceTitle: 'Theoretical Physics MSci | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: DEADLINE_NOTE,
  }),

  /* 5. Astrophysics BSc (F510) */
  course({
    slug: 'ucl-astrophysics-bsc',
    universityId: 'ucl',
    name: 'Astrophysics',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'BSc',
    years: 3,
    code: 'F510',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: physicsFamilyOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'AA in Mathematics and Physics.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('astrophysics-bsc'),
    sourceUrl: U('astrophysics-bsc'),
    sourceTitle: 'Astrophysics BSc | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: DEADLINE_NOTE,
  }),

  /* 6. Astrophysics MSci (F511) */
  course({
    slug: 'ucl-astrophysics-msci',
    universityId: 'ucl',
    name: 'Astrophysics',
    category: 'physics',
    sub: 'astrophysics',
    degree: 'MSci',
    years: 4,
    code: 'F511',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: physicsFamilyOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'AA in Mathematics and Physics.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('astrophysics-msci'),
    sourceUrl: U('astrophysics-msci'),
    sourceTitle: 'Astrophysics MSci | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: DEADLINE_NOTE,
  }),

  /* 7. Mathematics and Physics BSc (GF13) — a genuinely different rule */
  course({
    slug: 'ucl-mathematics-and-physics-bsc',
    universityId: 'ucl',
    name: 'Mathematics and Physics',
    category: 'physics',
    sub: 'physics-with-mathematics',
    degree: 'BSc',
    years: 3,
    code: 'GF13',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*A*A',
        required: [['Mathematics', 'A*'], ['Further Mathematics', 'A*'], ['Physics', 'A']],
        notes:
          'Subjects: “A*A*A with A*A* in Mathematics and Further Mathematics and A in Physics.”',
      }),
      offer({
        label: 'Alternative offer with STEP or AEA',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Further Mathematics', 'A'], ['Physics', 'A']],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Further Mathematics'],
            'A*',
            1,
            'The A* must be in Mathematics or Further Mathematics, in any order.',
          ),
          manualReview(
            'This route also requires a 2 in any STEP Paper or a Distinction in the Mathematics AEA. This tool does not hold STEP or AEA results, so the route cannot be confirmed automatically.',
          ),
        ],
        notes:
          'Subjects: “or A*AA with A*A in Mathematics and Further Mathematics, in any order, and A in Physics, together with a 2 in any STEP Paper or a Distinction in the Mathematics AEA.”',
      }),
    ],
    fm: 'required',
    fmNote: 'Further Mathematics is a required subject on both published routes.',
    test: 'unknown',
    testNote:
      'No admissions-test section is published on this course page. The alternative offer route references a STEP paper or the Mathematics AEA as an offer condition rather than as an admissions test.',
    interview: 'not-stated',
    contextual: ctx(
      'A*AA',
      'A*AA with A*A in Mathematics and Further Mathematics, in any order, and A in Physics.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('mathematics-and-physics-bsc'),
    sourceUrl: U('mathematics-and-physics-bsc'),
    sourceTitle: 'Mathematics and Physics BSc | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `The standard offer is A*A*A — two A*s — which is a different string from the A*AA used across the rest of the UCL Physics family. ${DEADLINE_NOTE}`,
  }),

  /* 8. Physics with Medical Physics BSc (F351) — no per-subject minimum stated */
  course({
    slug: 'ucl-physics-with-medical-physics-bsc',
    universityId: 'ucl',
    name: 'Physics with Medical Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'BSc',
    years: 3,
    code: 'F351',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        // UCL states only that Maths and Physics are required and that the A*
        // must fall in one of them. No minimum grade is published for either
        // subject, so none is recorded.
        required: ['Mathematics', 'Physics'],
        recommended: ['Biology', 'Chemistry'],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics'],
            'A*',
            1,
            'The A* must be in one of the required subjects.',
          ),
        ],
        notes:
          'Subjects: “Mathematics and Physics required. A* must be in one of the required subjects. Biology and Chemistry preferred.”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'A in Mathematics and Physics required. Biology and Chemistry preferred.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('physics-medical-physics-bsc'),
    sourceUrl: U('physics-medical-physics-bsc'),
    sourceTitle: 'Physics with Medical Physics BSc | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `This course's subject wording differs from the rest of the UCL Physics family: it does not publish a minimum grade for Mathematics or Physics individually, only that the A* must be in one of them. No per-subject minimum has been inferred. ${DEADLINE_NOTE}`,
  }),

  /* 9. Medical Physics MSci (F350) */
  course({
    slug: 'ucl-medical-physics-msci',
    universityId: 'ucl',
    name: 'Medical Physics',
    category: 'physics',
    sub: 'physics',
    degree: 'MSci',
    years: 4,
    code: 'F350',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A'], ['Physics', 'A']],
        recommended: ['Chemistry', 'Biology'],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics'],
            'A*',
            1,
            'The A* must be in Mathematics or Physics — an A* in another subject does not satisfy this.',
          ),
        ],
        notes: 'Subjects: “A*A in Mathematics and Physics required (in any order). Preferred: Chemistry, Biology”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('AAB', 'A in Mathematics and Physics required. Biology and Chemistry preferred.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('medical-physics-msci'),
    sourceUrl: U('medical-physics-msci'),
    sourceTitle: 'Medical Physics MSci | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `The official title is "Medical Physics MSci", not "Physics with Medical Physics MSci" — the BSc (F351) and MSci (F350) in this family carry different titles and differently worded subject rules. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* ENGINEERING                                                      */
  /* ================================================================ */

  /* 10. Mechanical Engineering BEng (H300) — TARA, not ESAT */
  course({
    slug: 'ucl-mechanical-engineering-beng',
    universityId: 'ucl',
    name: 'Mechanical Engineering',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'BEng',
    years: 3,
    code: 'H300',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        required: ['Mathematics', 'Physics'],
        recommended: [
          'Design and Technology',
          'Engineering',
          'Economics',
          'Geography',
          'Chemistry',
          'Biology',
        ],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics'],
            'A*',
            1,
            'The A* must be in one of the required subjects.',
          ),
        ],
        notes:
          'Subjects: “Mathematics and Physics required. A* must be in one of the required subjects. Design and Technology, Engineering, Economics, Geography, Chemistry and Biology preferred as a third subject (in that order), but not essential.”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'tara',
    testRequirement: 'required',
    testUrl: U('mechanical-engineering-beng'),
    testNote:
      'UCL states: “For the 2027 cycle, alongside the UCAS application, UCL will require all applicants to the above programme to sit the TARA (The Test of Academic Reasoning for Admissions) run by University Admissions Tests UK.” No module breakdown is published for this test.',
    interview: 'not-stated',
    contextual: ctx(
      'A*AB',
      'Mathematics and Physics required. A* must be in one of the required subjects.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('mechanical-engineering-beng'),
    sourceUrl: U('mechanical-engineering-beng'),
    sourceTitle: 'Mechanical Engineering BEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `UCL Mechanical Engineering uses the TARA, not the ESAT — the admissions test must not be assumed from another UCL engineering course. ${DEADLINE_NOTE}`,
  }),

  /* 11. Mechanical Engineering MEng (H301) */
  course({
    slug: 'ucl-mechanical-engineering-meng',
    universityId: 'ucl',
    name: 'Mechanical Engineering',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H301',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        required: ['Mathematics', 'Physics'],
        recommended: [
          'Design and Technology',
          'Engineering',
          'Economics',
          'Geography',
          'Chemistry',
          'Biology',
        ],
        constraints: [
          atLeastAt(
            ['Mathematics', 'Physics'],
            'A*',
            1,
            'The A* must be in one of the required subjects.',
          ),
        ],
        notes:
          'Subjects: “Mathematics and Physics required. A* must be in one of the required subjects. Design and Technology, Engineering, Economics, Geography, Chemistry and Biology preferred as a third subject (in that order), but not essential.”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'tara',
    testRequirement: 'required',
    testUrl: U('mechanical-engineering-meng'),
    testNote:
      'UCL states: “For the 2027 cycle, alongside the UCAS application, UCL will require all applicants to the above programme to sit the TARA (The Test of Academic Reasoning for Admissions) run by University Admissions Tests UK.” No module breakdown is published for this test.',
    interview: 'not-stated',
    contextual: ctx(
      'A*AB',
      'Mathematics and Physics required. A* must be in one of the required subjects.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('mechanical-engineering-meng'),
    sourceUrl: U('mechanical-engineering-meng'),
    sourceTitle: 'Mechanical Engineering MEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `The published academic requirements match the BEng (H300); the award, duration and UCAS code differ. ${DEADLINE_NOTE}`,
  }),

  /* 12. Electronic and Electrical Engineering BEng (H600) — ESAT module CHOICE */
  course({
    slug: 'ucl-electronic-and-electrical-engineering-beng',
    universityId: 'ucl',
    name: 'Electronic and Electrical Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'BEng',
    years: 3,
    code: 'H600',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        // Only Mathematics is required. Physics and Further Mathematics are
        // PREFERRED as the second subject, not required — a materially
        // different rule from Imperial's electrical engineering courses.
        required: [['Mathematics', 'A*']],
        recommended: ['Physics', 'Further Mathematics'],
        notes:
          'Subjects: “A* in Mathematics required, plus either Physics or Further Mathematics preferred as the second subject. Where students have Further Mathematics but not Physics then it is preferable to have Biology, Chemistry, Design and Technology, or Electronics as the third subject.”',
      }),
    ],
    fm: 'recommended',
    fmNote:
      'Either Physics or Further Mathematics is preferred as the second subject. Neither is required.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1'],
    testModuleChoice: {
      chooseCount: 2,
      options: ['Physics', 'Mathematics 2', 'Chemistry', 'Biology'],
    },
    testModuleNote:
      'UCL states: “Applicants will be required to take Maths 1 and any two out of Physics, Maths 2, Chemistry and Biology paper from ESAT.” This is a choice, not the fixed three-module combination used by Imperial.',
    testDetails: 'There will be an entry fee for the test.',
    testUrl: U('electronic-and-electrical-engineering-beng'),
    interview: 'no',
    interviewNote: 'We do not hold further interviews.',
    contextual: ctx(
      'AAB',
      'Grade A in Mathematics required, plus either Physics or Further Mathematics preferred as the second subject.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('electronic-and-electrical-engineering-beng'),
    sourceUrl: U('electronic-and-electrical-engineering-beng'),
    sourceTitle: 'Electronic and Electrical Engineering BEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `UCL also states that this course does not accept resits. ${DEADLINE_NOTE}`,
  }),

  /* 13. Electronic and Electrical Engineering MEng (H601) */
  course({
    slug: 'ucl-electronic-and-electrical-engineering-meng',
    universityId: 'ucl',
    name: 'Electronic and Electrical Engineering',
    category: 'engineering',
    sub: 'electrical',
    degree: 'MEng',
    years: 4,
    code: 'H601',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A*']],
        recommended: ['Physics', 'Further Mathematics'],
        notes:
          'Subjects: “A* in Mathematics required, plus either Physics or Further Mathematics preferred as the second subject.”',
      }),
    ],
    fm: 'recommended',
    fmNote:
      'Either Physics or Further Mathematics is preferred as the second subject. Neither is required.',
    test: 'esat',
    testRequirement: 'required',
    testModules: ['Mathematics 1'],
    testModuleChoice: {
      chooseCount: 2,
      options: ['Physics', 'Mathematics 2', 'Chemistry', 'Biology'],
    },
    testModuleNote:
      'UCL states: “Applicants will be required to take Maths 1 and any two out of Physics, Maths 2, Chemistry and Biology paper from ESAT.” This is a choice, not the fixed three-module combination used by Imperial.',
    testDetails: 'There will be an entry fee for the test.',
    testUrl: U('electronic-and-electrical-engineering-meng'),
    interview: 'no',
    interviewNote: 'We do not hold further interviews.',
    contextual: ctx(
      'AAB',
      'Grade A in Mathematics required, plus either Physics or Further Mathematics preferred as the second subject.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('electronic-and-electrical-engineering-meng'),
    sourceUrl: U('electronic-and-electrical-engineering-meng'),
    sourceTitle: 'Electronic and Electrical Engineering MEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `UCL also states that this course does not accept resits. ${DEADLINE_NOTE}`,
  }),

  /* 14. Civil Engineering BEng (H200) — subject rule is at GCSE level */
  course({
    slug: 'ucl-civil-engineering-beng',
    universityId: 'ucl',
    name: 'Civil Engineering',
    category: 'engineering',
    sub: 'civil',
    degree: 'BEng',
    years: 3,
    code: 'H200',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        // UCL publishes no required A-Level subject for this course. Its
        // Mathematics/Physics condition sits at GCSE level and applies only
        // where the subject is not offered at A level.
        constraints: [
          manualReview(
            'UCL states: “At least two A level subjects should be taken from UCL’s list of preferred A level subjects.” The list is published separately and is not held here, so this condition is flagged for manual checking rather than evaluated.',
          ),
        ],
        notes:
          'No A-Level subject is published as required. UCL’s Mathematics and Physics condition is a GCSE-level one — see the GCSE requirements.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: 'The department does not interview or test candidates.',
    interview: 'no',
    interviewNote: 'The department does not interview or test candidates.',
    contextual: ctx('AAB', 'The same subject and GCSE conditions apply.'),
    gcse:
      'English Language at grade C or 4. Mathematics and Physics (or Double Award) at grade A or 7 if not offered at A level.',
    verification: 'verified',
    officialUrl: U('civil-engineering-beng'),
    sourceUrl: U('civil-engineering-beng'),
    sourceTitle: 'Civil Engineering BEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Unlike every other engineering course in this batch, UCL publishes no required A-Level subject for Civil Engineering — the Mathematics and Physics condition is at GCSE level and only bites where the subject is not taken at A level. No A-Level subject requirement has been invented to fill the gap. ${DEADLINE_NOTE}`,
  }),

  /* 15. Civil Engineering MEng (H202) */
  course({
    slug: 'ucl-civil-engineering-meng',
    universityId: 'ucl',
    name: 'Civil Engineering',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H202',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'A*AA',
        constraints: [
          manualReview(
            'UCL states: “At least two A level subjects should be taken from UCL’s list of preferred A level subjects.” The list is published separately and is not held here, so this condition is flagged for manual checking rather than evaluated.',
          ),
        ],
        notes:
          'No A-Level subject is published as required. UCL’s Mathematics and Physics condition is a GCSE-level one — see the GCSE requirements.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: 'The department does not interview or test candidates.',
    interview: 'no',
    interviewNote: 'The department does not interview or test candidates.',
    contextual: ctx('AAB', 'The same subject and GCSE conditions apply.'),
    gcse:
      'English Language at grade C or 4. Mathematics and Physics (or Double Award) at grade A or 7 if not offered at A level.',
    verification: 'verified',
    officialUrl: U('civil-engineering-meng'),
    sourceUrl: U('civil-engineering-meng'),
    sourceTitle: 'Civil Engineering MEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: DEADLINE_NOTE,
  }),

  /* 16. Chemical Engineering BEng (H800) — Chemistry required, Physics only preferred */
  course({
    slug: 'ucl-chemical-engineering-beng',
    universityId: 'ucl',
    name: 'Chemical Engineering',
    category: 'engineering',
    sub: 'chemical',
    degree: 'BEng',
    years: 3,
    code: 'H800',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'AAA',
        // Chemistry is required and Physics is NOT. A strong Maths/Further
        // Maths/Physics applicant without Chemistry does not meet this course.
        required: ['Mathematics', 'Chemistry'],
        recommended: ['Biology', 'Economics', 'Geography', 'Physics', 'Psychology'],
        notes:
          'Subjects: “Mathematics and Chemistry required. Biology, Economics, Geography, Physics and Psychology preferred.”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: 'The department does not interview or test candidates.',
    interview: 'no',
    interviewNote:
      'The department does not interview or test candidates. UK-based offer holders are typically invited to visit the department, providing an opportunity to explore the facilities and meet staff.',
    contextual: ctx(
      'ABB',
      'Mathematics at grade A required, plus B in Chemistry. Biology, Economics, Geography, Physics and Psychology preferred.',
    ),
    verification: 'verified',
    officialUrl: U('chemical-engineering-beng'),
    sourceUrl: U('chemical-engineering-beng'),
    sourceTitle: 'Chemical Engineering BEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Chemistry is required and Physics is only preferred — the opposite of most engineering courses in this catalogue. The standard offer is AAA with no A*. No GCSE requirement is published on this page. ${DEADLINE_NOTE}`,
  }),

  /* 17. Chemical Engineering MEng (H801) */
  course({
    slug: 'ucl-chemical-engineering-meng',
    universityId: 'ucl',
    name: 'Chemical Engineering',
    category: 'engineering',
    sub: 'chemical',
    degree: 'MEng',
    years: 4,
    code: 'H801',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'AAA',
        required: ['Mathematics', 'Chemistry'],
        recommended: ['Biology', 'Economics', 'Geography', 'Physics', 'Psychology'],
        notes:
          'Subjects: “Mathematics and Chemistry required. Biology, Economics, Geography, Physics and Psychology preferred.”',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'none',
    testRequirement: 'not-required',
    testNote: 'The department does not interview or test candidates.',
    interview: 'no',
    interviewNote: 'The department does not interview or test candidates.',
    contextual: ctx(
      'ABB',
      'Mathematics at grade A required, plus B in Chemistry. Biology, Economics, Geography, Physics and Psychology preferred.',
    ),
    verification: 'verified',
    officialUrl: U('chemical-engineering-meng'),
    sourceUrl: U('chemical-engineering-meng'),
    sourceTitle: 'Chemical Engineering MEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Chemistry is required and Physics is only preferred. The standard offer is AAA with no A*. No GCSE requirement is published on this page. ${DEADLINE_NOTE}`,
  }),
];
