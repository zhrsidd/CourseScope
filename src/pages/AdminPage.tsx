import { useMemo, useState, type ReactNode } from 'react';
import { usePageTitle } from '@/lib/page-title';
import type {
  ALevelGrade,
  AdmissionsTestCode,
  AdmissionsTestRequirementLevel,
  ApplicationYear,
  ContextualOfferAvailability,
  Course,
  DegreeType,
  FurtherMathsStatus,
  InterviewPolicy,
  PublicationStatus,
  SubjectCategory,
  SubjectStatus,
  SubjectSubcategory,
  VerificationStatus,
} from '@/types';
import { A_LEVEL_GRADES } from '@/types';
import {
  ADMISSIONS_TESTS,
  DEGREE_TYPES,
  FURTHER_MATHS_LABEL,
  FURTHER_MATHS_STATUSES,
  SUBCATEGORIES,
  SUBJECT_STATUSES,
  SUBJECT_STATUS_LABEL,
  VERIFICATION_LABEL,
  VERIFICATION_STATUSES,
} from '@/data/taxonomy';
import { PRIORITY_UNIVERSITY_IDS } from '@/data';
import { APPLICATION_YEARS } from '@/lib/filters';
import {
  admissionsTestFullLabel,
  formatDate,
  subjectSummary,
  typicalOfferLabel,
} from '@/lib/format';
import {
  coursesToCsv,
  importCoursesCsv,
  importCoursesJson,
  serialiseCourse,
  CSV_COLUMNS,
  type ImportResult,
} from '@/lib/importers';
import { VerificationBadge } from '@/components/SourceBadge';
import { IconCross, IconExternal, IconWarning } from '@/components/ui/icons';
import { Badge, Card, PageHeader, SectionTitle, Segmented, cx } from '@/components/ui/primitives';
import { useApp } from '@/state/AppContext';

type Tab = 'records' | 'editor' | 'import' | 'duplicates' | 'validation';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="label mb-1 block">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[11px] text-ink-faint">{hint}</span> : null}
    </label>
  );
}

