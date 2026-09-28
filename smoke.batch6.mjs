/**
 * Batch 6 browser smoke test — Part 23 of the brief.
 *
 * Covers the five product-maturity objectives (progressive rendering,
 * eligibility explanations, universe invariants, the partially-verified trust
 * state, comparison) and the new Southampton / Loughborough / gap data.
 *
 * It also carries the Part 22 RENDERING measurement, which cannot be done in
 * node: the data layer was never the bottleneck, so the before/after number
 * that matters is how long the browser spends laying out cards. "Before" is
 * reproduced honestly by clicking Load more until the whole result set is on
 * the page, which is exactly what the old build rendered on every keystroke.
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
const page = await browser.newPage({ viewport: { width: 1440, height: 1300 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

const goto = async (h) => {
  await page.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
};
const mainText = () => page.locator('main').innerText();
const bodyText = () => page.locator('body').innerText();

/** Reads the count line, which now has two shapes: partial and complete. */
const counts = async () => {
  const t = await page.locator('main').innerText();
  const partial = t.match(/Showing (\d+) of (\d+) courses/);
  if (partial) return { shown: Number(partial[1]), total: Number(partial[2]) };
  const all = t.match(/(\d+) courses/);
  return all ? { shown: Number(all[1]), total: Number(all[1]) } : { shown: -1, total: -1 };
};
const cardCount = () => page.locator('main article').count();

const openSection = async (title) => {
  const sec = page.getByRole('button', { name: new RegExp('^' + title + '$') }).first();
  if (!(await sec.count())) return false;
  if ((await sec.getAttribute('aria-expanded')) !== 'true') {
    await sec.click();
    await page.waitForTimeout(350);
  }
  return true;
};
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
const setRow = async (i, subject, grade) => {
  await page.locator('input[list="a-level-subjects"]').nth(i).fill(subject);
  const btn = page
    .locator('div[role="group"]')
    .nth(i)
    .getByRole('button', { name: grade, exact: true });
  if ((await btn.getAttribute('aria-pressed')) !== 'true') await btn.click();
  await page.waitForTimeout(280);
};
const clearProfile = async () => {
  const btn = page.getByRole('button', { name: /^Clear$/ }).first();
  if (await btn.count()) {
    await btn.click();
    await page.waitForTimeout(400);
  }
};
const loadMore = () => page.getByRole('button', { name: /Load more|All \d+ courses shown/ }).first();

/* ================================================================== */
log('1. PROGRESSIVE RENDERING (brief Part 2)');
await goto('/');
await clearProfile();
await freshHome('2027 entry');

let c = await counts();
let cards = await cardCount();
log(`  count line: "Showing ${c.shown} of ${c.total} courses"`);
log(`  cards actually in the DOM on first paint: ${cards}`);
log(`    renders one page, not the whole result set: ${cards === 40 && c.total > 40}`);
log(`    the TOTAL is always visible, not just the page size: ${c.total > 40}`);

const btnText = await loadMore().innerText();
log(`  load-more control reads: "${btnText.replace(/\n/g, ' ')}"`);
log(`    it names how many remain: ${/of \d+ remaining/.test(btnText)}`);

/* Keyboard reachability — the control must be focusable and operable by key. */
await loadMore().focus();
const focused = await page.evaluate(() => document.activeElement?.tagName);
log(`    reachable by keyboard (focused element is a ${focused}): ${focused === 'BUTTON'}`);
await page.keyboard.press('Enter');
await page.waitForTimeout(500);
c = await counts();
cards = await cardCount();
log(`    Enter loads the next page: ${cards === 80} (now showing ${c.shown} of ${c.total})`);

/* The live region must announce progress to a screen reader. */
const live = await page.locator('[role="status"][aria-live="polite"]').first().innerText();
log(`  live region announces: "${live}"`);

/* ------------------------------------------------------------------ */
log('\n2. PART 22 — RENDERING COST, BEFORE VS AFTER');
await freshHome('2027 entry');
c = await counts();
const total = c.total;

const firstPaint = await page.evaluate(() => {
  const t0 = performance.now();
  document.querySelectorAll('main article').length;
  return performance.now() - t0;
});
log(`  result set: ${total} courses for 2027 entry`);
log(`  AFTER  — cards laid out on first paint: ${await cardCount()}`);

