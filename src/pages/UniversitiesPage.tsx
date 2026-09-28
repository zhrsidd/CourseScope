import { useMemo, useState } from 'react';
import { usePageTitle } from '@/lib/page-title';
import { UniversityCard } from '@/components/UniversityCard';
import { IconSearch } from '@/components/ui/icons';
import { CardSkeleton, EmptyState, PageHeader, Select } from '@/components/ui/primitives';
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

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Catalogue"
        title="UK universities"
        description="Universities in this catalogue offering undergraduate Physics or Engineering courses."
        actions={
          <>
            <div className="relative">
              <IconSearch
                width={15}
                height={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                className="field h-9 w-56 py-1.5 pl-9 text-sm"
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
          </>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : list.length === 0 ? (
        <EmptyState
          title="No universities match that search"
          description="Try a different name, city or region."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((u) => (
            <UniversityCard
              key={u.id}
              university={u}
              courses={(coursesByUniversity[u.id] ?? []).filter(
                (c) => c.applicationYear === profile.applicationYear,
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
