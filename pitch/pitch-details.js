/* On-demand methods and public contact details. Reads the shared models only.
 * The film inserts PitchDetails.actions(step); this module owns one native dialog. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const number = (value, digits = 0) => Number(value).toLocaleString('de-DE', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  const mio = value => number(value / 1e6, 2);
  const signed = value => `${value < 0 ? '−' : value > 0 ? '+' : ''}${mio(Math.abs(value))}`;
  const percent = value => `${number(value * 100)} %`;
  const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? value.split('-').reverse().join('.') : String(value || '');
  const total = values => values.reduce((sum, value) => sum + value, 0);
  const workbook = '../quellen/step-4-rocketlight-fester-pavillon.xlsx';
  const originalWorkbook = '../quellen/step-4-rocketlight.xlsm';
  const dialogId = 'pitch-details-dialog';
  const tabs = [['budget','Budget & Kostenbrücke'],['years','5 Jahre'],['scenarios','Szenarien']];
  const phaseNames = {site:'Standort', permit:'Genehmigungen', concept:'Entwurf', detail:'Ausführungsplanung', build:'Bau', service:'Betriebsaufbau', pilot:'Pilot-Dinner', operate:'Betrieb & Ausbauprüfung'};
  let dialog = null, opener = null, lockWasPresent = false;

  function finance() {
    const model = window.PitchEvidence?.fixedFinance || window.RocketFinance?.build(window.ROCKET_DATA, window.ROCKET_META);
    if (!model?.budget?.items || !model.annual?.length || !model.scenarios?.length) throw new Error('Finanzmodell noch nicht verfügbar.');
    return model;
  }

  function actions(step) {
    const button = (label, kind, tab = '') => `<button type="button" class="pd-action" data-pitch-detail="${kind}"${tab ? ` data-pitch-tab="${tab}"` : ''} aria-haspopup="dialog"><span>${esc(label)}</span><span class="pd-action-sign" aria-hidden="true">+</span></button>`;
    const content = Number(step) === 4 ? button('Kostenbrücke','finance','budget')
      : Number(step) === 5 ? button('Rechenweg & Szenarien','finance','years')
      : Number(step) === 6 ? button('Budget aufklappen','finance','budget') + button('Adressen & Telefonnummern','contacts') : '';
    return content ? `<span class="pd-actions">${content}</span>` : '';
  }

  function metric(label, value, unit, note = '') {
    return `<div class="pd-metric"><span>${esc(label)}</span><strong>${esc(value)} <small>${esc(unit)}</small></strong>${note ? `<p>${esc(note)}</p>` : ''}</div>`;
  }

  function tableWrap(label, table) {
    return `<div class="pd-table-wrap" role="region" aria-label="${esc(label)}" tabindex="0">${table}</div>`;
  }

  function budgetMarkup(model) {
    const budget = model.budget, funding = model.financing;
    const building = budget.items.find(item => item.id === 'building');
    const rows = budget.items.map(item => `<tr><th scope="row">${esc(item.label)}<span class="pd-cell-note">${esc(item.scope)}</span></th><td>${item.kind === 'capex' ? 'Sachinvestition' : 'Entwicklung / Anlauf'}</td><td class="pd-number">${number(item.amount)}</td><td>${item.payments.map(payment => `<span class="pd-payment">${date(payment.date)} · ${number(payment.amount)} USD</span>`).join('')}</td></tr>`).join('');
    return `<div class="pd-metrics">${metric('Investition & Anlauf',mio(budget.total),'Mio. USD')}${metric('Sachinvestitionen',mio(budget.capexTotal),'Mio. USD')}${metric('Entwicklung / Anlauf',mio(budget.startupTotal),'Mio. USD')}</div>
      <p class="pd-lead">Die frühere Kostenstruktur der größeren Lounge dient als <strong>vorläufiges studentisches Arbeitsszenario</strong> für Standort 1 Florida. Sie ist nicht durch neue Pavillonangebote validiert.${building ? ` Architektur und Bau sind darin mit ${mio(building.amount)} Mio. USD enthalten.` : ''}</p>
      <div class="pd-cost-bridge"><div><span>Früherer mobiler Ansatz</span><strong>3,48 Mio. USD</strong><p>0,78 Mio. Personal + 2,70 Mio. Sachkosten, einschließlich mobilem Bau und Piloten.</p></div><div><span>Fester Standort · Investition & Anlauf</span><strong>${mio(budget.total)} Mio. USD</strong><p>${mio(budget.capexTotal)} Mio. Sachinvestitionen + ${mio(budget.startupTotal)} Mio. Entwicklung und Anlauf.</p></div></div>
      <p class="pd-important">Der neue Ansatz ersetzt die 3,48 Mio. USD. Die beiden Beträge werden nicht addiert; ${mio(budget.total)} Mio. USD sind auch kein reiner Baukostenansatz.</p>
      ${tableWrap('Alle Budgetpositionen und Zahlungszeitpunkte', `<table class="pd-table pd-budget-table"><caption>Alle Positionen für Investition und Anlauf · nominale USD</caption><thead><tr><th scope="col">Position und Abgrenzung</th><th scope="col">Einordnung</th><th scope="col" class="pd-number">Betrag in USD</th><th scope="col">Angenommene Zahlungen</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><th scope="row" colspan="2">Investition &amp; Anlauf gesamt</th><td class="pd-number">${number(budget.total)}</td><td>Keine zusätzliche mobile Rechnung</td></tr></tfoot></table>`)}
      <p class="pd-important">Über ${model.years[0]}–${model.years[model.years.length - 1]} kommen ${mio(model.totals.operatingCosts)} Mio. USD laufende Kosten hinzu. Zusammen mit Investition und Anlauf ergeben sich <strong>${mio(model.totals.totalOutflows)} Mio. USD gesamte Auszahlungen</strong> im Modell.</p>
      <section class="pd-note-box" aria-label="Liquidität vor dem ersten Pilot"><h3>Vor dem ersten Pilot</h3><p><strong>${mio(funding.indicativeBeforeFirstPilot)} Mio. USD indikativ bis ${date(funding.cutoffDate)}.</strong> Enthalten sind ${mio(funding.projectOutflowsBeforePilots)} Mio. Projektzahlungen und ${mio(funding.fixedCostsBeforePilots)} Mio. laufende Fixkosten.</p><p>Keine Reserve und keine Finanzierung gerechnet; keine vollständige unterjährige Liquiditätsplanung. Der Betrag ist <strong>kein prüffester Finanzbedarf</strong>. Angebote und Zahlungsplan müssen an G2 neu geprüft werden.</p></section>`;
  }

  function financeTable(model = finance()) {
    const annual = model.annual;
    const rows = [
      ['Pilot-Dinner','pilotEvents','count'],
      ['Dinner im Regelbetrieb','regularEvents','count'],
      ['Gäste · Modellannahme','guests','count'],
      ['Umsatz','revenue','money'],
      ['Variable Betriebskosten','variableCosts','money'],
      ['Laufende Fixkosten','fixedCosts','money'],
      ['Laufende Kosten gesamt','operatingCosts','money'],
      ['Operativer Cashflow','operatingCashFlow','cash'],
      ['Sachinvestitionen','capex','money'],
      ['Entwicklung / Anlauf','startup','money'],
      ['Auszahlungen insgesamt','totalOutflows','money'],
      ['Cashflow jährlich','annualCashFlow','cash'],
      ['Cashflow kumuliert','cumulativeCashFlow','end']
    ].map(([label,key,kind]) => {
      const format = kind === 'count' ? value => number(value) : kind === 'money' ? mio : signed;
      const endValue = kind === 'end' ? annual[annual.length - 1][key] : model.totals[key];
      return `<tr${key === 'annualCashFlow' || kind === 'end' ? ' class="pd-table-emphasis"' : ''}><th scope="row">${esc(label)}</th>${annual.map(year => `<td class="pd-number">${format(year[key])}</td>`).join('')}<td class="pd-number pd-table-total">${format(endValue)}</td></tr>`;
    }).join('');
    return tableWrap('Jahresrechnung des Basisszenarios; Tabelle bei Bedarf seitlich verschieben', `<table class="pd-table pd-years-table"><caption>Basisszenario ${annual[0].year}–${annual[annual.length - 1].year} · Geldbeträge in Mio. USD</caption><thead><tr><th scope="col">Kennzahl</th>${annual.map(year => `<th scope="col" class="pd-number">${year.year}</th>`).join('')}<th scope="col" class="pd-number">Summe / Endstand</th></tr></thead><tbody>${rows}</tbody></table>`);
  }

  function yearsMarkup(model) {
    const input = model.inputs, regular = model.annual.filter(year => year.regularEvents);
    const annualFixed = total(Object.values(input.fixedCosts));
    return `<div class="pd-metrics">${metric('Umsatz über 5 Jahre',mio(model.totals.revenue),'Mio. USD')}${metric('Auszahlungen über 5 Jahre',mio(model.totals.totalOutflows),'Mio. USD')}${metric('Cashflow kumuliert',signed(model.totals.cumulativeCashFlow),'Mio. USD','Vor Finanzierung und Steuern')}</div>
      <div class="pd-assumptions"><div><h3>Piloten bleiben unverändert</h3><p>${model.pilotDates.length} eigene Dinner · ${input.seats} Plätze · ${percent(input.pilotOccupancy)} Auslastung · ${number(input.pilotPrice)} USD je Gast.</p><p>Termine: ${model.pilotDates.map(date).join(' · ')}</p></div><div><h3>Regelbetrieb als Annahme</h3><p>${regular.map(year => `${year.year}: ${year.regularEvents} Dinner`).join(' · ')}. ${percent(input.regularOccupancy)} Auslastung bei ${number(input.regularPrice)} USD je Gast; erst nach der Betriebsprüfung an G4 (${date(model.gateDates.G4)}).</p></div></div>
      ${financeTable(model)}
      <p class="pd-table-hint">Die letzte Spalte summiert die Jahreswerte; beim kumulierten Cashflow zeigt sie den Endstand. Cashflow vor Finanzierung und Steuern ist keine Gewinnzusage.</p>
      <section class="pd-note-box"><h3>So entsteht die Rechnung</h3><ol class="pd-formula-list"><li>Gäste = Dinner × ${input.seats} Plätze × angenommene Auslastung.</li><li>Umsatz = Pilotgäste × ${number(input.pilotPrice)} USD + Regelbetriebsgäste × ${number(input.regularPrice)} USD.</li><li>Variable Kosten = Gäste × ${number(input.variableCostPerGuest)} USD. Laufende Fixkosten: ${mio(annualFixed)} Mio. USD pro vollem Jahr ab ${date(input.fixedCostsStart)}.</li><li>Jahres-Cashflow = Umsatz − variable Kosten − laufende Fixkosten − Sachinvestitionen − Entwicklung / Anlauf.</li><li>Kumulierter Cashflow = Summe der Jahres-Cashflows seit ${model.years[0]}.</li></ol><p>Die jährlichen Fixkosten enthalten ${number(input.fixedCosts.personnel)} USD Personal, ${number(input.fixedCosts.siteMaintenanceInsurance)} USD Standort, Wartung und Versicherung sowie ${number(input.fixedCosts.administrationSales)} USD Verwaltung und Vertrieb. Alle Ansätze sind unvalidierte Modellannahmen.</p></section>`;
  }

  function scenariosMarkup(model) {
    const names = {downside:'Vorsichtig',base:'Basis',upside:'Höhere Auslastung'};
    const scenarioRows = model.scenarios.map(scenario => `<tr${scenario.id === 'base' ? ' class="pd-table-emphasis"' : ''}><th scope="row">${esc(names[scenario.id] || scenario.label)}</th><td class="pd-number">${percent(scenario.regularOccupancy)}</td><td class="pd-number">${number(scenario.regularPrice)}</td><td class="pd-number">${signed(scenario.totals.cumulativeCashFlow)}</td></tr>`).join('');
    const sensitivity = model.sensitivity;
    const matrixRows = sensitivity.rows.map(row => `<tr><th scope="row">${percent(row.regularOccupancy)}</th>${row.values.map((value,index) => `<td class="pd-number${row.regularOccupancy === model.inputs.regularOccupancy && sensitivity.prices[index] === model.inputs.regularPrice ? ' pd-base-cell' : ''}">${signed(value)}</td>`).join('')}</tr>`).join('');
    return `<p class="pd-lead">Diese Varianten ändern nur Preis und Auslastung im angenommenen Regelbetrieb. Die vier Piloten bleiben bei <strong>${percent(model.inputs.pilotOccupancy)} Auslastung und ${number(model.inputs.pilotPrice)} USD je Gast</strong>; Budget, Kostenansätze und Dinnerzahl bleiben gleich.</p>
      ${tableWrap('Drei Szenarien für den kumulierten Cashflow', `<table class="pd-table pd-scenarios-table"><caption>Kumulierter Cashflow bis ${model.years[model.years.length - 1]} · vor Finanzierung und Steuern</caption><thead><tr><th scope="col">Arbeitsszenario</th><th scope="col" class="pd-number">Auslastung</th><th scope="col" class="pd-number">Preis je Gast · USD</th><th scope="col" class="pd-number">Cashflow · Mio. USD</th></tr></thead><tbody>${scenarioRows}</tbody></table>`)}
      <p class="pd-important">Positive Werte gelten nur innerhalb dieser Annahmen. Weder zahlungsbereite Nachfrage noch Pavillonkosten oder ein künftiger Gewinn sind damit nachgewiesen.</p>
      ${tableWrap('Sensitivität nach Auslastung und Ticketpreis', `<table class="pd-table pd-sensitivity-table"><caption>Preis × Auslastung im Regelbetrieb · kumulierter Cashflow in Mio. USD</caption><thead><tr><th scope="col">Auslastung ↓ / Preis →</th>${sensitivity.prices.map(price => `<th scope="col" class="pd-number">${number(price)} USD</th>`).join('')}</tr></thead><tbody>${matrixRows}</tbody></table>`)}
      <details class="pd-disclosure"><summary>Was verändert die historische Budgetspanne?</summary><p>Die frühere Lounge-Spanne von 10–15 Mio. USD ist keine validierte Pavillon-Schätzung. Diese reine Rechenvariation ersetzt nur den Gesamtprojektansatz; Betriebsannahmen bleiben wie im Basisszenario.</p>${tableWrap('Rechenvariation des Gesamtprojektansatzes', `<table class="pd-table"><thead><tr><th scope="col">Angenommener Gesamtansatz · Mio. USD</th><th scope="col">Cashflow kumuliert · Mio. USD</th></tr></thead><tbody>${model.budgetSensitivity.map(item => `<tr><th scope="row">${mio(item.assumedProjectBudget)}</th><td class="pd-number">${signed(item.cumulativeCashFlow)}</td></tr>`).join('')}</tbody></table>`)}</details>`;
  }

  function financeMarkup(model, selected) {
    return `<nav class="pd-tabs" role="tablist" aria-label="Rechendetails">${tabs.map(([key,label]) => `<button type="button" role="tab" id="pd-tab-${key}" data-pd-tab="${key}" aria-controls="pd-panel-${key}" aria-selected="${key === selected}" tabindex="${key === selected ? '0' : '-1'}">${esc(label)}</button>`).join('')}</nav>
      <div class="pd-content">${tabs.map(([key]) => `<section class="pd-panel" role="tabpanel" id="pd-panel-${key}" aria-labelledby="pd-tab-${key}" tabindex="0"${key === selected ? '' : ' hidden'}>${key === 'budget' ? budgetMarkup(model) : key === 'years' ? yearsMarkup(model) : scenariosMarkup(model)}</section>`).join('')}
      <details class="pd-disclosure"><summary>Modellgrenzen und Abgrenzung</summary><ul>${model.caveats.map(caveat => `<li>${esc(caveat)}</li>`).join('')}</ul></details>
      <div class="pd-downloads"><a href="${workbook}" download>Arbeitsszenario als Excel herunterladen <span aria-hidden="true">↓</span></a><a href="${originalWorkbook}" download>Ursprüngliche XLSM · früherer mobiler Stand <span aria-hidden="true">↓</span></a></div>
      <p class="pd-source-note">Stand ${date(model.planDate)} · Basis: frühere Kostenstruktur der größeren Lounge. Neue Angebote für den festen Pavillon sind an G2 erforderlich.</p></div>`;
  }

  function safeURL(value) {
    try { const url = new URL(value); return /^https?:$/.test(url.protocol) ? url.href : ''; }
    catch (_) { return ''; }
  }

  function contactsMarkup() {
    const contacts = window.RoadmapContactsArray || window.RoadmapContacts || [];
    return `<div class="pd-content"><p class="pd-lead">Die Anschriften gehören zu den Anlaufstellen, nicht zu einem gesicherten Pavillonstandort. Die Zuständigkeit muss anhand des konkreten Grundstücks geklärt werden.</p><div class="pd-contacts">${contacts.map(contact => {
      const url = safeURL(contact.url), phone = String(contact.phone || '').replace(/[^+\d]/g,'');
      return `<article class="pd-contact"><span class="pd-contact-status">${esc(contact.status || 'Anlaufstelle, nicht beauftragt')}</span><h3>${esc(contact.title)}</h3><p>${esc(contact.purpose)}</p><dl><div><dt>Anschrift</dt><dd><address>${esc(contact.address)}</address></dd></div><div><dt>Telefon</dt><dd>${phone ? `<a class="pd-phone" href="tel:${esc(phone)}">${esc(contact.phone)}</a>` : esc(contact.phone)}</dd></div><div><dt>Roadmap-Phasen</dt><dd>${contact.phases.map(phase => `<span class="pd-phase">${esc(phaseNames[phase] || phase)}</span>`).join('')}</dd></div><div><dt>Offizielle Quelle</dt><dd>${url ? `<a class="pd-source-url" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(contact.url)} <span aria-hidden="true">↗</span></a>` : esc(contact.url)}</dd></div></dl><p class="pd-checked">Geprüft am ${esc(date(contact.checked))}</p></article>`;
    }).join('')}</div>${contacts.length ? '' : '<p>Die Kontaktdaten sind noch nicht geladen. Bitte öffnen Sie die Details erneut, sobald die Seite vollständig geladen ist.</p>'}</div>`;
  }

  function selectTab(key, focus = false) {
    dialog.querySelectorAll('[data-pd-tab]').forEach(button => {
      const selected = button.dataset.pdTab === key;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      dialog.querySelector(`#${button.getAttribute('aria-controls')}`).hidden = !selected;
      if (selected && focus) button.focus({preventScroll:true});
    });
    const content = dialog.querySelector('.pd-content');
    if (content) content.scrollTop = 0;
  }

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = dialogId;
    dialog.className = 'pd-dialog';
    dialog.setAttribute('aria-labelledby','pd-title');
    dialog.setAttribute('aria-describedby','pd-intro');
    dialog.addEventListener('close', () => {
      if (!lockWasPresent) document.documentElement.classList.remove('pd-scroll-locked');
      const restore = opener;
      opener = null;
      if (restore?.isConnected && restore.getClientRects().length) restore.focus({preventScroll:true});
    });
    dialog.addEventListener('cancel', event => event.stopPropagation());
    dialog.addEventListener('click', event => {
      if (event.target.closest('[data-pd-close]')) dialog.close();
      const tab = event.target.closest('[data-pd-tab]');
      if (tab) selectTab(tab.dataset.pdTab, true);
    });
    dialog.addEventListener('keydown', event => {
      event.stopPropagation();
      const tab = event.target.closest('[data-pd-tab]');
      if (!tab || event.altKey || event.ctrlKey || event.metaKey) return;
      const keys = tabs.map(([key]) => key), index = keys.indexOf(tab.dataset.pdTab);
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % keys.length;
      if (event.key === 'ArrowLeft') next = (index + keys.length - 1) % keys.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = keys.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(keys[next], true); }
    });
    document.body.append(dialog);
    return dialog;
  }

  function openDetails(kind, tab, trigger) {
    const modal = ensureDialog(), alreadyOpen = modal.open;
    const selected = tabs.some(([key]) => key === tab) ? tab : 'budget';
    let title, intro, content, stamp = 'METHODENDETAILS';
    try {
      if (kind === 'contacts') {
        title = 'Adressen & Telefonnummern';
        intro = 'Anlaufstellen für Standort 1 Florida · nicht beauftragt.';
        stamp = 'ROADMAP · ÖFFENTLICHE KONTAKTE';
        content = contactsMarkup();
      } else {
        const model = finance();
        title = 'Der Rechenweg für Florida';
        intro = 'Vorläufiges studentisches Arbeitsszenario auf Basis der früheren Lounge-Kostenstruktur. Kosten und Nachfrage sind nicht validiert; Texas ist nicht budgetiert.';
        stamp = `ARBEITSSZENARIO · ${date(model.planDate)}`;
        content = financeMarkup(model, selected);
      }
    } catch (_) {
      title = 'Details noch nicht verfügbar';
      intro = 'Bitte lassen Sie die Seite vollständig laden und öffnen Sie die Details erneut.';
      content = '<div class="pd-content"><p>Die gemeinsame Datenbasis konnte noch nicht gelesen werden.</p></div>';
    }
    modal.innerHTML = `<header class="pd-header"><div><p class="pd-kicker">${esc(stamp)}</p><h2 class="pd-title" id="pd-title" tabindex="-1">${esc(title)}</h2><p class="pd-intro" id="pd-intro">${esc(intro)}</p></div><button class="pd-close" type="button" data-pd-close aria-label="Details schließen"><span>Schließen</span><span aria-hidden="true">×</span></button></header>${content}`;
    if (!alreadyOpen) {
      opener = trigger || document.activeElement;
      lockWasPresent = document.documentElement.classList.contains('pd-scroll-locked');
      document.documentElement.classList.add('pd-scroll-locked');
      modal.showModal();
    }
    modal.querySelector('#pd-title').focus({preventScroll:true});
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest?.('[data-pitch-detail]');
    if (!trigger || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();
    openDetails(trigger.dataset.pitchDetail, trigger.dataset.pitchTab, trigger);
  });

  window.PitchDetails = Object.freeze({actions, financeTable});
})();
