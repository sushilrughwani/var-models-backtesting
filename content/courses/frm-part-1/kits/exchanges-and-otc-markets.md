---
title: "Exchanges and OTC Markets"
duration: 20
---

## Lecture outline
- 00:00 - Hook: you are owed 13m by a defaulted counterparty but can only claim 7m, and that is good news
- 02:00 - Exchange markets: standardisation, clearing, market makers, electronic trading
- 05:00 - OTC markets: customisation, size, counterparty credit risk
- 07:00 - Netting under the ISDA Master Agreement and cherry-picking
- 10:00 - Collateral: CSA, VM, IM, thresholds, minimum transfer amount, haircuts
- 13:00 - Whiteboard: Ridge Bank netting and collateral
- 16:00 - Collateral and liquidity risk; downgrade triggers
- 17:30 - Post-crisis reforms: clearing mandate, SEFs, trade repositories, uncleared margin rules
- 19:00 - Recap and traps

## Slides
### Slide 1: Two Market Structures
- Exchange: standardised contracts, central clearing, public prices
- OTC: bilateral, tailored contracts
- OTC is much larger by notional, led by interest rate swaps
### Slide 2: Exchanges
- From open outcry to electronic order books
- Market makers quote bid and ask
- Clearing house is counterparty to every trade
### Slide 3: OTC Counterparty Risk
- Loss arises when the counterparty defaults while you are in the money
- Exposure changes as market values move
- Mitigants: netting, collateral, triggers, clearing
### Slide 4: Netting
- One ISDA Master Agreement covers all trades
- On default, values are added into one net claim
- Prevents cherry-picking by the liquidator
### Slide 5: Netting Formula
- Without netting: sum of positive values
- With netting: max(sum of all values, 0)
- Netting never increases exposure
### Slide 6: The CSA
- Variation margin: current mark-to-market
- Initial margin: buffer for the margin period of risk
- Threshold and minimum transfer amount
### Slide 7: Haircuts
- Non-cash collateral credited at (1 - haircut) of market value
- Market value needed = requirement / (1 - haircut)
- Higher haircuts for more volatile or less liquid collateral
### Slide 8: Ridge Bank Example
- Trades +10, -6, +3: gross 13, net 7
- 40% recovery: loss 7.8 vs 4.2
- Collateral 5m after 2m threshold; 5.208m of bonds at 4% haircut
### Slide 9: Collateral Creates Liquidity Risk
- Large calls after market moves or downgrades
- Downgrade triggers can accelerate distress
- 2008 insurer CDS episode
### Slide 10: Post-2008 Reforms
- Standardised OTC trades cleared through CCPs
- Electronic execution and trade reporting
- Mandatory VM and IM for uncleared trades between financials
### Slide 11: Takeaways
- Netting and collateral are the core OTC risk mitigants
- Neither removes risk entirely
- Credit risk can turn into liquidity risk

## Whiteboard examples
**1. Ridge Bank and Delta Fund.** Trade values to Ridge: +10m, -6m, +3m.
- No netting exposure: 10 + 3 = 13m (and Ridge still pays 6m).
- Netting exposure: 10 - 6 + 3 = 7m.
- Loss at 40% recovery: 7.8m vs 4.2m.
- Threshold 2m: collateral required 5m; with 4% haircut, bonds worth 5 / 0.96 = 5.208m.

**2. Four-trade check.** Values +8, +5, -4, -3.
- Gross positive = 13; net = 6.
- If collateral must cover the net exposure above a 1.5m threshold with a 10% haircut: (6 - 1.5) / 0.9 = 5.0m of bonds.

## Questions to ask students
- Why can't a liquidator cherry-pick trades under a master agreement? (All trades are a single contract, so only the net amount is owed.)
- What risk remains with full daily VM and zero threshold? (Value changes between the last margin call and close-out, plus collateral value risk; IM covers this.)
- Why is a haircut applied to bonds but usually not to cash in the same currency? (Bond prices can fall before they are sold; cash does not.)
- How do downgrade triggers make a crisis worse? (They demand collateral exactly when the firm is weakest.)
- Which trades are still bilateral after reforms? (Non-standard, bespoke contracts that CCPs do not clear.)

## Analogies
- Netting is splitting a restaurant bill among friends: instead of everyone paying everyone, you settle one net amount each.
- A haircut is a pawnshop valuation: they lend you less than the watch is worth because its price might fall before they sell it.
- Collateral is a seatbelt that can bruise you: it protects in a crash but the sudden jolt (a margin call) can hurt.

## Recording tips
- Show the three-trade table with positive values highlighted to make the netting point visually.
- Keep CCP mechanics brief; signpost the next lesson.
- Emphasise the credit-to-liquidity transformation with the 2008 insurer story; it sticks.
