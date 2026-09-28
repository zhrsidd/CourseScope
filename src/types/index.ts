/**
 * CourseScope — domain model.
 *
 * UI-agnostic. Nothing here imports React or any presentation code, so the same
 * schema backs the bundled TypeScript seed today, a JSON/CSV import tomorrow,
 * and a Supabase / Postgres table after that.
 *
 * Rules this model exists to enforce:
 *  1. Entry requirements are never a single string. A course holds one or more
 *     independent `OfferPathway`s, each with structured subject requirements
 *     and, where needed, cross-subject `OfferConstraint`s.
 *  2. Overall grades and subject grades are separate checks. Satisfying "AAA"
 *     never implies satisfying "A* in Physics".
 *  3. Every requirement belongs to exactly one application cycle. Records for
 *     different years are separate rows and are never merged or substituted.
 *  4. "We don't know" is a first-class value. Missing data stays `null` /
 *     `'unknown'` and is never filled with a plausible guess.
 *  5. Provenance is mandatory: source URL, source title, verification status and
 *     last-verified date travel with the record.
 */

/* ------------------------------------------------------------------ */
/* Grades                                                              */
/* ------------------------------------------------------------------ */

export type ALevelGrade = 'A*' | 'A' | 'B' | 'C' | 'D' | 'E';

export const A_LEVEL_GRADES: readonly ALevelGrade[] = ['A*', 'A', 'B', 'C', 'D', 'E'] as const;

/** Higher number = better grade. Ordinal comparison only. */
export const GRADE_VALUE: Record<ALevelGrade, number> = {
  'A*': 6,
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};

export type GcseGrade = '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1';

export const GCSE_GRADES: readonly GcseGrade[] = ['9', '8', '7', '6', '5', '4', '3', '2', '1'] as const;

/* ------------------------------------------------------------------ */
/* Subject taxonomy                                                    */
/* ------------------------------------------------------------------ */

export type SubjectCategory = 'physics' | 'engineering';

export type PhysicsSubcategory =
  | 'physics'
  | 'theoretical-physics'
  | 'mathematical-physics'
  | 'astrophysics'
  | 'physics-with-astronomy'
  | 'physics-with-computing'
  | 'physics-with-mathematics'
  | 'natural-sciences-physical';

export type EngineeringSubcategory =
  | 'general-engineering'
  | 'engineering-science'
  | 'mechanical'
  | 'electrical'
  | 'electronic'
  | 'civil'
  | 'chemical'
  | 'aerospace'
  | 'aeronautical'
  | 'materials'
  /**
   * Added in Batch 7. Lancaster publishes Nuclear Engineering as a full named
   * discipline with its own complete set of seven UCAS codes — BEng, MEng and
   * the study-abroad, placement-year and foundation-year forms of each. Filing
   * it under general engineering would have hidden a real discipline behind a
   * label that means "undifferentiated", and no existing subcategory describes
   * it.
   */
  | 'nuclear'
  | 'biomedical'
  | 'biochemical'
  | 'design'
  | 'robotics-mechatronics'
  | 'information-engineering'
  | 'computer-engineering';

export type SubjectSubcategory = PhysicsSubcategory | EngineeringSubcategory;

export interface SubcategoryMeta {
  id: SubjectSubcategory;
  category: SubjectCategory;
  label: string;
  blurb: string;
}

/* ------------------------------------------------------------------ */
/* Qualifications                                                      */
/* ------------------------------------------------------------------ */

export type DegreeType =
  | 'BSc'
  | 'BEng'
  | 'BA'
  | 'MPhys'
  | 'MSci'
  | 'MEng'
  | 'MMath'
  | 'Other';

export interface DegreeTypeMeta {
  id: DegreeType;
  label: string;
  description: string;
  integratedMasters: boolean;
}

/* ------------------------------------------------------------------ */
/* Subject requirement vocabulary                                      */
/* ------------------------------------------------------------------ */

/**
 * Course-level stance on a single subject.
 * `not-required` means the university publishes that it is not needed;
 * `unknown` means we have not recorded it. They are different facts.
 */
export type SubjectStatus = 'required' | 'recommended' | 'not-required' | 'unknown';

/**
 * Further Mathematics gets its own, finer scale — it is the single field that
 * varies most between Physics and Engineering departments, and the difference
 * between "strongly recommended" and "required" changes what a student does.
 * Only `required` is ever treated as a hard eligibility rule.
 */
