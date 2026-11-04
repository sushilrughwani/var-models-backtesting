---
title: "Operational Risk Capital and the Standardised Approach"
---

## Learning goals
- Explain why the Basel framework replaced the earlier operational risk approaches with a single standardised approach.
- Calculate the business indicator (BI) from its three components.
- Calculate the business indicator component (BIC) using marginal coefficients across the three buckets.
- Calculate the loss component, the internal loss multiplier (ILM) and operational risk capital.

## Explanation

### From many approaches to one
Earlier rules let banks choose between a basic indicator approach (a flat 15% of gross income), a standardised approach (business-line betas of 12-18%) and the advanced measurement approach (AMA), in which banks built their own loss-distribution models. AMA produced capital numbers that were hard to compare across banks and easy to optimise, while gross income was a poor size proxy (a bank with collapsing margins looked *less* risky). The final Basel III reforms replaced all of them with one **standardised approach (SA)** built from two ingredients: a better size measure (the BI) and the bank's own loss history (the loss component).

### Step 1: the business indicator
The BI is a financial-statement measure of size, built from three components, each averaged over the last three years:

$$
\text{BI} = \text{ILDC} + \text{SC} + \text{FC}
$$

- **ILDC** (interest, leases and dividend component) $= \min(|\text{interest income} - \text{interest expense}|,\ 2.25\% \times \text{interest-earning assets}) + \text{dividend income}$. The cap stops banks with unusually high margins being over-penalised.
- **SC** (services component) $= \max(\text{other operating income}, \text{other operating expense}) + \max(\text{fee income}, \text{fee expense})$.
- **FC** (financial component) $= |\text{net P\&L trading book}| + |\text{net P\&L banking book}|$.

Using absolute values and maxima means losses and expenses count as activity too - a bank cannot shrink its BI by losing money.

### Step 2: the business indicator component
The BIC applies **marginal** coefficients to slices of the BI (in EUR billion):

| Bucket | BI range | Marginal coefficient |
|---|---|---|
| 1 | up to 1 | 12% |
| 2 | 1 to 30 | 15% |
| 3 | above 30 | 18% |

Like income tax brackets, each rate applies only to the slice of BI inside its bucket, so a bank with a BI of 12 pays 12% on the first 1 and 15% on the next 11. Rising coefficients reflect the empirical finding that operational risk grows faster than size.

### Step 3: the loss component and ILM
The loss component captures the bank's own history:

$$
\text{LC} = 15 \times \text{average annual operational losses over the last 10 years}
$$

The **internal loss multiplier** scales the BIC up or down:

$$
\text{ILM} = \ln\!\left(e - 1 + \left(\frac{\text{LC}}{\text{BIC}}\right)^{0.8}\right)
$$

$$
\text{ORC} = \text{BIC} \times \text{ILM}
$$

where ORC is operational risk capital and $e \approx 2.718$. Key properties:
- If $\text{LC} = \text{BIC}$, then $\text{ILM} = \ln(e) = 1$: capital equals the BIC.
- Worse-than-average loss history ($\text{LC} > \text{BIC}$) pushes ILM above 1; a cleaner history pushes it below 1.
- The exponent 0.8 and the logarithm dampen the effect, so a doubling of losses raises capital by much less than double.

Banks in bucket 1 (BI up to EUR 1 billion) use ILM = 1, and supervisors may set ILM = 1 for all banks in their jurisdiction. Loss data must meet quality standards: normally 10 years of history, a collection threshold of EUR 20,000 and approval for excluding losses from divested businesses. Risk-weighted assets are $12.5 \times \text{ORC}$.

## Worked example
A bank reports three-year averages (EUR billion): interest income 9.0, interest expense 5.5, interest-earning assets 200, dividend income 0.2, other operating income 0.4, other operating expense 0.6, fee income 6.0, fee expense 1.5, trading book net P&L 1.2, banking book net P&L 0.5. Average annual operational losses over ten years are EUR 150 million.

1. ILDC: $|9.0 - 5.5| = 3.5$; cap $= 0.0225 \times 200 = 4.5$; take 3.5; add dividends: $3.5 + 0.2 = 3.7$.
2. SC: $\max(0.4, 0.6) + \max(6.0, 1.5) = 0.6 + 6.0 = 6.6$.
3. FC: $|1.2| + |0.5| = 1.7$.
4. BI $= 3.7 + 6.6 + 1.7 = 12.0$.
5. BIC $= 0.12 \times 1 + 0.15 \times (12 - 1) = 0.12 + 1.65 = 1.77$.
6. LC $= 15 \times 0.15 = 2.25$.
7. $\text{LC}/\text{BIC} = 2.25 / 1.77 = 1.2712$; $1.2712^{0.8} = 1.2115$.
8. ILM $= \ln(1.7183 + 1.2115) = \ln(2.9298) = 1.0750$.
9. ORC $= 1.77 \times 1.0750 = 1.9027$.

Operational risk capital is about **EUR 1.90 billion**, and RWA is $12.5 \times 1.9027 \approx$ EUR 23.8 billion. Because losses exceed the BIC benchmark, the bank pays about 7.5% more capital than a peer with an average history.

## Common exam traps
- Applying 15% to the whole BI of 12 (giving 1.80) instead of marginal coefficients bucket by bucket (1.77).
- Forgetting the 2.25% cap in the ILDC or the dividend add-on.
- Netting fee income against fee expense in the SC; the formula takes the larger of the two.
- Using the LC directly as capital, or forgetting the factor of 15.
- Assuming ILM above 1 means losses exceed BIC by the same proportion; the log and 0.8 power dampen the effect.

## Key takeaways
- The SA replaced BIA, TSA and AMA with one comparable, non-model approach.
- BI = ILDC + SC + FC, all three-year averages, built so that losses and expenses still count as activity.
- BIC uses marginal coefficients of 12%, 15% and 18% across BI buckets of EUR 1 billion and 30 billion.
- LC = 15 x average annual losses; ILM = ln(e - 1 + (LC/BIC)^0.8); ORC = BIC x ILM.
- ILM = 1 when LC equals BIC, and for bucket 1 banks or at national discretion.
