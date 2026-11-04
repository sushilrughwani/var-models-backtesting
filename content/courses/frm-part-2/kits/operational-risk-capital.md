---
title: "Operational Risk Capital and the Standardised Approach"
duration: 24
---

## Lecture outline
- 00:00 - Hook: why would a regulator throw away banks' own risk models?
- 02:00 - Legacy approaches (BIA, TSA, AMA) and their problems
- 05:00 - The business indicator: ILDC, SC and FC
- 09:00 - BIC: marginal coefficients like tax brackets
- 12:00 - Loss component and the ILM formula
- 15:00 - Whiteboard: full calculation from financial statements to capital
- 21:00 - Exam traps and recap

## Slides
### Slide 1: Why a new approach
- AMA capital was incomparable and model-dependent
- Gross income fell when margins collapsed
- One standardised approach: size plus own loss history
### Slide 2: Business indicator
- BI = ILDC + SC + FC, three-year averages
- Absolute values and maxima: losses count as activity
- A better size proxy than gross income
### Slide 3: ILDC
- min(|interest income - interest expense|, 2.25% x interest-earning assets)
- Plus dividend income
- Cap protects high-margin banks
### Slide 4: SC and FC
- SC = max(other op income, other op expense) + max(fee income, fee expense)
- FC = |trading book P&L| + |banking book P&L|
- No netting of fees against expenses
### Slide 5: BIC buckets
- 12% on BI up to EUR 1bn
- 15% on BI from 1bn to 30bn
- 18% on BI above 30bn - marginal, like tax brackets
### Slide 6: Loss component
- LC = 15 x average annual losses (10 years)
- EUR 20,000 collection threshold
- Exclusions need supervisory approval
### Slide 7: Internal loss multiplier
- ILM = ln(e - 1 + (LC/BIC)^0.8)
- LC = BIC gives ILM = 1
- Log and 0.8 power dampen the effect
### Slide 8: Capital
- ORC = BIC x ILM; RWA = 12.5 x ORC
- Bucket 1 banks: ILM = 1
- National discretion to set ILM = 1
### Slide 9: Worked result
- BI 12.0, BIC 1.77, LC 2.25
- ILM 1.0750, ORC 1.90bn
- RWA about 23.8bn
### Slide 10: Exam traps
- Marginal, not flat, coefficients
- Do not net fee income and expense
- Remember the factor 15 in LC

## Whiteboard examples
**Example 1 - From statements to capital (EUR bn).** ILDC = min(3.5, 4.5) + 0.2 = 3.7. SC = 0.6 + 6.0 = 6.6. FC = 1.2 + 0.5 = 1.7. BI = 12.0. BIC = 0.12 + 0.15 x 11 = 1.77. LC = 15 x 0.15 = 2.25. LC/BIC = 1.2712, raised to 0.8 = 1.2115. ILM = ln(1.7183 + 1.2115) = 1.0750. ORC = 1.9027.

**Example 2 - Large bank BIC.** BI = 40: BIC = 0.12 x 1 + 0.15 x 29 + 0.18 x 10 = 0.12 + 4.35 + 1.80 = 6.27. Flat 18% would wrongly give 7.20.

**Example 3 - Clean history.** BI 8, average losses 0.08: BIC = 0.12 + 0.15 x 7 = 1.17; LC = 1.20; LC/BIC = 1.026; ILM = 1.0075; ORC = 1.1788. Losses almost equal the benchmark, so ILM is close to 1.

## Questions to ask students
- What is ILM when LC equals BIC? (Exactly 1)
- A bank's BI is 0.8bn. What is its BIC and ILM? (BIC = 0.096bn; ILM = 1 for bucket 1)
- Why use max(fee income, fee expense) rather than the net? (So that large gross activity is captured even if it nets to little)
- If average losses double, does capital double? (No - the log and 0.8 power dampen the increase)
- How do you convert ORC to RWA? (Multiply by 12.5)

## Analogies
- BIC as income tax brackets: each rate only applies to the slice of income inside its band.
- ILM as an insurance no-claims adjustment: a bad claims record raises your premium, a clean one lowers it, but only moderately.
- The BI's absolute values as a speedometer that reads speed, not direction: reversing fast still counts as driving fast.

## Recording tips
- Build the calculation on screen line by line; candidates lose marks on arithmetic order, not concepts.
- Show the ILM curve (ILM versus LC/BIC) to make the dampening visible.
- Repeat the 1bn and 30bn thresholds several times; they are easy marks.
