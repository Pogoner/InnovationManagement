/* Part 08: live menu choice of the audience. Bookings come from /api/bookings
 * (server/server.js, last 30 minutes only). Without a reachable server the slide
 * shows labelled example data. The shared film controller supplies progress;
 * the only timers are a 5 s poll and a short tween when the counts change. */
(() => {
  'use strict';
  const scenes = window.PitchScenes = window.PitchScenes || {};
  const shared = window.PitchBooking;
  const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
  const smooth = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const n = value => Number(value.toFixed(3));
  const set = (node, property, value) => node.style.setProperty(property, String(value));

  const menus = shared.menus;
  const exampleCounts = {falcon: 13, odyssey: 8, starlight: 10};
  const geo = {xs: [95, 245, 395], width: 70, base: 270, height: 140, avatar: 26, gap: 3, perRow: 5, max: 10};
  const qr = {x: 480, y: 130, size: 150};
  const apiUrl = () => new URL('../api/bookings', document.baseURI);

  scenes[8] = {
    markup: () => `<div class="fm-scene" role="group" aria-label="Menüwahl des Publikums" data-fm-scene>
      <svg class="fm-svg" viewBox="0 0 640 520" aria-hidden="true" focusable="false">
        <g data-fm-chart>
          <text class="fm-heading" x="245" y="29" text-anchor="middle">WELCHES MENÜ WÄHLT DAS PUBLIKUM?</text>
          <text class="fm-mock" data-fm-status x="245" y="58" text-anchor="middle"></text>
          <path class="fm-axis" data-fm-axis pathLength="1" d="M25 ${geo.base}H465"/>
          ${menus.map((menu, index) => `<g class="fm-column" data-fm-column="${index}">
            <rect class="fm-bar" data-fm-bar x="${geo.xs[index] - geo.width / 2}" y="${geo.base}" width="${geo.width}" height="0" rx="3"/>
            <text class="fm-count" data-fm-count x="${geo.xs[index]}" y="${geo.base - 10}" text-anchor="middle">0</text>
            <g transform="translate(${geo.xs[index]} 322)"><circle class="fm-plate" r="29"/><circle class="fm-plate-inner" r="21"/><g class="fm-glyph">${menu.glyph}</g></g>
            <text class="fm-name" x="${geo.xs[index]}" y="378" text-anchor="middle">${menu.name}</text>
            <text class="fm-line" x="${geo.xs[index]}" y="399" text-anchor="middle">${menu.tag}</text>
            <g data-fm-people="${index}"></g>
          </g>`).join('')}
          <text class="fm-lead" data-fm-lead x="245" y="508" text-anchor="middle"></text>
          <g class="fm-qr" data-fm-qr>
            <text class="fm-qr-head" x="${qr.x + qr.size / 2}" y="${qr.y - 16}" text-anchor="middle">SIE SIND EINGELADEN</text>
            ${shared.qrMarkup(qr.x, qr.y, qr.size)}
            <text class="fm-qr-action" x="${qr.x + qr.size / 2}" y="${qr.y + qr.size + 28}" text-anchor="middle">SCANNEN &amp; BUCHEN</text>
            <text class="fm-qr-url" x="${qr.x + qr.size / 2}" y="${qr.y + qr.size + 50}" text-anchor="middle"${shared.bookingUrl().length > 40 ? ` textLength="${qr.size + 20}" lengthAdjust="spacingAndGlyphs"` : ''}>${shared.esc(shared.bookingUrl().replace(/^https?:\/\//, ''))}</text>
          </g>
        </g>
      </svg>
    </div>`,
    mount(root) {
      const scene = root.querySelector('[data-fm-scene]');
      const chart = root.querySelector('[data-fm-chart]');
      const axis = root.querySelector('[data-fm-axis]');
      const qrGroup = root.querySelector('[data-fm-qr]');
      const status = root.querySelector('[data-fm-status]');
      const columns = Array.from(root.querySelectorAll('[data-fm-column]'));
      const bars = Array.from(root.querySelectorAll('[data-fm-bar]'));
      const counts = Array.from(root.querySelectorAll('[data-fm-count]'));
      const people = Array.from(root.querySelectorAll('[data-fm-people]'));
      const leadLabel = root.querySelector('[data-fm-lead]');
      let target = menus.map(menu => exampleCounts[menu.id]);
      let shown = target.slice();
      let live = false, progress = 0, tween = 0, signature = '';
      const bookingsByMenu = menus.map(() => []);

      function draw() {
        const p = progress;
        const max = Math.max(...target, 1);
        const lead = Math.max(...target);
        const scale = geo.height / max;
        set(chart, 'opacity', 1);
        set(axis, 'stroke-dashoffset', n(1 - smooth(0, .2, p)));
        set(qrGroup, 'opacity', n(smooth(0, .15, p)));
        let total = 0;
        menus.forEach((menu, index) => {
          const arrival = smooth(index * .05, .16 + index * .05, p);
          set(columns[index], 'opacity', n(arrival));
          columns[index].setAttribute('transform', `translate(0 ${n(10 * (1 - arrival))})`);
          const grow = smooth(.52 + index * .06, .78 + index * .06, p);
          const height = shown[index] * scale * grow;
          bars[index].setAttribute('y', n(geo.base - height));
          bars[index].setAttribute('height', n(height));
          bars[index].classList.toggle('is-lead', lead > 0 && target[index] === lead);
          counts[index].classList.toggle('is-lead', lead > 0 && target[index] === lead);
          counts[index].setAttribute('y', n(geo.base - height - 10));
          counts[index].textContent = Math.round(shown[index] * grow);
          set(counts[index], 'opacity', n(smooth(.52 + index * .06, .6 + index * .06, p)));
          set(people[index], 'opacity', n(smooth(.74 + index * .05, .9 + index * .05, p)));
          total += target[index];
        });
        status.textContent = live ? (total ? `${total} ${total === 1 ? 'BUCHUNG' : 'BUCHUNGEN'} · LIVE · LETZTE 30 MIN` : 'NOCH KEINE BUCHUNG · QR-CODE SCANNEN') : `${total} STIMMEN · BEISPIELDATEN`;
        const leaders = menus.filter((menu, index) => lead > 0 && target[index] === lead);
        leadLabel.textContent = leaders.length ? `AM HÄUFIGSTEN: ${leaders.map(menu => menu.name.toUpperCase()).join(' & ')} · ${Math.round(lead / total * 100)} %` : '';
        set(leadLabel, 'opacity', n(smooth(.9, .98, p)));
      }

      function paintPeople() {
        const next = JSON.stringify(bookingsByMenu.map(list => list.map(item => [item.avatar, item.name])));
        if (next === signature) return;
        signature = next;
        people.forEach((group, index) => {
          const list = bookingsByMenu[index];
          const shownList = list.slice(0, geo.max);
          const rows = Math.ceil(shownList.length / geo.perRow);
          const width = Math.min(shownList.length, geo.perRow) * (geo.avatar + geo.gap) - geo.gap;
          group.innerHTML = shownList.map((item, i) => {
            const x = geo.xs[index] - width / 2 + (i % geo.perRow) * (geo.avatar + geo.gap);
            const y = 414 + Math.floor(i / geo.perRow) * (geo.avatar + geo.gap);
            return `<g><title>${shared.esc(item.name)}</title>${shared.avatarSVG(item.avatar, geo.avatar, `x="${x}" y="${y}"`)}</g>`;
          }).join('') + (list.length > geo.max ? `<text class="fm-more" x="${geo.xs[index]}" y="${414 + rows * (geo.avatar + geo.gap) + 12}" text-anchor="middle">+${list.length - geo.max}</text>` : '');
        });
      }

      function step() {
        tween = 0;
        let moving = false;
        shown = shown.map((value, index) => {
          const diff = target[index] - value;
          if (Math.abs(diff) < .02) return target[index];
          moving = true;
          return value + diff * .18;
        });
        draw();
        if (moving) tween = requestAnimationFrame(step);
      }

      async function poll() {
        if (document.hidden) return;
        try {
          const response = await fetch(apiUrl(), {cache: 'no-store'});
          if (!response.ok) throw new Error('offline');
          const data = await response.json();
          const cutoff = Date.now() - (data.windowMin || 30) * 60_000;
          const recent = (data.bookings || []).filter(item => item.t >= cutoff);
          menus.forEach((menu, index) => {
            bookingsByMenu[index] = recent.filter(item => item.menu === menu.id).sort((a, b) => b.t - a.t);
          });
          const next = bookingsByMenu.map(list => list.length);
          if (!live) { live = true; shown = shown.map(() => 0); }
          target = next;
          paintPeople();
          if (!tween) tween = requestAnimationFrame(step);
          scene.setAttribute('aria-label', `Menüwahl des Publikums: ${menus.map((menu, index) => `${menu.name} ${next[index]}`).join(', ')}.`);
        } catch { /* keep the last picture; example data stay labelled */ }
      }
      poll();
      setInterval(poll, 5000);

      return {
        update(p, context = {}) {
          progress = context.reduced ? 1 : clamp(p);
          draw();
        }
      };
    }
  };
})();
