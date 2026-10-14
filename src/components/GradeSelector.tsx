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
      className="inline-flex rounded-ctl border border-control bg-white p-0.5"
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
              'min-h-[36px] min-w-[36px] rounded-chip px-1.5 text-sm font-semibold tabular-nums transition-colors duration-quick ease-standard',
              active ? 'bg-navy-900 text-white' : 'text-ink-muted hover:bg-sunken',
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
