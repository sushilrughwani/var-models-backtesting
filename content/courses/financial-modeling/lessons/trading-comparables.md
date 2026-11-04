---
title: "Trading Comparables Analysis"
---

## Learning goals
- Select a peer group using business, size, growth and risk criteria.
- Calculate peer enterprise values and calendarise metrics to a common year end.
- Choose appropriate multiples and match numerators with denominators.
- Apply a multiple range to the target and bridge to value per share.

## Explanation

### Pricing by comparison
A DCF asks what the cash flows are worth. Trading comparables ("comps") ask what investors are paying today for similar businesses. It is how you price a house: look at what similar houses on the same street sold for per square metre, then adjust. Comps are fast, market-based and easy to explain, but they inherit any mispricing in the sector.

### Step 1: choose the peers
Good peers share the same end markets and business model, similar size, growth and margins, and comparable risk (geography, leverage, customer concentration). Five to ten peers is typical. A peer that is a perfect business match but growing three times faster may still belong in the set, but you will flag it and lean on the median.

### Step 2: compute EV consistently
For each peer:

$$
EV = \text{Diluted market cap} + \text{Debt} - \text{Cash} + \text{NCI} + \text{Preferred}
$$

Diluted market cap uses the current share price and treasury stock method shares, exactly as in the previous lesson but at the market price. Balance sheet items come from the latest filing.

### Step 3: calendarise
Peers have different fiscal year ends. To compare like with like, convert each metric to the same calendar year. For a peer whose fiscal year ends $m$ months into the calendar year:

$$
\text{CY metric} = \frac{m}{12}\,\text{FY}_{\text{ending in CY}} + \frac{12-m}{12}\,\text{FY}_{\text{ending next CY}}
$$

A June year end ($m = 6$) blends half and half; a March year end ($m = 3$) takes one quarter of the fiscal year ending in March and three quarters of the following one. In Excel: `=(C2/12)*D7+((12-C2)/12)*E7`.

### Step 4: choose multiples
The numerator and denominator must belong to the same capital providers:
- **EV/EBITDA** and **EV/EBIT**: EV belongs to all capital providers, as does EBITDA. Less affected by leverage and depreciation policy, so the workhorse for industrials.
- **P/E**: price per share over EPS, both equity measures. Useful as a cross-check, but affected by leverage and tax.
- **EV/Revenue**: for loss-making or early-stage companies.

Forward (next-year) multiples are usually preferred because valuation is about the future and they smooth one-off items in historical results.

### Step 5: apply the range
Summarise with the median and the interquartile range rather than the mean, which a single outlier can drag: `=MEDIAN(E5:E9)`, `=QUARTILE.INC(E5:E9,1)` and `=QUARTILE.INC(E5:E9,3)`. Multiply by the target's metric to get implied EV, then use the equity bridge.

## Worked example
Northwind Components Ltd (December year end) is valued on calendar 2026 EBITDA of USD 219 million. Peer data (USD millions):

| Peer | EV | CY2026E EBITDA | EV/EBITDA |
|---|---|---|---|
| Ashby Precision | 1,512 | 180 | 8.4x |
| Calder Motion | 2,730 | 300 | 9.1x |
| Fenwick Drives | 1,216 | 160 | 7.6x |
| Halvorsen Bearings | 3,570 | 350 | 10.2x |
| Kestrel Fluidics | 1,144 | 130 | 8.8x |

**Step 1 - A peer EV.** Ashby trades at USD 18.00 with 70 million diluted shares: market cap 1,260. Add debt of 320, deduct cash of 80, add NCI of 12: EV = 1,512.

**Step 2 - Calendarise Fenwick.** Its year ends 30 June. FY2026 (July 2025 to June 2026) EBITDA is 150 and FY2027 is 170. CY2026 = 0.5 × 150 + 0.5 × 170 = 160, giving 1,216 / 160 = 7.6x.

**Step 3 - Summary statistics.** Sorted multiples: 7.6, 8.4, 8.8, 9.1, 10.2. Median 8.8x; first quartile 8.4x; third quartile 9.1x; mean 8.82x. Halvorsen's premium reflects faster growth, so the median and quartiles are the better guide.

**Step 4 - Implied EV.** 8.4 × 219 = 1,839.6; 8.8 × 219 = 1,927.2; 9.1 × 219 = 1,992.9.

**Step 5 - To equity and per share.** Bridge adjustments from the previous lesson total −313 (−420 debt + 95 cash − 18 NCI + 30 associate). At the median, equity = 1,927.2 − 313 = 1,614.2. Using the closed-form dilution formula, price = (1,614.2 + 80) / 54.6 = 31.03. The quartiles give 29.42 and 32.23.

**Trading comps value Northwind at USD 29.42 to 32.23 per share, with a midpoint of 31.03**, against a market price of 27.50. As a P/E cross-check, 2026E net income of 112.5 over 51.69 million diluted shares gives EPS of 2.18; peer P/E quartiles of 14.5x to 16.0x imply USD 31.56 to 34.82.

## Common exam traps
- Mismatching numerator and denominator, such as market cap / EBITDA or EV / net income.
- Comparing a June year end peer's fiscal numbers directly with December year end numbers.
- Using the mean when one outlier distorts it.
- Applying an EV multiple and then forgetting the bridge, treating EV as equity value.
- Mixing LTM multiples for peers with forward metrics for the target.

## Key takeaways
- Comps price the target off what the market pays for similar businesses today.
- Compute peer EV consistently and calendarise to a common year.
- Match the multiple's numerator and denominator to the same capital providers.
- Use the median and quartiles, then bridge from EV to equity per share.
- Northwind on 8.4x to 9.1x CY2026E EBITDA: USD 29.42 to 32.23 per share.
