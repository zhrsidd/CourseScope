/**
 * Builders that keep the seed files readable and the records consistent.
 *
 * They fill defaults and generate ids. They never invent admissions data:
 * anything a seed does not supply becomes an explicit "we don't know" value
 * (`null`, `'unknown'`, `'not-stated'`, `'not-announced'`).
 *
 * The same normalisation runs for JSON and CSV imports — see
 * `src/lib/importers.ts` — so hand-written seeds and bulk-imported rows end up
 * structurally identical.
 */

import type {
  ALevelGrade,
  AdmissionsTestCode,
  AdmissionsTestModuleChoice,
  AdmissionsTestRecord,
  AdmissionsTestRequirementLevel,
  ApplicationYear,
  ContextualOfferInfo,
  Course,
  DegreeType,
  FurtherMathsStatus,
  IdentityVerification,
  InterviewPolicy,
  OfferConstraint,
  OfferPathway,
  ProfileCondition,
  PublicationStatus,
  SourceRecord,
  StudyOption,
  SubjectCategory,
  SubjectRequirement,
  SubjectStatus,
  SubjectSubcategory,
  VerificationStatus,
} from '@/types';

/** "A*AA" -> ['A*','A','A']. Null when the string is not a plain profile. */
export function parseGradeProfile(profile: string): ALevelGrade[] | null {
  const cleaned = profile.replace(/\s|\(demo\)/gi, '');
  if (!cleaned) return null;
  const grades: ALevelGrade[] = [];
  for (let i = 0; i < cleaned.length; i += 1) {
    const ch = cleaned[i];
    if (!'ABCDE'.includes(ch)) return null;
    if (cleaned[i + 1] === '*') {
      if (ch !== 'A') return null;
      grades.push('A*');
      i += 1;
    } else {
      grades.push(ch as ALevelGrade);
    }
  }
  return grades.length ? grades : null;
}

export type SubjectSpec = string | [string, ALevelGrade];

function toRequirement(spec: SubjectSpec, required: boolean, recommended: boolean): SubjectRequirement {
  const [subject, minimumGrade] = Array.isArray(spec) ? spec : [spec, null];
  return {
    subject,
    required,
    recommended,
    minimumGrade: (minimumGrade as ALevelGrade | null) ?? null,
    acceptedAlternatives: [],
    notes: null,
  };
}

/* ------------------------------------------------------------------ */
/* Offer pathways                                                      */
/* ------------------------------------------------------------------ */

export interface OfferSeed {
  label?: string;
  gradeProfile: string;
  required?: SubjectSpec[];
  recommended?: SubjectSpec[];
  /** Map of subject -> subjects accepted instead. */
  alternatives?: Record<string, string[]>;
  /** Cross-subject rules such as "one A* in either Mathematics or Physics". */
  constraints?: OfferConstraint[];
  /** Subjects the applicant must be taking for this pathway to apply at all. */
  appliesOnlyIfTaking?: string[];
  /** Minimum number of A-Levels for this pathway to apply. */
  appliesOnlyIfTakingAtLeast?: number;
  isContextual?: boolean;
  /** The university's own wording for this pathway. */
  rawText?: string;
  notes?: string;
}

export function offer(seed: OfferSeed): OfferSeed {
  return seed;
}

/** Shorthand for "at least `count` of these subjects at `grade` or better". */
export function atLeastAt(
  subjects: string[],
  grade: ALevelGrade,
  count = 1,
  description?: string,
): OfferConstraint {
  return {
    kind: 'min-count-at-grade',
    subjects,
    grade,
    count,
    description:
      description ??
      `At least ${count} of ${subjects.join(' or ')} at grade ${grade}.`,
  };
}

/** Shorthand for "one of these subjects must be taken". */
export function oneOf(
  subjects: string[],
  minimumGrade: ALevelGrade | null = null,
  description?: string,
): OfferConstraint {
  return {
    kind: 'one-of',
    subjects,
    minimumGrade,
    description:
      description ??
      `One of ${subjects.join(', ')}${minimumGrade ? ` at grade ${minimumGrade}` : ''}.`,
  };
}

