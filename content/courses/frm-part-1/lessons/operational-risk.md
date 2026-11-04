---
title: "Operational Risk"
---

## Learning goals
- Define operational risk and classify losses into the seven standard event types.
- Describe the older Basel approaches (basic indicator, standardised, advanced measurement) and why they were replaced.
- Calculate operational risk capital under the Basel III standardised approach using the business indicator component and internal loss multiplier.
- Explain how banks model operational losses with frequency and severity distributions, scenario analysis and key risk indicators.
- Discuss how insurance and controls reduce operational risk.

## Explanation

### What counts as operational risk
Market and credit risk are taken deliberately to earn a return. Operational risk is different: it is the risk of loss from **inadequate or failed internal processes, people and systems, or from external events**. It includes legal risk but excludes strategic and reputational risk. It ranges from frequent, small events (processing errors) to rare, catastrophic ones (rogue trading, cyberattacks, large conduct fines).

Basel classifies losses into seven event types:
1. **Internal fraud**: unauthorised trading, theft or deliberate misreporting by employees.
2. **External fraud**: robbery, forgery, hacking by outsiders.
3. **Employment practices and workplace safety**: discrimination claims, health and safety breaches.
4. **Clients, products and business practices**: mis-selling, market manipulation, breaches of fiduciary duty. Historically the source of the largest losses.
5. **Damage to physical assets**: fires, floods, terrorism.
6. **Business disruption and system failures**: IT outages, utility failures.
7. **Execution, delivery and process management**: data-entry errors, failed settlements, documentation mistakes.

### Older regulatory approaches
- **Basic indicator approach (BIA)**: capital = 15% of average annual gross income over the last three years, counting only years with positive gross income.
- **Standardised approach (TSA)**: gross income split into eight business lines, each with a factor of 12%, 15% or 18%.
- **Advanced measurement approach (AMA)**: banks used internal models to estimate the 99.9% one-year loss quantile.

AMA produced widely differing capital for similar banks and was hard to compare or validate. Gross income was also a crude size proxy. Basel III replaced all three with a single new standardised approach.

### The Basel III standardised approach
Step 1: the **business indicator (BI)** is a size measure built from interest, services and financial components of the income statement.

Step 2: the **business indicator component (BIC)** applies marginal coefficients to the BI, like income tax brackets:

| BI range (EUR) | Marginal coefficient |
|---|---|
| up to 1 bn | 12% |
| 1 bn to 30 bn | 15% |
| above 30 bn | 18% |

Step 3: the **loss component (LC)** is 15 times the bank's average annual operational loss over the last ten years.

Step 4: the **internal loss multiplier (ILM)** adjusts for loss history:

$$
\text{ILM} = \ln\!\left(e - 1 + \left(\frac{\text{LC}}{\text{BIC}}\right)^{0.8}\right)
$$

When LC equals BIC, ILM is 1. A worse-than-average loss history pushes ILM above 1; a better one pulls it below 1. Regulators may set ILM to 1, and banks in the smallest bucket use ILM = 1.

Step 5: capital

$$
\text{ORC} = \text{BIC} \times \text{ILM}
$$

### Internal modelling and management
Banks still model operational risk for economic capital. The **loss distribution approach** combines a **frequency** distribution (often Poisson) for the number of losses per year with a **severity** distribution (often lognormal or a heavy-tailed power law) for the size of each loss, then uses Monte Carlo simulation to get the annual loss distribution. Internal data are thin in the tail, so banks add external loss databases and **scenario analysis**, where experts estimate rare-event losses. **Key risk indicators** such as staff turnover, failed trades or system downtime give early warning. **Insurance** can transfer some losses, but moral hazard and adverse selection limit cover, and deductibles leave the bank exposed to high-frequency losses.

## Worked example
A bank has a business indicator of EUR 12 billion and average annual operational losses of EUR 150 million over the past ten years. Compute its capital under the standardised approach.

1. BIC: $0.12 \times 1 + 0.15 \times (12 - 1) = 0.12 + 1.65 =$ EUR 1.77 billion.
2. LC: $15 \times 0.150 =$ EUR 2.25 billion.
3. Ratio: $\text{LC}/\text{BIC} = 2.25 / 1.77 = 1.2712$.
4. Raise to 0.8: $1.2712^{0.8} = 1.2116$.
5. ILM: $\ln(2.71828 - 1 + 1.2116) = \ln(2.9299) = 1.0750$.
6. Capital: $1.77 \times 1.0750 =$ **EUR 1.903 billion**.

The bank's losses are heavier than its size alone suggests, so it holds about 7.5% more capital than the BIC.

## Common exam traps
- Applying 15% to the whole BI. Coefficients are marginal: only the slice above EUR 1 billion gets 15%.
- Forgetting the factor of 15 in the loss component.
- Including negative gross-income years in the BIA average; they are excluded from both numerator and denominator.
- Classifying rogue trading as external fraud or execution error; unauthorised trading by an employee is internal fraud.
- Treating reputational or strategic losses as operational risk under the regulatory definition.

## Key takeaways
- Operational risk is loss from failed processes, people, systems or external events; legal risk is included.
- Seven event types; clients, products and business practices has historically caused the largest losses.
- Basel III uses one standardised approach: capital = BIC × ILM.
- BIC uses marginal 12% / 15% / 18% coefficients; ILM rises when LC exceeds BIC.
- Frequency-severity modelling, scenarios, KRIs and insurance support internal management.
