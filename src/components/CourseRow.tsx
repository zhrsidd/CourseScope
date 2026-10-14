import { useId, useState } from 'react';
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
import { announce } from './Announcer';
import { EligibilityBadge } from './EligibilityBadge';
import { EligibilityReasons } from './EligibilityReasons';
import { InfoTooltip } from './InfoTooltip';
import { SubjectRequirementRow } from './SubjectRequirement';
import { VerificationBadge } from './SourceBadge';
import { Collapse } from './ui/Collapse';
import { IconChevron, IconCompare, IconHeart, IconWarning } from './ui/icons';
import { Badge, cx } from './ui/primitives';

/** "A*AA" and "AAB" read as grades. Anything longer is a sentence and is set as text. */
const isGradeOffer = (s: string) => /^(A\*|[A-E]){3,5}$/.test(s);

/**
 * One course in a result list.
 *
 * DENSITY IS A PROMISE, NOT AN ACCIDENT. A row has the same three lines whether
 * or not the student has entered grades:
 *
 *   1. university · city
 *   2. course name, award, duration, UCAS code
 *   3. required subjects · Further Maths · admissions test
 *   4. verification status (and interview, if any)
 *
 * With grades entered, one extra element appears in the offer column: the
 * concise verdict. That column is shorter than the content column, so the row
 * does not grow. Everything that explains the verdict (the reasons, every
 * condition, the source) lives behind "Details", which is an ordinary labelled
 * button. No height is fixed anywhere, so a long course name or a long
 * requirement wraps instead of being clipped.
 */
