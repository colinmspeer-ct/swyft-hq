import { readdir, mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL, BASE_PATH, BUILD_DATE } from './config.mjs';
import { business, industries } from './data.mjs';
import { page, breadcrumbs, answerBlock, faqSection, leadForm, highlevelSlot, cta, eyebrow, card, esc, abs, orgRef, token, ph } from './lib.mjs';
import { homeFaqs, howItWorks, partner, careers, about, privacyBody, termsBody } from './pages.mjs';
import { internationalParts, internationalLlms } from './international.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');

async function loadDir(dir) {
  const files = (await readdir(join(ROOT, dir))).filter((f) => f.endsWith('.mjs')).sort();
  const mods = [];
  for (const f of files) mods.push((await import(pathToFileURL(join(ROOT, dir, f)).href)).default);
  return mods;
}

const pages = [];
const emit = (path, html, meta = {}) => pages.push({ path, html, ...meta });

const indContent = Object.fromEntries((await loadDir('content/industries')).map((s) => [s.key, s]));
for (const i of industries) {
  if (!indContent[i.key]) throw new Error(`Missing content/industries/${i.key}.mjs`);
}
for (const key of Object.keys(indContent)) {
  if (!industries.some((i) => i.key === key)) throw new Error(`content/industries/${key}.mjs has no entry in src/data.mjs industries`);
}

const hero = ({ eyebrowText, h1, answer, intro, crumbs, primary, secondary }) => `<section class="hero hero-sub">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    ${crumbs ?? ''}
    ${eyebrowText ? eyebrow(eyebrowText) : ''}
    <h1>${h1}</h1>
    ${answer ? answerBlock(answer) : ''}
    ${intro ? `<p class="lede">${intro}</p>` : ''}
    ${primary ? `<div class="cta-row">${primary}${secondary ?? ''}</div>` : ''}
  </div>
</section>`;

const prose = (html) => `<section class="section wrap"><div class="prose">${html}</div></section>`;

const serviceSchema = ({ url, name, serviceType, description, audience, offers = [] }) => ({
  '@type': 'Service',
  '@id': abs(url) + '#service',
  name,
  serviceType,
  description,
  url: abs(url),
  provider: orgRef(),
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'BusinessAudience', name: audience },
  ...(offers.length
    ? { hasOfferCatalog: { '@type': 'OfferCatalog', name: `${name} offers`, itemListElement: offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.title, description: o.body } })) } }
    : {}),
});

