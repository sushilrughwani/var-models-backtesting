---
title: "Portfolio Management: An Overview"
---

## Learning goals
- Explain why investors should judge securities by their contribution to a whole portfolio rather than in isolation.
- Quantify how diversification lowers portfolio risk using the diversification ratio.
- Describe the three steps of the portfolio management process.
- Distinguish the main types of investors by time horizon, risk tolerance, liquidity needs and income needs.
- Compare defined benefit and defined contribution pension plans and the main segments of the asset management industry.

## Explanation

### The portfolio approach
A single stock can lose half its value in a bad year, yet a portfolio of fifty stocks rarely does. The reason is that different securities react differently to the same news: when an oil shock hurts airlines, it helps energy producers. Losses in some holdings are partly offset by gains in others. The portfolio approach therefore says an investment should be judged by what it adds to the risk and return of everything you already own, not by its stand-alone risk.

Diversification removes **company-specific (unsystematic) risk** but cannot remove **market-wide (systematic) risk**, because every stock is exposed to recessions and interest-rate changes. Diversification also fails just when it is needed most: in crises, correlations tend to rise toward 1, so the cushion shrinks.

A handy summary statistic is the diversification ratio:

$$
\text{Diversification ratio} = \frac{\sigma_{\text{portfolio}}}{\sigma_{\text{average single security}}}
$$

where $\sigma$ is standard deviation of returns. A ratio of 0.60 means the portfolio carries 60% of the risk of a typical single holding. Lower is better.

For an equally weighted portfolio of $n$ securities with identical standard deviation $\sigma$ and identical pairwise correlation $\rho$:

$$
\sigma_p^2 = \sigma^2\left[\frac{1}{n} + \left(1 - \frac{1}{n}\right)\rho\right]
$$

As $n$ grows, the first term vanishes and $\sigma_p$ falls toward $\sigma\sqrt{\rho}$, the floor set by systematic risk.

### The portfolio management process
1. **Planning** - understand the client's objectives and constraints and write them into an investment policy statement (IPS); form capital market expectations; set a strategic asset allocation.
2. **Execution** - analyse assets, select securities, construct the portfolio and trade it efficiently.
3. **Feedback** - monitor the portfolio and the client's circumstances, rebalance, and measure and report performance.

The process is a loop: feedback changes the plan.

### Types of investors
- **Individuals** - goals such as retirement or education; horizons and risk tolerance vary widely.
- **Defined benefit (DB) pension plans** - the employer promises a specified retirement benefit and bears the investment risk. Long horizons, usually high risk tolerance, liquidity needs depend on how many members are retired.
- **Defined contribution (DC) plans** - the employer contributes a specified amount; the employee chooses investments and bears the investment risk.
- **Endowments and foundations** - very long, often perpetual horizons; spend a fixed percentage each year; relatively high risk tolerance.
- **Banks** - short horizons and low risk tolerance because they must match deposit liabilities; high liquidity needs.
- **Insurance companies** - life insurers have long horizons; property and casualty insurers have shorter horizons and must keep more liquidity because claims are less predictable.
- **Sovereign wealth funds** - government-owned, usually long horizons.

### The asset management industry
Firms can be **buy-side** (managing money) or **sell-side** (brokers and banks serving the buy side). Management can be **active** (trying to beat a benchmark) or **passive** (tracking an index at low cost). Passive investing has gained substantial share, firms are consolidating, and technology is reshaping research and distribution. Pooled vehicles include open-end mutual funds (units created and redeemed at net asset value), closed-end funds (fixed units that trade on an exchange, possibly at a premium or discount), ETFs, hedge funds, private equity and venture capital funds.

## Worked example
Two stocks each have a standard deviation of 30% and a correlation of 0.20. You hold them in equal weights.

Step 1 - portfolio variance:
$0.5^2 \times 0.09 + 0.5^2 \times 0.09 + 2 \times 0.5 \times 0.5 \times 0.20 \times 0.30 \times 0.30 = 0.0225 + 0.0225 + 0.009 = 0.054$.

Step 2 - portfolio standard deviation: $\sqrt{0.054} = 0.2324$, or 23.24%.

Step 3 - diversification ratio: $23.24\% / 30\% = 0.775$.

Step 4 - extend to 10 stocks with the same properties: $\sigma_p^2 = 0.09 \times (0.10 + 0.90 \times 0.20) = 0.0252$, so $\sigma_p = 15.87\%$ and the ratio is about 0.53.

Step 5 - the floor as $n \to \infty$: $0.30 \times \sqrt{0.20} = 13.42\%$.

**Two stocks cut risk to 23.24% (ratio 0.775); ten stocks to 15.87%; no amount of diversification takes it below 13.42%.**

## Common exam traps
- Saying diversification eliminates all risk - it removes only unsystematic risk.
- Mixing up DB and DC plans: in a DB plan the **employer** bears investment risk; in a DC plan the **employee** does.
- Assuming banks have long horizons and high risk tolerance - their liabilities are short-term deposits.
- Forgetting that diversification benefits shrink in market crises because correlations rise.
- Confusing closed-end funds (trade at market price, can deviate from NAV) with open-end funds (transact at NAV).

## Key takeaways
- Evaluate each investment by its contribution to the total portfolio.
- Diversification lowers risk whenever correlation is below 1; the diversification ratio measures the benefit.
- Systematic risk sets a floor that diversification cannot break.
- The process runs planning, execution and feedback, in a continuous loop.
- Investor type drives horizon, risk tolerance and liquidity needs.
- DB plans put the risk on the employer; DC plans put it on the employee.
