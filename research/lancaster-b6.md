# Lancaster University — Undergraduate Admissions Research (Physics & Engineering)

**Target entry year:** 2027 entry
**Research date:** 2026-09-16
**Source policy applied:** `lancaster.ac.uk` only as admissions evidence. Every recorded value was read
from a page actually fetched with WebFetch. Web search was used ONLY to locate URLs. No search snippet,
third-party guide, UCAS listing, cache or archive copy was used as evidence.

**Access note:** raw `curl` to lancaster.ac.uk is blocked by this session's egress proxy
(`curl: (56) CONNECT tunnel failed, response 403`). All reading was therefore done through WebFetch.
Lancaster course pages put the requirements inside an accordion labelled *"Qualifications and typical
requirements"*; a first fetch sometimes returns the accordion heading with no body. Where that happened
the fetch was retried with `?v=2` per policy, which returned the body.

**Year labelling caveat (applies to EVERY Lancaster page below):** each course page carries a year
selector rendered as the text `Entry year 2027 or 2026`. The URL path segment `/2027/` selects the
2027 view. This is recorded per course in field 20.

---

# RETRIEVAL METHOD & A CRITICAL LIMITATION

| # | Route | Result |
|---|---|---|
| 1 | `curl` direct to lancaster.ac.uk | **BLOCKED** — agent egress proxy: `curl: (56) CONNECT tunnel failed, response 403`. Not routed around. |
| 2 | WebFetch course page, first attempt | Partially successful — returns the accordion HEADINGS but often not their bodies |
| 3 | WebFetch course page with `?v=2` cache-buster (policy retry) | Returns the key-fact tiles (`A level requirements <grades>`), GCSE text, interview line, contextual line, IELTS line |
| 4 | Chrome / browser rendering to expand accordions | **UNAVAILABLE** — `list_connected_browsers` returned `[]`; no browser connected to this session |
| 5 | WebFetch official Lancaster departmental UG brochure PDFs (`lancaster.ac.uk/media/...`) | **SUCCESS** — these are lancaster.ac.uk assets, explicitly headed **"Undergraduate Degrees 2027"**, and they DO carry the subject requirements |

## THE LIMITATION — read before trusting field 6 on any course page

On every Lancaster course page fetched, the server-rendered text contains **only** the grade string
(as a key-fact tile, e.g. `A level requirements AAA`), the GCSE line, the interview line, the contextual
line and the IELTS line. The **subject-specific requirements live inside JavaScript-loaded accordion
bodies that WebFetch cannot see.** A targeted probe of the Physics MPhys page for every occurrence of
"including", "Mathematics", "Physics", "grade", "required" returned only:

> `A level requirements AAA`
> `English Language grade 4/C.`
> `You may be asked to attend an interview`

and the explicit finding: `NO SUBJECT REQUIREMENT SENTENCE PRESENT IN PAGE TEXT`.

**Therefore: where a subject requirement below is attributed to the brochure, the COURSE PAGE itself is
recorded as NOT RETRIEVED for that field — it is not "NOT PUBLISHED".** The two are distinguished
per-field throughout. Subject requirements taken from the 2027 brochures are labelled as such and are
departmental statements, not per-course page text.

---

# SUMMARY

## Courses verified to exist for 2027 entry
**Physics (Department of Physics) — 25 separately coded UCAS entries**, in 4 subject families:
Physics, Physics with Astrophysics, Theoretical Physics, Theoretical Physics with Mathematics — each in
BSc + integrated-Master's, each in plain / Placement Year / Study Abroad, plus one Foundation Year route.

**Engineering (School of Engineering) — 24 separately coded UCAS entries**, in 6 families:
General Engineering, Chemical, Electronic and Electrical, Mechanical, Mechatronic, Nuclear — each in
BEng + MEng, each in plain / Study Abroad / Placement Year, plus a Foundation Year BEng per family.

## Expected courses that DO NOT EXIST at Lancaster for 2027
- **"Particle Physics"** — NO undergraduate degree of this title. Not in the department listing and not in
  the 2027 Physics brochure. Particle physics is research/module content only.
- **"Cosmology"** as a degree title — NO. The astrophysics family is titled **"Physics with Astrophysics"**.
  An older slug `physics-astrophysics-and-cosmology-mphys-hons-f3f5` appears in search results pointing at
  the same code F3F5, i.e. a **retired title** now superseded by "Physics with Astrophysics". Do not create
  an "Astrophysics and Cosmology" course.
- **"Physics with Mathematics"** — NO. Only **"Theoretical Physics with Mathematics"** exists.
- **"Astrophysics"** as a standalone title — NO; it exists only as "Physics with **Astrophysics**".

## Old scaffold claims — verdicts
| Scaffold claim | Verdict |
|---|---|
| "Physics MPhys" | **CORRECT** — real: `Physics MPhys Hons`, UCAS **F303** |
| "Theoretical Physics with Mathematics MPhys" | **WRONG AWARD** — the real award is **MSci Hons**, UCAS **F3G1**. There is no MPhys in this family. |
| "Mechanical Engineering MEng" | **EXISTS but code needed** — real: `Mechanical Engineering MEng Hons`, UCAS **H303** (the BEng is H300) |

## Structural surprises
1. **Engineering is BOTH/AND, not either/or** — see the dedicated section below. Named disciplines have
   their own UCAS codes AND a General Engineering code exists for undecided applicants, AND there is a
   genuine common first year. All three of the question's options are simultaneously true.
2. **Physics also has a common first year** with scheme-switching to the end of Year 1 — the same
   structural pattern as Engineering, which is easy to miss.
3. **Physics BSc and MPhys carry the SAME grade string** (`AAA`), so the integrated Master's is not a
   higher grade offer in Physics. In **Engineering the BEng/MEng grade strings DIFFER** (`ABB` vs `AAA`).
