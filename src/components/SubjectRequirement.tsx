import type { SubjectRequirement as SubjectRequirementType } from '@/types';
import { findProfileGrade, meetsGrade, type ProfileGrade } from '@/lib/grades';
import { IconCheck, IconCross, IconWarning } from './ui/icons';
import { Badge, cx } from './ui/primitives';

type Match = 'met' | 'grade-short' | 'missing' | 'recommended-missing' | 'none';

function evaluate(
  requirement: SubjectRequirementType,
  entries: ProfileGrade[] | null,
): { match: Match; studentGrade: string | null } {
  if (!entries || entries.length === 0) return { match: 'none', studentGrade: null };
  const hit = findProfileGrade(entries, requirement.subject, requirement.acceptedAlternatives);
  if (!hit) {
    return {
      match: requirement.required ? 'missing' : 'recommended-missing',
      studentGrade: null,
    };
  }
  if (requirement.minimumGrade && !meetsGrade(hit.grade, requirement.minimumGrade)) {
    return { match: 'grade-short', studentGrade: hit.grade };
  }
  return { match: 'met', studentGrade: hit.grade };
}

const STYLES: Record<Match, string> = {
  met: 'border-emerald-200 bg-emerald-50/60',
  'grade-short': 'border-rose-200 bg-rose-50/60',
  missing: 'border-rose-200 bg-rose-50/60',
  'recommended-missing': 'border-amber-200 bg-amber-50/60',
  none: 'border-slate-200 bg-white',
};

export function SubjectRequirementRow({
  requirement,
  entries,
  compact = false,
}: {
  requirement: SubjectRequirementType;
  entries: ProfileGrade[] | null;
  compact?: boolean;
}) {
  const { match, studentGrade } = evaluate(requirement, entries);

  const icon =
    match === 'met' ? (
      <IconCheck width={13} height={13} className="text-emerald-600" />
    ) : match === 'missing' || match === 'grade-short' ? (
      <IconCross width={13} height={13} className="text-rose-600" />
    ) : match === 'recommended-missing' ? (
      <IconWarning width={13} height={13} className="text-amber-600" />
    ) : null;

  return (
    <div
      className={cx(
        'flex items-center justify-between gap-3 rounded border px-2.5 py-1.5',
        STYLES[match],
        compact ? 'text-[13px]' : 'text-sm',
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        {icon}
        <span className="truncate font-medium text-ink">{requirement.subject}</span>
        {!compact && requirement.acceptedAlternatives.length > 0 ? (
          <span className="truncate text-xs text-ink-faint">
            (or {requirement.acceptedAlternatives.join(', ')})
          </span>
        ) : null}
      </span>
      <span className="flex shrink-0 items-center gap-1.5">
        {requirement.minimumGrade ? (
          <span className="font-semibold tabular-nums text-navy-900">{requirement.minimumGrade}</span>
        ) : (
          <span className="text-xs text-ink-faint">{compact ? '—' : 'No minimum stated'}</span>
        )}
        {compact ? null : requirement.required ? (
          <Badge tone="navy">Required</Badge>
        ) : (
          <Badge tone="slate">Recommended</Badge>
        )}
        {!compact && studentGrade && match !== 'none' ? (
          <span className="text-xs text-ink-faint">you: {studentGrade}</span>
        ) : null}
      </span>
    </div>
  );
}
