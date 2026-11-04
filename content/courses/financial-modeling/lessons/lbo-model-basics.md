---
title: "LBO Model Basics"
---

## Learning goals
- Build a sources and uses table for a leveraged buyout.
- Project cash available for debt repayment and a simple cash sweep.
- Calculate sponsor returns as MOIC and IRR, in Excel and by hand.
- Attribute returns to EBITDA growth, multiple change and debt paydown.

## Explanation

### The idea in one paragraph
A financial sponsor (private equity fund) buys a company using a large amount of borrowed money and a smaller cheque of its own equity. Over a holding period of about five years, the company's cash flow pays down the debt, and ideally EBITDA grows. At exit the sponsor sells the business, repays the remaining debt and keeps the rest. Because the equity cheque was small relative to the price, modest growth in enterprise value becomes a large percentage gain on equity. It is a homeowner who buys with a 50% mortgage, lets the rent pay down the loan, and sells after five years.

### Sources and uses
Uses are what the money pays for: the purchase of the equity, refinancing of existing debt and other claims, and transaction fees. Sources are where the money comes from: tranches of new debt (sized as multiples of EBITDA) and sponsor equity, which is the plug.

$$
\text{Sponsor equity} = \text{Total uses} - \text{Total new debt}
$$

### Debt schedule and cash sweep
Each year:

$$
\text{CFADS} = \text{EBITDA} - \text{Interest} - \text{Cash taxes} - \text{Capex} - \Delta\text{NWC}
$$

where CFADS is cash flow available for debt service after interest, and cash taxes are levied on EBIT minus interest. Unlike FCFF, interest is deducted because we now track the lenders' claim explicitly. A **cash sweep** sends all CFADS to repay the senior loan first. To avoid a circular reference, a simple model charges interest on the **opening** balance; a more precise one uses the average balance with iterative calculation switched on.

### Returns

$$
\text{MOIC} = \frac{\text{Equity at exit}}{\text{Equity invested}}
\qquad
\text{IRR} = \text{MOIC}^{1/n} - 1
$$

The shortcut for IRR holds when there is one cash outflow at entry and one inflow at exit after $n$ years. In Excel, lay out the sponsor cash flows by year and use `=IRR(B50:G50)`; check with `=(G50/-B50)^(1/5)-1`. MOIC is `=G50/-B50`.

### Where returns come from
Equity gain = EBITDA growth × exit multiple + change in multiple × entry EBITDA + net debt reduction − fees. If entry and exit multiples are equal, the multiple term is zero.

## Worked example
A sponsor buys Northwind Components Ltd on 31 December 2025 at 9.5x LTM EBITDA of USD 200 million. Figures in USD millions; tax 25%; operating forecast from the earlier lessons (2026-2030 EBITDA 219, 237, 256, 266, 275; EBIT 175, 191, 208, 216, 223; capex 56, 59, 62, 65, 67; NWC increase 10.5, 10.5, 10.0, 8.5, 6.5).

**Step 1 - Sources and uses.** EV = 9.5 × 200 = 1,900. Bridge items from the equity value lesson total 313, so the equity purchase price is 1,587, which is USD 30.53 per diluted share using (1,587 + 80) / 54.6, an 11.0% premium to the 27.50 market price.

| Uses | | Sources | |
|---|---|---|---|
| Equity purchase | 1,587 | Senior loan (4.0x, 7%) | 800 |
| Refinance net debt and other claims | 313 | Subordinated notes (1.0x, 10%) | 200 |
| Fees | 40 | Sponsor equity (plug) | 940 |
| **Total** | **1,940** | **Total** | **1,940** |

**Step 2 - Year 1 (2026).** Interest = 800 × 7% + 200 × 10% = 56 + 20 = 76.00. Taxes = (175 − 76) × 25% = 24.75. CFADS = 219 − 76 − 24.75 − 56 − 10.5 = 51.75. Senior loan falls to 800 − 51.75 = 748.25.

**Step 3 - Roll forward.**

| | 2026 | 2027 | 2028 | 2029 | 2030 |
|---|---|---|---|---|---|
| Interest | 76.00 | 72.38 | 67.79 | 62.11 | 55.68 |
| CFADS | 51.75 | 65.47 | 81.15 | 91.91 | 103.99 |
| Senior loan, closing | 748.25 | 682.78 | 601.63 | 509.71 | 405.72 |

**Step 4 - Exit at end of 2030.** EV = 9.5 × 275 = 2,612.50. Net debt = 405.72 + 200 = 605.72. Equity = 2,006.78.

**Step 5 - Returns.** MOIC = 2,006.78 / 940 = **2.13x**. IRR = 2.1349^(1/5) − 1 = **16.4%**.

**Step 6 - Attribution.** EBITDA growth: (275 − 200) × 9.5 = 712.50. Debt paydown: 1,000 − 605.72 = 394.28. Fees: −40. Total gain 1,066.78 = 2,006.78 − 940. Exiting at 10.5x would lift IRR to 19.4%; at 8.5x it falls to 13.0%, showing how much rides on the exit multiple.

## Common exam traps
- Forgetting fees in uses, which understates the equity cheque.
- Using FCFF (before interest) to repay debt; the lenders' interest must be paid first.
- Computing IRR as (MOIC − 1) / years, which ignores compounding (22.7% instead of 16.4%).
- Deducting only the senior loan at exit and forgetting the subordinated notes.
- Charging interest on closing balances without enabling iterative calculation, creating a circular reference error.

## Key takeaways
- Sponsor equity is the plug: total uses minus new debt.
- CFADS after interest and taxes sweeps down the senior debt.
- MOIC = exit equity / entry equity; IRR = MOIC^(1/n) − 1 for a single entry and exit.
- Returns come from EBITDA growth, multiple expansion and debt paydown, less fees.
- Northwind at 9.5x in and out: 2.13x MOIC and 16.4% IRR over five years.
