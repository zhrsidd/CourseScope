/**
 * ---------------------------------------------------------------------------
 *  BATCH 8 — MEDICINE: IMPERIAL COLLEGE LONDON, MEDICINE MBBS/BSc (A100)
 *  Read from the university's own pages on 2026-11-22. Research note:
 *  research/medicine-b8.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The A* rule is a min-count constraint, not "A* in Biology and A* in
 *  Chemistry": the page says "A* and A in Biology and Chemistry (A* in
 *  either)". The contextual route keeps both subjects at A but lets the A* sit
 *  in any subject, so it is its own pathway.
 *
 *  UCAT thresholds on the page are for 2026 entry and are quoted as such; they
 *  are not presented as 2027 thresholds.
 */

import type { Course } from '@/types';
import { atLeastAt, course, offer } from './builders';

const READ_ON = '2026-11-22';
const URL = 'https://www.imperial.ac.uk/study/courses/undergraduate/2027/medicine/';

export const batch8ImperialMedicine: Course = course({
  slug: 'imperial-medicine-mbbs-bsc',
  universityId: 'imperial',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MBBS/BSc',
  years: 6,
  code: 'A100',
  year: '2027',
  cycleNote:
    'The 2027 course page gives “Start date October 2027”. It also says “Applications for this course are now closed”, with the deadline “Thursday 15 October 2026 at 18.00 (UK time)”.',
  raw: 'A*AA. To include: A* and A in Biology and Chemistry (A* in either). A in a third subject. For contextual offers, the A* can be in any subject. All qualifications must be taken in the same sitting. Not accepted: General Studies and Critical Thinking.',
  minimumEntryStandard: 'A*AA including Chemistry and Biology, with A* in one of these subjects',
  typicalOffer: 'A*AA (A* in Biology or Chemistry)',
  offers: [
    offer({
      label: 'Minimum entry standard',
      gradeProfile: 'A*AA',
      required: [['Biology', 'A'], ['Chemistry', 'A']],
      constraints: [atLeastAt(['Biology', 'Chemistry'], 'A*', 1, 'A* in Biology or Chemistry (either).')],
      rawText: 'A*AA. To include: A* and A in Biology and Chemistry (A* in either). A in a third subject.',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'A*AA',
      required: [['Biology', 'A'], ['Chemistry', 'A']],
      isContextual: true,
      rawText: 'For contextual offers, the A* can be in any subject.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is not mentioned on the course page.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    'Must be taken once, in the year you apply. Used to help shortlist for interview, “but are not the sole factor”. For 2026 entry the page gives these thresholds: Home applicants SJT Band 3 minimum (Band 4 discounted) and total score 2320; contextual applicants SJT Band 3 minimum and total score 2170. Imperial says thresholds “will vary year to year”.',
  testUrl: 'https://www.imperial.ac.uk/study/apply/undergraduate/process/admissions-tests/ucat/',
  interview: 'yes',
  interviewNote:
    'Multiple Mini Interviews (MMIs). “No offers are made without applicants attending a competitive interview.” Imperial says it normally interviews the top third of applicants.',
  contextual: {
    availability: 'yes',
    details:
      'A*AA with A in Biology and Chemistry, where the A* can be in any subject. A lower contextualised UCAT cut-off also applies to eligible applicants (2170 total for 2026 entry).',
  },
  gcse: 'No GCSE requirement is published on this course page.',
  english: 'All applicants must meet Imperial’s higher level English language requirement.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'Imperial’s 2027-entry course page, read on 2026-11-22, prints “Medicine MBBS/BSc”, “UCAS course code A100” and “Duration 6 years”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine MBBS/BSc | Study | Imperial College London',
  lastVerified: READ_ON,
  notes:
    'ALL QUALIFICATIONS MUST BE TAKEN IN THE SAME SITTING. Not accepted: General Studies and Critical Thinking. A pass in the science practical endorsement is required in every science subject in the offer. Imperial does not run its own foundation programme, and its Medicine courses do not accept UCL UPCSE or Warwick IFP Science and Engineering. A Fitness to Practise policy applies, including before admission.',
});
