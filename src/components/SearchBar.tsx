import type { ParsedQuery } from '@/lib/search';
import { SEARCH_EXAMPLES } from '@/lib/search';
import { IconSearch } from './ui/icons';
import { Badge, cx } from './ui/primitives';

export function SearchBar({
  value,
  onChange,
  parsed,
  size = 'lg',
  showExamples = true,
}: {
  value: string;
  onChange: (next: string) => void;
  parsed: ParsedQuery;
  size?: 'lg' | 'sm';
  showExamples?: boolean;
}) {
  return (
    <div>
      <div className="relative">
        <IconSearch
          width={size === 'lg' ? 18 : 15}
          height={size === 'lg' ? 18 : 15}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search courses"
          placeholder="Try “physics AAA”, “engineering without chemistry”, “universities requiring ESAT”"
          className={cx(
            'field pl-10',
            size === 'lg' ? 'h-12 text-[15px]' : 'h-9 text-sm',
          )}
        />
      </div>

      {parsed.chips.length > 0 ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-ink-faint">Understood as:</span>
          {parsed.chips.map((chip) => (
            <Badge key={chip.id} tone="navy">
              {chip.label}
            </Badge>
          ))}
          {parsed.text ? <Badge tone="slate">text: “{parsed.text}”</Badge> : null}
        </div>
      ) : null}

      {showExamples && !value ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-ink-faint">Examples:</span>
          {SEARCH_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onChange(example)}
              className="rounded border border-slate-300 bg-white px-2 py-0.5 text-xs text-ink-muted hover:border-navy-300 hover:text-navy-800"
            >
              {example}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
