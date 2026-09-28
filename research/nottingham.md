# University of Nottingham — Undergraduate Admissions Research
## Physics & Engineering, 2027 entry

Researched: 2026-09-14
Source policy: only `nottingham.ac.uk` pages used as admissions evidence. Every value below was read from a fetched official course page. Search engines were used only to LOCATE URLs.

---

# SUMMARY

## Verified course count
**27 courses verified** with 2027-entry requirements read off the official page (8 Physics, 19 Engineering).
**1 further course** (Physics with Computer Science MSci) exists but its entry-requirements panel could not be retrieved.

## Expected courses that DO NOT EXIST (for 2027 entry)

| Expected (from brief) | Reality |
|---|---|
| **Physics with Astronomy** | Does not exist. The real course is **Physics with Astrophysics** (BSc F3F5 / MSci F3FM). Not the same title — do not record as "Astronomy". |
| **Physics with Medical Physics** | No 2027 course page (404 on current URL pattern; only a 2022-entry archive page survives). Nottingham's own School page describes medical physics as a **specialism within the Physics degrees**, not a separate degree. Recorded as a STUDY OPTION, not a course. |
| **Physics with Nanoscience** | No 2027 course page (404; only 2021-entry archive). Nanoscience is likewise described as a **specialism**. |
| **Physics with European / International Study** | No such course found anywhere in the 2027 catalogue. |
| **Mathematical Physics MSci** | 404 on the current URL pattern (retried with cache-buster). Only the **BSc** (F326) exists in the live catalogue. Treat MSci as NOT OFFERED / unverified. |
| **Manufacturing Engineering** (standalone) | Does not exist. The URL `Manufacturing-Engineering-MEng-Hons.html` actually serves **"Mechanical Engineering with Manufacturing MEng (Hons)"** (H707). URL/title mismatch — see structural surprises. |
| **Electrical Engineering** (standalone) | Does not exist. Only **Electrical and Electronic Engineering**. |
| **Electronic Engineering** (standalone) | Does not exist. Nearest is **Electronic and Computer Engineering** (separate course, not researched in detail — out of named scope). |
| **Mechanical Engineering with a foundation year** | Does not exist as its own course. There is a single shared **Engineering and Physical Sciences Foundation (integrated honours programme) MEng, UCAS H100**, which feeds all engineering departments including Mechanical. |

## Pages that could NOT be retrieved (NOT RETRIEVED, not NOT PUBLISHED)
- `Mathematical-Physics-MSci-Hons.html` — 404, retried with `?v=2`, still 404.
- `Physics-with-Medical-Physics-BSc-Hons-U6UPHYMI.html` — 404, retried with `?v=2`, still 404.
- `ugstudy/course/Physics-with-Nanoscience-BSc` — 404.
- `Physics-with-Computer-Science-MSci-Hons.html` — page loads but renders **no entry-requirements panel**; `?v=2` returned 404. All admissions fields NOT RETRIEVED.
- `studywithus/ugstudy/search-results.html` — blocked by robots.txt, so the live JS course-search index could not be enumerated directly. Catalogue was reconstructed from the Faculty of Engineering course listing + individual course pages.

## Structural surprises (important for the app)

1. **Industrial-year and study-abroad variants have their OWN UCAS codes.** This contradicts the brief's default assumption. Mechanical Engineering BEng is **H302**; "including an Industrial Year" BEng is **H30A**; the MEng is **H300** and its industrial-year version is **H30C**. These are genuinely separate UCAS applications and are recorded as separate courses — NOT as study options. Nottingham runs a large matrix of these (Year-2-abroad vs Year-3-abroad MEng variants each get their own page).

2. **Aerospace Engineering is missing from the Faculty of Engineering course listing page** but the courses genuinely exist (BEng H402, MEng H400) with live 2027 entry requirements. Do not rely on the faculty listing as the catalogue of record.

3. **BEng and MEng offers differ, and differ per department.** Mechanical BEng AAA / MEng A\*AA; Civil BEng AAB / MEng AAA; EEE BEng AAB / MEng AAA; but Chemical BEng **AAA** = MEng **AAA** (no uplift). Never infer the MEng offer from the BEng.

4. **Mathematical Physics BSc is A\*AA** while every other Physics BSc is AAA. Its IB is also 38 points vs 34 for the rest. Sibling-inference would have produced a wrong value.

5. **Engineering courses carry an "Additional Qualifications Offer Reduction Scheme" (EPQ etc. = one grade off). Physics courses do NOT.** Verified present on Mechanical BEng, Civil BEng, Chemical BEng; verified explicitly ABSENT on Physics BSc and Physics MSci.

6. **Physics courses carry a science-practical requirement; Engineering courses do not.** Verified absent on Mechanical BEng and Chemical BEng; present on all Physics pages.

7. **Physics with Theoretical Physics BSc (F344) prints its duration as "3 years part-time".** This is almost certainly an error in Nottingham's own CMS (every sibling is 3 years full-time), but it is what the page says and is transcribed verbatim below. Flag before publishing.

8. **The Electrical and Electronic Engineering required-subjects string contains a stray UCAS code "H404"** mid-sentence — a CMS artifact, transcribed verbatim.

9. **Architecture and Environmental Design MEng is the only course in scope with an alternative offer route in the offer string itself** ("AAA / A\*AB including B in mathematics") **and the only one with a portfolio requirement.**

10. **No admissions test and no interview is mentioned on ANY page in scope.** Per the brief this is recorded as **NOT STATED**, never as "no admissions test". Nottingham's pages simply have no admissions-test or interview section for these subjects.

11. Course pages are year-foldered (`/UG/2025/`, `/UG/2026/`, `/UG/<name>.html`). The **bare, unfoldered URL is the current 2027 cycle**. Search engines frequently surface the `/2026/` or `/2025/` variants — those must not be used for 2027 figures.

## Fields that are NOT PUBLISHED across the board
- **Application deadline** — NOT PUBLISHED on any course page checked (verified explicitly ABSENT on Physics BSc and Mechanical Engineering BEng). Pages link only to a generic "How to apply" page.
- **Access / care-experienced specific offer** — NOT PUBLISHED as a separate named route. Only "Contextual offers" (standard and enhanced) appear.

