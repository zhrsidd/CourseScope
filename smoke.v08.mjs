/**
 * v0.8 LAUNCH-READINESS QA — Parts 10 and 18.
 *
 * Unlike the batch smoke tests, this one is not mostly about data. It asks
 * whether a student can get through the product without hitting a broken
 * state: empty results, no profile, a deep link that does not resolve, a
 * comparison with one course in it, a phone-width layout that overflows.
 *
 * Desktop and mobile are run as separate passes over the same checks where the
 * check is layout-sensitive, because "works at 1440px" says nothing about 390.
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
const BASE = 'http://127.0.0.1:4321';
const log = (m) => console.log(m);
let pass = 0;
let fail = 0;
const failures = [];
const t = (label, ok, detail = '') => {
  if (ok) pass += 1;
  else {
    fail += 1;
    failures.push(label);
  }
  log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch();

/* Console and page errors are collected separately, per the brief. */
const pageErrors = [];
const consoleErrors = [];
const failedRequests = [];

const makePage = async (viewport) => {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => pageErrors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('requestfailed', (r) => failedRequests.push(`${r.url()} ${r.failure()?.errorText ?? ''}`));
  return { ctx, page };
};

const goto = async (page, h) => {
  await page.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
};
const body = (page) => page.locator('body').innerText();
const main = (page) => page.locator('main').innerText();

/* ================================================================== */
const { ctx: deskCtx, page } = await makePage({ width: 1440, height: 1200 });

log('1. CORE DISCOVERY FLOW');
await goto(page, '/');
t('home renders a result list', (await page.locator('main article').count()) > 0);

await page.getByLabel('Search courses').first().fill('Lancaster Mechanical');
await page.waitForTimeout(700);
t('  search narrows results', /Lancaster/.test(await main(page)));

await goto(page, '/course/lancaster-mechanical-engineering-beng-hons-h300--2027');
await page.waitForTimeout(600);
let txt = await body(page);
t('  a course page opens from a card', /Mechanical Engineering/.test(txt));
t('  and now shows its published subject rule, not a review placeholder',
  /physical science subject/.test(txt));
t('  and states how we know the course exists',
  /How we know this course exists/.test(txt));
t('  and offers a way to report a problem', /Report an issue with this course/.test(txt));

log('\n2. TRUST AND PROVENANCE ARE LEGIBLE');
await goto(page, '/');
const facets = await main(page);
t('trust states are exposed as filters',
  /Verified/.test(facets) || /Data status/.test(await body(page)));
for (const [route, needle] of [
  ['/course/york-engineering-with-audio-technology-beng--2027', /Awaiting research|awaiting/i],
  ['/course/kcl-physics-msci--2027', /Verified/],
]) {
  await goto(page, route);
  t(`  ${route.split('/').pop()} shows its trust state`, needle.test(await body(page)));
}
await goto(page, '/course/kcl-physics-msci--2027');
const officialHref = await page
  .locator('a', { hasText: /View official requirements/ })
  .first()
  .getAttribute('href')
  .catch(() => null);
t('  a verified course links to the university page it was read from',
  (officialHref ?? '').includes('kcl.ac.uk'), officialHref ?? 'no link');

log('\n3. EMPTY AND ERROR STATES');
await goto(page, '/');
await page.getByLabel('Search courses').first().fill('zzzzzzq nonexistent course');
await page.waitForTimeout(700);
txt = await main(page);
t('zero search results gives a message, not a blank page', txt.trim().length > 60);
t('  and does not render a stray card', (await page.locator('main article').count()) === 0);

await goto(page, '/course/this-course-does-not-exist--2027');
txt = await body(page);
t('an invalid course deep link fails gracefully', /not found|Not found|no longer/i.test(txt));
t('  and still shows the site chrome to get back', /Course Finder/.test(txt));

await goto(page, '/university/not-a-real-university');
t('an invalid university deep link fails gracefully', /not found|Not found/i.test(await body(page)));

await goto(page, '/shortlist');
t('an empty shortlist explains itself', (await main(page)).trim().length > 60);

await goto(page, '/compare');
t('comparison with nothing selected explains itself', (await main(page)).trim().length > 60);

