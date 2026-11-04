---
title: "Pricing Conventions, Discounting and Arbitrage"
---

## Learning goals
- Calculate discount factors from the prices of traded bonds and use them to price any other fixed cash flows.
- Explain the law of one price and why two portfolios with identical cash flows must cost the same.
- Construct a replicating portfolio for a bond and identify the arbitrage trade when the bond is mispriced.
- Distinguish quoted (clean) prices from invoice (dirty) prices and calculate accrued interest under common day-count conventions.

## Explanation

### The discount factor: the price of one unit of future money
The **discount factor** $d(t)$ is today's price of receiving 1 unit of currency for certain at time $t$. If $d(1) = 0.96$, you would pay 0.96 today to receive 1.00 in one year. Discount factors are below 1 when rates are positive.

Once you know the discount factors, pricing a bond needs no yield, no compounding convention and no guesswork. A bond is a bundle of fixed payments, and each payment is worth its amount times the discount factor for its date:

$$
P = \sum_{i=1}^{n} CF_i \, d(t_i)
$$

where $P$ is the bond's full price, $CF_i$ is the cash flow paid at time $t_i$ and $d(t_i)$ is the discount factor for that date. In the earlier lesson on interest rates we priced bonds with zero rates; discount factors are simply those zero rates expressed as prices.

### Extracting discount factors from traded bonds
We observe bond prices, not discount factors, so we work backwards. Start with the shortest bond: it has only one cash flow, so $d(t_1) = P_1 / CF_1$. The next bond has a cash flow at $t_1$, which we can now value, and one new cash flow at $t_2$, which gives us $d(t_2)$. Repeating this step by step recovers the whole set of discount factors. US Treasury coupons are paid semiannually, so the natural grid is every six months.

### The law of one price and replication
The **law of one price** says that two securities (or portfolios) delivering exactly the same cash flows in every state must sell for the same price. If they did not, you could buy the cheap one, sell the expensive one, owe nothing in the future and pocket the difference today. That riskless profit is **arbitrage**.

To test a bond, build a **replicating portfolio** from other bonds whose cash flows match it date by date. Solve from the last cash flow backwards: choose the face amount of the longest bond that matches the final payment, then fill the earlier dates with shorter bonds. If the replicating portfolio costs less than the bond, sell the bond and buy the portfolio; if it costs more, do the reverse.

In real markets small deviations survive because of bid-ask spreads, financing costs, taxes, liquidity premia and bonds that are "special" in the repo market. The law of one price is a powerful benchmark, not a guarantee.

### Quoting conventions: clean, dirty and accrued interest
Between coupon dates the seller has earned part of the next coupon. Bonds are quoted at a **clean (flat) price**, and the buyer pays the **dirty (full, invoice) price**:

$$
P_{\text{dirty}} = P_{\text{clean}} + AI, \qquad AI = \frac{c}{2} \times \frac{\text{days since last coupon}}{\text{days in coupon period}}
$$

where $c$ is the annual coupon per 100 face for a semiannual bond. US Treasuries count days with **actual/actual**; many corporate bonds use **30/360**; money-market instruments often use **actual/360**. The clean price avoids the artificial saw-tooth that the dirty price shows around each coupon date. The discount-factor formula above always gives the dirty price.

STRIPS (separately traded coupon and principal pieces) let dealers break bonds into zero-coupon pieces and rebuild them, and this activity keeps coupon bonds close to the value implied by discount factors.

## Worked example
Two Treasuries (face 100, semiannual coupons) trade today:

- Bond A: 6 months to maturity, 2% coupon, price 99.50. Cash flow: 101 at 0.5 years.
- Bond B: 1 year to maturity, 4% coupon, price 100.20. Cash flows: 2 at 0.5 years, 102 at 1 year.

**Step 1 - discount factors.**

$$
d(0.5) = \frac{99.50}{101} = 0.985149
$$

$$
d(1) = \frac{100.20 - 2 \times 0.985149}{102} = 0.963036
$$

**Step 2 - price a third bond.** Bond C matures in 1 year with an 8% coupon (cash flows 4 and 104):

$$
P_C = 4 \times 0.985149 + 104 \times 0.963036 = 104.0964
$$

**Step 3 - replicate.** Match the 104 at year 1 with Bond B: $104 / 102 = 1.019608$ units. Those units also pay $2 \times 1.019608 = 2.039216$ at 0.5 years, so Bond A must supply $4 - 2.039216 = 1.960784$, which is $1.960784 / 101 = 0.019414$ units. Cost: $0.019414 \times 99.50 + 1.019608 \times 100.20 = 104.0964$, the same as Step 2, as the law of one price requires.

**Step 4 - arbitrage.** If Bond C trades at 104.30, it is rich. Sell Bond C at 104.30, buy the replicating portfolio for 104.0964, and the future cash flows cancel exactly. Profit today: **0.2036 per 100 face**.

## Common exam traps
- Dividing the 6-month bond's price by 100 instead of by its full final payment of face plus coupon.
- Using the clean price in the discount-factor equation; discounted cash flows equal the dirty price.
- Getting the arbitrage direction backwards: always buy the cheap side and sell the rich side.
- Applying annual coupons to a semiannual bond; a 4% Treasury pays 2 per 100 face every six months.

## Key takeaways
- A discount factor is the price today of 1 unit paid for certain at a future date.
- Any fixed cash-flow stream is priced as the sum of cash flows times discount factors.
- Discount factors are extracted step by step from traded bonds, shortest first.
- The law of one price: identical cash flows, identical price; violations create arbitrage.
- Replicate from the longest cash flow backwards and trade the price gap.
- Dirty price = clean price + accrued interest; the market quotes clean.
