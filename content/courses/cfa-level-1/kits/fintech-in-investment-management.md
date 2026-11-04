---
title: "Fintech in Investment Management"
duration: 18
---

## Lecture outline
- 00:00 - Hook: your portfolio may be advised by an app, traded by an algorithm and settled on a ledger
- 02:00 - Recap of big data techniques; where fintech sits in the investment chain
- 03:30 - Robo-advice: process, two forms, strengths and limitations
- 07:00 - Algorithmic trading, execution algorithms, VWAP and implementation shortfall
- 10:00 - High-frequency trading: benefits and risks
- 12:00 - Distributed ledgers: blockchain, consensus, permissioned vs permissionless, applications
- 15:30 - Big data in research, risk and compliance (regtech)
- 17:00 - Recap and exam traps

## Slides
### Slide 1: Fintech across the investment chain
- Advice: robo-advisers
- Execution: algorithms and HFT
- Record-keeping: distributed ledgers
- Oversight: big data in risk and compliance
### Slide 2: How a robo-adviser works
- Online questionnaire → risk profile → model ETF portfolio
- Automatic rebalancing, sometimes tax-loss harvesting
- Fully automated or adviser-assisted
### Slide 3: Robo-advice pros and cons
- Low fees and minimums, consistency, access
- May miss complex needs; often conservative
- Opaque logic; same suitability standards apply
### Slide 4: Algorithmic trading
- Rules-based execution by computer
- Slice large orders to reduce market impact
- $VWAP = \sum P_iQ_i / \sum Q_i$
### Slide 5: High-frequency trading
- Very fast market making and arbitrage
- Tighter spreads in normal markets
- Liquidity can vanish under stress
### Slide 6: Distributed ledgers
- Shared, copied database
- Blockchain: blocks chained by cryptographic hashes
- Consensus: proof of work, proof of stake
### Slide 7: Permissioned vs permissionless
- Permissionless: anyone can join and validate; no central authority
- Permissioned: restricted participants; faster, more private
### Slide 8: DLT applications
- Cryptocurrencies, tokenization and fractional ownership
- Faster clearing and settlement, smart contracts
- Auditable records for compliance
### Slide 9: Big data at work
- Alternative data and NLP for signals
- ML for risk monitoring, stress tests and fraud detection
- Regtech for surveillance
### Slide 10: Recap
- Advice, execution, ledgers, oversight - and the limitations of each

## Whiteboard examples
1. **Execution cost.** Decision price USD 50.00; fills of 2,000 at 50.10, 3,000 at 50.20 and 5,000 at 50.05. Weighted average = 501,050 / 10,000 = 50.105. Cost = 0.105 × 10,000 = USD 1,050 = 21 bps. Contrast with the simple average of prices: (50.10 + 50.20 + 50.05)/3 = 50.117, which ignores quantities.
2. **Robo-advice fees.** USD 200,000 portfolio: robo at 0.25% = USD 500; traditional at 1.00% = USD 2,000; saving USD 1,500 a year. Discuss what the extra fee buys (complex planning, behavioural coaching in a crash).
3. **Tamper resistance.** Sketch three blocks each storing the hash of the previous one; change a transaction in block 1 and show that the hashes in blocks 2 and 3 no longer match, so every later block must be recomputed.

## Questions to ask students
- Which type of ledger would a consortium of banks most likely choose for settlement? (Permissioned - restricted access, privacy and speed.)
- If a buy order is executed above the day's VWAP, was execution good or poor relative to that benchmark? (Poor.)
- Name one risk of HFT. (Liquidity can disappear during stress, amplifying price moves.)
- What does tokenization make possible for an office building? (Fractional ownership and easier transfer of ownership stakes.)
- Are robo-advisers exempt from suitability rules? (No.)

## Analogies
- A blockchain is a notebook copied to thousands of people; to forge a page you would have to change every copy and rewrite every page after it.
- An execution algorithm is like filling a bathtub from a slow tap instead of tipping in a bucket - less splash (market impact).
- A robo-adviser is a ready-made suit: good fit for standard shapes, cheaper, but not tailored for unusual needs.

## Recording tips
- Briefly reference the big data lesson so students see this as applications, not a repeat.
- Show the weighted-average versus simple-average contrast on screen; it is a quick, examinable trap.
- Use a simple animated hash-chain diagram for the ledger section; it makes tamper resistance obvious.
