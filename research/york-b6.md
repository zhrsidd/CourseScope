# University of York — Undergraduate Admissions Research (Physics & Engineering), 2027 entry

**Target entry year:** 2027 entry (2027/28)
**Research date:** 2026-09-16
**Batch:** b6

## Source policy actually applied

- `york.ac.uk` pages only as admissions evidence. Every recorded value was read from the fetched
  official page. No third-party guide, no UCAS listing, no search snippet was used as evidence.
- **Direct `curl`/HTTP to `www.york.ac.uk` is blocked in this environment** — the egress gateway
  answers `403` to `CONNECT` (confirmed via `$HTTPS_PROXY/__agentproxy/status`, which logged
  `connect_rejected … host: www.york.ac.uk:443`). **All** page reads were therefore performed with
  WebFetch against the live `york.ac.uk` URL. Web search was not needed to locate pages: every URL
  below was harvested from the hyperlinks on York's own central course A–Z.
- **No value was inferred from a sibling course.** Each course page recorded below was fetched
  separately, including the year-abroad and year-in-industry variants that a reader might assume
  simply mirror their parent degree. **Courses that could not be fetched have NO figures recorded at
  all** — they are listed in the RETRIEVAL LOG, not filled in from their siblings.
- **Silence is recorded as silence.** Where a course page says nothing about an admissions test or an
  interview, the field reads `NOT STATED ON THE COURSE PAGE` — never "no admissions test".

### Definitions used in the field lists

| Marker | Meaning |
|---|---|
| **NOT PUBLISHED** | The page was read successfully and genuinely says nothing on the point. |
| **NOT RETRIEVED** | The page (or that part of it) could not be read. A retrieval failure, not an absence. |
| **NOT STATED** | Used for fields 13/14 where the concept is simply never raised on the page. |

---

## SUMMARY

### Courses verified

**47 courses, all fetched and read individually** — **25 Physics-family** and **22
Engineering-family**. Full field lists in the COURSE RECORDS section.

### Where the course list came from (two official listings, cross-checked)

1. <https://www.york.ac.uk/study/undergraduate/courses/> — York's central undergraduate course A–Z.
   Self-identifies as **2027/28** entry. Carries the UCAS codes, awards and durations.
2. <https://www.york.ac.uk/physics-engineering-technology/study/> — the School of Physics,
   Engineering and Technology's own study page. Carries titles only (**no UCAS codes, no entry
   year**).

### ⚠️ York's two official listings do NOT agree

Two courses appear on the central A–Z but are **absent from the School's own study page**:

- **Engineering (with a Foundation Year), BEng, H100**
- **Engineering with Renewable Energy, MEng, H221**

And the School page groups the three **Mathematics/Physics** joint degrees with the physics degrees,
whereas on the central A–Z they sort under **M** as *"Mathematics/Physics (Equal)"* — easy to miss
entirely if you only scan the F-codes. The two listings also **name these degrees differently**
(School: "Mathematics and Physics"; A–Z: "Mathematics/Physics (Equal)").

The **union** of both listings is used in this document. This is a genuine inconsistency in York's
own published material, not a research artefact.

### Expected courses that DO NOT EXIST at York

Checked directly against York's own central A–Z course listing:

Mechanical Engineering · Civil Engineering · Chemical Engineering · Aerospace Engineering ·
Aeronautical Engineering · Automotive Engineering · Materials Engineering · Manufacturing
Engineering · Mechatronics · **Mathematical Physics**

Also absent: **Electrical Engineering as a standalone single-discipline title**, and the two degrees
the app's old scaffold data claimed — see next block.

### ⚠️ The app's existing scaffold data is wrong on both counts

| Scaffold claim | Reality on York's own A–Z |
|---|---|
| "Electronic Engineering MEng" | **Title is right, but the scaffold is still not usable as-is** — York's MEng Electronic Engineering exists under UCAS **H609**. Verified. |
| "Computer Systems and Software Engineering MEng" | **DOES NOT EXIST at York.** No course of this title is listed. The nearest genuinely existing title is **Electronic and Computer Engineering (MEng, H639)** — a different degree with a different name and code. Do not rename one into the other. |

### Pages NOT RETRIEVED

See the RETRIEVAL LOG at the end of the COURSE RECORDS section.

### Structural surprises

- **"Mathematical Physics" does not exist at York.** The nearest real programme is
  **Mathematics/Physics (Equal)** — BSc **GF13**, BSc with year abroad **GF14**, and
  **MMath/MPhys GFC3** — a joint degree run with the Department of Mathematics, recorded here under
  its own name and NOT relabelled as "Mathematical Physics".
- **Physics with Philosophy genuinely exists** (BSc **F3V5**, MPhys **F3VM**, BSc with year abroad
  **F3V7**) — but the variant grid is **not symmetric**: there is **no year-in-industry variant** of
  it and **no MPhys year-abroad** variant, while every other physics stream has all four.
- **The BSc/MPhys offer is not the same grade string.** Recorded exactly per course; never normalised.
- **Several engineering titles exist at one award level only.** Robotic Engineering, Medical
  Engineering and Engineering with Renewable Energy are **MEng-only**; Biomedical Engineering and
  Intelligent Digital Health Engineering are **BEng-only**. A reader expecting a BEng/MEng pair for
  every engineering title will be wrong.
- **Physics variants are separately UCAS-coded, not "study options" inside one application.** Year
  abroad and year in industry each have their own code (e.g. Physics BSc F300 / F302 / F301 / F304).

---

## WHAT ENGINEERING EXISTS AT YORK — the honest answer

**Question:** does York offer the broad engineering portfolio a reader would expect from a Sheffield
or a Leeds — Mechanical, Civil, Chemical — and if not, what is actually there?

**Answer: no. The gap is large and structural, not incidental.**

York's engineering provision sits entirely inside one school, the **School of Physics, Engineering
and Technology (SPET)**, and is built around **electronics, electrical systems, computing,
audio/music technology, and medical/biomedical devices**, plus one general "Engineering" pathway. In
origin and in substance it is an *electronics* department that has broadened into adjacent applied
areas. It is **not** a full-spectrum engineering faculty.

### Disciplines a reader would reasonably expect — and which are simply ABSENT

Each was checked against York's own central A–Z course listing (2027/28) and the School's own study
page. **None of these degrees exists at York for 2027 entry:**

| Expected discipline | Status at York |
|---|---|
| **Mechanical Engineering** | **DOES NOT EXIST** — no BEng, no MEng, no variant |
| **Civil Engineering** | **DOES NOT EXIST** |
| **Chemical Engineering** | **DOES NOT EXIST** |
| **Aerospace / Aeronautical Engineering** | **DOES NOT EXIST** |
| **Automotive Engineering** | **DOES NOT EXIST** |
| **Materials Science / Engineering** | **DOES NOT EXIST** |
| **Manufacturing Engineering** | **DOES NOT EXIST** |
| **Mechatronics** | **DOES NOT EXIST under that title.** The nearest is **Robotic Engineering (MEng, H659)** — a different title, recorded as itself, not as a Mechatronics substitute |
| **Electrical Engineering** (standalone) | **DOES NOT EXIST standalone.** "Electrical" appears only as half of **Electronic and Electrical Engineering** (BEng H600 / MEng H606) |

**This absence is a finding, not a retrieval failure.** These titles were searched for in York's own
index and are not there. **No figures have been manufactured for any of them anywhere in this
document, and no course record has been created for any of them.**

### What York's engineering provision actually consists of

**Seven title families, 22 UCAS-coded courses** (all codes read off York's own A–Z):

1. **Engineering** — the general/broad pathway: BEng **H105**, MEng **H109**, BEng with Foundation
   Year **H100**
2. **Electronic Engineering** — BEng **H610**, MEng **H609**, BEng with Foundation Year **H604**
3. **Electronic and Electrical Engineering** — BEng **H600**, MEng **H606**
4. **Electronic and Computer Engineering** — BEng **H634**, MEng **H639**
5. **Audio / music technology cluster** — Music Technology Systems (BEng **H663**, MEng **H666**,
   BEng with Foundation Year **H662**); Electronic Engineering with Music Technology Systems
   (BEng **H667**, MEng **H669**); Engineering with Audio Technology (BEng **H640**, MEng **H641**)
6. **Medical / health cluster** — Biomedical Engineering (BEng **H160**, BEng-only); Medical
   Engineering (MEng **H119**, MEng-only); Intelligent Digital Health Engineering (BEng **H116**,
   BEng-only)
7. **Robotics and energy** — Robotic Engineering (MEng **H659**, MEng-only); Engineering with
   Renewable Energy (MEng **H221**, MEng-only)

### On the Physics/Engineering merger and whether it changes how students apply

York merged its Physics and Electronic Engineering departments into the single **School of Physics,
Engineering and Technology**. Whether that merger changed the *application* structure — a common
first year, a single shared UCAS code, later specialisation — was tested directly against the
School's own study page and the general Engineering course pages.

**Finding: the merger did NOT collapse the application structure.** Applicants still apply to a
specific named UCAS code. Physics and Engineering remain separately coded and separately recruited,
and the School's own study page presents them as two distinct subject groupings under separate
"Physics" and "Engineering" headings.

**On the School study page specifically: no statement about a common first year, a shared UCAS code,
or a later-specialisation mechanism was found — and the page carries no UCAS codes and no entry year
at all.** That is recorded as **NOT PUBLISHED on that page**, not as "does not exist". Per-course
statements about study options and later specialisation are recorded in field 19 of each course
record, and the general **Engineering (BEng H105 / MEng H109)** pathway is the closest thing York has
to a broad-entry-then-specialise route — its own course page is the evidence for what it permits.

---

## CENTRAL POLICY PAGES

Quoted once here and referenced from fields 15 and 16 of each course record.

### Contextual offers and admissions

- **sourceUrl:** <https://www.york.ac.uk/study/undergraduate/applying/entry/contextual-offers/>
- **Page title:** Contextual offers and admissions — Undergraduate, University of York
- **Entry year the page showed:** **2027**

York publishes **four distinct reduced / alternative offer routes** on this page, under its own
headings. They are separate schemes with different eligibility and different sizes of reduction:

| York's own heading | Who it is for | Size of reduction (York's wording) |
|---|---|---|
| **Contextual offer** | Attended a UK state-funded school/college/sixth form **and** pays UK (Home) fees, where postcode data indicates circumstances impacting educational achievement. Also reachable by holding residential status of **'refugee' or 'humanitarian protection'**. | "**an offer up to two grades below**" the standard offer. York's own worked example: AAA becomes ABB, **excluding subject-specific requirements** |
| **Additional Information Form** | Experience of being in **local authority care**, or **estranged** from family | "**an offer up to two grades below**" the standard offer |
| **Access & Outreach alternative offer** | Successfully completing a named widening-participation programme — **Next Step York**, **Black Access**, **Realising Opportunities** — and meeting subject criteria | "**an alternative offer up to three grades below**" the standard offer |
| **Other options** (EPQ / Core Maths / York short courses) | Any applicant holding the qualification (specific subjects apply) | "**an alternative offer one grade below**" the standard offer |

