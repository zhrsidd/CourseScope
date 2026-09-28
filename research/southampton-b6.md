# University of Southampton — 2027 Entry (2027/28) — Physics & Engineering Admissions Research

**Target entry year:** 2027 entry (academic year 2027/28)
**Research date:** 2026-09-16
**File status:** SECOND RETRY (batch 6). An earlier attempt concluded that all Southampton
2027/28 entry-requirement panels were JavaScript-gated and that only 2026/27 was retrievable.
**That conclusion is WRONG as of this run** — see SUMMARY.

**Source policy applied.** Only `southampton.ac.uk` pages were used as admissions evidence.
Every value recorded below was read from a page actually fetched with WebFetch. Web search was
used ONLY to locate candidate URLs — no search snippet, third-party guide (The Uni Guide,
Complete University Guide, UCAS listing, Whatuni, Unifrog), mirror, cache or archive copy was
used as evidence anywhere. No access control was bypassed, no credentials used, no paywall
circumvented.

**Transport note.** Raw `curl`/`wget` to `southampton.ac.uk` is blocked by this session's egress
policy (`curl: (56) CONNECT tunnel failed, response 403`). Per the proxy README this is an
organization policy denial and was NOT routed around. All reading was therefore done through
WebFetch, which converts the server-rendered HTML to markdown.

---

# SUMMARY

## HEADLINE: 2027/28 entry requirements ARE retrievable, server-side, from canonical course pages

Southampton course pages under `https://www.southampton.ac.uk/courses/<slug>` render the entry
requirements panel **server-side**, headed verbatim:

> `Entry requirements`
> `For Academic year 202728`

(`202728` is how the site's own year label survives HTML-to-markdown conversion; the slash is
lost.) The Modules section of the same pages independently prints:

> `For entry in academic year 2027 to 2028`

Two independent year labels on the same page both say 2027/28. **No cycle query parameter was
needed.** Route 1 (canonical course page, no query string) is sufficient and is the route used
for every verified course below.

**Critically, the specific page the earlier attempt reported as stuck on 2026/27 —
`/courses/physics-with-astronomy-degree-mphys` — served a clean 2027/28 panel on this run.**
The earlier negative does not reproduce. The most likely explanation is that the site rolled
over to the 2027 cycle between the two runs (or the earlier run hit a stale edge cache).

## Structural surprises found

1. **Shared UCAS codes are real, and Southampton says so in its own page furniture.** See the
   dedicated SHARED-UCAS-CODE FINDING section. F303 and F3FM each carry several *named* MPhys
   degrees; J641 carries Year-2 pathways.
2. **But the sharing is NOT uniform** — several "named variant" physics degrees have their OWN
   distinct codes (F3GC, F3FX, F391, F3QT), and the Aeronautics & Astronautics named streams
   each have their own code (H401, H490, H493, …). A blanket "all named routes share one code"
   claim would be wrong.
3. Southampton's own page `<title>` strings encode the identity data directly, in the form
   `<UCAS code> <award> <course name> <internal programme number> (<duration>)` — e.g.
   `H490 MEng Aeronautics and Astronautics / Aerodynamics 3829 (4 years)`. This is an official
   on-page corroboration of code-to-name mapping and is quoted per course in field 20.
4. Some entry-requirement routes (Access to HE Diploma, Irish Leaving Certificate, Scottish
   Highers, Welsh Baccalaureate, T Level) sit behind a `Show more entry requirements` control
   and are **NOT RETRIEVED** for most courses. Marked as such per course, never guessed.
5. **No admissions test is mentioned on any Southampton Physics or Engineering page read.**
   Southampton also never says "no test is required". That silence is recorded as
   **NOT STATED**, never as "explicitly none".

_(Counts and the full verified/not-retrieved lists are at the END of this file, written last.)_

---

# RETRIEVAL ATTEMPTS

Every route from the brief, with its outcome and the entry year actually seen.

| # | Route | URL(s) tried | Outcome | Entry year the panel showed |
|---|---|---|---|---|
| 0 | Raw HTTP (`curl`) | `https://www.southampton.ac.uk/courses/physics-degree-mphys` | **BLOCKED** by this session's egress policy: `curl: (56) CONNECT tunnel failed, response 403`. Organization policy denial — reported, not routed around. | n/a |
| 1 | **Canonical course page, no query string** (`/courses/<slug>`) | `/courses/physics-degree-mphys` | **SUCCESS.** Full entry-requirements panel server-rendered: A level offer, subject minima, practical endorsement, EPQ offer, contextual offer, IB, GCSE. | **2027/28** — verbatim `For Academic year 202728`; Modules verbatim `For entry in academic year 2027 to 2028` |
| 1b | Canonical course page — the page the earlier run called JS-gated | `/courses/physics-with-astronomy-degree-mphys` | **SUCCESS — earlier negative does NOT reproduce.** Entry requirements content fully present; page does not say JavaScript is required. | **2027/28** — verbatim `For Academic year 202728` and `For entry in academic year 2027 to 2028` |

_(This table is continued and completed at the end of the file, after the course sections.)_

---

# SHARED-UCAS-CODE FINDING

**Question:** does Southampton publish several *named* MPhys / Engineering pathways under ONE
UCAS code, such that they are routes within one application rather than separate courses?

**Answer: YES for some families, NO for others. The picture is mixed and must not be flattened.**

## Evidence A — the F303 family (MPhys Physics)

The canonical page `https://www.southampton.ac.uk/courses/physics-degree-mphys` (panel year
**2027/28**) carries the instruction, verbatim:

> `When you apply use:`
> `UCAS course code: F303`

Its own related-courses listing on the same page assigns **the same code F303** to these
separately *named* MPhys degrees:

| Named degree (as Southampton names it) | UCAS code shown |
|---|---|
| `Physics` (MPhys) | `F303` |
| `Physics with Industrial Placement` (MPhys) | `F303` |
| `Physics with Year of Experimental Research` (MPhys) | `F303` |
| `Particle Physics with Research Year Abroad` (MPhys) | `F303` |

That is **four named MPhys degrees on one code — confirming the earlier hypothesis.**

Independent corroboration from a second official page, the subject listing
`https://www.southampton.ac.uk/study/subjects/physics-astronomy`, which tabulates
`MPhys Physics — UCAS code: F303` and `MPhys Particle Physics with Research Year Abroad —
UCAS code: F303`.

Third corroboration from Southampton's own page `<title>` strings, which encode
`<code> <award> <name> <internal number> (<duration>)`:
`F303 MPhys Physics with Year of Experimental Research 4426 (4 years)`.

**Conclusion: these four are ROUTES WITHIN ONE UCAS APPLICATION (code F303), not four separate
courses.** They should be reported as named study options under a single application.

## Evidence B — the F3FM family (MPhys Physics with Astronomy)

Same two official pages give **F3FM** to two separately named MPhys degrees:

| Named degree | UCAS code shown |
|---|---|
| `Physics with Astronomy` (MPhys) | `F3FM` |
| `Astrophysics with Year Abroad` (MPhys) | `F3FM` |

Corroborated on the subject listing page: `MPhys Physics with Astronomy — UCAS code: F3FM` and
`MPhys Astrophysics with Year Abroad — UCAS code: F3FM`.

**Conclusion: two named MPhys degrees on one code — confirming the earlier hypothesis for F3FM.**

## Evidence C — where the hypothesis FAILS: named physics variants with their OWN codes

The following are **separate UCAS codes and therefore separate applications**, not routes:

| Named degree | Own UCAS code |
|---|---|
| `Physics` (BSc) | `F300` |
| `Physics with Mathematics` (MPhys) | `F3GC` |
| `Physics with Space Science` (MPhys) | `F3FX` |
| `Physics with Artificial Intelligence` (MPhys) | `F391` |
| `Physics with Quantum Science and Technologies` (MPhys) | `F3QT` |

## Evidence D — where the hypothesis FAILS: Aeronautics & Astronautics named streams

The A&A named streams each have a DISTINCT code, per the related-courses list on
`/courses/aeronautics-astronautics-degree-meng` (panel year **2027/28**) and per Southampton's
own page titles:

| Named degree | Own UCAS code | Southampton's own title string |
|---|---|---|
| `Aeronautics and Astronautics` (MEng) | `H401` | `H401 MEng Aeronautics and Astronautics 3825 (4 years)` |
| `Aeronautics and Astronautics` (BEng) | `H422` | `H422 BEng Aeronautics and Astronautics 3810 (3 years)` |
| `Aeronautics and Astronautics / Aerodynamics` (MEng) | `H490` | `H490 MEng Aeronautics and Astronautics / Aerodynamics 3829 (4 years)` |
| `Aeronautics and Astronautics / Spacecraft Engineering` (MEng) | `H493` | `H493 MEng Aeronautics and Astronautics / Spacecraft Engineering 3831 (4 years)` |
| `Mechanical Engineering / Aerospace Engineering` (MEng) | `HH34` | `HH34 MEng Mechanical Engineering / Aerospace Engineering 3844 (4 years)` |

