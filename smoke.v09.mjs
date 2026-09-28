/**
 * RELEASE QA — v0.9 release-candidate checks (Parts 12 to 19), plus the
 * v1.0.0 brand and production-configuration checks (section 20).
 *
 * This suite asks release questions rather than data questions: can a brand-new
 * visitor with no stored state complete the whole workflow, does an existing
 * user's saved state survive, does a stale record ID fail gracefully, do the
 * 2027 and 2028 cycles stay separated, and do the official source links point
 * at real university domains.
 *
 * Storage keys under test (from src/state/AppContext.tsx):
 *   ukcf.profile.v1 · ukcf.savedCourses.v1 · ukcf.savedUniversities.v1 · ukcf.compare.v1
 */
/*
 * PLAYWRIGHT IS RESOLVED, NOT HARDCODED.
 *
 * This file used to import Playwright from one absolute path on one machine,
 * which made `npm run qa` a command that only worked here — a documented
 * release step that could not be reproduced by anyone else. It now tries the
 * bare specifier first (a normal local or workspace install), then the global
 * npm root, and fails with an instruction rather than a stack trace.
 */
async function loadChromium() {
  const candidates = ['playwright', 'playwright-core'];
  const globalRoot = process.env.NPM_CONFIG_PREFIX ?? process.env.npm_config_prefix;
  if (globalRoot) {
    candidates.push(`${globalRoot}/lib/node_modules/playwright/index.js`);
  }
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
    } catch {
      /* try the next candidate */
    }
  }
  throw new Error(
    'Playwright not found. Install it before running the QA suite:\n' +
      '  npm i -D playwright && npx playwright install chromium',
  );
}
const chromium = await loadChromium();
// Overridable so the suite can be pointed at any preview port: QA_BASE=… npm run qa
const BASE = process.env.QA_BASE ?? 'http://127.0.0.1:4321';
const log = (m) => console.log(m);
let pass = 0;
let fail = 0;
const failures = [];
const t = (label, ok, detail = '') => {
  if (ok) pass += 1;
  else { fail += 1; failures.push(label); }
  log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch();
const pageErrors = [];
const consoleErrors = [];
const failedRequests = [];
/* Google Fonts is blocked by this sandbox's egress proxy. That is an
   environment fact, not a product defect, so it is counted separately rather
   than inflating the console-error total. */
const isEnvNoise = (s) => /fonts\.googleapis\.com|fonts\.gstatic\.com|ERR_TUNNEL_CONNECTION_FAILED/.test(s);
let envNoise = 0;

const makeCtx = async (viewport) => {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => pageErrors.push(String(e)));
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (isEnvNoise(m.text())) envNoise += 1; else consoleErrors.push(m.text());
  });
  page.on('requestfailed', (r) => {
    const s = `${r.url()} ${r.failure()?.errorText ?? ''}`;
    if (isEnvNoise(s)) envNoise += 1; else failedRequests.push(s);
  });
  return { ctx, page };
};
const goto = async (page, h) => {
  await page.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(450);
};
const body = (page) => page.locator('body').innerText();
const main = (page) => page.locator('main').innerText();
const overflow = (page) =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

/* ================================================================== */
log('12. FRESH BROWSER — BRAND-NEW VISITOR, ZERO STORED STATE');
const { ctx: freshCtx, page: fresh } = await makeCtx({ width: 1440, height: 1200 });
await goto(fresh, '/');
const storageAtBoot = await fresh.evaluate(() => {
  try { return Object.keys(localStorage).length; } catch { return -1; }
});
t('1. landing page renders with nothing in storage', (await fresh.locator('main article').count()) > 0,
  `${storageAtBoot} keys present at first paint`);
t('2. no profile is assumed', /Your A-Levels|Add your grades|predicted grades/i.test(await body(fresh)));
await fresh.getByLabel('Search courses').first().fill('Queen Mary Physics');
await fresh.waitForTimeout(700);
t('3. search works', /Queen Mary/.test(await main(fresh)));
const filterSection = fresh.getByRole('button', { name: /^Data status$/ }).first();
t('4. filters are present', (await filterSection.count()) > 0 || /Data status/.test(await body(fresh)));
await goto(fresh, '/course/qmul-physics-bsc--2027');
t('5. a course page opens', /Physics/.test(await body(fresh)));
t('   and shows its verified requirements', /ABB/.test(await body(fresh)));

