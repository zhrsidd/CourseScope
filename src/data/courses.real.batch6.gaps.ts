/**
 * ---------------------------------------------------------------------------
 *  REAL DATA — BATCH 6, PART C: HIGH-VALUE GAPS CLOSED
 *  2027 entry. Read from Bristol's and Bath's own course pages on 2026-09-16.
 * ---------------------------------------------------------------------------
 *  Batches 4 and 5 left a set of real courses in the catalogue as identity-only
 *  research targets. This file closes the two biggest clusters: Bristol's MEng
 *  engineering variants and Bath's MEng engineering variants.
 *
 *  Three other gap targets were resolved WITHOUT new records, and are recorded
 *  where they belong rather than here:
 *
 *   · MANCHESTER MATERIALS — the named specialisms (Biomaterials, Metallurgy,
 *     Nanomaterials, Polymers, Textiles Technology) turned out to be routes
 *     inside two existing parent codes, J500 and J501. They are now study
 *     options on those two records. No new course records, and no invented
 *     UCAS codes.
 *   · IMPERIAL "THEORETICAL PHYSICS MSci, F340" — does not exist. Imperial
 *     publishes no course under F340 at all; the degree meant is "Physics with
 *     Theoretical Physics MSci", F390, already verified since Batch 2. The
 *     phantom row was deleted from courses.physics.ts.
 *   · GLASGOW PRODUCT DESIGN ENGINEERING — the two partially-verified records
 *     are now fully verified in courses.real.batch5.glasgow.ts.
 *
 *  ---------------------------------------------------------------------------
 *  TWO DIFFERENT PUBLISHING STYLES, KEPT APART
 *  ---------------------------------------------------------------------------
 *
 *  BRISTOL publishes one headline offer plus a separately headed "A-level
 *  contextual offer", and its subject rules are almost always "Mathematics plus
 *  one of a named list" rather than a fixed pair. Physics is NEVER individually
 *  compulsory on any Bristol engineering course read — it is always one option
 *  among several. Further Mathematics likewise is never separately required; it
 *  is a member of the acceptable list, or on Aerospace merely part of a stated
 *  PREFERENCE, which is not a requirement and is not stored as one.
 *
 *  BATH publishes THREE separately headed offers — Typical, "A level Contextual
 *  offer" and "A level Alternative offer" — and does not publish a hyphenated
 *  range. Where a Bath string carries two options ("AAA or A*AB", "A*AA or
 *  A*A*B"), BOTH are kept: the contextual alternatives inside the contextual
 *  text, the alternative-offer pair as published information. Bath's alternative
 *  offer depends on an EPQ, an AS-level or a fourth A-level, none of which this
 *  tool holds, so it is recorded rather than matched — exactly as the Batch 4
 *  Bath records already do.
 *
 *  BATH PUBLISHES NO UCAS CODE on any 2027 course page body. A targeted string
 *  search of the Mechanical Engineering MEng page returned only two prose
 *  mentions of "UCAS" — the personal statement and the January equal-
 *  consideration deadline — and explicitly no code and no institution-code
 *  label. Bath's course-search page, which does carry codes, is disallowed by
 *  bath.ac.uk's robots.txt and was therefore not used. No code has been
 *  guessed; these records are identified by university, name, award and cycle,
 *  exactly like the Bath records added in Batch 4.
 *
 *  ---------------------------------------------------------------------------
 *  A UCAS CODE COLLISION THAT MUST NOT BE "FIXED"
 *  ---------------------------------------------------------------------------
 *  Bristol's MEng Design Engineering is UCAS H100. So is Sheffield's General
 *  Engineering MEng. Both are correct: UCAS codes are unique within an
 *  institution, not across them. The identity rules key on university first, so
 *  these never collide — but the pair is called out here because it is exactly
 *  the shape that invites a well-meaning de-duplication.
 * ---------------------------------------------------------------------------
 */

