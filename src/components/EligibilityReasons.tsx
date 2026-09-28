import type { Course, EligibilityReport } from '@/types';
import { explainEligibility, reviewKind, type EligibilityReason } from '@/lib/explain';
import { cx } from './ui/primitives';

const DOT: Record<EligibilityReason['tone'], string> = {
  fail: 'bg-red-500',
  review: 'bg-amber-500',
  pass: 'bg-emerald-500',
  info: 'bg-slate-400',
};

/**
 * Why a verdict came out the way it did, in the engine's own words.
 *
 * Nothing here decides anything: `explainEligibility` only selects and orders
 * the parts the eligibility engine already produced, so a reason shown to a
 * student always corresponds to a requirement the engine actually evaluated.
 */
export function EligibilityReasons({
  report,
  course,
  limit,
  className,
}: {
  report: EligibilityReport;
  course: Course;
  limit?: number;
  className?: string;
}) {
  const reasons = explainEligibility(report, course, limit);
  if (!reasons.length) return null;
  const kind = reviewKind(report, course);
  return (
    <div className={className}>
      <ul className="space-y-1.5">
        {reasons.map((r) => (
          <li key={r.id} className="flex gap-2 text-xs leading-relaxed text-ink">
            <span className={cx('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', DOT[r.tone])} aria-hidden />
            <span>
              <span className="font-medium">{r.label}:</span> {r.detail}
            </span>
          </li>
        ))}
      </ul>
      {kind === 'unscorable-grade-profile' ? (
        <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
          The university publishes a grade range rather than a single profile. This catalogue stores
          ranges exactly as published rather than converting them into one threshold, so the overall
          grade check is left for you to read — the subject conditions above are still checked.
        </p>
      ) : null}
      {kind === 'manual-review-pathway' ? (
        <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
          This course publishes a requirement that has to be judged case by case, so the overall
          result is left for a human to confirm.
        </p>
      ) : null}
      {kind === 'conditional-requirement' ? (
        <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
          One requirement depends on a circumstance this profile does not record, so it cannot be
          decided either way here.
        </p>
      ) : null}
    </div>
  );
}
