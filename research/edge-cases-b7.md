# Edge Cases — Batch 7

Research date: 2026-09-17
Scope: three targeted admissions-research tasks (Sheffield H100, Leeds H795, Manchester J501 Materials set).

## EVIDENCE STANDARD APPLIED
- Official university domains only (`sheffield.ac.uk`, `leeds.ac.uk`, `manchester.ac.uk`).
- Search-engine snippets, third-party admissions sites, UCAS listings, mirrors, caches and archives are NOT treated as evidence anywhere in this file.
- IDENTITY (the programme exists, with this code) is reported separately from CYCLE VERIFICATION (these are its 2027-entry requirements).
- No admissions test mentioned on a page read in full => **NOT PUBLISHED** (never "no test required").
- A page read in full that is silent on Further Mathematics => **no stated preference** (not "unknown").
- Ranges are reported as ranges, never flattened.

---

# TASK 1 — Sheffield: General Engineering MEng (Hons), UCAS H100

## RETRIEVAL BREAKTHROUGH — route that worked
Ten prior WebFetch attempts were truncated by page length before the "Entry requirements"
heading (module lists for the MEng specialism streams sit in between). This batch did NOT
repeat any of the exhausted routes.

- `curl` via Bash: **blocked**. The agent egress proxy denied CONNECT to
  `www.sheffield.ac.uk:443` (`connect_rejected`, organization policy). Raw-HTTP retrieval is
  not available in this environment, so grep-over-raw-HTML was not possible.
- `mcp__claude-in-chrome__list_connected_browsers`: returned `[]` — no Chrome extension
  browser is connected to this account.
- **Built-in browser pane (`Claude_Browser`): SUCCEEDED.** Navigating the pane to the plain
  official URL and extracting rendered text returned the whole document body in one pass,
  including the complete "Entry requirements" block. The browser renders and returns the DOM
  text rather than spending a small-model extraction budget, so page length is no longer the
  constraint. This confirms the prior diagnosis: the failure was extraction-window
  truncation, not caching and not access control.

## CYCLE VERIFICATION — CONFIRMED (2027-28 entry)
The rendered page's own cycle switcher reads, verbatim, at the top of the article:

> "2027-28 entry View 2026-27 entry"

The page is therefore the 2027-28 entry record, and it offers a link *away* to 2026-27.
Everything in the Entry requirements section below is on this 2027-28 page.

## IDENTITY — CONFIRMED
- Title: **General Engineering MEng (Hons)**
- Owning school: **School of Electrical and Electronic Engineering**
- UCAS code: **H100**
- Duration: **4 years**
- Start date: September; Attendance: Full-time
- Key facts A Level value: **A*AA**
- Accredited: yes (page states accreditation varies by stream — see below)
- Optional placement year and study abroad option both offered

## THE MISSING FIELDS — now resolved field by field

### 1. Subject wording for the A*AA offer — FOUND
Standard offer tab, verbatim:

> "The A Level entry requirements for this course are:
> A*AA
> including Maths and Physics"

So the subject wording is **"including Maths and Physics"**. The A*AA is not subject-free.

### 2. Cross-subject rules — FOUND (as printed)
Sheffield does not publish a separate prose "cross-subject" paragraph on this record. What it
publishes is a per-qualification table in which the Maths/Physics condition is restated for
each route, and for the non-A-level routes the condition is carried by a *required added
A-level Maths*. Verbatim rows:

- A Levels + a fourth Level 3 qualification: "AAA, including Maths and Physics + A in a
  relevant EPQ; AAA, including Maths and Physics + A in AS or B in A Level Further Maths"
- International Baccalaureate: "38, with 6 in Higher Level Maths and Physics; 36, with 6 in
  Higher Level Maths and Physics, and A in a science-based extended essay"
- BTEC Extended Diploma: "D*DD in Engineering or Applied Science (including Biomedical
  Science, Analytical & Forensic Science and Physical Science streams) + A in A Level Maths"
- BTEC Diploma: "D*D in Engineering or Applied Science + A in A Level Maths"
- Scottish Highers + Advanced Higher/s: "AAAAB + AA in Maths and Physics"
- Welsh Baccalaureate + 2 A Levels: "A + A*A in Maths and Physics"
- Access to HE Diploma: "Award of the Access to HE Diploma in a relevant subject, with 45
  credits at Level 3, including 42 at Distinction (to include Maths and Physics or another
  relevant science) and 3 at Merit + A in A Level Maths"

Note the ranges/alternatives are preserved above and must NOT be flattened: the
fourth-qualification row and the IB row each carry **two** distinct accepted combinations
separated by a semicolon, and the Access to HE row permits "Maths and Physics **or another
relevant science**".

### 3. Further Mathematics position — FOUND, and it is a specific published position
Further Maths appears exactly once on the page, inside the fourth-qualification row:

> "AAA, including Maths and Physics + A in AS or B in A Level Further Maths"

Position: Further Maths is **an accepted fourth Level 3 qualification that unlocks a reduced
main offer** (AAA instead of A*AA), at **A in AS-level Further Maths OR B in A-level Further
Maths**. It is *not* required, and it is *not* framed as a preference for the standard A*AA
offer. It is interchangeable with "A in a relevant EPQ" in that same row.

### 4. Maths / Physics / Chemistry individually — FOUND
- **Maths: required.** Named in the standard offer ("including Maths and Physics") and
  required as an added A-level at grade A in every BTEC and Access route.
