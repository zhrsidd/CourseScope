# University of Leeds — Undergraduate Admissions Research (Physics & Engineering)

**Target entry year:** 2027 entry
**Research date:** 2026-09-14
**Source policy:** `leeds.ac.uk` only as admissions evidence. All values below were read from the fetched official page. Third-party guides not used.



# SUMMARY

## Counts

| | Physics | Engineering | Adjacent | Total |
|---|---|---|---|---|
| In-scope courses found in the official catalogue | 24 | 54 | 1 | **79** |
| **Pages fetched and fields recorded** | **16** | **24** | **1** | **41** |
| Pages returning HTTP 403 on both attempts → NOT RETRIEVED | 7 | 4 | 0 | **11** |
| In scope but NOT ATTEMPTED (no data held) | 1 | 26 | 0 | **27** |

Catalogue established by paging **all 21 pages / 301 results** of the official undergraduate
course search, not from the research brief.

## Entry year actually shown on the 41 verified pages — the headline problem

**Only 24 of the 41 verified pages showed 2027 entry.** The rest showed earlier years, or
contradicted themselves:

| Entry year the page showed | Count | Examples |
|---|---|---|
| **2027** | 24 | Physics BSc F300, Mechanical BEng H305, Chemical BEng H805 |
| **2026** | 6 | Physics MPhys F302, Physics (Industrial) BSc F303 & MPhys F305, Astro (International) MPhys F3F1, Civil & Structural MEng H200, PwAI (International) BSc F312 |
| **2025** (stale) | 3 | Astro (Industrial) BSc F3F7, Astro (Industrial) MPhys F3F2, Theoretical (International) BSc F3K3 |
| **2021** (stale) | 1 | **Theoretical Physics MPhys, BSc F340** |
| **AMBIGUOUS — conflicting signals on one page** | 3 | Product Design H795, Electronics & Computer MEng H6B8, PwAI (Industrial) BSc F311 |

No course page has a year-of-entry selector, and `?year=2027` / `?entryYear=2027` return 403,
so there is **no way to force the 2027 view**. Every non-2027 figure in this file is labelled as
its own year, and **no 2026/2025/2021 figure has been recorded as 2027.**

## Expected courses from the brief that DO NOT EXIST

- **Astrophysics** as a standalone degree — only `Physics with Astrophysics` exists
- **Chemical and Energy Engineering** — no such course
- **"Aerospace Engineering"** as a title — it is `Aeronautical and Aerospace Engineering`
- **"Mechatronics and Robotics"** as a title — it is `Mechatronics and Robotics Engineering`
- **"Physics with study abroad" / "with an industrial placement year"** as titles — Leeds uses
  `(International)` and `(Industrial)`
- **Per-subject "international foundation year" variants** — only generic
  `Bachelor Degree with Integrated International Foundation Year (Engineering) BEng` / `(Science) BSc`

## Not in the brief but real

- **`Physics with Artificial Intelligence`** — an entire 6-UCAS-code family (F310/F315/F311/F316/F312/F317)
- **`Civil and Structural Engineering`** and **`Civil and Environmental Engineering`** — two more
  4-code Civil families beyond plain Civil Engineering
- `Architecture MEng, BEng` (K1H2) and `Music, Multimedia and Electronics BSc` (WGH4) sit adjacent
  to the engineering space; not researched as in-scope

## Structural surprises that contradict reasonable assumptions

1. **Year in industry / year abroad are separate UCAS codes, not study options** — `(Industrial)`
   and `(International)` suffixes. This is what makes the catalogue 79 courses rather than ~27.
2. **…and yet they are ALSO study options inside the base code.** `Physics with Astrophysics BSc`
   (F3F5) states you may take the placement or year abroad and `you'll be awarded the 'industrial'
   variant in your degree title`. Both routes to the same award exist simultaneously.
3. **Engineering has no `(International)` variants at all** — only `(Industrial)`. Physics has both.
4. **The BEng → MEng uplift is family-specific.** Identical for Mechanical, Automotive, Medical,
   Chemical and Materials; but Architectural, Electronics & Computer and Mechatronics all jump
   `AAB` → `AAA`, with their contextual and EPQ offers moving too. Copying a BEng offer onto its
   MEng sibling would be wrong for 3 of the 8 pairs verified.
5. **Four different EPQ mechanisms**, which must not be normalised: Physics reduces `AAA`→`AAB` on
   an A in EPQ; Mechanical/Aerospace/Automotive/Medical reduce `A*AA`→`AAA` **and** require the
   EPQ grade A as an extra condition; Civil/Architectural reduce to `ABB`/`AAB` with `A in
   Mathematics`; Product Design reduces to `ABB` with no subject clause at all.
6. **Civil Engineering, Civil & Environmental and Civil & Structural publish a real admissions
   test and interview** — a `diagnostic Maths test` plus `an interview` on the BTEC `D*D*D` route.
   Every other in-scope course is silent on tests, recorded as **not stated**, never as "none".
7. **Contextual offers span `AAB` down to `BBB`, plus a unique `ABC`** (Materials Science). Civil
   Engineering's `BBB` is five grade-steps below Mechanical's `A*AA` standard offer.
8. **Medical Engineering is the only course accepting Biology** as the science (`Physics, Chemistry
   or Biology`). Chemical Engineering does **not** compel Chemistry. Electronic & Electrical,
   Electronics & Computer and Mechatronics require **Maths only** — no science at all.
9. **Product Design is the outlier**: a BSc from the engineering faculty, no required A-level
   subject, but the heaviest GCSE bar found (`Mathematics grade 6 (B) and Combined Science 6-6
   (B-B)`), and the only page that explicitly rules a portfolio **out** of the decision.
10. **Further Mathematics is unpublished on all 78 Physics and Engineering pages checked.** It
    appears only on the adjacent `Mathematics and Physics BSc` (FG31) — which is also the only
    course with a **range** offer (`AAA - AAB`) and the only one using the string `A*BB`.
11. **Application deadlines are essentially unpublished.** Every page defers to UCAS. Only
    `Civil and Structural Engineering MEng` (H200) prints anything substantive.
12. **The science practical endorsement is NOT universal** — absent from Architectural Engineering
    BEng, Civil & Environmental BEng, Electronics & Computer (both), Mechatronics (both) and
    Product Design, while present on their siblings. Recorded as not published, never as waived.

## Retrieval caveats a consumer of this file must know

- **Field 18 (contiguous raw block) is largely NOT RETRIEVED.** Pages were read through text
  extraction returning discrete passages, so multi-sentence contiguity cannot be asserted. Only
  unambiguously single printed lines were recorded. No fragments were stitched.
- **11 pages 403'd on both attempts.** The 403s are stable and URL-specific: siblings on the same
  host fetched normally in the same batch, so this looks like per-page blocking rather than rate
  limiting.
- **26 engineering `(Industrial)` variants plus F317 were never fetched.** They hold no data.
- **3 pages carry internally contradictory year labels** and should be re-checked before publication.

---

## A. CATALOGUE ENUMERATION (how the in-scope list was established)

The in-scope list was NOT taken from the research brief. It was derived by paging the
complete official undergraduate course search, alphabetically, all 21 pages / 301 results:

`https://courses.leeds.ac.uk/course-search?query=&level=undergraduate&page=1..21`

Keyword search (`?query=physics`, `?query=engineering`) was rejected as a catalogue source
because it is relevance-ranked and returns out-of-scope noise (Economics BSc, Computer
Science BSc, Medicinal Chemistry BSc all appeared in the `physics` result set).

### Structural finding that drives the whole record count

Leeds does **not** treat a year in industry or a year abroad as a study option inside one
UCAS application for Physics/Engineering. It publishes them as **separate courses with
separate UCAS codes**, using the suffixes:

- `(Industrial)` — year in industry
- `(International)` — year abroad / study abroad

So each base programme typically has 2 awards (BSc/BEng and the integrated masters
"MPhys, BSc" / "MEng, BEng") × up to 3 route variants (plain, Industrial, International).
Each of those is a separate UCAS code and therefore a separate record.

**Asymmetry worth noting:** Physics programmes have BOTH `(Industrial)` and
`(International)` variants. Engineering programmes have `(Industrial)` variants but
**no `(International)` variants** were found anywhere in the 301-course catalogue.
Product Design has only a BSc + `(Industrial)` BSc — no integrated masters.

### A.1 Physics — School of Physics and Astronomy (24 separate UCAS codes)

| # | Title as printed | UCAS | URL |
|---|---|---|---|
| 1 | Physics BSc | F300 | https://courses.leeds.ac.uk/3580/physics-bsc |
| 2 | Physics MPhys, BSc | F302 | https://courses.leeds.ac.uk/f332/physics-mphys-bsc |
| 3 | Physics (Industrial) BSc | F303 | https://courses.leeds.ac.uk/3631/physics-industrial-bsc |
| 4 | Physics (Industrial) MPhys, BSc | F305 | https://courses.leeds.ac.uk/g512/physics-industrial-mphys-bsc |
| 5 | Physics (International) BSc | F304 | https://courses.leeds.ac.uk/g976/physics-international-bsc |
| 6 | Physics (International) MPhys, BSc | F306 | https://courses.leeds.ac.uk/g380/physics-international-mphys-bsc |
| 7 | Physics with Artificial Intelligence BSc | F310 | https://courses.leeds.ac.uk/k050/physics-with-artificial-intelligence-bsc |
| 8 | Physics with Artificial Intelligence MPhys, BSc | F315 | https://courses.leeds.ac.uk/k051/physics-with-artificial-intelligence-mphys-bsc |
| 9 | Physics with Artificial Intelligence (Industrial) BSc | F311 | https://courses.leeds.ac.uk/k058/physics-with-artificial-intelligence-industrial-bsc |
| 10 | Physics with Artificial Intelligence (Industrial) MPhys, BSc | F316 | https://courses.leeds.ac.uk/k060/physics-with-artificial-intelligence-industrial-mphys-bsc |
| 11 | Physics with Artificial Intelligence (International) BSc | F312 | https://courses.leeds.ac.uk/k059/physics-with-artificial-intelligence-international-bsc |
| 12 | Physics with Artificial Intelligence (International) MPhys, BSc | F317 | https://courses.leeds.ac.uk/k061/physics-with-artificial-intelligence-international-mphys-bsc |
| 13 | Physics with Astrophysics BSc | F3F5 | https://courses.leeds.ac.uk/3600/physics-with-astrophysics-bsc |
| 14 | Physics with Astrophysics MPhys, BSc | F3FM | https://courses.leeds.ac.uk/f334/physics-with-astrophysics-mphys-bsc |
| 15 | Physics with Astrophysics (Industrial) BSc | F3F7 | https://courses.leeds.ac.uk/3632/physics-with-astrophysics-industrial-bsc |
| 16 | Physics with Astrophysics (Industrial) MPhys, BSc | F3F2 | https://courses.leeds.ac.uk/i587/physics-with-astrophysics-industrial-mphys-bsc |
| 17 | Physics with Astrophysics (International) BSc | F3F8 | https://courses.leeds.ac.uk/g977/physics-with-astrophysics-international-bsc |
| 18 | Physics with Astrophysics (International) MPhys, BSc | F3F1 | https://courses.leeds.ac.uk/g381/physics-with-astrophysics-international-mphys-bsc |
| 19 | Theoretical Physics BSc | F3K0 | https://courses.leeds.ac.uk/3686/theoretical-physics-bsc |
| 20 | Theoretical Physics MPhys, BSc | F340 | https://courses.leeds.ac.uk/f400/theoretical-physics-mphys-bsc |
| 21 | Theoretical Physics (Industrial) BSc | F3K2 | https://courses.leeds.ac.uk/g959/theoretical-physics-industrial-bsc |
| 22 | Theoretical Physics (Industrial) MPhys, BSc | F342 | https://courses.leeds.ac.uk/g898/theoretical-physics-industrial-mphys-bsc |
| 23 | Theoretical Physics (International) BSc | F3K3 | https://courses.leeds.ac.uk/g978/theoretical-physics-international-bsc |
| 24 | Theoretical Physics (International) MPhys, BSc | F343 | https://courses.leeds.ac.uk/g383/theoretical-physics-international-mphys-bsc |

Adjacent (joint honours, School of Mathematics co-owned — recorded for completeness):
Mathematics and Physics BSc | FG31 | https://courses.leeds.ac.uk/k279/mathematics-and-physics-bsc

### A.2 Engineering — Faculty of Engineering and Physical Sciences (54 separate UCAS codes)

