// Swyft International page. Sample people below are fictional. Do not replace them with real candidates.
import { abs, answerBlock, breadcrumbs, cta, eyebrow, esc, faqSection, leadForm } from './lib.mjs';

const EXT = 'https://swyftinternational.com';
const external = { external: true };

export const internationalTitle = 'Swyft International | Offshore Talent Placement, 33% Success Fee';
export const internationalDescription =
  'Offshore talent placement: a 33% success fee on first-year salary. You pay the salary directly. Existing candidate database, $500 search deposit, 90-day free replacement.';

const answer = `Swyft International places offshore talent for employers. You pay a <strong>33% success fee</strong> on the hire's first-year salary, and you <strong>pay the salary directly</strong>. We already have a candidate database. If nobody in it fits, a <strong>$500 deposit</strong> (credited toward the fee) starts a new search. Every placement includes a <strong>90-day free replacement guarantee</strong>. Start on <a href="${EXT}" target="_blank" rel="noopener noreferrer">swyftinternational.com</a>.`;

const candidates = [
  {
    name: 'Amira Hassan',
    role: 'Appointment setter',
    country: 'Egypt',
    pay: '$1,500',
    start: 'Jan 11, 2027',
    initials: 'AH',
    avatar: 'teal',
    checks: [
      'Works a set dial block on US Eastern hours',
      'Books a confirmed time on the calendar',
      'Has set appointments for a home-service offer',
    ],
    skills: ['Cold calling', 'HubSpot', 'Google Calendar'],
  },
  {
    name: 'Andre Castillo',
    role: 'Customer support',
    country: 'Belize',
    pay: '$1,600',
    start: 'Jan 18, 2027',
    initials: 'AC',
    avatar: 'blue',
    checks: [
      'Covers phone, chat, and email on US Central hours',
      'Logs the ticket before the conversation ends',
      'Escalates with what the customer actually asked',
    ],
    skills: ['Zendesk', 'Phone support', 'Live chat'],
  },
  {
    name: 'Youssef Nabil',
    role: 'Bookkeeper',
    country: 'Egypt',
    pay: '$1,800',
    start: 'Feb 1, 2027',
    initials: 'YN',
    avatar: 'yellow',
    checks: [
      'Closes the month in QuickBooks on a set calendar',
      'Reconciles the operating account before the report',
      'Writes the summary so an owner can read it',
    ],
    skills: ['QuickBooks', 'Reconciliation', 'Excel'],
  },
  {
    name: 'Keisha Palacio',
    role: 'Virtual assistant',
    country: 'Belize',
    pay: '$1,350',
    start: 'Feb 8, 2027',
    initials: 'KP',
    avatar: 'paper',
    checks: [
      'Runs inbox and calendar from a written priority list',
      'Builds the next day\'s route sheet for a field crew',
      'Follows up with homeowners who missed a visit',
    ],
    skills: ['Google Workspace', 'Scheduling', 'Follow-up'],
  },
];

const levels = [
  {
    tone: 'green',
    level: 'Green',
    title: 'Straightforward remote seats',
    body: 'Clear scope, done from a desk, no US license. These are the roles to match from the database first.',
    examples: ['Virtual assistant', 'Appointment setter', 'Customer support', 'Bookkeeper', 'Dispatcher'],
  },
  {
    tone: 'yellow',
    level: 'Yellow',
    title: 'Possible, usually a new search',
    body: 'The work can be remote, and it is specialized enough that the database may not have a fit. This is when the $500 deposit starts a search.',
    examples: ['Niche developer', 'Ads manager', 'Senior closer', 'Bilingual beyond English'],
  },
  {
    tone: 'red',
    level: 'Red',
    title: 'Not an offshore seat',
    body: 'The work has to happen in person, on a route, or under a US license. Door-to-door selling stays with <a href="/how-it-works/">Swyft\'s door-to-door teams</a>.',
    examples: ['Field technician', 'On-site sales rep', 'Licensed applicator', 'Licensed trades'],
  },
];

