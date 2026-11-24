/**
 * ---------------------------------------------------------------------------
 *  BATCH 10 — MEDICINE: UNIVERSITY OF BIRMINGHAM, MEDICINE AND SURGERY MBChB (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer, oneOf } from './builders';

const URL = 'https://www.birmingham.ac.uk/study/undergraduate/subjects/medicine-courses/medicine-and-surgery-mbchb';
const SECOND = ['Biology', 'Human Biology', 'Physics', 'Mathematics'];

export const batch10BirminghamMedicine: Course = course({
  slug: 'birmingham-medicine-mbchb',
  universityId: 'birmingham',
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
  cycleNote: 'The page gives “Start date September 2027” and “15 October 2026 Application deadline for September 2027 entry.”',
  raw: 'AAA with predicted AAB including Chemistry, and a second science from Biology/Human Biology, Physics or Maths. A levels must include Chemistry and a second science from Biology/Human Biology, Physics or Maths. You must be predicted a minimum of AAB.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'A', 'A second science from Biology/Human Biology, Physics or Maths.')],
      rawText: 'AAA with predicted AAB including Chemistry, and a second science from Biology/Human Biology, Physics or Maths',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'AAB',
      isContextual: true,
      required: ['Chemistry'],
      constraints: [oneOf(SECOND, null, 'A second science from Biology/Human Biology, Physics or Maths.')],
      rawText: 'AAB to include Chemistry and a second science from Biology/Human Biology, Physics or Maths.',
    }),
  ],
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: 'Sit the UCAT in the year of application.',
  interview: 'yes',
  interviewNote: '“Attend interview if invited.”',
  contextual: {
    availability: 'yes',
    details: 'Contextual offer AAB (one grade lower), applied automatically if eligible. Students who complete Pathways to Birmingham receive an alternative offer of ABB. Both keep the Chemistry and second-science rule.',
  },
  gcse: 'English Language, Mathematics, and Biology and Chemistry (or dual award science), each at grade 6 (B) or higher.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine and Surgery MBChB - University of Birmingham',
  identityNote: 'Birmingham’s course page, read on 2026-11-24, gives “UCAS code A100”, “Duration 5 years” and the award “Bachelor of Medicine, Bachelor of Surgery”.',
  notes: 'PREDICTED GRADES: you must be predicted at least AAB. EXCLUDED: General Studies, Critical Thinking and EPQ are not accepted as a third A-level. Practical elements in the sciences must normally be passed. AGE: 18 by 1 October of the year of entry.',
});