import type { ContextualOfferInfo, Course } from '@/types';
import { atLeastAt, course, offer, oneOf } from './builders';

const VERIFIED_ON = '2026-09-16';

/* ------------------------------------------------------------------ */
/* Bristol                                                             */
/* ------------------------------------------------------------------ */

const BR = (area: string, slug: string) =>
  `https://www.bristol.ac.uk/study/undergraduate/2027/${area}/${slug}/`;

const BRISTOL_CYCLE =
  'Published requirements for 2027 entry. The page carries Bristol’s own “2027 entry” label and sits under Bristol’s 2027 course path. This is not confirmed 2028 data.';

const BRISTOL_GCSE = 'No specific subjects required.';

const BRISTOL_TEST_NOTE =
  'No admissions test is required of A-Level applicants, and none is published for them. Bristol does reference a “University of Bristol mathematics test”, but only as an alternative route offered to Engineering BTEC applicants IN PLACE OF A-level Mathematics — a conditional alternative qualification, not a universal admissions test. It is recorded here so it is not mistaken for one.';

const BRISTOL_INTERVIEW_NOTE =
  'No interview is mentioned on this page. Bristol does not state that it holds none, so this is silence rather than a published “no interview”.';

const BRISTOL_NO_EPQ =
  'Bristol publishes alternative qualification routes — BTEC, International Baccalaureate, Scottish Qualifications, Access to HE, Welsh Baccalaureate and Cambridge Pre-U — but NO EPQ route on any of these pages.';

const BRISTOL_PRACTICAL =
  'No science practical endorsement is published on any of the Bristol pages retrieved. That is silence, not a published exemption.';

const BRISTOL_VARIANTS =
  'Bristol’s “with a Year in Industry” and “with Study Abroad” variants are SEPARATE course pages with their own UCAS codes rather than options inside this one, so none of them is recorded here as a study option. They exist for 2027 — their URLs were confirmed in Bristol’s own site search — but their codes were not individually retrieved, so no record has been created for them either.';

