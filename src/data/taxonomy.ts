import type {
  AdmissionsTestMeta,
  AdmissionsTestRequirementLevel,
  DegreeTypeMeta,
  FurtherMathsStatus,
  GlossaryTerm,
  SubcategoryMeta,
  SubjectCategory,
  SubjectStatus,
  VerificationStatus,
} from '@/types';

/* ------------------------------------------------------------------ */
/* Status vocabularies and their labels                                */
/* ------------------------------------------------------------------ */

export const FURTHER_MATHS_STATUSES: readonly FurtherMathsStatus[] = [
  'required',
  'conditional',
  'strongly-recommended',
  'recommended',
  'useful',
  'no-stated-preference',
  'not-required',
  'unknown',
] as const;

export const FURTHER_MATHS_LABEL: Record<FurtherMathsStatus, string> = {
  required: 'Required',
  conditional: 'Required in some circumstances',
  'strongly-recommended': 'Strongly recommended',
  recommended: 'Recommended',
  useful: 'Useful',
  'no-stated-preference': 'No stated preference',
  'not-required': 'Not required',
  unknown: 'Not recorded yet',
};

export const SUBJECT_STATUSES: readonly SubjectStatus[] = [
  'required',
  'recommended',
  'not-required',
  'unknown',
] as const;

export const SUBJECT_STATUS_LABEL: Record<SubjectStatus, string> = {
  required: 'Required',
  recommended: 'Recommended',
  'not-required': 'Not required',
  unknown: 'Not recorded yet',
};

export const VERIFICATION_STATUSES: readonly VerificationStatus[] = [
  'verified',
  'partially-verified',
  'awaiting-publication',
  'awaiting-data',
  'demo',
  'unknown',
] as const;

export const VERIFICATION_LABEL: Record<VerificationStatus, string> = {
  verified: 'Verified',
  'partially-verified': 'Partially verified',
  // These two are easy to confuse and mean very different things, so the labels
  // say WHOSE state they describe: the university's publication cycle, or our
  // research backlog.
  'awaiting-publication': 'University has not published yet',
  'awaiting-data': 'Not verified by us yet',
  demo: 'Sample data',
  unknown: 'Unverified',
};

export const VERIFICATION_DESCRIPTION: Record<VerificationStatus, string> = {
  verified: 'Checked against the university’s official source on the date shown.',
  'partially-verified':
    'Some admissions information is supported by the university’s official source, but one or more relevant fields could not be confirmed. This describes how complete our evidence is, not whether the course or university is sound.',
  'awaiting-publication':
    'A real course. The university has not published its admissions requirements for this entry year yet, so none are shown. This is the university’s publication cycle, not a gap in our research.',
  'awaiting-data':
    'A real course. We have its identity — university, title, award, UCAS code — but we have not yet checked its admissions requirements against the university’s own pages, so none are shown.',
  demo: 'Placeholder data shipped with the app. Not real admissions information.',
  unknown: 'No verification information recorded for this record.',
};

export const TEST_REQUIREMENT_LABEL: Record<AdmissionsTestRequirementLevel, string> = {
  required: 'Required',
  conditional: 'Required only in some cases',
  optional: 'Optional',
  'not-required': 'Not required',
  'not-announced': 'Not yet announced',
  unknown: 'Not recorded yet',
};

/* ------------------------------------------------------------------ */
/* Subject categories                                                  */
/* ------------------------------------------------------------------ */

export const SUBJECT_CATEGORIES: { id: SubjectCategory; label: string; blurb: string }[] = [
  {
    id: 'physics',
    label: 'Physics',
    blurb:
      'Single-honours physics and its specialisms — theoretical, mathematical, astrophysics and combined routes.',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    blurb:
      'General engineering and the named disciplines, including mechanical, electrical, civil, chemical and aerospace.',
  },
];

