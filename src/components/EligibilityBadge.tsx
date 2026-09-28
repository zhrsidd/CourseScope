import type { EligibilityPart, EligibilityReport, EligibilityVerdict, PartOutcome } from '@/types';
import { VERDICT_LABEL, VERDICT_SHORT } from '@/lib/eligibility';
import { IconCheck, IconCross, IconQuestion, IconWarning } from './ui/icons';
import { Badge, cx } from './ui/primitives';

const VERDICT_TONE: Record<EligibilityVerdict, 'green' | 'amber' | 'red' | 'neutral'> = {
  meets: 'green',
  'review-required': 'amber',
  'does-not-meet': 'red',
  'insufficient-information': 'neutral',
};

function VerdictIcon({ verdict }: { verdict: EligibilityVerdict }) {
  switch (verdict) {
    case 'meets':
      return <IconCheck width={12} height={12} />;
    case 'review-required':
      return <IconWarning width={12} height={12} />;
    case 'does-not-meet':
      return <IconCross width={12} height={12} />;
    default:
      return <IconQuestion width={12} height={12} />;
  }
}

export function EligibilityBadge({
  verdict,
  short = false,
  className,
}: {
  verdict: EligibilityVerdict;
  short?: boolean;
  className?: string;
}) {
  return (
    <Badge
      tone={VERDICT_TONE[verdict]}
      className={cx('whitespace-nowrap', className)}
      title="Based on published academic requirements only. It is not a prediction of an offer."
    >
      <VerdictIcon verdict={verdict} />
      {short ? VERDICT_SHORT[verdict] : VERDICT_LABEL[verdict]}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/* Per-part breakdown                                                  */
/* ------------------------------------------------------------------ */

const OUTCOME_STYLE: Record<PartOutcome, { tone: string; label: string }> = {
  pass: { tone: 'text-emerald-700', label: 'Pass' },
  fail: { tone: 'text-rose-700', label: 'Fail' },
  advisory: { tone: 'text-amber-700', label: 'Advisory' },
  'not-required': { tone: 'text-slate-500', label: 'Not required' },
  review: { tone: 'text-amber-700', label: 'Review' },
  unknown: { tone: 'text-slate-500', label: 'Unknown' },
};

function OutcomeIcon({ outcome }: { outcome: PartOutcome }) {
  switch (outcome) {
    case 'pass':
      return <IconCheck width={14} height={14} />;
    case 'fail':
      return <IconCross width={14} height={14} />;
    case 'advisory':
    case 'review':
      return <IconWarning width={14} height={14} />;
    case 'not-required':
      return <span aria-hidden>–</span>;
    default:
      return <IconQuestion width={14} height={14} />;
  }
}

export function PartRow({ part }: { part: EligibilityPart }) {
  const style = OUTCOME_STYLE[part.outcome];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,150px)_112px_1fr] items-start gap-x-3 gap-y-1 border-b border-slate-100 py-2 last:border-0">
      <div className="text-sm font-medium text-ink">{part.label}</div>
      <div className={cx('flex items-center gap-1.5 whitespace-nowrap text-sm font-medium', style.tone)}>
        <OutcomeIcon outcome={part.outcome} />
        {style.label}
      </div>
      <div className="col-span-2 text-sm leading-relaxed text-ink-muted sm:col-span-1">{part.detail}</div>
    </div>
  );
}

/**
 * The full breakdown. Every part is shown, including the ones that pass, so a
 * student can see exactly which rule the verdict turned on.
 */
export function EligibilityBreakdown({ report }: { report: EligibilityReport }) {
  const parts = [
    report.overallGrades,
    report.mathematics,
    report.physics,
    report.furtherMathematics,
    report.chemistry,
    report.otherSubjects,
    ...report.constraints,
  ];
  const test = report.admissionsTest;
  const testLabel =
    test.outcome === 'required'
      ? 'Required'
      : test.outcome === 'optional'
        ? 'Optional'
        : test.outcome === 'none'
          ? 'None'
          : test.outcome === 'not-announced'
            ? 'Not yet announced'
            : 'Unknown';

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,150px)_112px_1fr] gap-3 border-b border-slate-200 pb-1.5">
        <span className="label">Requirement</span>
        <span className="label">Result</span>
        <span className="label hidden sm:block">Detail</span>
      </div>
      {parts.map((p) => (
        <PartRow key={p.id} part={p} />
      ))}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,150px)_112px_1fr] items-start gap-x-3 gap-y-1 border-t border-slate-200 pt-2">
        <div className="text-sm font-medium text-ink">Admissions test</div>
        <div className="text-sm font-medium text-navy-800">{testLabel}</div>
        <div className="col-span-2 text-sm leading-relaxed text-ink-muted sm:col-span-1">{test.detail}</div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3">
        <span className="text-sm font-semibold text-ink">Final academic match</span>
        <EligibilityBadge verdict={report.verdict} />
      </div>
    </div>
  );
}
