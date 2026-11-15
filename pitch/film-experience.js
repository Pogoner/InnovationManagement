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
  const marketingMix = [
    {title:'People',sub:'/ Customer',lines:['Raumfahrtfans · Unternehmer','Executive & Customer Hospitality']},
    {title:'Product',lines:['20 Gäste · 7 Gänge · Launch','Missionsbriefing & Concierge']},
    {title:'Price',lines:['35.000 USD im Pilot','bis 50.000 USD als Zielpreis']},
    {title:'Place',lines:['Direktvertrieb & Family Offices','USA-Pilot · Fläche noch offen']},
    {title:'Promotion',lines:['Einladungen & Empfehlungen','Ausgewählte Medien & Partner']}
  ];
  // Team judgments of the three drafts, transposed from the original 5P table.
  // Scores assess the drafts; they do not validate demand or a market outcome.
  const draftScores = [
    {name:'People',values:[5,4,4]},
    {name:'Product',values:[5,4,5]},
    {name:'Price',values:[4,4,3]},
    {name:'Place',values:[3,3,5]},
    {name:'Promotion',values:[5,4,4]}
  ];
  const diningPhases = [0,.16,.32,.48,.65,.82];
  const diningViews = ['layout','panorama','price','compare','synthesis','marketing'];
  const diningDescriptions = [
    'Raumkonzept: zehn versetzte Zweiertische mit zwanzig Plätzen, alle auf das Startpanorama ausgerichtet. Konzeptvisualisierung ohne Standort- oder Entfernungszusage.',
    'Erlebniskonzept: sieben Gänge, Missionsbriefing, Service und gemeinsamer Blick auf den Launch.',
    'Preisannahmen: 35.000 US-Dollar je Gast im Pilot, langfristig bis zu 50.000 US-Dollar. Die Zahlungsbereitschaft ist noch zu prüfen.',
    'Teamvergleich der fünf Ps aus den Entwürfen von Fable, ChatGPT und Copilot.',
    'Auswahl des finalen Mixes aus konkreten Produktideen und vorsichtigem Pilotansatz.',
    'Finaler 5P-Mix: People, Product, Price, Place und Promotion. Preise, Partner und Standort bleiben zu validieren.'
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
      </svg>
      <section class="fe-method-panel fe-compare" data-fe-compare aria-hidden="true">
        <p class="fe-method-kicker">Gleicher Prompt · 25 Felder · drei Entwürfe</p>
        <h3>Welche Vorschläge tragen?</h3>
        <table class="fe-draft-table">
          <caption>Teamwertung · 1 schwach bis 5 sehr stark</caption>
          <thead><tr><th scope="col">5P</th><th scope="col">Fable</th><th scope="col">ChatGPT</th><th scope="col">Copilot</th></tr></thead>
          <tbody>${draftScores.map(row=>`<tr${row.name==='Place'?' class="fe-comparison-focus"':''}><th scope="row">${row.name}</th>${row.values.map((score,index)=>`<td${score===5?' class="fe-rating-strong"':''}><span${row.name==='Place'&&index===2?' class="method-attention"':''}>${score}</span></td>`).join('')}</tr>`).join('')}</tbody>
          <tfoot><tr><th scope="row">Mittelwert</th><td>4,4</td><td>3,8</td><td>4,2</td></tr></tfoot>
        </table>
        <p class="fe-method-note">Copilot liegt bei <strong>Place</strong> vorn. Fable führt bei <strong>People</strong> und <strong>Promotion</strong>. Die Werte beurteilen Entwürfe; sie belegen keine Nachfrage.</p>
      </section>
      <section class="fe-method-panel fe-synthesis" data-fe-synthesis aria-hidden="true">
        <p class="fe-method-kicker">Auswahl des Teams</p>
        <h3>Produktideen und Pilotansatz verbinden.</h3>
        <div class="fe-synthesis-inputs">
          <article><p class="fe-source-label">Fable</p><h4>Konkretes Erlebnis</h4><p>Stark bei Zielgruppe, Produktinszenierung und Promotion. Standort und Entfernung teils zu verbindlich.</p></article>
          <article><p class="fe-source-label">Copilot</p><h4>Vorsichtiger Pilot</h4><p>Stark bei Pilotansatz und offenen Standortfragen. Beim Preis weniger konkret.</p></article>
        </div>
        <p class="fe-comparator-note"><strong>ChatGPT:</strong> vollständig und gut lesbar, inhaltlich nahe an Fable.</p>
        <div class="fe-synthesis-join" aria-hidden="true"><span></span><span></span></div>
        <div class="fe-synthesis-result"><span class="fe-source-label">Finaler Mix</span><p>Konkrete Produktideen <span aria-hidden="true">+</span> vorsichtiger Pilotansatz</p></div>
        <p class="fe-method-note">Persona und Standort bleiben prüfbar. Preis, Ersatztermine, Partner und Zahlungsbedingungen sind vor der Umsetzung zu validieren.</p>
      </section>
      <section class="fe-method-panel fe-marketing" data-fe-marketing aria-hidden="true">
        <p class="fe-method-kicker">Finaler 5P-Mix</p>
        <h3>Vom Erlebnis zum Gast.</h3>
        <ol class="fe-final-mix">${marketingMix.map((part,index)=>`<li data-fe-mix-row="${index}"><span class="fe-final-mix-index" aria-hidden="true">0${index+1}</span><h4>${part.title}${part.sub?`<small>${part.sub}</small>`:''}</h4><p>${part.lines.map(line=>`<span>${line}</span>`).join('')}</p></li>`).join('')}</ol>
        <p class="fe-method-note">People meint die Kundschaft. Preise, Partner und Fläche sind Annahmen des Konzepts und noch zu validieren.</p>
      </section>
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
      const views = [layout, panorama, price, root.querySelector('[data-fe-compare]'), root.querySelector('[data-fe-synthesis]'), marketing];
      const mixRows = Array.from(root.querySelectorAll('[data-fe-mix-row]'));
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
          mixRows.forEach((row,index)=>{
            const arrival = context.static ? 1 : smooth(.82+index*.016,.895+index*.016,p);
            set(row,'opacity',n(arrival));
            set(row,'transform',`translateY(${n(8*(1-arrival))}px)`);
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
  const systemPhases = [0,.21,.42,.63,.82];
  const systemViews = ['diagnosis','structure-process','culture-skills','gates','engines'];
  const analysisGroups = [
    {title:'3 Stärken',kind:'strength',fields:[
      {name:'Strategie',verb:'SOLLEN',reason:'Langfristige Mission verbindet die Geschäftsfelder.'},
      {name:'Foresight',verb:'SEHEN',reason:'KI und Daten früh aufgegriffen; Abhängigkeit vom Gründer.'},
      {name:'Prozesse',verb:'MACHEN',reason:'Schnelle Build-Test-Learn-Schleifen mit realen Daten.'}
    ]},
    {title:'3 Felder mit Handlungsbedarf',kind:'development',fields:[
      {name:'Struktur',verb:'HABEN',reason:'Über Geschäftsfelder hinweg besser koordinieren.'},
      {name:'Führung / Kultur',verb:'DÜRFEN / WOLLEN',reason:'Beteiligung und psychologische Sicherheit stärken.'},
      {name:'Kompetenzen / Methoden',verb:'KÖNNEN',reason:'Wissen gemeinsam teilen und gezielt weiterlernen.'}
    ]}
  ];
  // The seven source questions are grouped editorially for reading. The grouping
  // adds no scoring, thresholds or claim that a project has passed the gates.
  const gateGroups = [
    {title:'Kunde & Markt',questions:[
      ['Kundennutzen','Mit Kunden oder einem Prototyp validiert?'],
      ['Markt','Nachfrage, Wachstum und Zahlungsbereitschaft plausibel?'],
      ['Differenzierung','Erkennbar besser oder anders?']
    ]},
    {title:'Machbarkeit',questions:[
      ['Reifegrad','Technische und operative Risiken verstanden?'],
      ['Synergien','Vorhandene Fähigkeiten und Infrastruktur genutzt?']
    ]},
    {title:'Tragfähigkeit & Umsetzung',questions:[
      ['Wirtschaftlichkeit','Investition, Kosten und Amortisation belastbar?'],
      ['Umsetzung','Ressourcen und Zeit bis zum Markteintritt passend?']
    ]}
  ];

  scenes[7] = {
    markup: () => `<div class="fe-scene fe-system" role="group" aria-label="Von sechs Analysefeldern zu vier Empfehlungen für das Innovationsmanagement.">
      <section class="fe-method-panel fe-diagnosis" data-fe-diagnosis>
        <p class="fe-method-kicker">Projekturteil · Modell nach Hube</p>
        <h3>Sechs Felder. Ein differenziertes Bild.</h3>
        <div class="fe-analysis-groups">${analysisGroups.map(group=>`<section class="fe-analysis-group fe-analysis-${group.kind}"><h4>${group.title}</h4><dl>${group.fields.map(field=>`<div><dt><span>${field.verb}</span><strong>${field.name}</strong></dt><dd>${field.reason}</dd></div>`).join('')}</dl></section>`).join('')}</div>
        <p class="fe-method-note"><strong>Vier Empfehlungen ergänzen auch die starke Prozessdimension.</strong> Begründetes Urteil aus öffentlichen Quellen; keine interne Unternehmensprüfung.</p>
      </section>
      <section class="fe-method-panel fe-structure-process" data-fe-structure-process aria-hidden="true">
        <p class="fe-method-kicker">Empfehlungen 01 + 02</p>
        <h3>Verantwortung und Prüfung verbinden.</h3>
        <section class="fe-recommendation">
          <h4><span>HABEN · Struktur</span>Das Portfolio gemeinsam steuern.</h4>
          <p class="fe-portfolio-root">Gemeinsame Portfoliosicht</p>
          <div class="fe-portfolio-branches"><p><strong>Kerninnovationen</strong><span>Responsible Engineers<br>in der Linie</span></p><p><strong>Radikale Ideen</strong><span>Eigenes Projektteam<br>mit klarem Auftrag</span></p></div>
        </section>
        <section class="fe-recommendation">
          <h4><span>MACHEN · Prozesse</span>Schnelle Iteration gezielt ergänzen.</h4>
          <div class="fe-process-complement"><p><span class="fe-source-label">Stärke erhalten</span><strong>Build-Test-Learn</strong><span>Mit realen Daten weiterlernen.</span></p><span class="fe-complement-plus" aria-hidden="true">+</span><p><span class="fe-source-label">Früh ergänzen</span><strong>Design Thinking<br>&amp; Go-/No-go-Gates</strong><span>Kundennutzen fachübergreifend prüfen.</span></p></div>
        </section>
      </section>
      <section class="fe-method-panel fe-culture-skills" data-fe-culture-skills aria-hidden="true">
        <p class="fe-method-kicker">Empfehlungen 03 + 04</p>
        <h3>Beteiligung und gemeinsames Lernen stärken.</h3>
        <div class="fe-learning-pair">
          <section><h4><span>DÜRFEN / WOLLEN</span>Kultur</h4><div class="fe-retain"><span class="fe-source-label">Bewahren</span><p>Eigenverantwortung und Testkultur.</p></div><div class="fe-addition"><span class="fe-source-label">Ergänzen</span><p>Ideen aktiv erfragen. Sachliche Kritik ohne Bestrafungsangst ermöglichen. Umgesetzte Ideen sichtbar würdigen.</p></div><p class="fe-recommendation-outcome">Beteiligung &amp; psychologische Sicherheit</p></section>
          <section><h4><span>KÖNNEN</span>Kompetenzen</h4><div class="fe-retain"><span class="fe-source-label">Bewahren</span><p>Selbstgesteuertes Lernen.</p></div><div class="fe-addition"><span class="fe-source-label">Ergänzen</span><p>Austausch zwischen Bereichen, feste Lernformate und gemeinsame Weiterbildung. Change-Kompetenz aufbauen.</p></div><p class="fe-recommendation-outcome">Wissenstransfer &amp; gemeinsame Kompetenz</p></section>
        </div>
      </section>
      <section class="fe-method-panel fe-gates" data-fe-gates aria-hidden="true">
        <p class="fe-method-kicker">Fachübergreifende Go-/No-go-Gates</p>
        <h3>Sieben Fragen vor der Freigabe.</h3>
        <div class="fe-gate-groups">${gateGroups.map((group,index)=>`<section><h4><span aria-hidden="true">0${index+1}</span>${group.title}</h4><dl>${group.questions.map(([label,question])=>`<div><dt>${label}</dt><dd>${question}</dd></div>`).join('')}</dl></section>`).join('')}</div>
        <p class="fe-method-note">Für RocketLight besonders relevant: Standortzugang, Sicherheit, Zahlungsbereitschaft und belastbarer Pilotbetrieb. Kriterien dem Projekt anpassen.</p>
      </section>
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
        <text class="fe-system-foundation" x="320" y="499" text-anchor="middle">KLARE MISSION + FRÜHE TRENDERKENNUNG</text>
        </g>
      </svg>
      <div class="fe-system-caption" aria-hidden="true">Vier Empfehlungen <span>·</span> Ein gemeinsamer Antrieb</div>
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
          caption.style.display = phase===4 ? '' : 'none';
          scene.setAttribute('aria-label', phase===4 ? 'Vier Empfehlungen – Struktur, Prozesse, Kultur und Kompetenzen – bilden metaphorisch den gemeinsamen Antrieb. Die Rakete bleibt bis zum Finale am Boden.' : views[phase].querySelector('h3').textContent);
          // Only the closing phase assembles the four previously explained
          // recommendations. All motion is derived from the shared progress.
          const engineP = clamp((p-.82)/.18);
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
