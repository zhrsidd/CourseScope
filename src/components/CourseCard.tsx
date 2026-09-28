import { Link } from 'react-router-dom';
import type { Course, EligibilityReport, University } from '@/types';
import { ADVISORY_FURTHER_MATHS } from '@/types';
import {
  FURTHER_MATHS_LABEL,
  admissionsTestFullLabel,
  awardLabel,
  durationLabel,
  primaryOffer,
  typicalOfferLabel,
} from '@/lib/format';
import { filledGrades } from '@/lib/grades';
import { MAX_COMPARE, useApp } from '@/state/AppContext';
import { EligibilityBadge } from './EligibilityBadge';
import { EligibilityReasons } from './EligibilityReasons';
import { InfoTooltip } from './InfoTooltip';
import { SubjectRequirementRow } from './SubjectRequirement';
import { VerificationBadge } from './SourceBadge';
import { IconCompare, IconHeart, IconWarning } from './ui/icons';
import { Badge, Card, cx } from './ui/primitives';

export function CourseCard({
  course,
  university,
  eligibility,
  matchedRoutes = [],
}: {
  course: Course;
  university: University | undefined;
  eligibility: EligibilityReport | undefined;
  /**
   * Routes within this application that explain why the search returned it.
   * A study option is not a separate course, so the card says which route
   * matched rather than pretending a second application exists.
   */
  matchedRoutes?: string[];
}) {
  const { profile, savedCourseIds, toggleSavedCourse, compareIds, toggleCompare } = useApp();
  const entries = filledGrades(profile);
  const saved = savedCourseIds.includes(course.id);
  const comparing = compareIds.includes(course.id);
  const compareFull = compareIds.length >= MAX_COMPARE && !comparing;
  const offer = primaryOffer(course);
  const notPublished = course.requirementsPublicationStatus === 'not-yet-published';
  const awaiting = course.provenance.verificationStatus === 'awaiting-data';
  const fmAdvisory = (ADVISORY_FURTHER_MATHS as readonly string[]).includes(course.furtherMathematics);
  const fmConditional = course.furtherMathematics === 'conditional';

  return (
    <Card as="article" className="flex h-full flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to={`/university/${university?.slug ?? course.universityId}`}
            className="text-xs font-medium text-navy-700 hover:underline"
          >
            {university?.name ?? 'Unknown university'}
          </Link>
          <h3 className="mt-0.5 text-[15px] font-semibold leading-snug text-navy-950">
            <Link to={`/course/${course.id}`} className="hover:underline">
              {course.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-ink-muted">
            {awardLabel(course)} · {durationLabel(course.durationYears, course.durationYearsMax)}
            {university ? ` · ${university.city}` : ''}
            {course.courseCode ? ` · ${course.courseCode}` : ''}
          </p>
          {matchedRoutes.length ? (
            <p className="mt-1 text-xs text-navy-700">
              {matchedRoutes.length === 1 ? 'Route within this application: ' : 'Routes within this application: '}
              <span className="font-medium">{matchedRoutes.join(' · ')}</span>
            </p>
          ) : null}
        </div>
        {eligibility ? <EligibilityBadge verdict={eligibility.verdict} short /> : null}
      </div>

      {/*
        One line on the card, the full reasoning on the course page. A result
        list is for scanning; turning every card into an eligibility report
        would defeat the point of the list.
      */}
      {eligibility ? (
        <details className="mt-2 rounded border border-slate-200 bg-slate-50/50 px-2.5 py-1.5">
          <summary className="cursor-pointer list-none text-xs font-medium text-navy-700 marker:hidden">
            Why?
          </summary>
          <EligibilityReasons report={eligibility} course={course} limit={3} className="mt-2" />
        </details>
      ) : null}

      <div className="mt-3 space-y-2.5">
        <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50/60 px-3 py-2">
          <div className="min-w-0">
            <div className="label flex items-center gap-1">
              Typical A-Level offer
              <InfoTooltip term="typical-offer" />
            </div>
            {course.offers.length > 1 ? (
              <div className="mt-0.5 text-[11px] text-ink-faint">
                {course.offers.length} published offer pathways
              </div>
            ) : null}
          </div>
          <div
            className={cx(
              'shrink-0 text-right font-semibold tabular-nums text-navy-950',
              notPublished || awaiting || !offer
                ? 'text-[12px] font-medium text-amber-700'
                : 'text-xl',
            )}
          >
            {typicalOfferLabel(course)}
          </div>
        </div>

        <div>
          <div className="label mb-1.5">Required subjects</div>
          <div className="space-y-1">
            {offer && offer.subjectRequirements.filter((r) => r.required).length > 0 ? (
              offer.subjectRequirements
                .filter((r) => r.required)
                .map((r) => (
                  <SubjectRequirementRow
                    key={r.subject}
                    requirement={r}
                    entries={entries.length ? entries : null}
                    compact
                  />
                ))
            ) : (
              <span className="text-xs italic text-slate-400">
                {notPublished
                  ? 'Not yet published'
                  : awaiting
                    ? 'Awaiting verified data'
                    : 'None published'}
              </span>
            )}
            {offer?.constraints.map((c, i) => (
              <div
                key={i}
                className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-[13px] text-ink-muted"
              >
                {c.description}
              </div>
            ))}
          </div>
        </div>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="label flex items-center gap-1">
            Further Maths
            <InfoTooltip term="further-maths" />
          </dt>
          <dd className="mt-0.5 text-ink">{FURTHER_MATHS_LABEL[course.furtherMathematics]}</dd>
        </div>
        <div>
          <dt className="label flex items-center gap-1">
            Admissions test
            <InfoTooltip term="admissions-test" />
          </dt>
          <dd className="mt-0.5 text-ink">
            {course.admissionsTest.code === 'unknown' ? (
              <span className="italic text-slate-400">Not recorded</span>
            ) : course.admissionsTest.code === 'not-announced' ? (
              <span className="italic text-amber-700">Not yet announced</span>
            ) : (
              admissionsTestFullLabel(course.admissionsTest)
            )}
          </dd>
        </div>
        <div>
          <dt className="label">Entry year</dt>
          <dd className="mt-0.5 text-ink">{course.applicationYear}</dd>
        </div>
      </dl>

      {fmAdvisory || fmConditional ? (
        <p className="mt-3 flex items-start gap-1.5 rounded border border-amber-200 bg-amber-50/70 px-2.5 py-1.5 text-xs leading-relaxed text-amber-900">
          <IconWarning width={13} height={13} className="mt-0.5 shrink-0" />
          {fmConditional
            ? (course.furtherMathematicsNote ??
              'Further Mathematics is required only in certain circumstances — see the course page.')
            : `Further Mathematics is ${FURTHER_MATHS_LABEL[course.furtherMathematics].toLowerCase()} by this university. It is not required.`}
        </p>
      ) : null}

      {eligibility && eligibility.verdict !== 'insufficient-information' ? (
        <p className="mt-3 text-xs leading-relaxed text-ink-muted">{eligibility.summary}</p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <Link to={`/course/${course.id}`} className="btn-primary h-8 px-3 text-xs">
          View course
        </Link>
        <button
          type="button"
          onClick={() => toggleCompare(course.id)}
          disabled={compareFull}
          title={compareFull ? `You can compare up to ${MAX_COMPARE} courses` : undefined}
          className={cx('btn-secondary h-8 px-3 text-xs', comparing && 'border-navy-400 bg-navy-50')}
        >
          <IconCompare width={13} height={13} />
          {comparing ? 'In comparison' : 'Compare'}
        </button>
        <button
          type="button"
          onClick={() => toggleSavedCourse(course.id)}
          className={cx('btn-secondary h-8 px-3 text-xs', saved && 'border-rose-200 text-rose-700')}
          aria-pressed={saved}
        >
          <IconHeart width={13} height={13} filled={saved} />
          {saved ? 'Saved' : 'Save'}
        </button>
        <span className="ml-auto flex items-center gap-2">
          {course.interview === 'yes' ? <Badge tone="navy">Interview</Badge> : null}
          <VerificationBadge status={course.provenance.verificationStatus} provenance={course.provenance} />
        </span>
      </div>
    </Card>
  );
}
