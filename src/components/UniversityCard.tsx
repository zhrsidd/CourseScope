import { Link } from 'react-router-dom';
import type { Course, University } from '@/types';
import { pluralise } from '@/lib/format';
import { useApp } from '@/state/AppContext';
import { RankingBadge } from './RankingBadge';
import { IconHeart, IconPin } from './ui/icons';
import { Badge, Card, cx } from './ui/primitives';

/** Placeholder crest — universities' real logos are not bundled with the app. */
function LogoPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-navy-200 bg-navy-50 text-[13px] font-semibold tracking-tight text-navy-800"
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function UniversityCard({
  university,
  courses,
}: {
  university: University;
  courses: Course[];
}) {
  const { savedUniversityIds, toggleSavedUniversity } = useApp();
  const saved = savedUniversityIds.includes(university.id);
  const physicsCount = courses.filter((c) => c.subjectCategory === 'physics').length;
  const engineeringCount = courses.filter((c) => c.subjectCategory === 'engineering').length;

  return (
    <Card as="article" className="flex h-full flex-col p-4">
      <div className="flex items-start gap-3">
        <LogoPlaceholder initials={university.initials} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-navy-950">
            <Link to={`/university/${university.slug}`} className="hover:underline">
              {university.name}
            </Link>
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
            <IconPin width={12} height={12} />
            {university.city}, {university.country}
          </p>
          <p className="mt-0.5 text-xs text-ink-faint">{university.region}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleSavedUniversity(university.id)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'}
          className={cx(
            'rounded-md border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-50',
            saved && 'border-rose-200 text-rose-600',
          )}
        >
          <IconHeart width={15} height={15} filled={saved} />
        </button>
      </div>

      {university.rankings.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-md border border-slate-200 bg-slate-50/60 p-2.5">
          <RankingBadge university={university} category="overall" showProvider={false} />
          <RankingBadge university={university} category="physics-astronomy" showProvider={false} />
          <RankingBadge university={university} category="engineering-technology" showProvider={false} />
        </div>
      ) : null}

      <div className="mt-3">
        <div className="label mb-1.5">Relevant departments</div>
        <ul className="space-y-0.5 text-xs text-ink-muted">
          {university.departments.map((d) => (
            <li key={d} className="truncate">
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
        <Badge tone="navy">{pluralise(courses.length, 'course')} in catalogue</Badge>
        {physicsCount > 0 ? <Badge tone="slate">{physicsCount} physics</Badge> : null}
        {engineeringCount > 0 ? <Badge tone="slate">{engineeringCount} engineering</Badge> : null}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <Link to={`/university/${university.slug}`} className="btn-primary h-8 px-3 text-xs">
          View university
        </Link>
        <Link
          to={`/search?university=${university.slug}`}
          className="btn-secondary h-8 px-3 text-xs"
        >
          View courses
        </Link>
      </div>
    </Card>
  );
}
