/**
 * Batch 5 browser smoke test — Part 22 of the brief.
 *
 * Covers study-option search, profile-driven eligibility filtering, the six new
 * universities, and everything the earlier batches already relied on.
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
const text = () => page.locator('body').innerText();
const mainText = () => page.locator('main').innerText();
const safeCount = async () => {
  try {
    return await page.locator('main >> text=/^\\d+ courses?$/').first().innerText({ timeout: 5000 });
  } catch {
    return 'no result count shown';
  }
};
const num = async () => {
  const m = (await safeCount()).match(/(\d+)/);
  return m ? Number(m[1]) : -1;
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
const freshHome = async (year = '2027 entry') => {
  await goto('/');
  // Reset deliberately preserves the search box, so clear it explicitly —
  // otherwise a query left by an earlier section silently narrows the counts.
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
const verdict = () =>
  page
    .locator(
      'text=/Meets published academic requirements|Does not currently meet requirements|Review required|Insufficient information/',
    )
    .first()
    .innerText();
const rowLabel = async (re) => {
  const cb = page.getByRole('checkbox', { name: re }).first();
  if (!(await cb.count())) return '(not found)';
  return (await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText)).replace(/\n/g, ' ');
};
const search = async (q) => {
  await goto('/');
  await page.getByLabel('Search courses').first().fill(q);
  await page.waitForTimeout(600);
};

/* ------------------------------------------------------------------ */
log('1. HOMEPAGE AND ENTRY YEARS');
await goto('/');
await clearProfile();
await freshHome('2027 entry');
log(`  2027 entry: ${await safeCount()}`);
await freshHome('2028 entry');
log(`  2028 entry: ${await safeCount()}`);
await page.screenshot({ path: 'shots/f01-home.png' });

/* ------------------------------------------------------------------ */
log('\n2. STUDY-OPTION SEARCH (brief Part 2)');
await freshHome('2027 entry');
await page.getByLabel('Search courses').first().fill('Spacecraft');
await page.waitForTimeout(700);
let t = await mainText();
log(`  “Spacecraft” → ${await safeCount()}`);
log('    returns the Imperial parent: ' + /Aeronautical Engineering/.test(t));
log('    shows the parent’s own UCAS code H401: ' + /H401/.test(t));
log('    says WHY it matched: ' + /Route within this application: Aeronautics with Spacecraft Engineering/i.test(t.replace(/\s+/g, ' ')));
log('    no fake Spacecraft course appears: ' + !/^Aeronautics with Spacecraft Engineering$/m.test(t));
await page.screenshot({ path: 'shots/f02-spacecraft.png' });

await freshHome('2027 entry');
await page.getByLabel('Search courses').first().fill('Nuclear Engineering');
await page.waitForTimeout(700);
t = await mainText();
log(`  “Nuclear Engineering” → ${await safeCount()}`);
log('    finds the genuine J5H8 course: ' + /J5H8/.test(t));
log('    and the H301 parent by its route: ' + /H301/.test(t));
log('    the route line distinguishes them: ' + /Route within this application: Mechanical Engineering with Nuclear Engineering/i.test(t.replace(/\s+/g, ' ')));
await page.screenshot({ path: 'shots/f03-nuclear.png' });

await freshHome('2028 entry');
await page.getByLabel('Search courses').first().fill('Spacecraft');
await page.waitForTimeout(700);
log(`  “Spacecraft” at 2028 (no shell should exist) → ${await safeCount()}`);

/* ------------------------------------------------------------------ */
log('\n3. GENERAL COURSE SEARCH');
for (const q of ['physics', 'glasgow aeronautical', 'sheffield mechanical', 'F300']) {
  await search(q);
  log(`  “${q}” → ${await safeCount()}`);
}

