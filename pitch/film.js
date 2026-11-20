/* One shared landscape, eight native-scroll reels. The existing pitch owns RAF. */
(() => {
  'use strict';
  const story = window.PitchFilmStory;
  const scenes = window.PitchScenes;
  if (!story || !scenes || story.some(s => !scenes[s.step])) return;
  // Read the existing shared selection before adding a second set of controls.
  let variant = 'A';
  story.find(chapter=>chapter.step===6).beats=window.PitchRoadmapPhases[variant];
  const clamp = n => Math.min(1,Math.max(0,n));
  const smooth = (a,b,n) => { const p=clamp((n-a)/(b-a)); return p*p*(3-2*p); };
  const fmt = n => n.toFixed(4);
  const arrow = '<svg class="arrow-icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12 12 4M4 4h8v8"/></svg>';
  const stillPoints = Object.fromEntries(story.map(chapter=>[chapter.step,chapter.beats.map(beat=>beat.still??beat.point??1)]));
  const methodSteps = new Set([1,2,3,4,5,7,8]);
  const sourceBase = 'https://github.com/Pogoner/InnovationManagement/raw/main/quellen/';
  const sourceLinks = chapter => {
    const list = chapter.sources || [];
    if(!list.length) return '';
    return '<div class="film-evidence-links">'+list.map(item=>'<a class="film-evidence-link" href="'+sourceBase+item.file+'" target="_blank" rel="noopener" download>Zahlen &amp; Hintergründe'+(item.label&&list.length>1?' · '+item.label:'')+' '+arrow+'</a>').join('')+'</div>';
  };
  const duration = seconds=>Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
  const world = document.createElement('div');
  world.className = 'film-background';
  world.setAttribute('aria-hidden','true');
  world.innerHTML = '<div class="film-camera"><img class="film-landscape-image" src="assets/launch-coast-near.webp" width="1672" height="941" alt=""><div class="film-water-light"></div><div class="film-world-architecture">' +
    window.PitchArchitecture.markup() + '</div></div>' + window.PitchArchitecture.aerialMarkup() + '<div class="film-dining-world"><img src="assets/dining-facing-launch.webp" width="1672" height="941" alt=""><div></div></div><div class="film-world-grade"></div><div class="film-world-grain"></div>';
  document.body.prepend(world);
  const camera = world.querySelector('.film-camera');
  const architecture = world.querySelector('.film-world-architecture');
  const worldDrawing = window.PitchArchitecture.mount(architecture);
  const siteFlight = window.PitchArchitecture.mountAerial(world.querySelector('.site-flight'));
  const hero = document.querySelector('.pitch-hero');
  const prologue = document.createElement('div');
  prologue.className = 'film-prologue';
  hero.before(prologue); prologue.append(hero);
  const introCue = document.createElement('div');
  introCue.className = 'film-intro-cue';
  introCue.innerHTML = '<span></span><p>SCROLLEN. DIE IDEE ENTSTEHT.</p>';
  hero.append(introCue);
  const records = story.map(chapter => {
    const section = document.getElementById('schritt-'+chapter.step);
    section.replaceChildren();
    const reel = document.createElement('div');
    reel.className = 'film-reel';
    reel.style.setProperty('--reel-length',chapter.length);
    reel.innerHTML = '<div class="film-stage" data-film-step="'+chapter.step+'"><div class="film-chapter-meta"><span>PART '+String(chapter.step).padStart(2,'0')+' / '+chapter.label+'</span></div><div class="film-copy"><p class="eyebrow film-beat-tag"></p><h2 id="film-title-'+chapter.step+'"></h2><p class="film-beat-copy"></p>'+sourceLinks(chapter)+'</div><div class="film-visual"></div><div class="film-stage-bottom"><div class="film-local-progress" aria-hidden="true"><i></i></div><p class="film-scene-cue"></p><nav class="film-beat-nav" aria-label="Phasen: '+chapter.label+'"></nav></div><span class="film-chapter-watermark" aria-hidden="true">'+String(chapter.step).padStart(2,'0')+'</span></div>';
    section.classList.remove('page-width');
    section.classList.add('film-chapter');
    section.setAttribute('aria-labelledby','film-title-'+chapter.step);
    section.append(reel);
    const stage = reel.querySelector('.film-stage');
    const visual = stage.querySelector('.film-visual');
    visual.innerHTML = scenes[chapter.step].markup();
    const nav = stage.querySelector('.film-beat-nav');
    chapter.beats.forEach((beat,index)=>{
      const button=document.createElement('button');
      button.type='button';
      button.setAttribute('aria-label',beat.cue);
      button.dataset.filmChapter=chapter.step;
      button.dataset.filmPoint=stillPoints[chapter.step][index];
      button.dataset.filmStill=stillPoints[chapter.step][index];
      button.dataset.filmIndex=index;
      button.innerHTML='<span></span>';
      nav.append(button);
    });
    const transport=document.createElement('div');
    transport.className='film-present-controls';
    transport.innerHTML='<button type="button" data-film-chapter="'+chapter.step+'" data-film-direction="-1" aria-label="Vorheriges Bild">Zurück</button><span class="film-phase-count" aria-label="Aktuelle Phase"></span><button type="button" data-film-chapter="'+chapter.step+'" data-film-direction="1" aria-label="Nächstes Bild">Weiter <span aria-hidden="true">→</span></button>';
    nav.after(transport);
    const status=document.createElement('span');
    status.className='film-phase-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
    transport.append(status);
    const planning=null;
    return {chapter,section,reel,stage,visual,planning,renderer:scenes[chapter.step].mount(visual),
      tag:stage.querySelector('.film-beat-tag'),title:stage.querySelector('h2'),copy:stage.querySelector('.film-beat-copy'),
      copyBox:stage.querySelector('.film-copy'),cue:stage.querySelector('.film-scene-cue'),buttons:Array.from(nav.children),
      count:transport.querySelector('.film-phase-count'),forward:transport.querySelector('[data-film-direction="1"]'),status,attention:[],attentionBeat:-1,
      beat:-1,lastP:-1,staticPoint:null,top:0,height:0,range:1};
  });
  const launch = document.querySelector('#start');
  const launchStage = launch.querySelector('.launch-stage');
  const launchCinema = window.PitchLaunch.mount(launchStage);
  document.body.classList.add('film-ready');

  let reduced = document.body.classList.contains('is-reduced');
  let width=innerWidth, height=innerHeight, heroTop=0, heroRange=1, heroBottom=0, launchTop=0, launchBottom=0;
  let cameraTop=0, cameraHeight=1, headerClearance=100;
  let dirty=true;
  const photo = world.querySelector('.film-landscape-image');

  function paintCopy(record,p) {
    let index=0;
    record.chapter.beats.forEach((beat,i)=>{if(p>=beat.at)index=i;});
    if(index!==record.beat) {
      record.attention.forEach(animation=>animation.cancel());
      record.attention=[];record.attentionBeat=-1;
      record.beat=index;
      const beat=record.chapter.beats[index];
      record.tag.textContent=beat.tag;
      record.title.innerHTML=beat.title;
      record.copy.textContent=beat.copy;
      record.cue.textContent=beat.cue;
      record.count.textContent=String(index+1).padStart(2,'0')+' / '+String(record.chapter.beats.length).padStart(2,'0');
      if(!record.useStatic&&scrollY+innerHeight>record.top&&scrollY<record.top+record.height)record.status.textContent='Phase '+(index+1)+' von '+record.chapter.beats.length+': '+beat.cue;
      record.buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));});
    }
    const beat=record.chapter.beats[index];
    const next=record.chapter.beats[index+1];
    const unsettled=p<stillPoints[record.chapter.step][index]-.008;
    if(record.unsettled!==unsettled){
      record.unsettled=unsettled;
      record.forward.innerHTML=unsettled?'Aufbauen <span aria-hidden="true">→</span>':'Weiter <span aria-hidden="true">→</span>';
      record.forward.setAttribute('aria-label',unsettled?'Aktuelles Bild vollständig aufbauen':'Nächstes Bild');
    }
    const phaseWidth=(next?.at??1)-beat.at;
    const enterRange=Math.min(.025,phaseWidth*.13);
    const leaveRange=Math.min(.018,phaseWidth*.09);
    const enter=index===0||reduced?1:smooth(beat.at,beat.at+enterRange,p);
    const leave=next&&!reduced?1-smooth(next.at-leaveRange,next.at,p):1;
    record.copyBox.style.setProperty('--copy-opacity',fmt(enter*leave));
    record.copyBox.style.setProperty('--copy-shift',((1-enter)*24-(1-leave)*18).toFixed(2)+'px');
  }

  function guideAttention(record,p,visible) {
    if(reduced||record.methodLinear||!visible||document.hidden||record.attentionBeat===record.beat)return;
    const beat=record.chapter.beats[record.beat],next=record.chapter.beats[record.beat+1];
    if(!beat.tone||!beat.view||p<beat.at+((next?.at??1)-beat.at)*.80)return;
    const color=beat.tone==='difference'?'#f19c94':beat.tone==='selection'?'#efbd91':'#a9d9d9';
    const roots=Array.from(record.visual.querySelectorAll(beat.view));
    const markers=roots.flatMap(root=>[...(root.matches('.method-attention')?[root]:[]),...root.querySelectorAll('.method-attention')]);
    record.attentionBeat=record.beat;
    record.attention=markers.map(node=>{
      const frame=node.matches('rect')&&beat.tone==='difference';
      const style=frame?getComputedStyle(node):null;
      const rest={filter:'drop-shadow(0 0 0 transparent)',...(frame?{stroke:style.stroke,fill:style.fill}:{})};
      return node.animate([rest,
        {filter:'drop-shadow(0 0 10px '+color+') brightness(1.3)',...(frame?{stroke:color,fill:'#f19c9428'}:{}),offset:.24},
        rest
      ],{duration:1050,easing:'ease-out'});
    });
  }

  function measure() {
    width=innerWidth; height=innerHeight;
    const areaWidth=world.getBoundingClientRect().width;
    // Portrait uses a lower, wider stage so the complete building stays in frame.
    const portrait=width<=760;
    headerClearance=(document.querySelector('.pitch-header')?.getBoundingClientRect().height||80)+18;
    const sceneHeight=Math.max(height*.70,height-headerClearance-54);
    const masterWidth=portrait?Math.max(areaWidth,height*.45*(1672/941)):Math.max(areaWidth,sceneHeight*(1672/941));
    const masterHeight=masterWidth*941/1672;
    camera.style.width=masterWidth.toFixed(2)+'px';
    camera.style.height=masterHeight.toFixed(2)+'px';
    camera.style.left=(portrait?areaWidth/2-masterWidth*.56:(areaWidth-masterWidth)/2).toFixed(2)+'px';
    cameraTop=portrait?height-masterHeight-66:(height-masterHeight)/2;
    cameraHeight=masterHeight;
    camera.style.top=cameraTop.toFixed(2)+'px';
    const y=scrollY;
    records.forEach(record=>{
      record.methodLinear=methodSteps.has(record.chapter.step)&&(width<=760||height<680||(width<=1100&&height<760));
      record.useStatic=methodSteps.has(record.chapter.step)&&(reduced||record.methodLinear);
      record.section.classList.toggle('is-method-linear',record.methodLinear);
      if (record.useStatic && !record.staticScene && window.PitchStatic) {
        record.staticScene=window.PitchStatic.create(record.chapter,scenes[record.chapter.step],stillPoints[record.chapter.step],{variant,mobile:width<=760});
        record.reel.append(record.staticScene.element);
      }
      if(record.staticScene)record.staticScene.updateContext({variant,mobile:width<=760});
      record.section.setAttribute('aria-labelledby',record.useStatic&&record.staticScene?record.staticScene.headingId:'film-title-'+record.chapter.step);
      record.top=record.reel.getBoundingClientRect().top+y;
      record.height=record.reel.offsetHeight;
      record.range=Math.max(1,record.height-record.stage.offsetHeight);
      record.linear=width<=760 && record.chapter.step===6;
      if(record.planning){record.planningTop=record.planning.getBoundingClientRect().top+y;record.planningCards=Array.from(record.planning.querySelectorAll('[data-planning-reveal]'));}
      record.lastP=-1;
    });
    heroTop=prologue.getBoundingClientRect().top+y;
    heroRange=Math.max(1,prologue.offsetHeight-hero.offsetHeight);
    heroBottom=heroTop+prologue.offsetHeight;
    launchTop=launch.getBoundingClientRect().top+y;
    launchBottom=launchTop+launch.offsetHeight;
    dirty=false;
  }

  function update(frame) {
    if(dirty)measure();
    reduced=frame.reduced; variant=frame.variant;
    const y=frame.y;
    const context={reduced,variant,mobile:width<=760};
    const intro=reduced?0:clamp((y-heroTop)/heroRange);
    hero.style.setProperty('--intro-progress',fmt(intro));
    hero.style.setProperty('--hero-zoom',(1.02+intro*.12).toFixed(4));
    hero.style.setProperty('--hero-pan',(intro*height*.012).toFixed(2)+'px');
    hero.style.setProperty('--hero-copy-opacity',fmt(1-smooth(.58,1,intro)));
    let current=records[0];
    records.forEach(record=>{
      const p=(reduced||record.linear||record.methodLinear)?(record.staticPoint??1):clamp((y-record.top)/record.range);
      record.progress=p;
      const visible=y+height>=record.top&&y<=record.top+record.height;
      if(visible||record.lastP<0||reduced) {
        if(Math.abs(p-record.lastP)>.00005||dirty||record.variant!==variant||record.reduced!==reduced) {
          record.renderer.update(p,{...context,reduced:reduced&&record.staticPoint===null,visible});
          paintCopy(record,p);
          record.stage.style.setProperty('--film-progress',fmt(p));
          record.stage.dataset.progress=p.toFixed(3);
          record.lastP=p; record.variant=variant;record.reduced=reduced;
        }
        guideAttention(record,p,visible&&y>record.top-height*.15);
      }
      if(record.planningCards)record.planningCards.forEach((card,index)=>{
        const reveal=reduced?1:smooth(index*.11,index*.11+.40,(y+height*.87-record.planningTop)/(height*.65));
        card.style.opacity=fmt(.22+.78*reveal);card.style.transform='translateY('+((1-reveal)*18).toFixed(2)+'px)';
      });
      if(y+Math.min(height*.35,270)>=record.top) current=record;
    });
    const step=current.chapter.step;
    const p=current.progress;
    const dining=records.find(record=>record.chapter.step===5);
    const site=records[5];
    const siteMix=smooth(site.top-height*.58,site.top+height*.08,y)*(1-smooth(site.top+site.height-height*.65,site.top+site.height+height*.1,y));
    const experienceMix=smooth(dining.top-height*.5,dining.top+height*.08,y)*(1-smooth(dining.top+dining.height-height*.65,dining.top+dining.height+height*.1,y));
    // The architectural reveal ends inside the same room introduced in Part 5.
    const interiorReveal=siteMix*smooth(.90,.98,site.progress);
    const diningMix=Math.max(experienceMix,interiorReveal);
    const diningFocus=smooth(.16,.19,dining.progress)*(1-smooth(.29,.32,dining.progress));
    world.style.setProperty('--dining-opacity',fmt(diningMix));
    world.style.setProperty('--dining-image-opacity',fmt(.34+Math.max(diningFocus*experienceMix,interiorReveal*.35)*.55));
    const worldIn=smooth(records[0].top-height*.7,records[0].top-height*.08,y);
    const worldOut=1-smooth(launchTop-height*.4,launchTop+height*.3,y);
    world.style.opacity=fmt(worldIn*worldOut);
    world.dataset.scene=String(step);
    architecture.style.opacity=fmt(siteMix);
    if(siteMix>0)worldDrawing.update(site.progress,context);
    siteFlight.update(site.progress,{...context,visible:siteMix});
    const baseScale=1.02+Math.sin((step+p)*.7)*.012;
    const cameraScale=reduced?1.02:baseScale*(1-siteMix)+(1.01+site.progress*.035)*siteMix;
    let panY=reduced?0:Math.sin((step+p)*.8)*height*.008*(1-siteMix)-site.progress*height*.005*siteMix;
    // Ground, drawings and building move together; the nearer rocket's nose
    // remains below the fixed header at its measured y=20/941 image anchor.
    const rocketTipY=cameraTop+cameraHeight*(.72+(20/941-.72)*cameraScale)+panY;
    panY+=Math.max(0,headerClearance-rocketTipY);
    const panX=reduced?0:Math.cos((step+p)*.6)*width*.012;
    camera.style.transform='translate3d('+panX.toFixed(2)+'px,'+panY.toFixed(2)+'px,0) scale('+cameraScale.toFixed(4)+')';
    const baseStrength=.32;
    world.style.setProperty('--landscape-strength',fmt(baseStrength+(1-baseStrength)*siteMix));
    world.style.setProperty('--water-drift',((reduced?0:y*.015)%150).toFixed(2)+'px');
    const ignition=frame.launchProgress||0;
    return launchCinema.update(ignition,{
      reduced,viewport:height,width,
      visible:y+height>launchTop+height*.35 && y<launchBottom-height*.35,
      near:y+height*2>launchTop && y<launchBottom+height,
      immersive:y>=launchTop-height*.12 && y<launchBottom-height*.65,
      entry:smooth(launchTop-height*.8,launchTop,y)
    });
  }

  function setVariant(value) {
    variant=value;
    const roadmap=records.find(record=>record.chapter.step===6);
    roadmap.chapter.beats=window.PitchRoadmapPhases[value];
    roadmap.beat=-1;
    roadmap.buttons.forEach((button,index)=>button.setAttribute('aria-label',roadmap.chapter.beats[index].cue));
    records.forEach(r=>{r.lastP=-1;r.staticScene?.updateVariant(value);});
    document.dispatchEvent(new Event('pitch:layout'));
  }
  function captureMotionPosition(next) {
    if(reduced===next)return null;
    const y=scrollY;
    if(y>=heroTop&&y<heroBottom)return {node:prologue,offset:0};
    let record=records[0];
    records.forEach(r=>{if(y+Math.min(height*.2,130)>=r.top)record=r;});
    if(y<record.top+record.height) {
      let point=record.progress??0;
      if(record.useStatic && record.staticScene) {
        let selected=0;
        record.staticScene.phases.forEach((phase,index)=>{if(phase.getBoundingClientRect().top<=height*.45)selected=index;});
        point=stillPoints[record.chapter.step][selected];
      }
      if((reduced||record.linear) && record.chapter.step===6) {
        let selected=0;
        record.visual.querySelectorAll('.film-phase-sequence [data-roadmap-phase]').forEach((phase,index)=>{if(phase.getBoundingClientRect().top<=height*.45)selected=index;});
        point=stillPoints[6][selected];
      }
      return {record,point};
    }
    let node=record.section;
    if(y>=launchTop)node=launch;
    return {node,offset:y-(node.getBoundingClientRect().top+y)};
  }
  function setReduced(value,anchor) {
    if(reduced===value)return;
    reduced=value; dirty=true;
    records.forEach(r=>{r.lastP=-1;r.attention.forEach(animation=>animation.cancel());});
    if(anchor) {
      // Resolve the roadmap's linear/film layout before measuring its new height.
      const roadmap=records.find(record=>record.chapter.step===6);
      roadmap.renderer.update(anchor.record===roadmap?anchor.point:roadmap.progress??1,{reduced:value,variant,mobile:width<=760});
      measure();
      let top=anchor.record?anchor.record.top+(value?0:anchor.point*anchor.record.range):anchor.node.getBoundingClientRect().top+scrollY+anchor.offset;
      if(anchor.record?.useStatic&&anchor.record.staticScene) {
        let index=0;anchor.record.chapter.beats.forEach((beat,i)=>{if(anchor.point>=beat.at)index=i;});
        top=anchor.record.staticScene.phases[index].getBoundingClientRect().top+scrollY-headerClearance;
      }
      if(anchor.record===roadmap && (value||roadmap.linear)) {
        let index=0;
        roadmap.chapter.beats.forEach((phase,i)=>{if(anchor.point>=phase.at)index=i;});
        const card=roadmap.visual.querySelector('.film-phase-sequence [data-roadmap-phase="'+index+'"]');
        if(card)top=card.getBoundingClientRect().top+scrollY-110;
      }
      scrollTo({top,behavior:'instant'});
    }
  }
  document.addEventListener('click',event=>{
    const control=event.target.closest('[data-film-chapter]');
    if(!control)return;
    if(dirty)measure();
    const r=records.find(item=>item.chapter.step===Number(control.dataset.filmChapter));
    if(!r)return;
    const fromPlanning=control.dataset.filmPlanning;
    const direction=Number(control.dataset.filmDirection);
    let target=r,index=fromPlanning?(fromPlanning==='next'?r.chapter.beats.length:r.chapter.beats.length-1):(control.dataset.filmDirection?r.beat+(direction>0&&r.unsettled?0:direction):Number(control.dataset.filmIndex));
    if(!fromPlanning&&((r.chapter.step===6&&index>=r.chapter.beats.length)||(r.chapter.step===7&&index<0))) {
      const planning=records.find(record=>record.chapter.step===6).planning;
      if(planning){
        const direction=r.chapter.step===6?'next':'previous';
        planning.querySelector('[data-film-planning="'+direction+'"]').focus({preventScroll:true});
        scrollTo({top:planning.getBoundingClientRect().top+scrollY-headerClearance,behavior:reduced?'instant':'smooth'});return;
      }
    }
    if(index<0){target=records[records.indexOf(r)-1];index=target?.chapter.beats.length-1;}
    if(index>=r.chapter.beats.length&&target===r){target=records[records.indexOf(r)+1];index=0;}
    if(!target){
      const destination=direction<0?document.getElementById('einstieg'):launch;
      destination.querySelector(direction<0?'.intro-scroll':'#launch-begin')?.focus({preventScroll:true});
      destination.scrollIntoView({behavior:reduced?'instant':'smooth'});return;
    }
    const point=stillPoints[target.chapter.step][index];
    if(target!==r||fromPlanning){
      const heading=target.useStatic?target.staticScene?.phases[index].querySelector('h3'):null;
      if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
      else target.stage.querySelector('[data-film-direction="'+(Number(control.dataset.filmDirection)<0||fromPlanning==='previous'?-1:1)+'"]').focus({preventScroll:true});
    }
    if(target.useStatic&&target.staticScene){
      scrollTo({top:target.staticScene.phases[index].getBoundingClientRect().top+scrollY-headerClearance,behavior:reduced?'instant':'smooth'});return;
    }
    if(target.linear&&target.chapter.step===6){
      const card=target.visual.querySelector('.film-phase-sequence [data-roadmap-phase="'+index+'"]');
      if(card){scrollTo({top:card.getBoundingClientRect().top+scrollY-headerClearance,behavior:'smooth'});return;}
    }
    if(target!==r){scrollTo({top:target.top+point*target.range,behavior:reduced?'instant':'smooth'});return;}
    if(reduced||r.linear) {
      // A deliberate phase choice remains available without moving imagery.
      const p=point;
      r.staticPoint=p;
      r.renderer.update(p,{reduced:false,variant,mobile:width<=760});
      paintCopy(r,p);
      if(r.chapter.step===6)worldDrawing.update(p,{reduced:false,variant,mobile:width<=760});
      r.stage.style.setProperty('--film-progress',fmt(p));
      r.stage.dataset.progress=p.toFixed(3);
      r.lastP=p;
      r.stage.scrollIntoView({block:'start',behavior:'instant'});
    } else scrollTo({top:r.top+point*r.range,behavior:'smooth'});
  });
  // Live presentation: ← / → step through every animation stop of the page.
  function stops() {
    if(dirty)measure();
    const list=[0,heroTop+heroRange];
    records.forEach(record=>{
      if(record.planning)list.push(record.planningTop-headerClearance);
      stillPoints[record.chapter.step].forEach((point,index)=>{
        const phase=record.useStatic?record.staticScene?.phases[index]:null;
        if(phase)list.push(phase.getBoundingClientRect().top+scrollY-headerClearance);
        else if(!record.methodLinear&&!record.linear)list.push(record.top+point*record.range+1);
      });
    });
    const launchRange=Math.max(1,launch.offsetHeight-height);
    list.push(launchTop,launchTop+launchRange);
    return list.map(Math.round).sort((a,b)=>a-b).filter((v,i,a)=>i===0||v-a[i-1]>12);
  }
  // Own eased scroll so each step takes roughly twice as long as the browser default.
  let keyTarget=null,scrollFrame=0;
  function glideTo(target) {
    cancelAnimationFrame(scrollFrame);
    keyTarget=target;
    const from=scrollY,distance=target-from;
    if(reduced||Math.abs(distance)<2){scrollTo({top:target,behavior:'instant'});keyTarget=null;return;}
    const zone=y=>records.findIndex(r=>y>=r.top-2&&y<r.top+r.height-2);
    const crossing=zone(from)!==zone(target);
    const span=crossing?Math.min(2400,Math.max(1100,Math.abs(distance)*.6)):Math.min(6400,Math.max(2800,Math.abs(distance)*3));
    const start=performance.now();
    const step=now=>{
      const t=Math.min(1,(now-start)/span);
      const e=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      scrollTo({top:from+distance*e,behavior:'instant'});
      if(t<1)scrollFrame=requestAnimationFrame(step);else keyTarget=null;
    };
    scrollFrame=requestAnimationFrame(step);
  }
  const stopGlide=()=>{cancelAnimationFrame(scrollFrame);keyTarget=null;};
  addEventListener('wheel',stopGlide,{passive:true});
  addEventListener('touchstart',stopGlide,{passive:true});
  document.addEventListener('keydown',event=>{
    if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;
    if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.defaultPrevented)return;
    const el=event.target;
    if(el.closest?.('input,select,textarea,[contenteditable="true"],[role="slider"],details[open]'))return;
    const forward=event.key==='ArrowRight';
    const list=stops();
    const launchRange=Math.max(1,launch.offsetHeight-height);
    const base=keyTarget!==null?keyTarget:scrollY;
    // At the launch stage, → plays the film before moving on to the finale.
    if(forward&&keyTarget===null&&scrollY>=launchTop-12&&scrollY<launchTop+launchRange-12){
      const mode=launchStage.dataset.launchMode;
      const trigger=mode==='complete'?null:mode==='playing'?'wait':launchStage.querySelector('#launch-begin:not(:disabled)')||launchStage.querySelector('#launch-button:not(:disabled)');
      if(trigger){
        event.preventDefault();
        if(trigger!=='wait'){
          if(Math.abs(scrollY-launchTop)>12)scrollTo({top:launchTop,behavior:'instant'});
          trigger.click();
        }
        return;
      }
    }
    const next=forward?list.find(v=>v>base+8):[...list].reverse().find(v=>v<base-8);
    if(next===undefined)return;
    event.preventDefault();
    glideTo(next);
  });
  photo.addEventListener('load',()=>document.dispatchEvent(new Event('pitch:layout')));
  window.PitchFilm={measure,update,setVariant,setReduced,captureMotionPosition};
  records.forEach(record=>{
    record.renderer.update(reduced?1:0,{reduced,variant,mobile:width<=760});
    paintCopy(record,reduced?1:0);
  });
  // Preserve the initial shared variant in the additional cinematic controls.
  document.querySelectorAll('[data-variant]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.variant===variant)));
  measure();
  document.dispatchEvent(new Event('pitch:layout'));
})();
