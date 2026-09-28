# University of St Andrews — Undergraduate Admissions Research (Physics & Engineering)

**Target entry year:** 2027 entry
**Research date:** 2026-09-14
**Source policy:** `st-andrews.ac.uk` only as admissions evidence. Every value below was read from a
fetched official St Andrews page. No third-party guide (The Uni Guide, CUG, UCAS listings, Whatuni)
was used. Search snippets were used only to locate URLs, never as evidence.

> **Status: COMPLETE** for everything reachable. Research stopped when the web-fetch tool hit a
> session limit; the three unread items are listed as **NOT RETRIEVED** in the Appendix and are **not**
> guessed at anywhere in this file.

---

# SUMMARY

## Courses VERIFIED on an official St Andrews page showing **2027 entry**

| # | Title as printed | UCAS | Award | Duration | A-Level "Standard entry grades" | A-Level "Minimum entry grades" | Dedicated 2027 page? |
|---|---|---|---|---|---|---|---|
| 1 | Physics BSc (Honours) | F301 | BSc (Hons) | Four years full time | `AAA, including A in both: Mathematics and Physics.` | `AAB, including A in both: Mathematics and Physics.` | Yes |
| 2 | Physics MPhys (Honours) | F300 | Master in Physics (Hons) | Five years full time | `AAA, including A in both: Mathematics and Physics` | `AAB, including A in both: Mathematics and Physics` | Yes |
| 3 | Astrophysics BSc (Honours) | F511 | BSc (Hons) | Four years full time | `AAA, including A in both: Mathematics and Physics` | `AAB, including A in both: Mathematics and Physics` | Yes |
| 4 | Astrophysics MPhys (Honours) | F510 | Master in Physics (Hons) | Five years full time | `AAA, including A in both: Mathematics and Physics.` | `AAB, including A in both: Mathematics and Physics.` | Yes |
| 5 | Theoretical Physics MPhys (Honours) | F340 | Master in Physics (Hons) | Five years full time | `AAA, including A in both: Mathematics and Physics` | `AAB, including A in both: Mathematics and Physics` | Yes |
| 6 | Chemistry and Physics MSci (Hons) | FF13 | MSci (Hons) | Five years full time | `AAA, including an A in all of Chemistry Mathematics and Physics.` | `AAA, including an A in all of Chemistry Mathematics and Physics.` | Yes (hosted under Chemistry) |

**Note on #6:** at GCE A-Level the *Minimum* value is **identical** to the *Standard* value (`AAA`).
That was confirmed by reading the whole Entry requirements block literally, not inferred. The
widening-access concession for this course exists only in the SQA Highers column (AAAAB → AAAB).

## Courses that EXIST as UCAS entry routes but have NO dedicated 2027-entry requirements page

These four are printed as "Joint Honours degrees" with UCAS codes on the Physics BSc and Physics
MPhys pages, but clicking through does not lead to a course page carrying its own entry-requirements
panel (no such page could be located; a guessed URL
`/subjects/mathematics/mathematics-bsc/mathematics-and-physics-joint/` returns **HTTP 404**).

| Title as printed | UCAS | Award as printed | A-Level offer |
|---|---|---|---|
| Mathematics and Physics | FG31 | Bachelor of Science (Honours) | **NOT PUBLISHED on a dedicated page** — governed by the cross-subject rule (see below) |
| Philosophy and Physics | FV30 | Bachelor of Science (Honours) | **NOT PUBLISHED on a dedicated page** — governed by the cross-subject rule |
| Mathematics and Theoretical Physics | FGH1 | Master in Physics (Honours) | **NOT PUBLISHED on a dedicated page** — governed by the cross-subject rule |
| Chemistry and Physics | FF13 | Master in Science (Honours) | **PUBLISHED** — see course #6 above |

**The governing rule, quoted verbatim from the Physics BSc entry-requirements panel:**

> "For degrees combining more than one subject, the subject with the higher entry requirements
> determines the grades you need. You will also need to meet any further subject-specific entry
> requirements as outlined on their pages."

For the app: the joint codes FG31 / FV30 / FGH1 must **not** be given a literal A-Level string. The
only honest machine-readable value is "derived: max(parent subjects)". The parent values that were
actually read are recorded below.

## Expected courses that DO NOT EXIST at St Andrews

- **Theoretical Physics BSc** — does **not** exist. Theoretical Physics is offered **only** as the
  five-year MPhys (F340). The School of Physics and Astronomy's own undergraduate list prints exactly
  five single/named degrees: Astrophysics BSc, Astrophysics MPhys, Physics BSc, Physics MPhys,
  Theoretical Physics MPhys.
- **Computer Science and Physics** — exists only as an internal curriculum (programme-requirements
  documents `USHFCSCJPHY` up to 2024/25) and is named loosely on a School page as a possible joint
  combination. It is **NOT** printed in the Joint Honours UCAS-code list on either physics course page,
  so there is **no evidence of a 2027 UCAS entry route**. Do not create a course record for it.
- **"Physics with a year abroad"** as a separate titled course with its own UCAS code — does not exist.
  Study abroad is a study option inside the existing codes (see Fields 19).
- **Any Engineering degree** — see the dedicated section below.

## Pages NOT RETRIEVED

- `https://www.st-andrews.ac.uk/subjects/mathematics/mathematics-bsc/mathematics-and-physics-joint/`
  — **HTTP 404** (this URL was constructed by analogy with the Chemistry joint page; the 404 is itself
  the finding: no such page exists). No dedicated page for FG31 / FV30 / FGH1 could be located anywhere
  on `st-andrews.ac.uk`.
- `https://www.st-andrews.ac.uk/subjects/course-search/...` — the course-search app returns an empty
  shell when fetched (JavaScript-driven), so the catalogue was established from the Subjects A-Z, the
  School of Physics and Astronomy's own undergraduate pages, and the archived full UG course list.
- **Raw HTTP access (`curl`) is blocked by the agent proxy (`CONNECT tunnel failed, response 403`)**, so
  all reading was done through the fetch tool. One page (`academic-entry-explained`) refused wholesale
  literal reproduction; its definitions were still obtained as short exact quotes.

## Structural surprises (things that contradict a reasonable assumption)

1. **`F300` is the MPhys and `F301` is the BSc.** The five-year integrated master's holds the "rounder"
   code. Do not assume F300 = BSc.
2. **There is no Theoretical Physics BSc.** Theoretical Physics is MPhys-only.
3. **"Minimum entry grades" at St Andrews is NOT a universal floor.** It is explicitly the
   widening-access figure: *"if you are a widening access student, you will need these grades to be
   considered."* A non-widening-access A-Level applicant is held to the **Standard** figure. This is the
   opposite reading to treating it as a general fallback.
4. **For Chemistry and Physics MSci (FF13) the A-Level Standard and Minimum figures are the same string
   (`AAA`).** A widening-access A-Level applicant gets **no grade reduction** on that course, even though
   a Scottish-Highers applicant does (AAAAB → AAAB). Any app logic that assumes "minimum < standard"
   will be wrong here.
