import { Link } from 'react-router-dom';
import type { Course, University } from '@/types';
import { useApp } from '@/state/AppContext';
import { RankingBadge } from './RankingBadge';
import { IconHeart } from './ui/icons';
import { cx } from './ui/primitives';

/**
 * One line of the university index. The index answers "which universities are
 * here and what do they offer", so a row carries the name, the place, two
 * counts and the way into the courses. Departments live on the university's own
 * page; repeating them for 22 universities adds length, not information.
 */
export function UniversityRow({ university, courses }: { university: University; courses: Course[] }) {
  const { savedUniversityIds, toggleSavedUniversity } = useApp();
  const saved = savedUniversityIds.includes(university.id);
  const physics = courses.filter((c) => c.subjectCategory === 'physics').length;
  const engineering = courses.filter((c) => c.subjectCategory === 'engineering').length;

  return (
    <li className="ur" data-uni={university.slug}>
      <div className="ur-main">
        <h2 className="ur-name">
          <Link to={`/university/${university.slug}`}>{university.name}</Link>
        </h2>
        <p className="ur-place">
          {university.city}, {university.region === university.city ? university.country : university.region}
        </p>
      </div>
      <p className="ur-counts" aria-label={`${physics} Physics and ${engineering} Engineering courses`}>
        <span>
          <b>{physics}</b> Physics
        </span>
        <span>
          <b>{engineering}</b> Engineering
        </span>
      </p>
      {university.rankings.length > 0 ? (
        <div className="ur-rank">
          <RankingBadge university={university} category="overall" showProvider={false} />
        </div>
      ) : null}
      <div className="ur-actions">
        <Link to={`/search?university=${university.slug}`} className="ur-go">
          View courses<span aria-hidden> →</span>
        </Link>
        <button
          type="button"
          onClick={() => toggleSavedUniversity(university.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${university.name} from shortlist` : `Save ${university.name} to shortlist`}
          className={cx('ur-save', saved && 'is-saved')}
        >
          <IconHeart width={15} height={15} filled={saved} />
        </button>
      </div>
    </li>
  );
}
