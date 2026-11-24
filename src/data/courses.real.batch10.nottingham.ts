/**
 * ---------------------------------------------------------------------------
 *  BATCH 10 — MEDICINE: UNIVERSITY OF NOTTINGHAM, MEDICINE BMBS (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer } from './builders';

const URL = 'https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/2027/Medicine-BMBS.html';

export const batch10NottinghamMedicine: Course = course({
  slug: 'nottingham-medicine-bmbs',
  universityId: 'nottingham',
  name: 'Medicine',
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
  awardLabel: 'BMBS',
  years: 5,
  cycleNote: '“The entrance requirements listed apply to 2027 entry.” The 2027 URL is served at an undated address.',
  raw: 'AAA: must include biology (or human biology) and chemistry. A pass is required in science practical tests, where these are assessed separately.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      required: [['Biology', 'A'], ['Chemistry', 'A']],
      alternatives: { Biology: ['Human Biology'] },
      rawText: 'AAA: must include biology (or human biology) and chemistry.',
    }),
    offer({
      label: 'Standard contextual offer',
      gradeProfile: 'AAB',
      isContextual: true,
      required: ['Biology', 'Chemistry'],
      alternatives: { Biology: ['Human Biology'] },
      constraints: [atLeastAt(['Biology', 'Human Biology', 'Chemistry'], 'A', 1, 'At least one A in Biology or Chemistry.')],
      rawText: 'Standard Contextual Offer: AAB with at least one A in biology or chemistry',
    }),
  ],
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: 'Sit the UCAT in the same year as the application. “Applicants who achieve a UCAT SJT grade of Band 4 will not be considered for this course.”',
  interview: 'yes',
  interviewNote: 'All applicants must attend an interview before an offer: in person for Home applicants, online for international applicants, between 15 December 2026 and 29 January 2027.',
  contextual: {
    availability: 'yes',
    details: 'For Home applicants meeting Nottingham’s contextual criteria: Standard Contextual Offer AAB, or Enhanced Contextual Offer ABB, each with at least one A in Biology or Chemistry.',
  },
  gcse: 'At least six GCSEs at grade 7 (A), including Biology and Chemistry, with at least grade 6 (B) in Maths and English Language, achieved in one sitting.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine BMBS (Hons) | University of Nottingham',
  identityNote: 'Nottingham’s course page, read on 2026-11-24, gives “UCAS Code A100” and “5 years full-time”.',
  notes: 'A-LEVELS IN ONE SITTING over at most two years; resits of up to two A-levels are considered only with at least ABB (one A in Biology or Chemistry) at first sitting. Predicted grades are not used for selection; offers are conditional on the grades. Personal statement and reference are reviewed only after interview. Occupational health assessment and a new DBS check are required. DEADLINE: “apply via UCAS by 15 October” (no year printed). Deferral requests by 1 May.',
});
