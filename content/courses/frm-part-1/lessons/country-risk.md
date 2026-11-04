---
title: "Country Risk: Determinants, Measures and Implications"
---

## Learning goals
- Identify the economic, political and legal sources of country risk.
- Explain why sovereigns default, the costs of default and the difference between foreign-currency and local-currency debt.
- Interpret sovereign ratings, default spreads and sovereign CDS as measures of country risk.
- Estimate an implied default probability from a sovereign spread.
- Calculate a country risk premium and incorporate it into a cost of equity.

## Explanation

### What is country risk?
The previous lesson rated individual borrowers. But a strong company in a weak country can still suffer: currency controls may stop it paying foreign creditors, a recession can crush demand, or a government can change the rules. **Country risk** is the extra risk from exposure to a particular country's economy, politics and legal system.

### Determinants
- **Economic**: level and growth of income, dependence on a single commodity or industry, inflation, external debt, current-account deficits and foreign-exchange reserves. Diversified economies absorb shocks better than those relying on one export.
- **Political**: stability of government, corruption, the risk of war or violence, and the chance of expropriation or sudden policy reversals. Democracies tend to have more continuous policy, while autocracies can deliver abrupt changes.
- **Legal**: protection of property rights and the speed and fairness of contract enforcement. A good contract is worth little if courts cannot enforce it.

These interact: weak institutions raise both political and economic risk.

### Sovereign default
Governments default on **foreign-currency debt** because they cannot print the currency needed to repay. On **local-currency debt** they can print money, yet defaults still occur, because inflating away debt is costly too, banks hold large amounts of government bonds, or debt is linked to a foreign currency or inflation. Consequently agencies usually rate a sovereign's local-currency debt at or above its foreign-currency debt.

Default is costly for a sovereign: loss of market access or much higher borrowing costs for years, damage to the domestic banking system that holds government bonds, a weaker currency, reduced trade credit, and political fallout. These costs are why most governments try hard to avoid default and why they often restructure rather than repudiate.

### Measuring country risk
- **Risk services and indices** score many economic, political and legal factors, but methods and weights differ between providers.
- **Sovereign ratings** follow the same scales as corporate ratings, with separate foreign- and local-currency ratings. Like corporate ratings, they are through-the-cycle and can lag markets.
- **Sovereign default spreads**: the yield on a government's foreign-currency bond minus the yield on a default-free bond in the same currency (for example a US Treasury of the same maturity).
- **Sovereign CDS spreads**: the annual premium to insure against sovereign default. They update continuously but can be affected by liquidity and counterparty risk.

A spread compensates investors for expected default losses, so approximately

$$
s \approx \text{PD} \times (1 - R)
$$

where $s$ is the annual spread, PD the annual default probability and $R$ the recovery rate. Rearranging gives the market-implied PD.

### Implications for equity investors
Equity in a risky country is riskier than its government bonds, so the bond spread understates the equity premium. A common approach scales the default spread by relative volatility:

$$
\text{CRP} = \text{default spread} \times \frac{\sigma_{\text{equity}}}{\sigma_{\text{bond}}}
$$

where $\sigma_{\text{equity}}$ and $\sigma_{\text{bond}}$ are the volatilities of the country's equity market and its government bonds. The cost of equity then becomes $r_f + \beta \times \text{ERP} + \text{CRP}$, where ERP is the mature-market equity risk premium.

## Worked example
Country Z has a 10-year US-dollar bond yielding 7.4%. A 10-year US Treasury yields 4.2%. Assume a 40% recovery rate. Country Z's equity market volatility is 27% and its dollar bond volatility is 18%. A project there has a beta of 1.1 and the mature-market ERP is 5%.

1. Default spread: $7.4\% - 4.2\% = 3.2\%$.
2. Implied annual PD: $3.2\% / (1 - 0.40) = 3.2\% / 0.60 =$ **5.33%**.
3. Relative volatility: $27\% / 18\% = 1.5$.
4. Country risk premium: $3.2\% \times 1.5 =$ **4.8%**.
5. Cost of equity: $4.2\% + 1.1 \times 5\% + 4.8\% = 4.2\% + 5.5\% + 4.8\% =$ **14.5%**.

Ignoring country risk would give 9.7%, so country risk adds 4.8 percentage points to the hurdle rate. Using the raw default spread without scaling would give 12.9%, understating equity risk.

## Common exam traps
- Assuming a government cannot default on local-currency debt. It can, although it is less common.
- Forgetting to divide by $(1 - R)$ when backing out PD from a spread; the spread reflects loss, not default frequency alone.
- Using the bond default spread directly as the equity premium without scaling by relative volatility.
- Comparing yields in different currencies when computing a default spread; both bonds must be in the same currency.
- Treating sovereign ratings as real-time signals; like corporate ratings, they tend to lag spreads.

## Key takeaways
- Country risk comes from economic, political and legal factors that interact.
- Sovereigns default more on foreign-currency debt; local-currency ratings are usually at or above foreign-currency ratings.
- Default costs (lost market access, banking stress, weaker currency) explain why governments resist default.
- Spread ≈ PD × (1 − R), so implied PD = spread / (1 − R).
- An equity country risk premium scales the default spread by equity-to-bond volatility.
