/**
 * ---------------------------------------------------------------------------
 *  BATCH 9 — MEDICINE: UNIVERSITY OF GLASGOW, MEDICINE MBChB (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b9.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  Glasgow prints adjusted (widening access) requirements for Scottish Highers
 *  only. No A-level adjusted offer is printed, so none is recorded or implied.
 */

import type { Course } from '@/types';
import { course, offer, oneOf } from './builders';

const READ_ON = '2026-11-24';
const URL = 'https://www.gla.ac.uk/undergraduate/degrees/medicine/';

export const batch9GlasgowMedicine: Course = course({
  slug: 'glasgow-medicine-mbchb',
  universityId: 'glasgow',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MBChB',
  years: 5,
  code: 'A100',
  year: '2027',
  cycleNote: 'The page is in Glasgow’s “2027 Degree programmes A‑Z” and lists entry requirements “for entry in 2027”.',
  raw: 'UK A-level Standard Entry Requirements: AAA. Additional requirements: A-levels Chemistry and one of either Biology, Physics or Mathematics. GCSE English literature or English language at Grade B or 6. GCSE Biology at Grade B or 6 (if not studied at A-level). UCAT. Interview.',
  offers: [
    offer({
      label: 'UK A-level standard entry requirements',
      gradeProfile: 'AAA',
      required: [['Chemistry', 'A']],
      constraints: [oneOf(['Biology', 'Physics', 'Mathematics'], 'A', 'One of Biology, Physics or Mathematics.')],
      rawText: 'AAA. A-levels Chemistry and one of either Biology, Physics or Mathematics.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is not mentioned for A-level applicants.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    '“UCAT is a mandatory component of our selection process. We will not consider any applicant who has not sat the UCAT the summer before applying. No exceptions will be made.”',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'yes',
  interviewNote: 'Interview is listed among the requirements for A-level applicants.',
  contextual: {
    availability: 'unknown',
    details:
      'Glasgow prints adjusted requirements only for Scottish Highers (Access Glasgow and Reach). No adjusted A-level offer is published on this page.',
  },
  gcse: 'GCSE English Literature or English Language at grade 6 (B). GCSE Biology at grade 6 (B) if Biology is not taken at A-level.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote: 'Glasgow’s 2027 degree page, read on 2026-11-24, lists “Medicine MBChB: A100 5 year degree”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'University of Glasgow - Undergraduate study - 2027 Degree programmes A‑Z - Medicine',
  lastVerified: READ_ON,
  notes:
    'NO RESITS: “Re-sits or additional time to sit qualifications is not permitted. The required grades and subjects must be obtained at one sitting and at the first attempt.” International A-level applicants have a different subject rule (Chemistry, Biology and one of Physics or Mathematics), not recorded here. DEADLINE: “All applications must be received by UCAS by 15 October”; the page prints no year beside it, so no dated deadline is recorded. Limit your UCAS choices to four medical schools.',
});
