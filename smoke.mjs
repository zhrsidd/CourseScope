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
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));

const goto = async (hash) => {
  await page.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
};
const count = async () => (await page.locator('main >> text=/^\\d+ courses$/').first().innerText());

// 1. Home
await goto('/');
log('H1: ' + (await page.locator('h1').first().innerText()));
log('Initial results: ' + (await count()));

// 2. Search
for (const q of [
  'engineering without chemistry',
  'physics AAA',
  'universities requiring ESAT',
  'physics courses without admissions tests',
  'physics further maths recommended',
]) {
  await page.fill('input[type="search"]', q);
  await page.waitForTimeout(400);
  log(`  "${q}" -> ${await count()}`);
}
await page.fill('input[type="search"]', '');
await page.waitForTimeout(400);

// 3. Student profile — the brief's example
const inputs = page.locator('input[list="a-level-subjects"]');
const setRow = async (i, subject, grade) => {
  await inputs.nth(i).fill(subject);
  await page.locator('div[role="group"]').nth(i).getByRole('button', { name: grade, exact: true }).click();
  await page.waitForTimeout(120);
};
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A');
await setRow(2, 'Further Mathematics', 'A*');
await page.getByRole('button', { name: 'Add subject' }).click();
await page.waitForTimeout(200);
await setRow(3, 'Economics', 'A');
await page.waitForTimeout(700);

const tally = await page.evaluate(() => {
  const counts = {};
  document.querySelectorAll('article span').forEach((el) => {
    const t = el.textContent?.trim() ?? '';
    if (/^(Meets requirements|Not met|Review required|Insufficient info)$/.test(t)) {
      counts[t] = (counts[t] ?? 0) + 1;
    }
  });
  return counts;
});
log('Verdict tally: ' + JSON.stringify(tally));
await page.screenshot({ path: 'shots/n01-home.png' });

// 4. The key rule: overall AAA must not satisfy an A* Physics requirement
await goto('/course/imperial-physics--2028');
const badge = await page
  .locator('text=/Meets published academic requirements|Does not currently meet requirements|Review required|Insufficient information/')
  .first()
  .innerText();
log('Imperial Physics (A*A*A, Physics A* required) verdict: ' + badge);
const physicsRow = await page.locator('text=/Required at A\\*; you entered A\\./').first().innerText().catch(() => 'row not found');
log('  Physics row: ' + physicsRow);
await page.screenshot({ path: 'shots/n02-course-breakdown.png' });

// 5. Constraint + raw text (Bristol: A* in either Maths or Physics)
await goto('/course/bristol-physics--2028');
log('Bristol raw text present: ' + (await page.locator('blockquote').first().isVisible()));
log('Bristol constraint shown: ' + (await page.locator('text=/An A\\* is required in either Mathematics or Physics/').first().isVisible()));
await page.screenshot({ path: 'shots/n03-constraint.png' });

// 6. Conditional pathway (Warwick)
await goto('/course/warwick-physics--2028');
log('Warwick conditional badge: ' + (await page.locator('text=/Only if taking Further Mathematics/').first().isVisible()));

// 7. Unpublished cycle
await goto('/course/cambridge-natural-sciences-physical--2028');
log('Unpublished notice: ' + (await page.locator('text=/2028 entry requirements not yet published/').first().isVisible()));
log('Latest-available block: ' + (await page.locator('text=/Latest available requirements: 2027 entry/').first().isVisible()));
await page.screenshot({ path: 'shots/n04-unpublished.png' });

// 8. Awaiting-data shell
await goto('/course/imperial-physics--2027');
log('Awaiting-data notice: ' + (await page.locator('text=/Awaiting verified data/').first().isVisible()));

// 9. Compare
await goto('/');
await page.waitForTimeout(400);
const cmp = page.getByRole('button', { name: 'Compare', exact: true });
await cmp.nth(0).click();
await cmp.nth(1).click();
await goto('/compare');
log('Comparison rows: ' + (await page.locator('table tbody tr').count()));
await page.screenshot({ path: 'shots/n05-compare.png' });

// 10. Admin tabs
await goto('/admin');
log('Records table rows: ' + (await page.locator('table tbody tr').count()));
await page.screenshot({ path: 'shots/n06-admin-records.png' });
await page.getByRole('button', { name: /^Validation/ }).click();
await page.waitForTimeout(400);
log('Validation view rendered: ' + (await page.locator('text=/Errors \\(/').first().isVisible()));
await page.screenshot({ path: 'shots/n07-admin-validation.png' });
await page.getByRole('button', { name: 'Import / export' }).click();
await page.waitForTimeout(400);
await page.getByRole('button', { name: /Load sample JSON|Load CSV template/ }).click();
await page.waitForTimeout(200);
await page.getByRole('button', { name: 'Validate batch' }).click();
await page.waitForTimeout(400);
log('Import validation ran: ' + (await page.locator('text=/records? parsed/').first().innerText()));
await page.screenshot({ path: 'shots/n08-admin-import.png' });
await page.getByRole('button', { name: 'Editor' }).click();
await page.waitForTimeout(400);
log('Editor JSON present: ' + (await page.locator('pre code').first().isVisible()));

await page.getByRole('button', { name: /^Duplicates/ }).click();
await page.waitForTimeout(400);
log('Duplicates tab: ' + (await page.locator('text=/How records are matched/').first().isVisible()));
log('  ' + (await page.locator('text=/No duplicates or conflicts detected|Type/').first().innerText()).slice(0, 60));
await page.screenshot({ path: 'shots/n11-admin-duplicates.png' });

// 10b. Structured deadlines
await goto('/course/oxford-physics--2027');
log('Course-scoped deadline shown: ' + (await page.locator('text=/PAT registration deadline/').first().isVisible()));
log('Deadline scope label: ' + (await page.locator('text=/Applies to: 2 specific courses/').first().isVisible()));
await page.screenshot({ path: 'shots/n12-deadlines.png' });
await goto('/university/oxford');
log('University deadlines card: ' + (await page.locator('text=/Earlier UCAS deadline/').first().isVisible()));

// 11. Other pages
for (const p of ['/browse', '/universities', '/university/warwick', '/shortlist', '/about']) {
  await goto(p);
  log(`${p} -> ${(await page.locator('h1').first().innerText()).slice(0, 40)}`);
}
await page.screenshot({ path: 'shots/n09-about.png' });

// 12. Mobile
await page.setViewportSize({ width: 390, height: 844 });
await goto('/');
await page.screenshot({ path: 'shots/n10-mobile.png' });

log('Console/page errors: ' + (errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none'));
await browser.close();
