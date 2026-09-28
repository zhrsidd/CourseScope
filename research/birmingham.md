# University of Birmingham — Undergraduate Admissions Data (Physics & Engineering)

**Target entry year:** 2027 entry
**Research date:** 2026-09-14
**Source policy:** `birmingham.ac.uk` only. All values below were obtained by fetching and reading the named official course page. No third-party guides were used. No value has been copied from a sibling course.

---

## SUMMARY

### Courses verified
**56 courses verified — the complete in-scope catalogue.** Every one was obtained by fetching and reading its own official Birmingham course page:

- **Physics and Astronomy — 17 of 17** in the published catalogue
- **Engineering — 39 of 39** in scope (General 2, Mechanical 7, Civil 5, Electronic/Electrical/Systems 9, Chemical & Energy 10, Materials & Aerospace 5, Foundation Year 1)

Every course's entry-requirements panel was confirmed to be displaying **2027 entry**. No course was left unverified.

### Pages NOT RETRIEVED
**No course page remains unretrieved.** One non-course page could not be loaded:

- The central **"Pathways to Birmingham" / "Contextual Offer" scheme-definition page** (a 404 was returned at the URL located, and no alternative URL was confirmed). Consequence: the **eligibility criteria** for the two reduced-offer schemes, and **whether Birmingham operates a separate care-experienced or estranged-student offer route**, are **NOT RETRIEVED** — this is not evidence that no such route exists. The per-course grade values for both schemes are fully recorded below and are unaffected.

### Expected courses that do NOT exist at Birmingham
Checked against Birmingham's own subject listings — these appear in the research brief but have **no Birmingham undergraduate degree**:

| Expected | Finding |
|---|---|
| **Nuclear Engineering** | **Does not exist** as an undergraduate degree. No course in any subject listing. "Nuclear" appears only as optional module/lab content inside Physics and Materials degrees. |
| **Physics with Nuclear Physics** / **Physics with Nanoscale Physics** | **Do not exist.** Not in the Physics and Astronomy catalogue. |
| **Metallurgy** (as a degree) | **Does not exist** as a degree title. The *School* of Metallurgy and Materials exists, but the degrees are titled *Materials Science and Engineering*. |
| **Biomedical / Biomaterials Engineering** | **No UK (Edgbaston) degree.** The only biomedical-titled engineering degree is *Mechanical Engineering (Biomedical) BEng* at the **Dubai** campus — a different campus, listed separately, excluded from this UK dataset (see Structural surprise 6). |
| **Physics and Astrophysics (International Study) MSci** | **Does not exist.** The International Study variant of Astrophysics is published as **BSc only** (FF3M), even though plain Physics has International Study in *both* BSc (F301) and MSci (F303). An asymmetry worth not "correcting". |
| **Mechatronic Engineering** (that exact title) | Exists only as **Mechatronic and Robotic Engineering** (H6H3 / HH63 / H64I / H65I). |
| **Aerospace Engineering with a year in industry / abroad** | No separate UCAS code found. Aerospace publishes BEng (H400) and MEng (H402) only. |

### Structural surprises

1. **Birmingham runs BOTH a general "Engineering" degree AND the named engineering degrees, simultaneously.** `Engineering BEng` (H236) and `Engineering MEng` (H632) are *additional* degrees where you defer the choice of discipline, not replacements. A student can apply either to H236 (decide later) or directly to, e.g., H300 Mechanical. The `/engineering-courses` subject page lists ONLY the general degree, which makes it look as though Birmingham has consolidated all engineering — it has not. Anyone scraping `/engineering-courses` alone would wrongly conclude Mechanical, Civil and EEE no longer exist as direct-entry degrees.

2. **A "Contextual Offer" at Birmingham can be HIGHER than another course's standard offer, and for Chemical Engineering the contextual offer is barely a reduction.** Chemical Engineering MEng (H810): standard `A*AA/AAAA`, **Contextual Offer `AAA`** — and that same `AAA` string is the *standard* offer for Chemical Engineering BEng. Three Chemical/Energy MEng courses (H810, H802, H801, HW10) all use a contextual offer of `AAA`, which is only one grade below standard.

3. **Two distinct reduced-offer schemes with their own names, recorded separately throughout:** "**Pathways to Birmingham**" (the deeper reduction, a widening-participation programme) and "**Contextual Offer**" (the shallower reduction). These are *not* the same thing and must never be merged. Typical spread on Mechanical BEng: standard `AAB` → Contextual `ABB` → Pathways `BBB`.

4. **Three further alternative-offer routes are published as standard across both schools, including two that are not academic at all:** EPQ (one grade lower + grade B in EPQ), **Music performance** (one grade lower + the Music qualification, grade 8+), and **High-level sports** (one grade lower, county level or above). A music-grade or sports-based grade reduction on a Physics or Engineering degree is unusual and easy to miss.

5. **The MSci offer format splits into two incompatible families within the same School of Physics and Astronomy.** Most MSci courses use `A*AA /AAAA`. But **Theoretical Physics MSci (F343), Physics with Data Science MSci (FG14) and Theoretical Physics and Applied Mathematics MSci (F3DG)** use a different and higher string: **`A*A*A or A*AAA`** — and these are the *only* physics courses where **Further Mathematics is explicitly named as a route** (`A* Maths + A*/A Physics + A*/A Further Maths`). Same school, same page template, genuinely different requirement.

6. **Dubai campus courses are interleaved into the same subject listings as UK courses.** The Mechanical and EESE listing pages mix Edgbaston degrees with University of Birmingham **Dubai** degrees (Mechanical Engineering BEng (Dubai), Mechanical Engineering (Biomedical) BEng (Dubai), Computer Engineering BEng (Dubai), and several "with Integrated Foundation Year" variants). The Dubai entries carry **no UCAS code** in the listing. They are excluded from this dataset as out of scope for a UK course-finder, but a scraper would silently absorb them as UK courses.

7. **The admissions-test position differs BY SCHOOL, and one school's silence sits next to another school's explicit test.** The School of Engineering pages (Mechanical, Civil, EEE, Mechatronic, Computer Engineering, general Engineering) all carry an explicit conditional **Mathematics Aptitude test** clause. Aerospace, Materials, Chemical, Energy and every Physics course say **nothing at all** about any admissions test. Per the brief, silence is recorded as *not stated*, never as "no admissions test".

8. **Not one page in either school mentioned an interview.** Recorded as *not stated* for all 52 courses — never as "no interview".

9. **`Theoretical Physics and Applied Mathematics BSc` (FG31) has no four-A-level alternative.** Its offer is a flat `A*AA to include A-level Mathematics A* and A-level Physics A` — no `/AAAA` branch, unlike almost every other Physics BSc. A genuine one-off.

10. **The Pathways offer for the "mathsy" Physics BSc courses is a different shape from its siblings.** Theoretical Physics BSc (F342) and Physics with Data Science BSc (FG13) use Pathways `A*BC to include A* in Maths and B in Physics` — note the required **A\* in Maths even in the widening-participation offer**, and Physics dropping to B. Compare Physics BSc (F300), whose Pathways offer is `AAC to include Maths and Physics grades AA`. Same standard offer, different reduced offer.

11. **Duration fields are ranges on the general Engineering degrees:** `3/4 years` (BEng H236) and `4/5 years` (MEng H632), reflecting the optional industrial year taken inside one UCAS code.

12. **UCAS codes are not mnemonic and two use a letter in the final position:** Mechatronic with Industrial Year uses **H64I** (BEng) and **H65I** (MEng) — that is a capital letter I, not a digit 1. Also note Materials Science and Engineering BEng is **J5F2** while the MEng is **F2H1** and the Industrial MEng is **J200** — the BEng/MEng codes share no prefix.

13. **Application deadlines for 2027 entry are universally unpublished.** Every 2027 panel reads "Application deadline for September 2027 entry to be confirmed." The concrete date `14 January 2026` that appears on some pages belongs to the **2026** panel and must not be recorded as a 2027 deadline.

14. **The Foundation Year's offer string appears to exclude the very subject every other engineering degree requires.** Engineering and Physical Sciences Foundation Year (HFJ0) prints: `BBB A-level Mathematics and General Studies are not considered.` Read literally, **A-level Mathematics is "not considered"** — the opposite of every other engineering course, all of which require it. This is internally consistent with a foundation year aimed at applicants without the standard qualifications (holding Maths A-level would remove the need for the foundation route), but the sentence is genuinely ambiguous as printed. Recorded **verbatim and uninterpreted**; flagged for human confirmation before it drives any eligibility logic.

15. **The Foundation Year is the only course in this dataset where "Pathways to Birmingham" is explicitly N/A**, and the only one restricted by nationality: "Please note this course is only open to UK students." It is also the only course with a **published GCSE requirement in Maths** ("Minimum 6/B in GCSE Mathematics") and a contextual offer of `BBC`.

16. **Contextual-offer generosity is inconsistent *within* the School of Chemical Engineering.** Both Chemical Engineering MEng (H810) and Energy Engineering MEng (H805) publish the same standard offer `A*AA/AAAA`, but their contextual offers differ by a full grade: **H810 → `AAA`** (one grade below standard) versus **H805 → `AAB`** (two grades below). Same school, same standard offer, different reduction. A reasonable person would assume these matched; they do not.

### Methodology caveat — please read before trusting any "NOT PUBLISHED"

Two reliability issues affect this dataset and I have not papered over them:

- **(A) Stale-year readings.** The fetch tool initially reported "2026" as the displayed entry year for **eight** pages, several with a `14 January 2026` deadline. On re-fetching each with a cache-busting query string and asking specifically about the year selector, **all eight resolved to 2027** with a "to be confirmed" deadline. Affected and re-verified: Theoretical Physics MSci, Physics with Particle Physics and Cosmology BSc and MSci, Physics with Data Science BSc and MSci, Physics and Astrophysics (International Study) BSc, Physics with Medical Physics MSci, Mechanical Engineering with Industrial Year BEng. Every course below is recorded from a panel confirmed to be showing **2027**.

- **(B) Absence is weaker evidence than presence.** The fetch tool returns a model-summarised rendering of the page, not raw HTML (direct `curl` to `birmingham.ac.uk` is blocked by the egress proxy in this environment, so raw-HTML verification was not available). A quoted string that came back is strong evidence. A field reported as absent may have been on the page and dropped by the summariser. This matters most for **GCSE requirements (field 12)** and **science practical endorsement (field 11)**, which came back empty for all 52 courses — a uniformity that is itself suspicious, since most UK universities publish a baseline GCSE requirement. Those two fields are therefore marked **NOT PUBLISHED (low confidence — absence not independently verified)**. Offers, tests, interviews and contextual offers are high confidence.

