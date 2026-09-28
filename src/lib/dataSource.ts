/**
 * Repository boundary.
 *
 * The whole UI talks to a `DataSource`. Nothing in `src/components` or
 * `src/pages` imports a seed file, so moving to Supabase / Postgres / Firebase
 * / a REST API means adding one implementation here and changing the last line.
 */

import type { Course, University } from '@/types';
import { courses as seedCourses, universities as seedUniversities } from '@/data';
import { importCoursesJson, type CourseRecordJson } from './importers';

export interface Catalogue {
  universities: University[];
  courses: Course[];
}

export interface DataSource {
  readonly id: string;
  readonly label: string;
  load(): Promise<Catalogue>;
}

/** The catalogue compiled into the bundle. */
export class StaticDataSource implements DataSource {
  readonly id = 'static-seed';
  readonly label = 'Bundled TypeScript seed';

  constructor(private readonly latencyMs = 0) {}

  async load(): Promise<Catalogue> {
    if (this.latencyMs > 0) await new Promise((r) => setTimeout(r, this.latencyMs));
    return { universities: seedUniversities, courses: seedCourses };
  }
}

/**
 * Reads the same wire format the `/data/*.json` files use. Point it at a URL
 * (a static host, an S3 bucket, a Supabase storage object) and the app runs off
 * that instead of the bundle, with no component changes.
 */
export class JsonDataSource implements DataSource {
  readonly id = 'json';
  readonly label: string;

  constructor(
    private readonly urls: { universities: string; courses: string },
    label = 'JSON files',
  ) {
    this.label = label;
  }

  async load(): Promise<Catalogue> {
    const [universities, coursesText] = await Promise.all([
      fetch(this.urls.universities).then((r) => r.json() as Promise<University[]>),
      fetch(this.urls.courses).then((r) => r.text()),
    ]);
    const result = importCoursesJson(coursesText);
    if (result.errors.length) {
      throw new Error(`Course import failed:\n${result.errors.slice(0, 5).join('\n')}`);
    }
    return { universities, courses: result.records };
  }
}

/** In-memory source used by the admin importer to preview a pasted batch. */
export class InMemoryDataSource implements DataSource {
  readonly id = 'in-memory';
  readonly label = 'Imported batch';

  constructor(private readonly catalogue: Catalogue) {}

  async load(): Promise<Catalogue> {
    return this.catalogue;
  }
}

/**
 * Example of a database-backed implementation. Not wired up — kept as the
 * shape to copy when the catalogue moves off static files.
 *
 * export class SupabaseDataSource implements DataSource {
 *   readonly id = 'supabase';
 *   readonly label = 'Supabase';
 *   constructor(private client: SupabaseClient) {}
 *   async load(): Promise<Catalogue> {
 *     const [{ data: universities }, { data: rows }] = await Promise.all([
 *       this.client.from('universities').select('*'),
 *       this.client.from('courses').select('*'),
 *     ]);
 *     const courses = (rows ?? []).map((row) =>
 *       normaliseCourseRecord(row as CourseRecordJson, row.slug, [], []),
 *     ).filter(Boolean) as Course[];
 *     return { universities: universities ?? [], courses };
 *   }
 * }
 */
export type { CourseRecordJson };

export const dataSource: DataSource = new StaticDataSource();
