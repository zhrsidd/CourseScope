import { Link } from 'react-router-dom';
import { usePageTitle } from '@/lib/page-title';
import { ComparisonLegend, ComparisonTable } from '@/components/ComparisonTable';
import { StudentProfilePanel } from '@/components/StudentProfilePanel';
import { IconCompare } from '@/components/ui/icons';
import { EmptyState, PageHeader } from '@/components/ui/primitives';
import { MAX_COMPARE, useApp } from '@/state/AppContext';
import { profileIsEmpty } from '@/lib/grades';

export function ComparePage() {
  usePageTitle('Compare courses');
  const { compareIds, courseById, clearCompare, profile } = useApp();
  const courses = compareIds.map((id) => courseById[id]).filter(Boolean);

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Comparison"
        title="Compare courses"
        description={`Up to ${MAX_COMPARE} courses side by side. Rows where the selected courses differ are marked with a dot.`}
        actions={
          courses.length > 0 ? (
            <button type="button" className="btn-secondary h-9 text-sm" onClick={clearCompare}>
              Clear comparison
            </button>
          ) : undefined
        }
      />

      {courses.length === 0 ? (
        <EmptyState
          icon={<IconCompare width={28} height={28} />}
          title="No courses selected yet"
          description="Add courses from the search results or from any course page. You can compare up to five at a time."
          action={
            <Link to="/" className="btn-primary">
              Find courses
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {profileIsEmpty(profile) ? (
            <div className="surface p-3 text-sm text-ink-muted">
              Add your predicted grades below to colour the requirement rows against your own profile.
            </div>
          ) : null}
          <ComparisonTable courses={courses} />
          <ComparisonLegend />
          <div className="max-w-md">
            <StudentProfilePanel />
          </div>
        </div>
      )}
    </div>
  );
}