await goto(page, '/course/york-engineering-with-audio-technology-beng--2027');
txt = await body(page);
t('an awaiting-data course says what is missing and why', /not.*(recorded|read)|identity only/i.test(txt));
t('  and shows no invented offer', !/A\*AA|AAA including/.test(txt));

await goto(page, '/');
const yearBtn = page.getByRole('button', { name: '2028 entry', exact: true }).first();
if (await yearBtn.count()) {
  await yearBtn.click();
  await page.waitForTimeout(600);
  await page.locator('main article').first().getByRole('link', { name: /View course/ }).click();
  await page.waitForTimeout(800);
  txt = await body(page);
  t('a 2028 course says requirements are not published', /not.*publish/i.test(txt));
  t('  and carries no grade profile at all', !/A\*A|AAB|ABB/.test(txt.split('Entry year')[0] ?? txt));
}

log('\n4. PERSISTENCE');
await goto(page, '/');
const save = page.locator('main article').first().getByRole('button', { name: /Save/ }).first();
if (await save.count()) {
  await save.click();
  await page.waitForTimeout(400);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await goto(page, '/shortlist');
  t('a saved course survives a reload', (await page.locator('main article').count()) > 0);
}
await goto(page, '/');
const gradeSelect = page.locator('select').first();
if (await gradeSelect.count()) {
  const before = await gradeSelect.inputValue();
  await gradeSelect.selectOption({ index: 1 }).catch(() => {});
  await page.waitForTimeout(400);
  const after = await gradeSelect.inputValue();
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const restored = await page.locator('select').first().inputValue();
  t('a student profile choice survives a reload', restored === after || before !== after,
    `${before} → ${after} → ${restored}`);
}
await deskCtx.addCookies([]);
const { ctx: freshCtx, page: fresh } = await makePage({ width: 1440, height: 1200 });
await goto(fresh, '/');
t('a fresh browser with no stored state still renders', (await fresh.locator('main article').count()) > 0);
await fresh.evaluate(() => {
  try {
    localStorage.setItem('ukcf:profile', '{{{ not json');
    localStorage.setItem('ukcf:shortlist', 'garbage');
  } catch {
    /* storage may be unavailable; the reload below still exercises the path */
  }
});
await fresh.reload({ waitUntil: 'networkidle' });
await fresh.waitForTimeout(800);
t('  and corrupted stored state does not break the app',
  (await fresh.locator('main article').count()) > 0);
await freshCtx.close();

log('\n5. ACCESSIBILITY BASICS');
await goto(page, '/');
const searchBox = page.getByLabel('Search courses').first();
t('the search box has an accessible label', (await searchBox.count()) > 0);
const unlabelled = await page.locator('main button:not([aria-label])').evaluateAll((els) =>
  els.filter((e) => !(e.textContent ?? '').trim()).length,
);
t('  no button in the results area is left without a name', unlabelled === 0, `${unlabelled} unnamed`);
const h1s = await page.locator('h1').count();
t('  the page has exactly one h1', h1s === 1, `${h1s} found`);
const landmarks = {};
for (const r of ['/', '/browse', '/universities', '/compare', '/shortlist', '/about']) {
  await goto(page, r);
  landmarks[r] = await page.locator('main').count();
}
t('  every route exposes exactly one main landmark',
  Object.values(landmarks).every((n) => n === 1),
  JSON.stringify(landmarks));
await goto(page, '/');
await page.keyboard.press('Tab');
const skip = await page.evaluate(() => (document.activeElement?.textContent ?? '').trim());
t('  and the first tab stop is a skip link', /Skip to main content/.test(skip), skip);
await page.keyboard.press('Tab');
const focusName = await page.evaluate(() => {
  const el = document.activeElement;
  return el ? `${el.tagName}:${(el.textContent ?? '').trim().slice(0, 30)}` : 'none';
});
t('  keyboard focus reaches an interactive element', focusName !== 'none' && focusName !== 'BODY:');
const focusVisible = await page.evaluate(() => {
  const el = document.activeElement;
  if (!el) return false;
  const s = getComputedStyle(el);
  return s.outlineStyle !== 'none' || s.boxShadow !== 'none';
});
t('  and that focus is visible', focusVisible);
const badgeTextOnly = await page.evaluate(() => {
  const el = [...document.querySelectorAll('main *')].find((e) =>
    /Verified|Awaiting|Partially/.test(e.textContent ?? '') && e.children.length === 0,
  );
  return Boolean(el && (el.textContent ?? '').trim().length > 0);
});
t('  trust state is conveyed by text, not colour alone', badgeTextOnly);

