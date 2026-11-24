/**
 * ---------------------------------------------------------------------------
 *  DENTISTRY, BATCH D1 — UNIVERSITY OF LIVERPOOL, DENTAL SURGERY BDS (A200)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/dentistry-d1.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const URL = 'https://www.liverpool.ac.uk/courses/dental-surgery-bds';

export const dentD1Liverpool: Course = course({
  slug: 'liverpool-dental-surgery-bds',
  universityId: 'liverpool',
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
  cycleNote: 'The page shows a 2027 start and “15 October 2026” as the application date.',
  raw: 'AAA including Chemistry and Biology, taken at first sitting, after two years of study. We do not accept A level resits or consider applicants who have retaken either Year 12 or Year 13. A level Chemistry and Biology are required. The 3rd subject may be from the Arts or Sciences.',
  offers: [
    offer({ label: 'Standard offer', gradeProfile: 'AAA', required: [['Chemistry', 'A'], ['Biology', 'A']], rawText: 'AAA including Chemistry and Biology, taken at first sitting, after two years of study.' }),
  ],
  testDetails: 'All applicants sit the UCAT in the year of application.',
  interview: 'not-stated',
  interviewNote: 'The course page does not describe an interview.',
  contextual: { availability: 'yes', details: 'Eligible applicants may automatically qualify for up to a two-grade reduction; no specific reduced offer is printed.' },
  gcse: 'GCSE requirements apply; the course page refers to the School of Dentistry’s admissions information for the detail.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Dental Surgery BDS | Courses | University of Liverpool',
  identityNote: 'Liverpool’s course page, read on 2026-11-24, gives “UCAS code A200” and “5 years”.',
  notes: 'NO RESITS: A-level resits are not accepted, nor applicants who retook Year 12 or Year 13. General Studies, Critical Thinking and vocational/applied A-levels are not accepted. A pass in the science practical is required.',
});
