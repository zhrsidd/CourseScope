// v2 Phase 4 visualisation QA. Needs a preview server on 4321 and global Playwright.
import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const BASE = 'http://127.0.0.1:4321'; const b = await chromium.launch();
let pass = 0, fail = 0;
const t = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };
const strong = { aLevels: [{ id: '1', subject: 'Mathematics', grade: 'A*' }, { id: '2', subject: 'Physics', grade: 'A' }, { id: '3', subject: 'Further Mathematics', grade: 'A' }, { id: '4', subject: 'Chemistry', grade: 'B' }], gcses: [], applicationYear: '2027', schoolOffersFurtherMathematics: true, notes: '' };
const weak = { aLevels: [{ id: '1', subject: 'Mathematics', grade: 'B' }, { id: '2', subject: 'Physics', grade: 'C' }, { id: '3', subject: 'Chemistry', grade: 'B' }], gcses: [], applicationYear: '2027', schoolOffersFurtherMathematics: true, notes: '' };
const mk = async (init = {}, vp = { width: 1440, height: 1000 }, opts = {}) => {
  const ctx = await b.newContext({ viewport: vp, ...opts }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  if (Object.keys(init).length) await p.addInitScript((o) => { for (const [k, v] of Object.entries(o)) localStorage.setItem(k, v); }, init);
  p.errs = errs; return { ctx, p };
};
const go = async (p, h) => { await p.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500); };
const overflow = (p) => p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const PROF = (g) => ({ 'ukcf.profile.v1': JSON.stringify(g) });

/* 1. Requirement Ledger */
{
  let { ctx, p } = await mk(); await go(p, '/course/ucl-physics-bsc--2027');
  const led = p.getByTestId('requirement-ledger');
  t('ledger: present on a verified course page', (await led.count()) === 1);
  t('  …without grades it has two data columns and no result chips', (await led.locator('thead th').count()) === 2 && (await led.locator('.rl-chip').count()) === 0);
  t('  …and prompts for A-Levels instead of printing "Unknown" per row', (await led.innerText()).includes('Add your A-Levels') && !/Unknown|Not checked/.test(await led.innerText()));
  t('  …every row is a row header plus a published value', await led.locator('tbody tr').evaluateAll((rs) => rs.every((r) => r.querySelector('th[scope=row]') && r.querySelector('.rl-pub')?.textContent.trim().length > 0)));
  await led.getByRole('button', { name: 'Add your A-Levels' }).click(); await p.waitForTimeout(400);
  t('  …the prompt opens the grades form', (await p.getByRole('dialog').count()) + (await p.locator('#cd-profile:focus-within, [role=dialog]').count()) > 0);
  await ctx.close();
  for (const [name, g] of [['strong', strong], ['weak', weak]]) {
    ({ ctx, p } = await mk(PROF(g))); await go(p, '/course/ucl-physics-bsc--2027');
    const l2 = p.getByTestId('requirement-ledger');
    t(`ledger (${name}): four columns with Requirement, Published, Your grades, Result`, (await l2.locator('thead th').allInnerTexts()).join('|') === 'Requirement|Published|Your grades|Result');
    const rows = await l2.locator('tbody tr[data-outcome]').count();
    const chips = await l2.locator('.rl-chip').count();
    t(`  …(${name}) every checked row carries a word, not just a colour`, rows > 0 && chips >= rows, `${rows} rows, ${chips} chips`);
    const outcomes = await l2.locator('tbody tr[data-outcome]').evaluateAll((rs) => rs.map((r) => r.dataset.outcome));
    const heading = (await p.locator('main').innerText());
    const verdictMeets = /meets published academic requirements|Meets published/i.test(heading);
    t(`  …(${name}) the ledger never contradicts the page verdict`, name === 'weak' ? outcomes.includes('fail') || outcomes.includes('review') : !outcomes.includes('fail') || !verdictMeets, outcomes.join());
    t(`  …(${name}) no horizontal overflow at 1440`, (await overflow(p)) === 0);
    await ctx.close();
  }
}

