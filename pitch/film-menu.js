/* Part 08: the audience picks a main course. The votes are mock data until the
 * live booking is connected; the slide says so on screen. The shared film
 * controller supplies progress. No timer or private RAF. */
(() => {
  'use strict';
  const scenes = window.PitchScenes = window.PitchScenes || {};
  const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
  const smooth = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const n = value => Number(value.toFixed(3));
  const set = (node, property, value) => node.style.setProperty(property, String(value));

  // Mock result. Replace `votes` with the live count; everything else derives from it.
  const dishes = [
    {id:'blumenkohl', name:'Blumenkohl', line:'vegetarisch', votes:10},
    {id:'hummer', name:'Hummer', line:'Safranbutter', votes:8},
    {id:'rind', name:'Rinderfilet', line:'Trüffeljus', votes:13},
    {id:'steinbutt', name:'Steinbutt', line:'Champagnersauce', votes:5}
  ];
  const glyphs = {
    blumenkohl: '<circle cx="-7" cy="-4" r="7"/><circle cx="6" cy="-5" r="7"/><circle cx="0" cy="4" r="7"/><path d="M-2 11 -3 16M3 11 4 16"/>',
    hummer: '<path d="M-14 8C-16-8-2-14 8-9C15-5 13 4 6 6"/><path d="M6 6 10 12M0 8 2 14M-6 8-6 14M8-9 14-15M8-9 16-8"/>',
    rind: '<ellipse rx="15" ry="10"/><path d="M-8-5-2 5M0-7 6 4M7-6 10 0"/>',
    steinbutt: '<path d="M-15 0C-8-10 6-10 11 0C6 10-8 10-15 0Z"/><path d="M11 0 18-7V7Z"/><circle cx="-8" cy="-2" r="1.3"/>'
  };
  const geo = {xs:[110,247,383,520], width:64, base:330, height:190};
  const total = dishes.reduce((sum, dish) => sum + dish.votes, 0);
  const lead = dishes.reduce((best, dish) => dish.votes > best.votes ? dish : best, dishes[0]);
  const scale = geo.height / Math.max(...dishes.map(dish => dish.votes));

  scenes[8] = {
    markup: () => `<div class="fm-scene" role="group" aria-label="Beispielhafte Wahl des Hauptgangs: ${dishes.map(dish => `${dish.name} ${dish.votes} Stimmen`).join(', ')}. Beispieldaten, die später durch die Stimmen des Publikums ersetzt werden.">
      <svg class="fm-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <g data-fm-chart>
          <text class="fm-heading" x="320" y="29" text-anchor="middle">WELCHEN HAUPTGANG WÄHLEN SIE?</text>
          <text class="fm-mock" x="320" y="62" text-anchor="middle"><tspan data-fm-total>0</tspan> STIMMEN · BEISPIELDATEN</text>
          <path class="fm-axis" data-fm-axis pathLength="1" d="M40 ${geo.base}H600"/>
          ${dishes.map((dish, index) => `<g class="fm-column" data-fm-column="${index}">
            <rect class="fm-bar${dish === lead ? ' is-lead' : ''}" data-fm-bar x="${geo.xs[index] - geo.width / 2}" y="${geo.base}" width="${geo.width}" height="0" rx="3"/>
            <text class="fm-count${dish === lead ? ' is-lead' : ''}" data-fm-count x="${geo.xs[index]}" y="${geo.base - 10}" text-anchor="middle">0</text>
            <g transform="translate(${geo.xs[index]} 396)"><circle class="fm-plate" r="31"/><circle class="fm-plate-inner" r="22"/><g class="fm-glyph">${glyphs[dish.id]}</g></g>
            <text class="fm-name" x="${geo.xs[index]}" y="456" text-anchor="middle">${dish.name}</text>
            <text class="fm-line" x="${geo.xs[index]}" y="478" text-anchor="middle">${dish.line}</text>
          </g>`).join('')}
          <text class="fm-lead" data-fm-lead x="320" y="508" text-anchor="middle">AM HÄUFIGSTEN: ${lead.name.toUpperCase()} · ${Math.round(lead.votes / total * 100)} %</text>
        </g>
      </svg>
    </div>`,
    mount(root) {
      const chart = root.querySelector('[data-fm-chart]');
      const axis = root.querySelector('[data-fm-axis]');
      const columns = Array.from(root.querySelectorAll('[data-fm-column]'));
      const bars = Array.from(root.querySelectorAll('[data-fm-bar]'));
      const counts = Array.from(root.querySelectorAll('[data-fm-count]'));
      const totalLabel = root.querySelector('[data-fm-total]');
      const leadLabel = root.querySelector('[data-fm-lead]');
      let last = '';
      return {
        update(progress, context = {}) {
          const p = context.reduced ? 1 : clamp(progress);
          const key = `${n(p)}|${Boolean(context.reduced)}|${Boolean(context.static)}`;
          if (key === last) return;
          last = key;
          set(chart, 'opacity', 1);
          set(axis, 'stroke-dashoffset', n(1 - smooth(0, .2, p)));
          let shown = 0;
          dishes.forEach((dish, index) => {
            const arrival = smooth(index * .05, .16 + index * .05, p);
            set(columns[index], 'opacity', n(arrival));
            columns[index].setAttribute('transform', `translate(0 ${n(10 * (1 - arrival))})`);
            const grow = smooth(.52 + index * .05, .78 + index * .05, p);
            const height = dish.votes * scale * grow;
            bars[index].setAttribute('y', n(geo.base - height));
            bars[index].setAttribute('height', n(height));
            counts[index].setAttribute('y', n(geo.base - height - 10));
            counts[index].textContent = Math.round(dish.votes * grow);
            set(counts[index], 'opacity', n(smooth(.52 + index * .05, .6 + index * .05, p)));
            shown += Math.round(dish.votes * grow);
          });
          totalLabel.textContent = shown;
          set(leadLabel, 'opacity', n(smooth(.9, .98, p)));
        }
      };
    }
  };
})();
