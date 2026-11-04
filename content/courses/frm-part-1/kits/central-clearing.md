---
title: "Central Clearing"
duration: 22
---

## Lecture outline
- 00:00 - Hook: three banks owe each other 30m in total, yet a CCP reduces it to zero
- 02:00 - Novation and the matched book; clearing members vs clients
- 05:00 - Multilateral netting vs bilateral netting; fragmented netting sets
- 08:00 - Margin: daily cash VM and model-based IM
- 10:00 - The default fund and the waterfall
- 13:00 - Whiteboard: multilateral netting and a 180m default
- 17:00 - Benefits of central clearing
- 18:30 - Risks: liquidity, procyclicality, moral hazard, adverse selection, concentration, CCP failures
- 21:00 - Recap and traps

## Slides
### Slide 1: The Problem CCPs Solve
- Bilateral OTC: a web of exposures between every pair of firms
- Hidden concentrations and contagion
- A CCP turns the web into a hub and spokes
### Slide 2: Novation
- One trade between members becomes two trades with the CCP
- CCP is buyer to every seller and seller to every buyer
- Matched book: no net market risk while members pay
### Slide 3: Members and Clients
- Clearing members deal directly with the CCP
- Clients clear through a member who guarantees them
- Members collect margin from clients
### Slide 4: Multilateral Netting
- All trades face one counterparty, so they net across the market
- Can shrink gross exposures dramatically
- Fragmented netting sets can raise exposure
### Slide 5: Margin
- VM: daily or intraday, in cash
- IM: covers the close-out period at high confidence
- IM models: VaR or expected shortfall over several days
### Slide 6: The Default Waterfall
- 1: defaulter's IM; 2: defaulter's default fund contribution
- 3: CCP skin in the game
- 4: survivors' default fund; 5: assessments and recovery tools
### Slide 7: 180m Default
- IM 100 → 80 left; DF 20 → 60 left; SIG 10 → 50 left
- Survivors' fund absorbs 50m (16.7% of 300m)
- No assessment calls needed
### Slide 8: Benefits
- Single, well-capitalised counterparty
- Lower gross exposures and collateral needs
- Transparency and orderly default management
### Slide 9: Risks CCPs Create
- Cash VM calls: liquidity risk
- Procyclical IM; model risk
- Moral hazard and adverse selection
### Slide 10: Too Big to Fail
- CCPs concentrate systemic risk
- Historical failures: Paris 1974, Kuala Lumpur 1983, Hong Kong 1987
- Regulators impose strict standards and recovery plans
### Slide 11: Takeaways
- Defaulter pays first, mutualisation second
- Netting benefits depend on how many products are cleared together
- Credit risk falls, liquidity and concentration risk rise

## Whiteboard examples
**1. Circular exposures.** B owes A 10m, C owes B 10m, A owes C 10m.
- Bilateral exposures: A to B 10, B to C 10, C to A 10; total 30m.
- Via CCP: each member owed 10 and owing 10, net 0. Total 0.

**2. Waterfall, 180m loss.** Defaulter IM 100m, DF 20m; SIG 10m; survivors' DF 300m.
- 180 - 100 = 80; 80 - 20 = 60; 60 - 10 = 50.
- Survivors lose 50m = 16.7% of their contributions.

**3. Waterfall, 250m loss.** IM 150m, DF 30m, SIG 15m, survivors' DF 400m.
- Survivors lose 250 - 150 - 30 - 15 = 55m (13.75%).

## Questions to ask students
- After novation, who is the counterparty of a trade's buyer? (The CCP.)
- Why does a CCP require VM in cash? (Losses must be paid immediately and cash has no price risk.)
- Which layer comes first in the waterfall? (The defaulting member's initial margin.)
- Why might clearing one product but not others increase exposure? (It breaks up bilateral netting sets, so offsets across products are lost.)
- Why is a mutualised default fund a source of moral hazard? (Members share losses, so each has less incentive to monitor others.)

## Analogies
- A CCP is the hub of an airline network: instead of flights between every pair of cities, everything routes through one airport, which is efficient until that airport closes.
- The waterfall is like a car insurance claim: your own deductible pays first, then the insurer, and only then the wider pool.
- Procyclical margin is like an umbrella seller who doubles the price when it starts raining.

## Recording tips
- Draw the bilateral web and the hub-and-spoke picture side by side.
- Animate the waterfall as stacked bars being consumed one layer at a time.
- Stress the order of the waterfall; candidates often swap SIG and the survivors' fund.
