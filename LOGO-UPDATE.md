# Logo update: real SWYFT wordmark

Date: 2026-11-19 · Commit: `f3b2255` (assets + templates), followed by this doc.

## Source
Colin's bold italic "SWYFT" wordmark (1500x500 PNG, dark gray `#3b3d3e` on white). The letterforms were not redrawn, restyled or distorted. The white background was knocked out with a luminance-to-alpha conversion, which keeps the anti-aliased edges, and the image was tight-cropped to 1485x235 with 12px padding. The only color change is the white version for dark backgrounds.

## Files added (public/assets/)
| File | What it is |
|---|---|
| `logo.png` (replaced) | Dark wordmark on transparent, 1485x235 |
| `logo-white.png` | Same alpha, letters recolored to white |
| `logo.svg` | Vector trace of the wordmark, dark |
| `logo-white.svg` | Same trace, white. **Used in the header and footer** |
| `favicon.svg` (replaced) | The "S" path cropped from the traced wordmark, white on a dark (#0b0d0b) rounded square |
| `favicon.ico` (16/32/48), `favicon-32.png` | Raster versions of the favicon |
| `apple-touch-icon.png` | 180x180, full white wordmark on dark square |
| `og-default.png` (replaced) | 1200x630 social image with the real white wordmark plus the same headline and service text as before. No photos and no testimonials |

`scripts/brand/make_logo_assets.py` rebuilds all of the above from the source PNG. It is a one-off tool that needs `pillow numpy potracer cairosvg`, and it is not part of the CI build.

## Files changed
- `src/lib.mjs`: header and footer logo is now `<img src="/assets/logo-white.svg" alt="Swyft logo">`, which replaces the text "S" badge and "Swyft" text. Head now links favicon.ico, favicon.svg, favicon-32.png and apple-touch-icon.png. The Organization schema `logo` is now an ImageObject that points at `/assets/logo.png`.
- `public/assets/site.css`: removed `.logo-mark` and set the logo to 22px tall in the header and 26px in the footer.
- `REPORT.md`: one line updated to say the real logo is in use.

## SVG
**Used.** The potrace output is clean: 5 paths (one per letter) and 4.4 KB. Rasterized back, it matches the knockout PNG at IoU 0.997, with differences only along anti-aliased edges. I also compared them side by side by eye.

## Verification (live preview)
- The GitHub Pages workflow for `f3b2255` passed (build, check, deploy).
- https://colinmspeer-ct.github.io/swyft-hq/ returns **HTTP 200**. `/services/`, `/blog/` and `/about/` also return 200.
- The live HTML references the new logo in all five places: header and footer `img src=/swyft-hq/assets/logo-white.svg` with `alt="Swyft logo"`, the favicon links, the apple-touch-icon, `og:image` (og-default.png), and schema `logo` (assets/logo.png). The old `logo-mark` appears 0 times. A deep blog page was spot-checked too.
- All assets return 200 with correct content types: site.css, site.js, all logo, favicon and icon files, and og-default.png. The live logo.png, og-default.png, apple-touch-icon.png and favicon.svg are byte-identical to the repo copies.
- The local `npm run check` passes (48 pages).

## Not touched / blocked
- DNS, registrar and the GitHub custom domain were not touched. The Pages `cname` is still null.
- Nothing was blocked.
