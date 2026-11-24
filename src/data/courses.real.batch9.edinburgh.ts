/**
 * ---------------------------------------------------------------------------
 *  BATCH 9 — MEDICINE: UNIVERSITY OF EDINBURGH, MBChB MEDICINE 6-YEAR PROGRAMME (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b9.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  Requirements were read in a rendered page with each A-level option selected
 *  (they load on selection). "AAA in one sitting" is what Edinburgh calls the
 *  grades "most applicants needed to receive an offer in recent years".
 */

import type { Course } from '@/types';
import { course, offer, oneOf } from './builders';

const READ_ON = '2026-11-24';
const URL = 'https://study.ed.ac.uk/programmes/undergraduate/354-mbchb-medicine-6-year-programme';
const SECOND = ['Biology', 'Human Biology', 'Mathematics', 'Further Mathematics', 'Physics'];
const SUBJECTS =
  'Chemistry; one from Biology/Human Biology, Mathematics/Further Mathematics or Physics. Only one of Mathematics or Further Mathematics will be considered. Only one of Biology or Human Biology will be considered.';

export const batch9EdinburghMedicine: Course = course({
  slug: 'edinburgh-medicine-mbchb',
  universityId: 'edinburgh',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MBChB',
  years: 6,
  code: 'A100',
  year: '2027',
  cycleNote: 'The page gives “Year of entry: 2027” and a September 2027 start.',
  raw: `These are the grades most applicants needed to receive an offer in recent years: AAA in one sitting. All examination grades must be obtained at the first attempt of each subject. The grades you use to meet our entry requirements must include the following at A level: ${SUBJECTS}`,
  typicalOffer: 'AAA in one sitting',
  offers: [
    offer({
      label: 'Standard requirements',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A']],
      constraints: [oneOf(SECOND, 'A', 'One of Biology/Human Biology, Mathematics/Further Mathematics or Physics.')],
      rawText: `AAA in one sitting. ${SUBJECTS}`,
    }),
    offer({
      label: 'Widening access requirements',
      gradeProfile: 'AAB',
      isContextual: true,
      required: ['Chemistry'],
      constraints: [oneOf(SECOND, null, 'One of Biology/Human Biology, Mathematics/Further Mathematics or Physics.')],
      rawText: `AAB in one sitting. ${SUBJECTS}`,
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is accepted in place of Mathematics, but only one of the two is considered.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    'Sit the UCAT in 2026, before applying. Edinburgh scores the academic record, then adds weightings for the Situational Judgement Test and the total UCAT score, and ranks applications. Exemptions only in very exceptional circumstances agreed by 15 July 2026.',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'yes',
  interviewNote:
    'About the top-scoring 800 applicants are invited to a half-day assessment day (interview), at Edinburgh Medical School or online.',
  contextual: {
    availability: 'yes',
    details: 'AAB in one sitting with the same required subjects, for applicants eligible for Edinburgh’s widening access Plus Flag offer. GCSEs at B or 6 instead of A or 7.',
  },
  gcse:
    'Biology, Chemistry, English and Mathematics at A or 7. Double Award combined sciences at AA/77 may replace the science GCSEs. (Widening access: B or 6, and BB/66.)',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'Edinburgh’s programme page, read on 2026-11-24, gives “UCAS Code A100”, “Duration of study 6 years” and “Year of entry: 2027”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'MBChB Medicine (6-year programme) MBChB - Undergraduate programmes | The University of Edinburgh',
  lastVerified: READ_ON,
  notes:
    'NO RESITS: all grades must be obtained at the first attempt; resit applicants are not entered into selection except in very exceptional, pre-verified circumstances. Edinburgh assesses only the first official attempt at a required subject, even in a different qualification. Graduate entrants can progress from Year 2 to Year 4. UCAS deadline for 2027 entry: 15 October 2026, 6pm.',
});
