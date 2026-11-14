/**
 * Material composites for the two existing architecture cutouts.
 * Run from the repository root: node docs/pitch-review/build-glass-assets.mjs
 * The SVG remains self-contained for <img> use. The original WebP is unchanged.
 * All masks use the original image coordinates; furniture and structure stay solid.
 */
import {readFileSync, writeFileSync} from 'node:fs';

const line = (d, width = 12) => `<path d="${d}" fill="none" stroke="white" stroke-width="${width}"/>`;
const shape = d => `<path d="${d}" fill="white"/>`;
// A gently shaped silhouette keeps the photographed cloth, chairs and candle.
function dining(cx, top, scale = 1, flowers = false) {
  return `<g transform="translate(${cx} ${top}) scale(${scale})">` +
    shape('M-39 4 Q-47 -7 0 -10 Q47 -7 39 4 L40 67 Q20 73 0 68 Q-21 72 -40 67 Z') +
    shape('M-39 11 Q-52 5 -64 -5 Q-84 -19 -81 1 L-74 27 Q-67 35 -51 33 L-50 62 L-45 62 L-45 31 L-37 28 Z') +
    shape('M40 12 Q54 6 65 -4 Q82 -15 79 3 L71 28 Q62 35 51 34 L49 64 L44 64 L44 31 L38 29 Z') +
    line('M-71 29 -74 64 M68 29 72 64',3) +
    (flowers ? shape('M-18 -9 L-17 -20 -29 -26 -24 -31 -27 -40 -18 -39 -18 -49 -10 -43 -6 -54 1 -45 7 -50 11 -40 20 -42 17 -33 26 -28 19 -22 14 -19 15 -9Z') : '<rect x="-8" y="-25" width="16" height="18" rx="3" fill="white"/>') +
    '</g>';
}

const variants = {
  pavilion: {
    width:1774, height:887,
    glass:'M152 420 L534 472 L1437 453 L1437 765 L152 742 Z',
    side:'M1464 381 L1652 421 L1652 738 L1464 766 Z',
    // The broad ceiling and floor retain their material and reflected light.
    structure: [
      line('M148 416 148 752',17), line('M176 415 176 750',11),
      line('M328 405 328 750 M339 406 339 749',10),
      line('M508 398 508 756 M728 387 728 762 M982 375 982 766 M1297 362 1297 769',11),
      line('M1449 356 1449 771',25),
      line('M1528 380 1528 758 M1607 402 1607 748',10),
      line('M1658 416 1658 745',13),
      shape('M154 741 L540 732 L1400 739 L1437 756 L1437 766 L154 746Z'),
      shape('M1466 742 1652 728 1652 739 1466 766Z')
    ].join(''),
    tables:[
      [541,634,.73,true],[750,634,.73,true],[968,634,.73,true],[1145,635,.73,true],[1351,636,.73,true],
      [421,670,.92,true],[637,674,.94,true],[863,674,.94,true],[1081,676,.94,true],[1285,677,.94,true]
    ],
    reflection:'M194 426 213 430 204 737 188 738Z M542 478 558 478 550 608 538 610Z M1325 461 1339 461 1337 608 1326 606Z'
  },
  lounge: {
    width:1846,height:852,
    glass:'M137 485 L476 518 L1457 504 L1540 463 L1540 755 L137 741Z',
    side:'M1570 459 L1752 497 L1752 738 L1570 759Z',
    structure:[
      line('M127 480 127 748',22), line('M291 480 291 748',10),
      line('M360 478 360 750',10), line('M611 470 611 752',18),
      line('M793 466 793 754 M979 463 979 756 M1139 458 1139 759 M1295 456 1295 761',12),
      line('M1554 451 1554 764',25),
      line('M1615 470 1615 754 M1680 484 1680 748 M1742 493 1742 742',10),
      line('M1759 494 1759 741',12),
      shape('M138 735 L1539 741 L1539 755 L138 743Z'),
      shape('M1572 748 1751 729 1751 738 1572 759Z'),
      // Pendant lights float in front of the open glazing, with their cables.
      line('M486 489 486 552 M884 482 884 549 M1253 476 1253 545',2),
      shape('M445 550 Q489 542 535 550 L536 575 Q488 582 445 574Z'),
      shape('M842 547 Q885 539 930 548 L930 574 Q885 581 842 573Z'),
      shape('M1207 546 Q1253 536 1307 547 L1307 572 Q1256 580 1207 571Z')
    ].join(''),
    tables:[
      [461,666,.66,false],[699,666,.66,false],[936,665,.66,false],[1186,664,.66,false],
      [322,687,.77,false],[573,687,.77,false],[822,691,.77,false],[1069,691,.77,false],[1320,693,.77,false]
    ],
    reflection:'M150 491 165 492 159 729 148 730Z M658 523 672 523 669 632 658 634Z M1506 480 1522 472 1522 746 1509 744Z'
  }
};

for (const [name, v] of Object.entries(variants)) {
  const original = readFileSync(`teil6/${name}-tables-cutout.webp`).toString('base64');
  const output = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${v.width}" height="${v.height}" viewBox="0 0 ${v.width} ${v.height}">
<title>${name==='pavilion'?'Pavillon':'Lounge'} mit umlaufend durchlässiger Erdgeschossverglasung</title>
<desc>Architektonische Konzeptvisualisierung. Originale Perspektive und Möblierung; Dach, Tragwerk und Möbel deckend, Glasflächen lichtdurchlässig.</desc>
<defs><mask id="materials" x="0" y="0" width="${v.width}" height="${v.height}" maskUnits="userSpaceOnUse" style="mask-type:luminance">
<rect width="${v.width}" height="${v.height}" fill="white"/>
<path d="${v.glass}" fill="#171717"/><path d="${v.side}" fill="#242424"/>
${v.tables.map(a=>dining(...a)).join('')}
${v.structure}
</mask></defs>
<image width="${v.width}" height="${v.height}" xlink:href="data:image/webp;base64,${original}" mask="url(#materials)"/>
<path d="${v.reflection}" fill="#bed8e0" opacity=".075"/>
</svg>\n`;
  writeFileSync(`teil6/${name}-glass.svg`,output);
  console.log(`${name}-glass.svg: ${Buffer.byteLength(output)} bytes`);
}
