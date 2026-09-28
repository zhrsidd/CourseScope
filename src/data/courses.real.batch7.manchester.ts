/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 7: THE MANCHESTER MATERIALS APPLICATION BATCH 6 MISSED
 *  2027 entry. Read from Manchester's own rendered course pages on 2026-09-17.
 * ---------------------------------------------------------------------------
 *  Batch 6 audited the Manchester Materials family and concluded that
 *  "Manchester publishes exactly two parent codes in this family — J500 and
 *  J501". That was right about the two it found and WRONG about the family
 *  being only two.
 *
 *  A sweep of all 240 course entries in Manchester's own 2027 undergraduate
 *  finder, filtered to its own "Materials" subject area, returns THREE
 *  applications. The third is:
 *
 *      F013 — Materials Science with an Integrated Foundation Year, BSc/MEng
 *
 *  It has its own UCAS code, its own page, its own "Apply through UCAS"
 *  instruction, and requirements that differ from J500's and J501's in four
 *  separate ways. It is a separate application by every test in the identity
 *  invariant, and it was simply absent from the catalogue.
 *
 *  This is the mirror image of the Batch 6 Manchester error. That batch found
 *  two records INVENTED for things that were only pathways; this one finds a
 *  real application OMITTED. Both failures come from the same root cause —
 *  reading a family from one page rather than from the university's own course
 *  finder — and both are worth stating plainly.
 *
 *  ---------------------------------------------------------------------------
 *  WHY THIS RECORD IS NOT A COPY OF J500 OR J501
 *  ---------------------------------------------------------------------------
 *
 *  1. THE OFFER IS A THREE-STEP SLIDING SCALE keyed to how many relevant
 *     subjects the applicant offers — "BBC where a student has 3 relevant
 *     subjects / BBB where a student has 2 relevant subjects / ABB where a
 *     student has 1 relevant subject". More relevant subjects means a LOWER
 *     grade bar, which is the opposite shape to a normal offer and must not be
 *     flattened to one string. Each step is stored as its own pathway.
 *
 *  2. FURTHER MATHEMATICS IS EXPLICITLY NAMED HERE and nowhere else in the
 *     family. F013 lists it among the relevant subjects that move the grade
 *     step. J500 and J501 say nothing about it at all. That difference is
 *     first-party and is preserved per record rather than harmonised.
 *
 *  3. CONTEXTUAL OFFERS ARE EXPLICITLY UNAVAILABLE, and Manchester says why:
 *     "This course is not eligible for a contextual offer. Contextual offers
 *     are only available for courses that have a standard entry requirements of
 *     ABB or higher." That is a published exclusion, which is a different fact
 *     from a silence and from a numeric contextual offer. J500 and J501 both
 *     publish two contextual tiers.
 *
 *  4. NO INTERVIEW IS PUBLISHED. J500 and J501 both carry Manchester's Virtual
 *     Visit interview block; the string "Interview requirements" does not
 *     appear on F013 at all. Recorded as unpublished, not as "no interview".
 *
 *  ---------------------------------------------------------------------------
 *  WHAT THIS RECORD IS *NOT*
 *  ---------------------------------------------------------------------------
 *  F013 leads to J500 or J501, but it does not make them study options of
 *  itself, and it is not a study option of theirs. It is its own UCAS
 *  application with its own requirements, and progression out of it is
 *  conditional on performance: "By completing the course and meeting the
 *  specific progression criteria, you can continue to one of the following
 *  degree programmes". Manchester also calls that progression guaranteed once
 *  the criteria are met — "meet the specific progression criteria to guarantee
 *  a place" — so the destinations are recorded as named progression routes
 *  rather than as applications or as invented pathways.
 *
 *  A useful corroboration lands here too: F013's own page independently
 *  restates the five J501 MEng pathways — Biomaterials, Metallurgy,
 *  Nanomaterials, Polymers, Textiles Technology — giving the same five and no
 *  sixth, and describing entry to them by TRANSFER rather than application.
 *  That is a second official 2027 page confirming what Batch 6 concluded from
 *  the J501 page alone.
 * ---------------------------------------------------------------------------
 */

import type { Course, StudyOption } from '@/types';
import { atLeastAt, course, offer } from './builders';

