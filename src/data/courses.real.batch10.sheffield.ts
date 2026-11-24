/**
 * ---------------------------------------------------------------------------
 *  BATCH 10 — MEDICINE: UNIVERSITY OF SHEFFIELD, MEDICINE MBChB (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  Further Mathematics is NOT counted towards the A-level threshold, so it is
 *  left out of the second-science list. The AAB + EPQ alternative depends on an
 *  EPQ grade the profile cannot hold, so it is in the notes, not a pathway.
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const URL = 'https://www.sheffield.ac.uk/undergraduate/courses/2027/medicine-mbchb';
const SCIENCES = ['Biology', 'Human Biology', 'Chemistry', 'Mathematics', 'Physics', 'Psychology'];

export const batch10SheffieldMedicine: Course = course({
  slug: 'sheffield-medicine-mbchb',
  universityId: 'sheffield',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  code: 'A100',
  year: '2027',
  verification: 'verified',
  identityVerification: 'official-page',
  lastVerified: '2026-11-24',
  test: 'ucat',
  testRequirement: 'required',
  testUrl: 'https://www.ucat.ac.uk/',
  awardLabel: 'MBChB',
  years: 5,
  cycleNote: 'The 2027 course page is headed “2027-28 entry” and gives a UCAT threshold “for 2027 entry”.',
  raw: 'AAA including Chemistry or Biology and a second science + pass in the practical element of any science A Levels taken. Second science subjects include Biology/Human Biology, Chemistry, Maths, Physics or Psychology. We do not accept A Level Further Maths when determining whether an applicant meets our A Level academic threshold.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      constraints: [
        oneOf(['Chemistry', 'Biology'], 'A', 'Chemistry or Biology.'),
        atLeastAt(SCIENCES, 'A', 2, 'A second science from Biology/Human Biology, Chemistry, Maths, Physics or Psychology (Further Maths does not count).'),
      ],
      rawText: 'AAA including Chemistry or Biology and a second science',
    }),
    offer({
      label: 'Contextual offer (Access Sheffield)',
      gradeProfile: 'AAB',
      isContextual: true,
      constraints: [
        oneOf(['Chemistry', 'Biology'], 'A', 'Chemistry or Biology at grade A.'),
        atLeastAt(SCIENCES, 'B', 2, 'A second science from Biology/Human Biology, Chemistry, Maths, Physics or Psychology.'),
      ],
      rawText: 'AAB including Chemistry or Biology (at grade A) and a second science',
    }),
  ],
  fm: 'not-required',
  fmNote: '“We do not accept A Level Further Maths when determining whether an applicant meets our A Level academic threshold.”',
  testDetails: '“Each year, we set a minimum UCAT score threshold, which is 1800/2700 for 2027 entry.” Applications are then ranked by UCAT score; the Situational Judgement Test is reviewed only for those invited to interview.',
  interview: 'yes',
  interviewNote: 'Multiple mini-interviews (MMIs).',
  contextual: { availability: 'yes', details: 'AAB including Chemistry or Biology at grade A and a second science, through Access Sheffield.' },
  gcse: 'Five GCSEs at grade 7 (A), with at least grade 6 (B) in Maths, English Language and the science subjects (Dual Award Science acceptable).',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine MBChB | Undergraduate study | The University of Sheffield',
  identityNote: 'Sheffield’s 2027 course page, read on 2026-11-24, gives “UCAS code A100” and 5 years.',
  notes: 'EPQ ALTERNATIVE: AAB including Chemistry or Biology at grade A and a second science, plus A in the EPQ taken in the same sitting, if Sheffield is your Firm choice. Not checked against your grades because the EPQ is not part of the profile. A pass in the practical element of any science A-level is required.',
});
