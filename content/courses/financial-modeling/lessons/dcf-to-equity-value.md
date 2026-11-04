---
title: "From Enterprise Value to Equity Value per Share"
---

## Learning goals
- Build the bridge from enterprise value to equity value, item by item.
- Decide which balance sheet items are debt-like and which are non-operating assets.
- Calculate fully diluted shares with the treasury stock method, including when the share price is itself the output.
- Compute the implied value per share and the upside to the current price.

## Explanation

### The house and the mortgage
Enterprise value (EV) from the DCF is the value of the operating business, available to all capital providers. Shareholders own what is left after everyone with a prior claim is paid, plus any assets the DCF did not capture. Think of EV as the value of a house: equity is the house minus the mortgage, plus the cash in the kitchen drawer and the car in the garage that was not part of the house valuation.

### The bridge

$$
\text{Equity value} = EV - \text{Debt} + \text{Cash} - \text{NCI} - \text{Other debt-like items} + \text{Non-operating assets}
$$

- **Debt**: all interest-bearing borrowings at the valuation date, including lease liabilities if EBITDA and FCFF exclude lease costs (as under IFRS 16).
- **Cash**: cash and liquid investments not needed to run the business. FCFF excluded interest income, so the cash itself is added here.
- **NCI (non-controlling interest)**: the minority owners' share of subsidiaries that are fully consolidated. EV includes 100% of those subsidiaries' cash flows, so the outsiders' slice must be deducted.
- **Other debt-like items**: unfunded pension deficits, provisions that will be paid in cash, preferred shares.
- **Non-operating assets**: equity-method associates and other investments whose income is not in EBIT and therefore not in FCFF.

The governing principle is consistency: if a cash flow is in FCFF, the related asset or claim must not also appear in the bridge, and vice versa.

### Diluted shares: the treasury stock method
Options and restricted stock units (RSUs) will become shares. RSUs are added in full. In-the-money options are assumed exercised, with the exercise proceeds used to buy back shares at the share price $P$:

$$
\text{New shares from options} = n \times \left(1 - \frac{K}{P}\right)
$$

where $n$ is the number of in-the-money options and $K$ the exercise price. Out-of-the-money options ($K > P$) add nothing.

### The circularity
In a DCF the price $P$ is the answer we are solving for, but dilution depends on $P$. You can turn on iterative calculation in Excel, but there is a cleaner closed form. If all options are in the money, equity value $V$ satisfies $V = P(S + R + n) - nK$, where $S$ is basic shares and $R$ RSUs, so:

$$
P = \frac{V + nK}{S + R + n}
$$

In words: add the option proceeds to equity value and count every option as a share. In Excel: `=(C30+C33*C34)/(C31+C32+C33)`, then check that $P > K$.

## Worked example
Northwind Components Ltd, USD millions except per-share data. EV from the perpetuity growth DCF (previous lesson) is 1,989.11. At the valuation date of 31 December 2025, Northwind has borrowings of 380 and lease liabilities of 40, cash of 95, non-controlling interest of 18 and a 30% stake in an associate valued at 30. Basic shares are 50.0 million, there are 0.6 million RSUs and 4.0 million options with an exercise price of USD 20.00. The current share price is USD 27.50.

**Step 1 - Equity value.**

| Item | USD m |
|---|---|
| Enterprise value | 1,989.11 |
| Less debt (380 + 40) | (420.00) |
| Plus cash | 95.00 |
| Less non-controlling interest | (18.00) |
| Plus investment in associate | 30.00 |
| **Equity value** | **1,676.11** |

**Step 2 - Price with the closed form.** P = (1,676.11 + 4.0 × 20.00) / (50.0 + 0.6 + 4.0) = 1,756.11 / 54.6 = 32.16. Options are in the money (32.16 > 20.00), so the formula applies.

**Step 3 - Confirm with the treasury stock method.** New shares = 4.0 × (1 − 20.00 / 32.16) = 1.51 million. Diluted shares = 50.0 + 0.6 + 1.51 = 52.11 million. 1,676.11 / 52.11 = 32.16. Iterating from the basic price (33.52) gives 32.10, then 32.17, converging on the same value.

**Step 4 - Upside.** 32.16 / 27.50 − 1 = 16.96%.

**Implied value per share: USD 32.16, about 17% above the market price.** Running the exit-multiple EV of 2,103.91 through the same bridge gives equity of 1,790.91 and USD 34.27 per share.

## Common exam traps
- Dividing by basic shares, which overstates value per share (33.52 instead of 32.16 for Northwind).
- Counting all options as shares without adding their exercise proceeds (30.70), which understates value.
- Adding NCI instead of subtracting it, or forgetting it entirely.
- Double counting: including interest income in FCFF and also adding cash, or including lease costs in EBITDA and also deducting lease liabilities.
- Using balance sheet figures from a different date than the valuation date.

## Key takeaways
- Equity value = EV − debt + cash − NCI − other claims + non-operating assets.
- Every bridge item must be consistent with what is (or is not) inside FCFF.
- RSUs count in full; options add shares net of buyback under the treasury stock method.
- When price is the output, use P = (V + nK)/(S + R + n) instead of a circular reference.
- Northwind: equity value 1,676.11 million, 52.11 million diluted shares, USD 32.16 per share.