export const SUBCATEGORIES: SubcategoryMeta[] = [
  // Physics
  { id: 'physics', category: 'physics', label: 'Physics', blurb: 'Core single-honours physics.' },
  {
    id: 'theoretical-physics',
    category: 'physics',
    label: 'Theoretical Physics',
    blurb: 'Heavier mathematical content; usually a stronger Further Mathematics preference.',
  },
  {
    id: 'mathematical-physics',
    category: 'physics',
    label: 'Mathematical Physics',
    blurb: 'Joint programmes taught between physics and mathematics departments.',
  },
  {
    id: 'astrophysics',
    category: 'physics',
    label: 'Astrophysics',
    blurb: 'Physics with a specialised astrophysics stream.',
  },
  {
    id: 'physics-with-astronomy',
    category: 'physics',
    label: 'Physics with Astronomy',
    blurb: 'Physics core with observational and astronomical options.',
  },
  {
    id: 'physics-with-computing',
    category: 'physics',
    label: 'Physics with Computing',
    blurb: 'Physics combined with scientific computing or data analysis.',
  },
  {
    id: 'physics-with-mathematics',
    category: 'physics',
    label: 'Physics with Mathematics',
    blurb: 'Physics with substantial shared mathematics modules.',
  },
  {
    id: 'natural-sciences-physical',
    category: 'physics',
    label: 'Natural Sciences (Physical)',
    blurb: 'Broad first-year science routes that lead to a physics specialisation.',
  },
  // Engineering
  {
    id: 'general-engineering',
    category: 'engineering',
    label: 'General Engineering',
    blurb: 'Broad first two years before specialising.',
  },
  {
    id: 'engineering-science',
    category: 'engineering',
    label: 'Engineering Science',
    blurb: 'Unified engineering degrees covering several disciplines.',
  },
  { id: 'mechanical', category: 'engineering', label: 'Mechanical Engineering', blurb: 'Mechanics, thermofluids, design and manufacture.' },
  { id: 'electrical', category: 'engineering', label: 'Electrical Engineering', blurb: 'Power systems, control and electrical machines.' },
  { id: 'electronic', category: 'engineering', label: 'Electronic Engineering', blurb: 'Devices, circuits, embedded systems and communications.' },
  { id: 'civil', category: 'engineering', label: 'Civil Engineering', blurb: 'Structures, geotechnics, water and infrastructure.' },
  { id: 'chemical', category: 'engineering', label: 'Chemical Engineering', blurb: 'Process design and reaction engineering. Usually requires Chemistry.' },
  { id: 'aerospace', category: 'engineering', label: 'Aerospace Engineering', blurb: 'Aircraft and spacecraft systems.' },
  { id: 'aeronautical', category: 'engineering', label: 'Aeronautical Engineering', blurb: 'Aerodynamics, flight and airframe structures.' },
  { id: 'materials', category: 'engineering', label: 'Materials Engineering', blurb: 'Materials science, metallurgy and composites.' },
  { id: 'biomedical', category: 'engineering', label: 'Biomedical Engineering', blurb: 'Engineering applied to medicine and healthcare.' },
  {
    id: 'biochemical',
    category: 'engineering',
    label: 'Biochemical Engineering',
    blurb: 'Bioprocess and biological manufacturing engineering.',
  },
  {
    id: 'design',
    category: 'engineering',
    label: 'Design Engineering',
    blurb: 'Engineering design, product development and human-centred engineering.',
  },
  {
    id: 'robotics-mechatronics',
    category: 'engineering',
    label: 'Robotics and Mechatronics',
    blurb: 'Robotics, mechatronics and autonomous systems.',
  },
  {
    id: 'nuclear',
    category: 'engineering',
    label: 'Nuclear Engineering',
    blurb: 'Reactor systems, radiation, fuel cycles and decommissioning.',
  },
  {
    id: 'information-engineering',
    category: 'engineering',
    label: 'Information Engineering',
    blurb: 'Signal processing, information systems and machine learning.',
  },
  {
    id: 'computer-engineering',
    category: 'engineering',
    label: 'Computer Engineering',
    blurb: 'Hardware/software co-design, computer architecture and systems.',
  },
];

export const SUBCATEGORY_BY_ID: Record<string, SubcategoryMeta> = Object.fromEntries(
  SUBCATEGORIES.map((s) => [s.id, s]),
);

export function subcategoryLabel(id: string): string {
  return SUBCATEGORY_BY_ID[id]?.label ?? id;
}

/* ------------------------------------------------------------------ */
/* Degree types                                                        */
/* ------------------------------------------------------------------ */

