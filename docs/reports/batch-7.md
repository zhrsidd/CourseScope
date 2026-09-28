# Batch 7 — Catalogue Completion and Identity Integrity

**Workflow completed:** LOCK → YORK → LANCASTER → KNOWN EDGE CASES → IDENTITY AUDIT → IMPORT/CLEANUP → VALIDATE → SMOKE TEST → REPORT

---

## 1. Discrepancies and identity corrections

Seven substantive corrections. Three rows deleted, three codes stripped, one row's code corrected by supersession. Two known edge cases were upgraded rather than corrected — they were incomplete, not wrong — and appear in §5 and §6.

### 1.1 Lancaster — Theoretical Physics with Mathematics MPhys

| | |
|---|---|
| Old identity | Theoretical Physics with Mathematics **MPhys** |
| Official identity | Theoretical Physics with Mathematics **MSci** |
| Old UCAS code | `FG31` |
| Official UCAS code | `F3G1` |
| Old record type | Live demo/scaffold row in `courses.physics.ts` |
| New representation | **Deleted.** The real MSci identity now sits in the Lancaster file as an identity-only row |
| Classification | **Other — wrong award *and* wrong code simultaneously** |

Lancaster's own Department of Physics undergraduate listing enumerates all 25 physics codes. There is no MPhys anywhere in the Theoretical Physics with Mathematics family, and no course at all under `FG31`. The row asserted an application that cannot be made, under a code with no referent.

The reason it survived six batches is itself the finding: supersession matches on UCAS code first and canonical name-plus-award second. Because *both* keys were wrong, neither could match the real record, so the row was invisible to every automatic cleanup. A row is hardest to detect precisely when it is most wrong.

`FG31` remains correct and untouched at Manchester, Leeds, Warwick and Birmingham. Codes are unique within an institution, not between them.

### 1.2 York — Electronic Engineering MEng

| | |
|---|---|
| Old identity | Electronic Engineering MEng |
| Official identity | Electronic Engineering MEng (title correct) |
| Old UCAS code | `H610` |
| Official UCAS code | `H609` — `H610` is the **BEng** |
| Old record type | Live scaffold row in `courses.engineering.ts` |
| New representation | **Deleted**; both awards now carry their correct codes in the York file |
| Classification | **Code error + fake counterpart** |

Right title, wrong code, and the code belongs to the sibling award. Left in place this would have held the BEng's code against an MEng at the same university in the same cycle — the exact shape the new `same-code-multiple-live-identities` rule exists to catch, and the same shape as the Southampton `H610` error removed in Batch 6.

### 1.3 York — Computer Systems and Software Engineering MEng

| | |
|---|---|
| Old identity | Computer Systems and Software Engineering MEng |
| Official identity | **None — the application does not exist** |
| Old UCAS code | `GH66` |
| Official UCAS code | n/a |
| Old record type | Live scaffold row |
| New representation | **Deleted** |
| Classification | **Obsolete programme / phantom** |

The title appears nowhere in York's own 2027/28 undergraduate A–Z, fetched in full with the filter at "Showing all courses" so nothing was hidden behind a subject facet. `GH66` has no referent at York either. The nearest genuinely existing degree is Electronic and Computer Engineering (BEng `H634` / MEng `H639`) — a different title under different codes, and the two must not be quietly renamed into one another.

### 1.4–1.6 Bath — three invented UCAS codes stripped

| Record | Old code | Official code |
|---|---|---|
| Physics MPhys (`bath-physics`) | `F303` | none published |
| Mechanical Engineering | `H300` | none published |
| Electrical and Electronic Engineering | `H600` | none published |

**Classification: code error — codes with no provenance.**

Bath publishes no UCAS code in the body of any course page, and its course-search page, which does carry codes, is disallowed by `bath.ac.uk/robots.txt`. No Bath code in this catalogue has ever had provenance. The audit found these three precisely *because* every **verified** Bath record already carries none — the scaffold rows were the only Bath rows asserting codes at all.

Codes have been set to `null` rather than guessed. These records are identified by university, name, award and cycle, exactly like the thirteen verified Bath records.

### 1.7 Lancaster — Mechanical Engineering MEng (corrected by supersession)

The scaffold row carried `H300` against the MEng. Lancaster publishes `H300` as the **BEng** and `H303` as the MEng. The row is now superseded by the real record and no longer served. **Classification: code error.**

### 1.8 Manchester — a third Materials application that was missing

Not a correction of a wrong row but of an **absent** one. Sweeping all 240 entries of Manchester's own 2027 course finder surfaced **`F013` Materials Science and Engineering with an Integrated Foundation Year**, a separate application Batch 6 had not found. Now imported and verified, with its three-step sliding-scale offer stored as three pathways rather than flattened:

- Three relevant subjects → **BBC**
- Two relevant subjects → **BBB**
- One relevant subject → **ABB**

Manchester states explicitly that this course is **not** eligible for its contextual offer; that is stored as published, not inferred.

### Batch 1–6 integrity

Beyond the seven corrections above, **no Batch 1–6 admissions data was changed.** Every alteration was to identity (a code, an award, or the existence of a row) and every one is evidenced by the university's own current page. The two upgrades in §5 and §6 added fields that were previously missing; they overwrote nothing.

---

## 2. Baseline lock

Batch 6 was confirmed intact before any change. **The brief's expected figures matched exactly.**

