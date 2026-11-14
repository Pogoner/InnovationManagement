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

  // 2 · A connected technology sketch becomes a two-perspective audit.
  const auditOrder = ['raptor-3', 'starship-v3', 'orbital-refuelling', 'starlink'];
  const auditNames = {'raptor-3': 'Raptor 3', 'starship-v3': 'Starship V3', 'orbital-refuelling': 'Orbitale Betankung', starlink: 'Starlink · Vergleich'};
  const auditIcons = [
    'M-9-28H9L12-10H20L12 0L24 32H-24L-12 0L-20-10H-12ZM-9-28V-38H9V-28M-12 0H12M-18 23H18',
    'M0-39C-14-26-15-17-15-4V32H15V-4C15-17 14-26 0-39ZM-15 18L-28 35H-15M15 18L28 35H15M-15 5H15M-15 28H15',
    'M-29-20C-29-30-7-30-7-20V20C-7 30-29 30-29 20ZM7-20C7-30 29-30 29-20V20C29 30 7 30 7 20ZM-7 0H7M-29-14H-7M7-14H29M-18-29V-37M18-29V-37',
    'M-11-13H11V13H-11ZM-11-7H-37V7H-11M11-7H37V7H11M-28-7V7M28-7V7M0-13V-28M-8-28H8M0 13V28M-7 28H7'
  ];
  scenes[2] = {
    markup() {
      const {R} = data();
      const audit = auditOrder.map(id => R.audit.find(item => item.id === id));
      return svg('audit', 'Innovationsprüfstand nach Hube. Raptor 3: Team 64, KI 16. Starship V3: 32 und 16. Orbitale Betankung: 24 und 48. Starlink: 0 und 72. Die Team-Null bedeutet hier bereits etablierten Betrieb, nicht fehlenden Nutzen.', `
        <defs><linearGradient id="fa-audit-copper"><stop stop-color="#efbd91" stop-opacity=".35"/><stop offset="1" stop-color="#efbd91"/></linearGradient><linearGradient id="fa-audit-ice"><stop stop-color="#a9d9d9" stop-opacity=".25"/><stop offset="1" stop-color="#a9d9d9"/></linearGradient></defs>
        <text class="fa-kicker" x="210" y="24">3 PROJEKTE + VERGLEICH</text><text class="fa-small" x="210" y="48">HUBE-PUNKTE</text>
        <g class="fa-audit-legend"><circle class="fa-fill-copper" cx="422" cy="18" r="4"/><text x="436" y="24">Team</text><circle class="fa-fill-ice" cx="521" cy="18" r="4"/><text x="535" y="24">KI</text></g>
        <path class="fa-audit-spine fa-trace" pathLength="1" d="M83 62V424"/>
        ${audit.map((item, index) => {
          const y = 92 + index * 96;
          return `<g class="fa-audit-row" data-audit-row="${index}">
            <circle class="fa-audit-disc" cx="83" cy="${y + 12}" r="43"/>
            <g transform="translate(83 ${y + 12})"><path class="fa-audit-icon fa-trace" pathLength="1" d="${auditIcons[index]}"/></g>
            <path class="fa-audit-connector fa-trace" pathLength="1" d="M128 ${y + 12}H172L187 ${y - 2}H200"/>
            <text class="fa-audit-name" x="210" y="${y - 14}">${auditNames[item.id]}</text>
            <text class="fa-series-label" x="210" y="${y + 14}">T</text><path class="fa-track" d="M236 ${y + 8}H552"/>
            <rect class="fa-audit-bar fa-audit-team" x="236" y="${y + 2}" height="12" width="${item.team.score / 72 * 316}" rx="2"/>
            ${item.team.score === 0 ? `<circle class="fa-audit-zero" cx="236" cy="${y + 8}" r="4"/>` : ''}
            <text class="fa-audit-value fa-team-value" x="572" y="${y + 16}">${item.team.score}</text>
            <text class="fa-series-label" x="210" y="${y + 41}">KI</text><path class="fa-track" d="M236 ${y + 35}H552"/>
            <rect class="fa-audit-bar fa-audit-ai" x="236" y="${y + 29}" height="12" width="${item.ai.score / 72 * 316}" rx="2"/>
            <text class="fa-audit-value fa-ai-value" x="572" y="${y + 43}">${item.ai.score}</text>
          </g>`;
        }).join('')}
        <g class="fa-audit-note"><path d="M210 459H604"/><text class="fa-note-strong" x="210" y="486">0 ≠ kein Nutzen</text><text class="fa-footnote" x="210" y="510">Starlink im Team: etablierter Betrieb.</text></g>
      `);
    },
    mount(root) {
      const audit = auditOrder.map(id => data().R.audit.find(item => item.id === id));
      const spine = root.querySelector('.fa-audit-spine');
      const rows = [...root.querySelectorAll('[data-audit-row]')].map((row, index) => ({
        row, icon: row.querySelector('.fa-audit-icon'), connector: row.querySelector('.fa-audit-connector'),
        team: row.querySelector('.fa-audit-team'), ai: row.querySelector('.fa-audit-ai'),
        teamValue: row.querySelector('.fa-team-value'), aiValue: row.querySelector('.fa-ai-value'),
        zero: row.querySelector('.fa-audit-zero'),
        teamWidth: audit[index].team.score / 72 * 316,
        aiWidth: audit[index].ai.score / 72 * 316
      }));
      const note = root.querySelector('.fa-audit-note');
      return {update(progress, context) {
        const p = pose(progress, context);
        draw(spine, smooth(0, .48, p));
        rows.forEach((item, index) => {
          const base = index * .075;
          const team = smooth(base + .03, base + .24, p);
          const ai = smooth(.43 + index * .065, .63 + index * .065, p);
          opacity(item.row, mix(.18, 1, smooth(base, base + .14, p)));
          draw(item.icon, mix(.08, 1, smooth(base, base + .25, p)));
          draw(item.connector, smooth(base + .06, base + .25, p));
          item.team.setAttribute('width', (item.teamWidth * team).toFixed(3));
          item.ai.setAttribute('width', (item.aiWidth * ai).toFixed(3));
          opacity(item.teamValue, smooth(.86, 1, team));
          opacity(item.aiValue, smooth(.86, 1, ai));
          if (item.zero) opacity(item.zero, smooth(.25, .9, team));
        });
        opacity(note, smooth(.82, .96, p));
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
            <text class="fa-axis-label" x="86" y="36">EINFLUSS · 1–5</text><text class="fa-plot-callout" x="448" y="153" text-anchor="middle">HANDELN</text>
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

  // 4 · All three cases keep their six source assessments. Their benefit/effort
  // coordinates form the portfolio; a paired IR column makes the disagreement
  // readable. The next shot isolates RocketLight, then traces the A forecast.
  const caseNames={9:'RocketLight Dinner',4:'Starlink Insights',8:'Launch Engineering Cloud'};
  const caseData=()=>[9,4,8].map(id=>({id,name:caseNames[id],items:data().E.assessments.filter(item=>item.assessment.idea===id)}));
  const casePoint=result=>({x:50+result.IA/5*350,y:408-result.IN/5*330});
  scenes[4] = {
    markup() {
      const {E}=data(),cases=caseData(),[team,ai]=E.rocketlightAssessments,series=E.financialA.revenue.map(value=>value/1e6),max=Math.max(...series),baseY=428;
      const points=series.map((value,index)=>({x:94+index*111,y:baseY-value/max*258,value})),line=points.map((point,index)=>`${index?'L':'M'}${point.x} ${point.y}`).join(' ');
      const scores=cases.map(item=>`${item.name}: Team IR ${num(item.items[0].result.IR)}, KI IR ${num(item.items[1].result.IR)}`).join('. ');
      return svg('finance',`Drei Geschäftsideen im Nutzen-Aufwand-Portfolio nach Hube. ${scores}. Die sechs Bewertungen sind Mensch-KI-Einschätzungen und keine finanzielle Rendite. RocketLight erzielt bei gleichem Nutzen 2,20 unterschiedliche Aufwandswerte. Variante A plant 47,24 Millionen US-Dollar Umsatz 2027 bis 2031.`,`
        <defs><linearGradient id="fa-revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#efbd91" stop-opacity=".22"/><stop offset="1" stop-color="#efbd91" stop-opacity=".015"/></linearGradient><clipPath id="fa-revenue-reveal"><rect class="fa-revenue-clip" x="70" y="145" width="0" height="290"/></clipPath><clipPath id="fa-score-reveal"><rect class="fa-score-clip" x="20" y="235" width="600" height="0"/></clipPath></defs>
        <g class="fa-cases-phase">
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
        <g class="fa-score-phase">
          <path class="fa-score-link fa-trace" pathLength="1" d="M320 116V146M150 181V146H490V181"/>
          <text class="fa-kicker" x="320" y="43" text-anchor="middle">ROCKETLIGHT · GLEICHER GESAMTNUTZEN</text><text class="fa-benefit-value" x="320" y="100" text-anchor="middle">${num(team.result.IN)}</text>
          <g clip-path="url(#fa-score-reveal)"><text class="fa-ir fa-copper-text" x="150" y="272" text-anchor="middle">${num(team.result.IR)}</text><text class="fa-ir fa-ice-text" x="490" y="272" text-anchor="middle">${num(ai.result.IR)}</text></g>
          <text class="fa-score-label fa-copper-text" x="150" y="312" text-anchor="middle">TEAM</text><text class="fa-score-label fa-ice-text" x="490" y="312" text-anchor="middle">KI</text><path class="fa-score-divider fa-trace" pathLength="1" d="M320 194V392"/>
          <text class="fa-effort-label" x="50" y="360">Aufwand ${num(team.result.IA)}</text><text class="fa-effort-label" x="388" y="360">Aufwand ${num(ai.result.IA)}</text><path class="fa-track" d="M50 387H250M388 387H588"/>
          <rect class="fa-effort fa-effort-team" x="50" y="381" width="${team.result.IA/5*200}" height="12" rx="2"/><rect class="fa-effort fa-effort-ai" x="388" y="381" width="${ai.result.IA/5*200}" height="12" rx="2"/>
          <text class="fa-note-strong" x="320" y="456" text-anchor="middle">Der Unterschied liegt im Aufwand.</text><text class="fa-footnote" x="320" y="489" text-anchor="middle">Sicherheit · Zugang · zahlende Gäste zuerst prüfen</text>
        </g>
        <g class="fa-revenue-phase">
          <text class="fa-revenue-total" x="65" y="80">${num(E.financialA.R/1e6)}</text><text class="fa-revenue-unit" x="312" y="58">Mio. USD</text><text class="fa-footnote" x="312" y="84">Umsatz in fünf Jahren</text><text class="fa-kicker" x="65" y="120">VARIANTE A · PLANUNG 2027–2031</text>
          ${[0,10,20].map(value=>`<path class="fa-grid-line" d="M70 ${baseY-value/max*258}H580"/><text class="fa-tick" x="55" y="${baseY-value/max*258+6}" text-anchor="end">${value}</text>`).join('')}
          <text class="fa-axis-label" x="65" y="157">MIO. USD / JAHR</text><g clip-path="url(#fa-revenue-reveal)"><path class="fa-revenue-area" d="${line}L538 ${baseY}H94Z"/></g><path class="fa-revenue-line fa-trace" pathLength="1" d="${line}"/>
          ${points.map((point,index)=>`<g class="fa-revenue-year" data-revenue-year="${index}"><rect class="fa-revenue-bar" x="${point.x-17}" y="${point.y}" width="34" height="${baseY-point.y}" rx="2"/><circle class="fa-revenue-point" cx="${point.x}" cy="${point.y}" r="5"/><text class="fa-revenue-value" x="${point.x}" y="${point.y-17}" text-anchor="middle">${num(point.value,point.value===0?0:2)}</text><text class="fa-year-label" x="${point.x}" y="457" text-anchor="middle">${2027+index}</text></g>`).join('')}
          <circle class="fa-revenue-head-glow" r="15"/><circle class="fa-revenue-head" r="5"/><text class="fa-footnote" x="320" y="505" text-anchor="middle">Umsatz ≠ Gewinn · Annahmen im Pilot prüfen</text>
        </g>
      `);
    },
    mount(root) {
      const {E}=data(),cases=root.querySelector('.fa-cases-phase'),caseBorder=root.querySelector('.fa-cases-border'),caseRows=[...root.querySelectorAll('[data-business-case]')].map(row=>({row,path:row.querySelector('.fa-case-journey'),ai:row.querySelector('.fa-case-ai')}));
      const score=root.querySelector('.fa-score-phase'),scoreClip=root.querySelector('.fa-score-clip'),links=[...root.querySelectorAll('.fa-score-link,.fa-score-divider')],effortTeam=root.querySelector('.fa-effort-team'),effortAI=root.querySelector('.fa-effort-ai'),teamWidth=E.rocketlightAssessments[0].result.IA/5*200,aiWidth=E.rocketlightAssessments[1].result.IA/5*200;
      const finance=root.querySelector('.fa-revenue-phase'),series=E.financialA.revenue.map(value=>value/1e6),max=Math.max(...series),points=series.map((value,index)=>({x:94+index*111,y:428-value/max*258}));
      const lengths=points.slice(1).map((point,index)=>Math.hypot(point.x-points[index].x,point.y-points[index].y)),totalLength=lengths.reduce((sum,value)=>sum+value,0),line=root.querySelector('.fa-revenue-line'),clip=root.querySelector('.fa-revenue-clip'),head=root.querySelector('.fa-revenue-head'),glow=root.querySelector('.fa-revenue-head-glow');
      const bars=[...root.querySelectorAll('[data-revenue-year]')].map((el,index)=>({bar:el.querySelector('.fa-revenue-bar'),point:el.querySelector('.fa-revenue-point'),value:el.querySelector('.fa-revenue-value'),height:428-points[index].y}));
      return {update(progress,context) {
        const p=pose(progress,context);opacity(cases,1-smooth(.285,.32,p));draw(caseBorder,smooth(0,.12,p));caseRows.forEach((item,index)=>{opacity(item.row,mix(.2,1,smooth(index*.025,.09+index*.025,p)));draw(item.path,smooth(.09+index*.015,.20+index*.015,p));opacity(item.ai,smooth(.16+index*.015,.23+index*.015,p));});
        opacity(score,smooth(.30,.33,p)*(1-smooth(.58,.62,p)));const reveal=smooth(.32,.43,p);scoreClip.setAttribute('y',(300-130*reveal).toFixed(3));scoreClip.setAttribute('height',(130*reveal).toFixed(3));links.forEach((link,index)=>draw(link,smooth(.31+index*.035,.43+index*.035,p)));effortTeam.setAttribute('width',(teamWidth*smooth(.39,.53,p)).toFixed(3));effortAI.setAttribute('width',(aiWidth*smooth(.39,.53,p)).toFixed(3));
        opacity(finance,smooth(.60,.635,p));const q=smooth(.64,.985,p);draw(line,q);clip.setAttribute('width',(q*530).toFixed(3));bars.forEach((item,index)=>{const growth=smooth(.64+index*.053,.73+index*.053,p),height=item.height*growth;item.bar.setAttribute('y',(428-height).toFixed(3));item.bar.setAttribute('height',height.toFixed(3));opacity(item.point,smooth(.80,1,growth));opacity(item.value,smooth(.85,1,growth));});
        let distance=q*totalLength,segment=0;while(segment<lengths.length-1&&distance>lengths[segment])distance-=lengths[segment++];const local=lengths[segment]?distance/lengths[segment]:0,x=mix(points[segment].x,points[segment+1].x,local),y=mix(points[segment].y,points[segment+1].y,local);head.setAttribute('cx',x.toFixed(3));head.setAttribute('cy',y.toFixed(3));glow.setAttribute('cx',x.toFixed(3));glow.setAttribute('cy',y.toFixed(3));opacity(head,q>0&&q<1?1:0);opacity(glow,q>0&&q<1?.7:0);
      }};
    }
  };
})();
