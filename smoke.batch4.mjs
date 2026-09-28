/**
 * Batch 4 browser smoke test.
 *
 * Covers the checklist in Part 24 of the Batch 4 brief: every page type, every
 * new university filter, the two trust states, study options, sidebar count
 * scope, fixtures staying private, and search responsiveness on the larger
 * catalogue.
 */
/*
 * PLAYWRIGHT IS RESOLVED, NOT HARDCODED. See smoke.v09.mjs for the reasoning:
 * an absolute path to one machine's global npm root makes a test script that
 * only runs on that machine.
 */
async function loadChromium() {
  const candidates = ['playwright', 'playwright-core'];
  const globalRoot = process.env.NPM_CONFIG_PREFIX ?? process.env.npm_config_prefix;
  if (globalRoot) candidates.push(`${globalRoot}/lib/node_modules/playwright/index.js`);
  candidates.push(`${process.env.HOME}/.npm-global/lib/node_modules/playwright/index.js`);
  // The global npm root is the last resort, and `npm root -g` is the only
  // reliable way to find it: it honours .npmrc's prefix, which the environment
  // variables above do not.
  try {
    const { execFileSync } = await import('node:child_process');
    const root = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
    if (root) candidates.push(`${root}/playwright/index.js`);
  } catch { /* npm not on PATH — fall through to the error below */ }
  for (const spec of candidates) {
    try {
      const mod = await import(spec);
      const c = mod.chromium ?? mod.default?.chromium;
      if (c) return c;
    } catch { /* next */ }
  }
  throw new Error('Playwright not found. Run: npm i -D playwright && npx playwright install chromium');
}
const chromium = await loadChromium();
const { mkdirSync } = await import('node:fs');
mkdirSync('shots', { recursive: true });
const BASE = 'http://127.0.0.1:4321';
const log = (m) => console.log(m);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

const goto = async (h) => {
  await page.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
};
const text = () => page.locator('body').innerText();
const countLoc = () => page.locator('main >> text=/^\\d+ courses?$/').first();
const safeCount = async () => {
  try {
    return await countLoc().innerText({ timeout: 5000 });
  } catch {
    return 'no result count shown';
  }
};
const num = async () => {
  const s = await safeCount();
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : -1;
};
const timed = async (label, fn) => {
  const t0 = Date.now();
  const out = await fn();
  log(`  ${label}: ${out}  [${Date.now() - t0}ms]`);
  return out;
};
const setRow = async (i, subject, grade) => {
  await page.locator('input[list="a-level-subjects"]').nth(i).fill(subject);
  const btn = page
    .locator('div[role="group"]')
    .nth(i)
    .getByRole('button', { name: grade, exact: true });
  // Clicking the active grade clears it, so only click when it is not already set.
  if ((await btn.getAttribute('aria-pressed')) !== 'true') await btn.click();
  await page.waitForTimeout(300);
};
/** What the grade form currently holds, so a verdict is never read blind. */
const profileState = async () => {
  const subs = await page
    .locator('input[list="a-level-subjects"]')
    .evaluateAll((els) => els.map((e) => e.value));
  const grades = await page
    .locator('div[role="group"]')
    .evaluateAll((gs) =>
      gs.map((g) => {
        const on = g.querySelector('button[aria-pressed="true"]');
        return on ? on.textContent.trim() : '–';
      }),
    );
  return subs.map((s, i) => `${s || '(blank)'} ${grades[i] ?? '–'}`).join(', ');
};
/**
 * The entered grades are echoed on every page, so a page-wide search for a
 * grade string would find the reader's own profile. Clear it before checking
 * that a record carries no offer of its own.
 */
const clearProfile = async () => {
  const btn = page.getByRole('button', { name: /^Clear$/ }).first();
  if (await btn.count()) {
    await btn.click();
    await page.waitForTimeout(400);
  }
};
const verdict = () =>
  page
    .locator(
      'text=/Meets published academic requirements|Does not currently meet requirements|Review required|Insufficient information/',
    )
    .first()
    .innerText();