- **(C) Field 18 (contiguous raw block).** Because I received summarised text rather than raw HTML, I cannot certify that any multi-sentence passage appears as one contiguous block. I have therefore recorded only **single quoted sentences**, which are contiguous by nature, and explicitly declined to stitch fragments into fake "blocks". Where no single sentence was returned verbatim, field 18 is marked unavailable.

### Fields legend (used in every section below)
1 Title · 2 UCAS · 3 Award · 4 Duration · 5 Standard A-Level offer (verbatim) · 6 Required subjects · 7 Cross-subject rules · 8 Further Maths status · 9 Maths/Physics/Chemistry individually · 10 Alternative & excluded subjects · 11 Practical endorsement · 12 GCSE · 13 Admissions test · 14 Interview · 15 Reduced-offer routes (separately) · 16 Alternative offer routes · 17 Deadline · 18 Contiguous raw block · 19 Study options within one UCAS code · 20 Provenance

---

# PART 1 — SCHOOL OF PHYSICS AND ASTRONOMY

Catalogue source: `https://www.birmingham.ac.uk/study/undergraduate/subjects/physics-and-astronomy-courses`

> Note: that listing also cross-lists **Natural Sciences BSc (YFC0)** and **Natural Sciences MSci (YCF1)** as "Associated Programmes", but both are hosted under the Geology and Earth Sciences subject area, not Physics. Out of scope; not researched.

## 1. Physics BSc

1. **Physics BSc**
2. **F300**
3. BSc — "Bachelor of Science"
4. 3 years
5. **`A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)`** — verbatim
6. A-level Mathematics and A-level Physics
7. Under the three-A-level route Maths and Physics must be at **A\*A**; under the four-A-level route they may be **AA**
8. **Not mentioned** on this page
9. Maths **required**; Physics **required**; Chemistry **not mentioned**
10. Excluded: "General Studies not accepted". No alternative science subjects published
11. NOT PUBLISHED (low confidence — see caveat B)
12. NOT PUBLISHED (low confidence — see caveat B)
13. **Not stated anywhere on the page.** No admissions-test wording of any kind was present. Per brief: recorded as *not stated*, NOT as "no admissions test"
14. **Not stated.** No interview wording present
15. Two separate schemes, recorded under Birmingham's own headings:
    - **Pathways to Birmingham:** `AAC to include Maths and Physics grades AA`
    - **Contextual Offer:** `A*AB to include Maths and Physics grades A*A`
16. **EPQ:** "one grade lower plus a grade B in the EPQ" · **Music performance:** "one grade lower plus the Music qualification" · **High-level sports:** "one grade lower"
17. "To be confirmed" — no 2027 deadline published
18. `"A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)"`
19. No named post-admission specialism published. Optional modules vary by year
20. `https://www.birmingham.ac.uk/study/undergraduate/subjects/physics-and-astronomy-courses/physics-bsc` · Title: "Physics BSc - University of Birmingham" · Panel showing **2027**

## 2. Physics MSci

1. **Physics MSci**
2. **F302**
3. MSci — "Master in Science"
4. 4 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)`** — verbatim (note the space before `/AAAA` as printed)
6. A-level Mathematics and A-level Physics
7. "Number of A-levels required: 3, to include A*AA: A-level Mathematics A*, A-level Physics A; or AAAA: A-level Mathematics A, A-level Physics A"
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry **not mentioned**
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated.** Recorded as *not stated*, not "none"
14. **Not stated**
15. - **Pathways to Birmingham:** `A*AC to include A-level in Maths and Physics grades A*A`
    - **Contextual Offer:** `A*AB to include A-level Maths and Physics grades A*A`
16. **EPQ:** "one grade lower plus a grade B in the EPQ" · **Music:** "one grade lower plus the Music qualification" · **Sports:** "one grade lower"
17. "To be confirmed"
18. `"A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)"`
19. No named post-admission specialism published
20. `.../physics-and-astronomy-courses/physics-msci` · Title: "Physics MSci - University of Birmingham" · Panel showing **2027**

> **Note the BSc/MSci divergence in the reduced offers:** Physics BSc Pathways is `AAC`, Physics MSci Pathways is `A*AC`. The Contextual Offer is `A*AB` for both.

## 3. Physics (International Study) BSc

1. **Physics (International Study) BSc**
2. **F301**
3. BSc
4. 4 years (3-year BSc + International Year)
5. **`A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)`**
6. A-level Mathematics and A-level Physics
7. As above — `A*A` on three A-levels, `AA` on four
8. NOT PUBLISHED
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. **PUBLISHED — and unique among the Physics courses:** "GCSE Grade 6 in relevant language to study abroad at a non-English speaking university"
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `AAC to include Maths and Physics grades AA`
    - **Contextual Offer:** `A*AB to include Maths and Physics grades A*A`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower plus the music qualification · **Sports (county level+):** one grade lower
17. "To be confirmed"
18. `"GCSE Grade 6 in relevant language to study abroad at a non-English speaking university"`
19. **International Year (Year 3) — inside this UCAS code.** Verbatim: "This is your international study year, and your modules will depend upon your chosen university. Your programme of study will be devised through liaison with the academic tutors at Birmingham and those at your host institution." Host university chosen during the degree. URL as field 20
20. `.../physics-and-astronomy-courses/physics-international-bsc` · Panel showing **2027**

## 4. Physics (International Study) MSci

1. **Physics (International Study) MSci**
2. **F303**
3. MSci — "Master in Science"
4. 4 years
5. **`A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)`**
6. A-level Mathematics and A-level Physics
7. `A*A` on the three-A-level route; `AA` within the four-A-level route
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence) — note this page did **not** repeat the GCSE language requirement that the BSc sibling publishes. Not inferred across.
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*AC to include A-level in Maths and Physics grades A*A`
    - **Contextual Offer:** `A*AB to include A-level Maths and Physics grades A*A`
16. EPQ one grade lower plus grade B in EPQ · Music performance one grade lower plus music qualification · High-level sports one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Year 3: International Year. This is your international study year, and your modules will depend upon your chosen university."`
19. **International Year (Year 3)** within this UCAS code — "your modules will depend upon your chosen university. Your programme of study will be devised through liaison with the academic tutors at Birmingham and those at your host institution"
20. `.../physics-and-astronomy-courses/physics-international-msci` · Panel showing **2027**

## 5. Physics and Astrophysics BSc

1. **Physics and Astrophysics BSc**
2. **FF35**
3. BSc
4. 3 years
5. **`A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)`**
6. A-level Mathematics and A-level Physics
7. "Number of A-levels required: 3, to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)"
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `AAC to include Maths and Physics grades AA.`
    - **Contextual Offer:** `A*AB to include Maths and Physics grades A*A.`
16. **EPQ (verbatim):** "Applicants who take the EPQ ... will be made ... an alternative offer which will be one grade lower plus a grade B in the EPQ." · **Music performance:** "...alternative offer which will be one grade lower plus the Music qualification." · **High-level sports:** "...alternative offer which will be one grade lower."
17. "TBC" / to be confirmed
18. `"Number of A-levels required: 3, to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer). General Studies not accepted."`
19. No named post-admission specialism published on this page
20. `.../physics-and-astronomy-courses/physics-astrophysics-bsc` · Title: "Physics and Astrophysics BSc - University of Birmingham" · Panel showing **2027** (selector offers 2027 and 2026)

## 6. Physics and Astrophysics MSci

1. **Physics and Astrophysics MSci**
2. **FFH5**
3. MSci — "Master in Science"
4. 4 years
5. **`A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)`**
6. A-level Mathematics and A-level Physics
7. Three A-levels: Maths `A*` and Physics `A` on the `A*AA` route; Maths `A` and Physics `A` on the `AAAA` route
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*AC to include A-level in Maths and Physics grades A*A`
    - **Contextual Offer:** `A*AB to include A-level Maths and Physics grades A*A`
16. **EPQ:** "one grade lower plus a grade B in the EPQ" · **Music:** "one grade lower plus the Music qualification" · **Sport:** "one grade lower"
17. "To be confirmed"
18. `"A*AA/AAAA to include A-level Mathematics and Physics grades A*A (or AA as part of the four A level offer)"`
19. No named post-admission specialism published; no year-abroad option stated for this variant
20. `.../physics-and-astronomy-courses/physics-astrophysics-msci` · Panel showing **2027**

## 7. Physics and Astrophysics (International Study) BSc

1. **Physics and Astrophysics (International Study) BSc**
2. **FF3M**
3. BSc
4. 4 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A`**
6. A-level Mathematics and A-level Physics
7. "3, to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)"
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: General Studies not accepted
11. NOT PUBLISHED (low confidence)
12. **PUBLISHED:** "GCSE Grade 6 in relevant language to study abroad at a non-English speaking university"
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `AAC to include Maths and Physics grades AA.`
    - **Contextual Offer:** `A*AB to include Maths and Physics grades A*A.`
16. **EPQ:** "one grade lower plus a grade B in the EPQ"
17. "Application deadline for September 2027 entry to be confirmed."
18. `"Spend your third year studying physics at an international university, immerse yourself in another culture and build language skills for working abroad."`
19. **Third year abroad** inside this UCAS code — "Spend your third year studying physics at an international university, immerse yourself in another culture and build language skills for working abroad." Host institution chosen during the degree
20. `.../physics-and-astronomy-courses/physics-astrophysics-international-bsc` · Panel confirmed **2027** on re-fetch (initially mis-read as 2026 — see caveat A)

> **There is no MSci counterpart to this course.** See SUMMARY.

## 8. Physics with Particle Physics and Cosmology BSc

1. **Physics with Particle Physics and Cosmology BSc**
2. **F372**
3. BSc
4. 3 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer).`**
6. A-level Mathematics and A-level Physics
7. Maths and Physics at `A*A`, or `AA` as part of a four-A-level offer
8. NOT PUBLISHED
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `AAC to include Maths and Physics grades AA.`
    - **Contextual Offer:** `A*AB to include Maths and Physics grades A*A.`
16. **EPQ (verbatim):** "Applicants who take the EPQ and meet our offer criteria will be made the typical offer for their programme of choice, plus an alternative offer which will be one grade lower plus a grade B in the EPQ."
17. "Application deadline for September 2027 entry to be confirmed." — the `14 January 2026` date on this page belongs to the **2026** panel and is NOT recorded as a 2027 deadline
18. `"A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)."`
19. No named post-admission pathway system published
20. `.../physics-and-astronomy-courses/physics-particle-physics-cosmology-bsc` · Panel confirmed **2027** on re-fetch, module heading "2027/28" (caveat A)

## 9. Physics with Particle Physics and Cosmology MSci

1. **Physics with Particle Physics and Cosmology MSci**
2. **F373**
3. MSci — "Master in Science"
4. 4 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)`**
6. A-level Mathematics and A-level Physics
7. `A*AA`: Maths `A*`, Physics `A` · `AAAA`: Maths `A`, Physics `A`
8. NOT PUBLISHED
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: General Studies not accepted
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*AC to include A-level in Maths and Physics grades A*A`
    - **Contextual Offer:** `A*AB to include A-level Maths and Physics grades A*A`
16. **EPQ (verbatim):** "Applicants who take the EPQ and meet our offer criteria will be made the typical offer for their programme of choice, plus an alternative offer which will be one grade lower plus a grade B in the EPQ."
17. "Application deadline for September 2027 entry to be confirmed."
18. `"A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)"`
19. Optional modules across disciplines; no named specialism published
20. `.../physics-and-astronomy-courses/physics-particle-physics-cosmology-msci` · Panel confirmed **2027** on re-fetch (caveat A)

## 10. Physics with Data Science BSc

1. **Physics with Data Science BSc**
2. **FG13**
3. BSc
4. 3 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer).`**
6. A-level Mathematics and A-level Physics
7. `A*AA`: Maths `A*`, Physics `A` · `AAAA`: Maths `A`, Physics `A`
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. **Note the unusual shape — an A\* in Maths is demanded even in the widening-participation offer:**
    - **Pathways to Birmingham:** `A*BC to include A* in Maths and B in Physics`
    - **Contextual Offer:** `A*AB to include A* in Maths and A in Physics`
