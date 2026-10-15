// v2 Phase 5 QA: user journeys across the redesigned pages, keyboard, reduced motion,
// phone layouts. Needs a preview server on 4321 and global Playwright.
import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const BASE = 'http://127.0.0.1:4321'; const b = await chromium.launch();
let pass = 0, fail = 0;
const t = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };
const prof = { aLevels: [{ id: '1', subject: 'Mathematics', grade: 'A*' }, { id: '2', subject: 'Physics', grade: 'A' }, { id: '3', subject: 'Further Mathematics', grade: 'A' }, { id: '4', subject: 'Chemistry', grade: 'B' }], gcses: [], applicationYear: '2027', schoolOffersFurtherMathematics: true, notes: '' };
const mk = async (init = {}, vp = { width: 1280, height: 900 }, opts = {}) => {
  const ctx = await b.newContext({ viewport: vp, ...opts }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  if (Object.keys(init).length) await p.addInitScript((o) => { for (const [k, v] of Object.entries(o)) localStorage.setItem(k, v); }, init);
  p.errs = errs; return { ctx, p };
};
const go = async (p, h) => { await p.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500); };
const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const hashOf = (p) => p.evaluate(() => location.hash);
const PROF = { 'ukcf.profile.v1': JSON.stringify(prof) };

/* A. Journey: search → filter → open a course → ledger → save → compare */
{
  const { ctx, p } = await mk(PROF); await go(p, '/search');
  await p.getByLabel('Search courses').first().fill('Physics Durham'); await p.waitForTimeout(800);
  const cards = await p.locator('main article').count();
  t('journey: searching narrows the results and keeps the page alive', cards > 0 && cards < 40, `${cards} cards`);
  t('  …every shown course shows a verification status in words', await p.locator('main article').evaluateAll((a) => a.every((x) => /Verified|Awaiting|Partially|Not verified|Not yet published|waiting/i.test(x.innerText))));
  const first = p.locator('main article').first();
  await first.getByRole('button', { name: /^Save$/ }).click();
  t('  …saving flips the control to Saved (aria-pressed)', (await first.getByRole('button', { name: /^Saved$/ }).getAttribute('aria-pressed')) === 'true');
  await p.locator('main article').nth(0).getByRole('button', { name: /^Compare$/ }).click();
  await p.locator('main article').nth(1).getByRole('button', { name: /^Compare$/ }).click();
  t('  …two courses chosen puts the tray on screen', (await p.getByRole('region', { name: 'Comparison' }).count()) === 1);
  await p.getByRole('region', { name: 'Comparison' }).getByRole('link', { name: /Compare/ }).first().click().catch(() => {});
  await p.waitForTimeout(600);
  if (!(await hashOf(p)).startsWith('#/compare')) await go(p, '/compare');
  t('  …the comparison page shows the difference strip and the full table', (await p.locator('section.ds').count()) === 1 && (await p.locator('.cmp-table').count()) >= 1);
  await go(p, '/shortlist');
  t('  …the saved course is on the shortlist', (await p.locator('.sl-row').count()) === 1);
  await p.locator('.sl-row').first().locator('a[href*="/course/"]').first().click(); await p.waitForTimeout(600);
  t('  …opening it from the shortlist reaches the course page with its ledger', (await hashOf(p)).startsWith('#/course/') && (await p.getByTestId('requirement-ledger').count()) === 1);
  t('  …no script errors on the journey', p.errs.length === 0, p.errs.join('|'));
  await ctx.close();
}