const freshHome = async (year = '2027 entry') => {
  await goto('/');
  const reset = page.getByRole('button', { name: /^Reset$/ }).first();
  if (await reset.count()) {
    await reset.click();
    await page.waitForTimeout(300);
  }
  await page.getByRole('button', { name: year, exact: true }).first().click();
  await page.waitForTimeout(400);
};
/** Accordion sections toggle, so open one only when it is actually shut. */
const openSection = async (title) => {
  const sec = page.getByRole('button', { name: new RegExp('^' + title + '$') }).first();
  if (!(await sec.count())) return false;
  if ((await sec.getAttribute('aria-expanded')) !== 'true') {
    await sec.click();
    await page.waitForTimeout(350);
  }
  return true;
};

/* ------------------------------------------------------------------ */
log('1. HOME AND ENTRY-YEAR FILTERS');
await goto('/');
await timed('default view', safeCount);
await freshHome('2027 entry');
const n2027 = await num();
await timed('2027 entry', safeCount);
await freshHome('2028 entry');
const n2028 = await num();
await timed('2028 entry', safeCount);
await page.screenshot({ path: 'shots/e01-home.png' });

/* ------------------------------------------------------------------ */
log('\n2. SIDEBAR COUNT SCOPE (brief Part 3)');
// The count printed beside a facet must describe the same record universe as
// the visible results, so ticking it must land on exactly that number.
const facetCheck = async (name) => {
  await freshHome('2027 entry');
  const cb = page.getByRole('checkbox', { name: new RegExp('^' + name) }).first();
  if (!(await cb.count())) return `${name}: checkbox not found`;
  const label = await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText);
  const claimed = Number((label.match(/(\d+)\s*$/) ?? [])[1]);
  await cb.click();
  await page.waitForTimeout(500);
  const shown = await num();
  return `${name}: sidebar says ${claimed}, results show ${shown} → ${claimed === shown ? 'MATCH' : 'MISMATCH'}`;
};
log('  ' + (await facetCheck('Physics')));
log('  ' + (await facetCheck('Engineering')));

const uniFacetCheck = async (label) => {
  await freshHome('2027 entry');
  await openSection('University');
  const box = page.getByPlaceholder('Find a university').first();
  if (await box.count()) {
    await box.fill(label);
    await page.waitForTimeout(350);
  }
  const cb = page.getByRole('checkbox', { name: new RegExp(label) }).first();
  if (!(await cb.count())) return `${label}: checkbox not found`;
  const lbl = await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText);
  const claimed = Number((lbl.match(/(\d+)\s*$/) ?? [])[1]);
  await cb.click();
  await page.waitForTimeout(500);
  const shown = await num();
  return `${label}: sidebar says ${claimed}, results show ${shown} → ${claimed === shown ? 'MATCH' : 'MISMATCH'}`;
};
for (const u of ['Durham', 'Warwick', 'Edinburgh', 'Bristol', 'Bath']) {
  log('  ' + (await uniFacetCheck(u)));
}
await page.screenshot({ path: 'shots/e02-sidebar-counts.png' });

// And the counts must move when the record universe moves.
const rowLabel = async (re) => {
  const cb = page.getByRole('checkbox', { name: re }).first();
  if (!(await cb.count())) return '(not found)';
  const s = await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText);
  return s.replace(/\n/g, ' ');
};
await freshHome('2028 entry');
await openSection('Data status');
const before = { p: await rowLabel(/^Physics/), e: await rowLabel(/^Engineering/), c: await safeCount() };
const toggle = page.getByRole('checkbox', { name: /Include courses awaiting research/i }).first();
let after = { p: '(toggle not found)', e: '', c: '' };
if (await toggle.count()) {
  await toggle.click();
  await page.waitForTimeout(600);
  after = { p: await rowLabel(/^Physics/), e: await rowLabel(/^Engineering/), c: await safeCount() };
}
log(`  2028, excluding awaiting research: ${before.p} / ${before.e} / list ${before.c}`);
log(`  2028, including awaiting research: ${after.p} / ${after.e} / list ${after.c}`);
const sum = (a, bb) => Number((a.match(/(\d+)\s*$/) ?? [])[1]) + Number((bb.match(/(\d+)\s*$/) ?? [])[1]);
log(`  facets still add up to the list after the universe changes: ${sum(after.p, after.e) === Number((after.c.match(/(\d+)/) ?? [])[1])}`);

