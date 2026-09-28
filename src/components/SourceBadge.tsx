import type { ApplicationYear, Provenance, VerificationStatus } from '@/types';
import { VERIFICATION_DESCRIPTION, VERIFICATION_LABEL } from '@/data/taxonomy';
import { formatDate } from '@/lib/format';
import { IconExternal } from './ui/icons';
import { Badge } from './ui/primitives';

const TONE: Record<VerificationStatus, 'green' | 'amber' | 'demo' | 'neutral' | 'slate' | 'navy'> = {
  verified: 'green',
  /*
   * Navy, not amber. Partially verified is an EVIDENCE-COMPLETENESS state, not
   * a warning about the course — amber here would read as "something is wrong
   * with this degree", and would also make it indistinguishable from
   * "the university has not published yet", which is a different thing again.
   */
  'partially-verified': 'navy',
  'awaiting-publication': 'amber',
  'awaiting-data': 'neutral',
  demo: 'demo',
  unknown: 'slate',
};

/**
 * A record may only *look* verified if it can show its working. When the status
 * says verified but the source URL or check date is missing, the badge says so
 * rather than lending the record credibility it has not earned.
 */
export function VerificationBadge({
  status,
  provenance,
}: {
  status: VerificationStatus;
  provenance?: Provenance;
}) {
  const claimsVerified = status === 'verified';
  const evidenceComplete =
    !provenance || (Boolean(provenance.sourceUrl) && Boolean(provenance.lastVerified));

  if (claimsVerified && !evidenceComplete) {
    return (
      <Badge
        tone="amber"
        title="Marked verified, but no source URL or check date is recorded. Add both before treating this as checked."
      >
        Verified — source pending
      </Badge>
    );
  }

  return (
    <Badge tone={TONE[status]} title={VERIFICATION_DESCRIPTION[status]}>
      {VERIFICATION_LABEL[status]}
    </Badge>
  );
}

/**
 * Provenance block. Every course record shows where its requirements came
 * from, which cycle they belong to and when a human last checked them — plus a
 * direct link to the university's own page so the reader can confirm.
 */
export function SourceBadge({
  provenance,
  applicationYear,
  compact = false,
}: {
  provenance: Provenance;
  applicationYear: ApplicationYear;
  compact?: boolean;
}) {
  const { sourceUrl, officialUrl, sourceTitle, lastVerified, verificationStatus, sources } = provenance;
  const primaryLink = sourceUrl ?? officialUrl;

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-faint">
        <VerificationBadge status={verificationStatus} provenance={provenance} />
        <span>{applicationYear} entry</span>
        <span>Last verified: {formatDate(lastVerified)}</span>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/70 p-3">
      <div className="label mb-2">Source</div>
      <dl className="space-y-1.5 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-ink-faint">Source</dt>
          <dd className="min-w-0 text-ink">
            {sourceTitle ?? <span className="italic text-slate-400">No source recorded yet</span>}
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-ink-faint">Entry year</dt>
          <dd className="text-ink">{applicationYear}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-ink-faint">Last verified</dt>
          <dd className="text-ink">{formatDate(lastVerified)}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-ink-faint">Status</dt>
          <dd>
            <VerificationBadge status={verificationStatus} provenance={provenance} />
          </dd>
        </div>
      </dl>

      {primaryLink ? (
        <a href={primaryLink} target="_blank" rel="noreferrer" className="btn-primary mt-3 h-8 w-full text-xs">
          View official requirements <IconExternal width={12} height={12} />
        </a>
      ) : (
        <p className="mt-3 rounded border border-dashed border-slate-300 p-2 text-xs italic text-slate-500">
          No official link recorded for this record yet. Add one in the data manager before marking it
          verified.
        </p>
      )}

      {sources.length > 0 ? (
        <ul className="mt-3 space-y-1 border-t border-slate-200 pt-2 text-xs">
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="link">
                {s.title}
              </a>
              <span className="text-ink-faint">
                {s.applicationYear ? ` · ${s.applicationYear} entry` : ''}
                {s.lastVerified ? ` · checked ${formatDate(s.lastVerified)}` : ''}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
