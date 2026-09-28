import type { ApplicationYear } from '@/types';

/**
 * The entry year a FIRST-TIME visitor sees.
 *
 * 2027, because it is the cycle students are applying in now (UCAS 2027-entry
 * applications are open) and the only one with published requirements. It was
 * 2028 until v1.0.0, which meant a new visitor's first screen was 563 courses
 * reading "2028 requirements not yet published".
 *
 * This is only the starting value. A returning visitor's saved choice lives in
 * their stored profile (`ukcf.profile.v1`) and is read back unchanged, and 2028
 * is one click away in the entry-year switch.
 */
export const DEFAULT_APPLICATION_YEAR: ApplicationYear = '2027';
