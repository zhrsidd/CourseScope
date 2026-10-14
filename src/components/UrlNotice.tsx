import type { UrlProblem } from '@/lib/search-url';
import { closestKey } from '@/lib/search-url';
import { IconWarning } from './ui/icons';

const LABEL: Record<string, string> = {
  q: 'search text',
  university: 'university',
  category: 'subject area',
  subcategory: 'subject',
  degree: 'degree type',
  test: 'admissions test',
  interview: 'interview policy',
  region: 'location',
  duration: 'course length',
  maths: 'Mathematics requirement',
  physics: 'Physics requirement',
  chemistry: 'Chemistry requirement',
  fm: 'Further Maths status',
  maxoffer: 'grade limit',
  rank: 'ranking limit',
  sort: 'sort order',
  awaiting: 'awaiting-research switch',
  year: 'entry year',
};
const label = (k: string) => LABEL[k] ?? k;
const quote = (v: string) => `\u201C${v.length > 60 ? `${v.slice(0, 57)}\u2026` : v}\u201D`;

/**
 * Says, in plain words, what in the address could not be applied and what the page
 * did about it. It is the reason an unrecognised filter never turns into a quietly
 * different search. The reader can clear the unrecognised parts with one button.
 */
export function UrlNotice({
  problems,
  blocked,
  onClear,
}: {
  problems: UrlProblem[];
  blocked: boolean;
  onClear: () => void;
}) {
  if (!problems.length) return null;
  const line = (p: UrlProblem): string => {
    switch (p.kind) {
      case 'blocks':
        return `${label(p.key)} ${quote(p.value)} is not recognised`;
      case 'partial':
        return `${label(p.key)} ${quote(p.value)} was ignored`;
      case 'typo':
        return `\u201C${p.key}\u201D is not a search option. Did you mean \u201C${closestKey(p.key) ?? ''}\u201D?`;
      default:
        return p.key === 'q'
          ? 'the search text was cut to its first 200 characters'
          : `${label(p.key)} ${quote(p.value)} is not recognised, so the default is used`;
    }
  };
  const shown = problems.slice(0, 4);
  return (
    <div className="invite invite-warn" role="status">
      <IconWarning className="lead-icon" aria-hidden />
      <p>
        <b>
          {blocked
            ? 'No courses are shown, because part of this link’s search is not recognised.'
            : 'Part of this link’s search was not recognised.'}
        </b>
        <span className="sub">
          {shown.map(line).join('; ')}
          {problems.length > shown.length ? `; and ${problems.length - shown.length} more` : ''}.{' '}
          {blocked
            ? 'A filter that cannot match anything is applied as it was written, so nothing is listed.'
            : 'Everything else in the link was applied.'}
        </span>
      </p>
      <button type="button" className="btn-secondary btn-sm" onClick={onClear}>
        Remove {problems.length === 1 ? 'it' : 'them'}
      </button>
    </div>
  );
}
