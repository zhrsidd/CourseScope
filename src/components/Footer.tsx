import { Link } from 'react-router-dom';
import { CATALOGUE_DISCLAIMER } from '@/data';
import { APP_VERSION, IS_PRE_RELEASE } from '@/data/version';
import { BRAND_NAME, BRAND_SUBTITLE } from '@/lib/brand';
import { BrandMark } from './BrandMark';

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-8xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <BrandMark size={18} className="self-center" />
              <span className="text-sm font-semibold text-navy-950">{BRAND_NAME}</span>
              <span className="text-xs text-ink-muted">{BRAND_SUBTITLE}</span>
              <span
                className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-ink-muted"
                title={
                  IS_PRE_RELEASE
                    ? 'This catalogue is still being completed. It is not a finished release.'
                    : `${BRAND_NAME} ${APP_VERSION}`
                }
              >
                {APP_VERSION}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{CATALOGUE_DISCLAIMER}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
            <Link className="hover:text-navy-800" to="/browse">
              Browse subjects
            </Link>
            <Link className="hover:text-navy-800" to="/universities">
              Universities
            </Link>
            <Link className="hover:text-navy-800" to="/compare">
              Compare courses
            </Link>
            <Link className="hover:text-navy-800" to="/shortlist">
              My shortlist
            </Link>
            <Link className="hover:text-navy-800" to="/about">
              About the data
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={className ?? 'text-xs leading-relaxed text-ink-muted'}>{CATALOGUE_DISCLAIMER}</p>
  );
}
