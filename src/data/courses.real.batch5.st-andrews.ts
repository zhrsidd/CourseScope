/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 5, PART B: THE UNIVERSITY OF ST ANDREWS
 *  2027 entry. Read from St Andrews' own course pages on 2026-09-14.
 * ---------------------------------------------------------------------------
 *  ST ANDREWS OFFERS NO UNDERGRADUATE ENGINEERING DEGREE OF ANY KIND.
 *  No BEng, no MEng, no degree titled Engineering, no Materials degree. The
 *  Subjects A–Z has no engineering entry and St Andrews' own full undergraduate
 *  course list contains no such title. There IS an "Institute of Engineering",
 *  but it is a research and community body with no degree, no admissions and no
 *  UCAS code, and the only MEng document that survives (Microelectronics and
 *  Photonics) is dated 2009/10. No partner or articulation engineering route was
 *  found. Zero engineering records are created here, and that absence is a
 *  finding, not a gap.
 *
 *  SCOTTISH, BUT NOT LIKE EDINBURGH OR GLASGOW:
 *
 *  1. THE A-LEVEL FIGURE IS A SINGLE PROFILE, NOT A BAND. St Andrews prints
 *     "GCE A-Levels" → "Standard entry grades:" → e.g. "AAA, including A in
 *     both: Mathematics and Physics." There is no "from X to Y" construction on
 *     any course page, so — unlike Edinburgh's band and Glasgow's range — these
 *     offers are fully scorable. (The university-wide /subjects/entry/ overview
 *     does print "A-Level: ABB to A*A*A", but that is the span across all
 *     subjects, not any course's offer, and is not stored.)
 *
 *  2. "MINIMUM ENTRY GRADES" IS WIDENING-ACCESS ONLY. St Andrews defines it
 *     verbatim as "if you are a widening access student, you will need these
 *     grades to be considered", against a published list of widening-access
 *     conditions. It is not a universal floor and not a general contextual
 *     offer, so it is stored as an access offer and never as the headline
 *     figure, and `minimumEntryStandard` is left null.
 *
 *  3. A THIRD TIER WITH NO EQUIVALENT ELSEWHERE. "Gateway entry grades:" does
 *     not name a lower grade on the same course — it points at Gateway to
 *     Science, a SEPARATE two-year UCAS programme (CFG2, BSc General) feeding
 *     into year three. Gateway publishes SQA Highers BBBB and NO A-Level figure
 *     at all, requires an interview, and its page was showing 2026 entry. It is
 *     therefore recorded as a note on the courses it feeds, not as a course and
 *     not as an offer.
 *
 *  4. MINIMUM IS NOT ALWAYS BELOW STANDARD. Chemistry and Physics MSci (FF13)
 *     prints the SAME string, "AAA, including an A in all of Chemistry
 *     Mathematics and Physics.", for both Standard and Minimum at A-Level. The
 *     concession exists only in the Highers column. Any logic assuming
 *     minimum < standard is wrong here.
 *
 *  5. F300 IS THE MPhys AND F301 IS THE BSc — the opposite of the ordering a
 *     reader would guess. And there is no Theoretical Physics BSc: that subject
 *     is MPhys-only.
 *
 *  6. DIRECT ENTRY TO SECOND YEAR IS THE SAME UCAS CODE, with its own page and
 *     its own (higher-tier) requirements, so it is a study option, never a
 *     second record.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course, StudyOption } from '@/types';
import { course, offer } from './builders';

const VERIFIED_ON = '2026-09-14';

const CYCLE =
  'Published requirements for 2027 entry. Each page heading carries “2027 entry” and a September 2027 start. This is not confirmed 2028 data.';

const S = (path: string) => `https://www.st-andrews.ac.uk/subjects/${path}/`;

const DEADLINE_NOTE =
  'St Andrews does not print a deadline on the course page. Its university-wide equal-consideration deadline for 2027 entry is 6pm (GMT) on Wednesday 13 January 2027.';

const NO_TEST_NOTE =
  'No admissions test is mentioned in any form on this course page — there is no sentence to quote. This is silence, not a published “no admissions test”. The only admissions-test language found anywhere at St Andrews is generic, inside the guaranteed offer scheme: “if relevant, the applicant passes an external testing or interview.”';