const VERIFIED_ON = '2026-09-17';

const URL =
  'https://www.manchester.ac.uk/study/undergraduate/courses/2027/12959/bsc-meng-materials-science-with-an-integrated-foundation-year/';

/** The six subjects Manchester counts when setting F013's grade step. */
const RELEVANT = [
  'Mathematics',
  'Further Mathematics',
  'Physics',
  'Chemistry',
  'Statistics',
  'Computer Science',
];

const PROGRESSION: StudyOption[] = [
  {
    name: 'Progression to Materials Science and Engineering BSc (J500)',
    description:
      'A named progression destination out of the foundation year, not a separate application made at the same time and not a specialism. Manchester: “By completing the course and meeting the specific progression criteria, you can continue to one of the following degree programmes”, and “meet the specific progression criteria to guarantee a place on one of our materials science degrees.”',
    ucasCode: 'F013',
    chosenWhen: 'After the foundation year, on meeting the published progression criteria.',
    officialUrl: null,
  },
  {
    name: 'Progression to Materials Science and Engineering MEng (J501)',
    description:
      'The second named progression destination out of the foundation year. From J501 the applicant may later transfer again onto one of the five specialist MEng pathways — F013’s own page names Biomaterials, Metallurgy, Nanomaterials, Polymers and Textiles Technology, and calls them “specialist Masters pathways” entered by transfer.',
    ucasCode: 'F013',
    chosenWhen: 'After the foundation year, on meeting the published progression criteria.',
    officialUrl: null,
  },
];

const SLIDING_SCALE_NOTE =
  'THE GRADE STEP DEPENDS ON HOW MANY RELEVANT SUBJECTS ARE OFFERED, AND MORE SUBJECTS MEANS A LOWER BAR. Manchester publishes three steps on one line: “BBC where a student has 3 relevant subjects / BBB where a student has 2 relevant subjects / ABB where a student has 1 relevant subject”. The relevant subjects are “Mathematics, Further Mathematics, Physics, Chemistry, Statistics, Computer Science”. Each step is stored as its own pathway because they are genuine alternatives, not a range — and collapsing them to one string would lose the fact that the requirement moves in the opposite direction to the usual one.';

const COUNT_NOTE =
  'Manchester states no minimum grade for the relevant subjects themselves — only how many of them are held. The count condition is therefore expressed at the lowest passing A-Level grade, which is the weakest reading available and cannot invent a subject requirement Manchester did not publish.';

