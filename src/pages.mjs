import { business } from './data.mjs';
import { ph } from './lib.mjs';

export const homeFaqs = [
  {
    q: 'What does Swyft actually do?',
    a: 'Swyft recruits, trains, houses, and manages door-to-door sales teams that sell a client company’s service. The client keeps the customer and does the install or the route work. Swyft runs the people at the door. The commercial terms are a <a href="/partner/">marketing deal</a>: a revenue share per account, with no rate published on this site.',
  },
  {
    q: 'Do I have to hire the reps?',
    a: 'No. Hiring, housing, and day-to-day management of the door team sit with Swyft. You still set the price, the paperwork, and the work your crews can fulfill. Read the five steps on <a href="/how-it-works/">how it works</a>.',
  },
  {
    q: 'Which industries do you run teams for?',
    a: 'Exteriors (roofing, roof repair, siding, windows, gutters, gutter guards), window cleaning, pest control, lawn care, fiber internet for companies that sell AT&T fiber and wireless, interior home improvement (bath remodels, kitchen remodels, doors), home security systems, water treatment and filtration, and HVAC. Each has its own page from the <a href="/industries/">industries index</a>.',
  },
  {
    q: 'Where is the commission rate?',
    a: 'It is not on this website. The share is set in the marketing agreement for that offer and that market. Two products do not share a rate, and we will not print a number that pretends they do.',
  },
  {
    q: 'Who handles housing and solicitation permits?',
    a: 'Swyft houses the team in the market. Before the first door, deploy includes a check of that city’s solicitation rules. If a permit is required, it is handled before anyone knocks. This site is not legal advice. Your counsel still reviews the contract the homeowner signs.',
  },
  {
    q: 'Who do I contact?',
    a: `Email <a href="mailto:${business.email}">${business.email}</a> or call <a href="tel:${business.phoneE164}">${business.phone}</a>. The <a href="/contact/#lead-form">contact page</a> has a short form.`,
  },
];

export const howItWorks = {
  title: 'How Swyft Runs a Door-to-Door Team | Recruit to Report',
  description: 'Recruit, train, deploy, manage, and report. How Swyft houses a door-to-door sales team that sells your service on your paperwork.',
  h1: 'Recruit, train, deploy, manage, report.',
  answer: `Swyft runs a door-to-door sales team in five steps: <strong>recruit</strong> the reps, <strong>train</strong> them on your offer and your paperwork, <strong>deploy</strong> them housed in the market, <strong>manage</strong> them in the field, and <strong>report</strong> activity and sold accounts. You do not hire the team. You pay a revenue share per account under a <a href="/partner/">marketing deal</a>. The rate is in the agreement, not on this page.`,
  steps: [
    {
      title: 'Recruit',
      body: 'Swyft finds the people who will knock. You do not run ads for reps, sit the interviews, or keep a bench warm between seasons. We recruit for the offer you actually sell, because a person who can talk a quarterly pest plan is not automatically the person who can book a kitchen consultation. If a market cannot be staffed, we say so before a team is promised.',
    },
    {
      title: 'Train',
      body: 'Training is on your price, your paperwork, and the sentences you do not want said. Reps learn the difference between what the agreement includes and what it does not. They practice the objections that show up in your trade, then they hear it again in the field. A script that contradicts your contract is a script we will not run.',
    },
    {
      title: 'Deploy',
      body: 'Deploy means the team is in the market, housed by Swyft, and knocking the territory you can fulfill. Housing is part of the model so you are not a landlord and the reps are not commuting in from a city away. Territory follows your capacity and, where it matters, the routes or install calendar you already have. We do not publish a start date. It depends on the market, the offer, and housing.',
    },
    {
      title: 'Manage',
      body: 'A manager is in the market with the team. The work is coaching, ride-alongs, and pulling someone off a door who is freelancing the offer. You get a point of contact. You do not run the morning meeting. Management is what keeps a housed team from becoming a group of strangers in your shirts, saying things you would not sign.',
    },
    {
      title: 'Report',
      body: 'You get a weekly picture of what the team did and what sold. Door teams are usually tracked on doors, conversations, and sold accounts. The columns in your report are the ones the agreement names, not a generic dashboard. A sample scorecard is not published here yet.',
    },
  ],
  faqs: [
    {
      q: 'Do the reps work for my company?',
      a: 'They sell your service, on your paperwork, at your prices. Recruiting, housing, and day-to-day management sit with Swyft. The marketing agreement is the document that names the relationship. This page is not that document.',
    },
    {
      q: 'Who houses the team?',
      a: 'Swyft houses the team in the market for the run. You do not lease the house and you do not manage the roommates. We do not publish addresses or a housing stipend.',
    },
    {
      q: 'Can the team sell more than my crews can install or service?',
      a: 'It should not. Before anyone knocks, we want the number of accounts you can actually fulfill. A sold job you cannot deliver is a review with your name on it. The team is sized to that capacity. We do not publish a rep-to-crew ratio.',
    },
    {
      q: 'What shows up on the weekly report?',
      a: 'Activity and sold accounts, in the columns the agreement sets. A sample scorecard is not published. The empty slot is on this page.',
    },
    {
      q: 'How fast can a team be in a market?',
      a: 'We do not publish a number of days. Recruiting, housing, and your paperwork all have to be ready. Ask on a call and we will talk about that market specifically.',
    },
  ],
};

