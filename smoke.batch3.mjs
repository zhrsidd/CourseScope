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
const count = () => page.locator('main >> text=/^\\d+ courses?$/').first().innerText();
const timed = async (label, fn) => {
  const t0 = Date.now();
  const out = await fn();
  log(`  ${label}: ${out}  [${Date.now() - t0}ms]`);
};

const setRow = async (i, subject, grade) => {
  await page.locator('input[list="a-level-subjects"]').nth(i).fill(subject);
  await page.locator('div[role="group"]').nth(i).getByRole('button', { name: grade, exact: true }).click();
  await page.waitForTimeout(120);
};
const verdict = () =>
  page
    .locator('text=/Meets published academic requirements|Does not currently meet requirements|Review required|Insufficient information/')
    .first()
    .innerText();

/* 1. Home page + filter speed */
log('1. HOME AND FILTERS');
await goto('/');
await timed('default (2028)', count);
await page.getByRole('button', { name: '2027 entry', exact: true }).first().click();
await page.waitForTimeout(400);
await timed('2027 entry', count);

// Each filter is applied from a clean page load so one test cannot leave a
// filter set for the next.
const applyFilter = async (name) => {
  await goto('/');
  // Filters persist between visits, so clear them before measuring one.
  const reset = page.getByRole('button', { name: /^Reset$/ }).first();
  if (await reset.count()) { await reset.click(); await page.waitForTimeout(300); }
  await page.getByRole('button', { name: '2027 entry', exact: true }).first().click();
  await page.waitForTimeout(350);
  // The subject checkboxes are labelled "Physics 55" / "Engineering 72", so the
  // accessible name is a prefix match, not an exact one.
  const el = page.getByRole('checkbox', { name: new RegExp('^' + name) }).first();
  if (await el.count()) { await el.click(); await page.waitForTimeout(400); return true; }
  return false;
};
const safeCount = async () => {
  const loc = page.locator('main >> text=/^\\d+ courses?$/').first();
  try { return await loc.innerText({ timeout: 4000 }); } catch { return 'no result count shown'; }
};
log('  Physics filter applied: ' + (await applyFilter('Physics')));
await timed('after Physics filter', safeCount);
log('  Engineering filter applied: ' + (await applyFilter('Engineering')));
await timed('after Engineering filter', safeCount);
// Filter by university through the sidebar checkbox specifically: the course
// cards also print the university name, so a plain text match hits a card.
const applyUniversityFilter = async () => {
  await goto('/');
  const reset = page.getByRole('button', { name: /^Reset$/ }).first();
  if (await reset.count()) { await reset.click(); await page.waitForTimeout(300); }
  await page.getByRole('button', { name: '2027 entry', exact: true }).first().click();
  await page.waitForTimeout(350);
  // The University section is a collapsed accordion, and its search box only
  // exists once it is opened.
  const section = page.getByRole('button', { name: /^University$/ }).first();
  if (await section.count()) { await section.click(); await page.waitForTimeout(300); }
  const box = page.getByPlaceholder('Find a university').first();
  if (await box.count()) {
    await box.fill('Manchester');
    await page.waitForTimeout(300);
  }
  const cb = page.getByRole('checkbox', { name: /Manchester/ }).first();
  if (!(await cb.count())) return false;
  await cb.click();
  await page.waitForTimeout(400);
  return true;
};
log('  Manchester filter applied: ' + (await applyUniversityFilter()));
await timed('after Manchester filter', safeCount);
await page.screenshot({ path: 'shots/d01-home-filters.png' });
await goto('/');

/* 2. Verification filter + no sample data offered */
log('\n2. VERIFICATION AND SAMPLE DATA');
const body = await text();
log('  "sample" wording present on page: ' + /sample/i.test(body));
log('  banner no longer claims sample requirements: ' + !/placeholder entry requirements/i.test(body));
log('  banner explains unresearched courses: ' + /not researched yet|awaiting verified data/i.test(body));
log('  data-status filter present: ' + /Data status/i.test(body));
log('  awaiting-verification wording: ' + /awaiting/i.test(body));

/* 3. Manchester Physics detail — new record, verified badge, no test claimed */
log('\n3. COURSE DETAIL (Manchester Physics BSc)');
await goto('/course/manchester-physics-bsc--2027');
let t = await text();
log('  A*A*A shown: ' + /A\*A\*A/.test(t));
log('  Manchester rule quoted: ' + /A\* in Physics and A\* in Mathematics or Further Mathematics/.test(t));
log('  verified badge: ' + /Verified/.test(t));
log('  no invented test: ' + !/ESAT|TARA|\bPAT\b/.test(t));
log('  test absence explained in the record: ' + /No named admissions test is published for this course/i.test(t));
log('  contextual + refugee offers stored: ' + (/Contextual offer: /.test(t) && /refugee or care-experienced/.test(t)));
log('  contextual separation note: ' + /never matches you to a contextual offer/i.test(t));
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Further Mathematics', 'A*');
await setRow(2, 'Physics', 'A');
await page.waitForTimeout(700);
log('  A*A*A with Physics at A → ' + (await verdict()));
await page.locator('div[role="group"]').nth(2).getByRole('button', { name: 'A*', exact: true }).click();
await page.waitForTimeout(700);
log('  after raising Physics to A* → ' + (await verdict()));
await page.screenshot({ path: 'shots/d02-manchester-physics.png' });

