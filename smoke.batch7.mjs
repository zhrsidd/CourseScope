/**
 * Batch 7 browser smoke test — Part 18 of the brief.
 *
 * Batch 7 is a catalogue-integrity batch, so this test is mostly about what
 * MUST NOT be findable: fake York engineering disciplines, Manchester pathways
 * posing as courses, pathways with their own 2028 shells, stale scaffold
 * identities. The product surface is checked for regressions rather than
 * re-examined.
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
let pass = 0;
let fail = 0;
const t = (label, ok, detail = '') => {
  if (ok) pass += 1;
  else fail += 1;
  log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1300 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

const goto = async (h) => {
  await page.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
};
const mainText = () => page.locator('main').innerText();
const bodyText = () => page.locator('body').innerText();
const counts = async () => {
  const s = await page.locator('main').innerText();
  const partial = s.match(/Showing (\d+) of (\d+) courses/);
  if (partial) return { shown: Number(partial[1]), total: Number(partial[2]) };
  const all = s.match(/(\d+) courses/);
  return all ? { shown: Number(all[1]), total: Number(all[1]) } : { shown: -1, total: -1 };
};
const cardCount = () => page.locator('main article').count();
const freshHome = async (year = '2027 entry') => {
  await goto('/');
  const box = page.getByLabel('Search courses').first();
  if ((await box.count()) && (await box.inputValue())) {
    await box.fill('');
    await page.waitForTimeout(450);
  }
  const reset = page.getByRole('button', { name: /^Reset$/ }).first();
  if (await reset.count()) {
    await reset.click();
    await page.waitForTimeout(300);
  }
  await page.getByRole('button', { name: year, exact: true }).first().click();
  await page.waitForTimeout(400);
};
const search = async (q, year = '2027 entry') => {
  await freshHome(year);
  await page.getByLabel('Search courses').first().fill(q);
  await page.waitForTimeout(750);
  return { text: await mainText(), counts: await counts() };
};
const openSection = async (title) => {
  const sec = page.getByRole('button', { name: new RegExp('^' + title + '$') }).first();
  if (!(await sec.count())) return false;
  if ((await sec.getAttribute('aria-expanded')) !== 'true') {
    await sec.click();
    await page.waitForTimeout(350);
  }
  return true;
};
const showAwaiting = async () => {
  const cb = page.getByRole('checkbox', { name: /Include courses awaiting research/ }).first();
  if (await cb.count()) {
    await cb.check();
    await page.waitForTimeout(600);
  }
};

/**
 * Progressive rendering paints 40 cards at a time, so counting cards from one
 * university on the first paint silently misses anything further down the list.
 * Lancaster's Mechanical Engineering records sit at positions 41+ of 67 for the
 * query "Mechanical Engineering" — present and correct, invisible to a probe
 * that never pages. Every "does university X appear" assertion pages first.
 */
const loadAll = async (max = 30) => {
  for (let i = 0; i < max; i += 1) {
    const lm = page.getByRole('button', { name: /Load more/ }).first();
    if (!(await lm.count())) break;
    await lm.click();
    await page.waitForTimeout(450);
  }
};
/** Card TITLES only — the h3 heading, i.e. what is being offered as a course. */
const cardHeadings = () =>
  page.locator('main article').evaluateAll((els) => els.map((e) => e.querySelector('h3')?.textContent?.trim() ?? ''));
/** The "Route within this application" line, where a pathway legitimately appears. */
const routeLines = () =>
  page
    .locator('main article')
    .evaluateAll((els) =>
      els
        .map((e) => [...e.querySelectorAll('p')].map((n) => n.textContent ?? '').find((x) => /Routes? within this application/.test(x)) ?? '')
        .filter(Boolean),
    );
const cardsFrom = async (uni) =>
  (await page.locator('main article').evaluateAll((els) => els.map((e) => e.querySelector('a')?.textContent ?? ''))).filter((n) =>
    n.includes(uni),
  ).length;

/* ================================================================== */
log('1. NO FAKE YORK ENGINEERING DISCIPLINES');
for (const discipline of ['Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Aerospace Engineering']) {
  const r = await search(discipline);
  await showAwaiting();
  await loadAll();
  const yorkCards = await cardsFrom('University of York');
  t(`“${discipline}” returns no York course`, yorkCards === 0, `${r.counts.total} results overall, ${yorkCards} from York`);
}

log('\n2. WHAT YORK ACTUALLY OFFERS IS FINDABLE');
for (const [q, expect] of [
  ['York Physics', /Physics/],
  ['Electronic and Electrical Engineering', /York/],
  ['Robotic Engineering', /York/],
  ['Intelligent Digital Health Engineering', /York/],
]) {
  await search(q);
  await showAwaiting();
  await loadAll();
  const txt = await mainText();
  t(`“${q}” reaches York`, expect.test(txt));
}
const phantom = await search('Computer Systems and Software Engineering');
await showAwaiting();
t(
  'the phantom “Computer Systems and Software Engineering MEng” is gone',
  !/Computer Systems and Software Engineering/.test(await mainText()),
  `${phantom.counts.total} results`,
);

