/**
 * Writes the catalogue out as the JSON files documented in data/SCHEMA.md.
 *
 *   npm run export:data
 *
 * The output is exactly what the importer accepts, so the round trip is
 * lossless: export, edit in a spreadsheet or an editor, import back.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ADMISSIONS_TESTS, TUITION_FEES, allCourses, universities } from '@/data';
import { serialiseCourse } from '@/lib/importers';

const OUT = join(process.cwd(), 'data');
mkdirSync(OUT, { recursive: true });

const write = (name: string, value: unknown) => {
  const path = join(OUT, name);
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
  const count = Array.isArray(value) ? value.length : Object.keys(value as object).length;
  console.log(`wrote ${name} (${count} top-level entries)`);
};

/* universities.json — identity, departments and admissions overview */
write(
  'universities.json',
  universities.map((u) => ({
    id: u.id,
    slug: u.slug,
    name: u.name,
    shortName: u.shortName,
    initials: u.initials,
    city: u.city,
    region: u.region,
    country: u.country,
    website: u.website,
    admissionsUrl: u.admissionsUrl,
    departments: u.departments,
    admissionsOverview: u.admissionsOverview,
    verificationStatus: u.verificationStatus,
  })),
);
// rankings and deadlines live in their own files so each row keeps its own
// provenance rather than inheriting the university's.

/* courses.json — every record, including superseded placeholders */
write('courses.json', { courses: allCourses.map(serialiseCourse) });

/* rankings.json — one row per published position, each with its own provenance */
write('rankings.json', universities.flatMap((u) => u.rankings));

/* deadlines.json — one row per deadline, scoped by entry year and by what it applies to */
write('deadlines.json', universities.flatMap((u) => u.applicationDeadlines));

/* fees.json — v1.1: one row per published fee category per course and entry year */
write('fees.json', TUITION_FEES);

/* tests.json — the reference list of admissions tests */
write('tests.json', ADMISSIONS_TESTS);
