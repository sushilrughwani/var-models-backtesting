---
title: "Equity Valuation: Concepts and Dividend Discount Models"
---

## Learning goals
- Compare intrinsic value with market price and decide whether a share looks undervalued, overvalued or fairly valued.
- Distinguish present value, multiplier and asset-based valuation models.
- Value preferred shares and common shares with the Gordon growth model.
- Value a share with a two-stage dividend discount model.
- Estimate the sustainable growth rate from ROE and the retention ratio.

## Explanation

### Intrinsic value versus price
Valuation estimates **intrinsic value**: what a share is worth given its expected cash flows and risk. If your estimate is above the market price, the share looks undervalued; below, overvalued. Before acting, ask how confident you are in the model and inputs, and whether the market may know something you do not. Small gaps are usually within estimation error.

There are three broad model families:
- **Present value (discounted cash flow) models** discount expected future cash flows: dividends, or free cash flow to equity.
- **Multiplier models** apply a ratio such as P/E or EV/EBITDA (next lesson).
- **Asset-based models** value assets minus liabilities (next lesson).

### The dividend discount model
From a shareholder's viewpoint, the cash received is dividends (plus the eventual sale price, which itself reflects later dividends). So value is the present value of all future dividends:

$$
V_0 = \sum_{t=1}^{\infty} \frac{D_t}{(1+r)^t}
$$

where $D_t$ is the dividend in year $t$ and $r$ is the required return on equity (cost of equity). DDMs suit firms that pay dividends linked to earnings, such as mature, profitable companies. For firms that pay little or nothing, **free cash flow to equity** (cash available after operating expenses, reinvestment and net borrowing) can be discounted instead.

### Preferred shares
A non-callable, non-convertible preferred share with a fixed dividend $D_p$ is a perpetuity:

$$
V_0 = \frac{D_p}{r_p}
$$

where $r_p$ is the required return on the preferred share.

### Gordon (constant) growth model
If dividends grow forever at a constant rate $g$ below $r$:

$$
V_0 = \frac{D_1}{r - g} = \frac{D_0(1+g)}{r - g}
$$

Value is very sensitive to $r - g$: a small change in either input moves value a lot. The model only works when $r > g$, and $g$ must be a long-run rate no higher than nominal economic growth.

Where does $g$ come from? The **sustainable growth rate** is

$$
g = b \times \text{ROE}
$$

where $b$ is the retention ratio (1 − payout ratio). Retained earnings reinvested at ROE grow the equity base and, with it, earnings and dividends.

### Multistage models
Many firms grow fast now and slow down later. A **two-stage DDM** forecasts dividends explicitly during the high-growth period, then applies the Gordon model at the end of it to get a **terminal value**:

$$
V_0 = \sum_{t=1}^{n} \frac{D_t}{(1+r)^t} + \frac{V_n}{(1+r)^n}, \qquad V_n = \frac{D_{n+1}}{r - g_L}
$$

where $n$ is the length of the high-growth stage and $g_L$ the long-run growth rate. Three-stage models add a transition period.

## Worked example
A company just paid $D_0 = $ USD 2.00. Dividends will grow 12% a year for three years, then 4% forever. The required return is 10%.

1. $D_1 = 2.00 \times 1.12 = 2.2400$; $D_2 = 2.5088$; $D_3 = 2.8099$.
2. $D_4 = 2.8099 \times 1.04 = 2.9223$.
3. Terminal value at year 3: $V_3 = 2.9223/(0.10 - 0.04) = 48.7042$.
4. Present values: $2.2400/1.10 = 2.0364$; $2.5088/1.10^2 = 2.0734$; $2.8099/1.10^3 = 2.1111$. Sum $= 6.2208$.
5. PV of terminal value: $48.7042/1.10^3 = 36.5922$.
6. Intrinsic value $= 6.2208 + 36.5922 =$ **USD 42.81**.

For comparison, assuming 4% growth from today gives only $2.08/0.06 = 34.67$. The three years of fast growth add about USD 8 of value. Note that the terminal value is about 85% of the total, which is why long-run assumptions matter so much. If the shares trade at USD 38, they look undervalued by this model.

## Common exam traps
- Using $D_0$ instead of $D_1$ in the Gordon formula.
- Discounting the terminal value by $n+1$ years instead of $n$; $V_n$ is already a value at time $n$.
- Computing the terminal value with $D_n$ instead of $D_{n+1}$.
- Applying the Gordon model when $g \geq r$, which gives meaningless or negative values.
- Using the payout ratio instead of the retention ratio in $g = b \times \text{ROE}$.

## Key takeaways
- Compare intrinsic value with price, allowing for model and input uncertainty.
- Value = present value of expected dividends at the required return on equity.
- Preferred share value $= D_p/r_p$; Gordon value $= D_1/(r-g)$, valid only if $r > g$.
- Sustainable growth $g = b \times \text{ROE}$.
- Multistage models discount explicit dividends plus a terminal value at the end of the high-growth period.
