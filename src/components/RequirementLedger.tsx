import type { Course, EligibilityPart, EligibilityReport, OfferPathway, PartOutcome } from '@/types';
import { FURTHER_MATHS_LABEL, admissionsTestFullLabel, primaryOffer, subjectSummary } from '@/lib/format';
import { filledGrades, findProfileGrade, sortGradesDesc, subjectsMatch } from '@/lib/grades';
import type { StudentProfile } from '@/types';
import { IconCheck, IconCross, IconQuestion, IconWarning } from './ui/icons';

/**
 * REQUIREMENT LEDGER
 *
 * One table that puts three things side by side for each requirement a
 * university publishes: what it PUBLISHED, what the student ENTERED, and what the
 * eligibility engine RESULTED. Nothing here decides anything.
 *
 *  - "Published" is read from the course record (the pathway the engine itself
 *    chose as the best match, or the standard pathway when there are no grades).
 *  - "Your grades" is read from the student's own profile.
 *  - "Result" and the note are the engine's own `EligibilityPart`, unchanged.
 *
 * Without grades the ledger is still useful: it is the published requirements,
 * laid out one per line, with the last two columns replaced by a single prompt.
 * It never prints a row of "Unknown" per requirement.
 */

type Row = {
  id: string;
  label: string;
  published: string;
  yours: string | null;
  outcome: PartOutcome | null;
  note: string | null;
};

const RESULT: Record<PartOutcome, { word: string; cls: string }> = {
  pass: { word: 'Meets', cls: 'rl-ok' },
  fail: { word: 'Not met', cls: 'rl-no' },
  review: { word: 'Needs review', cls: 'rl-rev' },
  advisory: { word: 'Advisory', cls: 'rl-wait' },
  unknown: { word: 'Not checked', cls: 'rl-rev' },
  'not-required': { word: 'Not required', cls: 'rl-mute' },
};

function ResultIcon({ outcome }: { outcome: PartOutcome }) {
  const p = { width: 14, height: 14, 'aria-hidden': true as const };
  if (outcome === 'pass') return <IconCheck {...p} />;
  if (outcome === 'fail') return <IconCross {...p} />;
  if (outcome === 'review' || outcome === 'advisory') return <IconWarning {...p} />;
  if (outcome === 'not-required') return <span aria-hidden>–</span>;
  return <IconQuestion {...p} />;
}

const ORDER: Record<PartOutcome, number> = {
  fail: 0,
  review: 1,
  unknown: 2,
  advisory: 3,
  pass: 4,
  'not-required': 5,
};

/** What the university published for one subject, from the pathway being checked. */
function publishedForSubject(course: Course, offer: OfferPathway | null, subject: string): string {
  const req = offer?.subjectRequirements.find((r) => subjectsMatch(r.subject, subject));
  if (req) {
    const word = req.required ? 'Required' : req.recommended ? 'Recommended' : 'Listed';
    const min = req.minimumGrade ? `, minimum ${req.minimumGrade}` : '';
    const alt = req.acceptedAlternatives.length ? `, or ${req.acceptedAlternatives.join(' / ')}` : '';
    return `${word}${min}${alt}`;
  }
  if (subjectsMatch(subject, 'Further Mathematics')) return FURTHER_MATHS_LABEL[course.furtherMathematics];
  return subjectSummary(course, subject);
}

function yoursForSubject(
  profile: StudentProfile,
  course: Course,
  offer: OfferPathway | null,
  subject: string,
): string {
  const req = offer?.subjectRequirements.find((r) => subjectsMatch(r.subject, subject));
  const hit = findProfileGrade(filledGrades(profile), subject, req?.acceptedAlternatives ?? []);
  void course;
  if (!hit) return 'Not taking';
  return subjectsMatch(hit.subject, subject) ? hit.grade : `${hit.subject} ${hit.grade}`;
}