export type FurtherMathsStatus =
  | 'required'
  /** Required only when a published condition holds — see the pathway constraints. */
  | 'conditional'
  | 'strongly-recommended'
  | 'recommended'
  | 'useful'
  | 'no-stated-preference'
  | 'not-required'
  | 'unknown';

/** The advisory statuses — surfaced in amber, never used to reject a profile. */
export const ADVISORY_FURTHER_MATHS: readonly FurtherMathsStatus[] = [
  'strongly-recommended',
  'recommended',
  'useful',
] as const;

export type InterviewPolicy = 'yes' | 'no' | 'sometimes' | 'not-stated';

export type ContextualOfferAvailability = 'yes' | 'no' | 'check-website' | 'unknown';

export interface ContextualOfferInfo {
  availability: ContextualOfferAvailability;
  /** Only when the university publishes the reduced offer, e.g. "AAB". */
  details: string | null;
}

/* ------------------------------------------------------------------ */
/* Admissions tests                                                    */
/* ------------------------------------------------------------------ */

export type AdmissionsTestCode =
  | 'none'
  | 'esat'
  | 'pat'
  | 'tmua'
  | 'step'
  | 'mat'
  | 'tara'
  | 'university-specific'
  | 'not-announced'
  | 'other'
  | 'unknown';

export type AdmissionsTestRequirementLevel =
  | 'required'
  /**
   * Required only of some applicants, on a condition the university publishes
   * — Birmingham's Mathematics Aptitude test applies only "if you have an
   * alternative qualification to A-level mathematics", and Leeds sets a
   * diagnostic maths test on its BTEC route. Calling that "required" would
   * tell an A-Level applicant to sit a test they do not need; calling it
   * "optional" would understate it for the applicants it binds. The condition
   * itself is kept in `notes`.
   */
  | 'conditional'
  | 'optional'
  | 'not-required'
  | 'not-announced'
  | 'unknown';

export interface AdmissionsTestMeta {
  code: AdmissionsTestCode;
  shortName: string;
  fullName: string;
  description: string;
  infoUrl: string | null;
}

/**
 * A named route, specialism or placement option WITHIN a course.
 *
 * This exists because universities publish specialisms that look like separate
 * degrees but are not separate applications. Imperial advertises "Aeronautics
 * with Spacecraft Engineering" on its own page, then tells applicants to apply
 * to H401 — the parent Aeronautical Engineering code. Southampton runs four
 * named MPhys courses under the single code F303. Durham and Warwick admit to a
 * discipline code but let students change specialism at the end of year two.
 *
 * A study option is DISPLAY ONLY. It never produces its own eligibility result,
 * never becomes a separate course record, never appears as its own application
 * in search, and never gets its own 2028 shell. Where a specialism genuinely
 * has its own UCAS code it is a course in its own right and does not belong
 * here — `ucasCode` is filled only to record a code the university prints
 * alongside the option, never to create an application.
 */
export interface StudyOption {
  /** The university's own name for the route, e.g. "Spacecraft Engineering". */
  name: string;
  /** What the university says about it, quoted. */
  description: string | null;
  /**
   * A UCAS code the university prints for this option. Usually null — and when
   * it equals the parent course's code, that is the point: the option is not a
   * separate application.
   */
  ucasCode: string | null;
  /** When the choice is made, e.g. "at the end of year 2". */
  chosenWhen: string | null;
  officialUrl: string | null;
}

/**
 * "Choose N of these" module requirements. Kept structured rather than as prose
 * so the choice can be displayed, validated and compared, and so a flexible
 * requirement is never flattened into a fixed combination the university did
 * not publish.
 */
export interface AdmissionsTestModuleChoice {
  /** How many of `options` the applicant must sit, e.g. 2. */
  chooseCount: number;
  /** The published choice set, in the university's own order. */
  options: string[];
}

/**
 * A test requirement is stored per course AND per application cycle. A 2027
 * arrangement says nothing about 2028, so `applicationYear` is not optional in
 * practice: a record without it is flagged by validation.
 */
