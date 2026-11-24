/**
 * ---------------------------------------------------------------------------
 *  BATCH 9 — MEDICINE: UNIVERSITY OF ST ANDREWS, MEDICINE BSc (Hons) (A100) — IDENTITY ONLY
 *  Read from the university's own pages on 2026-11-24. Research note:
 *  research/medicine-b9.md (verbatim quotes for every field below).
 * ---------------------------------------------------------------------------
 *
 *  The course is real and its 2027 page was read, but neither it nor the
 *  Medicine entry-requirements page prints an A-level grade profile. So this is
 *  an awaiting-data record: identity, no requirements. Note the award: three
 *  years at St Andrews for a BSc (Hons) Medicine, then three at a partner
 *  medical school for the MBChB or MBBS.
 */

import type { Course } from '@/types';
import { awaitingCourse } from './builders';

export const batch9StAndrewsMedicine: Course = awaitingCourse({
  slug: 'st-andrews-medicine-bsc',
  universityId: 'st-andrews',
  name: 'Medicine',
  category: 'medicine',
  sub: 'medicine',
  degree: 'BSc',
  awardLabel: 'BSc (Hons) Medicine',
  years: 6,
  code: 'A100',
  year: '2027',
  cycleNote:
    'The page reads “Medicine BSc (Hons) A100, 2027 entry”, with a September 2027 start and “Application deadline: Thursday 15 October 2026”.',
  officialUrl: 'https://www.st-andrews.ac.uk/subjects/medicine/medicine-bsc-a100/',
  identityVerification: 'official-page',
  identityNote:
    'St Andrews’ 2027 course page, read on 2026-11-24, prints “Medicine BSc (Hons) A100” and “Duration Six years full time”.',
  notes:
    'A SIX-YEAR ROUTE ACROSS TWO UNIVERSITIES: three years at St Andrews for a BSc (Hons) Medicine, then three years at a partner medical school for an MBChB or MBBS (Scotland route: Aberdeen, Dundee, Edinburgh, Glasgow; England route: Manchester, London; Overseas students go to Manchester). REQUIREMENTS NOT RECORDED: no A-level grades are printed on the course page or the Medicine entry-requirements page, read on 2026-11-24. The pages say applicants take the UCAT and give the lowest UCAT scores selected for interview for 2026 entry (1500 Home funded and Scottish, 1640 UK domicile, 1710 Overseas); these are 2026 figures, not a 2027 requirement.',
});
