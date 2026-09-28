import { Link, useLocation } from 'react-router-dom';
import { MAX_COMPARE, useApp } from '@/state/AppContext';
import { IconCross } from './ui/icons';

/** Persistent bar showing the current comparison selection. */
export function CompareTray() {
  const { compareIds, courseById, universityById, toggleCompare, clearCompare } = useApp();
  const location = useLocation();

  if (compareIds.length === 0 || location.pathname === '/compare') return null;

  return (
    <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-8xl flex-wrap items-center gap-3 px-4 py-2.5 md:px-6">
        <span className="text-xs font-semibold text-navy-950">
          Comparing {compareIds.length} of {MAX_COMPARE}
        </span>
        <ul className="hidden min-w-0 flex-1 flex-wrap gap-1.5 md:flex">
          {compareIds.map((id) => {
            const course = courseById[id];
            if (!course) return null;
            return (
              <li
                key={id}
                className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
              >
                <span className="max-w-[220px] truncate">
                  <span className="text-ink-faint">
                    {universityById[course.universityId]?.shortName ?? ''} ·{' '}
                  </span>
                  {course.name}
                </span>
                <button
                  type="button"
                  onClick={() => toggleCompare(id)}
                  className="text-slate-400 hover:text-rose-600"
                  aria-label={`Remove ${course.name}`}
                >
                  <IconCross width={12} height={12} />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto flex shrink-0 gap-2">
          <button type="button" className="btn-ghost h-8 px-2.5 text-xs" onClick={clearCompare}>
            Clear
          </button>
          <Link to="/compare" className="btn-primary h-8 px-3 text-xs">
            Compare courses
          </Link>
        </div>
      </div>
    </div>
  );
}