export interface AdmissionsTestRecord {
  code: AdmissionsTestCode;
  /** Free text only for `university-specific` / `other`. */
  name: string | null;
  requirement: AdmissionsTestRequirementLevel;
  applicationYear: ApplicationYear | null;
  /**
   * The modules the applicant MUST sit, e.g. ["Mathematics 1", "Mathematics 2",
   * "Physics"]. Empty means not recorded — never assume a default combination.
   * Where the university lets the applicant choose some of the modules, only
   * the mandatory ones go here and the choice goes in `moduleChoice`.
   */
  modules: string[];
  /**
   * A published choice of modules, e.g. UCL Electronic and Electrical
   * Engineering: Mathematics 1 is mandatory and the applicant picks any two of
   * Physics, Mathematics 2, Chemistry and Biology. Null where the requirement
   * is a fixed set (Imperial) or where nothing is recorded.
   */
  moduleChoice: AdmissionsTestModuleChoice | null;
  /** Free-text note about module choice where the university allows options. */
  moduleNote: string | null;
  /** Registration deadlines, scoring notes, etc. */
  details: string | null;
  officialUrl: string | null;
  notes: string | null;
}

/* ------------------------------------------------------------------ */
/* Provenance                                                          */
/* ------------------------------------------------------------------ */

export type ApplicationYear = '2026' | '2027' | '2028' | '2029';

/**
 * `verified`            — checked against the official source on `lastVerified`.
 * `partially-verified`  — some fields checked, others still outstanding.
 * `awaiting-publication`— the university has not published this cycle yet.
 * `awaiting-data`       — real course, admissions fields not collected yet.
 * `demo`                — placeholder shipped with the app. Not real data.
 * `unknown`             — provenance itself is unrecorded.
 */
export type VerificationStatus =
  | 'verified'
  | 'partially-verified'
  | 'awaiting-publication'
  | 'awaiting-data'
  | 'demo'
  | 'unknown';

export type PublicationStatus = 'published' | 'not-yet-published' | 'unknown';

/** One citation. A record may carry several (course page, department page, test page). */
export interface SourceRecord {
  /** e.g. "University of Oxford undergraduate admissions website". */
  title: string;
  url: string;
  /** Which cycle this source describes. */
  applicationYear: ApplicationYear | null;
  /** ISO date (YYYY-MM-DD) the source was last read. */
  lastVerified: string | null;
  /** "course-page" | "admissions-page" | "test-page" | "prospectus" | other. */
  kind: string | null;
}

/**
 * How the APPLICATION IDENTITY was established — deliberately separate from
 * `verificationStatus`, which is about the ADMISSIONS REQUIREMENTS.
 *
 * Batch 7 proved these are different questions and that conflating them hides
 * the catalogue's real weak spots. "Awaiting data" was being used for two
 * unrelated claims:
 *
 *   · York's engineering rows: York's own "Courses 2027/28" A–Z names the
 *     course and prints its UCAS code. The course certainly exists; only its
 *     requirements were unread. That is a strong record with a known gap.
 *   · Eight scaffold rows: nothing at all. No page, no listing, no date. The
 *     scaffold that produced them also produced Imperial's F340, York's H610
 *     MEng, Lancaster's FG31 and three invented Bath codes — none of which
 *     existed. That is not a gap, it is an unsupported assertion.
 *
 * A student reading "awaiting research" should be able to trust that the course
 * is real. This field is what makes that trustworthy, and the public-data
 * policy keys off it: an `unevidenced` row never enters normal discovery.
 */
export type IdentityVerification =
  /** A dedicated official course page for this application was read. */
  | 'official-page'
  /** An official A–Z, course finder or department listing enumerates it. */
  | 'official-listing'
  /** No official source establishes that this application exists. */
  | 'unevidenced';

export interface Provenance {
  verificationStatus: VerificationStatus;
  /**
   * Whether the APPLICATION EXISTS, asked and answered independently of
   * whether its requirements have been verified. See `IdentityVerification`.
   */
  identityVerification: IdentityVerification;
  /** How the identity was established, in the university's own terms. */
  identityNote: string | null;
  /** Canonical course page. */
  officialUrl: string | null;
  /** The specific page the requirements were read from. */
  sourceUrl: string | null;
  /** Human-readable name of that page. */
  sourceTitle: string | null;
  /** ISO date (YYYY-MM-DD), or null when never checked. */
  lastVerified: string | null;
  /** Additional citations beyond the primary one. */
  sources: SourceRecord[];
}

/* ------------------------------------------------------------------ */
/* Rankings                                                            */
/* ------------------------------------------------------------------ */

export type RankingCategory = 'overall' | 'physics-astronomy' | 'engineering-technology';

/**
 * One published ranking position, with its own provenance.
 *
 * Positions from different providers, editions or categories are separate
 * records and are never averaged, merged or substituted for one another. A
 * ranking is only ever displayed with its provider and edition attached.
 */
