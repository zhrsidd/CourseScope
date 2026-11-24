/**
 * ---------------------------------------------------------------------------
 *  BATCH 10 — MEDICINE: UNIVERSITY OF LEEDS, MEDICINE AND SURGERY MBChB (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b10-b11.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  Leeds excludes three third-subject combinations (Chemistry and Biology with
 *  Human Biology, Sports Science or Critical Thinking). Like other universities'
 *  excluded subjects they are kept in the notes, not enforced by the engine.
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

export const batch10LeedsMedicine: Course = course({
  slug: 'leeds-medicine-mbchb',
  universityId: 'leeds',
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
  name: 'Medicine and Surgery',
  awardLabel: 'MBChB',
  years: 5,
  cycleNote: 'The page gives “Year of entry 2027” and “Start date September 2027”.',
  raw: 'A-level: AAA including Chemistry and Biology. For the purposes of meeting our entry requirements, an A* cannot compensate for a B in another subject, so we will not accept A*A*B instead of AAA. Certain combinations are not acceptable, specifically: Chemistry with Biology and Human Biology; Chemistry with Biology and Sports Science; Chemistry with Biology and Critical Thinking.',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A'], ['Biology', 'A']],
      rawText: 'A-level: AAA including Chemistry and Biology.',
    }),
  ],
  typicalOffer: 'AAA (specific subject requirements)',
  fmNote: 'Further Mathematics is not mentioned.',
  testDetails: 'Required, taken in the year of application; other aptitude tests are not accepted. Shortlisting is points-based on the top eight GCSEs, the top three predicted grades, the overall UCAT score and contextual information. “There is no fixed UCAT cut-off score.”',
  interview: 'yes',
  interviewNote: 'Multiple mini-interviews. For 2027 entry, face-to-face interviews are on 4, 5 and 6 January 2027; overseas interviews are online. Offers after interview depend entirely on interview performance.',
  contextual: {
    availability: 'unknown',
    details: 'Access to Leeds may give priority to an application. No reduced A-level offer is printed on the course page.',
  },
  gcse: 'At least six GCSEs at grade 6 or above, including Maths, English Language, and Biology and Chemistry or Dual Science. Leeds notes that applicants with only these minimums are unlikely to be shortlisted; scoring uses eight GCSEs.',
  officialUrl: 'https://courses.leeds.ac.uk/5580/medicine-and-surgery-mbchb',
  sourceUrl: 'https://courses.leeds.ac.uk/5580/medicine-and-surgery-mbchb',
  sourceTitle: 'Medicine and Surgery MBChB | University of Leeds',
  identityNote: 'Leeds’ course page, read on 2026-11-24, gives “Year of entry 2027”, “UCAS code A100” and “Duration 5 Years (Full time)”.',
  notes: 'EXCLUDED COMBINATIONS: Chemistry with Biology and Human Biology; Chemistry with Biology and Sports Science; Chemistry with Biology and Critical Thinking. An A* cannot compensate for a B. EPQ and Level 3 Core Maths are not scored. RESITS: one resit per A-level and per GCSE is accepted without mitigating circumstances. Evidence of full-time education in the last five years is required. DEADLINE: “by 15 October of the year preceding entry” (no year printed); Leeds does not take part in UCAS Extra for this course.',
});
