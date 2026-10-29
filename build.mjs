// Static site generator for ecomchannels.com. No dependencies: `node build.mjs` writes docs/ (served by GitHub Pages).
import { mkdirSync, writeFileSync, readFileSync, rmSync, copyFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hubVisual, graphicsCompare, listingCompare, cardVisual, shippingFlow, reconVisual } from './visuals.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'docs');
const SITE = 'https://ecomchannels.com';
const NAME = 'eComChannels';
const EMAIL = 'support@ecomchannels.com';
const LASTMOD = process.env.LASTMOD || new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- logos (logos-src/ -> docs/logos/; monochrome Simple Icons get their brand colour) ----------
const brandColour = { amazon: '#FF9900', ebay: '#E53238', shopify: '#7AB55C', woocommerce: '#96588A', tiktok: '#000000', facebook: '#0866FF', instagram: '#E4405F', youtube: '#FF0000', pinterest: '#BD081C', xiaohongshu: '#FF2442', linkedin: '#0A66C2', x: '#000000', threads: '#000000' };
function logoFile(key) {
  for (const ext of ['svg', 'png']) if (existsSync(join(ROOT, 'logos-src', `${key}.${ext}`))) return `/logos/${key}.${ext}`;
  throw new Error(`missing logo ${key}`);
}

