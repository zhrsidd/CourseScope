import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Course } from '@/types';
import { usePageTitle } from '@/lib/page-title';
import { announce } from '@/components/Announcer';
import { DifferenceStrip } from '@/components/DifferenceStrip';
import { EligibilityBadge } from '@/components/EligibilityBadge';
import { PageLoading } from '@/components/PageLoading';
import { VerificationBadge } from '@/components/SourceBadge';
import { UniversityRow } from '@/components/UniversityRow';
import { IconCompare, IconCross, IconHeart } from '@/components/ui/icons';
import { Select } from '@/components/ui/primitives';
import { awardLabel, durationLabel, typicalOfferLabel } from '@/lib/format';
import { filledGrades } from '@/lib/grades';
import { MAX_COMPARE, useApp } from '@/state/AppContext';

type SortKey = 'saved' | 'university' | 'course';
const SORTS: { id: SortKey; label: string }[] = [
  { id: 'saved', label: 'Order saved' },
  { id: 'university', label: 'University A–Z' },
  { id: 'course', label: 'Course A–Z' },
];

function ShortlistPageInner() {
  usePageTitle('My shortlist');
  const navigate = useNavigate();
  const {
    savedCourseIds,
    savedUniversityIds,
    courseById,
    universityById,
    universities,
    coursesByUniversity,
    eligibility,
    profile,
    toggleSavedCourse,
    replaceCompare,
  } = useApp();

  const [sort, setSort] = useState<SortKey>('saved');
  const [picked, setPicked] = useState<string[]>([]);
  const [removed, setRemoved] = useState<{ id: string; name: string } | null>(null);

  const hasGrades = filledGrades(profile).length > 0;
  const uniName = (c: Course) => universityById[c.universityId]?.shortName ?? universityById[c.universityId]?.name ?? '';

  const saved = useMemo(() => {
    const list = savedCourseIds.map((id) => courseById[id]).filter(Boolean) as Course[];
    if (sort === 'university') return [...list].sort((a, b) => uniName(a).localeCompare(uniName(b)) || a.name.localeCompare(b.name));
    if (sort === 'course') return [...list].sort((a, b) => a.name.localeCompare(b.name) || uniName(a).localeCompare(uniName(b)));
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCourseIds, courseById, sort, universityById]);

  const savedUniversities = savedUniversityIds
    .map((id) => universities.find((u) => u.id === id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  const pickedCourses = picked.map((id) => courseById[id]).filter(Boolean) as Course[];
  const empty = saved.length === 0 && savedUniversities.length === 0 && !removed;

  const togglePick = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_COMPARE ? p : [...p, id]));

  const remove = (c: Course) => {
    toggleSavedCourse(c.id);
    setPicked((p) => p.filter((x) => x !== c.id));
    setRemoved({ id: c.id, name: c.name });
    announce(`Removed ${c.name} from your shortlist`);
  };
  const undo = () => {
    if (!removed) return;
    toggleSavedCourse(removed.id);
    announce(`Restored ${removed.name}`);
    setRemoved(null);
  };
  const compareSelected = () => {
    replaceCompare(picked);
    navigate('/compare');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <header className="pg-head">
        <p className="label">Saved · {profile.applicationYear} entry</p>
        <h1>My shortlist</h1>
        <p className="pg-sub">
          Kept in this browser only. There is no account and nothing is uploaded. Pick up to {MAX_COMPARE} courses to
          see where they differ, or open them side by side.
        </p>
      </header>

      {empty ? (
        <div className="sl-empty">
          <IconHeart width={26} height={26} aria-hidden />
          <h2>Nothing saved yet</h2>
          <p>
            Press the heart on a course or a university to keep it here. Saved items stay on this device, so you can come
            back to them.
          </p>
          <p className="sl-empty-links">
            <Link to="/search" className="btn-primary">Start searching</Link>
            <Link to="/browse" className="link">or browse by subject</Link>
          </p>
        </div>
      ) : (
        <>
          {removed ? (
            <div className="sl-undo" role="status">
              <span>Removed <b>{removed.name}</b>.</span>
              <button type="button" className="link" onClick={undo}>Undo</button>
              <button type="button" className="sl-undo-x" aria-label="Dismiss" onClick={() => setRemoved(null)}>
                <IconCross width={12} height={12} />
              </button>
            </div>
          ) : null}

          {saved.length > 0 ? (
            <section aria-labelledby="sl-courses">
              <div className="sl-bar">
                <h2 id="sl-courses">
                  Courses <span>{saved.length}</span>
                </h2>
                <Select<SortKey> id="sl-sort" label="Sort by" value={sort} onChange={setSort} options={SORTS} />
              </div>

              <ul className="sl-list">
                {saved.map((c) => {
                  const on = picked.includes(c.id);
                  const full = picked.length >= MAX_COMPARE && !on;
                  const verdict = eligibility[c.id]?.verdict;
                  const noReq = c.requirementsPublicationStatus === 'not-yet-published';
                  return (
                    <li key={c.id} className={`sl-row${on ? ' is-picked' : ''}`}>
                      <label className="sl-pick">
                        <input
                          type="checkbox"
                          checked={on}
                          disabled={full}
                          onChange={() => togglePick(c.id)}
                        />
                        <span className="sr-only">Select {c.name} at {uniName(c)} to examine</span>
                      </label>
                      <div className="sl-main">
                        <p className="sl-uni">
                          <Link to={`/university/${universityById[c.universityId]?.slug ?? c.universityId}`}>{uniName(c)}</Link>
                        </p>
                        <h3>
                          <Link to={`/course/${c.id}`}>{c.name}</Link>
                        </h3>
                        <p className="sl-meta">
                          {awardLabel(c)} · {durationLabel(c.durationYears, c.durationYearsMax)} · {c.applicationYear} entry
                          {c.courseCode ? <> · UCAS <span className="t-code">{c.courseCode}</span></> : null}
                        </p>
                      </div>
                      <div className="sl-offer">
                        <span className="sl-k">Typical offer</span>
                        <span className={noReq ? 'sl-offer-v is-text' : 'sl-offer-v'}>{typicalOfferLabel(c)}</span>
                      </div>
                      <div className="sl-status">
                        {hasGrades && verdict ? <EligibilityBadge verdict={verdict} short /> : null}
                        <VerificationBadge status={c.provenance.verificationStatus} provenance={c.provenance} />
                      </div>
                      <button type="button" className="sl-x" onClick={() => remove(c)} aria-label={`Remove ${c.name} from shortlist`}>
                        <IconCross width={13} height={13} />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="sl-examine" aria-live="polite">
                {pickedCourses.length < 2 ? (
                  <p className="sl-hint">
                    {saved.length < 2
                      ? 'Save a second course to compare.'
                      : pickedCourses.length === 0
                        ? 'Tick two or more courses to see where they differ.'
                        : 'Tick one more course to see where they differ.'}
                  </p>
                ) : (
                  <>
                    <DifferenceStrip courses={pickedCourses} />
                    <div className="sl-actions">
                      <button type="button" className="btn-primary" onClick={compareSelected}>
                        <IconCompare width={16} height={16} aria-hidden /> Open {pickedCourses.length} side by side
                      </button>
                      <button type="button" className="link" onClick={() => setPicked([])}>Clear selection</button>
                    </div>
                  </>
                )}
              </div>
            </section>
          ) : null}

          {savedUniversities.length > 0 ? (
            <section aria-labelledby="sl-unis" className="sl-unis">
              <div className="sl-bar">
                <h2 id="sl-unis">
                  Universities <span>{savedUniversities.length}</span>
                </h2>
              </div>
              <ul className="ur-list">
                {savedUniversities.map((u) => (
                  <UniversityRow
                    key={u.id}
                    university={u}
                    courses={(coursesByUniversity[u.id] ?? []).filter((c) => c.applicationYear === profile.applicationYear)}
                  />
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

export function ShortlistPage() {
  const { loading } = useApp();
  return loading ? <PageLoading /> : <ShortlistPageInner />;
}