## Verification caveats (be honest about scope)
- The **Additional Qualifications Offer Reduction Scheme** was individually verified on **Mechanical Engineering BEng, Civil Engineering BEng and Chemical Engineering BEng** only. It is almost certainly faculty-wide, but per the no-inference rule it is marked *not individually verified* on the other Engineering courses.
- **Deadline, EPQ route and practical-endorsement** fields were probed exhaustively on the deep-probe pages named above; on other courses they are marked *not individually verified* rather than assumed.
- Nottingham runs many more industrial-year / study-abroad permutations (Electronic and Computer Engineering, Environmental Engineering, Architectural Environment Engineering, Product Design and Manufacture variants) than are itemised below. Those outside the brief's named list were not individually fetched.

---

# PHYSICS — School of Physics and Astronomy

Shared characteristics verified across all Physics pages below: GCSE English language 4 (C); excluded A levels "General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives"; science practical sentence present; no admissions test or interview text; no EPQ reduction scheme.

---

## 1. Physics BSc (Hons)

**Fields**
1. **Title:** "Physics BSc (Hons)" (page H1 renders as "Physics - U6UPHYSS")
2. **UCAS code:** F300
3. **Award:** BSc Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Including AA in A level maths and physics." — subject-specific minimum grade **A in both** maths and physics
7. **Cross-subject rules:** Both maths AND physics required at grade A; no "one of" list
8. **Further Mathematics:** **NOT MENTIONED** (verified explicitly absent on deep probe)
9. **Maths:** required, grade A. **Physics:** required, grade A. **Chemistry:** not mentioned
10. **Alternative sciences:** none listed. **Explicitly NOT accepted:** "General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives"
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately."
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED.** No admissions-test section exists on the page. (Deep-probed: ABSENT.)
14. **Interview:** **NOT STATED.** No interview section exists on the page. (Deep-probed: ABSENT.)
15. **Contextual offer:** Heading **"Contextual offers"** — standard contextual offer **`AAB`**. Wording: "We make contextual offers to students who may have experienced barriers that restricted progress at school or college." Enhanced contextual offer described elsewhere on Nottingham pages as "usually two grades lower than the advertised entry requirements."
16. **Alternative offer routes:** **NOT PUBLISHED** — no EPQ / Additional Qualifications Offer Reduction Scheme on this page (deep-probed: ABSENT)
17. **Application deadline:** **NOT PUBLISHED** (deep-probed: ABSENT)
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options:** Specialisms chosen within the degree — "astronomy, nanoscience, medical physics or theoretical physics" (per School of Physics & Astronomy UG page, https://www.nottingham.ac.uk/physics/studywithus/undergraduate/undergraduates.aspx). Medical physics specialism: "students who choose to specialise in medical physics take modules in health physics, molecular biophysics, and structural and functional medical imaging" (https://www.nottingham.ac.uk/physics/studywithus/undergraduate/studying-medical-physics-with-us.aspx). Also year in industry and study abroad.
20. **Provenance:** sourceUrl https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Physics-BSc-Hons.html — heading "Physics BSc (Hons) | University of Nottingham" — **panel showed 2027 entry**, start date September 2027

**Other qualifications:** IB "34 points overall or 666 in 3 HL certificates", "HL6 in physics and HL6 in mathematics analysis and approaches". BTEC: "Pearson BTEC National Extended Certificate D plus AA (A level maths and physics)"; other BTEC options not accepted alone. Foundation progression route: "Engineering and Physical Sciences Foundation Programme".

---

## 2. Physics MSci (Hons)

**Fields**
1. **Title:** "Physics MSci (Hons)" (H1 renders "Physics - U7UPHYSS")
2. **UCAS code:** F303
3. **Award:** MSci Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Including AA in A level maths and physics" — grade A minimum in each
7. **Cross-subject rules:** maths AND physics both required at A
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Physics:** required A. **Chemistry:** not mentioned
10. **Alternative sciences:** none listed. NOT accepted: "General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives"
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately." (deep-probed, verbatim)
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED** (deep-probed: ABSENT)
14. **Interview:** **NOT STATED** (deep-probed: ABSENT)
15. **Contextual offer:** Heading "Contextual offers" — **`AAB`**. "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college. Our standard contextual offer is usually one grade lower than the advertised entry requirements"
16. **Alternative offer routes:** **NOT PUBLISHED** — EPQ / Additional Qualifications Offer Reduction Scheme explicitly ABSENT (deep-probed)
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options (no separate UCAS code):** "Year in industry (Physics with a Year in Industry)"; "Study abroad (several months at partner institutions for final year project)"; "Year of overseas study at selected partner institutions"; "Paid summer research internships". Chosen after admission.
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Physics-MSci-Hons.html — **2027 entry panel**, start September 2027

**IB:** "34 points overall or 666 in 3 HL certificates"; "HL6 in physics and HL6 in mathematics analysis and approaches"

---

## 3. Physics with Theoretical Physics BSc (Hons)

**Fields**
1. **Title:** "Physics with Theoretical Physics BSc (Hons)"
2. **UCAS code:** F344
3. **Award:** BSc Hons
4. **Duration:** **"3 years part-time"** — transcribed exactly as printed. ⚠️ Almost certainly a CMS error (all siblings are full-time); re-confirmed on a second fetch. Flag before publishing.
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Including AA in A level maths and physics."
7. **Cross-subject rules:** maths AND physics at A
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Physics:** required A. **Chemistry:** not mentioned
10. **Alternative sciences:** none. NOT accepted: "General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives"
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately."
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — **`AAB`**. "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college."
16. **Alternative offer routes:** not individually verified; no EPQ scheme observed
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options:** theoretical physics is also available as a specialism within the plain Physics degrees
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/physics-with-theoretical-physics-bsc-U6UPHYTH.html — **2027 entry panel**, start September 2027. (Also reachable at `.../physics-with-theoretical-physics-bsc.html`.) Plan code U6UPHYTH.

**IB:** "34 points overall or 666 in 3 HL certificates"; "HL6 in physics and HL6 in mathematics analysis and approaches"

---

## 4. Physics with Theoretical Physics MSci (Hons)

**Fields**
1. **Title:** "Physics with Theoretical Physics MSci (Hons)"
2. **UCAS code:** F340
3. **Award:** MSci Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Including AA in A level maths and physics."
7. **Cross-subject rules:** maths AND physics at A
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Physics:** required A. **Chemistry:** not mentioned
10. **Alternative sciences:** none. NOT accepted: general studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately."
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — **`AAB`**. "Our standard contextual offer is usually one grade lower than the advertised entry requirements, and our enhanced contextual offer is usually two grades lower than the advertised entry requirements."
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options:** not individually enumerated on this page
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/physics-with-theoretical-physics-msci.html — **2027 entry panel**, start September 2027. Plan code U7UPHYTH.

**IB:** "34 points overall or 666 in 3 HL certificates"; "HL6 in physics and HL6 in mathematics analysis and approaches"

---

## 5. Physics with Astrophysics BSc (Hons)

> NOTE: this is the course the brief called "Physics with Astronomy". The official title is **Astrophysics**.

**Fields**
1. **Title:** "Physics with Astrophysics BSc (Hons)"
2. **UCAS code:** F3F5
3. **Award:** BSc Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Including AA in A level maths and physics."
7. **Cross-subject rules:** maths AND physics at A
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Physics:** required A. **Chemistry:** not mentioned
10. **Alternative sciences:** none. NOT accepted: "General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives"
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately."
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — **`AAB`**. "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college. Our standard contextual offer is usually one grade lower than the advertised entry requirements."
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options:** astronomy is also available as a specialism within the plain Physics degrees
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Physics-with-Astrophysics-BSc-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UPHYAP. (Also reachable at `.../Physics-with-Astrophysics-BSc-Hons-U6UPHAST.html`.)

**IB:** "34 points overall or 666 in 3 HL certificates"; "HL6 in physics and HL6 in mathematics analysis and approaches"

---

## 6. Physics with Astrophysics MSci (Hons)

**Fields**
1. **Title:** "Physics with Astrophysics MSci (Hons)"
2. **UCAS code:** F3FM
3. **Award:** MSci Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`** — page prints "Standard offer: AAA"
6. **Required subjects:** "Including AA in A level maths and physics."
7. **Cross-subject rules:** maths AND physics at A
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Physics:** required A. **Chemistry:** not mentioned
10. **Alternative sciences:** none. NOT accepted: general studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately."
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offer: AAB" — **`AAB`**. Standard contextual "One grade lower than the advertised entry requirements"; enhanced two grades lower, for eligible Home/UK fee status students
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options:** not individually enumerated on this page
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Physics-with-Astrophysics-MSci-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UPHYAP.

**IB:** "34 points overall or 666 in 3 HL certificates"; "HL6 in physics and HL6 in mathematics analysis and approaches"

---

## 7. Mathematical Physics BSc (Hons)

> ⚠️ The only Physics course with a starred offer. Do NOT normalise to AAA.

**Fields**
1. **Title:** "Mathematical Physics BSc (Hons)" (H1 renders "Mathematical Physics - U6UMTHPHY")
2. **UCAS code:** F326
3. **Award:** BSc Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`A*AA`**
6. **Required subjects:** "Including AA in A level maths and physics."
7. **Cross-subject rules:** maths AND physics both at A, within an overall A\*AA. The page does not state which subject the A\* must be in.
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Physics:** required A. **Chemistry:** not mentioned
10. **Alternative sciences:** none. NOT accepted: "General studies, critical thinking, citizenship studies, leisure studies, functional skills, global perspectives"
11. **Practical:** REQUIRED — "A pass is normally required in science practical tests, where these are assessed separately."
12. **GCSE:** "GCSE English language 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — **`AAA`**. "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college."
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Including AA in A level maths and physics. A pass is normally required in science practical tests, where these are assessed separately."
19. **Study options:** not individually enumerated on this page
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Mathematical-Physics-BSc-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UMTHPHY.

**IB:** "38 points overall" with "666 at Higher Level including HL Mathematics (Analysis and Approaches) and HL Physics" — note **38**, higher than the 34 used across the rest of Physics.

---

## 8. Physics with Computer Science MSci (Hons) — PARTIAL

**Fields**
1. **Title:** "Physics with Computer Science" (MSci Hons)
2. **UCAS code:** **NOT RETRIEVED**
3. **Award:** MSci Hons
4. **Duration:** "5 years full-time"
5. **Standard A-Level offer:** **NOT RETRIEVED**
6–17. **NOT RETRIEVED** — the page renders overview/teaching/campus content but no entry-requirements panel; `?v=2` retry returned 404
18. **Contiguous raw block:** NOT RETRIEVED
19. **Study options:** NOT RETRIEVED
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Physics-with-Computer-Science-MSci-Hons.html — entry year **not shown on page**. Do NOT record any figures for this course. Archived 2025/2026 variants exist at `/UG/2025/` and `/UG/2026/` but must not be used for 2027.

---

# ENGINEERING — Faculty of Engineering

Characteristics verified across Engineering pages: GCSE "English grade 4 (C)"; no science-practical requirement (verified ABSENT on Mechanical BEng and Chemical BEng); no admissions test or interview text anywhere; contextual offers under the heading "Contextual offers"; an **Additional Qualifications Offer Reduction Scheme** (verified on Mechanical BEng, Civil BEng, Chemical BEng).

## Shared: Contextual offers (Engineering, verbatim)
> "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college. Our standard contextual offer is usually one grade lower than the advertised entry requirements, and our enhanced contextual offer is usually two grades lower than the advertised entry requirements."

Eligibility: "Home/UK fee status and meet specific criteria".

## Shared: Additional Qualifications Offer Reduction Scheme (verbatim, fullest version — from Chemical Engineering BEng)
> "Applicants to this course may be eligible for our Additional Qualifications Offer Reduction Scheme. If you achieve a grade A in an EPQ, Core Maths\*, IB Extended Essay or additional AS level qualification\* then you will receive a one grade reduced offer for this course. A grade B in the IB Extended Essay is also accepted.
>
> Please note that if you qualify for an enhanced contextual offer or receive an alternative offer based on taking four A levels, your additional qualification will not be taken into consideration as we are unable to make any further adjustments to your offer.
>
> \* Additional eligibility requirements apply."

Shorter version as printed on Civil Engineering BEng:
> "Applicants to this course may be eligible for our Additional Qualifications Offer Reduction Scheme. If you achieve a grade A in an EPQ, Core Maths\*, IB Extended Essay or additional AS level qualification\* then you will receive a one grade reduced offer for this course."

**This scheme is NOT present on Physics courses.**

---

## 9. Mechanical Engineering BEng (Hons)

**Fields**
1. **Title:** "Mechanical Engineering BEng (Hons)"
2. **UCAS code:** H302
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time" (4 years via the separate industrial-year course H30A)
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
7. **Cross-subject rules:** **A in maths mandatory**, PLUS either (physics OR further maths) OR any TWO of {chemistry, biology, design, electronics}
8. **Further Mathematics:** **ACCEPTED AS A DIRECT SUBSTITUTE FOR PHYSICS** — "either physics or further maths". Not merely a second maths; it satisfies the second-subject rule outright.
9. **Maths:** required, grade A. **Physics:** required *unless* further maths, or two of the listed alternatives, are offered. **Chemistry:** accepted only as one of the "any two" alternatives
10. **Accepted alternatives:** chemistry, biology, design, electronics (any two). **NOT accepted:** "General studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills."
11. **Practical:** **NOT PUBLISHED** — no science-practical sentence (deep-probed: ABSENT)
12. **GCSE:** "English grade 4 (C)."
13. **Admissions test:** **NOT STATED** — no admissions-test section exists (deep-probed: ABSENT)
14. **Interview:** **NOT STATED** — no interview section exists (deep-probed: ABSENT)
15. **Contextual offer:** Heading "Contextual offers" — see shared block above. Standard = one grade lower; enhanced = two grades lower
16. **Alternative offer routes:** **Additional Qualifications Offer Reduction Scheme** (verified present) — "If you achieve a grade A in an EPQ, Core Maths\*, IB Extended Essay or additional AS level qualification\* then you will receive a one grade reduced offer". Also referenced: "an alternative offer based on taking four A levels"
17. **Application deadline:** **NOT PUBLISHED** (deep-probed: ABSENT)
18. **Contiguous raw block:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
19. **Study options:** "There is a variant of this course that offer a study abroad year" and "If you want to spend a year in industry as part of your course" — ⚠️ at Nottingham these variants have **their own UCAS codes** and are separate applications (see #11, #12), not in-course options
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Mechanical-Engineering-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UMECHE.

**IB:** "34 points overall or 666 in 3 Higher Level Certificates"

---

## 10. Mechanical Engineering MEng (Hons)

**Fields**
1. **Title:** "Mechanical Engineering MEng (Hons)"
2. **UCAS code:** H300
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time" (5 years via separate industrial-year course H30C)
5. **Standard A-Level offer:** **`A*AA`** — note the A\*, differs from the BEng
6. **Required subjects:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
7. **Cross-subject rules:** A in maths mandatory, plus (physics OR further maths) OR any two of {chemistry, biology, design, electronics}; overall A\*AA
8. **Further Mathematics:** accepted as a direct substitute for physics
9. **Maths:** required A. **Physics:** required unless substituted. **Chemistry:** alternative only
10. **Accepted alternatives:** chemistry, biology, design, electronics. **NOT accepted:** "General studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills."
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)."
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** Heading "Contextual offers" — "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college. Our standard contextual offer is usually one grade lower than the advertised entry requirements, and our enhanced contextual offer is usually two grades lower than the advertised entry requirements."
16. **Alternative offer routes:** not individually verified on this page
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
19. **Study options:** "Study abroad (Year 2 or Year 3 abroad variants available)"; "Industrial placements (summer placements and full-year options)" — ⚠️ the Year-2-abroad and Year-3-abroad MEng variants each have their own course page and UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Mechanical-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UMECHE.

**IB:** "36 points overall or 766 in 3 Higher Level Certificates."

---

## 11. Mechanical Engineering including an Industrial Year BEng (Hons)

> Separate UCAS code — a genuinely separate application, NOT a study option.

**Fields**
1. **Title:** "Mechanical Engineering including an Industrial Year BEng (Hons)"
2. **UCAS code:** **H30A**
3. **Award:** BEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`** (same as the 3-year BEng)
6. **Required subjects:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
7. **Cross-subject rules:** as BEng H302
8. **Further Mathematics:** accepted as a direct substitute for physics
9. **Maths:** required A. **Physics:** required unless substituted. **Chemistry:** alternative only
10. **NOT accepted:** "General studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills."
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)."
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
19. **Study options:** the industrial year is the defining feature of this UCAS code, not an in-course option
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Mechanical-Engineering-including-an-Industrial-Year-BEng-Hons-U6UMECHEY.html — **2027 entry panel**, start September 2027. Plan code U6UMECHEY.

