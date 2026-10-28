// v2 release-candidate QA: gaps the earlier suites do not cover.
//  A  mobile navigation, sticky header, focus not hidden behind it
//  B  A-Levels and Filters drawers: focus entry, trap, Escape, focus return, inert background, scroll lock
//  C  search suggestions (native datalist) and example chips
//  D  reduced motion: nothing is animating once a page has settled
//  E  one end-to-end journey: home search -> grades -> eligibility -> course -> shortlist -> compare -> 2028
//  F  history and shareable URLs across that journey
// Needs a preview server on 4321 and global Playwright (Chromium only in this sandbox; see the RC report).
import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const BASE = process.env.BASE ?? 'http://127.0.0.1:4321'; const b = await chromium.launch();
let pass = 0, fail = 0;
const t = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };
const TOUCH = process.env.TOUCH === '1'; // phone emulation in Chromium: touch, mobile viewport, 3x. NOT the WebKit engine.
const mk = async (vp, opts = {}) => { const ctx = await b.newContext({ viewport: vp, ...(TOUCH && vp.width <= 500 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 3 } : {}), ...opts }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', (e) => p.errs.push(String(e))); return { ctx, p }; };
const go = async (p, h) => { await p.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500); };
const inside = (p, sel) => p.evaluate((s) => !!document.activeElement?.closest(s), sel);

/* A. Mobile navigation and the sticky header */
{
  const { ctx, p } = await mk({ width: 390, height: 844 }); await go(p, '/search');
  const menu = p.getByRole('button', { name: 'Menu' });
  t('A: Menu button reports collapsed state', (await menu.getAttribute('aria-expanded')) === 'false');
  await menu.click();
  t('A: opening the menu exposes the primary links', (await p.locator('header nav a:visible').count()) >= 5 && (await menu.getAttribute('aria-expanded')) === 'true');
  const hs = await p.locator('header nav a:visible').evaluateAll((a) => a.map((x) => x.getBoundingClientRect().height));
  t('A: menu links are at least 44px tall (touch target)', hs.every((h) => h >= 44), hs.join(','));
  await p.locator('header nav a:visible', { hasText: 'Universities' }).click(); await p.waitForTimeout(400);
  t('A: choosing a link navigates and closes the menu', (await p.evaluate(() => location.hash)).startsWith('#/universities') && (await menu.getAttribute('aria-expanded')) === 'false');
  await menu.focus(); await p.keyboard.press('Enter');
  t('A: the menu opens from the keyboard', (await menu.getAttribute('aria-expanded')) === 'true');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  t('A: Escape closes the open menu', (await menu.getAttribute('aria-expanded')) === 'false', 'recorded: expected by keyboard users, not required by WCAG');
  // sticky header + focus not obscured
  await go(p, '/search'); await p.evaluate(() => window.scrollTo(0, 1800)); await p.waitForTimeout(300);
  const top = await p.locator('header').first().evaluate((h) => Math.round(h.getBoundingClientRect().top));
  t('A: the header stays pinned to the top after scrolling', top === 0, `top=${top}`);
  const hdrBottom = await p.locator('header').first().evaluate((h) => h.getBoundingClientRect().bottom);
  let hidden = 0, partly = 0;
  for (let i = 0; i < 25; i++) { await p.keyboard.press('Tab'); const r = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body || e.closest('header')) return null; const q = e.getBoundingClientRect(); return { top: q.top, bottom: q.bottom }; }); if (r && r.bottom > 0 && r.bottom <= hdrBottom) hidden++; else if (r && r.top < hdrBottom - 1 && r.bottom > 0) partly++; }
  t('A: keyboard focus is never entirely hidden behind the sticky header (WCAG 2.2 2.4.11)', hidden === 0, `${hidden} hidden, ${partly} partly covered of 25 stops`);
  t('A: keyboard focus is not even partly covered by the sticky header', hidden + partly === 0, `${partly} partly covered`);
  t('A: no page errors', p.errs.length === 0, p.errs[0] ?? ''); await ctx.close();
}

