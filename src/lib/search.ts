/**
 * Natural-language-ish query parsing for the main search bar.
 *
 * Handles the shapes students actually type:
 *   "physics AAA"                        -> physics + AAA profile
 *   "engineering without chemistry"      -> engineering, exclude Chemistry requirement
 *   "physics further maths recommended"  -> physics, FM recommended
 *   "mechanical engineering AAA"
 *   "universities requiring ESAT"
 *   "physics courses without admissions tests"
 *   "engineering courses requiring further maths"
 */

import type {
  ALevelGrade,
  AdmissionsTestCode,
  FurtherMathsStatus,
  SubjectCategory,
  SubjectSubcategory,
} from '@/types';
import { parseProfileString } from './grades';

export interface ParsedQuery {
  raw: string;
  /** Free text left over after structured terms are consumed. */
  text: string;
  gradeProfile: ALevelGrade[] | null;
  gradeProfileLabel: string | null;
  requireSubjects: string[];
  excludeSubjects: string[];
  tests: AdmissionsTestCode[];
  requireNoTest: boolean;
  requireNoInterview: boolean;
  categories: SubjectCategory[];
  subcategories: SubjectSubcategory[];
  furtherMaths: FurtherMathsStatus[];
  /** Human-readable chips describing what was understood. */
  chips: { id: string; label: string }[];
}

const SUBJECT_WORDS: Record<string, string> = {
  'further mathematics': 'Further Mathematics',
  'further maths': 'Further Mathematics',
  'further math': 'Further Mathematics',
  mathematics: 'Mathematics',
  maths: 'Mathematics',
  math: 'Mathematics',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  'computer science': 'Computer Science',
};

const TEST_WORDS: Record<string, AdmissionsTestCode> = {
  esat: 'esat',
  pat: 'pat',
  tmua: 'tmua',
  step: 'step',
  mat: 'mat',
  tara: 'tara',
};

const SUBCATEGORY_WORDS: [string, SubjectSubcategory][] = [
  ['theoretical physics', 'theoretical-physics'],
  ['mathematical physics', 'mathematical-physics'],
  ['physics with astronomy', 'physics-with-astronomy'],
  ['physics with computing', 'physics-with-computing'],
  ['physics with mathematics', 'physics-with-mathematics'],
  ['natural sciences', 'natural-sciences-physical'],
  ['astrophysics', 'astrophysics'],
  ['general engineering', 'general-engineering'],
  ['engineering science', 'engineering-science'],
  ['information engineering', 'information-engineering'],
  ['computer engineering', 'computer-engineering'],
  ['computer systems', 'computer-engineering'],
  ['mechanical', 'mechanical'],
  ['electrical', 'electrical'],
  ['electronic', 'electronic'],
  ['civil', 'civil'],
  ['chemical engineering', 'chemical'],
  ['aerospace', 'aerospace'],
  ['aeronautic', 'aeronautical'],
  ['materials', 'materials'],
  ['biomedical', 'biomedical'],
];

const NEGATION = '(?:without|no|not requiring|excluding|dont need|don’t need)';
const REQUIREMENT = '(?:requiring|requires|require|needing|needs|with|including|that need)';