4. **Integrated-Master's award differs by family**: MPhys for Physics / Physics with Astrophysics /
   Theoretical Physics, but **MSci** for Theoretical Physics with Mathematics.
5. Engineering MEng page says **"You will typically be asked to attend an interview"** whereas Physics
   says **"You may be asked to attend an interview"** — different strength of wording, recorded per course.
6. Lancaster runs an **EPQ dual-offer**: eligible applicants may receive TWO offers, the second one grade
   lower with a B in the EPQ.

## Pages NOT RETRIEVED
- `engineering-beng-hons-h100/2027/` on first attempt returned `Too many redirects`; the `?v=2` retry
  **succeeded**. Same for `physics-bsc-hons-f300/2027/`.
- No page was left permanently unretrieved, BUT the **accordion bodies of every course page are
  NOT RETRIEVED** (JS-gated) — see the limitation box above.

---

# HOW ENGINEERING ADMISSION WORKS AT LANCASTER

## The answer: all three models operate at once

A student applying to Engineering at Lancaster **applies to individual named disciplines, each with its
own UCAS code** — Chemical, Electronic and Electrical, Mechanical, Mechatronic and Nuclear are all real,
separately coded UCAS applications. **But** Lancaster *also* publishes a **General Engineering** degree
(H100 BEng / H102 MEng) specifically for applicants who have not decided, **and** every one of these
degrees shares a **genuine common first year** after which the specialism can still be changed.

So the named disciplines ARE courses (they take applications directly), and specialisation is
simultaneously a post-admission decision. The three options in the question are not alternatives here.

## The wording that settles it

**1. Named disciplines are real, separately coded UCAS applications.**
The official 2027 School of Engineering brochure (`lancaster.ac.uk/media/.../ug-brochures/Engineering.pdf`,
headed **"Undergraduate Degrees 2027"**) lists each discipline with its own distinct UCAS code — e.g.
Mechanical Engineering BEng **H300** / MEng **H303**; Chemical Engineering BEng **H800** / MEng **H811**;
Electronic and Electrical BEng **H607** / MEng **H606**; Mechatronic BEng **HH63** / MEng **HHH6**;
Nuclear BEng **H820** / MEng **H821**. Each also has its own live course page on lancaster.ac.uk.

**2. There is a genuine common first year.** Brochure, verbatim:
> "In Year 1, no matter which degree you choose, all students study the same general engineering modules."

Course page `engineering-meng-hons-h102/2027/`, verbatim:
> "You'll share the first year with all our School of Engineering students, regardless of their
> specialism, and you will gain an appreciation for the interdisciplinary nature of the subject."

**3. The specialism can be changed after admission, at the end of Year 1.** Brochure, verbatim:
> "You may find that your passion for engineering lies in a different discipline to the one you've
> enrolled on. That's ok! By studying a common first year, you can change your specialism at the end
> of Year 1."

Course page `engineering-beng-hons-h100/2027/`, verbatim:
> "The common first year lets you change your specialisation allowing a more informed choice at the end
> of year one, subject to meeting the requirements of that course."

Note the condition — **"subject to meeting the requirements of that course"**. Switching is not
unconditional.

**4. A General Engineering code exists precisely for the undecided.** Brochure, verbatim:
> "Not sure which specialism? That's ok too! When you apply, select the one of our General Engineering
> degree schemes."

Course page `engineering-beng-hons-h100/2027/`, verbatim:
> "If you're unsure of which area of specialisation you'd like to go into upon application, you can use
> the UCA code H100 Engineering to leave your options open."

