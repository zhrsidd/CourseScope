import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EntryYearSwitch } from '@/components/EntryYearSwitch';
import { Collapse } from '@/components/ui/Collapse';
import { IconChevron, IconCompare, IconHeart, IconSearch } from '@/components/ui/icons';
import { SUBCATEGORIES, SUBJECT_CATEGORIES, VERIFICATION_LABEL } from '@/data/taxonomy';
import { applyFilters, defaultFilters } from '@/lib/filters';
import { formatDate, typicalOfferLabel } from '@/lib/format';
import { usePageTitle } from '@/lib/page-title';
import { SEARCH_EXAMPLES, parseQuery } from '@/lib/search';
import { searchHref } from '@/lib/search-url';
import { MAX_COMPARE, useApp } from '@/state/AppContext';
import type { ApplicationYear, Course } from '@/types';

const EMPTY_QUERY = parseQuery('');

/** A count in a sentence reads better as a figure with a thousands separator. */
const n = (x: number) => x.toLocaleString('en-GB');

/**
 * The landing page.
 *
 * EVERYTHING NUMERIC OR QUOTED HERE IS COMPUTED FROM THE CATALOGUE. Nothing is
 * typed in by hand: not the counts, not the dates, not the wording of the featured
 * requirement. The subject counts use the same filter function, with the same
 * defaults, as the search page, so a number here is the number of rows the link
 * beside it opens.
 */
