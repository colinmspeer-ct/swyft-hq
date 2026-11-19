export default {
  slug: 'cold-email-deliverability-home-services',
  title: "Cold Email Deliverability for Home Service Companies | Swyft",
  description: "Cold email deliverability for home service companies: domain setup, SPF, DKIM and DMARC, Gmail sender rules, list hygiene and CAN-SPAM basics before you send.",
  h1: "Cold Email Deliverability for Home Service Companies: Land in the Inbox First",
  date: '2026-11-19',
  service: 'cold-calling-appointment-setting',
  industries: ['cleaning', 'hvac'],
  keyword: 'cold email deliverability for home service companies',
  excerpt: "A deliverability-first guide to cold email for cleaning, HVAC and other home service companies: separate domains, authentication, warmup, list hygiene, Gmail sender rules and CAN-SPAM.",
  answer: "Cold email deliverability is whether your messages reach the inbox instead of spam or nowhere. For home service companies, it depends on sending from properly authenticated domains (SPF, DKIM and DMARC), ramping volume gradually, emailing clean and relevant lists, keeping spam complaints low and following CAN-SPAM. Fix deliverability before you write a single subject line.",
  body: `
<p>A great cold email that lands in spam is the same as no email. Most home service companies that try cold email for commercial work, such as office cleaning contracts, HVAC maintenance agreements for property managers or facility work, start with the copy. Start with the plumbing instead. If the infrastructure is wrong, nothing you write matters.</p>

<h2>What cold email deliverability actually means</h2>
<p><strong>Deliverability</strong> is the share of your messages that reach the recipient's inbox. Not "sent." Not "delivered" in your tool's dashboard, which often only means the receiving server accepted it. Inbox placement depends on how mailbox providers like Gmail and Outlook judge your domain, your sending setup and how recipients react to your mail.</p>
<p>Those providers are protecting their users. Your job is to look like a legitimate sender that people want to hear from, because that's what you should be.</p>

<h2>Domain and mailbox setup for cold outreach</h2>
<h3>Use a separate sending domain</h3>
<p>Many teams send cold outreach from a secondary domain that's close to their main brand, rather than the domain their office, invoices and customer service run on. The idea is to protect your primary domain's reputation if cold campaigns run into problems. Point the secondary domain to your real website so recipients can see who you are.</p>
<h3>Real mailboxes, real names</h3>
<p>Send from a named person, not "info@" or "sales@." Use a real signature with your company name and contact details.</p>
<h3>Warm up gradually</h3>
<p>New domains and mailboxes have no reputation. Start with low volume and increase slowly as you see healthy engagement. Sudden spikes from a brand-new domain look like spam behavior to mailbox providers.</p>

<h2>Authentication: SPF, DKIM and DMARC</h2>
<p>Authentication tells receiving servers that your email really comes from your domain. Google's <a href="https://support.google.com/a/answer/81126" rel="noopener">email sender guidelines</a> spell out what Gmail expects:</p>
<ul>
<li><strong>All senders</strong> to personal Gmail accounts need SPF or DKIM, valid forward and reverse DNS (PTR) records, a TLS connection and messages formatted to the RFC 5322 standard. Google also says to keep spam rates reported in Postmaster Tools below 0.3%.</li>
<li><strong>Bulk senders</strong>, which Google describes as sending around 5,000 or more messages a day to personal Gmail accounts, need <strong>SPF and DKIM and DMARC</strong>. The DMARC policy can be set to none. The From domain must align with the SPF or DKIM domain, and marketing messages need one-click unsubscribe plus a visible unsubscribe link.</li>
<li>Google recommends keeping spam rates below 0.1% and says senders should avoid ever reaching 0.3%.</li>
</ul>
<p>Most home service cold email programs won't hit bulk-sender volume. Set up all three anyway. It's the baseline for being treated as a legitimate sender, and other mailbox providers have their own requirements. A one-click unsubscribe is a good practice even when it isn't strictly required.</p>

<h2>List quality: the deliverability factor most teams ignore</h2>
<p>Sending to bad addresses and uninterested people is how domains get burned.</p>
<ul>
<li><strong>Verify addresses</strong> before sending. Bounces hurt your reputation.</li>
<li><strong>Target tightly.</strong> A facility manager at a medical office in your service area is a relevant recipient for <a href="/industries/cleaning-business-marketing/">cleaning business marketing</a>. A random list of every business in the state is not.</li>
<li><strong>Remove opt-outs</strong> immediately and keep them suppressed across every domain and tool.</li>
<li><strong>Drop non-engagers</strong> after your sequence ends rather than mailing them forever.</li>
</ul>
<p>For list building ideas, see our guide to <a href="/blog/outbound-prospecting-property-managers-hoas/">prospecting property managers and HOAs</a>.</p>

<h2>Writing cold emails that don't trigger spam filters</h2>
<h3>Keep it short and plain</h3>
<p>Plain text or very light formatting. No heavy images, no attachments on a first email, few links. A few sentences that read like one person writing to another.</p>
<h3>Make it relevant</h3>
<blockquote>"Hi Dana, we handle HVAC maintenance for a few apartment communities on the east side. Do you have a vendor for preventive maintenance on your rooftop units, or is that handled per call? Happy to send over how we schedule it."</blockquote>
<p>Specific, local and easy to answer. The goal of the first email is a reply, not a sale. Only reference nearby work you actually do.</p>
<h3>Avoid the obvious spam patterns</h3>
<p>All caps, excessive punctuation, misleading subject lines and fake "Re:" threads damage trust and may break the law. Speaking of which.</p>

<h2>CAN-SPAM basics for B2B cold email</h2>
<p><strong>Not legal advice.</strong> According to the FTC's <a href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" rel="noopener">CAN-SPAM compliance guide</a>, the law makes no exception for business-to-business email. Its core requirements include:</p>
<ol>
<li>Accurate From, To, Reply-To and routing information.</li>
<li>No deceptive subject lines.</li>
<li>Clearly and conspicuously disclosing that the message is an advertisement.</li>
<li>Including your valid physical postal address.</li>
<li>Giving a clear way to opt out, and honoring opt-outs within 10 business days.</li>
<li>Remaining responsible for email sent on your behalf by someone else.</li>
</ol>
<p>The FTC notes each separate email in violation can carry significant penalties. State laws and other countries' rules may also apply, so check with counsel.</p>

<h2>Monitoring deliverability week to week</h2>
<ul>
<li><strong>Bounce rate</strong>: high bounces mean list problems.</li>
<li><strong>Spam complaints</strong>: check Google Postmaster Tools if you send enough volume to Gmail.</li>
<li><strong>Reply rate and reply quality</strong>: positive replies are the real signal.</li>
<li><strong>Placement tests</strong>: periodically send to seed accounts to see where you land.</li>
</ul>
<p>If numbers slip, slow down, clean the list and review your copy before sending more.</p>

<h2>Cold email as part of an outbound system</h2>
<p>Cold email works best alongside calls, not instead of them. An email warms the prospect, a call follows up, a reply gets handled fast. Our <a href="/services/cold-calling-appointment-setting/">outbound appointment setting</a> team runs it that way: warmed domains, deliverability first, targeted lists, reply handling and calls that book appointments. It's how we support <a href="/industries/hvac-marketing/">HVAC marketing</a> for commercial maintenance, cleaning contracts and more.</p>
<p>Want cold email that actually lands? Learn more about our <a href="/services/cold-calling-appointment-setting/">cold calling and appointment setting</a> or <a href="/contact/">book a strategy call</a>.</p>
`,
  faqs: [
    { q: "Do I need SPF, DKIM and DMARC for cold email?", a: "Google requires SPF or DKIM for all senders to Gmail and all three for bulk senders. Setting up all three is good practice for any cold email program." },
    { q: "Does CAN-SPAM apply to B2B cold email?", a: "Yes. The FTC says the CAN-SPAM Act makes no exception for business-to-business email. Include accurate headers, a postal address and an opt-out you honor within 10 business days." },
    { q: "Should I send cold email from my main business domain?", a: "Many teams use a separate sending domain to protect their primary domain's reputation. Point it to your real website and send from named people." },
  ],
};