16. **EPQ:** typical offer plus an alternative one grade lower plus grade B in the EPQ
17. "Application deadline for September 2027 entry to be confirmed."
18. `"A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)."`
19. Optional modules spanning Physics and Computer Science; specialised labs in computing, nuclear, photonics and condensed matter. No separately-named admission pathway
20. `.../physics-and-astronomy-courses/physics-data-science-bsc` · Panel confirmed **2027** on re-fetch (caveat A)

## 11. Physics with Data Science MSci

1. **Physics with Data Science MSci**
2. **FG14**
3. MSci — "Master in Science"
4. 4 years
5. **`A*A*A or A*AAA`** — verbatim. **This is NOT the `A*AA/AAAA` used by most Physics MSci courses.** Three published routes:
   - `A*A*A` with `A*` Maths, `A*` Physics
   - `A*A*A` with `A*` Maths + `A*/A` Physics + `A*/A` Further Maths
   - `A*AAA` with `A*` Maths and `A` Physics
6. A-level Mathematics and A-level Physics; Further Mathematics may form the third named subject
7. `A*` in Mathematics is required on **every** published route
8. **Explicitly named as a route** — "`A*/A` Further Maths" as the third subject in the second route. One of only three Physics courses where Further Maths appears at all
9. Maths **required at A\* on all routes**; Physics **required**; Chemistry not mentioned
10. NOT PUBLISHED on this page
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*A*C to include A*A* in Maths and Physics; OR A*A*C including A* in Maths and A*C in Physics and Further Maths`
    - **Contextual Offer:** `A*A*B to include A*A* in Maths and Physics; OR A*A*B including A* in Maths and A*B in Physics and Further Maths`
16. **EPQ (verbatim):** "Applicants who take the EPQ and meet our offer criteria will be made the typical offer for their programme of choice, plus an alternative offer which will be one grade lower plus a grade B in the EPQ."
17. "Application deadline for September 2027 entry to be confirmed."
18. `"A*A*A or A*AAA"`
19. Module selection across physics disciplines; no formal named pathway published
20. `.../physics-and-astronomy-courses/physics-data-science-msci` · Panel confirmed **2027** on re-fetch (caveat A)

## 12. Physics with Medical Physics BSc

1. **Physics with Medical Physics BSc**
2. **F350**
3. BSc
4. 3 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)`**
6. A-level Mathematics and A-level Physics
7. "3, to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer). General Studies not accepted."
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `AAC to include Maths and Physics grades AA`
    - **Contextual Offer:** `A*AB to include Maths and Physics grades A*A`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower plus the music qualification · **Sport (county level or above):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"3, to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer). General Studies not accepted."`
19. Optional modules from Year 2 onwards; intercalated-year opportunities mentioned
20. `.../physics-and-astronomy-courses/physics-medical-physics-bsc` · Panel showing **2027**

## 13. Physics with Medical Physics MSci

1. **Physics with Medical Physics MSci**
2. **F351**
3. MSci — "Master in Science"
4. 4 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A`**
6. A-level Mathematics and A-level Physics
7. Three A-levels · `A*AA`: Maths `A*`, Physics `A` · `AAAA`: Maths `A`, Physics `A`
8. **Not stated**
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*AC to include A-level in Maths and Physics grades A*A`
    - **Contextual Offer:** `A*AB to include A-level Maths and Physics grades A*A`
16. **EPQ (verbatim):** "Applicants who take the EPQ and meet our offer criteria will be made the typical offer for their programme of choice, plus an alternative offer which will be one grade lower plus a grade B in the EPQ."
17. "Application deadline for September 2027 entry to be confirmed."
18. `"A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A"`
19. Medical physics project work; placement referenced for MSci students
20. `.../physics-and-astronomy-courses/physics-medical-physics-msci` · Panel confirmed **2027** on re-fetch (caveat A)

## 14. Theoretical Physics BSc

1. **Theoretical Physics BSc**
2. **F342**
3. BSc
4. 3 years
5. **`A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer).`**
6. A-level Mathematics and A-level Physics
7. Maths `A*` and Physics `A` under the `A*AA` route; Maths `A`, Physics `A` under `AAAA`
8. NOT PUBLISHED
9. Maths **required**; Physics **required**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. **Note the shape — A\* in Maths demanded even in the widening-participation offer, with Physics dropping to B:**
    - **Pathways to Birmingham:** `A*BC to include A* in Maths and B in Physics`
    - **Contextual Offer:** `A*AB to include A* in Maths and A in Physics`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music performance (grade 8+):** one grade lower plus the qualification · **High-level sports:** one grade lower
17. "Application deadline for September 2027 entry to be confirmed."
18. `"A*AA /AAAA to include A-level Mathematics and A-level Physics grades A*A (or AA as part of the four A level offer)."`
19. **Lab Pathway vs Non-Lab Pathway — chosen in Year 1, inside this one UCAS code.** Lab Pathway: "Discover: Skills, Computing and Theoretical Physics A" (20 credits) + "Physics Laboratory 1" (20 credits). Non-Lab Pathway: "Foundations of Theoretical Physics" (20 credits), with optional modules "Discover: Skills, Computing and Data Science", "Discover: Skills, Computing and Astrophysics", "Discover: Skills, Computing and Particle Physics and Cosmology", or "Discover: Skills, Computing and Medical Physics" (20 credits each). URL as field 20
20. `.../physics-and-astronomy-courses/theoretical-physics-bsc` · Panel confirmed **2027** (selector 2027 / 2026)

## 15. Theoretical Physics MSci

1. **Theoretical Physics MSci**
2. **F343**
3. MSci — "Master in Science"
4. 4 years
5. **`A*A*A or A*AAA`** — verbatim. **Higher and differently shaped from the other Physics MSci courses.** Three published routes:
   - `A*A*A` with `A*` Maths, `A*` Physics
   - `A*A*A` with `A*` Maths + `A*/A` Physics + `A*/A` Further Maths
   - `A*AAA` with `A*` Maths and `A` Physics
6. A-level Mathematics and A-level Physics; Further Mathematics may serve as the third named subject
7. `A*` in Mathematics on **every** route
8. **Explicitly named as a route** — "`A*/A` Further Maths"
9. Maths **required at A\***; Physics **required**; Chemistry not mentioned
10. NOT PUBLISHED on this page
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*A*C to include A*A* in Maths and Physics OR A*A*C including A* in Maths and A*C in Physics & Further Maths`
    - **Contextual Offer:** `A*A*B to include A*A* in Maths and Physics OR A*A*B including A* in Maths and A*B in Physics & Further Maths`
16. **EPQ (verbatim):** "Applicants who take the EPQ and meet our offer criteria will be made the typical offer for their programme of choice, plus an alternative offer which will be one grade lower plus a grade B in the EPQ."
17. "Application deadline for September 2027 entry to be confirmed." — the `14 January 2026` visible on this page is the **2026** deadline and is NOT recorded for 2027
18. `"A*A*A or A*AAA"`
19. **Lab Pathway vs Non-Lab Pathway** options; optional modules across astrophysics, particle physics, medical physics and condensed matter
20. `.../physics-and-astronomy-courses/theoretical-physics-msci` · Panel confirmed **2027** on re-fetch, selector offers 2027 and 2026 (caveat A — first read returned the 2026 panel)

## 16. Theoretical Physics and Applied Mathematics BSc

1. **Theoretical Physics and Applied Mathematics BSc** (published as a **Joint Honours** degree)
2. **FG31**
3. BSc
4. 3 years
5. **`A*AA to include A-level Mathematics A* and A-level Physics A`** — verbatim. **No `/AAAA` four-A-level alternative is published**, unlike nearly every other Physics BSc
6. A-level Mathematics at `A*`, A-level Physics at `A`
7. Fixed subject grades: Maths must be `A*`, Physics must be `A`
8. **Not stated**
9. Maths **required at A\***; Physics **required at A**; Chemistry not mentioned
10. Excluded: "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*BC to include A* in Maths and B in Physics`
    - **Contextual Offer:** `A*AB to include A* in Maths and A in Physics`
16. EPQ, music performance and high-level sports routes all published, each a one-grade reduction under stated conditions
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3, to include A-level Mathematics A*, A-level Physics A. General Studies not accepted."`
19. Optional modules available; no named post-admission pathway published
20. `.../physics-and-astronomy-courses/theoretical-physics-applied-mathematics-bsc` · Panel showing **2027**

## 17. Theoretical Physics and Applied Mathematics MSci

1. **Theoretical Physics and Applied Mathematics MSci** (Joint Honours)
2. **F3DG**
3. MSci — "Master in Science"
4. 4 years
5. **`A*A*A or A*AAA`** — verbatim. Three published routes:
   - `A*A*A` with `A*` Maths, `A*` Physics
   - `A*A*A` with `A*` Maths + `A*/A` Physics + `A*/A` Further Maths
   - `A*AAA` with `A*` Maths and `A` Physics
6. A-level Mathematics and A-level Physics; Further Mathematics may be the third named subject
7. `A*` in Mathematics on every route
8. **Explicitly named as a route** — "`A*/A` Further Maths" listed as an acceptable third subject
9. Maths **required at A\***; Physics **required**; Chemistry not mentioned
10. NOT PUBLISHED on this page
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated**
14. **Not stated**
15. - **Pathways to Birmingham:** `A*A*C to include A*A* in Maths and Physics OR A*A*C including A* in Maths and A*C in Physics & Further Maths`
    - **Contextual Offer:** `A*A*B to include A*A* in Maths and Physics OR A*A*B including A* in Maths and A*B in Physics & Further Maths`