const NO_INTERVIEW_NOTE =
  'No interview is mentioned on this course page. The only interview requirement found at St Andrews is on the separate Gateway to Science programme.';

const GCSE =
  'University-wide, in addition to the course requirements: “GCSE (5) in English language or English literature, and one GCSE (5) from the following: Biology, Chemistry, Computing Science, Geography, Mathematics, Physics, Psychology.”';

const CROSS_SUBJECT_NOTE =
  'St Andrews prints a university-wide rule beside every offer: “For degrees combining more than one subject, the subject with the higher entry requirements determines the grades you need. You will also need to meet any further subject-specific entry requirements as outlined on their pages.”';

const GATEWAY_NOTE =
  'St Andrews prints a third tier, “Gateway entry grades:”, which names no grade on the course page: “Applicants who have narrowly missed the minimum entry grades, but meet the University’s contextual criteria, may be interested in one of the University’s Gateway programmes.” The Faculty of Science route is Gateway to Science — UCAS CFG2, BSc (General), “Two years full time, with direct progression to year three of honours programmes”. That is a SEPARATE two-year UCAS application, not a lower offer on this course. It publishes SQA Highers BBBB and NO GCE A-Level figure at all, requires an interview (“Applicants under serious consideration for this route will be required to attend an interview”), is restricted to Scottish widening-access criteria (SIMD20, low-progression school, care experience, registered young carer, St Andrews outreach), and its page was showing 2026 entry rather than 2027. It is recorded here as a note only.';

const SQA_NOTE =
  'St Andrews prints SQA Highers, GCE A-Levels and IB points as separate blocks, each with its own Standard and Minimum pair. Only the GCE A-Level figures are matched here. For this course the Highers figures are AAAA (standard) and AAAB (minimum) — a four-letter Scottish string that must never be read as an A-Level offer.';

/**
 * St Andrews' widening-access threshold. Gated on being a "widening access
 * student" by St Andrews' own published definition, so it is an access offer,
 * never the headline figure and never a universal floor.
 */
