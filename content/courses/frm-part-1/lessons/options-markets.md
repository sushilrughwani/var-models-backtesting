---
title: "Options Markets"
---

## Learning goals
- Describe the four basic option positions and classify options by type, exercise style and moneyness.
- Explain how exchange-traded stock options are specified and how terms adjust for stock splits and stock dividends.
- Calculate the margin required to write a naked option.
- Distinguish warrants, employee stock options and convertible bonds from exchange-traded options, and calculate the dilution effect.

## Explanation

### The basic contract
The introduction to derivatives lesson showed option payoffs. Recall the vocabulary:
- A **call** gives the holder the right, but not the obligation, to buy the underlying at the **strike price** $K$; a **put** gives the right to sell.
- The **buyer** (long) pays a premium up front; the **writer** (short) receives it and takes on the obligation.
- **European** options can be exercised only at expiration; **American** options at any time up to expiration. Most exchange-traded stock options are American.

At expiration with underlying price $S_T$:
$$
\text{Call payoff} = \max(S_T - K, 0), \qquad \text{Put payoff} = \max(K - S_T, 0)
$$
The writer's payoff is the negative of these. A call is **in the money** when $S > K$, **at the money** when $S \approx K$ and **out of the money** when $S < K$; the reverse applies to puts. **Intrinsic value** is the payoff if exercised now; the rest of the premium is **time value**.

### How exchange-traded options are specified
- **Contract size**: a stock option contract typically covers 100 shares.
- **Expiration cycle**: monthly, quarterly and weekly expiries, plus long-dated options (often called LEAPS).
- **Strikes**: listed at standard intervals around the current price; new strikes are added when the price moves.
- **Position and exercise limits**: caps on how many contracts one investor may hold on one side of the market.
- A **clearing house** (here the options clearing corporation) guarantees performance, as with futures.

**Adjustments.** Cash dividends normally do *not* change option terms. Stock splits and stock dividends do. For an $m$-for-$n$ split the strike becomes $K \times n/m$ and the number of shares per contract is multiplied by $m/n$. A 20% stock dividend is treated as a 6-for-5 split.

### Margin for written options
Buyers must pay the premium in full: options cannot be bought on margin in the usual way because they are already leveraged. Writers of **naked** (uncovered) options must post margin. A widely used rule for a naked call is the greater of:
$$
\begin{aligned}
&(1)\;\; \text{premium} + 0.20\,S - \text{amount out of the money} \\
&(2)\;\; \text{premium} + 0.10\,S
\end{aligned}
$$
per share, where $S$ is the share price. For a naked put the second test uses $0.10\,K$ instead. A **covered call** (short call against shares owned) needs no extra margin.

### Instruments that are not exchange-traded options
- **Warrants** are call options issued by a company on its own shares, often attached to bonds. When exercised, the company issues new shares, which **dilutes** existing holders.
- **Employee stock options (ESOs)** are long-dated calls granted to staff. They usually vest after several years, cannot be sold, and are often exercised early because employees leave or need cash. Exercise also creates new shares. Companies must expense their fair value.
- **Convertible bonds** let the holder exchange the bond for a fixed number of shares; they are a bond plus an embedded warrant-like option.

**Dilution.** With $N$ shares outstanding and $M$ warrants each giving one new share, a warrant is worth
$$
W = \frac{N}{N+M}\, c
$$
where $c$ is the value of a regular call on the share. Each warrant holder gets only a fraction of the value created because the new shares share the firm with old ones. Once a warrant issue is announced, the market price already reflects the expected dilution.

## Worked example
**Part 1: Split adjustment.** You hold one call contract with strike USD 60 on 100 shares. The company does a 3-for-2 split.
1. New strike: $60 \times 2/3 = $ USD 40.
2. New contract size: $100 \times 3/2 = 150$ shares.
3. Check: the exercise cost is unchanged, $40 \times 150 = 60 \times 100 = 6{,}000$. The position is economically identical.

**Part 2: Naked call margin.** An investor writes 5 naked call contracts (500 shares) with strike USD 45 when the share price is USD 40. The premium is USD 2 per share.
1. Amount out of the money: $45 - 40 = 5$.
2. Test 1: $2 + 0.20 \times 40 - 5 = 5.00$ per share.
3. Test 2: $2 + 0.10 \times 40 = 6.00$ per share.
4. Margin is the greater, 6.00 per share: $6.00 \times 500 = $ **USD 3,000**. The 1,000 dollars of premium received can count toward this.

**Part 3: Warrant dilution.** A firm has 8 million shares and issues 2 million warrants. A regular call with the same terms is worth USD 5. Each warrant is worth $\tfrac{8}{10} \times 5 = $ **USD 4.00**.

## Common exam traps
- Adjusting option terms for ordinary cash dividends. Only splits and stock dividends trigger adjustments.
- Inverting the split ratio: in a 3-for-2 split the strike falls to two-thirds and the share count rises by half.
- Forgetting that the naked margin uses the *greater* of the two tests, or forgetting to subtract the out-of-the-money amount in test 1.
- Treating warrants and ESOs like exchange options: their exercise creates new shares and dilutes existing holders.
- Calling an American option with $S < K$ in the money; a call needs $S > K$.

## Key takeaways
- Calls give the right to buy, puts the right to sell; buyers pay premium, writers take obligations.
- Exchange-traded stock options are standardised: 100 shares, fixed expiry cycles, listed strikes, clearing-house guarantee.
- Splits and stock dividends adjust the strike and contract size so the position's value is unchanged.
- Naked writers post margin equal to the greater of two tests; buyers pay in full.
- Warrants, ESOs and convertibles are company-issued and dilutive: warrant value is $N/(N+M)$ times the equivalent call.
