---
title: "Topics in Long-Term Liabilities and Equity"
---

## Learning goals
- Calculate the issue price, interest expense and carrying amount of a bond issued at a discount or premium using the effective interest method.
- Explain how a lessee records a lease liability and right-of-use (ROU) asset, and contrast finance and operating lease expense patterns.
- Describe the funded status of a defined benefit pension plan and how it appears on the balance sheet.
- Assess how these liabilities affect leverage, coverage and cash flow ratios.

## Explanation

### Bonds payable: the effective interest method
When a company issues a bond, it receives the present value of the promised cash flows discounted at the **market rate** on the issue date. If the coupon rate is below the market rate, the bond sells at a **discount**; if above, at a **premium**.

$$
P_0 = \sum_{t=1}^{N} \frac{C}{(1+r)^t} + \frac{F}{(1+r)^N}
$$

where $C$ is the coupon payment, $F$ the face value, $r$ the market rate at issue, and $N$ the number of periods.

Each period, **interest expense** equals the opening carrying amount times the market rate at issue, not the coupon. The gap between expense and the coupon paid is amortisation: for a discount bond, expense exceeds the coupon and the carrying amount climbs toward face value.

$$
\text{Interest expense}_t = \text{Carrying amount}_{t-1} \times r
$$

Two reporting notes: the coupon paid is the cash outflow (classified as operating under US GAAP; operating or financing under IFRS), and later changes in market rates do not change the carrying amount unless the company elects fair value.

### Leases from the lessee's side
Both IFRS and US GAAP put almost every lease longer than 12 months on the balance sheet. At commencement the lessee records a **lease liability** equal to the present value of lease payments, and an **ROU asset** of the same amount (plus any initial direct costs or prepayments).

$$
L_0 = \sum_{t=1}^{N} \frac{\text{Payment}}{(1+k)^t}
$$

where $k$ is the rate implicit in the lease or, if unknown, the lessee's incremental borrowing rate.

What differs is the income statement:
- **IFRS (single model)** and **US GAAP finance leases:** the ROU asset is depreciated (usually straight-line) and interest is charged on the liability. Total expense is front-loaded because interest is highest early on. The principal part of each payment is a financing outflow.
- **US GAAP operating leases:** one **straight-line lease cost** is reported in operating expenses, and the full payment is an operating cash outflow. The ROU asset is reduced by a plug so total expense stays level.

### Defined benefit pensions
In a defined benefit plan the employer promises a future benefit, so it bears the investment and longevity risk. The key figure is **funded status**:

$$
\text{Funded status} = \text{Fair value of plan assets} - \text{Defined benefit obligation}
$$

A negative number is a net pension liability; a positive number is a net pension asset (subject to a ceiling under IFRS). Under IFRS, service cost and net interest go to profit or loss while remeasurements go to other comprehensive income (OCI). US GAAP also routes some components through OCI but amortises them into income over time.

### Why analysts care
Leases and underfunded pensions are debt-like obligations. Capitalising leases raises total assets and liabilities, increasing debt-to-equity and lowering asset turnover. Under IFRS, EBITDA rises because lease costs become depreciation and interest, while operating cash flow rises because principal moves to financing.

## Worked example
**Part A - Bond.** A company issues a 5-year, annual-pay bond with face value 1,000,000 and a 5% coupon when the market rate is 6%.

1. Coupon = 1,000,000 × 5% = 50,000.
2. Price = PV of five 50,000 coupons + PV of 1,000,000 at 6% = 957,876.36 (a discount of 42,123.64).
3. Year 1 interest expense = 957,876.36 × 6% = 57,472.58.
4. Discount amortised = 57,472.58 − 50,000 = 7,472.58.
5. End of Year 1 carrying amount = 957,876.36 + 7,472.58 = **965,348.94**.

**Part B - Lease.** The same company leases equipment for 5 years, paying 100,000 at each year-end. The discount rate is 7%.

1. Lease liability = PV of five payments of 100,000 at 7% = 410,019.74; ROU asset = 410,019.74.
2. Year 1 interest = 410,019.74 × 7% = 28,701.38.
3. Liability at end of Year 1 = 410,019.74 + 28,701.38 − 100,000 = 338,721.13.
4. Finance lease (IFRS or US GAAP): depreciation = 410,019.74 ÷ 5 = 82,003.95, so total Year 1 expense = 82,003.95 + 28,701.38 = **110,705.33**.
5. US GAAP operating lease: single lease cost = **100,000** each year.

The finance lease shows 10,705.33 more expense in Year 1, but the total over five years is the same 500,000 under both models.

## Common exam traps
- Computing bond interest expense with the coupon rate. Use the market rate at issue times the opening carrying amount.
- Assuming a discount bond's carrying amount falls over time. It rises toward face value; a premium bond's falls.
- Forgetting that US GAAP keeps the operating/finance distinction for lessees while IFRS uses one model for lessees.
- Thinking an operating lease stays off the balance sheet. Under current rules both a liability and an ROU asset are recognised.
- Treating a net pension asset or liability as the gross obligation. The balance sheet shows the net funded status.

## Key takeaways
- Bond interest expense = opening carrying amount × market rate at issue; the carrying amount converges to face value.
- Lessees record a lease liability and ROU asset at the PV of lease payments.
- Finance leases (and all IFRS lessee leases) produce front-loaded expense split into depreciation and interest; US GAAP operating leases produce a level single cost.
- Funded status = plan assets − obligation; a deficit is a debt-like liability.
- Lease and pension obligations raise leverage ratios and should be included in an analyst's view of total debt.
