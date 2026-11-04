---
title: "Exchange Rate Calculations"
---

## Learning goals
- Interpret a currency quote by identifying the base and price currencies.
- Calculate the percentage appreciation or depreciation of each currency from a change in the quote.
- Calculate a cross rate from two quotes that share a common currency.
- Calculate a forward rate using covered interest rate parity, express it in forward points, and identify a forward premium or discount.

## Explanation

### Reading a quote
We keep the convention from the previous lesson: $S_{A/B}$ is the number of units of **price currency** A needed to buy one unit of **base currency** B. In $S_{USD/EUR} = 1.1000$, the euro is the base and the dollar is the price currency. Market practitioners often write the same thing as "EUR/USD 1.1000", which is why the first step on any exam question is to establish which currency is being priced. A quote is **direct** from the perspective of the investor whose home currency is the price currency (domestic per foreign) and **indirect** when the home currency is the base.

### Percentage changes are not symmetric
If the quote rises, the base currency has appreciated by

$$
\%\Delta_{\text{base}} = \frac{S_1}{S_0} - 1
$$

The price currency's change must be measured with the inverted quote:

$$
\%\Delta_{\text{price}} = \frac{1/S_1}{1/S_0} - 1 = \frac{S_0}{S_1} - 1
$$

where $S_0$ and $S_1$ are the starting and ending quotes. These two percentages are not equal and opposite, because each uses a different denominator.

### Cross rates
When you have two quotes that share a currency, chain them so the common currency cancels:

$$
S_{A/C} = S_{A/B} \times S_{B/C}
$$

If both quotes have the common currency in the same position (both as base, say), you must invert one first. For example, $S_{A/C} = S_{A/B} / S_{C/B}$.

### Forward rates and covered interest parity
An investor can lock in a future exchange rate in two equivalent ways: buy a forward, or borrow in one currency, convert at spot and invest in the other. No arbitrage requires both routes to give the same result:

$$
F_{A/B} = S_{A/B} \times \frac{1 + i_A \tau}{1 + i_B \tau}
$$

where $F_{A/B}$ is the forward rate, $i_A$ and $i_B$ are the annual money market rates of the price and base currencies, and $\tau$ is the fraction of a year (commonly days/360). The higher-yielding currency trades at a **forward discount**; the lower-yielding currency at a **forward premium**. Intuition: the forward rate removes the interest advantage, otherwise everyone would borrow the cheap currency and invest in the expensive one with no risk.

A useful approximation is $F - S \approx S \times (i_A - i_B) \tau$.

### Forward points
Dealers quote forwards as **points** added to the spot rate, scaled to the fourth decimal for most pairs:

$$
\text{Forward points} = (F - S) \times 10{,}000
$$

Positive points mean the base currency trades at a forward premium; negative points mean a forward discount. For quotes with two decimals, such as JPY pairs, the scale is 100.

The forward premium as a percentage is $F/S - 1$, which can be annualised by multiplying by $360/\text{days}$.

## Worked example
**Part A - Percentage changes.** $S_{USD/EUR}$ moves from 1.1000 to 1.1500.

- Euro (base): $1.15/1.10 - 1 = +4.55\%$.
- Dollar (price): $1.10/1.15 - 1 = -4.35\%$.

**Part B - Cross rate.** $S_{USD/EUR} = 1.1000$ and $S_{JPY/USD} = 150.00$.

$$
S_{JPY/EUR} = 150.00 \times 1.1000 = 165.00
$$

The dollar cancels. Second case: $S_{CAD/USD} = 1.3600$ and $S_{AUD/USD} = 1.5200$, both with the dollar as base. Then $S_{CAD/AUD} = 1.36 / 1.52 = 0.8947$.

**Part C - Forward rate.** $S_{USD/EUR} = 1.1000$, the 180-day USD rate is 5.00% and the EUR rate is 3.00%, both on an actual/360 basis.

$$
F = 1.1000 \times \frac{1 + 0.05 \times 180/360}{1 + 0.03 \times 180/360} = 1.1000 \times \frac{1.025}{1.015} = 1.1108
$$

- Forward points: $(1.11084 - 1.1000) \times 10{,}000 = +108.4$.
- The euro, the lower-yielding currency, trades at a forward premium of $1.11084/1.1000 - 1 = 0.985\%$ for 180 days, or $1.97\%$ annualised.
- The approximation gives $1.10 \times 0.02 \times 0.5 = 0.0110$, or 110 points, close to the exact value.

**Part D - Points to outright.** A dealer quotes spot 1.3500 and 6-month points of −25.5. The outright forward is $1.3500 - 0.00255 = 1.34745$.

The 180-day forward is **1.1108 USD per EUR, 108.4 points above spot**.

## Common exam traps
- Reporting the price currency's change as the negative of the base currency's change (−4.55% instead of −4.35%).
- Multiplying two quotes when the common currency is in the same position in both; one must be inverted first.
- Placing the interest rates upside down. The price currency's rate goes in the numerator.
- Using the annual rate without scaling by days/360.
- Forgetting to divide forward points by 10,000 before adding them to spot.

## Key takeaways
- In $S_{A/B}$, B is the base currency; a rise in the quote means B appreciated.
- Percentage changes of the two currencies use different denominators and are not equal and opposite.
- Cross rates chain quotes so the common currency cancels.
- Covered interest parity: $F = S(1 + i_A\tau)/(1 + i_B\tau)$; the lower-yielding currency trades at a forward premium.
- Forward points = (F − S) × 10,000; positive points mean a base-currency premium.
