---
title: "Measuring Credit Risk"
duration: 28
---

## Lecture outline
- 00:00 - Hook: a bank's loan book loses about 0.5% a year on average, yet it must hold capital of several percent. Why so much?
- 03:00 - The three ingredients: PD, LGD, EAD; expected loss
- 07:00 - Who pays for EL: pricing and provisions
- 09:00 - Unexpected loss for one loan, with fixed and random LGD
- 13:00 - Portfolio UL and default correlation; skewed credit loss distributions
- 17:00 - Vasicek one-factor model and the worst-case default rate
- 21:00 - Whiteboard: EL, UL, WCDR and capital for a USD 10m loan
- 25:00 - Link to Basel IRB, exam traps and recap

## Slides
### Slide 1: Measuring Credit Risk
- From ratings to money: PD, LGD, EAD
- Expected loss versus unexpected loss
- Capital via the Vasicek model

### Slide 2: Expected Loss
- EL = EAD × PD × LGD
- LGD = 1 − recovery rate
- Covered by pricing and provisions, not capital

### Slide 3: Unexpected Loss for One Loan
- Standard deviation of credit loss
- Fixed LGD: UL = EAD × LGD × √(PD(1 − PD))
- Random LGD: UL = EAD × √(PD·σ²_LGD + LGD²·PD(1 − PD))

### Slide 4: Portfolio Effects
- EL adds across loans
- UL_P = √(ΣΣ ρᵢⱼ ULᵢ ULⱼ)
- Higher default correlation, higher portfolio UL

### Slide 5: Shape of Credit Losses
- Most years near or below EL
- Rare years with very large losses
- Right-skewed, fat-tailed distribution

### Slide 6: Economic Capital
- Absorb losses up to a high confidence level, e.g. 99.9%
- Capital = loss quantile − EL
- Protects solvency in a bad year

### Slide 7: Vasicek One-Factor Model
- Common factor (economy) plus idiosyncratic noise
- WCDR = N[(N⁻¹(PD) + √ρ·N⁻¹(X)) / √(1 − ρ)]
- Capital = EAD × LGD × (WCDR − PD)

### Slide 8: Link to Basel IRB
- X = 99.9%, one-year horizon
- Correlation prescribed by asset class
- Maturity adjustment added on top

### Slide 9: Exam Traps
- Recovery is not LGD
- Square root in UL; ULs do not add
- √ρ in the numerator, √(1 − ρ) in the denominator; subtract PD

### Slide 10: Recap
- EL is a cost; UL is a risk
- Correlation drives portfolio tail risk
- Next: operational risk and its capital

## Whiteboard examples
**Example 1: Single loan.** EAD USD 10m, PD 2%, LGD 45%, ρ = 0.15, N⁻¹(0.02) = −2.054, N⁻¹(0.999) = 3.090.
- EL = 10m × 0.02 × 0.45 = USD 90,000.
- UL = 10m × 0.45 × √(0.02 × 0.98) = 4.5m × 0.14 = USD 630,000.
- Numerator: −2.054 + 0.3873 × 3.090 = −0.857. Divide by √0.85 = 0.9220: −0.930.
- WCDR = N(−0.930) ≈ 17.62%.
- Capital = 10m × 0.45 × (0.17623 − 0.02) ≈ USD 703,000.
- With σ_LGD = 20%: UL = 10m × √(0.02 × 0.04 + 0.2025 × 0.0196) = USD 690,579.

**Example 2: Two-loan portfolio.** Two identical loans, each UL = USD 630,000, default correlation 0.2.
- UL_P = √(630,000² + 630,000² + 2 × 0.2 × 630,000²) = 630,000 × √2.4 ≈ USD 975,992.
- Sum of standalone ULs = USD 1,260,000; diversification saves about USD 284,000.
- Portfolio EL is still 2 × 90,000 = USD 180,000.

## Questions to ask students
- A loan's recovery rate is 60%. What LGD goes into EL? (40%.)
- Why do banks not hold capital against EL? (It is anticipated and covered by pricing and provisions.)
- What happens to portfolio UL if all default correlations are 1? (It equals the sum of individual ULs; no diversification.)
- In the Vasicek formula, what happens to WCDR as ρ rises? (It increases: defaults cluster more in bad states.)
- Why is UL much larger than EL for a low-PD loan? (Losses are binary and rare: usually zero, occasionally large.)

## Analogies
- EL is the predictable breakage in a restaurant's crockery budget; UL is the night the shelf collapses.
- Default correlation is like dominoes: spaced apart, one falling does not matter; packed together, they all go.
- The Vasicek common factor is the tide: individual boats bob independently, but when the tide goes out, they all drop together.

## Recording tips
- Draw the skewed credit loss distribution and mark EL, the 99.9% quantile and capital as the gap between them.
- Write each step of the Vasicek calculation on its own line; students lose track of the square roots.
- Say clearly that the Basel formula is built on this intuition but adds maturity adjustments not tested in detail here.
