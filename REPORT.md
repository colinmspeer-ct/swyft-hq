# Swyft website: build report (2026-11-19)

## 1. Lovable project used
- Name: **Swyft Growth Studio** (most recent Lovable draft, last edited 2026-11-18, unpublished)
- Project ID: `1e533a5b-c2a2-4b50-b966-e28c1a71d0a1`
- Editor: https://lovable.dev/projects/1e533a5b-c2a2-4b50-b966-e28c1a71d0a1
- Preview: https://id-preview--1e533a5b-c2a2-4b50-b966-e28c1a71d0a1.lovable.app
- Source used: the exported files in `/workspace/lovable-swyft-draft/` (index, marketing, digital, outbound, contact, layout, service-page, screenshot). Kept: the three divisions, draft copy and tone, the dark/lime look, and the H1 "Every channel. One growth engine." The draft's brand name was "Swyft Solutions"; the site uses "Swyft" (with "Swyft Solutions" as `alternateName` in schema).

## 2. Repo
https://github.com/colinmspeer-ct/swyft-hq (public, branch `main`)

## 3. URLs
Production target: https://swyft-hq.com (root, no base path; serving depends on DNS and the Pages custom-domain setting). Initial preview, verified at launch: https://colinmspeer-ct.github.io/swyft-hq/. The Pages workflow ran successfully. The home page, a sample of service, industry, and blog pages, CSS, sitemap.xml, robots.txt, and llms.txt all returned HTTP 200, and an unknown URL returned 404. A headless Chrome render of the live site was also checked.

## 4. Pages (48 indexable + 404)
**Service money pages (5):** `/services/door-to-door-sales-teams/`, `/services/cold-calling-appointment-setting/`, `/services/pest-control-seo/`, `/services/local-seo-google-business-profile/`, `/services/digital-marketing/`

**Industry money pages (9):** `/industries/pest-control-marketing/` (targets "pest control marketing company/agency"), `/industries/lawn-care-marketing/`, `/industries/hvac-marketing/`, `/industries/cleaning-business-marketing/`, `/industries/pool-service-marketing/`, `/industries/solar-marketing/`, `/industries/plumbing-marketing/`, `/industries/window-company-marketing/`, `/industries/home-security-marketing/`

**Blog posts (25, 5 per service page):** under `/blog/<slug>/`. Each post links to its service page with a keyword anchor, to 1–3 industry pages, and to related posts. Full list: `/sitemap/` or `content/blog/`.

**Other (9):** `/` (targets "route-based business marketing" and the brand), `/services/`, `/industries/`, `/blog/` (hubs), `/about/` (Person schema for Colin Speer), `/contact/`, `/privacy/`, `/terms/`, `/sitemap/` (HTML sitemap). Generated files: `sitemap.xml`, `robots.txt` (allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, and others), `llms.txt`.

**SEO checks (run by `npm run check` in CI):** every page has a unique title, meta description, and H1, plus a canonical URL, an answer block, a lead form, and valid JSON-LD. Schema types used: Organization, WebSite, Service, FAQPage, BreadcrumbList, BlogPosting, Person. There are no broken internal links, and the maximum click depth from home is 2.

## 5. Placeholders for Colin
Shown on the pages as dashed `[PLACEHOLDER: …]` boxes. To list them all: `node scripts/check.mjs --placeholders`.
- **About:** Colin's background, education/licenses/certifications, memberships, headshot and on-the-job photos, LinkedIn and other `sameAs` links. Person schema has no `jobTitle`, `alumniOf`, or `sameAs` until these are supplied.
- **Client results and testimonials:** About, all 5 service pages, and the pest control and lawn care pages. There are none anywhere on the site today.
- **Pricing or starting price (optional):** all 5 service pages and the pest control page.
- **Policies to confirm:**
  - Tracking-number ownership/porting (local SEO page).
  - Market exclusivity (pest control SEO page).
  - Statements written as Swyft policy that need Colin's sign-off:
    - "No long-term lock-ins". This is from the draft's "0 long-term lock-ins" stat.
    - Ad accounts, GBP, website, and domain set up in the client's name with Swyft given manager access.
    - No campaigns or budget increases without client approval.
    - Leads from client ads go only to that client / "not a lead marketplace".
    - Reps scripted on terms and cancellation; do-not-call scrubbing where it applies.
    - "Reply within one business day" and the "20-minute strategy call". Both are from the draft.
