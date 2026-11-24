# Swyft (swyft-hq.com)

Static site for **Swyft** (legal name **Swyft Solutions LLC**), the outsourced door-to-door sales company for home-service and telecom companies. Swyft recruits, trains, houses, and manages the team. The client pays a revenue share per account. No commission percentage is published.

- Production target: **https://swyft-hq.com** (domain root, `public/CNAME` is `swyft-hq.com`)
- This branch is a preview. It does not change DNS or Pages settings. GitHub Pages still deploys `main` only.

## Stack

Zero-dependency Node static generator (`src/build.mjs`). Plain HTML, one CSS file, and a small form script. No framework and no webfonts.

- `src/data.mjs`: business facts and the industry list
- `content/industries/*.mjs`: one unique page per industry
- `src/pages.mjs`: how it works, the marketing deal, careers, about, privacy, terms
- `src/international.mjs`: Swyft International offshore placement page at `/international/`

To add an industry later, append an entry in `src/data.mjs` and add `content/industries/{key}.mjs`. The build fails if one of those is missing. Do not add a trade that has not been approved.

## Commands

Node 20+. No install.

```bash
npm run dev              # http://localhost:8080/
npm run build            # dist/ for https://swyft-hq.com
npm run check            # links, unique titles, schema, click depth, no "investor"
node scripts/check.mjs --placeholders
```

`SITE_URL` and `BASE_PATH` still override `src/config.mjs`. The contact page reserves the literal placeholder `[HIGHLEVEL FORM EMBED]` for a HighLevel form. Until that embed is pasted in, the email form remains.

## Content rules

No invented results, client names, testimonials, or commission rates. Open inputs are marked `[HIGHLEVEL FORM EMBED]` or `[PLACEHOLDER: …]`. The word "investor" is not used.
