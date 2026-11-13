# Claude instructions for CourseScope

## What this is

CourseScope is a static website that lets a Year 13 student compare UK undergraduate **Physics** and
**Engineering** courses by their published A-Level entry requirements. It answers one question: which
courses can I apply to, given my subjects and predicted grades? It never estimates a chance of admission,
and that limit is a product rule, not a missing feature.

Students use it to choose where to apply, so the most important property of the whole project is that
**every fact shown was read from a university's own page, with the page and the date recorded.** A wrong
or invented requirement is the worst defect this project can have; a missing one is acceptable and is
labelled as missing.

Live: <https://coursescope.pages.dev/> (Cloudflare Pages, builds `main`). Backup: GitHub Pages, deployed
by CI after its checks pass.

## How it is built

- **React 18 + TypeScript (strict, `noUnusedLocals`) + Vite 5 + Tailwind 3.** No server, no API, no
  build-time fetching, no database. The built site makes no requests except self-hosted assets.
- **The catalogue is TypeScript source.** Course records live in `src/data/courses.*.ts`, are assembled in
  `src/data/index.ts`, and reach the UI only through the `DataSource` interface in `src/lib/dataSource.ts`.
  Nothing in `src/components` or `src/pages` imports a data file.
- **Pure logic in `src/lib/`** (no React): eligibility, identity, validation, import/export, search,
  filters, grades, fees. This is what the assertion suite tests.
- **Hash routing** (`/#/course/...`) and **relative asset paths** (`base: './'`), so the same `dist/` works
  on Cloudflare Pages, under `/CourseScope/` on GitHub Pages, and from the filesystem, with no rewrite rules.
- **Performance is engineered:** the catalogue, fees and validation load by dynamic import after first
  paint; routes are lazy with idle prefetch; fonts are self-hosted and preloaded; layout shift is 0 on every
  route; skeletons have the geometry of the content they stand for.
- **Configuration** is `VITE_*` variables read at build time. `.env.production` is committed on purpose
  because every value in it is public.

## Folder map

| Path | Contents |
| --- | --- |
| `src/types/` | The domain model. No React, no presentation |
| `src/data/` | `universities.ts`, `taxonomy.ts`, `builders.ts` (`course()`, `offer()`, `atLeastAt()`, `oneOf()`), `courses.real.batch*.ts` and `courses.v0*.ts` (verified records, one file per batch and university), `courses.2028-shells.ts`, `courses.awaiting.ts`, `tuition-fees*.ts`, `fixtures.ts` (assertion suite only, never served), `version.ts` (version, student-facing `RELEASES`, `DEVELOPER_NOTES`), `index.ts` (assembly and superseding) |
| `src/lib/` | `eligibility.ts`, `identity.ts`, `identity-invariant.ts`, `validation.ts`, `importers.ts`, `dataSource.ts`, `search.ts`, `filters.ts`, `grades.ts`, `fees.ts`, `format.ts`, `explain.ts`, `entry-year.ts`, `brand.ts` (the one source of the name, mark and colours) |
| `src/state/AppContext.tsx` | Catalogue loading, student profile, shortlist, comparison |
| `src/components/`, `src/components/ui/` | Presentational components and primitives (`Drawer`, `Collapse`, icons) |
| `src/pages/` | Landing, Search, Browse, Universities, University, Course, Compare, Shortlist, About, Admin (data manager) |
| `src/styles/` | `tokens.css` (every colour, type, spacing, radius and motion value), `fonts.css`, `explorer.css`, `landing.css`, `views.css` |
| `data/` | Exported JSON (`npm run export:data`), `SCHEMA.md` (the wire format), `research/` |
| `research/`, `docs/reports/` | Per-university research notes and per-release reports |
| `engine-check.ts` | The assertion suite: engine, parser, importer, identity, validation, brand, fees |
| `smoke.v09.mjs` | The supported browser QA suite (`npm run qa`) |
| `qa.*.mjs` | Focused browser suites: routing, visualisations, journeys, accessibility, visual baselines, release candidate |
| `smoke.mjs`, `smoke.batch*.mjs`, `smoke.v08.mjs` | Historical walkthroughs, kept as a record. Do not extend them |
| `visual-baselines/` | Committed screenshots at 1440, 1280, 768, 390 and 320 px |
| `lock09.ts` | A catalogue summary script (counts, validation, identity risks) |
| `scripts/` | `export-data.ts`, `import-fee-research.mjs` |

## Commands

Node 22. Use `npm ci`, never `npm install`, so the lockfile decides versions.

```bash
npm ci
npm run dev              # http://localhost:5173
npm run typecheck        # tsc --noEmit
npm run check            # the assertion suite; prints PASS/FAIL per assertion and "All checks passed."
npm run build            # typecheck, then build to dist/
npm run release:verify   # typecheck + check + build
npm run preview          # serve dist/ (QA expects http://127.0.0.1:4321)
npm run export:data      # regenerate data/*.json from the TypeScript catalogue
```