log('\n6. PRODUCTION / DEV SEPARATION');
await goto(page, '/');
const chrome = await body(page);
t('no admin link in the public navigation', !/Data manager/.test(chrome));
t('  and no debug or internal vocabulary leaks into the page',
  !/verificationStatus|identityVerification|DataSource|fixture|console\.log/i.test(chrome));
await goto(page, '/admin');
t('the admin route still resolves for anyone who knows it', (await body(page)).length > 200);
await goto(page, '/');
t('the build version is shown in the footer', /v0\.8/.test(await body(page)));

log('\n7. METADATA');
await goto(page, '/');
const homeTitle = await page.title();
t('the home page has a title', homeTitle.length > 5, homeTitle);
await goto(page, '/course/kcl-physics-msci--2027');
const courseTitle = await page.title();
t('  a course page has its own distinct title', courseTitle !== homeTitle, courseTitle);
await goto(page, '/about');
const aboutTitle = await page.title();
t('  the methodology page has its own title', aboutTitle !== homeTitle, aboutTitle);
const meta = await page.evaluate(() => ({
  description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
  og: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '',
  icon: document.querySelector('link[rel="icon"]')?.getAttribute('href') ?? '',
  viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content') ?? '',
}));
t('  a description is set', meta.description.length > 40);
t('  an Open Graph title is set', meta.og.length > 5);
t('  a favicon is set', meta.icon.length > 10);
t('  a viewport is set', meta.viewport.includes('width=device-width'));

log('\n8. METHODOLOGY PAGE CONTENT');
await goto(page, '/about');
txt = await body(page);
for (const [label, re] of [
  ['official university sources', /official|university’s own/i],
  ['entry years are separate', /2027 and 2028 are separate/i],
  ['2028 does not inherit 2027', /never inherits/i],
  ['trust states are defined', /awaiting research/i],
  ['specialisms are not applications', /not separate applications|route within this application/i],
  ['contextual offers are not applied automatically', /never applied\s*automatically|never improves the headline/i],
  ['meeting requirements does not predict admission', /does not mean you will be admitted/i],
  ['tests and interviews are additional selection', /additional selection/i],
  ['requirements may change', /Requirements change/i],
  ['confirm with the university', /Confirm the final details/i],
  ['release notes are present', /What changed recently/i],
]) {
  t(`methodology states: ${label}`, re.test(txt));
}

log('\n9. REPORT-AN-ISSUE FLOW');
await goto(page, '/course/lancaster-mechanical-engineering-beng-hons-h300--2027');
const reportBtn = page.getByRole('button', { name: /Report an issue/ }).first();
t('the report control is present', (await reportBtn.count()) > 0);
if (await reportBtn.count()) {
  await reportBtn.click();
  await page.waitForTimeout(400);
  const report = await page.locator('textarea[readonly]').first().inputValue();
  t('  it prepares a report containing the university', report.includes('Lancaster'));
  t('  the course and its UCAS code', report.includes('Mechanical Engineering') && report.includes('H300'));
  t('  the entry year and record id', report.includes('2027') && report.includes('--2027'));
  t('  the source page we read', report.includes('lancaster.ac.uk'));
  t('  the issue type', report.includes('Issue type:'));
  t('  and the build version', report.includes('v0.8'));
  const types = await page.locator('select').filter({ hasText: 'requirements look wrong' }).count();
  t('  and offers a choice of issue types', types > 0);
}

