// v2 Phase 5 visual-regression check.
//   node qa.visual.mjs            compare against visual-baselines/*.png
//   node qa.visual.mjs --update   (re)write the baselines after an intended change
// Needs a preview server on 4321 and global Playwright (Chromium only in this sandbox).
// Screenshots are taken with reduced motion and all transitions frozen, at 1x scale, in the
// first viewport of each page (or of one component), so they are stable between runs.
// Pixel comparison uses Playwright's own comparator (an internal module: if it cannot be
// loaded the script falls back to exact byte equality and says so).
import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js';
import { createRequire } from 'node:module';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
const { chromium } = pkg;
const BASE = process.env.BASE ?? 'http://127.0.0.1:4321';
const DIR = new URL('./visual-baselines/', import.meta.url).pathname;
const UPDATE = process.argv.includes('--update');
const MAX_RATIO = 0.003; // share of pixels allowed to differ
mkdirSync(DIR, { recursive: true });

let compare = null;
try {
  const req = createRequire(import.meta.url);
  const path = '/home/claude/.npm-global/lib/node_modules/@playwright/mcp/node_modules/playwright-core/lib/server/utils/comparators.js';
  compare = req(path).getComparator('image/png');
} catch { console.log('NOTE  pixel comparator unavailable; using exact byte equality'); }

const profile = { aLevels: [{ id: '1', subject: 'Mathematics', grade: 'A*' }, { id: '2', subject: 'Physics', grade: 'A' }, { id: '3', subject: 'Further Mathematics', grade: 'A' }, { id: '4', subject: 'Chemistry', grade: 'B' }], gcses: [], applicationYear: '2027', schoolOffersFurtherMathematics: true, notes: '' };
const ids = ['imperial-physics-msci--2027', 'ucl-physics-bsc--2027', 'durham-physics-bsc--2027'];
const seed = {
  'ukcf.profile.v1': JSON.stringify(profile),
  'ukcf.savedCourses.v1': JSON.stringify(ids),
  'ukcf.savedUniversities.v1': JSON.stringify(['durham']),
  'ukcf.compare.v1': JSON.stringify(ids),
  'ukcf.entryYear.v1': JSON.stringify('2027'),
};
const PAGES = [
  ['landing', '/', null, [1280, 390]],
  ['search', '/search?q=physics', null, [1280, 390]],
  ['browse', '/browse', null, [1280, 390]],
  ['universities', '/universities', null, [1280, 390, 768]],
  ['university', '/university/imperial', null, [1280, 390, 768]],
  ['course', '/course/ucl-physics-bsc--2027', null, [1280, 390, 768]],
  ['compare', '/compare', null, [1280, 390]],
  ['shortlist', '/shortlist', null, [1280, 390]],
  ['coverage-matrix', '/about', '[data-testid=coverage-matrix]', [1280, 390]],
];
const FREEZE = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}';

const b = await chromium.launch();
let pass = 0, fail = 0, made = 0;
for (const [name, hash, sel, widths] of PAGES) {
  for (const w of widths) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    await ctx.addInitScript((o) => { for (const [k, v] of Object.entries(o)) localStorage.setItem(k, v); }, seed);
    const p = await ctx.newPage();
    await p.goto(`${BASE}/#${hash}`, { waitUntil: 'networkidle' });
    await p.addStyleTag({ content: FREEZE });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(600);
    const shot = sel ? await p.locator(sel).first().screenshot() : await p.screenshot();
    await ctx.close();
    const file = `${DIR}${name}-${w}.png`;
    if (UPDATE || !existsSync(file)) { writeFileSync(file, shot); made++; console.log(`WROTE ${name} @${w}`); continue; }
    const base = readFileSync(file);
    let ok, detail = '';
    if (compare) {
      const r = compare(shot, base, { maxDiffPixelRatio: MAX_RATIO, threshold: 0.2 });
      ok = r === null; detail = ok ? '' : String(r?.errorMessage ?? 'differs').split('\n')[0];
      if (!ok) writeFileSync(`${DIR}${name}-${w}.actual.png`, shot);
    } else { ok = Buffer.compare(shot, base) === 0; }
    ok ? pass++ : fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} @${w}${detail ? ' — ' + detail : ''}`);
  }
}
await b.close();
console.log(`\nVISUAL RESULT: ${pass} pass, ${fail} fail${made ? `, ${made} baseline(s) written` : ''}`);
process.exit(fail ? 1 : 0);
