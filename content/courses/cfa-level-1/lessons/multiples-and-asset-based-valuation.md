---
title: "Equity Valuation: Multiples and Asset-Based Approaches"
---

## Learning goals
- Explain how price multiples are used through comparables and through fundamentals.
- Calculate justified leading and trailing P/E ratios and a justified P/B from the Gordon growth model.
- Calculate enterprise value and use EV/EBITDA to derive a value per share.
- Describe the strengths and weaknesses of P/E, P/B, P/S and EV/EBITDA.
- Apply an asset-based valuation and identify when it is most and least suitable.

## Explanation

### Two ways to use a multiple
A multiple compresses value into one ratio such as price per unit of earnings. There are two ways to use one:
- **Method of comparables:** compare a firm's multiple with those of similar firms (peers, the industry or its own history). By the law of one price, similar assets should trade at similar multiples. This tells you about *relative* value: a stock can be cheap relative to peers while the whole sector is overvalued.
- **Method based on fundamentals:** derive the multiple that a valuation model justifies, then compare it with the actual multiple.

### Justified multiples from the Gordon model
Divide the Gordon value $V_0 = D_1/(r-g)$ by next year's earnings $E_1$ to get the **justified leading P/E**:

$$
\frac{P_0}{E_1} = \frac{D_1/E_1}{r - g} = \frac{1 - b}{r - g}
$$

and dividing by current earnings $E_0$ gives the **justified trailing P/E**:

$$
\frac{P_0}{E_0} = \frac{(1 - b)(1 + g)}{r - g}
$$

where $1-b$ is the payout ratio, $r$ the required return and $g$ the growth rate. Higher payout, higher growth or lower risk all justify a higher P/E. Similarly, with $g = b \times \text{ROE}$ the **justified P/B** is

$$
\frac{P_0}{B_0} = \frac{\text{ROE} - g}{r - g}
$$

so a firm earning an ROE above its cost of equity deserves a P/B above 1.

### Common multiples
- **P/E:** intuitive and widely used, but earnings can be negative, volatile or distorted by one-off items and accounting choices.
- **P/B:** book value is usually positive and stable, suits banks and insurers whose assets are near market value, but ignores intangibles and is distorted by buybacks and accounting differences.
- **P/S:** sales are hard to manipulate and positive even for loss-making firms, but sales say nothing about profitability or cost structure.
- **EV/EBITDA:** an enterprise multiple that compares firms with different leverage. **Enterprise value** is the value of the whole firm:

$$
\text{EV} = \text{Market value of equity} + \text{Debt} + \text{Preferred} + \text{Minority interest} - \text{Cash}
$$

Because EV belongs to all capital providers, it is paired with a pre-interest measure such as EBITDA. To get to equity value from EV, reverse the bridge: subtract debt, preferred and minority interest, then add cash.

### Asset-based valuation
Asset-based valuation values a company as the fair value of its assets minus the fair value of its liabilities. It works best for firms whose assets are mostly tangible and easily valued (holding companies, natural resource firms, real estate firms, financial firms) and for firms being liquidated. It works poorly when much of the value is intangible (brands, software, people) or when assets are specialised and hard to price. It can also provide a floor value.

## Worked example
A target company has EBITDA of USD 120 million, debt of USD 300 million, cash of USD 60 million and 40 million shares. Comparable firms trade at a median EV/EBITDA of 8.0x and a median P/E of 14x. The target's EPS is USD 2.10.

**EV/EBITDA approach**
1. Implied EV $= 8.0 \times 120 = 960$.
2. Equity value $= 960 - 300 + 60 = 720$.
3. Value per share $= 720/40 = $ **USD 18.00**.

**P/E approach**: $14 \times 2.10 = $ USD 29.40. The large gap could reflect differences in leverage, tax rates or depreciation between the target and its peers. EV/EBITDA is less affected by differences in capital structure, which is why analysts favour it when leverage differs. Investigate before choosing.

**Justified P/E check**: if the payout ratio is 40%, $r = 9\%$ and $g = 5\%$, the justified leading P/E is $0.40/0.04 = 10.0$x and the trailing P/E is $10.0 \times 1.05 = 10.5$x.

**Asset-based check**: book assets are USD 500 million; real estate is worth USD 80 million more than book and inventory USD 15 million less; liabilities are USD 260 million. Adjusted equity $= 500 + 80 - 15 - 260 = 305$, or $305/40 = $ USD 7.63 per share. That is far below both earnings-based values, which suggests much of the firm's value lies in its earning power rather than its balance sheet; the asset-based figure acts as a floor.

## Common exam traps
- Pairing an equity numerator with a firm-level denominator (P/EBITDA) or EV with net income.
- Forgetting to add cash (or subtract debt) when moving from EV to equity value.
- Mixing up leading and trailing justified P/E: the trailing version multiplies by $(1+g)$.
- Concluding a stock is undervalued because it is cheap relative to peers, when the whole peer group may be overvalued.
- Applying asset-based valuation to firms whose value is mainly intangible.

## Key takeaways
- Multiples are used relatively (comparables) or absolutely (justified by fundamentals).
- Justified leading P/E $= (1-b)/(r-g)$; trailing adds the factor $(1+g)$; justified P/B $= (\text{ROE}-g)/(r-g)$.
- EV = equity + debt + preferred + minority interest − cash; pair it with EBITDA or other pre-interest measures.
- Each multiple has blind spots: P/E for volatile earnings, P/B for intangibles, P/S for profitability.
- Asset-based values suit tangible-asset or liquidating firms and can act as a floor.