| # | Title as printed | UCAS | URL |
|---|---|---|---|
| 1 | Aeronautical and Aerospace Engineering BEng | H415 | https://courses.leeds.ac.uk/a225/ |
| 2 | Aeronautical and Aerospace Engineering MEng, BEng | H410 | https://courses.leeds.ac.uk/f414/ |
| 3 | Aeronautical and Aerospace Engineering (Industrial) BEng | H417 | https://courses.leeds.ac.uk/g662/ |
| 4 | Aeronautical and Aerospace Engineering (Industrial) MEng, BEng | H412 | https://courses.leeds.ac.uk/g285/ |
| 5 | Architectural Engineering BEng | HK26 | https://courses.leeds.ac.uk/a248/ |
| 6 | Architectural Engineering MEng, BEng | HK21 | https://courses.leeds.ac.uk/f416/ |
| 7 | Architectural Engineering (Industrial) BEng | HK28 | https://courses.leeds.ac.uk/i143/ |
| 8 | Architectural Engineering (Industrial) MEng, BEng | HK23 | https://courses.leeds.ac.uk/g652/ |
| 9 | Automotive Engineering BEng | H335 | https://courses.leeds.ac.uk/4794/ |
| 10 | Automotive Engineering MEng, BEng | H330 | https://courses.leeds.ac.uk/f413/ |
| 11 | Automotive Engineering (Industrial) BEng | H337 | https://courses.leeds.ac.uk/i038/ |
| 12 | Automotive Engineering (Industrial) MEng, BEng | H332 | https://courses.leeds.ac.uk/g287/ |
| 13 | Chemical Engineering BEng | H805 | https://courses.leeds.ac.uk/4810/ |
| 14 | Chemical Engineering MEng, BEng | H800 | https://courses.leeds.ac.uk/f463/ |
| 15 | Chemical Engineering (Industrial) BEng | H807 | https://courses.leeds.ac.uk/g832/ |
| 16 | Chemical Engineering (Industrial) MEng, BEng | H802 | https://courses.leeds.ac.uk/g702/ |
| 17 | Civil and Environmental Engineering BEng | H296 | https://courses.leeds.ac.uk/4836/ |
| 18 | Civil and Environmental Engineering MEng, BEng | H291 | https://courses.leeds.ac.uk/f443/ |
| 19 | Civil and Environmental Engineering (Industrial) BEng | H298 | https://courses.leeds.ac.uk/i064/ |
| 20 | Civil and Environmental Engineering (Industrial) MEng, BEng | H293 | https://courses.leeds.ac.uk/g839/ |
| 21 | Civil and Structural Engineering BEng | H205 | https://courses.leeds.ac.uk/a252/ |
| 22 | Civil and Structural Engineering MEng, BEng | H200 | https://courses.leeds.ac.uk/f412/ |
| 23 | Civil and Structural Engineering (Industrial) BEng | H209 | https://courses.leeds.ac.uk/i323/ |
| 24 | Civil and Structural Engineering (Industrial) MEng, BEng | H208 | https://courses.leeds.ac.uk/g653/ |
| 25 | Civil Engineering BEng | H203 | https://courses.leeds.ac.uk/i444/ |
| 26 | Civil Engineering MEng, BEng | H204 | https://courses.leeds.ac.uk/i445/ |
| 27 | Civil Engineering (Industrial) BEng | H207 | https://courses.leeds.ac.uk/j155/ |
| 28 | Civil Engineering (Industrial) MEng, BEng | H206 | https://courses.leeds.ac.uk/j621/ |
| 29 | Electronic and Electrical Engineering BEng | H605 | https://courses.leeds.ac.uk/5000/ |
| 30 | Electronic and Electrical Engineering MEng, BEng | H600 | https://courses.leeds.ac.uk/f456/ |
| 31 | Electronic and Electrical Engineering (Industrial) BEng | H601 | https://courses.leeds.ac.uk/e917/ |
| 32 | Electronic and Electrical Engineering (Industrial) MEng, BEng | H606 | https://courses.leeds.ac.uk/g539/ |
| 33 | Electronics and Computer Engineering BEng | H6B7 | https://courses.leeds.ac.uk/j749/ |
| 34 | Electronics and Computer Engineering MEng, BEng | H6B8 | https://courses.leeds.ac.uk/j748/ |
| 35 | Electronics and Computer Engineering (Industrial) BEng | H6B6 | https://courses.leeds.ac.uk/k000/ |
| 36 | Electronics and Computer Engineering (Industrial) MEng, BEng | H6B9 | https://courses.leeds.ac.uk/k001/ |
| 37 | Materials Science and Engineering BEng | J510 | https://courses.leeds.ac.uk/i984/ |
| 38 | Materials Science and Engineering MEng, BEng | J511 | https://courses.leeds.ac.uk/i981/ |
| 39 | Materials Science and Engineering (Industrial) BEng | J512 | https://courses.leeds.ac.uk/j955/ |
| 40 | Materials Science and Engineering (Industrial) MEng, BEng | J513 | https://courses.leeds.ac.uk/j999/ |
| 41 | Mechanical Engineering BEng | H305 | https://courses.leeds.ac.uk/5200/ |
| 42 | Mechanical Engineering MEng, BEng | H300 | https://courses.leeds.ac.uk/f411/ |
| 43 | Mechanical Engineering (Industrial) BEng | H307 | https://courses.leeds.ac.uk/g894/ |
| 44 | Mechanical Engineering (Industrial) MEng, BEng | H302 | https://courses.leeds.ac.uk/g289/ |
| 45 | Mechatronics and Robotics Engineering BEng | HH41 | https://courses.leeds.ac.uk/j914/ |
| 46 | Mechatronics and Robotics Engineering MEng, BEng | HH36 | https://courses.leeds.ac.uk/j915/ |
| 47 | Mechatronics and Robotics Engineering (Industrial) BEng | HH42 | https://courses.leeds.ac.uk/k003/ |
| 48 | Mechatronics and Robotics Engineering (Industrial) MEng, BEng | HH37 | https://courses.leeds.ac.uk/k002/ |
| 49 | Medical Engineering BEng | HHH1 | https://courses.leeds.ac.uk/a239/ |
| 50 | Medical Engineering MEng, BEng | HHH6 | https://courses.leeds.ac.uk/f447/ |
| 51 | Medical Engineering (Industrial) BEng | HHH3 | https://courses.leeds.ac.uk/g931/ |
| 52 | Medical Engineering (Industrial) MEng, BEng | HHH8 | https://courses.leeds.ac.uk/g342/ |
| 53 | Product Design BSc | H795 | https://courses.leeds.ac.uk/a602/ |
| 54 | Product Design (Industrial) BSc | H797 | https://courses.leeds.ac.uk/g893/ |

### A.3 Expected courses from the brief that DO NOT EXIST in the Leeds catalogue

Verified by exhaustive alphabetical enumeration of all 301 undergraduate courses:

- **Astrophysics** (standalone degree) — **DOES NOT EXIST.** Page 2 of the alphabetical
  listing runs `Arts and Humanities with Foundation Year BA` → `Audiology BSc` with no
  "Astrophysics" entry between them. Astrophysics exists only as `Physics with Astrophysics`.
- **Chemical and Energy Engineering** — **DOES NOT EXIST.** Page 4 runs
  `Chemical Engineering (Industrial) MEng, BEng` → `Chemistry BSc` with nothing between.
- **"Aerospace Engineering"** (that exact title) — **DOES NOT EXIST**; the programme is
  titled `Aeronautical and Aerospace Engineering`.
- **"Mechatronics and Robotics"** (that exact title) — the printed title is
  `Mechatronics and Robotics Engineering`.
- **"Physics with study abroad" / "Physics with an industrial placement year"** (those
  titles) — do not exist as printed; the equivalents are `Physics (International)` and
  `Physics (Industrial)`.
- **"with an international foundation year" variants of named Physics/Engineering
  degrees** — do not exist per-subject. Leeds publishes only generic
  `Bachelor Degree with Integrated International Foundation Year (Engineering) BEng`
  and `(Science) BSc` (no UCAS code shown in the listing).

### A.4 Not in the brief but present in the catalogue (structural surprises)

- **`Physics with Artificial Intelligence`** — a full family of 6 separate UCAS codes
  (F310/F315/F311/F316/F312/F317). Not mentioned in the brief at all.
- **`Civil and Structural Engineering`** and **`Civil and Environmental Engineering`** —
  two further 4-code Civil families beyond plain `Civil Engineering`.
- **`Architecture MEng, BEng` (K1H2)**, `Architecture MArch, MEng` (K1H3) and their
  `(Industrial)` variants sit in the engineering award space but are Architecture, not
  Architectural Engineering. Recorded here as adjacent; not researched as in-scope.
- **`Music, Multimedia and Electronics BSc` (WGH4)** — an electronics-bearing BSc outside
  the Engineering naming convention. Adjacent; not researched as in-scope.

---

## B. COURSE RECORDS

Field numbering follows the brief:
1 title · 2 UCAS · 3 award · 4 duration · 5 standard A-Level offer (verbatim) ·
6 required subjects · 7 cross-subject rules · 8 Further Maths status ·
9 Maths/Physics/Chemistry individually · 10 alternative & excluded sciences ·
11 practical endorsement · 12 GCSE · 13 admissions test · 14 interview ·
15 contextual/WP/access routes (each separately) · 16 alternative offer routes ·
17 deadline · 18 contiguous raw block · 19 study options · 20 provenance

### ⚠️ CRITICAL PROVENANCE FINDING — Leeds' catalogue is MIXED between 2026 and 2027 entry

As of the research date (2026-09-14) the Leeds course pages have **not all rolled over to
2027 entry**. Sibling courses in the same family show different years, and there is **no
year-of-entry dropdown or toggle** on the course pages to switch between them (verified
explicitly on `f332`: *"No dropdown or toggle menu is present on this page."*). Attempts to
pin the year via query string (`?year=2027`, `?entryYear=2027`) return HTTP 403.

Evidence that `f332` (Physics MPhys, BSc) is genuinely a **2026 entry** page, not 2027:
- `"Start date: September 2026"`
- `"Tuition fees for UK undergraduate students starting in 2026/27 are £9,790."`
- `"As we're currently reviewing the curriculum, specific optional modules have not been confirmed for 2026 entry."`

Therefore **each record below states the entry year its own page actually showed.** Where a
page showed 2026, the offer is recorded as a **2026-entry** figure and the 2027 figure is
marked **NOT PUBLISHED (2027 not yet on page)**. No 2026 figure has been relabelled as 2027.

### Note on Field 18 (contiguous raw block)

Pages were read through WebFetch's text extraction, which returns discrete quoted passages.
Contiguity of a *multi-sentence* block therefore cannot be asserted from the evidence
available, so Field 18 records only text that is unambiguously a single printed line, and is
otherwise marked **NOT RETRIEVED (contiguity not verifiable via extraction)**. Fragments have
not been stitched together.

---

## 1. Physics BSc

**Fields**
1. **Physics BSc**
2. F300
3. BSc
4. `3 Years (Full time)`. Max: study-abroad or placement year each `extend your studies by 12 months` (see Field 19) — but those extended routes have their own UCAS codes.
5. `Typical A-level offer: AAA (specific subject requirements)` — subject line: `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**
6. Physics and Mathematics, both at the offer grade (no separate lower subject minimum published)
7. `including Physics and Mathematics` — both required together. No "one of X/Y/Z" rule published. No "at least one at A*" rule published.
8. Further Mathematics — **NOT PUBLISHED** on this page (no mention in any form)
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED** (not named)
10. Accepted alternative science subjects: **NOT PUBLISHED**. Explicitly NOT accepted subjects: **NOT PUBLISHED**
11. `Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification. We will accept Level 2 Functional Skills English instead of GCSE English.`
13. **Admissions test — NOT STATED for standard entry.** There is no admissions-test statement of any kind for the standard route (neither a required test nor an explicit "no test"). The only test wording anywhere on the page belongs to a separate mature-applicant route: `you may be asked to take tests in English and maths and to write an essay`. Recorded as **not stated**, NOT as "no admissions test".
14. **Interview — NOT STATED.** No interview wording of any kind appears on the page. Recorded as **not stated**, NOT as "no interview".
15. Reduced-offer routes, recorded separately under Leeds' own headings:
    - **`Access to Leeds`** — description: `Access to Leeds is a contextual admissions scheme which accepts applications from individuals who might be from low income households, in the first generation of their immediate family to apply to higher education, or have had their studies disrupted.` Offer: `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative Entry Scheme for Mature Students`** — `If you are a mature applicant (over 21) and you don't have the required A Levels or GCSE English and maths qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme). As part of this, you may be asked to take tests in English and maths and to write an essay.`
    - Care-experienced / access-for-care-leavers specific offer: **NOT PUBLISHED** on this page
16. Alternative offer route — **`Extended Project Qualification (EPQ) and International Project Qualification (IPQ)`**: `We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them, and where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB` with `A in Physics and Mathematics`**
17. Application deadline — **NOT PUBLISHED** (page directs applicants to UCAS rather than printing a date)
18. Single printed line, verbatim: `A-level: AAA including Physics and Mathematics.` — longer contiguous block **NOT RETRIEVED (contiguity not verifiable via extraction)**
19. **Study options within this UCAS application:**
    - **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too. From Europe to Asia, the USA to Australasia, we have many University partners worldwide you can apply to, spanning across some of the most popular destinations for students. This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months.`
    - **`Work placements`** — `A placement year is a great way to help you decide on a career path when you graduate. You'll develop your skills and gain a real insight into working life in a particular company or sector. It will also help you to stand out in a competitive graduate jobs market and improve your chances of securing the career you want.` … `If you decide to undertake a placement year, this will extend your period of study by 12 months and, on successful completion, you'll be awarded the 'industrial' variant in your degree title to demonstrate your added experience to future employers.`
    - **Surprise:** F300 itself offers both a study-abroad year and a placement year as in-application options, even though Leeds *also* sells `Physics (Industrial)` (F303) and `Physics (International)` (F304) as separate UCAS codes for the same thing. Chosen after admission; no separate UCAS code needed for the F300 route.
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/3580/physics-bsc` · page heading: `Physics BSc` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---

## 2. Physics MPhys, BSc

> **⚠️ This page showed 2026 entry, not 2027.** All grade figures below are **2026-entry**
> figures. The 2027-entry offer for this course is **NOT PUBLISHED** on the page.

**Fields**
1. **Physics MPhys, BSc**
2. F302
3. MPhys, BSc (integrated masters)
4. `4 Years (Full time)`
5. **2026 entry:** `Typical A-level offer: AAA (specific subject requirements)` — subject line `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. **2027 entry: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z" rule; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Alternative sciences / excluded subjects — **NOT PUBLISHED**
11. `Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED for standard entry.** Only mature-route wording exists: `you may be asked to take tests in English and maths and to write an essay`. Not recorded as "no test".
14. **Interview — NOT STATED.** No interview wording on the page.
15. Reduced-offer routes under Leeds' own headings:
    - **`Access to Leeds`** — `Access to Leeds is a contextual admissions scheme...` Offer: `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`** (2026 entry)
    - **`Alternative Entry Scheme for Mature Students`** — `If you are a mature applicant (over 21) and you don't have the required A Levels or GCSE English and maths qualifications...`
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes:
    - **`Extended Project Qualification (EPQ), International Project Qualification (IPQ)`**: `We recognise the value of these qualifications... may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**
    - **`Access to HE Diploma`**: `Overall pass of the Access to HE, with 45 credits at level 3. Of these 45 credits, 30 level 3 credits must be in Physics and Mathematics and must be passed with Distinction.`
17. `Apply to this course and check the deadline for applications through the UCAS website.` — no date printed; deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:** `Study abroad` — `...option to spend time abroad as an extra academic year and will extend your studies by 12 months.` · `Work placements` — `...extend your period of study by 12 months and... awarded the 'industrial' variant in your degree title.` Chosen after admission.
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/f332/physics-mphys-bsc` · heading: `Physics MPhys, BSc` · **entry year shown: 2026** (`Start date: September 2026`; `Tuition fees for UK undergraduate students starting in 2026/27`; `specific optional modules have not been confirmed for 2026 entry`). No year selector present.

