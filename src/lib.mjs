import { SITE_URL, BASE_PATH, FORM_ENDPOINT } from './config.mjs';
import { business, services, industries, divisions, serviceInterestOptions, knowsAbout } from './data.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Absolute URL for canonical / OG / sitemap. path is root-relative like "/services/". */
export const abs = (path) => SITE_URL + path;

const ORG_ID = () => abs('/#organization');
const SITE_ID = () => abs('/#website');
const PERSON_ID = () => abs('/about/#colin-speer');

const arrow = '<svg class="ico" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export const cta = (href, text, { ghost = false, small = false } = {}) =>
  `<a class="btn${ghost ? ' btn-ghost' : ''}${small ? ' btn-sm' : ''}" href="${href}">${text}${arrow}</a>`;

export const eyebrow = (text) => `<span class="eyebrow"><span class="dot" aria-hidden="true"></span>${text}</span>`;

// Real Swyft wordmark (light version for the dark header/footer). Source + regeneration: scripts/brand/make_logo_assets.py
const logo = `<a class="logo" href="/" aria-label="Swyft home"><img src="/assets/logo-white.svg" alt="Swyft logo" width="139" height="22"></a>`;

function header() {
  const links = [
    ['/services/', 'Services'],
    ['/industries/', 'Industries'],
    ['/blog/', 'Blog'],
    ['/about/', 'About'],
  ];
  const nav = links.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('');
  return `<header class="site-header">
  <div class="wrap header-inner">
    ${logo}
    <nav class="nav-desktop" aria-label="Main"><ul>${nav}</ul></nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${business.phoneE164}">${business.phone}</a>
      ${cta('#lead-form', 'Book a call', { small: true })}
      <details class="nav-mobile">
        <summary aria-label="Open menu"><span></span><span></span><span></span></summary>
        <nav aria-label="Mobile"><ul>${nav}<li><a href="/contact/">Contact</a></li><li><a href="tel:${business.phoneE164}">Call ${business.phone}</a></li></ul></nav>
      </details>
    </div>
  </div>
</header>`;
}

function footer() {
  const col = (title, items) =>
    `<div><p class="foot-title">${title}</p><ul>${items.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>`;
  return `<footer class="site-footer">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      ${logo}
      <p>The marketing company for pest control and route-based home service businesses. Doors, ads, SEO, and outbound under one roof, led by Colin Speer.</p>
      <p class="foot-contact"><a href="mailto:${business.email}">${business.email}</a><br><a href="tel:${business.phoneE164}">${business.phone}</a></p>
    </div>
    ${col('Services', services.map((s) => [s.url, s.short]))}
    ${col('Industries', industries.map((i) => [i.url, i.label]))}
    ${col('Company', [['/about/', 'About Colin Speer'], ['/contact/', 'Contact'], ['/blog/', 'Blog'], ['/services/', 'All services'], ['/industries/', 'All industries'], ['/sitemap/', 'HTML sitemap'], ['/sitemap.xml', 'XML sitemap'], ['/privacy/', 'Privacy policy'], ['/terms/', 'Terms of service']])}
  </div>
  <div class="wrap foot-legal">
    <p>© ${new Date().getFullYear()} Swyft. All rights reserved. Divisions: ${divisions.map((d) => d.name).join(' · ')}.</p>
  </div>
</footer>`;
}

