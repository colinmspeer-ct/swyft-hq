# Swyft (swyft-hq.com)

Static marketing website for **Swyft**, the marketing company for pest control and route-based home service businesses: door-to-door sales teams (Swyft Marketing), cold calling and appointment setting (Swyft Outbound), and digital marketing with local SEO (Swyft Digital).

- Preview: https://colinmspeer-ct.github.io/swyft-hq/
- Planned production domain: **https://swyft-hq.com** (not attached yet; DNS is at GoDaddy and unchanged)
- Based on Colin Speer's Lovable draft "Swyft Growth Studio" (project `1e533a5b-c2a2-4b50-b966-e28c1a71d0a1`), rebuilt as plain server-rendered HTML.

## Stack

- **Zero-dependency Node static generator** (`src/build.mjs`). Output is plain HTML + one CSS file + ~1 KB of JS (form enhancement only). No framework, no client-side rendering, no webfonts.
- Content lives in ES modules:
  - `content/services/*.mjs`: 5 service money pages
  - `content/industries/*.mjs`: 9 industry money pages
  - `content/blog/*.mjs`: blog posts (each links up to one service and its industries)
  - `src/pages.mjs`: home FAQs, About, Privacy, Terms
  - `src/data.mjs`: business facts, services, industries (single source of truth)
- Generated automatically: `sitemap.xml`, HTML sitemap (`/sitemap/`), `robots.txt` (allows AI crawlers), `llms.txt`, JSON-LD (Organization, WebSite, Service, FAQPage, BreadcrumbList, BlogPosting, Person).

## Local development

Requires Node 20+. No `npm install` needed.

```bash
npm run dev        # build with no base path and serve at http://localhost:8080/
npm run preview    # build exactly like GitHub Pages (/swyft-hq base) and serve at http://localhost:8080/swyft-hq/
npm run build      # build to dist/ (defaults: SITE_URL=https://colinmspeer-ct.github.io/swyft-hq, BASE_PATH=/swyft-hq)
npm run check      # QA: broken links, duplicate titles/descriptions/H1s, canonicals, lead form + answer block on every page, JSON-LD, click depth
node scripts/check.mjs --words --placeholders   # word counts and the list of [PLACEHOLDER] items
```

## Configuration (site URL and base path)

All internal links are written root-relative (`/services/...`) and prefixed with `BASE_PATH` at build time. Canonicals, Open Graph URLs, and the sitemap use `SITE_URL`.

| Env var | GitHub Pages preview | Custom domain |
|---|---|---|
| `SITE_URL` | `https://colinmspeer-ct.github.io/swyft-hq` | `https://swyft-hq.com` |
| `BASE_PATH` | `/swyft-hq` | *(empty)* |
| `FORM_ENDPOINT` | optional | optional |

`npm run build:domain` builds the custom-domain version locally.

## Lead forms

Every page has a lead form (name, business name, email, phone, service interest, message). By default it opens the visitor's email app with a pre-filled message to `colin@swyft-hq.com` (works on GitHub Pages, no backend). To collect submissions without email apps, create a form backend (e.g. Formspree, Basin, Getform), then set the repository variable `FORM_ENDPOINT` to its URL. No form or CRM IDs are invented in this repo.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`: build → check → deploy to GitHub Pages.

### Moving to swyft-hq.com (later)

1. At GoDaddy, change only the website records (see `REPORT.md`): apex A records → GitHub Pages IPs, `www` CNAME → `colinmspeer-ct.github.io`. **Do not touch MX, SPF, DKIM, DMARC, or verification TXT records.**
2. Repo Settings → Pages → Custom domain: `swyft-hq.com`, then enable "Enforce HTTPS".
3. Repo Settings → Secrets and variables → Actions → Variables: add `CUSTOM_DOMAIN=true`, then re-run the workflow. Canonicals and the sitemap switch to `https://swyft-hq.com` and the base path is dropped. GitHub redirects the old github.io URLs to the custom domain.

## Content rules

No invented reviews, results, stats, prices, testimonials, or client logos. Anything Colin needs to supply is marked `[PLACEHOLDER: ...]` on the page (run `node scripts/check.mjs --placeholders`). FAQ objections come from real competitor reviews logged privately in `research/competitor-reviews.md`; competitors are not named on the site.
