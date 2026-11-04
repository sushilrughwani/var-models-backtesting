---
title: "Market Organization and Structure"
---

## Learning goals
- Explain the main functions a financial system performs for savers, borrowers, hedgers and traders.
- Distinguish long and short positions and describe how a short sale works.
- Calculate the leverage ratio, the return on a margin purchase and the margin call price.
- Distinguish execution, validity and clearing instructions on orders, and compare quote-driven, order-driven and brokered markets.

## Explanation

### What the financial system is for
A financial system exists so that people can move money across time and across risks. Savers want to earn a return on money they do not need today; borrowers and issuers need capital now; hedgers want to offload risks they already carry; and information-motivated traders want to profit from views they believe the market has not priced. The system also determines prices (price discovery) and allocates capital to its most productive uses. A well-functioning market is **operationally efficient** (low trading costs), **informationally efficient** (prices reflect information quickly) and **allocationally efficient** (capital goes to the best projects).

Markets are often grouped by what trades in them: money versus capital markets (short versus long maturity), primary versus secondary markets (new issues versus resale), and spot versus derivative markets.

### Positions: long, short and leveraged
A **long** position gains when the asset rises in value. A **short** seller borrows shares, sells them, and later buys them back to return to the lender. The short seller gains if the price falls, must pay the lender any dividends paid while the position is open, and faces theoretically unlimited loss because the price has no ceiling.

A **leveraged** long position is bought partly with borrowed money from the broker (a margin loan). The investor's own contribution is the **initial margin**. Leverage magnifies returns in both directions:

$$
\text{Leverage ratio} = \frac{\text{Position value}}{\text{Equity}} = \frac{1}{\text{Initial margin}}
$$

With 50% initial margin, leverage is 2: a 10% move in the stock becomes roughly a 20% move in the investor's equity (before interest and costs).

### Margin calls
After purchase, the broker requires equity to stay above a **maintenance margin** fraction of the position value. If the price falls far enough, the investor receives a margin call and must deposit cash. The trigger price for a long position financed at purchase price $P_0$ is

$$
P_{\text{call}} = P_0 \times \frac{1 - \text{IM}}{1 - \text{MM}}
$$

where IM is the initial margin and MM is the maintenance margin, both as decimals. Intuition: the loan per share, $P_0(1-\text{IM})$, is fixed; the call happens when equity per share, $P - P_0(1-\text{IM})$, equals MM times $P$.

### Orders and how they execute
Every order carries three kinds of instruction:
- **Execution instructions** say how to fill: a **market order** fills immediately at the best available price (certain execution, uncertain price); a **limit order** sets a worst acceptable price (certain price limit, uncertain execution).
- **Validity instructions** say when the order is active: day orders, good-till-cancelled, immediate-or-cancel, and **stop orders**, which only become active once the price trades through a stop level. A stop-loss sell order sits below the current price to limit losses.
- **Clearing instructions** say how the trade is settled, for example whether a sale is a short sale.

A standing limit buy below the market (or a limit sell above it) **provides** liquidity; a market order **takes** it. A limit order that is priced aggressively enough to trade at once is called marketable.

### Market structures
In **quote-driven** (dealer) markets, investors trade with dealers who post bid and ask quotes. In **order-driven** markets, orders from all participants meet in a central book and are matched by rules of price and time priority. In **brokered** markets, brokers search for counterparties for unique or illiquid assets such as real estate or large blocks. Execution can occur in call markets (trades batched at one time and price) or continuous markets.

## Worked example
An investor buys 500 shares at USD 40 using 50% initial margin. Maintenance margin is 25%, the loan rate is 5% a year, the stock pays a USD 0.80 dividend, and commissions are USD 0.02 per share each way. One year later she sells at USD 48.

1. Cost of the position: $500 \times 40 = 20{,}000$. Equity = 10,000; loan = 10,000.
2. Buying commission: $500 \times 0.02 = 10$. Initial investment = 10,000 + 10 = 10,010.
3. Sale proceeds: $500 \times 48 = 24{,}000$.
4. Repay loan 10,000 and interest $0.05 \times 10{,}000 = 500$.
5. Dividends received: $500 \times 0.80 = 400$. Selling commission: 10.
6. Ending equity: $24{,}000 - 10{,}000 - 500 + 400 - 10 = 13{,}890$.
7. Return on equity: $13{,}890 / 10{,}010 - 1 = 38.76\%$.

Compare the unleveraged return: $(48 + 0.80)/40 - 1 = 22.00\%$. Leverage turned 22% into **38.76%**.

Margin call price: $40 \times (1 - 0.50)/(1 - 0.25) = $ **USD 26.67**. Any price below that triggers a call.

## Common exam traps
- Forgetting that interest on the margin loan and commissions reduce the leveraged return; the exam usually includes them.
- Using the maintenance margin in the leverage ratio. Leverage at purchase uses the initial margin: 1/IM.
- Confusing stop orders with limit orders: a stop-loss sell becomes a market order once triggered and can fill well below the stop price.
- Thinking a short seller receives dividends. The short seller **pays** them to the share lender.
- Calling a limit order "liquidity taking". Standing limit orders supply liquidity.

## Key takeaways
- The financial system lets savers, borrowers, hedgers and traders move money across time and risk, and discovers prices.
- Leverage ratio = 1/initial margin; it magnifies gains and losses on equity.
- Margin call price for a long position = $P_0(1-\text{IM})/(1-\text{MM})$.
- Orders have execution, validity and clearing instructions; market orders trade price certainty for speed.
- Markets are quote-driven, order-driven or brokered; good markets are operationally, informationally and allocationally efficient.