function CopyBlock({ text, filename }: { text: string; filename: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="label">{filename}</span>
        <button
          type="button"
          className={cx('btn-secondary h-8 px-2.5 text-xs', copied && 'border-emerald-300 text-emerald-700')}
          onClick={() => {
            navigator.clipboard?.writeText(text).then(
              () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              },
              () => setCopied(false),
            );
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="scroll-x max-h-[420px] overflow-y-auto rounded-md border border-slate-200 bg-slate-900 p-3 text-[11.5px] leading-relaxed text-slate-100">
        <code>{text}</code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Records table                                                       */
/* ------------------------------------------------------------------ */

function RecordsTab() {
  const { courses, universities, validation } = useApp();
  const [university, setUniversity] = useState('all');
  const [year, setYear] = useState('all');
  const [status, setStatus] = useState('all');
  const [subject, setSubject] = useState('all');
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const priority = new Set<string>(PRIORITY_UNIVERSITY_IDS);
    return courses
      .filter((c) => (university === 'all' ? true : c.universityId === university))
      .filter((c) => (year === 'all' ? true : c.applicationYear === year))
      .filter((c) => (status === 'all' ? true : c.provenance.verificationStatus === status))
      .filter((c) => (subject === 'all' ? true : c.subjectCategory === subject))
      .filter((c) => (priorityOnly ? priority.has(c.universityId) : true))
      .filter((c) =>
        query.trim()
          ? `${c.name} ${c.slug} ${c.courseCode ?? ''}`.toLowerCase().includes(query.toLowerCase())
          : true,
      )
      .sort(
        (a, b) =>
          a.universityId.localeCompare(b.universityId) ||
          a.name.localeCompare(b.name) ||
          a.applicationYear.localeCompare(b.applicationYear),
      );
  }, [courses, university, year, status, subject, priorityOnly, query]);

  const uniName = (id: string) => universities.find((u) => u.id === id)?.shortName ?? id;

  return (
    <div className="space-y-4">
      <Card className="p-3">
        <div className="flex flex-wrap items-end gap-3">
          <Field label="University">
            <select className="field h-9 w-52 py-1.5" value={university} onChange={(e) => setUniversity(e.target.value)}>
              <option value="all">All universities</option>
              {[...universities]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </Field>
          <Field label="Entry year">
            <select className="field h-9 w-32 py-1.5" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="all">All years</option>
              {APPLICATION_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Verification">
            <select className="field h-9 w-44 py-1.5" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All statuses</option>
              {VERIFICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {VERIFICATION_LABEL[s]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subject">
            <select className="field h-9 w-36 py-1.5" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="all">All subjects</option>
              <option value="physics">Physics</option>
              <option value="engineering">Engineering</option>
            </select>
          </Field>
          <Field label="Search">
            <input
              className="field h-9 w-48 py-1.5"
              placeholder="Course name or slug"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Field>
          <label className="flex h-9 items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-navy-800"
              checked={priorityOnly}
              onChange={(e) => setPriorityOnly(e.target.checked)}
            />
            First data batch only
          </label>
          <span className="ml-auto text-sm text-ink-muted">{rows.length} records</span>
        </div>
      </Card>

      <div className="surface scroll-x">
        <table className="w-full min-w-[1180px] border-collapse text-[13px]">
          <thead>
            <tr className="bg-slate-50">
              {[
                'University',
                'Course',
                'Degree',
                'Entry year',
                'Typical offer',
                'Maths',
                'Physics',
                'Further Maths',
                'Admissions test',
                'Source',
                'Last verified',
                'Status',
                'Issues',
              ].map((h) => (
                <th
                  key={h}
                  className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-faint"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const issues = validation.byCourse[c.id] ?? [];
              const errors = issues.filter((i) => i.severity === 'error').length;
              const warnings = issues.filter((i) => i.severity === 'warning').length;
              const link = c.provenance.sourceUrl ?? c.provenance.officialUrl;
              return (
                <tr key={c.id} className="align-top hover:bg-slate-50/60">
                  <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">{uniName(c.universityId)}</td>
                  <td className="border-b border-slate-100 px-3 py-2 font-medium text-navy-950">{c.name}</td>
                  <td className="border-b border-slate-100 px-3 py-2">{c.degreeType}</td>
                  <td className="border-b border-slate-100 px-3 py-2 tabular-nums">{c.applicationYear}</td>
                  <td className="border-b border-slate-100 px-3 py-2 font-semibold tabular-nums">
                    {typicalOfferLabel(c)}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2">{subjectSummary(c, 'Mathematics')}</td>
                  <td className="border-b border-slate-100 px-3 py-2">{subjectSummary(c, 'Physics')}</td>
                  <td className="border-b border-slate-100 px-3 py-2">
                    {FURTHER_MATHS_LABEL[c.furtherMathematics]}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2">
                    {c.admissionsTest.code === 'unknown' ? (
                      <span className="italic text-slate-400">—</span>
                    ) : (
                      admissionsTestFullLabel(c.admissionsTest)
                    )}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2">
                    {link ? (
                      <a href={link} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                        Link <IconExternal width={11} height={11} />
                      </a>
                    ) : (
                      <span className="italic text-slate-400">None</span>
                    )}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">
                    {c.provenance.lastVerified ? formatDate(c.provenance.lastVerified) : '—'}
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2">
                    <VerificationBadge status={c.provenance.verificationStatus} provenance={c.provenance} />
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2">
                    {errors > 0 ? <Badge tone="red">{errors} error{errors === 1 ? '' : 's'}</Badge> : null}
                    {warnings > 0 ? <Badge tone="amber">{warnings} warn</Badge> : null}
                    {errors === 0 && warnings === 0 ? <span className="text-slate-400">—</span> : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

function ValidationTab() {
  const { validation, courseById, universityById } = useApp();
  const [severity, setSeverity] = useState<'all' | 'error' | 'warning' | 'info'>('error');

  const issues = validation.issues.filter((i) => (severity === 'all' ? true : i.severity === severity));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          value={severity}
          onChange={setSeverity}
          options={[
            { id: 'error', label: `Errors (${validation.counts.error})` },
            { id: 'warning', label: `Warnings (${validation.counts.warning})` },
            { id: 'info', label: `Info (${validation.counts.info})` },
            { id: 'all', label: 'All' },
          ]}
        />
        <p className="text-xs text-ink-muted">
          These checks run in the data manager only — they never appear on the public pages.
        </p>
      </div>

      {issues.length === 0 ? (
        <Card className="p-6 text-center text-sm text-ink-muted">Nothing flagged at this level.</Card>
      ) : (
        <div className="surface scroll-x">
          <table className="w-full min-w-[760px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {['Severity', 'Record', 'Field', 'Rule', 'Message'].map((h) => (
                  <th
                    key={h}
                    className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map((i, idx) => {
                const record =
                  i.entity === 'course'
                    ? courseById[i.entityId]?.name ?? i.entityId
                    : universityById[i.entityId]?.name ?? i.entityId;
                return (
                  <tr key={`${i.ruleId}-${i.entityId}-${idx}`} className="align-top">
                    <td className="border-b border-slate-100 px-3 py-2">
                      <Badge tone={i.severity === 'error' ? 'red' : i.severity === 'warning' ? 'amber' : 'slate'}>
                        {i.severity}
                      </Badge>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2 font-medium text-navy-950">{record}</td>
                    <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">{i.field ?? '—'}</td>
                    <td className="border-b border-slate-100 px-3 py-2 font-mono text-[11px] text-ink-faint">
                      {i.ruleId}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">{i.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Duplicates                                                          */
/* ------------------------------------------------------------------ */

const DUPLICATE_TONE = {
  conflict: 'red',
  'exact-duplicate': 'red',
  'likely-duplicate': 'amber',
} as const;

const DUPLICATE_LABEL = {
  conflict: 'Conflict',
  'exact-duplicate': 'Exact duplicate',
  'likely-duplicate': 'Likely duplicate',
} as const;

function DuplicatesTab() {
  const { validation, courseById, universityById } = useApp();
  const findings = validation.duplicates;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <SectionTitle>How records are matched</SectionTitle>
        <p className="text-sm leading-relaxed text-ink-muted">
          Identity is <strong>university + UCAS course code + entry year</strong> where a code exists,
          and <strong>university + canonical course name + award + entry year</strong> where it does
          not. Canonicalisation removes award tokens, brackets and punctuation, so “Physics MPhys”,
          “MPhys Physics” and “Physics (MPhys)” are one course — while “Physics BSc” and “Theoretical
          Physics MPhys” stay separate. Nothing on this page is merged automatically.
        </p>
      </Card>

      {findings.length === 0 ? (
        <Card className="p-6 text-center text-sm text-ink-muted">
          No duplicates or conflicts detected across {Object.keys(courseById).length} records.
        </Card>
      ) : (
        <div className="surface scroll-x">
          <table className="w-full min-w-[900px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-slate-50">
                {['Type', 'Matched on', 'Record A', 'Record B', 'Differing fields', 'Reason'].map((h) => (
                  <th
                    key={h}
                    className="border-b border-slate-200 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {findings.map((f, i) => {
                const a = courseById[f.aId];
                const b = courseById[f.bId];
                const uni = a ? universityById[a.universityId]?.shortName : '';
                return (
                  <tr key={`${f.aId}-${f.bId}-${i}`} className="align-top">
                    <td className="border-b border-slate-100 px-3 py-2">
                      <Badge tone={DUPLICATE_TONE[f.kind]}>{DUPLICATE_LABEL[f.kind]}</Badge>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">
                      {f.basis === 'ucas-code' ? 'UCAS code' : 'Canonical name'}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="font-medium text-navy-950">{a?.name ?? f.aId}</div>
                      <div className="text-[11px] text-ink-faint">
                        {uni} · {a?.applicationYear} · {a?.provenance.verificationStatus}
                      </div>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2">
                      <div className="font-medium text-navy-950">{b?.name ?? f.bId}</div>
                      <div className="text-[11px] text-ink-faint">
                        {uni} · {b?.applicationYear} · {b?.provenance.verificationStatus}
                      </div>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">
                      {f.differingFields.length ? f.differingFields.join(', ') : '—'}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-2 text-ink-muted">{f.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Import / export                                                     */
/* ------------------------------------------------------------------ */

const CSV_TEMPLATE = [
  CSV_COLUMNS.join(','),
  [
    'oxford-physics',
    'oxford',
    'Physics MPhys',
    'physics',
    'physics',
    'MPhys',
    '4',
    'F303',
    '2028',
    'published',
    '"A*AA including Mathematics and Physics."',
    'A*AA',
    'Mathematics:A*;Physics:A',
    'Further Mathematics',
    'recommended',
    'required',
    'required',
    'not-required',
    'pat',
    'required',
    'Sat before shortlisting.',
    'https://example.ac.uk/pat',
    'yes',
    'yes',
    '',
    '',
    '',
    'https://example.ac.uk/course',
    'https://example.ac.uk/admissions',
    'University of Oxford undergraduate admissions',
    '2026-08-15',
    'verified',
    '',
    '',
  ].join(','),
].join('\n');

function ImportTab() {
  const { courses } = useApp();
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [text, setText] = useState('');
  const [result, setResult] = useState<ImportResult<Course> | null>(null);

  const run = () => {
    // The batch is checked against itself and against the live catalogue, so a
    // record that already exists is caught before it is committed.
    const opts = { existing: courses };
    setResult(format === 'json' ? importCoursesJson(text, opts) : importCoursesCsv(text, opts));
  };

  const exportJson = useMemo(
    () => JSON.stringify({ courses: courses.map(serialiseCourse) }, null, 2),
    [courses],
  );
  const exportCsv = useMemo(() => coursesToCsv(courses), [courses]);
  /** A small, valid batch to try the importer with. */
  const sampleJson = useMemo(
    () =>
      JSON.stringify(
        { courses: courses.filter((c) => c.offers.length > 0).slice(0, 2).map(serialiseCourse) },
        null,
        2,
      ),
    [courses],
  );

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <div className="space-y-4">
        <Card className="p-4">
          <SectionTitle
            right={
              <Segmented
                size="sm"
                value={format}
                onChange={setFormat}
                options={[
                  { id: 'json', label: 'JSON' },
                  { id: 'csv', label: 'CSV' },
                ]}
              />
            }
          >
            Import a batch
          </SectionTitle>
          <p className="mb-2 text-xs leading-relaxed text-ink-muted">
            Paste records in the documented wire format. Import validates the vocabulary of every field
            and reports problems — it never fills a missing value with a plausible one.
          </p>
          <textarea
            className="field min-h-[220px] font-mono text-[11.5px]"
            placeholder={format === 'json' ? '{ "courses": [ ... ] }' : CSV_COLUMNS.join(',')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className="btn-primary h-8 px-3 text-xs" onClick={run} disabled={!text.trim()}>
              Validate batch
            </button>
            <button
              type="button"
              className="btn-secondary h-8 px-3 text-xs"
              onClick={() => setText(format === 'csv' ? CSV_TEMPLATE : sampleJson)}
            >
              Load {format === 'csv' ? 'CSV template' : 'sample JSON'}
            </button>
            <button
              type="button"
              className="btn-ghost h-8 px-3 text-xs"
              onClick={() => {
                setText('');
                setResult(null);
              }}
            >
              Clear
            </button>
          </div>
        </Card>

        {result ? (
          <Card className="p-4">
            <SectionTitle
              right={
                <Badge tone={result.errors.length ? 'red' : 'green'}>
                  {result.errors.length ? `${result.errors.length} errors` : 'Valid'}
                </Badge>
              }
            >
              Validation result
            </SectionTitle>
            <p className="text-sm text-ink-muted">
              {result.records.length} record{result.records.length === 1 ? '' : 's'} parsed.
            </p>
            {result.errors.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-rose-700">
                {result.errors.map((e, i) => (
                  <li key={i} className="flex gap-1.5">
                    <IconCross width={13} height={13} className="mt-0.5 shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            ) : null}
            {result.warnings.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-amber-700">
                {result.warnings.map((w, i) => (
                  <li key={i} className="flex gap-1.5">
                    <IconWarning width={13} height={13} className="mt-0.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            ) : null}
            {result.duplicates.length > 0 ? (
              <div className="mt-3 rounded border border-amber-200 bg-amber-50/70 p-2.5">
                <div className="label mb-1 text-amber-800">
                  {result.duplicates.length} identity match
                  {result.duplicates.length === 1 ? '' : 'es'} — review before committing
                </div>
                <ul className="space-y-1 text-xs text-amber-900">
                  {result.duplicates.map((d, i) => (
                    <li key={i}>
                      <strong>{DUPLICATE_LABEL[d.kind]}</strong> · matched on{' '}
                      {d.basis === 'ucas-code' ? 'UCAS code' : 'canonical name'} · {d.reason}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {result.records.length > 0 && result.errors.length === 0 ? (
              <p className="mt-3 rounded border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-900">
                Ready to commit. Add these records to <code>src/data/</code> (or to your database table)
                — the app reads them through the same <code>DataSource</code> interface either way.
              </p>
            ) : null}
          </Card>
        ) : null}
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <SectionTitle>Export the current catalogue</SectionTitle>
          <p className="mb-3 text-xs leading-relaxed text-ink-muted">
            The same shape the importer accepts, so a round trip is lossless. Use these as the starting
            point for <code>data/courses.json</code> or a spreadsheet.
          </p>
          <div className="space-y-4">
            <CopyBlock text={exportJson} filename="courses.json" />
            <CopyBlock text={exportCsv} filename="courses.csv" />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Record editor                                                       */
/* ------------------------------------------------------------------ */

interface DraftRequirement {
  subject: string;
  required: boolean;
  minimumGrade: ALevelGrade | '';
}

interface DraftOffer {
  label: string;
  gradeProfile: string;
  isContextual: boolean;
  appliesOnlyIfTaking: string;
  rawText: string;
  notes: string;
  requirements: DraftRequirement[];
}

interface Draft {
  slug: string;
  universityId: string;
  name: string;
  category: SubjectCategory;
  sub: SubjectSubcategory;
  degree: DegreeType;
  years: string;
  code: string;
  year: ApplicationYear;
  publication: PublicationStatus;
  raw: string;
  maths: SubjectStatus;
  physics: SubjectStatus;
  chemistry: SubjectStatus;
  fm: FurtherMathsStatus;
  test: AdmissionsTestCode;
  testRequirement: AdmissionsTestRequirementLevel;
  testDetails: string;
  testUrl: string;
  interview: InterviewPolicy;
  contextual: ContextualOfferAvailability;
  gcse: string;
  english: string;
  international: string;
  officialUrl: string;
  sourceUrl: string;
  sourceTitle: string;
  lastVerified: string;
  verification: VerificationStatus;
  notes: string;
  offers: DraftOffer[];
}

const blankOffer = (): DraftOffer => ({
  label: 'Standard offer',
  gradeProfile: 'AAA',
  isContextual: false,
  appliesOnlyIfTaking: '',
  rawText: '',
  notes: '',
  requirements: [
    { subject: 'Mathematics', required: true, minimumGrade: 'A' },
    { subject: 'Physics', required: true, minimumGrade: 'A' },
  ],
});

const blankDraft = (universityId: string): Draft => ({
  slug: '',
  universityId,
  name: '',
  category: 'physics',
  sub: 'physics',
  degree: 'BSc',
  years: '3',
  code: '',
  year: '2028',
  publication: 'published',
  raw: '',
  maths: 'unknown',
  physics: 'unknown',
  chemistry: 'unknown',
  fm: 'unknown',
  test: 'unknown',
  testRequirement: 'unknown',
  testDetails: '',
  testUrl: '',
  interview: 'not-stated',
  contextual: 'unknown',
  gcse: '',
  english: '',
  international: '',
  officialUrl: '',
  sourceUrl: '',
  sourceTitle: '',
  lastVerified: '',
  verification: 'unknown',
  notes: '',
  offers: [blankOffer()],
});

function EditorTab() {
  const { universities, courses } = useApp();
  const [draft, setDraft] = useState<Draft>(() => blankDraft('cambridge'));

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const updateOffer = (i: number, patch: Partial<DraftOffer>) =>
    setDraft((d) => ({ ...d, offers: d.offers.map((o, j) => (j === i ? { ...o, ...patch } : o)) }));
  const updateReq = (oi: number, ri: number, patch: Partial<DraftRequirement>) =>
    setDraft((d) => ({
      ...d,
      offers: d.offers.map((o, i) =>
        i === oi ? { ...o, requirements: o.requirements.map((r, j) => (j === ri ? { ...r, ...patch } : r)) } : o,
      ),
    }));

  const loadExisting = (courseId: string) => {
    const c = courses.find((x) => x.id === courseId);
    if (!c) return;
    setDraft({
      slug: c.slug,
      universityId: c.universityId,
      name: c.name,
      category: c.subjectCategory,
      sub: c.subjectSubcategory,
      degree: c.degreeType,
      years: c.durationYears === null ? '' : String(c.durationYears),
      code: c.courseCode ?? '',
      year: c.applicationYear,
      publication: c.requirementsPublicationStatus,
      raw: c.rawRequirementText ?? '',
      maths: c.mathematics,
      physics: c.physics,
      chemistry: c.chemistry,
      fm: c.furtherMathematics,
      test: c.admissionsTest.code,
      testRequirement: c.admissionsTest.requirement,
      testDetails: c.admissionsTest.details ?? '',
      testUrl: c.admissionsTest.officialUrl ?? '',
      interview: c.interview,
      contextual: c.contextualOffer.availability,
      gcse: c.gcseRequirements ?? '',
      english: c.englishLanguageRequirements ?? '',
      international: c.internationalNotes ?? '',
      officialUrl: c.provenance.officialUrl ?? '',
      sourceUrl: c.provenance.sourceUrl ?? '',
      sourceTitle: c.provenance.sourceTitle ?? '',
      lastVerified: c.provenance.lastVerified ?? '',
      verification: c.provenance.verificationStatus,
      notes: c.notes ?? '',
      offers: c.offers.map((o) => ({
        label: o.label,
        gradeProfile: o.gradeProfile,
        isContextual: o.isContextual,
        appliesOnlyIfTaking: o.appliesOnlyIfTaking.join(', '),
        rawText: o.rawText ?? '',
        notes: o.notes ?? '',
        requirements: o.subjectRequirements.map((r) => ({
          subject: r.subject,
          required: r.required,
          minimumGrade: (r.minimumGrade ?? '') as ALevelGrade | '',
        })),
      })),
    });
  };

  const json = useMemo(() => {
    const record = {
      slug: draft.slug || 'new-course-slug',
      universityId: draft.universityId,
      name: draft.name || 'Course name',
      subjectCategory: draft.category,
      subjectSubcategory: draft.sub,
      degreeType: draft.degree,
      durationYears: draft.years === '' ? null : Number(draft.years),
      courseCode: draft.code || null,
      applicationYear: draft.year,
      requirementsPublicationStatus: draft.publication,
      rawRequirementText: draft.raw || null,
      offers:
        draft.publication === 'published'
          ? draft.offers.map((o) => ({
              label: o.label,
              gradeProfile: o.gradeProfile,
              required: o.requirements
                .filter((r) => r.required && r.subject.trim())
                .map((r) => (r.minimumGrade ? [r.subject, r.minimumGrade] : r.subject)),
              recommended: o.requirements
                .filter((r) => !r.required && r.subject.trim())
                .map((r) => r.subject),
              appliesOnlyIfTaking: o.appliesOnlyIfTaking
                ? o.appliesOnlyIfTaking.split(',').map((s) => s.trim()).filter(Boolean)
                : undefined,
              isContextual: o.isContextual || undefined,
              rawText: o.rawText || undefined,
              notes: o.notes || undefined,
            }))
          : [],
      mathematics: draft.maths,
      physics: draft.physics,
      chemistry: draft.chemistry,
      furtherMathematics: draft.fm,
      admissionsTest: {
        code: draft.test,
        requirement: draft.testRequirement,
        details: draft.testDetails || null,
        officialUrl: draft.testUrl || null,
      },
      interview: draft.interview,
      contextualOffer: { availability: draft.contextual, details: null },
      gcseRequirements: draft.gcse || null,
      englishLanguageRequirements: draft.english || null,
      internationalNotes: draft.international || null,
      notes: draft.notes || null,
      provenance: {
        verificationStatus: draft.verification,
        officialUrl: draft.officialUrl || null,
        sourceUrl: draft.sourceUrl || null,
        sourceTitle: draft.sourceTitle || null,
        lastVerified: draft.lastVerified || null,
        sources: [],
      },
    };
    return JSON.stringify(record, null, 2);
  }, [draft]);

  const readyToVerify = Boolean(draft.sourceUrl && draft.sourceTitle && draft.lastVerified);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
      <div className="space-y-4">
        <Card className="p-4">
          <SectionTitle
            right={
              <select
                className="field h-8 w-56 py-1 text-xs"
                defaultValue=""
                onChange={(e) => e.target.value && loadExisting(e.target.value)}
              >
                <option value="">Load an existing record…</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {universities.find((u) => u.id === c.universityId)?.shortName} — {c.name} ({c.applicationYear})
                  </option>
                ))}
              </select>
            }
          >
            Course
          </SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="University">
              <select className="field" value={draft.universityId} onChange={(e) => set('universityId', e.target.value)}>
                {universities.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Course name">
              <input className="field" value={draft.name} onChange={(e) => set('name', e.target.value)} placeholder="Physics MPhys" />
            </Field>
            <Field label="Slug" hint="Stable id shared by every entry year of this course.">
              <input className="field" value={draft.slug} onChange={(e) => set('slug', e.target.value)} placeholder="oxford-physics" />
            </Field>
            <Field label="UCAS course code">
              <input className="field" value={draft.code} onChange={(e) => set('code', e.target.value)} />
            </Field>
            <Field label="Subject area">
              <select className="field" value={draft.category} onChange={(e) => set('category', e.target.value as SubjectCategory)}>
                <option value="physics">Physics</option>
                <option value="engineering">Engineering</option>
              </select>
            </Field>
            <Field label="Specialism">
              <select className="field" value={draft.sub} onChange={(e) => set('sub', e.target.value as SubjectSubcategory)}>
                {SUBCATEGORIES.filter((s) => s.category === draft.category).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Qualification">
              <select className="field" value={draft.degree} onChange={(e) => set('degree', e.target.value as DegreeType)}>
                {DEGREE_TYPES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Duration (years)" hint="Leave blank if not recorded.">
              <input className="field" value={draft.years} onChange={(e) => set('years', e.target.value)} />
            </Field>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>Application cycle and wording</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Entry year">
              <select className="field" value={draft.year} onChange={(e) => set('year', e.target.value as ApplicationYear)}>
                {APPLICATION_YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y} entry
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Requirements published?" hint="Never copy an earlier year's requirements forward.">
              <select
                className="field"
                value={draft.publication}
                onChange={(e) => set('publication', e.target.value as PublicationStatus)}
              >
                <option value="published">Published</option>
                <option value="not-yet-published">Not yet published</option>
                <option value="unknown">Unknown</option>
              </select>
            </Field>
          </div>
          <div className="mt-3">
            <Field label="University's own wording (verbatim)" hint="Copy and paste exactly. Shown next to the structured version.">
              <textarea className="field min-h-[70px]" value={draft.raw} onChange={(e) => set('raw', e.target.value)} />
            </Field>
          </div>
        </Card>

        {draft.publication === 'published' ? (
          <Card className="p-4">
            <SectionTitle
              right={
                <button
                  type="button"
                  className="btn-secondary h-8 px-2.5 text-xs"
                  onClick={() => setDraft((d) => ({ ...d, offers: [...d.offers, blankOffer()] }))}
                >
                  Add offer pathway
                </button>
              }
            >
              Offer pathways
            </SectionTitle>
            <div className="space-y-4">
              {draft.offers.map((offer, oi) => (
                <div key={oi} className="rounded-md border border-slate-200 p-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Label">
                      <input className="field" value={offer.label} onChange={(e) => updateOffer(oi, { label: e.target.value })} />
                    </Field>
                    <Field label="Grade profile">
                      <input
                        className="field font-semibold tabular-nums"
                        value={offer.gradeProfile}
                        onChange={(e) => updateOffer(oi, { gradeProfile: e.target.value })}
                        placeholder="A*AA"
                      />
                    </Field>
                    <div className="flex items-end gap-2 pb-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-navy-800"
                          checked={offer.isContextual}
                          onChange={(e) => updateOffer(oi, { isContextual: e.target.checked })}
                        />
                        Contextual
                      </label>
                      {draft.offers.length > 1 ? (
                        <button
                          type="button"
                          className="ml-auto rounded p-1.5 text-slate-400 hover:text-rose-600"
                          onClick={() => setDraft((d) => ({ ...d, offers: d.offers.filter((_, i) => i !== oi) }))}
                          aria-label="Remove pathway"
                        >
                          <IconCross width={14} height={14} />
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field
                      label="Applies only if taking"
                      hint="Comma-separated. Use for offers like “AAA if Further Mathematics is taken”."
                    >
                      <input
                        className="field"
                        value={offer.appliesOnlyIfTaking}
                        onChange={(e) => updateOffer(oi, { appliesOnlyIfTaking: e.target.value })}
                        placeholder="Further Mathematics"
                      />
                    </Field>
                    <Field label="Pathway wording (verbatim)">
                      <input className="field" value={offer.rawText} onChange={(e) => updateOffer(oi, { rawText: e.target.value })} />
                    </Field>
                  </div>

                  <div className="mt-3">
                    <div className="label mb-1.5">Subject requirements</div>
                    <div className="space-y-2">
                      {offer.requirements.map((req, ri) => (
                        <div key={ri} className="flex flex-wrap items-center gap-2">
                          <input
                            className="field h-9 min-w-0 flex-1 basis-40 py-1.5"
                            value={req.subject}
                            placeholder="Subject"
                            onChange={(e) => updateReq(oi, ri, { subject: e.target.value })}
                          />
                          <select
                            className="field h-9 w-32 py-1.5"
                            value={req.required ? 'required' : 'recommended'}
                            onChange={(e) => updateReq(oi, ri, { required: e.target.value === 'required' })}
                          >
                            <option value="required">Required</option>
                            <option value="recommended">Recommended</option>
                          </select>
                          <select
                            className="field h-9 w-24 py-1.5"
                            value={req.minimumGrade}
                            onChange={(e) => updateReq(oi, ri, { minimumGrade: e.target.value as ALevelGrade | '' })}
                          >
                            <option value="">No min.</option>
                            {A_LEVEL_GRADES.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="rounded p-1.5 text-slate-400 hover:text-rose-600"
                            onClick={() =>
                              updateOffer(oi, { requirements: offer.requirements.filter((_, j) => j !== ri) })
                            }
                            aria-label="Remove requirement"
                          >
                            <IconCross width={14} height={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="btn-secondary mt-2 h-8 px-2.5 text-xs"
                      onClick={() =>
                        updateOffer(oi, {
                          requirements: [...offer.requirements, { subject: '', required: true, minimumGrade: '' }],
                        })
                      }
                    >
                      Add subject
                    </button>
                    <p className="mt-2 text-[11px] text-ink-faint">
                      Cross-subject rules (“an A* in either Mathematics or Physics”) are entered as
                      constraints in the JSON — see the schema in <code>data/SCHEMA.md</code>.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        <Card className="p-4">
          <SectionTitle>Subject statuses and admissions</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(
              [
                ['Mathematics', 'maths'],
                ['Physics', 'physics'],
                ['Chemistry', 'chemistry'],
              ] as const
            ).map(([label, key]) => (
              <Field key={key} label={label}>
                <select
                  className="field"
                  value={draft[key]}
                  onChange={(e) => set(key, e.target.value as SubjectStatus)}
                >
                  {SUBJECT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {SUBJECT_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </Field>
            ))}
            <Field label="Further Mathematics">
              <select className="field" value={draft.fm} onChange={(e) => set('fm', e.target.value as FurtherMathsStatus)}>
                {FURTHER_MATHS_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {FURTHER_MATHS_LABEL[s]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Admissions test">
              <select className="field" value={draft.test} onChange={(e) => set('test', e.target.value as AdmissionsTestCode)}>
                {ADMISSIONS_TESTS.map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.shortName} — {t.fullName}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Test requirement">
              <select
                className="field"
                value={draft.testRequirement}
                onChange={(e) => set('testRequirement', e.target.value as AdmissionsTestRequirementLevel)}
              >
                <option value="required">Required</option>
                <option value="optional">Optional</option>
                <option value="not-required">Not required</option>
                <option value="not-announced">Not yet announced</option>
                <option value="unknown">Unknown</option>
              </select>
            </Field>
            <Field label="Test details">
              <input className="field" value={draft.testDetails} onChange={(e) => set('testDetails', e.target.value)} />
            </Field>
            <Field label="Official test URL">
              <input className="field" value={draft.testUrl} onChange={(e) => set('testUrl', e.target.value)} />
            </Field>
            <Field label="Interview">
              <select className="field" value={draft.interview} onChange={(e) => set('interview', e.target.value as InterviewPolicy)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="sometimes">Sometimes</option>
                <option value="not-stated">No information published</option>
              </select>
            </Field>
            <Field label="Contextual offer">
              <select
                className="field"
                value={draft.contextual}
                onChange={(e) => set('contextual', e.target.value as ContextualOfferAvailability)}
              >
                <option value="yes">Available</option>
                <option value="no">Not offered</option>
                <option value="check-website">Check university website</option>
                <option value="unknown">No information published</option>
              </select>
            </Field>
            <Field label="GCSE requirements">
              <input className="field" value={draft.gcse} onChange={(e) => set('gcse', e.target.value)} />
            </Field>
            <Field label="English language requirements">
              <input className="field" value={draft.english} onChange={(e) => set('english', e.target.value)} />
            </Field>
            <Field label="International applicant notes">
              <input className="field" value={draft.international} onChange={(e) => set('international', e.target.value)} />
            </Field>
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle>Source and verification</SectionTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Official course URL">
              <input className="field" value={draft.officialUrl} onChange={(e) => set('officialUrl', e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Admissions source URL">
              <input className="field" value={draft.sourceUrl} onChange={(e) => set('sourceUrl', e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Source title">
              <input
                className="field"
                value={draft.sourceTitle}
                onChange={(e) => set('sourceTitle', e.target.value)}
                placeholder="University of X undergraduate admissions website"
              />
            </Field>
            <Field label="Last verified" hint="Leave blank if you have not checked the source yourself.">
              <input type="date" className="field" value={draft.lastVerified} onChange={(e) => set('lastVerified', e.target.value)} />
            </Field>
            <Field label="Verification status">
              <select
                className="field"
                value={draft.verification}
                onChange={(e) => set('verification', e.target.value as VerificationStatus)}
              >
                {VERIFICATION_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {VERIFICATION_LABEL[s]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Notes">
              <input className="field" value={draft.notes} onChange={(e) => set('notes', e.target.value)} />
            </Field>
          </div>
          <div className="mt-3">
            {draft.verification === 'verified' && !readyToVerify ? (
              <Badge tone="red">
                Cannot be verified without a source URL, a source title and a check date
              </Badge>
            ) : readyToVerify ? (
              <Badge tone="green">Source, title and check date present</Badge>
            ) : (
              <Badge tone="amber">Source details incomplete</Badge>
            )}
          </div>
        </Card>
      </div>

      <div className="lg:sticky lg:top-[76px] lg:self-start">
        <Card className="p-4">
          <SectionTitle>Generated record</SectionTitle>
          <p className="mb-2 text-xs text-ink-muted">
            Paste into <code className="rounded bg-slate-100 px-1">data/courses.json</code>, or feed it to
            the importer on the Import tab.
          </p>
          <CopyBlock text={json} filename="course record (JSON)" />
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function AdminPage() {
  usePageTitle('Data manager');
  const { courses, universities, validation } = useApp();
  const [tab, setTab] = useState<Tab>('records');

  const counts = useMemo(() => {
    const verified = courses.filter((c) => c.provenance.verificationStatus === 'verified').length;
    const partial = courses.filter((c) => c.provenance.verificationStatus === 'partially-verified').length;
    const awaiting = courses.filter((c) => c.provenance.verificationStatus === 'awaiting-data').length;
    const demo = courses.filter((c) => c.provenance.verificationStatus === 'demo').length;
    return { verified, partial, awaiting, demo };
  }, [courses]);

  return (
    <div className="mx-auto max-w-8xl px-4 py-6 md:px-6">
      <PageHeader
        eyebrow="Development tool"
        title="Data manager"
        description="Maintains the catalogue: browse every record with its provenance, edit or draft a record, import a batch, and see what validation has flagged. Runs entirely in the browser with no backend and no authentication."
        actions={
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { id: 'records', label: 'Records' },
              { id: 'editor', label: 'Editor' },
              { id: 'import', label: 'Import / export' },
              { id: 'duplicates', label: `Duplicates (${validation.duplicates.length})` },
              { id: 'validation', label: `Validation (${validation.counts.error})` },
            ]}
          />
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-6">
        {[
          { label: 'Universities', value: universities.length },
          { label: 'Course records', value: courses.length },
          { label: 'Verified', value: counts.verified },
          { label: 'Partially verified', value: counts.partial },
          { label: 'Awaiting data', value: counts.awaiting },
          { label: 'Sample records', value: counts.demo },
        ].map((stat) => (
          <Card key={stat.label} className="p-3">
            <div className="label">{stat.label}</div>
            <div className="mt-1 text-xl font-semibold tabular-nums text-navy-950">{stat.value}</div>
          </Card>
        ))}
      </div>

      {tab === 'records' ? <RecordsTab /> : null}
      {tab === 'editor' ? <EditorTab /> : null}
      {tab === 'import' ? <ImportTab /> : null}
      {tab === 'duplicates' ? <DuplicatesTab /> : null}
      {tab === 'validation' ? <ValidationTab /> : null}
    </div>
  );
}
