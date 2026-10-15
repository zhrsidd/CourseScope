import { Skeleton } from './ui/primitives';

/**
 * What a page shows while the catalogue is on its way. It reserves roughly the
 * height of a real page, so the footer stays put and nothing jumps when content
 * arrives, and it announces itself once, politely, to assistive technology.
 */
export function PageLoading({ rows = 6, narrow = false }: { rows?: number; narrow?: boolean }) {
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
