# Marketplace Settlement Reconciliation Explained for AU Sellers

URL: https://ecomchannels.com/insights/marketplace-settlement-reconciliation-explained/
Category: Finance & reconciliation
Updated: 2026-10-30

> How marketplace settlement reconciliation works for Australian sellers: matching payouts to orders, fees, refunds and reserves, and catching short payments.

Marketplace settlement reconciliation is the process of proving that every dollar a marketplace deposits into your bank account matches the orders you shipped, minus the fees, refunds, reserves and adjustments the marketplace says it deducted. Because marketplaces pay a net figure on their own schedule rather than per order, a seller needs to break each payout back into its parts and match them to orders line by line. Done consistently, it is the only reliable way to catch short payments, wrong fees and missing refunds before they disappear into the general ledger.

## Why a marketplace payout never equals your sales

When a customer pays on a marketplace, the money goes to the marketplace first. It holds the funds, takes its cut and pays you later as one lump sum. On Amazon.com.au, the payments area groups activity into a [payout period of 14 days, and a settlement closes after every 14 days](https://sellercentral.amazon.com.au/help/hub/reference/external/G200801160) (Amazon Seller Central, 2026). Each settlement can include sales, refunds, expenses and what Amazon calls "others", which covers account-level reserves.

eBay works the same way. Its help pages state that [fees and selling costs are deducted from your sales proceeds](https://www.ebay.com.au/help/selling/fees-credits-invoices/fees-selling-costs-charged?id=5297) before the rest is paid out, so your payout can differ from what the buyer paid (eBay Australia, 2026). Deductions can include listing and transaction fees, ad fees, shipping labels bought through eBay, Money Back Guarantee refunds and payment dispute refunds.

Multiply that by every marketplace you sell on, each with its own cycle, report layout and fee names, and the bank feed becomes a list of unexplained deposits. With Australians spending [$18.9 billion through pure online marketplaces in 2025, up 13% year on year](https://auspost.com.au/business/grow-your-business/business-ideas-blog/marketplace-growth-strategy) (Australia Post, 2026), more retailers are dealing with this every fortnight.

## The four parts of every settlement

Most marketplace settlement reports, whatever they are called, can be broken into four groups:

1. **Gross sales**: item price, shipping charged and any gift wrap or extras.
2. **Marketplace fees**: commissions or referral fees, fixed per-order fees, subscription charges, advertising, fulfilment and label costs.
3. **Refunds and adjustments**: customer refunds, partial refunds, returned fee portions, reimbursements and dispute outcomes.
4. **Holds and reserves**: money held back from this period and released in a later one.

The reconciliation question for each payout is simple: does gross sales minus fees minus refunds, plus or minus reserve movements, equal the amount in the bank? If not, which order or line is responsible?

## How to reconcile a settlement, step by step

**1. Pull the settlement detail, not the summary.** Summary statements tell you the total. You need the transaction-level file that lists every order, fee and adjustment. Amazon notes that [downloads are not available for the current settlement period and generated reports stay available for 90 days](https://sellercentral.amazon.com.au/help/hub/reference/external/G200801160), so build a habit of downloading after each settlement closes.

**2. Match on a stable key.** Pick one identifier that appears in both your order system and the settlement file, usually the marketplace order ID, and match on that. Matching on customer name or order amount breaks as soon as two orders look alike or a partial refund changes the total.

**3. Check each fee against the rule that should apply.** Amazon AU charges a [referral fee on the total sales price, including delivery and gift wrap, with rates that vary by category](https://sellercentral.amazon.com.au/help/hub/reference/external/G200336920) (Amazon Seller Central, 2026). If you know the category and the rule, you can calculate the expected fee and flag any order where the charge differs.

**4. Tie refunds to the original order.** A refund in this period often relates to a sale from an earlier one. Linking them stops refunds being booked twice or not at all, and lets you check whether the fee portion came back. On Amazon, a refunded referral fee comes back less a refund administration fee, as covered in our guide to [hidden marketplace fees](https://ecomchannels.com/insights/hidden-marketplace-fees-australian-sellers/).

**5. Track reserves as a balance.** Treat money held back as a receivable owed to you, and confirm it is released in a later settlement.

**6. Match the net payout to the bank.** Only after the detail balances should you match the deposit to the bank line and post a summarised journal to your accounting system.

## What usually goes wrong

The common problems are predictable:

- **Short payments:** an order shipped but never appears in any settlement, or appears at a lower amount.
- **Fee drift:** a category is mapped wrongly, so the commission charged is higher than the rule for that product.
- **Orphan refunds:** refunds with no matching sale in your records, often from orders placed before a system change.
- **Timing gaps:** a settlement period that straddles month end, so sales and payouts land in different months.
- **Currency and tax confusion:** some marketplaces quote fees excluding GST and others including it, which matters when you claim GST credits.

The ATO's own BAS guidance tells businesses to [keep records of all sales and fees and to reconcile sales with bank statements](https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/business-activity-statements-bas/bas-and-gst-tips) (ATO, 2026). Settlement reconciliation is how a marketplace seller actually does that. This is general information, not tax advice.

## Key figures

- Australians spent [$18.9 billion through pure online marketplaces in 2025, up 13% year on year](https://auspost.com.au/business/grow-your-business/business-ideas-blog/marketplace-growth-strategy), almost a quarter of all online spending (Australia Post, 2026).
- Amazon.com.au uses a [14-day payout period, with settlement closing every 14 days](https://sellercentral.amazon.com.au/help/hub/reference/external/G200801160) (Amazon Seller Central, 2026).
- Amazon AU settlement reports [stay downloadable for 90 days after generation](https://sellercentral.amazon.com.au/help/hub/reference/external/G200801160) (Amazon Seller Central, 2026).
- Amazon AU referral fees are [charged on the total sales price including delivery, with no minimum or maximum](https://sellercentral.amazon.com.au/help/hub/reference/external/G200336920) (Amazon Seller Central, 2026).

## How eComChannels helps

[eComChannels Finance auto reconciliation](https://ecomchannels.com/products/finance-reconciliation/) imports remittances and settlement files from each connected marketplace and matches every line to the order record held in [eComChannels order management](https://ecomchannels.com/products/order-management/). Because the orders, fees and refunds all sit against one order ID, the software can:

- calculate the expected fee for each order from the fee rules you set per marketplace and category, and flag differences;
- list orders that were shipped but not yet paid, or paid short, so you can raise a case with the marketplace while it is still easy to prove;
- link refunds to the original sale and show whether fees were returned;
- produce a balanced summary per payout, ready to post to your accounting software.

The result is less time spent in spreadsheets, faster detection of money you are owed, and payout data you can trust when deciding which channels to grow. [Book a demo or start a 30-day free trial](https://ecomchannels.com/book-a-demo/).

## FAQ

### How often should I reconcile marketplace settlements?

At least once per settlement cycle, ideally as soon as each one closes, and daily if your volumes allow. The longer you wait, the harder it is to trace a missing order, and some reports only stay available for a limited time.

### What is the difference between a settlement report and a payout?

The payout is the single amount deposited into your bank. The settlement report is the detailed breakdown of the sales, fees, refunds and reserves that produced that amount. Reconciliation means proving the two agree.

### Can I just record the net payout as revenue?

You can record it, but you lose the detail needed to check fees, claim GST credits correctly and measure channel profit. Most accountants recommend recording gross sales and fees separately. Check with your adviser for your situation.

## Sources
- View all statements, Amazon Seller Central Australia (2026): https://sellercentral.amazon.com.au/help/hub/reference/external/G200801160
- Selling on Amazon fee schedule, Amazon Seller Central Australia (2026): https://sellercentral.amazon.com.au/help/hub/reference/external/G200336920
- How fees and selling costs are charged, eBay Australia (2026): https://www.ebay.com.au/help/selling/fees-credits-invoices/fees-selling-costs-charged?id=5297
- BAS and GST tips, Australian Taxation Office (2026): https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/business-activity-statements-bas/bas-and-gst-tips
- Why marketplaces are a powerful growth channel, Australia Post (2026): https://auspost.com.au/business/grow-your-business/business-ideas-blog/marketplace-growth-strategy
