/* Source-backed views for the innovation audit and the differentiated trend portfolio. */
(() => {
  'use strict';
  const R = window.PitchResearch;
  if (!R) return;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const linkedCopy = value => esc(value).replace(/\[Q(\d+)\]/g, (_,number) => `<a href="#source-part3-Q${number.padStart(2,'0')}" class="reference-link">[Q${number.padStart(2,'0')}]</a>`);
  let trendMode = 'team';
  let selectedTrend = R.trends[0].id;
  const sourceLinks = ids => (ids || []).map(id => {
    const source = R.sources.find(item => item.id === id);
    return source ? `<a href="#source-${esc(id)}">${esc(source.publisher || source.title || id)} <svg class="arrow-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M4 4h8v8"/></svg></a>` : '';
  }).join('');

  function renderAudit() {
    const sorted = [...R.audit].sort((a,b) => a.team.rank - b.team.rank);
    const max = Math.max(...sorted.flatMap(item => [item.team.score, item.ai.score]));
    $('#audit-chart').innerHTML = sorted.map(item => `<div class="audit-row"><div class="audit-name"><span>${String(item.team.rank).padStart(2,'0')}</span><div><h3>${esc(item.name)}</h3><p>${esc(item.focus)}</p></div></div><div class="audit-bars">${[['team','Team'],['ai','KI']].map(([mode,label]) => `<div class="audit-series ${mode}"><span>${label}</span><div class="audit-track"><i style="width:${item[mode].score / max * 100}%"></i></div><b>${item[mode].score}</b></div>`).join('')}</div></div>`).join('');
    $('#audit-details').innerHTML = `<p class="table-note">Hube-Wert = Neuartigkeit × Umsetzung. Neuartigkeit = „neu für wen?“ × „was ist neu?“. Umsetzung = Reifegrad × Nutzen. Werte und Rangfolgen sind subjektive Projektbewertungen; abhängige Technologien werden nicht zu einem Gesamtpotenzial addiert.</p><div class="table-scroll"><table><caption>Aktuelle Originalbewertung · Inno_Prüfstand und Ranking, Schritt 2</caption><thead><tr><th>Projekt</th><th>Sicht</th><th class="number">Neuartigkeit</th><th class="number">Reifegrad</th><th class="number">Nutzen</th><th class="number">Umsetzung</th><th class="number">Hube-Wert</th><th class="number">Rang</th></tr></thead><tbody>${sorted.flatMap(item => ['team','ai'].map(mode => { const d=item[mode];return `<tr><th scope="row">${esc(item.name)}</th><td>${mode==='team'?'Team':'KI'}</td><td class="number">${d.novelty}</td><td class="number">${d.maturity}</td><td class="number">${d.benefits}</td><td class="number">${d.implementation}</td><td class="number">${d.score}</td><td class="number">${d.rank}</td></tr>`;})).join('')}</tbody></table></div><div class="audit-interpretations">${sorted.map(item=>`<article><h4>${esc(item.name)}</h4><p>${esc(item.interpretation)}</p><div class="inline-sources">${sourceLinks(item.sources)}</div></article>`).join('')}</div>`;
  }

  function selectTrend(id) {
    const trend = R.trends.find(item => String(item.id) === String(id));
    if (!trend) return;
    selectedTrend = trend.id;
    const d = trend[trendMode];
    const idea = R.matrix.find(item => item.id === trend.selectedIdeaId);
    $('#selected-trend').innerHTML = `<p class="eyebrow">${esc(R.method.trend.kindLabels[trend.kind] || 'TREND')} · ${trendMode==='team'?'TEAM-SICHT':'KI-SICHT'}</p><h3>${esc(trend.name)}</h3><p>${esc(trend.rationale[trendMode])}</p><dl class="trend-values"><div><dt>Einfluss</dt><dd>${d.influence}<small>/ 5</small></dd></div><div><dt>Dauer</dt><dd>${d.duration}<small>/ 3</small></dd></div><div><dt>Nähe</dt><dd>${d.proximity}<small>/ 7</small></dd></div></dl>${idea?`<div class="trend-idea"><span>UNSER FAVORIT AUS DIESEM SUCHFELD</span><strong>${esc(idea.name)}</strong><p>${esc(idea.summary)}</p></div>`:''}<div class="inline-sources">${sourceLinks(trend.sources)}</div>`;
    $$('[data-trend]').forEach(button => button.setAttribute('aria-pressed', String(String(button.dataset.trend) === String(selectedTrend))));
    $$('[data-trend-group]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.trendGroup.split(',').includes(String(selectedTrend)))));
  }

  function renderTrends() {
    const groups = new Map();
    R.trends.forEach(trend => {
      const d = trend[trendMode], key = `${d.pressure},${d.influence}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(trend);
    });
    $('#trend-points').innerHTML = Array.from(groups, ([key,items]) => {
      const [x,y]=key.split(',').map(Number);
      const ids = items.map(item => item.id);
      const label = items.length > 1 ? `${items.length}×` : String(R.trends.indexOf(items[0])+1).padStart(2,'0');
      const names = items.map(item=>item.name).join(', ');
      return `<div class="trend-point-group" style="left:${(x-1)/9*100}%;bottom:${(y-1)/4*100}%"><button type="button" ${items.length>1?`data-trend-group="${ids.join(',')}"`:`data-trend="${ids[0]}"`} aria-pressed="false" aria-label="${esc(names)}, Handlungsdruck ${x} von 10, Einfluss ${y} von 5${items.length>1?'. Mehrfach auswählen, um durch die Trends zu wechseln.':''}">${label}</button></div>`;
    }).join('');
    $$('[data-trend-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.trendMode===trendMode)));
    selectTrend(selectedTrend);
  }

  function renderTrendDetails() {
    $('#trend-list').innerHTML = R.trends.map((trend,index) => `<button type="button" data-trend="${esc(trend.id)}" aria-pressed="false"><span>${String(index+1).padStart(2,'0')}</span>${esc(trend.name)}</button>`).join('');
    $('#trend-details').innerHTML = `<div class="table-scroll"><table><caption>Alle acht Trends · Einfluss 1–5, Dauer 1–3, Nähe 1–7. Handlungsdruck = Dauer + Nähe.</caption><thead><tr><th>Trend</th><th>Sicht</th><th class="number">Einfluss</th><th class="number">Dauer</th><th class="number">Nähe</th><th class="number">Dauer + Nähe</th><th>Zeithorizont</th></tr></thead><tbody>${R.trends.flatMap(trend => ['team','ai'].map(mode=>{const d=trend[mode];return `<tr><th scope="row">${esc(trend.name)}</th><td>${mode==='team'?'Team':'KI'}</td><td class="number">${d.influence}</td><td class="number">${d.duration}</td><td class="number">${d.proximity}</td><td class="number">${d.pressure}</td><td>${esc(trend.radar?.[mode+'Horizon'] || '')}</td></tr>`;})).join('')}</tbody></table></div><p class="table-note">Die Excel-Grenzen liegen bei Dauer + Nähe ≥ 6 und Einfluss ≥ 3. Alle acht Team-Trends liegen im Handlungsfeld. Ihre unterschiedlichen Positionen bleiben sichtbar; eine Priorisierung allein nach Quadrant würde diese Unterschiede verdecken.</p><p class="table-note">Dauer: 1 = bis etwa ein Jahr, 2 = ein bis drei Jahre, 3 = länger als drei Jahre. Nähe: 1 = erste schwache Signale bis 7 = prägend / Mainstream. Der Trendradar leitet daraus Betrachtungshorizonte ab: Nähe ≥ 6 → 0–1 Jahr, Nähe ≥ 4 → 1–3 Jahre, sonst 3–10 Jahre. Das ist keine Kalenderprognose.</p>`;
    $('#idea-comparison').innerHTML = `<div class="table-scroll"><table><caption>19 trendbasierte Ideen aus dem Blatt „Ideenvergleich“. Die vier Open-Innovation-Ideen wurden im Original separat ergänzt.</caption><thead><tr><th>Suchfeld</th><th>Idee</th><th>Wertangebot</th><th>Nutzen / Bedarf</th><th>Abwägung</th></tr></thead><tbody>${R.ideaComparison.map(idea=>`<tr class="${idea.selected?'highlight-row':''}"><td>${esc(R.trends.find(t=>t.id===idea.trendId)?.name || idea.trendId)}</td><th scope="row">${esc(idea.name)}${idea.selected?'<small class="selected-tag">TREND-FAVORIT</small>':''}</th><td>${linkedCopy(idea.offer)}</td><td>${linkedCopy(idea.value)} ${linkedCopy(idea.need)}</td><td>${linkedCopy(idea.tradeoff)}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function renderSources() {
    if (!$('#research-source-list')) return;
    $('#research-source-list').innerHTML = R.sources.map(source => {
      const origin = source.provenance?.file === 'part2' ? 'Schritt 2' : source.provenance?.file === 'part3' ? 'Schritt 3' : source.checkedAt ? 'Primärquelle · geprüft' : 'Matrixquelle';
      const label = [origin, source.label].filter(Boolean).join(' · ');
      return `<li id="source-${esc(source.id)}"><span class="source-label">${esc(label)}</span><strong>${esc(source.title)}</strong><p>${esc(source.scope || '')}</p>${source.limitations?`<p class="source-limit">${esc(source.limitations)}</p>`:''}${source.verification?`<p class="source-verification">${esc(source.verification)}</p>`:''}${/^https?:\/\//i.test(source.url || '')?`<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.publisher || 'Originalquelle')} <svg class="arrow-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M4 4h8v8"/></svg></a>`:''}</li>`;
    }).join('');
  }

  document.addEventListener('click', event => {
    const modeButton = event.target.closest('[data-trend-mode]');
    if (modeButton) { trendMode = modeButton.dataset.trendMode; renderTrends(); }
    const trendGroup = event.target.closest('[data-trend-group]');
    if (trendGroup) {
      const ids = trendGroup.dataset.trendGroup.split(',');
      selectTrend(ids[(ids.indexOf(String(selectedTrend))+1)%ids.length]);
    }
    const trendButton = event.target.closest('[data-trend]');
    if (trendButton) selectTrend(trendButton.dataset.trend);
  });
  renderAudit();
  renderTrendDetails();
  renderTrends();
  renderSources();
})();
