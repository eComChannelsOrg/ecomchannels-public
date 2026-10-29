# How to Track Refunds and Chargebacks Across Every Channel

URL: https://ecomchannels.com/insights/tracking-refunds-chargebacks-ecommerce/
Category: Finance & reconciliation
Updated: 2026-10-30

> A practical system for Australian online retailers to track refunds, returns and chargebacks across marketplaces and their own store, and cut their cost.

To track refunds and chargebacks properly, every one needs to be linked to its original order, given a reason code, and followed through to its financial outcome: what was refunded, what fees were returned or lost, whether stock came back and whether a dispute was won. Most retailers record refunds only as negative sales, which hides the real cost. A simple register, fed from reconciled marketplace and payment data, shows where money is leaking and which products, channels or carriers cause it.

## Refunds, returns and chargebacks are different problems

They are often lumped together, but they behave differently in the books.

- **Refunds** are money you give back, with or without a return. They can be full, partial (for example, a shipping refund) or goodwill credits.
- **Returns** are the physical flow of stock back to you. A return may lead to a refund, an exchange or nothing.
- **Chargebacks** are disputes the customer raises with their card issuer or payment provider. The money is pulled back first and you defend it afterwards.

On marketplaces, a fourth category appears: platform-led claims, such as guarantee refunds decided by the marketplace. eBay, for instance, lists [Money Back Guarantee refunds and payment dispute refunds](https://www.ebay.com.au/help/selling/fees-credits-invoices/fees-selling-costs-charged?id=5297) among the costs deducted from your sales proceeds (eBay Australia, 2026).

## What each one really costs

The refunded amount is only the start.

**Marketplace fees.** When you refund an Amazon AU order, the referral fee comes back [less a refund administration fee of the lesser of $5.00 or 20% of the referral fee](https://sellercentral.amazon.com.au/help/hub/reference/external/G200336920) (Amazon Seller Central, 2026).

**Chargeback costs.** Mastercard reports that a chargeback costs merchants an [average of $128, made up of $82 in internal costs and $46 in third-party fees](https://www.mastercard.com/us/en/news-and-trends/Insights/2025/what-s-the-true-cost-of-a-chargeback-in-2025.html), and that these costs often exceed the value of the item disputed (Mastercard, 2025). The same research put the average chargeback amount in Australia at $91.

**Returns volume.** In the United States, retailers surveyed by the NRF estimated that [16.9% of their 2024 annual sales would be returned](https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion), and 93% said return fraud and abuse was a significant issue (NRF, 2024). Australian rates vary by category, but the cost structure is similar: freight both ways, handling, and stock that cannot be resold at full price.

Returns are also part of the customer experience. Australia Post found [65% of Australian online shoppers say friction-free returns contribute to a great online shopping experience](https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2025.pdf) (Australia Post, 2025). The goal is to measure and reduce avoidable returns, not to make returns harder.

## Build a refunds and disputes register

A register is a single table, by order line, with these fields:

1. **Order ID, channel and original sale date.**
2. **Type:** refund, return, chargeback or marketplace claim.
3. **Reason code:** not received, damaged, not as described, wrong item, changed mind, unauthorised transaction.
4. **Amounts:** product refunded, shipping refunded, fees returned, fees lost, dispute fees.
5. **Stock outcome:** returned to sellable stock, written off, or not returned.
6. **Dispute status and evidence:** tracking, proof of delivery, photos, correspondence.
7. **Settlement reference:** the payout where the money actually moved.

With that, you can answer the questions that matter: which SKUs have the highest refund rate, which channel loses the most to disputes, and which carrier lanes produce "not received" claims.

## Australian consumer law sets the rules for refunds

Refund tracking also supports compliance. The ACCC says that when there is a major problem with a product, [refunds should be given in the same form as the original payment, unless the business and consumer agree otherwise](https://www.accc.gov.au/business/problem-with-a-product-or-service-you-sold/repair-replace-refund-cancel) (ACCC, 2026). Recording the payment method and refund method in your register makes this easy to check. This is general information; the ACCC site has full guidance.

## Reducing chargebacks and avoidable refunds

- **Keep delivery evidence.** "Item not received" is a common dispute reason. Tracking numbers and proof of delivery attached to the order are your best defence.
- **Fix the root cause by SKU.** If one product drives "not as described" refunds, the listing, images or sizing information is usually the problem.
- **Respond early.** Mastercard notes that the [most effective way to reduce chargeback costs is to resolve disputes before they become formal chargebacks](https://www.mastercard.com/us/en/news-and-trends/Insights/2025/what-s-the-true-cost-of-a-chargeback-in-2025.html) (Mastercard, 2025).
- **Reconcile refunds against payouts.** A refund promised by a marketplace, or a reimbursement for a lost parcel, is not money until it appears in a settlement. Our guide to [settlement reconciliation](https://ecomchannels.com/insights/marketplace-settlement-reconciliation-explained/) explains how to check.

## Key figures

- Chargebacks cost merchants an [average of $128 each: $82 internal, $46 external](https://www.mastercard.com/us/en/news-and-trends/Insights/2025/what-s-the-true-cost-of-a-chargeback-in-2025.html) (Mastercard, 2025).
- Global chargebacks are forecast to [grow 37% between 2025 and 2029, to 359 million a year](https://www.mastercard.com/us/en/news-and-trends/Insights/2025/what-s-the-true-cost-of-a-chargeback-in-2025.html) (Mastercard, 2025).
- US retailers expected [16.9% of 2024 annual sales to be returned](https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion) (NRF, 2024).
- [65% of Australian online shoppers](https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2025.pdf) say friction-free returns contribute to a great experience (Australia Post, 2025).

## How eComChannels helps

[eComChannels Finance auto reconciliation](https://ecomchannels.com/products/finance-reconciliation/) links every refund, marketplace claim and dispute in a settlement back to its original order, records the fees returned and lost, and flags refunds or reimbursements that were promised but never paid. That turns refunds from a single negative number into a register you can analyse by SKU, channel and reason.

[eComChannels AI auto shipping](https://ecomchannels.com/products/ai-shipping/) stores tracking and delivery events for Australia Post, StarTrack, CouriersPlease and Allied Express shipments against each order, pushes tracking back to the marketplaces and helps with carrier claims, so the evidence you need for "item not received" disputes is already attached. With orders, shipments and payments together in [eComChannels order management](https://ecomchannels.com/products/order-management/), your team spends less time gathering evidence and more disputes are resolved early. [Book a demo or start a 30-day free trial](https://ecomchannels.com/book-a-demo/).

## FAQ

### Should refunds be recorded as negative sales or as an expense?

Most retailers record them against sales so revenue reflects net sales, while tracking fees lost and return freight as separate costs. Ask your accountant which treatment suits your reporting.

### How do I reduce "item not received" disputes?

Use tracked services for higher-value orders, upload tracking to every channel promptly, and keep proof of delivery linked to the order so you can respond quickly.

### Are marketplace refund fees recoverable?

Generally not when the refund is valid. They are a cost of selling on that channel and should be included when you compare channel profitability.

## Sources
- What is the true cost of a chargeback for businesses?, Mastercard (2025): https://www.mastercard.com/us/en/news-and-trends/Insights/2025/what-s-the-true-cost-of-a-chargeback-in-2025.html
- NRF and Happy Returns Report: 2024 Retail Returns to Total $890 Billion, National Retail Federation (2024): https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion
- Repair, replace, refund, cancel, ACCC (2026): https://www.accc.gov.au/business/problem-with-a-product-or-service-you-sold/repair-replace-refund-cancel
- Selling on Amazon fee schedule, Amazon Seller Central Australia (2026): https://sellercentral.amazon.com.au/help/hub/reference/external/G200336920
- How fees and selling costs are charged, eBay Australia (2026): https://www.ebay.com.au/help/selling/fees-credits-invoices/fees-selling-costs-charged?id=5297
- Australia Post eCommerce Report 2025, Australia Post (2025): https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2025.pdf
