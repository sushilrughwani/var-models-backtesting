---
title: "NPV, IRR, XNPV and XIRR"
---

## Learning goals
- Calculate net present value in Excel with `NPV`, correctly handling the time-0 cash flow.
- Calculate the internal rate of return with `IRR` and interpret it against a hurdle rate.
- Apply `XNPV` and `XIRR` to cash flows that arrive on irregular dates.
- Explain why NPV and IRR can disagree and which one to trust when they do.
- Diagnose the most common spreadsheet mistakes in project evaluation.

## Explanation

### Net present value: the value a project adds
The previous lesson moved single amounts and level annuities through time. Real projects produce uneven cash flows, so we discount each one separately and add them up. If the sum of the discounted inflows exceeds the upfront cost, the project creates value at the chosen discount rate.

$$
NPV = \sum_{t=0}^{n} \frac{C_t}{(1+r)^t}
$$

Here $C_t$ is the net cash flow at the end of period $t$ (with $C_0$ usually negative), $r$ is the discount rate per period (the cost of capital or hurdle rate) and $n$ is the final period.

### The NPV function's hidden assumption
Despite its name, Excel's `NPV` is really a present-value-of-future-flows function. `=NPV(rate, value1, value2, ...)` treats the first value as arriving one full period from today. So the correct pattern is:

`=NPV(B1, C3:C6) + C2`

where `B1` holds the rate, `C3:C6` the cash flows for years 1 to 4, and `C2` the time-0 investment (a negative number). If you include `C2` inside the range, Excel discounts the investment by one year and every later flow by one year too much, so the result is the true NPV divided by $(1+r)$.

### Internal rate of return
The IRR is the discount rate that makes NPV exactly zero. Excel finds it by trial and error:

`=IRR(C2:C6)`

Unlike `NPV`, `IRR` expects the range to start with the time-0 flow. Accept the project if IRR exceeds the hurdle rate. IRR is popular because a percentage is easy to communicate, but it has weaknesses: when cash flows change sign more than once there can be several IRRs (or none), and for mutually exclusive projects of different size or timing IRR can rank them differently from NPV. NPV measures value in currency, so it wins any conflict.

### Irregular dates: XNPV and XIRR
`NPV` and `IRR` assume equally spaced periods. Real deals rarely cooperate: an acquisition closes mid-January and distributions arrive whenever they arrive. The X-versions take a dates column:

$$
XNPV = \sum_{i=1}^{N} \frac{C_i}{(1+r)^{(d_i - d_1)/365}}
$$

$C_i$ is the cash flow on date $d_i$, $d_1$ is the first date in the list and $r$ is an annual rate. The exponent counts years as actual days divided by 365. Syntax: `=XNPV(rate, values, dates)` and `=XIRR(values, dates)`. Unlike `NPV`, `XNPV` discounts to the first date, so the time-0 flow goes inside the range. `XIRR` returns an annual effective rate, the standard metric in private equity and real estate.

## Worked example
A project costs 100,000 and produces inflows of 30,000, 40,000, 50,000 and 20,000. The hurdle rate in `B1` is 10%. Cash flows sit in `C2:C6`, dates in `D2:D6`.

**Part A - annual timing.**

1. Discount each inflow: 30,000/1.1 = 27,272.73; 40,000/1.1² = 33,057.85; 50,000/1.1³ = 37,565.74; 20,000/1.1⁴ = 13,660.27.
2. Sum of present values: 111,556.59. This is what `=NPV(B1, C3:C6)` returns.
3. Add the investment: `=NPV(B1, C3:C6) + C2` = 111,556.59 − 100,000 = **11,556.59**.
4. `=IRR(C2:C6)` = **15.32%**, comfortably above the 10% hurdle.
5. The mistaken version `=NPV(B1, C2:C6)` gives 10,505.99, which is exactly 11,556.59 / 1.1.

**Part B - actual dates.** The investment is paid on 15 Jan 2026 and the inflows arrive on 30 Sep 2026, 30 Jun 2027, 31 Mar 2028 and 31 Dec 2028.

1. Days from the first date: 0, 258, 531, 806 and 1,081.
2. Year fractions: 0, 0.707, 1.455, 2.208 and 2.962.
3. `=XNPV(B1, C2:C6, D2:D6)` = **18,458.22**.
4. `=XIRR(C2:C6, D2:D6)` = **21.52%**.

The money comes back roughly every nine months instead of every twelve, so the same cash flows are worth more and the return is higher. Using `NPV` and `IRR` here would understate the project by about 6,900.

## Common exam traps
- Putting the time-0 flow inside `NPV`, which understates the answer by a factor of $(1+r)$.
- Forgetting to add the time-0 flow at all, which reports the present value of inflows (111,556.59) as if it were NPV.
- Leaving the investment outside the range in `XNPV` or `IRR`; both expect it as the first value.
- Trusting a single IRR when cash flows switch sign several times, such as a project with a large clean-up cost at the end.
- Feeding `XIRR` dates stored as text; it then returns `#VALUE!`.

## Key takeaways
- NPV is the sum of discounted cash flows; positive NPV means the project beats the hurdle rate.
- Excel's `NPV` starts discounting at period 1, so add the time-0 flow separately.
- `IRR` is the rate where NPV equals zero; compare it with the hurdle rate.
- Use `XNPV` and `XIRR` whenever cash flows are not evenly spaced; they discount by actual days over 365 from the first date.
- When NPV and IRR disagree on mutually exclusive projects, follow NPV.
