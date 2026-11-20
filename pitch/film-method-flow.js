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
})();
