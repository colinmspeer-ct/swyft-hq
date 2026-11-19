import { business } from './data.mjs';

const ph = (t) => `<span class="placeholder">[PLACEHOLDER: ${t}]</span>`;

export const homeFaqs = [
  { q: 'What is route-based business marketing?', a: 'Route-based business marketing is marketing built around route density: winning more paying stops on the streets your trucks already drive. For pest control, lawn care, pool, cleaning, and HVAC companies, that means door-to-door teams working the blocks around current customers, ads targeted to the zip codes you serve, and local SEO where your crews already run.' },
  { q: 'Do I have to buy all three divisions?', a: 'No. Pick one, or run all three in sync. Many companies start with one channel, such as a <a href="/services/door-to-door-sales-teams/">door-to-door sales team</a> or <a href="/services/local-seo-google-business-profile/">Google Business Profile management</a>, and add the others once it is working. Every division shares data, so each lead gets worked from every angle.' },
  { q: 'Will I be locked into a long-term contract?', a: 'No long-term lock-ins. We would rather keep your business by booking jobs than by trapping you in a contract.' },
  { q: 'How do you report results?', a: 'A clear weekly scorecard built on appointments, jobs, and revenue, not impressions or clicks. You get one point of contact who owns every channel.' },
  { q: 'Which industries do you work with?', a: 'Pest control is our flagship, along with lawn care, HVAC, cleaning, pool service, solar, plumbing, windows, and home security. See the <a href="/industries/">industries hub</a> for each trade.' },
  { q: 'How quickly will you get back to me?', a: `Colin and the team reply within one business day. Use the form on this page, email ${business.email}, or call ${business.phone}.` },
];

export const about = {
  h1: 'About Swyft &amp; founder Colin Speer',
  answer: `Swyft is a marketing company for pest control and route-based home service businesses, led by <strong>Colin Speer</strong>. Colin built Swyft so operators could get door-to-door sales, cold calling, local SEO, and paid ads from one accountable team instead of juggling agencies. Reach Colin at <a href="mailto:${business.email}">${business.email}</a> or <a href="tel:${business.phoneE164}">${business.phone}</a>.`,
  body: `
<h2>Why Swyft exists</h2>
<p>Route-based companies win on density, speed to lead, and follow-up. Most of them buy marketing in disconnected pieces: a summer door-to-door crew, an SEO retainer, an ads freelancer, a call center. Nobody owns the whole picture, so leads fall between vendors and reporting turns into a pile of impressions and clicks. Swyft puts every channel under one roof with one weekly scorecard: appointments, jobs, and revenue.</p>
<h2>Led by Colin Speer</h2>
<p>Colin Speer leads Swyft and is your point of contact. The Swyft playbooks come from the field: we've run doors, managed ad spend, and dialed the phones.</p>
<p>${ph('Colin\'s background: years in door-to-door sales / pest control, roles held, companies worked with (with permission)')}</p>
<p>${ph('Education (school, degree) and any licenses or certifications, e.g. Google Ads certification')}</p>
<p>${ph('Professional memberships, e.g. industry associations')}</p>
<p>${ph('Headshot and on-the-job photos of Colin with field teams (real photos, not stock)')}</p>
<p>${ph('LinkedIn and other profile links for Person schema sameAs')}</p>
<h2>How we work</h2>
<h3>Operators, not theorists</h3>
<p>Every recommendation has to survive a real route, a real rep, and a real phone call. If a tactic doesn't book jobs, we cut it.</p>
<h3>Channels that talk to each other</h3>
<p>Ad audiences inform door routes. Door data shapes outbound lists. Leads that don't close at the door get worked by phone and email. Nothing works in a silo.</p>
<h3>Reporting you'll actually read</h3>
<p>A clear weekly scorecard: appointments set, jobs booked, revenue. No vanity metrics.</p>
<h2>The three divisions</h2>
<ul>
<li><strong>Swyft Marketing</strong>: <a href="/services/door-to-door-sales-teams/">door-to-door sales teams</a> that knock your best territories and book real appointments.</li>
<li><strong>Swyft Outbound</strong>: <a href="/services/cold-calling-appointment-setting/">cold calling and appointment setting</a>, cold email, and database reactivation.</li>
<li><strong>Swyft Digital</strong>: <a href="/services/digital-marketing/">Meta and Google ads</a>, <a href="/services/pest-control-seo/">pest control SEO</a>, and <a href="/services/local-seo-google-business-profile/">local SEO and Google Business Profile management</a>.</li>
</ul>
<h2>Client results</h2>
<p>${ph('add client results with permission: company type, channel, before/after, timeframe')}</p>
<p>${ph('add client testimonials with name, company, photo, and date (real, with permission)')}</p>
`,
};

export const privacyBody = `
<p><em>Last updated: ${'2026-11-19'}</em></p>
<p>This policy explains how Swyft ("we", "us") handles information on swyft-hq.com. ${ph('have counsel review this policy before launch')}</p>
<h2>Information you give us</h2>
<p>When you use a contact form, we receive what you enter: your name, business name, email, phone number, service interest, message, and the page you submitted from. Depending on configuration, the form either opens your own email app with a pre-filled message to ${business.email}, or sends the form to a form-processing provider that forwards it to us. You can also contact us directly by email or phone.</p>
<h2>How we use it</h2>
<p>We use your information to respond to your inquiry, schedule calls, and provide services you request. We do not sell your personal information.</p>
<h2>Cookies and analytics</h2>
<p>This site does not set advertising or analytics cookies at this time. If we add analytics or advertising tags, we will update this policy.</p>
<h2>Hosting</h2>
<p>The site is hosted on GitHub Pages. GitHub may log technical data such as IP addresses for security and operations under its own privacy statement.</p>
<h2>Calls, texts, and email</h2>
<p>If you give us your phone number or email, we may contact you about your inquiry. You can ask us to stop at any time by replying, emailing ${business.email}, or calling ${business.phone}.</p>
<h2>Your choices</h2>
<p>You may ask us to access, correct, or delete information you have sent us by emailing ${business.email}.</p>
<h2>Children</h2>
<p>This site is for businesses and is not directed to children under 13.</p>
<h2>Contact</h2>
<p>Swyft · ${business.email} · ${business.phone} · ${ph('business mailing address, if Colin chooses to publish one')}</p>
`;

export const termsBody = `
<p><em>Last updated: ${'2026-11-19'}</em></p>
<p>By using swyft-hq.com you agree to these terms. ${ph('have counsel review these terms before launch')}</p>
<h2>Use of the site</h2>
<p>The content on this site is for general information about Swyft's services. It is not legal, tax, or regulatory advice. Rules for door-to-door solicitation, telemarketing, email, and advertising vary by location; check with your own counsel.</p>
<h2>No guarantee of results</h2>
<p>Marketing results depend on many factors outside our control. Nothing on this site is a promise of specific rankings, leads, appointments, or revenue. Any engagement is governed by a separate written agreement.</p>
<h2>Intellectual property</h2>
<p>The site's text, design, and graphics belong to Swyft unless otherwise noted. You may share links to our pages; please don't republish our content without permission.</p>
<h2>Third-party links</h2>
<p>We link to third-party sites such as Google and government resources. We are not responsible for their content or policies.</p>
<h2>Limitation of liability</h2>
<p>The site is provided "as is." To the extent permitted by law, Swyft is not liable for damages arising from use of the site.</p>
<h2>Governing law</h2>
<p>${ph('governing law state and venue')}</p>
<h2>Contact</h2>
<p>${business.email} · ${business.phone}</p>
`;
