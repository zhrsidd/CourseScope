/**
 * THE APPLICATION-IDENTITY INVARIANT
 * ===================================================================
 *
 * A distinct title or marketing page is NOT sufficient evidence for a distinct
 * application identity. A separate production course record requires
 * authoritative evidence of a separately applied-to programme.
 *
 * This file states the rule, names the evidence that satisfies it, and provides
 * the checks that enforce it. It holds no admissions logic and no data.
 *
 * -------------------------------------------------------------------
 * WHY THE RULE EXISTS
 * -------------------------------------------------------------------
 *
 * Universities publish pages, not applications. A page can describe a
 * specialism, a pathway, a later-year option, a route, a stream, a
 * concentration, a placement choice or an internal curriculum option — each
 * with its own title, its own URL and its own curriculum description — and none
 * of those is something a student can type into UCAS.
 *
 * Every failure this catalogue has had in this area was the same failure:
 *
 *   · Imperial "Aeronautics with Spacecraft Engineering" has its own page and
 *     tells applicants to apply to H401. It is a route inside H401.
 *   · Imperial "Mechanical Engineering with Nuclear Engineering" likewise sits
 *     inside H301.
 *   · Manchester's five "Materials Science and Engineering with X" MEng titles
 *     have their own descriptions and are entered by TRANSFER after year two.
 *     Two of them were once created as separate courses. They are pathways in
 *     J501, and Manchester publishes no code for any of them.
 *   · York's Engineering BEng publishes Year 3 OPTION MODULES named "Robotics",
 *     "Biomedical Engineering" and "Renewable Power Generation" — the same
 *     words as three separately coded York degrees. The modules are not the
 *     degrees, and neither is an application.
 *
 * And the rule cuts the other way just as often, which is why it is stated as
 * an evidence test rather than as a bias toward merging:
 *
 *   · Lancaster's six engineering disciplines share a genuine common first year
 *     and are still six separate applications — each has its own complete set
 *     of seven UCAS codes.
 *   · Southampton's Aeronautics "slash" streams read like sub-routes and each
 *     prints its own "When you apply use" code.
 *   · Loughborough's placement variants have their own codes, and share one
 *     offer and one page with the non-placement version.
 *
 * -------------------------------------------------------------------
 * WHAT COUNTS AS EVIDENCE
 * -------------------------------------------------------------------
 *
 * STRONG evidence of a separate application — any one is sufficient:
 *   1. a distinct official UCAS code;
 *   2. an explicit university instruction that this is applied to separately;
 *   3. a distinct application identity in the university's own course finder;
 *   4. other authoritative university evidence that applicants apply separately.
 *
 * NOT evidence, individually or together:
 *   · its own webpage
 *   · its own title
 *   · its own curriculum description
 *   · a distinct marketing or subject-area grouping
 *   · a shared or separate first year
 *   · the existence of a counterpart award elsewhere in the family
 *   · a URL path segment that looks like a code
 *
 * DISQUALIFYING: if the university says "apply to [parent code]", the child is
 * a study option, whatever else it has.
 *
 * -------------------------------------------------------------------
 * COROLLARIES
 * -------------------------------------------------------------------
 *   · A BEng does not imply an MEng, and an MEng does not imply a BEng. York
 *     publishes Biomedical Engineering as BEng-only and Medical Engineering as
 *     MEng-only.
 *   · A common first year does not merge applications.
 *   · A shared curriculum does not separate them.
 *   · A URL slug is not a UCAS code. Leeds' page paths (`a602`, `f443`) are
 *     internal identifiers that sit where a code would look natural.
 *   · The same UCAS code at two universities is two applications, not a
 *     duplicate. Codes are unique within an institution, not between them.
 */

import type { Course } from '@/types';
import { canonicaliseCourseName, normaliseCourseCode } from './identity';

/** Wording that indicates the applicant applies somewhere else. */
const PARENT_APPLICATION_PHRASES: readonly RegExp[] = [
  /\bapply (?:to|through|via|using)\s+(?:UCAS\s+)?(?:course\s+)?code\b/i,
  /\bapply (?:to|for)\s+[A-Z]{1,2}\d{2,3}[A-Z0-9]?\b/,
  /\bwhen you apply use\b/i,
  /\bapplications? (?:are|is) made via\b/i,
] as const;

