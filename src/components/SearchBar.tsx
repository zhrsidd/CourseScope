import type { ParsedQuery } from '@/lib/search';
import { SEARCH_EXAMPLES } from '@/lib/search';
import { IconSearch } from './ui/icons';
import { Badge } from './ui/primitives';

/** Chips shown under the field; every example is still offered as a browser suggestion. */
const CHIPS_SHOWN = 4;

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
          list="search-suggestions"
          placeholder="Try “physics AAA”, “engineering without chemistry”, “universities requiring ESAT”"
        />
        <datalist id="search-suggestions">
          {SEARCH_EXAMPLES.map((example) => (
            <option key={example} value={example} />
          ))}
        </datalist>
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
        <div className="search-notes search-examples">
          <span>Try:</span>
          {SEARCH_EXAMPLES.slice(0, CHIPS_SHOWN).map((example) => (
            <button key={example} type="button" onClick={() => onChange(example)} className="search-example">
              {example}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