16. EPQ, music performance (grade 8+) and county-level+ sport each give a one-grade reduction
17. "To be confirmed"
18. `"A*A*A or A*AAA"`
19. Optional modules by year; intercalated years referenced
20. `.../physics-and-astronomy-courses/theoretical-physics-applied-mathematics-msci` · Panel showing **2027**

---

# PART 2 — GENERAL ENGINEERING (defer-the-choice degrees)

Catalogue source: `https://www.birmingham.ac.uk/study/undergraduate/subjects/engineering-courses`

> **Critical structural note:** this subject page lists ONLY the two general degrees below. It does NOT list Mechanical, Civil or EEE, even though those exist as separate direct-entry degrees with their own UCAS codes (Parts 3–6). Page wording: "We offer the flexibility for you to specialise. Whether you decide you want to shape the world as a civil engineer, tackle 21st century electronics or build the cars of the future, we have opportunities for you to explore."

## 18. Engineering BEng

1. **Engineering BEng**
2. **H236**
3. BEng — "Bachelor of Engineering"
4. **3/4 years** (range as printed — the 4 reflects an optional industrial year inside this UCAS code)
5. **`AAB to include A-level Mathematics`** — verbatim
6. "Number of A-levels required: 3, to include A-level Mathematics."
7. Only Mathematics is named. **No Physics requirement** — notable for an engineering degree
8. Not required as a subject, but **counts in the reduced offers**: both the Contextual and Pathways offers read "Maths **or Further Maths**"
9. Maths **required**; Physics **not required**; Chemistry **not mentioned**
10. NOT PUBLISHED on this page
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED — conditional test.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test." Named test: **Mathematics Aptitude test** (no modules published). Applies to applicants without A-level Mathematics, and to BTEC applicants
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. **EPQ:** "one grade lower plus a grade B in the EPQ" · **Music Performance:** "one grade lower plus the Music qualification" · **High-level Sports:** "one grade lower"
17. "To be confirmed"
18. `"AAB to include A-level Mathematics"`
19. **The defining feature of this UCAS code — discipline chosen AFTER Year 1.** First year shared across Civil, Mechanical and Electronic, Electrical and Systems Engineering; students then specialise into **Civil Engineering**, **Electronic and Electrical Engineering**, or **Mechanical Engineering**. Page wording: "designed for you to specialise later, ideal if you do not know which engineering discipline you want to focus on now". URL as field 20
20. `.../engineering-courses/engineering-beng` · Title: "Engineering BEng - University of Birmingham" · Panel showing **2027/28**

## 19. Engineering MEng

1. **Engineering MEng**
2. **H632**
3. MEng — "Master of Engineering"
4. **4/5 years** (range as printed)
5. **`AAA to include A-level Mathematics`** — verbatim
6. "Number of A-levels required: 3, to include A-level Mathematics."
7. Only Mathematics named; no Physics requirement
8. Not required as a subject; appears in both reduced offers as "Maths **or Further Maths**"
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. NOT PUBLISHED on this page
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED — conditional test.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test." Named test: **Mathematics Aptitude test**
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include A in Maths or Further Maths`
16. **EPQ:** "one grade lower plus a grade B in the EPQ" · **Music:** "one grade lower plus the Music qualification" · **Sport:** "one grade lower"
17. "Application deadline for September 2027 entry to be confirmed"
18. `"AAA to include A-level Mathematics"`
19. **Discipline chosen after Year 1**, within this UCAS code. Page wording: "Your first year is shared across the disciplines of Civil, Mechanical and Electronic, Electrical and Systems Engineering". Named exit routes: **Civil Engineering MEng**, **Electronic and Electrical Engineering MEng**, **Mechanical Engineering MEng**
20. `.../engineering-courses/engineering-meng` · Title: "Engineering MEng - University of Birmingham" · Panel showing **2027**

---

# PART 3 — MECHANICAL ENGINEERING

Catalogue source: `https://www.birmingham.ac.uk/study/undergraduate/subjects/mechanical-engineering-courses`
(That listing also contains six **Dubai** campus courses with no UCAS codes — excluded as out of UK scope.)

## 20. Mechanical Engineering BEng

1. **Mechanical Engineering BEng**
2. **H300**
3. BEng — "Bachelor of Engineering"
4. 3 years
5. **`AAB to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A-level Mathematics"
7. Only Mathematics required
8. **Explicitly addressed:** "Further Mathematics and Physics are not required but are advantageous". Also counts in reduced offers ("Maths or Further Maths")
9. Maths **required**; Physics **explicitly NOT required** ("not required but are advantageous"); Chemistry not mentioned
10. **Excluded:** "General Studies or Critical Thinking not accepted" — though good performance may be considered if offer conditions are marginally missed. No alternative science list published
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED — conditional test.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test". BTEC applicants must "successfully pass the Mathematics Aptitude test". Named test: **Mathematics Aptitude test**; modules NOT PUBLISHED
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music performance:** one grade lower plus the Music qualification · **High-level sports:** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Further Mathematics and Physics are not required but are advantageous"`
19. Within this UCAS code: "Opportunity to change from BEng to MEng and/or consider a year in industry"
20. `.../mechanical-engineering-courses/mechanical-engineering-beng` · Title: "Mechanical Engineering BEng - University of Birmingham" · Panel showing **2027**

## 21. Mechanical Engineering MEng

1. **Mechanical Engineering MEng**
2. **H301**
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A-level Mathematics"
7. Only Mathematics required
8. **"Further Mathematics and Physics are not required but are advantageous"**; counts in reduced offers
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. **Excluded:** General Studies and Critical Thinking not accepted as standalone A-levels
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test**, for applicants without A-level Mathematics and for BTEC candidates
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include A in Maths or Further Maths`
16. EPQ, music performance and high-level sports each a one-grade reduction under stated conditions
17. "Application deadline for September 2027 entry to be confirmed"
18. `"AAA to include A-level Mathematics"`
19. Industrial year and international study referenced as options, but not published as a formal post-admission choice on this page
20. `.../mechanical-engineering-courses/mechanical-engineering-meng` · Panel showing **2027**

## 22. Mechanical Engineering (Automotive) BEng

1. **Mechanical Engineering (Automotive) BEng**
2. **H302**
3. BEng
4. 3 years
5. **`AAB to include A-level Mathematics`**
6. Three A-levels to include A-level Mathematics
7. Only Mathematics required
8. **"Further Mathematics and Physics are not required but are advantageous."**
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. **Excluded:** General Studies or Critical Thinking not accepted
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test** — required where an alternative qualification to A-level Mathematics is held; BTEC applicants must "successfully pass the Mathematics Aptitude test"
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music performance (grade 8+):** one grade lower · **High-level sports (county+):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Further Mathematics and Physics are not required but are advantageous."`
19. Within this UCAS code: "change from BEng to MEng and/or consider a year in industry"
20. `.../mechanical-engineering-courses/mechanical-engineering-automotive-beng` · Panel showing **2027**

## 23. Mechanical Engineering (Automotive) MEng

1. **Mechanical Engineering (Automotive) MEng**
2. **H330** (note: not sequential with H302)
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. Three A-levels to include A-level Mathematics
7. Only Mathematics required
8. **"Further Mathematics and Physics are not required but are advantageous"**
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. **Excluded:** General Studies, Critical Thinking
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test**, for BTEC applicants or those without A-level Mathematics
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include A in Maths or Further Maths`
16. EPQ, music performance (grade 8+) and high-level sports (county+) each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"AAA to include A-level Mathematics"`
19. Year 1 shared across Mechanical, Civil and Electronic/Electrical/Systems Engineering; **automotive specialisation from Year 3**; Year 4 optional modules
20. `.../mechanical-engineering-courses/mechanical-engineering-automotive-meng` · Panel showing **2027**

## 24. Mechanical Engineering with Industrial Year BEng

1. **Mechanical Engineering with Industrial Year BEng**
2. **H304**
3. BEng
4. 4 years
5. **`AAB to include A-level Mathematics`**
6. A-level Mathematics required
7. Only Mathematics required
8. **"Further Mathematics and Physics are not required but are advantageous"**
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. **Excluded:** "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. **EPQ (verbatim):** "Applicants who take the EPQ and meet our offer criteria will be made the typical offer for their programme of choice, plus an alternative offer which will be one grade lower plus a grade B in the EPQ."
17. "Application deadline for September 2027 entry to be confirmed." — the `14 January 2026 ... Applications close at 18:00 GMT` text on this page is the **2026** deadline and is NOT recorded for 2027
18. `"Your industrial placement is paid work and gives you experience of working in a mechanical engineering field, enhancing your CV and allowing you to acquire further knowledge and employability skills."`
19. **Industrial year is built into this UCAS code** (it is what distinguishes H304 from H300): "Your industrial placement is paid work and gives you experience of working in a mechanical engineering field, enhancing your CV and allowing you to acquire further knowledge and employability skills."
20. `.../mechanical-engineering-courses/mechanical-engineering-industrial-beng` · Panel confirmed **2027** on re-fetch; selector offers 2027 and 2026 (caveat A — first read returned the 2026 panel)

## 25. Mechanical Engineering with Industrial Year MEng

1. **Mechanical Engineering with Industrial Year MEng**
2. **H303**
3. MEng — "Master of Engineering"
4. **5 years**
5. **`AAA to include A-level Mathematics`**
6. Three A-levels to include A-level Mathematics
7. Only Mathematics required
8. **"Further Mathematics and Physics are not required but are advantageous"**
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. **Excluded:** General Studies, Critical Thinking
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test** — for non-A-level Mathematics qualifications and BTEC candidates
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include A in Maths or Further Maths`
16. Music performance (grade 8+) and high-level sports (county+) one-grade reductions recorded; EPQ route also published across the school
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Your industrial placement is paid work and gives you experience of working in a mechanical engineering field, enhancing your CV and allowing you to acquire further knowledge and employability skills."`
19. **Industrial year built into this UCAS code** — see field 18
20. `.../mechanical-engineering-courses/mechanical-engineering-industrial-meng` · Panel showing **2027**

## 26. Mechanical Engineering with a Year Abroad MEng

1. **Mechanical Engineering with a Year Abroad MEng**
2. **H305**
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. Three A-levels to include A-level Mathematics
7. Only Mathematics required
8. **"Further Mathematics and Physics are not required but are advantageous"**
9. Maths **required**; Physics **not required**; Chemistry not mentioned
10. **Excluded:** General Studies and Critical Thinking
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence) — **no GCSE language requirement was published**, in contrast to the Physics International Study degrees. Not inferred across
13. **EXPLICITLY STATED:** **Mathematics Aptitude test**, applicable if an alternative qualification to A-level Mathematics is held
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include A in Maths or Further Maths`
16. EPQ, music and sport routes all published, each a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed"
18. `"You'll spend your third year at an overseas university. Your grades from that year will be transferred into your Birmingham degree."`
19. **Year abroad built into this UCAS code:** "You'll spend your third year at an overseas university. Your grades from that year will be transferred into your Birmingham degree." Note the grade-transfer rule — the year abroad counts toward the Birmingham classification
20. `.../mechanical-engineering-courses/mechanical-engineering-year-abroad-meng` · Panel showing **2027**

---

# PART 4 — CIVIL ENGINEERING

Catalogue source: `https://www.birmingham.ac.uk/study/undergraduate/subjects/civil-engineering-courses`
(That listing also cross-lists the general Engineering BEng/MEng and the Foundation Year.)

