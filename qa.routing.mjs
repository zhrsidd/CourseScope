// v2 routing QA. Needs a preview server on 4321 (QA_BASE not supported here) and global Playwright.
// Phase 3: routing, redirects, shareable URLs, history, year rules, privacy, landing behaviour.
import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'; const { chromium } = pkg;
const BASE = 'http://127.0.0.1:4321'; const b = await chromium.launch();
let pass = 0, fail = 0;
const t = (name, ok, detail = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };
const prof = { aLevels: [{ id: '1', subject: 'Mathematics', grade: 'A' }, { id: '2', subject: 'Physics', grade: 'A' }], gcses: [], applicationYear: '2027', schoolOffersFurtherMathematics: true, notes: '' };
const mk = async (init = {}, vp = { width: 1440, height: 1000 }, opts = {}) => {
  const ctx = await b.newContext({ viewport: vp, ...opts }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  if (Object.keys(init).length) await p.addInitScript((o) => { if (!sessionStorage.getItem('__seeded')) { sessionStorage.setItem('__seeded', '1'); for (const [k, v] of Object.entries(o)) localStorage.setItem(k, v); } }, init);
  p.errs = errs; return { ctx, p };
};
const go = async (p, h) => { await p.goto(`${BASE}/#${h}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500); };
const hash = (p) => p.evaluate(() => location.hash);
const ids = (p) => p.$$eval('main article.row .r-title a', (as) => as.map((a) => decodeURIComponent(a.getAttribute('href').split('/course/')[1])));
const allIds = async (p) => { for (let i = 0; i < 40; i++) { const m = p.getByRole('button', { name: /Load more/ }); if (!(await m.count())) break; await m.click(); await p.waitForTimeout(40); } return ids(p); };
const count = (p) => p.locator('main article.row').count();
const store = (p, k) => p.evaluate((k) => localStorage.getItem(k), k);
const same = (a, b2) => a.length === b2.length && a.every((x, i) => x === b2[i]);

/* 1. landing */
{
  const { ctx, p } = await mk(); await go(p, '/');
  t('#/ is the landing page', (await p.locator('h1').innerText()).replace(/\s+/g, ' ') === 'Find the course. Check the source.', await hash(p));
  t('  …and the address stays #/', (await hash(p)) === '#/');
  t('  …with the supporting sentence', /CourseScope compares published entry requirements for UK Physics and Engineering degrees\./.test(await p.locator('main').innerText()));
  t('  …and the explorer is not rendered there', (await count(p)) === 0);
  await ctx.close();
}
/* 2. legacy URLs */
const legacy = [
  ['q', '/?q=physics', ['q=physics']],
  ['category', '/?category=engineering', ['category=engineering']],
  ['subcategory', '/?subcategory=astrophysics', ['subcategory=astrophysics']],
  ['university', '/?university=imperial', ['university=imperial']],
  ['combined', '/?category=physics&university=durham&q=AAA', ['category=physics', 'university=durham', 'q=AAA']],
  ['sub + uni', '/?subcategory=astrophysics&university=durham', ['subcategory=astrophysics', 'university=durham']],
];
const sets = {};
for (const [label, h, expect] of legacy) {
  const { ctx, p } = await mk(); await go(p, h);
  const hh = await hash(p);
  t(`legacy ${label}: redirects to #/search keeping the parameters`, hh.startsWith('#/search?') && expect.every((e) => hh.includes(e)), hh);
  const direct = await mk(); await go(direct.p, h.replace('/?', '/search?') );
  const a = await allIds(p), c = await allIds(direct.p);
  t(`  …and shows the same courses as the new address (${a.length})`, (label === 'combined' || a.length > 0) && same(a, c));
  sets[label] = a;
  await direct.ctx.close(); await ctx.close();
}
{
  const { ctx, p } = await mk(); await go(p, '/?university=imperial'); await p.goBack(); await p.waitForTimeout(400);
  t('legacy redirect replaces history: Back does not bounce back into the search', !(await hash(p)).startsWith('#/search') , await hash(p));
  await ctx.close();
}
/* 3. filters <-> URL, refresh, bookmark */
{
  const { ctx, p } = await mk(); await go(p, '/search');
  t('plain #/search gains the entry year in its address', /^#\/search\?year=2027$/.test(await hash(p)), await hash(p));
  const len0 = await p.evaluate(() => history.length);
  await p.getByLabel('Search courses').first().fill('physics'); await p.waitForTimeout(500);
  t('typing in the search box updates the address', (await hash(p)).includes('q=physics'), await hash(p));
  t('  …without adding history entries per keystroke', (await p.evaluate(() => history.length)) === len0, `${len0} -> ${await p.evaluate(() => history.length)}`);
  const tickBox = p.locator('aside input[type="checkbox"]').first();
  await p.locator('aside summary, aside button[aria-expanded]').first().click().catch(() => {});
  await p.waitForTimeout(300);
  // use a real UI filter: the first degree-type / any checkbox that is visible
  const boxes = p.locator('aside input[type="checkbox"]:visible');
  const nBoxes = await boxes.count();
  let before = await allIds(p);
  let changed = false, label = '';
  for (let i = 0; i < nBoxes && !changed; i++) {
    await boxes.nth(i).check({ force: true }).catch(() => {}); await p.waitForTimeout(350);
    const after = await allIds(p);
    if (!same(before, after)) { changed = true; label = await boxes.nth(i).evaluate((e) => e.closest('label')?.innerText ?? ''); }
    else await boxes.nth(i).uncheck({ force: true }).catch(() => {});
  }
  const hhA = await hash(p);
  t('selecting a filter changes the results and the address', changed && hhA.split('&').length > 2, `${label.trim()} → ${hhA}`);
  const idsA = await allIds(p);
  const len1 = await p.evaluate(() => history.length);
  t('  …and added one history entry', len1 === len0 + 1, `${len0} -> ${len1}`);
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(500);
  t('refresh keeps the filters and the exact results', (await hash(p)) === hhA && same(await allIds(p), idsA), await hash(p));
  const fresh = await mk(); await go(fresh.p, hhA.slice(1));
  t('a bookmarked/pasted address in a fresh browser shows the same courses', same(await allIds(fresh.p), idsA), `${idsA.length} courses`);
  await fresh.ctx.close();
  await p.goBack(); await p.waitForTimeout(500);
  const hhB = await hash(p), idsB = await allIds(p);
  t('Back undoes the filter (address and results)', hhB !== hhA && idsB.length <= idsA.length && !hhB.includes('awaiting=1'), hhB);
  await p.goForward(); await p.waitForTimeout(500);
  t('Forward restores it', (await hash(p)) === hhA && same(await allIds(p), idsA));
  t('  …and the input box matches the address after history navigation', (await p.getByLabel('Search courses').first().inputValue()) === 'physics');
  await ctx.close();
}
/* 4. all 22 university links */
{
  const { ctx, p } = await mk(); await go(p, '/universities');
  const links = await p.$$eval('a', (as) => as.filter((a) => /View courses/.test(a.textContent ?? '')).map((a) => a.getAttribute('href').replace(/^#/, '')));
  t('the Universities page has 22 "View courses" links', links.length === 22, `${links.length}`);
  let ok = 0; const bad = [];
  for (const href of links) {
    await p.goto(`${BASE}/#${href}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(250);
    const slug = new URLSearchParams(href.split('?')[1]).get('university');
    const names = await p.$$eval('main article.row .r-uni a', (as) => [...new Set(as.map((a) => a.textContent))]);
    const n = await count(p);
    const notFound = /Page not found/.test(await p.locator('main').innerText());
    (!notFound && n > 0 && names.length === 1 && (await hash(p)).includes(`university=${slug}`)) ? ok++ : bad.push(`${slug}: ${n} rows, ${names.length} names`);
  }
  t('  …each opens #/search with only that university’s courses', ok === 22, bad.join('; ') || 'all 22');
  await ctx.close();
}
/* 5. year rules */
{
  let { ctx, p } = await mk(); await go(p, '/search?year=2028');
  t('year in a link is shown (2028) …', (await p.getByRole('radio', { name: '2028 entry' }).getAttribute('aria-checked')) === 'true');
  t('  …but nothing is saved for a first-time visitor', (await store(p, 'ukcf.entryYear.v1')) === null);
  await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  t('  …and a refresh of that link keeps showing it, still unsaved', (await p.getByRole('radio', { name: '2028 entry' }).getAttribute('aria-checked')) === 'true' && (await store(p, 'ukcf.entryYear.v1')) === null);
  await go(p, '/search');
  t('a plain #/search afterwards is the default year 2027 (not the link’s year)', (await p.getByRole('radio', { name: '2027 entry' }).getAttribute('aria-checked')) === 'true' && (await hash(p)).includes('year=2027'));
  await ctx.close();
  ({ ctx, p } = await mk({ 'ukcf.entryYear.v1': '"2028"' })); await go(p, '/search');
  t('a saved 2028 is respected on #/search', (await p.getByRole('radio', { name: '2028 entry' }).getAttribute('aria-checked')) === 'true' && (await hash(p)).includes('year=2028'), await hash(p));
  await go(p, '/search?year=2027');
  t('a link saying 2027 shows 2027 for a visitor who saved 2028 …', (await p.getByRole('radio', { name: '2027 entry' }).getAttribute('aria-checked')) === 'true');
  t('  …without overwriting the saved choice', (await store(p, 'ukcf.entryYear.v1')) === '"2028"');
  await p.getByRole('radio', { name: '2027 entry' }).click(); await p.waitForTimeout(300);
  t('pressing a year IS saved', (await store(p, 'ukcf.entryYear.v1')) === '"2027"');
  await ctx.close();
  ({ ctx, p } = await mk({ 'ukcf.entryYear.v1': '"2027"' })); await go(p, '/search?year=2028');
  t('a 2028 link for a saved-2027 visitor leaves 2027 saved', (await store(p, 'ukcf.entryYear.v1')) === '"2027"');
  await p.getByRole('radio', { name: '2028 entry' }).click(); await p.waitForTimeout(300);
  t('  …until they press 2028', (await store(p, 'ukcf.entryYear.v1')) === '"2028"' && (await hash(p)).includes('year=2028'));
  await ctx.close();
  ({ ctx, p } = await mk()); await go(p, '/');
  t('opening the landing page saves no year', (await store(p, 'ukcf.entryYear.v1')) === null);
  await p.getByRole('radio', { name: '2028 entry' }).click(); await p.waitForTimeout(300);
  t('pressing a year on the landing page saves it', (await store(p, 'ukcf.entryYear.v1')) === '"2028"');
  await p.getByLabel('Search courses').fill('physics'); await p.getByRole('button', { name: 'Search courses' }).click(); await p.waitForTimeout(600);
  t('  …and the search it launches carries that year', (await hash(p)) === '#/search?q=physics&year=2028', await hash(p));
  await ctx.close();
}
/* 6. privacy */
{
  const { ctx, p } = await mk({ 'ukcf.profile.v1': JSON.stringify(prof), 'ukcf.savedCourses.v1': JSON.stringify(['oxford-physics-mphys--2027']), 'ukcf.compare.v1': JSON.stringify(['oxford-physics-mphys--2027']) });
  await go(p, '/search');
  await p.getByLabel('Search courses').first().fill('engineering'); await p.waitForTimeout(500);
  const hh = decodeURIComponent(await hash(p));
  t('the address never carries grades, subjects, shortlist or comparison', !/Mathematics|Physics|oxford-physics|grade|saved|compare|shortlist/i.test(hh.replace('q=engineering', '')), hh);
  t('  …only allowed parameter names appear', [...new URLSearchParams(hh.split('?')[1])].every(([k]) => ['q', 'year', 'category', 'subcategory', 'university', 'degree', 'duration', 'region', 'test', 'interview', 'maths', 'fm', 'physics', 'chemistry', 'maxoffer', 'rank', 'sort', 'awaiting'].includes(k)));
  await p.getByRole('button', { name: /Your A-Levels/ }).first().click(); await p.waitForTimeout(500);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  t('  …and opening the profile drawer leaves the address alone', decodeURIComponent(await hash(p)) === hh);
  await ctx.close();
}
/* 7. invalid, unknown and hand-edited values */
{
  const notice = (p) => p.locator('.invite-warn');
  const noticeText = async (p) => ((await notice(p).count()) ? (await notice(p).first().innerText()).replace(/\s+/g, ' ') : '');
  const physicsIds = await (async () => { const x = await mk(); await go(x.p, '/search?category=physics'); const r = await allIds(x.p); await x.ctx.close(); return r; })();
  const defaultCount = await (async () => { const x = await mk(); await go(x.p, '/search'); const r = (await allIds(x.p)).length; await x.ctx.close(); return r; })();
  t('baseline: an unfiltered search lists courses', defaultCount > 300 && physicsIds.length > 0 && physicsIds.length < defaultCount, `${defaultCount} / ${physicsIds.length}`);

  // Whole-filter failures: nothing is listed, the reason is stated, the address keeps the value.
  const blocking = [
    ['category', 'bogus'], ['subcategory', 'quantum-gardening'], ['degree', 'PhD'], ['test', 'zzz'], ['interview', 'maybe'],
    ['maths', 'sometimes'], ['physics', 'x'], ['chemistry', 'x'], ['fm', 'lots'], ['maxoffer', 'ZZZ'], ['rank', '-3'], ['duration', 'abc'],
    ['university', 'hogwarts'], ['university', '%3Cb%3E'], ['region', 'Narnia'],
  ];
  for (const [k, v] of blocking) {
    const { ctx, p } = await mk(); await go(p, `/search?${k}=${v}`);
    const n = await count(p), txt = await noticeText(p), hh = decodeURIComponent(await hash(p));
    t(`invalid ${k}=${decodeURIComponent(v)} is not an unfiltered search`, n === 0 && /not recognised/.test(txt) && hh.includes(`${k}=${decodeURIComponent(v)}`) && p.errs.length === 0, `${n} rows; ${txt.slice(0, 90)}`);
    await ctx.close();
  }
  {
    const { ctx, p } = await mk(); await go(p, '/search?category=bogus');
    t('the empty state explains itself', /cannot match any course/.test(await p.locator('main').innerText()));
    t('  …the notice is announced politely (role=status)', (await p.locator('.invite-warn[role="status"]').count()) === 1);
    await p.getByLabel('Search courses').first().fill('physics'); await p.waitForTimeout(500);
    t('  …typing a query does not quietly lift the block, and the address keeps the value', (await count(p)) === 0 && (await hash(p)).includes('category=bogus'), await hash(p));
    await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    t('  …a refresh keeps the same state', (await count(p)) === 0 && /not recognised/.test(await noticeText(p)));
    await p.getByRole('button', { name: /^Remove it$/ }).click(); await p.waitForTimeout(500);
    t('  …"Remove it" clears the value from the address and shows the valid search', (await count(p)) > 0 && !(await hash(p)).includes('bogus') && (await notice(p).count()) === 0, await hash(p));
    await ctx.close();
  }
  {
    const { ctx, p } = await mk(); await go(p, '/search?category=bogus');
    await p.getByRole('button', { name: /Reset all filters/ }).click(); await p.waitForTimeout(500);
    t('"Reset all filters" also clears an unrecognised value', (await count(p)) > 0 && !(await hash(p)).includes('bogus'));
    await ctx.close();
  }
  // Partial: valid part applied, ignored part reported.
  {
    const { ctx, p } = await mk(); await go(p, '/search?category=physics,bogus');
    const got = await allIds(p), txt = await noticeText(p);
    t('physics,bogus applies physics and reports bogus', same(got, physicsIds) && /was ignored/.test(txt) && /bogus/.test(txt), `${got.length} rows; ${txt.slice(0, 80)}`);
    t('  …the address keeps both values', decodeURIComponent(await hash(p)).includes('category=physics,bogus'));
    await ctx.close();
  }
  // Unknown university alongside a valid one.
  {
    const { ctx, p } = await mk(); await go(p, '/search?university=durham,hogwarts');
    const names = await p.$$eval('main article.row .r-uni a', (as) => [...new Set(as.map((a) => a.textContent))]);
    t('university=durham,hogwarts lists Durham only and reports hogwarts', names.length === 1 && /hogwarts/.test(await noticeText(p)), `${names.join()} | ${(await noticeText(p)).slice(0, 80)}`);
    await ctx.close();
  }
  // Non-narrowing options fall back, with a notice.
  {
    const { ctx, p } = await mk(); await go(p, '/search?sort=bogus&year=2099');
    t('bad sort and year fall back to the defaults and say so', (await count(p)) > 0 && /sort order/.test(await noticeText(p)) && /entry year/.test(await noticeText(p)), (await noticeText(p)).slice(0, 120));
    t('  …year 2099 is never written back to the address', !(await hash(p)).includes('2099') && /year=2027/.test(await hash(p)), await hash(p));
    t('  …and the sort control shows the default', (await p.getByLabel('Sort by').inputValue()) === 'relevance');
    t('  …and nothing is saved', (await store(p, 'ukcf.entryYear.v1')) === null);
    await ctx.close();
  }
  {
    const { ctx, p } = await mk(); await go(p, '/search?categroy=physics');
    t('a misspelt parameter name is called out with a suggestion', /Did you mean .category./.test(await noticeText(p)) && (await count(p)) > 0, (await noticeText(p)).slice(0, 100));
    await ctx.close();
    const x = await mk(); await go(x.p, '/search?utm_source=news&fbclid=abc');
    t('tracking parameters cause no notice', (await notice(x.p).count()) === 0 && (await count(x.p)) > 0);
    await x.ctx.close();
    const y = await mk(); await go(y.p, '/search?category=Physics');
    t('capitalisation in a vocabulary value is forgiven', same(await allIds(y.p), physicsIds) && (await notice(y.p).count()) === 0);
    await y.ctx.close();
  }
  // Legacy links with bad values go through the same handling.
  {
    const { ctx, p } = await mk(); await go(p, '/?category=bogus');
    t('legacy #/?category=bogus redirects and still blocks with a notice', (await hash(p)).startsWith('#/search?') && (await count(p)) === 0 && /not recognised/.test(await noticeText(p)), await hash(p));
    await ctx.close();
  }
  // Browser history across valid -> invalid -> valid.
  {
    const { ctx, p } = await mk(); await go(p, '/search?category=physics');
    await go(p, '/search?category=bogus');
    t('history: moving to an invalid address blocks', (await count(p)) === 0 && /not recognised/.test(await noticeText(p)));
    await p.goBack(); await p.waitForTimeout(600);
    t('  …Back restores the valid search and clears the notice', same(await allIds(p), physicsIds) && (await notice(p).count()) === 0, await hash(p));
    await p.goForward(); await p.waitForTimeout(600);
    t('  …Forward blocks again with the notice', (await count(p)) === 0 && /not recognised/.test(await noticeText(p)));
    await p.goBack(); await p.waitForTimeout(400);
    await p.getByLabel('Search courses').first().fill('imperial'); await p.waitForTimeout(500);
    await p.goBack(); await p.waitForTimeout(600);
    t('  …valid filter changes still step back correctly afterwards', (await hash(p)).includes('category=physics') && (await notice(p).count()) === 0, await hash(p));
    await ctx.close();
  }
}
/* 8. other routes preserved */
{
  const { ctx, p } = await mk();
  for (const r of ['/browse', '/universities', '/university/imperial', '/course/imperial-physics-bsc--2027', '/compare', '/shortlist', '/about', '/admin']) {
    await go(p, r); const m = await p.locator('main').innerText();
    t(`route ${r} still renders`, m.trim().length > 60 && !/Page not found/.test(m), `${m.length} chars`);
  }
  await go(p, '/no-such-page'); t('unknown route is the not-found page', /Page not found/.test(await p.locator('main').innerText()));
  await go(p, '/browse'); const bl = await p.$$eval('main a', (as) => as.map((a) => a.getAttribute('href')).map((h) => (h ?? '').replace(/^#/, '')).filter((h) => /search\?/.test(h)));
  t('Browse page links point at #/search', bl.length > 5 && bl.every((h) => h.startsWith('/search?')), `${bl.length} links`);
  await ctx.close();
}
/* 9. landing behaviour */
{
  const { ctx, p } = await mk(); await go(p, '/');
  for (const bt of await p.getByRole('button', { name: /^Show all \d+ .* subjects$/ }).all()) await bt.click();
  await p.waitForTimeout(500);
  const rows = await p.$$eval('.lp-subj', (as) => as.slice(0, 40).map((a) => ({ href: a.getAttribute('href').replace(/^#/, ''), n: parseInt(a.querySelector('.lp-subj-n').childNodes[0].textContent.replace(/,/g, ''), 10), name: a.querySelector('.lp-subj-name').textContent })));
  let ok = 0; const bad = [];
  for (const r of rows) {
    await p.goto(`${BASE}/#${r.href}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(200);
    const shown = (await p.locator('.res-count').first().innerText()).match(/(\d[\d,]*)\s+courses/);
    const total = shown ? parseInt(shown[1].replace(/,/g, ''), 10) : -1;
    const m2 = (await p.locator('.res-count').first().innerText()).match(/of (\d+)/);
    const real = m2 ? parseInt(m2[1], 10) : total;
    real === r.n ? ok++ : bad.push(`${r.name}: landing ${r.n} vs search ${real}`);
  }
  t(`every subject row's count equals the number of courses its link opens (${rows.length} rows)`, ok === rows.length && rows.length > 15, bad.join('; ') || 'all equal');
  await go(p, '/');
  const quote = await p.locator('.lp-feat blockquote').innerText();
  const src = await p.locator('.lp-feat-foot a:not(.btn-secondary)').getAttribute('href');
  t('featured requirement shows the university wording, attributed with a source link and date', quote.length > 20 && /^https:\/\//.test(src) && /checked \d{1,2} \w+ \d{4}/.test(await p.locator('.lp-feat-foot p').innerText()), `${quote.slice(0, 60)}… ${src}`);
  await p.getByRole('button', { name: 'Show another course' }).click(); await p.waitForTimeout(200);
  t('  …and "Show another course" changes it', (await p.locator('.lp-feat blockquote').innerText()) !== quote);
  const nums = await p.evaluate(() => [...document.querySelectorAll('.lp-state b')].map((e) => e.textContent));
  t('record-state counts are computed (562 / 5 / 562 for this catalogue)', nums.join('/') === '562/5/562', nums.join('/'));
  await p.getByRole('button', { name: 'View coverage as a table' }).click(); await p.waitForTimeout(400);
  t('coverage can be read as a real table', (await p.locator('.lp-table tbody tr').count()) === 22);
  // keyboard (reload so focus starts at the document, as the existing QA does)
  await go(p, '/other'); await go(p, '/'); await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  await p.evaluate(() => document.activeElement?.blur?.());
  const first = []; for (let i = 0; i < 3; i++) { await p.keyboard.press('Tab'); first.push(await p.evaluate(() => (document.activeElement?.textContent ?? '').trim().slice(0, 24))); }
  t('keyboard: first tab stop is the skip link', /Skip to main/.test(first[0]), first.join(' | '));
  let reached = false;
  for (let i = 0; i < 60 && !reached; i++) { await p.keyboard.press('Tab'); reached = await p.evaluate(() => document.activeElement?.classList.contains('lp-subj') ?? false); }
  await p.waitForTimeout(450);
  const tr = await p.evaluate(() => getComputedStyle(document.querySelector('.lp-subj:focus-visible .lp-subj-name')).transform);
  t('keyboard: Tab reaches the subject rows and focus triggers the same kinetic state as hover', reached && tr !== 'none' && tr !== 'matrix(1, 0, 0, 1, 0, 0)', tr);
  await p.keyboard.press('Enter'); await p.waitForTimeout(500);
  t('  …and Enter opens that subject in the explorer', (await hash(p)).startsWith('#/search?subcategory='), await hash(p));
  await ctx.close();
}
/* 10. reduced motion */
{
  let { ctx, p } = await mk({}, { width: 1440, height: 900 }, { reducedMotion: 'no-preference' }); await go(p, '/');
  const on = await p.evaluate(() => getComputedStyle(document.querySelector('.mask-in')).animationName);
  t('motion on: the headline reveal animation is defined', on === 'mask-up', on);
  await ctx.close();
  ({ ctx, p } = await mk({}, { width: 1440, height: 900 }, { reducedMotion: 'reduce' })); await go(p, '/');
  const off = await p.evaluate(() => ({ a: getComputedStyle(document.querySelector('.mask-in')).animationName, tf: getComputedStyle(document.querySelector('.mask-in')).transform }));
  t('reduced motion: the headline is simply present (no animation, no offset)', off.a === 'none' && (off.tf === 'none' || off.tf === 'matrix(1, 0, 0, 1, 0, 0)'), JSON.stringify(off));
  await p.locator('.lp-subj').first().hover(); await p.waitForTimeout(300);
  const tf2 = await p.evaluate(() => getComputedStyle(document.querySelector('.lp-subj .lp-subj-name')).transform);
  t('  …hover does not move text', tf2 === 'none' || tf2 === 'matrix(1, 0, 0, 1, 0, 0)', tf2);
  const infinite = await p.evaluate(() => document.getAnimations().filter((a) => a.effect?.getTiming().iterations === Infinity).length);
  t('  …and nothing animates forever (also true with motion on)', infinite === 0);
  await ctx.close();
}
console.log(`\nROUTING RESULT: ${pass} pass, ${fail} fail`);
await b.close();
