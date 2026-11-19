import { readdir, mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL, BASE_PATH, BUILD_DATE } from './config.mjs';
import { business, services, industries, divisions, trades } from './data.mjs';
import { page, breadcrumbs, answerBlock, faqSection, leadForm, cta, eyebrow, card, esc, abs, orgRef, personRef } from './lib.mjs';
import { homeFaqs, about, privacyBody, termsBody } from './pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');

async function loadDir(dir) {
  const files = (await readdir(join(ROOT, dir))).filter((f) => f.endsWith('.mjs')).sort();
  const mods = [];
  for (const f of files) mods.push((await import(pathToFileURL(join(ROOT, dir, f)).href)).default);
  return mods;
}

const pages = []; // { path, html, priority, changefreq, title, group }
const emit = (path, html, meta = {}) => pages.push({ path, html, ...meta });

const svcContent = Object.fromEntries((await loadDir('content/services')).map((s) => [s.key, s]));
const indContent = Object.fromEntries((await loadDir('content/industries')).map((s) => [s.key, s]));
const posts = (await loadDir('content/blog')).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

const svcByKey = Object.fromEntries(services.map((s) => [s.key, s]));
const indByKey = Object.fromEntries(industries.map((i) => [i.key, i]));
const postUrl = (p) => `/blog/${p.slug}/`;
const postsForService = (k) => posts.filter((p) => p.service === k);
const postsForIndustry = (k) => posts.filter((p) => p.industries?.includes(k));

const postCards = (list, heading, id = 'guides-h') =>
  list.length
    ? `<section class="section wrap" aria-labelledby="${id}"><h2 id="${id}">${heading}</h2><div class="grid3">${list
        .map((p) => card({ href: postUrl(p), kicker: svcByKey[p.service]?.short ?? 'Guide', title: esc(p.h1), body: esc(p.excerpt) }))
        .join('')}</div></section>`
    : '';