// ---------- Home ----------
{
  const faq = faqSection(homeFaqs, 'Questions owners ask before they hand off the door');
  const logos = Array.from({ length: 6 }, () => `<li>${token('CLIENT LOGO')}</li>`).join('');
  const stats = [
    ['Sold accounts', 'Approved count goes here'],
    ['Markets run', 'Approved count goes here'],
    ['Weekly report', 'Sample not published'],
  ]
    .map(([label, note]) => `<div><div class="stat-v">${token('STAT')}</div><p class="stat-l">${esc(label)}</p><p class="stat-note">${esc(note)}</p></div>`)
    .join('');
  const panels = industries
    .map((i, n) => {
      const c = indContent[i.key];
      const pills = c.offers.map((o) => `<li>${esc(o.title)}</li>`).join('');
      return `<article class="ind-panel${i.lead ? ' ind-panel-lead' : ''}" id="${i.key}" aria-labelledby="home-${i.key}">
  <div>
    <p class="ind-num">${String(n + 1).padStart(2, '0')}</p>
    <p class="kicker">${esc(c.homeKicker)}</p>
  </div>
  <div>
    <h3 id="home-${i.key}">${esc(c.homeHeading)}</h3>
    ${c.homeHtml}
    <ul class="offer-pills" aria-label="${esc(i.name)} offers">${pills}</ul>
    <p class="ind-more"><a href="${i.url}">Door-to-door sales for ${esc(i.nav)}</a></p>
  </div>
</article>`;
    })
    .join('');
  const body = `<section class="hero hero-home">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    ${eyebrow(esc(business.legalName))}
    <h1>The outsourced door-to-door sales company.</h1>
    <p class="lede">For home-service and telecom companies that sell at the door. Swyft recruits, trains, houses, and manages the team. You keep the customer. You pay a revenue share per account. You do not hire the reps.</p>
    <div class="cta-row">${cta('/partner/', 'Partner with us')}${cta('/how-it-works/', 'See how it works', { ghost: true })}</div>
    ${answerBlock(`<strong>Swyft</strong> (${esc(business.legalName)}) is the outsourced door-to-door sales company for owners who want more accounts without building a sales force. We <a href="/how-it-works/">recruit, train, house, and manage</a> the reps. They sell your service on your paperwork. You pay a commission per account under a <a href="/partner/">marketing deal</a>. No percentage is published on this site. Email <a href="mailto:${business.email}">${business.email}</a> or call <a href="tel:${business.phoneE164}">${business.phone}</a>.`)}
  </div>
</section>
<section class="section wrap" aria-labelledby="proof-h">
  <div class="section-head"><h2 id="proof-h">Proof slots, empty on purpose</h2><p>No client is named and no result is printed until Swyft has permission. The boxes are placeholders.</p></div>
  <ul class="logo-slots" aria-label="Client logo placeholders">${logos}</ul>
  <div class="stats stats-slots">${stats}</div>
</section>
<section class="band" aria-labelledby="model-h"><div class="wrap">
  <div class="section-head"><h2 id="model-h">What you stop doing</h2><p>The marketing deal is the whole offer. The rate is written in the agreement, not here.</p></div>
  <div class="deal">
    <article><h3>You keep</h3><ul>
      <li>The brand the homeowner sees</li>
      <li>Your price and your paperwork</li>
      <li>The customer, after the sale</li>
      <li>Install, service, and the warranty</li>
    </ul></article>
    <article><h3>Swyft runs</h3><ul>
      <li>Recruiting the reps</li>
      <li>Training them on your offer</li>
      <li>Housing them in the market</li>
      <li>Managing the week and the report</li>
    </ul></article>
  </div>
  <p class="deal-note">You pay a revenue share on each account the agreement counts. <a href="/partner/">Read the marketing deal</a>. There is no percent on this website.</p>
</div></section>
<section class="section wrap" aria-labelledby="ind-h">
  <div class="section-head"><h2 id="ind-h">Nine industries. Nine different doors.</h2><p>Exteriors lead, roofing in particular. The rest are not the same page with the trade swapped. <a href="/industries/">All industries</a>.</p></div>
  <div class="ind-list">${panels}</div>
</section>
<section class="band" aria-labelledby="steps-h"><div class="wrap split">
  <div><h2 id="steps-h">Five steps, then a weekly report</h2><p class="muted">Recruit, train, deploy, manage, report. Housing happens at deploy. You are not the landlord and you are not the sales manager.</p><p>${cta('/how-it-works/', 'How it works', { ghost: true })}</p></div>
  <ol class="steps">${howItWorks.steps.map((s, i) => `<li><span class="step-n">0${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.body.split('. ')[0])}.</p></div></li>`).join('')}</ol>
</div></section>
${faq.html}
${leadForm({ heading: 'Tell us the offer and the capacity', interest: '' })}`;
  emit(
    '/',
    page({
      path: '/',
      title: 'Swyft | Outsourced Door-to-Door Sales for Home Services',
      description: 'Swyft recruits, trains, houses, and manages door-to-door sales teams for home-service and telecom companies. You pay a revenue share per account.',
      body,
      schema: [
        faq.schema,
        serviceSchema({
          url: '/',
          name: 'Outsourced door-to-door sales teams',
          serviceType: 'Door-to-door sales',
          description: business.oneLiner,
          audience: 'Home-service and telecom companies that sell door to door',
        }),
      ],
    }),
    { priority: '1.0', group: 'Main', title: 'Home' }
  );
}

