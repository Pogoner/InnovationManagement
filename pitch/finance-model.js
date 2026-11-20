/* RocketLight: studentisches Cashflow-Arbeitsszenario für den festen Florida-Pavillon.
 * Nominale USD, Kalenderjahre 2027–2031. Keine Angebots-, Gewinn- oder Finanzierungszusage.
 * Historische mobile Rechnung und ursprüngliche XLSM bleiben unverändert.
 */
(function (global) {
  'use strict';
  const inputs = {
    planDate: '2026-11-20',
    years: [2027, 2028, 2029, 2030, 2031],
    seats: 20,
    pilotPrice: 35000,
    pilotOccupancy: 0.8,
    regularPrice: 50000,
    regularOccupancy: 0.9,
    regularEvents: { 2027: 0, 2028: 0, 2029: 0, 2030: 10, 2031: 16 },
    variableCostPerGuest: 5000,
    fixedCosts: { personnel: 750000, siteMaintenanceInsurance: 300000, administrationSales: 150000 },
    fixedCostsStart: '2028-09-01',
    budgetItems: [
      { id: 'development', label: 'Projektmanagement / Entwicklung', kind: 'startup', amount: 580000,
        payments: [{ date: '2027-12-31', amount: 240000 }, { date: '2028-09-30', amount: 240000 }, { date: '2029-07-31', amount: 100000 }],
        scope: 'Konzept, Projektsteuerung und Pilotauswertung; getrennt vom laufenden Betriebspersonal.' },
      { id: 'permits', label: 'Gutachten / Genehmigungen', kind: 'startup', amount: 500000,
        payments: [{ date: '2027-09-30', amount: 500000 }], scope: 'Standort-, Sicherheits- und Genehmigungsprüfung; keine Zusage.' },
      { id: 'land', label: 'Grundstück', kind: 'capex', amount: 2000000,
        payments: [{ date: '2027-09-30', amount: 2000000 }], scope: 'Angenommener Grundstückserwerb nach Standortprüfung; kein reales Angebot.' },
      { id: 'building', label: 'Architektur / Bau', kind: 'capex', amount: 9000000,
        payments: [{ date: '2027-12-31', amount: 1800000 }, { date: '2028-08-31', amount: 7200000 }], scope: 'Vereinfachte Sachinvestition: 20 % in 2027, 80 % in 2028; neue Pavillonangebote an G2 nötig.' },
      { id: 'equipment', label: 'Küche / Ausstattung', kind: 'capex', amount: 600000,
        payments: [{ date: '2028-08-31', amount: 600000 }], scope: 'Erstausstattung des festen Pavillons; separat vom Bauansatz.' },
      { id: 'pilotPreparation', label: 'Pilotvorbereitung / Qualifizierung', kind: 'startup', amount: 400000,
        payments: [{ date: '2028-09-30', amount: 400000 }], scope: 'Training, Testservice und Betriebsfreigabe; kein erneut angesetztes Catering je Pilotgast.' },
      { id: 'launchMarketing', label: 'Markteinführung', kind: 'startup', amount: 300000,
        payments: [{ date: '2028-09-30', amount: 100000 }, { date: '2029-07-31', amount: 200000 }], scope: 'Einmalige Einführungskampagne; getrennt vom laufenden Verwaltungs-/Vertriebsbudget.' }
    ],
    scenarios: [
      { id: 'downside', label: 'Vorsichtig: 70 % / 40.000 USD', regularOccupancy: 0.7, regularPrice: 40000 },
      { id: 'base', label: 'Basis: 90 % / 50.000 USD' },
      { id: 'upside', label: 'Höhere Auslastung: 95 % / 50.000 USD', regularOccupancy: 0.95, regularPrice: 50000 }
    ],
    sensitivityOccupancies: [0.6, 0.7, 0.8, 0.9, 0.95],
    sensitivityPrices: [35000, 40000, 45000, 50000],
    historicalBudgetBounds: [10000000, 15000000]
  };
  const sum = values => values.reduce((total, value) => total + value, 0);
  const isoDate = value => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value;
    const parts = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value || '');
    return parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : null;
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  const lastMonthEnd = date => new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(5, 7)) - 1, 0)).toISOString().slice(0, 10);
  const fixedMonths = (year, start, cutoff = `${year}-12-31`) => {
    let count = 0;
    for (let month = 1; month <= 12; month++) {
      const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
      if (monthStart >= start && monthStart <= cutoff) count++;
    }
    return count;
  };
  function extractPilotDates(planningData) {
    const a = planningData?.A || planningData;
    return [...new Set((a?.rows || []).flatMap(row => row.items || [])
      .filter(item => item.t === 'dia' && item.kind === 'ms' && /^[1-4]$/.test(String(item.num || '')))
      .map(item => isoDate(item.d)).filter(Boolean))].sort();
  }
  function calculate(config, pilotDates, gateDates, scenario, budget) {
    const annualFixed = sum(Object.values(config.fixedCosts));
    let cumulative = 0;
    const annual = config.years.map(year => {
      const pilotEvents = pilotDates.filter(date => Number(date.slice(0, 4)) === year).length;
      const regularEvents = config.regularEvents[year] || 0;
      if (regularEvents && (!gateDates.G4 || `${year}-01-01` <= gateDates.G4)) throw new Error('Regelbetrieb muss nach G4 beginnen.');
      const pilotGuests = pilotEvents * config.seats * config.pilotOccupancy;
      const regularGuests = regularEvents * config.seats * scenario.regularOccupancy;
      const guests = pilotGuests + regularGuests;
      const revenue = pilotGuests * config.pilotPrice + regularGuests * scenario.regularPrice;
      const variableCosts = guests * config.variableCostPerGuest;
      const fixedCosts = annualFixed * fixedMonths(year, config.fixedCostsStart) / 12;
      const byKind = kind => sum(budget.items.filter(item => item.kind === kind).flatMap(item => item.payments)
        .filter(payment => Number(payment.date.slice(0, 4)) === year).map(payment => payment.amount));
      const capex = byKind('capex'), startup = byKind('startup');
      const operatingCosts = variableCosts + fixedCosts;
      const operatingCashFlow = revenue - operatingCosts;
      const projectOutflows = capex + startup;
      const totalOutflows = operatingCosts + projectOutflows;
      const annualCashFlow = revenue - totalOutflows;
      cumulative += annualCashFlow;
      return { year, pilotEvents, regularEvents, pilotGuests, regularGuests, guests, revenue, variableCosts,
        fixedCosts, operatingCosts, operatingCashFlow, capex, startup, projectOutflows, totalOutflows, annualCashFlow, cumulativeCashFlow: cumulative };
    });
    const totals = {};
    for (const key of ['pilotEvents','regularEvents','pilotGuests','regularGuests','guests','revenue','variableCosts','fixedCosts','operatingCosts','operatingCashFlow','capex','startup','projectOutflows','totalOutflows','annualCashFlow']) {
      totals[key] = sum(annual.map(row => row[key]));
    }
    totals.cumulativeCashFlow = cumulative;
    totals.firstPositiveAnnualCashFlowYear = annual.find(row => row.annualCashFlow > 0)?.year || null;
    totals.firstNonnegativeCumulativeCashFlowYear = annual.find(row => row.cumulativeCashFlow >= 0)?.year || null;
    return { id: scenario.id, label: scenario.label, regularPrice: scenario.regularPrice, regularOccupancy: scenario.regularOccupancy, annual, totals };
  }
  function build(planningData = global.ROCKET_DATA, planningMeta = global.ROCKET_META, overrides = {}) {
    const config = { ...clone(inputs), ...clone(overrides) };
    const pilotDates = extractPilotDates(planningData);
    if (pilotDates.length !== 4) throw new Error('Für die Finanzrechnung werden genau vier eindeutige Pilottermine in A.rows benötigt.');
    const meta = planningMeta?.A || planningMeta;
    const gateDates = Object.fromEntries((meta?.gates || []).map(gate => [gate.id, isoDate(gate.date)]));
    if (!gateDates.G3 || !gateDates.G4 || pilotDates.some(date => date <= gateDates.G3 || date > gateDates.G4)) {
      throw new Error('Die vier Piloten müssen nach G3 und vor bzw. an G4 liegen.');
    }
    const budget = { items: clone(config.budgetItems) };
    budget.capexTotal = sum(budget.items.filter(item => item.kind === 'capex').map(item => item.amount));
    budget.startupTotal = sum(budget.items.filter(item => item.kind === 'startup').map(item => item.amount));
    budget.total = budget.capexTotal + budget.startupTotal;
    if (budget.items.some(item => Math.abs(sum(item.payments.map(payment => payment.amount)) - item.amount) > 0.01)) {
      throw new Error('Budgetpositionen und Zahlungsplan stimmen nicht überein.');
    }
    const scenarios = config.scenarios.map(scenario => calculate(config, pilotDates, gateDates, {
      ...scenario, regularOccupancy: scenario.regularOccupancy ?? config.regularOccupancy, regularPrice: scenario.regularPrice ?? config.regularPrice
    }, budget));
    const base = scenarios.find(scenario => scenario.id === 'base');
    if (!base) throw new Error('Basisszenario fehlt.');
    const cutoff = lastMonthEnd(pilotDates[0]);
    const projectOutflowsBeforePilots = sum(budget.items.flatMap(item => item.payments).filter(payment => payment.date <= cutoff).map(payment => payment.amount));
    const fixedCostsBeforePilots = sum(config.years.map(year => sum(Object.values(config.fixedCosts)) * fixedMonths(year, config.fixedCostsStart, cutoff) / 12));
    const financing = {
      firstPilotDate: pilotDates[0], cutoffDate: cutoff, projectOutflowsBeforePilots, fixedCostsBeforePilots,
      indicativeBeforeFirstPilot: projectOutflowsBeforePilots + fixedCostsBeforePilots,
      largestYearEndDeficit: Math.max(0, -Math.min(...base.annual.map(row => row.cumulativeCashFlow))),
      label: 'Indikativer Mittelbedarf bis zum Monatsende vor dem ersten Pilot; keine Finanzierungszusage oder vollständige unterjährige Liquiditätsplanung.'
    };
    const sensitivity = {
      occupancies: config.sensitivityOccupancies, prices: config.sensitivityPrices,
      rows: config.sensitivityOccupancies.map(regularOccupancy => ({ regularOccupancy, values: config.sensitivityPrices.map(regularPrice => calculate(config, pilotDates, gateDates, { regularOccupancy, regularPrice }, budget).totals.cumulativeCashFlow) }))
    };
    const budgetSensitivity = config.historicalBudgetBounds.map(total => ({
      assumedProjectBudget: total, cumulativeCashFlow: base.totals.operatingCashFlow - total,
      label: 'Reine Rechenvariation für Investition und Anlauf; 10–15 Mio. USD sind die historische Lounge-Spanne, keine validierte Pavillon-Schätzung.'
    }));
    return {
      planDate: config.planDate, years: [...config.years], inputs: config, pilotDates, gateDates, budget,
      annual: base.annual, totals: base.totals, financing, scenarios, sensitivity, budgetSensitivity,
      provenance: {
        pilotDates: 'pitch/planning-data.js: ROCKET_DATA.A.rows; Gates aus ROCKET_META.A.gates',
        budget: 'Studentischer Projektbudgetansatz für Investition und Anlauf auf Basis der früheren größeren Lounge-Kostenstruktur; vorläufiges Arbeitsszenario, kein neues Bauangebot. Echte Pavillonangebote sind an G2 erforderlich.',
        assumptions: 'Neue studentische Szenarioannahmen vom 20.11.2026; keine nachgewiesene Zahlungsbereitschaft oder Kostenvalidierung.',
        historicalWorkbook: 'quellen/step-4-rocketlight.xlsm: mobiles Vergleichsszenario mit 3,48 Mio. USD; nicht zum neuen Ansatz addiert.'
      },
      caveats: [
        'Nur Standort 1 Florida; ein zweiter fester Standort in Texas ist nicht budgetiert.',
        'Cashflow vor Finanzierung und Steuern. Keine Gewinn-, Rendite-, Bewertungs- oder Finanzierungszusage.',
        'Sachinvestitionen und Anlauf sind eine Modellabgrenzung; handels- und steuerrechtliche Aktivierung wird nicht festgelegt.',
        'Keine Abschreibung im Cashflow; kein Rest- oder Grundstücksverkaufswert am Ende 2031.',
        'Ein- und Auszahlungen vereinfachend im Veranstaltungsjahr; keine Anzahlungen, Forderungs-/Verbindlichkeitsfristen oder Working-Capital-Reserve.',
        'Keine Inflation, Baukostenreserve, Finanzierungskosten oder zusätzliche Liquiditätsreserve; Zahlungsplan und G2-Budget neu validieren.',
        'Der 13,38-Mio.-Ansatz ersetzt den mobilen Ansatz; 3,48 Mio. USD werden nicht hinzugerechnet.',
        'Das Projektbudget für Investition und Anlauf enthält keine laufenden Betriebsauszahlungen; diese werden gesondert gerechnet.',
        'Sensitivitäten ändern Preis und Auslastung des Regelbetriebs; die vier Piloten bleiben bei 80 % und 35.000 USD.'
      ]
    };
  }
  global.RocketFinance = { inputs, build, extractPilotDates };
})(typeof window !== 'undefined' ? window : globalThis);
