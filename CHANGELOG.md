# Changelog

The student-facing release notes are also shown in the app, on the methodology page
(`src/data/version.ts → RELEASES`). Engineering detail is in `DEVELOPER_NOTES` in the same file.

## CourseScope v2 (in development, not released)

- **Phase 5: product experience, motion and polish.**
  - *Pages:* university detail redesigned (editorial header with a record-status line, subject filter,
    sticky ruled sidebar); shortlist rebuilt as a workspace (sort, select, compare selected, undo);
    Difference Strip hides identical rows behind "Same across all N"; comparison stacks on phones.
  - *Visualisations:* Coverage Matrix stacks into one block per university on phones (no sideways
    scrolling) and states what "verified" does and does not establish; Offer Ladder states that only the
    standard offer is placed and counts courses with other published offers; its table alternative stacks
    on phones and the as-printed list is capped at 10 with "Show all".
  - *Motion:* one CSS vocabulary (arrive / press / respond / open / reveal), all inside
    `prefers-reduced-motion: no-preference`.
  - *Performance:* the catalogue, tuition fees and validation are off the critical path (dynamic import),
    routes are lazy with idle prefetch, fonts are preloaded, layout shift is 0 on every route.
  - *Fixes found by the new tests:* header counts overflowed at 320px; the comparison tray was off-screen
    for reduced-motion users; shortlist links were below the WCAG 2.2 24px target size.
  - *Tests:* `qa:p5` (journeys, keyboard, reduced motion, overflow at 320/390/768), `qa:visual` (21
    screenshot baselines in `visual-baselines/`), `qa:a11y` (axe, WCAG 2.2 AA, new pages at four widths).