So the A&A "slash" streams are **separate UCAS applications**, despite reading like sub-routes.
_(The Maritime Engineering J641 pathway question is answered in that course's own section.)_

---

# COURSES

## Course 1 — Physics (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Physics` — page title `Physics Degree | MPhys | University of Southampton`
2. **UCAS code:** `F303` — **SHARED CODE covering 4 named MPhys degrees**, see SHARED-UCAS-CODE FINDING.
3. **Award:** `MPhys` / `Master of Physics`
4. **Duration:** `4 years`. Maximum duration: **NOT PUBLISHED** on this page.
5. **Standard A-Level offer — transcribed EXACTLY (not normalised):**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **What the range means:** Southampton gives **no definition** of the `A*AA-AAA` range on this
     page. The only adjacent explanatory sentence is the interview one (`The optional interview may
     lead to a lower offer.`). **Meaning of the range: NOT PUBLISHED — do not infer it.**
   - Note the second variant is a **four-subject** string (`AABB-AABC`), not a three-subject one.
6. **Required subjects + subject minima:** `physics (minimum grade A)`; AND one of
   `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status:** accepted as an **ALTERNATIVE to Mathematics**, not required in
   addition, no separate grade reduction. Verbatim `either mathematics or further mathematics
   (minimum grade A)`.
9. **Maths / Physics / Chemistry individually:**
   - Mathematics — required *unless* Further Mathematics is offered instead; minimum grade `A`
   - Physics — **required**, minimum grade `A`
   - Chemistry — **not mentioned at all**: NOT PUBLISHED as requirement or alternative
10. **Accepted alternative sciences / explicitly NOT accepted:** no alternative-science list is
    published (NOT PUBLISHED). Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed.`
12. **GCSE requirements:** `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED.** Targeted whole-page search for admissions test / entrance test /
    aptitude test / ESAT / PAT / TMUA / written test returned **NO MENTION**. Southampton does **not**
    say a test is not required either. This is *silence* → **NOT STATED**, NOT "explicitly none".
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.** Verbatim:
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
15. **Reduced-offer routes, each under Southampton's OWN heading:**
    - Heading `A-levels contextual offer` → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A).`
    - Heading `International Baccalaureate contextual offer` → standing contextual paragraph only,
      **no numeric reduced IB offer given: NOT PUBLISHED.**
    - Heading `BTEC contextual` → standing paragraph only, **no numeric offer: NOT PUBLISHED.**
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT
      from this page → NOT PUBLISHED here.**
    - Standing contextual paragraph, verbatim: `We are committed to ensuring that all learners with
      the potential to succeed, regardless of their background, are encouraged to apply to study
      with us. The additional information gained through contextual data allows us to recognise a
      learner's potential to succeed in the context of their background and experience. Applicants
      who are highlighted in this way will be made an offer which is lower than the typical offer
      for that programme as follows:`
16. **Alternative offer routes:**
    - Heading `A-levels with Extended Project Qualification` → `If you are taking an EPQ in addition
      to three A levels, you will receive the following offer in addition to the standard A level
      offer: AAA including physics (minimum grade A) and either mathematics or further mathematics
      (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate Diploma` → `Pass, with 38-36 points overall, with 19-18 points
      required at Higher Level, including 6 at Higher Level in mathematics (Analysis and Approaches
      or Applications and Interpretation) and 6 at Higher Level in physics`
    - Foundation-year route, verbatim: `Applicants who have not studied mathematics/further
      mathematics and/or physics at A-level can apply for the Engineering/Physics/Mathematics
      Foundation Year`
    - `Access to HE Diploma`, `Irish Leaving Certificate`, `Scottish Qualification offers`,
      `Welsh Baccalaureate`, `T Level`: behind a `Show more entry requirements` control →
      **NOT RETRIEVED** (not NOT PUBLISHED — they exist, they were not readable).
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** the A-level offer and its `or` alternative appear as one contiguous
    block and are reproduced verbatim in field 5. The wider requirements panel is split into
    separate headed sub-blocks, so no single larger contiguous block is claimed.
19. **Study options / named routes inside ONE UCAS application (F303):** `Physics`,
    `Physics with Industrial Placement`, `Physics with Year of Experimental Research`,
    `Particle Physics with Research Year Abroad`.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-degree-mphys` ·
    page title `Physics Degree | MPhys | University of Southampton` ·
    **entry year the panel showed: 2027/28**, verbatim `For Academic year 202728`, corroborated by
    Modules label `For entry in academic year 2027 to 2028`.

---

## Course 2 — Physics (BSc) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Physics (BSc)` — page title `Physics Degree (Hons) | BSc | University of Southampton`
2. **UCAS code:** `F300`. No shared-code wording on this page — **own code, own application.**
3. **Award:** `BSc` / `Bachelor of Science`
4. **Duration:** `3 years`. Maximum duration: **NOT PUBLISHED**.
5. **Standard A-Level offer — transcribed EXACTLY:**
   - `AAA-AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - A four-subject alternative string is also served on the page; the retrieved rendering was
     `AABC including physics (minimum grade A) and either mathematics or further mathematics
     (minimum grade A)` with a further variant `ABBC including grades AB in physics and either
     mathematics or further mathematics`. **See the re-verification note in RETRIEVAL ATTEMPTS —
     the exact pairing of these two four-subject strings to headings was re-checked separately;
     treat the three-subject string `AAA-AAB` as the confirmed standard offer.**
   - **Meaning of the `AAA-AAB` range: NOT PUBLISHED.**
   - Cross-check: the official subject listing page independently tabulates
     `BSc Physics — Typical offer: AAA-AAB`.
6. **Required subjects + minima:** `physics (minimum grade A)` and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status:** alternative to Mathematics, not additional, no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; **Chemistry not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** no alternative-science list → NOT PUBLISHED.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed.`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION found; Southampton does not say none is required.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.** Verbatim:
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
15. **Reduced-offer routes under Southampton's own headings:**
    - Heading `A-levels contextual offer` → `ABB including grades AB in physics and either mathematics or further mathematics.`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A) plus grade A in the EPQ`
    - `International Baccalaureate` → `36-34 points overall with 18-17 points at Higher Level, including 6 at Higher Level in Mathematics and 6 at Higher Level in Physics`
    - `BTEC (RQF)` → `D in the BTEC Extended Certificate plus grades AA from two A-levels including physics and either mathematics or further mathematics.`
    - Behind `Show more entry requirements` → `Access to HE Diploma`, `Irish Leaving Certificate`,
      `Scottish Qualification offers`, `Welsh Baccalaureate`, `T Level`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's `AAA-AAB …` string is contiguous; no larger contiguous block claimed.
19. **Study options / named routes inside one application:** none published for F300 — **NOT PUBLISHED.**
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-degree-bsc` ·
    page title `Physics Degree (Hons) | BSc | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` + `For entry in academic year 2027 to 2028`.

---

## Course 3 — Aeronautics and Astronautics (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Aeronautics and Astronautics (MEng)` — page title
   `Aeronautics and Astronautics | MEng | University of Southampton`; Southampton's own listing
   title string `H401 MEng Aeronautics and Astronautics 3825 (4 years)`
2. **UCAS code:** `H401`. No shared-code wording — **own code, own application.**
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
   — a **single string `A*AA`, not a range.** Do not normalise to `AAA`.
6. **Required subjects + minima:** `mathematics (minimum grade A)` **and** `physics (minimum grade A)`
   — both required (contrast with Physics degrees, where Further Maths may substitute for Maths).
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NOT MENTIONED on this page → NOT PUBLISHED.** Further Maths is
   neither required nor named as a substitute for Mathematics here.
9. **Maths / Physics / Chemistry:** Mathematics **required**, min `A`; Physics **required**, min `A`;
   Chemistry **not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** no alternative-science list → NOT PUBLISHED.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `with a pass in the physics Practical (where it is separately endorsed)` — embedded in the offer string itself.
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — no mention of any test.
14. **Interview: NOT STATED** — **no interview mention at all on this page.** Note this DIFFERS from
    the Physics pages, which explicitly offer an optional offer-reducing interview. Southampton does
    not say "no interview" here, so this is silence → NOT STATED.
15. **Reduced-offer routes under Southampton's own heading:**
    - `Contextual offer` → `AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed) plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics`
    - `BTEC (RQF)` → `D in the BTEC National Extended Certificate plus grades A*A in A-level mathematics and physics` **or** `D* in the BTEC National Extended Certificate plus grades AA in A-level mathematics and physics`
    - Other routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** the offer string in field 5 is genuinely contiguous (offer + subject
    minima + practical endorsement in one sentence). No larger block claimed.
19. **Study options / named routes inside one application:** **none — the A&A named streams are
    SEPARATE UCAS codes** (`H422` BEng, `H490` /Aerodynamics, `H493` /Spacecraft Engineering,
    `HH34` Mech Eng / Aerospace Eng). See SHARED-UCAS-CODE FINDING, Evidence D.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/aeronautics-astronautics-degree-meng` ·
    page title `Aeronautics and Astronautics | MEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` + `For entry in academic year 2027 to 2028`.

---

## Course 4 — Physics with Astronomy (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL

**This is the page the earlier attempt reported as JavaScript-gated on 2026/27. It is not.**

1. **Official title:** `Physics with Astronomy (MPhys)` — page title `Physics with Astronomy | MPhys | University of Southampton`
2. **UCAS code:** `F3FM` — **SHARED CODE, also covers `Astrophysics with Year Abroad` (MPhys).**
   Note: this page itself carries **no** shared-code explanatory sentence; the sharing is evidenced
   by the related-courses listing on `/courses/physics-degree-mphys` and by the official subject
   listing page. See SHARED-UCAS-CODE FINDING Evidence B.
3. **Award:** `MPhys` / `Master of Physics`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **Meaning of the `A*AA-AAA` range: NOT PUBLISHED.** Only adjacent explanation is the optional-interview sentence.
   - Cross-check: subject listing page tabulates `MPhys Physics with Astronomy — Typical offer: A*AA-AAA`.
6. **Required subjects + minima:** `physics (minimum grade A)`; and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; **Chemistry not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded:
    `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed.`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION on the page; no statement that none is required.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.** Verbatim:
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
15. **Reduced-offer routes under Southampton's own headings:**
    - `A-levels contextual offer` → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A).`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate` → `38-36 points overall, with 19-18 points required at Higher Level, including 6 at Higher Level in mathematics (Analysis and Approaches or Applications and Interpretation) and 6 at Higher Level in physics`
    - `BTEC (RQF)` → `D*-D in the BTEC National Extended Certificate plus grades AA-A*A in A-level physics and A-level mathematics or further mathematics.`
    - Behind `Show more entry requirements`: `Access to HE Diploma`, `Irish Leaving Certificate`,
      `Scottish Qualification offers`, `Welsh Baccalaureate`, `T Level` → **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous. No larger block claimed.
19. **Study options / named routes inside one UCAS application (F3FM):** `Physics with Astronomy`,
    `Astrophysics with Year Abroad`.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-astronomy-degree-mphys` ·
    page title `Physics with Astronomy | MPhys | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` + `For entry in academic year 2027 to 2028`.

---

## Course 5 — Mechanical Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Mechanical Engineering (MEng)` — page title `MEng Mechanical Engineering | University of Southampton`
2. **UCAS code:** `H301`. **Own code** — the Mechanical named streams each have their own code (see field 19).
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
   — a **single string `A*AA`, not a range.**
6. **Required subjects + minima:** `mathematics (minimum grade A)` **and** `physics (minimum grade A)` — both required.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NOT MENTIONED → NOT PUBLISHED.** Not required, and not named as a
   substitute for Mathematics or Physics on this page.
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`; Physics **required** min `A`;
   Chemistry **not mentioned → NOT PUBLISHED** (contrast Maritime Engineering, which does accept Chemistry).
10. **Alternative sciences / not accepted:** no alternative-science list → NOT PUBLISHED.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `with a pass in the physics Practical (where it is separately endorsed)` — inside the offer string.
12. **GCSE:** `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION anywhere on the page. Southampton does not say "no
    interview"; recorded as silence.
15. **Reduced-offer routes:**
    - `Contextual offer` → `AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed) plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics (Analysis and Approaches) or 7 at Higher Level in Mathematics (Applications and Interpretation)`
      — note the **different HL Maths grade depending on which IB Maths route** is taken.
    - `BTEC` → `D`/`D*` in Extended Certificate or Diploma variants plus A-level mathematics and
      physics. **The exact BTEC grade strings were only summarised in the retrieval and are recorded
      here as NOT RETRIEVED at verbatim precision** — do not import an exact BTEC string for this course.
    - Other routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer sentence is genuinely contiguous. No larger block claimed.
