/**
 * Rule-based A-Level matching.
 *
 * The engine answers one question: do the entered grades appear to satisfy the
 * *published academic requirements* of this course, for this application cycle?
 * It never estimates the chance of an offer, and there is deliberately no
 * "likely" verdict.
 *
 * Two properties matter most:
 *
 *  1. Overall grades and subject grades are independent checks. A profile of
 *     Maths A*, Physics A, Further Maths A*, Economics A satisfies "AAA" on the
 *     overall check and still fails an offer that asks for A* in Physics.
 *
 *  2. The overall check is required-subject aware. For "AAA including
 *     Mathematics and Physics", the three counted grades must be the required
 *     subjects plus the best of what is left — not simply the student's best
 *     three, which would let a B in a required subject hide behind an A
 *     elsewhere.
 */

import type {
  ALevelGrade,
  AdmissionsTestOutcome,
  Course,
  EligibilityPart,
  EligibilityReport,
  EligibilityVerdict,
  OfferConstraint,
  OfferPathway,
  PartOutcome,
  PathwayReport,
  StudentProfile,
} from '@/types';
import { ADVISORY_FURTHER_MATHS } from '@/types';
import { TEST_REQUIREMENT_LABEL } from '@/data/taxonomy';
import {
  filledGrades,
  findProfileGrade,
  meetsGrade,
  profileIsEmpty,
  sortGradesDesc,
  subjectsMatch,
  type ProfileGrade,
} from './grades';

/* ------------------------------------------------------------------ */
/* Labels                                                              */
/* ------------------------------------------------------------------ */

export const VERDICT_LABEL: Record<EligibilityVerdict, string> = {
  meets: 'Meets published academic requirements',
  'does-not-meet': 'Does not currently meet requirements',
  'review-required': 'Review required',
  'insufficient-information': 'Insufficient information',
};

export const VERDICT_SHORT: Record<EligibilityVerdict, string> = {
  meets: 'Meets requirements',
  'does-not-meet': 'Not met',
  'review-required': 'Review required',
  'insufficient-information': 'Insufficient info',
};

export const OUTCOME_LABEL: Record<PartOutcome, string> = {
  pass: 'Pass',
  fail: 'Fail',
  advisory: 'Advisory',
  'not-required': 'Not required',
  review: 'Review',
  unknown: 'Unknown',
};

const VERDICT_RANK: Record<EligibilityVerdict, number> = {
  meets: 4,
  'review-required': 3,
  'insufficient-information': 2,
  'does-not-meet': 1,
};

const NAMED_SUBJECTS = ['Mathematics', 'Further Mathematics', 'Physics', 'Chemistry'];

const part = (id: string, label: string, outcome: PartOutcome, detail: string): EligibilityPart => ({
  id,
  label,
  outcome,
  detail,
});

/* ------------------------------------------------------------------ */
/* Overall grade profile — required-subject aware                      */
/* ------------------------------------------------------------------ */

/**
 * Choose which of the student's A-Levels count toward the overall profile.
 * Required subjects always occupy a slot; a `one-of` constraint occupies one
 * slot too, filled by the best qualifying subject the student actually takes.
 * The remaining slots take the best of what is left.
 */
export function selectCountedGrades(
  entries: ProfileGrade[],
  pathway: OfferPathway,
  slots: number,
): { counted: ProfileGrade[]; forced: string[] } {
  const used = new Set<string>();
  const counted: ProfileGrade[] = [];
  const forced: string[] = [];

  const take = (hit: ProfileGrade | null) => {
    if (!hit || used.has(hit.subject)) return;
    used.add(hit.subject);
    counted.push(hit);
    forced.push(hit.subject);
  };

  for (const req of pathway.subjectRequirements.filter((r) => r.required)) {
    take(findProfileGrade(entries, req.subject, req.acceptedAlternatives));
  }
  for (const c of pathway.constraints) {
    if (c.kind !== 'one-of') continue;
    const candidates = c.subjects
      .map((s) => findProfileGrade(entries, s))
      .filter((x): x is ProfileGrade => Boolean(x) && !used.has(x!.subject));
    const best = sortByGradeDesc(candidates)[0] ?? null;
    take(best);
  }

  const rest = sortByGradeDesc(entries.filter((e) => !used.has(e.subject)));
  for (const e of rest) {
    if (counted.length >= slots) break;
    counted.push(e);
  }

  return { counted: counted.slice(0, Math.max(slots, counted.length)), forced };
}

