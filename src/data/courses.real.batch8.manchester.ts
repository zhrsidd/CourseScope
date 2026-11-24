/**
 * ---------------------------------------------------------------------------
 *  BATCH 8 — MEDICINE: UNIVERSITY OF MANCHESTER, MBChB MEDICINE (A106)
 *  Read from the university's own pages on 2026-11-22. Research note:
 *  research/medicine-b8.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The subject rule is "Biology/Human Biology or Chemistry; and one of the
 *  following subjects from Chemistry; Biology/Human Biology; Physics;
 *  Psychology; Mathematics or Further Mathematics", and an offer "will not
 *  include combinations of very similar subjects, for example, Biology and
 *  Human Biology or Maths and Further Maths together". It is modelled as a
 *  one-of plus an at-least-two count. The very-similar-subjects exclusion
 *  cannot be checked from grades, so it is a manual-review condition: never a
 *  pass the university would not give.
 */

import type { Course } from '@/types';
import { atLeastAt, course, manualReview, offer, oneOf } from './builders';

const READ_ON = '2026-11-22';
const URL = 'https://www.manchester.ac.uk/study/undergraduate/courses/2027/01428/mbchb-medicine/';
const SCIENCES = ['Chemistry', 'Biology', 'Human Biology', 'Physics', 'Psychology', 'Mathematics', 'Further Mathematics'];
const SIMILAR = manualReview(
  'Manchester’s offer “will not include combinations of very similar subjects, for example, Biology and Human Biology or Maths and Further Maths together.”',
);

export const batch8ManchesterMedicine: Course = course({
  slug: 'manchester-medicine-mbchb',
  universityId: 'manchester',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MBChB',
  years: 5,
  code: 'A106',
  year: '2027',
  cycleNote: 'The page is titled “MBChB Medicine (2027 entry)” and gives “Year of entry: 2027”.',
  raw: 'AAA, including Biology/Human Biology or Chemistry; and One of the following subjects from Chemistry; Biology/Human Biology; Physics; Psychology; Mathematics or Further Mathematics. As long as applicants meet our science subject requirements we have no preference for the third subject. A combination of three sciences is equally acceptable at A-level. However, our offer will not include combinations of very similar subjects, for example, Biology and Human Biology or Maths and Further Maths together.',
  typicalOffer: 'AAA (including specific subjects)',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'AAA',
      constraints: [
        oneOf(['Biology', 'Human Biology', 'Chemistry'], 'A', 'Biology/Human Biology or Chemistry.'),
        atLeastAt(SCIENCES, 'A', 2, 'A second subject from Chemistry, Biology/Human Biology, Physics, Psychology, Mathematics or Further Mathematics.'),
        SIMILAR,
      ],
      rawText: 'AAA, including Biology/Human Biology or Chemistry; and one of Chemistry; Biology/Human Biology; Physics; Psychology; Mathematics or Further Mathematics.',
    }),
    offer({
      label: 'Contextual offer',
      gradeProfile: 'AAB',
      isContextual: true,
      constraints: [
        oneOf(['Biology', 'Human Biology', 'Chemistry'], null, 'Biology/Human Biology or Chemistry.'),
        atLeastAt(SCIENCES, 'B', 2, 'A second subject from Chemistry, Biology/Human Biology, Physics, Psychology, Mathematics or Further Mathematics.'),
        SIMILAR,
      ],
      rawText: 'AAB including in: Biology/Human Biology or Chemistry; and One of the following subjects from Chemistry; Biology/Human Biology; Physics; Psychology; Mathematics or Further Mathematics.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is named only as one of the accepted second subjects; no preference is stated.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    'Sit the UCAT in the year you apply; a result is valid for one cycle. “We do not consider applicants who achieve Band 3 or 4 in the Situational Judgement Test (SJT) element of the UCAT.”',
  testUrl: 'https://www.bmh.manchester.ac.uk/study/medicine/apply/ucat/',
  interview: 'yes',
  interviewNote: '“We do not make any offers without interview.”',
  contextual: {
    availability: 'yes',
    details:
      'AAB with the same subject rule, for applicants who meet Manchester’s contextual criteria (for example, eligibility for free school meals). The page also lists a care-experienced, sanctuary or carer offer of ABB “including specific subjects”; its criteria are on Manchester’s contextual admissions page and are not recorded here.',
  },
  gcse:
    'At least seven GCSEs at grade 7 (A) or above, including English Language, Mathematics and at least two sciences at a minimum of grade 6 (B). Double Award science: at least 66. Applicants confirmed as WP+ or WP++: six GCSEs at grade 7 or above.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'Manchester’s 2027-entry course page, read on 2026-11-22, prints “MBChB Medicine”, “UCAS course code: A106” and “Duration: 5 years”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'MBChB Medicine (2027 entry) | The University of Manchester',
  lastVerified: READ_ON,
  notes:
    'RESITS: applicants may resit only one of Year 12 or Year 13, need at least ABB at the first sitting, and must then achieve A*A*A. GCSE resits are permitted. A pass in the practical element of any science A-level is required. Re-applicants must retake the UCAT. T Levels are not accepted for this course.',
});