---

## 3. Physics (Industrial) BSc

> **⚠️ This page showed 2026 entry, not 2027.** Figures are **2026-entry**; 2027 **NOT PUBLISHED**.

**Fields**
1. **Physics (Industrial) BSc**
2. F303
3. BSc
4. `4 Years (Full time)` (3-year degree + industrial placement year)
5. **2026 entry:** `Typical A-level offer: AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. **2027: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No cross-subject "one of" rule; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. `Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED for standard entry.** Mature route only: `you may be asked to take tests in English and maths and to write an essay`.
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — offer printed as `Typical Access to Leeds A Level offer:` `ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative entry` (Mature Students)** — `If you are a mature applicant (over 21) and you don't have the required A Levels or GCSE English and maths qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).`
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes:
    - **`Extended Project Qualification (EPQ) and International Project Qualification (IPQ)`**: `We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them, and where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**
    - **`Access to HE Diploma`**: `Overall pass of the Access to HE, with 45 credits at level 3. Of these 45 credits, 30 level 3 credits must be in Physics and Mathematics and must be passed with Distinction.`
17. Deadline — **NOT PUBLISHED** (generic UCAS reference only)
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:**
    - **`Industrial placement year`** — `This programme gives you the opportunity to undertake a paid industrial placement year as part of the course.`
    - **`Work placements`** — `This programme gives you the opportunity to undertake a paid industrial placement year as part of the course. It's important to note, work placements are not guaranteed.`
    - **`Study abroad`** — `This degree does not offer the option to study abroad. However, the Physics (International) BSc degree does have this option.` (i.e. study abroad is **excluded** from this UCAS code)
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/3631/physics-industrial-bsc` · heading: `Physics (Industrial) BSc` · **entry year shown: 2026** (`Start date: September 2026`; requirements stated for applicants `starting in 2026/27`)

---

## 4. Physics (Industrial) MPhys, BSc

> **⚠️ This page showed 2026 entry, not 2027.** Figures are **2026-entry**; 2027 **NOT PUBLISHED**.

**Fields**
1. **Physics (Industrial) MPhys, BSc**
2. F305
3. MPhys, BSc (integrated masters)
4. `5 Years (Full time)` (4-year integrated masters + industrial placement year)
5. **2026 entry:** `Typical A-level offer: AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. **2027: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Alternative sciences / excluded subjects — **NOT PUBLISHED** (an `Alternative qualification` block lists qualification *types*, not substitute science subjects)
11. `Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification. We will accept Level 2 Functional Skills English instead of GCSE English.`
13. **Admissions test — NOT STATED for standard entry.** Mature route only: `may be asked to take tests in English and maths`.
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Access to Leeds is a contextual admissions scheme which accepts applications from individuals who might be from low income households, in the first generation of their immediate family to apply to higher education, or have had their studies disrupted. Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative Entry Scheme for Mature Students`** — `If you are a mature applicant (over 21) and you don't have the required A Levels or GCSE English and maths qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).`
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes — page carries an **`Alternative qualification`** block with sub-headings `Access to HE Diploma`, `BTEC`, `Cambridge Pre-U`, `International Baccalaureate`, `Irish Leaving Certificate (higher Level)`, `Scottish Highers / Advanced Highers`, `T-Levels`. Per-qualification grade strings **NOT RETRIEVED** for this course. An A-level EPQ alternative was **not surfaced** on this page — recorded as **NOT RETRIEVED**, not as absent.
17. `Apply to this course and check the deadline for applications through the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:**
    - **`Industrial placement year`** — `This programme gives you the opportunity to undertake a paid industrial placement year as part of the course.`
    - **`Work placement`** — `This programme gives you the opportunity to undertake a paid industrial placement year as part of the course. It's important to note, work placements are not guaranteed.`
    - **`Study abroad`** — `This degree does not offer the option to study abroad. However, the Physics (International) MPhys, BSc degree does have this option.`
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/g512/physics-industrial-mphys-bsc` · heading: `Physics (Industrial) MPhys, BSc` · **entry year shown: 2026** (`Start date: September 2026`)

---

## 5. Physics (International) BSc — **PAGE NOT RETRIEVED**

**Fields**
1. **Physics (International) BSc** — title from the official Leeds course-search listing
2. F304 — from the official Leeds course-search listing
3. BSc
4. **NOT RETRIEVED**
5. **NOT RETRIEVED** — no offer figure recorded. Do **not** infer from `Physics BSc` (F300) or from `Physics (International) MPhys, BSc` (F306).
6.–19. **ALL NOT RETRIEVED**
20. **Provenance** — attempted sourceUrl: `https://courses.leeds.ac.uk/g976/physics-international-bsc`. **HTTP 403 on four attempts**: plain URL (×2), cache-busting `?v=2`, and bare `https://courses.leeds.ac.uk/g976/`. Entry year shown: **NOT RETRIEVED**. Title and UCAS code above come from the official course-search listing page, which did load; every requirement field is unretrieved.

---

## 6. Physics (International) MPhys, BSc

**Fields**
1. **Physics (International) MPhys, BSc**
2. F306
3. MPhys, BSc (integrated masters)
4. `4 Years (Full time)` — note: the same duration as the non-international `Physics MPhys, BSc`, despite the study-abroad year
5. `Typical A-level offer AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Alternative sciences / excluded subjects — **NOT PUBLISHED**
11. `Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** No admissions-test wording of any kind on this page (not even the mature-route test sentence was surfaced). Recorded as **not stated**, NOT as "no test".
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Access to Leeds is a contextual admissions scheme which accepts applications from individuals who might be from low income households, in the first generation of their immediate family to apply to higher education, or have had their studies disrupted.` Offer: `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative Entry Scheme for Mature Students`** — `If you are a mature applicant (over 21) and you don't have the required A Levels or GCSE English and maths qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).`
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes:
    - **`Extended Project Qualification (EPQ) and International Project Qualification (IPQ)`**: `We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them, and where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**
    - **`Access to HE Diploma`**: `Overall pass of the Access to HE, with 45 credits at level 3. Of these 45 credits, 30 level 3 credits must be in Physics and Mathematics and must be passed with Distinction.`
17. Deadline — **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:**
    - **`Study abroad year`** — `This programme gives you the opportunity to undertake a study abroad year as part of your course.`
    - **`Work placement`** — `This degree does not offer a work placement option. However, the Physics (Industrial) MPhys, BSc degree does have this option.` (placement **excluded** from this UCAS code)
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/g380/physics-international-mphys-bsc` · heading: `Physics (International) MPhys, BSc` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---
### Shared School of Physics and Astronomy boilerplate (VERIFIED INDIVIDUALLY on each page below)

Several strings recur across School of Physics and Astronomy pages. They are defined once here
to keep records readable. **Each record below states explicitly which of these it verified on
its own page** — nothing is carried across by inference, and where a page did not show one of
these the record says NOT PUBLISHED / NOT RETRIEVED for that course specifically.

- **[PRAC]** = `Where an A Level science subject is taken, we require a pass in the practical science element, alongside the achievement of the A Level at the stated grade.`
- **[GCSE-A]** = `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification. We will accept Level 2 Functional Skills English instead of GCSE English.`
- **[GCSE-B]** = `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.` (shorter form, no Functional Skills sentence)
- **[A2L-DESC]** = `Access to Leeds is a contextual admissions scheme which accepts applications from individuals who might be from low income households, in the first generation of their immediate family to apply to higher education, or have had their studies disrupted.`
- **[A2L-DESC+]** = [A2L-DESC] plus `If you live in a neighbourhood where there is low participation in higher education, we may be able to give priority to your application.`
- **[A2L-OFFER]** = `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` → **exact string `ABB`**
- **[EPQ]** = `We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them, and where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` → **exact string `AAB`, with `A in Physics and Mathematics`**
- **[AHE]** = `Overall pass of the Access to HE, with 45 credits at level 3. Of these 45 credits, 30 level 3 credits must be in Physics and Mathematics and must be passed with Distinction.`
- **[MATURE]** = `Alternative Entry Scheme for Mature Students` — `If you are a mature applicant (over 21) and you don't have the required A Levels or GCSE English and maths qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).` (some pages continue: `As part of this, you may be asked to take tests in English and maths and to write an essay.`)
- **[NO-T]** = `We do not accept T Levels as entry onto this course.`

**Important reading note on Field 13.** The `[MATURE]` route's `tests in English and maths`
sentence is **not** an admissions test for the standard A-level route. Where a page shows only
that sentence, Field 13 is recorded as **NOT STATED for standard entry**, never as "no test".

---

## 7. Physics with Artificial Intelligence BSc

*(Not in the research brief — this whole 6-code family is an addition to the expected list.)*

**Fields**
1. **Physics with Artificial Intelligence BSc**
2. F310
3. BSc
4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAA` — subject line `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. (Note: this page prints the offer as bare `AAA`, without the `(specific subject requirements)` parenthetical that most sibling pages carry.)
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `T-Levels: We do not accept T Levels as entry onto this course.`
11. **[PRAC]** — verified on this page
12. **[GCSE-A]** — verified on this page
13. **Admissions test — NOT STATED.** No admissions-test wording for the standard route. Recorded as not stated, NOT as "no test".
14. **Interview — NOT STATED.** No interview wording on the page.
15. Reduced-offer routes:
    - **`Access to Leeds`** — **[A2L-DESC+]** verified, then **[A2L-OFFER]** verified: `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **[MATURE]** verified, including `As part of this, you may be asked to take tests in English and maths and to write an essay.`
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes: **`Extended Project Qualification (EPQ), International Project Qualification (IPQ)`** — **[EPQ]** verified, **exact string `AAB`**. **`Access to HE Diploma`** — **[AHE]** verified.
17. `Check the deadline for applications on the UCAS website` — no date printed; deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:**
    - **`Study abroad`** — `On this course you have the opportunity to apply to spend time abroad, usually as an extra academic year. We have over 300 University partners worldwide and popular destinations for our students include Europe, the USA, Canada, Australia, New Zealand, Singapore, Hong Kong, South Africa and Latin America.`
    - **`Work placements`** — `On this course you have the option to apply to take a placement year module with organisations across the public, private and voluntary sectors in the UK, or overseas.`
    - Both applied for after admission; no separate UCAS code needed for the F310 route.
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/k050/physics-with-artificial-intelligence-bsc` · heading: `Physics with Artificial Intelligence BSc` · **entry year shown: 2027** (`Year of entry 2027`). **Anomaly:** start date printed as `October 2027`, not September, unlike every other Physics page checked.

---

## 8. Physics with Artificial Intelligence MPhys, BSc — **PAGE NOT RETRIEVED**

**Fields**
1. **Physics with Artificial Intelligence MPhys, BSc** — title from official Leeds course-search listing
2. F315 — from official Leeds course-search listing
3. MPhys, BSc
4.–19. **ALL NOT RETRIEVED**
20. **Provenance** — attempted sourceUrl: `https://courses.leeds.ac.uk/k051/physics-with-artificial-intelligence-mphys-bsc` — **HTTP 403**. Entry year: **NOT RETRIEVED**. Do not infer from F310.

---

## 13. Physics with Astrophysics BSc

**Fields**
1. **Physics with Astrophysics BSc**
2. F3F5
3. BSc
4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. **Accepted (verbatim):** `BTEC qualifications in relevant disciplines are considered in combination with A Level Physics and Mathematics`. **Explicitly NOT accepted:** `T-Levels: We do not accept T Levels as entry onto this course.`
11. **[PRAC]** — verified on this page
12. **[GCSE-A]** — verified on this page (printed without the leading `GCSE:` label: `English Language grade 4 (C) or higher, or an equivalent English language qualification. We will accept Level 2 Functional Skills English instead of GCSE English.`)
13. **Admissions test — NOT STATED.** Recorded as not stated, NOT as "no test".
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — **[A2L-DESC+]** verified. Offer verified: `ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **[MATURE]** verified
    - Care-experienced offer: **NOT PUBLISHED**
16. **`EPQ/IPQ`** — **[EPQ]** verified, **exact string `AAB`**. **`Access to HE Diploma`** — **[AHE]** verified.
17. `Apply to this course and check the deadline for applications through the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options — this page is the clearest statement of how Leeds' variant system works:**
    - **`Study abroad`** — `This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months. Once you've successfully completed your year abroad, you'll be awarded the 'international' variant in your degree title which demonstrates your added experience to future employers.`
    - **`Work placements`** — `A placement year is a great way to help you decide on a career path when you graduate. You'll develop your skills and gain a real insight into working life in a particular company or sector. If you decide to undertake a placement year, this will extend your period of study by 12 months and, on successful completion, you'll be awarded the 'industrial' variant in your degree title to demonstrate your added experience to future employers.`
    - **Consequence:** the `(Industrial)` / `(International)` award titles can be reached **either** by applying to the separate UCAS code **or** by taking the option inside F3F5. Both paths exist.
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/3600/physics-with-astrophysics-bsc` · heading: `Physics with Astrophysics BSc` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---

## 14. Physics with Astrophysics MPhys, BSc

**Fields**
1. **Physics with Astrophysics MPhys, BSc**
2. F3FM
3. MPhys, BSc — page describes it as `MPhys, BSc (integrated Masters)`
4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. **[PRAC]** — verified on this page
12. **[GCSE-A]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — **[A2L-DESC+]** verified. **`Typical Access to Leeds A Level offer:`** `ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **[MATURE]** verified
    - Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification (EPQ) and International Project Qualification (IPQ)`** — **[EPQ]** verified, **exact string `AAB`**. **`Access to HE Diploma`** — **[AHE]** verified.
17. `Apply to this course and check the deadline for applications through the UCAS website. We may consider applications submitted after the deadline.` — no date printed; deadline **NOT PUBLISHED** (but note the explicit late-application sentence)
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:** **`Study abroad`** — `...This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months.` · **`Work placements`** — placement-year option, page lists benefits including `100+ organisations to choose from, both in the UK and overseas`. Chosen after admission.
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/f334/physics-with-astrophysics-mphys-bsc` · heading: `Physics with Astrophysics MPhys, BSc` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---

