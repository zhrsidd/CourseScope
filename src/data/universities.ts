/**
 * ---------------------------------------------------------------------------
 *  DEMO SEED DATA — NOT REAL ADMISSIONS INFORMATION
 * ---------------------------------------------------------------------------
 *  University names, cities and web addresses are factual.
 *
 *  Everything admissions-related below (typical offers, Further Mathematics
 *  policy, admissions tests, interview policy, contextual offers, deadlines)
 *  and every ranking position is PLACEHOLDER DATA, flagged `dataStatus: 'demo'`
 *  and `isDemo: true`, so that the filters, comparison table and eligibility
 *  engine have something to work on.
 *
 *  Replace a record by editing it here (or by pointing `StaticDataSource` at a
 *  real API — see `src/lib/dataSource.ts`). When you enter real data, set
 *  `dataStatus: 'verified'`, fill `sourceUrl`, and set `lastVerified`.
 * ---------------------------------------------------------------------------
 */

import type {
  ApplicationDeadline,
  ApplicationYear,
  ContextualOfferInfo,
  DeadlineScope,
  FurtherMathsStatus,
  InterviewPolicy,
  Ranking,
  University,
  VerificationStatus,
} from '@/types';

interface RankSeed {
  overall?: number;
  physics?: number;
  engineering?: number;
  the?: number;
}

interface OverviewSeed {
  typicalOffer?: string | null;
  requiredSubjectsNote?: string | null;
  furtherMathematics?: FurtherMathsStatus;
  furtherMathematicsNote?: string | null;
  gcseRequirements?: string | null;
  englishLanguageRequirements?: string | null;
  admissionsTestsNote?: string | null;
  interviews?: InterviewPolicy;
  interviewsNote?: string | null;
  internationalNotes?: string | null;
  contextualOffer?: ContextualOfferInfo;
  applicationDeadline?: string | null;
}

interface UniversitySeed {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  city: string;
  region: string;
  domain: string;
  departments: string[];
  ranks?: RankSeed;
  deadlines?: DeadlineSeed[];
  overview?: OverviewSeed;
}

const DEMO_RANKING_EDITION = 2027;

/**
 * Every ranking is its own record with its own provenance. Positions from
 * different providers, editions or categories are never combined — a QS
 * subject position and a THE overall position sit side by side, each labelled.
 */
function ranking(
  universityId: string,
  provider: string,
  providerShort: string,
  category: Ranking['category'],
  categoryLabel: string,
  rank: number,
): Ranking {
  return {
    id: `${universityId}--${providerShort.toLowerCase()}--${category}--${DEMO_RANKING_EDITION}`,
    universityId,
    provider,
    providerShort,
    edition: DEMO_RANKING_EDITION,
    category,
    categoryLabel,
    rank,
    // Placeholder positions carry no source, no title and no check date, so
    // they can never be presented as verified information.
    sourceUrl: null,
    sourceTitle: null,
    lastVerified: null,
    verificationStatus: 'demo',
    notes: null,
  };
}

