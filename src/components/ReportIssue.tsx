/**
 * ---------------------------------------------------------------------------
 *  REPORT AN ISSUE
 * ---------------------------------------------------------------------------
 *
 *  A catalogue that publishes admissions data needs a way for a reader to say
 *  "this is wrong", or the only people who can correct it are the people who
 *  wrote it. v1.0.0 gives it three routes, all opening the same form:
 *
 *   1. COURSE PAGES — "Found an error? Report it", inside the source and
 *      verification panel, where a reader who doubts a requirement is already
 *      looking. It prepares a structured report for that exact record.
 *   2. THE FOOTER — "Report an issue", on every page.
 *   3. THE METHODOLOGY PAGE — alongside the explanation of how data is checked.
 *
 *  DELIBERATELY BACKEND-FREE. There is no server in this build. The destination
 *  is an external form set by VITE_FEEDBACK_URL (production: the project's
 *  Typeform), or a mailbox set by VITE_FEEDBACK_EMAIL. With neither, the report
 *  can only be copied, and the UI says so. NO CONTROL EVER PRETENDS TO SUBMIT:
 *  nothing is sent automatically, nothing is stored, and the reader sees the
 *  exact text before it goes anywhere.
 *
 *  CONTEXT TRAVELS TWO WAYS, so it arrives whatever the form is set up to do:
 *
 *   · As query parameters Typeform reads as hidden fields
 *     (`?university=…&course=…&record_id=…`). Typeform accepts hidden fields
 *     from the query string or the fragment; the query string is its
 *     recommended form for non-personal values, and these are all public
 *     catalogue facts — never anything the reader typed about themselves. A
 *     form records only the parameters it has declared (Typeform: Workflow →
 *     URL parameters) and ignores the rest, so this is harmless before the
 *     form is set up and starts capturing the moment it is.
 *   · As the full prepared report on the clipboard, to paste into the form's
 *     free-text answer. This is what works with no form configuration at all.
 *
 *  LINKS STAY PLAIN LINKS. The production host renders the app in a sandboxed
 *  frame and handles external links itself; a script-driven window.open is
 *  what a sandbox blocks. So the form is opened by an ordinary
 *  target="_blank" anchor — the same mechanism as every official-source link
 *  on the site — and the form's address is shown in the panel as well, so a
 *  reader whose browser refuses new tabs can still get there.
 */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Course, University } from '@/types';
import { VERIFICATION_LABEL } from '@/data/taxonomy';
import { APP_VERSION } from '@/data/version';
import { SITE_URL } from '@/lib/site-meta';
import { IconExternal, IconFlag } from './ui/icons';
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

/** Catalogue context for a report. Every field is a public catalogue fact. */
export interface FeedbackContext {
  university?: string;
  course?: string;
  award?: string;
  ucas_code?: string;
  entry_year?: string;
  record_id?: string;
  issue_type?: string;
  page?: string;
}

export function courseFeedbackContext(
  course: Course,
  university: University | undefined,
  page: string,
  issueType?: IssueType,
): FeedbackContext {
  return {
    university: university?.name ?? course.universityId,
    course: course.name,
    award: course.awardLabel ?? course.degreeType,
    ucas_code: course.courseCode ?? '',
    entry_year: course.applicationYear,
    record_id: course.id,
    issue_type: issueType,
    page,
  };
}

/** The hidden-field names the form is sent, in a stable order. */
export const FEEDBACK_PARAMS = [
  'university',
  'course',
  'award',
  'ucas_code',
  'entry_year',
  'record_id',
  'issue_type',
  'page',
] as const satisfies readonly (keyof FeedbackContext)[];

/**
 * The form URL with context as Typeform hidden-field query parameters. Empty
 * values are left out. Parameters already on the configured URL are kept, and
 * any fragment on it stays at the end where it belongs.
 */
export function feedbackUrl(context: FeedbackContext = {}): string {
  if (!REPORT_URL) return '';
  const [beforeHash, hash = ''] = REPORT_URL.split('#');
  const [base, existing = ''] = beforeHash.split('?');
  const params = new URLSearchParams(existing);
  for (const k of FEEDBACK_PARAMS) {
    const v = context[k];
    if (v) params.set(k, v);
  }
  const query = params.toString();
  return `${base}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

/**
 * The page the reader is on. Uses the configured public site URL when there is
 * one: inside the production host's sandboxed frame, window.location is the
 * frame's own internal address, which would mean nothing in a report.
 */
export function currentPageUrl(pathname: string): string {
  if (SITE_URL) return `${SITE_URL}#${pathname}`;
  if (typeof window === 'undefined') return pathname;
  return `${window.location.origin}${window.location.pathname}#${pathname}`;
}