19. **Study options / named routes — these are SEPARATE UCAS codes, i.e. separate applications, NOT
    routes within one application:**
    | Named degree | Own UCAS code |
    |---|---|
    | `BEng Mechanical Engineering` | `H300` |
    | `MEng Mechanical Engineering` | `H301` |
    | `MEng Mechanical Engineering / Aerospace Engineering` | `HH34` |
    | `MEng Mechanical Engineering / Automotive Engineering` | `H390` |
    | `MEng Mechanical Engineering / Biomedical Engineering` | `4R29` |
    | `MEng Mechanical Engineering / Manufacturing` | `HH38` |
    | `MEng Mechanical Engineering / Mechatronics` | `HH37` |
    | `MEng Mechanical Engineering / Sustainable Energy Systems` | `HH32` |
    Plus a placement variant, verbatim from the page:
    `Course name: Mechanical Engineering with Industrial Placement Year UCAS code: 30HH`
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/mechanical-engineering-degree-meng` ·
    page title `MEng Mechanical Engineering | University of Southampton` ·
    **entry year shown: 2027/28**, the A-level offer being served under the 2027–28 academic-year label.

---

## Course 6 — Electrical and Electronic Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Electrical and Electronic Engineering (MEng)` — page title `Electrical & Electronic Engineering | MEng | University of Southampton`
2. **UCAS code:** `H602`. Own code. A separate named variant `Electrical and Electronic Engineering
   with Industrial Studies` carries its own code `HH60`.
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A)`
   — single string `A*AA`, not a range.
6. **Required subjects + minima:** `mathematics (minimum grade A)` **and** ONE of
   `physics, further mathematics, electronics or computer science (minimum grade A)`.
   **This is the widest second-subject list of any course read** — Physics is NOT compulsory here.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status: EXPLICITLY ACCEPTED as the second subject**, i.e. as an alternative
   to Physics / Electronics / Computer Science — **not** as a substitute for Mathematics (Mathematics
   is separately required). No grade reduction for taking it.
9. **Maths / Physics / Chemistry:**
   - Mathematics — **required**, min `A`, and cannot be replaced by Further Mathematics here
   - Physics — **optional**: one acceptable second subject among four
   - **Chemistry — NOT in the accepted second-subject list.** The list is closed to
     `physics, further mathematics, electronics or computer science`, so Chemistry alone would not
     satisfy it. Recorded as: not accepted as the second subject per the published list.
10. **Accepted alternative sciences:** `physics, further mathematics, electronics or computer science`.
    Explicitly excluded subjects: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.** Notably absent, unlike the
    Mechanical / Aeronautics pages which embed a physics-practical pass in the offer string.
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - `Contextual offer` → `AAB including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A)`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and either physics, further mathematics, electronics or computer science, plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall, 19 at Higher Level`; HL Mathematics `6`
      (Analysis and Approaches) **or** `7` (Applications and Interpretation); HL Physics or Computer Science `6`.
    - `BTEC` → `D in Extended Certificate plus AA from two A-levels`, or `D*` plus `AA` A-levels.
      **Exact BTEC subject wording NOT RETRIEVED at verbatim precision.**
    - Other routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer string is contiguous. No larger block claimed.
19. **Study options / named routes — SEPARATE UCAS codes, separate applications:**
    | Named degree | Own UCAS code |
    |---|---|
    | `BEng Electrical & Electronic Engineering` | `H600` |
    | `MEng Electrical and Electronic Engineering` | `H602` |
    | `MEng Electrical Engineering` | `H601` |
    | `BEng Electronic Engineering` | `H610` |
    | `MEng Electronic Engineering` | `H603` |
    | `MEng Aerospace Electronic Engineering` | `H402` |
    | `Electrical and Electronic Engineering with Industrial Studies` | `HH60` |
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/electrical-electronic-engineering-degree-meng` ·
    page title `Electrical & Electronic Engineering | MEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For entry in academic year 2027 to 2028`.

---

## Course 7 — Maritime Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL — **SIX PATHWAYS, ONE CODE**

1. **Official title:** `Maritime Engineering (MEng)` — page title `Maritime Engineering (Hons) | MEng | University of Southampton`
2. **UCAS code:** `J641` — **ONE code carrying SIX named Year-2 pathways.** See field 19 and the
   SHARED-UCAS-CODE FINDING. (Southampton's own listing title for the BEng sibling is
   `J640 BEng Maritime Engineering 9159 (3 years)`; for this course `J641 MEng Maritime Engineering 9161 (4 years)`.)
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `AAA including mathematics and either physics, chemistry or further mathematics`
   — single string `AAA`, **not** `A*AA` and **not** a range. Do not normalise.
   Note this is a **lower** offer than Mechanical (`A*AA`) and Aeronautics (`A*AA`).
6. **Required subjects + minima:** `mathematics` **and** one of `physics, chemistry or further
   mathematics`. **The standard offer string states no separate per-subject minimum grades** — all
   three grades are `A` in any case. (Per-subject minima DO appear in the contextual and EPQ
   variants: see fields 15 and 16.)
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status: EXPLICITLY ACCEPTED as the second subject**, alternative to Physics
   or Chemistry. Mathematics is separately required. No grade reduction.
9. **Maths / Physics / Chemistry:**
   - Mathematics — **required**
   - Physics — **optional**: one of three acceptable second subjects
   - **Chemistry — EXPLICITLY ACCEPTED** as an alternative second subject. This is the only course
     read so far that names Chemistry as acceptable.
10. **Accepted alternative sciences:** `physics, chemistry or further mathematics`.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.**
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED for standard applicants**, with one qualified mention for mature
    applicants only (`may also be invited`). There is no general selection interview. Recorded as
    NOT STATED for the standard route; mature-applicant interview noted as a conditional possibility.
15. **Reduced-offer routes:**
    - `Contextual offer` → `ABB including mathematics (minimum grade B) and either physics, chemistry or further mathematics`
      — note the contextual route drops the Mathematics minimum to `B`, which is unusual; most other
      Southampton contextual offers hold Mathematics at `A`.
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAB including Mathematics (minimum Grade A) and either physics, chemistry or further mathematics (minimum Grade B) plus grade A in the EPQ`
    - `International Baccalaureate` → `36 points overall with 18 points at Higher Level`, including
      Mathematics and Chemistry or Physics at Higher Level. **Exact HL grade digits NOT RETRIEVED at
      verbatim precision.**
    - `BTEC` → multiple routes with A-level combinations; **exact strings NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer string is contiguous. No larger block claimed.
19. **Study options / named routes INSIDE ONE UCAS APPLICATION (J641) — these are chosen in Year 2,
    NOT applied for separately:**
    1. `Advanced Computational Engineering`
    2. `Marine Engineering and Autonomy`
    3. `Naval Architecture`
    4. `International Naval Architecture`
    5. `Ocean Energy and Offshore Engineering`
    6. `Yacht and High Performance Craft`
    The page states these are all applied for under the one UCAS code `J641`. **This directly
    confirms the "J641 carries six Year-2 pathways" hypothesis.**
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/maritime-engineering-degree-meng` ·
    page title `Maritime Engineering (Hons) | MEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For entry in academic year 2027 to 2028` in the Entry
    requirements section.

---

## Course 8 — Civil Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Civil Engineering (MEng)` — page title `Civil Engineering (Hons) | MEng | University of Southampton`
2. **UCAS code:** `H201`. Own code. Placement variant `Civil Engineering with Industrial Placement Year` = `HH20`.
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
   *(Caveat: the page also carries a stale-looking string `starting September 2023 for 4 years`. The
   two entry-year labels are both 2027/28, so the requirements panel is 2027; the `2023` string is
   noted only so it is not mistaken for a cycle label.)*
5. **Standard A-Level offer — EXACTLY:** `A*AA including mathematics (minimum grade A)`
   — single string `A*AA`, not a range.
6. **Required subjects + minima:** `mathematics (minimum grade A)` **ONLY.**
   **No second science subject is required.** This is materially different from Mechanical,
   Aeronautics, EEE and Maritime, all of which require a second subject.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status: NOT MENTIONED → NOT PUBLISHED.**
9. **Maths / Physics / Chemistry:** Mathematics **required**, min `A`.
   **Physics — not mentioned → NOT PUBLISHED / not required.**
   **Chemistry — not mentioned → NOT PUBLISHED / not required.**
10. **Alternative sciences / not accepted:** no science list published (none needed, since only Maths
    is required) → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.**
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes under Southampton's own heading:**
    - `A-levels contextual offer` → `AAB including mathematics (minimum grade B)`
      (contextual route drops the Mathematics minimum from `A` to `B`).
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics, plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Mathematics (Analysis and Approaches) or 7 at Higher Level in Mathematics (Applications and Interpretation)`
    - `BTEC (RQF)` → multiple combinations, one of which is
      `D in the BTEC National Extended Certificate plus grades A*A from two A-levels`.
      **The remaining BTEC combinations were NOT RETRIEVED at verbatim precision.**
    - Other routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** `A*AA including mathematics (minimum grade A)` is contiguous. No larger block claimed.
19. **Study options / named routes — SEPARATE UCAS codes, separate applications:**
    | Named degree | Own UCAS code |
    |---|---|
    | `Civil Engineering` (BEng) | `H200` |
    | `Civil Engineering` (MEng) | `H201` |
    | `Civil Engineering with Architectural Design` (MEng) | `HK21` |
    | `Civil Engineering with Industrial Placement Year` | `HH20` |
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/civil-engineering-degree-meng` ·
    page title `Civil Engineering (Hons) | MEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` + `For entry in academic year 2027 to 2028`. No 2026/27 label present.

---

## Course 9 — Acoustical Engineering (MEng) — **2027 NOT RETRIEVED (2027/28 tab is EMPTY)**

**This is an honest negative. NOTHING in this section is recorded as a 2027 figure.**

The page carries **two** year labels: `For Academic Year 2026/27` **and** `For Academic Year 2027/28`.
A targeted, year-separating re-read established that:

> the **2026/27** block is the only one containing entry-requirement content; the
> **`For Academic Year 2027/28`** heading is a **tab label with no underlying content** —
> it is an inactive filter option and no requirements are populated under it.

So Southampton has created the 2027/28 slot for this course but **has not published the 2027/28
requirements yet**. This is the JavaScript/empty-tab pattern the earlier attempt described — it is
real, but it applies to *this* course, not to the whole site.

