---
title: "External and Internal Credit Ratings"
---

## Learning goals
- Describe the long-term rating scales used by the major rating agencies and the investment-grade boundary.
- Use a rating transition matrix to compute multi-year default and migration probabilities.
- Distinguish through-the-cycle from point-in-time ratings and explain the trade-offs.
- Explain how banks build internal ratings and how these relate to external ratings.
- Identify known weaknesses of ratings, including lags, momentum and conflicts of interest.

## Explanation

### What a rating measures
The volatility and VaR tools so far focused on market risk. Credit risk asks a different question: will the borrower pay? A credit rating is an ordinal opinion of creditworthiness. It ranks borrowers; it is not a precise probability. Agencies publish long-term scales:

| S&P / Fitch | Moody's |
|---|---|
| AAA, AA, A, BBB | Aaa, Aa, A, Baa |
| BB, B, CCC, CC, C | Ba, B, Caa, Ca, C |

Notches refine each grade (AA+, AA, AA− or Aa1, Aa2, Aa3). **BBB− (Baa3) is the lowest investment-grade rating**; anything below is speculative grade, often called high yield. Many investors are restricted to investment grade, so a fall from BBB− to BB+ ("fallen angel") can force selling. Agencies also publish **outlooks** (likely direction over one to two years) and **watch lists** (a change is under active review, usually within months).

Historically, default rates rise sharply as ratings fall. Cumulative default rates for AAA issuers stay tiny even over long horizons, while for B and CCC issuers they reach double digits within a few years.

### Transition matrices
A transition matrix records the probability that an issuer starting in one rating ends a year in each other rating, including default. Each row sums to 1, and default is treated as absorbing. If the matrix is assumed constant over time (a Markov assumption), the $T$-year matrix is the one-year matrix multiplied by itself $T$ times:

$$
P^{(2)}_{ij} = \sum_k P_{ik}\,P_{kj}
$$

where $P_{ik}$ is the one-year probability of moving from rating $i$ to rating $k$. The two-year default probability is a sum over every path that ends in default, including defaulting in year 1 and staying there.

### Through-the-cycle versus point-in-time
Agencies aim for **through-the-cycle (TTC)** ratings: they try to look past the current stage of the business cycle and change ratings only for durable changes in credit quality. TTC ratings are stable, which investors and regulators like, but they lag market information and respond slowly to sudden deterioration.

**Point-in-time (PIT)** measures, such as those built from equity prices or CDS spreads, reflect current conditions and so move with the cycle. They predict near-term default better but are volatile and procyclical: they worsen in a downturn just when capital is scarce.

### Internal ratings
Banks rate many borrowers that have no agency rating, such as small companies. Internal systems combine financial-ratio scoring models (Altman's Z-score is the classic example), qualitative judgement about management, industry and collateral, and sometimes market-based inputs. Each internal grade is mapped to a PD, often by aligning it with agency default histories. Under the Basel internal ratings-based approach, these PDs feed regulatory capital, so models must be validated and backtested. Internal ratings are usually more PIT than agency ratings.

### Known weaknesses
- **Rating momentum**: an issuer downgraded recently is more likely to be downgraded again than one with a stable history, which violates the Markov assumption.
- **Cycle dependence**: transition matrices deteriorate in recessions; a single average matrix understates downturn risk.
- **Conflicts of interest**: under the issuer-pays model, the rated entity pays the agency, a concern highlighted by structured-product ratings before 2007.
- **Lagging markets**: bond and CDS spreads often move before rating actions.

## Worked example
A bank uses this simplified one-year transition matrix (D = default):

| From \ To | A | B | C | D |
|---|---|---|---|---|
| A | 0.90 | 0.08 | 0.015 | 0.005 |
| B | 0.05 | 0.85 | 0.08 | 0.02 |
| C | 0.01 | 0.09 | 0.80 | 0.10 |
| D | 0 | 0 | 0 | 1 |

Find the two-year default probability for an A-rated issuer.

1. Path A → A → D: $0.90 \times 0.005 = 0.0045$.
2. Path A → B → D: $0.08 \times 0.02 = 0.0016$.
3. Path A → C → D: $0.015 \times 0.10 = 0.0015$.
4. Path A → D → D (defaults in year 1 and stays): $0.005 \times 1 = 0.005$.
5. Sum: $0.0045 + 0.0016 + 0.0015 + 0.005 = 0.0126$, so the two-year PD is **1.26%**.

Note that this is well above $1 - 0.995^2 = 0.9975\%$, the answer you would get by assuming the one-year PD stays at 0.5%. Downgrade risk raises the default probability in year 2. The same method for a B-rated issuer gives $0.05(0.005) + 0.85(0.02) + 0.08(0.10) + 0.02 = 4.525\%$.

## Common exam traps
- Forgetting the path where the issuer defaults in year 1; default is absorbing, so it counts with probability 1 in year 2.
- Doubling the one-year PD or compounding it as if ratings never migrate.
- Placing the investment-grade boundary at BBB or BB+; it is BBB− (Baa3).
- Treating ratings as precise PDs rather than ordinal rankings.
- Calling agency ratings point-in-time; agencies aim for through-the-cycle stability.

## Key takeaways
- Ratings rank credit quality; BBB−/Baa3 is the lowest investment grade.
- Transition matrices give migration and default probabilities; multiply them to extend horizons.
- Multi-year PDs exceed simple compounding because issuers can be downgraded first.
- TTC ratings are stable but lag; PIT measures are timely but procyclical.
- Internal ratings cover unrated borrowers and drive IRB capital, so they need validation.
- Rating momentum, cycle dependence and issuer-pays conflicts limit ratings.
