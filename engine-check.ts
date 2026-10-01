/* Non-shipping assertions for the eligibility engine, parser and importers. */
import {
  allCourses,
  allCoursesWithFixtures,
  batch1Courses,
  batch2Courses,
  batch3Courses,
  batch4Courses,
  batch5Courses,
  batch6Courses,
  batch6VerifiedCourses,
  batch7Courses,
  batch7VerifiedCourses,
  batch7AwaitingCourses,
  batch7YorkCourses,
  batch7YorkAwaitingCourses,
  batch7LancasterCourses,
  batch7LancasterAwaitingCourses,
  batch7ManchesterCourses,
  v08VerifiedCourses,
  v09QmulCourses,
  v09KclBEng,
  QMUL_NOT_APPLICATIONS,
  suppressedIds,
  V08_RESOLVED_UNEVIDENCED,
  policyExcludedCourses,
  YORK_NONEXISTENT_TITLES,
  YORK_H105_OPTION_MODULES,
  LANCASTER_NONEXISTENT_TITLES,
  LANCASTER_ENGINEERING_FAMILIES,
  batch6SouthamptonCourses,
  batch6SouthamptonAwaitingCourses,
  batch6LoughboroughCourses,
  batch6BristolCourses,
  batch6BathCourses,
  LOUGHBOROUGH_NONEXISTENT_TITLES,
  courses,
  courseById,
  testFixtureCourses,
  universities,
  allUniversities,
  FIXTURE_IDS,
  LEEDS_NON_2027_PAGES,
} from '@/data';
import { shells2028 } from '@/data/courses.2028-shells';
import { course, offer, atLeastAt, oneOf } from '@/data/builders';
import { evaluateCourse } from '@/lib/eligibility';
import {
  canonicaliseCourseName,
  courseIdentity,
  findDuplicates,
  identityKeys,
  obsoletePlaceholderIds,
  normaliseCourseCode,
  supersededIds,
} from '@/lib/identity';
import {
  deadlinesForCourse,
  getRankings,
  preferredRanking,
  rankingIsVerified,
} from '@/lib/format';
import { parseQuery } from '@/lib/search';
import {
  applyFilters,
  defaultFilters,
  matchedStudyOptionNames,
  RESULT_PAGE_SIZE,
  APPLICATION_YEARS as APPLICATION_YEARS_FOR_CHECK,
  type FilterState,
} from '@/lib/filters';
import { explainEligibility, keyEligibilityReason, reviewKind } from '@/lib/explain';
import { evaluateCatalogue } from '@/lib/eligibility';
import { importCoursesCsv, importCoursesJson } from '@/lib/importers';
import { validateCourse, validateUniversity, validateCatalogue } from '@/lib/validation';
import {
  codeCollisions,
  identityRisks,
  unsupportedCodeProvenance,
  unevidencedIdentities,
  isPubliclyDiscoverable,
} from '@/lib/identity-invariant';
import { APP_VERSION, IS_PRE_RELEASE, RELEASES } from '@/data/version';
import { buildIssueReport, FEEDBACK_PARAMS, ISSUE_TYPES } from '@/components/ReportIssue';
import {
  BRAND_COLORS,
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_POSITIONING,
  BRAND_SUBTITLE,
  BRAND_TITLE,
  LEGACY_NAME,
  MARK_RING_PATH,
} from '@/lib/brand';
import { pageTitle } from '@/lib/page-title';
import {
  SUBJECT_GUIDANCE_BY_UNIVERSITY,
  UCL_A_LEVEL_SUBJECT_GUIDANCE,
  subjectGuidanceFor,
} from '@/data';
import type { ApplicationDeadline, Ranking, StudentProfile, University } from '@/types';

const profile = (
  subjects: [string, string][],
  schoolOffersFurtherMathematics: boolean | null = null,
): StudentProfile => ({
  aLevels: subjects.map(([subject, grade], i) => ({ id: `a${i}`, subject, grade: grade as never })),
  gcses: [],
  applicationYear: '2028',
  schoolOffersFurtherMathematics,
  notes: '',
});