const marquee = () => {
  const items = [...trades, ...trades].map((t) => `<span>${t}<i aria-hidden="true">✦</i></span>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${items}</div></div>
<p class="sr-only">Industries we serve: ${trades.join(', ')}.</p>`;
};

const statStrip = (stats) =>
  `<div class="stats">${stats.map((s) => `<div><div class="stat-v">${esc(s.value)}</div><div class="stat-l">${esc(s.label)}</div></div>`).join('')}</div>`;

const offeringsGrid = (items, heading = "What's included") =>
  `<section class="section wrap" aria-labelledby="inc-h"><h2 id="inc-h">${heading}</h2><div class="grid3">${items
    .map((o) => `<div class="tile"><h3>${esc(o.title)}</h3><p>${o.body}</p></div>`)
    .join('')}</div></section>`;

const stepsBlock = (steps, heading = 'How it works') =>
  `<section class="band"><div class="wrap split"><h2>${heading}</h2><ol class="steps">${steps
    .map((s, i) => `<li><span class="step-n">0${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${s.body}</p></div></li>`)
    .join('')}</ol></div></section>`;

const hero = ({ eyebrowText, h1, answer, intro, ctas = true, crumbs }) => `<section class="hero hero-sub">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    ${crumbs ?? ''}
    ${eyebrowText ? eyebrow(eyebrowText) : ''}
    <h1>${h1}</h1>
    ${answer ? answerBlock(answer) : ''}
    ${intro ? `<p class="lede">${intro}</p>` : ''}
    ${ctas ? `<div class="cta-row">${cta('#lead-form', 'Book a strategy call')}${cta('/services/', 'All services', { ghost: true })}</div>` : ''}
  </div>
</section>`;

const prose = (html) => `<section class="section wrap"><div class="prose">${html}</div></section>`;

// ---------- Home ----------
{
  const bc = null;
  const faq = faqSection(homeFaqs, 'Questions route-based operators ask us');
  const body = `<section class="hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap center">
    ${eyebrow('Built for pest control &amp; route-based businesses')}
    <h1 class="display"><span class="h1-kicker">Pest control &amp; route-based business marketing</span>Every channel.<br> <span class="grad">One growth engine.</span></h1>
    <p class="lede center-text">Swyft brings door-to-door sales teams, cold calling, paid ads, and local SEO together, so pest control, lawn care, HVAC, cleaning, and pool companies stop juggling agencies and start booking jobs.</p>
    <div class="cta-row center-row">${cta('#lead-form', 'Book a strategy call')}${cta('#divisions', 'Explore divisions', { ghost: true })}</div>
    ${answerBlock(`Swyft is a marketing company built for <strong>pest control and route-based home service businesses</strong>. We run three divisions: <a href="/services/door-to-door-sales-teams/">door-to-door sales teams</a> (Swyft Marketing), <a href="/services/cold-calling-appointment-setting/">cold calling and appointment setting</a> (Swyft Outbound), and <a href="/services/digital-marketing/">Meta and Google ads</a> plus <a href="/services/local-seo-google-business-profile/">local SEO</a> (Swyft Digital). We work with companies across the United States. Call ${business.phone} or email ${business.email}.`)}
  </div>
</section>
${marquee()}
<section class="section wrap" id="divisions" aria-labelledby="div-h">
  <div class="section-head"><h2 id="div-h">Three divisions. Zero gaps.</h2><p>Pick one, or run all three in sync. Every division shares data, so each lead gets worked from every angle.</p></div>
  <div class="grid3 tall">${divisions
    .map((d, i) => card({ href: svcByKey[d.service].url, num: `0${i + 1}`, kicker: d.tag, title: d.name, body: d.body }))
    .join('')}</div>
</section>
<section class="band"><div class="wrap stats stats-big">${[
    ['3', 'growth channels, one team'],
    ['1', 'point of contact'],
    ['100%', 'home service focus'],
    ['0', 'long-term lock-ins'],
  ]
    .map(([v, l]) => `<div><div class="stat-v grad">${v}</div><div class="stat-l">${l}</div></div>`)
    .join('')}</div></section>
<section class="section wrap" aria-labelledby="svc-h">
  <div class="section-head"><h2 id="svc-h">Marketing services for route-based businesses</h2><p>Five services, one scorecard. Each is a full program, not a line item.</p></div>
  <div class="grid3">${services.map((s) => card({ href: s.url, kicker: s.division, title: s.name, body: s.blurb })).join('')}${card({ href: '/services/', kicker: 'Hub', title: 'Compare all services', body: 'See how doors, phones, ads, and SEO fit together for your trade.' })}</div>
</section>
<section class="section wrap" aria-labelledby="ind-h">
  <div class="section-head"><h2 id="ind-h">Industries we market</h2><p>Route-based and in-home service trades where density, repeat service, and speed to lead decide who wins.</p></div>
  <ul class="chips">${industries.map((i) => `<li><a href="${i.url}">${i.label}</a></li>`).join('')}</ul>
  <div class="prose narrow">
    <p>Our flagship is <a href="/industries/pest-control-marketing/">pest control marketing</a>: recurring-revenue routes, seasonal pushes, and the door-to-door culture pest control grew up on. The same playbook carries to <a href="/industries/lawn-care-marketing/">lawn care marketing</a>, <a href="/industries/hvac-marketing/">HVAC marketing</a>, <a href="/industries/cleaning-business-marketing/">cleaning business marketing</a>, and <a href="/industries/pool-service-marketing/">pool service marketing</a>, anywhere a tighter route means more profit per truck.</p>
  </div>
</section>
<section class="band" aria-labelledby="rb-h"><div class="wrap"><div class="prose narrow">
  <h2 id="rb-h">Route-based business marketing, built around density</h2>
  <p>A route-based business makes money on recurring stops: quarterly pest service, weekly mowing, weekly pool cleaning, recurring cleaning visits, seasonal HVAC maintenance. Every stop you add near an existing one lowers drive time and raises profit per truck. Generic agencies chase leads anywhere in a 30-mile radius. <strong>Route-based business marketing</strong> chases <strong>route density</strong>.</p>
  <h3>1. Start from the route map</h3>
  <p>We begin with where your trucks already go. The streets next to current customers are the cheapest customers you'll ever win, and the easiest to service. Territory mapping by home age, income, and job history tells our <a href="/services/door-to-door-sales-teams/">door-to-door sales teams</a> where to knock first.</p>
  <h3>2. Saturate, then expand</h3>
  <p>Neighborhood blitzes around active jobs, ads aimed at the zip codes you already serve, and reviews from neighbors build local proof. Once a route is dense, we push into the next one.</p>
  <h3>3. Work every lead from every angle</h3>
  <p>A homeowner who says "not today" at the door gets a follow-up from <a href="/services/cold-calling-appointment-setting/">outbound appointment setting</a>. A Meta lead that goes quiet gets a call. Old estimates and cancelled customers get a reason to come back. Commercial accounts get a dedicated outbound cadence.</p>
  <h3>4. Win the searches on your routes</h3>
  <p><a href="/services/local-seo-google-business-profile/">Google Business Profile management</a> and <a href="/services/pest-control-seo/">pest control SEO</a> make sure the homeowners who do search find you in the map pack and organic results for the towns you serve.</p>
  <h3>5. Keep the customers you win</h3>
  <p>Route density only pays if customers stay. Clear terms at the door, fast follow-up, and reviews requested after good service protect retention, and we measure past the signature, so you can see which channels produce customers who stick.</p>
  <p>Read more in <a href="/blog/route-density-door-to-door-territory-mapping/">route density and D2D territory mapping</a>.</p>
</div></div></section>
<section class="section wrap split" aria-labelledby="why-h">
  <div>${eyebrow('Why Swyft')}<h2 id="why-h">Led by Colin Speer. Obsessed with booked jobs.</h2><p class="muted">The goal is simple: be the first marketing company pest control and route-based operators call. That means one team accountable for every channel. <a href="/about/">Meet Colin</a>.</p></div>
  <div class="why">
    <div><h3>Operators, not theorists</h3><p>We've run doors, managed ad spend, and dialed the phones. Our playbooks come from the field.</p></div>
    <div><h3>Channels that talk to each other</h3><p>Ad audiences inform door routes. Door data shapes outbound lists. Nothing works in a silo.</p></div>
    <div><h3>Reporting you'll actually read</h3><p>Appointments, jobs, and revenue, not impressions. A clear weekly scorecard.</p></div>
  </div>
</section>
${faq.html}
${postCards(posts.slice(0, 6), 'Latest playbooks for route-based growth', 'blog-h')}
<div class="wrap center"><p>${cta('/blog/', 'All guides', { ghost: true })}</p></div>
${leadForm({ heading: 'Ready to fill your schedule?' })}`;
  emit(
    '/',
    page({
      path: '/',
      title: 'Swyft | Marketing Company for Pest Control & Route-Based Businesses',
      description: 'Swyft is the marketing company for pest control and route-based home service businesses: door-to-door sales teams, cold calling, local SEO, and Meta & Google ads.',
      body,
      schema: [faq.schema, { '@type': 'WebPage', '@id': abs('/#webpage'), url: abs('/'), name: 'Swyft', about: orgRef(), isPartOf: { '@id': abs('/#website') } }],
    }),
    { priority: '1.0', group: 'Main', title: 'Home' }
  );
}

// ---------- Services hub ----------
{
  const bc = breadcrumbs([['Services', '/services/']]);
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'Services',
    h1: 'Marketing services for pest control &amp; route-based businesses',
    answer: 'Swyft offers five marketing services for pest control and route-based home service companies: <a href="/services/door-to-door-sales-teams/">door-to-door sales teams</a>, <a href="/services/cold-calling-appointment-setting/">cold calling and appointment setting</a>, <a href="/services/pest-control-seo/">pest control SEO</a>, <a href="/services/local-seo-google-business-profile/">local SEO and Google Business Profile management</a>, and <a href="/services/digital-marketing/">Meta and Google ads</a>. Run one, or run them together under one scorecard.',
    ctas: false,
  })}
