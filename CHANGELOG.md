# Changelog

The student-facing release notes are also shown in the app, on the methodology page
(`src/data/version.ts → RELEASES`). Engineering detail is in `DEVELOPER_NOTES` in the same file.

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
