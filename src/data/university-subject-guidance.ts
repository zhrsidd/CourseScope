/**
 * ---------------------------------------------------------------------------
 *  UNIVERSITY-WIDE A-LEVEL SUBJECT GUIDANCE
 * ---------------------------------------------------------------------------
 *
 *  Some universities publish one institution-wide policy on which A-Level
 *  subjects they count — separate from, and underneath, each course's own
 *  subject requirements. It is kept HERE, once per university, and shown on
 *  that university's course pages, rather than copied into every course record:
 *  a list repeated forty times drifts forty ways.
 *
 *  WHAT THIS IS NOT. It is not a course requirement and it is never read by
 *  the eligibility engine. A subject being on a university's accepted list does
 *  not satisfy a course that requires something specific: if UCL Physics asks
 *  for Mathematics and Physics, Economics being a "preferred" UCL subject does
 *  not change that. The component that renders this says so every time.
 *
 *  SOURCE DISCIPLINE is the same as for course data: read from the
 *  university's own page, quoted not paraphrased, with the page and the date it
 *  was read recorded. Subject names are reproduced exactly as the university
 *  lists them, including its own variant spellings.
 */

export interface SubjectGuidanceGroup {
  name: string;
  subjects: string[];
}

export interface UniversitySubjectGuidance {
  universityId: string;
  title: string;
  /** The policy in the university's own words. */
  rule: string;
  groups: SubjectGuidanceGroup[];
  /** Subjects the university states it does not accept. */
  notAccepted: { subjects: string[]; wording: string } | null;
  /** Further published notes that bear on physics and engineering applicants. */
  notes: string[];
  source: {
    url: string;
    title: string;
    /** Link text shown to students. */
    linkLabel: string;
    lastVerified: string;
    /** Whether the page is tied to one entry cycle. */
    scope: string;
  };
}

export const UCL_A_LEVEL_SUBJECT_GUIDANCE: UniversitySubjectGuidance = {
  universityId: 'ucl',
  title: 'UCL A-Level subject guidance',
  rule:
    'You should offer at least two A levels taken from the preferred A level subjects list below. Your third A level can be in any other subject. If you do not have two preferred subjects, please contact the admissions team to check if we can consider your application.',
  groups: [
    {
      name: 'Arts and Humanities',
      subjects: [
        'Arabic',
        'Art and Design',
        'Art and Design: 3D Design',
        'Art and Design: Critical and Contextual Studies',
        'Art and Design: Fine Art',
        'Art and Design: Graphic Design',
        'Art and Design: Photography',
        'Art and Design: Textiles',
        'Bengali',
        'Biblical Hebrew',
        'Business Studies',
        'Cantonese',
        'Chinese',
        'Classical Civilisation',
        'Classical Greek',
        'Drama (WJEC specification)',
        'Drama and Theatre Studies',
        'Dutch',
        'English Language',
        'English Language and Literature',
        'English Literature',
        'English Literature (specifications A or B where applicable)',
        'Film Studies',
        'French',
        'German',
        'Greek',
        'Gujarati',
        'Hindi',
        'History of Art',
        'History of Art and Design',
        'Information and Communication Technology',
        'Irish',
        'Italian',
        'Japanese',
        'Latin',
        'Media Studies',
        'Modern Greek',
        'Modern Hebrew',
        'Moving Image Art (CCEA specification)',
        'Music',
        'Panjabi',
        'Persian',
        'Philosophy',
        'Polish',
        'Portuguese',
        'Religious Studies',
        'Russian',
        'Spanish',
        'Tamil',
        'Turkish',
        'Urdu',
        'Welsh',
        'Welsh (Second Language)',
      ],
    },
    {
      name: 'Social Sciences',
      subjects: [
        'Ancient History',
        'Anthropology',
        'Archaeology',
        'Economics',
        'Economics and Business',
        'Economics and Business (Nuffield)',
        'Environmental Science',
        'Environmental Studies',
        'Geography A',
        'Geography B',
        'Government and Politics',
        'History',
        'Law',
        'Politics',
        'Psychology',
        'Psychology A',
        'Psychology B',
        'Sociology',
      ],
    },
    {
      name: 'Sciences and Technology',
      subjects: [
        'Biology',
        'Biology (Salters-Nuffield)',
        'Biology (Human)',
        'Chemistry',
        'Chemistry (Nuffield)',
        'Chemistry (Salters)',
        'Computer Science',
        'Design and Technology',
        'Further Mathematics',
        'Geology',
        'Mathematics',
        'Mathematics (MEI)',
        'Physics',
        'Physics (Advancing Physics)',
        'Physics (Salters-Horners)',
        'Pure Mathematics',
        'Statistics',
      ],
    },
  ],
  notAccepted: {
    subjects: ['General Studies', 'Critical Thinking', 'Global Perspectives and Research'],
    wording:
      'General Studies, Critical Thinking or Global Perspectives and Research are not accepted for admission. We will not count these subjects towards our entry requirements.',
  },
  notes: [
    'If you are studying Biology, Chemistry or Physics A levels in England, a pass in the practical endorsement is required.',
  ],
  source: {
    url: 'https://www.ucl.ac.uk/study/prospective-students/undergraduate/how-apply/entry-requirements',
    title: 'Entry requirements | Study at UCL',
    linkLabel: 'View official UCL guidance',
    lastVerified: '2026-09-28',
    scope:
      'A UCL-wide admissions policy page, not tied to a single entry year. Read in full, including the collapsed “Preferred A level subjects”, “Exceptions” and “Science practical endorsement” sections.',
  },
};

/** Every university with published subject guidance, keyed by university id. */
export const SUBJECT_GUIDANCE_BY_UNIVERSITY: Record<string, UniversitySubjectGuidance> = {
  ucl: UCL_A_LEVEL_SUBJECT_GUIDANCE,
};

export function subjectGuidanceFor(universityId: string): UniversitySubjectGuidance | null {
  return SUBJECT_GUIDANCE_BY_UNIVERSITY[universityId] ?? null;
}
