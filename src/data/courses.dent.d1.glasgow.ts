/**
 * ---------------------------------------------------------------------------
 *  DENTISTRY, BATCH D1 — UNIVERSITY OF GLASGOW, DENTISTRY BDS (A200)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/dentistry-d1.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const URL = 'https://www.gla.ac.uk/undergraduate/degrees/dentistry/';

export const dentD1Glasgow: Course = course({
  slug: 'glasgow-dentistry-bds',
  universityId: 'glasgow',
  name: 'Dentistry',
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
  cycleNote: 'The page is in Glasgow’s “2027 Degree programmes A‑Z”.',
  raw: 'A-level standard entry requirements: AAA. Additional requirements: Chemistry and Biology at grade A. 6 GCSE subjects at Grade A/7. Maths/Physics and English language/literature (English accepted at grade B/6 provided all other GCSEs are attained at grade A/7). UCAT. Interview.',
  offers: [
    offer({ label: 'A-level standard entry requirements', gradeProfile: 'AAA', required: [['Chemistry', 'A'], ['Biology', 'A']], rawText: 'AAA. Chemistry and Biology at grade A.' }),
  ],
  testDetails: 'UCAT is required.',
  interview: 'yes',
  interviewNote: 'Selected applicants are invited to interview in late January or early February.',
  contextual: { availability: 'unknown', details: 'Adjusted requirements are printed for Scottish Highers only (Access Glasgow, Reach). No adjusted A-level offer is published on this page.' },
  gcse: 'Six GCSEs at grade A/7, including Maths or Physics and English Language or Literature (English accepted at B/6 if all other GCSEs are A/7).',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'University of Glasgow - Undergraduate study - 2027 Degree programmes A‑Z - Dentistry',
  identityNote: 'Glasgow’s 2027 degree page, read on 2026-11-24, lists “Dentistry BDS: A200 5 year degree”.',
  notes: 'DEADLINE: “The deadlines for applications to Medicine, Vet Medicine and Dentistry is 15 October” (no year printed). Limit UCAS choices to four dental schools.',
});
