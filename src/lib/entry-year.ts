import type { ApplicationYear } from '@/types';

/**
 * ---------------------------------------------------------------------------
 *  THE ENTRY YEAR: ONE EXPLICIT CHOICE, SAVED ONLY WHEN SOMEONE MAKES IT
 * ---------------------------------------------------------------------------
 *
 *  The entry year a FIRST-TIME visitor sees is 2027: the cycle students are
 *  applying in now, and the only one with published requirements.
 *
 *  WHY IT HAS ITS OWN STORAGE KEY. Until v1.0.0 the year lived inside the saved
 *  profile (`ukcf.profile.v1`), and the persistence hook writes its value back
 *  on every mount. So every visit SAVED the default — 2028 in every build up to
 *  v0.9 and in the first v1 builds — as if the visitor had chosen it. Changing
 *  the default to 2027 therefore did nothing for anyone who had ever opened the
 *  site: their browser held a "2028" that nobody chose, and the live site kept
 *  opening on 2028. The profile cannot tell a choice from a default it wrote
 *  itself.
 *
 *  So the year is stored separately, under `ukcf.entryYear.v1`, and written
 *  ONLY when a person presses one of the entry-year switches. On load:
 *
 *    explicit saved choice  → that year
 *    nothing saved          → DEFAULT_APPLICATION_YEAR (2027)
 *
 *  The `applicationYear` inside any stored profile is ignored for this purpose:
 *  it is exactly the stale default described above. Grades and subjects in the
 *  profile are kept as they were.
 */
export const DEFAULT_APPLICATION_YEAR: ApplicationYear = '2027';

export const ENTRY_YEAR_STORAGE_KEY = 'ukcf.entryYear.v1';

/** The cycles a visitor can switch between. Kept here to avoid an import cycle. */
const SELECTABLE_YEARS: readonly ApplicationYear[] = ['2027', '2028'];

export function isSelectableYear(value: unknown): value is ApplicationYear {
  return typeof value === 'string' && (SELECTABLE_YEARS as readonly string[]).includes(value);
}

/** The year a person explicitly chose, or null if they never chose one. */
export function readSavedEntryYear(): ApplicationYear | null {
  try {
    const raw = window.localStorage.getItem(ENTRY_YEAR_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isSelectableYear(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Save an explicit choice. Called only from a user action, never on mount. */
export function saveEntryYear(year: ApplicationYear): void {
  try {
    window.localStorage.setItem(ENTRY_YEAR_STORAGE_KEY, JSON.stringify(year));
  } catch {
    /* storage unavailable — the choice still applies for this visit */
  }
}

/** The year to start on: the saved explicit choice, else the default. */
export function initialEntryYear(): ApplicationYear {
  return readSavedEntryYear() ?? DEFAULT_APPLICATION_YEAR;
}
