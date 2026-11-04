---
title: "Risk Budgeting and Monitoring"
duration: 22
---

## Lecture outline
- 00:00 - Hook: a 10% allocation that uses a third of the fund's risk
- 02:00 - From capital budgeting to risk budgeting; link to component VaR
- 05:00 - Risk planning, budgeting and monitoring
- 08:00 - Absolute risk, surplus at risk and tracking error
- 11:00 - Allocating active risk with information ratios
- 14:00 - Whiteboard: two-manager allocation and surplus at risk
- 18:00 - Risk monitoring unit: what it checks and red flags
- 20:00 - Exam traps and recap

## Slides
### Slide 1: Capital weights hide risk
- Equal capital does not mean equal risk
- Leveraged or volatile strategies dominate total risk
- Budget risk first, then derive capital
### Slide 2: The three stages
- Planning: return goals, risk tolerance, governance
- Budgeting: limits by asset class, manager, strategy
- Monitoring: measure, compare, escalate
### Slide 3: Which risk measure?
- Total-return funds: absolute VaR
- Pension funds: surplus at risk (assets minus liabilities)
- Benchmarked mandates: tracking error
### Slide 4: Surplus at risk
- $\sigma_S = \sqrt{\sigma_A^2 + \sigma_L^2 - 2\rho\sigma_A\sigma_L}$
- $\text{SaR} = z\,\sigma_S$
- Liability-hedging assets cut surplus risk
### Slide 5: Information ratio
- $IR = \alpha / \omega$
- Skill per unit of active risk
- The currency of active risk budgeting
### Slide 6: Optimal active risk allocation
- $\omega_i^* = (IR_i/IR_P)\,\omega_P$
- $IR_P = \sqrt{\sum IR_i^2}$ for uncorrelated alphas
- Expected alpha = $IR_P\,\omega_P$
### Slide 7: From active risk to capital weights
- Weight in manager = allocated ω / manager's own ω
- Remainder goes to passive benchmark exposure
- Lets you use a high-IR manager without taking all its risk
### Slide 8: The risk management unit
- Independent from portfolio managers
- Checks limits, leverage, liquidity, concentration
- Validates prices and risk models
### Slide 9: Monitoring red flags
- Realised TE well above budget: unauthorised bets
- Realised TE well below budget: closet indexing
- Style drift and unexplained gains
### Slide 10: Exam traps
- Uncorrelated risks add in squares, not linearly
- Minus sign in surplus volatility
- Active risk allocation ≠ capital weight

## Whiteboard examples
**Example 1: Two managers.** Budget 3%; IR1 = 0.5 (own TE 5%), IR2 = 0.3 (own TE 4%).
- IR_P = √(0.25 + 0.09) = 0.5831
- ω1 = 0.5/0.5831 × 3% = 2.572%; ω2 = 1.543%; check √(2.572² + 1.543²) = 3%
- Alpha = 0.5 × 2.572 + 0.3 × 1.543 = 1.749% (versus 1.697% with an equal 2.121% split)
- Weights: 2.572/5 = 51.4%, 1.543/4 = 38.6%, passive 10.0%

**Example 2: Surplus at risk.** Assets 100m with 10% volatility (σA = 10m), liabilities 90m with 6% volatility (σL = 5.4m), ρ = 0.8, z = 1.645.
- σS² = 100 + 29.16 - 2 × 0.8 × 10 × 5.4 = 42.76 → σS = 6.539m
- SaR = 1.645 × 6.539 = 10.76m
- With ρ = 0 the SaR would be 18.70m: liability matching cuts surplus risk sharply.

## Questions to ask students
- Why can a small capital allocation dominate a fund's risk? (High volatility or leverage gives it a large component VaR.)
- Why do pension funds focus on surplus rather than asset volatility? (Their obligation is the liability; a fall in assets matched by a fall in liabilities is harmless.)
- If a manager's IR doubles, what happens to its optimal active-risk allocation? (It doubles relative to the others, subject to rescaling to the total budget.)
- A manager budgeted 4% TE has run 0.8% for two years. What is the concern? (Closet indexing; paying active fees for benchmark returns.)
- Who should monitor risk? (An independent unit, not the portfolio managers being monitored.)

## Analogies
- Household budget: you do not give each family member the same cash; you allocate by need and value. Risk budgets allocate risk where it buys the most return.
- Calories, not plate size: two equal plates can hold very different calories. Capital weights are plate size; risk contribution is calories.
- Referee: the risk unit is the referee, not a player; it must be independent to blow the whistle.

## Recording tips
- Connect explicitly to component VaR from the previous lesson so students see risk budgeting as the use of that decomposition.
- Show the equal-split versus optimal-split alpha comparison to prove why IR weighting matters.
- Emphasise the closet-indexing red flag; candidates intuitively assume less risk is always good.
