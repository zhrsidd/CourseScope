/**
 * ---------------------------------------------------------------------------
 *  BATCH 9 — MEDICINE: UNIVERSITY OF CAMBRIDGE, MEDICINE MB BChir (A100)
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b9.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The subject rule depends on the College: Chemistry plus one OR two other
 *  science/mathematics subjects. Two pathways: Chemistry plus two satisfies
 *  every College; Chemistry plus one is accepted only at seven named Colleges,
 *  so that pathway is a manual-review condition, never a clean pass.
 */

import type { Course } from '@/types';
import { atLeastAt, course, manualReview, offer } from './builders';

const READ_ON = '2026-11-24';
const URL = 'https://www.undergraduate.study.cam.ac.uk/courses/medicine-mb-bchir';
const OTHERS = ['Mathematics', 'Biology', 'Human Biology', 'Physics', 'Further Mathematics'];
const RAW_SUBJECTS =
  'To apply to any of our Colleges for Medicine you will need A Levels/IB Higher Levels (or the equivalent) in: Chemistry; one or two other science or mathematics subject from: Mathematics, Biology or Human Biology, Physics, Further Mathematics. The number of science or mathematics subjects you need to have will depend on which College you apply to.';

export const batch9CambridgeMedicine: Course = course({
  slug: 'cambridge-medicine-mb-bchir',
  universityId: 'cambridge',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'MB',
  awardLabel: 'MB BChir',
  years: 6,
  code: 'A100',
  year: '2027',
  cycleNote:
    '“The entry requirements listed are for entry in 2027 or deferred entry in 2028.” Start date October 2027. First-degree students also graduate with a BA (Hons) after the first three years.',
  raw: `Minimum offer level A level: A*A*A. ${RAW_SUBJECTS} Colleges usually require A* in Chemistry.`,
  minimumEntryStandard: 'A*A*A',
  offers: [
    offer({
      label: 'Chemistry and two other science or mathematics subjects (accepted at every College)',
      gradeProfile: 'A*A*A',
      required: ['Chemistry'],
      constraints: [
        atLeastAt(OTHERS, 'A', 2, 'Two of Mathematics, Biology or Human Biology, Physics, Further Mathematics.'),
      ],
      rawText: RAW_SUBJECTS,
    }),
    offer({
      label: 'Chemistry and one other science or mathematics subject (some Colleges only)',
      gradeProfile: 'A*A*A',
      required: ['Chemistry'],
      constraints: [
        atLeastAt(OTHERS, 'A', 1, 'One of Mathematics, Biology or Human Biology, Physics, Further Mathematics.'),
        manualReview(
          'Only these Colleges require Chemistry and just one other science or mathematics subject: Fitzwilliam, Girton, Homerton, Murray Edwards, Newnham, Selwyn and Trinity Hall. Every other College requires two.',
        ),
      ],
      rawText: 'Colleges that require Chemistry and one other science or mathematics subject: Fitzwilliam, Girton, Homerton, Murray Edwards, Newnham, Selwyn, Trinity Hall.',
    }),
  ],
  fm: 'no-stated-preference',
  fmNote: 'Further Mathematics is named only as one of the accepted science or mathematics subjects.',
  test: 'ucat',
  testRequirement: 'required',
  testDetails:
    'Cambridge looks at the overall cognitive subtest score and “will not be using the situational judgement score as part of our assessment for 2027 entry.” Results are used to select for interview and may be used when making offers. “There is no minimum threshold for UCAT score.”',
  testUrl: 'https://www.undergraduate.study.cam.ac.uk/apply/how/medicine-admission-test',
  interview: 'yes',
  interviewNote: '“We assess applicants through a mixture of academic record, UCAT and interviews.” No written work is submitted before interview.',
  contextual: { availability: 'unknown', details: null },
  gcse: 'No GCSE requirement is published on this course page.',
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'Cambridge’s course page, read on 2026-11-24, gives “UCAS code A100” and “Course length MB, BChir 6 years full-time”.',
  officialUrl: URL,
  sourceUrl: URL,
  sourceTitle: 'Medicine, MB and BChir | Undergraduate Study',
  lastVerified: READ_ON,
  notes:
    'COLLEGES SET THE SUBJECT COUNT and usually require A* in Chemistry; some make offers above the minimum, so check the College’s own page. Not available at Hughes Hall. You cannot apply if you will not be 18 on 1 November of year 1, or if you have failed or been excluded from another medical school. Work experience is strongly recommended. Offer holders need a DBS check, vaccinations, a blood test and an occupational health assessment. LIMITATION: the page lists “Biology or Human Biology” as one option, but the two-subject count treats them separately.',
});
