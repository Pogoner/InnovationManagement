/* RocketLight pitch server: serves the static pitch and keeps the live menu
 * bookings in memory. No dependencies, no login. Bookings older than
 * WINDOW_MIN minutes are dropped, so a restart simply starts a fresh round. */
'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT) || 8080;
const WINDOW_MIN = 30;
const MAX_BOOKINGS = 300;
const RATE = {limit: 120, perMs: 60_000};

// Keep in sync with pitch/booking-shared.js.
const AVATARS = new Set(['m0', 'm2', 'm3', 'm4', 'w0', 'w1', 'w3', 'w4']);
const MENUS = new Set(['falcon', 'odyssey', 'starlight']);
const EXTRAS = new Set(['brief', 'film', 'heli']);

// Only the presentation and the source documents are public; docs/ and the repo stay private.
const PUBLIC_DIRS = ['pitch', 'quellen'];
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff2': 'font/woff2',
  '.md': 'text/plain; charset=utf-8'
};

let bookings = [];
const hits = new Map();

const prune = () => {
  const cutoff = Date.now() - WINDOW_MIN * 60_000;
  bookings = bookings.filter(booking => booking.t >= cutoff);
};

const clientIp = req => String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(time => now - time < RATE.perMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE.limit;
}

function json(res, status, body) {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'});
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > 4096) { reject(new Error('too large')); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function validate(input) {
  if (!input || typeof input !== 'object') return null;
  const name = String(input.name ?? '').replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 16);
  const cid = String(input.cid ?? '').replace(/[^\w-]/g, '').slice(0, 40);
  const extras = Array.isArray(input.extras) ? [...new Set(input.extras.filter(extra => EXTRAS.has(extra)))] : [];
  if (!name || cid.length < 8 || !AVATARS.has(input.avatar) || !MENUS.has(input.menu)) return null;
  return {cid, name, avatar: input.avatar, menu: input.menu, extras};
}

async function api(req, res, url) {
  if (url.pathname !== '/api/bookings') return json(res, 404, {error: 'not found'});
  prune();
  if (req.method === 'GET') {
    return json(res, 200, {
      windowMin: WINDOW_MIN,
      bookings: bookings.map(({name, avatar, menu, extras, t}) => ({name, avatar, menu, extras, t}))
    });
  }
  if (req.method !== 'POST') return json(res, 405, {error: 'method not allowed'});
  if (limited(clientIp(req))) return json(res, 429, {error: 'zu viele Anfragen'});
  let data = null;
  try { data = validate(JSON.parse(await readBody(req))); } catch { data = null; }
  if (!data) return json(res, 400, {error: 'ungültige Buchung'});
  // One booking per device: booking again replaces the earlier choice.
  bookings = bookings.filter(booking => booking.cid !== data.cid);
  if (bookings.length >= MAX_BOOKINGS) bookings.shift();
  bookings.push({...data, t: Date.now()});
  return json(res, 200, {ok: true});
}

function serveFile(req, res, file) {
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'}); res.end('Nicht gefunden'); return; }
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const headers = {'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': type.startsWith('text/html') ? 'no-cache' : 'public, max-age=300'};
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (range && (range[1] || range[2])) {
      const start = range[1] ? Number(range[1]) : Math.max(0, stat.size - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1;
      if (start > end || start >= stat.size) { res.writeHead(416, {'Content-Range': `bytes */${stat.size}`}); res.end(); return; }
      res.writeHead(206, {...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1});
      if (req.method === 'HEAD') { res.end(); return; }
      fs.createReadStream(file, {start, end}).pipe(res);
      return;
    }
    res.writeHead(200, {...headers, 'Content-Length': stat.size});
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, {error: 'method not allowed'});
    if (url.pathname === '/' || url.pathname === '/pitch') { res.writeHead(302, {Location: '/pitch/'}); res.end(); return; }
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const target = path.resolve(ROOT, relative.endsWith('/') ? relative + 'index.html' : relative);
    const inside = PUBLIC_DIRS.some(dir => target.startsWith(path.join(ROOT, dir) + path.sep));
    if (!inside) { res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'}); res.end('Nicht gefunden'); return; }
    serveFile(req, res, target);
  } catch {
    if (!res.headersSent) json(res, 500, {error: 'Serverfehler'});
    else res.end();
  }
});

server.listen(PORT, () => console.log(`RocketLight pitch: http://localhost:${PORT}/pitch/`));
