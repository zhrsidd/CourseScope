import { Link } from 'react-router-dom';
import { useApp } from '@/state/AppContext';
import { IconWarning } from './ui/icons';

/**
 * Shown while the catalogue still contains placeholder records. Once every
 * record has been verified this disappears on its own — nothing to remember to
 * take out.
 */
export function DemoBanner() {
  const { courses, hasVerifiedData, loading } = useApp();
  if (loading) return null;

  const sample = courses.filter((c) => c.provenance.verificationStatus === 'demo').length;
  const awaiting = courses.filter((c) => c.provenance.verificationStatus === 'awaiting-data').length;
  if (sample === 0 && awaiting === 0) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-8xl items-start gap-2 px-4 py-2 text-xs text-amber-900 md:px-6">
        <IconWarning width={14} height={14} className="mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          {/* Once no placeholder requirements remain, "partly sample data" is
              the wrong warning. From v1.0.0 every remaining gap is a course whose
              university has not published its 2027 requirements (engine-check
              26f asserts this), so the banner says that — not "not researched",
              which would blame the gap on us and imply it could be closed. */}
          <strong className="font-semibold">
            {sample > 0
              ? hasVerifiedData
                ? 'Partly sample data.'
                : 'Sample catalogue.'
              : 'A few courses are waiting on their university.'}
          </strong>{' '}
          {sample > 0 ? <>University names, cities and course titles are real. </> : null}
          {sample > 0 ? (
            <>
              <strong>{sample}</strong> records still carry placeholder entry requirements, admissions
              tests and rankings that have not been checked against any university website.{' '}
            </>
          ) : null}
          {awaiting > 0 ? (
            <>
              <strong>{awaiting}</strong>{' '}
              {awaiting === 1 ? 'course is' : 'courses are'} listed without entry requirements because
              the university has not yet published them for this entry year.{' '}
            </>
          ) : null}
          <Link to="/about" className="underline underline-offset-2">
            How data is recorded and verified
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
