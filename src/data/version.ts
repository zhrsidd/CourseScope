/**
 * ---------------------------------------------------------------------------
 *  RELEASE MARKER AND CHANGELOG
 * ---------------------------------------------------------------------------
 *
 *  v1.0.0 is the first public release, under the CourseScope name. Before v1,
 *  every version was a statement that the data was still being closed out; the
 *  version badge in the footer still exists so a student or a colleague can tell
 *  which build they are looking at when they report something that looks wrong.
 *
 *  Two changelogs, deliberately separated:
 *
 *   · RELEASES is student-facing. It says what changed about the information,
 *     in the words a reader who does not work on this would use.
 *   · DEVELOPER_NOTES is not rendered anywhere in the student UI. It carries
 *     the engineering detail that belongs in a repository rather than on a
 *     page someone is using to choose a degree.
 */

export const APP_VERSION = 'v1.1.0';

export const APP_VERSION_LABEL = 'v1.1.0 — tuition fees';

/**
 * False from v1.0.0. It was set while the release gates were open; it was
 * cleared only once a production URL and a real feedback destination were
 * configured and the deployed build passed QA. The footer and the methodology
 * page read it, so a pre-release build always says so out loud.
 */
export const IS_PRE_RELEASE = false;

export interface ReleaseNote {
  version: string;
  date: string;
  headline: string;
  /** Student-facing. Plain language, about the information rather than the code. */
  changes: string[];
}

