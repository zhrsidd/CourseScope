# University of Glasgow — Undergraduate Admissions Research (Physics & Engineering)

**Target entry year:** 2027 entry
**Research date:** 2026-09-14
**Source policy:** `gla.ac.uk` only as admissions evidence. Every value below was read from the
fetched official page via WebFetch. No third-party guide used. No value inferred from a sibling course.

**Note on method:** direct `curl` to `www.gla.ac.uk` is blocked by this environment's egress proxy
(`CONNECT tunnel failed, response 403`), so **all** page reads were done with WebFetch against the
live `gla.ac.uk` URL. Web search was used only to LOCATE URLs.

**Canonical 2027 catalogue root:** <https://www.gla.ac.uk/undergraduate/degrees/> — the page header
reads *"2027 Degree programmes A‑Z"*. The parallel path `https://www.gla.ac.uk/undergraduate/2026/...`
is the 2026 archive. **Every course page under `/undergraduate/degrees/` self-identified as 2027 entry.**

---

# SCOTTISH OFFER STRUCTURE — what each Glasgow heading actually means

This is the most important section. **Glasgow does not work like Edinburgh.** Read this before using
any figure below.

## The headings Glasgow actually prints on a course page

Every in-scope Glasgow course page carries the same stack of entry-requirement sub-headings, in this
order (transcribed from the live pages):

1. `Summary of entry requirements for <course name>`
2. `Scottish Higher entry requirements`
3. `Scottish Higher adjusted entry requirements* (by end of S5 or S6)`
4. `A-level standard entry requirements`
5. `IB standard entry requirements`
6. *(on some courses only)* `Entry requirements for advanced entry to <course name>`, which then
   splits into `Scottish Higher requirements for advanced entry`, `A-level requirements for advanced
   entry`, `IB requirements for advanced entry`
7. `Admissions guidance`
8. `English language` / `English language requirements`

## 1. The A-Level heading is `A-level standard entry requirements`

That is Glasgow's exact heading. There is **no** separate A-level "minimum entry requirements"
heading anywhere on any course page examined.

## 2. The A-Level figure is a RANGE, and the range means something specific

For every non-faster-route Physics course verified, the A-level string printed is literally:

> `AAB – BBB`

This is a **range/band, not a single profile.** Glasgow gives **no explanation of the range on the
course page itself** (confirmed: "explanatory sentence — NOT PRESENT"). The explanation lives on a
separate central page, <https://www.gla.ac.uk/undergraduate/how-to-apply-for-an-undergraduate-degree/entry-requirements/admissions-guidance/>,
which says verbatim:

> **"The Standard Entry Requirements represent the range of grades required to be considered for an offer."**

and

> **"If you have predicted grades below our standard range, we may still consider you for an offer."**

**⚠️ Caveat on that page's year:** that guidance page is headed **"2026 Admissions guidance"** and
states it covers *"September 2026 (or deferred September 2027)"*. **No 2027-dated version of the
guidance page exists** (searched). So the *definition* of the range is evidenced only by a 2026-dated
page, while the *figures* come from 2027-dated course pages. This is flagged rather than glossed over.

## 3. How this DIFFERS from Edinburgh's band model — the critical distinction

| | Edinburgh | **Glasgow** |
|---|---|---|
| A-level headline | "Standard entry requirements", a band e.g. *"from AAA to ABB in one set of exams"* | `A-level standard entry requirements`, a range e.g. `AAB – BBB` |
| What the band/range means | the spread of offers Edinburgh actually **issues** | **"the range of grades required to be considered for an offer"** — a *consideration* window, not a set of offers issued |
| Separate A-level "minimum entry requirements" figure | **Yes** — a distinct published A-level figure that is really a widening-access threshold | **No. Glasgow publishes no A-level minimum-entry-requirements figure at all** for these courses |
| Widening-access / adjusted figure | published in A-level terms too | **published in SQA Higher terms ONLY** (`MD20: BBBB`, `MD40: AABB`) |

**The single biggest trap:** if you map Edinburgh's model onto Glasgow you will look for a Glasgow
A-level "minimum entry requirement" and wrongly conclude `BBB` is it. `BBB` is **not** a
widening-access threshold at Glasgow — it is the **bottom of the standard consideration range that
every A-level applicant is assessed against.** Glasgow's actual widening-access threshold is a
*different mechanism entirely* and is not expressed in A-levels.

## 4. `Scottish Higher entry requirements` — a two-stage S5/S6 mechanism with no A-level analogue

Verbatim, and identical across the Physics courses:

> "BBBB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not guaranteed
> to applicants who meet the minimum from S5. Typically offers will be made at AAAAA by end of S6.
> B at Advanced Higher is equivalent to A at Higher."

Note what this does: it prints **two** SQA numbers — a *screening floor* (`BBBB` from S5, explicitly
**not** a guarantee) and a *typical actual offer* (`AAAAA` by end of S6). **The A-level block has no
equivalent two-stage structure.** So the SQA `BBBB` and the A-level `BBB` are NOT the same kind of
number and must never be treated as equivalents.

## 5. `Scottish Higher adjusted entry requirements* (by end of S5 or S6)` — the real widening-access route

Verbatim (Physics):

> "MD20: BBBB (also other target groups*). MD40: AABB*. Additional requirements: Higher Mathematics
> and Physics. Successful completion of Top-Up or one of our Summer Schools. * See Access Glasgow for eligibility"

Properties that matter:

- **SQA-only.** Confirmed on <https://www.gla.ac.uk/study/wp/adjustedoffers/adjustedentry/>:
  *"All adjusted entry requirements are expressed exclusively in Scottish Qualification Authority
  (SQA) terminology: Higher, Advanced Higher, and National 5. No reference to A-levels or other
  qualification systems appears."* **→ An A-level applicant has no published adjusted offer at Glasgow.**
- It is a **guarantee**, unlike the standard range. The central guidance says adjusted requirements
  *"represent the cumulative / final grades plus any Additional Requirements necessary by the end of
  S5 or S6 to be **guaranteed** an offer."*
- It carries an **extra condition the standard route does not**: *"Successful completion of Top-Up or
  one of our Summer Schools."* A qualifying grade profile alone is not enough.
- `MD20` / `MD40` refer to Scottish postcode deprivation: <https://www.gla.ac.uk/study/wp/adjustedoffers/adjustedentry/>
  pairs `MD20` with *"SIMD deciles 1-2"* and `MD40` with *"SIMD deciles 3-4"*. Neither acronym is
  expanded on the page.

## 6. Named widening-access schemes and target groups

