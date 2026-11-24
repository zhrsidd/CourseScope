/**
 * ---------------------------------------------------------------------------
 *  BATCH 8 — MEDICINE: UNIVERSITY OF BRISTOL, MB ChB MEDICINE (A100)
 *  Read from the university's own pages on 2026-11-22. Research note:
 *  research/medicine-b8.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The page states "15 October" as the closing date without a year, so it is
 *  kept in the notes rather than entered as a dated deadline.
 */

import type { Course } from '@/types';
import { course, offer, oneOf } from './builders';

const READ_ON = '2026-11-22';
const URL = 'https://www.bristol.ac.uk/study/undergraduate/2027/medicine/mb-chb-medicine/';
const SECOND = ['Biology', 'Physics', 'Mathematics', 'Further Mathematics'];

export const batch8BristolMedicine: Course = course({
  slug: 'bristol-medicine-mbchb',
  universityId: 'bristol',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MB ChB',
  years: 5,
  code: 'A100',
  year: '2027',
  cycleNote: 'The page is headed “MB ChB Medicine (A100)” and “2027 entry”.',
  raw: 'AAA including Chemistry and either Biology, Physics, Mathematics or Further Mathematics.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'A', 'One of Biology, Physics, Mathematics or Further Mathematics.')],
      rawText: 'AAA including Chemistry and either Biology, Physics, Mathematics or Further Mathematics.',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'ABB',
      isContextual: true,
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'B', 'B in one of Biology, Physics, Mathematics or Further Mathematics.')],
      rawText: 'ABB including A in Chemistry and B in one of Biology, Physics, Mathematics or Further Mathematics',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is named only as one of the accepted second subjects; no preference is stated.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    'The combined score from all subtests except Situational Judgement is used to select for interview. For 2026 entry the final threshold to be invited to interview was 2240 for Home applicants and 2270 for Overseas applicants; Bristol says it “is subject to change year-on-year”.',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'yes',
  interviewNote: 'Applicants must be available for an interview from November to April after applying.',
  contextual: { availability: 'yes', details: 'ABB including A in Chemistry and B in one of Biology, Physics, Mathematics or Further Mathematics.' },
  gcse: 'GCSE Mathematics at grade 7 (A) or equivalent, and GCSE English at grade 4 (C) or equivalent.',
  english: 'If English is not your first language: IELTS 7.5 overall with 7.0 in all skills, GCSE English Language grade 6 (B), or an alternative at Bristol’s Profile level A.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'Bristol’s 2027-entry course page, read on 2026-11-22, prints “MB ChB Medicine (A100)” and “5 year(s) full-time”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'MB ChB Medicine | Study at Bristol | University of Bristol',
  lastVerified: READ_ON,
  notes:
    'AGE: applicants must be 18 or over on 1 September of the year they start. DEADLINE: “The closing date for Medicine UCAS applications is 15 October”; the page gives no year, so no dated deadline is recorded. GRADUATES: a 2:1 degree plus BBB at A-level including Chemistry and one of Biology, Physics, Mathematics or Further Mathematics. Bristol publishes a 2027 Medicine admissions statement with the full selection process.',
});
