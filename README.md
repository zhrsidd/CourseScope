# CourseScope

**UK Physics & Engineering Course Finder — v1.0.0, initial public release.**

Live: <https://coursescope.pages.dev/> · Backup: <https://zhrsidd.github.io/CourseScope/> · Repository: <https://github.com/zhrsidd/CourseScope>

A searchable catalogue of UK undergraduate **Physics** and **Engineering** courses, built around
A-Level entry requirements for students applying after Year 13.

It answers one question well: *which universities and courses can I apply to, given my A-Level
subjects and predicted grades?* — and it never claims more than that. There is no "likely to be
admitted", and no admission probability anywhere in the codebase.

> **Evidence level is part of every record, and there are two separate questions.**
> *Does this course exist?* is answered from the university's own course page or course listing —
> if it cannot be answered, the course is not listed at all. *Have this cycle's entry requirements
> been checked?* is answered separately, and is what the label on each course reports:
> `verified`, `partially-verified`, `awaiting-publication` or `awaiting-data`. Nothing is presented
> as checked unless the page read and the date it was read are both recorded.

## Release status

| | |
|---|---|
| Version | **1.1.0** (tuition fees) — v1.0.0 is the latest tagged release |
| Served records | 1,132 |
| Verified | 563 |
| Awaiting data | 6 — all waiting on a university to publish its 2027 cycle |
| Universities | 22, **all** with verified data |
| Tuition fees (2027 entry) | 431 courses with at least one published fee, 20 universities; 2028 not yet published anywhere |
| Assertions | 894 passing |
| Production validation | 0 errors, 0 duplicates |
| Browser QA | 212 checks passing, 0 page errors |

## Running it

```bash
npm ci                 # install exactly what the lockfile pins
npm run dev            # http://localhost:5173
npm run build          # production build -> dist/
npm run preview        # serve dist/ at http://localhost:4321
```

### Verifying a release

Run these four, in order, from a clean checkout. All must pass before tagging.

```bash
npm ci                 # never `npm install` for a release — use the lockfile
npm run typecheck      # tsc --noEmit, strict, noUnusedLocals
npm run check          # 894 engine, parser, importer, identity, validation, brand, polish and fee assertions
npm run build          # typechecks again, then builds to dist/
```

Then, with `npm run preview` running in another shell:

```bash
npm run qa             # 212 browser checks: fresh state, legacy storage, mobile, brand, feedback, fees,
                       # accessibility, empty states, cycles, source links, performance
```

`npm run release:verify` runs typecheck, assertions and build in one command.

The build depends on nothing outside the repository: no absolute paths, no developer machine paths,
no localhost services, no network access, no browser state. A source archive extracted on another
machine builds with the four commands above and nothing else. The only external requests the *built
site* makes are to Google Fonts, and it renders correctly with system fonts when those are blocked.

## Deployment

Production is **Cloudflare Pages**: <https://coursescope.pages.dev/>. GitHub Pages remains a
backup deployment at <https://zhrsidd.github.io/CourseScope/>.

Cloudflare Pages is connected to the `main` branch and builds from the repository root with the
React (Vite) preset, `npm run build`, and output directory `dist`.

`.github/workflows/ci.yml` runs on every push and pull request: clean install (`npm ci`),
typecheck, the assertion suite (including catalogue validation and duplicate checks), the production
build, and the browser QA suite against a production preview. On a push to `main`, after those
checks pass, it also deploys the same checked build to the **GitHub Pages backup**.

The app is a **static site** — no server, no API, no build-time data fetching.

**Routing is hash-based** (`/#/course/...`), deliberately. With hash routing every route requests
the same `index.html`, so course and university links open directly in a new tab and survive a
refresh on both Cloudflare Pages and the GitHub Pages backup, with no rewrite rule required.

**Asset paths are relative** (`base: './'`), so the same `dist/` works under `/CourseScope/`, at a
domain root, or from the filesystem without rebuilding.

**Metadata for crawlers.** Canonical, `og:url`, `og:image` and a large Twitter card are written into
the built `index.html` (see `siteMetaPlugin` in `vite.config.ts`), because link-preview crawlers do
not run JavaScript.

### Configuration

Production values live in **`.env.production`**, which is committed because every value in it is
public (Vite inlines them into the public bundle). `.env.example` documents every variable for
deployments elsewhere. Vite reads these at **build** time, so changing one means rebuilding.