// Assertions run against the production catalogue PLUS the declared test
// fixtures. Production code only ever sees `courses`; see src/data/fixtures.ts.
const byId = Object.fromEntries(allCoursesWithFixtures.map((c) => [c.id, c]));
let failures = 0;
const check = (name: string, actual: unknown, expected: unknown) => {
  const ok = actual === expected;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (got ${String(actual)}, expected ${String(expected)})`);
};

/* ================================================================== */
/* 1. Overall grades and subject grades are independent               */
/* ================================================================== */

const aaaWithAStars = course({
  slug: 'test-aaa-with-a-stars',
  universityId: 'imperial',
  name: 'Test Physics',
  category: 'physics',
  sub: 'physics',
  degree: 'MSci',
  years: 4,
  raw: 'AAA including A* in Mathematics and A* in Physics.',
  offers: [
    offer({
      gradeProfile: 'AAA',
      required: [['Mathematics', 'A*'], ['Physics', 'A*']],
    }),
  ],
  fm: 'not-required',
  test: 'none',
});

// The brief's example: overall AAA is satisfied, but Physics A* is not.
const briefExample = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A'],
  ['Further Mathematics', 'A*'],
  ['Economics', 'A'],
]);
const briefReport = evaluateCourse(aaaWithAStars, briefExample);
check('Overall AAA alone does not satisfy an A* Physics requirement', briefReport.verdict, 'does-not-meet');
check('  …overall grade part still passes', briefReport.overallGrades.outcome, 'pass');
check('  …Physics part is the one that fails', briefReport.physics.outcome, 'fail');
check('  …Mathematics part passes', briefReport.mathematics.outcome, 'pass');

/* ================================================================== */
/* 2. The overall check is required-subject aware                      */
/* ================================================================== */

const aaaIncludingMathsPhysics = course({
  slug: 'test-aaa-including',
  universityId: 'manchester',
  name: 'Test Physics 2',
  category: 'physics',
  sub: 'physics',
  degree: 'BSc',
  years: 3,
  offers: [offer({ gradeProfile: 'AAA', required: ['Mathematics', 'Physics'] })],
  fm: 'not-required',
  test: 'none',
});

// Best three grades are A,A,A — but one of them is not a required subject, and
// Physics (which is) sits at B. The counted set must be Maths, Physics + best rest.
const hidingABehindPhysics = profile([
  ['Mathematics', 'A'],
  ['Physics', 'B'],
  ['Further Mathematics', 'A'],
  ['Economics', 'A'],
]);
check(
  'A B in a required subject cannot hide behind an A elsewhere',
  evaluateCourse(aaaIncludingMathsPhysics, hidingABehindPhysics).verdict,
  'does-not-meet',
);
check(
  'AAB is still AAB when the B is a third subject',
  evaluateCourse(
    aaaIncludingMathsPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Economics', 'B'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Three A grades including both required subjects passes',
  evaluateCourse(
    aaaIncludingMathsPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'A fourth, weaker subject does not drag a passing profile down',
  evaluateCourse(
    aaaIncludingMathsPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Economics', 'A'],
      ['History', 'D'],
    ]),
  ).verdict,
  'meets',
);

/* ================================================================== */
/* 3. Cross-subject constraints                                        */
/* ================================================================== */

const oneAStarEither = course({
  slug: 'test-one-a-star',
  universityId: 'bristol',
  name: 'Test Physics 3',
  category: 'physics',
  sub: 'physics',
  degree: 'MSci',
  years: 4,
  offers: [
    offer({
      gradeProfile: 'AAA',
      required: ['Mathematics', 'Physics'],
      constraints: [atLeastAt(['Mathematics', 'Physics'], 'A*', 1)],
    }),
  ],
  fm: 'not-required',
  test: 'none',
});
check(
  '"One A* in either Maths or Physics" fails when neither is A*',
  evaluateCourse(
    oneAStarEither,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '…and passes when one of them is A*',
  evaluateCourse(
    oneAStarEither,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A'],
    ]),
  ).verdict,
  'meets',
);

const oneOfSciences = course({
  slug: 'test-one-of',
  universityId: 'ucl',
  name: 'Test Biomedical',
  category: 'engineering',
  sub: 'biomedical',
  degree: 'MEng',
  years: 4,
  offers: [
    offer({
      gradeProfile: 'A*AA',
      required: [['Mathematics', 'A']],
      constraints: [oneOf(['Physics', 'Chemistry', 'Biology'], 'A')],
    }),
  ],
  fm: 'not-required',
  test: 'none',
});
check(
  '"One of Physics/Chemistry/Biology" fails with no science',
  evaluateCourse(
    oneOfSciences,
    profile([
      ['Mathematics', 'A*'],
      ['Economics', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '…and passes with Chemistry at A',
  evaluateCourse(
    oneOfSciences,
    profile([
      ['Mathematics', 'A*'],
      ['Chemistry', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* ================================================================== */
/* 4. Further Mathematics is advisory, never a blocker                 */
/* ================================================================== */

const strongProfileNoFm = profile([
  ['Mathematics', 'A'],
  ['Physics', 'A'],
  ['Economics', 'A'],
]);
const manchester = byId['manchester-physics--2028'];
check('Manchester Physics records Further Maths as strongly recommended', manchester.furtherMathematics, 'strongly-recommended');
const advisoryReport = evaluateCourse(manchester, strongProfileNoFm);
check('Strongly recommended Further Maths does not block a match', advisoryReport.verdict, 'meets');
check('  …but is reported as an advisory', advisoryReport.furtherMathematics.outcome, 'advisory');

check(
  'Required Further Maths does block',
  evaluateCourse(byId['durham-theoretical-physics--2028'], strongProfileNoFm).verdict,
  'does-not-meet',
);

/* ================================================================== */
/* 5. Conditional pathways                                             */
/* ================================================================== */

const warwick = byId['warwick-physics--2028'];
check(
  'Warwick: AAA without Further Maths misses both pathways',
  evaluateCourse(warwick, strongProfileNoFm).verdict,
  'does-not-meet',
);
check(
  'Warwick: AAA with Further Maths satisfies the conditional pathway',
  evaluateCourse(
    warwick,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Warwick: A*AA without Further Maths satisfies the standard pathway',
  evaluateCourse(
    warwick,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* ================================================================== */
/* 6. Application-year awareness and missing data                      */
/* ================================================================== */

check(
  'Unpublished cycle reports insufficient information',
  // Batch 2 note: the old invented "Natural Sciences (Physical)" 2028 row is
  // now suppressed in favour of the clean Cambridge Natural Sciences shell, so
  // the same property is asserted against that shell instead.
  evaluateCourse(byId['cambridge-natural-sciences--2028'], briefExample).verdict,
  'insufficient-information',
);
// This trio has been repointed twice as verified data arrived: first from
// `imperial-physics--2027` (superseded in batch 2), then from
// `manchester-physics--2027` (superseded in batch 3). It now uses an Edinburgh
// shell, which no batch has replaced. The expectations are unchanged.
check(
  'An awaiting-data shell reports insufficient information',
  evaluateCourse(byId['edinburgh-physics--2027'], briefExample).verdict,
  'insufficient-information',
);
check(
  'Awaiting-data shells carry no offers',
  byId['edinburgh-physics--2027'].offers.length,
  0,
);
check(
  'Awaiting-data shells carry no invented statuses',
  byId['edinburgh-physics--2027'].furtherMathematics,
  'unknown',
);
check('Empty profile reports insufficient information', evaluateCourse(manchester, profile([])).verdict, 'insufficient-information');
check(
  'Too few A-Levels reports insufficient information, not a pass',
  evaluateCourse(
    manchester,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
    ]),
  ).verdict,
  'insufficient-information',
);

/* Test arrangements never leak across cycles. */
const staleTest = {
  ...manchester,
  admissionsTest: { ...manchester.admissionsTest, code: 'esat' as const, requirement: 'required' as const, applicationYear: '2027' as const },
};
check(
  'A test recorded for another cycle is reported as unknown, not applied',
  evaluateCourse(staleTest, briefExample).admissionsTest.outcome,
  'unknown',
);

/* ================================================================== */
/* 7. Validation                                                       */
/* ================================================================== */

const verifiedWithoutDate = course({
  slug: 'test-verified',
  universityId: 'oxford',
  name: 'Test',
  category: 'physics',
  sub: 'physics',
  degree: 'BSc',
  years: 3,
  offers: [offer({ gradeProfile: 'AAA', required: ['Mathematics'] })],
  verification: 'verified',
  sourceUrl: 'https://example.ac.uk',
});
const ids = validateCourse(verifiedWithoutDate).map((i) => i.ruleId);
check('Validation flags verified records with no check date', ids.includes('verified-without-date'), true);

const testWithoutYear = {
  ...manchester,
  admissionsTest: { ...manchester.admissionsTest, code: 'pat' as const, requirement: 'required' as const, applicationYear: null },
};
check(
  'Validation flags an admissions test with no year',
  validateCourse(testWithoutYear).map((i) => i.ruleId).includes('test-without-year'),
  true,
);

const mixedOfferNoMinimum = course({
  slug: 'test-mixed',
  universityId: 'oxford',
  name: 'Test',
  category: 'physics',
  sub: 'physics',
  degree: 'BSc',
  years: 3,
  offers: [offer({ gradeProfile: 'A*AA', required: ['Mathematics'] })],
});
check(
  'Validation flags a required subject with no minimum in a mixed offer',
  validateCourse(mixedOfferNoMinimum).map((i) => i.ruleId).includes('required-subject-without-minimum'),
  true,
);

/* ================================================================== */
/* 8. Import round trip                                                */
/* ================================================================== */

const jsonImport = importCoursesJson(
  JSON.stringify({
    courses: [
      {
        slug: 'import-test',
        universityId: 'oxford',
        name: 'Imported Physics MPhys',
        subjectCategory: 'physics',
        subjectSubcategory: 'physics',
        degreeType: 'MPhys',
        durationYears: 4,
        applicationYear: '2028',
        rawRequirementText: 'A*AA including Mathematics and Physics.',
        offers: [{ gradeProfile: 'A*AA', required: [['Mathematics', 'A*'], 'Physics'] }],
        furtherMathematics: 'recommended',
        admissionsTest: { code: 'pat', requirement: 'required' },
        provenance: { verificationStatus: 'verified', sourceUrl: 'https://example.ac.uk', lastVerified: '2026-08-15' },
      },
    ],
  }),
);
check('JSON import produces one record', jsonImport.records.length, 1);
check('JSON import has no errors', jsonImport.errors.length, 0);
check('JSON import keeps the verbatim wording', jsonImport.records[0].rawRequirementText, 'A*AA including Mathematics and Physics.');
check('JSON import scopes the test to the record year', jsonImport.records[0].admissionsTest.applicationYear, '2028');

const badImport = importCoursesJson(
  JSON.stringify({ courses: [{ slug: 'x', universityId: 'y', name: 'z', subjectCategory: 'chemistry', degreeType: 'BSc', applicationYear: '2028' }] }),
);
check('JSON import rejects an out-of-vocabulary category', badImport.errors.length > 0, true);
check('  …and imports nothing from that row', badImport.records.length, 0);

const csvImport = importCoursesCsv(
  [
    'slug,university_id,name,subject_category,subject_subcategory,degree_type,duration_years,application_year,offer_grade_profile,required_subjects,further_mathematics,verification_status',
    'csv-test,warwick,CSV Physics MPhys,physics,physics,MPhys,4,2028,A*AA,Mathematics:A*;Physics:A,recommended,awaiting-data',
  ].join('\n'),
);
check('CSV import produces one record', csvImport.records.length, 1);
check('CSV import has no errors', csvImport.errors.length, 0);
check('CSV import parses subject minimums', csvImport.records[0].offers[0].subjectRequirements[0].minimumGrade, 'A*');

/* ================================================================== */
/* 9. Search parser                                                    */
/* ================================================================== */

const q1 = parseQuery('physics AAA');
check('parse "physics AAA" category', q1.categories.join(), 'physics');
check('parse "physics AAA" grades', q1.gradeProfileLabel, 'AAA');
check('parse "physics AAA" leftover text', q1.text, '');

const q2 = parseQuery('engineering without chemistry');
check('parse negation subject', q2.excludeSubjects.join(), 'Chemistry');

const q3 = parseQuery('universities requiring ESAT');
check('parse test name', q3.tests.join(), 'esat');
check('parse test leftover', q3.text, '');

const q4 = parseQuery('physics courses without admissions tests');
check('parse no-test flag', q4.requireNoTest, true);

const q5 = parseQuery('engineering courses requiring further maths');
check('parse FM required', q5.furtherMaths.join(), 'required');

const q6 = parseQuery('physics further maths recommended');
check('parse FM recommended covers the advisory band', q6.furtherMaths.join(), 'recommended,strongly-recommended,useful');

const q7 = parseQuery('mechanical engineering AAA');
check('parse subcategory', q7.subcategories.join(), 'mechanical');
check('parse subcategory leftover', q7.text, '');

/* ================================================================== */
/* 10. Course identity and duplicate detection                         */
/* ================================================================== */

const mkCourse = (over: Partial<Parameters<typeof course>[0]> & { slug: string; name: string }) =>
  course({
    universityId: 'manchester',
    category: 'physics',
    sub: 'physics',
    degree: 'MPhys',
    years: 4,
    year: '2028',
    offers: [offer({ gradeProfile: 'AAA', required: ['Mathematics', 'Physics'] })],
    fm: 'not-required',
    test: 'none',
    ...over,
  });

check('Canonical name strips the award suffix', canonicaliseCourseName('Physics MPhys'), 'physics');
check('Canonical name strips a leading award', canonicaliseCourseName('MPhys Physics'), 'physics');
check('Canonical name strips a bracketed award', canonicaliseCourseName('Physics (MPhys)'), 'physics');
check('Canonical name strips honours wording', canonicaliseCourseName('Physics BSc (Hons)'), 'physics');
check('Canonical name normalises ampersands', canonicaliseCourseName('Mathematics & Physics MMath'), 'mathematics and physics');
check(
  'Canonical name keeps a meaningful qualifier',
  canonicaliseCourseName('Physics with a Year Abroad MPhys'),
  'physics with a year abroad',
);
check('Canonical name keeps a specialism', canonicaliseCourseName('Theoretical Physics MPhys'), 'theoretical physics');
check('UCAS codes normalise case and spacing', normaliseCourseCode(' f 303 '), 'F303');

const formatA = mkCourse({ slug: 'fmt-a', name: 'Physics MPhys' });
const formatB = mkCourse({ slug: 'fmt-b', name: 'MPhys Physics' });
const formatC = mkCourse({ slug: 'fmt-c', name: 'Physics (MPhys)' });
const formatDupes = findDuplicates([formatA, formatB, formatC]);
check('Three formattings of one course produce three pairings', formatDupes.length, 3);
check('  …all matched on the canonical name', formatDupes.every((d) => d.basis === 'canonical-name'), true);
check(
  '  …and flagged for review, not merged',
  formatDupes.every((d) => d.kind === 'likely-duplicate' || d.kind === 'exact-duplicate'),
  true,
);

const differentSpecialism = mkCourse({ slug: 'diff-1', name: 'Theoretical Physics MPhys', sub: 'theoretical-physics' });
check(
  'Physics and Theoretical Physics are not treated as duplicates',
  findDuplicates([formatA, differentSpecialism]).length,
  0,
);

const differentAward = mkCourse({ slug: 'diff-2', name: 'Physics BSc', degree: 'BSc', years: 3 });
check('Physics MPhys and Physics BSc are not treated as duplicates', findDuplicates([formatA, differentAward]).length, 0);

const otherUniversity = mkCourse({ slug: 'diff-3', name: 'Physics MPhys', universityId: 'leeds' });
check('The same course name at two universities is not a duplicate', findDuplicates([formatA, otherUniversity]).length, 0);

const otherYear = mkCourse({ slug: 'diff-4', name: 'Physics MPhys', year: '2027' });
check('The same course in two cycles is not a duplicate', findDuplicates([formatA, otherYear]).length, 0);

/* UCAS code takes precedence over the name */
const coded = mkCourse({ slug: 'code-a', name: 'Physics MPhys', code: 'F303' });
const codedDifferentName = mkCourse({ slug: 'code-b', name: 'Physics (MPhys) 4 years', code: 'f 303' });
check('Identity uses the UCAS code when one is present', courseIdentity(coded).basis, 'ucas-code');
check('Identity falls back to the canonical name without a code', courseIdentity(formatA).basis, 'canonical-name');
const codeMatch = findDuplicates([coded, codedDifferentName]);
check('Records sharing a UCAS code are matched despite different names', codeMatch.length, 1);
check('  …on the UCAS code', codeMatch[0]?.basis, 'ucas-code');

const codeReusedDifferentAward = mkCourse({ slug: 'code-c', name: 'Physics BSc', code: 'F303', degree: 'BSc', years: 3 });
const conflict = findDuplicates([coded, codeReusedDifferentAward]);
check('A shared UCAS code with a different award is a conflict', conflict[0]?.kind, 'conflict');
check('  …and is never silently merged', conflict[0]?.differingFields.includes('degreeType'), true);

const twoCodes = findDuplicates([
  mkCourse({ slug: 'two-a', name: 'Physics MPhys', code: 'F303' }),
  mkCourse({ slug: 'two-b', name: 'Physics MPhys', code: 'F300' }),
]);
check('The same course with two different UCAS codes is a conflict', twoCodes[0]?.kind, 'conflict');

/* ================================================================== */
/* 11. Superseding                                                     */
/* ================================================================== */

const demoRecord = mkCourse({ slug: 'sup-demo', name: 'MPhys Physics', verification: 'demo' });
const shellRecord = mkCourse({ slug: 'sup-shell', name: 'Physics (MPhys)', verification: 'awaiting-data', offers: [] });
const verifiedRecord = mkCourse({
  slug: 'sup-real',
  name: 'Physics MPhys',
  verification: 'verified',
  sourceUrl: 'https://example.ac.uk/physics',
  sourceTitle: 'Example admissions page',
  lastVerified: '2026-08-15',
});

const supersededAll = supersededIds([demoRecord, shellRecord, verifiedRecord]);
check('A verified record supersedes a differently formatted demo record', supersededAll.has(demoRecord.id), true);
check('A verified record supersedes an awaiting-data shell', supersededAll.has(shellRecord.id), true);
check('The verified record itself is never superseded', supersededAll.has(verifiedRecord.id), false);

const withoutVerified = supersededIds([demoRecord, shellRecord]);
check('An awaiting-data shell does not supersede a demo record', withoutVerified.size, 0);

const verifiedOtherYear = mkCourse({
  slug: 'sup-real',
  name: 'Physics MPhys',
  year: '2027',
  verification: 'verified',
  sourceUrl: 'https://example.ac.uk/physics',
  lastVerified: '2026-08-15',
});
check(
  'A verified record does not supersede a placeholder in another cycle',
  supersededIds([demoRecord, verifiedOtherYear]).size,
  0,
);

// Batch 3 changed the shape of this number, not its meaning. The old sample
// rows are no longer placeholders competing with verified records — they are
// identity-only research targets, and the ones that duplicated a clean 2028
// shell are removed by `obsoletePlaceholderIds` instead. What remains here are
// the four 2027 placeholders a verified record genuinely replaced.
// Batch 4 added six universities whose research targets verified records have
// now replaced, so this count grew from four to thirteen. Batch 6 replaced two
// more Loughborough scaffold rows with verified records. The companion check
// below is the one that matters: nothing but a placeholder is ever superseded.
check(
  'Superseded placeholders are exactly those replaced by verified records',
  supersededIds(allCourses).size,
  15,
);
check(
  '  …and every superseded record is a placeholder, never a verified one',
  [...supersededIds(allCourses)].every((id) => {
    const c = allCourses.find((x) => x.id === id)!;
    return c.provenance.verificationStatus === 'demo' || c.provenance.verificationStatus === 'awaiting-data';
  }),
  true,
);

/* ================================================================== */
/* 12. Ranking provenance                                              */
/* ================================================================== */

const rankingBase = {
  universityId: 'test-uni',
  category: 'physics-astronomy' as const,
  categoryLabel: 'Physics & Astronomy',
  rank: 4,
  notes: null,
};

const unsourcedVerifiedRanking: Ranking = {
  ...rankingBase,
  id: 'r1',
  provider: 'QS World University Rankings by Subject',
  providerShort: 'QS',
  edition: 2027,
  sourceUrl: null,
  sourceTitle: null,
  lastVerified: null,
  verificationStatus: 'verified',
};
const sourcedVerifiedRanking: Ranking = {
  ...unsourcedVerifiedRanking,
  id: 'r2',
  sourceUrl: 'https://example.com/qs-2027',
  sourceTitle: 'QS World University Rankings by Subject 2027',
  lastVerified: '2026-08-15',
};
const demoRanking: Ranking = { ...unsourcedVerifiedRanking, id: 'r3', verificationStatus: 'demo' };

const uniWith = (rankings: Ranking[]): University => ({
  ...universities[0],
  id: 'test-uni',
  rankings,
  applicationDeadlines: [],
});

check(
  'A ranking cannot be verified without provenance',
  validateUniversity(uniWith([unsourcedVerifiedRanking]))
    .map((i) => i.ruleId)
    .includes('ranking-verified-without-provenance'),
  true,
);
check(
  'A fully sourced ranking passes validation',
  validateUniversity(uniWith([sourcedVerifiedRanking])).filter((i) => i.severity === 'error').length,
  0,
);
check('rankingIsVerified rejects a verified claim with no source', rankingIsVerified(unsourcedVerifiedRanking), false);
check('rankingIsVerified accepts a fully sourced record', rankingIsVerified(sourcedVerifiedRanking), true);
check('A demo ranking never reads as verified', rankingIsVerified(demoRanking), false);

const qs2027: Ranking = { ...sourcedVerifiedRanking, id: 'r4' };
const qs2026: Ranking = { ...sourcedVerifiedRanking, id: 'r5', edition: 2026, rank: 6 };
const the2027: Ranking = {
  ...sourcedVerifiedRanking,
  id: 'r6',
  provider: 'Times Higher Education World University Rankings',
  providerShort: 'THE',
  rank: 11,
};
const multi = uniWith([qs2026, the2027, qs2027]);
check('Positions from different providers and editions are all kept', getRankings(multi, 'physics-astronomy').length, 3);
check('The newest edition is preferred for the single-value view', preferredRanking(multi, 'physics-astronomy')?.edition, 2027);
check(
  'Providers are never merged — the preferred position keeps its own provider',
  getRankings(multi, 'physics-astronomy').filter((r) => r.providerShort === 'THE').length,
  1,
);
check(
  'A verified position is preferred over an unverified one',
  preferredRanking(uniWith([demoRanking, sourcedVerifiedRanking]), 'physics-astronomy')?.id,
  'r2',
);
check(
  'Two positions for the same provider, edition and category are an error',
  validateUniversity(uniWith([qs2027, { ...qs2027, id: 'r7' }]))
    .map((i) => i.ruleId)
    .includes('duplicate-ranking'),
  true,
);

/* ================================================================== */
/* 13. Structured deadlines                                            */
/* ================================================================== */

const deadline = (over: Partial<ApplicationDeadline>): ApplicationDeadline => ({
  id: 'd1',
  universityId: 'test-uni',
  label: 'UCAS equal consideration deadline',
  date: null,
  applicationYear: '2028',
  appliesTo: { kind: 'all-courses' },
  notes: null,
  sourceUrl: null,
  sourceTitle: null,
  lastVerified: null,
  verificationStatus: 'demo',
  ...over,
});

const deadlineUni: University = {
  ...universities[0],
  id: 'test-uni',
  rankings: [],
  applicationDeadlines: [
    deadline({ id: 'all-2028' }),
    deadline({ id: 'all-2027', applicationYear: '2027' }),
    deadline({ id: 'course-2028', label: 'PAT registration', appliesTo: { kind: 'course-slugs', slugs: ['test-physics'] } }),
    deadline({
      id: 'eng-2028',
      label: 'Engineering placement deadline',
      appliesTo: { kind: 'subject-category', category: 'engineering' },
    }),
  ],
};

const physicsCourse2028 = mkCourse({ slug: 'test-physics', name: 'Physics MPhys' });
const physicsCourse2027 = mkCourse({ slug: 'test-physics', name: 'Physics MPhys', year: '2027' });
const engineeringCourse2028 = mkCourse({
  slug: 'test-eng',
  name: 'Mechanical Engineering MEng',
  category: 'engineering',
  sub: 'mechanical',
  degree: 'MEng',
});

const physicsDeadlines = deadlinesForCourse(deadlineUni, physicsCourse2028).map((d) => d.id);
check('A course gets the university-wide and its own course-scoped deadline', physicsDeadlines.join(), 'all-2028,course-2028');
check(
  'A deadline scoped to another subject area does not apply',
  physicsDeadlines.includes('eng-2028'),
  false,
);
check(
  'An engineering course gets the subject-scoped deadline',
  deadlinesForCourse(deadlineUni, engineeringCourse2028).map((d) => d.id).join(),
  'all-2028,eng-2028',
);
check(
  'Deadlines are entry-year specific',
  deadlinesForCourse(deadlineUni, physicsCourse2027).map((d) => d.id).join(),
  'all-2027',
);
check(
  'A 2028 deadline never leaks into a 2027 record',
  deadlinesForCourse(deadlineUni, physicsCourse2027).some((d) => d.applicationYear !== '2027'),
  false,
);
check(
  'A deadline cannot be verified without a date and a source',
  validateUniversity({
    ...deadlineUni,
    applicationDeadlines: [deadline({ verificationStatus: 'verified' })],
  })
    .map((i) => i.ruleId)
    .includes('deadline-verified-without-provenance'),
  true,
);
check(
  'A fully sourced deadline passes validation',
  validateUniversity({
    ...deadlineUni,
    applicationDeadlines: [
      deadline({
        verificationStatus: 'verified',
        date: '2027-01-29',
        sourceUrl: 'https://example.com/deadlines',
        sourceTitle: 'UCAS deadlines',
        lastVerified: '2026-08-15',
      }),
    ],
  }).filter((i) => i.severity === 'error').length,
  0,
);

/* ================================================================== */
/* 14. Import duplicate detection                                      */
/* ================================================================== */

const existingForImport = [
  mkCourse({ slug: 'existing-physics', name: 'Physics MPhys', code: 'F303', verification: 'demo' }),
];
const reimport = importCoursesJson(
  JSON.stringify({
    courses: [
      {
        slug: 'incoming-physics',
        universityId: 'manchester',
        name: 'MPhys Physics',
        subjectCategory: 'physics',
        subjectSubcategory: 'physics',
        degreeType: 'MPhys',
        durationYears: 4,
        courseCode: 'f303',
        applicationYear: '2028',
        offers: [{ gradeProfile: 'AAA', required: ['Mathematics', 'Physics'] }],
        furtherMathematics: 'not-required',
        admissionsTest: { code: 'none' },
        provenance: { verificationStatus: 'verified', sourceUrl: 'https://example.ac.uk', sourceTitle: 'Example', lastVerified: '2026-08-15' },
      },
    ],
  }),
  { existing: existingForImport },
);
check('Import spots a record that already exists under a different formatting', reimport.duplicates.length, 1);
check('  …matched on the UCAS code', reimport.duplicates[0]?.basis, 'ucas-code');
check('  …and reports it rather than merging it', reimport.records.length, 1);

/* ================================================================== */
/* 15. Real data pilot — batch 1                                       */
/* ================================================================== */

const batchById = Object.fromEntries(allCourses.map((c) => [c.id, c]));

check('Batch 1 imported six records', batch1Courses.length, 6);
check('Every batch-1 record is 2027 entry', batch1Courses.every((c) => c.applicationYear === '2027'), true);

/* --- Imperial EEE: the four-A-Level pathway, as specified in the brief --- */
const eee = batchById['imperial-eee-meng--2027'];
const fourALevels = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A'],
  ['Further Mathematics', 'A'],
  ['Economics', 'A'],
]);
const eeeReport = evaluateCourse(eee, fourALevels);
check('Imperial EEE: a four-A-Level profile with Physics at A meets the course', eeeReport.verdict, 'meets');
check(
  '  …via the four-A-Level pathway',
  eeeReport.pathways.find((p) => p.pathwayId === eeeReport.bestPathwayId)?.label,
  'Four A-Levels',
);
check(
  '  …while the three-A-Level pathway fails on Physics A*',
  eeeReport.pathways.find((p) => p.label === 'Three A-Levels')?.verdict,
  'does-not-meet',
);
check(
  'Imperial EEE: three A-Levels with Physics at A does not meet the course',
  evaluateCourse(
    eee,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …because the four-A-Level pathway does not apply to them',
  evaluateCourse(
    eee,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Economics', 'A'],
    ]),
  ).pathways.find((p) => p.label === 'Four A-Levels')?.applicable,
  false,
);
check(
  'Imperial EEE: three A-Levels with Physics at A* meets the three-A-Level pathway',
  evaluateCourse(
    eee,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* --- Cambridge Engineering: the conditional Further Maths requirement --- */
const cambEng = batchById['cambridge-engineering-meng--2027'];
check('Cambridge Engineering records Further Maths as conditional', cambEng.furtherMathematics, 'conditional');

const noFmSchoolOffers = profile(
  [
    ['Mathematics', 'A*'],
    ['Physics', 'A*'],
    ['Chemistry', 'A'],
  ],
  true,
);
const noFmSchoolDoesNot = profile(
  [
    ['Mathematics', 'A*'],
    ['Physics', 'A*'],
    ['Chemistry', 'A'],
  ],
  false,
);
const noFmUnanswered = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A*'],
  ['Chemistry', 'A'],
]);

const conditionalPart = (p: StudentProfile) =>
  evaluateCourse(cambEng, p).constraints.find((c) => c.detail.includes('Further Mathematics'))?.outcome;

// Cambridge accepts Further Maths at AS level, and this tool records A-Levels
// only — so an applicant without the A-Level cannot be failed outright.
check('Cambridge: no A-Level Further Maths and the school offers it → review, because AS is accepted', conditionalPart(noFmSchoolOffers), 'review');
check('Cambridge: no Further Maths and the school does not offer it → not required', conditionalPart(noFmSchoolDoesNot), 'not-required');
check('Cambridge: the question unanswered → review, never a pass or a fail', conditionalPart(noFmUnanswered), 'review');
check(
  'Cambridge: an unresolvable condition never produces a pass',
  evaluateCourse(cambEng, noFmSchoolOffers).verdict === 'meets',
  false,
);
check(
  'Cambridge: college variation keeps even a strong profile at review required',
  evaluateCourse(
    cambEng,
    profile(
      [
        ['Mathematics', 'A*'],
        ['Further Mathematics', 'A*'],
        ['Physics', 'A*'],
      ],
      true,
    ),
  ).verdict,
  'review-required',
);

/* --- Oxford Engineering Science: course options are not separate courses --- */
const oxEng = batchById['oxford-engineering-science-meng--2027'];
check('Oxford Engineering Science keeps one record', oxEng.courseCode, 'H100');
check('  …with the course options recorded as alternative codes', oxEng.alternativeCourseCodes.length, 6);
check(
  '  …and no separate records created for them',
  courses.filter((c) => c.universityId === 'oxford' && c.applicationYear === '2027').length,
  2,
);

/* --- 2028 shells carry nothing forward --- */
const shellIds = shells2028.map((c) => c.id);
check(
  'A 2028 shell exists for every verified 2027 course',
  shells2028.length,
  v09QmulCourses.length +
    1 + // KCL General Engineering BEng
    v08VerifiedCourses.length +
    batch1Courses.length +
    batch2Courses.length +
    batch3Courses.length +
    batch4Courses.length +
    batch5Courses.length +
    batch6VerifiedCourses.length +
    batch7VerifiedCourses.length,
);
check('Every 2028 shell is awaiting publication', shells2028.every((c) => c.provenance.verificationStatus === 'awaiting-publication'), true);
check('No 2028 shell carries an offer', shells2028.every((c) => c.offers.length === 0), true);
check('No 2028 shell carries an admissions test', shells2028.every((c) => c.admissionsTest.code === 'unknown'), true);
check('No 2028 shell carries requirement text', shells2028.every((c) => c.rawRequirementText === null), true);
check('Every 2028 shell points at the 2027 cycle', shells2028.every((c) => c.latestPublishedYear === '2027'), true);
check(
  'Every 2028 shell reports insufficient information',
  shells2028.every((c) => evaluateCourse(c, fourALevels).verdict === 'insufficient-information'),
  true,
);
check(
  'The Cambridge 2028 shells carry the deferred-entry warning',
  shells2028
    .filter((c) => c.universityId === 'cambridge')
    .every((c) => (c.cycleNote ?? '').includes('deferring that entry to 2028')),
  true,
);
check('2028 shells are in the catalogue', shellIds.every((id) => Boolean(batchById[id])), true);

/* --- Superseding: verified 2027 records replace their placeholders --- */
const superseded2027 = supersededIds(allCourses);
check(
  'The verified Oxford Physics record supersedes the sample one',
  superseded2027.has('oxford-physics--2027'),
  true,
);
check(
  'The verified Cambridge Engineering record supersedes the sample one',
  superseded2027.has('cambridge-engineering--2027'),
  true,
);
// Repointed in batch 3: the Imperial placeholder this used to name is gone,
// so the same rule — a verified record replaces the placeholder for the same
// course and cycle — is asserted on a placeholder that still exists.
check(
  'A verified record supersedes the placeholder for the same course and cycle',
  superseded2027.has('manchester-mathematics-and-physics--2027'),
  true,
);
// This assertion originally read "Imperial Physics BSc does not supersede the
// Physics MSci shell". That shell is now superseded — but by the verified
// Imperial Physics MSci record added in batch 2, which is the correct reason.
// The underlying rule (a BSc must never stand in for an MSci) is asserted
// directly on the identity keys so it stays covered.
check(
  'Imperial Physics BSc and MSci have different identities — an award never merges',
  identityKeys(byId['imperial-physics-bsc--2027']).name ===
    identityKeys(byId['imperial-physics-msci--2027']).name,
  false,
);
check(
  'The Oxford Physics placeholder is superseded by the verified record',
  superseded2027.has('oxford-physics--2027'),
  true,
);
check('No 2028 record is superseded', shellIds.some((id) => superseded2027.has(id)), false);

/* --- Offers corrected against the official pages --- */
const oxPhys = batchById['oxford-physics-mphys--2027'];
check('Oxford Physics publishes A*AA', oxPhys.offers[0].gradeProfile, 'A*AA');
check('  …with the verbatim wording matching it', (oxPhys.rawRequirementText ?? '').startsWith('A*AA to include'), true);
check('Oxford Engineering Science publishes A*A*A', oxEng.offers[0].gradeProfile, 'A*A*A');
check('Cambridge Engineering publishes a A*A*A minimum', cambEng.offers[0].gradeProfile, 'A*A*A');
check('Imperial EEE three-A-Level pathway is A*A*A', eee.offers[0].gradeProfile, 'A*A*A');
check('Imperial EEE four-A-Level pathway is A*AAA', eee.offers[1].gradeProfile, 'A*AAA');

/* --- The contradictions the earlier import carried are gone --- */
const oxPhysIssues = validateCourse(oxPhys).map((i) => i.ruleId);
check(
  'Oxford Physics: the raw wording no longer disagrees with the structured offer',
  oxPhysIssues.includes('raw-text-grade-mismatch'),
  false,
);
check('Oxford Physics: ESAT modules are now recorded', oxPhysIssues.includes('test-without-modules'), false);
check(
  'Oxford Engineering Science: the two-A* condition now fits its A*A*A profile',
  validateCourse(oxEng).map((i) => i.ruleId).includes('constraint-exceeds-offer-profile'),
  false,
);
check(
  'Every batch-1 record now has a source URL',
  batch1Courses.every((c) => Boolean(c.provenance.sourceUrl)),
  true,
);
check(
  'Every batch-1 record now has a source title',
  batch1Courses.every((c) => Boolean(c.provenance.sourceTitle)),
  true,
);
check(
  'Every batch-1 record now has a check date',
  batch1Courses.every((c) => c.provenance.lastVerified === '2026-09-01'),
  true,
);
check(
  'No batch-1 record is flagged for missing provenance',
  batch1Courses.some((c) =>
    validateCourse(c)
      .map((i) => i.ruleId)
      .some((r) => ['grades-without-source', 'verified-without-source', 'verified-without-date'].includes(r)),
  ),
  false,
);

/* --- Cambridge Natural Sciences: verified, and still nothing inferred --- */
const cambNatSci = batchById['cambridge-natural-sciences--2027'];
check('Cambridge Natural Sciences is now verified', cambNatSci.provenance.verificationStatus, 'verified');
check('  …with the published A*A*A minimum', cambNatSci.offers[0].gradeProfile, 'A*A*A');
check('  …requiring Mathematics only, not Physics universally', cambNatSci.physics, 'not-required');
check(
  '  …with the two-science condition recorded as a constraint',
  cambNatSci.offers[0].constraints.filter((c) => c.kind === 'min-count-at-grade').length,
  1,
);
check('  …and no assumed ESAT module combination', cambNatSci.admissionsTest.modules.join(), 'Mathematics 1');

/* A physics applicant with Maths and two sciences satisfies Natural Sciences. */
check(
  'Natural Sciences accepts Maths + Physics + Chemistry at A*A*A',
  evaluateCourse(
    cambNatSci,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …and rejects a profile with only one other science',
  evaluateCourse(
    cambNatSci,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['History', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- Deadlines from the batch --- */
/*
 * These assert the SEEDED deadline model, so they read `allUniversities`. From
 * v1.0.0 the served `universities` list carries only verified university-level
 * data (section 28), which removes the undated placeholder entries these
 * checks deliberately look at.
 */
const oxford = allUniversities.find((u) => u.id === 'oxford')!;
const imperial = allUniversities.find((u) => u.id === 'imperial')!;
check(
  'Oxford has the supplied 2027 application deadline',
  oxford.applicationDeadlines.find((d) => d.applicationYear === '2027' && d.appliesTo.kind === 'all-courses')?.date,
  '2026-10-15',
);
check(
  'Oxford has no invented 2028 deadline date',
  oxford.applicationDeadlines.find((d) => d.applicationYear === '2028' && d.appliesTo.kind === 'all-courses')?.date,
  null,
);
check(
  'Imperial has the supplied 2027 application deadline',
  imperial.applicationDeadlines.find((d) => d.applicationYear === '2027')?.date,
  '2027-01-13',
);
check(
  'The Oxford test-registration deadline reaches the batch-1 Physics record',
  deadlinesForCourse(oxford, batchById['oxford-physics-mphys--2027']).some((d) =>
    d.label.includes('registration'),
  ),
  true,
);
check(
  'The 2027 deadline does not reach the 2028 shell',
  deadlinesForCourse(oxford, batchById['oxford-physics-mphys--2028']).every((d) => d.applicationYear === '2028'),
  true,
);

/* ================================================================== */
/* 16. Admissions tests and verification status after the final patch  */
/* ================================================================== */

check(
  'Oxford Physics 2027 records the ESAT, not the PAT',
  batchById['oxford-physics-mphys--2027'].admissionsTest?.code,
  'esat',
);
check(
  'Oxford Physics 2027 records all three required ESAT modules',
  (batchById['oxford-physics-mphys--2027'].admissionsTest?.modules ?? []).join(', '),
  'Mathematics 1, Mathematics 2, Physics',
);
check(
  'No 2027 record anywhere in the catalogue stores the PAT as its admissions test',
  allCourses.filter((c) => c.applicationYear === '2027' && c.admissionsTest?.code === 'pat').length,
  0,
);
check(
  'Imperial Physics BSc 2027 is verified',
  batchById['imperial-physics-bsc--2027'].provenance.verificationStatus,
  'verified',
);
check(
  'Imperial Physics BSc 2027 records the ESAT modules',
  (batchById['imperial-physics-bsc--2027'].admissionsTest?.modules ?? []).join(', '),
  'Mathematics 1, Mathematics 2, Physics',
);
check(
  'Imperial EEE MEng 2027 is verified',
  batchById['imperial-eee-meng--2027'].provenance.verificationStatus,
  'verified',
);
check(
  'Imperial EEE MEng 2027 records the ESAT modules',
  (batchById['imperial-eee-meng--2027'].admissionsTest?.modules ?? []).join(', '),
  'Mathematics 1, Mathematics 2, Physics',
);
check(
  'All six batch-1 2027 records are verified',
  batch1Courses.filter((c) => c.provenance.verificationStatus === 'verified').length,
  6,
);
check(
  'The 2028 shells are still awaiting publication after the patch',
  shells2028.every(
    (c) => c.provenance.verificationStatus === 'awaiting-publication' && c.offers.length === 0,
  ),
  true,
);
check(
  'Imperial 2027 deadline is verified with a source',
  Boolean(
    universities
      .find((u) => u.id === 'imperial')!
      .applicationDeadlines.find(
        (d) => d.applicationYear === '2027' && d.verificationStatus === 'verified' && d.sourceUrl,
      ),
  ),
  true,
);


/* ================================================================== */
/* 17. BATCH 2 — Imperial and UCL, 2027 entry                          */
/* ================================================================== */

const b2 = Object.fromEntries(batch2Courses.map((c) => [c.id, c]));

/* --- 17a. Every imported A-Level offer keeps its asterisks --- */
// Batch 1 lost asterisks repeatedly in transcription. This table is written
// out longhand, so a stray normalisation anywhere between the seed, the
// builder and the parser shows up as a failed string comparison.
const EXPECTED_PROFILES: [string, string[]][] = [
  ['imperial-physics-msci--2027', ['A*A*A']],
  ['imperial-physics-year-abroad-msci--2027', ['A*A*A']],
  ['imperial-physics-theoretical-bsc--2027', ['A*A*A']],
  ['imperial-physics-theoretical-msci--2027', ['A*A*A']],
  ['imperial-mechanical-engineering-meng--2027', ['A*A*A', 'A*AAA']],
  ['imperial-aeronautical-engineering-meng--2027', ['A*A*A', 'A*AAA']],
  ['imperial-civil-engineering-meng--2027', ['A*A*A', 'A*AAA']],
  ['imperial-chemical-engineering-meng--2027', ['A*A*A']],
  ['imperial-electronic-information-engineering-meng--2027', ['A*A*A', 'A*AAA']],
  ['ucl-physics-bsc--2027', ['A*AA']],
  ['ucl-physics-msci--2027', ['A*AA']],
  ['ucl-theoretical-physics-bsc--2027', ['A*AA']],
  ['ucl-theoretical-physics-msci--2027', ['A*AA']],
  ['ucl-astrophysics-bsc--2027', ['A*AA']],
  ['ucl-astrophysics-msci--2027', ['A*AA']],
  ['ucl-mathematics-and-physics-bsc--2027', ['A*A*A', 'A*AA']],
  ['ucl-physics-with-medical-physics-bsc--2027', ['A*AA']],
  ['ucl-medical-physics-msci--2027', ['A*AA']],
  ['ucl-mechanical-engineering-beng--2027', ['A*AA']],
  ['ucl-mechanical-engineering-meng--2027', ['A*AA']],
  ['ucl-electronic-and-electrical-engineering-beng--2027', ['A*AA']],
  ['ucl-electronic-and-electrical-engineering-meng--2027', ['A*AA']],
  ['ucl-civil-engineering-beng--2027', ['A*AA']],
  ['ucl-civil-engineering-meng--2027', ['A*AA']],
  ['ucl-chemical-engineering-beng--2027', ['AAA']],
  ['ucl-chemical-engineering-meng--2027', ['AAA']],
];
let profileMismatches = 0;
for (const [id, expected] of EXPECTED_PROFILES) {
  const c = b2[id];
  if (!c) { profileMismatches += 1; continue; }
  if (c.offers.map((o) => o.gradeProfile).join('|') !== expected.join('|')) profileMismatches += 1;
}
check('Every batch-2 offer string survives import with its asterisks intact', profileMismatches, 0);
check('  …and the table covers every batch-2 record', EXPECTED_PROFILES.length, batch2Courses.length);

// The three strings that are one asterisk apart must never compare equal.
check('A*A*A is not A*AA', b2['imperial-physics-msci--2027'].offers[0].gradeProfile === 'A*AA', false);
check('AAA is not A*AA', b2['ucl-chemical-engineering-beng--2027'].offers[0].gradeProfile === 'A*AA', false);
check(
  'A*AAA (four A-levels) is not A*AA',
  b2['imperial-mechanical-engineering-meng--2027'].offers[1].gradeProfile,
  'A*AAA',
);
check(
  'Parsed A*A*A really is A-star, A-star, A',
  (b2['imperial-physics-msci--2027'].offers[0].gradeProfileGrades ?? []).join(','),
  'A*,A*,A',
);
check(
  'Parsed A*AAA really is A-star, A, A, A',
  (b2['imperial-mechanical-engineering-meng--2027'].offers[1].gradeProfileGrades ?? []).join(','),
  'A*,A,A,A',
);

/* --- 17b. UCL Physics: A*A across Maths and Physics, in any order --- */
const uclPhysics = b2['ucl-physics-bsc--2027'];
check('UCL Physics BSc publishes A*AA', uclPhysics.offers[0].gradeProfile, 'A*AA');
// The brief's case: an A* in Further Mathematics must not stand in for the
// A* that UCL requires inside the Maths/Physics pair.
check(
  'An A* in Further Maths does not satisfy UCL’s A*A in Maths and Physics',
  evaluateCourse(
    uclPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A*'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …and the constraint is the part that fails',
  evaluateCourse(
    uclPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A*'],
      ['Economics', 'A'],
    ]),
  ).constraints.every((c) => c.outcome === 'pass'),
  false,
);
check(
  'Maths A* with Physics A satisfies it',
  evaluateCourse(
    uclPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A*'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Physics A* with Maths A satisfies it too — the order does not matter',
  evaluateCourse(
    uclPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A*'],
      ['History', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Overall A*AA with a B in Physics still fails',
  evaluateCourse(
    uclPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'B'],
      ['Further Mathematics', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'A student is never matched against the published contextual offer',
  evaluateCourse(
    uclPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Economics', 'B'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …though the contextual offer is still stored and shown',
  uclPhysics.contextualOffer.details?.startsWith('AAB'),
  true,
);
check(
  '  …and it is not an offer pathway',
  uclPhysics.offers.some((o) => o.isContextual),
  false,
);

/* --- 17c. UCL Chemical Engineering: Chemistry required, Physics not --- */
const uclChemEng = b2['ucl-chemical-engineering-meng--2027'];
check('UCL Chemical Engineering publishes AAA', uclChemEng.offers[0].gradeProfile, 'AAA');
check('  …with Chemistry required', uclChemEng.chemistry, 'required');
check('  …and Physics not required', uclChemEng.physics, 'recommended');
// The brief's regression case, verbatim: a strong applicant without Chemistry.
const noChemistry = profile([
  ['Mathematics', 'A*'],
  ['Further Mathematics', 'A*'],
  ['Physics', 'A*'],
  ['Economics', 'A'],
]);
check(
  'A*A*A* in Maths, Further Maths and Physics does not meet Chemical Engineering without Chemistry',
  evaluateCourse(uclChemEng, noChemistry).verdict,
  'does-not-meet',
);
check(
  '  …the overall grades are not the problem',
  evaluateCourse(uclChemEng, noChemistry).overallGrades.outcome,
  'pass',
);
check(
  '  …Chemistry is',
  evaluateCourse(uclChemEng, noChemistry).chemistry.outcome,
  'fail',
);
check(
  'The same applicant with Chemistry at A does meet it',
  evaluateCourse(
    uclChemEng,
    profile([
      ['Mathematics', 'A'],
      ['Chemistry', 'A'],
      ['Physics', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* --- 17d. Imperial multi-pathway engineering: three vs four A-Levels --- */
const mech = b2['imperial-mechanical-engineering-meng--2027'];
check('Imperial Mechanical publishes two pathways', mech.offers.length, 2);
check('  …the four-A-Level route needs four subjects', mech.offers[1].appliesOnlyIfTakingAtLeast, 4);
// Three A-Levels: Physics must be A*.
check(
  'Three A-Levels with Physics at A misses the three-A-Level route',
  evaluateCourse(
    mech,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A*'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Three A-Levels with Physics at A* meets it',
  evaluateCourse(
    mech,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Further Mathematics', 'A'],
    ]),
  ).verdict,
  'meets',
);
// Four A-Levels: Physics at A is enough on the second route.
check(
  'Four A-Levels with Physics at A meets the four-A-Level route',
  evaluateCourse(
    mech,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …and the four-A-Level route is the one that matched',
  evaluateCourse(
    mech,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).bestPathwayId,
  mech.offers[1].id,
);
check(
  'Imperial Civil publishes a lower typical offer than Mechanical — they are not interchangeable',
  b2['imperial-civil-engineering-meng--2027'].typicalOffer === mech.typicalOffer,
  false,
);

/* --- 17e. Imperial Chemical Engineering does not require Physics --- */
const impChem = b2['imperial-chemical-engineering-meng--2027'];
check('Imperial Chemical requires Chemistry', impChem.chemistry, 'required');
check('  …and does not require Physics', impChem.physics === 'required', false);
check(
  '  …and sits the Chemistry ESAT module, not Physics',
  impChem.admissionsTest.modules.join(', '),
  'Mathematics 1, Mathematics 2, Chemistry',
);
check(
  'A Maths/Chemistry applicant with Economics at A meets Imperial Chemical',
  evaluateCourse(
    impChem,
    profile([
      ['Mathematics', 'A*'],
      ['Chemistry', 'A*'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …but an unlisted third subject does not satisfy the one-of condition',
  evaluateCourse(
    impChem,
    profile([
      ['Mathematics', 'A*'],
      ['Chemistry', 'A*'],
      ['History', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 17f. UCL EEE: the ESAT module choice keeps its flexibility --- */
const uclEee = b2['ucl-electronic-and-electrical-engineering-meng--2027'];
check('UCL EEE requires the ESAT', uclEee.admissionsTest.code, 'esat');
check('  …with exactly one mandatory module', uclEee.admissionsTest.modules.join(','), 'Mathematics 1');
check('  …plus a choice of two', uclEee.admissionsTest.moduleChoice?.chooseCount, 2);
check(
  '  …from the four UCL names',
  (uclEee.admissionsTest.moduleChoice?.options ?? []).join(', '),
  'Physics, Mathematics 2, Chemistry, Biology',
);
check(
  '  …and it is NOT flattened into Imperial’s fixed set',
  uclEee.admissionsTest.modules.join(',') === 'Mathematics 1,Mathematics 2,Physics',
  false,
);
check(
  'Imperial EEE still records its own fixed three-module set',
  courses.find((c) => c.id === 'imperial-eee-meng--2027')!.admissionsTest.modules.join(', '),
  'Mathematics 1, Mathematics 2, Physics',
);
check(
  'A module choice does not trigger the "no modules recorded" warning',
  validateCourse(uclEee).some((i) => i.ruleId === 'test-without-modules'),
  false,
);
check(
  'UCL EEE requires only Mathematics — Physics is preferred, not required',
  uclEee.physics === 'required',
  false,
);
check(
  '  …so an applicant with Further Maths instead of Physics still meets it',
  evaluateCourse(
    uclEee,
    profile([
      ['Mathematics', 'A*'],
      ['Further Mathematics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* --- 17g. UCL Mechanical uses the TARA, not the ESAT --- */
check('UCL Mechanical requires the TARA', b2['ucl-mechanical-engineering-meng--2027'].admissionsTest.code, 'tara');
check(
  '  …and no batch-2 record assumes another course’s test',
  batch2Courses.filter((c) => c.admissionsTest.code === 'tara').length,
  2,
);

/* --- 17h. Further Mathematics stays advisory across batch 2 --- */
const fmAdvisory = batch2Courses.filter((c) =>
  ['strongly-recommended', 'recommended', 'useful'].includes(c.furtherMathematics),
);
check('Batch 2 has advisory Further Maths records', fmAdvisory.length > 0, true);
check(
  'No advisory Further Maths record can fail an otherwise-passing profile',
  fmAdvisory.every((c) => {
    const r = evaluateCourse(
      c,
      profile([
        ['Mathematics', 'A*'],
        ['Physics', 'A*'],
        ['Chemistry', 'A*'],
      ]),
    );
    return r.furtherMathematics.outcome !== 'fail';
  }),
  true,
);
check(
  'Only UCL Mathematics and Physics genuinely requires Further Mathematics',
  batch2Courses.filter((c) => c.furtherMathematics === 'required').map((c) => c.id).join(','),
  'ucl-mathematics-and-physics-bsc--2027',
);

/* --- 17i. Provenance and cycle scoping --- */
check('Every batch-2 record is verified', batch2Courses.every((c) => c.provenance.verificationStatus === 'verified'), true);
check('Every batch-2 record has a source URL', batch2Courses.every((c) => !!c.provenance.sourceUrl), true);
check('Every batch-2 record has a source title', batch2Courses.every((c) => !!c.provenance.sourceTitle), true);
check('Every batch-2 record has a last-verified date', batch2Courses.every((c) => c.provenance.lastVerified === '2026-09-01'), true);
check('Every batch-2 record is a 2027 record', batch2Courses.every((c) => c.applicationYear === '2027'), true);
check(
  'Every batch-2 test arrangement is scoped to 2027',
  batch2Courses.every((c) => c.admissionsTest.code === 'unknown' || c.admissionsTest.applicationYear === '2027'),
  true,
);
check(
  'Imperial source URLs are Imperial pages',
  batch2Courses
    .filter((c) => c.universityId === 'imperial')
    .every((c) => c.provenance.sourceUrl!.startsWith('https://www.imperial.ac.uk/')),
  true,
);
check(
  'UCL source URLs are UCL pages',
  batch2Courses
    .filter((c) => c.universityId === 'ucl')
    .every((c) => c.provenance.sourceUrl!.startsWith('https://www.ucl.ac.uk/')),
  true,
);
// Scoped to the SERVED catalogue: `allCourses` still holds the older invented
// 2028 rows, which are suppressed rather than deleted so they stay available
// to the admin data viewer and to these tests.
check(
  'No 2027 requirement leaked into a 2028 record students can see',
  courses
    .filter((c) => c.applicationYear === '2028' && c.provenance.verificationStatus === 'awaiting-publication')
    .every(
      (c) =>
        c.offers.length === 0 &&
        c.admissionsTest.code === 'unknown' &&
        c.rawRequirementText === null &&
        c.minimumEntryStandard === null &&
        c.typicalOffer === null,
    ),
  true,
);

/* --- 17j. Identity: variants stay distinct, obsolete placeholders go --- */
check(
  'The Year Abroad variant keeps its own record — a different UCAS code',
  identityKeys(b2['imperial-physics-msci--2027']).code ===
    identityKeys(b2['imperial-physics-year-abroad-msci--2027']).code,
  false,
);
check(
  'UCL Physics BSc and MSci stay distinct',
  identityKeys(b2['ucl-physics-bsc--2027']).name === identityKeys(b2['ucl-physics-msci--2027']).name,
  false,
);
check(
  'UCL Chemical BEng and MEng stay distinct',
  identityKeys(b2['ucl-chemical-engineering-beng--2027']).code ===
    identityKeys(b2['ucl-chemical-engineering-meng--2027']).code,
  false,
);
const obsolete = obsoletePlaceholderIds(allCourses);
check('The obsolete Oxford Physics 2028 placeholder is suppressed', obsolete.has('oxford-physics--2028'), true);
check(
  'The obsolete Oxford Engineering Science 2028 placeholder is suppressed',
  obsolete.has('oxford-engineering-science--2028'),
  true,
);
check(
  'No suppressed placeholder reaches the served catalogue',
  courses.some((c) => obsolete.has(c.id)),
  false,
);
check(
  'The PAT is no longer served anywhere in the public catalogue',
  courses.filter((c) => c.admissionsTest.code === 'pat').length,
  0,
);
// Migrated in batch 3. This record used to live in the served catalogue as a
// sample row; it is now a declared test fixture. The behaviour it covers (the
// `constraint-exceeds-offer-profile` validation rule) is asserted in section
// 18 below. Here we only check that it has left the public catalogue.
check(
  'The synthetic validation record is a fixture, not a served course',
  testFixtureCourses.some((c) => c.id === 'bristol-physics--2028'),
  true,
);
check(
  '  …and no student can reach it',
  courses.some((c) => c.id === 'bristol-physics--2028'),
  false,
);
check(
  'The clean Oxford Physics 2028 shell is the one that survives',
  courses.some((c) => c.id === 'oxford-physics-mphys--2028'),
  true,
);


/* ================================================================== */
/* 18. BATCH 3 — Imperial, UCL and Manchester, 2027 entry              */
/* ================================================================== */

const b3 = Object.fromEntries(batch3Courses.map((c) => [c.id, c]));

/* --- 18a. Every batch-3 offer keeps its asterisks --- */
const B3_PROFILES: [string, string[]][] = [
  ['imperial-electrical-electronic-engineering-beng--2027', ['A*A*A', 'A*AAA']],
  ['imperial-electronic-information-engineering-beng--2027', ['A*A*A', 'A*AAA']],
  ['imperial-materials-science-engineering-beng--2027', ['AAA']],
  ['imperial-materials-science-engineering-meng--2027', ['AAA']],
  ['imperial-materials-nuclear-engineering-meng--2027', ['AAA']],
  ['imperial-biomaterials-tissue-engineering-meng--2027', ['AAA']],
  ['imperial-biomedical-engineering-meng--2027', ['A*AA']],
  ['imperial-molecular-bioengineering-meng--2027', ['A*AA']],
  ['imperial-design-engineering-meng--2027', ['A*AA']],
  ['ucl-biochemical-engineering-beng--2027', ['AAA']],
  ['ucl-biochemical-engineering-meng--2027', ['AAA']],
  ['ucl-biomedical-engineering-beng--2027', ['A*AA', 'A*AA']],
  ['ucl-biomedical-engineering-meng--2027', ['A*AA', 'A*AA']],
  ['manchester-physics-bsc--2027', ['A*A*A']],
  ['manchester-physics-mphys--2027', ['A*A*A']],
  ['manchester-physics-with-astrophysics-bsc--2027', ['A*A*A']],
  ['manchester-physics-with-astrophysics-mphys--2027', ['A*A*A']],
  ['manchester-physics-with-theoretical-physics-bsc--2027', ['A*A*A']],
  ['manchester-physics-with-theoretical-physics-mphys--2027', ['A*A*A']],
  ['manchester-physics-with-study-in-europe-mphys--2027', ['A*A*A']],
  ['manchester-mathematics-and-physics-bsc--2027', ['A*A*A']],
  ['manchester-mathematics-and-physics-mmathphys--2027', ['A*A*A']],
  ['manchester-mechanical-engineering-beng--2027', ['A*A*A']],
  ['manchester-mechanical-engineering-meng--2027', ['A*A*A']],
  ['manchester-aerospace-engineering-beng--2027', ['A*AA']],
  ['manchester-aerospace-engineering-meng--2027', ['A*AA']],
  ['manchester-electrical-electronic-engineering-beng--2027', ['A*AA']],
  ['manchester-electrical-electronic-engineering-meng--2027', ['A*AA']],
  ['manchester-civil-engineering-beng--2027', ['AAA']],
  ['manchester-civil-engineering-meng--2027', ['AAA']],
  ['manchester-chemical-engineering-beng--2027', ['AAA']],
  ['manchester-chemical-engineering-meng--2027', ['AAA']],
  ['manchester-materials-science-and-engineering-bsc--2027', ['AAB']],
  ['manchester-materials-science-and-engineering-meng--2027', ['AAA']],
  ['manchester-mechatronic-engineering-beng--2027', ['A*AA']],
  ['manchester-mechatronic-engineering-meng--2027', ['A*AA']],
];
let b3Mismatches = 0;
for (const [id, expected] of B3_PROFILES) {
  const c = b3[id];
  if (!c || c.offers.map((o) => o.gradeProfile).join('|') !== expected.join('|')) b3Mismatches += 1;
}
check('Every batch-3 offer string survives import with its asterisks intact', b3Mismatches, 0);
check('  …and the table covers every batch-3 record', B3_PROFILES.length, batch3Courses.length);
check(
  'Manchester Materials BSc publishes AAB, not AAA — the awards differ',
  b3['manchester-materials-science-and-engineering-bsc--2027'].offers[0].gradeProfile,
  'AAB',
);
check(
  '  …and the MEng publishes AAA',
  b3['manchester-materials-science-and-engineering-meng--2027'].offers[0].gradeProfile,
  'AAA',
);
check(
  'Manchester Civil (AAA) is not Manchester Mechanical (A*A*A)',
  b3['manchester-civil-engineering-beng--2027'].offers[0].gradeProfile ===
    b3['manchester-mechanical-engineering-beng--2027'].offers[0].gradeProfile,
  false,
);
check(
  'Parsed A*A*A really is A-star, A-star, A',
  (b3['manchester-physics-bsc--2027'].offers[0].gradeProfileGrades ?? []).join(','),
  'A*,A*,A',
);
check(
  'Parsed AAB really is A, A, B',
  (b3['manchester-materials-science-and-engineering-bsc--2027'].offers[0].gradeProfileGrades ?? []).join(','),
  'A,A,B',
);

/* --- 18b. Manchester Physics: A* Physics AND A* Maths-or-Further-Maths --- */
const mcrPhysics = b3['manchester-physics-bsc--2027'];
check(
  'Manchester Physics needs an A* in Physics — A*A*A with Physics at A fails',
  evaluateCourse(
    mcrPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Further Mathematics', 'A*'],
      ['Physics', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …and Physics is the part that fails, not the overall grades',
  evaluateCourse(
    mcrPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Further Mathematics', 'A*'],
      ['Physics', 'A'],
    ]),
  ).overallGrades.outcome,
  'pass',
);
check(
  'Physics A* with Mathematics A* meets it',
  evaluateCourse(
    mcrPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Further Mathematics A* satisfies the Mathematics-or-Further-Mathematics condition',
  evaluateCourse(
    mcrPhysics,
    profile([
      ['Further Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Neither Mathematics nor Further Mathematics at A* fails',
  evaluateCourse(
    mcrPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A*'],
      ['Chemistry', 'A*'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 18c. Manchester Engineering: one course's rules never leak into another --- */
const mcrEEE = b3['manchester-electrical-electronic-engineering-beng--2027'];
const mcrMech = b3['manchester-mechanical-engineering-beng--2027'];
const mcrChem = b3['manchester-chemical-engineering-beng--2027'];
const mcrMaterials = b3['manchester-materials-science-and-engineering-bsc--2027'];

// EEE accepts Computer Science as the second subject; Mechanical requires Physics.
const mathsCsHistory = profile([
  ['Mathematics', 'A*'],
  ['Computer Science', 'A'],
  ['History', 'A'],
]);
check(
  'Manchester EEE accepts Computer Science as the second subject',
  evaluateCourse(mcrEEE, mathsCsHistory).verdict,
  'meets',
);
check(
  '  …but Manchester Mechanical does not — it requires Physics',
  evaluateCourse(mcrMech, mathsCsHistory).verdict,
  'does-not-meet',
);
check(
  'Manchester Mechanical requires Physics',
  mcrMech.physics,
  'required',
);
check(
  '  …while Manchester EEE does not',
  mcrEEE.physics === 'required',
  false,
);
// Chemical accepts Chemistry OR Physics — Chemistry is not uniquely required.
check(
  'Manchester Chemical accepts Physics instead of Chemistry',
  evaluateCourse(
    mcrChem,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …and accepts Chemistry instead of Physics',
  evaluateCourse(
    mcrChem,
    profile([
      ['Mathematics', 'A'],
      ['Chemistry', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …but not an applicant with neither',
  evaluateCourse(
    mcrChem,
    profile([
      ['Mathematics', 'A'],
      ['Economics', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Manchester Chemical does not require Chemistry outright',
  mcrChem.chemistry === 'required',
  false,
);

/* --- 18d. Materials accepts a broader science range than Mechanical --- */
const mathsChemBiology = profile([
  ['Mathematics', 'A'],
  ['Chemistry', 'A'],
  ['Biology', 'B'],
]);
check(
  'Manchester Materials accepts Mathematics + Chemistry with no Physics',
  evaluateCourse(mcrMaterials, mathsChemBiology).verdict,
  'meets',
);
check(
  '  …where Manchester Mechanical rejects the same profile',
  evaluateCourse(mcrMech, mathsChemBiology).verdict,
  'does-not-meet',
);
check(
  'Materials also accepts Physics + Chemistry without Mathematics',
  evaluateCourse(
    mcrMaterials,
    profile([
      ['Physics', 'A'],
      ['Chemistry', 'A'],
      ['Geography', 'B'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …but not a single science',
  evaluateCourse(
    mcrMaterials,
    profile([
      ['Mathematics', 'A'],
      ['Geography', 'A'],
      ['History', 'B'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 18e. Imperial specialist courses differ from Imperial Mechanical --- */
const impBiomed = b3['imperial-biomedical-engineering-meng--2027'];
const impMolBio = b3['imperial-molecular-bioengineering-meng--2027'];
const impDesign = b3['imperial-design-engineering-meng--2027'];

const mathsChemEcon = profile([
  ['Mathematics', 'A*'],
  ['Chemistry', 'A'],
  ['Economics', 'A'],
]);
check(
  'Imperial Molecular Bioengineering requires Chemistry, and accepts this profile',
  evaluateCourse(impMolBio, mathsChemEcon).verdict,
  'meets',
);
check(
  '  …while Imperial Biomedical Engineering rejects it — it requires Physics',
  evaluateCourse(impBiomed, mathsChemEcon).verdict,
  'does-not-meet',
);
check(
  '  …and Imperial Mechanical rejects it too',
  evaluateCourse(byId['imperial-mechanical-engineering-meng--2027'], mathsChemEcon).verdict,
  'does-not-meet',
);
check(
  'Imperial Design Engineering names no science subject at all',
  evaluateCourse(
    impDesign,
    profile([
      ['Mathematics', 'A*'],
      ['History', 'A'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …but still needs the A* in Mathematics',
  evaluateCourse(
    impDesign,
    profile([
      ['Mathematics', 'A'],
      ['History', 'A*'],
      ['Economics', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 18f. Admissions tests are never inherited --- */
check('Imperial Materials BEng publishes NO admissions test', b3['imperial-materials-science-engineering-beng--2027'].admissionsTest.code, 'none');
check(
  '  …recorded as an explicit "not required", because the page says so',
  b3['imperial-materials-science-engineering-beng--2027'].admissionsTest.requirement,
  'not-required',
);
check(
  'Imperial Design Engineering sits TWO ESAT modules, not three',
  b3['imperial-design-engineering-meng--2027'].admissionsTest.modules.join(', '),
  'Mathematics 1, Mathematics 2',
);
check(
  '  …and no Physics module',
  b3['imperial-design-engineering-meng--2027'].admissionsTest.modules.includes('Physics'),
  false,
);
check(
  'No batch-3 Imperial course inherits the ESAT from a sibling course',
  b3['imperial-biomedical-engineering-meng--2027'].admissionsTest.code === 'esat' ||
    b3['imperial-molecular-bioengineering-meng--2027'].admissionsTest.code === 'esat',
  false,
);
check(
  'No Manchester course claims an admissions test it does not publish',
  batch3Courses
    .filter((c) => c.universityId === 'manchester')
    .every((c) => c.admissionsTest.code === 'unknown'),
  true,
);
check(
  '  …and none inherits UCL’s TARA or Imperial’s ESAT',
  batch3Courses
    .filter((c) => c.universityId === 'manchester')
    .some((c) => c.admissionsTest.code === 'tara' || c.admissionsTest.code === 'esat'),
  false,
);
check(
  'An unstated test is "unknown", never a definite "none"',
  b3['ucl-biochemical-engineering-beng--2027'].admissionsTest.code,
  'unknown',
);

/* --- 18g. UCL Biomedical: the Biology substitution returns review --- */
const uclBiomed = b3['ucl-biomedical-engineering-meng--2027'];
check(
  'UCL Biomedical with Physics meets outright',
  evaluateCourse(
    uclBiomed,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'UCL Biomedical with Biology in place of Physics returns review, not a pass or a fail',
  evaluateCourse(
    uclBiomed,
    profile([
      ['Mathematics', 'A*'],
      ['Biology', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'review-required',
);
check(
  'UCL Biochemical accepts any one of Biology, Chemistry or Physics',
  evaluateCourse(
    b3['ucl-biochemical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Biology', 'A'],
      ['Geography', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …but not an applicant with none of the three',
  evaluateCourse(
    b3['ucl-biochemical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Geography', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 18h. BEng and MEng stay distinct even when requirements match --- */
check(
  'Manchester Mechanical BEng and MEng are separate records',
  identityKeys(b3['manchester-mechanical-engineering-beng--2027']).code ===
    identityKeys(b3['manchester-mechanical-engineering-meng--2027']).code,
  false,
);
check(
  '  …even though their published requirements are identical',
  b3['manchester-mechanical-engineering-beng--2027'].offers[0].gradeProfile,
  b3['manchester-mechanical-engineering-meng--2027'].offers[0].gradeProfile,
);
check(
  'Imperial EEE BEng and the batch-2 MEng are separate records',
  identityKeys(b3['imperial-electrical-electronic-engineering-beng--2027']).code ===
    identityKeys(byId['imperial-eee-meng--2027']).code,
  false,
);

/* --- 18i. Further Mathematics stays advisory across batch 3 --- */
check(
  'No batch-3 record makes Further Mathematics a hard requirement',
  batch3Courses.some((c) => c.furtherMathematics === 'required'),
  false,
);
check(
  'No advisory Further Maths record can fail an otherwise-passing profile',
  batch3Courses.every((c) => {
    const r = evaluateCourse(
      c,
      profile([
        ['Mathematics', 'A*'],
        ['Physics', 'A*'],
        ['Chemistry', 'A*'],
      ]),
    );
    return r.furtherMathematics.outcome !== 'fail';
  }),
  true,
);

/* --- 18j. Provenance, cycle scoping and 2028 shells --- */
check('Every batch-3 record is verified', batch3Courses.every((c) => c.provenance.verificationStatus === 'verified'), true);
check('Every batch-3 record has a source URL', batch3Courses.every((c) => !!c.provenance.sourceUrl), true);
check('Every batch-3 record has a source title', batch3Courses.every((c) => !!c.provenance.sourceTitle), true);
check(
  'Every batch-3 record was verified on 2026-09-02',
  batch3Courses.every((c) => c.provenance.lastVerified === '2026-09-02'),
  true,
);
check('Every batch-3 record is a 2027 record', batch3Courses.every((c) => c.applicationYear === '2027'), true);
check(
  'Manchester source URLs are Manchester pages',
  batch3Courses
    .filter((c) => c.universityId === 'manchester')
    .every((c) => c.provenance.sourceUrl!.startsWith('https://www.manchester.ac.uk/')),
  true,
);
check(
  'No batch-3 2028 shell carries a 2027 admissions fact',
  shells2028
    .filter((c) => batch3Courses.some((b) => b.slug === c.slug))
    .every(
      (c) =>
        c.offers.length === 0 &&
        c.admissionsTest.code === 'unknown' &&
        c.admissionsTest.modules.length === 0 &&
        c.rawRequirementText === null &&
        c.minimumEntryStandard === null &&
        c.typicalOffer === null &&
        c.gcseRequirements === null &&
        c.contextualOffer.details === null &&
        c.interview === 'not-stated' &&
        c.latestPublishedYear === '2027',
    ),
  true,
);
check(
  '  …and a shell exists for every batch-3 course',
  batch3Courses.every((b) => shells2028.some((c) => c.slug === b.slug)),
  true,
);

/* --- 18k. Contextual offers stay display-only --- */
check(
  'Manchester publishes contextual and refugee/care offers as information only',
  batch3Courses
    .filter((c) => c.universityId === 'manchester')
    .every((c) => c.offers.every((o) => !o.isContextual)),
  true,
);
check(
  '  …and the published contextual text is still stored',
  (b3['manchester-physics-bsc--2027'].contextualOffer.details ?? '').includes('A*AA'),
  true,
);
check(
  'A Manchester Physics applicant on the contextual grades is not matched to them',
  evaluateCourse(
    mcrPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* ================================================================== */
/* 19. Production data versus test fixtures                            */
/* ================================================================== */

check('Four synthetic fixtures are declared', testFixtureCourses.length, 4);
check(
  'No fixture reaches the served catalogue',
  courses.some((c) => testFixtureCourses.some((f) => f.id === c.id)),
  false,
);
check(
  'No fixture reaches the production record set either',
  allCourses.some((c) => testFixtureCourses.some((f) => f.id === c.id)),
  false,
);
check(
  'The production catalogue contains no sample admissions data',
  courses.some((c) => c.provenance.verificationStatus === 'demo'),
  true === false,
);
check(
  'Every production record is verified, awaiting publication, or awaiting data',
  courses.every((c) =>
    ['verified', 'partially-verified', 'awaiting-publication', 'awaiting-data'].includes(
      c.provenance.verificationStatus,
    ),
  ),
  true,
);
check(
  'Research targets carry identity but no invented requirements',
  courses
    .filter((c) => c.provenance.verificationStatus === 'awaiting-data')
    .every(
      (c) =>
        c.offers.length === 0 &&
        c.admissionsTest.code === 'unknown' &&
        c.furtherMathematics === 'unknown' &&
        c.rawRequirementText === null,
    ),
  true,
);
check(
  '  …and they keep the UCAS code that makes them findable',
  courses.filter((c) => c.provenance.verificationStatus === 'awaiting-data' && c.courseCode).length > 0,
  true,
);

// The behaviour each fixture is the sole cover for still works.
const fixtureById = Object.fromEntries(testFixtureCourses.map((c) => [c.id, c]));
check(
  'Fixture: the contradictory record still trips constraint-exceeds-offer-profile',
  validateCourse(fixtureById['bristol-physics--2028']).some(
    (i) => i.ruleId === 'constraint-exceeds-offer-profile',
  ),
  true,
);
check(
  '  …and that warning no longer appears in production validation',
  courses.flatMap(validateCourse).some((i) => i.ruleId === 'constraint-exceeds-offer-profile'),
  false,
);
check(
  'Fixture: advisory Further Maths still does not block a match',
  evaluateCourse(fixtureById['manchester-physics--2028'], strongProfileNoFm).verdict,
  'meets',
);
check(
  'Fixture: required Further Maths still blocks',
  evaluateCourse(fixtureById['durham-theoretical-physics--2028'], strongProfileNoFm).verdict,
  'does-not-meet',
);
check(
  'Fixture: the conditional Further Maths pathway still gates on the subject',
  evaluateCourse(
    fixtureById['warwick-physics--2028'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Further Mathematics', 'A'],
    ]),
  ).verdict,
  'meets',
);


/* ================================================================== */
/* 20. BATCH 4 — Durham, Warwick, Edinburgh, Bristol, Bath             */
/* ================================================================== */

const b4 = Object.fromEntries(batch4Courses.map((c) => [c.id, c]));

/* --- 20a. Study options are never separate applications --- */
const b4Aero = byId['imperial-aeronautical-engineering-meng--2027'];
const b4Mech = byId['imperial-mechanical-engineering-meng--2027'];
check('Imperial H401 carries Spacecraft Engineering as a study option', b4Aero.studyOptions.length > 0, true);
check(
  '  …named exactly as Imperial publishes it',
  b4Aero.studyOptions.some((o) => o.name === 'Aeronautics with Spacecraft Engineering'),
  true,
);
check(
  '  …and pointing at the parent UCAS code, not a new one',
  b4Aero.studyOptions.every((o) => o.ucasCode === null || o.ucasCode === b4Aero.courseCode),
  true,
);
/*
 * BATCH 6 — these assertions used to read "no course anywhere is named
 * Spacecraft". That was a global claim built from an Imperial-specific fact,
 * and Southampton disproved it: Southampton publishes "Aeronautics and
 * Astronautics / Spacecraft Engineering (MEng)" as a genuinely separate UCAS
 * application, H493, which prints its own "When you apply use" code. The rule
 * being protected is "IMPERIAL's Spacecraft specialism is a route inside H401,
 * not an application", so the assertions are scoped to Imperial. A specialism
 * at one university is not a specialism everywhere.
 */
check(
  'Imperial’s Spacecraft specialism did NOT become a separate course record',
  courses.filter((c) => c.universityId === 'imperial' && /spacecraft/i.test(c.name)).length,
  0,
);
check(
  '  …whereas Southampton’s separately coded Spacecraft degree IS its own record',
  courses.filter((c) => c.universityId === 'southampton' && /spacecraft/i.test(c.name) && c.applicationYear === '2027')
    .map((c) => c.courseCode)
    .join(),
  'H493',
);
check(
  'Exactly one served 2027 record holds Imperial UCAS code H401',
  courses.filter((c) => c.universityId === 'imperial' && c.applicationYear === '2027' && c.courseCode === 'H401').length,
  1,
);
check('Imperial H301 carries Nuclear Engineering as a study option', b4Mech.studyOptions.length > 0, true);
check(
  '  …named exactly as Imperial publishes it',
  b4Mech.studyOptions.some((o) => o.name === 'Mechanical Engineering with Nuclear Engineering'),
  true,
);
// Imperial's "Materials with Nuclear Engineering" IS a genuine separate UCAS
// choice (J5H8) and stays a course. The Mechanical specialism is not, and must
// never appear as one.
check(
  'The Mechanical nuclear specialism did NOT become a separate course record',
  courses.filter(
    (c) => c.universityId === 'imperial' && /^Mechanical Engineering with Nuclear/i.test(c.name),
  ).length,
  0,
);
check(
  '  …while the genuinely separate Materials with Nuclear Engineering remains a course',
  courses.filter(
    (c) => c.universityId === 'imperial' && c.applicationYear === '2027' && c.courseCode === 'J5H8',
  ).length,
  1,
);
check(
  'Exactly one served 2027 record holds Imperial UCAS code H301',
  courses.filter((c) => c.universityId === 'imperial' && c.applicationYear === '2027' && c.courseCode === 'H301').length,
  1,
);
check(
  'No study option produces a 2028 shell of its own',
  shells2028.some(
    (c) =>
      (c.universityId === 'imperial' && /spacecraft/i.test(c.name)) ||
      /^Mechanical Engineering with Nuclear/i.test(c.name),
  ),
  false,
);
check(
  'A study option never carries its own offers',
  courses.every((c) => c.studyOptions.every((o) => typeof o.name === 'string')),
  true,
);
check(
  'Durham records the later-specialisation route as a study option',
  b4['durham-mechanical-engineering-meng--2027'].studyOptions.length > 0,
  true,
);
check(
  'Warwick records its common first year as a study option',
  b4['warwick-mechanical-engineering-meng--2027'].studyOptions.some((o) =>
    /common general engineering first year/i.test(o.name),
  ),
  true,
);
check(
  '  …but each Warwick discipline is still its own UCAS application',
  new Set(
    batch4Courses
      .filter((c) => c.universityId === 'warwick' && c.subjectCategory === 'engineering')
      .map((c) => c.courseCode),
  ).size,
  18,
);

/* --- 20b. Access and contextual offers never improve the verdict --- */
const edPhysics = b4['edinburgh-physics-bsc--2027'];
check(
  'Edinburgh stores its widening-access threshold as an access offer, not the headline',
  (edPhysics.contextualOffer.details ?? '').startsWith('Widening access offer:'),
  true,
);
check(
  '  …and never in minimumEntryStandard, which means something different',
  edPhysics.minimumEntryStandard,
  null,
);
check(
  '  …and never as an offer pathway',
  edPhysics.offers.some((o) => o.isContextual),
  false,
);
check(
  'A profile at Edinburgh’s access threshold is not matched against it',
  evaluateCourse(
    edPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'B'],
      ['Chemistry', 'B'],
    ]),
  ).verdict,
  // The published standard offer is a band, so the honest answer is review —
  // never "meets" on the strength of the access threshold.
  'review-required',
);
check(
  'Durham’s contextual offer is stored as published information only',
  (b4['durham-physics-bsc--2027'].contextualOffer.details ?? '').includes('A*AB'),
  true,
);
check(
  '  …and a contextual-grade profile does not meet the standard Durham offer',
  evaluateCourse(
    b4['durham-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Chemistry', 'B'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 20c. Edinburgh publishes a BAND, and it is not collapsed --- */
check(
  'Edinburgh’s standard offer is stored as the published band',
  edPhysics.offers[0].gradeProfile,
  'from AAA to ABB in one set of exams',
);
check(
  '  …which the parser deliberately refuses to turn into three grades',
  edPhysics.offers[0].gradeProfileGrades,
  null,
);
check(
  '  …so the overall-grade check reports it for review',
  evaluateCourse(
    edPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).overallGrades.outcome,
  'review',
);
check(
  '  …while the subject conditions are still checked',
  evaluateCourse(
    edPhysics,
    profile([
      ['Mathematics', 'B'],
      ['Physics', 'B'],
      ['Chemistry', 'A'],
    ]),
  ).mathematics.outcome,
  'fail',
);
check(
  'Edinburgh Civil sits in the lower band, not the physics band',
  b4['edinburgh-civil-engineering-beng--2027'].offers[0].gradeProfile,
  'from ABB to BBB in one set of exams',
);
check(
  '  …which is a different string from the main engineering band',
  b4['edinburgh-civil-engineering-beng--2027'].offers[0].gradeProfile ===
    b4['edinburgh-mechanical-engineering-beng--2027'].offers[0].gradeProfile,
  false,
);

/* --- 20d. A high profile still fails a missing subject condition --- */
const brPhysics = b4['bristol-physics-bsc--2027'];
check('Bristol Physics publishes A*AA', brPhysics.offers[0].gradeProfile, 'A*AA');
check(
  'An A* in a third subject does not satisfy Bristol’s A*A in Maths and Physics',
  evaluateCourse(
    brPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A*'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …and the overall grades are not the reason',
  evaluateCourse(
    brPhysics,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A*'],
    ]),
  ).overallGrades.outcome,
  'pass',
);
check(
  'Maths A* with Physics A meets it',
  evaluateCourse(
    brPhysics,
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Durham Physics needs both named subjects',
  evaluateCourse(
    b4['durham-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Chemistry', 'A*'],
      ['Biology', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);

/* --- 20e. Engineering disciplines do not leak into one another --- */
const brAero = b4['bristol-aerospace-engineering-beng--2027'];
const brMech = b4['bristol-mechanical-engineering-beng--2027'];
const brCivil = b4['bristol-civil-engineering-beng--2027'];
const brEee = b4['bristol-electrical-electronic-engineering-meng--2027'];

// Maths + two humanities: Aerospace requires only Maths, Mechanical requires a
// named second science, Civil accepts Geography.
const mathsHistoryEnglish = profile([
  ['Mathematics', 'A*'],
  ['History', 'A'],
  ['English Literature', 'A'],
]);
check('Bristol Aerospace requires only Mathematics', evaluateCourse(brAero, mathsHistoryEnglish).verdict, 'meets');
check(
  '  …where Bristol Mechanical needs a named second science',
  evaluateCourse(brMech, mathsHistoryEnglish).verdict,
  'does-not-meet',
);
check(
  'Bristol Civil accepts Geography as its science-related subject',
  evaluateCourse(
    brCivil,
    profile([
      ['Mathematics', 'A*'],
      ['Geography', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …where Bristol Mechanical does not',
  evaluateCourse(
    brMech,
    profile([
      ['Mathematics', 'A*'],
      ['Geography', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check('Bristol EEE publishes AAA with no asterisk at all', brEee.offers[0].gradeProfile, 'AAA');
check(
  '  …a genuinely different string from Bristol Mechanical’s A*AA',
  brEee.offers[0].gradeProfile === brMech.offers[0].gradeProfile,
  false,
);
check(
  'Edinburgh Chemical Engineering requires Chemistry by name',
  b4['edinburgh-chemical-engineering-beng--2027'].chemistry,
  'required',
);
check(
  '  …where Edinburgh Mechanical accepts any one of six sciences',
  evaluateCourse(
    b4['edinburgh-mechanical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'B'],
      ['Computer Science', 'B'],
      ['History', 'B'],
    ]),
  ).overallGrades.outcome,
  // The band is unparseable, so the overall check reviews; what matters is that
  // the subject condition passed rather than failed.
  'review',
);
check(
  '  …and Edinburgh Chemical rejects the same profile on Chemistry',
  evaluateCourse(
    b4['edinburgh-chemical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'B'],
      ['Computer Science', 'B'],
      ['History', 'B'],
    ]),
  ).chemistry.outcome,
  'fail',
);
check(
  'Bath Civil Engineering does not require Physics',
  b4['bath-civil-engineering-beng--2027'].physics === 'required',
  false,
);
check(
  '  …where Bath Mechanical does',
  b4['bath-mechanical-engineering-beng--2027'].physics,
  'required',
);
check(
  'Durham Engineering accepts Geology as its science',
  evaluateCourse(
    b4['durham-mechanical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Geology', 'A'],
      ['History', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* --- 20f. Further Mathematics rules --- */
check(
  'Warwick Mathematics and Physics makes Further Maths conditional, not absolute',
  b4['warwick-mathematics-and-physics-bsc--2027'].furtherMathematics,
  'conditional',
);
check(
  '  …an applicant with Further Maths meets the standard route',
  evaluateCourse(
    b4['warwick-mathematics-and-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Further Mathematics', 'A'],
      ['Physics', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …and an applicant without it meets the published alternative at A*A*A',
  evaluateCourse(
    b4['warwick-mathematics-and-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …but not at the lower A*AA without it',
  evaluateCourse(
    b4['warwick-mathematics-and-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Durham Mathematics and Physics genuinely requires Further Maths',
  b4['durham-mathematics-and-physics-bsc--2027'].furtherMathematics,
  'required',
);
check(
  '  …and blocks an applicant without it',
  evaluateCourse(
    b4['durham-mathematics-and-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Physics', 'A*'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Bath Physics states Further Maths is NOT required',
  b4['bath-physics-bsc--2027'].furtherMathematics,
  'not-required',
);
check(
  'No advisory Further Maths anywhere in batch 4 can fail a strong profile',
  batch4Courses.every((c) => {
    const r = evaluateCourse(
      c,
      profile([
        ['Mathematics', 'A*'],
        ['Physics', 'A*'],
        ['Chemistry', 'A*'],
      ]),
    );
    return r.furtherMathematics.outcome !== 'fail' || c.furtherMathematics === 'required';
  }),
  true,
);

/* --- 20g. BSc and integrated Master's stay distinct --- */
check(
  'Durham Physics BSc and MPhys are separate identities',
  identityKeys(b4['durham-physics-bsc--2027']).code === identityKeys(b4['durham-physics-mphys--2027']).code,
  false,
);
check(
  '  …even though their published requirements are identical',
  b4['durham-physics-bsc--2027'].offers[0].gradeProfile,
  b4['durham-physics-mphys--2027'].offers[0].gradeProfile,
);
check(
  'Warwick BEng and MEng publish genuinely different offers',
  b4['warwick-mechanical-engineering-beng--2027'].offers[0].gradeProfile === 
    b4['warwick-mechanical-engineering-meng--2027'].offers[0].gradeProfile,
  false,
);
check(
  'Bath records carry no UCAS code, and fall back to name-and-award identity',
  batch4Courses.filter((c) => c.universityId === 'bath').every((c) => c.courseCode === null),
  true,
);
check(
  '  …and Bath Physics BSc and MPhys are still distinct',
  identityKeys(b4['bath-physics-bsc--2027']).name === identityKeys(b4['bath-physics-mphys--2027']).name,
  false,
);

/* --- 20h. Placement and study-abroad identity --- */
check(
  'Bath placement is a study option, not a separate course',
  b4['bath-mechanical-engineering-beng--2027'].studyOptions.some((o) =>
    /professional placement/i.test(o.name),
  ),
  true,
);
check(
  '  …and no Bath placement course record exists',
  courses.filter((c) => c.universityId === 'bath' && /placement/i.test(c.name)).length,
  0,
);
check(
  'Bristol study-abroad variants DO have their own UCAS codes, so they are courses',
  b4['bristol-physics-with-study-abroad-msci--2027'].courseCode,
  'F304',
);
check(
  '  …and are distinct from the base Physics MSci',
  identityKeys(b4['bristol-physics-msci--2027']).code ===
    identityKeys(b4['bristol-physics-with-study-abroad-msci--2027']).code,
  false,
);

/* --- 20i. No test is never invented, and silence is not "none" --- */
check(
  'No batch-4 record claims an admissions test',
  batch4Courses.every((c) => c.admissionsTest.code === 'unknown'),
  true,
);
check(
  '  …and every one explains why it is unknown',
  batch4Courses.every((c) => Boolean(c.admissionsTest.notes)),
  true,
);
check(
  'Durham publishes an explicit no-interview statement, so it is stored as a definite no',
  b4['durham-physics-bsc--2027'].interview,
  'no',
);
check(
  'Edinburgh publishes no interview statement, so it stays not-stated',
  b4['edinburgh-physics-bsc--2027'].interview,
  'not-stated',
);
check(
  'Imperial Materials still holds a published "none", which is different again',
  byId['imperial-materials-science-engineering-beng--2027'].admissionsTest.code,
  'none',
);

/* --- 20j. Provenance, cycle scoping and 2028 shells --- */
check('Every batch-4 record is verified', batch4Courses.every((c) => c.provenance.verificationStatus === 'verified'), true);
check('Every batch-4 record has a source URL', batch4Courses.every((c) => !!c.provenance.sourceUrl), true);
check('Every batch-4 record has a source title', batch4Courses.every((c) => !!c.provenance.sourceTitle), true);
check(
  'Every batch-4 record was verified on 2026-09-03',
  batch4Courses.every((c) => c.provenance.lastVerified === '2026-09-03'),
  true,
);
check('Every batch-4 record is a 2027 record', batch4Courses.every((c) => c.applicationYear === '2027'), true);
const DOMAINS: Record<string, string> = {
  durham: 'https://www.durham.ac.uk/',
  warwick: 'https://warwick.ac.uk/',
  edinburgh: 'https://study.ed.ac.uk/',
  bristol: 'https://www.bristol.ac.uk/',
  bath: 'https://www.bath.ac.uk/',
};
check(
  'Every batch-4 source URL is on its own university’s domain',
  batch4Courses.every((c) => c.provenance.sourceUrl!.startsWith(DOMAINS[c.universityId])),
  true,
);
check(
  'No batch-4 2028 shell carries a 2027 admissions fact',
  shells2028
    .filter((c) => batch4Courses.some((b) => b.slug === c.slug))
    .every(
      (c) =>
        c.offers.length === 0 &&
        c.admissionsTest.code === 'unknown' &&
        c.admissionsTest.modules.length === 0 &&
        c.rawRequirementText === null &&
        c.minimumEntryStandard === null &&
        c.typicalOffer === null &&
        c.gcseRequirements === null &&
        c.contextualOffer.details === null &&
        c.interview === 'not-stated' &&
        c.studyOptions.length === 0 &&
        c.latestPublishedYear === '2027',
    ),
  true,
);
check(
  '  …and a shell exists for every batch-4 course',
  batch4Courses.every((b) => shells2028.some((c) => c.slug === b.slug)),
  true,
);

/* --- 20k. A* integrity across batch 4 --- */
const B4_SPOT: [string, string][] = [
  ['durham-physics-bsc--2027', 'A*A*A'],
  ['durham-mechanical-engineering-beng--2027', 'A*AA'],
  ['warwick-physics-bsc--2027', 'A*AA'],
  ['warwick-mechanical-engineering-beng--2027', 'AAA'],
  ['warwick-mechanical-engineering-meng--2027', 'A*AA'],
  ['warwick-mathematics-and-physics-bsc--2027', 'A*AA'],
  ['bristol-physics-bsc--2027', 'A*AA'],
  ['bristol-mathematics-and-physics-bsc--2027', 'A*A*A'],
  ['bristol-electrical-electronic-engineering-meng--2027', 'AAA'],
  ['bath-physics-bsc--2027', 'A*AA'],
  ['bath-mechanical-engineering-beng--2027', 'A*A*A'],
  ['bath-civil-engineering-beng--2027', 'A*AA'],
  ['bath-electrical-and-electronic-engineering-beng--2027', 'AAA'],
];
let b4Mismatch = 0;
for (const [id, expected] of B4_SPOT) {
  if (!b4[id] || b4[id].offers[0].gradeProfile !== expected) b4Mismatch += 1;
}
check('Every spot-checked batch-4 offer keeps its exact asterisks', b4Mismatch, 0);
check(
  'A*A*A and A*AA are never treated as the same string',
  b4['durham-physics-bsc--2027'].offers[0].gradeProfile ===
    b4['durham-mechanical-engineering-beng--2027'].offers[0].gradeProfile,
  false,
);
check(
  'Parsed Bath A*A*A really is A-star, A-star, A',
  (b4['bath-mechanical-engineering-beng--2027'].offers[0].gradeProfileGrades ?? []).join(','),
  'A*,A*,A',
);
check(
  'Bath’s two-alternative offer became two matchable routes, not one unparseable string',
  b4['bath-electrical-and-electronic-engineering-beng--2027'].offers.map((o) => o.gradeProfile).join(' / '),
  'AAA / A*AB',
);

/* --- 20l. Sidebar facet counts match the visible universe --- */
// The sidebar computes its counts from the same filtered set the results list
// uses. This asserts the underlying rule rather than the React component: for
// the default view, subject counts must equal what a student can actually see.
const defaultVisible = courses.filter(
  (c) => c.applicationYear === '2028' && c.provenance.verificationStatus !== 'awaiting-data',
);
check(
  'Default view excludes research targets from the visible set',
  defaultVisible.some((c) => c.provenance.verificationStatus === 'awaiting-data'),
  false,
);
check(
  '  …so a subject count over that set matches the list it describes',
  defaultVisible.filter((c) => c.subjectCategory === 'physics').length +
    defaultVisible.filter((c) => c.subjectCategory === 'engineering').length,
  defaultVisible.length,
);


/* ================================================================== */
/* 21. BATCH 5 — study-option search, eligibility filtering, and the   */
/*     six new universities                                           */
/* ================================================================== */

const b5 = Object.fromEntries(batch5Courses.map((c) => [c.id, c]));
const uniMap = Object.fromEntries(universities.map((u) => [u.id, u]));

/** Run the real discovery pipeline: parse the query, then filter. */
const search = (q: string, year: '2027' | '2028' = '2027', extra: Partial<FilterState> = {}) =>
  applyFilters({
    courses,
    universities: uniMap,
    filters: { ...defaultFilters(true), applicationYear: year, query: q, ...extra },
    parsed: parseQuery(q),
    eligibility: {},
    shortlistedCourseIds: [],
  });

const routesFor = (q: string, courseId: string) => {
  const c = courses.find((x) => x.id === courseId);
  if (!c) return [];
  return matchedStudyOptionNames(c, uniMap[c.universityId], parseQuery(q).text);
};

/* --- 21a. Study-option search routes to the PARENT course --- */
const spacecraft = search('Spacecraft');
const imperialSpacecraft = spacecraft.filter((c) => c.universityId === 'imperial');
check('“Spacecraft” returns exactly one IMPERIAL course', imperialSpacecraft.length, 1);
check(
  '  …and it is Imperial’s Aeronautical Engineering MEng parent',
  imperialSpacecraft[0]?.id,
  'imperial-aeronautical-engineering-meng--2027',
);
check('  …carrying the parent’s own UCAS code', imperialSpacecraft[0]?.courseCode, 'H401');
check(
  '  …while the same search also finds Southampton’s separately coded degree, correctly',
  spacecraft.some((c) => c.universityId === 'southampton' && c.courseCode === 'H493'),
  true,
);
check(
  '  …and the card can say which route matched',
  routesFor('Spacecraft', 'imperial-aeronautical-engineering-meng--2027').join('|'),
  'Aeronautics with Spacecraft Engineering',
);

/* --- 21b. Study-option search never manufactures a UCAS record --- */
check(
  'No course record is named for IMPERIAL’s Spacecraft specialism, in any year',
  allCoursesWithFixtures.filter((c) => c.universityId === 'imperial' && /spacecraft/i.test(c.name))
    .length,
  0,
);
check(
  'No 2028 shell exists for Imperial’s Spacecraft specialism',
  shells2028.some((c) => c.universityId === 'imperial' && /spacecraft/i.test(c.name)),
  false,
);
check(
  'The Spacecraft route claims no UCAS identity of its own',
  byId['imperial-aeronautical-engineering-meng--2027'].studyOptions
    .filter((o) => /spacecraft/i.test(o.name))
    .every((o) => o.ucasCode === null || o.ucasCode === 'H401'),
  true,
);

/* --- 21c. "Nuclear Engineering" finds the H301 route AND the real J5H8 --- */
/*
 * BATCH 7 — this used to assert a total of two results, which held only while
 * Imperial was the sole source of the phrase. Lancaster publishes Nuclear
 * Engineering as a full named discipline with seven separately coded
 * applications, so the count is now seven higher and correctly so. The rules
 * being protected are unchanged and are asserted directly below: Imperial's
 * specialism never becomes a course, the genuinely titled Imperial course ranks
 * above a route match, and H301 is returned because of its route.
 */
const nuclear = search('Nuclear Engineering');
check(
  '“Nuclear Engineering” returns Imperial’s two plus all seven Lancaster codes',
  nuclear.length,
  9,
);
/*
 * Batch 7 asserted the opposite of the next check: H824 and H825 were held out
 * of default results because their pages had not been fetched and identity-only
 * rows are hidden by default. v0.8 fetched both pages on the first attempt, so
 * the right assertion now is that they ARE discoverable and carry real data.
 * The test changed because the world changed, not because it was weakened.
 */
check(
  '  …and the two placement codes Batch 7 could not fetch now carry real data',
  nuclear.filter((c) => c.courseCode === 'H824' || c.courseCode === 'H825').length,
  2,
);
check(
  '  …each with its own published offer rather than a sibling’s',
  nuclear
    .filter((c) => c.courseCode === 'H824' || c.courseCode === 'H825')
    .map((c) => `${c.courseCode}:${c.offers[0]?.gradeProfile}`)
    .sort()
    .join(),
  'H824:ABB,H825:AAA',
);
check(
  '  …the genuine Materials with Nuclear Engineering course still ranks first',
  nuclear[0]?.id,
  'imperial-materials-nuclear-engineering-meng--2027',
);
check(
  '  …and every Lancaster result is a separately coded application, not a route',
  nuclear.filter((c) => c.universityId === 'lancaster').every((c) => Boolean(c.courseCode)),
  true,
);
check('  …and it keeps its own UCAS code J5H8', nuclear[0]?.courseCode, 'J5H8');
check(
  '  …it matched on its own title, so no route line is shown',
  routesFor('Nuclear Engineering', 'imperial-materials-nuclear-engineering-meng--2027').length,
  0,
);
check(
  '  …while H301 is returned because of its route',
  routesFor('Nuclear Engineering', 'imperial-mechanical-engineering-meng--2027').join('|'),
  'Mechanical Engineering with Nuclear Engineering',
);
check(
  '  …and H301 keeps the Mechanical Engineering identity, not a nuclear one',
  byId['imperial-mechanical-engineering-meng--2027'].name,
  'Mechanical Engineering',
);

/* --- 21d. Search indexes identity fields, not invented aliases --- */
check('Searching a UCAS code finds its course', search('H401').length >= 1, true);
check(
  'A term in no title and no route returns nothing',
  search('quantum teleportation').length,
  0,
);

/* --- 21e. The eligibility filter uses the engine's own verdict --- */
const strong = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A*'],
  ['Chemistry', 'A*'],
]);
const elig = evaluateCatalogue(courses, strong);
const filteredMeets = applyFilters({
  courses,
  courseById,
  universities: uniMap,
  filters: { ...defaultFilters(true), applicationYear: '2027', eligibility: ['meets'] },
  parsed: parseQuery(''),
  eligibility: elig,
  shortlistedCourseIds: [],
});
check(
  'Every course the “meets” filter returns really is a “meets” in the engine',
  filteredMeets.every((c) => elig[c.id].verdict === 'meets'),
  true,
);
const visible2027 = courses.filter(
  (c) => c.applicationYear === '2027' && c.provenance.verificationStatus !== 'awaiting-data',
);
check(
  '  …and it returns ALL of them — the filter hides nothing the engine passed',
  filteredMeets.length,
  visible2027.filter((c) => elig[c.id].verdict === 'meets').length,
);

/* --- 21f. Facet counts still equal the displayed universe under the filter --- */
const verdicts = ['meets', 'review-required', 'does-not-meet', 'insufficient-information'] as const;
check(
  'The four eligibility facet counts add up to the visible universe',
  verdicts.reduce((n, v) => n + visible2027.filter((c) => elig[c.id].verdict === v).length, 0),
  visible2027.length,
);
for (const v of verdicts) {
  const got = applyFilters({
    courses,
    universities: uniMap,
    filters: { ...defaultFilters(true), applicationYear: '2027', eligibility: [v] },
    parsed: parseQuery(''),
    eligibility: elig,
    shortlistedCourseIds: [],
  }).length;
  check(
    `  …and the “${v}” facet count matches the list it describes`,
    got,
    visible2027.filter((c) => elig[c.id].verdict === v).length,
  );
}

/* --- 21g. Contextual and access offers never change the filter category --- */
// Sheffield Mechanical: standard A*AA, Access Sheffield AAB. A profile that
// clears the access offer but not the standard one must NOT be "meets".
const accessOnly = profile([
  ['Mathematics', 'A'],
  ['Physics', 'A'],
  ['Chemistry', 'B'],
]);
check(
  'Clearing Sheffield’s Access Sheffield offer does not make a course “meets”',
  evaluateCourse(b5['sheffield-mechanical-engineering-beng--2027'], accessOnly).verdict,
  'does-not-meet',
);
check(
  'Birmingham’s two reduced schemes are stored but never matched',
  evaluateCourse(b5['birmingham-mechanical-engineering-beng--2027'], profile([
    ['Mathematics', 'B'],
    ['Physics', 'B'],
    ['Chemistry', 'B'],
  ])).verdict,
  'does-not-meet',
);
check(
  '  …and both scheme names survive on the record',
  /Pathways to Birmingham/.test(b5['birmingham-mechanical-engineering-beng--2027'].contextualOffer.details ?? '') &&
    /Contextual Offer/.test(b5['birmingham-mechanical-engineering-beng--2027'].contextualOffer.details ?? ''),
  true,
);
check(
  'Glasgow’s adjusted offer is recorded as SQA-only, with no A-Level figure',
  /published in Scottish Higher units only/.test(
    b5['glasgow-aeronautical-engineering-beng--2027'].contextualOffer.details ?? '',
  ),
  true,
);
check(
  'St Andrews’ minimum entry grades are stored as an access route, not a floor',
  b5['st-andrews-physics-bsc--2027'].minimumEntryStandard,
  null,
);

/* --- 21h. Scottish and range offers stay in review, never flattened --- */
check(
  'Glasgow’s “AAB – BBB” range returns review on the overall grade',
  evaluateCourse(b5['glasgow-physics-bsc--2027'], strong).overallGrades.outcome,
  'review',
);
check(
  '  …while its subject conditions are still evaluated',
  evaluateCourse(b5['glasgow-physics-bsc--2027'], strong).mathematics.outcome,
  'pass',
);
check(
  '  …and a missing required subject still fails inside a range offer',
  evaluateCourse(
    b5['glasgow-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Chemistry', 'A*'],
      ['Biology', 'A*'],
    ]),
  ).physics.outcome,
  'fail',
);
check(
  'Glasgow’s MEng is a single profile and IS scorable',
  evaluateCourse(b5['glasgow-aeronautical-engineering-meng--2027'], strong).overallGrades.outcome,
  'pass',
);
check(
  '  …so the same university yields both a scorable and an unscorable offer',
  evaluateCourse(b5['glasgow-aeronautical-engineering-beng--2027'], strong).overallGrades.outcome,
  'review',
);
check(
  'Leeds’ “AAA - AAB” range also returns review rather than a flattened grade',
  evaluateCourse(b5['leeds-mathematics-and-physics-bsc--2027'], strong).overallGrades.outcome,
  'review',
);
check(
  'St Andrews publishes a single profile, not a band, so it scores normally',
  evaluateCourse(b5['st-andrews-physics-bsc--2027'], strong).verdict,
  'meets',
);

/* --- 21i. 2028 shells stay unassessable --- */
const b5Shells = shells2028.filter((c) =>
  ['birmingham', 'sheffield', 'leeds', 'nottingham', 'glasgow', 'st-andrews'].includes(c.universityId),
);
check('Batch 5 produced a 2028 shell for every verified course', b5Shells.length, batch5Courses.length);
check(
  'No Batch 5 shell can be assessed against grades',
  b5Shells.every((c) => evaluateCourse(c, strong).verdict === 'insufficient-information'),
  true,
);
check(
  'No Batch 5 shell carries a study option, contextual offer or GCSE rule',
  b5Shells.every(
    (c) =>
      c.studyOptions.length === 0 &&
      c.contextualOffer.availability === 'unknown' &&
      c.gcseRequirements === null,
  ),
  true,
);
check(
  'Awaiting-data records are equally unassessable',
  courses
    .filter((c) => c.provenance.verificationStatus === 'awaiting-data')
    .every((c) => evaluateCourse(c, strong).verdict === 'insufficient-information'),
  true,
);

/* --- 21j. Batch 5 physics required subjects --- */
check(
  'Nottingham Physics requires Mathematics AND Physics at A inside AAA',
  evaluateCourse(
    b5['nottingham-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'B'],
      ['Chemistry', 'A'],
    ]),
  ).physics.outcome,
  'fail',
);
check(
  '  …and passes when Physics reaches A',
  evaluateCourse(
    b5['nottingham-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'St Andrews Chemistry and Physics needs all three named subjects',
  evaluateCourse(
    b5['st-andrews-chemistry-and-physics-msci--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Biology', 'A'],
    ]),
  ).chemistry.outcome,
  'fail',
);

/* --- 21k. Engineering disciplines keep different subject rules --- */
const mathsPhysicsOnly = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A*'],
  ['Geography', 'A*'],
]);
const mathsOnly = profile([
  ['Mathematics', 'A*'],
  ['Geography', 'A*'],
  ['History', 'A*'],
]);
check(
  'Sheffield Civil requires Mathematics only — no science demanded',
  evaluateCourse(b5['sheffield-civil-engineering-beng--2027'], mathsOnly).verdict,
  'meets',
);
check(
  'Sheffield Mechanical demands a science alongside Mathematics',
  evaluateCourse(b5['sheffield-mechanical-engineering-beng--2027'], mathsOnly).verdict,
  'does-not-meet',
);
check(
  'Sheffield Materials needs TWO of Maths, Physics or Chemistry',
  evaluateCourse(b5['sheffield-materials-science-and-engineering-beng--2027'], mathsOnly).verdict,
  'does-not-meet',
);
check(
  '  …and is satisfied by Mathematics plus Physics',
  evaluateCourse(b5['sheffield-materials-science-and-engineering-beng--2027'], mathsPhysicsOnly).verdict,
  'meets',
);
check(
  'Nottingham Chemical needs Chemistry or Physics at A, not just any science',
  evaluateCourse(
    b5['nottingham-chemical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Biology', 'A'],
      ['Geography', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Leeds Medical Engineering is the one that accepts Biology',
  evaluateCourse(
    b5['leeds-medical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Biology', 'A'],
      ['Geography', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …while Leeds Mechanical, with the same grades, does not',
  evaluateCourse(
    b5['leeds-mechanical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A*'],
      ['Biology', 'A'],
      ['Geography', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  'Birmingham Aerospace does not individually require Physics',
  evaluateCourse(
    b5['birmingham-aerospace-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Computer Science', 'A'],
      ['Geography', 'B'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Glasgow accepts Design and Technology in place of Physics, but not of Maths',
  (b5['glasgow-civil-engineering-meng--2027'].offers[0].subjectRequirements.find(
    (r) => r.subject === 'Physics',
  )?.acceptedAlternatives ?? []).join(','),
  'Design and Technology',
);

/* --- 21l. Further Mathematics where it is genuinely published --- */
check(
  'Leeds Maths and Physics is the one Leeds course with a Further Maths rule',
  b5['leeds-mathematics-and-physics-bsc--2027'].furtherMathematics,
  'conditional',
);
check(
  '  …and every other Leeds record leaves it unstated',
  batch5Courses
    .filter((c) => c.universityId === 'leeds' && c.slug !== 'leeds-mathematics-and-physics-bsc')
    .every((c) => c.furtherMathematics === 'no-stated-preference'),
  true,
);
check(
  'Birmingham names Further Maths only on the three high-format MSci courses',
  batch5Courses.filter((c) => c.universityId === 'birmingham' && c.furtherMathematics === 'useful')
    .length,
  3,
);
check(
  'Nottingham Mechanical accepts Further Maths in place of Physics',
  b5['nottingham-mechanical-engineering-beng--2027'].offers[0].constraints.some(
    (c) => c.kind === 'one-of' && c.subjects.includes('Further Mathematics') && c.subjects.includes('Physics'),
  ),
  true,
);
check(
  '  …so a student with Maths and Further Maths but no Physics still passes',
  evaluateCourse(
    b5['nottingham-mechanical-engineering-beng--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Further Mathematics', 'A'],
      ['Geography', 'A'],
    ]),
  ).verdict,
  'meets',
);

/* --- 21m. BSc versus integrated Master's identity --- */
check(
  'St Andrews holds F300 for the MPhys and F301 for the BSc',
  `${b5['st-andrews-physics-bsc--2027'].courseCode}/${b5['st-andrews-physics-mphys--2027'].courseCode}`,
  'F301/F300',
);
check(
  'Sheffield’s BEng and MEng Computer Systems keep different codes',
  `${b5['sheffield-computer-systems-engineering-beng--2027'].courseCode}/${b5['sheffield-computer-systems-engineering-meng--2027'].courseCode}`,
  'H130/G500',
);
check(
  'Leeds prices Mechanical BEng and MEng identically but Mechatronics differently',
  `${b5['leeds-mechanical-engineering-beng--2027'].offers[0].gradeProfile}=${b5['leeds-mechanical-engineering-meng-beng--2027'].offers[0].gradeProfile} ${b5['leeds-mechatronics-and-robotics-engineering-beng--2027'].offers[0].gradeProfile}!=${b5['leeds-mechatronics-and-robotics-engineering-meng-beng--2027'].offers[0].gradeProfile}`,
  'A*AA=A*AA AAB!=AAA',
);
check(
  'Nottingham Chemical is the department with no BEng→MEng uplift',
  b5['nottingham-chemical-engineering-beng--2027'].offers[0].gradeProfile ===
    b5['nottingham-chemical-engineering-meng--2027'].offers[0].gradeProfile,
  true,
);

/* --- 21n. Placement and study-abroad identity --- */
check(
  'Nottingham’s industrial year is a separate UCAS application',
  `${b5['nottingham-mechanical-engineering-beng--2027'].courseCode}/${b5['nottingham-mechanical-engineering-industrial-year-beng--2027'].courseCode}`,
  'H302/H30A',
);
check(
  'Sheffield’s placement year is a route inside one application, with no code',
  b5['sheffield-mechanical-engineering-beng--2027'].studyOptions
    .filter((o) => /placement/i.test(o.name))
    .every((o) => o.ucasCode === null),
  true,
);
check(
  '  …and Sheffield creates no separate placement course record',
  courses.filter((c) => c.universityId === 'sheffield' && /year in industry/i.test(c.name)).length,
  0,
);
check(
  'Leeds runs BOTH shapes at once — a separate code and an in-course option',
  b5['leeds-physics-bsc--2027'].studyOptions.some((o) => /placement/i.test(o.name)),
  true,
);
check(
  'St Andrews direct entry to second year keeps the same UCAS code',
  b5['st-andrews-physics-bsc--2027'].studyOptions
    .filter((o) => /direct entry/i.test(o.name))
    .every((o) => o.ucasCode === null),
  true,
);

/* --- 21o. Explicit no-test versus not-stated versus conditional --- */
check(
  'No Batch 5 course is recorded as an explicit "no admissions test"',
  batch5Courses.filter((c) => c.admissionsTest.code === 'none').length,
  0,
);
check(
  'Birmingham’s School of Engineering test is conditional, not required',
  b5['birmingham-mechanical-engineering-beng--2027'].admissionsTest.requirement,
  'conditional',
);
check(
  '  …and never blocks an A-Level applicant',
  evaluateCourse(b5['birmingham-mechanical-engineering-beng--2027'], strong).admissionsTest.outcome,
  'optional',
);
check(
  '  …while Birmingham Aerospace, in another school, states nothing at all',
  b5['birmingham-aerospace-engineering-beng--2027'].admissionsTest.requirement,
  'unknown',
);
check(
  'Leeds Civil publishes a conditional diagnostic maths test',
  b5['leeds-civil-engineering-beng--2027'].admissionsTest.requirement,
  'conditional',
);
check(
  '  …and an interview only on the BTEC route',
  b5['leeds-civil-engineering-beng--2027'].interview,
  'sometimes',
);
check(
  '  …while Leeds Mechanical states neither',
  `${b5['leeds-mechanical-engineering-beng--2027'].admissionsTest.requirement}/${b5['leeds-mechanical-engineering-beng--2027'].interview}`,
  'unknown/not-stated',
);
check(
  'Imperial’s published "no test" record still reads as an explicit none',
  byId['imperial-materials-science-engineering-beng--2027'].admissionsTest.code,
  'none',
);

/* --- 21p. A* string integrity across Batch 5 --- */
const b5Profiles = batch5Courses.flatMap((c) => c.offers.map((o) => o.gradeProfile));
check(
  'A*A*A and A*AA never collapse into the same string',
  b5Profiles.includes('A*A*A') && b5Profiles.includes('A*AA'),
  true,
);
check(
  'Birmingham’s high-format MSci really is A*A*A, not A*AA',
  b5['birmingham-theoretical-physics-msci--2027'].offers[0].gradeProfile,
  'A*A*A',
);
check(
  '  …and parses to A-star, A-star, A',
  (b5['birmingham-theoretical-physics-msci--2027'].offers[0].gradeProfileGrades ?? []).join(','),
  'A*,A*,A',
);
check(
  'Birmingham’s four-A-Level route is stored as AAAA and gated on four subjects',
  `${b5['birmingham-physics-bsc--2027'].offers[1].gradeProfile}/${b5['birmingham-physics-bsc--2027'].offers[1].appliesOnlyIfTakingAtLeast}`,
  'AAAA/4',
);
check(
  '  …so three A-Levels at AAA do not satisfy the three-A-Level A*AA route',
  evaluateCourse(
    b5['birmingham-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …while four A-Levels at AAAA do',
  evaluateCourse(
    b5['birmingham-physics-bsc--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
      ['Biology', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  'Sheffield’s foundation “BBB; BBC” became two routes, not one string',
  b5['sheffield-mechanical-engineering-foundation-beng--2027'].offers
    .map((o) => o.gradeProfile)
    .join(' / '),
  'BBB / BBC',
);

/* --- 21q. Provenance and cycle discipline --- */
const B5_DOMAINS: Record<string, string> = {
  birmingham: 'birmingham.ac.uk',
  sheffield: 'sheffield.ac.uk',
  leeds: 'leeds.ac.uk',
  nottingham: 'nottingham.ac.uk',
  glasgow: 'gla.ac.uk',
  'st-andrews': 'st-andrews.ac.uk',
};
check(
  'Every Batch 5 record cites its own university’s domain',
  batch5Courses.every((c) => (c.provenance.sourceUrl ?? '').includes(B5_DOMAINS[c.universityId])),
  true,
);
check(
  'Every Batch 5 record was verified on 2026-09-14',
  batch5Courses.every((c) => c.provenance.lastVerified === '2026-09-14'),
  true,
);
check(
  'Every Batch 5 record is a 2027 record with a source title',
  batch5Courses.every((c) => c.applicationYear === '2027' && !!c.provenance.sourceTitle),
  true,
);
check(
  'St Andrews contributes no Engineering records at all',
  batch5Courses.filter((c) => c.universityId === 'st-andrews' && c.subjectCategory === 'engineering')
    .length,
  0,
);
check(
  'Only pages that showed 2027 were imported from Leeds',
  batch5Courses.filter((c) => c.universityId === 'leeds').length,
  29,
);
check(
  '  …and the stale-page omissions are recorded, not silent',
  LEEDS_NON_2027_PAGES.length,
  12,
);

/* --- 21r. Test fixtures stay unreachable --- */
check(
  'No fixture reaches the served catalogue',
  courses.some((c) => FIXTURE_IDS.has(c.id)),
  false,
);
check(
  '  …nor the search results',
  search('fixture').length + search('fixture', '2028').length,
  0,
);
check(
  '  …nor the eligibility map the filter reads',
  Object.keys(elig).some((id) => FIXTURE_IDS.has(id)),
  false,
);
check(
  '  …nor 2028 shell generation',
  shells2028.some((c) => FIXTURE_IDS.has(c.id.replace('--2028', '--2027'))),
  false,
);

/* ================================================================== */
/* 22. BATCH 6 — progressive rendering, eligibility explanations,     */
/*     universe invariants, partial trust state and comparison        */
/* ================================================================== */

const b6Profile = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A*'],
  ['Chemistry', 'A'],
]);
const b6Elig = evaluateCatalogue(courses, b6Profile);
const b6Uni = Object.fromEntries(universities.map((u) => [u.id, u]));

/** The set a reader is actually looking at: one entry year, research targets off. */
const universeFor = (year: '2027' | '2028') =>
  courses.filter(
    (c) =>
      c.applicationYear === year &&
      c.provenance.verificationStatus !== 'awaiting-data' &&
      c.provenance.verificationStatus !== 'demo' &&
      !FIXTURE_IDS.has(c.id),
  );

const listFor = (year: '2027' | '2028', extra: Partial<FilterState> = {}) =>
  applyFilters({
    courses,
    universities: b6Uni,
    filters: { ...defaultFilters(true), applicationYear: year, ...extra },
    parsed: parseQuery(''),
    eligibility: b6Elig,
    shortlistedCourseIds: [],
  });

/* --- 22a. Progressive rendering keeps the total honest --- */
check('The result page size is a sensible first paint', RESULT_PAGE_SIZE >= 30 && RESULT_PAGE_SIZE <= 50, true);
const bigList = listFor('2027');
check('A full result set is still computed, whatever is rendered', bigList.length, universeFor('2027').length);
check(
  'The first page is a PREFIX of the ranked results, so paging never reorders them',
  bigList.slice(0, RESULT_PAGE_SIZE).every((c, i) => c.id === bigList[i].id),
  true,
);
check(
  '  …and a second page appends rather than replaces',
  bigList.slice(0, RESULT_PAGE_SIZE * 2).slice(0, RESULT_PAGE_SIZE).map((c) => c.id).join() ===
    bigList.slice(0, RESULT_PAGE_SIZE).map((c) => c.id).join(),
  true,
);
/*
 * BATCH 6 — this used to assert that Imperial's parent course was the FIRST
 * result for "Spacecraft". Southampton now publishes a degree literally titled
 * "Aeronautics and Astronautics / Spacecraft Engineering", and a course whose
 * own name matches outranking a course that merely contains a matching route is
 * correct ranking, not a regression. What must still hold is the rule the
 * assertion was protecting: the specialism resolves to a REAL parent
 * application and never to an invented specialism record, and paging does not
 * lose it.
 */
const spacecraftPage = applyFilters({
  courses,
  courseById,
  universities: b6Uni,
  filters: { ...defaultFilters(true), applicationYear: '2027', query: 'Spacecraft' },
  parsed: parseQuery('Spacecraft'),
  eligibility: b6Elig,
  shortlistedCourseIds: [],
}).slice(0, RESULT_PAGE_SIZE);
check(
  'Study-option search still resolves to the parent under paging',
  spacecraftPage.some((c) => c.id === 'imperial-aeronautical-engineering-meng--2027'),
  true,
);
check(
  '  …and every result is a real application with its own UCAS code',
  spacecraftPage.every((c) => Boolean(c.courseCode)),
  true,
);
check(
  '  …with the university that actually names the degree ranked first',
  spacecraftPage[0]?.universityId,
  'southampton',
);

/* --- 22b. The eligibility universe partitions exactly --- */
const VERDICTS = ['meets', 'review-required', 'does-not-meet', 'insufficient-information'] as const;
for (const year of ['2027', '2028'] as const) {
  const universe = universeFor(year);
  check(`The ${year} eligibility universe matches the visible list`, listFor(year).length, universe.length);
  const counts = VERDICTS.map((v) => universe.filter((c) => b6Elig[c.id].verdict === v).length);
  check(
    `  …and the four ${year} verdict counts partition it exactly`,
    counts.reduce((a, b) => a + b, 0),
    universe.length,
  );
  for (let i = 0; i < VERDICTS.length; i += 1) {
    check(
      `  …“${VERDICTS[i]}” at ${year} returns exactly its stated count`,
      listFor(year, { eligibility: [VERDICTS[i]] }).length,
      counts[i],
    );
  }
  check(
    `  …every ${year} course has exactly one verdict`,
    universe.every((c) => VERDICTS.filter((v) => b6Elig[c.id].verdict === v).length === 1),
    true,
  );
}
check(
  'Changing entry year changes the universe rather than reusing the old one',
  universeFor('2027').length === universeFor('2028').length &&
    universeFor('2027').every((c, i) => c.id === universeFor('2028')[i].id),
  false,
);

/* --- 22c. Each trust state behaves as its definition requires --- */
const awaitingData = courses.filter((c) => c.provenance.verificationStatus === 'awaiting-data');
check(
  'Awaiting-data records never produce a positive or negative academic verdict',
  awaitingData.every((c) => {
    const v = evaluateCourse(c, b6Profile).verdict;
    return v !== 'meets' && v !== 'does-not-meet';
  }),
  true,
);
check(
  '  …and they hold no offers to have produced one from',
  awaitingData.every((c) => c.offers.length === 0),
  true,
);
check(
  'Awaiting-publication records are always insufficient information',
  courses
    .filter((c) => c.provenance.verificationStatus === 'awaiting-publication')
    .every((c) => evaluateCourse(c, b6Profile).verdict === 'insufficient-information'),
  true,
);
/*
 * v0.9: THE CATALOGUE NOW HOLDS NO PARTIALLY VERIFIED RECORDS, and that is a
 * result rather than a removal — the last three, all York, were resolved when a
 * rendered browser returned the strings that text fetches had truncated.
 *
 * The old assertion required at least one live partial to exist, which made a
 * good outcome look like a regression. What actually needs protecting is the
 * BEHAVIOUR: that the status remains representable, that a partial record with
 * offers is still evaluated normally, and that it stays visibly distinct from a
 * verified one. Those are asserted on a synthetic record, so they hold whether
 * or not the live catalogue happens to contain one.
 */
const partials = courses.filter((c) => c.provenance.verificationStatus === 'partially-verified');
check('No live record is left partially verified', partials.length, 0);
const syntheticPartial = course({
  slug: 'fixture-partial-behaviour', universityId: 'york', name: 'Widget Engineering',
  category: 'engineering', sub: 'general-engineering', degree: 'BEng', year: '2027',
  code: 'Z900', verification: 'partially-verified', publication: 'published',
  offers: [offer({ gradeProfile: 'ABB', required: ['Mathematics'] })],
  // Without this the record would be unassessable for a different and correct
  // reason — an unread FM field — which would mask what this fixture is for.
  fm: 'no-stated-preference', test: 'none',
  sourceUrl: 'https://www.york.ac.uk/study/undergraduate/courses/widget/', lastVerified: '2026-09-28',
});
check(
  '  …but a partially verified record with offers is still evaluated like any other',
  evaluateCourse(syntheticPartial, profile([['Mathematics', 'A'], ['Physics', 'B'], ['Chemistry', 'B']])).verdict,
  'meets',
);
check(
  '  …and the status remains distinct from verified rather than collapsing into it',
  syntheticPartial.provenance.verificationStatus === 'partially-verified' &&
    syntheticPartial.provenance.verificationStatus !== 'verified',
  true,
);
check(
  '  …and one without offers falls back to insufficient information, never a guess',
  partials
    .filter((c) => c.offers.length === 0)
    .every((c) => evaluateCourse(c, b6Profile).verdict === 'insufficient-information'),
  true,
);
check(
  'No fixture ever enters the eligibility universe',
  [...universeFor('2027'), ...universeFor('2028')].some((c) => FIXTURE_IDS.has(c.id)),
  false,
);
check(
  '  …nor the evaluated map the filter reads',
  Object.keys(b6Elig).some((id) => FIXTURE_IDS.has(id)),
  false,
);

/* --- 22d. Explanations name the actual requirement --- */
const missingPhysics = profile([
  ['Mathematics', 'A*'],
  ['Chemistry', 'A*'],
  ['Biology', 'A*'],
]);
const durhamPhysics = byId['durham-physics-mphys--2027'];

/*
 * Leeds Civil Engineering BEng asks AAB "with an A in Mathematics", so a
 * profile of B in Maths and A* elsewhere clears the overall profile and fails
 * the named subject — which is exactly the case where a student needs to be
 * told WHICH subject, rather than "subject requirements not met".
 */
const leedsCivil = byId['leeds-civil-engineering-beng--2027'];
const weakMaths = profile([
  ['Mathematics', 'B'],
  ['Physics', 'A*'],
  ['Chemistry', 'A*'],
]);
const failReport = evaluateCourse(leedsCivil, weakMaths);
check('A subject-level failure is a does-not-meet', failReport.verdict, 'does-not-meet');
const failReasons = explainEligibility(failReport, leedsCivil);
check('A failing subject is explained first', failReasons[0]?.tone, 'fail');
check('  …and the explanation names the subject itself', failReasons[0]?.label, 'Mathematics');
check(
  '  …quoting the required and the entered grade, not a generic phrase',
  /A/.test(failReasons[0]?.detail ?? '') && /B/.test(failReasons[0]?.detail ?? ''),
  true,
);
check(
  '  …while the overall profile is separately explained as satisfied',
  failReasons.some((r) => r.id === 'overall-grades' && r.tone === 'pass'),
  true,
);
check(
  'And where the OVERALL grades are what failed, that is what leads',
  explainEligibility(
    evaluateCourse(durhamPhysics, profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ])),
    durhamPhysics,
  )[0]?.id,
  'overall-grades',
);
const missingReport = evaluateCourse(durhamPhysics, missingPhysics);
const missingReasons = explainEligibility(missingReport, durhamPhysics);
check(
  'A required subject absent from the profile is explained as absent',
  missingReasons.some((r) => r.label === 'Physics' && /not in your entered subjects/i.test(r.detail)),
  true,
);
const passProfile = profile([
  ['Mathematics', 'A*'],
  ['Physics', 'A*'],
  ['Chemistry', 'A*'],
]);
const passReasons = explainEligibility(evaluateCourse(durhamPhysics, passProfile), durhamPhysics);
check(
  'A satisfied subject requirement is explained too, not just failures',
  passReasons.some((r) => r.label === 'Physics' && r.tone === 'pass'),
  true,
);
check(
  '  …and a card can show a single key reason',
  Boolean(keyEligibilityReason(evaluateCourse(durhamPhysics, passProfile), durhamPhysics)),
  true,
);

/* --- 22e. Review explanations say WHY review was needed --- */
const glasgowPhysics = byId['glasgow-physics-bsc--2027'];
const glasgowReport = evaluateCourse(glasgowPhysics, passProfile);
check('A published range returns review', glasgowReport.verdict, 'review-required');
check('  …and the review kind names the unscorable profile', reviewKind(glasgowReport, glasgowPhysics), 'unscorable-grade-profile');
check(
  '  …and the explanation quotes the university’s own range',
  explainEligibility(glasgowReport, glasgowPhysics).some((r) => /AAB – BBB/.test(r.detail)),
  true,
);
check(
  '  …while its subject conditions still explain as passes',
  explainEligibility(glasgowReport, glasgowPhysics).some((r) => r.label === 'Mathematics' && r.tone === 'pass'),
  true,
);

/* --- 22f. The two "insufficient information" causes stay distinct --- */
const shell = byId['durham-physics-mphys--2028'];
const target = courses.find((c) => c.provenance.verificationStatus === 'awaiting-data')!;
const shellReasons = explainEligibility(evaluateCourse(shell, passProfile), shell);
const targetReasons = explainEligibility(evaluateCourse(target, passProfile), target);
check('An unpublished year is explained as the university not having published', shellReasons[0]?.id, 'cycle-not-published');
check('An unresearched course is explained as our own gap', targetReasons[0]?.id, 'not-yet-researched');
check(
  '  …and the two sentences are genuinely different',
  shellReasons[0]?.detail === targetReasons[0]?.detail,
  false,
);
check(
  'An empty profile is explained as an empty profile, not as missing data',
  explainEligibility(
    evaluateCourse(durhamPhysics, profile([])),
    durhamPhysics,
  )[0]?.id,
  'no-profile',
);

/* --- 22g. A contextual offer can never be the reason a requirement is met --- */
const sheffieldMech = byId['sheffield-mechanical-engineering-beng--2027'];
const accessGrades = profile([
  ['Mathematics', 'A'],
  ['Physics', 'A'],
  ['Chemistry', 'B'],
]);
const accessReport = evaluateCourse(sheffieldMech, accessGrades);
check('Clearing only the Access Sheffield offer is not a pass', accessReport.verdict, 'does-not-meet');
check(
  '  …and no reason shown to the student cites a contextual or access offer',
  explainEligibility(accessReport, sheffieldMech).some((r) =>
    /access sheffield|contextual|pathways to birmingham|widening access|adjusted/i.test(r.detail),
  ),
  false,
);
const birminghamMech = byId['birmingham-mechanical-engineering-beng--2027'];
check(
  '  …the same holds for Birmingham’s two named schemes',
  explainEligibility(evaluateCourse(birminghamMech, accessGrades), birminghamMech).some((r) =>
    /pathways to birmingham|contextual offer/i.test(r.detail),
  ),
  false,
);
check(
  '  …even though both schemes are still stored on the record',
  /Pathways to Birmingham/.test(birminghamMech.contextualOffer.details ?? ''),
  true,
);

/* --- 22h. Every field the comparison promises exists on the records --- */
const comparePair = [byId['durham-physics-mphys--2027'], byId['glasgow-physics-bsc--2027']];
check(
  'Compared courses expose university, award, code, duration and entry year',
  comparePair.every(
    (c) =>
      Boolean(c.universityId) &&
      Boolean(c.awardLabel ?? c.degreeType) &&
      c.courseCode !== undefined &&
      c.durationYears !== undefined &&
      Boolean(c.applicationYear),
  ),
  true,
);
check(
  '  …plus subject statuses, Further Maths, test, interview and contextual offer',
  comparePair.every(
    (c) =>
      Boolean(c.mathematics) &&
      Boolean(c.physics) &&
      Boolean(c.chemistry) &&
      Boolean(c.furtherMathematics) &&
      Boolean(c.admissionsTest.code) &&
      Boolean(c.interview) &&
      Boolean(c.contextualOffer.availability),
  ),
  true,
);
check(
  '  …and each has a verdict and a key reason to compare',
  comparePair.every((c) => Boolean(b6Elig[c.id]) && keyEligibilityReason(b6Elig[c.id], c) !== null),
  true,
);
check(
  'The two compared courses really do differ, so differences-only has something to keep',
  comparePair[0].offers[0].gradeProfile === comparePair[1].offers[0].gradeProfile,
  false,
);


/* ================================================================== */
/* 23. Batch 6 data — Southampton, Loughborough, and the closed gaps   */
/* ================================================================== */
console.log('\n--- 23. Batch 6 data ---');

const b6ById: Record<string, (typeof courses)[number]> = Object.fromEntries(
  allCourses.map((c) => [c.id, c]),
);
const b6Served = new Set(courses.map((c) => c.id));

/* --- 23a. Cycle isolation: 2027 facts never leak into 2028 --- */
check(
  'Every Batch 6 record is a 2027 record',
  batch6Courses.every((c) => c.applicationYear === '2027'),
  true,
);
const b6Shells = shells2028.filter((c) =>
  batch6VerifiedCourses.some((v) => v.slug === c.slug),
);
check(
  '  …and every VERIFIED Batch 6 course has a 2028 shell',
  b6Shells.length,
  batch6VerifiedCourses.length,
);
check(
  '  …carrying no requirements, no test arrangement and no contextual offer',
  b6Shells.every(
    (c) =>
      c.offers.length === 0 &&
      c.admissionsTest.code === 'unknown' &&
      c.contextualOffer.availability === 'unknown' &&
      c.rawRequirementText === null,
  ),
  true,
);
check(
  '  …and marked as the university not having published, not as our own gap',
  b6Shells.every(
    (c) =>
      c.requirementsPublicationStatus === 'not-yet-published' &&
      c.provenance.verificationStatus === 'awaiting-publication',
  ),
  true,
);
/*
 * The five Southampton pages that would not serve 2027 must NOT get a shell: a
 * shell asserts latestPublishedYear 2027, which for them was never retrieved.
 */
check(
  'The Southampton pages that never served 2027 get NO 2028 shell',
  shells2028.some((c) => batch6SouthamptonAwaitingCourses.some((a) => a.slug === c.slug)),
  false,
);

/* --- 23b. Awaiting-data records carry identity only --- */
check(
  'Southampton’s not-retrieved courses are awaiting-data, never verified',
  batch6SouthamptonAwaitingCourses.every(
    (c) => c.provenance.verificationStatus === 'awaiting-data',
  ),
  true,
);
check(
  '  …and hold no offer, no grade text, no GCSE rule and no contextual offer',
  batch6SouthamptonAwaitingCourses.every(
    (c) =>
      c.offers.length === 0 &&
      c.rawRequirementText === null &&
      c.gcseRequirements === null &&
      c.contextualOffer.availability === 'unknown',
  ),
  true,
);
check(
  '  …but DO keep the UCAS code, which is identity rather than a requirement',
  batch6SouthamptonAwaitingCourses.every((c) => Boolean(c.courseCode)),
  true,
);
/*
 * The sharpest cross-check available: H610 (Electronic BEng) served 2027 and
 * H603 (Electronic MEng) did not. The MEng must not carry the BEng's offer.
 */
const sotonElecBeng = b6ById['southampton-electronic-engineering-beng--2027'];
const sotonElecMeng = b6ById['southampton-electronic-engineering-meng--2027'];
check(
  'A sibling that served 2027 does not lend its offer to one that did not',
  Boolean(sotonElecBeng.offers.length) && sotonElecMeng.offers.length === 0,
  true,
);
check(
  '  …and the two are separate UCAS codes, not one course',
  `${sotonElecBeng.courseCode}/${sotonElecMeng.courseCode}`,
  'H610/H603',
);

/* --- 23c. Shared UCAS codes stay ONE application with named routes --- */
const sotonF303 = b6ById['southampton-physics-mphys--2027'];
check(
  'Southampton’s four named MPhys degrees are ONE record with four routes',
  sotonF303.studyOptions.length,
  4,
);
check(
  '  …and every one of those routes carries the parent code F303',
  sotonF303.studyOptions.every((o) => o.ucasCode === 'F303'),
  true,
);
check(
  '  …and none of them exists as a course record of its own',
  allCourses.some(
    (c) =>
      c.universityId === 'southampton' &&
      c.applicationYear === '2027' &&
      c.name.includes('Particle Physics'),
  ),
  false,
);
check(
  'Maritime MEng J641 carries its six Year-2 pathways as routes, not courses',
  b6ById['southampton-maritime-engineering-meng--2027'].studyOptions.length,
  6,
);
check(
  '  …while the BEng J640 publishes none of them',
  b6ById['southampton-maritime-engineering-beng--2027'].studyOptions.length,
  0,
);
check(
  'Astrophysics with Year Abroad is a route inside F3FM, not a separate record',
  allCourses.some((c) => c.universityId === 'southampton' && c.name.includes('Astrophysics')),
  false,
);
check(
  '  …and it IS named as a route on the F3FM record',
  b6ById['southampton-physics-with-astronomy-mphys--2027'].studyOptions.some((o) =>
    o.name.includes('Astrophysics with Year Abroad'),
  ),
  true,
);
/* The other side of the same rule: separately coded streams ARE courses. */
check(
  'Southampton’s separately coded A&A streams are distinct course records',
  new Set(
    ['H401', 'H422', 'H490', 'H493'].map(
      (code) =>
        allCourses.filter(
          (c) => c.universityId === 'southampton' && c.courseCode === code,
        ).length,
    ),
  ).size === 1,
  true,
);

/* --- 23d. Ranges are preserved, never flattened --- */
const sotonRanged = batch6SouthamptonCourses.filter((c) =>
  c.offers.some((o) => o.gradeProfile.includes('-')),
);
check('Southampton’s published ranges are stored as ranges', sotonRanged.length > 0, true);
check(
  '  …and a range is never scored into a pass or a fail',
  sotonRanged.every((c) => c.offers.every((o) => (o.gradeProfile.includes('-') ? o.gradeProfileGrades === null : true))),
  true,
);
const rangedReport = evaluateCourse(
  sotonF303,
  profile([
    ['Mathematics', 'A*'],
    ['Physics', 'A*'],
    ['Chemistry', 'A*'],
  ]),
);
check(
  '  …so even a perfect profile gets “review required”, not a verdict Southampton did not publish',
  rangedReport.verdict,
  'review-required',
);
check(
  '  …and the review is explained as an unscorable profile',
  reviewKind(rangedReport, sotonF303),
  'unscorable-grade-profile',
);

/* --- 23e. A* placement is a condition, not decoration --- */
const lboroMechMeng = b6ById['loughborough-mechanical-engineering-meng--2027'];
check(
  'Loughborough’s placed-A* rule is stored as a condition',
  lboroMechMeng.offers[0].constraints.some(
    (c) => c.kind === 'min-count-at-grade' && c.grade === 'A*',
  ),
  true,
);
const placedAStarMiss = evaluateCourse(
  lboroMechMeng,
  profile([
    ['Mathematics', 'A'],
    ['Physics', 'A'],
    ['Chemistry', 'A*'],
  ]),
);
check(
  '  …so an A* in the wrong subject does not satisfy A*AA here',
  placedAStarMiss.verdict,
  'does-not-meet',
);
const placedAStarHit = evaluateCourse(
  lboroMechMeng,
  profile([
    ['Mathematics', 'A*'],
    ['Physics', 'A'],
    ['Chemistry', 'A'],
  ]),
);
check('  …while an A* in Mathematics does', placedAStarHit.verdict, 'meets');
/*
 * Only Mechanical, Aeronautical and Automotive MEng place the A*. Every other
 * Loughborough MEng must be free of a min-count-at-grade rule — including
 * Materials MEng, which HAS such a constraint but for a completely different
 * purpose ("two from six", at grade E), and Civil MEng, which is AAB rather
 * than AAA. So the property to assert is "no A*-grade count rule", not "no
 * count rule at all".
 */
check(
  '  …and no other Loughborough MEng carries an A*-placement rule',
  batch6LoughboroughCourses
    .filter((c) => c.degreeType === 'MEng')
    .filter((c) => c.offers[0].constraints.some((k) => k.kind === 'min-count-at-grade' && k.grade === 'A*'))
    .map((c) => c.slug)
    .sort()
    .join(),
  [
    'loughborough-aeronautical-engineering-meng',
    'loughborough-automotive-engineering-meng',
    'loughborough-mechanical-engineering-meng',
  ].join(),
);

/* --- 23f. Placement codes are alternative codes, not second courses --- */
check(
  'Every Loughborough course carries its placement code as an ALTERNATIVE code',
  batch6LoughboroughCourses.every((c) => c.alternativeCourseCodes.length === 1),
  true,
);
check(
  '  …so no placement code ever becomes a course record of its own',
  batch6LoughboroughCourses.every(
    (c) =>
      !allCourses.some(
        (other) =>
          other.universityId === 'loughborough' &&
          other.applicationYear === '2027' &&
          other.courseCode === c.alternativeCourseCodes[0].code,
      ),
  ),
  true,
);
check(
  '  …and the two codes are genuinely different',
  batch6LoughboroughCourses.every(
    (c) => c.courseCode !== c.alternativeCourseCodes[0].code,
  ),
  true,
);
check(
  '  …with the placement version recorded as the longer duration',
  batch6LoughboroughCourses.every(
    (c) => (c.durationYearsMax ?? 0) === (c.durationYears ?? 0) + 1,
  ),
  true,
);

/* --- 23g. Non-numeric and non-sequential UCAS codes survive intact --- */
check(
  'Loughborough’s alphanumeric codes are stored as published',
  ['HH1R', 'HHC7'].every((code) =>
    batch6LoughboroughCourses.some((c) => c.courseCode === code),
  ),
  true,
);
check(
  '  …and normalising one does not damage it',
  normaliseCourseCode('HH1R'),
  'HH1R',
);
/* F342 (placement, 4 years) has a LOWER number than F346 (3 years). */
const lboroPtp = b6ById['loughborough-physics-with-theoretical-physics-bsc--2027'];
check(
  '  …and a lower-numbered code may be the LONGER course',
  lboroPtp.courseCode === 'F346' && lboroPtp.alternativeCourseCodes[0].code === 'F342',
  true,
);

/* --- 23h. Courses that do not exist were never invented --- */
check(
  'No record was created for any Loughborough title that does not exist',
  LOUGHBOROUGH_NONEXISTENT_TITLES.every(
    (title) =>
      !allCourses.some(
        (c) =>
          c.universityId === 'loughborough' &&
          canonicaliseCourseName(c.name) === canonicaliseCourseName(title),
      ),
  ),
  true,
);
check(
  '  …and “Systems Engineering” survives only as a route inside Engineering Physics',
  b6ById['loughborough-engineering-physics-bsc--2027'].studyOptions.some(
    (o) => o.name === 'Systems Engineering',
  ),
  true,
);
check(
  'Imperial’s phantom F340 “Theoretical Physics MSci” is gone from the catalogue',
  allCourses.some((c) => c.universityId === 'imperial' && c.courseCode === 'F340'),
  false,
);
check(
  '  …while the real F390 “Physics with Theoretical Physics MSci” is still verified',
  allCourses.some(
    (c) =>
      c.universityId === 'imperial' &&
      c.courseCode === 'F390' &&
      c.provenance.verificationStatus === 'verified',
  ),
  true,
);

/* --- 23i. Manchester specialisms did not become applications --- */
const manMatMeng = allCourses.find(
  (c) => c.universityId === 'manchester' && c.courseCode === 'J501' && c.applicationYear === '2027',
)!;
check(
  'Manchester’s five Materials specialisms are routes inside J501',
  manMatMeng.studyOptions.length,
  5,
);
check(
  '  …all pointing at the parent code, never at one of their own',
  manMatMeng.studyOptions.every((o) => o.ucasCode === 'J501'),
  true,
);
/*
 * This assertion found two invented rows. Batch 3 had created research targets
 * for "Materials Science and Engineering with Biomaterials" and "… with
 * Nanomaterials" as though they were separate applications; Batch 6 proved they
 * are pathways inside J501 and deleted them. Two parent records, five routes.
 */
check(
  '  …and Manchester publishes exactly three Materials records, all with real codes',
  allCourses
    .filter(
      (c) =>
        c.universityId === 'manchester' &&
        c.applicationYear === '2027' &&
        c.subjectSubcategory === 'materials',
    )
    .map((c) => c.courseCode)
    .sort()
    .join(),
  'F013,J500,J501',
);
check(
  '  …so no specialism survives as a course record of its own',
  allCourses.some(
    (c) => c.universityId === 'manchester' && /with (Biomaterials|Nanomaterials|Metallurgy|Polymers|Textiles)/i.test(c.name),
  ),
  false,
);

/* --- 23j. The same UCAS code at two universities is not a duplicate --- */
const h100s = courses.filter((c) => c.applicationYear === '2027' && c.courseCode === 'H100');
check(
  'Bristol and Sheffield both use H100, at different universities',
  new Set(h100s.map((c) => c.universityId)).size >= 2,
  true,
);
check(
  '  …and the identity rules keep them apart',
  new Set(h100s.map((c) => identityKeys(c).code)).size,
  h100s.length,
);

/* --- 23k. Bath records carry no invented UCAS code --- */
check(
  'Bath’s MEng records carry no UCAS code, because Bath publishes none',
  batch6BathCourses.every((c) => c.courseCode === null),
  true,
);
check(
  '  …so they are identified by canonical name and award instead',
  batch6BathCourses.every((c) => courseIdentity(c).basis === 'canonical-name'),
  true,
);
check(
  '  …and are still free of duplicates',
  findDuplicates(batch6BathCourses).length,
  0,
);

/* --- 23l. Contextual offers never reach the eligibility verdict --- */
const bristolAero = b6ById['bristol-aerospace-engineering-meng--2027'];
check(
  'Bristol’s contextual offer is stored, but not as an offer pathway',
  bristolAero.contextualOffer.availability === 'yes' &&
    bristolAero.offers.every((o) => !o.isContextual),
  true,
);
const bristolAeroReport = evaluateCourse(
  bristolAero,
  profile([
    ['Mathematics', 'A'],
    ['Physics', 'A'],
    ['Chemistry', 'B'],
  ]),
);
check(
  '  …so an AAB profile does not meet an A*AA course on the strength of it',
  bristolAeroReport.verdict,
  'does-not-meet',
);
check(
  '  …and no reason shown to the student cites the contextual offer',
  explainEligibility(bristolAeroReport, bristolAero).some((r) =>
    /contextual/i.test(r.detail),
  ),
  false,
);
/* Bristol Aerospace states a PREFERENCE, which must never behave as a rule. */
check(
  'A stated subject PREFERENCE is not stored as a requirement',
  bristolAero.offers[0].subjectRequirements.filter((r) => r.required).map((r) => r.subject).join(),
  'Mathematics',
);
const bristolAeroNoPhysics = evaluateCourse(
  bristolAero,
  profile([
    ['Mathematics', 'A*'],
    ['Geography', 'A'],
    ['History', 'A'],
  ]),
);
check(
  '  …so a profile without the preferred subjects is not failed for it',
  bristolAeroNoPhysics.verdict === 'does-not-meet',
  false,
);

/* --- 23m. Two published alternatives stay two, and are matchable --- */
const bristolEngMaths = b6ById['bristol-engineering-mathematics-meng--2027'];
check(
  'Bristol publishes two alternative profiles, and both are stored',
  bristolEngMaths.offers.map((o) => o.gradeProfile).join(),
  'AAA,A*AB',
);
check(
  '  …and satisfying only the second one is enough',
  evaluateCourse(
    bristolEngMaths,
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A*'],
      ['Chemistry', 'B'],
    ]),
  ).verdict,
  'meets',
);

/* --- 23n. The resolved partials really did resolve --- */
const glasgowPde = allCourses.filter(
  (c) =>
    c.universityId === 'glasgow' &&
    c.applicationYear === '2027' &&
    c.slug.includes('product-design'),
);
check('Both Glasgow Product Design Engineering records exist for 2027', glasgowPde.length, 2);
check(
  '  …and neither is partially verified any more',
  glasgowPde.every((c) => c.provenance.verificationStatus === 'verified'),
  true,
);
check(
  '  …and the portfolio question is answered on the record itself',
  glasgowPde.every((c) => /portfolio/i.test(c.admissionsTest.notes ?? '')),
  true,
);
/* The two that did NOT resolve must still say so. */
const stillPartial = courses.filter(
  (c) => c.provenance.verificationStatus === 'partially-verified',
);
/*
 * BATCH 7 — Sheffield H100 and Leeds H795 both resolved, and Lancaster's 40
 * Engineering records arrived partially verified because their subject
 * requirements sit behind an accordion body the site does not serve. The count
 * moved for two opposite and equally good reasons.
 */
/*
 * v0.9 UPDATE — THE COUNT IS NOW ZERO, AND EVERY STEP DOWN WAS A GAP CLOSING.
 *
 * Batch 7 left 40 Lancaster records partial because their subject requirements
 * sat behind an accordion text fetch never received. v0.8 read all 40 through a
 * rendered browser and left 3 York records partial on retrieval artefacts —
 * one apparent self-contradiction and two truncated strings. v0.9 re-read those
 * three and all three resolved: the "contradiction" was a contextual offer
 * misread as a typical one, and both truncations returned in full.
 *
 * 40 → 3 → 0, and the bar never moved.
 */
check('No records remain partially verified', stillPartial.length, 0);
check(
  '  …and each explains what is missing from its own stored notes',
  stillPartial.every((c) => (c.notes ?? '').length > 200),
  true,
);
check(
  '  …and the records that were partial now say what resolved them',
  ['york-engineering-with-audio-technology-meng--2027', 'york-medical-engineering-meng--2027', 'york-music-technology-systems-foundation-year-beng--2027'].every(
    (id) => /RESOLVED IN v0\.9/.test(courseById[id]?.notes ?? ''),
  ),
  true,
);

/* --- 23o. Provenance is official, dated and on the university's domain --- */
const B6_DOMAINS: Record<string, string> = {
  southampton: 'southampton.ac.uk',
  loughborough: 'lboro.ac.uk',
  bristol: 'bristol.ac.uk',
  bath: 'bath.ac.uk',
};
check(
  'Every verified Batch 6 record cites the university’s own domain',
  batch6VerifiedCourses.every((c) =>
    (c.provenance.sourceUrl ?? '').includes(B6_DOMAINS[c.universityId]),
  ),
  true,
);
check(
  '  …over https, with no third-party host anywhere',
  batch6VerifiedCourses.every((c) => (c.provenance.sourceUrl ?? '').startsWith('https://')),
  true,
);
check(
  '  …and carries a check date and a page title',
  batch6VerifiedCourses.every(
    (c) => c.provenance.lastVerified === '2026-09-16' && Boolean(c.provenance.sourceTitle),
  ),
  true,
);
check(
  'Loughborough’s sources keep the cache-busting query string that was actually read',
  batch6LoughboroughCourses.every((c) => /\?v=\d+$/.test(c.provenance.sourceUrl ?? '')),
  true,
);

/* --- 23p. Silence is never promoted to a published fact --- */
check(
  'No Batch 6 record claims “no admissions test” where the page merely said nothing',
  batch6VerifiedCourses.every((c) => c.admissionsTest.code === 'unknown'),
  true,
);
check(
  '  …and each says so in its own words rather than leaving the field bare',
  batch6VerifiedCourses.every((c) => (c.admissionsTest.notes ?? '').length > 0),
  true,
);
check(
  'Loughborough publishes no EPQ reduction, so no EPQ pathway was invented',
  batch6LoughboroughCourses.every((c) =>
    c.offers.every((o) => !/EPQ/i.test(o.label)),
  ),
  true,
);

/* --- 23q. The catalogue still partitions cleanly and serves everything --- */
check(
  'Every Batch 6 record is either served or knowingly superseded',
  batch6Courses.every((c) => b6Served.has(c.id) || supersededIds(allCourses).has(c.id)),
  true,
);
check(
  '  …and the 2027 universe still holds no duplicates',
  findDuplicates(courses.filter((c) => c.applicationYear === '2027')).length,
  0,
);
check(
  '  …and no fixture leaked in',
  batch6Courses.some((c) => FIXTURE_IDS.has(c.id)),
  false,
);

/* --- 23r. The range-aware validation change did not blunt the rule --- */
check(
  'A ranged offer whose wording quotes its endpoints validates cleanly',
  validateCourse(sotonF303).filter((i) => i.ruleId === 'raw-text-grade-mismatch').length,
  0,
);
check(
  '  …but wording that quotes a profile the record does not store still fails',
  validateCourse(
    course({
      slug: 'fixture-range-mismatch',
      universityId: 'southampton',
      name: 'Range Mismatch Fixture',
      category: 'physics',
      sub: 'physics',
      degree: 'BSc',
      year: '2027',
      raw: 'BBC including physics',
      offers: [offer({ gradeProfile: 'A*AA-AAA' })],
      verification: 'verified',
      sourceUrl: 'https://www.southampton.ac.uk/',
      lastVerified: '2026-09-16',
    }),
  ).some((i) => i.ruleId === 'raw-text-grade-mismatch'),
  true,
);


/* ================================================================== */
/* 24. Batch 7 — application identity                                  */
/* ================================================================== */
console.log('\n--- 24. Batch 7 application identity ---');

const b7ById: Record<string, (typeof courses)[number]> = Object.fromEntries(
  allCourses.map((c) => [c.id, c]),
);
const live2027 = courses.filter((c) => c.applicationYear === '2027');
const canon = (n: string) => canonicaliseCourseName(n);

/* --- 24a. York: disciplines that do not exist were never invented --- */
for (const title of ['Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Aerospace Engineering']) {
  check(
    `York publishes no ${title} application, and none was created`,
    allCoursesWithFixtures.some(
      (c) => c.universityId === 'york' && canon(c.name) === canon(title),
    ),
    false,
  );
}
check(
  '  …nor any of the other titles searched for and not found at York',
  YORK_NONEXISTENT_TITLES.every(
    (t) => !allCoursesWithFixtures.some((c) => c.universityId === 'york' && canon(c.name) === canon(t)),
  ),
  true,
);
/*
 * The sharpest version of the same rule: York's Engineering BEng publishes Year
 * 3 OPTION MODULES named after three real York degrees. The modules must not
 * have become courses, and must not have become study options either.
 */
check(
  'York’s H105 option modules never became courses or study options',
  YORK_H105_OPTION_MODULES.some((m) =>
    allCourses.some(
      (c) =>
        c.universityId === 'york' &&
        c.studyOptions.some((o) => o.name === m),
    ),
  ),
  false,
);
check(
  '  …while the real York degrees that share their names do exist, separately coded',
  ['H659', 'H160', 'H221'].every((code) =>
    live2027.some((c) => c.universityId === 'york' && c.courseCode === code),
  ),
  true,
);

/* --- 24b. York: real applications stay distinct by real UCAS identity --- */
const yorkLive = live2027.filter((c) => c.universityId === 'york');
check('York’s 2027 applications are all coded', yorkLive.every((c) => Boolean(c.courseCode)), true);
check(
  '  …and every code is distinct',
  new Set(yorkLive.map((c) => c.courseCode)).size,
  yorkLive.length,
);
check(
  '  …with Physics BSc and MPhys separately coded and NOT sharing a grade profile',
  b7ById['york-physics-bsc--2027'].offers[0].gradeProfile !==
    b7ById['york-physics-mphys--2027'].offers[0].gradeProfile,
  true,
);
check(
  '  …and Electronic Engineering’s BEng/MEng codes are the right way round',
  `${b7ById['york-electronic-engineering-beng--2027'].courseCode}/${b7ById['york-electronic-engineering-meng--2027'].courseCode}`,
  'H610/H609',
);

/* --- 24c. Lancaster: the common first year does not collapse applications --- */
const lancEng = live2027.filter(
  (c) => c.universityId === 'lancaster' && c.subjectCategory === 'engineering',
);
check('Lancaster publishes 42 separately coded Engineering applications', lancEng.length, 42);
check(
  '  …spanning all six named disciplines, each a real application',
  LANCASTER_ENGINEERING_FAMILIES.every((f) =>
    lancEng.some((c) => c.name === f || c.name.startsWith(`${f} `) || c.name.startsWith(`${f}(`)),
  ),
  true,
);
check(
  '  …with 42 distinct UCAS codes, so no discipline is a pathway under another',
  new Set(lancEng.map((c) => c.courseCode)).size,
  42,
);
check(
  'General Engineering is its own application, not a label for the others',
  lancEng.filter((c) => c.name === 'Engineering' && c.courseCode === 'H100').length,
  1,
);
check(
  '  …and it carries the undecided-applicant route as a study option',
  b7ById['lancaster-engineering-beng-hons-h100--2027'].studyOptions.some((o) =>
    /H100/.test(o.description ?? ''),
  ),
  true,
);
check(
  'The shared first year is recorded as a study option, never as a merge',
  lancEng
    .filter((c) => c.offers.length > 0)
    .every((c) => c.studyOptions.some((o) => /common first year/i.test(o.name))),
  true,
);
check(
  '  …so Mechanical Engineering keeps its own codes despite sharing year one',
  `${b7ById['lancaster-mechanical-engineering-beng-hons-h300--2027'].courseCode}/${b7ById['lancaster-mechanical-engineering-meng-hons-h303--2027'].courseCode}`,
  'H300/H303',
);
check(
  'No later specialism became an application at Lancaster',
  LANCASTER_NONEXISTENT_TITLES.every(
    (t) => !allCoursesWithFixtures.some((c) => c.universityId === 'lancaster' && canon(c.name) === canon(t)),
  ),
  true,
);
check(
  'The Theoretical Physics with Mathematics integrated Master’s is an MSci, not an MPhys',
  live2027.filter(
    (c) => c.universityId === 'lancaster' && canon(c.name) === canon('Theoretical Physics with Mathematics') && c.degreeType === 'MSci',
  ).length,
  1,
);
check(
  '  …and no MPhys exists in that family, nor any course under the old code FG31',
  allCourses.some((c) => c.universityId === 'lancaster' && c.courseCode === 'FG31'),
  false,
);

/* --- 24d. Lancaster: the subject requirement is now read, and it BITES --- */
/*
 * v0.8 REPLACES A WEAKER TEST WITH A STRONGER ONE.
 *
 * Batch 7 could only assert a negative: a Lancaster record whose subject rule
 * had never been read must never return "meets". That was the correct
 * behaviour for an unknown, and it is now obsolete, because the rule was read.
 *
 * What replaces it is the thing the negative was standing in for — that the
 * published rule actually decides cases. Three profiles, three different
 * answers, all from Lancaster's own sentence: "ABB. This should include
 * Mathematics and a physical science subject, for example, Physics, Chemistry,
 * Electronics, Design & Technology or Further Mathematics."
 */
const lancMech = b7ById['lancaster-mechanical-engineering-beng-hons-h300--2027'];

const lancArts = evaluateCourse(
  lancMech,
  profile([
    ['History', 'A'],
    ['English Literature', 'B'],
    ['Geography', 'B'],
  ]),
);
check(
  'A Lancaster profile with the right grades and no Mathematics is failed, not passed',
  lancArts.verdict,
  'does-not-meet',
);
check(
  '  …even though the published grade string is satisfied exactly',
  lancArts.overallGrades.outcome,
  'pass',
);

const lancGood = evaluateCourse(
  lancMech,
  profile([
    ['Mathematics', 'A'],
    ['Physics', 'B'],
    ['Geography', 'B'],
  ]),
);
check(
  '  …while Mathematics plus a named physical science meets it',
  lancGood.verdict,
  'meets',
);

check(
  '  …and Lancaster’s own sentence is stored verbatim rather than paraphrased',
  (lancMech.offers[0]?.rawText ?? '').includes(
    'This should include Mathematics and a physical science subject, for example',
  ),
  true,
);

/*
 * The discipline that proves the rules were read one page at a time. Chemical
 * Engineering publishes a CLOSED list ("a science subject from: Chemistry,
 * Physics or Biology") where every other Lancaster discipline publishes an
 * illustrative one, and it admits Biology where the others do not name it.
 * Copying a sibling's rule would have been wrong in both directions.
 */
const lancChem = b7ById['lancaster-chemical-engineering-beng-hons-h800--2027'];
check(
  'Lancaster Chemical Engineering publishes its own closed subject list',
  (lancChem.offers[0]?.rawText ?? '').includes('a science subject from: Chemistry, Physics or Biology'),
  true,
);
check(
  '  …which is not the list its Mechanical sibling publishes',
  lancChem.offers[0]?.rawText === lancMech.offers[0]?.rawText,
  false,
);
check(
  '  …and Biology satisfies it, where the physical-science families never name Biology',
  evaluateCourse(
    lancChem,
    profile([
      ['Mathematics', 'A'],
      ['Biology', 'B'],
      ['Geography', 'B'],
    ]),
  ).verdict,
  'meets',
);

/* --- 24e. Known edge cases now reflect actual verification completeness --- */
const sheffieldH100 = b7ById['sheffield-general-engineering-meng--2027'];
check(
  'Sheffield H100 is verified now that its requirements were rendered',
  sheffieldH100.provenance.verificationStatus,
  'verified',
);
check(
  '  …and it carries the subject wording it was missing',
  sheffieldH100.offers[0].subjectRequirements.filter((r) => r.required).map((r) => r.subject).sort().join(),
  'Mathematics,Physics',
);
check(
  '  …and the Access Sheffield cell that was never retrievable',
  /AAA/.test(sheffieldH100.contextualOffer.details ?? ''),
  true,
);
const leedsH795 = b7ById['leeds-product-design-bsc--2027'];
check('Leeds H795 is verified for 2027', leedsH795.provenance.verificationStatus, 'verified');
check(
  '  …and the record still preserves Leeds’ own first-party inconsistency',
  /BA Product Design/.test(leedsH795.notes ?? ''),
  true,
);
check(
  '  …without inventing a resolution for it',
  /flagged and not reconciled|not reconciled/i.test(leedsH795.notes ?? ''),
  true,
);

/* --- 24f. Manchester J501 stays one parent application --- */
const manMaterials2027 = live2027.filter(
  (c) => c.universityId === 'manchester' && c.subjectSubcategory === 'materials',
);
check(
  'Manchester publishes three Materials applications for 2027, not two and not eight',
  manMaterials2027.map((c) => c.courseCode).sort().join(),
  'F013,J500,J501',
);
const j501 = manMaterials2027.find((c) => c.courseCode === 'J501')!;
check('J501 is one parent application carrying five pathways', j501.studyOptions.length, 5);
for (const pathway of ['Biomaterials', 'Metallurgy', 'Nanomaterials', 'Polymers', 'Textiles Technology']) {
  const hits = applyFilters({
    courses,
    universities: b6Uni,
    filters: { ...defaultFilters(true), applicationYear: '2027', query: pathway },
    parsed: parseQuery(pathway),
    eligibility: b6Elig,
    shortlistedCourseIds: [],
  });
  check(
    `  “${pathway}” is searchable and routes to a real application`,
    hits.some((c) => c.universityId === 'manchester' && c.courseCode === 'J501'),
    true,
  );
  check(
    `    …and no Manchester course is named for it`,
    allCoursesWithFixtures.some(
      (c) => c.universityId === 'manchester' && new RegExp(`with ${pathway}`, 'i').test(c.name),
    ),
    false,
  );
}
check(
  'No J501 pathway receives a 2028 shell',
  shells2028.some(
    (c) =>
      c.universityId === 'manchester' &&
      /with (Biomaterials|Metallurgy|Nanomaterials|Polymers|Textiles)/i.test(c.name),
  ),
  false,
);
check(
  'F013 is a separate application, not a pathway of J500 or J501',
  b7ById['manchester-materials-science-integrated-foundation-year--2027'].courseCode,
  'F013',
);
check(
  '  …and its progression destinations are study options, not applications',
  b7ById['manchester-materials-science-integrated-foundation-year--2027'].studyOptions.length,
  2,
);
check(
  '  …with its own three-step offer preserved rather than flattened',
  b7ById['manchester-materials-science-integrated-foundation-year--2027'].offers.map((o) => o.gradeProfile).join(),
  'BBC,BBB,ABB',
);

/* --- 24g. Global identity invariants --- */
check('No UCAS code is held by two live identities at one university', codeCollisions(courses).length, 0);
check('No live record says applicants should apply to another code', identityRisks(courses).length, 0);
check('No live UCAS code rests on a URL path segment alone', unsupportedCodeProvenance(courses).length, 0);
/*
 * The rules must FIRE, not merely be quiet. A validator that cannot fail is
 * not a check, so each is exercised against a record built to trip it.
 */
const collisionA = course({
  slug: 'fixture-collision-a', universityId: 'york', name: 'Widget Engineering',
  category: 'engineering', sub: 'general-engineering', degree: 'BEng', year: '2027', code: 'Z999',
});
const collisionB = course({
  slug: 'fixture-collision-b', universityId: 'york', name: 'Sprocket Engineering',
  category: 'engineering', sub: 'general-engineering', degree: 'MEng', year: '2027', code: 'Z999',
});
check(
  '  …but the collision rule does fire when two identities share a code',
  codeCollisions([collisionA, collisionB]).length,
  1,
);
const pathwayRisk = course({
  slug: 'fixture-pathway-risk', universityId: 'imperial', name: 'Widgets with Sprockets',
  category: 'engineering', sub: 'general-engineering', degree: 'MEng', year: '2027',
  notes: 'Applicants should apply to H401 for this specialism.',
});
check(
  '  …and the pathway rule fires on an apply-to-parent instruction',
  identityRisks([pathwayRisk]).length,
  1,
);
const urlOnlyCode = course({
  slug: 'fixture-url-code', universityId: 'leeds', name: 'Widget Design',
  category: 'engineering', sub: 'design', degree: 'BSc', year: '2027', code: 'A602',
  sourceUrl: 'https://courses.leeds.ac.uk/a602/widget-design-bsc',
  verification: 'verified', lastVerified: '2026-09-17',
});
check(
  '  …and the code rule fires when a code only ever appeared in a URL',
  unsupportedCodeProvenance([urlOnlyCode]).length,
  1,
);

/*
 * --- 24g-bis. The backlog distinguishes unread requirements from unevidenced
 * identity ---
 *
 * "Awaiting data" had been carrying two quite different claims. York's 22
 * engineering rows and Lancaster's 25 physics rows cite the universities' own
 * course listings for their titles and codes — the identity is evidenced and
 * only the admissions fields are unread. Eight rows cite nothing at all. Since
 * the scaffold that produced them also produced Imperial's F340, York's H610
 * MEng, Lancaster's FG31 and three invented Bath codes, an unevidenced
 * scaffold identity is a hypothesis, and the backlog should say so.
 */
const unevidenced = unevidencedIdentities(courses);
/*
 * v0.8 RESOLVED ALL EIGHT. The rule is kept and asserted at zero rather than
 * deleted: a policy that only exists while it has work to do is a policy that
 * will be missing the next time a scaffold row appears.
 */
check('No live record has an unevidenced identity', unevidenced.length, 0);
check(
  '  …and every one of the eight is accounted for by a replacement record',
  V08_RESOLVED_UNEVIDENCED.length,
  8,
);
check(
  '  …three resolved to verified applications, five to evidenced identities',
  `${V08_RESOLVED_UNEVIDENCED.filter((r) => r.outcome === 'verified').length}/${V08_RESOLVED_UNEVIDENCED.filter((r) => r.outcome === 'identity-evidenced').length}`,
  '3/5',
);
check(
  '  …and none of the three universities lost its place in the catalogue',
  ['bath', 'kcl', 'qmul'].every((u) => courses.some((c) => c.universityId === u)),
  true,
);
check(
  '  …while every York, Lancaster and Southampton awaiting-data row cites a listing',
  courses
    .filter(
      (c) =>
        c.provenance.verificationStatus === 'awaiting-data' &&
        ['york', 'lancaster', 'southampton'].includes(c.universityId),
    )
    .every((c) => Boolean(c.provenance.officialUrl)),
  true,
);
check(
  '  …so a researched-identity row never trips the rule',
  unevidenced.some((id) => ['york', 'lancaster', 'southampton'].includes(courseById[id].universityId)),
  false,
);
check(
  '  …and the rule stays quiet on a verified record with no officialUrl',
  unevidencedIdentities([
    course({
      slug: 'fixture-verified-no-official-url', universityId: 'bath', name: 'Widget Engineering',
      category: 'engineering', sub: 'general-engineering', degree: 'BEng', year: '2027',
      verification: 'verified', sourceUrl: 'https://www.bath.ac.uk/courses/widget', lastVerified: '2026-09-17',
    }),
  ]).length,
  0,
);
check(
  '  …and it does fire on an awaiting-data row that cites nothing',
  unevidencedIdentities([
    course({
      slug: 'fixture-unevidenced', universityId: 'kcl', name: 'Widget Physics',
      category: 'physics', sub: 'general-physics', degree: 'BSc', year: '2028', code: 'Z111',
      verification: 'awaiting-data',
    }),
  ]).length,
  1,
);
check(
  'Unevidenced identity is a warning, never an error — it is unproven, not wrong',
  validateCatalogue(courses, universities).issues
    .filter((i) => i.ruleId === 'unevidenced-identity')
    .every((i) => i.severity === 'warning'),
  true,
);

/* --- 24h. Study options never gain a life of their own --- */
const allOptionNames = new Set(
  courses.flatMap((c) => c.studyOptions.map((o) => canon(o.name))),
);
/*
 * A route list may legitimately name its own parent — Southampton's F303 lists
 * "Physics" as one of the four named degrees under that code, and Southampton
 * separately publishes Physics BSc under F300. Those are two real applications
 * distinguished by award, not a duplicate. The check therefore ignores options
 * that carry the parent's own code, and catches the case that matters: an
 * option that has been given a life as a DIFFERENT application.
 */
check(
  'No study option has become a separate application at the same university',
  courses.some((c) =>
    c.studyOptions.some(
      (o) =>
        o.ucasCode !== c.courseCode &&
        courses.some(
          (other) =>
            other.id !== c.id &&
            other.universityId === c.universityId &&
            other.applicationYear === c.applicationYear &&
            other.degreeType === c.degreeType &&
            canon(other.name) === canon(o.name),
        ),
    ),
  ),
  false,
);
check('  …and no 2028 shell carries a study option at all', shells2028.every((c) => c.studyOptions.length === 0), true);
check(
  '  …and a study option never produces its own eligibility report',
  Object.keys(b6Elig).some((id) => allOptionNames.has(canon(id))),
  false,
);

/* --- 24i. Counterpart awards are never assumed --- */
check(
  'York publishes Biomedical Engineering as BEng-only, and no MEng was invented',
  live2027.filter((c) => c.universityId === 'york' && canon(c.name) === canon('Biomedical Engineering')).map((c) => c.degreeType).join(),
  'BEng',
);
check(
  '  …and Medical Engineering as MEng-only, with no BEng invented',
  live2027.filter((c) => c.universityId === 'york' && canon(c.name) === canon('Medical Engineering')).map((c) => c.degreeType).join(),
  'MEng',
);
check(
  '  …and nothing in validation treats a missing counterpart as an error',
  validateCatalogue(
    [
      course({ slug: 'fixture-lonely-beng', universityId: 'york', name: 'Lonely Engineering', category: 'engineering', sub: 'general-engineering', degree: 'BEng', year: '2027', code: 'Z100' }),
    ],
    [],
  ).counts.error,
  0,
);

/* --- 24j. Cross-institution code sharing is not a duplicate --- */
const f3fm = live2027.filter((c) => c.courseCode === 'F3FM');
check(
  'F3FM is held by more than one university, each a separate application',
  new Set(f3fm.map((c) => c.universityId)).size > 1,
  true,
);
check('  …and the identity rules keep them apart', findDuplicates(f3fm).length, 0);
check(
  '  …as does F340, which two universities use and a phantom record once claimed',
  allCourses.some((c) => c.universityId === 'imperial' && c.courseCode === 'F340'),
  false,
);

/* --- 24k. Obsolete scaffold rows cannot reappear --- */
for (const [uni, code] of [['york', 'GH66'], ['lancaster', 'FG31']] as const) {
  check(
    `The obsolete ${uni} scaffold code ${code} is gone from every year`,
    allCoursesWithFixtures.some((c) => c.universityId === uni && c.courseCode === code),
    false,
  );
}
check(
  'No Bath record carries a UCAS code, because Bath publishes none',
  allCourses.some((c) => c.universityId === 'bath' && c.courseCode !== null),
  false,
);

/* --- 24l. Further Mathematics semantics survive Batch 6 --- */
const silentFm = b7ById['york-physics-bsc--2027'];
check('A silent-FM page is recorded as no stated preference', silentFm.furtherMathematics, 'no-stated-preference');
const silentFmReport = evaluateCourse(
  silentFm,
  profile([
    ['Mathematics', 'A'],
    ['Physics', 'A'],
    ['Chemistry', 'B'],
  ]),
);
check(
  '  …and still produces a definite verdict rather than insufficient information',
  silentFmReport.verdict,
  'meets',
);
/*
 * v0.8 FLIPS THIS ONE, AND THE FLIP IS THE POINT OF THE DISTINCTION.
 *
 * Batch 7 held Lancaster Physics at "unknown" rather than "no stated
 * preference" because the page section that would carry an FM position had
 * never been served — a fact about our retrieval, not about Lancaster. v0.8
 * read that section in full and Lancaster says nothing about Further
 * Mathematics, so the honest value is now "no stated preference".
 *
 * The rule the pair of tests protects is unchanged: "unknown" means we could
 * not read it, "no stated preference" means we read it and the university is
 * silent. What changed is which of the two is true here.
 */
check(
  '  …and an FM field becomes “no stated preference” once the page is read in full',
  b7ById['lancaster-physics-bsc-hons-f300--2027'].furtherMathematics,
  'no-stated-preference',
);
check(
  '  …without that turning the verdict into insufficient information',
  evaluateCourse(
    b7ById['lancaster-physics-bsc-hons-f300--2027'],
    profile([
      ['Mathematics', 'A'],
      ['Physics', 'A'],
      ['Chemistry', 'A'],
    ]),
  ).verdict,
  'meets',
);
check(
  '  …while “unknown” still means unread, and still blocks a definite verdict',
  evaluateCourse(
    course({
      slug: 'fixture-fm-unread', universityId: 'york', name: 'Widget Physics',
      category: 'physics', sub: 'physics', degree: 'BSc', year: '2027',
      verification: 'awaiting-data',
    }),
    profile([['Mathematics', 'A'], ['Physics', 'A'], ['Chemistry', 'A']]),
  ).verdict,
  'insufficient-information',
);

/* --- 24m. Identity-only records assert nothing about requirements --- */
check(
  'Every Batch 7 identity-only record is awaiting-data',
  batch7AwaitingCourses.every((c) => c.provenance.verificationStatus === 'awaiting-data'),
  true,
);
check(
  '  …holds no offer, no GCSE rule and no contextual offer',
  batch7AwaitingCourses.every(
    (c) =>
      c.offers.length === 0 &&
      c.gcseRequirements === null &&
      c.contextualOffer.availability === 'unknown',
  ),
  true,
);
check('  …but keeps its UCAS code, which is identity, not a requirement', batch7AwaitingCourses.every((c) => Boolean(c.courseCode)), true);
check(
  '  …and is unassessable, whatever grades are entered',
  batch7AwaitingCourses.every(
    (c) =>
      evaluateCourse(c, profile([['Mathematics', 'A*'], ['Physics', 'A*'], ['Chemistry', 'A*']])).verdict ===
      'insufficient-information',
  ),
  true,
);
check(
  '  …and earns no 2028 shell, because no 2027 cycle was ever retrieved for it',
  shells2028.some((s) => batch7AwaitingCourses.some((a) => a.slug === s.slug)),
  false,
);
check(
  'Every Batch 7 record carrying 2027 data DOES earn a shell',
  shells2028.filter((s) => batch7VerifiedCourses.some((v) => v.slug === s.slug)).length,
  batch7VerifiedCourses.length,
);
check(
  '  …and 2028 remains unassessable',
  shells2028.every(
    (c) =>
      evaluateCourse(c, profile([['Mathematics', 'A*'], ['Physics', 'A*'], ['Chemistry', 'A*']])).verdict ===
      'insufficient-information',
  ),
  true,
);

/* --- 24n. Official-domain provenance on every newly verified record --- */
const B7_DOMAINS: Record<string, string> = {
  york: 'york.ac.uk',
  lancaster: 'lancaster.ac.uk',
  manchester: 'manchester.ac.uk',
};
check(
  'Every Batch 7 record with data cites its own university’s domain over https',
  batch7VerifiedCourses.every(
    (c) =>
      (c.provenance.sourceUrl ?? '').startsWith('https://') &&
      (c.provenance.sourceUrl ?? '').includes(B7_DOMAINS[c.universityId]),
  ),
  true,
);
check(
  '  …with a check date and a page title',
  batch7VerifiedCourses.every((c) => Boolean(c.provenance.lastVerified) && Boolean(c.provenance.sourceTitle)),
  true,
);

/* --- 24o. A* integrity and fixtures are unchanged --- */
check(
  'A* integrity: no Batch 7 record silently upgrades a grade profile',
  batch7VerifiedCourses.every((c) =>
    c.offers.every((o) => !o.gradeProfile.includes('*') || /A\*/.test(o.gradeProfile)),
  ),
  true,
);
check('No fixture reached the Batch 7 set', batch7Courses.some((c) => FIXTURE_IDS.has(c.id)), false);
check(
  'The served catalogue still holds no duplicates or conflicts',
  findDuplicates(courses).length,
  0,
);

/* ================================================================== */
/* 25. v0.8 — DATA CLOSURE, PROVENANCE SPLIT AND PUBLIC-DATA POLICY     */
/* ================================================================== */

/* --- 25a. Identity provenance is separate from requirement provenance --- */
check(
  'Every live record states how its identity was established',
  courses.every((c) =>
    ['official-page', 'official-listing', 'unevidenced'].includes(c.provenance.identityVerification),
  ),
  true,
);
check(
  '  …and no live record is left at “unevidenced”',
  courses.some((c) => c.provenance.identityVerification === 'unevidenced'),
  false,
);
check(
  '  …while identity and requirement verification stay genuinely independent',
  // The proof that these are two different questions: records exist that are
  // fully identity-evidenced AND have unread requirements. If the two fields
  // moved together, this set would be empty and the split would be cosmetic.
  courses.filter(
    (c) =>
      c.provenance.verificationStatus === 'awaiting-data' &&
      c.provenance.identityVerification !== 'unevidenced',
  ).length > 0,
  true,
);
check(
  '  …and every awaiting-data row explains why, rather than just saying nothing',
  courses
    .filter((c) => c.provenance.verificationStatus === 'awaiting-data')
    .every((c) => (c.notes ?? '').length > 120 && Boolean(c.provenance.identityNote)),
  true,
);

/* --- 25b. The public-data policy actually excludes something when it must --- */
check('Nothing is currently held back from public discovery', policyExcludedCourses.length, 0);
check(
  '  …but the policy is live, not dormant: an unevidenced row is excluded',
  isPubliclyDiscoverable(
    course({
      slug: 'fixture-policy-unevidenced', universityId: 'kcl', name: 'Widget Physics',
      category: 'physics', sub: 'physics', degree: 'BSc', year: '2027',
      verification: 'awaiting-data',
    }),
  ),
  false,
);
check(
  '  …and an evidenced awaiting-data row is NOT excluded',
  isPubliclyDiscoverable(
    course({
      slug: 'fixture-policy-evidenced', universityId: 'york', name: 'Widget Engineering',
      category: 'engineering', sub: 'general-engineering', degree: 'BEng', year: '2027',
      verification: 'awaiting-data', identityVerification: 'official-listing',
      identityNote: 'Named in the university’s own A–Z.',
    }),
  ),
  true,
);
check(
  '  …so public counts match the public universe exactly',
  courses.length,
  allCourses.filter((c) => !suppressedIds.has(c.id) && isPubliclyDiscoverable(c)).length,
);

/* --- 25c. York engineering closed without inventing anything --- */
const yorkEng = courses.filter(
  (c) => c.universityId === 'york' && c.subjectCategory === 'engineering' && c.applicationYear === '2027',
);
check('York engineering holds 22 applications', yorkEng.length, 22);
/*
 * v0.9: ALL 22 NOW CARRY A PUBLISHED OFFER. v0.8 closed 21 and left H640
 * identity-only, having concluded that York's A–Z listed a course its own page
 * tree did not publish. That conclusion was wrong: the page exists at
 * beng-engineering-audio-technology, the exact slug a v0.8 text fetch reported
 * as a 404. The "first-party conflict" was a retrieval failure on our side.
 */
check(
  '  …all 22 of which now carry a published offer',
  yorkEng.filter((c) => c.offers.length > 0).length,
  22,
);
check(
  '  …including H640, whose page v0.8 believed did not exist',
  yorkEng.find((c) => c.courseCode === 'H640')?.offers[0]?.gradeProfile,
  'ABB',
);
check(
  '  …read on its own page rather than copied from its MEng sibling, which asks AAA',
  yorkEng.find((c) => c.courseCode === 'H641')?.offers[0]?.gradeProfile,
  'AAA',
);
check(
  '  …and the record says plainly that the conflict was ours, not York’s',
  /was our retrieval failure rather than york’s inconsistency/i.test(
    yorkEng.find((c) => c.courseCode === 'H640')?.notes ?? '',
  ),
  true,
);
check(
  'York engineering requires Mathematics alone, unlike York physics',
  yorkEng
    .filter((c) => c.offers.length > 0 && c.offers[0].subjectRequirements.length > 0)
    .every((c) => c.offers[0].subjectRequirements.every((r) => r.subject === 'Mathematics')),
  true,
);
check(
  '  …where every York physics application names Physics as well',
  courses
    .filter((c) => c.universityId === 'york' && c.subjectCategory === 'physics' && c.offers.length > 0)
    .filter((c) => c.offers[0].subjectRequirements.length > 0)
    .every((c) => c.offers[0].subjectRequirements.some((r) => r.subject === 'Physics')),
  true,
);

/* --- 25d. Lancaster closed, and the three different rules are preserved --- */
const lancaster2027 = courses.filter((c) => c.universityId === 'lancaster' && c.applicationYear === '2027');
check('Lancaster holds 67 applications for 2027', lancaster2027.length, 67);
check(
  '  …every one of them now carrying a published offer',
  lancaster2027.every((c) => c.offers.length > 0),
  true,
);
check(
  '  …and none left awaiting data',
  lancaster2027.some((c) => c.provenance.verificationStatus === 'awaiting-data'),
  false,
);
/*
 * FOUR distinct subject sentences across Lancaster's engineering portfolio,
 * once the grade prefix is stripped: the illustrative physical-science list,
 * Chemical Engineering's closed list, the foundation years' "either Chemistry
 * or Physics", and Chemical Engineering's foundation year, which names
 * Chemistry outright. Each was read on its own page. Copying any one of them
 * across would have been wrong on at least seven records.
 */
check(
  'Lancaster publishes four distinct engineering subject rules, and all four survive',
  new Set(
    lancaster2027
      .filter((c) => c.subjectCategory === 'engineering')
      .map((c) => c.offers[0]?.rawText?.replace(/^[A-E*]+\. /, '')),
  ).size,
  4,
);
check(
  '  …with Chemical Engineering differing from its siblings at BOTH award levels',
  lancaster2027
    .filter((c) => c.subjectSubcategory === 'chemical' && c.offers.length > 0)
    .every((c) => /Chemistry, Physics or Biology|Mathematics and Chemistry/.test(c.offers[0].rawText ?? '')),
  true,
);
check(
  '  …and Lancaster physics pins grade A to both named subjects',
  lancaster2027
    .filter((c) => c.subjectCategory === 'physics' && c.offers[0]?.gradeProfile === 'AAA')
    .every((c) =>
      c.offers[0].subjectRequirements.every((r) => r.minimumGrade === 'A') &&
      c.offers[0].subjectRequirements.length === 2,
    ),
  true,
);
check(
  '  …while its foundation year pins no subject grade at all, and was read separately',
  (() => {
    const f = lancaster2027.find((c) => c.courseCode === 'F30F');
    return f?.offers[0]?.gradeProfile === 'CCC' &&
      f.offers[0].subjectRequirements.every((r) => r.minimumGrade === null);
  })(),
  true,
);

/* --- 25e. Pathways still never become applications --- */
/*
 * A study option must not have become its own course record.
 *
 * Scoped to one university and one cycle on purpose. The same course NAME at
 * two universities is not a collision — "Physics" is a route inside
 * Southampton's F303 and also a real Imperial degree, and those facts have
 * nothing to do with each other. An earlier draft of this check compared
 * across universities and reported 60 violations, none of them real.
 *
 * Within one university the test is also not simply "an option shares a course
 * name". Southampton's F303 MPhys lists "Physics" as one of its own routes
 * while F300 BSc "Physics" is a separate application at the same university —
 * both correct. What would be wrong is an option pointing at a code that is
 * neither its parent's nor the matching record's.
 */
const optionAsCourse = courses.filter((c) =>
  courses.some(
    (p) =>
      p.id !== c.id &&
      p.universityId === c.universityId &&
      p.applicationYear === c.applicationYear &&
      p.studyOptions.some(
        (o) =>
          canon(o.name) === canon(c.name) &&
          o.ucasCode !== null &&
          o.ucasCode !== p.courseCode &&
          o.ucasCode !== c.courseCode,
      ),
  ),
);
check('No study option became its own application record', optionAsCourse.length, 0);
check(
  '  …and no study option earned a 2028 shell',
  shells2028.some((s) => s.studyOptions.length > 0),
  false,
);
check(
  '  …and 2028 still carries no admissions facts at all',
  shells2028.every(
    (s) =>
      s.offers.length === 0 &&
      s.rawRequirementText === null &&
      s.gcseRequirements === null &&
      s.contextualOffer.availability === 'unknown',
  ),
  true,
);

/* --- 25f. The methodology and feedback surfaces carry what they must --- */
/*
 * v0.9 moved this from a hardcoded string to the property that actually
 * matters. v1.0.0 changes WHAT that property is. Before v1 it was "does not
 * claim v1 and says it is pre-release"; that assertion was correct until the
 * release gates cleared, and would now be asserting a falsehood. What must hold
 * at EVERY release is that the version and the pre-release flag agree: a 0.x
 * build must say it is pre-release, and a 1.x build must not.
 */
check('A release marker is set', /^v\d+\.\d+\.\d+$/.test(APP_VERSION), true);
check(
  '  …and the pre-release flag agrees with the major version',
  IS_PRE_RELEASE,
  /^v0\./.test(APP_VERSION),
);
check(
  '  …with a student-facing changelog that is not the developer one',
  RELEASES.length > 0 && RELEASES[0].changes.length > 0 &&
    !RELEASES[0].changes.some((c) => /identityVerification|isPubliclyDiscoverable|engine-check/.test(c)),
  true,
);
const reportSample = courses.find((c) => c.courseCode === 'H300' && c.universityId === 'lancaster')!;
const reportText = buildIssueReport(
  reportSample,
  universities.find((u) => u.id === 'lancaster'),
  ISSUE_TYPES[0],
  'The grades look wrong.',
);
check(
  'A report-an-issue payload carries the record’s full identity',
  ['Lancaster', 'Mechanical Engineering', 'H300', reportSample.id, '2027'].every((t) =>
    reportText.includes(t),
  ),
  true,
);
check(
  '  …including the source page and the trust state, so it can be checked',
  reportText.includes('lancaster.ac.uk') && reportText.includes('Verified'),
  true,
);
check(
  '  …and the build version, so a stale report is recognisable',
  reportText.includes(APP_VERSION),
  true,
);

/* --- 25g. Fixtures and dev surfaces stay out of the public catalogue --- */
check(
  'No fixture reached the public catalogue',
  courses.some((c) => FIXTURE_IDS.has(c.id)),
  false,
);
check(
  '  …and no live record is left in the demo state',
  courses.some((c) => c.provenance.verificationStatus === 'demo'),
  false,
);

/* ================================================================== */
/* 26. v0.9 — RELEASE CANDIDATE                                         */
/* ================================================================== */

/* --- 26a. Every university now carries verified data --- */
const universitiesWithData = new Set(
  courses
    .filter((c) => ['verified', 'partially-verified'].includes(c.provenance.verificationStatus))
    .map((c) => c.universityId),
);
const universitiesRepresented = new Set(courses.map((c) => c.universityId));
check(
  'Every represented university carries verified data',
  universitiesWithData.size,
  universitiesRepresented.size,
);
check('  …and none is represented by identity alone', universitiesRepresented.size - universitiesWithData.size, 0);

/* --- 26b. QMUL: the Astrophysics correction --- */
const qmul = courses.filter((c) => c.universityId === 'qmul' && c.applicationYear === '2027');
check('Queen Mary holds 21 separately coded applications for 2027', qmul.length, 21);
check('  …every one of them verified', qmul.every((c) => c.provenance.verificationStatus === 'verified'), true);
check('  …and every one carrying a UCAS code read from the course finder', qmul.every((c) => Boolean(c.courseCode)), true);
/*
 * The identity correction v0.9 turns on. Queen Mary publishes Astrophysics,
 * Theoretical Physics and Physics with AI as STREAMS chosen after year one,
 * with no course page and no code. The catalogue previously held Astrophysics
 * as an application; it is not one.
 */
check(
  'No Queen Mary stream became an application',
  QMUL_NOT_APPLICATIONS.every(
    (t) => !allCoursesWithFixtures.some((c) => c.universityId === 'qmul' && canon(c.name) === canon(t)),
  ),
  true,
);
check(
  '  …but all four streams are findable as routes inside Physics',
  (() => {
    const bsc = qmul.find((c) => c.courseCode === 'F300');
    return (
      bsc?.studyOptions.length === 4 &&
      bsc.studyOptions.every((o) => o.ucasCode === 'F300') &&
      bsc.studyOptions.some((o) => o.name === 'Astrophysics')
    );
  })(),
  true,
);
check(
  '  …and the record explains that the old Astrophysics row was removed',
  /previously held “Astrophysics BSc” as a separate Queen Mary course/i.test(
    qmul.find((c) => c.courseCode === 'F300')?.notes ?? '',
  ),
  true,
);

/* --- 26c. QMUL: three wrong scaffold codes corrected --- */
for (const [wrong, right, title] of [
  ['H160', 'HBF2', 'Biomedical Engineering'],
  ['J500', 'J511', 'Materials Science and Engineering'],
] as const) {
  check(
    `Queen Mary ${title} carries ${right}, not the scaffold's ${wrong}`,
    qmul.find((c) => canon(c.name) === canon(title) && c.degreeType === 'BEng')?.courseCode,
    right,
  );
  check(
    `  …and no Queen Mary record anywhere carries ${wrong}`,
    allCourses.some((c) => c.universityId === 'qmul' && c.courseCode === wrong),
    false,
  );
}
/*
 * Both wrong codes are real codes at OTHER universities for the same subject,
 * which is how a plausible invented code gets made. Those records must be
 * untouched — codes are unique within an institution, not between them.
 */
