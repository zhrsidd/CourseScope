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

const inputs = () => page.locator('input[list="a-level-subjects"]');
const setRow = async (i, subject, grade) => {
  await inputs().nth(i).fill(subject);
  await page.locator('div[role="group"]').nth(i).getByRole('button', { name: grade, exact: true }).click();
  await page.waitForTimeout(120);
};
const addRow = async () => {
  await page.getByRole('button', { name: 'Add subject' }).click();
  await page.waitForTimeout(200);
};
const verdict = () =>
  page
    .locator('text=/Meets published academic requirements|Does not currently meet requirements|Review required|Insufficient information/')
    .first()
    .innerText();

/* 1. UCL Physics BSc — the A*A rule, and the contextual offer separation */
await goto('/course/ucl-physics-bsc--2027');
let t = await text();
log('UCL Physics BSc');
log('  A*AA shown: ' + /A\*AA/.test(t));
log('  UCL subject wording: ' + /A\*A in Mathematics and Physics required \(in any order\)/.test(t));
log('  contextual AAB stored: ' + /AAB/.test(t));
log('  contextual separation note: ' + /never matches you to a contextual offer/i.test(t));
log('  GCSE line: ' + /English Language and Mathematics at grade C or 4/.test(t));
await setRow(0, 'Mathematics', 'A');
await setRow(1, 'Physics', 'A');
await setRow(2, 'Further Mathematics', 'A*');
await addRow();
await setRow(3, 'Economics', 'A');
await page.waitForTimeout(700);
log('  Maths A / Physics A / FM A* → ' + (await verdict()));
await page.locator('div[role="group"]').nth(0).getByRole('button', { name: 'A*', exact: true }).click();
await page.waitForTimeout(700);
log('  after raising Maths to A* → ' + (await verdict()));
await page.screenshot({ path: 'shots/c01-ucl-physics.png' });

/* 2. UCL Chemical Engineering — Chemistry required, Physics only preferred */
await goto('/course/ucl-chemical-engineering-meng--2027');
t = await text();
log('\nUCL Chemical Engineering MEng');
// Read the offer block itself: the page also renders the student's own saved
// profile, so a whole-page regex is not a clean test of the published offer.
{
  const block = t.slice(t.indexOf('Standard offer'), t.indexOf('Standard offer') + 40);
  log('  published offer is AAA with no asterisk: ' + /Standard offer\nAAA\n/.test(block));
}
log('  Chemistry required wording: ' + /Mathematics and Chemistry required/.test(t));
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Further Mathematics', 'A*');
await setRow(2, 'Physics', 'A*');
await addRow();
await setRow(3, 'Economics', 'A');
await page.waitForTimeout(700);
log('  A*A*A* without Chemistry → ' + (await verdict()));
await page.screenshot({ path: 'shots/c02-ucl-chemeng.png' });

/* 3. UCL EEE — the ESAT module choice must be visible as a choice */
await goto('/course/ucl-electronic-and-electrical-engineering-meng--2027');
t = await text();
log('\nUCL Electronic and Electrical Engineering MEng');
log('  ESAT named: ' + /ESAT/.test(t));
log('  mandatory Mathematics 1: ' + /Mathematics 1/.test(t));
log('  "choose 2 of" shown: ' + /choose 2 of/i.test(t));
log('  all four options shown: ' + ['Physics', 'Mathematics 2', 'Chemistry', 'Biology'].every((m) => t.includes(m)));
log('  UCL wording quoted: ' + /any two out of Physics, Maths 2, Chemistry and Biology/.test(t));
await page.screenshot({ path: 'shots/c03-ucl-eee-esat.png' });

/* 4. Imperial Mechanical — two pathways and a separate typical offer */
await goto('/course/imperial-mechanical-engineering-meng--2027');
t = await text();
log('\nImperial Mechanical Engineering MEng');
log('  minimum entry standard A*A*A or A*AAA: ' + /A\*A\*A or A\*AAA/.test(t));
log('  typical offer A*A*A* shown separately: ' + /Typical offer: A\*A\*A\*/.test(t));
log('  typical-offer caveat: ' + /not checked against your grades/i.test(t));
log('  four-A-Level pathway badge: ' + /Only for 4\+ A-Levels/.test(t));
await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A');
await setRow(2, 'Further Mathematics', 'A*');
await page.waitForTimeout(700);
log('  three A-Levels, Physics A → ' + (await verdict()));
await addRow();
await setRow(3, 'Chemistry', 'A');
await page.waitForTimeout(700);
log('  four A-Levels, Physics A → ' + (await verdict()));
await page.screenshot({ path: 'shots/c04-imperial-mech.png' });

/* 5. Imperial Chemical — Chemistry ESAT module, not Physics */
await goto('/course/imperial-chemical-engineering-meng--2027');
t = await text();
log('\nImperial Chemical Engineering MEng');
log('  ESAT Chemistry module: ' + /Chemistry/.test(t));
log('  does not claim the Physics module: ' + !/Mathematics 2[\s\S]{0,30}Physics/.test(t));

/* 6. UCL Mechanical — TARA */
await goto('/course/ucl-mechanical-engineering-meng--2027');
t = await text();
log('\nUCL Mechanical Engineering MEng');
log('  TARA named: ' + /TARA/.test(t));
log('  not ESAT: ' + !/\bESAT\b/.test(t));

/* 7. The obsolete PAT placeholders are gone from the public catalogue */
await goto('/course/oxford-physics--2028');
log('\nObsolete Oxford Physics 2028 placeholder: ' + (await text()).slice(0, 60).replace(/\n/g, ' '));
await goto('/course/oxford-physics-mphys--2028');
log('Clean Oxford Physics 2028 shell present: ' + /not yet published/i.test(await text()));

/* 8. Catalogue-level */
await goto('/');
log('\nDefault (2028) results: ' + (await page.locator('main >> text=/^\\d+ courses$/').first().innerText()));
await page.getByRole('button', { name: '2027 entry', exact: true }).first().click();
await page.waitForTimeout(500);
log('2027 results: ' + (await page.locator('main >> text=/^\\d+ courses$/').first().innerText()));
await page.screenshot({ path: 'shots/c05-home.png' });

await goto('/admin');
log('\nAdmin records: ' + (await page.locator('table tbody tr').count()));
await page.getByRole('button', { name: /^Validation/ }).click();
await page.waitForTimeout(400);
log('  ' + (await page.locator('text=/Errors \\(\\d+\\)/').first().innerText()));
await page.getByRole('button', { name: /^Duplicates/ }).click();
await page.waitForTimeout(400);
log('  duplicates: ' + (await page.locator('text=/No duplicates or conflicts detected|Likely duplicate|Conflict/').first().innerText()));

log('\nPage errors: ' + (errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none'));
await browser.close();
