---
title: "Agentic Commerce Explained: ACP, UCP and What Retailers Need"
slug: agentic-commerce-protocols-acp-ucp-explained
description: "Agentic commerce lets AI agents find and buy products for shoppers. Here is how ACP, UCP and AP2 work, what is live in Australia, and how to get ready."
cluster: I
category: "Search, AI and storefronts"
products: [order-management, ai-listing-optimisation, storefronts]
keywords: ["agentic commerce", "Agentic Commerce Protocol", "Universal Commerce Protocol", "AP2", "AI agents checkout", "agentic commerce Australia"]
date: 2026-10-30
reading_minutes: 5
key_stat: "AI agents could mediate US$3 trillion to US$5 trillion of global consumer commerce by 2030"
key_stat_source: "https://mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants"
sources:
  - title: "The agentic commerce opportunity: How AI agents are ushering in a new era for consumers and merchants"
    publisher: "McKinsey & Company"
    year: 2025
    url: "https://mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants"
  - title: "Buy it in ChatGPT: Instant Checkout and the Agentic Commerce Protocol"
    publisher: "OpenAI"
    year: 2025
    url: "https://openai.com/index/buy-it-in-chatgpt/"
  - title: "Stripe powers Instant Checkout in ChatGPT and releases Agentic Commerce Protocol codeveloped with OpenAI"
    publisher: "Stripe"
    year: 2025
    url: "https://stripe.com/newsroom/news/stripe-openai-instant-checkout"
  - title: "The AI platform shift and the opportunity ahead for retail"
    publisher: "Google"
    year: 2026
    url: "https://blog.google/company-news/inside-google/message-ceo/nrf-2026-remarks/"
  - title: "How we're helping retailers thrive with new Universal Commerce Protocol features and AI tools on Google"
    publisher: "Google"
    year: 2026
    url: "https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live/"
  - title: "About the Universal Commerce Protocol (UCP) and UCP-powered checkout feature on Google"
    publisher: "Google Merchant Center Help"
    year: 2026
    url: "https://support.google.com/merchants/answer/16837055?hl=en"
  - title: "Australia Post eCommerce Report 2026"
    publisher: "Australia Post"
    year: 2026
    url: "https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf"
  - title: "Agentic Search Surges As 91% Of Australian Commerce Leaders Face Rising Customer Expectations"
    publisher: "Salesforce"
    year: 2026
    url: "https://www.salesforce.com/au/news/stories/sate-of-commerce-anz-data-agentic-search-2026/"
  - title: "Introducing Shopify Agentic Storefronts"
    publisher: "Shopify"
    year: 2025
    url: "https://www.shopify.com/news/winter-26-edition-agentic-storefronts"
---

Agentic commerce is shopping where an AI agent acts for the buyer: it finds products, compares them, and with permission completes checkout inside a chat or search interface. Open protocols such as OpenAI and Stripe's Agentic Commerce Protocol (ACP) and Google's Universal Commerce Protocol (UCP) standardise how agents read product data and pass orders to merchants, who stay the seller of record. For Australian retailers the immediate task is not building an agent; it is making catalogue, stock, pricing and order handling reliable enough for agents to trust.

## What agentic commerce is, in practice

Today's AI assistants mostly recommend. Agentic commerce goes one step further: the assistant can place the order. A shopper might ask for "a waterproof hiking boot under $150 that can arrive by Friday", approve the agent's pick, and pay with stored credentials without visiting the retailer's site.