## 27. Civil Engineering BEng

1. **Civil Engineering BEng**
2. **H200**
3. BEng — "Bachelor of Engineering"
4. 3 years
5. **`AAB to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** in the requirements — but Further Maths appears in both reduced offers ("Maths or Further Maths")
9. Maths **required**; Physics **not required and not mentioned**; Chemistry not mentioned
10. **Excluded:** "General Studies or Critical Thinking not accepted". No alternative science list published
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test." Named test: **Mathematics Aptitude test**
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. EPQ, music and sport routes all published, each a one-grade reduction under stated conditions
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3, to include A level Mathematics."`
19. Optional modules listed, but no explicit post-admission selection point published
20. `.../civil-engineering-courses/civil-engineering-beng` · Title: "Civil Engineering BEng - University of Birmingham" · Panel showing **2027**

## 28. Civil Engineering MEng

1. **Civil Engineering MEng**
2. **H201**
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. "Number of A-levels required: 3. to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** in the requirements; appears in both reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** "General Studies or Critical Thinking" — though good performance may be considered if offer conditions are marginally missed
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. EPQ, music and sport routes published, each a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3. to include A level Mathematics."`
19. **Four named Year 4 pathways chosen within this single UCAS code:** Civil and Ground Engineering; Climate Resilience and Environmental Systems; Transport Infrastructure; Future Infrastructure. Chosen in **Year 4**
20. `.../civil-engineering-courses/civil-engineering-meng` · Panel showing **2027**

## 29. Civil Engineering with Industrial Experience MEng

1. **Civil Engineering with Industrial Experience MEng**
2. **H202**
3. MEng — "Master of Engineering"
4. **4 years** (note: the *Industrial Year* variant H204 is 5 years — these are different products, see structural note below)
5. **`AAA to include A-level Mathematics`**
6. "3. to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** as a requirement; appears in reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** General Studies or Critical Thinking not accepted
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test**, referenced for alternative qualifications
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. EPQ, music and sport routes published, each a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed"
18. `"During a 10-week industry placement, you'll learn from industry experts"`
19. **A 10-week placement, NOT a full year** — "During a 10-week industry placement, you'll learn from industry experts". This is why the degree stays 4 years
20. `.../civil-engineering-courses/civil-engineering-industrial-experience-meng` · Panel showing **2027**

> **Structural warning:** Civil Engineering publishes **two separate industrial UCAS codes** that sound almost identical but differ materially. **H202 "with Industrial Experience"** = a **10-week** placement, **4 years** total. **H204 "with Industrial Year"** = a **full year** in industry, **5 years** total. Do not conflate or deduplicate these.

## 30. Civil Engineering with Industrial Year MEng

1. **Civil Engineering with Industrial Year MEng**
2. **H204**
3. MEng — "Master of Engineering"
4. **5 years**
5. **`AAA to include A-level Mathematics`**
6. Three A-levels to include A level Mathematics
7. Only Mathematics required
8. **Not stated** as a requirement; appears in reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** "General Studies or Critical Thinking not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. EPQ, music performance (grade 8+) and county-level sports each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"You'll have the option to undertake a full year in industry, applying your academic knowledge in the real-world."`
19. **Full year in industry** — and note the page presents it as an **option** even though it is a distinct UCAS code: "You'll have the option to undertake a full year in industry, applying your academic knowledge in the real-world."
20. `.../civil-engineering-courses/civil-engineering-industrial-year-meng` · Panel showing **2027**; selector 2027 / 2026

## 31. Civil Engineering with International Study MEng

1. **Civil Engineering with International Study MEng**
2. **H203**
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. "Number of A-levels required: 3. to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** as a requirement; appears in reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** "General Studies or Critical Thinking not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence) — no GCSE language requirement published
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. EPQ, music and sport routes published; each a one-grade reduction if Birmingham is the firm choice
17. "Application deadline for September 2027 entry to be confirmed."
18. `"Advance your expertise in structural engineering, geotechnical engineering, water engineering and materials engineering through a year of study abroad."`
19. **Year of study abroad** inside this UCAS code — "Advance your expertise in structural engineering, geotechnical engineering, water engineering and materials engineering through a year of study abroad."
20. `.../civil-engineering-courses/civil-engineering-international-meng` · Panel showing **2027**; selector 2027 / 2026

---

# PART 5 — ELECTRONIC, ELECTRICAL AND SYSTEMS ENGINEERING

Catalogue source: `https://www.birmingham.ac.uk/study/undergraduate/subjects/electronic-electrical-and-systems-engineering-courses`
(That listing also cross-lists the general Engineering BEng/MEng and four **Dubai** courses — Dubai excluded as out of UK scope.)

## 32. Computer Engineering BSc

1. **Computer Engineering BSc**
2. **HH64**
3. **BSc** — "Bachelor of Science" (note: a **BSc**, not a BEng, despite sitting in an engineering school)
4. 3 years
5. **`AAB. To include A-level Mathematics.`** — verbatim, printed with a full stop after `AAB`
6. "Number of A-levels required: 3, to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** as a requirement — mentioned only in a BTEC context. Appears in both reduced offers ("Maths or Further Maths")
9. Maths **required**; Physics **not required and not mentioned**; Chemistry not mentioned
10. **Excluded:** General Studies "not normally accepted as one of the three A levels", though good performance may be considered if the offer is marginally missed
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. EPQ, music performance (grade 8+) and county-level+ sport each qualify for a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed."
18. `"Number of A-levels required: 3, to include A level Mathematics."`
19. No named post-admission specialisation. Core modules mandatory in Years 1–2; Year 3 optional modules include Machine Learning, Neural Networks, Computer Vision
20. `.../electronic-electrical-and-systems-engineering-courses/computer-engineering-bsc` · Panel showing **2027**

## 33. Electronic and Electrical Engineering BEng

1. **Electronic and Electrical Engineering BEng**
2. **H600**
3. BEng — "Bachelor of Engineering"
4. 3 years
5. **`AAB to include A-level Mathematics`**
6. Three A-levels including A-level Mathematics
7. Only Mathematics required
8. **Not stated** as a requirement; appears in both reduced offers
9. Maths **required**; Physics **not required and not mentioned**; Chemistry not mentioned
10. **Excluded:** General Studies typically not accepted as one of the three A-levels
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test** — required for BTEC applicants and those without A-level Mathematics
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower plus Music qualification · **Sport (county level+):** one grade lower
17. "To be confirmed"
18. `"AAB to include A-level Mathematics"`
19. Specialisation within electronic/electrical engineering from **Year 2**, inside this UCAS code
20. `.../electronic-electrical-and-systems-engineering-courses/electronic-electrical-engineering-beng` · Panel showing **2027**

## 34. Electronic and Electrical Engineering MEng

1. **Electronic and Electrical Engineering MEng**
2. **H605**
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. Three A-levels, to include A level Mathematics
7. Only Mathematics required
8. **Not stated** as a requirement; appears in both reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded (verbatim):** "General Studies not normally accepted as one of the three A levels, but a good performance may be taken into account if you fail to meet the conditions of an offer marginally."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test** — for applicants with an alternative qualification to A-level Mathematics, and BTEC applicants
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. **EPQ:** one grade lower plus grade B · **Music performance:** one grade lower · **High-level sports:** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"General Studies not normally accepted as one of the three A levels, but a good performance may be taken into account if you fail to meet the conditions of an offer marginally."`
19. **Three named Year 4 themes chosen within this UCAS code:** Communications Engineering, Computer Engineering, or Power Systems. Chosen in **Year 4**
20. `.../electronic-electrical-and-systems-engineering-courses/electronic-electrical-engineering-meng` · Panel showing **2027**

## 35. Electronic and Electrical Engineering with Industrial Year BEng

1. **Electronic and Electrical Engineering with Industrial Year BEng**
2. **H606**
3. BEng — "Bachelor of Engineering"
4. 4 years
5. **`AAB to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** — neither required nor named as an alternative in the subject requirements; appears in the reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** "General Studies not normally accepted as one of the three A levels"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. EPQ, music performance (grade 8+) and high-level sports (county level+) each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Taking a break from the standard programme, you'll spend your industrial year gaining experience of how engineering theory is put into practice in industry."`
19. **Industrial year built into this UCAS code** — see field 18
20. `.../electronic-electrical-and-systems-engineering-courses/electronic-electrical-engineering-industrial-beng` · Panel showing **2027**; selector 2027 / 2026

## 36. Electronic and Electrical Engineering with Industrial Year MEng

1. **Electronic and Electrical Engineering with Industrial Year MEng**
2. **H607**
3. MEng — "Master of Engineering"
4. **5 years**
5. **`AAA to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A level Mathematics."
7. Only Mathematics required
8. **Not stated** as a requirement; appears in reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** General Studies not normally accepted as one of the three A-levels
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. EPQ, music performance and high-level sports each a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Taking a break from the standard programme, you'll spend your industrial year gaining experience of how engineering theory is put into practice in industry."`
19. **Industrial year built into this UCAS code** — see field 18
20. `.../electronic-electrical-and-systems-engineering-courses/electronic-electrical-engineering-industrial-meng` · Panel showing **2027**; selector 2027 / 2026

## 37. Mechatronic and Robotic Engineering BEng

1. **Mechatronic and Robotic Engineering BEng** (this is the nearest thing Birmingham offers to "Mechatronic Engineering")
2. **H6H3**
3. BEng — "Bachelor of Engineering"
4. 3 years
5. **`AAB to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A level Mathematics."
7. Only Mathematics required
8. **Not mentioned** in the entry requirements; appears in both reduced offers
9. Maths **required**; Physics **not required and not mentioned**; Chemistry not mentioned
10. **Excluded:** General Studies "not normally accepted as one of the three A levels"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. EPQ, music and sport routes all published; each reduces the standard offer by one grade when Birmingham is the firm choice
17. "Application deadline for September 2027 entry to be confirmed."
18. `"Number of A-levels required: 3, to include A level Mathematics."`
19. Shared first year across Civil, Mechanical and Electrical Engineering disciplines, with specialisation thereafter
20. `.../electronic-electrical-and-systems-engineering-courses/mechatronic-robotic-engineering-beng` · Panel showing **2027**

## 38. Mechatronic and Robotic Engineering MEng

1. **Mechatronic and Robotic Engineering MEng**
2. **HH63**
3. MEng — "Master of Engineering"
4. 4 years
5. **`AAA to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A level Mathematics."
7. Only Mathematics required
8. **Not stated**; appears in both reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. NOT PUBLISHED on this page
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A Maths or Further Maths` (transcribed as printed — the wording omits "in")
16. **EPQ:** one grade lower plus grade B in EPQ · **Music (grade 8+):** one grade lower plus music qualification · **Sport (county level or above):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3, to include A level Mathematics."`
19. No named post-admission pathway. Year 3 optional modules include "Telerobotics, Telepresence and Augmented Reality" and "The Internet of Things"; Year 4 options "Computer and Communication Networks" or "Small Embedded Systems"
20. `.../electronic-electrical-and-systems-engineering-courses/mechatronic-robotic-engineering-meng` · Panel showing **2027**