**IB:** "34 points overall or 666 in 3 Higher Level Certificates"

---

## 12. Mechanical Engineering including an Industrial Year MEng (Hons)

**Fields**
1. **Title:** "Mechanical Engineering including an Industrial Year MEng (Hons)"
2. **UCAS code:** **H30C**
3. **Award:** MEng Hons
4. **Duration:** "5 years full-time"
5. **Standard A-Level offer:** **`A*AA`**
6. **Required subjects:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
7. **Cross-subject rules:** as MEng H300
8. **Further Mathematics:** accepted as a direct substitute for physics
9. **Maths:** required A. **Physics:** required unless substituted. **Chemistry:** alternative only
10. **NOT accepted:** general studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
19. **Study options:** n/a — industrial year is intrinsic to this code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Mechanical-Engineering-including-an-Industrial-Year-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UMECHEY1.

**Other Mechanical variants confirmed to exist as separate pages/codes (not individually transcribed):** Mechanical Engineering including an Integrated Study Abroad Year BEng; Mechanical Engineering including an Integrated Study Abroad Year (Year 2 abroad) MEng; ditto (Year 3 abroad) MEng; Mechanical Engineering with Manufacturing BEng; Mechanical Engineering with Manufacturing including an Industrial Year BEng (plan U6UMEMANY); Mechanical Engineering with Manufacturing including Industrial Year (Year 4) MEng.

