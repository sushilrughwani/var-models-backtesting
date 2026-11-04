---
title: "Security Market Indexes"
---

## Learning goals
- Explain what a security market index represents and distinguish price return from total return indexes.
- Calculate index values and returns under price, equal, market-capitalisation and float-adjusted weighting.
- Adjust a price-weighted index divisor for a stock split.
- Compare the biases of each weighting method and explain rebalancing and reconstitution.
- Describe the main uses of indexes in investment management.

## Explanation

### What an index is
An index is a rule-based summary of how a group of securities (the constituents) is performing. Its value on any day is a number; what matters is how that number changes. A **price return index** captures only price changes. A **total return index** also assumes that income (dividends or coupons) is reinvested, so it grows faster than the price version over time. Both start at the same base value and diverge as income accumulates.

Building an index involves five decisions: which market to target, which securities to include, how to weight them, how often to rebalance the weights and how often to review the constituent list (reconstitution).

### Weighting methods
**Price weighting.** Add the prices and divide by a divisor (initially the number of stocks):

$$
\text{Price-weighted index} = \frac{\sum_{i} P_i}{\text{Divisor}}
$$

Each stock's weight is its price divided by the sum of prices. A high-priced stock dominates regardless of company size, and a stock split changes the weights. After a split, the divisor is reset so the index value is unchanged at that moment.

**Equal weighting.** Every constituent gets weight $1/N$, so the index return is the simple average of the constituent returns. It is easy to understand but tilts the index toward small companies and must be rebalanced often because winners drift above $1/N$.

**Market-capitalisation weighting.** Weight equals each firm's market value divided by total market value:

$$
w_i = \frac{P_i Q_i}{\sum_j P_j Q_j}
$$

where $P_i$ is price and $Q_i$ is shares outstanding. **Float adjustment** uses only shares available to the public, excluding shares held by insiders, governments or controlling holders. Cap weighting is self-rebalancing (weights move with prices) but tilts toward large and possibly overvalued firms, giving it a momentum flavour.

**Fundamental weighting** uses measures such as sales, earnings or book value rather than price, which creates a value tilt.

### Index return
For any weighting scheme, the price return of the index equals the weighted average of constituent price returns, using weights at the start of the period:

$$
R_{\text{index}} = \sum_i w_i R_i
$$

The total return adds the weighted income return.

### Rebalancing and reconstitution
Rebalancing resets weights to the target (essential for equal weighting). Reconstitution changes membership: firms that no longer meet the criteria leave and new ones join. Both create turnover and trading costs for funds that track the index.

### Uses of indexes
Indexes act as gauges of market sentiment, proxies for the market portfolio when estimating beta and risk premiums, benchmarks for active managers, models for index funds and ETFs, and bases for derivatives.

## Worked example
Three stocks, one period:

| Stock | Start price | End price | Shares (m) | Dividend |
|---|---|---|---|---|
| Alder | 50 | 55 | 10 | 1.00 |
| Birch | 20 | 18 | 50 | 0.40 |
| Cedar | 100 | 104 | 4 | 2.00 |

Individual price returns: Alder +10%, Birch −10%, Cedar +4%.

**Price-weighted.** Start sum = 170, so index = 170/3 = 56.67. End sum = 177, so index = 59.00. Price return = 177/170 − 1 = **+4.12%**. Total return = (177 + 3.40)/170 − 1 = 6.12%. Cedar carries 100/170 = 58.8% of the weight purely because its price is high.

**Equal-weighted.** Return = (10% − 10% + 4%)/3 = **+1.33%**.

**Market-cap weighted.** Start value = 500 + 1,000 + 400 = 1,900. End value = 550 + 900 + 416 = 1,866. Return = 1,866/1,900 − 1 = **−1.79%**. Birch is the largest company (52.6% weight) and fell 10%.

Same stocks, same period, three different answers: the weighting rule drives the index.

**Split adjustment.** At the end of the period Cedar splits 2-for-1, so its price becomes 52. The index must stay at 59.00. New divisor $= (55 + 18 + 52)/59.00 = 125/59 = $ **2.1186**.

## Common exam traps
- Using market-cap weights for a price-weighted index. Only prices (not shares outstanding) matter in price weighting.
- Forgetting to change the divisor after a split, which would make the index fall even though nobody lost money.
- Assuming the price and total return indexes have different starting values. They start equal and diverge.
- Thinking cap-weighted indexes need frequent rebalancing. Equal-weighted indexes do; cap-weighted weights adjust automatically.
- Mixing up the biases: equal weighting tilts to small caps, cap weighting tilts to large (and recently rising) firms, fundamental weighting tilts to value.

## Key takeaways
- An index return is the weighted average of constituent returns using beginning-of-period weights.
- Price weighting lets high-priced stocks dominate and needs divisor changes after splits.
- Equal weighting is simple but small-cap tilted and rebalancing-intensive.
- Market-cap (and float-adjusted) weighting reflects investable value and is self-rebalancing.
- Total return indexes include reinvested income; price return indexes do not.
- Indexes serve as benchmarks, market proxies, models for passive funds and derivative underlyings.
