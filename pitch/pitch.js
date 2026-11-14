/* A single native-scroll presentation. Original evidence stays read-only. */
(() => {
  'use strict';
  const E = window.PitchEvidence;
  if (!E) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const number = (value, digits = 2) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const read = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch (_) {} };
  const writeHistory = (method, data, url) => { try { history[method](data,'',url); } catch (_) { /* Local file previews can restrict History API writes. */ } };
  const safeURL = value => /^https?:\/\//i.test(value) ? escape(value) : '#quellen';
  const revealTarget = target => {
    if (target.tagName === 'DETAILS') target.open = true;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
    }
  };
  const displayName = idea => idea.id === 9 ? 'RocketLight Dinner' : idea.name;
  let selectedIdea = 9;
  // The source UI defines index 0 as KI and index 1 as the group/team.
  let matrixIndex = 1;
  const params = new URLSearchParams(location.search);
  let variant = (params.get('variante') || read('rocketlight:variant')) === 'B' ? 'B' : 'A';
  writeHistory('replaceState',{...history.state, pitchVariant:variant},location.href);

  function selectIdea(id) {
    const idea = E.ideas.find(item => item.id === id);
    if (!idea) return;
    selectedIdea = id;
    $('#selected-idea').innerHTML = `<span class="eyebrow">IDEE ${String(id).padStart(2,'0')} · ${escape(idea.trend)}</span><h3>${escape(displayName(idea))}</h3><p>${escape(idea.d)}</p><div class="idea-scores"><span>Machbarkeit <b>${idea.m[matrixIndex]}/5</b></span><span>Originalität <b>${idea.o[matrixIndex]}/5</b></span><span><b>${escape(idea.c[matrixIndex])}</b></span></div><p class="idea-rationale">${escape(idea.rationale?.[matrixIndex === 1 ? 'team' : 'ai'] || '')}</p><div class="inline-sources">${(idea.sources || []).map((id,index)=>`<a href="#source-${escape(id)}">Beleg ${index+1} <svg class="arrow-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M4 4h8v8"/></svg></a>`).join('')}</div>`;
    $$('[data-idea]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.idea) === id)));
    $$('[data-idea-group]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.ideaGroup.split(',').map(Number).includes(id))));
  }

  function renderMatrix() {
    const groups = new Map();
    E.ideas.forEach(idea => {
      const key = `${idea.m[matrixIndex]},${idea.o[matrixIndex]}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(idea);
    });
    $('#matrix-points').innerHTML = Array.from(groups, ([coordinates, ideas]) => {
      const [x, y] = coordinates.split(',').map(Number);
      const ids = ideas.map(idea => idea.id);
      const label = ideas.length > 1 ? `${ideas.length}×` : String(ids[0]).padStart(2,'0');
      const names = ideas.map(displayName).join(', ');
      return `<div class="matrix-point" style="left:${(x-1)*25}%;bottom:${(y-1)*25}%"><button type="button" ${ideas.length>1?`data-idea-group="${ids.join(',')}"`:`data-idea="${ids[0]}"`} aria-pressed="${ids.includes(selectedIdea)}" aria-label="${escape(names)}, Machbarkeit ${x} von 5, Originalität ${y} von 5${ideas.length>1?'. Mehrfach auswählen, um durch die Ideen zu wechseln.':''}">${label}</button></div>`;
    }).join('');
    $$('[data-matrix]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.matrix) === matrixIndex)));
    selectIdea(selectedIdea);
  }

  function renderIdeaTable() {
    $('#ideas-table').innerHTML = `<table><caption>Alle Ideen · M = Machbarkeit, O = Originalität, jeweils 1–5. Einordnung aus dem Original-Ideenpool.</caption><thead><tr><th>Nr.</th><th>Idee &amp; Inhalt</th><th>Trend</th><th>Team · M/O</th><th>KI · M/O</th></tr></thead><tbody>${E.ideas.map(idea => `<tr class="${idea.id === 9 ? 'highlight-row' : ''}"><td>${String(idea.id).padStart(2,'0')}</td><td><strong>${escape(displayName(idea))}</strong><br>${escape(idea.d)}</td><td>${escape(idea.trend)}</td><td>${escape(idea.c[1])}<br>${idea.m[1]} / ${idea.o[1]}</td><td>${escape(idea.c[0])}<br>${idea.m[0]} / ${idea.o[0]}</td></tr>`).join('')}</tbody></table><p class="table-note">Die Launch Engineering Cloud ist beim Team ein NOW-Kandidat, bei der KI ein WOW-Kandidat. Die drei vertieften Konzepte bleiben als Finalisten vergleichbar.</p>`;
  }

  function renderAssessments() {
    $('#assessment-comparison').innerHTML = E.rocketlightAssessments.map(({ assessment, result }, index) => `<article class="assessment-card"><header><span>${index === 0 ? 'DIE SICHT DES TEAMS' : 'DIE SICHT DER KI · CLAUDE'}</span><b>${index === 0 ? 'Quick win' : 'Umsetzung prüfen'}</b></header><div class="assessment-score"><strong>${number(result.IR)}</strong><span>Innovationsrendite<br>nach Hube</span></div>${[['Nutzen',result.IN],['Aufwand',result.IA]].map(([label,value]) => `<div class="score-row"><div><span>${label}</span><b>${number(value)} / 5</b></div><div class="score-track" aria-hidden="true"><span style="width:${value/5*100}%"></span></div></div>`).join('')}</article>`).join('');
    const modeledCases = E.assessments.filter(({assessment}) => assessment.fy);
    $('#businesscase-comparison').innerHTML = `<div class="table-scroll"><table><caption>Fünf relative Projektjahre · Millionen USD · Annahmen aus den drei aktuellen XLSM-Dateien</caption><thead><tr><th>Konzept</th><th class="number">Umsatz</th><th class="number">F&amp;E</th><th class="number">Gewinnindikator</th></tr></thead><tbody>${modeledCases.map(({assessment:a,result:r})=>`<tr class="${a.idea===9?'highlight-row':''}"><th scope="row">${escape(a.project)}</th><td class="number">${number(r.fy.R/1e6)}</td><td class="number">${number(r.fy.C/1e6)}</td><td class="number">${number(r.fy.P/1e6)}</td></tr>`).join('')}</tbody></table></div><p>Umsatz ist kein Gewinn. Alle drei Gewinnindikatoren übertragen dieselbe operative Modellmarge des Kerngeschäfts Space + Connectivity (3.766 / 15.473 Mio. USD). Die F&amp;E-Beträge erfassen Entwicklung, nicht den vollständigen laufenden Betrieb. Die Fälle sind eigenständige Szenarien und werden nicht addiert.</p><div class="table-scroll"><table><caption>Umsatzentwicklung je Geschäftsidee · Millionen USD</caption><thead><tr><th>Konzept</th>${[1,2,3,4,5].map(y=>`<th class="number">Jahr ${y}</th>`).join('')}</tr></thead><tbody>${modeledCases.map(({assessment:a,result:r})=>`<tr><th scope="row">${escape(a.project)}</th>${r.fy.revenue.map(v=>`<td class="number">${number(v/1e6)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><a class="text-link" href="#quellen">Originalkalkulationen mit allen Eingaben herunterladen ↓</a>`;
    const [team, ai] = E.rocketlightAssessments;
    const criteriaTable = (criteria, group, title) => `<div class="table-scroll"><table><caption>${title} · RocketLight Dinner</caption><thead><tr><th>Kriterium</th><th class="number">Gewicht</th><th class="number">Team</th><th class="number">KI</th></tr></thead><tbody>${criteria.map((criterion, index) => `<tr><td>${escape(criterion.t)}</td><td class="number">${E.weights[group][index]} %</td><td class="number">${(group === 'n' ? team.result.n : team.result.x)[index]}</td><td class="number">${(group === 'n' ? ai.result.n : ai.result.x)[index]}</td></tr>`).join('')}</tbody></table></div>`;
    $('#assessment-details').innerHTML = `<div class="table-scroll"><table><caption>Vergleich der drei Finalisten mit den Gruppen-Gewichten. IN = Nutzen, IA = Aufwand, IR = IN ÷ IA.</caption><thead><tr><th>Konzept</th><th>Bewertung</th><th class="number">IN</th><th class="number">IA</th><th class="number">IR</th><th>Portfolio</th></tr></thead><tbody>${E.assessments.map(({assessment:a,result:r}) => `<tr class="${a.idea === 9 ? 'highlight-row' : ''}"><td>${escape(a.project)}</td><td>${escape(a.assessor)}</td><td class="number">${number(r.IN)}</td><td class="number">${number(r.IA)}</td><td class="number">${number(r.IR)}</td><td>${escape(r.pf[0])}</td></tr>`).join('')}</tbody></table></div><div class="criteria-tables">${criteriaTable(E.criteria.benefit,'n','Nutzen / Chancen')}${criteriaTable(E.criteria.effort,'a','Aufwand / Risiko')}</div><p class="table-note">Die Werte beziehen sich auf den ursprünglichen Dinner-Case. Die Team-Bewertung enthält im Original keine schriftlichen Einzelbegründungen. Die folgenden Begründungen stammen aus der KI-Bewertung; sie sind Einschätzungen, keine bestätigten Projektergebnisse.</p><details class="disclosure"><summary>Die einzelnen KI-Begründungen lesen <span aria-hidden="true">+</span></summary><div class="criteria-reasons">${[...E.criteria.benefit,...E.criteria.effort].filter(c => ai.assessment.why[c.k]).map(c => `<h4>${escape(c.t)}</h4><p>${escape(ai.assessment.why[c.k])}</p>`).join('')}</div></details>`;
  }

  function renderFinance() {
    const f = E.financialA;
    const input = E.financialAssessmentA.fy;
    const years = [2027,2028,2029,2030,2031];
    $('#revenue-total').textContent = number(f.R/1e6);
    $('#revenue-chart').innerHTML = f.revenue.map((value,index) => `<div class="revenue-column"><div class="revenue-bar" style="height:${value/Math.max(...f.revenue)*78}%"><span>${number(value/1e6,value === 0 ? 0 : 2)}</span></div><span class="revenue-year">${years[index]}</span><span class="revenue-seats">${input.qty[index]} Plätze</span></div>`).join('');
    const rows = [
      ['Verkaufte Plätze',input.qty,0],['USD je Platz',input.price,0],['Umsatz · Mio. USD',f.revenue.map(v=>v/1e6),2],
      ['Personal für Entwicklung · Mio. USD',f.staffCost.map(v=>v/1e6),2],['Sachaufwand · Mio. USD',input.material.map(v=>v/1e6),2],['Projekt-/F&E-Aufwand · Mio. USD',f.rnd.map(v=>v/1e6),2]
    ];
    $('#finance-table').innerHTML = `<table><caption>Variante A · Originalrechnung, relative Jahre 1–5 auf die Roadmap 2027–2031 übertragen.</caption><thead><tr><th>Planwert</th>${years.map(year=>`<th class="number">${year}</th>`).join('')}</tr></thead><tbody>${rows.map(([label,values,digits])=>`<tr><td>${label}</td>${values.map(value=>`<td class="number">${number(value,digits)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    $('#finance-explanation').textContent = `${number(f.qtySum,0)} verkaufte Plätze ergeben ${number(f.R/1e6)} Mio. USD Umsatz. Der kumulierte Entwicklungsaufwand beträgt ${number(f.C/1e6)} Mio. USD. Der Kalkulator leitet einen Gewinnindikator von ${number(f.P/1e6)} Mio. USD aus der Modellmarge des Kerngeschäfts Space + Connectivity (${number(f.margin*100)} %) ab. Diese Übertragung ersetzt keine eigene Gastronomie-Kostenrechnung und keinen Projekt-Cashflow; sie belegt weder eine tatsächliche Gewinnmarge noch einen Break-even.`;
  }

  function renderVariant(announce = false) {
    const {data,meta} = E.variants[variant];
    const isA = variant === 'A';
    $$('[data-variant]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.variant === variant)));
    const image = $('#variant-image');
    image.src = 'assets/dining-facing-launch.webp';
    image.alt = `Gemeinsames Innenraumkonzept für Variante ${variant}: einzelne Zweiertische auf versetzten Terrassen mit freier Sicht auf den Raketenstart. Künstlerische Visualisierung.`;
    $('#variant-location').textContent = meta.location.toLocaleUpperCase('de-DE');
    $('#variant-title').innerHTML = isA ? 'Ein Pavillon.<br>Mehr als ein Horizont.' : 'Ein fester Ort.<br>Für besondere Momente.';
    $('#variant-description').textContent = isA ? 'Erst in Florida erproben, dann den zweiten Standort entwickeln.' : 'Piloten im Kennedy Space Center sind geplant, während die eigene Lounge entsteht.';
    $('#roadmap-metrics').innerHTML = `<div class="roadmap-metric"><span>GEPLANTER RAHMEN</span><strong>${escape(meta.budget)}</strong><small>${escape(meta.budgetLabel)}</small></div><div class="roadmap-metric"><span>ERSTER PILOT</span><strong>${escape(meta.firstDinner)}</strong><small>${escape(meta.firstDinnerLabel)}</small></div><div class="roadmap-metric"><span>FÜNFJAHRESZIEL</span><strong>${escape(meta.revenue)}</strong><small>Mio. USD Umsatz · Planannahme</small></div>`;
    $('#gate-timeline').innerHTML = meta.gates.map(gate => {const [day,month,year] = gate.date.split('.');return `<li><span>${escape(gate.id)}</span><time datetime="${year}-${month}-${day}">${escape(gate.date)}</time><h4>${escape(gate.title)}</h4><p>${escape(gate.description)}</p></li>`;}).join('');
    $('#critical-path').textContent = meta.critical;
    $('#roadmap-projects').innerHTML = `<ol class="project-list">${data.t1.map((project,index)=>`<li><span>TEILPROJEKT ${String(index+1).padStart(2,'0')}</span><h4>${escape(project.name)}</h4><p>${escape(project.inhalt)}</p><p><strong>Ziel:</strong> ${escape(project.ziel)}</p></li>`).join('')}</ol><h3>Die vier W-Fragen</h3><p>Geplante Rollen, Partner und Termine. Genannte Organisationen oder Personen haben damit keine Zusage erteilt.</p><div class="four-questions">${[['was','Was?'],['wer','Wer?'],['wann','Wann?'],['wie','Wie?']].map(([key,label])=>`<section><h4>${label}</h4><ul>${data.w4[key].map(item=>`<li>${escape(item)}</li>`).join('')}</ul></section>`).join('')}</div>`;
    $('#variant-caveat').textContent = isA ? 'Originalroadmap vom 05.11.2026: Teilprojekte laufen teilweise parallel; Gates sind geplante Entscheidungen. Die dort genannte 12-Monats-Garantie ist eine frühere Planannahme. Im finalen 5P-Mix bleiben Bedingungen und Kosten eines Ersatztermins zu prüfen.' : 'Eigenständige Alternative: 13,38 Mio. USD in der Budgettabelle, hier gerundet 13,4 Mio. USD. Die Piloten starten im Plan bereits 2027 im KSC, die eigene Lounge eröffnet am 01.10.2028. Der Umsatz von 47,2 Mio. USD ist aus dem Basiskonzept übernommen; die A-Jahresrechnung ist kein Finanzplan für B.';
    $$('[data-plan-link]').forEach(link => link.href = `../teil6/?variante=${variant}#${link.dataset.planLink}`);
    $('#presentation-download').href = `../praesentation/${data.file}`;
    const alternativeNote = $('#decision-alternative');
    if (alternativeNote) alternativeNote.hidden = isA;
    if (announce) $('#variant-status').textContent = `${meta.short}. ${meta.budget} ${meta.budgetLabel}. ${meta.firstDinnerLabel}: ${meta.firstDinner}. Termine, Projekte und Links wurden angepasst.`;
    window.PitchFilm?.setVariant(variant);
    queueMeasure();
  }

  function renderSources() {
    $('#source-list').innerHTML = E.sources.map(source => `<li><p>${escape(source.fact)}</p>${source.links.map(link => /^https?:\/\//i.test(link.url || '') ? `<a href="${safeURL(link.url)}" target="_blank" rel="noopener noreferrer">${escape(link.by || 'Originalquelle')} <svg class="arrow-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M4 4h8v8"/></svg></a>` : `<p>${escape(link.by || 'Projektinterne Quelle')} (ohne externe URL)</p>`).join('')}</li>`).join('');
  }

  // Read dimensions only when layout changes; scroll frames only update transforms.
  const sections = $$('[data-step]');
  const railLinks = $$('.rail-chapters a');
  const menu = $('#chapter-menu');
  const menuButton = $('#chapter-toggle');
  const motionButton = $('#motion-toggle');
  const launchButton = $('#launch-button');
  const launchStage = $('.launch-stage');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let motionPreference = read('rocketlight:motion');
  let preferredReduced = motionPreference === 'reduced' || (motionPreference !== 'full' && media.matches);
  const shortWindow = () => innerHeight < 560 || (innerWidth <= 760 && innerHeight < 680);
  let reduced = preferredReduced || shortWindow();
  let needsMeasure = true;
  let frameID = 0;
  let sectionTops = [];
  const engines = $$('[data-engine]');
  let engineTops = [];
  let activeEngines = -1;
  let launchTop = 0;
  let launchRange = 1;
  let activeStep = -1;
  let remaining = -1;
  let launchState = '';
  let manualLaunch = null;
  let launchProgress = 0;
  let lastScroll = scrollY;
  let destroyed = false;
  let resizeObserver;

  function queueFrame() {
    if (!frameID && !document.hidden && !destroyed) frameID = requestAnimationFrame(frame);
  }
  function queueMeasure() { needsMeasure = true; queueFrame(); }
  function measure() {
    sectionTops = sections.map(section => section.getBoundingClientRect().top + scrollY);
    engineTops = engines.map(engine => engine.closest('details:not([open])') ? Infinity : engine.getBoundingClientRect().top + scrollY);
    const launch = $('#start');
    launchTop = launch.getBoundingClientRect().top + scrollY;
    launchRange = Math.max(1, launch.offsetHeight - innerHeight);
    window.PitchFilm?.measure();
    needsMeasure = false;
  }
  function setMenu(open) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
  }
  function updateMotion() {
    reduced = preferredReduced || shortWindow();
    const motionAnchor = window.PitchFilm?.captureMotionPosition(reduced);
    document.body.classList.add('motion-ready');
    document.body.classList.toggle('is-reduced', reduced);
    window.PitchFilm?.setReduced(reduced,motionAnchor);
    motionButton.setAttribute('aria-pressed', String(preferredReduced));
    motionButton.setAttribute('aria-label', preferredReduced ? 'Bewegung aktivieren' : 'Bewegung reduzieren');
    motionButton.title = shortWindow() ? 'Statische Darstellung bei geringer Fensterhöhe' : preferredReduced ? 'Bewegung aktivieren' : 'Bewegung reduzieren';
    manualLaunch = null;
    queueMeasure();
  }
  function setLaunchState(state) {
    if (launchState === state) return;
    launchState = state;
    const status = $('#launch-status');
    if (state === 'complete') {
      status.textContent = reduced ? 'Mission gestartet. Statische Darstellung mit reduzierter Bewegung.' : 'Liftoff. Aus einer Idee wird eine gemeinsame Mission.';
      launchButton.innerHTML = 'Start wiederholen <span aria-hidden="true">↻</span>';
    } else if (state === 'starting' || state === 'ascent') {
      status.textContent = state === 'ascent' ? 'Die Rakete hebt ab. Ein gemeinsamer Aufbruch.' : 'Zündung. Der Moment beginnt.';
      launchButton.innerHTML = 'Rakete starten <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M4 4h8v8"/></svg></span>';
    } else {
      status.textContent = reduced ? 'Reduzierte Bewegung: Der Abschluss bleibt als ruhiges Bild sichtbar.' : 'Der Start folgt deinem Scrollfortschritt.';
      launchButton.innerHTML = 'Rakete starten <span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M4 4h8v8"/></svg></span>';
    }
  }
  function frame(now) {
    frameID = 0;
    if (document.hidden || destroyed) return;
    if (needsMeasure) measure();
    const y = scrollY;
    const marker = y + Math.min(innerHeight * .35, 270);
    const enginesReady = engineTops.filter(top => y + innerHeight * .8 >= top).length;
    if (enginesReady !== activeEngines) {
      activeEngines = enginesReady;
      engines.forEach((engine,index) => engine.classList.toggle('is-active',index < enginesReady));
    }
    let step = 0;
    sectionTops.forEach((top,index) => { if (marker >= top) step = index+1; });
    if (activeStep !== step) {
      activeStep = step;
      railLinks.forEach((link,index) => {
        link.classList.toggle('is-past', index+1 < step);
        if (index+1 === step) link.setAttribute('aria-current','step'); else link.removeAttribute('aria-current');
      });
      $$('#chapter-menu a').forEach(link => {
        if (link.hash === `#schritt-${step}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
      });
    }
    let progress = reduced ? (marker >= launchTop ? 1 : 0) : clamp((y - launchTop + 70) / launchRange);
    if (manualLaunch) {
      if (manualLaunch.started === null) manualLaunch.started = now;
      const elapsed = reduced ? 1 : clamp((now - manualLaunch.started) / 11000);
      progress = manualLaunch.from + (1-manualLaunch.from) * elapsed;
      if (elapsed < 1) queueFrame();
    }
    launchProgress = progress;
    const flight = clamp((progress - .08) / .92);
    const eased = flight * flight * (3-2*flight);
    const ignition = reduced ? (progress ? .6 : 0) : clamp(progress/.22);
    launchStage.style.setProperty('--ignition', ignition.toFixed(3));
    launchStage.style.setProperty('--rocket-rise', `${reduced ? (progress ? -95 : 0) : -eased * Math.max(650, innerHeight*.92)}px`);
    launchStage.style.setProperty('--smoke-scale', (1+progress*1.8).toFixed(3));
    setLaunchState(progress >= .98 ? 'complete' : progress > .23 ? 'ascent' : progress > .065 ? 'starting' : 'ready');
    const nextRemaining = progress > .08 ? 0 : sections.length+1-Math.max(1,step);
    if (remaining !== nextRemaining) {
      remaining = nextRemaining;
      $('#rail-count').textContent = `T−${String(remaining).padStart(2,'0')}`;
      $('#rail-count').setAttribute('aria-label', remaining ? `Noch ${remaining} Pitch-Kapitel bis zum Start` : 'Pitch abgeschlossen: Rakete gestartet');
    }
    const totalProgress = clamp((marker-(sectionTops[0] || 0))/Math.max(1,launchTop+launchRange-(sectionTops[0] || 0)));
    $('#rail-progress').style.transform = `scaleY(${progress >= .98 ? 1 : totalProgress})`;
    $('.hero-image').style.setProperty('--hero-shift', `${reduced ? 0 : Math.min(y*.12,100)}px`);
    window.PitchFilm?.update({y,viewport:innerHeight,reduced,variant,launchProgress:progress});
  }

  document.addEventListener('click', event => {
    const ideaButton = event.target.closest('[data-idea]');
    if (ideaButton) selectIdea(Number(ideaButton.dataset.idea));
    const ideaGroup = event.target.closest('[data-idea-group]');
    if (ideaGroup) {
      const ids = ideaGroup.dataset.ideaGroup.split(',').map(Number);
      selectIdea(ids[(ids.indexOf(selectedIdea)+1)%ids.length]);
    }
    const matrixButton = event.target.closest('[data-matrix]');
    if (matrixButton) { matrixIndex = Number(matrixButton.dataset.matrix); renderMatrix(); }
    const variantButton = event.target.closest('[data-variant]');
    if (variantButton && variantButton.dataset.variant !== variant) {
      variant = variantButton.dataset.variant;
      write('rocketlight:variant',variant);
      const url = new URL(location.href); url.searchParams.set('variante',variant);
      writeHistory('replaceState',{...history.state,pitchVariant:variant},url);
      renderVariant(true);
    }
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      const target = document.getElementById(anchor.hash.slice(1));
      if (target) {
        event.preventDefault();
        setMenu(false);
        revealTarget(target);
        writeHistory('pushState',{pitchVariant:variant},anchor.hash);
        // A pinned hero sits at the end of its reel when approached from below.
        // Returning to the beginning must target the reel, so its copy is visible.
        const scrollTarget = target.id === 'auftakt' ? target.closest('.film-prologue') || target : target;
        scrollTarget.scrollIntoView({behavior: reduced ? 'instant' : 'smooth', block:'start'});
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
      }
    }
    if (!menu.hidden && !event.target.closest('#chapter-menu, #chapter-toggle')) setMenu(false);
  });
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); }
  });
  // Keep the non-modal dropdown in the natural tab order, and close on exit.
  document.addEventListener('focusin', event => {
    if (!menu.hidden && !event.target.closest('#chapter-menu, #chapter-toggle')) setMenu(false);
  });
  motionButton.addEventListener('click', () => {
    preferredReduced = !preferredReduced;
    motionPreference = preferredReduced ? 'reduced' : 'full';
    write('rocketlight:motion',motionPreference);
    updateMotion();
  });
  media.addEventListener('change', () => {
    if (motionPreference !== 'full' && motionPreference !== 'reduced') preferredReduced = media.matches;
    updateMotion();
  });
  launchButton.addEventListener('click', () => {
    manualLaunch = { started:null, from:launchProgress >= .98 ? 0 : launchProgress };
    queueFrame();
  });
  addEventListener('scroll', () => {
    if (scrollY < lastScroll-2 || scrollY < launchTop-innerHeight*.25) manualLaunch = null;
    lastScroll = scrollY;
    queueFrame();
  }, {passive:true});
  addEventListener('resize', () => {
    const nextReduced = preferredReduced || shortWindow();
    if (nextReduced !== reduced) updateMotion();
    queueMeasure();
  }, {passive:true});
  addEventListener('popstate', event => {
    const requested = new URLSearchParams(location.search).get('variante') || event.state?.pitchVariant || read('rocketlight:variant');
    const restored = requested === 'B' ? 'B' : 'A';
    if (restored !== variant) {
      variant = restored;
      write('rocketlight:variant',variant);
      renderVariant(true);
    }
    manualLaunch = null;
    setMenu(false);
    queueMeasure();
  });
  document.addEventListener('toggle', queueMeasure, true);
  document.addEventListener('pitch:layout', queueMeasure);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frameID) cancelAnimationFrame(frameID);
      frameID = 0;
      if (manualLaunch) manualLaunch = {started:null,from:launchProgress};
    } else queueMeasure();
  });
  addEventListener('storage', event => {
    if (event.key === 'rocketlight:variant') {
      variant = event.newValue === 'B' ? 'B' : 'A';
      const url = new URL(location.href); url.searchParams.set('variante',variant); writeHistory('replaceState',{...history.state,pitchVariant:variant},url);
      renderVariant(true);
    }
    if (event.key === 'rocketlight:motion') {
      motionPreference = event.newValue;
      preferredReduced = motionPreference === 'reduced' || (motionPreference !== 'full' && media.matches);
      updateMotion();
    }
  });
  addEventListener('pagehide', () => {
    destroyed = true;
    if (frameID) cancelAnimationFrame(frameID);
    frameID = 0;
    resizeObserver?.disconnect();
  });
  addEventListener('pageshow', () => {
    destroyed = false;
    resizeObserver?.observe(document.querySelector('main'));
    queueMeasure();
  });

  renderMatrix();
  renderIdeaTable();
  renderAssessments();
  renderFinance();
  renderSources();
  renderVariant();
  $$('.table-scroll').forEach((region,index) => {
    region.tabIndex = 0;
    region.setAttribute('role','region');
    region.setAttribute('aria-label',region.querySelector('caption')?.textContent || `Vergleichstabelle ${index+1}`);
  });
  $$('.chairs').forEach(row => row.innerHTML = '<i></i>'.repeat(10));
  updateMotion();
  $$('img').forEach(image => image.addEventListener('load',queueMeasure));
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(queueMeasure);
    resizeObserver.observe(document.querySelector('main'));
  }
  // Rendering all evidence precedes restoration of a shared chapter link.
  if (location.hash) requestAnimationFrame(() => {
    const target = document.getElementById(location.hash.slice(1));
    if (target) revealTarget(target);
    const scrollTarget = target?.id === 'auftakt' ? target.closest('.film-prologue') || target : target;
    scrollTarget?.scrollIntoView({behavior:'instant',block:'start'});
    queueMeasure();
  });
})();
