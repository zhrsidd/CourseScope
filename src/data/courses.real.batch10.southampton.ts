/**
 * ---------------------------------------------------------------------------
 *  BATCH 10 — MEDICINE: UNIVERSITY OF SOUTHAMPTON, MEDICINE BM5 (BMBS) (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The page carries a stale "starting September 2023" string; the entry
 *  requirements panel is headed "For Academic year 202728", which is used (the
 *  same artefact batch 6 recorded on Southampton pages).
 */

import type { Course } from '@/types';
import { course, offer, oneOf } from './builders';

const URL = 'https://www.southampton.ac.uk/courses/medicine-bm5-degree-bmbs';
const SECOND = ['Chemistry', 'Physics', 'Psychology', 'Sociology', 'Environmental Studies', 'Geography'];

export const batch10SouthamptonMedicine: Course = course({
  slug: 'southampton-medicine-bm5',
  universityId: 'southampton',
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
  name: 'Medicine (BM5)',
  awardLabel: 'BMBS',
  years: 5,
  cycleNote: 'The entry requirements are headed “For Academic year 202728”. The page also shows a stale “starting September 2023” label, which is not used.',
  raw: 'AAA to include A level Biology and one additional science (with a pass in the practical element where it is separately endorsed). Please note applicants must offer AAA or above, we do not accept grade or tariff equivalents to AAA. Acceptable science subjects are Chemistry, Physics, Psychology, Sociology, Environmental Studies or Geography.',
  offers: [
    offer({
      label: 'School leaver offer',
      gradeProfile: 'AAA',
      required: [['Biology', 'A']],
      constraints: [oneOf(SECOND, 'A', 'One additional science: Chemistry, Physics, Psychology, Sociology, Environmental Studies or Geography.')],
      rawText: 'AAA to include A level Biology and one additional science',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'AAB',
      isContextual: true,
      required: ['Biology'],
      constraints: [oneOf(SECOND, null, 'One additional science: Chemistry, Physics, Psychology, Sociology, Environmental Studies or Geography.')],
      rawText: 'AAB to include A level Biology and one additional science',
    }),
  ],
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: 'Sit the UCAT in the year of application, before the 15 October UCAS deadline.',
  interview: 'yes',
  interviewNote: 'Selection days run from January to the end of February; 2027 dates had not been published when read.',
  contextual: {
    availability: 'yes',
    details: 'AAB to include Biology and one additional science, for Home school leavers who meet two of Southampton’s contextual admissions criteria. Graduate, mature and international applicants are not eligible.',
  },
  gcse: 'Seven GCSEs at grade 6 (B) or above, including English Language, Mathematics, and either Biology and Chemistry, combined science, or science and additional science.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine Degree BM5 | BMBS | University of Southampton',
  identityNote: 'Southampton’s course page, read on 2026-11-24, gives “UCAS Course code A100”, “Duration 5 years” and the award “Bachelor of Medicine, Bachelor of Surgery”.',
  notes: 'NO GRADE EQUIVALENTS: “applicants must offer AAA or above, we do not accept grade or tariff equivalents to AAA.” Offers typically exclude General Studies and Critical Thinking; overlapping subjects are not accepted together (for example Zoology with Biology, or Biology with Sports Studies or PE). AGE: 18 or over at the start; younger applicants may be offered a deferred place.',
});
