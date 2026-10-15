import { usePageTitle } from '@/lib/page-title';
import { GLOSSARY } from '@/data/taxonomy';
import { CATALOGUE_DISCLAIMER } from '@/data/disclaimer';
import { CoverageMatrix } from '@/components/CoverageMatrix';
import { Collapse } from '@/components/ui/Collapse';
import { IconChevron } from '@/components/ui/icons';
import { useState, type ReactNode } from 'react';
import { useApp } from '@/state/AppContext';
import { APP_VERSION, IS_PRE_RELEASE, RELEASES } from '@/data/version';
import { BRAND_NAME, BRAND_POSITIONING } from '@/lib/brand';
import { FeedbackLink } from '@/components/ReportIssue';

function Sect({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="ab-sec" tabIndex={-1}>
      <h2 id={`${id}-h`} className="ab-h">{title}</h2>
      <div className="ab-body">{children}</div>
    </section>
  );
}

const TOC: [string, string][] = [
  ['ab-coverage', 'Where the catalogue stands'],
  ['ab-stored', 'How requirements are stored'],
  ['ab-matching', 'How the matching works'],
  ['ab-years', 'Entry years are kept apart'],
  ['tuition-fees-method', 'How tuition fees are recorded'],
  ['ab-specialisms', 'Specialisms'],
  ['ab-meaning', 'What the check means'],
  ['ab-verified', 'Adding verified data'],
  ['ab-limits', 'What is not modelled'],
  ['ab-glossary', 'Glossary'],
  ['ab-changes', 'What changed recently'],
  ['ab-error', 'Found an error?'],
];