McKinsey estimates that, even in moderate scenarios, [AI agents could mediate US$3 trillion to US$5 trillion of global consumer commerce by 2030](https://mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants), with up to US$1 trillion in US B2C retail alone. Those are projections, not current sales, but the infrastructure is being built now.

## The protocols, briefly

**Agentic Commerce Protocol (ACP).** Released in September 2025 by [OpenAI](https://openai.com/index/buy-it-in-chatgpt/) and [Stripe](https://stripe.com/newsroom/news/stripe-openai-instant-checkout) as an open standard. It powers Instant Checkout in ChatGPT, launched first for US users buying from US Etsy sellers. Orders flow from ChatGPT to the merchant's backend; the merchant accepts or declines, charges payment, handles tax, fulfilment and returns with its existing systems, and pays a fee on completed purchases. Stripe's Shared Payment Token lets the agent start a payment without exposing the buyer's card details.

**Universal Commerce Protocol (UCP).** [Announced by Google at NRF in January 2026](https://blog.google/company-news/inside-google/message-ceo/nrf-2026-remarks/) as an open-source standard covering discovery, checkout and post-purchase support. Google's [Merchant Center help page](https://support.google.com/merchants/answer/16837055?hl=en) says UCP is compatible with Agent2Agent (A2A), Agent Payments Protocol (AP2) and Model Context Protocol (MCP), and that the UCP-powered checkout applies to products eligible in the United States, Canada and Australia for participating merchants. Only listings using the `native_commerce` checkout-eligibility attribute show the "Buy" button. In May 2026 Google said [UCP-powered checkout would roll out across Canada and Australia in the coming months](https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live/), and that the retailer always remains the merchant of record.

**Platform connectors.** Commerce platforms are wrapping these protocols for merchants. Shopify's [Agentic Storefronts](https://www.shopify.com/news/winter-26-edition-agentic-storefronts), announced in December 2025, syndicate products to AI platforms such as ChatGPT, Perplexity and Microsoft Copilot from one setup, with orders attributed to the AI channel.

## Where Australian shoppers and businesses are

Consumers are cautious. The [Australia Post eCommerce Report 2026](https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf) found 61% of consumers dislike or hate the idea of agentic commerce and 16% like or love it, with younger shoppers more open. Food, clothing and books, movies or music were the top categories shoppers would consider buying through an agent.

Businesses are moving faster. The same report found 44% of Australian businesses are advocates of agentic commerce and 85% are taking steps to prepare. [Salesforce's 2026 ANZ data](https://www.salesforce.com/au/news/stories/sate-of-commerce-anz-data-agentic-search-2026/) shows 24% of Australian commerce organisations already use agentic AI and 54% of the rest plan to deploy it within six months.

The sensible reading: discovery through AI is happening now; delegated checkout will grow more slowly and will depend on trust.

## What retailers need to have in place

Agents are unforgiving buyers. They read data literally and they cannot ring you to check. Before any protocol integration, get these right:

1. **Structured, complete product data.** Every attribute an agent might filter on, plus GTINs and variant relationships. See [product structured data](/insights/product-structured-data-schema-for-ecommerce/).
2. **Accurate, real-time stock across channels.** An agent that sells an item you have already sold on a marketplace creates a cancellation and damages trust. Salesforce found 46% of Australian multichannel organisations report inventory not synchronised in real time.
3. **Clear, machine-readable policies.** Shipping costs, delivery times, return windows and warranty terms, in feeds and on the page.
4. **Order intake that accepts new channels.** Agentic orders arrive through APIs. They need to land in the same queue as every other order, with the same dispatch, tracking and returns process.
5. **Fraud and payment controls.** Tokenised agent payments reduce card exposure, but you still need rules for unusual orders.

## Key figures

- AI agents could mediate US$3 trillion to US$5 trillion of global consumer commerce by 2030 ([McKinsey, 2025](https://mckinsey.com/capabilities/quantumblack/our-insights/the-agentic-commerce-opportunity-how-ai-agents-are-ushering-in-a-new-era-for-consumers-and-merchants)).
- Google's UCP-powered checkout is rolling out to Australia, with retailers remaining merchant of record ([Google, 2026](https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live/)).
- 61% of Australian consumers dislike the idea of agentic commerce; 16% like or love it ([Australia Post, 2026](https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf)).
- 85% of Australian businesses are taking steps to prepare for agentic commerce ([Australia Post, 2026](https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf)).
- 24% of Australian commerce organisations use agentic AI today; 54% of non-adopters plan to within six months ([Salesforce, 2026](https://www.salesforce.com/au/news/stories/sate-of-commerce-anz-data-agentic-search-2026/)).

## How eComChannels helps

Agent-ready retail is mostly operational discipline: one accurate catalogue, live stock and every order handled the same way. That is what eComChannels automates.

- **[Order management](/products/order-management/)** brings orders from every channel into one place and syncs stock across your storefront and marketplaces, so a sale through a new AI channel cannot oversell stock committed elsewhere. Dispatch, tracking and returns follow the same workflow regardless of where the order came from.
- **[AI listing optimisation](/products/ai-listing-optimisation/)** maintains one master product record with complete attributes, approved by your team and pushed in bulk to every channel, the structured data agents depend on.
- **[Branded storefronts](/products/storefronts/)** publish that catalogue on a fast, SEO- and GEO-ready store that agents and search engines can read.

The aim is to be eligible for agentic discovery and checkout as it reaches Australia, without adding manual work. [Book a demo or start a 30-day free trial](/book-a-demo/).

## FAQ

### Can Australian shoppers buy through ChatGPT Instant Checkout yet?

At launch in September 2025, Instant Checkout was for US users buying from US merchants, and OpenAI said it would expand merchants and regions. Check OpenAI's merchant pages for current availability before planning around it.

### Do I lose the customer relationship if an agent buys for them?

Under both ACP and UCP the retailer remains the merchant of record and handles payment, fulfilment and returns. You still receive the order and customer details needed to fulfil it.

### Which protocol should I pick?

Most small and mid-sized retailers will not integrate protocols directly. They will reach agents through their commerce platform, Merchant Center and marketplaces. Focus on data quality and stock accuracy, which every protocol needs.