**Scheme names** (from <https://www.gla.ac.uk/undergraduate/how-to-apply-for-an-undergraduate-degree/entry-requirements/access-glasgow/>
and <https://www.gla.ac.uk/study/wp/adjustedoffers/>):

- **Access Glasgow** — the umbrella. Verbatim: *"Specific Scottish applicants as well as any applicant
  who has spent time in Care can benefit from adjusted entry requirements by successfully completing
  one of our pre-entry programmes"*
- **Top-Up Programme** — named on the course pages themselves as a qualifying condition
- **Summer School** / *"one of our Summer Schools"* — named on the course pages
- **Reach** — *"Access to Medicine, Veterinary Medicine, Dentistry and Law"* → **not applicable to
  Physics or Engineering**
- Also listed as qualifying pre-entry programmes on the WP page: **Access to a Career**,
  **University Experience Week**, **Sutton Trust Summer School**

**Target groups, verbatim from <https://www.gla.ac.uk/study/wp/adjustedoffers/>:**

> - "Live in an SIMD decile 1-4 (MD20/40) Scottish postcode area"
> - "Have care experience"
> - "Are estranged from family and living without family support"
> - "Are seeking asylum in the UK"
> - "Have refugee status"
> - "Are a carer (provide unpaid care)"

So Glasgow **does** name care-experienced, refugee and asylum-seeker applicants — but the SIMD
criterion is explicitly limited to a *"Scottish postcode area"*, and the whole adjusted-offer
apparatus is expressed in SQA units. On the course pages these groups appear only as the compressed
footnote *"(also other target groups*)"* attached to the `MD20` line.

## 7. `faster route` is a THIRD, separate offer level with its own UCAS codes

Glasgow publishes separate `(faster route)` degree pages with their own UCAS codes and a
**much higher** A-level requirement, headed `A-level faster route entry requirements`:

> `Three A-levels at Grades A*AA`

Faster-route pages carry **no** `Scottish Higher adjusted entry requirements` block at all — i.e.
**no widening-access route is published for faster-route entry.**

## 8. `advanced entry` (Year 2 entry) is yet another separate offer level — same UCAS code

Distinct from faster route: advanced entry is requested by choosing *"point of entry 2nd year on your
UCAS application"*, i.e. **no separate UCAS code**. Its A-level requirement is again higher, e.g.
Chemical Physics: `Three A-levels at grades A*AA in Mathematics, Chemistry and Physics attained in
one exam year and at the first attempt`.

## 9. Summary: the A-level offer levels a Glasgow Physics applicant can face

| Route | Glasgow's heading | A-level figure | Separate UCAS code? |
|---|---|---|---|
| Standard | `A-level standard entry requirements` | `AAB – BBB` (a consideration range) | no |
| Advanced entry (Y2) | `A-level requirements for advanced entry` | `A*AA` + subject conditions | no — point-of-entry flag |
| Faster route | `A-level faster route entry requirements` | `Three A-levels at Grades A*AA` | **yes** |
| Adjusted / widening access | `Scottish Higher adjusted entry requirements*` | **NOT PUBLISHED in A-level terms** | no |

---

# SUMMARY

## Structural surprises (things that contradict a reasonable assumption)

1. **One page = many UCAS codes, including joint honours.** `/degrees/physics/` is a single page
   titled *"Physics / Theoretical Physics"* carrying **ten** UCAS codes — Physics, Theoretical
   Physics, Physics/Astronomy, Physics/Computing Science, Physics/Mathematics, each in BSc and MSci.
   **All ten share one identical set of entry requirements.** Theoretical Physics has **no page of
   its own**.
2. **Joint-honours codes are cross-listed on two pages.** `FF53` / `FF5H` (Physics/Astronomy) appear
   on *both* `/degrees/physics/` and `/degrees/astronomy/`.
3. **There is no single-honours Astronomy degree.** `/degrees/astronomy/` offers only
   Astronomy/Mathematics and Astronomy/Physics.
4. **There is no standalone "Astrophysics" degree** — only `Physics with Astrophysics`.
5. **The A-level range is identical (`AAB – BBB`) across every standard-route Physics course**,
   including Chemical Physics. The courses differ **only** in the `Additional requirements` subject
   clause. Grade-only matching would treat these as interchangeable; they are not.
6. **Adjusted/widening-access offers are SQA-only** — an A-level applicant has no published
   adjusted offer. See SCOTTISH OFFER STRUCTURE §5.
7. **`(faster route)` is a separate UCAS application** at `A*AA`, roughly three grade-steps above the
   bottom of the standard range for the same subject.
8. **No GCSE / National 5 requirement is published on any in-scope course page** (all NOT PRESENT).
9. **No admissions test and no interview is mentioned on any in-scope page.** Recorded as
   **not stated**, never as "none".
10. **Advanced entry is explicitly barred for two specific joint codes** — *"Advanced entry is not
    permitted for the following programmes: Physics/Astronomy (FF53/FF5H), Physics/Computing Science
    (FG34/IF13)."*

*(Counts, non-existent courses and NOT RETRIEVED pages are consolidated at the end of this file.)*

---

# PHYSICS — School of Physics and Astronomy

---

## P1. Physics / Theoretical Physics

1. **Exact official course title:** `Physics / Theoretical Physics` (page heading:
   *"University of Glasgow - Undergraduate study - 2027 Degree programmes A‑Z - Physics / Theoretical Physics"*).
   Individual award lines are printed as `Physics`, `Theoretical Physics`, `Physics/Astronomy`,
   `Physics/Computing Science`, `Physics/Mathematics`.
2. **UCAS codes:** ten on one page —
   BSc (Hons): Physics `F300`; Physics/Astronomy `FF53`; Physics/Computing Science `FG34`;
   Physics/Mathematics `GF14`; Theoretical Physics `F344`.
   MSci: Physics `F301`; Physics/Astronomy `FF5H`; Physics/Computing Science `IF13`;
   Physics/Mathematics `FGJ1`; Theoretical Physics `F340`.
3. **Award:** BSc (Hons) and MSci (both on the same page, separate UCAS codes)
4. **Duration:** BSc (Hons) **4 years**; MSci **5 years**. Advanced entry can reduce these to 3 and 4.
5. **A-Level offer — heading `A-level standard entry requirements`:**
   > `AAB – BBB`

   **This is a RANGE, not a single profile.** Transcribed exactly as printed, with an en-dash.
   Per Glasgow's central guidance this range is *"the range of grades required to be considered for
   an offer."* No explanatory sentence appears on the course page itself.
6. **Required subjects (A-level):** verbatim — *"Additional requirements: A-level Mathematics and Physics."*
7. **Cross-subject rules:** none beyond the above for A-level. No "one of X/Y/Z" clause, no
   "at least one at A" clause. (The **SQA** block, by contrast, does carry grade-specific subject
   conditions — see field 20 note.)
8. **Further Mathematics:** **NOT MENTIONED** anywhere on the page.
9. **Mathematics / Physics / Chemistry individually (A-level):**
   - Mathematics — **required** (no subject-specific minimum grade stated)
   - Physics — **required** (no subject-specific minimum grade stated)
   - Chemistry — **not mentioned**
10. **Accepted alternative sciences / explicitly excluded subjects:** **NOT PUBLISHED.** No
    alternative-science list and no exclusion list appears.
11. **Practical / science practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED** (NOT PRESENT on page).
13. **Admissions test:** **NOT STATED.** No sentence mentioning a test, admissions test, or portfolio
    appears anywhere on the page. *Silence — not evidence of "no test".*
14. **Interview:** **NOT STATED.** No sentence mentioning an interview appears on the page.
15. **Reduced-offer routes, each under Glasgow's own heading:**
    - **Heading `Scottish Higher adjusted entry requirements* (by end of S5 or S6)`** — verbatim:
      > "MD20: BBBB (also other target groups*). MD40: AABB*. Additional requirements: Higher
      > Mathematics and Physics. Successful completion of Top-Up or one of our Summer Schools.
      > * See Access Glasgow for eligibility"

      **SQA units only. No A-level equivalent is published.**
    - **Care-experienced offer:** not stated on the course page. Named on
      <https://www.gla.ac.uk/study/wp/adjustedoffers/> as a target group — *"Have care experience"* —
      folded into the course page's *"(also other target groups*)"*.
    - **Refugee / asylum-seeker offer:** same — *"Are seeking asylum in the UK"*, *"Have refugee
      status"* on the WP page only; **no figure published** for them.
    - **Access-programme offer:** the adjusted figures above are conditional on *"Successful
      completion of Top-Up or one of our Summer Schools."*
    - **Separate A-level "minimum entry requirements" figure:** **NOT PUBLISHED.** Glasgow prints no
      such heading. Do not read `BBB` as one.
16. **Alternative offer routes:**
    - **`Entry requirements for advanced entry to Physics / Theoretical Physics`** — verbatim:
      > "Applicants who achieve exceptional grades in their Advanced Highers, A-levels or
      > International Baccalaureate may be considered for advanced entry, meaning that an Honours
      > degree can be completed in three years instead of the normal four years, or four years for
      > five-year integrated Masters programmes. Not all joint honours subjects are available for
      > advanced entry and applications to joint honours programmes will be considered on a
      > case-by-case basis. Choose point of entry 2nd year on your UCAS application to indicate you
      > wish to be considered for advanced entry. Advanced entry is not permitted for the following
      > programmes: Physics/Astronomy (FF53/FF5H), Physics/Computing Science (FG34/IF13). 2nd year
      > entrants to Physics programmes cannot change degree to study Mathematics at honours level."

      Sub-headings `A-level requirements for advanced entry` and `IB requirements for advanced entry`
      are present on the page; their specific grade strings were **NOT RETRIEVED** for this course
      (the extraction returned the narrative block above, not per-qualification figures).
    - **`Glasgow International College`** — heading present (pathway provider route).
    - **BTEC / HNC / HND / articulation:** **NOT PRESENT** on the page.
    - A separate `(faster route)` page exists — see **P2**.
17. **Application deadline:** verbatim —
    > "15 October: if including Dentistry, Medicine, Veterinary Medicine or also applying to Oxford
    > or Cambridge. 13 January: all other UK applicants (unless otherwise stated on the UCAS
    > website). 30 June: international students."
18. **Contiguous raw requirement block** (this genuinely appears as one contiguous block under
    `Scottish Higher entry requirements`; reproduced unstitched):
    > "BBBB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not
    > guaranteed to applicants who meet the minimum from S5. Typically offers will be made at AAAAA
    > by end of S6. B at Advanced Higher is equivalent to A at Higher. Additional requirements:
    > Higher Mathematics and Physics at AA. (AB may be considered."

    *Transcribed as returned, including the unclosed parenthesis and missing final bracket — the page
    text appears truncated at source. Flagged rather than silently repaired.*
19. **Study options / named routes within one UCAS application:**
    - **Study abroad** — verbatim: *"You will have the opportunity to study abroad at one of our
      partner universities as part of your degree. This won't add any extra time to your studies:
      see Study abroad."* No separate UCAS code; does not extend duration.
    - **Physics vs Theoretical Physics specialisation** — verbatim: *"The Physics degree programmes
      emphasise technological applications such as laser physics, semiconductor physics and devices,
      modern signal processing technology, and magnetic and superconducting materials. The
      Theoretical Physics degree focuses on more advanced theoretical topics, and will involve
      specialised computational project work."* These are **separate UCAS codes**, not post-admission
      choices.
    - **Constraint on later choice** — verbatim: *"2nd year entrants to Physics programmes cannot
      change degree to study Mathematics at honours level."*
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/physics/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/physics/> ·
    page heading *"Physics / Theoretical Physics"* · **requirements panel showed 2027 entry.**
    SQA figures above are SQA and must not be matched as A-levels; the **A-level** figure for this
    course is `AAB – BBB` only.

---

## P2. Physics / Theoretical Physics (faster route)

1. **Exact official course title:** `Physics / Theoretical Physics (faster route)`
2. **UCAS codes:** BSc (Hons): Physics (Faster Route) `F303`; Theoretical Physics (Faster Route)
   `F345`. MSci: Physics (Faster Route) `F302`; Theoretical Physics (Faster Route) `F341`.
3. **Award:** BSc (Hons) and MSci
4. **Duration:** BSc (Hons) **3 years**; MSci **4 years**
5. **A-Level offer — heading `A-level faster route entry requirements`:**
   > `Three A-levels at Grades A*AA`

   **This is a single profile, not a range** — unlike the standard route. Note `A*AA`, not `AAA`.
6. **Required subjects (A-level):** verbatim — *"which include Physics and Mathematics attained in
   one exam year and at the first attempt"*
7. **Cross-subject rules:** two hard conditions beyond the subjects — *"attained in one exam year"*
   and *"at the first attempt"*. Resits are therefore excluded.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required; Physics — required; Chemistry — not mentioned.
   No subject-specific minimum grade is attached to either named subject.
10. **Alternative sciences / excluded subjects:** **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:** **NONE PUBLISHED.** The sub-heading list contains no
    `Scottish Higher adjusted entry requirements` block at all — the sub-headings are only
    `Entry requirements for Physics / Theoretical Physics (faster route)`,
    `Scottish Higher faster route entry requirements`, `A-level faster route entry requirements`,
    `IB faster route entry requirements`, `Admissions guidance`, `English language`,
    `English language requirements`. **No widening-access, adjusted, care-experienced or refugee
    offer is published for the faster route.**
16. **Alternative offer routes:** the page cross-refers applicants back to the standard programme —
    verbatim: *"Applicants must also meet the standard offer threshold (see Physics / Theoretical
    Physics) with S5 grades to be considered for faster route."* (stated in the SQA block).
17. **Application deadline:** *"15 October"* (Dentistry/Medicine/Vet or Oxford/Cambridge);
    *"13 January"* all other UK applicants; *"30 June"* international students.
18. **Contiguous raw requirement block** — under `Scottish Higher faster route entry requirements`:
    > "AAABB is the minimum requirement from S5 to be reviewed for an S6 offer. Advanced Highers –
    > AAA including Physics and Mathematics attained in one exam year and at the first attempt.
    > Applicants must also meet the standard offer threshold (see Physics / Theoretical Physics) with
    > S5 grades to be considered for faster route."
19. **Study options:** Study abroad available. What "faster route" means, verbatim: *"offers focused,
    high achieving candidates joining us straight from school the option to complete the Honours
    Degree in three years or MSci degree in four years"*.
    URL: <https://www.gla.ac.uk/undergraduate/degrees/physics-faster-route/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/physics-faster-route/> ·
    page heading *"Physics / Theoretical Physics (faster route)"* · **panel showed 2027 entry.**

---

## P3. Physics with Astrophysics

1. **Exact official course title:** `Physics with Astrophysics`
2. **UCAS codes:** BSc (Hons) `F3F5`; MSci `F3FM`
3. **Award:** BSc (Hons), MSci
4. **Duration:** BSc (Hons) **4 years**; MSci **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   > `AAB – BBB`

   **A RANGE, not a single profile.** Identical string to Physics.
6. **Required subjects (A-level):** verbatim — *"Additional requirements: A-level Mathematics and Physics."*
7. **Cross-subject rules:** none stated beyond the two named subjects.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required, no minimum grade stated; Physics —
   required, no minimum grade stated; Chemistry — not mentioned.
10. **Alternative sciences / excluded subjects:** **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:**
    - **Heading `Scottish Higher adjusted entry requirements* (by end of S5 or S6)`** — verbatim:
      > "MD20: BBBB (also other target groups*). MD40: AABB*. Additional requirements: Higher
      > Mathematics and Physics. Successful completion of Top-Up or one of our Summer Schools.
      > * See Access Glasgow for eligibility"
    - **A-level minimum entry requirements figure:** **NOT PUBLISHED** (no such heading).
    - Care-experienced / refugee / asylum: not stated on this page; see WP page, no figure published.
16. **Alternative offer routes:** **no `advanced entry` section on this page** (NOT PRESENT — contrast
    with Physics and Chemical Physics, which both have one). `Glasgow International College` heading
    present. A separate `(faster route)` page exists — see **P4**.
17. **Application deadline:** *"15 October"* / *"13 January"* all other UK applicants / *"30 June"*
    international students.
18. **Contiguous raw requirement block** — under `Scottish Higher entry requirements`:
    > "BBBB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not
    > guaranteed to applicants who meet the minimum from S5. Typically offers will be made at AAAAA
    > by end of S6. B at Advanced Higher is equivalent to A at Higher. Additional requirements:
    > Higher Mathematics and Physics at AA. (AB may be considered."

    *Same source-side truncation as Physics; transcribed as-is.*
19. **Study options:** **Study abroad** — verbatim: *"You will have the opportunity to study abroad at
    one of our partner universities as part of your degree. This won't add any extra time to your
    studies."* No separate UCAS code.
    URL: <https://www.gla.ac.uk/undergraduate/degrees/physicswithastrophysics/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/physicswithastrophysics/> ·
    page heading *"Physics with Astrophysics"* · **panel showed 2027 entry.**

---

## P4. Physics with Astrophysics (faster route)

1. **Exact official course title:** `Physics with Astrophysics (faster route)`
2. **UCAS codes:** BSc (Hons) `F3F2`; MSci `F3F1`
3. **Award:** BSc (Hons), MSci
4. **Duration:** BSc (Hons) **3 years**; MSci **4 years**
5. **A-Level offer — heading `A-level faster route entry requirements`:**
   > `Three A-levels at Grades A*AA which include Physics and Mathematics attained in one exam year and at the first attempt`

   **Single profile `A*AA`, not a range.**
6. **Required subjects:** Physics and Mathematics, per the string above.
7. **Cross-subject rules:** *"attained in one exam year and at the first attempt"* — resits excluded.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required; Physics — required; Chemistry — not mentioned.
10. **Alternative sciences / excluded subjects:** **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:** **NONE PUBLISHED.** Sub-headings are only
    `Entry requirements for Physics with Astrophysics (faster route)`, `Admissions guidance`,
    `English language`, `English language requirements`. No adjusted / widening-access block.
16. **Alternative offer routes:** SQA route stated as *"AAABB is the minimum requirement from S5 to be
    reviewed for an S6 offer"* plus Advanced Highers *"AAA including Physics and Mathematics attained
    in one exam year and at the first attempt"*. **These are SQA figures, not A-level.**
17. **Application deadline:** *"15 October"* / *"13 January"* / *"30 June"* as above.
18. **Contiguous raw requirement block:** the extraction returned the SQA Higher and Advanced Higher
    figures as separate labelled items rather than one contiguous block, so **no contiguous block is
    recorded** for this course rather than stitching fragments.
19. **Study options:** Study abroad available. *"faster route"* defined as *"offers focused, high
    achieving candidates joining us straight from school the option to complete the Honours Degree in
    three years or MSci degree in four years"*.
    URL: <https://www.gla.ac.uk/undergraduate/degrees/physics-with-astrophysics-faster-route/>
20. **Provenance:** `sourceUrl`
    <https://www.gla.ac.uk/undergraduate/degrees/physics-with-astrophysics-faster-route/> ·
    page heading *"Physics with Astrophysics (faster route) BSc/MSci"* · **panel showed 2027 entry.**

---

## P5. Chemical Physics

1. **Exact official course title:** `Chemical Physics`
2. **UCAS codes:** BSc (Hons) `F335`; MSci `F322`; **Chemical Physics with work placement MSci `F320`**
3. **Award:** BSc (Hons), MSci, MSci with work placement
4. **Duration:** BSc (Hons) **4 years**; MSci **5 years**; MSci with work placement **5 years**
   (the placement is absorbed, not additive — it sits *"between year 3 and the final year"*)
5. **A-Level offer — heading `A-level standard entry requirements`:**
   > `AAB – BBB`

   **A RANGE.** Same string as Physics — the difference is entirely in the subject clause.
6. **Required subjects (A-level):** verbatim — *"A-level Chemistry, Mathematics and Physics."*
   **Three named subjects — this is the most subject-constrained Physics course at Glasgow.** No
   subject-specific minimum grade is stated for A-level.
7. **Cross-subject rules (A-level):** all three of Chemistry, Mathematics and Physics required. No
   "one of" alternative. (The **SQA** block does attach grades and a tolerance — see field 18.)
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — **required**; Physics — **required**;
   Chemistry — **required**. None carries a stated A-level minimum grade.
10. **Alternative sciences / excluded subjects:** **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:**
    - **Heading `Scottish Higher adjusted entry requirements (by end of S5 or S6)`** — verbatim:
      > "MD20: BBBB (also other target groups*); MD40: AABB*. Additional requirements: Higher
      > Chemistry, Mathematics and Physics. Successful completion of Top-Up or one of our Summer
      > Schools. * See Access Glasgow for eligibility"

      Note the adjusted route drops the SQA grade conditions (`AAA`, *"B may be considered in one"*)
      and requires the three subjects without grades.
    - **A-level minimum entry requirements figure:** **NOT PUBLISHED.**
    - Care-experienced / refugee / asylum: not stated on this page.
16. **Alternative offer routes — `Entry requirements for advanced entry to Chemical Physics`**
    (this course publishes per-qualification advanced-entry figures, unlike Physics):
    - **`A-level requirements for advanced entry`** — verbatim:
      > "Three A-levels at grades A*AA in Mathematics, Chemistry and Physics attained in one exam
      > year and at the first attempt."
    - **`Scottish Higher requirements for advanced entry`** — verbatim:
      > "Advanced Highers – AAA in Mathematics, Chemistry and Physics attained in one exam year and
      > at the first attempt."
    - **`IB requirements for advanced entry`** — verbatim:
      > "38 points with three Higher Level subjects at 6,6,6 in Mathematics (Analysis & Approaches),
      > Chemistry and Physics attained in one exam year and at the first attempt."
    - Applied for by choosing *"year 2 (Y2) on your UCAS application"* — **no separate UCAS code.**
    - **No `(faster route)` page exists for Chemical Physics.**
17. **Application deadline:** *"15 October"* (if including Dentistry, Medicine, Veterinary Medicine or
    applying to Oxford/Cambridge); *"13 January"* all other UK applicants; *"30 June"* international.
18. **Contiguous raw requirement block** — under `Scottish Higher entry requirements`:
    > "BBBB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not
    > guaranteed to applicants who meet the minimum from S5. Typically offers will be made at AAAAA
    > by end of S6. B at Advanced Higher is equivalent to A at Higher. Additional requirements:
    > Higher Chemistry, Mathematics and Physics at AAA. (B may be considered in one)."
19. **Study options / named routes:**
    - **Work placement** — has its **own UCAS code `F320`**, so it is *not* a within-one-application
      option. Verbatim description: placements are *"normally spent doing research in industry or
      some other organisation"*, including *"CERN or an academic laboratory"*, *"may be in the UK,
      but are often taken overseas"*, and occur *"between year 3 and the final year"*.
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/chemicalphysics/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/chemicalphysics/> ·
    page heading *"Chemical Physics BSc/MSci"* · **panel showed 2027 entry.**

---

## P6. Astronomy

1. **Exact official course title:** `Astronomy` — but note **all awards are joint honours**; the
   printed award lines are `Astronomy/Mathematics` and `Astronomy/Physics`.
   **There is no single-honours Astronomy degree.**
2. **UCAS codes:** BSc (Hons): Astronomy/Mathematics `FGM1`; Astronomy/Physics `FF53`.
   MSci: Astronomy/Mathematics `FG5D`; Astronomy/Physics `FF5H`.
   ⚠️ `FF53` and `FF5H` are **the same codes also printed on the Physics page** as
   Physics/Astronomy — one UCAS code, two catalogue entries.
3. **Award:** BSc (Hons), MSci
4. **Duration:** BSc (Hons) **4 years**; MSci **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   > `AAB – BBB`

   **A RANGE.**
6. **Required subjects (A-level):** verbatim — *"A-level Mathematics and Physics."*
   Note: **Physics is required even for the Astronomy/Mathematics route.**
7. **Cross-subject rules:** none stated beyond the two named subjects.
8. **Further Mathematics:** **NOT MENTIONED** — notable given a Mathematics joint route exists.
9. **Maths / Physics / Chemistry:** Mathematics — required; Physics — required; Chemistry — not mentioned.
10. **Alternative sciences / excluded subjects:** **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:**
    - **Heading `Scottish Higher adjusted entry requirements`** — verbatim:
      > "MD20: BBBB (also other target groups*). MD40: AABB*. Additional requirements: Higher
      > Mathematics and Physics. Successful completion of Top-Up or one of our Summer Schools.
      > *See Access Glasgow for eligibility."
    - **A-level minimum entry requirements figure:** **NOT PUBLISHED.**
16. **Alternative offer routes:** **no `advanced entry` section on this page** (NOT PRESENT). Note
    this is consistent with the Physics page's statement that *"Advanced entry is not permitted for
    the following programmes: Physics/Astronomy (FF53/FF5H)"*.
17. **Application deadline:** *"15 October"* / *"13 January"* / *"30 June"* as above.
18. **Contiguous raw requirement block** — under `Scottish Higher entry requirements`:
    > "BBBB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not
    > guaranteed to applicants who meet the minimum from S5. Typically offers will be made at AAAAA
    > by end of S6. B at Advanced Higher is equivalent to A at Higher. Additional requirements:
    > Higher Mathematics and Physics at AA. (AB may be considered)."
19. **Study options:** *"Study abroad available"*. Specialisms are the two joint-honours pairings, each
    a **separate UCAS code** rather than a post-admission choice. No year-in-industry option stated.
    URL: <https://www.gla.ac.uk/undergraduate/degrees/astronomy/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/astronomy/> ·
    page heading *"Astronomy"* · **panel showed 2027 entry.**

---

# ENGINEERING — James Watt School of Engineering

## Engineering-wide pattern established across the five verified pages

Every verified James Watt page carries this sub-heading stack, which differs from Physics by adding
one widening-access heading and by splitting **every** figure into BEng and MEng:

1. `Summary of entry requirements for <course>`
2. `Scottish Higher entry requirements`
3. `Scottish Higher adjusted entry requirements`
4. **`Widening Participation Articulation Programmes`** ← does not exist on any Physics page
5. `A-level standard entry requirements`
6. `IB standard entry requirements`
7. `Entry requirements for advanced entry to <course>`
8. `Admissions guidance` / `Glasgow International College` / `English language`

### ⚠️ The three engineering-specific traps

**Trap 1 — BEng is a RANGE, MEng is a SINGLE PROFILE.** On every verified engineering page:

| Award | Glasgow's `A-level standard entry requirements` string | Shape |
|---|---|---|
| BEng | `AAB – BBB` | **range** |
| MEng | `AAA` | **single profile — no range at all** |

This is not a band narrowing; Glasgow changes the *kind* of figure between the two awards of the same
course. `AAA` for MEng is **above** the top of the BEng range (`AAB`).

**Trap 2 — the adjusted offer is published for BEng ONLY.** The lines are literally prefixed
`BEng: MD20:` and `BEng: MD40:`. Civil Engineering extraction confirmed explicitly:
*"Page does not specify MEng adjusted requirements separately."* **→ No widening-access figure is
published for any MEng, in any qualification system.**

**Trap 3 — engineering advanced entry is `A*A*A`, not `A*AA`.** Two starred grades. Chemical Physics
(Physics school) uses `A*AA`. Do not carry one across to the other.

### Engineering-wide A-level subject clause (identical on all five verified pages), verbatim

> "A-level Mathematics and Physics. (Design & Technology may be accepted in place of Physics, 3D or
> Product Design options only)."

This is the **only** accepted-alternative-subject rule Glasgow publishes for in-scope courses, and it
is narrowly conditioned: Design & Technology substitutes for **Physics only**, and only in the
**3D or Product Design options**. Nothing substitutes for Mathematics. No subject is listed as
explicitly *not* accepted.

**SQA contrast worth recording:** the SQA clause is *"Higher Mathematics and Physics or Engineering
Science at AA"* — SQA applicants may offer **Engineering Science** in place of Physics. **That
Engineering Science alternative is NOT offered to A-level applicants.** The IB clause adds a further
concession absent from A-level: *"(SL6 can be accepted for either Mathematics or Physics)."*

---

## E1. Aeronautical Engineering

1. **Exact official course title:** `Aeronautical Engineering`
2. **UCAS codes:** BEng `H415`; MEng `H410`
3. **Award:** BEng, MEng (separate UCAS applications)
4. **Duration:** BEng **4 years**; MEng **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   - **BEng:** `AAB – BBB` — **a RANGE**
   - **MEng:** `AAA` — **a SINGLE PROFILE, not a range**
6. **Required subjects (A-level), verbatim:**
   > "A-level Mathematics and Physics (Design & Technology may be accepted in place of Physics, 3D or
   > Product Design options only)."

   No subject-specific minimum grade is stated for A-level.
