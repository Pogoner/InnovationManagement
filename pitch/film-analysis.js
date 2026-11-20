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
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (value, digits = 2) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const opacity = (el, value) => { el.style.opacity = clamp(value).toFixed(4); };
  const draw = (el, value) => { el.style.strokeDashoffset = (1 - clamp(value)).toFixed(4); };
  const at = (el, x, y, scale = 1) => el.setAttribute('transform', `translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${scale.toFixed(4)})`);
  const svg = (name, title, content) => `<svg class="fa-svg fa-${name}" viewBox="0 0 640 520" role="img" aria-labelledby="fa-${name}-title"><title id="fa-${name}-title">${esc(title)}</title>${content}</svg>`;
  const data = () => ({ R: window.PitchResearch, E: window.PitchEvidence });
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
      return {
        update(progress, context) {
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
        }
      };
    }
  };

  // 2 · The three headline innovations with the team's final Hube scores. The factor
  // derivation and the team/AI comparison stay in the dossier of this chapter.
  const auditIcons = [
    'M-9-28H9L12-10H20L12 0L24 32H-24L-12 0L-20-10H-12ZM-9-28V-38H9V-28M-12 0H12M-18 23H18',
    'M0-39C-14-26-15-17-15-4V32H15V-4C15-17 14-26 0-39ZM-15 18L-28 35H-15M15 18L28 35H15M-15 5H15M-15 28H15',
    'M-29-20C-29-30-7-30-7-20V20C-7 30-29 30-29 20ZM7-20C7-30 29-30 29-20V20C29 30 7 30 7 20ZM-7 0H7M-29-14H-7M7-14H29M-18-29V-37M18-29V-37',
    'M-11-13H11V13H-11ZM-11-7H-37V7H-11M11-7H37V7H11M-28-7V7M28-7V7M0-13V-28M-8-28H8M0 13V28M-7 28H7'
  ];
  const hubeRows = [
    { id: 'starship-v3', name: 'Starship V3', note: 'Angetrieben vom Raptor-3-Triebwerk', icon: 1 },
    { id: 'orbital-refuelling', name: 'Orbitale Betankung', note: 'Treibstoff-Logistik im Orbit', icon: 2 },
    { id: 'starlink', name: 'Starlink', note: 'Reifegrad 0: bereits etablierter Betrieb', icon: 3 }
  ];
  const hubeScores = () => hubeRows.map(row => ({ ...row, score: data().R.audit.find(item => item.id === row.id).team.score }));
  scenes[2] = {
    markup() {
      const rows = hubeScores();
      const summary = rows.map(row => `${row.name}: ${row.score}`).join(', ');
      return svg('audit', `Hube-Score der Teambewertung in Punkten. ${summary}. Starship nutzt das Raptor-Triebwerk. Starlink erhält 0 Punkte, weil der Reifegrad 0 für etablierten Betrieb steht.`, `
        <defs><linearGradient id="fa-audit-copper"><stop stop-color="#efbd91" stop-opacity=".35"/><stop offset="1" stop-color="#efbd91"/></linearGradient></defs>
        <g class="fa-hube-rows">
          <text class="fa-kicker" x="40" y="30">DREI INNOVATIONEN</text><text class="fa-small" x="210" y="66">HUBE-PUNKTE · NEUHEIT × UMSETZUNG</text>
          <path class="fa-audit-spine fa-trace" pathLength="1" d="M83 96V460"/>
          ${rows.map((row, index) => {
        const y = 140 + index * 124; return `<g class="fa-audit-row" data-audit-row="${index}">
            <circle class="fa-audit-disc" cx="83" cy="${y + 12}" r="43"/><g transform="translate(83 ${y + 12})"><path class="fa-audit-icon fa-trace" pathLength="1" d="${auditIcons[row.icon]}"/></g><path class="fa-audit-connector fa-trace" pathLength="1" d="M128 ${y + 12}H172L187 ${y - 2}H200"/>
            <text class="fa-audit-name" x="210" y="${y - 14}">${esc(row.name)}</text>
            <path class="fa-track" d="M210 ${y + 16}H552"/><rect class="fa-audit-bar fa-audit-team" x="210" y="${y + 10}" height="12" width="${row.score / 72 * 342}" rx="2"/>${row.score === 0 ? `<circle class="fa-audit-zero" cx="210" cy="${y + 16}" r="4"/>` : ''}
            <text class="fa-audit-value fa-team-value" x="572" y="${y + 22}">${row.score}</text>
            <text class="fa-audit-driver" x="210" y="${y + 50}">${esc(row.note)}</text>
          </g>`;
      }).join('')}
          <text class="fa-method-footnote" x="320" y="498" text-anchor="middle">Bewertung des Teams · Balkenskala bis 72 · Punkte, keine Prozente</text>
        </g>
      `);
    },
    mount(root) {
      const rows = hubeScores();
      const spine = root.querySelector('.fa-audit-spine');
      const items = [...root.querySelectorAll('[data-audit-row]')].map((row, index) => ({ row, icon: row.querySelector('.fa-audit-icon'), connector: row.querySelector('.fa-audit-connector'), bar: row.querySelector('.fa-audit-bar'), value: row.querySelector('.fa-team-value'), note: row.querySelector('.fa-audit-driver'), zero: row.querySelector('.fa-audit-zero'), width: rows[index].score / 72 * 342 }));
      return {
        update(progress, context) {
          const p = pose(progress, context);
          draw(spine, smooth(0, .5, p));
          items.forEach((item, index) => {
            const base = index * .16, grow = smooth(base + .12, base + .56, p);
            opacity(item.row, mix(.18, 1, smooth(base, base + .2, p)));
            draw(item.icon, mix(.08, 1, smooth(base, base + .3, p)));
            draw(item.connector, smooth(base + .08, base + .3, p));
            item.bar.setAttribute('width', (item.width * grow).toFixed(3));
            opacity(item.value, smooth(.86, 1, grow));
            opacity(item.note, smooth(base + .4, base + .68, p));
            if (item.zero) opacity(item.zero, smooth(.25, .9, grow));
          });
        }
      };
    }
  };

  // 3 · Nineteen trend ideas and four open-innovation ideas narrow to the twelve
  // matrix entries. The first idea of each trend is its favourite. The full
  // comparison and the Stufenmodell derivations stay in the dossier of this chapter.
  const poolRows = [
    { name: 'Neo-Ökologie', ideas: ['N1', 'N2', 'N3'] },
    { name: 'Individualismus', ideas: ['I1', 'I2'] },
    { name: 'Künstliche Intelligenz', ideas: ['K1', 'K2', 'K3'] },
    { name: 'Daten als Ressource', ideas: ['D1', 'D2'] },
    { name: 'Fachkräftemangel', ideas: ['F1', 'F2'] },
    { name: 'Digital Nomads', ideas: ['DN1', 'DN2'] },
    { name: 'Überregulierung', ideas: ['R1', 'R2'] },
    { name: 'Innovationsdruck', ideas: ['ID1', 'ID2', 'ID3'] }
  ];
  const openInnovation = [
    { id: 9, name: 'Rocket-Light-Dinner' },
    { id: 10, name: 'SpaceX Luxury Club' },
    { id: 11, name: 'Dyson Sphere' },
    { id: 12, name: 'Satellitenschubser' }
  ];
  const matrixShortNames = ['Climate Watch', 'My Mission', 'Edge AI', 'Starlink Insights', 'Academy', 'Remote Hubs', 'Compliance Navigator', 'Engineering Cloud', 'RocketLight Dinner', 'Luxury Club', 'Dyson Sphere', 'Satellitenschubser'];
  const lines = (copy, x, y, className, lineHeight = 22, anchor = 'start') => `<text class="${className}" x="${x}" y="${y}" text-anchor="${anchor}">${copy.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
  function pointGroups(points) {
    const groups = new Map();
    points.forEach(point => { const key = `${point.x},${point.y}`; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(point); });
    return [...groups.values()];
  }
  function matrixGeometry() {
    return data().R.matrix.map(idea => ({ idea, id: idea.id, x: 50 + (idea.team.feasibility - 1) * 86.5, y: 390 - (idea.team.originality - 1) * 72.5 }));
  }
  const finalistPositions = { 9: { x: 168, y: 204 }, 4: { x: 168, y: 324 }, 8: { x: 168, y: 444 } };
  function poolGeometry() {
    const trends = poolRows.flatMap((row, rowIndex) => row.ideas.map((label, column) => ({
      label, row: rowIndex, x: 250 + column * 56, y: 166 + rowIndex * 27,
      favorite: column === 0, matrixId: column === 0 ? rowIndex + 1 : 0, open: false
    })));
    const open = openInnovation.map((item, index) => ({
      label: String(item.id), row: poolRows.length + index, x: 250, y: 414 + index * 27,
      favorite: true, matrixId: item.id, open: true
    }));
    return [...trends, ...open];
  }
  scenes[3] = {
    markup() {
      const pool = poolGeometry(), matrix = matrixGeometry(), matrixGroups = pointGroups(matrix);
      return svg('selection', 'Dreiundzwanzig Konzepte: acht Trendfavoriten, elf weitere Geschäftsideen und vier Open-Innovation-Ideen. Zwölf Favoriten wandern in die Team-Now-How-Wow-Matrix. Drei vertiefte Business Cases: RocketLight Dinner, Starlink Insights und Launch Engineering Cloud.', `
        <g class="fa-pool-rows">
          <text class="fa-kicker" x="24" y="30">8 TRENDS · 19 Geschäftsideen</text>
          ${poolRows.map((row, index) => `<text class="fa-pool-name" x="24" y="${166 + index * 27 + 5}">${esc(row.name)}</text>`).join('')}
          <path class="fa-track" d="M24 378H400"/>
          <text class="fa-small" x="24" y="398">OPEN INNOVATION · SEPARAT ENTSTANDEN</text>
          ${openInnovation.map((item, index) => `<text class="fa-pool-name" x="24" y="${414 + index * 27 + 5}">${esc(item.name)}</text>`).join('')}
        </g>
        <g class="fa-pool-count"><text class="fa-number-large" x="430" y="122">23</text><text class="fa-kicker" x="430" y="150">IDEEN INSGESAMT</text></g>
        <g class="fa-pool-twelve" opacity="0"><text class="fa-number-large" x="430" y="122">12</text><text class="fa-kicker" x="430" y="150">AUSWAHL · 8 + 4</text></g>
        ${pool.map((item, index) => `<g class="fa-pool-node" data-pool-node="${index}" transform="translate(${item.x} ${item.y})"><circle class="fa-node-halo" r="21"/><circle class="fa-pool-dot" r="15"/><text class="fa-pool-id" y="5" text-anchor="middle">${esc(item.label)}</text>${item.matrixId ? `<g class="fa-pool-pick" opacity="0"><circle class="fa-pool-dot is-favorite" r="15"/><text class="fa-pool-id is-dark" y="5" text-anchor="middle">${esc(item.label)}</text></g>` : ''}</g>`).join('')}
        <g class="fa-matrix-phase">
          <text class="fa-kicker" x="50" y="28">NOW / HOW / WOW</text><text class="fa-axis-label" x="50" y="63">ORIGINALITÄT · 1–5</text>
          <rect class="fa-matrix-wow" x="266.25" y="100" width="129.75" height="108.75"/>
          <path class="fa-grid-border fa-trace fa-matrix-border" pathLength="1" d="M50 100V390H396V100Z"/>
          ${[1, 2, 3].map(index => `<path class="fa-grid-line" d="M${50 + index * 86.5} 100V390M50 ${390 - index * 72.5}H396"/>`).join('')}
          <path class="fa-threshold" d="M266.25 100V390M50 208.75H396"/>
          <text class="fa-matrix-quadrant" x="122" y="126">HOW</text><text class="fa-matrix-quadrant fa-copper-text" x="301" y="126">WOW</text><text class="fa-matrix-quadrant" x="90" y="366">VERWERFEN</text><text class="fa-matrix-quadrant" x="312" y="366">NOW</text>
          ${[1, 2, 3, 4, 5].map(value => `<text class="fa-matrix-tick" x="${50 + (value - 1) * 86.5}" y="419" text-anchor="middle">${value}</text><text class="fa-matrix-tick" x="33" y="${396 - (value - 1) * 72.5}" text-anchor="end">${value}</text>`).join('')}
          <text class="fa-axis-label" x="396" y="449" text-anchor="end">MACHBARKEIT · 1–5</text>
          ${matrixGroups.map((group, index) => `<g class="fa-matrix-point ${group.some(point => point.id === 9) ? 'is-pitch' : ''}" data-matrix-cluster="${index}" transform="translate(${group[0].x} ${group[0].y})"><circle r="${group.length > 1 ? 25 : 17}"/><text y="5" text-anchor="middle">${group.map(point => point.id).join('·')}</text></g>`).join('')}
          <g class="fa-matrix-key"><text class="fa-stufen-heading" x="434" y="68">DIE 12 IDEEN</text>${matrix.map((point, index) => `<text class="fa-matrix-idea ${[9, 4, 8].includes(point.id) ? 'is-finalist' : ''}" x="434" y="${104 + index * 29}"><tspan class="fa-copper-text">${String(point.id).padStart(2, '0')}</tspan> ${esc(matrixShortNames[index])}</text>`).join('')}</g>
        </g>
        <g class="fa-selection-phase">
          <text class="fa-kicker" x="320" y="31" text-anchor="middle">8 TREND-FAVORITEN + 4 OPEN INNOVATION</text>
          <g class="fa-selection-middle"><circle class="fa-candidate-orbit fa-trace" cx="320" cy="260" r="128" pathLength="1"/><text class="fa-number-large" x="320" y="263" text-anchor="middle">12</text><text class="fa-kicker" x="320" y="291" text-anchor="middle">KANDIDATEN</text></g>
          <g class="fa-selection-final"><text class="fa-number-large" x="74" y="112">3</text><text class="fa-kicker" x="137" y="107">VERTIEFTE BUSINESS CASES</text><path class="fa-selection-tree fa-trace" pathLength="1" d="M87 204V444M87 204H144M87 324H144M87 444H144"/>
            <g data-finalist-copy="9"><text class="fa-finalist-name fa-copper-text" x="214" y="201">RocketLight Dinner</text><text class="fa-footnote" x="214" y="231">Sternemenü mit Blick auf den Start</text></g>
            <g data-finalist-copy="4"><text class="fa-finalist-name" x="214" y="321">Starlink Insights</text><text class="fa-footnote" x="214" y="351">Netzdaten aus Starlink-Terminals als Wetterwissen</text></g>
            <g data-finalist-copy="8"><text class="fa-finalist-name" x="214" y="428">Launch Engineering</text><text class="fa-finalist-name" x="214" y="457">Cloud</text><text class="fa-footnote" x="214" y="486">Prüft Satellitenentwürfe vor dem Start</text></g>
          </g>
          ${matrix.map((point, index) => `<g class="fa-candidate ${point.id >= 9 ? 'is-extra' : ''} ${point.id === 9 ? 'is-pitch' : ''}" data-candidate="${index}"><circle class="fa-candidate-halo" r="27"/><circle class="fa-candidate-dot" r="9"/><text class="fa-candidate-id" y="6" text-anchor="middle">${String(point.id).padStart(2, '0')}</text></g>`).join('')}
        </g>
      `);
    },
    mount(root) {
      const pool = poolGeometry(), matrix = matrixGeometry();
      const nodes = [...root.querySelectorAll('[data-pool-node]')].map((node, index) => { const item = pool[index], target = item.matrixId ? matrix.find(point => point.id === item.matrixId) : null; return { node, item, target, pick: node.querySelector('.fa-pool-pick') }; });
      const rows = root.querySelector('.fa-pool-rows'), count = root.querySelector('.fa-pool-count'), twelve = root.querySelector('.fa-pool-twelve');
      const matrixLayer = root.querySelector('.fa-matrix-phase'), matrixBorder = root.querySelector('.fa-matrix-border'), matrixPoints = [...root.querySelectorAll('[data-matrix-cluster]')], matrixKey = root.querySelector('.fa-matrix-key');
      const selection = root.querySelector('.fa-selection-phase'), middle = root.querySelector('.fa-selection-middle'), final = root.querySelector('.fa-selection-final'), tree = root.querySelector('.fa-selection-tree'), orbit = root.querySelector('.fa-candidate-orbit');
      const candidates = [...root.querySelectorAll('[data-candidate]')].map((node, index) => ({ node, id: index + 1, dot: node.querySelector('.fa-candidate-dot'), halo: node.querySelector('.fa-candidate-halo'), label: node.querySelector('.fa-candidate-id') }));
      return {
        update(progress, context) {
          const p = pose(progress, context), leaving = 1 - smooth(.52, .58, p);
          opacity(rows, smooth(0, .08, p) * leaving);
          opacity(count, smooth(0, .06, p) * (1 - smooth(.32, .37, p))); opacity(twelve, smooth(.32, .37, p) * leaving);
          nodes.forEach(({ node, item, target, pick }) => {
            const build = smooth(.01 + item.row * .012, .09 + item.row * .012, p), q = target ? smooth(.6, .74, p) : 0;
            if (pick) opacity(pick, smooth(.34, .42, p));
            at(node, target ? mix(item.x, target.x, q) : item.x, target ? mix(item.y, target.y, q) : item.y, target ? mix(1, .86, q) : 1);
            const presence = target ? 1 - smooth(.7, .76, p) : (1 - .82 * smooth(.32, .4, p)) * (1 - smooth(.56, .62, p));
            opacity(node, build * presence);
          });
          opacity(matrixLayer, smooth(.56, .62, p) * (1 - smooth(.86, .9, p))); draw(matrixBorder, smooth(.58, .66, p)); opacity(matrixKey, smooth(.62, .68, p)); matrixPoints.forEach((point, index) => opacity(point, smooth(.72 + index * .004, .77 + index * .004, p)));
          opacity(selection, smooth(.84, .87, p)); opacity(middle, 1 - smooth(.88, .92, p)); draw(orbit, smooth(.84, .9, p)); opacity(final, smooth(.90, .94, p)); draw(tree, smooth(.91, .99, p));
          candidates.forEach(item => { const angle = (item.id - 1) / 12 * Math.PI * 2 - Math.PI / 2, q = smooth(.88, .97, p), destination = finalistPositions[item.id]; const x = 320 + Math.cos(angle) * 128, y = 260 + Math.sin(angle) * 128; at(item.node, destination ? mix(x, destination.x, q) : x + Math.cos(angle) * q * 70, destination ? mix(y, destination.y, q) : y + Math.sin(angle) * q * 70); opacity(item.node, destination ? 1 : 1 - smooth(.9, .96, p)); item.dot.setAttribute('r', mix(9, destination ? 22 : 9, q).toFixed(3)); opacity(item.label, destination ? smooth(.92, .97, p) : 0); opacity(item.halo, destination ? smooth(.92, .98, p) : 0); });
        }
      };
    }
  };

  // 4 · Team and AI compare the Innovation return (IR) of the three finalists.
  // Criteria, weights and effort contributions stay in the dossier of this chapter.
  const caseNames = { 9: 'RocketLight Dinner', 4: 'Starlink Insights', 8: 'Launch Engineering Cloud' };
  const caseData = () => [9, 4, 8].map(id => ({ id, name: caseNames[id], items: data().E.assessments.filter(item => item.assessment.idea === id) }));
  const irX = value => 230 + value / 2 * 340;
  scenes[4] = {
    markup() {
      const { E } = data(), cases = caseData(), team = E.rocketlightAssessments.find(item => item.assessment.id === 'rld-team');
      const summary = cases.map(item => `${item.name}: IR ${num(item.items[0].result.IR)}`).join('. ');
      return svg('finance', `Ursprüngliche Teamwertung zur Ideenauswahl. Innovationsrendite IR ist gewichteter Nutzen geteilt durch gewichteten Aufwand. ${summary}. Aufwand des festen Pavillons neu bewerten; keine finanzielle Rendite.`, `
        <g class="fa-ir-bars">
          <text class="fa-kicker" x="40" y="30">URSPRÜNGLICHE TEAMWERTUNG · IR</text>
          <text class="fa-method-footnote" x="40" y="58">IR = Nutzen ÷ Aufwand · Aufwand des festen Pavillons neu bewerten</text>
          ${[0, .5, 1, 1.5, 2].map(value => `<path class="fa-grid-line" d="M${irX(value)} 84V408"/><text class="fa-case-tick" x="${irX(value)}" y="428" text-anchor="middle">${num(value, 1)}</text>`).join('')}
          ${cases.map((item, index) => { const y = 120 + index * 100, teamIR = item.items[0].result.IR; return `<g class="fa-ir-case" data-ir-case="${index}">${lines(index === 2 ? ['Launch Engineering', 'Cloud'] : [item.name], 40, y + 20, 'fa-case-name', 22)}<rect class="fa-ir-team" data-ir-bar="${index}" data-width="${(irX(teamIR) - 230).toFixed(3)}" x="230" y="${y}" width="0" height="36" rx="3"/><text class="fa-ir-value fa-copper-text" data-ir-value="${index}" x="${irX(teamIR) + 10}" y="${y + 27}">${num(teamIR)}</text></g>`; }).join('')}
        </g>
        <g class="fa-ir-callout" opacity="0">
          <path class="fa-grid-line" d="M40 462H600"/>
          <text class="fa-method-note-strong fa-copper-text" x="40" y="500">RocketLight: ${num(team.result.IR)} · ursprüngliche Auswahl</text>
        </g>
        </g>
      `);
    },
    mount(root) {
      const bars = [...root.querySelectorAll('[data-ir-bar]')].map(bar => ({ bar, width: Number(bar.dataset.width), index: Number(bar.dataset.irBar) }));
      const values = [...root.querySelectorAll('[data-ir-value]')].map(text => ({ text, index: Number(text.dataset.irValue) }));
      const callout = root.querySelector('.fa-ir-callout');
      return {
        update(progress, context) {
          const p = pose(progress, context);
          bars.forEach(item => item.bar.setAttribute('width', (item.width * smooth(item.index * .03, .3 + item.index * .03, p)).toFixed(3)));
          values.forEach(item => opacity(item.text, smooth(.2 + item.index * .03, .4 + item.index * .03, p)));
          opacity(callout, smooth(.55, .66, p));
        }
      };
    }
  };
})();