- **Phase 3: landing page and routing.** `#/` is now the editorial landing page ("Find the course. Check
  the source."); the course explorer lives at `#/search`. Every number, date and quotation on the landing
  page is computed from the catalogue, and the subject counts use the same filter code as the explorer.
- **Legacy URLs.** `#/?q=…&category=…&subcategory=…&university=…` redirects to `#/search` with the same
  parameters (history entry replaced).
- **Shareable searches.** The explorer writes its selections to the address (`q`, `university`, `category`,
  `subcategory`, `degree`, `duration`, `region`, `test`, `interview`, `maths`, `fm`, `physics`, `chemistry`,
  `maxoffer`, `rank`, `sort`, `awaiting`, `year`). Back and Forward step through filter changes. The A-Level
  profile, the shortlist, the comparison set, the "my verdict" filters and the sample-data switch are never
  put in an address.
- **Invalid link values.** An unrecognised university, subject area, subject, degree, region or other
  recognised filter is never silently dropped into an unfiltered search. A notice names what was not
  recognised (with a suggestion when it is a near-miss), results are withheld when the value would have
  narrowed the search, and "Remove it" restores a normal search. The value is kept in the address until
  removed, so an edited link is not rewritten behind the reader's back.
- **Entry year.** A `year` in a link is shown for that visit only and never saved; the saved year changes only
  when a person presses a year. An address with no year means the saved choice.
- **Phase 4: design refinement and four visualisations.** All HTML and CSS, no charting library, every mark
  also available as text or a table.
  - *Requirement Ledger* (course page): published requirements, your grades and the engine's own result for
    each check, side by side. Without grades it is just the published requirements, with one prompt.
  - *Difference Strip* (compare): where the compared courses differ, marked by weight and a dot and never by
    colour alone. It never scores or picks a best course.
  - *Coverage Matrix* (About the data): one tile per course record by university, subject area and entry
    year, in its verification state. Alphabetical, not ranked; footer totals equal the catalogue.
  - *Offer Ladder* (explorer, opened on request): published standard offers of the listed courses grouped by
    grade combination. Rungs are categories, not scores. Ranges and wording are listed as printed; contextual
    offers are never placed. Each rung opens into its courses, with a table alternative.
  - Course page rebuilt as editorial sections (source strip first); About page now a ruled reading layout
    with a contents list and collapsible release notes; Universities is a plain index (departments and
    repeated badges removed); Browse headings follow the design system and the stale "demo seed" footnote is
    replaced; the explorer's duplicate grades banner is gone (the "Your A-Levels" button carries it).
  - Fixed: the header overflowed by 9px at 320px when courses were being compared.
  - Tests: `engine-check.ts` gains 35 checks on the visualisation logic; new `npm run qa:viz` (43 browser
    checks). No existing test was changed.
- **Stage 3.5: visual refinement.** Homepage hero recomposed on a 7/4 editorial grid (headline left, lede in
  the margin, search and entry year on one row, catalogue figures as a full-width ruled strip); section
  headings share the same grid. Explorer gets an eyebrow, a larger serif title and a serif results heading;
  on phones it shows two example searches (all seven are offered as browser suggestions in the field), puts
  Filters and Sort on one row and compacts the grades invitation. Browse subjects uses ruled rows and now
  counts exactly what its links open (206 / 356, previously 208 / 359). Course page: one summary instead of
  six identical "Unknown" rows when no grades are entered, flatter nested boxes, no wrapped separators.
  No change to data, eligibility, filters or the search engine.
- Unchanged: the dataset, eligibility engine, verification logic, filter logic, comparison and shortlist
  persistence.

## CourseScope v1.1.1 — Hotfix (unreleased)

- **Fixed: "View courses" on the Universities page.** The button linked to `#/search?university=…`,
  which is not a route, so it opened "Page not found". It now links to the existing discovery
  route (`#/?university=…`). Checked for all 22 universities: each opens with that university's
  courses only, and the result count matches the catalogue. No data, eligibility or verification
  logic changed.
- **Known limitation (not changed here).** The discovery page reads the `university`, `category`
  and `subcategory` parameters once, then rewrites the address to `q` only, so the filter is not
  kept in the address bar and is lost on a refresh or after returning from a course page. This is
  existing behaviour; shareable filter URLs are part of the v2 routing work.

## CourseScope v1.1.0 — Tuition fees

*Prepared 1 October 2026 · not tagged until live production verification passes*

- **Tuition fees on course pages.** A compact *Tuition fees* section for each course, after the
  admissions cards, stating that fees are information only and play no part in eligibility.
- **Official sources only.** 1,127 fee rows for 2027 entry across 521 courses at 21 universities,
  each read from the university's own pages, with the entry year, a verbatim year quote, source
  link and verification date. 431 courses have at least one published fee.
- **University categories preserved.** Home / Overseas / International / UK / UK-Ireland, and at
  Scottish universities Scotland, Rest of UK, Republic of Ireland, International/EU — never
  collapsed into two universal categories.
- **Honest states.** *Published*, *Awaiting publication* (an expected figure is labelled as
  expected, never shown as the fee), and *Unknown* (unreadable, undated, or official sources
  disagree — never resolved by picking one). A published fee not re-checked within 12 months is
  shown as out of date.
- **No year leakage.** No university had published 2028-entry fees; 2028 courses say so. 2027
  figures are never carried forward.
- **Compare** gains a Tuition fees row. No fee filters, nothing added to course cards.
- **Schema.** New `TuitionFee` relation (`data/fees.json`), separate from course records — every
  existing record is unchanged and valid. Raw research kept in `data/research/fees-2027/`.
- **Validation and tests.** Fee rules for year leakage, year evidence, missing provenance,
  non-university sources, duplicate categories, Scottish category collapse, and
  university-wide-without-statement. 953 assertions, 212 browser checks.
- **Southampton correction (live release verification).** HH72 (Acoustical Engineering BEng) and
  H722 (MEng) are withdrawn from the 2027 catalogue: Southampton's own course pages now read
  "This course is not open to applicants for 2027 entry," contradicting HH72's existing verified
  2027 offer and H722's identity-only shell. Catalogue counts: 1,132 → **1,129** served applications
  (563 → **562** verified; 569 → **567** for 2027; 563 → **562** for 2028 — HH72's 2028 "not yet
  published" shell is removed with it). All other eligibility verdicts and fee data are unchanged;
  see `src/data/courses.real.batch6.southampton.ts` for the full evidence and reasoning.

## Unreleased (hosting, before v1.1.0)

- Canonical production hosting moved to **Cloudflare Pages** at <https://coursescope.pages.dev/>.
  GitHub Pages remains available as a backup.
- Canonical and social-preview metadata now point to the Cloudflare production URL.
- No admissions data, eligibility logic or student-facing product behaviour changed.

## CourseScope v1.0.0 — Initial Public Release

*28 September 2026*

CourseScope compares UK university Physics and Engineering courses by what the universities
themselves publish.

- **Official-source-backed catalogue.** 1,132 applications across 22 UK universities. Every course's
  identity comes from the university's own pages, and 563 have their 2027 entry requirements read
  and checked against the page they link to.
- **Entry-year-aware requirements.** Requirements are tied to a single entry year. 2027 is shown
  where published; 2028 is marked as not yet published rather than guessed.
- **Starts on 2027 entry**, the cycle students are applying in now; 2028 is one click away, and
  your choice is remembered.
- **Student grade profile.** Add your A-Level subjects and predicted grades once; they stay in your
  browser.
- **Eligibility explanations.** Every course shows whether you meet its published academic
  requirements, with the reasons spelled out.
- **Admissions tests and subject requirements** shown for every checked course, alongside interview policy
  and application route.
- **Comparison** of courses side by side.
- **Shortlist** of courses and universities.
- **Study-option-aware search.** Searching for a specialism such as Astrophysics finds it even when
  it is a pathway inside a broader degree, and names the course you would actually apply to.
- **2027/2028 separation.** No requirement from one cycle is ever shown under another.
- **Source provenance.** Each checked course links to the official page it was read from, with the date it
  was checked and a visible trust status.
- **Report an issue** from three places: a "Found an error? Report it" action in every course's
  source panel, the footer of every page, and the methodology page. The form is sent the course's
  details as URL parameters (`cs_university`, `cs_course`, `cs_award`, `cs_ucas_code`,
  `cs_entry_year`, `cs_record_id`, `cs_issue_type`, `cs_page`).
- **UCL A-Level subject guidance** on every UCL course page: UCL's own list of preferred A-Level
  subjects, read from ucl.ac.uk and kept separate from each course's own requirements.

Six courses are listed without requirements because their universities have not yet published
them for 2027.

**Meeting published entry requirements does not guarantee admission.**

### Under the hood

- New name and mark: CourseScope — an open ring with a focal point. Favicon, header, footer, tab
  titles, metadata, social preview and methodology page all use it.
- Hosted on **GitHub Pages** (<https://zhrsidd.github.io/CourseScope/>), built and deployed by GitHub
  Actions only after the full check suite passes. Course and university links open directly and
  survive a refresh. Canonical and share-card metadata are in the static HTML.
- Production configuration committed in `.env.production`: site URL, feedback form, share image.
- The entry year is saved under its own key (`ukcf.entryYear.v1`), and only when a visitor presses
  a year switch. Earlier builds saved their default year inside the profile on every visit, so a
  browser that had ever opened the site kept opening on 2028; that stored value is now ignored.
- University rankings, and university-wide admissions summaries, are not shown: none has been
  checked against its publisher yet. Application deadlines appear only where read from the
  university's own page. (The placeholder values are kept in the source, unpublished.)
- Presentation fixes: long offer ranges no longer overlap their label on course cards; trust
  badges sit on their own line; the eligibility breakdown stacks on phones; a compact footer.
- 835 assertions (up from 768) including brand, polish, entry-year and "changed nothing" regression checks;
  189 browser checks (up from 109).

## v0.9.0 — Release candidate (2026-09-28)

Queen Mary fully checked (21 courses, three UCAS codes corrected); KCL General Engineering BEng
added; York's four partly-checked courses resolved; every university now has checked data.

## v0.8 — Data closure and launch readiness (2026-09-23)

Course identity recorded separately from requirement checking; York and Lancaster closed;
methodology page and report-an-issue flow added.

## Batches 1–7

The catalogue was built university by university from official sources. See the project reports.