function sortByGradeDesc(list: ProfileGrade[]): ProfileGrade[] {
  return [...list].sort((a, b) => (meetsGrade(a.grade, b.grade) ? -1 : 1));
}

function checkOverallGrades(pathway: OfferPathway, entries: ProfileGrade[]): EligibilityPart {
  const needed = pathway.gradeProfileGrades;
  if (!needed) {
    return part(
      'overall-grades',
      'Overall grade requirement',
      'review',
      `Published as “${pathway.gradeProfile}”, which is not a plain A-Level grade profile — check the wording yourself.`,
    );
  }
  if (entries.length < needed.length) {
    return part(
      'overall-grades',
      'Overall grade requirement',
      'unknown',
      `This offer is based on ${needed.length} A-Levels; you have entered ${entries.length}.`,
    );
  }

  const { counted, forced } = selectCountedGrades(entries, pathway, needed.length);
  const countedTop = counted.slice(0, needed.length);
  const mine = sortGradesDesc(countedTop.map((e) => e.grade));
  const target = sortGradesDesc(needed);

  const shortfalls: string[] = [];
  target.forEach((required, i) => {
    if (!meetsGrade(mine[i], required)) {
      shortfalls.push(`position ${i + 1} needs ${required}, best available is ${mine[i]}`);
    }
  });

  const basis = forced.length
    ? ` Counted subjects: ${countedTop.map((e) => `${e.subject} ${e.grade}`).join(', ')}.`
    : '';

  if (shortfalls.length > 0) {
    return part(
      'overall-grades',
      'Overall grade requirement',
      'fail',
      `${pathway.gradeProfile} required; your counted grades are ${mine.join('')} (${shortfalls.join('; ')}).${basis}`,
    );
  }
  return part(
    'overall-grades',
    'Overall grade requirement',
    'pass',
    `${pathway.gradeProfile} required; your counted grades are ${mine.join('')}.${basis}`,
  );
}

/* ------------------------------------------------------------------ */
/* Subject checks                                                      */
/* ------------------------------------------------------------------ */

function requirementFor(pathway: OfferPathway, subject: string) {
  return pathway.subjectRequirements.find((r) => subjectsMatch(r.subject, subject)) ?? null;
}

function checkSubject(
  id: string,
  label: string,
  subject: string,
  pathway: OfferPathway,
  entries: ProfileGrade[],
  courseStatus: 'required' | 'recommended' | 'not-required' | 'unknown',
): EligibilityPart {
  const req = requirementFor(pathway, subject);
  const hit = req
    ? findProfileGrade(entries, subject, req.acceptedAlternatives)
    : findProfileGrade(entries, subject);

  if (req?.required) {
    if (!hit) {
      const alt = req.acceptedAlternatives.length
        ? ` (or ${req.acceptedAlternatives.join(', ')})`
        : '';
      return part(id, label, 'fail', `Required${alt}, and not in your entered subjects.`);
    }
    if (req.minimumGrade && !meetsGrade(hit.grade, req.minimumGrade)) {
      return part(
        id,
        label,
        'fail',
        `Required at ${req.minimumGrade}; you entered ${hit.grade}.`,
      );
    }
    return part(
      id,
      label,
      'pass',
      req.minimumGrade
        ? `Required at ${req.minimumGrade}; you entered ${hit.grade}.`
        : `Required, and present in your subjects (${hit.grade}).`,
    );
  }

  if (req?.recommended || courseStatus === 'recommended') {
    return hit
      ? part(id, label, 'pass', `Recommended, and present in your subjects (${hit.grade}).`)
      : part(
          id,
          label,
          'advisory',
          'Recommended by this university but not required. Not having it does not rule you out.',
        );
  }

  if (courseStatus === 'not-required') {
    return part(id, label, 'not-required', 'Not required for this course.');
  }
  if (courseStatus === 'required') {
    // Course-level says required but this pathway does not name it.
    return hit
      ? part(id, label, 'pass', `Required by this course; present in your subjects (${hit.grade}).`)
      : part(id, label, 'fail', 'Required by this course, and not in your entered subjects.');
  }
  return part(id, label, 'unknown', 'Not recorded in this catalogue yet — check the course page.');
}

