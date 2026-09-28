/**
 * Stable course identity, canonicalisation and duplicate detection.
 *
 * Identity is what lets a verified record replace a placeholder, and what stops
 * the same course arriving twice from two spreadsheets. It has to survive
 * harmless formatting differences without ever collapsing two genuinely
 * different courses into one.
 *
 * Preferred key:  universityId + UCAS course code + entry year
 * Fallback key:   universityId + canonical course name + degree type + entry year
 *
 * The degree type stays in the fallback key on purpose: "Physics BSc" and
 * "Physics MPhys" are different courses with different requirements, and must
 * never merge.
 */

import type {
  Course,
  CourseIdentity,
  DuplicateFinding,
  DuplicateKind,
  IdentityBasis,
} from '@/types';

/* ------------------------------------------------------------------ */
/* Canonicalisation                                                    */
/* ------------------------------------------------------------------ */

/** Award abbreviations that carry no information beyond `degreeType`. */
const AWARD_TOKENS = [
  'mphys',
  'msci',
  'meng',
  'mmath',
  'mmathphys',
  'bsc',
  'beng',
  'ba',
  'ma',
  'mphil',
  'hons',
  'honours',
  'undergraduate',
  'degree',
];

/**
 * Words that look like noise but are NOT: stripping them would merge courses
 * that admit differently. Kept here so the exclusion is explicit and testable.
 */
export const MEANINGFUL_QUALIFIERS = [
  'year abroad',
  'year in industry',
  'industrial experience',
  'placement',
  'foundation',
  'international',
  'research',
  'study abroad',
  'european',
  'north america',
];

