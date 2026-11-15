/* Scroll-drawn evidence scenes. The film owns timing, motion preferences and layout.
 * Every frame is a pure projection of progress; no timers, listeners or stored state.
 * Full source tables remain in the chapter dossiers. */
(() => {
  'use strict';
  const scenes = window.PitchScenes = window.PitchScenes || {};
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };


  const mix = (a, b, p) => a + (b - a) * p;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = (value, digits = 2) => new Intl.NumberFormat('de-DE', {minimumFractionDigits: digits, maximumFractionDigits: digits}).format(value);
  const opacity = (el, value) => { el.style.opacity = clamp(value).toFixed(4); };
  const draw = (el, value) => { el.style.strokeDashoffset = (1 - clamp(value)).toFixed(4); };
  const at = (el, x, y, scale = 1) => el.setAttribute('transform', `translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${scale.toFixed(4)})`);
  const svg = (name, title, content) => `<svg class="fa-svg fa-${name}" viewBox="0 0 640 520" role="img" aria-labelledby="fa-${name}-title"><title id="fa-${name}-title">${esc(title)}</title>${content}</svg>`;
  const data = () => ({R: window.PitchResearch, E: window.PitchEvidence});
  const pose = (p, context) => context?.reduced ? 1 : clamp(p);

  // 1 · A common mission becomes three connected, reported business segments.
  scenes[1] = {
    markup() {
      const orbits = [-90, 30, 150];
      return svg('mission', 'SpaceX: eine Mission verbindet Space, Connectivity und AI.', `
        <defs><radialGradient id="fa-mission-halo"><stop stop-color="#a9d9d9" stop-opacity=".12"/><stop offset="1" stop-color="#a9d9d9" stop-opacity="0"/></radialGradient></defs>
        <circle cx="320" cy="250" r="195" fill="url(#fa-mission-halo)"/>
        <g class="fa-mission-grid"><path d="M70 250H570M320 32V470"/><circle cx="320" cy="250" r="172"/><circle cx="320" cy="250" r="98"/></g>
        ${orbits.map((angle, index) => `<g transform="rotate(${angle} 320 250)"><ellipse class="fa-orbit fa-trace fa-orbit-${index}" cx="320" cy="250" rx="206" ry="83" pathLength="1"/><ellipse class="fa-orbit-shadow" cx="320" cy="250" rx="206" ry="83"/></g>`).join('')}
        <circle class="fa-mission-core fa-trace" cx="320" cy="250" r="77" pathLength="1"/>
        <text class="fa-mission-name" x="320" y="250" text-anchor="middle">SpaceX</text>
        <text class="fa-kicker" x="320" y="278" text-anchor="middle">EINE MISSION</text>
        ${orbits.map((_, index) => `<g class="fa-mission-satellite" data-satellite="${index}"><circle class="fa-node-halo" r="19"/><circle class="fa-satellite-dot" r="6"/><path class="fa-satellite-cross" d="M-12 0H12M0-12V12"/></g>`).join('')}
        <g class="fa-mission-label" data-mission-label="0"><text class="fa-segment-name" x="352" y="31">Space</text><text class="fa-small" x="352" y="59">ZUGANG ZUM ALL</text></g>
        <g class="fa-mission-label" data-mission-label="1"><text class="fa-segment-name" x="500" y="390" text-anchor="middle">Connectivity</text><text class="fa-small" x="500" y="417" text-anchor="middle">DIE WELT VERBINDEN</text></g>
        <g class="fa-mission-label" data-mission-label="2"><text class="fa-segment-name" x="140" y="390" text-anchor="middle">AI</text><text class="fa-small" x="140" y="417" text-anchor="middle">INTELLIGENZ SKALIEREN</text></g>
        <path class="fa-mission-underbar fa-trace" pathLength="1" d="M160 466H480"/>
        <text class="fa-footnote" x="320" y="497" text-anchor="middle">Drei berichtete Segmente · 2026</text>
      `);
    },
    mount(root) {
      const traces = [...root.querySelectorAll('.fa-orbit')];
      const nodes = [...root.querySelectorAll('[data-satellite]')];
      const labels = [...root.querySelectorAll('[data-mission-label]')];
      const core = root.querySelector('.fa-mission-core');
      const underbar = root.querySelector('.fa-mission-underbar');
      const angles = [-90, 30, 150].map(value => value * Math.PI / 180);
      return {update(progress, context) {
        const p = pose(progress, context);
        draw(core, mix(.25, 1, smooth(0, .35, p)));
        draw(underbar, smooth(.62, .96, p));
        traces.forEach((orbit, index) => {
          const q = smooth(index * .12, .66 + index * .1, p);
          draw(orbit, mix(.04, 1, q));
          const phase = (1 - q) * Math.PI * (1.4 + index * .16);
          const x = 206 * Math.cos(phase), y = 83 * Math.sin(phase);
          const angle = angles[index];
          at(nodes[index], 320 + x * Math.cos(angle) - y * Math.sin(angle), 250 + x * Math.sin(angle) + y * Math.cos(angle));
          opacity(nodes[index], mix(.18, 1, smooth(index * .12, index * .12 + .12, p)));
          opacity(labels[index], smooth(.18 + index * .12, .38 + index * .12, p));
        });
      }};
    }
  };

  // 2 · The source factors precede their scores: method, one worked comparison,
  // the complete audit, then the model's zero rule. No judgement is overwritten.
  const auditOrder = ['raptor-3', 'starship-v3', 'orbital-refuelling', 'starlink'];
  const auditNames = {'raptor-3': 'Raptor 3', 'starship-v3': 'Starship V3', 'orbital-refuelling': 'Orbitale Betankung', starlink: 'Starlink · Vergleich'};
  const auditFactors = [
    {key:'noveltyFor',label:['Neu für wen'],detail:'Bezugsgruppe'},
    {key:'noveltyType',label:['Wie neu'],detail:'Art der Neuheit'},
    {key:'maturity',label:['Reifegrad'],detail:'Entwicklungsstand'},
    {key:'benefits',label:['Nutzen'],detail:'Nutzenpunkte'}
  ];
  const auditIcons = [
    'M-9-28H9L12-10H20L12 0L24 32H-24L-12 0L-20-10H-12ZM-9-28V-38H9V-28M-12 0H12M-18 23H18',
    'M0-39C-14-26-15-17-15-4V32H15V-4C15-17 14-26 0-39ZM-15 18L-28 35H-15M15 18L28 35H15M-15 5H15M-15 28H15',
    'M-29-20C-29-30-7-30-7-20V20C-7 30-29 30-29 20ZM7-20C7-30 29-30 29-20V20C29 30 7 30 7 20ZM-7 0H7M-29-14H-7M7-14H29M-18-29V-37M18-29V-37',
    'M-11-13H11V13H-11ZM-11-7H-37V7H-11M11-7H37V7H11M-28-7V7M28-7V7M0-13V-28M-8-28H8M0 13V28M-7 28H7'
  ];
  const methodLocal = (p, start, end) => clamp((p-start)/(end-start));
  const methodVisible = (p, start, end) => (start===0?1:smooth(start-.008,start+.008,p))*(end===1?1:1-smooth(end-.008,end+.008,p));
  const methodReveal = (items,q,step=.09) => items.forEach((item,index)=>opacity(item,smooth(.04+index*step,.22+index*step,q)));
  const auditEquation = (item, highlight) => `
    <g class="fa-factor-headings">${auditFactors.map((factor,index)=>lines(factor.label,190+index*95,105,'fa-factor-label',21,'middle')).join('')}<text class="fa-factor-label" x="589" y="105" text-anchor="middle">Wert</text></g>
    <g class="fa-factor-attention"><rect class="fa-method-difference method-attention" x="${159+highlight*95}" y="131" width="62" height="182" rx="8"/><text class="fa-factor-difference" x="${190+highlight*95}" y="337" text-anchor="middle">Differenz</text></g>
    ${['team','ai'].map((perspective,row)=>{const y=190+row*99,values=item[perspective];return `<g class="fa-factor-row fa-factor-${perspective}"><text class="fa-factor-perspective" x="40" y="${y}">${row?'KI':'TEAM'}</text>${auditFactors.map((factor,index)=>`<g class="fa-factor-cell"><text class="fa-factor-number" x="${190+index*95}" y="${y}" text-anchor="middle">${values[factor.key]}</text>${index<3?`<text class="fa-factor-operator" x="${237+index*95}" y="${y-3}" text-anchor="middle">×</text>`:''}</g>`).join('')}<g class="fa-factor-result"><text class="fa-factor-operator" x="535" y="${y-3}" text-anchor="middle">=</text><text class="fa-factor-score" x="589" y="${y}" text-anchor="middle">${values.score}</text></g></g>`;}).join('')}`;
  scenes[2] = {
    markup() {
      const {R} = data();
      const audit = auditOrder.map(id => R.audit.find(item => item.id === id));
      const raptor=audit[0],starlink=audit[3];
      const summary=audit.map(item=>`${auditNames[item.id]}: Team ${item.team.score}, KI ${item.ai.score}`).join('. ');
      return svg('audit', `${R.method.audit.formula}. ${summary}. Die Team-Null bei Starlink entsteht durch Reifegrad 0 bei ${starlink.team.benefits} Nutzenpunkten.`, `
        <defs><linearGradient id="fa-audit-copper"><stop stop-color="#efbd91" stop-opacity=".35"/><stop offset="1" stop-color="#efbd91"/></linearGradient><linearGradient id="fa-audit-ice"><stop stop-color="#a9d9d9" stop-opacity=".25"/><stop offset="1" stop-color="#a9d9d9"/></linearGradient></defs>
        <g class="fa-audit-formula-phase">
          <text class="fa-method-kicker" x="320" y="34" text-anchor="middle">DER INNOVATIONSPRÜFSTAND NACH HUBE</text>
          <text class="fa-method-heading" x="320" y="82" text-anchor="middle">Vier Faktoren. Ein Produkt.</text>
          <text class="fa-method-group-label" x="173" y="133" text-anchor="middle">NEUHEIT</text><text class="fa-method-group-label" x="467" y="133" text-anchor="middle">REALISIERUNG</text>
          ${auditFactors.map((factor,index)=>{const x=38+index*147;return `<g class="fa-formula-factor"><rect class="fa-factor-card" x="${x}" y="157" width="123" height="116" rx="7"/>${lines(factor.label,x+61.5,203,'fa-formula-label',23,'middle')}<text class="fa-formula-detail" x="${x+61.5}" y="239" text-anchor="middle">${factor.detail}</text>${index<3?`<text class="fa-formula-times" x="${x+135}" y="221" text-anchor="middle">×</text>`:''}</g>`;}).join('')}
          <path class="fa-method-link fa-trace" pathLength="1" d="M99 285V309H541V285M320 309V341"/>
          <g class="fa-formula-output"><text class="fa-method-heading" x="320" y="384" text-anchor="middle">Hube-Wert in Punkten</text><text class="fa-method-note" x="320" y="430" text-anchor="middle">Ein Faktor 0 setzt das gesamte Produkt auf 0.</text><text class="fa-method-footnote" x="320" y="481" text-anchor="middle">Bewertungen nach Kriterien · keine wirtschaftliche Rangliste</text></g>
        </g>
        <g class="fa-audit-example-phase" opacity="0">
          <text class="fa-method-kicker" x="320" y="32" text-anchor="middle">RAPTOR 3 · EINE RECHNUNG, ZWEI PERSPEKTIVEN</text>
          ${auditEquation(raptor,3)}
          <g class="fa-audit-example-explanation"><text class="fa-method-note-strong" x="40" y="386">${raptor.team.benefits} statt ${raptor.ai.benefits} Nutzenpunkte.</text><text class="fa-method-note" x="40" y="426">Team: Lernen ${raptor.team.benefitBreakdown.learning} · Umwelt ${raptor.team.benefitBreakdown.environment} · Wirtschaft ${raptor.team.benefitBreakdown.economic}</text><text class="fa-method-note" x="40" y="456">KI: nur Lernnutzen als hinreichend belegt bewertet.</text><text class="fa-method-footnote" x="40" y="501">Gleiche Neuheit und Testreife · unterschiedliche Nutzenbewertung</text></g>
        </g>
        <g class="fa-audit-compare-phase" opacity="0">
          <text class="fa-kicker" x="210" y="24">3 PROJEKTE + VERGLEICH</text><text class="fa-small" x="210" y="48">HUBE-PUNKTE</text>
          <g class="fa-audit-legend"><circle class="fa-fill-copper" cx="422" cy="18" r="4"/><text x="436" y="24">Team</text><circle class="fa-fill-ice" cx="521" cy="18" r="4"/><text x="535" y="24">KI</text></g>
          <path class="fa-audit-spine fa-trace" pathLength="1" d="M83 62V424"/>
          ${audit.map((item,index)=>{const y=92+index*96,drivers=auditFactors.filter(f=>item.team[f.key]!==item.ai[f.key]).map(f=>f.label.join(' '));return `<g class="fa-audit-row" data-audit-row="${index}">
            <circle class="fa-audit-disc" cx="83" cy="${y+12}" r="43"/><g transform="translate(83 ${y+12})"><path class="fa-audit-icon fa-trace" pathLength="1" d="${auditIcons[index]}"/></g><path class="fa-audit-connector fa-trace" pathLength="1" d="M128 ${y+12}H172L187 ${y-2}H200"/>
            <text class="fa-audit-name" x="210" y="${y-14}">${auditNames[item.id]}</text>
            <text class="fa-series-label" x="210" y="${y+14}">T</text><path class="fa-track" d="M236 ${y+8}H552"/><rect class="fa-audit-bar fa-audit-team" x="236" y="${y+2}" height="12" width="${item.team.score/72*316}" rx="2"/>${item.team.score===0?`<circle class="fa-audit-zero" cx="236" cy="${y+8}" r="4"/>`:''}<text class="fa-audit-value fa-team-value" x="572" y="${y+16}">${item.team.score}</text>
            <text class="fa-series-label" x="210" y="${y+41}">KI</text><path class="fa-track" d="M236 ${y+35}H552"/><rect class="fa-audit-bar fa-audit-ai" x="236" y="${y+29}" height="12" width="${item.ai.score/72*316}" rx="2"/><text class="fa-audit-value fa-ai-value" x="572" y="${y+43}">${item.ai.score}</text>
            <text class="fa-audit-driver" x="210" y="${y+64}">Differenz: ${esc(drivers.join(' · '))}</text>
          </g>`;}).join('')}
          <text class="fa-method-footnote" x="320" y="492" text-anchor="middle">Zwei Bewertungsperspektiven · kein gemeinsamer Mittelwert</text>
        </g>
        <g class="fa-audit-zero-phase" opacity="0">
          <text class="fa-method-kicker" x="320" y="32" text-anchor="middle">STARLINK · DIE NULL RICHTIG LESEN</text>
          ${auditEquation(starlink,2)}
          <g class="fa-audit-zero-explanation"><text class="fa-method-note-strong" x="40" y="386">Reifegrad 0 → Produkt 0.</text><text class="fa-method-note" x="40" y="426">Team: etablierter Betrieb, zugleich ${starlink.team.benefits} Nutzenpunkte.</text><text class="fa-method-note" x="40" y="456">KI: Reife ${starlink.ai.maturity} und Nutzen ${starlink.ai.benefits} → ${starlink.ai.score} Punkte.</text><text class="fa-method-footnote" x="40" y="501">Die Hube-Einordnung entscheidet. 0 bedeutet hier nicht fehlenden Nutzen.</text></g>
        </g>
      `);
    },
    mount(root) {
      const audit=auditOrder.map(id=>data().R.audit.find(item=>item.id===id));
      const phases=['formula','example','compare','zero'].map(name=>root.querySelector(`.fa-audit-${name}-phase`));
      const boundaries=[0,.23,.51,.76,1];
      const formulaFactors=[...phases[0].querySelectorAll('.fa-formula-factor')],formulaLink=phases[0].querySelector('.fa-method-link'),formulaOutput=phases[0].querySelector('.fa-formula-output');
      const equations=[phases[1],phases[3]].map(phase=>({rows:[...phase.querySelectorAll('.fa-factor-row')].map(row=>({cells:[...row.querySelectorAll('.fa-factor-cell')],result:row.querySelector('.fa-factor-result')})),attention:phase.querySelector('.fa-factor-attention'),explanation:phase.querySelector('[class$="-explanation"]')}));
      const spine=root.querySelector('.fa-audit-spine');
      const rows=[...root.querySelectorAll('[data-audit-row]')].map((row,index)=>({row,icon:row.querySelector('.fa-audit-icon'),connector:row.querySelector('.fa-audit-connector'),team:row.querySelector('.fa-audit-team'),ai:row.querySelector('.fa-audit-ai'),teamValue:row.querySelector('.fa-team-value'),aiValue:row.querySelector('.fa-ai-value'),zero:row.querySelector('.fa-audit-zero'),teamWidth:audit[index].team.score/72*316,aiWidth:audit[index].ai.score/72*316}));
      return {update(progress,context) {
        const p=pose(progress,context);phases.forEach((phase,index)=>opacity(phase,methodVisible(p,boundaries[index],boundaries[index+1])));
        const f=methodLocal(p,0,.23);methodReveal(formulaFactors,f,.11);draw(formulaLink,smooth(.48,.69,f));opacity(formulaOutput,smooth(.62,.8,f));
        equations.forEach((equation,index)=>{const q=index?methodLocal(p,.76,1):methodLocal(p,.23,.51);equation.rows.forEach((row,rowIndex)=>{methodReveal(row.cells,clamp(q-rowIndex*.13),.055);opacity(row.result,smooth(.35+rowIndex*.13,.54+rowIndex*.13,q));});opacity(equation.attention,smooth(.45,.62,q));opacity(equation.explanation,smooth(.61,.78,q));});
        const q=methodLocal(p,.51,.76);draw(spine,smooth(0,.48,q));rows.forEach((item,index)=>{const base=index*.075,team=smooth(base+.03,base+.24,q),ai=smooth(.43+index*.065,.63+index*.065,q);opacity(item.row,mix(.18,1,smooth(base,base+.14,q)));draw(item.icon,mix(.08,1,smooth(base,base+.25,q)));draw(item.connector,smooth(base+.06,base+.25,q));item.team.setAttribute('width',(item.teamWidth*team).toFixed(3));item.ai.setAttribute('width',(item.aiWidth*ai).toFixed(3));opacity(item.teamValue,smooth(.86,1,team));opacity(item.aiValue,smooth(.86,1,ai));if(item.zero)opacity(item.zero,smooth(.25,.9,team));});
      }};
    }
  };

  // 3 · The eight source trends travel through the portfolio, the four levels
  // of the Stufenmodell and the twelve-idea matrix. The source workbook gives
  // illustrative model examples, not eight complete derivations. The eight
  // compact mappings below are therefore labelled as editorial derivations.
  const trendLabels = [
    ['Neo-Ökologie'], ['Individualismus'], ['KI'], ['Daten als', 'Ressource'],
    ['Fachkräftemangel'], ['Digital Nomads'], ['Über-', 'regulierung'], ['Innovationsdruck']
  ];
  const modelMappings = [
    [['Neo-Ökologie'], ['Emissionen', 'messen'], ['Umwelt-', 'messdienste'], ['Starlink', 'Climate Watch']],
    [['Individualismus'], ['Persönliche', 'Missionen'], ['Kleine', 'Nutzlasten'], ['SpaceX', 'My Mission']],
    [['KI'], ['Sensordaten', 'auswerten'], ['Vernetzte', 'KI-Dienste'], ['Starlink', 'Edge AI']],
    [['Daten als', 'Ressource'], ['Signaldaten', 'nutzen'], ['Umwelt- und', 'Wetterwissen'], ['Starlink', 'Insights']],
    [['Fachkräfte-', 'mangel'], ['Qualifizierung', 'ausbauen'], ['Raumfahrt-', 'weiterbildung'], ['SpaceX', 'Academy']],
    [['Digital', 'Nomads'], ['Verlässlich', 'online arbeiten'], ['Vernetzte', 'Arbeitsorte'], ['Starlink', 'Remote Hubs']],
    [['Über-', 'regulierung'], ['Anträge und', 'Fristen steuern'], ['Digitale', 'Genehmigungs-', 'hilfe'], ['Compliance', 'Navigator']],
    [['Innovations-', 'druck'], ['Entwicklungs-', 'zeit verkürzen'], ['Digitale', 'Nutzlastprüfung'], ['Launch', 'Engineering', 'Cloud']]
  ];
  const matrixShortNames = ['Climate Watch', 'My Mission', 'Edge AI', 'Starlink Insights', 'Academy', 'Remote Hubs', 'Compliance Navigator', 'Engineering Cloud', 'RocketLight Dinner', 'Luxury Club', 'Dyson Sphere', 'Satellitenschubser'];
  const lines = (copy, x, y, className, lineHeight = 22, anchor = 'start') => `<text class="${className}" x="${x}" y="${y}" text-anchor="${anchor}">${copy.map((line,index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
  function trendGeometry() {
    return data().R.trends.map((trend,index) => ({
      trend,index,x:86+(trend.team.pressure-1)/9*484,y:330-(trend.team.influence-1)*60,
      sx:320+Math.cos(index/8*Math.PI*2-Math.PI/2)*182,
      sy:245+Math.sin(index/8*Math.PI*2-Math.PI/2)*144
    }));
  }
  function pointGroups(points) {
    const groups = new Map();
    points.forEach(point => {const key=`${point.x},${point.y}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(point);});
    return [...groups.values()];
  }
  function matrixGeometry() {
    return data().R.matrix.map(idea => ({idea,id:idea.id,x:50+(idea.team.feasibility-1)*86.5,y:390-(idea.team.originality-1)*72.5}));
  }
  const finalistPositions = {9:{x:168,y:204},4:{x:168,y:324},8:{x:168,y:444}};
  function stufenMarkup(part) {
    const first=part*4;
    return `<g class="fa-stufen-phase" data-stufen-phase="${part}">
      <text class="fa-kicker" x="12" y="24">STUFENMODELL · TRENDS ${part ? '05–08' : '01–04'}</text>
      ${[['Trend'],['Herausforderung'],['Zukunftsmarkt'],['Geschäftsidee']].map((label,index)=>lines(label,12+index*158,65,'fa-stufen-heading',18)).join('')}
      ${modelMappings.slice(first,first+4).map((mapping,row)=>`<g class="fa-stufen-row" data-stufen-row="${first+row}">
        <text class="fa-stufen-number" x="12" y="${98+row*96}">${String(first+row+1).padStart(2,'0')}</text>
        ${mapping.map((copy,column)=>lines(copy,12+column*158,125+row*96,column===3?'fa-stufen-idea':'fa-stufen-copy',22)).join('')}
        ${[0,1,2].map(column=>`<path class="fa-stufen-link fa-trace" pathLength="1" d="M${145+column*158} ${135+row*96}h16m-4-4 4 4-4 4"/>`).join('')}
        <path class="fa-track" d="M12 ${180+row*96}H626"/>
      </g>`).join('')}
      <text class="fa-stufen-note" x="12" y="490">Redaktionelle Ableitung aus den acht gewählten Trendideen.</text>
      <text class="fa-stufen-note" x="12" y="512">Modell: Trend → Herausforderung → Zukunftsmarkt → Geschäftschance.</text>
    </g>`;
  }
  scenes[3] = {
    markup() {
      const points=trendGeometry(),groups=pointGroups(points).filter(group=>group.length>1),matrix=matrixGeometry(),matrixGroups=pointGroups(matrix);
      const radarLabels=[{x:320,y:51,a:'middle'},{x:456,y:110,a:'middle'},{x:552,y:248,a:'middle'},{x:480,y:379,a:'middle'},{x:320,y:433,a:'middle'},{x:158,y:389,a:'middle'},{x:58,y:226,a:'middle'},{x:177,y:110,a:'middle'}];
      return svg('selection','Acht benannte Trends im 360-Grad-Suchfeld und im exakten Team-Trendportfolio. Redaktionelle Stufenmodell-Ableitung für alle acht gewählten Geschäftsideen. Zwölf Ideen mit ihren Originalkoordinaten in der Team-Now-How-Wow-Matrix. Drei vertiefte Business Cases: RocketLight Dinner, Starlink Insights und Launch Engineering Cloud.',`
        <g class="fa-trend-phase">
          <g class="fa-radar-labels"><text class="fa-kicker" x="320" y="488" text-anchor="middle">BIOSPHÄRE · GESELLSCHAFT · TECHNIK · MÄRKTE</text>${radarLabels.map((label,index)=>lines(trendLabels[index],label.x,label.y,'fa-radar-label',23,label.a)).join('')}</g>
          <g class="fa-signal-web">${points.map(point=>`<path d="M320 245L${point.sx} ${point.sy}"/>`).join('')}<circle cx="320" cy="245" r="62"/><text class="fa-signal-count" x="320" y="246" text-anchor="middle">360°</text><text class="fa-small" x="320" y="273" text-anchor="middle">ACHT TRENDS</text></g>
          <g class="fa-trend-grid">
            <path class="fa-grid-border fa-trace" pathLength="1" d="M86 90V330H570V90Z"/>
            ${[1,2,3,4].map(index=>`<path class="fa-grid-line" d="M86 ${330-index*60}H570"/>`).join('')}
            ${[1,3,5,7,9].map(index=>`<path class="fa-grid-line" d="M${86+index/9*484} 90V330"/>`).join('')}
            <rect class="fa-trend-act" x="328" y="90" width="242" height="150"/><path class="fa-threshold" d="M328 90V330M86 240H570"/>
            <text class="fa-axis-label" x="86" y="36">EINFLUSS · 1–5</text><text class="fa-plot-callout" x="500" y="226" text-anchor="middle">HANDELN</text>
            <text class="fa-axis-label" x="570" y="380" text-anchor="end">HANDLUNGSDRUCK · DAUER + NÄHE</text>
            ${[1,2,3,4,5].map(value=>`<text class="fa-tick" x="65" y="${336-(value-1)*60}" text-anchor="end">${value}</text>`).join('')}
            ${[1,3,5,7,9,10].map(value=>`<text class="fa-tick" x="${86+(value-1)/9*484}" y="358" text-anchor="middle">${value}</text>`).join('')}
          </g>
          ${points.map(point=>`<g data-trend-signal="${point.index}" transform="translate(${point.sx} ${point.sy})"><circle class="fa-node-halo" r="23"/><circle class="fa-trend-dot" r="17"/><text class="fa-dot-label" y="6" text-anchor="middle">${point.index+1}</text></g>`).join('')}
          ${groups.map((group,index)=>`<g class="fa-trend-cluster" data-trend-cluster="${index}" transform="translate(${group[0].x} ${group[0].y})"><circle class="fa-node-halo" r="28"/><circle class="fa-trend-dot" r="24"/><text class="fa-cluster-ids" y="5" text-anchor="middle">${group.map(point=>point.index+1).join('·')}</text></g>`).join('')}
          <g class="fa-trend-key">${points.map((point,index)=>`<text class="fa-trend-name" x="${86+Math.floor(index/4)*265}" y="${410+(index%4)*25}"><tspan class="fa-copper-text">${String(index+1).padStart(2,'0')}</tspan> ${esc(point.trend.name)}</text>`).join('')}<text class="fa-stufen-note" x="86" y="515">Team-Sicht · gemeinsame Punkte tragen mehrere Nummern.</text></g>
        </g>
        ${stufenMarkup(0)}${stufenMarkup(1)}
        <g class="fa-matrix-phase">
          <text class="fa-kicker" x="50" y="28">NOW / HOW / WOW · TEAM</text><text class="fa-axis-label" x="50" y="63">ORIGINALITÄT · 1–5</text>
          <rect class="fa-matrix-wow" x="266.25" y="100" width="129.75" height="108.75"/>
          <path class="fa-grid-border fa-trace fa-matrix-border" pathLength="1" d="M50 100V390H396V100Z"/>
          ${[1,2,3].map(index=>`<path class="fa-grid-line" d="M${50+index*86.5} 100V390M50 ${390-index*72.5}H396"/>`).join('')}
          <path class="fa-threshold" d="M266.25 100V390M50 208.75H396"/>
          <text class="fa-matrix-quadrant" x="122" y="126">HOW</text><text class="fa-matrix-quadrant fa-copper-text" x="301" y="126">WOW</text><text class="fa-matrix-quadrant" x="90" y="366">VERWERFEN</text><text class="fa-matrix-quadrant" x="312" y="366">NOW</text>
          ${[1,2,3,4,5].map(value=>`<text class="fa-matrix-tick" x="${50+(value-1)*86.5}" y="419" text-anchor="middle">${value}</text><text class="fa-matrix-tick" x="33" y="${396-(value-1)*72.5}" text-anchor="end">${value}</text>`).join('')}
          <text class="fa-axis-label" x="396" y="449" text-anchor="end">MACHBARKEIT · 1–5</text>
          ${matrixGroups.map((group,index)=>`<g class="fa-matrix-point ${group.some(point=>point.id===9)?'is-pitch':''}" data-matrix-cluster="${index}" transform="translate(${group[0].x} ${group[0].y})"><circle r="${group.length>1?25:17}"/><text y="5" text-anchor="middle">${group.map(point=>point.id).join('·')}</text></g>`).join('')}
          <g class="fa-matrix-key"><text class="fa-stufen-heading" x="434" y="68">DIE 12 IDEEN</text>${matrix.map((point,index)=>`<text class="fa-matrix-idea ${[9,4,8].includes(point.id)?'is-finalist':''}" x="434" y="${104+index*29}"><tspan class="fa-copper-text">${String(point.id).padStart(2,'0')}</tspan> ${esc(matrixShortNames[index])}</text>`).join('')}</g>
          <text class="fa-stufen-note" x="50" y="490">Hoch ab 4 · Positionen aus der Originalbewertung.</text><text class="fa-stufen-note" x="50" y="513">08 ist beim Team NOW, bei der KI WOW. Details bleiben vergleichbar.</text>
        </g>
        <g class="fa-selection-phase">
          <text class="fa-kicker" x="320" y="31" text-anchor="middle">8 TREND-FAVORITEN + 4 OPEN INNOVATION</text>
          <g class="fa-selection-middle"><circle class="fa-candidate-orbit fa-trace" cx="320" cy="260" r="128" pathLength="1"/><text class="fa-number-large" x="320" y="263" text-anchor="middle">12</text><text class="fa-kicker" x="320" y="291" text-anchor="middle">KANDIDATEN</text></g>
          <g class="fa-selection-final"><text class="fa-number-large" x="74" y="112">3</text><text class="fa-kicker" x="137" y="107">VERTIEFTE BUSINESS CASES</text><path class="fa-selection-tree fa-trace" pathLength="1" d="M87 204V444M87 204H144M87 324H144M87 444H144"/>
            <g data-finalist-copy="9"><text class="fa-finalist-name fa-copper-text" x="214" y="201">RocketLight Dinner</text><text class="fa-footnote" x="214" y="231">Erlebnis · Open Innovation</text></g>
            <g data-finalist-copy="4"><text class="fa-finalist-name" x="214" y="321">Starlink Insights</text><text class="fa-footnote" x="214" y="351">Signaldaten als Wetterwissen</text></g>
            <g data-finalist-copy="8"><text class="fa-finalist-name" x="214" y="428">Launch Engineering</text><text class="fa-finalist-name" x="214" y="457">Cloud</text></g>
          </g>
          ${matrix.map((point,index)=>`<g class="fa-candidate ${point.id>=9?'is-extra':''} ${point.id===9?'is-pitch':''}" data-candidate="${index}"><circle class="fa-candidate-halo" r="27"/><circle class="fa-candidate-dot" r="9"/><text class="fa-candidate-id" y="6" text-anchor="middle">${String(point.id).padStart(2,'0')}</text></g>`).join('')}
          <text class="fa-stufen-note" x="320" y="510" text-anchor="middle">Begründete Teamwahl · kein automatisches Matrix-Ranking.</text>
        </g>
      `);
    },
    mount(root) {
      const points=trendGeometry(),groups=pointGroups(points).filter(group=>group.length>1),clustered=new Set(groups.flatMap(group=>group.map(point=>point.index)));
      const trendPhase=root.querySelector('.fa-trend-phase'),grid=root.querySelector('.fa-trend-grid'),border=root.querySelector('.fa-grid-border'),web=root.querySelector('.fa-signal-web'),radar=root.querySelector('.fa-radar-labels'),key=root.querySelector('.fa-trend-key');
      const nodes=[...root.querySelectorAll('[data-trend-signal]')],clusters=[...root.querySelectorAll('[data-trend-cluster]')];
      const models=[...root.querySelectorAll('[data-stufen-phase]')].map((group,index)=>({group,start:.32+index*.16,end:.48+index*.16,rows:[...group.querySelectorAll('.fa-stufen-row')].map(row=>({row,links:[...row.querySelectorAll('.fa-stufen-link')]}))}));
      const matrix=root.querySelector('.fa-matrix-phase'),matrixBorder=root.querySelector('.fa-matrix-border'),matrixPoints=[...root.querySelectorAll('[data-matrix-cluster]')],matrixKey=root.querySelector('.fa-matrix-key');
      const selection=root.querySelector('.fa-selection-phase'),middle=root.querySelector('.fa-selection-middle'),final=root.querySelector('.fa-selection-final'),tree=root.querySelector('.fa-selection-tree'),orbit=root.querySelector('.fa-candidate-orbit');
      const candidates=[...root.querySelectorAll('[data-candidate]')].map((node,index)=>({node,id:index+1,dot:node.querySelector('.fa-candidate-dot'),halo:node.querySelector('.fa-candidate-halo'),label:node.querySelector('.fa-candidate-id')}));
      return {update(progress,context) {
        const p=pose(progress,context),portfolio=smooth(.15,.25,p);
        opacity(trendPhase,1-smooth(.30,.33,p));opacity(grid,portfolio);draw(border,portfolio);opacity(web,1-portfolio);opacity(radar,1-portfolio);opacity(key,smooth(.22,.27,p));
        points.forEach((point,index)=>{at(nodes[index],mix(point.sx,point.x,portfolio),mix(point.sy,point.y,portfolio));opacity(nodes[index],clustered.has(index)?1-smooth(.24,.27,p):1);});
        clusters.forEach(cluster=>opacity(cluster,smooth(.24,.27,p)));
        models.forEach(model=>{opacity(model.group,smooth(model.start-.01,model.start+.015,p)*(1-smooth(model.end-.01,model.end+.015,p)));model.rows.forEach((row,index)=>{const q=smooth(model.start+.005+index*.013,model.start+.05+index*.013,p);opacity(row.row,mix(.2,1,q));at(row.row,0,(1-q)*12);row.links.forEach((link,i)=>draw(link,smooth(model.start+.015+index*.013+i*.006,model.start+.05+index*.013+i*.006,p)));});});
        opacity(matrix,smooth(.63,.66,p)*(1-smooth(.83,.86,p)));draw(matrixBorder,smooth(.64,.70,p));opacity(matrixKey,smooth(.65,.70,p));matrixPoints.forEach((point,index)=>opacity(point,smooth(.66+index*.004,.71+index*.004,p)));
        opacity(selection,smooth(.84,.87,p));opacity(middle,1-smooth(.88,.92,p));draw(orbit,smooth(.84,.9,p));opacity(final,smooth(.90,.94,p));draw(tree,smooth(.91,.99,p));
        candidates.forEach(item=>{const angle=(item.id-1)/12*Math.PI*2-Math.PI/2,q=smooth(.88,.97,p),destination=finalistPositions[item.id];const x=320+Math.cos(angle)*128,y=260+Math.sin(angle)*128;at(item.node,destination?mix(x,destination.x,q):x+Math.cos(angle)*q*70,destination?mix(y,destination.y,q):y+Math.sin(angle)*q*70);opacity(item.node,destination?1:1-smooth(.9,.96,p));item.dot.setAttribute('r',mix(9,destination?22:9,q).toFixed(3));opacity(item.label,destination?smooth(.92,.97,p):0);opacity(item.halo,destination?smooth(.92,.98,p):0);});
      }};
    }
  };

  // 4 · Original criteria and project weights build the RocketLight comparison.
  // Complete quotients precede all six portfolio points and the A annual model.
  const caseNames={9:'RocketLight Dinner',4:'Starlink Insights',8:'Launch Engineering Cloud'};
  const caseData=()=>[9,4,8].map(id=>({id,name:caseNames[id],items:data().E.assessments.filter(item=>item.assessment.idea===id)}));
  const casePoint=result=>({x:50+result.IA/5*350,y:408-result.IN/5*330});
  const revenuePlot=()=>{
    const series=data().E.financialA.revenue.map(value=>value/1e6),max=Math.max(1,...series),baseY=428;
    const points=series.map((value,index)=>({x:94+index*111,y:baseY-value/max*258,value}));
    const lengths=points.slice(1).map((point,index)=>Math.hypot(point.x-points[index].x,point.y-points[index].y));
    return {max,baseY,points,lengths,totalLength:lengths.reduce((sum,value)=>sum+value,0),line:points.map((point,index)=>`${index?'L':'M'}${point.x} ${point.y}`).join(' ')};
  };
  // Grow the actual geometry instead of combining a normalized SVG dash with
  // non-scaling-stroke. The visible path and its head always share one endpoint.
  const revenueFrame=(plot,progress)=>{
    const q=clamp(progress),visible=[plot.points[0]];
    let remaining=q*plot.totalLength;
    if(q>0)for(let i=0;i<plot.lengths.length;i++){
      const a=plot.points[i],b=plot.points[i+1],length=plot.lengths[i];
      if(q===1||remaining>=length){visible.push(b);remaining-=length;}
      else{const local=length?remaining/length:0;visible.push({x:mix(a.x,b.x,local),y:mix(a.y,b.y,local)});break;}
    }
    const head=visible[visible.length-1];
    return {x:head.x,y:head.y,d:visible.map((point,index)=>`${index?'L':'M'}${point.x.toFixed(3)} ${point.y.toFixed(3)}`).join(' ')};
  };
  const benefitShort={wirt:'Wirtschaft',kunde:'Kundennutzen',komp:'Kompetenzen',trend:'Zukunftsmarkt',nachh:'Nachhaltigkeit',bauchN:'Gesamteindruck'};
  const effortShort={fue:'F&E',kundeA:'Kunden überzeugen',tech:'Umsetzbarkeit',markt:'Markt / Wettbewerb',intern:'Interner Aufwand',bauchA:'Gesamteindruck'};
  scenes[4] = {
    markup() {
      const {E}=data(),cases=caseData(),team=E.rocketlightAssessments.find(item=>item.assessment.id==='rld-team'),ai=E.rocketlightAssessments.find(item=>item.assessment.id==='rld-ki'),{points,line,max,baseY}=revenuePlot();
      const technical=E.criteria.effort.findIndex(item=>item.k==='tech'),effortDelta=ai.result.IA-team.result.IA,technicalDelta=ai.result.wa[technical]-team.result.wa[technical];
      const scores=cases.map(item=>`${item.name}: Team IR ${num(item.items[0].result.IR)}, KI IR ${num(item.items[1].result.IR)}`).join('. ');
      return svg('finance',`Gewichtete Kriterien ergeben Nutzen IN und Aufwand IA; IR ist IN geteilt durch IA. RocketLight: gleiche Nutzensumme ${num(team.result.IN)}, Aufwand Team ${num(team.result.IA)} und KI ${num(ai.result.IA)}. ${scores}. Bewertungsscores, keine finanzielle Rendite. Variante A: ${num(E.financialA.R/1e6)} Millionen US-Dollar geplanter Umsatz 2027 bis 2031.`,`
        <defs><linearGradient id="fa-revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#efbd91" stop-opacity=".22"/><stop offset="1" stop-color="#efbd91" stop-opacity=".015"/></linearGradient><clipPath id="fa-revenue-reveal"><rect class="fa-revenue-clip" x="70" y="145" width="0" height="290"/></clipPath></defs>
        <g class="fa-finance-method-phase">
          <text class="fa-method-kicker" x="320" y="30" text-anchor="middle">BEWERTEN → GEWICHTEN → SUMMIEREN</text>
          <text class="fa-method-heading" x="320" y="77" text-anchor="middle">Nicht jedes Kriterium wiegt gleich.</text>
          <text class="fa-weight-heading" x="40" y="116">NUTZEN</text><text class="fa-weight-heading" x="340" y="116">AUFWAND / RISIKO</text>
          ${[{criteria:E.criteria.benefit,weights:E.weights.n,labels:benefitShort,x:40},{criteria:E.criteria.effort,weights:E.weights.a,labels:effortShort,x:340}].map((group,column)=>group.criteria.map((criterion,index)=>`<g class="fa-weight-row" data-weight-group="${column}" data-weight-index="${index}"><text class="fa-weight-name" x="${group.x}" y="${151+index*32}">${esc(group.labels[criterion.k])}</text><text class="fa-weight-value" x="${group.x+254}" y="${151+index*32}" text-anchor="end">${group.weights[index]} %</text></g>`).join('')).join('')}
          <path class="fa-method-rule" d="M40 333H600"/>
          <g class="fa-weight-example"><text class="fa-method-note" x="320" y="367" text-anchor="middle">Bewertung 0–5 × Gewicht = gewichteter Beitrag</text><text class="fa-weight-example-value" x="320" y="408" text-anchor="middle">Umsetzbarkeit: ${team.result.x[technical]} × ${E.weights.a[technical]} % = ${num(team.result.wa[technical])}</text><text class="fa-method-footnote" x="320" y="435" text-anchor="middle">Beispiel: RocketLight · Team</text></g>
          <g class="fa-weight-sums"><text class="fa-method-note" x="40" y="478">IN = Summe der Nutzenbeiträge</text><text class="fa-method-note" x="340" y="478">IA = Summe der Aufwandsbeiträge</text><text class="fa-method-footnote" x="320" y="509" text-anchor="middle">Gewichte der Projektgruppe · je 100 % · gleiche Gewichte für Team und KI</text></g>
        </g>
        <g class="fa-effort-phase" opacity="0">
          <text class="fa-method-kicker" x="320" y="30" text-anchor="middle">ROCKETLIGHT · DER AUFWAND IM VERGLEICH</text>
          <text class="fa-method-note" x="320" y="68" text-anchor="middle">Bewertung → gewichteter Beitrag</text>
          <text class="fa-effort-table-head" x="40" y="104">Kriterium</text><text class="fa-effort-table-head" x="278" y="104" text-anchor="middle">Gewicht</text><text class="fa-effort-table-head fa-copper-text" x="382" y="104" text-anchor="middle">TEAM</text><text class="fa-effort-table-head fa-ice-text" x="487" y="104" text-anchor="middle">KI</text><text class="fa-effort-table-head" x="591" y="104" text-anchor="middle">Differenz</text>
          ${E.criteria.effort.map((criterion,index)=>{const y=143+index*43,difference=ai.result.wa[index]-team.result.wa[index];return `<g class="fa-effort-criterion" data-effort-criterion="${criterion.k}">${index===technical?`<rect class="fa-method-difference method-attention" x="29" y="${y-27}" width="589" height="41" rx="5"/>`:''}<text class="fa-effort-criterion-name" x="40" y="${y}">${esc(effortShort[criterion.k])}</text><text class="fa-effort-weight" x="278" y="${y}" text-anchor="middle">${E.weights.a[index]} %</text><text class="fa-effort-contribution fa-copper-text" x="382" y="${y}" text-anchor="middle">${team.result.x[index]} → ${num(team.result.wa[index])}</text><text class="fa-effort-contribution fa-ice-text" x="487" y="${y}" text-anchor="middle">${ai.result.x[index]} → ${num(ai.result.wa[index])}</text><text class="fa-effort-delta" x="591" y="${y}" text-anchor="middle">${Math.abs(difference)<.0001?'—':`${difference>0?'+':''}${num(difference)}`}</text></g>`;}).join('')}
          <g class="fa-effort-total"><path class="fa-method-rule" d="M40 384H612"/><text class="fa-effort-total-label" x="40" y="419">Aufwand IA</text><text class="fa-effort-total-value fa-copper-text" x="382" y="419" text-anchor="middle">${num(team.result.IA)}</text><text class="fa-effort-total-value fa-ice-text" x="487" y="419" text-anchor="middle">${num(ai.result.IA)}</text><text class="fa-effort-total-value" x="591" y="419" text-anchor="middle">+${num(effortDelta)}</text></g>
          <g class="fa-effort-explanation"><text class="fa-method-note-strong" x="40" y="465">Umsetzbarkeit: +${num(technicalDelta)} von +${num(effortDelta)} Differenz.</text><text class="fa-method-footnote" x="40" y="501">Die KI nennt Sicherheits- und Genehmigungsrisiken als Gründe.</text></g>
        </g>
        <g class="fa-score-phase" opacity="0">
          <text class="fa-method-kicker" x="320" y="30" text-anchor="middle">IR = GEWICHTETER NUTZEN ÷ GEWICHTETER AUFWAND</text>
          <text class="fa-method-note" x="320" y="64" text-anchor="middle">Gleiche Nutzensumme · unterschiedliche Einzelurteile</text>
          ${[team,ai].map((item,index)=>{const x=160+index*320,color=index?'fa-ice-text':'fa-copper-text';return `<g class="fa-score-equation"><text class="fa-score-label ${color}" x="${x}" y="107" text-anchor="middle">${index?'KI':'TEAM'}</text><g class="fa-score-numerator"><text class="fa-score-factor" x="${x}" y="170" text-anchor="middle">${num(item.result.IN)}</text></g><path class="fa-score-fraction fa-trace" pathLength="1" d="M${x-83} 195H${x+83}"/><g class="fa-score-denominator"><text class="fa-score-factor ${color}" x="${x}" y="250" text-anchor="middle">${num(item.result.IA)}</text></g><g class="fa-score-result"><text class="fa-score-equals" x="${x}" y="294" text-anchor="middle">=</text><text class="fa-ir ${color}" x="${x}" y="376" text-anchor="middle">${num(item.result.IR)}</text></g><g class="fa-score-interpretation">${lines(item.result.pf[0].split(',').map(part=>part.trim()),x,435,'fa-score-interpretation-copy',28,'middle')}</g></g>`;}).join('')}
          <text class="fa-method-footnote" x="320" y="508" text-anchor="middle">Bewertungsscore · keine finanzielle Rendite oder Marktvalidierung</text>
        </g>
        <g class="fa-cases-phase" opacity="0">
          <text class="fa-kicker" x="50" y="28">NUTZEN / AUFWAND · DREI IDEEN</text>
          <text class="fa-axis-label" x="50" y="60">NUTZEN · 0–5</text><path class="fa-grid-border fa-cases-border fa-trace" pathLength="1" d="M50 78V408H400V78Z"/>
          ${[1,2,3,4].map(value=>`<path class="fa-grid-line" d="M${50+value*70} 78V408M50 ${408-value*66}H400"/>`).join('')}
          <path class="fa-threshold" d="M190 78V408M260 78V408M50 276H400M50 210H400"/>
          ${[0,1,2,3,4,5].map(value=>`<text class="fa-case-tick" x="${50+value*70}" y="434" text-anchor="middle">${value}</text><text class="fa-case-tick" x="34" y="${414-value*66}" text-anchor="end">${value}</text>`).join('')}
          <text class="fa-axis-label" x="400" y="461" text-anchor="end">AUFWAND · 0–5</text>
          <text class="fa-case-column" x="466" y="71" text-anchor="middle">TEAM</text><text class="fa-case-column fa-ice-text" x="567" y="71" text-anchor="middle">KI</text>
          ${cases.map((item,index)=>{const a=casePoint(item.items[0].result),b=casePoint(item.items[1].result),y=123+index*116,labelX=a.x+(index===1?-12:index===2?3:-6),labelY=a.y+(index===1?-16:index===2?25:27);return `<g class="fa-business-case fa-business-case-${index}" data-business-case="${index}">
            <path class="fa-case-journey fa-trace" pathLength="1" d="M${a.x} ${a.y}L${b.x} ${b.y}"/>
            <circle class="fa-case-team" cx="${a.x}" cy="${a.y}" r="6"/><circle class="fa-case-ai" cx="${b.x}" cy="${b.y}" r="6"/>
            <text class="fa-case-id" x="${labelX}" y="${labelY}" text-anchor="middle">${String(item.id).padStart(2,'0')}</text>
            ${lines(index===2?['08 Launch Engineering','Cloud']:[`${String(item.id).padStart(2,'0')} ${item.name}`],428,y,'fa-case-name',22)}
            <text class="fa-case-score fa-copper-text" x="466" y="${y+60}" text-anchor="middle">${num(item.items[0].result.IR)}</text><text class="fa-case-score fa-ice-text" x="567" y="${y+60}" text-anchor="middle">${num(item.items[1].result.IR)}</text>
            <path class="fa-track" d="M428 ${y+78}H620"/>
          </g>`;}).join('')}
          <circle class="fa-case-team fa-case-legend-team" cx="63" cy="487" r="5"/><text class="fa-stufen-note" x="76" y="492">Team</text><circle class="fa-case-ai fa-case-legend-ai" cx="149" cy="487" r="5"/><text class="fa-stufen-note" x="162" y="492">KI</text><text class="fa-stufen-note" x="626" y="492" text-anchor="end">IR = Nutzen ÷ Aufwand</text><text class="fa-stufen-note" x="50" y="516">Bewertungsscores · keine finanzielle Rendite oder automatische Rangfolge.</text>
        </g>
        <g class="fa-revenue-phase" opacity="0">
          <text class="fa-revenue-total" x="65" y="80">${num(E.financialA.R/1e6)}</text><text class="fa-revenue-unit" x="312" y="58">Mio. USD</text><text class="fa-footnote" x="312" y="84">Umsatz in fünf Jahren</text><text class="fa-kicker" x="65" y="120">VARIANTE A · PLÄTZE × PREIS → JAHRESUMSATZ</text>
          ${[0,10,20].map(value=>`<path class="fa-grid-line" d="M70 ${baseY-value/max*258}H580"/><text class="fa-tick" x="55" y="${baseY-value/max*258+6}" text-anchor="end">${value}</text>`).join('')}
          <text class="fa-axis-label" x="65" y="157">MIO. USD / JAHR</text><g clip-path="url(#fa-revenue-reveal)"><path class="fa-revenue-area" d="${line}L538 ${baseY}H94Z"/></g><path class="fa-revenue-line" d="M${points[0].x} ${points[0].y}" opacity="0"/>
          ${points.map((point,index)=>`<g class="fa-revenue-year" data-revenue-year="${index}"><rect class="fa-revenue-bar" x="${point.x-17}" y="${point.y}" width="34" height="${baseY-point.y}" rx="2"/><circle class="fa-revenue-point" cx="${point.x}" cy="${point.y}" r="5"/><text class="fa-revenue-value" x="${point.x}" y="${point.y-17}" text-anchor="middle">${num(point.value,point.value===0?0:2)}</text><text class="fa-year-label" x="${point.x}" y="457" text-anchor="middle">${2027+index}</text><text class="fa-revenue-input" x="${point.x}" y="483" text-anchor="middle">${num(E.financialAssessmentA.fy.qty[index],0)} × ${num(E.financialAssessmentA.fy.price[index],0)}</text></g>`).join('')}
          <circle class="fa-revenue-head-glow" r="15"/><circle class="fa-revenue-head" r="5"/><text class="fa-footnote" x="320" y="505" text-anchor="middle">Plätze × USD je Platz · Umsatz ist kein Gewinn</text>
        </g>
      `);
    },
    mount(root) {
      const {E}=data();
      const boundaries=[0,.18,.38,.57,.76,1];
      const phases=['.fa-finance-method-phase','.fa-effort-phase','.fa-score-phase','.fa-cases-phase','.fa-revenue-phase'].map(selector=>root.querySelector(selector));
      const weights=[...root.querySelectorAll('.fa-weight-row')],weightExample=root.querySelector('.fa-weight-example'),weightSums=root.querySelector('.fa-weight-sums');
      const effortRows=[...root.querySelectorAll('.fa-effort-criterion')],effortTotal=root.querySelector('.fa-effort-total'),effortExplanation=root.querySelector('.fa-effort-explanation');
      const equations=[...root.querySelectorAll('.fa-score-equation')].map(equation=>({numerator:equation.querySelector('.fa-score-numerator'),fraction:equation.querySelector('.fa-score-fraction'),denominator:equation.querySelector('.fa-score-denominator'),result:equation.querySelector('.fa-score-result'),interpretation:equation.querySelector('.fa-score-interpretation')}));
      const caseBorder=root.querySelector('.fa-cases-border'),caseRows=[...root.querySelectorAll('[data-business-case]')].map(row=>({row,path:row.querySelector('.fa-case-journey'),ai:row.querySelector('.fa-case-ai')}));
      const plot=revenuePlot(),points=plot.points,line=root.querySelector('.fa-revenue-line'),clip=root.querySelector('.fa-revenue-clip'),head=root.querySelector('.fa-revenue-head'),glow=root.querySelector('.fa-revenue-head-glow');
      const bars=[...root.querySelectorAll('[data-revenue-year]')].map((el,index)=>({bar:el.querySelector('.fa-revenue-bar'),point:el.querySelector('.fa-revenue-point'),value:el.querySelector('.fa-revenue-value'),input:el.querySelector('.fa-revenue-input'),height:428-points[index].y}));
      return {update(progress,context) {
        const p=pose(progress,context);phases.forEach((phase,index)=>opacity(phase,methodVisible(p,boundaries[index],boundaries[index+1])));
        const method=methodLocal(p,0,.18);weights.forEach(row=>opacity(row,smooth(.02+Number(row.dataset.weightIndex)*.065,.17+Number(row.dataset.weightIndex)*.065,method)));opacity(weightExample,smooth(.45,.64,method));opacity(weightSums,smooth(.66,.8,method));
        const effort=methodLocal(p,.18,.38);methodReveal(effortRows,effort,.065);opacity(effortTotal,smooth(.57,.73,effort));opacity(effortExplanation,smooth(.73,.85,effort));
        const score=methodLocal(p,.38,.57);equations.forEach(equation=>{opacity(equation.numerator,smooth(.04,.18,score));draw(equation.fraction,smooth(.15,.30,score));opacity(equation.denominator,smooth(.25,.42,score));opacity(equation.result,smooth(.43,.61,score));opacity(equation.interpretation,smooth(.64,.81,score));});
        const comparison=methodLocal(p,.57,.76);draw(caseBorder,smooth(0,.32,comparison));caseRows.forEach((item,index)=>{opacity(item.row,mix(.2,1,smooth(index*.08,.24+index*.08,comparison)));draw(item.path,smooth(.23+index*.05,.55+index*.05,comparison));opacity(item.ai,smooth(.43+index*.05,.64+index*.05,comparison));});
        const finance=methodLocal(p,.76,1),q=smooth(.05,.985,finance),frame=revenueFrame(plot,q);line.setAttribute('d',frame.d);opacity(line,q>0?1:0);clip.setAttribute('width',(q>0?frame.x-70:0).toFixed(3));bars.forEach((item,index)=>{const growth=smooth(.04+index*.12,.26+index*.12,finance),height=item.height*growth;item.bar.setAttribute('y',(428-height).toFixed(3));item.bar.setAttribute('height',height.toFixed(3));opacity(item.bar,growth>0?1:0);opacity(item.point,smooth(.80,1,growth));opacity(item.value,smooth(.85,1,growth));opacity(item.input,smooth(.8,1,growth));});head.setAttribute('cx',frame.x.toFixed(3));head.setAttribute('cy',frame.y.toFixed(3));glow.setAttribute('cx',frame.x.toFixed(3));glow.setAttribute('cy',frame.y.toFixed(3));opacity(head,q>0?1:0);opacity(glow,q>0?.7:0);
      }};
    }
  };
})();
