/* The study's reasoning stays in the same scene as its outcomes.
 * Reuses the existing mission and selection drawings; source data is read-only. */
(() => {
  'use strict';
  const scenes = window.PitchScenes;
  const clamp = n => Math.max(0, Math.min(1, Number(n) || 0));
  const smooth = (a,b,n) => { const p=clamp((n-a)/(b-a)); return p*p*(3-2*p); };
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const svg = (key,title,content) => `<svg class="fm-flow-svg" data-flow-panel="${key}" viewBox="0 0 640 520" role="img" aria-labelledby="fm-${key}-title"><title id="fm-${key}-title">${esc(title)}</title>${content}</svg>`;
  const label = (text,x,y,cls='fm-label',anchor='start') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${esc(text)}</text>`;
  const lines = (items,x,y,cls='fm-copy',space=24) => items.map((t,i)=>label(t,x,y+i*space,cls)).join('');

  function factsPanel() {
    const tile=(x,y,w,h,delay,kicker,body)=>`<g data-flow-reveal="${delay}"><rect class="fm-tile" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>${label(kicker,x+16,y+30,'fm-kicker')}${body}</g>`;
    const stat=(x,y,value,unit='')=>`<text class="fm-stat" x="${x}" y="${y}">${esc(value)}${unit?`<tspan class="fm-unit" dx="8">${esc(unit)}</tspan>`:''}</text>`;
    return svg('facts','SpaceX in Zahlen: gegründet 2002, mehr als 22.000 Mitarbeitende, Börsengang im Juni 2026, Konzernumsatz 2025 von 18,67 Milliarden US-Dollar bei einem Nettoverlust von 4,94 Milliarden. Das Segment Connectivity, zu dem Starlink gehört, erzielte 11,39 Milliarden Umsatz und 4,42 Milliarden operativen Gewinn.',`
      ${label('SPACEX IN ZAHLEN',24,30,'fm-kicker')}
      ${tile(24,48,189,124,0,'GEGRÜNDET',stat(40,132,'2002')+label('Starbase, Texas',40,158,'fm-note'))}
      ${tile(225,48,189,124,.08,'MITARBEITENDE',stat(241,132,'22.000+')+label('Stand 31.03.2026',241,158,'fm-note'))}
      ${tile(426,48,190,124,.16,'BÖRSENGANG',stat(442,132,'2026')+label('seit 12. Juni',442,158,'fm-note'))}
      ${tile(24,184,290,124,.28,'UMSATZ 2025',stat(40,268,'18,67','Mrd. USD')+label('Konzern, inkl. xAI und X',40,294,'fm-note'))}
      ${tile(326,184,290,124,.36,'NETTOERGEBNIS 2025',stat(342,268,'−4,94','Mrd. USD')+label('−26 % Umsatzrendite',342,294,'fm-note'))}
      ${tile(24,320,592,150,.5,'CONNECTIVITY (U. A. STARLINK) · 2025',stat(40,408,'11,39','Mrd. USD')+label('Umsatz',40,434,'fm-note')+stat(342,408,'4,42','Mrd. USD')+label('Operativer Gewinn',342,434,'fm-note')+label('Die Gewinnquelle des Konzerns',40,458,'fm-small'))}
      <g data-flow-reveal=".62">${label('Quelle: SEC-Unterlagen von SpaceX (2026)',24,500,'fm-note')}</g>`);
  }

  function selectionFunnel() {
    return svg('funnel','19 trendbasierte Ideen werden zu acht Favoriten. Vier separat entstandene Open-Innovation-Ideen ergänzen diese zu zwölf Matrixideen. Drei werden vertieft. Vorauswahl: Problembeleg, zahlende Nachfrage und SpaceX-Beitrag.',`
      ${label('VON DER SUCHE ZUR VERTIEFUNG',24,30,'fm-kicker')}
      <g data-flow-reveal="0">${label('19',60,103,'fm-big')}${label('Trendideen',62,133,'fm-copy')}<path class="fm-join" pathLength="1" d="M137 89H241m-8-7 8 7-8 7" data-flow-trace/>${label('8',274,103,'fm-big')}${label('Favoriten',274,133,'fm-copy')}</g>
      <g data-flow-reveal=".12">${label('+ 4',434,103,'fm-big fm-ice')}${label('Open Innovation',434,133,'fm-copy')}${label('separat entstanden',434,157,'fm-note')}<path class="fm-join" pathLength="1" d="M295 150V191H350V219M493 178V191H350" data-flow-trace/></g>
      <g data-flow-reveal=".24"><rect class="fm-total-box" x="244" y="222" width="368" height="92" rx="12"/>${label('12',270,281,'fm-big')}${lines(['Ideen in der','Now/How/Wow-Matrix'],356,260,'fm-copy',24)}<path class="fm-join" pathLength="1" d="M350 317V348m-7-8 7 8 7-8" data-flow-trace/></g>
      <g data-flow-reveal=".35">${label('3',278,398,'fm-big')}${lines(['Business Cases','für die Vertiefung'],340,377,'fm-copy',24)}</g>
      <g data-flow-reveal=".46"><path class="fm-rule" d="M24 438H612"/>${label('DIE VORAUSWAHL FRAGT',24,468,'fm-kicker')}${label('Problem belegt? · Wer zahlt? · SpaceX-Beitrag?',24,499,'fm-copy')}</g>`);
  }

  function matrixDifference() {
    const item=window.PitchResearch.matrix.find(idea=>idea.id===8);
    const {team,ai}=item;
    const y=n=>388-(n-1)*77;
    const x=n=>94+(n-1)*111;
    return svg('matrix-difference',`Launch Engineering Cloud: Team Machbarkeit ${team.feasibility}, Originalität ${team.originality}, ${team.category}; KI Machbarkeit ${ai.feasibility}, Originalität ${ai.originality}, ${ai.category}. Ein Originalitätspunkt verändert die Kategorie, nicht den Nachweis der Geschäftsidee.`,`
      ${label('EIN PUNKT. EINE ANDERE KATEGORIE.',24,30,'fm-kicker')}
      ${label('08 / Launch Engineering Cloud',24,68,'fm-heading')}
      <g data-flow-reveal="0"><rect class="fm-quadrant" x="371.5" y="80" width="166.5" height="115.5"/><path class="fm-grid" d="M94 80V388H538M94 195.5H538M371.5 80V388"/>
      ${label('WOW',496,111,'fm-kicker','middle')}${label('NOW',496,368,'fm-kicker','middle')}${label('ORIGINALITÄT',94,105,'fm-note')}${label('MACHBARKEIT',538,438,'fm-note','end')}
      ${[1,2,3,4,5].map(n=>`${label(n,78,y(n)+5,'fm-tick','end')}${label(n,x(n),414,'fm-tick','middle')}`).join('')}</g>
      <g data-flow-reveal=".10"><circle class="fm-team-dot" cx="${x(team.feasibility)}" cy="${y(team.originality)}" r="12"/>${label(`Team · ${team.category}`,x(team.feasibility)-23,y(team.originality)+35,'fm-copy','end')}</g>
      <g class="method-attention" data-flow-reveal=".23"><path class="fm-difference-line" pathLength="1" d="M${x(team.feasibility)} ${y(team.originality)-15}V${y(ai.originality)+15}m-5 6 5-6 5 6" data-flow-trace/><circle class="fm-ai-dot" cx="${x(ai.feasibility)}" cy="${y(ai.originality)}" r="12"/>${label(`KI · ${ai.category}`,x(ai.feasibility)-24,y(ai.originality)-12,'fm-copy','end')}${label('3 → 4',x(ai.feasibility)+22,(y(ai.originality)+y(team.originality))/2+4,'fm-difference-label')}</g>
      <g data-flow-reveal=".4"><path class="fm-rule" d="M24 448H612"/>${label('ABWEICHENDE ORIGINALITÄTSBEWERTUNG',24,476,'fm-kicker fm-alert')}${label('Die Kategorie ordnet ein. Das Team entscheidet über die Vertiefung.',24,505,'fm-note')}</g>`);
  }

  function wrap(step, panels, phases, sourceRanges) {
    const original=scenes[step];
    scenes[step]={
      markup:()=>`<div class="fm-flow" data-flow-step="${step}"><div class="fm-base">${original.markup()}</div>${panels.map(p=>p.markup()).join('')}</div>`,
      mount(root) {
        const base=root.querySelector('.fm-base'),renderer=original.mount(base);
        const layers=panels.map(p=>({key:p.key,node:root.querySelector(`[data-flow-panel="${p.key}"]`)}));
        const reveal=layers.map(layer=>({layer,items:[...layer.node.querySelectorAll('[data-flow-reveal]')],traces:[...layer.node.querySelectorAll('[data-flow-trace]')]}));
        return {update(progress,context={}) {
          const p=context.reduced?1:clamp(progress);
          let index=0;phases.forEach((at,i)=>{if(p>=at)index=i;});
          const q=clamp((p-phases[index])/((phases[index+1]??1)-phases[index]||1));
          const range=sourceRanges[index],active=panels.find(panel=>panel.index===index);
          base.hidden=Boolean(active);base.setAttribute('aria-hidden',String(Boolean(active)));base.inert=Boolean(active);
          if(range) renderer.update(range[0]+(range[1]-range[0])*q,{...context,reduced:false});
          layers.forEach(layer=>{const show=active?.key===layer.key;layer.node.hidden=!show;layer.node.style.display=show?'block':'none';layer.node.setAttribute('aria-hidden',String(!show));layer.node.inert=!show;});
          const current=reveal.find(item=>item.layer.key===active?.key);
          if(current){
            current.items.forEach(node=>{const start=Number(node.dataset.flowReveal)||0;const t=context.static?1:smooth(start,start+.22,q);node.style.opacity=String(.12+.88*t);node.style.transform=`translateY(${(1-t)*8}px)`;});
            current.traces.forEach(node=>node.style.strokeDashoffset=String(context.static?0:1-smooth(.05,.64,q)));
          }
        }};
      }
    };
  }

  wrap(1,[{key:'facts',index:1,markup:factsPanel}],[0,.5],[[0,1],null]);
  wrap(3,[{key:'funnel',index:4,markup:selectionFunnel},{key:'matrix-difference',index:6,markup:matrixDifference}],
    [0,.12,.25,.36,.47,.60,.73,.86],[[0,.145],[.15,.30],[.335,.465],[.495,.625],null,[.66,.825],null,[.855,1]]);

  window.PitchPlanningMethod={markup(variant){
    const data=window.PitchEvidence.variants[variant].data;
    const fields=[['Was?','Das Vorhaben',data.w4.was[0]],['Wer?','Die Verantwortung',data.w4.wer[1].replace(/\[Name\]/g,'(zu besetzen)')],['Wann?','Termine und Freigabepunkte',data.w4.wann[1]],['Wie?','Das Vorgehen',data.w4.wie[0]]];
    return `<div class="fm-planning-intro"><p class="eyebrow">DIE 4W-METHODE / VARIANTE ${esc(variant)}</p><h3 id="planning-method-title">Aus einer Idee wird<br>ein <em>Projektauftrag.</em></h3><p>Vier Fragen verknüpfen Leistungsumfang, Verantwortung, Termine und Vorgehen. Daraus entstehen die parallelen Teilprojekte der Roadmap.</p></div><div class="fm-planning-fields">${fields.map((field,index)=>`<section data-planning-reveal="${index}"><span class="fm-planning-question">${field[0]}</span><h4>${field[1]}</h4><p>${esc(field[2])}</p></section>`).join('')}</div><div class="film-present-controls fm-planning-controls"><button type="button" data-film-chapter="6" data-film-planning="previous">Zurück zur Roadmap</button><button type="button" data-film-chapter="6" data-film-planning="next">Weiter zum Management <span aria-hidden="true">→</span></button></div><p class="fm-planning-note">Auszug aus der Teil-6-Planung. Rollen, Partner, Termine und Freigaben beschreiben den vorgeschlagenen Projektauftrag.</p>`;
  }};
})();
