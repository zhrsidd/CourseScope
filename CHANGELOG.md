# Changelog

The student-facing release notes are also shown in the app, on the methodology page
(`src/data/version.ts → RELEASES`). Engineering detail is in `DEVELOPER_NOTES` in the same file.

## Unreleased

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
