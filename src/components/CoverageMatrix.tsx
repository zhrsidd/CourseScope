import type { Course, SubjectCategory, University, VerificationStatus } from '@/types';

/**
 * COVERAGE MATRIX
 *
 * One row per university, one column per subject area and entry year, one tile
 * per course record. A tile is a count made visible: it says which verification
 * state a record is in and nothing else. Nothing is scored, weighted or ranked;
 * rows are alphabetical.
 *
 * It is a real table. Each cell carries its counts as text for assistive
 * technology, the tiles are decoration for sighted readers, and the footer row
 * totals every column so the matrix can be checked against the catalogue.
 */

export type CoverageState = 'verified' | 'partial' | 'awaiting-data' | 'awaiting-publication' | 'other';

const STATE_LABEL: Record<CoverageState, string> = {
  verified: 'verified',
  partial: 'partially verified',
  'awaiting-data': 'not verified by us yet',
  'awaiting-publication': 'not yet published by the university',
  other: 'other',
};

const STATES: CoverageState[] = ['verified', 'partial', 'awaiting-data', 'awaiting-publication', 'other'];

export function coverageState(status: VerificationStatus): CoverageState {
  if (status === 'verified') return 'verified';
  if (status === 'partially-verified') return 'partial';
  if (status === 'awaiting-data') return 'awaiting-data';
  if (status === 'awaiting-publication') return 'awaiting-publication';
  return 'other';
}

export type CoverageColumn = { key: string; category: SubjectCategory; year: string; label: string };
export type CoverageCell = Record<CoverageState, number> & { total: number };
export type CoverageRow = { id: string; name: string; short: string; cells: Record<string, CoverageCell> };

const CATEGORY_LABEL: Record<SubjectCategory, string> = { physics: 'Physics', engineering: 'Engineering' };

const empty = (): CoverageCell => ({
  verified: 0,
  partial: 0,
  'awaiting-data': 0,
  'awaiting-publication': 0,
  other: 0,
  total: 0,
});

export function buildCoverage(courses: Course[], universities: University[]) {
  const columns: CoverageColumn[] = [];
  for (const year of [...new Set(courses.map((c) => c.applicationYear).filter(Boolean) as string[])].sort()) {
    for (const category of ['physics', 'engineering'] as SubjectCategory[]) {
      if (courses.some((c) => c.applicationYear === year && c.subjectCategory === category)) {
        columns.push({ key: `${category}-${year}`, category, year, label: `${CATEGORY_LABEL[category]} ${year}` });
      }
    }
  }
  const rows: CoverageRow[] = universities
    .map((u) => {
      const cells: Record<string, CoverageCell> = {};
      for (const col of columns) cells[col.key] = empty();
      for (const c of courses) {
        if (c.universityId !== u.id || !c.applicationYear) continue;
        const cell = cells[`${c.subjectCategory}-${c.applicationYear}`];
        if (!cell) continue;
        cell[coverageState(c.provenance.verificationStatus)] += 1;
        cell.total += 1;
      }
      return { id: u.id, name: u.name, short: u.shortName ?? u.name, cells };
    })
    .filter((r) => Object.values(r.cells).some((c) => c.total > 0))
    .sort((a, b) => a.short.localeCompare(b.short));
  const totals: Record<string, CoverageCell> = {};
  for (const col of columns) {
    const t = empty();
    for (const r of rows) {
      for (const s of STATES) t[s] += r.cells[col.key][s];
      t.total += r.cells[col.key].total;
    }
    totals[col.key] = t;
  }
  return { columns, rows, totals };
}

function describe(cell: CoverageCell): string {
  if (cell.total === 0) return 'No courses';
  return STATES.filter((s) => cell[s] > 0)
    .map((s) => `${cell[s]} ${STATE_LABEL[s]}`)
    .join(', ');
}

function Tiles({ cell }: { cell: CoverageCell }) {
  return (
    <span className="cm-tiles" aria-hidden="true">
      {STATES.flatMap((s) => Array.from({ length: cell[s] }, (_, i) => <i key={`${s}${i}`} className={`cm-t cm-${s}`} />))}
    </span>
  );
}

export function CoverageMatrix({ courses, universities }: { courses: Course[]; universities: University[] }) {
  const { columns, rows, totals } = buildCoverage(courses, universities);
  // A column in which every record is waiting on the university is a count, not a picture.
  const countOnly = (key: string) => totals[key].total > 0 && totals[key].total === totals[key]['awaiting-publication'];
  const used = STATES.filter((s) => columns.some((c) => !countOnly(c.key) && totals[c.key][s] > 0));
  return (
    <figure className="cm" data-testid="coverage-matrix">
      <div className="cm-scroll" role="region" aria-label="Coverage by university, scrollable" tabIndex={0}>
        <table className="cm-table">
          <caption className="sr-only">
            Course records by university, subject area and entry year, with the verification state of each. Listed alphabetically.
          </caption>
          <thead>
            <tr>
              <th scope="col">University</th>
              {columns.map((c) => (
                <th scope="col" key={c.key}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} data-uni={r.id}>
                <th scope="row">
                  <span className="cm-name-long">{r.name}</span>
                  <span className="cm-name-short" aria-hidden="true">{r.short}</span>
                </th>
                {columns.map((c) => {
                  const cell = r.cells[c.key];
                  return (
                    <td key={c.key} data-total={cell.total}>
                      {cell.total === 0 ? (
                        <span className="cm-none" aria-label="No courses">–</span>
                      ) : countOnly(c.key) ? (
                        <span className="cm-count">{cell.total} not yet published</span>
                      ) : (
                        <>
                          <Tiles cell={cell} />
                          <span className="sr-only">{describe(cell)}</span>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">All universities</th>
              {columns.map((c) => (
                <td key={c.key} data-total={totals[c.key].total}>
                  <b>{totals[c.key].total}</b>
                  <span className="cm-foot-sub">
                    {totals[c.key].verified + totals[c.key].partial > 0
                      ? `${totals[c.key].verified + totals[c.key].partial} verified`
                      : describe(totals[c.key])}
                  </span>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <figcaption className="cm-legend">
        {used.map((s) => (
          <span key={s}>
            <i className={`cm-t cm-${s}`} aria-hidden="true" /> {STATE_LABEL[s][0].toUpperCase() + STATE_LABEL[s].slice(1)}
          </span>
        ))}
        <span className="cm-legend-note">One tile is one course record. Alphabetical, not ranked.</span>
      </figcaption>
    </figure>
  );
}
