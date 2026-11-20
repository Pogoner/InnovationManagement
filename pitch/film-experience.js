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
  const diningPhases = [0,.16,.32,.48,.65,.82];
  const diningViews = ['layout','panorama','price','econ','scale','invite'];
  const diningDescriptions = [
    'Raumkonzept: zehn versetzte Zweiertische mit zwanzig Plätzen, alle auf das Startpanorama ausgerichtet. Konzeptvisualisierung ohne Standort- oder Entfernungszusage.',
    'Erlebniskonzept: sieben Gänge, Missionsbriefing, Service und gemeinsamer Blick auf den Launch.',
    'Preisannahmen: 35.000 US-Dollar je Gast im Pilot, langfristig bis zu 50.000 US-Dollar. Die Zahlungsbereitschaft ist noch zu prüfen.',
    'Erwartete Kosten und Gewinne über fünf Jahre: Gewinn und F&E-Kosten je Jahr, kumuliert ab Jahr 4 im Plus. Modellannahmen aus dem Inno-Rendite-Kalkulator.',
    'Hohe Marge je Gast: Bei 50.000 US-Dollar Preis bleiben etwa 45.000 US-Dollar Deckungsbeitrag. Modellannahmen.',
    'Einladung zum Pilotdinner: Über den QR-Code wählen die Zuhörer Avatar, Menü und ein optionales Extra. Es gibt keine Zahlung.'
  ];

  // QR code for the booking page next to the pitch; the library is vendored (pitch/vendor/qrcode.js).
  function inviteMarkup() {
    const url = new URL('buchen.html', document.baseURI).href;
    let code = '';
    if (window.qrcode) {
      const qr = window.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      const count = qr.getModuleCount(), cell = 232 / count;
      let path = '';
      for (let row = 0; row < count; row++) for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) path += `M${n(204 + col * cell)} ${n(86 + row * cell)}h${n(cell + .3)}v${n(cell + .3)}h${n(-cell - .3)}z`;
      }
      code = `<rect x="188" y="70" width="264" height="264" rx="10" fill="#eff3ed"/><path d="${path}" fill="#060b10"/>`;
    }
    return `<g data-fe-invite class="fe-invite">
      <text class="fe-diagram-heading" x="320" y="38" text-anchor="middle">SIE SIND ZUM PILOTDINNER EINGELADEN</text>
      <g data-fe-qr>${code}</g>
      <text class="fe-invite-action" x="320" y="378" text-anchor="middle">SCANNEN · MENÜ WÄHLEN</text>
      <text class="fe-invite-url" x="320" y="412" text-anchor="middle">${url.replace(/^https?:\/\//, '')}</text>
      <text class="fe-layout-note" x="320" y="462" text-anchor="middle">Eine Minute · keine Zahlung · Ihre Wahl erscheint gleich im Pitch</text>
    </g>`;
  }

  // Five-year model of the Rendite-Kalkulator (sheet "5-Jahres-Kalkulation"). The
  // totals come from the frozen evidence; the per-guest split is the workbook's
  // plausibility check (cells B50:B54) and is not part of the Hube method.
  const guestCosts = {menu:2000, service:3000};
  const econGeo = {base:300, k:16, xs:[110,215,320,425,530], width:38};
  const scaleGeo = {x:60, width:520};
  const de = (value, digits = 1) => value.toLocaleString('de-DE', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  function economics() {
    const {financialA, financialAssessmentA, base} = window.PitchEvidence;
    const mio = value => value / 1e6;
    const profit = financialA.profit.map(mio), cost = financialA.rnd.map(mio), revenue = financialA.revenue.map(mio);
    let gained = 0, spent = 0;
    const cumulative = profit.map((value, index) => { gained += value; spent += cost[index]; return gained - spent; });
    const price = financialAssessmentA.fy.price[2];
    const variable = guestCosts.menu + guestCosts.service;
    return {profit, cost, revenue, cumulative, gain:mio(financialA.P), spend:mio(financialA.C), pShare:financialA.pShare, cShare:financialA.cShare,
      companyProfit:base.profit, companyRnd:base.rnd, price, variable, margin:(price - variable) / price, guests:financialAssessmentA.fy.qty.reduce((a, b) => a + b, 0)};
  }
  function econMarkup(e) {
    const {base, k, xs, width} = econGeo;
    const points = e.cumulative.map((value, index) => [xs[index], base - value * k]);
    const turn = e.cumulative.findIndex(value => value >= 0);
    const share = -e.cumulative[turn - 1] / (e.cumulative[turn] - e.cumulative[turn - 1]);
    const crossX = xs[turn - 1] + share * (xs[turn] - xs[turn - 1]);
    return `<g data-fe-econ class="fe-econ">
      <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">ERWARTETE KOSTEN UND GEWINNE</text>
      <text class="fe-econ-label fe-econ-gain-label" x="170" y="76" text-anchor="middle">GEWINN · 5 JAHRE</text>
      <text class="fe-econ-total fe-econ-gain-label" data-fe-gain-total x="170" y="132" text-anchor="middle">0,0</text>
      <text class="fe-econ-label fe-econ-cost-label" x="470" y="76" text-anchor="middle">F&amp;E-KOSTEN · 5 JAHRE</text>
      <text class="fe-econ-total fe-econ-cost-label" data-fe-cost-total x="470" y="132" text-anchor="middle">0,0</text>
      <text class="fe-econ-unit" x="170" y="158" text-anchor="middle">MIO. USD</text>
      <text class="fe-econ-unit" x="470" y="158" text-anchor="middle">MIO. USD</text>
      <path class="fe-econ-axis" d="M60 ${base}H600"/>
      ${e.profit.map((value, index) => `<rect class="fe-econ-gain" data-fe-gain="${index}" x="${xs[index] - width / 2}" y="${base}" width="${width}" height="0"/>`).join('')}
      ${e.cost.map((value, index) => `<rect class="fe-econ-cost" data-fe-cost="${index}" x="${xs[index] - width / 2}" y="${base}" width="${width}" height="0"/>`).join('')}
      <path class="fe-econ-line" data-fe-cumulative pathLength="1" d="M${points.map(point => point.map(n).join(' ')).join('L')}"/>
      ${points.map((point, index) => `<circle class="fe-econ-dot" data-fe-cum-dot="${index}" cx="${n(point[0])}" cy="${n(point[1])}" r="3.5"/>`).join('')}
      <g data-fe-breakeven class="fe-econ-breakeven"><circle cx="${n(crossX)}" cy="${base}" r="7"/><text x="${n(crossX + 14)}" y="${base + 30}">IM PLUS AB JAHR ${turn + 1}</text></g>
      ${xs.map((x, index) => `<text class="fe-econ-year" x="${x}" y="366" text-anchor="middle">JAHR ${index + 1}</text>`).join('')}
      ${e.revenue.map((value, index) => `<text class="fe-econ-revenue" data-fe-revenue="${index}" x="${xs[index]}" y="398" text-anchor="middle">${value > 0 ? de(value) : '–'}</text>`).join('')}
      <text class="fe-econ-unit" x="320" y="424" text-anchor="middle">UMSATZ JE JAHR IN MIO. USD · ${e.guests} GÄSTE</text>
      <path class="fe-econ-key" d="M92 452H112" /><text class="fe-econ-legend" x="120" y="456">KUMULIERT: GEWINN − F&amp;E</text>
      <text class="fe-layout-note" x="320" y="490" text-anchor="middle">Gewinn = Umsatz × Konzernmarge 24,3 % · F&amp;E ohne laufenden Eventbetrieb</text>
      <text class="fe-layout-note" x="320" y="512" text-anchor="middle">Modellannahmen · Zahlungsbereitschaft noch nicht getestet</text>
    </g>`;
  }
  function scaleMarkup(e) {
    const {x, width} = scaleGeo;
    const costShare = e.variable / e.price;
    const costWidth = width * costShare;
    return `<g data-fe-scale class="fe-scale" transform="translate(0 70)">
      <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">HOHE MARGE. KLEINE GRÖSSE.</text>
      <text class="fe-econ-label" x="320" y="70" text-anchor="middle">DECKUNGSBEITRAG JE GAST · USD</text>
      <text class="fe-econ-total fe-econ-gain-label" data-fe-guest-total x="320" y="128" text-anchor="middle">0</text>
      <rect class="fe-scale-track" x="${x}" y="150" width="${width}" height="24"/>
      <rect class="fe-econ-gain" data-fe-guest-margin x="${x}" y="150" width="0" height="24"/>
      <rect class="fe-econ-cost" data-fe-guest-cost x="${x + width}" y="150" width="0" height="24"/>
      <text class="fe-econ-legend fe-econ-gain-label" x="${x}" y="198">${de(e.margin * 100, 0)} % BLEIBEN</text>
      <text class="fe-econ-legend fe-econ-cost-label" x="${x + width}" y="198" text-anchor="end">${de(e.variable, 0)} USD VARIABLE KOSTEN</text>
      <text class="fe-layout-note" x="320" y="224" text-anchor="middle">Preis ${de(e.price, 0)} USD · Menü 2.000 · Logistik, Sicherheit, Service 3.000</text>
      <text class="fe-layout-note" x="320" y="262" text-anchor="middle">Modellannahmen · KI-gestützt recherchiert</text>
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
            <image data-fe-service class="fe-window-image" href="../teil6/chef.webp" x="37" y="65" width="566" height="286" preserveAspectRatio="xMidYMid slice"/>
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
          <text class="fe-layout-note" x="320" y="432" text-anchor="middle">Modellannahmen · kein buchbares Angebot</text>
        </g>
        ${econMarkup(economics())}
        ${scaleMarkup(economics())}
        ${inviteMarkup()}
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
      const views = [layout, panorama, price, root.querySelector('[data-fe-econ]'), root.querySelector('[data-fe-scale]'), root.querySelector('[data-fe-invite]')];
      const model = economics();
      const all = selector => Array.from(root.querySelectorAll(selector));
      const gainBars = all('[data-fe-gain]'), costBars = all('[data-fe-cost]'), revenueLabels = all('[data-fe-revenue]');
      const cumulativeLine = root.querySelector('[data-fe-cumulative]'), cumulativeDots = all('[data-fe-cum-dot]');
      const breakEven = root.querySelector('[data-fe-breakeven]');
      const gainTotal = root.querySelector('[data-fe-gain-total]'), costTotal = root.querySelector('[data-fe-cost-total]');
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
          const roomP = .28*clamp(p/.13);
          const experienceP = .31+.24*clamp((p-.16)/.13);
          const priceP = .57+.17*clamp((p-.32)/.13);
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
          // The two economics views settle at 80 % of their slot, before the navigation's still point.
          const econT = context.static ? 1 : clamp((p-diningPhases[3])/((diningPhases[4]-diningPhases[3])*.8));
          let gainSum = 0, costSum = 0;
          gainBars.forEach((bar,index)=>{
            const grow = smooth(.04+index*.08,.16+index*.08,econT);
            const height = model.profit[index]*econGeo.k*grow;
            gainSum += model.profit[index]*grow;
            bar.setAttribute('y',n(econGeo.base-height));bar.setAttribute('height',n(height));
            set(revenueLabels[index],'opacity',n(smooth(.05+index*.08,.14+index*.08,econT)));
          });
          costBars.forEach((bar,index)=>{
            const grow = smooth(.42+index*.05,.54+index*.05,econT);
            costSum += model.cost[index]*grow;
            bar.setAttribute('height',n(model.cost[index]*econGeo.k*grow));
          });
          gainTotal.textContent = de(gainSum);
          costTotal.textContent = de(costSum);
          const lineT = smooth(.72,.94,econT);
          set(cumulativeLine,'stroke-dashoffset',n(1-lineT));
          cumulativeDots.forEach((dot,index)=>set(dot,'opacity',n(smooth(index/4-.02,index/4+.02,lineT))));
          set(breakEven,'opacity',n(smooth(.9,.98,econT)));
          const scaleT = context.static ? 1 : clamp((p-diningPhases[4])/((diningPhases[5]-diningPhases[4])*.8));
          const marginT = smooth(.05,.3,scaleT), costT = smooth(.3,.42,scaleT);
          const marginShare = 1-model.variable/model.price;
          guestMargin.setAttribute('width',n(scaleGeo.width*marginShare*marginT));
          guestCost.setAttribute('x',n(scaleGeo.x+scaleGeo.width*marginShare*marginT));
          guestCost.setAttribute('width',n(scaleGeo.width*(1-marginShare)*costT));
          guestTotal.textContent = de((model.price-model.variable)*marginT,0);
        }
      };
    }
  };

  const enginePositions = [
    {x:115,y:178,tx:304,ty:351,labelX:60,labelY:94,title:'Sicherheit',line:'Fehler ohne Angst'},
    {x:525,y:178,tx:320,ty:351,labelX:414,labelY:94,title:'Austausch',line:'Wissen bleibt'},
    {x:115,y:351,tx:336,ty:351,labelX:60,labelY:433,title:'Gates',line:'Früh entscheiden'}
  ];
  const systemPhases = [0,.25,.5,.78];
  const systemViews = ['safety','exchange','gates','engines'];
  // Hube model (see source slides): six fields around "Innovation", one highlighted.
  const modelFields = [
    {name:['Strategie'],x:200,y:57},{name:['Foresight'],x:293,y:111},{name:['Führung /','Kultur'],x:293,y:219},
    {name:['Kompetenzen'],x:200,y:273},{name:['Prozesse'],x:107,y:219},{name:['Struktur'],x:107,y:111}
  ];
  const modelMarkup = active => `<svg class="fe-model" viewBox="0 0 400 330" aria-hidden="true" focusable="false">
    <ellipse class="fe-model-ring" cx="200" cy="165" rx="192" ry="158"/>
    ${modelFields.map(f=>`<path class="fe-model-link" d="M200 165L${f.x} ${f.y}"/>`).join('')}
    ${modelFields.map((f,i)=>`<g class="fe-model-field${i===active?' is-active':''}"><circle cx="${f.x}" cy="${f.y}" r="37"/>${f.name.map((line,row)=>`<text x="${f.x}" y="${f.y+4+(row-(f.name.length-1)/2)*13}" text-anchor="middle">${line}</text>`).join('')}</g>`).join('')}
    <circle class="fe-model-core" cx="200" cy="165" r="42"/>
    <text class="fe-model-core-title" x="200" y="162" text-anchor="middle">Innovation</text>
    <text class="fe-model-core-formula" x="200" y="180" text-anchor="middle">I = N × U</text>
  </svg>`;
  const approachMarkup = ({view,hidden,kicker,title,active,idea,chips}) => `<section class="fe-method-panel fe-approach fe-${view}" data-fe-${view}${hidden?' aria-hidden="true"':''}>
    <p class="fe-method-kicker">${kicker}</p>
    <h3>${title}</h3>
    <div class="fe-approach-body">
      ${modelMarkup(active)}
      <div class="fe-approach-copy"><p class="fe-approach-idea">${idea}</p><ol class="fe-chips">${chips.map(([lead,text])=>`<li><strong>${lead}</strong><span>${text}</span></li>`).join('')}</ol></div>
    </div>
  </section>`;

  scenes[7] = {
    markup: () => `<div class="fe-scene fe-system" role="group"     aria-label="Drei konkrete Ansätze für das Innovationsmanagement von SpaceX.">
${approachMarkup({view:'safety',kicker:'Ansatz 01 · DÜRFEN / WOLLEN · Kultur',title:'Psychologische Sicherheit',active:2,idea:'Fehler und Kritik ohne Angst vor Bestrafung. Wie bei Hardware-Tests.',chips:[['Blameless Review','Ursachen statt Schuldige'],['Kritik-Kanal','direkt oder anonym'],['Pulsbefragung','zweimal im Jahr']]})}
      ${approachMarkup({view:'exchange',hidden:true,kicker:'Ansatz 02 · KÖNNEN · Kompetenzen',title:'Austausch zwischen Bereichen',active:3,idea:'Wissen darf nicht mit der Fluktuation verloren gehen.',chips:[['Rotation','3–6 Monate in einem anderen Bereich'],['Learning Review','Erkenntnisse teilen'],['Tandems','erfahren + neu']]})}
      ${approachMarkup({view:'gates',hidden:true,kicker:'Ansatz 03 · MACHEN · Prozesse',title:'Klare Go-/No-go-Gates',active:4,idea:'Drei Entscheidungspunkte. Jedes Mal: Go, Anpassen oder Stopp.',chips:[['Gate 1 · Idee','Kunde &amp; Markt'],['Gate 2 · Konzept','Machbarkeit'],['Gate 3 · Pilot','Wirtschaftlichkeit &amp; Umsetzung']]})}
      <svg class="fe-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fe-vehicle-metal"><stop stop-color="#647782"/><stop offset=".38" stop-color="#eff3ed"/><stop offset=".64" stop-color="#a9b6bc"/><stop offset="1" stop-color="#40535f"/></linearGradient>
          <radialGradient id="fe-engine-glow"><stop stop-color="#fff2d1" stop-opacity=".75"/><stop offset=".26" stop-color="#efbd91" stop-opacity=".3"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <radialGradient id="fe-engine-interior"><stop stop-color="#fff0d3"/><stop offset=".34" stop-color="#efbd91"/><stop offset="1" stop-color="#b36e43" stop-opacity=".1"/></radialGradient>
        </defs>
        <g data-fe-engines>
        <path class="fe-system-axis" d="M320 25V467M222 361H418"/>
        <path class="fe-system-ground" d="M220 361H420M250 367H390"/>
        <path class="fe-vehicle-ghost" d="M295 326V130C295 102 300 78 320 55C340 78 345 102 345 130V326H295ZM295 130H345"/>
        <g class="fe-engine-sockets">${enginePositions.map(engine=>`<circle cx="${engine.x}" cy="${engine.y}" r="43"/>`).join('')}</g>
        <g class="fe-rocket-skin" data-fe-vehicle>
          <path d="M320 55C300 78 295 102 295 130H345C345 102 340 78 320 55Z" fill="url(#fe-vehicle-metal)"/>
          <path d="M295 130H345V326H295Z" fill="url(#fe-vehicle-metal)"/>
          <path d="M295 148H345V162H295ZM295 265H345V274H295Z" fill="#233642"/>
          <path d="M295 290 276 339H295M345 290 364 339H345" fill="#617783"/>
          <path d="M296 326 291 341H349L344 326Z" fill="#2d3d47"/>
          <circle cx="320" cy="118" r="7" fill="#0a1924" stroke="#a9d9d9" stroke-width="1"/>
          <path d="M320 187V238" stroke="#334853" stroke-width="2"/>
        </g>
        <g class="fe-rocket-draft">
          <path class="fe-vehicle-trace" pathLength="1" d="M295 326V130C295 102 300 78 320 55C340 78 345 102 345 130V326H295ZM295 130H345M295 148H345M295 162H345M295 265H345M295 274H345M295 290 276 339H295M345 290 364 339H345M296 326 291 341H349L344 326"/>
          <circle class="fe-vehicle-trace" pathLength="1" cx="320" cy="118" r="7"/>
          <path class="fe-vehicle-trace fe-draft-guide" pathLength="1" d="M270 55H370M270 341H370M280 55V341M276 62 284 54M276 341 284 333"/>
        </g>
        <g class="fe-engine-connections">${enginePositions.map((_,index)=>`<path class="fe-engine-wire" data-fe-wire="${index}" pathLength="1" d="M320 351H320"/>`).join('')}</g>
        ${enginePositions.map((engine,index) => `<g class="fe-engine-unit" data-fe-engine="${index}" transform="translate(${engine.x} ${engine.y})">
          <circle class="fe-engine-halo" r="76"/>
          <circle class="fe-engine-frame" r="43"/>
          <circle class="fe-engine-trace" pathLength="1" r="43" transform="rotate(-90)"/>
          <path class="fe-engine-ribs" d="M-27-25-19-17M27-25 19-17M-27 25-19 17M27 25 19 17M0-36V-25M0 36V25M-36 0H-25M36 0H25"/>
          <circle class="fe-engine-chamber" r="25"/>
          <circle class="fe-engine-core" r="19"/>
          <text class="fe-engine-number" y="7" text-anchor="middle">0${index+1}</text>
        </g>`).join('')}
        ${enginePositions.map((engine,index)=>`<g class="fe-engine-label" data-fe-engine-label="${index}"><text class="fe-engine-name" x="${engine.labelX}" y="${engine.labelY}">${engine.title}</text><text class="fe-engine-purpose" x="${engine.labelX}" y="${engine.labelY+27}">${engine.line}</text><path class="fe-engine-label-rule" pathLength="1" d="M${engine.labelX} ${engine.labelY+40}H${engine.labelX+160}"/></g>`).join('')}
        </g>
      </svg>
      <div class="fe-system-caption" aria-hidden="true">Drei Ansätze <span>·</span> Ein gemeinsamer Antrieb</div>
    </div>`,
    mount(root) {
      const scene = root.querySelector('.fe-system');
      const views = systemViews.map(name => root.querySelector(`[data-fe-${name}]`));
      const caption = root.querySelector('.fe-system-caption');
      const traces = Array.from(root.querySelectorAll('.fe-vehicle-trace'));
      const vehicle = root.querySelector('[data-fe-vehicle]');
      const pods = Array.from(root.querySelectorAll('[data-fe-engine]'));
      const rings = Array.from(root.querySelectorAll('.fe-engine-trace'));
      const numbers = Array.from(root.querySelectorAll('.fe-engine-number'));
      const wires = Array.from(root.querySelectorAll('[data-fe-wire]'));
      const labels = Array.from(root.querySelectorAll('[data-fe-engine-label]'));
      const labelRules = Array.from(root.querySelectorAll('.fe-engine-label-rule'));
      let last = '';
      return {
        update(progress, context = {}) {
          const p = context.reduced ? 1 : clamp(progress);
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.mobile)}|${Boolean(context.static)}`;
          if (key === last) return;
          last = key;
          const phase = phaseAt(p, systemPhases);
          const reveal = context.static || phase===0 ? 1 : smooth(systemPhases[phase], systemPhases[phase]+.025, p);
          showPhase(scene, views, systemViews, phase, n(reveal));
          caption.style.display =           phase===3 ? '' : 'none';
                    scene.setAttribute('aria-label', phase===3 ? 'Drei Ansätze – psychologische Sicherheit, Wissensaustausch und klare Gates – bilden metaphorisch den gemeinsamen Antrieb. Die Rakete bleibt bis zum Finale am Boden.' : views[phase].querySelector('h3').textContent);
          // Only the closing phase assembles the three previously explained
          // approaches. All motion is derived from the shared progress.
          const engineP = clamp((p-.78)/.22);
          const assembly = smooth(.08,.95,engineP);
          const vehicleReveal = smooth(.15,.96,engineP);
          set(scene,'--fe-system-assembled',n(assembly));
          set(vehicle,'opacity',n(vehicleReveal));
          traces.forEach((trace,index) => {
            set(trace,'stroke-dashoffset',0);
            set(trace,'opacity',n(index===2?.32:(1-.62*vehicleReveal)));
          });
          pods.forEach((pod,index) => {
            const original = enginePositions[index];
            const localAssembly = smooth(.08+index*.025,.88+index*.025,engineP);
            const x = lerp(original.x,original.tx,localAssembly);
            const y = lerp(original.y,original.ty,localAssembly);
            const scale = lerp(1,.205,localAssembly);
            set(pod,'opacity',1);
            set(pod,'--fe-engine-heat',1);
            pod.setAttribute('transform',`translate(${n(x)} ${n(y)}) scale(${n(scale)})`);
            set(rings[index],'stroke-dashoffset',0);
            set(numbers[index],'opacity',n(1-smooth(.15,.7,engineP)));
            const left = index%2===0;
            const labelX = original.labelX + (left?160:0);
            const labelY = original.labelY + 40;
            const bendX = left ? Math.min(x-38,272) : Math.max(x+38,368);
            wires[index].setAttribute('d',`M${labelX} ${labelY}C${n(bendX)} ${labelY} ${n(bendX)} ${n(y)} ${n(x)} ${n(y)}`);
            set(wires[index],'stroke-dashoffset',0);
            set(wires[index],'opacity',n(.23+.53*assembly));
            set(labels[index],'opacity',1);
            set(labelRules[index],'stroke-dashoffset',0);
          });
        }
      };
    }
  };
})();
