# University of Southampton — Undergraduate Admissions Research (Physics & Engineering)

**Target entry year:** 2027 entry (2027/28)
**Research date:** 2026-09-16
**Status of this file:** RETRY of an earlier attempt that concluded 2027 data was JavaScript-gated and
unobtainable. **That conclusion no longer holds** — see SUMMARY.

**Source policy applied:** `southampton.ac.uk` only as admissions evidence. Every value below was read
from a page actually fetched with WebFetch. Web search was used ONLY to locate URLs; no search snippet,
third-party guide, UCAS listing, mirror, cache or archive copy was used as evidence. No access control
was bypassed. Raw `curl` to southampton.ac.uk is blocked by this session's egress proxy
(`CONNECT tunnel failed, response 403`), so all reading was done through WebFetch.

---

# SUMMARY

_(written last — see end of file if this section looks incomplete mid-run)_

## HEADLINE FINDING: 2027/28 entry requirements ARE now retrievable

The Southampton course pages render their entry-requirements panel **server-side** with the heading:

> `Entry requirements`
> `For Academic year 202728`

(the `202728` is the site's own rendering of 2027/28 — the separator is lost in the HTML-to-text
conversion). The Modules section on the same pages independently prints:

> `For entry in academic year 2027 to 2028`

This is the genuine 2027 entry panel, not 2026/27. The previous attempt's blocker has cleared — most
likely because the site rolled over to the 2027 cycle. Every course below that is marked VERIFIED was
read on a panel bearing that 2027/28 label, and the label is recorded per course in field 20.

---

# RETRIEVAL ATTEMPTS

| # | Route / URL pattern | Result | Year the panel showed |
|---|---|---|---|
| 1 | `curl https://www.southampton.ac.uk/...` (raw HTTP) | **BLOCKED** — agent egress proxy returns `CONNECT tunnel failed, response 403`. Not retried, not routed around. | n/a |
| 2 | WebFetch `https://www.southampton.ac.uk/courses/physics-degree-mphys` (canonical course page, no query string) | **SUCCESS** — full entry-requirements panel returned server-side, including A-levels, EPQ, contextual offer, IB, BTEC, GCSE, interview text | **2027/28** (`For Academic year 202728`) |

_(table continued at end of file)_

---

# COURSES

## Course 1 — Physics (MPhys) — **VERIFIED ON 2027/28 PANEL**

1. **Exact official title:** `Physics` (award line: `MPhys`). Page title: `Physics Degree | MPhys | University of Southampton`
2. **UCAS code:** `F303` — **SHARED CODE, see field 19 and the Identity section**
3. **Award:** `Master of Physics`
4. **Duration:** `4 years`, `Full-time`, campus `Highfield`. Max duration NOT PUBLISHED on this page.
5. **Standard/typical A-Level offer — transcribed EXACTLY:**
   - Header field: `Typical Offer: A*AA-AAA`
   - Offer block, verbatim:
     > `A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
     > `or`
     > `AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)`
   - **What the range MEANS:** Southampton does **not** define the `A*AA-AAA` range in words anywhere on this
     page. The only adjacent explanation is the interview sentence (field 14): `The optional interview may
     lead to a lower offer.` **The meaning of the range is NOT PUBLISHED** — do not infer it.
   - Note the second variant is a **four-subject** offer (`AABB-AABC`), not a three-subject one.
6. **Required subjects + subject-specific grades:** physics at **minimum grade A**; AND one of mathematics
   **or** further mathematics at **minimum grade A**. Verbatim: `including physics (minimum grade A) and
   either mathematics or further mathematics (minimum grade A)`
7. **Cross-subject rules:** verbatim: `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics status:** **Accepted as an ALTERNATIVE to Mathematics**, not required in addition,
   and not an extra. Verbatim: `either mathematics or further mathematics (minimum grade A)`.
   Further Maths is **not** required and gets **no** grade reduction on this page.
9. **Mathematics / Physics / Chemistry individually:**
   - Mathematics — required *unless* Further Mathematics is offered instead; min grade **A**
   - Physics — **required**, min grade **A**
   - Chemistry — **not mentioned**: NOT PUBLISHED as a requirement or an alternative
10. **Accepted alternative sciences / excluded subjects:** no alternative-science list is published.
    **Explicitly excluded:** `General Studies and Critical Thinking` (see field 7).
11. **Science practical endorsement:** verbatim: `A pass in the physics Practical exam is required where it
    is separately endorsed.`
