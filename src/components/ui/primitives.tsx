import type { ReactNode } from 'react';

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */

type Tone = 'neutral' | 'navy' | 'green' | 'amber' | 'red' | 'slate' | 'demo';

const TONES: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  navy: 'bg-navy-50 text-navy-800 border-navy-200',
  green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  red: 'bg-rose-50 text-rose-800 border-rose-200',
  slate: 'bg-white text-slate-600 border-slate-200',
  demo: 'bg-amber-50 text-amber-700 border-amber-200',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cx(
        'inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium leading-4',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'section';
}) {
  return <As className={cx('surface', className)}>{children}</As>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        {eyebrow ? <div className="label mb-1.5">{eyebrow}</div> : null}
        <h1 className="text-2xl font-semibold text-navy-950 md:text-[28px]">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm text-ink-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function SectionTitle({
  children,
  right,
  id,
}: {
  children: ReactNode;
  right?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 id={id} className="text-base font-semibold text-navy-950">
        {children}
      </h2>
      {right}
    </div>
  );
}

export function DataRow({
  label,
  children,
  className,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('grid grid-cols-1 gap-0.5 py-2 sm:grid-cols-[minmax(0,200px)_1fr] sm:gap-4', className)}>
      <dt className="text-xs font-medium text-ink-faint sm:pt-0.5">{label}</dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <span className="text-ink-faint">{children}</span>;
}

/** Consistent rendering for a field we have no data for. */
export function NoData({ children = 'Not available' }: { children?: ReactNode }) {
  return <span className="text-sm italic text-slate-400">{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Loading / empty                                                     */
/* ------------------------------------------------------------------ */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx('animate-pulse rounded bg-slate-200/70', className)} />;
}

export function CardSkeleton() {
  return (
    <Card className="p-4">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-5 w-2/3" />
      <Skeleton className="mt-2 h-3 w-1/3" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="mt-4 h-8 w-40" />
    </Card>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      {icon ? <div className="text-slate-300">{icon}</div> : null}
      <h3 className="text-base font-semibold text-navy-950">{title}</h3>
      {description ? <p className="max-w-md text-sm text-ink-muted">{description}</p> : null}
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */

export function CheckboxRow({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-ink hover:text-navy-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 shrink-0 rounded border-slate-300 text-navy-800 focus:ring-navy-500"
      />
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
      {count !== undefined ? <span className="text-xs tabular-nums text-slate-400">{count}</span> : null}
    </label>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  size = 'md',
}: {
  value: T;
  onChange: (next: T) => void;
  options: { id: T; label: string }[];
  size?: 'sm' | 'md';
}) {
  return (
    <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={cx(
            'rounded px-2.5 font-medium transition-colors',
            size === 'sm' ? 'py-1 text-xs' : 'py-1.5 text-sm',
            value === o.id ? 'bg-navy-900 text-white' : 'text-ink-muted hover:bg-slate-50',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  label,
  id,
}: {
  value: T;
  onChange: (next: T) => void;
  options: { id: T; label: string }[];
  label?: string;
  id?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      {label ? (
        <label htmlFor={id} className="text-xs font-medium text-ink-faint">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-ink focus:border-navy-500 focus:outline-none focus:ring-1 focus:ring-navy-500"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  );
}
