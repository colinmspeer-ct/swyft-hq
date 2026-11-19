# Swyft (swyft-hq.com)

Static marketing website for **Swyft**, the marketing company for pest control and route-based home service businesses: door-to-door sales teams (Swyft Marketing), cold calling and appointment setting (Swyft Outbound), and digital marketing with local SEO (Swyft Digital).

- Production: **https://swyft-hq.com** (served from the domain root, no base path; `public/CNAME` contains `swyft-hq.com`)
- Former preview: https://colinmspeer-ct.github.io/swyft-hq/ (GitHub redirects it to the custom domain once the domain is attached in Pages settings)
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
npm run preview    # production build (https://swyft-hq.com, no base path) served at http://localhost:8080/
npm run build      # build to dist/ (defaults: SITE_URL=https://swyft-hq.com, BASE_PATH empty)
npm run build:domain     # same as the production build, with SITE_URL/BASE_PATH set explicitly
npm run build:github-io  # fallback build for https://colinmspeer-ct.github.io/swyft-hq (BASE_PATH=/swyft-hq)
npm run check      # QA (reads SITE_URL/BASE_PATH, same defaults): canonicals/sitemap/robots on SITE_URL, CNAME, no leftover /swyft-hq base, broken links, duplicate titles/descriptions/H1s, canonicals, lead form + answer block on every page, JSON-LD, click depth
node scripts/check.mjs --words --placeholders   # word counts and the list of [PLACEHOLDER] items
```

## Configuration (site URL and base path)

All internal links are written root-relative (`/services/...`) and prefixed with `BASE_PATH` at build time. Canonicals, Open Graph URLs, and the sitemap use `SITE_URL`.

| Env var | Production (default) | github.io fallback |
|---|---|---|
| `SITE_URL` | `https://swyft-hq.com` | `https://colinmspeer-ct.github.io/swyft-hq` |
| `BASE_PATH` | *(empty)* | `/swyft-hq` |
| `FORM_ENDPOINT` | optional | optional |

Env vars always override the defaults in `src/config.mjs`. `public/CNAME` (`swyft-hq.com`) is copied into `dist/` on every build.

## Lead forms

Every page has a lead form (name, business name, email, phone, service interest, message). By default it opens the visitor's email app with a pre-filled message to `colin@swyft-hq.com` (works on GitHub Pages, no backend). To collect submissions without email apps, create a form backend (e.g. Formspree, Basin, Getform), then set the repository variable `FORM_ENDPOINT` to its URL. No form or CRM IDs are invented in this repo.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`: build → check → deploy to GitHub Pages. The workflow builds for `https://swyft-hq.com` with no base path (repository variable `CUSTOM_DOMAIN` is `true`; setting it to `false` switches back to the github.io build).

### Serving from swyft-hq.com

The site build is ready for the domain root. Remaining steps are done outside this repo:

1. At GoDaddy, change only the website records (see `REPORT.md`): apex A records → GitHub Pages IPs, `www` CNAME → `colinmspeer-ct.github.io`. **Do not touch MX, SPF, DKIM, DMARC, or verification TXT records.**
2. Repo Settings → Pages → Custom domain: `swyft-hq.com` (with Actions-based deploys, GitHub uses this setting rather than the CNAME file), then enable "Enforce HTTPS" once the certificate is issued.

## Content rules

No invented reviews, results, stats, prices, testimonials, or client logos. Anything Colin needs to supply is marked `[PLACEHOLDER: ...]` on the page (run `node scripts/check.mjs --placeholders`). FAQ objections come from real competitor reviews logged privately in `research/competitor-reviews.md`; competitors are not named on the site.
