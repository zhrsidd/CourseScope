import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';

/**
 * ---------------------------------------------------------------------------
 *  BUILD AND DEPLOYMENT CONFIGURATION
 * ---------------------------------------------------------------------------
 *
 *  This app is a STATIC SITE. There is no server, no API and no build-time data
 *  fetching — the whole catalogue is bundled. That is what makes the deployment
 *  story simple, and it is worth stating because it determines everything below.
 *
 *  ROUTING IS HASH-BASED, DELIBERATELY AND STILL.
 *
 *  The app uses HashRouter, so every route lives after a `#`:
 *
 *      /#/course/kcl-general-engineering-beng--2027
 *
 *  The browser only ever requests `/index.html` from the host, whatever route a
 *  person is on. That has one large consequence: DEEP LINKS WORK ON ANY STATIC
 *  HOST WITH NO REWRITE RULES AT ALL. No `_redirects`, no `try_files`, no
 *  404-to-index trick, no per-host configuration to get wrong. Paste a course
 *  URL into a new tab on GitHub Pages, S3, Netlify, Cloudflare Pages or a plain
 *  Apache directory and it resolves.
 *
 *  The cost is aesthetic — a `#` in every URL — plus the fact that crawlers see
 *  one page. Browser-history routing would fix both, and it would require
 *  host-specific rewrite configuration that this project has no way to test
 *  against a real host from here. v0.9 is a release candidate, so the routing
 *  architecture is NOT migrated for looks. It is documented instead, and the
 *  tradeoff is recorded in the release report rather than silently accepted.
 *
 *  BASE PATH defaults to './' — relative asset URLs.
 *
 *  Relative paths mean the built `dist/` works when served from a domain root,
 *  from a subdirectory, or straight off the filesystem, without rebuilding.
 *  Production is GitHub Pages at https://zhrsidd.github.io/CourseScope/ — a
 *  sub-path — which relative assets handle with no extra configuration. A
 *  host that needs an absolute base can set VITE_BASE_PATH.
 *
 *  Hash routing is what makes deep links work there: GitHub Pages serves only
 *  real files and has no rewrite rules, and with HashRouter every route
 *  (`/CourseScope/#/course/…`) requests the same index.html, so a course or
 *  university link opens directly and survives a refresh.
 */
/**
 * Deployment metadata in the STATIC HTML. src/lib/site-meta.ts adds the same
 * tags at runtime, but link-preview crawlers (Slack, WhatsApp, LinkedIn, X)
 * do not run JavaScript, so on a real host the tags have to be in index.html
 * itself. Emitted only for variables that are set; a build with none of them
 * is unchanged. Values are escaped for an HTML attribute.
 */
function siteMetaPlugin(env: Record<string, string>): Plugin {
  const attr = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return {
    name: 'coursescope-site-meta',
    transformIndexHtml(html) {
      const tags: { tag: string; attrs: Record<string, string>; injectTo: 'head' }[] = [];
      const site = (env.VITE_SITE_URL ?? '').trim();
      const image = (env.VITE_OG_IMAGE_URL ?? '').trim();
      if (site) {
        tags.push({ tag: 'link', attrs: { rel: 'canonical', href: attr(site) }, injectTo: 'head' });
        tags.push({ tag: 'meta', attrs: { property: 'og:url', content: attr(site) }, injectTo: 'head' });
      }
      if (image) {
        tags.push({ tag: 'meta', attrs: { property: 'og:image', content: attr(image) }, injectTo: 'head' });
        tags.push({ tag: 'meta', attrs: { name: 'twitter:image', content: attr(image) }, injectTo: 'head' });
      }
      // With an image configured, the static card is the large-image card too.
      const out = image
        ? html.replace(
            '<meta name="twitter:card" content="summary" />',
            '<meta name="twitter:card" content="summary_large_image" />',
          )
        : html;
      return { html: out, tags };
    },
  };
}

export default defineConfig(({ mode }) => {
  /*
   * THE SINGLE-FILE BUILD IS A PRODUCTION BUILD. It runs under its own mode name
   * (`singlefile`) only so the plugin and output directory can switch on it —
   * but Vite picks env files by mode name, so without this it would silently
   * load `.env.singlefile` (which does not exist) instead of `.env.production`,
   * and ship with no feedback destination and no site URL. Copying the
   * production values into process.env makes Vite's own env resolution pick
   * them up; anything already set in the real environment still wins.
   */
  const envMode = mode === 'singlefile' ? 'production' : mode;
  const env = loadEnv(envMode, process.cwd(), 'VITE_');
  if (mode === 'singlefile') {
    for (const [key, value] of Object.entries(env)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
  const base = env.VITE_BASE_PATH || './';

  return {
    plugins: [react(), siteMetaPlugin(env), ...(mode === 'singlefile' ? [viteSingleFile()] : [])],
    base,
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    build: {
      outDir: mode === 'singlefile' ? 'dist-single' : 'dist',
      emptyOutDir: true,
      // The catalogue is one large data module, so a single chunk is honest
      // about what this app is. Raising the warning limit rather than silencing
      // it: the size is recorded in the release report and code-splitting is a
      // post-v1 item, not something to attempt during a release candidate.
      chunkSizeWarningLimit: 1200,
    },
    preview: {
      port: 4321,
      strictPort: true,
    },
  };
});