/* ------------------------------------------------------------------ */
log('\n3. TRUST-STATE LANGUAGE (brief Part 4)');
await freshHome('2027 entry');
await openSection('Data status');
const pageText = await text();
log('  research-backlog wording present: ' + /awaiting research/i.test(pageText));
log('  publication-cycle wording present: ' + /has not published|not yet published|awaiting publication/i.test(pageText));
log(
  '  sidebar spells out the difference: ' +
    /different from courses\s+whose university has not yet published/i.test(pageText.replace(/\s+/g, ' ')),
);
await goto('/about');
const aboutText = await text();
log('  "About the data" separates the two states: ' + (/awaiting research|not verified by us yet/i.test(aboutText) && /not yet published|has not published/i.test(aboutText)));
await page.screenshot({ path: 'shots/e02b-trust-states.png' });

/* ------------------------------------------------------------------ */
log('\n4. THE THREE TRUST STATES AS THE READER MEETS THEM');
// Verified 2027 records are the default view at 2027.
await freshHome('2027 entry');
log(`  verified 2027 (default view): ${await safeCount()}`);
log('    every visible card is verified: ' + !/Awaiting|Not verified/i.test(await page.locator('main').innerText()));
// awaiting-publication is the 2028 view — those records are never hidden.
await freshHome('2028 entry');
log(`  2028 (awaiting publication): ${await safeCount()}`);
log('    cards say the university has not published: ' + /not yet published|awaiting publication/i.test(await page.locator('main').innerText()));
// awaiting-data is opt-in.
await openSection('Data status');
const awaitToggle = page.getByRole('checkbox', { name: /Include courses awaiting research/i }).first();
if (await awaitToggle.count()) {
  await awaitToggle.click();
  await page.waitForTimeout(600);
  log(`  2028 including awaiting research: ${await safeCount()}`);
  log('    those cards read differently from the unpublished ones: ' + /awaiting research|not verified/i.test(await page.locator('main').innerText()));
} else {
  log('  awaiting-research toggle not found');
}
await page.screenshot({ path: 'shots/e02c-three-states.png' });

/* ------------------------------------------------------------------ */
log('\n5. IMPERIAL STUDY OPTIONS (brief Part 2)');
await goto('/course/imperial-aeronautical-engineering-meng--2027');
let t = await text();
log('  H401 page reachable: ' + /Aeronautic/i.test(t));
log('  Spacecraft route shown on the parent page: ' + /Spacecraft Engineering/i.test(t));
log('  routes card present: ' + /Routes within this application/i.test(t));
log('  stated as not a separate application: ' + /not separate UCAS applications/i.test(t));
await page.screenshot({ path: 'shots/e03-imperial-h401.png' });

await goto('/course/imperial-mechanical-engineering-meng--2027');
t = await text();
log('  H301 page reachable: ' + /Mechanical Engineering/i.test(t));
log('  Nuclear route shown on the parent page: ' + /Nuclear Engineering/i.test(t));

// The specialisms must not exist as their own courses, in any year, in search.
for (const q of ['Spacecraft', 'Mechanical Engineering with Nuclear']) {
  await goto('/');
  await page.getByLabel('Search courses').first().fill(q);
  await page.waitForTimeout(700);
  const body = await text();
  const hits = await page.locator('main a[href*="#/course/"]').count();
  log(`  search "${q}" → ${await safeCount()} (result links: ${hits})`);
  if (q === 'Spacecraft') {
    log('    no Spacecraft course card: ' + !/Aeronautics with Spacecraft Engineering\s*\n/i.test(body));
  }
}
// And they never became 2028 shells.
for (const id of [
  'imperial-aeronautics-with-spacecraft-engineering-meng--2028',
  'imperial-mechanical-engineering-with-nuclear-engineering-meng--2028',
]) {
  await goto(`/course/${id}`);
  log(`  ${id} does not exist: ` + /Course not found/i.test(await text()));
}
// The genuinely separate Nuclear course is still there.
await goto('/course/imperial-materials-nuclear-engineering-meng--2027');
t = await text();
log('  the real J5H8 Materials with Nuclear Engineering still exists: ' + (!/Course not found/i.test(t) && /J5H8/.test(t)));

