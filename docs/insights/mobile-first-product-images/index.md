# Mobile-First Product Images: Designing for the Small Screen

URL: https://ecomchannels.com/insights/mobile-first-product-images/
Category: AI graphics & visual commerce
Updated: 2026-10-30

> Nearly every Australian goes online by phone. How to design product images that read at thumbnail size, load fast and zoom well on mobile channels.

Mobile-first product images are designed to work at the size most shoppers actually see them: a thumbnail in a phone's search results, then a gallery swiped with a thumb. That means a product that fills the frame and reads clearly when small, no fine text, high enough resolution to zoom, and files light enough to load quickly on a mobile connection. With 97% of Australian adults going online by mobile phone, images that only look good on a desktop monitor are failing most of your audience.

## Your shoppers are on their phones

The Australian Communications and Media Authority reports that in 2025 the proportion of adults accessing the internet via mobile phone rose to [97%, with 92% using mobile internet daily](https://www.acma.gov.au/articles/2026-02/mobile-phone-internet-use-soars-landline-use-keeps-falling-acma-research-shows). Marketplace apps, social commerce and mobile browsers are now the default shop window.

The mobile experience is also where product pages are weakest. Baymard Institute's 2026 benchmark found only [48% of desktop sites but just 38% of mobile sites have a "decent" or better product page experience](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux). Images are a large part of that gap.

## Design the main image for thumbnail size

On a phone, your main image competes in a grid of tiles a few centimetres wide. To survive at that size:

- **Fill the frame.** Amazon asks for the product to fill [85% of the main image](https://sellercentral.amazon.com/help/hub/reference/external/G1881?locale=en-US). Excess white space makes the product look tiny on a phone.
- **Choose a recognisable angle.** A three-quarter view usually reads better than a flat front view for 3D products.
- **Show one item clearly.** Multiple items, props or complex scenes turn into visual noise at thumbnail size.
- **Mind the crop.** Some channels crop thumbnails differently on mobile. Etsy, for example, crops to square, portrait and landscape in different places and advises sellers to [leave negative space so the product survives every crop](https://help.etsy.com/hc/en-us/articles/115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop). It also compresses uploads and notes that image sizes are optimised for mobile displays.

## Make secondary images legible on a phone

Infographics and feature images are where mobile design most often breaks. Text sized for a desktop becomes unreadable on a 6-inch screen. Keep to a short headline and a few large callouts, use high contrast, and test every image on an actual phone at actual size before publishing. Our guide to [product infographics that sell](https://ecomchannels.com/insights/product-infographics-that-sell/) has more detail.

Put the most important images first. Mobile shoppers swipe in sequence, so the second and third images should answer the biggest questions (scale, fit, what's included).

## Zoom still matters on small screens

Shoppers zoom on phones to inspect texture, stitching and finish. Baymard found [25% of e-commerce sites have product images with insufficient resolution or zoom](https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom) for shoppers to evaluate the product, and that low-resolution images dragged down how users perceived the product itself. Upload at or above each channel's recommended size. On Amazon, images of 1,000 pixels or more on the longest side enable zoom.

## On your own storefront: speed and gallery design

Marketplaces handle image delivery for you. On your own web store, you control it, and images usually decide how fast the page feels.

The HTTP Archive's 2024 Web Almanac found that on [73% of mobile pages, the Largest Contentful Paint (LCP) element is an image](https://almanac.httparchive.org/en/2024/performance). LCP is the Core Web Vitals measure of how quickly the main content appears. Only 59% of mobile pages achieved a good LCP score, compared with 74% on desktop. On a product page, that element is often the main product image.

Practical steps:

1. **Serve responsive images.** Use `srcset` or the `<picture>` element so phones get a smaller file than desktops, with a fallback `src`, as [Google's image SEO guidance](https://developers.google.com/search/docs/appearance/google-images) recommends.
2. **Use modern formats** such as WebP or AVIF where supported, and compress sensibly.
3. **Don't lazy-load the main image.** Lazy-load the gallery images below it, but let the hero load immediately.
4. **Set width and height** to stop the layout jumping as images load.
5. **Use thumbnails, not dots.** Baymard reports [76% of mobile sites don't use thumbnails to represent additional product images](https://baymard.com/research-articles/always-use-thumbnails-additional-images) (2020); dots give shoppers no clue what the other images show.
6. **Support pinch and tap to zoom**, and load a higher-resolution version when the shopper zooms.

## A mobile image checklist

- Product fills most of the frame and is recognisable at thumbnail size
- No small text; any callouts readable on a phone without zooming
- Resolution meets or exceeds each channel's recommended size
- First three images answer the biggest purchase questions
- Storefront images responsive, compressed and correctly sized
- Main image loads first; gallery thumbnails visible

## Key figures

- 97% of Australian adults accessed the internet via mobile phone in 2025; 92% daily ([ACMA, 2026](https://www.acma.gov.au/articles/2026-02/mobile-phone-internet-use-soars-landline-use-keeps-falling-acma-research-shows)).
- Only 38% of mobile sites have a decent or better product page experience, versus 48% on desktop ([Baymard Institute, 2026](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux)).
- The LCP element is an image on 73% of mobile pages; 59% of mobile pages have good LCP versus 74% on desktop ([HTTP Archive, 2024](https://almanac.httparchive.org/en/2024/performance)).
- 76% of mobile sites don't use thumbnails for additional product images ([Baymard Institute, 2020](https://baymard.com/research-articles/always-use-thumbnails-additional-images)).

## How eComChannels helps

Mobile-first images need two things: images built to each channel's rules and display sizes, and a storefront that delivers them quickly.

[eComChannels AI graphics](https://ecomchannels.com/products/ai-graphics/) is trained on each marketplace's image rules, including sizing, framing and text restrictions, and builds a separate image set for each channel from your master photos. Your team approves once and the sets publish everywhere, so every marketplace gets images framed for its own layout rather than one set stretched to fit.

[eComChannels branded storefronts](https://ecomchannels.com/products/storefronts/) are built to be fast and SEO/GEO-ready and connect directly to your order management system, so your own store's product pages show the same approved imagery as your marketplaces, on a site designed for mobile speed.

[Book a demo or start a 30-day free trial](https://ecomchannels.com/book-a-demo/).

## FAQ

### What size should product images be for mobile?

Upload at each channel's recommended size or larger (for example, 1,000 px+ on Amazon, 1,600 px on eBay, 1,500 px on Google) so images stay sharp when zoomed. On your own site, serve smaller responsive versions to phones.

### Does image file size affect conversion?

On your own storefront, large images slow the page, and the main image is often the element that determines Largest Contentful Paint. Compress and size images appropriately so the hero image appears quickly.

### Should I create separate images for mobile?

Usually you don't need separate photography, but you should design secondary images (especially anything with text) so they are legible on a phone, and check how each channel crops thumbnails.

## Sources
- Mobile phone internet use soars as landline use keeps falling, ACMA research shows, Australian Communications and Media Authority (2026): https://www.acma.gov.au/articles/2026-02/mobile-phone-internet-use-soars-landline-use-keeps-falling-acma-research-shows
- Web Almanac 2024: Performance, HTTP Archive (2024): https://almanac.httparchive.org/en/2024/performance
- Product Page UX 2026: 10 Pitfalls and Best Practices, Baymard Institute (2026): https://baymard.com/research-articles/current-state-ecommerce-product-page-ux
- Always Use Thumbnails to Represent Additional Product Images (76% of Mobile Sites Don't), Baymard Institute (2020): https://baymard.com/research-articles/always-use-thumbnails-additional-images
- 25% of E-Commerce Sites Don't Have Product Images with Sufficient Resolution or Level of Zoom, Baymard Institute (2020): https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom
- Requirements and Best Practices for Images in Your Etsy Shop, Etsy Help (2026): https://help.etsy.com/hc/en-us/articles/115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop
- Image SEO Best Practices, Google Search Central (2026): https://developers.google.com/search/docs/appearance/google-images
- Product image guide, Amazon Seller Central (2026): https://sellercentral.amazon.com/help/hub/reference/external/G1881?locale=en-US
