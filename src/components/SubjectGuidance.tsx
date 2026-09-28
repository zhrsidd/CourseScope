import type { UniversitySubjectGuidance } from '@/data/university-subject-guidance';
import { formatDate } from '@/lib/format';
import { IconExternal } from './ui/icons';
import { Card, SectionTitle } from './ui/primitives';

/**
 * A university's institution-wide A-Level subject policy, shown on its course
 * pages as its OWN card, below the course's entry requirements and visually
 * separate from them. The first thing it says is that it is not this course's
 * requirement — that line is the whole reason this is safe to show.
 */
export function SubjectGuidance({ guidance }: { guidance: UniversitySubjectGuidance }) {
  const total = guidance.groups.reduce((n, g) => n + g.subjects.length, 0);
  return (
    <div data-testid="subject-guidance">
    <Card className="p-4">
      <SectionTitle>{guidance.title}</SectionTitle>
      <p className="rounded border border-navy-100 bg-navy-50/60 p-2.5 text-xs leading-relaxed text-navy-900">
        <strong>General university policy — not this course’s requirements.</strong> The subject
        requirements above always apply. A subject appearing on this list does not replace a subject
        this course requires.
      </p>

      <blockquote className="mt-3 border-l-2 border-slate-300 pl-3 text-sm leading-relaxed text-ink-muted">
        {guidance.rule}
      </blockquote>

      <details className="mt-3 rounded border border-slate-200 bg-slate-50/60 px-3 py-2">
        <summary className="cursor-pointer text-sm font-medium text-navy-800">
          Preferred A-Level subjects ({total})
        </summary>
        <div className="mt-3 space-y-3">
          {guidance.groups.map((g) => (
            <div key={g.name}>
              <p className="label mb-1.5">{g.name}</p>
              <ul className="grid grid-cols-1 gap-x-4 gap-y-1 text-[13px] text-ink sm:grid-cols-2">
                {g.subjects.map((s) => (
                  <li key={s} className="min-w-0 break-words">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      {guidance.notAccepted ? (
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          <strong className="text-ink">Not accepted:</strong> {guidance.notAccepted.wording}
        </p>
      ) : null}
      {guidance.notes.map((n) => (
        <p key={n} className="mt-2 text-xs leading-relaxed text-ink-muted">
          {n}
        </p>
      ))}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-xs">
        <a href={guidance.source.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
          {guidance.source.linkLabel} <IconExternal width={12} height={12} />
        </a>
        <span className="text-ink-faint">Last verified {formatDate(guidance.source.lastVerified)}</span>
      </div>
    </Card>
    </div>
  );
}
