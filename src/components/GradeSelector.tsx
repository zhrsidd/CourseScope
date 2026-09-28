import { A_LEVEL_GRADES, type ALevelGrade } from '@/types';
import { cx } from './ui/primitives';

/** Compact A*–E picker. Clicking the active grade clears it. */
export function GradeSelector({
  value,
  onChange,
  label,
  disabled,
}: {
  value: ALevelGrade | null;
  onChange: (next: ALevelGrade | null) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className="inline-flex rounded-md border border-slate-300 bg-white p-0.5"
      role="group"
      aria-label={label ?? 'Predicted grade'}
    >
      {A_LEVEL_GRADES.map((grade) => {
        const active = value === grade;
        return (
          <button
            key={grade}
            type="button"
            disabled={disabled}
            aria-pressed={active}
            onClick={() => onChange(active ? null : grade)}
            className={cx(
              'min-w-[30px] rounded px-1.5 py-1 text-xs font-semibold tabular-nums transition-colors',
              active ? 'bg-navy-900 text-white' : 'text-ink-muted hover:bg-slate-100',
              disabled && 'opacity-50',
            )}
          >
            {grade}
          </button>
        );
      })}
    </div>
  );
}
