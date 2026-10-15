import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ALevelGrade, Course } from '@/types';
import { GRADE_VALUE } from '@/types';
import { primaryOffer } from '@/lib/format';
import { useApp } from '@/state/AppContext';
import { Collapse } from './ui/Collapse';
import { IconChevron } from './ui/icons';

/**
 * OFFER LADDER
 *
 * The published standard A-Level offer of every course in the current results,
 * grouped by grade combination. Each rung is a CATEGORY ("A*AA"), not a score:
 * rungs are spaced evenly, there is no numeric axis, and the picture never says
 * one course is "worth" more than another. Rungs are ordered from the most
 * demanding combination to the least, which is all the order means.
 *
 * Only what is published is placed:
 *  - an offer whose wording reduces to a list of grades sits on a rung;
 *  - an offer published as a range or in words is listed as printed, off the ladder;
 *  - a course with no published offer is counted and not drawn.
 * Nothing is estimated, and contextual offers are never used.
 *
 * Every rung opens into the list of its courses, each linking to its own page,
 * and the same data is available as a table.
 */

export type Rung = { key: string; grades: ALevelGrade[]; courses: Course[] };
export type LadderModel = {
  rungs: Rung[];
  asPrinted: { course: Course; text: string }[];
  unplaced: Course[];
  placed: number;
};

function compareCombos(a: ALevelGrade[], b: ALevelGrade[]): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const d = GRADE_VALUE[b[i]] - GRADE_VALUE[a[i]];
    if (d !== 0) return d; // higher grade first
  }
  return b.length - a.length; // more grades demanded first
}

export function buildLadder(courses: Course[]): LadderModel {
  const map = new Map<string, Rung>();
  const asPrinted: LadderModel['asPrinted'] = [];
  const unplaced: Course[] = [];
  for (const c of courses) {
    const offer = c.requirementsPublicationStatus === 'not-yet-published' ? null : primaryOffer(c);
    if (!offer || offer.isContextual) {
      unplaced.push(c);
      continue;
    }
    const g = offer.gradeProfileGrades;
    if (!g || g.length === 0) {
      asPrinted.push({ course: c, text: offer.gradeProfile });
      continue;
    }
    const key = g.join('');
    const rung = map.get(key) ?? { key, grades: g, courses: [] };
    rung.courses.push(c);
    map.set(key, rung);
  }
  const rungs = [...map.values()].sort((a, b) => compareCombos(a.grades, b.grades));
  return { rungs, asPrinted, unplaced, placed: rungs.reduce((n, r) => n + r.courses.length, 0) };
}