/* ------------------------------------------------------------------ */
log('\n4. SUBJECT AND UNIVERSITY FACETS');
const facet = async (name) => {
  await freshHome('2027 entry');
  const cb = page.getByRole('checkbox', { name: new RegExp('^' + name) }).first();
  if (!(await cb.count())) return `${name}: not found`;
  const label = await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText);
  const claimed = Number((label.match(/(\d+)\s*$/) ?? [])[1]);
  await cb.click();
  await page.waitForTimeout(500);
  const shown = await num();
  return `${name}: sidebar ${claimed}, results ${shown} → ${claimed === shown ? 'MATCH' : 'MISMATCH'}`;
};
log('  ' + (await facet('Physics')));
log('  ' + (await facet('Engineering')));

const uniFacet = async (label) => {
  await freshHome('2027 entry');
  await openSection('University');
  const box = page.getByPlaceholder('Find a university').first();
  if (await box.count()) {
    await box.fill(label);
    await page.waitForTimeout(350);
  }
  const cb = page.getByRole('checkbox', { name: new RegExp(label) }).first();
  if (!(await cb.count())) return `${label}: not found`;
  const lbl = await cb.evaluate((el) => (el.closest('label') ?? el.parentElement).innerText);
  const claimed = Number((lbl.match(/(\d+)\s*$/) ?? [])[1]);
  await cb.click();
  await page.waitForTimeout(500);
  const shown = await num();
  return `${label}: sidebar ${claimed}, results ${shown} → ${claimed === shown ? 'MATCH' : 'MISMATCH'}`;
};
for (const u of ['Birmingham', 'Sheffield', 'Leeds', 'Nottingham', 'Glasgow', 'St Andrews']) {
  log('  ' + (await uniFacet(u)));
}
await page.screenshot({ path: 'shots/f04-facets.png' });

/* ------------------------------------------------------------------ */
log('\n5. STUDENT PROFILE AND ELIGIBILITY FILTERS (brief Part 3)');
await freshHome('2027 entry');
log('  eligibility section hidden with no profile: ' + !(await page.getByRole('button', { name: /^Match against your grades$/ }).count()));

await setRow(0, 'Mathematics', 'A*');
await setRow(1, 'Physics', 'A*');
await setRow(2, 'Chemistry', 'A*');
await page.waitForTimeout(900);
log('  eligibility section appears once a profile exists: ' + (await page.getByRole('button', { name: /^Match against your grades$/ }).count() > 0));
await openSection('Match against your grades');

const total = await num();
const labels = {};
for (const [key, re] of [
  ['all', /^All courses/],
  ['meets', /^Meets published/],
  ['review', /^Review required/],
  ['fails', /^Does not currently meet/],
  ['unknown', /^Insufficient information/],
]) {
  labels[key] = await rowLabel(re);
}
log('  facet labels: ' + Object.entries(labels).map(([k, v]) => `${k}=${v}`).join(' | '));
const n = (s) => Number((s.match(/(\d+)\s*$/) ?? [])[1] ?? NaN);
log(`  facets add up to the visible list: ${n(labels.meets) + n(labels.review) + n(labels.fails) + n(labels.unknown)} vs ${total} vs "all" ${n(labels.all)}`);

const applyVerdict = async (re, key) => {
  const cb = page.getByRole('checkbox', { name: re }).first();
  if (!(await cb.count())) return `${key}: not found`;
  await cb.click();
  await page.waitForTimeout(600);
  const shown = await num();
  const ok = shown === n(labels[key]);
  await cb.click();
  await page.waitForTimeout(400);
  return `${key}: sidebar ${n(labels[key])}, results ${shown} → ${ok ? 'MATCH' : 'MISMATCH'}`;
};
log('  ' + (await applyVerdict(/^Meets published/, 'meets')));
log('  ' + (await applyVerdict(/^Review required/, 'review')));
log('  ' + (await applyVerdict(/^Does not currently meet/, 'fails')));
log('  ' + (await applyVerdict(/^Insufficient information/, 'unknown')));
await page.screenshot({ path: 'shots/f05-eligibility.png' });

