---
title: "Backtesting a Simple Trading Strategy"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a strategy with a Sharpe ratio of 11 - what went wrong?
- 02:00 - What a backtest can and cannot tell you
- 04:00 - The 50/200 moving-average rule; building the signal with `rolling().mean()`
- 07:00 - Lagging the signal, trades and transaction costs
- 10:00 - Metrics: CAGR, volatility, Sharpe, maximum drawdown (whiteboard)
- 14:00 - Live code: 10 years of synthetic prices, strategy vs buy-and-hold
- 18:00 - Bias lab: same-day signal vs shifted; overfitting, survivorship, costs
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Backtesting a Simple Trading Strategy
- Replay a rule on history to test it
- Vectorised pandas: no loops
- Most of the skill is avoiding self-deception

### Slide 2: The Rule
- Long when SMA(50) > SMA(200), else cash
- `signal = (p.rolling(50).mean() > p.rolling(200).mean()).astype(int)`
- Drop the 200-day warm-up

### Slide 3: Lag the Signal
- Signal uses today's close → trade tomorrow
- `position = signal.shift(1).fillna(0)`
- Forgetting this = look-ahead bias

### Slide 4: Costs
- `trades = position.diff().abs()`
- Strategy return = position × return − trades × cost
- 10 bp per trade in our example

### Slide 5: Metrics
- CAGR = W^(1/years) − 1
- Sharpe = mean / std × √252
- MaxDD = min(W / W.cummax() − 1)

### Slide 6: Results
- Buy & hold: CAGR 6.12%, vol 17.62%, Sharpe 0.43, MaxDD −38.99%
- MA 50/200: CAGR 5.69%, vol 13.88%, Sharpe 0.47, MaxDD −33.50%
- 7 round trips, invested 60% of the time

### Slide 7: Is the Edge Real?
- Synthetic returns are independent: no trend exists
- The small Sharpe advantage is luck
- One history cannot separate skill from noise

### Slide 8: Look-Ahead Bias Lab
- "Long on up days", same day: Sharpe 10.99
- Shifted one day: 0.57 (noise)
- MA rule without shift: 0.4958 vs 0.4683

### Slide 9: Other Biases
- Overfitting / data snooping → hold-out and walk-forward tests
- Survivorship bias → include dead assets
- Unrealistic fills and costs

### Slide 10: Exam Traps
- Missing `shift(1)`
- Arithmetic CAGR
- Drawdown from start instead of peak

### Slide 11: Key Takeaways
- Signal → lagged position → trades → returns
- Report metrics vs a benchmark
- Be your own harshest critic

## Whiteboard examples
1. **Drawdown.** Wealth 100, 120, 90, 110, 130, 117.
   - Running peak 100, 120, 120, 120, 130, 130.
   - Drawdowns 0, 0, −25.00%, −8.33%, 0, −10.00% → MaxDD −25.00%.
2. **Sharpe and CAGR.** Daily mean 0.04%, sd 1%: Sharpe = 0.04 × √252 = 0.635. Wealth 1.80× in 10 years: CAGR = 1.80^0.1 − 1 = 6.05%.
3. **Costs.** Daily mean 0.05%, sd 0.8%, 20 round trips at 10 bp per side = 0.40% a year.
   - Gross Sharpe = 0.0005 / 0.008 × √252 = 0.99.
   - Net mean = 0.0005 − 0.004/252 = 0.000484 → net Sharpe 0.96.

## Questions to ask students
- Why do we drop the first 200 rows? (The slow SMA is undefined there, so the signal is meaningless)
- What does `position.diff().abs()` count? (Days on which the position changes, i.e. trades)
- Why can a same-day signal produce a Sharpe of 11? (It uses today's return to choose today's position: perfect foresight)
- The MA strategy beat buy-and-hold on Sharpe. Should you trade it? (Not on this evidence: the data have no trend, so the edge is luck; test out of sample)
- You tried 400 parameter pairs and picked the best. What bias is this? (Overfitting / data snooping)

## Analogies
- Look-ahead bias is betting on a horse race after reading tomorrow's newspaper.
- Overfitting is a key cut to fit one lock perfectly: it opens nothing else.
- Maximum drawdown is the deepest valley on a hike, measured from the highest point you had reached so far, not from the car park.

## Recording tips
- Plot price with both SMAs and shade the periods in the market; it makes the rule concrete.
- Plot the two equity curves (`(1 + df[["ret", "strat"]]).cumprod().plot()`) and the drawdown series.
- Make the Sharpe-of-11 reveal dramatic, then fix it with one `.shift(1)`; students remember it.
