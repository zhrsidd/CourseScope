/**
 * ---------------------------------------------------------------------------
 *  REPORT AN ISSUE WITH THIS COURSE
 * ---------------------------------------------------------------------------
 *
 *  A catalogue that publishes admissions data needs a way for a reader to say
 *  "this is wrong", or the only people who can correct it are the people who
 *  wrote it.
 *
 *  DELIBERATELY BACKEND-FREE. There is no account system, no server and no
 *  database in this build. In production (v1.0.0) the destination is an
 *  external form, set by VITE_FEEDBACK_URL. The flow
 *  produces a structured report and hands it to the reader in whichever way
 *  their device can actually deliver: their email client, or their clipboard.
 *  Both paths produce identical text, so a report that arrives by either route
 *  can be acted on the same way.
 *
 *  WHAT IT IS NOT: it does not send anything on the reader's behalf, it does
 *  not collect an email address, and it stores nothing. Nothing leaves the
 *  page unless the reader chooses to send it.
 *
 *  THE REPORT CARRIES THE RECORD'S IDENTITY, not just its title — university,
 *  course, award, entry year, UCAS code, internal record id, current trust
 *  state and the source URL we read. A report that says "the Physics grades
 *  look wrong" is nearly unactionable; one that names york-physics-bsc--2027
 *  and the page it came from can be checked in a minute.
 *
 *  THE DESTINATION IS CONFIGURED BY ENVIRONMENT, not hardcoded.
 *
 *  `VITE_FEEDBACK_URL` — an external form or issue tracker. Preferred, because
 *  a form can validate and route, and because it does not expose an address.
 *  `VITE_FEEDBACK_EMAIL` — a project mailbox, used when no form is set.
 *
 *  Order of preference is form, then email, then copy-only. NO BUTTON EVER
 *  PRETENDS TO SEND SOMEWHERE THAT DOES NOT EXIST: with neither variable set,
 *  the send controls are not rendered at all and the reader is offered the
 *  prepared report to copy, with the reason stated. That is a real fallback
 *  rather than a dead submit, and it is the behaviour a static build with no
 *  server can honestly offer.
 *
 *  Nothing is ever sent automatically and nothing is stored. The reader sees
 *  the exact text before it goes anywhere.
 *
 *  No personal address is compiled into the build. `.env.example` documents the
 *  variables; a deployment sets whichever it has.
 */

import { useState } from 'react';
import type { Course, University } from '@/types';
import { VERIFICATION_LABEL } from '@/data/taxonomy';
import { APP_VERSION } from '@/data/version';
import { cx } from './ui/primitives';

/*
 * Read once at module load. Vite inlines `import.meta.env.VITE_*` at build time,
 * so an unset variable becomes undefined rather than throwing — which is why
 * the empty string fallback matters: a deployment that sets the variable to ""
 * behaves the same as one that never set it.
 */
const env = (import.meta.env ?? {}) as Record<string, string | undefined>;

/** An external form or issue tracker. Preferred over email. */
export const REPORT_URL: string = (env.VITE_FEEDBACK_URL ?? '').trim();

/** A project mailbox. Used only when no form URL is configured. */
export const REPORT_EMAIL: string = (env.VITE_FEEDBACK_EMAIL ?? '').trim();

export type ReportRoute = 'form' | 'email' | 'copy-only';

/** Which send route this build actually has. Drives the UI and the report. */
export function reportRoute(): ReportRoute {
  if (REPORT_URL) return 'form';
  if (REPORT_EMAIL) return 'email';
  return 'copy-only';
}

export const ISSUE_TYPES = [
  'The admissions requirement looks wrong',
  'The course title or UCAS code looks wrong',
  'The source link is broken',
  'This course appears to have been discontinued',
  'A course is missing',
  'The eligibility result looks wrong',
  'Something else',
] as const;

export type IssueType = (typeof ISSUE_TYPES)[number];