/* B. Journey: entry year, universities */
{
  const { ctx, p } = await mk(PROF); await go(p, '/university/imperial');
  const n27 = await p.locator('main article').count();
  t('university: 2027 lists Imperial courses', n27 > 5, `${n27}`);
  t('  …header states how many are read, awaiting or unpublished', /requirements read from the university/.test(await p.locator('.ud-facts').innerText()));
  const seg = p.locator('.ud-seg');
  await seg.getByRole('button', { name: /^Physics/ }).click(); await p.waitForTimeout(300);
  const nPhys = await p.locator('main article').count();
  t('  …the Physics filter shows only Physics courses', nPhys > 0 && nPhys < n27 && (await seg.getByRole('button', { name: /^Physics/ }).getAttribute('aria-pressed')) === 'true', `${nPhys} of ${n27}`);
  await seg.getByRole('button', { name: /^All/ }).click(); await p.waitForTimeout(300);
  t('  …All restores the list', (await p.locator('main article').count()) === n27);
  // keyboard: segmented control is reachable and operable
  await seg.getByRole('button', { name: /^Engineering/ }).focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(250);
  t('  …the segmented control works from the keyboard', (await seg.getByRole('button', { name: /^Engineering/ }).getAttribute('aria-pressed')) === 'true');
  await p.getByRole('button', { name: /Save university/ }).click();
  t('  …save university toggles', (await p.getByRole('button', { name: /^Saved$/ }).getAttribute('aria-pressed')) === 'true');
  await go(p, '/universities');
  await p.locator('a[href*="/university/"]').nth(3).click(); await p.waitForTimeout(500);
  t('  …navigating from the university list to another university works', (await hashOf(p)).startsWith('#/university/') && !(await hashOf(p)).endsWith('/imperial'));
  await go(p, '/university/imperial'); await p.evaluate(() => { localStorage.setItem('ukcf.entryYear.v1', JSON.stringify('2028')); });
  const { ctx: c2, p: p2 } = await mk({ 'ukcf.entryYear.v1': JSON.stringify('2028') }); await go(p2, '/university/imperial');
  t('  …switching to 2028 changes the record set (requirements not yet published)', /not yet published|2028/.test(await p2.locator('.ud-facts').innerText()), (await p2.locator('.ud-facts').innerText()).slice(0, 120));
  await c2.close(); await ctx.close();
}

/* C. Visualisations on a phone */
{
  const { ctx, p } = await mk({}, { width: 390, height: 844 }, { isMobile: true, hasTouch: true }); await go(p, '/about');
  const cm = p.getByTestId('coverage-matrix');
  const sw = await cm.locator('.cm-scroll').evaluate((e) => e.scrollWidth - e.clientWidth);
  t('coverage matrix on a phone needs no sideways scrolling', sw <= 1, `${sw}px`);
  const blocks = await cm.locator('tbody tr').count();
  t('  …all universities are still present, one block each', blocks === 22, `${blocks}`);
  t('  …every shown tile group is labelled with its column', await cm.locator('tbody td:not([data-total="0"])').evaluateAll((c) => c.every((x) => getComputedStyle(x, '::before').content.length > 2)));
  const rowCells = await cm.locator('tbody tr').first().locator('td').count();
  t('  …cells keep column labels for assistive tech (table roles retained)', (await cm.locator('table[role=table]').count()) === 1 && rowCells >= 2);
  await go(p, '/search');
  await p.locator('.ol-toggle').click(); await p.waitForTimeout(400);
  t('offer ladder on a phone states what it does not show', /alternative offer|another offer/i.test(await p.locator('.ol-limits').innerText()));
  await p.getByRole('button', { name: 'Show as a table' }).click(); await p.waitForTimeout(300);
  t('  …its table alternative stacks without sideways scrolling', (await overflow(p)) === 0 && (await p.locator('.ol-table-wrap').evaluate((e) => e.scrollWidth - e.clientWidth)) <= 1);
  await ctx.close();
}

