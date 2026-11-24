/**
 * ---------------------------------------------------------------------------
 *  BATCH 11 — MEDICINE: QUEEN MARY UNIVERSITY OF LONDON, MEDICINE MBBS (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The course page does not mention an interview, so none is recorded.
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const URL = 'https://www.qmul.ac.uk/undergraduate/coursefinder/courses/2027/medicine-5-year-programme/';

export const batch11QmulMedicine: Course = course({
  slug: 'qmul-medicine-mbbs',
  universityId: 'qmul',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  code: 'A100',
  year: '2027',
  verification: 'verified',
  identityVerification: 'official-page',
  lastVerified: '2026-11-24',
  fm: 'no-stated-preference',
  test: 'ucat',
  testRequirement: 'required',
  testUrl: 'https://www.ucat.ac.uk/',
  name: 'Medicine (5 Year Programme)',
  awardLabel: 'MBBS',
  years: 5,
  cycleNote: 'The page gives “Entry Year: 2027” and “Start September 2027”.',
  raw: 'A*AA (results must be achieved in one sitting over a study period of no longer than two years). Must include Biology or Chemistry, and a second science (Chemistry, Biology, Physics or Mathematics).',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'A*AA',
      constraints: [
        oneOf(['Biology', 'Chemistry'], 'A', 'Biology or Chemistry.'),
        atLeastAt(['Chemistry', 'Biology', 'Physics', 'Mathematics'], 'A', 2, 'A second science: Chemistry, Biology, Physics or Mathematics.'),
      ],
      rawText: 'A*AA. Must include Biology or Chemistry, and a second science (Chemistry, Biology, Physics or Mathematics)',
    }),
    offer({
      label: 'Standard contextual offer',
      gradeProfile: 'AAA',
      isContextual: true,
      constraints: [
        oneOf(['Biology', 'Chemistry'], 'A', 'Biology or Chemistry.'),
        atLeastAt(['Chemistry', 'Biology', 'Physics', 'Mathematics'], 'A', 2, 'A second science: Chemistry, Biology, Physics or Mathematics.'),
      ],
      rawText: 'Our standard contextual offer: AAA. Must include Biology or Chemistry, and a second science (Chemistry, Biology, Physics or Mathematics)',
    }),
  ],
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: 'UCAT “Fourth decile or above, SJT Bands 1- 3.”',
  interview: 'not-stated',
  interviewNote: 'The course page does not describe an interview.',
  contextual: { availability: 'yes', details: 'AAA with the same subject rule, for applicants who meet Queen Mary’s contextualised admissions criteria.' },
  gcse: 'Six GCSEs at 777666 (AAABBB), including Biology, Chemistry, English Language or English Literature, and Mathematics. Science Double Award may substitute all sciences.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine (5 Year Programme) - Queen Mary University of London',
  identityNote: 'Queen Mary’s 2027 course page, read on 2026-11-24, gives “Degree MBBS”, “Duration 5 years” and “UCAS code A100”.',
  notes: 'ONE SITTING: results must be achieved in one sitting over no more than two years. AGE: 18 or over by mid-September of entry; younger applicants can apply for deferred entry. DEADLINE: “UCAS application deadline: 15 October” (no year printed).',
});
