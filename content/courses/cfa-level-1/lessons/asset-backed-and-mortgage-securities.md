---
title: "Asset-Backed and Mortgage-Backed Securities"
---

## Learning goals
- Explain prepayment risk and distinguish contraction risk from extension risk.
- Convert between conditional prepayment rate (CPR) and single monthly mortality (SMM), and apply the PSA benchmark.
- Calculate a month's prepayment and total principal for a mortgage pass-through.
- Describe how sequential-pay and PAC/support CMOs redistribute prepayment risk.
- Compare commercial MBS and non-mortgage ABS (auto loans and credit cards) in terms of structure and risk.

## Explanation

### The borrower holds an option
A typical residential mortgage is a level-payment, fully amortising loan, and the borrower can usually **prepay** at any time without penalty. That prepayment option is the defining feature of mortgage-backed securities (MBS). Borrowers prepay when they move house, and above all when rates fall and refinancing becomes cheaper. The investor has, in effect, sold the borrower a call option.

- **Contraction risk:** rates fall, prepayments speed up, and principal comes back early, just when it must be reinvested at lower yields. Price gains are capped, which is **negative convexity**.
- **Extension risk:** rates rise, prepayments slow, and the security's life lengthens just when the investor would prefer cash back to reinvest at higher yields.

### Measuring prepayment speed

$$
SMM = \frac{\text{Prepayment in month}}{\text{Beginning balance} - \text{Scheduled principal}}
\qquad
SMM = 1 - (1 - CPR)^{1/12}
$$

where SMM is the single monthly mortality rate and CPR is the annualised conditional prepayment rate. Scheduled principal is subtracted first because it is not available to prepay. The **PSA benchmark** gives a standard speed path: at 100 PSA, CPR starts at 0.2% in month 1 and rises by 0.2% a month to 6% in month 30, then stays at 6%. A speed of 150 PSA means 1.5 times that path, so the CPR is 9% after month 30. **Weighted average life (WAL)** summarises the result: the average time until principal is repaid. Faster prepayments shorten the WAL.

### Pass-through securities
A **mortgage pass-through** gives each investor a pro rata share of all pool cash flows: interest, scheduled principal and prepayments. The **pass-through rate** is below the pool's weighted-average coupon (WAC) because servicing and guarantee fees are deducted. Pass-throughs guaranteed by government agencies carry little credit risk, so their main risk is prepayment. Non-agency (private-label) deals need credit enhancement like the structures in the previous lesson.

### Collateralised mortgage obligations (CMOs)
A CMO slices pass-through cash flows into tranches that receive principal according to rules. CMOs **do not eliminate** prepayment risk; they **redistribute** it.
- **Sequential-pay:** tranche A receives all principal until it is retired, then tranche B, and so on. Early tranches have short lives and bear more contraction risk; later tranches bear more extension risk.
- **PAC and support:** a planned amortisation class (PAC) tranche follows a fixed principal schedule as long as prepayments stay within a band (for example, 100-300 PSA). The **support** tranche absorbs the excess or shortfall, so it carries most of the prepayment risk and offers a higher yield.
- **Floaters and inverse floaters** can be carved from a fixed-rate tranche to suit investors with different rate views.

### Commercial MBS
CMBS are backed by loans on income-producing property. These loans are often **non-recourse**, so credit analysis focuses on the property's **debt service coverage ratio** and **loan-to-value ratio**. Commercial loans carry **call protection** through prepayment lockouts, defeasance, prepayment penalties or yield maintenance charges, so prepayment risk is much smaller. The bigger risk is **balloon risk**: the borrower may be unable to refinance the large final payment, which extends the loan.

### Non-mortgage ABS
- **Auto loan ABS** are amortising: each payment includes interest, scheduled principal and some prepayments, much like a small mortgage pool.
- **Credit card ABS** are non-amortising. During a **lockout (revolving) period**, principal collections buy new receivables instead of paying down bonds. **Early amortisation triggers**, such as a collapse in excess spread, force repayment to begin early and protect investors.

## Worked example
A borrower takes a USD 300,000, 30-year mortgage at 6% (monthly payments). The monthly payment is USD 1,798.65. In month 1, interest = 300,000 × 0.005 = USD 1,500.00 and scheduled principal = USD 298.65.

Now consider a pass-through pool with a beginning balance of USD 250,000,000 and scheduled principal of USD 400,000 this month. The pool prepays at 6% CPR.

**Step 1 - SMM.** SMM = 1 − (1 − 0.06)^(1/12) = 0.5143%.

**Step 2 - balance available to prepay.** 250,000,000 − 400,000 = USD 249,600,000.

**Step 3 - prepayment.** 0.005143 × 249,600,000 = **USD 1,283,696**.

**Step 4 - total principal to investors.** 400,000 + 1,283,696 = USD 1,683,696. In a sequential-pay CMO, all of it would go to tranche A.

**Step 5 - PSA check.** At 150 PSA in month 12, CPR = 1.5 × (0.2% × 12) = 3.6%, so SMM = 0.3051%. In month 40, CPR = 1.5 × 6% = 9.0%.

## Common exam traps
- Applying SMM to the beginning balance instead of the balance after scheduled principal.
- Dividing CPR by 12 to get SMM. The correct conversion is 1 − (1 − CPR)^(1/12).
- Saying CMOs reduce the pool's prepayment risk. They reallocate it, mostly to support tranches.
- Mixing up the two risks: falling rates mean contraction risk; rising rates mean extension risk.
- Assuming CMBS have the same prepayment risk as residential MBS. Call protection limits it; balloon risk dominates.

## Key takeaways
- The borrower's prepayment option gives MBS negative convexity, plus contraction and extension risk.
- SMM = 1 − (1 − CPR)^(1/12); 100 PSA ramps CPR to 6% by month 30.
- Pass-throughs share all cash flows pro rata; the pass-through rate is below WAC because of fees.
- Sequential and PAC/support CMOs redistribute prepayment risk; support tranches absorb most of it.
- CMBS have call protection but balloon risk; credit card ABS revolve during a lockout period, while auto ABS amortise.