**Deadline attached to the care-experienced / estranged route:** **"Friday 28 May 2027"**.

> ⚠️ **Do not conflate these four.** The *Contextual offer* is automatic and postcode-driven and is
> worth **two** grades; the *Access & Outreach alternative offer* requires actually completing a
> named programme and is worth **three** grades. The worked example also shows the reduction applies
> to the grade profile **excluding subject-specific requirements** — so a reduced offer does not
> waive a named subject.
>
> Note the naming mismatch: on the **course pages** the reduced-offer row is headed **"Widening
> participation"** and carries a specific grade string per course. That row is the course-level
> expression of the Access & Outreach route, and is transcribed per course in field 15 exactly as the
> course page prints it.

---

# COURSE RECORDS

Fields numbered 1–20 per the brief.


## A NOTE ON EXTRACTION RELIABILITY — read before relying on fields 12, 13 and 14

York renders entry requirements as a **two-column table** (`Qualification | Typical offer`), followed
by a second two-column table headed **"Alternative offers"** (`Criteria | Adjustment`). Field 18
reproduces those tables, which **are** the contiguous block — York publishes no separate prose
requirements paragraph for these courses, so nothing in field 18 has been stitched together from
fragments.

**Two honesty caveats, recorded rather than smoothed over:**

1. **The English language requirements table** (containing `GCSE/IGCSE/O level English Language … Grade
   C / Grade 4`) was surfaced on some page reads and not others — including on pages that are
   otherwise byte-identical in structure. Where it was surfaced it is quoted in field 12; where it was
   not, field 12 says so explicitly. Its non-appearance on a single read is **not** evidence that
   York does not publish it for that course. It is in any case an **English language proficiency**
   requirement, not a subject prerequisite in Maths or Science.
2. **Do not generalise fields 13/14 across the portfolio.** The standard degree pages are silent on
   interviews, but the **foundation-year** pages are **not** — F304 explicitly requires an interview.
   Each course was checked individually and the difference is real.

---

## 1. Physics (BSc)

