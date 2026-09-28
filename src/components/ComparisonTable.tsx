import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Course, EligibilityReport, University } from '@/types';
import { ADVISORY_FURTHER_MATHS } from '@/types';
import {
  FURTHER_MATHS_LABEL,
  INTERVIEW_LABEL,
  admissionsTestFullLabel,
  contextualLabel,
  courseSubjectStatus,
  deadlineDateLabel,
  deadlinesForCourse,
  durationLabel,
  formatDate,
  getRanking,
  rankingIsVerified,
  subjectMinimumGrade,
  subjectSummary,
  typicalOfferLabel,
} from '@/lib/format';
import { filledGrades, findProfileGrade, meetsGrade, type ProfileGrade } from '@/lib/grades';
import { keyEligibilityReason } from '@/lib/explain';
import { VERDICT_LABEL } from '@/lib/eligibility';
import { useApp } from '@/state/AppContext';
import { EligibilityBadge } from './EligibilityBadge';
import { VerificationBadge } from './SourceBadge';
import { IconCross, IconExternal } from './ui/icons';
import { cx } from './ui/primitives';

type CellTone = 'green' | 'amber' | 'red' | 'none';

const TONE_CLASS: Record<CellTone, string> = {
  green: 'bg-emerald-50/80',
  amber: 'bg-amber-50/80',
  red: 'bg-rose-50/80',
  none: '',
};

function subjectTone(course: Course, subject: string, entries: ProfileGrade[]): CellTone {
  if (entries.length === 0) return 'none';
  const status = courseSubjectStatus(course, subject);
  if (status === 'unknown') return 'amber';
  if (status === 'not-required') return 'none';
  const hit = findProfileGrade(entries, subject);
  if (!hit) return status === 'required' ? 'red' : 'amber';
  const min = subjectMinimumGrade(course, subject);
  if (min && !meetsGrade(hit.grade, min)) return 'red';
  return 'green';
}

interface Row {
  id: string;
  label: string;
  render: (
    course: Course,
    university: University | undefined,
    report: EligibilityReport | undefined,
  ) => ReactNode;
  tone?: (course: Course, entries: ProfileGrade[]) => CellTone;
  /**
   * How to tell whether this row's value is the SAME across the compared
   * courses. A row without one can never be proved identical, so
   * "show differences only" always keeps it — hiding a requirement because it
   * merely looked the same would be the worst possible failure here.
   */
  compareKey?: (
    course: Course,
    university: University | undefined,
    report: EligibilityReport | undefined,
  ) => string;
  /** Rows a student is comparing admissions on, which stay visible even when identical. */
  alwaysShow?: boolean;
}

const NA = <span className="italic text-slate-400">Not available</span>;