**Year-independent identity fields (safe to record):**
1. **Official title:** `Acoustical Engineering (MEng)` — page title `Acoustical Engineering (Hons) | MEng | University of Southampton`
2. **UCAS code:** `H722`. Placement variant `Acoustical Engineering with Industrial Placement Year` = `FF38`.
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: NOT PUBLISHED.
19. **Study options / named routes:** sibling `BEng Acoustical Engineering` = `HH72` — a **separate
    UCAS code**, i.e. a separate application, not a route.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/acoustical-engineering-degree-meng` ·
    page title `Acoustical Engineering (Hons) | MEng | University of Southampton` ·
    **entry year the requirements panel actually showed: 2026/27.** A `For Academic Year 2027/28`
    tab label exists but renders no content.

**Fields 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 for 2027 entry: NOT RETRIEVED.**

> ### ⚠ QUARANTINE — 2026/27 FIGURES ONLY. **DO NOT IMPORT AS 2027.**
> Recorded solely so a future run can tell whether the 2027/28 values, when published, differ.
> - 2026/27 A-level offer: `AAA including mathematics and another accepted science subject`
> - 2026/27 contextual: `ABB including mathematics (minimum grade B) and another accepted science subject (minimum grade B)`
> - 2026/27 EPQ: `AAB including mathematics (minimum grade A) and another accepted science subject (minimum grade B), plus grade A in the EPQ`
> - 2026/27 accepted science list: `Biology, Chemistry, Physics, Maths, Further Maths, Psychology, Statistics, Environmental Science, Environmental Studies, Geography and Geology`
>   *(This is by far the widest accepted-science list at Southampton — worth re-checking for 2027.)*
> - 2026/27 IB: `36 points overall with 18 points at Higher Level`; BTEC `D in Extended Certificate plus grades AA from two A-levels`
> - 2026/27 admissions test: NO MENTION. 2026/27 interview: NO MENTION.
> **2027 status of every one of the above: NOT RETRIEVED.**

---

## Course 10 — Physics with Mathematics (MPhys) — **2027 NOT RETRIEVED (page serves 2026/27 only)**

**This is an honest negative. NOTHING in this section is recorded as a 2027 figure.**

Every year label on this page is a **2026/27** label — there is no 2027 label at all:
`For Academic Year 2026/27`, `For Academic year 202627`, `For entry in academic year 2026 to 2027`.
Unlike Acoustical Engineering, this page does not even carry a 2027/28 tab label. The page has
**not rolled over to the 2027 cycle.**

**Year-independent identity fields (safe to record):**
1. **Official title:** `Physics with Mathematics (MPhys)` — page title `Physics with Mathematics | MPhys | University of Southampton`; Southampton's own listing title `F3GC MPhys Physics with Mathematics 4407 (4 years)`
2. **UCAS code:** `F3GC` — **its OWN code, not part of the F303 or F3FM shared families.** No shared-code wording on the page.
3. **Award:** `MPhys` / `Master of Physics`
4. **Duration:** `4 years`. Maximum: NOT PUBLISHED.
19. **Study options / named routes inside one application:** none published → NOT PUBLISHED.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-mathematics-degree-mphys` ·
    page title `Physics with Mathematics | MPhys | University of Southampton` ·
    **entry year the requirements panel actually showed: 2026/27** (verbatim `For Academic Year 2026/27`,
    `For Academic year 202627`, `For entry in academic year 2026 to 2027`). **No 2027 content of any kind.**

**Fields 5–18 for 2027 entry: NOT RETRIEVED.**

> ### ⚠ QUARANTINE — 2026/27 FIGURES ONLY. **DO NOT IMPORT AS 2027.**
> - 2026/27 A-level offer: `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)` or `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
> - 2026/27 contextual (`A-levels contextual offer`): `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
> - 2026/27 EPQ: `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
> - 2026/27 IB: `38-36 points overall, with 19-18 points required at Higher Level, including 6 at Higher Level in mathematics and 6 at Higher Level in physics`
> - 2026/27 BTEC: `D*-D in the BTEC National Extended Certificate plus grades AA-A*A in A-level physics and A-level mathematics or further mathematics`
> - 2026/27 GCSE: `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
> - 2026/27 exclusions: `Offers typically exclude General Studies and Critical Thinking`
> - 2026/27 practical: `A pass in the physics Practical exam is required where it is separately endorsed`
> - 2026/27 admissions test: NO MENTION. 2026/27 interview: `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer`
> **2027 status of every one of the above: NOT RETRIEVED.**

---

## Course 11 — Physics with Space Science (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Physics with Space Science (MPhys)` — page title `Physics with Space Science | MPhys | University of Southampton`; Southampton's own listing title `F3FX MPhys Physics with Space Science 4414 (4 years)`
2. **UCAS code:** `F3FX` — **its OWN code**, not part of the F303 / F3FM shared families.
3. **Award:** `MPhys` / `Master of Physics`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **Meaning of the range: NOT PUBLISHED.**
6. **Required subjects + minima:** `physics (minimum grade A)`; and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; **Chemistry not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.**
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer`
15. **Reduced-offer routes:**
    - `A-levels contextual offer` → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate` → `38-36 points overall, with 19-18 points at Higher Level, including 6 at HL in mathematics and 6 at HL in physics`
    - `BTEC` → `D*-D in BTEC National Extended Certificate plus grades AA-A*A in A-level physics and mathematics/further mathematics`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous.
19. **Study options / named routes inside one application:** none published → NOT PUBLISHED.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-space-science-degree-mphys` ·
    page title `Physics with Space Science | MPhys | University of Southampton` ·
    **entry year shown: 2027/28** — entry-requirements section verbatim `For Academic year 202728`;
    Modules verbatim `For entry in academic year 2027 to 2028`. No 2026/27 label present.

---

## Course 12 — Aeronautics and Astronautics (BEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Aeronautics and Astronautics (BEng)` — page title `Aeronautics and Astronautics | BEng | University of Southampton`; Southampton's own listing title `H422 BEng Aeronautics and Astronautics 3810 (3 years)`
2. **UCAS code:** `H422`. Own code, own application.
3. **Award:** `BEng` / `Bachelor of Engineering`
4. **Duration:** `3 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
   — **NOTE: the BEng carries the SAME `A*AA` offer as the MEng (H401).** There is no grade
   reduction for the 3-year route. Do not assume BEng < MEng at Southampton.
6. **Required subjects + minima:** `mathematics (minimum grade A)` **and** `physics (minimum grade A)` — both required.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NO MENTION → NOT PUBLISHED.**
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`; Physics **required** min `A`;
   Chemistry **not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `pass in the physics Practical (where it is separately endorsed)`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - Contextual offer → `AAB including mathematics (minimum grade A) and physics (minimum grade A)`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and physics...plus grade A in the EPQ`
      *(the retrieval returned an ellipsis in the middle; the elided clause is the physics-practical
      wording seen on the MEng sibling. **Treat the exact full EPQ string as NOT RETRIEVED** and do
      not import it verbatim.)*
    - `International Baccalaureate` → `38 points overall with 19 points at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics`
    - `BTEC` → multiple pathways listed with A-level requirements; **exact strings NOT RETRIEVED.**
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer sentence is contiguous.
19. **Study options / named routes:** none within H422 — the A&A named streams are separate codes
    (`H401`, `H490`, `H493`, `HH34`). See SHARED-UCAS-CODE FINDING Evidence D.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/aeronautics-astronautics-degree-beng` ·
    page title `Aeronautics and Astronautics | BEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For entry in academic year 2027 to 2028`. No 2026/27 label present.

---

## Course 13 — Electronic Engineering (BEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Electronic Engineering (BEng)` — page title `Electronic Engineering (Hons) | BEng | University of Southampton`; Southampton's own listing title `H610 BEng Electronic Engineering 4429 (3 years)`
2. **UCAS code:** `H610`. Own code, own application. (MEng sibling `Electronic Engineering` = `H603`.)
3. **Award:** `BEng` / `Bachelor of Engineering`
4. **Duration:** `3 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `AAA including mathematics and either physics, electronics, further mathematics or computer science.`
   — single string `AAA`, **not** `A*AA`, **not** a range. Contrast the MEng EEE sibling at `A*AA`.
6. **Required subjects + minima:** `mathematics` (min grade `A`) **and** ONE of
   `physics, electronics, further mathematics or computer science` (min grade `A`).
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: EXPLICITLY ACCEPTED as the second subject** — an alternative to
   Physics / Electronics / Computer Science, **not** a substitute for Mathematics. No reduction.
9. **Maths / Physics / Chemistry:**
   - Mathematics — **required**, min `A`, not replaceable by Further Mathematics
   - Physics — **optional**, one of four acceptable second subjects
   - **Chemistry — NOT in the accepted second-subject list** (list is closed to
     `physics, electronics, further mathematics or computer science`).
10. **Accepted alternative sciences:** `physics, electronics, further mathematics or computer science`.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.**
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - Contextual offer → `AAC including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A)`
      **Note the unusual contextual string `AAC`** — transcribed exactly, not normalised to `AAB` or `ABB`.
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAB including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate` → `36 points overall with 18 points at Higher Level`, including
      `6 at Higher Level in Mathematics` and `6 at Higher Level in either Physics or Computer Science`
    - `BTEC` → `D in the BTEC National Extended Certificate plus grade A in A-level mathematics and grade A in either physics, further mathematics, electronics or computer science`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer string is contiguous.
19. **Study options / named routes:** none within H610; the ECS family members are separate codes
    (`H600`, `H601`, `H602`, `H603`, `H402`, `HH60`).
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/electronic-engineering-degree-beng` ·
    page title `Electronic Engineering (Hons) | BEng | University of Southampton` ·
    **entry year shown: 2027/28** — entry requirements verbatim `For Academic year 202728`;
    Modules verbatim `For entry in academic year 2027 to 2028`. No 2026/27 label present.

---

## Course 14 — Physics with Artificial Intelligence (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Physics with Artificial Intelligence (MPhys)` — page title `Physics with Artificial Intelligence | MPhys | University of Southampton`; Southampton's own listing title `F391 MPhys Physics with Artificial Intelligence 9431 (4 years)`
2. **UCAS code:** `F391` — **its OWN code**, not part of the F303 / F3FM shared families.
3. **Award:** `MPhys` / `Master of Physics`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **Meaning of the range: NOT PUBLISHED.**
   - *Discrepancy note: the official subject listing page tabulates this course's typical offer as
     `A*AA` (no range), while the course page itself serves `A*AA-AAA`. The COURSE PAGE is the more
     detailed source and is recorded here; the discrepancy is flagged, not silently resolved.*
6. **Required subjects + minima:** `physics (minimum grade A)`; and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; **Chemistry not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.**
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer`
15. **Reduced-offer routes:**
    - `A-levels contextual offer` → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate` → `38-36 points overall, with 19-18 points required at Higher Level, including 6 at Higher Level in mathematics and 6 at Higher Level in physics`
    - `BTEC` → `D*-D in the BTEC National Extended Certificate plus grades AA-A*A in A-level physics and A-level mathematics or further mathematics`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous.
19. **Study options / named routes inside one application:** none published → NOT PUBLISHED.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-artificial-intelligence-masters-mphys` ·
    page title `Physics with Artificial Intelligence | MPhys | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For entry in academic year 2027 to 2028`. No 2026/27 label present.

---

## Course 15 — Electrical and Electronic Engineering (BEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Electrical and Electronic Engineering (BEng)` — page title `Electrical & Electronic Engineering | University of Southampton`; Southampton's own listing title `H600 BEng Electrical and Electronic Engineering 5160 (3 years)`
2. **UCAS code:** `H600`. Own code, own application.
3. **Award:** `BEng` / `Bachelor of Engineering`
4. **Duration:** `3 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `AAA including mathematics and either physics, further mathematics, electronics or computer science`
   — single string `AAA`. Contrast the MEng sibling H602 at `A*AA`.
6. **Required subjects + minima:** `mathematics` (min `A`) **and** one of
   `physics, further mathematics, electronics or computer science`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status: EXPLICITLY ACCEPTED as the second subject**, alternative to
   Physics / Electronics / Computer Science; **not** a substitute for Mathematics. No reduction.
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`, not replaceable by Further Maths;
   Physics **optional** (one of four); **Chemistry NOT in the accepted second-subject list.**
10. **Accepted alternative sciences:** `physics, further mathematics, electronics or computer science`.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.**
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - Contextual offer → `AAC including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A)`
      (the unusual `AAC` string again — transcribed exactly).
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAB including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate` → `36 points overall with 18 points required at Higher Level`.
      **HL subject digits NOT RETRIEVED for this course** (they were retrieved for the H610 sibling but must not be copied across).
    - `BTEC` → `D in the BTEC National Extended Certificate plus grade A in A-level mathematics and grade A in either physics, further mathematics, electronics or computer science`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer string is contiguous.
19. **Study options / named routes:** none within H600; ECS family are separate codes.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/electrical-electronic-engineering-degree-beng` ·
    page title `Electrical & Electronic Engineering | University of Southampton` ·
    **entry year shown: 2027/28** — entry-requirements content located under verbatim
    `For Academic year 202728`; Modules verbatim `For entry in academic year 2027 to 2028`.

