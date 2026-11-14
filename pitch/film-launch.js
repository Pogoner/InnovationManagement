/* Photographic launch layers. The pitch's existing scroll/manual clock owns time. */
(() => {
  'use strict';
  const clamp = n => Math.min(1, Math.max(0, Number(n) || 0));
  const smooth = (a,b,n) => { const p=clamp((n-a)/(b-a)); return p*p*(3-2*p); };
  const pulse = (a,b,c,n) => smooth(a,b,n)*(1-smooth(b,c,n));
  const fixed = n => Number(n).toFixed(4);
  const masterAspect = 1672/941;
  const assets = {
    pad: 'assets/launch-pad.webp',
    vehicle: 'assets/launch-vehicle.webp',
    smoke: 'assets/launch-smoke.webp',
    climax: 'assets/launch-climax.webp'
  };

  function markup(paths) {
    const photo = (name,src,extra='') => '<img class="'+name+'" src="'+src+'" alt="" decoding="async" loading="lazy" '+extra+'>';
    return '<div class="launch-cinema" aria-hidden="true">'+
      '<svg class="launch-optics" width="0" height="0"><defs><filter id="launch-heat-refraction" x="-10%" y="-5%" width="120%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".012 .09" numOctaves="2" seed="12" result="heat"/><feDisplacementMap in="SourceGraphic" in2="heat" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>'+
      '<div class="launch-cinema-world">'+
        photo('launch-pad-image',paths.pad,'width="1672" height="941"')+
        '<div class="launch-pad-light"></div>'+
        '<div class="launch-heat-column">'+photo('launch-heat-image',paths.pad,'width="1672" height="941"')+'</div>'+
        '<div class="launch-cloud launch-cloud-far"><div class="launch-cloud-drift">'+photo('launch-cloud-image',paths.smoke,'width="1774" height="887"')+'</div></div>'+
        '<div class="launch-cinema-vehicle">'+
          photo('launch-vehicle-body',paths.vehicle,'width="724" height="2172"')+
          '<div class="launch-vehicle-exhaust"><div class="launch-exhaust-flicker">'+photo('launch-vehicle-plume',paths.vehicle,'width="724" height="2172"')+'</div></div>'+
          '<div class="launch-engine-bloom"></div>'+
        '</div>'+
        '<div class="launch-cloud launch-cloud-middle"><div class="launch-cloud-drift">'+photo('launch-cloud-image',paths.smoke,'width="1774" height="887"')+'</div></div>'+
        '<div class="launch-cloud launch-cloud-near"><div class="launch-cloud-drift">'+photo('launch-cloud-image',paths.smoke,'width="1774" height="887"')+'</div></div>'+
        '<div class="launch-climax-shot">'+photo('launch-climax-image',paths.climax,'width="1672" height="941"')+'<div class="launch-climax-atmosphere"></div></div>'+
      '</div>'+
      '<div class="launch-lens-bloom"></div><div class="launch-light-sweep"></div><div class="launch-cinema-grade"></div><div class="launch-cinema-grain"></div>'+
      '</div><div class="launch-cinema-cue" aria-hidden="true"><span>ROCKETLIGHT / DER MOMENT</span><strong data-launch-phase>Bereit zum Start.</strong><i><b></b></i></div>';
  }

  window.PitchLaunch = {
    mount: function (root, options = {}) {
      const stage = root?.matches?.('.launch-stage') ? root : root?.querySelector?.('.launch-stage');
      if (!stage) return {update:function(){},destroy:function(){}};
      if (stage.querySelector('.launch-cinema')) return stage._launchCinemaController;
      const paths = {...assets,...options.assets};
      stage.insertAdjacentHTML('afterbegin',markup(paths));
      stage.classList.add('has-photoreal-launch');
      const cinema = stage.querySelector('.launch-cinema');
      const cue = stage.querySelector('[data-launch-phase]');
      // Coordinates measured on the supplied 1672×941 pad and 724×2172 sprite.
      // Both clipped copies share the same engine seam; idle has no visible fire.
      const anchorX = options.anchorX ?? 1230/1672;
      const anchorY = options.anchorY ?? 520/941;
      const bodyEnd = options.bodyEnd ?? 910/2172;
      const spriteHeight = options.spriteHeight ?? 1.18;
      stage.style.setProperty('--launch-world-aspect',String(masterAspect));
      stage.style.setProperty('--launch-anchor-x',anchorX*100+'%');
      stage.style.setProperty('--launch-anchor-y',anchorY*100+'%');
      stage.style.setProperty('--launch-body-end',bodyEnd*100+'%');
      stage.style.setProperty('--launch-body-inset',(1-bodyEnd)*100+'%');
      stage.style.setProperty('--launch-vehicle-height',spriteHeight*100+'%');
      stage.style.setProperty('--launch-vehicle-top',(anchorY-bodyEnd*spriteHeight)*100+'%');
      stage.style.setProperty('--launch-vehicle-aspect',String(options.spriteAspect ?? 1/3));

      let lastProgress=-1,lastReduced=null,lastWidth=0,lastHeight=0,lastPhase='';
      let visible=false;
      const visibility = () => stage.classList.toggle('is-launch-paused',document.hidden || !visible);
      let observer;
      if ('IntersectionObserver' in window) {
        observer=new IntersectionObserver(entries=>{
          visible=entries.some(entry=>entry.isIntersecting);
          stage.classList.toggle('is-launch-visible',visible);
          visibility();
        },{rootMargin:'120px 0px',threshold:0});
        observer.observe(stage);
      } else {
        visible=true;stage.classList.add('is-launch-visible');
      }
      document.addEventListener('visibilitychange',visibility);
      visibility();

      const controller = {
        update: function (value, context = {}) {
          const reduced=Boolean(context.reduced);
          const p=clamp(value);
          const width=context.width || innerWidth;
          const height=context.viewport || innerHeight;
          const resized=width!==lastWidth || height!==lastHeight || reduced!==lastReduced;
          if (resized) {
            stage.dataset.launchReduced=String(reduced);
            const w=cinema.clientWidth || stage.clientWidth || width;
            const h=cinema.clientHeight || stage.clientHeight || height;
            const worldWidth=Math.max(w,h*masterAspect);
            // Narrow windows keep the rocket, its exhaust and pad in frame.
            const pan=w/h<1.25 ? (.5-anchorX)*worldWidth : 0;
            stage.style.setProperty('--launch-frame-width',w+'px');
            stage.style.setProperty('--launch-frame-height',h+'px');
            stage.style.setProperty('--launch-frame-pan',pan.toFixed(2)+'px');
            lastWidth=width;lastHeight=height;
          }
          if (!resized && Math.abs(p-lastProgress)<.00005 && reduced===lastReduced) return;
          lastProgress=p;lastReduced=reduced;
          const ignition=smooth(.065,.22,p);
          const ascent=smooth(.23,.79,p);
          const smoke=smooth(.105,.68,p);
          const cut=smooth(.76,.89,p);
          const values={
            '--launch-film-progress':p,
            '--launch-photo-ignition':reduced?0:ignition,
            '--launch-exhaust-reveal':reduced?0:smooth(.075,.20,p),
            '--launch-exhaust-length':.42+ignition*.58,
            '--launch-photo-smoke':reduced?0:smoke,
            '--launch-photo-smoke-scale':.48+smoke*1.7,
            '--launch-photo-smoke-near':reduced?0:smooth(.21,.67,p)*.88,
            '--launch-vehicle-opacity':reduced?0:1-smooth(.76,.86,p),
            // Engine and nose converge on the late wide shot's photographed
            // coordinates, avoiding a disappearing rocket before the angle cut.
            '--launch-vehicle-rise':(-11*ascent).toFixed(3)+'%',
            '--launch-vehicle-scale':1-ascent*.185,
            '--launch-photo-camera-scale':reduced?1:1.015+smooth(.02,.72,p)*.015,
            '--launch-photo-camera-y':reduced?'0%':(1.2*smooth(.20,.78,p)).toFixed(3)+'%',
            '--launch-climax-opacity':reduced?1:cut,
            '--launch-climax-scale':reduced?1:1+.025*smooth(.76,1,p),
            '--launch-climax-y':'0%',
            '--launch-cut-light':reduced?0:pulse(.735,.79,.89,p)*.21,
            '--launch-lens-intensity':reduced?.13:ignition*(1-cut*.65)*.40,
            '--launch-copy-opacity':reduced?1:1-pulse(.25,.57,.88,p)*.18,
            '--launch-copy-shift':reduced?'0px':(-8*pulse(.25,.57,.88,p)).toFixed(2)+'px',
            '--launch-cloud-drift':(smoke*11).toFixed(3)+'%',
            '--launch-heat-opacity':reduced?0:ignition*(1-cut)*.38,
            '--launch-heat-top':((anchorY-.11*spriteHeight*ascent)*100).toFixed(3)+'%'
          };
          Object.entries(values).forEach(([key,v])=>stage.style.setProperty(key,typeof v==='number'?fixed(v):v));
          const phase=reduced?'Ein gemeinsamer Aufbruch.':p<.065?'Bereit zum Start.':p<.23?'Zündung.':p<.76?'Liftoff.':'Ein neuer Horizont.';
          if(phase!==lastPhase){cue.textContent=phase;lastPhase=phase;}
          stage.dataset.launchPhase=reduced?'still':p<.065?'ready':p<.23?'ignition':p<.76?'ascent':'climax';
        },
        destroy: function () {
          observer?.disconnect();
          document.removeEventListener('visibilitychange',visibility);
        }
      };
      stage._launchCinemaController=controller;
      controller.update(0,{reduced:document.body.classList.contains('is-reduced')});
      return controller;
    }
  };
})();
