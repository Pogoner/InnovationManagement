/* Source-backed roadmap phases and their parallel workstreams. */
(() => {
  'use strict';
  const clamp = n => Math.min(1, Math.max(0, n));
  const ramp = (a,b,p) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
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
      return '<li class="film-mobile-lane" data-plan-lane="'+i+'"><div class="film-mobile-lane-head"><strong>'+safe(row.name)+'</strong><span>'+monthLabel(dated[0])+'–'+monthLabel(dated[dated.length-1])+'</span></div><div class="film-mobile-track" role="img" aria-label="'+safe(description)+'">'+activities.map(item=>'<i class="film-mobile-bar '+(item.t==='track'?'is-track':'')+'" style="left:'+datePercent(item.s)+'%;width:'+((stamp(item.e)-stamp(item.s))/(end-start)*100).toFixed(4)+'%" title="'+safe((item.text||'Planungszeitraum')+' · '+dateLabel(item.s)+'–'+dateLabel(item.e))+'"></i>').join('')+dinner.map(item=>'<i class="film-mobile-pilot" style="left:'+datePercent(item.d)+'%" title="Pilot '+item.num+' · '+dateLabel(item.d)+'"><b>'+item.num+'</b></i>').join('')+'</div><ul class="film-mobile-activities">'+activities.map(item=>'<li><span>'+safe(item.text||'Planungszeitraum')+'</span><time>'+dateLabel(item.s)+'–'+dateLabel(item.e)+'</time></li>').join('')+'</ul></li>';
    }).join('')+'</ol><p class="film-mobile-chart-note">Balken = geplante Maßnahmen · Zeitachse 11/2026–12/2031</p></div><p class="film-roadmap-pilots"><span>PILOTEN</span> '+pilots.map(item=>'<time datetime="'+item.d+'">'+item.num+': '+dateLabel(item.d)+'</time>').join('<b aria-hidden="true">·</b>')+'</p><p class="film-mobile-critical">'+safe(meta.critical)+'</p>';
  }

  const phaseName = phase => phase.tag.split(' / ').slice(1).join(' / ');
  const activityMarkup = phase => '<ol class="film-phase-tasks">'+phase.activities.map(item=>'<li><span>'+safe(item.label)+'</span><time'+(item.date?' datetime="'+item.date+'"':'')+'>'+safe(item.period)+'</time></li>').join('')+'</ol>';
  const phaseMarkup = (phase,index,linear=false) => '<article class="film-phase-card'+(linear?' is-linear':'')+'" data-roadmap-phase="'+index+'"><div class="film-phase-kicker"><span>'+String(index+1).padStart(2,'0')+' / 08</span><span>GEPLANT · '+safe(phase.period)+'</span></div><h3>'+safe(phaseName(phase))+'</h3>'+activityMarkup(phase)+'<p class="film-phase-picture"><span>IM BILD</span>'+safe(phase.imageAction)+'</p><p class="film-phase-result"><span>PRÜFPUNKT</span>'+safe(phase.result)+'</p><p class="film-phase-parallel"><span>PARALLEL</span>'+safe(phase.parallel)+'</p></article>';
  const gatesMarkup = variant => '<div class="film-gate-strip"><p>FÜNF GEPLANTE FREIGABEN</p><ol>'+window.PitchEvidence.variants[variant].meta.gates.map(gate=>'<li><b>'+safe(gate.id)+'</b><time datetime="'+gate.date.split('.').reverse().join('-')+'">'+safe(gate.date)+'</time><span>'+safe(gate.title)+'</span></li>').join('')+'</ol></div>';

  window.PitchScenes = window.PitchScenes || {};
  window.PitchScenes[6] = {
    markup: function () {
      return '<div class="film-architecture-plan"><div class="film-plan-header"><div class="film-variant-switch" role="group" aria-label="Variante in der Filmszene wählen"><button type="button" data-variant="A" aria-pressed="true">A <span>Pavillon</span></button><button type="button" data-variant="B" aria-pressed="false">B <span>Lounge</span></button></div><div class="film-plan-budget"><span class="film-plan-name"></span><strong class="film-plan-total"></strong><small class="film-plan-unit"></small></div></div><div class="film-phase-position" aria-hidden="true">'+Array.from({length:8},(_,i)=>'<i data-phase-position="'+i+'"></i>').join('')+'</div><div class="film-current-phase"></div><div class="film-phase-sequence"></div><div class="film-timeline-view"></div><p class="film-phase-plan-note">Bildphasen verdichten den Originalplan. Arbeitspakete laufen teilweise parallel; die Animation zeigt keinen erreichten Projektstatus.</p></div>';
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
      let cards=[],lanes=[],scan,previousVariant;
      return {
        update: function (p, context) {
          const variant = context.variant;
          const phases = window.PitchRoadmapPhases[variant];
          if (variant !== previousVariant) {
            previousVariant=variant;
            const meta=window.PitchEvidence.variants[variant].meta;
            name.textContent=variant==='A'?'MOBILER PAVILLON':'LOUNGE TITUSVILLE';
            total.textContent=meta.budget; unit.textContent=meta.budgetLabel;
            current.innerHTML=phases.slice(0,7).map((phase,index)=>phaseMarkup(phase,index)).join('');
            sequence.innerHTML='<p class="film-phase-sequence-heading">Acht Bildphasen · ein paralleler Maßnahmenplan</p>'+phases.map((phase,index)=>phaseMarkup(phase,index,true)).join('');
            timeline.innerHTML=roadmapMarkup(variant)+compactRoadmapMarkup(variant)+gatesMarkup(variant);
            cards=Array.from(current.children);
            lanes=Array.from(timeline.querySelectorAll('[data-plan-lane]'));
            scan=timeline.querySelector('.plan-time-scan');
          }
          let index=0;
          phases.forEach((phase,i)=>{if(p>=phase.at)index=i;});
          // The reduced layout remains complete even when a phase button was used.
          const linear=Boolean(context.reduced || context.mobile || document.body.classList.contains('is-reduced'));
          const fullPlan=index===7;
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
          const progress=linear?1:ramp(.86,.97,p);
          lanes.forEach(lane=>lane.style.setProperty('--lane-reveal',(linear?1:ramp(.86+Number(lane.dataset.planLane)*.012,.90+Number(lane.dataset.planLane)*.012,p)).toFixed(4)));
          scan.setAttribute('x1',(210+410*progress).toFixed(1));
          scan.setAttribute('x2',(210+410*progress).toFixed(1));
          scan.style.opacity=progress>0&&progress<1?.7:0;
        }
      };
    }
  };
})();