/** A published condition we can state but not evaluate mechanically. */
export function manualReview(description: string): OfferConstraint {
  return { kind: 'manual-review', description };
}

/**
 * A requirement that binds only when something about the applicant is true.
 * Unknown circumstances produce "review required", never a pass or a fail.
 */
export function conditionalSubject(
  condition: ProfileCondition,
  subject: string,
  opts: { minimumGrade?: ALevelGrade | null; acceptsAsLevel?: boolean; description: string },
): OfferConstraint {
  return {
    kind: 'conditional-subject',
    condition,
    subject,
    minimumGrade: opts.minimumGrade ?? null,
    acceptsAsLevel: opts.acceptsAsLevel ?? false,
    description: opts.description,
  };
}

function buildOffer(seed: OfferSeed, courseId: string, index: number): OfferPathway {
  const requirements = [
    ...(seed.required ?? []).map((s) => toRequirement(s, true, false)),
    ...(seed.recommended ?? []).map((s) => toRequirement(s, false, true)),
  ];
  if (seed.alternatives) {
    for (const req of requirements) {
      const alts = seed.alternatives[req.subject];
      if (alts) req.acceptedAlternatives = alts;
    }
  }
  return {
    id: `${courseId}--pathway-${index + 1}`,
    label: seed.label ?? (index === 0 ? 'Standard offer' : `Alternative offer ${index}`),
    gradeProfile: seed.gradeProfile,
    gradeProfileGrades: parseGradeProfile(seed.gradeProfile),
    subjectRequirements: requirements,
    constraints: seed.constraints ?? [],
    appliesOnlyIfTaking: seed.appliesOnlyIfTaking ?? [],
    appliesOnlyIfTakingAtLeast: seed.appliesOnlyIfTakingAtLeast ?? null,
    isContextual: seed.isContextual ?? false,
    rawText: seed.rawText ?? null,
    notes: seed.notes ?? null,
  };
}

/* ------------------------------------------------------------------ */
/* Derived subject statuses                                            */
/* ------------------------------------------------------------------ */

