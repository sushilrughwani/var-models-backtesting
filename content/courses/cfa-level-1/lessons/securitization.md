---
title: "Fixed-Income Securitization"
---

## Learning goals
- Describe the steps of a securitisation and the roles of the originator, special purpose entity, servicer and trustee.
- Explain why bankruptcy remoteness and a true sale allow securitised bonds to be rated above the originator.
- Calculate how losses flow through a senior/subordinated structure and measure subordination as credit enhancement.
- Identify internal and external forms of credit enhancement.
- Explain the benefits of securitisation to issuers, investors and the wider economy, and distinguish securitised bonds from covered bonds.

## Explanation

### The idea in one sentence
Securitisation turns illiquid loans, such as mortgages, car loans or card balances, into tradable bonds paid from the loans' cash flows rather than from the lender's general credit.

### How a deal is built
1. **Originate.** A bank or finance company (the **originator**, or seller) makes loans in its normal business.
2. **Sell.** It sells a pool of these loans to a **special purpose entity (SPE)**, a separate legal vehicle created only to hold them. If the transfer is a legal **true sale**, the loans no longer belong to the originator.
3. **Issue.** The SPE issues **asset-backed securities (ABS)** to investors and uses the proceeds to pay the originator for the loans.
4. **Service.** A **servicer**, often the originator itself, collects borrower payments, chases late payers and passes cash to the SPE.
5. **Distribute.** A **trustee** safeguards the assets and makes sure cash is paid to bondholders according to the deal's rules.

Because the SPE is **bankruptcy-remote**, the originator's creditors cannot seize the pool if the originator fails. Investors' risk is therefore tied to the loans, not to the originator, and a BBB-rated lender can issue AAA-rated securities.

### Tranching and the waterfall
The SPE usually issues several classes, or **tranches**, with different claims. In a **senior/subordinated** structure, losses hit the most junior tranche first:

$$
\text{Loss to tranche } k = \min\Big(\text{Size}_k,\ \max\big(0,\ L - \textstyle\sum_{j \text{ junior to } k} \text{Size}_j\big)\Big)
$$

where $L$ is the total pool loss. Each tranche is protected by everything below it. This is **subordination**, measured as:

$$
\text{Subordination}_k = \frac{\text{Par of all tranches junior to } k}{\text{Pool balance}}
$$

Tranching does not remove risk; it **redistributes** it between conservative senior buyers and yield-seeking first-loss investors.

### Credit enhancement
Subordination is one form of **internal** credit enhancement. Others include:
- **Overcollateralisation:** the pool's balance exceeds the bonds issued, so the first losses are absorbed by the surplus.
- **Excess spread:** loan interest exceeds bond coupons plus fees, and the surplus can cover losses or build a reserve.
- **Reserve accounts:** cash set aside to absorb losses.

**External** enhancement comes from a third party, such as a bank letter of credit or a financial guarantee. Its weakness is that the protection is only as strong as the guarantor.

### Why securitisation helps
- **Issuers** gain a new funding source, often at lower cost than their own unsecured debt, and they free up balance-sheet capacity to make more loans.
- **Investors** gain access to diversified loan pools in tranches that match their risk appetite.
- **The economy** benefits because loans become liquid, capital flows more efficiently from savers to borrowers, and lending relies less on bank deposits.

The risks are complexity and **misaligned incentives**: an originator that sells everything may lend carelessly, so regulators often require risk retention.

### Securitised bonds vs covered bonds
A **covered bond** is also backed by a pool of loans, but the pool stays on the issuing bank's balance sheet and investors have **dual recourse**: to the pool and to the bank itself. The bank must replace non-performing loans in the cover pool. ABS investors, by contrast, have recourse only to the SPE's assets.

## Worked example
A finance company securitises a USD 500 million pool of auto loans:
- Senior Class A: USD 400 million
- Mezzanine Class B: USD 70 million
- Equity (residual) tranche: USD 30 million

**Step 1 - subordination.** Class A is protected by B + equity = 100 million, or 100/500 = **20%** of the pool. Class B is protected by 30/500 = 6%.

**Step 2 - pool loss of 20 million.** All of it falls on the equity tranche: 20/30 = 66.7% of its par. Classes A and B are untouched.

**Step 3 - pool loss of 50 million.** Equity absorbs its full 30 million (100% loss). The remaining 20 million hits Class B: 20/70 = **28.6%** of Class B par. Class A loses nothing.

**Step 4 - pool loss of 120 million.** Equity loses 30 and Class B loses 70 (both wiped out). The remaining 20 million hits Class A: 20/400 = **5.0%** of Class A par.

**Interpretation:** Class A survives pool losses of up to 20% untouched, so it can be rated far above the loans or the originator.

## Common exam traps
- Thinking ABS investors have a claim on the originator. With a true sale to a bankruptcy-remote SPE, they do not.
- Believing tranching reduces the total risk of the pool. It only reallocates it among tranches.
- Measuring subordination for a tranche by including the tranche itself or the tranches senior to it. Only junior tranches count.
- Confusing covered bonds with ABS. Covered bonds stay on balance sheet and give dual recourse.
- Assuming external guarantees are risk-free; they carry the guarantor's own risk.

## Key takeaways
- Securitisation pools loans in a bankruptcy-remote SPE that issues bonds backed by the pool's cash flows.
- Key parties are the originator, the SPE, the servicer and the trustee.
- Losses flow bottom-up; subordination = junior par ÷ pool balance.
- Credit enhancement can be internal (subordination, overcollateralisation, excess spread, reserves) or external (guarantees, letters of credit).
- Securitisation benefits issuers, investors and the economy, but it can weaken lending discipline.
- Covered bonds keep the loans on balance sheet and give investors dual recourse.