const minimumEntry = (grades: string, sqa: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Minimum entry grades (widening access only): ${grades} St Andrews defines this tier verbatim as “if you are a widening access student, you will need these grades to be considered”, where a widening access student is one who: “live[s] in an area underrepresented at the University of St Andrews indicated by postcode”, “attend[s] a school or college with low levels of progression to the University of St Andrews”, “attend[s] one of the following widening access programmes”, “are care experienced”, or “have caring responsibilities”. It is a separate access route with its own eligibility criteria, not a lower version of the standard offer, and it is not matched against grades here. The equivalent SQA Highers figure is ${sqa}. Care-experienced applicants are additionally covered by St Andrews’ university-wide guaranteed offer scheme, and refugee, asylum-seeker and displaced applicants appear only as contextual-data indicators with no figure attached — neither is printed on this course page.`,
});

const directEntry = (title: string, years: string, extra?: string): StudyOption => ({
  name: 'Direct entry to second year',
  description: `St Andrews states: “Well-qualified school leavers may be able to apply for admission directly into the second year of this course”, giving a ${years}. It uses the SAME UCAS code and has its own requirements page (“${title}”), so it is a route within this application rather than a separate one. The School adds: “In appropriate circumstances, students may change their level of entry in the first weeks of study at St Andrews.”${extra ? ` ${extra}` : ''}`,
  ucasCode: null,
  chosenWhen: 'At application, by requesting second-year entry.',
  officialUrl: null,
});

const STUDY_ABROAD: StudyOption = {
  name: 'St Andrews Abroad',
  description:
    'St Andrews states: “Physics and astronomy students can apply to participate in the University-wide St Andrews Abroad programme.” Chosen after admission; no separate UCAS code.',
  ucasCode: null,
  chosenWhen: 'After admission.',
  officialUrl: null,
};

const FLEXIBLE_CHOICE: StudyOption = {
  name: 'Change degree intention in the first two years',
  description:
    'The School of Physics and Astronomy states: “The School offers a number of degree programmes, and students can easily change from one degree intention to another as long as they have taken the appropriate prerequisite modules”, that “It is often possible for students to postpone a final decision between (for instance) physics and mathematics until the start of third year”, and that “You can apply for a joint degree programme at the outset, or you can switch into a joint degree programme provided you have taken the appropriate modules in both subjects in years one and two.”',
  ucasCode: null,
  chosenWhen: 'Up to the start of third year, subject to prerequisites.',
  officialUrl: null,
};

const BSC_MASTERS: StudyOption = {
  name: 'Switch between BSc and the Integrated Masters',
  description:
    'St Andrews states: “Both are classified first degrees with Honours, but the Integrated Masters is a more advanced degree than the BSc.” The BSc is four years full time and the Integrated Masters five.',
  ucasCode: null,
  chosenWhen: 'During the degree, subject to prerequisites.',
  officialUrl: null,
};

interface Seed {
  slug: string;
  name: string;
  degree: 'BSc' | 'MPhys' | 'MSci';
  awardLabel?: string;
  sub: 'physics' | 'astrophysics' | 'theoretical-physics';
  years: number;
  code: string;
  path: string;
  pageTitle: string;
  /** Chemistry and Physics MSci requires three named subjects. */
  chemistry?: boolean;
  /** FF13's minimum equals its standard at A-Level. */
  minimumEqualsStandard?: boolean;
  directEntryYears?: string;
  directEntryExtra?: string;
  extra?: string;
}

const SEEDS: Seed[] = [
  {
    slug: 'st-andrews-physics-bsc',
    name: 'Physics',
    degree: 'BSc',
    sub: 'physics',
    years: 4,
    code: 'F301',
    path: 'physics/physics-bsc',
    pageTitle: 'Physics BSc (Honours) 2027 entry',
    directEntryYears: 'three-year BSc',
    extra:
      'St Andrews holds F301 for the BSc and F300 for the MPhys — the opposite of the ordering most readers would assume.',
  },
  {
    slug: 'st-andrews-physics-mphys',
    name: 'Physics',
    degree: 'MPhys',
    awardLabel: 'MPhys (Honours)',
    sub: 'physics',
    years: 5,
    code: 'F300',
    path: 'physics/physics-mphys',
    pageTitle: 'Physics MPhys (Honours) 2027 entry',
    directEntryYears: 'four-year MPhys',
    extra:
      'St Andrews holds F300 for the MPhys and F301 for the BSc — the opposite of the ordering most readers would assume.',
  },
  {
    slug: 'st-andrews-astrophysics-bsc',
    name: 'Astrophysics',
    degree: 'BSc',
    sub: 'astrophysics',
    years: 4,
    code: 'F511',
    path: 'physics/astrophysics-bsc',
    pageTitle: 'Astrophysics BSc (Honours) 2027 entry',
    directEntryYears: 'three-year BSc',
  },
  {
    slug: 'st-andrews-astrophysics-mphys',
    name: 'Astrophysics',
    degree: 'MPhys',
    awardLabel: 'MPhys (Honours)',
    sub: 'astrophysics',
    years: 5,
    code: 'F510',
    path: 'physics/astrophysics-mphys',
    pageTitle: 'Astrophysics MPhys (Honours) 2027 entry',
    directEntryYears: 'four-year MPhys',
  },
  {
    slug: 'st-andrews-theoretical-physics-mphys',
    name: 'Theoretical Physics',
    degree: 'MPhys',
    awardLabel: 'MPhys (Honours)',
    sub: 'theoretical-physics',
    years: 5,
    code: 'F340',
    path: 'physics/theoretical-physics-mphys',
    pageTitle: 'Theoretical Physics MPhys (Honours) 2027 entry',
    directEntryYears: 'four-year MPhys',
    directEntryExtra:
      'The direct-entry page asks “AAA, including Physics and Mathematics” at A-Level and carries NO “Minimum entry grades:” row at all.',
    extra:
      'St Andrews publishes no Theoretical Physics BSc — this subject is MPhys-only. Further Mathematics is still not mentioned, which is notable on the theoretical stream.',
  },
  {
    slug: 'st-andrews-chemistry-and-physics-msci',
    name: 'Chemistry and Physics',
    degree: 'MSci',
    awardLabel: 'MSci (Hons)',
    sub: 'physics',
    years: 5,
    code: 'FF13',
    path: 'chemistry/chemistry-and-physics-msci',
    pageTitle: 'Chemistry and Physics MSci (Hons) 2027 entry',
    chemistry: true,
    minimumEqualsStandard: true,
    extra:
      'This joint degree is hosted under Chemistry rather than Physics, which is why it is easy to miss. It is the only St Andrews joint physics code with a real 2027 requirements page.',
  },
];

const STANDARD = 'AAA';

const stAndrewsPhysics: Course[] = SEEDS.map((s) => {
  const subjectString = s.chemistry
    ? 'AAA, including an A in all of Chemistry Mathematics and Physics.'
    : 'AAA, including A in both: Mathematics and Physics.';
  const minString = s.chemistry
    ? 'AAA, including an A in all of Chemistry Mathematics and Physics.'
    : 'AAB, including A in both: Mathematics and Physics.';
  return course({
    slug: s.slug,
    universityId: 'st-andrews',
    name: s.name,
    awardLabel: s.awardLabel ?? null,
    category: 'physics',
    sub: s.sub,
    degree: s.degree,
    years: s.years,
    code: s.code,
    year: '2027',
    cycleNote: CYCLE,
    raw: null,
    offers: [
      offer({
        label: 'Standard entry grades (GCE A-Levels)',
        gradeProfile: STANDARD,
        required: s.chemistry
          ? [['Chemistry', 'A'], ['Mathematics', 'A'], ['Physics', 'A']]
          : [['Mathematics', 'A'], ['Physics', 'A']],
        notes: `St Andrews heading “GCE A-Levels” → “Standard entry grades:”: “${subjectString}” A single grade profile, not a band. ${
          s.chemistry
            ? 'Three subjects are named, each at A, which leaves no free choice in the profile. St Andrews states: “applicants are expected to have studied Chemistry, Mathematics and Physics at SQA Higher, GCE A-Level, IB Higher Level, or equivalent.”'
            : 'St Andrews states: “Students must have studied both Physics and Mathematics at SQA Highers, GCE A-Levels, or equivalent.”'
        } ${CROSS_SUBJECT_NOTE}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not mentioned on any St Andrews page read. It is not said to be required, is not said to count as a second mathematics, and is not excluded.',
    test: 'unknown',
    testNote: NO_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: NO_INTERVIEW_NOTE,
    contextual: minimumEntry(
      minString,
      s.chemistry
        ? 'AAAB, including an A in all of Chemistry Mathematics and Physics (where the SQA standard is AAAAB — so the SQA column does carry a reduction even though the A-Level column does not)'
        : 'AAAB, including A in both: Mathematics and Physics',
    ),
    gcse: GCSE,
    studyOptions: [
      ...(s.directEntryYears
        ? [directEntry(s.pageTitle.replace('2027 entry', '2027 entry, direct entry'), s.directEntryYears, s.directEntryExtra)]
        : []),
      STUDY_ABROAD,
      FLEXIBLE_CHOICE,
      BSC_MASTERS,
    ],
    verification: 'verified',
    officialUrl: S(s.path),
    sourceUrl: S(s.path),
    sourceTitle: `${s.pageTitle} | University of St Andrews`,
    lastVerified: VERIFIED_ON,
    notes: [
      s.extra ?? null,
      s.minimumEqualsStandard
        ? 'On this course the A-Level “Minimum entry grades” string is IDENTICAL to the Standard one — “AAA, including an A in all of Chemistry Mathematics and Physics.” A widening-access A-Level applicant gets no grade reduction here, even though the SQA Highers column does reduce from AAAAB to AAAB.'
        : null,
      SQA_NOTE,
      GATEWAY_NOTE,
      DEADLINE_NOTE,
    ]
      .filter(Boolean)
      .join(' '),
  });
});

export const batch5StAndrewsCourses: Course[] = stAndrewsPhysics;

/**
 * Codes St Andrews genuinely operates but for which NO dedicated 2027-entry
 * requirements page exists: FG31 (Mathematics and Physics), FV30 (Philosophy
 * and Physics) and FGH1 (Mathematics and Theoretical Physics). St Andrews'
 * published rule for joint degrees is "the subject with the higher entry
 * requirements determines the grades you need", which cannot be resolved
 * without the partner subject's own figures. They are therefore left as
 * research targets rather than given an invented offer, and are named here so
 * the omission is deliberate and visible.
 */
export const ST_ANDREWS_UNPUBLISHED_JOINT_CODES = ['FG31', 'FV30', 'FGH1'] as const;