/* 4. Imperial Materials — explicit "no test" must read differently from "not stated" */
log('\n4. NO-TEST COURSES');
await goto('/course/imperial-materials-science-engineering-beng--2027');
t = await text();
log('  Imperial Materials: no ESAT claimed: ' + !/ESAT/.test(t));
log('  explicit department statement: ' + /does not use a test as part of its selection process/i.test(t));
log('  AAA minimum, A*AA typical shown separately: ' + (/AAA/.test(t) && /Typical offer: A\*AA/.test(t)));

/* 5. Imperial Design Engineering — two ESAT modules only */
await goto('/course/imperial-design-engineering-meng--2027');
t = await text();
log('  Design Engineering two modules: ' + (/Mathematics 1/.test(t) && /Mathematics 2/.test(t)));
log('  and no Physics module claimed: ' + !/you will need to sit three/.test(t));

/* 6. 2027 vs 2028 must be visually distinguishable */
log('\n5. 2027 VERSUS 2028');
await goto('/course/manchester-physics-bsc--2028');
t = await text();
log('  2028 shell notice: ' + /not yet published/i.test(t));
log('  links to the 2027 record: ' + /Latest available requirements: 2027 entry/i.test(t));
log('  no blank offer box: ' + /Not yet published for this entry year/.test(t));
log('  no verified badge on the shell: ' + !/\bVerified\b/.test(t));
await page.screenshot({ path: 'shots/d03-2028-shell.png' });

/* 7. University detail */
log('\n6. UNIVERSITY DETAIL');
await goto('/university/manchester');
t = await text();
log('  official name used: ' + /The University of Manchester/.test(t));
log('  courses listed: ' + /Physics/.test(t));

/* 8. Comparison + shortlist */
log('\n7. COMPARISON AND SHORTLIST');
await goto('/course/manchester-physics-bsc--2027');
await page.getByRole('button', { name: /Add to comparison/ }).first().click();
await page.waitForTimeout(300);
await goto('/course/imperial-materials-science-engineering-beng--2027');
await page.getByRole('button', { name: /Add to comparison/ }).first().click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: /Save course/ }).first().click();
await page.waitForTimeout(300);
await goto('/compare');
t = await text();
log('  comparison holds both: ' + (/Physics/.test(t) && /Materials/.test(t)));
await page.screenshot({ path: 'shots/d04-compare.png' });
await goto('/shortlist');
log('  shortlist holds the saved course: ' + /Materials/.test(await text()));

/* 9. Fixtures must never be reachable */
log('\n8. TEST FIXTURES ARE NOT PUBLIC');
for (const id of ['bristol-physics--2028', 'durham-theoretical-physics--2028', 'warwick-physics--2028', 'manchester-physics--2028']) {
  await goto(`/course/${id}`);
  const ok = /Course not found/i.test(await text());
  log(`  ${id} unreachable: ${ok}`);
}

/* 10. Admin */
log('\n9. ADMIN');
await goto('/admin');
log('  records: ' + (await page.locator('table tbody tr').count()));
const stats = await page.locator('.surface').allInnerTexts();
log('  tiles: ' + stats.slice(0, 6).map((s) => s.replace(/\n/g, ' ')).join(' | ').slice(0, 220));
await page.getByRole('button', { name: /^Validation/ }).click();
await page.waitForTimeout(400);
log('  ' + (await page.locator('text=/Errors \\(\\d+\\)/').first().innerText()));
await page.getByRole('button', { name: /^Duplicates/ }).click();
await page.waitForTimeout(400);
log('  duplicates: ' + (await page.locator('text=/No duplicates or conflicts detected|Likely duplicate|Conflict/').first().innerText()));
await page.screenshot({ path: 'shots/d05-admin.png' });

/* 11. Search speed on the larger catalogue */
log('\n10. SEARCH');
await goto('/');
const t0 = Date.now();
await page.getByLabel('Search courses').first().fill('manchester aerospace engineering');
await page.waitForTimeout(600);
log('  query results: ' + (await count()) + `  [${Date.now() - t0}ms]`);
await page.screenshot({ path: 'shots/d06-search.png' });

log('\nPage errors: ' + (errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none'));
await browser.close();
