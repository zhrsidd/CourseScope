# Data format

One file per kind of record, one shape each. This is the format the app imports, the format the
admin data manager exports, and the shape a Postgres/Supabase table should have.

```
data/
  universities.json   identity, departments, university-wide admissions overview
  courses.json        { "courses": [ CourseRecord, … ] }  ← the important one
  rankings.json       one row per published ranking position, each with its own provenance
  deadlines.json      one row per application deadline, scoped by entry year and audience
  fees.json           v1.1: one row per published tuition-fee category, per course and entry year
  tests.json          reference list of admissions tests
```

Rankings and deadlines live in their own files, not inside `universities.json`, because each row
carries its own source and verification status rather than inheriting the university's.

Regenerate them from the current catalogue with:

```bash
npm run export:data
```

Round trips are lossless: export → edit → import gives back the same records.

---

## The rule that governs everything

**Never write a plausible value into an empty field.** Every field below has an
explicit "we don't know" value. Use it. A record with `"sourceUrl": null` is
useful; a record with an invented URL is worse than no record at all.

| Situation | Value |
| --- | --- |
| Not recorded yet | `null`, or `"unknown"` for enum fields |
| University hasn't published this cycle | `requirementsPublicationStatus: "not-yet-published"`, `offers: []` |
| Test arrangements not announced | `admissionsTest.code: "not-announced"` |
| Real course, no data collected yet | `verificationStatus: "awaiting-data"` |

---

## CourseRecord

```jsonc
{
  "slug": "oxford-physics",              // stable across entry years; id = slug--applicationYear
  "universityId": "oxford",              // must match a universities.json id
  "name": "Physics MPhys",
  "subjectCategory": "physics",          // physics | engineering
  "subjectSubcategory": "physics",       // see the taxonomy list below
  "degreeType": "MPhys",                 // BSc | BEng | BA | MPhys | MSci | MEng | MMath | Other
  "durationYears": 4,                    // null when not recorded
  "courseCode": "F303",                  // UCAS code, or null
  "applicationYear": "2028",             // 2026 | 2027 | 2028 | 2029 — REQUIRED

  "requirementsPublicationStatus": "published",   // published | not-yet-published | unknown
  "latestPublishedYear": null,           // when unpublished, the cycle that is published

  "rawRequirementText": "A*AA including Mathematics and Physics.",   // verbatim, or null
  "offers": [ /* OfferPathway[] — see below */ ],

  "mathematics": "required",             // required | recommended | not-required | unknown
  "physics": "required",
  "chemistry": "not-required",
  "furtherMathematics": "recommended",   // seven-value scale — see below
  "furtherMathematicsNote": null,

  "admissionsTest": {
    "code": "esat",                      // none | esat | pat | tmua | step | mat | tara
                                         // | university-specific | not-announced | other | unknown
    "name": null,                        // free text, only for university-specific / other
    "requirement": "required",           // required | optional | not-required | not-announced | unknown
    "modules": ["Mathematics 1"],        // the modules that MUST be sat; [] = not recorded
    "moduleChoice": {                    // null unless the university publishes a choice
      "chooseCount": 2,
      "options": ["Physics", "Mathematics 2", "Chemistry", "Biology"]
    },
    "moduleNote": "UCL states: “…Maths 1 and any two out of…”",
    "details": "There will be an entry fee for the test.",
    "officialUrl": "https://…",
    "notes": null
  },

  "interview": "yes",                    // yes | no | sometimes | not-stated
  "interviewNote": null,
  "contextualOffer": { "availability": "yes", "details": "AAB for eligible applicants" },
                                         // yes | no | check-website | unknown
  "gcseRequirements": null,
  "englishLanguageRequirements": null,
  "internationalNotes": null,
  "placementOrStudyAbroad": null,
  "notes": null,

  "provenance": {
    "verificationStatus": "verified",    // verified | partially-verified | awaiting-publication
                                         // | awaiting-data | demo | unknown
    "officialUrl": "https://…",          // the course page
    "sourceUrl": "https://…",            // the page the requirements were read from
    "sourceTitle": "University of Oxford undergraduate admissions website",
    "lastVerified": "2026-08-15",        // YYYY-MM-DD, or null
    "sources": []                        // optional extra citations
  }
}
```

`admissionsTest.applicationYear` is set automatically from the record's own
`applicationYear` — a test arrangement is never shared between cycles.

### Fields added for real-data batch 1