| Metric | Expected | Found |
|---|---|---|
| Assertions passing | 599 | **599** |
| Assertions failing | 0 | **0** |
| Served records | 866 | **866** |
| Verified | 421 | **421** |
| Partially verified | — | 2 |
| Awaiting publication | — | 423 |
| Awaiting data | — | 20 |
| Validation errors | 0 | **0** |
| Duplicates / conflicts | 0 | **0** |
| Browser page errors | 0 | **0** |

Also at lock: 942 total records (76 suppressed), 428 rows for 2027 and 438 for 2028, 236 warnings, 18 universities with verified data, 152 records carrying 305 study options.

---

## 3. University of York

York publishes its full undergraduate catalogue in one central A–Z headed "Courses 2027/28". It was fetched in full, twice, with the filter at "Showing all courses". Every York finding below rests on that listing plus the individual course pages.

### 3.1 Verified applications — Physics (25)

All 25 share one subject rule (**Physics and Mathematics**, no subject-specific minimum grade), no admissions test is mentioned anywhere, no interview is stated, and a contextual offer is available. Further Mathematics is `no-stated-preference` — the pages were read in full and say nothing about it.

| Course | Award | UCAS | Offer | Required subjects | Test | Interview | Status |
|---|---|---|---|---|---|---|---|
| Physics | BSc | F300 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics | MPhys | F303 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics (year in industry) | BSc | F301 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics (year abroad) | BSc | F302 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics (year abroad) | MPhys | F305 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics (year in industry) | MPhys | F306 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Astrophysics | BSc | F3F5 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Astrophysics | MPhys | F3FN | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Astrophysics (year in industry) | BSc | F3F6 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Astrophysics (year abroad) | BSc | F3F7 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Astrophysics (year abroad) | MPhys | F3F8 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Astrophysics (year in industry) | MPhys | F3F9 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Theoretical Physics | BSc | F345 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Theoretical Physics | MPhys | F346 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Theoretical Physics (year in industry) | BSc | F344 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Theoretical Physics (year abroad) | BSc | F347 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Theoretical Physics (year abroad) | MPhys | F348 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Theoretical Physics (year in industry) | MPhys | F349 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Philosophy | BSc | F3V5 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Philosophy | MPhys | F3VM | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Physics with Philosophy (year abroad) | BSc | F3V7 | AAB | Physics, Mathematics | none stated | not stated | Verified |
| Mathematics and Physics | BSc | GF13 | AAB | Mathematics, Physics | none stated | not stated | Verified |
| Mathematics and Physics | MPhys | GFC3 | AAA | Physics, Mathematics | none stated | not stated | Verified |
| Mathematics and Physics (year abroad) | BSc | GF14 | AAB | Mathematics, Physics | none stated | not stated | Verified |
| Physics (foundation year) | BSc | F304 | BBB | — | none stated | **yes** | Verified |

**Two rows break the pattern, and both are real:**

- **`GF14` Mathematics and Physics (year abroad)** is the only course in York's entire 47-course in-scope catalogue that publishes a GCSE requirement of its own. Every other York record reads "No GCSE Mathematics or Science requirement is published."
- **`F304` Physics (foundation year)** is the only York physics course with a **published, specific** GCSE rule, the only one requiring an **interview**, and the only one with no named A-level subject requirement.

"No admissions test is mentioned" is recorded as **silence**, not as a published "no test required". York never states that no test is needed.

### 3.2 Programmes searched for that do not exist at York

Verified twice against York's own 2027/28 A–Z at "Showing all courses":

- **Mechanical Engineering** — no application
- **Civil Engineering** — no application
- **Chemical Engineering** — no application
- **Aerospace Engineering** — no application
- **Computer Systems and Software Engineering MEng** — no application (row deleted, §1.3)

The Batch 6 structural finding is therefore **confirmed from official sources**, not merely carried forward. None of these was created, and the smoke test asserts none can be found.

### 3.3 Pathways and study options at York

York's Engineering BEng (`H105`) publishes **Year 3 option modules** named *Robotics*, *Biomedical Engineering* and *Renewable Power Generation* — the same words as three separately coded York degrees. **The modules are not the degrees, and neither is an application.** They are recorded as option modules on the parent, and no course record was created from any of them. This is the single most dangerous near-miss in the batch: a naïve importer reading titles would have produced three phantom applications at a university that already had two.

### 3.4 York identities that remain unresolved

**22 engineering applications** are imported as identity-only rows: title, award and UCAS code read off York's own A–Z, and **nothing else**. No offer, subject requirement, test, interview, contextual offer or GCSE rule is recorded, and none has been inferred from a sibling, another award level or another university.

`H105` and `H109` offers ("ABB including Maths." / "AAA including Maths.") *were* found during research and were deliberately **not** imported, because their own course pages were not read in full and a partial read is how wrong data enters a catalogue. They are logged as Batch 8 targets.

---

## 4. Lancaster University

**Lancaster is the most important identity-structure result in Batch 7, and the answer is the one that is easiest to get wrong.**

### 4.1 The structural question

The brief offered four possibilities. The answer is **A and B together, and emphatically not C**:

> **General Engineering is a real application. Every named discipline is also a real application. There is also a genuine common first year.** All three statements are true at once.

The evidence is arithmetic rather than interpretive. Each of the six engineering disciplines — General Engineering, Chemical, Electronic and Electrical, Mechanical, Mechatronic, Nuclear — publishes a **complete, independent set of seven UCAS codes**: BEng and MEng, each in standard, study-abroad and placement-year form, plus a foundation-year BEng. That is 42 codes for six disciplines with no gaps and no sharing.

