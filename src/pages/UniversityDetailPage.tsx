import { Link, useParams } from 'react-router-dom';
import { usePageTitle } from '@/lib/page-title';
import { CourseCard } from '@/components/CourseCard';
import { InfoTooltip } from '@/components/InfoTooltip';
import { RankingRow } from '@/components/RankingBadge';
import { VerificationBadge } from '@/components/SourceBadge';
import { IconExternal, IconHeart, IconPin } from '@/components/ui/icons';
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
  FURTHER_MATHS_LABEL,
  INTERVIEW_LABEL,
  contextualLabel,
  deadlineDateLabel,
  deadlineScopeLabel,
  deadlinesForYear,
  formatDate,
} from '@/lib/format';
import { useApp } from '@/state/AppContext';

export function UniversityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const {
    loading,
    universities,
    coursesByUniversity,
    eligibility,
    universityById,
    profile,
    savedUniversityIds,
    toggleSavedUniversity,
  } = useApp();

  if (loading) {
    return (
      <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
        <CardSkeleton />
      </div>
    );
  }

  const university = universities.find((u) => u.slug === slug);
  usePageTitle(university?.name);
  if (!university) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          title="University not found"
          description="This university is not in the catalogue."
          action={
            <Link to="/universities" className="btn-secondary">
              Back to universities
            </Link>
          }
        />
      </div>
    );
  }

  const all = coursesByUniversity[university.id] ?? [];
  const courses = all.filter((c) => c.applicationYear === profile.applicationYear);
  const physics = courses.filter((c) => c.subjectCategory === 'physics');
  const engineering = courses.filter((c) => c.subjectCategory === 'engineering');
  const saved = savedUniversityIds.includes(university.id);
  const overview = university.admissionsOverview;
  const deadlines = deadlinesForYear(university, profile.applicationYear);

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-1">
            <IconPin width={12} height={12} />
            {university.city}, {university.country} · {university.region}
          </span>
        }
        title={university.name}
        description={`${courses.length} Physics and Engineering course${courses.length === 1 ? '' : 's'} recorded for ${profile.applicationYear} entry.`}
        actions={
          <>
            <a
              href={university.website}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary h-9 text-sm"
            >
              Official website <IconExternal width={13} height={13} />
            </a>
            <button
              type="button"
              onClick={() => toggleSavedUniversity(university.id)}
              className={cx('btn-secondary h-9 text-sm', saved && 'border-rose-200 text-rose-700')}
            >
              <IconHeart width={14} height={14} filled={saved} />
              {saved ? 'Saved' : 'Save university'}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <section>
            <SectionTitle right={<Badge tone="navy">{courses.length} in catalogue</Badge>}>
              Courses
            </SectionTitle>
            {courses.length === 0 ? (
              <EmptyState
                title={`No courses recorded for ${profile.applicationYear} entry`}
                description="Either this university's records have not been added yet, or requirements for this cycle are not published. Try switching the entry year in your profile."
              />
            ) : (
              <div className="space-y-6">
                {physics.length > 0 ? (
                  <div>
                    <h3 className="label mb-2">Physics ({physics.length})</h3>
                    <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
                      {physics.map((c) => (
                        <CourseCard
                          key={c.id}
                          course={c}
                          university={universityById[c.universityId]}
                          eligibility={eligibility[c.id]}
                          hideUniversity
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
                {engineering.length > 0 ? (
                  <div>
                    <h3 className="label mb-2">Engineering ({engineering.length})</h3>
                    <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
                      {engineering.map((c) => (
                        <CourseCard
                          key={c.id}
                          course={c}
                          university={universityById[c.universityId]}
                          eligibility={eligibility[c.id]}
                          hideUniversity
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <Card className="p-4">
            <SectionTitle>Relevant departments</SectionTitle>
            <ul className="space-y-1 text-sm text-ink">
              {university.departments.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-400" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>

          {/* Only verified rankings are served (src/data/universities.ts); with
              none, the card is omitted rather than shown empty. */}
          {university.rankings.length === 0 ? null : (
            <Card className="p-4">
              <SectionTitle>Rankings</SectionTitle>
              <div>
                {university.rankings.map((r) => (
                  <RankingRow key={r.id} ranking={r} />
                ))}
                <p className="mt-2 text-xs text-ink-muted">
                  Positions are listed per provider, edition and category, each with its own source and
                  verification status. They are never averaged or combined.
                </p>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <SectionTitle>Application deadlines</SectionTitle>
            {deadlines.length === 0 ? (
              <p className="text-sm text-ink-muted">
                No checked deadline is recorded for {profile.applicationYear} entry. Check the{' '}
                <a
                  href={university.admissionsUrl ?? university.website}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  university’s admissions pages
                </a>{' '}
                or UCAS.
              </p>
            ) : (
              <ul className="space-y-2">
                {deadlines.map((d) => (
                  <li key={d.id} className="rounded border border-slate-200 bg-slate-50/60 p-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-ink">{d.label}</span>
                      <span className="text-sm tabular-nums text-navy-900">{deadlineDateLabel(d)}</span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink-faint">
                      <span>{d.applicationYear} entry</span>
                      <span>·</span>
                      <span>{deadlineScopeLabel(d.appliesTo)}</span>
                      <VerificationBadge status={d.verificationStatus} />
                    </div>
                    {d.notes ? <p className="mt-1 text-xs text-ink-muted">{d.notes}</p> : null}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-xs text-ink-muted">
              Deadlines are recorded per entry year and per scope, so a course-specific or earlier
              deadline is never applied to the whole university.
            </p>
          </Card>

          {/* The university-wide overview is shown only once it has been checked.
              Until then each course's own record is the authority. */}
          {overview.provenance.verificationStatus !== 'verified' ? null : (
          <Card className="p-4">
            <SectionTitle>Admissions overview</SectionTitle>
            <p className="mb-3 rounded border border-navy-100 bg-navy-50/60 p-2 text-xs leading-relaxed text-navy-900">
              These are <strong>university-wide</strong> notes. Individual courses often publish
              different — usually stricter — requirements, so always check the course record too.
            </p>
            <dl className="divide-y divide-slate-100">
              <DataRow
                label={
                  <span className="flex items-center gap-1">
                    Typical A-Level offer
                    <InfoTooltip term="typical-offer" />
                  </span>
                }
              >
                {overview.typicalOffer ?? <NoData>Not published here</NoData>}
              </DataRow>
              <DataRow label="Required subjects">
                {overview.requiredSubjectsNote ?? <NoData>Set per course</NoData>}
              </DataRow>
              <DataRow
                label={
                  <span className="flex items-center gap-1">
                    Further Mathematics
                    <InfoTooltip term="further-maths" />
                  </span>
                }
              >
                {FURTHER_MATHS_LABEL[overview.furtherMathematics]}
                {overview.furtherMathematicsNote ? (
                  <span className="block text-xs text-ink-muted">{overview.furtherMathematicsNote}</span>
                ) : null}
              </DataRow>
              <DataRow label="GCSE requirements">
                {overview.gcseRequirements ?? <NoData>No specific requirements published</NoData>}
              </DataRow>
              <DataRow label="English language">
                {overview.englishLanguageRequirements ?? <NoData>Not recorded</NoData>}
              </DataRow>
              <DataRow
                label={
                  <span className="flex items-center gap-1">
                    Admissions tests
                    <InfoTooltip term="admissions-test" />
                  </span>
                }
              >
                {overview.admissionsTestsNote ?? <NoData>Set per course</NoData>}
              </DataRow>
              <DataRow label="Interviews">
                {INTERVIEW_LABEL[overview.interviews]}
                {overview.interviewsNote ? (
                  <span className="block text-xs text-ink-muted">{overview.interviewsNote}</span>
                ) : null}
              </DataRow>
              <DataRow label="International applicants">
                {overview.internationalNotes ?? <NoData>No information recorded</NoData>}
              </DataRow>
              <DataRow
                label={
                  <span className="flex items-center gap-1">
                    Contextual offers
                    <InfoTooltip term="contextual-offer" />
                  </span>
                }
              >
                {contextualLabel(overview.contextualOffer)}
              </DataRow>
              <DataRow label="Deadline (summary)">
                {overview.applicationDeadline ?? <NoData>Not recorded</NoData>}
              </DataRow>
            </dl>
            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3 text-xs text-ink-faint">
              <VerificationBadge status={overview.provenance.verificationStatus} />
              <span>Last verified: {formatDate(overview.provenance.lastVerified)}</span>
            </div>
          </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
