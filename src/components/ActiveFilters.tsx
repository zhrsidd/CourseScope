import type { FilterState } from '@/lib/filters';
import type { University } from '@/types';
import { ADMISSIONS_TESTS, DEGREE_TYPES, SUBCATEGORIES, SUBJECT_CATEGORIES } from '@/data/taxonomy';
import { VERDICT_LABEL } from '@/lib/eligibility';
import { INTERVIEW_LABEL } from '@/lib/format';
import { IconCross } from './ui/icons';

interface Chip {
  id: string;
  label: string;
  remove: (f: FilterState) => FilterState;
}

/**
 * Every filter that is switched on, as a removable chip. It only reads the
 * filter state and writes it back with one value taken out, so it can never
 * disagree with the rail.
 */
export function describeFilters(f: FilterState, universityById: Record<string, University>): Chip[] {
  const chips: Chip[] = [];
  const tri = (label: string, v: string): string => `${label}: ${v === 'required' ? 'required' : 'not required'}`;
  for (const c of f.categories)
    chips.push({
      id: `cat-${c}`,
      label: SUBJECT_CATEGORIES.find((x) => x.id === c)?.label ?? c,
      remove: (s) => ({ ...s, categories: s.categories.filter((x) => x !== c) }),
    });
  for (const c of f.subcategories)
    chips.push({
      id: `sub-${c}`,
      label: SUBCATEGORIES.find((x) => x.id === c)?.label ?? c,
      remove: (s) => ({ ...s, subcategories: s.subcategories.filter((x) => x !== c) }),
    });
  for (const id of f.universityIds)
    chips.push({
      id: `uni-${id}`,
      label: universityById[id]?.shortName ?? universityById[id]?.name ?? id,
      remove: (s) => ({ ...s, universityIds: s.universityIds.filter((x) => x !== id) }),
    });
  for (const v of f.eligibility)
    chips.push({
      id: `elig-${v}`,
      label: VERDICT_LABEL[v],
      remove: (s) => ({ ...s, eligibility: s.eligibility.filter((x) => x !== v) }),
    });
  if (f.mathematics !== 'any')
    chips.push({ id: 'maths', label: tri('Mathematics', f.mathematics), remove: (s) => ({ ...s, mathematics: 'any' }) });
  if (f.physics !== 'any')
    chips.push({ id: 'phys', label: tri('Physics', f.physics), remove: (s) => ({ ...s, physics: 'any' }) });
  if (f.chemistry !== 'any')
    chips.push({ id: 'chem', label: tri('Chemistry', f.chemistry), remove: (s) => ({ ...s, chemistry: 'any' }) });
  if (f.furtherMathematics !== 'any')
    chips.push({
      id: 'fm',
      label: `Further Maths: ${f.furtherMathematics.replace(/-/g, ' ')}`,
      remove: (s) => ({ ...s, furtherMathematics: 'any' }),
    });
  if (f.maxOffer)
    chips.push({ id: 'offer', label: `Offers at or below ${f.maxOffer}`, remove: (s) => ({ ...s, maxOffer: null }) });
  for (const t of f.admissionsTests)
    chips.push({
      id: `test-${t}`,
      label: ADMISSIONS_TESTS.find((x) => x.code === t)?.shortName ?? t,
      remove: (s) => ({ ...s, admissionsTests: s.admissionsTests.filter((x) => x !== t) }),
    });
  for (const i of f.interview)
    chips.push({
      id: `int-${i}`,
      label: `Interview: ${INTERVIEW_LABEL[i]}`,
      remove: (s) => ({ ...s, interview: s.interview.filter((x) => x !== i) }),
    });
  for (const d of f.degreeTypes)
    chips.push({
      id: `deg-${d}`,
      label: DEGREE_TYPES.find((x) => x.id === d)?.label ?? d,
      remove: (s) => ({ ...s, degreeTypes: s.degreeTypes.filter((x) => x !== d) }),
    });
  for (const y of f.durations)
    chips.push({
      id: `dur-${y}`,
      label: `${y} years`,
      remove: (s) => ({ ...s, durations: s.durations.filter((x) => x !== y) }),
    });
  for (const r of f.regions)
    chips.push({ id: `reg-${r}`, label: r, remove: (s) => ({ ...s, regions: s.regions.filter((x) => x !== r) }) });
  if (f.maxOverallRank)
    chips.push({ id: 'rank', label: `Top ${f.maxOverallRank}`, remove: (s) => ({ ...s, maxOverallRank: null }) });
  if (f.onlyShortlisted)
    chips.push({ id: 'saved', label: 'Only my saved courses', remove: (s) => ({ ...s, onlyShortlisted: false }) });
  return chips;
}

export function ActiveFilters({
  filters,
  universityById,
  onChange,
  onClear,
}: {
  filters: FilterState;
  universityById: Record<string, University>;
  onChange: (next: FilterState) => void;
  onClear: () => void;
}) {
  const chips = describeFilters(filters, universityById);
  if (chips.length === 0) return null;
  return (
    <ul className="chips" aria-label="Active filters">
      {chips.map((c) => (
        <li key={c.id} className="chip">
          <span>{c.label}</span>
          <button type="button" aria-label={`Remove filter: ${c.label}`} onClick={() => onChange(c.remove(filters))}>
            <IconCross width={14} height={14} />
          </button>
        </li>
      ))}
      <li>
        <button type="button" className="chips-clear" onClick={onClear}>
          Clear all
        </button>
      </li>
    </ul>
  );
}