12. **GCSE requirements:** verbatim: `Applicants must hold GCSE English language (or GCSE English) (minimum
    grade 4/C) and mathematics (minimum grade 4/C)`
13. **Admissions test:** **NOT STATED.** A whole-page search for admissions test / entrance test / aptitude
    test / ESAT / PAT / TMUA / written test returned **no mention of any admissions test**. Southampton does
    **not** say "no test is required" either — so this is *silence*, recorded as NOT STATED, **not** as "none".
14. **Interview: EXPLICITLY STATED, OPTIONAL.** Verbatim:
    > `Successful applicants will be invited to visit the department and attend an optional interview. The
    > optional interview may lead to a lower offer.`
    This is an **offer-reducing** optional interview, not a selection interview.
15. **Reduced-offer routes, each under Southampton's OWN heading:**
    - Heading `A-levels contextual offer` — verbatim: `We are committed to ensuring that all learners with
      the potential to succeed, regardless of their background, are encouraged to apply to study with us.
      The additional information gained through contextual data allows us to recognise a learner's potential
      to succeed in the context of their background and experience. Applicants who are highlighted in this
      way will be made an offer which is lower than the typical offer for that programme as follows:`
      then the offer: `AAB including physics (minimum grade A) and either mathematics or further mathematics
      (minimum grade A).`
    - Heading `International Baccalaureate contextual offer` — same standing paragraph, but **no numeric
      reduced IB offer is given** ("will be made an offer which is lower than the typical offer for that
      programme", full stop). Reduced IB figure: **NOT PUBLISHED.**
    - Heading `BTEC contextual` — same standing paragraph, **no numeric reduced offer**: NOT PUBLISHED.
    - **Widening participation / care-experienced / refugee / access-scheme headings: ABSENT from this page.**
      No separately-headed WP, care-experienced or refugee route is published here. NOT PUBLISHED.
    - Heading `A-levels with Extended Project Qualification` — verbatim: `If you are taking an EPQ in
      addition to three A levels, you will receive the following offer in addition to the standard A level
      offer: AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum
      grade A), plus grade A in the EPQ`
      (an **alternative** offer conditional on the EPQ, i.e. `AAA + A in EPQ` instead of `A*AA-AAA`)
16. **Alternative offer routes (non-A-level):**
    - `International Baccalaureate Diploma` — verbatim: `Pass, with 38-36 points overall, with 19-18 points
      required at Higher Level, including 6 at Higher Level in mathematics (Analysis and Approaches or
      Applications and Interpretation) and 6 at Higher Level in physics`
    - `RQF BTEC` — verbatim: `D*-D in the BTEC National Extended Certificate plus grades AA-A*A in A-level
      physics and A-level mathematics or further mathematics.`
    - `QCF BTEC` — verbatim: `D*-D in the BTEC Subsidiary Diploma plus grades AA-A*A in A-level physics and
      A-level mathematics or further mathematics.`
    - Further routes exist but are **collapsed behind a `Show more entry requirements` control** and were
      **NOT RETRIEVED**: `Access to HE Diploma`, `Irish Leaving Certificate`, `Scottish Qualification
      offers`, `Welsh Baccalaureate`, `T Level`.
    - `Engineering/Physics/Mathematics Foundation Year` route — verbatim: `Applicants who have not studied
      mathematics/further mathematics and/or physics at A-level can apply for the Engineering/Physics/
      Mathematics Foundation Year`
    - IBCP statement present (see raw block).
17. **Deadline:** **NOT STATED** on this page. No UCAS or course deadline text appears. NOT PUBLISHED here.
18. **Contiguous raw requirement block:** YES — the A-level material genuinely appears as one contiguous
    run. Reproduced verbatim:
    ```
    Entry requirements
    For Academic year 202728
    A-levels
    A*AA-AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)
    or
    AABB-AABC including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)
    A-levels additional information
    Successful applicants will be invited to visit the department and attend an optional interview. The optional interview may lead to a lower offer.
    A pass in the physics Practical exam is required where it is separately endorsed.
    Offers typically exclude General Studies and Critical Thinking.
    Applicants who have not studied mathematics/further mathematics and/or physics at A-level can apply for the Engineering/Physics/Mathematics Foundation Year
    More information about A-levels
    A-levels with Extended Project Qualification
    If you are taking an EPQ in addition to three A levels, you will receive the following offer in addition to the standard A level offer: AAA including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A), plus grade A in the EPQ
    A-levels contextual offer
    ... AAB including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A).
    ```
19. **Study options / named routes inside this ONE UCAS application:** `F303` is **not unique to this page**.
    The official School listing page (`/study/subjects/physics-astronomy`) prints `F303` against **both**
    `MPhys Physics` **and** `MPhys Particle Physics with Research Year Abroad`; an official course page
    `/courses/physics-with-year-of-experimental-research-degree-mphys` also carries `F303` in its page title.
    See the **Identity** section. Do NOT treat those as separate UCAS applications.
20. **Provenance:**
    - sourceUrl: `https://www.southampton.ac.uk/courses/physics-degree-mphys`
    - page title: `Physics Degree | MPhys | University of Southampton`
    - **Entry year the requirements panel actually showed: 2027/28.** Heading verbatim `For Academic year
      202728`; the page's Modules section independently prints `For entry in academic year 2027 to 2028`.
      A follow-up tab-aware read of this URL reported **ONLY ONE** academic-year block, namely 2027–28 —
      i.e. there is no competing 2026/27 block on this page.

---

## Course 2 — Physics (BSc) — **VERIFIED ON 2027/28 PANEL**

1. **Exact official title:** `Physics`, award line `BSc`. Page title: `Physics Degree (Hons) | BSc | University of Southampton`
2. **UCAS code:** `F300`
3. **Award:** `Bachelor of Science`
4. **Duration:** `3 years`, `Full-time`, `Highfield`. Max NOT PUBLISHED.
5. **Standard/typical A-Level offer — EXACT:**
   - Header field: `Typical Offer: AAA-AAB`
   - Offer block verbatim: `AAA-AAB including physics (minimum grade A) and either mathematics or further
     mathematics (minimum grade A)` `or` `AABC including physics (minimum grade A) and either mathematics
     or further mathematics (minimum grade A)` — `ABBC including grades AB in physics and either
     mathematics or further mathematics`
   - **CAUTION / DATA-QUALITY FLAG:** the retrieved rendering of this block ran the three variants together
     and the `-` before `ABBC` is ambiguous in the conversion. The `AAA-AAB` headline figure and the
     `including physics (minimum grade A)` wording are solid. The exact internal punctuation between the
     `AABC` and `ABBC` four-subject variants is **NOT RELIABLY TRANSCRIBED** — a contiguous raw re-read
     was queued but blocked by the tool limit (see RETRIEVAL ATTEMPTS). Do not treat the `AABC`/`ABBC`
     split as settled.
   - **What the range MEANS:** NOT PUBLISHED (same as F303).
6. **Required subjects + grades:** physics min grade **A**; mathematics **or** further mathematics min grade **A**.
7. **Cross-subject rules:** `Offers typically exclude General Studies and Critical Thinking.`
8. **Further Mathematics:** accepted as an **alternative** to Mathematics; not required; no reduction.
9. **Maths / Physics / Chemistry:** Maths required unless Further Maths offered instead (min A); Physics
   required (min A); **Chemistry not mentioned — NOT PUBLISHED.**
10. **Alternative sciences / exclusions:** no alternative-science list. Excluded: `General Studies and Critical Thinking`.
11. **Practical endorsement:** `A pass in the physics Practical exam is required where it is separately endorsed.`
12. **GCSE:** `Applicants must hold GCSE English language (or GCSE English) (minimum grade 4/C) and
    mathematics (minimum grade 4/C)`
13. **Admissions test: NOT STATED** — whole-page search for admissions/entrance/aptitude test, ESAT, PAT,
    TMUA, written test returned **NO TEST MENTION**. Silence, not "none".
    - **Separate, NOT an admissions test:** `If you attend a visit day before Christmas, you can take the
      physics academic scholarship exam.` This is a **scholarship** exam, not an entry requirement.
14. **Interview: EXPLICITLY STATED, OPTIONAL.** Verbatim: `Successful applicants will be invited to visit
    the department and attend an optional interview. The optional interview may lead to a lower offer.`
    Also, for mature applicants only: `You may also be invited to attend an interview with an Admissions Tutor.`
15. **Reduced-offer routes under Southampton's own headings:**
    - `A-levels contextual offer` — offer verbatim: `ABB including grades AB in physics and either
      mathematics or further mathematics.`
    - `A-levels with Extended Project Qualification` — verbatim: `If you are taking an EPQ in addition to 3
      A levels, you will receive the following offer in addition to the standard A level offer: AAB
      including physics (minimum grade A) and either mathematics or further mathematics (minimum grade A)
      plus grade A in the EPQ`
    - Widening participation / care-experienced / refugee / access headings: **ABSENT — NOT PUBLISHED.**
16. **Alternative offer routes:**
    - IB verbatim: `Pass, with 36-34 points overall with 18-17 points at Higher Level, including 6 at Higher
      Level in Mathematics (Analysis and Approaches or Applications and Interpretation) and 6 at Higher
      Level in Physics`
    - RQF BTEC verbatim: `D in the BTEC Extended Certificate plus grades AA from two A-levels including
      physics and either mathematics or further mathematics.`
    - `Show more entry requirements` routes (Access to HE, Irish, Scottish, Welsh Bacc, T Level): NOT RETRIEVED.
    - Engineering/Physics/Mathematics Foundation Year route published.
17. **Deadline:** NOT STATED.
18. **Contiguous raw block:** **NOT captured as a verified contiguous run** — see the flag in field 5. Omitted
    deliberately rather than reconstructed.
19. **Study options inside one application:** verbatim: `The first 2 years of this programme are the same as
    the physics master's, which means you can switch to the 4-year MPhys degree.` This is an **internal
    transfer**, not a separate application. No named specialisation pathways published for F300.
20. **Provenance:**
    - sourceUrl: `https://www.southampton.ac.uk/courses/physics-degree-bsc`
    - page title: `Physics Degree (Hons) | BSc | University of Southampton`
    - **Entry year shown: 2027/28.** Verbatim `For Academic year 202728`, plus `For entry in academic year
      2027 to 2028` in Modules.

---

## Course 3 — Physics with Astronomy (MPhys) — **2027 NOT RETRIEVED (page served 2026/27)**

**This is the honest negative result. NOTHING below is recorded as a 2027 figure.**

1. **Exact official title:** `Physics with Astronomy`, award line `MPhys`. Page title: `Physics with Astronomy | MPhys | University of Southampton`
2. **UCAS code:** `F3FM` — **SHARED**: the official School listing prints `F3FM` against **both** `MPhys
   Physics with Astronomy` **and** `MPhys Astrophysics with Year Abroad`. See Identity section.
3. **Award:** `Master of Physics`
4. **Duration:** `4 years`, `Full-time`, `Highfield`
5. **A-Level offer for 2027: NOT RETRIEVED.**
   The server-rendered panel on this page is headed `For Academic year 202627` and is therefore **2026/27
   data**. The page does expose an `Academic year filter options` control whose tab labels include
   `For Academic Year 2027/28`, but **the 2027/28 tab's content is not present in the server-rendered
   HTML** — it is JavaScript-gated.
   - For completeness, the **2026/27** figure actually served was `A*AA-AAA ... or AABB-AABC ...`
     (same shape as F303). **This is 2026/27 and MUST NOT be imported as 2027.**
6-17. **All fields for 2027: NOT RETRIEVED** for the same reason. (The 2026/27 block's contents were read in
   full and are structurally identical to Course 1, but they are the wrong year and are not transcribed
   here as course data, to eliminate any risk of them being harvested as 2027 values.)
13. **Admissions test (2026/27 panel, for reference only): NO TEST MENTION.** 2027 status: NOT RETRIEVED.
14. **Interview (2026/27 panel, reference only):** `Successful applicants will be invited to visit the
    department and attend an optional interview. The optional interview may lead to a lower offer.`
    2027 status: NOT RETRIEVED.
18. **Contiguous raw block:** a genuine contiguous block WAS captured — but it is the **2026/27** block. It
    is preserved in the RETRIEVAL ATTEMPTS evidence section, clearly labelled 2026/27, not here.
19. **Study options inside one application:** verbatim (from the page body, year-independent): `High-performing
    students have the opportunity to apply for MPhys Astrophysics with a Year Abroad for year 4.` This is
    consistent with `F3FM` being one application covering both named courses.
20. **Provenance:**
    - sourceUrl: `https://www.southampton.ac.uk/courses/physics-with-astronomy-degree-mphys`
    - page title: `Physics with Astronomy | MPhys | University of Southampton`
    - **Entry year the requirements panel actually showed: 2026/27** (heading verbatim `For Academic year
      202627`). A `2027/28` tab label exists but renders no server-side content.

---