export const DEGREE_TYPES: DegreeTypeMeta[] = [
  {
    id: 'BSc',
    label: 'BSc',
    description: 'Bachelor of Science. Usually three years in England, Wales and Northern Ireland.',
    integratedMasters: false,
  },
  {
    id: 'BEng',
    label: 'BEng',
    description:
      'Bachelor of Engineering. Three years typically; often accredited to partial Chartered Engineer requirements.',
    integratedMasters: false,
  },
  {
    id: 'BA',
    label: 'BA',
    description:
      'Bachelor of Arts. Some universities award BA for science and engineering subjects for historical reasons.',
    integratedMasters: false,
  },
  {
    id: 'MPhys',
    label: 'MPhys',
    description:
      'Integrated Master’s in Physics. Four years (five in Scotland), no separate Master’s application.',
    integratedMasters: true,
  },
  {
    id: 'MSci',
    label: 'MSci',
    description: 'Integrated Master’s in Science, used by many physics departments. Four years.',
    integratedMasters: true,
  },
  {
    id: 'MEng',
    label: 'MEng',
    description:
      'Integrated Master’s in Engineering. Four years, and the usual route toward Chartered Engineer status.',
    integratedMasters: true,
  },
  {
    id: 'MMath',
    label: 'MMath',
    description: 'Integrated Master’s in Mathematics, used by some mathematical physics routes.',
    integratedMasters: true,
  },
  { id: 'Other', label: 'Other', description: 'Another award title.', integratedMasters: false },
];

export const DEGREE_TYPE_BY_ID: Record<string, DegreeTypeMeta> = Object.fromEntries(
  DEGREE_TYPES.map((d) => [d.id, d]),
);

/* ------------------------------------------------------------------ */
/* Admissions tests                                                    */
/* ------------------------------------------------------------------ */

export const ADMISSIONS_TESTS: AdmissionsTestMeta[] = [
  {
    code: 'none',
    shortName: 'None',
    fullName: 'No admissions test',
    description: 'The course does not use a pre-interview or pre-offer admissions test.',
    infoUrl: null,
  },
  {
    code: 'esat',
    shortName: 'ESAT',
    fullName: 'Engineering and Science Admissions Test',
    description:
      'Multiple-choice test in mathematics and science, used by some engineering and natural-science courses.',
    infoUrl: null,
  },
  {
    code: 'pat',
    shortName: 'PAT',
    fullName: 'Physics Aptitude Test',
    description: 'Physics and mathematics test used by some physics and engineering courses.',
    infoUrl: null,
  },
  {
    code: 'tmua',
    shortName: 'TMUA',
    fullName: 'Test of Mathematics for University Admission',
    description:
      'Mathematical thinking and reasoning test. Some courses require it, others treat it as optional evidence.',
    infoUrl: null,
  },
  {
    code: 'step',
    shortName: 'STEP',
    fullName: 'Sixth Term Examination Paper',
    description:
      'Advanced mathematics examination usually taken after the A-Level exams and attached to an offer condition.',
    infoUrl: null,
  },
  {
    code: 'tara',
    shortName: 'TARA',
    fullName: 'Test of Academic Reasoning for Admissions',
    description:
      'Reasoning test run by University Admissions Tests UK, used by some engineering courses from the 2027 cycle.',
    infoUrl: null,
  },
  {
    code: 'mat',
    shortName: 'MAT',
    fullName: 'Mathematics Admissions Test',
    description: 'Mathematics test used mainly for mathematics and computer science routes.',
    infoUrl: null,
  },
  {
    code: 'university-specific',
    shortName: 'University test',
    fullName: 'University-specific assessment',
    description: 'An assessment set and marked by the university itself.',
    infoUrl: null,
  },
  {
    code: 'other',
    shortName: 'Other',
    fullName: 'Other assessment',
    description: 'Another form of assessment, named in the record’s details field.',
    infoUrl: null,
  },
  {
    code: 'not-announced',
    shortName: 'Not yet announced',
    fullName: 'Not yet announced for this cycle',
    description:
      'The university has not published test arrangements for this application year. Arrangements from an earlier year are not carried over.',
    infoUrl: null,
  },
  {
    code: 'unknown',
    shortName: 'Unknown',
    fullName: 'Not recorded',
    description: 'This catalogue has not recorded the test arrangements for this course yet.',
    infoUrl: null,
  },
];

export const ADMISSIONS_TEST_BY_CODE: Record<string, AdmissionsTestMeta> = Object.fromEntries(
  ADMISSIONS_TESTS.map((t) => [t.code, t]),
);

/* ------------------------------------------------------------------ */
/* Common A-Level subjects (for the profile builder and filters)       */
/* ------------------------------------------------------------------ */

export const COMMON_A_LEVEL_SUBJECTS = [
  'Mathematics',
  'Further Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Economics',
  'Design and Technology',
  'Electronics',
  'Geography',
  'History',
  'English Literature',
  'French',
  'Spanish',
  'German',
  'Arabic',
  'Psychology',
  'Business Studies',
  'Art and Design',
  'Music',
  'Politics',
  'Philosophy',
  'Statistics',
];