7. **Cross-subject rules:** Mathematics and Physics both required; the only "one of" structure is the
   conditional Design & Technology substitution for Physics. No "at least one at A" clause.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — **required**, no substitute; Physics — **required**,
   substitutable by Design & Technology (3D or Product Design options only); Chemistry — **not mentioned**.
10. **Accepted alternatives:** Design & Technology (3D or Product Design options only), for Physics only.
    **Explicitly NOT accepted subjects: NOT PUBLISHED** (no exclusion list).
    *SQA-only alternative: Engineering Science. Not available to A-level applicants.*
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED** as an entry requirement. (National 5 appears only inside
    the English-language equivalence list, not as a subject requirement.)
13. **Admissions test:** **NOT STATED.** No sentence mentioning a test or portfolio appears.
14. **Interview:** **NOT STATED.** No sentence mentioning an interview appears.
15. **Reduced-offer routes, each under Glasgow's own heading:**
    - **`Scottish Higher adjusted entry requirements`** — verbatim:
      > "BEng: MD20: BBBB (also other target groups*). BEng: MD40: AABB*. Additional requirements:
      > Higher Mathematics and Physics or Engineering Science. Successful completion of Top-Up or one
      > of our Summer Schools. Direct entry to Year 2 via UofG HNC programmes*. * See Access Glasgow
      > for eligibility"

      **BEng only. SQA units only. No A-level adjusted figure. No MEng adjusted figure.**
    - **`Widening Participation Articulation Programmes`** — verbatim:
      > "The University has bespoke HNC Articulation Programmes running at various colleges, offering
      > direct entry to Year 2 of this degree."

      A **separate** reduced-entry mechanism: it shortens the degree rather than lowering grades.
    - **A-level "minimum entry requirements" figure:** **NOT PUBLISHED** — no such heading exists.
    - **Care-experienced / refugee / asylum-seeker offer:** not stated on the course page; covered only
      by the footnote *"(also other target groups*)"* → `Access Glasgow`. **No figure published.**