// Every card under the "meets" filter must actually show a meets badge.
await freshHome('2027 entry');
await openSection('Match against your grades');
const meetsBox = page.getByRole('checkbox', { name: /^Meets published/ }).first();
if (await meetsBox.count()) {
  await meetsBox.click();
  await page.waitForTimeout(700);
  const cards = await mainText();
  log('  every visible card reads as a match: ' + !/Does not currently meet|Review required/.test(cards));
}

/* 2028 shells must never gain a verdict. */
await freshHome('2028 entry');
await openSection('Match against your grades');
const shellLabels = {
  meets: await rowLabel(/^Meets published/),
  unknown: await rowLabel(/^Insufficient information/),
};
log(`  at 2028: meets ${shellLabels.meets} · insufficient ${shellLabels.unknown}`);
log('  2028 shells receive no false eligibility: ' + (n(shellLabels.meets) === 0));

/* ------------------------------------------------------------------ */
log('\n6. TRUST STATES');
await freshHome('2027 entry');
await openSection('Data status');
t = await text();
log('  research-backlog wording: ' + /awaiting research/i.test(t));
log('  publication-cycle wording: ' + /not yet published|has not published|awaiting publication/i.test(t));
await freshHome('2028 entry');
log('  2028 cards say the university has not published: ' + /not yet published|awaiting publication/i.test(await mainText()));
await openSection('Data status');
const awaitBox = page.getByRole('checkbox', { name: /Include courses awaiting research/i }).first();
if (await awaitBox.count()) {
  const before = await num();
  await awaitBox.click();
  await page.waitForTimeout(600);
  log(`  including awaiting research: ${before} → ${await num()}`);
}

/* ------------------------------------------------------------------ */
log('\n7. NEW COURSE PAGES');
const pageCheck = async (id, probes) => {
  await goto(`/course/${id}`);
  const body = await text();
  const out = probes.map(([label, re]) => `${label} ${re.test(body)}`).join(', ');
  log(`  ${id}: ${out}`);
};
await pageCheck('glasgow-physics-bsc--2027', [
  ['range stored verbatim', /AAB – BBB/],
  ['range explained', /range of grades required to be considered/i],
  ['no A-level minimum claimed', /publishes no A-level adjusted or minimum-entry figure/i],
]);
await pageCheck('glasgow-aeronautical-engineering-meng--2027', [
  ['MEng is a single profile', /AAA/],
  ['not a range', /AAB – BBB/],
]);
await pageCheck('st-andrews-physics-bsc--2027', [
  ['single profile AAA', /AAA/],
  ['F301 not F300', /F301/],
  ['minimum is widening-access only', /widening access student/i],
  ['Gateway explained as a separate programme', /Gateway to Science/],
]);
await pageCheck('nottingham-mathematical-physics-bsc--2027', [
  ['A*AA kept exactly', /A\*AA/],
  ['flattened to a bare AAA (should be false)', /Typical offer: AAA\b/],
]);
await pageCheck('sheffield-mechanical-engineering-beng--2027', [
  ['A*AA standard', /A\*AA/],
  ['Access Sheffield named', /Access Sheffield/],
  ['contextual restructure flagged', /RESTRUCTURES the subject rule/i],
]);
await pageCheck('birmingham-physics-bsc--2027', [
  ['three-A-Level route', /A\*AA/],
  ['four-A-Level route', /AAAA/],
  ['both schemes named', /Pathways to Birmingham/],
]);
await pageCheck('birmingham-mechanical-engineering-beng--2027', [
  ['Maths Aptitude test named', /Mathematics Aptitude test/],
  ['and marked conditional', /only in some cases/i],
]);
await pageCheck('leeds-mathematics-and-physics-bsc--2027', [
  ['range stored', /AAA - AAB/],
  ['Further Maths rule present', /Further Mathematics/],
]);
await pageCheck('leeds-civil-engineering-beng--2027', [
  ['diagnostic maths test named', /Diagnostic Maths test/i],
  ['interview recorded as sometimes', /interview/i],
]);
await page.screenshot({ path: 'shots/f06-course-page.png' });

