/* Scroll scenes 05 and 07. The film controller owns time, motion preference
 * and scrolling; these renderers only derive a visual state from progress. */
(() => {
  'use strict';
  const scenes = window.PitchScenes = window.PitchScenes || {};
  const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
  const smooth = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const n = value => Number(value.toFixed(3));
  const set = (node, property, value) => node.style.setProperty(property, String(value));
  const phaseAt = (progress, stops) => stops.reduce((active, stop, index) => progress >= stop ? index : active, 0);
  function showPhase(scene, views, names, index, opacity) {
    scene.dataset.feView = names[index];
    views.forEach((view, current) => {
      const active = current === index;
      view.style.display = active ? '' : 'none';
      view.setAttribute('aria-hidden', String(!active));
      set(view, 'opacity', active ? opacity : 0);
    });
  }

  // Editorial room concept: ten separate two-person tables. Every pair sits
  // landward and faces the same launch panorama; the plan is not a site survey.
  const diningTables = [
    {x:95,y:287},{x:205,y:261},{x:315,y:250},{x:425,y:261},{x:535,y:287},
    {x:68,y:405},{x:183,y:375},{x:298,y:363},{x:413,y:375},{x:528,y:405}
  ];
  const diningPhases = [0,.14,.28,.42,.62,.8];
  const diningViews = ['layout','panorama','price','scale','econ','sensitivity'];
  const diningDescriptions = [
    'Raumkonzept: zehn versetzte Zweiertische mit zwanzig Plätzen, alle auf das Startpanorama ausgerichtet. Konzeptvisualisierung ohne Standort- oder Entfernungszusage.',
    'Erlebniskonzept: sieben Gänge, Missionsbriefing, Service und gemeinsamer Blick auf den Launch.',
    'Preisannahmen: 35.000 US-Dollar je Gast im Pilot, langfristig bis zu 50.000 US-Dollar. Die Zahlungsbereitschaft ist noch zu prüfen.',
    'Modellannahme zum Zielpreis: 50.000 US-Dollar je Gast abzüglich 5.000 US-Dollar variabler Kosten ergeben 45.000 US-Dollar Deckungsbeitrag vor Investitionen, Fixkosten und Steuern.',
    'Fünfjahres-Basisszenario Florida 2027 bis 2031: 13,38 Millionen US-Dollar Gesamtprojektbudget, davon 11,60 Millionen Sachinvestitionen und 1,78 Millionen Entwicklung und Anlauf. Vier Piloten 2028 und 2029, zehn Dinner 2030 und sechzehn 2031. Umsatz 25,64 Millionen, Auszahlungen 20,04 Millionen. Kumuliert 5,60 Millionen Cashflow Ende 2031, vor Finanzierung und Steuern. Alle Mengen, Preise und Kosten sind Szenarioannahmen.',
    'Sensitivität im Regelbetrieb: Bei 90 Prozent Auslastung und 50.000 US-Dollar Preis ergeben sich 5,60 Millionen US-Dollar kumulierter Cashflow bis 2031. Bei 70 Prozent und 40.000 US-Dollar sind es minus 2,72 Millionen. Die vier Pilotannahmen bleiben gleich.'
  ];

  // One audited scenario drives the website and editable workbook. Outflows
  // include project investment, development/startup and ongoing operations.
  const econGeo = {base:285, k:8, xs:[100,210,320,430,540], width:23};
  const scaleGeo = {x:60, width:520};
  const de = (value, digits = 1) => value.toLocaleString('de-DE', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  const signed = value => (value > 0 ? '+' : value < 0 ? '−' : '') + de(Math.abs(value),2);
  function econMarkup(e) {
    const {base, k, xs, width} = econGeo;
    const points = e.annual.map((year,index)=>[xs[index],base-year.cumulativeCashFlow/1e6*k]);
    return `<g data-fe-econ class="fe-econ fe-finance">
      <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">2027–2031 · FLORIDA · BASISSZENARIO</text>
      <text class="fe-econ-label" x="158" y="65" text-anchor="middle">INVESTITION &amp; ANLAUF</text>
      <text class="fe-econ-total fe-econ-cost-label" x="158" y="119" text-anchor="middle">${de(e.budget.total/1e6,2)}</text>
      <text class="fe-econ-label" x="478" y="65" text-anchor="middle">CASHFLOW BIS 2031</text>
      <text class="fe-econ-total fe-econ-gain-label" data-fe-fin-total x="478" y="119" text-anchor="middle">0,00</text>
      <text class="fe-econ-unit" x="158" y="146" text-anchor="middle">MIO. USD · ARBEITSSZENARIO</text>
      <text class="fe-econ-unit" x="478" y="146" text-anchor="middle">MIO. USD · KUMULIERT</text>
      <path class="fe-fin-grid" d="M64 205H586M64 365H586"/>
      <path class="fe-econ-axis" d="M64 ${base}H586"/>
      <text class="fe-fin-tick" x="48" y="210" text-anchor="end">10</text>
      <text class="fe-fin-tick" x="48" y="290" text-anchor="end">0</text>
      <text class="fe-fin-tick" x="48" y="370" text-anchor="end">−10</text>
      ${e.annual.map((year,index)=>`<g>
        <rect class="fe-econ-gain" data-fe-fin-revenue="${index}" x="${xs[index]-width-2}" y="${base}" width="${width}" height="0"/>
        <rect class="fe-econ-cost" data-fe-fin-outflow="${index}" x="${xs[index]+2}" y="${base}" width="${width}" height="0"/>
        <text class="fe-fin-value" data-fe-fin-revenue-label="${index}" x="${xs[index]-width/2-2}" y="${base-10}" text-anchor="middle">${year.revenue?de(year.revenue/1e6,2):''}</text>
        <text class="fe-econ-year" x="${xs[index]}" y="426" text-anchor="middle">${year.year}</text>
        <text class="fe-fin-event" x="${xs[index]}" y="447" text-anchor="middle">${year.pilotEvents?year.pilotEvents+' Piloten':year.regularEvents?year.regularEvents+' Dinner':'Planung / Bau'}</text>
      </g>`).join('')}
      <path class="fe-finance-line" data-fe-fin-line pathLength="1" d="M${points.map(point=>point.map(n).join(' ')).join('L')}"/>
      ${points.map((point,index)=>`<circle class="fe-econ-dot" data-fe-fin-point="${index}" cx="${n(point[0])}" cy="${n(point[1])}" r="4"/>`).join('')}
      <g data-fe-fin-summary>
        <rect class="fe-econ-gain" x="48" y="473" width="12" height="12"/><text class="fe-fin-legend" x="68" y="484">Umsatz</text>
        <rect class="fe-econ-cost" x="181" y="473" width="12" height="12"/><text class="fe-fin-legend" x="201" y="484">Auszahlungen</text>
        <path class="fe-econ-key" d="M363 479H384"/><text class="fe-fin-legend" x="394" y="484">Cashflow kumuliert</text>
        <text class="fe-fin-note" x="320" y="512" text-anchor="middle">Mio. USD · vor Finanzierung und Steuern</text>
      </g>
    </g>`;
  }
  function sensitivityMarkup(e) {
    const cases=['base','downside'].map(id=>e.scenarios.find(s=>s.id===id));
    return `<g data-fe-sensitivity class="fe-sensitivity">
      <text class="fe-diagram-heading" x="320" y="40" text-anchor="middle">2031 · KUMULIERTER CASHFLOW</text>
      ${cases.map((scenario,index)=>{const y=100+index*164;return `<g data-fe-case="${index}" class="fe-case ${index?'is-downside':''}">
        <rect class="fe-case-panel" x="24" y="${y}" width="592" height="145" rx="12"/>
        <text class="fe-case-title" x="46" y="${y+35}">${index?'VORSICHTIG':'BASIS'}</text>
        <text class="fe-case-value" data-fe-case-value="${index}" x="587" y="${y+47}" text-anchor="end">0,00</text>
        <text class="fe-case-assumption" x="46" y="${y+72}">${de(scenario.regularOccupancy*100,0)} % Auslastung · ${de(scenario.regularPrice,0)} USD je Gast</text>
        <path class="fe-econ-axis" d="M62 ${y+107}H584"/>
        <path class="fe-case-zero" d="M300 ${y+89}V${y+126}"/>
        <rect class="fe-case-bar" data-fe-case-bar="${index}" x="300" y="${y+96}" width="0" height="23" rx="2"/>
      </g>`;}).join('')}
      <text class="fe-case-conclusion" x="320" y="459" text-anchor="middle">Die Piloten prüfen Preis und Nachfrage.</text>
      <text class="fe-fin-note" x="320" y="491" text-anchor="middle">Mio. USD · vor Finanzierung und Steuern</text>
    </g>`;
  }
  function scaleMarkup(e) {
    const {x, width} = scaleGeo;
    return `<g data-fe-scale class="fe-scale">
      <text class="fe-diagram-heading" x="320" y="86" text-anchor="middle">BEITRAG JE GAST · ZIELPREISMODELL</text>
      <text class="fe-econ-label" x="320" y="168" text-anchor="middle">DECKUNGSBEITRAG JE GAST · USD</text>
      <text class="fe-econ-total fe-econ-gain-label" data-fe-guest-total x="320" y="252" text-anchor="middle">0</text>
      <rect class="fe-scale-track" x="${x}" y="292" width="${width}" height="28"/>
      <rect class="fe-econ-gain" data-fe-guest-margin x="${x}" y="292" width="0" height="28"/>
      <rect class="fe-econ-cost" data-fe-guest-cost x="${x + width}" y="292" width="0" height="28"/>
      <text class="fe-econ-legend fe-econ-gain-label" x="${x}" y="354">DECKUNGSBEITRAG</text>
      <text class="fe-econ-legend fe-econ-cost-label" x="${x + width}" y="354" text-anchor="end">${de(e.variableCost, 0)} USD VARIABLE KOSTEN</text>
      <text class="fe-layout-note" x="320" y="404" text-anchor="middle">Zielpreis ${de(e.targetPrice, 0)} USD · Zahlungsbereitschaft offen</text>
      <text class="fe-econ-label" x="320" y="441" text-anchor="middle">VOR BAU, FIXKOSTEN UND STEUERN</text>
    </g>`;
  }

  function tableMarkup(table,index) {
    const rotation = Math.atan2(320-table.x,table.y-155)*180/Math.PI;
    return `<g transform="translate(${table.x} ${table.y}) rotate(${n(rotation)})">
      <g class="fe-dinner-table" data-fe-table="${index}">
        <ellipse class="fe-table-shadow" cy="19" rx="40" ry="18"/>
        <path class="fe-table-leg" d="M-17 6V29M17 6V29"/>
        <path class="fe-table-edge" d="M-38 0V7C-38 24 38 24 38 7V0"/>
        <ellipse class="fe-table-top" rx="38" ry="17"/>
        <ellipse class="fe-table-outline fe-table-trace" pathLength="1" rx="38" ry="17"/>
        ${[-16,16].map((x,seat)=>`<g data-fe-place="${index*2+seat}" class="fe-place" transform="translate(${x} 5)">
          <g transform="translate(0 23)"><path class="fe-chair" d="M-11-5V4Q-11 10-4 10H4Q11 10 11 4V-5M-11 4H11"/><path class="fe-chair-inner" d="M-8-4H8V3H-8Z"/><circle class="fe-guest" cy="-1" r="4.5"/></g>
          <ellipse class="fe-plate-light" rx="17" ry="11"/><ellipse class="fe-plate" rx="8.5" ry="5.5"/><ellipse class="fe-plate-inner" rx="5.5" ry="3.4"/>
          <path class="fe-cutlery" d="M-12-5V6M-14-5V-1H-10V-5M12-5V6"/>
        </g>`).join('')}
        <g class="fe-candle" transform="translate(0 -4)"><ellipse class="fe-candle-halo" rx="21" ry="13"/><path class="fe-candle-stem" d="M0 3V-5"/><path class="fe-candle-flame" d="M0-11C-3-7-3-5 0-5S3-7 0-11Z"/></g>
      </g>
    </g>`;
  }

  scenes[5] = {
    markup: () => `<div class="fe-scene fe-dining" role="group" aria-label="Vom Raumkonzept zum begründeten 5P-Mix.">
      <svg class="fe-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fe-table-surface" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a9d9d9" stop-opacity=".08"/><stop offset=".6" stop-color="#efbd91" stop-opacity=".19"/><stop offset="1" stop-color="#efbd91" stop-opacity=".04"/></linearGradient>
          <radialGradient id="fe-place-glow"><stop stop-color="#efbd91" stop-opacity=".42"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <radialGradient id="fe-candle-glow"><stop stop-color="#fff1ca" stop-opacity=".85"/><stop offset=".16" stop-color="#efbd91" stop-opacity=".35"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <radialGradient id="fe-launch-light"><stop stop-color="#ffe4b0" stop-opacity=".55"/><stop offset=".4" stop-color="#efbd91" stop-opacity=".12"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <linearGradient id="fe-rocket-metal"><stop stop-color="#5e727b"/><stop offset=".5" stop-color="#e6ece6"/><stop offset="1" stop-color="#526774"/></linearGradient>
          <linearGradient id="fe-market-line"><stop stop-color="#a9d9d9" stop-opacity=".55"/><stop offset="1" stop-color="#efbd91"/></linearGradient>
          <clipPath id="fe-experience-window"><rect x="37" y="65" width="566" height="286"/></clipPath>
          <clipPath id="fe-experience-launch"><rect data-fe-launch-clip x="603" y="65" width="0" height="286"/></clipPath>
          <linearGradient id="fe-experience-shade" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stop-color="#060b10" stop-opacity="0"/><stop offset="1" stop-color="#060b10" stop-opacity=".78"/></linearGradient>
        </defs>
        <g data-fe-layout>
          <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">10 TISCHE · 20 GÄSTE · FREIE SICHT</text>
          <g class="fe-launch-light" data-fe-launch-light><ellipse fill="url(#fe-launch-light)" cx="320" cy="170" rx="148" ry="75"/></g>
          <path class="fe-view-horizon" d="M62 177H270M370 177H578"/>
          <g class="fe-dining-rocket">
            <path class="fe-rocket-body" d="M320 50C309 64 306 78 306 93V166H334V93C334 78 331 64 320 50Z"/>
            <path class="fe-rocket-rings" d="M306 93H334M306 109H334M306 149H334M306 155 295 174H306M334 155 345 174H334"/>
            <path class="fe-rocket-plume" data-fe-plume d="M309 167Q311 187 320 201Q329 187 331 167Z"/>
            <path class="fe-dining-tower" d="M358 68V177M374 68V177M358 71 374 94 358 117 374 140 358 163M358 93H339M352 177H384"/>
          </g>
          <path class="fe-panorama-arc fe-table-trace" pathLength="1" d="M42 215Q320 157 598 215"/>
          <path class="fe-panorama-arc-back" d="M42 220Q320 162 598 220"/>
          <text class="fe-view-label" x="514" y="177" text-anchor="middle">STARTPANORAMA</text>
          <g class="fe-sightlines">${diningTables.map((table,index)=>`<path class="fe-sightline" data-fe-sightline="${index}" pathLength="1" d="M${table.x} ${table.y-10}Q${n((table.x+320)/2)} ${n((table.y+165)/2-10)} 320 170"/>`).join('')}</g>
          <path class="fe-terrace" d="M28 332Q320 263 612 332M28 340Q320 271 612 340"/>
          ${diningTables.map(tableMarkup).join('')}
          <text class="fe-layout-caption" x="320" y="480" text-anchor="middle">VERSATZ + LEICHTE TERRASSIERUNG</text>
          <text class="fe-layout-note" x="320" y="506" text-anchor="middle">Schematisches Raumkonzept · keine Entfernungsangabe</text>
        </g>
        <g data-fe-panorama class="fe-panorama">
          <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">EIN ABEND. EIN GEMEINSAMER BLICK.</text>
          <g clip-path="url(#fe-experience-window)">
            <image data-fe-menu class="fe-window-image" href="assets/mission-menu.webp" x="37" y="65" width="566" height="286" preserveAspectRatio="xMidYMid slice"/>
            <image data-fe-service class="fe-window-image" href="assets/chef.webp" x="37" y="65" width="566" height="286" preserveAspectRatio="xMidYMid slice"/>
            <g clip-path="url(#fe-experience-launch)"><image class="fe-window-image" href="assets/dining-facing-launch.webp" x="385" y="65" width="218" height="286" preserveAspectRatio="xMaxYMid slice"/></g>
            <rect class="fe-window-shade" x="37" y="65" width="566" height="286" fill="url(#fe-experience-shade)"/>
            <path data-fe-window-divider class="fe-window-divider" d="M603 65V351" opacity="0"/>
            <text class="fe-window-label" x="57" y="325">MENÜ &amp; SERVICE</text>
            <text data-fe-window-view-label class="fe-window-label fe-window-view-label" x="584" y="325" text-anchor="end" opacity="0">STARTBLICK</text>
            <text class="fe-window-concept" x="57" y="88">KONZEPTVISUALISIERUNG</text>
          </g>
          <path class="fe-window-frame" d="M37 65V351M603 65V351M37 65H603"/>
          <path class="fe-window-base" d="M37 351H603"/>
          <g class="fe-courses">
            <path class="fe-course-guide" d="M68 430H572"/>
            <path class="fe-course-line" pathLength="1" d="M68 430H572"/>
            ${Array.from({length:7},(_,index)=>`<g class="fe-course" data-fe-course="${index}" transform="translate(${68+index*84} 430)"><circle class="fe-course-ring" r="15"/><circle class="fe-course-dot" r="3"/><text y="40" text-anchor="middle">0${index+1}</text></g>`).join('')}
            <text class="fe-course-caption" x="320" y="508" text-anchor="middle">7 GÄNGE · MISSIONSBRIEFING · LAUNCH</text>
          </g>
        </g>
        <g data-fe-price class="fe-price">
          <text class="fe-diagram-heading" x="320" y="47" text-anchor="middle">EXKLUSIVITÄT BRAUCHT NACHFRAGE</text>
          <path class="fe-price-orbit" d="M61 271Q320 15 579 271M61 271Q320 506 579 271"/>
          <text class="fe-price-label" x="161" y="203" text-anchor="middle">PILOT</text>
          <text class="fe-price-value" x="161" y="277" text-anchor="middle">35.000</text>
          <text class="fe-price-label fe-price-target-label" x="478" y="203" text-anchor="middle">ZIELPREIS BIS ZU</text>
          <text class="fe-price-value" x="478" y="277" text-anchor="middle">50.000</text>
          <path class="fe-price-connector" pathLength="1" d="M264 258H374M362 250L374 258 362 266"/>
          <text class="fe-price-unit" x="320" y="321" text-anchor="middle">USD JE GAST</text>
          <text class="fe-price-validation" x="320" y="401" text-anchor="middle">ZAHLUNGSBEREITSCHAFT IM PILOT PRÜFEN</text>
        </g>
        ${econMarkup(window.PitchEvidence.fixedFinance)}
        ${scaleMarkup(window.PitchEvidence.fixedPilot)}
        ${sensitivityMarkup(window.PitchEvidence.fixedFinance)}
      </svg>
    </div>`,
    mount(root) {
      const scene = root.querySelector('.fe-dining');
      const layout = root.querySelector('[data-fe-layout]');
      const tables = Array.from(root.querySelectorAll('[data-fe-table]'));
      const traces = Array.from(root.querySelectorAll('.fe-table-trace'));
      const places = Array.from(root.querySelectorAll('[data-fe-place]'));
      const rays = Array.from(root.querySelectorAll('[data-fe-sightline]'));
      const light = root.querySelector('[data-fe-launch-light]');
      const plume = root.querySelector('[data-fe-plume]');
      const panorama = root.querySelector('[data-fe-panorama]');
      const menuImage = root.querySelector('[data-fe-menu]');
      const serviceImage = root.querySelector('[data-fe-service]');
      const launchClip = root.querySelector('[data-fe-launch-clip]');
      const windowDivider = root.querySelector('[data-fe-window-divider]');
      const windowViewLabel = root.querySelector('[data-fe-window-view-label]');
      const courses = Array.from(root.querySelectorAll('[data-fe-course]'));
      const courseLine = root.querySelector('.fe-course-line');
      const price = root.querySelector('[data-fe-price]');
      const priceLine = root.querySelector('.fe-price-connector');
      const views = [layout, panorama, price, root.querySelector('[data-fe-scale]'), root.querySelector('[data-fe-econ]'), root.querySelector('[data-fe-sensitivity]')];
      const model = window.PitchEvidence.fixedPilot;
      const finance = window.PitchEvidence.fixedFinance;
      const all = selector => Array.from(root.querySelectorAll(selector));
      const revenueBars = all('[data-fe-fin-revenue]'), outflowBars = all('[data-fe-fin-outflow]');
      const revenueLabels = all('[data-fe-fin-revenue-label]'), financePoints = all('[data-fe-fin-point]');
      const financeTotal = root.querySelector('[data-fe-fin-total]'), financeLine = root.querySelector('[data-fe-fin-line]');
      const financeSummary = root.querySelector('[data-fe-fin-summary]');
      const caseValues = all('[data-fe-case-value]'), caseBars = all('[data-fe-case-bar]'), caseGroups = all('[data-fe-case]');
      const cases = ['base','downside'].map(id=>finance.scenarios.find(s=>s.id===id));
      const guestTotal = root.querySelector('[data-fe-guest-total]');
      const guestMargin = root.querySelector('[data-fe-guest-margin]'), guestCost = root.querySelector('[data-fe-guest-cost]');
      let last = '';
      return {
        update(progress, context = {}) {
          const p = context.reduced ? 1 : clamp(progress);
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.mobile)}|${Boolean(context.static)}`;
          if (key === last) return;
          last = key;
          const phase = phaseAt(p, diningPhases);
          const reveal = context.static || phase===0 ? 1 : smooth(diningPhases[phase], diningPhases[phase]+.025, p);
          showPhase(scene, views, diningViews, phase, n(reveal));
          scene.setAttribute('aria-label', diningDescriptions[phase]);
          // Keep the original room and experience choreography in their shorter
          // slots. All content has settled by the navigation's fixed still point.
          const roomP = .28*clamp(p/.12);
          const experienceP = .31+.24*clamp((p-.14)/.12);
          const priceP = .57+.17*clamp((p-.28)/.12);
          set(scene,'--fe-table-fill',n(.2+.8*smooth(0,.21,roomP)));
          tables.forEach((table,index)=>{
            const arrival = smooth(index*.012,.07+index*.012,roomP);
            set(table,'opacity',n(arrival));
            table.setAttribute('transform',`translate(0 ${n(13*(1-arrival))})`);
          });
          traces.forEach((trace,index)=>set(trace,'stroke-dashoffset',n(1-smooth(index*.009,.13+index*.009,roomP))));
          places.forEach((place,index)=>set(place,'opacity',n(smooth(.045+index*.006,.11+index*.006,roomP))));
          rays.forEach((ray,index)=>set(ray,'stroke-dashoffset',n(1-smooth(.12+index*.005,.23+index*.005,roomP))));
          set(light,'opacity',n(smooth(.12,.27,roomP)));
          set(plume,'opacity',n(.12+.88*smooth(.17,.28,roomP)));
          set(serviceImage,'opacity',n(1-smooth(.33,.385,experienceP)));
          const menuZoom=1+.065*(1-smooth(.34,.53,experienceP));
          menuImage.setAttribute('transform',`translate(320 208) scale(${n(menuZoom)}) translate(-320 -208)`);
          const viewReveal=smooth(.43,.515,experienceP),viewWidth=218*viewReveal,viewEdge=603-viewWidth;
          launchClip.setAttribute('x',n(viewEdge));launchClip.setAttribute('width',n(viewWidth));
          windowDivider.setAttribute('d',`M${n(viewEdge)} 65V351`);set(windowDivider,'opacity',n(viewReveal));
          set(windowViewLabel,'opacity',n(smooth(.47,.52,experienceP)));
          set(courseLine,'stroke-dashoffset',n(1-smooth(.35,.52,experienceP)));
          courses.forEach((course,index)=>set(course,'--fe-course-lit',n(smooth(.34+index*.022,.39+index*.022,experienceP))));
          set(priceLine,'stroke-dashoffset',n(1-smooth(.63,.73,priceP)));
          // Revenue arrives first, investment and operating outflows follow;
          // the cumulative cash curve then connects the five annual results.
          const econT = context.static ? 1 : clamp((p-diningPhases[4])/((diningPhases[5]-diningPhases[4])*.8));
          revenueBars.forEach((bar,index)=>{
            const grow=smooth(.02+index*.045,.28+index*.045,econT);
            const height=finance.annual[index].revenue/1e6*econGeo.k*grow;
            bar.setAttribute('y',n(econGeo.base-height));bar.setAttribute('height',n(height));
            revenueLabels[index].setAttribute('y',n(econGeo.base-height-10));
            set(revenueLabels[index],'opacity',n(grow));
          });
          outflowBars.forEach((bar,index)=>bar.setAttribute('height',n(finance.annual[index].totalOutflows/1e6*econGeo.k*smooth(.34+index*.035,.55+index*.035,econT))));
          const lineT=smooth(.66,.97,econT);
          set(financeLine,'stroke-dashoffset',n(1-lineT));
          financePoints.forEach((point,index)=>set(point,'opacity',n(smooth(index/5,index/5+.16,lineT))));
          financeTotal.textContent=signed(finance.totals.cumulativeCashFlow/1e6*smooth(.72,.98,econT));
          set(financeSummary,'opacity',n(smooth(.12,.48,econT)));
          const scaleT = context.static ? 1 : clamp((p-diningPhases[3])/((diningPhases[4]-diningPhases[3])*.8));
          const marginT = smooth(.05,.3,scaleT), costT = smooth(.3,.42,scaleT);
          const marginShare = 1-model.variableCost/model.targetPrice;
          guestMargin.setAttribute('width',n(scaleGeo.width*marginShare*marginT));
          guestCost.setAttribute('x',n(scaleGeo.x+scaleGeo.width*marginShare*marginT));
          guestCost.setAttribute('width',n(scaleGeo.width*(1-marginShare)*costT));
          guestTotal.textContent = de((model.targetPrice-model.variableCost)*marginT,0);
          const caseT=context.static?1:clamp((p-diningPhases[5])/((1-diningPhases[5])*.8));
          cases.forEach((scenario,index)=>{
            const grow=smooth(index*.26,.45+index*.26,caseT);
            const value=scenario.totals.cumulativeCashFlow/1e6;
            caseValues[index].textContent=signed(value*grow);
            caseBars[index].setAttribute('x',n(300+Math.min(0,value)*42*grow));
            caseBars[index].setAttribute('width',n(Math.abs(value)*42*grow));
            set(caseGroups[index],'opacity',n(.25+.75*grow));
          });
        }
      };
    }
  };

  // Chapter 7: one SVG, two animations. First the Hube model's six fields and the
  // selection of "Kompetenzen", then the focus field gives rise to three ideas.
  const focusFields = [
    {name:['Strategie'],x:320,y:85},{name:['Foresight'],x:498,y:168},{name:['Führung /','Kultur'],x:498,y:332},
    {name:['Kompetenzen'],x:320,y:415},{name:['Prozesse'],x:142,y:332},{name:['Struktur'],x:142,y:168}
  ];
  const focusIndex = 3, focusHome = {x:112,y:250};
  const focusCards = [
    {title:'Jobrotation',lines:['3–6 Monate zwischen','Bereichen'],icon:'<path d="M7 14a9 9 0 0 1 15-5l3 3M25 18a9 9 0 0 1-15 5l-3-3M25 6v6h-6M7 26v-6h6"/>',y:105},
    {title:'Food4Thought',lines:['Format zum','Wissensaustausch'],icon:'<path d="M5 17h22a11 11 0 0 1-22 0ZM10 12c0-3 3-3 3-6M17 12c0-3 3-3 3-6"/>',y:250},
    {title:'Tandemlearning',lines:['Erfahrene und Neue','lernen voneinander'],icon:'<circle cx="11" cy="10" r="4"/><circle cx="22" cy="13" r="3"/><path d="M4 26c0-5 3-8 7-8s7 3 7 8M17 26c0-4 2-6 5-6s5 2 5 6"/>',y:395}
  ];
  const cardX = 262, cardW = 366, cardH = 108;

  scenes[7] = {
    markup: () => `<div class="fe-scene fe-focus" role="group" aria-label="Fokus auf Kompetenzen im Innovationsmanagement mit drei Ideen: Jobrotation, Food4Thought und Tandemlearning.">
      <svg class="fe-svg fe-focus-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <defs><radialGradient id="fe-focus-glow"><stop stop-color="#efbd91" stop-opacity=".55"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient></defs>
        <g data-fe-model>
          <ellipse class="fe-focus-ring" cx="320" cy="250" rx="205" ry="165"/>
          ${focusFields.map((f,i)=>`<path class="fe-focus-link" data-fe-link="${i}" d="M320 250L${f.x} ${f.y}"/>`).join('')}
          <g data-fe-core><circle class="fe-focus-core" cx="320" cy="250" r="50"/>
            <text class="fe-focus-core-title" x="320" y="247" text-anchor="middle">Innovation</text>
            <text class="fe-focus-core-formula" x="320" y="268" text-anchor="middle">I = N × U</text></g>
        </g>
        ${focusFields.map((f,i)=>`<g class="fe-focus-field${i===focusIndex?' is-focus':''}" data-fe-field="${i}" data-x="${f.x}" data-y="${f.y}">
          <circle class="fe-focus-halo" r="84"/>
          <circle class="fe-focus-disc" r="60"/>
          ${i===focusIndex?'<circle class="fe-focus-fill" r="60"/>':''}
          ${f.name.map((line,row)=>`<text class="fe-focus-label" y="${6+(row-(f.name.length-1)/2)*20}" text-anchor="middle">${line}</text>`).join('')}
        </g>`).join('')}
        ${focusCards.map((c,i)=>`<path class="fe-focus-idea-link" data-fe-idea-link="${i}" pathLength="1" d="M${focusHome.x+72} ${focusHome.y}C${cardX-50} ${focusHome.y} ${cardX-50} ${c.y} ${cardX} ${c.y}"/>`).join('')}
        ${focusCards.map((c,i)=>`<g class="fe-focus-card" data-fe-card="${i}" transform="translate(${cardX} ${c.y-cardH/2})">
          <rect width="${cardW}" height="${cardH}" rx="14"/>
          <g class="fe-focus-icon" transform="translate(24 ${cardH/2-24}) scale(1.5)">${c.icon}</g>
          <text class="fe-focus-card-title" x="92" y="${cardH/2-8}">${c.title}</text>
          ${c.lines.map((line,row)=>`<text class="fe-focus-card-text" x="92" y="${cardH/2+17+row*20}">${line}</text>`).join('')}
        </g>`).join('')}
      </svg>
    </div>`,
    mount(root) {
      const fields = Array.from(root.querySelectorAll('[data-fe-field]'));
      const links = Array.from(root.querySelectorAll('[data-fe-link]'));
      const model = root.querySelector('[data-fe-model]');
      const fill = root.querySelector('.fe-focus-fill');
      const halo = root.querySelector('.fe-focus-field.is-focus .fe-focus-halo');
      const ideaLinks = Array.from(root.querySelectorAll('[data-fe-idea-link]'));
      const cards = Array.from(root.querySelectorAll('[data-fe-card]'));
      let last = '';
      return {
        update(progress, context = {}) {
          const p = context.reduced ? 1 : clamp(progress);
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.static)}`;
          if (key === last) return;
          last = key;
          const select = smooth(.22,.4,p);
          const move = smooth(.52,.68,p);
          const rest = (1-.55*select)*(1-smooth(.5,.62,p));
          set(model,'opacity',n(rest));
          fields.forEach((field,i)=>{
            const own = Number(field.dataset.x), ownY = Number(field.dataset.y);
            const arrival = smooth(.02+i*.025,.14+i*.025,p);
            if (i===focusIndex) {
              const x = lerp(own,focusHome.x,move), y = lerp(ownY,focusHome.y,move);
              field.setAttribute('transform',`translate(${n(x)} ${n(y)}) scale(${n((.9+.1*arrival)*(1+.3*move))})`);
              set(field,'opacity',n(arrival));
            } else {
              field.setAttribute('transform',`translate(${own} ${ownY}) scale(${n(.9+.1*arrival)})`);
              set(field,'opacity',n(arrival*rest));
            }
          });
          links.forEach((link,i)=>set(link,'opacity',n(smooth(.1+i*.02,.2+i*.02,p))));
          set(fill,'opacity',n(select));
          set(halo,'opacity',n(select*(1-.5*move)));
          cards.forEach((card,i)=>{
            const reveal = smooth(.66+i*.09,.78+i*.09,p);
            set(card,'opacity',n(reveal));
            card.style.translate = `${n(22*(1-reveal))}px 0`;
          });
          ideaLinks.forEach((link,i)=>{
            set(link,'stroke-dashoffset',n(1-smooth(.62+i*.09,.76+i*.09,p)));
            set(link,'opacity',n(smooth(.6,.64,p)));
          });
        }
      };
    }
  };
})();