16. **Alternative offer routes:**
    - **`Entry requirements for advanced entry to Aeronautical Engineering`**, A-level, verbatim:
      > "Three A-levels at grades A*A*A which include Mathematics and Physics or Design and Technology
      > (3D or Product Design only) attained in one exam year and at the first attempt."
    - **`Glasgow International College`** — verbatim: *"International students with academic
      qualifications below those required should contact our partner institution, Glasgow
      International College, who offer a range of foundation certificates."*
    - **HNC articulation** — *"HNC Articulation Programmes: information and eligibility criteria"*,
      direct entry to Year 2.
    - BTEC: **NOT PRESENT.**
17. **Application deadline:** *"15 October: if including Dentistry, Medicine, Veterinary Medicine or
    also applying to Oxford or Cambridge"*; *"13 January: all other UK applicants (unless otherwise
    stated on the UCAS website)"*; *"30 June: international students"*.
18. **Contiguous raw requirement block:** the BEng and MEng SQA figures were returned as separate
    labelled fragments, so **no contiguous block is recorded** rather than stitching them together.
19. **Study options / named routes within one UCAS application:**
    - **Shared first three years across BEng/MEng** — verbatim: *"You will study the same courses in
      the first three years whether you are on the BEng or MEng degree programme"*
    - **Switching discipline after year 1** — verbatim: *"also makes it easy to switch to most other
      engineering disciplines at the end of year 1"* → an effective common-first-year arrangement,
      chosen **at the end of year 1**, with no separate UCAS code.
    - **BEng → MEng transfer** — verbatim: *"BEng students who perform well may transfer to the MEng
      programme on completion of years 1, 2 and 3"*
    - **Study abroad** — *"Study abroad available"*; *"partners in the USA and Australia, where some
      students undertake their third year of study"*
    - **Project in industry** — verbatim: *"half of this year is devoted to project work, which can be
      carried out in industry, within the University or via a placement abroad"* — no separate UCAS
      code and no stated extension to duration.
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/aeronauticalengineering/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/aeronauticalengineering/> ·
    page heading *"Aeronautical Engineering"* · **panel showed 2027 entry.**