export interface Ranking {
  id: string;
  universityId: string;
  /** Full provider name, e.g. "QS World University Rankings by Subject". */
  provider: string;
  /** Short form used in badges, e.g. "QS". */
  providerShort: string;
  /** Edition year as the provider publishes it, e.g. 2027. */
  edition: number;
  category: RankingCategory;
  categoryLabel: string;
  rank: number;
  sourceUrl: string | null;
  sourceTitle: string | null;
  lastVerified: string | null;
  verificationStatus: VerificationStatus;
  notes: string | null;
}

/* ------------------------------------------------------------------ */
/* Application deadlines                                               */
/* ------------------------------------------------------------------ */

/**
 * What a deadline applies to. Universities do not have one deadline: an
 * earlier cycle applies to some courses, test registration to others, and the
 * standard UCAS date to the rest.
 */
export type DeadlineScope =
  | { kind: 'all-courses' }
  | { kind: 'course-slugs'; slugs: string[] }
  | { kind: 'subject-category'; category: SubjectCategory }
  | { kind: 'other'; description: string };

export interface ApplicationDeadline {
  id: string;
  universityId: string;
  /** Short name, e.g. "UCAS equal consideration deadline". */
  label: string;
  /** ISO date (YYYY-MM-DD). Null when the exact date is not recorded. */
  date: string | null;
  /** Deadlines are per cycle. A 2027 date never stands in for 2028. */
  applicationYear: ApplicationYear;
  appliesTo: DeadlineScope;
  notes: string | null;
  sourceUrl: string | null;
  sourceTitle: string | null;
  lastVerified: string | null;
  verificationStatus: VerificationStatus;
}

/* ------------------------------------------------------------------ */
/* Entry requirements                                                  */
/* ------------------------------------------------------------------ */

export interface SubjectRequirement {
  subject: string;
  required: boolean;
  recommended: boolean;
  /** Minimum grade in this subject, when the university states one. */
  minimumGrade: ALevelGrade | null;
  /** Subjects the university accepts in place of this one. */
  acceptedAlternatives: string[];
  notes: string | null;
}

/**
 * Cross-subject rules that a flat list of subject requirements cannot express.
 *
 *  min-count-at-grade  "one A* in either Mathematics or Physics"
 *  one-of              "one of Physics, Chemistry or Biology"
 *  manual-review       a published condition we can describe but not evaluate
 */
export type OfferConstraint =
  | {
      kind: 'min-count-at-grade';
      subjects: string[];
      grade: ALevelGrade;
      count: number;
      description: string;
    }
  | {
      kind: 'one-of';
      subjects: string[];
      minimumGrade: ALevelGrade | null;
      description: string;
    }
  | {
      /**
       * A requirement that only binds when a fact about the applicant's
       * circumstances is true — Cambridge's "Further Mathematics is required
       * if your school offers it". When the fact is unknown the check reports
       * "review required" rather than passing or failing.
       */
      kind: 'conditional-subject';
      condition: ProfileCondition;
      subject: string;
      minimumGrade: ALevelGrade | null;
      /** Accepted at AS level as well as A level, where the university says so. */
      acceptsAsLevel: boolean;
      description: string;
    }
  | {
      kind: 'manual-review';
      description: string;
    };

/** Facts about an applicant's circumstances that a constraint can depend on. */
export type ProfileCondition = 'school-offers-further-mathematics';

/**
 * One published route to an offer. A course may publish several; each is
 * evaluated independently and the student needs to satisfy only one.
 *
 * `appliesOnlyIfTaking` models conditional pathways such as
 * "A*AA, or AAA if Further Mathematics is taken" — the second pathway simply
 * does not apply to a student who is not taking Further Mathematics, which is
 * not the same as that student failing it.
 */
export interface OfferPathway {
  id: string;
  label: string;
  /** Grade profile exactly as published, e.g. "A*AA". */
  gradeProfile: string;
  /**
   * Parsed profile, best first. `null` when the published wording cannot be
   * reduced to a list of A-Level grades — the engine then reports "review
   * required" for that part rather than guessing.
   */
  gradeProfileGrades: ALevelGrade[] | null;
  subjectRequirements: SubjectRequirement[];
  constraints: OfferConstraint[];
  /** Subjects the student must be taking for this pathway to apply at all. */
  appliesOnlyIfTaking: string[];
  /**
   * Minimum number of A-Levels for this pathway to apply. Universities publish
   * different offers for three- and four-A-Level applicants; a three-A-Level
   * applicant does not *fail* the four-A-Level offer, it does not apply.
   */
  appliesOnlyIfTakingAtLeast: number | null;
  isContextual: boolean;
  /** The university's own wording for this pathway, if it differs per pathway. */
  rawText: string | null;
  notes: string | null;
}

