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
  const diningPhases = [0,.16,.32,.48,.65];
  const diningViews = ['layout','panorama','price','econ','scale'];
  const diningDescriptions = [
    'Raumkonzept: zehn versetzte Zweiertische mit zwanzig Plätzen, alle auf das Startpanorama ausgerichtet. Konzeptvisualisierung ohne Standort- oder Entfernungszusage.',
    'Erlebniskonzept: sieben Gänge, Missionsbriefing, Service und gemeinsamer Blick auf den Launch.',
    'Preisannahmen: 35.000 US-Dollar je Gast im Pilot, langfristig bis zu 50.000 US-Dollar. Die Zahlungsbereitschaft ist noch zu prüfen.',
    'Projektbezogene Rechnung 2027 bis 2031: Betriebsergebnis und Investitionen je Jahr, kumulierter Cashflow und Amortisation. Planannahmen für den festen Pavillon in Florida.',
    'Hohe Marge je Gast: Bei 50.000 US-Dollar Preis bleiben etwa 45.000 US-Dollar Deckungsbeitrag vor Fixkosten und Investition. Planannahmen.'
  ];

  // Project calculation for the fixed pavilion (Standort 1 Florida, 2027-2031). All values come
  // from the frozen evidence (rld-ki.fy, model "project"); nothing is derived from SpaceX's group margin.
  const econGeo = {base:268, k:8, xs:[110,215,320,425,530], width:34};
  const scaleGeo = {x:60, width:520};
  const de = (value, digits = 1) => value.toLocaleString('de-DE', {minimumFractionDigits:digits, maximumFractionDigits:digits});
  function economics() {
    const {financialA, financialAssessmentA} = window.PitchEvidence;
    const mio = value => value / 1e6;
    const costs = financialAssessmentA.fy.varCosts.map(item => item.perSeat);
    return {years:financialA.years, result:financialA.opResult.map(mio), invest:financialA.invest.map(mio), revenue:financialA.revenue.map(mio),
      cumulative:financialA.cumulative.map(mio), gain:mio(financialA.P), spend:mio(financialA.C), payback:financialA.payback, guests:financialA.qtySum,
      price:financialA.guest.price, variable:financialA.guest.variable, margin:financialA.guest.share, costs};
  }
  function econMarkup(e) {
    const {base, k, xs, width} = econGeo;
    const points = e.cumulative.map((value, index) => [xs[index], base - value * k]);
    const turn = e.payback.index;
    let breakEven = `<text class="fe-econ-legend" x="600" y="${base + 30}" text-anchor="end">IM BETRACHTUNGSZEITRAUM NICHT ERREICHT</text>`;
    if (e.payback.reached) {
      let crossX = xs[0];
      if (turn > 0) {
        const share = -e.cumulative[turn - 1] / (e.cumulative[turn] - e.cumulative[turn - 1]);
        crossX = xs[turn - 1] + share * (xs[turn] - xs[turn - 1]);
      }
      breakEven = `<circle cx="${n(crossX)}" cy="${base}" r="7"/><text x="${n(crossX + 14)}" y="${base + 30}">IM PLUS AB ${e.payback.year}</text>`;
    }
    return `<g data-fe-econ class="fe-econ">
      <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">ERWARTETE KOSTEN UND GEWINNE</text>
      <text class="fe-econ-label fe-econ-gain-label" x="170" y="76" text-anchor="middle">BETRIEBSERGEBNIS · ${e.years[0]}–${e.years[4]}</text>
      <text class="fe-econ-total fe-econ-gain-label" data-fe-gain-total x="170" y="132" text-anchor="middle">0,0</text>
      <text class="fe-econ-label fe-econ-cost-label" x="470" y="76" text-anchor="middle">INVESTITIONEN · ${e.years[0]}–${e.years[4]}</text>
      <text class="fe-econ-total fe-econ-cost-label" data-fe-cost-total x="470" y="132" text-anchor="middle">0,0</text>
      <text class="fe-econ-unit" x="170" y="158" text-anchor="middle">MIO. USD</text>
      <text class="fe-econ-unit" x="470" y="158" text-anchor="middle">MIO. USD</text>
      <path class="fe-econ-axis" d="M60 ${base}H600"/>
      ${e.result.map((value, index) => `<rect class="fe-econ-gain" data-fe-gain="${index}" x="${xs[index] - width / 2}" y="${base}" width="${width}" height="0"/>`).join('')}
      ${e.invest.map((value, index) => `<rect class="fe-econ-cost" data-fe-cost="${index}" x="${xs[index] - width / 2}" y="${base}" width="${width}" height="0"/>`).join('')}
      <path class="fe-econ-line" data-fe-cumulative pathLength="1" d="M${points.map(point => point.map(n).join(' ')).join('L')}"/>
      ${points.map((point, index) => `<circle class="fe-econ-dot" data-fe-cum-dot="${index}" cx="${n(point[0])}" cy="${n(point[1])}" r="3.5"/>`).join('')}
      <g data-fe-breakeven class="fe-econ-breakeven">${breakEven}</g>
      ${xs.map((x, index) => `<text class="fe-econ-year" x="${x}" y="366" text-anchor="middle">${e.years[index]}</text>`).join('')}
      ${e.revenue.map((value, index) => `<text class="fe-econ-revenue" data-fe-revenue="${index}" x="${xs[index]}" y="398" text-anchor="middle">${value > 0 ? de(value) : '–'}</text>`).join('')}
      <text class="fe-econ-unit" x="320" y="424" text-anchor="middle">UMSATZ JE JAHR IN MIO. USD · ${e.guests} GÄSTE</text>
      <path class="fe-econ-key" d="M92 452H112" /><text class="fe-econ-legend" x="120" y="456">KUMULIERTER CASHFLOW: BETRIEBSERGEBNIS − INVESTITIONEN</text>
      <text class="fe-layout-note" x="320" y="494" text-anchor="middle">Planannahmen · Regelbetrieb erst nach G4 · Budget vor G2 auf Angebotsbasis prüfen</text>
    </g>`;
  }
  function scaleMarkup(e) {
    const {x, width} = scaleGeo;
    const costShare = e.variable / e.price;
    const costWidth = width * costShare;
    return `<g data-fe-scale class="fe-scale">
      <text class="fe-diagram-heading" x="320" y="86" text-anchor="middle">HOHE MARGE. KLEINE GRÖSSE.</text>
      <text class="fe-econ-label" x="320" y="168" text-anchor="middle">DECKUNGSBEITRAG JE GAST · USD</text>
      <text class="fe-econ-total fe-econ-gain-label" data-fe-guest-total x="320" y="252" text-anchor="middle">0</text>
      <rect class="fe-scale-track" x="${x}" y="292" width="${width}" height="28"/>
      <rect class="fe-econ-gain" data-fe-guest-margin x="${x}" y="292" width="0" height="28"/>
      <rect class="fe-econ-cost" data-fe-guest-cost x="${x + width}" y="292" width="0" height="28"/>
      <text class="fe-econ-legend fe-econ-gain-label" x="${x}" y="354">${de(e.margin * 100, 0)} % BLEIBEN</text>
      <text class="fe-econ-legend fe-econ-cost-label" x="${x + width}" y="354" text-anchor="end">${de(e.variable, 0)} USD VARIABLE KOSTEN</text>
      <text class="fe-layout-note" x="320" y="408" text-anchor="middle">Preis ${de(e.price, 0)} USD · Menü ${de(e.costs[0], 0)} · Logistik, Sicherheit, Service ${de(e.costs[1], 0)}</text>
      <text class="fe-layout-note" x="320" y="434" text-anchor="middle">Deckungsbeitrag vor Fixkosten und Investition</text>
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
        ${econMarkup(economics())}
        ${scaleMarkup(economics())}
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
      const views = [layout, panorama, price, root.querySelector('[data-fe-econ]'), root.querySelector('[data-fe-scale]')];
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
            const value = model.result[index]*grow, height = Math.abs(value)*econGeo.k;
            gainSum += value;
            bar.setAttribute('y',n(value >= 0 ? econGeo.base-height : econGeo.base));bar.setAttribute('height',n(height));
            set(revenueLabels[index],'opacity',n(smooth(.05+index*.08,.14+index*.08,econT)));
          });
          costBars.forEach((bar,index)=>{
            const grow = smooth(.42+index*.05,.54+index*.05,econT);
            costSum += model.invest[index]*grow;
            // A negative operating result hangs below the axis, so the investment starts underneath it.
            const offset = Math.max(0,-model.result[index])*econGeo.k*smooth(.04+index*.08,.16+index*.08,econT);
            bar.setAttribute('y',n(econGeo.base+offset));
            bar.setAttribute('height',n(model.invest[index]*econGeo.k*grow));
          });
          gainTotal.textContent = de(gainSum);
          costTotal.textContent = de(costSum);
          const lineT = smooth(.72,.94,econT);
          set(cumulativeLine,'stroke-dashoffset',n(1-lineT));
          cumulativeDots.forEach((dot,index)=>set(dot,'opacity',n(smooth(index/4-.02,index/4+.02,lineT))));
          set(breakEven,'opacity',n(smooth(.9,.98,econT)));
          const scaleT = context.static ? 1 : clamp((p-diningPhases[4])/((1-diningPhases[4])*.8));
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
