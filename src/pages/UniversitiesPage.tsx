import { useMemo, useState } from 'react';
import { usePageTitle } from '@/lib/page-title';
import { UniversityRow } from '@/components/UniversityRow';
import { IconSearch } from '@/components/ui/icons';
import { EmptyState, Select } from '@/components/ui/primitives';
import {
  UNIVERSITY_SORT_OPTIONS,
  sortUniversities,
  type UniversitySortKey,
} from '@/lib/filters';
import { useApp } from '@/state/AppContext';

export function UniversitiesPage() {
  usePageTitle('Universities');
  const { loading, universities, coursesByUniversity, courses, profile } = useApp();
  const [sort, setSort] = useState<UniversitySortKey>('name-asc');
  const [query, setQuery] = useState('');

  const yearCourses = useMemo(
    () => courses.filter((c) => c.applicationYear === profile.applicationYear),
    [courses, profile.applicationYear],
  );

  const list = useMemo(() => {
    const filtered = universities.filter((u) =>
      `${u.name} ${u.city} ${u.region}`.toLowerCase().includes(query.toLowerCase()),
    );
    return sortUniversities(filtered, yearCourses, sort);
  }, [universities, yearCourses, sort, query]);

  const totalCourses = list.reduce(
    (n, u) => n + (coursesByUniversity[u.id] ?? []).filter((c) => c.applicationYear === profile.applicationYear).length,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <header className="pg-head">
        <p className="label">Catalogue</p>
        <h1>UK universities</h1>
        <p className="pg-sub">
          Universities in this catalogue offering undergraduate Physics or Engineering courses.
          Listed alphabetically unless you choose otherwise; nothing here is ranked by CourseScope.
        </p>
      </header>

      <div className="pg-tools">
        <div className="relative">
          <IconSearch
            width={15}
            height={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            className="field h-10 w-full py-1.5 pl-9 text-sm sm:w-72"
            aria-label="Find a university or city"
            placeholder="Find a university or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Select<UniversitySortKey>
          id="uni-sort"
          label="Sort by"
          value={sort}
          onChange={setSort}
          options={
            universities.some((u) => u.rankings.length > 0)
              ? UNIVERSITY_SORT_OPTIONS
              : UNIVERSITY_SORT_OPTIONS.filter((o) => !o.id.startsWith('rank-'))
          }
        />
        {!loading ? (
          <p className="pg-count" aria-live="polite">
            {list.length} {list.length === 1 ? 'university' : 'universities'} · {totalCourses} course records, {profile.applicationYear} entry
          </p>
        ) : (
          <p className="pg-count" aria-hidden="true" style={{ visibility: 'hidden' }}>
            0 universities · 000 course records, 0000 entry
          </p>
        )}
      </div>

      {loading ? (
        <ul className="ur-list" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="ur ur-skel">
              <span className="sk sk-l" />
              <span className="sk sk-s" />
            </li>
          ))}
        </ul>
      ) : list.length === 0 ? (
        <EmptyState
          title="No universities match that search"
          description="Try a different name, city or region."
        />
      ) : (
        <ul className="ur-list">
          {list.map((u) => (
            <UniversityRow
              key={u.id}
              university={u}
              courses={(coursesByUniversity[u.id] ?? []).filter(
                (c) => c.applicationYear === profile.applicationYear,
              )}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