<section class="section wrap">${divisions
    .map((d) => {
      const list = services.filter((s) => s.division === d.name);
      return `<div class="hub-group"><h2>${d.name} <span class="muted">· ${d.tag}</span></h2><p class="muted">${d.body}</p><div class="grid3">${list
        .map((s) => card({ href: s.url, kicker: s.division, title: s.name, body: s.blurb }))
        .join('')}</div></div>`;
    })
    .join('')}</section>
<section class="section wrap"><div class="prose narrow">
<h2>How the services work together</h2>
<p>Most route-based companies buy marketing in pieces: a door-to-door crew in spring, an SEO retainer, a Facebook ads freelancer, a call center for overflow. Each vendor reports its own numbers and none of them see the others. Swyft runs every channel from one plan, so the neighborhoods your ads warm up are the ones your reps knock, the leads that don't close at the door go to the outbound team, and every booked job lands on one weekly scorecard.</p>
<h3>Where to start</h3>
<p>If you need volume this season, start with <a href="/services/door-to-door-sales-teams/">D2D sales teams</a> or <a href="/services/digital-marketing/">paid ads</a>. If you want compounding inbound leads, start with <a href="/services/pest-control-seo/">SEO for pest control companies</a> and <a href="/services/local-seo-google-business-profile/">Google Business Profile management</a>. If you sell commercial accounts or sit on a list of old estimates, start with <a href="/services/cold-calling-appointment-setting/">outbound appointment setting</a>. Not sure? <a href="#lead-form">Book a strategy call</a> and we'll map it with you.</p>
<h3>Browse by industry</h3>
<p>See how each service applies to your trade on our <a href="/industries/">industries hub</a>.</p>
</div></section>
${leadForm()}`;
  emit('/services/', page({ path: '/services/', title: 'Marketing Services for Pest Control & Route-Based Businesses | Swyft', description: 'Door-to-door sales teams, cold calling and appointment setting, pest control SEO, local SEO and Google Business Profile management, and Meta & Google ads.', body, schema: [bc.schema, { '@type': 'CollectionPage', name: 'Swyft services', url: abs('/services/'), hasPart: services.map((s) => ({ '@type': 'Service', name: s.name, url: abs(s.url) })) }] }), { priority: '0.9', group: 'Main', title: 'Services' });
}

// ---------- Service money pages ----------
for (const s of services) {
  const c = svcContent[s.key];
  if (!c) { console.warn('missing service content', s.key); continue; }
  const bc = breadcrumbs([['Services', '/services/'], [s.name, s.url]]);
  const faq = faqSection(c.faqs, c.faqHeading);
  const related = postsForService(s.key);
  const body = `${hero({ crumbs: bc.html, eyebrowText: s.division, h1: c.h1, answer: c.answer, intro: c.intro })}