5. **"Direct entry to second year" is not a separate UCAS code.** It reuses F301 (and equivalently the
   other codes) and shortens the degree to three years (BSc) / four years (MPhys). It also publishes
   **only one** set of grades — no "Minimum entry grades" row at all.
6. **Gateway to Science (CFG2) publishes no A-Level requirement whatsoever** and its eligibility is
   Scotland-shaped (SIMD20 / low-progression school / care experienced / young carer / St Andrews
   outreach). Its page was showing **2026 entry**, not 2027.
7. **No admissions test and no interview is mentioned on ANY physics course page** — for the app this
   must be recorded as *not stated*, never as "no test".
8. **Engineering does not exist at St Andrews.** See below — this is a genuine absence, not a gap in
   the research.

---

# SCOTTISH OFFER STRUCTURE — ST ANDREWS' OWN MEANINGS

**Source:** `https://www.st-andrews.ac.uk/subjects/entry/academic-entry-explained/`
(page heading "Academic entry explained"); reinforced on every course page and on
`https://www.st-andrews.ac.uk/subjects/entry/indicator/` ("Undergraduate qualification indicator").

## The three headings, in St Andrews' own words

St Andrews uses **three** named tiers. The headings printed on each course page are exactly:

> **"Standard entry grades:"**
> **"Minimum entry grades:"**
> **"Gateway entry grades:"**

and `Academic entry explained` defines them verbatim as:

> "**Standard entry grades:** unless you are a widening access student, you will need these grades to be
> considered."

> "**Minimum entry grades:** if you are a widening access student, you will need these grades to be
> considered."

> "**Gateway entry grades:** if you are a widening access student, you may also be eligible for a gateway
> programme and, if so, will need these grades to be considered."

The indicator page words it as: *"There are three categories of entry requirements: **Standard** Unless
you are a widening access student, you will need these grades to be considered. **Minimum** If you are a
widening access student, you will need these grades to be considered."* The tool exists to *"indicate
which of our undergraduate academic entry requirements are most likely to be relevant"* using
*"contextual data for applicants in the UK"*.

## Answers to the specific questions asked

**Q. The exact heading for the main A-Level requirement, and whether the value is a single profile, a
band, or something else.**
The heading is the qualification name **"GCE A-Levels"**, and under it the sub-heading
**"Standard entry grades:"**. The value is a **SINGLE GRADE PROFILE, NOT A BAND** — e.g. exactly
`AAA, including A in both: Mathematics and Physics.` for Physics BSc. There is no
"from X to Y in one set of exams" construction anywhere on a St Andrews course page.
*(The university-wide `/subjects/entry/` overview page does print a cross-institution span —
"A-Level: ABB to A*A*A" — but that is the range across all ~50 subjects, not a course offer.)*

**Q. Is a separate "minimum entry requirements" figure published, and what does it mean?**
Yes — printed as **"Minimum entry grades:"** on every course page. On St Andrews' own page it is
**a widening-access threshold, NOT a universal floor and NOT a general contextual offer open to
everyone.** Verbatim eligibility condition: *"if you are a widening access student, you will need these
grades to be considered."*
A "widening access student" is defined by this bulleted list, quoted verbatim:
> - "live in an area underrepresented at the University of St Andrews indicated by postcode"
> - "attend a school or college with low levels of progression to the University of St Andrews"
> - "attend one of the following widening access programmes"
> - "are care experienced"
> - "have caring responsibilities"

**Q. Named widening-access / contextual schemes with the offers attached.**
1. **Gateway programmes** — a named alternative-entry family. The Faculty-of-Science one is
   **"Gateway to Science"**, UCAS **CFG2**, **BSc (General)**, *"Two years full time, with direct
   progression to year three of honours programmes"*, leading to *"one of the named degree programmes
   within the Faculty of Science."* Published academic requirement: **SQA Highers `BBBB`**.
   **No GCE A-Level requirement is published for Gateway to Science.** Eligibility, verbatim, is to
   *"live in Scotland in an area of deprivation defined by the Scottish Government as SIMD20"*,
   *"attend a low progression school"*, *"are care experienced as defined by the local authority"*,
   *"are a registered young carer"*, or *"Have engaged in a University of St Andrews led Outreach
   project"*. Interview, verbatim: *"Applicants under serious consideration for this route will be
   required to attend an interview with a member of the Admissions team and a member of our academic
   staff."* **The Gateway to Science page was showing "2026 entry", not 2027.**
2. **The guaranteed offer scheme** (the "undergraduate pledge"), verbatim:
   > "Through our guaranteed offer scheme we will make an offer to all applicants who declare a
   > care-experienced background or who reside in the 20% most deprived areas of Scotland as indicated by
   > the postcode (SIMD20) and also attend a school which has 30% or lower progression to higher
   > education, provided that the desire to study the subject is demonstrable, the minimum asking rates
   > within all specified required subjects are met and, if relevant, the applicant passes an external
   > testing or interview."
3. **Contextual data** (`/study/policy/contextual-data/`): indicators include SIMD and IMD
   (*"SIMD and IMD are governmental postcode look-up tools which identify areas of disadvantage"*),
   school progression and attainment data, ACORN, care experience, young carer, estranged students,
   *"Refugee, asylum seeker, or displaced person"*, Gypsy/Traveller/Roma/Showmen/Boaters, and
   *"Involvement in activities that have been organised to raise aspiration to attend higher
   education"*. Contextual data is applied to applicants of *Home Funded or Rest of the UK (RUK)* fee
   status, so **A-Level applicants from England/Wales/NI can qualify via IMD**, but the *guaranteed
   offer* pledge is written around **SIMD20 (Scotland only)**.

