/* Source-backed roadmap phases and their parallel workstreams. */
(() => {
  'use strict';
  const clamp = n => Math.min(1, Math.max(0, n));
  const ramp = (a,b,p) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
  const safe = text => String(text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const stamp = text => Date.parse(text+'T00:00:00Z');
  const start = stamp('2026-11-01'), end = stamp('2032-01-01');
  // Slide 5 of the final roadmap presentation (quellen/Schritt_6_Roadmap.pptx), exported unchanged.
  const roadmapImageMarkup = () => '<figure class="film-roadmap-image"><img src="assets/roadmap-folie-5.png" width="3840" height="2160" loading="lazy" decoding="async" alt="Roadmap für den festen Pavillon in Florida, Planung 2026 bis 2031: Gesamtprojekt und sechs Teilprojekte mit den Gates G0 am 30.11.2026, G1 am 31.03.2027, G2 am 30.09.2027, G3 am 30.09.2028 und G4 am 31.07.2029, vier Pilot-Dinner und Regelbetrieb bei Go."></figure>';

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
            timeline.innerHTML=roadmapImageMarkup()+compactRoadmapMarkup(variant)+gatesMarkup(variant);
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