const faqs = [
  {
    q: 'What does Swyft International cost?',
    a: 'You pay a 33% success fee on the hire\'s first-year salary, and only when you hire. You pay the salary itself directly to the hire. If nobody in the database fits, a new search starts with a $500 deposit, and that deposit is credited toward the success fee.',
  },
  {
    q: 'Who pays the hire\'s salary?',
    a: 'You do, directly. The 33% is the placement fee on first-year salary, charged separately from that salary.',
  },
  {
    q: 'What if nobody in the database fits?',
    a: 'A new search starts with a $500 deposit. When you hire from that search, the deposit is credited toward the 33% success fee.',
  },
  {
    q: 'What does the 90-day free replacement cover?',
    a: 'If the hire does not work out within 90 days, we replace them at no additional success fee. You still pay salary directly to the person in the seat. The placement agreement has the exact terms.',
  },
  {
    q: 'Which roles are green, yellow, or red?',
    a: 'Green roles are common remote seats such as assistants, appointment setters, support, and bookkeeping. Yellow roles are specialized and usually need the $500 search. Red roles have to be done in person or under a US license, and those are not placed offshore.',
  },
  {
    q: 'Are the Egypt and Belize candidate cards real people?',
    a: 'No. Those cards are made-up samples of the profile format: country, monthly pay, start date, three checks, and skill pills. The avatars are placeholders, not photos. They are not current candidates and not pay quotes.',
  },
];

const candidateCard = (c) => `<article class="intl-candidate">
  <div class="intl-candidate-top">
    <div class="intl-avatar intl-av-${c.avatar}" aria-hidden="true">${esc(c.initials)}</div>
    <div>
      <p class="intl-sample">Fictional sample</p>
      <h3>${esc(c.name)}</h3>
      <p class="intl-role">${esc(c.role)}</p>
    </div>
  </div>
  <dl class="intl-meta">
    <div><dt>Country</dt><dd class="country">${esc(c.country)}</dd></div>
    <div><dt>Monthly pay</dt><dd class="pay">${esc(c.pay)}</dd></div>
    <div><dt>Start date</dt><dd>${esc(c.start)}</dd></div>
  </dl>
  <ul class="intl-checks">${c.checks.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
  <ul class="intl-pills" aria-label="Skills">${c.skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
</article>`;

const howSteps = [
  ['Tell us the seat', 'Role, tools, hours, and the pay range you have in mind.'],
  ['Review the database first', 'We already have candidates. You look at profiles and talk to the people who fit. The $500 deposit comes only if none of them do.'],
  ['Deposit $500 to start a new search', 'That deposit opens the search, and it is credited toward the success fee when you hire.'],
  ['Hire and pay the salary directly', 'You choose the person and you pay their salary. The placement fee is 33% of first-year salary.'],
  ['Use the 90-day guarantee', 'If the hire does not work out in the first 90 days, replacement is free of another success fee.'],
];