---

## Course 16 — Mechanical Engineering (BEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Mechanical Engineering (BEng)` — page title `Mechanical Engineering | BEng | University of Southampton`
2. **UCAS code:** `H300`. Own code, own application.
3. **Award:** `BEng` / `Bachelor of Engineering`
4. **Duration:** `3 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed).`
   — single string `AAA`. Contrast the MEng sibling H301 at `A*AA`.
6. **Required subjects + minima:** `mathematics` (min grade `A`) **and** `physics` (min grade `A`) — both required.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NO MENTION → NOT PUBLISHED.**
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`; Physics **required** min `A`;
   **Chemistry not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `with a pass in the physics Practical (where it is separately endorsed)`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - Contextual offer → `ABB including mathematics (minimum grade A) and physics (minimum grade B), with a pass in the physics Practical`
      **Note: physics minimum drops to `B` on the contextual route while mathematics stays at `A`.**
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAB including mathematics (minimum grade A) and physics (minimum grade A)...plus grade A in the EPQ`
      *(retrieval returned an ellipsis; **exact full EPQ string NOT RETRIEVED** — do not import verbatim.)*
    - `International Baccalaureate` → `36 points overall with 18 points required at Higher Level` with
      specified subject grades; **the HL subject digits were NOT RETRIEVED.**
    - `BTEC` → `D in the BTEC National Extended Certificate plus grades AA in A-level mathematics and physics`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer sentence is contiguous.
19. **Study options / named routes:** none within H300; the Mechanical named streams are separate
    codes (`H301`, `HH34`, `H390`, `4R29`, `HH38`, `HH37`, `HH32`, `30HH`).
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/mechanical-engineering-degree-beng` ·
    page title `Mechanical Engineering | BEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For entry in academic year 2027 to 2028`. No 2026/27 label present.

---

## Course 17 — Maritime Engineering (BEng) — **2027 NOT RETRIEVED (content sits under the 2026/27 tab)**

**Honest negative. NOTHING in this section is recorded as a 2027 figure.**

The page carries **both** `For Academic Year 2026/27` and `For Academic Year 2027/28` tabs, but the
entry-requirement content actually served is under the **`For Academic year 202627`** tab. The
2027/28 tab does not deliver content. **Same empty-2027-tab pattern as Acoustical Engineering.**

Note the contrast with its MEng sibling: **`J641` Maritime Engineering MEng DID serve a 2027/28
panel** (Course 7). Within a single subject family, one sibling has rolled over to 2027 and the
other has not. Cycle rollover at Southampton is **per course page, not site-wide.**

**Year-independent identity fields (safe to record):**
1. **Official title:** `Maritime Engineering (BEng)` — page title `Maritime Engineering Degree | BEng | University of Southampton`; Southampton's own listing title `J640 BEng Maritime Engineering 9159 (3 years)`
2. **UCAS code:** `J640`. Industrial-placement variant = `J60P`.
3. **Award:** `BEng` / `Bachelor of Engineering`
4. **Duration:** `3 years`. Maximum: NOT PUBLISHED.
19. **Study options / named routes:** **NO Year-2 pathways are mentioned on the BEng page** — the
    six named pathways are a feature of the **MEng J641** only. (Placement variant `J60P` is a
    separate code.)
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/maritime-engineering-degree-beng` ·
    page title `Maritime Engineering Degree | BEng | University of Southampton` ·
    **entry year the requirements panel actually showed: 2026/27** (`For Academic year 202627`).
    A `For Academic Year 2027/28` tab label exists but serves no requirements content.

**Fields 5–18 for 2027 entry: NOT RETRIEVED.**

> ### ⚠ QUARANTINE — 2026/27 FIGURES ONLY. **DO NOT IMPORT AS 2027.**
> - 2026/27 A-level offer: `AAB including mathematics (minimum grade A) and either physics, chemistry or further mathematics`
> - 2026/27 contextual (`A-levels contextual offer`): `ABC including Grades A/B in Mathematics and either Physics, Chemistry or Further Mathematics, or BBB including Mathematics and either Physics, Chemistry or Further Mathematics.`
> - 2026/27 EPQ: `ABB including mathematics (minimum grade A) and either physics, chemistry or further mathematics plus grade A in the EPQ`
> - 2026/27 IB: 34 points overall, 17 at Higher Level, Mathematics (either course) 6/7 HL, Chemistry/Physics 5 HL
> - 2026/27 BTEC: `D in Extended Certificate plus AA from 2 A-levels` in required subjects
> - 2026/27 GCSE: `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
> - 2026/27 exclusions: `Offers typically exclude General Studies and Critical Thinking.`
> - 2026/27 practical endorsement: NO MENTION. 2026/27 test: NO MENTION. 2026/27 interview: NO MENTION.
> **2027 status of every one of the above: NOT RETRIEVED.**

---

## Course 18 — Particle Physics with Research Year Abroad (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL — **ROUTE WITHIN F303, NOT A SEPARATE COURSE**

**This page delivers the single most important piece of evidence in this file.** It is a
separately-*named* MPhys degree with its own page, and it instructs the applicant, verbatim:

> `When you apply use:`
> `UCAS course code: F303`
> `UCAS institution code: S27`

`F303` is the **same code** printed on the `Physics` (MPhys) page. So this named degree is a
**route within the F303 application**, not a separate application. See SHARED-UCAS-CODE FINDING.

1. **Official title:** `Particle Physics with Research Year Abroad (MPhys)` — page title `Particle Physics (Research Year) | University of Southampton`
2. **UCAS code:** `F303` — **SHARED with `Physics` (MPhys), `Physics with Industrial Placement`, `Physics with Year of Experimental Research`.** Institution code `S27`.
3. **Award:** `MPhys` / Master of Physics
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **Identical to the F303 `Physics` MPhys offer** — consistent with one shared application.
   - **Meaning of the range: NOT PUBLISHED.**
6. **Required subjects + minima:** `physics (minimum grade A)`; and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; **Chemistry not mentioned → NOT PUBLISHED.**
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NOT RETRIEVED** for this page (not returned in the read; the
    F303 sibling publishes one, but it must not be copied across).
12. **GCSE:** `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.**
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
15. **Reduced-offer routes:** contextual offer → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`.
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
    - IB / BTEC / `Show more entry requirements` routes: **NOT RETRIEVED** for this page.
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous.
19. **Study options / named routes:** this course IS one of the four named routes inside the single
    `F303` application. Siblings: `Physics`, `Physics with Industrial Placement`,
    `Physics with Year of Experimental Research`.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/particle-physics-with-research-year-abroad-degree-mphys` ·
    page title `Particle Physics (Research Year) | University of Southampton` ·
    **entry year shown: 2027/28** — the entry requirements section is headed `Entry Requirements
    (Academic Year 2027-28)`. No 2026/27 content served.

---

## Course 19 — Astrophysics with Year Abroad (MPhys) — **ROUTE WITHIN F3FM · 2027 REQUIREMENTS NOT RETRIEVED (content under 2026/27 tab)**

**Split result — read carefully. The CODE evidence is good; the REQUIREMENTS are 2026/27.**

**The code evidence (year-independent page furniture, safe to record):** this page instructs, verbatim:

> `When you apply use:`
> `UCAS course code: F3FM`
> `UCAS institution code: S27`

`F3FM` is the **same code** printed on the `Physics with Astronomy` (MPhys) page. So
`Astrophysics with Year Abroad` is a **route within the F3FM application**, not a separate
application. This confirms the F3FM half of the identity question from the page's own wording.

**The requirements evidence is NOT usable for 2027.** The page carries both an
`Academic Year 2026/27` and an `Academic Year 2027/28` tab, and the entry-requirements content is
held under the **2026/27** tab.

**Year-independent identity fields (safe to record):**
1. **Official title:** `Astrophysics with Year Abroad (MPhys)` — page title `Astrophysics with Year Abroad | MPhys | University of Southampton`
2. **UCAS code:** `F3FM` — **SHARED with `Physics with Astronomy` (MPhys).** Institution code `S27`.
3. **Award:** `MPhys` / Master of Physics
4. **Duration:** `4 years`. Maximum: NOT PUBLISHED.
19. **Study options / named routes:** this course IS one of the two named routes inside the single
    `F3FM` application, alongside `Physics with Astronomy`.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/astrophysics-with-year-abroad-degree-mphys` ·
    page title `Astrophysics with Year Abroad | MPhys | University of Southampton` ·
    **entry year the requirements panel actually showed: 2026/27.** A 2027/28 tab exists but the
    requirements content sits under 2026/27.

**Fields 5–18 for 2027 entry: NOT RETRIEVED.**

> ### ⚠ QUARANTINE — 2026/27 FIGURES ONLY. **DO NOT IMPORT AS 2027.**
> - 2026/27 A-level offer: `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)` or `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
> - 2026/27 contextual: `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
> - 2026/27 EPQ: `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
> - 2026/27 GCSE: `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
> - 2026/27 exclusions: `Offers typically exclude General Studies and Critical Thinking`
> - 2026/27 IB: `38-36 points`, HL requirements specified. 2026/27 test: NO MENTION.
> - 2026/27 interview: `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
> **2027 status of every one of the above: NOT RETRIEVED.**

---

## Course 20 — Electronic Engineering (MEng) — **2027 NOT RETRIEVED (content under 2026/27 tab)**

**Honest negative. NOTHING here is recorded as a 2027 figure.**

The page carries both `For Academic Year 2026/27` and `For Academic Year 2027/28` tabs, with the
entry requirements displayed under the **2026/27** tab. Note the contrast: its BEng sibling
**`H610` DID serve a 2027/28 panel** (Course 13). Rollover is per page, not per family.

**Year-independent identity fields (safe to record):**
1. **Official title:** `Electronic Engineering (MEng)` — page title `Electronic Engineering | MEng | University of Southampton`
2. **UCAS code:** `H603`. Own code, own application.
3. **Award:** `MEng` / Master of Engineering
4. **Duration:** `4 years`. Maximum: NOT PUBLISHED.
19. **Study options / named routes:** none within H603; ECS family are separate codes
    (`H600`, `H601`, `H602`, `H610`, `H402`, `HH60`).
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/electronic-engineering-degree-meng` ·
    page title `Electronic Engineering | MEng | University of Southampton` ·
    **entry year the requirements panel actually showed: 2026/27.**

**Fields 5–18 for 2027 entry: NOT RETRIEVED.**

> ### ⚠ QUARANTINE — 2026/27 FIGURES ONLY. **DO NOT IMPORT AS 2027.**
> - 2026/27 A-level offer: `A*AA including mathematics (minimum grade A) and either physics, further mathematics, electronics or computer science (minimum grade A)`
> - 2026/27 contextual: `AAB including mathematics (minimum grade A) and either physics, electronics, further mathematics or computer science (minimum grade A)`
> - 2026/27 EPQ: `AAA including mathematics and either physics, further mathematics, electronics or computer science, plus grade A in the EPQ`
> - 2026/27 IB: `38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Mathematics and 6 at Higher Level in Physics or Computer Science`
> - 2026/27 GCSE: `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
> - 2026/27 exclusions: `Offers typically exclude General Studies and Critical Thinking.`
> - 2026/27 practical endorsement: NO MENTION. 2026/27 test: NO MENTION. 2026/27 interview: NO MENTION.
> **2027 status of every one of the above: NOT RETRIEVED.**