// ---------- channels ----------
// Marketplaces and retail channels, ranked by the annual revenue of the company that operates them.
// FX for ranking only: US$1 = A$1.53, EUR1 = A$1.78 (approximate). Figures are each company's latest full year.
const FX = { USD: 1.53, EUR: 1.78, AUD: 1 };
const marketplaceData = [
  { key: 'amazon', name: 'Amazon Australia', desc: 'Amazon marketplace listings, orders and dispatch confirmations.', operator: 'Amazon.com, Inc.', rev: 716.9, cur: 'USD', unit: 'billion', period: '2025 net sales', src: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Fourth-Quarter-Results/' },
  { key: 'tiktok', name: 'TikTok Shop', desc: 'Product listings and content for TikTok Shop.', operator: 'ByteDance Ltd (private)', rev: 155, cur: 'USD', unit: 'billion', period: '2024 revenue, as reported by Bloomberg', src: 'https://www.bloomberg.com/news/articles/2025-04-11/tiktok-drives-bytedance-s-29-growth-while-china-business-slows' },
  { key: 'temu', name: 'Temu (Local Seller)', desc: 'Listings and orders for Temu’s local seller program.', operator: 'PDD Holdings Inc.', rev: 61.8, cur: 'USD', unit: 'billion', period: '2025 revenue', src: 'https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-fourth-quarter-2025-and-fiscal-year-2025' },
  { key: 'woolworths', name: 'Woolworths Everyday Market', desc: 'Products, orders and fulfilment for Everyday Market on woolworths.com.au (Woolworths MarketPlus).', operator: 'Woolworths Group', rev: 71.5, cur: 'AUD', unit: 'billion', period: 'F26 sales', src: 'https://www.woolworthsgroup.com.au/content/dam/wwg/investors/asx-announcements/2026/3108623.pdf' },
  { key: 'bigw', name: 'BIG W Market', desc: 'Listings and orders for BIG W Market (Woolworths MarketPlus).', operator: 'Woolworths Group', rev: 71.5, cur: 'AUD', unit: 'billion', period: 'F26 sales', src: 'https://www.woolworthsgroup.com.au/content/dam/wwg/investors/asx-announcements/2026/3108623.pdf' },
  { key: 'mydeal', name: 'MyDeal', desc: 'MyDeal closed on 30 September 2025 and its sellers moved to BIG W Market and Everyday Market, which eComChannels supports.', operator: 'Woolworths Group', rev: 71.5, cur: 'AUD', unit: 'billion', period: 'F26 sales', src: 'https://www.woolworthsgroup.com.au/content/dam/wwg/investors/asx-announcements/2025/2908067.pdf', note: 'Now part of BIG W Market' },
  { key: 'bunnings', name: 'Bunnings Marketplace', desc: 'Offers, orders and shipments for Bunnings Marketplace.', operator: 'Wesfarmers Limited', rev: 47.3, cur: 'AUD', unit: 'billion', period: 'FY26 revenue', src: 'https://wesfarmers.gcs-web.com/static-files/489bbff3-8cc4-41d9-8e10-2f8c07a65a67' },
  { key: 'kmart', name: 'Kmart Marketplace', desc: 'Listings and orders for curated sellers on Kmart Marketplace.', operator: 'Wesfarmers Limited', rev: 47.3, cur: 'AUD', unit: 'billion', period: 'FY26 revenue', src: 'https://wesfarmers.gcs-web.com/static-files/489bbff3-8cc4-41d9-8e10-2f8c07a65a67' },
  { key: 'ebay', name: 'eBay Australia', desc: 'eBay listings, stock levels and order fulfilment.', operator: 'eBay Inc.', rev: 11.1, cur: 'USD', unit: 'billion', period: '2025 revenue', src: 'https://www.sec.gov/Archives/edgar/data/1065088/000106508826000017/exhibit991erebayq42025.htm' },
  { key: 'etsy', name: 'Etsy', desc: 'Listings and orders for Etsy shops.', operator: 'Etsy, Inc.', rev: 2.88, cur: 'USD', unit: 'billion', period: '2025 revenue', src: 'https://investors.etsy.com/news-events/press-releases/detail/218/etsy-inc-reports-fourth-quarter-and-full-year-2025-results' },
  { key: 'myer', name: 'Myer Marketplace', desc: 'Listings and orders for Myer Marketplace.', operator: 'Myer Holdings (Myer Group)', rev: 4.09, cur: 'AUD', unit: 'billion', period: 'FY26 total sales', src: 'https://investor.myer.com.au/DownloadFile.axd?file=/Report/ComNews/20260923/03138508.pdf' },
  { key: 'theiconic', name: 'THE ICONIC Marketplace', desc: 'Fashion and lifestyle listings for THE ICONIC Marketplace.', operator: 'Global Fashion Group', rev: 679.8, cur: 'EUR', unit: 'million', period: '2025 revenue', src: 'https://ir.global-fashion-group.com/financial-news' },
  { key: 'lasoo', name: 'Lasoo', desc: 'Listings and orders for the Lasoo marketplace.', operator: 'IVE Group', rev: 937.4, cur: 'AUD', unit: 'million', period: 'FY26 revenue', src: 'https://www.ivegroup.com.au/news/ive-releases-full-year-result-in-line-with-guidance-as-2030-strategy-progresses' },
  { key: 'templewebster', name: 'Temple & Webster', desc: 'Product feeds and orders for Temple & Webster suppliers.', operator: 'Temple & Webster Group', rev: 664.6, cur: 'AUD', unit: 'million', period: 'FY26 revenue', src: 'https://www.templeandwebstergroup.com.au/FormBuilder/_Resource/_module/7ik7dYsBn029bNaEl1204g/docs/reports/TPW_Appendix_4E_Financial_Report_2026.pdf' },
  { key: 'babybunting', name: 'Baby Bunting Marketplace', desc: 'Listings and orders for Baby Bunting Marketplace.', operator: 'Baby Bunting Group', rev: 556.0, cur: 'AUD', unit: 'million', period: 'FY26 sales', src: 'https://assets.contentstack.io/v3/assets/bltee50a64aa85c8d90/blt218d927fc4966196/6a7e447b5751aa64947e309e/BBN_-_2026_Annual_Report_-_14_Aug_2026.pdf' },
  { key: 'kogan', name: 'Kogan Marketplace', desc: 'Kogan.com orders, stock and tracking updates.', operator: 'Kogan.com Ltd', rev: 510.7, cur: 'AUD', unit: 'million', period: 'FY26 revenue', src: 'https://announcements.asx.com.au/asxpdf/20260824/pdf/0733sjhpgwc4p8.pdf' },
].map((m, i) => ({ ...m, order: i, aud: m.rev * FX[m.cur] * (m.unit === 'million' ? 0.001 : 1) }))
  .sort((a, b) => b.aud - a.aud || a.order - b.order);
const curSym = { USD: 'US$', AUD: 'A$', EUR: '€' };
const revText = (m) => `${curSym[m.cur]}${m.rev.toLocaleString('en-AU')} ${m.unit}`;
const channels = {
  marketplaces: marketplaceData.map((m) => [m.key, m.name, m.desc]),
  stores: [
    ['shopify', 'Shopify', 'Shopify orders, products, prices and stock kept in sync.'],
    ['woocommerce', 'WooCommerce', 'Listing content for WooCommerce stores.'],
  ],
  carriers: [
    ['auspost', 'Australia Post', 'Labels, manifests and tracking for Australia Post parcels.'],
    ['startrack', 'StarTrack', 'StarTrack consignments booked from the same shipping screen.'],
    ['couriersplease', 'CouriersPlease', 'CouriersPlease bookings, labels, tracking and claims.'],
    ['alliedexpress', 'Allied Express', 'Allied Express jobs for bulky and heavy freight.'],
  ],
  social: [
    ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['youtube', 'YouTube'], ['linkedin', 'LinkedIn'],
    ['pinterest', 'Pinterest'], ['x', 'X'], ['threads', 'Threads'], ['xiaohongshu', 'RedNote (Xiaohongshu)'],
  ],
};
const activeMarketplaces = () => channels.marketplaces.filter(([k]) => k !== 'mydeal');
const logoRow = (list) => `<ul class="logos">${list.map(([k, n]) => `<li><img src="${logoFile(k)}" alt="${esc(n)} logo" width="40" height="40" loading="lazy"><span>${esc(n)}</span></li>`).join('')}</ul>`;
const logoCards = (list, tag = 'h3') => `<div class="grid">${list.map(([k, n, d]) => `<article class="card logo-card"><img src="${logoFile(k)}" alt="${esc(n)} logo" width="48" height="48" loading="lazy"><div><${tag}>${esc(n)}</${tag}><p>${esc(d)}</p></div></article>`).join('')}</div>`;

// ---------- products ----------
const products = [
  {
    slug: 'ai-listing-optimisation', short: 'AI listing optimisation', icon: '✍️',
    title: 'AI listing optimisation for marketplaces | eComChannels',
    description: 'Listing AI already trained on each marketplace’s rules writes titles, bullets and descriptions for Amazon, Woolworths, BIG W, Bunnings, Kmart and more.',
    h1: 'AI listing optimisation for every marketplace',
    summary: 'AI already trained on each marketplace’s listing rules writes titles, bullet points, descriptions and attributes, and your team approves them before they go live.',
    lead: 'Write a product once. The eComChannels listing AI is already trained on the listing rules of every marketplace we support, so it adapts titles, bullet points, descriptions and attributes to each channel straight away. Your team reviews and approves the copy before it is published.',
    features: [
      ['Already trained on every marketplace’s rules', 'Title lengths, bullet counts, banned words, required attributes and category rules are already trained into the AI for each marketplace, so there is no set-up before your first listing.'],
      ['AI drafts, people approve', 'AI produces the first draft from your product data. Nothing goes live until a reviewer approves it, and every approved version is kept.'],
      ['One product record', 'A single master product feeds every channel, so a correction is made once and flows to every listing.'],
      ['Keyword and content research', 'AI-assisted product research suggests the terms shoppers use, to help listings be found in marketplace search.'],
      ['Bulk updates', 'Optimise a whole range at once instead of editing listings one marketplace at a time.'],
      ['Consistent brand voice', 'Copy follows your own style guide across Amazon, eBay, Kogan, Bunnings and your web store.'],
    ],
    extra: () => `<section class="alt"><div class="wrap"><h2>Before and after</h2>${listingCompare(logoFile)}</div></section><section><div class="wrap"><h2>Marketplaces the listing AI is trained for</h2>${logoRow([...activeMarketplaces(), ...channels.stores])}<p class="note">Plus your own web store on the <a href="/products/storefronts/">eComChannels storefront engine</a>.</p></div></section>`,
    faq: [
      ['Which marketplaces is the listing AI trained for?', 'It is already trained on the listing rules of Amazon, TikTok Shop, Temu, Woolworths Everyday Market, BIG W Market, Bunnings Marketplace, Kmart Marketplace, eBay, Etsy, Myer Marketplace, THE ICONIC, Lasoo, Temple & Webster, Baby Bunting and Kogan, plus Shopify, WooCommerce and eComChannels storefronts.'],
      ['Does AI publish listings automatically?', 'No. The AI drafts to each marketplace’s trained rules, and a person on your team approves them before they are published.'],
    ],
  },
  {
    slug: 'ai-shipping', short: 'AI auto shipping', icon: '📦',
    title: 'AI auto shipping for Australian couriers | eComChannels',
    description: 'Book Australia Post, StarTrack, CouriersPlease and Allied Express from one screen: labels, manifests and tracking sent to every channel automatically.',
    h1: 'AI auto shipping for Australian retailers',
    summary: 'Book Australia Post, StarTrack, CouriersPlease and Allied Express from one screen, with labels, manifests and tracking sent back automatically.',
    lead: 'Ship every order from one screen. eComChannels books the courier, prints the label, manifests the shipment and sends tracking back to the customer and the marketplace automatically.',
    features: [
      ['All your courier accounts in one place', 'Connect Australia Post, StarTrack, CouriersPlease and Allied Express accounts and ship with each from the same workflow.'],
      ['Automatic labels', 'Labels are created from the order’s address, weight and dimensions, ready to print in batches.'],
      ['Manifests', 'Close out the day’s shipments per courier with a manifest, without re-keying consignments.'],
      ['Tracking sent back automatically', 'As soon as a shipment is labelled, tracking numbers go back to the customer and to the marketplace the order came from.'],
      ['Shipment status board', 'See every parcel move from labelled to manifested to tracking sent, so nothing is missed at cut-off.'],
      ['Courier claims', 'Lodge and follow up lost or damaged parcel claims next to the shipment they belong to.'],
    ],
    extra: () => `<section class="alt"><div class="wrap"><h2>From order to tracking, automatically</h2>${shippingFlow(logoFile, channels.carriers)}</div></section><section><div class="wrap"><h2>Supported couriers</h2>${logoCards(channels.carriers)}</div></section>`,
    faq: [
      ['Which couriers does eComChannels shipping support?', 'Australia Post, StarTrack, CouriersPlease and Allied Express.'],
      ['Is tracking sent to marketplaces automatically?', 'Yes. Once a shipment is labelled, its tracking number is sent back to the customer and to the marketplace or store the order came from.'],
    ],
  },
  {
    slug: 'ai-graphics', short: 'AI graphics', icon: '🎨',
    title: 'AI product graphics for online retailers | eComChannels',
    description: 'Graphics AI already trained on each marketplace’s image rules creates product images and infographics, with one approval for every channel.',
    h1: 'AI graphics for e-commerce and online retailers',
    summary: 'AI already trained on every marketplace’s image rules produces product images, infographics and lifestyle shots, with one approval per image set.',
    lead: 'Every marketplace wants different product images. The eComChannels graphics AI is already trained on each marketplace’s image rules (image count, sizes, backgrounds and infographic slots), produces the graphics to match, and publishes approved images to every channel that uses the set.',
    features: [
      ['Already trained on every marketplace’s image rules', 'Image count, sizes, white-background and infographic slot rules for each marketplace are already trained into the AI and kept as image sets, so every graphic is made to spec.'],
      ['AI-assisted creation', 'AI helps generate and edit product graphics, lifestyle scenes and infographics from your product data and photos.'],
      ['Approve once, publish everywhere', 'Approving a product’s images for a set publishes them to every channel on that set.'],
      ['Designer workflow', 'Queues for designers and approvers show what is missing, what is waiting for review and what is ready.'],
      ['Organised by SKU', 'Images, documents and videos are stored per SKU, in slot order, ready for listings and your web store.'],
      ['Readiness at a glance', 'See which products are ready for which channels before you list them.'],
    ],
    extra: () => `<section class="alt"><div class="wrap"><h2>Before and after</h2>${graphicsCompare()}</div></section><section><div class="wrap"><h2>Marketplaces the graphics AI is trained for</h2>${logoRow([...activeMarketplaces(), ...channels.stores])}</div></section>`,
    faq: [
      ['How does eComChannels handle different marketplace image rules?', 'Each marketplace is mapped to an image set that holds its slot rules. Designers produce images to the set, and approval publishes them to every channel that uses it.'],
      ['Can AI create product images?', 'Yes. The graphics AI, already trained on each marketplace’s image rules, generates and edits product graphics, and every image is reviewed before it is approved for a channel.'],
    ],
  },
  {
    slug: 'finance-reconciliation', short: 'Finance auto reconciliation', icon: '💰',
    title: 'Marketplace auto reconciliation for retailers | eComChannels',
    description: 'Reconcile marketplace remittances and settlements against orders automatically, with fee rules and reports. Amazon, eBay, Kogan, Bunnings and more.',
    h1: 'Finance auto reconciliation for marketplaces and online retailers',
    summary: 'Match every marketplace remittance and settlement to the orders it pays for, with fee rules, exceptions and finance reports.',
    lead: 'Marketplaces pay in batches, net of commissions and fees. eComChannels imports each remittance, matches every line to its order, applies your fee and settlement rules and shows what is paid, short-paid or missing.',
    features: [
      ['Remittance import', 'Upload or import remittance and settlement files from each marketplace, with a saved import layout per channel.'],
      ['Automatic order matching', 'Each payout line is matched to its sales order and invoice, so only the exceptions need a person.'],
      ['Fee and settlement rules', 'Commission, fee and settlement rules per channel explain the difference between the sale and the payout.'],
      ['Exceptions first', 'Short payments, unmatched lines and unpaid orders are flagged for follow-up.'],
      ['Finance dashboard and reports', 'See receipts, fees and outstanding amounts by channel and period.'],
      ['Invoices from orders', 'Invoices are generated from sales orders, so finance works from the same data as operations.'],
    ],
    extra: () => `<section class="alt"><div class="wrap"><h2>How payouts are matched</h2>${reconVisual()}</div></section><section><div class="wrap"><h2>Reconcile payouts from</h2>${logoRow([...activeMarketplaces().filter(([k]) => k !== 'tiktok'), channels.stores[0]])}</div></section>`,
    faq: [
      ['What does marketplace reconciliation mean?', 'Checking that every order sold on a marketplace was paid for, at the right amount after commission and fees, by matching remittance or settlement lines to orders.'],
      ['Which channels can be reconciled?', 'Any marketplace or store whose remittance or settlement report can be imported, including Amazon, Temu, Woolworths Everyday Market, BIG W Market, Bunnings Marketplace, Kmart Marketplace, eBay, Etsy, Myer Marketplace, THE ICONIC, Lasoo, Temple & Webster, Baby Bunting and Kogan and Shopify.'],
    ],
  },
  {
    slug: 'ai-social-media-marketing', short: 'AI social media outreach', icon: '📣',
    title: 'AI social media marketing for retailers | eComChannels',
    description: 'AI plans, writes and schedules posts for Facebook, Instagram, TikTok, YouTube, LinkedIn, Pinterest, X, Threads and RedNote, with human approval.',
    h1: 'AI social media outreach on every major platform',
    summary: 'AI plans and writes posts for Facebook, Instagram, TikTok, YouTube, LinkedIn, Pinterest, X, Threads and RedNote, then publishes after approval.',
    lead: 'Keep every social channel active without writing every post by hand. eComChannels uses AI to plan content from your live products and campaigns, writes copy for each platform, and publishes once your team approves.',
    features: [
      ['Plans from your real campaigns', 'AI reads your live products and campaigns, so posts promote real offers rather than invented ones.'],
      ['Copy for each platform', 'Each post gets its own version per platform: length, tone, hashtags and format suited to Facebook, Instagram, TikTok, LinkedIn and the rest.'],
      ['Approval before publishing', 'Every post is a versioned draft that a person approves before it is published.'],
      ['Content calendar', 'See what is planned, approved and published across every account in one calendar.'],
      ['Product images ready to use', 'Posts draw on the product graphics already approved in eComChannels.'],
      ['One place for every account', 'Manage brand accounts across platforms from the same system that runs your orders.'],
    ],
    extra: () => `<section class="alt"><div class="wrap"><h2>Social platforms</h2>${logoRow(channels.social)}</div></section>`,
    faq: [
      ['Which social media platforms does eComChannels support?', 'Facebook, Instagram, TikTok, YouTube, LinkedIn, Pinterest, X, Threads and RedNote (Xiaohongshu).'],
      ['Does AI post without approval?', 'No. AI drafts and schedules posts, and each one is approved by a person before it is published.'],
    ],
  },
  {
    slug: 'order-management', short: 'Order management (OMS)', icon: '🧭',
    title: 'Multichannel order management system (OMS) | eComChannels',
    description: 'The eComChannels OMS brings orders, inventory, purchasing, pricing, B2B and customer service for every marketplace and web store into one system.',
    h1: 'Multichannel order management system (OMS)',
    summary: 'One queue for every order and one stock figure for every SKU, across all your marketplaces and stores.',
    lead: 'The core of eComChannels: a cloud order management system that brings every order, every stock movement and every product into one place. It runs in the browser; there is nothing to install.',
    features: [
      ['One order queue', 'Orders from every marketplace and store arrive in one queue to be allocated, picked, packed and shipped.'],
      ['Inventory and warehouses', 'One stock position per SKU across warehouses, pushed to every channel to prevent overselling.'],
      ['Pricing', 'Price books and pricing rules per channel and country, including tax handling.'],
      ['Purchasing', 'Purchase orders, goods receiving and supplier information next to the products they belong to.'],
      ['B2B and wholesale', 'Serve trade customers from the same catalogue and stock as your retail channels.'],
      ['Customer service', 'A shared team inbox with the order in view, so support can answer without switching systems.'],
    ],
    extra: () => `<section class="alt"><div class="wrap"><h2>Connected channels</h2>${logoRow([...activeMarketplaces().filter(([k]) => k !== 'tiktok'), channels.stores[0]])}<p class="note"><a href="/channels/">See all channels, couriers and platforms</a></p></div></section>`,
    faq: [
      ['What does an order management system (OMS) do?', 'An OMS collects orders from every place you sell, keeps one accurate stock figure per product and runs fulfilment, with tracking sent back to each sales channel.'],
      ['Does eComChannels prevent overselling?', 'Stock is held centrally per SKU and the available quantity is pushed to each connected channel, so a sale on one marketplace reduces what is offered on the others.'],
    ],
  },
  {
    slug: 'storefronts', short: 'Branded storefronts', icon: '🛍️',
    title: 'Fast, SEO-friendly branded web storefronts | eComChannels',
    description: 'Your own branded online store on the eComChannels storefront engine: SEO and AI-search friendly, with products, prices and stock from the OMS.',
    h1: 'Branded storefronts, connected to your OMS',
    summary: 'Your own fast, search-friendly web store, with products, prices and stock fed by the OMS.',
    lead: 'The eComChannels storefront engine powers branded web stores. Each store has its own theme and content, while products, prices and stock come directly from the order management system.',
    features: [
      ['Search and AI friendly', 'Server-rendered pages, clean URLs, XML sitemaps, canonical tags, schema.org structured data and llms.txt for AI assistants.'],
      ['Fed by the OMS', 'Products, prices and stock are pushed from the OMS, and web orders flow into the same order queue as your marketplaces.'],
      ['Your brand, your theme', 'Each store has its own Liquid theme and content.'],
      ['Checkout and payments', 'Cart and checkout with online payment providers built in.'],
    ],
    extra: () => '',
    faq: [
      ['Can I run my own online store with eComChannels?', 'Yes. The storefront engine powers branded web stores with server-rendered, search-friendly pages, and products, prices and stock come straight from the OMS.'],
    ],
  },
];

const generalFaq = [
  ['What is eComChannels?', 'eComChannels is a multichannel commerce platform for online retailers. Its products cover AI listing optimisation, AI auto shipping, AI graphics, finance auto reconciliation, AI social media outreach, order management and branded storefronts, all working from the same product and order data.'],
  ['Which sales channels does eComChannels work with?', 'Amazon, TikTok Shop, Temu, Woolworths Everyday Market, BIG W Market, Bunnings Marketplace, Kmart Marketplace, eBay, Etsy, Myer Marketplace, THE ICONIC, Lasoo, Temple & Webster, Baby Bunting and Kogan, plus Shopify, WooCommerce and eComChannels storefronts. Marketplaces built on Mirakl connect through the same integration. MyDeal closed in September 2025 and its sellers now trade on BIG W Market and Everyday Market.'],
  ['Which is the biggest online marketplace in Australia?', 'By the annual revenue of the company behind it, Amazon is the largest, followed by TikTok Shop (ByteDance), Temu (PDD Holdings), Woolworths Group (Everyday Market and BIG W Market) and Wesfarmers (Bunnings and Kmart marketplaces). The full ranking with sources is at https://ecomchannels.com/channels/.'],
  ['Which couriers are supported?', 'Australia Post, StarTrack, CouriersPlease and Allied Express.'],
  ['Is there a free trial?', 'Yes. eComChannels products are currently available on a 30-day free trial. Book a demo or request a trial and our team will set you up and show you around.'],
  ['How do I book a demo?', 'Use the Book a demo page to tell us about your business and choose a preferred time. Our team will confirm the time and walk you through the products live.'],
  ['Can I use only one product?', 'Talk to us about the products you need. Each product works from the same central product and order data.'],
  ['How do I get started?', `Book a demo or request your 30-day free trial at ${SITE}/book-a-demo/, or email ${EMAIL}.`],
];
const allFaq = [...generalFaq, ...products.flatMap((p) => p.faq)];

// ---------- layout ----------
const nav = [['/', 'Home'], ['/products/', 'Products'], ['/channels/', 'Channels'], ['/faq/', 'FAQ'], ['/contact/', 'Contact'], ['/book-a-demo/', 'Book a demo']];
const orgLd = {
  '@type': 'Organization', '@id': `${SITE}/#organization`, name: NAME, url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 200, height: 200 }, image: `${SITE}/og.png`, email: EMAIL,
  sameAs: ['https://www.linkedin.com/company/ecomchannels'], foundingDate: '2022', areaServed: { '@type': 'Country', name: 'Australia' },
  address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
  knowsAbout: ['Multichannel ecommerce', 'Order management systems', 'Online marketplaces in Australia', 'Marketplace listing optimisation', 'Ecommerce shipping automation', 'Marketplace reconciliation', 'AI product graphics', 'Social media marketing'],
  description: 'Multichannel commerce platform for online retailers: AI listing optimisation, shipping, graphics, reconciliation, social media, order management and storefronts.',
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: EMAIL, availableLanguage: ['en'] }],
};
const siteLd = { '@type': 'WebSite', '@id': `${SITE}/#website`, name: NAME, url: `${SITE}/`, publisher: { '@id': `${SITE}/#organization` }, inLanguage: 'en' };