## 19. Theoretical Physics BSc

**Fields**
1. **Theoretical Physics BSc**
2. F3K0
3. BSc
4. `3 Years (Full time)`
5. `Typical A-level offer: AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule published. **Note:** despite being the *Theoretical* Physics route, the page publishes no additional or higher maths requirement and **no Further Mathematics requirement**.
8. Further Mathematics — **NOT PUBLISHED** (notable for a theoretical-physics degree)
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `T Levels: We do not accept T Levels as entry onto this course.`
11. **[PRAC]** — verified on this page
12. **[GCSE-B]** — verified on this page (shorter form; no Functional Skills sentence surfaced)
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — **[A2L-DESC]** verified. **[A2L-OFFER]** verified: `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **[MATURE]** verified
    - Care-experienced offer: **NOT PUBLISHED**
16. **`EPQ/IPQ`** — verified: `Where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**. **`Access to HE Diploma`** — **[AHE]** verified.
17. Deadline — **NOT PUBLISHED**; page states `We may consider applications submitted after the deadline.`
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work placements`** — `This programme gives you the opportunity to undertake an industrial placement year as part of the course.`
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/3686/theoretical-physics-bsc` · heading: `Theoretical Physics BSc` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---
### ⚠️⚠️ SECOND CRITICAL FINDING — Leeds serves STALE course pages at canonical URLs

Beyond the 2026/2027 split, several in-scope course pages serve content from **much earlier
entry years** — 2025 and even **2021** — at their current canonical URLs, with no warning
banner and no year selector. The requirement strings on these stale pages are **materially
different** from the 2027 pages, so a scraper that treated them as current would publish
years-old requirements.

Confirmed stale pages found so far:

| Course | URL | Entry year actually shown | Corroborating evidence quoted from the page |
|---|---|---|---|
| Theoretical Physics MPhys, BSc | `/f400/` | **2021** | `(Full time) 2021 start` · `For UK full-time students starting in 2021, the fee for 2021/22 will be £9,250.` · `EU students starting their course in the 2021/22 academic year or later will now be classed as international students` |
| Physics with Astrophysics (Industrial) BSc | `/3632/` | **2025** | `Year of entry 2025` · `Start Date: September 2025` |
| Physics with Astrophysics (Industrial) MPhys, BSc | `/i587/` | **2025** | `Year of entry: 2025` · `Start date: September 2025` |
| Physics with Astrophysics (International) MPhys, BSc | `/g381/` | **2026** | `Start Date: September 2026` |

**The older pages use different wording, not just a different year.** Differences observed:

| Element | 2027-entry pages | 2021/2025-entry pages |
|---|---|---|
| Subject exclusions | no exclusion sentence | `Excludes A Level General Studies and Critical Thinking.` / `Excludes A Level General Studies or Critical Thinking.` |
| GCSE | `English Language grade 4 (C) or higher, or an equivalent English language qualification` (+ Functional Skills sentence) | `C in English Language, or an equivalent English qualification.` / `English Language at grade C (4) or above, or an appropriate English language qualification.` |
| Access to Leeds offer | `ABB including physics and mathematics and a pass in the Access to Leeds scheme.` | `ABB including Physics and Mathematics.` — **no "pass in the Access to Leeds scheme" clause** |
| EPQ | `AAB at A-level including A in Physics and Mathematics` | `AAB at A-Level` — **no subject clause** |
| Mature-student scheme | present | absent |

These are recorded per course below as the year the page showed. **None has been relabelled 2027.**

---

## 20. Theoretical Physics MPhys, BSc — ⚠️ STALE PAGE (2021 entry)

> **This page serves 2021-entry content.** The 2027-entry offer is **NOT PUBLISHED** at this URL.
> Figures below are **2021-entry** and must not be used as current.

**Fields**
1. **Theoretical Physics MPhys, BSc**
2. F340 — **from the official course-search listing; the course page itself does not print a UCAS code field (ABSENT)**
3. MPhys, BSc
4. `4 years (integrated Masters)` — page prints `(Full time) 2021 start`; no `Duration` field (ABSENT)
5. **2021 entry:** `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. A separate `Typical A-level offer` headline field was not present. **2027 entry: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule.
8. Further Mathematics — **NOT PUBLISHED** (not mentioned even on this theoretical-physics page)
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `Excludes A Level General Studies or Critical Thinking.` (this exclusion does **not** appear on the 2027 pages)
11. **[PRAC]** — verified on this page
12. `GCSE: C in English Language, or an equivalent English qualification.` — **older wording**, differs from the 2027 form
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — offer verified: `Typical Access to Leeds A Level offer: ABB including Physics and Mathematics. Excluding General Studies and Critical Thinking.` **Exact string: `ABB`** — note this lacks the `and a pass in the Access to Leeds scheme` clause present on 2027 pages
    - Mature-student scheme: **NOT PUBLISHED on this page** (present on 2027 siblings)
    - Care-experienced offer: **NOT PUBLISHED**
16. EPQ/IPQ route: **NOT PUBLISHED on this page** (present on 2027 siblings). **`Access to HE Diploma`** — **[AHE]** verified.
17. `Check the deadline for applications on the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. Study options — page has a `Study abroad and work placements` section; its text was **NOT RETRIEVED** in usable verbatim form
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/f400/theoretical-physics-mphys-bsc` · heading: `Theoretical Physics MPhys, BSc` · **entry year shown: 2021** — corroborated by `(Full time) 2021 start`, `For UK full-time students starting in 2021, the fee for 2021/22 will be £9,250.`, and `EU students starting their course in the 2021/22 academic year or later will now be classed as international students`. Verified twice with independent prompts.

---

## 15. Physics with Astrophysics (Industrial) BSc — ⚠️ STALE PAGE (2025 entry)

> **2025-entry content.** 2027 offer **NOT PUBLISHED** at this URL.

**Fields**
1. **Physics with Astrophysics (Industrial) BSc**
2. F3F7
3. BSc
4. `4 years full time`
5. **2025 entry:** `Typical A-level offer` / `AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. **2027: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `Excludes A Level General Studies and Critical Thinking.`
11. **[PRAC]** — verified on this page
12. `GCSE: English Language at grade C (4) or above, or an appropriate English language qualification.` — older wording
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Physics and Mathematics.` **Exact string: `ABB`** (no Access-to-Leeds-scheme-pass clause)
    - Mature-student scheme: **NOT PUBLISHED on this page**
    - Care-experienced offer: **NOT PUBLISHED**
16. **`EPQ/IPQ`** — `Where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-Level.` **Exact string: `AAB`** — note: **no subject clause**, unlike the 2027 pages. **`Access to HE Diploma`** — `Overall pass of the Access to HE, with 45 credits at level 3...must be passed with Distinction.` (middle of sentence elided in extraction — treat full text as **NOT RETRIEVED**)
17. Deadline — **NOT PUBLISHED** (no deadline sentence found)
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `This degree does not offer the option to study abroad.` (excluded) · **`Work placements`** — `This programme gives you the opportunity to undertake a paid industrial placement year as part of the course.`
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/3632/physics-with-astrophysics-industrial-bsc` · heading: `Physics with Astrophysics (Industrial) BSc` · **entry year shown: 2025** (`Year of entry 2025`, `Start Date: September 2025`)

---

## 16. Physics with Astrophysics (Industrial) MPhys, BSc — ⚠️ STALE PAGE (2025 entry)

> **2025-entry content.** 2027 offer **NOT PUBLISHED** at this URL.

**Fields**
1. **Physics with Astrophysics (Industrial) MPhys, BSc**
2. F3F2
3. MPhys, BSc
4. `5 years full time`
5. **2025 entry:** `Typical A-level offer` / `AAA (specific subject requirements)` — `A-level: AAA including Physics and Mathematics.` **Exact string: `AAA`**. **2027: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no A* rule.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `Excludes A Level General Studies and Critical Thinking.`
11. **[PRAC]** — verified on this page
12. `GCSE: English Language at grade C (4) or above, or an appropriate English language qualification.` — older wording
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including physics and mathematics.` **Exact string: `ABB`** (no scheme-pass clause)
    - Mature-student scheme: **NOT PUBLISHED on this page**
    - Care-experienced offer: **NOT PUBLISHED**
16. **`EPQ/IPQ`** — `Where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-Level.` **Exact string: `AAB`**, no subject clause. **`Access to HE Diploma`** — **[AHE]** verified in full on this page.
17. `Apply to this course and check the deadline for applications through the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `This degree does not offer the option to study abroad.` · **`Work placements`** — `This programme gives you the opportunity to undertake a paid industrial placement year as part of the course.`
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/i587/physics-with-astrophysics-industrial-mphys-bsc` · heading: `Physics with Astrophysics (Industrial) MPhys, BSc` · **entry year shown: 2025** (`Year of entry: 2025`, `Start date: September 2025`)

---

## 18. Physics with Astrophysics (International) MPhys, BSc

> **⚠️ This page showed 2026 entry, not 2027.** Figures are **2026-entry**; 2027 **NOT PUBLISHED**.

**Fields**
1. **Physics with Astrophysics (International) MPhys, BSc**
2. F3F1
3. MPhys, BSc
4. `4 Years (Full time)`
5. **2026 entry:** `Typical A-level offer` / `AAA (specific subject requirements)` **Exact string: `AAA`**. The separate subject line was not surfaced verbatim — required subjects given as Physics and Mathematics. **2027: NOT PUBLISHED.**
6. Physics and Mathematics
7. Both required together. No "one of X/Y/Z"; no A* rule published.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Alternative sciences: **NOT PUBLISHED**. Explicitly excluded subjects: **NOT PUBLISHED** (no `Excludes...` sentence on this page, unlike the 2025 Industrial siblings)
11. **[PRAC]** — verified on this page
12. `English Language grade 4 (C) or higher, or an equivalent English language qualification.` (the modern form, without the Functional Skills sentence)
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`** (modern form, with scheme-pass clause)
    - **`Alternative Entry Scheme for Mature Students`** — heading present; body text **NOT RETRIEVED**
    - Care-experienced offer: **NOT PUBLISHED**
16. **`EPQ/IPQ`** — `Where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**. **`Access to HE Diploma`** — **[AHE]** verified.
17. `Apply to this course and check the deadline for applications through the UCAS website.` — deadline **NOT PUBLISHED**
18. Longer contiguous block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:** **`Study abroad`** — `This programme gives you the opportunity to undertake a study abroad year as part of your course.` · **`Work placement`** — `This degree does not offer a work placement option.` (excluded)
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/g381/physics-with-astrophysics-international-mphys-bsc` · heading: `Physics with Astrophysics (International) MPhys, BSc` · **entry year shown: 2026** (`Start Date: September 2026`)

---

## 17. Physics with Astrophysics (International) BSc — **PAGE NOT RETRIEVED**

**Fields**
1. **Physics with Astrophysics (International) BSc** — from official course-search listing
2. F3F8 — from official course-search listing
3. BSc
4.–19. **ALL NOT RETRIEVED**
20. **Provenance** — attempted `https://courses.leeds.ac.uk/g977/physics-with-astrophysics-international-bsc` plain and with `?v=2` — **HTTP 403 both times**. Entry year: **NOT RETRIEVED**. Do not infer from F3F1 or F3F5.

---

## 21. Theoretical Physics (Industrial) BSc — **PAGE NOT RETRIEVED**

**Fields**
1. **Theoretical Physics (Industrial) BSc** — from official course-search listing
2. F3K2 — from official course-search listing
3. BSc
4.–19. **ALL NOT RETRIEVED**
20. **Provenance** — attempted `https://courses.leeds.ac.uk/g959/theoretical-physics-industrial-bsc` plain and with `?v=2` — **HTTP 403 both times**. Entry year: **NOT RETRIEVED**.

---
# ═══════════════════════════════════════════
# ENGINEERING — Faculty of Engineering and Physical Sciences
# ═══════════════════════════════════════════

### Shared Engineering boilerplate (VERIFIED INDIVIDUALLY on each page below)