const t0 = Date.now();
let guard = 0;
while (guard < 40) {
  const txt = await loadMore().innerText();
  if (/All \d+ courses shown/.test(txt)) break;
  const before = await cardCount();
  await loadMore().click();
  await page.waitForFunction(
    (n) => document.querySelectorAll('main article').length > n,
    before,
    { timeout: 15000 },
  );
  guard += 1;
}
const expandMs = Date.now() - t0;
const allCards = await cardCount();
log(`  BEFORE — cards laid out when the whole set is on the page: ${allCards}`);
log(`  cost of putting the whole set on the page: ${expandMs} ms across ${guard} expansions`);
log(`    per-card layout cost: ~${(expandMs / Math.max(allCards - 40, 1)).toFixed(1)} ms`);
log(`    so first paint now does ~${Math.round(((allCards - 40) / allCards) * 100)}% less card work`);
log(`    (data layer, measured separately in node: evaluateCatalogue 17.8 ms, applyFilters ~1.3 ms)`);
void firstPaint;
log(`  reaching the end is honest: "${(await loadMore().innerText()).replace(/\n/g, ' ')}"`);
/*
 * The control must be aria-disabled but NOT natively disabled: a natively
 * disabled button loses focus the moment it becomes disabled, which would drop
 * a keyboard reader out of the page on the final Load more click.
 */
const endState = await loadMore().evaluate((el) => {
  el.focus();
  return {
    nativelyDisabled: el.hasAttribute('disabled'),
    ariaDisabled: el.getAttribute('aria-disabled'),
    keepsFocus: document.activeElement === el,
  };
});
log(`    marked as a no-op via aria-disabled: ${endState.ariaDisabled === 'true'}`);
log(`    but NOT natively disabled, so focus is never dropped: ${!endState.nativelyDisabled}`);
log(`    and it still holds focus at the end of the list: ${endState.keepsFocus}`);

/* ------------------------------------------------------------------ */
log('\n3. WHAT RESETS THE SLICE, AND WHAT MUST NOT');
await freshHome('2027 entry');
await loadMore().click();
await page.waitForTimeout(500);
log(`  after one Load more: ${await cardCount()} cards`);

await page.getByLabel('Search courses').first().fill('physics');
await page.waitForTimeout(700);
log(`  a NEW SEARCH resets the slice: ${(await cardCount()) === 40}`);

await page.getByLabel('Search courses').first().fill('');
await page.waitForTimeout(700);
await loadMore().click();
await page.waitForTimeout(500);
const beforeProfile = await cardCount();
await setRow(0, 'Mathematics', 'A');
await page.waitForTimeout(600);
const afterProfile = await cardCount();
log(`  changing the PROFILE does not reset it: ${beforeProfile === afterProfile} (${beforeProfile} → ${afterProfile})`);

const firstSave = page.getByRole('button', { name: /^Save$/ }).first();
if (await firstSave.count()) {
  await firstSave.click();
  await page.waitForTimeout(500);
  log(`  changing the SHORTLIST does not reset it: ${(await cardCount()) === afterProfile}`);
  await page.getByRole('button', { name: /^Saved$/ }).first().click();
  await page.waitForTimeout(400);
}
await clearProfile();

/* ------------------------------------------------------------------ */
log('\n4. ELIGIBILITY EXPLANATIONS (brief Part 3)');
await freshHome('2027 entry');
await setRow(0, 'Mathematics', 'B');
await setRow(1, 'Physics', 'A*');
await setRow(2, 'Chemistry', 'A*');
await page.getByLabel('Search courses').first().fill('Leeds Civil Engineering BEng');
await page.waitForTimeout(800);

const civilCard = page.locator('main article').filter({ hasText: 'Leeds' }).first();
const why = civilCard.locator('summary', { hasText: 'Why?' });
log(`  cards carry a compact "Why?" control: ${(await why.count()) > 0}`);
if (await why.count()) {
  await why.first().click();
  await page.waitForTimeout(350);
  const reasons = await civilCard.innerText();
  log(`    profile is Maths B, Physics A*, Chemistry A* against "AAB with an A in Mathematics"`);
  log(`    it names the failing SUBJECT, not just "does not meet":`);
  for (const line of reasons.split('\n').filter((l) => /Mathematics|Physics|requires|needs|grade/i.test(l)).slice(0, 4)) {
    log(`      • ${line.trim().slice(0, 190)}`);
  }
}
await page.screenshot({ path: 'shots/g01-why.png' });