const bristolContextual = (details: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under Bristol’s own heading “A-level contextual offer”: “${details}” This is a contextual route with its own eligibility, not a lower version of the headline offer, and it is never matched against a grade profile here.`,
});

/** The subjects Bristol's Civil Engineering page defines as "science-related". */
const SCIENCE_RELATED = [
  'Biology',
  'Chemistry',
  'Computer Science',
  'Further Mathematics',
  'Geography',
  'Geology',
  'Physics',
  'Electronics',
  'Design & Technology',
];

/** The subjects Bristol's Design Engineering page defines as "STEM-related". */
const STEM_RELATED = [
  'Chemistry',
  'Physics',
  'Further Mathematics',
  'Biology',
  'Computer Science',
  'Electronics',
  'Design & Technology',
];


const FM_ONE_OF_NOTE =
  'Further Mathematics is accepted as ONE OF a published list of subjects that may accompany Mathematics. It is never separately required and never separately preferred, so the acceptance is modelled structurally in the pathway constraint rather than as a stated preference.';

export const batch6BristolCourses: Course[] = [
  course({
    slug: 'bristol-aerospace-engineering-meng',
    universityId: 'bristol',
    name: 'Aerospace Engineering',
    category: 'engineering',
    sub: 'aerospace',
    degree: 'MEng',
    years: 4,
    code: 'H410',
    year: '2027',
    cycleNote: BRISTOL_CYCLE,
    raw: 'A*AA including Mathematics. Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        rawText:
          'A*AA including Mathematics. Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science',
        notes:
          'MATHEMATICS IS THE ONLY REQUIRED SUBJECT. The five named subjects appear in a PREFERENCE, not a requirement — Bristol’s wording is “Preference will be given to applicants taking two of the following subjects”. A preference is not a condition, so it is not stored as one and cannot cause a profile to fail here. This is the only Bristol engineering course read that expresses its second-subject rule as a preference rather than as an acceptable list.',
      }),
    ],
    fm: 'recommended',
    fmNote:
      'Further Mathematics is one of five subjects inside Bristol’s stated PREFERENCE for this course: “Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science.” That is advisory, not required, and never blocks a match.',
    test: 'unknown',
    testNote: BRISTOL_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_INTERVIEW_NOTE,
    contextual: bristolContextual(
      'AAB including A in Mathematics. Preference will be given to applicants taking two of the following subjects: Further Mathematics, Physics, Chemistry, Biology, Computer Science',
    ),
    gcse: BRISTOL_GCSE,
    verification: 'verified',
    officialUrl: BR('aerospace-engineering', 'meng-aerospace-engineering'),
    sourceUrl: BR('aerospace-engineering', 'meng-aerospace-engineering'),
    sourceTitle: 'MEng Aerospace Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `${BRISTOL_VARIANTS} ${BRISTOL_NO_EPQ} ${BRISTOL_PRACTICAL}`,
  }),

  course({
    slug: 'bristol-civil-engineering-meng',
    universityId: 'bristol',
    name: 'Civil Engineering',
    category: 'engineering',
    sub: 'civil',
    degree: 'MEng',
    years: 4,
    code: 'H200',
    year: '2027',
    cycleNote: BRISTOL_CYCLE,
    raw: 'A*AA including A*A (in any order) in Mathematics and a science-related subject',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            SCIENCE_RELATED,
            'A',
            'A science-related subject at grade A. Bristol defines the accepted set on this page as Biology, Chemistry, Computer Science, Further Mathematics, Geography, Geology, Physics, Electronics or Design & Technology.',
          ),
          atLeastAt(
            ['Mathematics', ...SCIENCE_RELATED],
            'A*',
            1,
            'The A* must fall on Mathematics or on the science-related subject — Bristol’s wording is “A*A (in any order)” across those two, so either may carry it.',
          ),
        ],
        rawText: 'A*AA including A*A (in any order) in Mathematics and a science-related subject',
        notes:
          '“IN ANY ORDER” IS LOAD-BEARING: Bristol does not say which of the two subjects carries the A*, so neither is pinned to it. Recording A* against Mathematics alone would invent a condition Bristol did not publish.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: `${FM_ONE_OF_NOTE} On this course it counts as an acceptable “science-related subject”, a set Bristol defines on the page itself.`,
    test: 'unknown',
    testNote: BRISTOL_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_INTERVIEW_NOTE,
    contextual: bristolContextual('AAB including AA in Mathematics and a science-related subject'),
    gcse: BRISTOL_GCSE,
    verification: 'verified',
    officialUrl: BR('civil-engineering', 'meng-civil-engineering'),
    sourceUrl: BR('civil-engineering', 'meng-civil-engineering'),
    sourceTitle: 'MEng Civil Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `${BRISTOL_VARIANTS} ${BRISTOL_NO_EPQ} ${BRISTOL_PRACTICAL}`,
  }),

  course({
    slug: 'bristol-mechanical-and-electrical-engineering-meng',
    universityId: 'bristol',
    name: 'Mechanical and Electrical Engineering',
    category: 'engineering',
    sub: 'mechanical',
    degree: 'MEng',
    years: 4,
    code: 'H360',
    year: '2027',
    cycleNote: BRISTOL_CYCLE,
    raw: 'AAA including Mathematics and any one of Physics, Chemistry, Further Mathematics, Computer Science, or Electronics',
    offers: [
      offer({
        gradeProfile: 'AAA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            ['Physics', 'Chemistry', 'Further Mathematics', 'Computer Science', 'Electronics'],
            'A',
            'Any one of Physics, Chemistry, Further Mathematics, Computer Science or Electronics.',
          ),
        ],
        rawText:
          'AAA including Mathematics and any one of Physics, Chemistry, Further Mathematics, Computer Science, or Electronics',
        notes:
          'AAA with no A* — a band below Bristol’s Mechanical, Aerospace, Civil and Design Engineering MEngs, all of which ask A*AA. Electronics appears in the accepted list here and not in the plain Mechanical MEng list.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: FM_ONE_OF_NOTE,
    test: 'unknown',
    testNote: BRISTOL_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_INTERVIEW_NOTE,
    contextual: bristolContextual(
      'AAC including AA in Mathematics and any one of Physics, Chemistry, Further Mathematics, Computer Science, or Electronics',
    ),
    gcse: BRISTOL_GCSE,
    verification: 'verified',
    officialUrl: BR('electrical-and-electronic-engineering', 'meng-mechanical-and-electrical-engineering'),
    sourceUrl: BR('electrical-and-electronic-engineering', 'meng-mechanical-and-electrical-engineering'),
    sourceTitle:
      'MEng Mechanical and Electrical Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `NOT ONE OF BRISTOL’S SIX LISTED ENGINEERING SUBJECT AREAS. Bristol’s 2027 landing page names six — Aerospace, Civil, Design Engineering, Electrical and Electronic, Engineering Mathematics and Mechanical — and this degree sits underneath the Electrical and Electronic path rather than having an area of its own, which is why it is easy to miss. Its contextual string AAC is an unusual shape and is transcribed exactly rather than normalised. ${BRISTOL_VARIANTS} ${BRISTOL_NO_EPQ} ${BRISTOL_PRACTICAL}`,
  }),

  course({
    slug: 'bristol-engineering-mathematics-meng',
    universityId: 'bristol',
    name: 'Engineering Mathematics',
    category: 'engineering',
    sub: 'engineering-science',
    degree: 'MEng',
    years: 4,
    code: 'G161',
    year: '2027',
    cycleNote: BRISTOL_CYCLE,
    raw: 'AAA, or A*AB including A in Mathematics',
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: 'AAA',
        rawText: 'AAA',
        notes:
          'Bristol names no required subject in this first route at all — the only Bristol engineering offer read that does not. The Mathematics condition appears only in the second, alternative profile.',
      }),
      offer({
        label: 'Alternative published profile',
        gradeProfile: 'A*AB',
        required: [['Mathematics', 'A']],
        rawText: 'A*AB including A in Mathematics',
        notes:
          'A GENUINE ALTERNATIVE, NOT A RANGE. Bristol publishes “AAA” or “A*AB including A in Mathematics” as two routes to the same offer, so each is stored as its own pathway and a student needs to satisfy only one. Collapsing them into a band would both invent intermediate profiles and lose the fact that the Mathematics condition attaches to only one of them.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote:
      'Further Mathematics is not mentioned on this page. The page was read in full, so this is Bristol publishing no preference either way — not “not required”, which Bristol never says, and not “unknown”, which would mean we had not looked.',
    test: 'unknown',
    testNote: BRISTOL_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_INTERVIEW_NOTE,
    contextual: bristolContextual('ABB including A in Mathematics'),
    gcse: BRISTOL_GCSE,
    verification: 'verified',
    officialUrl: BR('engineering-mathematics', 'meng-engineering-mathematics'),
    sourceUrl: BR('engineering-mathematics', 'meng-engineering-mathematics'),
    sourceTitle: 'MEng Engineering Mathematics | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `${BRISTOL_VARIANTS} ${BRISTOL_NO_EPQ} ${BRISTOL_PRACTICAL}`,
  }),

  course({
    slug: 'bristol-design-engineering-meng',
    universityId: 'bristol',
    name: 'Design Engineering',
    category: 'engineering',
    sub: 'design',
    degree: 'MEng',
    years: 4,
    code: 'H100',
    year: '2027',
    cycleNote: BRISTOL_CYCLE,
    raw: 'A*AA including A*A in any order in Mathematics and a STEM-related subject',
    offers: [
      offer({
        gradeProfile: 'A*AA',
        required: [['Mathematics', 'A']],
        constraints: [
          oneOf(
            STEM_RELATED,
            'A',
            'A STEM-related subject at grade A. Bristol defines the accepted set on this page as Chemistry, Physics, Further Mathematics, Biology, Computer Science, Electronics or Design & Technology.',
          ),
          atLeastAt(
            ['Mathematics', ...STEM_RELATED],
            'A*',
            1,
            'The A* must fall on Mathematics or on the STEM-related subject — Bristol’s wording is “A*A in any order” across those two.',
          ),
        ],
        rawText: 'A*AA including A*A in any order in Mathematics and a STEM-related subject',
        notes:
          'Same “in any order” structure as Civil Engineering, but against a different published set: Civil says “science-related” and includes Geography and Geology, while this page says “STEM-related” and does not. The two lists are NOT interchangeable and have not been merged.',
      }),
    ],
    fm: 'no-stated-preference',
    fmNote: `${FM_ONE_OF_NOTE} On this course it counts as an acceptable “STEM-related subject”, a set Bristol defines on the page itself.`,
    test: 'unknown',
    testNote: BRISTOL_TEST_NOTE,
    interview: 'not-stated',
    interviewNote: BRISTOL_INTERVIEW_NOTE,
    contextual: bristolContextual('AAB including AA in Mathematics and a STEM-related subject'),
    gcse: BRISTOL_GCSE,
    verification: 'verified',
    officialUrl: BR('design-engineering', 'meng-design-engineering'),
    sourceUrl: BR('design-engineering', 'meng-design-engineering'),
    sourceTitle: 'MEng Design Engineering | Study at Bristol | University of Bristol',
    lastVerified: VERIFIED_ON,
    notes: `A UCAS CODE COLLISION ACROSS INSTITUTIONS, RECORDED SO IT IS NOT “FIXED”: Bristol’s code for this degree is H100, and Sheffield’s General Engineering MEng is also H100. Both are correct — UCAS codes are unique within an institution, not between them — and the identity rules key on university first, so the two never merge. ${BRISTOL_VARIANTS} ${BRISTOL_NO_EPQ} ${BRISTOL_PRACTICAL}`,
  }),
];

/* ------------------------------------------------------------------ */
/* Bath                                                                */
/* ------------------------------------------------------------------ */

const BA = (subject: string, slug: string) =>
  `https://www.bath.ac.uk/courses/undergraduate-2027/${subject}/${slug}/`;

const BATH_CYCLE =
  'Published requirements for 2027 entry. The page carries Bath’s own “2027/2028 Academic Year” label and states a September 2027 start. This is not confirmed 2028 data.';

const BATH_NO_CODE =
  'BATH PUBLISHES NO UCAS COURSE CODE on this page, so this record carries none and is identified by university, course name, award and cycle instead. A targeted string search of the page returned only two prose mentions of “UCAS” — the personal statement and the January equal-consideration deadline — and no code and no institution-code label. Bath’s course-search results page does carry codes but is disallowed by bath.ac.uk’s robots.txt, so it was not used and no code has been guessed.';

const BATH_TEST_NOTE =
  'No admissions test is published on this page. Bath does not state that none is required, so this is silence.';

const BATH_SELECTION =
  'Bath publishes its selection criteria: previous academic achievements (GCSEs); predicted or achieved grades in recent study; the A level subjects studied; and the personal statement.';

const bathContextual = (details: string, extra?: string): ContextualOfferInfo => ({
  availability: 'yes',
  details: `Under Bath’s own heading “A level Contextual offer”: “${details}” BOTH options in that string are Bath’s own and both are kept — Bath publishes discrete alternatives here, not a range, and collapsing them to one end would misstate the offer.${extra ? ` ${extra}` : ''}`,
});

const BATH_ALTERNATIVE_MECH =
  'Bath publishes a third, separately headed route, “A level Alternative offer”: “A*AA or A*A*B in three A levels including A* in Mathematics and A in Physics plus one of: grade A in an EPQ or IEPQ; grade A in AS level Further Mathematics (except if you are studying an A level in that subject); grade B in a fourth A level, where your four A levels include A level Further Mathematics; an appropriate grade in any other project qualification we recognise.” It depends on qualifications this tool does not hold, so it is recorded as published information rather than as a matchable route — and both of its grade options are kept.';

interface BathMEngSeed {
  slug: string;
  name: string;
  sub: 'mechanical' | 'aerospace' | 'design' | 'chemical';
  subject: string;
  path: string;
  profile: string;
  raw: string;
  required: [string, 'A*' | 'A'][];
  contextual: string;
  contextualExtra?: string;
  gcse: string;
  alternative: string;
  fmNote: string;
  extra?: string;
}

const BATH_MENG_SEEDS: BathMEngSeed[] = [
  {
    slug: 'bath-mechanical-engineering-meng',
    name: 'Mechanical Engineering',
    sub: 'mechanical',
    subject: 'mechanical-engineering',
    path: 'meng-mechanical-engineering',
    profile: 'A*A*A',
    raw: 'A*A*A in three A levels including A* in Mathematics and A in Physics',
    required: [
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
    ],
    contextual: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics',
    gcse: 'GCSE English Language or Literature grade 4 or C (or equivalent).',
    alternative: BATH_ALTERNATIVE_MECH,
    fmNote:
      'Further Mathematics is NOT required for the standard offer and is not mentioned in it. It appears only inside Bath’s alternative offer, and there in two distinct forms that must not be merged: “grade A in AS level Further Mathematics (except if you are studying an A level in that subject)”, and “grade B in a fourth A level, where your four A levels include A level Further Mathematics”. Both are recorded, neither is required.',
    extra: BATH_SELECTION,
  },
  {
    slug: 'bath-aerospace-engineering-meng',
    name: 'Aerospace Engineering',
    sub: 'aerospace',
    subject: 'mechanical-engineering',
    path: 'meng-aerospace-engineering',
    profile: 'A*A*A',
    raw: 'A*A*A in three A levels including A* in Mathematics and A in Physics',
    required: [
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
    ],
    contextual: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics',
    gcse:
      'GCSE English Language or Literature grade 4 or C (or equivalent from English language category C).',
    alternative:
      'Bath publishes a third, separately headed route, “A level Alternative offer”, whose components are: “grade A in an EPQ or IEPQ”; “grade A in AS level Further Mathematics”; and “grade B in a fourth A level, where your four A levels include A level Further Mathematics”. It depends on qualifications this tool does not hold, so it is recorded as published information rather than as a matchable route.',
    fmNote:
      'Further Mathematics is not mentioned in the standard offer. It appears only inside the alternative route, as one of the ways of meeting the extra-qualification condition. Not required.',
    extra:
      'Note the GCSE wording differs slightly from Bath’s Mechanical Engineering MEng — this page adds “(or equivalent from English language category C)”. Transcribed as printed rather than harmonised across the two pages.',
  },
  {
    slug: 'bath-integrated-design-engineering-meng',
    name: 'Integrated Design Engineering',
    sub: 'design',
    subject: 'mechanical-engineering',
    path: 'meng-integrated-design-engineering',
    profile: 'A*A*A',
    raw: 'A*A*A in three A levels including A* in Mathematics and A in Physics',
    required: [
      ['Mathematics', 'A*'],
      ['Physics', 'A'],
    ],
    contextual: 'AAA or A*AB in three A levels including A in Mathematics and A in Physics',
    contextualExtra:
      'Bath adds for this course that the wider GCSE profile is considered, and that contextual consideration is possible with mostly grade 6 or B at GCSE.',
    gcse: 'GCSE English Language or Literature grade 4 or C.',
    alternative:
      'Bath publishes a third, separately headed route, “A level Alternative offer”, requiring a higher A-level profile plus one of an EPQ or IEPQ at grade A, AS level Further Mathematics at grade A, or a fourth A level at grade B including A level Further Mathematics. It depends on qualifications this tool does not hold, so it is recorded rather than matched.',
    fmNote:
      'Further Mathematics is not required for the standard offer; it appears only inside the alternative route.',
    extra:
      'A DESIGN-TITLED ENGINEERING DEGREE THAT STILL REQUIRES A* MATHEMATICS AND A PHYSICS — the requirements are identical to Bath’s Mechanical and Aerospace MEngs, and no portfolio requirement is published. No portfolio statement appears at all, which is silence rather than a published “no portfolio”.',
  },
  {
    slug: 'bath-chemical-engineering-meng',
    name: 'Chemical Engineering',
    sub: 'chemical',
    subject: 'chemical-engineering',
    path: 'meng-chemical-engineering',
    profile: 'A*AA',
    raw: 'A*AA in three A levels including Chemistry and Mathematics',
    required: [
      ['Chemistry', 'A'],
      ['Mathematics', 'A'],
    ],
    contextual: 'AAB in three A levels including A in Chemistry and A in Mathematics',
    contextualExtra:
      'Bath states for this course that the wider GCSE profile significantly influences selection.',
    gcse: 'GCSE English Language or Literature grade 4 or C.',
    alternative:
      'Bath publishes a third, separately headed route, “A level Alternative offer”, and additionally accepts the Advanced Skills Baccalaureate Wales in place of one A level for its typical and contextual offers, with different conditions again for the alternative offer. These depend on qualifications this tool does not hold and are recorded rather than matched.',
    fmNote:
      'Further Mathematics is not mentioned in the standard offer for this course and is not required.',
    extra:
      'THE ONE BATH MEng IN THIS SET THAT DOES NOT REQUIRE PHYSICS. Its pair is Chemistry and Mathematics, and its headline profile is A*AA rather than the A*A*A of Mechanical, Aerospace and Integrated Design. Nothing from those three has been cross-applied here. Bath notes interviews for Access to HE Diploma candidates only — not for A-level applicants.',
  },
];

export const batch6BathCourses: Course[] = BATH_MENG_SEEDS.map((s) =>
  course({
    slug: s.slug,
    universityId: 'bath',
    name: s.name,
    category: 'engineering',
    sub: s.sub,
    degree: 'MEng',
    awardLabel: 'MEng (Hons)',
    years: 4,
    code: null,
    year: '2027',
    cycleNote: BATH_CYCLE,
    raw: s.raw,
    offers: [
      offer({
        label: 'Typical offer',
        gradeProfile: s.profile,
        required: s.required,
        rawText: s.raw,
        notes:
          'Bath publishes three separately headed offers — Typical, Contextual and Alternative — rather than a range. Only the typical offer is matched against a grade profile; the other two are recorded as published information.',
      }),
    ],
    fm: 'not-required',
    fmNote: s.fmNote,
    test: 'unknown',
    testNote: BATH_TEST_NOTE,
    interview: 'not-stated',
    interviewNote:
      'No interview is published for A-level applicants on this page. Bath does not state that it holds none, so this is silence.',
    contextual: bathContextual(s.contextual, s.contextualExtra),
    gcse: s.gcse,
    verification: 'verified',
    officialUrl: BA(s.subject, s.path),
    sourceUrl: BA(s.subject, s.path),
    sourceTitle: `${s.name} MEng (Hons)`,
    lastVerified: VERIFIED_ON,
    notes: [s.extra, s.alternative, BATH_NO_CODE].filter(Boolean).join(' '),
  }),
);

export const batch6GapCourses: Course[] = [...batch6BristolCourses, ...batch6BathCourses];
