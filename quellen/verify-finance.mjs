// Run with Node from any directory. Verifies the shared scenario, roadmap,
// story and rendered SVG inputs without touching workbook or booking state.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const context={console};context.window=context;
vm.createContext(context);
for(const file of ['rechner/assets/js/model.js','rechner/assets/js/data.js','pitch/planning-data.js','pitch/finance-model.js','pitch/research.js','pitch/evidence.js','pitch/roadmap-phases.js','pitch/film-story.js','pitch/film-experience.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
}
const f=context.PitchEvidence.fixedFinance;
const close=(actual,expected,label)=>assert.ok(Math.abs(actual-expected)<0.01,`${label}: ${actual} != ${expected}`);
assert.equal(f.pilotDates.join(','),'2028-10-15,2028-12-15,2029-03-15,2029-06-15');
assert.equal(f.gateDates.G3,'2028-09-30');assert.equal(f.gateDates.G4,'2029-07-31');
assert.equal(f.annual.map(y=>y.pilotEvents).join(','),'0,2,2,0,0');
assert.equal(f.annual.map(y=>y.regularEvents).join(','),'0,0,0,10,16');
for(const [key,expected] of Object.entries({revenue:25640000,operatingCosts:6660000,projectOutflows:13380000,totalOutflows:20040000,cumulativeCashFlow:5600000}))close(f.totals[key],expected,key);
close(f.budget.capexTotal,11600000,'Sachinvestitionen');close(f.budget.startupTotal,1780000,'Entwicklung und Anlauf');
close(f.financing.indicativeBeforeFirstPilot,13180000,'Mittelbedarf vor Piloten');
close(f.financing.largestYearEndDeficit,13060000,'Jahresend-Unterdeckung');
const cash=[-4540000,-7980000,-540000,6900000,11760000];
f.annual.forEach((row,i)=>{
  close(row.annualCashFlow,cash[i],`Cashflow ${row.year}`);
  close(row.revenue-row.totalOutflows,row.annualCashFlow,`Abgleich ${row.year}`);
});
close(f.scenarios.find(s=>s.id==='downside').totals.cumulativeCashFlow,-2720000,'Vorsichtiges Szenario');
close(f.scenarios.find(s=>s.id==='upside').totals.cumulativeCashFlow,6770000,'95 % Auslastung');
// Original Hube selection remains reproducible and is never added to the new budget.
close(context.PitchEvidence.financialA.C,3480000,'Historische mobile Rechnung');
close(context.PitchEvidence.fixedPilot.revenue,2240000,'Piloten in beiden Modellen');
assert.equal(context.PitchEvidence.fixedPilot.capacity,f.inputs.seats);
assert.equal(context.PitchEvidence.fixedPilot.price,f.inputs.pilotPrice);
assert.equal(context.PitchEvidence.fixedPilot.targetPrice,f.inputs.regularPrice);
const chapter=context.PitchFilmStory.find(c=>c.step===5);
assert.equal(chapter.beats.length,6);
assert.equal(context.PitchRoadmapPhases.A.length,8);
assert.ok(chapter.beats.every((beat,i)=>beat.still>=beat.at&&(i===5||beat.still<chapter.beats[i+1].at)));
const svg=context.PitchScenes[5].markup();
for(const selector of ['data-fe-layout','data-fe-panorama','data-fe-price','data-fe-scale','data-fe-econ','data-fe-sensitivity'])assert.ok(svg.includes(selector),selector);
assert.equal((svg.match(/data-fe-fin-revenue=/g)||[]).length,5);
assert.equal((svg.match(/data-fe-case=/g)||[]).length,2);
assert.ok(!svg.includes('kein buchbares Angebot'));
assert.ok(!svg.includes('IM PLUS AB JAHR 4'));
assert.ok(!/NaN|undefined|Infinity/.test(svg));
console.log('OK: roadmap, cost bridge, five-year cashflow, sensitivity and six story phases agree.');