**Q. How SQA Highers are presented versus A-Levels.**
Each course page prints separate qualification blocks in this order: **"SQA Highers"**, then
**"GCE A-Levels"**, then **"IB points"** (direct-entry pages instead print **"SQA Advanced Highers and
Highers"**, then **"GCE A-Levels"**, then **"IB points"**). Each block carries its own
Standard/Minimum pair. **The A-Level figures are the second block** and are the only ones the app should
match. For the five single-subject physics degrees the Highers value is `AAAA`/`AAAB` while the A-Level
value is `AAA`/`AAB` — **do not read a four-letter Scottish string as an A-Level offer.**

**Q. Four-year BSc / five-year integrated master's and flexible first two years.**
Confirmed. BSc = *"Four years full time"*, MPhys/MSci = *"Five years full time"*. The School states
*"Both are classified first degrees with Honours, but the Integrated Masters is a more advanced degree
than the BSc"*, and on flexibility: *"The School offers a number of degree programmes, and students can
easily change from one degree intention to another as long as they have taken the appropriate
prerequisite modules"*; *"It is often possible for students to postpone a final decision between (for
instance) physics and mathematics until the start of third year"*; *"You can apply for a joint degree
programme at the outset, or you can switch into a joint degree programme provided you have taken the
appropriate modules in both subjects in years one and two."* **This is a study-option pattern inside one
UCAS application, not separate applications.**

## How this differs from the Edinburgh and Glasgow models

| | **St Andrews** | Edinburgh (per the brief) | Glasgow (per the brief) |
|---|---|---|---|
| Main A-Level heading | `GCE A-Levels` → `Standard entry grades:` | "standard entry requirements" | — |
| Shape of the main value | **Single profile** (`AAA`) | **Band** ("from AAA to ABB in one set of exams") | — |
| Second figure | `Minimum entry grades:` | "minimum entry requirements" | — |
| What the second figure means | **Widening-access-only threshold**, explicitly gated on being a "widening access student" | Widening-access threshold dressed as a "minimum" | — |
| Third tier | **`Gateway entry grades:`** — a *separate two-year UCAS programme* (CFG2), not just lower grades | no equivalent third tier named in the brief | — |
| Can the second figure be equal to the first? | **Yes** — FF13 prints `AAA` for both at A-Level | not per the brief | — |

The two substantive differences: (a) **St Andrews does not publish an A-Level band at course level** —
it publishes one exact profile, so no range parsing is needed; and (b) St Andrews' third tier
("Gateway") is not a reduced grade on the same course but a **different, two-year, separately-coded
programme that feeds into year three**. Glasgow's model was not researched here and no claim is made
about it.

---

# ENGINEERING: WHAT EXISTS

## The honest answer: **St Andrews offers no undergraduate Engineering degree of any kind.**

Evidence, all from St Andrews' own pages:

1. **The Subjects A-Z (`https://www.st-andrews.ac.uk/subjects/`) contains no engineering entry.** The
   complete printed list read from that page is: Ancient history, Arabic, Archaeology, Art history,
   Biology, Chemistry, Chinese studies, Classical studies, Classics/Greek and Latin, Comparative
   literature, Computer science, Creative writing, Digital education, Digital humanities, Divinity,
   Earth and environmental sciences, Economics, English, Film studies, Finance, French, Geography,
   German, History, Interdisciplinary studies, International education, International foundation,
   International relations, Italian, Management, Marine biology, Mathematics, Medicine, Medieval
   studies, Middle East studies, Modern languages, Music, Neuroscience, Persian, Philosophy,
   **Physics and astronomy**, Psychology, Russian, Social anthropology, Spanish, Statistics,
   Sustainable development, TESOL. **No "Engineering". No "Materials".**
2. **The full archived undergraduate course list for 2026-2027
   (`https://archive.st-andrews.ac.uk/courses/2026-2027/ug/index.html`) contains no course title with
   "Engineering", "BEng" or "MEng"** — checked explicitly against that list.
3. **There is an `Institute of Engineering`** at `https://engineering.wp.st-andrews.ac.uk/` — but it is a
   **research/community body, not a teaching unit**. Its own About page describes it as *"a portal to
   enable all Engineers (including students, early to late career academic researchers, technicians and
   administrative specialists) to develop ideas across single disciplines to transdisciplinary."*
   It publishes **no undergraduate degree, no admissions information and no UCAS code.**
4. **Historic only:** an `MEng Microelectronics and Photonics` programme specification survives at
   `https://e-vision.st-andrews.ac.uk/progspecs/ipp_0910/UUSEFMEPCMEP_0910.HTM` — a **2009/10**
   document. It is not in any current or 2026-2027 catalogue. **Do not surface it.**

## No partner / articulation engineering route was found

No St Andrews page was found describing a joint or articulated engineering degree with another
institution, and no engineering UCAS code appears anywhere in St Andrews' catalogue. **Recorded as
NOT PUBLISHED rather than as a confirmed negative for the partnership question specifically** — the
absence of any engineering degree in the catalogue is, however, confirmed positively by (1) and (2).

## The physics-adjacent things that DO exist (for anyone searching "engineering" at St Andrews)

- **Physics and astronomy** — the five degrees listed above, plus the joint codes.
- **Chemistry** (including `Chemistry and Physics MSci` FF13) — but no Materials Engineering.
- **Computer science**, **Mathematics**, **Statistics**, **Sustainable development** — adjacent, not
  engineering.
- **`Physics and Astronomy (International Year One)`** — an international-foundation route
  (see its own section below).

**For the app: create ZERO Engineering course records for St Andrews.** A "no results" answer for
Engineering at St Andrews is the correct answer.

---

# COURSE RECORDS

Common notes that apply to every St Andrews physics course page, so they are not repeated in full each
time (each course was nevertheless checked independently):

- **Field 13 (Admissions test):** no course page in the School of Physics and Astronomy mentions an
  admissions test in any form. There is no sentence to quote. Recorded as **NOT STATED** — *not* as
  "no admissions test". The only admissions-test language found anywhere is generic, in the guaranteed
  offer scheme: *"if relevant, the applicant passes an external testing or interview."*
- **Field 14 (Interview):** likewise **NOT STATED** on every physics course page. The only interview
  requirement found is on **Gateway to Science**, quoted in its own record.
- **Field 11 (Practical endorsement):** no St Andrews page read for this research mentions the science
  practical endorsement — not the course pages and not `/subjects/entry/`. **NOT PUBLISHED.**
- **Field 8 (Further Mathematics):** **NOT MENTIONED** on any page read. St Andrews does not say it is
  required, does not say it counts as a second mathematics, and does not say it is excluded.
- **Field 4 (maximum duration):** St Andrews prints only a single duration string. No maximum duration
  is published anywhere. **NOT PUBLISHED.**
- **Field 17 (deadline):** not printed on course pages. The university-wide equal-consideration deadline
  for 2027 entry is **"6pm (GMT) on Wednesday 13 January 2027"** for *"all other MA or BSc undergraduate
  applications"* (Medicine is *"6pm (GMT) on Thursday 15 October 2026"*), from
  `https://www.st-andrews.ac.uk/study/undergraduate/apply/ucas/`.
- **Field 12 (GCSE / National 5)** is a single university-wide block, quoted verbatim once here:
  > "All applicants must have attained the following qualifications, or equivalent, in addition to the
  > specific entry requirements for individual programmes."
  > **SQA qualifications** — "SQA National 5 (B) in English and one SQA National 5 (B) from the
  > following: Biology, Chemistry, Computing science, Geography, Applications of Mathematics,
  > Mathematics, Physics, Psychology."
  > **GCSE qualifications** — "GCSE (5) in English language or English literature, and one GCSE (5) from
  > the following: Biology, Chemistry, Computing Science, Geography, Mathematics, Physics, Psychology."
  > **Other qualifications** — "We accept a wide range of qualifications for entry on to our programmes."
- **Field 10 (explicitly NOT accepted subjects):** no exclusion list (General Studies, Critical Thinking
  or otherwise) appears on any page read. **NOT PUBLISHED.**

---

## 1. Physics BSc

1. **Exact official course title:** `Physics BSc (Honours) 2027 entry`
2. **UCAS code:** `F301`
3. **Award:** Bachelor of Science (Honours) — printed as `BSc (Honours)`
4. **Duration:** `Four years full time` (three years via the direct-entry-to-second-year route, same
   UCAS code). Maximum duration: **NOT PUBLISHED**
5. **A-Level offer** — heading `GCE A-Levels`, sub-heading `Standard entry grades:`
   → **`AAA, including A in both: Mathematics and Physics.`**
   This is a **single grade profile, not a range or band.**
6. **Required subjects:** Mathematics and Physics, each at grade **A**. Verbatim:
   *"Students must have studied both Physics and Mathematics at SQA Highers, GCE A-Levels, or
   equivalent."*
7. **Cross-subject rules:** verbatim from the same panel — *"For degrees combining more than one subject,
   the subject with the higher entry requirements determines the grades you need. You will also need to
   meet any further subject-specific entry requirements as outlined on their pages."*
8. **Further Mathematics:** **NOT MENTIONED**
9. **Mathematics / Physics / Chemistry individually:** Mathematics **required, grade A**;
   Physics **required, grade A**; Chemistry **not mentioned** (neither required nor excluded)
10. **Accepted alternative sciences / excluded subjects:** no alternative-science list at A-Level;
    **NOT PUBLISHED**. The only science list on the page is the GCSE/National 5 one above.
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block above
13. **Admissions test:** **NOT STATED** — no wording of any kind appears on the page
14. **Interview:** **NOT STATED** — no wording of any kind appears on the page
15. **Reduced-offer routes, each under St Andrews' own heading:**
    - `Minimum entry grades:` (GCE A-Levels) → **`AAB, including A in both: Mathematics and Physics.`**
      Applies only to a "widening access student" — see the Scottish Offer Structure section.
    - `Minimum entry grades:` (SQA Highers) → `AAAB, including A in both: Mathematics and Physics.`
    - `Gateway entry grades:` → *"Applicants who have narrowly missed the minimum entry grades, but meet
      the University's contextual criteria, may be interested in one of the University's Gateway
      programmes"* — **no grades are printed in this row on the course page**; the grades live on the
      Gateway to Science page (SQA Highers `BBBB`; **no A-Level figure published**).
    - **Care-experienced:** covered by the university-wide guaranteed offer scheme, quoted in full in the
      Scottish Offer Structure section. **Not printed on this course page.**
    - **Refugee / asylum seeker:** listed only as a contextual-data indicator
      (*"Refugee, asylum seeker, or displaced person"*). **No offer attached. NOT PUBLISHED.**
    - **Access-programme offers:** only via the widening-access definition
      (*"attend one of the following widening access programmes"*). No separate grade set.
16. **Alternative offer routes:** `Direct entry to second year` (same UCAS code F301, three years — its
    own page, recorded at §2); `Gateway to Science` (CFG2, §9);
    `Physics and Astronomy (International Year One)` (§10)
17. **Application deadline:** not on the course page; university-wide **13 January 2027, 6pm GMT**
18. **Contiguous raw requirement block** (this genuinely appears as one contiguous block on the page;
    nothing has been stitched in):
    > "The University offers different entry requirements, depending on your background. Find out more
    > about Standard, Minimum and Gateway entry requirements using academic entry explained and see which
    > entry requirements you need to look at using the entry requirements indicator.
    >
    > For degrees combining more than one subject, the subject with the higher entry requirements
    > determines the grades you need. You will also need to meet any further subject-specific entry
    > requirements as outlined on their pages.
    >
    > **SQA Highers**
    > Standard entry grades: AAAA, including A in both: Mathematics and Physics.
    > Minimum entry grades: AAAB, including A in both: Mathematics and Physics.
    > Gateway entry grades: Applicants who have narrowly missed the minimum entry grades, but meet the
    > University's contextual criteria, may be interested in one of the University's Gateway programmes.
    >
    > **GCE A-Levels**
    > Standard entry grades: AAA, including A in both: Mathematics and Physics.
    > Minimum entry grades: AAB, including A in both: Mathematics and Physics.
    >
    > **IB points**
    > Standard entry grades: 38 (HL 6,6,6), including HL6 in both Mathematics and Physics.
    > Minimum entry grades: 36 (HL 6,5,5), including HL5 in both Mathematics and Physics."
19. **Study options / named routes inside one UCAS application:**
    - **Direct entry to second year** — *"Well-qualified school leavers may be able to apply for
      admission directly into the second year of this course"*, giving a three-year BSc. Chosen **at
      application** (same UCAS code F301); the School adds *"In appropriate circumstances, students may
      change their level of entry in the first weeks of study at St Andrews."*
      URL: `https://www.st-andrews.ac.uk/subjects/physics/physics-bsc/direct/`
    - **Study abroad** — *"Physics and astronomy students can apply to participate in the University-wide
      St Andrews Abroad programme."* Chosen **after admission**; **no separate UCAS code.**
      URL: `https://www.st-andrews.ac.uk/subjects/physics/physics-bsc/`
    - **Flexible first years / later choice of degree** — School of Physics and Astronomy, verbatim:
      *"The School offers a number of degree programmes, and students can easily change from one degree
      intention to another as long as they have taken the appropriate prerequisite modules"*;
      *"It is often possible for students to postpone a final decision between (for instance) physics and
      mathematics until the start of third year"*; *"You can apply for a joint degree programme at the
      outset, or you can switch into a joint degree programme provided you have taken the appropriate
      modules in both subjects in years one and two."*
      URL: `https://www.st-andrews.ac.uk/physics-astronomy/prospective/ug/`
    - **BSc ↔ Integrated Masters** — *"Both are classified first degrees with Honours, but the Integrated
      Masters is a more advanced degree than the BSc"*; the page cross-sells the five-year MPhys options.
20. **Provenance:** `sourceUrl` = `https://www.st-andrews.ac.uk/subjects/physics/physics-bsc/`;
    page heading `Physics BSc (Honours) 2027 entry`;
    **entry year the requirements panel showed: 2027 entry (September 2027).**

---

## 2. Physics BSc — Direct entry to second year (study-option page, same UCAS code)

This is **not** a separate course for the app. It is the same UCAS code with its own requirements page.

1. **Title:** `Direct entry to second year Physics BSc (Hons) 2027 entry`
2. **UCAS code:** `F301` (identical to the four-year route)
3. **Award:** `Physics BSc (Hons)`
4. **Duration:** `Three years full time`. Maximum: **NOT PUBLISHED**
5. **A-Level offer** — heading `GCE A-Levels` → **`AAA, including Physics and Mathematics.`**
   Note the wording differs from the main page (`including Physics and Mathematics` vs
   `including A in both: Mathematics and Physics`) — transcribed as printed, not normalised.
   **There is only ONE grade row: no `Standard entry grades:` / `Minimum entry grades:` split.**
6. **Required subjects:** *"Students must have studied Physics and Mathematics at SQA Highers and
   Advanced Highers, GCE A-Levels, or equivalent."*
7. **Cross-subject rules:** none stated on this page
8. **Further Mathematics:** **NOT MENTIONED**
9. **Maths / Physics / Chemistry:** Mathematics required; Physics required; Chemistry not mentioned
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:** **NONE PUBLISHED on this page** — no `Minimum entry grades:` row and no
    `Gateway entry grades:` row appears. This is a real difference from the main course page.
16. **Alternative offer routes:** the four-year route (same code)
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw block:** the page prints, in order, `SQA Advanced Highers and Highers` →
    Advanced Highers `AA, including Physics and Mathematics.` and Highers `AAAA`; then
    `GCE A-Levels` → `AAA, including Physics and Mathematics.`; then `IB points` →
    `38 (HL 6,6,6), including HL6 in Physics and Mathematics.` *(Recorded as the sequence actually read;
    the surrounding prose was not captured as one literal block, so no longer block is claimed.)*
19. **Study options:** this page **is** the study option
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/physics/physics-bsc/direct/`;
    heading `Direct entry to second year Physics BSc (Hons) 2027 entry`; **2027 entry**

---

## 3. Physics MPhys

1. **Exact official course title:** `Physics MPhys (Honours) 2027 entry`
2. **UCAS code:** `F300`  ← note: the MPhys holds F300, the BSc holds F301
3. **Award:** `Master in Physics (Honours)`
4. **Duration:** `Five years full time` (four years via direct entry to second year). Max: **NOT PUBLISHED**
5. **A-Level offer** — `GCE A-Levels` / `Standard entry grades:`
   → **`AAA, including A in both: Mathematics and Physics`** (single profile, not a band)
6. **Required subjects:** Mathematics and Physics, each at **A**; *"Both Physics and Mathematics at SQA
   Highers, GCE A-Levels, or equivalent are mandatory."*
7. **Cross-subject rules:** same university sentence — *"for joint degree programmes, the subject with the
   higher entry requirements determines the grades you need"*
8. **Further Mathematics:** **NOT MENTIONED**
9. **Maths / Physics / Chemistry:** Mathematics required A; Physics required A; Chemistry not mentioned
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:**
    - `Minimum entry grades:` (GCE A-Levels) → **`AAB, including A in both: Mathematics and Physics`**
    - `Minimum entry grades:` (SQA Highers) → `AAAB, including A in both: Mathematics and Physics`
    - `Gateway entry grades:` → *"Applicants who have narrowly missed the minimum entry grades, but meet
      the University's contextual criteria, may be interested in one of the University's Gateway
      programmes"* (no grades printed in this row)
    - care-experienced / refugee / access-programme: as §1 — university-wide only, **not on this page**
16. **Alternative offer routes:** direct entry to second year (four-year MPhys, same code); Gateway to
    Science; International Year One
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw block:** the `SQA Highers` / `GCE A-Levels` / `IB points` sequence with
    Standard/Minimum/Gateway rows exactly as transcribed in Field 15 and Field 5. No longer literal block
    is claimed for this page.
19. **Study options / named routes within the one application:**
    - **Direct entry to second year** — four-year MPhys, same UCAS code
    - **Study abroad** — St Andrews Abroad programme, no separate code
    - **Switch between degree intentions** — *"students can easily change from one degree intention to
      another as long as they have taken the appropriate prerequisite modules"* (School page)
    - The page cross-sells: BSc Physics, BSc Astrophysics, MPhys Theoretical Physics, MPhys Astrophysics,
      MPhys Mathematics and Theoretical Physics, MSci Chemistry and Physics
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/physics/physics-mphys/`;
    heading `Physics MPhys (Honours) 2027 entry`; **2027 entry (September 2027)**

---

## 4. Astrophysics BSc

1. **Exact official course title:** `Astrophysics BSc (Honours) 2027 entry`
2. **UCAS code:** `F511`
3. **Award:** `BSc (Honours)`
4. **Duration:** `Four years full time` (three years for direct entry to second year). Max: **NOT PUBLISHED**
5. **A-Level offer** — `GCE A-Levels` / `Standard entry grades:`
   → **`AAA, including A in both: Mathematics and Physics`** (single profile, not a band)
6. **Required subjects:** Mathematics and Physics, each at **A**; both *"at SQA Highers, GCE A-Levels, or
   equivalent"* are mandatory
7. **Cross-subject rules:** same university-wide higher-of-the-two rule as §1
8. **Further Mathematics:** **NOT MENTIONED**
9. **Maths / Physics / Chemistry:** Mathematics required A; Physics required A; Chemistry not mentioned
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:**
    - `Minimum entry grades:` (GCE A-Levels) → **`AAB, including A in both: Mathematics and Physics`**
    - `Minimum entry grades:` (SQA Highers) → `AAAB, including A in both: Mathematics and Physics`
    - `Gateway entry grades:` → the standard Gateway sentence; no grades printed in the row
    - care-experienced / refugee / access-programme: university-wide only
16. **Alternative offer routes:** direct entry to second year (three-year BSc, same code); Gateway to
    Science; International Year One
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw block:** `SQA Highers` (Standard `AAAA...` / Minimum `AAAB...` / Gateway sentence) →
    `GCE A-Levels` (Standard `AAA...` / Minimum `AAB...`) → `IB points`
    (Standard `38 (HL 6,6,6)...` / Minimum `36 (HL 6,5,5)...`). No longer literal block claimed.
19. **Study options:** direct entry to second year; St Andrews Abroad study-abroad programme; progression
    to / switch with the five-year `Astrophysics MPhys`; School-wide freedom to change degree intention
    while prerequisites are met
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/physics/astrophysics-bsc/`;
    heading `Astrophysics BSc (Honours) 2027 entry`; **2027 entry**

---

## 5. Astrophysics MPhys

1. **Exact official course title:** `Astrophysics MPhys (Honours) 2027 entry`
2. **UCAS code:** `F510`
3. **Award:** `MPhys (Honours)` / Master in Physics (Honours)
4. **Duration:** `Five years full time` (four years for direct entry to second year). Max: **NOT PUBLISHED**
5. **A-Level offer** — `GCE A-Levels` / `Standard entry grades:`
   → **`AAA, including A in both: Mathematics and Physics.`**
6. **Required subjects:** *"Physics and Mathematics at SQA Highers, GCE A-Levels, or equivalent"*, each at **A**
7. **Cross-subject rules:** same university-wide higher-of-the-two rule
8. **Further Mathematics:** **NOT MENTIONED**
9. **Maths / Physics / Chemistry:** Mathematics required A; Physics required A; Chemistry not mentioned
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:**
    - `Minimum entry grades:` (GCE A-Levels) → **`AAB, including A in both: Mathematics and Physics.`**
    - `Minimum entry grades:` (SQA Highers) → `AAAB, including A in both: Mathematics and Physics.`
    - `Gateway entry grades:` → *"Applicants who have narrowly missed the minimum entry grades, but meet
      the University's contextual criteria, may be interested in one of the University's Gateway
      programmes"*
    - care-experienced / refugee / access-programme: university-wide only
16. **Alternative offer routes:** direct entry to second year; Gateway to Science; International Year One
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw block:** as §4's structure with the MPhys values. No longer literal block claimed.
19. **Study options:** `BSc Astrophysics` (four years) as the alternative award; direct entry to second
    year (four-year MPhys); *"Study abroad via St Andrews Abroad programme"*; School-wide flexibility to
    change degree intention
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/physics/astrophysics-mphys/`;
    heading `Astrophysics MPhys (Honours) 2027 entry`; **2027 entry (September 2027)**

---

## 6. Theoretical Physics MPhys

**There is no Theoretical Physics BSc.** This subject is MPhys-only.

1. **Exact official course title:** `Theoretical Physics MPhys (Honours) 2027 entry`
2. **UCAS code:** `F340`
3. **Award:** `Master in Physics (Honours)`
4. **Duration:** `Five years full time` (four years via direct entry to second year). Max: **NOT PUBLISHED**
5. **A-Level offer** — `GCE A-Levels` / `Standard entry grades:`
   → **`AAA, including A in both: Mathematics and Physics`**
6. **Required subjects:** Mathematics and Physics, each at **A**
7. **Cross-subject rules:** same university-wide higher-of-the-two rule
8. **Further Mathematics:** **NOT MENTIONED** — notable, given the course is the theoretical/mathematical
   stream; St Andrews still does not ask for Further Maths
9. **Maths / Physics / Chemistry:** Mathematics required A; Physics required A; Chemistry not mentioned
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:**
    - `Minimum entry grades:` (GCE A-Levels) → **`AAB, including A in both: Mathematics and Physics`**
    - `Minimum entry grades:` (SQA Highers) → `AAAB, including A in both: Mathematics and Physics`
    - `Gateway entry grades:` → *"Applicants who have narrowly missed the minimum entry grades, but meet
      the University's contextual criteria, may be interested in one of the University's Gateway
      programmes"*
16. **Alternative offer routes:** **Direct entry to second year** — own page,
    `Direct entry to second year Theoretical Physics MPhys (Hons) 2027 entry`, **same UCAS code F340**,
    `Four years full time`, `GCE A-Levels` → **`AAA, including Physics and Mathematics`**, and
    **no `Minimum entry grades:` row exists on that page at all**.
    URL: `https://www.st-andrews.ac.uk/subjects/physics/theoretical-physics-mphys/direct/`
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw block:** `SQA Highers` (Standard `AAAA...` / Minimum `AAAB...` / Gateway sentence) →
    `GCE A-Levels` (Standard `AAA...` / Minimum `AAB...`) → `IB points`. No longer literal block claimed.
19. **Study options:** BSc Physics (four years, or three with direct entry); Physics MPhys; Astrophysics
    MPhys; joint `MPhys Mathematics and Theoretical Physics` (FGH1); study abroad; School-wide freedom to
    postpone the physics/mathematics decision *"until the start of third year"*
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/physics/theoretical-physics-mphys/`;
    heading `Theoretical Physics MPhys (Honours) 2027 entry`; **2027 entry**

---

## 7. Chemistry and Physics MSci  ← the one joint degree with a real 2027 requirements page

Hosted under **Chemistry**, not under Physics, which is why it is easy to miss.

1. **Exact official course title:** `Chemistry and Physics MSci (Hons) 2027 entry`
2. **UCAS code:** `FF13`
3. **Award:** `MSci (Hons)` — printed elsewhere as `Master in Science (Honours) Chemistry and Physics`
4. **Duration:** `Five years full time`. Max: **NOT PUBLISHED**
5. **A-Level offer** — `GCE A-Levels` / `Standard entry grades:`
   → **`AAA, including an A in all of Chemistry Mathematics and Physics.`**
   (Transcribed exactly, including the missing comma after "Chemistry" in St Andrews' own text.)
6. **Required subjects:** **three** subjects each at **A** — Chemistry, Mathematics, Physics.
   Verbatim: *"Yes, applicants are expected to have studied Chemistry, Mathematics and Physics at SQA
   Higher, GCE A-Level, IB Higher Level, or equivalent."*
   This is effectively a **fixed three-subject A-Level profile** — `AAA` with all three named, leaving no
   free choice.
7. **Cross-subject rules:** the panel carries the same university sentence about the higher of the two
   subjects determining the grades; in practice this course publishes its own combined figure
8. **Further Mathematics:** **NOT MENTIONED**
9. **Maths / Physics / Chemistry:** all three **required at grade A**
10. **Alternatives / exclusions:** **NOT PUBLISHED** — no alternative science may be substituted for
    Chemistry or Physics, but the page does not say so explicitly either
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** as the common block
13. **Admissions test:** **NOT STATED**
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:**
    - `Minimum entry grades:` (GCE A-Levels) → **`AAA, including an A in all of Chemistry Mathematics and
      Physics.`** — **IDENTICAL to the Standard figure.** Verified by reading the whole block literally.
      **A widening-access A-Level applicant gets no grade reduction on this course.**
    - `Minimum entry grades:` (SQA Highers) → `AAAB, including an A in all of Chemistry Mathematics and
      Physics.` — here there *is* a reduction (Standard is `AAAAB`)
    - `Gateway entry grades:` → *"Applicants who have narrowly missed the minimum entry grades, but meet
      the University's contextual criteria, may be interested in one of the University's Gateway
      programmes."*
16. **Alternative offer routes:** Gateway to Science (CFG2)
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw requirement block — this one WAS read literally, in page order, as a single block:**
    > "The University offers different entry requirements, depending on your background. Find out more
    > about Standard, Minimum and Gateway entry requirements using academic entry explained and see which
    > entry requirements you need to look at using the entry requirements indicator.
    >
    > **SQA Highers**
    > Standard entry grades:
    > AAAAB, including an A in all of Chemistry Mathematics and Physics.
    > Minimum entry grades:
    > AAAB, including an A in all of Chemistry Mathematics and Physics.
    > Gateway entry grades:
    > Applicants who have narrowly missed the minimum entry grades, but meet the University's contextual
    > criteria, may be interested in one of the University's Gateway programmes.
    >
    > **GCE A-Levels**
    > Standard entry grades:
    > AAA, including an A in all of Chemistry Mathematics and Physics.
    > Minimum entry grades:
    > AAA, including an A in all of Chemistry Mathematics and Physics.
    >
    > **IB points**
    > Standard entry grades:
    > 38 (HL 6,6,6), including an HL6 in Chemistry and HL6 in both: Mathematics, Physics.
    > Minimum entry grades:
    > 36 (HL 6,5,5), including an HL6 in Chemistry and HL5 in both: Mathematics, Physics.
    >
    > **General entry requirements**
    > All applicants must have attained the following qualifications, or equivalent, in addition to the
    > specific entry requirements for individual programmes.
    > **SQA qualifications**
    > SQA National 5 (B) in English and one SQA National 5 (B) from the following: Biology, Chemistry,
    > Computing science, Geography, Applications of Mathematics, Mathematics, Physics, Psychology.
    > **GCSE qualifications**
    > GCSE (5) in English language or English literature, and one GCSE (5) from the following: Biology,
    > Chemistry, Computing Science, Geography, Mathematics, Physics, Psychology.
    > **Other qualifications**
    > We accept a wide range of qualifications for entry on to our programmes.
    > **Do I need to have studied this subject before?**
    > Yes, applicants are expected to have studied Chemistry, Mathematics and Physics at SQA Higher, GCE
    > A-Level, IB Higher Level, or equivalent.
    > **International applicants**
    > If English is not your first language, you will need to provide an English language test score."
19. **Study options:** joint-degree structure across two Schools; School-of-Physics statement that a
    student may *"switch into a joint degree programme provided you have taken the appropriate modules in
    both subjects in years one and two"* — so FF13 can also be reached from inside another code.
    **Direct entry to second year is NOT available for the Chemistry joint route** — the School states
    direct entry *"is available only for the Mathematics joint degree, not for Chemistry or Philosophy
    options."* (`https://www.st-andrews.ac.uk/physics-astronomy/prospective/ug/entry-routes/`)
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/chemistry/chemistry-mchem/chemistry-and-physics-joint/`;
    heading `Chemistry and Physics MSci (Hons) 2027 entry`; **2027 entry (September 2027)**

---

## 8. The three remaining joint codes — FG31, FV30, FGH1 (no dedicated requirements page)

These are printed as real UCAS entry routes in a block headed **"Joint Honours degrees"** on both the
Physics BSc and Physics MPhys pages, exactly as:

> UCAS code **FG31** — "Bachelor of Science (Honours) Mathematics and Physics"
> UCAS code **FV30** — "Bachelor of Science (Honours) Philosophy and Physics"
> UCAS code **FGH1** — "Master in Physics (Honours) Mathematics and Theoretical Physics"
> UCAS code **FF13** — "Master in Science (Honours) Chemistry and Physics"  *(→ §7, has its own page)*

The Mathematics BSc page prints the same codes in its own joint-degree table:
`Mathematics and Physics — FG31 — BSc`; `Mathematics and Theoretical Physics — FGH1 — Master in Physics`.

### Fields 1–20 for FG31, FV30 and FGH1

1. **Titles as printed:** `Mathematics and Physics`, `Philosophy and Physics`,
   `Mathematics and Theoretical Physics`
2. **UCAS codes:** `FG31`, `FV30`, `FGH1`
3. **Awards as printed:** `Bachelor of Science (Honours)`, `Bachelor of Science (Honours)`,
   `Master in Physics (Honours)`
4. **Duration:** **NOT PUBLISHED** for these codes specifically. (BSc joint routes sit in the four-year
   BSc pattern and FGH1 in the five-year integrated-master's pattern, but **no page states this per
   code**, so it is not recorded as a published value.)
5. **A-Level offer:** **NOT PUBLISHED.** No page carrying an entry-requirements panel exists for any of
   these three codes. A constructed URL
   (`/subjects/mathematics/mathematics-bsc/mathematics-and-physics-joint/`) returns **HTTP 404**.
   What *is* published is the governing rule, verbatim:
   > "For degrees combining more than one subject, the subject with the higher entry requirements
   > determines the grades you need. You will also need to meet any further subject-specific entry
   > requirements as outlined on their pages."
   The relevant parent values that were actually read:
   | Parent subject | Page | Entry year shown | A-Level `Standard entry grades:` | A-Level `Minimum entry grades:` |
   |---|---|---|---|---|
   | Physics | `/subjects/physics/physics-bsc/` | 2027 | `AAA, including A in both: Mathematics and Physics.` | `AAB, including A in both: Mathematics and Physics.` |
   | Mathematics | `/subjects/mathematics/mathematics-bsc/` | September 2027 | `A*A*A, including A* in Mathematics` | `A*AB, including A* in Mathematics` |
   | Philosophy | — | — | **NOT RETRIEVED** (the Philosophy page was not read: the fetch tool hit a session limit) | **NOT RETRIEVED** |
   **For the app:** store FG31 / FGH1 / FV30 with `aLevelOffer = null` and
   `offerRule = "higher of the two constituent subjects"`. Do **not** write `A*A*A` into FG31 as if
   St Andrews had published it — that string is a consequence of the rule, not a printed course offer.
6. **Required subjects:** not published per code. The rule directs the applicant to each parent subject's
   page, so Mathematics **A\*** (from the Mathematics page) and Physics **A** (from the Physics page)
   both bite for FG31/FGH1 — again a consequence of the rule, not a printed value.
7. **Cross-subject rules:** the quoted rule above is the cross-subject rule
8. **Further Mathematics:** **NOT MENTIONED** on any page, including the Mathematics BSc page
9. **Maths / Physics / Chemistry:** per parent pages only — see the table
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** the university-wide block applies
13. **Admissions test:** **NOT STATED** (no page for these codes to state anything)
14. **Interview:** **NOT STATED**
15. **Reduced-offer routes:** **NOT PUBLISHED per code.** Derived from the rule, the parent pages'
    `Minimum entry grades:` rows would apply. University-wide guaranteed offer scheme and Gateway apply as
    everywhere else.
16. **Alternative offer routes:** **Direct entry to second year is available for the Mathematics joint
    degree only** — verbatim from the School: direct entry *"is available only for the Mathematics joint
    degree, not for Chemistry or Philosophy options."* Also: **International Year One** explicitly lists
    `BSc (Honours) Mathematics and Physics` and `MPhys (Honours) Mathematics and Theoretical Physics`
    among its progression degrees.
17. **Deadline:** university-wide 13 January 2027
18. **Contiguous raw block:** **NONE EXISTS** for these codes. No block is offered, and nothing has been
    stitched together from the parent pages.
19. **Study options / named routes within one UCAS application:** these joint degrees are themselves
    reachable **without** applying to their code — verbatim:
    *"You can apply for a joint degree programme at the outset, or you can switch into a joint degree
    programme provided you have taken the appropriate modules in both subjects in years one and two."*
    And: *"It is often possible for students to postpone a final decision between (for instance) physics
    and mathematics until the start of third year."*
    URL: `https://www.st-andrews.ac.uk/physics-astronomy/prospective/ug/`
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/physics/physics-bsc/` and
    `https://www.st-andrews.ac.uk/subjects/physics/physics-mphys/` (the "Joint Honours degrees" code
    lists, both pages showing **2027 entry**) and
    `https://www.st-andrews.ac.uk/subjects/mathematics/mathematics-bsc/` (joint-degree code table,
    **September 2027**). No course page exists for FG31, FV30 or FGH1.

