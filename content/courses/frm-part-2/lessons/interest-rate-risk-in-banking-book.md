---
title: "Interest Rate Risk in the Banking Book"
---

## Learning goals
- Identify the four sources of interest rate risk in the banking book (IRRBB): repricing, yield curve, basis and option risk.
- Calculate the change in net interest income (NII) from a repricing gap schedule.
- Calculate the change in economic value of equity (EVE) using durations.
- Explain the Basel shock scenarios, the outlier test and why the NII and EVE perspectives can disagree.

## Explanation

### Why the banking book is different
Trading book positions are marked to market daily and covered by market risk capital. The **banking book** - loans, deposits, bonds held to maturity, wholesale funding - is mostly held at amortised cost, so rate changes do not show up immediately in profit. They show up slowly through net interest income and silently in the economic value of the balance sheet. That is why IRRBB needs its own measurement framework.

### Four sources of IRRBB
- **Repricing (gap) risk** - assets and liabilities reprice at different times. A bank funding 5-year fixed mortgages with 3-month deposits loses when rates rise.
- **Yield curve risk** - non-parallel moves (steepening, flattening, twists) hit positions at different maturities differently.
- **Basis risk** - instruments that reprice at the same time but off different indices (a loan on prime, funding on SOFR) do not move one-for-one.
- **Option risk** - automatic options (caps, floors) and **behavioural options**: borrowers prepay mortgages when rates fall; depositors withdraw or switch to higher-paying accounts when rates rise.

### The earnings perspective: repricing gap
Assets and liabilities are sorted into time buckets by their next repricing date. For each bucket:

$$
\text{Gap}_i = \text{RSA}_i - \text{RSL}_i
$$

where RSA and RSL are rate-sensitive assets and liabilities repricing in bucket $i$. Over a one-year horizon, a parallel shock $\Delta r$ changes NII by approximately:

$$
\Delta \text{NII} \approx \sum_i \text{Gap}_i \times \Delta r \times (1 - t_i)
$$

where $t_i$ is the bucket's midpoint in years: a position repricing at month 3 earns the new rate for only the remaining 9 months. A cruder version multiplies the cumulative one-year gap by $\Delta r$. A **negative gap** (liability-sensitive) loses NII when rates rise; a positive gap gains.

### The economic value perspective: EVE
EVE is the present value of asset cash flows minus the present value of liability cash flows. Using modified durations:

$$
\Delta \text{EVE} \approx -\left(D_A \, A - D_L \, L\right) \Delta y
$$

where $A$ and $L$ are the values of assets and liabilities, $D_A$ and $D_L$ their modified durations and $\Delta y$ the parallel yield change. Equivalently, the **duration gap** is $D_A - (L/A) D_L$. Because banks usually hold longer-duration assets than liabilities, rising rates reduce EVE.

### NII versus EVE
The two perspectives answer different questions. NII looks at the next one to three years of earnings; EVE captures the value of all future cash flows. A bank that locks in long fixed-rate assets may have stable NII in the short run yet large EVE sensitivity - and hedging one can worsen the other. Supervisors require both.

### Regulatory framework
Supervisors expect banks to measure IRRBB under **six prescribed shock scenarios**: parallel up, parallel down, steepener, flattener, short rates up and short rates down, with shock sizes calibrated by currency. A bank is flagged as an **outlier** if its worst-case decline in EVE exceeds **15% of Tier 1 capital** (an NII-based outlier test also applies). **Non-maturity deposits** are split into stable "core" balances, which can be slotted into longer buckets subject to caps, and non-core balances treated as overnight. Banks also use internal models and stress tests beyond the supervisory scenarios.

## Worked example
**Part A - NII.** A bank's repricing schedule (USD million):

| Bucket | Midpoint | RSA | RSL | Gap |
|---|---|---|---|---|
| 0-3 months | 1.5 m | 400 | 700 | -300 |
| 3-6 months | 4.5 m | 300 | 200 | +100 |
| 6-12 months | 9 m | 250 | 350 | -100 |

Rates rise by 100 bp.
1. Bucket 1: $-300 \times 0.01 \times (10.5/12) = -2.625$.
2. Bucket 2: $+100 \times 0.01 \times (7.5/12) = +0.625$.
3. Bucket 3: $-100 \times 0.01 \times (3/12) = -0.25$.
4. Total: $\Delta\text{NII} =$ **-USD 2.25 million**.

The crude cumulative-gap method gives $-300 \times 0.01 = -3.0$, overstating the hit because it assumes everything reprices on day one.

**Part B - EVE.** Assets 1,000 with modified duration 2.0; liabilities 920 with duration 1.6; EVE 80; Tier 1 capital 80. Rates rise by 200 bp.
1. $D_A A = 2{,}000$; $D_L L = 1{,}472$.
2. $\Delta\text{EVE} = -(2{,}000 - 1{,}472) \times 0.02 = -10.56$.
3. As a share of Tier 1: $10.56 / 80 = 13.2\%$.

EVE falls by **USD 10.56 million, 13.2% of Tier 1 - below the 15% outlier threshold**, but close enough to warrant attention.

## Common exam traps
- Getting the sign wrong: a negative gap loses NII when rates rise, gains when they fall.
- Forgetting to scale by the remaining fraction of the year when using bucket midpoints.
- Computing the duration gap as $D_A - D_L$ without weighting liabilities by $L/A$.
- Assuming stable NII means low IRRBB; EVE can still be highly sensitive.
- Treating non-maturity deposits as all overnight or all long-term; behavioural core/non-core splitting is required.

## Key takeaways
- IRRBB arises from repricing, yield curve, basis and option risk in non-traded positions.
- The earnings view uses repricing gaps: $\Delta\text{NII} \approx \sum \text{Gap}_i \Delta r (1 - t_i)$.
- The economic value view uses durations: $\Delta\text{EVE} \approx -(D_A A - D_L L)\Delta y$.
- NII and EVE can point in different directions, so both are measured.
- Six supervisory shocks and a 15%-of-Tier-1 EVE outlier test anchor the regulatory framework.