A student applying to Lancaster Mechanical Engineering types `H300` or `H303`. They do **not** type a General Engineering code and choose later. The common first year is real and it changes nothing about what is applied to.

**This is the corollary that cuts the other way.** Manchester's five Materials titles look like courses and are pathways. Lancaster's six disciplines look like pathways under a shared first year and are six separate applications. Only the UCAS evidence separates the two cases, which is exactly why the invariant is written as an evidence test and not as a bias toward merging.

### 4.2 Verified applications — Physics (2)

| Course | Award | UCAS | Offer | Required subjects | Test | Interview | Status |
|---|---|---|---|---|---|---|---|
| Physics | BSc | F300 | AAA | Mathematics, Physics | none stated | sometimes | Verified |
| Physics | MPhys | F303 | AAA | Mathematics, Physics | none stated | sometimes | Verified |

GCSE: "English Language grade 4/C", Lancaster's own course-page wording. No admissions test is mentioned on the course page or in Lancaster's own 2027 departmental brochure — recorded as silence, not as "no test required".

### 4.3 Partially verified applications — Engineering (40)

All 40 carry Lancaster's published grade profile and its common-first-year explanation. One representative row per family and award:

| Family | BEng | MEng | BEng offer | MEng offer | Foundation |
|---|---|---|---|---|---|
| Engineering (General) | H100 | H102 | ABB | AAA | H10F (CCC) |
| Chemical Engineering | H800 | H811 | ABB | AAA | H80F (CCC) |
| Electronic and Electrical Engineering | H607 | H606 | ABB | AAA | H60F (CCC) |
| Mechanical Engineering | H300 | H303 | ABB | AAA | H30F (CCC) |
| Mechatronic Engineering | HH63 | HHH6 | ABB | AAA | HH6F (CCC) |
| Nuclear Engineering | H820 | H821 | ABB | AAA | H82F (CCC) |

Each family also carries study-abroad and placement-year codes under the same offer.

**Why partially verified and not verified:** Lancaster publishes its *subject* requirements inside a page section that could not be retrieved. The grade profile is known; the subject conditions are not. Rather than guess them or leave the record silently permissive, every one of these 40 records carries a **`manual-review` constraint** whose text says plainly that the published conditions are not fully known.

The practical effect is that an applicant's verdict on a Lancaster engineering course is **"review required"**, never a false "meets". A catalogue that cannot read a requirement must not report that the requirement is satisfied.

### 4.4 What a student is told

Each record explains, in its own text:

- **what they apply to** — this specific UCAS code
- **whether the first year is common** — yes, shared across engineering disciplines
- **when specialisation occurs** — after the common first year
- **whether changing discipline later is possible** — yes, but **conditional**, "subject to meeting the requirements"

That last word matters and is preserved. A conditional transfer is not an open choice, and the record does not imply one.

### 4.5 Lancaster identities that remain unresolved

**25 identity-only rows**: 23 Physics variants (placement, study-abroad, foundation, Astrophysics, Theoretical Physics, Theoretical Physics with Mathematics) plus 2 Nuclear Engineering placement-year codes. All 25 codes come from Lancaster's own departmental listing, which enumerates the complete set — the identity is solid, the admissions fields are unread.

Lancaster's physics family does share one grade string across variants. **It has not been copied across**, because a shared string on the pages that were read is not evidence about the pages that were not.

---

## 5. Sheffield General Engineering MEng `H100`

**Final status: `verified`. Nothing remains unresolved.**

| | |
|---|---|
| Source route used | **Rendered browser read of the official course page** |
| Prior attempts | **Ten** text fetches across two batches, every one truncated by page length before reaching the entry-requirements table |

The fix was not persistence, it was the retrieval method. Ten text fetches failed identically because the page is long enough that the requirements table falls outside the returned window every time. The browser pane returns the whole rendered DOM, and every missing field appeared at once.

**Cycle confirmed first:** the page's own switcher reads "2027-28 entry — View 2026-27 entry", so this is the 2027-28 record and it *links away* to 2026-27.

**Now verified:**

- Offer: **A\*AA including Maths and Physics**
- Access Sheffield offer: **AAA including Maths and Physics**
- Fourth-qualification route: "AAA, including Maths and Physics + A in a relevant EPQ; AAA, including Maths and Physics + A in AS or B in A Level Further Maths"
- GCSE: **English Language grade 4/C only** — Sheffield publishes **no** GCSE Mathematics rule here
- Admissions test: **none.** A whole-DOM string audit across visible text *and* hidden tab panels found no occurrence of "admissions test", "entrance test", "aptitude", "selection day", TMUA, STEP, PAT or ESAT
- Interview: **none.** The only two "interview" hits are careers-service mock interviews in the Placements section
- Chemistry and Biology appear nowhere in the document at all

**Study option recorded, not invented:** Sheffield admits to one General Engineering code and lets students choose one of six streams in Year 3 — Biomedical; Civil & Structural; Electrical & Software; Energy & Sustainability; Mechanical & Aerospace; or General. Sheffield's own wording: students "study modules across all disciplines, after which you'll choose one of six possible specialisms". These are routes inside one application. Accreditation is stream-dependent, so no single professional body is named.

---

## 6. Leeds Product Design `H795`

**Final status: `verified`. The ambiguity was ours, not Leeds'.**

