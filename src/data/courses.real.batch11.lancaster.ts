/**
 * ---------------------------------------------------------------------------
 *  BATCH 11 — MEDICINE: LANCASTER UNIVERSITY, MEDICINE AND SURGERY MBChB (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer } from './builders';

const URL = 'https://www.lancaster.ac.uk/study/undergraduate/courses/medicine-and-surgery-mbchb-a100/2027/';

export const batch11LancasterMedicine: Course = course({
  slug: 'lancaster-medicine-mbchb',
  universityId: 'lancaster',
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
  name: 'Medicine and Surgery',
  awardLabel: 'MBChB',
  years: 5,
  cycleNote: 'Read at the 2027 course URL.',
  raw: 'AAA. This should include three subjects taken at one sitting, after two years of study, including any two of Biology, Chemistry and Psychology.',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'AAA',
      constraints: [atLeastAt(['Biology', 'Chemistry', 'Psychology'], 'A', 2, 'Any two of Biology, Chemistry and Psychology.')],
      rawText: 'AAA ... including any two of Biology, Chemistry and Psychology.',
    }),
  ],
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: '“All applicants must take the University Clinical Aptitude Test (UCAT) to be eligible for consideration at Lancaster Medical School.”',
  interview: 'yes',
  interviewNote: '“No applicant will be offered a place without being interviewed in person.” Multiple mini interview format.',
  contextual: { availability: 'unknown', details: 'The page links to Lancaster’s general contextual admissions scheme; no reduced offer is printed for this course.' },
  gcse: 'At least 13 points from 8 GCSEs (A/A*/7-9 = 2 points; B/6 = 1 point), including double award Combined Science or Biology, Chemistry and Physics, plus Maths and English Language at grade 6 (B) or above. Biology or Chemistry not taken at A-level must be at least grade 7 (A) at GCSE.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine and Surgery MBChB (A100) - Lancaster University',
  identityNote: 'Lancaster’s 2027 course page, read on 2026-11-24, gives “UCAS code A100” and “Full time 5 years”.',
  notes: 'ONE SITTING: the three A-levels must be taken at one sitting after two years of study.',
});
