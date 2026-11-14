/* The drawing and photograph retain the same measured image coordinates. */
(() => {
  'use strict';
  const clamp = n => Math.min(1, Math.max(0, n));
  const ramp = (a, b, p) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
  const blueprints = {"A": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"film-draft\" data-blueprint=\"A\" viewBox=\"0 0 1774 887\" width=\"1774\" height=\"887\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\">\n  <!-- Coordinates trace pavilion-cutout.webp at its original 1774 × 887 size. -->\n  <polygon class=\"draft-fill draft-fill-front\" points=\"145,416 1446,354 1446,773 145,750\" fill=\"currentColor\" fill-opacity=\"0.035\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-right\" points=\"1458,358 1659,415 1659,744 1458,773\" fill=\"currentColor\" fill-opacity=\"0.022\" stroke=\"none\"/>\n  <!-- Roof: overhang, narrow fascia and the recessed glazing line. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M40 390 L1491 302 L1737 394\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M40 402 L1501 326 L1737 405\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M40 390 L40 402\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1491 302 L1501 326\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1737 394 L1737 405\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M140 416 L1446 354 L1659 415\"/>\n  <!-- Front and right-hand glass facades. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M145 416 L145 750 L1446 773 L1446 354\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1659 415 L1659 744 L1458 773\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M178 414 L178 747\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M328 407 L328 750\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M339 407 L339 748\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M509 397 L509 755\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M727 387 L727 760\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M982 375 L982 766\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1297 360 L1297 771\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1528 377 L1528 761\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1606 399 L1606 749\"/>\n  <!-- Thin, photographed platform; no invented foundation or site grid. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M94 753 L1477 779 L1670 744\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M94 767 L1477 791 L1670 755\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M94 753 L94 767\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1477 779 L1477 791\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1670 744 L1670 755\"/>\n</svg>", "B": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"film-draft\" data-blueprint=\"B\" viewBox=\"0 0 1846 852\" width=\"1846\" height=\"852\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\">\n  <!-- Coordinates trace lounge-cutout.webp at its original 1846 × 852 size. -->\n  <polygon class=\"draft-fill draft-fill-front\" points=\"609,222 1526,160 1526,409 609,429\" fill=\"currentColor\" fill-opacity=\"0.035\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-front\" points=\"127,479 1554,451 1554,764 127,745\" fill=\"currentColor\" fill-opacity=\"0.035\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-right\" points=\"1535,163 1737,261 1737,443 1535,410\" fill=\"currentColor\" fill-opacity=\"0.022\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-right\" points=\"1568,453 1759,492 1759,740 1568,762\" fill=\"currentColor\" fill-opacity=\"0.022\" stroke=\"none\"/>\n  <polygon class=\"draft-fill draft-fill-terrace\" points=\"117,359 609,341 609,429 117,441\" fill=\"currentColor\" fill-opacity=\"0.025\" stroke=\"none\"/>\n  <!-- Upper roof and its thin fascia follow the actual asymmetric overhang. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M348 188 L1556 90 L1798 232\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M348 216 L1557 124 L1798 262\"/>\n  <!-- The upper lounge is set back from the terrace and ground-floor edge. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M609 429 L609 222 L1526 160 L1737 261\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1526 160 L1526 409\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1737 261 L1737 443\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M656 221 L656 427\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M838 211 L838 423\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M978 201 L978 419\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1163 186 L1163 416\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1388 170 L1388 410\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1599 194 L1599 423\"/>\n  <!-- Existing glass terrace balustrade; no gable, crane or imagined structure. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M117 441 L117 359 L714 337 L786 350\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M373 350 L373 434\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M512 345 L512 431\"/>\n  <!-- Horizontal floor band connects the terrace, front and right return. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M57 448 L1558 408 L1782 458\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M57 476 L1558 448 L1782 490\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1558 408 L1558 448\"/>\n  <!-- Ground-floor structural corners and the photographed glazing rhythm. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M127 479 L127 745 L1554 764 L1554 451\"/>\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M1759 492 L1759 740 L1568 762\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M291 477 L291 747\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M611 469 L611 752\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M793 465 L793 754\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M978 462 L978 756\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1138 458 L1138 759\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1295 454 L1295 760\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1616 469 L1616 755\"/>\n  <path class=\"draft-trace draft-detail\" pathLength=\"1\" d=\"M1679 483 L1679 748\"/>\n  <!-- Low platform aligns with the real cutout's ground-contact line. -->\n  <path class=\"draft-trace\" pathLength=\"1\" d=\"M69 747 L1576 772 L1791 739\"/>\n</svg>"};
  const PHASE_STARTS = [0,.12,.24,.36,.48,.60,.72,.86];
  const ROCKET = { x:1292, y:532 };
  const tablePositions = [
    [430,746],[530,748],[630,750],[730,752],[830,754],
    [480,702],[580,704],[680,706],[780,708],[880,710]
  ];
  const phaseAt = p => PHASE_STARTS.reduce((active,at,i)=>p>=at?i:active,0);
  const pulse = (a,b,c,d,p) => ramp(a,b,p)*(1-ramp(c,d,p));
  const fixed = n => n.toFixed(4);

  function tableMarkup(index,x,y) {
    return '<g class="fs-table" data-world-table="'+index+'" transform="translate('+x+' '+y+')">'+
      '<ellipse class="fs-table-top" rx="23" ry="9"/><ellipse class="fs-table-setting" rx="14" ry="4"/>'+
      '<path data-world-seat class="fs-seat" d="M-23 14q7-7 14-1v8h-14Z"/>'+
      '<path data-world-seat class="fs-seat" d="M3 15q7-7 14-1v8H3Z"/>'+
      '<circle class="fs-candle" cy="-1" r="1.5"/></g>';
  }

  const overlays = () => '<svg class="film-site-overlays" viewBox="0 0 1672 941" fill="none" aria-hidden="true" focusable="false">'+
    '<defs><linearGradient id="fs-sight-gradient" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#bce6e0" stop-opacity=".58"/><stop offset="1" stop-color="#efbd91" stop-opacity=".2"/></linearGradient></defs>'+
    '<g class="fs-search-layer">'+
      '<path class="fs-search-grid fs-trace" pathLength="1" d="M307 699 908 652 1080 746 365 779Z M365 719 944 675M340 745 1003 708M412 691 478 774M548 680 626 768M686 669 780 762M826 659 937 753"/>'+
      '<ellipse class="fs-search-ring" cx="680" cy="725" rx="350" ry="87"/><ellipse class="fs-search-ring" cx="680" cy="725" rx="250" ry="62"/>'+
      [[470,743],[677,716],[887,690]].map((xy,i)=>'<g class="fs-candidate" data-site-candidate="'+i+'" transform="translate('+xy.join(' ')+')"><ellipse rx="27" ry="12"/><circle r="4"/><text x="0" y="-22" text-anchor="middle">0'+(i+1)+'</text></g>').join('')+
      '<path class="fs-scan-cursor" d="M520 670 690 774"/>'+
      '<path class="fs-selection-line fs-trace" pathLength="1" d="M677 716 677 623 540 623"/>'+
      '<text class="fs-label" x="375" y="614">Standortvergleich</text><text class="fs-label-sub" x="375" y="642">FLÄCHE · BLICK · ZUGANG</text>'+
    '</g>'+
    '<g class="fs-access-layer">'+
      '<path class="fs-perimeter fs-trace" pathLength="1" d="M275 690 917 641 1123 760 363 812Z"/>'+
      '<path class="fs-access-path fs-trace" pathLength="1" d="M230 822 362 790 468 764 525 728"/>'+
      '<path class="fs-return-path fs-trace" pathLength="1" d="M808 752 981 787 1100 793"/>'+
      '<path class="fs-leader" d="M362 790 310 750 250 750M981 787 1085 842 1190 842"/>'+
      '<text class="fs-label" x="250" y="738">Zugang</text><text class="fs-label" x="1030" y="867">Wege &amp; Schutzkonzept</text>'+
      '<text class="fs-label-sub" x="1030" y="890">ZU PRÜFEN</text>'+
    '</g>'+
    '<g class="fs-layout-layer">'+
      '<path class="fs-floor-outline fs-trace" pathLength="1" d="M366 685 921 654 1040 750 395 788Z"/>'+
      '<path class="fs-terrace fs-trace" pathLength="1" d="M382 728 985 701M395 788 1040 750"/>'+
      tablePositions.map((xy,i)=>'<path class="fs-sight-line" data-sightline="'+i+'" pathLength="1" d="M'+xy.join(' ')+' '+ROCKET.x+' '+ROCKET.y+'"/>').join('')+
      tablePositions.map((xy,i)=>tableMarkup(i,...xy)).join('')+
      '<path class="fs-leader" d="M828 755 892 824 1095 824"/>'+
      '<text class="fs-label" x="910" y="850">10 Tische · 20 Plätze</text>'+
      '<text class="fs-label-sub" x="910" y="874">VERSETZT · ZUM START AUSGERICHTET</text>'+
      '<path class="fs-leader" d="M1013 596 1100 610 1226 610"/>'+
      '<text class="fs-label" x="1110" y="637">Freie Sichtachse</text>'+
    '</g>'+
    '<g class="fs-design-layer">'+
      '<path class="fs-dimension fs-trace" pathLength="1" d="M354 789 1000 775M354 781v16M1000 767v16M1023 731 1036 565M1016 731h15M1029 565h15"/>'+
      '<path class="fs-leader" d="M714 565 745 522 830 522"/>'+
      '<text class="fs-label" x="748" y="507">Tragwerk &amp; Verglasung</text>'+
      '<text class="fs-label-sub" x="490" y="822">RAUMRASTER · ANSCHLÜSSE · DETAILPLANUNG</text>'+
    '</g>'+
    '<g class="fs-build-layer">'+
      '<path class="fs-foundation fs-trace" pathLength="1" d="M355 734 918 749 1000 733M355 743 918 758 1000 742"/>'+
      '<path class="fs-assembly-line" pathLength="1" d="M333 542 1004 542"/>'+
      '<path class="fs-leader" d="M917 740 1020 806 1180 806"/>'+
      '<text class="fs-label" x="1035" y="833">Aufbau &amp; Ausbau</text>'+
      '<text class="fs-label-sub" x="1035" y="857">BASIS → TRAGWERK → HÜLLE</text>'+
    '</g>'+
    '<g class="fs-service-layer">'+
      '<path class="fs-service-route fs-trace" pathLength="1" d="M397 709 484 735 898 736 957 706"/>'+
      '<circle class="fs-kitchen-node" cx="397" cy="709" r="19"/>'+
      '<path class="fs-kitchen-mark" d="M388 710h18M391 705q6-9 12 0M397 698v-3"/>'+
      Array.from({length:7},(_,i)=>'<g class="fs-course" data-service-course="'+i+'" transform="translate('+(490+i*65)+' 735)"><circle r="6"/><text y="29" text-anchor="middle">'+(i+1)+'</text></g>').join('')+
      '<path class="fs-leader" d="M397 709 339 661 255 661"/>'+
      '<text class="fs-label" x="255" y="648">Küche → Service</text>'+
      '<text class="fs-label-sub" x="505" y="805">7 GÄNGE · ABLAUF · TEAM</text>'+
    '</g>'+
    '<g class="fs-pilot-layer">'+
      '<path class="fs-pilot-track" d="M480 772 930 772"/>'+
      Array.from({length:4},(_,i)=>'<g class="fs-pilot-light" data-world-pilot="'+i+'" transform="translate('+(480+i*150)+' 772)"><circle class="fs-pilot-halo" r="27"/><circle class="fs-pilot-ring" r="16"/><circle class="fs-pilot-dot" r="4"/><text y="49" text-anchor="middle">PILOT '+(i+1)+'</text></g>').join('')+
      '<text class="fs-label" x="590" y="861">Testen · auswerten · anpassen</text>'+
    '</g>'+
    '<g class="fs-operation-layer"><path class="fs-leader" d="M808 737 946 820 1170 820"/><text class="fs-label" x="965" y="847">Vom Pilot zum Betrieb</text><text class="fs-label-sub" x="965" y="872">FREIGABE NACH NACHWEIS</text></g>'+
    '</svg>';

  window.PitchArchitecture = {
    markup: function () {
      return '<div class="film-building film-site-building" data-architecture="A"><img class="film-building-ghost" src="../teil6/pavilion-tables-cutout.webp" alt="" width="1774" height="887"><img class="film-building-photo" src="../teil6/pavilion-tables-cutout.webp" alt="" width="1774" height="887">'+blueprints.A+'</div>'+
        '<div class="film-building film-site-building" data-architecture="B"><img class="film-building-ghost" src="../teil6/lounge-tables-cutout.webp" alt="" width="1846" height="852"><img class="film-building-photo" src="../teil6/lounge-tables-cutout.webp" alt="" width="1846" height="852">'+blueprints.B+'</div>'+
        overlays()+'<div class="film-site-caption"><i></i><span>ROCKETLIGHT · RÄUMLICHE KONZEPTVISUALISIERUNG</span></div>';
    },
    mount: function (root) {
      const scan=root.querySelector('.fs-scan-cursor');
      const candidates=[...root.querySelectorAll('[data-site-candidate]')];
      const tables=[...root.querySelectorAll('[data-world-table]')];
      const sightlines=[...root.querySelectorAll('[data-sightline]')];
      const pilots=[...root.querySelectorAll('[data-world-pilot]')];
      const courses=[...root.querySelectorAll('[data-service-course]')];
      const assembly=root.querySelector('.fs-assembly-line');
      const set=(key,value)=>root.style.setProperty(key,fixed(value));
      let lastKey='';
      return {
        update: function (progress,context) {
          const p=clamp(progress);
          const key=fixed(p)+'|'+context.variant+'|'+Boolean(context.reduced);
          if(lastKey===key)return;
          lastKey=key;
          root.dataset.worldVariant=context.variant;
          root.dataset.worldPhase=String(phaseAt(p)+1);
          set('--fs-search',pulse(0,.045,.12,.155,p));
          set('--fs-search-draw',ramp(0,.08,p));
          set('--fs-access',pulse(.12,.16,.24,.275,p));
          set('--fs-access-draw',ramp(.13,.21,p));
          set('--fs-layout',pulse(.24,.265,.36,.39,p));
          set('--fs-layout-draw',ramp(.24,.31,p));
          set('--fs-design',pulse(.36,.39,.48,.52,p));
          set('--fs-design-draw',ramp(.365,.445,p));
          set('--fs-build',pulse(.48,.51,.60,.64,p));
          set('--fs-build-draw',ramp(.48,.56,p));
          set('--fs-service',pulse(.60,.63,.72,.76,p));
          set('--fs-service-draw',ramp(.60,.69,p));
          set('--fs-pilots',pulse(.72,.75,.86,.90,p));
          set('--fs-operate',ramp(.86,.90,p));
          set('--draft-progress',ramp(.335,.46,p));
          set('--draft-opacity',ramp(.335,.38,p)*(1-ramp(.56,.66,p)));
          set('--ghost-opacity',.09*pulse(.38,.45,.49,.56,p));
          set('--build-progress',ramp(.48,.60,p));
          set('--build-opacity',ramp(.48,.53,p));
          set('--building-light',ramp(.62,.90,p));
          scan.setAttribute('transform','translate('+(-180+600*ramp(0,.12,p)).toFixed(1)+' 0)');
          candidates.forEach((node,i)=>{
            const chosen=i===1;
            node.style.setProperty('--candidate-opacity',fixed((chosen?1:1-ramp(.065,.10,p)) * ramp(i*.013,.03+i*.013,p)));
            node.classList.toggle('is-selected',chosen && p>.055);
          });
          tables.forEach((node,i)=>node.style.setProperty('--table-reveal',fixed(ramp(.25+i*.004,.285+i*.004,p))));
          sightlines.forEach((node,i)=>node.style.setProperty('--sight-reveal',fixed(ramp(.275+i*.002,.31+i*.002,p))));
          courses.forEach((node,i)=>node.style.setProperty('--course-reveal',fixed(ramp(.61+i*.008,.64+i*.008,p))));
          pilots.forEach((node,i)=>node.style.setProperty('--pilot-reveal',fixed(ramp(.735+i*.027,.755+i*.027,p))));
          assembly.setAttribute('transform','translate(0 '+(195*(1-ramp(.49,.59,p))).toFixed(1)+')');
        }
      };
    }
  };
})();
