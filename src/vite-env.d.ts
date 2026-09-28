/// <reference types="vite/client" />

/**
 * Deployment configuration, read at BUILD time by Vite.
 *
 * Every variable is optional and every consumer must handle its absence: the
 * app is built and run with none of them set during development and testing, so
 * a missing value has to degrade rather than break. See `.env.example` for what
 * each one does and why some are deliberately left unset.
 */
interface ImportMetaEnv {
  /** External form or issue tracker for "Report an issue". Preferred over email. */
  readonly VITE_FEEDBACK_URL?: string;
  /** Project mailbox for "Report an issue". Used only when no form URL is set. */
  readonly VITE_FEEDBACK_EMAIL?: string;
  /** Real origin the site is served from, no trailing slash. Unset until one exists. */
  readonly VITE_SITE_URL?: string;
  /** Absolute URL of the social preview image. Emitted as og:image only when set. */
  readonly VITE_OG_IMAGE_URL?: string;
  /** Base path when served from a subdirectory. Leading and trailing slash. */
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
