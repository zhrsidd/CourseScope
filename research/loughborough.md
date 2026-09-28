# Loughborough University — Undergraduate Admissions Research (Physics & Engineering)

**Target entry year:** 2027 entry
**Research date:** 2026-09-16
**Source policy:** `lboro.ac.uk` only as admissions evidence. Every value below was read from the
fetched official page via WebFetch. No third-party guide, no UCAS listing, no search snippet used as
evidence. No value inferred from a sibling course.

---

## METHOD NOTE — a stale-cache trap that would have produced a wrong answer

Direct `curl` to `www.lboro.ac.uk` is blocked by this environment's egress proxy
(`curl: (56) CONNECT tunnel failed, response 403`), so **all** page reads were done with WebFetch.

**The trap:** the *first* WebFetch of
<https://www.lboro.ac.uk/study/undergraduate/courses/physics-bsc/> (no query string) returned a page
whose fee heading read **"Tuition fees for 2026 entry"** and whose overview read
**"Start date October 2026"**. Re-fetching the identical page with a cache-busting query string
(`?v=2`, and again `?v=3` as a control) returned **"Start date September 2027"** and
**"Fees for 2027-28 (per academic year)"**.

The 2026 render was a stale cached copy, not a live 2026 panel. **Every course figure in this
document was therefore read from a cache-busted URL (`?v=2`), and the entry year was re-confirmed on
each page from its own "Start date" line and fee heading.** Field 20 records, per course, the year
that page's panel actually showed.

---

## THE LOUGHBOROUGH PLACEMENT FINDING (the headline structural result)

**Answer: at Loughborough the placement year is a SEPARATELY CODED UCAS APPLICATION — but both codes
are published on ONE course page, and the choice is made at the point of applying, not later.**

This is a third pattern that matches none of the three options in the brief cleanly, so it is stated
precisely rather than forced into a category.

What the course pages actually print, in the key-facts box at the top of every in-scope course page,
is **two UCAS codes for what is otherwise one course**, each with its own duration label. Physics BSc:

> **F301** — "4 years full-time with placement year"
> **F300** — "3 years full-time"

Physics MPhys:

> **F304** — "5 years full-time with placement year"
> **F303** — "4 years full-time"

So:

- It is **NOT** "part of the normal programme (everyone does it)" — a non-placement code exists on
  every course checked.
- It is **NOT** "an optional route chosen within one UCAS application" — the placement and
  non-placement versions carry **different UCAS codes**, so the applicant selects one *in UCAS*.
- It **IS** "a separately coded UCAS application" — **but** the two codes are not presented as two
  separate courses. They sit in a single key-facts box on a single course page under a single course
  title, with a single shared entry-requirements panel. There is **one** "Typical A level offer" per
  course page, applying to both codes; Loughborough does **not** publish a different offer for the
  placement code.

**Consequence for data modelling:** these should be modelled as **one course record with two UCAS
codes / two duration options**, not as two independent course records with independently-sourced
entry requirements — because the entry requirements are published once and shared.