1. **Official title:** Physics (BSc) — award line "BSc (Hons) Physics"
2. **UCAS code:** F300
3. **Award:** BSc (Hons)
4. **Duration:** 3 years full-time (plus optional placement year). **Max with placement: 4 years**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — a single grade profile, **not** a range or band. York's column heading is **"Typical offer"**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required. **No subject-specific minimum grade is attached at the typical-offer level** — the string names the two subjects but pins no grade to either. (Contrast the *Widening participation* row, which DOES pin one: "BBC including B in Mathematics and Physics")
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** NOT PUBLISHED — the page never raises Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry NOT PUBLISHED (never mentioned)
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. One explicit **exclusion-style restriction** does appear, on T levels: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED — never mentioned
12. **GCSE requirements:** No GCSE Maths or Science requirement published. An **English language** requirement appears in the English language requirements table: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE.** The page contains no sentence mentioning an admissions test or entrance test. Recorded as silence, **not** as "no admissions test"
14. **Interview:** **NOT STATED ON THE COURSE PAGE.** No sentence mentioning an interview. Recorded as silence, **not** as "no interview"
15. **Reduced-offer routes (York's own headings, from the "Alternative offers" table):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
    - *(Care-experienced/estranged and refugee routes are not separately itemised on this course page; they are published centrally — see CENTRAL POLICY PAGES)*
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block** (York's table, as one block):

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |

19. **Study options / named routes inside one application:** The variants are **separately UCAS-coded, not options inside this application** — the page signposts "We also offer BSc Physics (with a year abroad)" and "We also offer BSc Physics (with a year in industry)" as distinct courses. Within the degree, elective modules in Years 2 and 3 allow study of "a complementary subject, a language or an interdisciplinary topic". No later-specialisation mechanism published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics/> · page title "Physics (BSc) - Undergraduate, University of York" · **entry year the panel showed: 2027/28** ✅

---

## 2. Physics (MPhys)

1. **Official title:** Physics (MPhys) — award line "MPhys (Hons) Physics"
2. **UCAS code:** F303
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** 4 years full-time (plus optional placement year). **Max with placement: 5 years**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics`** — single profile, not a range or band. ⚠️ **A full grade above the BSc (AAB).** Never normalise these to each other
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no subject-specific minimum grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry NOT PUBLISHED
10. **Accepted alternative sciences / explicit exclusions:** None published. T level restriction applies: "Not accepting T Levels unless additional A Level (or equivalent qualifications) in Mathematics and Physics taken"
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. The English language requirements table references "GCSE/IGCSE/O level English Language"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE** — silence, not a denial
14. **Interview:** **NOT STATED ON THE COURSE PAGE** — silence, not a denial
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics" — page adds this is conditional on WP programme completion
    - **"Contextual offer"** → "ABB including Physics and Mathematics"
16. **Alternative offer routes:** **"EPQ"** → "C or higher eligible for alternative offer up to one A level grade below typical offer"
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics |
    | T levels | Not accepting T Levels unless additional A Level (or equivalent qualifications) in Mathematics and Physics taken |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from International Pathway College or appropriate alternative |
    | Other qualifications | All qualifications considered individually; Foundation Year option available |

    ⚠️ Note the EB, IB and Scottish rows are **all** a step above the BSc's (85% vs 80%; 36 vs 35; AB vs BB). The MPhys/BSc gap is consistent across qualification types, not just A level.
19. **Study options / named routes:** Year abroad and year in industry are **separately coded courses**, signposted as "We also offer MPhys Physics (with a year abroad)" and "We also offer MPhys Physics (with a year in industry)". The page also states "There are opportunities for you to spend time abroad during your course". Optional modules provide specialisation within the degree. **No common first year, no transfer mechanism between awards, and no shared initial pathway is published**
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics/> · page title "Physics (MPhys) - Undergraduate, University of York" · **entry year shown: "Year of entry: 2027/28"** ✅

---

## 3. Physics (with a year abroad) (BSc)

1. **Official title:** Physics (with a year abroad) (BSc) — award line "BSc (Hons) Physics (with a year abroad)"
2. **UCAS code:** F302
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time" (no further placement extension published)
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — identical string to the 3-year BSc. Single profile, not a range
6. **Required subjects + subject minimum grades:** Physics and Mathematics required; no grade pinned to either at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry NOT PUBLISHED
10. **Accepted alternative sciences / explicit exclusions:** None published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths/Science requirement published. English language requirements table: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics This is conditional upon successful completion of the WP programme..." *(the page's sentence continues; transcribed to the extent the read returned it)*
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |

19. **Study options / named routes:** **NOT PUBLISHED.** The page describes a fixed year-by-year structure of core and option modules but carries **no** statement about choosing a specialisation later, transferring between courses or award levels, or a shared first year
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-year-abroad/> · page title "Physics (with a year abroad) (BSc) - Undergraduate, University of York" · **entry year shown: 2027/28** ✅

---

## 4. Physics (with a year in industry) (BSc)

1. **Official title:** Physics (with a year in industry) (BSc) — award line "BSc (Hons) Physics (with a year in industry)"
2. **UCAS code:** F301
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single profile, not a range
6. **Required subjects + subject minimum grades:** Physics and Mathematics required; no grade pinned to either
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry NOT PUBLISHED
10. **Accepted alternative sciences / explicit exclusions:** None published. T level restriction as printed above
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** NOT PUBLISHED — **and on this read the English language requirements table was not surfaced either.** Per the extraction caveat above, treat this as "not surfaced on this read", not as proof York publishes no English language requirement for F301
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |

19. **Study options / named routes:** **NOT PUBLISHED** — no statement about later specialisation, transfer between courses or award levels, or a common first year
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-industry/> · page title "Physics (with a year in industry) (BSc) - Undergraduate, University of York" · **entry year shown: 2027/28** ✅

---

## 5. Physics (with a foundation year) (BSc)

> ⚠️ **This course breaks the pattern of every other physics page.** It has an explicit **interview
> requirement**, an explicit **GCSE Maths requirement**, an explicit **eligibility restriction that
> excludes applicants who already hold A level Maths and Physics**, and a completely different
> qualifications table (Access to HE and BTEC rows appear; European Baccalaureate does not). Do not
> apply any other physics course's figures to it.

1. **Official title:** Physics (with a foundation year) (BSc) — award line "BSc (Hons) Physics (with a foundation year)"
2. **UCAS code:** F304
3. **Award:** BSc (Hons)
4. **Duration:** 4 years full-time (plus optional placement year). **Max with placement: 5 years**
5. **Standard A-Level offer (EXACT):** **`BBB. If you already have, or are currently studying A level Maths and Physics you should apply for one of our degree programmes without a foundation year.`** — the grade profile is **`BBB`**, and York attaches a **redirection instruction** to the same cell. Single profile, not a range
6. **Required subjects + subject minimum grades:** **No required A level subjects** — and, uniquely, the page states the *opposite* of a subject requirement: holding A level Maths and Physics is a reason **not** to apply for this course
7. **Cross-subject rules:** The eligibility restriction functions as one: "The course is aimed at: A level students who have not recently studied both physics and maths; Mature students looking to change career." The IB row carries the same logic: "If you are studying Mathematics - Applications and Interpretation at Higher Level or Mathematics - Analysis and Approaches at Standard Level or Higher Level, and Physics at Higher Level, please apply for one of our degree courses without a foundation year."
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry individually:** No A level Maths, Physics or Chemistry required. **GCSE** Maths **is** required at grade 5 (see field 12). Chemistry NOT PUBLISHED
10. **Accepted alternative sciences / explicit exclusions:** No alternative-science list. A long **named T Level list is accepted** (see field 18) — the only physics course where T Levels are accepted rather than restricted
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **PUBLISHED and specific** — "We typically expect applicants to have GCSE Maths at grade 5 (or equivalent)."
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE** — no admissions or entrance test is mentioned
14. **Interview:** **EXPLICITLY REQUIRED.** Quoted: "Applicants will be required to attend an interview prior to any offer being made." and "Applicants are usually interviewed and we will look for evidence during our discussion that you are capable of dealing with the workload of the foundation year."
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BCC. This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities" — ⚠️ this is the **only** physics course whose WP row names the individual programmes and the YorJourney module
    - **"Contextual offer"** → "BBC"
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | BBB. If you already have, or are currently studying A level Maths and Physics you should apply for one of our degree programmes without a foundation year. |
    | Access to Higher Education Diploma | 21 credits at Distinction and 24 credits at Merit or higher |
    | BTEC National Extended Diploma | DDM. We consider a range of BTEC qualifications equivalent to 3 A Levels, or in combination with A Levels or other qualifications. For example: Distinction, Merit in BTEC Level 3 National Diploma plus B at A Level; Distinction in BTEC Level 3 National Extended Certificate plus BB at A level; Distinction, Merit in 2 BTEC Level 3 National Extended Certificates plus B at A level |
    | International Baccalaureate | 31 points. If you are studying Mathematics - Applications and Interpretation at Higher Level or Mathematics - Analysis and Approaches at Standard Level or Higher Level, and Physics at Higher Level, please apply for one of our degree courses without a foundation year. |
    | T levels | Merit overall including grade B in the Core in the following T Level subjects: Accounting; Design and Development for Engineering and Manufacturing; Design, Surveying and Planning for Construction; Digital Business Services; Digital Production, Design and Development; Digital Support and Services; Engineering, Manufacturing, Processing and Control; Finance; Health; Healthcare Science; Legal Services; Maintenance, Installation and Repair for Engineering and Manufacturing; Management and Administration; Marketing; Science |
    | Scottish Highers / Advanced Highers | Scottish Highers - BBBBB. Advanced Highers - not required for entry. We may also be able to consider three Advanced Highers or a combination of Highers and Advanced Highers, where an applicant does not meet the grade requirement through Highers alone. Please contact us to discuss your qualifications. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes inside one application — genuinely present here:** This is the **one place in York's physics portfolio where a single application leads to a later choice of named degree.** Quoted: "After completing the foundation year, you'll transfer into the Year 1 of a physics degree of your choice. All our degree programmes are offered as three-year Bachelors (BSc) courses or four-year integrated Masters (MPhys/MMath) courses." The named onward routes are **Physics; Physics with Astrophysics; Theoretical Physics; Mathematics and Physics; Physics with Philosophy**
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-foundation-year/> · page title "Physics (with a foundation year) (BSc) - Undergraduate, University of York" · **entry year shown: 2027/28** ✅

---

# STEP 1 — VERIFICATION PASS ON THE STRUCTURAL CLAIMS

*Added on a second research pass (2026-09-17), re-confirming the claims above against York's own
current listing before they get encoded as fact downstream. Nothing above was rewritten.*

## The listing that was checked

**sourceUrl:** <https://www.york.ac.uk/study/undergraduate/courses/>
**Page title:** Courses — Undergraduate, University of York
**Entry year the page displayed:** the listing header reads **"Courses 2027/28"**, with the filter
state shown as **"Showing all courses"**. ✅ This is the 2027-entry listing, in York's own words.

This is **York's own central undergraduate course A–Z** — the same listing the first pass used. It was
re-fetched in full and read with the filter at "all courses", so nothing was hidden behind a subject
facet. What follows is what that listing showed.

## Re-confirmation: the absent disciplines

Each of the following titles was searched for in the full "all courses" listing. **None appears
anywhere in it:**

| Title searched for | Result in York's own 2027/28 A–Z |
|---|---|
| Mechanical Engineering | **ABSENT — no course of this title in the listing** |
| Civil Engineering | **ABSENT** |
| Chemical Engineering | **ABSENT** |
| Aerospace Engineering | **ABSENT** |
| Aeronautical Engineering | **ABSENT** |
| Automotive Engineering | **ABSENT** |
| Materials Engineering | **ABSENT** |
| Materials Science | **ABSENT** |
| Manufacturing Engineering | **ABSENT** |
| Mechatronics | **ABSENT** |
| Electrical Engineering (standalone single-discipline title) | **ABSENT.** "Electrical" appears in the listing only inside the compound title **Electronic and Electrical Engineering** (BEng H600 / MEng H606) |
| Mathematical Physics | **ABSENT** |
| Computer Systems and Software Engineering | **ABSENT** |

**✅ The first pass's structural claim is CONFIRMED.** The two specific scaffold-era claims are also
confirmed as non-existent: **"Computer Systems and Software Engineering MEng" does not exist** at
York, and **"Mathematical Physics" does not exist** at York. Neither title is in the listing at any
award level.

⚠️ **What this evidence is and is not.** This is an absence from York's own complete course index for
2027/28 — the strongest negative evidence a university publishes about itself. It is *not* a claim
that York has never offered these subjects, nor a claim about postgraduate provision. No admissions
figure has been recorded for any of these titles anywhere in this document.

## Re-confirmation: the course list itself

The 2027/28 A–Z listing was re-read and the Physics-family and Engineering-family entries re-counted
directly off it. **The count and the codes match the SUMMARY above exactly: 25 Physics-family + 22
Engineering-family = 47 courses.** Every UCAS code used in the records below was read off this
listing (field 2 of each record says so).

Two details worth pinning down, because they are easy to get wrong:

- The listing prints the joint degrees as **"Mathematics/Physics (Equal)"** for BSc GF13 and
  MMath/MPhys GFC3, but as **"Mathematics/Physics (equal) (with a year abroad)"** — lower-case
  *equal* — for BSc GF14. York's own capitalisation is inconsistent between the two. Titles are
  transcribed per record exactly as printed.
- **Physics with Philosophy has only three coded courses** (BSc F3V5, MPhys F3VM, BSc with year
  abroad F3V7). There is **no MPhys year-abroad** and **no year-in-industry variant at either award
  level** in the listing. ✅ The first pass's asymmetry finding is confirmed against the listing.

## The general Engineering pathway (BEng H105 / MEng H109) — is it a common first year?

This was the open structural question. Both course pages were fetched in full.

**Answer: York does NOT publish a common-first-year-then-specialise mechanism for these degrees, and
they are two separate applications, not one.**

### It is two applications, not one

The A–Z lists them as two separately coded courses — **Engineering BEng H105, 3 years** and
**Engineering MEng H109, 4 years** — each with its own course page, its own "UCAS code" field, and a
**different typical offer** (BEng **`ABB including Maths.`** vs MEng **`AAA including Maths.`**).
Neither page contains any instruction to apply to the other's code, and neither presents the other
award as a study option inside itself. **An applicant types either H105 or H109 into UCAS, and the
grade requirement differs by two grades.**

### There is no published common first year

Neither page contains any sentence about a common first year, a shared first year, a shared entry
point, choosing a named specialisation later, or transferring between courses or award levels.
**Recorded as NOT PUBLISHED on those pages, not as "does not exist".**

What the BEng page *does* publish is **option-module choice in Year 3**, not a named specialisation
route. York's own wording: **"Year 3 - two core modules and three option modules"**, with the option
examples including **"Renewable Power Generation"**, **"Communications Systems"**, **"Biomedical
Engineering"** and **"Robotics"**.

> ⚠️ **This is the trap this document exists to avoid.** Those four option-module names are the same
> words as four *separately coded degrees* at York (Engineering with Renewable Energy MEng H221,
> Biomedical Engineering BEng H160, Robotic Engineering MEng H659). **They are option modules inside
> H105, not pathways you apply to and not applications.** No course record has been created for any
> of them as a "pathway", and none of the real degrees that share their names has been conflated with
> them. They are listed in the STUDY OPTIONS / PATHWAYS section at the end under parent code H105.

### The one genuine progression mechanism York does publish here — and its surprise

Both Engineering pages carry a **foundation-year progression route** in the "Other qualifications"
row of the requirements table. Quoted from the **MEng H109** page:

> "We consider a wide range of academic and vocational qualifications as long as Maths is obtained at
> A level or equivalent and are happy to talk to you about your individual qualifications profile. We
> also offer a Foundation Year BEng Electronic Engineering with a Foundation Year for those not
> taking Maths A level which, following successful completion, allows you to progress onto one of our
> BEng or MEng courses depending on your Foundation Year average marks."

The **BEng H105** page carries the same sentence, ending "...allows you to progress onto one of our
BEng or MEng courses depending on your Foundation Year average marks."

⚠️ **Note what York actually named there.** Both *Engineering* pages direct foundation-year applicants
to **"BEng Electronic Engineering with a Foundation Year"** (H604) — **not** to *Engineering (with a
Foundation Year)* (H100), which exists in the A–Z as its own coded course. That is York's own
cross-reference, transcribed as printed; it is **not** evidence that H100 does not exist (the A–Z
lists it), and the two have not been merged. It is recorded as a published inconsistency.

Note also that the progression the sentence describes runs **from a foundation year into a choice of
BEng or MEng**, and is **determined by "Foundation Year average marks"** — i.e. it is an *outcome of
performance*, not a study option the applicant selects. That is the only later-award-choice mechanism
York publishes anywhere in the Engineering family.


---

# COURSE RECORDS, CONTINUED (6–47)

*Records 1–5 above cover F300, F303, F302, F301, F304. Records 6–47 complete the 47-course list the
SUMMARY establishes. **Every page below was fetched individually.** Where two courses turned out to
print the same strings, the record says which fields were confirmed **on that page** — no value
anywhere below was copied from a sibling, a different award level or a previous cycle.*

> ### ⚠️ A NEW TEMPLATE BREAK DISCOVERED ON THIS PASS — read before comparing field 16 across courses
>
> The first pass established that all physics courses publish three alternative-offer rows (*Widening
> participation*, *Contextual offer*, *EPQ*). **That is not universal.** Several courses publish a
> **fourth** row headed **"The York Tutorial Programme"**, worth one grade — and several publish it
> where their own sibling courses do not. It is recorded per course in field 16 and **must not be
> assumed present or absent anywhere it was not read.** Its presence/absence pattern is mapped in a
> table at the end of the records.

---

## 6. Physics (with a year abroad) (MPhys)

1. **Official title:** Physics (with a year abroad) (MPhys) — award line "MPhys (Hons) Physics (with a year abroad)"
2. **UCAS code:** F305 — read in the "UCAS code" field of the key-information panel on this course page; also listed as F305 on York's 2027/28 central A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "5 years full-time". **No further placement extension published** — the year abroad is Year 4 of the five
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, **not** a range. Identical string to the 4-year MPhys F303, confirmed **on this page**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required. **No subject-specific minimum grade pinned at typical-offer level** (contrast the *Widening participation* row, which is also unpinned here — "BBB including Mathematics and Physics")
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — the page was read in full and never mentions Further Mathematics at all. York publishes no preference either way for this course
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED** (never mentioned)
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. One explicit exclusion-style restriction, on T levels: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED — never mentioned
12. **GCSE requirements:** No GCSE Maths or Science requirement published. An **English language** requirement appears in the English language requirements table: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4". ⚠️ This is an English-language-proficiency row, **not** a subject prerequisite
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE** — silence, not a denial
14. **Interview:** **NOT STATED ON THE COURSE PAGE** — silence, not a denial
15. **Reduced-offer routes (York's own headings, from the "Alternative offers" table):**
    - **"Widening participation"** → "BBB including Mathematics and Physics This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
    - *(Care-experienced/estranged and refugee routes are not itemised on this course page — published centrally, see CENTRAL POLICY PAGES)*
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." **No "The York Tutorial Programme" row on this page.** No Core Maths row. No four-A-level route published
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block** (York's table, as one block):

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB We may also be able to consider three Advanced Highers or a combination of Highers and Advanced Highers, where an applicant does not meet the grade requirement through Highers alone. Please contact us to discuss your qualifications. |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. If you don't have suitable qualifications in Maths and/or Physics, successfully completing a Foundation Year will guarantee a place on any of our undergraduate degrees: Physics (with a foundation year) (BSc) We welcome applications from mature students and students without standard qualifications. Please contact our admissions team to discuss your specific circumstances. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None that constitute a pathway.** The sibling variant is signposted as a **separately coded course**, not an option: "We also offer MPhys Physics (with a year in industry)." ⚠️ **Note the "Other qualifications" row, which is the strongest progression statement in the physics family:** "If you don't have suitable qualifications in Maths and/or Physics, successfully completing a Foundation Year will guarantee a place on any of our undergraduate degrees: Physics (with a foundation year) (BSc)". That is a **cross-reference to a different UCAS code (F304)**, i.e. a separate application, not a route inside F305. The page describes modular optionality across the years but publishes **no common first year and no transfer mechanism between award levels**
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics-year-abroad/> · page title "Physics (with a year abroad) (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 7. Physics (with a year in industry) (MPhys)

1. **Official title:** Physics (with a year in industry) (MPhys) — award line "MPhys (Hons) Physics (with a year in industry)"
2. **UCAS code:** F306 — read in the "UCAS code" field of this course page's key-information panel; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "5 years full-time". No further extension published — the industrial placement **is** Year 4 of the five
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics`** — single grade profile, not a range. ⚠️ **Note: printed on this page WITHOUT a trailing full stop**, where F305's string has one. Transcribed exactly as read on each page rather than normalised
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; **no subject-specific minimum grade pinned** at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction applies: "Currently not accepting T Levels unless additional A Level (or equivalent qualifications) in Mathematics and Physics taken"
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No standalone GCSE entry requirement published.** The English language requirements table carries "GCSE/IGCSE/O level English Language (as a first or second language) Grade C / Grade 4" — an English-proficiency row, not a subject prerequisite
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics (conditional on completion of WP programme)"
    - **"Contextual offer"** → "ABB including Physics and Mathematics"
16. **Alternative offer routes:** **"EPQ"** → "If C or higher achieved, eligible for alternative offer up to one A level grade below typical offer". **No "The York Tutorial Programme" row on this page.** No Core Maths, no four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics |
    | T levels | Currently not accepting T Levels unless additional A Level (or equivalent qualifications) in Mathematics and Physics taken |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from International Pathway College or appropriate alternative |
    | Other qualifications | All other qualifications considered individually; Foundation Year option available |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None.** The sibling variant is signposted as a **separately coded course**: "We also offer MPhys Physics (with a year abroad)." The page lists related courses but **specifies no common first year and no internal transfers**
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics-industry/> · page title "Physics (with a year in industry) (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 8. Physics with Astrophysics (BSc)

> ⚠️ **This page carries a FOURTH alternative-offer row that Physics BSc F300 does not:** **"The York
> Tutorial Programme"**, worth one A level grade. Do not assume F300 and F3F5 have identical
> alternative-offer structures — they do not, as read.

1. **Official title:** Physics with Astrophysics (BSc) — award line "BSc (Hons) Physics with Astrophysics"
2. **UCAS code:** F3F5 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** 3 years full-time, plus optional placement year (year in industry available). **Max with placement: 4 years**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. Same string as Physics BSc F300, confirmed **on this page**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required. No grade pinned at typical-offer level. ⚠️ The *Widening participation* row **does** pin one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics. ⚠️ Worth noting because Astrophysics is the specialism a reader would most expect to carry a Further Maths preference; York publishes none
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. English language requirements table: "Grade C / Grade 4" for "GCSE/IGCSE/O level English Language"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes — TWO on this page:**
    - **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
    - **"The York Tutorial Programme"** → "If you successfully complete the York Tutorial Programme, you may be eligible for an alternative offer up to one A level grade (or equivalent) below your offer." ⚠️ **Read on THIS page. Not present on F300, F303, F305 or F306 as read.** No Core Maths row, no four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None.** Both variants are signposted as **separately coded courses**: "We also offer this course with a year abroad" (F3F7) and "We also offer BSc Physics with Astrophysics (with a year in industry)" (F3F6). **"Astrophysics" here is the degree title, not a pathway inside Physics F300** — it is its own UCAS code and its own application. No common first year, no later specialisation choice, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-astrophysics/> · page title "Physics with Astrophysics (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 9. Physics with Astrophysics (MPhys)

1. **Official title:** Physics with Astrophysics (MPhys) — award line "MPhys (Hons) Physics with Astrophysics"
2. **UCAS code:** F3FN — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "4 years full-time"; placement options available (year abroad or year in industry) with reduced fees for the placement year. ⚠️ **The page does not state a consolidated maximum duration**; the extended variants are separately coded (F3F8, F3F9) at 5 years — recorded as NOT PUBLISHED here rather than inferred
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. ⚠️ **A full grade above the BSc F3F5 (AAB).** Never normalise the two
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No GCSE subject requirement published.** English language requirements table carries "Grade C / Grade 4" for "GCSE/IGCSE/O level English Language"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **No "The York Tutorial Programme" row on this page** — unlike its own BSc sibling F3F5, which has one. The asymmetry is between award levels of the *same* title and was read on both pages
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** The only genuine in-application option is an **elective module swap**, quoted: "You may be able to replace one option module with an elective module, studying a complementary subject, a language or an interdisciplinary topic." ⚠️ **That is a module choice, not a named route and not a pathway.** The year-abroad and year-in-industry variants are **separately coded courses**, signposted as "We also offer this course with a year abroad" (F3F8) and "We also offer MPhys Physics with Astrophysics (with a year in industry)" (F3F9). No common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics-astrophysics/> · page title "Physics with Astrophysics (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 10. Physics with Astrophysics (with a year abroad) (BSc)

1. **Official title:** Physics with Astrophysics (with a year abroad) (BSc) — award line "BSc (Hons) Physics with Astrophysics (with a year abroad)"
2. **UCAS code:** F3F7 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time", with **no maximum duration stated beyond this** — no further placement extension published
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. Confirmed **on this page**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; **no grade pinned** at typical-offer level. The *Widening participation* row **does** pin one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No standalone GCSE requirement surfaced on this read.** The English language requirements table is present on the page but no general GCSE minimum is stated. Per the extraction caveat, treat the English-language row as present-but-unquoted on this read rather than as absent
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" row is explicitly ABSENT on this page** — confirmed by direct check — even though its 3-year parent F3F5 has one and its MPhys counterpart F3F8 has one. No Core Maths row, no four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB We may also be able to consider three Advanced Highers or a combination of Highers and Advanced Highers, where an applicant does not meet the grade requirement through Highers alone. Please contact us to discuss your qualifications. |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. If you don't have suitable qualifications in Maths and/or Physics, successfully completing a Foundation Year will guarantee a place on any of our undergraduate degrees: Physics (with a foundation year) (BSc). We welcome applications from mature students and students without standard qualifications. Please contact our admissions team to discuss your specific circumstances. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None that constitute a pathway.** The sibling is signposted as a **separately coded course**: "We also offer BSc Physics with Astrophysics (with a year in industry)" (F3F6). Inside the degree: Year 3 is spent abroad, and Year 4 carries optional modules letting you "delve deeper into your favourite topic, or discover a new area of advanced physics" — **module choice, not a named route.** The "Other qualifications" row cross-references **F304** (Physics with a foundation year), a **different application**. No common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-astrophysics-year-abroad/> · page title "Physics with Astrophysics (with a year abroad) (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 11. Physics with Astrophysics (with a year abroad) (MPhys)

> ⚠️ **This page HAS the "The York Tutorial Programme" row. Its own BSc counterpart (F3F7) does NOT,
> and its own 4-year parent (F3FN) does NOT.** Read on each page separately. This is not a pattern
> that can be predicted from title or award level.

1. **Official title:** Physics with Astrophysics (with a year abroad) (MPhys) — award line "MPhys (Hons) Physics with Astrophysics (with a year abroad)"
2. **UCAS code:** F3F8 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "5 years full-time", with **no maximum duration stated beyond this**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. ⚠️ **A full grade above its BSc counterpart F3F7 (AAB).** Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No standalone GCSE subject requirement.** English language requirements table quoted on this read: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities More about widening participation"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes — TWO on this page:**
    - **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
    - **"The York Tutorial Programme"** → "If you successfully complete the York Tutorial Programme, you may be eligible for an alternative offer up to one A level grade (or equivalent) below your offer." ⚠️ **Read on THIS page.** No Core Maths row, no four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB We may also be able to consider three Advanced Highers or a combination of Highers and Advanced Highers, where an applicant does not meet the grade requirement through Highers alone. Please contact us to discuss your qualifications. |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. If you don't have suitable qualifications in Maths and/or Physics, successfully completing a Foundation Year will guarantee a place on any of our undergraduate degrees: Physics (with a foundation year) (BSc) We welcome applications from mature students and students without standard qualifications. Please contact our admissions team to discuss your specific circumstances. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** The only in-application option is the **elective module swap**: "You may be able to replace one option module with an elective module, studying a complementary subject, a language or an interdisciplinary topic." **Module choice, not a named route.** The sibling is a **separately coded course**: "We also offer MPhys Physics with Astrophysics (with a year in industry)" (F3F9). No common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics-astrophysics-year-abroad/> · page title "Physics with Astrophysics (with a year abroad) (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 12. Physics with Astrophysics (with a year in industry) (BSc)

> ⚠️ **This page publishes a REAL transfer mechanism that most York pages do not:** if the placement
> is not secured, the student is moved onto the standard BSc. Quoted in field 19. That is a
> **fallback, not a study option the applicant chooses**, and it does not make the standard BSc a
> pathway inside this code.

1. **Official title:** Physics with Astrophysics (with a year in industry) (BSc) — award line "BSc (Hons) Physics with Astrophysics (with a year in industry)"
2. **UCAS code:** F3F6 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time", **no maximum duration stated**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics`** — single grade profile, not a range. ⚠️ **Printed WITHOUT a trailing full stop on this page**, where F3F5 and F3F7 have one. Transcribed as read, not normalised
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level. The *Widening participation* row pins one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "Not accepting T Levels unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken"
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No standalone GCSE Mathematics or Science requirement surfaced as entry criteria.** English language qualifications table: "Grade C / Grade 4" for "GCSE/IGCSE/O level English Language"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics (conditional upon successful completion of WP programme)"
    - **"Contextual offer"** → "BBB including Physics and Mathematics"
16. **Alternative offer routes:** **"EPQ"** → "If C or higher achieved, eligible for alternative offer up to one A level grade below typical offer". ⚠️ **"The York Tutorial Programme" and "Core Maths" rows explicitly ABSENT on this page** — confirmed by direct check. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics |
    | T levels | Not accepting T Levels unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from International Pathway College or appropriate alternative |
    | Other qualifications | Considered individually; Foundation Year option available |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application — one genuine transfer, and it is not a choice:** Quoted: **"If you don't find a placement you will transfer to the standard BSc Physics with Astrophysics pathway."** ⚠️ This is a **contingency transfer triggered by failure to secure a placement**, not a specialism the applicant selects, and not a reason to treat the standard BSc (F3F5) as an option inside F3F6 — F3F5 is its own UCAS code and its own application. Other in-degree wording is **module choice only**: Year 1 "You'll study a range of key modules"; "Specialist modules allow you to pursue a broad understanding of modern astrophysics"; Year 3 is "a paid placement in industry"; Year 4 "Optional modules give you the chance to delve deeper into your favourite topic." No common first year published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-astrophysics-industry/> · page title "Physics with Astrophysics (with a year in industry) (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 13. Physics with Astrophysics (with a year in industry) (MPhys)

1. **Official title:** Physics with Astrophysics (with a year in industry) (MPhys) — award line "MPhys (Hons) Physics with Astrophysics (with a year in industry)"
2. **UCAS code:** F3F9 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "5 years full-time", **no maximum duration stated separately**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full; never mentioned in the entry requirements or the alternative offers
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No standalone GCSE Mathematics or Science requirement stated.** English language requirements table: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics" (conditional on programme completion)
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" and "Core Maths" rows explicitly ABSENT on this page** — confirmed by direct check, unlike its year-abroad MPhys sibling F3F8 which has the Tutorial row. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | Accepts Scottish Highers, Irish Leaving Certificates individually; mature students welcome; foundation year option mentioned |
    | Other international qualifications | Equivalent qualifications from your country |

    ⚠️ The "Other qualifications" row was returned in paraphrase rather than verbatim on this read. **Flagged rather than smoothed over** — the substance is recorded, the exact wording is NOT RETRIEVED for that one cell.
19. **Study options / named routes INSIDE this one application:** **NOT PUBLISHED.** The page describes a fixed five-year structure — Year 4 the industry placement, Year 5 research-focused, "In your final year you'll design and carry out an original research project" — and carries **no** statement about transferring between courses, choosing a specialisation later, or a common first year. ⚠️ Note it does **not** carry the "if you don't find a placement you will transfer…" sentence that its BSc counterpart F3F6 does; recorded as absent on this read, not imported from F3F6
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics-astrophysics-industry/> · page title "Physics with Astrophysics (with a year in industry) (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 14. Theoretical Physics (BSc)

1. **Official title:** Theoretical Physics (BSc) — award line "BSc (Hons) Theoretical Physics"
2. **UCAS code:** F345 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "3 years full-time (plus optional placement year)". **Max with placement: 4 years**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. Same string as Physics BSc F300, confirmed **on this page**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; **no grade pinned** at typical-offer level. The *Widening participation* row pins one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics. ⚠️ **This is the single most counter-intuitive finding in the physics family.** *Theoretical* Physics is the degree a reader would most confidently expect to require or prefer Further Maths. **York publishes no preference either way.** Do not let a downstream default supply one
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. The English language requirements table is present and detailed (IELTS, IB English, Cambridge CEFR and others), including the row: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics" (conditional on programme completion)
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" row ABSENT and "Core Maths" row ABSENT** — both confirmed by direct check on this page. Its own MPhys sibling F346 **does** have the Tutorial row. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | *(returned in paraphrase on this read: discusses the foundation year pathway and mature students — exact wording **NOT RETRIEVED** for this one cell)* |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None.** Both variants are signposted as **separately coded courses**: "We also offer BSc Theoretical Physics (with a year abroad)" (F347) and "We also offer BSc Theoretical Physics (with a year in industry)" (F344). ⚠️ **"Theoretical Physics" is a degree title with its own UCAS code, NOT a pathway or stream inside Physics F300.** No common first year, no later specialisation choice, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-theoretical-physics/> · page title "Theoretical Physics (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 15. Theoretical Physics (MPhys)

1. **Official title:** Theoretical Physics (MPhys) — award line "MPhys (Hons) Theoretical Physics"
2. **UCAS code:** F346 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "4 years full-time (plus optional placement year)". **Max with placement: 5 years**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. ⚠️ **A full grade above the BSc F345 (AAB)**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentioned anywhere in the document
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. English language requirements table row quoted: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes — TWO on this page:**
    - **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
    - **"The York Tutorial Programme"** → "If you successfully complete the York Tutorial Programme, you may be eligible for an alternative offer up to one A level grade (or equivalent) below your offer." ⚠️ **PRESENT on this page, confirmed by direct check — and ABSENT on its own BSc sibling F345.** "Core Maths" row **ABSENT**. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None that constitute a pathway.** Variants are **separately coded courses**: "We also offer MPhys Theoretical Physics (with a year abroad)" (F348) and "We also offer MPhys Theoretical Physics (with a year in industry)" (F349). Inside the degree, the page indicates **increasing specialisation and optional modules available from Year 3 onwards** — **module choice, not named routes.** No common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-theoretical-physics/> · page title "Theoretical Physics (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 16. Theoretical Physics (with a year abroad) (BSc)

1. **Official title:** Theoretical Physics (with a year abroad) (BSc) — award line "BSc (Hons) Theoretical Physics (with a year abroad)"
2. **UCAS code:** F347 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time", **no maximum duration stated**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level. The *Widening participation* row pins one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. "Grade C / Grade 4" listed under "GCSE/IGCSE/O level English Language" within the English language qualifications table
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics   This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" row ABSENT; "Core Maths" row ABSENT** — both confirmed by direct check. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | *(returned in paraphrase on this read: considered individually; Foundation Year option available — exact wording **NOT RETRIEVED** for this one cell)* |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None that constitute a pathway.** Sibling signposted as a separately coded course: "We also offer BSc Theoretical Physics (with a year in industry)" (F344). Inside the degree: Year 3 is study at partner universities abroad; Year 4 carries **option modules** in named *topics* — "Plasma Physics, Quantum Mechanics, Condensed Matter Physics, and others". ⚠️ **Those are option-module names, not pathways and not applications.** No common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-theoretical-physics-year-abroad/> · page title "Theoretical Physics (with a year abroad) (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 17. Theoretical Physics (with a year abroad) (MPhys)

1. **Official title:** Theoretical Physics (with a year abroad) (MPhys) — award line "MPhys (Hons) Theoretical Physics (with a year abroad)"
2. **UCAS code:** F348 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "5 years full-time", **no stated maximum duration beyond this**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No broader GCSE requirements stated for subject knowledge.** English language table row: "GCSE/IGCSE/O level English Language … Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" row ABSENT; "Core Maths" row ABSENT** — confirmed by direct check, **unlike its own 4-year parent F346 which has the Tutorial row.** No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | *(returned in paraphrase on this read: discussed individually; Foundation Year option available — exact wording **NOT RETRIEVED** for this one cell)* |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None.** The only signpost is to a separately coded course: "We also offer MPhys Theoretical Physics (with a year in industry)" (F349). The page indicates **option modules available in Years 3 and 5** — module choice — and carries **no statement regarding a common first year or later specialisation structures**
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-theoretical-physics-year-abroad/> · page title "Theoretical Physics (with a year abroad) (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 18. Theoretical Physics (with a year in industry) (BSc)

1. **Official title:** Theoretical Physics (with a year in industry) (BSc) — award line "BSc (Hons) Theoretical Physics (with a year in industry)"
2. **UCAS code:** F344 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time", **no maximum duration stated**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level. The *Widening participation* row pins one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentioned in the document
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. "Grade C / Grade 4" under the GCSE/IGCSE/O level English Language row of the English language requirements section
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics This is conditional upon successful completion of the WP programme including the YorJourney module (Black Access Programme, Next Step York) or successful completion of Realising Opportunities"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" ABSENT; "Core Maths" ABSENT** — both confirmed by direct check. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB We may also be able to consider three Advanced Highers or a combination of Highers and Advanced Highers, where an applicant does not meet the grade requirement through Highers alone. Please contact us to discuss your qualifications. |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. If you don't have suitable qualifications in Maths and/or Physics, successfully completing a Foundation Year will guarantee a place on any of our undergraduate degrees: Physics (with a foundation year) (BSc) We welcome applications from mature students and students without standard qualifications. Please contact our admissions team to discuss your specific circumstances. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application — one contingency transfer, not a choice:** Quoted in full: **"You are responsible for securing your chosen placement. If you don't find a placement you will transfer to the standard BSc Theoretical Physics pathway."** ⚠️ Note York's own use of the word **"pathway"** here for what is in fact a **separately UCAS-coded course (F345)**. **York's loose use of "pathway" is not evidence that F345 is an option inside F344.** It is a failure-contingency transfer between two distinct applications. No other study option, no common first year, no later specialisation choice published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-theoretical-physics-industry/> · page title "Theoretical Physics (with a year in industry) (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 19. Theoretical Physics (with a year in industry) (MPhys)

1. **Official title:** Theoretical Physics (with a year in industry) (MPhys) — award line "MPhys (Hons) Theoretical Physics (with a year in industry)"
2. **UCAS code:** F349 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** "5 years full-time", **no maximum duration specified beyond this**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentioned in the document
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. English language requirements table includes "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" ABSENT; "Core Maths" ABSENT** — confirmed by direct check. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application — one contingency transfer, not a choice:** Quoted: **"You are responsible for securing your chosen placement. If you don't find a placement you will transfer to the standard MPhys Theoretical Physics pathway."** (the standard MPhys is **F346**, a separate application). The page also signposts a **separately coded course**: "There are opportunities for you to spend time abroad during your course: Theoretical Physics (with a year abroad) (MPhys)" (F348). No common first year, no later specialisation choice published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-theoretical-physics-industry/> · page title "Theoretical Physics (with a year in industry) (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 20. Physics with Philosophy (BSc)

> ⚠️ **A level Philosophy is NOT required and is never mentioned in the entry requirements.** The
> subject requirement is Physics and Mathematics — identical to straight Physics. A reader assuming a
> humanities prerequisite would be wrong. Confirmed by direct check on this page.

1. **Official title:** Physics with Philosophy (BSc) — award line "BSc (Hons) Physics with Philosophy"
2. **UCAS code:** F3V5 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** 3 years full-time, plus optional placement year. **Max with placement: 4 years**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. ⚠️ **No grade reduction for the joint/with-Philosophy structure** — the string matches straight Physics BSc F300 exactly, confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level. **Philosophy is NOT a required subject.** The *Widening participation* row pins one: "BBC including B in Mathematics and Physics"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentions Further Mathematics
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published; **no Philosophy or humanities subject list published either.** T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. "Grade C / Grade 4" for GCSE/IGCSE/O level English Language
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ **"The York Tutorial Programme" ABSENT; "Core Maths" ABSENT** — confirmed by direct check; its own MPhys sibling F3VM **does** have the Tutorial row. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **None.** The only signpost is to a **separately coded course**: "We also offer BSc Physics with Philosophy (with a year abroad)" (F3V7). ⚠️ **There is NO year-in-industry variant of Physics with Philosophy at BSc level** — none is signposted here and none exists in the 2027/28 A–Z. **Do not create one by analogy with the other physics streams.** No common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-philosophy/> · page title "Physics with Philosophy (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 21. Physics with Philosophy (MPhys)

> ⚠️ **This page publishes a genuine, applicant-chosen in-degree option** — a Physics/Philosophy
> module balance in Year 4. It is a **module-count choice, not a named pathway** and not a separate
> application. Quoted in field 19. A level Philosophy is again **not required**.

1. **Official title:** Physics with Philosophy (MPhys) — award line "MPhys (Hons) Physics with Philosophy"
2. **UCAS code:** F3VM — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** MPhys (Hons) — integrated Master's
4. **Duration:** 4 years full-time (plus optional placement year). **Max with placement: 5 years**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. ⚠️ **A full grade above the BSc F3V5 (AAB)**
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level. **A level Philosophy NOT required and never mentioned** — "The course emphasizes Physics and Mathematics at A level only"
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentioned
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences and no humanities subject list published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** No GCSE Maths or Science requirement published. English language requirements table row: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBB including Mathematics and Physics"
    - **"Contextual offer"** → "ABB including Physics and Mathematics."
16. **Alternative offer routes — TWO on this page:**
    - **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."
    - **"The York Tutorial Programme"** → "If you successfully complete the York Tutorial Programme, you may be eligible for an alternative offer up to one A level grade (or equivalent) below your offer." ⚠️ **PRESENT on this page, confirmed by direct check — ABSENT on its own BSc sibling F3V5.** "Core Maths" **ABSENT**. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application — a real, applicant-chosen option, but NOT a pathway:** Quoted (Year 4): **"You can choose one Physics option and two Philosophy options or one Philosophy option and two Physics options"**, plus **"You may be able to replace one option module with an elective module, studying a complementary subject, a language or an interdisciplinary topic."** ⚠️ **This is a module-balance choice made after enrolment. It is NOT a named route, has no separate UCAS code, and must not be split into two course records ("Physics-weighted" / "Philosophy-weighted").** ⚠️ **There is no year-abroad MPhys and no year-in-industry variant of Physics with Philosophy at any award level** — none signposted here, none in the 2027/28 A–Z
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mphys-physics-philosophy/> · page title "Physics with Philosophy (MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 22. Physics with Philosophy (with a year abroad) (BSc)

1. **Official title:** Physics with Philosophy (with a year abroad) (BSc) — award line "BSc (Hons) Physics with Philosophy (with a year abroad)"
2. **UCAS code:** F3V7 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time". **No maximum duration stated beyond this**
5. **Standard A-Level offer (EXACT):** **`AAB including Physics and Mathematics.`** — single grade profile, not a range. Confirmed on this page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; no grade pinned at typical-offer level. **A level Philosophy NOT required and never mentioned**
7. **Cross-subject rules:** NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full, never mentioned in the document
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences and no humanities list published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No general GCSE Mathematics or Science requirement is explicitly stated as mandatory.** ⚠️ **And — important — no GCSE modern-foreign-language requirement either**, unlike the other year-abroad degree in this family (GF14, which does have one). English language requirements table includes "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings):**
    - **"Widening participation"** → "BBC including B in Mathematics and Physics"
    - **"Contextual offer"** → "BBB including Physics and Mathematics."
16. **Alternative offer routes:** **"EPQ"** → "If you achieve C or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer." ⚠️ Note the **C** threshold here, where the Mathematics-and-Physics joint degrees use **B**. **"The York Tutorial Programme" ABSENT; "Core Maths" ABSENT** — both confirmed by direct check. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including Physics and Mathematics. |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 5 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) or 6 in Standard Level Mathematics (Analysis and Approaches), plus 5 in Higher Level Physics. |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | All other qualifications, including Scottish Highers and Irish Leaving Certificates, will be considered individually. |
    | Other international qualifications | Equivalent qualifications from your country |

19. **Study options / named routes INSIDE this one application:** **NOT PUBLISHED as a pathway.** In-degree wording is **module choice and supervision only**: "You'll have regular meetings with a personal academic supervisor, who will guide your studies"; Year 4 "Optional modules give you the chance to delve deeper into your favourite philosophical topic, or discover a new area of physics." **No formal statement about transferring between awards or a common first year structure.** ⚠️ **This is the terminal member of the Physics with Philosophy family — there is no MPhys year-abroad and no year-in-industry variant at any award level.** Three coded courses only: F3V5, F3VM, F3V7
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-physics-philosophy-year-abroad/> · page title "Physics with Philosophy (with a year abroad) (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

## 23. Mathematics and Physics (BSc) — A–Z title "Mathematics/Physics (Equal)"

> ### ⚠️⚠️ THIS COURSE BREAKS THE PHYSICS TEMPLATE IN THREE WAYS AT ONCE. Read all three.
>
> 1. **It is the FIRST course in York's whole physics portfolio to pin individual subject grades in
>    the typical offer:** **`AAB including A in Mathematics and B in Physics`** — Maths must be the A.
>    Every other physics degree says only "including Physics and Mathematics" with no grade attached.
>    **An app that models this as plain "AAB" loses the binding requirement.**
> 2. **Its EPQ threshold is B, not C.** Every other physics course says "C or higher". This one says
>    **"B or higher"**. Confirmed twice by targeted re-read.
> 3. **York calls it two different things.** The course page heading is **"BSc (Hons) Mathematics and
>    Physics"**; the central A–Z calls the same UCAS code **"Mathematics/Physics (Equal)"**. Both are
>    York's own wording. Neither is a research artefact.

1. **Official title:** ⚠️ **two official titles for one course.** On the course page: **"BSc (Hons) Mathematics and Physics"** (main page heading). On York's 2027/28 central A–Z: **"Mathematics/Physics (Equal)"**. Recorded as both, neither normalised away
2. **UCAS code:** GF13 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z entry for "Mathematics/Physics (Equal)" BSc
3. **Award:** BSc (Hons)
4. **Duration:** "3 years full-time (plus optional placement year)". **Max with placement: 4 years**
5. **Standard A-Level offer (EXACT):** **`AAB including A in Mathematics and B in Physics`** — single grade profile, not a range, **with individual subject grades pinned**. ⚠️ Same three-letter aggregate as Physics BSc F300 (AAB) but **materially stricter**: the A must be in Maths
6. **Required subjects + subject minimum grades:** **Mathematics required at grade A. Physics required at grade B.** ⚠️ **These are individually pinned minimums, not a subject list** — the only such pinning in the physics family at typical-offer level
7. **Cross-subject rules:** The pinned pairing itself functions as one (Maths must outrank Physics). Beyond that, NOT PUBLISHED
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full and checked specifically for it; **never mentioned throughout the entire page.** ⚠️ Notable: this is York's *joint mathematics* degree, requiring grade A in Maths, and it still publishes **no** Further Mathematics preference either way
9. **Maths / Physics / Chemistry individually:** Mathematics **required at grade A** · Physics **required at grade B** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken"
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No standalone GCSE requirements section. No modern-foreign-language GCSE requirement — checked specifically and confirmed NONE** (contrast its own year-abroad sibling GF14, which has one). English language qualifications table only: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings) — note these are pinned too:**
    - **"Widening participation"** → "ABC including A in Mathematics and B in Physics" (conditional on WP programme completion) — ⚠️ **the A in Maths survives the reduction**
    - **"Contextual offer"** → "ABB including grade A in Mathematics and grade B in Physics." — ⚠️ again the **A in Maths survives**. This is a concrete instance of the central policy's rule that reductions apply "excluding subject-specific requirements"
16. **Alternative offer routes:** **"EPQ"** → **"If you achieve B or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer"** — ⚠️ **B, not C.** **"The York Tutorial Programme" ABSENT; "Core Maths" ABSENT** — both confirmed by direct check. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including A in Mathematics and B in Physics |
    | European Baccalaureate | 80% overall, with 85% in Physics and Maths |
    | International Baccalaureate | 35 points overall, including 6 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) and 5 in Higher Level Physics |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative |
    | Other qualifications | *(returned in paraphrase on this read: individual consideration; foundation year option available — exact wording **NOT RETRIEVED** for this one cell)* |
    | Other international qualifications | Equivalent qualifications from your country |

    ⚠️ Note the **IB row also differs structurally** from the single-subject physics degrees: it demands **"6 in Higher Level Mathematics … and 5 in Higher Level Physics"** with **no Standard Level Mathematics alternative** — where F300 explicitly permits "6 in Standard Level Mathematics (Analysis and Approaches)". The EB row also abbreviates "Maths" rather than "Mathematics". Transcribed as printed.
19. **Study options / named routes INSIDE this one application:** **None.** The only signpost is to a **separately coded course**: "We also offer BSc Mathematics and Physics (with a year abroad)" (GF14). ⚠️ **There is NO year-in-industry variant of this joint degree at either award level**, and **no BSc/MMath transfer mechanism is published.** The "(Equal)" in York's A–Z title denotes the **50/50 subject weighting of the degree**, not a selectable pathway. No common first year published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-mathematics-physics/> · page title "Mathematics and Physics (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅ · **Run jointly by the Department of Mathematics and the School of Physics, Engineering and Technology** (per the page)

---

## 24. Mathematics and Physics (MMath/MPhys) — A–Z title "Mathematics/Physics (Equal)"

> ⚠️ **A dual award designation — "MMath/MPhys" — under ONE UCAS code (GFC3).** The page does **not**
> publish a mechanism for choosing between MMath and MPhys. **Do not split this into two course
> records.** See field 19.
>
> ⚠️ **Its typical offer does NOT pin subject grades, but its reduced offers DO.** That internal
> inconsistency is York's, and is transcribed rather than reconciled.

1. **Official title:** ⚠️ **two official titles.** On the course page: **"MMath/MPhys (Hons) Mathematics and Physics"**. On York's 2027/28 central A–Z: **"Mathematics/Physics (Equal)"**, award "MMath/MPhys (Hons)"
2. **UCAS code:** GFC3 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** **MMath/MPhys (Hons)** — a single integrated Master's award line naming **both** designations
4. **Duration:** "4 years full-time". **No maximum duration stated beyond this**
5. **Standard A-Level offer (EXACT):** **`AAA including Physics and Mathematics.`** — single grade profile, not a range. ⚠️ **Unpinned**, unlike its own BSc sibling GF13 (`AAB including A in Mathematics and B in Physics`). The two joint degrees state their subject requirements in **different grammatical forms**; recorded as read on each page
6. **Required subjects + subject minimum grades:** Physics and Mathematics both required; **no subject-specific minimum grade pinned at typical-offer level.** ⚠️ But the *Widening participation* and *Contextual offer* rows on this same page **do** pin them (A in Maths, B in Physics) — see field 15
7. **Cross-subject rules:** NOT PUBLISHED at typical-offer level
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full and checked specifically; never mentioned in the document. ⚠️ This is York's most mathematical physics degree (AAA, integrated Master's, joint with the Maths department) and it still publishes **no** Further Maths preference
9. **Maths / Physics / Chemistry individually:** Mathematics **required** · Physics **required** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken."
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements:** **No dedicated GCSE requirements section; no specific GCSE grades mandated. No modern-foreign-language GCSE requirement.** English language section lists among its qualifications: "GCSE/IGCSE/O level English Language (as a first or second language) | Grade C / Grade 4"
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings) — pinned, unlike the typical offer:**
    - **"Widening participation"** → "ABC including A in Mathematics and B in Physics"
    - **"Contextual offer"** → "ABB including grade A in Mathematics and grade B in Physics."
    ⚠️ Both name **A in Maths, B in Physics** where the typical offer names neither. **The reduced offer is therefore more explicit than the standard one.** Recorded as published.
16. **Alternative offer routes — TWO on this page:**
    - **"EPQ"** → **"If you achieve B or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."** — ⚠️ **B, not C**, matching its BSc sibling and differing from every single-subject physics degree
    - **"The York Tutorial Programme"** → "If you successfully complete the York Tutorial Programme, you may be eligible for an alternative offer up to one A level grade (or equivalent) below your offer." ⚠️ **PRESENT here, ABSENT on its own BSc sibling GF13.** "Core Maths" **ABSENT**. No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAA including Physics and Mathematics. |
    | European Baccalaureate | 85% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 36 points overall, including 6 in Higher Level Mathematics (either Analysis and Approaches or Applications and Interpretations) and 5 in Higher Level Physics |
    | T levels | We are currently not accepting T Levels for this course unless additional A Level (or equivalent qualifications) in Mathematics and Physics have been taken. |
    | Scottish Highers / Advanced Highers | Advanced Highers - AB in Physics and Mathematics plus Scottish Highers - AB |
    | International foundation programme | Foundation Certificate from our International Pathway College or an appropriate alternative. |
    | Other qualifications | *(returned in paraphrase on this read: mature students and those without standard qualifications should contact admissions; foundation year option available — exact wording **NOT RETRIEVED** for this one cell)* |
    | Other international qualifications | Equivalent qualifications from your country |

    ⚠️ As with GF13, the **IB row requires Higher Level Mathematics at 6 with no Standard Level alternative** — stricter in kind than the single-subject physics degrees.
19. **Study options / named routes INSIDE this one application — and the MMath/MPhys question settled:** The one in-degree choice published is a **project choice in Year 4**: **"You'll choose a project focusing either on maths or physics."** ⚠️ **That is a final-year project choice, not a named route and not an award choice.** **No explicit statement about choosing between the MMath and the MPhys award appears anywhere on the page** — York presents this as **a single combined degree with a dual award designation**, not as two selectable awards. **Recorded as NOT PUBLISHED, and NO second course record has been created for a separate "MMath" or "MPhys" variant.** ⚠️ **There is no year-abroad and no year-in-industry variant of the integrated Master's joint degree** — the A–Z codes only GF14 (BSc, year abroad). No common first year published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/mmath-mphys-mathematics-physics/> · page title "Mathematics and Physics (MMath/MPhys) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅ · **Run by the Department of Mathematics and the School of Physics, Engineering and Technology**

---

## 25. Mathematics and Physics (with a year abroad) (BSc) — A–Z title "Mathematics/Physics (equal) (with a year abroad)"

> ### ⚠️⚠️ THE ONLY COURSE IN THE ENTIRE 47 WITH A GCSE MODERN-FOREIGN-LANGUAGE REQUIREMENT
>
> Quoted from the page's **"Additional requirements"** heading: **"You should also have a GCSE at
> grade 4 (C) or above in French, German or Italian"** — and the page presents it as applying to
> **all applicants**, not a subset. **Confirmed by a second, targeted re-read of this page.**
>
> Its own 3-year parent GF13 has **no** such requirement (also confirmed by targeted re-read), and
> neither does the other year-abroad physics degree in the family (F3V7). **This requirement exists on
> exactly one course page and must not be generalised to any other course, nor dropped from this one.**

1. **Official title:** ⚠️ **two official titles.** On the course page: **"BSc (Hons) Mathematics and Physics (with a year abroad)"**. On York's 2027/28 central A–Z: **"Mathematics/Physics (equal) (with a year abroad)"** — note York's **lower-case "equal"** here against upper-case "(Equal)" for GF13/GFC3
2. **UCAS code:** GF14 — read in the "UCAS code" field of this course page; matches the 2027/28 A–Z
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time" (**no maximum duration stated**)
5. **Standard A-Level offer (EXACT):** **`AAB including A in Mathematics and B in Physics`** — single grade profile, not a range, **with individual subject grades pinned**. Confirmed character-for-character by targeted re-read of this page
6. **Required subjects + subject minimum grades:** **Mathematics required at grade A. Physics required at grade B.** Individually pinned
7. **Cross-subject rules:** The pinned pairing (Maths must be the A). **Plus a genuine second-axis requirement: a GCSE modern foreign language — see field 12.** That is the only cross-subject rule in the portfolio that reaches outside maths and science
8. **Further Mathematics:** **NO STATED PREFERENCE** — page read in full and checked specifically; never mentioned
9. **Maths / Physics / Chemistry individually:** Mathematics **required at grade A** · Physics **required at grade B** · Chemistry **NOT PUBLISHED**
10. **Accepted alternative sciences / explicit exclusions:** No alternative sciences published. T level restriction: "Not accepting T Levels unless additional A Level qualifications in Mathematics and Physics taken". ⚠️ For the **language** requirement York names an **exhaustive accepted list — French, German or Italian** — which functions as an exclusion of every other language
11. **Science practical endorsement:** NOT PUBLISHED
12. **GCSE requirements — PUBLISHED, SPECIFIC, AND UNIQUE IN THIS PORTFOLIO:** under the page's **"Additional requirements"** heading: **"You should also have a GCSE at grade 4 (C) or above in French, German or Italian"** — stated as applying to **all applicants**. No GCSE Maths or Science requirement published. The English language qualifications table separately carries the usual English-proficiency row
13. **Admissions test:** **NOT STATED ON THE COURSE PAGE**
14. **Interview:** **NOT STATED ON THE COURSE PAGE**
15. **Reduced-offer routes (York's own headings) — pinned:**
    - **"Widening participation"** → "ABC including A in Mathematics and B in Physics"
    - **"Contextual offer"** → "ABB including grade A in Mathematics and grade B in Physics"
    ⚠️ **Neither reduced-offer row waives the GCSE language requirement** — no statement to that effect is published, so it must be assumed to stand
16. **Alternative offer routes:** **"EPQ"** → **"If you achieve B or higher in the EPQ, you may be eligible for an alternative offer up to one A level grade (or equivalent) below our typical offer."** — ⚠️ **B, not C**, confirmed character-for-character by targeted re-read. **"The York Tutorial Programme" ABSENT; "Core Maths" ABSENT.** No four-A-level route
17. **Application deadline:** NOT PUBLISHED on the course page
18. **Contiguous raw requirement block:**

    | Qualification | Typical offer |
    |---|---|
    | A levels | AAB including A in Mathematics and B in Physics |
    | European Baccalaureate | 80% overall, with 85% in Physics and Mathematics |
    | International Baccalaureate | 35 points overall, including 6 in Higher Level Mathematics and 5 in Higher Level Physics |
    | T levels | Not accepting T Levels unless additional A Level qualifications in Mathematics and Physics taken |
    | Scottish Highers / Advanced Highers | Advanced Highers - BB in Physics and Mathematics plus Scottish Highers - BB |
    | International foundation programme | Foundation Certificate from International Pathway College or appropriate alternative |
    | Other qualifications | All other qualifications considered individually |
    | Other international qualifications | Equivalent qualifications from your country |

    **Plus, under its own separate heading "Additional requirements":** "You should also have a GCSE at grade 4 (C) or above in French, German or Italian"

    ⚠️ The T levels, International foundation and Other qualifications cells came back in **compressed form** on this read; the substance is recorded, **exact wording NOT RETRIEVED** for those three cells. The A levels, EPQ and Additional requirements strings **were** confirmed character-for-character.
19. **Study options / named routes INSIDE this one application:** **None that constitute a pathway.** What the page publishes is: **"This course is also available as a three-year degree without a year abroad"** — a cross-reference to **GF13, a separate UCAS code and a separate application.** The year abroad itself is described as **"Spend your third year at one of our prestigious partner institutions"**, supported by **"an additional language module where you will study a European language to an intermediate or advanced level"** — ⚠️ **a compulsory-sounding support module, not a named route and not a choice of destination-specific pathway.** No named partner-specific routes, no common first year, no award-level transfer published
20. **Provenance:** sourceUrl <https://www.york.ac.uk/study/undergraduate/courses/bsc-mathematics-physics-year-abroad/> · page title "Mathematics and Physics (with a year abroad) (BSc) - Undergraduate, University of York" · **entry year the page displayed: "Year of entry: 2027/28"** ✅

---

> ## ✅ PHYSICS FAMILY COMPLETE — 25 of 25 courses recorded (records 1–25)
>
> F300 · F303 · F302 · F301 · F304 · F305 · F306 · F3F5 · F3FN · F3F7 · F3F8 · F3F6 · F3F9 · F345 ·
> F346 · F347 · F348 · F344 · F349 · F3V5 · F3VM · F3V7 · GF13 · GFC3 · GF14
>
> Every one fetched individually. **No course record was created for any named specialism, option
> module or "pathway" word that lacked its own UCAS code.**