// ---------- Industries index ----------
{
  const bc = breadcrumbs([['Industries', '/industries/']]);
  const cards = industries
    .map((i, n) => card({ href: i.url, num: String(n + 1).padStart(2, '0'), kicker: i.lead ? 'Lead industry' : 'Industry', title: esc(i.nav), body: esc(indContent[i.key].intro) }))
    .join('');
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'Industries',
    h1: 'Door-to-door teams, by the work you fulfill.',
    answer: 'Swyft runs outsourced door-to-door teams in nine industries: exteriors (roofing, roof repair, siding, windows, gutters, gutter guards), window cleaning, pest control, lawn care, fiber internet for companies that sell AT&T fiber and wireless, interior home improvement (bath remodels, kitchen remodels, doors), home security systems, water treatment and filtration, and HVAC. Each page is written for that trade. The commercial model on every one of them is a <a href="/partner/">marketing deal</a> with no published percentage.',
  })}
<section class="section wrap"><div class="grid3">${cards}</div></section>
${prose(`<h2>Adding an industry later</h2><p>The site is built from a list in the codebase plus one content file per industry. Solar, energy, insurance, and anything else not in the nine are not offered on this site. If a new trade is approved, it gets its own page, its own homepage section, its own questions, and its own service schema. It does not get a find-and-replace of an existing page.</p>`)}
${leadForm()}`;
  emit(
    '/industries/',
    page({
      path: '/industries/',
      title: 'Door-to-Door Sales by Industry | Swyft',
      description: 'Outsourced D2D teams for exteriors, window cleaning, pest control, lawn care, fiber, interior remodels, home security, water treatment, and HVAC.',
      body,
      schema: [bc.schema, { '@type': 'CollectionPage', name: 'Industries Swyft runs door-to-door teams for', url: abs('/industries/'), hasPart: industries.map((i) => ({ '@type': 'WebPage', name: i.nav, url: abs(i.url) })) }],
    }),
    { priority: '0.9', group: 'Main', title: 'Industries' }
  );
}

// ---------- Industry pages ----------
for (const i of industries) {
  const c = indContent[i.key];
  const bc = breadcrumbs([['Industries', '/industries/'], [i.nav, i.url]]);
  const faq = faqSection(c.faqs, c.faqHeading);
  const offers = `<section class="section wrap" aria-labelledby="offers-h"><h2 id="offers-h">What the team is trained to sell</h2><div class="grid3">${c.offers
    .map((o) => `<article class="tile"><h3>${esc(o.title)}</h3><p>${esc(o.body)}</p></article>`)
    .join('')}</div></section>`;
  const others = industries.filter((x) => x.key !== i.key).map((x) => `<li><a href="${x.url}">${esc(x.nav)}</a></li>`).join('');
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: i.lead ? 'Lead industry' : 'Industry',
    h1: esc(c.h1),
    answer: c.answer,
    intro: c.intro,
    primary: cta('/partner/', 'Partner with us'),
    secondary: cta('/how-it-works/', 'How the team runs', { ghost: true }),
  })}
${offers}
${prose(c.sections)}
${faq.html}
<section class="section wrap"><h2>Other industries</h2><ul class="chips">${others}</ul></section>
${leadForm({ heading: c.formHeading, interest: c.interest })}`;
  emit(
    i.url,
    page({
      path: i.url,
      title: c.title,
      description: c.description,
      body,
      schema: [
        bc.schema,
        serviceSchema({
          url: i.url,
          name: `Door-to-door sales for ${i.nav.toLowerCase()}`,
          serviceType: 'Outsourced door-to-door sales',
          description: c.description,
          audience: c.audience || `${i.name} companies`,
          offers: c.offers,
        }),
        faq.schema,
      ],
    }),
    { priority: i.lead ? '0.9' : '0.8', group: 'Industries', title: i.nav }
  );
}