## 39. Mechatronic and Robotic Engineering with Industrial Year BEng

1. **Mechatronic and Robotic Engineering with Industrial Year BEng**
2. **H64I** — note the final character is a capital letter **I**, not the digit 1
3. BEng — "Bachelor of Engineering"
4. 4 years
5. **`AAB to include A-level Mathematics`**
6. "Number of A-levels required: 3, to include A level Mathematics"
7. Only Mathematics required
8. **Not stated** — mentioned only for BTEC combinations; appears in both reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** "General Studies not normally accepted as one of the three A levels"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED.** Verbatim: "If you have an alternative qualification to A-level mathematics the Admissions Tutor may wish to assess your mathematical ability during the application process. This will be via a Mathematics Aptitude test."
14. **Not stated**
15. - **Contextual Offer:** `ABB to include Maths or Further Maths`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths`
16. EPQ, music performance and high-level sports each a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Taking a break from the standard programme, you'll spend your industrial year gaining experience of how engineering theory is put into practice in industry."`
19. **Industrial year built into this UCAS code** — see field 18
20. `.../electronic-electrical-and-systems-engineering-courses/mechatronic-robotic-engineering-industrial-beng` · Panel showing **2027**; selector 2027 / 2026

## 40. Mechatronic and Robotic Engineering with Industrial Year MEng

1. **Mechatronic and Robotic Engineering with Industrial Year MEng**
2. **H65I** — final character is a capital letter **I**, not the digit 1
3. MEng — "Master of Engineering"
4. **5 years**
5. **`AAA to include A-level Mathematics`**
6. "3, to include A level Mathematics"
7. Only Mathematics required
8. **Not stated**; appears in both reduced offers
9. Maths **required**; Physics **not mentioned**; Chemistry not mentioned
10. **Excluded:** General Studies not normally accepted as one of three A-levels
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **EXPLICITLY STATED:** **Mathematics Aptitude test** — for those without A-level Mathematics or BTEC applicants
14. **Not stated**
15. - **Contextual Offer:** `AAB to include an A in Maths or Further Maths`
    - **Pathways to Birmingham:** `ABB to include an A in Maths or Further Maths`
16. EPQ, music performance (grade 8+) and high-level sports (county level+) each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Taking a break from the standard programme, you'll spend your industrial year gaining experience of how engineering theory is put into practice in industry."`
19. **Industrial year built into this UCAS code** — see field 18
20. `.../electronic-electrical-and-systems-engineering-courses/mechatronic-robotic-engineering-industrial-meng` · Panel showing **2027**; selector 2027 / 2026

---

# PART 6 — MATERIALS SCIENCE AND ENGINEERING, AND AEROSPACE ENGINEERING
### (School of Metallurgy and Materials)

Catalogue sources:
`https://www.birmingham.ac.uk/study/undergraduate/subjects/materials-science-and-engineering-courses`
`https://www.birmingham.ac.uk/study/undergraduate/subjects/aerospace-engineering-courses`

> **Note:** Aerospace Engineering is hosted by the School of Metallurgy and Materials and is cross-listed on the Materials subject page. **Neither Aerospace nor Materials publishes any admissions-test wording** — unlike the School of Engineering subjects in Parts 2–5. Recorded per course, never inferred across.

## 41. Aerospace Engineering BEng

1. **Aerospace Engineering BEng**
2. **H400**
3. BEng — "Bachelor of Engineering" (Single honours)
4. 3 years
5. **`AAB to include A-level Mathematics and Physics or Chemistry or Further Maths or Computer Science`** — verbatim
6. A-level Mathematics **plus one of** Physics, Chemistry, Further Maths or Computer Science
7. **A genuine "one of X/Y/Z" rule:** Mathematics is compulsory; the second subject may be **any one of** Physics, Chemistry, Further Maths or Computer Science. **Physics is therefore NOT individually required** on this course
8. **Counted as a qualifying second subject** — "Further Maths" is listed as an accepted alternative to Physics/Chemistry/Computer Science. It is *not* treated merely as a second maths
9. Maths **required**; Physics **optional (one of four alternatives)**; Chemistry **optional (one of four alternatives)**
10. **Accepted alternatives:** Physics, Chemistry, Computer Science (and Further Maths). **Excluded:** "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page.** No Mathematics Aptitude test clause appears here, unlike the School of Engineering courses. Recorded as *not stated*, NOT as "no admissions test"
14. **Not stated**
15. Note the reduced offers **narrow** the second-subject list to Physics or Chemistry only — Computer Science drops out:
    - **Contextual Offer:** `ABB to include Maths or Further Maths and either Physics or Chemistry`
    - **Pathways to Birmingham:** `BBB to include B Maths or Further Maths and B in either Physics or Chemistry`
16. EPQ, music performance and high-level sports alternative offers, each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3. A-level Mathematics and Physics or Chemistry or Further Maths or Computer Science. General Studies not accepted."`
19. Terrestrial and space flight options; optional modules include battery technology, high-performance materials and electric propulsion
20. `.../aerospace-engineering-courses/aerospace-engineering-beng` · Title: "Aerospace Engineering BEng - University of Birmingham" · Panel showing **2027**

## 42. Aerospace Engineering MEng

1. **Aerospace Engineering MEng**
2. **H402**
3. MEng — "Master of Engineering" (Single honours, Integrated Masters)
4. 4 years
5. **`AAA to include A-level Mathematics and Physics or Chemistry or Further Maths or Computer Science`** — verbatim
6. A-level Mathematics **plus one of** Physics, Chemistry, Further Maths or Computer Science
7. "One of" rule as above; Physics not individually required
8. **Counted as a qualifying second subject** ("Further Maths" listed among the alternatives); no standalone Further Maths requirement
9. Maths **required**; Physics **optional (one of four)**; Chemistry **optional (one of four)**
10. **Accepted alternatives:** Physics, Chemistry, Computer Science (and Further Maths). **Excluded:** "General Studies not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page** — recorded as *not stated*, not "none"
14. **Not stated**
15. - **Contextual Offer:** `AAB to include Maths or Further Maths and either Physics or Chemistry`
    - **Pathways to Birmingham:** `ABB to include B in Maths or Further Maths and B in either Physics or Chemistry`
16. EPQ, music performance (grade 8+) and high-level sports each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3. A-level Mathematics and Physics or Chemistry or Further Maths or Computer Science. General Studies not accepted."`
19. Terrestrial and space flight pathways; materials for aerospace; optional modules across Years 3–4
20. `.../aerospace-engineering-courses/aerospace-engineering-meng` · Panel showing **2027**

## 43. Materials Science and Engineering BEng

1. **Materials Science and Engineering BEng**
2. **J5F2**
3. BEng — "Bachelor of Engineering" (Single honours)
4. 3 years
5. **`AAB to include A-level Maths and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology`** — verbatim. Note the page writes "**Maths**", not "Mathematics", in the offer string
6. A-level Mathematics **plus one of six** named subjects
7. **The widest cross-subject rule of any course in this dataset** — the second subject may be any one of: Further Maths, Computer Science, Biology, Physics, Chemistry, Design Technology. **Neither Physics nor Chemistry is individually required**
8. **Counted as a qualifying second subject** — "Further Maths" heads the list of six alternatives
9. Maths **required**; Physics **optional (one of six)**; Chemistry **optional (one of six)**
10. **Accepted alternatives:** Computer Science, Biology, Physics, Chemistry, Design Technology (plus Further Maths). **Excluded:** General Studies — though "a good performance may be taken into account"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page** — recorded as *not stated*
14. **Not stated**
15. Note the reduced offers **narrow** the six-subject list to Physics, Chemistry or Design & Technology — Biology and Computer Science drop out:
    - **Contextual Offer:** `ABB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology`
    - **Pathways to Birmingham:** `BBB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology`
16. EPQ, music performance and high-level sports alternative offers, each one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3, to include A-level Mathematics and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology."`
19. Year 3 optional modules include Advanced Electronic Materials, Biomaterials, Battery Technology and Manufacturing, Materials Modelling, Materials for Sustainable Environment Technology. **Biomaterials exists only as a module here, not as a degree**
20. `.../materials-science-and-engineering-courses/materials-science-and-engineering-beng` · Panel showing **2027**

## 44. Materials Science and Engineering MEng

1. **Materials Science and Engineering MEng**
2. **F2H1** (note: shares no prefix with the BEng code J5F2)
3. MEng — "Master of Engineering" (Single honours, Integrated Masters)
4. 4 years
5. **`AAA to include A-level Maths and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology`** — verbatim
6. A-level Mathematics plus one of six named subjects
7. Six-way "one of" rule as above; neither Physics nor Chemistry individually required
8. **Counted as a qualifying second subject** ("Further Maths" listed in the offer requirements)
9. Maths **required**; Physics **optional (one of six)**; Chemistry **optional (one of six)**
10. **Accepted alternatives:** Computer Science, Biology, Physics, Chemistry, Design Technology (plus Further Maths). **Excluded:** General Studies (noted as potentially considered)
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology`
    - **Pathways to Birmingham:** `ABB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower with grade 8+ qualification · **Sports (county level+):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3, to include A-level Mathematics and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology."`
19. NOT PUBLISHED as a named post-admission pathway on this page
20. `.../materials-science-and-engineering-courses/materials-science-and-engineering-meng` · Panel showing **2027**

## 45. Materials Science and Engineering with Industrial Experience MEng