- **[E-PRAC]** = `Where an A-level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-level at the stated grade.` (note: Engineering pages hyphenate `A-level`; the Physics pages print `A Level`)
- **[E-GCSE]** = `English Language grade 4 (C) or higher, or an equivalent English language qualification.`
- **[E-MATURE]** = `Alternative Entry Scheme for Mature Applicants` — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).` (note: `Mature Applicants`, and no "over 21" age figure — both differ from the Physics pages' `Alternative Entry Scheme for Mature Students` / `(over 21)`)
- **[E-AHE-MECH]** = `Pass 60 credits overall with 45 credits at Level 3, with Distinction, to include Mathematics, Calculus, Further Calculus and Physics or Chemistry.`
- **[E-EPQ-MECH]** = `Extended Project Qualification, International Project Qualification: We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them, and where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and either Physics or Chemistry, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.` → **exact string `AAA`, plus grade A in EPQ**
- **[E-DEADLINE]** = `Apply to this course and check the deadline for applications through the UCAS website.`

**Note the different EPQ mechanics between faculties.** Physics: standard `AAA` is reduced to
`AAB` on an A in the EPQ. Mechanical/Aerospace Engineering: standard `A*AA` is reduced to
`AAA` **and** the EPQ grade A is itself required as an additional condition. These are not
interchangeable and must not be normalised into one rule.

---

## E41. Mechanical Engineering BEng

**Fields**
1. **Mechanical Engineering BEng**
2. H305
3. BEng
4. `3 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A-level: A*AA including Mathematics and either Physics or Chemistry.` **Exact string: `A*AA`**
6. Mathematics (required outright) **and one of** Physics **or** Chemistry. No separate lower subject minimum published; the `A*` is not pinned to a named subject on this page.
7. **Cross-subject rule (verbatim):** `including Mathematics and either Physics or Chemistry` — a genuine "one of X/Y" rule. The offer contains an `A*` but the page does **not** say which subject it must be in — recorded as **NOT PUBLISHED** rather than assumed to be Maths.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **accepted as one of the pair** (not individually compulsory). Chemistry: **accepted as one of the pair** (not individually compulsory) — Chemistry is a full substitute for Physics here.
10. Accepted alternative science subjects: **NOT PUBLISHED** beyond the Physics-or-Chemistry pair. Explicitly excluded subjects: **NOT PUBLISHED**
11. **[E-PRAC]** — verified on this page
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** No admissions-test wording on this page. Recorded as not stated, NOT as "no test". (Contrast Civil Engineering BEng, which *does* publish a diagnostic Maths test — so silence here is genuinely just silence.)
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds Scheme.` **Exact string: `AAB`**
    - **[E-MATURE]** verified
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes: **[E-EPQ-MECH]** verified — **exact string `AAA` plus grade A in EPQ/IPQ/Welsh Bacc ASCC**. **`Access to HE`** — **[E-AHE-MECH]** verified.
17. **[E-DEADLINE]** — no date printed; deadline **NOT PUBLISHED**
18. Single printed line: `A-level: A*AA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. **Study options:** `Study abroad` — optional, `extends studies by 12 months`. `Work placements` — optional, `extends studies by 12 months`. Verbatim descriptive text **NOT RETRIEVED** for this page. Chosen after admission; the extended routes also exist as separate UCAS codes (H307 / H302).
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/5200/mechanical-engineering-beng` · heading: `Mechanical Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E42. Mechanical Engineering MEng, BEng

**Fields**
1. **Mechanical Engineering MEng, BEng**
2. H300
3. MEng, BEng — page describes `MEng, BEng (Integrated Masters)`
4. `4 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A*AA including Mathematics and either Physics or Chemistry.` **Exact string: `A*AA`** — **identical to the BEng**, i.e. Leeds does **not** ask a higher grade for the integrated masters in Mechanical Engineering
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. Which subject carries the `A*` — **NOT PUBLISHED**
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Alternative sciences / exclusions — **NOT PUBLISHED**
11. **[E-PRAC]** — verified on this page
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds Scheme.` **Exact string: `AAB`**
    - **[E-MATURE]** verified
    - Care-experienced offer: **NOT PUBLISHED**
16. **[E-EPQ-MECH]** verified — **exact string `AAA` plus grade A in EPQ**. **`Access to HE`** — **[E-AHE-MECH]** verified.
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A*AA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work placement`** — `Make connections, practice skills and build future confidence in your future with an industrial placement year as part of your course.`
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/f411/mechanical-engineering-meng-beng` · heading: `Mechanical Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry: 2027`, `Start Date: September 2027`)

---

## E2. Aeronautical and Aerospace Engineering MEng, BEng

**Fields**
1. **Aeronautical and Aerospace Engineering MEng, BEng**
2. H410
3. MEng, BEng
4. `4 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A-level: A*AA including Mathematics and either Physics or Chemistry.` **Exact string: `A*AA`**
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. Which subject carries the `A*` — **NOT PUBLISHED**
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted (verbatim):** `We cannot consider BTEC qualifications without A Level Mathematics and do not accept BTEC Maths units in lieu of this A Level requirement`
11. **[E-PRAC]** — verified on this page
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds scheme.` **Exact string: `AAB`**
    - **[E-MATURE]** verified
    - Care-experienced offer: **NOT PUBLISHED**
16. **[E-EPQ-MECH]** verified — **exact string `AAA` plus grade A in EPQ**. **`Access to HE`** — **[E-AHE-MECH]** verified.
17. Deadline — **NOT PUBLISHED**, but the page prints: `We may consider applications submitted after the deadline. Availability of courses in UCAS Extra will be detailed on UCAS at the appropriate stage in the cycle.`
18. Single printed line: `A-level: A*AA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work placements`** — `Make connections, practice skills and build future confidence in your future with an industrial placement year as part of your course.`
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/f414/aeronautical-and-aerospace-engineering-meng-beng` · heading: `Aeronautical and Aerospace Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---

## E25. Civil Engineering BEng — ⭐ HAS AN ADMISSIONS TEST AND AN INTERVIEW

> **This course breaks the Leeds pattern in three ways: a lower offer, a lettered subject
> minimum instead of a subject-pair rule, and a genuine published admissions test + interview
> on the BTEC route.** Recorded independently; do not generalise to other Civil families.

**Fields**
1. **Civil Engineering BEng**
2. H203
3. BEng
4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `AAB with an A in Mathematics.` **Exact string: `AAB`** — **two grades below the `A*AA` asked by Mechanical/Aerospace**
6. **Mathematics with a subject-specific minimum grade: `an A in Mathematics`.** No other subject named.
7. **Cross-subject rule:** `AAB with an A in Mathematics` — a subject-pinned grade rather than a "one of X/Y/Z" list. **No Physics or Chemistry requirement at all.** No `A*` required.
8. Further Mathematics — **NOT PUBLISHED** in the A-level requirement. (It does appear inside the BTEC route text; see Field 16.)
9. Mathematics: **required at grade A**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T-Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.` (note: this page capitalises `A-Level`)
12. **[E-GCSE]** — verified on this page
13. **⭐ ADMISSIONS TEST — EXPLICITLY PUBLISHED (conditional).** Verbatim: `Applicants for whom this requirement is to be fulfilled via qualifications other than A-levels (eg BTEC Maths and Additional/Further Maths modules) may be required to take a diagnostic Maths test in addition to their other level 3 maths studies.` **Name: a `diagnostic Maths test`. No external provider, no modules.** Applies to non-A-level applicants, i.e. it is **not** required for the standard A-level route — for that route the test status is **not stated**.
14. **⭐ INTERVIEW — EXPLICITLY PUBLISHED (conditional).** Verbatim, inside the BTEC requirement: `D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test.` So the BTEC `D*D*D` route requires **both** an interview and the diagnostic Maths test. For the standard A-level route, interview status is **not stated**.
15. Reduced-offer routes — **note Leeds files these under a different heading on this page:**
    - Heading printed as **`Alternative entry`** (not `Access to Leeds`). Offer: `Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `BBB`** — the lowest contextual offer found anywhere in this research
    - **`Alternative Entry Scheme for Mature Applicants`** — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme.`
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes:
    - **EPQ/IPQ/ASCC:** `Where an applicant offers an A in the EPQ/IPQ/ASCC we may make an offer of ABB at A-level including A in Mathematics.` **Exact string: `ABB` including A in Mathematics** — a *different* mechanism again from both the Physics family and Mechanical Engineering
    - **`Access to HE`:** `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number of Mathematics modules) and the remaining 15 credits with Merit or above.`
    - **BTEC:** `D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test.` — **this is the only place Further Maths is named for this course**
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `AAB with an A in Mathematics.` — longer block **NOT RETRIEVED (contiguity not verifiable)**
19. Study options — **NOT RETRIEVED** for this page (study abroad / placement sections not surfaced in the extraction)
20. **Provenance** — sourceUrl: `https://courses.leeds.ac.uk/i444/civil-engineering-beng` · heading: `Civil Engineering BEng` · **entry year shown: 2027** (`Year of entry: 2027`, `Start Date: September 2027`)

---
## E13. Chemical Engineering BEng

**Fields**
1. **Chemical Engineering BEng** · 2. H805 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Mathematics and either Physics or Chemistry.` **Exact string: `AAA`**
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry` — "one of X/Y" rule. No `A*` required. No "at least one at A*" rule.
8. Further Mathematics — **NOT PUBLISHED** in the A-level requirement (it appears only inside the Access to HE text as `Further Calculus`)
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair** — note Chemical Engineering does **not** compel Chemistry
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including an A in Mathematics and B in either Physics or Chemistry and a pass in the Access to Leeds scheme` **Exact string: `ABB`, with subject-pinned grades `A in Mathematics` and `B in either Physics or Chemistry`**
    - **`Alternative Entry Scheme for Mature Students`** — available, eligibility criteria apply (full text **NOT RETRIEVED**). Note this page uses `Mature Students`, matching the Physics pages rather than the `Mature Applicants` form used on Mechanical/Aerospace/EEE.
    - Care-experienced offer: **NOT PUBLISHED**
16. Alternative offer routes:
    - **`Extended Project Qualification, International Project Qualification`** — `Grade A plus AAB at A-level including A in Mathematics and A in either Physics or Chemistry.` **Exact string: `AAB` plus Grade A EPQ, with `A in Mathematics` and `A in either Physics or Chemistry`**
    - **`Access to HE`** — `Pass 60 credits overall with 30 credits at Distinction (to include an appropriate amount of Mathematics, Calculus and Further Calculus and specific subjects e.g. Physics or Chemistry) and the remaining credits at Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** `Study abroad` — optional, extends study by 12 months. `Work placements` — optional industrial placement year, extends study by 12 months. Verbatim text **NOT RETRIEVED**.
20. **Provenance** — `https://courses.leeds.ac.uk/4810/chemical-engineering-beng` · heading `Chemical Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E14. Chemical Engineering MEng, BEng

**Fields**
1. **Chemical Engineering MEng, BEng** · 2. H800 · 3. MEng, BEng · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `AAA including Mathematics and either Physics or Chemistry.` **Exact string: `AAA`** — identical to the BEng; no uplift for the integrated masters
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. No `A*`; no "at least one at A*" rule.
8. Further Mathematics — **NOT PUBLISHED** (only `Further Calculus` inside Access to HE)
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. Explicitly excluded: **NOT PUBLISHED** on this page (the T-Level exclusion was not surfaced here — recorded as **NOT RETRIEVED**, not as absent)
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `ABB including an A in Mathematics and B in either Physics or Chemistry and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative Entry Scheme for Mature Students`** — available for those without required A Levels or GCSE qualifications
    - Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus AAB at A-level including A in Mathematics and A in either Physics or Chemistry.` **Exact string: `AAB` plus Grade A EPQ**. **`Access to HE`** — `Pass 60 credits overall with 30 credits at Distinction (to include an appropriate amount of Mathematics, Calculus and Further Calculus and specific subjects e.g. Physics or Chemistry) and the remaining credits at Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `AAA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work placements`** — `Make connections, practice skills and build confidence in your future with an industrial placement year as part of your course.`
20. **Provenance** — `https://courses.leeds.ac.uk/f463/chemical-engineering-meng-beng` · heading `Chemical Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E29. Electronic and Electrical Engineering BEng

**Fields**
1. **Electronic and Electrical Engineering BEng** · 2. H605 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `A-level: AAB including Mathematics.` **Exact string: `AAB`**
6. **Mathematics only.** No second subject named, and no subject-specific minimum grade attached to Maths.
7. **Cross-subject rule: none beyond `including Mathematics`.** No "one of X/Y/Z" list, no Physics requirement, no `A*` rule. This is the least subject-constrained engineering offer found.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Access to Leeds offer: BBB including Mathematics plus a pass in the Access to Leeds scheme.` **Exact string: `BBB`**
    - **[E-MATURE]** verified in full on this page
    - Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus ABB at A-level including Mathematics.` **Exact string: `ABB` plus Grade A EPQ**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAB including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work Placements`** — `Make connections, practice skills and build confidence in your future with an industrial placement year as part of your course.`
20. **Provenance** — `https://courses.leeds.ac.uk/5000/electronic-and-electrical-engineering-beng` · heading `Electronic and Electrical Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---
## E5. Architectural Engineering BEng

**Fields**
1. **Architectural Engineering BEng** · 2. HK26 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `A-level: AAB with an A in Mathematics.` **Exact string: `AAB`**
6. **Mathematics with subject-specific minimum grade `A`.** No other subject required.
7. `AAB with an A in Mathematics` — subject-pinned grade, no "one of X/Y/Z" list, no `A*`.
8. Further Mathematics — **NOT PUBLISHED** in the A-level requirement; named only in the BTEC text (`Distinctions in all Mathematics units including Maths and Further Maths`)
9. Mathematics: **required at grade A**. Physics: **NOT REQUIRED**. Chemistry: **NOT REQUIRED**
10. Accepted alternatives (qualification types, verbatim): `BTEC... Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units)`; also `Cambridge Pre-U, International Baccalaureate, Irish Leaving Certificate, Scottish Highers/Advanced Highers, Welsh Baccalaureate accepted`. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page.** Notable: the endorsement sentence that appears on nearly every other in-scope page is absent here. Recorded as not published, not as waived.
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** (Contrast Civil Engineering BEng, which does publish one.)
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `BBB`**
    - **`Alternative Entry Scheme`** (mature) — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).`
    - Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `Where an applicant offers an A in the EPQ/IPQ/ASCC we may make an offer of ABB at A-level including A in Mathematics.` **Exact string: `ABB` including A in Mathematics**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number of Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAB with an A in Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** **`One-year optional work placement`** — `During your course, you'll be given the opportunity to advance your skill set and experience further. You can apply to undertake a one-year industrial work placement which will extend your degree by 12 months.` Study-abroad option: **NOT PUBLISHED on this page.**
20. **Provenance** — `https://courses.leeds.ac.uk/a248/architectural-engineering-beng` · heading `Architectural Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`)

---

## E9. Automotive Engineering BEng