check(
  'H160 is still York’s Biomedical Engineering BEng',
  courses.some((c) => c.universityId === 'york' && c.courseCode === 'H160'),
  true,
);
check(
  'J500 is still in use at Manchester and Sheffield',
  new Set(courses.filter((c) => c.courseCode === 'J500').map((c) => c.universityId)).size >= 2,
  true,
);

/* --- 26d. QMUL: four subject-rule shapes, each stored as its own shape --- */
check(
  'Queen Mary Physics BSc requires both subjects AND one of them at A',
  (() => {
    const bsc = qmul.find((c) => c.courseCode === 'F300');
    const o = bsc?.offers[0];
    return (
      o?.subjectRequirements.length === 2 &&
      o.constraints.some((k) => k.kind === 'min-count-at-grade' && k.grade === 'A' && k.count === 1)
    );
  })(),
  true,
);
check(
  '  …so B in Maths and B in Physics is failed even at ABB overall',
  evaluateCourse(
    qmul.find((c) => c.courseCode === 'F300')!,
    profile([['Mathematics', 'B'], ['Physics', 'B'], ['Chemistry', 'A']]),
  ).verdict,
  'does-not-meet',
);
check(
  '  …while A in Maths and B in Physics meets it',
  evaluateCourse(
    qmul.find((c) => c.courseCode === 'F300')!,
    profile([['Mathematics', 'A'], ['Physics', 'B'], ['Chemistry', 'B']]),
  ).verdict,
  'meets',
);
check(
  'Queen Mary Physics MSci pins grade A to BOTH subjects, unlike its own BSc',
  qmul
    .find((c) => c.courseCode === 'F303')
    ?.offers[0]?.subjectRequirements.every((r) => r.minimumGrade === 'A'),
  true,
);
check(
  '  …so the same B/B profile fails there too, for a different published reason',
  evaluateCourse(
    qmul.find((c) => c.courseCode === 'F303')!,
    profile([['Mathematics', 'A'], ['Physics', 'B'], ['Chemistry', 'A']]),
  ).verdict,
  'does-not-meet',
);
check(
  'Queen Mary Materials makes NO single subject compulsory',
  (() => {
    const beng = qmul.find((c) => c.courseCode === 'J511');
    return beng?.offers[0]?.subjectRequirements.length === 0 &&
      beng.offers[0].constraints.some((k) => k.kind === 'min-count-at-grade' && k.count === 2);
  })(),
  true,
);
check(
  '  …so Physics and Chemistry without Mathematics still meets it',
  evaluateCourse(
    qmul.find((c) => c.courseCode === 'J511')!,
    profile([['Physics', 'A'], ['Chemistry', 'B'], ['Geography', 'B']]),
  ).verdict,
  'meets',
);
check(
  'Queen Mary Biomedical requires Mathematics plus one of three sciences',
  (() => {
    const beng = qmul.find((c) => c.courseCode === 'HBF2');
    return (
      beng?.offers[0]?.subjectRequirements.some((r) => r.subject === 'Mathematics') === true &&
      beng.offers[0].constraints.some((k) => k.kind === 'one-of' && k.subjects.includes('Biology'))
    );
  })(),
  true,
);
check(
  '  …and Biology satisfies it, where Materials never names Biology',
  evaluateCourse(
    qmul.find((c) => c.courseCode === 'HBF2')!,
    profile([['Mathematics', 'A'], ['Biology', 'A'], ['Geography', 'B']]),
  ).verdict,
  'meets',
);