// ---------- How it works ----------
{
  const bc = breadcrumbs([['How it works', '/how-it-works/']]);
  const faq = faqSection(howItWorks.faqs, 'Questions about running the team');
  const howTo = {
    '@type': 'HowTo',
    name: 'How Swyft runs a door-to-door sales team',
    description: howItWorks.description,
    step: howItWorks.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body, url: abs('/how-it-works/') + `#step-${i + 1}` })),
  };
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'How it works',
    h1: howItWorks.h1,
    answer: howItWorks.answer,
    primary: cta('/partner/', 'See the marketing deal'),
    secondary: cta('/contact/', 'Talk about a market', { ghost: true }),
  })}
<section class="section wrap" aria-labelledby="run-h"><h2 id="run-h" class="sr-only">The five steps</h2><ol class="steps steps-full">${howItWorks.steps
    .map((s, i) => `<li id="step-${i + 1}"><span class="step-n">0${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${s.body}</p></div></li>`)
    .join('')}</ol></section>
${prose(`<h2>Housing is part of deploy, not an extra you arrange</h2>
<p>Reps who drive in for a day and leave do not work a market the way a housed team does. Swyft puts the team up for the run. You do not sign the lease, you do not set house rules, and we do not publish addresses. If a market cannot be housed, it is not a market we pretend we can open.</p>
<h2>Your paperwork is the training manual</h2>
<p>The price, the scope, and the cancellation language come from you. A rep who cannot say them the way they are written is not finished with training. Local solicitation rules vary. This page is not legal advice, and Swyft does not claim to be your permit office. Have counsel review the agreement the rep is asking a homeowner to sign.</p>
<h2>The report</h2>
<p>You should be able to see activity and sold accounts by rep, weekly, without calling the manager to ask who worked. The columns are set in the agreement. A sample is not on the site yet. ${ph('sample weekly scorecard, column names only')}</p>`)}
${faq.html}
${leadForm({ heading: 'Ask how a team would run in your market' })}`;
  emit(
    '/how-it-works/',
    page({
      path: '/how-it-works/',
      title: howItWorks.title,
      description: howItWorks.description,
      body,
      schema: [bc.schema, howTo, faq.schema, serviceSchema({
        url: '/how-it-works/',
        name: 'Door-to-door sales team management',
        serviceType: 'Door-to-door sales operations',
        description: howItWorks.description,
        audience: 'Home-service and telecom companies that sell door to door',
      })],
    }),
    { priority: '0.9', group: 'Main', title: 'How it works' }
  );
}

// ---------- Partner ----------
{
  const bc = breadcrumbs([['Partner with us', '/partner/']]);
  const faq = faqSection(partner.faqs, 'Questions about the marketing deal');
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'For companies',
    h1: partner.h1,
    answer: partner.answer,
    primary: cta('#lead-form', 'Start the conversation'),
    secondary: cta('/how-it-works/', 'How the team runs', { ghost: true }),
  })}
<section class="section wrap" aria-labelledby="split-h">
  <div class="section-head"><h2 id="split-h">The split of the work</h2><p>You sell through a team you do not employ. Swyft is paid when an account qualifies. The qualifier and the share are both in the agreement.</p></div>
  <div class="deal">
    <article><h3>Stays with you</h3><ul>
      <li>Product, price, and promotions you have actually approved</li>
      <li>Contracts, credit apps, and cancellation language</li>
      <li>Fulfillment: install, route, activation, monitoring, or whatever your trade delivers</li>
      <li>The customer relationship after the sale</li>
      <li>How many accounts you can take this month</li>
    </ul></article>
    <article><h3>Sits with Swyft</h3><ul>
      <li>Finding the reps</li>
      <li>Training them on your offer and your refusals</li>
      <li>Housing the team in the market</li>
      <li>A manager on the doors, not in another city</li>
      <li>A weekly report of activity and sold accounts</li>
    </ul></article>
  </div>
</section>
${prose(`<h2>What “revenue share per account” means here</h2>
<p>You do not put the reps on payroll. You do not pay Swyft a retainer that pretends to be the whole deal, and you do not get a rate card from this website. When an account sells and it meets the standard the marketing agreement names, you pay Swyft a share of that account. Call it a commission or a revenue share. It is the same shape: pay follows the account, and the account is yours.</p>
<p>The standard is not the same in every industry. An installed roof, a started pest agreement, a sat kitchen consultation, and an activated fiber line are different events. The agreement picks the event. It also picks the percentage. We will not print a number that implies a roof and a route are the same deal.</p>
<h2>What we need before a team is housed</h2>
<p>The offer in writing. Prices the rep is allowed to say. Paperwork a person can read on a porch. Someone at your company who can answer product questions the same day. And a capacity number you will not resent: how many jobs, routes, sits, or activations you can fulfill. A team that sells past that number is not a win.</p>
<h2>What this is not</h2>
<p>It is not a shared-lead program. Reps do not knock for a pool of companies and auction the homeowner. They sell your service. It is not a request that you build a recruiting department and “partner” on the ads. Recruiting is the part you are hiring Swyft to stop doing.</p>
<p>The industries we will have this conversation about are the nine on the <a href="/industries/">industries index</a>. If yours is not there, say so anyway. We would rather tell you no than stretch a page to fit a trade we do not run.</p>`)}
${faq.html}
${leadForm({
    heading: 'Tell us what you want sold',
    sub: 'The useful note is the product, the market, and how much you can fulfill. A rate is not quoted from this form.',
    note: 'Colin reads these. Email colin@swyft-hq.com if you would rather attach paperwork.',
  })}`;
  emit(
    '/partner/',
    page({
      path: '/partner/',
      title: partner.title,
      description: partner.description,
      body,
      schema: [bc.schema, faq.schema, serviceSchema({
        url: '/partner/',
        name: 'Door-to-door marketing deal',
        serviceType: 'Outsourced door-to-door sales on a revenue share',
        description: partner.description,
        audience: 'Owners of home-service and telecom companies',
      })],
    }),
    { priority: '0.9', group: 'Main', title: 'Partner with us' }
  );
}