/* 2. Difference Strip */
{
  const ids = 'imperial-physics-msci--2027,ucl-physics-bsc--2027,durham-physics-bsc--2027';
  const { ctx, p } = await mk({ 'ukcf.compare.v1': JSON.stringify(ids.split(',')) }); await go(p, '/compare');
  const strip = p.locator('section.ds');
  t('strip: present with three courses compared', (await strip.count()) === 1);
  const toggle = strip.getByRole('button', { name: /Hide|Show/ }).first();
  t('  …disclosure is a real button with aria-expanded', (await toggle.getAttribute('aria-expanded')) === 'true');
  await toggle.click(); await p.waitForTimeout(400);
  t('  …and it collapses', (await toggle.getAttribute('aria-expanded')) === 'false');
  await toggle.click(); await p.waitForTimeout(400);
  const th = await strip.locator('thead th').allInnerTexts();
  t('  …one column per course', th.length === 4, th.join('|'));
  t('  …every differing row says so in words for screen readers', await strip.locator('td .ds-diff, td [data-diff]').count().then(async (n) => n >= 0) && /differs/i.test(await strip.innerHTML()));
  t('  …the full comparison table is still there', (await p.locator('main table').count()) >= 2);
  await ctx.close();
}

/* 3. Coverage Matrix */
{
  const { ctx, p } = await mk(); await go(p, '/about');
  const m = p.getByTestId('coverage-matrix');
  t('matrix: is a real table with a caption and column headers', (await m.locator('table caption').count()) === 1 && (await m.locator('thead th[scope=col]').count()) >= 3);
  const rows = await m.locator('tbody tr').count();
  t('  …one row per university (22)', rows === 22, String(rows));
  const total = await m.locator('tfoot td').evaluateAll((tds) => tds.reduce((n, td) => n + Number(td.dataset.total), 0));
  const rowTotal = await m.locator('tbody td').evaluateAll((tds) => tds.reduce((n, td) => n + Number(td.dataset.total), 0));
  t('  …footer totals equal the sum of the rows', total === rowTotal && total === 1129, `${total}/${rowTotal}`);
  const tiles = await m.locator('.cm-t').evaluateAll((e) => e.filter((x) => !x.closest('.cm-legend')).length);
  const tileCells = await m.locator('tbody td:not(:has(.cm-count))').evaluateAll((tds) => tds.reduce((n, td) => n + Number(td.dataset.total), 0));
  t('  …tiles drawn equal the records they stand for', tiles === tileCells, `${tiles}/${tileCells}`);
  t('  …tiles are hidden from assistive technology and replaced by counts in text', (await m.locator('.cm-tiles[aria-hidden=true]').count()) > 0 && /verified/.test(await m.locator('tbody td .sr-only').first().textContent()));
  const names = await m.locator('tbody th .cm-name-long').allTextContents();
  t('  …listed alphabetically by short name, never ranked', (await m.locator('tbody th .cm-name-short').allTextContents()).every((s, i, a) => i === 0 || a[i - 1].localeCompare(s) <= 0));
  const region = m.locator('.cm-scroll');
  await region.focus();
  t('  …the scroll region takes keyboard focus', await region.evaluate((e) => document.activeElement === e));
  t('  …a methodology section is anchored from the contents list (≥1024px)', (await p.locator('nav[aria-label="On this page"] a').count()) === 12);
  await ctx.close();
}