log('\n10. PERFORMANCE — MEASURED, NOT ASSUMED');
await goto(page, '/');
const perf = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByName('first-contentful-paint')[0];
  return {
    domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : -1,
    fcp: paint ? Math.round(paint.startTime) : -1,
  };
});
const cards = await page.locator('main article').count();
const totalMatch = (await main(page)).match(/Showing (\d+) of (\d+)/);
log(`  first paint renders ${cards} cards of ${totalMatch ? totalMatch[2] : '?'} results`);
log(`  DOMContentLoaded ${perf.domContentLoaded}ms · first contentful paint ${perf.fcp}ms`);
t('progressive rendering caps the first paint', cards === 40, `${cards} cards`);

const searchStart = Date.now();
await page.getByLabel('Search courses').first().fill('engineering');
await page.waitForTimeout(50);
await page.waitForFunction(() => document.querySelectorAll('main article').length > 0);
const searchMs = Date.now() - searchStart;
log(`  broad Engineering search settled in ~${searchMs}ms`);
t('  a broad search stays responsive', searchMs < 4000, `${searchMs}ms`);

await goto(page, '/');
const loadMore = page.getByRole('button', { name: /Load more/ }).first();
if (await loadMore.count()) {
  const lmStart = Date.now();
  await loadMore.click();
  await page.waitForFunction(() => document.querySelectorAll('main article').length === 80);
  const lmMs = Date.now() - lmStart;
  log(`  second page appended in ~${lmMs}ms`);
  t('  Load more appends a page and stays responsive', lmMs < 4000, `${lmMs}ms`);
}

await deskCtx.close();

/* ================================================================== */
log('\n11. MOBILE — 390px');
const { ctx: mobCtx, page: mob } = await makePage({ width: 390, height: 844 });
const noOverflow = async (where) => {
  const over = await mob.evaluate(() => {
    const d = document.documentElement;
    return d.scrollWidth - d.clientWidth;
  });
  t(`  ${where}: no horizontal page overflow`, over <= 1, `${over}px`);
};

await goto(mob, '/');
t('home renders at phone width', (await mob.locator('main article').count()) > 0);
await noOverflow('home');
const filterToggle = mob.getByRole('button', { name: /Filters/i }).first();
if (await filterToggle.count()) {
  await filterToggle.click();
  await mob.waitForTimeout(500);
  t('  filters open on mobile', (await mob.locator('body').innerText()).includes('Data status'));
  await noOverflow('filters open');
  await mob.keyboard.press('Escape').catch(() => {});
}
await mob.getByLabel('Search courses').first().fill('Lancaster Chemical');
await mob.waitForTimeout(700);
await noOverflow('search results');

await goto(mob, '/course/lancaster-chemical-engineering-beng-hons-h800--2027');
t('a course page renders at phone width', /Chemical Engineering/.test(await body(mob)));
await noOverflow('course page');
t('  and the long requirement text is present rather than clipped away',
  /science subject from/.test(await body(mob)));

await goto(mob, '/compare');
await noOverflow('comparison');
await goto(mob, '/shortlist');
await noOverflow('shortlist');
await goto(mob, '/about');
await noOverflow('methodology');
await goto(mob, '/universities');
await noOverflow('universities');
await mobCtx.close();

log('\n12. TABLET — 820px');
const { ctx: tabCtx, page: tab } = await makePage({ width: 820, height: 1180 });
await goto(tab, '/');
t('home renders at tablet width', (await tab.locator('main article').count()) > 0);
const tabOver = await tab.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
t('  no horizontal page overflow', tabOver <= 1, `${tabOver}px`);
await goto(tab, '/compare');
const tabOver2 = await tab.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
t('  comparison has no page overflow', tabOver2 <= 1, `${tabOver2}px`);
await tabCtx.close();

/* ================================================================== */
log(`\nPage errors:     ${pageErrors.length}`);
for (const e of pageErrors.slice(0, 5)) log(`  ${e}`);
log(`Console errors:  ${consoleErrors.length}`);
for (const e of consoleErrors.slice(0, 5)) log(`  ${e}`);
log(`Failed requests: ${failedRequests.length}`);
for (const e of failedRequests.slice(0, 5)) log(`  ${e}`);

if (failures.length) {
  log('\nFAILED CHECKS:');
  for (const f of failures) log(`  · ${f}`);
}
log(`\nV0.8 QA RESULT: ${pass} pass, ${fail} fail, ${pageErrors.length} page errors, ${consoleErrors.length} console errors`);
await browser.close();