**Fields**
1. **Automotive Engineering BEng** · 2. H335 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A-level: A*AA including Mathematics and either Physics or Chemistry.` **Exact string: `A*AA`**
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. Which subject carries the `A*` — **NOT PUBLISHED**.
8. Further Mathematics — **NOT PUBLISHED** (only `Further Calculus` in Access to HE)
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. **[E-PRAC]** — verified on this page
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus, a pass in the Access to Leeds Scheme.` **Exact string: `AAB`** (transcribed with Leeds' own comma after `plus,`)
    - **[E-MATURE]** verified in full
    - Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `Where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and either Physics or Chemistry, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.` **Exact string: `AAA` plus grade A in EPQ**. **`Access to HE`** — **[E-AHE-MECH]** verified.
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: A*AA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work placements`** — `Make connections, practice skills and build future confidence in your future with an industrial placement year as part of your course.`
20. **Provenance** — `https://courses.leeds.ac.uk/4794/automotive-engineering-beng` · heading `Automotive Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E49. Medical Engineering BEng — ⭐ ONLY IN-SCOPE COURSE THAT ACCEPTS BIOLOGY

**Fields**
1. **Medical Engineering BEng** · 2. HHH1 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A*AA including Mathematics and one of the sciences, Physics, Chemistry or Biology.` **Exact string: `A*AA`**
6. Mathematics **and one of** Physics, Chemistry **or** Biology
7. **Cross-subject rule (verbatim):** `including Mathematics and one of the sciences, Physics, Chemistry or Biology` — a genuine **three-way** "one of X/Y/Z" rule, wider than every other engineering course checked. Which subject carries the `A*` — **NOT PUBLISHED**.
8. Further Mathematics — **NOT PUBLISHED** (only `Further Calculus` in Access to HE)
9. Mathematics: **required**. Physics: **one of the three**. Chemistry: **one of the three**. **Biology: accepted as one of the three** — the only in-scope course where Biology alone satisfies the science requirement.
10. Accepted alternative sciences: the three named above; nothing further published. Explicitly excluded subjects: **NOT PUBLISHED** on this page
11. **[E-PRAC]** — verified on this page
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `AAB including Mathematics and one of the sciences, Physics, Chemistry or Biology, plus, a pass in the Access to Leeds Scheme.` **Exact string: `AAB`**
    - **`Alternative Entry Scheme` (Mature Applicants)** — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme.`
    - Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `Where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and one of Physics, Chemistry or Biology, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.` **Exact string: `AAA` plus grade A in EPQ**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, with Distinction, to include Mathematics, Calculus, Further Calculus and Physics, Chemistry or Biology.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A*AA including Mathematics and one of the sciences, Physics, Chemistry or Biology.` — longer block **NOT RETRIEVED**
19. **Study options:** Study abroad and work placements both `Available as optional one-year additions to extend studies by 12 months each.` Verbatim section text **NOT RETRIEVED**.
20. **Provenance** — `https://courses.leeds.ac.uk/a239/medical-engineering-beng` · heading `Medical Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E53. Product Design BSc — ⭐ NO REQUIRED A-LEVEL SUBJECT; GCSE-HEAVY; PORTFOLIO EXPLICITLY NOT REQUIRED

> **⚠️ Conflicting year signals on this page:** the year label read `2026 course information`
> while the Start date field read `September 2027`. Recorded as **AMBIGUOUS** — see Field 20.

**Fields**
1. **Product Design BSc** · 2. H795 · 3. **BSc** (not BEng — the only in-scope engineering-faculty course awarding a BSc) · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` **Exact string: `AAB`**
6. **No required A-level subject.** Verbatim: `An Art and Design related A-level such as Design, Design Technology or Art and Design is desirable but not essential. An interest in art and design is essential.`
7. **Cross-subject rule: none at A-level.** The subject constraint sits at **GCSE** instead (Field 12). No `A*`; no "one of X/Y/Z" at A-level.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **not required at A-level; required at GCSE grade 6 (B)**. Physics: **NOT PUBLISHED**. Chemistry: **NOT PUBLISHED**. Art/Design: **desirable but not essential**
10. Accepted alternatives (verbatim): `Design Technology, Art and Design`. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page**
12. **GCSE (unusually demanding, verbatim):** `A minimum of English Language grade 4 (C), Mathematics grade 6 (B) and Combined Science 6-6 (B-B) or equivalent.` — the only in-scope course requiring a GCSE **Science** grade and a GCSE Maths grade above 4.
13. **Admissions test — NOT STATED.**
14. **⭐ INTERVIEW / PORTFOLIO — EXPLICITLY ADDRESSED, AND EXPLICITLY NOT PART OF THE DECISION.** Verbatim: `Whilst a portfolio is not required as part of the decision/offer making process, successful offer holders will be invited to attend an optional in-person offer holder event, which will include an interactive portfolio review session with department academics.` This is the only in-scope page that explicitly rules a portfolio **out** of the admissions decision. It is **not** an interview requirement.
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds offer: BBB plus a pass in the Access to Leeds scheme, and minimum grades of 5 and 6 (B) in Mathematics and Science (in any order) at GCSE.` **Exact string: `BBB`**, with its own distinct GCSE condition
    - **[E-MATURE]** verified in full
    - Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ** — `we may make an offer of ABB at A-level, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.` **Exact string: `ABB` plus grade A EPQ** — and note **no subject clause**, consistent with there being no required A-level subject. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction and the remaining 15 credits with Merit or above, preferably including an Art and Design-related subject.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `An Art and Design related A-level such as Design, Design Technology or Art and Design is desirable but not essential. An interest in art and design is essential.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `...This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months.` · **`Work placements`** — `Make connections, practice skills and build confidence in your future with an industrial placement year as part of your course.` … `Choose from 100+ organisations in the UK and overseas.` … `All placements sourced by the University are paid positions.`
20. **Provenance** — `https://courses.leeds.ac.uk/a602/product-design-bsc` · heading `Product Design BSc` · **entry year shown: AMBIGUOUS** — the page carried the label `2026 course information` alongside `Start Date: September 2027`. Because the brief forbids recording a 2026 panel as 2027, these figures should be treated as **year-uncertain** and re-checked before publication.

---

## E30. Electronic and Electrical Engineering MEng, BEng — **PAGE NOT RETRIEVED**

**Fields**
1. **Electronic and Electrical Engineering MEng, BEng** — from official course-search listing
2. H600 — from official course-search listing · 3. MEng, BEng
4.–19. **ALL NOT RETRIEVED**
20. **Provenance** — attempted `https://courses.leeds.ac.uk/f456/electronic-and-electrical-engineering-meng-beng` — **HTTP 403**. Do not infer from H605; Leeds' BEng/MEng offers are sometimes identical and sometimes not.

---
## E45. Mechatronics and Robotics Engineering BEng

**Fields**
1. **Mechatronics and Robotics Engineering BEng** (note: printed title includes `Engineering`; the brief's "Mechatronics and Robotics" is not the printed title) · 2. HH41 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `AAB including Mathematics.` **Exact string: `AAB`**
6. **Mathematics only**, at the offer grade; no subject-specific minimum published
7. `including Mathematics`. No "one of X/Y/Z"; no Physics requirement; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page**
12. `English Language grade 4 (C) or higher, or an equivalent English language qualification. We will accept Level 2 Functional Skills English instead of GCSE English.` — includes the Functional Skills sentence, unlike most engineering pages
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — description begins `Access to Leeds is a contextual admissions scheme...`; offer `Typical Access to Leeds A Level offer: BBB including Mathematics plus a pass in the Access to Leeds scheme.` **Exact string: `BBB`**
    - **[E-MATURE]** verified in full
    - Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus ABB at A-level including Mathematics.` **Exact string: `ABB` plus Grade A EPQ**. **`Access to HE Diploma`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `AAB including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** headings `Study abroad` and `Work placements`; both optional one-year extensions. Verbatim body text **NOT RETRIEVED**.
20. **Provenance** — `https://courses.leeds.ac.uk/j914/mechatronics-and-robotics-engineering-beng` · heading `Mechatronics and Robotics Engineering BEng` · **entry year shown: 2027** (`Year of entry: 2027`, `Start Date: September 2027`)

---

## E37. Materials Science and Engineering BEng — ⭐ UNIQUE `ABC` CONTEXTUAL OFFER

**Fields**
1. **Materials Science and Engineering BEng** · 2. J510 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `A-level: AAB including Mathematics and either Physics or Chemistry.` **Exact string: `AAB`**
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. No `A*`; no "at least one at A*".
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. Explicitly excluded: **NOT PUBLISHED** on this page
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABC including an A in Mathematics and a B in Physics or Chemistry and a pass in the Access to Leeds scheme.` **Exact string: `ABC`** — **the only `ABC` contextual offer found in this research; do not normalise to `ABB`**
    - **`Alternative Entry Scheme for mature applicants`** — mature applicants may complete the scheme if lacking A-Levels or GCSE English/Maths (full verbatim text **NOT RETRIEVED**)
    - Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus ABB at A-level including A in Mathematics and B in either Physics or Chemistry.` **Exact string: `ABB` plus Grade A EPQ, with pinned `A in Mathematics` and `B in either Physics or Chemistry`**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3. 30 credits needed at Distinction including an appropriate amount of Mathematics and either Physics or Chemistry and the remaining 15 credits at Merit or above.`
17. `Check the deadline for applications on the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAB including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** `Study abroad` and `Work placements`, both optional and each extending studies by 12 months; page notes `Choose from 100+ organisations in the UK and overseas.`
20. **Provenance** — `https://courses.leeds.ac.uk/i984/materials-science-and-engineering-beng` · heading `Materials Science and Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E33. Electronics and Computer Engineering BEng

**Fields**
1. **Electronics and Computer Engineering BEng** · 2. H6B7 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `A-level: AAB including Mathematics.` **Exact string: `AAB`**
6. **Mathematics only**, at the offer grade
7. `including Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page**
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.**
14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: BBB including Mathematics plus a pass in the Access to Leeds scheme.` **Exact string: `BBB`**
    - **`Alternative Entry Scheme`** (mature) — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).`
    - Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus ABB at A-level including Mathematics.` **Exact string: `ABB` plus Grade A EPQ**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAB including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `Studying abroad is a unique opportunity to explore the world, whilst gaining invaluable skills and experience that could enhance your future employability and career prospects too.` · **`Work placements`** — `Make connections, practice skills and build confidence in your future with an industrial placement year as part of your course.`
20. **Provenance** — `https://courses.leeds.ac.uk/j749/electronics-and-computer-engineering-beng` · heading `Electronics and Computer Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E17. Civil and Environmental Engineering BEng — ⭐ ADMISSIONS TEST + INTERVIEW ON BTEC ROUTE

**Fields**
1. **Civil and Environmental Engineering BEng** · 2. H296 · 3. BEng · 4. `3 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `AAB with an A in Mathematics` **Exact string: `AAB`**
6. **Mathematics with subject-specific minimum grade `A`.** No other subject required.
7. `AAB with an A in Mathematics` — subject-pinned grade; no "one of X/Y/Z"; no `A*`; no Physics/Chemistry requirement.
8. Further Mathematics — **NOT PUBLISHED** in the A-level requirement; named only in the BTEC text (Field 16)
9. Mathematics: **required at grade A**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T-Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page**
12. `English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **⭐ ADMISSIONS TEST — EXPLICITLY PUBLISHED (conditional).** A `diagnostic Maths test` is published for BTEC applicants and for those meeting the maths requirement through non-A-level qualifications. Quoted within the BTEC requirement: `D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test.` The mature route separately states `you may be asked to take tests in English and maths and to write an essay.` **For the standard A-level route: not stated.**
14. **⭐ INTERVIEW — EXPLICITLY PUBLISHED (conditional).** Required on the BTEC route per the sentence quoted above (`plus an interview and diagnostic Maths test`). **For the standard A-level route: not stated.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: BBB including Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `BBB`**
    - **`Alternative Entry Scheme for Mature Applicants`** — available; `you may be asked to take tests in English and maths and to write an essay.`
    - Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `Where an applicant offers an A in the EPQ/IPQ/ASCC we may make an offer of ABB at A-level including A in Mathematics.` **Exact string: `ABB` including A in Mathematics**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number of Mathematics modules) and the remaining 15 credits with Merit or above.` **BTEC** — `D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `AAB with an A in Mathematics` — longer block **NOT RETRIEVED**
19. **Study options:** **`Work placement`** — `During your course, you'll have the opportunity to advance your skill set and experience further. You can apply to undertake a one-year industrial work placement which will extend your degree by 12 months.` Study-abroad option: **NOT PUBLISHED on this page.**
20. **Provenance** — `https://courses.leeds.ac.uk/4836/civil-and-environmental-engineering-beng` · heading `Civil and Environmental Engineering BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---
### ⭐ THIRD CRITICAL FINDING — the BEng → MEng uplift is family-specific, not a rule

Verified pairs (each read on its own page):

| Family | BEng standard offer | MEng standard offer | Uplift? |
|---|---|---|---|
| Mechanical Engineering | `A*AA` | `A*AA` | **no** |
| Automotive Engineering | `A*AA` | `A*AA` | **no** |
| Medical Engineering | `A*AA` | `A*AA` | **no** |
| Chemical Engineering | `AAA` | `AAA` | **no** |
| Materials Science and Engineering | `AAB` | `AAB` | **no** |
| Architectural Engineering | `AAB` with an A in Mathematics | `AAA` including Mathematics | **YES — and the subject rule changes shape too** |
| Electronics and Computer Engineering | `AAB` including Mathematics | `AAA` including Mathematics | **YES** |
| Mechatronics and Robotics Engineering | `AAB` including Mathematics | `AAA` including Mathematics | **YES** |

Their contextual and EPQ offers move with them (e.g. Architectural: Access to Leeds `BBB`→`ABB`,
EPQ `ABB`→`AAB`). **Any app that copies a BEng offer onto its MEng sibling will be wrong for
three of the eight families verified.**

---

## E50. Medical Engineering MEng, BEng

**Fields**
1. **Medical Engineering MEng, BEng** · 2. HHH6 · 3. MEng, BEng `(integrated Masters)` · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A*AA including Mathematics and one of the sciences, Physics, Chemistry or Biology.` **Exact string: `A*AA`** — same as the BEng
6. Mathematics **and one of** Physics, Chemistry **or** Biology
7. `including Mathematics and one of the sciences, Physics, Chemistry or Biology` — three-way "one of" rule. Which subject carries the `A*` — **NOT PUBLISHED**.
8. Further Mathematics — **NOT PUBLISHED** (only `Further Calculus` in Access to HE)
9. Mathematics: **required**. Physics / Chemistry / **Biology**: each **accepted as the one science**
10. Accepted alternative sciences: the three named. Explicitly excluded: **NOT PUBLISHED**
11. **[E-PRAC]** — verified on this page
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: AAB including Mathematics and one of the sciences, Physics, Chemistry or Biology, Plus a pass in the Access to Leeds Scheme.` **Exact string: `AAB`** (transcribed with Leeds' own capital `Plus`)
    - **[E-MATURE]** verified in full · Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `where an applicant offers the EPQ, IPQ or ASCC we may make an offer of AAA at A-level including Mathematics and one of Physics, Chemistry or Biology, plus grade A in EPQ/IPQ/Welsh Bacc ASCC.` **Exact string: `AAA` plus grade A in EPQ**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, with Distinction, to include Mathematics, Calculus, Further Calculus and Physics, Chemistry or Biology.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A*AA including Mathematics and one of the sciences, Physics, Chemistry or Biology.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months.` · **`Work placement`** — `If you decide to undertake a placement year, your period of study will be extended by 12 months.`
20. **Provenance** — `https://courses.leeds.ac.uk/f447/medical-engineering-meng-beng` · heading `Medical Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E6. Architectural Engineering MEng, BEng — ⭐ HIGHER OFFER THAN ITS BEng

**Fields**
1. **Architectural Engineering MEng, BEng** · 2. HK21 · 3. MEng, BEng · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Mathematics.` **Exact string: `AAA`** — **compare the BEng's `AAB` with an A in Mathematics; both the grades and the subject-rule shape differ**
6. **Mathematics only**, at the offer grade. Note the BEng pins `an A in Mathematics` within `AAB`; the MEng simply requires Mathematics within `AAA`.
7. `including Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.` — **present here, although ABSENT on the BEng page**
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`** (BEng is `BBB`)
    - **`Alternative Entry Scheme for Mature Applicants`** — heading verified; body text **NOT RETRIEVED** · Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `where an applicant offers an A in the EPQ/IPQ/ASCC we may make an offer of AAB at A-level including A in Mathematics.` **Exact string: `AAB` including A in Mathematics** (BEng is `ABB`). **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number of Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** `optional study abroad year`; and an `industrial placement year is a great way to help you decide on a career path`. Full verbatim section text **NOT RETRIEVED**.
20. **Provenance** — `https://courses.leeds.ac.uk/f416/architectural-engineering-meng-beng` · heading `Architectural Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry: 2027`, `Start date: September 2027`)

---

## E10. Automotive Engineering MEng, BEng

**Fields**
1. **Automotive Engineering MEng, BEng** · 2. H330 · 3. MEng, BEng `(Integrated Masters)` · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `A*AA (specific subject requirements)` — subject line `A-level: A*AA including Mathematics and either Physics or Chemistry.` **Exact string: `A*AA`** — same as the BEng
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. Which subject carries the `A*` — **NOT PUBLISHED**.
8. Further Mathematics — **NOT PUBLISHED** (only `Further Calculus` in Access to HE)
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We cannot consider BTEC qualifications without A Level Mathematics and do not accept BTEC Maths units in lieu of this A Level requirement`
11. **[E-PRAC]** — verified on this page
12. **[E-GCSE]** — verified on this page
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: AAB including Mathematics and either Physics or Chemistry, plus a pass in the Access to Leeds Scheme.` **Exact string: `AAB`**
    - **`Alternative Entry Scheme`** (mature) — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme...` · Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — heading verified and the recognition sentence begins `We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them...`, but **the resulting grade string was NOT RETRIEVED for this page**. Do **not** copy the BEng's `AAA plus grade A in EPQ` here without re-checking. **`Access to HE`** — **[E-AHE-MECH]** verified.
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: A*AA including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options:** `This programme offers you the option to spend time abroad as an extra academic year` · `A work placement can be a great investment in your future.`
20. **Provenance** — `https://courses.leeds.ac.uk/f413/automotive-engineering-meng-beng` · heading `Automotive Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E34. Electronics and Computer Engineering MEng, BEng — ⭐ HIGHER OFFER THAN ITS BEng · ⚠️ YEAR CONFLICT

> **⚠️ Conflicting year signals:** year label `2027 course information` but `Start Date: September 2026`.
> Treat as **year-ambiguous** and re-check before publication.

**Fields**
1. **Electronics and Computer Engineering MEng, BEng** · 2. H6B8 · 3. MEng, BEng · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `AAA including Mathematics.` **Exact string: `AAA`** — BEng is `AAB`
6. **Mathematics only**, at the offer grade
7. `including Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page** (consistent with its BEng)
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Mathematics plus a pass in the Access to Leeds scheme.` **Exact string: `ABB`** (BEng is `BBB`)
    - **[E-MATURE]** verified in full · Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification and Welsh Baccalaureate Advanced Skills Challenge Certificate`** — `Grade A plus AAB at A-level including Mathematics.` **Exact string: `AAB` plus Grade A** (BEng is `ABB`). Note this page names the Welsh Bacc ASCC **in the heading itself**, unlike siblings. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `AAA including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options — one combined option, which is unusual:** `During your course, you'll be given the opportunity to advance your skill set and experience further. You can apply to either undertake a one-year industrial work placement or study abroad for a year, choosing from a selection of universities we're in partnership with worldwide.` — placement and study abroad are presented as an **either/or** choice, not two independent options.
20. **Provenance** — `https://courses.leeds.ac.uk/j748/electronics-and-computer-engineering-meng-beng` · heading `Electronics and Computer Engineering MEng, BEng` · **entry year shown: AMBIGUOUS** (`2027 course information` vs `Start Date: September 2026`)

---

## E38. Materials Science and Engineering MEng, BEng

**Fields**
1. **Materials Science and Engineering MEng, BEng** · 2. J511 · 3. MEng, BEng `(integrated Masters)` · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAB (specific subject requirements)` — subject line `A-level: AAB including Mathematics and either Physics or Chemistry.` **Exact string: `AAB`** — same as the BEng
6. Mathematics **and one of** Physics **or** Chemistry
7. `including Mathematics and either Physics or Chemistry`. No `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABC including an A in Mathematics and a B in Physics or Chemistry` **Exact string: `ABC`**. **Note:** unlike the BEng's version, the sentence as printed here does **not** carry the trailing `and a pass in the Access to Leeds scheme` clause — recorded as printed, not harmonised with the BEng.
    - Mature scheme — `Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme)`; full heading/body **NOT RETRIEVED** · Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus ABB at A-level including A in Mathematics and B in either Physics or Chemistry.` **Exact string: `ABB` plus Grade A EPQ**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3. 30 credits needed at Distinction including an appropriate amount of Mathematics and either Physics or Chemistry and the remaining 15 credits at Merit or above.`
17. `Check the deadline for applications on the UCAS website` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAB including Mathematics and either Physics or Chemistry.` — longer block **NOT RETRIEVED**
19. **Study options — either/or:** `During your course, you'll be given the opportunity to advance your skill set and experience. You can apply to either undertake a one-year industrial work placement or study abroad for a year`
20. **Provenance** — `https://courses.leeds.ac.uk/i981/materials-science-and-engineering-meng-beng` · heading `Materials Science and Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E46. Mechatronics and Robotics Engineering MEng, BEng — ⭐ HIGHER OFFER THAN ITS BEng

**Fields**
1. **Mechatronics and Robotics Engineering MEng, BEng** · 2. HH36 · 3. MEng, BEng · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Mathematics.` **Exact string: `AAA`** — BEng is `AAB`
6. **Mathematics only**, at the offer grade
7. `including Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. Science practical endorsement — **NOT PUBLISHED on this page** (consistent with its BEng)
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.` — note the BEng page additionally carries the Functional Skills sentence; this one does not
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Mathematics plus a pass in the Access to Leeds scheme.` **Exact string: `ABB`** (BEng is `BBB`)
    - **[E-MATURE]** verified in full · Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus AAB at A-level including Mathematics.` **Exact string: `AAB` plus Grade A EPQ** (BEng is `ABB`). **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number Mathematics modules) and the remaining 15 credits with Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** `This programme offers you the option to spend time abroad as an extra academic year and will extend your studies by 12 months.` · `A work placement can be a great investment in your future.`