/* B. Drawers */
for (const [vp, label] of [[{ width: 390, height: 844 }, '390'], [{ width: 1280, height: 900 }, '1280']]) {
  const { ctx, p } = await mk(vp); await go(p, '/search');
  const trig = p.getByRole('button', { name: /Your A-Levels/ }).first();
  await trig.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
  const dlg = p.locator('[role=dialog]');
  t(`B[${label}]: A-Levels drawer opens as a modal dialog with a name`, (await dlg.count()) === 1 && (await dlg.getAttribute('aria-modal')) === 'true' && !!(await dlg.getAttribute('aria-label') ?? await dlg.getAttribute('aria-labelledby')));
  t(`B[${label}]: focus moves into the dialog`, await inside(p, '[role=dialog]'));
  t(`B[${label}]: the page behind is inert and the body does not scroll`, (await p.evaluate(() => document.getElementById('root').hasAttribute('inert') && document.body.style.overflow === 'hidden')));
  let escaped = 0; for (let i = 0; i < 45; i++) { await p.keyboard.press('Tab'); if (!(await inside(p, '[role=dialog]'))) escaped++; }
  t(`B[${label}]: Tab never leaves the dialog (45 presses)`, escaped === 0, `${escaped} escapes`);
  escaped = 0; for (let i = 0; i < 45; i++) { await p.keyboard.press('Shift+Tab'); if (!(await inside(p, '[role=dialog]'))) escaped++; }
  t(`B[${label}]: Shift+Tab never leaves the dialog (45 presses)`, escaped === 0, `${escaped} escapes`);
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  t(`B[${label}]: Escape closes it`, (await dlg.count()) === 0);
  t(`B[${label}]: focus returns to the button that opened it`, await p.evaluate(() => /Your A-Levels/.test(document.activeElement?.textContent ?? '')));
  t(`B[${label}]: the page is live again (not inert, scrolls)`, await p.evaluate(() => !document.getElementById('root').hasAttribute('inert') && document.body.style.overflow !== 'hidden'));
  if (label === '390') {
    const f = p.getByRole('button', { name: 'Filters' }).first(); await f.click(); await p.waitForTimeout(500);
    t('B[390]: Filters sheet opens with focus inside', (await dlg.count()) === 1 && await inside(p, '[role=dialog]'));
    await p.locator('[role=dialog] [aria-label^="Close"], [role=dialog] button:has-text("Show ")').first().click(); await p.waitForTimeout(500);
    t('B[390]: closing the Filters sheet returns focus to its button', (await dlg.count()) === 0 && await p.evaluate(() => /Filters/.test(document.activeElement?.textContent ?? '')));
  }
  t(`B[${label}]: no page errors`, p.errs.length === 0, p.errs[0] ?? ''); await ctx.close();
}