function checkFurtherMaths(
  course: Course,
  pathway: OfferPathway,
  entries: ProfileGrade[],
): EligibilityPart {
  const id = 'further-mathematics';
  const label = 'Further Mathematics';
  const req = requirementFor(pathway, 'Further Mathematics');
  const hit = findProfileGrade(entries, 'Further Mathematics');
  const status = course.furtherMathematics;

  if (req?.required || status === 'required') {
    if (!hit) return part(id, label, 'fail', 'Required for this offer, and not in your entered subjects.');
    if (req?.minimumGrade && !meetsGrade(hit.grade, req.minimumGrade)) {
      return part(id, label, 'fail', `Required at ${req.minimumGrade}; you entered ${hit.grade}.`);
    }
    return part(id, label, 'pass', `Required, and present in your subjects (${hit.grade}).`);
  }

  if ((ADVISORY_FURTHER_MATHS as readonly string[]).includes(status)) {
    const wording =
      status === 'strongly-recommended'
        ? 'strongly recommended'
        : status === 'useful'
          ? 'described as useful'
          : 'recommended';
    return hit
      ? part(id, label, 'pass', `Further Mathematics is ${wording} by this university, and you are taking it (${hit.grade}).`)
      : part(
          id,
          label,
          'advisory',
          `Further Mathematics is ${wording} by this university. It is not required, and not taking it does not rule you out.`,
        );
  }

  if (status === 'conditional') {
    // The binding rule lives in a pathway constraint, which reports the actual
    // pass / fail / review. This row only says the requirement is conditional.
    return hit
      ? part(id, label, 'pass', `Required in some circumstances, and present in your subjects (${hit.grade}).`)
      : part(
          id,
          label,
          'advisory',
          'Required only in certain circumstances — see the additional condition below for whether it applies to you.',
        );
  }

  if (status === 'not-required') {
    return part(id, label, 'not-required', 'Not required for this course.');
  }
  if (status === 'no-stated-preference') {
    return part(id, label, 'not-required', 'The university publishes no stated preference either way.');
  }
  return part(id, label, 'unknown', 'Not recorded in this catalogue yet — check the course page.');
}

function checkOtherSubjects(pathway: OfferPathway, entries: ProfileGrade[]): EligibilityPart {
  const id = 'other-subjects';
  const label = 'Other required subjects';
  const others = pathway.subjectRequirements.filter(
    (r) => r.required && !NAMED_SUBJECTS.some((n) => subjectsMatch(n, r.subject)),
  );
  if (others.length === 0) {
    return part(id, label, 'not-required', 'No other subjects are required for this offer.');
  }
  const problems: string[] = [];
  for (const r of others) {
    const hit = findProfileGrade(entries, r.subject, r.acceptedAlternatives);
    if (!hit) problems.push(`${r.subject} not in your entered subjects`);
    else if (r.minimumGrade && !meetsGrade(hit.grade, r.minimumGrade)) {
      problems.push(`${r.subject} needs ${r.minimumGrade}, you entered ${hit.grade}`);
    }
  }
  return problems.length
    ? part(id, label, 'fail', problems.join('; ') + '.')
    : part(id, label, 'pass', `${others.map((r) => r.subject).join(', ')} — met.`);
}

/* ------------------------------------------------------------------ */
/* Constraints                                                         */
/* ------------------------------------------------------------------ */

