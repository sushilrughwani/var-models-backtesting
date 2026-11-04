---
title: "Technical Analysis"
---

## Learning goals
- Explain the assumptions behind technical analysis and how it differs from fundamental analysis.
- Interpret common chart types, trends, support and resistance.
- Identify reversal and continuation patterns and calculate a head-and-shoulders price target.
- Calculate and interpret moving averages, the relative strength index and rate of change.
- Describe sentiment indicators, flow-of-funds indicators, cycles and intermarket analysis.

## Explanation

### The premise
Fundamental analysis asks what an asset is worth; technical analysis asks what other traders are doing and where prices are likely to go next. Its core assumptions are that prices are set by supply and demand, that supply and demand reflect both rational and irrational behaviour, and that prices move in **trends** and recurring **patterns** because human behaviour repeats. Technical analysis uses only market data - price, volume, and sentiment - so it can be applied to any freely traded asset, including commodities and currencies with no cash flows to discount. It works poorly in illiquid markets or where prices are manipulated. Its usefulness conflicts with weak-form market efficiency, a tension worth remembering from earlier lessons on efficient markets.

### Charts, trends, support and resistance
Line charts connect closing prices; bar charts show open, high, low and close; **candlestick** charts shade the body between open and close (hollow or light when the close is above the open). Volume is usually shown beneath the price. Logarithmic scales are preferred over long periods so that equal percentage moves look equal.

An **uptrend** is a series of higher highs and higher lows; a **downtrend** is lower highs and lower lows. A trendline joins the lows of an uptrend or the highs of a downtrend; a decisive break signals a possible change. **Support** is a price level where buying tends to emerge; **resistance** is a level where selling tends to emerge. Under the **change in polarity** principle, broken resistance becomes support, and broken support becomes resistance.

### Patterns
**Reversal patterns** signal the end of a trend: head and shoulders (at the top of an uptrend), inverse head and shoulders (at the bottom of a downtrend), double tops and bottoms, triple tops and bottoms. **Continuation patterns** signal a pause before the trend resumes: triangles, rectangles, flags and pennants.

For a head and shoulders top, the expected decline after the neckline breaks equals the height of the head above the neckline:

$$
\text{Price target} = \text{Neckline} - (\text{Head} - \text{Neckline})
$$

For an inverse pattern, the target is $\text{Neckline} + (\text{Neckline} - \text{Head})$.

### Indicators
A **simple moving average (SMA)** averages the last $n$ closing prices. A short-term average crossing **above** a long-term average (for example 50-day above 200-day) is a **golden cross**, a bullish signal; crossing below is a **death cross**. **Bollinger bands** are a moving average plus and minus a multiple (often 2) of the standard deviation; touching the upper band may signal an overbought market.

The **relative strength index** compares average gains with average losses over $n$ periods (often 14):

$$
RSI = 100 - \frac{100}{1 + RS}, \qquad RS = \frac{\text{average gain}}{\text{average loss}}
$$

RSI ranges from 0 to 100; above 70 is commonly read as overbought and below 30 as oversold. **Rate of change** is $(P_t - P_{t-n})/P_{t-n} \times 100$; crossing zero signals a shift in momentum. Oscillators such as MACD and stochastics are interpreted similarly, and **divergence** - price making new highs while the oscillator does not - warns of a weakening trend.

### Sentiment, flows, cycles and intermarket analysis
Sentiment indicators are often read as **contrarian**: a high put/call ratio, a high volatility index, or very bearish surveys may signal a bottom. Rising margin debt reflects bullish sentiment. Flow-of-funds indicators include the **Arms index (TRIN)** - (advancing issues / declining issues) divided by (advancing volume / declining volume); values above 1 suggest selling pressure. Cycle theories include the Kondratieff wave (about 54 years) and the decennial pattern; **Elliott wave theory** describes five-wave impulses and three-wave corrections linked to Fibonacci ratios. **Intermarket analysis** compares asset classes and sectors, for example using relative-strength ratios between stocks and bonds.

## Worked example
A stock has formed a head-and-shoulders top: left shoulder 72, head 80, right shoulder 71, neckline 62. Over the last 14 days, its gains summed to 21 and its losses summed to 9. Separately, a second stock closed at 50, 51, 53, 52, 55 and 56 over the last six days.

**Step 1 - price target:** height $= 80 - 62 = 18$; target $= 62 - 18 = 44$.

**Step 2 - RSI:** average gain $= 21/14 = 1.50$; average loss $= 9/14 = 0.643$; $RS = 1.50/0.643 = 2.333$; $RSI = 100 - 100/3.333 = 70.0$.

**Step 3 - 5-day SMA:** day 5: $(50 + 51 + 53 + 52 + 55)/5 = 52.2$; day 6: $(51 + 53 + 52 + 55 + 56)/5 = 53.4$. For the second stock, the price (56) is above a rising average - an uptrend.

**Step 4 - 5-day ROC on day 6:** $(56 - 50)/50 \times 100 = 12.0$.

**Answer: once the neckline breaks, the head-and-shoulders target is 44; an RSI of 70.0 sits at the overbought threshold, reinforcing the bearish reversal signal.**

## Common exam traps
- Applying the top formula to an inverse head and shoulders - the inverse target lies above the neckline.
- Reading a high put/call ratio as bearish; as a contrarian indicator it is bullish.
- Forgetting that broken resistance becomes support (change in polarity).
- Confusing a golden cross (short average crosses above long) with a death cross.
- Treating RSI as a comparison of a stock with the market; it compares the security's own gains with its own losses. (Relative-strength ratios against another asset are a separate tool.)

## Key takeaways
- Technical analysis studies price, volume and sentiment, assuming trends and repeating behaviour.
- Support and resistance switch roles once broken.
- Head-and-shoulders target: neckline minus head-to-neckline height.
- RSI above 70 suggests overbought, below 30 oversold.
- Many sentiment indicators are contrarian signals.
- Intermarket analysis and cycles add a broader, cross-asset view.