<div class="wrap">${statStrip(c.stats)}</div>
${offeringsGrid(c.offerings)}
${prose(c.sections)}
${stepsBlock(c.steps)}
<section class="section wrap" aria-labelledby="for-h"><h2 id="for-h">${esc(c.industriesHeading ?? 'Industries we run this for')}</h2><ul class="chips">${industries
    .map((i) => `<li><a href="${i.url}">${i.label}</a></li>`)
    .join('')}</ul></section>
${faq.html}
${postCards(related, `${s.short} guides`)}
<section class="section wrap"><p class="muted">Other services: ${services.filter((x) => x.key !== s.key).map((x) => `<a href="${x.url}">${x.name}</a>`).join(' · ')}</p></section>
${leadForm({ heading: c.formHeading ?? 'Book a strategy call', interest: c.interest })}`;
  const svcSchema = {
    '@type': 'Service',
    '@id': abs(s.url) + '#service',
    name: s.name,
    serviceType: c.serviceType ?? s.name,
    description: c.description,
    url: abs(s.url),
    provider: orgRef(),
    brand: { '@type': 'Brand', name: s.division },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', name: 'Pest control and route-based home service businesses' },
    hasOfferCatalog: { '@type': 'OfferCatalog', name: `${s.name} offerings`, itemListElement: c.offerings.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title } })) },
  };
  emit(s.url, page({ path: s.url, title: c.title, description: c.description, body, schema: [bc.schema, svcSchema, faq.schema] }), { priority: '0.9', group: 'Services', title: s.name });
}

// ---------- Industries hub ----------
{
  const bc = breadcrumbs([['Industries', '/industries/']]);
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'Industries',
    h1: 'Marketing for route-based &amp; home service industries',
    answer: 'Swyft markets pest control, lawn care, HVAC, cleaning, pool service, solar, plumbing, window, and home security companies. Pest control is our flagship. Every industry page shows which channels (door-to-door, outbound calling, SEO, Google Business Profile, Meta and Google ads) fit that trade and why.',
    ctas: false,
  })}
<section class="section wrap"><div class="grid3">${industries
    .map((i) => card({ href: i.url, kicker: i.name, title: i.label, body: indContent[i.key]?.blurb ?? '' }))
    .join('')}</div></section>
<section class="section wrap"><div class="prose narrow">
<h2>What "route-based business marketing" means</h2>
<p>A route-based business sends trucks on recurring stops: quarterly pest service, weekly lawn mowing, weekly pool cleaning, recurring cleaning visits, seasonal HVAC tune-ups. Profit depends on <strong>route density</strong>, how many paying stops fit in a day of drive time. Route-based business marketing aims every channel at that: knock the streets next to existing customers, run ads on the zip codes you already serve, and rank where your trucks already drive.</p>
<p>That is why we start with your current route map, not a generic media plan. Read more in our guide to <a href="/blog/route-density-door-to-door-territory-mapping/">route density and D2D territory mapping</a>, or browse <a href="/services/">all services</a>.</p>
</div></section>
${leadForm()}`;
  emit('/industries/', page({ path: '/industries/', title: 'Route-Based Business Marketing by Industry | Swyft', description: 'Route-based business marketing for pest control, lawn care, HVAC, cleaning, pool service, solar, plumbing, window, and home security companies.', body, schema: [bc.schema, { '@type': 'CollectionPage', name: 'Industries Swyft serves', url: abs('/industries/') }] }), { priority: '0.9', group: 'Main', title: 'Industries' });
}

