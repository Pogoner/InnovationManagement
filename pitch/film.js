/* One shared landscape, eight native-scroll reels. The existing pitch owns RAF. */
(() => {
  'use strict';
  const story = window.PitchFilmStory;
  const scenes = window.PitchScenes;
  if (!story || !scenes || story.some(s => !scenes[s.step])) return;
  // Read the existing shared selection before adding a second set of controls.
  let variant = document.querySelector('[data-variant][aria-pressed="true"]')?.dataset.variant || 'A';
  story.find(chapter=>chapter.step===6).beats=window.PitchRoadmapPhases[variant];
  const clamp = n => Math.min(1,Math.max(0,n));
  const smooth = (a,b,n) => { const p=clamp((n-a)/(b-a)); return p*p*(3-2*p); };
  const fmt = n => n.toFixed(4);
  const arrow = '<svg class="arrow-icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12 12 4M4 4h8v8"/></svg>';
  const stillPoints = {1:[.35,.70,1],2:[.40,.81,1],3:[.10,.28,.44,.60,.80,1],4:[.27,.57,1],5:[.28,.53,.74,1],6:[.10,.22,.34,.46,.58,.70,.84,1],7:[.18,.46,.68,1],8:[.25,.60,1]};
  const world = document.createElement('div');
  world.className = 'film-background';
  world.setAttribute('aria-hidden','true');
  world.innerHTML = '<div class="film-camera"><img class="film-landscape-image" src="../teil6/launch-coast-near.webp" width="1672" height="941" alt=""><div class="film-water-light"></div><div class="film-world-architecture">' +
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
    const source = document.createElement('div');
    source.className = 'chapter-source-body page-width';
    source.id = 'belege-'+chapter.step;
    while(section.firstChild) source.append(section.firstChild);
    const disclosure = document.createElement('details');
    disclosure.className = 'chapter-dossier';
    disclosure.innerHTML = '<summary><span class="dossier-number">'+String(chapter.step).padStart(2,'0')+'</span><span><small>HINTER DER SZENE</small>'+chapter.detail+'</span><span class="dossier-toggle" aria-hidden="true">+</span></summary>';
    disclosure.append(source);
    const reel = document.createElement('div');
    reel.className = 'film-reel';
    reel.style.setProperty('--reel-length',chapter.length);
    reel.innerHTML = '<div class="film-stage" data-film-step="'+chapter.step+'"><div class="film-chapter-meta"><span>PART '+String(chapter.step).padStart(2,'0')+' / '+chapter.label+'</span><span>ROCKETLIGHT / MISSION '+String(story.length+1-chapter.step).padStart(2,'0')+'</span></div><div class="film-copy"><p class="eyebrow film-beat-tag"></p><h2 id="film-title-'+chapter.step+'"></h2><p class="film-beat-copy"></p><a class="film-evidence-link" href="#belege-'+chapter.step+'">Zahlen &amp; Hintergründe '+arrow+'</a></div><div class="film-visual"></div><div class="film-stage-bottom"><div class="film-local-progress" aria-hidden="true"><i></i></div><p class="film-scene-cue"></p><nav class="film-beat-nav" aria-label="Phasen: '+chapter.label+'"></nav></div><span class="film-chapter-watermark" aria-hidden="true">'+String(chapter.step).padStart(2,'0')+'</span></div>';
    section.classList.remove('page-width');
    section.classList.add('film-chapter');
    section.setAttribute('aria-labelledby','film-title-'+chapter.step);
    section.append(reel,disclosure);
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
      button.innerHTML='<span></span>';
      nav.append(button);
    });
    return {chapter,section,reel,stage,visual,disclosure,source,renderer:scenes[chapter.step].mount(visual),
      tag:stage.querySelector('.film-beat-tag'),title:stage.querySelector('h2'),copy:stage.querySelector('.film-beat-copy'),
      copyBox:stage.querySelector('.film-copy'),cue:stage.querySelector('.film-scene-cue'),buttons:Array.from(nav.children),
      beat:-1,lastP:-1,staticPoint:null,top:0,height:0,range:1};
  });
  const launch = document.querySelector('#start');
  const launchStage = launch.querySelector('.launch-stage');
  const launchCinema = window.PitchLaunch.mount(launchStage);
  document.body.classList.add('film-ready');

  let reduced = document.body.classList.contains('is-reduced');
  let width=innerWidth, height=innerHeight, heroTop=0, heroRange=1, heroBottom=0, launchTop=0;
  let cameraTop=0, cameraHeight=1, headerClearance=100;
  let dirty=true;
  const photo = world.querySelector('.film-landscape-image');

  function paintCopy(record,p) {
    let index=0;
    record.chapter.beats.forEach((beat,i)=>{if(p>=beat.at)index=i;});
    if(index!==record.beat) {
      record.beat=index;
      const beat=record.chapter.beats[index];
      record.tag.textContent=beat.tag;
      record.title.innerHTML=beat.title;
      record.copy.textContent=beat.copy;
      record.cue.textContent=beat.cue;
      record.buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===index));});
    }
    const beat=record.chapter.beats[index];
    const next=record.chapter.beats[index+1];
    const enterRange=record.chapter.step===6?.018:.045;
    const leaveRange=record.chapter.step===6?.012:.035;
    const enter=index===0||reduced?1:smooth(beat.at,beat.at+enterRange,p);
    const leave=next&&!reduced?1-smooth(next.at-leaveRange,next.at,p):1;
    record.copyBox.style.setProperty('--copy-opacity',fmt(enter*leave));
    record.copyBox.style.setProperty('--copy-shift',((1-enter)*24-(1-leave)*18).toFixed(2)+'px');
  }

  function measure() {
    width=innerWidth; height=innerHeight;
    const areaWidth=world.getBoundingClientRect().width;
    // Portrait uses a lower, wider stage so the complete building stays in frame.
    const portrait=width<=760;
    const masterWidth=portrait?Math.max(areaWidth,height*.45*(1672/941)):Math.max(areaWidth,height*(1672/941));
    const masterHeight=masterWidth*941/1672;
    camera.style.width=masterWidth.toFixed(2)+'px';
    camera.style.height=masterHeight.toFixed(2)+'px';
    camera.style.left=(portrait?areaWidth/2-masterWidth*.56:(areaWidth-masterWidth)/2).toFixed(2)+'px';
    cameraTop=portrait?height-masterHeight-66:(height-masterHeight)/2;
    cameraHeight=masterHeight;
    headerClearance=(document.querySelector('.pitch-header')?.getBoundingClientRect().height||80)+18;
    camera.style.top=cameraTop.toFixed(2)+'px';
    const y=scrollY;
    records.forEach(record=>{
      if (reduced && !record.staticScene && window.PitchStatic && [3,4,5].includes(record.chapter.step)) {
        record.staticScene=window.PitchStatic.create(record.chapter,scenes[record.chapter.step],stillPoints[record.chapter.step],{variant,mobile:width<=760});
        record.reel.append(record.staticScene.element);
      }
      if(record.staticScene)record.staticScene.updateContext({variant,mobile:width<=760});
      record.section.setAttribute('aria-labelledby',reduced&&record.staticScene?record.staticScene.headingId:'film-title-'+record.chapter.step);
      record.top=record.reel.getBoundingClientRect().top+y;
      record.height=record.reel.offsetHeight;
      record.range=Math.max(1,record.height-record.stage.offsetHeight);
      record.linear=width<=760 && (record.chapter.step===6 || record.chapter.step===8);
      record.lastP=-1;
    });
    heroTop=prologue.getBoundingClientRect().top+y;
    heroRange=Math.max(1,prologue.offsetHeight-hero.offsetHeight);
    heroBottom=heroTop+prologue.offsetHeight;
    launchTop=launch.getBoundingClientRect().top+y;
    dirty=false;
  }

  function update(frame) {
    if(dirty)measure();
    reduced=frame.reduced; variant=frame.variant;
    const y=frame.y;
    const context={reduced,variant,mobile:width<=760};
    const intro=reduced?0:clamp((y-heroTop)/heroRange);
    hero.style.setProperty('--intro-progress',fmt(intro));
    hero.style.setProperty('--hero-zoom',(1.04+intro*.15).toFixed(4));
    hero.style.setProperty('--hero-pan',(-intro*height*.06).toFixed(2)+'px');
    hero.style.setProperty('--hero-copy-opacity',fmt(1-smooth(.58,1,intro)));
    let current=records[0];
    records.forEach(record=>{
      const p=(reduced||record.linear)?(record.staticPoint??1):clamp((y-record.top)/record.range);
      record.progress=p;
      const visible=y+height>=record.top&&y<=record.top+record.height;
      if(visible||record.lastP<0||reduced) {
        if(Math.abs(p-record.lastP)>.00005||dirty||record.variant!==variant||record.reduced!==reduced) {
          record.renderer.update(p,{...context,reduced:reduced&&record.staticPoint===null});
          paintCopy(record,p);
          record.stage.style.setProperty('--film-progress',fmt(p));
          record.stage.dataset.progress=p.toFixed(3);
          record.lastP=p; record.variant=variant;record.reduced=reduced;
        }
      }
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
    const diningFocus=smooth(.28,.38,dining.progress)*(1-smooth(.54,.65,dining.progress));
    world.style.setProperty('--dining-opacity',fmt(diningMix));
    world.style.setProperty('--dining-image-opacity',fmt(.34+Math.max(diningFocus*experienceMix,interiorReveal*.35)*.55));
    const worldIn=smooth(heroBottom-height*.7,heroBottom-height*.08,y);
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
    panY+=Math.max(0,headerClearance-rocketTipY)*siteMix;
    const panX=reduced?0:Math.cos((step+p)*.6)*width*.012;
    camera.style.transform='translate3d('+panX.toFixed(2)+'px,'+panY.toFixed(2)+'px,0) scale('+cameraScale.toFixed(4)+')';
    const baseStrength=.32;
    world.style.setProperty('--landscape-strength',fmt(baseStrength+(1-baseStrength)*siteMix));
    world.style.setProperty('--water-drift',((reduced?0:y*.015)%150).toFixed(2)+'px');
    const ignition=frame.launchProgress||0;
    launchCinema.update(ignition,{reduced,viewport:height,width});
    launchStage.dataset.filmFlight=ignition>.08?'ignited':'ready';
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
    if(y<heroBottom)return {node:prologue,offset:0};
    let record=records[0];
    records.forEach(r=>{if(y+Math.min(height*.2,130)>=r.top)record=r;});
    if(y<record.top+record.height) {
      let point=record.progress??0;
      if(reduced && record.staticScene) {
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
    let node=record.disclosure;
    if(y>=launchTop)node=y>=document.querySelector('#quellen').getBoundingClientRect().top+y?document.querySelector('#quellen'):launch;
    return {node,offset:y-(node.getBoundingClientRect().top+y)};
  }
  function setReduced(value,anchor) {
    if(reduced===value)return;
    reduced=value; dirty=true;
    records.forEach(r=>{r.lastP=-1;});
    if(anchor) {
      // Resolve the roadmap's linear/film layout before measuring its new height.
      const roadmap=records.find(record=>record.chapter.step===6);
      roadmap.renderer.update(anchor.record===roadmap?anchor.point:roadmap.progress??1,{reduced:value,variant,mobile:width<=760});
      measure();
      let top=anchor.record?anchor.record.top+(value?0:anchor.point*anchor.record.range):anchor.node.getBoundingClientRect().top+scrollY+anchor.offset;
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
    if(reduced||r.linear) {
      // A deliberate phase choice remains available without moving imagery.
      const p=Number(control.dataset.filmStill);
      r.staticPoint=p;
      r.renderer.update(p,{reduced:false,variant,mobile:width<=760});
      paintCopy(r,p);
      if(r.chapter.step===6)worldDrawing.update(p,{reduced:false,variant,mobile:width<=760});
      r.stage.style.setProperty('--film-progress',fmt(p));
      r.stage.dataset.progress=p.toFixed(3);
      r.lastP=p;
      r.stage.scrollIntoView({block:'start',behavior:'instant'});
    } else scrollTo({top:r.top+Number(control.dataset.filmPoint)*r.range,behavior:'smooth'});
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
