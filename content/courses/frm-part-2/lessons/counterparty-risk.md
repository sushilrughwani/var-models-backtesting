---
title: "Counterparty Risk and Exposure"
---

## Learning goals
- Explain what makes counterparty credit risk different from lending risk.
- Define and compare exposure metrics: current exposure, expected exposure, PFE, EPE and effective EPE.
- Calculate the effect of netting on exposure and the net-to-gross ratio.
- Calculate collateral calls with thresholds, minimum transfer amounts and existing collateral.
- Estimate expected exposure and PFE under a normal approximation, including over a margin period of risk.

## Explanation

### Why derivatives exposure is different
A loan has a known exposure: the amount lent. A derivative's exposure is its replacement cost if the counterparty defaults, which depends on future market moves. Two features stand out. First, exposure is **asymmetric**: you lose only when the contract has positive value to you, so exposure is $\max(V, 0)$. Second, exposure can be **bilateral**: either party may end up owing the other. Counterparty risk therefore combines market risk (how large exposure can grow) with credit risk (whether the counterparty defaults).

### The exposure vocabulary
- **Current exposure (CE):** $\max(V_0, 0)$ today.
- **Expected exposure (EE):** the average of $\max(V_t, 0)$ across simulated scenarios at future date $t$.
- **Potential future exposure (PFE):** a high quantile (e.g. 95% or 99%) of the exposure distribution at date $t$ - a "worst reasonable" exposure used for credit limits.
- **Expected positive exposure (EPE):** the time-average of EE over a horizon.
- **Effective EE / effective EPE:** EE forced to be non-decreasing (to reflect likely rollover of short trades), then time-averaged over the first year; used in regulatory capital.

Exposure profiles have characteristic shapes. An interest rate swap's exposure is **hump-shaped**: uncertainty about rates grows over time (diffusion), but the number of remaining payments shrinks (amortisation). A cross-currency swap or FX forward has exposure that keeps growing to maturity because of the large final exchange of principal.

### Netting
Under a legally enforceable netting agreement, all trades with a counterparty in the same netting set are combined on default. Without netting, the bank is exposed to the sum of positive values; with netting, only to the positive net value:
$$
\text{Gross} = \sum_i \max(V_i, 0), \qquad \text{Net} = \max\Big(\sum_i V_i,\, 0\Big)
$$
The **net-to-gross ratio** (net / gross) measures the benefit; lower is better. Netting helps most when trades have negatively correlated values.

### Collateral and margin
Collateral reduces exposure further. A credit support annex specifies:
- **Threshold:** exposure below which no collateral is called.
- **Minimum transfer amount (MTA):** a call is made only if the amount due is at least this size.
- **Initial margin:** extra collateral posted up front to cover moves during the time it takes to close out.

The required collateral is $\max(\text{exposure} - \text{threshold}, 0)$; the call is that amount minus collateral already held, made only if it reaches the MTA.

### The margin period of risk
Even with daily margining, a defaulting counterparty stops posting. The bank faces moves over the **margin period of risk (MPOR)** - typically 10 business days for bilateral trades - before it can close out. Collateral cuts exposure from a function of the full trade horizon to a function of the MPOR.

### A normal approximation
If the change in portfolio value over horizon $t$ is normal with mean zero and standard deviation $\sigma\sqrt{t}$:
$$
EE_t = \sigma\sqrt{t}\,\varphi(0) \approx 0.3989\,\sigma\sqrt{t}, \qquad PFE_t(\alpha) = \sigma\sqrt{t}\,z_\alpha
$$
where $\sigma$ is the annual volatility of the portfolio value in currency units, $\varphi(0)$ the standard normal density at zero and $z_\alpha$ the normal quantile. Both grow with $\sqrt{t}$.

## Worked example
A bank has four trades with one counterparty (USD m): +10, -6, +4 and -3. The trades are under one netting agreement and a CSA with a threshold of 2 and an MTA of 0.5. The bank already holds collateral of 1.

**Step 1 - Gross exposure.** $10 + 4 = 14$ (negative values contribute zero).

**Step 2 - Net exposure.** $\max(10 - 6 + 4 - 3, 0) = 5$. Net-to-gross ratio $= 5/14 = 0.357$.

**Step 3 - Collateral call.** Required collateral $= 5 - 2 = 3$. Already held: 1. Call $= 3 - 1 = 2$, which exceeds the 0.5 MTA, so the bank calls **USD 2 m**. Remaining uncollateralised exposure equals the threshold, 2.

**Step 4 - Future exposure without collateral.** Suppose the netting set's value has annual volatility of USD 3 m (6% of a 50 m notional) and zero drift.
- $EE_{1y} = 0.3989 \times 3 = 1.197$.
- $PFE_{1y}(99\%) = 2.3263 \times 3 = 6.98$.

**Step 5 - With daily margining and a 10-day MPOR.** $\sigma\sqrt{10/250} = 3 \times 0.2 = 0.60$, so $PFE_{99\%} = 2.3263 \times 0.60 =$ **USD 1.40 m** (plus any threshold). Collateral cuts 99% PFE by about 80%.

## Common exam traps
- Adding negative trade values to gross exposure; gross counts only positive values.
- Forgetting the existing collateral when computing the call, or ignoring the MTA test.
- Confusing PFE (a quantile) with EE (an average); PFE is always larger for a normal profile.
- Assuming collateral removes all exposure: the threshold and MPOR leave residual risk.
- Expecting an interest rate swap's exposure to peak at maturity; it peaks part-way through.

## Key takeaways
- Counterparty exposure is $\max(V, 0)$: asymmetric, uncertain and possibly bilateral.
- EE is the average future exposure; PFE is a high quantile; EPE averages EE over time.
- Netting replaces the sum of positive values with the positive net value.
- Collateral call = max(exposure - threshold, 0) - collateral held, if at least the MTA.
- Under a normal model, EE ≈ 0.40σ√t and PFE = zσ√t; the MPOR sets t for collateralised trades.