// ---------- Industry money pages ----------
for (const i of industries) {
  const c = indContent[i.key];
  if (!c) { console.warn('missing industry content', i.key); continue; }
  const bc = breadcrumbs([['Industries', '/industries/'], [i.label, i.url]]);
  const faq = faqSection(c.faqs, c.faqHeading);
  const related = postsForIndustry(i.key);
  const body = `${hero({ crumbs: bc.html, eyebrowText: `${i.name} marketing`, h1: c.h1, answer: c.answer, intro: c.intro })}
<section class="section wrap" aria-labelledby="ch-h"><h2 id="ch-h">${esc(c.channelsHeading ?? `Channels we run for ${i.name.toLowerCase()} companies`)}</h2><div class="grid3">${c.channels
    .map((ch) => card({ href: svcByKey[ch.service].url, kicker: svcByKey[ch.service].division, title: esc(ch.title), body: ch.body }))
    .join('')}</div></section>
${prose(c.sections)}
${c.steps ? stepsBlock(c.steps) : ''}
${faq.html}
${postCards(related, `${i.label} guides`)}
<section class="section wrap"><p class="muted">Other industries: ${industries.filter((x) => x.key !== i.key).map((x) => `<a href="${x.url}">${x.label}</a>`).join(' · ')}</p></section>
${leadForm({ heading: c.formHeading ?? `Grow your ${i.name.toLowerCase()} company` })}`;
  const svcSchema = {
    '@type': 'Service',
    '@id': abs(i.url) + '#service',
    name: i.label,
    serviceType: `Marketing for ${i.name.toLowerCase()} companies`,
    description: c.description,
    url: abs(i.url),
    provider: orgRef(),
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', name: `${i.name} companies` },
  };
  emit(i.url, page({ path: i.url, title: c.title, description: c.description, body, schema: [bc.schema, svcSchema, faq.schema] }), { priority: '0.9', group: 'Industries', title: i.label });
}

