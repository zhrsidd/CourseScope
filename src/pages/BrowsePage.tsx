import { useMemo } from 'react';
import { usePageTitle } from '@/lib/page-title';
import { Link } from 'react-router-dom';
import { SUBCATEGORIES, SUBJECT_CATEGORIES } from '@/data/taxonomy';
import { cx } from '@/components/ui/primitives';
import { IconChevron } from '@/components/ui/icons';
import { applyFilters, defaultFilters } from '@/lib/filters';
import { parseQuery } from '@/lib/search';
import { useApp } from '@/state/AppContext';

const EMPTY_QUERY = parseQuery('');

export function BrowsePage() {
  usePageTitle('Browse subjects');
  const { courses, profile, universities, universityById, eligibility, hasVerifiedData } = useApp();

  const counts = useMemo(() => {
    // The same filter function and defaults as the search page, so the number beside a
    // subject is the number of rows its link opens (courses still awaiting research are
    // hidden there by default, and so are not counted here).
    const listed = applyFilters({
      courses,
      universities: universityById,
      filters: { ...defaultFilters(hasVerifiedData), applicationYear: profile.applicationYear },
      parsed: EMPTY_QUERY,
      eligibility,
      shortlistedCourseIds: [],
    });
    const bySub = new Map<string, number>();
    const uniBySub = new Map<string, Set<string>>();
    for (const c of listed) {
      bySub.set(c.subjectSubcategory, (bySub.get(c.subjectSubcategory) ?? 0) + 1);
      const set = uniBySub.get(c.subjectSubcategory) ?? new Set<string>();
      set.add(c.universityId);
      uniBySub.set(c.subjectSubcategory, set);
    }
    return { bySub, uniBySub };
  }, [courses, universityById, eligibility, hasVerifiedData, profile.applicationYear]);

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <header className="pg-head">
        <p className="label">Browse</p>
        <h1>Physics and Engineering</h1>
        <p className="pg-sub">
          Two subject areas across {universities.length} universities. Choose a specialism to see the
          courses recorded for {profile.applicationYear} entry.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {SUBJECT_CATEGORIES.map((category) => {
          const subs = SUBCATEGORIES.filter((s) => s.category === category.id);
          const total = subs.reduce((n, s) => n + (counts.bySub.get(s.id) ?? 0), 0);
          return (
            <section key={category.id}>
              <div className="bw-head">
                <h2 className="bw-title">{category.label}</h2>
                <Link to={`/search?category=${category.id}`} className="bw-all">
                  View all {total} courses<span aria-hidden> →</span>
                </Link>
              </div>
              <p className="bw-blurb">{category.blurb}</p>
              <ul className="border-t border-navy-950">
                {subs.map((s) => {
                  const count = counts.bySub.get(s.id) ?? 0;
                  const unis = counts.uniBySub.get(s.id)?.size ?? 0;
                  return (
                    <li key={s.id} className="border-b border-slate-200">
                      <Link
                        to={`/search?subcategory=${s.id}`}
                        className={cx(
                          '-mx-2 flex items-center gap-4 rounded px-2 py-3 transition-colors hover:bg-navy-50/60',
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-navy-950">{s.label}</div>
                          <div className="text-xs leading-snug text-ink-muted">{s.blurb}</div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-sm font-semibold tabular-nums text-navy-900">{count}</div>
                          <div className="text-xs text-ink-faint">
                            {count === 0 ? 'none recorded' : `${unis} ${unis === 1 ? 'university' : 'universities'}`}
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

      <p className="bw-foot">
        Counts are courses whose entry requirements have been read against the university’s own page,
        for {profile.applicationYear} entry — the same list the explorer opens. They describe this
        catalogue, not everything each university offers.{' '}
        <Link to="/about">See what is covered and what is still waiting</Link>.
      </p>
    </div>
  );
}
