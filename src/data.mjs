// Single source of truth for business facts. Keep identical in schema and llms.txt.
//
// Industries are config-driven. To add one later:
//   1. Append an entry to `industries` below.
//   2. Add content/industries/{key}.mjs exporting the page (the build throws if it is missing).
// Do not add an industry that has not been approved for the site.

export const business = {
  name: 'Swyft',
  legalName: 'Swyft Solutions LLC',
  alternateName: 'Swyft Solutions',
  domain: 'swyft-hq.com',
  email: 'colin@swyft-hq.com',
  phone: '267-606-8667',
  phoneE164: '+12676068667',
  founder: 'Colin Speer',
  tagline: 'The outsourced door-to-door sales company.',
  oneLiner:
    'Swyft Solutions LLC recruits, trains, houses, and manages door-to-door sales teams that sell for home-service and telecom companies. The client pays a revenue share per account. Swyft runs the team.',
  areaServed: 'United States',
};

export const industries = [
  { key: 'exteriors', url: '/industries/exteriors/', name: 'Exteriors', nav: 'Exteriors', lead: true },
  { key: 'window-cleaning', url: '/industries/window-cleaning/', name: 'Window cleaning', nav: 'Window cleaning' },
  { key: 'pest-control', url: '/industries/pest-control/', name: 'Pest control', nav: 'Pest control' },
  { key: 'lawn-care', url: '/industries/lawn-care/', name: 'Lawn care', nav: 'Lawn care' },
  { key: 'fiber-internet', url: '/industries/fiber-internet/', name: 'Fiber internet', nav: 'Fiber internet' },
  { key: 'interior-home-improvement', url: '/industries/interior-home-improvement/', name: 'Interior home improvement', nav: 'Interior home improvement' },
  { key: 'home-security', url: '/industries/home-security/', name: 'Home security', nav: 'Home security' },
  { key: 'water-treatment', url: '/industries/water-treatment/', name: 'Water treatment', nav: 'Water treatment' },
  { key: 'hvac', url: '/industries/hvac/', name: 'HVAC', nav: 'HVAC' },
];

export const nav = [
  ['/industries/', 'Industries'],
  ['/how-it-works/', 'How it works'],
  ['/partner/', 'Partner'],
  ['/careers/', 'Careers'],
  ['/about/', 'About'],
];

export const serviceInterestOptions = [
  'Exteriors and roofing',
  'Window cleaning',
  'Pest control',
  'Lawn care',
  'Fiber internet (AT&T fiber and wireless)',
  'Interior home improvement',
  'Home security systems',
  'Water treatment and filtration',
  'HVAC',
  'Not sure which industry yet',
];

export const knowsAbout = [
  { name: 'Door-to-door sales', wiki: 'https://en.wikipedia.org/wiki/Door-to-door', wikidata: 'https://www.wikidata.org/wiki/Q688702' },
  { name: 'Roof', wiki: 'https://en.wikipedia.org/wiki/Roof', wikidata: 'https://www.wikidata.org/wiki/Q83180' },
  { name: 'Pest control', wiki: 'https://en.wikipedia.org/wiki/Pest_control', wikidata: 'https://www.wikidata.org/wiki/Q2306047' },
  { name: 'Lawn care', wiki: 'https://en.wikipedia.org/wiki/Lawn', wikidata: 'https://www.wikidata.org/wiki/Q207766' },
  { name: 'Window cleaner', wiki: 'https://en.wikipedia.org/wiki/Window_cleaner', wikidata: 'https://www.wikidata.org/wiki/Q8024196' },
  { name: 'Heating, ventilation, and air conditioning', wiki: 'https://en.wikipedia.org/wiki/Heating,_ventilation,_and_air_conditioning', wikidata: 'https://www.wikidata.org/wiki/Q1798773' },
  { name: 'Water purification', wiki: 'https://en.wikipedia.org/wiki/Water_purification', wikidata: 'https://www.wikidata.org/wiki/Q550861' },
  { name: 'Security alarm', wiki: 'https://en.wikipedia.org/wiki/Security_alarm', wikidata: 'https://www.wikidata.org/wiki/Q7301230' },
  { name: 'Fiber to the x', wiki: 'https://en.wikipedia.org/wiki/Fiber_to_the_x', wikidata: 'https://www.wikidata.org/wiki/Q1412843' },
];
