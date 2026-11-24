import type { SubjectCategory } from '@/types';
import { SUBJECT_CATEGORIES } from '@/data/taxonomy';
import { cx } from './ui/primitives';

const LABEL: Record<string, string> = Object.fromEntries(SUBJECT_CATEGORIES.map((c) => [c.id, c.label]));

/**
 * The subject area of a course: a small coloured marker followed by its name.
 *
 * The colour is an accent for scanning a mixed list, never the information
 * itself. The word is always present, so the tag reads the same in greyscale,
 * in forced-colours mode and to a screen reader (the marker is hidden from it).
 */
export function CategoryTag({ category, className }: { category: SubjectCategory; className?: string }) {
  return (
    <span className={cx('cat-tag', `cat-${category}`, className)}>
      <span className="cat-mark" aria-hidden="true" />
      {LABEL[category] ?? category}
    </span>
  );
}
