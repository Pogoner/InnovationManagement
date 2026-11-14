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

  function placeMarkup(index) {
    const angle = (index / 20) * Math.PI * 2;
    const plateX = Math.cos(angle) * 183;
    const plateY = Math.sin(angle) * 62;
    const chairX = Math.cos(angle) * 247;
    const chairY = Math.sin(angle) * 111;
    const rotation = angle * 180 / Math.PI + 90;
    return `<g class="fe-place" data-fe-place="${index}">
      <g transform="translate(${n(chairX)} ${n(chairY)}) rotate(${n(rotation)})">
        <path class="fe-chair" d="M-13 5V-5Q-13-13-5-13H5Q13-13 13-5V5M-13 0H13"/>
        <path class="fe-chair-inner" d="M-9 5H9V-5Q9-9 5-9H-5Q-9-9-9-5Z"/>
      </g>
      <g transform="translate(${n(plateX)} ${n(plateY)})">
        <ellipse class="fe-plate-light" rx="22" ry="13"/>
        <ellipse class="fe-plate" rx="12" ry="7.5"/>
        <ellipse class="fe-plate-inner" rx="8" ry="4.7"/>
        <path class="fe-cutlery" d="M-17-6V7M-20-6V-1H-14V-6M17-6V7M15-6V1H17"/>
      </g>
    </g>`;
  }

  scenes[5] = {
    markup: () => `<div class="fe-scene fe-dining" role="img" aria-label="Konzept: Ein Tisch mit zwanzig Plätzen, sieben Gängen und einem Preis von 35.000 US-Dollar im Pilot; langfristiger Zielpreis bis zu 50.000 US-Dollar je Gast. Die fünf Ps verbinden das Erlebnis mit seinen Gästen.">
      <svg class="fe-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="fe-table-surface" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a9d9d9" stop-opacity=".025"/><stop offset=".6" stop-color="#efbd91" stop-opacity=".075"/><stop offset="1" stop-color="#efbd91" stop-opacity=".018"/></linearGradient>
          <radialGradient id="fe-place-glow"><stop stop-color="#efbd91" stop-opacity=".48"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <radialGradient id="fe-candle-glow"><stop stop-color="#fff1ca" stop-opacity=".9"/><stop offset=".16" stop-color="#efbd91" stop-opacity=".45"/><stop offset="1" stop-color="#efbd91" stop-opacity="0"/></radialGradient>
          <linearGradient id="fe-market-line"><stop stop-color="#a9d9d9" stop-opacity=".55"/><stop offset="1" stop-color="#efbd91"/></linearGradient>
        </defs>
        <g class="fe-experience-heading"><text x="320" y="42" text-anchor="middle">20 GÄSTE <tspan class="fe-heading-divider">/</tspan> 7 GÄNGE <tspan class="fe-heading-divider">/</tspan> EIN MOMENT</text></g>
        <g class="fe-table-drift" data-fe-table>
          <g transform="translate(320 258) rotate(-13)">
            <ellipse class="fe-table-shadow" cx="0" cy="42" rx="234" ry="78"/>
            <path class="fe-table-leg fe-table-trace" pathLength="1" d="M-118 35L-118 101M-111 36L-111 98M112 35L112 101M119 34L119 98M-131 102H-99M100 102H131"/>
            <path class="fe-table-edge fe-table-trace" pathLength="1" d="M-213 0V9C-213 55-118 91 0 91S213 55 213 9V0"/>
            <ellipse class="fe-table-top" rx="213" ry="83"/>
            <ellipse class="fe-table-ghost" rx="213" ry="83"/>
            <ellipse class="fe-table-outline fe-table-trace" pathLength="1" rx="213" ry="83"/>
            <ellipse class="fe-table-runner fe-table-trace" pathLength="1" rx="130" ry="27"/>
            ${Array.from({length:20}, (_,index) => placeMarkup(index)).join('')}
            ${[-105,-53,0,53,105].map((x,index) => `<g class="fe-candle" data-fe-candle="${index}" transform="translate(${x} 0)"><ellipse class="fe-candle-halo" rx="45" ry="30"/><ellipse class="fe-candle-base" cy="5" rx="4" ry="2.5"/><path class="fe-candle-stem" d="M0 4V-8"/><path class="fe-candle-flame" d="M0-16C-5-10-4-7 0-7S5-10 0-16Z"/></g>`).join('')}
          </g>
        </g>
        <g data-fe-courses class="fe-courses">
          <path class="fe-course-guide" d="M104 419Q320 356 536 419"/>
          <path class="fe-course-line" pathLength="1" d="M104 419Q320 356 536 419"/>
          ${Array.from({length:7},(_,index) => {
            const t = index / 6;
            const x = 104 + 432*t;
            const y = 419 - 126*t*(1-t);
            return `<g class="fe-course" data-fe-course="${index}" transform="translate(${n(x)} ${n(y)})"><circle class="fe-course-ring" r="17"/><circle class="fe-course-dot" r="3"/><text y="37" text-anchor="middle">0${index+1}</text></g>`;
          }).join('')}
          <text class="fe-course-caption" x="320" y="486" text-anchor="middle">SIEBEN GÄNGE. EINE DRAMATURGIE.</text>
        </g>
        <g data-fe-market class="fe-market">
          <path class="fe-price-connector" pathLength="1" d="M247 383H392M380 375L392 383 380 391"/>
          <text class="fe-price-label" x="161" y="340" text-anchor="middle">PILOT</text>
          <text class="fe-price-value" x="161" y="395" text-anchor="middle">35.000</text>
          <text class="fe-price-label fe-price-target-label" x="478" y="340" text-anchor="middle">ZIELPREIS BIS ZU</text>
          <text class="fe-price-value" x="478" y="395" text-anchor="middle">50.000</text>
          <text class="fe-price-unit" x="320" y="435" text-anchor="middle">USD JE GAST · IM PILOT ZU VALIDIEREN</text>
          <path class="fe-mix-track" pathLength="1" d="M64 474H576"/>
          ${[64,192,320,448,576].map((x,index)=>`<g class="fe-mix-node" data-fe-mix-node="${index}"><circle cx="${x}" cy="474" r="5"/><path d="M${x} 480V496"/></g>`).join('')}
        </g>
      </svg>
      <div class="fe-mix-labels" data-fe-mix-labels aria-hidden="true"><span>People<small>/ Customer</small></span><span>Product</span><span>Price</span><span>Place</span><span>Promotion</span></div>
    </div>`,
    mount(root) {
      const scene = root.querySelector('.fe-dining');
      const table = root.querySelector('[data-fe-table]');
      const traces = Array.from(root.querySelectorAll('.fe-table-trace'));
      const places = Array.from(root.querySelectorAll('[data-fe-place]'));
      const candles = Array.from(root.querySelectorAll('[data-fe-candle]'));
      const courseGroup = root.querySelector('[data-fe-courses]');
      const courseLine = root.querySelector('.fe-course-line');
      const courses = Array.from(root.querySelectorAll('[data-fe-course]'));
      const market = root.querySelector('[data-fe-market]');
      const priceLine = root.querySelector('.fe-price-connector');
      const mixTrack = root.querySelector('.fe-mix-track');
      const mixNodes = Array.from(root.querySelectorAll('[data-fe-mix-node]'));
      const mixLabels = root.querySelector('[data-fe-mix-labels]');
      let last = '';
      return {
        update(progress, context = {}) {
          const p = context.reduced ? 1 : clamp(progress);
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.mobile)}`;
          if (key === last) return;
          last = key;
          const laid = smooth(0,.23,p);
          const offering = smooth(.61,.79,p);
          traces.forEach((trace,index) => set(trace,'stroke-dashoffset',n(1-smooth(index*.035,.25+index*.035,p))));
          set(scene,'--fe-table-fill',n(.1+.9*laid));
          table.setAttribute('transform',`translate(0 ${n(-74*offering)}) translate(320 258) scale(${n(1-.055*offering)}) translate(-320 -258)`);
          places.forEach((place,index) => {
            const reveal = smooth(.025 + index*.015,.14 + index*.015,p);
            set(place,'opacity',n(reveal));
            place.setAttribute('transform',`translate(0 ${n(21*(1-reveal))})`);
          });
          candles.forEach((candle,index) => set(candle,'opacity',n(smooth(.17+index*.035,.38+index*.035,p))));
          const courseProgress = smooth(.30,.61,p);
          set(courseGroup,'opacity',n(smooth(.20,.30,p)*(1-smooth(.59,.71,p))));
          set(courseLine,'stroke-dashoffset',n(1-courseProgress));
          courses.forEach((course,index) => {
            const arrival = smooth(.28+index*.041,.355+index*.041,p);
            set(course,'--fe-course-lit',n(arrival));
          });
          set(market,'opacity',n(smooth(.61,.76,p)));
          set(priceLine,'stroke-dashoffset',n(1-smooth(.72,.9,p)));
          set(mixTrack,'stroke-dashoffset',n(1-smooth(.74,.96,p)));
          mixNodes.forEach((node,index) => set(node,'opacity',n(smooth(.72+index*.035,.80+index*.035,p))));
          set(mixLabels,'opacity',n(smooth(.75,.91,p)));
          set(mixLabels,'transform',`translateY(${n((1-smooth(.75,.91,p))*12)}px)`);
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