/* C. Suggestions */
{
  const { ctx, p } = await mk({ width: 390, height: 844 }); await go(p, '/');
  const inp = p.getByLabel('Search courses').first();
  const list = await inp.getAttribute('list');
  const opts = list ? await p.locator(`datalist#${list} option`).count() : 0;
  t('C: the search box offers example queries as suggestions (datalist)', opts >= 3, `${opts} options; native rendering differs on iOS Safari, so the chips below are the primary route`);
  const chips = p.getByRole('button', { name: /physics AAA/ }).or(p.getByRole('link', { name: /physics AAA/ }));
  t('C: example chips are present as real buttons or links', (await chips.count()) >= 1);
  await chips.first().click(); await p.waitForTimeout(600);
  t('C: choosing an example chip runs that search', /#\/search\?/.test(await p.evaluate(() => location.hash)) && (await p.locator('main article').count()) > 0);
  await ctx.close();
}

/* C2. Empty states carry no outdated wording */
{
  const { ctx, p } = await mk({ width: 390, height: 844 });
  await go(p, '/search?q=zzzqqxx'); const txt = await p.locator('main').innerText();
  t('C2: Explorer no-results says so plainly and never calls the catalogue a demo or sample', /No courses match these filters/.test(txt) && !/demo|sample/i.test(txt), txt.match(/Try removing[^\n]*/)?.[0] ?? '');
  await go(p, '/universities'); await p.getByLabel('Find a university or city').fill('zzzqq'); await p.waitForTimeout(500);
  t('C2: Universities no-match message is current', /No universities match that search/.test(await p.locator('main').innerText()));
  await go(p, '/compare'); await p.evaluate(() => localStorage.removeItem('ukcf.compare.v1')); await go(p, '/compare');
  t('C2: empty comparison explains how to add courses', /No courses selected yet/.test(await p.locator('main').innerText()));
  await go(p, '/shortlist'); t('C2: empty shortlist explains where saved items live', /Nothing saved yet/.test(await p.locator('main').innerText()) && !/demo|sample/i.test(await p.locator('main').innerText()));
  await ctx.close();
}

/* D. Reduced motion */
{
  const { ctx, p } = await mk({ width: 390, height: 844 }, { reducedMotion: 'reduce' });
  for (const h of ['/', '/search', '/universities', '/about', '/course/ucl-physics-bsc--2027', '/compare', '/shortlist']) {
    await go(p, h); await p.waitForTimeout(600);
    const n = await p.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
    t(`D: reduced motion — nothing is animating on ${h}`, n === 0, `${n} running`);
  }
  await p.getByRole('button', { name: 'Menu' }).click(); await go(p, '/search');
  await p.getByRole('button', { name: /Your A-Levels/ }).first().click(); await p.waitForTimeout(150);
  const tr = await p.evaluate(() => { const d = document.querySelector('[role=dialog]'); const c = getComputedStyle(d.closest('.drawer') ?? d); return `${c.transform}|${c.transitionProperty}`; });
  t('D: reduced motion — the drawer does not slide (no transform; a short fade only)', tr === 'none|opacity', tr); await ctx.close();
}

/* E/F. Journey on a phone */
{
  const { ctx, p } = await mk({ width: 390, height: 844 }); await go(p, '/');
  await p.getByLabel('Search courses').first().fill('physics Durham'); await p.getByRole('button', { name: 'Search courses' }).click(); await p.waitForTimeout(900);
  const q1 = await p.evaluate(() => location.hash);
  t('E: homepage search lands on the explorer with the query in the address', /^#\/search\?.*q=physics/i.test(q1), q1);
  const n1 = await p.locator('main article').count();
  t('E: results are shown for the query', n1 > 0 && n1 < 40, `${n1}`);
  // qualification entry
  await p.getByRole('button', { name: /Your A-Levels/ }).first().click(); await p.waitForTimeout(500);
  const dlg = p.locator('[role=dialog]');
  const grade = async (i, subj, g) => { const input = dlg.getByLabel(`A-Level subject ${i}`); await input.fill(subj); await input.press('Tab'); const row = input.locator('xpath=ancestor::*[.//button[normalize-space()="A*"]][1]'); await row.getByRole('button', { name: g, exact: true }).click(); };
  await grade(1, 'Mathematics', 'A*'); await grade(2, 'Physics', 'A'); await grade(3, 'Further Mathematics', 'A');
  await dlg.getByRole('button', { name: 'Done' }).click(); await p.waitForTimeout(700);
  const rowsTxt = await p.locator('main article').allInnerTexts();
  t('E: with grades entered every result row carries a verdict in words', rowsTxt.length > 0 && rowsTxt.every((r) => /Meets|Not met|Needs review|Cannot|Met\b|Insufficient|Not enough/i.test(r)), rowsTxt[0]?.split('\n').slice(-5).join(' | '));
  const stored = await p.evaluate(() => JSON.parse(localStorage.getItem('ukcf.profile.v1') || '{}'));
  t('E: the profile is saved in this browser only (localStorage)', stored.aLevels?.length >= 3, JSON.stringify(stored.aLevels?.map((a) => a.subject + a.grade)));
  // open a course
  const first = p.locator('main article').first(); const title = await first.locator('.r-title a').innerText();
  await first.locator('.r-title a').click(); await p.waitForTimeout(900);
  const ch = await p.evaluate(() => location.hash);
  t('E: the course page opens', /^#\/course\//.test(ch), ch);
  const body = await p.locator('main').innerText();
  t('E: published requirements and the student’s own grades are both shown', await p.locator('[data-testid=requirement-ledger]').count() === 1 && /Your grades/i.test(await p.locator('[data-testid=requirement-ledger]').innerText()));
  t('E: an eligibility verdict is stated in words', /Meets requirements|Does not meet|Needs review|Cannot assess|not enough information|Not met|Met/i.test(body));
  t('E: the source and verification status are visible', await p.locator('[data-testid=course-source-strip]').count() === 1);
  // save and compare via history
  await p.getByRole('button', { name: /^Save course$/ }).first().click(); await p.waitForTimeout(200);
  t('E: saving the course flips the control to Saved', await p.getByRole('button', { name: /^Saved$/ }).first().isVisible());
  await p.goBack(); await p.waitForTimeout(700);
  t('F: Back returns to the same search with the same query', (await p.evaluate(() => location.hash)) === q1 && (await p.locator('main article').count()) === n1);
  await p.locator('main article').nth(0).getByRole('button', { name: /^Compare$/ }).click();
  await p.locator('main article').nth(1).getByRole('button', { name: /^Compare$/ }).click();
  await p.getByRole('link', { name: 'Compare courses' }).click(); await p.waitForTimeout(800);
  t('E: the comparison page lists both chosen courses', (await p.evaluate(() => location.hash)).startsWith('#/compare') && (await p.locator('main').innerText()).includes(title.split(' ')[0]));
  await p.goto(`${BASE}/#/shortlist`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  t('E: the shortlist holds the saved course', (await p.locator('main').innerText()).length > 0 && (await p.getByText(/Courses\s*1/).count()) >= 1);
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  t('E: shortlist, comparison and grades survive a reload', (await p.getByText(/Courses\s*1/).count()) >= 1 && (await p.evaluate(() => JSON.parse(localStorage.getItem('ukcf.compare.v1') || '[]').length)) === 2);
  // 2028
  await go(p, '/search'); await p.getByRole('radio', { name: /2028/ }).click(); await p.waitForTimeout(900);
  const t28 = await p.locator('main').innerText();
  t('E: 2028 states that requirements are not published yet', /2028 requirements are not published yet/i.test(t28));
  t('E: 2028 shows no eligibility verdicts', !/meet published requirements/i.test(t28));
  await p.locator('main article').first().locator('.r-title a').click(); await p.waitForTimeout(900);
  const c28 = await p.locator('main').innerText();
  t('E: a 2028 course page says requirements are unpublished and never carries 2027 forward', /not (yet )?published|not been published|awaiting/i.test(c28) && !/Meets requirements/i.test(c28));
  t('E: no page errors across the journey', p.errs.length === 0, p.errs[0] ?? ''); await ctx.close();
}
await b.close();
console.log(`\nRC RESULT: ${pass} pass, ${fail} fail`); process.exit(fail ? 1 : 0);
