/**
 * ---------------------------------------------------------------------------
 *  DENTISTRY, BATCH D1 — UNIVERSITY OF BRISTOL, BDS DENTISTRY (A206)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/dentistry-d1.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';
import { course, offer, oneOf } from './builders';

const URL = 'https://www.bristol.ac.uk/study/undergraduate/2027/dentistry/bds-dentistry/';
const SECOND = ['Biology', 'Physics', 'Mathematics', 'Further Mathematics'];

export const dentD1Bristol: Course = course({
  slug: 'bristol-dentistry-bds',
  universityId: 'bristol',
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
  code: 'A206',
  cycleNote: 'The page is headed “2027 entry”.',
  raw: 'AAA including Chemistry and one of Biology, Physics, Mathematics or Further Mathematics.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'A', 'One of Biology, Physics, Mathematics or Further Mathematics.')],
      rawText: 'AAA including Chemistry and one of Biology, Physics, Mathematics or Further Mathematics.',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'ABB',
      isContextual: true,
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'B', 'B in one of Biology, Physics, Mathematics or Further Mathematics.')],
      rawText: 'ABB including A in Chemistry and B in one of Biology, Physics, Mathematics or Further Mathematics.',
    }),
  ],
  testDetails: 'The combined score from all subtests except Situational Judgement selects for interview. For 2026 entry the final threshold was 2340 for Home and 1970 for Overseas applicants; Bristol says it changes year to year.',
  interview: 'yes',
  interviewNote: 'Applicants must be available for interview from November to April.',
  contextual: { availability: 'yes', details: 'ABB including A in Chemistry and B in one of Biology, Physics, Mathematics or Further Mathematics.' },
  gcse: 'GCSE Mathematics at 7 (A) and GCSE English at 4 (C), or equivalent.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'BDS Dentistry | Study at Bristol | University of Bristol',
  identityNote: 'Bristol’s 2027 course page, read on 2026-11-24, gives “UCAS (Code: A206)” and “5 year(s) full-time”.',
  notes: 'Graduates need a 2:1 degree plus BBB at A-level including Chemistry and one of Biology, Physics, Mathematics or Further Mathematics.',
});