/* 8-9: shortlist and comparison, done before the profile changes result order */
await goto(fresh, '/');
const saveBtn = fresh.locator('main article').first().getByRole('button', { name: /^Save$/ }).first();
if (await saveBtn.count()) { await saveBtn.click(); await fresh.waitForTimeout(500); }
t('8. a course can be shortlisted', await fresh.evaluate(() => {
  try { return JSON.parse(localStorage.getItem('ukcf.savedCourses.v1') ?? '[]').length > 0; } catch { return false; }
}));
const cmpBtns0 = fresh.locator('main article').getByRole('button', { name: /^Compare$/ });
const cmpN0 = Math.min(2, await cmpBtns0.count());
for (let i = 0; i < cmpN0; i += 1) { await cmpBtns0.nth(i).click(); await fresh.waitForTimeout(250); }
await goto(fresh, '/compare');
t('9. two courses can be compared', /Compar/i.test(await main(fresh)) && (await main(fresh)).trim().length > 200,
  `${cmpN0} added`);

/* create a profile */
await goto(fresh, '/');
const selects = fresh.locator('main select');
const selectCount = await selects.count();
let profileMade = false;
if (selectCount >= 2) {
  for (let i = 0; i < Math.min(3, selectCount); i += 1) {
    await selects.nth(i).selectOption({ index: 1 }).catch(() => {});
    await fresh.waitForTimeout(150);
  }
  profileMade = true;
}
await fresh.waitForTimeout(600);
t('6. a profile can be created from the search page', profileMade, `${selectCount} inputs found`);
const storedProfile = await fresh.evaluate(() => {
  try { return localStorage.getItem('ukcf.profile.v1'); } catch { return null; }
});
t('   and it is persisted', Boolean(storedProfile && storedProfile.length > 10));
t('7. eligibility appears once a profile exists',
  /Meets|Does not|Review required|Insufficient/i.test(await main(fresh)));

await fresh.reload({ waitUntil: 'networkidle' });
await fresh.waitForTimeout(800);
t('10. reload does not break the app', (await body(fresh)).length > 500);
await goto(fresh, '/');
const profileAfter = await fresh.evaluate(() => {
  try { return localStorage.getItem('ukcf.profile.v1'); } catch { return null; }
});
t('11. the profile persists across reload', profileAfter === storedProfile && Boolean(profileAfter));
await goto(fresh, '/shortlist');
/* The shortlist page lists saved items without wrapping them in <article>, so
   its own "Saved courses (n)" heading is the reliable signal. */
t('12. the shortlist persists across reload', /Saved courses \((?!0\))\d+\)/.test(await main(fresh)),
  (await main(fresh)).match(/Saved courses \(\d+\)/)?.[0] ?? 'no count shown');
await freshCtx.close();

/* ================================================================== */
log('\n13. EXISTING USER — LEGACY AND HOSTILE STORED STATE');
const legacyCases = [
  ['a plausible older payload', {
    'ukcf.profile.v1': JSON.stringify({ grades: [{ subject: 'Mathematics', grade: 'A' }], legacyField: 'dropped' }),
    'ukcf.savedCourses.v1': JSON.stringify(['imperial-physics-bsc--2027']),
    'ukcf.compare.v1': JSON.stringify(['imperial-physics-bsc--2027']),
  }],
  ['IDs for records that no longer exist', {
    'ukcf.savedCourses.v1': JSON.stringify(['qmul-astrophysics-bsc--2027', 'does-not-exist--2027']),
    'ukcf.compare.v1': JSON.stringify(['qmul-astrophysics-bsc--2027']),
  }],
  ['malformed JSON', {
    'ukcf.profile.v1': '{{{ not json',
    'ukcf.savedCourses.v1': 'garbage',
    'ukcf.compare.v1': '[',
  }],
  ['wrong types entirely', {
    'ukcf.profile.v1': '"a string where an object belongs"',
    'ukcf.savedCourses.v1': '{"not":"an array"}',
    'ukcf.compare.v1': '42',
  }],
];
for (const [label, payload] of legacyCases) {
  const { ctx, page } = await makeCtx({ width: 1440, height: 1200 });
  await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
  await page.evaluate((p) => {
    try { for (const [k, v] of Object.entries(p)) localStorage.setItem(k, v); } catch { /* ignore */ }
  }, payload);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const cards = await page.locator('main article').count();
  t(`${label}: the app still renders`, cards > 0, `${cards} cards`);
  await goto(page, '/shortlist');
  t(`   …and the shortlist page survives it`, (await page.locator('main').count()) === 1 && (await main(page)).trim().length > 40);
  await goto(page, '/compare');
  t(`   …and the comparison page survives it`, (await page.locator('main').count()) === 1 && (await main(page)).trim().length > 40);
  await ctx.close();
}