Batch 6 read this page as carrying four contradictory official cycle labels and marked it partially verified for that reason. **Batch 6 was wrong, and the rendered DOM shows why.**

The string "2026 course information" is **not a banner on this page**. It is the text of an arrow **link** immediately below the heading, pointing away to `courses.leeds.ac.uk/202627/a602/product-design-bsc` — the exact structural analogue of Sheffield's "View 2026-27 entry" switcher. Batch 6 read a navigation link as an assertion, because it was reading flattened text rather than markup.

The page's four labels are in fact **all 2027 and none in conflict**: "Year of entry 2027"; "Start date September 2027"; "Tuition fees … starting in 2027/28 are £10,050"; and a footer link to the Admissions Policy 2027.

Leeds' own course search settles the identity independently. Its "Year of entry" radio group defaults to Academic year 2027 (`value 202728`, checked), and under that 2027 scope it returns "Product Design BSc / 3 Years (Full time) / Typical A-level offer AAB / UCAS code H795", linking to this exact bare URL. **The bare `/a602/` URL is Leeds' 2027 record; the 2026 record lives at the year-prefixed path.** No cache-buster was needed, so Batch 6's HTTP 403 on query strings is bypassed rather than worked around.

### The one genuine first-party inconsistency — flagged, not reconciled

The course-structure section links to the module catalogue as **"BA Product Design"** — BA, where the record and the page title both say **BSc** — and that link resolves into the **202627** catalogue from a 2027 entry page.

**This has not been corrected.** It is Leeds' own inconsistency, it concerns a module list rather than admissions, and it is stored exactly as published. The course page, the page title and Leeds' own 2027-scoped course search all agree on BSc and on `H795`, so the admissions-relevant identity is not in doubt and the record is verified. The discrepancy is disclosed on the course page, and the smoke test asserts both that it is visible and that the catalogue does not claim to have resolved it.

Also confirmed: Product Design is the only in-scope Leeds engineering-faculty course awarding a BSc, the only one with no required A-level subject, the one with the heaviest GCSE bar, and the only page that explicitly rules a portfolio **out** of the decision.

---

## 7. Manchester `J501` Materials

**Parent application: `J501` — Materials Science and Engineering MEng. One application, not six.**

### The complete pathway set

Five named pathways, entered by **transfer after the first two years**, each changing the award title:

1. Materials Science and Engineering with **Biomaterials**
2. … with **Metallurgy**
3. … with **Nanomaterials**
4. … with **Polymers**
5. … with **Textiles Technology**

Manchester's own wording: applicants "can transfer onto one of our specialist pathways and graduate with an MEng degree in…". **No separate UCAS code is published for any of them, and none has been invented.**

### The contrast with `J500` that matters

On the **BSc** (`J500`), the same subject areas — Nanomaterials, Metallurgy, Polymers, Biomaterials, Textiles, Corrosion science — are **final-year research project topics**. They do not change the award and they have no code. Manchester's wording is explicitly illustrative, not a closed list: "In your final year, for example, you can choose to focus on a specific topic such as …". The J500 wording was refined in Batch 7 to say so.

So the same words mean different things on two sibling courses: award-changing pathways on the MEng, project topics on the BSc. Flattening them together would have been wrong in both directions.

### Records removed or consolidated

Two of the five had previously been created as separate courses and were consolidated into `J501` in Batch 6. Batch 7 **re-audited the entire set** against Manchester's own pages and confirms: all five are pathways, no separate codes exist, and the consolidation was correct. **No new consolidation was required.**

Batch 7 did, however, find a **third** parent application the family was missing — `F013`, the Integrated Foundation Year route (§1.8). Manchester's Materials family is now `J500`, `J501` and `F013`.

### Search and shell behaviour — both asserted

- Searching any pathway name reaches the Manchester parent card and shows **"Route within this application: …"**, so the student is routed to the code they must actually apply to.
- **No pathway is ever a course title.** The smoke test checks card headings specifically, not page text, because the pathway name is *supposed* to appear on the parent card.
- **No pathway receives a 2028 shell.** Asserted for all five, plus Imperial's Spacecraft Engineering as a control.

---

## 8. Global application-identity audit

### Counts

| Measure | Result |
|---|---|
| Live records audited | **1,042** across 22 universities |
| UCAS-code conflicts found | **0** |
| False application identities found | **4** (3 deleted, 1 corrected by supersession) |
| Pathways converted to study options | **0 new** — Manchester's five re-audited and confirmed; Sheffield's six streams and Lancaster's common-first-year options added as options on existing parents |
| Obsolete scaffold rows removed | **3** |
| Cross-listed duplicates consolidated | **0** — none found |
| Unsupported codes corrected | **3** (all Bath, set to `null`) |
| URL-derived codes found | **0** |
| Records whose own text points at another code | **0** |
| Unresolved identity cases | **8** (see §14) |

### Audit A — duplicate UCAS code across distinct titles

**Zero.** No university/year/code triple is held by two live records with different identities.

One near-collision was checked and correctly left alone: **Bristol's MEng Design Engineering is `H100`. So is Sheffield's General Engineering MEng.** Both are right. UCAS codes are unique within an institution, not across them, and the identity rules key on university first.

### Audit B — named page with a parent-application instruction

**Zero live records** say applicants should apply to a different code.

One **false positive was found and fixed in the checker itself**. Southampton prints "UCAS course code: F3QT; UCAS institution code: S27" on its own page. The detector read `S27` — the **institution** code — as a course code and flagged a record for quoting its own code. The rule now strips institution codes before looking for a course code. Worth stating plainly: the identity checker had a bug, and the bug was found by running it, not by reasoning about it.

