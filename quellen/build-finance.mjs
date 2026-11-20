/** Build the editable fixed-pavilion scenario workbook from the shared website model.
 * Runtime: bundled @oai/artifact-tool. Original step-4-rocketlight.xlsm is read-only.
 * Run with the bundled Node executable; optional first argument is a private output directory.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.dirname(here);
const runtimeRoot = '/opt/codex/runtimes/codex-primary-runtime/dependencies';
const modules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ?? process.env.RUNTIME_NODE_MODULES ?? path.join(runtimeRoot, 'node/node_modules');
const outputDir = path.resolve(process.argv[2] ?? path.join(repo, '../outputs/rocketlight-finance'));
await fs.mkdir(outputDir, { recursive: true });
const modulesLink = path.join(outputDir, 'node_modules');
try { await fs.symlink(modules, modulesLink, 'dir'); } catch (error) { if (error.code !== 'EEXIST') throw error; }
const { Workbook, SpreadsheetFile, FileBlob } = await import(pathToFileURL(path.join(modules, '@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const name of ['planning-data.js', 'finance-model.js']) vm.runInContext(await fs.readFile(path.join(repo, 'pitch', name), 'utf8'), sandbox);
const model = sandbox.window.RocketFinance.build(sandbox.window.ROCKET_DATA, sandbox.window.ROCKET_META);
const source = path.join(here, 'step-4-rocketlight.xlsm');
const sourceHash = createHash('sha256').update(await fs.readFile(source)).digest('hex');
const wb = Workbook.create();
const main = wb.worksheets.add('Fünfjahresübersicht');
const assumptions = wb.worksheets.add('Annahmen');
const budget = wb.worksheets.add('Budget & Überleitung');
const FONT = 'Arial';
const color = { ink: '#172B40', blue: '#145AC3', green: '#16704B', muted: '#5B6875', pale: '#EEF3F8', rule: '#CFD9E3', white: '#FFFFFF', amber: '#FFF3D4', red: '#A52F32' };
const money = '#,##0;(#,##0);"–"';
const millions = '0.00,," Mio.";(0.00,," Mio.");"–"';
const percent = '0.0%;(0.0%);"–"';
const whole = '#,##0;(#,##0);"–"';
// Excel serial dates avoid ambiguous text dates and remain editable in Excel.
const date = iso => (Date.parse(`${iso}T00:00:00Z`) - Date.UTC(1899, 11, 30)) / 86400000;
const dateFormat = 'yyyy-mm-dd';
const q = name => `'${name.replace(/'/g, "''")}'`;
function val(sheet, address, value, input = false) { const r = sheet.getRange(address); r.values = [[value]]; if (input) r.format.font.color = color.blue; }
function formula(sheet, address, value, cross = false) { const r = sheet.getRange(address); r.formulas = [[value]]; r.format.font.color = cross ? color.green : color.ink; }
function text(sheet, address, value, style = {}) { val(sheet, address, value); Object.assign(sheet.getRange(address).format.font, style); }
function note(sheet, range, value) { const r = sheet.getRange(range); r.getCell(0, 0).values = [[value]]; r.format.font.color = color.muted; r.format.font.italic = true; r.format.font.size = 10; }
function heading(sheet, range, label) { const r=sheet.getRange(range); r.getCell(0,0).values=[[label]]; r.format.fill=color.pale; r.format.font.bold=true; r.format.borders={bottom:{style:'thin',color:color.rule}}; }
function header(sheet, range, values) { const r=sheet.getRange(range);r.values=[values];r.format.fill=color.ink;r.format.font.color=color.white;r.format.font.bold=true;r.format.horizontalAlignment='center';r.format.borders={insideVertical:{style:'thin',color:color.white}}; }
function total(sheet, range) { const r=sheet.getRange(range);r.format.font.bold=true;r.format.borders={top:{style:'thin',color:color.ink}}; }
function init(sheet, lastRow=76) {
  const r=sheet.getRange(`A1:Q${lastRow}`);r.format.font={name:FONT,size:11,color:color.ink};r.format.fill=color.white;r.format.rowHeight=23;r.format.verticalAlignment='center';
  sheet.getRange('A:B').format.columnWidthPx=14;
  sheet.getRange('C:C').format.columnWidthPx=340;
  sheet.getRange('D:J').format.columnWidthPx=122;
  sheet.getRange('K:Q').format.columnWidthPx=110;
  sheet.showGridLines=false;sheet.freezePanes.freezeRows(9);
  sheet.getRange('C2:Q2').format.font.size=16;sheet.getRange('C2:Q2').format.font.bold=true;
  sheet.getRange('D6:Q76').setNumberFormat(money);
}
for (const sheet of [main,assumptions,budget]) init(sheet);
main.tabColor=color.ink; assumptions.tabColor='#376B98'; budget.tabColor='#7D98AE';

// Assumptions: one case selector and one active build. Editable numeric inputs are blue.
text(assumptions,'C2','Annahmen für den festen Florida-Pavillon');
note(assumptions,'C3:K3','Studentischer Planstand 20.11.2026. Blau = Eingabe; grün = Blattverknüpfung; schwarz = Formel.');
text(assumptions,'C4','Szenario auswählen (1 / 2 / 3)');val(assumptions,'D4',2,true);
assumptions.getRange('D4').dataValidation={rule:{type:'whole',operator:'between',formula1:1,formula2:3}};
formula(assumptions,'F4','=CHOOSE(D4,"Vorsichtig","Basis","Höhere Auslastung")');assumptions.getRange('F4').format.font.color=color.green;
header(assumptions,'C7:F7',['Gemeinsame Annahme','Wert','Einheit','Einordnung']);
const common=[
  [8,'Planstand',date(model.planDate),'Datum','Eigene Szenarioannahmen'],
  [9,'Plätze je Dinner',model.inputs.seats,'Plätze','Konzeptannahme'],
  [10,'Preis je Pilotgast',model.inputs.pilotPrice,'USD','Zu prüfende Preishypothese'],
  [11,'Auslastung der vier Piloten',model.inputs.pilotOccupancy,'Anteil','In allen Szenarien gleich'],
  [12,'Variable Auszahlung je Gast',model.inputs.variableCostPerGuest,'USD','Catering, Service, Logistik, Sicherheit'],
  [13,'Laufendes Personal pro Jahr',model.inputs.fixedCosts.personnel,'USD','Eigenständige Betriebskostenannahme'],
  [14,'Standort / Wartung / Versicherung',model.inputs.fixedCosts.siteMaintenanceInsurance,'USD/Jahr','Eigenständige Betriebskostenannahme'],
  [15,'Verwaltung / laufender Vertrieb',model.inputs.fixedCosts.administrationSales,'USD/Jahr','Kein erneuter Ansatz der Einführungskampagne'],
  [17,'Beginn laufender Fixkosten',date(model.inputs.fixedCostsStart),'Datum','September 2028: erster Betriebsmonat']
];
for(const[r,label,value,unit,context]of common){val(assumptions,`C${r}`,label);val(assumptions,`D${r}`,value,true);val(assumptions,`E${r}`,unit);val(assumptions,`F${r}`,context);}
text(assumptions,'C16','Summe laufender Fixkosten pro Jahr');formula(assumptions,'D16','=SUM(D13:D15)');total(assumptions,'C16:D16');
text(assumptions,'C18','Finanzierungsbetrachtung bis');formula(assumptions,'D18','=EOMONTH(MIN(D35:D38),-1)');
assumptions.getRange('D8').setNumberFormat(dateFormat);assumptions.getRange('D17:D18').setNumberFormat(dateFormat);assumptions.getRange('D11').setNumberFormat(percent);
header(assumptions,'C20:G20',['Regelbetrieb','Aktiver Wert','Vorsichtig','Basis','Höhere Auslastung']);
text(assumptions,'C21','Auslastung');text(assumptions,'C22','Preis je Gast (USD)');
assumptions.getRange('E21:G21').values=[[0.7,0.9,0.95]];assumptions.getRange('E21:G21').format.font.color=color.blue;
val(assumptions,'E22',40000,true);val(assumptions,'F22',50000,true);formula(assumptions,'G22','=F22');
formula(assumptions,'D21','=CHOOSE($D$4,E21,F21,G21)');formula(assumptions,'D22','=CHOOSE($D$4,E22,F22,G22)');
assumptions.getRange('D21:G21').setNumberFormat(percent);assumptions.getRange('D21:D22').format.fill=color.amber;
note(assumptions,'C24:K24','Die höhere Auslastung verwendet denselben Zielpreis wie die Basis. Piloten bleiben unverändert.');
header(assumptions,'C27:H27',['Mengen und Betriebsmonate',...model.years]);
text(assumptions,'C28','Dinner im Regelbetrieb');text(assumptions,'C29','Pilot-Dinner aus Terminen');text(assumptions,'C30','Monate mit laufenden Fixkosten');
model.years.forEach((year,i)=>{const c=String.fromCharCode(68+i);val(assumptions,`${c}28`,model.inputs.regularEvents[year]||0,true);formula(assumptions,`${c}29`,`=COUNTIFS($D$35:$D$38,">="&DATE(${c}27,1,1),$D$35:$D$38,"<"&DATE(${c}27+1,1,1))`);formula(assumptions,`${c}30`,`=IF(DATE(${c}27,12,31)<$D$17,0,IF(YEAR($D$17)=${c}27,13-MONTH($D$17),12))`);});
assumptions.getRange('D27:H30').setNumberFormat(whole);
assumptions.getRange('D27:H27').setNumberFormat('0');
header(assumptions,'C33:F33',['Planmeilenstein','Datum','Herkunft','Bedeutung']);
model.pilotDates.forEach((d,i)=>{val(assumptions,`C${35+i}`,`Pilot ${i+1}`);val(assumptions,`D${35+i}`,date(d),true);val(assumptions,`E${35+i}`,'Roadmap A');val(assumptions,`F${35+i}`,'Eigener, fertiggestellter Florida-Pavillon');});
text(assumptions,'C40','G3 Pilotfreigabe');val(assumptions,'D40',date(model.gateDates.G3),true);
text(assumptions,'C41','G4 Betriebs- / Ausbauprüfung');val(assumptions,'D41',date(model.gateDates.G4),true);
assumptions.getRange('D35:D41').setNumberFormat(dateFormat);
text(assumptions,'C43','Terminprüfung');formula(assumptions,'D43','=IF(AND(MIN(D35:D38)>D40,MAX(D35:D38)<=D41),"Piloten nach G3 / bis G4","Termine prüfen")');
text(assumptions,'C44','Beginn Regelbetrieb');formula(assumptions,'D44','=IF(AND(D28=0,E28=0,F28=0,DATE(G27,1,1)>D41),"Erst nach G4","Hochlauf prüfen")');
heading(assumptions,'C47:K47','Quellen und Modellgrenzen');
note(assumptions,'C48:K48','Pilottermine / Gates: aktuelle Roadmap A, Planstand 20.11.2026. Es sind keine genehmigten Termine.');
note(assumptions,'C49:K49','Umsatz, Auslastung, Preise, Kosten und Zahlungstermine sind studentische Annahmen; keine Angebote.');
note(assumptions,'C50:K50','Variable 5.000 USD je Gast aus dem alten Plausibilitätsansatz; für feste Standorte erneut validieren.');
note(assumptions,'C51:K51','Mengen: 4 eigene Piloten; danach angenommene 10 Dinner in 2030 und 16 in 2031. Texas nicht enthalten.');

// Budget: editable dated payments own the amounts; seven positions and years are formula rollups.
text(budget,'C2','Budget und Überleitung vom mobilen Konzept');
note(budget,'C3:K3','13,38 Mio. USD Projektbudget für Investition und Anlauf: studentischer Ansatz aus der früheren größeren Lounge-Kostenstruktur.');
text(budget,'C4','Aktives Betriebsszenario');formula(budget,'D4',"='Annahmen'!F4",true);
note(budget,'C6:K6','Vorläufiges Arbeitsszenario, keine neu belegten Bauangebote. G2 braucht echte Angebote für den Pavillon.');
note(budget,'C7:K7','Sachinvestitionen / Anlauf sind Modellkategorien, keine handels- oder steuerrechtliche Einordnung.');
header(budget,'C10:J10',['Position','Art','Gesamt (USD)',...model.years]);
budget.getRange('F10:J10').setNumberFormat('0');
const paymentRows=[];
for(const item of model.budget.items) for(const payment of item.payments) paymentRows.push({item,...payment});
const paymentStart=28,paymentEnd=paymentStart+paymentRows.length-1;
model.budget.items.forEach((item,i)=>{
  const r=11+i;val(budget,`C${r}`,item.label);val(budget,`D${r}`,item.kind==='capex'?'Sachinvestition':'Anlauf');
  formula(budget,`E${r}`,`=SUMIF($C$${paymentStart}:$C$${paymentEnd},C${r},$E$${paymentStart}:$E$${paymentEnd})`);
  model.years.forEach((year,j)=>{const c=String.fromCharCode(70+j);formula(budget,`${c}${r}`,`=SUMIFS($E$${paymentStart}:$E$${paymentEnd},$C$${paymentStart}:$C$${paymentEnd},$C${r},$D$${paymentStart}:$D$${paymentEnd},">="&DATE(${c}$10,1,1),$D$${paymentStart}:$D$${paymentEnd},"<"&DATE(${c}$10+1,1,1))`);});
});
text(budget,'C20','Sachinvestitionen');text(budget,'C21','Entwicklung / Anlauf');text(budget,'C22','Projektbudget: Investition und Anlauf');
for(const c of ['E','F','G','H','I','J']){formula(budget,`${c}20`,`=SUMIF($D$11:$D$17,"Sachinvestition",${c}11:${c}17)`);formula(budget,`${c}21`,`=SUMIF($D$11:$D$17,"Anlauf",${c}11:${c}17)`);formula(budget,`${c}22`,`=SUM(${c}20:${c}21)`);}
total(budget,'C22:J22');
text(budget,'C23','Laufende Betriebsauszahlungen');text(budget,'C24','Alle Auszahlungen (2027–2031)');
formula(budget,'E23',"='Fünfjahresübersicht'!I24",true);formula(budget,'E24','=SUM(E22:E23)');
model.years.forEach((year,i)=>{const c=String.fromCharCode(70+i),mc=String.fromCharCode(68+i);formula(budget,`${c}23`,`='Fünfjahresübersicht'!${mc}24`,true);formula(budget,`${c}24`,`=SUM(${c}22:${c}23)`);});
total(budget,'C24:J24');
header(budget,'C26:F26',['Zahlungsposition','Datum (Plan)','Auszahlung (USD)','Abgrenzung']);
paymentRows.forEach((payment,i)=>{const r=paymentStart+i;val(budget,`C${r}`,payment.item.label);val(budget,`D${r}`,date(payment.date),true);val(budget,`E${r}`,payment.amount,true);val(budget,`F${r}`,payment.item.scope);});
budget.getRange(`D${paymentStart}:D${paymentEnd}`).setNumberFormat(dateFormat);
note(budget,'C41:K41','Bauzahlung: 20 % Ende 2027, 80 % bis August 2028. Anlaufzahlungen 2027–2029 sind eigene Annahmen.');
note(budget,'C42:K42','Pilotvorbereitung enthält Qualifizierung / Testservice, kein erneut angesetztes Catering der Pilotgäste.');
note(budget,'C43:K43','Laufendes Personal und Vertrieb stehen gesondert in den Fixkosten; die Einführung ist einmalig.');
heading(budget,'C46:K46','Historische 3,48 Mio. USD: erklären, ersetzen, nicht addieren');
header(budget,'C48:F48',['Mobiler Originalansatz','Betrag (USD)','Zeitraum','Überleitung im festen Szenario']);
const oldRows=[
  ['Engineering',380000,'Jahre 1–2','Projektentwicklung und Betriebspersonal getrennt neu angesetzt.'],
  ['Hospitality-Projektleitung',400000,'Jahre 1–4','Kein zusätzlicher pauschaler Personalblock aus dem mobilen Modell.'],
  ['Mobiler Pavillon-Prototyp',800000,'Jahr 1','Ersetzt durch Grundstück, festen Bau und Ausstattung.'],
  ['Gutachten / Genehmigungen',400000,'Jahr 1','Neuansatz 0,50 Mio.; historische Position nicht zusätzlich.'],
  ['Konzept / Testdinner',300000,'Jahr 1','Entwicklung und Pilotqualifizierung neu abgegrenzt.'],
  ['Piloten / Umbau / Marketing',800000,'Jahr 2','Variable Gastkosten, Qualifizierung und Einführung separat.'],
  ['Feinschliff / Zertifizierung / Ersatz',400000,'Jahre 3–4','Keine automatische Übernahme; neuer Ansatz muss G2 standhalten.']
];
oldRows.forEach((row,i)=>budget.getRange(`C${49+i}:F${49+i}`).values=[row]);
text(budget,'C56','Historische Summe');formula(budget,'D56','=SUM(D49:D55)');total(budget,'C56:F56');
note(budget,'C58:K58','Quelle: Original-XLSM, Blatt 5-Jahres-Kalkulation, Zeilen 37–43 und Erläuterungen I39 / I42.');
note(budget,'C59:K59','Das Original nennt F&E, umfasst aber auch mobilen Bau, Pilotbetrieb und Marketing. Keine reine Forschungsposition.');
heading(budget,'C62:K62','Historische Budgetvariation bei sonst gleichen Betriebsannahmen');
header(budget,'C63:F63',['Investition und Anlauf','Budget (USD)','Cashflow (USD)','Aussage']);
val(budget,'C64','Frühere Lounge-Spanne unten');val(budget,'D64',10000000,true);formula(budget,'E64',"='Fünfjahresübersicht'!I25-D64",true);val(budget,'F64','Reine Rechenvariation, keine Pavillon-Kostenschätzung.');
val(budget,'C65','Frühere Lounge-Spanne oben');val(budget,'D65',15000000,true);formula(budget,'E65',"='Fünfjahresübersicht'!I25-D65",true);val(budget,'F65','Kein Budget für Texas und keine Kostengarantie.');
note(budget,'C67:K67','Quellen: historische Lounge-Planung B und neue studentische Kostenabgrenzung vom 20.11.2026.');

// Main: driver-based annual build. Cash flow remains separate from accounting profit.
text(main,'C2','RocketLight: fester Pavillon in Florida');
note(main,'C3:I3','Fünfjahres-Szenario 2027–2031, nominale USD. Vor Finanzierung und Steuern. Nur Standort 1.');
text(main,'C4','Aktives Szenario');formula(main,'D4',"='Annahmen'!F4",true);
text(main,'C6','Kumulierter Cashflow Ende 2031');formula(main,'D6','=I31');main.getRange('D6').setNumberFormat(millions);main.getRange('D6').format.font.size=14;main.getRange('D6').format.font.bold=true;
note(main,'C7:I7','Investition und Anlauf: studentisches Projektbudget; laufender Betrieb separat. Kein Bauangebot.');
header(main,'C9:I9',['Modellgröße',...model.years,'5 Jahre']);
main.getRange('D9:H9').setNumberFormat('0');
const labels={10:'Pilot-Dinner',11:'Dinner im Regelbetrieb',12:'Plätze je Dinner',13:'Auslastung Piloten',14:'Auslastung Regelbetrieb',15:'Gäste der Piloten',16:'Gäste im Regelbetrieb',17:'Gäste gesamt',18:'Preis je Pilotgast (USD)',19:'Preis je regulärem Gast (USD)',20:'Umsatz / vereinfachte Einzahlungen',21:'Variable Betriebsauszahlungen',22:'Monate mit laufenden Fixkosten',23:'Laufende Fixkosten',24:'Betriebsauszahlungen gesamt',25:'Operativer Cashflow',26:'Sachinvestitionen',27:'Entwicklung / Anlauf',28:'Projektauszahlungen gesamt',29:'Alle Auszahlungen',30:'Jährlicher Cashflow',31:'Kumulierter Cashflow'};
for(const[row,label]of Object.entries(labels))text(main,`C${row}`,label);
model.years.forEach((year,i)=>{
  const c=String.fromCharCode(68+i),prev=String.fromCharCode(67+i),bc=String.fromCharCode(70+i);
  const refs={10:`'Annahmen'!${c}29`,11:`'Annahmen'!${c}28`,12:"'Annahmen'!$D$9",13:"'Annahmen'!$D$11",14:"'Annahmen'!$D$21",18:"'Annahmen'!$D$10",19:"'Annahmen'!$D$22",22:`'Annahmen'!${c}30`,26:`'Budget & Überleitung'!${bc}20`,27:`'Budget & Überleitung'!${bc}21`};
  for(const[row,ref]of Object.entries(refs))formula(main,`${c}${row}`,'='+ref);
  const calculations={15:`${c}10*${c}12*${c}13`,16:`${c}11*${c}12*${c}14`,17:`SUM(${c}15:${c}16)`,20:`${c}15*${c}18+${c}16*${c}19`,21:`${c}17*'Annahmen'!$D$12`,23:`${c}22/12*'Annahmen'!$D$16`,24:`${c}21+${c}23`,25:`${c}20-${c}24`,28:`SUM(${c}26:${c}27)`,29:`${c}24+${c}28`,30:`${c}20-${c}29`,31:i?`${prev}31+${c}30`:`${c}30`};
  for(const[row,f]of Object.entries(calculations))formula(main,`${c}${row}`,'='+f);
});
for(let r=10;r<=30;r++)formula(main,`I${r}`,[12,13,14,18,19].includes(r)?`=D${r}`:`=SUM(D${r}:H${r})`);
formula(main,'I31','=H31');
main.getRange('D13:I14').setNumberFormat(percent);main.getRange('C13:I14').format.font.italic=true;
for(const r of [10,11,12,15,16,17,22])main.getRange(`D${r}:I${r}`).setNumberFormat(whole);
for(const r of [17,20,24,25,28,29,30,31])total(main,`C${r}:I${r}`);
main.getRange('C31:I31').format.fill=color.pale;
main.getRange('D30:I31').conditionalFormats.addCustom('D30<0',{font:{color:color.red}});
heading(main,'C34:I34','Sensitivität: kumulierter Cashflow Ende 2031');
header(main,'C35:F35',['Fall','Auslastung','Preis (USD)','Cashflow (USD)']);
for(const [r,label,or,pr,output]of [[36,'Vorsichtig','E21','E22','E57'],[37,'Basis','F21','F22','G59'],[38,'Höhere Auslastung','G21','G22','G60']]){
  text(main,`C${r}`,label);formula(main,`D${r}`,`='Annahmen'!${or}`);formula(main,`E${r}`,`='Annahmen'!${pr}`);formula(main,`F${r}`,`='Annahmen'!${output}`);
}
main.getRange('D36:D38').setNumberFormat(percent);main.getRange('F36:F38').conditionalFormats.addCustom('F36<0',{font:{color:color.red}});
heading(main,'C40:I40','Mittelbedarf vor dem ersten Pilot');
text(main,'C41','Projektzahlungen bis Vormonatsende');formula(main,'D41',`=SUMIF('Budget & Überleitung'!$D$${paymentStart}:$D$${paymentEnd},"<="&'Annahmen'!D18,'Budget & Überleitung'!$E$${paymentStart}:$E$${paymentEnd})`);
text(main,'C42','Laufende Fixkosten bis dahin');formula(main,'D42',"=MAX(0,(YEAR('Annahmen'!D18)-YEAR('Annahmen'!D17))*12+MONTH('Annahmen'!D18)-MONTH('Annahmen'!D17)+1)*'Annahmen'!D16/12");
text(main,'C43','Indikativer Mittelbedarf vor Pilot');formula(main,'D43','=SUM(D41:D42)');total(main,'C43:D43');
text(main,'C44','Größter Fehlbetrag am Jahresende');formula(main,'D44','=MAX(0,-MIN(D31:H31))');
note(main,'C46:I46','13,18 Mio. vor Pilotbeginn sind indikativ. Keine Finanzierungszusage; keine vollständige unterjährige Liquiditätsplanung.');
note(main,'C47:I47','Einzahlungen vereinfachend im Veranstaltungsjahr; keine Anzahlungen, Fristen oder zusätzliche Liquiditätsreserve.');
note(main,'C48:I48','Ausgeschlossen: Finanzierung / Zinsen, Steuern, Inflation, Baukostenreserve und Rest-/Grundstücksverkaufswert.');
note(main,'C49:I49','Cashflow enthält Sachauszahlungen ohne Abschreibungen. Er ist kein Gewinn und keine Innovationsrendite.');
note(main,'C50:I50','Texas braucht eine gesonderte Rechnung. Das historische mobile Modell mit 3,48 Mio. wird nicht hinzugerechnet.');

// Native two-variable data table: both overwritten inputs drive the single main build.
heading(assumptions,'C53:G53','Kumulierter Cashflow 2031 nach Auslastung und Zielpreis');
text(assumptions,'C54','Auslastung / Preis');
formula(assumptions,'C55',"='Fünfjahresübersicht'!I31",true);assumptions.getRange('C55').setNumberFormat(';;;');
formula(assumptions,'D55','=MAX(0,E22-5000)');formula(assumptions,'E55','=E22');formula(assumptions,'F55','=(E22+F22)/2');formula(assumptions,'G55','=F22');
for(const[r,f]of[[56,'MAX(0,E21-10%)'],[57,'E21'],[58,'(E21+F21)/2'],[59,'F21'],[60,'G21']])formula(assumptions,`C${r}`,'='+f);
assumptions.getRange('C56:C60').setNumberFormat(percent);assumptions.getRange('D56:G60').setNumberFormat(millions);
assumptions.getRange('D55:G55').format.font.bold=true;assumptions.getRange('C56:C60').format.font.bold=true;
assumptions.getRange('G59').format.fill=color.pale;
assumptions.dataTables.add('C55:G60',{rowInput:'D22',columnInput:'D21'});
note(assumptions,'C62:K62','Native Excel-What-if-Tabelle: nur Preis und Auslastung des Regelbetriebs variieren; Piloten bleiben gleich.');
note(assumptions,'C63:K63','Die Betriebsszenarien nutzen einen gemeinsamen Kostenaufbau; sie ändern keine Baukosten oder Eventzahlen.');
heading(assumptions,'C66:K66','Nachvollziehbare Herkunft');
note(assumptions,'C67:K67','Planung: pitch/planning-data.js, ROCKET_DATA.A.rows und ROCKET_META.A.gates; Roadmap-Planstand 20.11.2026.');
note(assumptions,'C68:K68','Gemeinsame Website-Berechnung: pitch/finance-model.js. Die Excel-Formeln berechnen die Ergebnisse eigenständig.');
note(assumptions,'C69:K69','Historie: step-4-rocketlight.xlsm sowie frühere feste Lounge B. Keine externen Baupreisangebote behauptet.');

// A native chart shows annual and cumulative cash flow, bound to live formula cells.
header(main,'K27:M27',['Jahr','Jährlicher Cashflow','Kumulierter Cashflow']);
model.years.forEach((year,i)=>{const c=String.fromCharCode(68+i),r=28+i;formula(main,`K${r}`,`=TEXT(${c}9,"0")`);formula(main,`L${r}`,`=${c}30`);formula(main,`M${r}`,`=${c}31`);});
main.getRange('L28:M32').setNumberFormat(millions);
main.getRange('K28:K32').setNumberFormat('0');
const chart=main.charts.add('line',main.getRange('K27:M32'));
chart.setPosition('K5','Q23');chart.title='Cashflow vor Finanzierung und Steuern (Mio. USD)';chart.titleTextStyle.typeface=FONT;chart.titleTextStyle.fontSize=14;
chart.legend={position:'bottom',textStyle:{typeface:FONT,fontSize:11}};chart.xAxis={axisType:'textAxis',textStyle:{typeface:FONT,fontSize:11}};
chart.yAxis={numberFormatCode:'0.0,,',numberFormatSourceLinked:false,textStyle:{typeface:FONT,fontSize:11}};
chart.series.items[0].line={fill:'#D27336',style:'solid',width:2};chart.series.items[1].line={fill:'#246996',style:'solid',width:3};
note(main,'K35:Q35','Linien: jährlicher Cashflow und kumulierter Cashflow.');
note(main,'K37:Q37','Basis: erstmals jährlicher positiver Cashflow 2030.');
note(main,'K39:Q39','Der kumulierte Mittelrückfluss erreicht erst 2031 null.');
note(main,'K41:Q41','Das vorsichtige Szenario bleibt Ende 2031 negativ.');

// Fit the actual authored areas; no whole-sheet autofit or hidden calculation blocks.
assumptions.getRange('F:F').format.columnWidthPx=190;assumptions.getRange('G:G').format.columnWidthPx=190;
assumptions.getRange('F8:K17').format.wrapText=true;assumptions.getRange('F8:K17').format.rowHeight=31;
assumptions.getRange('C43:C44').format.rowHeight=28;assumptions.getRange('D43:G44').format.font.size=10;
budget.getRange('D:D').format.columnWidthPx=140;budget.getRange('E:E').format.columnWidthPx=140;
budget.getRange('C11:C17').format.wrapText=true;budget.getRange('C11:J17').format.rowHeight=34;
budget.getRange('F28:K38').format.wrapText=false;budget.getRange('F28:K38').format.font.size=10;
budget.getRange('C28:K38').format.rowHeight=30;
budget.getRange('F49:K55').format.wrapText=false;budget.getRange('F49:K55').format.font.size=10;budget.getRange('C49:K55').format.rowHeight=30;
for(const row of [26,48,63]){const r=budget.getRange(`F${row}:K${row}`);r.format.fill=color.ink;r.format.font.color=color.white;r.format.horizontalAlignment='left';}
main.getRange('K:K').format.columnWidthPx=90;main.getRange('L:M').format.columnWidthPx=164;
main.getRange('K27:M27').format.wrapText=true;main.getRange('K27:M27').format.rowHeight=36;
main.getRange('C46:Q50').format.font.size=10;

wb.recalculate();
const checks = {};
function check(label,actual,expected,tolerance=0.01){ if(typeof actual!=='number'||Math.abs(actual-expected)>tolerance)throw new Error(`${label}: ${actual}, expected ${expected}`);checks[label]={actual,expected}; }
function cell(sheet,address){return sheet.getRange(address).values[0][0];}
check('Revenue',cell(main,'I20'),model.totals.revenue);check('Operating costs',cell(main,'I24'),model.totals.operatingCosts);
check('Capex',cell(main,'I26'),model.budget.capexTotal);check('Startup',cell(main,'I27'),model.budget.startupTotal);
check('Cumulative cash flow',cell(main,'I31'),model.totals.cumulativeCashFlow);check('Before first pilot',cell(main,'D43'),model.financing.indicativeBeforeFirstPilot);
check('Largest year-end deficit',cell(main,'D44'),model.financing.largestYearEndDeficit);check('Historical mobile total',cell(budget,'D56'),3480000);
for(const [address,scenario]of [['E57','downside'],['G59','base'],['G60','upside']])check(`Native sensitivity ${scenario}`,cell(assumptions,address),model.scenarios.find(s=>s.id===scenario).totals.cumulativeCashFlow);
// Changing the single case selector must change the same annual build and then restore it.
val(assumptions,'D4',1,true);wb.recalculate();check('Selected downside',cell(main,'I31'),model.scenarios[0].totals.cumulativeCashFlow);
val(assumptions,'D4',2,true);wb.recalculate();check('Restored base',cell(main,'I31'),model.totals.cumulativeCashFlow);
// Native data-table outputs need to exist before their downstream links are cached.
// Rebind these three formulas after the table calculation; never replace them with values.
for(const [address,output]of [['F36','E57'],['F37','G59'],['F38','G60']]){
  cell(assumptions,output);formula(main,address,`='Annahmen'!${output}`);
}
wb.recalculate();
for(const [address,scenario]of [['F36','downside'],['F37','base'],['F38','upside']])check(`Scenario overview ${scenario}`,cell(main,address),model.scenarios.find(s=>s.id===scenario).totals.cumulativeCashFlow);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},maxChars:5000});
await fs.writeFile(path.join(outputDir,'formula-error-scan.ndjson'),errors.ndjson);
const candidate=path.join(outputDir,'step-4-rocketlight-fester-pavillon.xlsx');
await(await SpreadsheetFile.exportXlsx(wb)).save(candidate);
const imported=await SpreadsheetFile.importXlsx(await FileBlob.load(candidate));
check('Saved workbook cumulative cash flow',cell(imported.worksheets.getItem('Fünfjahresübersicht'),'I31'),model.totals.cumulativeCashFlow);
for(const [address,scenario]of [['F36','downside'],['F37','base'],['F38','upside']])check(`Saved scenario overview ${scenario}`,cell(imported.worksheets.getItem('Fünfjahresübersicht'),address),model.scenarios.find(s=>s.id===scenario).totals.cumulativeCashFlow);
await fs.writeFile(path.join(outputDir,'model-checks.json'),JSON.stringify({sourceHash,checks,model},null,2));
for(const[sheetName,range,stem]of [['Fünfjahresübersicht','C2:Q50','uebersicht'],['Annahmen','C2:K69','annahmen'],['Budget & Überleitung','C2:K67','budget-ueberleitung']]){
  const image=await imported.render({sheetName,range,scale:1.4,format:'png'});
  await fs.writeFile(path.join(outputDir,`${stem}.png`),new Uint8Array(await image.arrayBuffer()));
  console.log('Rendered',stem);
}
if(createHash('sha256').update(await fs.readFile(source)).digest('hex')!==sourceHash)throw new Error('Historical workbook was modified');
const target=path.join(here,'step-4-rocketlight-fester-pavillon.xlsx');
await fs.copyFile(candidate,target);
console.log(JSON.stringify({target,bytes:(await fs.stat(target)).size,sha256:createHash('sha256').update(await fs.readFile(target)).digest('hex'),checks,previews:outputDir},null,2));