---

## 13. Mechanical Engineering with Manufacturing MEng (Hons)

> ⚠️ Served from the URL `Manufacturing-Engineering-MEng-Hons.html`. There is **no** standalone "Manufacturing Engineering" degree — that URL is a misnomer.

**Fields**
1. **Title:** "Mechanical Engineering with Manufacturing MEng (Hons)"
2. **UCAS code:** H707
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`A*AA`**
6. **Required subjects:** "Maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
7. **Cross-subject rules:** maths plus (physics OR further maths) OR any two of {chemistry, biology, design, electronics}
8. **Further Mathematics:** accepted as a direct substitute for physics
9. **Maths:** required. **Physics:** required unless substituted. **Chemistry:** alternative only
10. **Accepted alternatives:** chemistry, biology, design, electronics
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** not individually transcribed on this fetch
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Maths and either physics or further maths or any two of the following: chemistry, biology, design, electronics."
19. **Study options:** a separate "including Industrial Year (Year 4)" MEng page exists with its own code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Manufacturing-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UMEMAN.

---

## 14. Aerospace Engineering BEng (Hons)

> Exists despite being absent from the Faculty of Engineering course listing page.

**Fields**
1. **Title:** "Aerospace Engineering BEng (Hons)"
2. **UCAS code:** H402
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time" (4 via separate industrial-year code)
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "A in maths and either physics or further maths, or any two of the following: chemistry, biology, design, electronics"
7. **Cross-subject rules:** A in maths mandatory, plus (physics OR further maths) OR any two of {chemistry, biology, design, electronics}
8. **Further Mathematics:** accepted as a direct substitute for physics
9. **Maths:** required A. **Physics:** required unless substituted. **Chemistry:** alternative only
10. **Accepted alternatives:** chemistry, biology, design, electronics. **NOT accepted:** "General studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** standard one grade lower, enhanced two grades lower, for eligible Home/UK fee status students
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and either physics or further maths, or any two of the following: chemistry, biology, design, electronics"
19. **Study options:** a separate "including an Industrial Year" BEng exists (plan U6UAERSEY) with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Aerospace-Engineering-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UAERSE.

