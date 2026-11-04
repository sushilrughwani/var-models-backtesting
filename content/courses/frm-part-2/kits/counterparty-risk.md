---
title: "Counterparty Risk and Exposure"
duration: 28
---

## Lecture outline
- 00:00 - Hook: a swap worth zero today can cost you millions if your counterparty fails next year
- 03:00 - What makes counterparty risk different: asymmetric, uncertain, bilateral exposure
- 06:00 - Exposure metrics: CE, EE, PFE, EPE, effective EPE
- 10:00 - Exposure profile shapes: swaps versus FX forwards and cross-currency swaps
- 13:00 - Netting: gross versus net and the net-to-gross ratio
- 16:00 - Collateral: thresholds, MTA, initial margin and the collateral call
- 20:00 - Whiteboard: four-trade netting set, collateral call, EE and PFE with MPOR
- 26:00 - Exam traps and recap

## Slides
### Slide 1: Exposure is optional
- Exposure = max(V, 0)
- You lose only if the trade is in your favour at default
- Value moves with markets: exposure is random
### Slide 2: Exposure metrics
- CE: today's positive value
- EE: average positive value at a future date
- PFE: high quantile at a future date
- EPE: time-average of EE; effective EPE for capital
### Slide 3: Profile shapes
- Interest rate swap: hump (diffusion vs amortisation)
- FX forward and cross-currency swap: rising to maturity
- Final principal exchange dominates
### Slide 4: Netting
- Gross = Σ max(V_i, 0)
- Net = max(Σ V_i, 0)
- Net-to-gross ratio: lower means more benefit
### Slide 5: Collateral terms
- Threshold: no call below this exposure
- MTA: smallest transfer allowed
- Initial margin: buffer for close-out moves
### Slide 6: The collateral call
- Required = max(exposure - threshold, 0)
- Call = required - held, if at least MTA
- Residual exposure ≈ threshold plus MPOR moves
### Slide 7: Margin period of risk
- Counterparty stops posting at default
- Typically 10 business days for bilateral trades
- Exposure horizon shrinks to the MPOR
### Slide 8: Normal approximation
- EE = 0.3989 σ√t
- PFE = z σ√t
- Both scale with √t
### Slide 9: Worked netting set
- Trades +10, -6, +4, -3: gross 14, net 5
- Threshold 2, held 1: call 2
- PFE99 1y: 6.98 uncollateralised vs 1.40 over 10 days
### Slide 10: Exam traps
- Negative values do not enter gross exposure
- Subtract collateral already held
- PFE is a quantile, EE an average

## Whiteboard examples
**Example 1 - Netting.** Trades +10, -6, +4, -3. Gross $= 14$; net $= \max(5, 0) = 5$; NGR $= 0.357$. Variation: if the -6 trade were with a different legal entity outside the netting set, net exposure would be $\max(10 + 4 - 3, 0) = 11$.

**Example 2 - Collateral call.** Exposure 5, threshold 2, MTA 0.5, held 1: required 3, call 2. Variation: exposure 12, threshold 3, MTA 1, held 7: required 9, call 2. If exposure were 9.5, required 6.5, held 7, the 0.5 excess is below the MTA of 1, so no collateral is returned.

**Example 3 - EE and PFE.** $\sigma = 3$ per year. $EE_{1y} = 1.197$; $PFE_{99\%,1y} = 6.98$. With a 10-day MPOR: $\sigma\sqrt{10/250} = 0.60$; $PFE_{99\%} = 1.40$; $EE = 0.239$.

## Questions to ask students
- Why is a swap with zero value today still a source of counterparty risk? (Its value can become positive as markets move before the counterparty defaults.)
- Why does a swap's exposure profile fall towards maturity? (Fewer remaining payments - the amortisation effect outweighs growing uncertainty.)
- When does netting give the greatest benefit? (When trade values are negatively correlated.)
- Why doesn't daily margining eliminate exposure? (The MPOR and threshold leave residual moves uncollateralised.)
- Which is bigger for the same date, EE or 99% PFE? (PFE.)

## Analogies
- Counterparty exposure is like lending your car to a friend whose car you also hold: you only lose if yours is worth more when the friend disappears.
- Netting is settling a group restaurant bill by net amounts rather than everyone paying everyone.
- The margin period of risk is the time between noticing the tenant has stopped paying rent and actually getting the keys back.

## Recording tips
- Show a simulated fan of swap values with EE and PFE lines overlaid; the hump becomes obvious.
- Build the collateral call as a three-line formula on screen and reuse it for every variation.
- Emphasise that gross exposure ignores negative values - the most common arithmetic slip.