function uniq<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function parseQuery(raw: string): ParsedQuery {
  const result: ParsedQuery = {
    raw,
    text: '',
    gradeProfile: null,
    gradeProfileLabel: null,
    requireSubjects: [],
    excludeSubjects: [],
    tests: [],
    requireNoTest: false,
    requireNoInterview: false,
    categories: [],
    subcategories: [],
    furtherMaths: [],
    chips: [],
  };

  if (!raw.trim()) return result;

  let working = ` ${raw.toLowerCase().replace(/\s+/g, ' ').trim()} `;

  const consume = (pattern: RegExp) => {
    working = working.replace(pattern, ' ');
  };

  /* 1 — grade profile, matched on the original casing so "AAA" is unambiguous */
  const gradeMatch = raw.toUpperCase().match(/\b(?:A\*|[A-E]){2,4}\b/);
  if (gradeMatch) {
    const parsed = parseProfileString(gradeMatch[0]);
    if (parsed) {
      result.gradeProfile = parsed;
      result.gradeProfileLabel = gradeMatch[0];
      consume(new RegExp(`\\b${gradeMatch[0].toLowerCase().replace(/\*/g, '\\*')}\\b`, 'g'));
      result.chips.push({ id: 'grades', label: `Grades ${gradeMatch[0]}` });
    }
  }

  /* 2 — "no admissions test" / "without tests" */
  if (new RegExp(`${NEGATION} (?:an? )?(?:admissions? )?tests?\\b`).test(working)) {
    result.requireNoTest = true;
    consume(new RegExp(`${NEGATION} (?:an? )?(?:admissions? )?tests?\\b`, 'g'));
    result.chips.push({ id: 'no-test', label: 'No admissions test' });
  }
  if (new RegExp(`${NEGATION} (?:an? )?interviews?\\b`).test(working)) {
    result.requireNoInterview = true;
    consume(new RegExp(`${NEGATION} (?:an? )?interviews?\\b`, 'g'));
    result.chips.push({ id: 'no-interview', label: 'No interview' });
  }

  /* 3 — Further Mathematics stance */
  const fmLevel = working.match(
    /(?:further mathematics|further maths) (required|strongly recommended|recommended|useful|optional|not required)|(required|strongly recommended|recommended) (?:further mathematics|further maths)/,
  );
  if (fmLevel) {
    const word = (fmLevel[1] ?? fmLevel[2] ?? '').trim();
    const level: FurtherMathsStatus =
      word === 'required'
        ? 'required'
        : word === 'strongly recommended'
          ? 'strongly-recommended'
          : word === 'recommended'
            ? 'recommended'
            : word === 'useful'
              ? 'useful'
              : 'not-required';
    result.furtherMaths.push(level);
    // "recommended" is read as the advisory band as a whole — a course that
    // strongly recommends Further Maths still answers the same question.
    if (level === 'recommended') result.furtherMaths.push('strongly-recommended', 'useful');
    consume(new RegExp(fmLevel[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
    result.chips.push({ id: `fm-${level}`, label: `Further Maths ${word}` });
  }

  /* 4 — explicit subject negations and requirements */
  for (const [word, subject] of Object.entries(SUBJECT_WORDS)) {
    const negRe = new RegExp(`${NEGATION} ${word}\\b`, 'g');
    if (negRe.test(working)) {
      result.excludeSubjects.push(subject);
      consume(new RegExp(`${NEGATION} ${word}\\b`, 'g'));
      result.chips.push({ id: `no-${subject}`, label: `No ${subject} requirement` });
      continue;
    }
    const posRe = new RegExp(`${REQUIREMENT} ${word}\\b`, 'g');
    if (posRe.test(working)) {
      result.requireSubjects.push(subject);
      consume(new RegExp(`${REQUIREMENT} ${word}\\b`, 'g'));
      result.chips.push({ id: `req-${subject}`, label: `Requires ${subject}` });
    }
  }
  if (result.requireSubjects.some((s) => s === 'Further Mathematics') && result.furtherMaths.length === 0) {
    result.furtherMaths.push('required');
  }
  if (result.excludeSubjects.some((s) => s === 'Further Mathematics')) {
    result.furtherMaths.push('not-required');
  }

  /* 5 — admissions tests by name */
  for (const [word, code] of Object.entries(TEST_WORDS)) {
    const re = new RegExp(`\\b${word}\\b`, 'g');
    if (re.test(working)) {
      result.tests.push(code);
      consume(new RegExp(`\\b${word}\\b`, 'g'));
      result.chips.push({ id: `test-${code}`, label: word.toUpperCase() });
    }
  }

  /* 6 — subject taxonomy */
  for (const [word, sub] of SUBCATEGORY_WORDS) {
    if (working.includes(word)) {
      result.subcategories.push(sub);
      consume(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'));
    }
  }
  if (/\bengineering\b/.test(working) || result.subcategories.some((s) => ENGINEERING_SUBS.has(s))) {
    result.categories.push('engineering');
    consume(/\bengineering\b/g);
  }
  if (/\bphysics\b/.test(working) || result.subcategories.some((s) => PHYSICS_SUBS.has(s))) {
    result.categories.push('physics');
    consume(/\bphysics\b/g);
  }

  /* 7 — noise words */
  consume(
    /\b(courses?|universities|university|uk|degrees?|entry|admissions?|tests?|interviews?|requiring|requires|require|required|needing|needs|need|including|with|without|excluding|and|or|at|in|for|the|a|an|that|which|no|not)\b/g,
  );

  result.categories = uniq(result.categories);
  result.subcategories = uniq(result.subcategories);
  result.tests = uniq(result.tests);
  result.requireSubjects = uniq(result.requireSubjects);
  result.excludeSubjects = uniq(result.excludeSubjects);
  result.furtherMaths = uniq(result.furtherMaths);
  result.text = working.replace(/\s+/g, ' ').trim();

  for (const c of result.categories) {
    result.chips.unshift({ id: `cat-${c}`, label: c === 'physics' ? 'Physics' : 'Engineering' });
  }

  return result;
}

const PHYSICS_SUBS = new Set<SubjectSubcategory>([
  'physics',
  'theoretical-physics',
  'mathematical-physics',
  'astrophysics',
  'physics-with-astronomy',
  'physics-with-computing',
  'physics-with-mathematics',
  'natural-sciences-physical',
]);

const ENGINEERING_SUBS = new Set<SubjectSubcategory>([
  'general-engineering',
  'engineering-science',
  'mechanical',
  'electrical',
  'electronic',
  'civil',
  'chemical',
  'aerospace',
  'aeronautical',
  'materials',
  'biomedical',
  'information-engineering',
  'computer-engineering',
]);

export const SEARCH_EXAMPLES = [
  'physics AAA',
  'engineering without chemistry',
  'physics further maths recommended',
  'mechanical engineering AAA',
  'universities requiring ESAT',
  'physics courses without admissions tests',
  'engineering courses requiring further maths',
];
