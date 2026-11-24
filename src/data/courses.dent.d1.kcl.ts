/**
 * ---------------------------------------------------------------------------
 *  DENTISTRY, BATCH D1 — KING’S COLLEGE LONDON, DENTISTRY BDS (A205)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/dentistry-d1.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  KCL prints A205 as this course's UCAS code, not the A200 most dental schools use.
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

export const dentD1Kcl: Course = course({
  slug: 'kcl-dentistry-bds',
  universityId: 'kcl',
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
  years: null,
  code: 'A205',
  cycleNote: 'Read from KCL’s course page and its entry-requirements page; neither carries a note that details apply to 2026 entry.',
  raw: 'Required subjects: A-level (or equivalent) grade A in Biology or Chemistry, in addition to grade A in one of Biology, Chemistry, Physics, Mathematics or Psychology. Required grades: A*AA.',
  offers: [
    offer({
      label: 'Required grades',
      gradeProfile: 'A*AA',
      constraints: [
        oneOf(['Biology', 'Chemistry'], 'A', 'Grade A in Biology or Chemistry.'),
        atLeastAt(['Biology', 'Chemistry', 'Physics', 'Mathematics', 'Psychology'], 'A', 2, 'Plus grade A in one of Biology, Chemistry, Physics, Mathematics or Psychology.'),
      ],
      rawText: 'A*AA. Must include grade A in Biology or Chemistry, in addition to grade A in one of Biology, Chemistry, Physics, Mathematics or Psychology.',
    }),
  ],
  testDetails: 'Applications are ranked on GCSE performance, UCAT score and contextual information before the rest of the application is reviewed.',
  interview: 'yes',
  interviewNote: 'The interview period generally runs from December to March.',
  contextual: { availability: 'no', details: '“Contextual requirements N/A.”' },
  gcse: 'English Language and Mathematics at grade 6 (B).',
  officialUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/dentistry-bds',
  sourceUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/dentistry-bds/entry-requirements',
  sourceTitle: 'Dentistry - Entry Requirements - Dentistry BDS | King’s College London',
  identityNote: 'KCL’s course page, read on 2026-11-24, gives “UCAS code: A205” and “Required A-Levels: A*AA”. The duration was not captured, so none is recorded.',
  notes: 'UCAS CODE: A205 is read from the course page’s printed UCAS code field.',
});