### Audit C — BEng/MEng pairing assumptions

**96 engineering titles carry only one of BEng/MEng.** This is reported as **information, not as a defect**, and no rule anywhere assumes a pair must exist.

York proves why that stance is mandatory: it publishes **Biomedical Engineering as BEng-only** (`H160`) and **Medical Engineering as MEng-only** (`H119`). Bath publishes Civil Engineering and Integrated Mechanical and Electrical Engineering as BEng-only, and Integrated Design Engineering as MEng-only. An importer that "completed" these pairs would have invented eight applications at two universities.

The one place a missing counterpart *was* a defect — York's `H610` MEng (§1.2) — was caught by the code, not by the absence.

### Audit D — UCAS code inferred from a URL slug

**Zero live records** hold a code that appears only in their own source URL. The rule is deliberately narrow: a record whose notes say where its code was read ("read off the A–Z", "prints *When you apply use*") does not fire, because that is provenance.

Batch 5 established this matters: three Leeds codes had been taken from page-path segments (`5200`, `f411`, `f414`) that sit exactly where a UCAS code looks natural, and all three were wrong. Leeds' `a602` path for Product Design is the same shape — and `H795` is the actual code.

### Audit E — cross-listed applications

**Zero found.** No application is currently stored twice under different subject headings. Cross-listing is handled by subject metadata rather than duplicate records.

### Audit F — obsolete scaffold rows

**Three removed**, all documented in §1: Lancaster `FG31`, York `H610` MEng, York `GH66`.

A fourth category emerged that the brief did not anticipate and that is now measured — see §9 and §14.

### Audit G — missing pathways

Added, all official:

- **Sheffield `H100`** — six Year-3 streams
- **Lancaster** — common-first-year structure and conditional specialism change, on all 40 engineering records
- **Manchester `F013`** — its own two study options

**196 records now carry 363 study options**, up from 152 records and 305 options at the Batch 6 lock.

---

## 9. New validation and invariant rules

Four rules. All four are high-confidence and quiet: together they contribute **8 warnings** across 1,042 records, and the brief's instruction against noisy heuristic validators was the governing constraint.

A new file, **`src/lib/identity-invariant.ts`**, states the invariant in full, names what counts as evidence and what does not, and holds the checks. It contains no admissions logic and no data.

### 9.1 `same-code-multiple-live-identities` — **error**

**Rule.** Within one university and one cycle, a normalised UCAS code must not belong to two live records with different canonical identities.

**Purpose.** Either the two are one cross-listed application and should be stored once, or one of them is wrong. Both need a human.

**False-positive risk: low, and actively managed.** Records that canonicalise to the same name and award are excluded — those are ordinary supersession. Two universities sharing a code is not a collision, because the key includes the university.

**Regression coverage.** Zero collisions across the live catalogue, **plus a synthetic pair built to trip it**, asserting the rule returns exactly 1.

### 9.2 `pathway-as-course-risk` — **warning**

**Rule.** Flag a record whose own stored text points applicants at a UCAS code the record does not itself carry, or which describes itself as a route chosen after admission while carrying no code.

**Purpose.** This is the Imperial Spacecraft / Manchester Materials failure mode, detected from the record's own words.

**False-positive risk: real, and the reason the rule is shaped as it is.** A record quoting "When you apply use: F303" *about itself* is the normal case. The rule fires only where the wording points at a **different** code. The Southampton institution-code bug (§8 Audit B) was exactly this risk materialising, and is fixed.

**Regression coverage.** Zero live hits, plus a synthetic "Applicants should apply to H401" record asserting the rule fires.

### 9.3 `unsupported-ucas-code` — **warning**

**Rule.** Flag a record whose stored code appears as a segment of its own source URL and whose notes say nothing about where the code was read.

**Purpose.** A code that only ever appeared in a URL has no provenance.

**False-positive risk: low by construction.** Stating provenance suppresses the warning, which is the behaviour you want — it rewards recording *where a fact came from*.

**Regression coverage.** Zero live hits, plus a synthetic Leeds-shaped `a602` record asserting the rule fires.

### 9.4 `unevidenced-identity` — **warning** (new in this batch, not in the brief)

**Rule.** Flag an **awaiting-data** record whose identity cites no official URL, no source and no check date.

**Purpose.** "Awaiting data" had been carrying two very different claims under one label:

- York's 22 engineering rows cite York's own "Courses 2027/28" A–Z. Lancaster's 25 physics rows cite the departmental listing enumerating all 25 codes. Southampton's 5 cite the course pages themselves. **The identity is evidenced; only the requirements are unread.**
- Eight rows cite **nothing at all** — no URL, no source, no date, and a generic note saying only that requirements are unresearched.

Awaiting-data should mean "the requirements are unread", not "we are not sure this course exists". The rule separates the two so the backlog is a research-target list rather than an implicit claim.

**False-positive risk: very low, and independently corroborated.** It fires on exactly 8 records — and those 8 turn out to be **precisely the 8 rows in the catalogue that have no 2027 counterpart at all**, a property the rule never looks at. Two unrelated signals identifying the same eight records is about as much confirmation as a heuristic can earn.

**Why a warning and not an error.** These rows are **unevidenced, not disproven**. Asserting they do not exist would be the same error in the opposite direction, and the brief is explicit: preserve the uncertainty. The remedy is to verify or drop them, not to quietly keep them.

