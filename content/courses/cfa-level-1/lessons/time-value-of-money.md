---
title: "Time Value of Money in Finance"
---

## Learning goals
- Calculate future and present values of single sums under different compounding frequencies.
- Calculate present and future values of ordinary annuities, annuities due and perpetuities.
- Value growing perpetuities and apply them to price shares.
- Solve for an implied rate of return or growth rate from prices and cash flows.

## Explanation

### One idea behind everything
Money today is worth more than the same money later, because today's money can be invested at the rate $r$. Every valuation in this course moves cash flows to a common date using that rate. Compounding moves money forward; discounting moves it back. Building on the previous lesson, $r$ is the required return that already includes inflation and risk premiums.

### Single sums
$$
FV_N = PV(1+r)^N \qquad PV = \frac{FV_N}{(1+r)^N}
$$

where $N$ is the number of periods and $r$ the rate per period. With $m$ compounding periods per year and a stated annual rate $r_s$, use $r_s/m$ per period and $mN$ periods. The **effective annual rate** makes different frequencies comparable:

$$
EAR = \left(1 + \frac{r_s}{m}\right)^m - 1 \qquad EAR_{continuous} = e^{r_s} - 1
$$

A stated 8% compounded monthly is an EAR of 8.30%; compounded continuously it is 8.33%. More frequent compounding always raises the EAR, but with diminishing effect.

### Annuities
An **ordinary annuity** pays a level amount $A$ at the end of each of $N$ periods:

$$
PV = A\left[\frac{1 - (1+r)^{-N}}{r}\right] \qquad FV = A\left[\frac{(1+r)^N - 1}{r}\right]
$$

An **annuity due** pays at the start of each period, so each payment is discounted one period less: multiply the ordinary-annuity value by $(1+r)$. Rent, insurance premiums and retirement withdrawals that begin immediately are typical annuities due.

### Perpetuities
A level perpetuity pays $A$ forever, starting one period from now: $PV = A/r$. A **growing perpetuity** whose first payment is $C_1$ and grows at $g < r$:

$$
PV_0 = \frac{C_1}{r - g}
$$

Applied to shares this is the constant-growth dividend model, $P_0 = D_1/(r-g)$, where $D_1 = D_0(1+g)$ is next year's dividend. A preferred share paying a fixed dividend is valued as a level perpetuity.

For a **deferred** perpetuity whose first payment arrives at time $t$, the formula $A/r$ gives value at time $t-1$, so discount that amount back $t-1$ periods.

### Implied returns and growth rates
If you know the price and the cash flows, rearrange to find the rate. For a single sum, $r = (FV/PV)^{1/N} - 1$. For a growing perpetuity, the implied required return is $r = D_1/P_0 + g$: dividend yield plus growth. Equivalently the implied growth is $g = r - D_1/P_0$.

### Cash-flow additivity
Present values at the same date can be added. This lets you split any irregular stream into pieces you know how to value, and it is the reason a bond is simply an annuity (coupons) plus a single sum (principal).

## Worked example
A 40-year-old wants to withdraw USD 40,000 a year for 20 years, with the first withdrawal on her 65th birthday. She will make 25 equal year-end deposits, the last one on her 65th birthday. All money earns 6% a year.

**Step 1 - value the withdrawals at age 65.** They start immediately, so they form an annuity due.

$$
PV_{65} = 40{,}000\left[\frac{1 - 1.06^{-20}}{0.06}\right](1.06)
$$

The ordinary-annuity value is 458,796.85. Multiplying by 1.06 gives 486,324.66.

**Step 2 - find the deposit that grows to that amount.** The deposits are an ordinary annuity whose future value at 65 must equal 486,324.66.

$$
FV\ factor = \frac{1.06^{25} - 1}{0.06} = 54.8645
$$

**Step 3 - solve for the payment.** $A = 486{,}324.66 / 54.8645 = 8{,}864.10$.

She must deposit **USD 8,864.10 per year**. Calculator check: N = 25, I/Y = 6, PV = 0, FV = 486,324.66, CPT PMT.

## Common exam traps
- Treating an annuity due as an ordinary annuity. If the first payment is today, multiply by $(1+r)$ or switch the calculator to BGN mode (and switch it back).
- Discounting a deferred perpetuity by $t$ periods instead of $t-1$. The formula $A/r$ already places value one period before the first payment.
- Using $D_0$ instead of $D_1$ in the constant-growth model.
- Mixing an annual rate with monthly periods: when compounding is monthly, divide the rate by 12 and multiply $N$ by 12.
- Comparing stated rates with different compounding frequencies instead of comparing EARs.

## Key takeaways
- All valuation is moving cash flows to a common date at the appropriate rate.
- EAR $= (1 + r_s/m)^m - 1$; it is the only fair way to compare rates with different compounding.
- Annuity due value = ordinary annuity value × $(1+r)$.
- Level perpetuity $= A/r$; growing perpetuity $= C_1/(r-g)$, valued one period before its first cash flow.
- Implied required return of a constant-growth share = dividend yield + growth.
- Present values at the same date can be added, so complex streams can be built from simple pieces.