20. **Provenance** — `https://courses.leeds.ac.uk/j915/mechatronics-and-robotics-engineering-meng-beng` · heading `Mechatronics and Robotics Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry: 2027`, `Start date: September 2027`)

---
## E18. Civil and Environmental Engineering MEng, BEng — ⭐ HIGHER OFFER THAN ITS BEng · TEST + INTERVIEW ON BTEC

**Fields**
1. **Civil and Environmental Engineering MEng, BEng** · 2. H291 · 3. MEng, BEng `(Integrated Masters)` · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Mathematics.` **Exact string: `AAA`** — **BEng is `AAB` with an A in Mathematics; both grades and subject-rule shape differ**
6. **Mathematics only**, at the offer grade (the BEng instead pins `an A in Mathematics` inside `AAB`)
7. `including Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED** in the A-level requirement; named only in the BTEC text
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T-Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.` — **present here, though ABSENT on its BEng page**
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **⭐ ADMISSIONS TEST — EXPLICITLY PUBLISHED (conditional).** A `diagnostic Maths test` for BTEC applicants and for those meeting level-3 maths via non-A-level qualifications. Quoted in the BTEC requirement: `D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test.` **Standard A-level route: not stated.**
14. **⭐ INTERVIEW — EXPLICITLY PUBLISHED (conditional)** for BTEC applicants, per the same sentence. **Standard A-level route: not stated.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`** (BEng is `BBB`)
    - **`Alternative Entry Scheme for Mature Applicants`** — heading verified; body **NOT RETRIEVED** · Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `where an applicant offers an A in the EPQ/IPQ/ASCC we may make an offer of AAB at A-level including A in Mathematics.` **Exact string: `AAB` including A in Mathematics** (BEng is `ABB`). **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number of Mathematics modules) and the remaining 15 credits with Merit or above.` **BTEC** — as quoted in Field 13.
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options — note the unusual non-extending year abroad:** `optional study abroad year does not extend your studies` (contrast every Physics page, where the year abroad adds 12 months) · industrial placement: `undertake an industrial placement year` which `will extend your period of study by 12 months.`
20. **Provenance** — `https://courses.leeds.ac.uk/f443/civil-and-environmental-engineering-meng-beng` · heading `Civil and Environmental Engineering MEng, BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## E22. Civil and Structural Engineering MEng, BEng — ⚠️ 2026 ENTRY · ⭐ THE ONLY PUBLISHED DEADLINE STATEMENT

> **⚠️ This page showed 2026 entry, not 2027.** Figures are **2026-entry**; 2027 **NOT PUBLISHED**.

**Fields**
1. **Civil and Structural Engineering MEng, BEng** · 2. H200 · 3. MEng, BEng · 4. `4 Years (Full time)`
5. **2026 entry:** `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Mathematics.` **Exact string: `AAA`**. **2027: NOT PUBLISHED.**
6. **Mathematics only**, at the offer grade
7. `including Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED** in the A-level requirement; named only in the BTEC text
9. Mathematics: **required**. Physics: **NOT PUBLISHED / not required**. Chemistry: **NOT PUBLISHED / not required**
10. Accepted alternative sciences: **NOT PUBLISHED**. Explicitly excluded subjects: **NOT PUBLISHED** (no T-Level exclusion on this page, unlike most siblings)
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **⭐ ADMISSIONS TEST — EXPLICITLY PUBLISHED (conditional).** Two separate statements: `diagnostic Maths test` for BTEC / alternative-qualification applicants, and for the mature route `you may be asked to take tests in English and maths`. **Standard A-level route: not stated.**
14. **⭐ INTERVIEW — EXPLICITLY PUBLISHED (conditional)** for BTEC applicants, via `D*D*D with Distinctions in all Mathematics units including Maths and Further Maths (and/or other appropriate maths units) plus an interview and diagnostic Maths test.` **Standard A-level route: not stated.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative Entry Scheme`** (mature) — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).` · Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `where an applicant offers an A in the EPQ/IPQ/ASCC we may make an offer of AAB at A-level including A in Mathematics.` **Exact string: `AAB`**. **`Access to HE`** — `Pass 60 credits overall with 45 credits at Level 3, 30 credits with Distinction (including an appropriate number of Mathematics modules) and the remaining 15 credits with Merit or above.` **BTEC** — as quoted in Field 14.
17. **⭐ DEADLINE — the only substantive deadline statement found anywhere in this research:** `For applications submitted by the January UCAS deadline, UCAS asks universities to make decisions by mid-May at the latest.` Still no course-specific application date, so a **course deadline remains NOT PUBLISHED**, but this decision-timing sentence is published and is worth carrying.
18. Single printed line: `A-level: AAA including Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** `you can choose to spend a year studying abroad. The optional study abroad year does not extend your studies` · `An industrial placement year...will extend your period of study by 12 months.`
20. **Provenance** — `https://courses.leeds.ac.uk/f412/civil-and-structural-engineering-meng-beng` · heading `Civil and Structural Engineering MEng, BEng` · **entry year shown: 2026** (`Start Date: September 2026`; year label read `Open Days 2026`)

---

## 9. Physics with Artificial Intelligence (Industrial) BSc — ⚠️ YEAR CONFLICT · ⭐ PLACEMENT DESCRIBED AS MANDATORY

> **⚠️ Conflicting year signals:** year label `2026 course information` but `Start Date: September 2027`.
> Treat as **year-ambiguous** and re-check before publication.

