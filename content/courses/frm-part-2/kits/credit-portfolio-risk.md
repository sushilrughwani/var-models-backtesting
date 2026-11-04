---
title: "Portfolio Credit Risk"
duration: 28
---

## Lecture outline
- 00:00 - Hook: 1,000 loans each with 1% PD - why is losing 10% in one year possible?
- 03:00 - Independence vs correlation: same EL, very different tails
- 06:00 - Default correlation between two names from joint PD
- 10:00 - Vasicek one-factor model: common factor and idiosyncratic shock
- 15:00 - Worst-case default rate and credit VaR
- 19:00 - Whiteboard: USD 100 m portfolio and correlation sensitivity
- 24:00 - Concentration, granularity and model families
- 26:00 - Exam traps and recap

## Slides
### Slide 1: The diversification illusion
- Independent defaults: loss rate converges to PD
- Real defaults cluster in recessions
- Correlation fattens the tail
### Slide 2: Default correlation
- Cov = P(A and B) - pA pB
- ρ = Cov / √(pA(1 - pA) pB(1 - pB))
- Small-looking numbers, big tail effects
### Slide 3: One-factor model
- U_i = √ρ M + √(1 - ρ) Z_i
- M: economy; Z_i: firm-specific
- Default when U_i < N⁻¹(PD)
### Slide 4: Worst-case default rate
- WCDR = N[(N⁻¹(PD) + √ρ N⁻¹(X)) / √(1 - ρ)]
- Bad economy at confidence X
- Foundation of Basel IRB capital
### Slide 5: Credit VaR
- Worst-case loss = EAD × LGD × WCDR
- Credit VaR = EAD × LGD × (WCDR - PD)
- Capital covers loss beyond EL
### Slide 6: Worked portfolio
- EAD 100, PD 1%, LGD 40%, ρ 0.15
- WCDR 11.03%; worst loss 4.41
- Credit VaR 4.01
### Slide 7: Correlation sensitivity
- ρ = 0.05: WCDR 4.67%
- ρ = 0.15: WCDR 11.03%
- ρ = 0.30: WCDR 22.44%
### Slide 8: Concentration risk
- Vasicek assumes infinite granularity
- Name concentration: few large exposures
- Sector concentration: effectively higher ρ
### Slide 9: Model families
- Asset-value factor models and copulas
- Actuarial default-intensity models
- Macro-econometric default-rate models
### Slide 10: Exam traps
- √ρ, not ρ; divide by √(1 - ρ)
- Subtract EL for credit VaR
- Asset correlation is not default correlation

## Whiteboard examples
**Example 1 - Default correlation.** $p_A = 5\%$, $p_B = 8\%$, joint 1.2%. Cov $= 0.012 - 0.004 = 0.008$. Denominator $\sqrt{0.05 \cdot 0.95 \cdot 0.08 \cdot 0.92} = 0.05913$. $\rho = 0.135$. Ask: what joint PD gives zero correlation? (0.4%, the product of PDs.)

**Example 2 - Vasicek credit VaR.** EAD 100, PD 1%, LGD 40%, $\rho = 0.15$, 99.9%. $(-2.3263 + 0.3873 \times 3.0902)/0.9220 = -1.2251$; $WCDR = 11.03\%$; worst loss 4.41; EL 0.40; credit VaR 4.01.

**Example 3 - Higher PD book.** EAD 50, PD 2%, LGD 45%, $\rho = 0.20$. $(-2.0537 + 0.4472 \times 3.0902)/0.8944 = -0.7510$; $WCDR = 22.63\%$; credit VaR $= 50 \times 0.45 \times (0.2263 - 0.02) = 4.64$.

## Questions to ask students
- Does raising default correlation change expected loss? (No - only the shape of the loss distribution.)
- What happens to WCDR as ρ goes to zero? (It converges to PD: no systematic risk.)
- Why does conditional independence matter in Vasicek? (Given M, idiosyncratic risk diversifies, so the default rate equals the conditional PD.)
- Why is the Vasicek answer too low for a book with ten large loans? (It ignores name concentration.)
- What is subtracted from worst-case loss to get credit VaR? (Expected loss.)

## Analogies
- Correlated defaults are like dominoes on a table: a bump to the table (the economy) knocks many down at once.
- The common factor is the tide; idiosyncratic shocks are individual waves. In a big harbour the waves average out, the tide does not.
- Concentration is carrying all your eggs in a few baskets - the formula assumes thousands of tiny baskets.

## Recording tips
- Show two histograms (independent vs correlated defaults) with the same mean to make the tail effect visual.
- Write the WCDR formula once and annotate each piece; students mix up √ρ and √(1 - ρ).
- Use the correlation sensitivity table as the punchline: identical EL, threefold difference in tail.
