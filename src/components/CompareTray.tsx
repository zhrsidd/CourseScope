import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MAX_COMPARE, useApp } from '@/state/AppContext';

/** Floating tray showing the current comparison selection (up to five courses). */
export function CompareTray() {
  const { compareIds, courseById, universityById, clearCompare } = useApp();
  const location = useLocation();
  const visible = compareIds.length > 0 && location.pathname !== '/compare';

  // Keep the footer clear of the tray while it is showing.
  useEffect(() => {
    document.body.classList.toggle('has-tray', visible);
    return () => document.body.classList.remove('has-tray');
  }, [visible]);

  if (!visible) return null;

  const names = compareIds
    .map((id) => courseById[id])
    .filter(Boolean)
    .map((c) => `${universityById[c.universityId]?.shortName ?? ''} ${c.name}`.trim());

  return (
    <div className="tray on-dark" role="region" aria-label="Comparison">
      <div className="slots" aria-hidden="true">
        {Array.from({ length: MAX_COMPARE }).map((_, i) => (
          <i key={i} className={i < compareIds.length ? 'on' : ''} />
        ))}
      </div>
      <div className="txt">
        <strong className="font-semibold">
          Comparing {compareIds.length} of {MAX_COMPARE}
        </strong>
        <span className="sub">{names.join(' · ')}</span>
      </div>
      <button type="button" className="btn-ghost btn-sm" onClick={clearCompare}>
        Clear
      </button>
      <Link to="/compare" className="btn-secondary btn-sm">
        Compare courses
      </Link>
    </div>
  );
}
