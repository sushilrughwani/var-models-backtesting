---
title: "Credit Value Adjustment and XVA"
---

## Learning goals
- Explain CVA as the market price of counterparty default risk.
- Calculate CVA from expected exposures, marginal default probabilities, LGD and discount factors.
- Derive marginal default probabilities from a credit spread using a constant hazard rate.
- Explain DVA, bilateral CVA, FVA and the wider XVA family, including their controversies.
- Describe wrong-way and right-way risk and their effect on CVA.

## Explanation

### From exposure to a price
The previous lesson measured how much a counterparty might owe us. CVA turns that into a number we can charge: the expected present value of the loss from counterparty default. A risk-free valuation of a derivative ignores default; the risky value is
$$
\text{Risky value} = \text{Risk-free value} - CVA
$$
Banks charge CVA to clients at trade inception, report it in accounting values and hold capital against its volatility.

### The CVA formula
Split the life of the netting set into periods. In each period, a loss occurs if the counterparty defaults during that period, and the size of the loss is LGD times the exposure at that time:
$$
CVA = LGD \sum_{i=1}^{n} EE(t_i) \times PD(t_{i-1}, t_i) \times DF(t_i)
$$
where $LGD$ is the loss given default of the counterparty, $EE(t_i)$ the expected exposure at time $t_i$, $PD(t_{i-1}, t_i)$ the marginal (unconditional) probability of default in the period and $DF(t_i)$ the risk-free discount factor. This formula assumes exposure and default are independent - an assumption we revisit under wrong-way risk.

### Default probabilities from credit spreads
CVA is a market price, so it uses **risk-neutral** PDs implied by the counterparty's CDS spread, not historical ones. With a constant hazard rate, the credit triangle gives
$$
\lambda \approx \frac{s}{LGD}, \qquad PD(t_{i-1}, t_i) = e^{-\lambda t_{i-1}} - e^{-\lambda t_i}
$$
where $s$ is the credit spread and $\lambda$ the hazard rate (default intensity).

### A handy approximation
If EE is roughly flat at its average (EPE), CVA collapses to
$$
CVA \approx EPE \times s \times \text{annuity factor}
$$
Equivalently, the CVA expressed as a running spread is about $s \times EPE/\text{notional}$. This shortcut is useful for sanity checks and exam questions.

### DVA and bilateral CVA
Our own default is also a possibility. If we default while owing the counterparty money, we "gain" because we do not pay in full. **Debit value adjustment (DVA)** mirrors CVA using our own PD, our own LGD and the **expected negative exposure (ENE)**:
$$
BCVA = CVA - DVA
$$
DVA is controversial: a bank's accounting profit rises when its own credit deteriorates, and the gain can be monetised only by defaulting (or by hedging with proxies). Regulators exclude DVA gains from capital.

### FVA and the XVA family
Uncollateralised derivatives with positive value must be funded. If a bank hedges the trade with a collateralised offsetting position, it posts collateral that it must borrow at its own funding spread. **Funding value adjustment (FVA)** charges for this cost (funding cost adjustment, FCA) and credits the benefit when the bank receives funding from negative exposures (funding benefit adjustment, FBA). Because funding spreads partly reflect a bank's own default risk, FVA can overlap with DVA - a double-counting debate. Other members of the family include **ColVA** (collateral terms), **MVA** (cost of funding initial margin) and **KVA** (cost of holding capital).

### Wrong-way and right-way risk
**Wrong-way risk** arises when exposure tends to rise just as the counterparty's credit quality falls. Classic examples: buying CDS protection from a bank highly correlated with the reference entity; a commodity producer's swap that is deep in the money to the bank when commodity prices collapse; a cross-currency swap with a sovereign whose currency would devalue on default. Wrong-way risk raises CVA above the independence formula. **Right-way risk** is the opposite and lowers CVA.

## Worked example
A bank has an uncollateralised netting set with expected exposures (USD m) of 4, 5 and 3 at the end of years 1, 2 and 3. The counterparty's CDS spread is 120 bp with LGD 60%; the risk-free rate is 3% (continuous).

**Step 1 - Hazard rate.** $\lambda = 0.012/0.60 = 0.02$.

**Step 2 - Marginal PDs.**
- Year 1: $1 - e^{-0.02} = 1.980\%$.
- Year 2: $e^{-0.02} - e^{-0.04} = 1.941\%$.
- Year 3: $e^{-0.04} - e^{-0.06} = 1.902\%$.

**Step 3 - Discount factors.** $e^{-0.03} = 0.9704$, $e^{-0.06} = 0.9418$, $e^{-0.09} = 0.9139$.

**Step 4 - Period contributions** ($LGD \times EE \times PD \times DF$).
- Year 1: $0.60 \times 4 \times 0.01980 \times 0.9704 = 0.04612$.
- Year 2: $0.60 \times 5 \times 0.01941 \times 0.9418 = 0.05484$.
- Year 3: $0.60 \times 3 \times 0.01902 \times 0.9139 = 0.03130$.

**Step 5 - Sum.** $CVA = 0.04612 + 0.05484 + 0.03130 = $ **USD 0.1323 m** (about USD 132,000).

**Check with the approximation.** EPE $= 4$, annuity $= 2.8261$: $4 \times 0.012 \times 2.8261 = 0.1357$, close to the exact answer.

**Extension - DVA.** If the bank's own spread is 60 bp (LGD 60%) and its ENE is 2, 2 and 1, DVA = 0.0281 and bilateral CVA = 0.1323 - 0.0281 = 0.1042.

## Common exam traps
- Using historical PDs; CVA is a price and uses risk-neutral, spread-implied PDs.
- Using cumulative instead of marginal default probabilities in each period.
- Dividing the spread by the recovery rate rather than by LGD to get the hazard rate.
- Using EE in the DVA calculation; DVA uses the bank's own negative exposure (ENE).
- Forgetting that wrong-way risk invalidates the independence assumption and raises CVA.

## Key takeaways
- CVA = LGD × Σ EE × marginal PD × DF: the expected discounted loss from counterparty default.
- Hazard rate ≈ spread / LGD; marginal PD = difference of survival probabilities.
- CVA ≈ EPE × spread × annuity is a good sanity check.
- BCVA = CVA - DVA; DVA is accounting-real but economically controversial.
- FVA prices funding costs and benefits, and may overlap with DVA.
- Wrong-way risk raises CVA; right-way risk lowers it.
