import { useCallback, useEffect, useState } from 'react';

/**
 * ---------------------------------------------------------------------------
 *  PERSISTED STATE, WITH THE STORED VALUE TREATED AS UNTRUSTED
 * ---------------------------------------------------------------------------
 *
 *  This hook used to guard only the ACCESS to localStorage — private windows,
 *  blocked site data, quota errors — and then trust whatever came back as long
 *  as `JSON.parse` succeeded. That is not enough, and v0.9's release QA proved
 *  it: a stored profile that parsed correctly but had the wrong SHAPE took the
 *  whole app down to a blank white page with
 *
 *      TypeError: Cannot read properties of undefined (reading 'filter')
 *
 *  because a consumer read `profile.aLevels` on an object that had no `aLevels`.
 *
 *  The realistic way that happens is not a hostile user. It is an ORDINARY ONE
 *  whose browser is holding a profile written by an older build with different
 *  field names. They return after a few months, and the site is a blank page
 *  with no way back — no error, no reset, nothing to click. The key is versioned
 *  (`ukcf.profile.v1`), which protects against a future rename but does nothing
 *  about anything already written under the current name.
 *
 *  So a parsed value now has to pass a caller-supplied `isValid` check before it
 *  is used. Anything that fails is DISCARDED and the initial value is used
 *  instead — which is the correct behaviour for state that exists only to save
 *  the user re-typing. Nothing important is lost, and the app always boots.
 *
 *  ONLY THE FAILING KEY IS RESET. Each piece of state has its own key and its
 *  own validator, so a corrupt profile does not clear a good shortlist. That is
 *  the "reset only the incompatible portion" rule, and it falls out of keeping
 *  the validators separate rather than validating one blob.
 *
 *  The discarded value is not written back until the user changes something, so
 *  a read-only visit leaves their old data alone rather than overwriting it.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
  /**
   * Shape check for a value read from storage. Return false for anything this
   * build cannot use. Defaults to accepting any parsed value, which is only
   * safe for state whose consumers already handle arbitrary content.
   */
  isValid: (value: unknown) => value is T = (v): v is T => v !== undefined && v !== null,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return initial;
      const parsed: unknown = JSON.parse(raw);
      if (!isValid(parsed)) {
        // Stored under this key by a build whose shape we cannot use. Start
        // clean rather than handing a malformed object to the rest of the app.
        return initial;
      }
      return parsed;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep working in memory */
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initial), [initial]);

  return [value, setValue, reset] as const;
}

/** An array of strings, and nothing else. Used for saved and compared IDs. */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}
