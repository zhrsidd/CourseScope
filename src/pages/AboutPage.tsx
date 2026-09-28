import { usePageTitle } from '@/lib/page-title';
import { GLOSSARY, VERIFICATION_DESCRIPTION, VERIFICATION_STATUSES } from '@/data/taxonomy';
import { CATALOGUE_DISCLAIMER } from '@/data';
import { Card, PageHeader, SectionTitle } from '@/components/ui/primitives';
import { VerificationBadge } from '@/components/SourceBadge';
import { useApp } from '@/state/AppContext';
import { APP_VERSION, IS_PRE_RELEASE, RELEASES } from '@/data/version';
import { BRAND_NAME, BRAND_POSITIONING } from '@/lib/brand';
import { FeedbackLink } from '@/components/ReportIssue';

export function AboutPage() {
  usePageTitle('About the data');
  const { universities, courses } = useApp();
  const counts = Object.fromEntries(
    VERIFICATION_STATUSES.map((s) => [s, courses.filter((c) => c.provenance.verificationStatus === s).length]),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Methodology"
        title="About the data"
        description="How this catalogue records entry requirements, what each verification status means, and how the matching engine reaches its verdict."
      />

      <div className="space-y-5">
        <p className="text-[15px] leading-relaxed text-navy-950" data-testid="brand-positioning">
          {BRAND_POSITIONING}
        </p>
        <Card className="p-4">
          <SectionTitle>Where the catalogue stands</SectionTitle>
          <p className="mb-3 text-sm leading-relaxed text-ink-muted">
            {courses.length} course records across {universities.length} universities. Admissions
            information is only as good as its verification status:
          </p>
          <ul className="space-y-2">
            {VERIFICATION_STATUSES.filter((s) => counts[s] > 0).map((s) => (
              <li key={s} className="flex flex-wrap items-baseline gap-2 border-b border-slate-100 py-1.5 last:border-0">
                <VerificationBadge status={s} />
                <span className="text-sm font-semibold tabular-nums text-navy-900">{counts[s]}</span>
                <span className="text-sm text-ink-muted">{VERIFICATION_DESCRIPTION[s]}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded border border-emerald-200 bg-emerald-50/60 p-2.5 text-sm leading-relaxed text-emerald-900">
            There are no placeholder records left. Every course listed here has an official source
            behind the fact that it exists — a university course page, or that university’s own
            course listing. That is a separate question from whether its entry requirements have
            been checked, and both are shown.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            <strong>University rankings, and university-wide admissions summaries, are not shown.</strong>{' '}
            Neither has yet been checked against its publisher, and a figure nobody has verified does
            not belong next to ones that have been. Each course's own record is the authority for its
            requirements. Application deadlines are shown only where one has been read from the
            university's own page.
          </p>

          <div className="mt-4 rounded border border-slate-200 bg-slate-50/60 p-3">
            <p className="mb-2 text-sm font-semibold text-navy-950">
              Two different questions, asked separately
            </p>
            <div className="space-y-2 text-sm leading-relaxed text-ink-muted">
              <p>
                <strong>Does this course exist?</strong> Answered from the university’s own course
                page or course listing. If we cannot answer it, the course is not listed at all.
              </p>
              <p>
                <strong>Have this year’s entry requirements been checked?</strong> Answered
                separately, and this is what the label on each course tells you. A course can
                certainly exist while its requirements are still unread — that is what “awaiting
                research” means, and it does not mean the course is doubtful.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>How requirements are stored</SectionTitle>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            <p>
              Entry requirements are never a single line of text. Each course holds one or more{' '}
              <strong>offer pathways</strong>, and each pathway holds structured subject requirements with
              a flag for required or recommended and an optional minimum grade — plus{' '}
              <strong>constraints</strong> for rules a flat list cannot express, such as “an A* in either
              Mathematics or Physics” or “one of Physics, Chemistry or Biology”.
            </p>
            <p>
              A pathway can also be conditional. “A*AA, or AAA if Further Mathematics is taken” is stored
              as two pathways, the second gated on actually taking Further Mathematics. A student who is
              not taking it does not <em>fail</em> that pathway — it simply does not apply to them.
            </p>
            <p>
              Alongside the structured version, each record keeps the university’s{' '}
              <strong>own wording verbatim</strong>, so you can check our interpretation against the
              source. Where the two disagree, the university’s wording is the one that counts.
            </p>
            <p>
              Every record is scoped to one <strong>application cycle</strong>. Where a university has not
              published requirements for a year, the record says so and links to the earlier year as a
              clearly-marked separate record. Requirements are never carried forward.
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>How the matching works</SectionTitle>
          <p className="mb-3 text-sm leading-relaxed text-ink-muted">
            Each pathway is evaluated independently and reported part by part:
          </p>
          <ul className="ml-4 list-disc space-y-1.5 text-sm text-ink-muted">
            <li>
              <strong>Overall grade requirement</strong> — your counted grades against the published
              profile. The counted set always includes the required subjects, then the best of what is
              left. A B in a required subject cannot hide behind an A in something else.
            </li>
            <li>
              <strong>Mathematics, Physics, Chemistry</strong> — presence, accepted alternatives, and the
              minimum grade in each, checked separately from the overall profile.
            </li>
            <li>
              <strong>Further Mathematics</strong> — on a seven-point scale. Only “required” can produce a
              fail; “strongly recommended”, “recommended” and “useful” produce an amber advisory.
            </li>
            <li>
              <strong>Other required subjects</strong> and any <strong>additional conditions</strong>.
            </li>
            <li>
              <strong>Admissions test</strong> — reported for information, scoped to the cycle. It never
              changes the academic verdict.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            The final academic match is one of four: <strong>meets published academic requirements</strong>,{' '}
            <strong>does not currently meet requirements</strong>, <strong>review required</strong> (the
            published wording cannot be checked mechanically), or{' '}
            <strong>insufficient information</strong>. There is deliberately no “likely” verdict and no
            admission probability. Universities weigh personal statements, references, tests, interviews
            and the strength of each year’s applicant pool, none of which follows from a grade profile.
          </p>
        </Card>

        <Card className="p-4">
          <SectionTitle>Adding verified data</SectionTitle>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            <p>
              The catalogue is reached only through the <code className="rounded bg-slate-100 px-1">DataSource</code>{' '}
              interface, so it can move to Supabase, Postgres, Firebase or a REST API without touching a
              single component.
            </p>
            <p>A record only becomes “verified” when all of these are present:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>the exact admissions page the requirements were read from</li>
              <li>a source title naming that page</li>
              <li>the date a person read it</li>
              <li>the application cycle it describes</li>
            </ul>
            <p>
              A record that is missing any of those four is not shown as verified. Every record is
              also checked automatically against a set of rules before release — for the four
              conditions above, for entry-year separation, and for the application-identity rules
              described in the next section.
            </p>
            <p>
              Separately, a course is only listed at all if we can point to an official source for
              the fact that it exists. Where we can show a course exists but have not yet read its
              requirements, it is labelled that way rather than left to look complete.
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>What this tool does not model yet</SectionTitle>
          <p className="mb-2 text-sm leading-relaxed text-ink-muted">
            Deliberate omissions, listed so you know where the edges are rather than discovering them:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-ink-muted">
            <li>
              <strong>International Baccalaureate, Scottish Highers and BTEC.</strong> Matching assumes
              A-Levels. Where a university publishes equivalents, they can be recorded as notes but are
              not evaluated.
            </li>
            <li>
              <strong>Contextual-offer eligibility.</strong> Whether a contextual offer exists is
              recorded; whether <em>you</em> qualify for one is not assessed.
            </li>
            <li>
              <strong>Oxbridge college-level variation.</strong> Requirements that differ by college are
              recorded as conditions needing manual review, not modelled per college.
            </li>
          </ul>
        </Card>

        <Card className="p-4">
          <SectionTitle>Entry years are kept apart</SectionTitle>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            <p>
              Every record belongs to one entry year. <strong>2027 and 2028 are separate records</strong>,
              and a 2028 record never inherits a 2027 requirement — not the grades, not the subjects,
              not the admissions test, not the interview policy, not the contextual offer.
            </p>
            <p>
              Most universities have not published 2028 requirements yet. Where that is so, the 2028
              record says exactly that and carries no requirements at all, rather than quietly
              showing you last year’s and letting you assume.
            </p>
            <p>
              The same caution applies within a year. Where a university’s page is still serving an
              earlier cycle’s figures — some say so on the page itself — those figures are not
              imported, even though the course is listed.
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>Specialisms are not separate applications</SectionTitle>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            <p>
              Universities publish pages, and a page is not always something you can apply to. A
              specialism, a pathway, a later-year option or a named stream can have its own title,
              its own web page and its own description, and still be a route <em>inside</em> another
              application.
            </p>
            <p>
              A separate course is listed here only where there is authoritative evidence that it is
              applied to separately — its own UCAS code, or the university explicitly saying so.
              Where a named specialism sits inside another application, it is shown on that
              application’s card as a <strong>route within this application</strong>, so searching
              for it takes you to the code you would actually enter on UCAS.
            </p>
            <p>
              This cuts both ways. Some universities run a shared first year across several degrees
              that are still, genuinely, separate applications with separate codes. Those are kept
              separate, and the shared first year is explained on each one.
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>What the eligibility check means</SectionTitle>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            <p>
              It compares your grades against the <strong>published academic requirements</strong>,
              and that is all it does.
            </p>
            <p className="rounded border border-amber-200 bg-amber-50/70 p-2.5 text-amber-900">
              <strong>Meeting the requirements does not mean you will be admitted.</strong>{' '}
              Universities weigh personal statements, references, admissions tests, interviews and
              the strength of each year’s applicant pool. Many courses receive far more applicants
              who meet the published requirements than they have places for. Nothing here predicts
              an admissions decision.
            </p>
            <p>
              <strong>Contextual and widening-participation offers are shown but never applied
              automatically.</strong> Where a university publishes a reduced offer, you will see it —
              but eligibility for those schemes depends on your circumstances, which this tool does
              not ask for and could not verify. A contextual offer never improves the headline
              verdict.
            </p>
            <p>
              <strong>Admissions tests and interviews are reported, not scored.</strong> Where a
              course requires one, that is additional selection happening after the grades are
              compared, and it is not modelled.
            </p>
            <p>
              <strong>Requirements change.</strong> Universities revise them between cycles and
              sometimes within one. Every record shows when it was last checked and links to the
              page it came from.{' '}
              <strong>Confirm the final details with the university before you apply.</strong>
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>Glossary</SectionTitle>
          <dl className="divide-y divide-slate-100">
            {GLOSSARY.map((g) => (
              <div key={g.id} className="py-2.5">
                <dt className="text-sm font-medium text-navy-950">{g.term}</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-ink-muted">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="p-4">
          <SectionTitle>What changed recently</SectionTitle>
          <p className="mb-3 text-xs text-ink-muted">
            {IS_PRE_RELEASE ? (
              <>
                This catalogue is still being completed. It is published as{' '}
                <strong>{APP_VERSION}</strong> — not a finished release.
              </>
            ) : (
              <>
                You are using <strong>{APP_VERSION}</strong>.
              </>
            )}
          </p>
          {RELEASES.map((r) => (
            <div key={r.version} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
              <p className="text-sm font-semibold text-navy-950">
                {r.version.startsWith('v1') ? `${BRAND_NAME} ` : ''}
                {r.version} — {r.headline}{' '}
                <span className="font-normal text-ink-faint">({r.date})</span>
              </p>
              <ul className="ml-4 mt-1.5 list-disc space-y-1 text-sm leading-relaxed text-ink-muted">
                {r.changes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </Card>

        <Card className="p-4">
          <SectionTitle>Found an error?</SectionTitle>
          <p className="text-sm leading-relaxed text-ink-muted">
            If something here does not match what a university publishes — a grade, a subject, a
            UCAS code, a broken link, a course that has closed or one that is missing — please tell
            us. Every course page has a <strong>Found an error? Report it</strong> button in its
            source panel that fills in the course details for you. For anything else:
          </p>
          <FeedbackLink className="btn-secondary mt-3 h-8 px-3 text-xs">Report an issue</FeedbackLink>
        </Card>

        <Card className="p-4">
          <SectionTitle>Disclaimer</SectionTitle>
          <p className="text-sm leading-relaxed text-ink-muted">{CATALOGUE_DISCLAIMER}</p>
        </Card>
      </div>
    </div>
  );
}
