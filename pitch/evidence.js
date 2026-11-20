/* RocketLight pitch: a read-only view of the existing concept evidence.
 * Load after assets/js/model.js, assets/js/data.js and pitch/planning-data.js.
 * The calculator's original seed is deliberate: a presentation must not
 * silently change with a visitor's locally edited workbook. No stored data
 * is read, migrated, reset or written here.
 */
const state = seed();

(() => {
  'use strict';

  const financialAssessmentA = state.list.find(item => item.id === 'rld-ki');
  if (!financialAssessmentA?.fy || !window.ROCKET_DATA || !window.ROCKET_META) {
    throw new Error('RocketLight pitch: the original concept evidence is incomplete.');
  }

  // Keep each original source statement intact. Workbook source strings and
  // roadmap source objects share the latter's { fact, links } display shape.
  // A source is only removed when both statement and links are identical.
  const sourceEntries = [
    ...SRC_SPACEX,
    ...state.list.flatMap(item => item.fy?.sources || []),
    ...window.ROCKET_DATA.A.sources,
    ...window.ROCKET_DATA.B.sources
  ];
  const sources = [];
  const seenSources = new Set();
  sourceEntries.forEach(entry => {
    const source = typeof entry === 'string'
      ? {
        fact: entry,
        links: (entry.match(/https?:\/\/[^\s]+/g) || []).map(url => ({
          by: entry.slice(0, entry.indexOf(url)).trim() || url,
          url
        }))
      }
      : entry;
    const key = JSON.stringify([
      source.fact,
      source.links.map(link => [link.by, link.url])
    ]);
    if (!seenSources.has(key)) {
      seenSources.add(key);
      sources.push(source);
    }
  });

  const assessments = state.list.map(assessment => ({
    assessment,
    result: calc(assessment)
  }));

  // The current fixed-pavilion pilot uses the actual roadmap dates. The
  // original mobile financial model below remains a separate historical case.
  const fixedData = window.ROCKET_DATA.A;
  const fixedMeta = window.ROCKET_META.A;
  const fixedFinance = window.RocketFinance.build(fixedData, fixedMeta);
  const pilotModel = {
    capacity: fixedFinance.inputs.seats,
    occupancy: fixedFinance.inputs.pilotOccupancy,
    price: fixedFinance.inputs.pilotPrice,
    targetPrice: fixedFinance.inputs.regularPrice,
    variableCost: fixedFinance.inputs.variableCostPerGuest
  };
  const operatingGate = fixedMeta.gates.find(gate => gate.id === 'G4');
  const dates = [...new Set(fixedData.rows.flatMap(row => row.items
    .filter(item => item.num && item.d)
    .map(item => item.d)))].sort();
  if (!pilotModel || !operatingGate || !dates.length) {
    throw new Error('RocketLight pitch: the fixed-pavilion pilot plan is incomplete.');
  }
  const {capacity, occupancy, price, targetPrice, variableCost} = pilotModel;
  const eventsByYear = new Map();
  dates.forEach(date => {
    const year = Number(date.slice(0, 4));
    eventsByYear.set(year, (eventsByYear.get(year) || 0) + 1);
  });
  const years = [...eventsByYear].map(([year, events]) => {
    const seats = events * capacity * occupancy;
    return {year, events, seats, revenue: seats * price};
  });
  const events = dates.length;
  const seats = events * capacity * occupancy;
  const fixedPilot = {
    capacity,
    occupancy,
    price,
    dates,
    years,
    events,
    seats,
    revenue: seats * price,
    budgetStatus: fixedMeta.budgetStatus,
    budgetReference: fixedMeta.budgetReference,
    operatingDecision: operatingGate.date.split('.').reverse().join('-'),
    targetPrice,
    variableCost
  };

  // Freezing preserves the original object shapes and values while making
  // accidental edits by presentation code fail instead of changing evidence.
  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };

  window.PitchEvidence = freeze({
    // The uploaded workbooks are the source for the concise matrix copy.
    // Keep the established KI / Team array order used by the renderer.
    ideas: window.PitchResearch.matrix.map(idea => ({
      id: idea.id,
      name: idea.name,
      trend: idea.origin === 'open-innovation' ? 'Open Innovation' : idea.trend,
      d: idea.summary,
      m: [idea.ai.feasibility, idea.team.feasibility],
      o: [idea.ai.originality, idea.team.originality],
      c: [idea.ai.category, idea.team.category],
      rationale: idea.rationale,
      sources: idea.sources
    })),
    base: state.base,
    weights: state.w,
    criteria: { benefit: N_CRIT, effort: A_CRIT },
    assessments,
    rocketlightAssessments: assessments.filter(item => item.assessment.idea === 9),
    // Historical mobile concept: these original results are not a new
    // investment, profit or break-even calculation for the fixed pavilion.
    financialAssessmentA,
    financialA: calcFY(financialAssessmentA.fy, state.base),
    fixedPilot,
    fixedFinance,
    variants: {
      A: { data: window.ROCKET_DATA.A, meta: window.ROCKET_META.A }
    },
    sources,
    provenance: {
      assessments: '../rechner/assets/js/data.js',
      calculation: '../rechner/assets/js/model.js',
      planning: 'planning-data.js',
      financialVariant: 'historical-mobile-A',
      financialScope: 'Unveränderte Originalrechnung des mobilen Konzepts; kein Wirtschaftlichkeitsnachweis für feste Standorte.',
      fixedFinance: 'finance-model.js · gemeinsames Florida-Arbeitsszenario 2027–2031; gleiche Eingaben wie im aktuellen XLSX',
      fixedPilot: {
        dates: 'planning-data.js · ROCKET_DATA.A.rows · nummerierte Pilottermine',
        assumptions: 'planning-data.js · ROCKET_META.A.pilotModel',
        operatingDecision: 'planning-data.js · ROCKET_META.A.gates · G4'
      },
      horizon: state.horizon,
      workbook: state.workbook
    }
  });
})();
