/**
 * Record validation — development and admin only.
 *
 * These rules catch records that *look* complete but are missing the thing that
 * makes them trustworthy: a cycle, a source, a check date, a minimum grade.
 * They never change what a student sees; they drive the admin data viewer so
 * whoever is entering real data knows exactly what is outstanding.
 */

import type {
  Course,
  DuplicateFinding,
  TuitionFee,
  University,
  ValidationIssue,
  ValidationSeverity,
} from '@/types';
import { findDuplicates } from './identity';
import { codeCollisions, identityRisks, unsupportedCodeProvenance, unevidencedIdentities } from './identity-invariant';
import { meetsGrade } from './grades';
import { validateTuitionFees } from './fees';

const issue = (
  ruleId: string,
  severity: ValidationSeverity,
  message: string,
  entityId: string,
  field: string | null = null,
  entity: 'course' | 'university' = 'course',
): ValidationIssue => ({ ruleId, severity, message, entity, entityId, field });

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Tests sat as a choice of modules, where the combination is course-specific. */
const MODULAR_TESTS = new Set(['esat']);

export function validateCourse(course: Course): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  const p = course.provenance;
  const hasOffers = course.offers.length > 0;
  const status = p.verificationStatus;

  if (hasOffers && !course.applicationYear) {
    out.push(issue('missing-application-year', 'error', 'Requirements recorded with no entry year.', course.id, 'applicationYear'));
  }

  if (hasOffers && status !== 'demo' && !p.sourceUrl) {
    out.push(
      issue('grades-without-source', 'error', 'Entry requirements recorded with no source URL.', course.id, 'provenance.sourceUrl'),
    );
  }

  if (hasOffers && status !== 'demo' && !p.sourceTitle) {
    out.push(
      issue('source-without-title', 'warning', 'Source URL recorded with no source title.', course.id, 'provenance.sourceTitle'),
    );
  }

  if (status === 'verified' && !p.lastVerified) {
    out.push(
      issue('verified-without-date', 'error', 'Marked verified but has no last-verified date.', course.id, 'provenance.lastVerified'),
    );
  }

  if (status === 'verified' && !p.sourceUrl) {
    out.push(
      issue('verified-without-source', 'error', 'Marked verified but has no source URL.', course.id, 'provenance.sourceUrl'),
    );
  }

  if (p.lastVerified && !ISO_DATE.test(p.lastVerified)) {
    out.push(
      issue('bad-date-format', 'error', `Last-verified date "${p.lastVerified}" is not YYYY-MM-DD.`, course.id, 'provenance.lastVerified'),
    );
  }

  const test = course.admissionsTest;
  const testIsReal = test.code !== 'none' && test.code !== 'unknown' && test.code !== 'not-announced';
  if (testIsReal && !test.applicationYear) {
    out.push(
      issue('test-without-year', 'error', 'Admissions test recorded with no application year.', course.id, 'admissionsTest.applicationYear'),
    );
  }
  if (testIsReal && test.applicationYear && test.applicationYear !== course.applicationYear) {
    out.push(
      issue(
        'test-year-mismatch',
        'error',
        `Test is recorded for ${test.applicationYear} entry but this record is ${course.applicationYear} entry.`,
        course.id,
        'admissionsTest.applicationYear',
      ),
    );
  }
  if (testIsReal && status === 'verified' && !test.officialUrl) {
    out.push(
      issue('test-without-url', 'warning', 'Admissions test recorded with no official test URL.', course.id, 'admissionsTest.officialUrl'),
    );
  }

  for (const pathway of course.offers) {
    if (!pathway.gradeProfileGrades) {
      out.push(
        issue(
          'unparsed-grade-profile',
          'warning',
          `Pathway "${pathway.label}" has a grade profile ("${pathway.gradeProfile}") the engine cannot evaluate. It will report “review required”.`,
          course.id,
          'offers',
        ),
      );
    }
    for (const req of pathway.subjectRequirements) {
      if (req.required && !req.minimumGrade && pathway.gradeProfileGrades) {
        const distinct = new Set(pathway.gradeProfileGrades);
        // A mixed profile (e.g. A*AA) with a required subject and no minimum is
        // ambiguous: which of the grades does that subject have to be?
        if (distinct.size > 1) {
          out.push(
            issue(
              'required-subject-without-minimum',
              'warning',
              `"${req.subject}" is required in a mixed ${pathway.gradeProfile} offer but has no minimum grade recorded.`,
              course.id,
              'offers',
            ),
          );
        }
      }
    }
  }

  /* ---- the structured offer must agree with the university's own wording ---- */
  if (hasOffers && course.rawRequirementText) {
    /*
     * Only a THREE- or FOUR-grade token can be an overall A-Level profile. A
     * two-letter token is a subject pair, not an offer: Nottingham publishes
     * "Including AA in A level maths and physics" as its subject clause beside
     * a separate AAA offer, and reading that "AA" as the profile would report a
     * contradiction that does not exist. Three- and four-grade tokens are still
     * checked in full, which is what caught Bath's two-route offer in Batch 4.
     */
    const quoted = [...course.rawRequirementText.matchAll(/\b(?:A\*|[A-E]){3,4}\b/g)].map((m) => m[0]);
    if (quoted.length) {
      // A stored profile may itself be a published RANGE ("A*AA-AAA"), which
      // the page then quotes by its endpoints. Expanding the range means the
      // endpoints count as agreement, without weakening the check: a quoted
      // profile that matches neither the stored string nor either of its
      // endpoints still fails, which is what caught Bath in Batch 4.
      const profiles = course.offers.flatMap((o) => {
        const stored = o.gradeProfile.replace(/\s/g, '');
        return [stored, ...stored.split(/[-\u2013\u2014]/).filter(Boolean)];
      });
      // The wording agrees as long as SOME quoted profile is one the record
      // stores — a page may quote several routes and store each of them.
      if (!quoted.some((q) => profiles.includes(q))) {
        out.push(
          issue(
            'raw-text-grade-mismatch',
            'error',
            `The university's own wording quotes "${quoted.join('", "')}" but the structured offer${profiles.length === 1 ? ' is' : 's are'} ${profiles.join(', ')}. One of them is wrong — check the source before relying on this record.`,
            course.id,
            'rawRequirementText',
          ),
        );
      }
    }
  }

  /* ---- a constraint must be satisfiable within its own offer profile ---- */
  for (const pathway of course.offers) {
    for (const c of pathway.constraints) {
      if (c.kind !== 'min-count-at-grade' || !pathway.gradeProfileGrades) continue;
      // Count grades at or above the constraint grade, matching how the
      // eligibility engine evaluates it. Counting only exact matches produced a
      // false warning for e.g. "two subjects at A" inside an A*A*A profile.
      const available = pathway.gradeProfileGrades.filter((g) => meetsGrade(g, c.grade)).length;
      if (available < c.count) {
        out.push(
          issue(
            'constraint-exceeds-offer-profile',
            'warning',
            `Pathway "${pathway.label}" publishes ${pathway.gradeProfile}, which contains ${available} grade${available === 1 ? '' : 's'} at ${c.grade}, but a condition requires ${c.count}. The condition raises the effective offer above the stated profile — confirm the wording.`,
            course.id,
            'offers',
          ),
        );
      }
    }
  }

  /* ---- modular tests should say which modules are sat ---- */
  // A published "choose N of these" requirement counts as recorded modules:
  // UCL Electronic and Electrical Engineering names one mandatory module and a
  // choice, and that is the complete requirement, not a half-filled record.
  const hasModuleChoice = (test.moduleChoice?.options.length ?? 0) > 0;
  if (testIsReal && MODULAR_TESTS.has(test.code) && test.modules.length === 0 && !hasModuleChoice) {
    out.push(
      issue(
        'test-without-modules',
        'warning',
        `${test.code.toUpperCase()} is recorded with no modules. Module combinations differ by course and must not be assumed.`,
        course.id,
        'admissionsTest.modules',
      ),
    );
  }

  /* ---- a module choice must be internally coherent ---- */
  if (test.moduleChoice) {
    const { chooseCount, options } = test.moduleChoice;
    if (chooseCount < 1 || options.length === 0 || chooseCount > options.length) {
      out.push(
        issue(
          'invalid-module-choice',
          'error',
          `Module choice asks for ${chooseCount} of ${options.length} option(s), which cannot be satisfied.`,
          course.id,
          'admissionsTest.moduleChoice',
        ),
      );
    }
    const overlap = options.filter((o) =>
      test.modules.some((m) => m.trim().toLowerCase() === o.trim().toLowerCase()),
    );
    if (overlap.length) {
      out.push(
        issue(
          'module-choice-overlaps-mandatory',
          'warning',
          `${overlap.join(', ')} appears both as a mandatory module and inside the choice set.`,
          course.id,
          'admissionsTest.moduleChoice',
        ),
      );
    }
  }

  if (hasOffers && !course.rawRequirementText) {
    out.push(
      issue('missing-raw-text', 'info', 'No verbatim requirement text stored alongside the structured version.', course.id, 'rawRequirementText'),
    );
  }

  if (course.requirementsPublicationStatus === 'not-yet-published' && !course.latestPublishedYear) {
    out.push(
      issue(
        'unpublished-without-fallback',
        'info',
        'Marked not yet published with no earlier cycle recorded to point at.',
        course.id,
        'latestPublishedYear',
      ),
    );
  }

  if (hasOffers && course.furtherMathematics === 'unknown') {
    out.push(
      issue('fm-unknown', 'warning', 'Further Mathematics status not recorded.', course.id, 'furtherMathematics'),
    );
  }

  if (hasOffers && course.durationYears === null) {
    out.push(issue('missing-duration', 'info', 'Course duration not recorded.', course.id, 'durationYears'));
  }

  if (status === 'unknown') {
    out.push(issue('unknown-verification', 'warning', 'Verification status not set.', course.id, 'provenance.verificationStatus'));
  }

  return out;
}

