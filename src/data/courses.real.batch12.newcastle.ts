/**
 * ---------------------------------------------------------------------------
 *  BATCH 12 — MEDICINE: NEWCASTLE UNIVERSITY, MEDICINE AND SURGERY MB BS (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b12.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The subject rule is not on the course page; it is in the 2027 Medicine
 *  Admissions Policy that the course page links to, recorded as a second source.
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const URL = 'https://www.ncl.ac.uk/undergraduate/degrees/a100/';
const POLICY = 'https://www.ncl.ac.uk/mediav8/fms/files/2027%20Admissions%20Policy%20FINAL.pdf';
const SCIENCES = ['Biology', 'Chemistry', 'Mathematics', 'Further Mathematics', 'Statistics', 'Physics'];
const RULE = 'A level subjects should include Biology or Chemistry plus one of Biology, Chemistry, Mathematics, Further Mathematics, Statistics or Physics.';

export const batch12NewcastleMedicine: Course = course({
  slug: 'newcastle-medicine-mbbs',
  universityId: 'newcastle',
  name: 'Medicine and Surgery',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MB BS',
  years: 5,
  code: 'A100',
  year: '2027',
  cycleNote: 'The course page gives “2027 entry information” and a September 2027 start; the subject rule is in the linked 2027 Medicine Admissions Policy.',
  raw: `Typical entry requirements A-Level: AAA. ${RULE} For Biology, Chemistry and Physics A levels, a pass in the practical element is required.`,
  typicalOffer: 'AAA',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'AAA',
      constraints: [
        oneOf(['Biology', 'Chemistry'], 'A', 'Biology or Chemistry.'),
        atLeastAt(SCIENCES, 'A', 2, 'Plus one of Biology, Chemistry, Mathematics, Further Mathematics, Statistics or Physics.'),
      ],
      rawText: `AAA. ${RULE}`,
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'ABB',
      isContextual: true,
      constraints: [
        oneOf(['Biology', 'Chemistry'], null, 'Biology or Chemistry.'),
        atLeastAt(SCIENCES, 'B', 2, 'Plus one of Biology, Chemistry, Mathematics, Further Mathematics, Statistics or Physics.'),
      ],
      rawText: 'For students entering with A levels this is typically AAA, ABB for contextual offer students or through one of our supported entry programmes.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is one of the accepted second subjects; no preference is stated.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails: 'Required for A100. “The UCAT threshold may differ in each admissions cycle.” Home A100 applicants are ranked on achieved academic results and UCAT.',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'yes',
  interviewNote: 'Home applicants: Multiple Mini Interviews (MMIs) on campus.',
  contextual: { availability: 'yes', details: 'ABB for contextual offer students or through Newcastle’s supported entry programmes (PARTNERS). The course page says offers can be up to three grades lower than typical.' },
  gcse: 'GCSEs are scored (best eight) for Home applicants; no minimum grades are printed on the course page.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote: 'Newcastle’s course page, read on 2026-11-24, gives “UCAS code A100”, “Full time: 5 years” and “2027 entry information”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine and Surgery MB BS | Undergraduate | Newcastle University',
  lastVerified: '2026-11-24',
  sources: [{ title: '2027 Medicine Admissions Policy (Newcastle University)', url: POLICY, applicationYear: '2027', lastVerified: '2026-11-24', kind: 'admissions-page' }],
  notes: 'UCAS CODE: A100 is read from the course page’s printed “UCAS code” key-facts field, not from the URL. RESITS are accepted only from previous Newcastle applicants, at one grade higher (AAA becomes A*AA). AGE: you must turn 18 by the end of the first semester. Maximum four medicine choices on UCAS.',
});
