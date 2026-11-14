/* The drawing and photograph retain the same measured image coordinates. */
(() => {
  'use strict';
  const clamp = n => Math.min(1, Math.max(0, n));
  const ramp = (a, b, p) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
  const blueprints = {"A": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"film-draft\" data-blueprint=\"A\" viewBox=\"0 0 1774 887\" width=\"1774\" height=\"887\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\">\n  <!-- Coordinates trace pavilion-cutout.webp at its original 1774 × 887 size. -->\n  <polygon class=\"draft-fill draft-fill-front\" points=\"145,416 1446,354 1446,773 145,750\" fill=\"currentColor\" fill-opacity=\"0.035\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-right\" points=\"1458,358 1659,415 1659,744 1458,773\" fill=\"currentColor\" fill-opacity=\"0.022\" stroke=\"none\"/>\n  <!-- Roof: overhang, narrow fascia and the recessed glazing line. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M40 390 L1491 302 L1737 394\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M40 402 L1501 326 L1737 405\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M40 390 L40 402\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1491 302 L1501 326\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1737 394 L1737 405\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M140 416 L1446 354 L1659 415\"/>\n  <!-- Front and right-hand glass facades. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M145 416 L145 750 L1446 773 L1446 354\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1659 415 L1659 744 L1458 773\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M178 414 L178 747\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M328 407 L328 750\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M339 407 L339 748\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M509 397 L509 755\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M727 387 L727 760\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M982 375 L982 766\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1297 360 L1297 771\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1528 377 L1528 761\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1606 399 L1606 749\"/>\n  <!-- Thin, photographed platform; no invented foundation or site grid. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M94 753 L1477 779 L1670 744\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M94 767 L1477 791 L1670 755\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M94 753 L94 767\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1477 779 L1477 791\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1670 744 L1670 755\"/>\n</svg>", "B": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"film-draft\" data-blueprint=\"B\" viewBox=\"0 0 1846 852\" width=\"1846\" height=\"852\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\">\n  <!-- Coordinates trace lounge-cutout.webp at its original 1846 × 852 size. -->\n  <polygon class=\"draft-fill draft-fill-front\" points=\"609,222 1526,160 1526,409 609,429\" fill=\"currentColor\" fill-opacity=\"0.035\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-front\" points=\"127,479 1554,451 1554,764 127,745\" fill=\"currentColor\" fill-opacity=\"0.035\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-right\" points=\"1535,163 1737,261 1737,443 1535,410\" fill=\"currentColor\" fill-opacity=\"0.022\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-right\" points=\"1568,453 1759,492 1759,740 1568,762\" fill=\"currentColor\" fill-opacity=\"0.022\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-terrace\" points=\"117,359 609,341 609,429 117,441\" fill=\"currentColor\" fill-opacity=\"0.025\" stroke=\"none\"/>\n  <!-- Upper roof and its thin fascia follow the actual asymmetric overhang. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M348 188 L1556 90 L1798 232\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M348 216 L1557 124 L1798 262\"/>\n  <!-- The upper lounge is set back from the terrace and ground-floor edge. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M609 429 L609 222 L1526 160 L1737 261\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1526 160 L1526 409\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1737 261 L1737 443\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M656 221 L656 427\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M838 211 L838 423\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M978 201 L978 419\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1163 186 L1163 416\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1388 170 L1388 410\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1599 194 L1599 423\"/>\n  <!-- Existing glass terrace balustrade; no gable, crane or imagined structure. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M117 441 L117 359 L714 337 L786 350\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M373 350 L373 434\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M512 345 L512 431\"/>\n  <!-- Horizontal floor band connects the terrace, front and right return. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M57 448 L1558 408 L1782 458\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M57 476 L1558 448 L1782 490\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1558 408 L1558 448\"/>\n  <!-- Ground-floor structural corners and the photographed glazing rhythm. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M127 479 L127 745 L1554 764 L1554 451\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1759 492 L1759 740 L1568 762\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M291 477 L291 747\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M611 469 L611 752\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M793 465 L793 754\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M978 462 L978 756\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1138 458 L1138 759\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1295 454 L1295 760\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1616 469 L1616 755\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1679 483 L1679 748\"/>\n  <!-- Low platform aligns with the real cutout's ground-contact line. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M69 747 L1576 772 L1791 739\"/>\n</svg>"};
  window.PitchArchitecture = {
    markup: function () {
      return '<svg class="film-ground-scan" viewBox="0 0 1672 941" fill="none">' +
        '<g class="film-site-grid"><path d="M307 699 908 652 1080 746 365 779Z"/><path d="M365 719 944 675M340 745 1003 708M412 691 478 774M548 680 626 768M686 669 780 762M826 659 937 753"/><ellipse cx="680" cy="725" rx="350" ry="87"/><ellipse cx="680" cy="725" rx="250" ry="62"/><ellipse cx="680" cy="725" rx="140" ry="35"/></g>' +
        '<path class="film-scan-cursor" d="M520 670 690 774"/><circle class="film-site-dot" cx="677" cy="716" r="7"/><circle class="film-site-ring" cx="677" cy="716" r="24"/></svg>' +
        '<div class="film-building" data-architecture="A"><img class="film-building-ghost" src="../teil6/pavilion-cutout.webp" alt="" width="1774" height="887"><img class="film-building-photo" src="../teil6/pavilion-cutout.webp" alt="" width="1774" height="887">' + blueprints.A + '</div>' +
        '<div class="film-building" data-architecture="B"><img class="film-building-ghost" src="../teil6/lounge-cutout.webp" alt="" width="1846" height="852"><img class="film-building-photo" src="../teil6/lounge-cutout.webp" alt="" width="1846" height="852">' + blueprints.B + '</div>' +
        '<div class="film-site-caption"><i></i><span>ROCKETLIGHT / KONZEPTVISUALISIERUNG</span></div>';
    },
    mount: function (root) {
      const scan = root.querySelector('.film-scan-cursor');
      return {
        update: function (p, context) {
          root.dataset.worldVariant = context.variant;
          root.style.setProperty('--scan-opacity', (ramp(0,.14,p)*(1-ramp(.38,.55,p))).toFixed(4));
          root.style.setProperty('--site-opacity', (ramp(.04,.22,p)*(1-ramp(.5,.68,p))).toFixed(4));
          root.style.setProperty('--draft-progress', ramp(.16,.58,p).toFixed(4));
          root.style.setProperty('--draft-opacity', (ramp(.12,.22,p)*(1-ramp(.76,.98,p))).toFixed(4));
          root.style.setProperty('--ghost-opacity', (.12*ramp(.22,.48,p)*(1-ramp(.68,.84,p))).toFixed(4));
          root.style.setProperty('--build-progress', ramp(.56,.94,p).toFixed(4));
          root.style.setProperty('--build-opacity', ramp(.53,.62,p).toFixed(4));
          root.style.setProperty('--building-light', ramp(.78,1,p).toFixed(4));
          scan.setAttribute('transform', 'translate(' + (-180+600*ramp(0,.4,p)).toFixed(1) + ' 0)');
        }
      };
    }
  };

  const safe = text => String(text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const stamp = text => Date.parse(text+'T00:00:00Z');
  const start = stamp('2026-11-01'), end = stamp('2032-01-01');
  const dateX = text => 210 + (stamp(text)-start)/(end-start)*410;
  const shortLabels = {
    A:[['Genehmigung &','Sicherheit'],['Pavillon & Logistik'],['Kulinarik & Service'],['Vertrieb & Marketing'],['Vier Pilot-Dinner'],['Skalierung &','Regelbetrieb']],
    B:[['Standort sichern'],['Genehmigungen &','Sicherheit'],['Architektur & Bau'],['Küche & Team'],['Vier Pilot-Dinner'],['Vertrieb & Eröffnung']]
  };
  function roadmapMarkup(variant) {
    const {data,meta}=window.PitchEvidence.variants[variant];
    const years=[2027,2028,2029,2030,2031];
    const rows=data.rows.slice(1);
    const gateDots=meta.gates.map(g=>{const d=g.date.split('.').reverse().join('-');return '<g transform="translate('+dateX(d).toFixed(1)+' 69)"><path d="M0 -5 5 0 0 5 -5 0Z"/><text y="-13" text-anchor="middle">'+g.id+'</text></g>';}).join('');
    return '<svg class="film-plan-timeline" viewBox="0 0 640 390" role="img" aria-labelledby="film-roadmap-title film-roadmap-desc"><title id="film-roadmap-title">Sechs parallele Teilprojekte – '+safe(meta.name)+'</title><desc id="film-roadmap-desc">Zeitproportionale Maßnahmenplanung von November 2026 bis Dezember 2031. Die Balken übernehmen die Originaltermine. Die Punkte markieren vier geplante Pilot-Dinner. '+safe(meta.critical)+'</desc><text x="0" y="19" class="plan-chart-heading">SECHS TEILPROJEKTE · EIN GEMEINSAMER PLAN</text><g class="plan-years">'+years.map(y=>'<line x1="'+dateX(y+'-01-01')+'" x2="'+dateX(y+'-01-01')+'" y1="38" y2="354"/><text x="'+dateX(y+'-01-01')+'" y="42">'+y+'</text>').join('')+'</g><g class="plan-gate-dots">'+gateDots+'</g>'+rows.map((row,i)=>{
      const y=104+i*43;
      const bars=row.items.filter(item=>item.t==='bar'||item.t==='track').map(item=>{
        const x=dateX(item.s),w=dateX(item.e)-x;
        return '<rect class="plan-task '+(item.t==='track'?'is-track':'')+'" x="'+x.toFixed(1)+'" y="'+(y+1)+'" width="'+w.toFixed(1)+'" height="9" rx="2"><title>'+safe(row.name+' · '+(item.text||'Planungszeitraum')+' · '+item.s+' bis '+item.e)+'</title></rect>';
      }).join('');
      const pilots=row.items.filter(item=>item.num).map(item=>'<g class="plan-pilot" transform="translate('+dateX(item.d).toFixed(1)+' '+(y+5.5)+')"><circle r="4"/><text y="22" text-anchor="middle">'+item.num+'</text><title>Pilot '+item.num+' · '+item.d+'</title></g>').join('');
      return '<g class="plan-lane" data-plan-lane="'+i+'"><title>'+safe(row.name)+'</title><text x="0" y="'+(y+7)+'" class="plan-lane-label">'+shortLabels[variant][i].map((l,j)=>'<tspan x="0" dy="'+(j?18:0)+'">'+safe(l)+'</tspan>').join('')+'</text><path class="plan-lane-guide" d="M210 '+(y+5.5)+'H620"/>'+bars+pilots+'</g>';
    }).join('')+'<line class="plan-time-scan" x1="210" x2="210" y1="83" y2="354"/><g class="plan-legend"><rect x="0" y="371" width="18" height="6" rx="1"/><text x="28" y="379">geplante Maßnahme</text><circle cx="260" cy="374" r="4"/><text x="274" y="379">Pilot 1–4</text></g></svg>';
  }

  const dateLabel = value => value.split('-').reverse().join('.');
  const monthLabel = value => value.slice(5,7)+'/'+value.slice(2,4);
  const datePercent = value => ((stamp(value)-start)/(end-start)*100).toFixed(4);
  function compactRoadmapMarkup(variant) {
    const {data,meta}=window.PitchEvidence.variants[variant];
    const rows=data.rows.slice(1);
    const pilots=rows.flatMap(row=>row.items.filter(item=>item.num));
    return '<div class="film-mobile-roadmap"><p class="film-mobile-chart-title">Sechs parallele Teilprojekte</p><div class="film-mobile-years" aria-hidden="true">'+[2027,2028,2029,2030,2031].map(year=>'<span style="left:'+datePercent(year+'-01-01')+'%">'+year+'</span>').join('')+'</div><ol class="film-mobile-lanes">'+rows.map((row,i)=>{
      const dated=row.items.flatMap(item=>[item.s,item.e,item.d].filter(Boolean)).sort();
      const activities=row.items.filter(item=>item.t==='bar'||item.t==='track');
      const dinner=row.items.filter(item=>item.num);
      const description=activities.map(item=>(item.text||'Planungszeitraum')+': '+dateLabel(item.s)+' bis '+dateLabel(item.e)).concat(dinner.map(item=>'Pilot '+item.num+': '+dateLabel(item.d))).join('; ');
      return '<li class="film-mobile-lane" data-plan-lane="'+i+'"><div class="film-mobile-lane-head"><strong>'+safe(row.name)+'</strong><span>'+monthLabel(dated[0])+'–'+monthLabel(dated[dated.length-1])+'</span></div><div class="film-mobile-track" role="img" aria-label="'+safe(description)+'">'+activities.map(item=>'<i class="film-mobile-bar '+(item.t==='track'?'is-track':'')+'" style="left:'+datePercent(item.s)+'%;width:'+((stamp(item.e)-stamp(item.s))/(end-start)*100).toFixed(4)+'%" title="'+safe((item.text||'Planungszeitraum')+' · '+dateLabel(item.s)+'–'+dateLabel(item.e))+'"></i>').join('')+dinner.map(item=>'<i class="film-mobile-pilot" style="left:'+datePercent(item.d)+'%" title="Pilot '+item.num+' · '+dateLabel(item.d)+'"><b>'+item.num+'</b></i>').join('')+'</div></li>';
    }).join('')+'</ol><p class="film-mobile-chart-note">Balken = geplante Maßnahmen · Zeitachse 11/2026–12/2031</p></div><p class="film-roadmap-pilots"><span>PILOTEN</span> '+pilots.map(item=>'<time datetime="'+item.d+'">'+item.num+': '+dateLabel(item.d)+'</time>').join('<b aria-hidden="true">·</b>')+'</p><p class="film-mobile-critical">'+safe(meta.critical)+'</p>';
  }

  window.PitchScenes = window.PitchScenes || {};
  window.PitchScenes[6] = {
    markup: function () {
      return '<div class="film-architecture-plan"><div class="film-plan-header"><div class="film-variant-switch" role="group" aria-label="Variante in der Filmszene wählen"><button type="button" data-variant="A" aria-pressed="true">A <span>Pavillon</span></button><button type="button" data-variant="B" aria-pressed="false">B <span>Lounge</span></button></div>' +
        '<div class="film-plan-budget"><span class="film-plan-name"></span><strong class="film-plan-total"></strong><small class="film-plan-unit"></small></div></div>' +
        '<div class="film-plan-views"><div class="film-gates-view"><ol class="film-plan-gates">' + [0,1,2,3,4].map(i=>'<li><i></i><span>G'+i+'</span><time></time><strong></strong></li>').join('') + '</ol>' +
        '<p class="film-plan-note">Geplante Gates · Die Animation zeigt den Pitch-Fortschritt.</p></div><div class="film-timeline-view"></div></div></div>';
    },
    mount: function (root) {
      const plan = root.querySelector('.film-architecture-plan');
      const name = root.querySelector('.film-plan-name');
      const total = root.querySelector('.film-plan-total');
      const unit = root.querySelector('.film-plan-unit');
      const timeline = root.querySelector('.film-timeline-view');
      const gatesView = root.querySelector('.film-gates-view');
      let lanes=[],scan;
      const gates = Array.from(root.querySelectorAll('.film-plan-gates li')).map(el=>({el,date:el.querySelector('time'),title:el.querySelector('strong')}));
      let previousVariant;
      return {
        update: function (p, context) {
          const variant = context.variant;
          if (variant !== previousVariant) {
            previousVariant = variant;
            const m = window.PitchEvidence.variants[variant].meta;
            name.textContent = variant === 'A' ? 'MOBILER PAVILLON' : 'LOUNGE TITUSVILLE';
            total.textContent = m.budget;
            unit.textContent = m.budgetLabel;
            gates.forEach((gate,i)=>{gate.date.textContent=m.gates[i].date;gate.title.textContent=m.gates[i].title;});
            timeline.innerHTML=roadmapMarkup(variant)+compactRoadmapMarkup(variant);
            lanes=Array.from(timeline.querySelectorAll('[data-plan-lane]'));
            scan=timeline.querySelector('.plan-time-scan');
          }
          const complete = Boolean(context.reduced || context.mobile);
          const roadmap = complete ? 1 : ramp(.43,.51,p);
          plan.style.setProperty('--roadmap-mix',roadmap.toFixed(4));
          plan.dataset.planView=context.mobile?'linear':roadmap>.5?'roadmap':'gates';
          gatesView.setAttribute('aria-hidden',String(!context.mobile && roadmap>.5));
          timeline.setAttribute('aria-hidden',String(!context.mobile && roadmap<=.5));
          const progress=complete?1:ramp(.45,.92,p);
          lanes.forEach((lane,i)=>lane.style.setProperty('--lane-reveal',(complete?1:ramp(.45+Number(lane.dataset.planLane)*.047,.54+Number(lane.dataset.planLane)*.047,p)).toFixed(4)));
          scan.setAttribute('x1',(210+410*progress).toFixed(1));
          scan.setAttribute('x2',(210+410*progress).toFixed(1));
          scan.style.opacity=(progress>0&&progress<1?.7:0);
          plan.style.setProperty('--gate-progress', ramp(.30,.95,p).toFixed(4));
          gates.forEach((gate,i)=>{
            const amount=ramp(.25+i*.13,.36+i*.13,p);
            gate.el.style.setProperty('--gate-light',amount.toFixed(4));
          });
        }
      };
    }
  };
})();
