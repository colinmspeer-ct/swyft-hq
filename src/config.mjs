// Build-time configuration. Override with environment variables.
//
//   SITE_URL   Absolute origin + base used for canonicals, Open Graph, sitemap.xml.
//              Production (default): https://swyft-hq.com
//              github.io fallback:   https://colinmspeer-ct.github.io/swyft-hq
//   BASE_PATH  Path prefix for every internal link and asset.
//              Production (default): "" (empty, site served from the domain root)
//              github.io fallback:   /swyft-hq
//   FORM_ENDPOINT  Optional. A form backend URL that accepts POSTed FormData
//              (for example a Formspree/Basin/Getform endpoint Colin creates).
//              Empty = forms fall back to opening the visitor's email app
//              addressed to colin@swyft-hq.com (mailto). No endpoint is invented.

const trimSlash = (s) => s.replace(/\/+$/, '');

export const SITE_URL = trimSlash(process.env.SITE_URL ?? 'https://swyft-hq.com');
export const BASE_PATH = trimSlash(process.env.BASE_PATH ?? '');
export const FORM_ENDPOINT = process.env.FORM_ENDPOINT ?? '';
export const BUILD_DATE = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10);