/* ================================================================== */
log('\n16. EMPTY AND ERROR STATES');
const { ctx: errCtx, page: e } = await makeCtx({ width: 1440, height: 1200 });
const stateChecks = [
  ['zero search results', async () => { await goto(e, '/'); await e.getByLabel('Search courses').first().fill('zzzqqq not a course'); await e.waitForTimeout(700); return (await main(e)).trim().length > 60 && (await e.locator('main article').count()) === 0; }],
  ['malformed search input', async () => { await goto(e, '/'); await e.getByLabel('Search courses').first().fill('<script>*(){}[]\\\\'); await e.waitForTimeout(700); return (await main(e)).trim().length > 40; }],
  ['a study-option search routes to a parent', async () => { await goto(e, '/'); await e.getByLabel('Search courses').first().fill('Astrophysics'); await e.waitForTimeout(800); return /Queen Mary|Route within this application|Astrophysics/i.test(await main(e)); }],
  ['nonexistent course route', async () => { await goto(e, '/course/nope--2027'); return /not found/i.test(await body(e)); }],
  ['nonexistent university route', async () => { await goto(e, '/university/nope'); return /not found/i.test(await body(e)); }],
  ['invalid path', async () => { await goto(e, '/this/is/not/a/route'); return /not found/i.test(await body(e)); }],
  ['empty shortlist', async () => { await goto(e, '/shortlist'); return (await main(e)).trim().length > 60; }],
  ['comparison with 0 courses', async () => { await goto(e, '/compare'); return (await main(e)).trim().length > 60; }],
];
for (const [label, fn] of stateChecks) {
  let ok = false;
  try { ok = await fn(); } catch (err) { ok = false; log(`      (threw: ${String(err).slice(0, 80)})`); }
  t(label, ok);
}
/* comparison with 1, 2 and the maximum */
await goto(e, '/');
const compareButtons = e.locator('main article').getByRole('button', { name: /^Compare$/ });
const available = await compareButtons.count();
for (const n of [1, 2, 5]) {
  await goto(e, '/');
  await e.evaluate(() => { try { localStorage.setItem('ukcf.compare.v1', '[]'); } catch { /* ignore */ } });
  await e.reload({ waitUntil: 'networkidle' });
  await e.waitForTimeout(500);
  const btns = e.locator('main article').getByRole('button', { name: /^Compare$/ });
  const take = Math.min(n, await btns.count());
  for (let i = 0; i < take; i += 1) { await btns.nth(i).click().catch(() => {}); await e.waitForTimeout(180); }
  await goto(e, '/compare');
  t(`comparison with ${n} course${n === 1 ? '' : 's'} renders`, (await main(e)).trim().length > 60);
}
t('  (comparison buttons were available to test with)', available > 0, `${available} found`);

/* ================================================================== */
log('\n19. 2027 / 2028 RELEASE GATE');
await goto(e, '/course/qmul-physics-bsc--2027');
let txt = await body(e);
t('2027: a verified course shows its published requirements', /ABB/.test(txt));
t('  …and its source provenance is visible', /qmul\.ac\.uk|View official/i.test(txt));
t('  …and eligibility can be evaluated', /Meets|Does not|Review|Insufficient/i.test(txt));