export function validateUniversity(university: University): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  const p = university.admissionsOverview.provenance;
  if (p.verificationStatus === 'verified' && !p.lastVerified) {
    out.push(
      issue('verified-without-date', 'error', 'Admissions overview marked verified with no check date.', university.id, 'provenance.lastVerified', 'university'),
    );
  }

  /* ---- rankings ---- */
  const rankingKeys = new Set<string>();
  for (const r of university.rankings) {
    const label = `${r.providerShort} ${r.edition} ${r.categoryLabel}`;

    // A ranking may only claim to be verified with full provenance behind it.
    if (r.verificationStatus === 'verified') {
      const missing = [
        !r.sourceUrl ? 'source URL' : null,
        !r.sourceTitle ? 'source title' : null,
        !r.lastVerified ? 'last-verified date' : null,
      ].filter(Boolean);
      if (missing.length) {
        out.push(
          issue(
            'ranking-verified-without-provenance',
            'error',
            `${label} is marked verified but has no ${missing.join(', ')}.`,
            university.id,
            'rankings',
            'university',
          ),
        );
      }
    } else if (r.sourceUrl && r.verificationStatus === 'demo') {
      out.push(
        issue(
          'demo-ranking-with-source',
          'warning',
          `${label} is a placeholder but carries a source URL — set its status once it has been checked.`,
          university.id,
          'rankings',
          'university',
        ),
      );
    }

    const key = `${r.provider}|${r.edition}|${r.category}`;
    if (rankingKeys.has(key)) {
      out.push(
        issue(
          'duplicate-ranking',
          'error',
          `Two positions recorded for ${label}. Providers, editions and categories must each appear once.`,
          university.id,
          'rankings',
          'university',
        ),
      );
    }
    rankingKeys.add(key);

    if (r.lastVerified && !ISO_DATE.test(r.lastVerified)) {
      out.push(
        issue('ranking-bad-date', 'error', `${label} has a last-verified date that is not YYYY-MM-DD.`, university.id, 'rankings', 'university'),
      );
    }
  }

  /* ---- deadlines ---- */
  for (const d of university.applicationDeadlines) {
    const label = `${d.label} (${d.applicationYear} entry)`;
    if (d.verificationStatus === 'verified') {
      const missing = [
        !d.date ? 'date' : null,
        !d.sourceUrl ? 'source URL' : null,
        !d.lastVerified ? 'last-verified date' : null,
      ].filter(Boolean);
      if (missing.length) {
        out.push(
          issue(
            'deadline-verified-without-provenance',
            'error',
            `${label} is marked verified but has no ${missing.join(', ')}.`,
            university.id,
            'applicationDeadlines',
            'university',
          ),
        );
      }
    }
    if (!d.date) {
      out.push(
        issue('deadline-without-date', 'info', `${label} has no exact date recorded.`, university.id, 'applicationDeadlines', 'university'),
      );
    }
    if (d.date && !ISO_DATE.test(d.date)) {
      out.push(
        issue('deadline-bad-date', 'error', `${label} has a date that is not YYYY-MM-DD.`, university.id, 'applicationDeadlines', 'university'),
      );
    }
  }

  return out;
}