| Field | Why it exists |
| --- | --- |
| `awardLabel` | Dual awards — "MPhys / BA", "BA (Hons) / MEng". `degreeType` stays single-valued so identity keys and filters keep working. |
| `durationYearsMax` | Courses running to either length: `durationYears: 3, durationYearsMax: 4` renders "3 or 4 years". |
| `alternativeCourseCodes` | Course options that share one admissions process, e.g. Oxford Engineering Science H811/H800/H200/H620/H630/H300 on the H100 record. Recording them here stops them becoming independent programmes with independent requirements. |
| `cycleNote` | The university's own wording about which cycle a page covers — needed where one page covers 2027 entry *and* deferred entry to 2028. |
| `minimumEntryStandard` | A university-wide floor published separately from the course offer (Imperial). Kept apart from the typical offer, never merged into it. |
| `admissionsTest.modules` / `moduleNote` | Which parts of a modular test **must** be sat. Empty means not recorded — combinations are course-specific and are never assumed. Imperial publishes fixed sets and they differ by course (Chemical Engineering sits Chemistry, not Physics). |
| `admissionsTest.moduleChoice` | A published *choice* of modules: `{ chooseCount, options }`. UCL Electronic and Electrical Engineering requires Mathematics 1 plus any two of Physics, Mathematics 2, Chemistry and Biology. Stored structurally so a flexible requirement is never flattened into a fixed combination. `null` where the requirement is a fixed set. |
| `typicalOffer` | A separately published "typical offer", where the university states one alongside the minimum (Imperial). Display-only — never matched against a student's grades, because it describes the offers the department made rather than a condition. |
| `offers[].appliesOnlyIfTakingAtLeast` | A pathway that only applies above a number of A-Levels, e.g. Imperial's separate four-A-Level offer. A three-A-Level applicant does not *fail* it; it does not apply. |

### The `conditional-subject` constraint

For requirements that bind only when something about the applicant is true —
Cambridge's "Further Mathematics is required to AS or A level if your school
offers it":

```jsonc
{
  "kind": "conditional-subject",
  "condition": "school-offers-further-mathematics",
  "subject": "Further Mathematics",
  "minimumGrade": null,
  "acceptsAsLevel": true,
  "description": "Further Mathematics is required to AS or A level if your school or college offers it."
}
```

The course-level `furtherMathematics` is then `"conditional"`, and the engine:

- answered **no** → `not-required`
- answered **yes**, subject present → `pass`
- answered **yes**, subject absent, `acceptsAsLevel: true` → `review` (this tool
  records A-Levels only, so an AS cannot be ruled out)
- **unanswered** → `review`

It never passes or fails on an unknown circumstance.

### OfferPathway

A course may publish several routes to an offer. Each is evaluated
independently, and a student needs to satisfy only one.

```jsonc
{
  "label": "Standard offer",
  "gradeProfile": "A*AA",                     // as published
  "required": [["Mathematics", "A*"], "Physics"],   // [subject, minGrade] or bare subject
  "recommended": ["Further Mathematics"],
  "alternatives": { "Physics": ["Chemistry"] },     // subjects accepted instead
  "constraints": [ /* see below */ ],
  "appliesOnlyIfTaking": ["Further Mathematics"],   // gates the whole pathway
  "isContextual": false,
  "rawText": "A*AA including Mathematics and Physics.",
  "notes": null
}
```

### Constraints

For rules a flat subject list cannot express.

```jsonc
// "AAA including Mathematics and Physics, with an A* in either Mathematics or Physics"
{ "kind": "min-count-at-grade", "subjects": ["Mathematics", "Physics"], "grade": "A*",
  "count": 1, "description": "An A* is required in either Mathematics or Physics." }

// "one of Physics, Chemistry or Biology at grade A"
{ "kind": "one-of", "subjects": ["Physics", "Chemistry", "Biology"], "minimumGrade": "A",
  "description": "One further science subject at grade A." }

// published wording that cannot be evaluated mechanically — reports "review required"
{ "kind": "manual-review", "description": "Offers vary by college." }
```

### Worked examples

**Simple.** `AAA including A* Mathematics and A* Physics`

```jsonc
"offers": [{ "gradeProfile": "AAA", "required": [["Mathematics","A*"],["Physics","A*"]] }]
```

**An A\* in either subject.**

```jsonc
"offers": [{
  "gradeProfile": "AAA",
  "required": ["Mathematics", "Physics"],
  "constraints": [{ "kind": "min-count-at-grade", "subjects": ["Mathematics","Physics"],
                    "grade": "A*", "count": 1,
                    "description": "An A* is required in either Mathematics or Physics." }]
}]
```

**Two alternative offers.** `A*AA, or AAA if Further Mathematics is taken`

```jsonc
"offers": [
  { "label": "Standard offer", "gradeProfile": "A*AA",
    "required": [["Mathematics","A"],["Physics","A"]] },
  { "label": "With Further Mathematics", "gradeProfile": "AAA",
    "required": [["Mathematics","A"],["Physics","A"],["Further Mathematics","A"]],
    "appliesOnlyIfTaking": ["Further Mathematics"] }
]
```

