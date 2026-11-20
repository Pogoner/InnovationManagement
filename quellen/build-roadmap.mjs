/**
 * Rebuild the current Part 6 deck from its historical editable source.
 * Source is preserved. Runtime: bundled @oai/artifact-tool, Node ES modules.
 * Usage: RUNTIME_NODE_MODULES=/path/to/node_modules node build-roadmap.mjs [build-dir]
 * Private candidate, renders and validation receipt stay outside the repository.
 * The validated final file is copied unchanged to step-6-roadmap-fester-pavillon.pptx.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const here = path.dirname(fileURLToPath(import.meta.url));
const runtimeRoot = '/opt/codex/runtimes/codex-primary-runtime/dependencies';
const modules = process.env.RUNTIME_NODE_MODULES ?? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ?? path.join(runtimeRoot, 'node/node_modules');
const python = process.env.RUNTIME_PYTHON ?? process.env.CODEX_PRIMARY_RUNTIME_PYTHON ?? path.join(runtimeRoot, 'python/bin/python3');
const skillDir = process.env.PRESENTATIONS_SKILL_DIR ?? '/home/agent/.codex/skills/builtins/presentations';
const { FileBlob, PresentationFile } = await import(pathToFileURL(path.join(modules, '@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const { finalizePresentation, makeNativeBulletParagraphs } = await import(pathToFileURL(path.join(skillDir, 'container_tools/artifact_tool_utils.mjs')).href);
const workspaceDir = path.resolve(process.argv[2] ?? path.join(here, '../../roadmap-build'));
const source = path.join(here, 'step-6-roadmap-pavillon.pptx');
const target = path.join(here, 'step-6-roadmap-fester-pavillon.pptx');
const dataContext = { window: {} };
vm.createContext(dataContext);
for (const name of ['planning-data.js', 'roadmap-contacts.js']) {
  vm.runInContext(await fs.readFile(path.join(here, '../pitch', name), 'utf8'), dataContext, { filename: name });
}
const contacts = dataContext.window.RoadmapContacts;
if (!Array.isArray(contacts) || contacts.length !== 5) throw new Error('Expected five verified public points of contact');
const budget = {
  land: 2.00, building: 9.00, kitchen: .60,
  management: .58, permits: .50, pilots: .40, marketing: .30,
  tangible: 11.60, startup: 1.78, total: 13.38
};
const cents = value => Math.round(value * 100);
if (cents(budget.land + budget.building + budget.kitchen) !== cents(budget.tangible)
  || cents(budget.management + budget.permits + budget.pilots + budget.marketing) !== cents(budget.startup)
  || cents(budget.tangible + budget.startup) !== cents(budget.total)
  || Number(dataContext.window.ROCKET_META.A.budget.replace(',', '.')) !== budget.total) {
  throw new Error('Florida scenario budget differs from the current roadmap');
}
const budgetThousands = value => String(Math.round(value * 1000));
const revision = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 17);
const runDir = path.join(workspaceDir, `revision-${revision}`);
await fs.mkdir(runDir, { recursive: true });
process.env.RUNTIME_NODE_MODULES = modules;
const p = await PresentationFile.importPptx(await FileBlob.load(source));
const before = await p.inspect({select:'$.slides[*]',include:['id','index','layout','elements.id','elements.name','elements.kind','elements.text']});
await fs.writeFile(path.join(runDir, 'source-layout.json'), JSON.stringify(before.records, null, 2));
await fs.writeFile(path.join(runDir, 'template-inventory.json'), JSON.stringify({masters:p.masters.items.map(m=>({id:m.id,name:m.name})),layouts:p.layouts.items.map(l=>({id:l.id,name:l.name,placeholders:l.placeholders.summary()}))},null,2));
if (p.slides.items.length !== 6) throw new Error('Expected six source slides');
const C = {white:'#FFFFFF',muted:'#ADADAD',blue:'#006B9D',lightBlue:'#50B6E8',panel:'#161616',line:'#3D3D3D',dim:'#222222'};
const FONT = 'Poppins';
function box(s, name, text, x, y, w, h, size=26, color=C.white, bold=false) {
  const shape=s.shapes.add({name,geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  shape.text=text; shape.text.style={fontSize:size,typeface:FONT,color,bold,autoFit:'none',wrap:'square',insets:0,verticalAlignment:'top'};
  return shape;
}
function rect(s,name,x,y,w,h,fill) {
  return s.shapes.add({name,geometry:'rect',position:{left:x,top:y,width:w,height:h},fill,line:{fill:'none',width:0}});
}
function title(s,text) {
  const t=s.shapes.items.find(e=>e.name==='Titel');
  if (!t) throw new Error('Missing original title');
  t.text=text; t.text.style={fontSize:50.67,typeface:FONT,color:C.white,bold:true,autoFit:'none',insets:0};
  t.position={left:162.24,top:99.84,width:1613.76,height:132};
}
function clearBody(i) {
  for (const e of before.records[i].elements) if (e.name!=='Titel') p.delete(e.id);
}
function footer(s,n) {
  box(s,`footer-${n}`,'Rocket-Light-Dinner · Teil 6 · Planannahmen vom 20.11.2026',162,1038,1480,22,17,C.muted);
  box(s,`folio-${n}`,String(n),1730,1038,46,22,17,C.muted);
}
function appendix(headline) {
  const s = p.slides.add({layoutId:p.slides.items[5].layout.id,background:{fill:'#000000'}});
  box(s,'Titel',headline,162.24,99.84,1613.76,132,50.67,C.white,true);
  return s;
}
function table(s,name,values,x,y,width,height,widths,font=24) {
  const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width,height,columnWidths:widths,values});
  t.styleOptions={headerRow:false,bandedRows:false};
  const all=t.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length});
  all.assign({fill:C.panel,textStyle:{fontSize:font,typeface:FONT,color:C.white},margins:{top:15,right:18,bottom:12,left:18},anchor:'center'});
  t.borders.assign({fill:C.line,width:1,style:'solid'});
  t.cells.block({row:0,column:0,rowCount:1,columnCount:values[0].length}).assign({fill:C.blue,textStyle:{fontSize:font,typeface:FONT,color:C.white,bold:true},margins:{top:14,right:18,bottom:12,left:18}});
  for(let r=1;r<values.length;r++) if(r%2===0)t.cells.block({row:r,column:0,rowCount:1,columnCount:values[0].length}).fill='#1B1B1B';
  return t;
}
const baseNote='Planungsstand: 20.11.2026. Eigene studentische Konzeptfortschreibung; alle Termine, Kapazitäten, Kosten und Rollen sind Planannahmen. Keine Grundstücks-, Genehmigungs-, Finanzierungs- oder Partnerzusage. Quellen: pitch/planning-data.js, ROCKET_DATA.A und ROCKET_META.A; pitch/roadmap-phases.js. 13,38 Mio. USD sind ein vorläufiges studentisches Florida-Projektbudget für Investition und Anlauf auf Basis der vorhandenen historischen Lounge-Kostenstruktur, keine neu validierte Pavillonkostenschätzung. Bis G2 anhand von Entwurf und Angeboten prüfen. Laufende Betriebskosten kommen im Fünfjahresmodell zusätzlich hinzu. Texas ist nicht enthalten. Die historische mobile Präsentation bleibt unverändert erhalten. Das neue Florida-Finanzszenario 2027–2031 steht in step-4-rocketlight-fester-pavillon.xlsx und auf der Website. Öffentliche Anlaufstellen: pitch/roadmap-contacts.js, Abruf 20.11.2026; niemand wurde kontaktiert oder beauftragt.';
function notes(i,detail) {p.slides.items[i].speakerNotes.text=baseNote+'\n\n'+detail;}

// 1 — Preserve the source cover image and original typography.
{
  const s=p.slides.items[0];
  const sub=s.shapes.items.find(e=>e.name==='Untertitel');
  sub.text='Ein Konzept. Zwei feste Standorte.\nFlorida zuerst · Texas langfristig\nPlanungsstand 20.11.2026';
  sub.text.style={fontSize:27,typeface:FONT,color:'#E6E6E6',autoFit:'none',insets:0};
  sub.position={left:150.72,top:696,width:920,height:150};
  box(s,'cover-image-status','Konzeptvisualisierung · keine Standort- oder Partnerzusage',150.72,1008,1430,30,18,'#C8C8C8');
  notes(0,'Die Titelfolie nutzt das bestehende Konzeptbild der historischen Präsentation. Es ist keine Aufnahme eines realen oder genehmigten Standorts. Neues Konzept: ein fester Pavillon in Titusville/Florida, später ein zweiter eigenständiger fester Bau im Raum Starbase/South Padre Island, Texas. Kein Transport des Gebäudes zwischen Standorten.');
}
// 2 — Keep the four-W cards and their source icons.
{
  const s=p.slides.items[1];
  title(s,'Ein fester Pavillon in Florida.\nLangfristig zwei eigenständige Standorte.');
  const bodies={
    'Text Was?':['Fester Pavillon für bis zu 20 Gäste in Titusville / Florida. Bauplatz und Sichtachse noch prüfen.','Vier eigene Pilot-Dinner erst im fertiggestellten und freigegebenen Pavillon.','Texas langfristig als zweiter fester Bau; Standort, Budget und Eröffnung offen.'],
    'Text Wer?':['Sponsor / Investitionsgremium und Projektleitung sind zu benennen; keine Zusagen.','Hospitality-Projektleitung mit Fachverantwortung für Standort, Bau und Sicherheit.','Architektur, Fachplanung, Bau sowie Kulinarik- und Servicepartner werden benötigt.'],
    'Text Wann?':['2027: Standort, Planung, Genehmigungen und Bauinvestition prüfen.','Bau: November 2027 bis August 2028. Betriebsfreigabe: September 2028.','Vier Piloten: Oktober 2028 bis Juni 2029. Auswertung und Betriebsentscheid: Juli 2029.'],
    'Text Wie?':['Bau erst nach Standort- und Investitionsfreigabe; eigene Piloten erst nach Abnahmen.','Investition und Anlauf: 13,38 Mio. USD als vorläufiges studentisches Arbeitsszenario; vor G2 prüfen.','Nachfrage, Gästefeedback, Abläufe und Kosten im Pilot prüfen; Erfolgskriterien vorab festlegen.']
  };
  for(const [name,items] of Object.entries(bodies)){
    const sh=s.shapes.items.find(e=>e.name===name);if(!sh)throw new Error(name);
    sh.text=makeNativeBulletParagraphs(items,{marginLeftPoints:15,hangingPoints:9,spaceAfterPoints:8});
    sh.text.style={fontSize:24,typeface:FONT,color:C.white,autoFit:'none',insets:0};
  }
  notes(1,'Die vier W-Fragen strukturieren Ziel, Verantwortung, Termine und Umsetzung. Rollen sind Vorschläge und noch nicht besetzt. Der Bauzeitraum 01.11.2027–31.08.2028 und alle Dinnertermine bleiben hypothetisch; reale Termine hängen von geeigneten Startfenstern und örtlichen Freigaben ab. Preisannahmen sind keine nachgewiesene Zahlungsbereitschaft.');
}
// 3 — Native editable project table.
{
  const s=p.slides.items[2];clearBody(2);
  title(s,'Sechs Teilprojekte schaffen die Basis\nfür vier eigene Pilot-Dinner in Florida.');
  const rows=[
    ['Nr.','Teilprojekt','Arbeitspaket','Prüfbares Ergebnis'],
    ['1','Standort &\nGenehmigungen','Fläche, Sichtachse und Zugang prüfen;\nStandort-, Bau- und Betriebsfreigaben klären.','Geeignete Standortoption;\nZuständigkeiten und Auflagen geklärt.'],
    ['2','Architektur & Bau','Festen Pavillon entwerfen und neu kalkulieren;\nnach G2 bauen, anschließend abnehmen.','Eigener Pavillon vor dem ersten\nPilot betriebsbereit.'],
    ['3','Kulinarik & Betrieb','Partner, Menü und Service entwickeln;\nTeam im fertigen Pavillon schulen.','Testservice vor G3;\nAbläufe für die Piloten freigegeben.'],
    ['4','Vertrieb & Pilotgäste','Interesse, Warteliste, Buchungen und Stornos\nerfassen; Preishypothese überprüfen.','Nachfrage wird anhand realer\nPilotdaten beurteilt.'],
    ['5','Vier Pilot-Dinner','Vier Abende im eigenen Florida-Pavillon,\njeweils bis zu 20 Gäste.','Gästerückmeldungen, Abläufe\nund tatsächliche Kosten für G4.'],
    ['6','Betrieb &\nAusbauprüfung','Florida-Piloten auswerten; langfristig einen\neigenständigen festen Texas-Standort prüfen.','Betriebsentscheid für Florida;\nTexas separat und ohne Opening-Datum.']
  ];
  const t=table(s,'Sechs Teilprojekte',rows,162,264,1614,682,[80,350,660,524],24);
  t.rows[0].height=68;for(let r=1;r<7;r++)t.rows[r].height=102;
  box(s,'projects-note','20 Plätze je Standort sind eine Konzeptannahme. Grundstücke und Partner sind noch nicht gesichert.',162,970,1600,38,23,C.muted);
  footer(s,3);
  notes(2,'Quelle der sechs Teilprojekte: pitch/planning-data.js, ROCKET_DATA.A.t1. Für die Folie sprachlich gekürzt; keine neuen Partner- oder Genehmigungsbehauptungen. Die Kapazität von 20 Gästen ist eine Konzeptannahme. Bei vier Piloten ergibt sich höchstens eine Kapazität von 80 Plätzen; dies ist weder eine Buchungs- noch Umsatzprognose.');
}
// 4 — Native responsibility table plus the qualified current Florida scenario.
{
  const s=p.slides.items[3];clearBody(3);
  title(s,'Verantwortung zuordnen.\nInvestitionen erst nach belastbaren Freigaben.');
  const rows=[
    ['Bereich','Vorgeschlagene Leitung','Freigabe / Nachweis'],
    ['Gesamtprojekt','Projektleitung;\nSponsor / Gremium offen','G0: Auftrag\nG2: Bauinvestition'],
    ['Standort &\nGenehmigungen','Lead Standort / Sicherheit;\nörtliche Stellen klären','G1: Standortoption\nG2: Genehmigungen'],
    ['Architektur & Bau','Lead Bau; Architektur,\nFachplanung und Baupartner','G2: Kostenvalidierung\nG3: Fertigstellung'],
    ['Kulinarik & Betrieb','Hospitality-Projektleitung;\nService- und Kulinarikpartner','G3: Team und\nBetriebsbereitschaft'],
    ['Vertrieb & Piloten','Sales-Lead; Hospitality-\nProjektleitung','Pilotdaten erfassen;\nKosten dokumentieren'],
    ['Betrieb & Ausbau','Betriebsleitung;\nProjekt- / Investitionsgremium','G4: Florida prüfen;\nTexas separat entscheiden']
  ];
  const t=table(s,'Verantwortung und Freigaben',rows,162,264,1044,704,[280,420,344],23);
  t.rows[0].height=68;for(let r=1;r<7;r++)t.rows[r].height=106;
  rect(s,'budget-panel',1236,264,540,704,C.panel);rect(s,'budget-rule',1236,264,540,6,C.blue);
  box(s,'budget-label','FLORIDA · ARBEITSSZENARIO',1268,302,476,42,22,C.lightBlue,true);
  box(s,'budget-range','13,38 Mio. USD',1268,364,476,68,45,C.white,true);
  box(s,'budget-context','11,60 Mio. Sachinvestitionen\n+ 1,78 Mio. Entwicklung / Anlauf\n= Investition und Anlauf Florida',1268,451,476,133,25);
  box(s,'budget-action','Studentische Annahme.\nVor G2 durch Entwurf\nund Angebote prüfen.',1268,625,476,134,30,C.white,true);
  box(s,'budget-texas','Laufende Betriebskosten zusätzlich.\nTexas ist nicht enthalten.\nKostenüberleitung im Anhang.',1268,814,476,112,24,C.muted);
  box(s,'roles-note','Alle Rollen sind Planvorschläge. Beauftragungen, Zuständigkeiten und Investitionsfreigaben stehen aus.',162,990,1614,32,22,C.muted);
  footer(s,4);
  notes(3,'Verantwortungslogik: pitch/planning-data.js, A.t2 und ROCKET_META.A.gates. Rollen sind nicht beauftragt. 13,38 Mio. USD: vorläufiges studentisches Projektbudget für Investition und Anlauf des festen Florida-Standorts, übernommen aus der Kostenstruktur der historischen größeren Lounge. Sachinvestitionen 11,60 Mio. USD (Grundstück 2,00; Architektur/Bau 9,00; Küche 0,60) sowie Entwicklung/Anlauf 1,78 Mio. USD (Projektmanagement 0,58; Gutachten/Genehmigungen 0,50; Pilotvorbereitung 0,40; Markteinführung 0,30). Laufende Betriebskosten kommen im Fünfjahresmodell zusätzlich hinzu. Der historische Rahmen 10–15 Mio. USD ist eine Referenz, keine neue Pavillonkalkulation. Der alte mobile F&E-/Projektblock von 3,48 Mio. USD wird nicht zusätzlich addiert, weil er bereits Bau- und Pilotkosten enthielt. Entwurf und Angebote müssen das vorläufige Arbeitsszenario vor G2 validieren. Texas, Finanzierung und eine zusätzliche Reserve sind nicht im Projektbetrag enthalten.');
}
// 5 — Native editable planning matrix, not a flattened roadmap image.
{
  const s=p.slides.items[4];clearBody(4);
  title(s,'Der feste Bau kommt vor den Piloten.\nFünf Gates führen von der Planung zur Auswertung.');
  const rows=[
    ['Arbeitsphase','2026 Q4','2027','2028 H1','2028 H2','2029 bis Juli'],
    ['1  Standort prüfen','Auftrag','Standortoption','','',''],
    ['2  Machbarkeit / Freigaben','','Prüfen','','',''],
    ['3  Entwurf','','Entwerfen','','',''],
    ['4  Detailplanung / Investition','','G2 · 30.09.','','',''],
    ['5  Fester Bau · 11/27–08/28','','ab 01.11.','Bau','bis 31.08.',''],
    ['6  Betriebsbereitschaft · 09/28','','','','Abnahmen / G3',''],
    ['7  Vier eigene Pilot-Dinner','','','','15.10. / 15.12.','15.03. / 15.06.'],
    ['8  Betrieb / Ausbau prüfen','','','','','G4 · 31.07.']
  ];
  const t=table(s,'Acht Phasen Zeitplan',rows,162,266,1614,594,[474,170,245,220,253,252],23);
  for(let r=0;r<9;r++)t.rows[r].height=66;
  const active=[[1,1],[1,2],[2,2],[3,2],[4,2],[5,2],[5,3],[5,4],[6,4],[7,4],[7,5],[8,5]];
  for(const[r,c]of active){t.getCell(r,c).fill=(r===7)?'#075A7A':'#174455';t.getCell(r,c).text.style={fontSize:22,typeface:FONT,color:C.white,bold:r===7};}
  const gates=[['G0','30.11.2026','Projektauftrag'],['G1','31.03.2027','Standortoption'],['G2','30.09.2027','Bauinvestition'],['G3','30.09.2028','Pilotfreigabe'],['G4','31.07.2029','Betrieb / Ausbau']];
  gates.forEach((g,i)=>{const x=162+i*328;box(s,`gate-${g[0]}`,`${g[0]}  ${g[1]}`,x,893,306,38,26,C.lightBlue,true);box(s,`gate-label-${g[0]}`,g[2],x,939,306,34,22);});
  box(s,'dates-caveat','Alle Daten sind Planannahmen. Reale Dinnertermine brauchen geeignete Startfenster und örtliche Freigaben.',162,990,1614,32,22,C.muted);
  footer(s,5);
  notes(4,'Verbindlicher Quellenstand für die dargestellten Planannahmen: pitch/roadmap-planstand.md und pitch/planning-data.js, ROCKET_DATA.A.rows / ROCKET_META.A.gates, 20.11.2026. G0 30.11.2026, G1 31.03.2027, G2 30.09.2027, G3 30.09.2028, G4 31.07.2029. Bau 01.11.2027–31.08.2028; Betriebsbereitschaft/Abnahmen im September 2028. Eigene Piloten im fertiggestellten Florida-Pavillon: 15.10.2028, 15.12.2028, 15.03.2029, 15.06.2029. Auswertung im Juli 2029. Die Jahres-/Halbjahresmatrix zeigt Planungsfenster, keine Tagesdauer je Teilaufgabe. Texas hat bewusst keinen Eröffnungstermin.');
}
// 6 — Conditional second site and transparent provenance.
{
  const s=p.slides.items[5];clearBody(5);
  title(s,'Erst Florida im Betrieb beweisen.\nDann Texas als eigenen Standort entscheiden.');
  for(const[x,w]of[[162,790],[982,794]]){rect(s,`closing-panel-${x}`,x,266,w,564,C.panel);rect(s,`closing-rule-${x}`,x,266,w,6,C.blue);}
  box(s,'fl-label','1  FLORIDA ZUERST',194,302,722,45,28,C.lightBlue,true);
  box(s,'fl-title','Fester Pavillon in Titusville',194,370,722,52,36,C.white,true);
  box(s,'fl-copy','Eigener Bau für bis zu 20 Gäste.\nVier Piloten von Oktober 2028 bis Juni 2029.\n\nAn G4 am 31.07.2029 entscheiden:\nTragen Nachfrage, Abläufe und tatsächliche\nKosten einen regulären Florida-Betrieb?',194,456,722,293,28);
  box(s,'tx-label','2  TEXAS LANGFRISTIG',1014,302,730,45,28,C.lightBlue,true);
  box(s,'tx-title','Zweiter eigenständiger fester Bau',1014,370,730,52,34,C.white,true);
  box(s,'tx-copy','Raum Starbase / South Padre Island prüfen.\nFlorida bleibt am ersten Standort bestehen.\n\nEigene Fläche, Genehmigungen und\nInvestitionsfreigabe erforderlich.\nBauplatz, Budget und Opening bleiben offen.',1014,456,730,293,28);
  box(s,'sources-title','ANNAHMEN UND QUELLEN',162,867,1614,35,23,C.lightBlue,true);
  box(s,'sources-copy','Planung: planning-data.js (A / META.A) und roadmap-phases.js, 20.11.2026.\nInvestition / Anlauf Florida: 13,38 Mio. USD als Arbeitsszenario; Kosten und Anlaufstellen im Anhang.\n20 Plätze und sämtliche Termine sind Annahmen. Nachfrage und Zahlungsbereitschaft müssen die Piloten prüfen.',162,916,1614,104,23,C.muted);
  footer(s,6);
  notes(5,'Texas ist eine bedingte langfristige Perspektive, abhängig von belastbaren Florida-Ergebnissen und einer eigenen Standort-, Genehmigungs- und Investitionsprüfung. Es ist kein Umzug, keine gesicherte Expansion und kein festes Opening. Der Florida-Projektansatz von 13,38 Mio. USD finanziert keinen zweiten Standort. Die vier Pilottermine sind 15.10.2028, 15.12.2028, 15.03.2029 und 15.06.2029; G4-Auswertung am 31.07.2029. Budgetüberleitung siehe Anhang 1, öffentlich recherchierte Anlaufstellen siehe Anhang 2. Die Folien enthalten keine neu verifizierten FAA-, Michelin- oder aktuellen Personalbehauptungen.');
}

// 7 — Editable budget bridge: current scenario, historical figures and scope.
{
  const s=appendix('Anhang 1 · 13,38 Mio. USD für Florida.\nSachinvestitionen und Anlaufkosten sauber trennen.');
  const rows=[
    ['Kostenblock','Tsd. USD'],
    ['Grundstück',budgetThousands(budget.land)],
    ['Architektur und Bau',budgetThousands(budget.building)],
    ['Küche und Ausstattung',budgetThousands(budget.kitchen)],
    ['Sachinvestitionen',budgetThousands(budget.tangible)],
    ['Projektmanagement',budgetThousands(budget.management)],
    ['Gutachten / Genehmigungen',budgetThousands(budget.permits)],
    ['Pilotvorbereitung',budgetThousands(budget.pilots)],
    ['Markteinführung',budgetThousands(budget.marketing)],
    ['Entwicklung und Anlauf',budgetThousands(budget.startup)],
    ['Investition und Anlauf · Florida',budgetThousands(budget.total)]
  ];
  const t=table(s,'Florida Kostenüberleitung',rows,162,264,956,660,[736,220],25);
  for(let r=0;r<rows.length;r++)t.rows[r].height=60;
  for(const r of [4,9,10])t.cells.block({row:r,column:0,rowCount:1,columnCount:2}).assign({fill:r===10?C.blue:'#174455',textStyle:{fontSize:25,typeface:FONT,color:C.white,bold:true}});
  box(s,'scenario-label','STUDENTISCHES ARBEITSSZENARIO',1160,270,616,42,24,C.lightBlue,true);
  box(s,'scenario-origin','Vorhandene Kostenstruktur der\ngrößeren historischen Lounge.\nKeine neu validierte Pavillon-\nkostenschätzung.',1160,332,616,159,28);
  box(s,'scenario-gate','Bis G2 mit Entwurf / Angeboten prüfen.\nLaufende Betriebskosten kommen\nim Fünfjahresmodell zusätzlich hinzu.\nTexas und zusätzliche Reserve offen.',1160,523,616,154,27);
  box(s,'scenario-no-double-count','Die alten 3,48 Mio. USD nicht addieren.',1160,706,616,78,28,C.white,true);
  box(s,'scenario-old-costs','Der mobile Projektblock enthielt\nbereits Bau- und Pilotkosten.\n10–15 Mio. USD bleiben lediglich\nder historische Orientierungsrahmen.',1160,794,616,142,25,C.muted);
  box(s,'scenario-model-link','Jahresmodell 2027–2031: step-4-rocketlight-fester-pavillon.xlsx · Website, Kapitel 4',162,976,1614,36,24,C.muted);
  footer(s,7);
  notes(6,'Die Tabelle ist eine Kostenüberleitung, keine Angebots- oder Marktkostenermittlung. Tabellenbeträge in Tsd. USD. Die drei Sachinvestitionspositionen summieren sich auf 11600; die vier Anlaufpositionen auf 1780; beides zusammen ergibt 13380 Tsd. USD, also 13,38 Mio. USD. Laufende Betriebskosten kommen im Fünfjahresmodell zusätzlich hinzu. Der alte mobile Projekt-/F&E-Block von 3,48 Mio. USD wird nicht addiert. Die sachliche Trennung ist eine Modellabgrenzung, keine verbindliche steuerliche Bilanzierung. 10–15 Mio. USD ist nur die historische Lounge-Referenz. Texas, Finanzierung, Steuern und eine zusätzliche Risikoreserve werden nicht durch diese Summe gedeckt. Neues Finanzszenario: quellen/step-4-rocketlight-fester-pavillon.xlsx und Website-Kapitel 4; Erlöse und Betriebskosten sind dort gesonderte studentische Annahmen, keine nachgewiesene Nachfrage.');
}

// 8 — Official public offices and an architecture practice; no partnership claim.
{
  const s=appendix('Anhang 2 · Konkrete Anlaufstellen in Florida.\nÖffentliche Kontakte, noch keine Beauftragungen.');
  const labels={
    'titusville-planning':['City of Titusville · Planning','Standortnutzung / Zoning · Phasen 1–3'],
    'titusville-building':['City of Titusville · Building','Bauplanprüfung / Abnahmen · Phasen 2, 4, 5'],
    'space-florida':['Space Florida','Standort- und Entwicklungsanfragen · Phasen 1, 4'],
    'sjrwmd-palm-bay':['SJRWMD · Palm Bay Service Center','Wasser / Standort / Permitfragen · Phasen 1, 2'],
    'brph-melbourne':['BRPH · Architektur und Ingenieurplanung','Entwurf / Kosten / Fachplanung · Phasen 3–5']
  };
  contacts.forEach((contact,i)=>{
    const y=264+i*140;
    const [name,purpose]=labels[contact.id];
    rect(s,`contact-row-${i}`,162,y,1614,128,i%2?C.panel:'#1B1B1B');
    box(s,`contact-name-${i}`,name,182,y+15,657,39,26,C.white,true);
    box(s,`contact-purpose-${i}`,purpose,182,y+63,657,56,23,C.muted);
    box(s,`contact-phone-${i}`,contact.phone,866,y+17,286,39,26,C.lightBlue,true);
    const address=contact.address.replace(', USA','').replace(', ', '\n');
    box(s,`contact-address-${i}`,address,1183,y+13,564,70,24);
    const link=box(s,`contact-source-${i}`,'Offizielle Kontaktdaten ↗',866,y+67,286,33,22,C.lightBlue);
    link.text.get('Offizielle Kontaktdaten ↗').link={uri:contact.url,isExternal:true};
    link.text.get('Offizielle Kontaktdaten ↗').color=C.lightBlue;
  });
  box(s,'contact-status','Abruf 20.11.2026 · Nur Anlaufstellen, nicht kontaktiert oder beauftragt. Vollständige URLs in den Foliennotizen.',162,980,1614,40,23,C.muted);
  footer(s,8);
  notes(7,'Kontaktdaten stammen ausschließlich aus den folgenden offiziellen Organisationsseiten, abgerufen am 20.11.2026. Der vorgeschlagene Gesprächszweck und die Phasenzuordnung sind redaktionelle Planvorschläge. Keine Organisation wurde kontaktiert, beauftragt oder als bestätigter Kooperationspartner eingeplant. Zuständigkeit und Eignung für ein konkretes Grundstück müssen erst geklärt werden.\n\n'+contacts.map(c=>`${c.title}\nFunktion / Anfrage: ${c.purpose}\nAnschrift: ${c.address}\nTelefon: ${c.phone}\nQuelle: ${c.url}\nAbruf: ${c.checked}\nStatus: ${c.status}`).join('\n\n'));
}

await fs.writeFile(path.join(runDir,'updated-inspect.json'),JSON.stringify((await p.inspect({select:'$.slides[*]',include:['id','index','elements.id','elements.name','elements.text','notes.text']})).records,null,2));
const candidate=path.join(runDir,'candidate.pptx');
await(await PresentationFile.exportPptx(p)).save(candidate);
console.log('Candidate exported',candidate);
const finalDir=path.join(runDir,'final');
await fs.mkdir(finalDir,{recursive:true});
const finalPath=path.join(finalDir,'step-6-roadmap-fester-pavillon.pptx');
const result=await finalizePresentation({
  workspaceDir,candidatePath:candidate,finalPath,pythonExecutable:python,
  integrityValidatorPath:path.join(skillDir,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(skillDir,'container_tools/inspect_presentation_layout_geometry.py'),
  explicitTotalSlideCount:8,requiredNativeTableOwnerSlides:[3,4,5,7],
  tableArithmeticContracts:[
    {slide:7,table:1,label_column:0,total_row:4,value_columns:[1],component_rows:[1,2,3]},
    {slide:7,table:1,label_column:0,total_row:9,value_columns:[1],component_rows:[5,6,7,8]},
    {slide:7,table:1,label_column:0,total_row:10,value_columns:[1],component_rows:[4,9]}
  ],
  layoutArgs:['--expected-slide-size-emu','18288000,10287000','--validate-bullet-geometry','--validate-heading-fit',...['3','4','5','7'].flatMap(n=>['--require-native-table-slide',n])],
  fontPolicy:{basis:'reference',families:[FONT],referencePath:source,referenceSha256:createHash('sha256').update(await fs.readFile(source)).digest('hex')},
  verifyArtifactToolImport:true,receiptPath:path.join(runDir,'validation.json')
});
console.log('Finalized',JSON.stringify({path:result.finalPath,receipt:result.receiptPath}));
const verified=await PresentationFile.importPptx(await FileBlob.load(finalPath));
for(const[i,s]of verified.slides.items.entries()){
  await fs.writeFile(path.join(runDir,`slide-${i+1}.png`),new Uint8Array(await(await verified.export({slide:s,format:'png',scale:1})).arrayBuffer()));
  await fs.writeFile(path.join(runDir,`slide-${i+1}.layout.json`),await(await s.export({format:'layout'})).text());
  console.log('Rendered final slide',i+1);
}
await fs.copyFile(finalPath,target);
console.log('Published validated file',target);
console.log('Review every final slide PNG in',runDir);