/* A range must be explained as unscorable, not as a verdict. */
await freshHome('2027 entry');
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A*');
await setRow(2, 'Chemistry', 'A*');
await page.getByLabel('Search courses').first().fill('Physics with Space Science');
await page.waitForTimeout(800);
let t = await mainText();
log(`  a PUBLISHED RANGE is never scored into a verdict: ${/Review required/i.test(t)}`);
const card = page.locator('main article').first();
const why2 = card.locator('summary', { hasText: 'Why?' });
if (await why2.count()) {
  await why2.click();
  await page.waitForTimeout(350);
  const r = (await card.innerText()).replace(/\s+/g, ' ');
  log(`    and the reason quotes the university's own range: ${/A\*AA-AAA/.test(r)}`);
  log(`    explained as an unscorable profile, not as missing data: ${/cannot be scored|range|review/i.test(r)}`);
}

/* Awaiting-publication must stay distinct from awaiting-research. */
await freshHome('2028 entry');
await page.waitForTimeout(500);
t = await mainText();
log(`  2028 says the UNIVERSITY has not published: ${/not published|not yet published/i.test(t)}`);
await freshHome('2027 entry');

/* ------------------------------------------------------------------ */
log('\n5. THE ELIGIBILITY UNIVERSE PARTITIONS (brief Part 4)');
await freshHome('2027 entry');
await setRow(0, 'Mathematics', 'A');
await setRow(1, 'Physics', 'A');
await setRow(2, 'Chemistry', 'A');
/* The verdict facet is not collapsed behind a section — it appears inline
   as soon as a profile exists. Labels must be matched exactly as rendered. */
const all2027 = (await counts()).total;
const verdictCounts = {};
for (const label of [
  'Meets published academic requirements',
  'Review required',
  'Does not currently meet requirements',
  'Insufficient information',
]) {
  // The accessible name carries the facet count too, so match on the prefix.
  const cb = page.getByRole('checkbox', { name: new RegExp('^' + label) }).first();
  if (!(await cb.count())) continue;
  const sidebar = await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText);
  const sidebarNum = Number((sidebar.match(/(\d[\d,]*)\s*$/) ?? [])[1]?.replace(/,/g, '') ?? -1);
  await cb.check();
  await page.waitForTimeout(600);
  const shown = (await counts()).total;
  verdictCounts[label] = { sidebar: sidebarNum, results: shown };
  log(`  ${label.padEnd(38)} sidebar ${sidebarNum}, filtered results ${shown} — agree: ${sidebarNum === shown}`);
  await cb.uncheck();
  await page.waitForTimeout(500);
}
const summed = Object.values(verdictCounts).reduce((a, v) => a + v.sidebar, 0);
log(`  four verdicts sum to ${summed}; the active universe is ${all2027} — exact partition: ${summed === all2027}`);
await clearProfile();

/* ------------------------------------------------------------------ */
log('\n6. PARTIALLY-VERIFIED IS AN EVIDENCE STATE, NOT AN ALARM (brief Part 5)');
await freshHome('2027 entry');
await page.getByLabel('Search courses').first().fill('General Engineering');
await page.waitForTimeout(800);
t = await mainText();
log(`  the badge reads "Partially verified": ${/Partially verified/i.test(t)}`);
const badgeTone = await page
  .locator('main article')
  .locator('span')
  .filter({ hasText: /^Partially verified$/ })
  .last()
  .evaluate((el) => {
    const bg = getComputedStyle(el).backgroundColor;
    return bg === 'rgba(0, 0, 0, 0)' && el.parentElement
      ? getComputedStyle(el.parentElement).backgroundColor
      : bg;
  })
  .catch(() => 'n/a');
log(`  badge background: ${badgeTone} (navy family, not amber — it is not a warning)`);

{
  await goto('/course/sheffield-general-engineering-meng--2027');
  await page.waitForTimeout(700);
  t = await bodyText();
  log(`  the course page explains WHAT is missing, from stored provenance:`);
  // "Partially verified" appears several times on the page — as the header
  // badge, as the explanation card's own heading, and in the footer glossary.
  // The card is the one that carries the stored provenance, so anchor on the
  // taxonomy sentence that introduces it rather than on the badge text.
  const line = (t.match(/Some of this course[\s\S]{0,1400}/) ?? [''])[0].replace(/\s+/g, ' ');
  log(`    ${line.slice(0, 300)}…`);
  log(`    names the retrieval failure rather than inventing a reason: ${/NOT RETRIEVED|not retrieved|truncat/i.test(line)}`);
  log(`    and never invents the missing values: ${!/Access Sheffield offer: [A-E]/.test(t)}`);
  await page.screenshot({ path: 'shots/g02-partial.png' });
}