---

## E2. Aerospace Systems

1. **Exact official course title:** `Aerospace Systems`
2. **UCAS codes:** BEng `H402`; MEng `H401`
3. **Award:** BEng, MEng
4. **Duration:** BEng **4 years**; MEng **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   - **BEng:** `AAB – BBB` — **a RANGE**
   - **MEng:** `AAA` — **a SINGLE PROFILE**
6. **Required subjects (A-level), verbatim:**
   > "A-level Mathematics and Physics. (Design & Technology may be accepted in place of Physics, 3D or
   > Product Design options only)."
7. **Cross-subject rules:** as E1 — both subjects required, conditional D&T substitution for Physics only.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required, no substitute; Physics — required,
   substitutable by D&T (3D/Product Design only); Chemistry — not mentioned.
10. **Accepted alternatives:** Design & Technology (3D or Product Design options only), for Physics only.
    Explicitly-not-accepted list: **NOT PUBLISHED.** *Engineering Science is an SQA-only alternative.*
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:**
    - **`Scottish Higher adjusted entry requirements`** — verbatim:
      > "BEng: MD20: BBBB (also other target groups*). BEng: MD40: AABB*. Additional requirements:
      > Higher Mathematics and Physics or Engineering Science. Successful completion of Top-Up or one
      > of our Summer Schools. Direct entry to Year 2 via UofG HNC programmes*"

      **BEng only, SQA only.**
    - **`Widening Participation Articulation Programmes`** — verbatim: *"The University has bespoke HNC
      Articulation Programmes running at various colleges, offering direct entry to Year 2 of this degree."*
    - **A-level "minimum entry requirements":** **NOT PUBLISHED.**
    - Care-experienced / refugee / asylum: not stated on the page.