**IB:** "34 points overall or 666 in 3 Higher Level Certificates" with "6 in Mathematics: Analysis and Approaches at HL or 6 in Mathematics: Applications and Interpretation at HL or 7 in Mathematics: Analysis and Approaches at SL plus 6 in Physics at HL or 7 in Physics at SL"

---

## 15. Aerospace Engineering MEng (Hons)

**Fields**
1. **Title:** "Aerospace Engineering MEng (Hons)"
2. **UCAS code:** H400
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`A*AA`**
6. **Required subjects:** "A in Maths and either physics or further maths, or any two of the following: chemistry, biology, design, electronics"
7. **Cross-subject rules:** as BEng, within an overall A\*AA
8. **Further Mathematics:** accepted as a direct substitute for physics
9. **Maths:** required A. **Physics:** required unless substituted. **Chemistry:** alternative only
10. **NOT accepted:** "Excluding general studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** **NOT RETRIEVED on this page** — the fetch returned no contextual-offer text. Do not assume the faculty default applies.
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in Maths and either physics or further maths, or any two of the following: chemistry, biology, design, electronics"
19. **Study options:** a separate "including an Industrial Year" MEng exists (plan U7UAERSEY) with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Aerospace-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UAERSE.

**IB:** "36 points overall or 766 in 3 Higher Level Certificates" with "6 in Mathematics: Analysis and Approaches at Higher Level or 6 in Mathematics: Applications and Interpretation at Higher Level or 7 in Mathematics: Analysis and Approaches at Standard Level plus 6 in Physics at Higher or 7 in Physics at Standard Level"

---

## 16. Civil Engineering BEng (Hons)

**Fields**
1. **Title:** "Civil Engineering BEng (Hons)"
2. **UCAS code:** H201
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`AAB`** — note, lower than Mechanical/Aerospace BEng
6. **Required subjects:** "Mathematics grade A at A level and one from physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science or further maths"
7. **Cross-subject rules:** **grade A in Mathematics specifically** (higher than the AAB overall implies), plus ONE from a wide list
8. **Further Mathematics:** **accepted as one of the permitted second subjects** (last item in the list) — not required, not a separate uplift
9. **Maths:** required, grade A. **Physics:** NOT required — merely one option among twelve. **Chemistry:** one option among twelve
10. **Accepted alternatives (unusually broad):** physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science, further maths. **NOT accepted:** "General studies, critical thinking and citizenship studies, global perspectives and research, quantitative methods, thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "GCSE English grade 4 (C)"
13. **Admissions test:** **NOT STATED** — deep-probed, ABSENT: "No mention of admissions tests or interviews appears in the document."
14. **Interview:** **NOT STATED** — deep-probed, ABSENT (same sentence as above)
15. **Contextual offer:** Heading "Contextual offers" — verbatim: "We make contextual offers to students who may have experienced barriers that have restricted progress at school or college. Our standard contextual offer is usually one grade lower than the advertised entry requirements, and our enhanced contextual offer is usually two grades lower than the advertised entry requirements."
16. **Alternative offer routes:** **Additional Qualifications Offer Reduction Scheme** (verified present) — verbatim: "Applicants to this course may be eligible for our Additional Qualifications Offer Reduction Scheme. If you achieve a grade A in an EPQ, Core Maths\*, IB Extended Essay or additional AS level qualification\* then you will receive a one grade reduced offer for this course." Footnote: "Additional eligibility requirements apply."
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Mathematics grade A at A level and one from physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science or further maths"
19. **Study options:** a separate "including an Industrial Year" BEng exists with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Civil-Engineering-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UCVENG.

**IB:** "32 points overall or 665 in 3 HL certificates"; "One of HL6 in Mathematics Analysis and Approaches, HL6 in Mathematics Applications and Interpretation or SL7 in Mathematics Analysis and Approaches plus HL5 in one of physics, chemistry, biology, design and technology, geography, geology, computing/computer science, further mathematics, 3D design, design engineering. economics or psychology" (sic — stray full stop after "design engineering")

---

## 17. Civil Engineering MEng (Hons)

**Fields**
1. **Title:** "Civil Engineering MEng (Hons)" (H1 renders "Civil Engineering - U7UCVENG")
2. **UCAS code:** H200
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Mathematics grade A at A level and one from physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science or further maths"
7. **Cross-subject rules:** grade A in Mathematics plus one from the list
8. **Further Mathematics:** accepted as one of the permitted second subjects
9. **Maths:** required grade A. **Physics:** not required, one option among twelve. **Chemistry:** one option among twelve
10. **Accepted alternatives:** as BEng H201. **NOT accepted:** "General studies, critical thinking and citizenship studies, global perspectives and research, quantitative methods, thinking skills are not accepted"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "GCSE English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified on this page (scheme confirmed on the BEng)
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Mathematics grade A at A level and one from physics, economics, psychology, 3D design, chemistry, biology, design and technology, geography, geology, computing, computer science or further maths"
19. **Study options:** a separate "including an Industrial Year" MEng exists with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Civil-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UCVENG.