function AboutPageInner() {
  usePageTitle('About the data');
  const { loading, universities, courses } = useApp();
  const [logOpen, setLogOpen] = useState(false);
  const verifiedCount = courses.filter((c) => c.provenance.verificationStatus === 'verified' || c.provenance.verificationStatus === 'partially-verified').length;

  return (
    <div className="ab mx-auto max-w-6xl px-4 py-6 md:px-6">
      <header className="ab-head">
        <p className="label">Methodology</p>
        <h1>About the data</h1>
        <p className="ab-lede" data-testid="brand-positioning">
          {BRAND_POSITIONING}
        </p>
        <p className="ab-sub">
          How this catalogue records entry requirements, what each verification status means, and how the matching engine reaches its verdict.
        </p>
      </header>

      <div className="ab-grid">
        <nav className="ab-toc" aria-label="On this page">
          <p className="label">On this page</p>
          <ol>
            {TOC.map(([id, label]) => (
              <li key={id}>
                <a href={`#/about`} onClick={(e) => { e.preventDefault(); const el = document.getElementById(id); el?.scrollIntoView({ block: 'start' }); el?.focus({ preventScroll: true }); }}>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="ab-main">
          <Sect id="ab-coverage" title="Where the catalogue stands">
            <p>
              Each tile in the table below is one course record, shaded by what is known about its entry
              requirements: read against an official source, awaiting our research, or not yet published by
              the university.
            </p>
            {loading ? (
              /* Same words as the sentence below, hidden, so it wraps to the same number of lines. */
              <p className="ab-ph-text" aria-hidden="true">
                000 course records across 00 universities, of which 000 have had their entry requirements read
                against an official source.
              </p>
            ) : (
              <p>
                {courses.length} course records across {universities.length} universities, of which{' '}
                {verifiedCount} have had their entry requirements read against an official source.
              </p>
            )}
            <div className="ab-wide">
              {loading ? (
                <div className="ab-ph-matrix" role="status">
                  <span className="sr-only">Loading the coverage table…</span>
                </div>
              ) : (
                <CoverageMatrix courses={courses} universities={universities} />
              )}
            </div>
            <p className="ab-callout">
              There are no placeholder records left. Every course listed here has an official source
              behind the fact that it exists — a university course page, or that university’s own
              course listing. That is a separate question from whether its entry requirements have
              been checked, and both are shown.
            </p>
            <dl className="ab-pair">
              <div>
                <dt>Does this course exist?</dt>
                <dd>
                  Answered from the university’s own course page or course listing. If we cannot
                  answer it, the course is not listed at all.
                </dd>
              </div>
              <div>
                <dt>Have this year’s requirements been checked?</dt>
                <dd>
                  Answered separately, and this is what the label on each course tells you. A course
                  can certainly exist while its requirements are still unread — that is what “not
                  verified by us yet” means, and it does not mean the course is doubtful.
                </dd>
              </div>
            </dl>
            <p>
              <strong>University rankings, and university-wide admissions summaries, are not shown.</strong>{' '}
              Neither has yet been checked against its publisher, and a figure nobody has verified does
              not belong next to ones that have been. Each course's own record is the authority for its
              requirements. Application deadlines are shown only where one has been read from the
              university's own page.
            </p>
          </Sect>

          <Sect id="ab-stored" title="How requirements are stored">
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
          </Sect>

          <Sect id="ab-matching" title="How the matching works">
            <p>Each pathway is evaluated independently and reported part by part:</p>
            <ul className="ab-list">
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
            <p>
              The final academic match is one of four: <strong>meets published academic requirements</strong>,{' '}
              <strong>does not currently meet requirements</strong>, <strong>review required</strong> (the
              published wording cannot be checked mechanically), or{' '}
              <strong>insufficient information</strong>. There is deliberately no “likely” verdict and no
              admission probability. Universities weigh personal statements, references, tests, interviews
              and the strength of each year’s applicant pool, none of which follows from a grade profile.
            </p>
            <p>
              On every course page the <strong>Requirement Ledger</strong> sets the published
              requirements, your grades and the result of each check side by side, so the verdict can be
              traced to the line that caused it.
            </p>
          </Sect>

          <Sect id="ab-years" title="Entry years are kept apart">
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
          </Sect>

          <Sect id="tuition-fees-method" title="How tuition fees are recorded">
            <p>
              Fees are read from each university’s own pages and recorded <strong>per course and per
              entry year</strong>, in the university’s own categories. Scottish universities, for
              example, publish separate Scotland and Rest of UK fees, and those stay separate.
            </p>
            <p>
              A fee is shown as published only when the university states it for that entry year without
              a “to be confirmed” caveat. An expected figure is labelled as expected. Where official pages
              disagree, the fee is shown as not established rather than picking one. A figure from one
              entry year is never shown for another, and one course’s fee is never copied to another
              unless the university says the same fee applies to all courses.
            </p>
            <p>
              Fees are information only. They are kept apart from entry requirements and play no part in
              the eligibility check. Which fee category applies to you depends on your fee status, which
              the university decides.
            </p>
          </Sect>

          <Sect id="ab-specialisms" title="Specialisms are not separate applications">
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
          </Sect>

          <Sect id="ab-meaning" title="What the eligibility check means">
            <p>
              It compares your grades against the <strong>published academic requirements</strong>,
              and that is all it does.
            </p>
            <p className="ab-callout ab-callout-warn">
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
          </Sect>

          <Sect id="ab-verified" title="Adding verified data">
            <p>
              The catalogue is reached only through the <code className="rounded bg-slate-100 px-1">DataSource</code>{' '}
              interface, so it can move to Supabase, Postgres, Firebase or a REST API without touching a
              single component.
            </p>
            <p>A record only becomes “verified” when all of these are present:</p>
            <ul className="ab-list">
              <li>the exact admissions page the requirements were read from</li>
              <li>a source title naming that page</li>
              <li>the date a person read it</li>
              <li>the application cycle it describes</li>
            </ul>
            <p>
              A record that is missing any of those four is not shown as verified. Every record is
              also checked automatically against a set of rules before release — for the four
              conditions above, for entry-year separation, and for the application-identity rules
              described in the sections above.
            </p>
            <p>
              Separately, a course is only listed at all if we can point to an official source for
              the fact that it exists. Where we can show a course exists but have not yet read its
              requirements, it is labelled that way rather than left to look complete.
            </p>
          </Sect>

          <Sect id="ab-limits" title="What this tool does not model yet">
            <p>Deliberate omissions, listed so you know where the edges are rather than discovering them:</p>
            <ul className="ab-list">
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
          </Sect>

          <Sect id="ab-glossary" title="Glossary">
            <dl className="ab-gloss">
              {GLOSSARY.map((g) => (
                <div key={g.id}>
                  <dt>{g.term}</dt>
                  <dd>{g.definition}</dd>
                </div>
              ))}
            </dl>
          </Sect>

          <Sect id="ab-changes" title="What changed recently">
            <p>
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
            <button
              type="button"
              className="disclose"
              aria-expanded={logOpen}
              aria-controls="ab-log"
              onClick={() => setLogOpen((o) => !o)}
            >
              <IconChevron width={14} height={14} />
              {logOpen ? 'Hide' : 'Show'} the release notes
            </button>
            <Collapse open={logOpen} id="ab-log">
              <div className="ab-log">
                {RELEASES.map((r) => (
                  <div key={r.version}>
                    <h3>
                      {r.version.startsWith('v1') ? `${BRAND_NAME} ` : ''}
                      {r.version} — {r.headline} <span>({r.date})</span>
                    </h3>
                    <ul className="ab-list">
                      {r.changes.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Collapse>
          </Sect>

          <Sect id="ab-error" title="Found an error?">
            <p>
              If something here does not match what a university publishes — a grade, a subject, a
              UCAS code, a broken link, a course that has closed or one that is missing — please tell
              us. Every course page has a <strong>Found an error? Report it</strong> button in its
              source panel that fills in the course details for you. For anything else:
            </p>
            <FeedbackLink className="btn-secondary h-8 px-3 text-xs">Report an issue</FeedbackLink>
            <p className="ab-fine">{CATALOGUE_DISCLAIMER}</p>
          </Sect>
        </div>
      </div>
    </div>
  );
}

/** Everything on this page except the coverage matrix is prose, so it renders without waiting for the catalogue. */
export function AboutPage() {
  return <AboutPageInner />;
}
