---
title: "Introduction to the Global Investment Performance Standards"
---

## Learning goals
- Explain why investment performance standards are needed and who benefits from them.
- Describe who can claim compliance and why compliance is firm-wide and all-or-nothing.
- Define a composite and explain why all fee-paying discretionary portfolios must be included.
- Calculate a simple asset-weighted composite return and contrast it with an equal-weighted average.
- Describe the role of independent verification.

## Explanation

### Why performance standards exist
Imagine three managers each advertising "top-quartile returns." One shows only its best account. Another shows a back-tested model that never held real money. A third quietly dropped its worst funds from the history. All three numbers are technically "returns," yet none tells a prospective client what to expect.

These tricks have names: **cherry-picking** (showing only winning accounts or periods), **survivorship bias** (removing closed or poor portfolios from history), and presenting **simulated** results as real. The **Global Investment Performance Standards (GIPS)** are a voluntary, globally recognised set of ethical principles for calculating and presenting performance so that prospective clients can compare firms on a fair, consistent basis. This links directly to the performance presentation duty you met in Standard III: GIPS compliance is the recommended way to meet it.

**Who benefits?** Prospective clients get comparable, honest information. Compliant firms gain credibility and a common "passport" to compete across countries. And the industry as a whole earns trust, the theme of the very first lesson.

### Who complies
- **Only investment management firms** (and asset owners) can claim compliance. An individual portfolio manager, a software package or a consultant cannot.
- Compliance is **firm-wide**. The firm must define itself (for example, a distinct business entity held out to clients) and apply GIPS to all its relevant activities.
- Compliance is **all-or-nothing**. A firm cannot claim "partial compliance" or "compliant except for...". It must meet every applicable requirement.
- Compliance is **voluntary**: no law generally requires it, but many institutional clients expect it.

### Composites
A **composite** is a group of one or more portfolios managed according to a similar investment mandate, objective or strategy - for example, "Large-Cap Growth Equity" or "Short-Duration Investment-Grade Bonds."

Key rules:
- **Every actual, fee-paying, discretionary portfolio must be included in at least one composite.** This is the core defence against cherry-picking.
- Composites are defined by strategy, not by results. Portfolios cannot be moved between composites to flatter performance.
- Terminated portfolios stay in the composite's history for the periods they were managed, preventing survivorship bias.
- Non-discretionary portfolios (where client restrictions stop the manager implementing the strategy) are excluded from composites.

### Composite return
A composite's return weights each portfolio by its size, so it reflects how the firm's money actually performed. A simple version weights by beginning-of-period assets:

$$
R_C = \sum_{i=1}^{N} w_i R_i, \qquad w_i = \frac{V_{i,0}}{\sum_{j=1}^{N} V_{j,0}}
$$

where $R_C$ is the composite return, $R_i$ is the return of portfolio $i$, $V_{i,0}$ is its beginning-of-period market value, $w_i$ is its weight, and $N$ is the number of portfolios in the composite.

### Verification
**Verification** is an optional review by an independent third party. It tests whether the firm has complied with composite construction requirements and whether its policies and procedures for calculating and presenting performance are designed in compliance with GIPS. It applies to the **whole firm**, not a single composite. Verification is recommended because it adds credibility, but a firm may claim compliance without it.

## Worked example
**Scenario.** The fictional Harborview Investment Management runs three discretionary, fee-paying portfolios in its Global Dividend strategy. Beginning values and annual returns:

| Portfolio | Beginning value (USD millions) | Return |
|---|---|---|
| P1 | 50 | 6% |
| P2 | 30 | 9% |
| P3 | 20 | -2% |

**Step 1 - Total assets.** 50 + 30 + 20 = 100.

**Step 2 - Weights.** $w_1 = 50/100 = 0.50$, $w_2 = 30/100 = 0.30$, $w_3 = 20/100 = 0.20$.

**Step 3 - Weighted returns.** $0.50 \times 6\% = 3.0\%$; $0.30 \times 9\% = 2.7\%$; $0.20 \times (-2\%) = -0.4\%$.

**Step 4 - Composite return.** $3.0\% + 2.7\% - 0.4\% = 5.3\%$.

**Step 5 - Compare.** An equal-weighted average would be $(6\% + 9\% - 2\%)/3 = 4.33\%$. If Harborview dropped P3 and reported only P1 and P2, it might advertise $(50 \times 6\% + 30 \times 9\%)/80 = 7.13\%$ - a textbook cherry-pick that GIPS forbids, since P3 is a fee-paying discretionary portfolio and must be included.

**The asset-weighted composite return is 5.3%.**

## Common exam traps
- Saying an individual or a product "complies with GIPS." Only firms can claim compliance.
- Accepting "partial compliance" claims. Compliance is all-or-nothing.
- Thinking verification is mandatory, or that it covers a single composite. It is optional and firm-wide.
- Leaving out poorly performing or closed portfolios. All fee-paying discretionary portfolios belong in at least one composite, and closed ones remain in history.
- Using a simple average of portfolio returns instead of an asset-weighted composite return.

## Key takeaways
- GIPS are voluntary ethical standards that make performance fair, comparable and complete.
- Only firms claim compliance, firm-wide and in full.
- Composites group portfolios by strategy; every fee-paying discretionary portfolio must be in one.
- Composite returns are asset-weighted, not simple averages.
- Independent verification is optional, firm-wide and adds credibility.