/* ------------------------------------------------------------------ */
log('\n6. NEW COURSE PAGES — DURHAM');
await goto('/course/durham-physics-mphys--2027');
t = await text();
log('  F301 shown: ' + /F301/.test(t));
log('  A*A*A exact: ' + /A\*A\*A/.test(t) + ' (and not flattened to A*AA: ' + !/Typical offer: A\*AA\b/.test(t) + ')');
log('  Mathematics and Physics required: ' + (/Mathematics/.test(t) && /Physics/.test(t)));
log('  contextual A*AB kept separate: ' + /Contextual offer/i.test(t));
log('  interview stated: ' + /interview/i.test(t));
log('  verified badge: ' + /Verified/.test(t));
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A*');
await setRow(2, 'Chemistry', 'A');
await page.waitForTimeout(700);
log('  A*A*A with Maths+Physics → ' + (await verdict()));
await setRow(1, 'Physics', 'A');
await page.waitForTimeout(700);
log('  dropping Physics to A → ' + (await verdict()));
await page.screenshot({ path: 'shots/e04-durham-physics.png' });

log('\n7. NEW COURSE PAGES — WARWICK');
await goto('/course/warwick-mathematics-and-physics-bsc--2027');
t = await text();
log('  GF13 shown: ' + /GF13/.test(t));
log('  both published routes shown: ' + (/A\*AA/.test(t) && /A\*A\*A/.test(t)));
log('  Further Maths handled conditionally: ' + /Further Mathematics/i.test(t));
await goto('/course/warwick-computer-systems-engineering-meng--2027');
t = await text();
log('  Computer Systems Engineering is Maths-only, no Physics demand: ' + (/Mathematics/.test(t) && !/to include Mathematics and Physics/i.test(t)));

log('\n8. NEW COURSE PAGES — EDINBURGH (band offers)');
await goto('/course/edinburgh-physics-mphys--2027');
t = await text();
log('  band stored verbatim: ' + /from AAA to ABB/i.test(t));
log('  no invented single grade: ' + !/Typical offer: AAA\b/.test(t));
log('  widening-access threshold labelled, not sold as standard: ' + (/minimum entry requirement/i.test(t) || /widening access/i.test(t)));
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A*');
await setRow(2, 'Chemistry', 'A*');
await page.waitForTimeout(1200);
log('  profile entered: ' + (await profileState()));
log('  A*A*A* against a band → ' + (await verdict()));
log('    the band is quoted in the result, not scored: ' + /is not a plain A-Level grade profile/i.test(await text()));
await page.screenshot({ path: 'shots/e05-edinburgh-band.png' });

log('\n9. NEW COURSE PAGES — BRISTOL AND BATH');
await goto('/course/bristol-aerospace-engineering-beng--2027');
t = await text();
log('  Bristol Aerospace H405 shown: ' + /H405/.test(t));
log('  only Mathematics is required, others preferred: ' + /prefer/i.test(t));
await goto('/course/bristol-electrical-electronic-engineering-meng--2027');
t = await text();
log('  Bristol EEE MEng AAA with no asterisk: ' + (/AAA/.test(t) && !/A\*AA/.test(t)));
await goto('/course/bath-electrical-and-electronic-engineering-beng--2027');
t = await text();
log('  Bath EEE reachable: ' + !/Course not found/i.test(t));
log('  both published routes present (AAA and A*AB): ' + (/AAA/.test(t) && /A\*AB/.test(t)));
log('  no UCAS code invented: ' + !/UCAS code:\s*[A-Z]\d/.test(t));
log('  placement recorded as a route, not a course: ' + /Routes within this application/i.test(t));
await page.screenshot({ path: 'shots/e06-bath-eee.png' });

/* ------------------------------------------------------------------ */
log('\n10. 2028 SHELLS ARE CLEAN');
await goto('/course/durham-physics-mphys--2028');
await clearProfile();
for (const id of ['durham-physics-mphys--2028', 'edinburgh-physics-mphys--2028', 'bath-physics-bsc--2028']) {
  await goto(`/course/${id}`);
  t = await text();
  log(`  ${id}: not-yet-published notice ${/not yet published/i.test(t)}, no verified badge ${!/\bVerified\b/.test(t)}, no 2027 grades ${!/A\*A\*A|from AAA to ABB/.test(t)}, no routes card ${!/Routes within this application/i.test(t)}`);
}
await page.screenshot({ path: 'shots/e07-2028-shell.png' });

