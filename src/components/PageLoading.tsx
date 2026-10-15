import { Skeleton } from './ui/primitives';

/**
 * What a page shows while the catalogue is on its way. It reserves roughly the
 * height of a real page, so the footer stays put and nothing jumps when content
 * arrives, and it announces itself once, politely, to assistive technology.
 */
export function PageLoading({
  rows = 6,
  narrow = false,
  layout = 'list',
}: {
  rows?: number;
  narrow?: boolean;
  /** `detail`: a title block, actions, and the two-column body (main + sidebar) of the course and university pages. */
  layout?: 'list' | 'detail';
}) {
  if (layout === 'detail') {
    return (
      <div className="mx-auto max-w-8xl px-4 py-6 md:px-6" role="status" aria-live="polite" style={{ minHeight: '100vh' }}>
        <span className="sr-only">Loading…</span>
        <div aria-hidden="true">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="mt-4 h-11 w-3/4 max-w-xl" />
          <Skeleton className="mt-4 h-4 w-full max-w-md" />
          <div className="mt-5 flex flex-wrap gap-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/3" />
              {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
            <div className="hidden space-y-4 lg:block">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`mx-auto px-4 py-6 md:px-6 ${narrow ? 'max-w-4xl' : 'max-w-6xl'}`}
      role="status"
      aria-live="polite"
      style={{ minHeight: '100vh' }}
    >
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-4 h-10 w-2/3 max-w-md" />
        <Skeleton className="mt-4 h-4 w-full max-w-xl" />
        <div className="mt-8 space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