/** Wording that indicates a route chosen after admission rather than applied to. */
const PATHWAY_PHRASES: readonly RegExp[] = [
  /\btransfer (?:on)?to one of\b/i,
  /\bchoose (?:a |one )?(?:specialism|specialisation|pathway|stream)\b/i,
  /\bselect (?:your |a )?specialism\b/i,
  /\bin year 2\b/i,
  /\bafter your second year\b/i,
  /\broute within this application\b/i,
] as const;

export interface IdentityRisk {
  courseId: string;
  kind: 'parent-application-instruction' | 'pathway-wording';
  evidence: string;
}

/**
 * Records whose own stored text says the applicant applies elsewhere, or that
 * describe themselves as a route chosen after admission.
 *
 * This is a REVIEW signal, not a verdict. A record can legitimately quote such
 * wording while still being its own application — Southampton's F303 record
 * quotes "When you apply use: UCAS course code: F303" about ITSELF, and
 * Lancaster's discipline records describe the common first year. The check
 * therefore fires only where the wording points at a code the record does not
 * itself carry.
 */
export function identityRisks(courses: Course[]): IdentityRisk[] {
  const out: IdentityRisk[] = [];
  for (const c of courses) {
    const text = `${c.notes ?? ''} ${c.rawRequirementText ?? ''}`;
    if (!text.trim()) continue;
    const own = normaliseCourseCode(c.courseCode);

    for (const re of PARENT_APPLICATION_PHRASES) {
      const m = re.exec(text);
      if (!m) continue;
      // Pull the code the wording points at, and ignore it when it is this
      // record's own code — a course telling applicants to apply to itself is
      // the normal case, not a risk.
      // Strip UCAS INSTITUTION codes before looking for a course code.
      // Southampton prints "UCAS course code: F3QT; UCAS institution code: S27"
      // on its own page — S27 is the university, not a course, and reading it
      // as one turned a record quoting its OWN code into a false positive.
      const after = text.slice(m.index, m.index + 120).replace(/institution code:?\s*[A-Z]\d{1,3}/gi, '');
      const code = /\b([A-Z]{1,2}\d{2,3}[A-Z0-9]?|[A-Z]\d[A-Z]\d|\d{2}[A-Z]{2})\b/.exec(after);
      const pointed = normaliseCourseCode(code?.[1] ?? null);
      if (pointed && own && pointed === own) continue;
      if (!pointed) continue;
      out.push({ courseId: c.id, kind: 'parent-application-instruction', evidence: after.trim() });
      break;
    }

    if (c.studyOptions.length === 0 && !own) {
      for (const re of PATHWAY_PHRASES) {
        const m = re.exec(text);
        if (!m) continue;
        out.push({
          courseId: c.id,
          kind: 'pathway-wording',
          evidence: text.slice(m.index, m.index + 120).trim(),
        });
        break;
      }
    }
  }
  return out;
}

export interface CodeCollision {
  universityId: string;
  applicationYear: string;
  code: string;
  courseIds: string[];
  canonicalNames: string[];
}

/**
 * The same normalised UCAS code held by more than one live record at one
 * university in one cycle, where the records are NOT the same course.
 *
 * Two records sharing a code at the same university is either a cross-listing
 * (store once) or an error (one of them is wrong). Either way a human decides,
 * so this reports rather than merges. Records that canonicalise to the same
 * name and award are excluded — those are the ordinary supersede case, already
 * handled by the identity rules.
 */
export function codeCollisions(courses: Course[]): CodeCollision[] {
  const buckets = new Map<string, Course[]>();
  for (const c of courses) {
    const code = normaliseCourseCode(c.courseCode);
    if (!code) continue;
    const key = `${c.universityId}|${c.applicationYear}|${code}`;
    const list = buckets.get(key);
    if (list) list.push(c);
    else buckets.set(key, [c]);
  }

  const out: CodeCollision[] = [];
  for (const [key, group] of buckets) {
    if (group.length < 2) continue;
    const identities = new Set(
      group.map((c) => `${canonicaliseCourseName(c.name)}|${c.degreeType}`),
    );
    if (identities.size < 2) continue;
    const [universityId, applicationYear, code] = key.split('|');
    out.push({
      universityId,
      applicationYear,
      code,
      courseIds: group.map((c) => c.id),
      canonicalNames: [...identities],
    });
  }
  return out;
}

