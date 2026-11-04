---
title: "Mortgages and Mortgage-Backed Securities"
---

## Learning goals
- Calculate the level monthly payment on a fixed-rate mortgage and split it into interest and principal.
- Explain why borrowers prepay and convert between CPR, SMM and the PSA benchmark.
- Describe agency pass-through securities and explain contraction risk, extension risk and negative convexity.
- Explain how CMOs (sequential and PAC tranches) and IO/PO strips redistribute prepayment risk.
- Describe the dollar roll and the meaning of option-adjusted spread.

## Explanation

### The fixed-rate mortgage
A standard fixed-rate mortgage is a fully amortising loan: the borrower pays the same amount every month, and each payment covers that month's interest plus some principal. Early payments are mostly interest; later payments are mostly principal. The payment is the annuity formula from basic time value of money:
$$
P = \frac{L\,i}{1 - (1+i)^{-n}}
$$
where $P$ is the monthly payment, $L$ is the loan amount, $i$ is the monthly rate (annual rate divided by 12) and $n$ is the number of monthly payments.

### Prepayment
Borrowers can usually repay early without penalty. They prepay because of **refinancing** when rates fall (the big driver), home sales, defaults (which agency guarantees convert into prepayments) and partial extra payments. A mortgage is therefore a bond plus a call option held by the borrower.

Prepayment speed is quoted as a **conditional prepayment rate (CPR)**, an annualised fraction of the remaining balance prepaid. The monthly equivalent is the **single monthly mortality rate (SMM)**:
$$
\text{SMM} = 1 - (1 - \text{CPR})^{1/12}
$$
Each month, prepayment $= \text{SMM} \times$ (balance after scheduled principal).

The **PSA benchmark** (100% PSA) assumes CPR starts at 0.2% in month 1 and rises by 0.2% per month until reaching 6% at month 30, then stays at 6%. A pool at 150% PSA prepays at 1.5 times those rates.

### Pass-through securities
Agencies (Ginnie Mae, Fannie Mae, Freddie Mac) pool mortgages and issue **pass-throughs**: investors receive their share of all interest, scheduled principal and prepayments, less servicing and guarantee fees. Credit risk is largely removed by the agency guarantee; the main risk is prepayment:
- **Contraction risk**: rates fall, prepayments accelerate, and principal comes back just when it can only be reinvested at lower rates. Price gains are capped.
- **Extension risk**: rates rise, prepayments slow, and the investor is stuck with a below-market coupon for longer.

Together these produce **negative convexity**: the price rises less when rates fall than it drops when rates rise.

### CMOs and strips
A **collateralised mortgage obligation (CMO)** carves pool cash flows into tranches with rules for distributing principal:
- **Sequential-pay**: tranche A receives all principal until retired, then tranche B, and so on. Early tranches are short; later ones are long.
- **PAC (planned amortisation class)**: receives principal on a fixed schedule as long as prepayments stay within a band; **support tranches** absorb the deviations, so they carry concentrated prepayment risk.

**Stripped MBS** split interest from principal. The **principal-only (PO)** strip gains when prepayments speed up (principal arrives sooner at par). The **interest-only (IO)** strip loses when prepayments speed up because the balance generating interest shrinks; IO values can rise when rates rise, a rare negative-duration asset.

### Dollar roll and OAS
Agency pass-throughs trade in the **TBA** (to-be-announced) market, where the specific pools are delivered later. In a **dollar roll**, an investor sells TBA for one settlement month and buys back for a later month at a lower price (the **drop**). The investor gives up coupon and principal for a month but can invest the cash; the roll is attractive when the drop exceeds that lost carry. It works like a collateralised loan.

Because cash flows depend on the rate path, MBS are valued by simulating many rate paths. The **option-adjusted spread (OAS)** is the spread over the risk-free curve that equates model value to market price after removing the prepayment option's cost.

## Worked example
A borrower takes a USD 300,000, 30-year fixed mortgage at 6% per year.

1. Monthly rate: $i = 0.06/12 = 0.005$; $n = 360$.
2. Payment: $P = \dfrac{300{,}000 \times 0.005}{1 - 1.005^{-360}} = $ **USD 1,798.65**.
3. Month 1 interest: $300{,}000 \times 0.005 = 1{,}500.00$.
4. Scheduled principal: $1{,}798.65 - 1{,}500.00 = 298.65$.
5. Balance after scheduled principal: $299{,}701.35$.

Now suppose the pool prepays at 6% CPR (100% PSA after month 30).
6. $\text{SMM} = 1 - 0.94^{1/12} = 0.005143$.
7. Prepayment: $0.005143 \times 299{,}701.35 = $ **USD 1,541.37**.
8. Total principal returned: $298.65 + 1{,}541.37 = 1{,}840.02$; ending balance $= 298{,}159.98$.

The prepayment is more than five times the scheduled principal for the month. At 150% PSA in month 20, CPR would be $1.5 \times 0.2\% \times 20 = 6\%$, the same speed.

## Common exam traps
- Dividing CPR by 12 instead of using $1 - (1 - \text{CPR})^{1/12}$.
- Applying SMM to the beginning balance rather than the balance after scheduled principal.
- Forgetting that PSA ramps up only for the first 30 months.
- Thinking IO strips gain when rates fall; faster prepayments destroy IO cash flows.
- Assuming PAC tranches remove prepayment risk; the risk moves to the support tranches.

## Key takeaways
- Level mortgage payments follow the annuity formula; interest dominates early payments.
- Prepayment, mainly refinancing, makes MBS cash flows uncertain: SMM $= 1 - (1-\text{CPR})^{1/12}$.
- Pass-throughs suffer contraction and extension risk and show negative convexity.
- CMOs and IO/PO strips reallocate prepayment risk; they do not eliminate it.
- Dollar rolls are a financing trade in the TBA market; OAS measures spread after adjusting for the prepayment option.