| Variable | current production value | Effect when unset |
|---|---|---|
| `VITE_SITE_URL` | `https://coursescope.pages.dev/` | No canonical link and no `og:url` |
| `VITE_FEEDBACK_URL` | the project Typeform | Report-an-issue offers "Copy report" only, and says so |
| `VITE_FEEDBACK_EMAIL` | not set (form is preferred) | Used only when no form URL is set |
| `VITE_OG_IMAGE_URL` | `https://coursescope.pages.dev/social-preview.png` | Text-only share cards |
| `VITE_BASE_PATH` | not set | Defaults to `./` |

`/admin` has no authentication and is not linked from any public navigation. It contains no private
data and performs no destructive server actions — there is no server. Treat the route as internal.

## Architecture

```
src/
  types/            Domain model. No React, no presentation.
  data/
    taxonomy.ts     Subject tree, degree types, admissions tests, status vocabularies, glossary
    universities.ts 22 universities
    courses.*.ts    Sample course records, split by subject area
    courses.real.batch1.ts   Real data — pilot batch 1 (Oxford, Cambridge, Imperial, 2027 entry)
    courses.real.batch2.imperial.ts  Real data — batch 2, Imperial (2027 entry)
    courses.real.batch2.ucl.ts       Real data — batch 2, UCL (2027 entry)
    courses.real.batch3.imperial.ts   Real data — batch 3, Imperial (2027 entry)
    courses.real.batch3.ucl.ts        Real data — batch 3, UCL (2027 entry)
    courses.real.batch3.manchester.ts Real data — batch 3, Manchester (2027 entry)
    fixtures.ts              Synthetic records for the assertion suite only
    courses.2028-shells.ts   2028 records for every verified 2027 course, carrying no requirements
    courses.awaiting.ts      Course shells for the first real-data batch
    builders.ts     course() / offer() / atLeastAt() / oneOf() — defaults and ids only
  lib/
    dataSource.ts   DataSource interface + Static / JSON / InMemory implementations
    identity.ts     Canonicalisation, stable identity keys, duplicate detection, superseding
    eligibility.ts  Rule-based matching, reported part by part
    validation.ts   Record checks for the admin data viewer
    importers.ts    JSON + CSV import, export, the shared wire format
    search.ts       Query parser for the search bar
    filters.ts      Filter state, filtering and sorting
    grades.ts       Grade comparison, subject normalisation
    format.ts       Labels and course-level derived values
  state/AppContext  Catalogue loading, profile, shortlist, comparison, validation
  components/       UniversityCard, CourseCard, GradeSelector, SubjectRequirement,
                    FilterSidebar, ComparisonTable, RankingBadge, SourceBadge,
                    EligibilityBadge + EligibilityBreakdown, Navbar, InfoTooltip, …
  pages/            Search, Browse, Universities, University, Course, Compare,
                    Shortlist, About, Data manager
data/               universities.json, courses.json, rankings.json, tests.json + SCHEMA.md
scripts/            export-data.ts
engine-check.ts     894 assertions over the engine, parser, importer, validation, brand and fees
smoke.v09.mjs       The supported QA suite — 212 release checks in a real browser
smoke.mjs,          Historical per-batch regression walkthroughs, kept as a record of
smoke.batch*.mjs,     what each batch was checked against. Still runnable, but
smoke.v08.mjs         superseded by smoke.v09.mjs.
```

## The data model

Full field-by-field reference: **[`data/SCHEMA.md`](data/SCHEMA.md)**.

### Requirements are pathways, not strings

A `Course` holds one or more `OfferPathway`s. Each has a grade profile, structured
`SubjectRequirement`s, and `OfferConstraint`s for rules a flat list cannot express.

```ts
Course {
  id (= slug--applicationYear), slug, universityId, name,
  subjectCategory, subjectSubcategory, degreeType, durationYears | null, courseCode,
  applicationYear, requirementsPublicationStatus, latestPublishedYear,
  rawRequirementText,              // the university's own wording, verbatim
  offers: OfferPathway[],
  mathematics, physics, chemistry,  // required | recommended | not-required | unknown
  furtherMathematics,               // seven-point scale, see below
  admissionsTest: AdmissionsTestRecord,   // scoped to a single cycle
  interview, contextualOffer, gcseRequirements,
  englishLanguageRequirements, internationalNotes, placementOrStudyAbroad,
  provenance: { verificationStatus, officialUrl, sourceUrl, sourceTitle, lastVerified, sources[] },
  notes
}

OfferPathway { id, label, gradeProfile, gradeProfileGrades, subjectRequirements[],
               constraints[], appliesOnlyIfTaking[], isContextual, rawText, notes }

SubjectRequirement { subject, required, recommended, minimumGrade, acceptedAlternatives[], notes }

OfferConstraint = { kind: 'min-count-at-grade', subjects, grade, count, description }
                | { kind: 'one-of', subjects, minimumGrade, description }
                | { kind: 'manual-review', description }
```