export const batch7ManchesterCourses: Course[] = [
  course({
    slug: 'manchester-materials-science-integrated-foundation-year',
    universityId: 'manchester',
    name: 'Materials Science with an Integrated Foundation Year',
    category: 'engineering',
    sub: 'materials',
    degree: 'BSc',
    awardLabel: 'BSc / MEng',
    years: 4,
    yearsMax: 5,
    code: 'F013',
    year: '2027',
    cycleNote:
      'Published requirements for 2027 entry. The page’s key-facts panel reads “Year of entry: 2027”, its title reads “(2027 entry)”, and its breadcrumb reads “Courses 2027 entry”. This is not confirmed 2028 data.',
    raw: 'BBC where a student has 3 relevant subjects. BBB where a student has 2 relevant subjects. ABB where a student has 1 relevant subject. The subjects considered to be relevant are Mathematics, Further Mathematics, Physics, Chemistry, Statistics, Computer Science.',
    offers: [
      offer({
        label: 'Three relevant subjects',
        gradeProfile: 'BBC',
        constraints: [
          atLeastAt(
            RELEVANT,
            'E',
            3,
            'Three relevant subjects, from Mathematics, Further Mathematics, Physics, Chemistry, Statistics and Computer Science.',
          ),
        ],
        rawText: 'BBC where a student has 3 relevant subjects',
        notes: `The lowest grade step, reached by offering the most relevant subjects. ${COUNT_NOTE}`,
      }),
      offer({
        label: 'Two relevant subjects',
        gradeProfile: 'BBB',
        constraints: [
          atLeastAt(
            RELEVANT,
            'E',
            2,
            'Two relevant subjects, from Mathematics, Further Mathematics, Physics, Chemistry, Statistics and Computer Science.',
          ),
        ],
        rawText: 'BBB where a student has 2 relevant subjects',
        notes: COUNT_NOTE,
      }),
      offer({
        label: 'One relevant subject',
        gradeProfile: 'ABB',
        constraints: [
          atLeastAt(
            RELEVANT,
            'E',
            1,
            'One relevant subject, from Mathematics, Further Mathematics, Physics, Chemistry, Statistics and Computer Science.',
          ),
        ],
        rawText: 'ABB where a student has 1 relevant subject',
        notes: `The highest grade step, applying to applicants offering the fewest relevant subjects. ${COUNT_NOTE}`,
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'THE ONLY RECORD IN MANCHESTER’S MATERIALS FAMILY THAT NAMES FURTHER MATHEMATICS AT ALL. It is one of the six subjects Manchester counts as “relevant”, so taking it moves the applicant down a grade step. It is not required, and no preference between the six is published. J500 and J501 say nothing about Further Mathematics anywhere on their pages.',
    test: 'unknown',
    testNote:
      'No admissions test is published. A full-page text search for “admissions test”, “aptitude test”, “entrance test”, ESAT and TMUA returned nothing, and Manchester does not state that no test is required.',
    interview: 'not-stated',
    interviewNote:
      'No interview is published for this course. The string “Interview requirements” does not appear on the page at all — a real published difference from J500 and J501, which both carry Manchester’s Virtual Visit interview block. Recorded as unpublished rather than as “no interview”.',
    contextual: {
      availability: 'no',
      details:
        'EXPLICITLY NOT ELIGIBLE, and Manchester publishes the reason. Both key-facts rows read “Course not eligible for contextual offers”, and the body states: “This course is not eligible for a contextual offer. Contextual offers are only available for courses that have a standard entry requirements of ABB or higher.” That is a published exclusion — a different fact from a silence, and different again from the two contextual tiers J500 and J501 both publish.',
    },
    gcse:
      'Applicants must demonstrate a broad general education including acceptable levels of literacy and numeracy, equivalent to at least Grade C/4 in GCSE/IGCSE English Language and Grade B/6 in GCSE/IGCSE Mathematics if not studied at A-level and at least Grade B/6 from one of GCSE/IGCSE Physics, Chemistry or Combined Science if not studied at A-level. GCSE/IGCSE English Literature will not be accepted in lieu of GCSE/IGCSE English Language.',
    studyOptions: PROGRESSION,
    placement: null,
    verification: 'verified',
    officialUrl: URL,
    sourceUrl: URL,
    sourceTitle:
      'BSc/MEng Materials Science with an Integrated Foundation Year (2027 entry) | The University of Manchester',
    lastVerified: VERIFIED_ON,
    notes: `A SEPARATE UCAS APPLICATION THAT BATCH 6 MISSED. Manchester’s own 2027 course finder, under its own “Materials” subject filter, lists three applications rather than two: J500 (BSc, 3 years), J501 (MEng, 4 years) and this one, F013. The page prints “UCAS course code F013 / UCAS institution code M20” and “Apply through UCAS”, and Manchester files it under both “Materials” and “Foundation Studies”. ${SLIDING_SCALE_NOTE} Award as printed: “Bachelor of Science / Master of Engineering (BSc/MEng)”. Duration as printed: “1 (as part of 4/5 yr integrated degree programme)” — the foundation year itself is one year inside a four- or five-year integrated programme, so the record carries the 4–5 year span rather than either end of it. Practical science, verbatim: “Practical skills are a crucial part of science education and therefore there will be a requirement to pass the practical element of any science A-level taken.” Three-A-level rule, verbatim: “Applicants taking A-levels are normally expected to offer three full A-levels. If you’re taking more than three A-levels, any offer will be based on three A-levels, and any additional A-levels won’t be included in your offer.” No numeric International Baccalaureate offer is surfaced in the key-facts panel — it reads only “See full entry requirements”. GCSE rule differs from both J500’s and J501’s and is quoted in full in the GCSE field. A 240-entry sweep of Manchester’s whole 2027 catalogue found no other Materials-family application: no separate code exists for Biomaterials, Metallurgy, Nanomaterials, Polymers, Textiles Technology, Corrosion or Composites, which independently re-confirms that the two records Batch 6 deleted were correctly deleted.`,
  }),
];
