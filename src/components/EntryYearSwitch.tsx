import { useRef } from 'react';
import type { ApplicationYear } from '@/types';
import { APPLICATION_YEARS } from '@/lib/filters';
import { cx } from './ui/primitives';

/**
 * The entry-year control: a two-option radio group with a sliding indicator.
 *
 * It only reports a choice. Persisting it is the caller's job, and the caller
 * must do that only in response to this control's onChange, because the app's
 * rule is that the saved year changes only when a person presses a year.
 */
export function EntryYearSwitch({
  value,
  onChange,
  className,
  idPrefix = 'year',
}: {
  value: ApplicationYear;
  onChange: (year: ApplicationYear) => void;
  className?: string;
  idPrefix?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, APPLICATION_YEARS.indexOf(value));

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % APPLICATION_YEARS.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + APPLICATION_YEARS.length) % APPLICATION_YEARS.length;
    if (next < 0) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(APPLICATION_YEARS[next]);
  };

  return (
    <div role="radiogroup" aria-label="Entry year" className={cx('seg', className)}>
      <span
        className="seg-ind"
        aria-hidden="true"
        style={{
          width: `calc((100% - 8px) / ${APPLICATION_YEARS.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {APPLICATION_YEARS.map((y, i) => (
        <button
          key={y}
          ref={(el) => (refs.current[i] = el)}
          id={`${idPrefix}-${y}`}
          type="button"
          role="radio"
          aria-checked={value === y}
          aria-label={`${y} entry`}
          tabIndex={value === y ? 0 : -1}
          onClick={() => onChange(y)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          <span aria-hidden="true">{y}</span>
        </button>
      ))}
    </div>
  );
}