16. **Alternative offer routes — `Entry requirements for advanced entry to Aerospace Systems`**, A-level, verbatim:
    > "Three A-levels at grades A*A*A which include Mathematics and Physics or Design and Technology
    > (3D or Product Design only) attained in one exam year and at the first attempt."

    Plus `Glasgow International College` and HNC articulation.
17. **Application deadline:** *"15 October"* / *"13 January"* all other UK applicants / *"30 June"* international.
18. **Contiguous raw requirement block:** returned as separate BEng/MEng fragments → **none recorded**
    (not stitched).
19. **Study options:**
    - **Shared first three years** — *"You will study the same courses in the first three years whether
      on the BEng or MEng degree programme."*
    - **Switching discipline at end of year 1** — verbatim: *"This interdisciplinary approach...makes it
      easy to switch to most other engineering disciplines at the end of year 1 should you wish to do so."*
    - **BEng → MEng transfer** — *"BEng students who perform well may transfer to the MEng programme on
      completion of years 1, 2 and 3."*
    - **Study abroad** — *"Study abroad available"*; MEng *"project work...via a placement abroad"*
    - **Project in industry** — MEng students may undertake *"project work, which can be carried out in industry"*
    - **Specialisms** — Year 4–5 optional courses *"to allow you to develop and follow your interests"*
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/aerospacesystems/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/aerospacesystems/> ·
    page heading *"Aerospace Systems BEng/MEng"* · **panel showed 2027 entry.**

---

## E3. Biomedical Engineering

1. **Exact official course title:** `Biomedical Engineering`
2. **UCAS codes:** BEng `J750`; MEng `J751`
3. **Award:** BEng, MEng
4. **Duration:** BEng **4 years**; MEng **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   - **BEng:** `AAB – BBB` — **a RANGE**
   - **MEng:** `AAA` — **a SINGLE PROFILE**
6. **Required subjects (A-level), verbatim:**
   > "A-level Mathematics and Physics. (Design & Technology may be accepted in place of Physics, 3D or
   > Product Design options only)."

   **Note:** despite being a biomedical degree, **Biology is not mentioned at all** and Physics is
   still the required science.
7. **Cross-subject rules:** both named subjects required; conditional D&T substitution for Physics only.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required; Physics — required (D&T substitutable);
   Chemistry — **not mentioned**. Biology — not mentioned.
10. **Accepted alternatives:** Design & Technology (3D or Product Design options only), for Physics only.
    Explicitly-not-accepted list: **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED as a subject entry requirement.** The only National 5/GCSE
    references sit inside `Common equivalent English language qualifications`, verbatim:
    *"IGCSE English First Language, grade C"*, *"A Level English, grade C"*,
    *"SQA National 5 English or ESOL, grade B"*. **These are English-language equivalences, not GCSE
    subject requirements — do not record them as GCSE entry requirements.**
13. **Admissions test:** **NOT STATED.**
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:**
    - **`Scottish Higher adjusted entry requirements`** — verbatim:
      > "BEng: MD20: BBBB (also other target groups*). BEng: MD40: AABB*. Additional requirements:
      > Higher Mathematics and Physics or Engineering Science. Successful completion of Top-Up or one
      > of our Summer Schools."

      followed by the footnote link *"See Access Glasgow for eligibility"* → <https://www.gla.ac.uk/study/wp/>.
      **BEng only, SQA only.**
    - **`Widening Participation Articulation Programmes`** — verbatim: *"The University has bespoke HNC
      Articulation Programmes running at various colleges, offering direct entry to Year 2 of this degree."*
    - **A-level "minimum entry requirements":** **NOT PUBLISHED.**
16. **Alternative offer routes — `Entry requirements for advanced entry to Biomedical Engineering`**,
    A-level, verbatim:
    > "Three A-levels at grades A*A*A which include Mathematics and Physics or Design and Technology
    > (3D or Product Design only) attained in one exam year and at the first attempt."

    Plus `Glasgow International College` foundation certificates and HNC articulation.
17. **Application deadline:** *"15 October"* / *"13 January"* / *"30 June"* as above.
18. **Contiguous raw requirement block** — the BEng SQA block was returned as one contiguous block:
    > "AABB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not
    > guaranteed. Typically offers will be made at AAAAA by end of S6. Additional requirements: Higher
    > Mathematics and Physics or Engineering Science at AA (AB or BA may be considered)."

    and the MEng SQA block likewise:
    > "AAAB is the minimum requirement from S5 to be reviewed for an S6 offer. Offers are not
    > guaranteed. Typically offers will be made at AAAAAA by end of S6. Additional requirements: Higher
    > Mathematics and Physics or Engineering Science at AA."

    **Both are SQA, not A-level.**
19. **Study options:**
    - **Switching discipline at end of year 1** — verbatim: *"This interdisciplinary approach, favoured
      by industry, also makes it easy to switch to most other engineering disciplines at the end of
      year 1 should you wish to do so."*
    - **BEng → MEng transfer** — *"BEng students who perform well may transfer to the MEng programme on
      completion of years 1, 2 and 3."*
    - **Study abroad in year 3** — verbatim: *"You will be able to apply to spend the third year of your
      studies abroad at an accredited partner university."* No separate UCAS code.
    - **MEng year-5 project in industry** — verbatim: *"a detailed research-based individual project in
      industry, at a hospital or at another university."*
    - **Specialisms** — optional courses include tissue engineering, ultrasound technology, control
      systems, materials, mechanics, AI/machine learning. Chosen after admission.
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/biomedicalengineering/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/biomedicalengineering/> ·
    page heading *"Biomedical Engineering BEng/MEng"* · **panel showed 2027 entry.**

---

## E4. Civil Engineering

1. **Exact official course title:** `Civil Engineering`
2. **UCAS codes:** BEng `H202`; MEng `H200`
3. **Award:** BEng, MEng
4. **Duration:** BEng **4 years**; MEng **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   - **BEng:** `AAB – BBB` — **a RANGE**
   - **MEng:** `AAA` — **a SINGLE PROFILE**
6. **Required subjects (A-level), verbatim:**
   > "A-level Mathematics and Physics. (Design & Technology may be accepted in place of Physics, 3D or
   > Product Design options only)."
7. **Cross-subject rules:** both named subjects required; conditional D&T substitution for Physics only.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required; Physics — required (D&T substitutable);
   Chemistry — not mentioned.
10. **Accepted alternatives:** Design & Technology (3D or Product Design options only), Physics only.
    Explicitly-not-accepted list: **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** **NOT PUBLISHED** as an entry route; *"referenced only within English
    language qualifications section."*
