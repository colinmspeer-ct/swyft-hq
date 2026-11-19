// Zero-dependency static server for dist/. Honors BASE_PATH (default /swyft-hq) like GitHub Pages.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'dist');
const BASE = (process.env.BASE_PATH ?? '/swyft-hq').replace(/\/+$/, '');
const PORT = Number(process.env.PORT ?? 8080);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (BASE && !p.startsWith(BASE)) { res.writeHead(302, { Location: BASE + '/' }); return res.end(); }
  p = normalize(p.slice(BASE.length) || '/').replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch {}
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    res.end(await readFile(join(ROOT, '404.html')));
  }
}).listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}${BASE}/`));
