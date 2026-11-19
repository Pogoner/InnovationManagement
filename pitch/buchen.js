(() => {
  'use strict';
  const B = window.PitchBooking;
  if (!B) return;
  const $ = selector => document.querySelector(selector);
  const store = {
    read() { try { return JSON.parse(localStorage.getItem('rl-booking') || 'null'); } catch { return null; } },
    write(value) { try { localStorage.setItem('rl-booking', JSON.stringify(value)); } catch { /* private mode: booking still works */ } }
  };
  const newId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2, 10));
  const saved = store.read();
  const state = {
    cid: saved?.cid || newId(),
    name: saved?.name || '',
    avatar: saved?.avatar || B.avatars[0].id,
    menu: saved?.menu || '',
    extras: new Set(saved?.extras || [])
  };

  const form = $('#book-form'), done = $('#book-done'), error = $('#book-error'), submit = $('#book-submit');
  const nameInput = $('#book-name');
  nameInput.value = state.name;

  const radio = (node, on) => node.setAttribute('aria-checked', String(on));
  $('#book-avatars').innerHTML = B.avatars.map(a => `<button type="button" class="book-avatar" role="radio" aria-checked="false" aria-label="${B.esc(a.t)}" data-avatar="${a.id}">${B.avatarSVG(a.id, 96)}</button>`).join('');
  $('#book-menus').innerHTML = B.menus.map(m => `<button type="button" class="book-menu" role="radio" aria-checked="false" data-menu="${m.id}">
    <svg viewBox="-27 -27 54 54" aria-hidden="true"><circle class="plate" r="25"/><circle r="18" fill="none" stroke="#a9d9d93a"/><g class="glyph">${m.glyph}</g></svg>
    <span><b>${m.name}</b><small>${m.tag} · ${m.line}</small></span></button>`).join('');
  $('#book-extras').innerHTML = B.extras.map(x => `<button type="button" class="book-extra" role="checkbox" aria-checked="false" data-extra="${x.id}"><i aria-hidden="true">✓</i><span><b>${x.t}</b><small>${x.s}</small></span></button>`).join('');

  function paint() {
    document.querySelectorAll('[data-avatar]').forEach(node => radio(node, node.dataset.avatar === state.avatar));
    document.querySelectorAll('[data-menu]').forEach(node => radio(node, node.dataset.menu === state.menu));
    document.querySelectorAll('[data-extra]').forEach(node => radio(node, state.extras.has(node.dataset.extra)));
  }
  const fail = message => { error.textContent = message; error.hidden = !message; };

  form.addEventListener('click', event => {
    const avatar = event.target.closest('[data-avatar]'), menu = event.target.closest('[data-menu]'), extra = event.target.closest('[data-extra]');
    if (avatar) state.avatar = avatar.dataset.avatar;
    if (menu) state.menu = menu.dataset.menu;
    if (extra) state.extras.has(extra.dataset.extra) ? state.extras.delete(extra.dataset.extra) : state.extras.add(extra.dataset.extra);
    if (avatar || menu || extra) { fail(''); paint(); }
  });

  function showDone(booking) {
    const menu = B.menus.find(m => m.id === booking.menu);
    $('#book-done-avatar').innerHTML = B.avatarSVG(booking.avatar, 132);
    $('#book-done-title').textContent = `Willkommen an Bord, ${booking.name}.`;
    const extras = booking.extras.map(id => B.extras.find(x => x.id === id)?.t).filter(Boolean);
    $('#book-done-detail').textContent = `Menü ${menu?.name || ''}` + (extras.length ? ` · ${extras.join(', ')}` : '');
    form.hidden = true;
    document.querySelector('.book-head').hidden = true;
    done.hidden = false;
    scrollTo(0, 0);
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    state.name = nameInput.value.replace(/\s+/g, ' ').trim();
    if (!state.name) { fail('Bitte geben Sie einen Namen ein.'); nameInput.focus(); return; }
    if (!state.menu) { fail('Bitte wählen Sie ein Menü.'); return; }
    const booking = {cid: state.cid, name: state.name, avatar: state.avatar, menu: state.menu, extras: [...state.extras]};
    submit.disabled = true;
    fail('');
    try {
      const response = await fetch(new URL('../api/bookings', document.baseURI), {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(booking)});
      if (!response.ok) throw new Error(response.status === 429 ? 'Zu viele Versuche. Bitte kurz warten.' : 'Die Buchung konnte nicht gespeichert werden.');
      store.write({...booking, t: Date.now()});
      showDone(booking);
    } catch (problem) {
      fail(problem.message === 'Failed to fetch' ? 'Keine Verbindung. Bitte erneut versuchen.' : problem.message);
    } finally {
      submit.disabled = false;
    }
  });

  $('#book-change').addEventListener('click', () => { done.hidden = true; form.hidden = false; document.querySelector('.book-head').hidden = false; });

  paint();
  if (saved?.menu && Date.now() - (saved.t || 0) < 30 * 60_000) showDone(saved);
})();