---

## 9. Gateway to Science  — the named widening-access programme for the Faculty of Science

⚠️ **This page was showing `2026 entry`, NOT 2027.** Nothing below may be recorded as a 2027 figure.

1. **Exact official course title:** `Gateway to Science 2026 entry`
2. **UCAS code:** `CFG2`
3. **Award:** `BSc (General)`
4. **Duration:** `Two years full time, with direct progression to year three of honours programmes`.
   Max: **NOT PUBLISHED**
5. **A-Level offer:** **NOT PUBLISHED.** The page publishes **no GCE A-Level requirement and no IB
   requirement at all** — only *"SQA Highers BBBB"*. For a UK course-finder matching on A-Levels, this
   course has **no matchable A-Level offer**.
6. **Required subjects:** not published as an A-Level/Higher subject list; the general requirement is
   *"SQA National 5 (B) in English and one SQA National 5 (B)"* in the listed science subjects
7. **Cross-subject rules:** **NOT PUBLISHED**
8. **Further Mathematics:** **NOT MENTIONED**
9. **Maths / Physics / Chemistry:** **NOT PUBLISHED** as named A-Level requirements
10. **Alternatives / exclusions:** **NOT PUBLISHED**
11. **Practical endorsement:** **NOT PUBLISHED**
12. **GCSE / National 5:** SQA National 5 (B) English + one National 5 (B) science; **no GCSE row was
    published on this page**
