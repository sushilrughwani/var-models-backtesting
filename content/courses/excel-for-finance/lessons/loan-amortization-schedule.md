---
title: "Building a Loan Amortization Schedule"
---

## Learning goals
- Build a period-by-period amortization schedule with opening balance, interest, principal and closing balance.
- Calculate the interest and principal in any single period with `IPMT` and `PPMT`.
- Summarise interest paid over a range of periods with `CUMIPMT` and `CUMPRINC`.
- Extend the schedule to handle extra payments and measure the interest saved.
- Use absolute references so one row of formulas can be filled down the whole schedule.

## Explanation

### Why build a schedule at all?
`PMT` from the TVM lesson tells you the level payment, but not what happens inside it. Each payment does two jobs: it pays the interest that accrued on the outstanding balance during the period, and whatever is left over reduces the balance. Early in the loan the balance is large, so interest takes most of the payment. As the balance falls, interest shrinks and the principal share grows. A schedule makes this visible, and lenders, auditors and borrowers all rely on it.

The logic for every row is the same:

$$
\begin{aligned}
I_t &= B_{t-1} \times r \\
P_t &= PMT - I_t \\
B_t &= B_{t-1} - P_t
\end{aligned}
$$

$B_{t-1}$ is the opening balance of period $t$, $r$ the periodic rate (annual rate divided by 12 for monthly loans), $I_t$ the interest for the period, $P_t$ the principal repaid and $B_t$ the closing balance. When the schedule is correct, $B_n$ is exactly zero.

### Laying out the sheet
Put inputs at the top: loan amount in `B1`, annual rate in `B2`, term in years in `B3`, and an optional extra monthly payment in `B6`. Calculate the payment once in `B5` with `=PMT($B$2/12, $B$3*12, -$B$1)`.

Headers in row 8: Period, Opening balance, Interest, Payment, Extra, Principal, Closing balance (columns A to G). Row 9 is period 1:

- `A9`: `1`
- `B9`: `=$B$1`
- `C9`: `=B9*$B$2/12`
- `D9`: `=MIN($B$5, B9+C9)`
- `E9`: `=MIN($B$6, B9+C9-D9)`
- `F9`: `=D9+E9-C9`
- `G9`: `=B9-F9`

Row 10 differs only in two cells: `A10` is `=A9+1` and `B10` is `=G9`. Fill row 10 down for as many periods as the loan has. The dollar signs lock the input cells, so the same formula works on every row. The `MIN` functions stop the final payment from overshooting, which matters once extra payments shorten the loan.

### Single-period functions
You do not need the whole table to answer "how much interest is in payment 12?":

- `=IPMT(rate, per, nper, pv)` returns the interest portion of period `per`.
- `=PPMT(rate, per, nper, pv)` returns the principal portion.
- `=CUMIPMT(rate, nper, pv, start, end, type)` sums interest from period `start` to `end`; `CUMPRINC` does the same for principal.

`IPMT` and `PPMT` follow the usual sign convention. `CUMIPMT` and `CUMPRINC` require a positive `pv`, an explicit `type` and return negative values. Use these as cross-checks against the schedule.

## Worked example
Loan 20,000 at 6% a year, 3 years, monthly payments. Periodic rate = 0.06/12 = 0.005, nper = 36.

**Payment.** `=PMT(0.5%, 36, -20000)` = 608.44.

**First three rows.**

| Period | Opening | Interest | Principal | Closing |
|---|---|---|---|---|
| 1 | 20,000.00 | 100.00 | 508.44 | 19,491.56 |
| 2 | 19,491.56 | 97.46 | 510.98 | 18,980.58 |
| 3 | 18,980.58 | 94.90 | 513.54 | 18,467.04 |

Period 1 interest is 20,000 × 0.005 = 100.00; principal is 608.44 − 100.00 = 508.44; the closing balance is 19,491.56. Period 36 has interest of only 3.03 and principal of 605.41, and closes at zero.

**Single-period checks.** `=IPMT(0.5%, 12, 36, -20000)` = 71.33 and `=PPMT(0.5%, 12, 36, -20000)` = 537.11, which add to the 608.44 payment. The balance after payment 12 is 13,728.12.

**Interest over time.** `=CUMIPMT(0.5%, 36, 20000, 1, 12, 0)` = −1,029.39 for year 1, and periods 13 to 24 give −642.55. Total interest over the loan is 608.44 × 36 − 20,000 = **1,903.79**.

**Extra payments.** Enter 100 in `B6`. The schedule now repays the loan in **31 payments**, the last one only 361.39. Total interest falls to 1,614.55, saving **289.25**. As a check, `=NPER(0.5%, -708.44, 20000)` = 30.51, confirming 31 payments.

## Common exam traps
- Writing `=B9*B2/12` without dollar signs; when filled down, the rate reference drifts to empty cells and interest becomes zero.
- Using the annual rate for monthly interest, which makes interest twelve times too large.
- Linking each opening balance to the original loan instead of the previous closing balance.
- Rounding `NPER` down: 30.51 periods means 31 payments, the last one partial.
- Forgetting that `CUMIPMT` needs a positive `pv` and a `type` argument; omitting either gives an error.

## Key takeaways
- Each payment splits into interest on the opening balance and principal that reduces it.
- Interest falls and principal rises over the life of a level-payment loan.
- One row of formulas with absolute references to inputs can be filled down the entire schedule.
- `IPMT`, `PPMT`, `CUMIPMT` and `CUMPRINC` answer single-period or range questions and cross-check the table.
- Extra payments go straight to principal, shortening the loan and cutting total interest.
- A closing balance of exactly zero in the final period is the schedule's built-in error check.