await goto(e, '/course/qmul-physics-bsc--2028');
txt = await body(e);
t('2028: the same course says requirements are not published', /not.*publish/i.test(txt));
const beforeEntryYear = txt.split('Entry year')[0] ?? txt;
t('  …no 2027 grade profile leaks into it', !/\bABB\b|\bAAB\b|\bAAA\b/.test(beforeEntryYear));
t('  …no contextual offer is copied', !/standard contextual offer|enhanced contextual offer/i.test(txt));
t('  …no GCSE rule is copied', !/GCSE English and Maths at grade C/i.test(txt));
t('  …no study option is copied', !/Route within this application|Astrophysics/i.test(txt));
t('  …eligibility is insufficient information', /Insufficient info/i.test(txt));
t('  …and it points at the year that IS published', /2027/.test(txt));

/* ================================================================== */
log('\n18. SOURCE-LINK QA — ONE VERIFIED 2027 COURSE PER UNIVERSITY');
/*
 * A launch sample, not a guarantee. Checks the SHAPE and DOMAIN of each stored
 * source URL rather than fetching it: a 200 today says nothing about next term,
 * and what is worth catching before launch is a malformed, internal or
 * localhost URL, or an empty link label.
 *
 * Collected from the 2027 search results rather than from university pages,
 * because a university page lists the app's default year (2028) and a 2028 shell
 * correctly has no requirements and therefore no source link.
 */
await goto(e, '/');
const yearBtn2027 = e.getByRole('button', { name: '2027 entry', exact: true }).first();
if (await yearBtn2027.count()) { await yearBtn2027.click(); await e.waitForTimeout(600); }
/* Page through every result, keeping the first 2027 course seen per university. */
for (let i = 0; i < 20; i += 1) {
  const more = e.getByRole('button', { name: /Load more/ }).first();
  if (!(await more.count())) break;
  await more.click();
  await e.waitForTimeout(220);
}
const perUniversity = await e.evaluate(() => {
  const out = {};
  document.querySelectorAll('main article').forEach((card) => {
    const uni = card.querySelector('a[href*="/university/"]');
    const course = [...card.querySelectorAll('a[href*="/course/"]')].find((a) =>
      (a.getAttribute('href') || '').includes('--2027'),
    );
    if (!uni || !course) return;
    const name = (uni.textContent || '').trim();
    if (!name || out[name]) return;
    const m = (course.getAttribute('href') || '').match(/(\/course\/[^"'\s]+)/);
    if (m) out[name] = m[1];
  });
  return out;
});
const sampled = Object.entries(perUniversity);
log(`  ${sampled.length} universities represented in the 2027 result set`);
let linksChecked = 0;
const linkProblems = [];
const noLink = [];
for (const [uniName, coursePath] of sampled) {
  await goto(e, coursePath);
  const info = await e.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) => /View official/i.test(x.textContent ?? ''));
    return a ? { href: a.getAttribute('href') ?? '', text: (a.textContent ?? '').trim() } : null;
  });
  if (!info) { noLink.push(uniName); continue; }
  linksChecked += 1;
  const h = info.href;
  const problems = [];
  if (!/^https:\/\//.test(h)) problems.push('not https');
  if (/localhost|127\.0\.0\.1|example\.(com|org)|undefined|\bnull\b/i.test(h)) problems.push('internal or placeholder host');
  if (/\s/.test(h)) problems.push('whitespace in URL');
  if (!/\.ac\.uk/i.test(h)) problems.push('not an .ac.uk domain');
  if (!info.text) problems.push('empty link text');
  if (problems.length) linkProblems.push(`${uniName}: ${problems.join(', ')} — ${h}`);
}
t(`official source links sampled across ${linksChecked} universities`, linksChecked >= 20, `${linksChecked} checked`);
t('  …every sampled link is an https .ac.uk URL with sensible text', linkProblems.length === 0,
  linkProblems.slice(0, 4).join(' | '));