export const partner = {
  title: 'Partner with Swyft | Marketing-Deal Door-to-Door Sales',
  description: 'A marketing deal for home-service and telecom owners. Swyft runs the door-to-door team. You pay a revenue share per account. No rate is published here.',
  h1: 'You want the accounts. You do not want the sales force.',
  answer: `A Swyft <strong>marketing deal</strong> means we recruit, train, house, and manage a door-to-door team that sells your service. You keep the customer and do the work. You pay Swyft a <strong>revenue share, a commission per account</strong>, under a written agreement. <strong>No percentage is published on this site.</strong> The rate depends on the product, the ticket, and the market. Start with the industry you sell, or <a href="/contact/">contact Colin</a> at <a href="mailto:${business.email}">${business.email}</a>.`,
  faqs: [
    {
      q: 'What is a marketing deal?',
      a: 'You do not hire the reps and you do not payroll them. Swyft fields the team. When an account sells and it meets the standard written in the agreement, you pay Swyft a share of that account. The customer relationship stays with you.',
    },
    {
      q: 'Why is there no percentage on this page?',
      a: 'A roof replacement, a pest route, and an activated fiber line are not the same sale. Publishing one rate would be a fiction. The share is negotiated for the offer in front of us and written into the marketing agreement.',
    },
    {
      q: 'What counts as an account?',
      a: 'The agreement defines it. For one company it is an installed job. For another it is a started service agreement. For a telecom offer it is the account that qualifies under your program rules. We do not use one definition for every industry.',
    },
    {
      q: 'Who owns the customer?',
      a: 'You do. Reps sell your service on your paperwork. Swyft is not a lead marketplace, and the account is not resold to another company.',
    },
    {
      q: 'What do you need from us before anyone knocks?',
      a: 'The offer, the price, the paperwork, a person who can answer product questions, and an honest number for how much work you can fulfill. If the paperwork is not something you would want read aloud on a porch, it is not ready.',
    },
    {
      q: 'Is this a long-term contract with a posted term?',
      a: 'The term lives in the marketing agreement, not on the website. We do not publish a length here.',
    },
    {
      q: 'We already have a small in-house canvassing crew. Can you still run a team?',
      a: 'Sometimes. The question is whether two groups would knock the same streets and tell two versions of the offer. If the territories and the script can be separated, we can talk. If they cannot, we should not both be there.',
    },
  ],
};

