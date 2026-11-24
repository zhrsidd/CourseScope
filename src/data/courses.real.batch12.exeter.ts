/**
 * ---------------------------------------------------------------------------
 *  BATCH 12 — MEDICINE: UNIVERSITY OF EXETER, BMBS MEDICINE (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b12.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const URL = 'https://www.exeter.ac.uk/undergraduate-degrees/bmbs-medicine/';

export const batch12ExeterMedicine: Course = course({
  slug: 'exeter-medicine-bmbs',
  universityId: 'exeter',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'BMBS',
  years: 5,
  code: 'A100',
  year: '2027',
  cycleNote: 'The page gives “Entry year 2027” and “Entry requirements for 2027 entry (typical offer)”.',
  raw: 'A-Level: A*AA. A in Chemistry and A in Biology. Contextual Offer A-Level: AAB. Specific subject requirements must still be achieved where stated above.',
  typicalOffer: 'A*AA',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'A*AA',
      required: [['Chemistry', 'A'], ['Biology', 'A']],
      rawText: 'A*AA. A in Chemistry and A in Biology.',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'AAB',
      isContextual: true,
      required: [['Chemistry', 'A'], ['Biology', 'A']],
      rawText: 'A-Level: AAB. Specific subject requirements must still be achieved where stated above.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is not mentioned.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails: 'A-level applicants must sit the UCAT. Applications are sorted by academic profile and overall UCAT score to decide who is offered an interview. (Graduates may take GAMSAT instead.)',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'yes',
  interviewNote: 'Multiple Mini Interview (MMI), in person or online, between December and March.',
  contextual: { availability: 'yes', details: 'AAB, still with A in Chemistry and A in Biology.' },
  gcse: 'English Language at grade 6 (B).',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote: 'Exeter’s course page, read on 2026-11-24, gives “UCAS code A100”, “Duration 5 years” and “Entry year 2027”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'BMBS Medicine | 5-Year Medical Degree | University of Exeter',
  lastVerified: '2026-11-24',
  notes: 'General Studies is not included in any offer. T-Levels are not accepted. BTEC Extended Diploma applicants also need A-level Biology and Chemistry at grade A. DEADLINE: “The deadline for applications to UCAS is 15 October” (no year printed). Offers are made by the end of March. Successful applicants complete a health questionnaire and occupational health screening.',
});