/**
 * Records whose stored UCAS code appears as a segment of their own source URL
 * and whose notes say nothing about where the code was read.
 *
 * Batch 5 proved this matters: three Leeds codes had been taken from page path
 * segments (`5200`, `f411`, `f414`) that sit exactly where a UCAS code would
 * look natural, and all three were wrong. A code that only ever appeared in a
 * URL has no provenance.
 *
 * Deliberately narrow. A record that says where its code came from — "read in
 * the UCAS code field", "read off the A–Z", "prints When you apply use" — does
 * not fire, because that is provenance.
 */
export function unsupportedCodeProvenance(courses: Course[]): string[] {
  const SAYS_WHERE = /UCAS code field|read off|read in the|A–Z|A-Z|key.?facts|course finder|listing|When you apply use|prints/i;
  const out: string[] = [];
  for (const c of courses) {
    const code = normaliseCourseCode(c.courseCode);
    const url = c.provenance.sourceUrl;
    if (!code || !url) continue;
    const segments = url.toLowerCase().split(/[/?#=&.]/).filter(Boolean);
    if (!segments.includes(code.toLowerCase())) continue;
    if (SAYS_WHERE.test(c.notes ?? '')) continue;
    out.push(c.id);
  }
  return out;
}

/**
 * Awaiting-data records whose IDENTITY itself rests on nothing official.
 *
 * An awaiting-data row is a promise: "this application exists, we just have not
 * read its requirements yet." Batch 7 showed that promise comes in two very
 * different strengths, and the catalogue was treating them as one.
 *
 *   · York's 22 engineering rows cite York's own "Courses 2027/28" A–Z, read in
 *     full with the filter at "Showing all courses". Lancaster's 25 physics
 *     rows cite the Department of Physics listing that enumerates all 25 codes.
 *     Southampton's 5 cite the course pages themselves. The identity is
 *     evidenced; only the admissions fields are missing.
 *   · Eight rows — three at King's College London, four at Queen Mary, one at
 *     Bath — cite NOTHING. No official URL, no source, no check date, and a
 *     generic note that says only that requirements are unresearched. Their
 *     titles and codes came from the original scaffold, which the catalogue has
 *     repeatedly proved is a hypothesis rather than a fact: the scaffold also
 *     produced Imperial's F340, York's H610 MEng, Lancaster's FG31 and three
 *     invented Bath codes, every one of which turned out not to exist.
 *
 * The rule therefore separates "researched identity, unread requirements" from
 * "unsupported identity", so the backlog can be trusted as a research target
 * list rather than read as a claim about what exists.
 *
 * Deliberately narrow, and deliberately a WARNING rather than an error: these
 * rows are not demonstrably wrong, they are merely unevidenced, and asserting
 * they do not exist would be the same error in the opposite direction. The
 * remedy is to verify the identity or drop the row — not to quietly keep it.
 */
export function unevidencedIdentities(courses: Course[]): string[] {
  return courses
    .filter((c) => c.provenance.identityVerification === 'unevidenced')
    .map((c) => c.id);
}

/**
 * The v1 public-data policy, in one place.
 *
 * Trust state and discoverability are different questions and v0.8 is where
 * they stop being conflated. A record may be incomplete in public — that is the
 * whole point of publishing verification states — but it may not be
 * UNSUPPORTED in public, because a student cannot tell the difference between
 * "we have not read this course's requirements" and "we are not sure this
 * course exists" unless the catalogue draws the line itself.
 *
 * So:
 *   · verified, partially verified, awaiting publication — public.
 *   · awaiting data WITH evidenced identity — public, labelled.
 *   · awaiting data with UNEVIDENCED identity — not public.
 *
 * The last case is deliberately not "hidden". It stays in the catalogue, it
 * stays in the admin tools, and it stays in the research backlog; it just
 * cannot be found by a student browsing courses, and it cannot be counted in
 * anything a student is shown. Deleting it would assert a negative nobody has
 * checked; showing it would assert a positive nobody has checked.
 *
 * At the v0.8 close this function excludes nothing, because all eight
 * unevidenced rows were resolved. It is kept, wired in and asserted anyway —
 * a policy that only exists while it has work to do is a policy that will be
 * missing the next time a scaffold row appears.
 */
export function isPubliclyDiscoverable(course: Course): boolean {
  return course.provenance.identityVerification !== 'unevidenced';
}