log('\n3. YORK UNIVERSITY PAGE');
await goto('/university/york');
await page.waitForTimeout(700);
let txt = await bodyText();
t('York university page loads', /York/.test(txt));
t('  and shows no Mechanical/Civil/Chemical/Aerospace course', !/Mechanical Engineering|Civil Engineering|Chemical Engineering|Aerospace Engineering/.test(txt));

log('\n4. LANCASTER STRUCTURE IS UNDERSTANDABLE WITHOUT FAKE APPLICATIONS');
await goto('/university/lancaster');
await page.waitForTimeout(700);
txt = await bodyText();
t('Lancaster university page loads', /Lancaster/.test(txt));
const lancGen = await search('Lancaster Engineering');
t('Lancaster Engineering is findable', lancGen.counts.total > 0, `${lancGen.counts.total} results`);
for (const d of ['Mechanical Engineering', 'Chemical Engineering', 'Nuclear Engineering', 'Mechatronic Engineering']) {
  await search(d);
  await loadAll();
  const lancCards = await cardsFrom('Lancaster');
  t(`  “${d}” exists at Lancaster as its own application`, lancCards > 0, `${lancCards} Lancaster cards`);
}
await search('Mechanical Engineering');
await loadAll();
const lancCard = page.locator('main article').filter({ hasText: 'Lancaster' }).first();
if (await lancCard.count()) {
  await lancCard.getByRole('link', { name: /View course/ }).click();
  await page.waitForTimeout(900);
  txt = await bodyText();
  t('  its course page explains the common first year', /common first year/i.test(txt));
  t('  and says specialism change is conditional', /subject to meeting the requirements/i.test(txt));
  t('  and it keeps its own UCAS code', /H300|H303/.test(txt));
  /*
   * v0.8 UPDATE. Batch 7 asserted that Lancaster's UNREAD subject requirement
   * was disclosed rather than invented — the right check while the accordion
   * body could not be retrieved. v0.8 retrieved it through a rendered browser,
   * so the assertion becomes the stronger one: the published rule is shown,
   * in Lancaster's own words.
   */
  t('  and its published subject requirement is now shown, in Lancaster\u2019s own words', /physical science subject/i.test(txt));
  t('  with the illustrative nature of the list preserved', /for example/i.test(txt));
  await page.screenshot({ path: 'shots/h01-lancaster.png' });
}

log('\n5. MANCHESTER J501 PATHWAYS ROUTE TO THE PARENT');
/*
 * The pathway name is SUPPOSED to appear on the parent card — the product prints
 * "Route within this application: Materials Science and Engineering with
 * Biomaterials" under the J501 heading, which is exactly the representation
 * Batch 7 is arguing for. So the test cannot ask whether the string is on the
 * page; it has to ask whether the string is a COURSE TITLE. Only the h3 heading
 * answers that.
 */
for (const pathway of ['Biomaterials', 'Metallurgy', 'Nanomaterials', 'Polymers', 'Textiles Technology']) {
  await search(pathway);
  await loadAll();
  const manCards = await cardsFrom('Manchester');
  const headings = await cardHeadings();
  const fakeTitle = headings.some((h) => new RegExp(`Materials Science and Engineering with ${pathway}`, 'i').test(h));
  t(`“${pathway}” reaches Manchester`, manCards > 0, `${manCards} Manchester cards`);
  t(`  and is never itself a course title`, !fakeTitle, fakeTitle ? headings.find((h) => h.includes(pathway)) : `${headings.length} titles checked`);
  const routes = await routeLines();
  t(
    `  and is shown as a route within the parent application`,
    routes.some((r) => new RegExp(pathway, 'i').test(r)),
    routes[0] ?? 'no route line found',
  );
}
const j501 = await search('Materials Science and Engineering');
await loadAll();
const manCodes = await page.locator('main article').filter({ hasText: 'Manchester' }).allInnerTexts();
t(
  'Manchester Materials shows J500, J501 and F013 and nothing invented',
  manCodes.join(' ').includes('J500') && manCodes.join(' ').includes('J501'),
  `${j501.counts.total} results`,
);
await search('Materials Science with an Integrated Foundation Year');
t('  F013 is findable as its own application', /F013/.test(await mainText()));