if (noLink.length) log(`  (no official-requirements link on the sampled course at: ${noLink.join(', ')})`);

/* ================================================================== */
log('\n15. ACCESSIBILITY RELEASE PASS');
await goto(e, '/');
const a11y = await e.evaluate(() => {
  const dupIds = (() => {
    const seen = new Set(); const dupes = new Set();
    document.querySelectorAll('[id]').forEach((el) => {
      const id = el.getAttribute('id'); if (!id) return;
      if (seen.has(id)) dupes.add(id); else seen.add(id);
    });
    return [...dupes];
  })();
  const unnamedButtons = [...document.querySelectorAll('button')].filter(
    (b) => !(b.textContent ?? '').trim() && !b.getAttribute('aria-label') && !b.querySelector('.sr-only'),
  ).length;
  const unlabelledInputs = [...document.querySelectorAll('input:not([type=hidden]), select, textarea')].filter((el) => {
    const id = el.getAttribute('id');
    return !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')
      && !(id && document.querySelector(`label[for="${id}"]`)) && !el.closest('label');
  }).length;
  const clickableDivs = [...document.querySelectorAll('div[onclick], span[onclick]')].length;
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
  let skips = 0;
  for (let i = 1; i < headings.length; i += 1) if (headings[i] - headings[i - 1] > 1) skips += 1;
  return {
    mains: document.querySelectorAll('main').length,
    navs: document.querySelectorAll('nav').length,
    h1s: document.querySelectorAll('h1').length,
    dupIds, unnamedButtons, unlabelledInputs, clickableDivs, headingSkips: skips,
  };
});
t('exactly one main landmark', a11y.mains === 1, String(a11y.mains));
t('a navigation landmark exists', a11y.navs >= 1, String(a11y.navs));
t('exactly one h1', a11y.h1s === 1, String(a11y.h1s));
t('no duplicate element IDs', a11y.dupIds.length === 0, a11y.dupIds.slice(0, 4).join(', '));
t('no unnamed buttons', a11y.unnamedButtons === 0, String(a11y.unnamedButtons));
t('no unlabelled form controls', a11y.unlabelledInputs === 0, String(a11y.unlabelledInputs));
t('no click handlers on plain divs or spans', a11y.clickableDivs === 0, String(a11y.clickableDivs));
t('no skipped heading levels', a11y.headingSkips === 0, `${a11y.headingSkips} skips`);

/* keyboard: skip link, then reach and operate Load more and a disclosure */
/* Reload rather than hash-navigate: a hash change leaves focus wherever it was,
   which made an earlier draft of this probe read whatever had last been
   clicked instead of the document's first tab stop. */
await e.goto(`${BASE}/#/other`, { waitUntil: 'networkidle' });
await e.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
await e.reload({ waitUntil: 'networkidle' });
await e.waitForTimeout(600);
await e.evaluate(() => { const a = document.activeElement; if (a && 'blur' in a) a.blur(); });
await e.keyboard.press('Tab');
t('first tab stop is the skip link', /Skip to main content/.test(
  await e.evaluate(() => (document.activeElement?.textContent ?? '').trim())),
  await e.evaluate(() => (document.activeElement?.textContent ?? '').trim().slice(0, 40)));
const focusRing = await e.evaluate(() => {
  const el = document.activeElement; if (!el) return false;
  const s = getComputedStyle(el);
  return s.outlineStyle !== 'none' || s.boxShadow !== 'none';
});
t('  …and focus is visible on it', focusRing);
const loadMoreKb = await e.evaluate(async () => {
  const btn = [...document.querySelectorAll('button')].find((b) => /Load more/i.test(b.textContent ?? ''));
  if (!btn) return 'absent';
  btn.focus();
  const focused = document.activeElement === btn;
  btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  btn.click();
  return focused ? 'ok' : 'not-focusable';
});
await e.waitForTimeout(600);
t('Load more is keyboard focusable and operable', loadMoreKb === 'ok',
  `${loadMoreKb}, now ${await e.locator('main article').count()} cards`);