/* ------------------------------------------------------------------ */
/* Core entities                                                       */
/* ------------------------------------------------------------------ */

export interface UniversityAdmissionsOverview {
  typicalOffer: string | null;
  requiredSubjectsNote: string | null;
  furtherMathematics: FurtherMathsStatus;
  furtherMathematicsNote: string | null;
  gcseRequirements: string | null;
  englishLanguageRequirements: string | null;
  admissionsTestsNote: string | null;
  interviews: InterviewPolicy;
  interviewsNote: string | null;
  internationalNotes: string | null;
  contextualOffer: ContextualOfferInfo;
  /**
   * Free-text fallback kept for display. The authoritative version is the
   * university's `applicationDeadlines` array.
   */
  applicationDeadline: string | null;
  provenance: Provenance;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  city: string;
  region: string;
  country: 'United Kingdom';
  founded: number | null;
  website: string;
  admissionsUrl: string | null;
  departments: string[];
  rankings: Ranking[];
  applicationDeadlines: ApplicationDeadline[];
  admissionsOverview: UniversityAdmissionsOverview;
  verificationStatus: VerificationStatus;
}

export interface Course {
  /** `${slug}--${applicationYear}` — unique per cycle. */
  id: string;
  /** Stable across application years. */
  slug: string;
  universityId: string;
  name: string;
  subjectCategory: SubjectCategory;
  subjectSubcategory: SubjectSubcategory;
  /** The highest award, used for identity. */
  degreeType: DegreeType;
  /**
   * Display label where a course leads to more than one award, e.g.
   * "MPhys / BA" or "BA (Hons) / MEng". `degreeType` stays single-valued so
   * identity keys and filters keep working.
   */
  awardLabel: string | null;
  /** Null when not yet recorded — never guessed. */
  durationYears: number | null;
  /** Upper bound where a course runs to either length, e.g. 3 or 4 years. */
  durationYearsMax: number | null;
  /** UCAS course code. */
  courseCode: string | null;
  /**
   * Other codes the same programme is listed under — course options that share
   * one admissions process. Recording them here keeps them from becoming
   * separate programmes with separate requirements.
   */
  alternativeCourseCodes: { code: string; label: string }[];
  applicationYear: ApplicationYear;
  requirementsPublicationStatus: PublicationStatus;
  /** When this cycle is unpublished, the most recent cycle that is. */
  latestPublishedYear: ApplicationYear | null;
  /**
   * The university's own wording about which cycle these requirements cover —
   * needed where a page covers one entry year plus deferred entry to the next.
   */
  cycleNote: string | null;

  /** The university's own wording, kept verbatim beside our interpretation. */
  rawRequirementText: string | null;
  /**
   * A university-wide floor published separately from the course offer, e.g.
   * Imperial's "minimum entry standard". Kept apart from the typical offer.
   */
  minimumEntryStandard: string | null;
  /**
   * A separately published "typical offer", where the university states one
   * alongside the minimum. Display-only: it is the university's description of
   * the offers it actually made, not a condition, so it is never matched
   * against a student's grades.
   */
  typicalOffer: string | null;
  /**
   * Named routes within this one application. Display only — see StudyOption.
   */
  studyOptions: StudyOption[];
  offers: OfferPathway[];

  mathematics: SubjectStatus;
  physics: SubjectStatus;
  chemistry: SubjectStatus;
  furtherMathematics: FurtherMathsStatus;
  furtherMathematicsNote: string | null;

  admissionsTest: AdmissionsTestRecord;
  interview: InterviewPolicy;
  interviewNote: string | null;
  contextualOffer: ContextualOfferInfo;
  gcseRequirements: string | null;
  englishLanguageRequirements: string | null;
  internationalNotes: string | null;
  placementOrStudyAbroad: string | null;

  provenance: Provenance;
  notes: string | null;
}

/* ------------------------------------------------------------------ */
/* Student profile                                                     */
/* ------------------------------------------------------------------ */

export interface ALevelEntry {
  id: string;
  subject: string;
  grade: ALevelGrade | null;
}