// ---------- Blog hub ----------
{
  const bc = breadcrumbs([['Blog', '/blog/']]);
  const groups = services
    .map((s) => {
      const list = postsForService(s.key);
      return list.length ? `<div class="hub-group"><h2><a href="${s.url}">${s.name}</a> guides</h2><div class="grid3">${list.map((p) => card({ href: postUrl(p), kicker: s.short, title: esc(p.h1), body: esc(p.excerpt) })).join('')}</div></div>` : '';
    })
    .join('');
  const body = `${hero({ crumbs: bc.html, eyebrowText: 'Blog', h1: 'Pest control &amp; route-based marketing blog', answer: 'Practical playbooks on door-to-door sales, cold calling, pest control SEO, Google Business Profile, and Meta and Google ads for pest control, lawn care, HVAC, cleaning, and pool companies. Grouped by service below.', ctas: false })}
<section class="section wrap">${groups}</section>
${leadForm()}`;
  emit('/blog/', page({ path: '/blog/', title: 'Pest Control & Route-Based Business Marketing Blog | Swyft', description: 'Playbooks on door-to-door sales, cold calling, pest control SEO, Google Business Profile, and ads for pest control and route-based home service companies.', body, schema: [bc.schema, { '@type': 'Blog', name: 'Swyft blog', url: abs('/blog/'), publisher: orgRef() }] }), { priority: '0.8', group: 'Main', title: 'Blog' });
}

