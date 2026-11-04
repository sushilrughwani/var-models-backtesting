---
title: "Credit Derivatives and Securitisation"
---

## Learning goals
- Describe the mechanics of a credit default swap, including premium leg, protection leg and settlement.
- Calculate hazard rates, default probabilities and upfront payments from CDS quotes.
- Allocate pool losses across securitisation tranches using attachment and detachment points.
- Explain the securitisation process, the role of the SPV and the main forms of credit enhancement.
- Evaluate the incentive problems that securitisation can create.

## Explanation

### Credit default swaps
A **CDS** transfers the default risk of a reference entity from a protection buyer to a protection seller. The buyer pays a periodic premium (the **premium leg**, usually quarterly) on the notional. If a credit event occurs - such as bankruptcy or failure to pay - the seller pays the **protection leg**: notional times $(1 - R)$, where $R$ is the recovery rate. Settlement is usually cash, with $R$ fixed by an industry auction on the defaulted bonds; physical settlement (delivering a bond for par) is the older alternative. Buying protection is economically similar to shorting the reference entity's bonds.

Compared with the counterparty material in the previous two lessons, note the twist: a CDS buyer is also exposed to the protection seller's default, which is a textbook source of wrong-way risk.

### The credit triangle
If the premium exactly compensates the expected loss rate, the spread $s$ satisfies
$$
s \approx \lambda \times (1 - R) \quad \Longrightarrow \quad \lambda \approx \frac{s}{1-R}
$$
where $\lambda$ is the risk-neutral hazard rate. The probability of default within $T$ years is then $1 - e^{-\lambda T}$.

### Standard coupons and upfront payments
Modern CDS trade with a fixed **standard coupon** (for example 100 bp or 500 bp). When the market spread differs from the coupon, the difference is settled at inception as an upfront payment:
$$
\text{Upfront} \approx (s - c) \times RPV01 \times \text{Notional}
$$
where $s$ is the par spread, $c$ the standard coupon and $RPV01$ the risky present value of a 1-unit annual premium stream (risky duration). If $s > c$, the buyer pays upfront; if $s < c$, the buyer receives it.

### The securitisation process
In securitisation an **originator** (often a bank) sells a pool of loans - mortgages, auto loans, credit card receivables - to a bankruptcy-remote **special purpose vehicle (SPV)**. The SPV funds the purchase by issuing securities in **tranches** with different seniority. A **servicer** collects borrower payments, and a **trustee** enforces the waterfall that distributes cash: senior tranches are paid first, junior tranches last, and losses hit in reverse order.

### Tranche losses
Each tranche has an **attachment point** $A$ and **detachment point** $D$ as fractions of the pool. For pool loss $L$ (also as a fraction):
$$
\text{Tranche loss fraction} = \frac{\min\big(\max(L - A, 0),\; D - A\big)}{D - A}
$$
The equity tranche (attaching at 0) absorbs the first losses; senior tranches are hit only after everything beneath them is wiped out.

### Credit enhancement
Senior tranches achieve high ratings through **credit enhancement**:
- **Subordination:** junior tranches absorb losses first.
- **Overcollateralisation:** the pool's par value exceeds the securities issued.
- **Excess spread:** pool interest above what the notes pay and fees, used to absorb losses.
- **External support:** guarantees, insurance wraps or reserve accounts.

### Correlation and tranche risk
Default correlation (from the portfolio lesson) affects tranches differently. Higher correlation makes outcomes more all-or-nothing: the equity tranche becomes *less* risky (more chance of near-zero losses), while senior tranches become *more* risky (more chance of a large clustered loss). Equity investors are effectively long correlation; senior investors are short it.

### Incentive problems
The **originate-to-distribute** model can weaken screening, because originators do not keep the credit risk. Other frictions include rating-agency conflicts and model risk in correlation assumptions. Post-crisis rules require originators to retain a slice (often 5%) of the risk - "skin in the game".

## Worked example
**Part A - CDS.** A buyer purchases 5-year protection on USD 10 m notional. The par spread is 180 bp, the expected recovery 40%, the standard coupon 100 bp and the RPV01 4.2.
1. Hazard rate: $\lambda = 0.018/0.60 = 3.0\%$.
2. Five-year PD: $1 - e^{-0.03 \times 5} = 13.93\%$.
3. Upfront: $(0.018 - 0.010) \times 4.2 \times 10{,}000{,}000 = 336{,}000$. Since spread exceeds coupon, the **buyer pays USD 336,000** upfront, then USD 25,000 per quarter (100 bp a year).
4. If default occurs and the auction sets recovery at 35%, the seller pays $10{,}000{,}000 \times 0.65 = $ USD 6.5 m.

**Part B - Tranches.** A USD 500 m pool is split into equity 0-5% (USD 25 m), mezzanine 5-15% (USD 50 m) and senior 15-100% (USD 425 m). Pool losses are 9%, i.e. USD 45 m.
- Equity absorbs the first 25: wiped out (100% loss).
- Mezzanine absorbs the next 20 of its 50: loss $= 20/50 =$ **40%**.
- Senior: no loss, since losses (9%) are below its 15% attachment point.

## Common exam traps
- Dividing the spread by the recovery rate instead of by $1 - R$ to get the hazard rate.
- Getting the upfront direction wrong: when the spread is below the coupon, the seller pays the buyer.
- Expressing tranche loss as a share of the pool rather than as a share of the tranche's own size.
- Assuming higher correlation hurts every tranche; it helps equity and hurts senior tranches.
- Thinking the SPV structure removes risk; it redistributes it among investors.

## Key takeaways
- A CDS buyer pays a premium and receives notional × (1 - R) on a credit event.
- Hazard rate ≈ spread / (1 - R); PD over T years = $1 - e^{-\lambda T}$.
- Upfront ≈ (spread - coupon) × RPV01 × notional.
- Losses run up the capital structure: equity first, senior last.
- Subordination, overcollateralisation and excess spread protect senior tranches.
- Securitisation can dilute lending incentives; risk retention rules respond to this.
