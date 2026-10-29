---
title: "Site Speed and Conversion: Core Web Vitals for Online Stores"
slug: core-web-vitals-site-speed-ecommerce-conversion
description: "How page speed affects online sales, what Core Web Vitals measure, the thresholds to hit, and the fixes that matter most for Australian ecommerce stores."
cluster: I
category: "Search, AI and storefronts"
products: [storefronts, ai-graphics]
keywords: ["Core Web Vitals ecommerce", "site speed conversion", "LCP INP CLS", "page speed online store", "mobile site speed", "ecommerce performance"]
date: 2026-10-30
reading_minutes: 5
key_stat: "A 0.1s mobile speed improvement lifted retail conversions by 8.4%"
key_stat_source: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html"
sources:
  - title: "Web Vitals"
    publisher: "web.dev (Google)"
    year: 2024
    url: "https://web.dev/articles/vitals"
  - title: "Milliseconds Make Millions"
    publisher: "Deloitte"
    year: 2020
    url: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html"
  - title: "How Rakuten 24's investment in Core Web Vitals increased revenue per visitor by 53.37% and conversion rate by 33.13%"
    publisher: "web.dev (Google)"
    year: 2022
    url: "https://web.dev/case-studies/rakuten"
  - title: "The business impact of Core Web Vitals"
    publisher: "web.dev (Google)"
    year: 2021
    url: "https://web.dev/case-studies/vitals-business-impact"
  - title: "Liquid vs headless: A look at real user web performance"
    publisher: "Shopify Performance"
    year: 2023
    url: "https://performance.shopify.com/blogs/blog/liquid-vs-headless-a-look-at-real-user-web-performance"
  - title: "Adobe: Holiday Shopping Season Drove a Record $257.8 Billion Online"
    publisher: "Adobe"
    year: 2026
    url: "https://news.adobe.com/news/2026/01/adobe-holiday-shopping-season"
  - title: "Australia Post eCommerce Report 2026"
    publisher: "Australia Post"
    year: 2026
    url: "https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf"
  - title: "AI features and your website"
    publisher: "Google Search Central"
    year: 2025
    url: "https://developers.google.com/search/docs/appearance/ai-features"
---

Faster stores sell more. Studies of real retail sites show that even a tenth of a second off mobile load time lifts conversion and order value, and Google's Core Web Vitals give retailers three concrete targets: load the main content within 2.5 seconds, respond to taps within 200 milliseconds, and keep the layout stable. Hitting them on mobile, where most orders are now placed, is one of the most reliable conversion improvements available.

## What Core Web Vitals measure

Google's [Web Vitals guidance](https://web.dev/articles/vitals) defines three metrics and the "good" thresholds for each:

- **Largest Contentful Paint (LCP)**, loading: the main content (usually the hero or product image) should render within **2.5 seconds**.
- **Interaction to Next Paint (INP)**, responsiveness: the page should react to taps and clicks within **200 milliseconds**.
- **Cumulative Layout Shift (CLS)**, visual stability: keep layout shift to **0.1** or less, so buttons do not jump as images and banners load.

A page passes when it meets all three at the 75th percentile of real user visits, measured separately for mobile and desktop. Lab scores from a single test are a guide; field data from real shoppers is what counts.

