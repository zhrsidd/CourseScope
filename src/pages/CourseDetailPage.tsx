import { Link, useParams } from 'react-router-dom';
import { usePageTitle } from '@/lib/page-title';
import { ADVISORY_FURTHER_MATHS } from '@/types';
import { EligibilityBadge, EligibilityBreakdown } from '@/components/EligibilityBadge';
import { EligibilityReasons } from '@/components/EligibilityReasons';
import { InfoTooltip } from '@/components/InfoTooltip';
import { SourceBadge, VerificationBadge } from '@/components/SourceBadge';
import { ReportIssue } from '@/components/ReportIssue';
import { SubjectGuidance } from '@/components/SubjectGuidance';
import { subjectGuidanceFor } from '@/data';
import { SubjectRequirementRow } from '@/components/SubjectRequirement';
import { StudentProfilePanel } from '@/components/StudentProfilePanel';
import { IconCompare, IconExternal, IconHeart, IconWarning } from '@/components/ui/icons';
import {
  Badge,
  Card,
  CardSkeleton,
  DataRow,
  EmptyState,
  NoData,
  PageHeader,
  SectionTitle,
  cx,
} from '@/components/ui/primitives';
import {
  ADMISSIONS_TEST_BY_CODE,
  DEGREE_TYPE_BY_ID,
  TEST_REQUIREMENT_LABEL,
  subcategoryLabel,
} from '@/data/taxonomy';
import {
  FURTHER_MATHS_LABEL,
  INTERVIEW_LABEL,
  admissionsTestLabel,
  awardLabel,
  contextualLabel,
  deadlineDateLabel,
  deadlineScopeLabel,
  deadlinesForCourse,
  durationLabel,
} from '@/lib/format';
import { filledGrades } from '@/lib/grades';
import { MAX_COMPARE, useApp } from '@/state/AppContext';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    courseById,
    courses,
    universityById,
    eligibility,
    profile,
    savedCourseIds,
    toggleSavedCourse,
    compareIds,
    toggleCompare,
  } = useApp();

  if (loading) {
    return (
      <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
        <CardSkeleton />
      </div>
    );
  }

  const course = id ? courseById[id] : undefined;
  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="Course not found"
          description="This course record is not in the catalogue."
          action={
            <Link to="/" className="btn-secondary">
              Back to search
            </Link>
          }
        />
      </div>
    );
  }

  const university = universityById[course.universityId];
  const report = eligibility[course.id];
  const entries = filledGrades(profile);
  const saved = savedCourseIds.includes(course.id);
  const comparing = compareIds.includes(course.id);
  const notPublished = course.requirementsPublicationStatus === 'not-yet-published';
  const awaiting = course.provenance.verificationStatus === 'awaiting-data';
  const fallback = notPublished
    ? courses.find((c) => c.slug === course.slug && c.applicationYear === course.latestPublishedYear)
    : undefined;
  const degreeMeta = DEGREE_TYPE_BY_ID[course.degreeType];
  const testMeta = ADMISSIONS_TEST_BY_CODE[course.admissionsTest.code];
  const fmAdvisory = (ADVISORY_FURTHER_MATHS as readonly string[]).includes(course.furtherMathematics);
  const officialLink = course.provenance.sourceUrl ?? course.provenance.officialUrl;
  const deadlines = deadlinesForCourse(university, course);
  const subjectGuidance = course ? subjectGuidanceFor(course.universityId) : null;
  usePageTitle(
    course ? `${course.name} (${course.awardLabel ?? course.degreeType}), ${university?.name ?? ''} ${course.applicationYear}` : 'Course',
  );

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow={
          university ? (
            <Link to={`/university/${university.slug}`} className="hover:underline">
              {university.name} · {university.city}
            </Link>
          ) : (
            'Unknown university'
          )
        }
        title={course.name}
        description={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span title={degreeMeta?.description}>{awardLabel(course)}</span>
            <span>·</span>
            <span>{durationLabel(course.durationYears, course.durationYearsMax)}</span>
            <span>·</span>
            <span>{subcategoryLabel(course.subjectSubcategory)}</span>
            <span>·</span>
            <span>{course.applicationYear} entry</span>
            {course.courseCode ? (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  UCAS {course.courseCode}
                  <InfoTooltip term="ucas-code" />
                </span>
              </>
            ) : null}
            {degreeMeta?.integratedMasters ? (
              <Badge tone="navy">
                Integrated Master’s
                <InfoTooltip term="integrated-masters" />
              </Badge>
            ) : null}
            <VerificationBadge status={course.provenance.verificationStatus} provenance={course.provenance} />
          </span>
        }
        actions={
          <>
            <button
              type="button"
              onClick={() => toggleCompare(course.id)}
              disabled={compareIds.length >= MAX_COMPARE && !comparing}
              className={cx('btn-secondary h-9 text-sm', comparing && 'border-navy-400 bg-navy-50')}
            >
              <IconCompare width={14} height={14} />
              {comparing ? 'In comparison' : 'Add to comparison'}
            </button>
            <button
              type="button"
              onClick={() => toggleSavedCourse(course.id)}
              className={cx('btn-secondary h-9 text-sm', saved && 'border-rose-200 text-rose-700')}
            >
              <IconHeart width={14} height={14} filled={saved} />
              {saved ? 'Saved' : 'Save course'}
            </button>
            {officialLink ? (
              <a href={officialLink} target="_blank" rel="noreferrer" className="btn-primary h-9 text-sm">
                View official requirements <IconExternal width={13} height={13} />
              </a>
            ) : null}
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          {course.cycleNote ? (
            <Card className="border-navy-200 bg-navy-50/50 p-3">
              <div className="label mb-1 text-navy-800">Which cycle this record covers</div>
              <p className="text-sm leading-relaxed text-navy-900">{course.cycleNote}</p>
            </Card>
          ) : null}

          {notPublished ? (
            <Card className="border-amber-300 bg-amber-50/70 p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-900">
                <IconWarning width={15} height={15} />
                {course.applicationYear} entry requirements not yet published
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-amber-900/90">
                This university has not published entry requirements for {course.applicationYear} entry.
                Requirements from an earlier cycle are deliberately not shown here as if they were
                current — they change between years.
              </p>
              {fallback ? (
                <div className="mt-3 rounded-md border border-dashed border-amber-400 bg-white/70 p-3">
                  <div className="label mb-1 text-amber-800">
                    Latest available requirements: {fallback.applicationYear} entry
                  </div>
                  <p className="text-sm text-ink-muted">
                    Kept as a separate record. Treat it as historical context, not as this cycle’s
                    requirements.
                  </p>
                  <Link to={`/course/${fallback.id}`} className="btn-secondary mt-2 h-8 text-xs">
                    Open the {fallback.applicationYear} entry record
                  </Link>
                </div>
              ) : (
                <p className="mt-3 text-sm italic text-amber-900/80">
                  No earlier published cycle is recorded for this course.
                </p>
              )}
            </Card>
          ) : null}

          {course.provenance.verificationStatus === 'partially-verified' ? (
            <Card className="border-navy-200 bg-navy-50/50 p-4">
              <h2 className="text-sm font-semibold text-navy-950">Partially verified</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Some of this course’s admissions information is supported by the university’s own
                page, but at least one relevant field could not be confirmed. This is about how
                complete our evidence is — it says nothing about the course or the university.
              </p>
              {/*
                What could not be confirmed is read from the record's own stored
                notes, written at the time the page was checked. Nothing is
                generated here: if the record does not say what is missing, this
                block says only that something is.
              */}
              {course.notes ? (
                <p className="mt-2 rounded border border-navy-200 bg-white px-2.5 py-2 text-xs leading-relaxed text-ink-muted">
                  {course.notes}
                </p>
              ) : null}
            </Card>
          ) : null}

          {awaiting ? (
            <Card className="border-slate-300 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-navy-950">Awaiting verified data</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                This course is in the catalogue, but its admissions requirements have not been collected
                from the university’s official pages yet. Nothing is shown rather than something
                plausible.
              </p>
            </Card>
          ) : null}

          <Card className="p-4">
            <SectionTitle right={report ? <EligibilityBadge verdict={report.verdict} /> : undefined}>
              Academic match against your A-Levels
            </SectionTitle>
            {report ? (
              <>
                <p className="mb-3 text-sm text-ink-muted">{report.summary}</p>
                <div className="mb-3 rounded-md border border-slate-200 bg-slate-50/60 p-3">
                  <div className="label mb-1.5">Why this result</div>
                  <EligibilityReasons report={report} course={course} />
                </div>
                <EligibilityBreakdown report={report} />
                {report.pathways.length > 1 ? (
                  <p className="mt-3 text-xs text-ink-muted">
                    Checked against {report.pathways.length} published offer pathways; the breakdown shows
                    the best-matching one.
                  </p>
                ) : null}
              </>
            ) : null}
            <p className="mt-4 rounded border border-slate-200 bg-slate-50 p-2.5 text-xs leading-relaxed text-ink-muted">
              This check covers published academic requirements only. Universities also weigh personal
              statements, references, admissions tests, interviews and the strength of the applicant pool.
              Meeting the requirements is not a guarantee of an offer, and this tool does not estimate the
              chance of one.
            </p>
          </Card>

          {course.rawRequirementText ? (
            <Card className="p-4">
              <SectionTitle>
                <span className="flex items-center gap-1">
                  The university’s own wording
                  <InfoTooltip term="raw-requirement-text" />
                </span>
              </SectionTitle>
              <blockquote className="border-l-2 border-navy-300 bg-slate-50/70 py-2 pl-3 text-sm italic leading-relaxed text-ink">
                {course.rawRequirementText}
              </blockquote>
              <p className="mt-2 text-xs text-ink-muted">
                Kept verbatim so you can check it against the structured version below. If the two ever
                disagree, the university’s wording is the one that counts.
              </p>
            </Card>
          ) : null}

          <Card className="p-4">
            <SectionTitle
              right={
                course.offers.length > 1 ? (
                  <Badge tone="navy">
                    {course.offers.length} pathways
                    <InfoTooltip term="offer-pathway" />
                  </Badge>
                ) : undefined
              }
            >
              Entry requirements (structured)
            </SectionTitle>
            {course.minimumEntryStandard ? (
              <p className="mb-3 rounded border border-slate-200 bg-slate-50 p-2.5 text-sm text-ink-muted">
                <strong className="text-ink">Minimum entry standard: {course.minimumEntryStandard}.</strong>{' '}
                Published separately from the offer below — it is a floor, not the offer you would
                receive.
              </p>
            ) : null}
            {course.studyOptions.length > 0 ? (
              <div className="mb-3 rounded border border-navy-200 bg-navy-50/50 p-2.5">
                <div className="label mb-1 text-navy-800">
                  Routes within this application
                </div>
                <p className="mb-2 text-xs leading-relaxed text-ink-muted">
                  These are named routes or specialisms offered through this
                  course. They are not separate UCAS applications and are not
                  checked against your grades separately.
                </p>
                <ul className="space-y-1.5">
                  {course.studyOptions.map((o) => (
                    <li key={o.name} className="text-sm">
                      <span className="font-medium text-ink">{o.name}</span>
                      {o.ucasCode ? (
                        <span className="ml-1.5 text-xs text-ink-muted">
                          (applies to UCAS {o.ucasCode})
                        </span>
                      ) : null}
                      {o.chosenWhen ? (
                        <span className="block text-xs text-ink-muted">{o.chosenWhen}</span>
                      ) : null}
                      {o.description ? (
                        <span className="block text-xs text-ink-muted">{o.description}</span>
                      ) : null}
                      {o.officialUrl ? (
                        <a
                          href={o.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-navy-700 underline underline-offset-2"
                        >
                          University page
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {course.typicalOffer ? (
              <p className="mb-3 rounded border border-amber-200 bg-amber-50 p-2.5 text-sm text-amber-900">
                <strong>Typical offer: {course.typicalOffer}.</strong> The university publishes this
                separately as a description of the offers it actually made. It can be higher than the
                minimum entry standard, and it is not checked against your grades below.
              </p>
            ) : null}
            {course.offers.length === 0 ? (
              <NoData>
                {notPublished
                  ? 'Not yet published for this entry year'
                  : awaiting
                    ? 'Awaiting verified entry requirements'
                    : 'No entry requirements recorded yet'}
              </NoData>
            ) : (
              <div className="space-y-4">
                {course.offers.map((offer) => (
                  <div key={offer.id} className="rounded-md border border-slate-200 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-ink">{offer.label}</span>
                        {offer.isContextual ? (
                          <Badge tone="amber">
                            Contextual
                            <InfoTooltip term="contextual-offer" />
                          </Badge>
                        ) : null}
                        {offer.appliesOnlyIfTaking.length ? (
                          <Badge tone="navy">
                            Only if taking {offer.appliesOnlyIfTaking.join(' and ')}
                          </Badge>
                        ) : null}
                        {offer.appliesOnlyIfTakingAtLeast ? (
                          <Badge tone="navy">
                            Only for {offer.appliesOnlyIfTakingAtLeast}+ A-Levels
                          </Badge>
                        ) : null}
                      </div>
                      <span className="text-xl font-semibold tabular-nums text-navy-950">
                        {offer.gradeProfile}
                      </span>
                    </div>

                    {offer.rawText ? (
                      <p className="mt-2 text-xs italic text-ink-muted">“{offer.rawText}”</p>
                    ) : null}

                    {offer.subjectRequirements.length > 0 ? (
                      <div className="mt-2.5 space-y-1.5">
                        {offer.subjectRequirements.map((r) => (
                          <SubjectRequirementRow
                            key={`${offer.id}-${r.subject}`}
                            requirement={r}
                            entries={entries.length ? entries : null}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-ink-faint">No subject requirements published.</p>
                    )}

                    {offer.constraints.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {offer.constraints.map((c, i) => (
                          <li
                            key={i}
                            className="rounded border border-navy-200 bg-navy-50/60 px-2.5 py-1.5 text-[13px] text-navy-900"
                          >
                            {c.description}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {offer.notes ? (
                      <p className="mt-2 text-xs leading-relaxed text-ink-muted">{offer.notes}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* University-wide subject policy, where the university publishes one.
              Its own card, after the course's requirements, so it can never be
              read as part of them. */}
          {subjectGuidance ? <SubjectGuidance guidance={subjectGuidance} /> : null}

          <Card className="p-4">
            <SectionTitle>Admissions test</SectionTitle>
            {course.admissionsTest.code === 'unknown' ? (
              <>
                <NoData>Test arrangements not recorded for this course yet</NoData>
                {/* Say WHY where the record knows: "nobody has checked" and "the
                    university publishes nothing" are different facts. */}
                {course.admissionsTest.notes ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {course.admissionsTest.notes}
                  </p>
                ) : null}
              </>
            ) : course.admissionsTest.code === 'not-announced' ? (
              <p className="rounded border border-amber-200 bg-amber-50/70 p-2.5 text-sm text-amber-900">
                Not yet announced for {course.applicationYear} entry. Arrangements from an earlier cycle
                are not carried across.
              </p>
            ) : (
              <dl className="divide-y divide-slate-100">
                <DataRow label="Test">
                  <span className="font-medium">{admissionsTestLabel(course.admissionsTest)}</span>
                  {testMeta && course.admissionsTest.code !== 'none' ? (
                    <span className="block text-xs text-ink-muted">{testMeta.fullName}</span>
                  ) : null}
                </DataRow>
                <DataRow label="Requirement">
                  {TEST_REQUIREMENT_LABEL[course.admissionsTest.requirement]}
                </DataRow>
                <DataRow label="Applies to">
                  {course.admissionsTest.applicationYear ? (
                    `${course.admissionsTest.applicationYear} entry`
                  ) : (
                    <NoData>No entry year recorded</NoData>
                  )}
                </DataRow>
                <DataRow label="Modules sat">
                  {course.admissionsTest.modules.length > 0 ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {course.admissionsTest.modules.map((m) => (
                        <li key={m}>
                          <Badge tone="navy">{m}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : course.admissionsTest.moduleChoice ? null : (
                    <NoData>Not recorded — module combinations differ by course</NoData>
                  )}
                  {course.admissionsTest.moduleChoice ? (
                    <div className="mt-1.5">
                      <span className="text-xs font-medium text-ink-muted">
                        {course.admissionsTest.modules.length > 0 ? 'plus ' : ''}
                        choose {course.admissionsTest.moduleChoice.chooseCount} of:
                      </span>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {course.admissionsTest.moduleChoice.options.map((m) => (
                          <li key={m}>
                            <Badge tone="slate">{m}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {course.admissionsTest.moduleNote ? (
                    <span className="mt-1 block text-xs text-ink-muted">
                      {course.admissionsTest.moduleNote}
                    </span>
                  ) : null}
                </DataRow>
                <DataRow label="Details">
                  {course.admissionsTest.details ?? <NoData>None recorded</NoData>}
                </DataRow>
                <DataRow label="Official test page">
                  {course.admissionsTest.officialUrl ? (
                    <a
                      href={course.admissionsTest.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1"
                    >
                      Test information <IconExternal width={12} height={12} />
                    </a>
                  ) : (
                    <NoData>No link recorded</NoData>
                  )}
                </DataRow>
                {course.admissionsTest.notes ? (
                  <DataRow label="Notes">{course.admissionsTest.notes}</DataRow>
                ) : null}
              </dl>
            )}
          </Card>

          <Card className="p-4">
            <SectionTitle>Course-specific admissions details</SectionTitle>
            <dl className="divide-y divide-slate-100">
              <DataRow
                label={
                  <span className="flex items-center gap-1">
                    Further Mathematics
                    <InfoTooltip term="further-maths" />
                  </span>
                }
              >
                <span className={cx(fmAdvisory && 'text-amber-800')}>
                  {FURTHER_MATHS_LABEL[course.furtherMathematics]}
                </span>
                {fmAdvisory ? (
                  <span className="mt-1 block rounded border border-amber-200 bg-amber-50/70 px-2 py-1 text-xs text-amber-900">
                    Further Mathematics is {FURTHER_MATHS_LABEL[course.furtherMathematics].toLowerCase()} by
                    this university. It is advisory, not a requirement, and not taking it does not rule you
                    out.
                  </span>
                ) : null}
                {course.furtherMathematicsNote ? (
                  <span className="block text-xs text-ink-muted">{course.furtherMathematicsNote}</span>
                ) : null}
              </DataRow>
              <DataRow label="Interview">
                {INTERVIEW_LABEL[course.interview]}
                {course.interviewNote ? (
                  <span className="block text-xs text-ink-muted">{course.interviewNote}</span>
                ) : null}
              </DataRow>
              <DataRow
                label={
                  <span className="flex items-center gap-1">
                    Contextual offer
                    <InfoTooltip term="contextual-offer" />
                  </span>
                }
              >
                {contextualLabel(course.contextualOffer)}
                {course.contextualOffer.availability === 'yes' ? (
                  <span className="mt-1 block text-xs text-ink-muted">
                    Contextual offers have their own eligibility criteria, set by the university.
                    This tool checks your grades against the standard offer only — it never matches
                    you to a contextual offer.
                  </span>
                ) : null}
              </DataRow>
              <DataRow label="GCSE requirements">
                {course.gcseRequirements ?? <NoData>None specifically published</NoData>}
              </DataRow>
              <DataRow label="English language">
                {course.englishLanguageRequirements ?? <NoData>Not recorded</NoData>}
              </DataRow>
              <DataRow label="International applicants">
                {course.internationalNotes ?? <NoData>Not recorded</NoData>}
              </DataRow>
              <DataRow label="Placement / study abroad">
                {course.placementOrStudyAbroad ?? <NoData>Not recorded</NoData>}
              </DataRow>
              <DataRow label="Application deadlines">
                {deadlines.length > 0 ? (
                  <ul className="space-y-2">
                    {deadlines.map((d) => (
                      <li key={d.id} className="rounded border border-slate-200 bg-slate-50/60 p-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-medium text-ink">{d.label}</span>
                          <span className="text-sm tabular-nums text-navy-900">{deadlineDateLabel(d)}</span>
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink-faint">
                          <span>{d.applicationYear} entry</span>
                          <span>·</span>
                          <span>Applies to: {deadlineScopeLabel(d.appliesTo)}</span>
                          <VerificationBadge status={d.verificationStatus} />
                          {d.sourceUrl ? (
                            <a href={d.sourceUrl} target="_blank" rel="noreferrer" className="link">
                              {d.sourceTitle ?? 'Source'}
                            </a>
                          ) : null}
                        </div>
                        {d.notes ? <p className="mt-1 text-xs text-ink-muted">{d.notes}</p> : null}
                      </li>
                    ))}
                  </ul>
                ) : university?.admissionsOverview.applicationDeadline ? (
                  <span>{university.admissionsOverview.applicationDeadline}</span>
                ) : (
                  <NoData>No checked deadline recorded — see the official page</NoData>
                )}
              </DataRow>
              <DataRow label="Other UCAS codes">
                {course.alternativeCourseCodes.length > 0 ? (
                  <>
                    <ul className="space-y-0.5">
                      {course.alternativeCourseCodes.map((a) => (
                        <li key={a.code}>
                          <span className="font-medium tabular-nums">{a.code}</span> — {a.label}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-1 block text-xs text-ink-muted">
                      Options within this one programme, sharing its admissions process and
                      requirements. They are not separate courses.
                    </span>
                  </>
                ) : (
                  <NoData>None</NoData>
                )}
              </DataRow>
              <DataRow label="Notes">{course.notes ?? <NoData>None</NoData>}</DataRow>
            </dl>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-4">
            <SectionTitle>
              <span className="flex items-center gap-1">
                Source and verification
                <InfoTooltip term="verification-status" />
              </span>
            </SectionTitle>
            {/*
              One provenance area: what the record says about itself (status,
              date checked, the page it was read from), how we know the course
              exists, and — last — the way to tell us it is wrong. Reporting is a
              trust action, so it lives with the evidence rather than on its own.
            */}
            <SourceBadge provenance={course.provenance} applicationYear={course.applicationYear} />
            {course.provenance.identityNote ? (
              <details className="mt-3 rounded border border-slate-200 bg-slate-50/60 px-2.5 py-1.5">
                <summary className="cursor-pointer text-xs font-medium text-navy-700">
                  How we know this course exists
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  {course.provenance.identityNote}
                </p>
              </details>
            ) : null}
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Requirements are recorded per application cycle. Records from other years are stored
              separately and are never presented as confirmed requirements for this one.
            </p>
            <div className="mt-3 border-t border-slate-200 pt-3" data-testid="course-report-issue">
              {/* Keyed so the panel resets when moving to another course. */}
              <ReportIssue key={course.id} course={course} university={university} />
            </div>
          </Card>
          <StudentProfilePanel />
        </aside>
      </div>
    </div>
  );
}