**What is NOT published:** no in-scope course page states whether a student may transfer between the
placement and non-placement code after enrolling. The central placements page
(<https://www.lboro.ac.uk/study/undergraduate/placements-careers/placements/>) says only:

> "Whatever you choose to study, you can incorporate a placement year into your undergraduate degree."

and does **not** address UCAS codes, applying, or switching. The UCAS-application FAQ page
(<https://www.lboro.ac.uk/study/undergraduate/apply/faqs/>) does not address it either. So
transferability is **NOT PUBLISHED** on the pages in scope, not "not allowed".

**Study abroad is a different mechanism from placement.** On every in-scope page it is described as
an *option within the course* with **no separate UCAS code published**, leading to a
**Diploma in International Studies (DIntS)**. The placement year leads to a
**Diploma in Professional Studies (DPS)** or **Diploma in Industrial Studies (DIS)**.

---

## CENTRAL POLICY PAGES (apply across courses — read once, cited per course)

### Reduced contextual offers — "Access Loughborough Contextual Offer"

Source: <https://www.lboro.ac.uk/study/undergraduate/apply/entry-requirements/contextual-admissions/reduced-contextual-offers/>

**⚠️ CYCLE CAVEAT: this policy page self-identifies as the "2026 admissions cycle".** The *figures*
below (the reduced grade strings) come from 2027-dated course pages; the *eligibility rules* are
evidenced only by this 2026-dated page. Flagged, not glossed.

Scheme name, verbatim: **"Access Loughborough Contextual Offer"**.
Reduction, verbatim: **"up to two grades lower than typical entry requirements"**.

Eligibility criteria, verbatim:

> - "You were known to be eligible for Free School Meals (FSM) at the end of Key Stage 4 (Year 11) and/or six years prior to this point (England)"
> - "You were known to be eligible for Free School Meals in the 6 years prior to Year 12 (Northern Ireland)"
> - "You were known to have been eligible for Free School Meals between the start of Year 11 and the January five years prior to this (Wales)"
> - "You are currently in receipt of Free School Meals or Free Meals in Further Education"
> - attending a state school/college AND living "in an area of socio-economic deprivation (England only) defined as Quintile 1 from Index of Multiple Deprivation (IMD) data"

**Separately named additional routes** (recorded separately per the brief):

- **Realising Opportunities (RO)** — participants receive a "dual offer" with a standard offer and an
  alternative RO offer, "up to two grades lower".
- **LUDUS Gold** — participants receive a dual offer with an alternative offer "up to two grades lower".

**NOT PUBLISHED on this page:** care-experienced, refugee, or estranged-student specific offer routes
were not present in the criteria list retrieved.

**Important:** unlike most universities, Loughborough **publishes the actual reduced grade string on
each individual course page**, under the heading "Access Loughborough Contextual Offer". Those
per-course strings are transcribed in field 15 of each course section below and are primary evidence.

### General entry requirements (central)

Source: <https://www.lboro.ac.uk/study/undergraduate/apply/entry-requirements/>
Entry year stated on page: **NOT PUBLISHED** (page does not name a cycle).

- **GCSE**, verbatim: "We normally expect applicants to have a minimum of grade 4/C in GCSE English Language and, for most courses, GCSE grade 4/C in Mathematics."
- **Science practical endorsement**, verbatim: "While we do not widely include the passing of the practical skills element in the conditions of an offer, it is our expectation that this element will be successfully completed."
- **EPQ**, verbatim: "We recognise the benefit of the Extended Project Qualification in developing independent research and critical thinking skills. We would consider these as evidence of motivation to study a specific subject in more depth, and while we do not generally include them as part of our offer conditions, they may be used to further consider an application upon receipt of final examination results."
  → i.e. **the EPQ is explicitly NOT an alternative/reduced offer route at Loughborough**; it is a
  post-results consideration factor only. This contradicts the common assumption that EPQ buys a grade.
- **Further Mathematics:** NOT PUBLISHED on this page.
- **Admissions tests:** NOT PUBLISHED on this page.
- **Interviews:** NOT PUBLISHED on this page.

### Application deadline

Source: <https://www.lboro.ac.uk/study/undergraduate/apply/key-dates/>
Entry year stated on page: **NOT PUBLISHED** (generic Year 12 / Year 13 UCAS timeline, no cycle named).

> "14 January — 2nd UCAS deadline for remaining applications - this is the last point at which a university gives equal consideration to applications"
> "15 October — 1st UCAS deadline for applicants to Oxbridge, medicine, vet science and dentistry"
> "30 June — Last date to submit a late application"

No course-specific deadline is published on any in-scope course page (field 17 below is
NOT PUBLISHED for every course).

---

# PART 1 — PHYSICS

**Shared observations across ALL 10 Physics courses** (each still verified individually below):

- Every page's panel showed **2027 entry** ("Start date: September 2027", "Fees for 2027-28 (per academic year)").
- Every page carries the identical **Selection** paragraph — this is the interview evidence (field 14).
- **No Physics page mentions an admissions test at all.** Per the brief, silence is recorded as
  **NOT STATED**, never as "no admissions test".
- **Further Mathematics is NOT PUBLISHED on any Physics course page** — neither required, nor
  preferred, nor excluded. Not stated at all.
- **Chemistry is NOT PUBLISHED on any Physics course page** — it is not named as accepted,
  required, or excluded.
- **No Physics page publishes an excluded-subjects list.**
- The MPhys courses sit exactly one grade above their BSc twin (AAA vs AAB), and their contextual
  offer uses a *different grammatical form* (see field 7 warning below).

## ⚠️ The Physics cross-subject trap — BSc and MPhys contextual offers are NOT the same shape

This is the single most misreadable thing in the Loughborough Physics data:

| | BSc contextual string | MPhys contextual string |
|---|---|---|
| wording | `BBB including Maths and Physics` | `ABB including grades AB in any order from Maths and Physics` |
| what it requires | B in Maths **and** B in Physics | an A and a B across Maths/Physics, **either way round** |

The MPhys form ("**including grades AB in any order from Maths and Physics**") is a genuine
cross-subject rule with an order-independence clause. The BSc form has no such clause. **Do not
normalise these two into the same structure.**

---

## 1. Physics BSc (Hons)

1. **Exact official title:** "Physics BSc (Hons) degree"
2. **UCAS code:** **F301** — "4 years full-time with placement year"; **F300** — "3 years full-time" (two codes, one course page)
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time with placement year" / "3 years full-time". Maximum duration: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAB including Maths and Physics` — heading is "Typical A level offer". Not a range or band; a single profile.
6. **Required subjects / subject-specific minimum grade:** Maths and Physics required at A-Level. No individual minimum grade above the headline profile is published — the offer does not say "including A in Maths" or similar. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics" — both required, no "one of X/Y/Z" alternation published.
8. **Further Mathematics:** NOT PUBLISHED (not mentioned anywhere on the page)
9. **Maths / Physics / Chemistry individually:** Maths — required. Physics — required, **but softened**: "Applicants without A level Physics may be considered on a case by case basis". Chemistry — NOT PUBLISHED.
10. **Alternative sciences / excluded subjects:** Accepted alternative sciences: NOT PUBLISHED. Excluded subjects: NOT PUBLISHED. (BTEC route names preferred BTEC subjects — Applied Science or Engineering — but that is a BTEC rule, not an A-Level alternative-science rule.)
11. **Science practical endorsement:** NOT PUBLISHED on the course page. Central policy only (see Central Policy Pages above): "While we do not widely include the passing of the practical skills element in the conditions of an offer, it is our expectation that this element will be successfully completed."
12. **GCSE requirements:** heading "GCSE": `GCSE English Language grade 4/C`. Note: **no GCSE Maths requirement is published on this course page**, although the central page says "for most courses, GCSE grade 4/C in Mathematics".
13. **Admissions test:** **NOT STATED.** The page does not mention an admissions test anywhere. Recorded as not stated, NOT as "no admissions test".
14. **Interview:** **EXPLICITLY ADDRESSED — conditional.** Under heading "Selection", verbatim: "Applicants are usually selected solely on the basis of their UCAS application, but in exceptional cases, an interview may be required. If applicants are made an offer of a place, they will be invited to visit the department giving them the opportunity to meet staff and students, see facilities and get an insight into what it is like to be a student at Loughborough." → interview is *possible but not routine*; the post-offer visit is explicitly **not** a selection interview.
15. **Reduced-offer routes (each recorded separately under Loughborough's own heading):**
    - Heading "**Reduced contextual offer**", verbatim: "Meeting specific eligibility criteria guarantees that if you are made an offer, it will be reduced by up to two grades. Find out more about Access Loughborough Contextual Offers."
    - Heading "**Access Loughborough Contextual Offer**", verbatim: `A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.` (AAB → BBB, a two-grade reduction)
    - Heading "**Contextual admissions**" — general statement that circumstances impacting achievement are considered per the Contextual Admissions Policy.
    - **Realising Opportunities (RO)** — central policy, dual offer "up to two grades lower". Not restated on the course page.
    - **LUDUS Gold** — central policy, dual offer "up to two grades lower". Not restated on the course page.
    - Care-experienced / refugee / estranged specific routes: NOT PUBLISHED.
16. **Alternative offer routes (EPQ etc.):** NOT PUBLISHED on the course page. Central policy explicitly declines to use EPQ in offer conditions (see Central Policy Pages) — so there is **no EPQ grade-reduction route** at Loughborough.
17. **Application deadline:** NOT PUBLISHED on the course page. Central UCAS dates only (14 January equal-consideration deadline).
18. **Contiguous raw requirement block:** the "Typical A level offer" value genuinely appears as one contiguous block:
    > "AAB including Maths and Physics
    >
    > Applicants without A level Physics may be considered on a case by case basis"

    The wider entry-requirements panel is **not** contiguous — it is split across separate sub-headings ("Typical A level offer", "Typical IB offer", "Typical BTEC offer", "GCSE", "Reduced contextual offer", "Selection"), so no larger block is recorded.
19. **Study options / named routes inside the application:**
    - **Placement year** — SEPARATELY CODED (F301 vs F300). Leads to "Diploma in Professional Studies (DPS)" or "Diploma in Industrial Studies (DIS)".
    - **Study abroad** — option within the course, **no separate UCAS code published**. Verbatim: "By choosing this course you'll have the option to take advantage of this exciting opportunity". Leads to "Diploma in International Studies (DIntS)". Length: "The length of a study abroad placement would be confirmed by your School or Department."
20. **Provenance:** sourceUrl <https://www.lboro.ac.uk/study/undergraduate/courses/physics-bsc/> · page title "Physics BSc | Undergraduate study | Loughborough University" · **panel showed 2027 entry** (Start date September 2027; Fees for 2027-28). Read cache-busted; see Method Note — the uncached render served a stale 2026 copy.

---

## 2. Physics MPhys (Hons)

1. **Exact official title:** "Physics MPhys (Hons) degree"
2. **UCAS code:** **F304** — "5 years full-time with placement year"; **F303** — "4 years full-time"
3. **Award:** MPhys (Hons)
4. **Duration:** "5 years full-time with placement year" / "4 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAA including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum grade: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics" — both required.
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened by "Applicants without A level Physics may be considered on a case-by-case basis." Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded subjects:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on course page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`. No GCSE Maths published on the course page.
13. **Admissions test:** **NOT STATED** — no mention anywhere on the page.
14. **Interview:** conditional. "Applicants are usually selected solely on the basis of their UCAS application, but in exceptional cases, an interview may be required."
15. **Reduced-offer routes:**
    - "**Access Loughborough Contextual Offer**", verbatim: `A level: ABB including grades AB in any order from Maths and Physics.` plus "Applicants without A level Physics may be considered on a case by case-basis."
      → **note the order-independence clause, absent from the BSc.** AAA → ABB.
    - Also published: "A level and BTEC Level 3 National Extended Certificate: AB including Maths and Physics, and Distinction."
    - Realising Opportunities (RO) / LUDUS Gold — central policy, "up to two grades lower".
    - Care-experienced / refugee / estranged: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page; central EPQ policy is non-offer-bearing.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAA including Maths and Physics" + "Applicants without A level Physics may be considered on a case-by-case basis." appear as one contiguous A-level block. Wider panel not contiguous.
19. **Study options:** Placement year — SEPARATELY CODED (F304 vs F303), DPS or DIS. Study abroad — option, no separate code, DIntS: "This course comes with the option to study abroad for a year, at the end of which you will gain a Diploma in International Studies (DIntS)."
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/physics-mphys/> · "Physics MPhys | Undergraduate study | Loughborough University" · **2027 entry panel** (September 2027; Fees 2027-28).

---

## 3. Engineering Physics BSc (Hons)

1. **Exact official title:** "Engineering Physics BSc (Hons) degree"
2. **UCAS code:** **F382** — "4 years full-time with placement year"; **F311** — "3 years full-time"
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time with placement year" / "3 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAB including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum grade: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics" — both required.
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened: "Applicants without A level Physics may be considered on a case-by-case basis". Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded subjects:** A-Level alternatives NOT PUBLISHED. Excluded NOT PUBLISHED. **Preferred BTEC subjects ARE published** (see 19): "Preferred BTEC: Applied Science or Engineering (Engineering BTEC includes Engineering, Electrical and Electronic Engineering, Mechanical Engineering, Computer Engineering)."
11. **Science practical endorsement:** NOT PUBLISHED on course page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — "Applicants are usually selected solely on the basis of their UCAS application, but in exceptional cases, an interview may be required."
15. **Reduced-offer routes:**
    - "**Access Loughborough Contextual Offer**", verbatim: `A level: BBB including Maths and Physics` + "(Applicants without A level Physics may be considered on a case by case basis)". AAB → BBB.
    - Also: "A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction."
    - RO / LUDUS Gold — central policy.
    - Care-experienced / refugee / estranged: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page; central EPQ policy non-offer-bearing.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis" — one contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F382 vs F311), DPS or DIS. Study abroad — option, no separate code, DIntS. **This page additionally publishes a "Preferred subjects" section** (unlike Physics BSc/MPhys): "Preferred BTEC: Applied Science or Engineering (Engineering BTEC includes Engineering, Electrical and Electronic Engineering, Mechanical Engineering, Computer Engineering)."
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/engineering-physics-bsc/> · "Engineering Physics BSc | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 4. Engineering Physics MPhys (Hons)

1. **Exact official title:** "Engineering Physics MPhys (Hons) degree"
2. **UCAS code:** **F313** — "5 years full-time with placement year"; **F312** — "4 years full-time"
3. **Award:** MPhys (Hons)
4. **Duration:** "5 years full-time with placement year" / "4 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAA including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened by case-by-case clause. Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — same Selection wording.
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.` AAA → ABB, with order-independence clause. RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAA including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis" — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F313 vs F312), DPS or DIS. Study abroad — option, no separate code, DIntS.
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/engineering-physics-mphys/> · "Engineering Physics MPhys | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 5. Mathematics and Physics BSc (Hons)

1. **Exact official title:** "Mathematics and Physics BSc (Hons) degree"
2. **UCAS code:** **F340** — "4 years full-time with placement year"; **F341** — "3 years full-time"
   ⚠️ note the code ordering is *inverted* relative to Physics BSc (here the lower number is the placement code) — do not infer code roles from numeric order.
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time with placement year" / "3 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAB including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED — notable, since this is a joint Maths degree.
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened: "Applicants without A level Physics may be considered on a case-by-case basis." Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED. Preferred BTEC published (see 19).
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — same Selection wording, including post-offer department visit.
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.` Also "A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction." RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis." — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F340 vs F341), DPS or DIS. Study abroad — option, no separate code, DIntS: "By choosing this course you'll have the option to take advantage of this exciting opportunity…". **Preferred subjects section published:** "Preferred BTEC: Applied Science or Engineering (Engineering BTEC includes Engineering, Electrical and Electronic Engineering, Mechanical Engineering, Computer Engineering)."
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/mathematics-and-physics-bsc/> · "Mathematics and Physics BSc | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 6. Mathematics and Physics MPhys (Hons)

1. **Exact official title:** "Mathematics and Physics MPhys (Hons) degree"
2. **UCAS code:** **F345** — "5 years full-time with placement year"; **F344** — "4 years full-time"
3. **Award:** MPhys (Hons)
4. **Duration:** "5 years full-time with placement year" / "4 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAA including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened by case-by-case clause. Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — same Selection wording.
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: ABB including grades AB in any order from Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.` RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAA including Maths and Physics" + "Applicants without A level Physics may be considered on a case-by-case basis." — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F345 vs F344), DPS. Study abroad — option, no separate code, DIntS: "This course comes with the option to study abroad for a year…". No "Preferred subjects" section published on this page.
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/mathematics-and-physics-mphys/> · "Mathematics and Physics MPhys | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 7. Physics with Computing BSc (Hons)

1. **Exact official title:** "Physics with Computing BSc (Hons) degree"
2. **UCAS code:** **FG34** — "4 years full-time with placement year"; **FG33** — "3 years full-time"
   ⚠️ these are *letter-pair* codes, not F-number codes like the rest of the Physics group.
3. **Award:** BSc (Hons)
4. **Duration:** "4 years full-time with placement year" / "3 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAB including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED. **No Computing/Computer Science A-Level is required** despite the title.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened by case-by-case clause. Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language Grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — same Selection wording.
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.` RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis." — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (FG34 vs FG33). Placement length is published here: "Your placement is spent at one or more organisations over 45 weeks, enabling you to get firsthand experience." Study abroad — option, no separate code, DIntS. No "Preferred subjects" section published.
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/physics-with-computing-bsc/> · "Physics with Computing BSc | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 8. Physics with Computing MPhys (Hons)

1. **Exact official title:** "Physics with Computing MPhys (Hons) degree"
2. **UCAS code:** **F330** — "5 years full-time with placement year"; **F331** — "4 years full-time"
   ⚠️ the BSc uses FG-codes but the MPhys uses F-codes — the pair is not a consistent family.
3. **Award:** MPhys (Hons)
4. **Duration:** "5 years full-time with placement year" / "4 years full-time". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAA including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened by case-by-case clause. Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — same Selection wording.
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: ABB including grades AB in any order from Maths and Physics.` RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAA including Maths and Physics" + "Applicants without A level Physics may be considered on a case-by-case basis." — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F330 vs F331), 45 weeks, DPS. Study abroad — option, no separate code, DIntS.
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/physics-with-computing-mphys/> · "Physics with Computing MPhys | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 9. Physics with Theoretical Physics BSc (Hons)

1. **Exact official title:** "Physics with Theoretical Physics BSc (Hons) degree"
2. **UCAS code:** **F342** — "4 years full-time with placement year"; **F346** — "3 years full-time"
3. **Award:** BSc (Hons)
4. **Duration:** "3 years full-time" / "4 years full-time with placement year". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAB including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED — notable for a theoretical-physics degree.
9. **Maths / Physics / Chemistry:** Maths required. Physics required, softened by case-by-case clause. Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional. Full Selection text including: "If applicants are made an offer of a place, they will be invited to visit the department giving them the opportunity to meet staff and students, see facilities and get an insight into what it is like to be a student at Loughborough."
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: BBB including Maths and Physics. Applicants without A level Physics may be considered on a case-by-case basis.` Also "A level and BTEC Level 3 National Extended Certificate: BB including Maths and Physics, and Distinction." RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAB including Maths and Physics" + "Applicants without A level Physics may be considered on a case-by-case basis." — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F342 vs F346), DPS or DIS. Study abroad — option, no separate code, DIntS.
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/physics-with-theoretical-physics-bsc/> · "Physics with Theoretical Physics BSc | Undergraduate study | Loughborough University" · **2027 entry panel**.

---

## 10. Physics with Theoretical Physics MPhys (Hons)

1. **Exact official title:** "Physics with Theoretical Physics MPhys (Hons) degree"
2. **UCAS code:** **F347** — "5 years full-time with placement year"; **F348** — "4 years full-time"
3. **Award:** MPhys (Hons)
4. **Duration:** "4 years full-time" / "5 years full-time with placement year". Maximum: NOT PUBLISHED
5. **Typical A-Level offer (EXACT):** `AAA including Maths and Physics`
6. **Required subjects:** Maths and Physics. Subject-specific minimum: NOT PUBLISHED.
7. **Cross-subject rules:** "including Maths and Physics".
8. **Further Mathematics:** NOT PUBLISHED
9. **Maths / Physics / Chemistry:** Maths required. Physics required. Chemistry NOT PUBLISHED.
10. **Alternative sciences / excluded:** NOT PUBLISHED / NOT PUBLISHED
11. **Science practical endorsement:** NOT PUBLISHED on page; central policy only.
12. **GCSE:** `GCSE English Language grade 4/C`
13. **Admissions test:** **NOT STATED**
14. **Interview:** conditional — same Selection wording.
15. **Reduced-offer routes:** "**Access Loughborough Contextual Offer**", verbatim: `A level: ABB including grades AB in any order from Maths and Physics` RO / LUDUS Gold central. Care-experienced / refugee: NOT PUBLISHED.
16. **Alternative offer routes:** NOT PUBLISHED on page.
17. **Application deadline:** NOT PUBLISHED
18. **Contiguous raw requirement block:** "AAA including Maths and Physics" — contiguous A-level block.
19. **Study options:** Placement year — SEPARATELY CODED (F347 vs F348), DPS or DIS. Study abroad — option, no separate code, DIntS.
20. **Provenance:** <https://www.lboro.ac.uk/study/undergraduate/courses/physics-with-theoretical-physics-mphys/> · "Physics with Theoretical Physics MPhys | Undergraduate study | Loughborough University" · **2027 entry panel**.

---
