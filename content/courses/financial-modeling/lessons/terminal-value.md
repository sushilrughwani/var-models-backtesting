---
title: "Terminal Value: Perpetuity Growth and Exit Multiple"
---

## Learning goals
- Calculate terminal value with the perpetuity growth (Gordon growth) method.
- Calculate terminal value with an exit multiple and discount it correctly.
- Cross-check each method by deriving the implied multiple and the implied growth rate.
- Explain why terminal value dominates a DCF and how to spot an unrealistic assumption.

## Explanation

### Why we need a terminal value
A five-year forecast does not mean the business stops in year five. Terminal value (TV) captures, in one number, the value of all cash flows after the explicit forecast. Because a mature business keeps generating cash for decades, TV is usually 60-80% of enterprise value. That makes it the single most important, and most abused, number in the model.

Two approaches dominate. The **perpetuity growth method** assumes FCFF grows at a constant rate forever. The **exit multiple method** assumes the business could be sold at the end of the forecast at a multiple similar to where peers trade today.

### Perpetuity growth method

$$
TV_N = \frac{\text{FCFF}_N \times (1+g)}{\text{WACC}-g}
$$

- $TV_N$: value at the end of year $N$ of all cash flows from year $N+1$ onwards.
- $\text{FCFF}_N$: free cash flow in the final forecast year; multiplying by $(1+g)$ gives the first terminal-year cash flow.
- $g$: long-run nominal growth, which must be below WACC and should not exceed long-run nominal GDP growth (often 2-3% for developed markets).

The final-year FCFF must be a **steady-state** cash flow: margins normalised, capex roughly in line with or slightly above D&A, and working capital growing in line with $g$.

### Exit multiple method

$$
TV_N = \text{Multiple} \times \text{EBITDA}_N
$$

where the multiple is usually an EV/EBITDA taken from trading comparables and $\text{EBITDA}_N$ is final-year EBITDA. It is quick and market-anchored, but it imports today's market mood into a value five years away.

### Discounting the terminal value
Both TVs are values **at the end of year N**, so they are discounted $N$ years:

$$
PV(TV) = \frac{TV_N}{(1+\text{WACC})^N}
$$

In Excel, with WACC in `$C$4`, growth in `$C$5`, FCFF in B20:F20 and 2030 EBITDA in F18:
- Perpetuity TV: `=F20*(1+$C$5)/($C$4-$C$5)`
- Exit TV: `=C6*F18` (multiple in C6)
- PV of TV: `=F22/(1+$C$4)^5`
- PV of forecast FCFF: `=NPV($C$4,B20:F20)`

### Cross-checks
Each method implies the other's key assumption:

$$
\text{Implied multiple} = \frac{TV_{\text{growth}}}{\text{EBITDA}_N}
\qquad
\text{Implied } g = \frac{TV_{\text{exit}} \times \text{WACC} - \text{FCFF}_N}{TV_{\text{exit}} + \text{FCFF}_N}
$$

If an exit multiple implies 6% perpetual growth, the multiple is too rich. If a growth rate implies a 20x EBITDA multiple for a mature industrial, it is too high.

## Worked example
Northwind Components Ltd, USD millions. FCFF from the free cash flow lesson: 108.75, 119.75, 132.00, 138.50, 145.75 for 2026-2030. WACC is 9.0% from the WACC lesson. Terminal growth is 2.5%; 2030 EBITDA is 275 (EBIT 223 + D&A 52); the peer exit multiple is 9.0x. Cash flows are discounted at year end from a valuation date of 31 December 2025.

**Step 1 - PV of forecast FCFF.** Discount factors at 9%: 0.9174, 0.8417, 0.7722, 0.7084, 0.6499. Present values: 99.77, 100.79, 101.93, 98.12, 94.73. Sum = 495.33.

**Step 2 - Perpetuity TV.** First terminal cash flow = 145.75 × 1.025 = 149.39. TV = 149.39 / (0.09 − 0.025) = 2,298.37.

**Step 3 - Discount it.** 2,298.37 / 1.09^5 = 2,298.37 / 1.5386 = 1,493.78.

**Step 4 - Enterprise value (growth method).** 495.33 + 1,493.78 = **1,989.11**. TV is 1,493.78 / 1,989.11 = 75.1% of EV.

**Step 5 - Exit multiple TV.** 9.0 × 275 = 2,475.00; PV = 2,475.00 / 1.5386 = 1,608.58; EV = 495.33 + 1,608.58 = **2,103.91**.

**Step 6 - Cross-check.** Growth-method TV implies 2,298.37 / 275 = 8.36x EBITDA, slightly below the 9.0x exit. The exit TV implies g = (2,475 × 0.09 − 145.75) / (2,475 + 145.75) = 77.00 / 2,620.75 = 2.94%. Both sit in a plausible band, so the two methods corroborate each other, with the market multiple about 0.4 points of growth more optimistic.

## Common exam traps
- Forgetting to grow the final cash flow by $(1+g)$: dividing 145.75 by 0.065 gives 2,242.31 and understates TV.
- Discounting TV by $N+1$ years (or $N-1$) instead of $N$.
- Choosing $g$ close to WACC, which makes TV explode; a 0.5-point change in $g$ moves Northwind's TV by over 200 million.
- Applying the exit multiple to the wrong year's EBITDA (for example 2026 rather than 2030).
- Using a final year that is not steady state, such as one with heavy expansion capex or a temporary margin spike.

## Key takeaways
- TV values everything after the forecast and is often three-quarters of EV.
- Perpetuity growth: grow final FCFF one year, divide by WACC minus $g$.
- Exit multiple: final-year EBITDA times a peer multiple.
- Discount both TVs back $N$ years at WACC.
- Always cross-check implied multiple and implied growth; for Northwind, 8.36x and 2.94%.