---

## Course 21 — Biomedical Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Biomedical Engineering (MEng)` — page title `MEng Biomedical Engineering | University of Southampton`; Southampton's own listing title `BB97 MEng Biomedical Engineering 9038 (4 years)`
2. **UCAS code:** `BB97`. Own code, own application.
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and either biology, chemistry or physics (minimum grade A)`
   — single string `A*AA`, not a range.
6. **Required subjects + minima:** `mathematics (minimum grade A)` **and** one of
   `biology, chemistry or physics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NO MENTION → NOT PUBLISHED.** Notably, Further Mathematics is
   **absent** from the accepted second-subject list here, unlike the ECS and Maritime courses.
9. **Maths / Physics / Chemistry:**
   - Mathematics — **required**, min `A`
   - Physics — **optional**: one of three acceptable second subjects
   - **Chemistry — EXPLICITLY ACCEPTED** as an alternative second subject
10. **Accepted alternative sciences:** `biology, chemistry or physics`. **Biology is explicitly
    accepted here** — the only Engineering course read that accepts Biology.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.**
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - `A-levels contextual offer` → `AAB including mathematics (minimum grade A) and either biology, chemistry or physics`
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and either biology, chemistry or physics, plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall with 19 points required at Higher Level`.
      **HL subject digits NOT RETRIEVED.**
    - `BTEC` → multiple tiers: `D` in Extended Certificate plus `AA`/`A*A` in A-levels; `D*` plus `AA`
      in A-levels. **Exact subject wording NOT RETRIEVED.**
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NO MENTION → NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer string is contiguous.
19. **Study options / named routes — SEPARATE UCAS codes, separate applications.** From the official
    Biomedical engineering subject listing page:
    | Named degree | Own UCAS code | Duration |
    |---|---|---|
    | `MEng Biomedical Engineering` | `BB97` | 4 years |
    | `BEng Biomedical Engineering` | `BB95` | 3 years |
    | `MEng Biomedical Engineering with Industrial Studies` | `BB98` | 5 years |
    | `BEng Biomedical Engineering (Mechanics and Materials)` | `H625` | 3 years |
    | `MEng Biomedical Engineering (Mechanics and Materials)` | `H619` | 4 years |
    | `BEng Biomedical Engineering (Mechanics and Materials) with Industrial Placement Year` | `H675` | 4 years |
    | `MEng Biomedical Engineering (Mechanics and Materials) with Industrial Placement Year` | `H674` | 5 years |
    **Caveat: that subject listing page carries NO academic-year label, so the typical-offer figures
    it shows for the OTHER codes are NOT year-confirmed and are NOT recorded as 2027 anywhere in
    this file. Only the codes and titles are taken from it.**
    *Naming note: Southampton now routes the URL `/courses/biomedical-electronic-engineering-degree-meng`
    to the Biomedical engineering subject page. There is no current standalone "Biomedical Electronic
    Engineering" undergraduate course page; the only such document found was a 2020-21 programme
    specification PDF. Treat "Biomedical Electronic Engineering" as a RETIRED title.*
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/biomedical-engineering-degree-meng` ·
    page title `MEng Biomedical Engineering | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` under the `Entry requirements` heading.

---

## Course 22 — Physics with Year of Experimental Research (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL — **ROUTE WITHIN F303**

**Third independent confirmation of the F303 shared code**, from the page's own application block:

> `When you apply use:`
> `UCAS course code: F303`
> `UCAS institution code: S27`

1. **Official title:** `Physics with Year of Experimental Research (MPhys)` — page title `Physics with Experimental Research Year | University of Southampton`; Southampton's own listing title `F303 MPhys Physics with Year of Experimental Research 4426 (4 years)`
2. **UCAS code:** `F303` — **SHARED.** Institution code `S27`.
3. **Award:** `MPhys` / Master of Physics
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - Identical to the other F303 routes, as expected for one shared application.
   - **Meaning of the range: NOT PUBLISHED.**
6. **Required subjects + minima:** `physics (minimum grade A)`; and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; Chemistry not mentioned → NOT PUBLISHED.
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NOT RETRIEVED** on this read.
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.**
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
15. **Reduced-offer routes:** contextual → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`.
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:** EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`.
    IB / BTEC / `Show more` routes: **NOT RETRIEVED** on this read.
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous.
19. **Study options / named routes:** one of the four named routes inside the single `F303` application.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-year-of-experimental-research-degree-mphys` ·
    page title `Physics with Experimental Research Year | University of Southampton` ·
    **entry year shown: 2027/28** — `For Academic year 2027-28`, under the `Entry requirements` heading.

---

## Course 23 — Acoustical Engineering (BEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

**Important contrast:** the **BEng (`HH72`) 2027/28 tab IS populated**, while its **MEng sibling
(`H722`) 2027/28 tab is EMPTY** (Course 9). **Do NOT infer the MEng 2027 offer from this page.**

1. **Official title:** `Acoustical Engineering (BEng)` — page title `Acoustical Engineering (Hons) | BEng | University of Southampton`
2. **UCAS code:** `HH72`. Own code, own application.
3. **Award:** `BEng` / `Bachelor of Engineering`
4. **Duration:** `3 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `AAB including mathematics and another accepted science subject`
   — single string `AAB`, not a range. **The lowest standard A-level offer of any course verified in
   this file.**
6. **Required subjects + minima:** `mathematics` **and** `another accepted science subject`.
   **No per-subject minimum grade is stated in the standard offer string** → per-subject minima
   NOT PUBLISHED for the standard route.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: ACCEPTED, but only as a member of the accepted-science list**
   (see field 10). Not required, no reduction, and not a substitute for Mathematics.
9. **Maths / Physics / Chemistry:**
   - Mathematics — **required**; no separate minimum grade published for the standard offer
   - Physics — **optional**: one member of the accepted-science list
   - **Chemistry — EXPLICITLY ACCEPTED**: one member of the accepted-science list
10. **Accepted alternative sciences — the FULL list, verbatim:**
    `Biology, Chemistry, Physics, Maths, Further Maths, Psychology, Statistics, Environmental Science, Environmental Studies, Geography and Geology.`
    **This is by far the widest accepted-science list at Southampton** — it admits Psychology,
    Statistics, Geography and Geology, which no other course read accepts.
    Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NO MENTION → NOT PUBLISHED.**
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:**
    - Contextual offer → `BBB including mathematics and another accepted science subject`
      — **`BBB`, the lowest contextual offer found anywhere in this file.**
    - **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `ABB including mathematics and another accepted science subject, plus grade A in the EPQ`
    - `International Baccalaureate` → `34 points overall with 17 points at Higher Level`, including a
      `minimum of 5 at Higher Level in Mathematics` and a `minimum of 5 at Higher Level in another accepted science subject.`
    - `BTEC (RQF)` → `D in the BTEC National Extended Certificate plus grades AA from two A-levels.`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** `AAB including mathematics and another accepted science subject` is contiguous.
19. **Study options / named routes:** none within HH72. Siblings are separate codes: MEng `H722`,
    `Acoustical Engineering with Industrial Placement Year` `FF38`.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/acoustical-engineering-degree-beng` ·
    page title `Acoustical Engineering (Hons) | BEng | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` under the entry requirements
    section; the 2027/28 tab is the active, populated one.

---

## Course 24 — Aeronautics and Astronautics / Aerodynamics (MEng) — **YEAR AMBIGUOUS ON FIRST READ → see re-verification below**

1. **Official title:** `Aeronautics and Astronautics / Aerodynamics (MEng)` — page title `Aerodynamics | Aeronautics & Astronautics | University of Southampton`; Southampton's own listing title `H490 MEng Aeronautics and Astronautics / Aerodynamics 3829 (4 years)`
2. **UCAS code:** `H490`, printed verbatim as `When you apply use: UCAS course code: H490` —
   **its own code, a separate application, NOT a route inside H401.**
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
20. **Provenance / year:** sourceUrl `https://www.southampton.ac.uk/courses/aeronautics-astronautics-aerodynamics-degree-meng`.
    The first read reported that **both** `For Academic Year 2026/27` and `For Academic Year 2027/28`
    tabs exist but described the content only as sitting under the `UK students` tab — i.e. **it did
    not establish which YEAR block the requirements came from.** Because that is ambiguous, the
    requirement values from that read are **NOT recorded as 2027** here. See the re-verification
    result appended below under the heading "Course 24 — re-verification".

**Fields 5–18: pending re-verification — see below.**

---

## Course 24 — re-verification — Aeronautics and Astronautics / Aerodynamics (MEng) — **NOW VERIFIED ON A CONFIRMED 2027/28 PANEL**