13. **Admissions test:** **NOT STATED.** *(Worth noting: some other UK civil engineering departments
    publish a diagnostic maths test. Glasgow's page does not. Recorded as not stated, not as "none".)*
14. **Interview:** **NOT STATED.**
15. **Reduced-offer routes:**
    - **`Scottish Higher adjusted entry requirements`** — verbatim:
      > "BEng: MD20: BBBB (also other target groups*)" and "BEng: MD40: AABB*" with note
      > "*See Access Glasgow for eligibility." Requires "Higher Mathematics and Physics or Engineering
      > Science. Successful completion of Top-Up or one of our Summer Schools."

      Extraction explicitly confirmed: **"Page does not specify MEng adjusted requirements separately."**
      → **BEng only, SQA only.**
    - **`Widening Participation Articulation Programmes`** — verbatim: *"The University has bespoke HNC
      Articulation Programmes running at various colleges, offering direct entry to Year 2 of this degree."*
    - **A-level "minimum entry requirements":** **NOT PUBLISHED.**
16. **Alternative offer routes:** this page publishes the advanced-entry section split into three named
    sub-headings — `Scottish Higher requirements for advanced entry`, `A-level requirements for advanced
    entry`, `IB requirements for advanced entry`. A-level, verbatim:
    > "Three A-levels at grades A*A*A which include Mathematics and Physics or Design and Technology
    > (3D or Product Design only) attained in one exam year and at the first attempt."

    Plus `Glasgow International College` foundation certificates, HNC Articulation Programmes, and
    pre-sessional English courses.
17. **Application deadline:** *"15 October: if including Dentistry, Medicine, Veterinary Medicine or also
    applying to Oxford or Cambridge"* / *"13 January: all other UK applicants"* / *"30 June:
    international students."*
18. **Contiguous raw requirement block:** the SQA figures were returned with internal ellipses, so **no
    contiguous block is recorded** for this course rather than presenting a broken quotation as contiguous.
19. **Study options:**
    - **Shared first three years** — *"You will study the same courses in the first three years whether
      you are on the BEng or MEng degree programme."*
    - **Switching discipline at end of year 1** — *"makes it easy to switch to most other engineering
      disciplines at the end of year 1"*
    - **BEng → MEng transfer** — *"BEng students who perform well may transfer to the MEng programme on
      completion of years 1, 2 and 3."*
    - **Study abroad in year 3** — verbatim: *"You may apply to study abroad in year 3. In addition, MEng
      students can work on their fifth-year project at overseas institutions."*
    - **Year in industry:** **NOT PRESENT.**
    - **Specialisms** — structural engineering, water engineering, transportation, geotechnical
      engineering, construction management. Chosen after admission.
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/civilengineering/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/civilengineering/> ·
    page heading *"Civil Engineering"* · **panel showed 2027 entry.**

---

## E5. Product Design Engineering

**⚠️ PARTIAL RETRIEVAL.** The page loaded and the fields below were read from it, but the extraction
did **not** return the ordered sub-heading list or the full adjusted-block footnote. Fields marked
*(not returned)* are **NOT RETRIEVED**, not NOT PUBLISHED.

1. **Exact official course title:** `Product Design Engineering`
2. **UCAS codes:** BEng `H3W2`; MEng `H3WG`
3. **Award:** BEng, MEng
4. **Duration:** BEng **4 years**; MEng **5 years**
5. **A-Level offer — heading `A-level standard entry requirements`:**
   - **BEng:** `AAB – BBB` — **a RANGE**
   - **MEng:** `AAA` — **a SINGLE PROFILE**
6. **Required subjects (A-level), verbatim:**
   > "A-level Mathematics and Physics (Design & Technology may be accepted in place of Physics, 3D or
   > Product Design options only)"

   **Note:** even on the design-led degree, the substitution is still only D&T-for-Physics, and
   Mathematics remains non-substitutable. No art/design subject is required.
7. **Cross-subject rules:** both named subjects required; conditional D&T substitution for Physics only.
8. **Further Mathematics:** **NOT MENTIONED.**
9. **Maths / Physics / Chemistry:** Mathematics — required; Physics — required (D&T substitutable);
   Chemistry — not mentioned.
10. **Accepted alternatives:** Design & Technology (3D or Product Design options only), for Physics only.
    Explicitly-not-accepted list: **NOT PUBLISHED.**
11. **Practical endorsement:** **NOT PUBLISHED.**
12. **GCSE / National 5:** *(not returned)* → **NOT RETRIEVED.**
13. **Admissions test / portfolio:** **NOT STATED** — the extraction returned `NOT PRESENT` for any
    sentence mentioning a test, portfolio or submission of work.
    **⚠️ FLAG FOR RE-VERIFICATION:** this degree is *"jointly delivered by the University and The
    Glasgow School of Art"*, and art-school-delivered design degrees commonly require a portfolio.
    Glasgow's own page states nothing. Recorded as **not stated — silence is not "no portfolio"** and
    this is the single field in this file most likely to be incomplete.
14. **Interview:** **NOT STATED** (`NOT PRESENT` returned). Same re-verification flag as field 13.
15. **Reduced-offer routes:**
    - **`Scottish Higher adjusted entry requirements`** — as returned:
      > BEng MD20: "BBBB"; BEng MD40: "AABB"; Additional: "Higher Mathematics and Physics or
      > Engineering Science"

      **BEng only, SQA only.** The `(also other target groups*)` footnote and the
      Top-Up/Summer-School condition were **not returned** for this page, so they are not asserted
      here even though every sibling page carries them — **NOT RETRIEVED**, not absent.
    - **Widening participation, verbatim as returned:**
      > "SQA applicants who are eligible for our Widening Participation programmes are encouraged to
      > participate"

      Note this is **different wording from the sibling pages'** `Widening Participation Articulation
      Programmes` HNC sentence, and it explicitly says **"SQA applicants"** — further confirmation
      that the widening-participation route is addressed to Scottish-qualification applicants.
    - **A-level "minimum entry requirements":** **NOT PUBLISHED.**
16. **Alternative offer routes — advanced entry, A-level, verbatim as returned:**
    > "Three A-levels at grades A*A*A"

    The subject clause that accompanies this string on sibling pages was **not returned** here →
    **NOT RETRIEVED** for this course.
17. **Application deadline:** *"15 October"* (Oxbridge/Medicine); *"13 January"* (UK); *"30 June"* (international)
18. **Contiguous raw requirement block:** **none recorded** — the extraction returned labelled fragments
    only; not stitched.
19. **Study options / named routes:**
    - **Joint delivery**, verbatim: *"Product Design Engineering is jointly delivered by the University
      and The Glasgow School of Art"* — a single UCAS application to Glasgow.
    - Other study options *(not returned)* → **NOT RETRIEVED.**
    - URL: <https://www.gla.ac.uk/undergraduate/degrees/productdesignengineering/>
20. **Provenance:** `sourceUrl` <https://www.gla.ac.uk/undergraduate/degrees/productdesignengineering/> ·
    page heading *"Product Design Engineering BEng/MEng"* · **panel showed 2027 entry.**

---

# IN-SCOPE COURSES CONFIRMED TO EXIST BUT REQUIREMENTS **NOT RETRIEVED**

**Cause:** the WebFetch tool returned a hard session limit — `"You've hit your session limit · resets
8:40pm (UTC)"` — partway through the engineering set. Direct `curl` is separately blocked by the
egress proxy (`CONNECT tunnel failed, response 403`), so no fallback read path existed.

**What IS evidenced for the courses below:** their exact printed titles, award letters and URLs, read
from the official 2027 A-Z at <https://www.gla.ac.uk/undergraduate/degrees/>.

**What is NOT evidenced:** every one of fields 2–19. **No grade, subject rule, test, interview or
reduced-offer figure has been recorded for any of them.** In particular, although all five verified
James Watt pages showed an identical pattern (`AAB – BBB` BEng / `AAA` MEng, BEng-only SQA adjusted
offers, `A*A*A` advanced entry), **that pattern has NOT been applied to any course below.** Per the
research policy, nothing is inferred from a sibling course. Each needs its own fetch.

## James Watt School of Engineering — UK-based, in scope, NOT RETRIEVED (10)

| Exact printed title | Awards printed | URL |
|---|---|---|
| `Civil Engineering with Architecture` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/civilengineeringwitharchitecture/> |
| `Electronic & Software Engineering` | **BSc/BEng/MEng** | <https://www.gla.ac.uk/undergraduate/degrees/electronicsoftwareengineering/> |
| `Electronics & Electrical Engineering` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/electronics/> |
| `Electronics with Music` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/electronicswithmusic/> |
| `Energy Engineering` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/energy-engineering/> |
| `Mechanical Design Engineering` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/mechanicaldesignengineering/> |
| `Mechanical Engineering` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/mechanicalengineering/> |
| `Mechanical Engineering with Aeronautics` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/mechanicalengineeringwithaeronautics/> |
| `Mechatronics` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/mechatronics/> |
| `Robotics & Artificial Intelligence` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/robotics-artificial-intelligence/> |

**Two of these were actively attempted and failed on the tool limit, not skipped:**
`Electronics with Music` and `Mechanical Engineering`.

**Priority order for the next session** (highest risk of deviating from the pattern first):
1. **`Electronics with Music`** — the only in-scope course with a non-STEM half; likely to carry a
   Music subject requirement and possibly an audition. Must not be assumed to match Electronics.