// ---------- Blog posts ----------
for (const p of posts) {
  const url = postUrl(p);
  const svc = svcByKey[p.service];
  const bc = breadcrumbs([['Blog', '/blog/'], [p.h1, url]]);
  const faq = faqSection(p.faqs);
  const siblings = posts.filter((x) => x.service === p.service && x.slug !== p.slug).slice(0, 3);
  const body = `${hero({ crumbs: bc.html, eyebrowText: `${svc.short} · ${new Date(p.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}`, h1: esc(p.h1), answer: p.answer, ctas: false })}
<article class="section wrap post">
  <div class="prose">${p.body}</div>
  <aside class="post-aside" aria-label="Related">
    <div class="aside-box"><p class="kicker">Service</p><p><a href="${svc.url}">${svc.name}</a></p>${(p.industries ?? []).length ? `<p class="kicker">Industries</p><ul>${p.industries.map((k) => `<li><a href="${indByKey[k].url}">${indByKey[k].label}</a></li>`).join('')}</ul>` : ''}<p class="kicker">Written by</p><p><a href="/about/">Colin Speer</a></p>${cta('#lead-form', 'Book a call', { small: true })}</div>
  </aside>
</article>
${faq.html}
${postCards(siblings, 'Keep reading', 'more-h')}
${leadForm()}`;
  const article = {
    '@type': 'BlogPosting',
    headline: p.h1,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: personRef(),
    publisher: orgRef(),
    mainEntityOfPage: abs(url),
    url: abs(url),
    image: abs('/assets/og-default.png'),
    about: { '@type': 'Service', name: svc.name, url: abs(svc.url) },
    keywords: p.keyword,
  };
  emit(url, page({ path: url, title: p.title, description: p.description, body, ogType: 'article', schema: [bc.schema, article, faq.schema] }), { priority: '0.6', group: 'Blog', title: p.h1, lastmod: p.updated ?? p.date });
}

// ---------- About ----------
{
  const bc = breadcrumbs([['About', '/about/']]);
  const body = `${hero({ crumbs: bc.html, eyebrowText: 'About', h1: about.h1, answer: about.answer, ctas: false })}
${prose(about.body)}
${leadForm({ heading: 'Talk to Colin' })}`;
  const person = {
    '@type': 'Person',
    '@id': abs('/about/#colin-speer'),
    name: 'Colin Speer',
    url: abs('/about/'),
    worksFor: orgRef(),
    email: business.email,
    telephone: business.phoneE164,
    knowsAbout: ['Door-to-door sales', 'Cold calling', 'Appointment setting', 'Local search engine optimization', 'Google Business Profile', 'Pest control marketing', 'Online advertising'],
    // Add when available: jobTitle, image, alumniOf, memberOf, sameAs (LinkedIn etc.). Not invented here.
  };
  emit('/about/', page({ path: '/about/', title: 'About Colin Speer & Swyft | Pest Control Marketing Company', description: 'Swyft is led by Colin Speer: one accountable team for door-to-door sales, cold calling, local SEO, and ads for pest control and route-based businesses.', body, ogType: 'profile', schema: [bc.schema, person, { '@type': 'AboutPage', url: abs('/about/'), mainEntity: personRef() }] }), { priority: '0.7', group: 'Company', title: 'About Colin Speer' });
}

// ---------- Contact ----------
{
  const bc = breadcrumbs([['Contact', '/contact/']]);
  const body = `${hero({ crumbs: bc.html, eyebrowText: 'Contact', h1: 'Contact Swyft: let\'s grow your <span class="grad">book of jobs.</span>', answer: `Email <a href="mailto:${business.email}">${business.email}</a> or call <a href="tel:${business.phoneE164}">${business.phone}</a>, or use the form below. Tell us your trade, service area, and goals. Colin and the team will reach out within one business day to book a 20-minute strategy call.`, ctas: false })}
${leadForm({ heading: 'Send us a message' })}`;
  emit('/contact/', page({ path: '/contact/', title: 'Contact Swyft | Book a Strategy Call (267-606-8667)', description: 'Book a strategy call with Swyft about door-to-door sales, cold calling, SEO, and ads for your pest control or route-based business. Call 267-606-8667.', body, schema: [bc.schema, { '@type': 'ContactPage', url: abs('/contact/'), about: orgRef() }] }), { priority: '0.7', group: 'Company', title: 'Contact' });
}

// ---------- Privacy / Terms ----------
for (const [path, name, h1, desc, html, ans] of [
  ['/privacy/', 'Privacy policy', 'Privacy policy', 'How Swyft collects, uses, and protects information submitted through swyft-hq.com.', privacyBody, 'Swyft uses the information you send through our forms (name, business, email, phone, service interest, message) only to respond and provide services you ask for. We do not sell personal information, and this site sets no advertising or analytics cookies. Questions: colin@swyft-hq.com.'],
  ['/terms/', 'Terms of service', 'Terms of service', 'Terms governing use of the swyft-hq.com website.', termsBody, 'Content on swyft-hq.com is general information about Swyft\'s marketing services, not legal advice and not a promise of specific results. Any engagement is governed by a separate written agreement. Questions: colin@swyft-hq.com.'],
]) {
  const bc = breadcrumbs([[name, path]]);
  const body = `${hero({ crumbs: bc.html, h1, answer: ans, ctas: false })}${prose(html)}${leadForm()}`;
  emit(path, page({ path, title: `${name} | Swyft`, description: desc, body, schema: [bc.schema] }), { priority: '0.3', group: 'Company', title: name });
}

// ---------- HTML sitemap ----------
{
  const bc = breadcrumbs([['Sitemap', '/sitemap/']]);
  const all = [...pages, { path: '/sitemap/', title: 'HTML sitemap', group: 'Company' }];
  const groups = ['Main', 'Services', 'Industries', 'Blog', 'Company'];
  const body = `${hero({ crumbs: bc.html, h1: 'Swyft sitemap', answer: 'Every page on swyft-hq.com, grouped by type. Also available as <a href="/sitemap.xml">sitemap.xml</a>.', ctas: false })}
<section class="section wrap sitemap-cols">${groups
    .map((g) => `<div><h2>${g}</h2><ul>${all.filter((p) => p.group === g).map((p) => `<li><a href="${p.path}">${esc(p.title)}</a></li>`).join('')}</ul></div>`)
    .join('')}</section>${leadForm()}`;
  emit('/sitemap/', page({ path: '/sitemap/', title: 'HTML Sitemap | Swyft', description: 'All pages on the Swyft website: services, industries, blog posts, and company pages.', body, schema: [bc.schema] }), { priority: '0.3', group: 'Company', title: 'HTML sitemap' });
}

// ---------- 404 ----------
const notFound = page({ path: '/404.html', title: 'Page not found | Swyft', description: 'This page does not exist.', noindex: true, body: `${hero({ h1: 'Page not found', answer: 'That URL doesn\'t exist. Try the <a href="/services/">services hub</a>, <a href="/industries/">industries hub</a>, <a href="/blog/">blog</a>, or <a href="/sitemap/">sitemap</a>.', ctas: false })}${leadForm()}` });

// ---------- Write ----------
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(join(ROOT, 'public'), OUT, { recursive: true });
for (const p of pages) {
  const file = join(OUT, p.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, p.html);
}
await writeFile(join(OUT, '404.html'), notFound);
await writeFile(join(OUT, '.nojekyll'), '');

// sitemap.xml
const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${p.lastmod ?? BUILD_DATE}</lastmod><priority>${p.priority ?? '0.5'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(OUT, 'sitemap.xml'), sm);

// robots.txt: allow everyone, explicitly welcome AI search/retrieval bots.
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Amazonbot', 'meta-externalagent', 'DuckAssistBot', 'MistralAI-User'];
const robots = `# robots.txt for ${business.domain}
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${abs('/sitemap.xml')}
`;
await writeFile(join(OUT, 'robots.txt'), robots);

// llms.txt
const llms = `# Swyft

> ${business.oneLiner}

Key facts:
- Name: Swyft (divisions: Swyft Marketing, Swyft Digital, Swyft Outbound)
- Led by: Colin Speer
- Serves: pest control and route-based home service businesses across the United States (lawn care, HVAC, cleaning, pool service, solar, plumbing, windows, home security)
- Email: ${business.email}
- Phone: ${business.phone}
- Website: ${abs('/')}

## Services
${services.map((s) => `- [${s.name}](${abs(s.url)}): ${s.blurb}`).join('\n')}

## Industries
${industries.map((i) => `- [${i.label}](${abs(i.url)})`).join('\n')}

## Guides
${posts.map((p) => `- [${p.h1}](${abs(postUrl(p))}): ${p.excerpt}`).join('\n')}

## Company
- [About Colin Speer](${abs('/about/')})
- [Contact](${abs('/contact/')})
- [Sitemap](${abs('/sitemap/')})
`;
await writeFile(join(OUT, 'llms.txt'), llms);

console.log(`Built ${pages.length} pages (+404) → dist/  SITE_URL=${SITE_URL} BASE_PATH=${BASE_PATH || '(none)'}  posts=${posts.length}`);