The second pathway simply does not apply to a student who is not taking Further
Mathematics — which is different from that student failing it.

### Further Mathematics scale

Only `required` is ever treated as a hard rule. The middle three are advisory:
they surface as an amber note and never turn a match into a rejection.

| Value | Meaning |
| --- | --- |
| `required` | You must be taking it |
| `strongly-recommended` | Published as a clear advantage, still not required |
| `recommended` | Published as helpful |
| `useful` | Mentioned in passing |
| `no-stated-preference` | The university publishes nothing either way |
| `not-required` | Published as not needed |
| `unknown` | We have not recorded it |

`no-stated-preference` and `unknown` are different facts: one is the
university's silence, the other is ours.

### Subject taxonomy

`subjectSubcategory` must be one of:

*Physics* — `physics`, `theoretical-physics`, `mathematical-physics`,
`astrophysics`, `physics-with-astronomy`, `physics-with-computing`,
`physics-with-mathematics`, `natural-sciences-physical`

*Engineering* — `general-engineering`, `engineering-science`, `mechanical`,
`electrical`, `electronic`, `civil`, `chemical`, `aerospace`, `aeronautical`,
`materials`, `biomedical`, `information-engineering`, `computer-engineering`

---

## Course identity

Records are matched — for deduplication and for superseding placeholders — by a stable identity, not
by a raw string comparison.

| | Key |
| --- | --- |
| Preferred | `universityId` + normalised UCAS course code + `applicationYear` |
| Fallback | `universityId` + canonical course name + `degreeType` + `applicationYear` |

Canonicalisation lowercases, strips brackets and punctuation, normalises `&` to `and`, and removes
award tokens (`MPhys`, `MSci`, `MEng`, `BSc`, `BEng`, `BA`, `Hons`…) wherever they appear. So these
are one course:

```
Physics MPhys · MPhys Physics · Physics (MPhys) · Physics BSc (Hons) → "physics"
```

These are **not**, and never merge:

```
Physics MPhys        vs  Theoretical Physics MPhys      (different specialism)
Physics MPhys        vs  Physics BSc                    (different award — degreeType is in the key)
Physics MPhys        vs  Physics with a Year Abroad     (qualifier is meaningful)
Physics MPhys @ 2027 vs  Physics MPhys @ 2028           (different cycle)
```

UCAS codes are normalised (`" f 303 "` → `F303`) so spacing and case never split an identity.

### Duplicate classification

| Kind | Meaning | On import |
| --- | --- | --- |
| `exact-duplicate` | Same identity, nothing material differs | Error |
| `likely-duplicate` | Same identity, some fields differ | Warning — listed for manual review |
| `conflict` | Same UCAS code but a different award or specialism, or the same course with two different codes | Error |

Nothing is ever merged automatically. Import checks the batch against itself *and* against the live
catalogue; the **Data manager → Duplicates** tab lists everything outstanding.

### Superseding

A `verified` or `partially-verified` record replaces a `demo` or `awaiting-data` record for the same
identity — including across formatting differences. An `awaiting-data` shell never supersedes a
`demo` record: an empty record carries less information than a labelled sample.

---

## Ranking

One record per published position. Providers, editions and categories are never combined, averaged
or substituted for one another.

```jsonc
{
  "id": "oxford--qs--physics-astronomy--2027",
  "universityId": "oxford",
  "provider": "QS World University Rankings by Subject",
  "providerShort": "QS",
  "edition": 2027,
  "category": "physics-astronomy",        // overall | physics-astronomy | engineering-technology
  "categoryLabel": "Physics & Astronomy",
  "rank": 3,
  "sourceUrl": "https://…",
  "sourceTitle": "QS World University Rankings by Subject 2027",
  "lastVerified": "2026-08-15",
  "verificationStatus": "verified",
  "notes": null
}
```

`verificationStatus: "verified"` without all of `sourceUrl`, `sourceTitle` and `lastVerified` is a
validation **error** — a placeholder can never read as a published fact. Two records with the same
provider, edition and category are also an error.

Where only one position fits on screen, the app *chooses* one (verified first, then newest edition)
and always prints the provider and edition beside it. It never merges two providers into one number.

---

## ApplicationDeadline

Universities do not have one deadline. Each record is scoped by cycle and by audience.

```jsonc
{
  "id": "oxford--deadline-earlier-ucas-deadline-2028-0",
  "universityId": "oxford",
  "label": "Earlier UCAS deadline",
  "date": "2027-10-15",                  // null when the exact date is not recorded
  "applicationYear": "2028",             // deadlines never carry across cycles
  "appliesTo": { "kind": "all-courses" },
  "notes": null,
  "sourceUrl": null,
  "sourceTitle": null,
  "lastVerified": null,
  "verificationStatus": "demo"
}
```

`appliesTo` is one of:

