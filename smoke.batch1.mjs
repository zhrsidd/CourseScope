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
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
const goto = async (h) => {
  await page.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
};

// 1. Public default now hides sample data
await goto('/');
log('Default 2028 results: ' + (await page.locator('main >> text=/^\\d+ courses$/').first().innerText()));
await page.getByRole('button', { name: '2027 entry', exact: true }).first().click();
await page.waitForTimeout(500);
log('After switching to 2027: ' + (await page.locator('main >> text=/^\\d+ courses$/').first().innerText()));
await page.screenshot({ path: 'shots/b01-home-verified.png' });

// 2. Oxford Physics 2027 — verified record with the contradiction visible
await goto('/course/oxford-physics-mphys--2027');
log('Oxford Physics title: ' + (await page.locator('h1').first().innerText()));
log('  award label: ' + (await page.locator('text=/MPhys \\/ BA/').first().isVisible()));
log('  duration: ' + (await page.locator('text=/3 or 4 years/').first().isVisible()));
log('  cycle note: ' + (await page.locator('text=/not confirmed 2028 direct-entry data/i').first().isVisible()));
log('  verified badge: ' + (await page.locator('text=Verified').first().isVisible()));
log('  raw wording: ' + (await page.locator('blockquote').first().innerText()).slice(0, 60));
log('  A* constraint: ' + (await page.locator('text=/The A\\* must be in Mathematics, Physics or Further Mathematics/').first().isVisible()));
log('  modules not recorded: ' + (await page.locator('text=/Module combination not supplied/').first().isVisible()));
await page.screenshot({ path: 'shots/b02-oxford-physics.png', fullPage: false });

// 3. Oxford Engineering Science — alternative codes, one record
await goto('/course/oxford-engineering-science-meng--2027');
log('Oxford Eng Sci alt codes shown: ' + (await page.locator('text=/Biomedical Engineering option/').first().isVisible()));
log('  two-A* condition: ' + (await page.locator('text=/The A\\*s must be in Mathematics, Physics or Further Mathematics/').first().isVisible()));

// 4. Cambridge Engineering — conditional FM + college variation
await goto('/course/cambridge-engineering-meng--2027');
log('Cambridge conditional FM: ' + (await page.locator('text=/Required in some circumstances/').first().isVisible()));
log('  college variation note: ' + (await page.locator('text=/Colleges usually require/').first().isVisible()));
log('  Peterhouse note: ' + (await page.locator('text=/Peterhouse/').first().isVisible()));
log('  deferred-entry wording: ' + (await page.locator('text=/deferred entry in 2028/').first().isVisible()));
await page.screenshot({ path: 'shots/b03-cambridge-eng.png', fullPage: false });

// 5. Imperial EEE — the brief's eligibility test, in the browser
await goto('/course/imperial-eee-meng--2027');
const inputs = page.locator('input[list="a-level-subjects"]');
const setRow = async (i, subject, grade) => {
  await inputs.nth(i).fill(subject);
  await page.locator('div[role="group"]').nth(i).getByRole('button', { name: grade, exact: true }).click();
  await page.waitForTimeout(120);
};
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A');
await setRow(2, 'Further Mathematics', 'A');
await page.getByRole('button', { name: 'Add subject' }).click();
await page.waitForTimeout(250);
await setRow(3, 'Economics', 'A');
await page.waitForTimeout(700);
log('Imperial EEE verdict (4 A-Levels, Physics A): ' + (await page.locator('text=/Meets published academic requirements|Does not currently meet requirements|Review required|Insufficient information/').first().innerText()));
log('  four-A-Level pathway badge: ' + (await page.locator('text=/Only for 4\\+ A-Levels/').first().isVisible()));
await page.screenshot({ path: 'shots/b04-imperial-eee.png', fullPage: false });

// 6. 2028 shell carries nothing
await goto('/course/imperial-eee-meng--2028');
log('2028 shell notice: ' + (await page.locator('text=/2028 entry requirements not yet published/').first().isVisible()));
log('  links to 2027 record: ' + (await page.locator('text=/Latest available requirements: 2027 entry/').first().isVisible()));
log('  no offer shown: ' + (await page.locator('text=/Not yet published for this entry year/').first().isVisible()));
await page.screenshot({ path: 'shots/b05-2028-shell.png', fullPage: false });

// 7. Admin: validation + duplicates
await goto('/admin');
log('Records: ' + (await page.locator('table tbody tr').count()));
const stats = await page.locator('.surface').allInnerTexts();
log('  stat tiles: ' + stats.slice(0, 6).map((s) => s.replace(/\n/g, ' ')).join(' | ').slice(0, 200));
await page.getByRole('button', { name: /^Validation/ }).click();
await page.waitForTimeout(400);
log('Validation errors tab: ' + (await page.locator('text=/Errors \\(\\d+\\)/').first().innerText()));
log('  error rows: ' + (await page.locator('table tbody tr').count()));
await page.screenshot({ path: 'shots/b06-validation.png', fullPage: false });
await page.getByRole('button', { name: /^Duplicates/ }).click();
await page.waitForTimeout(400);
log('Duplicates: ' + (await page.locator('text=/No duplicates or conflicts detected|Likely duplicate|Conflict/').first().innerText()));

log('Page errors: ' + (errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none'));
await browser.close();