1. **Materials Science and Engineering with Industrial Experience MEng**
2. **J200**
3. MEng — "Master of Engineering" (Single honours, Integrated Masters, Integrated year in industry)
4. **5 years**
5. **`AAA to include A-level Maths and one of Further Maths or Computer Science or Biology or Physics or Chemistry or Design Technology`** — verbatim
6. A-level Mathematics plus one of six named subjects
7. Six-way "one of" rule; neither Physics nor Chemistry individually required
8. **Counted as a qualifying second subject** — "Further Maths" listed as one acceptable alternative alongside Computer Science, Biology, Physics, Chemistry or Design Technology
9. Maths **required**; Physics **optional (one of six)**; Chemistry **optional (one of six)**
10. **Accepted alternatives:** Computer Science, Biology, Physics, Chemistry, Design Technology. **Excluded:** General Studies — "a good performance may be taken into account if you fail to meet the conditions of the offer"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology`
    - **Pathways to Birmingham:** `ABB to include Maths or Further Maths and one from Physics, Chemistry or Design & Technology`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower plus music qualification at grade 8 or above · **Sport (county level or above):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"The industrial experience takes the form of an entire year in industry. You'll be helped by the University to find suitable internships, and assisted and mentored by academic members of staff throughout your year in industry."`
19. **A full year in industry is built into this UCAS code** — see field 18. Note this contrasts with Civil's H202 "Industrial Experience", which is only 10 weeks: the same phrase means different things in different Birmingham schools
20. `.../materials-science-and-engineering-courses/materials-science-engineering-industrial-experience-meng` · Panel showing **2027**

---

# PART 7 — CHEMICAL ENGINEERING AND ENERGY ENGINEERING
### (School of Chemical Engineering)

Catalogue source: `https://www.birmingham.ac.uk/study/undergraduate/subjects/chemical-engineering-courses`

> **Note:** no Chemical Engineering or Energy Engineering page published any admissions-test wording. Recorded per course as *not stated*.
> **Note:** this school is the only one to exclude **Use of Maths** A-level, and the only one whose Contextual Offer for MEng courses is `AAA`.

## 46. Chemical Engineering BEng

1. **Chemical Engineering BEng**
2. **H800**
3. BEng — "Bachelor of Engineering"
4. 3 years
5. **`AAA to include A level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics **and** one of Chemistry **or** Physics
7. Mathematics compulsory; the second subject must be **either Chemistry or Physics** (a two-way choice, narrower than Aerospace's four-way or Materials' six-way)
8. **Not stated** — and notably **Further Maths does NOT appear in the reduced offers either** for this school, unlike the School of Engineering courses
9. Maths **required**; Physics **accepted as the second subject**; Chemistry **accepted as the second subject** — one of the two is required
10. **Accepted alternatives:** Chemistry or Physics for the second subject. **Excluded (verbatim):** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted." Separately, a **STEP paper at grade 2** was listed among accepted qualifications
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page** — recorded as *not stated*, NOT as "no admissions test". (Note: the STEP paper reference appears as an accepted *qualification*, not as a required admissions test)
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths and A in either Chemistry or Physics`
    - **Pathways to Birmingham:** `ABB to include A in Maths and either Chemistry or Physics`
16. **EPQ:** one grade lower plus grade B · **Music performance:** one grade lower · **High-level sports:** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3. A level Mathematics and Chemistry or Physics. General Studies, Critical Thinking and Use of Maths A Levels are not accepted."`
19. NOT PUBLISHED as a named post-admission pathway on this page
20. `.../chemical-engineering-courses/chemical-engineering-beng` · Title: "Chemical Engineering BEng - University of Birmingham" · Panel showing **2027**

## 47. Chemical Engineering MEng

1. **Chemical Engineering MEng**
2. **H810**
3. MEng — "Master of Engineering"
4. 4 years
5. **`A*AA/AAAA to include A level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics **and** one of Chemistry **or** Physics
7. Mathematics compulsory; second subject Chemistry or Physics
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one of the two **required**
10. **Excluded (verbatim):** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. **Note the unusually shallow contextual reduction — `AAA` is only one grade below the standard `A*AA`, and is identical to the BEng's standard offer:**
    - **Contextual Offer:** `AAA to include Maths and Chemistry or Physics`
    - **Pathways to Birmingham:** `ABB to include A in Maths and Chemistry or Physics`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower plus music qualification · **Sport (county level+):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"Number of A-levels required: 3. A level Mathematics and Chemistry or Physics. General Studies, Critical Thinking and Use of Maths A Levels are not accepted."`
19. Study areas referenced: biochemical, food, pharmaceutical, renewable energy, future food engineering, pharmaceutical drug development
20. `.../chemical-engineering-courses/chemical-engineering-meng` · Panel showing **2027**

## 48. Chemical Engineering with Industrial Study BEng

1. **Chemical Engineering with Industrial Study BEng**
2. **HV10**
3. BEng — "Bachelor of Engineering"
4. **4 years** (published as "3 + 1 in industry")
5. **`AAA to include A-level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics and one of Chemistry or Physics
7. Mathematics compulsory; second subject Chemistry or Physics
8. **Not stated** in the entry requirements
9. Maths **required**; Physics or Chemistry — one **required**
10. **Excluded:** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths and A in either Chemistry or Physics`
    - **Pathways to Birmingham:** `ABB to include A in Maths and either Chemistry or Physics`
16. EPQ, music and sport routes all published, each a one-grade reduction under stated conditions
17. "Application deadline for September 2027 entry to be confirmed"
18. `"You will spend a year in industry at the end of your second year. We have strong links with a large number of key companies to assist you, including Procter & Gamble, Unilever, BP, EDF, ConocoPhilips, PepsiCo, Jaguar/Land Rover, Cadbury, AstraZeneca, Johnson Matthey and GlaxoSmithKline as well as with smaller to medium enterprises."`
19. **Industrial year built into this UCAS code**, placed **after Year 2** — see field 18 for the named partner companies
20. `.../chemical-engineering-courses/chemical-engineering-industrial-beng` · Panel showing **2027**; selector 2027 / 2026

## 49. Chemical Engineering with Industrial Study MEng

1. **Chemical Engineering with Industrial Study MEng**
2. **H802**
3. MEng — "Master of Engineering"
4. **5 years**
5. **`A*AA/AAAA to include A-level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics and one of Chemistry or Physics
7. Mathematics compulsory; second subject Chemistry or Physics
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one **required**
10. **Excluded:** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAA to include Maths and Chemistry or Physics` (again only one grade below standard)
    - **Pathways to Birmingham:** `ABB to include A in Maths and Chemistry or Physics`
16. **EPQ:** alternative offer one grade lower plus B in EPQ · **Music:** one grade lower plus Music qualification · **Sport (county level or above):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"A year working in industry will give you a step up into a graduate role, helping to build your confidence and professional experience."`
19. **Industrial year built into this UCAS code** — see field 18
20. `.../chemical-engineering-courses/chemical-engineering-industrial-meng` · Panel showing **2027**; selector 2027 / 2026

## 50. Chemical Engineering (International Study) MEng

1. **Chemical Engineering (International Study) MEng**
2. **H801**
3. MEng — "Master of Engineering"
4. 4 years
5. **`A*AA/AAAA`** — the grade string as printed in the offer field. The subject rule is published separately as "A level Mathematics and Chemistry or Physics" (recorded at field 6/7 rather than stitched into the offer string, since I cannot confirm the two appear as one contiguous phrase)
6. A-level Mathematics and one of Chemistry or Physics
7. Mathematics compulsory; second subject Chemistry or Physics
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one **required**
10. **Excluded:** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence) — **no GCSE language requirement published**, despite the year abroad including non-English-speaking universities. Not inferred from the Physics International Study pages
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAA to include Maths and Chemistry or Physics`
    - **Pathways to Birmingham:** `ABB to include A in Maths and Chemistry or Physics`
16. EPQ, music and sport routes all published, each a one-grade reduction
17. "Application deadline for September 2027 entry to be confirmed."
18. `"You spend your third year studying at a prestigious university either in English at an English-speaking university (eg, Melbourne, Ontario, Montreal, Singapore or one of the Universitas 21 group) or at a non-English speaking university in Europe."`
19. **Third year abroad built into this UCAS code**, with the host-language choice made during the degree — see field 18
20. `.../chemical-engineering-courses/chemical-engineering-international-meng` · Panel showing **2027**; selector 2027 / 2026

## 51. Chemical Engineering with International and Industrial Study MEng

1. **Chemical Engineering with International and Industrial Study MEng**
2. **HW10**
3. MEng — "Master of Engineering"
4. **5 years** (published as "4 + 1 in industry")
5. **`A*AA/AAAA to include A-level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics and one of Chemistry or Physics
7. Mathematics compulsory; second subject Chemistry or Physics
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one **required**
10. **Excluded (verbatim):** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted"
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence) — no GCSE language requirement published
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAA to include Maths and Chemistry or Physics`
    - **Pathways to Birmingham:** `ABB to include A in Maths and Chemistry or Physics`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music performance:** one grade lower plus the Music qualification · **High-level sports:** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"You spend your fourth year studying at a prestigious university either in English at an English-speaking university (eg, Melbourne, Ontario, Montreal, Singapore or one of the Universitas 21 group) or at a non-English speaking university in Europe."`
19. **Both a year abroad AND a year in industry are built into this single UCAS code.** The international year is the **fourth** year (contrast H801, where it is the third). Industrial year: "Year working in industry will help to build your networks and apply what you've learnt in a real-world setting"
20. `.../chemical-engineering-courses/chemical-engineering-international-industrial-meng` · Panel showing **2027**; selector 2027 / 2026

## 52. Energy Engineering BEng

1. **Energy Engineering BEng**
2. **H804**
3. BEng — "Bachelor of Engineering"
4. 3 years
5. **`AAA to include A level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics and one of Chemistry or Physics
7. Mathematics compulsory; second subject Chemistry or Physics
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one **required**
10. **Accepted:** Chemistry or Physics as the second subject. **Excluded (verbatim):** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Contextual Offer:** `AAB to include A in Maths and A in either Chemistry or Physics`
    - **Pathways to Birmingham:** `ABB to include A in Maths and either Chemistry or Physics`
16. EPQ, music and sport routes all published, each a one-grade reduction under stated conditions
17. "Application deadline for September 2027 entry to be confirmed"
18. `"General Studies, Critical Thinking and Use of Maths A Levels are not accepted."`
19. NOT PUBLISHED on this page
20. `.../chemical-engineering-courses/energy-engineering-beng` · Title: "Energy Engineering BEng - University of Birmingham" · Panel showing **2027**; selector 2027 / 2026

## 53. Energy Engineering MEng