export const careers = {
  title: 'Door-to-Door Sales Careers | Join a Swyft Team',
  description: 'Apply to sell door to door with Swyft. Teams are recruited, trained, and housed by Swyft and sell for client companies.',
  h1: 'Sell at the door on a team Swyft runs.',
  answer: `Swyft hires people to sell door to door for client companies. We recruit you, train you on that client’s offer, house you in the market, and manage the team. You sell the client’s service on the client’s paperwork. Pay is explained in the recruiting conversation. <strong>This page does not publish rates.</strong> The application link is not live on the site yet: ${ph('recruiting application URL')}. Until it is, email <a href="mailto:${business.email}?subject=Rep%20application">${business.email}</a> with the subject “Rep application”.`,
  faqs: [
    {
      q: 'Is this a job with the home-service company or with Swyft?',
      a: 'You are on a Swyft team. You represent the client’s offer at the door. Housing and day-to-day management are Swyft’s. The recruiting conversation is where the relationship is spelled out. This page is not an offer letter.',
    },
    {
      q: 'Do you house reps?',
      a: 'Yes. Swyft houses the team in the market for the run. We do not publish cities or housing details on this page.',
    },
    {
      q: 'What will I sell?',
      a: 'Whatever offer the team is deployed on: exteriors, window cleaning, pest control, lawn care, fiber and wireless, interior remodels, home security, water treatment, or HVAC. You are trained on that offer. You do not invent a different one at the door.',
    },
    {
      q: 'Where do I apply?',
      a: `The public application link is not on the site yet. ${ph('recruiting application URL')} Email ${business.email} with the subject “Rep application” and the market you can work.`,
    },
    {
      q: 'What does it pay?',
      a: 'Pay is discussed in recruiting. We do not publish a rate, a draw, or a split on this website.',
    },
  ],
};

export const about = {
  title: 'About Swyft Solutions LLC and Colin Speer',
  description: 'Swyft Solutions LLC, led by Colin Speer, recruits, trains, houses, and manages outsourced door-to-door sales teams.',
  h1: 'Swyft Solutions LLC, led by Colin Speer.',
  answer: `<strong>Swyft</strong> is the brand of <strong>Swyft Solutions LLC</strong>. Colin Speer leads the company. Swyft recruits, trains, houses, and manages door-to-door sales teams that sell for home-service and telecom companies on a <a href="/partner/">marketing deal</a>. Email <a href="mailto:${business.email}">${business.email}</a> or call <a href="tel:${business.phoneE164}">${business.phone}</a>.`,
  body: `
<h2>What the company is</h2>
<p>Owners of home-service companies already know how to install a roof, run a pest route, or hang a system. The second company they did not plan to run is the one that recruits canvassers, houses them, and sits on them all week so the pitch does not wander. Swyft is that second company. The client pays a revenue share per account. Swyft runs the team.</p>
<p>The same model is how we work with telecom companies that sell AT&T fiber and wireless door to door. The product is different. The operating job is the same: people at doors, trained on one offer, housed in the market, managed, and reported.</p>
<h2>Colin Speer</h2>
<p>Colin Speer is the founder and the person you talk to about a market. He is the point of contact on the <a href="/contact/">contact page</a>.</p>
<p>${ph("Colin's background: years in door-to-door sales, roles held, and companies worked with, written only with permission")}</p>
<p>${ph('Headshot of Colin, a real photo, not a stand-in')}</p>
<p>${ph('LinkedIn or other profile URLs for Person schema sameAs')}</p>
<h2>What we will not put on this site</h2>
<p>No client names, no logos, and no result numbers. Trust on this site is the operating model: who recruits, who houses the team, how a city permit is handled, and what the weekly report contains. The marketing agreement is where the share is written. There is no rate card here.</p>
<h2>A related offer</h2>
<p><a href="/international/">Swyft International</a> is a separate page for offshore talent placement. It is not the door-to-door team. Door-to-door selling stays on <a href="/how-it-works/">how it works</a>.</p>
`,
};

