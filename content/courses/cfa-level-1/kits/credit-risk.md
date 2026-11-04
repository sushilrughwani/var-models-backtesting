---
title: "Credit Risk"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a bond can lose 10% of its value without the issuer ever missing a payment. How?
- 02:00 - Default risk versus spread risk (downgrade risk and liquidity risk)
- 06:00 - PD, EAD, LGD, recovery and expected loss, plus priority of claims
- 11:00 - Whiteboard: expected loss and the break-even spread
- 14:00 - Credit ratings: the investment-grade line, issuer versus issue, notching, limitations
- 19:00 - What drives credit spreads, and the price impact of spread changes
- 23:00 - Whiteboard: spread widening loss; recap and traps

## Slides
### Slide 1: Credit Risk
- Interest rate risk affects every bond; credit risk depends on the borrower
- Today: default, recovery, ratings, spreads
- Next lesson: how analysts assess creditworthiness

### Slide 2: Two Faces of Credit Risk
- Default risk: payments missed or late
- Spread risk: price falls because the required spread widens
- Spread risk includes downgrade risk and market liquidity risk

### Slide 3: The Loss Equation
- LGD = EAD × (1 − recovery rate)
- Expected loss = PD × LGD
- In percentage terms: EL% = PD × (1 − RR)

### Slide 4: Priority of Claims
- Secured, then senior unsecured, then subordinated, then equity
- Higher priority means higher recovery and lower LGD
- Bankruptcy settlements do not always respect strict priority

### Slide 5: Expected Loss vs Spread
- EL% is roughly the break-even spread
- Market spreads are wider: they also pay for uncertainty, downgrades and illiquidity
- Example: EL 1.20% versus a market spread of 2.15%

### Slide 6: Rating Scales
- Investment grade: BBB−/Baa3 and above
- High yield: BB+/Ba1 and below
- Defaulted issuers sit at the bottom of the scale

### Slide 7: Issuer vs Issue Ratings
- Issuer rating is usually based on senior unsecured debt
- Notching up for secured debt, down for subordinated debt
- Structural subordination: holding-company debt ranks behind subsidiary creditors
- Notching is wider for high-yield issuers

### Slide 8: Limits of Ratings
- Ratings change slowly, while spreads move daily
- Agencies have been wrong before
- Event risk (litigation, buyouts, disasters) is hard to rate

### Slide 9: Spread Drivers
- The credit cycle and the macro outlook
- Market liquidity and dealer capacity
- Supply of new issues and investor demand
- Lower-rated spreads are far more volatile

### Slide 10: Spread Changes Hit Price
- %ΔP ≈ −SpreadDur × ΔS + ½ × SpreadCon × ΔS²
- 50 bp widening at SpreadDur 5: about −2.46%
- Longer duration means more spread risk

## Whiteboard examples
**Example 1 - expected loss.** USD 1,000,000 senior unsecured bond, PD 2%, recovery 40%.
- LGD = 1,000,000 × 0.60 = 600,000.
- EL = 0.02 × 600,000 = USD 12,000, which is 1.20% of exposure.
- If the market spread is 6.25% − 4.10% = 215 bp, the excess over EL is 95 bp: the premium for risk and liquidity.

**Example 2 - spread widening.** Spread duration 5.0, spread convexity 30.
- +50 bp: −5.0 × 0.005 + ½ × 30 × 0.000025 = −2.50% + 0.0375% = −2.4625%, about −USD 24,600 on USD 1m.
- −25 bp: +1.25% + 0.0094% = +1.2594%.

**Example 3 - compare seniority.** Same issuer, PD 3%. Senior secured recovery 70%, subordinated recovery 20%.
- Senior secured EL% = 0.03 × 0.30 = 0.90%.
- Subordinated EL% = 0.03 × 0.80 = 2.40%.
- Same PD, very different losses: this is why issues are notched.

## Questions to ask students
- PD is 4% and recovery is 25%. What is EL as a percentage? (0.04 × 0.75 = 3.0%.)
- Is a bond rated BB+ investment grade? (No, the cut-off is BBB−.)
- Why might a holding company's senior bonds be rated below its operating subsidiary's bonds? (Structural subordination: subsidiary creditors have first claim on subsidiary cash flows.)
- Which typically widens more in a recession, a AA spread or a B spread? (The B spread.)
- Can an investor lose money on credit without any default? (Yes, through spread widening from downgrades or illiquidity.)

## Analogies
- Insurance pricing: expected loss is the actuarially fair premium, and the spread is what the insurer actually charges, including a margin for uncertainty.
- Queue at the exit: in bankruptcy, creditors leave in order of seniority, and those at the back of the queue may find the room empty.
- Weather forecast versus thermometer: ratings are a seasonal forecast, while spreads are a live thermometer that reacts to every gust.

## Recording tips
- Write "1 − RR" in a box. Multiplying PD by RR instead is the most common slip.
- Use a real-sounding but fictional issuer to make notching concrete with a holding company and an operating subsidiary.
- Stress that spread risk is the everyday risk for investment-grade portfolios; default is the rare tail.
