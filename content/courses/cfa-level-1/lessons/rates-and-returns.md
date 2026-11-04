---
title: "Interest Rates, Returns and Their Measurement"
---

## Learning goals
- Explain an interest rate as the sum of a real risk-free rate and a set of risk premiums.
- Calculate holding period returns and compare arithmetic, geometric and harmonic means.
- Calculate and contrast money-weighted and time-weighted rates of return.
- Annualise returns measured over periods shorter or longer than one year.

## Explanation

### What an interest rate is made of
An interest rate is the price of moving money through time. Lenders ask to be paid for waiting, for losing purchasing power, and for the extra risks they carry. A useful decomposition is:

$$
r \approx r_{real} + \pi^{e} + DP + LP + MP
$$

where $r_{real}$ is the real risk-free rate (pure time preference), $\pi^{e}$ is expected inflation, $DP$ is the default risk premium, $LP$ is the liquidity premium and $MP$ is the maturity premium. The real risk-free rate plus expected inflation gives the nominal risk-free rate, roughly what a short-term government bill pays. Every premium on top of that compensates for a specific risk.

### Holding period return
The basic building block is the holding period return (HPR) over any interval:

$$
HPR = \frac{P_1 - P_0 + D_1}{P_0}
$$

where $P_0$ is the starting price, $P_1$ the ending price and $D_1$ any income received. Returns for consecutive periods are linked by multiplying growth factors: $(1+R_1)(1+R_2)\cdots(1+R_T) - 1$.

### Three ways to average returns
The **arithmetic mean** $\bar{R} = \frac{1}{T}\sum R_t$ is the best estimate of a single future period's return. The **geometric mean** is the constant compound rate that reproduces the actual ending wealth:

$$
R_G = \left[\prod_{t=1}^{T}(1+R_t)\right]^{1/T} - 1
$$

Because volatility drags down compounding, the geometric mean is always at or below the arithmetic mean, and the gap widens as returns become more variable. The **harmonic mean** $X_H = n / \sum (1/X_i)$ appears when you invest a fixed amount of money at varying prices (cost averaging): it gives the average cost per share, which is below the arithmetic average price. For positive values, harmonic ≤ geometric ≤ arithmetic.

### Money-weighted versus time-weighted returns
The **money-weighted return (MWR)** is the internal rate of return of the investor's own cash flows: deposits are outflows, withdrawals and the ending value are inflows. It answers "how did *my* money do?" and is sensitive to the timing and size of contributions.

The **time-weighted return (TWR)** strips out the effect of external cash flows. You break the horizon into sub-periods at each cash flow, compute each sub-period HPR, then chain-link them and take the geometric mean if the horizon exceeds a year. Because a manager rarely controls when clients add or withdraw money, TWR is the industry standard for judging managers.

### Annualising
To convert a return earned over a period of $t$ years (or a fraction of a year) into an annual compound rate:

$$
R_{annual} = (1 + R_{period})^{1/t} - 1
$$

So a quarterly return is compounded four times: $(1+R_q)^4 - 1$. Do not simply multiply or divide unless the question explicitly asks for a simple (non-compounded) rate.

## Worked example
An investor buys 10 shares at USD 100 at time 0 (outflow 1,000). At the end of year 1 the price is USD 120 and she buys 10 more shares (outflow 1,200). At the end of year 2 the price is USD 115 and she sells all 20 shares (inflow 2,300). No dividends are paid.

**Time-weighted return**

Step 1 - sub-period HPRs: year 1 is $120/100 - 1 = 20.00\%$; year 2 is $115/120 - 1 = -4.17\%$.

Step 2 - chain-link: $1.20 \times 0.95833 = 1.15$.

Step 3 - annualise over two years: $1.15^{1/2} - 1 = 7.24\%$.

**Money-weighted return**

Solve for $r$ in:

$$
-1{,}000 - \frac{1{,}200}{1+r} + \frac{2{,}300}{(1+r)^2} = 0
$$

At $r = 4\%$ the left side is $-27.37$; at $r = 5\%$ it is $-56.69$, so the root is below 4%. Solving precisely (calculator IRR with CF0 = -1,000, CF1 = -1,200, CF2 = 2,300) gives $r = 3.10\%$.

**TWR = 7.24% per year; MWR = 3.10% per year.** The MWR is lower because the investor put more money in just before the weaker second year. The manager's skill is captured by the TWR; the investor's poor timing shows up only in the MWR.

## Common exam traps
- Using the arithmetic mean to describe multi-year compound performance. Ending wealth is driven by the geometric mean.
- Annualising a quarterly return by multiplying by 4, or an 18-month return by dividing by 1.5, instead of compounding with the exponent $1/t$.
- Getting cash-flow signs wrong in the MWR: deposits are negative from the investor's point of view, and the ending value is positive.
- Forgetting to split the TWR at every external cash flow date, even if the cash flow is a withdrawal.
- Choosing MWR to evaluate a manager who does not control client contributions.

## Key takeaways
- A nominal rate is the real risk-free rate plus expected inflation plus premiums for default, liquidity and maturity risk.
- Link returns by multiplying growth factors, never by adding them.
- Harmonic ≤ geometric ≤ arithmetic mean; the geometric mean measures realised compound growth.
- MWR is the IRR of the investor's cash flows and reflects timing decisions.
- TWR chain-links sub-period returns and is the standard for evaluating managers.
- Annualise with $(1+R)^{1/t} - 1$, where $t$ is the period length in years.