/* Eligibility on a course page. */
await goto('/course/st-andrews-physics-bsc--2027');
await setRow(0, 'Mathematics', 'A');
await setRow(1, 'Physics', 'A');
await setRow(2, 'Chemistry', 'A');
await page.waitForTimeout(900);
log('  St Andrews AAA with Maths+Physics → ' + (await verdict()));
await goto('/course/glasgow-physics-bsc--2027');
await page.waitForTimeout(700);
log('  Glasgow range with the same grades → ' + (await verdict()));

/* ------------------------------------------------------------------ */
log('\n8. 2028 SHELLS');
await goto('/course/glasgow-physics-bsc--2028');
await clearProfile();
for (const id of ['glasgow-physics-bsc--2028', 'birmingham-physics-bsc--2028', 'st-andrews-physics-bsc--2028']) {
  await goto(`/course/${id}`);
  t = await text();
  log(`  ${id}: notice ${/not yet published/i.test(t)}, no verified badge ${!/\bVerified\b/.test(t)}, no routes card ${!/Routes within this application/i.test(t)}, no grades ${!/A\*AA|AAB – BBB/.test(t)}`);
}

/* ------------------------------------------------------------------ */
log('\n9. UNIVERSITY PAGES');
for (const [slug, probe] of [
  ['birmingham', /University of Birmingham/],
  ['sheffield', /University of Sheffield/],
  ['leeds', /University of Leeds/],
  ['nottingham', /University of Nottingham/],
  ['glasgow', /University of Glasgow/],
  ['st-andrews', /University of St Andrews/],
]) {
  await goto(`/university/${slug}`);
  t = await text();
  log(`  /${slug}: name ${probe.test(t)}, courses listed ${/Physics|Engineering/.test(t)}`);
}
await goto('/university/st-andrews');
log('  St Andrews lists no BEng or MEng course: ' + !/\b(BEng|MEng)\b/.test(await text()));

/* ------------------------------------------------------------------ */
log('\n10. COMPARISON AND SHORTLIST');
await goto('/course/glasgow-physics-bsc--2027');
await page.getByRole('button', { name: /Add to comparison/ }).first().click();
await page.waitForTimeout(300);
await goto('/course/st-andrews-physics-bsc--2027');
await page.getByRole('button', { name: /Add to comparison/ }).first().click();
await page.waitForTimeout(300);
await page.getByRole('button', { name: /Save course/ }).first().click();
await page.waitForTimeout(300);
await goto('/compare');
t = await text();
log('  comparison holds both: ' + (/Glasgow/.test(t) && /St Andrews/.test(t)));
log('  a range and a profile sit side by side unflattened: ' + (/AAB – BBB/.test(t) && /AAA/.test(t)));
await goto('/shortlist');
log('  shortlist holds the saved course: ' + /St Andrews/.test(await text()));

/* ------------------------------------------------------------------ */
log('\n11. FIXTURES STAY PRIVATE');
for (const id of [
  'fixture-manual-review-physics--2027',
  'fixture-unparsed-grades--2027',
  'fixture-conditional-subject--2027',
  'fixture-oneof-engineering--2027',
]) {
  await goto(`/course/${id}`);
  log(`  ${id} unreachable: ` + /Course not found/i.test(await text()));
}
await search('fixture');
log('  search “fixture” → ' + (await safeCount()));

/* ------------------------------------------------------------------ */
log('\n12. ADMIN, VALIDATION, DUPLICATES');
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
await page.screenshot({ path: 'shots/f07-admin.png' });

/* ------------------------------------------------------------------ */
log('\n13. RESPONSIVENESS ON THE LARGER CATALOGUE');
for (const q of ['physics', 'Spacecraft', 'Nuclear Engineering', 'engineering', 'birmingham']) {
  await freshHome('2027 entry');
  const t0 = Date.now();
  await page.getByLabel('Search courses').first().fill(q);
  await page.waitForTimeout(500);
  log(`  “${q}” → ${await safeCount()}  [${Date.now() - t0 - 500}ms after debounce]`);
}
await page.screenshot({ path: 'shots/f08-search.png' });

log('\nPage errors: ' + (errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none'));
await browser.close();
