/**
 * ---------------------------------------------------------------------------
 *  DENTISTRY, BATCH D1 — UNIVERSITY OF BIRMINGHAM, DENTAL SURGERY BDS (A200)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/dentistry-d1.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const URL = 'https://www.birmingham.ac.uk/study/undergraduate/subjects/dentistry-courses/dental-surgery-bds';

export const dentD1Birmingham: Course = course({
  slug: 'birmingham-dental-surgery-bds',
  universityId: 'birmingham',
  name: 'Dental Surgery',
  category: 'dentistry',
  sub: 'dentistry',
  degree: 'BDS',
  year: '2027',
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is not mentioned as a preference.',
  test: 'ucat',
  testRequirement: 'required',
  testUrl: 'https://www.ucat.ac.uk/',
  verification: 'verified',
  identityVerification: 'official-page',
  lastVerified: '2026-11-24',
  awardLabel: 'BDS',
  years: 5,
  code: 'A200',
  cycleNote: 'The page gives “Start date September 2027” and a 15 October 2026 application deadline.',
  raw: 'AAA to include Chemistry and Biology.',
  offers: [
    offer({ label: 'Standard offer', gradeProfile: 'AAA', required: [['Chemistry', 'A'], ['Biology', 'A']], rawText: 'AAA to include Chemistry and Biology' }),
    offer({ label: 'Contextual offer', gradeProfile: 'AAB', isContextual: true, required: ['Chemistry', 'Biology'], rawText: 'AAB to include Chemistry and Biology' }),
  ],
  testDetails: 'Sit the UCAT in the year of application.',
  interview: 'yes',
  interviewNote: '“Attend interview if invited.”',
  contextual: { availability: 'yes', details: 'Contextual offer AAB, or ABB through Pathways to Birmingham, each including Chemistry and Biology.' },
  gcse: 'GCSE Biology and Chemistry at A*/8, and Mathematics and English Language or Literature at A/7. GCSE resits are not considered.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Dental Surgery BDS - University of Birmingham',
  identityNote: 'Birmingham’s course page, read on 2026-11-24, gives “UCAS code A200” and “Duration 5 years”.',
  notes: 'AGE: 18 by 1 October of the year of entry. DEADLINE: 15 October 2026 for September 2027 entry.',
});
