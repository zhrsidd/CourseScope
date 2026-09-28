/**
 * ---------------------------------------------------------------------------
 *  TEST FIXTURES — SYNTHETIC RECORDS, NEVER SERVED TO STUDENTS
 * ---------------------------------------------------------------------------
 *  The catalogue was built with sample admissions data so the engine could be
 *  developed before any real requirements existed. Most of those rows have now
 *  been demoted to identity-only research targets (see `toResearchTarget`),
 *  because invented requirements have no place in front of an applicant.
 *
 *  A handful, though, are the only records exercising particular engine
 *  behaviour. Deleting them would delete the test, so they are pulled out here
 *  instead: they stay in the repository as declared FIXTURES, are handed to the
 *  assertion suite, and are excluded from the production catalogue entirely.
 *  Nothing in `src/data/index.ts`'s `courses` export contains them, so no page,
 *  filter, comparison or admin table can show them.
 *
 *  Each id below records what it is for. If real verified data ever covers the
 *  same behaviour, the fixture can go — but only once the assertion has been
 *  repointed, never before.
 * ---------------------------------------------------------------------------
 */

import type { Course } from '@/types';

export interface FixtureNote {
  id: string;
  /** The engine or validation behaviour this record is the only cover for. */
  exercises: string;
}

export const FIXTURE_NOTES: FixtureNote[] = [
  {
    id: 'manchester-physics--2028',
    exercises:
      'Strongly-recommended Further Mathematics stays advisory: a profile without it still matches, and the Further Maths row reports "advisory" rather than a failure. Also carries a contextual pathway, so it covers the rule that contextual offers never drive the headline verdict.',
  },
  {
    id: 'durham-theoretical-physics--2028',
    exercises:
      'Genuinely REQUIRED Further Mathematics does block a match — the counterpart to the advisory case above.',
  },
  {
    id: 'warwick-physics--2028',
    exercises:
      'Two pathways where one is gated on taking Further Mathematics: the standard route needs a higher profile, the conditional route a lower one. Covers pathway gating by subject.',
  },
  {
    id: 'bristol-physics--2028',
    exercises:
      'A deliberately contradictory record: the pathway publishes AAA but a condition demands an A*. It is the only cover for the `constraint-exceeds-offer-profile` validation rule, and it must keep producing that warning.',
  },
];

export const FIXTURE_IDS: ReadonlySet<string> = new Set(FIXTURE_NOTES.map((f) => f.id));

/** True for records that exist only to be tested against. */
export function isTestFixture(course: Course): boolean {
  return FIXTURE_IDS.has(course.id);
}
