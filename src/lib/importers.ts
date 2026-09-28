/**
 * Bulk import and export.
 *
 * One wire format (`CourseRecordJson`) is shared by the JSON files in `/data`,
 * the CSV importer and the admin paste box, and it maps 1:1 onto the seed
 * builders — so a hand-written record, an imported row and a row that later
 * comes out of Postgres all normalise to exactly the same `Course`.
 *
 * Import never repairs data. A row missing a source URL imports with a `null`
 * source and is flagged by validation; it is never given a plausible one.
 */

import type {
  AdmissionsTestCode,
  AdmissionsTestRequirementLevel,
  ApplicationYear,
  ContextualOfferAvailability,
  Course,
  DegreeType,
  FurtherMathsStatus,
  InterviewPolicy,
  OfferConstraint,
  PublicationStatus,
  SourceRecord,
  SubjectCategory,
  SubjectStatus,
  SubjectSubcategory,
  VerificationStatus,
} from '@/types';
import type { DuplicateFinding } from '@/types';
import { course as buildCourse, type OfferSeed, type SubjectSpec } from '@/data/builders';
import { findDuplicates, normaliseCourseCode } from './identity';

/* ------------------------------------------------------------------ */
/* Wire format                                                         */
/* ------------------------------------------------------------------ */

export interface OfferJson {
  label?: string;
  gradeProfile: string;
  /** "Mathematics" or ["Mathematics","A*"]. */
  required?: (string | [string, string])[];
  recommended?: (string | [string, string])[];
  alternatives?: Record<string, string[]>;
  constraints?: OfferConstraint[];
  appliesOnlyIfTaking?: string[];
  appliesOnlyIfTakingAtLeast?: number;
  isContextual?: boolean;
  rawText?: string;
  notes?: string;
}

export interface CourseRecordJson {
  slug: string;
  universityId: string;
  name: string;
  subjectCategory: SubjectCategory;
  subjectSubcategory: SubjectSubcategory;
  degreeType: DegreeType;
  awardLabel?: string | null;
  durationYears?: number | null;
  durationYearsMax?: number | null;
  courseCode?: string | null;
  alternativeCourseCodes?: { code: string; label: string }[];
  applicationYear: ApplicationYear;
  requirementsPublicationStatus?: PublicationStatus;
  latestPublishedYear?: ApplicationYear | null;
  cycleNote?: string | null;
  rawRequirementText?: string | null;
  minimumEntryStandard?: string | null;
  offers?: OfferJson[];
  mathematics?: SubjectStatus;
  physics?: SubjectStatus;
  chemistry?: SubjectStatus;
  furtherMathematics?: FurtherMathsStatus;
  furtherMathematicsNote?: string | null;
  admissionsTest?: {
    code: AdmissionsTestCode;
    name?: string | null;
    requirement?: AdmissionsTestRequirementLevel;
    modules?: string[];
    moduleNote?: string | null;
    details?: string | null;
    officialUrl?: string | null;
    notes?: string | null;
  };
  interview?: InterviewPolicy;
  interviewNote?: string | null;
  contextualOffer?: { availability: ContextualOfferAvailability; details?: string | null };
  gcseRequirements?: string | null;
  englishLanguageRequirements?: string | null;
  internationalNotes?: string | null;
  placementOrStudyAbroad?: string | null;
  notes?: string | null;
  provenance?: {
    verificationStatus?: VerificationStatus;
    officialUrl?: string | null;
    sourceUrl?: string | null;
    sourceTitle?: string | null;
    lastVerified?: string | null;
    sources?: SourceRecord[];
  };
}

export interface ImportResult<T> {
  records: T[];
  errors: string[];
  warnings: string[];
  /** Pairs needing a human decision. Nothing is ever merged automatically. */
  duplicates: DuplicateFinding[];
}

export interface ImportOptions {
  /** Records already in the catalogue, so an import can spot collisions. */
  existing?: Course[];
}

/**
 * Compare the incoming batch against itself and against the catalogue.
 * Exact duplicates and conflicts are errors; likely duplicates are warnings
 * that the admin duplicates view lists for manual review.
 */
