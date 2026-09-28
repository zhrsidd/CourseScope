import { BRAND_COLORS, MARK_RING_PATH } from '@/lib/brand';

/**
 * The CourseScope mark. Decorative wherever it sits next to the wordmark, so it
 * is hidden from assistive technology there — the name is read from the text.
 * Geometry matches `public/favicon.svg` exactly; see src/lib/brand.ts.
 */
export function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill={BRAND_COLORS.tile} />
      <path
        d={MARK_RING_PATH}
        fill="none"
        stroke={BRAND_COLORS.ring}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill={BRAND_COLORS.accent} />
    </svg>
  );
}