function page({ path, title, description, h1, lead, body, ld = [], trail = [], noCta, visual = '' }) {
  const url = `${SITE}${path}`;
  const graph = [orgLd, siteLd, { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#organization` }, inLanguage: 'en', dateModified: LASTMOD }, ...ld];
  if (path !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ...trail].map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: `${SITE}${p}` })) });
  const crumbsHtml = path === '/' ? '' : `<nav class="crumbs" aria-label="Breadcrumb">${[['Home', '/'], ...trail].map(([n, p], i, a) => (i === a.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="${p}">${esc(n)}</a>`)).join(' / ')}</nav>`;
  const section = '/' + (path.split('/')[1] || '') + (path === '/' ? '' : '/');
  const navHtml = nav.map(([href, label]) => `<a href="${href}"${href === path || (href !== '/' && href === section) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-48.png" sizes="48x48" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="author" content="${NAME}">
<meta property="article:modified_time" content="${LASTMOD}">
<meta name="theme-color" content="#0b3d91">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NAME}">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="alternate" type="text/markdown" title="Markdown version of this page" href="${path === '/404' ? '/index.md' : path + 'index.md'}">
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap">
<a class="brand" href="/" aria-label="${NAME} home"><img src="/logo-64.png" alt="" width="36" height="36"><span>eCom<b>Channels</b></span></a>
<nav aria-label="Main">${navHtml}</nav>
</div></header>
<main id="main">
<section class="hero${path === '/' ? ' hero-home' : ''}${visual ? ' has-visual' : ''}"><div class="wrap">
<div class="hero-text">
${crumbsHtml}
<h1>${esc(h1)}</h1>
<p class="lead">${lead}</p>
${noCta ? '' : `<p class="cta"><a class="btn" href="/book-a-demo/">Book a demo</a> <a class="btn ghost" href="/book-a-demo/?type=trial">Start 30-day free trial</a></p>${path === '/' ? '<p class="trial-note">Free for 30 days. Our team sets you up and walks you through the platform.</p>' : ''}`}
</div>${visual ? `<div class="hero-visual">${visual}</div>` : ''}
</div></section>
${body}
</main>
<footer class="site-footer"><div class="wrap">
<div><p class="brand-foot">eCom<b>Channels</b></p><p>Multichannel commerce platform for online retailers.</p></div>
<nav aria-label="Products">${products.map((p) => `<a href="/products/${p.slug}/">${esc(p.short)}</a>`).join('')}</nav>
<nav aria-label="Footer">${nav.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}</nav>
<p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
<p class="small">Last updated <time datetime="${LASTMOD}">${LASTMOD}</time>. &copy; ${new Date().getFullYear()} ${NAME}. Marketplace, courier and social platform names and logos belong to their owners and are shown only to indicate compatibility.</p>
</div></footer>
</body>
</html>
`;
}

const rankTable = () => `<div class="table-wrap"><table class="rank"><caption>Sales channels ranked by operator revenue</caption><thead><tr><th scope="col">Rank</th><th scope="col">Channel</th><th scope="col">Operated by</th><th scope="col">Annual revenue</th><th scope="col">Source</th></tr></thead><tbody>${marketplaceData.map((m, i) => `<tr><td>${i + 1}</td><td><img src="${logoFile(m.key)}" alt="" width="24" height="24" loading="lazy"> ${esc(m.name)}${m.note ? ` <small>(${esc(m.note)})</small>` : ''}</td><td>${esc(m.operator)}</td><td>${esc(revText(m))} <small>${esc(m.period)}</small></td><td><a href="${esc(m.src)}" rel="nofollow noopener">source</a></td></tr>`).join('')}</tbody></table></div>`;
const cards = (items, tag = 'h3') => `<div class="grid">${items.map(([t, d]) => `<article class="card"><${tag}>${esc(t)}</${tag}><p>${esc(d)}</p></article>`).join('')}</div>`;
const faqHtml = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary><h3>${esc(q)}</h3></summary><p>${esc(a)}</p></details>`).join('')}</div>`;
const faqLd = (items) => ({ '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const ctaBand = `<section class="band"><div class="wrap"><h2>See eComChannels in action</h2><p>Book a live demo and our team will walk you through the products using your own channels and workflow. All products are currently available on a 30-day free trial.</p><p class="cta center"><a class="btn light" href="/book-a-demo/">Book a demo</a> <a class="btn ghost" href="/book-a-demo/?type=trial">Start 30-day free trial</a></p></div></section>`;
const productCards = `<div class="grid products">${products.map((p) => `<article class="card product"><a class="cv-link" href="/products/${p.slug}/" tabindex="-1" aria-hidden="true">${cardVisual(p.slug, logoFile, channels)}</a><h3><a href="/products/${p.slug}/">${esc(p.short)}</a></h3><p>${esc(p.summary)}</p></article>`).join('')}</div>`;
const softwareLd = (p) => ({
  '@type': 'SoftwareApplication', '@id': `${SITE}/products/${p.slug}/#software`, name: `${NAME} ${p.short}`, applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser', url: `${SITE}/products/${p.slug}/`, description: p.description, publisher: { '@id': `${SITE}/#organization` }, featureList: p.features.map(([t]) => t),
});

