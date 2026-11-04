---
title: "Investors and Other Stakeholders"
---

## Learning goals
- Identify the main stakeholder groups of a corporation and what each wants from it.
- Compare the claims of equity holders and debt holders and explain why their risk preferences differ.
- Calculate expected payoffs to shareholders and creditors under safe and risky projects to show the asset-substitution conflict.
- Contrast shareholder theory with stakeholder theory and describe how corporate governance balances competing interests.

## Explanation

### Who has a stake?
A **stakeholder** is any party with an interest in how a company performs. The main groups are:

- **Shareholders**: residual owners. They get what is left after everyone else is paid and vote on major decisions.
- **Creditors** (bondholders, banks): contractual claim to interest and principal. They want the firm to stay solvent, not to take big bets.
- **Board of directors**: elected by shareholders to oversee management and protect owners' interests.
- **Managers**: run the firm day to day. They care about pay, job security, power and reputation.
- **Employees**: wages, safety, career prospects and job stability.
- **Customers and suppliers**: reliable products, fair prices, timely payment and a long relationship.
- **Governments and regulators**: tax revenue, legal compliance, employment and protection of the public.

Their interests overlap (everyone benefits if the firm survives and grows) but also collide, and recognising the collisions is the core skill in this topic.

### Equity versus debt: two very different payoffs
At maturity, if firm value is $V$ and debt has face value $F$:

$$
\text{Debt payoff} = \min(V, F), \qquad \text{Equity payoff} = \max(V - F,\ 0)
$$

where $V$ is the value of the firm's assets when the debt is due and $F$ is the promised repayment. Creditors' upside is capped at $F$, but they absorb losses once $V < F$. Shareholders have unlimited upside and, thanks to limited liability, a floor of zero. Equity therefore behaves like a call option on the firm's assets.

The consequence: **shareholders like volatility; creditors dislike it.** Once debt is in place, owners can gain by switching to riskier projects because they keep the upside while creditors bear much of the downside. This is called **asset substitution** (or risk shifting). Related conflicts include paying out large dividends that drain assets creditors rely on, and issuing new debt that dilutes existing lenders' claims.

### Other common conflicts
- **Shareholders versus managers**: managers may build empires, avoid risk to protect their jobs or award themselves excessive pay.
- **Controlling versus minority shareholders**: a dominant owner may push through related-party deals or vote for directors that serve the controller.
- **Shareholders versus employees, customers or society**: cost cutting that raises short-term profit may harm safety, product quality or the environment.

### Shareholder theory versus stakeholder theory
**Shareholder theory** says the firm's purpose is to maximise the value of shareholders' equity; other parties are protected by contracts and law. **Stakeholder theory** says management should balance the interests of all stakeholders, because long-run value depends on employees, customers, suppliers and communities as well. In practice the views converge over long horizons: firms that mistreat stakeholders often lose value eventually.

### Where governance fits
**Corporate governance** is the system of rules, practices and controls that directs a company and manages these conflicts. Each group has its own tools: shareholders vote at general meetings, creditors write covenants into loan agreements, employees rely on contracts and labour law, customers and suppliers rely on contracts and reputation, and regulators use law and enforcement. The board sits at the centre, monitoring managers on behalf of owners. The next lesson examines these mechanisms in depth.

## Worked example
Kestrel Ltd has debt with face value 100 due in one year. It can choose one of two projects; the outcome determines firm value at year-end:

- **Safe project**: firm value is 120 for certain.
- **Risky project**: firm value is 180 with probability 0.5 or 40 with probability 0.5.

**Step 1 - Expected firm value.** Safe: 120. Risky: 0.5 × 180 + 0.5 × 40 = 110. The safe project creates more total value.

**Step 2 - Shareholders' payoff, safe.** max(120 - 100, 0) = 20.

**Step 3 - Shareholders' payoff, risky.** Good state: 180 - 100 = 80. Bad state: max(40 - 100, 0) = 0. Expected = 0.5 × 80 + 0.5 × 0 = **40**.

**Step 4 - Creditors' payoff.** Safe: 100 in full. Risky: 0.5 × 100 + 0.5 × 40 = **70**.

**Step 5 - Interpret.** Shareholders' expected payoff doubles from 20 to 40 under the risky project even though total expected value falls from 120 to 110. The extra 20 for owners comes from creditors, whose expected payoff falls by 30 (from 100 to 70), and the remaining 10 is destroyed value. This is why lenders demand covenants and why governance must protect more than one group.

## Common exam traps
- Computing the shareholder payoff in the bad state as negative (40 - 100 = -60). Limited liability sets the floor at zero.
- Assuming shareholders always choose the project with the highest firm value. With debt outstanding, they may prefer higher risk instead.
- Mixing up which group prefers lower dividends: creditors do, because cash paid out is no longer available to service debt.
- Treating stakeholder theory as ignoring shareholders. It balances shareholders with other groups rather than replacing them.

## Key takeaways
- Stakeholders include shareholders, creditors, the board, managers, employees, customers, suppliers and governments.
- Debt payoff is $\min(V,F)$; equity payoff is $\max(V-F,0)$, so equity resembles a call option on the firm.
- Shareholders gain from risk and creditors lose from it, creating asset-substitution and dividend conflicts.
- Shareholder theory maximises owner value; stakeholder theory balances all groups' interests.
- Corporate governance is the system that manages these conflicts, with different tools for each stakeholder group.