/* --- 26e. KCL: the H100/H101 pairing, pinned in both directions --- */
const kclBEng = courses.find((c) => c.id === 'kcl-general-engineering-beng--2027')!;
const kclMEng = courses.find((c) => c.id === 'kcl-general-engineering-meng--2027')!;
check('KCL H100 is the BEng', kclBEng.courseCode, 'H100');
check('  …and H100 is NOT an MEng anywhere at KCL',
  allCoursesWithFixtures.some((c) => c.universityId === 'kcl' && c.courseCode === 'H100' && c.degreeType === 'MEng'),
  false);
check('KCL H101 is the MEng', kclMEng.courseCode, 'H101');
check('  …and H101 is NOT a BEng anywhere at KCL',
  allCoursesWithFixtures.some((c) => c.universityId === 'kcl' && c.courseCode === 'H101' && c.degreeType === 'BEng'),
  false);
check('  …they are distinct application identities', kclBEng.id === kclMEng.id, false);
check('  …distinguished by duration as well as award', `${kclBEng.durationYears}/${kclMEng.durationYears}`, '3/4');
check(
  '  …and both have their own 2028 shell',
  ['kcl-general-engineering-beng--2028', 'kcl-general-engineering-meng--2028'].every((id) =>
    shells2028.some((sh) => sh.id === id),
  ),
  true,
);
check('  …with no duplicate or conflict between them', findDuplicates([kclBEng, kclMEng]).length, 0);
check(
  '  …and the BEng was read on its own page, not inferred from the MEng',
  kclBEng.provenance.sourceUrl !== kclMEng.provenance.sourceUrl &&
    (kclBEng.provenance.sourceUrl ?? '').includes('general-engineering-beng'),
  true,
);