export function breadcrumbs(trail) {
  // trail: [[name, path], ...] excluding Home
  const items = [['Home', '/'], ...trail];
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
    .map(([n, p], i) => (i === items.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${p}">${esc(n)}</a></li>`))
    .join('')}</ol></nav>`;
  const schema = {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(p) })),
  };
  return { html, schema };
}

export const answerBlock = (text) =>
  `<div class="answer" role="note"><p class="answer-label">Quick answer</p><p>${text}</p></div>`;

export function faqSection(faqs, heading = 'Frequently asked questions') {
  if (!faqs?.length) return { html: '', schema: null };
  const html = `<section class="section wrap faq" aria-labelledby="faq-h">
  <h2 id="faq-h">${heading}</h2>
  <div class="faq-list">${faqs
    .map((f) => `<details><summary><h3>${esc(f.q)}</h3></summary><div class="faq-a"><p>${f.a}</p></div></details>`)
    .join('')}</div>
</section>`;
  const schema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
  };
  return { html, schema };
}

export function leadForm({ heading = 'Book a strategy call', sub = 'Tell us about your business. Colin and the team will reach out within one business day.', interest = '' } = {}) {
  const opts = serviceInterestOptions
    .map((o) => `<option${o === interest ? ' selected' : ''}>${esc(o)}</option>`)
    .join('');
  return `<section class="section wrap" id="lead-form" aria-labelledby="lead-h">
  <div class="lead">
    <div class="lead-copy">
      ${eyebrow('Contact')}
      <h2 id="lead-h">${heading}</h2>
      <p>${sub}</p>
      <ul class="lead-facts">
        <li>Email: <a href="mailto:${business.email}">${business.email}</a></li>
        <li>Phone: <a href="tel:${business.phoneE164}">${business.phone}</a></li>
        <li>A 20-minute strategy call. We'll show you where your next 100 jobs come from.</li>
      </ul>
    </div>
    <form class="lead-form" action="mailto:${business.email}?subject=Swyft%20strategy%20call%20request" method="post" enctype="text/plain" data-endpoint="${esc(FORM_ENDPOINT)}" data-email="${business.email}">
      <div class="row2">
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Business name<input name="business" autocomplete="organization" required></label>
      </div>
      <div class="row2">
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
      </div>
      <label>Service interest<select name="service">${interest ? '' : '<option value="" selected disabled>Choose one…</option>'}${opts}</select></label>
      <label>Message<textarea name="message" rows="4" placeholder="Your trade, service area, and goals"></textarea></label>
      <input type="hidden" name="page" value="">
      <label class="hp" aria-hidden="true">Leave blank<input name="_gotcha" tabindex="-1" autocomplete="off"></label>
      <button class="btn btn-block" type="submit">Send message${arrow}</button>
      <p class="form-note">No-JS fallback opens your email app addressed to ${business.email}. Prefer to talk? Call <a href="tel:${business.phoneE164}">${business.phone}</a>.</p>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;
}

export const orgSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID(),
  name: business.name,
  alternateName: business.alternateName,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs('/assets/logo.png'), contentUrl: abs('/assets/logo.png'), width: 1485, height: 235, caption: 'Swyft logo' },
  image: abs('/assets/og-default.png'),
  email: business.email,
  telephone: business.phoneE164,
  description: business.oneLiner,
  slogan: business.tagline,
  areaServed: { '@type': 'Country', name: business.areaServed },
  founder: { '@id': PERSON_ID() },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: business.phoneE164,
    email: business.email,
    areaServed: 'US',
    availableLanguage: 'English',
  },
  knowsAbout: knowsAbout.map((k) => ({ '@type': 'Thing', name: k.name, sameAs: [k.wiki, k.wikidata] })),
  department: divisions.map((d) => ({ '@type': 'Organization', name: d.name, description: d.body })),
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID(),
  url: abs('/'),
  name: business.name,
  publisher: { '@id': ORG_ID() },
  inLanguage: 'en-US',
});

export const personRef = () => ({ '@id': PERSON_ID() });
export const orgRef = () => ({ '@id': ORG_ID() });

/** Rewrite root-relative URLs (href="/x") to include BASE_PATH. */
function withBase(html) {
  if (!BASE_PATH) return html;
  return html.replace(/(href|src|action)="\/(?!\/)/g, `$1="${BASE_PATH}/`);
}

export function page({ path, title, description, body, schema = [], ogType = 'website', ogImage = '/assets/og-default.png', noindex = false, extraHead = '' }) {
  const canonical = abs(path);
  const graph = { '@context': 'https://schema.org', '@graph': [orgSchema(), websiteSchema(), ...schema.filter(Boolean)] };
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Swyft">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Swyft: marketing for pest control and route-based home service businesses">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0d0b">
<link rel="icon" href="/assets/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/site.css">
<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt">
${extraHead}
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header()}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/site.js" defer></script>
</body>
</html>`;
  return withBase(html);
}

export const card = ({ href, kicker = '', title, body, num = '' }) =>
  `<a class="card" href="${href}">${num ? `<span class="card-num">${num}</span>` : ''}${kicker ? `<p class="kicker">${kicker}</p>` : ''}<h3>${title}</h3><p>${body}</p><span class="card-go" aria-hidden="true">${arrow}</span></a>`;