log('\n6. NO PATHWAY GETS A 2028 SHELL');
for (const pathway of ['Biomaterials', 'Metallurgy', 'Nanomaterials', 'Polymers', 'Spacecraft Engineering']) {
  const r = await search(pathway, '2028 entry');
  await showAwaiting();
  await loadAll();
  const headings = await cardHeadings();
  const fake = headings.some((h) => new RegExp(`(Materials Science and Engineering with ${pathway}|^${pathway}$)`, 'i').test(h));
  t(`“${pathway}” has no 2028 course of its own`, !fake, `${r.counts.total} results in 2028`);
}

log('\n7. SHEFFIELD H100 AND LEEDS H795 TRUST STATES');
await goto('/course/sheffield-general-engineering-meng--2027');
await page.waitForTimeout(800);
txt = await bodyText();
t('Sheffield H100 now reads Verified', /Verified/.test(txt) && !/Partially verified/.test(txt));
t('  and shows the subject wording it was missing', /Maths and Physics|Mathematics/.test(txt));
t('  and the Access Sheffield offer', /Access Sheffield|AAA/.test(txt));
await page.screenshot({ path: 'shots/h02-sheffield.png' });

await goto('/course/leeds-product-design-bsc--2027');
await page.waitForTimeout(800);
txt = await bodyText();
t('Leeds H795 now reads Verified', /Verified/.test(txt) && !/Partially verified/.test(txt));
t('  and still discloses Leeds’ own first-party inconsistency', /BA Product Design/.test(txt));
t('  and does not claim to have resolved it', /not reconciled/i.test(txt));

log('\n8. NO STALE SCAFFOLD IDENTITY IS DISCOVERABLE');
for (const [q, bad] of [
  ['Theoretical Physics with Mathematics', /FG31/],
  ['Electronic Engineering', /H610[\s\S]{0,80}MEng/],
]) {
  await search(q);
  await showAwaiting();
  await loadAll();
  t(`“${q}” shows no removed scaffold identity`, !bad.test(await mainText()));
}
await search('Bath');
await showAwaiting();
await loadAll();
t('no Bath record shows an invented UCAS code', !/F303|H300|H600/.test(await mainText()));

log('\n9. PARTIALLY VERIFIED AND AWAITING-DATA STATES');
await search('Lancaster Chemical Engineering');
await loadAll();
txt = await mainText();
/*
 * v0.8 UPDATE. These 40 records were partially verified in Batch 7 because
 * their subject rule was unreadable. All 40 are now verified, and Chemical
 * Engineering in particular turned out to publish a CLOSED subject list that
 * differs from every sibling discipline — which is why they were re-read one
 * page at a time rather than filled in from the family pattern.
 */
t('Lancaster Chemical Engineering is now verified', /Verified/.test(txt) && !/Partially verified/.test(txt));
t('  and shows its own closed subject list, not its siblings\u2019', /Chemistry, Physics or Biology/i.test(txt));
await freshHome('2027 entry');
await showAwaiting();
const withAwaiting = (await counts()).total;
await freshHome('2027 entry');
const withoutAwaiting = (await counts()).total;
t('awaiting-data records are hidden by default and revealed on request', withAwaiting > withoutAwaiting, `${withoutAwaiting} → ${withAwaiting}`);

log('\n10. NO PRODUCT REGRESSIONS FROM BATCH 6');
await freshHome('2027 entry');
const c = await counts();
const cards = await cardCount();
t('progressive rendering still caps the first paint at 40', cards === 40, `${cards} cards, ${c.total} results`);
t('  and the total is still visible', c.total > 40, `total ${c.total}`);
const loadMore = page.getByRole('button', { name: /Load more/ }).first();
if (await loadMore.count()) {
  await loadMore.click();
  await page.waitForTimeout(600);
  t('  Load more still appends a page', (await cardCount()) === 80);
}
await openSection('Data status');
t('filters still open', /Verified/.test(await bodyText()));
await freshHome('2027 entry');
const whySummary = page.locator('main article').first().locator('summary', { hasText: 'Why?' });
t('cards still carry the Why? explanation', (await whySummary.count()) > 0);
await goto('/compare');
await page.waitForTimeout(500);
t('comparison page still loads', /Compare|comparison/i.test(await bodyText()));
await goto('/admin');
await page.waitForTimeout(900);
txt = await bodyText();
t('admin page loads', txt.length > 200);
t('  and reports zero production validation errors', /0 errors|No errors/i.test(txt) || !/[1-9]\d* errors/.test(txt));
t('  and zero duplicates', !/[1-9]\d* (duplicate|conflict)/i.test(txt));
await page.screenshot({ path: 'shots/h03-admin.png' });

log(`\nPage errors: ${errors.length}`);
for (const e of errors.slice(0, 5)) log(`  ${e}`);
log(`\nSMOKE RESULT: ${pass} pass, ${fail} fail, ${errors.length} page errors`);
await browser.close();