export interface GcseEntry {
  id: string;
  subject: string;
  grade: GcseGrade | null;
}

export interface StudentProfile {
  aLevels: ALevelEntry[];
  gcses: GcseEntry[];
  applicationYear: ApplicationYear;
  /**
   * Needed by conditional requirements such as "Further Mathematics is
   * required if your school offers it". `null` means not answered, and any
   * constraint depending on it reports "review required".
   */
  schoolOffersFurtherMathematics: boolean | null;
  notes: string;
}

/* ------------------------------------------------------------------ */
/* Eligibility engine                                                  */
/* ------------------------------------------------------------------ */

/**
 * Outcome of one part of the check.
 *  pass          — the published requirement appears to be satisfied
 *  fail          — it appears not to be
 *  advisory      — recommended, not required; never blocks a match
 *  not-required  — the university publishes that this is not needed
 *  review        — published wording we cannot evaluate mechanically
 *  unknown       — we hold no data, or the profile is missing information
 */
export type PartOutcome = 'pass' | 'fail' | 'advisory' | 'not-required' | 'review' | 'unknown';

export interface EligibilityPart {
  id: string;
  label: string;
  outcome: PartOutcome;
  detail: string;
}

export type AdmissionsTestOutcome =
  | 'required'
  | 'optional'
  | 'none'
  | 'not-announced'
  | 'unknown';

/**
 * Four verdicts, and deliberately no fifth for "likely". The engine reports
 * whether published *academic requirements* appear to be met; it never models
 * the chance of an offer.
 */
export type EligibilityVerdict =
  | 'meets'
  | 'does-not-meet'
  | 'review-required'
  | 'insufficient-information';

export interface PathwayReport {
  pathwayId: string;
  label: string;
  gradeProfile: string;
  applicable: boolean;
  /** Why a pathway does not apply, e.g. "requires Further Mathematics". */
  applicabilityNote: string | null;
  verdict: EligibilityVerdict;
  overallGrades: EligibilityPart;
  subjectParts: EligibilityPart[];
  constraintParts: EligibilityPart[];
}

export interface EligibilityReport {
  courseId: string;
  verdict: EligibilityVerdict;
  /** One-line summary in non-committal wording. */
  summary: string;

  /** Headline breakdown, taken from the best-matching pathway. */
  overallGrades: EligibilityPart;
  mathematics: EligibilityPart;
  physics: EligibilityPart;
  furtherMathematics: EligibilityPart;
  chemistry: EligibilityPart;
  otherSubjects: EligibilityPart;
  constraints: EligibilityPart[];

  admissionsTest: { outcome: AdmissionsTestOutcome; detail: string };

  bestPathwayId: string | null;
  pathways: PathwayReport[];
}

/* ------------------------------------------------------------------ */
/* Course identity and duplicate detection                             */
/* ------------------------------------------------------------------ */

/** How a course's identity key was derived. UCAS code wins when present. */
export type IdentityBasis = 'ucas-code' | 'canonical-name';

export interface CourseIdentity {
  /** The key used for deduplication and superseding. */
  key: string;
  basis: IdentityBasis;
  universityId: string;
  applicationYear: ApplicationYear;
  /** Normalised UCAS code, or null. */
  courseCode: string | null;
  /** Canonical course name with award and noise removed. */
  canonicalName: string;
  degreeType: DegreeType;
}

/**
 * `exact-duplicate`  — same identity and nothing material differs.
 * `likely-duplicate` — same course by our rules, but fields differ; a human decides.
 * `conflict`         — the records disagree in a way that cannot be reconciled
 *                      automatically (e.g. same UCAS code, different course).
 */
export type DuplicateKind = 'exact-duplicate' | 'likely-duplicate' | 'conflict';

export interface DuplicateFinding {
  kind: DuplicateKind;
  basis: IdentityBasis;
  /** Ids of the two records involved. */
  aId: string;
  bId: string;
  reason: string;
  /** Field names whose values differ between the two records. */
  differingFields: string[];
}

/* ------------------------------------------------------------------ */
/* Validation (development / admin only)                               */
/* ------------------------------------------------------------------ */

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  ruleId: string;
  severity: ValidationSeverity;
  message: string;
  /** 'course' | 'university'. */
  entity: 'course' | 'university';
  entityId: string;
  field: string | null;
}

/* ------------------------------------------------------------------ */
/* Glossary                                                            */
/* ------------------------------------------------------------------ */

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}