export const RELEASES: ReleaseNote[] = [
  {
    version: 'v1.1.0',
    date: '2026-10-01',
    headline: 'Tuition fees',
    changes: [
      'Course pages now have a Tuition fees section for 2027 entry, read from each university’s own fee pages. Every fee shows the year it applies to, the page it came from and when we checked it.',
      'Fees use the university’s own categories — Home, Overseas, International, and at Scottish universities Scotland, Rest of UK and others — rather than forcing every university into the same two boxes.',
      'Where a university has not confirmed a fee yet, we say so. If it gives an expected figure, it is labelled as expected, not shown as the fee. Where official pages disagree, we show the fee as not established rather than choosing one.',
      'No university has published fees for 2028 entry yet, so 2028 courses say exactly that. A 2027 fee is never shown as a 2028 one.',
      'Compare now includes a Tuition fees row.',
      'Fees are information only. They are separate from entry requirements and play no part in the eligibility check.',
      'Meeting published entry requirements does not guarantee admission.',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2026-09-28',
    headline: 'Initial Public Release',
    changes: [
      'CourseScope is the new name for this catalogue: a place to compare UK Physics and Engineering courses by what universities actually publish.',
      'Every course’s identity and entry requirements come from the university’s own pages, and every checked course links to the page it was read from.',
      'Entry requirements are tied to a single entry year. 2027 requirements are shown where published; 2028 is marked as not yet published rather than guessed.',
      'CourseScope opens on 2027 entry, the cycle students are applying in now. Switch to 2028 at any time, and your choice is remembered.',
      'Add your A-Level subjects and predicted grades once, and every course shows whether you meet its published academic requirements — with the reasons spelled out.',
      'Subject requirements, admissions tests and interview policies are shown for each checked course, alongside its application route.',
      'Compare courses side by side, and save courses and universities to a shortlist that stays in your browser.',
      'Searching for a specialism such as Astrophysics finds it even when it is a pathway inside a broader degree, and tells you which course you would actually apply to.',
      'Spotted something wrong? Every course page has a “Found an error? Report it” button that opens our feedback form with the course details filled in and your report ready to paste. “Report an issue” is also in the footer of every page.',
      'Every UCL course page shows UCL’s own list of preferred A-Level subjects, read from UCL’s website. It sits apart from the course’s requirements, which always come first.',
      'University rankings are not shown in this release: we have not yet checked any against its publisher.',
      'Meeting published entry requirements does not guarantee admission.',
    ],
  },
  {
    version: 'v0.9.0',
    date: '2026-09-28',
    headline: 'Release candidate',
    changes: [
      'Queen Mary University of London is now fully checked. Its 21 physics and engineering courses each carry their published offer, subject requirements, contextual offers and GCSE rule, read from Queen Mary’s own 2027 course pages.',
      'We had been listing an “Astrophysics BSc” at Queen Mary. It is not a course you can apply to — Queen Mary offers Astrophysics as a stream you choose after your first year, inside the Physics degree. The listing has been corrected, and searching for Astrophysics now takes you to the Physics course and the code you would actually use.',
      'Two Queen Mary UCAS codes we had been unsure about turned out to be wrong, and both are corrected: Biomedical Engineering is HBF2 and Materials Science and Engineering is J511.',
      'King’s College London’s General Engineering BEng has been added, alongside the MEng it pairs with. H100 is the three-year BEng and H101 is the four-year MEng.',
      'Four York courses that were marked as only partly checked are now fully checked. In each case the missing detail was something our tools could not read rather than something York had not published.',
      'Every university in the catalogue now has checked admissions data. Six courses are still waiting, in every case because the university has not yet published its 2027 requirements.',
      'A way to report a problem with any course is now set up properly, so corrections reach us.',
    ],
  },
  {
    version: 'v0.8',
    date: '2026-09-23',
    headline: 'Data closure and launch readiness',
    changes: [
      'Every course in the catalogue now has a source we can point to for the fact that it exists, separately from whether its entry requirements have been checked.',
      'Eight courses that had been listed without any source behind them were investigated one by one. Three turned out to be real and are now fully checked, five keep their place with their identity confirmed, and none was deleted on a hunch.',
      'Two of those eight were listed under the wrong name and the wrong UCAS code. Both are corrected.',
      'York’s 22 engineering courses now carry their published offers, subject requirements, interview policies and contextual offers.',
      'Lancaster’s 65 physics and engineering courses are now fully checked. Their subject requirements sit behind a part of the page that would not load before, and reading it turned up three genuinely different rules rather than one.',
      'A new page explains where the data comes from, what each trust label means, and what the eligibility check does and does not tell you.',
      'Every course page now has a “Report an issue” button, so you can tell us when something looks wrong.',
    ],
  },
];

/** Engineering detail. Never rendered in the student-facing UI. */
export const DEVELOPER_NOTES: string[] = [
  'v1.1.0: TuitionFee relation (src/types, src/data/tuition-fees.ts) — one row per published category per course id, separate from Course records; no Course record changed.',
  'v1.1.0: fee rows generated by scripts/import-fee-research.mjs from data/research/fees-2027/*.json (the official-source audit trail); string-table encoded, own build chunk.',
  'v1.1.0: validateTuitionFees — year leakage, year evidence, provenance, official domain, duplicate categories, Scottish category collapse, university-wide statement required; wired into validateCatalogue.',
  'v1.1.0: feeDisplayState — only published, own-year, sourced, recently verified fees display as current; stale after FEE_STALE_AFTER_DAYS.',
  'v1.0.0: brand applied — CourseScope name, mark, favicon.svg, social-preview asset; all public strings read from src/lib/brand.ts.',
  'v1.0.0: VITE_SITE_URL and VITE_FEEDBACK_URL configured for production; IS_PRE_RELEASE cleared.',
  'v1.0.0: version assertions rewritten to require a consistent version/pre-release pair rather than "not v1".',
  'v1.0.0 launch: entry year stored under ukcf.entryYear.v1 and written only on an explicit choice; the stale default year inside older stored profiles is ignored (it was written on mount by every earlier build).',
  'v1.0.0 polish: university-level public-data policy — served universities carry only verified rankings, deadlines and overviews (allUniversities keeps the seeds).',
  'v1.0.0 polish: UCL A-Level subject guidance centralised in src/data/university-subject-guidance.ts; never read by the eligibility engine.',
  'v1.0.0 polish: feedback routes — course provenance panel, footer, methodology — with context passed as Typeform URL parameters cs_university, cs_course, cs_award, cs_ucas_code, cs_entry_year, cs_record_id, cs_issue_type, cs_page.',
  'v0.9: QMUL closed via rendered-browser access to its JS-rendered 2027 course finder — 21 records across three subject pages, each option separately coded.',
  'v0.9: QMUL Astrophysics removed as an application; the four Physics streams are StudyOptions on F300/F303 and their variants.',
  'v0.9: scaffold codes H160 and J500 confirmed wrong at QMUL (they belong to York, and to Manchester/Sheffield respectively); assertions now pin both the correction and the untouched originals.',
  'v0.9: KCL General Engineering BEng H100 imported with its 2028 shell; H100/H101 pairing asserted in both directions.',
  'v0.9: York H641, H662, H119 and H640 all resolved. H641’s "ABB" was the contextual offer misread as a typical offer; H640’s page existed at the slug a v0.8 text fetch reported as 404.',
  'v0.9: partially-verified count is now 0. The assertion that live partials exist was replaced with behaviour assertions on a synthetic record, so a good outcome no longer reads as a regression.',
  'v0.9: feedback destination is env-configured via VITE_FEEDBACK_EMAIL / VITE_FEEDBACK_URL; the UI degrades to copy-only when neither is set.',
  'v0.8: added Provenance.identityVerification and identityNote — application identity verified independently of admissions requirements.',
  'v0.8: added isPubliclyDiscoverable() and the courses/policyExcludedCourses split.',
  'v0.8: removed the public footer link to /admin. The route still resolves; there is no authentication in this build and none was added.',
];