13. **Admissions test:** **NOT STATED**
14. **Interview — EXPLICITLY YES**, verbatim:
    > "Applicants under serious consideration for this route will be required to attend an interview with
    > a member of the Admissions team and a member of our academic staff."
    This is the **only** interview requirement found anywhere in the physics/science space at St Andrews.
15. **Reduced-offer routes — this programme IS the reduced-offer route.** Its eligibility criteria,
    verbatim, are that applicants:
    > - "live in Scotland in an area of deprivation defined by the Scottish Government as SIMD20"
    > - "attend a low progression school"
    > - "are care experienced as defined by the local authority"
    > - "are a registered young carer"
    > - "Have engaged in a University of St Andrews led Outreach project"
    Note the first two are **Scotland-specific**, so an English A-Level applicant is largely outside this
    route except via care experience / young carer / St Andrews outreach.
16. **Alternative offer routes:** it is itself the alternative route into
    *"one of the named degree programmes within the Faculty of Science"*
17. **Deadline:** **NOT PUBLISHED on this page**
18. **Contiguous raw block:** not captured as a single literal block; the criteria in Field 15 are quoted
    individually as printed bullets. **No block is claimed.**
19. **Study options:** progression into year three of a Faculty of Science honours programme. The page
    does **not** enumerate which degrees — so whether Physics / Astrophysics / Theoretical Physics are
    specifically included is **NOT PUBLISHED on this page**, even though the physics course pages point at
    the Gateway programmes in their `Gateway entry grades:` row.
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/gateway-to-science/`;
    heading `Gateway to Science 2026 entry`; **entry year the panel showed: 2026 entry**

---

## 10. Physics and Astronomy (International Year One)

1. **Exact official course title:** `Physics and Astronomy (International Year One) 2027 entry`
2. **UCAS code:** **NOT PUBLISHED** on the page (International Foundation routes are applied for
   directly, not via a course UCAS code)
3. **Award:** **NOT PUBLISHED** as a standalone award — it is a preparatory year feeding honours degrees
4. **Duration:** `Nine months full time`. Max: **NOT PUBLISHED**
5. **A-Level offer:** **NOT PUBLISHED on the course page.** The page carries an `Entry requirements`
   heading with `Academic` and `English language requirements` subsections but defers: *"See the entry
   requirements for the International Year One in Physics and Astronomy"* (a link out to
   `/study/undergraduate/foundation/who-can-apply/academic-requirements-year-one-physics-astronomy/`).
   **That linked page was NOT RETRIEVED** — the fetch tool hit its session limit before it could be read.
   Recorded as **NOT RETRIEVED**, not as NOT PUBLISHED.
6.–12. **NOT RETRIEVED** (they live on the linked academic-requirements page)
13. **Admissions test:** **NOT STATED** on the course page
14. **Interview:** **NOT STATED** on the course page
15. **Reduced-offer routes:** **NOT PUBLISHED** — this is an international route, not a widening-access one
16. **Alternative offer routes:** it is itself an alternative entry route into the physics degrees
17. **Application deadline — PUBLISHED:** `Monday 19 July 2027`
18. **Contiguous raw block:** **NONE** — the page defers to a linked page
19. **Study options / progression degrees, as printed:**
    - `BSc (Honours) Astrophysics`
    - `MPhys (Honours) Astrophysics`
    - `BSc (Honours) Physics`
    - `MPhys (Honours) Physics`
    - `MPhys (Honours) Theoretical Physics`
    - `BSc (Honours) Mathematics and Physics`
    - `MPhys (Honours) Mathematics and Theoretical Physics`
    This is **independent confirmation of the full physics catalogue**, and it confirms that
    Theoretical Physics exists **only** as an MPhys and that `Philosophy and Physics` is not on the IYO
    progression list.
    **English language:** *"All International Foundation applicants must submit a UKVI Secure English
    Language Test (SELT) as evidence of their English language ability before they can be made an
    unconditional offer."*
20. **Provenance:** `https://www.st-andrews.ac.uk/subjects/ifp/physics-astronomy/`;
    heading `Physics and Astronomy (International Year One) 2027 entry`; **2027 entry**