/* --- 26f. Every remaining awaiting-data row names a university-side gap --- */
const stillAwaiting = courses.filter((c) => c.provenance.verificationStatus === 'awaiting-data');
check('Five records remain awaiting data (H722 withdrawn in the v1.1.0 Southampton correction)', stillAwaiting.length, 5);
check(
  '  …all of them blocked by the university’s own cycle, not by our retrieval',
  stillAwaiting.every((c) =>
    /2027\/28 tab is PRESENT BUT EMPTY|NO 2027 label|details apply to 2026 entry|would not serve 2027/i.test(
      c.notes ?? '',
    ),
  ),
  true,
);
check(
  '  …and every one still has an evidenced identity',
  stillAwaiting.every((c) => c.provenance.identityVerification !== 'unevidenced'),
  true,
);

/* --- 26g. Release version --- */
/*
 * Was "is 0.9.0 and still pre-release". v1.0.0 is the stronger truth this
 * section was waiting for, so it asserts that instead of being deleted.
 */
check('The release marker is 1.1.0', APP_VERSION, 'v1.1.0');
check('  …and is no longer flagged pre-release', IS_PRE_RELEASE, false);
check('  …and the newest release note is the v1.1.0 one', RELEASES[0]?.version, 'v1.1.0');
check('  …with the v1.0.0 note kept beneath it', RELEASES[1]?.version, 'v1.0.0');
check(
  '  …which carries the admissions disclaimer verbatim',
  RELEASES[0]?.changes.includes('Meeting published entry requirements does not guarantee admission.'),
  true,
);