// ---------- Careers ----------
{
  const bc = breadcrumbs([['Careers', '/careers/']]);
  const faq = faqSection(careers.faqs, 'Questions from people who want to sell');
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'Careers',
    h1: careers.h1,
    answer: careers.answer,
    primary: cta('mailto:colin@swyft-hq.com?subject=Rep%20application', 'Email a rep application'),
    secondary: cta('/how-it-works/', 'How teams run', { ghost: true }),
  })}
${prose(`<h2>The work</h2>
<p>You knock. You sell one client’s offer, the one you were trained on, at that client’s prices, on that client’s paperwork. You live in housing Swyft arranges for the run. A manager works the market with you. The trades are the ones on this site: exteriors, window cleaning, pest control, lawn care, fiber and wireless, baths and kitchens and doors, home security, water treatment, and HVAC. You do not pick a different product because the door would have been an easier yes.</p>
<h2>Apply</h2>
<p>There is no recruiting site linked from this repo yet. ${ph('recruiting application URL')}</p>
<p>Until that link exists, email <a href="mailto:${business.email}?subject=Rep%20application">${business.email}</a> with the subject “Rep application”, the city you can work, and which of the trades you have sold, if any. Do not send a rate expectation as if this page listed one. It does not.</p>
<h2>Owners who landed here</h2>
<p>If you run a company and you want a team, you want <a href="/partner/">partner with us</a>, not this page. The form below is for that conversation too. Reps should use the email above.</p>`)}
${faq.html}
${leadForm({
    heading: 'Company owners: ask about a team',
    sub: 'Rep applicants: email colin@swyft-hq.com with the subject “Rep application”. This form is built for companies.',
    note: 'Pay for reps is not collected here and is not published on the site.',
    messagePlaceholder: 'Company owners: what you sell and where',
  })}`;
  emit(
    '/careers/',
    page({
      path: '/careers/',
      title: careers.title,
      description: careers.description,
      body,
      schema: [bc.schema, faq.schema],
    }),
    { priority: '0.6', group: 'Company', title: 'Careers' }
  );
}

// ---------- About ----------
{
  const bc = breadcrumbs([['About', '/about/']]);
  const body = `${hero({ crumbs: bc.html, eyebrowText: 'About', h1: about.h1, answer: about.answer })}
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
    knowsAbout: ['Door-to-door sales', 'Roofing sales', 'Home service sales'],
  };
  emit(
    '/about/',
    page({
      path: '/about/',
      title: about.title,
      description: about.description,
      body,
      ogType: 'profile',
      schema: [bc.schema, person, { '@type': 'AboutPage', url: abs('/about/'), mainEntity: { '@id': abs('/about/#colin-speer') } }],
    }),
    { priority: '0.6', group: 'Company', title: 'About' }
  );
}

