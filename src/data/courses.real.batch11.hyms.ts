/**
 * ---------------------------------------------------------------------------
 *  BATCH 11 — MEDICINE: HULL YORK MEDICAL SCHOOL, MB BS MEDICINE (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  A new university record: Hull York Medical School is its own UCAS
 *  institution (H75), with a degree awarded jointly by Hull and York.
 *  "We do not consider Biology and Human Biology to be distinct subjects" —
 *  Biology is required by name, so Human Biology is not accepted in its place.
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

export const batch11HymsMedicine: Course = course({
  slug: 'hyms-medicine-mbbs',
  universityId: 'hyms',
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
  name: 'Medicine',
  awardLabel: 'MB BS',
  years: 5,
  cycleNote: 'The offers page is headed “MB BS Medicine offers for 2027 entry”; the course page gives a September 2027 start.',
  raw: 'Standard offer: AAA at A Level including Biology and Chemistry. The third A level can be any subject (excluding General Studies, Applied Science, Citizenship and Critical Thinking). All three A levels should be taken in one sitting.',
  offers: [
    offer({
      label: 'Standard offer',
      gradeProfile: 'AAA',
      required: [['Biology', 'A'], ['Chemistry', 'A']],
      rawText: 'AAA at A Level including Biology and Chemistry.',
    }),
    offer({
      label: 'Reduced offer (contextual)',
      gradeProfile: 'AAB',
      isContextual: true,
      required: ['Biology', 'Chemistry'],
      rawText: 'AAB at A level, to include Biology and Chemistry and meet contextual data requirements. There is no subject restriction for which A Level the B is achieved in.',
    }),
  ],
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: 'Sit the UCAT in the year of application and achieve a Situational Judgement Test band of 1, 2 or 3.',
  interview: 'yes',
  interviewNote: 'Applicants who meet the entry requirements are scored for selection to interview.',
  contextual: {
    availability: 'yes',
    details: 'Reduced offer AAB including Biology and Chemistry for applicants meeting contextual data requirements, only if Hull York is the firm choice. An alternative offer of ABB applies after a listed widening participation programme.',
  },
  gcse: 'Six GCSEs at grades 9 to 4 (A* to C), including English Language and Maths at grade 6 (B) or above. GCSE resits are accepted.',
  officialUrl: 'https://www.hyms.ac.uk/medicine/mbbs-medicine',
  sourceUrl: 'https://www.hyms.ac.uk/medicine/entry-requirements/offers',
  sourceTitle: 'Offers for MB BS Medicine and Medicine with a Gateway Year | Hull York Medical School',
  sources: [
    {
      url: 'https://www.hyms.ac.uk/medicine/entry-requirements/entry-requirements-medicine',
      title: 'Entry requirements for Medicine | Hull York Medical School',
      applicationYear: '2027',
      lastVerified: '2026-11-24',
      kind: 'admissions-page',
    },
  ],
  identityNote: 'Hull York’s MB BS page, read on 2026-11-24, gives “UCAS Code A100”, “Institution Code H75”, “September 2027”, “5 years” and “an MB BS degree awarded jointly by the University of Hull and the University of York”.',
  notes: 'EXCLUDED THIRD SUBJECTS: General Studies, Applied Science, Citizenship and Critical Thinking; subjects must be distinct, and Biology and Human Biology are not distinct. All three A-levels in one sitting. Predicted grades no lower than AAB (ABB on the alternative-offer route). EPQ OFFER: AAB with AA in Biology and Chemistry, B in the third subject and A in the EPQ, firm choice only (not checked against your grades). AGE: 18 by 1 October of entry. An Additional Information form is due by 30 October 2026.',
});