---

# APPENDIX — NOT RETRIEVED / OPEN ITEMS

| Item | URL | Why |
|---|---|---|
| Philosophy parent A-Level figures (needed to make the FV30 rule transparent) | `https://www.st-andrews.ac.uk/subjects/philosophy/philosophy-ma/` | **NOT RETRIEVED** — fetch tool hit a session limit |
| International Year One academic requirements | `https://www.st-andrews.ac.uk/study/undergraduate/foundation/who-can-apply/academic-requirements-year-one-physics-astronomy/` | **NOT RETRIEVED** — same |
| Astrophysics / Physics MPhys direct-entry pages (2 of 5 direct pages read) | `/subjects/physics/astrophysics-bsc/direct/`, `/subjects/physics/astrophysics-mphys/direct/`, `/subjects/physics/physics-mphys/direct/` | Not read. The two that *were* read (Physics BSc, Theoretical Physics MPhys) both showed **2027 entry**, the same UCAS code as the parent, one single grade row and **no** `Minimum entry grades:` row. Assume nothing about the other three. |
| A 2027-entry Gateway to Science page | `https://www.st-andrews.ac.uk/subjects/gateway-to-science/` | The live page showed **2026 entry**. A 2027 version may not yet be published. |
| Whether Gateway to Science explicitly admits to Physics degrees | same | Page says only *"one of the named degree programmes within the Faculty of Science"* |
| Any engineering partnership / articulation agreement | — | No such page was found anywhere on `st-andrews.ac.uk`; the absence of engineering degrees is confirmed positively from the Subjects A-Z and the archived full 2026-2027 course list |
| `curl` / raw HTTP | — | Blocked by the agent proxy (`CONNECT tunnel failed, response 403`); all reading done via the fetch tool |

**File complete.**