**Regression coverage.** Exact count (8), exact universities (`bath`, `kcl`, `qmul`), the inverse assertion that no York/Lancaster/Southampton row trips it, a synthetic firing case, a synthetic non-firing case, and an assertion that the severity is warning and never error.

### 9.5 Rules deliberately not built

- **`suspicious-paired-award`** — not added, per the brief. Instead, an assertion confirms **no rule assumes a pair must exist** (§8 Audit C).
- **`study-option-own-shell`** and **`study-option-own-eligibility`** — remain **structurally impossible**, not merely validated. `StudyOption` is display-only: it is not a `Course`, so it cannot enter the shell generator or the eligibility engine. Assertions confirm this from the outside.

---

## 10. Eligibility-engine changes

**None.**

No matching logic was changed. No Batch 7 evidence exposed a bug in the engine.

Every behaviour listed in the brief is preserved and asserted: standard-offer headline eligibility; contextual offers never improving a headline verdict; ranges and bands producing review where not deterministically scorable; conditional tests non-blocking; awaiting-data and awaiting-publication both producing insufficient information; FM silence reading as `no-stated-preference` rather than `unknown`; and pathways producing no separate eligibility result.

Lancaster's 40 unreadable subject sections were handled **within** the existing engine using the existing `manual-review` constraint, which is exactly the "return review rather than invent logic" instruction. A new admissions structure did not require new machinery.

---

## 11. Schema changes

**One, and it is a taxonomy value rather than a structural change.**

`'nuclear'` was added to `EngineeringSubcategory`, with the label "Nuclear Engineering" and the blurb "Reactor systems, radiation, fuel cycles and decommissioning."

**Why it was necessary.** Lancaster publishes Nuclear Engineering as a full discipline with its own seven UCAS codes. Imperial has two nuclear courses already in the catalogue. Without the value, seven genuine Lancaster applications would have had to be filed under a subcategory that misdescribes them, which is a data error dressed up as a schema convenience.

**No change to `Course` or `StudyOption` was required.** Lancaster's common-first-year structure — the hardest structure in the batch — is fully represented by existing `studyOptions` and `notes`, as the brief asked. `StudyOption` remains display-only.

---

## 12. Tests

| | |
|---|---|
| **PASS** | **687** |
| **FAIL** | **0** |
| New assertions this batch | **88** |
| Prior 599 assertions | **all still passing, none weakened** |

All 30 test areas named in Part 16 are covered. Highlights:

- York: no Mechanical, Civil, Chemical or Aerospace application exists; real engineering identities distinct by actual UCAS code; physics BSc/MPhys identities distinct where separately coded
- Lancaster: General Engineering distinct; named disciplines distinct; common first year does not collapse applications; internal specialisms are not applications
- Sheffield `H100` and Leeds `H795` trust states reflect actual verification completeness
- Manchester `J501` is one parent; every pathway searchable via the parent; no pathway gets a shell
- Every identity rule asserted **both quiet on the live catalogue and firing on a synthetic case** — a validator that cannot fail is not a check
- FM `no-stated-preference` does not cause insufficient-information, while a genuinely unread FM field stays `unknown` and says so
- Every Batch 7 record with data cites its own university's domain over HTTPS, with a check date and a page title
- A\* integrity: no Batch 7 record silently upgrades a grade profile
- Fixtures remain unreachable from production

---

## 13. Validation

### Production

| | |
|---|---|
| **Errors** | **0** |
| Warnings | 270 |
| Info | 270 |
| Duplicates / conflicts | **0** |

**Identity warnings — 8**

| Rule | Count |
|---|---|
| `unevidenced-identity` | 8 |
| `same-code-multiple-live-identities` | 0 |
| `pathway-as-course-risk` | 0 |
| `unsupported-ucas-code` | 0 |

**Admissions-data warnings — 262**

| Rule | Count |
|---|---|
| `required-subject-without-minimum` | 164 |
| `unparsed-grade-profile` | 70 |
| `test-without-url` | 26 |
| `fm-unknown` | 2 |

**Provenance / info — 270**

| Rule | Count |
|---|---|
| `missing-raw-text` | 224 |
| `deadline-without-date` | 46 |

Warnings rose from 236 to 270. **Every one of the 34 is truthful and none was eliminated by inventing data.** They come from genuinely new records: York and Lancaster publish subject requirements without subject-specific minimum grades (`required-subject-without-minimum`), and the 8 new identity warnings are the point of §9.4. `fm-unknown` sits at 2 — the only two records where research completeness itself is genuinely uncertain, which is exactly what `unknown` is reserved for.

### Fixtures

Validated separately and excluded from production totals: **0 errors, 1 warning, 0 duplicates.** An assertion confirms no fixture reached the Batch 7 set.

---

## 14. Awaiting-data backlog cleanup

**Before: 20 rows. After: 60 rows.**

The backlog grew, and that is the correct outcome. York and Lancaster contributed 47 rows whose **identities are verified** and whose requirements are not. Importing them as identity-only rows is more honest than either omitting real applications or inventing their requirements.

### Classification

| Category | Count | Rows |
|---|---|---|
| **A** — valid current application, still unresearched | **47** | York 22, Lancaster 25 |
| **B** — valid application, current cycle unavailable | **5** | Southampton 5 |
| **C** — pathway, convert into parent | **0** | — |
| **D** — obsolete / discontinued identity | **0** | (3 found and removed outright, §1) |
| **E** — duplicate of a verified application | **0** | (4 found and superseded) |
| **F** — identity unsupported / scaffold artefact | **8** | KCL 3, QMUL 4, Bath 1 |