function detectImportDuplicates(
  incoming: Course[],
  existing: Course[],
  errors: string[],
  warnings: string[],
): DuplicateFinding[] {
  const withinBatch = findDuplicates(incoming);
  const incomingIds = new Set(incoming.map((c) => c.id));
  const againstCatalogue = findDuplicates([...existing.filter((c) => !incomingIds.has(c.id)), ...incoming]).filter(
    (f) => incomingIds.has(f.aId) !== incomingIds.has(f.bId),
  );

  const all = [...withinBatch, ...againstCatalogue];
  for (const f of all) {
    const line = `${f.reason} (${f.aId} ↔ ${f.bId})`;
    if (f.kind === 'likely-duplicate') warnings.push(`Likely duplicate: ${line} — review before committing.`);
    else errors.push(`${f.kind === 'conflict' ? 'Conflict' : 'Exact duplicate'}: ${line}`);
  }
  return all;
}

/* ------------------------------------------------------------------ */
/* Vocabulary guards — an unknown value is an error, never a default   */
/* ------------------------------------------------------------------ */

const SUBJECT_CATEGORIES = new Set(['physics', 'engineering']);
const DEGREE_TYPES = new Set(['BSc', 'BEng', 'BA', 'MPhys', 'MSci', 'MEng', 'MMath', 'Other']);
const YEARS = new Set(['2026', '2027', '2028', '2029']);
const FM_STATUSES = new Set([
  'required',
  'strongly-recommended',
  'recommended',
  'useful',
  'no-stated-preference',
  'not-required',
  'unknown',
]);
const SUBJECT_STATUSES = new Set(['required', 'recommended', 'not-required', 'unknown']);
const TEST_CODES = new Set([
  'none',
  'esat',
  'pat',
  'tmua',
  'step',
  'mat',
  'tara',
  'university-specific',
  'not-announced',
  'other',
  'unknown',
]);
const TEST_REQUIREMENTS = new Set(['required', 'conditional', 'optional', 'not-required', 'not-announced', 'unknown']);
const INTERVIEWS = new Set(['yes', 'no', 'sometimes', 'not-stated']);
const VERIFICATIONS = new Set([
  'verified',
  'partially-verified',
  'awaiting-publication',
  'awaiting-data',
  'demo',
  'unknown',
]);
const PUBLICATION = new Set(['published', 'not-yet-published', 'unknown']);
const CONTEXTUAL = new Set(['yes', 'no', 'check-website', 'unknown']);

function toSpec(value: string | [string, string]): SubjectSpec {
  return Array.isArray(value) ? ([value[0], value[1]] as SubjectSpec) : value;
}

/* ------------------------------------------------------------------ */
/* JSON import                                                         */
/* ------------------------------------------------------------------ */