function buildRankings(universityId: string, seed: RankSeed | undefined): Ranking[] {
  if (!seed) return [];
  const out: Ranking[] = [];
  if (seed.overall !== undefined) {
    out.push(
      ranking(universityId, 'QS World University Rankings', 'QS', 'overall', 'Overall', seed.overall),
    );
  }
  if (seed.physics !== undefined) {
    out.push(
      ranking(
        universityId,
        'QS World University Rankings by Subject',
        'QS',
        'physics-astronomy',
        'Physics & Astronomy',
        seed.physics,
      ),
    );
  }
  if (seed.engineering !== undefined) {
    out.push(
      ranking(
        universityId,
        'QS World University Rankings by Subject',
        'QS',
        'engineering-technology',
        'Engineering & Technology',
        seed.engineering,
      ),
    );
  }
  if (seed.the !== undefined) {
    out.push(
      ranking(
        universityId,
        'Times Higher Education World University Rankings',
        'THE',
        'overall',
        'Overall',
        seed.the,
      ),
    );
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Application deadlines                                               */
/* ------------------------------------------------------------------ */

interface DeadlineSeed {
  label: string;
  /** ISO date. Left null unless a real date was supplied with verified data. */
  date?: string | null;
  appliesTo?: DeadlineScope;
  notes?: string | null;
  years?: ApplicationYear[];
  /** Defaults to 'demo'. Dated entries from the real-data batches are higher. */
  verification?: VerificationStatus;
  sourceTitle?: string | null;
  sourceUrl?: string | null;
  lastVerified?: string | null;
}

const DEADLINE_YEARS: ApplicationYear[] = ['2027', '2028'];

function buildDeadlines(universityId: string, seeds: DeadlineSeed[] | undefined): ApplicationDeadline[] {
  const list = seeds ?? [
    {
      label: 'UCAS equal consideration deadline',
      notes: 'The standard UCAS deadline for courses starting the following autumn.',
    },
  ];
  return list.flatMap((seed) =>
    (seed.years ?? DEADLINE_YEARS).map((year, i) => ({
      id: `${universityId}--deadline-${slugifyLabel(seed.label)}-${year}-${i}`,
      universityId,
      label: seed.label,
      // Exact dates change every cycle and are not guessed here.
      date: seed.date ?? null,
      applicationYear: year,
      appliesTo: seed.appliesTo ?? { kind: 'all-courses' as const },
      notes: seed.notes ?? null,
      sourceUrl: seed.sourceUrl ?? null,
      sourceTitle: seed.sourceTitle ?? null,
      lastVerified: seed.lastVerified ?? null,
      verificationStatus: seed.verification ?? 'demo',
    })),
  );
}

function slugifyLabel(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function makeUniversity(seed: UniversitySeed): University {
  const o = seed.overview ?? {};
  return {
    id: seed.id,
    slug: seed.id,
    name: seed.name,
    shortName: seed.shortName,
    initials: seed.initials,
    city: seed.city,
    region: seed.region,
    country: 'United Kingdom',
    founded: null,
    website: `https://www.${seed.domain}`,
    admissionsUrl: null,
    departments: seed.departments,
    rankings: buildRankings(seed.id, seed.ranks),
    applicationDeadlines: buildDeadlines(seed.id, seed.deadlines),
    admissionsOverview: {
      typicalOffer: o.typicalOffer ?? null,
      requiredSubjectsNote: o.requiredSubjectsNote ?? null,
      furtherMathematics: o.furtherMathematics ?? 'unknown',
      furtherMathematicsNote: o.furtherMathematicsNote ?? null,
      gcseRequirements: o.gcseRequirements ?? null,
      englishLanguageRequirements: o.englishLanguageRequirements ?? null,
      admissionsTestsNote: o.admissionsTestsNote ?? null,
      interviews: o.interviews ?? 'not-stated',
      interviewsNote: o.interviewsNote ?? null,
      internationalNotes: o.internationalNotes ?? null,
      contextualOffer: o.contextualOffer ?? { availability: 'unknown', details: null },
      applicationDeadline: o.applicationDeadline ?? null,
      provenance: {
        verificationStatus: 'demo',
        // A university, not a course: its existence is not in question, and the
        // application-identity invariant is about courses.
        identityVerification: 'official-page',
        identityNote: null,
        officialUrl: `https://www.${seed.domain}`,
        sourceUrl: null,
        sourceTitle: null,
        lastVerified: null,
        sources: [],
      },
    },
    verificationStatus: 'demo',
  };
}

const SEEDS: UniversitySeed[] = [
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    shortName: 'Cambridge',
    initials: 'CAM',
    city: 'Cambridge',
    region: 'East of England',
    domain: 'cam.ac.uk',
    departments: ['Department of Physics (Cavendish Laboratory)', 'Department of Engineering'],
    ranks: { overall: 3, physics: 4, engineering: 5, the: 5 },
    deadlines: [
      {
        label: 'Earlier UCAS deadline',
        notes: 'Applies to every undergraduate course at this university, not the standard January date.',
      },
      {
        label: 'Admissions assessment registration deadline',
        appliesTo: {
          kind: 'course-slugs',
          // The two older slugs this used to name were placeholder rows that
          // the verified records and clean 2028 shells have replaced, so the
          // scope now points only at courses the catalogue actually serves.
          slugs: ['cambridge-natural-sciences', 'cambridge-engineering-meng'],
        },
        notes: 'Registration closes well before the assessment itself. Course-specific, not university-wide.',
      },
    ],
    overview: {
      typicalOffer: 'A*A*A (demo)',
      requiredSubjectsNote: 'Mathematics and Physics normally required for physical-science and engineering routes.',
      furtherMathematics: 'recommended',
      furtherMathematicsNote: 'Strongly preferred where the school offers it.',
      gcseRequirements: null,
      admissionsTestsNote: 'Pre-registration admissions assessment used for most science and engineering courses.',
      interviews: 'yes',
      interviewsNote: 'Interviews are part of the standard process for shortlisted applicants.',
      internationalNotes: null,
      contextualOffer: { availability: 'yes', details: 'Published widening-participation schemes apply.' },
      applicationDeadline: 'Earlier UCAS deadline (mid-October)',
    },
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    initials: 'OXF',
    city: 'Oxford',
    region: 'South East England',
    domain: 'ox.ac.uk',
    departments: ['Department of Physics', 'Department of Engineering Science'],
    ranks: { overall: 4, physics: 3, engineering: 4, the: 1 },
    deadlines: [
      {
        // Supplied with real-data batch 1 for the 2027 cycle.
        label: 'UCAS application deadline',
        date: '2026-10-15',
        years: ['2027'],
        notes:
          '18:00 (BST). Applies to every undergraduate course at this university, not the standard January date.',
        verification: 'verified',
        sourceTitle: 'Physics | University of Oxford',
        sourceUrl: 'https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/physics',
        lastVerified: '2026-09-01',
      },
      {
        label: 'Earlier UCAS deadline',
        years: ['2028'],
        notes: 'Date for the 2028 cycle has not been recorded.',
      },
      {
        label: 'Admissions test registration deadline',
        appliesTo: {
          kind: 'course-slugs',
          slugs: ['oxford-physics-mphys', 'oxford-engineering-science-meng'],
        },
        notes: 'Test registration is separate from the UCAS application and closes earlier.',
      },
    ],
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics normally required for Physics and Engineering Science.',
      furtherMathematics: 'recommended',
      furtherMathematicsNote: 'Helpful but the university states it is not required.',
      gcseRequirements: null,
      admissionsTestsNote: 'Subject-specific written test required before shortlisting.',
      interviews: 'yes',
      interviewsNote: 'Shortlisted applicants are interviewed in December.',
      internationalNotes: null,
      contextualOffer: { availability: 'yes', details: 'Contextual flags considered at shortlisting.' },
      applicationDeadline: 'Earlier UCAS deadline (mid-October)',
    },
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    shortName: 'Imperial',
    initials: 'ICL',
    city: 'London',
    region: 'London',
    domain: 'imperial.ac.uk',
    departments: ['Department of Physics', 'Faculty of Engineering'],
    ranks: { overall: 2, physics: 8, engineering: 6, the: 9 },
    deadlines: [
      {
        // Read from the official 2027-entry Physics BSc and EEE MEng course
        // pages, both of which state "Wednesday 13 January 2027 at 18.00 (UK
        // time)".
        label: 'UCAS equal consideration deadline',
        date: '2027-01-13',
        years: ['2027'],
        notes: '18:00 UK time.',
        verification: 'verified',
        sourceUrl: 'https://www.imperial.ac.uk/study/courses/undergraduate/physics-bsc/',
        sourceTitle: 'Physics BSc | Imperial College London',
        lastVerified: '2026-09-01',
      },
      {
        label: 'UCAS equal consideration deadline',
        years: ['2028'],
        notes: 'Date for the 2028 cycle has not been recorded.',
      },
    ],
    overview: {
      typicalOffer: 'A*A*A (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required across physics and most engineering routes.',
      furtherMathematics: 'recommended',
      furtherMathematicsNote: null,
      gcseRequirements: 'English and Mathematics at grade 4/C or above (demo).',
      admissionsTestsNote: 'Admissions tests are used for several departments; requirements vary by course.',
      interviews: 'sometimes',
      interviewsNote: null,
      internationalNotes: 'English language requirements apply to all applicants.',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'ucl',
    name: 'University College London',
    shortName: 'UCL',
    initials: 'UCL',
    city: 'London',
    region: 'London',
    domain: 'ucl.ac.uk',
    departments: ['Department of Physics and Astronomy', 'Faculty of Engineering Sciences'],
    ranks: { overall: 9, physics: 21, engineering: 20 },
    deadlines: [
      {
        // Read from UCL's own 2027-entry course pages, which state:
        // "13 January 2027. Applications close at 6pm UK time."
        label: 'UCAS equal consideration deadline',
        date: '2027-01-13',
        years: ['2027'],
        notes:
          'Applications close at 6pm UK time. UCL adds that applications may stay open after the UCAS Equal Consideration deadline — check UCAS for details.',
        verification: 'verified',
        sourceUrl: 'https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses/physics-bsc',
        sourceTitle: 'Physics BSc | Study at UCL',
        lastVerified: '2026-09-01',
      },
      {
        label: 'UCAS equal consideration deadline',
        years: ['2028'],
        notes: 'Date for the 2028 cycle has not been recorded.',
      },
    ],
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics; Mathematics required for engineering.',
      furtherMathematics: 'no-stated-preference',
      gcseRequirements: null,
      admissionsTestsNote: 'No admissions test for most undergraduate science and engineering courses (demo).',
      interviews: 'no',
      internationalNotes: null,
      contextualOffer: { availability: 'yes', details: 'Access UCL scheme (demo).' },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'manchester',
    // The institution's own current styling, used consistently across its site.
    name: 'The University of Manchester',
    shortName: 'Manchester',
    initials: 'MAN',
    city: 'Manchester',
    region: 'North West England',
    domain: 'manchester.ac.uk',
    departments: ['Department of Physics and Astronomy', 'School of Engineering'],
    ranks: { overall: 34, physics: 30, engineering: 32 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics programmes.',
      furtherMathematics: 'recommended',
      gcseRequirements: null,
      admissionsTestsNote: null,
      interviews: 'no',
      internationalNotes: null,
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'edinburgh',
    name: 'University of Edinburgh',
    shortName: 'Edinburgh',
    initials: 'EDI',
    city: 'Edinburgh',
    region: 'Scotland',
    domain: 'ed.ac.uk',
    departments: ['School of Physics and Astronomy', 'School of Engineering'],
    ranks: { overall: 27, physics: 33, engineering: 36 },
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required.',
      furtherMathematics: 'no-stated-preference',
      gcseRequirements: null,
      admissionsTestsNote: null,
      interviews: 'no',
      internationalNotes: 'Scottish degrees are normally four years for a Bachelor’s and five for an integrated Master’s.',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'bristol',
    name: 'University of Bristol',
    shortName: 'Bristol',
    initials: 'BRI',
    city: 'Bristol',
    region: 'South West England',
    domain: 'bristol.ac.uk',
    departments: ['School of Physics', 'Faculty of Engineering'],
    ranks: { overall: 54, physics: 51, engineering: 60 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics routes.',
      furtherMathematics: 'recommended',
      gcseRequirements: null,
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: 'Bristol Scholars / contextual offer scheme (demo).' },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'warwick',
    name: 'University of Warwick',
    shortName: 'Warwick',
    initials: 'WAR',
    city: 'Coventry',
    region: 'West Midlands',
    domain: 'warwick.ac.uk',
    departments: ['Department of Physics', 'School of Engineering'],
    ranks: { overall: 66, physics: 61, engineering: 78 },
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics; Mathematics required for engineering.',
      furtherMathematics: 'recommended',
      furtherMathematicsNote: 'Alternative offers are published for applicants taking Further Mathematics (demo).',
      gcseRequirements: null,
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'southampton',
    name: 'University of Southampton',
    shortName: 'Southampton',
    initials: 'SOT',
    city: 'Southampton',
    region: 'South East England',
    domain: 'southampton.ac.uk',
    departments: ['School of Physics and Astronomy', 'Faculty of Engineering and Physical Sciences'],
    ranks: { overall: 80, physics: 95, engineering: 85 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics and most engineering routes.',
      furtherMathematics: 'no-stated-preference',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'birmingham',
    name: 'University of Birmingham',
    shortName: 'Birmingham',
    initials: 'BHM',
    city: 'Birmingham',
    region: 'West Midlands',
    domain: 'birmingham.ac.uk',
    departments: ['School of Physics and Astronomy', 'School of Engineering'],
    ranks: { overall: 84, physics: 101, engineering: 96 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'no-stated-preference',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'leeds',
    name: 'University of Leeds',
    shortName: 'Leeds',
    initials: 'LDS',
    city: 'Leeds',
    region: 'Yorkshire and the Humber',
    domain: 'leeds.ac.uk',
    departments: ['School of Physics and Astronomy', 'Faculty of Engineering and Physical Sciences'],
    ranks: { overall: 82, physics: 130, engineering: 105 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics routes.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: 'Access to Leeds (demo).' },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'sheffield',
    name: 'University of Sheffield',
    shortName: 'Sheffield',
    initials: 'SHF',
    city: 'Sheffield',
    region: 'Yorkshire and the Humber',
    domain: 'sheffield.ac.uk',
    departments: ['School of Mathematical and Physical Sciences', 'Faculty of Engineering'],
    ranks: { overall: 105, physics: 151, engineering: 120 },
    overview: {
      typicalOffer: 'AAB (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'nottingham',
    name: 'University of Nottingham',
    shortName: 'Nottingham',
    initials: 'NOT',
    city: 'Nottingham',
    region: 'East Midlands',
    domain: 'nottingham.ac.uk',
    departments: ['School of Physics and Astronomy', 'Faculty of Engineering'],
    ranks: { overall: 108, physics: 140, engineering: 118 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'no-stated-preference',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'durham',
    name: 'Durham University',
    shortName: 'Durham',
    initials: 'DUR',
    city: 'Durham',
    region: 'North East England',
    domain: 'durham.ac.uk',
    departments: ['Department of Physics', 'Department of Engineering'],
    ranks: { overall: 78, physics: 66, engineering: 110 },
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'recommended',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'bath',
    name: 'University of Bath',
    shortName: 'Bath',
    initials: 'BTH',
    city: 'Bath',
    region: 'South West England',
    domain: 'bath.ac.uk',
    departments: ['Department of Physics', 'Faculty of Engineering and Design'],
    ranks: { overall: 150, physics: 190, engineering: 140 },
    deadlines: [
      { label: 'UCAS equal consideration deadline' },
      {
        label: 'Engineering placement-year application deadline',
        appliesTo: { kind: 'subject-category', category: 'engineering' },
        notes: 'Demo example of a deadline that applies to one subject area only.',
        years: ['2028'],
      },
    ],
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics and most engineering routes.',
      furtherMathematics: 'no-stated-preference',
      interviews: 'sometimes',
      interviewsNote: 'Some engineering programmes invite applicants to an offer-holder day (demo).',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'glasgow',
    name: 'University of Glasgow',
    shortName: 'Glasgow',
    initials: 'GLA',
    city: 'Glasgow',
    region: 'Scotland',
    domain: 'gla.ac.uk',
    departments: ['School of Physics and Astronomy', 'James Watt School of Engineering'],
    ranks: { overall: 76, physics: 120, engineering: 100 },
    overview: {
      typicalOffer: 'AAB (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      internationalNotes: 'Scottish degrees run to four or five years; direct entry to year two is sometimes possible.',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'st-andrews',
    name: 'University of St Andrews',
    shortName: 'St Andrews',
    initials: 'STA',
    city: 'St Andrews',
    region: 'Scotland',
    domain: 'st-andrews.ac.uk',
    departments: ['School of Physics and Astronomy'],
    ranks: { overall: 95, physics: 105 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required.',
      furtherMathematics: 'no-stated-preference',
      interviews: 'no',
      internationalNotes: 'Undergraduate degrees are four years.',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'kcl',
    name: "King's College London",
    shortName: "King's",
    initials: 'KCL',
    city: 'London',
    region: 'London',
    domain: 'kcl.ac.uk',
    departments: ['Department of Physics', 'Department of Engineering'],
    ranks: { overall: 40, physics: 110, engineering: 130 },
    overview: {
      typicalOffer: 'A*AA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'no-stated-preference',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: 'K+ scheme (demo).' },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'qmul',
    name: 'Queen Mary University of London',
    shortName: 'Queen Mary',
    initials: 'QM',
    city: 'London',
    region: 'London',
    domain: 'qmul.ac.uk',
    departments: ['School of Physical and Chemical Sciences', 'School of Engineering and Materials Science'],
    ranks: { overall: 145, physics: 210, engineering: 180 },
    overview: {
      typicalOffer: 'AAB (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'lancaster',
    name: 'Lancaster University',
    shortName: 'Lancaster',
    initials: 'LAN',
    city: 'Lancaster',
    region: 'North West England',
    domain: 'lancaster.ac.uk',
    departments: ['Department of Physics', 'School of Engineering'],
    ranks: { overall: 165, physics: 175, engineering: 200 },
    overview: {
      typicalOffer: 'AAB (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'loughborough',
    name: 'Loughborough University',
    shortName: 'Loughborough',
    initials: 'LBO',
    city: 'Loughborough',
    region: 'East Midlands',
    domain: 'lboro.ac.uk',
    departments: [
      'School of Science (Physics)',
      'Wolfson School of Mechanical, Electrical and Manufacturing Engineering',
      'School of Architecture, Building and Civil Engineering',
    ],
    ranks: { overall: 240, engineering: 210 },
    overview: {
      typicalOffer: 'AAB (demo)',
      requiredSubjectsNote: 'Mathematics required for engineering; Mathematics and Physics for physics.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
  {
    id: 'york',
    name: 'University of York',
    shortName: 'York',
    initials: 'YRK',
    city: 'York',
    region: 'Yorkshire and the Humber',
    domain: 'york.ac.uk',
    departments: ['School of Physics, Engineering and Technology'],
    ranks: { overall: 155, physics: 160, engineering: 230 },
    overview: {
      typicalOffer: 'AAA (demo)',
      requiredSubjectsNote: 'Mathematics and Physics required for physics.',
      furtherMathematics: 'not-required',
      interviews: 'no',
      contextualOffer: { availability: 'yes', details: null },
      applicationDeadline: 'UCAS equal consideration deadline (late January)',
    },
  },
];

/**
 * Every university exactly as seeded, INCLUDING placeholder (demo) rankings,
 * application deadlines and admissions overviews. Used by the assertions and
 * nowhere in the public UI.
 */
export const allUniversities: University[] = SEEDS.map(makeUniversity);

/*
 * ---------------------------------------------------------------------------
 *  v1 PUBLIC-DATA POLICY FOR UNIVERSITY-LEVEL FIELDS
 * ---------------------------------------------------------------------------
 *
 *  The v0.8 public-data policy covered courses. It never reached the three
 *  university-level datasets, and the v1 polish sweep found all three still
 *  seeded from the original demo: 67 of 67 rankings, 46 of 49 application
 *  deadlines and 22 of 22 admissions overviews were placeholders, shown on
 *  public pages under a "Sample data" badge — "A*A*A (demo)" as Imperial's
 *  typical offer, and QS positions nobody had read from QS. A placeholder with
 *  a warning label is still a placeholder on a public research tool.
 *
 *  So the served list keeps only VERIFIED university-level data. Nothing is
 *  deleted: the seeds stay in `allUniversities`, and anything verified later
 *  appears on its own. The UI hides a section when it has nothing verified to
 *  show (rankings, the university-wide overview) or says plainly that nothing
 *  is recorded (deadlines), rather than rendering an empty frame.
 *
 *  Course-level admissions data is untouched by this — it has its own policy.
 */
const PLACEHOLDER_OVERVIEW = (u: University): University['admissionsOverview'] => ({
  typicalOffer: null,
  requiredSubjectsNote: null,
  furtherMathematics: 'unknown',
  furtherMathematicsNote: null,
  gcseRequirements: null,
  englishLanguageRequirements: null,
  admissionsTestsNote: null,
  interviews: 'not-stated',
  interviewsNote: null,
  internationalNotes: null,
  contextualOffer: { availability: 'unknown', details: null },
  applicationDeadline: null,
  provenance: u.admissionsOverview.provenance,
});

export function publicUniversity(u: University): University {
  return {
    ...u,
    rankings: u.rankings.filter((r) => r.verificationStatus === 'verified'),
    applicationDeadlines: u.applicationDeadlines.filter((d) => d.verificationStatus === 'verified'),
    admissionsOverview:
      u.admissionsOverview.provenance.verificationStatus === 'verified'
        ? u.admissionsOverview
        : PLACEHOLDER_OVERVIEW(u),
  };
}

/** The universities the public site serves. See the policy above. */
export const universities: University[] = allUniversities.map(publicUniversity);

export const universityById: Record<string, University> = Object.fromEntries(
  universities.map((u) => [u.id, u]),
);

/** True when the public site has any verified ranking to show at all. */
export const HAS_PUBLIC_RANKINGS: boolean = universities.some((u) => u.rankings.length > 0);
