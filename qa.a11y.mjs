// v2 Phase 5 accessibility sweep (axe-core, WCAG 2.0/2.1/2.2 A+AA rules) on the redesigned pages.
// axe-core is not a dependency of the app: point AXE_CORE at an axe.min.js (npm i axe-core elsewhere).
// W=1440,390 limits the widths. Needs a preview server on 4321.
import pkg from '/home/claude/.npm-global/lib/node_modules/playwright/index.js'; const {chromium}=pkg;
import { readFileSync } from 'node:fs';
const axe = readFileSync(process.env.AXE_CORE||'/tmp/claude-0/-home-claude/81176745-2655-5be5-baf8-cb3545964b00/scratchpad/tools/node_modules/axe-core/axe.min.js','utf8');
const BASE='http://127.0.0.1:4321'; const b=await chromium.launch();
const prof={aLevels:[{id:'1',subject:'Mathematics',grade:'A*'},{id:'2',subject:'Physics',grade:'A'},{id:'3',subject:'Chemistry',grade:'A'}],gcses:[],applicationYear:'2027',schoolOffersFurtherMathematics:true,notes:''};
const run=async(label,w,{grades=false,hash='/',steps,compare}={})=>{
  const ctx=await b.newContext({viewport:{width:w,height:900}}); const p=await ctx.newPage();
  await p.addInitScript(([g,pr,cm])=>{if(g)localStorage.setItem('ukcf.profile.v1',JSON.stringify(pr)); if(cm){localStorage.setItem('ukcf.compare.v1',JSON.stringify(cm));localStorage.setItem('ukcf.savedCourses.v1',JSON.stringify(cm));localStorage.setItem('ukcf.savedUniversities.v1',JSON.stringify(['durham']))}},[grades,prof,compare||null]);
  await p.goto(`${BASE}/#${hash}`,{waitUntil:'networkidle'}); await p.waitForTimeout(500);
  if(steps) await steps(p);
  await p.addScriptTag({content:axe});
  const r=await p.evaluate(async()=>{const res=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return res.violations.map(v=>`${v.id} [${v.impact}] x${v.nodes.length}: ${v.nodes.slice(0,2).map(n=>n.target.join(' ')+' '+(n.any[0]?.message||'').slice(0,100)).join(' | ')}`)});
  console.log(`${label.padEnd(44)} ${w}`,r.length?'\n   '+r.join('\n   '):'no violations'); await ctx.close(); return r.length;
};
let total=0; const trio=['imperial-physics-msci--2027','ucl-physics-bsc--2027','durham-physics-bsc--2027'];
for(const w of (process.env.W||'1440,820,390,320').split(',').map(Number)){
  total+=await run('university detail',w,{hash:'/university/imperial',grades:true});
  total+=await run('university detail, Physics filter',w,{hash:'/university/imperial',steps:async p=>{await p.locator('.ud-seg').getByRole('button',{name:/^Physics/}).click();await p.waitForTimeout(300)}});
  total+=await run('university detail, 2028',w,{hash:'/university/durham'});
  total+=await run('shortlist workspace',w,{hash:'/shortlist',compare:trio,grades:true});
  total+=await run('shortlist, two picked',w,{hash:'/shortlist',compare:trio,steps:async p=>{await p.locator('.sl-pick input').nth(0).check();await p.locator('.sl-pick input').nth(1).check();await p.waitForTimeout(300)}});
  total+=await run('shortlist, empty',w,{hash:'/shortlist'});
  total+=await run('compare',w,{hash:'/compare',compare:trio,grades:true});
  total+=await run('compare, show same rows',w,{hash:'/compare',compare:trio,steps:async p=>{const bt=p.getByRole('button',{name:/same/i}).first(); if(await bt.count()) await bt.click(); await p.waitForTimeout(300)}});
  total+=await run('about + coverage matrix (stacked on phone)',w,{hash:'/about'});
  total+=await run('course page + ledger',w,{hash:'/course/imperial-physics-msci--2027',grades:true});
  total+=await run('search, ladder open',w,{hash:'/search',steps:async p=>{await p.locator('.ol-toggle').click();await p.waitForTimeout(450);await p.locator('.ol-rung-btn').first().click();await p.waitForTimeout(450)}});
  total+=await run('search, ladder table',w,{hash:'/search',steps:async p=>{await p.locator('.ol-toggle').click();await p.waitForTimeout(450);await p.getByRole('button',{name:'Show as a table'}).click();await p.waitForTimeout(300)}});
}
console.log('TOTAL violating rules:',total); await b.close();