const FIRST = 10;
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function OfferLadder({ courses }: { courses: Course[] }) {
  const { universityById } = useApp();
  const model = useMemo(() => buildLadder(courses), [courses]);
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState(false);
  const [openRung, setOpenRung] = useState<string | null>(null);
  const [whole, setWhole] = useState<string | null>(null);
  const [allPrinted, setAllPrinted] = useState(false);
  const uni = (c: Course) => universityById[c.universityId]?.shortName ?? universityById[c.universityId]?.name ?? '';
  const max = Math.max(1, ...model.rungs.map((r) => r.courses.length));

  if (model.rungs.length === 0 && model.asPrinted.length === 0) return null;

  // Courses placed here by their standard offer that also publish a different offer
  // (another grade combination, a Further Maths route…). Only the standard one is drawn.
  const withOthers = model.rungs.reduce((n, r) => n + r.courses.filter((c) => c.offers.length > 1).length, 0);

  const list = (cs: Course[]) =>
    [...cs].sort((a, b) => uni(a).localeCompare(uni(b)) || a.name.localeCompare(b.name));

  return (
    <section className="ol" aria-labelledby="ol-h" data-testid="offer-ladder">
      <button
        type="button"
        className="disclose ol-toggle"
        aria-expanded={open}
        aria-controls="ol-body"
        onClick={() => setOpen((o) => !o)}
      >
        <IconChevron width={14} height={14} />
        <span id="ol-h">Offers across these courses</span>
        <span className="ol-sum">
          {plural(model.rungs.length, 'grade combination')} · {plural(model.placed, 'course')}
        </span>
      </button>
      <Collapse open={open} id="ol-body">
        <div className="ol-inner">
          <p className="ol-note">
            Published standard offers for the courses listed below, grouped by grade combination. Rungs
            run from the most demanding combination to the least; the gaps between them are not equal
            differences, and a rung says nothing about your chances.
          </p>
          <p className="ol-limits">
            Each course sits on one rung, by its <b>standard offer</b>. {withOthers > 0
              ? `${plural(withOthers, 'course')} here ${withOthers === 1 ? 'also publishes' : 'also publish'} another offer — an alternative grade combination or route — which is not drawn; open the course for ${withOthers === 1 ? 'it' : 'them'}. `
              : 'Alternative offers a course publishes would not be drawn here; the course page lists them. '}
            Contextual offers are never used, and a published offer is what the university states, not what it will make you.
          </p>

          {!table ? (
            <ol className="ol-rungs">
              {model.rungs.map((r) => {
                const isOpen = openRung === r.key;
                return (
                  <li key={r.key} className="ol-rung" data-rung={r.key} data-count={r.courses.length}>
                    <button
                      type="button"
                      className="ol-rung-btn"
                      aria-expanded={isOpen}
                      aria-controls={`ol-r-${r.key}`}
                      onClick={() => setOpenRung(isOpen ? null : r.key)}
                    >
                      <span className="ol-grades">{r.grades.join('')}</span>
                      <span className="ol-bar" aria-hidden="true">
                        <i style={{ width: `${(r.courses.length / max) * 100}%` }} />
                      </span>
                      <span className="ol-n">
                        {plural(r.courses.length, 'course')}
                        <span className="sr-only">, {isOpen ? 'hide' : 'show'} list</span>
                      </span>
                    </button>
                    <Collapse open={isOpen} id={`ol-r-${r.key}`}>
                      <ul className="ol-courses">
                        {list(r.courses)
                          .slice(0, whole === r.key ? undefined : FIRST)
                          .map((c) => (
                            <li key={c.id}>
                              <span>{uni(c)}</span> <Link to={`/course/${c.id}`}>{c.name}</Link>
                            </li>
                          ))}
                      </ul>
                      {r.courses.length > FIRST && whole !== r.key ? (
                        <button type="button" className="link ol-more" onClick={() => setWhole(r.key)}>
                          Show all {r.courses.length} courses at {r.grades.join('')}
                        </button>
                      ) : null}
                    </Collapse>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="ol-table-wrap" role="region" aria-label="Offers as a table, scrollable" tabIndex={0}>
              <table className="ol-table" role="table">
                <caption className="sr-only">Published standard offers by grade combination</caption>
                <thead role="rowgroup">
                  <tr role="row">
                    <th scope="col" role="columnheader">Offer</th>
                    <th scope="col" role="columnheader">Courses</th>
                    <th scope="col" role="columnheader">Which</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {model.rungs.map((r) => (
                    <tr key={r.key} role="row">
                      <th scope="row" role="rowheader" data-label="Offer">{r.grades.join('')}</th>
                      <td role="cell" data-label="Courses">{r.courses.length}</td>
                      <td role="cell" data-label="Which">
                        <ul className="ol-which">
                          {list(r.courses).map((c) => (
                            <li key={c.id}>
                              {uni(c)}: {c.name}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {model.asPrinted.length > 0 || model.unplaced.length > 0 ? (
            <div className="ol-off">
              {model.asPrinted.length > 0 ? (
                <>
                  <h3>Published as a range or in words — shown as printed, not placed</h3>
                  <ul>
                    {list(model.asPrinted.map((a) => a.course))
                      .slice(0, allPrinted ? undefined : FIRST)
                      .map((c) => (
                        <li key={c.id}>
                          <span>{uni(c)}</span> <Link to={`/course/${c.id}`}>{c.name}</Link>:{' '}
                          <q>{model.asPrinted.find((a) => a.course.id === c.id)?.text}</q>
                        </li>
                      ))}
                  </ul>
                  {model.asPrinted.length > FIRST && !allPrinted ? (
                    <button type="button" className="link ol-more" onClick={() => setAllPrinted(true)}>
                      Show all {model.asPrinted.length} courses published this way
                    </button>
                  ) : null}
                </>
              ) : null}
              {model.unplaced.length > 0 ? (
                <p className="ol-fine">
                  {plural(model.unplaced.length, 'course')} in these results {model.unplaced.length === 1 ? 'has' : 'have'} no
                  published offer to place.
                </p>
              ) : null}
            </div>
          ) : null}

          <button type="button" className="link ol-alt" aria-pressed={table} onClick={() => setTable((t) => !t)}>
            {table ? 'Show as a ladder' : 'Show as a table'}
          </button>
        </div>
      </Collapse>
    </section>
  );
}