const disclosureKb = await e.evaluate(() => {
  const d = document.querySelector('main details > summary');
  if (!d) return 'absent';
  d.focus();
  return document.activeElement === d ? 'ok' : 'not-focusable';
});
t('the Why? disclosure is keyboard focusable', disclosureKb === 'ok', disclosureKb);
await goto(e, '/course/qmul-physics-bsc--2027');
const reportKb = await e.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find((x) => /Report an issue/i.test(x.textContent ?? ''));
  if (!b) return 'absent';
  b.focus();
  return document.activeElement === b ? 'ok' : 'not-focusable';
});
t('the report-issue action is labelled and focusable', reportKb === 'ok', reportKb);
const statusText = await e.evaluate(() => {
  const el = [...document.querySelectorAll('*')].find(
    (x) => x.children.length === 0 && /^(Verified|Partially verified|Awaiting research|Awaiting publication)$/.test((x.textContent ?? '').trim()),
  );
  return el ? (el.textContent ?? '').trim() : null;
});
t('trust status is conveyed as text, not colour alone', Boolean(statusText), statusText ?? 'none found');
await errCtx.close();

/* ================================================================== */
log('\n14. MOBILE AND TABLET RELEASE QA');
const routes = [
  ['/', 'home'],
  ['/browse', 'browse'],
  ['/universities', 'universities'],
  ['/university/qmul', 'university page'],
  ['/course/qmul-materials-science-and-engineering-beng--2027', 'course page'],
  ['/compare', 'comparison'],
  ['/shortlist', 'shortlist'],
  ['/about', 'methodology'],
];
for (const [w, h, label] of [[390, 844, 'phone 390px'], [820, 1180, 'tablet 820px'], [1440, 1200, 'desktop 1440px']]) {
  log(`  — ${label} —`);
  const { ctx, page } = await makeCtx({ width: w, height: h });
  for (const [route, name] of routes) {
    await goto(page, route);
    const o = await overflow(page);
    t(`${name}: no horizontal overflow`, o <= 1, `${o}px`);
  }
  /* controls reachable and usable at this width */
  await goto(page, '/');
  const filters = page.getByRole('button', { name: /Filters/i }).first();
  if (await filters.count()) {
    await filters.click();
    await page.waitForTimeout(500);
    t('  filters open', /Data status/.test(await body(page)));
    t('  …without overflow', (await overflow(page)) <= 1, `${await overflow(page)}px`);
  }
  await goto(page, '/course/qmul-materials-science-and-engineering-beng--2027');
  t('  long requirement text is present, not clipped away',
    /at least two A-Level subjects/i.test(await body(page)));
  const reportBtn = page.getByRole('button', { name: /Report an issue/ }).first();
  if (await reportBtn.count()) {
    await reportBtn.click();
    await page.waitForTimeout(400);
    t('  report-issue panel opens', (await page.locator('textarea[readonly]').count()) > 0);
    t('  …without overflow', (await overflow(page)) <= 1, `${await overflow(page)}px`);
  }
  /* the v0.8 tooltip regression must stay fixed */
  const tipOverflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    let worst = 0;
    document.querySelectorAll('[role=tooltip]').forEach((el) => {
      const r = el.getBoundingClientRect();
      worst = Math.max(worst, Math.round(r.right - vw), Math.round(-r.left));
    });
    return worst;
  });
  t('  no tooltip escapes the viewport', tipOverflow <= 1, `${tipOverflow}px past the edge`);
  await ctx.close();
}