**Fields**
1. **Physics with Artificial Intelligence (Industrial) BSc** · 2. F311 · 3. BSc · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` — subject line `A-level: AAA including Physics and Mathematics` **Exact string: `AAA`**
6. Physics and Mathematics at the offer grade
7. `including Physics and Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. **[PRAC]** — verified on this page
12. `English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes:
    - **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**
    - **`Alternative Entry Scheme for Mature Students`** — `...you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria).` · Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**. **`Access to HE`** — text elided in extraction (`Overall pass of the Access to HE, with 45 credits at level 3...must be passed with Distinction.`); full sentence **NOT RETRIEVED**
17. `Apply to this course through UCAS. Check the deadline for applications on the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `A-level: AAA including Physics and Mathematics` — longer block **NOT RETRIEVED**
19. **Study options:** **`Work placement`** — described as `mandatory`, a `paid industrial placement year`, with the caveat `work placements are not guaranteed.` **This is a notable tension: the placement is the defining feature of the (Industrial) UCAS code and is called mandatory, yet the page also says placements are not guaranteed.** · **`Study abroad`** — `This degree does not offer the option to study abroad.` (excluded)
20. **Provenance** — `https://courses.leeds.ac.uk/k058/physics-with-artificial-intelligence-industrial-bsc` · heading `Physics with Artificial Intelligence (Industrial) BSc` · **entry year shown: AMBIGUOUS** (`2026 course information` vs `Start Date: September 2027`)

---
## 23. Theoretical Physics (International) BSc — ⚠️ STALE PAGE (2025 entry)

> **2025-entry content.** 2027 offer **NOT PUBLISHED** at this URL.

**Fields**
1. **Theoretical Physics (International) BSc** · 2. F3K3 — **from the course-search listing; the page itself does not print a UCAS code (not stated)** · 3. BSc · 4. `4 years full time`
5. **2025 entry:** `Typical A-level offer` / `AAA (specific subject requirements)` — `AAA including Physics and Mathematics.` **Exact string: `AAA`**. **2027: NOT PUBLISHED.**
6. Physics and Mathematics at the offer grade · 7. `including Physics and Mathematics`. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `Excludes A Level General Studies and Critical Thinking.`
11. **[PRAC]** — verified on this page
12. `English Language at grade C (4) or above, or an appropriate English language qualification.` — older wording
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes: **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Physics and Mathematics.` **Exact string: `ABB`** (no scheme-pass clause). Mature scheme: **NOT PUBLISHED on this page**. Care-experienced offer: **NOT PUBLISHED**
16. **`EPQ/IPQ`** — `We recognise the value of these qualifications and the effort and enthusiasm that applicants put into them, and where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-Level.` **Exact string: `AAB`, no subject clause**. **`Access to HE`** — **[AHE]** verified in full.
17. `Apply to this course and check the deadline for applications through the UCAS website.` — deadline **NOT PUBLISHED**
18. Single printed line: `AAA including Physics and Mathematics.` — longer block **NOT RETRIEVED**
19. **Study options:** **`Study abroad`** — `This programme gives you the opportunity to undertake a study abroad year as part of the course.` · **`Work placement`** — `This degree does not offer a work placement option. However, the Theoretical Physics (Industrial) BSc degree does have this option.`
20. **Provenance** — `https://courses.leeds.ac.uk/g978/theoretical-physics-international-bsc` · heading `Theoretical Physics (International) BSc` · **entry year shown: 2025** (`Start Date: September 2025`; year label `Open Days 2025`)

---

## 11. Physics with Artificial Intelligence (International) BSc

> **⚠️ This page showed 2026 entry, not 2027.** Figures are **2026-entry**; 2027 **NOT PUBLISHED**.

**Fields**
1. **Physics with Artificial Intelligence (International) BSc** · 2. F312 · 3. BSc · 4. `4 Years (Full time)`
5. **2026 entry:** `Typical A-level offer` / `AAA` **Exact string: `AAA`** (printed bare, without the `(specific subject requirements)` parenthetical). **2027: NOT PUBLISHED.**
6. Physics and Mathematics — page states the A-level `includes Physics and Mathematics`; the fully verbatim subject sentence was **NOT RETRIEVED**
7. Physics and Mathematics both required. No "one of X/Y/Z"; no `A*`.
8. Further Mathematics — **NOT PUBLISHED**
9. Mathematics: **required**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. **[PRAC]** — verified on this page
12. `GCSE: English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes: **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including physics and mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**. **`Alternative Entry Scheme for Mature Students`** — available `for applicants over 21 lacking required qualifications`. Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ/ASCC** — `where an applicant offers an A in the EPQ, IPQ or ASCC we may make an offer of AAB at A-level including A in Physics and Mathematics.` **Exact string: `AAB`**. **`Access to HE`** — **[AHE]** verified in full.
17. `Check the deadline for applications on the UCAS website.` — deadline **NOT PUBLISHED**
18. Longer contiguous block **NOT RETRIEVED**
19. **Study options** — only a fee fragment was surfaced (`you'll pay a reduced tuition fee during this period`, referring to the year abroad). Study-abroad/placement section text otherwise **NOT RETRIEVED**.
20. **Provenance** — `https://courses.leeds.ac.uk/k059/physics-with-artificial-intelligence-international-bsc` · heading `Physics with Artificial Intelligence (International) BSc` · **entry year shown: 2026** (`Start Date: September 2026`; year label `Open Days 2026`)

---

## E15. Chemical Engineering (Industrial) BEng

**Fields**
1. **Chemical Engineering (Industrial) BEng** · 2. H807 · 3. BEng · 4. `4 Years (Full time)`
5. `Typical A-level offer` / `AAA (specific subject requirements)` **Exact string: `AAA`** — same as the non-industrial BEng
6. Mathematics **and one of** Physics **or** Chemistry (fully verbatim subject sentence **NOT RETRIEVED**; the page states `Mathematics and either Physics or Chemistry`)
7. `Mathematics and either Physics or Chemistry` — "one of X/Y" rule. No `A*`.
8. Further Mathematics — **NOT PUBLISHED** (only `Further Calculus` in Access to HE)
9. Mathematics: **required**. Physics: **one of the pair**. Chemistry: **one of the pair**
10. Accepted alternative sciences: **NOT PUBLISHED**. **Explicitly NOT accepted:** `We do not accept T Levels as entry onto this course.`
11. `Where an A-Level Science subject is taken, we require a pass in the practical science element, alongside the achievement of the A-Level at the stated grade.`
12. `English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes: **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including an A in Mathematics and B in either Physics or Chemistry and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**. **`Alternative Entry Scheme for Mature Students`** — `If you are a mature applicant and you don't have the required A Levels or GCSE English and Math qualifications, you can complete our Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme).` Care-experienced offer: **NOT PUBLISHED**
16. **`Extended Project Qualification, International Project Qualification`** — `Grade A plus AAB at A-level including A in Mathematics and A in either Physics or Chemistry.` **Exact string: `AAB` plus Grade A EPQ**. **`Access to HE`** — `Pass 60 credits overall with 30 credits at Distinction (to include an appropriate amount of Mathematics, Calculus and Further Calculus and specific subjects e.g. Physics or Chemistry) and the remaining credits at Merit or above.`
17. **[E-DEADLINE]** — deadline **NOT PUBLISHED**
18. Longer contiguous block **NOT RETRIEVED**
19. **Study options:** **`Work placement`** — `If you decide to undertake a placement year, your period of study will be extended by 12 months.` Study-abroad option: **NOT PUBLISHED on this page.**
20. **Provenance** — `https://courses.leeds.ac.uk/g832/chemical-engineering-industrial-beng` · heading `Chemical Engineering (Industrial) BEng` · **entry year shown: 2027** (`Year of entry 2027`, `Start date: September 2027`)

---

## ADJ1. Mathematics and Physics BSc — ⭐ THE ONLY COURSE WITH A RANGE OFFER AND AN EXPLICIT FURTHER MATHS RULE

*(Adjacent / joint honours with the School of Mathematics. Included because it is a genuine
physics degree and because its requirement structure is unlike every other record here.)*

**Fields**
1. **Mathematics and Physics BSc** · 2. FG31 · 3. BSc · 4. `3 Years (Full time)`
5. **⭐ A RANGE, not a single string:** `Typical A-level offer` / `AAA - AAB (specific subject requirements)`. **Exact wording: `AAA - AAB`.** Recorded as the range exactly as printed — it must **not** be flattened to `AAA` or to `AAB`.
6. **Required subjects with a subject-specific minimum grade:** `including Physics and a minimum of grade A in Mathematics`
7. **Cross-subject rules:** Physics required; Mathematics required at **a minimum of grade A**. The lower end of the range is unlocked only by Further Mathematics — see Field 8. Note the alternative grade pattern **`A*BB`** appears in that rule, a grade string not seen anywhere else in this research.
8. **⭐ FURTHER MATHEMATICS — EXPLICITLY REQUIRED FOR THE REDUCED END OF THE RANGE.** Verbatim: `or AAB/A*BB including Physics and a minimum of grade A in Mathematics plus Further Mathematics or AAB/A*BB including Physics and a minimum of grade A in Mathematics, plus an A in AS Further Mathematics.` So Further Mathematics (full A-level) **or** `an A in AS Further Mathematics` substitutes for the third A grade. **This is the only in-scope course where Further Mathematics is mentioned at all** — every Physics and Engineering page checked left it unpublished.
9. Mathematics: **required, minimum grade A**. Physics: **required**. Chemistry: **NOT PUBLISHED**
10. Accepted alternative sciences: **NOT PUBLISHED**. Explicitly excluded subjects: **NOT PUBLISHED**
11. **[PRAC]** — verified on this page
12. `English Language grade 4 (C) or higher, or an equivalent English language qualification.`
13. **Admissions test — NOT STATED.** · 14. **Interview — NOT STATED.**
15. Reduced-offer routes: **`Access to Leeds`** — `Typical Access to Leeds A Level offer: ABB including Physics and a minimum of grade A in Mathematics and a pass in the Access to Leeds scheme.` **Exact string: `ABB`**. Mature: `Alternative Entry Scheme (subject to meeting the eligibility criteria for the scheme)`. Care-experienced offer: **NOT PUBLISHED**
16. **EPQ/IPQ** — `where an applicant offers an A in the EPQ or IPQ, we may make an offer of AAB at A-level` **Exact string: `AAB`** (note: EPQ/IPQ only — no ASCC named, unlike sibling pages). **`Access to HE`** — `Normally only accepted in combination with grade A in A Level Mathematics or equivalent.`
17. `Check the deadline for applications on the UCAS website` — deadline **NOT PUBLISHED**
18. Single printed fragment: `including Physics and a minimum of grade A in Mathematics` — longer block **NOT RETRIEVED**
19. **Study options:** `One-year optional work placement or study abroad` — presented as a single either/or option.
20. **Provenance** — `https://courses.leeds.ac.uk/k279/mathematics-and-physics-bsc` · heading `Mathematics and Physics BSc` · **entry year shown: 2027** (`Year of entry 2027`, `Start Date: September 2027`)

---

## Courses whose pages returned HTTP 403 on every attempt — **NOT RETRIEVED**

Each was attempted on the plain canonical URL and retried with a cache-busting query string
(`?v=2`), per the source policy. All requirement fields are **NOT RETRIEVED**. Title and UCAS
code below come from the official Leeds course-search listing (which did load); **nothing has
been inferred from sibling courses.**

| Course | UCAS | URL attempted |
|---|---|---|
| Physics (International) BSc | F304 | `/g976/physics-international-bsc` |
| Physics with Artificial Intelligence MPhys, BSc | F315 | `/k051/physics-with-artificial-intelligence-mphys-bsc` |
| Physics with Artificial Intelligence (Industrial) MPhys, BSc | F316 | `/k060/physics-with-artificial-intelligence-industrial-mphys-bsc` |
| Physics with Astrophysics (International) BSc | F3F8 | `/g977/physics-with-astrophysics-international-bsc` |
| Theoretical Physics (Industrial) BSc | F3K2 | `/g959/theoretical-physics-industrial-bsc` |
| Theoretical Physics (Industrial) MPhys, BSc | F342 | `/g898/theoretical-physics-industrial-mphys-bsc` |
| Theoretical Physics (International) MPhys, BSc | F343 | `/g383/theoretical-physics-international-mphys-bsc` |
| Aeronautical and Aerospace Engineering BEng | H415 | `/a225/aeronautical-and-aerospace-engineering-beng` |
| Civil and Structural Engineering BEng | H205 | `/a252/civil-and-structural-engineering-beng` |
| Civil Engineering MEng, BEng | H204 | `/i445/civil-engineering-meng-beng` |
| Electronic and Electrical Engineering MEng, BEng | H600 | `/f456/electronic-and-electrical-engineering-meng-beng` |

## Courses in scope but **NOT ATTEMPTED** (distinct from NOT RETRIEVED)

These exist and are in scope, but no page fetch was made, so they hold **no data at all** —
not even an unretrieved-field record. They are listed so the gap is explicit rather than silent.
**Their offers must not be copied from their parent course:** the verified evidence shows
`(Industrial)` pages sometimes match the parent (Chemical Engineering H807 = H805 `AAA`) and
sometimes sit on a stale year with different wording (Physics with Astrophysics F3F7 on 2025).

- Physics with Artificial Intelligence (International) MPhys, BSc — F317
- Aeronautical and Aerospace Engineering (Industrial) BEng — H417; (Industrial) MEng, BEng — H412
- Architectural Engineering (Industrial) BEng — HK28; (Industrial) MEng, BEng — HK23
- Automotive Engineering (Industrial) BEng — H337; (Industrial) MEng, BEng — H332
- Chemical Engineering (Industrial) MEng, BEng — H802
- Civil and Environmental Engineering (Industrial) BEng — H298; (Industrial) MEng, BEng — H293
- Civil and Structural Engineering (Industrial) BEng — H209; (Industrial) MEng, BEng — H208
- Civil Engineering (Industrial) BEng — H207; (Industrial) MEng, BEng — H206
- Electronic and Electrical Engineering (Industrial) BEng — H601; (Industrial) MEng, BEng — H606
- Electronics and Computer Engineering (Industrial) BEng — H6B6; (Industrial) MEng, BEng — H6B9
- Materials Science and Engineering (Industrial) BEng — J512; (Industrial) MEng, BEng — J513
- Mechanical Engineering (Industrial) BEng — H307; (Industrial) MEng, BEng — H302
- Mechatronics and Robotics Engineering (Industrial) BEng — HH42; (Industrial) MEng, BEng — HH37
- Medical Engineering (Industrial) BEng — HHH3; (Industrial) MEng, BEng — HHH8
- Product Design (Industrial) BSc — H797

---
