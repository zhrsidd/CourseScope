import { A_LEVEL_GRADES, GRADE_VALUE, type ALevelGrade, type StudentProfile } from '@/types';

export function isGrade(value: string): value is ALevelGrade {
  return (A_LEVEL_GRADES as readonly string[]).includes(value);
}

export function gradeValue(grade: ALevelGrade): number {
  return GRADE_VALUE[grade];
}

/** Positive when `a` is better than `b`. */
export function compareGrades(a: ALevelGrade, b: ALevelGrade): number {
  return GRADE_VALUE[a] - GRADE_VALUE[b];
}

export function meetsGrade(actual: ALevelGrade, minimum: ALevelGrade): boolean {
  return GRADE_VALUE[actual] >= GRADE_VALUE[minimum];
}

/** ['A','A*','B'] -> ['A*','A','B'] */
export function sortGradesDesc(grades: ALevelGrade[]): ALevelGrade[] {
  return [...grades].sort((a, b) => GRADE_VALUE[b] - GRADE_VALUE[a]);
}

export function formatProfile(grades: ALevelGrade[]): string {
  return grades.join('');
}

/** "A*AA" -> ['A*','A','A']; null when the string is not a plain profile. */
export function parseProfileString(value: string): ALevelGrade[] | null {
  const cleaned = value.replace(/[^A-E*]/gi, '').toUpperCase();
  if (!cleaned) return null;
  const out: ALevelGrade[] = [];
  for (let i = 0; i < cleaned.length; i += 1) {
    const ch = cleaned[i];
    if (!'ABCDE'.includes(ch)) return null;
    if (cleaned[i + 1] === '*') {
      if (ch !== 'A') return null;
      out.push('A*');
      i += 1;
    } else {
      out.push(ch as ALevelGrade);
    }
  }
  return out;
}

/** Total ordinal weight of a grade profile — used only for sorting. */
export function profileWeight(grades: ALevelGrade[] | null): number {
  if (!grades || grades.length === 0) return Number.POSITIVE_INFINITY;
  return grades.reduce((sum, g) => sum + GRADE_VALUE[g], 0);
}

export function normaliseSubject(subject: string): string {
  const s = subject.trim().toLowerCase();
  const aliases: Record<string, string> = {
    maths: 'mathematics',
    math: 'mathematics',
    'further maths': 'further mathematics',
    'further math': 'further mathematics',
    fm: 'further mathematics',
    'design & technology': 'design and technology',
    'd&t': 'design and technology',
    'computing': 'computer science',
  };
  return aliases[s] ?? s;
}

export function subjectsMatch(a: string, b: string): boolean {
  return normaliseSubject(a) === normaliseSubject(b);
}

export interface ProfileGrade {
  subject: string;
  grade: ALevelGrade;
}

/** A-Levels with a grade actually entered. */
export function filledGrades(profile: StudentProfile): ProfileGrade[] {
  return profile.aLevels
    .filter((a): a is typeof a & { grade: ALevelGrade } => Boolean(a.subject.trim() && a.grade))
    .map((a) => ({ subject: a.subject.trim(), grade: a.grade }));
}

export function profileIsEmpty(profile: StudentProfile): boolean {
  return filledGrades(profile).length === 0;
}

export function findProfileGrade(
  entries: ProfileGrade[],
  subject: string,
  alternatives: string[] = [],
): ProfileGrade | null {
  const wanted = [subject, ...alternatives];
  for (const w of wanted) {
    const hit = entries.find((e) => subjectsMatch(e.subject, w));
    if (hit) return hit;
  }
  return null;
}

/**
 * Is this value a StudentProfile this build can actually use?
 *
 * Deliberately structural rather than exhaustive: it checks the fields the app
 * DEREFERENCES, because those are the ones whose absence causes a crash. A
 * stored profile carrying extra unknown fields is fine — it is passed through
 * untouched, since an older build's leftovers are harmless as long as the shape
 * this build needs is intact. What is not fine is a missing `aLevels` or
 * `gcses` array, which is exactly what took the page down in v0.9 QA.
 */
export function isStudentProfile(value: unknown): value is StudentProfile {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  if (!Array.isArray(v.aLevels) || !Array.isArray(v.gcses)) return false;
  // Every A-Level entry must be an object with a subject, or grade rendering
  // and subject matching both dereference undefined.
  const entriesOk = v.aLevels.every(
    (e) => typeof e === 'object' && e !== null && typeof (e as Record<string, unknown>).subject === 'string',
  );
  if (!entriesOk) return false;
  if (typeof v.applicationYear !== 'string') return false;
  if (typeof v.notes !== 'string') return false;
  const fm = v.schoolOffersFurtherMathematics;
  if (fm !== null && typeof fm !== 'boolean') return false;
  return true;
}

export function emptyStudentProfile(): StudentProfile {
  return {
    aLevels: [
      { id: 'al-1', subject: '', grade: null },
      { id: 'al-2', subject: '', grade: null },
      { id: 'al-3', subject: '', grade: null },
    ],
    gcses: [],
    applicationYear: '2028',
    schoolOffersFurtherMathematics: null,
    notes: '',
  };
}