export function buildIssueReport(
  course: Course,
  university: University | undefined,
  issueType: IssueType,
  detail: string,
): string {
  return [
    'Course data issue report',
    '',
    `Issue type:      ${issueType}`,
    `University:      ${university?.name ?? course.universityId}`,
    `Course:          ${course.name}`,
    `Award:           ${course.awardLabel ?? course.degreeType}`,
    `Entry year:      ${course.applicationYear}`,
    `UCAS code:       ${course.courseCode ?? '(none published)'}`,
    `Record ID:       ${course.id}`,
    `Trust state:     ${VERIFICATION_LABEL[course.provenance.verificationStatus]}`,
    `Source we read:  ${course.provenance.sourceUrl ?? course.provenance.officialUrl ?? '(none recorded)'}`,
    `Last checked:    ${course.provenance.lastVerified ?? '(never)'}`,
    `Catalogue build: ${APP_VERSION}`,
    `Page:            ${typeof window === 'undefined' ? '(unknown)' : window.location.href}`,
    '',
    'What looks wrong:',
    detail.trim() || '(no detail given)',
    '',
  ].join('\n');
}

export function ReportIssue({
  course,
  university,
}: {
  course: Course;
  university: University | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [issueType, setIssueType] = useState<IssueType>(ISSUE_TYPES[0]);
  const [detail, setDetail] = useState('');
  const [copied, setCopied] = useState(false);
  // Set when the browser refuses clipboard access, so the status line never
  // claims "copied" for a report that is not on the clipboard.
  const [copyFailed, setCopyFailed] = useState(false);
  const route = reportRoute();

  const report = buildIssueReport(course, university, issueType, detail);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopyFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      // Clipboard access can be refused outright — in an iframe, over http, or
      // by the reader's own settings. The textarea above always holds the full
      // report, so a refusal costs the reader a manual select-and-copy rather
      // than the report itself — and the status line says so instead of
      // pretending the copy worked.
      setCopied(false);
      setCopyFailed(true);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        className="btn-ghost h-8 px-2 text-xs"
        aria-expanded={open}
        aria-controls={`report-${course.id}`}
        onClick={() => setOpen((v) => !v)}
      >
        Report an issue with this course
      </button>

      {open ? (
        <div
          id={`report-${course.id}`}
          className="mt-2 rounded border border-slate-200 bg-slate-50/60 p-3"
        >
          <p className="mb-3 text-xs leading-relaxed text-ink-muted">
            Spotted something that does not match what the university publishes? Tell us what looks
            wrong. Nothing is sent automatically — you will get a prepared report to send or paste
            wherever suits you.
          </p>

          <label className="label mb-1 block" htmlFor={`issue-type-${course.id}`}>
            What kind of issue
          </label>
          <select
            id={`issue-type-${course.id}`}
            className="field mb-3"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value as IssueType)}
          >
            {ISSUE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label className="label mb-1 block" htmlFor={`issue-detail-${course.id}`}>
            What looks wrong
          </label>
          <textarea
            id={`issue-detail-${course.id}`}
            className="field mb-3 min-h-[70px]"
            placeholder="For example: the university’s page now says A*AA, not AAA."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

          <p className="label mb-1">The report that will be sent</p>
          <textarea
            className="field mb-3 min-h-[220px] font-mono text-[11px]"
            readOnly
            aria-label="Prepared issue report"
            value={report}
          />

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn-secondary h-8 px-2.5 text-xs" onClick={copy}>
              {copied ? 'Copied' : 'Copy report'}
            </button>

            {route === 'form' ? (
              <a
                className="btn-primary h-8 px-2.5 text-xs"
                href={REPORT_URL}
                target="_blank"
                rel="noreferrer noopener"
                onClick={copy}
              >
                Open the report form
              </a>
            ) : null}

            {route === 'email' ? (
              <a
                className="btn-primary h-8 px-2.5 text-xs"
                href={`mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(
                  `Course data issue: ${course.name} (${course.id})`,
                )}&body=${encodeURIComponent(report)}`}
              >
                Send by email
              </a>
            ) : null}

            <span
              className={cx(
                'text-xs',
                copied ? 'text-emerald-700' : copyFailed ? 'text-amber-800' : 'text-ink-faint',
              )}
              role="status"
            >
              {copyFailed
                ? 'Your browser did not allow automatic copying. Select the report above, copy it, and paste it into the form.'
                : copied
                ? route === 'form'
                  ? 'Report copied — paste it into the form.'
                  : 'Report copied.'
                : route === 'form'
                  ? 'The form opens in a new tab and your report is copied as it opens, ready to paste.'
                  : route === 'email'
                    ? 'This opens your email app with the report already filled in. Nothing is sent until you send it.'
                    : 'This build has no reporting address configured, so there is nothing to submit to. Copy the report and send it however you reached us.'}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
