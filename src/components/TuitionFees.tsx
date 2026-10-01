import type { Course, TuitionFee } from '@/types';
import { FEE_RESEARCHED_YEARS, FEES_2028_CHECKED_ON, feesForCourse } from '@/data/tuition-fees';
import {
  FEE_BASIS_LABEL,
  FEE_STALE_AFTER_DAYS,
  feeDisplayState,
  formatGBP,
  type FeeDisplayState,
} from '@/lib/fees';
import { formatDate } from '@/lib/format';
import { IconExternal } from './ui/icons';
import { Badge, Card, NoData, SectionTitle } from './ui/primitives';

const SCOPE_LABEL: Record<TuitionFee['scope'], string> = {
  course: 'Course page',
  'fee-band': 'University fee table',
  'university-wide': 'University-wide statement',
};

/** Rows that may be shown at all: never another year's, never an unsourced figure. */
export function displayableFees(course: Course, today: Date = new Date()) {
  return feesForCourse(course)
    .map((fee) => ({ fee, state: feeDisplayState(fee, course, today) }))
    .filter((r) => r.state !== 'wrong-year' && r.state !== 'unsourced');
}

function FeeValue({ fee, state }: { fee: TuitionFee; state: FeeDisplayState }) {
  if (state === 'current' && fee.amount !== null) {
    return (
      <span>
        <span className="text-base font-semibold tabular-nums text-navy-950">{formatGBP(fee.amount)}</span>{' '}
        <span className="text-xs text-ink-muted">{FEE_BASIS_LABEL[fee.basis]}</span>
      </span>
    );
  }
  if (state === 'stale') {
    return (
      <span className="text-sm text-amber-900">
        Needs re-checking — last verified {formatDate(fee.lastVerified)}
      </span>
    );
  }
  if (state === 'awaiting') {
    return (
      <span className="text-sm text-amber-900">
        Not yet confirmed
        {fee.indicativeAmount !== null ? (
          <span className="block text-xs text-ink-muted">
            The university gives {formatGBP(fee.indicativeAmount)} as an expected figure, not a confirmed fee.
          </span>
        ) : null}
      </span>
    );
  }
  return <span className="text-sm text-ink-muted">Not established</span>;
}

const STATE_BADGE: Record<FeeDisplayState, { label: string; tone: 'green' | 'amber' | 'slate' } | null> = {
  current: { label: 'Published', tone: 'green' },
  awaiting: { label: 'Awaiting publication', tone: 'amber' },
  unknown: { label: 'Unknown', tone: 'slate' },
  stale: { label: 'Out of date', tone: 'amber' },
  'wrong-year': null,
  unsourced: null,
};

/**
 * The course page's Tuition fees section. Its own card, after the admissions
 * cards, so a fee can never be read as part of the entry requirements — and it
 * says so in one line.
 */
export function TuitionFees({ course }: { course: Course }) {
  const rows = displayableFees(course);
  const year = course.applicationYear;
  const researched = FEE_RESEARCHED_YEARS.has(year);
  const courseUrl = course.provenance.officialUrl;

  return (
    <Card className="p-4">
      <div data-testid="tuition-fees">
        <SectionTitle id="tuition-fees">Tuition fees</SectionTitle>
        <p className="-mt-1 mb-3 text-xs leading-relaxed text-ink-muted">
          {year} entry. Fees are shown for information only — they are not entry requirements and play no
          part in the eligibility check.
        </p>

        {rows.length === 0 ? (
          <div className="rounded border border-slate-200 bg-slate-50/70 p-2.5 text-sm" data-fee-state="none">
            {researched ? (
              <NoData>Fees for {year} entry are not recorded for this course yet</NoData>
            ) : (
              <>
                <span className="text-amber-900">Not yet published for {year} entry.</span>
                <span className="mt-1 block text-xs text-ink-muted">
                  No university in CourseScope had published {year}-entry fees when last checked (
                  {formatDate(FEES_2028_CHECKED_ON)}). Fees from earlier entry years are not carried forward.
                </span>
              </>
            )}
            {courseUrl ? (
              <a
                href={courseUrl}
                target="_blank"
                rel="noreferrer"
                className="link mt-1.5 inline-flex items-center gap-1 text-xs"
              >
                Check the university’s course page <IconExternal width={11} height={11} />
              </a>
            ) : null}
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 rounded border border-slate-200">
            {rows.map(({ fee, state }) => {
              const badge = STATE_BADGE[state];
              return (
                <li
                  key={fee.category}
                  className="p-2.5"
                  data-fee-category={fee.category}
                  data-fee-state={state}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                    <span className="min-w-0 break-words text-sm font-medium text-ink">{fee.category}</span>
                    {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
                  </div>
                  <div className="mt-1">
                    <FeeValue fee={fee} state={state} />
                  </div>
                  {fee.basisNote && state === 'current' ? (
                    <p className="mt-0.5 text-xs text-ink-muted">{fee.basisNote}</p>
                  ) : null}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-ink-faint">
                    <span>Applies to {fee.feeYear} entry</span>
                    <span aria-hidden>·</span>
                    <span>{SCOPE_LABEL[fee.scope]}</span>
                    {fee.lastVerified ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>Verified {formatDate(fee.lastVerified)}</span>
                      </>
                    ) : null}
                    {fee.sourceUrl ? (
                      <>
                        <span aria-hidden>·</span>
                        <a
                          href={fee.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="link inline-flex max-w-full items-center gap-1 break-all"
                        >
                          {fee.sourceTitle ?? 'Official source'} <IconExternal width={10} height={10} />
                        </a>
                      </>
                    ) : null}
                  </div>
                  {fee.note && state !== 'current' ? (
                    <details className="mt-1.5">
                      <summary className="cursor-pointer text-[11px] font-medium text-navy-700">
                        {state === 'unknown' ? 'Why this is not established' : 'What the university says'}
                      </summary>
                      <p className="mt-1 break-words text-xs leading-relaxed text-ink-muted">{fee.note}</p>
                    </details>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-2.5 text-[11px] leading-relaxed text-ink-faint">
          Labels are the university’s own fee categories. Which one applies to you depends on your fee status,
          which the university assesses. Fees can rise in later years of study. A published fee not re-checked
          within {Math.round(FEE_STALE_AFTER_DAYS / 30)} months is shown as out of date rather than current.
        </p>
      </div>
    </Card>
  );
}

/** Compact form for the comparison table. */
export function TuitionFeesCompact({ course }: { course: Course }) {
  const rows = displayableFees(course);
  if (rows.length === 0) {
    return (
      <span className="italic text-slate-400">
        {FEE_RESEARCHED_YEARS.has(course.applicationYear)
          ? 'Not recorded'
          : `Not yet published for ${course.applicationYear} entry`}
      </span>
    );
  }
  return (
    <ul className="space-y-1" data-testid="compare-fees">
      {rows.map(({ fee, state }) => (
        <li key={fee.category}>
          <span className="block text-xs text-ink-faint">{fee.category}</span>
          {state === 'current' && fee.amount !== null ? (
            <span className="font-semibold tabular-nums">
              {formatGBP(fee.amount)}
              {fee.basis !== 'per-year' ? (
                <span className="ml-1 text-xs font-normal text-ink-muted">({FEE_BASIS_LABEL[fee.basis]})</span>
              ) : null}
            </span>
          ) : (
            <span className="text-xs italic text-ink-muted">
              {state === 'awaiting' ? 'Not yet confirmed' : state === 'stale' ? 'Needs re-checking' : 'Not established'}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