const pages = [
  {
    path: '/', title: 'eComChannels | AI commerce platform for online retailers',
    description: 'AI listing optimisation, auto shipping, graphics, reconciliation, social media and order management for retailers on Amazon, eBay, Kogan and Bunnings.',
    h1: 'AI tools that run your online retail, on every channel',
    visual: hubVisual(logoFile, activeMarketplaces(), channels.carriers),
    lead: 'eComChannels is a multichannel commerce platform for online retailers: AI listing optimisation, auto shipping, product graphics, finance reconciliation and social media outreach, built on one order management system for every marketplace and store.',
    ld: [{ '@type': 'ItemList', name: 'eComChannels products', itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.short, url: `${SITE}/products/${p.slug}/` })) }, faqLd(generalFaq.slice(0, 4))],
    body: `
<section><div class="wrap"><h2>Products</h2>${productCards}</div></section>
<section class="alt"><div class="wrap"><h2>See the difference: product graphics</h2><p class="sub">One phone snapshot becomes a full image set made to each marketplace's rules.</p>${graphicsCompare()}</div></section>
<section><div class="wrap"><h2>See the difference: product listings</h2><p class="sub">Thin supplier data becomes a listing written for each marketplace.</p>${listingCompare(logoFile)}</div></section>
<section class="alt"><div class="wrap">
<h2>Marketplaces and stores</h2>${logoRow([...activeMarketplaces(), ...channels.stores])}
<h2 class="mt">Couriers</h2>${logoRow(channels.carriers)}
<h2 class="mt">Social platforms</h2>${logoRow(channels.social)}
</div></section>
<section><div class="wrap">
<h2>Why retailers run every channel from one platform</h2>
<ul class="ticks">
<li><b>One product record.</b> AI adapts it to every marketplace, so a correction is made once.</li>
<li><b>One stock figure.</b> Inventory is held centrally per SKU and pushed to each channel, which reduces overselling.</li>
<li><b>One shipping workflow.</b> Every courier, label and tracking update from one screen.</li>
<li><b>One set of numbers.</b> Payouts are matched to orders, so finance and operations agree.</li>
</ul>
</div></section>
<section class="alt"><div class="wrap"><h2>Frequently asked questions</h2>${faqHtml(generalFaq.slice(0, 4))}<p><a href="/faq/">More questions and answers</a></p></div></section>
${ctaBand}`,
  },
  {
    path: '/products/', title: 'Products: AI listing, shipping, graphics | eComChannels',
    description: 'eComChannels products: AI listing optimisation, AI auto shipping, AI graphics, auto reconciliation, AI social media outreach, OMS and storefronts.',
    h1: 'eComChannels products', trail: [['Products', '/products/']],
    lead: 'Seven products for online retailers, all working from the same product, order and stock data.',
    body: `<section><div class="wrap">${productCards}</div></section>${ctaBand}`,
  },
  ...products.map((p) => ({
    path: `/products/${p.slug}/`, title: p.title, description: p.description, h1: p.h1, lead: p.lead, visual: `<div class="hero-card">${cardVisual(p.slug, logoFile, channels)}</div>`,
    trail: [['Products', '/products/'], [p.short, `/products/${p.slug}/`]],
    ld: [softwareLd(p), faqLd(p.faq)],
    body: `<section><div class="wrap"><h2>Features</h2>${cards(p.features)}</div></section>${p.extra()}
<section><div class="wrap"><h2>Questions about ${esc(p.short)}</h2>${faqHtml(p.faq)}</div></section>
<section class="alt"><div class="wrap"><h2>Other eComChannels products</h2><ul class="links">${products.filter((o) => o !== p).map((o) => `<li><a href="/products/${o.slug}/">${esc(o.short)}</a>: ${esc(o.summary)}</li>`).join('')}</ul></div></section>${ctaBand}`,
  })),
  {
    path: '/channels/', title: 'Australian marketplaces ranked by size | eComChannels',
    description: 'Australian online sales channels ranked by company size: Amazon, TikTok Shop, Temu, Woolworths, BIG W, Bunnings, Kmart, eBay, Myer, Lasoo and more.',
    h1: 'Sales channels, couriers and platforms', trail: [['Channels', '/channels/']],
    lead: 'The Australian marketplaces, web store platforms, couriers and social platforms eComChannels works with, with marketplaces ranked by the size of the company behind them.',
    ld: [{ '@type': 'ItemList', name: 'Australian online sales channels ranked by operator revenue', itemListOrder: 'https://schema.org/ItemListOrderDescending', itemListElement: marketplaceData.map((m, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Thing', name: m.name, description: `Operated by ${m.operator}. ${revText(m)} (${m.period}).` } })) }, { '@type': 'ItemList', name: 'Couriers and social platforms supported by eComChannels', itemListElement: [...channels.stores, ...channels.carriers, ...channels.social].map(([, n], i) => ({ '@type': 'ListItem', position: i + 1, name: n })) }],
    body: `<section><div class="wrap"><h2>Australian sales channels ranked by company size</h2><p>Ranked by the latest full-year revenue of the company that operates each channel. Figures are in each company's reporting currency and were converted at approximate exchange rates (US$1 = A$1.53, €1 = A$1.78) for ranking only.</p>${rankTable()}</div></section>
<section class="alt"><div class="wrap"><h2>Marketplaces</h2>${logoCards(channels.marketplaces)}<p class="note">Marketplaces that run on Mirakl connect through the same integration.</p></div></section>
<section><div class="wrap"><h2>Web stores</h2>${logoCards(channels.stores)}<p class="note">Plus branded stores on the <a href="/products/storefronts/">eComChannels storefront engine</a>.</p></div></section>
<section class="alt"><div class="wrap"><h2>Couriers</h2>${logoCards(channels.carriers)}<p class="note">See <a href="/products/ai-shipping/">AI auto shipping</a>.</p></div></section>
<section><div class="wrap"><h2>Social media platforms</h2>${logoRow(channels.social)}<p class="note">See <a href="/products/ai-social-media-marketing/">AI social media outreach</a>.</p></div></section>
<section><div class="wrap"><p>Need a channel that is not listed? <a href="/contact/">Tell us</a>.</p></div></section>${ctaBand}`,
  },
  {
    path: '/book-a-demo/', title: 'Book a demo or 30-day free trial | eComChannels',
    description: 'Book a live demo of eComChannels or start a 30-day free trial. Our team shows you AI listings, shipping, graphics, reconciliation and social media tools.',
    h1: 'Book a demo or start your 30-day free trial', trail: [['Book a demo', '/book-a-demo/']], noCta: true,
    lead: 'Tell us a little about your business and when suits you. Our team will confirm a time and show you eComChannels live, using the channels you sell on. All products are currently available free for 30 days.',
    ld: [{ '@type': 'ContactPage', name: 'Book an eComChannels demo', url: `${SITE}/book-a-demo/`, potentialAction: { '@type': 'ReserveAction', name: 'Book a demo', target: `${SITE}/book-a-demo/` } }],
    body: `<section><div class="wrap">
<div class="booking">
<div class="cal" id="cal">
<div class="cal-head"><img src="/logo-64.png" alt="" width="48" height="48"><div><b>eComChannels product demo</b><span>Live walkthrough with our team</span></div></div>
<div class="cal-meta"><span>⏱ 30 minutes</span><span>💻 Online video call</span><span>🎁 30-day free trial available</span></div>
<div class="cal-body">
<div class="cal-month"><button type="button" id="cal-prev" aria-label="Previous month">‹</button><span id="cal-label">Choose a date</span><button type="button" id="cal-next" aria-label="Next month">›</button></div>
<div class="cal-grid" id="cal-grid" role="grid" aria-label="Available dates"></div>
<p class="slots-title" id="slots-title">Select a date to see available times</p>
<div class="slots" id="slots" role="listbox" aria-label="Available times"></div>
<p class="tz" id="tz"></p>
<noscript><p>Our booking calendar needs JavaScript. Email <a href="mailto:${EMAIL}?subject=Demo%20request">${EMAIL}</a> with two or three times that suit you.</p></noscript>
</div>
</div>
<form id="demo" class="form" novalidate>
<div class="chosen empty" id="chosen" role="status">Pick a date and time in the calendar</div>
<fieldset class="choice"><legend>I would like</legend>
<label><input type="radio" name="type" value="demo" checked> A live demo</label>
<label><input type="radio" name="type" value="trial"> A demo and a 30-day free trial</label>
</fieldset>
<div class="row2">
<label>Your name *<input name="name" required autocomplete="name"></label>
<label>Work email *<input name="email" type="email" required autocomplete="email"></label>
</div>
<div class="row2">
<label>Company *<input name="company" required autocomplete="organization"></label>
<label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
</div>
<label>Website<input name="website" type="url" placeholder="https://"></label>
<fieldset><legend>Products you are interested in</legend><div class="checks">${products.map((p) => `<label><input type="checkbox" name="products" value="${esc(p.short)}"> ${esc(p.short)}</label>`).join('')}</div></fieldset>
<fieldset><legend>Where you sell today</legend><div class="checks">${[...activeMarketplaces(), ...channels.stores].map(([, n]) => `<label><input type="checkbox" name="channels" value="${esc(n)}"> ${esc(n)}</label>`).join('')}<label><input type="checkbox" name="channels" value="Other"> Other</label></div></fieldset>
<label>Orders per month<select name="orders"><option value="">Choose…</option><option>Under 500</option><option>500 to 2,000</option><option>2,000 to 10,000</option><option>Over 10,000</option></select></label>
<label>Anything else we should know?<textarea name="notes" rows="3"></textarea></label>
<p><button class="btn" type="submit" id="book-btn">Confirm booking request</button></p>
<p class="small-note" id="demo-status">We confirm every booking by email, usually within one business day. Prefer to write? Email <a href="mailto:${EMAIL}?subject=Demo%20request">${EMAIL}</a>.</p>
<div class="done" id="done" role="status"></div>
</form>
</div>
</div></section>
<section class="alt"><div class="wrap narrow"><h2>What happens next</h2>
<ol class="steps"><li>We confirm your demo time by email, usually within one business day.</li><li>A product specialist walks you through the products that matter to you, live, using your channels.</li><li>If it fits, we set up your 30-day free trial.</li></ol>
</div></section>
<script src="/book.js" defer></script>`,
  },
  {
    path: '/faq/', title: 'FAQ: AI multichannel commerce for retailers | eComChannels',
    description: 'Answers about eComChannels products: AI listings, shipping couriers, AI graphics, marketplace reconciliation, social media, OMS and storefronts.',
    h1: 'Frequently asked questions', trail: [['FAQ', '/faq/']],
    lead: 'Short answers about eComChannels and its products.',
    ld: [faqLd(allFaq)],
    body: `<section><div class="wrap">${faqHtml(allFaq)}</div></section>${ctaBand}`,
  },
  {
    path: '/contact/', title: 'Contact eComChannels | Enquiries and support',
    description: `Contact eComChannels about AI listing optimisation, shipping, graphics, reconciliation, social media or order management. Email ${EMAIL}.`,
    h1: 'Contact eComChannels', trail: [['Contact', '/contact/']], noCta: true,
    lead: `Email us at <a href="mailto:${EMAIL}">${EMAIL}</a>.`,
    ld: [{ '@type': 'ContactPage', name: 'Contact eComChannels', url: `${SITE}/contact/` }],
    body: `<section><div class="wrap narrow">
<h2>Book a demo or free trial</h2>
<p>The quickest way to see eComChannels is a live demo with our team. <a href="/book-a-demo/">Book a demo</a> or <a href="/book-a-demo/?type=trial">start your 30-day free trial</a>.</p>
<h2>Making an enquiry?</h2>
<p>To help us reply quickly, please include:</p>
<ul class="ticks"><li>Your business name and website</li><li>The channels you sell on today (for example Amazon, eBay, Kogan, Bunnings, Shopify)</li><li>Which products you are interested in</li><li>Roughly how many orders you handle per month</li></ul>
<p><a class="btn" href="mailto:${EMAIL}?subject=eComChannels%20enquiry">Email ${EMAIL}</a></p>
<h2>Existing customers</h2>
<p>For help with your eComChannels account, email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
</div></section>`,
  },
];

// ---------- Markdown / agent files ----------
function htmlToText(h) {
  return h
    .replace(/<script[\s\S]*?<\/script>/g, '').replace(/<p class="cta[^"]*">[\s\S]*?<\/p>/g, '').replace(/<img [^>]*alt="([^"]+)"[^>]*>/g, ' [Image: $1] ')
    .replace(/<form[\s\S]*?<\/form>/g, `\nBooking form: request a demo or a 30-day free trial at ${SITE}/book-a-demo/ or email ${EMAIL}.\n`)
    .replace(/<table[\s\S]*?<\/table>/g, (t) => '\n' + [...t.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => '| ' + [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => c[1].replace(/<a href="([^"]+)"[^>]*>[^<]*<\/a>/g, '$1').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).join(' | ') + ' |').map((l, i) => (i === 1 ? '| --- '.repeat(l.split(' | ').length) + '|\n' + l : l)).join('\n') + '\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '\n### $1\n')
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (m, href, t) => `[${t.replace(/<[^>]+>/g, '')}](${href.startsWith('/') ? SITE + href : href})`)
    .replace(/<\/p>|<br>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ').replace(/\n /g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
function toMarkdown(p, html) {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const body = main.slice(main.indexOf('</h1>') + 5);
  return `# ${p.h1}\n\nURL: ${SITE}${p.path}\nUpdated: ${LASTMOD}\n\n> ${p.description}\n\n${htmlToText(body)}\n`;
}
function agentsMd() {
  return `# eComChannels: guide for AI agents

eComChannels (${SITE}) is an Australian multichannel commerce platform for online retailers, based in Melbourne. All products are currently available on a 30-day free trial.

## What you can do for a user
- **Book a demo or start a 30-day free trial:** send an email to ${EMAIL} with the subject "Demo request: <company>" or "30-day free trial request: <company>". Include the person's name, work email, company, website, the products they want (see below), the channels they sell on and their orders per month. A person on the team replies, usually within one business day. The form for humans is ${SITE}/book-a-demo/.
- **Answer questions** using ${SITE}/llms-full.txt, which holds every page in Markdown. Each page also has a Markdown version at <page URL>index.md.

## Products
${products.map((p) => `- [${p.short}](${SITE}/products/${p.slug}/): ${p.summary}`).join('\n')}

## Sales channels (ranked by operator revenue)
${marketplaceData.map((m, i) => `${i + 1}. ${m.name}, operated by ${m.operator} (${revText(m)}, ${m.period})${m.note ? ' (' + m.note + ')' : ''}`).join('\n')}

Web store platforms: ${channels.stores.map(([, n]) => n).join(', ')} and eComChannels storefronts. Couriers: ${channels.carriers.map(([, n]) => n).join(', ')}. Social platforms: ${channels.social.map(([, n]) => n).join(', ')}.

## Rules for agents
- Do not invent prices, discounts or integrations that are not listed here. For pricing, ask the team at ${EMAIL}.
- The site has no login, cart or checkout. Customer accounts are set up by the team after a demo.
`;
}

// ---------- write ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'logos'), { recursive: true });
for (const f of readdirSync(join(ROOT, 'logos-src'))) {
  const key = f.replace(/\.\w+$/, '');
  if (f.endsWith('.svg') && brandColour[key]) {
    writeFileSync(join(OUT, 'logos', f), readFileSync(join(ROOT, 'logos-src', f), 'utf8').replace('<svg ', `<svg fill="${brandColour[key]}" `));
  } else copyFileSync(join(ROOT, 'logos-src', f), join(OUT, 'logos', f));
}
const mdPages = [];
for (const p of pages) {
  const dir = join(OUT, p.path);
  mkdirSync(dir, { recursive: true });
  const html = page(p);
  writeFileSync(join(dir, 'index.html'), html);
  const md = toMarkdown(p, html);
  writeFileSync(join(dir, 'index.md'), md);
  mdPages.push(md);
}
writeFileSync(join(OUT, 'llms-full.txt'), `# eComChannels: full site content\n\n> Every page of ${SITE} in Markdown, for AI assistants and agents. Updated ${LASTMOD}.\n\n${mdPages.join('\n\n---\n\n')}\n`);
writeFileSync(join(OUT, 'agents.md'), agentsMd());
writeFileSync(join(OUT, '404.html'), page({ path: '/404', title: 'Page not found | eComChannels', description: 'This page does not exist.', h1: 'Page not found', lead: 'The page you asked for does not exist. Try the <a href="/">home page</a>.', body: '', trail: [['Page not found', '/404']] })
  .replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">').replace(/<link rel="canonical"[^>]*>\n/, ''));
for (const f of readdirSync(join(ROOT, 'static'))) copyFileSync(join(ROOT, 'static', f), join(OUT, f));
mkdirSync(join(OUT, 'examples'), { recursive: true });
for (const f of readdirSync(join(ROOT, 'static-examples'))) copyFileSync(join(ROOT, 'static-examples', f), join(OUT, 'examples', f));


writeFileSync(join(OUT, 'CNAME'), 'ecomchannels.com'); // same bytes GitHub writes, so rebuilds don't diff
writeFileSync(join(OUT, '.nojekyll'), '');
const aiBots = ['Googlebot', 'Bingbot', 'Google-Extended', 'GoogleOther', 'Applebot', 'Applebot-Extended', 'OAI-SearchBot', 'ChatGPT-User', 'ChatGPT Agent', 'GPTBot', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'meta-externalagent', 'meta-externalfetcher', 'meta-webindexer', 'FacebookBot', 'facebookexternalhit', 'Muse', 'GrokBot', 'Grok Bot', 'GrokAgent', 'xAI-Grok', 'DuckAssistBot', 'Amazonbot', 'MistralAI-User', 'cohere-ai', 'YouBot', 'CCBot'];
writeFileSync(join(OUT, 'robots.txt'), `# ecomchannels.com welcomes search engines and AI assistants.
# AI summaries: ${SITE}/llms.txt (short) and ${SITE}/llms-full.txt (full). Agent guide: ${SITE}/agents.md
# Every page also has a Markdown version at <page>/index.md.

User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'llms.txt'), `# eComChannels

> eComChannels is a multichannel commerce platform for online retailers: AI listing optimisation, AI auto shipping, AI graphics, finance auto reconciliation, AI social media outreach, a cloud order management system (OMS) and branded storefronts.

Contact: ${EMAIL}
Full content for AI: ${SITE}/llms-full.txt
Agent guide: ${SITE}/agents.md
Sales channels ranked by company size: ${SITE}/channels/
Book a demo or a 30-day free trial: ${SITE}/book-a-demo/ (all products are currently on a 30-day free trial)

## Products
${products.map((p) => `- [${p.short}](${SITE}/products/${p.slug}/): ${p.summary}`).join('\n')}

## Channels
- Marketplaces (ranked by operator revenue): ${marketplaceData.map((m) => m.name + ' (' + m.operator + ')').join(', ')}
- Web stores: ${channels.stores.map(([, n]) => n).join(', ')}, eComChannels storefronts
- Couriers: ${channels.carriers.map(([, n]) => n).join(', ')}
- Social platforms: ${channels.social.map(([, n]) => n).join(', ')}

## Pages
${pages.map((p) => `- [${p.h1}](${SITE}${p.path}): ${p.description}`).join('\n')}

## FAQ
${allFaq.map(([q, a]) => `### ${q}\n${a}`).join('\n\n')}
`);
console.log(`built ${pages.length} pages -> ${OUT}`);
