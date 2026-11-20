/* Shared by the booking page and the live menu slide: menus, extras and the
 * black-tie avatars (a reduced set of the avatars in assets/js/dinner.js).
 * The ids must match the whitelist in server/server.js. */
(() => {
  'use strict';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const SKIN = ['#f3d2bb', '#e6b58f', '#cf9a6c', '#a86d45', '#7b4a2c', '#5a3520'];
  const AVATARS = [
    {id:'m0', t:'Klassischer Smoking', skin:1, hair:'#3a2617', hs:'side', suit:'#111114', lap:'#26262b', bow:'#0b0b0c'},
    {id:'m2', t:'Mitternachtsblau', skin:4, hair:'#120e0c', hs:'buzz', beard:'short', suit:'#15203a', lap:'#0d1529', bow:'#0d1529'},
    {id:'m3', t:'Samt-Smoking Bordeaux', skin:3, hair:'#1c1410', hs:'curly', suit:'#4b1020', lap:'#2b0911', bow:'#0b0b0c'},
    {id:'m4', t:'Frack, weiße Fliege', skin:0, hair:'#a6a6a6', hs:'slick', glasses:1, suit:'#0c0c0e', lap:'#1d1d21', bow:'#f4f4f4', vest:1},
    {id:'w0', t:'Schwarzes Abendkleid', skin:1, hair:'#2a1a12', hs:'waves', gown:'#0f0f12', cut:'strapless', jw:'pearl'},
    {id:'w1', t:'Smaragd-Robe', skin:3, hair:'#110d0b', hs:'bun', gown:'#0f4b39', cut:'vneck', jw:'gold'},
    {id:'w3', t:'Rotes Abendkleid', skin:2, hair:'#7d2f16', hs:'waves', gown:'#9b1023', cut:'halter', jw:'gold'},
    {id:'w4', t:'Pailletten Mitternachtsblau', skin:5, hair:'#0e0b0a', hs:'afro', gown:'#17224a', cut:'vneck', jw:'silver', sequin:1}
  ];
  const MENUS = [
    {id:'falcon', name:'Falcon', tag:'Signature', dish:'Kobe-Wagyu', line:'Kaviar, Wagyu und Hummer', glyph:'<ellipse rx="15" ry="10"/><path d="M-8-5-2 5M0-7 6 4M7-6 10 0"/>'},
    {id:'odyssey', name:'Odyssey', tag:'Aus dem Ozean', dish:'Steinbutt', line:'Fisch und Meeresfrüchte', glyph:'<path d="M-15 0C-8-10 6-10 11 0C6 10-8 10-15 0Z"/><path d="M11 0 18-7V7Z"/><circle cx="-8" cy="-2" r="1.3"/>'},
    {id:'starlight', name:'Starlight', tag:'Vegetarisch', dish:'Sellerie im Salzteig', line:'Gemüse, Pilze und Trüffel', glyph:'<circle cx="-7" cy="-4" r="7"/><circle cx="6" cy="-5" r="7"/><circle cx="0" cy="4" r="7"/><path d="M-2 11 -3 16M3 11 4 16"/>'}
  ];
  const EXTRAS = [
    {id:'brief', t:'Briefing mit Ingenieur', s:'30 Minuten am privaten Tisch'},
    {id:'film', t:'Persönlicher Launch-Film', s:'4K-Film mit Ihrem Tisch und dem Start'},
    {id:'heli', t:'Helikopter-Transfer', s:'Vom Hotel oder Terminal'}
  ];
  const shade = (hex, k) => {
    const n = parseInt(hex.slice(1), 16);
    const c = v => Math.max(0, Math.min(255, v * k | 0));
    return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
  };
  let counter = 0;
  const byId = id => AVATARS.find(a => a.id === id) || AVATARS[0];

  function avatarSVG(id, px = 96, extra = '') {
    const a = byId(id), sk = SKIN[a.skin], skD = shade(sk, .82), h = a.hair, uid = 'pav' + (counter++);
    const W = a.id[0] === 'w';
    let s = `<defs><clipPath id="${uid}c"><circle cx="50" cy="50" r="50"/></clipPath><radialGradient id="${uid}g" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="#2a2f3a"/><stop offset="1" stop-color="#0c0e13"/></radialGradient></defs><g clip-path="url(#${uid}c)"><rect width="100" height="100" fill="url(#${uid}g)"/>`;
    const back = {waves:'M30 46 C27 22 73 22 70 46 L75 86 C66 92 34 92 25 86 Z'}[a.hs];
    if (back) s += `<path d="${back}" fill="${h}"/>`;
    if (a.hs === 'afro') s += `<circle cx="50" cy="38" r="25" fill="${h}"/>` + [[30,30],[70,30],[28,48],[72,48],[40,18],[60,18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="${h}"/>`).join('');
    if (a.hs === 'bun') s += `<circle cx="50" cy="21" r="9" fill="${h}"/>`;
    if (!W) {
      s += `<path d="M6 100 C8 82 27 72 50 72 C73 72 92 82 94 100Z" fill="${a.suit}"/><path d="M41 72 L59 72 L50 98Z" fill="#f6f6f4"/>`;
      if (a.vest) s += `<path d="M44 82 L56 82 L50 98Z" fill="#ffffff" stroke="#d9d9d9" stroke-width=".5"/>`;
      s += `<path d="M41 72 L50 98 L41 100 L31 84 L38 80Z" fill="${a.lap}"/><path d="M59 72 L50 98 L59 100 L69 84 L62 80Z" fill="${a.lap}"/>`;
      s += `<path d="M43 74.5 L50 77.5 L43 80.5Z M57 74.5 L50 77.5 L57 80.5Z" fill="${a.bow}"/><rect x="48.4" y="76" width="3.2" height="3" rx="1" fill="${a.bow}"/>`;
    } else {
      s += `<path d="M8 100 C10 84 26 76 42 75 L58 75 C74 76 90 84 92 100Z" fill="${sk}"/>`;
      const cuts = {
        strapless:'M20 100 C22 92 28 88 32 88 C40 86 60 86 68 88 C72 88 78 92 80 100Z',
        vneck:'M14 100 C16 86 28 79 38 78 L50 94 L62 78 C72 79 84 86 86 100Z',
        halter:'M18 100 C20 90 29 85 36 84 L44 74 L50 90 L56 74 L64 84 C71 85 80 90 82 100Z'
      };
      s += `<path d="${cuts[a.cut]}" fill="${a.gown}"/>`;
      if (a.sequin) for (let i = 0; i < 26; i++) s += `<circle cx="${16 + ((i * 37) % 68)}" cy="${88 + ((i * 13) % 11)}" r=".9" fill="#c9d3ff" opacity=".8"/>`;
    }
    s += `<path d="M43 57 L57 57 L58 75 C54 77 46 77 42 75Z" fill="${sk}"/><path d="M43 60 C47 64 53 64 57 60 L57 64 C53 67 47 67 43 64Z" fill="${skD}" opacity=".55"/>`;
    if (W) {
      const c = {pearl:'#f4efe6', gold:'#d8b46a', silver:'#dfe5ee'}[a.jw];
      for (let i = 0; i <= 10; i++) { const t = i / 10; s += `<circle cx="${(40 + 20 * t).toFixed(1)}" cy="${(76 + Math.sin(t * Math.PI) * 5).toFixed(1)}" r="${a.jw === 'pearl' ? 1.3 : .9}" fill="${c}"/>`; }
      if (a.jw !== 'pearl') s += `<path d="M50 81 L51.8 84 L50 87 L48.2 84Z" fill="${c}"/>`;
    }
    // Hair crown behind the face, so the scalp is covered above the fringe.
    s += `<ellipse cx="50" cy="36" rx="18" ry="17.5" fill="${h}" ${a.hs === 'buzz' ? 'opacity=".75"' : ''}/>`;
    s += `<ellipse cx="34.5" cy="47" rx="3" ry="4.2" fill="${skD}"/><ellipse cx="65.5" cy="47" rx="3" ry="4.2" fill="${skD}"/>`;
    s += `<ellipse cx="50" cy="45" rx="16" ry="19" fill="${sk}"/><path d="M36 48 C38 60 44 64 50 64 C56 64 62 60 64 48 C62 58 56 62 50 62 C44 62 38 58 36 48Z" fill="${skD}" opacity=".35"/>`;
    if (W && a.hs !== 'afro') { const c = {pearl:'#f4efe6', gold:'#d8b46a', silver:'#dfe5ee'}[a.jw]; s += `<circle cx="34.5" cy="51.5" r="1.3" fill="${c}"/><circle cx="65.5" cy="51.5" r="1.3" fill="${c}"/>`; }
    if (a.beard === 'short') s += `<path d="M37 50 C38 62 44 66 50 66 C56 66 62 62 63 50 C60 58 56 60 50 60 C44 60 40 58 37 50Z" fill="${h}" opacity=".85"/>`;
    s += `<ellipse cx="44" cy="46.5" rx="1.7" ry="2" fill="#1b1411"/><ellipse cx="56" cy="46.5" rx="1.7" ry="2" fill="#1b1411"/>`;
    s += `<path d="M40.5 42.2 Q44 40.4 47.3 42" stroke="${h}" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M52.7 42 Q56 40.4 59.5 42.2" stroke="${h}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M50 47 L48.6 53 Q50 54 51.6 53" stroke="${skD}" stroke-width=".9" fill="none" stroke-linecap="round"/>`;
    s += W ? `<path d="M45.5 57.2 Q50 60.6 54.5 57.2 Q50 58.2 45.5 57.2Z" fill="#a8414a"/>` : `<path d="M45.5 57.4 Q50 60 54.5 57.4" stroke="${shade(sk, .62)}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
    if (a.glasses) s += `<g fill="none" stroke="#1a1a1c" stroke-width="1.1"><rect x="38.6" y="43" width="10" height="7.4" rx="2.6"/><rect x="51.4" y="43" width="10" height="7.4" rx="2.6"/><path d="M48.6 46 L51.4 46"/></g>`;
    // Fronts start above the top of the face (y 26) so no bare scalp shows; they differ in hairline.
    const front = {
      side:'M32 47 C27 14 73 14 68 47 C66 38 62 31 52 31 C43 31 37 38 32 47Z',
      slick:'M33 45 C29 14 71 14 67 45 C64 35 58 31 50 31 C42 31 36 35 33 45Z',
      buzz:'M33.5 43 C31 17 69 17 66.5 43 C62 35 56 33.5 50 33.5 C44 33.5 38 35 33.5 43Z',
      waves:'M32 54 C25 14 75 14 68 54 C65 38 58 32 50 33 C42 32 35 38 32 54Z',
      bun:'M33 45 C29 14 71 14 67 45 C64 35 58 32 50 32 C42 32 36 35 33 45Z'
    }[a.hs];
    if (front) s += `<path d="${front}" fill="${h}" ${a.hs === 'buzz' ? 'opacity=".75"' : ''}/>`;
    if (a.hs === 'curly') s += `<ellipse cx="50" cy="29" rx="18" ry="9" fill="${h}"/>` + [...Array(9)].map((_, i) => `<circle cx="${33 + i * 4.25}" cy="${27 + Math.abs(i - 4) * 2.4}" r="6" fill="${h}"/>`).join('');
    if (a.hs === 'afro') s += `<path d="M33 46 C29 12 71 12 67 46 C62 34 56 31.5 50 31.5 C44 31.5 38 34 33 46Z" fill="${h}"/>`;
    s += '</g>';
    return `<svg viewBox="0 0 100 100" width="${px}" height="${px}" ${extra} role="img" aria-label="${esc(a.t)}">${s}</svg>`;
  }

  // QR code of the booking page next to the pitch (library: pitch/vendor/qrcode.js).
  const bookingUrl = () => new URL('buchen.html', document.baseURI).href;
  function qrMarkup(x, y, size) {
    if (!window.qrcode) return '';
    const qr = window.qrcode(0, 'M');
    qr.addData(bookingUrl());
    qr.make();
    const count = qr.getModuleCount(), pad = size * .07, cell = (size - 2 * pad) / count;
    const f = value => value.toFixed(2);
    let path = '';
    for (let row = 0; row < count; row++) for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) path += `M${f(x + pad + col * cell)} ${f(y + pad + row * cell)}h${f(cell + .2)}v${f(cell + .2)}h${f(-cell - .2)}z`;
    }
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="8" fill="#eff3ed"/><path d="${path}" fill="#060b10"/>`;
  }

  window.PitchBooking = {avatars: AVATARS, menus: MENUS, extras: EXTRAS, avatarSVG, esc, bookingUrl, qrMarkup};
})();
