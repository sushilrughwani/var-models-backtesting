---
title: "Central Clearing"
---

## Learning goals
- Explain how a central counterparty (CCP) works through novation, multilateral netting and margining.
- Describe the default waterfall and calculate how a default loss is allocated across its layers.
- Evaluate the benefits of central clearing and the new risks it creates, including liquidity, procyclicality and concentration risk.
- Distinguish clearing members from clients and explain how clients access a CCP.

## Explanation

### What a CCP does
The previous lesson showed that bilateral OTC trading leaves every firm exposed to every counterparty. A **central counterparty** solves this by interposing itself. Through **novation**, a trade between two clearing members is replaced by two trades: one between the buyer and the CCP, and one between the CCP and the seller. The CCP is then the buyer to every seller and the seller to every buyer, and it runs a matched book: it has no net market exposure as long as everyone pays.

Only **clearing members** (usually large banks) deal directly with the CCP. Other firms are **clients** who clear through a member; the member guarantees its clients' obligations to the CCP and collects margin from them.

### Multilateral netting
Bilateral netting nets trades with one counterparty at a time. A CCP nets each member's positions across *all* counterparties, because every trade faces the same CCP. Exposures that cancel across the market disappear. A caveat: if a product is cleared by one CCP and other products remain bilateral, splitting a portfolio into separate netting sets can *increase* some exposures.

### Margin
- **Variation margin** is paid daily (often intraday) in cash, so losses are settled as they arise and no member builds up a large debt.
- **Initial margin** covers the potential loss on a defaulter's portfolio over the time needed to close it out, typically set using a VaR or expected-shortfall model at a high confidence level over several days.

### Default fund and the waterfall
Members also contribute to a mutualised **default fund**. If a member defaults, the CCP auctions or hedges its portfolio. Losses are absorbed in a fixed order:

1. The defaulter's initial margin.
2. The defaulter's default fund contribution.
3. The CCP's own capital (its "skin in the game").
4. Surviving members' default fund contributions.
5. Further calls on surviving members (rights of assessment), then the CCP's remaining capital and recovery tools.

$$
\text{Loss to survivors' fund} = \max\left(L - IM_d - DF_d - SIG,\ 0\right)
$$

where $L$ is the close-out loss, $IM_d$ and $DF_d$ are the defaulter's margin and fund contribution, and $SIG$ is the CCP's skin in the game. Putting the defaulter's resources first makes the "defaulter pays" principle the core of the design; mutualisation comes only after.

### Benefits
- Counterparty risk is replaced by exposure to a single, heavily collateralised, regulated entity.
- Multilateral netting reduces gross exposures and collateral needs.
- Standardised margining and transparency reduce the risk of hidden concentrations.
- Orderly default management (auctions, hedging) limits fire sales.

### Risks CCPs create
- **Liquidity risk**: VM is in cash and calls can be very large in volatile markets, forcing members to find cash quickly.
- **Procyclicality**: margin models raise IM when volatility rises, demanding more collateral exactly when it is scarcest.
- **Moral hazard**: mutualised losses reduce each member's incentive to monitor others.
- **Adverse selection**: members who know more about a product's risk than the CCP may clear their riskiest trades there.
- **Concentration and systemic risk**: a CCP is a single point of failure, effectively too big to fail. History includes CCP failures in Paris (1974), Kuala Lumpur (1983) and Hong Kong (1987).
- **Model risk**: badly calibrated IM can leave the waterfall underfunded.

## Worked example
**Part A: multilateral netting.** Three dealers have trades valued as follows: B owes A 10m, C owes B 10m and A owes C 10m.

- Bilaterally, each dealer has a 10m exposure to one counterparty: total gross exposure 30m.
- With a CCP, each dealer's position nets: A is owed 10 and owes 10, so its net position with the CCP is 0; likewise for B and C.
- Total exposure falls from 30m to **0**.

**Part B: the waterfall.** A clearing member defaults; closing out its portfolio produces a loss of USD 180m. The defaulter posted IM of 100m and contributed 20m to the default fund. The CCP's skin in the game is 10m and surviving members' default fund contributions total 300m.

1. Defaulter's IM absorbs 100m; remaining loss 80m.
2. Defaulter's default fund contribution absorbs 20m; remaining 60m.
3. CCP skin in the game absorbs 10m; remaining 50m.
4. Surviving members' fund absorbs **50m**, i.e. 50 / 300 = 16.7% of their contributions.

No assessment calls are needed because the survivors' fund covered the remainder.

## Common exam traps
- Putting the survivors' default fund before the CCP's skin in the game, or before the defaulter's own resources.
- Thinking a CCP takes market risk; with a matched book it has none unless a member defaults.
- Assuming central clearing always reduces exposure; fragmenting netting sets across CCPs and bilateral trades can increase it.
- Forgetting that VM is generally cash and that CCP margin calls create liquidity risk.
- Treating clients as direct CCP members; they face the CCP through a clearing member.

## Key takeaways
- Novation makes the CCP buyer to every seller and seller to every buyer.
- Multilateral netting cancels offsetting exposures across all members.
- Daily VM plus IM and a default fund protect the CCP.
- The waterfall applies the defaulter's resources first, then CCP capital, then mutualised funds.
- CCPs reduce bilateral credit risk but concentrate risk and create liquidity and procyclicality risk.
