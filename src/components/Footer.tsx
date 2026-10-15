import { Link } from 'react-router-dom';
import { CATALOGUE_DISCLAIMER } from '@/data/disclaimer';
import { APP_VERSION, IS_PRE_RELEASE } from '@/data/version';
import { BRAND_NAME } from '@/lib/brand';
import { BrandMark } from './BrandMark';
import { FeedbackLink } from './ReportIssue';

/**
 * The same on every page. A research tool's footer answers four questions: what
 * is this, how is the data checked, how do I report a mistake, and which build am
 * I on. It also carries the disclaimer, and the main routes so a reader at the
 * bottom of a long page is not sent back to the top to move on.
 */
export function Footer() {
  return (
    <footer className="site-foot on-dark">
      <div className="wrap site-foot-in">
        <div className="site-foot-brand">
          <span className="site-foot-mark">
            <BrandMark size={22} />
            <span>{BRAND_NAME}</span>
          </span>
          <p className="site-foot-src">Data sourced from official university pages</p>
          <p>{CATALOGUE_DISCLAIMER}</p>
        </div>
        <nav aria-label="Footer" className="site-foot-nav">
          <div>
            <span className="site-foot-h">Explore</span>
            <Link to="/search">Search courses</Link>
            <Link to="/browse">Subjects</Link>
            <Link to="/universities">Universities</Link>
            <Link to="/compare">Compare</Link>
            <Link to="/shortlist">Shortlist</Link>
          </div>
          <div>
            <span className="site-foot-h">The data</span>
            <Link to="/about">Methodology</Link>
            <FeedbackLink className="site-foot-link" />
            <span
              className="site-foot-ver"
              title={
                IS_PRE_RELEASE
                  ? 'This catalogue is still being completed. It is not a finished release.'
                  : `${BRAND_NAME} ${APP_VERSION}`
              }
            >
              Version {APP_VERSION}
            </span>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={className ?? 'text-xs leading-relaxed text-ink-muted'}>{CATALOGUE_DISCLAIMER}</p>
  );
}