/** Deadlines pointing at course slugs that are not in the catalogue. */
function validateDeadlineTargets(universities: University[], courses: Course[]): ValidationIssue[] {
  const slugs = new Set(courses.map((c) => c.slug));
  const out: ValidationIssue[] = [];
  for (const u of universities) {
    for (const d of u.applicationDeadlines) {
      if (d.appliesTo.kind !== 'course-slugs') continue;
      const missing = d.appliesTo.slugs.filter((s) => !slugs.has(s));
      if (missing.length) {
        out.push(
          issue(
            'deadline-unknown-course',
            'warning',
            `"${d.label}" (${d.applicationYear} entry) targets course slugs not in the catalogue: ${missing.join(', ')}.`,
            u.id,
            'applicationDeadlines',
            'university',
          ),
        );
      }
    }
  }
  return out;
}

export interface ValidationReport {
  issues: ValidationIssue[];
  byCourse: Record<string, ValidationIssue[]>;
  counts: Record<ValidationSeverity, number>;
  duplicates: DuplicateFinding[];
}

export function validateCatalogue(
  courses: Course[],
  universities: University[],
  /** v1.1: tuition fee rows, validated against these same course records. */
  fees: TuitionFee[] = [],
): ValidationReport {
  const duplicates = findDuplicates(courses);

  const duplicateIssues: ValidationIssue[] = duplicates.map((d) =>
    issue(
      d.kind === 'conflict' ? 'record-conflict' : d.kind === 'exact-duplicate' ? 'exact-duplicate' : 'likely-duplicate',
      d.kind === 'likely-duplicate' ? 'warning' : 'error',
      `${d.reason} (${d.aId} ↔ ${d.bId})`,
      d.aId,
      'identity',
    ),
  );

  /*
   * APPLICATION-IDENTITY RULES (Batch 7). Three high-confidence checks, kept
   * deliberately narrow rather than heuristic — a validator that produces a
   * large noisy warning count teaches people to ignore it.
   */
  const identityIssues: ValidationIssue[] = [
    // Two different live courses holding one code at one university in one
    // cycle. Either a cross-listing that should be stored once, or an error.
    // A human decides, so this reports rather than merges.
    ...codeCollisions(courses).map((c) =>
      issue(
        'same-code-multiple-live-identities',
        'error',
        `UCAS code ${c.code} at ${c.universityId} for ${c.applicationYear} is held by ${c.courseIds.length} live records with different identities (${c.canonicalNames.join(' / ')}). Either they are one cross-listed application and should be stored once, or one of them is wrong.`,
        c.courseIds[0],
        'courseCode',
      ),
    ),
    // A record whose own stored text tells applicants to apply somewhere else,
    // or that describes itself as a route chosen after admission.
    ...identityRisks(courses).map((r) =>
      issue(
        'pathway-as-course-risk',
        'warning',
        r.kind === 'parent-application-instruction'
          ? `This record's own text points applicants at another code — it may be a study option stored as a course: "${r.evidence}"`
          : `This record describes itself as a route chosen after admission and carries no UCAS code of its own: "${r.evidence}"`,
        r.courseId,
        'identity',
      ),
    ),
    // A code that appears in its own source URL and nowhere else. Batch 5
    // proved Leeds' page-path identifiers sit exactly where a code looks
    // natural, and three were wrong.
    ...unsupportedCodeProvenance(courses).map((id) =>
      issue(
        'unsupported-ucas-code',
        'warning',
        'The stored UCAS code appears as a segment of this record’s own source URL and nothing in its notes says where the code was actually read. A URL path segment is not code provenance — reverify or clear the code.',
        id,
        'courseCode',
      ),
    ),
    // An awaiting-data row whose identity cites no official source at all. The
    // requirements being unread is expected; the IDENTITY being unevidenced is
    // not, and the two were previously indistinguishable in the backlog.
    ...unevidencedIdentities(courses).map((id) =>
      issue(
        'unevidenced-identity',
        'warning',
        'This record is awaiting data AND its identity rests on no official source — no official URL, no source and no check date. Awaiting-data means the requirements are unread, not that the course is unverified as existing. Verify the identity against the university’s own course listing or drop the row.',
        id,
        'identity',
      ),
    ),
  ];

  const issues = [
    ...courses.flatMap(validateCourse),
    ...universities.flatMap(validateUniversity),
    ...validateDeadlineTargets(universities, courses),
    ...duplicateIssues,
    ...identityIssues,
    ...validateTuitionFees(fees, courses, universities),
  ];

  const byCourse: Record<string, ValidationIssue[]> = {};
  for (const i of issues) {
    if (i.entity !== 'course') continue;
    (byCourse[i.entityId] ??= []).push(i);
  }
  const counts: Record<ValidationSeverity, number> = { error: 0, warning: 0, info: 0 };
  for (const i of issues) counts[i.severity] += 1;
  return { issues, byCourse, counts, duplicates };
}
