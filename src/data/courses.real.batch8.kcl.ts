/**
 * ---------------------------------------------------------------------------
 *  BATCH 8 — MEDICINE: KING'S COLLEGE LONDON, MEDICINE MBBS (A100)
 *  Read from the university's own pages on 2026-11-22. Research note:
 *  research/medicine-b8.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  KCL makes NO contextual offer for A100: it says so and points contextually
 *  eligible applicants to the Extended Medical Degree Programme (A101), which
 *  is a separate application and is not in this batch.
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const READ_ON = '2026-11-22';

export const batch8KclMedicine: Course = course({
  slug: 'kcl-medicine-mbbs',
  universityId: 'kcl',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MBBS',
  years: 5,
  yearsMax: 6,
  code: 'A100',
  year: '2027',
  cycleNote:
    'The course page gives “Start date: September 2027” and carries no note that its details apply to 2026 entry. Five years, or six with the optional intercalated degree.',
  raw: 'Required subjects: A-level (or equivalent) grade A in Chemistry and Biology. Preferred subjects: No preferred subjects. Required grades: A*AA. Must include grade A in Biology and Chemistry.',
  offers: [
    offer({
      label: 'Required grades',
      gradeProfile: 'A*AA',
      required: [['Biology', 'A'], ['Chemistry', 'A']],
      rawText: 'A*AA. Must include grade A in Biology and Chemistry.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is not mentioned on the course or entry-requirements page.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    'Must be taken in the same year you apply. For the most recent cycle KCL ranked applications on UCAT performance, GCSE grades and widening participation indicators, and “No minimum UCAT threshold score was applied.” The overall score is used; subtests are not considered separately, and the Situational Judgement Test is not used for shortlisting.',
  testUrl: 'https://www.ucat.ac.uk/',
  interview: 'yes',
  interviewNote:
    '“No offers are made without an interview.” Usually held between December and April; in the current cycle they are conducted remotely.',
  contextual: {
    availability: 'no',
    details:
      '“We do not make contextual offers for this programme.” KCL points contextually eligible applicants to its Extended Medical Degree Programme MBBS (A101), a separate application.',
  },
  gcse: 'GCSE grade 6/B in both English Language and Mathematics is required.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'KCL’s course page and its entry-requirements page, read on 2026-11-22, both name “Medicine MBBS” with “UCAS code: A100”.',
  officialUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/medicine-mbbs',
  sourceUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/medicine-mbbs/entry-requirements',
  sourceTitle: 'Medicine - Entry Requirements - Medicine MBBS | King’s College London',
  lastVerified: READ_ON,
  notes:
    'AGE: applicants must turn 18 before starting the second year of the degree. EXCLUDED SUBJECTS: “A-level General Studies, Critical Thinking, Thinking Skills and Global Perspectives are not accepted.” EPQ: “We do not consider the EPQ at any point of the assessment process.” A pass in the practical endorsement is required in all science A-levels. Occupational Health clearance and an enhanced DBS check are compulsory for offer holders. The Application deadline field on the course page is empty, so no deadline is recorded here.',
});
