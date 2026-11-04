---
title: "Backtesting a Simple Trading Strategy"
---

## Learning goals
- Build a vectorised moving-average crossover backtest in pandas.
- Lag signals correctly and deduct transaction costs.
- Calculate CAGR, volatility, Sharpe ratio and maximum drawdown.
- Identify look-ahead bias, overfitting and other traps that make backtests look better than reality.

## Explanation

### What a backtest is (and is not)
A backtest replays a trading rule on historical data to see how it would have performed. It is a hypothesis test, not a promise: a good backtest tells you a rule is *not obviously broken*. Most of the craft is in avoiding the many ways a backtest can flatter a strategy.

### The strategy
The classic trend-following rule compares a fast and a slow simple moving average (SMA): be long when the 50-day SMA is above the 200-day SMA, otherwise hold cash. In pandas, `rolling(n).mean()` gives the SMA and the comparison produces a 0/1 signal.

### The golden rule: lag the signal
The signal is computed from today's closing price, so the earliest you can act on it is the next day. The strategy return on day $t$ is therefore

$$
R^{\text{strat}}_t = \text{pos}_{t-1}\, R_t - c\,\lvert \text{pos}_{t-1} - \text{pos}_{t-2} \rvert
$$

where $\text{pos}_{t-1}$ is the position decided at yesterday's close (1 = long, 0 = cash), $R_t$ the asset's simple return today and $c$ the cost per unit of turnover. In code, `signal.shift(1)` is the one line that prevents **look-ahead bias**.

### Performance metrics
With $W_T$ the final wealth per unit invested and $Y$ the number of years:

$$
\text{CAGR} = W_T^{1/Y} - 1, \qquad \text{Sharpe} = \frac{\bar{R}}{s_R}\sqrt{252}, \qquad \text{MaxDD} = \min_t\left(\frac{W_t}{\max_{u \le t} W_u} - 1\right)
$$

where $\bar{R}$ and $s_R$ are the mean and standard deviation of daily strategy returns (risk-free rate taken as zero for simplicity). Maximum drawdown is the worst peak-to-trough fall; `wealth.cummax()` tracks the running peak.

### The code
Ten years of synthetic daily prices (independent normal returns, so there is no real trend to find), a 10-basis-point cost per trade, and a 200-day warm-up period dropped before measuring performance.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(1)
dates = pd.bdate_range("2016-01-01", periods=2520)        # about 10 years
ret = rng.normal(0.0003, 0.011, len(dates))
price = pd.Series(100 * np.exp(np.cumsum(ret)), index=dates)

fast, slow, cost = 50, 200, 0.0010                          # 10 bp per trade
df = pd.DataFrame({"price": price})
df["ret"] = df["price"].pct_change()
df["signal"] = (df["price"].rolling(fast).mean() >
                df["price"].rolling(slow).mean()).astype(int)
df["position"] = df["signal"].shift(1).fillna(0)            # trade next day
df["trades"] = df["position"].diff().abs().fillna(0)
df["strat"] = df["position"] * df["ret"] - df["trades"] * cost
df = df.iloc[slow:]                                         # drop warm-up period

def metrics(r):
    wealth = (1 + r).cumprod()
    years = len(r) / 252
    cagr = wealth.iloc[-1] ** (1 / years) - 1
    vol = r.std() * np.sqrt(252)
    sharpe = r.mean() / r.std() * np.sqrt(252)               # rf assumed 0
    max_dd = (wealth / wealth.cummax() - 1).min()
    return pd.Series({"CAGR": cagr, "Vol": vol, "Sharpe": sharpe, "MaxDD": max_dd})