/* D. No horizontal overflow, every route, three phone/tablet widths */
{
  const routes = ['/', '/search?q=physics', '/browse', '/universities', '/university/durham', '/course/ucl-physics-bsc--2027', '/compare', '/shortlist', '/about'];
  const seed = { ...PROF, 'ukcf.savedCourses.v1': JSON.stringify(['ucl-physics-bsc--2027', 'durham-physics-bsc--2027']), 'ukcf.compare.v1': JSON.stringify(['ucl-physics-bsc--2027', 'durham-physics-bsc--2027', 'imperial-physics-msci--2027']) };
  for (const w of [320, 390, 768]) {
    const { ctx, p } = await mk(seed, { width: w, height: 800 });
    const bad = [];
    for (const r of routes) { await go(p, r); const o = await overflow(p); if (o > 0) bad.push(`${r} +${o}`); }
    t(`no horizontal overflow on any route at ${w}px`, bad.length === 0 && p.errs.length === 0, bad.join(', ') + p.errs.join('|'));
    await ctx.close();
  }
}

/* E. Reduced motion and the motion vocabulary */
{
  const anim = (p, sel) => p.locator(sel).first().evaluate((e) => getComputedStyle(e).animationName);
  let { ctx, p } = await mk(PROF, { width: 1280, height: 900 }, { reducedMotion: 'reduce' }); await go(p, '/university/imperial');
  const dur = await p.evaluate(() => { const e = document.querySelector('.row'); return getComputedStyle(e).animationName; });
  const names = [];
  for (const sel of ['.row', '.ud-group', '#content > *']) names.push(await anim(p, sel));
  t('reduced motion: rows, groups and the route fade do not animate', names.every((n) => n === 'none'), names.join());
  await p.locator('.btn-secondary').first().hover(); await p.mouse.down();
  t('  …and presses do not scale', (await p.locator('.btn-secondary').first().evaluate((e) => getComputedStyle(e).transform)) === 'none'); await p.mouse.up();
  await ctx.close();
  for (const rm of ['reduce', 'no-preference']) {
    const m = await mk({ 'ukcf.compare.v1': JSON.stringify(['ucl-physics-bsc--2027', 'durham-physics-bsc--2027']) }, { width: 1280, height: 900 }, { reducedMotion: rm });
    await go(m.p, '/search'); await m.p.waitForTimeout(500);
    const r = await m.p.locator('.tray').boundingBox();
    t(`comparison tray is centred and fully on screen (reducedMotion: ${rm})`, r && r.x >= 0 && r.x + r.width <= 1280 && Math.abs(r.x + r.width / 2 - 640) < 2, JSON.stringify(r));
    await m.ctx.close();
  }
  ({ ctx, p } = await mk(PROF, { width: 1280, height: 900 }, { reducedMotion: 'no-preference' })); await go(p, '/university/imperial');
  const on = await anim(p, '.ud-group');
  t('no preference: the same elements do animate (the vocabulary is live)', on === 'arrive', on);
  await ctx.close();
}

/* F. Keyboard */
{
  const { ctx, p } = await mk(Object.assign({}, PROF, { 'ukcf.savedCourses.v1': JSON.stringify(['ucl-physics-bsc--2027', 'durham-physics-bsc--2027']) })); await go(p, '/shortlist');
  const box = p.locator('.sl-pick input').first(); await box.focus(); await p.keyboard.press('Space'); await p.waitForTimeout(200);
  t('shortlist: Space selects a course for comparison', await box.isChecked());
  await p.keyboard.press('Tab'); await p.keyboard.press('Shift+Tab');
  t('  …focus returns to the checkbox and it shows a focus indicator', await box.evaluate((e) => { const s = getComputedStyle(e); return document.activeElement === e && (s.outlineStyle !== 'none' || s.boxShadow !== 'none'); }));
  await go(p, '/about'); const region = p.locator('.cm-scroll'); await region.focus();
  t('coverage matrix: the scroll region is a focusable, named region', (await region.getAttribute('tabindex')) === '0' && Boolean(await region.getAttribute('aria-label')));
  await p.goto(`${BASE}/#/`, { waitUntil: 'networkidle' }); await p.reload({ waitUntil: 'networkidle' }); await p.keyboard.press('Tab');
  const first = await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40));
  t('first Tab stop is the skip link', /skip/i.test(first ?? ''), first);
  await ctx.close();
}
await b.close();
console.log(`\nP5 RESULT: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