### Category B — why Southampton is not category A

Southampton's 5 are a distinct case worth naming. Those pages **were read**; they would not serve 2027 requirements. On `H722` specifically, the **2027/28 tab is present but empty** — an inactive label with no content underneath — while the requirements shown sit under 2026/27. Identity is confirmed from page furniture that is not year-gated. Nothing was copied from the sibling course or from the page's own 2026/27 figures. This is a cycle problem, not a research gap.

### Category F — the 8 unevidenced rows

| University | Rows |
|---|---|
| King's College London | F303 Physics MSci · F3F5 Physics with Astrophysics BSc · H100 Engineering MEng |
| Queen Mary University of London | F300 Physics BSc · F510 Astrophysics BSc · H160 Biomedical Engineering BEng · J500 Materials Science and Engineering BEng |
| University of Bath | Electrical and Electronic Engineering MEng (no code) |

These are the lowest-trust rows in the catalogue. They cite no official URL, no source and no check date, and they are the **only 8 rows in the entire catalogue stamped 2028 with no 2027 counterpart** — a shape no researched university produces.

**They have not been deleted, and that is a deliberate call.** I have evidence that they are *unevidenced*; I have no evidence they are *wrong*. Deleting them would assert a negative I cannot support — and would remove KCL and QMUL from the catalogue entirely on the strength of an absence. They are flagged, hidden by default behind both the awaiting-data filter and the 2028 cycle, and are now the first item on the Batch 8 list. Bath's row is the one most likely to be a fake counterpart: Bath's verified set deliberately pairs some awards and not others, and this MEng has no BEng-to-MEng guarantee behind it — but Batch 6 enumerated only Bath's MEng gaps, not Bath's full catalogue, so "not researched" is the truthful label, not "does not exist".

### Clean research-target list for Batch 8

**Priority 1 — resolve or drop (8 rows).** KCL 3, QMUL 4, Bath 1. Each needs its identity confirmed against the university's own course finder, or the row removed.

**Priority 2 — admissions fields for verified identities (47 rows).**

- **York Engineering — 22.** `H105`/`H109` offers are already in the research file, deliberately unimported pending a full page read.
- **Lancaster Physics — 25.** All 25 codes confirmed; research ran out of session budget after the first two.

**Priority 3 — cycle watch (5 rows).** Southampton's five need re-checking when Southampton populates its 2027/28 tabs.

**Also carried forward, not in the backlog:** Lancaster's 40 partially-verified engineering records need their subject-requirement sections retrieved — most likely via the rendered-browser route that solved Sheffield `H100`, since the failure mode is identical.

---

## 15. 2028 shells

| | |
|---|---|
| Shells created this batch | **68** |
| Shells removed or reconciled | **0** |
| Total awaiting-publication rows | **491** (423 → 491) |

**68 = York 25 + Lancaster 42 + Manchester `F013` 1.** Every Batch 7 record carrying 2027 data earns exactly one shell; every identity-only record earns none, because no 2027 cycle was ever retrieved for it.

Confirmed and asserted:

- **One shell per application** — 0 slug+year collisions across the served catalogue
- **No shell per study option** — 0 of the 491 shells carry study options; 363 study options exist and not one produced a shell
- **No copied admissions facts** — 0 of the 491 shells carry offers. No required subjects, tests, interviews, contextual offers, GCSE rules, deadlines or raw requirement text were copied. Stable application identity only
- **2028 remains unassessable** — asserted independently of the shell contents

---

## 16. Production totals

| Metric | Batch 6 lock | Batch 7 | Change |
|---|---|---|---|
| **Served records** | 866 | **1,042** | +176 |
| Verified | 421 | **451** | +30 |
| Partially verified | 2 | **40** | +38 |
| Awaiting publication | 423 | **491** | +68 |
| Awaiting data | 20 | **60** | +40 |
| Demo | 0 | **0** | — |
| Unknown | 0 | **0** | — |

**By year:** 2027 — 543 · 2028 — 499

**By subject:** Physics — 378 · Engineering — 664

**Universities represented:** 22
**Universities with verified or partially verified data:** **20** (was 18) — York and Lancaster added

Bath, Birmingham, Bristol, Cambridge, Durham, Edinburgh, Glasgow, Imperial, **Lancaster**, Leeds, Loughborough, Manchester, Nottingham, Oxford, Sheffield, Southampton, St Andrews, UCL, Warwick, **York**

The two without verified data are King's College London and Queen Mary — the same two universities that hold 7 of the 8 unevidenced rows.

**Study options:** 196 records carry 363 options (was 152 / 305)
**Alternative UCAS codes:** 29 records

---

## 17. Browser smoke test

**63 pass · 0 fail · 0 page errors**

