import type { Ranking, RankingCategory, University } from '@/types';
import { VERIFICATION_LABEL } from '@/data/taxonomy';
import { formatDate, getRankings, preferredRanking, rankingIsVerified } from '@/lib/format';
import { IconExternal } from './ui/icons';
import { Badge } from './ui/primitives';

const CATEGORY_LABEL: Record<RankingCategory, string> = {
  overall: 'Overall',
  'physics-astronomy': 'Physics',
  'engineering-technology': 'Engineering',
};

/**
 * A position is never shown on its own. Provider and edition always travel with
 * it, and anything short of a fully-sourced verified record is marked, so a
 * placeholder can never read as a published fact.
 */
export function RankingBadge({
  university,
  category,
  showProvider = true,
}: {
  university: University;
  category: RankingCategory;
  showProvider?: boolean;
}) {
  const ranking = preferredRanking(university, category);
  const others = getRankings(university, category).length - 1;

  if (!ranking) {
    return (
      <span className="inline-flex flex-col">
        <span className="label">{CATEGORY_LABEL[category]}</span>
        <span className="text-sm italic text-slate-400">Not available</span>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col">
      <span className="label">{CATEGORY_LABEL[category]}</span>
      <span className="flex flex-wrap items-baseline gap-1.5">
        <span className="text-sm font-semibold tabular-nums text-navy-900">#{ranking.rank}</span>
        {showProvider ? (
          <span className="text-[11px] text-ink-faint">
            {ranking.providerShort} {ranking.edition}
          </span>
        ) : null}
        {rankingIsVerified(ranking) ? null : (
          <Badge
            tone="demo"
            title={`${VERIFICATION_LABEL[ranking.verificationStatus]} — not a checked published position.`}
          >
            {ranking.verificationStatus === 'demo' ? 'sample' : 'unverified'}
          </Badge>
        )}
        {others > 0 ? (
          <span className="text-[11px] text-ink-faint" title="Other providers or editions recorded">
            +{others}
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** Full provenance line used on the university profile. */
export function RankingRow({ ranking }: { ranking: Ranking }) {
  const verified = rankingIsVerified(ranking);
  return (
    <div className="border-b border-slate-100 py-2 last:border-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-medium text-ink">
            {ranking.provider} {ranking.edition}
          </div>
          <div className="text-xs text-ink-faint">{ranking.categoryLabel}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={verified ? 'green' : 'demo'}>
            {verified ? 'Verified' : VERIFICATION_LABEL[ranking.verificationStatus]}
          </Badge>
          <span className="text-lg font-semibold tabular-nums text-navy-900">#{ranking.rank}</span>
        </div>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-faint">
        <span>Last verified: {formatDate(ranking.lastVerified)}</span>
        {ranking.sourceUrl ? (
          <a href={ranking.sourceUrl} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
            {ranking.sourceTitle ?? 'Source'} <IconExternal width={11} height={11} />
          </a>
        ) : (
          <span className="italic">No source recorded</span>
        )}
      </div>
    </div>
  );
}