/** Subjects the filters expose as explicit requirement switches. */
export const KEY_SUBJECTS = ['Mathematics', 'Further Mathematics', 'Physics', 'Chemistry'] as const;

/* ------------------------------------------------------------------ */
/* Glossary (drives the info tooltips)                                 */
/* ------------------------------------------------------------------ */

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'typical-offer',
    term: 'Typical offer',
    definition:
      'The grades a university usually asks for. It is a guide published by the university, not a guarantee — individual offers can be higher or lower.',
  },
  {
    id: 'contextual-offer',
    term: 'Contextual offer',
    definition:
      'A reduced grade offer some universities make to applicants whose circumstances — school, area, care experience — meet published criteria.',
  },
  {
    id: 'required-subject',
    term: 'Required subject',
    definition:
      'An A-Level you must be taking to be considered. Without it an application is normally rejected regardless of grades.',
  },
  {
    id: 'recommended-subject',
    term: 'Recommended subject',
    definition:
      'A subject the university says is useful or advantageous but does not insist on. Not having it does not automatically rule you out.',
  },
  {
    id: 'admissions-test',
    term: 'Admissions test',
    definition:
      'An extra written test sat before or alongside your application, such as the ESAT, PAT, TMUA, MAT or STEP. Registration deadlines are usually months before the test.',
  },
  {
    id: 'integrated-masters',
    term: 'Integrated Master’s',
    definition:
      'A four-year (or five-year in Scotland) undergraduate degree that includes Master’s-level study, awarded as MPhys, MSci, MEng or MMath. You do not apply separately for the final year.',
  },
  {
    id: 'bsc',
    term: 'BSc',
    definition: 'Bachelor of Science — a three-year undergraduate science degree in most of the UK.',
  },
  {
    id: 'beng',
    term: 'BEng',
    definition:
      'Bachelor of Engineering — a three-year engineering degree. Often needs further study to reach Chartered Engineer status.',
  },
  {
    id: 'meng',
    term: 'MEng',
    definition:
      'An integrated Master’s in Engineering, normally four years, and the usual single route toward Chartered Engineer accreditation.',
  },
  {
    id: 'mphys',
    term: 'MPhys',
    definition: 'An integrated Master’s in Physics, normally four years in England and five in Scotland.',
  },
  {
    id: 'msci',
    term: 'MSci',
    definition: 'An integrated Master’s in Science — the same idea as an MPhys, used by many physics departments.',
  },
  {
    id: 'further-maths',
    term: 'Further Mathematics',
    definition:
      'A second, more advanced mathematics A-Level. Physics and engineering courses vary widely: some require it, many recommend it, and some publish no preference.',
  },
  {
    id: 'ucas-code',
    term: 'UCAS course code',
    definition:
      'The short code (for example F300) that identifies a specific course on the UCAS application system.',
  },
  {
    id: 'application-year',
    term: 'Entry year',
    definition:
      'The academic year you would start. Requirements are published per cycle, so 2027 entry and 2028 entry requirements can differ.',
  },
  {
    id: 'last-verified',
    term: 'Last verified',
    definition:
      'The date this record was last checked against the university’s official page. Older dates mean the information is more likely to have moved on.',
  },
  {
    id: 'offer-pathway',
    term: 'Offer pathway',
    definition:
      'One published route to an offer. Universities often publish more than one — for example a standard offer and a lower offer for applicants taking Further Mathematics. You need to satisfy only one pathway, and each is checked separately.',
  },
  {
    id: 'raw-requirement-text',
    term: 'University’s own wording',
    definition:
      'The requirement copied verbatim from the university’s page, shown next to our structured interpretation so you can check one against the other.',
  },
  {
    id: 'verification-status',
    term: 'Verification status',
    definition:
      'How far a record has been checked: verified, partially verified, awaiting publication, awaiting data, or sample data. Only "verified" means someone read the university’s official page on the date shown.',
  },
  {
    id: 'strongly-recommended',
    term: 'Strongly recommended',
    definition:
      'Stronger than "recommended" but short of required. The university says applicants without it are at a disadvantage, yet still accepts them. It never counts against you in this tool’s matching.',
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryTerm> = Object.fromEntries(
  GLOSSARY.map((g) => [g.id, g]),
);
