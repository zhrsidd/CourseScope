import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePageTitle } from '@/lib/page-title';
import { CourseRow } from '@/components/CourseRow';
import { InfoTooltip } from '@/components/InfoTooltip';
import { RankingRow } from '@/components/RankingBadge';
import { VerificationBadge } from '@/components/SourceBadge';
import { IconExternal, IconHeart, IconPin } from '@/components/ui/icons';
import { DataRow, EmptyState, NoData, cx } from '@/components/ui/primitives';
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
import { PageLoading } from '@/components/PageLoading';

type Focus = 'all' | 'physics' | 'engineering';

export function UniversityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, universities } = useApp();
  const university = universities.find((u) => u.slug === slug);
  usePageTitle(loading ? undefined : university?.name);

  if (loading) return <PageLoading rows={5} />;
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
  return <UniversityDetail universityId={university.id} />;
}

function UniversityDetail({ universityId }: { universityId: string }) {
  const {
    coursesByUniversity,
    eligibility,
    universityById,
    profile,
    savedUniversityIds,
    toggleSavedUniversity,
  } = useApp();
  const [focus, setFocus] = useState<Focus>('all');

  const university = universityById[universityId];
  const all = coursesByUniversity[university.id] ?? [];
  const courses = all.filter((c) => c.applicationYear === profile.applicationYear);
  const physics = courses.filter((c) => c.subjectCategory === 'physics');
  const engineering = courses.filter((c) => c.subjectCategory === 'engineering');
  const saved = savedUniversityIds.includes(university.id);
  const overview = university.admissionsOverview;
  const deadlines = deadlinesForYear(university, profile.applicationYear);
  const readCount = courses.filter((c) => c.provenance.verificationStatus === 'verified').length;
  const awaitingCount = courses.filter((c) => c.provenance.verificationStatus === 'awaiting-data').length;
  const unpublishedCount = courses.filter((c) => c.provenance.verificationStatus === 'awaiting-publication').length;

  const groups: { key: Exclude<Focus, 'all'>; label: string; list: typeof courses }[] = [
    { key: 'physics', label: 'Physics', list: physics },
    { key: 'engineering', label: 'Engineering', list: engineering },
  ];
  const showGroups = groups.filter((g) => g.list.length > 0 && (focus === 'all' || focus === g.key));
  const both = physics.length > 0 && engineering.length > 0;

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <header className="pg-head ud-head">
        <p className="ud-place label">
          <IconPin width={12} height={12} aria-hidden />
          {university.city}, {university.country} · {university.region}
        </p>
        <h1>{university.name}</h1>
        <div className="ud-actions">
          <a href={university.website} target="_blank" rel="noreferrer" className="btn-secondary">
            Official website <IconExternal width={13} height={13} />
          </a>
          <button
            type="button"
            onClick={() => toggleSavedUniversity(university.id)}
            aria-pressed={saved}
            className={cx('btn-secondary', saved && 'border-rose-200 text-rose-700')}
          >
            <IconHeart width={14} height={14} filled={saved} />
            {saved ? 'Saved' : 'Save university'}
          </button>
        </div>
        <p className="ud-facts">
          <b>{courses.length}</b> course{courses.length === 1 ? '' : 's'} recorded for {profile.applicationYear} entry
          {courses.length > 0 ? (
            <>
              {' '}
              — {readCount} with requirements read from the university
              {awaitingCount > 0 ? `, ${awaitingCount} awaiting data` : ''}
              {unpublishedCount > 0 ? `, ${unpublishedCount} not yet published` : ''}
            </>
          ) : null}
          .
        </p>
      </header>

      <div className="ud-grid">
        <section className="min-w-0" aria-labelledby="ud-courses">
          <div className="ud-bar">
            <h2 id="ud-courses" className="ud-h">
              Courses <span>{courses.length}</span>
            </h2>
            {both ? (
              <div className="ud-seg" role="group" aria-label="Show subject">
                {(
                  [
                    ['all', `All ${courses.length}`],
                    ['physics', `Physics ${physics.length}`],
                    ['engineering', `Engineering ${engineering.length}`],
                  ] as [Focus, string][]
                ).map(([k, label]) => (
                  <button key={k} type="button" aria-pressed={focus === k} onClick={() => setFocus(k)}>
                    {label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {courses.length === 0 ? (
            <EmptyState
              title={`No courses recorded for ${profile.applicationYear} entry`}
              description="Either this university's records have not been added yet, or requirements for this cycle are not published. Try switching the entry year in your profile."
            />
          ) : (
            showGroups.map((g) => (
              <div key={g.key} className="ud-group">
                {both && focus === 'all' ? (
                  <h3 className="ud-sub">
                    {g.label} <span>{g.list.length}</span>
                  </h3>
                ) : null}
                <div className="rows">
                  {g.list.map((c) => (
                    <CourseRow
                      key={c.id}
                      course={c}
                      university={universityById[c.universityId]}
                      eligibility={eligibility[c.id]}
                      hideUniversity
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        <aside className="ud-side" aria-label="About this university">
          <section className="ud-sec">
            <h2 className="ud-h ud-h-sm">Departments</h2>
            <ul className="ud-depts">
              {university.departments.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>

          {/* Only verified rankings are served (src/data/universities.ts); with
              none, the section is omitted rather than shown empty. */}
          {university.rankings.length === 0 ? null : (
            <section className="ud-sec">
              <h2 className="ud-h ud-h-sm">Rankings</h2>
              <div>
                {university.rankings.map((r) => (
                  <RankingRow key={r.id} ranking={r} />
                ))}
              </div>
              <p className="ud-fine">
                Listed per provider, edition and category, each with its own source and verification status. Never
                averaged or combined.
              </p>
            </section>
          )}

          <section className="ud-sec">
            <h2 className="ud-h ud-h-sm">Deadlines · {profile.applicationYear} entry</h2>
            {deadlines.length === 0 ? (
              <p className="ud-note">
                No checked deadline is recorded. Check the{' '}
                <a href={university.admissionsUrl ?? university.website} target="_blank" rel="noreferrer" className="link">
                  university’s admissions pages
                </a>{' '}
                or UCAS.
              </p>
            ) : (
              <ul className="ud-dl-list">
                {deadlines.map((d) => (
                  <li key={d.id}>
                    <div className="ud-dl-top">
                      <span>{d.label}</span>
                      <b>{deadlineDateLabel(d)}</b>
                    </div>
                    <div className="ud-dl-meta">
                      <span>{deadlineScopeLabel(d.appliesTo)}</span>
                      <VerificationBadge status={d.verificationStatus} />
                    </div>
                    {d.notes ? <p className="ud-fine">{d.notes}</p> : null}
                  </li>
                ))}
              </ul>
            )}
            <p className="ud-fine">
              Recorded per entry year and scope, so a course-specific or earlier deadline is never applied to the whole
              university.
            </p>
          </section>

          {/* The university-wide overview is shown only once it has been checked.
              Until then each course's own record is the authority. */}
          {overview.provenance.verificationStatus !== 'verified' ? null : (
            <section className="ud-sec">
              <h2 className="ud-h ud-h-sm">Admissions overview</h2>
              <p className="ud-callout">
                <b>University-wide</b> notes. Courses often publish different — usually stricter — requirements, so
                always read the course record too.
              </p>
              <dl className="ud-dl">
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
              <div className="ud-verified">
                <VerificationBadge status={overview.provenance.verificationStatus} />
                <span>Last verified: {formatDate(overview.provenance.lastVerified)}</span>
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
