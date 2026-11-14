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

  // Editorial room concept: ten separate two-person tables. Every pair sits
  // landward and faces the same launch panorama; the plan is not a site survey.
  const diningTables = [
    {x:95,y:287},{x:205,y:261},{x:315,y:250},{x:425,y:261},{x:535,y:287},
    {x:68,y:405},{x:183,y:375},{x:298,y:363},{x:413,y:375},{x:528,y:405}
  ];
  const marketingMix = [
    {title:'People',sub:'/ Customer',lines:['Raumfahrtfans · Unternehmer','Executive & Customer Hospitality']},
    {title:'Product',lines:['20 Gäste · 7 Gänge · Launch','Missionsbriefing & Concierge']},
    {title:'Price',lines:['35.000 USD im Pilot','bis 50.000 USD als Zielpreis']},
    {title:'Place',lines:['Direktvertrieb & Family Offices','USA-Pilot · Fläche noch offen']},
    {title:'Promotion',lines:['Einladungen & Empfehlungen','Ausgewählte Medien & Partner']}
  ];

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
    markup: () => `<div class="fe-scene fe-dining" role="group" aria-label="Raumkonzept: zehn versetzte Zweiertische mit zwanzig Plätzen, alle auf das Startpanorama ausgerichtet. Sieben Gänge begleiten das Erlebnis. Der sichtbare 5P-Mix: People – vermögende Raumfahrtfans, Unternehmer und Firmenkunden. Product – Dinner, Launch, Missionsbriefing und Concierge. Price – 35.000 US-Dollar im Pilot, langfristig bis zu 50.000 US-Dollar als zu validierender Zielpreis. Place – Direktvertrieb und Family Offices, US-Pilot mit noch offenem Standort. Promotion – Einladungen, Empfehlungen, ausgewählte Medien und mögliche Partner. Konzeptvisualisierung, keine Standort- oder Partnerzusage.">
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
        <g data-fe-marketing class="fe-marketing">
          <text class="fe-diagram-heading" x="320" y="29" text-anchor="middle">5P · VOM ERLEBNIS ZUM GAST</text>
          <path class="fe-mix-guide" d="M43 75V435"/>
          <path class="fe-mix-track" pathLength="1" d="M43 75V435"/>
          ${marketingMix.map((part,index)=>`<g class="fe-mix-row" data-fe-mix-row="${index}" transform="translate(0 ${73+index*87})">
            <circle class="fe-mix-circle" cx="43" cy="10" r="19"/><text class="fe-mix-number" x="43" y="16" text-anchor="middle">${index+1}</text>
            <text class="fe-mix-name" x="80" y="11">${part.title}</text>${part.sub?`<text class="fe-mix-sub" x="80" y="35">${part.sub}</text>`:''}
            <path class="fe-mix-connector" d="M237 10H267M261 5 267 10 261 15"/>
            <text class="fe-mix-content" x="286" y="1">${part.lines[0]}<tspan x="286" dy="27">${part.lines[1]}</tspan></text>
            <path class="fe-mix-rule" d="M80 52H619"/>
          </g>`).join('')}
          <text class="fe-layout-note" x="320" y="509" text-anchor="middle">Finaler 5P-Mix · Partner, Fläche und Preise zu validieren</text>
        </g>
      </svg>
      <div class="fe-mobile-marketing" data-fe-mobile-marketing aria-hidden="true">
        <p class="fe-mobile-mix-heading">5P · Vom Erlebnis zum Gast</p>
        <ol>${marketingMix.map((part,index)=>`<li data-fe-mobile-row="${index}"><span class="fe-mobile-mix-index">${index+1}</span><h3>${part.title}${part.sub?`<small>${part.sub}</small>`:''}</h3><p>${part.lines.map(line=>`<span>${line}</span>`).join('')}</p></li>`).join('')}</ol>
        <p class="fe-mobile-mix-note">Preise, Partner und Fläche sind zu validieren.</p>
      </div>
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
      const marketing = root.querySelector('[data-fe-marketing]');
      const mobileMarketing = root.querySelector('[data-fe-mobile-marketing]');
      const mobileMixRows = Array.from(root.querySelectorAll('[data-fe-mobile-row]'));
      const mixTrack = root.querySelector('.fe-mix-track');
      const mixRows = Array.from(root.querySelectorAll('[data-fe-mix-row]'));
      let last = '';
      return {
        update(progress, context = {}) {
          const p = context.reduced ? 1 : clamp(progress);
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.mobile)}`;
          if (key === last) return;
          last = key;
          scene.dataset.feView = p>=.77?'marketing':p>=.57?'price':p>=.31?'panorama':'layout';
          mobileMarketing.setAttribute('aria-hidden',String(!context.mobile || p<.77));
          set(layout,'opacity',n(1-smooth(.29,.35,p)));
          set(scene,'--fe-table-fill',n(.2+.8*smooth(0,.21,p)));
          tables.forEach((table,index)=>{
            const arrival = smooth(index*.012,.07+index*.012,p);
            set(table,'opacity',n(arrival));
            table.setAttribute('transform',`translate(0 ${n(13*(1-arrival))})`);
          });
          traces.forEach((trace,index)=>set(trace,'stroke-dashoffset',n(1-smooth(index*.009,.13+index*.009,p))));
          places.forEach((place,index)=>set(place,'opacity',n(smooth(.045+index*.006,.11+index*.006,p))));
          rays.forEach((ray,index)=>set(ray,'stroke-dashoffset',n(1-smooth(.12+index*.005,.23+index*.005,p))));
          set(light,'opacity',n(smooth(.12,.27,p)));
          set(plume,'opacity',n(.12+.88*smooth(.17,.28,p)));
          set(panorama,'opacity',n(smooth(.29,.35,p)*(1-smooth(.55,.61,p))));
          set(serviceImage,'opacity',n(1-smooth(.33,.385,p)));
          const menuZoom=1+.065*(1-smooth(.34,.53,p));
          menuImage.setAttribute('transform',`translate(320 208) scale(${n(menuZoom)}) translate(-320 -208)`);
          const viewReveal=smooth(.43,.515,p),viewWidth=218*viewReveal,viewEdge=603-viewWidth;
          launchClip.setAttribute('x',n(viewEdge));launchClip.setAttribute('width',n(viewWidth));
          windowDivider.setAttribute('d',`M${n(viewEdge)} 65V351`);set(windowDivider,'opacity',n(viewReveal));
          set(windowViewLabel,'opacity',n(smooth(.47,.52,p)));
          set(courseLine,'stroke-dashoffset',n(1-smooth(.35,.52,p)));
          courses.forEach((course,index)=>set(course,'--fe-course-lit',n(smooth(.34+index*.022,.39+index*.022,p))));
          set(price,'opacity',n(smooth(.57,.64,p)*(1-smooth(.76,.82,p))));
          set(priceLine,'stroke-dashoffset',n(1-smooth(.63,.73,p)));
          const mixOpacity = n(smooth(.77,.83,p));
          set(marketing,'opacity',mixOpacity);
          set(mobileMarketing,'opacity',mixOpacity);
          mobileMixRows.forEach((row,index)=>set(row,'opacity',n(smooth(.78+index*.025,.84+index*.025,p))));
          set(mixTrack,'stroke-dashoffset',n(1-smooth(.78,.96,p)));
          mixRows.forEach((row,index)=>{
            const arrival = smooth(.78+index*.025,.84+index*.025,p);
            set(row,'opacity',n(arrival));
            row.setAttribute('transform',`translate(${n(18*(1-arrival))} ${73+index*87})`);
          });
        }
      };
    }
  };

  const enginePositions = [
    {x:115,y:178,tx:296,ty:351,labelX:60,labelY:94,title:'Struktur',line:'Verantwortung klären'},
    {x:525,y:178,tx:312,ty:351,labelX:414,labelY:94,title:'Prozesse',line:'Früh prüfen'},
    {x:115,y:351,tx:328,ty:351,labelX:60,labelY:433,title:'Kultur',line:'Beteiligung ermöglichen'},
    {x:525,y:351,tx:344,ty:351,labelX:414,labelY:433,title:'Kompetenzen',line:'Wissen teilen'}
  ];

  scenes[7] = {
    markup: () => `<div class="fe-scene fe-system" role="img" aria-label="Vier Empfehlungen – Struktur, Prozesse, Kultur und Kompetenzen – bilden beim Scrollen metaphorisch den gemeinsamen Antrieb. Die Rakete bleibt bis zum Finale am Boden.">
      <svg class="fe-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fe-vehicle-metal"><stop stop-color="#647782"/><stop offset=".38" stop-color="#eff3ed"/><stop offset=".64" stop-color="#a9b6bc"/><stop offset="1" stop-color="#40535f"/></linearGradient>
          <radialGradient id="fe-engine-glow"><stop stop-color="#fff2d1" stop-opacity=".75"/><stop offset=".26" stop-color="#efbd91" stop-opacity=".3"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <radialGradient id="fe-engine-interior"><stop stop-color="#fff0d3"/><stop offset=".34" stop-color="#efbd91"/><stop offset="1" stop-color="#b36e43" stop-opacity=".1"/></radialGradient>
        </defs>
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
        <text class="fe-system-foundation" x="320" y="499" text-anchor="middle">KLARE MISSION + FRÜHE TRENDERKENNUNG</text>
      </svg>
      <div class="fe-system-caption" aria-hidden="true">Vier Empfehlungen <span>·</span> Ein gemeinsamer Antrieb</div>
    </div>`,
    mount(root) {
      const scene = root.querySelector('.fe-system');
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
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.mobile)}`;
          if (key === last) return;
          last = key;
          const assembly = smooth(.62,.95,p);
          const vehicleReveal = smooth(.65,.96,p);
          set(scene,'--fe-system-assembled',n(assembly));
          set(vehicle,'opacity',n(vehicleReveal));
          traces.forEach((trace,index) => {
            set(trace,'stroke-dashoffset',n(1-smooth(.01+index*.035,.29+index*.035,p)));
            set(trace,'opacity',n(index===2?.32:(1-.62*vehicleReveal)));
          });
          pods.forEach((pod,index) => {
            const original = enginePositions[index];
            const appear = smooth(.07+index*.125,.23+index*.125,p);
            const localAssembly = smooth(.62+index*.016,.91+index*.016,p);
            const x = lerp(original.x,original.tx,localAssembly);
            const y = lerp(original.y,original.ty,localAssembly);
            const scale = lerp(1,.205,localAssembly);
            set(pod,'opacity',n(appear));
            set(pod,'--fe-engine-heat',n(appear));
            pod.setAttribute('transform',`translate(${n(x)} ${n(y)}) scale(${n(scale)})`);
            set(rings[index],'stroke-dashoffset',n(1-appear));
            set(numbers[index],'opacity',n(1-smooth(.64,.82,p)));
            const left = index%2===0;
            const labelX = original.labelX + (left?160:0);
            const labelY = original.labelY + 40;
            const bendX = left ? Math.min(x-38,272) : Math.max(x+38,368);
            wires[index].setAttribute('d',`M${labelX} ${labelY}C${n(bendX)} ${labelY} ${n(bendX)} ${n(y)} ${n(x)} ${n(y)}`);
            set(wires[index],'stroke-dashoffset',n(1-smooth(.1+index*.125,.3+index*.125,p)));
            set(wires[index],'opacity',n(.23+.53*assembly));
            set(labels[index],'opacity',n(.18+.82*appear));
            set(labelRules[index],'stroke-dashoffset',n(1-appear));
          });
        }
      };
    }
  };
})();
