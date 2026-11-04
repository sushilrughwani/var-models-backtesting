---
title: "Credit Derivatives and Securitisation"
duration: 26
---

## Lecture outline
- 00:00 - Hook: how can you lose money on a bond you never owned? Selling CDS protection
- 02:00 - CDS mechanics: premium leg, protection leg, credit events and auction settlement
- 06:00 - Credit triangle, hazard rates and default probabilities
- 09:00 - Standard coupons and upfront payments
- 12:00 - Securitisation process: originator, SPV, servicer, trustee, waterfall
- 15:00 - Whiteboard: CDS upfront and tranche loss allocation
- 20:00 - Credit enhancement and correlation effects on tranches
- 23:00 - Incentive problems, risk retention, exam traps and recap

## Slides
### Slide 1: What a CDS does
- Buyer pays periodic premium on notional
- Seller pays notional × (1 - R) on a credit event
- Buying protection ≈ shorting the reference credit
### Slide 2: Settlement
- Credit events: bankruptcy, failure to pay, restructuring (in some contracts)
- Cash settlement with recovery set by auction
- Physical settlement: deliver a bond, receive par
### Slide 3: Credit triangle
- s ≈ λ × (1 - R)
- λ ≈ s / (1 - R)
- PD(T) = 1 - e^(-λT)
### Slide 4: Upfront payments
- Standard coupons such as 100 bp or 500 bp
- Upfront ≈ (s - c) × RPV01 × notional
- s > c: buyer pays; s < c: buyer receives
### Slide 5: CDS example
- 10 m notional, s 180 bp, R 40%, c 100 bp, RPV01 4.2
- λ = 3%; 5-year PD 13.93%
- Upfront USD 336,000 paid by the buyer
### Slide 6: Securitisation chain
- Originator sells loans to a bankruptcy-remote SPV
- SPV issues tranched notes
- Servicer collects; trustee runs the waterfall
### Slide 7: Tranche losses
- Loss = min(max(L - A, 0), D - A) / (D - A)
- Equity first, senior last
- 9% pool loss: equity 100%, mezzanine 40%, senior 0%
### Slide 8: Credit enhancement
- Subordination
- Overcollateralisation and excess spread
- Reserve accounts and external guarantees
### Slide 9: Correlation and tranches
- Higher correlation: equity safer, senior riskier
- Equity long correlation, senior short correlation
- Mispriced correlation was central to the 2007-2008 losses
### Slide 10: Incentives and traps
- Originate-to-distribute weakens screening
- Risk retention: skin in the game
- Traps: s/(1 - R), upfront direction, tranche-size denominator

## Whiteboard examples
**Example 1 - CDS pricing.** $s = 180$ bp, $R = 40\%$: $\lambda = 0.018/0.6 = 3\%$; 5-year PD $= 1 - e^{-0.15} = 13.93\%$. Upfront $= 0.008 \times 4.2 \times 10$ m $= 336{,}000$ paid by the buyer. Default with auction recovery 35%: seller pays USD 6.5 m.

**Example 2 - Upfront received.** Notional 20 m, spread 300 bp, coupon 500 bp, RPV01 3.8: upfront $= (0.03 - 0.05) \times 3.8 \times 20 = -1.52$, so the seller pays the buyer USD 1.52 m to compensate for the above-market coupon.

**Example 3 - Tranches.** Pool 500 m: equity 0-5%, mezzanine 5-15%, senior 15-100%; losses 45 m (9%). Equity loses 25 (100%); mezzanine loses 20 of 50 (40%); senior 0. Variation: pool 200 m with 0-4%, 4-12%, 12-100% and 7% losses: mezzanine loses 6 of 16 = 37.5%.

## Questions to ask students
- What does the protection seller pay on a credit event? (Notional × (1 - recovery).)
- If the par spread is below the standard coupon, who pays upfront? (The protection seller pays the buyer.)
- Why is the SPV made bankruptcy-remote? (So pool assets are protected from the originator's creditors if the originator fails.)
- How does higher default correlation affect the equity tranche? (It becomes less risky - outcomes are more often near zero loss.)
- What problem does risk retention address? (Weak screening incentives under originate-to-distribute.)

## Analogies
- A CDS is fire insurance on a house you may not own - which is why it can be used for speculation as well as hedging.
- A tranche waterfall is a stack of champagne glasses filled from the top: senior glasses fill first; losses drain from the bottom up.
- Correlation and tranches: if everyone either all passes or all fails an exam, the "bottom of the class" bet is safer and the "top of the class" bet riskier than when results are independent.

## Recording tips
- Draw the CDS cash-flow diagram with arrows for both legs before any numbers.
- Show the tranche stack as a vertical bar and shade the losses as you go up.
- Repeat the upfront sign rule twice; it is a reliable exam trap.
