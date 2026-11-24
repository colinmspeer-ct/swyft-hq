// QA for dist/: internal links resolve, unique title/description/H1, one H1, canonical,
// lead form present, JSON-LD parses, click depth from home, word counts, placeholder list.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = join(import.meta.dirname, '..', 'dist');
const BASE = (process.env.BASE_PATH ?? '').replace(/\/+$/, '');
const SITE = (process.env.SITE_URL ?? 'https://swyft-hq.com').replace(/\/+$/, '');

async function walk(d) {
  const out = [];
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };
const toPath = (f) => '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');

const files = (await walk(DIST)).filter((f) => !f.endsWith('404.html'));
const errors = [];
const seen = { title: new Map(), desc: new Map(), h1: new Map() };
const graph = new Map();
const placeholders = new Map();
const words = [];

for (const f of files) {
  const html = await readFile(f, 'utf8');
  const path = toPath(f);
  const get = (re) => (html.match(re) || [])[1];
  const title = get(/<title>([^<]*)<\/title>/);
  const desc = get(/<meta name="description" content="([^"]*)"/);
  const h1s = html.match(/<h1[\s>]/g) || [];
  const h1 = get(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.replace(/<[^>]+>/g, '').trim();
  if (!title) errors.push(`${path}: missing title`);
  if (!desc) errors.push(`${path}: missing description`);
  if (h1s.length !== 1) errors.push(`${path}: ${h1s.length} H1s`);
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) errors.push(`${path}: missing canonical`);
  else if (!html.includes(`<link rel="canonical" href="${SITE}/`)) errors.push(`${path}: canonical not on ${SITE}`);
  if (!BASE && /(?:href|src|action|content)="[^"]*\/swyft-hq\//.test(html)) errors.push(`${path}: leftover /swyft-hq base path`);
  if (!html.includes('id="lead-form"') || !html.includes('name="business"')) errors.push(`${path}: missing lead form`);
  if (!html.includes('class="answer"')) errors.push(`${path}: missing answer block`);
  for (const [k, v] of [['title', title], ['desc', desc], ['h1', h1]]) {
    if (!v) continue;
    if (seen[k].has(v)) errors.push(`${path}: duplicate ${k} with ${seen[k].get(v)}`);
    else seen[k].set(v, path);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${path}: bad JSON-LD ${e.message}`); }
  }
  const links = new Set();
  for (const m of html.matchAll(/(?:href|src)="([^"#?]*)(?:[#?][^"]*)?"/g)) {
    const u = m[1];
    if (!u || /^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    if (!u.startsWith(BASE + '/') && u !== BASE) { errors.push(`${path}: link without base path: ${u}`); continue; }
    const rel = u.slice(BASE.length) || '/';
    let target = join(DIST, rel);
    if (rel.endsWith('/')) target = join(target, 'index.html');
    if (!(await exists(target))) errors.push(`${path}: broken link ${u}`);
    else if (rel.endsWith('/')) links.add(rel);
  }
  graph.set(path, [...links]);
  if (/\binvestors?\b/i.test(html)) errors.push(`${path}: uses the word investor`);
  for (const m of html.matchAll(/\[(?:PLACEHOLDER:\s*([^\]]+)|(CLIENT LOGO|STAT|HIGHLEVEL FORM EMBED))\]/g)) {
    const label = (m[1] || m[2]).trim();
    if (!placeholders.has(label)) placeholders.set(label, new Set());
    placeholders.get(label).add(path);
  }
  const main = get(/<main id="main">([\s\S]*?)<section class="section wrap" id="lead-form"/) ?? '';
  words.push([path, main.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length]);
}

// Root-level files: sitemap.xml, robots.txt, CNAME (custom domain builds)
const sitemapXml = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
for (const m of sitemapXml.matchAll(/<loc>([^<]*)<\/loc>/g)) if (!m[1].startsWith(SITE + '/')) errors.push(`sitemap.xml: loc not on ${SITE}: ${m[1]}`);
const robotsTxt = await readFile(join(DIST, 'robots.txt'), 'utf8');
if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`)) errors.push(`robots.txt: Sitemap line not on ${SITE}`);
if (!BASE) {
  const host = new URL(SITE).host;
  if (!/localhost|127\.0\.0\.1/.test(host)) {
    const cname = (await exists(join(DIST, 'CNAME'))) ? (await readFile(join(DIST, 'CNAME'), 'utf8')).trim() : null;
    if (cname !== host) errors.push(`CNAME: expected "${host}", got ${cname === null ? 'no file' : `"${cname}"`}`);
  }
  if (/\/swyft-hq\//.test(sitemapXml + robotsTxt)) errors.push('sitemap.xml/robots.txt: leftover /swyft-hq base path');
}

// Click depth (BFS from home)
const depth = new Map([['/', 0]]);
const q = ['/'];
while (q.length) {
  const p = q.shift();
  for (const n of graph.get(p) ?? []) if (!depth.has(n)) { depth.set(n, depth.get(p) + 1); q.push(n); }
}
for (const p of graph.keys()) {
  if (!depth.has(p)) errors.push(`${p}: unreachable from home`);
  else if (depth.get(p) > 3) errors.push(`${p}: click depth ${depth.get(p)}`);
}

const maxDepth = Math.max(...depth.values());
console.log(`Checked ${files.length} pages. Max click depth from home: ${maxDepth}.`);
if (process.argv.includes('--words')) for (const [p, w] of words.sort()) console.log(String(w).padStart(6), p);
if (process.argv.includes('--placeholders')) for (const [t, ps] of placeholders) console.log(`- ${t}  (${[...ps].join(', ')})`);
if (errors.length) { console.error(errors.join('\n')); console.error(`\n${errors.length} problem(s).`); process.exit(1); }
console.log('All checks passed.');
