---
title: "Options Markets"
duration: 20
---

## Lecture outline
- 00:00 - Hook: a 3-for-2 split happens overnight. Did your call option just lose a third of its value?
- 02:00 - Calls, puts, long and short; European versus American; moneyness and time value
- 06:00 - Exchange-traded option specifications: size, expiries, strikes, limits, clearing
- 09:00 - Adjustments for splits and stock dividends (whiteboard part 1)
- 12:00 - Margin for naked option writers (whiteboard part 2)
- 15:00 - Warrants, employee stock options and convertibles; dilution (whiteboard part 3)
- 18:00 - Exam traps and recap

## Slides
### Slide 1: Options Markets
- How options are specified, traded and margined
- Company-issued options: warrants, ESOs, convertibles
- Foundation for option bounds and pricing lessons

### Slide 2: The Four Basic Positions
- Long call, short call, long put, short put
- Buyer pays premium, writer takes obligation
- European: exercise only at expiry; American: any time

### Slide 3: Moneyness and Value
- Call ITM when S > K; put ITM when S < K
- Intrinsic value = immediate exercise payoff
- Premium = intrinsic value + time value

### Slide 4: Contract Specifications
- Typically 100 shares per contract
- Monthly, quarterly, weekly and long-dated expiries
- Standard strike intervals; position and exercise limits

### Slide 5: Splits and Stock Dividends
- m-for-n split: strike x n/m, shares x m/n
- 20% stock dividend = 6-for-5 split
- Cash dividends: no adjustment

### Slide 6: Margin Rules
- Buyers pay the premium in full
- Naked call: greater of (premium + 20% S - OTM amount) and (premium + 10% S)
- Covered calls need no extra margin

### Slide 7: Warrants
- Calls issued by the company on its own stock
- Exercise creates new shares: dilution
- $W = \frac{N}{N+M}c$

### Slide 8: Employee Stock Options
- Long-dated calls, vesting period, non-transferable
- Often exercised early when employees leave
- Fair value is expensed

### Slide 9: Convertible Bonds
- Bond plus option to convert into a fixed number of shares
- Conversion dilutes existing holders like warrants
- Often callable by the issuer

### Slide 10: Recap
- Standardised exchange contracts versus company-issued dilutive options
- Know split arithmetic and the margin rule
- Next: bounds on option prices and put-call parity

## Whiteboard examples
**Example 1: 3-for-2 split.** One call contract, K = 60, 100 shares. New K = 60 x 2/3 = 40; new size = 150 shares. Exercise cost 6,000 before and after.

**Example 2: Naked call margin.** Write 5 contracts (500 shares), K = 45, S = 40, premium 2.
- Test 1: 2 + 8 - 5 = 5.00. Test 2: 2 + 4 = 6.00.
- Margin = 6.00 x 500 = 3,000 dollars.
- Variation: if S rises to 50 (call 5 ITM, premium now 7): Test 1 = 7 + 10 - 0 = 17, Test 2 = 7 + 5 = 12, margin = 17 x 500 = 8,500.

**Example 3: Warrant dilution.** N = 8m shares, M = 2m warrants, equivalent call worth 5. W = 0.8 x 5 = 4.00.

## Questions to ask students
- Does a 2 dollar cash dividend change the strike of a listed option? (No.)
- After a 2-for-1 split, what are the strike and size of a 50-strike contract? (25 strike, 200 shares.)
- Why do buyers not post margin? (They pay the premium in full and can lose no more.)
- Why is a warrant worth less than an otherwise identical exchange-traded call? (Exercise issues new shares, diluting the value received.)
- Why might an employee exercise an ESO early? (Leaving the firm, need for cash or diversification; the option cannot be sold.)

## Analogies
- A split is like cutting a pizza into more slices: the option holder's share of the pizza is unchanged, the slices are just smaller and more numerous.
- Naked call margin is a security deposit sized for the damage a tenant could do: bigger when the option is close to or in the money.
- Warrant dilution is like inviting more guests to share a cake you have already baked: each new guest gets cake, but each old guest's slice shrinks.

## Recording tips
- Do the split check (exercise cost unchanged) on screen; it makes the adjustment rule self-evident.
- Write both margin tests side by side and circle the larger; students forget the max.
- Keep ESO detail light; the exam focuses on the dilution and early-exercise features.
