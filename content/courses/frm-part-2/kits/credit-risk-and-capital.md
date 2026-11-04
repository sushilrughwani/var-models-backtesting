---
title: "Credit Risk Management and Capital"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a bank that loses money every single year can still be perfectly healthy - why?
- 02:00 - Expected loss as a cost: pricing and provisions
- 05:00 - Unexpected loss of a single loan and why low-PD loans have large relative UL
- 08:00 - Portfolio UL, loss correlation and diversification
- 11:00 - Risk contributions and economic capital with a capital multiplier
- 15:00 - Whiteboard: the two-loan example end to end
- 19:00 - RAROC, hurdle rates and the lending decision
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Two kinds of credit loss
- Expected loss: the average, predictable cost
- Unexpected loss: the volatility around the average
- EL is priced and provisioned; UL is covered by capital
### Slide 2: Expected loss
- EL = EAD × PD × LGD
- LGD = 1 - recovery rate
- Expected losses add across loans
### Slide 3: Unexpected loss of one loan
- Default is Bernoulli: variance PD(1 - PD)
- UL = EAD × LGD × √(PD(1 - PD)) with fixed LGD
- Uncertain LGD adds a PD × σ²(LGD) term
### Slide 4: Portfolio UL
- UL_P = √(UL_A² + UL_B² + 2ρ UL_A UL_B)
- Below the sum of ULs whenever ρ < 1
- Diversification is the reason banks lend to many borrowers
### Slide 5: Risk contributions
- RC_i = UL_i × Σ ρ_ij UL_j / UL_P
- Contributions add exactly to UL_P
- Use RC, not stand-alone UL, to charge a loan for capital
### Slide 6: Economic capital
- EC = capital multiplier × UL_P
- Multiplier reflects target solvency and skewed losses
- Typical illustrative multipliers: 5 to 8
### Slide 7: The two-loan example
- EL total 0.100; UL_A 0.398; UL_B 0.420
- UL_P 0.647 versus 0.818 simple sum
- EC = 6 × 0.647 = 3.88
### Slide 8: RAROC
- (Revenue - costs - EL) / allocated EC
- Compare with hurdle rate
- Loan A: 0.20 / 1.857 = 10.77% vs 12% hurdle
### Slide 9: Exam traps
- No capital against EL
- ULs do not add
- Subtract EL in RAROC numerator

## Whiteboard examples
**Example 1 - Single loan.** EAD USD 20 m, PD 2%, LGD 45%. EL $= 20 \times 0.02 \times 0.45 = 0.18$. UL $= 20 \times 0.45 \times \sqrt{0.02 \times 0.98} = 9 \times 0.14 = 1.26$. Point out UL is seven times EL.

**Example 2 - Two-loan portfolio (the lesson example).** Loan A: EAD 10, PD 1%, LGD 40%; Loan B: EAD 6, PD 2%, LGD 50%; $\rho = 0.25$; $CM = 6$. $UL_A = 0.3980$, $UL_B = 0.4200$, $UL_P = \sqrt{0.4184} = 0.6468$. $RC_A = 0.3095$, $RC_B = 0.3373$ (sum 0.6468). $EC = 3.881$, $EC_A = 1.857$.

**Example 3 - RAROC decision.** Loan A revenue 0.30, costs 0.06, EL 0.04: RAROC $= 0.20/1.857 = 10.77\%$, below a 12% hurdle. Ask: what revenue would hit 12%? Revenue $= 0.12 \times 1.857 + 0.06 + 0.04 = 0.323$, so about USD 23,000 more net interest income per year.

## Questions to ask students
- Why do banks not hold capital against expected loss? (It is anticipated, so it is charged in the spread and provisioned.)
- If loss correlation is 1, what is portfolio UL? (The simple sum of stand-alone ULs - no diversification.)
- Why is the capital multiplier larger than 2.33 at 99%? (Credit loss distributions are skewed with fat right tails.)
- What happens to RAROC if you ignore EL? (It is overstated, making risky loans look better than they are.)
- Why use risk contributions for pricing? (They measure the capital a loan actually adds to the portfolio and sum to the total.)

## Analogies
- EL is the restaurant's expected food spoilage - built into menu prices. Capital is the emergency fund for the night the fridge breaks.
- Risk contributions are splitting a shared taxi fare by how far each person's stop pushed the route, not by what a solo taxi would have cost.
- The capital multiplier is a sea-wall height: set not by the average wave but by the storm you want to survive.

## Recording tips
- Keep a running EL/UL table on screen and fill it in as the example progresses.
- Spend extra time on the risk-contribution formula; show numerically that contributions sum to UL_P.
- End with the RAROC decision so students see why all the earlier steps matter for real lending.