function checkConstraint(
  constraint: OfferConstraint,
  entries: ProfileGrade[],
  index: number,
  profile: StudentProfile,
): EligibilityPart {
  const id = `constraint-${index + 1}`;
  const label = 'Additional condition';

  if (constraint.kind === 'manual-review') {
    return part(id, label, 'review', constraint.description);
  }

  if (constraint.kind === 'conditional-subject') {
    const answer =
      constraint.condition === 'school-offers-further-mathematics'
        ? profile.schoolOffersFurtherMathematics
        : null;

    if (answer === null) {
      return part(
        id,
        label,
        'review',
        `${constraint.description} Whether this applies to you has not been answered, so it cannot be checked.`,
      );
    }
    if (answer === false) {
      return part(id, label, 'not-required', `${constraint.description} It does not apply in your case.`);
    }

    const hit = findProfileGrade(entries, constraint.subject);
    if (!hit) {
      const asNote = constraint.acceptsAsLevel
        ? ' An AS-level qualification is accepted, which this tool does not record — check it yourself.'
        : '';
      return part(
        id,
        label,
        constraint.acceptsAsLevel ? 'review' : 'fail',
        `${constraint.description} ${constraint.subject} is not in your entered A-Levels.${asNote}`,
      );
    }
    if (constraint.minimumGrade && !meetsGrade(hit.grade, constraint.minimumGrade)) {
      return part(
        id,
        label,
        'fail',
        `${constraint.description} ${constraint.subject} needs ${constraint.minimumGrade}; you entered ${hit.grade}.`,
      );
    }
    return part(id, label, 'pass', `${constraint.description} Satisfied by ${hit.subject} (${hit.grade}).`);
  }

  if (constraint.kind === 'one-of') {
    const matches = constraint.subjects
      .map((s) => findProfileGrade(entries, s))
      .filter((x): x is ProfileGrade => Boolean(x))
      .filter((x) => !constraint.minimumGrade || meetsGrade(x.grade, constraint.minimumGrade));
    return matches.length > 0
      ? part(id, label, 'pass', `${constraint.description} Satisfied by ${matches[0].subject} (${matches[0].grade}).`)
      : part(id, label, 'fail', `${constraint.description} None of these subjects is in your entered grades at the required level.`);
  }

  const qualifying = constraint.subjects
    .map((s) => findProfileGrade(entries, s))
    .filter((x): x is ProfileGrade => Boolean(x))
    .filter((x) => meetsGrade(x.grade, constraint.grade as ALevelGrade));

  return qualifying.length >= constraint.count
    ? part(
        id,
        label,
        'pass',
        `${constraint.description} Satisfied by ${qualifying
          .slice(0, constraint.count)
          .map((q) => `${q.subject} ${q.grade}`)
          .join(', ')}.`,
      )
    : part(
        id,
        label,
        'fail',
        `${constraint.description} You have ${qualifying.length} of the required ${constraint.count} at ${constraint.grade}.`,
      );
}

/* ------------------------------------------------------------------ */
/* Pathway evaluation                                                  */
/* ------------------------------------------------------------------ */

function rollUp(parts: EligibilityPart[]): EligibilityVerdict {
  if (parts.some((p) => p.outcome === 'fail')) return 'does-not-meet';
  if (parts.some((p) => p.outcome === 'review')) return 'review-required';
  if (parts.some((p) => p.outcome === 'unknown')) return 'insufficient-information';
  return 'meets';
}

