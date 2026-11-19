// Single source of truth for business facts. Keep identical everywhere (site, schema, llms.txt).

export const business = {
  name: 'Swyft',
  legalNameNote: 'Colin\'s Lovable draft used "Swyft Solutions"',
  alternateName: 'Swyft Solutions',
  domain: 'swyft-hq.com',
  email: 'colin@swyft-hq.com',
  phone: '267-606-8667',
  phoneE164: '+12676068667',
  founder: 'Colin Speer',
  tagline: 'Every channel. One growth engine.',
  oneLiner:
    'Swyft is the marketing company for pest control and route-based home service businesses: door-to-door sales teams, cold calling and appointment setting, and digital marketing with local SEO, under one roof.',
  areaServed: 'United States',
};

export const divisions = [
  { key: 'marketing', name: 'Swyft Marketing', tag: 'Door-to-door', body: 'Trained field reps knocking in your service area, booking real appointments for your crews.', service: 'door-to-door-sales-teams' },
  { key: 'digital', name: 'Swyft Digital', tag: 'Ads + Local SEO', body: 'Meta ads, Google ads, and local SEO engineered to make your phone ring, not vanity metrics.', service: 'digital-marketing' },
  { key: 'outbound', name: 'Swyft Outbound', tag: 'Calls + Email', body: 'Cold calling and cold email that open commercial accounts and revive dead leads.', service: 'cold-calling-appointment-setting' },
];

// Money pages: services
export const services = [
  { key: 'door-to-door-sales-teams', url: '/services/door-to-door-sales-teams/', name: 'Door-to-Door Sales Teams', short: 'D2D sales teams', division: 'Swyft Marketing', blurb: 'Recruited, trained, managed field reps who knock your best territories and book real appointments.' },
  { key: 'cold-calling-appointment-setting', url: '/services/cold-calling-appointment-setting/', name: 'Cold Calling & Appointment Setting', short: 'Cold calling', division: 'Swyft Outbound', blurb: 'Live callers and cold email that land commercial accounts, revive old estimates, and fill your calendar.' },
  { key: 'pest-control-seo', url: '/services/pest-control-seo/', name: 'Pest Control SEO', short: 'Pest control SEO', division: 'Swyft Digital', blurb: 'Pest-by-pest and city-by-city pages, technical SEO, and content that ranks your pest company organically.' },
  { key: 'local-seo-google-business-profile', url: '/services/local-seo-google-business-profile/', name: 'Local SEO & Google Business Profile Management', short: 'Local SEO & GBP', division: 'Swyft Digital', blurb: 'Google Business Profile optimization, reviews, and local SEO to win the map pack where you run routes.' },
  { key: 'digital-marketing', url: '/services/digital-marketing/', name: 'Digital Marketing: Meta & Google Ads', short: 'Meta & Google ads', division: 'Swyft Digital', blurb: 'Meta ads, Google Search and Local Services Ads, landing pages, and call tracking measured in booked jobs.' },
];

// Money pages: industries. Draft trades: Roofing, Solar, Pest Control, HVAC, Plumbing, Windows,
// Lawn Care, Pool Service, Home Security, Painting, Gutters, Fencing (+ Cleaning in Digital/Outbound).
export const industries = [
  { key: 'pest-control', url: '/industries/pest-control-marketing/', name: 'Pest Control', label: 'Pest control marketing' },
  { key: 'lawn-care', url: '/industries/lawn-care-marketing/', name: 'Lawn Care', label: 'Lawn care marketing' },
  { key: 'hvac', url: '/industries/hvac-marketing/', name: 'HVAC', label: 'HVAC marketing' },
  { key: 'cleaning', url: '/industries/cleaning-business-marketing/', name: 'Cleaning', label: 'Cleaning business marketing' },
  { key: 'pool', url: '/industries/pool-service-marketing/', name: 'Pool Service', label: 'Pool service marketing' },
  { key: 'solar', url: '/industries/solar-marketing/', name: 'Solar', label: 'Solar marketing' },
  { key: 'plumbing', url: '/industries/plumbing-marketing/', name: 'Plumbing', label: 'Plumbing marketing' },
  { key: 'windows', url: '/industries/window-company-marketing/', name: 'Windows', label: 'Window company marketing' },
  { key: 'home-security', url: '/industries/home-security-marketing/', name: 'Home Security', label: 'Home security marketing' },
];

export const trades = ['Pest Control', 'Lawn Care', 'HVAC', 'Cleaning', 'Pool Service', 'Solar', 'Plumbing', 'Windows', 'Home Security', 'Roofing', 'Painting', 'Gutters', 'Fencing'];

export const serviceInterestOptions = [
  'Door-to-door sales teams (Swyft Marketing)',
  'Cold calling & appointment setting (Swyft Outbound)',
  'Pest control SEO',
  'Local SEO & Google Business Profile',
  'Meta & Google ads (Swyft Digital)',
  'All channels / not sure yet',
];

// knowsAbout entities with Wikipedia / Wikidata references.
export const knowsAbout = [
  { name: 'Door-to-door sales', wiki: 'https://en.wikipedia.org/wiki/Door-to-door', wikidata: 'https://www.wikidata.org/wiki/Q688702' },
  { name: 'Cold calling', wiki: 'https://en.wikipedia.org/wiki/Cold_calling', wikidata: 'https://www.wikidata.org/wiki/Q935918' },
  { name: 'Search engine optimization', wiki: 'https://en.wikipedia.org/wiki/Search_engine_optimization', wikidata: 'https://www.wikidata.org/wiki/Q180711' },
  { name: 'Local search engine optimisation', wiki: 'https://en.wikipedia.org/wiki/Local_search_engine_optimisation', wikidata: 'https://www.wikidata.org/wiki/Q30324357' },
  { name: 'Google Business Profile (Google Maps business listings)', wiki: 'https://en.wikipedia.org/wiki/Google_Maps#Business_listings', wikidata: 'https://www.wikidata.org/wiki/Q12013' },
  { name: 'Pest control', wiki: 'https://en.wikipedia.org/wiki/Pest_control', wikidata: 'https://www.wikidata.org/wiki/Q2306047' },
  { name: 'Lawn care', wiki: 'https://en.wikipedia.org/wiki/Lawn', wikidata: 'https://www.wikidata.org/wiki/Q207766' },
  { name: 'Heating, ventilation, and air conditioning', wiki: 'https://en.wikipedia.org/wiki/Heating,_ventilation,_and_air_conditioning', wikidata: 'https://www.wikidata.org/wiki/Q1798773' },
  { name: 'Online advertising', wiki: 'https://en.wikipedia.org/wiki/Online_advertising', wikidata: 'https://www.wikidata.org/wiki/Q624902' },
];
