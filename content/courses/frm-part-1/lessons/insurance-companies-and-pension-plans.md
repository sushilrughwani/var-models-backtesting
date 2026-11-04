---
title: "Insurance Companies and Pension Plans"
---

## Learning goals
- Describe the main life insurance and annuity products and the risks each creates for the insurer.
- Use a mortality table to compute survival and death probabilities and a breakeven term-insurance premium.
- Calculate the loss ratio, expense ratio, combined ratio and operating ratio of a property-casualty insurer.
- Explain moral hazard and adverse selection in insurance and how insurers manage them.
- Compare defined benefit and defined contribution pension plans and identify who bears the risk.

## Explanation

### Life insurance and annuities
Insurers collect premiums up front, invest the float and pay claims later. Life insurers sell:
- **Term life**: pays only if the insured dies within the term. Pure mortality cover, no savings element.
- **Whole life**: lifelong cover with a savings component that builds cash value.
- **Variable and universal life**: whole-life variants where the policyholder chooses investments or adjusts premiums and cover.
- **Annuities**: the reverse of life insurance. The insurer pays an income while the person lives, so it loses money if people live longer than expected.

Life insurance exposes the insurer to **mortality risk** (people die sooner); annuities expose it to **longevity risk** (people live longer). An insurer selling both enjoys a partial natural hedge.

### Mortality tables
A mortality table gives, for each age $x$, the probability $q_x$ that a person aged exactly $x$ dies within the next year. Survival over several years multiplies one-year survival probabilities:

$$
P(\text{die in year } n) = \left[\prod_{k=0}^{n-2} (1-q_{x+k})\right] q_{x+n-1}
$$

where $x$ is current age and $n$ the year in question. The breakeven (actuarially fair) premium equates the present value of expected premiums with the present value of expected payouts. A common simplifying assumption is that deaths occur, on average, halfway through the year, while premiums are paid at the start of each year by survivors.

### Property-casualty insurance
Property insurance covers loss of or damage to assets (fire, theft, storms); casualty (liability) insurance covers legal liability to third parties. Liability claims can arrive years later, and catastrophes create correlated losses that insurers lay off through **reinsurance** or catastrophe bonds.

Key ratios, all expressed as a percentage of premiums earned:

$$
\text{Combined ratio} = \text{Loss ratio} + \text{Expense ratio}
$$

$$
\text{Operating ratio} = \text{Combined ratio after dividends} - \text{Investment income ratio}
$$

The **loss ratio** is claims paid and reserved divided by premiums; the **expense ratio** covers selling and administrative costs (including loss-adjustment expenses). Adding policyholder dividends gives the combined ratio after dividends. A combined ratio above 100% means an underwriting loss, but the insurer can still be profitable if investment income on the float is large enough to push the operating ratio below 100%.

### Moral hazard and adverse selection
**Moral hazard**: once insured, people take less care (a driver with full cover drives less carefully). Insurers respond with deductibles, co-insurance and policy limits. **Adverse selection**: those who know they are high risk are the keenest buyers, so pooled pricing attracts the wrong customers. Insurers respond with underwriting, medical checks and risk-based pricing.

### Regulation and capital
Insurers hold reserves for expected claims and capital for unexpected losses. The EU's Solvency II regime uses a three-pillar structure like bank regulation; US insurers are regulated mainly by states, with state guaranty funds protecting policyholders.

### Pension plans
In a **defined benefit (DB)** plan, the employer promises a pension based on a formula (for example, a percentage of final salary per year of service). The employer bears investment, interest-rate and longevity risk; if assets fall short of the present value of liabilities, the plan is underfunded. Falling interest rates raise liability values and can widen deficits even when assets perform well. In a **defined contribution (DC)** plan, employer and employee contribute to an individual account; the pension is whatever the account buys at retirement, so the employee bears the risks.

## Worked example
**Part A: term insurance.** A 60-year-old buys a two-year term policy paying USD 1,000,000 on death. From the table, $q_{60} = 0.010$ and $q_{61} = 0.011$. The interest rate is 4% annual compounding. Deaths occur mid-year; premiums are paid at the start of each year by survivors.

1. Probability of death in year 1 = 0.010.
2. Probability of death in year 2 = 0.990 × 0.011 = 0.01089.
3. PV of expected payout = 1,000,000 × (0.010 / 1.04^0.5 + 0.01089 / 1.04^1.5) = 9,805.81 + 10,267.81 = 20,073.62.
4. PV of premium of 1 per year = 1 + 0.990 / 1.04 = 1.95192.
5. Breakeven premium = 20,073.62 / 1.95192 = **USD 10,284.02 per year**.

**Part B: P&C ratios.** An insurer has a loss ratio of 72%, an expense ratio of 27%, policyholder dividends of 1% and investment income of 3% of premiums.

1. Combined ratio = 72% + 27% = 99%.
2. Combined ratio after dividends = 99% + 1% = 100%: underwriting breaks even.
3. Operating ratio = 100% − 3% = **97%**, so the insurer earns a pre-tax profit of 3% of premiums.

## Common exam traps
- Forgetting to multiply by the probability of surviving year 1 when computing the probability of death in year 2.
- Discounting death payouts to year-end when the question says deaths occur mid-year.
- Treating a combined ratio above 100% as proof of a loss; investment income can make the firm profitable.
- Confusing moral hazard (behaviour changes after insurance) with adverse selection (high risks buy more insurance).
- Saying employees bear the investment risk in a DB plan; that is a DC feature.

## Key takeaways
- Term life is pure mortality cover; annuities create longevity risk, and the two partially offset.
- Breakeven premiums equate expected PV of premiums and payouts using mortality probabilities.
- Combined ratio = loss ratio + expense ratio; operating ratio subtracts investment income.
- Deductibles and co-insurance fight moral hazard; underwriting fights adverse selection.
- DB plans leave risk with the employer; DC plans move it to the employee.