**IB:** "34 points overall or 666 in 3 HL certificates"

---

## 18. Electrical and Electronic Engineering BEng (Hons)

**Fields**
1. **Title:** "Electrical and Electronic Engineering BEng (Hons)" (H1 renders "Electrical and Electronic Engineering - U6UEEENG")
2. **UCAS code:** H603
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`AAB`**
6. **Required subjects (verbatim, including CMS artifact):** "Maths and one of electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control or design technology: design engineering H404"
   - ⚠️ The trailing **"H404"** is a stray UCAS code embedded in the sentence on Nottingham's own page. Transcribed as printed; it is not part of the subject rule.
7. **Cross-subject rules:** Maths required, plus ONE of the listed subjects. No subject-specific grade is stated for maths on this page (unlike Civil, which specifies grade A)
8. **Further Mathematics:** **accepted as one of the permitted second subjects**
9. **Maths:** required (no stated minimum grade). **Physics:** NOT required — one option among many. **Chemistry:** one option among many
10. **Accepted alternatives:** electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control, design technology: design engineering. **NOT accepted:** "General studies, critical thinking, citizenship studies, global perspectives and research, and thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower; "must have Home/UK fee status and meet specific criteria"
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Maths and one of electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control or design technology: design engineering H404"
19. **Study options:** separate pages/codes exist for "Including an Industrial Year" BEng and "with a Year Abroad" BEng
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Electrical-and-Electronic-Engineering-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UEEENG.

**IB:** "32 points overall or 655 in 3 Higher Level Certificates"; "One of HL5 Mathematics: Analysis and Approaches, HL5 Mathematics: Applications and Interpretation OR SL6 Mathematics: Analysis and Approaches AND 5 at HL in one of biology, chemistry, physics or computer science"

---

## 19. Electrical and Electronic Engineering MEng (Hons)

**Fields**
1. **Title:** "Electrical and Electronic Engineering MEng (Hons)"
2. **UCAS code:** H600
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "Maths and one of electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control or design technology: design engineering H404" (same CMS artifact "H404")
7. **Cross-subject rules:** Maths plus one of the listed subjects
8. **Further Mathematics:** accepted as one of the permitted second subjects
9. **Maths:** required. **Physics:** not required, one option among many. **Chemistry:** one option among many
10. **Accepted alternatives:** as BEng H603. **NOT accepted:** "General studies, critical thinking, citizenship studies, global perspectives and research, and thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Maths and one of electronics, computer science, physics, chemistry, biology, further mathematics, design and technology: systems control or design technology: design engineering H404"
19. **Study options:** separate pages/codes exist for "including an Industrial Year (MEng, Year 4)" and "with a Year Abroad" MEng
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Electrical-and-Electronic-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UEEENG.

**IB:** "34 points overall or 666 in 3 Higher Level Certificates"; "One of HL6 Mathematics: Analysis and Approaches, HL6 Mathematics: Applications and Interpretation OR SL7 Mathematics: Analysis and Approaches AND 6 at HL in one of biology, chemistry, physics or computer science"

---

## 20. Chemical Engineering BEng (Hons)

**Fields**
1. **Title:** "Chemical Engineering BEng (Hons)"
2. **UCAS code:** H810
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "A in maths and A in either chemistry or physics"
7. **Cross-subject rules:** **A in maths AND A in (chemistry OR physics)** — two subject-specific A grades
8. **Further Mathematics:** **NOT MENTIONED** — not listed as an accepted alternative and not counted separately
9. **Maths:** required, grade A. **Chemistry:** accepted at grade A as the second subject. **Physics:** accepted at grade A as the alternative second subject. Chemistry is NOT compulsory for this Chemical Engineering degree — physics substitutes
10. **Accepted alternatives:** only chemistry or physics. **NOT accepted:** "General studies, critical studies, citizenship studies, global perspectives and research, thinking skills"
11. **Practical:** **NOT PUBLISHED** — deep-probed, ABSENT
12. **GCSE:** "GCSE English grade 4 (C)"
13. **Admissions test:** **NOT STATED** — deep-probed, ABSENT
14. **Interview:** **NOT STATED** — deep-probed, ABSENT
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** **Additional Qualifications Offer Reduction Scheme** (verified present, fullest wording on this page) — see shared block above, including "A grade B in the IB Extended Essay is also accepted" and the exclusion "if you qualify for an enhanced contextual offer or receive an alternative offer based on taking four A levels, your additional qualification will not be taken into consideration"
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and A in either chemistry or physics"
19. **Study options:** a separate "including an Industrial Year" BEng exists with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Chemical-Engineering-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UCHEME.

**IB:** "34 points overall or 666 in three Higher Level Certificates"; "HL6 in Mathematics Analysis and Approaches, HL6 in Mathematics Applications and Interpretation or SL7 in Mathematics Analysis and Approaches plus HL6 in one of physics or chemistry"

---

## 21. Chemical Engineering MEng (Hons)

> ⚠️ Same offer as the BEng (`AAA`) — no MEng uplift, unlike Mechanical/Aerospace/Civil/EEE. Do not infer an A\*.

**Fields**
1. **Title:** "Chemical Engineering MEng (Hons)"
2. **UCAS code:** H800
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "A in maths and A in either chemistry or physics"
7. **Cross-subject rules:** A in maths AND A in (chemistry OR physics)
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Chemistry:** A, as one of two options. **Physics:** A, as the alternative
10. **Accepted alternatives:** chemistry or physics only. **NOT accepted:** "General studies, critical studies, citizenship studies, global perspectives and research, thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "GCSE English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified on this page
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and A in either chemistry or physics"
19. **Study options:** a separate "including an Industrial Year" MEng exists with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Chemical-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UCHEME.

**IB:** "34 points overall or 666 in three Higher Level Certificates"; "HL6 in Mathematics Analysis and Approaches, HL6 in Mathematics Applications and Interpretation or SL7 in Mathematics Analysis and Approaches plus HL6 in one of physics or chemistry"

---

## 22. Chemical Engineering with Environmental Engineering BEng (Hons)

