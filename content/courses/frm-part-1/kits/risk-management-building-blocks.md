---
title: "The Building Blocks of Risk Management"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a lender that loses money every single year on defaults can still be very safe. How?
- 02:00 - Risk versus uncertainty: measurable probabilities versus unknown ones
- 05:00 - Expected loss: PD x LGD x EAD, and why EL is a cost
- 09:00 - Unexpected loss: standard-deviation and quantile definitions; link to capital
- 13:00 - Whiteboard: EL and UL from a loss distribution
- 17:00 - Risk types and how they interact in a crisis
- 20:00 - The risk management process: identify, measure, decide, monitor
- 22:00 - Exam traps and recap

## Slides
### Slide 1: The Building Blocks of Risk Management
- What risk is, and what it is not
- Expected versus unexpected loss
- Risk types and the risk management process

### Slide 2: Risk vs Uncertainty
- Risk: outcomes and probabilities can be described
- Uncertainty: outcomes or probabilities unknown
- Models work for risk; judgement and buffers for uncertainty

### Slide 3: Expected Loss
- $EL = PD \times LGD \times EAD$
- LGD = 1 - recovery rate
- Predictable, so priced into spreads and covered by provisions

### Slide 4: Unexpected Loss
- Deviation of losses above the average
- Single loan: $UL = EAD \times LGD \times \sqrt{PD(1-PD)}$
- Quantile view: $UL_{\alpha} = L_{\alpha} - EL$

### Slide 5: Who Pays for Which Loss?
- EL: pricing and provisions
- UL up to the confidence level: capital
- Beyond the quantile: the tail, addressed by stress tests

### Slide 6: Reading a Loss Distribution
- Compute EL as the probability-weighted average
- Find the first loss with cumulative probability at least alpha
- Subtract EL to get UL

### Slide 7: The Main Risk Types
- Market, credit, liquidity (funding and market)
- Operational, business/strategic, reputational
- Each needs its own measures

### Slide 8: Risks Interact
- Market crash raises defaults and triggers margin calls
- Liquidity stress forces fire sales, deepening market losses
- Reputational damage follows almost every major loss

### Slide 9: The Risk Management Process
- Identify, measure, decide, monitor and report
- Decisions: retain, avoid, mitigate, transfer
- Anchored to the firm's risk appetite

### Slide 10: Recap
- Risk is variability; EL is a cost; UL needs capital
- Watch interactions between risk types
- Next: how firms decide which risks to keep or hedge

## Whiteboard examples
**Example 1: Loss distribution.** One-year losses (USD m): 0 with p = 0.80, 2 with 0.12, 5 with 0.05, 12 with 0.025, 30 with 0.005.
- EL = 0.24 + 0.25 + 0.30 + 0.15 = 0.94m.
- Cumulative: 0.80, 0.92, 0.97, 0.995, 1.00. The 99% quantile is 12m.
- UL at 99% = 12 - 0.94 = 11.06m of capital.

**Example 2: Single loan.** EAD 10m, PD 2%, LGD 40%.
- EL = 10m x 0.02 x 0.40 = 80,000.
- UL = 10m x 0.40 x sqrt(0.02 x 0.98) = 4m x 0.14 = 560,000.
- Point out UL is 7 times EL.

## Questions to ask students
- A loan has a recovery rate of 70%. What LGD goes in the EL formula? (30%.)
- Should a bank hold capital against expected loss? (No, EL is priced in and provisioned; capital covers UL.)
- Is the chance of a new, never-seen technology disrupting a business risk or uncertainty? (Uncertainty: no reliable probabilities.)
- Give an example of market risk turning into liquidity risk. (Falling collateral values trigger margin calls that must be met in cash.)
- If PD doubles from 1% to 2%, does EL double? (Yes, EL is linear in PD; UL rises by less than double.)

## Analogies
- EL is the restaurant's expected food waste: annoying, but budgeted into menu prices. UL is the kitchen fire you need insurance and savings for.
- Risk is a dice game where you know the dice; uncertainty is a game where you have not seen the dice.
- Risk types are dominoes on the same table: knock one and others fall.

## Recording tips
- Spend time on the quantile step; students often pick the row where cumulative probability is just below 99%.
- Keep the EL/UL/capital/provision mapping on screen as a persistent table while discussing risk types.
- Stress that the goal is rewarded risk, not zero risk, since this framing recurs throughout the course.