export const privacyBody = `
<p><em>Last updated: 2026-11-24</em></p>
<p>This policy explains how ${business.legalName} ("Swyft", "we") handles information on swyft-hq.com. ${ph('have counsel review this policy before launch')}</p>
<h2>Who we are</h2>
<p>${business.legalName}, brand name Swyft. Email ${business.email}. Phone ${business.phone}. ${ph('business mailing address, if Colin chooses to publish one')}</p>
<h2>Information you give us</h2>
<p>If you use a contact form, we receive what you type: name, business name, email, phone, industry, and the page you sent it from. Today the form opens your email app with a message to ${business.email}, unless a form endpoint has been configured. The contact page also reserves a slot, marked [HIGHLEVEL FORM EMBED], for a HighLevel form. When that embed is installed, HighLevel will process the submission under its own terms and deliver it to us. You can also email or call us directly.</p>
<h2>How we use it</h2>
<p>We use the information to answer you and to talk about a door-to-door team or a role. We do not sell your personal information.</p>
<h2>Rep applicants</h2>
<p>If you email a rep application, we use what you send to respond about recruiting. Pay and housing details are not collected by this website. They are discussed off the site.</p>
<h2>Cookies and analytics</h2>
<p>This site does not set advertising or analytics cookies. If that changes, this policy changes first.</p>
<h2>Hosting</h2>
<p>The site is hosted on GitHub Pages. GitHub may log technical data such as IP addresses under its own privacy statement.</p>
<h2>Calls, texts, and email</h2>
<p>If you give us a phone number or email, we may contact you about your inquiry. You can tell us to stop by emailing ${business.email} or calling ${business.phone}.</p>
<h2>Your choices</h2>
<p>Email ${business.email} to ask for access, a correction, or deletion of what you sent us.</p>
<h2>Children</h2>
<p>This site is for businesses and adults applying to work. It is not directed to children under 13.</p>
`;

export const termsBody = `
<p><em>Last updated: 2026-11-24</em></p>
<p>By using swyft-hq.com you agree to these terms. ${ph('have counsel review these terms before launch')}</p>
<h2>The company</h2>
<p>The site is operated by ${business.legalName} ("Swyft"). The brand on the site is Swyft.</p>
<h2>What the site is</h2>
<p>The pages describe how Swyft recruits, trains, houses, and manages door-to-door sales teams, and how a marketing deal works in general. They are not a quote, not a promise of accounts, and not the marketing agreement. Any engagement is governed by a separate written agreement. No commission rate on this site is an offer.</p>
<h2>No guarantee of results</h2>
<p>Sold accounts depend on the offer, the market, the paperwork, and the work you can fulfill. Nothing here promises a number of doors, appointments, or accounts.</p>
<h2>Door-to-door rules</h2>
<p>Solicitation, permitting, and cancellation rules vary by city and state. The site is not legal advice. Have your own counsel review your paperwork and your process.</p>
<h2>Swyft International</h2>
<p>The <a href="/international/">Swyft International</a> page describes a separate offshore placement offer, including figures stated on that page. Those figures are not the door-to-door marketing deal.</p>
<h2>Intellectual property</h2>
<p>The text, design, and the Swyft logo belong to Swyft unless noted. You may link to our pages. Do not republish the copy without permission.</p>
<h2>Third-party services</h2>
<p>We link to other sites, including swyftinternational.com. A HighLevel form may be embedded on the contact page later. We are not responsible for third-party sites or for how those tools handle data under their own terms.</p>
<h2>Limitation of liability</h2>
<p>The site is provided as is. To the extent the law allows, Swyft is not liable for damages from use of the site.</p>
<h2>Governing law</h2>
<p>${ph('governing law state and venue')}</p>
<h2>Contact</h2>
<p>${business.email} · ${business.phone}</p>
`;