report = pd.DataFrame({"Buy&Hold": metrics(df["ret"]), "MA 50/200": metrics(df["strat"])})
print(report.round(4))
print("Round-trip trades:", int(df["trades"].sum() // 2), "| time in market:",
      round(df["position"].mean(), 3))

# Look-ahead bias demo: "be long on up days" with and without the shift
up = (df["ret"] > 0).astype(int)
print("Sharpe, same-day signal (biased):", round(metrics(up * df["ret"])["Sharpe"], 2))
print("Sharpe, signal shifted one day:  ", round(metrics(up.shift(1).fillna(0) * df["ret"])["Sharpe"], 2))
print("Sharpe, MA strategy without shift:", round(metrics(df["signal"] * df["ret"])["Sharpe"], 4))
```

Output:

```
        Buy&Hold  MA 50/200
CAGR      0.0612     0.0569
Vol       0.1762     0.1388
Sharpe    0.4251     0.4683
MaxDD    -0.3899    -0.3350
Round-trip trades: 7 | time in market: 0.598
Sharpe, same-day signal (biased): 10.99
Sharpe, signal shifted one day:   0.57
Sharpe, MA strategy without shift: 0.4958
```

### Reading the results
- The MA strategy spends about 60% of the time invested, which lowers volatility (13.9% vs 17.6%) and maximum drawdown (−33.5% vs −39.0%), while CAGR is slightly lower (5.69% vs 6.12%).
- Its Sharpe ratio is a little higher (0.47 vs 0.43). But these returns were generated as independent random draws, so there is no trend to exploit: the small edge is luck. That is the most important lesson in backtesting. One run on one history cannot separate skill from noise.
- The same-day "long on up days" rule shows a Sharpe of 10.99, an impossible number that comes purely from using today's return to decide today's position. Shifted by one day it drops to 0.57, which again is just noise. For the slow MA rule the bias is smaller (0.4958 vs 0.4683) because the signal rarely changes, but it is still there.

### Other biases to check
- **Overfitting / data snooping:** trying many parameter pairs and reporting the best. Hold out data you never touch while tuning, or use walk-forward testing.
- **Survivorship bias:** testing only on assets that still exist today ignores those that went bust.
- **Unrealistic costs and fills:** ignoring spreads, slippage, borrowing costs or the fact that you cannot trade at the same close that generated the signal.
- **Warm-up periods:** including days before the slow SMA exists treats an undefined signal as a decision.

## Worked example
Compute drawdowns for a short wealth path (100, 120, 90, 110, 130, 117), plus a Sharpe ratio and CAGR from summary numbers.

```python
import numpy as np
import pandas as pd

wealth = pd.Series([100, 120, 90, 110, 130, 117])
dd = wealth / wealth.cummax() - 1
print(dd.round(4).tolist())
print("Max drawdown:", round(dd.min(), 4))
print("Sharpe (mean 0.04%, sd 1% daily):", round(0.0004 / 0.01 * np.sqrt(252), 4))
print("CAGR (1.80x over 10 years):", round(1.80 ** (1 / 10) - 1, 4))
```

```
[0.0, 0.0, -0.25, -0.0833, 0.0, -0.1]
Max drawdown: -0.25
Sharpe (mean 0.04%, sd 1% daily): 0.635
CAGR (1.80x over 10 years): 0.0605
```

1. Running peaks: 100, 120, 120, 120, 130, 130.
2. Drawdowns: 0, 0, 90/120 − 1 = −25.00%, 110/120 − 1 = −8.33%, 0, 117/130 − 1 = −10.00%.
3. Maximum drawdown = **−25.00%** (from the 120 peak to the 90 trough). Note that the later 10% fall does not count, because it is measured from a new peak.
4. Sharpe: daily mean 0.04% and daily standard deviation 1%: 0.0004 / 0.01 × √252 = 0.04 × 15.875 = **0.635**.
5. CAGR: wealth grows 1.80× over 10 years: 1.80^(1/10) − 1 = **6.05% a year** (not 80% / 10 = 8%).

## Common exam traps
- Forgetting `shift(1)`, which lets the strategy trade on information it could not yet have.
- Computing CAGR as total return divided by years instead of the geometric rate.
- Measuring drawdown from the starting value rather than from the running peak.
- Ignoring transaction costs, which can turn a high-turnover strategy from profitable to losing.
- Treating a single favourable backtest as proof; test across periods, assets and parameter choices.

## Key takeaways
- A vectorised backtest is a few pandas columns: signal, lagged position, trades, strategy return.
- Always lag the signal and charge costs on position changes.
- Report CAGR, volatility, Sharpe and maximum drawdown together, against a buy-and-hold benchmark.
- Look-ahead bias can manufacture spectacular but fake results.
- Synthetic data with no edge is a powerful check: any "alpha" you find there is noise.