export function CourseRow({
  course,
  university,
  eligibility,
  matchedRoutes = [],
  hideUniversity = false,
}: {
  course: Course;
  university: University | undefined;
  eligibility: EligibilityReport | undefined;
  /** Routes within this application that explain why a search returned this course. */
  matchedRoutes?: string[];
  hideUniversity?: boolean;
}) {
  const { profile, savedCourseIds, toggleSavedCourse, compareIds, toggleCompare } = useApp();
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  const entries = filledGrades(profile);
  const hasGrades = entries.length > 0;
  const saved = savedCourseIds.includes(course.id);
  const comparing = compareIds.includes(course.id);
  const compareFull = compareIds.length >= MAX_COMPARE && !comparing;

  const offer = primaryOffer(course);
  const notPublished = course.requirementsPublicationStatus === 'not-yet-published';
  const awaiting = course.provenance.verificationStatus === 'awaiting-data';
  const hasRequirements = !notPublished && !awaiting && Boolean(offer);
  const offerLabel = typicalOfferLabel(course);
  const gradeStyle = hasRequirements && isGradeOffer(offerLabel);

  const required = offer ? offer.subjectRequirements.filter((r) => r.required) : [];
  const conditions = offer?.constraints ?? [];
  const requiredText = required.length
    ? required.map((r) => (r.minimumGrade ? `${r.subject} ${r.minimumGrade}` : r.subject)).join(', ')
    : notPublished
      ? 'Not yet published'
      : awaiting
        ? 'Awaiting verified data'
        : 'None published';

  const fmAdvisory = (ADVISORY_FURTHER_MATHS as readonly string[]).includes(course.furtherMathematics);
  const fmConditional = course.furtherMathematics === 'conditional';
  const test = course.admissionsTest;
  const testText =
    test.code === 'unknown'
      ? 'Not recorded'
      : test.code === 'not-announced'
        ? 'Not yet announced'
        : admissionsTestFullLabel(test);

  const uniName = university?.name ?? 'Unknown university';
  const uniSlug = university?.slug ?? course.universityId;
  const showVerdict = Boolean(eligibility) && hasGrades && hasRequirements;

  return (
    <article className="row" aria-label={`${uniName}, ${course.name}`}>
      <div className="r-main">
        {hideUniversity ? null : (
          <div className="r-uni">
            <Link to={`/university/${uniSlug}`}>{uniName}</Link>
            {university?.city ? <span aria-hidden="true">·</span> : null}
            {university?.city ? <span>{university.city}</span> : null}
          </div>
        )}
        <div className="r-title-line">
          <h3 className="r-title">
            <Link to={`/course/${course.id}`}>{course.name}</Link>
          </h3>
          <span className="r-award">{awardLabel(course)}</span>
          <span className="r-meta">
            <span>{durationLabel(course.durationYears, course.durationYearsMax)}</span>
            <span>{course.applicationYear} entry</span>
            {course.courseCode ? (
              <span>
                UCAS <span className="t-code">{course.courseCode}</span>
              </span>
            ) : null}
          </span>
        </div>

        <dl className="r-facts">
          <div className="fact fact-wide">
            <dt>Required subjects</dt>
            <dd className={required.length ? undefined : 'muted'}>
              {requiredText}
              {conditions.length > 0 ? (
                <span className="fact-note">
                  {' '}
                  + {conditions.length} {conditions.length === 1 ? 'condition' : 'conditions'}
                </span>
              ) : null}
            </dd>
          </div>
          <div className="fact">
            <dt>
              Further Maths
              <InfoTooltip term="further-maths" />
            </dt>
            <dd className={course.furtherMathematics === 'no-stated-preference' || course.furtherMathematics === 'unknown' ? 'muted' : undefined}>
              {FURTHER_MATHS_LABEL[course.furtherMathematics]}
            </dd>
          </div>
          <div className="fact">
            <dt>
              Admissions test
              <InfoTooltip term="admissions-test" />
            </dt>
            <dd className={test.code === 'unknown' || test.code === 'not-announced' ? 'muted' : undefined}>
              {testText}
            </dd>
          </div>
        </dl>

        <div className="r-foot">
          <VerificationBadge status={course.provenance.verificationStatus} provenance={course.provenance} />
          {course.interview === 'yes' ? <Badge tone="navy">Interview</Badge> : null}
          {matchedRoutes.length ? (
            <span className="r-route">
              {matchedRoutes.length === 1 ? 'Route: ' : 'Routes: '}
              <strong>{matchedRoutes.join(' · ')}</strong>
            </span>
          ) : null}
        </div>
      </div>

      <div className="r-offer">
        <span className="caption">
          Typical offer
          <InfoTooltip term="typical-offer" />
        </span>
        <span className={cx('r-grade', gradeStyle ? 't-grade' : 'r-grade-text', !hasRequirements && 'r-grade-status')}>
          {offerLabel}
        </span>
        {course.offers.length > 1 ? <span className="caption">{course.offers.length} published offers</span> : null}
        {showVerdict && eligibility ? <EligibilityBadge verdict={eligibility.verdict} short /> : null}
      </div>

      <div className="r-actions">
        <button
          type="button"
          className="btn-secondary btn-sm r-btn"
          aria-pressed={saved}
          onClick={() => {
            toggleSavedCourse(course.id);
            announce(saved ? `Removed ${course.name} from your shortlist` : `Saved ${course.name} to your shortlist`);
          }}
        >
          <IconHeart width={16} height={16} filled={saved} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
        <button
          type="button"
          className="btn-secondary btn-sm r-btn"
          aria-pressed={comparing}
          disabled={compareFull}
          title={compareFull ? `You can compare up to ${MAX_COMPARE} courses` : undefined}
          onClick={() => {
            toggleCompare(course.id);
            announce(
              comparing
                ? `Removed ${course.name} from comparison`
                : `Added ${course.name} to comparison, ${compareIds.length + 1} of ${MAX_COMPARE}`,
            );
          }}
        >
          <IconCompare width={16} height={16} />
          <span>{comparing ? 'Comparing' : 'Compare'}</span>
        </button>
        <button
          type="button"
          className="disclose"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((o) => !o)}
        >
          <IconChevron width={14} height={14} />
          Details
        </button>
      </div>

      <Collapse open={open} id={detailsId} className="r-more">
        <div className="r-more-inner">
          {eligibility && hasGrades ? (
            <section>
              <h4 className="label">Why this result</h4>
              <EligibilityReasons report={eligibility} course={course} limit={4} className="mt-1.5" />
              {eligibility.verdict !== 'insufficient-information' ? (
                <p className="mt-2 text-sm text-ink-muted">{eligibility.summary}</p>
              ) : null}
            </section>
          ) : null}

          {offer && required.length > 0 ? (
            <section>
              <h4 className="label">Required subjects</h4>
              <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
                {required.map((r) => (
                  <SubjectRequirementRow
                    key={r.subject}
                    requirement={r}
                    entries={entries.length ? entries : null}
                    compact
                  />
                ))}
              </div>
            </section>
          ) : null}

          {conditions.length > 0 ? (
            <section>
              <h4 className="label">{conditions.length === 1 ? 'Condition' : 'Conditions'}</h4>
              <ul className="mt-1.5 grid gap-1.5">
                {conditions.map((c, i) => (
                  <li key={i} className="r-condition">
                    {c.description}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* With grades entered the reasons above already cover Further Maths. */}
          {(fmAdvisory || fmConditional) && !(eligibility && hasGrades) ? (
            <p className="r-note">
              <IconWarning width={14} height={14} className="mt-0.5 shrink-0" />
              {fmConditional
                ? (course.furtherMathematicsNote ??
                  'Further Mathematics is required only in certain circumstances. See the course page.')
                : `Further Mathematics is ${FURTHER_MATHS_LABEL[course.furtherMathematics].toLowerCase()} by this university. It is not required.`}
            </p>
          ) : null}

          <p className="text-sm">
            <Link to={`/course/${course.id}`} className="link">
              Open the full course page
            </Link>
          </p>
        </div>
      </Collapse>
    </article>
  );
}