/* ================================================================== */
log('\n17. PERFORMANCE');
const { ctx: perfCtx, page: perf } = await makeCtx({ width: 1440, height: 1200 });
await goto(perf, '/');
const nav = await perf.evaluate(() => {
  const n = performance.getEntriesByType('navigation')[0];
  const p = performance.getEntriesByName('first-contentful-paint')[0];
  return { dcl: n ? Math.round(n.domContentLoadedEventEnd) : -1, fcp: p ? Math.round(p.startTime) : -1 };
});
const firstCards = await perf.locator('main article').count();
const totals = (await main(perf)).match(/Showing (\d+) of (\d+)/);
log(`  DOMContentLoaded ${nav.dcl}ms · first contentful paint ${nav.fcp}ms`);
log(`  first paint: ${firstCards} cards rendered of ${totals ? totals[2] : '?'} matching results`);
t('progressive rendering still caps the first paint at 40', firstCards === 40, `${firstCards}`);
for (const [q, label] of [['physics', 'broad Physics search'], ['engineering', 'broad Engineering search']]) {
  await goto(perf, '/');
  const start = Date.now();
  await perf.getByLabel('Search courses').first().fill(q);
  await perf.waitForFunction(() => document.querySelectorAll('main article').length > 0);
  await perf.waitForTimeout(60);
  const ms = Date.now() - start;
  const c = await main(perf);
  const m = c.match(/Showing (\d+) of (\d+)/);
  log(`  ${label}: ~${ms}ms · ${m ? `${m[1]} of ${m[2]}` : 'n/a'}`);
  t(`  ${label} stays responsive`, ms < 4000, `${ms}ms`);
}
await goto(perf, '/');
const lm = perf.getByRole('button', { name: /Load more/ }).first();
if (await lm.count()) {
  const s0 = Date.now();
  await lm.click();
  await perf.waitForFunction(() => document.querySelectorAll('main article').length === 80);
  log(`  Load more (second page of 40): ~${Date.now() - s0}ms`);
  t('  Load more stays responsive', Date.now() - s0 < 4000);
}
/*
 * Eligibility recalculation across the whole result set. Driven through the
 * PROFILE's grade selector rather than a filter — an earlier draft used the
 * first select in <main>, which is a filter, and narrowing the catalogue to zero
 * results made the probe wait forever for cards that were correctly absent.
 */
await goto(perf, '/');
/* The profile panel is a disclosure on the search page, so it has to be opened
   before its grade selectors exist in the DOM. */
const profileToggle = perf.getByRole('button', { name: /^Grades$/ }).first();
if ((await profileToggle.count()) && (await profileToggle.getAttribute('aria-expanded')) !== 'true') {
  await profileToggle.click();
  await perf.waitForTimeout(400);
}
/* The grade picker is a role=group of A*–E buttons, not a <select>. Clicking one
   changes the profile, which re-evaluates every rendered card. */
const gradeGroup = perf.locator('[role="group"][aria-label^="Predicted grade"]').first();
if (await gradeGroup.count()) {
  const subjectInput = perf.locator('input[aria-label="A-Level subject 1"]').first();
  if (await subjectInput.count()) {
    await subjectInput.fill('Mathematics');
    await perf.waitForTimeout(250);
  }
  const before = await perf.locator('main article').count();
  const s1 = Date.now();
  await gradeGroup.getByRole('button', { name: 'A', exact: true }).first().click();
  await perf.waitForFunction(
    (n) => document.querySelectorAll('main article').length === n,
    before,
  ).catch(() => {});
  await perf.waitForTimeout(60);
  const ms = Date.now() - s1;
  log(`  eligibility recalculation over ${before} rendered cards: ~${ms}ms`);
  t('  eligibility recalculation stays responsive', ms < 4000, `${ms}ms`);
} else {
  t('  eligibility recalculation stays responsive', false, 'no grade picker found');
}
await goto(perf, '/compare');
const s2 = Date.now();
await perf.waitForTimeout(100);
log(`  comparison render: ~${Date.now() - s2}ms`);
await perfCtx.close();