- **Physics: required.** Named in the standard offer alongside Maths, and in the IB, Scottish
  and Welsh rows. The Access to HE row is the one place it can be substituted ("Maths and
  Physics or another relevant science").
- **Chemistry: no stated requirement and no stated preference.** The page was read in full
  and Chemistry is not mentioned anywhere in the Entry requirements section (nor elsewhere on
  the record). Per the evidence rules this is "no stated preference", not "unknown".

### 5. Access Sheffield contextual offer cell — see follow-up below
The Entry requirements section carries the contextual-offer signpost verbatim:

> "With Access Sheffield, you could qualify for additional consideration or a contextual
> offer - find out if you're eligible."

and presents two tab controls, labelled verbatim **"Standard offer"** and
**"Access Sheffield offer"**. The initial render returns the *Standard offer* panel only.
The Access Sheffield panel's grade value is retrieved separately (next section).

### 6. Fourth-qualification row — FOUND (full verbatim)
Row label: "A Levels + a fourth Level 3 qualification"
Row value: "AAA, including Maths and Physics + A in a relevant EPQ; AAA, including Maths and
Physics + A in AS or B in A Level Further Maths"

i.e. **two** accepted routes, both dropping the main offer from A*AA to AAA while keeping
Maths and Physics.

### 7. GCSE rule — FOUND, and it is narrow
The only GCSE requirement published on this record sits under English language requirements,
verbatim:

> "You must demonstrate that your English is good enough for you to successfully complete
> your course. For this course we require: GCSE English Language at grade 4/C; IELTS grade
> of 6.5 with a minimum of 6.0 in each component; or an alternative acceptable English
> language qualification"

So: **GCSE English Language grade 4/C** (as one of several ways to satisfy the English
language requirement). **No GCSE Mathematics rule is published** on this record — the page
was read in full and states none. Not to be supplied from any other Sheffield course.

### 8. Admissions test — NOT PUBLISHED
The page was read in full. No admissions test of any kind is named anywhere on the record.
Per the evidence rules this is recorded as **NOT PUBLISHED**, not as "no test required".

### 9. Interview — NOT PUBLISHED
The page was read in full. No interview, selection day, or offer-holder-assessment
requirement is named. Recorded as **NOT PUBLISHED**, not "no interview".

## Additional 2027-28 facts captured incidentally (same page, same cycle)
- Accreditation is stream-dependent, verbatim: "We offer a range of fully accredited courses
  covering the broad range of interdisciplinary engineering. Depending on what stream you
  take, you'll be accredited by different organisations." No single named PEI on this record.
- Specialism structure, verbatim: "At the beginning of your degree, you'll study modules
  across all disciplines, after which you'll choose one of six possible specialisms - or
  continue studying a variety of subjects." The module tabs name the six third/fourth-year
  streams: Biomedical; Civil & Structural; Electrical & Software; Energy & Sustainability;
  Mechanical & Aerospace; General.
- Modules carry a revision caveat, verbatim: "We're revising the curriculum of the course for
  this year of entry. Your first year modules are confirmed. For other years of study, the
  information here gives you an idea of the areas we expect the course to cover, although
  there may be changes before you begin."
- Placement converts to "a five-year Degree with Placement Year"; year abroad "usually
  between the second and third year".
- Mature-student and international-pathway routes are signposted ("Routes for mature
  students"; International Foundation Year in Science and Engineering at the University of
  Sheffield International College).

## 5b. ACCESS SHEFFIELD CONTEXTUAL OFFER CELL — FOUND IN FULL
The contextual panel (`#js-course-ereq-panel--access_sheffield`, label "Access Sheffield
offer") is present in the 2027-28 document but hidden behind the tab control. Retrieved in
full from the rendered DOM. Verbatim content:

> "Access Sheffield offer
> The A Level entry requirements for this course are: **AAA** including Maths and Physics
> A Levels + a fourth Level 3 qualification — AAA, including Maths and Physics + A in a
> relevant EPQ; AAA, including Maths and Physics + A in AS or B in A Level Further Maths
> International Baccalaureate — 36, with 6 in Higher Level Maths and Physics
> BTEC Extended Diploma — DDD in Engineering or Applied Science (including Biomedical
> Science, Analytical & Forensic Science and Physical Science streams) + A in A Level Maths
> BTEC Diploma — DD in Engineering or Applied Science + A in A Level Maths
> Scottish Highers + Advanced Higher/s — AAABB + AA in Maths and Physics
> Welsh Baccalaureate + 2 A Levels — A + AA in Maths and Physics
> Access to HE Diploma — Award of the Access to HE Diploma in a relevant subject, with 45
> credits at Level 3, including 39 at Distinction (to include Maths and Physics or another
> relevant science) and 6 at Merit + A in A Level Maths"

### Standard vs Access Sheffield, side by side (2027-28, same page)
| Route | Standard offer | Access Sheffield offer |
|---|---|---|
| A Level | A*AA incl. Maths and Physics | **AAA** incl. Maths and Physics |
| A Level + fourth L3 qual | AAA + A in relevant EPQ; **or** AAA + A in AS / B in A Level Further Maths | AAA + A in relevant EPQ; **or** AAA + A in AS / B in A Level Further Maths (identical — no further reduction) |
| IB | 38 with 6 in HL Maths and Physics; **or** 36 with 6 in HL Maths and Physics + A in a science-based extended essay | 36 with 6 in HL Maths and Physics (single option only) |
| BTEC Extended Diploma | D*DD + A in A Level Maths | DDD + A in A Level Maths |
| BTEC Diploma | D*D + A in A Level Maths | DD + A in A Level Maths |
| Scottish Highers + AH | AAAAB + AA in Maths and Physics | AAABB + AA in Maths and Physics |
| Welsh Bacc + 2 A Levels | A + A*A in Maths and Physics | A + AA in Maths and Physics |
| Access to HE Diploma | 45 L3 credits, 42 Distinction / 3 Merit + A in A Level Maths | 45 L3 credits, **39 Distinction / 6 Merit** + A in A Level Maths |

Note the fourth-qualification row is the one row where the contextual offer is **not** lower
than the standard one — both read AAA. This is Sheffield's own published text, not an error to
reconcile.

## NEGATIVE CONFIRMATION — whole-DOM string audit
To make the silence findings safe rather than assumed, the full rendered DOM (visible text
*and* hidden tab panels, `innerText` + `textContent`) was string-searched. Results:

- `admissions test`, `entrance test`, `written test`, `aptitude`, `selection day`, `TMUA`,
  `STEP`, `PAT`, `ESAT`, `Maths Admissions`: **NOT FOUND ANYWHERE IN DOM**
  → admissions test **NOT PUBLISHED**.
- `interview`: found twice, both in the Placements section about careers skills — verbatim
  "gain experience of applying for jobs and interview practice". No admissions interview.
  → interview **NOT PUBLISHED**.
- `portfolio`: found only inside a professional-development module description ("evidence
  them in your portfolio"). No admissions portfolio.
- `Chemistry` / `chemistry` / `Biology`: **NOT FOUND ANYWHERE IN DOM**
  → Chemistry: **no stated requirement and no stated preference**. Biology likewise.
- `GCSE`: found only in the English language requirement ("GCSE English Language at grade
  4/C"). → **no GCSE Maths rule published** on this record.
- `Further Math`: three hits, all the same fourth-qualification clause (standard panel,
  standard panel duplicate, contextual panel). Position as stated in §3.
- Cycle labels present in DOM: "2027-28 entry", "View 2026-27 entry", and the fees caveat
  "Tuition fees for 2027-28 entry have not been confirmed. Please use 2026-27 information as
  a guide."
- `<link rel="canonical">` = `https://sheffield.ac.uk/undergraduate/courses/2027/general-engineering-meng-hons`

## TASK 1 VERDICT
**IDENTITY: confirmed. CYCLE VERIFICATION: confirmed (2027-28 entry).**
All eight outstanding fields are now supported by the official rendered page for the correct
cycle: subject wording, cross-subject rules, Further Maths position, Maths/Physics/Chemistry
individually, the Access Sheffield cell, the fourth-qualification row, the GCSE rule, and
admissions test + interview (both NOT PUBLISHED, established by full-DOM audit rather than
by absence from a truncated fetch).

**Recommendation: upgrade H100 from `partially-verified` to `verified`.**
Nothing above was taken from the General Engineering BEng or from any other Sheffield course.

---

# TASK 2 — Leeds: Product Design BSc, UCAS H795

Source: `https://courses.leeds.ac.uk/a602/product-design-bsc` (built-in browser, rendered DOM,
read 2026-09-17). `<link rel="canonical">` = `https://courses.leeds.ac.uk/a602/product-design-bsc`.

## THE FOUR "CONFLICTING LABELS" — RESOLVED, AND IT IS NOT A CONFLICT

Batch 6 recorded four simultaneous official labels and concluded Leeds was self-contradictory.
Reading the rendered DOM rather than the flattened text shows what the markup actually is.
The header block is, verbatim:

```html
<div class="uol-year-of-entry">
  <h2 class="uol-year-of-entry__title">Year of entry <span class="uol-year-of-entry__date">2027</span></h2>
  <a href="https://courses.leeds.ac.uk/202627/a602/product-design-bsc"
     class="uol-year-of-entry__link uol-arrow-link">
    <span role="text">2026 course information<svg …arrow icon…></span>
  </a>
</div>
```

Label-by-label, as Leeds publishes it today:

| # | Label, verbatim | What it actually is | Cycle it asserts |
|---|---|---|---|
| 1 | "Year of entry **2027**" | `<h2 class="uol-year-of-entry__title">` — the page's own cycle heading | **2027** |
| 2 | "2026 course information" | the `<a>` immediately below it, an arrow link to `courses.leeds.ac.uk/**202627**/a602/product-design-bsc` | points **away** to 2026-27 |
| 3 | "Start date **September 2027**" | key-facts `<dl>` row | **2027** |
| 4 | "University of Leeds Admissions Policy **2027**" | footer link, `…/study/doc/university-leeds-admissions-policy` | **2027** |

**Finding: label 2 is a cycle switcher, not an assertion about this page.** It is the exact
structural analogue of Sheffield's "View 2026-27 entry" link. Batch 6 read a navigation link
as a banner. There is no residual 2026 claim about this page's content.

**Has the page rolled over to a 2027 course-information label?** Yes. The "Year of entry"
value now reads **2027**, not 2026 as Batch 6 recorded. Whether that is a genuine rollover
since Batch 6 or a Batch 6 misreading cannot be determined from the live page alone — archives
and caches are outside the evidence rules — but **today the page's own cycle heading is 2027**,
and three further 2027 labels agree with it.

Corroborating 2027 labels found in the same document:
- Fees, verbatim: "Tuition fees for UK undergraduate students starting in **2027/28** are £10,050."
- Fees, verbatim: "From **2028/29** onwards, tuition fees are likely to increase annually…"

The only other "2026" strings anywhere in the document are:
- a site-wide marketing banner, verbatim: "Undergraduate Open Days 2026 — Discover what Leeds
  has to offer and see how one day could change your life." (`uol-global-banner`, not course data)
- two ranking citations ("The Graduate Market 2026, High Fliers Research"; "QS World
  University Rankings by Subject 2026")
- the module-catalogue deep link (see the one genuine inconsistency below)

### One genuine first-party inconsistency that DOES remain — flagged, not reconciled
The course-structure section links out, verbatim: "For more information and a full list of
typical modules available on this course, please read **BA Product Design** in the course
catalogue." The href is
`https://catalogue.leeds.ac.uk/Programme/202627?code=BS-MECH%2FPD`.

Two problems, both Leeds': the link calls the programme **BA** Product Design where the course
record and page title say **BSc**, and it resolves into the **202627** catalogue from a 2027
entry page. Per the instruction, this is reported and **not corrected**. The module list on
this page is therefore the only module information whose cycle is 2027-labelled; the catalogue
target is 2026-27 and is quarantined below.

## CYCLE VERIFICATION — CONFIRMED (2027 entry)
The page self-labels "Year of entry 2027" with "Start date September 2027", 2027/28 fees and
the 2027 Admissions Policy. All admissions figures below sit under those 2027 labels.

## IDENTITY — CONFIRMED (key-facts `<dl>`, verbatim)
- UCAS code: **H795**
- Title: **Product Design BSc**
- Start date: September 2027
- Delivery type: On campus
- Duration: **3 Years (Full time)**
- Work placements: Optional
- Study abroad: Optional
- Typical A-level offer: **AAB (specific subject requirements)**
- Typical Access to Leeds offer: **BBB**
- Accredited: Yes
- Contact: ugmech@leeds.ac.uk
- Owning school (from Contact us): **School of Mechanical Engineering Undergraduate Admissions**
- Internal course slug: `a602`

Accreditation, verbatim: "This course is accredited by the Institution of Engineering
Designers (IED) as fully meeting the academic requirement for registration as a Registered
Product Designer (RProdDes). It also fully meets the academic requirement for registration as
an Incorporated Engineer (IEng), and partially meets the academic requirement for registration
as a Chartered Engineer (CEng)."

## WHICH IDENTITY IS AUTHORITATIVE FOR UCAS / COURSE-FINDER — RESOLVED
Checked Leeds' own course search (`courses.leeds.ac.uk/course-search`, keyword "product design").

The search carries a `role="radiogroup"` labelled **"Year of entry"** with exactly two options.
Verbatim markup:

```html
<span id="academicYear" class="uol-form__custom__legend">Year of entry</span>
<input type="radio" id="id-1" name="course-academic-year" value="202728" checked>
  <label for="id-1">Academic year 2027</label>
<input type="radio" id="id-2" name="course-academic-year" value="…f.Academic+year|term=202627…">
  <label for="id-2">Academic year 2026</label>
```

**The search is scoped to "Academic year 2027" by default** — `value="202728"`, `checked`.
Every filter permalink on the page carries `f.Academic+year%7Cterm=202728`, and the H795
result's own redirect URL embeds `query=product+design+%7Cterm%3A%22%24%2B%2B+202728+%24%2B%2B%22`
(i.e. the `202728` term). 151 results are returned under that 2027 scope.

What the 2027-scoped search shows for this programme, verbatim from the result card:

> "Product Design BSc
> Duration 3 Years (Full time)
> Typical A-level offer AAB
> UCAS code H795"

and its result link resolves to **`https://courses.leeds.ac.uk/a602/product-design-bsc`** —
the same bare, unprefixed URL as the course page under audit.

**Conclusion: the bare `/a602/product-design-bsc` URL *is* Leeds' 2027 record.** The 2026
record lives at the year-prefixed `/202627/a602/product-design-bsc`. The authoritative
course-finder identity is therefore **Product Design BSc, UCAS H795, 3 years full time,
typical A-level offer AAB, Academic year 2027**. Nothing conflicts.

Sibling captured in the same 2027-scoped search (distinct application, already in catalogue
scope as a related course): **Product Design (Industrial) BSc, UCAS H797, 4 Years (Full time),
typical A-level offer AAB.**

Note on Batch 6's cache-busting problem: no query-string cache-buster was needed this time.
The built-in browser returns the live rendered DOM from the plain route, so Batch 6's
"HTTP 403 to query strings on that route" is bypassed rather than worked around. No `?v=`
or `?cb=` parameter was sent to Leeds in this batch.

## ADMISSIONS DATA AS PRINTED — all under Leeds' 2027 labels
Every item below is from the Entry requirements section of the page whose own heading reads
"Year of entry 2027" / "Start date September 2027", and whose footer links the "University of
Leeds Admissions Policy 2027". Cycle label per item is therefore **2027** throughout; there is
no 2026-labelled admissions content on this page.

### A-level offer — verbatim
> "A-level: AAB"

Key-facts restatement: "Typical A-level offer — AAB (specific subject requirements)".

### Subject requirements — verbatim
> "An Art and Design related A-level such as Design, Design Technology or Art and Design is
> desirable but not essential. An interest in art and design is essential."

> "Where an A-level Science subject is taken, we require a pass in the practical science
> element, alongside the achievement of the A-level at the stated grade."

Note the distinction Leeds draws and which must not be flattened: the *subject* is "desirable
but not essential", while the *interest* in art and design is "essential".

**Further Mathematics: no stated preference.** The page was read in full (whole-DOM string
search) and Further Mathematics is not mentioned anywhere. Per the evidence rules this is "no
stated preference", not "unknown".

### Portfolio wording — RE-CONFIRMED VERBATIM
> "Whilst a portfolio is not required as part of the decision/offer making process, successful
> offer holders will be invited to attend an optional in-person offer holder event, which will
> include an interactive portfolio review session with department academics. This is a good
> opportunity to get feedback from department academics."

> "If you choose to attend, please bring with you include two to three projects which
> demonstrate design abilities. These can include extra-curricular design projects or samples
> of work which demonstrate skills associated with design, for example: art- work,
> photography, CAD, engineering or technical projects. Please note that digital portfolios
> cannot be reviewed on the offer holder events."

(Leeds' own typos preserved: "please bring with you include", "art- work".)

So: **portfolio is NOT part of the selection decision.** It is a post-offer, optional,
in-person, feedback-only review. Digital portfolios explicitly cannot be reviewed.
Any catalogue field implying a selective portfolio for H795 would be wrong.

### EPQ route — verbatim
> "Extended Project Qualification, International Project Qualification: We recognise the value
> of these qualifications and the effort and enthusiasm that applicants put into them, and
> where an applicant offers the EPQ, IPQ or ASCC we may make an offer of ABB at A-level, plus
> grade A in EPQ/IPQ/Welsh Bacc ASCC."

Note "**may** make an offer" — discretionary, not guaranteed. Reduction is AAB → **ABB + A in
EPQ/IPQ/ASCC**.

### GCSE rule — verbatim (printed twice on the page, identically)
> "GCSE: A minimum of English Language grade 4 (C), Mathematics grade 6 (B) and Combined
> Science 6-6 (B-B) or equivalent. We will accept Level 2 Functional Skills English instead of
> GCSE English."

### Access to Leeds contextual offer — verbatim
> "Typical Access to Leeds offer: BBB plus a pass in the Access to Leeds scheme, and minimum
> grades of 5 and 6 (B) in Mathematics and Science (in any order) at GCSE."

Scheme description, verbatim: "Access to Leeds is a contextual admissions scheme which accepts
applications from individuals who might be from low income households, in the first generation
of their immediate family to apply to higher education, or have had their studies disrupted."
Plus: "If you live in a neighbourhood where there is low participation in higher education, we
may be able to give priority to your application."

Note the contextual GCSE rule **differs** from the standard one: standard is English 4,
Maths 6, Combined Science 6-6; Access to Leeds is "grades of 5 and 6 (B) in Mathematics and
Science (in any order)" — i.e. 5 and 6 distributed across Maths and Science either way round.
Do not flatten to "6 in both".

### Alternative qualifications — verbatim
- Access to HE Diploma: "Pass 60 credits overall with 45 credits at Level 3, 30 credits with
  Distinction and the remaining 15 credits with Merit or above, preferably including an Art and
  Design-related subject."
- BTEC: "DDD in Product Design, Engineering or an Art and Design-related subject."
- Cambridge Pre-U: "D3, D3, M2 preferably including an Art and Design-related subject
  (desirable but not essential)."
- International Baccalaureate: "17 points at higher level preferably including an Art and
  Design-related subject (desirable but not essential)."
- Irish Leaving Certificate (Higher Level): "H2 H2 H2 H2 H2 H2 preferably including an Art and
  Design-related subject (desirable but not essential)."
- Scottish Highers / Advanced Highers: "AA at Advanced Higher level preferably including an Art
  and Design-related subject (preferable but not essential), and BBBBB at Higher Level."
- **T-Levels: "We do not accept T Levels as entry onto this course. You might be considered for
  entry to one of our foundation year courses."** (explicit exclusion)
- Welsh Baccalaureate: "Welsh Baccalaureate Advanced Skills Challenge Certificate: We will
  accept the Advanced Skills Challenge Certificate in lieu of a third A-Level at the same
  grade, assuming any subject specific requirements are met using alternative qualifications."

### Mature applicants — verbatim (the only place a "test" appears)
> "If you are a mature applicant and you don't have the required A Levels or GCSE English and
> Math qualifications, you can complete our Alternative Entry Scheme (subject to meeting the
> eligibility criteria for the scheme). As part of this, you may be asked to take tests in
> English and maths and to write an essay."

This is a **mature-applicant alternative entry scheme**, not a general admissions test.

### English language — verbatim
> "IELTS 6.0 overall, with no less than 5.5 in each section."

### Admissions test — NOT PUBLISHED
No admissions test is published for standard entry. The only testing mentioned anywhere is the
mature-applicant Alternative Entry Scheme quoted above. Recorded as **NOT PUBLISHED** for
standard entry, not "no test required".

### Interview — NOT PUBLISHED
No admissions interview is published. The page's "interview" mentions are careers-service mock
interviews and placement-application interviews, neither of which is admissions.

### 2027/28 fees (same page, 2027 label)
- UK: **£10,050** — "Tuition fees for UK undergraduate students starting in 2027/28 are £10,050."
- International: **£33,700 (per year)** — "will remain the same for the duration of your course".

## TASK 2 VERDICT
**IDENTITY: confirmed (Product Design BSc, H795). CYCLE VERIFICATION: confirmed (2027 entry).**

The Batch 6 finding of four conflicting labels **does not reproduce**. Three labels say 2027
and the fourth ("2026 course information") is a hyperlink to the 2026-27 archive page, not a
claim about this page. Leeds' own 2027-scoped course search returns H795 / Product Design BSc /
3 years / AAB and links to this exact bare URL. The instruction "if the official labels still
conflict, say so and stop" does not bite, because they no longer conflict.

One real first-party inconsistency is flagged but **not reconciled**: the module-catalogue deep
link is titled "BA Product Design" and targets the 202627 catalogue from a 2027 page.

**Recommendation: H795 can be treated as cycle-verified for 2027 entry.** The portfolio field
in particular should record "not required for the decision; optional post-offer review only".

---

# TASK 3 — Manchester: re-audit of the J501 Materials pathway set

## 3.1 — J501, MEng Materials Science and Engineering (2027 entry)
Source: `https://www.manchester.ac.uk/study/undergraduate/courses/2027/09895/meng-materials-science-and-engineering/`
Canonical confirms that same URL. Page title: "MEng Materials Science and Engineering
(2027 entry) | The University of Manchester".

**CYCLE VERIFICATION: CONFIRMED (2027 entry).** Page states "Year of entry: 2027" and the
title carries "(2027 entry)". Fees caveat, verbatim: "Fees for entry in 2027 have not yet been
set. For entry in 2026 the tuition fees were £9,790 per annum for home students, and are
expected to increase slightly for 2027 entry." (2026 figure quarantined below.)

**IDENTITY: CONFIRMED.** Verbatim: "UCAS course code: J501 / Institution code: M20".
Duration, verbatim: "**4 years (or 5 years including a year in industry)**".
Department of Materials; School of Natural Sciences. Contact ug-materials@manchester.ac.uk,
+44 (0)161 529 3043.

Accreditation, verbatim: "The course is accredited by the Institute of Materials, Minerals and
Mining (IOM3) as fully meeting the academic requirements for Chartered Engineer
(CEng)/Chartered Scientist (CSci) status."

### THE COMPLETE J501 PATHWAY LIST — CONFIRMED AS EXACTLY FIVE
The list is stated **four separate times** on this page, identically each time. No sixth
pathway appears anywhere in the document (checked against full `textContent`, including hidden
nodes). "Corrosion" is **NOT FOUND** anywhere on the J501 page.

The five, verbatim (longest form):
> "Materials Science and Engineering with Biomaterials
> Materials Science and Engineering with Metallurgy
> Materials Science and Engineering with Nanomaterials
> Materials Science and Engineering with Polymers
> Materials Science and Engineering with Textiles Technology"

### HOW AND WHEN A PATHWAY IS CHOSEN — Manchester's own wording, all four instances
1. Overview key feature, verbatim:
   > "Breadth of academic expertise meaning that **during your studies you can transfer onto
   > one of our specialist pathways** and graduate with an MEng in Materials Science and
   > Engineering with Biomaterials, Metallurgy, Nanomaterials, Polymers, or Textiles Technology."
2. Course description, verbatim:
   > "If, **after your first two years**, you discover that a particular area of materials
   > science that excites you most, you can transfer onto one of our specialist pathways and
   > graduate with an MEng degree in: …"
3. "Specialisation" section, verbatim:
   > "Due to the breadth of our expertise in materials science here, we offer the exciting
   > opportunity to shape your degree around the areas of materials science that interest you
   > most, through optional course units and the topic of your final year research project.
   > If you choose to specialise in a specific area, you can **transfer onto one of our
   > specialist MEng pathways after your second year** and graduate with an MEng in Materials
   > Science and Engineering with: Biomaterials Metallurgy Nanomaterials Polymers or Textiles
   > Technology."
4. Course content for year 3, verbatim:
   > "In year three, alongside core units, you will have the opportunity to specialise through
   > a choice of optional units. If you choose to specialise in a specific area, you can
   > **transfer onto one of our specialist MEng pathways in your third year** and graduate with
   > an MEng in Materials Science and Engineering with: Biomaterials Metallurgy Nanomaterials
   > Polymers Or Textiles Technology."

**Classification: all five are LATER-YEAR SPECIALISMS chosen after admission, by internal
transfer.** Timing: "after your second year" / "in your third year" (the two wordings describe
the same boundary — end of year 2 / start of year 3). There is no separate UCAS code for any of
them, and no instruction anywhere to apply to anything other than J501. **None is a separate
application.** The five change the *award title* ("graduate with an MEng in … with X") but are
entered by transfer, not by application.

### 2027 admissions data for J501 (the only application in the MEng family)
Key-facts panel, verbatim:
- "Typical A-level offer: AAA including specific subjects"
- "Typical contextual A-level offer: AAB including specific subjects"
- "UK refugee/care-experienced offer: ABB including specific subjects"
- "Typical International Baccalaureate offer: 36 points overall with 6,6,6 at HL, including
  specific requirements"

Full entry requirements, verbatim:
- **A-level:** "AAA including two from Mathematics, Physics and Chemistry. If you are not
  taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required. Practical skills
  are a crucial part of science education and therefore there will be a requirement to pass the
  practical element of any science A-level taken. … Applicants taking A-levels are normally
  expected to offer three full A-levels. If you're taking more than three A-levels, any offer
  will be based on three A-levels, and any additional A-levels won't be included in your offer.
  Any offer will normally be based on three A-levels taken in the same sitting and based on
  your qualification portfolio. Your offer will stipulate which subjects and the grades required."
- **A-level contextual offer:** "AAB including two from Mathematics, Physics and Chemistry. If
  you are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required. …"
- **UK refugee/care-experienced offer:** "ABB including 2 from Mathematics, Physics and
  Chemistry. If you are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is
  required. …"
- **Contextual eligibility**, verbatim: "Contextual offers are available for applicants who:
  live in the UK and will be under the age of 21 on 1 September of the year they will start
  their course; and live in an area of disadvantage or with low progression into higher
  education; and have attended a UK school or college for their GCSEs or A-levels (or
  equivalent qualifications) that has performed below the national average over multiple years."
- **Required subjects:** "two from Mathematics, Physics and Chemistry" — a **choose-two-of-three**
  rule. Not "Maths and Physics". Must not be flattened: Maths is *not* individually compulsory,
  but if Maths is not taken at A-level then **GCSE/IGCSE Mathematics Grade 7/A** is required.
- **International Baccalaureate:** "36 points overall with 6,6,6 at Higher Level, including 2
  from Mathematics, Physics and Chemistry. **We will only accept Higher Level Mathematics:
  analysis and approaches.** Applicants studying the International Baccalaureate Career Related
  Programme (IBCP) should contact the admissions team prior to applying…"
- **GCSE rule**, verbatim: "Applicants must demonstrate a broad general education including
  acceptable levels of literacy and numeracy, equivalent to at least Grade C/4 in GCSE/IGCSE"
  — plus the conditional Grade 7/A GCSE Maths rule above where A-level Maths is not offered.
- **Scottish:** "We normally require grades AAABB in Scottish Highers. In addition Scottish
  Advanced Highers are normally required as below: Two Advanced Highers in two subjects from
  Mathematics, Physics and Chemistry at AA plus two Highers at AA (any subjects). English
  Language and Mathematics not taken at Higher/Advanced Higher must have been achieved at SCQF
  level 5 (minimum National 5 grade C)."
- **T Level:** "…as entry onto this course. The University does accept specific T Level
  qualifications on a number of courses please review to our T Level information page for a
  full list." (Course-level acceptance is not affirmed here; recorded as not established.)
- **EPQ**, verbatim: "The University recognises the benefits of the Extended Project
  Qualification (EPQ)… **Although the Extended Project will not be included in the conditions
  of your offer**, we strongly encourage you to provide information about the EPQ in your
  personal statement and at interview. We may also choose to take your performance in the EPQ
  into account should places be available in August for applicants who narrowly miss the entry
  grades for their chosen course." → EPQ is **not** a grade-reduction route at Manchester,
  unlike Sheffield's and Leeds'. Do not import an EPQ reduction here.
- **Further Mathematics: no stated preference.** Neither "Further Mathematics" nor "Further
  Maths" appears anywhere in the page's full `textContent`. Page read in full; recorded as
  no stated preference, not "unknown".

### Admissions test — NOT PUBLISHED
Full-DOM string search: `admissions test`, `admission test`, `aptitude test`, `entrance test`,
`written test`, `ESAT`, `TMUA`, `STEP`, `PAT` — **all NOT FOUND**. Recorded as NOT PUBLISHED.

### Interview — PUBLISHED, and it is near-universal for UK applicants
This is the one item in the whole batch where an interview *is* published. Verbatim:

> "How your application is considered — Applications are considered on the basis of the UCAS
> form. **Candidates may be interviewed (usually online). Strong examination results and
> interview performance are the main factor in admitting students to our courses.**"

> "All applicants should be aware that information provided in the personal statement may be
> used as the basis for further discussion during your interview with an academic member of staff."

> "**Interview requirements** — All students who apply to us through UCAS, and who live on the
> UK mainland and meet our application criteria, are currently invited to a Virtual Visit event
> which will include an interview as part of the application process. These are held from
> November through to March and will consist of a presentation by the Admissions Tutor and a
> Q&A session with current staff and students. **The interview will be informal and no specific
> preparation needs to be done for it.** Parents / guardians are encouraged to attend the
> Virtual Visit Day. There will also be opportunities for offer holders to visit on campus."

Note the tension in Manchester's own text, reported not reconciled: the interview is described
both as a main selection factor ("interview performance are the main factor") and as informal
needing no preparation. Both are quoted above.

### Other 2027 facts
- **ATAS**, verbatim: "You may be required to obtain ATAS clearance for this course."
- Industrial placement, verbatim: "For those who wish to spend a full year on an industrial
  placement, students can extend their degree by one year and will graduate from the course
  with a degree titled 'MEng Materials Science and Engineering with a Year in Industry'." Also:
  "Students can undertake their final year research project (Semester 1) in industry and
  graduate with an 'MEng Materials Science and Engineering' within 4 years." Placement-finding
  is the student's responsibility: "Students wanting to take Industrial placements are
  responsible for finding their own placement."
- Official 2027 course brochure exists:
  `https://www.scieng.manchester.ac.uk/undergraduate-brochures/2027/materials/`
- Official 2027 Materials subject listing:
  `https://www.manchester.ac.uk/study/undergraduate/courses/2027/?s=MS`
- MATSOC scope, verbatim and relevant to the Fashion question: "MATSOC is a student-run society
  open to all Department of Materials students; **from Materials Science and Engineering to
  Fashion Business and Technology.**" → first-party confirmation that the Department of
  Materials also houses a "Fashion Business and Technology" provision. Pursued below.

## 3.2 — THE COMPLETE 2027 MATERIALS-FAMILY SET, from Manchester's own course finder
Source: `https://www.manchester.ac.uk/study/undergraduate/courses/2027/?s=MS`
Page title: "Undergraduate courses for entry in 2027 | The University of Manchester".
Breadcrumb offers "2027 entry" (current) and "2026 entry" (separate). **Cycle: 2027 confirmed.**

The finder pre-renders every subject area into the DOM. **240 course entries** were enumerated
across the whole 2027 undergraduate catalogue and string-matched on
`material|textile|polymer|metallurg|nanomat|biomaterial|corrosion|fashion|composite`.
**Exactly seven titles match. There are no others in the 2027 catalogue.**

### Subject area "Materials" (`?s=MS`) — THREE applications, not two
| Title (verbatim) | Award / duration (verbatim) | UCAS code | Node |
|---|---|---|---|
| Materials Science and Engineering | BSc, "3 years" | **J500** | `09894/bsc-materials-science-and-engineering/` |
| Materials Science and Engineering | MEng, "4 years" | **J501** | `09895/meng-materials-science-and-engineering/` |
| **Materials Science with an Integrated Foundation Year** | **BSc/MEng**, "See full entry" | **F013** | `12959/bsc-meng-materials-science-with-an-integrated-foundation-year/` |

### >>> OMISSION FOUND: F013 <<<
**Batch 6's conclusion that "Manchester publishes exactly two parent codes in this family" is
wrong.** Manchester's own 2027 course finder, under its own "Materials" subject filter, lists a
**third separate UCAS application: F013, Materials Science with an Integrated Foundation Year,
BSc/MEng.** This is a distinct UCAS code, not a pathway and not a later-year specialism, and it
is absent from the catalogue of two records. Detailed below in §3.4.

### Subject areas "Fashion" (`?s=FA`) and "Fashion Management and Marketing" (`?s=FASHION`)
| Title (verbatim) | Award / duration (verbatim) | UCAS code | Node |
|---|---|---|---|
| Fashion Buying and Merchandising | BSc, "3 or 4 years" | **6G49** | `09665/bsc-fashion-buying-and-merchandising/` |
| Fashion Management | BSc, "3 or 4 years" | **3M89** | `09662/bsc-fashion-management/` |
| Fashion Marketing | BSc, "3 or 4 years" | **3S61** | `09663/bsc-fashion-marketing/` |
| Fashion Product Innovation | BSc, "3 years" | **3M93** | `21522/bsc-fashion-product-innovation/` |

**Answer to the Batch 6 Fashion / Textile Technology question:** yes, they have their own UCAS
codes — four of them, listed above. Crucially, Manchester files them under the subject areas
**"Fashion"** and **"Fashion Management and Marketing"**, which are *separate top-level subject
areas from "Materials"* in its own 2027 finder. Three of the four are management/marketing/buying
titles; only **Fashion Product Innovation BSc (3M93)** is a product/technology title.

**There is no standalone "Textile Technology" or "Fashion and Textile Technology" course in the
2027 catalogue at all.** "Textiles Technology" exists only as a J501 *pathway* award suffix, and
"Advanced Textile Technology" / "Textiles Evaluation & Clothing" / "Technical & Biomedical
Textiles" / "Textile Manufacturing Techniques" exist only as J501 course units (MATS43702,
MATS43802, MATS43902, MATS32602). Batch 6's inability to verify the departmental 2027 listing
(JavaScript-loaded, returned nothing) is resolved: the rendered finder supplies the list.

**Scope judgement:** the three Fashion management/marketing/buying titles (6G49, 3M89, 3S61) are
**genuinely separate subjects**, not engineering/materials applications — Manchester classifies
them outside the Materials subject area and they are business-facing. Fashion Product Innovation
(3M93) is the borderline case; it is still filed outside "Materials" by Manchester. Per the
evidence rules these are reported as IDENTITY-confirmed only; their 2027 admissions requirements
were not retrieved in this batch and must not be assumed from the Materials courses.

### Any other Materials-family title existing as its own application?
**No, apart from F013.** The 240-entry sweep of the full 2027 catalogue found no separate
application for Biomaterials, Metallurgy, Nanomaterials, Polymers, Textiles Technology,
Corrosion, or Composites. This independently re-confirms that the two previously-invented
"fake separate courses" that Batch 6 deleted were correctly deleted: Manchester publishes no
such codes.

## 3.3 — J500, BSc Materials Science and Engineering (2027 entry) — VERIFIED

### >>> CORRECTION: THERE IS NO "BEng" IN THIS FAMILY <<<
The task brief's second parent URL was
`…/courses/2027/09894/beng-materials-science-and-engineering/`.
Navigating it returns a page titled "**BSc** Materials Science and Engineering (2027 entry)"
and `<link rel="canonical">` =
`https://www.manchester.ac.uk/study/undergraduate/courses/2027/09894/bsc-materials-science-and-engineering/`.

Node 09894 is the **BSc**. Manchester's own 2027 finder lists it as "Materials Science and
Engineering BSc (3 years) J500". **No BEng Materials course exists in the 2027 catalogue** (the
240-entry sweep found none). Any record or note calling J500 a "BEng" is wrong; the `beng-`
slug resolves to the BSc but is not Manchester's canonical spelling.

**CYCLE: 2027 confirmed** ("Year of entry: 2027", title "(2027 entry)").
**IDENTITY: confirmed** — "UCAS course code: J500 / Institution code: M20", award "Bachelor of
Science (BSc)", "Duration: 3 years". Accredited; "Associated organisations Institute of Materials".

### J500 2027 admissions data (verbatim)
Key facts:
- "Typical A-level offer: AAB including specific subjects"
- "Typical contextual A-level offer: ABB including specific subjects"
- "UK refugee/care-experienced offer: BBB including specific subjects"
- "Typical International Baccalaureate offer: 35 points overall with 6,6,5 at HL, including
  specific requirements"

Full text:
- **A-level:** "AAB including two from Mathematics, Physics and Chemistry. If you are not taking
  A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required. Practical skills are a
  crucial part of science education and therefore will be a requirement to pass the practical
  element of any science A-level taken. … Applicants taking A-levels are normally expected to
  offer three full A-levels. If you're taking more than three A-levels, any offer will be based
  on three A-levels, and any additional A-levels won't be included in your offer."
- **A-level contextual offer:** "ABB including two from Mathematics, Physics and Chemistry. If you
  are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required. …"
- **UK refugee/care-experienced offer:** "BBB including 2 from Mathematics, Physics and Chemistry.
  If you are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required. …"
- **International Baccalaureate:** "35 points overall with 6,6,5 at Higher Level, including 2 from
  Mathematics, Physics and Chemistry. We will only accept Higher Level Mathematics: analysis and
  approaches."
- **GCSE/IGCSE (full, and more detailed than the MEng's captured text):** "Applicants must
  demonstrate a broad general education including acceptable levels of literacy and numeracy,
  equivalent to at least Grade C/4 in GCSE/IGCSE English Language, Mathematics and Science. If
  you are not taking A-level Mathematics, Grade 7/A at GCSE/IGCSE Mathematics is required.
  Please note that if you hold English as a Second Language GCSE/IGCSE qualification you will
  need a Grade 8. **We only accept the following boards: CAIE, Oxford AQA and Pearson Edexcel.**
  GCSE/IGCSE English Literature will not be accepted in lieu of GCSE/IGCSE English Language."
- **Scottish:** "We normally require grades AABBB in Scottish Highers. In addition: Two Scottish
  Advanced Highers in two subjects from Maths, Physics and Chemistry at AA plus two Highers at BB
  (any subjects). English Language and Mathematics not taken at Higher/Advanced Higher must have
  been achieved at SCQF level 5 (minimum National 5 grade C / Intermediate 2 grade C / Standard
  Grade Credit level grade 3)."
- **Welsh:** "We welcome and recognise the value of the Baccalaureate Wales and accept the
  Advanced Skills Baccalaureate Wales."
- **EPQ:** "Although the Extended Project will not be included in the conditions of your offer,
  we encourage you to provide information about the EPQ in your application. We may be able to
  take your performance in the EPQ into account should places become available in August for
  applicants who narrowly miss the entry grades for their chosen course." → again **not** a
  grade-reduction route.
- **Further Mathematics: no stated preference** (neither string present in full `textContent`).
- **Admissions test: NOT PUBLISHED** (`admissions test`, `aptitude test`, `entrance test`,
  `ESAT`, `TMUA` all NOT FOUND).
- **Interview: PUBLISHED**, identical wording to J501: "All students who apply to us through
  UCAS, and who live on the UK mainland and meet our application criteria, are currently invited
  to a Virtual Visit event which will include an interview as part of the application process.
  These are held from November through to March… The interview will be informal and no specific
  preparation needs to be done for it."

### THE J500 SPECIALISM QUESTION — Batch 6 PARTLY RIGHT, MECHANISM WRONG
Batch 6 recorded J500's specialisms as "optional final-year units (Nanomaterials, Metallurgy,
Polymers, Biomaterials, Textiles, Corrosion science) that do not change the award".

The six names are right. **The mechanism is not.** Manchester's own wording, verbatim:

> "Our three-year BSc course provides both the fundamentals of materials science and engineering
> and the opportunity for specialisation in the areas that interest you most. **In your final
> year, for example, you can choose to focus on a specific topic such as nanomaterials,
> metallurgy, polymers, biomaterials, textiles or corrosion science**, getting hands-on with
> Manchester's incredible range of unique facilities **as part of your final-year research
> project**."

Two corrections that matter:
1. The specialisation vehicle is the **topic of the final-year research project**, not a set of
   optional taught units. There is no optional unit named for metallurgy, polymers or corrosion
   anywhere on the J500 curriculum.
2. The list is **explicitly illustrative and open-ended** — "for example", "such as". It is
   **not a closed list of six**. Recording it as a definitive six-item enumeration overstates
   what Manchester publishes. Do not flatten "such as … or corrosion science" into a fixed set.

Year 3 wording, verbatim: "In year three, alongside core units, you will have the opportunity to
specialize through a choice of options. A key part of year three is an extensive final-year
project. During this project, you will choose a topic of particular interest to undertake
in-depth research." (Manchester's own US spelling "specialize" preserved.)

**The actual optional taught units on J500 (complete, 2027):**
| Year | Optional units | Code | Credits |
|---|---|---|---|
| 1 | *(none — all 10 units Mandatory)* | — | — |
| 2 | Biomaterials & Biological Interactions | MATS23801 | 10 |
| 2 | Smart & Nano Materials | MATS23901 | 10 |
| 3 | Textile Manufacturing Techniques | MATS32602 | 10 |

That is the whole optional set: **three optional units across the degree.** Everything else in
years 1–3 is Mandatory.

**Confirmed: the J500 specialisms do NOT change the award.** The award is "Bachelor of Science
(BSc)" / "Materials Science and Engineering" with no suffix. There is no "Specialisation" section
and no "pathway" wording anywhere on the J500 page — both strings are **NOT FOUND** — in direct
contrast to J501, which has both. Classification for all six J500 topic areas: **later-year
specialism / project-topic choice, chosen in the final year, not separately applied to, and not
award-changing.**

## 3.4 — F013, BSc/MEng Materials Science with an Integrated Foundation Year (2027) — NEW RECORD
Source: `https://www.manchester.ac.uk/study/undergraduate/courses/2027/12959/bsc-meng-materials-science-with-an-integrated-foundation-year/`
Canonical confirms that URL. Title: "BSc/MEng Materials Science with an Integrated Foundation
Year (2027 entry) | The University of Manchester".

**This is a SEPARATE UCAS APPLICATION and it is missing from the catalogue of two records.**

**CYCLE: 2027 confirmed** ("Year of entry: 2027"; title "(2027 entry)").
**IDENTITY: confirmed** — "UCAS course code F013 / UCAS institution code M20"; "Apply through UCAS".
Filed by Manchester under subject areas **"Materials"** and **"Foundation Studies"**.

### Captured fields for the new separate application
- **UCAS code:** F013 (institution M20)
- **Award, verbatim:** "Bachelor of Science / Master of Engineering (**BSc/MEng**)"
- **Duration, verbatim:** "**1 (as part of 4/5 yr integrated degree programme)**"
  (i.e. the foundation year itself is 1 year, inside a 4- or 5-year integrated programme —
  report as the range 4/5, do not flatten)
- **Exact 2027 A-level offer — a THREE-STEP SLIDING SCALE, verbatim:**
  > "BBC where a student has 3 relevant subjects
  >  BBB where a student has 2 relevant subjects
  >  ABB where a student has 1 relevant subject"

  This is a genuine range keyed to how many relevant subjects the applicant offers, and must not
  be flattened to a single grade string.
- **Required subjects, verbatim:** "The subjects considered to be relevant are **Mathematics,
  Further Mathematics, Physics, Chemistry, Statistics, Computer Science.**"
- **Further Mathematics — EXPLICIT POSITION (the only one in this batch at Manchester):**
  Further Mathematics is **named as a relevant subject** on F013, counting toward the
  relevant-subject tally that sets the grade step. Contrast J500 and J501, where Further
  Mathematics has **no stated preference** at all. This distinction is first-party and should be
  preserved per record rather than harmonised across the family.
- **Practical science, verbatim:** "Practical skills are a crucial part of science education and
  therefore there will be a requirement to pass the practical element of any science A-level taken."
- **Three-A-level rule, verbatim:** "Applicants taking A-levels are normally expected to offer
  three full A-levels. If you're taking more than three A-levels, any offer will be based on
  three A-levels, and any additional A-levels won't be included in your offer."
- **Contextual offer — EXPLICITLY UNAVAILABLE, verbatim:**
  Key facts: "Typical contextual A-level offer: **Course not eligible for contextual offers**";
  "UK refugee/care-experienced offer: **Course not eligible for contextual offers**".
  Body: "**This course is not eligible for a contextual offer. Contextual offers are only
  available for courses that have a standard entry requirements of ABB or higher.**"
  This is a positive published exclusion, not a silence — record it as "not eligible", which is
  different from both "NOT PUBLISHED" and from a numeric contextual offer.
- **GCSE rule, verbatim (and it differs from J500's and J501's):** "Applicants must demonstrate a
  broad general education including acceptable levels of literacy and numeracy, equivalent to at
  least **Grade C/4 in GCSE/IGCSE English Language** and **Grade B/6 in GCSE/IGCSE Mathematics if
  not studied at A-level** and at least **Grade B/6 from one of GCSE/IGCSE Physics, Chemistry or
  Combined Science if not studied at A-level**. GCSE/IGCSE English Literature will not be
  accepted in lieu of GCSE/IGCSE English Language. Please note that if you hold English as a
  second language IGCSE qualification, we may also require you to offer one of our acceptable
  equivalent English Language qualifications or achieve a higher grade in your IGCSE than the one
  stated above."
- **International Baccalaureate:** key facts say only "See full entry requirements" — no numeric
  IB offer is surfaced in the key-facts panel for F013.
- **Admissions test: NOT PUBLISHED** (`admissions test`, `aptitude test`, `entrance test`,
  `ESAT`, `TMUA` all NOT FOUND in full `textContent`).
- **Interview: NOT PUBLISHED.** The string "Interview requirements" is **NOT FOUND** on F013 —
  unlike J500 and J501, which both carry the Virtual Visit interview block. This is a real
  published difference between the foundation-year application and the two direct-entry ones.
  Recorded as NOT PUBLISHED, not "no interview".
- **Provenance / entry year shown:** "Year of entry: 2027" in the key-facts panel; "(2027 entry)"
  in the page title; breadcrumb "Courses 2027 entry".

### What F013 feeds into — Manchester's own wording
> "Begin your journey to a materials science degree with our one-year Integrated Foundation Year
> programme… **By completing the course and meeting the specific progression criteria, you can
> continue to one of the following degree programmes: Materials Science and Engineering, BSc /
> Materials Science and Engineering, MEng**"

Overview, verbatim: "Complete the Integrated Foundation Year and meet the specific progression
criteria to **guarantee a place** on one of our materials science degrees." Also: "on the
Integrated Foundation Year you are an undergraduate at The University of Manchester."

Foundation-year content, verbatim: "On the Foundation Year you will study mathematics, physics and
chemistry. You will also take modules in Academic Skills and ICT (Information and Communications
Technology) and complete a group project related to your intended degree programme and supervised
by an academic from the Department of Materials."

### INDEPENDENT THIRD CONFIRMATION OF THE FIVE J501 PATHWAYS
F013's own page restates the pathway list, verbatim:
> "**Later in your degree programme there is the potential to transfer to one of the specialist
> Masters pathways** and so graduate with one of the following qualifications:
> MEng in Materials Science and Engineering with Biomaterials
> MEng in Materials Science and Engineering with Metallurgy
> MEng in Materials Science and Engineering with Nanomaterials
> MEng in Materials Science and Engineering with Polymers
> MEng in Materials Science and Engineering with Textiles Technology"

So the five-pathway list is now corroborated on **two independent official 2027 pages** (J501 and
F013), both giving the same five and no sixth, and both describing entry by **transfer**, not
application. Note F013 calls them "specialist **Masters** pathways" where J501 calls them
"specialist **MEng** pathways" — a wording difference, same five destinations.

## 3.5 — CLASSIFICATION TABLE: every named Materials route Manchester publishes for 2027
| Route | Classification | Own UCAS code | How/when chosen (Manchester's wording) |
|---|---|---|---|
| Materials Science and Engineering BSc | **separate UCAS application** | **J500** | apply via UCAS |
| Materials Science and Engineering MEng | **separate UCAS application** | **J501** | apply via UCAS |
| Materials Science with an Integrated Foundation Year BSc/MEng | **separate UCAS application** | **F013** | apply via UCAS; progression to J500 or J501 on "specific progression criteria" |
| MSE **with Biomaterials** (MEng) | **later-year specialism / pathway within J501** | none | "transfer onto one of our specialist MEng pathways after your second year" / "in your third year" |
| MSE **with Metallurgy** (MEng) | **later-year specialism / pathway within J501** | none | as above |
| MSE **with Nanomaterials** (MEng) | **later-year specialism / pathway within J501** | none | as above |
| MSE **with Polymers** (MEng) | **later-year specialism / pathway within J501** | none | as above |
| MSE **with Textiles Technology** (MEng) | **later-year specialism / pathway within J501** | none | as above |
| J500 topic areas: nanomaterials, metallurgy, polymers, biomaterials, textiles, corrosion science | **later-year specialism, final-year project topic, NOT award-changing** | none | "In your final year, for example, you can choose to focus on a specific topic such as … as part of your final-year research project" (illustrative list, not closed) |
| "Textile Technology" as a standalone degree | **does not exist** in the 2027 catalogue | — | exists only as a J501 pathway suffix and as course units MATS32602 / MATS43702 / MATS43802 / MATS43902 |
| "Corrosion" as a taught optional unit | **does not exist** on J500 or J501 | — | the word appears only in J500's illustrative project-topic sentence; NOT FOUND on the J501 page |
| BEng Materials Science and Engineering | **does not exist** | — | the `beng-` slug canonicalises to the BSc (J500) |
| Fashion Buying and Merchandising BSc | separate application, **separate subject** (not materials/engineering) | **6G49** | apply via UCAS |
| Fashion Management BSc | separate application, **separate subject** | **3M89** | apply via UCAS |
| Fashion Marketing BSc | separate application, **separate subject** | **3S61** | apply via UCAS |
| Fashion Product Innovation BSc | separate application, **borderline subject** (product/technology, but filed outside "Materials") | **3M93** | apply via UCAS |

No route in the 2027 catalogue is **discontinued** relative to this set — nothing in the family
carries a withdrawal or "no longer recruiting" notice on any page read.

