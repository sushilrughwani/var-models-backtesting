---
title: "Fintech in Investment Management"
---

## Learning goals
- Describe how robo-advisers deliver portfolio advice and identify their strengths and limitations.
- Explain algorithmic and high-frequency trading and calculate a VWAP execution benchmark.
- Describe distributed ledger technology, distinguish permissioned from permissionless networks, and identify applications such as tokenization and smart contracts.
- Explain how big data and machine learning feed into investment research, risk management and compliance.

## Explanation

### Fintech in the investment chain
The earlier lesson on big data techniques covered the analytical engine - data types, machine learning and text analytics. This lesson looks at where that engine is put to work across the investment process: giving advice, executing trades, recording ownership and monitoring risk.

### Robo-advice
A **robo-adviser** gathers information through an online questionnaire (goals, horizon, income, attitude to losses), maps the answers to a model portfolio, and then automates rebalancing and, in some markets, tax-loss harvesting. Most use low-cost ETFs and a passive strategy. There are two broad forms:
- **Fully automated** - no human contact; the lowest cost.
- **Adviser-assisted** - an algorithm builds the portfolio but clients can speak to a human adviser.

Strengths: low fees and minimums, consistent and transparent process, accessibility for smaller investors. Limitations: the questionnaire may miss nuances such as complex tax or estate needs; portfolios tend to be conservative; behaviour in a severe crash is less tested; and the logic behind recommendations may be opaque to clients and regulators. Regulators expect the same suitability standards as for human advice.

### Algorithmic and high-frequency trading
**Algorithmic trading** uses computer programs to execute orders by pre-set rules. **Execution algorithms** break a large order into small pieces to reduce market impact, often aiming at a benchmark such as the volume-weighted average price:

$$
VWAP = \frac{\sum_i P_i \, Q_i}{\sum_i Q_i}
$$

where $P_i$ is the price and $Q_i$ the quantity of each trade. A buy executed below VWAP is generally considered good execution. **Implementation shortfall** measures the cost relative to the price when the decision was made.

**High-frequency trading (HFT)** is algorithmic trading at extremely high speed, profiting from tiny, short-lived price differences, often through market making and arbitrage. Benefits include tighter bid-ask spreads and better liquidity in normal conditions; risks include liquidity vanishing in stressed markets and amplification of sudden price swings. Algorithms also let managers route orders across fragmented venues efficiently.

### Distributed ledger technology
A **distributed ledger** is a shared database copied across a network of participants. A **blockchain** groups transactions into blocks linked by cryptographic hashes, so altering a past record would require recomputing every later block. Participants agree on the valid state through a **consensus mechanism**, such as proof of work (computationally expensive) or proof of stake.

- **Permissionless** (open) networks let anyone join and validate; no central authority is needed, but processing can be slow and energy-intensive. Bitcoin is the best-known example.
- **Permissioned** networks restrict who can join or validate; they are faster and suit institutions that need privacy and control.

Applications: **cryptocurrencies**; **tokenization** - representing ownership of real assets such as real estate or art as digital tokens, which can simplify transfer and allow fractional ownership; **post-trade clearing and settlement**, potentially moving toward near real-time settlement; **smart contracts** that execute automatically when coded conditions are met; and **compliance**, through an auditable record. Challenges include scalability, regulation, and the possibility of a "51% attack" in which a party controlling most validation power could rewrite records.

### Big data and machine learning in practice
Managers use alternative data (satellite images, card transactions, web traffic) and natural language processing of filings and calls to generate trading signals. Risk managers use machine learning to spot unusual exposures, run real-time stress tests and detect fraud. Compliance teams use **regtech** to monitor communications and trades for misconduct automatically.

## Worked example
A manager decides to buy 10,000 shares when the price is USD 50.00 and uses an execution algorithm, which fills the order in three trades: 2,000 shares at 50.10, 3,000 at 50.20 and 5,000 at 50.05.

**Step 1 - value of each fill:** $2{,}000 \times 50.10 = 100{,}200$; $3{,}000 \times 50.20 = 150{,}600$; $5{,}000 \times 50.05 = 250{,}250$.

**Step 2 - volume-weighted average execution price** (the same formula as VWAP, applied to the manager's own fills; the market-wide VWAP would use every trade in the stock that day): $(100{,}200 + 150{,}600 + 250{,}250) / 10{,}000 = 501{,}050 / 10{,}000 = 50.105$.

**Step 3 - cost versus the decision price:** $(50.105 - 50.00) \times 10{,}000 = 1{,}050$ dollars, or $0.105 / 50.00 = 0.0021 = 21$ basis points.

**Step 4 - robo-advice comparison.** A client with USD 200,000 compares a robo-adviser charging 0.25% (USD 500 a year) with a traditional adviser charging 1.00% (USD 2,000 a year): a difference of USD 1,500 a year.

**Answer: the average execution price is USD 50.105, an implementation cost of USD 1,050 (21 bps); the robo-adviser saves the client USD 1,500 a year in fees.**

## Common exam traps
- Thinking permissioned ledgers are open to anyone - that describes permissionless networks.
- Assuming HFT always improves liquidity; liquidity can disappear in stressed markets.
- Computing VWAP as a simple average of prices, ignoring quantities.
- Believing robo-advisers are exempt from suitability requirements.
- Treating blockchain records as impossible to alter; they are very hard to alter, but a majority of validation power could do so.

## Key takeaways
- Robo-advisers automate profiling, allocation and rebalancing at low cost, but may miss complex needs.
- Execution algorithms slice orders to reduce market impact and target benchmarks such as VWAP.
- HFT can tighten spreads but may amplify stress.
- Distributed ledgers share a tamper-resistant record; permissioned networks restrict participation.
- Tokenization, smart contracts and faster settlement are key DLT applications.
- Big data and machine learning now support research, risk management and compliance.