A second, year-targeted read using the cache-busting query string
`?v=2` (brief's route 7) resolved the ambiguity. The read reports, verbatim, that the
entry-requirements content sits under **`For Academic year 202728`**, and that
"These three offers are all presented within the 2027/28 academic year section."

5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
   *(The year-targeted read rendered the tail as `with a pass in the physics Practical`; the first
   read of the same page gave the fuller `(where it is separately endorsed)` clause. Both are the
   same page; the fuller string is recorded, with the truncation noted.)*
6. **Required subjects + minima:** `mathematics (minimum grade A)` **and** `physics (minimum grade A)` — both required.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NO MENTION → NOT PUBLISHED.**
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`; Physics **required** min `A`;
   Chemistry not mentioned → NOT PUBLISHED.
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `pass in the physics Practical (where it is separately endorsed)`
12. **GCSE:** `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:** contextual → `AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and physics, with a pass in the physics Practical (where it is separately endorsed) plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics`
    - `BTEC` → `D in the BTEC National Extended Certificate plus grades A*A in A-level mathematics and physics` (further combinations listed; **exact remaining strings NOT RETRIEVED**).
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer sentence is contiguous.
19. **Study options / named routes:** none within H490 — it IS itself a separately-coded named stream.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/aeronautics-astronautics-aerodynamics-degree-meng` (re-read with `?v=2`) ·
    page title `Aerodynamics | Aeronautics & Astronautics | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728`.

---

## Course 25 — Aeronautics and Astronautics / Spacecraft Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Aeronautics and Astronautics / Spacecraft Engineering (MEng)` — page title `Aerospace Spacecraft Engineering | University of Southampton`; Southampton's own listing title `H493 MEng Aeronautics and Astronautics / Spacecraft Engineering 3831 (4 years)`
2. **UCAS code:** `H493`, printed verbatim as `When you apply use: UCAS course code: H493 / UCAS institution code: S27` — **its own code, a separate application, NOT a route inside H401.**
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical`
6. **Required subjects + minima:** `Mathematics (grade A minimum)`; `Physics (grade A minimum)` — both required.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status: NO MENTION → NOT PUBLISHED.**
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`; Physics **required** min `A`;
   Chemistry not mentioned → NOT PUBLISHED.
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `with a pass in the physics Practical (where it is separately endorsed)`
12. **GCSE:** `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:** contextual → `AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical`
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and physics, plus grade A in the EPQ`
    - `International Baccalaureate` → `38 points overall with 19 points at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics`
    - `BTEC` → multiple pathways (`D`/`D*` in Extended Certificate with A-level requirements);
      **exact strings NOT RETRIEVED.**
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer sentence is contiguous.
19. **Study options / named routes:** none within H493 — it IS itself a separately-coded named stream.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/aeronautics-astronautics-spacecraft-engineering-degree-meng` ·
    page title `Aerospace Spacecraft Engineering | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728` — explicitly identified as the
    year block containing the entry requirements.

---

## Course 26 — Mechanical Engineering / Aerospace Engineering (MEng) — VERIFIED ON A CONFIRMED 2027/28 PANEL

1. **Official title:** `Mechanical Engineering / Aerospace Engineering (MEng)` — page title `Mechanical Aerospace Engineering | University of Southampton`; Southampton's own listing title `HH34 MEng Mechanical Engineering / Aerospace Engineering 3844 (4 years)`
2. **UCAS code:** `HH34`, printed verbatim as `When you apply use: UCAS course code: HH34, UCAS institution code: S27` — **its own code, a separate application.**
3. **Award:** `MEng` / `Master of Engineering`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   `A*AA including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical (where it is separately endorsed).`
6. **Required subjects + minima:** `Mathematics: minimum grade A`; `Physics: minimum grade A` — both required.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status: NO MENTION → NOT PUBLISHED.**
9. **Maths / Physics / Chemistry:** Mathematics **required** min `A`; Physics **required** min `A`;
   Chemistry not mentioned → NOT PUBLISHED.
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `Physics Practical: pass (where separately endorsed)`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: NOT STATED** — NO MENTION.
15. **Reduced-offer routes:** contextual → `AAB including mathematics (minimum grade A) and physics (minimum grade A), with a pass in the physics Practical`
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including mathematics and physics, with a pass in the physics Practical…plus grade A in the EPQ`
      *(retrieval returned an ellipsis; **exact full EPQ string NOT RETRIEVED** — do not import verbatim.)*
    - `International Baccalaureate` → `38 points overall with 19 points required at Higher Level, including 6 at Higher Level in Physics and 6 at Higher Level in Mathematics`
    - `BTEC` → accepted with specified A-level mathematics and physics requirements; **exact strings NOT RETRIEVED.**
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer sentence is contiguous.
19. **Study options / named routes:** none within HH34 — it IS itself a separately-coded named stream
    of the Mechanical family.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/mechanical-engineering-aerospace-engineering-degree-meng` ·
    page title `Mechanical Aerospace Engineering | University of Southampton` ·
    **entry year shown: 2027/28** — entry requirements served under the heading
    `Entry Requirements (Academic Year 2027–28)`.

---

## Course 27 — Electrical Engineering (MEng) — **2027 NOT RETRIEVED (content under 2026/27 tab)**

**Honest negative. NOTHING here is recorded as a 2027 figure.**

The entry requirements section displays `For Academic Year 2026/27` with a filter option for
`2027/28`, and the A-level offer appears under the **`For Academic year 202627`** heading.

**Year-independent identity fields (safe to record):**
1. **Official title:** `Electrical Engineering (MEng)` — page title `Electrical Engineering | MEng | University of Southampton`
2. **UCAS code:** `H601`. Own code, own application.
3. **Award:** `MEng` / Master of Engineering
4. **Duration:** `4 years`. Maximum: NOT PUBLISHED.
19. **Study options / named routes:** none within H601; ECS family are separate codes.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/electrical-engineering-degree-meng` ·
    page title `Electrical Engineering | MEng | University of Southampton` ·
    **entry year the requirements panel actually showed: 2026/27.**

**Fields 5–18 for 2027 entry: NOT RETRIEVED.**

> ### ⚠ QUARANTINE — 2026/27 FIGURES ONLY. **DO NOT IMPORT AS 2027.**
> - 2026/27 A-level offer: `A*AA including mathematics (minimum grade A) and either physics, electronics or further mathematics (minimum grade A)`
>   *(note: this course's second-subject list omits `computer science`, unlike H600/H602/H610 — worth re-checking for 2027.)*
> - 2026/27 contextual: `AAB including mathematics (minimum grade A) and either physics, electronics or further mathematics (minimum grade A)`
> - 2026/27 EPQ: `AAA including mathematics and either physics, electronics or further mathematics, plus grade A in the EPQ`
> - 2026/27 IB: `38 points overall with 19 points required at Higher Level`; BTEC: `D` in Extended Certificate plus `A*A` in two A-levels, or `D*` plus `AA`
> - 2026/27 GCSE: `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
> - 2026/27 exclusions: `Offers typically exclude General Studies and Critical Thinking`
> - 2026/27 practical endorsement: NO MENTION. 2026/27 test: NO MENTION. 2026/27 interview: NO MENTION.
> **2027 status of every one of the above: NOT RETRIEVED.**

---

## Course 28 — Physics with Industrial Placement (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL — **ROUTE WITHIN F303**

**Fourth and final independent confirmation of the F303 shared code**, from the page's own block:

> `When you apply use:`
> `UCAS course code: F303`

1. **Official title:** `Physics with Industrial Placement (MPhys)` — page title `Physics with Industrial Placement | MPhys | University of Southampton`
2. **UCAS code:** `F303` — **SHARED.**
3. **Award:** `MPhys` / Master of Physics
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **Meaning of the range: NOT PUBLISHED.**
6. **Required subjects + minima:** `physics (minimum grade A)`; and either `mathematics or further mathematics (minimum grade A)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; Chemistry not mentioned → NOT PUBLISHED.
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement: NOT RETRIEVED** on this read.
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.**
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.`
15. **Reduced-offer routes:** contextual → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`.
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:** EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`.
    IB / BTEC / `Show more` routes: **NOT RETRIEVED** on this read.
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous.
19. **Study options / named routes:** one of the four named routes inside the single `F303` application.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-industrial-placement-degree-mphys` ·
    page title `Physics with Industrial Placement | MPhys | University of Southampton` ·
    **entry year shown: 2027/28.** The read reports **only one** year label on the page,
    `For Academic year 202728`, and that this block contains all entry-requirements content —
    i.e. there is no competing 2026/27 block.

---

## Course 29 — Physics with Quantum Science and Technologies (MPhys) — VERIFIED ON A CONFIRMED 2027/28 PANEL

*(Slug note: `/courses/physics-with-quantum-science-and-technologies-degree-mphys` does NOT resolve —
it redirects to the CourseFinder index. The working slug omits the word "and":
`/courses/physics-with-quantum-science-technologies-degree-mphys`.)*

1. **Official title:** `Physics with Quantum Science and Technologies (MPhys)` — page title `MPhys Physics with Quantum Science | University of Southampton`; Southampton's own listing title `F3QT MPhys Physics with Quantum Science and Technologies 9111 (4 years)`
2. **UCAS code:** `F3QT`, printed verbatim as `When you apply use: UCAS course code: F3QT; UCAS institution code: S27` — **its OWN code**, not part of the F303 / F3FM shared families.
3. **Award:** `MPhys` / `Master of Physics`
4. **Duration:** `4 years`. Maximum: **NOT PUBLISHED.**
5. **Standard A-Level offer — EXACTLY:**
   - `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **or** `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **Meaning of the range: NOT PUBLISHED.**
6. **Required subjects + minima:** `physics (grade A minimum)`; and either `mathematics or further mathematics (grade A minimum)`.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking`
8. **Further Mathematics status:** alternative to Mathematics; not additional; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths substituted, min `A`;
   Physics required, min `A`; Chemistry not mentioned → NOT PUBLISHED.
10. **Alternative sciences / not accepted:** none listed → NOT PUBLISHED. Explicitly excluded: `General Studies and Critical Thinking`.
11. **Science practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed`
12. **GCSE:** `GCSE English language (or GCSE English) (minimum grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — NO MENTION.
14. **Interview: EXPLICITLY STATED — optional, offer-reducing.**
    `Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer`
15. **Reduced-offer routes:** contextual → `AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`.
    **Widening participation / care-experienced / refugee / access-programme headings: ABSENT → NOT PUBLISHED here.**
16. **Alternative offer routes:**
    - EPQ → `AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ`
    - `International Baccalaureate` → `38-36 points overall, with 19-18 points at Higher Level, including 6 at Higher Level in mathematics and 6 at Higher Level in physics`
    - `BTEC` → `D*-D in BTEC National Extended Certificate plus grades AA-A*A in A-level physics and mathematics/further mathematics`
    - Routes behind `Show more entry requirements`: **NOT RETRIEVED.**
17. **Deadline:** NOT PUBLISHED on this page.
18. **Contiguous raw block:** field 5's offer + `or` alternative is contiguous.
19. **Study options / named routes inside one application:** none published → NOT PUBLISHED.
20. **Provenance:** sourceUrl `https://www.southampton.ac.uk/courses/physics-with-quantum-science-technologies-degree-mphys` ·
    page title `MPhys Physics with Quantum Science | University of Southampton` ·
    **entry year shown: 2027/28**, verbatim `For Academic year 202728`.

---

# RETRIEVAL ATTEMPTS — COMPLETE TABLE

Every route from the brief, with outcome and the entry year actually seen.

| # | Route from the brief | What was tried | Outcome | Entry year seen |
|---|---|---|---|---|
| 0 | Raw HTTP | `curl https://www.southampton.ac.uk/...` | **BLOCKED** — `curl: (56) CONNECT tunnel failed, response 403`. Organization egress-policy denial. Reported, **not routed around**. | n/a |
| 1 | **Canonical course pages** `/courses/<slug>` | 29 course pages | **THE ROUTE THAT WORKED.** 23 of 29 served a fully server-rendered 2027/28 entry-requirements panel. No query string needed. | **2027/28** on 23 pages; **2026/27** on 5; empty-2027-tab on 1 |
| 2 | **Course finder / cycle query parameters** | `?academicYear=2027-28` on `/courses/physics-degree-mphys` | Page loads, but the parameter has **no effect** — the page already serves 2027/28 by default and shows no parameter-based year switching. **Route unnecessary.** | 2027/28 |
| 3 | **Department / school course-listing pages** | `/study/subjects/physics-astronomy` | **PARTIAL SUCCESS.** Tabulates per-course `Typical offer`, `Duration` and `UCAS code` for 6 Physics courses — very useful for cross-checking codes and offers. **BUT it carries NO academic-year label**, so its offer figures are **NOT year-confirmed** and were used only to corroborate codes/titles, never as a 2027 source. | **NO YEAR LABEL** |
| 3b | Subject listing (Engineering) | `/courses/biomedical-electronic-engineering-degree-meng` → redirects to the Biomedical engineering subject page | **PARTIAL.** Yielded the full Biomedical code set (BB97, BB95, BB98, H625, H619, H675, H674). Again **no year label** → codes/titles only. | **NO YEAR LABEL** |
| 4 | **Programme specifications / prospectus PDFs** | `site:southampton.ac.uk` search surfaced e.g. `~/assets/doc/specs/F300_BSc_Physics.pdf` (2017-18), `1920-mphys-physics-4413.pdf` (2019-20), `2021-meng-biomedical-electronic-engineering-7015.pdf` (2020-21) | **NOT USED — all are stale cycles (2017-18, 2019-20, 2020-21).** No 2027/28 programme specification or prospectus PDF was found. Since route 1 already delivered 2027/28, these were not needed. | 2017-18 / 2019-20 / 2020-21 — **all rejected** |
| 5 | **Central admissions / entry-requirements policy pages** | Not required — the contextual-offer standing paragraph is reproduced in full on each course page, so per-course capture was complete without a central page. **Not exhaustively tested; flagged as a gap** for WP / care-experienced / refugee policy, which no course page carries. | **GAP — see below** | n/a |
| 6 | **Alternative official representations** | Southampton's own search-result `<title>` strings, of the form `<UCAS code> <award> <name> <internal no.> (<duration>)` | **USEFUL.** Gave an official code↔name↔duration mapping that corroborated the shared-code finding independently of the course pages. | n/a (identity data only) |
| 7 | **Cache-busting query string `?v=2`** | `/courses/aeronautics-astronautics-aerodynamics-degree-meng?v=2` | **SUCCESS AND DECISIVE.** The first read of this page was ambiguous about which year block held the content; the `?v=2` re-read confirmed verbatim `For Academic year 202728`. This route **converted an ambiguous page into a verified 2027 page.** | **2027/28** |
| 8 | Browser automation (alternative transport) | `list_connected_browsers` | No browser connected — route unavailable. Not pursued. | n/a |

## Pages that would NOT yield 2027 data (the honest negatives)

| Course | Code | What the page did | Year the panel showed |
|---|---|---|---|
| Acoustical Engineering (MEng) | `H722` | 2027/28 tab present but **EMPTY** — an inactive label with no content underneath | **2026/27** |
| Physics with Mathematics (MPhys) | `F3GC` | **No 2027 label at all** — page has not rolled over | **2026/27** |
| Maritime Engineering (BEng) | `J640` | Both tabs present; content sits under 2026/27 | **2026/27** |
| Astrophysics with Year Abroad (MPhys) | `F3FM` | Both tabs present; content sits under 2026/27. **Code evidence still valid** (page furniture, not year-gated) | **2026/27** |
| Electronic Engineering (MEng) | `H603` | Both tabs present; content under 2026/27 | **2026/27** |
| Electrical Engineering (MEng) | `H601` | Both tabs present; content under 2026/27 | **2026/27** |

**Their 2026/27 figures are recorded ONLY inside clearly-marked ⚠ QUARANTINE blocks in each course
section, explicitly forbidden from import as 2027.**

## Known gaps — NOT RETRIEVED (distinct from NOT PUBLISHED)

- **`Show more entry requirements` routes** (`Access to HE Diploma`, `Irish Leaving Certificate`,
  `Scottish Qualification offers`, `Welsh Baccalaureate`, `T Level`) are behind an expand control and
  were not read for any course. They **exist**; they were **not retrieved**.
- **Exact BTEC / IB strings** for several Engineering courses came back summarised rather than
  verbatim and are flagged per course as NOT RETRIEVED at verbatim precision.
- **Maximum duration** is not published on any course page read → NOT PUBLISHED, site-wide.
- **Application deadlines** are not published on any course page read → NOT PUBLISHED, site-wide.

## Known gaps — NOT PUBLISHED (Southampton genuinely does not say)

- **Widening participation, care-experienced, refugee and access-programme reduced-offer routes** are
  **absent from every course page read.** Southampton publishes only a generic `contextual offer`
  heading. A central WP/care-experienced policy page was not located and is the single most useful
  follow-up target.
- **The meaning of the offer RANGES** (`A*AA-AAA`, `AAA-AAB`, `AABB-AABC`, `38-36 points`) is nowhere
  defined. The only adjacent explanation on Physics pages is `The optional interview may lead to a
  lower offer.` **Do not infer what the range means.**
- **Admissions tests:** no Southampton Physics or Engineering page read mentions any admissions test,
  and none states that no test is required. Recorded as **NOT STATED** for all 29 courses — never as
  "explicitly none".

---

# FINAL SUMMARY

## Was 2027 data obtained? YES — via route 1, the plain canonical course page.

The earlier attempt's conclusion — that Southampton gates all 2027/28 panels behind JavaScript — is
**wrong as a general claim**, though it correctly described a real pattern that affects a minority of
pages. Southampton renders the 2027/28 entry-requirements panel **server-side** on most course pages,
under the heading `Entry requirements` / `For Academic year 202728`, corroborated by the Modules
label `For entry in academic year 2027 to 2028`. No cycle parameter, no login, no workaround.

**Cycle rollover at Southampton is per-page, not site-wide.** Siblings diverge: `J641` Maritime MEng
serves 2027 while `J640` Maritime BEng does not; `H610` Electronic BEng serves 2027 while `H603`
Electronic MEng does not; `HH72` Acoustical BEng serves 2027 while `H722` Acoustical MEng does not.
**Never infer one sibling's 2027 offer from another's.**

## Count

- **29 Southampton course pages read.**
- **23 courses verified on a confirmed 2027/28 panel.**
- **6 courses NOT RETRIEVED for 2027** (5 serving 2026/27, 1 with an empty 2027 tab).
- **2 official listing pages** used for code/title corroboration only (no year label → never a 2027 source).

### The 23 verified on a confirmed 2027/28 panel

| # | Course | Code |
|---|---|---|
| 1 | Physics (MPhys) | `F303` |
| 2 | Physics (BSc) | `F300` |
| 3 | Physics with Astronomy (MPhys) | `F3FM` |
| 4 | Physics with Space Science (MPhys) | `F3FX` |
| 5 | Physics with Artificial Intelligence (MPhys) | `F391` |
| 6 | Physics with Quantum Science and Technologies (MPhys) | `F3QT` |
| 7 | Particle Physics with Research Year Abroad (MPhys) | `F303` (route) |
| 8 | Physics with Year of Experimental Research (MPhys) | `F303` (route) |
| 9 | Physics with Industrial Placement (MPhys) | `F303` (route) |
| 10 | Aeronautics and Astronautics (MEng) | `H401` |
| 11 | Aeronautics and Astronautics (BEng) | `H422` |
| 12 | Aeronautics and Astronautics / Aerodynamics (MEng) | `H490` |
| 13 | Aeronautics and Astronautics / Spacecraft Engineering (MEng) | `H493` |
| 14 | Mechanical Engineering (MEng) | `H301` |
| 15 | Mechanical Engineering (BEng) | `H300` |
| 16 | Mechanical Engineering / Aerospace Engineering (MEng) | `HH34` |
| 17 | Electrical and Electronic Engineering (MEng) | `H602` |
| 18 | Electrical and Electronic Engineering (BEng) | `H600` |
| 19 | Electronic Engineering (BEng) | `H610` |
| 20 | Civil Engineering (MEng) | `H201` |
| 21 | Acoustical Engineering (BEng) | `HH72` |
| 22 | Maritime Engineering (MEng) | `J641` |
| 23 | Biomedical Engineering (MEng) | `BB97` |

## The identity question — ANSWERED

**Several named degrees DO share one UCAS code, and Southampton says so on the named pages
themselves.** But the pattern is **mixed**, and a blanket rule would be wrong.

**Confirmed shared codes (routes within ONE application):**
- **`F303` carries FOUR named MPhys degrees** — `Physics`, `Physics with Industrial Placement`,
  `Physics with Year of Experimental Research`, `Particle Physics with Research Year Abroad`.
  **Each of the four pages independently prints `When you apply use: UCAS course code: F303`.**
  Four separate confirmations, from four separate pages. This is conclusive.
- **`F3FM` carries TWO named MPhys degrees** — `Physics with Astronomy` and
  `Astrophysics with Year Abroad`, the latter printing `When you apply use: UCAS course code: F3FM`.
- **`J641` (Maritime Engineering MEng) carries SIX named Year-2 pathways** under the one code:
  `Advanced Computational Engineering`, `Marine Engineering and Autonomy`, `Naval Architecture`,
  `International Naval Architecture`, `Ocean Energy and Offshore Engineering`,
  `Yacht and High Performance Craft`. These are chosen in Year 2, not applied for separately.
  **All three hypotheses in the brief are CONFIRMED from Southampton's own pages.**

**Where the hypothesis FAILS — these are separate codes, separate applications, NOT routes:**
- Physics variants with their own codes: `F300` (BSc), `F3GC`, `F3FX`, `F391`, `F3QT`.
- The Aeronautics & Astronautics "slash" streams, despite reading like sub-routes:
  `H401`, `H422`, `H490`, `H493`, `HH34` — each prints its own `When you apply use` code.
- The Mechanical family: `H300`, `H301`, `HH34`, `H390`, `4R29`, `HH38`, `HH37`, `HH32`, `30HH`.
- The ECS family: `H600`, `H601`, `H602`, `H603`, `H610`, `H402`, `HH60`.
- The Biomedical family: `BB97`, `BB95`, `BB98`, `H625`, `H619`, `H675`, `H674`.
- Maritime **BEng `J640`** publishes **no** Year-2 pathways — the six pathways belong to the MEng
  `J641` only.

**Practical rule for import:** treat `F303` as ONE course with four named study options, `F3FM` as ONE
course with two, and `J641` as ONE course with six Year-2 pathways. Treat every other code as its own
course.

## Structural findings worth carrying forward

1. **BEng is not always a lower offer than MEng.** Aeronautics & Astronautics BEng `H422` carries the
   same `A*AA` as the MEng `H401`. But Mechanical, EEE and Electronic BEngs *are* a grade lower
   (`AAA` vs `A*AA`). Check per course; never assume.
2. **Second-subject rules vary sharply** and are the main discriminator between Engineering courses:
   - Civil `H201` — **Mathematics ONLY**, no second subject at all
   - Mechanical / Aeronautics — Mathematics **and Physics**, both compulsory
   - ECS (`H600`/`H602`/`H610`) — Maths + one of `physics, further mathematics, electronics or computer science`
   - Electrical `H601` — Maths + one of `physics, electronics or further mathematics` (**no computer science**) — 2026/27 figure, re-check
   - Maritime `J641` — Maths + one of `physics, chemistry or further mathematics`
   - Biomedical `BB97` — Maths + one of `biology, chemistry or physics` (**the only one accepting Biology**)
   - Acoustical `HH72` — Maths + one of an **11-subject** list including Psychology, Statistics, Geography, Geology
3. **Interview policy splits cleanly by school.** Every **Physics** page explicitly offers an optional,
   offer-reducing interview (`The optional interview may lead to a lower offer`). **No Engineering
   page mentions an interview at all** (Maritime notes only that mature applicants `may also be
   invited`). Engineering silence = **NOT STATED**, not "no interview".
4. **`Offers typically exclude General Studies and Critical Thinking`** appears on all 29 pages —
   the one genuinely university-wide rule found.
5. Contextual offers are **not** a uniform reduction. They range from `AAB` (most), through `ABB`
   (Physics BSc, Mechanical BEng, Maritime MEng), `AAC` (ECS — an unusual string), to `BBB`
   (Acoustical BEng). Several drop a *subject minimum* rather than the aggregate
   (Mechanical BEng drops physics to `B`; Civil and Maritime drop mathematics to `B`).

_(End of file.)_