export function evaluatePathway(
  course: Course,
  pathway: OfferPathway,
  entries: ProfileGrade[],
  profile: StudentProfile,
): PathwayReport {
  const missingSubjectGate = pathway.appliesOnlyIfTaking.find(
    (subject) => !findProfileGrade(entries, subject),
  );
  const belowCountGate =
    pathway.appliesOnlyIfTakingAtLeast !== null && entries.length < pathway.appliesOnlyIfTakingAtLeast;

  const applicabilityNote = missingSubjectGate
    ? `This offer applies only to applicants taking ${pathway.appliesOnlyIfTaking.join(' and ')}.`
    : belowCountGate
      ? `This offer applies only to applicants taking at least ${pathway.appliesOnlyIfTakingAtLeast} A-Levels; you have entered ${entries.length}.`
      : null;

  const overallGrades = checkOverallGrades(pathway, entries);
  const subjectParts: EligibilityPart[] = [
    checkSubject('mathematics', 'Mathematics', 'Mathematics', pathway, entries, course.mathematics),
    checkSubject('physics', 'Physics', 'Physics', pathway, entries, course.physics),
    checkFurtherMaths(course, pathway, entries),
    checkSubject('chemistry', 'Chemistry', 'Chemistry', pathway, entries, course.chemistry),
    checkOtherSubjects(pathway, entries),
  ];
  const constraintParts = pathway.constraints.map((c, i) => checkConstraint(c, entries, i, profile));

  return {
    pathwayId: pathway.id,
    label: pathway.label,
    gradeProfile: pathway.gradeProfile,
    applicable: !applicabilityNote,
    applicabilityNote,
    verdict: applicabilityNote
      ? 'does-not-meet'
      : rollUp([overallGrades, ...subjectParts, ...constraintParts]),
    overallGrades,
    subjectParts,
    constraintParts,
  };
}

/* ------------------------------------------------------------------ */
/* Admissions test (informational — never changes the verdict)         */
/* ------------------------------------------------------------------ */

function testOutcome(course: Course): { outcome: AdmissionsTestOutcome; detail: string } {
  const t = course.admissionsTest;

  if (t.applicationYear && t.applicationYear !== course.applicationYear) {
    return {
      outcome: 'unknown',
      detail: `The recorded test arrangement is for ${t.applicationYear} entry, not ${course.applicationYear}. It is not carried across cycles — check the official page.`,
    };
  }
  if (t.code === 'unknown' || t.requirement === 'unknown') {
    // Two different situations share the "unknown" code, and a student needs to
    // be able to tell them apart: nobody has researched this course yet, versus
    // the university's own page says nothing about a test. Where a record
    // explains which it is, show that explanation instead of the generic line.
    return {
      outcome: 'unknown',
      detail: t.notes ?? 'Test arrangements have not been recorded for this course yet.',
    };
  }
  if (t.code === 'not-announced' || t.requirement === 'not-announced') {
    return {
      outcome: 'not-announced',
      detail: `Not yet announced for ${course.applicationYear} entry.`,
    };
  }
  if (t.code === 'none' || t.requirement === 'not-required') {
    const base = `No admissions test for ${course.applicationYear} entry.`;
    // Where the university states this outright, quote it — a published "we do
    // not test" is stronger information than our own summary of it.
    return { outcome: 'none', detail: t.notes ? `${base} ${t.notes}` : base };
  }
  if (t.requirement === 'optional') {
    return {
      outcome: 'optional',
      detail: `${t.name ?? t.code.toUpperCase()} is optional for ${course.applicationYear} entry.`,
    };
  }
  /*
   * A conditional test binds only some applicants, on a condition the
   * university publishes. Telling an A-Level applicant that a test aimed at
   * people WITHOUT A-level Mathematics is "required" would be wrong, so the
   * condition is quoted and the outcome never blocks.
   */
  if (t.requirement === 'conditional') {
    const base = `${t.name ?? t.code.toUpperCase()} is required only in some cases for ${course.applicationYear} entry.`;
    return { outcome: 'optional', detail: t.notes ? `${base} ${t.notes}` : base };
  }
  return {
    outcome: 'required',
    detail: `${t.name ?? t.code.toUpperCase()} is ${TEST_REQUIREMENT_LABEL[t.requirement].toLowerCase()} for ${course.applicationYear} entry.`,
  };
}

/* ------------------------------------------------------------------ */
/* Course evaluation                                                   */
/* ------------------------------------------------------------------ */

