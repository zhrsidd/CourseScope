import { Link } from 'react-router-dom';
import { usePageTitle } from '@/lib/page-title';
import { CourseCard } from '@/components/CourseCard';
import { UniversityCard } from '@/components/UniversityCard';
import { IconHeart } from '@/components/ui/icons';
import { EmptyState, PageHeader, SectionTitle } from '@/components/ui/primitives';
import { useApp } from '@/state/AppContext';

export function ShortlistPage() {
  usePageTitle('My shortlist');
  const {
    savedCourseIds,
    savedUniversityIds,
    courseById,
    universityById,
    universities,
    coursesByUniversity,
    eligibility,
    profile,
  } = useApp();

  const savedCourses = savedCourseIds.map((id) => courseById[id]).filter(Boolean);
  const savedUniversities = savedUniversityIds
    .map((id) => universities.find((u) => u.id === id))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  const empty = savedCourses.length === 0 && savedUniversities.length === 0;

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Saved"
        title="My shortlist"
        description="Saved courses and universities are kept in this browser only — there is no account, and nothing is uploaded anywhere."
      />

      {empty ? (
        <EmptyState
          icon={<IconHeart width={28} height={28} />}
          title="Nothing saved yet"
          description="Use the heart button on any course or university card to build a shortlist."
          action={
            <Link to="/" className="btn-primary">
              Start searching
            </Link>
          }
        />
      ) : (
        <div className="space-y-8">
          {savedCourses.length > 0 ? (
            <section>
              <SectionTitle>Saved courses ({savedCourses.length})</SectionTitle>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {savedCourses.map((c) => (
                  <CourseCard
                    key={c.id}
                    course={c}
                    university={universityById[c.universityId]}
                    eligibility={eligibility[c.id]}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {savedUniversities.length > 0 ? (
            <section>
              <SectionTitle>Saved universities ({savedUniversities.length})</SectionTitle>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {savedUniversities.map((u) => (
                  <UniversityCard
                    key={u.id}
                    university={u}
                    courses={(coursesByUniversity[u.id] ?? []).filter(
                      (c) => c.applicationYear === profile.applicationYear,
                    )}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