This is what lets the catalogue hold, correctly:

| Published wording | How it is stored |
| --- | --- |
| `AAA including A* Maths and A* Physics` | one pathway, two required subjects with minimums |
| `AAA including Maths and Physics, with an A* in either` | one pathway + a `min-count-at-grade` constraint |
| `A*AA, or AAA if Further Maths is taken` | two pathways, the second `appliesOnlyIfTaking: ['Further Mathematics']` |
| `A*AA including Maths and one of Physics, Chemistry or Biology` | one pathway + a `one-of` constraint |

### Overall grades and subject grades are separate

The brief's example: a student with **Maths A\*, Physics A, Further Maths A\*, Economics A** applying
to a course asking for **AAA including A\* Maths and A\* Physics**.

- Overall grade requirement: **Pass** (counted grades A\*A\*A meet AAA)
- Mathematics: **Pass** (A\* required, A\* entered)
- Physics: **Fail** (A\* required, A entered)
- Final academic match: **Does not currently meet requirements**

The overall check is also *required-subject aware*: for `AAA including Mathematics and Physics`, the
counted three are the required subjects plus the best of what is left — so a B in Physics cannot
hide behind an A in Economics. Both behaviours are pinned by assertions in `engine-check.ts`.

### Further Mathematics

Seven values, because the distinction matters for these subjects. Only `required` can produce a
fail; `strongly-recommended`, `recommended` and `useful` produce an **amber advisory** that never
blocks a match:

> Further Mathematics is strongly recommended by this university. It is not required.