function unknownPart(label: string, detail: string): EligibilityPart {
  return part(label.toLowerCase().replace(/\s+/g, '-'), label, 'unknown', detail);
}

function insufficientReport(course: Course, detail: string, summary: string): EligibilityReport {
  return {
    courseId: course.id,
    verdict: 'insufficient-information',
    summary,
    overallGrades: unknownPart('Overall grade requirement', detail),
    mathematics: unknownPart('Mathematics', detail),
    physics: unknownPart('Physics', detail),
    furtherMathematics: unknownPart('Further Mathematics', detail),
    chemistry: unknownPart('Chemistry', detail),
    otherSubjects: unknownPart('Other required subjects', detail),
    constraints: [],
    admissionsTest: testOutcome(course),
    bestPathwayId: null,
    pathways: [],
  };
}

function summarise(verdict: EligibilityVerdict, report: PathwayReport | null): string {
  switch (verdict) {
    case 'meets':
      return 'Your entered grades appear to satisfy the published academic requirements for this cycle.';
    case 'does-not-meet': {
      const failing = report
        ? [report.overallGrades, ...report.subjectParts, ...report.constraintParts].find(
            (p) => p.outcome === 'fail',
          )
        : null;
      return failing ? failing.detail : 'One or more published requirements do not appear to be met.';
    }
    case 'review-required':
      return 'Part of the published wording cannot be checked automatically — read the university’s own wording below.';
    default:
      return 'Not enough information to check this course.';
  }
}

export function evaluateCourse(course: Course, profile: StudentProfile): EligibilityReport {
  if (course.requirementsPublicationStatus === 'not-yet-published') {
    return insufficientReport(
      course,
      `${course.applicationYear} entry requirements have not been published yet.`,
      `${course.applicationYear} entry requirements not yet published.`,
    );
  }
  if (course.offers.length === 0) {
    return insufficientReport(
      course,
      'No entry requirements have been recorded for this course yet.',
      'Awaiting verified entry requirements.',
    );
  }
  if (profileIsEmpty(profile)) {
    return insufficientReport(
      course,
      'Add your A-Level subjects and predicted grades to check this course.',
      'Add your subjects and predicted grades to check this course.',
    );
  }

  const entries = filledGrades(profile);
  const pathways = course.offers.map((p) => evaluatePathway(course, p, entries, profile));

  /*
   * Contextual offers are published information, not a route this tool can
   * award. Eligibility for one is decided by the university against criteria
   * we do not hold — school performance, care experience, participation data —
   * so a student must never be told they "meet" a course because their grades
   * clear its contextual offer. Contextual pathways are still evaluated and
   * shown, but the headline verdict is taken from the standard pathways
   * whenever the course publishes any.
   */
  const standard = course.offers
    .map((p, i) => ({ offer: p, report: pathways[i] }))
    .filter((x) => !x.offer.isContextual)
    .map((x) => x.report);
  const considered = standard.length > 0 ? standard : pathways;

  const best = considered.reduce((acc, cur) =>
    VERDICT_RANK[cur.verdict] > VERDICT_RANK[acc.verdict] ? cur : acc,
  );

  const byId = (id: string) => best.subjectParts.find((p) => p.id === id)!;

  return {
    courseId: course.id,
    verdict: best.verdict,
    summary: summarise(best.verdict, best),
    overallGrades: best.overallGrades,
    mathematics: byId('mathematics'),
    physics: byId('physics'),
    furtherMathematics: byId('further-mathematics'),
    chemistry: byId('chemistry'),
    otherSubjects: byId('other-subjects'),
    constraints: best.constraintParts,
    admissionsTest: testOutcome(course),
    bestPathwayId: best.pathwayId,
    pathways,
  };
}

export function evaluateCatalogue(
  courses: Course[],
  profile: StudentProfile,
): Record<string, EligibilityReport> {
  const out: Record<string, EligibilityReport> = {};
  for (const c of courses) out[c.id] = evaluateCourse(c, profile);
  return out;
}
