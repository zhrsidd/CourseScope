import type { ParsedQuery } from '@/lib/search';
import { SEARCH_EXAMPLES } from '@/lib/search';
import { IconSearch } from './ui/icons';
import { Badge } from './ui/primitives';

export function SearchBar({
  value,
  onChange,
  parsed,
  showExamples = true,
}: {
  value: string;
  onChange: (next: string) => void;
  parsed: ParsedQuery;
  showExamples?: boolean;
}) {
  return (
    <div>
      <div className="search-box">
        <IconSearch aria-hidden />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search courses"
          className="field"
          placeholder="Try “physics AAA”, “engineering without chemistry”, “universities requiring ESAT”"
        />
      </div>

      {parsed.chips.length > 0 ? (
        <div className="search-notes">
          <span>Understood as:</span>
          {parsed.chips.map((chip) => (
            <Badge key={chip.id} tone="navy">
              {chip.label}
            </Badge>
          ))}
          {parsed.text ? <Badge tone="slate">text: “{parsed.text}”</Badge> : null}
        </div>
      ) : null}

      {showExamples && !value ? (
        <div className="search-notes">
          <span>Examples:</span>
          {SEARCH_EXAMPLES.map((example) => (
            <button key={example} type="button" onClick={() => onChange(example)} className="search-example">
              {example}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
