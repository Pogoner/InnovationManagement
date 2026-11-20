/* Source-backed roadmap phases and their parallel workstreams. */
(() => {
  'use strict';
  const clamp = n => Math.min(1, Math.max(0, n));
  const ramp = (a,b,p) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
  const safe = text => String(text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const stamp = text => Date.parse(text+'T00:00:00Z');
  const start = stamp('2026-11-01'), end = stamp('2032-01-01');
  // Full plan as one static Gantt graphic (rows of data.rows, same data as the phase cards).
  const G = {width:1600, startX:294, scale:95, rowHeight:88, top:62};
  const GC = {gate:'#efbd91', qg:'#a9d9d9', ms:'#8cbaa5', link:'#a1afd1', start:'#d69a92', end:'#8cbaa5', bg:'#0a131c'};
  const gRowTop = index => G.top + index * G.rowHeight;
  const gCenter = index => gRowTop(index) + 46;
  const gPos = value => {
    const [year, month, day] = value.split('-').map(Number);
    const months = (year - 2026) * 12 + (month - 10) + (day - 1) / new Date(year, month, 0).getDate();
    return G.startX + (months <= 27 ? months * .35 * G.scale : 27 * .35 * G.scale + (months - 27) * 1.4 / 12 * G.scale);
  };
  const gSource = value => G.startX + (value - 4.85) * G.scale;
  const gLines = name => {
    if (name.length <= 20) return [name];
    const words = name.split(' ');
    let best = [name, ''], gap = Infinity;
    for (let i = 1; i < words.length; i++) {
      const left = words.slice(0, i).join(' '), right = words.slice(i).join(' ');
      if (Math.abs(left.length - right.length) < gap) { gap = Math.abs(left.length - right.length); best = [left, right]; }
    }
    return best;
  };
  const gOne = (n, d = 1) => Number(n.toFixed(d));
  // Bar caption: omitted when it does not fit, moved right of a milestone that would cross it.
  function title(item, from, to, tip, y, dias) {
    if (!item.text) return '';
    const len = item.text.length * 6.6;
    let x = (from + to - tip) / 2 + 1, anchor = 'middle';
    if (len >= to - from - tip - 6) return '';
    const hit = dias.filter(d => d > from + 4 && d < to - tip - 4 && Math.abs(d - x) < len / 2 + 12);
    if (hit.length) { x = Math.max(...hit) + 16; anchor = 'start'; if (x + len >= to - tip - 4) return ''; }
    return '<text x="'+gOne(x)+'" y="'+(y+18)+'" text-anchor="'+anchor+'" class="g-phase-title '+safe(item.style)+'">'+safe(item.text)+'</text>';
  }
  function ganttRow(row, index) {
    const center = gCenter(index), items = row.items || [];
    const dias = items.filter(item => item.t === 'dia').map(item => gPos(item.d));
    let out = '';
    items.forEach(item => {
      if (item.t === 'bar') {
        const from = gPos(item.s), to = gPos(item.e), y = gRowTop(index) + 33, h = 26, tip = Math.min(11, (to - from) / 3);
        out += '<path d="M'+gOne(from)+' '+y+'H'+gOne(to-tip)+'L'+gOne(to)+' '+(y+h/2)+'L'+gOne(to-tip)+' '+(y+h)+'H'+gOne(from)+'Z" class="g-phase '+safe(item.style)+'"/>'+
          title(item, from, to, tip, y, dias);
      } else if (item.t === 'track') {
        out += '<line x1="'+gOne(gPos(item.s))+'" x2="'+gOne(gPos(item.e))+'" y1="'+center+'" y2="'+center+'" class="g-track"/>';
      }
    });
    items.forEach(item => {
      if (item.t === 'dia') {
        const x = gPos(item.d), size = 10, color = GC[item.kind];
        out += '<path d="M'+gOne(x)+' '+(center-size)+'L'+gOne(x+size)+' '+center+'L'+gOne(x)+' '+(center+size)+'L'+gOne(x-size)+' '+center+'Z" class="g-dia" fill="'+(item.planned ? GC.bg : color)+'" stroke="'+(item.planned ? color : GC.bg)+'"/>'+
          (item.num ? '<text x="'+gOne(x)+'" y="'+(center+4)+'" text-anchor="middle" class="g-dia-num" style="fill:'+(item.planned ? color : GC.bg)+'">'+safe(item.num)+'</text>' : '');
      } else if (item.t === 'tri') {
        const color = item.dir === 'start' ? GC.start : GC.end, x = gPos(item.d), w = 9, h = 11;
        const path = item.dir === 'start'
          ? 'M'+gOne(x-w)+' '+(center-h)+'L'+gOne(x+w)+' '+center+'L'+gOne(x-w)+' '+(center+h)+'Z'
          : 'M'+gOne(x+w)+' '+(center-h)+'L'+gOne(x-w)+' '+center+'L'+gOne(x+w)+' '+(center+h)+'Z';
        out += '<path d="'+path+'" class="g-dia" fill="'+(item.planned ? GC.bg : color)+'" stroke="'+color+'"/>';
      } else if (item.t === 'lab') {
        const x = gPos(item.d), y = item.pos === 'above' ? gRowTop(index) + 22 : gRowTop(index) + 78;
        out += '<text x="'+gOne(x)+'" y="'+y+'" text-anchor="middle" class="g-label">'+safe(item.text)+'</text>';
      }
    });
    return out;
  }
  function ganttMarkup(variant) {
    const {data,meta}=window.PitchEvidence.variants[variant];
    const rows = data.rows, bottom = gRowTop(rows.length);
    const years = [['2026','2026-10-01','2027-01-01'],['2027','2027-01-01','2028-01-01'],['2028','2028-01-01','2029-01-01'],['2029','2029-01-01','2030-01-01'],['2030','2030-01-01','2031-01-01'],['2031','2031-01-01','2032-01-01']];
    const quarters = [['Q4','2026-10-01','2027-01-01']];
    ['2027','2028'].forEach(year => ['01','04','07','10'].forEach((month, i) => quarters.push(['Q'+(i+1), year+'-'+month+'-01', i < 3 ? year+'-'+['04','07','10'][i]+'-01' : (Number(year)+1)+'-01-01'])));
    let m = '<text x="18" y="30" class="g-axis">TEILPROJEKT</text>';
    years.forEach(([label, from, to]) => {
      const x0 = gPos(from), x1 = gPos(to);
      m += '<rect x="'+gOne(x0)+'" y="0" width="'+gOne(x1-x0-2)+'" height="31" rx="3" class="g-year-bg"/><text x="'+gOne(label === '2026' ? x0+10 : (x0+x1)/2)+'" y="22" text-anchor="'+(label === '2026' ? 'start' : 'middle')+'" class="g-year">'+label+'</text>';
    });
    quarters.forEach(([label, from, to], i) => { m += '<text x="'+gOne(i ? (gPos(from)+gPos(to))/2 : gPos(from)+10)+'" y="51" text-anchor="'+(i ? 'middle' : 'start')+'" class="g-quarter">'+label+'</text>'; });
    m += '<text x="'+gOne((gPos('2029-01-01')+G.width)/2)+'" y="51" text-anchor="middle" class="g-quarter">JAHRESRASTER</text>';
    quarters.slice(1).forEach(([label, from]) => { m += '<line x1="'+gOne(gPos(from))+'" x2="'+gOne(gPos(from))+'" y1="60" y2="'+bottom+'" class="'+(label === 'Q1' ? 'g-grid-year' : 'g-grid-quarter')+'"/>'; });
    ['2029-01-01','2030-01-01','2031-01-01'].forEach(from => { m += '<line x1="'+gOne(gPos(from))+'" x2="'+gOne(gPos(from))+'" y1="60" y2="'+bottom+'" class="g-grid-year"/>'; });
    rows.forEach((row, index) => {
      const y = gRowTop(index), lines = gLines(row.name);
      m += '<g class="g-row"><rect x="0" y="'+y+'" width="'+G.width+'" height="'+G.rowHeight+'" rx="3" class="g-band"/>'+
        '<text x="18" y="'+(y+51)+'" class="g-index">'+String(index).padStart(2,'0')+'</text>'+
        '<text x="52" y="'+(y+(lines.length > 1 ? 40 : 52))+'" class="g-name">'+lines.map((line, i) => '<tspan x="52" dy="'+(i ? 20 : 0)+'">'+safe(line)+'</tspan>').join('')+'</text>'+ganttRow(row, index)+'</g>';
    });
    (data.links || []).forEach(link => {
      const fx = gPos(link.from.d), fy = gCenter(link.from.row), tx = gPos(link.to.d), ty = gCenter(link.to.row);
      m += '<g class="g-dep"><path d="M'+gOne(fx)+' '+fy+'V'+ty+'H'+gOne(tx)+'"/><circle cx="'+gOne(fx)+'" cy="'+fy+'" r="4"/><circle cx="'+gOne(tx)+'" cy="'+ty+'" r="4"/>'+
        (link.text ? '<text x="'+gOne(gSource(link.textX))+'" y="'+(gRowTop(link.textRow)+22)+'">'+safe(link.text)+'</text>' : '')+'</g>';
    });
    const diamond = (x, color) => '<path d="M'+x+' 8L'+(x+7)+' 15L'+x+' 22L'+(x-7)+' 15Z" fill="'+color+'"/>';
    const ly = bottom + 14;
    m += '<g class="g-legend" transform="translate(0 '+ly+')">'+diamond(14,GC.gate)+'<text x="28" y="19">Gate</text>'+diamond(110,GC.qg)+'<text x="124" y="19">Genehmigung · Abnahme</text>'+diamond(330,GC.ms)+'<text x="344" y="19">Meilenstein</text>'+
      '<path d="M450 9h22l6 6-6 6h-22Z" class="g-phase p2"/><text x="488" y="19">Planphase</text><path d="M590 9h22l6 6-6 6h-22Z" class="g-phase dot"/><text x="628" y="19">nach Gate-Entscheid</text>'+
      '</g>';
    return '<svg class="film-gantt" viewBox="0 0 '+G.width+' '+(bottom+52)+'" role="img" aria-label="Roadmap für den festen Pavillon, Oktober 2026 bis Dezember 2031: Gesamtprojekt und sechs Teilprojekte mit Gates G0 bis G4">'+m+'</svg>';
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
      return '<li class="film-mobile-lane" data-plan-lane="'+i+'"><div class="film-mobile-lane-head"><strong>'+safe(row.name)+'</strong><span>'+monthLabel(dated[0])+'–'+monthLabel(dated[dated.length-1])+'</span></div><div class="film-mobile-track" role="img" aria-label="'+safe(description)+'">'+activities.map(item=>'<i class="film-mobile-bar '+(item.t==='track'?'is-track':'')+'" style="left:'+datePercent(item.s)+'%;width:'+((stamp(item.e)-stamp(item.s))/(end-start)*100).toFixed(4)+'%" title="'+safe((item.text||'Planungszeitraum')+' · '+dateLabel(item.s)+'–'+dateLabel(item.e))+'"></i>').join('')+dinner.map(item=>'<i class="film-mobile-pilot" style="left:'+datePercent(item.d)+'%" title="Pilot '+item.num+' · '+dateLabel(item.d)+'"><b>'+item.num+'</b></i>').join('')+'</div><ul class="film-mobile-activities">'+activities.map(item=>'<li><span>'+safe(item.text||'Planungszeitraum')+'</span><time>'+dateLabel(item.s)+'–'+dateLabel(item.e)+'</time></li>').join('')+'</ul></li>';
    }).join('')+'</ol><p class="film-mobile-chart-note">Balken = geplante Maßnahmen · Zeitachse 11/2026–12/2031</p></div><p class="film-roadmap-pilots"><span>PILOTEN</span> '+pilots.map(item=>'<time datetime="'+item.d+'">'+item.num+': '+dateLabel(item.d)+'</time>').join('<b aria-hidden="true">·</b>')+'</p><p class="film-mobile-critical">'+safe(meta.critical)+'</p>';
  }

  const phaseName = phase => phase.tag.split(' / ').slice(1).join(' / ');
  const activityMarkup = phase => '<ol class="film-phase-tasks">'+phase.activities.map(item=>'<li><span>'+safe(item.label)+'</span><time'+(item.date?' datetime="'+item.date+'"':'')+'>'+safe(item.period)+'</time></li>').join('')+'</ol>';
  const locationMarkup = () => '<div class="film-location-perspective" role="group" aria-label="Standortstrategie: Florida und Texas">'+
    '<p class="film-location-kicker">STANDORTSTRATEGIE</p><div class="film-location-pair">'+
    '<div class="film-location film-location-first"><div class="film-location-heading"><span class="film-location-node" aria-hidden="true">1</span><h4>Florida</h4></div><p>Regelbetrieb ab August 2029 bei Go an G4</p></div>'+
    '<div class="film-location film-location-second"><div class="film-location-heading"><span class="film-location-node" aria-hidden="true">2</span><h4>Texas</h4></div><p>Eigenständige Machbarkeits- und Investitionsprüfung</p></div></div></div>';
  const phaseMarkup = (phase,index,linear=false) => '<article class="film-phase-card'+(linear?' is-linear':'')+(phase.id==='operate'?' is-operation':'')+'" data-roadmap-phase="'+index+'"><div class="film-phase-kicker"><span>'+String(index+1).padStart(2,'0')+' / '+String(window.PitchRoadmapPhases.A.length).padStart(2,'0')+'</span><span>GEPLANT · '+safe(phase.period)+'</span></div><h3>'+safe(phaseName(phase))+'</h3>'+(phase.id==='operate'?locationMarkup():'')+(phase.id==='overview'||(phase.id==='operate'&&!linear)?'':activityMarkup(phase))+'<p class="film-phase-result"><span>PRÜFPUNKT</span>'+safe(phase.result)+'</p></article>';
  const gatesMarkup = variant => '<div class="film-gate-strip"><p>FÜNF GEPLANTE FREIGABEN</p><ol>'+window.PitchEvidence.variants[variant].meta.gates.map(gate=>'<li><b>'+safe(gate.id)+'</b><time datetime="'+gate.date.split('.').reverse().join('-')+'">'+safe(gate.date)+'</time><span>'+safe(gate.title)+'</span></li>').join('')+'</ol></div>';

  window.PitchScenes = window.PitchScenes || {};
  window.PitchScenes[6] = {
    markup: function () {
      return '<div class="film-architecture-plan"><div class="film-plan-header"><div class="film-plan-budget"><span class="film-plan-name"></span><strong class="film-plan-total"></strong><small class="film-plan-unit"></small></div></div><div class="film-phase-position" aria-hidden="true">'+window.PitchRoadmapPhases.A.map((_,i)=>'<i data-phase-position="'+i+'"></i>').join('')+'</div><div class="film-current-phase"></div><div class="film-phase-sequence"></div><div class="film-timeline-view"></div></div>';
    },
    mount: function (root) {
      const plan = root.querySelector('.film-architecture-plan');
      const name = root.querySelector('.film-plan-name');
      const total = root.querySelector('.film-plan-total');
      const unit = root.querySelector('.film-plan-unit');
      const current = root.querySelector('.film-current-phase');
      const sequence = root.querySelector('.film-phase-sequence');
      const timeline = root.querySelector('.film-timeline-view');
      const phasePositions = Array.from(root.querySelectorAll('[data-phase-position]'));
      let cards=[],built=false;
      return {
        update: function (p, context) {
          const variant = 'A';
          const phases = window.PitchRoadmapPhases[variant];
          if (!built) {
            built=true;
            const meta=window.PitchEvidence.variants[variant].meta;
            name.textContent=meta.horizonLabel;
            total.textContent=meta.horizon;
            unit.textContent=meta.horizonNote;
            current.innerHTML=phases.map((phase,index)=>phaseMarkup(phase,index)).join('');
            sequence.innerHTML='<p class="film-phase-sequence-heading">Maßnahmen und Termine im Überblick</p>'+phases.map((phase,index)=>phaseMarkup(phase,index,true)).join('');
            timeline.innerHTML='<div class="film-gantt-scroll">'+ganttMarkup(variant)+'</div>'+compactRoadmapMarkup(variant)+gatesMarkup(variant);
            cards=Array.from(current.children);
          }
          let index=0;
          phases.forEach((phase,i)=>{if(p>=phase.at)index=i;});
          // The reduced layout remains complete even when a phase button was used.
          const linear=Boolean(context.reduced || context.mobile || document.body.classList.contains('is-reduced'));
          // The ninth step shows the complete plan; the viewer decides how long to stay on it.
          const fullPlan=phases[index].id==='overview';
          plan.dataset.planView=linear?'linear':fullPlan?'roadmap':'phase';
          plan.dataset.activePhase=String(index);
          current.hidden=linear||fullPlan;
          sequence.hidden=!linear;
          timeline.hidden=!linear&&!fullPlan;
          current.setAttribute('aria-hidden',String(linear||fullPlan));
          sequence.setAttribute('aria-hidden',String(!linear));
          timeline.setAttribute('aria-hidden',String(!linear&&!fullPlan));
          cards.forEach((card,i)=>{card.hidden=i!==index;card.setAttribute('aria-hidden',String(i!==index));});
          phasePositions.forEach((node,i)=>{node.classList.toggle('is-active',i===index);node.classList.toggle('is-past',i<index);});
          const local=clamp((p-phases[index].at)/((phases[index+1]?.at??1)-phases[index].at));
          plan.style.setProperty('--phase-reveal',(index===0?1:.55+.45*ramp(0,.18,local)).toFixed(4));
          plan.style.setProperty('--location-reveal',(linear?1:ramp(phases[7].at,phases[7].at+.06,p)).toFixed(4));
        }
      };
    }
  };
})();