function stripAccents(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * "Physics MPhys", "MPhys Physics" and "Physics (MPhys)" all canonicalise to
 * "physics". "Physics with a Year Abroad" does not — the qualifier survives.
 */
export function canonicaliseCourseName(name: string): string {
  let s = stripAccents(name).toLowerCase();

  // Brackets and punctuation carry no meaning in a course title.
  s = s.replace(/[()[\]{}]/g, ' ');
  s = s.replace(/[‐-―]/g, '-');
  s = s.replace(/[.,;:/\\'"’]/g, ' ');
  s = s.replace(/\s*&\s*/g, ' and ');
  s = s.replace(/\s*-\s*/g, ' ');

  // Award tokens, wherever they appear — but only as whole words.
  const tokens = s.split(/\s+/).filter(Boolean);
  const kept = tokens.filter((t) => !AWARD_TOKENS.includes(t));

  // "with" / "in" are structural; keep them so "Physics with Astrophysics"
  // stays distinct from "Physics".
  return kept.join(' ').replace(/\s+/g, ' ').trim();
}

/** Slug form of the canonical name — safe for keys and URLs. */
export function canonicalSlug(name: string): string {
  return canonicaliseCourseName(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** UCAS codes are case-insensitive and sometimes typed with spaces. */
export function normaliseCourseCode(code: string | null | undefined): string | null {
  if (!code) return null;
  const cleaned = code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return cleaned.length ? cleaned : null;
}

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export function courseIdentity(course: Course): CourseIdentity {
  const code = normaliseCourseCode(course.courseCode);
  const canonicalName = canonicaliseCourseName(course.name);
  const basis: IdentityBasis = code ? 'ucas-code' : 'canonical-name';
  const key = code
    ? `${course.universityId}|code:${code}|${course.applicationYear}`
    : `${course.universityId}|name:${canonicalSlug(course.name)}|${course.degreeType}|${course.applicationYear}`;

  return {
    key,
    basis,
    universityId: course.universityId,
    applicationYear: course.applicationYear,
    courseCode: code,
    canonicalName,
    degreeType: course.degreeType,
  };
}

/**
 * Both keys a record can be matched on. A record with a UCAS code is still
 * matchable by canonical name, so a coded record and an uncoded one for the
 * same course still find each other.
 */
export function identityKeys(course: Course): { code: string | null; name: string } {
  const code = normaliseCourseCode(course.courseCode);
  return {
    code: code ? `${course.universityId}|code:${code}|${course.applicationYear}` : null,
    name: `${course.universityId}|name:${canonicalSlug(course.name)}|${course.degreeType}|${course.applicationYear}`,
  };
}

/* ------------------------------------------------------------------ */
/* Comparison                                                          */
/* ------------------------------------------------------------------ */

const MATERIAL_FIELDS: {
  field: string;
  get: (c: Course) => string;
}[] = [
  { field: 'name', get: (c) => c.name },
  { field: 'degreeType', get: (c) => c.degreeType },
  { field: 'courseCode', get: (c) => normaliseCourseCode(c.courseCode) ?? '' },
  { field: 'durationYears', get: (c) => String(c.durationYears ?? '') },
  { field: 'subjectSubcategory', get: (c) => c.subjectSubcategory },
  { field: 'offers', get: (c) => c.offers.map((o) => o.gradeProfile).join('/') },
  { field: 'furtherMathematics', get: (c) => c.furtherMathematics },
  { field: 'admissionsTest', get: (c) => `${c.admissionsTest.code}:${c.admissionsTest.requirement}` },
  { field: 'interview', get: (c) => c.interview },
  { field: 'verificationStatus', get: (c) => c.provenance.verificationStatus },
];

function differingFields(a: Course, b: Course): string[] {
  return MATERIAL_FIELDS.filter((f) => f.get(a) !== f.get(b)).map((f) => f.field);
}

/** Fields whose disagreement means these are probably not the same course. */
const IDENTITY_CRITICAL = ['degreeType', 'subjectSubcategory'];

/**
 * Classify a pair of records that share a university and an entry year.
 * Returns null when they are unrelated.
 */
export function compareCourses(a: Course, b: Course): DuplicateFinding | null {
  if (a.id === b.id) return null;
  if (a.universityId !== b.universityId) return null;
  if (a.applicationYear !== b.applicationYear) return null;

  const ka = identityKeys(a);
  const kb = identityKeys(b);
  const sameCode = ka.code !== null && ka.code === kb.code;
  const sameName = ka.name === kb.name;

  if (!sameCode && !sameName) {
    // Same canonical name but different award: two real, different courses.
    return null;
  }

  const diffs = differingFields(a, b);
  const basis: IdentityBasis = sameCode ? 'ucas-code' : 'canonical-name';

  // Same UCAS code but a different award or specialism: the code is being
  // reused or one record is wrong. Never merge this automatically.
  if (sameCode && IDENTITY_CRITICAL.some((f) => diffs.includes(f))) {
    return {
      kind: 'conflict',
      basis,
      aId: a.id,
      bId: b.id,
      reason: `Both records use UCAS code ${normaliseCourseCode(a.courseCode)} but disagree on ${IDENTITY_CRITICAL.filter((f) => diffs.includes(f)).join(' and ')}.`,
      differingFields: diffs,
    };
  }

  // Same course by name and award, but two different UCAS codes.
  if (sameName && !sameCode && ka.code && kb.code) {
    return {
      kind: 'conflict',
      basis,
      aId: a.id,
      bId: b.id,
      reason: 'Same canonical course name and award, but two different UCAS course codes.',
      differingFields: diffs,
    };
  }

  const kind: DuplicateKind = diffs.length === 0 ? 'exact-duplicate' : 'likely-duplicate';
  const reason =
    kind === 'exact-duplicate'
      ? `Identical records matched on ${basis === 'ucas-code' ? 'UCAS course code' : 'canonical course name'}.`
      : `Matched on ${basis === 'ucas-code' ? 'UCAS course code' : 'canonical course name'}; ${diffs.length} field${diffs.length === 1 ? '' : 's'} differ.`;

  return { kind, basis, aId: a.id, bId: b.id, reason, differingFields: diffs };
}

/**
 * All duplicate findings across a set of records. Nothing is merged — this
 * reports, and a human decides.
 */
export function findDuplicates(courses: Course[]): DuplicateFinding[] {
  const buckets = new Map<string, Course[]>();
  for (const c of courses) {
    const bucket = `${c.universityId}|${c.applicationYear}`;
    const list = buckets.get(bucket);
    if (list) list.push(c);
    else buckets.set(bucket, [c]);
  }

  const out: DuplicateFinding[] = [];
  for (const group of buckets.values()) {
    for (let i = 0; i < group.length; i += 1) {
      for (let j = i + 1; j < group.length; j += 1) {
        const finding = compareCourses(group[i], group[j]);
        if (finding) out.push(finding);
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Superseding                                                         */
/* ------------------------------------------------------------------ */

const REAL_STATUSES = new Set(['verified', 'partially-verified']);
const PLACEHOLDER_STATUSES = new Set(['demo', 'awaiting-data']);

/**
 * Placeholder records replaced by a real, checked record for the same course
 * and cycle. Matching uses the identity rules above, so a verified
 * "Physics (MPhys)" supersedes a demo "MPhys Physics".
 *
 * An `awaiting-data` shell never supersedes a `demo` record: an empty record
 * carries less information than a labelled sample, so both stay until real data
 * arrives.
 */
export function supersededIds(courses: Course[]): Set<string> {
  const realCodeKeys = new Set<string>();
  const realNameKeys = new Set<string>();

  for (const c of courses) {
    if (!REAL_STATUSES.has(c.provenance.verificationStatus)) continue;
    const k = identityKeys(c);
    if (k.code) realCodeKeys.add(k.code);
    realNameKeys.add(k.name);
  }

  const out = new Set<string>();
  for (const c of courses) {
    if (!PLACEHOLDER_STATUSES.has(c.provenance.verificationStatus)) continue;
    const k = identityKeys(c);
    if ((k.code && realCodeKeys.has(k.code)) || realNameKeys.has(k.name)) out.add(c.id);
  }
  return out;
}

/**
 * Sample rows made obsolete by a proper "not yet published" shell for the same
 * course and cycle.
 *
 * This is deliberately separate from `supersededIds`. That function answers
 * "has a checked record replaced this placeholder?"; this one answers "is this
 * invented row now duplicating a real shell?". A shell carries no requirements,
 * so it cannot supersede a placeholder on data grounds — but once a shell
 * exists for the same identity, keeping the invented row alongside it shows
 * students two rows for one course, one of them fictional. Only `demo` rows are
 * dropped, and only where the identity rules match, so unrelated sample records
 * that still provide engine coverage are untouched.
 */
export function obsoletePlaceholderIds(courses: Course[]): Set<string> {
  const cleanCodeKeys = new Set<string>();
  const cleanNameKeys = new Set<string>();

  for (const c of courses) {
    if (c.provenance.verificationStatus !== 'awaiting-publication') continue;
    if (carriesUnsourcedAdmissionsData(c)) continue;
    const k = identityKeys(c);
    if (k.code) cleanCodeKeys.add(k.code);
    cleanNameKeys.add(k.name);
  }

  const out = new Set<string>();
  for (const c of courses) {
    const status = c.provenance.verificationStatus;
    // Three shapes of obsolete row, all replaced by the clean shell:
    //  • an outright sample record;
    //  • an older "not yet published" row still carrying invented
    //    requirements or an invented admissions test;
    //  • a research target for the same course and cycle — the shell says the
    //    same thing ("no requirements here") but says WHY, and links to the
    //    published year.
    const isObsoleteShape =
      status === 'demo' ||
      status === 'awaiting-data' ||
      (status === 'awaiting-publication' && carriesUnsourcedAdmissionsData(c));
    if (!isObsoleteShape) continue;
    const k = identityKeys(c);
    if ((k.code && cleanCodeKeys.has(k.code)) || cleanNameKeys.has(k.name)) out.add(c.id);
  }
  return out;
}

/**
 * True when a record states admissions facts that no source backs. A clean
 * shell says nothing: no offers, no test, no subject stance. Anything else with
 * an empty `sourceUrl` is asserting something a human never checked.
 */
function carriesUnsourcedAdmissionsData(course: Course): boolean {
  if (course.provenance.sourceUrl) return false;
  return (
    course.offers.length > 0 ||
    course.admissionsTest.code !== 'unknown' ||
    course.furtherMathematics !== 'unknown' ||
    course.mathematics !== 'unknown' ||
    course.physics !== 'unknown'
  );
}
