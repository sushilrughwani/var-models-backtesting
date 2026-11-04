---
title: "Analysis of Dividends and Share Repurchases"
---

## Learning goals
- Compare the main theories of payout policy: irrelevance, bird-in-the-hand, tax, clientele, signalling and agency.
- Calculate the effective tax rate on distributed earnings under double taxation, split-rate and imputation systems.
- Calculate the effect of a share repurchase on EPS and book value per share.
- Estimate a firm's expected dividend using a target payout adjustment model and assess dividend safety.

## Explanation

### Does payout policy matter?
Under **Miller-Modigliani (MM) irrelevance**, in a world with no taxes, transaction costs or information asymmetries, payout policy does not affect firm value. An investor who wants cash from a non-paying firm can sell shares ("homemade dividends"); one who receives an unwanted dividend can reinvest it. Value comes from investment decisions, not from how cash is split between dividends and retention.

Real-world frictions reopen the question:

- **Bird-in-the-hand**: investors see dividends as less risky than distant capital gains, so paying more lowers the cost of equity. Critics say this confuses the riskiness of the business with the timing of cash.
- **Tax argument**: if dividends are taxed more heavily than capital gains, taxable investors prefer low payouts.
- **Clientele effect**: investors sort themselves by tax bracket and income needs. A change in policy may shuffle clienteles but need not change value.
- **Signalling**: managers know more than outsiders. Because cutting a dividend is painful, initiations and increases signal confidence in sustainable earnings, while cuts signal trouble. Repurchases can signal that management thinks the shares are undervalued.
- **Agency costs**: paying out free cash flow keeps managers from wasting it on empire-building. Between shareholders and bondholders, however, large payouts can transfer wealth away from creditors, which is why debt covenants restrict them.

### Taxes on distributed earnings
The effective tax rate combines corporate and personal taxes on one unit of pre-tax earnings paid out:

$$
\text{Double taxation: } t_{eff} = t_c + (1 - t_c) t_d = 1 - (1 - t_c)(1 - t_d)
$$

where $t_c$ is the corporate rate and $t_d$ the individual dividend tax rate. Under a **split-rate** system, distributed earnings carry a lower corporate rate, so use that rate as $t_c$. Under an **imputation** system, shareholders receive a credit for corporate tax paid, so the effective rate equals the shareholder's marginal tax rate.

### Repurchase mechanics and EPS
A repurchase reduces share count but also reduces cash or increases debt. The EPS effect depends on a single comparison:

- If the **earnings yield** (E/P) exceeds the **after-tax cost of funds**, EPS rises.
- If it is lower, EPS falls.

$$
EPS_{new} = \frac{NI - \text{after-tax cost of funds used}}{\text{shares} - \frac{\text{amount}}{P}}
$$

Book value per share falls when shares are bought above BVPS and rises when bought below BVPS. An EPS increase does not automatically create value; the repurchase is value-neutral at a fair price.

Repurchase methods include open-market purchases (the most flexible), fixed-price tender offers, Dutch auctions and direct negotiation with a large holder (which may transfer value if paid at a premium). Compared with dividends, repurchases are flexible, do not set expectations and may be tax-favoured, but they can be used to offset dilution from employee options rather than return cash.

### Dividend policy in practice
Many firms smooth dividends toward a target payout ratio. A target-adjustment model gives:

$$
D_1 = D_0 + a\left(\tau \times E_1 - D_0\right)
$$

where $D_0$ is the previous dividend, $\tau$ the target payout ratio, $E_1$ expected EPS and $a$ the adjustment speed. To judge **dividend safety**, compare total distributions with free cash flow to equity: the FCFE coverage ratio is FCFE / (dividends + repurchases). Coverage persistently below 1 means the payout relies on cash reserves or borrowing.

## Worked example
Halden Corp has net income of USD 50 million, 20 million shares at USD 40, and equity of USD 600 million. It borrows USD 100 million at a 6% pre-tax rate to buy back shares. Tax rate: 25%.

Step 1: Original EPS = 50 / 20 = USD 2.50. Earnings yield = 2.50 / 40 = 6.25%.

Step 2: After-tax cost of debt = 6% × 0.75 = 4.5%, below 6.25%, so expect EPS to rise.

Step 3: Shares repurchased = 100 / 40 = 2.5 million; remaining = 17.5 million.

Step 4: After-tax interest = 100 × 0.06 × 0.75 = USD 4.5 million. New net income = 45.5 million.

Step 5: New EPS = 45.5 / 17.5 = **USD 2.60**.

Step 6: Book value falls to 600 − 100 = 500 million. New BVPS = 500 / 17.5 = **USD 28.57**, down from USD 30.00 because the shares were bought above book value.

Tax extension: with corporate tax 25% and a 15% dividend tax under double taxation, the effective rate is 1 − 0.75 × 0.85 = **36.25%**.

## Common exam traps
- Using the pre-tax cost of funds when computing lost income or new interest expense.
- Assuming a repurchase always raises BVPS; it falls when price exceeds book value.
- Treating EPS accretion as value creation.
- Adding corporate and personal tax rates instead of compounding them.
- Under imputation, forgetting the effective rate is simply the shareholder's marginal rate.

## Key takeaways
- MM irrelevance holds only without taxes, costs and information gaps; frictions make payout matter.
- Signalling and agency arguments explain why dividend cuts are punished.
- A repurchase raises EPS when the earnings yield exceeds the after-tax cost of funds.
- BVPS rises only if shares are bought below book value.
- Dividends are smoothed toward a target; FCFE coverage tests sustainability.