export function LandingPage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const {
    loading,
    courses,
    universities,
    universityById,
    eligibility,
    hasVerifiedData,
    entryYear,
    setEntryYear,
    savedCourseIds,
    savedUniversityIds,
    compareIds,
  } = useApp();
  const [q, setQ] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(searchHref({ q: q.trim() || undefined, year: entryYear }));
  };

  /* ---- Subject index: counts identical to what the search page lists ---- */
  const subjectRows = useMemo(() => {
    const listed = applyFilters({
      courses,
      universities: universityById,
      filters: { ...defaultFilters(hasVerifiedData), applicationYear: entryYear },
      parsed: EMPTY_QUERY,
      eligibility,
      shortlistedCourseIds: [],
    });
    const bySub = new Map<string, { count: number; unis: Set<string> }>();
    for (const c of listed) {
      const e = bySub.get(c.subjectSubcategory) ?? { count: 0, unis: new Set<string>() };
      e.count += 1;
      e.unis.add(c.universityId);
      bySub.set(c.subjectSubcategory, e);
    }
    return SUBJECT_CATEGORIES.map((cat) => {
      const subs = SUBCATEGORIES.filter((s) => s.category === cat.id)
        .map((s) => ({ ...s, count: bySub.get(s.id)?.count ?? 0, unis: bySub.get(s.id)?.unis.size ?? 0 }))
        .filter((s) => s.count > 0)
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
      return { ...cat, subs, total: subs.reduce((t, s) => t + s.count, 0) };
    });
  }, [courses, universityById, eligibility, hasVerifiedData, entryYear]);

  /* ---- Record states and coverage, from every record, both years ---- */
  const stats = useMemo(() => {
    const count = (year: ApplicationYear, status: string) =>
      courses.filter((c) => c.applicationYear === year && c.provenance.verificationStatus === status).length;
    const verified27 = count('2027', 'verified') + count('2027', 'partially-verified');
    const awaiting27 = count('2027', 'awaiting-data');
    const waiting28 = count('2028', 'awaiting-publication');
    const dates = courses
      .filter((c) => c.applicationYear === '2027' && c.provenance.lastVerified)
      .map((c) => c.provenance.lastVerified as string)
      .sort();
    const rows = universities
      .map((u) => {
        const mine = courses.filter((c) => c.universityId === u.id && c.applicationYear === '2027');
        const v = mine.filter((c) => c.provenance.verificationStatus === 'verified' || c.provenance.verificationStatus === 'partially-verified').length;
        const a = mine.filter((c) => c.provenance.verificationStatus === 'awaiting-data').length;
        return { id: u.id, name: u.shortName ?? u.name, verified: v, awaiting: a };
      })
      .filter((r) => r.verified + r.awaiting > 0)
      .sort((x, y) => x.name.localeCompare(y.name));
    return {
      verified27,
      awaiting27,
      waiting28,
      firstChecked: dates[0] ?? null,
      lastChecked: dates[dates.length - 1] ?? null,
      rows,
    };
  }, [courses, universities]);

  /* ---- Featured requirement: the university's own words, verbatim ---- */
  const featured = useMemo(() => {
    const out: { course: Course; wording: string }[] = [];
    const seen = new Set<string>();
    const pool = courses
      .filter((c) => c.applicationYear === '2027' && c.provenance.verificationStatus === 'verified' && c.provenance.sourceUrl && c.provenance.lastVerified)
      .sort((a, b) => a.id.localeCompare(b.id));
    // Oxford Physics opens the sequence when present; then one per other university.
    const first = pool.find((c) => c.id === 'oxford-physics-mphys--2027');
    for (const c of first ? [first, ...pool] : pool) {
      const w = c.offers[0]?.rawText?.trim() ?? '';
      if (w.length < 20 || w.length > 240 || seen.has(c.universityId)) continue;
      seen.add(c.universityId);
      out.push({ course: c, wording: w });
    }
    return out;
  }, [courses]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const feat = featured.length ? featured[featuredIndex % featured.length] : null;

  const [tableOpen, setTableOpen] = useState(false);
  // Each column opens with its eight largest subjects; the rest are one press away.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const FIRST = 8;
  const yearNum = Number(entryYear);
  const savedCount = savedCourseIds.length + savedUniversityIds.length;
  const maxMarks = Math.max(1, ...stats.rows.map((r) => r.verified + r.awaiting));

  return (
    <div className="lp">
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="lp-hero" aria-labelledby="lp-h1">
        <div className="wrap lp-hero-in">
            <p className="lp-eyebrow">UK Physics &amp; Engineering · {entryYear} entry</p>
            <h1 id="lp-h1" className="lp-h1">
              <span className="mask">
                <span className="mask-in" style={{ ['--i' as string]: 0 }}>Find the course.</span>
              </span>
              <span className="mask">
                <span className="mask-in" style={{ ['--i' as string]: 1 }}>Check the source.</span>
              </span>
            </h1>
            <p className="lp-lede">
              CourseScope compares published entry requirements for UK Physics and Engineering
              degrees. Each requirement is read from the university’s own page and shown with its
              source and date.
            </p>

            <form className="lp-search" role="search" onSubmit={submit}>
              <div className="search-box">
                <IconSearch aria-hidden />
                <input
                  type="search"
                  className="field"
                  aria-label="Search courses"
                  list="lp-suggestions"
                  placeholder="Try “physics AAA”"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <datalist id="lp-suggestions">
                  {SEARCH_EXAMPLES.map((ex) => (
                    <option key={ex} value={ex} />
                  ))}
                </datalist>
              </div>
              <button type="submit" className="btn-primary lp-go">
                Search courses
              </button>
            </form>

            <div className="lp-year">
              <EntryYearSwitch value={entryYear} onChange={setEntryYear} idPrefix="lp-year" />
              <p>
                {entryYear === '2027'
                  ? `Applying in autumn ${yearNum - 1} for a September ${yearNum} start. Requirements published.`
                  : `Applying in autumn ${yearNum - 1} for a September ${yearNum} start. Universities have not published these requirements yet.`}
              </p>
            </div>

            <p className="lp-examples">
              <span>Or start from:</span>
              {SEARCH_EXAMPLES.slice(0, 3).map((ex) => (
                <Link key={ex} to={searchHref({ q: ex, year: entryYear })}>
                  {ex}
                </Link>
              ))}
            </p>

          <dl className="lp-facts" aria-label="What is in the catalogue">
            <div>
              <dt>courses with published 2027 requirements, each checked against its source</dt>
              <dd>{loading ? '…' : n(stats.verified27)}</dd>
            </div>
            <div>
              <dt>UK universities</dt>
              <dd>{loading ? '…' : n(universities.length)}</dd>
            </div>
            <div>
              <dt>courses awaiting our research</dt>
              <dd>{loading ? '…' : n(stats.awaiting27)}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ------------------------- Subject index ------------------------- */}
      <section className="lp-sec" aria-labelledby="lp-subjects">
        <div className="wrap">
          <div className="lp-sec-head">
            <h2 id="lp-subjects" className="lp-h2">Browse by subject</h2>
            <p>
              Counts are the courses listed for {entryYear} entry, and the universities that offer
              them. Each row opens the search with that subject selected.
            </p>
          </div>
          <div className="lp-subjects">
            {subjectRows.map((cat) => (
              <div key={cat.id} className="lp-col">
                <div className="lp-col-head">
                  <span>{cat.label}</span>
                  <Link to={searchHref({ category: cat.id, year: entryYear })}>
                    All {n(cat.total)} courses
                  </Link>
                </div>
                <div className="lp-subj-cols" aria-hidden="true">
                  <span>Subject</span>
                  <span>Courses</span>
                  <span>Unis</span>
                </div>
                <ul>
                  {cat.subs.slice(0, FIRST).map((s) => (
                    <li key={s.id}>
                      <Link to={searchHref({ subcategory: s.id, year: entryYear })} className="lp-subj">
                        <span className="lp-subj-name">{s.label}</span>
                        <span className="lp-subj-n">
                          {n(s.count)}
                          <span className="sr-only"> courses at </span>
                        </span>
                        <span className="lp-subj-u">
                          {s.unis}
                          <span className="sr-only"> universities</span>
                        </span>
                        <IconChevron width={16} height={16} className="lp-subj-go" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
                {cat.subs.length > FIRST ? (
                  <>
                    <Collapse open={Boolean(expanded[cat.id])} id={`lp-more-${cat.id}`}>
                      <ul>
                        {cat.subs.slice(FIRST).map((s) => (
                          <li key={s.id}>
                            <Link to={searchHref({ subcategory: s.id, year: entryYear })} className="lp-subj">
                              <span className="lp-subj-name">{s.label}</span>
                              <span className="lp-subj-n">
                                {n(s.count)}
                                <span className="sr-only"> courses at </span>
                              </span>
                              <span className="lp-subj-u">
                                {s.unis}
                                <span className="sr-only"> universities</span>
                              </span>
                              <IconChevron width={16} height={16} className="lp-subj-go" aria-hidden />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Collapse>
                    <button
                      type="button"
                      className="disclose lp-more-btn"
                      aria-expanded={Boolean(expanded[cat.id])}
                      aria-controls={`lp-more-${cat.id}`}
                      onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))}
                    >
                      <IconChevron width={14} height={14} />
                      {expanded[cat.id]
                        ? `Show fewer ${cat.label.toLowerCase()} subjects`
                        : `Show all ${cat.subs.length} ${cat.label.toLowerCase()} subjects`}
                    </button>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- Featured published requirement ------------------- */}
      {feat ? (
        <section className="lp-sec lp-sec-tight" aria-labelledby="lp-feat">
          <div className="wrap">
            <article className="lp-feat on-dark" aria-labelledby="lp-feat">
              <div className="lp-feat-top">
                <div>
                  <p className="lp-feat-uni">{universityById[feat.course.universityId]?.name}</p>
                  <h2 id="lp-feat" className="lp-feat-name">{feat.course.name}</h2>
                  <p className="lp-feat-meta">
                    <span>{feat.course.degreeType}</span>
                    {feat.course.durationYears ? <span>{feat.course.durationYears} years</span> : null}
                    {feat.course.courseCode ? (
                      <span>
                        UCAS <span className="t-code">{feat.course.courseCode}</span>
                      </span>
                    ) : null}
                    <span>{feat.course.applicationYear} entry</span>
                  </p>
                </div>
                <div className="lp-feat-offer">
                  <span>Typical offer</span>
                  <b className="t-grade">{typicalOfferLabel(feat.course)}</b>
                </div>
              </div>
              <figure className="lp-feat-quote">
                <figcaption>The university’s published wording</figcaption>
                <blockquote>{feat.wording}</blockquote>
              </figure>
              <div className="lp-feat-foot">
                <p>
                  Read from{' '}
                  <a href={feat.course.provenance.sourceUrl as string} target="_blank" rel="noreferrer">
                    {feat.course.provenance.sourceTitle ?? 'the university’s course page'}
                  </a>
                  , checked {formatDate(feat.course.provenance.lastVerified)}.
                </p>
                <div className="lp-feat-actions">
                  <Link to={`/course/${feat.course.id}`} className="btn-secondary btn-sm">
                    Open the course page
                  </Link>
                  {featured.length > 1 ? (
                    <button
                      type="button"
                      className="btn-secondary btn-sm"
                      onClick={() => setFeaturedIndex((i) => (i + 1) % featured.length)}
                    >
                      Show another course
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {/* ----------------------------- Method ----------------------------- */}
      <section className="lp-sec" aria-labelledby="lp-method">
        <div className="wrap">
          <div className="lp-sec-head">
            <h2 id="lp-method" className="lp-h2">How the comparison works</h2>
            <p>
              <Link to="/about" className="link">Read the full methodology</Link>
            </p>
          </div>
          <ol className="lp-steps">
            <li>
              <span className="lp-step-n" aria-hidden="true">1</span>
              <h3>Read from the university</h3>
              <p>
                Entry requirements are taken from each university’s own course page for one specific
                entry year. Nothing is estimated, and 2027 records are never carried into 2028.
              </p>
            </li>
            <li>
              <span className="lp-step-n" aria-hidden="true">2</span>
              <h3>Recorded with its source</h3>
              <p>
                Every course keeps the page it was read from and the date it was checked, so you can
                open the original and confirm it yourself.
              </p>
            </li>
            <li>
              <span className="lp-step-n" aria-hidden="true">3</span>
              <h3>Compared with your grades, and only that</h3>
              <p>
                Add your A-Levels and each course shows whether they meet the published academic
                requirements. That is not the chance of an offer: interviews, admissions tests and
                competition for places all still apply.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ------------------------ Record states + coverage ------------------------ */}
      <section className="lp-sec lp-sec-tint" aria-labelledby="lp-states">
        <div className="wrap">
          <div className="lp-sec-head">
            <h2 id="lp-states" className="lp-h2">Every record says where it stands</h2>
            <p>
              Each course carries one of three states.
              {stats.firstChecked && stats.lastChecked
                ? ` Sources were checked between ${formatDate(stats.firstChecked)} and ${formatDate(stats.lastChecked)}.`
                : ''}{' '}
              Nothing is filled in from previous years or estimated.
            </p>
          </div>
          <div className="lp-states">
            <div className="lp-state">
              <span className="lp-state-tag lp-ok">{VERIFICATION_LABEL.verified}</span>
              <b>{n(stats.verified27)}</b>
              <span className="lp-state-year">2027 entry</span>
              <p>Checked against the university’s official source, on the date shown on each course.</p>
            </div>
            <div className="lp-state">
              <span className="lp-state-tag lp-wait">{VERIFICATION_LABEL['awaiting-data']}</span>
              <b>{n(stats.awaiting27)}</b>
              <span className="lp-state-year">2027 entry</span>
              <p>
                A real course whose requirements we have not yet checked, so none are shown.
              </p>
            </div>
            <div className="lp-state">
              <span className="lp-state-tag lp-wait">{VERIFICATION_LABEL['awaiting-publication']}</span>
              <b>{n(stats.waiting28)}</b>
              <span className="lp-state-year">2028 entry</span>
              <p>
                The university has not published requirements for this year yet. That is its
                publication cycle, not a gap in our research.
              </p>
            </div>
          </div>

          <h3 className="lp-h3">Coverage, university by university</h3>
          <p className="lp-note">
            Bar length is the number of 2027-entry courses. Listed alphabetically, not ranked.
          </p>
          <ul className="lp-cov">
            {stats.rows.map((r) => (
              <li key={r.id}>
                <span className="lp-cov-name">{r.name}</span>
                <span
                  className="lp-cov-marks"
                  role="img"
                  aria-label={`${r.name}: ${r.verified} verified, ${r.awaiting} not verified yet`}
                  style={{ ['--w' as string]: `${((r.verified + r.awaiting) / maxMarks) * 100}%` }}
                >
                  <i className="lp-cov-v" style={{ flexGrow: r.verified }} />
                  {r.awaiting > 0 ? <i className="lp-cov-a" style={{ flexGrow: r.awaiting }} /> : null}
                </span>
                <span className="lp-cov-n">{r.verified + r.awaiting}</span>
              </li>
            ))}
          </ul>
          <p className="lp-legend">
            <span><i className="lp-cov-v" /> Verified for 2027</span>
            <span><i className="lp-cov-a" /> Not verified by us yet</span>
            <span>All 2028 entries: university has not published</span>
          </p>
          <button
            type="button"
            className="disclose lp-table-btn"
            aria-expanded={tableOpen}
            aria-controls="lp-table"
            onClick={() => setTableOpen((o) => !o)}
          >
            <IconChevron width={14} height={14} />
            View coverage as a table
          </button>
          <Collapse open={tableOpen} id="lp-table">
            <div className="lp-table-wrap">
              <table className="lp-table">
                <caption className="sr-only">2027-entry courses by university and verification state</caption>
                <thead>
                  <tr>
                    <th scope="col">University</th>
                    <th scope="col">Verified</th>
                    <th scope="col">Not verified yet</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.rows.map((r) => (
                    <tr key={r.id}>
                      <th scope="row">{r.name}</th>
                      <td>{r.verified}</td>
                      <td>{r.awaiting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapse>
        </div>
      </section>

      {/* ------------------------- Shortlist and compare ------------------------- */}
      <section className="lp-sec lp-sec-tight" aria-label="Your shortlist and comparison">
        <div className="wrap lp-pair">
          <div className="lp-pair-card">
            <div>
              <h2 className="lp-h3"><IconHeart width={16} height={16} aria-hidden /> Shortlist</h2>
              <p>
                {savedCount > 0
                  ? `${savedCount} saved in this browser. Nothing is sent anywhere.`
                  : 'Courses you save stay in this browser. Nothing is sent anywhere.'}
              </p>
            </div>
            <Link to="/shortlist" className="btn-secondary">View shortlist</Link>
          </div>
          <div className="lp-pair-card">
            <div>
              <h2 className="lp-h3"><IconCompare width={16} height={16} aria-hidden /> Compare</h2>
              <p>
                {compareIds.length > 0
                  ? `${compareIds.length} of ${MAX_COMPARE} courses selected, side by side with differences highlighted.`
                  : `Put up to ${MAX_COMPARE} courses side by side, with differences highlighted.`}
              </p>
            </div>
            <Link to="/compare" className="btn-secondary">Open compare</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