Speed also matters for discovery. Google lists a good page experience among the SEO fundamentals that apply to its AI features, as set out in its [AI features documentation](https://developers.google.com/search/docs/appearance/ai-features).

## The evidence linking speed to sales

- **Small gains, measurable effect.** In Deloitte's [Milliseconds Make Millions](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html) study (2020), a 0.1 second improvement in mobile site speed was associated with an 8.4% increase in retail conversions and a 9.2% increase in average order value.
- **A controlled test.** Japanese retailer Rakuten 24 ran an A/B test of a Core Web Vitals-optimised version of its site. Google's [case study](https://web.dev/case-studies/rakuten) reports a 33.13% higher conversion rate, 53.37% more revenue per visitor and a 35.12% lower exit rate.
- **Loading the hero image faster.** Vodafone Italy improved LCP by 31% and recorded 8% more sales, according to [web.dev's summary of Core Web Vitals case studies](https://web.dev/case-studies/vitals-business-impact).

Results vary by site and starting point, but the direction is consistent across studies.

## Mobile is where it counts

Mobile shoppers are on slower connections and less forgiving devices. Adobe's [2025 holiday data](https://news.adobe.com/news/2026/01/adobe-holiday-shopping-season) found 56.4% of US online transactions were made on a smartphone. Checkout friction compounds the problem: the [Australia Post eCommerce Report 2026](https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf), citing Shopify research, notes that 52% of Australians have abandoned a cart because checkout was too long or complicated.

Test on a mid-range Android phone on 4G, not the office Wi-Fi.

## The fixes that move the numbers

**For LCP (loading):**
- Serve product images in modern formats (WebP or AVIF), sized for the device, from a CDN.
- Preload the main product or hero image; never lazy-load the image above the fold.
- Render critical HTML on the server so the browser does not wait for JavaScript to build the page.

**For INP (responsiveness):**
- Audit third-party scripts: chat widgets, review widgets, heatmaps, multiple tag managers. Each adds main-thread work. Remove what you do not use.
- Defer non-essential JavaScript until after the page is interactive.

**For CLS (stability):**
- Set width and height on every image and video.
- Reserve space for banners, promo bars and review stars before they load.
- Avoid injecting content above what the shopper is already reading.

**Platform choice matters.** Shopify's performance team found that in September 2023, [59.5% of Shopify Liquid storefront origins passed all Core Web Vitals](https://performance.shopify.com/blogs/blog/liquid-vs-headless-a-look-at-real-user-web-performance), against 43% of all websites. Custom headless builds can be fast, but often are not by default; see our article on [headless and composable storefronts](/insights/headless-composable-commerce-storefronts-guide/).

## How to monitor

Use Search Console's Core Web Vitals report and PageSpeed Insights for field data from the Chrome UX Report. Check product, category and checkout templates separately, because one slow template can drag a whole section of your site. Re-check after every theme change, app install or seasonal campaign banner.

## Key figures

- Good thresholds: LCP within 2.5 seconds, INP of 200 ms or less, CLS of 0.1 or less, at the 75th percentile ([web.dev](https://web.dev/articles/vitals)).
- A 0.1s mobile speed gain lifted retail conversions 8.4% and average order value 9.2% ([Deloitte, 2020](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html)).
- Rakuten 24's optimised version converted 33.13% better and earned 53.37% more revenue per visitor in an A/B test ([web.dev, 2022](https://web.dev/case-studies/rakuten)).
- Vodafone Italy improved LCP by 31% and saw 8% more sales ([web.dev, 2021](https://web.dev/case-studies/vitals-business-impact)).
- 56.4% of US online holiday transactions in 2025 were made on smartphones ([Adobe, 2026](https://news.adobe.com/news/2026/01/adobe-holiday-shopping-season)).

## How eComChannels helps

Most speed problems on retail sites come from heavy images, bloated themes and stacked third-party apps. eComChannels reduces all three.

- **[Branded storefronts](/products/storefronts/)** are built to be fast and SEO- and GEO-ready, and connect directly to eComChannels order management, so stock, catalogue and order data do not need a stack of third-party apps and scripts bolted onto the site. Faster pages mean more of the traffic you pay for turns into orders.
- **[AI graphics](/products/ai-graphics/)** is trained on each marketplace's image rules and produces an image set per channel, so you are not hand-resizing oversized photos for every listing and page; you approve once and publish everywhere.

Better speed with less development overhead. [Book a demo or start a 30-day free trial](/book-a-demo/).

## FAQ

### Do Core Web Vitals affect Google rankings?

Google has described [Core Web Vitals as a ranking signal](https://web.dev/case-studies/vitals-business-impact) within page experience, and a good page experience is among the fundamentals Google recommends. Relevance still matters most, so the bigger payoff from speed is usually conversion, not ranking.

### What is a realistic first target?

Get LCP under 2.5 seconds on mobile for your product page template. It is usually the biggest single lever and is mostly about images and server rendering.

### Should I remove apps to improve speed?

Audit them. Each app or widget that injects scripts adds load and interaction delay. Keep the ones that earn their place and remove the rest.
