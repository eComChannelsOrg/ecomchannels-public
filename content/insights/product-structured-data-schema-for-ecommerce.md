---
title: "Product Structured Data: A Schema Markup Guide for Online Stores"
slug: product-structured-data-schema-for-ecommerce
description: "How Product schema markup works, which properties Google requires for merchant listings, and why accurate structured data now feeds AI shopping answers too."
cluster: I
category: "Search, AI and storefronts"
products: [storefronts, ai-listing-optimisation]
keywords: ["product structured data", "product schema markup", "merchant listing structured data", "schema.org Product", "rich results ecommerce", "JSON-LD product"]
date: 2026-10-30
reading_minutes: 5
key_stat: "Nestlé measured an 82% higher click-through rate on pages shown as rich results"
key_stat_source: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
sources:
  - title: "Introduction to structured data markup in Google Search"
    publisher: "Google Search Central"
    year: 2025
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
  - title: "Introduction to Product structured data"
    publisher: "Google Search Central"
    year: 2025
    url: "https://developers.google.com/search/docs/appearance/structured-data/product"
  - title: "Merchant listing (Product, Offer) structured data"
    publisher: "Google Search Central"
    year: 2025
    url: "https://developers.google.com/search/docs/appearance/structured-data/merchant-listing"
  - title: "AI features and your website"
    publisher: "Google Search Central"
    year: 2025
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - title: "Let AI do the hard parts of your holiday shopping"
    publisher: "Google"
    year: 2025
    url: "https://blog.google/products-and-platforms/products/shopping/agentic-checkout-holiday-ai-shopping/"
  - title: "Introducing Shopify Agentic Storefronts"
    publisher: "Shopify"
    year: 2025
    url: "https://www.shopify.com/news/winter-26-edition-agentic-storefronts"
  - title: "Agentic Search Surges As 91% Of Australian Commerce Leaders Face Rising Customer Expectations"
    publisher: "Salesforce"
    year: 2026
    url: "https://www.salesforce.com/au/news/stories/sate-of-commerce-anz-data-agentic-search-2026/"
---

Product structured data is code, usually JSON-LD using the schema.org `Product` and `Offer` types, that tells search engines exactly what a page sells: name, image, price, currency, availability, shipping, returns, reviews and identifiers. Google uses it to show richer product results and to qualify pages for merchant listing experiences, and AI search features read the same facts. Accurate markup that matches the visible page is one of the cheapest visibility gains a retailer can make.

## What structured data does

A product page is written for people. Structured data restates its key facts in a fixed vocabulary machines can read without guessing. Google says that with [Product markup](https://developers.google.com/search/docs/appearance/structured-data/product), price, availability, review ratings and shipping details can appear directly in Search, including Google Images and Google Lens.

The evidence for click-through gains comes from Google's own published case studies. On its [introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), Google reports that Rotten Tomatoes measured a 25% higher click-through rate on 100,000 pages with structured data, the Food Network saw a 35% increase in visits after enabling search features on 80% of pages, and Nestlé measured an 82% higher click-through rate on pages shown as rich results. These are not retail-only results, but the mechanism (a more informative listing earns more clicks) is the same.

## Product snippets or merchant listings?

Google separates two use cases:

- **Product snippets** for pages where people cannot buy directly, such as review or comparison pages.
- **Merchant listings** for pages where customers can purchase from you. These support more detail, including apparel sizing, shipping and return policy information.

If you sell online, use merchant listing markup. Google notes that pages with the required merchant listing properties are generally eligible for product snippets as well.

## The properties that matter

Google's [merchant listing documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) sets the requirements. At minimum:

- `name` and `image` on the `Product`;
- an `offers` block with `price` (or `priceSpecification.price`) and `priceCurrency`.

Then add the recommended properties, because each one adds eligibility for more enhancements and gives AI systems more to compare:

- `availability` (InStock, OutOfStock, PreOrder and so on);
- `gtin`, `mpn`, `sku` and `brand` to identify the exact product;
- `color`, `size`, `material`, `pattern` for attribute filtering;
- `inProductGroupWithID` and variant markup for products sold in sizes or colours;
- `shippingDetails` with rate, destination and handling and transit times;
- `hasMerchantReturnPolicy` for return window and cost;
- `aggregateRating` and `review` where you have genuine reviews.

Google also recommends adding store-wide return policy and loyalty programme markup nested under your `Organization`.

## Common mistakes that cost visibility

- **Markup that disagrees with the page.** Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) asks site owners to make sure structured data matches the visible text. A sale price in the markup and a full price on the page is a fast way to lose eligibility.
- **Stale prices and stock.** Google warns a listing may not display if `priceValidUntil` is in the past. Markup hard-coded in templates rather than generated from live data drifts quickly.
- **Missing identifiers.** Without GTINs, engines struggle to match your offer to the same product sold elsewhere, which matters when an assistant compares retailers.
- **Australian specifics left as defaults.** Currency must be AUD, shipping destinations must be Australian regions, and GST-inclusive prices should match what the shopper pays.
- **Reviews that are not genuine.** Review markup must follow Google's review snippet guidelines; only mark up real customer reviews shown on the page.