export function normaliseCourseRecord(
  record: CourseRecordJson,
  rowLabel: string,
  errors: string[],
  warnings: string[],
): Course | null {
  const bad = (field: string, value: unknown) => {
    errors.push(`${rowLabel}: invalid ${field} "${String(value)}".`);
  };

  for (const key of ['slug', 'universityId', 'name'] as const) {
    if (!record[key] || typeof record[key] !== 'string') {
      errors.push(`${rowLabel}: missing required field "${key}".`);
      return null;
    }
  }
  if (!SUBJECT_CATEGORIES.has(record.subjectCategory)) return bad('subjectCategory', record.subjectCategory), null;
  if (!DEGREE_TYPES.has(record.degreeType)) return bad('degreeType', record.degreeType), null;
  if (!YEARS.has(record.applicationYear)) return bad('applicationYear', record.applicationYear), null;
  if (record.requirementsPublicationStatus && !PUBLICATION.has(record.requirementsPublicationStatus)) {
    return bad('requirementsPublicationStatus', record.requirementsPublicationStatus), null;
  }
  if (record.furtherMathematics && !FM_STATUSES.has(record.furtherMathematics)) {
    return bad('furtherMathematics', record.furtherMathematics), null;
  }
  for (const key of ['mathematics', 'physics', 'chemistry'] as const) {
    const v = record[key];
    if (v && !SUBJECT_STATUSES.has(v)) return bad(key, v), null;
  }
  if (record.admissionsTest && !TEST_CODES.has(record.admissionsTest.code)) {
    return bad('admissionsTest.code', record.admissionsTest.code), null;
  }
  if (record.admissionsTest?.requirement && !TEST_REQUIREMENTS.has(record.admissionsTest.requirement)) {
    return bad('admissionsTest.requirement', record.admissionsTest.requirement), null;
  }
  if (record.interview && !INTERVIEWS.has(record.interview)) return bad('interview', record.interview), null;
  if (record.contextualOffer && !CONTEXTUAL.has(record.contextualOffer.availability)) {
    return bad('contextualOffer.availability', record.contextualOffer.availability), null;
  }
  if (record.provenance?.verificationStatus && !VERIFICATIONS.has(record.provenance.verificationStatus)) {
    return bad('provenance.verificationStatus', record.provenance.verificationStatus), null;
  }

  const offers: OfferSeed[] = (record.offers ?? []).map((o) => ({
    label: o.label,
    gradeProfile: o.gradeProfile,
    required: (o.required ?? []).map(toSpec),
    recommended: (o.recommended ?? []).map(toSpec),
    alternatives: o.alternatives,
    constraints: o.constraints,
    appliesOnlyIfTaking: o.appliesOnlyIfTaking,
    appliesOnlyIfTakingAtLeast: o.appliesOnlyIfTakingAtLeast,
    isContextual: o.isContextual,
    rawText: o.rawText,
    notes: o.notes,
  }));

  const verification = record.provenance?.verificationStatus ?? 'unknown';
  if (verification === 'verified' && !record.provenance?.lastVerified) {
    warnings.push(`${rowLabel}: marked verified with no lastVerified date.`);
  }

  return buildCourse({
    slug: record.slug,
    universityId: record.universityId,
    name: record.name,
    category: record.subjectCategory,
    sub: record.subjectSubcategory,
    degree: record.degreeType,
    awardLabel: record.awardLabel ?? null,
    years: record.durationYears ?? null,
    yearsMax: record.durationYearsMax ?? null,
    // Normalised on the way in so "f 303" and "F303" are the same identity.
    code: normaliseCourseCode(record.courseCode),
    altCodes: record.alternativeCourseCodes ?? [],
    year: record.applicationYear,
    publication: record.requirementsPublicationStatus ?? (offers.length ? 'published' : 'unknown'),
    latestPublishedYear: record.latestPublishedYear ?? null,
    cycleNote: record.cycleNote ?? null,
    raw: record.rawRequirementText ?? null,
    minimumEntryStandard: record.minimumEntryStandard ?? null,
    offers,
    maths: record.mathematics,
    physicsStatus: record.physics,
    chemistryStatus: record.chemistry,
    fm: record.furtherMathematics ?? 'unknown',
    fmNote: record.furtherMathematicsNote ?? null,
    test: record.admissionsTest?.code ?? 'unknown',
    testRequirement: record.admissionsTest?.requirement,
    testName: record.admissionsTest?.name ?? null,
    testModules: record.admissionsTest?.modules ?? [],
    testModuleNote: record.admissionsTest?.moduleNote ?? null,
    testDetails: record.admissionsTest?.details ?? null,
    testUrl: record.admissionsTest?.officialUrl ?? null,
    testNote: record.admissionsTest?.notes ?? null,
    interview: record.interview ?? 'not-stated',
    interviewNote: record.interviewNote ?? null,
    contextual: record.contextualOffer
      ? { availability: record.contextualOffer.availability, details: record.contextualOffer.details ?? null }
      : { availability: 'unknown', details: null },
    gcse: record.gcseRequirements ?? null,
    english: record.englishLanguageRequirements ?? null,
    international: record.internationalNotes ?? null,
    placement: record.placementOrStudyAbroad ?? null,
    notes: record.notes ?? null,
    verification,
    officialUrl: record.provenance?.officialUrl ?? null,
    sourceUrl: record.provenance?.sourceUrl ?? null,
    sourceTitle: record.provenance?.sourceTitle ?? null,
    lastVerified: record.provenance?.lastVerified ?? null,
    sources: record.provenance?.sources ?? [],
  });
}