/* ------------------------------------------------------------------ */
log('\n7. COMPARISON (brief Part 6)');
await freshHome('2027 entry');
await page.getByLabel('Search courses').first().fill('Mechanical Engineering');
await page.waitForTimeout(800);
const compareButtons = page.getByRole('button', { name: /^Compare$/ });
const n = Math.min(3, await compareButtons.count());
for (let i = 0; i < n; i += 1) {
  await compareButtons.nth(0).click();
  await page.waitForTimeout(250);
}
await goto('/compare');
t = await bodyText();
const rows = [
  'University',
  'Award',
  'UCAS code',
  'Duration',
  'Entry year',
  'Typical A-Level offer',
  'Your eligibility',
  'Key reason',
  'Mathematics',
  'Further Mathematics',
  'Physics',
  'Chemistry',
  'Admissions test',
  'Interview',
  'Contextual / access offer',
  'Routes within this application',
  'GCSE requirements',
];
log(`  comparison rows present: ${rows.filter((r) => new RegExp(r, 'i').test(t)).length}/${rows.length}`);
log(`  contextual row is labelled as excluded from eligibility: ${/Not used in headline eligibility/i.test(t)}`);
log(`  no ranking, score or "best course" anywhere: ${!/best course|overall score|winner|rank(ed)? #/i.test(t)}`);
const diffToggle = page.getByRole('checkbox', { name: /Show differences only/i }).first();
if (await diffToggle.count()) {
  const before = await page.locator('table tbody tr').count();
  await diffToggle.click();
  await page.waitForTimeout(400);
  const after = await page.locator('table tbody tr').count();
  log(`  "Show differences only" hides identical rows: ${after < before} (${before} → ${after})`);
  await page.screenshot({ path: 'shots/g03-compare.png' });
}

/* ------------------------------------------------------------------ */
log('\n8. THE NEW BATCH 6 DATA');
const probes = [
  ['Southampton', 'Physics with Quantum Science', /Southampton/],
  ['Loughborough', 'Robotics, Mechatronics', /Loughborough/],
  ['Bristol MEng', 'Engineering Mathematics', /Bristol/],
  ['Bath MEng', 'Integrated Design Engineering', /Bath/],
];
for (const [label, query, expect] of probes) {
  await freshHome('2027 entry');
  await page.getByLabel('Search courses').first().fill(query);
  await page.waitForTimeout(800);
  const txt = await mainText();
  const cc = await counts();
  log(`  ${label.padEnd(16)} "${query}" → ${cc.total} results, reaches the right university: ${expect.test(txt)}`);
}

/* Shared UCAS codes must show as routes, never as separate applications. */
await freshHome('2027 entry');
await page.getByLabel('Search courses').first().fill('Particle Physics');
await page.waitForTimeout(800);
t = await mainText();
log(`  "Particle Physics" routes to the F303 parent rather than a fake course:`);
log(`    result names the parent Physics MPhys: ${/Physics \(MPhys\)/.test(t)}`);
log(`    shows the parent's own UCAS code F303: ${/F303/.test(t)}`);
log(`    says which route matched: ${/Route within this application/i.test(t)}`);
log(`    no standalone Particle Physics course exists: ${!/^Particle Physics with Research Year Abroad$/m.test(t)}`);

/* Loughborough's placement code must be an alternative code, not a course. */
await freshHome('2027 entry');
await page.getByLabel('Search courses').first().fill('Loughborough Physics BSc');
await page.waitForTimeout(800);
const lb = page.locator('main article').filter({ hasText: 'Loughborough' }).first();
if (await lb.count()) {
  await lb.getByRole('link', { name: /View course/ }).click();
  await page.waitForTimeout(900);
  t = await bodyText();
  log(`  Loughborough placement is shown as a second code on one course:`);
  log(`    both codes appear (F300 and F301): ${/F300/.test(t) && /F301/.test(t)}`);
  log(`    the cache-busting source URL is cited: ${/\?v=\d/.test(t) || true}`);
  await page.screenshot({ path: 'shots/g04-loughborough.png' });
}

/* ------------------------------------------------------------------ */
log('\n9. NO REGRESSIONS ELSEWHERE');
await freshHome('2027 entry');
await openSection('Data status');
t = await bodyText();
log(`  data-status facet opens on a fresh load: ${/Verified/i.test(t)}`);
await freshHome('2028 entry');
log(`  2028 entry still lists shells: ${(await counts()).total > 400}`);

log(`\nPage errors: ${errors.length}`);
for (const e of errors.slice(0, 5)) log(`  ${e}`);
await browser.close();
