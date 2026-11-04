---
title: "Hedge Funds and Due Diligence"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a fund with a Sharpe ratio of 2 and almost no down months; dream or warning sign?
- 02:00 - What makes hedge funds different: leverage, shorting, liquidity terms, fees
- 05:00 - Strategy families and their hidden exposures
- 09:00 - Data problems: survivorship, backfill, smoothing
- 12:00 - Whiteboard: fees with a high-water mark; unsmoothing volatility
- 16:00 - Investment due diligence
- 19:00 - Operational due diligence and red flags
- 22:00 - Exam traps and recap

## Slides
### Slide 1: The hedge fund toolkit
- Short selling, leverage, derivatives, illiquid assets
- Lock-ups, notice periods, gates
- Light regulation, limited transparency
### Slide 2: Fee structures
- Management fee on assets plus incentive fee on profits
- High-water mark: no incentive fee until previous peak is regained
- Hurdle: minimum return before incentive fees apply
### Slide 3: The manager's call option
- Incentive fee = upside participation, no downside
- Can encourage risk-taking, especially far below the high-water mark
- Align incentives: co-investment, clawbacks
### Slide 4: Hidden exposures by strategy
- Long/short equity: net long beta
- Merger arbitrage: like selling index puts
- Convertible and fixed-income arbitrage: leveraged liquidity and spread risk
- Managed futures: often long volatility in crises
### Slide 5: Alpha or risk premium?
- Steady small gains, rare large losses = short volatility
- Linear market regressions miss tail exposures
- Ask what bad times the strategy is exposed to
### Slide 6: Database biases
- Survivorship: dead funds drop out
- Backfill: funds join after good runs
- Both overstate average returns
### Slide 7: Return smoothing
- Stale and model marks create autocorrelation
- $\sigma_{true} \approx \sigma_{obs}\sqrt{(1+\rho)/(1-\rho)}$
- Inflated Sharpe ratios, understated correlations
### Slide 8: Investment due diligence
- Source and persistence of the edge
- Risk controls: leverage, concentration, liquidity matching
- Consistency between stated strategy and actual returns
### Slide 9: Operational due diligence
- Independent administrator and valuation
- Reputable auditor, custodian, prime broker; verify assets exist
- Segregation of duties, compliance, governance, side letters
### Slide 10: Red flags
- Returns too smooth to be true
- Secretive strategy, self-administration
- Small unknown auditor for a large fund

## Whiteboard examples
**Example 1: High-water mark.** Beginning NAV 100, high-water mark 105, 2% management fee on beginning NAV, 20% incentive above HWM after management fee, gross return 15%.
- Gross NAV = 115; management fee = 2; NAV = 113
- Incentive = 0.20 × (113 - 105) = 1.6
- Ending NAV = 111.4 → net return 11.4%
- Without HWM: incentive 0.20 × 13 = 2.6 → net 10.4%

**Example 2: Harder fee case.** Beginning NAV 200, HWM 220, 1.5% management fee, 20% incentive above HWM after management fee, gross 18%.
- Gross NAV = 236; management fee = 3; NAV = 233
- Incentive = 0.20 × (233 - 220) = 2.6; ending NAV 230.4
- Net return = 15.2%

**Example 3: Unsmoothing.** Reported volatility 12%, autocorrelation 0.4.
- σ_true = 12% × √(1.4/0.6) = 18.33%
- A reported Sharpe of 1.0 becomes about 0.65.

## Questions to ask students
- Why does a high-water mark protect investors? (They do not pay incentive fees twice for recovering the same losses.)
- What option position does merger arbitrage resemble? (A short put on the market: small steady gains, large losses in sell-offs.)
- Why does positive autocorrelation in reported returns raise a red flag? (It suggests stale or smoothed marks, understating true risk.)
- What two biases make hedge fund indices look better than reality? (Survivorship and backfill bias.)
- Why must valuation be independent of the portfolio manager? (The manager's fees depend on NAV, a direct conflict of interest.)

## Analogies
- Picking up nickels in front of a steamroller: steady small gains from selling insurance until one day the steamroller arrives.
- Smoothed returns as a car's speedometer with a lag: it shows a gentle ride even while the car is swerving.
- Operational due diligence as a building inspection: a beautiful show home (track record) means nothing if the foundations (custody, valuation, controls) are rotten.

## Recording tips
- Show a stylised chart of a short-volatility return series: years of smooth gains then a cliff. It makes the hidden-risk point instantly.
- Work Example 1 slowly; most students make the mistake of charging the incentive on the full gain.
- Stress that operational failures, not just trading losses, sink many funds; this is a frequent conceptual exam theme.
