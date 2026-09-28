import { useMemo } from 'react';
import { usePageTitle } from '@/lib/page-title';
import { Link } from 'react-router-dom';
import { SUBCATEGORIES, SUBJECT_CATEGORIES } from '@/data/taxonomy';
import { Card, PageHeader, SectionTitle, cx } from '@/components/ui/primitives';
import { IconChevron } from '@/components/ui/icons';
import { useApp } from '@/state/AppContext';

export function BrowsePage() {
  usePageTitle('Browse subjects');
  const { courses, profile, universities } = useApp();

  const counts = useMemo(() => {
    const bySub = new Map<string, number>();
    const uniBySub = new Map<string, Set<string>>();
    for (const c of courses) {
      if (c.applicationYear !== profile.applicationYear) continue;
      bySub.set(c.subjectSubcategory, (bySub.get(c.subjectSubcategory) ?? 0) + 1);
      const set = uniBySub.get(c.subjectSubcategory) ?? new Set<string>();
      set.add(c.universityId);
      uniBySub.set(c.subjectSubcategory, set);
    }
    return { bySub, uniBySub };
  }, [courses, profile.applicationYear]);

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Browse"
        title="Physics and Engineering"
        description={`Two subject trees covering ${universities.length} universities. Choose a specialism to see the courses recorded for ${profile.applicationYear} entry.`}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {SUBJECT_CATEGORIES.map((category) => {
          const subs = SUBCATEGORIES.filter((s) => s.category === category.id);
          const total = subs.reduce((n, s) => n + (counts.bySub.get(s.id) ?? 0), 0);
          return (
            <section key={category.id}>
              <SectionTitle
                right={
                  <Link to={`/?category=${category.id}`} className="text-xs text-navy-700 hover:underline">
                    View all {total} courses
                  </Link>
                }
              >
                {category.label}
              </SectionTitle>
              <p className="mb-3 text-sm text-ink-muted">{category.blurb}</p>
              <ul className="space-y-2">
                {subs.map((s) => {
                  const count = counts.bySub.get(s.id) ?? 0;
                  const unis = counts.uniBySub.get(s.id)?.size ?? 0;
                  return (
                    <li key={s.id}>
                      <Link
                        to={`/?subcategory=${s.id}`}
                        className={cx(
                          'flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-navy-300 hover:bg-navy-50/40',
                          count === 0 && 'opacity-60',
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-navy-950">{s.label}</div>
                          <div className="truncate text-xs text-ink-muted">{s.blurb}</div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-sm font-semibold tabular-nums text-navy-900">{count}</div>
                          <div className="text-[11px] text-ink-faint">
                            {unis} {unis === 1 ? 'university' : 'universities'}
                          </div>
                        </div>
                        <IconChevron width={14} height={14} className="shrink-0 text-slate-300" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <Card className="mt-8 p-4">
        <p className="text-xs leading-relaxed text-ink-muted">
          Course counts reflect what is currently in this catalogue, not everything each university
          offers. The demo seed contains a sample of courses per university so that the filters,
          comparison and grade matching can be exercised end to end.
        </p>
      </Card>
    </div>
  );
}