// ---------- Contact ----------
{
  const bc = breadcrumbs([['Contact', '/contact/']]);
  const body = `${hero({
    crumbs: bc.html,
    eyebrowText: 'Contact',
    h1: 'Tell us what you sell at the door.',
    answer: `Email <a href="mailto:${business.email}">${business.email}</a> or call <a href="tel:${business.phoneE164}">${business.phone}</a>. The HighLevel form is not embedded yet. The block below is the slot for it. Until that embed is pasted in, use the email form under it.`,
  })}
${highlevelSlot()}
${leadForm({ heading: 'Email form, until the embed is live' })}`;
  emit(
    '/contact/',
    page({
      path: '/contact/',
      title: 'Contact Swyft | Start a Door-to-Door Marketing Deal',
      description: `Talk with Swyft about a door-to-door team. Email ${business.email} or call ${business.phone}. The HighLevel form embed is still a placeholder.`,
      body,
      schema: [bc.schema, { '@type': 'ContactPage', url: abs('/contact/'), about: orgRef() }],
    }),
    { priority: '0.7', group: 'Company', title: 'Contact' }
  );
}

// ---------- Swyft International (kept from the existing page) ----------
{
  const { bc, faq, body, title, description } = internationalParts();
  const service = {
    '@type': 'Service',
    '@id': abs('/international/') + '#service',
    name: 'Swyft International',
    serviceType: 'Offshore talent placement',
    description,
    url: abs('/international/'),
    provider: orgRef(),
    brand: { '@type': 'Brand', name: 'Swyft International' },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: { '@type': 'BusinessAudience', name: 'Employers hiring remote offshore talent' },
  };
  emit(
    '/international/',
    page({
      path: '/international/',
      title,
      description,
      body,
      ogImageAlt: 'Swyft International: offshore talent placement on a 33% success fee',
      schema: [bc.schema, service, faq.schema],
    }),
    { priority: '0.5', group: 'Company', title: 'Swyft International' }
  );
}

// ---------- Privacy / Terms ----------
for (const [path, name, h1, desc, html, ans] of [
  ['/privacy/', 'Privacy policy', 'Privacy policy', `How ${business.legalName} handles information submitted through swyft-hq.com.`, privacyBody, `Swyft uses what you send through the contact form or by email only to respond. We do not sell personal information. The contact page reserves a HighLevel embed that is not installed yet. Questions: ${business.email}.`],
  ['/terms/', 'Terms of service', 'Terms of service', `Terms for using the swyft-hq.com website, operated by ${business.legalName}.`, termsBody, 'The site describes Swyft’s door-to-door teams and a marketing deal in general. It is not a quote, not a commission rate, and not the agreement. Questions: colin@swyft-hq.com.'],
]) {
  const bc = breadcrumbs([[name, path]]);
  const body = `${hero({ crumbs: bc.html, h1, answer: ans })}${prose(html)}${leadForm()}`;
  emit(path, page({ path, title: `${name} | Swyft`, description: desc, body, schema: [bc.schema] }), { priority: '0.3', group: 'Company', title: name });
}