`no-stated-preference` (the university's silence) and `unknown` (ours) are kept apart.

### Application-year awareness

`slug` is stable across cycles; `id` is `slug--applicationYear`. A cycle the university has not
published gets `requirementsPublicationStatus: 'not-yet-published'` and **no offers** — the course
page says so and links to the earlier cycle as a clearly-marked, visually distinct separate record.
Admissions tests carry their own `applicationYear`; a test recorded for another cycle is reported as
*unknown*, never applied.

### Provenance

Every record carries `verificationStatus`, `officialUrl`, `sourceUrl`, `sourceTitle`, `lastVerified`
and optional extra `sources`. The course page shows the source block and a **View official
requirements** button. `verified` without a source URL and a check date is a validation *error*.

Rankings and deadlines carry their own provenance rather than inheriting the university's — a
ranking marked `verified` without a source URL, source title and check date is an error, and a
placeholder position is always badged so it can never read as a published fact.

### Course identity

Records are matched by a stable identity, not by string comparison:

| | Key |
| --- | --- |
| Preferred | `universityId` + normalised UCAS code + `applicationYear` |
| Fallback | `universityId` + canonical course name + `degreeType` + `applicationYear` |

`Physics MPhys`, `MPhys Physics` and `Physics (MPhys)` canonicalise to the same course. `Physics
BSc`, `Theoretical Physics MPhys` and `Physics with a Year Abroad` do not — award and specialism are
part of the identity. Duplicates are classified `exact-duplicate` / `likely-duplicate` / `conflict`
and listed in **Data manager → Duplicates**; nothing is merged automatically.

A `verified` record supersedes a `demo` or `awaiting-data` record with the same identity, including
across formatting differences. An `awaiting-data` shell never supersedes a `demo` record.

### Application deadlines

Structured records scoped by cycle and by audience — `all-courses`, `course-slugs`,
`subject-category` or `other` — so an earlier Oxbridge deadline, a test-registration deadline for two
courses and the standard UCAS date coexist without any of them applying to everything. The
university-wide free-text line is kept as a display fallback only.

## The eligibility engine

`evaluateCourse(course, profile)` returns an `EligibilityReport` broken down part by part:

| Part | Outcomes |
| --- | --- |
| Overall grade requirement | pass / fail / review / unknown |
| Mathematics, Physics, Chemistry | pass / fail / not-required / unknown |
| Further Mathematics | pass / **advisory** / fail / not-required / unknown |
| Other required subjects | pass / fail / not-required |
| Additional conditions | pass / fail / review |
| Admissions test | required / optional / none / not-announced / unknown *(informational only)* |

Rolled up into one of four verdicts: **MEETS PUBLISHED ACADEMIC REQUIREMENTS**, **DOES NOT CURRENTLY
MEET REQUIREMENTS**, **REVIEW REQUIRED**, **INSUFFICIENT INFORMATION**.

Each pathway is evaluated independently; the best-matching one is reported.

## Where to add real data

1. **Data manager → Records** (`/#/admin`) — every record with its provenance. Filter by university,
   entry year, verification status and subject; tick *First data batch only* for the eight priority
   universities.
2. **Editor** — a form for every field that generates the JSON record.
3. **Import / export** — paste a JSON or CSV batch; the vocabulary of every field is validated and
   each problem reported with its row. Export the catalogue in the same shape for a lossless round
   trip.
4. **Duplicates** — exact duplicates, likely duplicates and conflicts across the whole catalogue,
   with the fields that differ, for manual review.
5. **Validation** — every record missing a cycle, a source, a check date, a minimum grade or a
   Further Maths status, plus ranking and deadline provenance failures. Development only; these
   never appear on the public pages.

A record becomes `verified` only with a source URL, a source title, a check date and a cycle.

Once a `verified` record exists for a course and cycle, the matching `demo` placeholder is dropped
from the public catalogue automatically (`supersededDemoIds` in `src/data/index.ts`), and the public
search stops showing sample data by default.

## Bulk import

`data/SCHEMA.md` documents the wire format. The same normaliser handles hand-written seeds, JSON
imports, CSV rows and (later) database rows, so all four produce structurally identical records.

```bash
npm run export:data     # universities.json, courses.json, rankings.json, deadlines.json, tests.json
```

Import checks each batch against itself and against the live catalogue for duplicates and conflicts
before anything is committed.

## Real data status

**Batch 1** (2026-09-01) — six 2027-entry records: Oxford Physics and Engineering
Science, Cambridge Engineering and Natural Sciences, Imperial Physics BSc and
Electrical & Electronic Engineering MEng. Locked.

**Batch 2** (2026-09-01) — twenty-six 2027-entry records: nine Imperial (Physics
MSci and its Year Abroad variant, both Physics with Theoretical Physics awards,
and Mechanical, Aeronautical, Civil, Chemical and Electronic & Information
Engineering) and seventeen UCL (the Physics, Theoretical Physics, Astrophysics,
Mathematics and Physics and Medical Physics family, plus Mechanical, Electronic
& Electrical, Civil and Chemical Engineering at BEng and MEng).

Every verified 2027 record has a 2028 `awaiting-publication` shell carrying
course identity and nothing else — no grades, subjects, tests or deadlines.

**Batch 3** (2026-09-02) — thirty-six 2027-entry records: nine more Imperial
(both EEE and EIE BEng routes, the Materials family, Biomedical Engineering,
Molecular Bioengineering and Design Engineering), four more UCL (Biochemical and
Biomedical Engineering at BEng and MEng) and twenty-three at The University of
Manchester, covering its Physics family and Mechanical, Aerospace, Electrical
and Electronic, Civil, Chemical, Materials and Mechatronic Engineering.

**Production data and test fixtures are now separate.** The production
catalogue contains only `verified`, `awaiting-publication` and `awaiting-data`
records — no invented requirements reach a student. The original sample rows
kept their course identity and became research targets; the four that were the
only cover for a piece of engine or validation behaviour moved to
`src/data/fixtures.ts`, which the assertion suite reads and the app never does.
Rows a clean 2028 shell has replaced are suppressed — see
`obsoletePlaceholderIds` in `src/lib/identity.ts`.

## Not modelled yet

Deliberate omissions, so the edges are known rather than discovered: International Baccalaureate,
Scottish Highers and BTEC matching; contextual-offer *eligibility* (whether one exists is recorded,
whether you qualify is not); and Oxbridge college-level variation, which is recorded as a
manual-review condition rather than modelled per college. The existing note fields can hold text
about all three today.

To move to Supabase / Postgres / Firebase / a REST API, add one implementation of `DataSource` and
change the last line of `src/lib/dataSource.ts`. Nothing in `src/components` or `src/pages` imports
a data file.

## Checks

```bash
npm run typecheck                   # TypeScript, strict, no emit
npm run check                       # 835 assertions: engine, parser, importer, validation, brand, polish
npm run release:verify              # all of the above, then a production build

# Browser QA (needs Playwright: npm i -D playwright && npx playwright install chromium)
npm run build
npm run preview                     # serves the built app on http://127.0.0.1:4321
npm run qa                          # 189 release checks against that preview
```

`npm run qa` is the suite to run. The `smoke.batch*.mjs` scripts are the historical
per-batch walkthroughs; they still work, and they write screenshots to `shots/`.

## Disclaimer

Admissions information can change. Always verify requirements on the university's official website
before applying. This tool is intended for course research and comparison and does not guarantee
eligibility or admission.