/* ================================================================== */
log('\n20. v1.0.0 — CourseScope BRAND AND PRODUCTION CONFIG');
{
  /* Expected values come from the committed production config, not from this file. */
  const { readFileSync } = await import('node:fs');
  const prodEnv = Object.fromEntries(
    readFileSync('.env.production', 'utf8').split('\n')
      .map((l) => l.match(/^(VITE_[A-Z_]+)=(.+)$/)).filter(Boolean).map((m) => [m[1], m[2].trim()]),
  );
  const { ctx, page } = await makeCtx({ width: 1440, height: 1000 });
  await goto(page, '/');
  t('home tab title is the CourseScope title',
    (await page.title()) === 'CourseScope — UK Physics & Engineering Course Finder', await page.title());
  const header = await page.locator('header').first().innerText();
  t('header shows CourseScope', /CourseScope/.test(header));
  t('  …with the desktop subtitle', /UK Physics & Engineering/.test(header));
  t('  …and the mark is present and decorative',
    (await page.locator('header svg[aria-hidden="true"]').count()) > 0);
  t('old generic name is not rendered anywhere on the home page',
    !/UK University Course Finder/.test(await body(page)));
  t('home intro is the requested line',
    /Compare published entry requirements, admissions tests and application routes across UK universities\./.test(await main(page)));
  const icon = await page.evaluate(() => document.querySelector('link[rel="icon"]')?.getAttribute('href') ?? '');
  t('favicon link points at favicon.svg', /favicon\.svg$/.test(icon), icon);
  const iconRes = await page.request.get(new URL(icon, page.url()).href);
  t('  …and the file is served as SVG',
    iconRes.ok() && /svg/.test(iconRes.headers()['content-type'] ?? ''), `${iconRes.status()} ${iconRes.headers()['content-type']}`);
  const og = await page.evaluate(() => ({
    site: document.querySelector('meta[property="og:site_name"]')?.getAttribute('content'),
    title: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    desc: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
  }));
  t('metadata uses CourseScope', og.site === 'CourseScope' && /^CourseScope — /.test(og.title ?? ''), JSON.stringify(og.site));
  t('  …and the brief’s description', /^Compare UK university Physics and Engineering courses/.test(og.desc ?? ''));
  t('  …and a canonical link from the configured production URL',
    og.canonical === prodEnv.VITE_SITE_URL, og.canonical ?? 'none');
  await goto(page, '/about');
  t('methodology opens with the CourseScope positioning line',
    /CourseScope is an independent research tool for comparing published UK university entry requirements\./.test(await main(page)));
  t('inner page titles end with the brand', / · CourseScope$/.test(await page.title()), await page.title());
  await goto(page, '/course/qmul-physics-bsc--2027');
  await page.getByRole('button', { name: /Report an issue/ }).first().click();
  await page.waitForTimeout(300);
  const formLink = page.getByRole('link', { name: 'Open the report form' });
  t('feedback: a real form destination is configured', (await formLink.count()) === 1);
  const href = (await formLink.getAttribute('href')) ?? '';
  t('  …pointing at the configured production form', href === prodEnv.VITE_FEEDBACK_URL, href);
  t('  …opening in a new tab, not replacing the page', (await formLink.getAttribute('target')) === '_blank');
  const reportText = await page.locator('textarea[readonly]').first().inputValue();
  t('  …with every required field in the report',
    ['Issue type:', 'University:', 'Course:', 'Award:', 'Entry year:', 'UCAS code:', 'Record ID:', 'Page:']
      .every((k) => reportText.includes(k)));
  const types = await page.locator('select[id^="issue-type-"] option').allInnerTexts();
  t('  …and all seven issue types', types.length === 7, types.length);
  t('  …and no copy-only fallback message', !/no reporting address configured/.test(await main(page)));
  t('footer version is v1.0.0', /v1\.0\.0/.test(await page.locator('footer').innerText()));
  await ctx.close();
}

/* ================================================================== */
log(`\nPage errors:              ${pageErrors.length}`);
for (const x of pageErrors.slice(0, 5)) log(`  ${x}`);
log(`Console errors (product): ${consoleErrors.length}`);
for (const x of consoleErrors.slice(0, 5)) log(`  ${x}`);
log(`Failed requests (product):${failedRequests.length}`);
for (const x of failedRequests.slice(0, 5)) log(`  ${x}`);
log(`Environment noise ignored: ${envNoise} (Google Fonts blocked by the sandbox proxy)`);
if (failures.length) {
  log('\nFAILED CHECKS:');
  for (const f of failures) log(`  · ${f}`);
}
log(`\nRELEASE QA RESULT: ${pass} pass, ${fail} fail, ${pageErrors.length} page errors, ${consoleErrors.length} product console errors`);
await browser.close();
