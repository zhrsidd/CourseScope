import { Link } from 'react-router-dom';
import { CATALOGUE_DISCLAIMER } from '@/data';
import { APP_VERSION, IS_PRE_RELEASE } from '@/data/version';
import { BRAND_NAME } from '@/lib/brand';
import { BrandMark } from './BrandMark';
import { FeedbackLink } from './ReportIssue';

/**
 * Compact, and the same on every page. It carries the four things a reader
 * might look for at the bottom of a research tool — what it is, how the data
 * is checked, how to report a mistake, and which build they are on — plus the
 * disclaimer. Site navigation lives in the header; repeating all of it here
 * only made the footer longer.
 */
export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="flex items-center gap-2">
              <BrandMark size={18} />
              <span className="text-sm font-semibold text-navy-950">{BRAND_NAME}</span>
            </span>
            <span className="text-xs text-ink-muted">Data sourced from official university pages</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs">
            <Link className="text-ink-muted hover:text-navy-800" to="/about">
              Methodology
            </Link>
            <FeedbackLink className="text-ink-muted hover:text-navy-800" />
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
          </nav>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-faint">{CATALOGUE_DISCLAIMER}</p>
      </div>
    </footer>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={className ?? 'text-xs leading-relaxed text-ink-muted'}>{CATALOGUE_DISCLAIMER}</p>
  );
}
