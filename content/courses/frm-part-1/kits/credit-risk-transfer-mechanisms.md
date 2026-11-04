---
title: "Credit Risk Transfer Mechanisms"
duration: 22
---

## Lecture outline
- 00:00 - Hook: how can a pile of risky mortgages become an AAA bond?
- 02:00 - Why banks transfer credit risk: capital, concentration, fees
- 04:00 - Credit default swaps: mechanics, premiums, default payment, counterparty risk
- 08:00 - Total return swaps and credit-linked notes in one minute
- 09:00 - Securitisation and SPVs
- 11:00 - Tranching and CDOs: the loss waterfall and correlation
- 14:00 - Whiteboard: CDS payments and tranche losses
- 18:00 - Originate-to-distribute and the 2007-2009 crisis; post-crisis reforms
- 21:00 - Exam traps and recap

## Slides
### Slide 1: Credit Risk Transfer Mechanisms
- Why banks shed credit risk
- CDS, securitisation and CDOs
- What went wrong in 2007-2009

### Slide 2: Motives for Transfer
- Free up capital to lend again
- Reduce single-name and sector concentration
- Earn origination fees

### Slide 3: Credit Default Swap
- Buyer pays spread on notional, usually quarterly
- Seller pays $N(1-R)$ after a credit event
- Loan stays on books; buyer takes counterparty risk

### Slide 4: Other Credit Derivatives
- Total return swap: all asset returns for a floating rate
- Credit-linked note: funded protection, principal at risk
- Index CDS for broad exposure

### Slide 5: Securitisation
- Loans sold to an SPV
- SPV issues securities backed by pool cash flows
- Bank receives cash, loans leave the balance sheet

### Slide 6: Tranching
- Equity, mezzanine, senior
- Loss: $\min(\max(L-A,0), D-A)$
- Junior tranches protect senior tranches

### Slide 7: Correlation Is Everything
- Low correlation: losses stay in junior tranches
- High correlation: losses can reach senior tranches
- CDO-squared multiplies the sensitivity

### Slide 8: Originate-to-Distribute
- Weak screening incentives (moral hazard)
- Heavy reliance on ratings
- Risk kept via retained tranches and off-balance-sheet vehicles

### Slide 9: Reforms
- Risk retention by originators
- More disclosure on underlying pools
- Central clearing of standardised CDS

### Slide 10: Recap
- CDS: spread out, $N(1-R)$ in on default
- Tranche loss as a share of the tranche
- Transfer can hide risk rather than remove it

## Whiteboard examples
**Example 1: CDS.** Notional 10m, 150 bp, quarterly, recovery 40%.
- Annual premium 150,000; quarterly 37,500.
- Default payment: 10m x 0.60 = 6m.

**Example 2: CDO waterfall.** Pool 100m; equity 0-5%, mezzanine 5-15%, senior 15-100%.
- Pool loss 8m: equity loses 5m (100%), mezzanine 3m of 10m (30%), senior 0.
- Then redo with a pool loss of 20m: equity 5m (100%), mezzanine 10m (100%), senior 5m of 85m (about 5.9%). Show how a correlated shock reaches the senior tranche.

## Questions to ask students
- A CDS has notional 50m and recovery 25%. What does the seller pay on default? (37.5m.)
- Does buying CDS protection remove all risk? (No, it replaces borrower risk with counterparty risk on the seller.)
- Which tranche benefits when default correlation rises? (Equity, because losses become more all-or-nothing and the chance of few defaults rises.)
- Why did originate-to-distribute weaken lending standards? (Originators did not bear the losses, so screening incentives fell.)
- What does a 5% risk retention rule aim to fix? (It makes originators keep skin in the game.)

## Analogies
- A CDO is a champagne tower: the top glasses (equity) fill and overflow first; the bottom glasses (senior) only get wet if a lot is poured. A correlated shock is pouring the whole bottle at once.
- A CDS is fire insurance on a house you may not even own, and the insurer itself could go bust.
- Originate-to-distribute is a chef who never eats at his own restaurant.

## Recording tips
- Draw the tranche stack as a vertical bar with attachment points marked; shade losses in as you go.
- Students often report tranche losses as a share of the pool. Say "of the tranche" every time.
- Keep the crisis section focused on mechanisms; the full crisis story comes in a later lesson.