export function importCoursesJson(text: string, options: ImportOptions = {}): ImportResult<Course> {
  const errors: string[] = [];
  const warnings: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return { records: [], errors: [`Could not parse JSON: ${(e as Error).message}`], warnings, duplicates: [] };
  }
  const rows: CourseRecordJson[] = Array.isArray(parsed)
    ? (parsed as CourseRecordJson[])
    : Array.isArray((parsed as { courses?: unknown }).courses)
      ? ((parsed as { courses: CourseRecordJson[] }).courses)
      : [];
  if (rows.length === 0) {
    errors.push('No course records found. Expected an array, or an object with a "courses" array.');
    return { records: [], errors, warnings, duplicates: [] };
  }

  const records: Course[] = [];
  rows.forEach((row, i) => {
    const built = normaliseCourseRecord(row, `Record ${i + 1} (${row?.slug ?? 'no slug'})`, errors, warnings);
    if (built) records.push(built);
  });

  const seen = new Set<string>();
  for (const c of records) {
    if (seen.has(c.id)) errors.push(`Duplicate record id "${c.id}" — same slug and entry year appears twice.`);
    seen.add(c.id);
  }

  const duplicates = detectImportDuplicates(records, options.existing ?? [], errors, warnings);
  return { records, errors, warnings, duplicates };
}

/* ------------------------------------------------------------------ */
/* CSV import                                                          */
/* ------------------------------------------------------------------ */

/** Minimal RFC-4180 reader: quoted fields, embedded commas, doubled quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const src = text.replace(/\r\n?/g, '\n');

  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i += 1;
        } else quoted = false;
      } else field += ch;
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

/** "Mathematics:A*;Physics:A" -> [["Mathematics","A*"],["Physics","A"]] */
function parseSubjectList(value: string): (string | [string, string])[] {
  if (!value.trim()) return [];
  return value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [subject, grade] = s.split(':').map((x) => x.trim());
      return grade ? ([subject, grade] as [string, string]) : subject;
    });
}

export const CSV_COLUMNS = [
  'slug',
  'university_id',
  'name',
  'subject_category',
  'subject_subcategory',
  'degree_type',
  'duration_years',
  'course_code',
  'application_year',
  'publication_status',
  'raw_requirement_text',
  'offer_grade_profile',
  'required_subjects',
  'recommended_subjects',
  'further_mathematics',
  'mathematics',
  'physics',
  'chemistry',
  'admissions_test_code',
  'admissions_test_requirement',
  'admissions_test_details',
  'admissions_test_url',
  'interview',
  'contextual_offer',
  'gcse_requirements',
  'english_language_requirements',
  'international_notes',
  'official_url',
  'source_url',
  'source_title',
  'last_verified',
  'verification_status',
  'notes',
  'offers_json',
] as const;

