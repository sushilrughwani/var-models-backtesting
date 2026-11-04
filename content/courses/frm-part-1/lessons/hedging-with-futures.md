---
title: "Using Futures for Hedging"
---

## Learning goals
- Distinguish short and long hedges and explain the arguments for and against hedging.
- Define basis, explain basis risk and calculate the effective price obtained by a hedger.
- Calculate the minimum-variance hedge ratio, hedge effectiveness and the optimal number of futures contracts.
- Use stock index futures to hedge an equity portfolio or change its beta.

## Explanation

### Short and long hedges
A **short hedge** (selling futures) protects someone who owns or will sell an asset, such as a farmer with a crop or an exporter with foreign currency receivable. A **long hedge** (buying futures) protects someone who will buy an asset later, such as an airline needing fuel.

Hedging reduces variability but is not free of controversy. Shareholders can diversify themselves; competitors may not hedge, so a hedged firm's margins can move against the industry (if a cost rise is passed on to customers across the industry, the hedged firm gains little from its hedge); and a hedge that loses money can be hard to explain to a board even when the underlying exposure gained.

### Basis and basis risk
Hedges are rarely perfect: the hedge horizon may not match the futures maturity, or the asset being hedged differs from the futures underlying. The **basis** captures the mismatch:

$$
b_t = S_t - F_t
$$

where $S_t$ is the spot price of the asset being hedged and $F_t$ the futures price at time $t$. If a hedge is put on at time 1 and closed at time 2, the effective price received or paid is

$$
\text{Effective price} = S_2 + (F_1 - F_2) = F_1 + b_2
$$

$F_1$ is known when the hedge starts; $b_2$ is not. That uncertainty is **basis risk**. A **strengthening** basis (spot rises relative to futures) helps short hedgers; a **weakening** basis helps long hedgers.

### Minimum-variance hedge ratio
When the asset differs from the futures underlying (cross hedging), one futures unit per unit of exposure is not optimal. Minimising the variance of the hedged position gives

$$
h^* = \rho \frac{\sigma_S}{\sigma_F}
$$

where $\sigma_S$ is the standard deviation of changes in spot, $\sigma_F$ the standard deviation of changes in futures, and $\rho$ their correlation. $h^*$ is the slope from regressing $\Delta S$ on $\Delta F$, and **hedge effectiveness** is $\rho^2$, the share of variance removed.

The number of contracts is

$$
N^* = \frac{h^* Q_A}{Q_F}
$$

with $Q_A$ the size of the exposure and $Q_F$ the size of one contract. When daily settlement matters, **tailing the hedge** uses values instead of quantities: $N^* = h^* V_A / V_F$, where $V_A$ is the value of the position and $V_F$ the value of one futures contract.

### Stock index futures
For an equity portfolio, beta plays the role of the hedge ratio:

$$
N^* = \beta \frac{P}{F \times m}
$$

where $P$ is portfolio value, $F$ the index futures price and $m$ the contract multiplier. To move beta from $\beta$ to a target $\beta^*$:

$$
N = (\beta^* - \beta) \frac{P}{F \times m}
$$

A negative $N$ means sell contracts; a positive $N$ means buy. A full hedge leaves the portfolio earning roughly the risk-free rate (plus any alpha).

### Rolling hedges
When the exposure lasts longer than available contracts, a hedger can **stack and roll**: close near contracts and open later ones repeatedly, taking on rollover basis risk and possible cash-flow strain from margin calls.

## Worked example
**Cross hedge.** An airline will buy 2,000,000 gallons of jet fuel in three months and hedges with heating oil futures (42,000 gallons per contract). Over three-month horizons, σ of jet fuel price changes is 0.030, σ of futures changes is 0.036 and correlation is 0.90.

1. $h^* = 0.90 \times 0.030 / 0.036 = 0.75$.
2. $N^* = 0.75 \times 2{,}000{,}000 / 42{,}000 = 35.71$, so buy **36 contracts** (long hedge).
3. Hedge effectiveness = 0.90² = 0.81: 81% of price variance is removed.

**Basis.** The airline buys futures at $F_1 = 2.20$ USD per gallon. At closing, spot jet fuel is 2.10 and futures 2.05, so $b_2 = 0.05$. Effective price = 2.20 + 0.05 = **USD 2.25 per gallon** (it pays 2.10 spot and loses 0.15 on futures).

**Index hedge.** A USD 25m portfolio has beta 1.3. Index futures trade at 5,000 with multiplier 50, so one contract is worth 250,000.
- Full hedge: $N^* = 1.3 \times 25{,}000{,}000 / 250{,}000 =$ **130 contracts short**.
- Reduce beta to 0.6: $N = (0.6 - 1.3) \times 100 = -70$, so sell 70 contracts.

## Common exam traps
- Inverting the hedge ratio as $\rho \sigma_F/\sigma_S$.
- Using $\rho$ instead of $\rho^2$ for hedge effectiveness.
- Computing effective price as $F_1 + b_1$; the uncertain basis is the one at close-out.
- Forgetting the multiplier when computing the value of one index futures contract.
- Getting the sign wrong when changing beta: increasing beta means buying futures.

## Key takeaways
- Short hedges protect sellers; long hedges protect buyers.
- Effective price = $F_1 + b_2$; basis risk is uncertainty in $b_2$.
- $h^* = \rho \sigma_S/\sigma_F$; effectiveness = $\rho^2$; $N^* = h^* Q_A/Q_F$.
- Index futures: $N^* = \beta P/(F m)$; change beta with $(\beta^* - \beta) P/(F m)$.
- Hedging reduces variance, not necessarily cost, and can disappoint relative to unhedged competitors.