| § | Check | Result |
|---|---|---|
| 1 | "Mechanical Engineering" returns no York course (67 results, 0 from York) | PASS |
| 1 | "Civil Engineering" returns no York course | PASS |
| 1 | "Chemical Engineering" returns no York course | PASS |
| 1 | "Aerospace Engineering" returns no York course | PASS |
| 2 | "York Physics" reaches York | PASS |
| 2 | "Electronic and Electrical Engineering" reaches York | PASS |
| 2 | "Robotic Engineering" reaches York | PASS |
| 2 | "Intelligent Digital Health Engineering" reaches York | PASS |
| 2 | The phantom "Computer Systems and Software Engineering MEng" is gone (0 results) | PASS |
| 3 | York university page loads | PASS |
| 3 | …and shows no Mechanical/Civil/Chemical/Aerospace course | PASS |
| 4 | Lancaster university page loads | PASS |
| 4 | Lancaster Engineering is findable (40 results) | PASS |
| 4 | "Mechanical Engineering" exists at Lancaster as its own application (7 cards) | PASS |
| 4 | "Chemical Engineering" exists at Lancaster as its own application (7 cards) | PASS |
| 4 | "Nuclear Engineering" exists at Lancaster as its own application (5 cards) | PASS |
| 4 | "Mechatronic Engineering" exists at Lancaster as its own application (7 cards) | PASS |
| 4 | Its course page explains the common first year | PASS |
| 4 | …and says specialism change is conditional | PASS |
| 4 | …and it keeps its own UCAS code | PASS |
| 4 | …and its unread subject requirement is disclosed, not invented | PASS |
| 5 | Each of 5 Manchester pathways reaches Manchester | PASS ×5 |
| 5 | …and is never itself a course title | PASS ×5 |
| 5 | …and is shown as a route within the parent application | PASS ×5 |
| 5 | Manchester Materials shows J500, J501 and F013 and nothing invented | PASS |
| 5 | F013 is findable as its own application | PASS |
| 6 | No pathway has a 2028 course of its own (5 pathways checked) | PASS ×5 |
| 7 | Sheffield H100 now reads Verified | PASS |
| 7 | …and shows the subject wording it was missing | PASS |
| 7 | …and the Access Sheffield offer | PASS |
| 7 | Leeds H795 now reads Verified | PASS |
| 7 | …and still discloses Leeds' own first-party inconsistency | PASS |
| 7 | …and does not claim to have resolved it | PASS |
| 8 | "Theoretical Physics with Mathematics" shows no removed scaffold identity (FG31) | PASS |
| 8 | "Electronic Engineering" shows no removed scaffold identity (York H610 MEng) | PASS |
| 8 | No Bath record shows an invented UCAS code | PASS |
| 9 | Lancaster Engineering shows as Partially verified | PASS |
| 9 | Awaiting-data hidden by default, revealed on request (491 → 543) | PASS |
| 10 | Progressive rendering still caps first paint at 40 cards | PASS |
| 10 | …and the total is still visible | PASS |
| 10 | Load more still appends a page (40 → 80) | PASS |
| 10 | Filters still open | PASS |
| 10 | Cards still carry the Why? explanation | PASS |
| 10 | Comparison page still loads | PASS |
| 10 | Admin page loads | PASS |
| 10 | …and reports zero production validation errors | PASS |
| 10 | …and zero duplicates | PASS |

### Two probe bugs found and fixed — both instructive

The first run reported 6 failures. **All six were bugs in the test, not the product**, and both classes are worth recording because they are easy to repeat.

**Progressive rendering hides evidence from a naïve probe.** "Mechanical Engineering" returns 67 results. Lancaster's 7 records sit at positions 41+, past the 40-card first paint. The probe counted cards without paging and concluded Lancaster had no Mechanical Engineering — when in fact it has seven. Every "does university X appear" assertion now pages to the end before counting. **A test that does not page can prove an absence that is not there.**

**The correct representation looked like the failure.** The probe asserted the string "Materials Science and Engineering with Biomaterials" must not appear on the page. It does appear — because the product correctly prints **"Route within this application: Materials Science and Engineering with Biomaterials"** under the `J501` heading, which is precisely the representation Batch 7 exists to produce. The test could not ask whether the string was present; it had to ask whether the string was a **course title**. It now inspects card headings only, and additionally asserts the pathway *is* shown as a route within the parent — turning one weak negative into two strong assertions.

### Deferred deliberately

- **York Engineering admissions fields (22 courses)** — not imported, so not smoke-tested beyond identity and findability. `H105`/`H109` offers are in the research file and deliberately unimported.
- **Lancaster Physics admissions fields (25 courses)** — same.
- **Lancaster Engineering subject requirements (40 courses)** — the page section could not be retrieved. The records disclose this and return *review required*. The rendered-browser route that solved Sheffield `H100` is the Batch 8 approach.
- **The 8 unevidenced identities** — flagged, not resolved, for the reason given in §14.

---

## Closing note on the final principle

> *A marketing title is not automatically a course. A pathway is not automatically an application.*

Batch 7 met this test in both directions, and both directions mattered.

**Against over-splitting:** York's Engineering BEng publishes Year 3 option modules named *Robotics*, *Biomedical Engineering* and *Renewable Power Generation* — the same words as three separately coded York degrees. Manchester's five Materials titles have their own pages and descriptions and are entered by transfer after year two. Neither set produced a course record.

**Against over-merging:** Lancaster's six engineering disciplines share a genuine common first year and read exactly like pathways. They are six separate applications, and each has its own complete set of seven UCAS codes to prove it.

The same evidence test produced both answers. That is the point of writing it as an evidence test rather than as a preference.

Where the evidence ran out, the uncertainty was kept: 40 Lancaster records return *review required* rather than a false *meets*; 47 rows hold verified identities with unread requirements; 8 rows are flagged as unevidenced rather than deleted or trusted. The catalogue grew by 176 records and by two universities, and every one of those records says exactly as much as the evidence supports and no more.