const ROWS: Row[] = [
  {
    id: 'university',
    label: 'University',
    render: (_c, u) => (u ? <Link to={`/university/${u.slug}`} className="link">{u.name}</Link> : NA),
    compareKey: (_c, u) => u?.id ?? '',
  },
  {
    id: 'course',
    label: 'Course',
    render: (c) => (
      <Link to={`/course/${c.id}`} className="link">
        {c.name}
      </Link>
    ),
  },
  { id: 'degree', label: 'Degree', render: (c) => c.degreeType, compareKey: (c) => c.degreeType },
  {
    id: 'award',
    label: 'Award',
    render: (c) => c.awardLabel ?? c.degreeType,
    compareKey: (c) => c.awardLabel ?? c.degreeType,
  },
  {
    id: 'ucas',
    label: 'UCAS code',
    render: (c) => (c.courseCode ? <span className="font-mono text-[13px]">{c.courseCode}</span> : NA),
    compareKey: (c) => c.courseCode ?? '',
  },
  {
    id: 'duration',
    label: 'Duration',
    render: (c) => durationLabel(c.durationYears),
    compareKey: (c) => String(c.durationYears),
  },
  { id: 'entry-year', label: 'Entry year', render: (c) => c.applicationYear, compareKey: (c) => c.applicationYear },
  {
    id: 'offer',
    label: 'Typical A-Level offer',
    render: (c) => <span className="font-semibold tabular-nums text-navy-950">{typicalOfferLabel(c)}</span>,
    compareKey: (c) => typicalOfferLabel(c),
  },
  {
    id: 'pathways',
    label: 'Offer pathways',
    render: (c) =>
      c.offers.length === 0 ? (
        <span className="italic text-slate-400">None recorded</span>
      ) : (
        <ul className="space-y-1">
          {c.offers.map((o) => (
            <li key={o.id}>
              <span className="font-semibold tabular-nums">{o.gradeProfile}</span>{' '}
              <span className="text-xs text-ink-faint">{o.label}</span>
            </li>
          ))}
        </ul>
      ),
    compareKey: (c) => c.offers.map((o) => o.gradeProfile).join('/'),
  },
  {
    id: 'eligibility',
    label: 'Your eligibility',
    render: (_c, _u, report) =>
      report ? (
        <EligibilityBadge verdict={report.verdict} short />
      ) : (
        <span className="italic text-slate-400">Add your grades</span>
      ),
    compareKey: (_c, _u, report) => report?.verdict ?? 'none',
    alwaysShow: true,
  },
  {
    id: 'eligibility-reason',
    label: 'Key reason',
    render: (c, _u, report) => {
      if (!report) return <span className="italic text-slate-400">Add your grades</span>;
      const reason = keyEligibilityReason(report, c);
      return reason ? (
        <span className="text-xs leading-relaxed">
          <span className="font-medium">{reason.label}:</span> {reason.detail}
        </span>
      ) : (
        <span className="text-ink-faint">{VERDICT_LABEL[report.verdict]}</span>
      );
    },
    compareKey: (c, _u, report) => (report ? (keyEligibilityReason(report, c)?.detail ?? '') : ''),
    alwaysShow: true,
  },
  {
    id: 'minimum-standard',
    label: 'Separately published minimum',
    render: (c) =>
      c.minimumEntryStandard ?? <span className="italic text-slate-400">None published</span>,
    compareKey: (c) => c.minimumEntryStandard ?? '',
  },
  {
    id: 'maths',
    label: 'Mathematics',
    render: (c) => subjectSummary(c, 'Mathematics'),
    tone: (c, e) => subjectTone(c, 'Mathematics', e),
    compareKey: (c) => c.mathematics,
  },
  {
    id: 'fm',
    label: 'Further Mathematics',
    render: (c) => FURTHER_MATHS_LABEL[c.furtherMathematics],
    tone: (c, e) => {
      if (e.length === 0) return 'none';
      const has = Boolean(findProfileGrade(e, 'Further Mathematics'));
      if (c.furtherMathematics === 'required') return has ? 'green' : 'red';
      if ((ADVISORY_FURTHER_MATHS as readonly string[]).includes(c.furtherMathematics)) {
        return has ? 'green' : 'amber';
      }
      if (c.furtherMathematics === 'unknown') return 'amber';
      return 'none';
    },
    compareKey: (c) => c.furtherMathematics,
  },
  {
    id: 'physics',
    label: 'Physics',
    render: (c) => subjectSummary(c, 'Physics'),
    tone: (c, e) => subjectTone(c, 'Physics', e),
    compareKey: (c) => c.physics,
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    render: (c) => subjectSummary(c, 'Chemistry'),
    tone: (c, e) => subjectTone(c, 'Chemistry', e),
    compareKey: (c) => c.chemistry,
  },
  {
    id: 'other-subjects',
    label: 'Other subject requirements',
    render: (c) => {
      const named = ['Mathematics', 'Further Mathematics', 'Physics', 'Chemistry'];
      const others = Array.from(
        new Set(
          c.offers
            .flatMap((o) => o.subjectRequirements)
            .filter((r) => !named.includes(r.subject))
            .map((r) => `${r.subject}${r.required ? '' : ' (recommended)'}`),
        ),
      );
      const constraints = Array.from(new Set(c.offers.flatMap((o) => o.constraints.map((x) => x.description))));
      if (others.length === 0 && constraints.length === 0) {
        return <span className="text-ink-faint">None published</span>;
      }
      return (
        <div className="space-y-1">
          {others.length ? <div>{others.join(', ')}</div> : null}
          {constraints.map((d) => (
            <div key={d} className="text-xs text-ink-muted">
              {d}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: 'test',
    label: 'Admissions test',
    render: (c) =>
      c.admissionsTest.code === 'unknown' ? (
        <span className="italic text-slate-400">Not recorded</span>
      ) : (
        <span>
          {admissionsTestFullLabel(c.admissionsTest)}
          {c.admissionsTest.applicationYear ? (
            <span className="ml-1 text-xs text-ink-faint">({c.admissionsTest.applicationYear} entry)</span>
          ) : null}
        </span>
      ),
    compareKey: (c) => `${c.admissionsTest.code}:${c.admissionsTest.requirement}`,
  },
  { id: 'interview', label: 'Interview', render: (c) => INTERVIEW_LABEL[c.interview], compareKey: (c) => c.interview },
  {
    id: 'contextual',
    label: 'Contextual / access offer',
    render: (c) => (
      <div className="space-y-1">
        <div>{contextualLabel(c.contextualOffer)}</div>
        {/*
          Published information only. The engine takes its headline verdict from
          non-contextual pathways, so nothing here can make a student eligible —
          and the label says so rather than leaving it to be inferred.
        */}
        <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
          Not used in headline eligibility
        </div>
        {c.contextualOffer.details ? (
          <div className="text-xs leading-relaxed text-ink-muted">{c.contextualOffer.details}</div>
        ) : null}
      </div>
    ),
    compareKey: (c) => `${c.contextualOffer.availability}:${c.contextualOffer.details ?? ''}`,
    alwaysShow: true,
  },
  {
    id: 'study-options',
    label: 'Routes within this application',
    render: (c) =>
      c.studyOptions.length === 0 ? (
        <span className="italic text-slate-400">None published</span>
      ) : (
        <ul className="space-y-1 text-xs">
          {c.studyOptions.map((o) => (
            <li key={o.name}>
              <span className="font-medium">{o.name}</span>
              {o.chosenWhen ? <span className="block text-ink-faint">{o.chosenWhen}</span> : null}
            </li>
          ))}
        </ul>
      ),
    compareKey: (c) => c.studyOptions.map((o) => o.name).join('|'),
  },
  {
    id: 'placement',
    label: 'Placement / year abroad',
    render: (c) => c.placementOrStudyAbroad ?? <span className="italic text-slate-400">None published</span>,
    compareKey: (c) => c.placementOrStudyAbroad ?? '',
  },
  {
    id: 'gcse',
    label: 'GCSE requirements',
    render: (c) => c.gcseRequirements ?? <span className="italic text-slate-400">None published</span>,
  },
  {
    id: 'deadline',
    label: 'Application deadlines',
    render: (c, u) => {
      const deadlines = deadlinesForCourse(u, c);
      if (deadlines.length === 0) {
        return u?.admissionsOverview.applicationDeadline ?? NA;
      }
      return (
        <ul className="space-y-1">
          {deadlines.map((d) => (
            <li key={d.id}>
              <span className="font-medium">{d.label}</span>
              <span className="block text-xs text-ink-faint">
                {deadlineDateLabel(d)} · {d.applicationYear} entry
              </span>
            </li>
          ))}
        </ul>
      );
    },
    compareKey: (c, u) =>
      deadlinesForCourse(u, c)
        .map((d) => `${d.label}:${d.date ?? '?'}`)
        .join('|'),
  },
  {
    id: 'rank-physics',
    label: 'Physics ranking',
    render: (_c, u) => {
      const r = u ? getRanking(u, 'physics-astronomy') : null;
      return r ? (
        <span>
          <span className="font-semibold tabular-nums">#{r.rank}</span>{' '}
          <span className="text-xs text-ink-faint">
            {r.providerShort} {r.edition}
            {rankingIsVerified(r) ? '' : ' · unverified'}
          </span>
        </span>
      ) : (
        NA
      );
    },
  },
  {
    id: 'rank-engineering',
    label: 'Engineering ranking',
    render: (_c, u) => {
      const r = u ? getRanking(u, 'engineering-technology') : null;
      return r ? (
        <span>
          <span className="font-semibold tabular-nums">#{r.rank}</span>{' '}
          <span className="text-xs text-ink-faint">
            {r.providerShort} {r.edition}
            {rankingIsVerified(r) ? '' : ' · unverified'}
          </span>
        </span>
      ) : (
        NA
      );
    },
  },
  {
    id: 'raw',
    label: 'University’s own wording',
    render: (c) =>
      c.rawRequirementText ? (
        <span className="text-xs italic leading-relaxed text-ink-muted">“{c.rawRequirementText}”</span>
      ) : (
        <span className="italic text-slate-400">Not recorded</span>
      ),
  },
  {
    id: 'source',
    label: 'Official source',
    render: (c) => {
      const link = c.provenance.sourceUrl ?? c.provenance.officialUrl;
      return link ? (
        <a href={link} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
          {c.provenance.sourceTitle ?? 'Official page'} <IconExternal width={12} height={12} />
        </a>
      ) : (
        <span className="italic text-slate-400">No link recorded</span>
      );
    },
  },
  { id: 'verified', label: 'Last verified', render: (c) => formatDate(c.provenance.lastVerified) },
  {
    id: 'status',
    label: 'Data status',
    render: (c) => <VerificationBadge status={c.provenance.verificationStatus} provenance={c.provenance} />,
    compareKey: (c) => c.provenance.verificationStatus,
  },
];

export function ComparisonTable({ courses }: { courses: Course[] }) {
  const { universityById, profile, eligibility, toggleCompare } = useApp();
  const entries = filledGrades(profile);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  /*
   * Which rows differ across the selected courses. A row is only ever treated
   * as IDENTICAL when it has a compareKey and every key matches; anything
   * without a key, and anything marked alwaysShow, stays on screen. This is
   * deliberately conservative: hiding a row that merely looked the same would
   * quietly conceal an admissions requirement, which is the one thing this
   * control must never do.
   */
  const rowDiffers = (row: Row) => {
    if (!row.compareKey) return true;
    const keys = courses.map((c) =>
      row.compareKey!(c, universityById[c.universityId], eligibility[c.id]),
    );
    return keys.length > 1 && new Set(keys).size > 1;
  };
  const visibleRows = differencesOnly
    ? ROWS.filter((row) => row.alwaysShow || rowDiffers(row))
    : ROWS;
  const hiddenCount = ROWS.length - visibleRows.length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={differencesOnly}
            onChange={(e) => setDifferencesOnly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Show differences only
        </label>
        <p className="text-xs text-ink-muted" role="status" aria-live="polite">
          {differencesOnly
            ? `${visibleRows.length} of ${ROWS.length} rows shown — ${hiddenCount} identical across these courses.`
            : `All ${ROWS.length} rows shown.`}
        </p>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">
        This is a side-by-side view of what each university publishes. It does not rank the courses,
        score them, or name a best one — those judgements depend on things no catalogue holds.
      </p>
    <div className="surface scroll-x">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-48 border-b border-r border-slate-200 bg-slate-50 p-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Field
            </th>
            {courses.map((c) => {
              const u = universityById[c.universityId];
              return (
                <th key={c.id} className="min-w-[200px] border-b border-slate-200 bg-white p-3 text-left align-top">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium text-ink-faint">{u?.shortName}</div>
                      <div className="mt-0.5 text-sm font-semibold text-navy-950">{c.name}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCompare(c.id)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
                      aria-label={`Remove ${c.name} from comparison`}
                    >
                      <IconCross width={13} height={13} />
                    </button>
                  </div>
                  <div className="mt-2">
                    <EligibilityBadge verdict={eligibility[c.id]?.verdict ?? 'insufficient-information'} short />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => {
            const differs = Boolean(row.compareKey) && rowDiffers(row);
            return (
              <tr key={row.id} className="align-top">
                <th
                  scope="row"
                  className={cx(
                    'sticky left-0 z-10 border-b border-r border-slate-200 bg-slate-50 p-3 text-left text-xs font-medium text-ink-muted',
                    differs && 'text-navy-900',
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {row.label}
                    {differs ? (
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-navy-500"
                        title="Values differ across the selected courses"
                      />
                    ) : null}
                  </span>
                </th>
                {courses.map((c) => {
                  const tone = row.tone ? row.tone(c, entries) : 'none';
                  return (
                    <td key={c.id} className={cx('border-b border-slate-200 p-3 text-ink', TONE_CLASS[tone])}>
                      {row.render(c, universityById[c.universityId], eligibility[c.id])}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export function ComparisonLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded border border-emerald-200 bg-emerald-50" />
        Your profile appears to satisfy the published requirement
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded border border-amber-200 bg-amber-50" />
        Recommended, unclear, or not recorded
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded border border-rose-200 bg-rose-50" />
        Requirement does not appear to be met
      </span>
      <span className="italic">
        Green means the published academic requirement appears to be met — not that an offer is likely.
      </span>
    </div>
  );
}