1. **Energy Engineering MEng**
2. **H805**
3. MEng — "Master of Engineering"
4. 4 years
5. **`A*AA /AAAA to include A level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics **and** one of Chemistry **or** Physics
7. "Number of A-levels required: 3. A level Mathematics and Chemistry or Physics." Mathematics compulsory; second subject a two-way choice of Chemistry or Physics
8. **Not stated** — and, as across this school, Further Maths does **not** appear in the reduced offers either
9. Maths **required**; Physics **accepted as the second subject**; Chemistry **accepted as the second subject** — one of the two required
10. **Accepted alternatives:** Chemistry or Physics (either acceptable). **Excluded (verbatim):** "General Studies, Critical Thinking and Use of Maths A Levels"
11. NOT PUBLISHED (low confidence — see caveat B)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page.** Recorded as *not stated*, NOT as "no admissions test"
14. **Not stated**
15. **Note: a two-grade reduction, unlike Chemical Engineering MEng's one-grade `AAA` from the same standard offer — see structural surprise 16:**
    - **Pathways to Birmingham:** `ABB to include A in Maths and either Chemistry or Physics.`
    - **Contextual Offer:** `AAB to include A in Maths and A in either Chemistry or Physics.`
16. **EPQ:** "one grade lower plus a grade B in the EPQ" · **Music performance:** "one grade lower plus the Music qualification" · **High-level sports:** "one grade lower"
17. "Application deadline for September 2027 entry to be confirmed."
18. `"Number of A-levels required: 3. A level Mathematics and Chemistry or Physics. General Studies, Critical Thinking and Use of Maths A Levels are not accepted."`
19. No named post-admission pathway published. Years 3–4 optional modules include Energy Economics, Plant Optimisation, Business and Project Management, Energy Systems Modelling, Fuel Cell Systems, Energy Systems Design and Policy, Environmental and Energy Law, Industry 4.0 and Big Data, Hydrogen and Fuel Cells, Net Zero Energy Systems, Thermal Energy
20. `https://www.birmingham.ac.uk/study/undergraduate/subjects/chemical-engineering-courses/energy-engineering-meng` · Title: "Energy Engineering MEng - University of Birmingham" · Panel showing **2027**; selector 2027 / 2026

## 54. Energy Engineering with Industrial Study BEng

1. **Energy Engineering with Industrial Study BEng**
2. **H806**
3. BEng — "Bachelor of Engineering"
4. 4 years
5. **`AAA to include A level Mathematics and Chemistry or Physics.`** — verbatim
6. A-level Mathematics and one of Chemistry or Physics
7. "Number of A-levels required: 3" · "A level Mathematics and Chemistry or Physics."
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one of the two **required**
10. **Accepted:** A-level Mathematics, Chemistry, Physics; International Baccalaureate with Chemistry or Physics at **HL grade 6**; BTEC in combination with other qualifications. **Excluded:** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page** — recorded as *not stated*, not "none"
14. **Not stated as an admissions requirement by the University.** Note separately that the *industrial placement* involves an employer interview — see field 19; that is a placement process, not an admissions interview, and must not be recorded as one
15. - **Pathways to Birmingham:** `ABB to include A in Maths and either Chemistry or Physics.`
    - **Contextual Offer:** `AAB to include A in Maths and A in either Chemistry or Physics.`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music performance (grade 8+):** one grade lower · **Sport (county level+):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed." (also shown as "TBC")
18. `"You will spend a year in industry between years two and three"`
19. **Industrial year built into this UCAS code, placed between Years 2 and 3.** The page notes strong links with a large number of key companies, and that students "typically pass interview process run by company" — i.e. the placement is competitive and employer-selected, not guaranteed
20. `https://www.birmingham.ac.uk/study/undergraduate/subjects/chemical-engineering-courses/energy-engineering-industrial-study-beng` · Title: "Energy Engineering with Industrial Study BEng - University of Birmingham" · Panel showing **2027**; selector 2027 / 2026

## 55. Energy Engineering with Industrial Study MEng

1. **Energy Engineering with Industrial Study MEng**
2. **H807**
3. MEng — "Master of Engineering"
4. **5 years**
5. **`A*AA/AAAA to include A level Mathematics and Chemistry or Physics`** — verbatim
6. A-level Mathematics and one of Chemistry or Physics
7. "Number of A-levels required: 3. A level Mathematics and Chemistry or Physics."
8. **Not stated**
9. Maths **required**; Physics or Chemistry — one **required**
10. **Accepted:** Chemistry or Physics as the second subject; no further alternatives published. **Excluded (verbatim):** "General Studies, Critical Thinking and Use of Maths A Levels are not accepted."
11. NOT PUBLISHED (low confidence)
12. NOT PUBLISHED (low confidence)
13. **Not stated anywhere on the page**
14. **Not stated**
15. - **Pathways to Birmingham:** `ABB to include A in Maths and either Chemistry or Physics`
    - **Contextual Offer:** `AAB to include A in Maths and A in either Chemistry or Physics`
16. **EPQ:** one grade lower plus grade B in EPQ · **Music:** one grade lower plus grade 8+ music qualification · **Sport (county level+):** one grade lower
17. "Application deadline for September 2027 entry to be confirmed"
18. `"You will spend a year in industry between years two and three."`
19. **Industrial year built into this UCAS code, between Years 2 and 3** — see field 18
20. `https://www.birmingham.ac.uk/study/undergraduate/subjects/chemical-engineering-courses/energy-engineering-industrial-study-meng` · Title: "Energy Engineering with Industrial Study MEng - University of Birmingham" · Panel showing **2027**; selector 2027 / 2026

---

# PART 8 — FOUNDATION YEAR ROUTE

## 56. Engineering and Physical Sciences Foundation Year BEng

> Included because it carries its own UCAS code and its own published entry requirements. It is a foundation-entry route, not a direct-entry Physics or Engineering degree, and its offer is on a completely different scale from every other course in this dataset.

1. **Engineering and Physical Sciences Foundation Year BEng**
2. **HFJ0**
3. BEng — "Bachelor of Engineering" (with integrated foundation year)
4. **4/5 years** — 4 years via the BEng pathway; 5 years via the MEng honours programme
5. **`BBB A-level Mathematics and General Studies are not considered.`** — transcribed **verbatim and exactly as printed**. Read literally this states that A-level Mathematics is *not considered*, which inverts the requirement on every other engineering course. **Recorded uninterpreted; see structural surprise 14. Do not normalise or "correct" this string without human confirmation.**
6. Per the offer string, A-level Mathematics and General Studies "are not considered". Separately, a **GCSE** Mathematics grade is required (field 12)
7. No cross-subject rule of the usual "including Maths and Physics" kind is published. The subject rule here operates as an *exclusion*, not an inclusion
8. **Not mentioned**
9. Maths — **A-level Maths stated as "not considered"** (see above); **GCSE Maths required at 6/B**. Physics **not mentioned**; Chemistry **not mentioned**
10. **Excluded:** A-level Mathematics and General Studies "are not considered"
11. NOT PUBLISHED
12. **PUBLISHED — the only course in this dataset with an explicit GCSE requirement in Mathematics:** "Minimum 6/B in GCSE Mathematics"
13. **Not stated.** No admissions-test wording appears — notable given this is the route for applicants without standard qualifications, where the School of Engineering's Mathematics Aptitude test might be expected. Recorded as *not stated*, never as "none"
14. **Not stated**
15. - **Contextual Offer:** `BBC`
    - **Pathways to Birmingham:** **explicitly N/A** — the only course in this dataset where this scheme does not apply
16. No EPQ / music / sport alternative routes published for this course
17. "Application deadline for September 2027 entry to be confirmed."
18. `"Please note this course is only open to UK students."`
19. **Progression is the defining feature of this UCAS code:** on completing the foundation year, students progress to any of the University's three-year **BEng honours** programmes or four-year **MEng (hons)** programmes within the **College of Engineering and Physical Sciences**. The specific degree is therefore chosen *after* admission, making this the broadest deferred-choice route at Birmingham — wider even than the general Engineering BEng/MEng, since it spans the whole College rather than three named disciplines
20. `https://www.birmingham.ac.uk/study/undergraduate/subjects/engineering-courses/engineering-physical-sciences-foundation-year` · Title: "Engineering and Physical Sciences Foundation Year BEng - University of Birmingham" · Panel showing **2027**

**Eligibility restriction (verbatim):** "Please note this course is only open to UK students."

---

## Appendix A — NOT RETRIEVED

**No course page remains unretrieved.** All 56 in-scope courses were fetched and read.

One non-course page could not be loaded:

| Page | Status | Consequence |
|---|---|---|
| Central "Pathways to Birmingham" / "Contextual Offer" scheme-definition page | **NOT RETRIEVED** — a 404 was returned at the URL located (`/study/undergraduate/fees-and-funding/pathways-to-birmingham`); no alternative URL was confirmed on `birmingham.ac.uk` | The **eligibility criteria** for both reduced-offer schemes are NOT RETRIEVED. Whether Birmingham operates a separate **care-experienced, estranged-student or access** offer route is **NOT RETRIEVED — not evidence of absence.** The per-course grade values for both named schemes are fully recorded above and are unaffected. |

**Fields that are NOT PUBLISHED rather than NOT RETRIEVED**, consistently across all 56 courses (see caveat B for the confidence qualification):

- **Field 11, science practical endorsement** — no course page published a practical-endorsement requirement.
- **Field 12, GCSE requirements** — published on only **three** of 56 courses: the two International Study Physics BSc variants (F301, FF3M — a GCSE grade 6 in a relevant language, for study at a non-English-speaking host), and the Foundation Year (HFJ0 — minimum 6/B in GCSE Mathematics). The other 53 published nothing. Note that the *MSci* International Study variant (F303) did **not** repeat the GCSE language requirement its BSc sibling publishes; that gap is recorded as published-silence, not inferred across.
- **Field 14, interview** — **not one of the 56 pages mentioned an admissions interview.** Recorded as *not stated* throughout, never as "no interview".
- **Field 17, application deadline** — no course published a 2027 deadline; all read "to be confirmed".

## Appendix B — out of scope, recorded for completeness

- **Natural Sciences BSc (YFC0)** and **Natural Sciences MSci (YCF1)** — cross-listed as "Associated Programmes" on the Physics catalogue but hosted under Geology and Earth Sciences. Not researched.
- **University of Birmingham Dubai** engineering courses, interleaved into the UK Mechanical and EESE listings with no UCAS codes: Mechanical Engineering BEng/MEng (Dubai), Mechanical Engineering (Biomedical) BEng (Dubai), Computer Engineering BEng (Dubai), Electronic and Electrical Engineering BEng (Dubai), plus "with Integrated Foundation Year" variants of each. Excluded as a different campus, not UK UCAS entry.

## Appendix B — out of scope, recorded for completeness

- **Natural Sciences BSc (YFC0)** and **Natural Sciences MSci (YCF1)** — cross-listed as "Associated Programmes" on the Physics catalogue but hosted under Geology and Earth Sciences. Not researched.
- **University of Birmingham Dubai** engineering courses, interleaved into the UK Mechanical and EESE listings with no UCAS codes: Mechanical Engineering BEng/MEng (Dubai), Mechanical Engineering (Biomedical) BEng (Dubai), Computer Engineering BEng (Dubai), Electronic and Electrical Engineering BEng (Dubai), plus "with Integrated Foundation Year" variants of each. Excluded as a different campus, not UK UCAS entry.