export function internationalParts() {
  const bc = breadcrumbs([['Swyft International', '/international/']]);
  const faq = faqSection(faqs, 'Questions about Swyft International');
  const body = `<section class="hero hero-sub hero-intl">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    ${bc.html}
    ${eyebrow('Swyft International')}
    <h1>Offshore talent, <span class="grad">on a success fee.</span></h1>
    ${answerBlock(answer)}
    <p class="lede">Remote seats for the work that does not need a truck: appointment setting, customer support, bookkeeping, and admin. If the job has to be done at the door, that stays with <a href="/how-it-works/">Swyft's door-to-door teams</a>.</p>
    <div class="cta-row">${cta(EXT, 'Visit Swyft International', external)}${cta('#candidates', 'See sample candidates', { ghost: true })}</div>
  </div>
</section>
<div class="wrap">${`<div class="stats">${[
    ['33%', 'success fee on first-year salary'],
    ['$500', 'deposit only to start a new search'],
    ['90 days', 'free replacement guarantee'],
    ['Direct', 'you pay the salary'],
  ].map(([v, l]) => `<div><div class="stat-v">${esc(v)}</div><div class="stat-l">${esc(l)}</div></div>`).join('')}</div>`}</div>
<section class="band" id="how" aria-labelledby="how-h"><div class="wrap split">
  <div><h2 id="how-h">How a hire happens</h2><p class="muted">Database first. A deposit only when we have to go find someone new. You pay the salary either way.</p></div>
  <ol class="steps">${howSteps.map(([title, text], i) => `<li><span class="step-n">0${i + 1}</span><div><h3>${esc(title)}</h3><p>${text}</p></div></li>`).join('')}</ol>
</div></section>
<section class="section wrap" aria-labelledby="db-h">
  <div class="intl-paper">
    <p class="intl-kicker"><i aria-hidden="true"></i>Candidate database</p>
    <h2 id="db-h">We already have people to show you.</h2>
    <p>Start with the candidate database. You review who fits and talk to them before any deposit. You pay the salary directly when you hire, plus the 33% success fee on first-year salary.</p>
    <p>When nobody in the database fits, a $500 deposit starts a new search. That $500 is credited toward the fee.</p>
    <div class="cta-row">${cta('#candidates', 'See sample profiles', { ghost: true })}</div>
  </div>
</section>
<section class="section wrap" id="candidates" aria-labelledby="cand-h">
  <div class="section-head">
    <h2 id="cand-h">Sample candidate cards</h2>
    <p>Made-up profiles from Egypt and Belize. Not real people. Placeholder avatars, not photos. Not open roles and not a rate card.</p>
  </div>
  <div class="intl-grid">${candidates.map(candidateCard).join('')}</div>
</section>
<section class="section wrap" id="pricing" aria-labelledby="price-h">
  <div class="section-head"><h2 id="price-h">Pricing</h2><p>One success fee when you hire. The salary is yours to pay. The deposit is only for a search we still have to run.</p></div>
  <div class="grid3">
    <div class="tile intl-price"><p class="intl-figure">33%</p><h3>Success fee</h3><p>Of the hire's first-year salary, charged when you hire.</p></div>
    <div class="tile intl-price"><p class="intl-figure">Direct</p><h3>Salary</h3><p>You pay the hire directly. The 33% success fee is a separate placement charge.</p></div>
    <div class="tile intl-price"><p class="intl-figure">$500</p><h3>Search deposit</h3><p>Only if the database has no fit. Credited toward the 33% fee when you hire.</p></div>
  </div>
  <p class="muted intl-example">Example, not a quote: a person paid $2,000 a month earns $24,000 in the first year. The success fee is 33% of that, $7,920. A $500 search deposit, if you paid one, comes off that fee.</p>
</section>
<section class="band" id="guarantee" aria-labelledby="guar-h"><div class="wrap intl-guarantee">
  <p class="intl-figure">90<span>days</span></p>
  <div>
    <h2 id="guar-h">Free replacement guarantee</h2>
    <p>If the hire does not work out within 90 days, we replace them and we do not charge a second success fee. You keep paying salary directly to the person in the seat. The placement agreement states the exact terms.</p>
  </div>
</div></section>
<section class="section wrap" id="fit" aria-labelledby="fit-h">
  <div class="section-head"><h2 id="fit-h">Green, yellow, and red roles</h2><p>A quick read on whether the seat belongs in the database, in a paid search, or not offshore at all.</p></div>
  <div class="intl-diff">${levels.map((lvl) => `<article class="intl-${lvl.tone}">
    <p class="intl-level"><i aria-hidden="true"></i>${esc(lvl.level)}</p>
    <h3>${esc(lvl.title)}</h3>
    <p>${lvl.body}</p>
    <ul class="intl-examples">${lvl.examples.map((ex) => `<li>${esc(ex)}</li>`).join('')}</ul>
  </article>`).join('')}</div>
</section>
${faq.html}
<section class="section wrap" aria-labelledby="visit-h">
  <div class="intl-visit">
    <div>
      ${eyebrow('Standalone site')}
      <h2 id="visit-h">Continue on swyftinternational.com</h2>
      <p>This page is the offer, on swyft-hq.com. The separate Swyft International site is where you start a search.</p>
    </div>
    <div class="cta-row">${cta(EXT, 'Visit Swyft International', external)}${cta('#lead-form', 'Ask on this site', { ghost: true })}</div>
  </div>
</section>
${leadForm({
  heading: 'Talk through a role',
  sub: `Tell us the seat, the hours, and the pay range. Colin and the team reply within one business day. Or start on <a href="${EXT}" target="_blank" rel="noopener noreferrer">swyftinternational.com</a>.`,
  interest: 'Offshore talent placement (Swyft International)',
  extraOptions: ['Offshore talent placement (Swyft International)'],
  note: 'A 20-minute call on the seat, the database, and whether the role is green, yellow, or red.',
  messagePlaceholder: 'The role, the hours, and the pay range',
})}`;
  return { bc, faq, body, title: internationalTitle, description: internationalDescription };
}

export const internationalLlms = `- [Offshore talent placement](${abs('/international/')}): Employers pay a 33% success fee on the hire's first-year salary and pay the salary directly. Existing candidate database. A $500 deposit, credited toward the fee, starts a new search if nobody fits. 90-day free replacement guarantee. Standalone site: ${EXT}`;