export function buildIssueReport(
  course: Course,
  university: University | undefined,
  issueType: IssueType,
  detail: string,
  page: string = currentPageUrl(`/course/${course.id}`),
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
    `Page:            ${page}`,
    '',
    'What looks wrong:',
    detail.trim() || '(no detail given)',
    '',
  ].join('\n');
}

/**
 * Site-wide link to the feedback form, with the current page as context.
 * Renders nothing when no form or mailbox is configured — a link to nowhere
 * would be the fake action this component exists to avoid.
 */
export function FeedbackLink({
  className,
  children = 'Report an issue',
}: {
  className?: string;
  children?: string;
}) {
  const { pathname } = useLocation();
  const route = reportRoute();
  if (route === 'copy-only') return null;
  const href =
    route === 'form'
      ? feedbackUrl({ page: currentPageUrl(pathname) })
      : `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent('CourseScope: issue report')}`;
  return (
    <a
      href={href}
      target={route === 'form' ? '_blank' : undefined}
      rel="noreferrer noopener"
      className={className}
      data-feedback-link=""
    >
      {children}
    </a>
  );
}

export function ReportIssue({
  course,
  university,
}: {
  course: Course;
  university: University | undefined;
}) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [issueType, setIssueType] = useState<IssueType>(ISSUE_TYPES[0]);
  const [detail, setDetail] = useState('');
  const [copied, setCopied] = useState(false);
  // Set when the browser refuses clipboard access, so the status line never
  // claims "copied" for a report that is not on the clipboard.
  const [copyFailed, setCopyFailed] = useState(false);
  const route = reportRoute();

  const report = buildIssueReport(course, university, issueType, detail, currentPageUrl(pathname));
  const formHref = feedbackUrl(courseFeedbackContext(course, university, currentPageUrl(pathname), issueType));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopyFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      // Clipboard access can be refused outright — in an iframe, over http, or
      // by the reader's own settings. The textarea always holds the full
      // report, so a refusal costs the reader a manual select-and-copy rather
      // than the report itself — and the status line says so instead of
      // pretending the copy worked.
      setCopied(false);
      setCopyFailed(true);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn-secondary h-8 w-full justify-center px-2.5 text-xs"
        aria-expanded={open}
        aria-controls={`report-${course.id}`}
        onClick={() => setOpen((v) => !v)}
      >
        <IconFlag width={13} height={13} />
        Found an error? Report it
      </button>

      {open ? (
        <div id={`report-${course.id}`} className="mt-2 rounded border border-slate-200 bg-white p-3">
          <p className="mb-3 text-xs leading-relaxed text-ink-muted">
            Tell us what does not match what the university publishes. Nothing is sent
            automatically — you review the report, then send it through{' '}
            {route === 'form' ? 'our feedback form' : route === 'email' ? 'your email app' : 'whatever route suits you'}.
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

          <p className="label mb-1">Your report</p>
          <textarea
            className="field mb-3 min-h-[200px] font-mono text-[11px]"
            readOnly
            aria-label="Prepared issue report"
            value={report}
          />

          <div className="flex flex-wrap items-center gap-2">
            {route === 'form' ? (
              <a
                className="btn-primary h-8 px-2.5 text-xs"
                href={formHref}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => void copy()}
              >
                Open the report form <IconExternal width={12} height={12} />
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

            <button type="button" className="btn-secondary h-8 px-2.5 text-xs" onClick={() => void copy()}>
              {copied ? 'Copied' : 'Copy report'}
            </button>
          </div>

          <p
            className={cx(
              'mt-2 text-xs leading-relaxed',
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
                  ? 'The form opens in a new tab with this course filled in, and your report is copied as it opens, ready to paste.'
                  : route === 'email'
                    ? 'This opens your email app with the report already filled in. Nothing is sent until you send it.'
                    : 'This build has no reporting address configured, so there is nothing to submit to. Copy the report and send it however you reached us.'}
          </p>

          {route === 'form' ? (
            <p className="mt-2 text-[11px] leading-relaxed text-ink-faint">
              Form not opening? Its address is{' '}
              <span className="select-all break-all font-mono text-ink-muted" data-testid="report-form-address">
                {REPORT_URL}
              </span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