Validate with Google's Rich Results Test and monitor the Merchant listings and Product snippets reports in Search Console.

## Why it matters more with AI search

Google says AI Mode shopping answers are powered by its Shopping Graph of [more than 50 billion listings](https://blog.google/products-and-platforms/products/shopping/agentic-checkout-holiday-ai-shopping/), built from feeds and pages like yours. Commerce platforms are doing similar work: Shopify describes its Catalog as structuring data so AI can understand it, inferring categories, extracting attributes and consolidating variants for [AI channels such as ChatGPT and Perplexity](https://www.shopify.com/news/winter-26-edition-agentic-storefronts).

Australian retailers are responding. [Salesforce's 2026 ANZ research](https://www.salesforce.com/au/news/stories/sate-of-commerce-anz-data-agentic-search-2026/) found 43% of Australian commerce organisations are improving product content quality and 40% are submitting data feeds to AI search platforms. Structured data on your own pages is the foundation those efforts sit on. Read more in our guide to [generative engine optimisation](/insights/generative-engine-optimisation-geo-for-retailers/).

## Key figures

- Rotten Tomatoes measured a 25% higher click-through rate on pages with structured data ([Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).
- Nestlé measured an 82% higher click-through rate for pages shown as rich results ([Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).
- The Food Network saw a 35% increase in visits after enabling search features on 80% of its pages ([Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).
- Google's Shopping Graph holds more than 50 billion product listings, 2 billion refreshed hourly ([Google, 2025](https://blog.google/products-and-platforms/products/shopping/agentic-checkout-holiday-ai-shopping/)).
- 43% of Australian commerce organisations are improving product content quality for AI discovery ([Salesforce, 2026](https://www.salesforce.com/au/news/stories/sate-of-commerce-anz-data-agentic-search-2026/)).

## How eComChannels helps

Structured data is only as good as the product record behind it. Most errors come from markup maintained separately from the catalogue.

- **[Branded storefronts](/products/storefronts/)** are built SEO- and GEO-ready and connected to the live catalogue and stock in eComChannels, so the product facts on each page, and the structured data describing them, come from the same record as your marketplace listings rather than a separately maintained template. When price or stock changes, the page reflects it.
- **[AI listing optimisation](/products/ai-listing-optimisation/)** fills the attribute gaps (material, size, colour, GTIN, compatibility) in one master product record. AI drafts the missing fields, your team approves them, and bulk updates flow to the storefront markup and to every marketplace listing at once.

That means more products eligible for rich results and AI shopping answers, without a developer hand-editing JSON-LD. [Book a demo or start a 30-day free trial](/book-a-demo/).

## FAQ

### Does structured data improve rankings?

Its main job is to help search engines understand the page and qualify it for rich results and shopping features. The measurable gains in Google's published case studies come from richer listings earning more clicks, so treat it as a visibility and click-through lever rather than a ranking shortcut.

### JSON-LD, Microdata or RDFa?

Google says all three formats are equally fine if valid, and recommends JSON-LD as usually easiest to implement and maintain because it sits in one block rather than being woven through the HTML.

### Do I still need a Merchant Center feed if I have structured data?

They complement each other. Feeds give Google bulk, scheduled data; on-page markup confirms facts at the page level. Keeping both consistent is what matters.