export function buildLedgerRows(
  course: Course,
  report: EligibilityReport,
  profile: StudentProfile,
): { rows: Row[]; notRequired: string[]; hasGrades: boolean; offer: OfferPathway | null } {
  const offer = course.offers.find((o) => o.id === report.bestPathwayId) ?? primaryOffer(course);
  const entries = filledGrades(profile);
  const hasGrades = entries.length > 0;
  const mine = sortGradesDesc(entries.map((e) => e.grade)).join(' ');

  const core: { part: EligibilityPart; subject: string | null }[] = [
    { part: report.overallGrades, subject: null },
    { part: report.mathematics, subject: 'Mathematics' },
    { part: report.furtherMathematics, subject: 'Further Mathematics' },
    { part: report.physics, subject: 'Physics' },
    { part: report.chemistry, subject: 'Chemistry' },
  ];

  const rows: Row[] = [];
  const notRequired: string[] = [];

  for (const { part, subject } of core) {
    if (part.outcome === 'not-required') {
      notRequired.push(part.label);
      continue;
    }
    rows.push({
      id: part.id,
      label: part.label,
      published: subject ? publishedForSubject(course, offer, subject) : (offer?.gradeProfile ?? 'Not recorded'),
      yours: hasGrades ? (subject ? yoursForSubject(profile, course, offer, subject) : mine) : null,
      outcome: hasGrades ? part.outcome : null,
      note: hasGrades ? part.detail : null,
    });
  }

  if (report.otherSubjects.outcome !== 'not-required') {
    const core4 = ['Mathematics', 'Further Mathematics', 'Physics', 'Chemistry'];
    const others = (offer?.subjectRequirements ?? []).filter(
      (r) => !core4.some((c) => subjectsMatch(r.subject, c)),
    );
    rows.push({
      id: report.otherSubjects.id,
      label: report.otherSubjects.label,
      published: others.length
        ? others
            .map((r) => `${r.subject}${r.minimumGrade ? ` ${r.minimumGrade}` : ''}${r.required ? '' : ' (recommended)'}`)
            .join('; ')
        : 'See the university’s wording',
      yours: hasGrades ? 'See note' : null,
      outcome: hasGrades ? report.otherSubjects.outcome : null,
      note: hasGrades ? report.otherSubjects.detail : null,
    });
  }

  report.constraints.forEach((part, i) => {
    const published = offer?.constraints[i]?.description ?? part.label;
    rows.push({
      id: part.id,
      label: part.label,
      published,
      yours: hasGrades ? 'See note' : null,
      outcome: hasGrades ? part.outcome : null,
      note: hasGrades ? part.detail : null,
    });
  });

  if (hasGrades) rows.sort((a, b) => ORDER[a.outcome ?? 'unknown'] - ORDER[b.outcome ?? 'unknown']);

  return { rows, notRequired, hasGrades, offer };
}

export function RequirementLedger({
  course,
  report,
  profile,
  onAddGrades,
}: {
  course: Course;
  report: EligibilityReport;
  profile: StudentProfile;
  onAddGrades?: () => void;
}) {
  const { rows, notRequired, hasGrades } = buildLedgerRows(course, report, profile);
  const test = report.admissionsTest;
  const showYours = hasGrades;
  // The engine's summary is usually the first failing note word for word. Say it once.
  const summaryRepeated = rows.some((r) => r.note && (r.note.includes(report.summary) || report.summary.includes(r.note)));
  const showSummary = hasGrades && !summaryRepeated;

  return (
    <div className="rl" data-testid="requirement-ledger">
      {showSummary ? <p className="rl-summary">{report.summary}</p> : null}
      <table className={showYours ? 'rl-table' : 'rl-table rl-table-bare'}>
        <caption className="sr-only">
          Published requirements{showYours ? ', your grades and the result of each check' : ''}
        </caption>
        <thead>
          <tr>
            <th scope="col">Requirement</th>
            <th scope="col">Published</th>
            {showYours ? <th scope="col">Your grades</th> : null}
            {showYours ? <th scope="col">Result</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const res = r.outcome ? RESULT[r.outcome] : null;
            return (
              <tr key={r.id} data-outcome={r.outcome ?? undefined}>
                <th scope="row" className="rl-req">
                  {r.label}
                </th>
                <td className="rl-pub" data-label="Published">
                  {r.published}
                </td>
                {showYours ? (
                  <td className="rl-you" data-label="Your grades">
                    {r.yours}
                  </td>
                ) : null}
                {showYours && res && r.outcome ? (
                  <td className="rl-res">
                    <span className={`rl-chip ${res.cls}`}>
                      <ResultIcon outcome={r.outcome} />
                      {res.word}
                    </span>
                    {r.note ? <span className="rl-note">{r.note}</span> : null}
                  </td>
                ) : null}
              </tr>
            );
          })}
          <tr className="rl-test">
            <th scope="row" className="rl-req">
              Admissions test
            </th>
            <td className="rl-pub" data-label="Published">
              {admissionsTestFullLabel(course.admissionsTest)}
            </td>
            {showYours ? (
              <td className="rl-you" data-label="Your grades">
                Not graded
              </td>
            ) : null}
            {showYours ? (
              <td className="rl-res">
                <span className="rl-chip rl-mute">Separate from the grade check</span>
                <span className="rl-note">{test.detail}</span>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>

      {!showYours ? (
        <p className="rl-prompt">
          {onAddGrades ? (
            <button type="button" className="link" onClick={onAddGrades}>
              Add your A-Levels
            </button>
          ) : (
            'Add your A-Levels'
          )}{' '}
          to see your own grades and the result of each check beside these requirements.
        </p>
      ) : null}
      {notRequired.length > 0 ? (
        <p className="rl-foot">Not required for this course: {notRequired.join(', ')}.</p>
      ) : null}
    </div>
  );
}