export function importCoursesCsv(text: string, options: ImportOptions = {}): ImportResult<Course> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const rows = parseCsv(text);
  if (rows.length < 2) {
    return { records: [], errors: ['CSV needs a header row and at least one data row.'], warnings, duplicates: [] };
  }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const missing = ['slug', 'university_id', 'name', 'application_year'].filter((c) => !header.includes(c));
  if (missing.length) {
    return { records: [], errors: [`CSV is missing required columns: ${missing.join(', ')}.`], warnings, duplicates: [] };
  }
  const unknownCols = header.filter((h) => !(CSV_COLUMNS as readonly string[]).includes(h));
  if (unknownCols.length) warnings.push(`Ignored unrecognised columns: ${unknownCols.join(', ')}.`);

  const get = (row: string[], col: string) => {
    const i = header.indexOf(col);
    return i === -1 ? '' : (row[i] ?? '').trim();
  };
  const orNull = (v: string) => (v === '' ? null : v);

  const records: Course[] = [];
  rows.slice(1).forEach((row, index) => {
    const label = `Row ${index + 2} (${get(row, 'slug') || 'no slug'})`;

    let offers: OfferJson[] = [];
    const offersJson = get(row, 'offers_json');
    if (offersJson) {
      try {
        offers = JSON.parse(offersJson) as OfferJson[];
      } catch (e) {
        errors.push(`${label}: offers_json is not valid JSON (${(e as Error).message}).`);
        return;
      }
    } else if (get(row, 'offer_grade_profile')) {
      offers = [
        {
          gradeProfile: get(row, 'offer_grade_profile'),
          required: parseSubjectList(get(row, 'required_subjects')),
          recommended: parseSubjectList(get(row, 'recommended_subjects')),
        },
      ];
    }

    const durationRaw = get(row, 'duration_years');
    const duration = durationRaw === '' ? null : Number(durationRaw);
    if (duration !== null && Number.isNaN(duration)) {
      errors.push(`${label}: duration_years "${durationRaw}" is not a number.`);
      return;
    }

    const record: CourseRecordJson = {
      slug: get(row, 'slug'),
      universityId: get(row, 'university_id'),
      name: get(row, 'name'),
      subjectCategory: (get(row, 'subject_category') || 'physics') as SubjectCategory,
      subjectSubcategory: (get(row, 'subject_subcategory') || 'physics') as SubjectSubcategory,
      degreeType: (get(row, 'degree_type') || 'Other') as DegreeType,
      durationYears: duration,
      courseCode: orNull(get(row, 'course_code')),
      applicationYear: get(row, 'application_year') as ApplicationYear,
      requirementsPublicationStatus:
        (orNull(get(row, 'publication_status')) as PublicationStatus | null) ??
        (offers.length ? 'published' : 'unknown'),
      rawRequirementText: orNull(get(row, 'raw_requirement_text')),
      offers,
      mathematics: (orNull(get(row, 'mathematics')) as SubjectStatus | null) ?? undefined,
      physics: (orNull(get(row, 'physics')) as SubjectStatus | null) ?? undefined,
      chemistry: (orNull(get(row, 'chemistry')) as SubjectStatus | null) ?? undefined,
      furtherMathematics: (orNull(get(row, 'further_mathematics')) as FurtherMathsStatus | null) ?? 'unknown',
      admissionsTest: {
        code: (orNull(get(row, 'admissions_test_code')) as AdmissionsTestCode | null) ?? 'unknown',
        requirement:
          (orNull(get(row, 'admissions_test_requirement')) as AdmissionsTestRequirementLevel | null) ?? undefined,
        details: orNull(get(row, 'admissions_test_details')),
        officialUrl: orNull(get(row, 'admissions_test_url')),
      },
      interview: (orNull(get(row, 'interview')) as InterviewPolicy | null) ?? 'not-stated',
      contextualOffer: {
        availability: (orNull(get(row, 'contextual_offer')) as ContextualOfferAvailability | null) ?? 'unknown',
        details: null,
      },
      gcseRequirements: orNull(get(row, 'gcse_requirements')),
      englishLanguageRequirements: orNull(get(row, 'english_language_requirements')),
      internationalNotes: orNull(get(row, 'international_notes')),
      notes: orNull(get(row, 'notes')),
      provenance: {
        verificationStatus: (orNull(get(row, 'verification_status')) as VerificationStatus | null) ?? 'unknown',
        officialUrl: orNull(get(row, 'official_url')),
        sourceUrl: orNull(get(row, 'source_url')),
        sourceTitle: orNull(get(row, 'source_title')),
        lastVerified: orNull(get(row, 'last_verified')),
        sources: [],
      },
    };

    const built = normaliseCourseRecord(record, label, errors, warnings);
    if (built) records.push(built);
  });

  const duplicates = detectImportDuplicates(records, options.existing ?? [], errors, warnings);
  return { records, errors, warnings, duplicates };
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

