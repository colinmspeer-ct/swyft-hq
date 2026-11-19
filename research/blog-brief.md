# Swyft blog writing brief (internal, not published)

Swyft (swyft-hq.com) is the marketing company for pest control and other route-based home service businesses (lawn care, HVAC, cleaning, pool, plus solar, plumbing, windows, home security). Led by Colin Speer. Three divisions:
- **Swyft Marketing**: door-to-door (D2D) sales teams. Recruited & trained reps, territory mapping (home age, income, job history), appointment setting, neighborhood blitzes around active jobs, sales coaching (role-play, ride-alongs), per-rep tracking (doors knocked, conversations, appointments, closes).
- **Swyft Digital**: Meta ads, Google ads (Search + Local Services Ads), local SEO / Google Business Profile optimization, service-area pages, review engine (automated review requests), call tracking & reporting.
- **Swyft Outbound**: cold calling (trained callers, targeted lists, qualified appointments), cold email (warmed domains, deliverability-first), commercial prospecting (property managers, HOAs, builders, facility teams), database reactivation (old estimates, past customers), list building, reply handling.
Positioning/tone (from Colin's draft): punchy, operator voice. "Every channel. One growth engine." Booked jobs, not vanity metrics. "Operators, not theorists." Channels that talk to each other (ad audiences inform door routes; door data shapes outbound lists). Weekly scorecard: appointments, jobs, revenue. One point of contact.
Contact: colin@swyft-hq.com, 267-606-8667.

## FACTS RULE (critical, non-negotiable)
- NEVER invent statistics, percentages, survey results, prices, client results, case studies, testimonials, client names, years in business, team size, or awards. No "studies show", no "X% of homeowners".
- Hypothetical examples are allowed only if clearly framed as hypothetical ("Say a two-truck lawn company in a mid-size suburb...") and contain no fake results.
- Platform facts (Google Business Profile, Local Services Ads, Meta ads, FTC/FCC rules, Google Search guidance) must be checked against the official source with WebFetch before you state them; link the official page (support.google.com, developers.google.com, ftc.gov, fcc.gov, facebook.com/business). If you can't verify a specific detail, state it generally or leave it out.
- Legal/regulatory topics (solicitor permits, TCPA, Telemarketing Sales Rule, CAN-SPAM): general, accurate, link the official source, and say to check local rules / talk to counsel. Not legal advice.
- Do not claim Swyft is "#1" as a fact. Don't name or disparage competitors.

## Output format
One ES module per post at /workspace/swyft-hq/content/blog/<slug>.mjs:

```js
export default {
  slug: 'example-slug',            // must equal filename
  title: 'Title tag: primary keyword + a variation | Swyft',   // 50-70 chars incl. " | Swyft"
  description: 'Meta description, 140-160 chars, keyword near the front, benefit-driven.',
  h1: 'H1 containing the primary keyword (different wording from title is fine)',
  date: '2026-11-19',
  service: 'door-to-door-sales-teams',   // primary money page key (see list)
  industries: ['pest-control', 'lawn-care'],
  keyword: 'primary keyword',
  excerpt: 'Keyword-rich 1-2 sentence summary for blog hub cards (max ~200 chars).',
  answer: 'Direct 2-4 sentence answer to the searcher\'s question. Plain, quotable fact sentences.',
  body: `
<p>...</p>
<h2>...</h2>
<p>...</p>
<h3>...</h3>
<ul><li>...</li></ul>
`,
  faqs: [ { q: 'Question?', a: 'Answer (plain text, 1-3 sentences).' } ],  // 2-4 items
};
```
- Body is HTML: p, h2, h3, ul/ol/li, strong, a, blockquote, table only. No H1 in body. No images. No inline styles. NO backticks or `${` inside the body string. Use straight or curly quotes freely; escape `'` only inside single-quoted strings.
- Length: body 900-1,300 words. At least 4 H2s, some H3s. Headings use the keyword and natural variations (how operators actually say it: "exterminator", "pest company", "lawn guys", "route density", "D2D", "knocking doors").
- Bold (<strong>) key terms and entities sparingly (a handful per post, no stuffing).
- Internal links (root-relative hrefs exactly as listed, trailing slash):
  - At least 2 links to the post's primary service page, the first one with a **keyword anchor** (e.g. `<a href="/services/pest-control-seo/">pest control SEO</a>`). Vary anchor wording.
  - 1 link to EACH industry page listed in `industries`, keyword anchor (e.g. "lawn care marketing").
  - 1-2 links to sibling posts (by slug: `/blog/<slug>/`) from the post list, where relevant.
  - Final paragraph: short CTA linking to `/contact/` (e.g. "book a strategy call") — no phone numbers needed.
- External links: only official/authoritative sources you actually opened; add `rel="noopener"`.
- Write for owners/GMs of pest control and route-based service companies. Practical, specific, opinionated, operator voice. No fluff intros ("In today's digital landscape..."). No keyword stuffing.
- After writing each file, validate with: `node -e "import('/workspace/swyft-hq/content/blog/<slug>.mjs').then(m=>{const p=m.default;console.log(p.slug, p.body.split(/\s+/).length)})"`

## Money pages (link targets)
Services:
- door-to-door-sales-teams → /services/door-to-door-sales-teams/ (anchors: door-to-door sales teams, D2D sales team, door-to-door marketing for pest control)
- cold-calling-appointment-setting → /services/cold-calling-appointment-setting/ (anchors: cold calling and appointment setting, outbound appointment setting, cold calling for pest control)
- pest-control-seo → /services/pest-control-seo/ (anchors: pest control SEO, SEO for pest control companies)
- local-seo-google-business-profile → /services/local-seo-google-business-profile/ (anchors: local SEO, Google Business Profile management)
- digital-marketing → /services/digital-marketing/ (anchors: digital marketing for home services, Meta and Google ads management)
Industries:
- pest-control → /industries/pest-control-marketing/ (pest control marketing, pest control marketing company)
- lawn-care → /industries/lawn-care-marketing/ (lawn care marketing)
- hvac → /industries/hvac-marketing/ (HVAC marketing)
- cleaning → /industries/cleaning-business-marketing/ (cleaning business marketing)
- pool → /industries/pool-service-marketing/ (pool service marketing)
- solar → /industries/solar-marketing/ (solar marketing)
- plumbing → /industries/plumbing-marketing/ (plumbing marketing)
- windows → /industries/window-company-marketing/ (window company marketing)
- home-security → /industries/home-security-marketing/ (home security marketing)
Other: /contact/, /about/, /services/, /industries/, /blog/

## Full post list (slug | primary keyword | service | industries)
1. pest-control-door-to-door-sales-season | pest control door-to-door sales season | door-to-door-sales-teams | pest-control, lawn-care
2. in-house-vs-outsourced-door-to-door-sales | in-house vs outsourced door-to-door sales team | door-to-door-sales-teams | solar, home-security
3. route-density-door-to-door-territory-mapping | route density and D2D territory mapping | door-to-door-sales-teams | lawn-care, pest-control, pool
4. door-to-door-sales-objections-home-services | door-to-door sales objections (pest/home services) | door-to-door-sales-teams | pest-control, windows
5. door-to-door-solicitation-permits | door-to-door solicitation permits for home service companies | door-to-door-sales-teams | home-security, solar, windows
6. cold-calling-commercial-pest-control-accounts | cold calling for commercial pest control accounts | cold-calling-appointment-setting | pest-control, cleaning
7. database-reactivation-home-service-companies | database reactivation for home service companies | cold-calling-appointment-setting | hvac, plumbing
8. what-is-a-qualified-appointment | qualified appointment (appointment setting for home services) | cold-calling-appointment-setting | windows, solar, home-security
9. cold-email-deliverability-home-services | cold email deliverability for home service companies | cold-calling-appointment-setting | cleaning, hvac
10. outbound-prospecting-property-managers-hoas | prospecting property managers and HOAs | cold-calling-appointment-setting | lawn-care, pool, cleaning
11. pest-control-keyword-research | pest control keyword research | pest-control-seo | pest-control
12. pest-control-service-area-pages | pest control service area / city pages | pest-control-seo | pest-control, plumbing
13. seasonal-seo-pest-lawn-pool | seasonal SEO timing for pest, lawn and pool companies | pest-control-seo | pest-control, lawn-care, pool
14. pest-control-seo-vs-google-ads | pest control SEO vs Google Ads | pest-control-seo | pest-control, hvac
15. technical-seo-pest-control-websites | technical SEO for pest control websites | pest-control-seo | pest-control, plumbing
16. google-business-profile-checklist-home-services | Google Business Profile checklist for home services | local-seo-google-business-profile | hvac, plumbing
17. get-more-google-reviews-home-services | how to get more Google reviews (home services) | local-seo-google-business-profile | pool, cleaning
18. service-area-business-google-business-profile | service-area business Google Business Profile | local-seo-google-business-profile | lawn-care, cleaning
19. google-business-profile-categories-pest-control | Google Business Profile categories for pest control | local-seo-google-business-profile | pest-control
20. local-seo-for-lawn-care-companies | local SEO for lawn care companies | local-seo-google-business-profile | lawn-care
21. facebook-ads-for-pest-control | Facebook ads for pest control | digital-marketing | pest-control, home-security
22. google-local-services-ads-home-services | Google Local Services Ads for home services | digital-marketing | hvac, plumbing
23. google-ads-for-lawn-care | Google Ads for lawn care | digital-marketing | lawn-care
24. call-tracking-home-service-marketing | call tracking for home service marketing | digital-marketing | plumbing, hvac, windows
25. meta-ads-pool-service-companies | Meta ads for pool service companies | digital-marketing | pool, solar

Rules for not cannibalizing money pages: posts must not target the money-page head terms ("pest control marketing company/agency", "door to door marketing for pest control", "pest control SEO" alone, "lawn care marketing" alone). Target the long-tail keyword listed and link UP to the money page.