2. **`Electronic & Software Engineering`** — the only in-scope engineering course offering a **BSc**
   as well as BEng and MEng, so it needs **three** A-level figures, not two.
3. **`Civil Engineering with Architecture`** — architecture content raises portfolio risk.
4. **`Robotics & Artificial Intelligence`** and **`Mechatronics`** — newer programmes, offers may
   diverge.
5. Then `Mechanical Engineering`, `Mechanical Engineering with Aeronautics`,
   `Mechanical Design Engineering`, `Energy Engineering`, `Electronics & Electrical Engineering`.

Also outstanding: re-verify **`Product Design Engineering`** fields 12, 13, 14, 16 and 19 (see E5), and
retrieve the **`A-level requirements for advanced entry`** grade string for **`Physics / Theoretical
Physics`** (P1 field 16), which the extraction did not return.

## International partnership / dual degrees — in the engineering space, NOT RETRIEVED (10)

These are on the official 2027 A-Z but are structured as overseas partnership or dual-award routes and
are generally aimed at applicants studying at the partner institution, so A-level relevance is likely
low for the app. Titles and URLs are evidenced; **no requirements read.**

| Exact printed title | Awards printed | URL |
|---|---|---|
| `Aeronautical Engineering (in partnership with Tianjin University)` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/aeronautical-engineering-in-partnership-tianjin/> |
| `Biomedical Engineering (in partnership with KMITL)` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/biomedical-engineering-in-partnership-with-kmitl/> |
| `Biomedical Engineering (in partnership with Tianjin University)` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/biomedical-engineering-in-partnership-with-tianjin/> |
| `Civil Engineering (dual degree programme with Universitas Indonesia)` | **BEng/Sarjana Teknik** | <https://www.gla.ac.uk/undergraduate/degrees/civil-engineering-indonesia/> |
| `Electronics & Electrical Engineering (dual degree programme with Universitas Indonesia)` | **BEng/Sarjana Teknik** | <https://www.gla.ac.uk/undergraduate/degrees/electronics-electrical-engineering-indonesia/> |
| `Electronics & Electrical Engineering (in partnership with Tianjin University)` | BEng/MEng | <https://www.gla.ac.uk/undergraduate/degrees/electronics-electrical-engineering-in-partnership/> |
| `Electronics & Electrical Engineering with Communications (dual degree with UESTC)` | BEng | <https://www.gla.ac.uk/undergraduate/degrees/eee-uestc/> |
| `Electronics & Electrical Engineering with Information Engineering (dual degree with UESTC)` | BEng | <https://www.gla.ac.uk/undergraduate/degrees/electronics-electrical-engineering-ie-uestc/> |
| `Electronics & Electrical Engineering with Microelectronics (dual degree with UESTC)` | BEng | <https://www.gla.ac.uk/undergraduate/degrees/eee-microelectronics-uestc/> |
| `Mechanical Engineering (joint degree with SIT)` | BEng | <https://www.gla.ac.uk/undergraduate/degrees/mechanical-engineering-sit/> |

---

# EXPECTED COURSES THAT DO **NOT** EXIST AT GLASGOW

Checked against the official 2027 A-Z. Each of these was named or implied in the research brief.

| Expected | Reality at Glasgow |
|---|---|
| **`Astrophysics`** (standalone) | **Does not exist.** Only `Physics with Astrophysics` (+ its faster route). |
| **`Aerospace Engineering`** | **Does not exist as a title.** Glasgow has two different degrees: `Aeronautical Engineering` (H415/H410) and `Aerospace Systems` (H402/H401). These are separate programmes, not naming variants. |
| **Single-honours `Astronomy`** | **Does not exist.** `/degrees/astronomy/` offers only `Astronomy/Mathematics` (FGM1/FG5D) and `Astronomy/Physics` (FF53/FF5H). |
| **`Theoretical Physics` as its own page** | **No page of its own** — but the degree is real, with its own UCAS codes `F344` (BSc) / `F340` (MSci) on the shared `Physics / Theoretical Physics` page. |
| **`Common first year` / `General Engineering` route** | **No such UCAS entry exists.** Glasgow delivers the effect *inside* each named degree instead: *"makes it easy to switch to most other engineering disciplines at the end of year 1"*. You apply to a named discipline from the outset. |
| **joint `Physics/Mathematics` as a separate page** | **No separate page** — codes `GF14` (BSc) / `FGJ1` (MSci) sit on the `Physics / Theoretical Physics` page. |
| **`Electronics and Electrical Engineering`** (spelled "and") | Printed with an ampersand: `Electronics & Electrical Engineering`. |
| **`Electronic and Software Engineering`** | Printed as `Electronic & Software Engineering` — **singular "Electronic"**, ampersand. |
| **`Product Design Engineering`** | Exists (H3W2/H3WG) — and is *"jointly delivered by the University and The Glasgow School of Art"*. |

## In scope and real, but NOT named in the brief

- **`Energy Engineering`** [BEng/MEng]
- **`Mechatronics`** [BEng/MEng]
- **`Mechanical Design Engineering`** [BEng/MEng] — distinct from `Mechanical Engineering`
- **`Robotics & Artificial Intelligence`** [BEng/MEng]
- **`Civil Engineering with Architecture`** [BEng/MEng]
- **`Chemical Physics with work placement MSci`** `F320` — a third UCAS code on the Chemical Physics page
- **The entire `(faster route)` family** — `Physics / Theoretical Physics (faster route)` (F303/F345/F302/F341)
  and `Physics with Astrophysics (faster route)` (F3F2/F3F1)

## Adjacent but judged OUT OF SCOPE

- `Software Engineering` [BSc/MSci], `Software Engineering (faster route)`,
  `Software Engineering (Graduate Apprenticeship)` [BSc], and the KMITL / UPES partnership variants —
  these sit in the **School of Computing Science**, not the James Watt School of Engineering. The
  brief's "Electronic and Software Engineering" is the James Watt course
  `Electronic & Software Engineering`, which **is** in scope and listed as NOT RETRIEVED above.
- `Machine Learning, Mathematics & Statistics`, `Mathematics`, `Finance & Mathematics` — Mathematics
  school, not Physics or Engineering.

---

# FINAL COUNTS

| | Physics | Engineering | Total |
|---|---|---|---|
| Course pages **fetched, read and fields 1–20 recorded** | **6** | **5** | **11** |
| — of which fully retrieved | 6 | 4 | 10 |
| — of which **partially** retrieved (flagged in-section) | 0 | 1 (`Product Design Engineering`) | 1 |
| In scope, catalogue-confirmed, requirements **NOT RETRIEVED** (UK) | 0 | 10 | 10 |
| In scope, catalogue-confirmed, requirements **NOT RETRIEVED** (overseas partnership) | 0 | 10 | 10 |
| **Total in-scope catalogue entries identified** | **6** | **25** | **31** |

**Distinct UCAS codes captured with a verified A-level figure attached:** 27 —
Physics page 10 (`F300 FF53 FG34 GF14 F344 F301 FF5H IF13 FGJ1 F340`), Physics faster route 4
(`F303 F345 F302 F341`), Physics with Astrophysics 2 (`F3F5 F3FM`), PwA faster route 2 (`F3F2 F3F1`),
Chemical Physics 3 (`F335 F322 F320`), Astronomy 4 (`FGM1 FF53 FG5D FF5H` — `FF53`/`FF5H` duplicate
the Physics page), Aeronautical 2 (`H415 H410`), Aerospace Systems 2 (`H402 H401`), Biomedical 2
(`J750 J751`), Civil 2 (`H202 H200`), Product Design 2 (`H3W2 H3WG`).

**Every page that was successfully fetched showed 2027 entry.** No 2026 figure has been recorded as
2027 anywhere in this file. The one 2026-dated source used is the central `Admissions guidance` page,
used only to *define* what the standard range means, and it is explicitly flagged as 2026-dated in the
SCOTTISH OFFER STRUCTURE section.

**Admissions tests and interviews:** across all 11 verified pages, **every single one returned NOT
PRESENT** for both. All are recorded as **not stated**. None is recorded as "no admissions test" or
"no interview". The `Product Design Engineering` portfolio question is explicitly flagged as the
highest-risk unverified field in the file.
