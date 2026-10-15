import { useState } from 'react';
import type { Course } from '@/types';
import { VERIFICATION_LABEL } from '@/data/taxonomy';
import {
  FURTHER_MATHS_LABEL,
  INTERVIEW_LABEL,
  admissionsTestFullLabel,
  awardLabel,
  durationLabel,
  subjectSummary,
  typicalOfferLabel,
} from '@/lib/format';
import { VERDICT_SHORT } from '@/lib/eligibility';
import { filledGrades } from '@/lib/grades';
import { useApp } from '@/state/AppContext';
import { Collapse } from './ui/Collapse';
import { IconChevron } from './ui/icons';

/**
 * DIFFERENCE STRIP
 *
 * A short summary above the full comparison table that answers one question:
 * where do these courses actually differ? It reads the same course records the
 * table reads and prints each value as text. It never scores, ranks or picks a
 * best course.
 *
 * For each attribute:
 *  - every value the same: the row says "Same" and the values are muted;
 *  - most courses share one value: that value is muted, the odd ones are set in
 *    bold with a dot marker (and the words "differs" for screen readers);
 *  - no value is shared by more than half: every value is marked.
 * Meaning never depends on colour: weight, a marker and text carry it.
 */

type Attr = { id: string; label: string; value: (c: Course) => string; grade?: boolean };

const ATTRS: Attr[] = [
  { id: 'offer', label: 'Typical offer', value: (c) => typicalOfferLabel(c), grade: true },
  { id: 'maths', label: 'Mathematics', value: (c) => subjectSummary(c, 'Mathematics') },
  { id: 'fm', label: 'Further Mathematics', value: (c) => FURTHER_MATHS_LABEL[c.furtherMathematics] },
  { id: 'physics', label: 'Physics', value: (c) => subjectSummary(c, 'Physics') },
  { id: 'chemistry', label: 'Chemistry', value: (c) => subjectSummary(c, 'Chemistry') },
  { id: 'test', label: 'Admissions test', value: (c) => admissionsTestFullLabel(c.admissionsTest) },
  { id: 'interview', label: 'Interview', value: (c) => INTERVIEW_LABEL[c.interview] },
  { id: 'duration', label: 'Duration', value: (c) => durationLabel(c.durationYears, c.durationYearsMax) },
  { id: 'award', label: 'Award', value: (c) => awardLabel(c) },
  { id: 'status', label: 'Data status', value: (c) => VERIFICATION_LABEL[c.provenance.verificationStatus] },
];

export type StripCell = { text: string; kind: 'same' | 'diff' };
export type StripRow = { id: string; label: string; allSame: boolean; cells: StripCell[]; grade: boolean };

/** Pure: which values differ. Exported so the tests can check it without a browser. */
export function buildStripRows(
  courses: Course[],
  extra?: { id: string; label: string; value: (c: Course) => string },
): StripRow[] {
  const attrs: Attr[] = extra ? [...ATTRS.slice(0, 1), extra, ...ATTRS.slice(1)] : ATTRS;
  return attrs.map((a) => {
    const vals = courses.map((c) => a.value(c));
    const freq = new Map<string, number>();
    vals.forEach((v) => freq.set(v, (freq.get(v) ?? 0) + 1));
    const [topValue, topCount] = [...freq.entries()].sort((x, y) => y[1] - x[1])[0];
    const allSame = topCount === vals.length;
    const majority = topCount > vals.length / 2;
    return {
      id: a.id,
      label: a.label,
      allSame,
      grade: Boolean(a.grade),
      cells: vals.map((v) => ({
        text: v,
        kind: allSame || (majority && v === topValue) ? 'same' : 'diff',
      })),
    };
  });
}

export function DifferenceStrip({ courses }: { courses: Course[] }) {
  const { universityById, profile, eligibility } = useApp();
  const [open, setOpen] = useState(true);
  if (courses.length < 2) return null;

  const hasGrades = filledGrades(profile).length > 0;
  const rows = buildStripRows(
    courses,
    hasGrades
      ? {
          id: 'verdict',
          label: 'Your result',
          value: (c) => VERDICT_SHORT[eligibility[c.id]?.verdict ?? 'insufficient-information'],
        }
      : undefined,
  );
  const differing = rows.filter((r) => !r.allSame).length;

  return (
    <section className="ds" aria-labelledby="ds-h">
      <div className="ds-head">
        <h2 id="ds-h">Where they differ</h2>
        <button
          type="button"
          className="disclose"
          aria-expanded={open}
          aria-controls="ds-body"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Hide' : 'Show'}
          <IconChevron width={14} height={14} aria-hidden />
        </button>
      </div>
      <p className="ds-sum" role="status">
        {differing === 0
          ? `All ${rows.length} attributes shown here are the same across these courses.`
          : `${differing} of ${rows.length} attributes differ. A dot marks a value that differs from most of the others.`}
      </p>
      <Collapse open={open} id="ds-body">
        <div className="ds-scroll" tabIndex={0} role="region" aria-label="Differences between the selected courses, scrollable">
          <table className="ds-table" style={{ ['--n' as string]: courses.length }}>
            <caption className="sr-only">Selected courses, with the values that differ marked</caption>
            <thead>
              <tr>
                <th scope="col">Attribute</th>
                {courses.map((c) => (
                  <th scope="col" key={c.id}>
                    <span className="ds-uni">{universityById[c.universityId]?.shortName ?? ''}</span>
                    <span className="ds-course">{c.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} data-same={r.allSame || undefined}>
                  <th scope="row">
                    {r.label}
                    {r.allSame ? <span className="ds-tag">same</span> : null}
                  </th>
                  {r.cells.map((cell, i) => (
                    <td key={courses[i].id} className={`ds-${cell.kind}${r.grade ? ' ds-grade' : ''}`}>
                      {cell.kind === 'diff' ? (
                        <>
                          <span className="ds-dot" aria-hidden />
                          <span className="sr-only">Differs: </span>
                        </>
                      ) : null}
                      {cell.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ds-foot">
          A summary of what each university publishes. It does not rank or score the courses; the full table below
          stays the complete record.
        </p>
      </Collapse>
    </section>
  );
}