- **Legal:** counsel review of Privacy and Terms; governing law state; optional mailing address.
- **Form backend:** forms currently open the visitor's email app addressed to colin@swyft-hq.com. To receive submissions directly, create a form endpoint (e.g. Formspree) and set the repo variable `FORM_ENDPOINT`. No form or CRM IDs were invented.
- **Photos:** there are no real photos on the site yet (the rulebook asks for real job photos, not stock). The only images are Colin's real SWYFT wordmark (and icons/OG image derived from it); see LOGO-UPDATE.md.

## 6. DNS findings and proposed changes (nothing was changed)
DNS for swyft-hq.com is at **GoDaddy**, not Cloudflare.
- Registrar: GoDaddy.com, LLC (IANA 146). Nameservers: ns29.domaincontrol.com, ns30.domaincontrol.com. Registered 2026-11-19.
- Current: A @ → 15.197.148.33, 3.33.130.190 (GoDaddy parking/forwarding); www CNAME → swyft-hq.com; no AAAA.
- **Email records (must never be touched):**
  - MX `1 smtp.google.com.`
  - TXT `v=spf1 include:dc-bdaca08905._spfm.swyft-hq.com ~all`
  - TXT `google-site-verification=NoPYjjknROuw4PL-GbcgPhBeE3p89Kadm3EeSgfTSl4`
  - `_dmarc` TXT `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;`
  - `google._domainkey` DKIM TXT
- **Proposed future changes (not applied):**
  - Replace the two apex A records with 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153.
  - Optionally add AAAA records: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153.
  - Change the www CNAME → colinmspeer-ct.github.io.
- Site build (done): production now targets https://swyft-hq.com with no base path. Canonicals, Open Graph URLs, sitemap.xml and robots.txt use https://swyft-hq.com, `public/CNAME` (`swyft-hq.com`) is published in the Pages artifact, and the Actions variable `CUSTOM_DOMAIN=true` is set.
- Still to do separately: DNS changes above, then set the custom domain `swyft-hq.com` in repo Settings → Pages and enforce HTTPS. The custom domain was **not** attached from this repo, and DNS was not changed.

## 7. CLI used
Claude Code (model: Claude Opus 5.5), with `gh` authenticated as colinmspeer-ct.

## 8. Blocked or unfinished
- **Competitor review research:**
  - Reddit couldn't be fetched, and BBB, ConsumerAffairs, and G2 blocked automated fetching.
  - 52 of 58 logged sources are verified; 6 are snippet-only. All are in `research/competitor-reviews.md`, which is private (competitors are not named on the site).
  - No verifiable pool-specific complaints were found, so the pool FAQs use general themes. Lawn care evidence is thin.
  - D2D evidence is homeowner complaints about pest companies that sell door to door, not reviews of D2D staffing firms.
- **SERP research** (`research/serp-research.md`) came from a search tool, not live Google, and has no search-volume data.
- **Word counts are below the researched targets in places.**
  - Service pages run about 1,550–2,000 words of main content against targets of about 2,200–2,500 (pest control SEO target about 2,500). Expanding them is the top content follow-up.
  - Industry pages are at or near target. For example, pest control is about 3,400 words in total against a target of about 2,200.
- **Verification gaps:**
  - The FTC and FCC sites block automated fetches, so the TCPA and call-recording sections are written in general terms.
  - The FTC Cooling-Off Rule is described from the regulation text the writers could reach. The rule page itself was not re-fetched.
  - Industry pages describe Google and Meta platform features only in general terms; those weren't checked against the platforms' docs.
- Search Console, Google Trends, and backlink data were not available, so none are used.

## 9. Stack and build
- Zero-dependency Node static generator (`src/build.mjs`). Output is plain server-rendered HTML, one CSS file, and about 1 KB of JS for forms only. System fonts, mobile-first, `<details>` for the mobile nav and FAQs.
- Content lives in `content/{services,industries,blog}/*.mjs`. Facts are in `src/data.mjs`.
- Commands (Node 20+, no install needed):
  - `npm run dev`: serves at http://localhost:8080/
  - `npm run preview`: production build (https://swyft-hq.com, no base path) served at http://localhost:8080/
  - `npm run build`: production build (defaults: SITE_URL=https://swyft-hq.com, BASE_PATH empty)
  - `npm run check`
  - `npm run build:domain`: production build with SITE_URL/BASE_PATH set explicitly
  - `npm run build:github-io`: fallback build for the github.io project URL (/swyft-hq base)
- Deploys run from `.github/workflows/pages.yml` on every push to `main` (build → check → deploy).
- `SITE_URL` and `BASE_PATH` are configurable. Details in README.md.