Browser QA runs against a preview of the production build. Playwright is deliberately not a dependency;
CI installs it without saving (`npm install --no-save playwright@1.56.0`). In one shell:

```bash
npm run build && npm run preview -- --port 4321 --strictPort --host 127.0.0.1
```

and in another:

```bash
npm run qa               # release checks
npm run qa:routing       # and qa:viz, qa:p5, qa:a11y, qa:visual, qa:rc for the area you changed
QA_BASE=http://127.0.0.1:5000 npm run qa   # another port
```

The counts quoted in `README.md` lag behind (the suite currently runs about 950 assertions). Read the
count from the run you just did, never from a document.

CI (`.github/workflows/ci.yml`) runs clean install, typecheck, assertions, build and browser QA on every
push and pull request, and deploys the GitHub Pages backup from `main`.

## Data rules

These come before any coding rule.

1. **Never invent, infer or carry over a requirement.** A grade, subject, admissions test, fee or deadline
   is entered only from the university's own page for that cycle. If it is not published, the record says so.
2. **Two separate questions.** Does the course exist (if unknown, it is not listed at all) and have this
   cycle's requirements been checked (`verified`, `partially-verified`, `awaiting-publication`,
   `awaiting-data`). Never upgrade a status without the evidence.
3. **`verified` needs a source URL, a source title, a check date and a cycle.** Validation treats a
   missing one as an error.
4. **Keep the university's wording verbatim** in `rawRequirementText`, and model it as pathways and
   constraints (`min-count-at-grade`, `one-of`, `manual-review`), never as a flattened string.
5. **Cycles do not leak.** `id` is `slug--applicationYear`; `slug` is stable across cycles. A 2028 shell
   carries identity only: no grades, subjects, tests or deadlines copied from 2027. An admissions test
   recorded for another cycle is reported as unknown, never applied.
6. **Identity is stable.** Do not rename a slug or id; shortlists and shared links depend on them.
   Duplicates are detected by `src/lib/identity.ts` and reviewed by hand; nothing merges automatically.
7. **Fixtures are not catalogue.** Synthetic records live only in `src/data/fixtures.ts`.
8. **Silence and ignorance are different.** `no-stated-preference` is the university saying nothing;
   `unknown` is us not knowing. Only `required` can produce a fail; recommendations produce an advisory.
9. **Wording never implies an outcome.** The four verdicts are fixed. No "likely", "chance", "safe",
   "reach" or probability anywhere, including comments, copy and metadata.

## Coding rules

1. **Logic goes in `src/lib/` with an assertion in `engine-check.ts`.** Components stay presentational.
2. **Go through `DataSource`.** A component or page that imports from `src/data/courses.*` is a bug.
3. **The brand has one source.** Name, subtitle, mark geometry and colours come from `src/lib/brand.ts`.
   `index.html` and the SVGs in `public/` repeat those values and the checks fail if they drift, so change
   them together.
4. **Keep the site portable.** No absolute paths, no path-based routes, no runtime network calls, no
   third-party scripts or analytics, nothing secret in a `VITE_*` variable.
5. **Protect first paint.** Do not statically import the catalogue, fees or validation from a route's
   entry module. New heavy content loads lazily behind a placeholder of reserved height.
6. **New dependencies need a strong reason.** The runtime dependencies are React and React Router.
7. **Release notes are split.** `RELEASES` in `src/data/version.ts` is student-facing and written in plain
   language about the information; engineering detail goes in `DEVELOPER_NOTES` and `CHANGELOG.md`.
8. **Add a new batch as a new file** (`courses.real.batchN.<university>.ts`), register it in
   `src/data/index.ts`, add assertions for anything unusual in it, and keep the research note.
9. **Do not weaken an assertion or replace a visual baseline to get a pass.** A baseline is replaced only
   after looking at the new image and confirming the change is intended.

## Design rules

`src/styles/tokens.css` is the source of truth; Tailwind reads it through `tailwind.config.js`.

- **Tokens only.** No new hex values, font sizes, radii or durations in components.
- **Colour.** `--accent` (teal `#0f766e`) is for text, links and focus on light surfaces. `--signal` (the
  logo teal) is for navy backgrounds only, never text on white. `--line` is decorative; the edge of a
  control uses `--control` (3:1). The brand accent appears in exactly one place, the focal point of the mark.
- **Status is never colour alone.** `ok`, `wait`, `no` and `rev` always come with an icon and a word.
- **Type.** Instrument Serif (`font-display`) has one weight and is used for the page title only; never
  combine it with `font-bold` or `font-semibold`. Everything else is Geist. Numbers people compare use
  tabular figures. Labels are 13 px sentence case, not small uppercase.