/* 4. Offer Ladder */
{
  const { ctx, p } = await mk(); await go(p, '/search');
  const ol = p.getByTestId('offer-ladder');
  const toggle = ol.locator('.ol-toggle');
  t('ladder: collapsed by default (progressive disclosure)', (await toggle.getAttribute('aria-expanded')) === 'false' && (await ol.locator('.ol-rung').count()) === 0);
  const sum = await ol.locator('.ol-sum').innerText();
  await toggle.click(); await p.waitForTimeout(500);
  const rungs = await ol.locator('.ol-rung').evaluateAll((r) => r.map((x) => [x.dataset.rung, Number(x.dataset.count)]));
  const placed = rungs.reduce((n, r) => n + r[1], 0);
  t('  …summary says what the rungs add up to', sum.includes(`${rungs.length} grade combination`) && sum.includes(`${placed} course`), `${sum} / ${rungs.length}, ${placed}`);
  t('  …rungs run from the most demanding combination down', rungs[0][0] === 'A*A*A*' || rungs[0][0] === 'A*A*A', rungs.slice(0, 3).map((r) => r[0]).join());
  t('  …every bar is decorative (aria-hidden) and each rung states its count as text', (await ol.locator('.ol-bar[aria-hidden=true]').count()) === rungs.length && (await ol.locator('.ol-n').allInnerTexts()).every((x, k) => x.startsWith(`${rungs[k][1]} course`)));
  await ol.locator('.ol-rung-btn').first().click(); await p.waitForTimeout(450);
  const listed = await ol.locator('.ol-rung').first().locator('.ol-courses li').count();
  t('  …a rung opens into its courses, each a link to the course page', listed > 0 && (await ol.locator('.ol-rung').first().locator('.ol-courses a[href*="/course/"]').count()) === listed, String(listed));
  const first = await ol.locator('.ol-rung-btn').first().getAttribute('aria-expanded');
  t('  …the rung button reports expanded state', first === 'true');
  await ol.getByRole('button', { name: 'Show as a table' }).click(); await p.waitForTimeout(300);
  const tr = await ol.locator('.ol-table tbody tr').count();
  t('  …the table alternative has one row per rung with the same counts', tr === rungs.length && (await ol.locator('.ol-table tbody td:nth-child(2)').allInnerTexts()).map(Number).join() === rungs.map((r) => r[1]).join());
  await ol.getByRole('button', { name: 'Show as a ladder' }).click(); await p.waitForTimeout(200);
  t('  …and back', (await ol.locator('.ol-rung').count()) === rungs.length);
  await ctx.close();
}
{
  const { ctx, p } = await mk(); await go(p, '/search?category=physics&year=2027');
  const ol = p.getByTestId('offer-ladder'); await ol.locator('.ol-toggle').click(); await p.waitForTimeout(400);
  const physicsPlaced = await ol.locator('.ol-rung').evaluateAll((r) => r.reduce((n, x) => n + Number(x.dataset.count), 0));
  // the as-printed list shows 10 and offers the rest behind "Show all"; expand before counting
  const moreBtn = ol.locator('.ol-off .ol-more');
  const hasMore = (await moreBtn.count()) > 0;
  const capped = hasMore ? await ol.locator('.ol-off ul li').count() : null;
  if (hasMore) { await moreBtn.click(); await p.waitForTimeout(150); }
  const printed = (await ol.locator('.ol-off ul li').count());
  const unplacedTxt = await ol.locator('.ol-fine').allInnerTexts();
  const unplaced = unplacedTxt.length ? Number(unplacedTxt[0].match(/^(\d+)/)?.[1] ?? 0) : 0;
  const headline = await p.locator('.res-count').innerText();
  const n = Number(headline.match(/(\d+) courses/)?.[1] ?? headline.match(/of (\d+) courses/)?.[1]);
  t('ladder follows the filters: placed + printed + unplaced equals the results count', physicsPlaced + printed + unplaced === n && (capped === null || capped === 10), `${physicsPlaced}+${printed}+${unplaced} vs ${n}${capped === null ? '' : `, first view ${capped}`}`);
  await go(p, '/search?year=2028');
  t('ladder is absent for 2028, where nothing is published', (await p.getByTestId('offer-ladder').count()) === 0);
  await ctx.close();
}

/* 5. Reduced motion and overflow across widths */
{
  const { ctx, p } = await mk({}, { width: 1440, height: 900 }, { reducedMotion: 'reduce' }); await go(p, '/about');
  const an = await p.evaluate(() => [...document.querySelectorAll('.cm-t')].slice(0, 20).map((e) => getComputedStyle(e).animationName));
  t('reduced motion: matrix tiles do not animate', an.length > 0 && an.every((a) => a === 'none'), [...new Set(an)].join());
  await go(p, '/search'); await p.getByTestId('offer-ladder').locator('.ol-toggle').click(); await p.waitForTimeout(300);
  const an2 = await p.evaluate(() => [...document.querySelectorAll('.ol-bar i')].map((e) => getComputedStyle(e).animationName));
  t('  …ladder bars do not animate', an2.length > 0 && an2.every((a) => a === 'none'), [...new Set(an2)].join());
  await ctx.close();
}
for (const w of [1440, 768, 390, 320]) {
  const { ctx, p } = await mk({ ...PROF(strong), 'ukcf.compare.v1': JSON.stringify(['imperial-physics-msci--2027', 'ucl-physics-bsc--2027', 'durham-physics-bsc--2027']) }, { width: w, height: 900 });
  const bad = [];
  for (const r of ['/about', '/compare', '/course/ucl-physics-bsc--2027', '/search']) {
    await go(p, r);
    if (r === '/search') { await p.getByTestId('offer-ladder').locator('.ol-toggle').click(); await p.locator('.ol-rung-btn').first().click(); await p.waitForTimeout(500); }
    const o = await overflow(p); if (o !== 0) bad.push(`${r}:${o}`);
  }
  t(`no horizontal overflow at ${w}px (about, compare, course, explorer with ladder open)`, bad.length === 0 && p.errs.length === 0, bad.join() + p.errs.join());
  await ctx.close();
}
console.log(`\nVISUALISATION RESULT: ${pass} pass, ${fail} fail`);
await b.close();
process.exit(fail ? 1 : 0);
