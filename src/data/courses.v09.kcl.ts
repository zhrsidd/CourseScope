/**
 * ---------------------------------------------------------------------------
 *  v0.9 — KING'S COLLEGE LONDON, GENERAL ENGINEERING BEng
 *  Re-read from KCL's own pages on 2026-09-28 before import.
 * ---------------------------------------------------------------------------
 *
 *  This record closes a loop that ran through two stages.
 *
 *  A scaffold row once asserted "Engineering MEng, H100". v0.8 found that both
 *  halves of that were wrong: KCL's engineering degree is titled GENERAL
 *  Engineering, and H100 is the three-year BEng, not the MEng. The MEng is
 *  H101, and it was imported then.
 *
 *  The BEng was READ at the same time — it had to be, because reading it is how
 *  the code question was settled — and then deliberately not imported, because
 *  v0.8 was a data-closure stage and adding a course would have been scope
 *  creep. It was recorded as a known omission instead.
 *
 *  v0.9 imports it, after re-verifying the source rather than trusting the
 *  earlier read. The re-read confirms every field and adds one that the first
 *  pass did not capture: KCL's list of excluded A-level subjects.
 *
 *  ---------------------------------------------------------------------------
 *  WHY THE PAIR MATTERS MORE THAN EITHER RECORD
 *  ---------------------------------------------------------------------------
 *  H100 and H101 are the catalogue's cleanest demonstration of the failure mode
 *  the application-identity invariant exists to prevent: two real, separately
 *  coded applications, one award apart, where a scaffold had taken one code and
 *  hung the other award on it. York's H610/H609 was the same error. Holding
 *  both records, each with its own code read from its own page, is what makes
 *  that error impossible to reintroduce silently — and the assertions added in
 *  v0.9 pin the pairing in both directions.
 *
 *  ---------------------------------------------------------------------------
 *  NOT INFERRED FROM THE MEng
 *  ---------------------------------------------------------------------------
 *  Every field below was read on the BEng's own pages. The two degrees do share
 *  an offer shape — AAA with grade A in Mathematics, contextual two grades
 *  lower — and that shared shape is a finding, not a shortcut. The duration
 *  differs (three years against four) and is the reason they are separate
 *  applications at all.
 */

import type { Course } from '@/types';
import { course, offer } from './builders';

const READ_ON = '2026-09-28';

export const v09KclBEng: Course = course({
  slug: 'kcl-general-engineering-beng',
  universityId: 'kcl',
  name: 'General Engineering',
  category: 'engineering',
  sub: 'general-engineering',
  degree: 'BEng',
  years: 3,
  code: 'H100',
  year: '2027',
  cycleNote:
    'Published requirements for 2027 entry. The page states a September 2027 start and, checked specifically, carries NO “course details apply to 2026 entry” disclaimer — unlike KCL’s Physics with Astrophysics and Cosmology BSc, which does. KCL rolls its courses over page by page, so the absence of that disclaimer was verified here rather than assumed from a sibling.',
  raw: 'A-level (or equivalent) grade A in Mathematics.',
  offers: [
    offer({
      label: 'Typical offer',
      gradeProfile: 'AAA',
      required: [['Mathematics', 'A']],
      rawText: 'AAA. A-level (or equivalent) grade A in Mathematics.',
    }),
  ],
  maths: 'required',
  fm: 'no-stated-preference',
  fmNote:
    'Further Mathematics is never raised on this course page or its entry-requirements page, both of which were read in full. KCL publishes no preference either way, and it is not recorded as “not required” — KCL never says that.',
  test: 'unknown',
  testNote:
    'No admissions test is mentioned on this course page or its entry-requirements page. KCL does not state that no test is required either, so this is silence rather than a published “no admissions test”.',
  interview: 'not-stated',
  interviewNote: 'No admissions interview is mentioned on this course page or its entry-requirements page.',
  contextual: {
    availability: 'yes',
    details:
      'KCL states the size of the reduction rather than printing a profile: “We make contextual offers for this programme, which are two A-Level grades (or equivalent) lower than the advertised entry requirements.” Two grades below AAA is ABB. THE SUBJECT RULE IS NOT WAIVED — the entry-requirements page repeats “Must include grade A in Mathematics” under its contextual heading, so the reduction applies to the aggregate only.',
  },
  gcse: 'No GCSE requirement is published on this course page or its entry-requirements page.',
  studyOptions: [],
  verification: 'verified',
  identityVerification: 'official-page',
  identityNote:
    'KCL’s own course page and its dedicated entry-requirements page were both read in a rendered browser on 2026-09-28. Both print the title “General Engineering BEng”, UCAS code H100 and a three-year duration. THIS RECORD IS WHAT PROVES THE v0.8 CORRECTION: a scaffold row had held H100 against an MEng, and KCL publishes H100 as this BEng and H101 as the MEng.',
  officialUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/general-engineering-beng',
  sourceUrl: 'https://www.kcl.ac.uk/study/undergraduate/courses/general-engineering-beng/entry-requirements',
  sourceTitle: 'General Engineering - Entry Requirements - General Engineering BEng | King’s College London',
  lastVerified: READ_ON,
  notes:
    'MATHEMATICS ALONE. No second science or technology subject is named, which is permissive for an engineering degree at AAA — compare Bath’s Electrical and Electronic Engineering MEng, which asks Mathematics plus a second science at the same A grade, or Queen Mary’s Biomedical Engineering, which asks Mathematics plus one of three sciences. THREE YEARS, WHERE ITS MEng SIBLING H101 IS FOUR: that difference is why they are two applications rather than one. KCL PUBLISHES AN EXPLICIT EPQ EXCLUSION, which is the reverse of most universities in this catalogue: “We do not consider the EPQ at any point of the assessment process.” An absence of an EPQ concession and a refusal of one are different facts, and this is the refusal. EXCLUDED SUBJECTS, read on the entry-requirements page: “A-level General Studies, Critical Thinking, Thinking Skills and Global Perspectives are not accepted by King’s as one of your A levels.” PRACTICAL ENDORSEMENT: “If you are taking linear A-levels in England, you will be required to pass the practical endorsement in all Science subjects,” excepting private candidates unable to take the practical component. Deferred entry is supported through UCAS, with second deferrals granted only in extenuating circumstances.',
});
