/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 3, PART B: UNIVERSITY COLLEGE LONDON
 *  2027 entry. Read from UCL's own course pages on 2026-09-02.
 * ---------------------------------------------------------------------------
 *  Four records: Biochemical Engineering and Biomedical Engineering, each at
 *  BEng and MEng. Neither shares Chemical Engineering's or Mechanical
 *  Engineering's rules, and both were read from their own pages:
 *
 *   • Biochemical Engineering asks for AAA with "Mathematics plus one from
 *     Biology, Chemistry or Physics" — a three-way choice, not Chemical
 *     Engineering's fixed Mathematics + Chemistry.
 *   • Biomedical Engineering asks for A*AA with "A*A in Mathematics and Physics
 *     required (in any order)" AND publishes a conditional substitution:
 *     Biology is acceptable in lieu of Physics if Physics was achieved at
 *     grade A/7 at GCSE. That condition depends on a GCSE grade this tool does
 *     not hold, so it is modelled as a second pathway that returns "review
 *     required" rather than a pass or a fail.
 *
 *  Two courses investigated for this batch are deliberately NOT here:
 *  Robotics and Artificial Intelligence MEng (UCL's own page states it "is run
 *  by Computer Science") and Engineering and Architecture MEngArch (run by The
 *  Bartlett School of Architecture, in the Faculty of the Built Environment).
 *  Both are reported for a manual decision rather than forced into the
 *  engineering catalogue. See the batch 3 report.
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { atLeastAt, course, manualReview, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-02';

const CYCLE =
  'Published requirements for 2027 entry. This is not confirmed 2028 direct-entry data. The official page gives a start date of September 2027.';

const U = (slug: string) =>
  `https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/${slug}`;

const GCSE_STANDARD = 'English Language and Mathematics at grade C or 4.';

const DEADLINE_NOTE = 'Application deadline: 13 January 2027. Applications close at 6pm UK time.';

const ctx = (grades: string, subjects: string) => ({
  availability: 'yes' as const,
  details: `${grades} — ${subjects} Contextual eligibility is assessed separately by UCL against its own published criteria; meeting these grades does not by itself make an applicant eligible.`,
});

const BIOCHEM_SUBJECTS = 'Subjects: “Mathematics plus one from Biology, Chemistry or Physics”';

const BIOMED_SUBJECTS =
  'Subjects: “A*A in Mathematics and Physics required (in any order). Biology acceptable in lieu of Physics, if Physics grade A or 7 achieved at GCSE. Biology, Chemistry, Computer Science, and Engineering preferred as a third subject (in that order), but not essential.”';

/**
 * The two published Biomedical Engineering routes.
 *
 * UCL allows Biology instead of Physics, but only for applicants who achieved
 * grade A/7 in GCSE Physics. This tool holds A-Level grades, not that GCSE
 * condition, so the substitution route deliberately resolves to "review
 * required": an applicant offering Biology is neither told they qualify nor
 * told they do not.
 */
function biomedicalOffers() {
  return [
    offer({
      label: 'Standard offer',
      gradeProfile: 'A*AA',
      required: [['Mathematics', 'A'], ['Physics', 'A']],
      recommended: ['Biology', 'Chemistry', 'Computer Science', 'Engineering'],
      constraints: [
        atLeastAt(
          ['Mathematics', 'Physics'],
          'A*',
          1,
          'The A* must be in Mathematics or Physics — an A* in another subject does not satisfy this.',
        ),
      ],
      notes: BIOMED_SUBJECTS,
    }),
    offer({
      label: 'Biology in lieu of Physics',
      gradeProfile: 'A*AA',
      required: [['Mathematics', 'A'], ['Biology', 'A']],
      appliesOnlyIfTaking: ['Biology'],
      constraints: [
        atLeastAt(
          ['Mathematics', 'Biology'],
          'A*',
          1,
          'The A* must be in Mathematics or the science subject offered.',
        ),
        manualReview(
          'UCL accepts Biology in lieu of Physics only if grade A or 7 was achieved in GCSE Physics. This tool does not hold GCSE Physics grades, so this route cannot be confirmed automatically — check it against the official page.',
        ),
      ],
      notes:
        'Published substitution route: “Biology acceptable in lieu of Physics, if Physics grade A or 7 achieved at GCSE.”',
    }),
  ];
}

export const batch3UclCourses: Course[] = [
  /* ================================================================ */
  /* 1. Biochemical Engineering BEng (H811)                           */
  /* ================================================================ */
  course({
    slug: 'ucl-biochemical-engineering-beng',
    universityId: 'ucl',
    name: 'Biochemical Engineering',
    category: 'engineering',
    sub: 'biochemical',
    degree: 'BEng',
    years: 3,
    code: 'H811',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'AAA',
        // Mathematics is required; the science is a three-way choice. This is
        // NOT UCL Chemical Engineering's Mathematics + Chemistry rule.
        required: ['Mathematics'],
        constraints: [
          oneOf(
            ['Biology', 'Chemistry', 'Physics'],
            null,
            'One from Biology, Chemistry or Physics.',
          ),
        ],
        notes: BIOCHEM_SUBJECTS,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('ABB', 'A in Mathematics, B in one of Biology, Physics, or Chemistry.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('biochemical-engineering-beng'),
    sourceUrl: U('biochemical-engineering-beng'),
    sourceTitle: 'Biochemical Engineering BEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Run by the Department of Biochemical Engineering, Faculty of Engineering Sciences. The offer is AAA with no A*, and any one of Biology, Chemistry or Physics satisfies the science condition — Chemistry is not uniquely required as it is for UCL Chemical Engineering. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 2. Biochemical Engineering MEng (H813)                           */
  /* ================================================================ */
  course({
    slug: 'ucl-biochemical-engineering-meng',
    universityId: 'ucl',
    name: 'Biochemical Engineering',
    category: 'engineering',
    sub: 'biochemical',
    degree: 'MEng',
    years: 4,
    code: 'H813',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard offer',
        gradeProfile: 'AAA',
        required: ['Mathematics'],
        constraints: [
          oneOf(
            ['Biology', 'Chemistry', 'Physics'],
            null,
            'One from Biology, Chemistry or Physics.',
          ),
        ],
        notes: BIOCHEM_SUBJECTS,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx('ABB', 'A in Mathematics, B in one of Biology, Physics, or Chemistry.'),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('biochemical-engineering-meng'),
    sourceUrl: U('biochemical-engineering-meng'),
    sourceTitle: 'Biochemical Engineering MEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Published entry requirements match the BEng (H811); the award, duration and UCAS code differ. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 3. Biomedical Engineering BEng (HC60)                            */
  /* ================================================================ */
  course({
    slug: 'ucl-biomedical-engineering-beng',
    universityId: 'ucl',
    name: 'Biomedical Engineering',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'BEng',
    years: 3,
    code: 'HC60',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: biomedicalOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    interviewNote:
      'No admissions interview is published. The page mentions an interview only in relation to securing an optional year-in-industry placement with a company.',
    contextual: ctx(
      'AAB',
      'A in Mathematics, B in Physics. Biology acceptable in lieu of Physics, if Physics grade A or 7 achieved at GCSE. Biology, Chemistry, Computer Science, and Engineering preferred as a third subject (in that order), but not essential.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('biomedical-engineering-beng'),
    sourceUrl: U('biomedical-engineering-beng'),
    sourceTitle: 'Biomedical Engineering BEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Run by the Department of Medical Physics and Biomedical Engineering. The Biology-in-lieu-of-Physics route depends on a GCSE Physics grade this tool does not hold, so an applicant offering Biology instead of Physics is returned for review rather than passed or failed. ${DEADLINE_NOTE}`,
  }),

  /* ================================================================ */
  /* 4. Biomedical Engineering MEng (H160)                            */
  /* ================================================================ */
  course({
    slug: 'ucl-biomedical-engineering-meng',
    universityId: 'ucl',
    name: 'Biomedical Engineering',
    category: 'engineering',
    sub: 'biomedical',
    degree: 'MEng',
    years: 4,
    code: 'H160',
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: biomedicalOffers(),
    fm: 'no-stated-preference',
    fmNote: 'Further Mathematics is not mentioned on this course page.',
    test: 'unknown',
    testNote: 'The course page does not state an admissions-test requirement.',
    interview: 'not-stated',
    contextual: ctx(
      'AAB',
      'A in Mathematics, B in Physics. Biology acceptable in lieu of Physics, if Physics grade A or 7 achieved at GCSE. Biology, Chemistry, Computer Science, and Engineering preferred as a third subject (in that order), but not essential.',
    ),
    gcse: GCSE_STANDARD,
    verification: 'verified',
    officialUrl: U('biomedical-engineering-meng'),
    sourceUrl: U('biomedical-engineering-meng'),
    sourceTitle: 'Biomedical Engineering MEng | Study at UCL',
    lastVerified: VERIFIED_ON,
    notes: `Published entry requirements match the BEng (HC60); the award, duration and UCAS code differ. UCL's UCAS code for this course (H160) is the same string Imperial uses for Molecular Bioengineering — course identity is scoped per university, so the two never collide. ${DEADLINE_NOTE}`,
  }),
];