- **Flat at rest.** No card shadows; the only elevation is the overlay shadow on drawers and menus.
- **One focus treatment:** a 2 px outline with a 2 px offset, teal on light and logo teal on navy. Never
  remove it. `scroll-padding-top` keeps focused content clear of the sticky header.
- **Motion** uses the one CSS vocabulary (arrive, press, respond, open, reveal) and sits entirely inside
  `prefers-reduced-motion: no-preference`. Entry animations start from visible content.
- **Responsive.** Every view works at 320 px with no sideways scrolling; wide tables and matrices stack on
  phones. Touch targets meet the WCAG 2.2 24 px minimum (`min-h-target`).
- **Honest empty and unavailable states.** Say plainly what is missing and why; never placeholder text
  that reads like data. A placeholder ranking is always badged.
- The mark is geometry only: no crest, mortarboard or gradient.

## Mistakes a weaker model makes here, and how to avoid each

| Mistake | Why it is wrong here | Do this instead |
| --- | --- | --- |
| Filling in a requirement from general knowledge ("Imperial Physics is A\*A\*A") | Students act on it; it may be wrong for this cycle | Enter only what the cited page says, with URL, title and date; otherwise mark it awaiting |
| Copying 2027 grades into a 2028 record so the page is not empty | The university has not published 2028 | Leave the shell empty; the page already explains and links the earlier cycle |
| Marking a record `verified` because it looks complete | Verified is a claim about evidence | Only with source URL, title, check date and cycle |
| Adding a "chance of admission", a match percentage or words like "likely" | The product never predicts admission | Use the four fixed verdicts |
| Flattening "AAA with an A\* in either Maths or Physics" into two required A\* subjects | It rejects students who qualify | Model it as a `min-count-at-grade` constraint |
| Treating a recommended subject as required | Produces false fails | Only `required` can fail; the rest is an amber advisory |
| Importing a `courses.*.ts` file in a component | Breaks the data-source boundary and the lazy loading | Use the `DataSource` through `AppContext` |
| Switching to path routing (`/course/x`) because it looks cleaner | Breaks direct links and refresh on both static hosts | Keep hash routing and `base: './'` |
| Renaming a slug or id to tidy it | Breaks saved shortlists and shared links | Leave identity alone |
| Quoting the assertion or QA count from the README | Those figures are out of date | Report the number the run printed |
| Extending `smoke.batch*.mjs` or `smoke.v08.mjs` | They are historical | Add checks to `smoke.v09.mjs` or the matching `qa.*.mjs` |
| Adding `playwright` to `package.json` | It is installed without saving on purpose | `npm install --no-save playwright@1.56.0` |
| Regenerating visual baselines to make `qa:visual` pass | Hides a real regression | Look at the diff first; replace only an intended change |
| Putting the brand name or a colour in a new place | The brand checks fail on drift | Import from `src/lib/brand.ts` |
| A static import that pulls the catalogue into first paint | Regresses LCP, which was fixed deliberately | Dynamic import with a reserved-height placeholder |
| Engineering detail in the student-facing release notes | That page is read by students choosing a degree | Plain language in `RELEASES`; detail in `DEVELOPER_NOTES` |
| Calling `/admin` secure, or adding something private to it | It has no authentication | It holds no private data; keep it that way |
| Saying "works in Safari" | Automated QA is Chromium only | Say Chromium was checked and the rest is manual |

## How to work here

1. Start with `git status`. Read the files you will change and the part of `data/SCHEMA.md` or
   `README.md` that describes them.
2. For data work, open the university's page, record what it says, and write the research note before
   the record. If the page cannot be read, stop and report that; do not fill the gap.
3. Make the smallest change that does the job, in the style of the surrounding code.
4. Run the checks yourself and report what they printed, including what you could not check.
5. `main` deploys to production. Do not push to `main` or merge unless the owner asks.

## Before saying a task is done

- [ ] `git status` shows only the files this task should touch; `dist/`, `shots/` and `node_modules/` are not staged.
- [ ] `npm run typecheck` passes.
- [ ] `npm run check` ends with "All checks passed."; new logic has new assertions.
- [ ] `npm run build` passes.
- [ ] UI or routing changed: `npm run qa` and the matching `qa:*` suite pass against a preview of the
      production build, with 0 page errors.
- [ ] Data changed: every new or changed fact has a source URL, title and check date; no 2028 record
      carries requirements; validation reports 0 errors and 0 duplicates; `npm run export:data` rerun and
      `data/*.json` committed; the research note is saved.
- [ ] UI changed: checked at 320 px and desktop, by keyboard, and with reduced motion; tokens only; no
      layout shift introduced.
- [ ] No wording anywhere implies an admissions outcome.
- [ ] A student-visible change is in `RELEASES` (plain language) and `CHANGELOG.md`; the version in
      `src/data/version.ts` and `package.json` agree if it was bumped.
- [ ] The report gives the counts from this run and names what was not verified (Safari, Firefox, screen
      readers, real devices).