function norm(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * Work out a course-level stance on a subject from its pathways.
 * Required only when EVERY pathway needs it — otherwise a student could take a
 * different published route, so it is not a hard requirement for the course.
 */
export function deriveSubjectStatus(pathways: OfferPathway[], subject: string): SubjectStatus {
  if (pathways.length === 0) return 'unknown';
  let requiredIn = 0;
  let recommendedAnywhere = false;
  for (const p of pathways) {
    const direct = p.subjectRequirements.find((r) => norm(r.subject) === norm(subject));
    const viaConstraint = p.constraints.some(
      (c) => c.kind === 'one-of' && c.subjects.some((s) => norm(s) === norm(subject)),
    );
    if (direct?.required) requiredIn += 1;
    else if (direct?.recommended || viaConstraint) recommendedAnywhere = true;
  }
  if (requiredIn === pathways.length) return 'required';
  if (requiredIn > 0 || recommendedAnywhere) return 'recommended';
  return 'not-required';
}

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

export interface CourseSeed {
  /** Stable identifier for the course across application years. */
  slug: string;
  universityId: string;
  name: string;
  category: SubjectCategory;
  sub: SubjectSubcategory;
  degree: DegreeType;
  /** Display label for dual awards, e.g. "MPhys / BA". */
  awardLabel?: string | null;
  /** Null when not recorded. */
  years?: number | null;
  /** Upper bound where the course runs to either length. */
  yearsMax?: number | null;
  code?: string | null;
  /** Course-option codes sharing one admissions process. */
  altCodes?: { code: string; label: string }[];
  year?: ApplicationYear;
  publication?: PublicationStatus;
  latestPublishedYear?: ApplicationYear | null;
  /** The university's wording about which cycle these requirements cover. */
  cycleNote?: string | null;

  /** The university's own wording, kept verbatim. */
  raw?: string | null;
  /** University-wide floor published separately from the course offer. */
  minimumEntryStandard?: string | null;
  /** Separately published "typical offer" string, where the university states one. */
  typicalOffer?: string | null;
  /** Named routes within this one application. Never separate courses. */
  studyOptions?: StudyOption[];
  offers?: OfferSeed[];

  /** Explicit statuses; derived from the pathways when omitted. */
  maths?: SubjectStatus;
  physicsStatus?: SubjectStatus;
  chemistryStatus?: SubjectStatus;
  fm?: FurtherMathsStatus;
  fmNote?: string | null;

  test?: AdmissionsTestCode;
  testRequirement?: AdmissionsTestRequirementLevel;
  testName?: string | null;
  testModules?: string[];
  /** "Choose N of these" module requirements, where the university publishes one. */
  testModuleChoice?: AdmissionsTestModuleChoice | null;
  testModuleNote?: string | null;
  testDetails?: string | null;
  testUrl?: string | null;
  testNote?: string | null;

  interview?: InterviewPolicy;
  interviewNote?: string | null;
  contextual?: ContextualOfferInfo;
  gcse?: string | null;
  english?: string | null;
  international?: string | null;
  placement?: string | null;
  notes?: string | null;

  verification?: VerificationStatus;
  /** How the APPLICATION IDENTITY was established — see `IdentityVerification`. */
  identityVerification?: IdentityVerification;
  identityNote?: string | null;
  officialUrl?: string | null;
  sourceUrl?: string | null;
  sourceTitle?: string | null;
  lastVerified?: string | null;
  sources?: SourceRecord[];
}

export function course(seed: CourseSeed): Course {
  const year: ApplicationYear = seed.year ?? '2028';
  const id = `${seed.slug}--${year}`;
  const publication = seed.publication ?? 'published';
  const offerSeeds = publication === 'published' ? seed.offers ?? [] : [];
  const offers = offerSeeds.map((o, i) => buildOffer(o, id, i));

  const verification: VerificationStatus =
    seed.verification ??
    (publication === 'not-yet-published' ? 'awaiting-publication' : 'demo');

  const testCode: AdmissionsTestCode = seed.test ?? 'unknown';
  const testRequirement: AdmissionsTestRequirementLevel =
    seed.testRequirement ??
    (testCode === 'none'
      ? 'not-required'
      : testCode === 'not-announced'
        ? 'not-announced'
        : testCode === 'unknown'
          ? 'unknown'
          : 'required');

  const admissionsTest: AdmissionsTestRecord = {
    code: testCode,
    name: seed.testName ?? null,
    requirement: testRequirement,
    // A test arrangement is only ever stated for a specific cycle.
    applicationYear: testCode === 'unknown' ? null : year,
    modules: seed.testModules ?? [],
    moduleChoice: seed.testModuleChoice ?? null,
    moduleNote: seed.testModuleNote ?? null,
    details: seed.testDetails ?? null,
    officialUrl: seed.testUrl ?? null,
    notes: seed.testNote ?? null,
  };

  return {
    id,
    slug: seed.slug,
    universityId: seed.universityId,
    name: seed.name,
    subjectCategory: seed.category,
    subjectSubcategory: seed.sub,
    degreeType: seed.degree,
    awardLabel: seed.awardLabel ?? null,
    durationYears: seed.years ?? null,
    durationYearsMax: seed.yearsMax ?? null,
    courseCode: seed.code ?? null,
    alternativeCourseCodes: seed.altCodes ?? [],
    applicationYear: year,
    requirementsPublicationStatus: publication,
    latestPublishedYear: seed.latestPublishedYear ?? null,
    cycleNote: seed.cycleNote ?? null,

    rawRequirementText: seed.raw ?? null,
    minimumEntryStandard: seed.minimumEntryStandard ?? null,
    typicalOffer: seed.typicalOffer ?? null,
    studyOptions: seed.studyOptions ?? [],
    offers,

    mathematics: seed.maths ?? deriveSubjectStatus(offers, 'Mathematics'),
    physics: seed.physicsStatus ?? deriveSubjectStatus(offers, 'Physics'),
    chemistry: seed.chemistryStatus ?? deriveSubjectStatus(offers, 'Chemistry'),
    furtherMathematics: seed.fm ?? 'unknown',
    furtherMathematicsNote: seed.fmNote ?? null,

    admissionsTest,
    interview: seed.interview ?? 'not-stated',
    interviewNote: seed.interviewNote ?? null,
    contextualOffer: seed.contextual ?? { availability: 'unknown', details: null },
    gcseRequirements: seed.gcse ?? null,
    englishLanguageRequirements: seed.english ?? null,
    internationalNotes: seed.international ?? null,
    placementOrStudyAbroad: seed.placement ?? null,

    provenance: {
      verificationStatus: verification,
      /*
       * Default, not an assumption: a record whose requirements were read off a
       * course page necessarily had that page, so its identity is page-evidenced.
       * A record with no requirements has to say where its identity came from,
       * and the default there is `unevidenced` — the honest answer when nobody
       * has stated otherwise. That default is what makes the gap visible rather
       * than letting an unsourced row pass as an ordinary one.
       */
      identityVerification:
        seed.identityVerification ??
        (verification === 'verified' || verification === 'partially-verified'
          ? 'official-page'
          : verification === 'awaiting-publication'
            ? 'official-page'
            : 'unevidenced'),
      identityNote: seed.identityNote ?? null,
      officialUrl: seed.officialUrl ?? null,
      sourceUrl: seed.sourceUrl ?? null,
      sourceTitle: seed.sourceTitle ?? null,
      lastVerified: seed.lastVerified ?? null,
      sources: seed.sources ?? [],
    },
    notes: seed.notes ?? null,
  };
}

/**
 * A real course whose admissions fields have not been collected yet.
 * Everything requirement-shaped stays empty on purpose — this is the shape a
 * record takes between "we know the course exists" and "we have read the
 * university's page".
 */
export function awaitingCourse(seed: {
  slug: string;
  universityId: string;
  name: string;
  category: SubjectCategory;
  sub: SubjectSubcategory;
  degree: DegreeType;
  awardLabel?: string | null;
  years?: number | null;
  yearsMax?: number | null;
  year?: ApplicationYear;
  cycleNote?: string | null;
  verification?: VerificationStatus;
  publication?: PublicationStatus;
  latestPublishedYear?: ApplicationYear | null;
  officialUrl?: string | null;
  notes?: string | null;
  /** How the APPLICATION IDENTITY was established — see `IdentityVerification`. */
  identityVerification?: IdentityVerification;
  identityNote?: string | null;
  /**
   * A UCAS code is course IDENTITY, not an admissions requirement, so a shell
   * may carry one. It is what lets a clean shell displace an older invented row
   * for the same course whose title is worded differently.
   */
  code?: string | null;
}): Course {
  return course({
    ...seed,
    years: seed.years ?? null,
    code: seed.code ?? null,
    publication: seed.publication ?? 'unknown',
    offers: [],
    raw: null,
    maths: 'unknown',
    physicsStatus: 'unknown',
    chemistryStatus: 'unknown',
    fm: 'unknown',
    test: 'unknown',
    testRequirement: 'unknown',
    interview: 'not-stated',
    contextual: { availability: 'unknown', details: null },
    verification: seed.verification ?? 'awaiting-data',
    officialUrl: seed.officialUrl ?? null,
    notes: seed.notes ?? null,
  });
}

/**
 * Strip a record back to course identity and nothing else.
 *
 * Used to turn the catalogue's original sample rows into honest research
 * targets: the university, title, award, UCAS code, duration and subject area
 * are real and useful, while every invented admissions claim — offers, subject
 * statuses, admissions test, contextual offer, GCSE text — is removed rather
 * than left in front of students as though a human had checked it.
 *
 * The result is `awaiting-data`: a row that says "we have not researched this
 * yet", which is exactly true.
 */
export function toResearchTarget(c: Course): Course {
  return awaitingCourse({
    slug: c.slug,
    universityId: c.universityId,
    name: c.name,
    awardLabel: c.awardLabel,
    category: c.subjectCategory,
    sub: c.subjectSubcategory,
    degree: c.degreeType,
    years: c.durationYears,
    yearsMax: c.durationYearsMax,
    code: c.courseCode,
    year: c.applicationYear,
    verification: 'awaiting-data',
    notes:
      'Course identity only. Entry requirements for this course have not been researched yet, and nothing has been assumed from another course or another university.',
  });
}