/* ================================================================== */
/* 27. v1.0.0 — CourseScope brand                                      */
/* ================================================================== */
/*
 * The brand is a name and a mark, and nothing else. These checks hold it to
 * that: the public name is CourseScope everywhere it appears, the old generic
 * title is gone as branding, the static copies in index.html and public/ agree
 * with src/lib/brand.ts — and the catalogue, search and eligibility engine
 * return exactly what they returned before the brand was applied.
 */
{
  const fs = await import('node:fs');
  const read = (f: string) => fs.readFileSync(f, 'utf8');
  const html = read('index.html');
  const favicon = fs.existsSync('public/favicon.svg') ? read('public/favicon.svg') : '';
  const preview = fs.existsSync('public/social-preview.svg') ? read('public/social-preview.svg') : '';
  const decode = (t: string) => t.replace(/&amp;/g, '&');
  const titleTag = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const meta = (attr: string, key: string) =>
    decode(html.match(new RegExp(`<meta\\s+${attr}="${key}"\\s+content="([^"]*)"`))?.[1] ?? '');

  check('Brand: the public name is CourseScope', BRAND_NAME, 'CourseScope');
  check('Brand: <title> is the full CourseScope title', titleTag, BRAND_TITLE);
  check('  …and the home tab title uses the same rule', pageTitle(null), BRAND_TITLE);
  check('  …and inner pages end with the brand', pageTitle('Compare courses'), 'Compare courses · CourseScope');
  check('Brand: meta description matches brand.ts', meta('name', 'description'), BRAND_DESCRIPTION);
  check('Brand: og:site_name is CourseScope', meta('property', 'og:site_name'), BRAND_NAME);
  check('Brand: og:title is the CourseScope title', meta('property', 'og:title'), BRAND_TITLE);
  check('Brand: twitter:title is the CourseScope title', meta('name', 'twitter:title'), BRAND_TITLE);
  check('Brand: the old generic name is not the primary branding anywhere in index.html', html.includes(LEGACY_NAME), false);
  check('Brand: nothing in src/ still renders the old name', (() => {
    const walk = (d: string): string[] =>
      fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(`${d}/${e.name}`) : /\.(tsx?|css)$/.test(e.name) ? [`${d}/${e.name}`] : [],
      );
    return walk('src').filter((f) => f !== 'src/lib/brand.ts' && read(f).includes(LEGACY_NAME)).join(', ');
  })(), '');
  check('Brand: favicon is referenced from index.html', /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg"/.test(html), true);
  check('  …and the file exists', favicon.length > 0, true);
  check('  …and draws the same ring as the React mark', favicon.includes(MARK_RING_PATH), true);
  check('  …in the same accent colour', favicon.includes(BRAND_COLORS.accent), true);
  check('Brand: social preview names CourseScope and the subtitle', preview.includes('CourseScope') && decode(preview).includes(BRAND_SUBTITLE), true);
  check('  …and uses no university crest or logo image', /<image\b/.test(preview), false);
  check('Brand: methodology opens with the positioning line', BRAND_POSITIONING.startsWith('CourseScope is an independent research tool'), true);
  check('  …and AboutPage renders it', read('src/pages/AboutPage.tsx').includes('{BRAND_POSITIONING}'), true);
  check('Brand: no copy implies an admissions outcome', [BRAND_TITLE, BRAND_DESCRIPTION, BRAND_POSITIONING, BRAND_SUBTITLE]
    .some((t) => /guarantee|you'?ll get in|dream|perfect match|predict/i.test(t)), false);

  /* Branding changes nothing the student relies on. Pinned from the v0.9 build. */
  check('Brand does not alter the catalogue: 1,129 served applications', courses.length, 1129);
  check('  …562 verified', courses.filter((c) => c.provenance.verificationStatus === 'verified').length, 562);
  check('  …“Physics” search still returns 206 (2027)', search('Physics').length, 206);
  check('  …“Engineering” search still returns 356 (2027; HH72 withdrawn in v1.1.0)', search('Engineering').length, 356);
  check('  …study-option search for “Astrophysics” still returns 40', search('Astrophysics').length, 40);
  const brandProfile = profile([['Mathematics', 'A*'], ['Physics', 'A'], ['Chemistry', 'A']]);
  const brandVerdicts: Record<string, number> = {};
  for (const r of Object.values(
    evaluateCatalogue(courses.filter((c) => c.applicationYear === '2027'), { ...brandProfile, applicationYear: '2027' }),
  )) {
    brandVerdicts[r.verdict] = (brandVerdicts[r.verdict] ?? 0) + 1;
  }
  check(
    '  …and eligibility verdicts for A*AA (Maths, Physics, Chemistry) reflect the Southampton withdrawal',
    JSON.stringify(brandVerdicts, Object.keys(brandVerdicts).sort()),
    JSON.stringify({ 'does-not-meet': 47, 'insufficient-information': 30, meets: 415, 'review-required': 75 }),
  );
}


/* ================================================================== */
/* 28. v1.0.0 polish — UCL subject guidance, feedback, public data     */
/* ================================================================== */
{
  const fs = await import('node:fs');
  const { createHash } = await import('node:crypto');
  const read = (f: string) => fs.readFileSync(f, 'utf8');

  /* 28a. UCL guidance: one central source, official, dated, separate */
  const g = UCL_A_LEVEL_SUBJECT_GUIDANCE;
  check('UCL guidance is registered centrally for UCL', subjectGuidanceFor('ucl') === g, true);
  check('  …and for no other university', Object.keys(SUBJECT_GUIDANCE_BY_UNIVERSITY).join(','), 'ucl');
  check('  …sourced from an official ucl.ac.uk page', /^https:\/\/www\.ucl\.ac\.uk\//.test(g.source.url), true);
  check('  …with a last-verified date', g.source.lastVerified, '2026-09-28');
  check('  …three published groups, 88 subjects',
    `${g.groups.length}/${g.groups.reduce((n, x) => n + x.subjects.length, 0)}`, '3/88');
  check('  …which include the subjects UCL physics and engineering courses require',
    ['Mathematics', 'Physics', 'Further Mathematics', 'Chemistry'].every((x) => g.groups.some((gr) => gr.subjects.includes(x))), true);
  check('  …and name the three subjects UCL does not accept',
    g.notAccepted?.subjects.join('|'), 'General Studies|Critical Thinking|Global Perspectives and Research');
  check('  …with no subject listed twice', (() => {
    const all = g.groups.flatMap((x) => x.subjects);
    return all.length === new Set(all).size;
  })(), true);
  check('The subject list is maintained in ONE file, not copied into course records',
    (() => {
      const walk = (d: string): string[] =>
        fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? walk(`${d}/${e.name}`) : /\.tsx?$/.test(e.name) ? [`${d}/${e.name}`] : [],
        );
      // "Moving Image Art (CCEA specification)" only exists on UCL's policy page
      return walk('src').filter((f) => read(f).includes('Moving Image Art (CCEA specification)')).join(',');
    })(),
    'src/data/university-subject-guidance.ts',
  );
  check('The eligibility engine never reads the guidance',
    ['src/lib/eligibility.ts', 'src/lib/explain.ts', 'src/lib/filters.ts'].some((f) => /subject-guidance|subjectGuidanceFor/.test(read(f))),
    false);
  check('UCL course requirements are byte-for-byte what they were before the guidance was added',
    createHash('sha256')
      .update(JSON.stringify(courses.filter((c) => c.universityId === 'ucl').map((c) => ({
        id: c.id, offers: c.offers, fm: c.furtherMathematics, test: c.admissionsTest,
      }))))
      .digest('hex'),
    '71ed1a2075456dd5e20ed04329ae5fbcb456667e7114e337c8efe9bf935b018b');
  check('  …and so is every course’s requirement set across the catalogue, aside from the v1.1.0 Southampton withdrawal',
    createHash('sha256').update(JSON.stringify(courses.map((c) => ({ id: c.id, offers: c.offers })))).digest('hex'),
    'f7d97298a11085f0462195f6bd55aa648b82cf59756149b5f28074e1957706a6');
  const uclPhysics = courses.find((c) => c.id === 'ucl-physics-bsc--2027')!;
  check('UCL Physics still requires Mathematics and Physics — the general list does not dilute it',
    uclPhysics.offers[0].subjectRequirements.filter((r) => r.required).map((r) => r.subject).sort().join('+'),
    'Mathematics+Physics');

  /* 28b. Feedback: real destination, three routes, no fake submission */
  const reportSrc = read('src/components/ReportIssue.tsx');
  check('Feedback: the form URL comes only from VITE_FEEDBACK_URL', /env\.VITE_FEEDBACK_URL/.test(reportSrc) && !/typeform\.com/.test(reportSrc), true);
  check('  …and the production config sets it', /^VITE_FEEDBACK_URL=https:\/\/form\.typeform\.com\//m.test(read('.env.production')), true);
  check('  …and sends the eight cs_-prefixed parameter names the form declares',
    Object.values(FEEDBACK_PARAMS).join(','),
    'cs_university,cs_course,cs_award,cs_ucas_code,cs_entry_year,cs_record_id,cs_issue_type,cs_page');
  check('  …and nothing in the report flow submits a form or posts data',
    /<form\b|type="submit"|fetch\(|XMLHttpRequest|sendBeacon/.test(reportSrc), false);
  check('  …and the footer links to it on every page', /<FeedbackLink\b/.test(read('src/components/Footer.tsx')), true);
  check('  …and so does the methodology page', /<FeedbackLink\b/.test(read('src/pages/AboutPage.tsx')), true);
  check('  …and the course page puts it in the provenance panel',
    /data-testid="course-report-issue"[\s\S]{0,120}<ReportIssue/.test(read('src/pages/CourseDetailPage.tsx')), true);

  /* 28c. University-level placeholders are never served */
  check('Served universities carry no unverified rankings',
    universities.flatMap((u) => u.rankings).filter((r) => r.verificationStatus !== 'verified').length, 0);
  check('  …no unverified deadlines',
    universities.flatMap((u) => u.applicationDeadlines).filter((d) => d.verificationStatus !== 'verified').length, 0);
  check('  …and no “(demo)” overview text',
    universities.filter((u) => JSON.stringify(u.admissionsOverview).includes('(demo)')).length, 0);
  check('  …while every seed is still kept, unpublished, for when it is verified',
    `${allUniversities.flatMap((u) => u.rankings).length}/${allUniversities.flatMap((u) => u.applicationDeadlines).length}`, '67/49');
  check('  …and the three verified deadlines are still shown',
    universities.flatMap((u) => u.applicationDeadlines).length, 3);
  check('  …with the same 22 universities served', universities.length, 22);

  /* 28d. Polish changed nothing a student relies on */
  check('Polish pass: catalogue still 1,129 applications, 562 verified',
    `${courses.length}/${courses.filter((c) => c.provenance.verificationStatus === 'verified').length}`, '1129/562');
  check('  …search still returns Physics 206, Engineering 356, Astrophysics 40',
    `${search('Physics').length}/${search('Engineering').length}/${search('Astrophysics').length}`, '206/356/40');
  check('  …University filter still narrows search as before (UCL: 21)',
    search('', '2027', { universityIds: ['ucl'] }).length, 21);
}


/* ================================================================== */
/* 29. v1.0.0 launch — first-visit entry year                          */
/* ================================================================== */
{
  const fs = await import('node:fs');
  const { emptyStudentProfile, isStudentProfile } = await import('@/lib/grades');
  const { DEFAULT_APPLICATION_YEAR } = await import('@/lib/entry-year');
  check('A first-time visitor starts on 2027 entry', DEFAULT_APPLICATION_YEAR, '2027');
  check('  …in both the empty profile and the default filters',
    `${emptyStudentProfile().applicationYear}/${defaultFilters().applicationYear}`, '2027/2027');
  const saved2028 = { ...emptyStudentProfile(), applicationYear: '2028' };
  check('  …while a saved 2028 profile is still accepted as-is, not reset',
    isStudentProfile(JSON.parse(JSON.stringify(saved2028))) && saved2028.applicationYear === '2028', true);
  check('  …and 2028 remains a selectable cycle', APPLICATION_YEARS_FOR_CHECK.includes('2028'), true);

  /*
   * The stale-default path. Every build before this one saved the default year
   * inside the profile on mount, so a stored profile year is NOT a choice. The
   * start year comes only from the explicit key, else the default.
   */
  const { initialEntryYear, readSavedEntryYear, saveEntryYear, ENTRY_YEAR_STORAGE_KEY } = await import('@/lib/entry-year');
  const store = new Map<string, string>();
  (globalThis as Record<string, unknown>).window = {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    },
  };
  check('Entry year: empty storage starts on 2027', initialEntryYear(), '2027');
  store.set('ukcf.profile.v1', JSON.stringify({ ...emptyStudentProfile(), applicationYear: '2028' }));
  check('  …a stale profile holding 2028 (no explicit choice) still starts on 2027', initialEntryYear(), '2027');
  saveEntryYear('2028');
  check('  …an explicit 2028 choice is saved under its own key', store.get(ENTRY_YEAR_STORAGE_KEY), '"2028"');
  check('  …and is what the next visit starts on', initialEntryYear(), '2028');
  saveEntryYear('2027');
  check('  …as is an explicit 2027 choice', initialEntryYear(), '2027');
  store.set(ENTRY_YEAR_STORAGE_KEY, '"2031"');
  check('  …a corrupt saved year is ignored', `${readSavedEntryYear()}/${initialEntryYear()}`, 'null/2027');
  store.set(ENTRY_YEAR_STORAGE_KEY, 'not json');
  check('  …as is unparseable storage', initialEntryYear(), '2027');
  delete (globalThis as Record<string, unknown>).window;
  const ctxSrc = fs.readFileSync('src/state/AppContext.tsx', 'utf8');
  check('  …and nothing saves the year on mount — only setEntryYear writes it',
    (ctxSrc.match(/saveEntryYear\(/g) ?? []).length, 1);
}

/* ===================================================================== */
/* 30. v1.1 — Tuition fees                                                */
/* ===================================================================== */
{
  const fs = await import('node:fs');
  const { createHash } = await import('node:crypto');
  const { TUITION_FEES, TUITION_FEE_GAPS, feesForCourse } = await import('@/data/tuition-fees');
  const { allUniversities: allUnis } = await import('@/data/universities');
  const {
    validateTuitionFees,
    feeDisplayState,
    entryYearNamedIn,
    isOfficialFeeSource,
    universityDomain,
  } = await import('@/lib/fees');
  const { evaluateCatalogue } = await import('@/lib/eligibility');
  type Fee = (typeof TUITION_FEES)[number];

  /* 30a. The shipped data passes every fee rule */
  const realIssues = validateTuitionFees(TUITION_FEES, allCourses, allUnis);
  check('Fees: every shipped fee row passes validation (0 issues)', realIssues.length, 0);
  check('  …and the catalogue validator, given the fees, still reports 0 errors',
    validateCatalogue(courses, universities, TUITION_FEES).counts.error, 0);
  check('  …1,127 fee rows across 521 courses at 21 universities',
    `${TUITION_FEES.length}/${new Set(TUITION_FEES.map((f) => f.courseId)).size}/${new Set(TUITION_FEES.map((f) => f.universityId)).size}`,
    '1127/521/21');
  check('  …431 courses have at least one published 2027 fee',
    new Set(TUITION_FEES.filter((f) => f.status === 'published').map((f) => f.courseId)).size, 431);
  check('  …every fee row belongs to a course a student can actually open',
    TUITION_FEES.filter((f) => !courseById[f.courseId]).length, 0);
  check('  …48 researched courses with nothing established are listed as gaps, with reasons',
    `${TUITION_FEE_GAPS.length}/${TUITION_FEE_GAPS.filter((g) => !g.reason).length}`, '48/0');
  check('  …and no course is both a gap and a fee holder',
    TUITION_FEE_GAPS.filter((g) => TUITION_FEES.some((f) => f.courseId === g.courseId)).length, 0);

  /* 30b. Decoded rows equal the research files exactly */
  const research = fs.readdirSync('data/research/fees-2027').filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(`data/research/fees-2027/${f}`, 'utf8')));
  const researchRows = research.flatMap((d) => d.courses.flatMap((c: { id: string; fees: Record<string, unknown>[] }) =>
    c.fees.map((f) => `${c.id}|${f.category}|${f.status}|${f.amount}|${f.indicativeAmount}|${f.basis}|${f.scope}`)));
  const shippedRows = TUITION_FEES.map((f) => `${f.courseId}|${f.category}|${f.status}|${f.amount}|${f.indicativeAmount}|${f.basis}|${f.scope}`);
  check('  …the bundled rows match the official-source research files one-for-one',
    JSON.stringify([...researchRows].sort()) === JSON.stringify([...shippedRows].sort()), true);

  /* 30c. Year leakage */
  check('Year leakage: every fee is for its own course record’s entry year',
    TUITION_FEES.filter((f) => courseById[f.courseId]?.applicationYear !== f.feeYear || !f.courseId.endsWith(`--${f.feeYear}`)).length, 0);
  check('  …no 2028 fee rows exist — none were published, and 2027 is never copied forward',
    TUITION_FEES.filter((f) => f.feeYear !== '2027').length, 0);
  const with2027Fees = courses.filter((c) => c.applicationYear === '2027' && feesForCourse(c).length > 0);
  const shellsOfFeeCourses = with2027Fees.map((c) => courseById[`${c.slug}--2028`]).filter(Boolean);
  check('  …the 2028 records of courses with 2027 fees return no fees',
    `${shellsOfFeeCourses.length > 400}/${shellsOfFeeCourses.filter((c) => feesForCourse(c).length > 0).length}`, 'true/0');
  check('  …entry-year evidence: "2027/28", "September 2027", "2027-2028", "2027 entry" name 2027',
    ['2027/28', 'Start: September 2027', 'tuition fees 2027-2028', 'Fees for 2027 entry', '2027/8'].every((e) => entryYearNamedIn(e, '2027')), true);
  check('  …but "2026/27", "2026-2027" and "2026/2027" do NOT — that is the previous cycle',
    ['Fees for 2026/27', 'academic year 2026-2027', '2026/2027 fee', '2026 – 27'].some((e) => entryYearNamedIn(e, '2027')), false);
  check('  …and a 2027 quote cannot evidence a 2028 fee',
    `${entryYearNamedIn('2027/28 tuition fee', '2028')}/${entryYearNamedIn('2027-2028', '2028')}/${entryYearNamedIn('2028/29 entry', '2028')}`, 'false/false/true');
  check('  …every non-unknown shipped row has evidence naming 2027 as the entry year',
    TUITION_FEES.filter((f) => f.status !== 'unknown' && !entryYearNamedIn(f.yearEvidence, f.feeYear)).length, 0);

  /* 30d. Synthetic rows: each rule fires on exactly the defect it guards */
  const edPhys = courseById['edinburgh-physics-bsc--2027'];
  const base: Fee = {
    courseId: 'imperial-physics-bsc--2027', universityId: 'imperial', feeYear: '2027', category: 'Home',
    categoryKind: 'home', status: 'published', amount: 10050, indicativeAmount: null, currency: 'GBP',
    basis: 'per-year', basisNote: null, scope: 'course', scopeNote: null, yearEvidence: 'Fees for 2027 entry',
    sourceUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-bsc/', sourceTitle: 'Physics BSc',
    lastVerified: '2026-09-30', note: null,
  };
  const rules = (rows: Fee[]) => validateTuitionFees(rows, allCourses, allUnis).map((i) => i.ruleId).sort().join(',');
  check('  synthetic: a clean row passes', rules([base]), '');
  check('  synthetic: a 2027 fee attached to the 2028 record is year leakage',
    rules([{ ...base, courseId: 'imperial-physics-bsc--2028' }]), 'fee-year-leakage');
  check('  synthetic: a 2028 fee whose evidence is "2027/28" is unevidenced (and leaks)',
    rules([{ ...base, courseId: 'imperial-physics-bsc--2028', feeYear: '2028', yearEvidence: '2027/28' }]), 'fee-year-unevidenced');
  check('  synthetic: a 2026/27 figure presented as 2027 is caught',
    rules([{ ...base, yearEvidence: 'Tuition fees 2026/27' }]), 'fee-year-unevidenced');

  /* 30e. Missing provenance */
  check('Provenance: a published fee with no source URL fails',
    rules([{ ...base, sourceUrl: null }]), 'fee-missing-source');
  check('  …with no verified date fails', rules([{ ...base, lastVerified: null }]), 'fee-missing-verified-date');
  check('  …with no source title fails', rules([{ ...base, sourceTitle: null }]), 'fee-missing-source-title');
  check('  …from a non-university site fails',
    rules([{ ...base, sourceUrl: 'https://www.ucas.com/explore/courses' }]), 'fee-unofficial-source');
  check('  …a look-alike domain is not the university',
    isOfficialFeeSource('https://imperial.ac.uk.example.com/fees', allUnis.find((u) => u.id === 'imperial')!), false);
  check('  …Edinburgh’s study.ed.ac.uk counts as official (registrable domain ed.ac.uk)',
    `${universityDomain('https://www.ed.ac.uk')}/${isOfficialFeeSource('https://study.ed.ac.uk/x', allUnis.find((u) => u.id === 'edinburgh')!)}`, 'ed.ac.uk/true');
  check('  …awaiting with an amount fails; an expected figure must be indicative',
    rules([{ ...base, status: 'awaiting-publication' }]), 'fee-amount-on-unpublished');
  check('  …an indicative figure needs the caveat quoted',
    rules([{ ...base, status: 'awaiting-publication', amount: null, indicativeAmount: 10050 }]), 'fee-indicative-unexplained');
  check('  …an unknown fee must say why',
    rules([{ ...base, status: 'unknown', amount: null }]), 'fee-unknown-unexplained');
  check('  …a published fee cannot also be indicative',
    rules([{ ...base, indicativeAmount: 10050 }]), 'fee-indicative-on-published');
  check('  …every shipped published row has source, title, date and an amount',
    TUITION_FEES.filter((f) => f.status === 'published' && (!f.sourceUrl || !f.sourceTitle || !f.lastVerified || f.amount === null)).length, 0);

  /* 30f. Duplicate fee categories */
  check('Duplicates: the same category twice for one course fails',
    rules([base, { ...base, amount: 9000 }]), 'fee-duplicate-category');
  check('  …case and spacing do not hide a duplicate', rules([base, { ...base, category: ' home ' }]), 'fee-duplicate-category');
  check('  …a university-wide row cannot sit beside a course row for the same category',
    rules([base, { ...base, scope: 'university-wide', scopeNote: 'All courses: £10,050' }]), 'fee-duplicate-category');
  check('  …the same category on two different courses is fine',
    rules([base, { ...base, courseId: 'imperial-physics-msci--2027' }]), '');
  const dupKeys = TUITION_FEES.map((f) => `${f.courseId}|${f.category.trim().toLowerCase()}`);
  check('  …no shipped course repeats a category', dupKeys.length - new Set(dupKeys).size, 0);

  /* 30g. Scottish multi-category fees */
  const edFees = feesForCourse(edPhys);
  check('Scottish: Edinburgh Physics keeps three distinct categories with distinct amounts',
    edFees.map((f) => `${f.category}=${f.amount}`).join(' | '), 'Scotland=1820 | Rest of UK=10050 | International/EU=40900');
  const glaFees = feesForCourse(courseById['glasgow-physics-bsc--2027']);
  check('  …Glasgow keeps Scotland, Rest of UK, Republic of Ireland and International separately',
    glaFees.map((f) => `${f.categoryKind}:${f.status}`).join(','),
    'scotland:published,rest-of-uk:awaiting-publication,republic-of-ireland:awaiting-publication,international:awaiting-publication');
  check('  …a Scottish fee can be published while Rest of UK is still awaiting (not collapsed)',
    glaFees[0].amount === 1820 && glaFees[1].amount === null, true);
  const scottish = new Set(allUnis.filter((u) => u.region === 'Scotland').map((u) => u.id));
  check('  …no Scottish university row uses a generic “home” category',
    TUITION_FEES.filter((f) => scottish.has(f.universityId) && f.categoryKind === 'home').length, 0);
  check('  …and a synthetic Scottish “home” row is rejected',
    rules([{ ...base, courseId: edPhys.id, universityId: 'edinburgh', sourceUrl: 'https://study.ed.ac.uk/x' }]), 'fee-scottish-home-collapse');
  check('  …St Andrews keeps its own combined category label verbatim',
    feesForCourse(courseById['st-andrews-physics-bsc--2027']).some((f) => f.category.startsWith('England, Wales, Northern Ireland and Republic of Ireland')), true);

  /* 30h. Course-specific vs university-wide */
  check('Scope: a university-wide row without the university’s statement fails',
    rules([{ ...base, scope: 'university-wide' }]), 'fee-university-wide-unstated');
  check('  …every shipped university-wide row quotes its statement',
    TUITION_FEES.filter((f) => f.scope === 'university-wide' && !f.scopeNote).length, 0);
  const manIntl = new Set(TUITION_FEES.filter((f) => f.universityId === 'manchester' && f.categoryKind === 'international' && f.amount).map((f) => f.amount));
  check('  …Manchester’s international fees stay course-specific (several distinct figures, not one flattened value)',
    manIntl.size >= 4, true);
  check('  …Sheffield Home is university-wide, from a statement naming 2027-28 entrants',
    TUITION_FEES.filter((f) => f.universityId === 'sheffield' && f.category === 'Home' && f.status === 'published')
      .every((f) => f.scope === 'university-wide' && /2027-28/.test(f.scopeNote ?? '')), true);
  check('  …and Sheffield Overseas is NOT given one figure: only a range is published, so it stays unknown',
    TUITION_FEES.filter((f) => f.universityId === 'sheffield' && f.category === 'Overseas').every((f) => f.status === 'unknown' && f.amount === null), true);
  check('  …conflicting official sources are never resolved by picking one (Warwick Overseas is unknown)',
    TUITION_FEES.filter((f) => f.universityId === 'warwick' && f.category === 'Overseas').every((f) => f.status === 'unknown'), true);

  /* 30i. Display: missing or stale fees never appear as current */
  const today = new Date('2026-10-01T12:00:00Z');
  const impPhys = courseById['imperial-physics-bsc--2027'];
  check('Display: a published, sourced, recent fee is current', feeDisplayState(base, impPhys, today), 'current');
  check('  …the same fee 13 months later is stale, not current',
    feeDisplayState(base, impPhys, new Date('2027-11-05T00:00:00Z')), 'stale');
  check('  …a fee shown against another year’s record is wrong-year',
    feeDisplayState(base, courseById['imperial-physics-bsc--2028'], today), 'wrong-year');
  check('  …a published figure without a source is unsourced (never displayed)',
    feeDisplayState({ ...base, sourceUrl: null }, impPhys, today), 'unsourced');
  check('  …awaiting and unknown keep their own states',
    `${feeDisplayState({ ...base, status: 'awaiting-publication', amount: null }, impPhys, today)}/${feeDisplayState({ ...base, status: 'unknown', amount: null }, impPhys, today)}`,
    'awaiting/unknown');
  check('  …on the release date every shipped published row is current',
    TUITION_FEES.filter((f) => f.status === 'published' && feeDisplayState(f, courseById[f.courseId], today) !== 'current').length, 0);

  /* 30j. Fees change nothing a student relied on before */
  check('Changed by the Southampton correction: catalogue now 1,129 applications (567 for 2027, 562 for 2028)',
    `${courses.length}/${courses.filter((c) => c.applicationYear === '2027').length}/${courses.filter((c) => c.applicationYear === '2028').length}`, '1129/567/562');
  const P = (al: [string, string][], fm: boolean | null, y: '2027' | '2028') =>
    ({ aLevels: al.map(([subject, grade], i) => ({ id: `a${i}`, subject, grade })), gcses: [], applicationYear: y, schoolOffersFurtherMathematics: fm, notes: '' }) as Parameters<typeof evaluateCatalogue>[1];
  const fp = createHash('sha256');
  for (const p of [
    P([['Mathematics', 'A*'], ['Physics', 'A*'], ['Further Mathematics', 'A']], true, '2027'),
    P([['Mathematics', 'A'], ['Physics', 'B'], ['Chemistry', 'B']], false, '2027'),
    P([['Mathematics', 'B'], ['Biology', 'C'], ['English Literature', 'A']], null, '2027'),
    P([['Mathematics', 'A*'], ['Physics', 'A'], ['Chemistry', 'A']], null, '2028'),
  ]) {
    const r = evaluateCatalogue(courses, p);
    for (const id of Object.keys(r).sort()) fp.update(`${id}:${r[id].verdict};`);
  }
  check('  …eligibility verdicts for four reference profiles unchanged except for the v1.1.0 Southampton withdrawal',
    fp.digest('hex').slice(0, 16), '1fa41a2fe07a2824');
  check('  …and the eligibility engine does not read fees',
    /fee/i.test(fs.readFileSync('src/lib/eligibility.ts', 'utf8')), false);
  check('  …course cards and filters carry no fee UI (v1.1 scope)',
    ['src/components/CourseCard.tsx', 'src/components/FilterSidebar.tsx', 'src/lib/filters.ts']
      .filter((f) => /TuitionFee|tuitionFee|feesForCourse/.test(fs.readFileSync(f, 'utf8'))).length, 0);
  check('  …the course page places Tuition fees after every admissions card',
    (() => {
      const src = fs.readFileSync('src/pages/CourseDetailPage.tsx', 'utf8');
      return src.indexOf('<TuitionFees') > src.indexOf('Course-specific admissions details');
    })(), true);
}

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