/* ------------------------------------------------------------------ */
log('\n11. SOUTHAMPTON STAYS AWAITING-DATA');
await goto('/course/southampton-physics--2028');
t = await text();
log('  reachable: ' + !/Course not found/i.test(t));
log('  says it is not verified by us: ' + /not verified|awaiting/i.test(t));
log('  carries no invented offer: ' + !/A\*A\*A|A\*AA|AAA/.test(t));

/* ------------------------------------------------------------------ */
log('\n12. UNIVERSITY PAGES');
for (const [slug, probe] of [
  ['durham', /Durham University/],
  ['warwick', /University of Warwick/],
  ['edinburgh', /University of Edinburgh/],
  ['bristol', /University of Bristol/],
  ['bath', /University of Bath/],
]) {
  await goto(`/university/${slug}`);
  t = await text();
  log(`  /${slug}: official name ${probe.test(t)}, courses listed ${/Physics|Engineering/.test(t)}`);
}

/* ------------------------------------------------------------------ */
log('\n13. COMPARISON AND SHORTLIST');
await goto('/course/durham-physics-mphys--2027');
await page.getByRole('button', { name: /Add to comparison/ }).first().click();
await page.waitForTimeout(300);
await goto('/course/edinburgh-physics-mphys--2027');
await page.getByRole('button', { name: /Add to comparison/ }).first().click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: /Save course/ }).first().click();
await page.waitForTimeout(300);
await goto('/compare');
t = await text();
log('  comparison holds both: ' + (/Durham/.test(t) && /Edinburgh/.test(t)));
log('  a band and an exact offer sit side by side without being normalised: ' + (/A\*A\*A/.test(t) && /AAA to ABB/i.test(t)));
await page.screenshot({ path: 'shots/e08-compare.png' });
await goto('/shortlist');
log('  shortlist holds the saved course: ' + /Edinburgh/.test(await text()));

/* ------------------------------------------------------------------ */
log('\n14. TEST FIXTURES STAY PRIVATE, NO DEMO DATA RETURNS');
const fixtureIds = [
  'fixture-manual-review-physics--2027',
  'fixture-unparsed-grades--2027',
  'fixture-conditional-subject--2027',
  'fixture-oneof-engineering--2027',
];
for (const id of fixtureIds) {
  await goto(`/course/${id}`);
  log(`  ${id} unreachable: ` + /Course not found/i.test(await text()));
}
await goto('/');
await page.getByLabel('Search courses').first().fill('fixture');
await page.waitForTimeout(600);
log('  search "fixture" → ' + (await safeCount()));
const homeBody = await text();
log('  no "demo"/"sample requirements" wording in the catalogue: ' + !/sample entry requirements|demo data/i.test(homeBody));

/* ------------------------------------------------------------------ */
log('\n15. ADMIN, VALIDATION, DUPLICATES');
await goto('/admin');
log('  records in table: ' + (await page.locator('table tbody tr').count()));
const tiles = await page.locator('.surface').allInnerTexts();
log('  tiles: ' + tiles.slice(0, 6).map((s) => s.replace(/\n/g, ' ')).join(' | ').slice(0, 260));
await page.getByRole('button', { name: /^Validation/ }).click();
await page.waitForTimeout(500);
log('  ' + (await page.locator('text=/Errors \\(\\d+\\)/').first().innerText()));
log('  ' + (await page.locator('text=/Warnings \\(\\d+\\)/').first().innerText()));
await page.getByRole('button', { name: /^Duplicates/ }).click();
await page.waitForTimeout(500);
log('  duplicates: ' + (await page.locator('text=/No duplicates or conflicts detected|Likely duplicate|Conflict/').first().innerText()));
await page.screenshot({ path: 'shots/e09-admin.png' });

/* ------------------------------------------------------------------ */
log('\n16. SEARCH RESPONSIVENESS ON THE LARGER CATALOGUE');
for (const q of ['physics', 'edinburgh mechanical engineering', 'aeronautical', 'A*A*A']) {
  await goto('/');
  const t0 = Date.now();
  await page.getByLabel('Search courses').first().fill(q);
  await page.waitForTimeout(500);
  log(`  "${q}" → ${await safeCount()}  [${Date.now() - t0 - 500}ms after debounce]`);
}
await page.screenshot({ path: 'shots/e10-search.png' });

log(`\nEntry-year totals seen in UI: 2027 = ${n2027}, 2028 = ${n2028}`);
log('Page errors: ' + (errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none'));
await browser.close();
