---
title: "Properties of Interest Rate Swaps and Currency Swaps"
duration: 28
---

## Lecture outline
- 00:00 - Hook: the largest derivatives market in the world involves no exchange of principal at all
- 03:00 - Plain vanilla swap mechanics; transforming liabilities and assets; the dealer's role
- 07:00 - Comparative advantage: calculation and critique
- 12:00 - Valuation as a long bond and a short floating-rate bond
- 15:00 - Whiteboard: valuing a 3-year receive-fixed swap
- 19:00 - Valuation as FRAs; OIS discounting and benchmark reform
- 22:00 - Currency swaps: mechanics and valuation (whiteboard 2)
- 26:00 - Exam traps and recap

## Slides
### Slide 1: Interest Rate and Currency Swaps
- Exchange of cash flows on a notional principal
- Used to transform debt and investments
- Builds on forward rates, FRAs and bond pricing

### Slide 2: Plain Vanilla Swap
- One leg fixed, one leg floating (e.g. SOFR compounded)
- Notional not exchanged; net payments only
- Pay-fixed turns floating debt into fixed debt

### Slide 3: Role of the Dealer
- Quotes bid and ask fixed rates
- Earns the spread, warehouses risk, hedges with other swaps
- Counterparties face the dealer, not each other

### Slide 4: Comparative Advantage
- Gain = fixed spread difference - floating spread difference
- Each firm borrows where it is relatively strong, then swaps
- Gain is shared among the two firms and the dealer

### Slide 5: Why the Argument Is Weak
- Floating loans let lenders reprice credit at each reset
- Fixed loans lock in a credit spread for years
- Apparent saving partly reflects different contracts

### Slide 6: Valuation as Bonds
- Receive-fixed: $V = B_{fix} - B_{fl}$
- Floating bond = par immediately after a reset
- Pay-fixed value is the negative

### Slide 7: Valuation as FRAs
- Assume forward rates are realised
- Net each payment, discount at the risk-free curve
- Same answer as the bond method

### Slide 8: OIS Discounting
- Interbank rates carried bank credit and liquidity risk
- Collateralised trades discounted at OIS rates
- Overnight benchmarks now replace most interbank rates

### Slide 9: Currency Swaps
- Exchange principal at start and end, interest in each currency
- $V = B_D - S_0B_F$
- Larger credit exposure because principal is exchanged

### Slide 10: Recap
- Mechanics, comparative advantage, two valuation methods
- Floating leg at par after reset
- Next: FX risk and corporate bonds

## Whiteboard examples
**Example 1: Interest rate swap.** Receive 4% annual fixed on USD 100m, 3 years left, just after reset. Zero rates 3.2%, 3.5%, 3.7% (cc).
- DFs: 0.96851, 0.93239, 0.89494.
- B_fix = 3.8740 + 3.7296 + 93.0736 = 100.6772; B_fl = 100.
- Value = +0.68m to the receiver, -0.68m to the payer.

**Example 2: Comparative advantage.** A: 4.0% fixed or SOFR + 0.3%; B: 5.2% fixed or SOFR + 0.9%.
- Differences: 1.2% fixed, 0.6% floating; total gain 0.6%.
- Equal split: A pays SOFR + 0.0%, B pays 4.9%. Swap: B pays A 4.0% fixed, A pays B SOFR.

**Example 3: Currency swap.** Receive USD 5% on USD 10m, pay EUR 3% on EUR 9m, annual, 2 years left. USD rate 4%, EUR rate 2.5% (flat, cc). Spot 1.10 USD/EUR.
- B_USD = 0.5e^(-0.04) + 10.5e^(-0.08) = 10.1731m.
- B_EUR = 0.27e^(-0.025) + 9.27e^(-0.05) = 9.0812m EUR.
- Value = 10.1731 - 1.10 x 9.0812 = USD 0.18m.

## Questions to ask students
- Why is the notional not exchanged in an interest rate swap? (Both legs are in the same currency, so the exchanges would cancel.)
- What is a floating-rate bond worth immediately after a reset? (Par.)
- If rates fall after you enter a pay-fixed swap, does your position gain or lose? (Lose: you keep paying the old, higher fixed rate.)
- What is the main flaw in the comparative advantage argument? (Floating spreads can be reset upward if credit quality falls.)
- Why does a currency swap have more credit risk than an interest rate swap? (Principal is exchanged at maturity.)

## Analogies
- A swap is like two neighbours agreeing to pay each other's utility bills: one has a fixed-price plan, the other a variable plan, and each prefers the other's.
- The floating leg is like a savings account that always pays today's rate: its value never strays far from the balance, so it is worth par at each reset.
- Comparative advantage is the lawyer-and-typist story: even if the lawyer types faster, both gain when each does what they are relatively better at, but only if the typist's wage cannot be renegotiated tomorrow.

## Recording tips
- Draw the swap as two boxes with arrows for fixed and floating flows before showing any algebra.
- Pause on the "par at reset" fact; it saves enormous time on exam questions.
- Spell out the sign convention twice: receiver versus payer.
