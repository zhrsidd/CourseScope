/**
 * ---------------------------------------------------------------------------
 *  RUNTIME METADATA THAT DEPENDS ON THE DEPLOYMENT
 * ---------------------------------------------------------------------------
 *
 *  Most of this site's metadata is static and lives in `index.html`, which is
 *  where it belongs: a crawler that does not run JavaScript still sees the
 *  title, the description, the Open Graph tags and the favicon.
 *
 *  Two tags cannot be static, because they need an absolute origin that only
 *  the deployment knows:
 *
 *   · `<link rel="canonical">` — which URL is authoritative.
 *   · `<meta property="og:url">` — which URL a share card points at.
 *
 *  A relative canonical is meaningless, and a guessed absolute one is actively
 *  harmful: it tells crawlers some other page is the real one. So both are
 *  omitted from the HTML and added here ONLY when `VITE_SITE_URL` is set. With
 *  no domain configured, the correct number of canonical tags is zero, and that
 *  is what this produces.
 *
 *  ROBOTS is set in the HTML rather than here, because a crawler that ignores
 *  JavaScript must still see it.
 *
 *  THE SOCIAL PREVIEW IMAGE (v1.0.0) is a brand card — the mark, the name and
 *  the subtitle — not a screenshot, so it cannot misrepresent the catalogue.
 *  `og:image` needs an absolute URL to a hosted file, so it is emitted only when
 *  VITE_OG_IMAGE_URL is set; otherwise share cards stay text-only.
 *
 *  NOTE ON EMBEDDED HOSTS. When the build is served inside another site's page
 *  shell (as the v1 artifact deployment is), crawlers read the host page's
 *  metadata, not these tags. They remain correct for a self-hosted `dist/`.
 */

const env = (import.meta.env ?? {}) as Record<string, string | undefined>;

/** The deployed origin, with any trailing slash removed. Empty when unknown. */
export const SITE_URL: string = (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');

/** True when this build knows where it is deployed. */
export const HAS_SITE_URL: boolean = SITE_URL.length > 0;

/**
 * The canonical form of SITE_URL. A bare origin gets its root slash
 * ("https://example.org/"); a URL with a path is used exactly as configured,
 * because appending a slash to a path can name a different page — the v1
 * deployment's page URL is one such case.
 */
export const CANONICAL_URL: string = (() => {
  if (!HAS_SITE_URL) return '';
  try {
    const u = new URL(SITE_URL);
    return u.pathname === '/' || u.pathname === '' ? `${u.origin}/` : SITE_URL;
  } catch {
    return '';
  }
})();

/**
 * Absolute URL of the social preview image. Set explicitly rather than derived
 * from SITE_URL, because not every host serves `dist/` at the site's root: a
 * derived URL that 404s is worse than no image. The image itself ships in
 * `dist/social-preview.png`; a self-hosted deployment points this at it.
 */
export const OG_IMAGE_URL: string = (env.VITE_OG_IMAGE_URL ?? '').trim();

function upsert(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void): void {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

/**
 * Adds the origin-dependent tags, once, at boot. A no-op when no site URL is
 * configured — which is the intended state until a domain exists.
 */
export function applySiteMeta(): void {
  if (OG_IMAGE_URL) {
    upsert(
      'meta[property="og:image"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('property', 'og:image');
        return m;
      },
      (el) => el.setAttribute('content', OG_IMAGE_URL),
    );
    upsert(
      'meta[name="twitter:card"]',
      () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'twitter:card');
        return m;
      },
      (el) => el.setAttribute('content', 'summary_large_image'),
    );
  }

  if (!CANONICAL_URL) return;

  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    },
    (el) => el.setAttribute('href', CANONICAL_URL),
  );

  upsert(
    'meta[property="og:url"]',
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:url');
      return m;
    },
    (el) => el.setAttribute('content', CANONICAL_URL),
  );
}