```jsonc
{ "kind": "all-courses" }
{ "kind": "course-slugs", "slugs": ["oxford-physics", "oxford-engineering-science"] }
{ "kind": "subject-category", "category": "engineering" }
{ "kind": "other", "description": "Applicants requiring a visa" }
```

This is how an Oxbridge earlier deadline, a test-registration deadline for two courses and the
standard UCAS date coexist at one university without any of them being applied to everything.

A deadline marked `verified` without a date, a source URL and a check date is a validation error.

---

## TuitionFee (v1.1)

`fees.json` — one row per published fee category, for one course record (slug + entry year).
Fees are a separate relation, like rankings and deadlines: course records are untouched, and a
course with no rows is simply a course with no fees recorded. Fees never reach the eligibility engine.

```jsonc
{
  "courseId": "edinburgh-physics-bsc--2027",   // must exist; its year must equal feeYear
  "universityId": "edinburgh",
  "feeYear": "2027",                           // never copied between entry years
  "category": "Rest of UK",                    // the university's own label, verbatim
  "categoryKind": "rest-of-uk",                // home | scotland | rest-of-uk | republic-of-ireland
                                               // | islands | eu | international | other
  "status": "published",                       // published | awaiting-publication | unknown
  "amount": 10050,                             // whole pounds; null unless published
  "indicativeAmount": null,                    // an "expected" figure; only when awaiting
  "currency": "GBP",
  "basis": "per-year",                         // per-year | total | other (explain in basisNote)
  "basisNote": null,
  "scope": "course",                           // course | fee-band | university-wide
  "scopeNote": null,                           // REQUIRED for university-wide: the verbatim statement
  "yearEvidence": "The tuition fees published in this table only apply if you are entering study in 2027-2028.",
  "sourceUrl": "https://study.ed.ac.uk/programmes/undergraduate-fees?programme_code=UTPHYSB&year=2027",
  "sourceTitle": "Physics BSc (Hons) — fees",
  "lastVerified": "2026-09-30",
  "note": null                                 // required for unknown, and for any indicative figure
}
```

Rules (validation errors unless noted): the course exists and its year equals `feeYear`;
`yearEvidence` names `feeYear` as the **entry** year ("2026/27" does not evidence 2027); published
rows have an amount, source URL, source title and ISO check date; the source is on the university's
own domain; awaiting/unknown rows carry no amount; one row per category per course; Scottish
universities never use a generic `home` category; a `university-wide` row quotes the statement.

The bundled data is generated: edit `data/research/fees-2027/<university>.json` (the audit trail,
with full researcher notes), then run `node scripts/import-fee-research.mjs`.

---

## CSV

For bulk entry from a spreadsheet. One row per course; the common case needs no
JSON at all.

```
slug,university_id,name,subject_category,subject_subcategory,degree_type,duration_years,
course_code,application_year,publication_status,raw_requirement_text,offer_grade_profile,
required_subjects,recommended_subjects,further_mathematics,mathematics,physics,chemistry,
admissions_test_code,admissions_test_requirement,admissions_test_details,admissions_test_url,
interview,contextual_offer,gcse_requirements,english_language_requirements,international_notes,
official_url,source_url,source_title,last_verified,verification_status,notes,offers_json
```

- `required_subjects` / `recommended_subjects`: `Mathematics:A*;Physics:A`
- `offers_json`: only for courses with several pathways or with constraints.
  When present it replaces `offer_grade_profile` / `required_subjects` /
  `recommended_subjects` entirely.

The batch-1 fields above (`awardLabel`, `durationYearsMax`,
`alternativeCourseCodes`, `cycleNote`, `minimumEntryStandard`, test modules,
`appliesOnlyIfTakingAtLeast`) are JSON-only for now — use `offers_json` and the
JSON importer for courses that need them.

Import from the **Data manager → Import / export** tab. Validation runs on every
field's vocabulary and reports each problem with its row number; a row that
fails is skipped, never guessed at.

---

## Moving to a database

The table columns are the fields above. `courses.id` is `slug + '--' +
applicationYear`; make `(slug, applicationYear)` the unique key. `offers`,
`constraints` and `sources` fit a `jsonb` column, or normalise them into
`course_offers`, `offer_subject_requirements` and `course_sources` tables.

Then write one class:

```ts
class SupabaseDataSource implements DataSource {
  async load() {
    const [{ data: universities }, { data: rows }] = await Promise.all([
      client.from('universities').select('*'),
      client.from('courses').select('*'),
    ]);
    const courses = rows.map((r) => normaliseCourseRecord(r, r.slug, [], [])).filter(Boolean);
    return { universities, courses };
  }
}
```

and change the last line of `src/lib/dataSource.ts`. No component changes —
nothing in `src/components` or `src/pages` imports a data file.
