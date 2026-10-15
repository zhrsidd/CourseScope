import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Course, EligibilityReport, StudentProfile, University } from '@/types';
import { dataSource } from '@/lib/dataSource';
import { evaluateCatalogue } from '@/lib/eligibility';
import { emptyStudentProfile, isStudentProfile } from '@/lib/grades';
import { isStringArray, useLocalStorage } from '@/hooks/useLocalStorage';
import { initialEntryYear, saveEntryYear, urlEntryYear } from '@/lib/entry-year';
import type { ApplicationYear } from '@/types';

export const MAX_COMPARE = 5;

interface AppState {
  loading: boolean;
  error: string | null;
  universities: University[];
  universityById: Record<string, University>;
  courses: Course[];
  courseById: Record<string, Course>;
  coursesByUniversity: Record<string, Course[]>;
  /** True once any record has been checked against a real source. */
  hasVerifiedData: boolean;
  /** Development/admin only — never surfaced on the public pages. */

  profile: StudentProfile;
  setProfile: (updater: StudentProfile | ((prev: StudentProfile) => StudentProfile)) => void;
  /** Clears grades and subjects. Leaves the chosen entry year alone. */
  resetProfile: () => void;
  /** The one entry year every switch shows. See src/lib/entry-year.ts. */
  entryYear: ApplicationYear;
  /** The year the visitor explicitly chose and saved (or the default). Ignores any link override. */
  savedEntryYear: ApplicationYear;
  /** Record an explicit entry-year choice. The only thing that saves it. Also ends any link override. */
  setEntryYear: (year: ApplicationYear) => void;
  /**
   * Show a year taken from a shared link WITHOUT saving it. `null` returns to the
   * saved choice. Never writes storage.
   */
  setYearOverride: (year: ApplicationYear | null) => void;
  eligibility: Record<string, EligibilityReport>;

  savedCourseIds: string[];
  savedUniversityIds: string[];
  toggleSavedCourse: (id: string) => void;
  toggleSavedUniversity: (id: string) => void;

  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  /*
   * Every persisted key carries its own shape check. A value that parses but
   * cannot be used — typically a profile written by an older build — is
   * discarded for that key alone, so a bad profile never clears a good
   * shortlist. See src/hooks/useLocalStorage.ts for why this is not optional.
   */
  const [storedProfile, setStoredProfile, resetStoredProfile] = useLocalStorage<StudentProfile>(
    'ukcf.profile.v1',
    emptyStudentProfile(),
    isStudentProfile,
  );

  /*
   * The entry year is held apart from the stored profile, read synchronously
   * on first render (so nothing renders a wrong year first), and saved only by
   * setEntryYear — i.e. only when a person presses a year switch. The
   * profile's own stored `applicationYear` is never consulted: it may be a
   * default an older build wrote on mount. See src/lib/entry-year.ts.
   */
  const [savedEntryYear, setEntryYearState] = useState<ApplicationYear>(initialEntryYear);
  /*
   * A year carried by a shared link (#/search?year=2028) applies to this visit
   * only. It is read synchronously so the first render already shows it, and it
   * is never written to storage: only a person pressing a year does that.
   */
  const [yearOverride, setYearOverrideState] = useState<ApplicationYear | null>(() => {
    const fromLink = urlEntryYear(window.location.hash);
    return fromLink && fromLink !== initialEntryYear() ? fromLink : null;
  });
  const entryYear = yearOverride ?? savedEntryYear;
  const setEntryYear = useCallback((year: ApplicationYear) => {
    setEntryYearState(year);
    setYearOverrideState(null);
    saveEntryYear(year);
  }, []);
  const setYearOverride = useCallback(
    (year: ApplicationYear | null) => setYearOverrideState(year && year !== savedEntryYear ? year : null),
    [savedEntryYear],
  );

  /** Everything downstream sees one profile whose year is the chosen year. */
  const profile = useMemo<StudentProfile>(
    () => ({ ...storedProfile, applicationYear: entryYear }),
    [storedProfile, entryYear],
  );
  const setProfile = useCallback(
    (updater: StudentProfile | ((prev: StudentProfile) => StudentProfile)) => {
      const current = { ...storedProfile, applicationYear: entryYear };
      const next = typeof updater === 'function' ? updater(current) : updater;
      // A year change arriving through the profile is still an explicit choice.
      if (next.applicationYear !== entryYear) setEntryYear(next.applicationYear);
      setStoredProfile(next);
    },
    [storedProfile, entryYear, setEntryYear, setStoredProfile],
  );
  const resetProfile = resetStoredProfile;
  const [savedCourseIds, setSavedCourseIds] = useLocalStorage<string[]>(
    'ukcf.savedCourses.v1',
    [],
    isStringArray,
  );
  const [savedUniversityIds, setSavedUniversityIds] = useLocalStorage<string[]>(
    'ukcf.savedUniversities.v1',
    [],
    isStringArray,
  );
  const [compareIds, setCompareIds] = useLocalStorage<string[]>(
    'ukcf.compare.v1',
    [],
    isStringArray,
  );

  useEffect(() => {
    let cancelled = false;
    dataSource
      .load()
      .then((catalogue) => {
        if (cancelled) return;
        setUniversities(catalogue.universities);
        setCourses(catalogue.courses);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Could not load the catalogue.');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const universityById = useMemo(
    () => Object.fromEntries(universities.map((u) => [u.id, u])),
    [universities],
  );
  const courseById = useMemo(() => Object.fromEntries(courses.map((c) => [c.id, c])), [courses]);
  const coursesByUniversity = useMemo(() => {
    const out: Record<string, Course[]> = {};
    for (const c of courses) {
      (out[c.universityId] ??= []).push(c);
    }
    return out;
  }, [courses]);

  const eligibility = useMemo(() => evaluateCatalogue(courses, profile), [courses, profile]);

  const hasVerifiedData = useMemo(
    () =>
      courses.some(
        (c) =>
          c.provenance.verificationStatus === 'verified' ||
          c.provenance.verificationStatus === 'partially-verified',
      ),
    [courses],
  );

  const toggleSavedCourse = useCallback(
    (id: string) =>
      setSavedCourseIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setSavedCourseIds],
  );
  const toggleSavedUniversity = useCallback(
    (id: string) =>
      setSavedUniversityIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      ),
    [setSavedUniversityIds],
  );
  const toggleCompare = useCallback(
    (id: string) =>
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX_COMPARE) return prev;
        return [...prev, id];
      }),
    [setCompareIds],
  );
  const clearCompare = useCallback(() => setCompareIds([]), [setCompareIds]);

  const value: AppState = {
    loading,
    error,
    universities,
    universityById,
    courses,
    courseById,
    coursesByUniversity,
    hasVerifiedData,
    profile,
    setProfile,
    resetProfile,
    entryYear,
    savedEntryYear,
    setEntryYear,
    setYearOverride,
    eligibility,
    savedCourseIds,
    savedUniversityIds,
    toggleSavedCourse,
    toggleSavedUniversity,
    compareIds,
    toggleCompare,
    clearCompare,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
