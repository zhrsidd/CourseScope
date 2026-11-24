/**
 * ---------------------------------------------------------------------------
 *  BATCH 12 — MEDICINE: UNIVERSITY OF LIVERPOOL, MEDICINE AND SURGERY MBChB (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b12.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  Two published grade routes: AAA, or A*AB with the A* and A in Chemistry and
 *  one of Biology, Physics or Mathematics. "A third academic subject" is not
 *  defined on the page, so it is not enforced.
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const URL = 'https://www.liverpool.ac.uk/courses/medicine-and-surgery-mbchb';
const SECOND = ['Biology', 'Physics', 'Mathematics'];

export const batch12LiverpoolMedicine: Course = course({
  slug: 'liverpool-medicine-mbchb',
  universityId: 'liverpool',
  name: 'Medicine and Surgery',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MBChB',
  years: 5,
  code: 'A100',
  year: '2027',
  cycleNote: 'The page gives a September 2027 start and “Apply by: 15 October 2026”.',
  raw: 'AAA to include Chemistry together with either Biology, Physics or Mathematics and a third academic subject. Alternatively A*AB also accepted but the A* A grades must include Chemistry together with either Biology, Physics or Maths; and a B grade required in the third academic subject.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'A', 'Biology, Physics or Mathematics.')],
      rawText: 'AAA to include Chemistry together with either Biology, Physics or Mathematics and a third academic subject.',
    }),
    offer({
      label: 'Alternative grades (A*AB)',
      gradeProfile: 'A*AB',
      required: [['Chemistry', 'A']],
      constraints: [
        oneOf(SECOND, 'A', 'Biology, Physics or Mathematics at grade A or above.'),
        atLeastAt(['Chemistry', ...SECOND], 'A*', 1, 'The A* must be in Chemistry or in the Biology, Physics or Mathematics subject.'),
      ],
      rawText: 'Alternatively A*AB also accepted but the A* A grades must include Chemistry together with either Biology, Physics or Maths; and a B grade required in the third academic subject.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is not mentioned.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails: '“Non-graduate applicants applying to the A100 programme must sit the UCAT admissions test.” Graduates applying to A100 currently take GAMSAT instead.',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'not-stated',
  interviewNote: 'The course page does not describe an interview.',
  contextual: { availability: 'unknown', details: 'The page says “Alternative offer conditions may apply” but prints no reduced offer.' },
  gcse: 'Nine GCSEs by the end of Year 11, including English Language, Maths, Biology and Chemistry (or combined or triple science) at grade 6 (B) or above, and at least 15 points from the best nine (A*/A/7-9 = 2 points; B/6 = 1 point).',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote: 'Liverpool’s course page, read on 2026-11-24, gives “UCAS code A100”, “5 years” and a September 2027 start.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine and Surgery MBChB | Courses | University of Liverpool',
  lastVerified: '2026-11-24',
  notes: 'ONE SITTING: three A-levels taken at one sitting, usually after two years of study. The third subject must be “academic”; the page does not define the term. T levels and BTEC National Extended Diploma are not accepted in place of A-levels.',
});