export function serialiseCourse(c: Course): CourseRecordJson {
  return {
    slug: c.slug,
    universityId: c.universityId,
    name: c.name,
    subjectCategory: c.subjectCategory,
    subjectSubcategory: c.subjectSubcategory,
    degreeType: c.degreeType,
    awardLabel: c.awardLabel,
    durationYears: c.durationYears,
    durationYearsMax: c.durationYearsMax,
    courseCode: c.courseCode,
    alternativeCourseCodes: c.alternativeCourseCodes,
    applicationYear: c.applicationYear,
    requirementsPublicationStatus: c.requirementsPublicationStatus,
    latestPublishedYear: c.latestPublishedYear,
    cycleNote: c.cycleNote,
    rawRequirementText: c.rawRequirementText,
    minimumEntryStandard: c.minimumEntryStandard,
    offers: c.offers.map((o) => ({
      label: o.label,
      gradeProfile: o.gradeProfile,
      required: o.subjectRequirements
        .filter((r) => r.required)
        .map((r) => (r.minimumGrade ? ([r.subject, r.minimumGrade] as [string, string]) : r.subject)),
      recommended: o.subjectRequirements.filter((r) => r.recommended).map((r) => r.subject),
      constraints: o.constraints.length ? o.constraints : undefined,
      appliesOnlyIfTaking: o.appliesOnlyIfTaking.length ? o.appliesOnlyIfTaking : undefined,
      appliesOnlyIfTakingAtLeast: o.appliesOnlyIfTakingAtLeast ?? undefined,
      isContextual: o.isContextual || undefined,
      rawText: o.rawText ?? undefined,
      notes: o.notes ?? undefined,
    })),
    mathematics: c.mathematics,
    physics: c.physics,
    chemistry: c.chemistry,
    furtherMathematics: c.furtherMathematics,
    furtherMathematicsNote: c.furtherMathematicsNote,
    admissionsTest: {
      code: c.admissionsTest.code,
      name: c.admissionsTest.name,
      requirement: c.admissionsTest.requirement,
      modules: c.admissionsTest.modules,
      moduleNote: c.admissionsTest.moduleNote,
      details: c.admissionsTest.details,
      officialUrl: c.admissionsTest.officialUrl,
      notes: c.admissionsTest.notes,
    },
    interview: c.interview,
    interviewNote: c.interviewNote,
    contextualOffer: c.contextualOffer,
    gcseRequirements: c.gcseRequirements,
    englishLanguageRequirements: c.englishLanguageRequirements,
    internationalNotes: c.internationalNotes,
    placementOrStudyAbroad: c.placementOrStudyAbroad,
    notes: c.notes,
    provenance: {
      verificationStatus: c.provenance.verificationStatus,
      officialUrl: c.provenance.officialUrl,
      sourceUrl: c.provenance.sourceUrl,
      sourceTitle: c.provenance.sourceTitle,
      lastVerified: c.provenance.lastVerified,
      sources: c.provenance.sources,
    },
  };
}

export function coursesToCsv(courses: Course[]): string {
  const escape = (v: string | number | null) => {
    const s = v === null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [CSV_COLUMNS.join(',')];
  for (const c of courses) {
    const primary = c.offers[0];
    lines.push(
      [
        c.slug,
        c.universityId,
        c.name,
        c.subjectCategory,
        c.subjectSubcategory,
        c.degreeType,
        c.durationYears,
        c.courseCode,
        c.applicationYear,
        c.requirementsPublicationStatus,
        c.rawRequirementText,
        primary?.gradeProfile ?? '',
        primary
          ? primary.subjectRequirements
              .filter((r) => r.required)
              .map((r) => `${r.subject}${r.minimumGrade ? `:${r.minimumGrade}` : ''}`)
              .join(';')
          : '',
        primary ? primary.subjectRequirements.filter((r) => r.recommended).map((r) => r.subject).join(';') : '',
        c.furtherMathematics,
        c.mathematics,
        c.physics,
        c.chemistry,
        c.admissionsTest.code,
        c.admissionsTest.requirement,
        c.admissionsTest.details,
        c.admissionsTest.officialUrl,
        c.interview,
        c.contextualOffer.availability,
        c.gcseRequirements,
        c.englishLanguageRequirements,
        c.internationalNotes,
        c.provenance.officialUrl,
        c.provenance.sourceUrl,
        c.provenance.sourceTitle,
        c.provenance.lastVerified,
        c.provenance.verificationStatus,
        c.notes,
        c.offers.length > 1 ? JSON.stringify(serialiseCourse(c).offers) : '',
      ]
        .map(escape)
        .join(','),
    );
  }
  return lines.join('\n');
}
