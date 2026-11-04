---
title: "Fund Management"
---

## Learning goals
- Calculate the net asset value (NAV) of a fund and explain how open-end funds, closed-end funds and ETFs are priced and traded.
- Compare the costs of mutual funds and ETFs and describe undesirable trading practices in mutual funds.
- Calculate a hedge fund investor's net return under management fees, incentive fees, hurdle rates and high-water marks.
- Describe the main hedge fund strategies and the biases in reported hedge fund performance.

## Explanation

### Mutual funds: open-end and closed-end
A pooled fund lets many investors share a professionally managed, diversified portfolio. Its value per share is the **net asset value**:

$$
\text{NAV} = \frac{\text{Market value of assets} - \text{Liabilities}}{\text{Shares outstanding}}
$$

An **open-end fund** creates new shares when investors buy and cancels shares when they redeem, always at the NAV calculated at the end of the day (typically 4 p.m. in the US). The number of shares changes daily. An **index fund** is an open-end fund that tracks a benchmark at low cost.

A **closed-end fund** issues a fixed number of shares at launch; afterwards, shares trade on an exchange like a stock. The market price can sit at a **premium or discount** to NAV. Persistent discounts are common.

### Exchange-traded funds
An **ETF** usually tracks an index and trades on an exchange throughout the day. Large institutions (authorised participants) can create new ETF shares by delivering the underlying basket, or redeem shares for the basket. That arbitrage keeps the ETF price very close to its NAV, unlike a closed-end fund. ETFs typically offer lower expense ratios, intraday trading, short selling and transparency of holdings, and they are often more tax-efficient because in-kind redemptions avoid forced sales.

### Costs and undesirable practices
Mutual fund costs include **front-end loads** (charged on purchase), **back-end loads** (charged on redemption, often declining with holding period) and annual **expense ratios** covering management, administration and marketing.

Abuses uncovered in the early 2000s include **late trading** (accepting orders after the NAV cut-off at that day's NAV, which lets favoured clients trade on news), **market timing** (rapid in-and-out trades exploiting stale prices, often in international funds), **front running** (trading ahead of the fund's own large orders) and **directed brokerage** (sending trades to brokers that promote the fund).

### Hedge funds
Hedge funds are lightly regulated, open mainly to wealthy and institutional investors, and free to use leverage, short selling and derivatives. Investors face lock-up periods and redemption notice requirements. The classic fee is "2 plus 20": a 2% annual **management fee** on assets plus an **incentive fee** of 20% of profits (usually after the management fee). Investor-friendly features include:
- **Hurdle rate**: the incentive fee applies only to returns above a stated minimum.
- **High-water mark**: after a loss, no incentive fee is paid until the fund regains its previous peak value.
- **Clawback**: past incentive fees can be partly returned after later losses.

A **fund of funds** adds its own layer of fees on top of the underlying funds' fees.

Common strategies include long/short equity, dedicated short, distressed securities, merger (risk) arbitrage, convertible arbitrage, fixed-income arbitrage, emerging markets, global macro and managed futures (trend-following). Each carries its own exposure; merger arbitrage, for example, loses when deals fail.

### Performance and biases
Reported hedge fund returns are inflated by **survivorship bias** (failed funds stop reporting and drop out of databases) and **backfill bias** (funds join a database after a good track record and backfill those results). Incentive fees are asymmetric: managers share gains but not losses, which can encourage risk-taking.

## Worked example
An investor puts USD 100 into a hedge fund charging 2% (on start-of-year assets) plus 20% of profits after the management fee.

**Year 1, gross return 30%, no hurdle.**
1. Management fee = 2% × 100 = 2. Return after management fee = 28%.
2. Incentive fee = 20% × 28% = 5.6%.
3. Net return = 28% − 5.6% = **22.4%**.

With a 5% hurdle applied to the excess: incentive = 20% × (28% − 5%) = 4.6%, so the net return is 23.4%.

**Two years with a high-water mark.** Suppose instead year 1 has a gross return of −20%.
1. Value after management fee = 100 − 20 − 2 = 78 (net return −22%; no incentive fee on losses).
2. Year 2 gross return of 40%: gain = 0.40 × 78 = 31.2; management fee = 0.02 × 78 = 1.56; value = 78 + 31.2 − 1.56 = 107.64.
3. High-water mark is 100, so incentive fee = 20% × (107.64 − 100) = 1.528.
4. Ending value = 107.64 − 1.528 = **USD 106.112**.

Without a high-water mark, the fee would be 20% × (107.64 − 78) = 5.928, leaving only 101.712. The high-water mark saves the investor about 4.40.

Separately, a fund with assets of USD 520m, liabilities of USD 20m and 25m shares has NAV = 500 / 25 = USD 20.00 per share.

## Common exam traps
- Computing the incentive fee on the gross return instead of the return after the management fee (when the question says fees are sequential).
- Charging incentive fees after a loss year without checking the high-water mark.
- Forgetting to subtract liabilities when calculating NAV.
- Assuming closed-end funds trade at NAV; only open-end funds transact at NAV, and ETFs stay close because of creation and redemption.
- Treating hedge fund index returns as unbiased; survivorship and backfill bias push them up.

## Key takeaways
- NAV = (assets − liabilities) / shares; open-end funds transact at end-of-day NAV.
- Closed-end funds can trade at discounts; ETF creation and redemption keeps prices near NAV.
- Expense ratios and loads compound over time; late trading and market timing harm long-term holders.
- Hedge fund fees: management fee plus incentive fee, moderated by hurdles, high-water marks and clawbacks.
- Reported hedge fund performance suffers from survivorship and backfill bias.