// ---------- HTML sitemap ----------
{
  const bc = breadcrumbs([['Sitemap', '/sitemap/']]);
  const all = [...pages, { path: '/sitemap/', title: 'HTML sitemap', group: 'Company' }];
  const groups = ['Main', 'Industries', 'Company'];
  const body = `${hero({ crumbs: bc.html, h1: 'Sitemap', answer: 'Every indexable page on swyft-hq.com. The same list is at <a href="/sitemap.xml">sitemap.xml</a>.' })}
<section class="section wrap sitemap-cols">${groups
    .map((g) => `<div><h2>${g}</h2><ul>${all.filter((p) => p.group === g).map((p) => `<li><a href="${p.path}">${esc(p.title)}</a></li>`).join('')}</ul></div>`)
    .join('')}</section>${leadForm()}`;
  emit('/sitemap/', page({ path: '/sitemap/', title: 'HTML Sitemap | Swyft', description: 'All pages on swyft-hq.com: industries, how the door-to-door team works, the marketing deal, careers, and company pages.', body, schema: [bc.schema] }), { priority: '0.3', group: 'Company', title: 'HTML sitemap' });
}

const notFound = page({
  path: '/404.html',
  title: 'Page not found | Swyft',
  description: 'That page is not on swyft-hq.com.',
  noindex: true,
  body: `${hero({ h1: 'Page not found', answer: 'That URL is not on this site. Try <a href="/industries/">industries</a>, <a href="/partner/">partner with us</a>, <a href="/how-it-works/">how it works</a>, or the <a href="/sitemap/">sitemap</a>.' })}${leadForm()}`,
});

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

const sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${p.lastmod ?? BUILD_DATE}</lastmod><priority>${p.priority ?? '0.5'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(OUT, 'sitemap.xml'), sm);

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Amazonbot', 'meta-externalagent', 'DuckAssistBot', 'MistralAI-User'];
const robots = `# robots.txt for ${business.domain}
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${abs('/sitemap.xml')}
`;
await writeFile(join(OUT, 'robots.txt'), robots);

const llms = `# Swyft

> ${business.oneLiner}

Key facts:
- Brand: Swyft
- Legal name: ${business.legalName}
- Led by: ${business.founder}
- Model: marketing deal. The client pays a revenue share (commission) per account. Swyft recruits, trains, houses, and manages the door-to-door team. No commission percentage is published on the website.
- Sells for: home-service and telecom companies that already sell door to door
- Area: United States
- Email: ${business.email}
- Phone: ${business.phone}
- Website: ${abs('/')}

## Industries
${industries.map((i) => `- [${i.nav}](${abs(i.url)}): ${indContent[i.key].description}`).join('\n')}

## Company pages
- [How it works](${abs('/how-it-works/')}): recruit, train, deploy (including housing), manage, report
- [Partner with us](${abs('/partner/')}): marketing-deal explanation, no published rate
- [Careers](${abs('/careers/')}): join a Swyft door-to-door team. Application URL is not published yet.
- [About](${abs('/about/')})
- [Contact](${abs('/contact/')}): HighLevel form embed is a placeholder until pasted in
- [Privacy](${abs('/privacy/')})
- [Terms](${abs('/terms/')})

## Swyft International
${internationalLlms}

## Not on this site
- No client names, logos, testimonials, or performance numbers. Slots are marked [CLIENT LOGO] and [STAT].
- No published commission percentage for the door-to-door marketing deal.
- Industries not listed above are not offered here.
`;
await writeFile(join(OUT, 'llms.txt'), llms);

console.log(`Built ${pages.length} pages (+404) → dist/  SITE_URL=${SITE_URL} BASE_PATH=${BASE_PATH || '(none)'}`);