**Fields**
1. **Title:** "Chemical Engineering with Environmental Engineering BEng (Hons)"
2. **UCAS code:** H8HF
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "A in maths and A in either chemistry or physics"
7. **Cross-subject rules:** A in maths AND A in (chemistry OR physics)
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Chemistry:** A, one of two options. **Physics:** A, the alternative
10. **Accepted alternatives:** chemistry or physics only. **NOT accepted:** "General studies, critical studies, citizenship studies, global perspectives and research, thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "GCSE English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — verbatim: "Our standard contextual offer is usually one grade lower than the advertised entry requirements, and our enhanced contextual offer is usually two grades lower"
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in maths and A in either chemistry or physics"
19. **Study options:** a separate "including an Industrial Year" BEng exists with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Chemical-Engineering-with-Environmental-Engineering-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UCHENV.

**IB:** "34 points overall or 666 in 3 Higher Level Certificates"; "One of HL6 in Mathematics Analysis and Approaches, HL6 in Mathematics Applications and Interpretation or SL7 in Mathematics Analysis and Approaches plus HL6 in one of physics or chemistry"

---

## 23. Chemical Engineering with Environmental Engineering MEng (Hons)

**Fields**
1. **Title:** "Chemical Engineering with Environmental Engineering MEng (Hons)"
2. **UCAS code:** H8H2
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAA`**
6. **Required subjects:** "A in mathematics and A in either chemistry or physics"
7. **Cross-subject rules:** A in maths AND A in (chemistry OR physics)
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required A. **Chemistry:** A, one of two. **Physics:** A, the alternative
10. **Accepted alternatives:** chemistry or physics only. **NOT accepted:** "General studies, critical studies, citizenship studies, global perspectives and research, thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A in mathematics and A in either chemistry or physics"
19. **Study options:** a separate "including an Industrial Year" MEng exists with its own UCAS code
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Chemical-Engineering-with-Environmental-Engineering-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UCHENV.

**IB:** 34 points overall or 666 in 3 Higher Level Certificates; one of HL6 Mathematics Analysis and Approaches, HL6 Mathematics Applications and Interpretation or SL7 Mathematics Analysis and Approaches plus HL6 in physics or chemistry

---

## 24. Product Design and Manufacture BEng (Hons)

> Lowest offer in the Engineering set.

**Fields**
1. **Title:** "Product Design and Manufacture BEng (Hons)"
2. **UCAS code:** H700
3. **Award:** BEng Hons
4. **Duration:** "3 years full-time"
5. **Standard A-Level offer:** **`ABB`**
6. **Required subjects:** "B in maths is required" — subject-specific minimum **grade B** in maths
7. **Cross-subject rules:** only maths is mandatory. Desirable-but-not-required: "Art or design and technology are also desirable as second subjects for the course but are not required"
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required, grade B. **Physics:** NOT MENTIONED / not required. **Chemistry:** NOT MENTIONED / not required
10. **Accepted alternatives:** n/a — no second subject is required. Art and design and technology are flagged desirable only. **NOT accepted:** "General studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — "usually one grade lower than the advertised entry requirements" (standard); "usually two grades lower" (enhanced)
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "B in maths is required. Art or design and technology are also desirable as second subjects for the course but are not required"
19. **Study options:** separate pages/codes exist for "including an Industrial Year" BEng and "including an Integrated Study Abroad Year" BEng
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Product-Design-and-Manufacture-BEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U6UPDMAN.

**IB:** "30 points overall or 655 in 3 Higher Level Certificates"; "One of HL5 in Mathematics: Analysis and Approaches, HL5 in Mathematics: Applications and Interpretation or SL7 in Mathematics: Analysis and Approaches"

**Portfolio:** NOT PUBLISHED — explicitly none mentioned (contrast with Architecture and Environmental Design)

---

## 25. Product Design and Manufacture MEng (Hons)

**Fields**
1. **Title:** "Product Design and Manufacture MEng (Hons)"
2. **UCAS code:** H715
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer:** **`AAB`**
6. **Required subjects:** "Maths is required." — no subject-specific grade stated on the MEng (contrast the BEng, which states grade B)
7. **Cross-subject rules:** only maths mandatory. "Art or design and technology are also desirable as second subjects for the course but are not required."
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required, no stated minimum grade. **Physics:** not required. **Chemistry:** not required
10. **Accepted alternatives:** n/a. **NOT accepted (verbatim):** "We do not accept the following A levels: general studies, critical thinking, citizenship studies, CIE global perspectives and research, CIE thinking skills."
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "English grade 4 (C)."
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** not individually verified
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "Maths is required. Art or design and technology are also desirable as second subjects for the course but are not required."
19. **Study options:** separate pages/codes exist for "including an Industrial Year" MEng and "including an Integrated Study Abroad Year" MEng
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Product-Design-and-Manufacture-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UPDMAN.

**IB:** "32 points overall or 665 in 3 Higher Level Certificates" with maths at HL5 or SL7

---

## 26. Architecture and Environmental Design MEng (Hons)

> The only course in scope with a portfolio requirement and an explicit alternative offer string.

**Fields**
1. **Title:** "Architecture and Environmental Design MEng (Hons)" (H1 renders "Architecture and Environmental Design - U7UATTED")
2. **UCAS code:** K230
3. **Award:** MEng Hons
4. **Duration:** "4 years full-time"
5. **Standard A-Level offer (verbatim, do not split):** **`AAA / A*AB including B in mathematics`**
6. **Required subjects:** Mathematics required at minimum **grade B**; three A levels at AAA or A\*AB
7. **Cross-subject rules:** the offer is a two-branch alternative — either AAA or A\*AB — in both cases including at least B in mathematics
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required, grade B minimum. **Physics:** not required at A level (appears only in the GCSE rule). **Chemistry:** not required at A level (appears only in the GCSE rule)
10. **Accepted alternatives:** not specified beyond maths. **NOT accepted:** "General studies, critical studies, citizenship studies, global perspectives and research, thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE:** "Grade 5 (B) in GCSE English, and maths and one of GCSE physics, chemistry, biology, double science, single science" — the strictest GCSE rule in the set
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — "usually one grade lower than the advertised entry requirements" (standard); "usually two grades lower" (enhanced)
16. **Alternative offer routes:** the offer itself carries the alternative "AAA / A\*AB including B in mathematics". No EPQ scheme individually verified on this page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "AAA / A\*AB including B in mathematics"
19. **Study options / additional requirement — PORTFOLIO:** "16 images of your work, from the following four categories" covering hand drawing, photography, 3D work and creative media; "must not include virtual 3D computer aided designs"
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Architecture-and-Environmental-Design-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UATTED.

**IB:** 34 points overall or 666 in 3 HL certificates; "HL5 in Mathematics Analysis and Approaches, HL5 in Mathematics Applications and Interpretation or SL6 in Mathematics Analysis and Approaches"

---

## 27. Engineering and Physical Sciences Foundation (integrated honours programme) MEng (Hons)

> This is the single foundation entry route for the whole faculty. There is **no** "Mechanical Engineering with a foundation year" course.

**Fields**
1. **Title:** "Engineering and Physical Sciences Foundation (integrated honours programme) MEng (Hons)"
2. **UCAS code:** H100
3. **Award:** MEng Hons (integrated honours programme)
4. **Duration:** "1 year full-time" — as printed for the foundation stage; the integrated honours degree that follows extends this
5. **Standard A-Level offer:** **`BBB`**
6. **Required subjects (verbatim):** "A level grades BBB/ABC, including maths and physics if taken" — note the **alternative grade profile ABC** and the conditional "if taken"
7. **Cross-subject rules:** maths and physics are required only **if taken**; the grade profile may be BBB or ABC
8. **Further Mathematics:** NOT MENTIONED
9. **Maths:** required if taken (also a GCSE requirement at grade 6). **Physics:** required if taken (also a GCSE requirement at grade 5). **Chemistry:** not mentioned
10. **Accepted alternatives:** not specified. **NOT accepted:** "General studies, critical studies, citizenship studies, global perspectives and research, thinking skills"
11. **Practical:** NOT PUBLISHED
12. **GCSE (strictest in set):** "GCSE maths grade 6 (B); GCSE physics grade 5 (B) or GCSE science grade 5 (B) and GCSE additional science grade 5 (B); GCSE English grade 4 (C)"
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Contextual offer:** "Contextual offers" — standard one grade lower, enhanced two grades lower
16. **Alternative offer routes:** the offer string itself carries the alternative "BBB/ABC"
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw block:** "A level grades BBB/ABC, including maths and physics if taken"
19. **Study options / progression routes (named within one UCAS application):**
    - Engineering: "Aerospace Engineering"; "Architecture and Built Environment"; "Chemical and Environmental Engineering"; "Civil Engineering"; "Electrical and Electronic Engineering"; "Mechanical, Materials, Manufacturing Engineering"
    - Physical Sciences: "Computer Science"; "Mathematical Sciences"; "Physics and Astronomy"
    - Chosen on successful completion of the foundation year. URL as below.
20. **Provenance:** https://www.nottingham.ac.uk/studywithus/ugstudy/courses/UG/Engineering-and-Physical-Sciences-Foundation-integrated-honours-programme-MEng-Hons.html — **2027 entry panel**, start September 2027. Plan code U7UENGPSF.

**IB:** 28 points overall or 555 in 3 HL certificates; minimum 4 in maths and physics if taken

---

# QUICK REFERENCE — verified offers (2027 entry)

| # | Course | UCAS | Award | Yrs | A-Level offer (verbatim) | Contextual |
|---|---|---|---|---|---|---|
| 1 | Physics | F300 | BSc | 3 | `AAA` | `AAB` |
| 2 | Physics | F303 | MSci | 4 | `AAA` | `AAB` |
| 3 | Physics with Theoretical Physics | F344 | BSc | 3 ⚠️"part-time" | `AAA` | `AAB` |
| 4 | Physics with Theoretical Physics | F340 | MSci | 4 | `AAA` | `AAB` |
| 5 | Physics with Astrophysics | F3F5 | BSc | 3 | `AAA` | `AAB` |
| 6 | Physics with Astrophysics | F3FM | MSci | 4 | `AAA` | `AAB` |
| 7 | Mathematical Physics | F326 | BSc | 3 | `A*AA` | `AAA` |
| 8 | Physics with Computer Science | NOT RETRIEVED | MSci | 5 | NOT RETRIEVED | NOT RETRIEVED |
| 9 | Mechanical Engineering | H302 | BEng | 3 | `AAA` | −1 grade |
| 10 | Mechanical Engineering | H300 | MEng | 4 | `A*AA` | −1 grade |
| 11 | Mech Eng incl Industrial Year | H30A | BEng | 4 | `AAA` | −1 grade |
| 12 | Mech Eng incl Industrial Year | H30C | MEng | 5 | `A*AA` | −1 grade |
| 13 | Mech Eng with Manufacturing | H707 | MEng | 4 | `A*AA` | not transcribed |
| 14 | Aerospace Engineering | H402 | BEng | 3 | `AAA` | −1 grade |
| 15 | Aerospace Engineering | H400 | MEng | 4 | `A*AA` | NOT RETRIEVED |
| 16 | Civil Engineering | H201 | BEng | 3 | `AAB` | −1 grade |
| 17 | Civil Engineering | H200 | MEng | 4 | `AAA` | −1 grade |
| 18 | Electrical and Electronic Eng | H603 | BEng | 3 | `AAB` | −1 grade |
| 19 | Electrical and Electronic Eng | H600 | MEng | 4 | `AAA` | −1 grade |
| 20 | Chemical Engineering | H810 | BEng | 3 | `AAA` | −1 grade |
| 21 | Chemical Engineering | H800 | MEng | 4 | `AAA` | −1 grade |
| 22 | Chem Eng with Environmental Eng | H8HF | BEng | 3 | `AAA` | −1 grade |
| 23 | Chem Eng with Environmental Eng | H8H2 | MEng | 4 | `AAA` | −1 grade |
| 24 | Product Design and Manufacture | H700 | BEng | 3 | `ABB` | −1 grade |
| 25 | Product Design and Manufacture | H715 | MEng | 4 | `AAB` | −1 grade |
| 26 | Architecture and Environmental Design | K230 | MEng | 4 | `AAA / A*AB including B in mathematics` | −1 grade |
| 27 | Engineering and Physical Sciences Foundation | H100 | MEng | 1 (foundation) | `BBB` (BBB/ABC) | −1 grade |

⚠️ Offer strings are transcribed exactly. `AAA`, `A*AA`, `AAB`, `ABB` are distinct — do not normalise.
