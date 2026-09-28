/**
 * ---------------------------------------------------------------------------
 *  BRAND — ONE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 *
 *  v1.0.0 gives the product a name: CourseScope. Every public surface — the
 *  header, the footer, tab titles, the methodology page, the release notes —
 *  reads the name from here, so it cannot drift. `index.html` and the static
 *  SVGs in `public/` cannot import TypeScript, so they repeat the values below;
 *  the brand regression checks in `engine-check.ts` and `smoke.v09.mjs` fail if
 *  those copies disagree with this file.
 *
 *  THE MARK is a "C" drawn as an open ring with a single point at its centre:
 *  a lens with a focal point, and the initial of the name. It is geometry only —
 *  no crest, no mortarboard, no gradient — so it stays legible at 16px and says
 *  "research tool", not "university".
 *
 *  THE ACCENT is used in exactly one place, the focal point of the mark.
 *  Everything else stays on the existing navy-and-slate palette, so the brand
 *  adds a name, not a new look.
 */

export const BRAND_NAME = 'CourseScope';

/** Descriptive subtitle. Describes scope; never implies an admissions outcome. */
export const BRAND_SUBTITLE = 'UK Physics & Engineering Course Finder';

/** Compact form for the desktop header. */
export const BRAND_SHORT_SUBTITLE = 'UK Physics & Engineering';

/** Full document title: the home page's tab title and the static <title>. */
export const BRAND_TITLE = `${BRAND_NAME} — ${BRAND_SUBTITLE}`;

export const BRAND_DESCRIPTION =
  'Compare UK university Physics and Engineering courses, published A-Level entry requirements, admissions tests and application routes.';

/** One-sentence positioning, used to open the methodology page. */
export const BRAND_POSITIONING =
  'CourseScope is an independent research tool for comparing published UK university entry requirements.';

/** The name this product carried before v1. Kept only so tests can assert it is gone. */
export const LEGACY_NAME = 'UK University Course Finder';

export const BRAND_COLORS = {
  /** Existing navy-900 — the tile. */
  tile: '#152344',
  /** The ring. */
  ring: '#ffffff',
  /** The single accent: the focal point. */
  accent: '#3fbfae',
} as const;

/** The mark's geometry, shared by the React component, favicon and preview image. */
export const MARK_RING_PATH = 'M22.36 9.64 A9 9 0 1 0 22.36 22.36';
