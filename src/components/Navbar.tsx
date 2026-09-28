import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '@/state/AppContext';
import { IconCompare, IconHeart } from './ui/icons';
import { cx } from './ui/primitives';
import { BrandMark } from './BrandMark';
import { BRAND_NAME, BRAND_SHORT_SUBTITLE } from '@/lib/brand';

const LINKS = [
  { to: '/', label: 'Search', end: true },
  { to: '/browse', label: 'Browse subjects' },
  { to: '/universities', label: 'Universities' },
  { to: '/compare', label: 'Compare' },
  { to: '/shortlist', label: 'My shortlist' },
  { to: '/about', label: 'About the data' },
];

export function Navbar() {
  const { compareIds, savedCourseIds, savedUniversityIds } = useApp();
  const [open, setOpen] = useState(false);
  const savedCount = savedCourseIds.length + savedUniversityIds.length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-8xl items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label={`${BRAND_NAME} — home`}>
          <BrandMark size={28} />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-navy-950">{BRAND_NAME}</span>
            {/* Desktop only: the header stays one compact line on phones. */}
            <span className="mt-0.5 hidden text-[11px] font-medium text-ink-faint xl:block">
              {BRAND_SHORT_SUBTITLE}
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cx(
                  'rounded px-2.5 py-1.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-navy-50 text-navy-900' : 'text-ink-muted hover:bg-slate-50 hover:text-ink',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/compare"
            className="btn-secondary h-8 px-2.5 text-xs"
            aria-label={`Comparison: ${compareIds.length} courses`}
          >
            <IconCompare width={14} height={14} />
            <span className="hidden sm:inline">Compare</span>
            {compareIds.length > 0 ? (
              <span className="rounded bg-navy-900 px-1.5 text-[11px] font-semibold text-white">
                {compareIds.length}
              </span>
            ) : null}
          </Link>
          <Link to="/shortlist" className="btn-secondary h-8 px-2.5 text-xs" aria-label="My shortlist">
            <IconHeart width={14} height={14} filled={savedCount > 0} />
            <span className="hidden sm:inline">Shortlist</span>
            {savedCount > 0 ? (
              <span className="rounded bg-rose-600 px-1.5 text-[11px] font-semibold text-white">
                {savedCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="btn-secondary h-8 px-2.5 text-xs lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-2 lg:hidden">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cx(
                  'block rounded px-2.5 py-2 text-sm font-medium',
                  isActive ? 'bg-navy-50 text-navy-900' : 'text-ink-muted',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
