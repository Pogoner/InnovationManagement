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
  const auditNames = {'raptor-3': 'Raptor 3', 'starship-v3': 'Starship V3', 'orbital-refuelling': 'Orbitale Betankung', starlink: 'Starlink'};
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
        <text class="fa-kicker" x="210" y="24">HUBE-PUNKTE</text>
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

  // 3 · Signals settle at their exact workbook coordinates. Identical positions
  // collapse into one multiplicity marker; they are never jittered off the data.
  function trendGeometry() {
    const {R} = data();
    return R.trends.map((trend, index) => ({
      trend, index,
      x: 86 + (trend.team.pressure - 1) / 9 * 484,
      y: 360 - (trend.team.influence - 1) / 4 * 280,
      sx: 320 + Math.cos(index / 8 * Math.PI * 2 - Math.PI / 2) * 180,
      sy: 240 + Math.sin(index / 8 * Math.PI * 2 - Math.PI / 2) * 145
    }));
  }
  function trendGroups(points) {
    const groups = new Map();
    points.forEach(point => {
      const key = `${point.x},${point.y}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(point);
    });
    return [...groups.values()].filter(group => group.length > 1);
  }
  function ideaGeometry() {
    const {R} = data();
    let chosen = 0;
    const originals = R.ideaComparison.map((idea, index) => ({
      id: idea.selected ? ++chosen : null,
      selected: idea.selected,
      x: 156 + index % 5 * 74,
      y: 127 + Math.floor(index / 5) * 68
    }));
    return originals.concat([0, 1, 2, 3].map(index => ({id: 9 + index, selected: true, extra: true, x: 594, y: 133 + index * 68})));
  }
  const finalistPositions = {9: {x: 168, y: 165}, 4: {x: 168, y: 280}, 8: {x: 168, y: 395}};
  scenes[3] = {
    markup() {
      const points = trendGeometry(), groups = trendGroups(points), ideas = ideaGeometry();
      return svg('selection', 'Acht Trends werden im Team-Portfolio nach Handlungsdruck und Einfluss verortet. Aus 19 Trendideen wählen wir acht Favoriten. Vier Ideen aus Open Innovation ergänzen das Feld auf zwölf Kandidaten. Drei Business Cases: RocketLight Dinner, Starlink Insights und Launch Engineering Cloud.', `
        <g class="fa-trend-phase">
          <g class="fa-trend-grid">
            <path class="fa-grid-border fa-trace" pathLength="1" d="M86 80V360H570V80Z"/>
            ${[1, 2, 3, 4].map(index => `<path class="fa-grid-line" d="M86 ${360 - index * 70}H570"/>`).join('')}
            ${[1, 3, 5, 7, 9].map(index => `<path class="fa-grid-line" d="M${86 + index / 9 * 484} 80V360"/>`).join('')}
            <rect class="fa-trend-act" x="328" y="80" width="242" height="175"/>
            <path class="fa-threshold" d="M328 80V360M86 255H570"/>
            <text class="fa-axis-label" x="86" y="30">EINFLUSS · 1–5</text>
            <text class="fa-axis-label" x="570" y="411" text-anchor="end">HANDLUNGSDRUCK · 1–10</text>
            <text class="fa-plot-callout" x="452" y="114" text-anchor="middle">HANDELN</text>
            ${[1, 2, 3, 4, 5].map(value => `<text class="fa-tick" x="65" y="${366 - (value - 1) * 70}" text-anchor="end">${value}</text>`).join('')}
            ${[1, 3, 5, 7, 9, 10].map(value => `<text class="fa-tick" x="${86 + (value - 1) / 9 * 484}" y="389" text-anchor="middle">${value}</text>`).join('')}
          </g>
          <g class="fa-signal-web">${points.map(point => `<path data-signal-line="${point.index}" d="M320 240L${point.sx} ${point.sy}"/>`).join('')}<circle cx="320" cy="240" r="40"/><text class="fa-signal-count" x="320" y="250" text-anchor="middle">8</text></g>
          ${points.map(point => `<g class="fa-trend-signal" data-trend-signal="${point.index}" transform="translate(${point.sx} ${point.sy})"><circle class="fa-node-halo" r="23"/><circle class="fa-trend-dot" r="17"/><text class="fa-dot-label" y="6" text-anchor="middle">${String(point.index + 1).padStart(2,'0')}</text></g>`).join('')}
          ${groups.map((group, index) => `<g class="fa-trend-cluster" data-trend-cluster="${index}" transform="translate(${group[0].x} ${group[0].y})"><circle class="fa-node-halo" r="24"/><circle class="fa-trend-dot" r="19"/><text class="fa-dot-label" y="6" text-anchor="middle">${group.length}×</text></g>`).join('')}
          <g class="fa-trend-key"><text class="fa-footnote" x="86" y="454">Team-Sicht · Dauer + Nähe = Handlungsdruck</text><text class="fa-footnote" x="86" y="481">2× = zwei Trends mit identischen Werten</text><text class="fa-footnote" x="86" y="508">Vollständige Namen und Werte in den Belegen</text></g>
        </g>
        <g class="fa-selection-phase">
          <g class="fa-selection-start"><text class="fa-number-large" x="320" y="66" text-anchor="middle">19</text><text class="fa-kicker" x="320" y="96" text-anchor="middle">TRENDIDEEN</text></g>
          <g class="fa-selection-middle"><circle class="fa-candidate-orbit fa-trace" cx="320" cy="260" r="128" pathLength="1"/><text class="fa-number-large" x="320" y="261" text-anchor="middle">12</text><text class="fa-kicker" x="320" y="289" text-anchor="middle">KANDIDATEN</text></g>
          <g class="fa-selection-final"><text class="fa-number-large" x="74" y="65">3</text><text class="fa-kicker" x="137" y="59">BUSINESS CASES</text><path class="fa-selection-tree fa-trace" pathLength="1" d="M87 165V395M87 165H144M87 280H144M87 395H144"/>
            <g data-finalist-copy="9"><text class="fa-finalist-name fa-copper-text" x="214" y="160">RocketLight Dinner</text><text class="fa-footnote" x="214" y="190">Erlebnis · Open Innovation</text></g>
            <g data-finalist-copy="4"><text class="fa-finalist-name" x="214" y="275">Starlink Insights</text><text class="fa-footnote" x="214" y="305">Signaldaten als Wetterwissen</text></g>
            <g data-finalist-copy="8"><text class="fa-finalist-name" x="214" y="383">Launch Engineering</text><text class="fa-finalist-name" x="214" y="410">Cloud</text><text class="fa-footnote" x="214" y="439">Nutzlasten digital prüfen</text></g>
          </g>
          ${ideas.map((idea, index) => `<g class="fa-candidate ${idea.extra ? 'is-extra' : ''} ${idea.id === 9 ? 'is-pitch' : ''}" data-candidate="${index}" transform="translate(${idea.x} ${idea.y})"><circle class="fa-candidate-halo" r="27"/><circle class="fa-candidate-dot" r="9"/><text class="fa-candidate-id" y="6" text-anchor="middle">${idea.id ? String(idea.id).padStart(2,'0') : ''}</text></g>`).join('')}
          <g class="fa-funnel-caption"><text class="fa-note-strong" x="320" y="465" text-anchor="middle">8 Favoriten + 4 Open Innovation</text><text class="fa-footnote" x="320" y="495" text-anchor="middle">Vorauswahl der Projektgruppe</text></g>
        </g>
      `);
    },
    mount(root) {
      const points = trendGeometry(), groups = trendGroups(points), ideas = ideaGeometry();
      const clustered = new Set(groups.flatMap(group => group.map(point => point.index)));
      const nodes = [...root.querySelectorAll('[data-trend-signal]')];
      const clusters = [...root.querySelectorAll('[data-trend-cluster]')];
      const trendPhase = root.querySelector('.fa-trend-phase');
      const trendGrid = root.querySelector('.fa-trend-grid');
      const border = root.querySelector('.fa-grid-border');
      const web = root.querySelector('.fa-signal-web');
      const key = root.querySelector('.fa-trend-key');
      const selectionPhase = root.querySelector('.fa-selection-phase');
      const start = root.querySelector('.fa-selection-start');
      const middle = root.querySelector('.fa-selection-middle');
      const final = root.querySelector('.fa-selection-final');
      const tree = root.querySelector('.fa-selection-tree');
      const orbit = root.querySelector('.fa-candidate-orbit');
      const caption = root.querySelector('.fa-funnel-caption');
      const candidateNodes = [...root.querySelectorAll('[data-candidate]')].map(node => ({node, dot: node.querySelector('.fa-candidate-dot'), halo: node.querySelector('.fa-candidate-halo'), label: node.querySelector('.fa-candidate-id')}));
      const finalistLabels = [9,4,8].map(id => root.querySelector(`[data-finalist-copy="${id}"]`));
      return {update(progress, context) {
        const p = pose(progress, context);
        opacity(trendPhase, 1 - smooth(.45, .52, p));
        opacity(trendGrid, smooth(.1, .25, p));
        draw(border, smooth(.08, .28, p));
        opacity(web, 1 - smooth(.08, .22, p));
        opacity(key, smooth(.23, .32, p));
        points.forEach((point, index) => {
          const q = smooth(.025 + index * .008, .245 + index * .008, p);
          at(nodes[index], mix(point.sx, point.x, q), mix(point.sy, point.y, q));
          opacity(nodes[index], clustered.has(index) ? 1 - smooth(.265, .315, p) : 1);
        });
        clusters.forEach(cluster => opacity(cluster, smooth(.27, .315, p)));
        opacity(selectionPhase, smooth(.48, .53, p));
        opacity(start, 1 - smooth(.57, .65, p));
        opacity(middle, smooth(.61, .69, p) * (1 - smooth(.755, .81, p)));
        draw(orbit, smooth(.59, .74, p));
        opacity(final, smooth(.8, .86, p));
        draw(tree, smooth(.81, .96, p));
        opacity(caption, 1 - smooth(.76, .83, p));
        finalistLabels.forEach((label, index) => opacity(label, smooth(.83 + index * .025, .925 + index * .025, p)));
        candidateNodes.forEach((item, index) => {
          const idea = ideas[index];
          const q = smooth(idea.extra ? .595 : .55, idea.extra ? .735 : .70, p);
          if (!idea.selected) {
            const fade = smooth(.545, .64, p);
            at(item.node, idea.x, idea.y + 48 * fade, 1 - fade * .7);
            opacity(item.node, 1 - fade);
            opacity(item.label, 0);
            opacity(item.halo, 0);
            return;
          }
          const angle = (idea.id - 1) / 12 * Math.PI * 2 - Math.PI / 2;
          const rx = 320 + Math.cos(angle) * 128, ry = 260 + Math.sin(angle) * 128;
          let x = mix(idea.x, rx, q), y = mix(idea.y, ry, q);
          const finish = smooth(.77, .93, p), destination = finalistPositions[idea.id];
          if (destination) {
            x = mix(x, destination.x, finish); y = mix(y, destination.y, finish);
            item.dot.setAttribute('r', mix(9, 22, finish).toFixed(3));
            opacity(item.label, smooth(.82, .94, p));
            opacity(item.halo, smooth(.82, .96, p));
          } else {
            x += Math.cos(angle) * finish * 80; y += Math.sin(angle) * finish * 80;
            item.dot.setAttribute('r', '9');
            opacity(item.label, 0); opacity(item.halo, 0);
          }
          at(item.node, x, y);
          opacity(item.node, (idea.extra ? smooth(.55, .62, p) : 1) * (destination ? 1 : 1 - smooth(.77, .88, p)));
        });
      }};
    }
  };

  // 4 · Equal benefit splits into different effort assumptions. The second
  // shot traces the original A revenue series, not a fabricated B forecast.
  scenes[4] = {
    markup() {
      const {E} = data();
      const [team, ai] = E.rocketlightAssessments;
      const series = E.financialA.revenue.map(value => value / 1e6);
      const max = Math.max(...series), baseY = 428, chartHeight = 258;
      const points = series.map((value, index) => ({x: 94 + index * 111, y: baseY - value / max * chartHeight, value}));
      const line = points.map((point, index) => `${index ? 'L' : 'M'}${point.x} ${point.y}`).join(' ');
      return svg('finance', 'RocketLight: Nutzen 2,20 in beiden Bewertungen. Team-Aufwand 1,20 und Innovationsrendite 1,83; KI-Aufwand 3,00 und Innovationsrendite 0,73. Innovationsrendite ist keine finanzielle Rendite. Die Originalplanung A ergibt 47,24 Millionen US-Dollar Umsatz über fünf Jahre, 2027 bis 2031.', `
        <defs><linearGradient id="fa-revenue-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#efbd91" stop-opacity=".22"/><stop offset="1" stop-color="#efbd91" stop-opacity=".015"/></linearGradient><clipPath id="fa-revenue-reveal"><rect class="fa-revenue-clip" x="70" y="145" width="0" height="290"/></clipPath><clipPath id="fa-score-reveal"><rect class="fa-score-clip" x="20" y="235" width="600" height="0"/></clipPath></defs>
        <g class="fa-score-phase">
          <path class="fa-score-link fa-trace" pathLength="1" d="M320 116V146M150 181V146H490V181"/>
          <text class="fa-kicker" x="320" y="43" text-anchor="middle">GLEICHER GESAMTNUTZEN</text>
          <text class="fa-benefit-value" x="320" y="100" text-anchor="middle">${num(team.result.IN)}</text>
          <g clip-path="url(#fa-score-reveal)"><text class="fa-ir fa-copper-text" x="150" y="272" text-anchor="middle">${num(team.result.IR)}</text><text class="fa-ir fa-ice-text" x="490" y="272" text-anchor="middle">${num(ai.result.IR)}</text></g>
          <text class="fa-score-label fa-copper-text" x="150" y="312" text-anchor="middle">TEAM</text><text class="fa-score-label fa-ice-text" x="490" y="312" text-anchor="middle">KI</text>
          <path class="fa-score-divider fa-trace" pathLength="1" d="M320 194V392"/>
          <text class="fa-effort-label" x="50" y="360">Aufwand ${num(team.result.IA)}</text><text class="fa-effort-label" x="388" y="360">Aufwand ${num(ai.result.IA)}</text>
          <path class="fa-track" d="M50 387H250M388 387H588"/>
          <rect class="fa-effort fa-effort-team" x="50" y="381" width="${team.result.IA / 5 * 200}" height="12" rx="2"/>
          <rect class="fa-effort fa-effort-ai" x="388" y="381" width="${ai.result.IA / 5 * 200}" height="12" rx="2"/>
          <text class="fa-note-strong" x="320" y="456" text-anchor="middle">IR = Nutzen ÷ Aufwand</text>
          <text class="fa-footnote" x="320" y="489" text-anchor="middle">Bewertungsscore · keine finanzielle Rendite</text>
        </g>
        <g class="fa-revenue-phase">
          <text class="fa-revenue-total" x="65" y="80">${num(E.financialA.R / 1e6)}</text><text class="fa-revenue-unit" x="312" y="58">Mio. USD</text><text class="fa-footnote" x="312" y="84">Umsatz in fünf Jahren</text>
          <text class="fa-kicker" x="65" y="120">VARIANTE A · PLANUNG 2027–2031</text>
          ${[0,10,20].map(value => `<path class="fa-grid-line" d="M70 ${baseY - value / max * chartHeight}H580"/><text class="fa-tick" x="55" y="${baseY - value / max * chartHeight + 6}" text-anchor="end">${value}</text>`).join('')}
          <text class="fa-axis-label" x="65" y="157">MIO. USD / JAHR</text>
          <g clip-path="url(#fa-revenue-reveal)"><path class="fa-revenue-area" d="${line}L538 ${baseY}H94Z"/></g>
          <path class="fa-revenue-line fa-trace" pathLength="1" d="${line}"/>
          ${points.map((point, index) => `<g class="fa-revenue-year" data-revenue-year="${index}"><rect class="fa-revenue-bar" x="${point.x - 17}" y="${point.y}" width="34" height="${baseY - point.y}" rx="2"/><circle class="fa-revenue-point" cx="${point.x}" cy="${point.y}" r="5"/><text class="fa-revenue-value" x="${point.x}" y="${point.y - 17}" text-anchor="middle">${num(point.value, point.value === 0 ? 0 : 2)}</text><text class="fa-year-label" x="${point.x}" y="457" text-anchor="middle">${2027 + index}</text></g>`).join('')}
          <circle class="fa-revenue-head-glow" r="15"/><circle class="fa-revenue-head" r="5"/>
          <text class="fa-footnote" x="320" y="505" text-anchor="middle">Umsatz ≠ Gewinn · Annahmen im Pilot prüfen</text>
        </g>
      `);
    },
    mount(root) {
      const {E} = data();
      const score = root.querySelector('.fa-score-phase');
      const scoreClip = root.querySelector('.fa-score-clip');
      const links = [...root.querySelectorAll('.fa-score-link,.fa-score-divider')];
      const effortTeam = root.querySelector('.fa-effort-team'), effortAI = root.querySelector('.fa-effort-ai');
      const teamWidth = E.rocketlightAssessments[0].result.IA / 5 * 200, aiWidth = E.rocketlightAssessments[1].result.IA / 5 * 200;
      const finance = root.querySelector('.fa-revenue-phase');
      const series = E.financialA.revenue.map(value => value / 1e6), max = Math.max(...series);
      const points = series.map((value, index) => ({x: 94 + index * 111, y: 428 - value / max * 258}));
      const lengths = points.slice(1).map((point,index) => Math.hypot(point.x-points[index].x,point.y-points[index].y));
      const totalLength = lengths.reduce((sum,value) => sum + value,0);
      const line = root.querySelector('.fa-revenue-line'), clip = root.querySelector('.fa-revenue-clip');
      const head = root.querySelector('.fa-revenue-head'), glow = root.querySelector('.fa-revenue-head-glow');
      const bars = [...root.querySelectorAll('[data-revenue-year]')].map((el, index) => ({
        bar: el.querySelector('.fa-revenue-bar'), point: el.querySelector('.fa-revenue-point'), value: el.querySelector('.fa-revenue-value'),
        height: 428 - points[index].y
      }));
      return {update(progress, context) {
        const p = pose(progress, context);
        opacity(score, 1 - smooth(.405, .46, p));
        const reveal = smooth(.025, .20, p);
        scoreClip.setAttribute('y', (300 - 130 * reveal).toFixed(3));
        scoreClip.setAttribute('height', (130 * reveal).toFixed(3));
        links.forEach((link, index) => draw(link, smooth(index * .07, .21 + index * .07, p)));
        effortTeam.setAttribute('width', (teamWidth * smooth(.12, .34, p)).toFixed(3));
        effortAI.setAttribute('width', (aiWidth * smooth(.12, .34, p)).toFixed(3));
        opacity(finance, smooth(.46, .525, p));
        const q = smooth(.535, .965, p);
        draw(line, q);
        clip.setAttribute('width', (q * 530).toFixed(3));
        bars.forEach((item, index) => {
          const growth = smooth(.53 + index * .063, .65 + index * .063, p);
          const height = item.height * growth;
          item.bar.setAttribute('y', (428 - height).toFixed(3));
          item.bar.setAttribute('height', height.toFixed(3));
          opacity(item.point, smooth(.80, 1, growth));
          opacity(item.value, smooth(.85, 1, growth));
        });
        // The travelling head follows the actual piecewise-linear revenue path.
        let distance = q * totalLength, segment = 0;
        while(segment < lengths.length - 1 && distance > lengths[segment]) distance -= lengths[segment++];
        const local = lengths[segment] ? distance/lengths[segment] : 0;
        const x = mix(points[segment].x, points[segment+1].x, local), y = mix(points[segment].y, points[segment+1].y, local);
        head.setAttribute('cx',x.toFixed(3)); head.setAttribute('cy',y.toFixed(3));
        glow.setAttribute('cx',x.toFixed(3)); glow.setAttribute('cy',y.toFixed(3));
        opacity(head, q > 0 && q < 1 ? 1 : 0); opacity(glow, q > 0 && q < 1 ? .7 : 0);
      }};
    }
  };
})();
