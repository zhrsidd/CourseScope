/**
 * ---------------------------------------------------------------------------
 *  DENTISTRY, BATCH D1 — UNIVERSITY OF SHEFFIELD, DENTAL SURGERY BDS (A200)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/dentistry-d1.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const URL = 'https://www.sheffield.ac.uk/undergraduate/courses/2027/dental-surgery-bds';

export const dentD1Sheffield: Course = course({
  slug: 'sheffield-dental-surgery-bds',
  universityId: 'sheffield',
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
  cycleNote: 'Read at the 2027 course URL. The page notes the programme structure is changing for 2027 entry.',
  raw: 'AAA including Chemistry and Biology + pass in the practical element of any science A Levels taken. Human Biology is acceptable in lieu of Biology.',
  offers: [
    offer({ label: 'Standard offer', gradeProfile: 'AAA', required: [['Chemistry', 'A'], ['Biology', 'A']], alternatives: { Biology: ['Human Biology'] }, rawText: 'AAA including Chemistry and Biology' }),
    offer({ label: 'Access Sheffield offer', gradeProfile: 'AAB', isContextual: true, required: ['Chemistry', 'Biology'], alternatives: { Biology: ['Human Biology'] }, rawText: 'AAB including Chemistry and Biology' }),
  ],
  testDetails: 'All applicants must take the UCAT; it is used with Sheffield’s selection procedure.',
  interview: 'yes',
  interviewNote: 'Shortlisted applicants are interviewed as part of selection.',
  contextual: { availability: 'yes', details: 'Access Sheffield offer: AAB including Chemistry and Biology.' },
  gcse: 'Six GCSEs at grade 7 (A), including English, Maths and Science (Chemistry and Biology, or dual science).',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Dental Surgery BDS | Undergraduate study | The University of Sheffield',
  identityNote: 'Sheffield’s 2027 course page, read on 2026-11-24, gives “UCAS code: A200” and 5 years.',
  notes: 'EPQ ALTERNATIVE: AAB with AA in Chemistry and Biology plus B in the EPQ, same sitting, firm choice only (not checked against your grades). PROGRAMME CHANGE: Sheffield is restructuring the course for 2027 entry and working with the GDC to maintain accreditation.',
});