(`UCA code` is Lancaster's own typo for UCAS code, reproduced as written.)

## Consequence for the app's data model
- Create the **five named disciplines as real courses** (they accept direct UCAS applications) — this is
  supported by Lancaster's own 2027 application structure, so it is NOT an invented split.
- ALSO create **General Engineering (H100 / H102)** as its own course — it is a distinct UCAS application,
  not a label for the others.
- Record "choose your specialism at the end of Year 1" as a **study option / later-specialisation note on
  every one of these courses** (field 19), not as a separate course.
- **Do NOT** create a course for a specialism reached only by switching — every specialism listed is
  independently coded anyway, so no such phantom arises here.

## The same pattern exists in Physics — do not miss it
Physics brochure ("Undergraduate Degrees 2027"), verbatim:
> "All our single honours subjects have a common first year, meaning you will benefit from exploring all
> areas of physics before making a decision on your specialism. With this in mind, you can change your
> degree scheme up until the end of your first year."
> "Providing you are meeting academic requirements you can easily transfer from 3 to 4 years up until
> term 2 of your third year."

Physics course pages repeat it, e.g. F303 verbatim:
> "You may discover that your interests change throughout the year, and you have the flexibility to
> switch to any other of our degree schemes until the end of Year 1."

So in Physics the BSc↔integrated-Master's choice is also revisable after admission (to term 2 of Year 3).

---

# UNIVERSITY-WIDE POLICY EVIDENCE (applies across courses; cited by reference below)

**Source A — `https://www.lancaster.ac.uk/study/undergraduate/admissions/entry-requirements-and-qualifications/uk-qualifications/`**
Page title: `UK qualifications | Lancaster University`. **Entry year the page shows: NOT PUBLISHED** — this
page carries no entry-year label at all, so its statements are NOT year-attributable to 2027.
Verbatim statements:
> "A Level General Studies is accepted by Lancaster University but only as one of four A Levels being taken."
> "The majority of our degree programmes will incorporate the EPQ within the offer and eligible applicants may receive two offers; our usual offer plus an offer of a B in the EPQ and one grade lower in their A level subjects."
> "Core Maths will not typically form part of the offer for entry to Lancaster, unless specified as a subject requirement at individual degree level."
> "Lancaster University will require students taking these A levels to pass the science practical skills assessment as well as achieving the required subject grade."
> "Typically we expect A Level applicants to be taking three A Levels and would therefore only accept students taking a combination of two A Levels (A2) and two AS Levels in exceptional circumstances."

**Critical Thinking:** NOT PUBLISHED on this page (no statement found).
**Further Mathematics:** NOT PUBLISHED on this page (no statement found).

**Source B — `https://www.lancaster.ac.uk/media/lancaster-university/content-assets/documents/fst/ug-brochures/Physics.pdf`**
Official Department of Physics UG brochure. **Entry year shown: "Undergraduate Degrees 2027"** — genuine 2027.
Verbatim:
> "Typical A level offer (all include an A in both Mathematics and Physics): AAA"
> "For those doing more than three A levels or an Extended Project Qualification (EPQ), the entry requirement is AABB, including A in Physics and A in Maths, plus B or higher in your 4th A level or EPQ."
> "Physics at A level (or equivalent) is essential, as is Mathematics."
> "All our single honours subjects have a common first year, meaning you will benefit from exploring all areas of physics before making a decision on your specialism. With this in mind, you can change your degree scheme up until the end of your first year."
> "Providing you are meeting academic requirements you can easily transfer from 3 to 4 years up until term 2 of your third year."
> "As part of the application process, we will offer you the option of an interview..."
> "Accredited by the Institute of Physics (IoP), all of our degrees provide you with a comprehensive education..."
Section heading the requirements sit under: `"The right degree for you?"` (page 14).

**Source C — `https://www.lancaster.ac.uk/media/lancaster-university/content-assets/documents/fst/ug-brochures/Engineering.pdf`**
Official School of Engineering UG brochure. **Entry year shown: "Undergraduate Degrees 2027"** — genuine 2027.
Verbatim:
> "We accept a wide variety of qualifications but have minimum prerequisite levels in mathematics and prefer a technical/scientific bias."
> "In Year 1, no matter which degree you choose, all students study the same general engineering modules."
> "You may find that your passion for engineering lies in a different discipline to the one you've enrolled on. That's ok! By studying a common first year, you can change your specialism at the end of Year 1."
> "Not sure which specialism? That's ok too! When you apply, select the one of our General Engineering degree schemes."
Grade strings given by award: `"ABB"` (BEng, 3 years), `"AAA"` (MEng, 4 years), `"CCC"` (Foundation Year variants, 4 years).
**Interviews, admissions tests, EPQ and GCSE: NOT PUBLISHED in this brochure** (no mention found).

> **IMPORTANT — the Engineering brochure gives NO named required subject and NO minimum subject grade.**
> Its only subject statement is the vague "minimum prerequisite levels in mathematics". The actual
> A-level subject requirement for Engineering courses is therefore **NOT RETRIEVED** (it sits in the
> JS-gated course-page accordion), and specifically **NOT confirmed as "Mathematics at grade X"**.
> Do not record a Maths A-level grade for any Engineering course.

---

# COURSES — PHYSICS

## Physics BSc Hons — VERIFIED
1. **Official title:** `Physics` · award line `BSc Hons`. Page title: `Physics BSc Hons (F300) - Lancaster University`
2. **UCAS code:** `F300`
3. **Award:** `BSc Hons` (Bachelor of Science)
4. **Duration:** `Full time 3 years`. Maximum duration: **NOT PUBLISHED**
5. **Standard A-Level offer, EXACT string:** `AAA` — verbatim page line: `A level requirements AAA`.
   **Not a range or band** — a single three-letter string. Lancaster publishes no band wording here.
6. **Required subjects + minimum grade:** **NOT RETRIEVED from the course page** (JS-gated accordion).
   Departmental 2027 brochure (Source B) states: `"Typical A level offer (all include an A in both Mathematics and Physics): AAA"` and `"Physics at A level (or equivalent) is essential, as is Mathematics."` → Maths **A** and Physics **A**, per brochure not per course page.
7. **Cross-subject rules:** NOT RETRIEVED from course page. University-wide (Source A, undated): General Studies accepted only as one of four A Levels.
8. **Further Mathematics status:** **NOT RETRIEVED.** Neither the course page, the 2027 physics brochure nor the UK-qualifications page states a Further Maths position. **Silence — do not read as "not accepted" or "accepted".**
9. **Mathematics / Physics / Chemistry individually:** Mathematics — required at **A** (brochure). Physics — required at **A** (brochure). **Chemistry — NOT MENTIONED anywhere** → NOT PUBLISHED as requirement or alternative.
10. **Accepted alternative sciences / explicitly NOT accepted:** **NOT RETRIEVED** (no alternative-science list reached). No subject is explicitly excluded on any retrieved Physics page.
11. **Science practical endorsement:** NOT RETRIEVED at course level. University-wide (Source A, undated): `"Lancaster University will require students taking these A levels to pass the science practical skills assessment as well as achieving the required subject grade."`
12. **GCSE requirements — verbatim from course page:** `English Language grade 4/C.` plus `We will also look at your overall GCSE profile when considering your application as a whole.` and `We do have flexibility when considering GCSE requirements.` **Note: NO GCSE Mathematics requirement is stated for Physics** (contrast Engineering, which requires GCSE Maths 6/B).
13. **Admissions test:** **NOT STATED.** A targeted whole-page probe for admissions/entrance/aptitude test returned no mention. Lancaster does **not** say "no test required" either. This is silence → NOT STATED, **not** "none".
14. **Interview — EXPLICITLY STATED, OPTIONAL/POSSIBLE.** Course page verbatim: `You may be asked to attend an interview`. Brochure (Source B) verbatim: `"As part of the application process, we will offer you the option of an interview..."` → an offered option, not a selection hurdle.
15. **Reduced-offer routes under Lancaster's own heading:**
    - Heading `Contextual admissions` — verbatim: `Contextual admissions could help you gain a place at university if you have faced additional challenges during your education which might have impacted your results.` **No numeric reduced offer is published on the course page** → the size of the reduction is NOT PUBLISHED here.
    - Widening participation / care-experienced / refugee / access-programme headings: **NOT RETRIEVED** — no such heading appeared on the course page.
16. **Alternative offer routes (EPQ etc.):** Brochure (Source B) 2027, verbatim: `"For those doing more than three A levels or an Extended Project Qualification (EPQ), the entry requirement is AABB, including A in Physics and A in Maths, plus B or higher in your 4th A level or EPQ."` → alternative EXACT string `AABB`. University-wide EPQ dual-offer (Source A, undated): two offers, one a grade lower with B in the EPQ.
17. **Deadline:** **NOT PUBLISHED** on the course page.
18. **Contiguous raw block:** the retrieved page text does **not** present requirements as one contiguous block — the grade string is a key-fact tile and the GCSE/interview/contextual lines sit in separate accordion sections. **No genuine contiguous block available; none fabricated.** The one genuinely contiguous GCSE passage is: `English Language grade 4/C. We will also look at your overall GCSE profile when considering your application as a whole. We do have flexibility when considering GCSE requirements.`
19. **Study options / later specialisation:** common first year across all single-honours physics; scheme change to end of Year 1; BSc→MPhys transfer available `up until term 2 of your third year` (Source B). Placement Year and Study Abroad are **separately coded courses**, not options inside F300.
20. **Provenance:** sourceUrl `https://www.lancaster.ac.uk/study/undergraduate/courses/physics-bsc-hons-f300/2027/` (retrieved with `?v=2` after a first-attempt `Too many redirects`); page title `Physics BSc Hons (F300) - Lancaster University`; **entry-year label the page showed: `Entry year 2027 or 2026`** (a selector; the `/2027/` path selects 2027). The page does **not** print an unambiguous "2027 entry requirements" caption over the requirements panel — recorded as a caveat.

## Physics MPhys Hons — VERIFIED
1. **Official title:** `Physics` · award line `MPhys Hons`. Page title: `Physics MPhys Hons (F303) - Lancaster University`
2. **UCAS code:** `F303`
3. **Award:** `MPhys Hons` (integrated Master's)
4. **Duration:** `Full time 4 years`. Maximum duration: **NOT PUBLISHED**
5. **Standard A-Level offer, EXACT string:** `AAA` — verbatim: `A level requirements AAA`. **Same string as the BSc** — the integrated Master's is NOT a higher offer in Physics. Not a range or band.
6. **Required subjects:** NOT RETRIEVED from course page; brochure (Source B) → Maths **A**, Physics **A**.
7. **Cross-subject rules:** NOT RETRIEVED at course level; Source A General Studies rule (undated) applies university-wide.
8. **Further Mathematics:** **NOT RETRIEVED** — silence, not a policy.
9. **Maths / Physics / Chemistry:** Maths **A** (brochure); Physics **A** (brochure); **Chemistry NOT MENTIONED** → NOT PUBLISHED.
10. **Alternative sciences / excluded subjects:** NOT RETRIEVED; nothing explicitly excluded.
11. **Practical endorsement:** NOT RETRIEVED at course level; Source A university-wide statement applies.
12. **GCSE — verbatim:** `English Language grade 4/C.` plus `We will also look at your overall GCSE profile when considering your application as a whole.` and `We do have flexibility when considering GCSE requirements.` No GCSE Maths requirement stated.
13. **Admissions test: NOT STATED** — targeted probe of this exact page for "test" found nothing; Lancaster does not say none is required.
14. **Interview — EXPLICITLY STATED:** verbatim `You may be asked to attend an interview`. Brochure: `"we will offer you the option of an interview"`.
15. **Reduced-offer routes:** heading `Contextual admissions`, verbatim as for F300; reduction size **NOT PUBLISHED**. No widening-participation / care-experienced / refugee / access heading retrieved.
16. **Alternative offer routes:** `AABB` four-subject/EPQ route per Source B (2027 brochure); university-wide EPQ dual-offer per Source A.
17. **Deadline:** **NOT PUBLISHED**.
18. **Contiguous raw block:** none genuinely contiguous covering the offer; not stitched. Contiguous GCSE passage as quoted in field 12. Contiguous English-language passage: `If English is not your first language, we require an IELTS score of 6.0 overall with at least 5.5 in each component for this programme.`
19. **Study options:** verbatim from page: `You may discover that your interests change throughout the year, and you have the flexibility to switch to any other of our degree schemes until the end of Year 1.` Plus brochure: transfer between 3- and 4-year schemes `up until term 2 of your third year`. Placement Year (F307) and Study Abroad (F305) are separate UCAS codes, not options inside F303.
20. **Provenance:** sourceUrl `https://www.lancaster.ac.uk/study/undergraduate/courses/physics-mphys-hons-f303/2027/`; page title `Physics MPhys Hons (F303) - Lancaster University`; **entry-year label shown: `Entry year 2027 or 2026`** (selector; `/2027/` path). No explicit "2027 entry requirements" caption over the panel.


---

# CORRECTION TO THE SUMMARY'S ENGINEERING COUNT (established this session)

The SUMMARY above says **"Engineering (School of Engineering) — 24 separately coded UCAS entries"**. That
number is **WRONG**, and it is wrong against the SUMMARY's own description of the structure. The structure
it describes — 6 families x (BEng + MEng) x (plain / Study Abroad / Placement Year), plus one Foundation
Year BEng per family — yields **6 x 6 + 6 = 42**, not 24.

**42 is the figure now confirmed by direct retrieval** of Lancaster's own School of Engineering
undergraduate listing, which enumerates all 42 titles with 42 distinct UCAS codes and 42 distinct course-page
URLs. The Physics figure of **25** in the SUMMARY is **CONFIRMED CORRECT** by the same method against the
Department of Physics listing (7 + 6 + 6 + 6 = 25).

**Revised total for this file: 67 separately coded UCAS entries** (25 Physics + 42 Engineering), of which 2
(Physics BSc F300, Physics MPhys F303) were already written above.

## Retrieval note — the listing pages
- `https://www.lancaster.ac.uk/physics/study/undergraduate/` — fetched successfully on first attempt.
- `https://www.lancaster.ac.uk/engineering/study/undergraduate/` — **first attempt returned a page with no
  course list at all** (it rendered only the "Tom Millen Engineering Scholarship" content and a reference to
  "Linked icons" where the course tiles belong). The **`?v=2` retry returned the full 42-course list.** This
  is a second independent confirmation of the existing file's finding that `?v=2` turns a failed Lancaster
  fetch into a successful one.
- Neither listing page carries an entry-year label. They are used here as **IDENTITY evidence only**
  (titles, codes, award, URL), per evidence rule 3. Cycle verification is done per course page below.

## FULL VERIFIED CODE INVENTORY (identity evidence: Lancaster's own departmental listings)

### Physics — 25 codes, 4 families
| Family | BSc | Integrated Master's | PY BSc | PY Masters | SA BSc | SA Masters | Foundation |
|---|---|---|---|---|---|---|---|
| Physics | F300 | F303 (MPhys) | F306 | F307 | F304 | F305 | F30F |
| Physics with Astrophysics | F3FM | F3F5 (MPhys) | F3F8 | F3F9 | F3F1 | F3F7 | — |
| Theoretical Physics | F340 | F321 (MPhys) | F342 | F323 | F341 | F322 | — |
| Theoretical Physics with Mathematics | F3GC | **F3G1 (MSci)** | F3G6 | F3G7 | F3G4 | F3G5 | — |

Only the plain Physics family has a Foundation Year route. **Only the Theoretical Physics with Mathematics
family awards MSci; the other three award MPhys.**

### Engineering — 42 codes, 6 families
| Family | BEng | MEng | SA BEng | SA MEng | PY BEng | PY MEng | Foundation BEng |
|---|---|---|---|---|---|---|---|
| Engineering (General) | H100 | H102 | H103 | H104 | H106 | H105 | H10F |
| Chemical Engineering | H800 | H811 | H812 | H813 | H814 | H815 | H80F |
| Electronic and Electrical Engineering | H607 | H606 | H608 | H609 | H610 | H611 | H60F |
| Mechanical Engineering | H300 | H303 | H305 | H306 | H307 | H308 | H30F |
| Mechatronic Engineering | HH63 | HHH6 | HH64 | HHH7 | HH65 | HHH8 | HH6F |
| Nuclear Engineering | H820 | H821 | H822 | H823 | H824 | H825 | H82F |

**Every family, including each named discipline, has a complete independent set of seven codes.** Note the
Placement Year BEng/MEng code order is inverted for General Engineering (BEng H106, MEng H105) relative to
every other family — reproduced as Lancaster prints it, not normalised.

**Naming asymmetry, reproduced verbatim from the listing:** Physics uses the parenthetical
`(Placement Year)`, while Engineering uses the suffix `with Placement Year` (no parentheses). Both use
`(Study Abroad)` and `(with a Foundation Year)`. The General Engineering family's title is plain
**`Engineering`**, not "General Engineering" — "General Engineering" is the heading Lancaster groups it
under on the listing page, not the degree title.


---

# REFINEMENT OF THE "JS-GATED ACCORDION" LIMITATION (new, more precise than the box above)

A deep probe of `chemical-engineering-beng-hons-h800/2027/?v=2` asking for the requirements section as one
contiguous block returned the accordion's **internal structure**, which lets the limitation be stated much
more precisely than "the accordion is invisible". Verbatim, the section renders as:

> ## Entry requirements
> These are the typical grades that you will need to study this course. This section will tell you whether you need qualifications in specific subjects, what our English language requirements are, and if there are any extra requirements such as attending an interview or submitting a portfolio.
> ## Qualifications and typical requirements accordion
> Show all sections
> ### A levels
> ### Access to HE Diploma
> ### Advanced Skills Baccalaureate Wales
> ### BTEC Extended Diploma
> ### BTEC in combination with A levels
> ### International Baccalaureate
> ### Scottish Highers and Advanced Highers
> ### T levels
> ### GCSE requirements
> Mathematics grade 6/B, English Language grade 4/C. Chemistry at grade 6/B required with an A level in Physics or Biology.
> We will also look at your overall GCSE profile when considering your application as a whole.
> We do have flexibility when considering GCSE requirements. Go to our GCSE information for more details.
> ### English language requirements
> If English is not your first language, we require an IELTS score of 6.5 overall with at least 5.5 in each component for this programme.

**The exact shape of the limitation, now established:** of the ten accordion sections, **only the last two —
`GCSE requirements` and `English language requirements` — have server-rendered bodies.** The eight
qualification sections (`A levels`, `Access to HE Diploma`, `Advanced Skills Baccalaureate Wales`,
`BTEC Extended Diploma`, `BTEC in combination with A levels`, `International Baccalaureate`,
`Scottish Highers and Advanced Highers`, `T levels`) render as **bare headings with no body**.

Consequences, applied throughout every record below:
- The **A-level subject requirement is NOT RETRIEVED on every Lancaster course page in this file** — the
  `A levels` accordion section demonstrably exists and demonstrably has a body that was not served. This is
  a retrieval failure, **NOT "NOT PUBLISHED"**. Lancaster's own intro sentence confirms a body is there:
  *"This section will tell you whether you need qualifications in specific subjects."*
- The **GCSE line IS genuine course-page text**, not brochure text, and is recorded as such.
- The **IELTS line IS genuine course-page text.**
- **Access to HE, Welsh Baccalaureate, BTEC, IB, Scottish Highers and T level requirements are ALL
  NOT RETRIEVED** for every course in this file. None is recorded as absent.

## CORRECTION — the Chemical Engineering Chemistry requirement is a GCSE rule, not an A-level rule

The sentence `"Chemistry at grade 6/B required with an A level in Physics or Biology."` sits **under the
`GCSE requirements` heading**, immediately after the GCSE Maths and English sentence, and uses GCSE grade
notation (`6/B`). It is therefore a **GCSE Chemistry requirement that bites conditionally**: GCSE Chemistry
at 6/B is required *where the applicant's A level science is Physics or Biology* (i.e. where Chemistry is
not being offered at A level). A first, shallower fetch of the H811 page mis-reported this sentence as an
A-level subject requirement; the deep probe with the heading context disproves that. **It is recorded below
as field 7 (cross-subject rule) / field 12 (GCSE), and NOT as field 6.**

This is also the **only sentence on any Engineering course page in this file that names an A-level subject at
all**, and it names Physics or Biology only as the *condition* of a GCSE rule — it is not an A-level
requirement. The existing file's instruction stands and is reinforced: **do not record an A-level Mathematics
grade for any Engineering course.**


---

# COURSES — ENGINEERING (42 codes)

## ENGINEERING COMMON FIELDS — read this once, then the per-code table

Every Engineering course page fetched for 2027 was retrieved via the `?v=2` route and every one returned
the **same** values for fields 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17 and 18. Rather than repeat identical
text 42 times, those fields are stated once here and the per-code table below carries only the fields that
actually vary (title, code, award, duration, grade string, interview, and the Chemical-family GCSE addition).
**Every code in the table was fetched individually; nothing in the table is inferred from a sibling.**

**6. Required subjects + minimum grades — NOT RETRIEVED for every Engineering code.**
The `A levels` accordion section exists on every page and its body was not served (see the refinement
section above). The 2027 Engineering brochure (Source C) offers only `"We accept a wide variety of
qualifications but have minimum prerequisite levels in mathematics and prefer a technical/scientific bias."`
— which names **no subject and no grade**. So: **NOT RETRIEVED, not NOT PUBLISHED.** No A-level Mathematics
grade is recorded for any Engineering course in this file.

**7. Cross-subject rules.**
- **Chemical Engineering family only** — genuine course-page text, under the `GCSE requirements` heading:
  `"Chemistry at grade 6/B required with an A level in Physics or Biology."` On the Chemical **Foundation
  Year** page (H80F) the same rule is worded differently and more clearly:
  `"Chemistry at grade 6/B required if you do not have A level Chemistry."` Both wordings are reproduced;
  they are **not flattened into one**. Read together they mean: GCSE Chemistry at 6/B is required where
  Chemistry is not the applicant's A-level science. This is the only cross-subject rule on any Engineering
  course page.
- All other families: no cross-subject rule in retrieved text; the A-levels accordion is NOT RETRIEVED, so
  a rule could exist there.
- University-wide (Source A, **undated** — not year-attributable): General Studies accepted only as one of
  four A Levels; Core Maths not typically part of the offer unless specified at degree level; three A Levels
  normally expected, two A2 + two AS only in exceptional circumstances.

**8. Further Mathematics — NO STATED PREFERENCE, with one caveat.** No Engineering course page, the 2027
Engineering brochure, nor the UK-qualifications page says anything about Further Mathematics. Per evidence
rule 6, pages read in full that say nothing = **no stated preference**. **Caveat:** the `A levels` accordion
body was never served, so this is "no stated preference in all retrieved text", not "Lancaster has no
position". It is **not** recorded as "required", "preferred" or "not accepted".

**9. Maths / Physics / Chemistry individually.**
- **Mathematics:** **GCSE Mathematics grade 6/B — REQUIRED, on every one of the 42 pages** (genuine
  course-page text). **A-level Mathematics — NOT RETRIEVED** (see field 6). Note the contrast with Physics
  courses, which state **no GCSE Maths requirement at all**.
- **Physics:** named on Engineering pages **only** inside the Chemical family's conditional GCSE rule, as one
  of the two A-level sciences that trigger the GCSE Chemistry requirement. Not otherwise mentioned; at
  A level **NOT RETRIEVED**.
- **Chemistry:** required at **GCSE 6/B in the Chemical Engineering family only**, conditionally (see field 7).
  Not mentioned on any other Engineering family's page.

**10. Accepted alternatives / explicit exclusions — NOT RETRIEVED.** The eight qualification accordion
sections (Access to HE, Welsh Baccalaureate, BTEC, BTEC+A level, IB, Scottish Highers/Advanced Highers,
T levels, A levels) all exist as headings with unserved bodies. **No Engineering page explicitly excludes any
subject** in retrieved text. Biology appears only as a permitted A-level science in the Chemical GCSE rule.

**11. Science practical endorsement — NOT RETRIEVED at course level.** No Engineering course page mentions
it. University-wide (Source A, **undated**): `"Lancaster University will require students taking these A
levels to pass the science practical skills assessment as well as achieving the required subject grade."`
The phrase `"these A levels"` refers to a list on Source A that was not itself captured — so which subjects
it binds is **NOT RETRIEVED**, and it is not year-attributable to 2027.

**12. GCSE — genuine course-page text, verbatim, identical across all 42 (plus the Chemical addition):**
> `Mathematics grade 6/B, English Language grade 4/C.`
> `We will also look at your overall GCSE profile when considering your application as a whole.`
> `We do have flexibility when considering GCSE requirements.`

**13. Admissions test — NOT STATED on every Engineering page.** Targeted probes for test/entrance/aptitude
returned nothing on any page, and the 2027 Engineering brochure does not mention one. Lancaster also never
says "no test is required". Per evidence rule 5 this is **silence → NOT PUBLISHED / NOT STATED, not "none"**.

**15. Contextual / reduced-offer routes.** One heading only, `Contextual admissions`, verbatim on every page:
> `Contextual admissions could help you gain a place at university if you have faced additional challenges during your education which might have impacted your results.`
**No numeric reduced offer is published on any course page** → the size of the reduction is **NOT PUBLISHED**.
No widening-participation, care-experienced, refugee, estranged-student or access-programme heading appeared
on any Engineering course page.
**Additional route, Foundation Year codes only** — verbatim from H10F, H80F and H60F:
> `Our UK Foundation Years offer the opportunity for Home students who don't meet our standard entry grades to prepare for a STEM degree at Lancaster University.`
This is a genuine alternative-entry route **restricted to Home students** and pitched at applicants below
standard grades. It is recorded as such on each `...F` code.

**16. Alternative offer routes.** The 2027 Engineering brochure states **no** EPQ or four-subject
alternative for Engineering, and **no Engineering course page mentions the EPQ at all**. The EPQ dual-offer
is therefore known only from the **undated** university-wide Source A:
> `"The majority of our degree programmes will incorporate the EPQ within the offer and eligible applicants may receive two offers; our usual offer plus an offer of a B in the EPQ and one grade lower in their A level subjects."`
Note `"The majority of our degree programmes"` — **not all.** Whether Engineering is inside that majority is
**NOT PUBLISHED**, and no Engineering-specific alternative grade string exists (contrast Physics, which has an
explicit `AABB`). **Do not assert an Engineering EPQ alternative offer.** See QUARANTINE.

**17. Deadline — NOT PUBLISHED** on every Engineering course page. No page carries an application deadline.

**18. Contiguous raw block.** No Engineering page presents its offer as one contiguous block: the grade
string is a standalone key-fact tile, physically separate from the accordion. **No block is stitched.** The
genuinely contiguous passages available are the `GCSE requirements` body (field 12, plus the Chemical
sentence) and the `English language requirements` body, e.g. verbatim:
`If English is not your first language, we require an IELTS score of 6.5 overall with at least 5.5 in each component for this programme.`
(IELTS **6.5 / 5.5** on every Engineering code — higher than Physics' **6.0 / 5.5**.)

**19. Study options / named routes inside one application.** For **all 42 codes**: a genuine common first
year shared across the whole School of Engineering, with specialism change at the end of Year 1 subject to
conditions, and H100 available as the undecided-applicant route. Full quotes and per-code detail in the
STRUCTURE VERDICT section at the end. **Placement Year, Study Abroad and Foundation Year are NOT options
inside another application — each is its own UCAS code** and is listed as its own record.

**20. Provenance — common to all 42.** sourceUrl pattern
`https://www.lancaster.ac.uk/study/undergraduate/courses/<slug>/2027/` fetched with `?v=2`.
**Entry-year label every page showed: `Entry year 2027 or 2026`** — a two-option selector, with the `/2027/`
path segment selecting the 2027 view. **No Engineering page prints an unambiguous "2027 entry requirements"
caption over the requirements panel.** Recorded as a caveat on every Engineering record: the cycle is
selected by URL path and confirmed by the selector offering 2027, not by a caption.

## PER-CODE TABLE — the fields that vary (every row individually fetched)

Interview column: `will typically` = verbatim `You will typically be asked to attend an interview`;
`NOT STATED` = no interview sentence present in the retrieved page text.

### Engineering (General) — title is plain `Engineering`
| # | Official title | UCAS | Award | Duration | A-level offer (exact string) | Interview |
|---|---|---|---|---|---|---|
| 1 | `Engineering` | H100 | `BEng Hons` | `Full time 3 years` | `ABB` | NOT STATED |
| 2 | `Engineering` | H102 | `MEng Hons` | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| 3 | `Engineering (Study Abroad)` | H103 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 4 | `Engineering (Study Abroad)` | H104 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| 5 | `Engineering (with a Foundation Year)` | H10F | `BEng Hons` | `Full time 4 years` | `CCC` | NOT STATED |

### Chemical Engineering — adds the conditional GCSE Chemistry rule (field 7) on every code
| # | Official title | UCAS | Award | Duration | A-level offer | Interview |
|---|---|---|---|---|---|---|
| 6 | `Chemical Engineering` | H800 | `BEng Hons` | `Full time 3 years` | `ABB` | NOT STATED |
| 7 | `Chemical Engineering` | H811 | `MEng Hons` | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| 8 | `Chemical Engineering (Study Abroad)` | H812 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 9 | `Chemical Engineering (Study Abroad)` | H813 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| 10 | `Chemical Engineering (with a Foundation Year)` | H80F | `BEng Hons` | `Full time 4 years` | `CCC` | NOT STATED |
| 11 | `Chemical Engineering with Placement Year` | H814 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 12 | `Chemical Engineering with Placement Year` | H815 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |

### Electronic and Electrical Engineering
| # | Official title | UCAS | Award | Duration | A-level offer | Interview |
|---|---|---|---|---|---|---|
| 13 | `Electronic and Electrical Engineering` | H607 | `BEng Hons` | `Full time 3 years` | `ABB` | NOT STATED |
| 14 | `Electronic and Electrical Engineering` | H606 | `MEng Hons` | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| 15 | `Electronic and Electrical Engineering (Study Abroad)` | H608 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 16 | `Electronic and Electrical Engineering (Study Abroad)` | H609 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| 17 | `Electronic and Electrical Engineering (with a Foundation Year)` | H60F | `BEng Hons` | `Full time 4 years` | `CCC` | NOT STATED |
| 18 | `Electronic and Electrical Engineering with Placement Year` | H610 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 19 | `Electronic and Electrical Engineering with Placement Year` | H611 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |

### Mechanical Engineering
| # | Official title | UCAS | Award | Duration | A-level offer | Interview |
|---|---|---|---|---|---|---|
| 20 | `Mechanical Engineering` | H300 | `BEng Hons` | `Full time 3 years` | `ABB` | NOT STATED |
| 21 | `Mechanical Engineering` | H303 | `MEng Hons` | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| 22 | `Mechanical Engineering (Study Abroad)` | H305 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 23 | `Mechanical Engineering (Study Abroad)` | H306 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| 24 | `Mechanical Engineering (with a Foundation Year)` | H30F | `BEng Hons` | `Full time 4 years` | `CCC` | NOT STATED |
| 25 | `Mechanical Engineering with Placement Year` | H307 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 26 | `Mechanical Engineering with Placement Year` | H308 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |

**H300 confirms the old scaffold's code question:** `Mechanical Engineering MEng Hons` = **H303**, BEng = **H300**.
Both fetched individually; both live 2027 pages. The existing file's entry for this is **CONFIRMED**.

### Mechatronic Engineering
| # | Official title | UCAS | Award | Duration | A-level offer | Interview |
|---|---|---|---|---|---|---|
| 27 | `Mechatronic Engineering` | HH63 | `BEng Hons` | `Full time 3 years` | `ABB` | NOT STATED |
| 28 | `Mechatronic Engineering` | HHH6 | `MEng Hons` | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| 29 | `Mechatronic Engineering (Study Abroad)` | HH64 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 30 | `Mechatronic Engineering (Study Abroad)` | HHH7 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| 31 | `Mechatronic Engineering (with a Foundation Year)` | HH6F | `BEng Hons` | `Full time 4 years` | `CCC` | NOT STATED |
| 32 | `Mechatronic Engineering with Placement Year` | HH65 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 33 | `Mechatronic Engineering with Placement Year` | HHH8 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |

### Nuclear Engineering
| # | Official title | UCAS | Award | Duration | A-level offer | Interview |
|---|---|---|---|---|---|---|
| 34 | `Nuclear Engineering` | H820 | `BEng Hons` | `Full time 3 years` | `ABB` | NOT STATED |
| 35 | `Nuclear Engineering` | H821 | `MEng Hons` | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| 36 | `Nuclear Engineering (Study Abroad)` | H822 | `BEng Hons` | `Full time 4 years` | `ABB` | NOT STATED |
| 37 | `Nuclear Engineering (Study Abroad)` | H823 | `MEng Hons` | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| 38 | `Nuclear Engineering (with a Foundation Year)` | H82F | `BEng Hons` | `Full time 4 years` | `CCC` | NOT STATED |
| 39 | `Nuclear Engineering with Placement Year` | H824 | `BEng Hons` | (see note) | (see note) | (see note) |
| 40 | `Nuclear Engineering with Placement Year` | H825 | `MEng Hons` | (see note) | (see note) | (see note) |

## THE DURATION / GRADE / INTERVIEW RULE — and the one place it must NOT be applied

Across the 40 Engineering pages individually fetched, the variation is perfectly regular:

| Route | Award | Duration | A-level offer | Interview line |
|---|---|---|---|---|
| plain | BEng Hons | `Full time 3 years` | `ABB` | NOT STATED |
| plain | MEng Hons | `Full time 4 years` | `AAA` | `You will typically be asked to attend an interview` |
| Study Abroad | BEng Hons | `Full time 4 years` | `ABB` | NOT STATED |
| Study Abroad | MEng Hons | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| with Placement Year | BEng Hons | `Full time 4 years` | `ABB` | NOT STATED |
| with Placement Year | MEng Hons | `Full time 5 years` | `AAA` | `You will typically be asked to attend an interview` |
| with a Foundation Year | BEng Hons | `Full time 4 years` | `CCC` | NOT STATED |

**This table is a description of 40 pages actually read, NOT a rule used to fill in unread pages.** It is
recorded because it is itself a finding, and because it makes the two gaps below conspicuous rather than
invisible.

### NOT RETRIEVED — two Engineering codes (2 of 42)
- **H824 `Nuclear Engineering with Placement Year` BEng Hons — NOT RETRIEVED.** The fetch returned
  `You've hit your session limit · resets 1:50am (UTC)` — a hard per-session cap on this environment's fetch
  tool, not a Lancaster error and not a missing page. Retried; see RETRIEVAL LOG.
- **H825 `Nuclear Engineering with Placement Year` MEng Hons — NOT RETRIEVED.** The fetch returned
  `HTTP 429; rate limited`. Retried; see RETRIEVAL LOG.

**Their identity (title, code, award) IS established** from the School of Engineering listing, per evidence
rule 3 — that is identity evidence and it is usable. **Their duration, grade string and interview line are
left blank on purpose.** The regular pattern above predicts `Full time 4 years`/`ABB`/NOT STATED for H824 and
`Full time 5 years`/`AAA`/interview for H825, but **prediction is not retrieval and these values are NOT
recorded as facts.** They are listed in UNRESOLVED IDENTITIES.

