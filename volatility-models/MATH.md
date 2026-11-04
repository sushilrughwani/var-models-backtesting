# MATH — every formula in three forms

Every formula below is given three ways:

1. the **equation**
2. **one sentence in plain English**
3. a **tiny worked example**

All worked-example numbers come from running:

```bash
python -m src.worked_examples
```

They use 5 illustrative prices, $P = (100,\ 102,\ 99,\ 100,\ 103)$. These are teaching numbers, not market data.

That gives 4 daily log returns (in %), which every example reuses:

$$r = (1.9803,\ -2.9853,\ 1.0050,\ 2.9559)$$

---

## 1. Log return

$$r_t = \ln\left(\frac{P_t}{P_{t-1}}\right)$$

**Plain English:** the continuously compounded % change from yesterday's price to today's.

**Example:** $\ln(102/100) = 0.019803 = 1.9803\%$ and $\ln(99/102) = -2.9853\%$. Log returns add up over time: $1.9803 - 2.9853 + 1.0050 + 2.9559 = 2.9559\% = \ln(103/100)$.

---

## 2. Mean, variance, standard deviation, annualisation

$$\bar r = \frac{1}{n}\sum_t r_t, \qquad s^2 = \frac{1}{n-1}\sum_t (r_t-\bar r)^2, \qquad \sigma_{annual} = s\sqrt{252}$$

**Plain English:** volatility is the typical size of a daily deviation from the average. Scaling by $\sqrt{252}$ turns daily vol into yearly vol, if days are independent.

**Example:**

- $\bar r = 0.7390\%$
- $s^2 = 6.7988\ \%^2$
- $s = 2.6075\%$ daily
- $2.6075\times\sqrt{252} = 41.39\%$ annualised

---

## 3. Skewness and excess kurtosis

$$S = \frac{\frac1n\sum (r_t-\bar r)^3}{\sigma^3}, \qquad K = \frac{\frac1n\sum (r_t-\bar r)^4}{\sigma^4} - 3$$

**Plain English:**

- $S < 0$ means the left tail (crashes) is longer.
- $K > 0$ means extreme days are more frequent than under a normal distribution. A normal distribution has $S = 0$ and $K = 0$.

**Example (population moments):** $S = -0.8431$, $K = -0.8951$. Four points are far too few to show fat tails. With about 2,900 real days, $K$ is typically far above 0.

---

## 4. Jarque–Bera test

$$JB = \frac{n}{6}\left(S^2 + \frac{K^2}{4}\right) \sim \chi^2_2 \text{ under } H_0: \text{normality}$$

**Plain English:** combines skewness and kurtosis into one number; a large JB (tiny p-value) rejects normality.

**Example:** $JB = \frac{4}{6}\left(0.8431^2 + \frac{0.8951^2}{4}\right) = 0.6074$, which gives p-value $= 0.738$. That does not reject normality, but n = 4 has no power. `jarque_bera_manual` is asserted equal to `scipy.stats.jarque_bera`.

---

## 5. z-scores and normal tail probability

$$z_t = \frac{r_t - \bar r}{s}, \qquad P(|Z| > k) = 2\,(1-\Phi(k))$$

**Plain English:** how many standard deviations a day is from the mean, and how often a normal distribution says that should happen.

**Example:** $P(|Z|>4) = 6.3\times10^{-5}$, i.e. one day in about 15,787 trading days (about 63 years). `tail_exceedances` counts how many 4σ days actually occurred.

---

## 6. Autocorrelation (ACF)

$$\rho_k = \frac{\sum_t (x_t-\bar x)(x_{t-k}-\bar x)}{\sum_t (x_t-\bar x)^2}$$

**Plain English:** the correlation of a series with itself k days earlier.

- For returns, $\rho_k \approx 0$: direction is hard to predict.
- For squared returns, $\rho_k > 0$: big days follow big days. That is volatility clustering.

**Example (lag 1, our 4 returns):** $\rho_1 = -0.2463$. Under $H_0$ the 95% band is $\pm 1.96/\sqrt{n}$.

---

## 7. Ljung–Box test

$$Q = n(n+2)\sum_{k=1}^{m}\frac{\rho_k^2}{n-k} \sim \chi^2_m \text{ under } H_0: \rho_1=\dots=\rho_m=0$$

**Plain English:** tests whether the first m autocorrelations are jointly zero; applied to $r_t^2$ it is a formal test of volatility clustering.

**Example (m = 1):** $Q = 4\cdot6\cdot\frac{0.2463^2}{3} = 0.4854$, which gives p-value $= 0.486$.

---

## 8. Leverage correlation

$$\text{corr}\left(r_t,\ r_{t+1}^2\right)$$

**Plain English:** a negative value means falls today are followed by bigger squared moves tomorrow than rises are.

**Example (3 pairs):** the pairs $(r_t, r_{t+1}^2)$ are $(1.98, 8.91)$, $(-2.99, 1.01)$ and $(1.01, 8.74)$. Their correlation is $+0.986$. A toy sample can have either sign; on real equity data it is typically negative.

---

## 9. Rolling (historical) volatility

$$\sigma_t(N) = \sqrt{\frac{1}{N-1}\sum_{i=0}^{N-1}(r_{t-i}-\bar r)^2}, \qquad \hat\sigma_{t+1} = \sigma_t(N)$$

**Plain English:** the standard deviation of the last N days, each weighted equally. It is used as tomorrow's forecast.

**Example (N = 3, last three returns):** $\text{std}(-2.9853,\ 1.0050,\ 2.9559) = 3.0284\%$.

**Ghost effect:** a crash day keeps this value high for exactly N days. The estimate then drops abruptly when the crash day leaves the window, although nothing happened in the market that day.

---

## 10. EWMA (RiskMetrics) recursion

$$\sigma_t^2 = \lambda\,\sigma_{t-1}^2 + (1-\lambda)\,r_{t-1}^2, \qquad \lambda = 0.94$$

**Plain English:** today's variance forecast is 94% of yesterday's forecast plus 6% of yesterday's squared return.

**Initialisation:** $\sigma_1^2 = r_0^2$. This uses no future data, and its weight $\lambda^t$ vanishes ($0.94^{250} \approx 2\times10^{-7}$).

**Example (%²):**

| t | Calculation | $\sigma_t^2$ |
|---|-------------|--------------|
| 1 | $r_0^2 = 1.9803^2$ | 3.9214 |
| 2 | $0.94\cdot3.9214 + 0.06\cdot2.9853^2$ | 4.2209 |
| 3 | $0.94\cdot4.2209 + 0.06\cdot1.0050^2$ | 4.0282 |

Annualised: $\sqrt{4.0282\cdot252} = 31.86\%$. `ewma_variance` asserts the loop equals `(r**2).ewm(alpha=1-λ, adjust=False).mean().shift(1)`.

---

## 11. EWMA weights and half-life

$$\sigma_t^2 = \sum_{k\ge1} w_k\, r_{t-k}^2, \qquad w_k = (1-\lambda)\lambda^{k-1}, \qquad h_{1/2} = \frac{\ln 0.5}{\ln\lambda}$$

**Plain English:** the squared return k days ago gets a geometrically shrinking weight; after $h_{1/2}$ days a shock's weight has halved.

**Example (λ = 0.94):**

- $w_1 = 0.06$, $w_2 = 0.0564$, $w_3 = 0.0530$
- $h_{1/2} = \ln 0.5/\ln 0.94 = 11.2$ days

For λ = 0.90 the half-life is 6.6 days; for λ = 0.97 it is 22.8 days.

---

## 12. GARCH(1,1) recursion

$$\sigma_t^2 = \omega + \alpha\,r_{t-1}^2 + \beta\,\sigma_{t-1}^2$$

**Plain English:** tomorrow's variance is a constant, plus a reaction to today's shock (α), plus memory of today's variance (β).

**Backcast:** for t = 0 we need $r_{-1}^2$ and $\sigma_{-1}^2$. We set both to the sample variance (5.0991 %²).

**Example (returns in %, ω = 0.02, α = 0.08, β = 0.90):**

| t | Calculation | $\sigma_t^2$ (%²) |
|---|-------------|-------------------|
| 0 | $0.02 + 0.98\cdot5.0991$ | 5.0171 |
| 1 | $0.02 + 0.08\cdot1.9803^2 + 0.90\cdot5.0171$ | 4.8491 |
| 2 | (same recursion) | 5.0972 |
| 3 | (same recursion) | 4.6883 |

---

## 13. Normal log-likelihood of GARCH

$$\ln L(\omega,\alpha,\beta) = -\frac12\sum_{t}\left[\ln(2\pi) + \ln\sigma_t^2 + \frac{r_t^2}{\sigma_t^2}\right]$$

**Plain English:** how probable the observed returns are if each day is normal with variance $\sigma_t^2$. Maximum likelihood picks the (ω, α, β) that make it largest. We minimise $-\ln L$ with `scipy.optimize.minimize` (SLSQP), subject to ω > 0, α ≥ 0, β ≥ 0 and α + β < 1.

**Example (day 0):** $-\frac12[1.8379 + \ln 5.0171 + 3.9214/5.0171] = -2.1162$.

- The four daily terms are −2.1162, −2.6273, −1.8324 and −2.6233.
- $\ln L = -9.1991$.
- A day with a big $r_t^2$ relative to $\sigma_t^2$ costs likelihood, so the optimiser raises α to let variance react.

---

## 14. Why α + β < 1 (stationarity)

Take expectations of the recursion. In the long run, $E[r_t^2] = E[\sigma_t^2] = V$:

$$V = \omega + \alpha V + \beta V \;\Rightarrow\; V(1-\alpha-\beta) = \omega \;\Rightarrow\; V = \frac{\omega}{1-\alpha-\beta}$$

**Plain English:** with ω > 0, a positive and finite long-run variance exists only if α + β < 1. If α + β ≥ 1, a shock never dies out and the expected variance grows or wanders without a level to return to (the IGARCH/EWMA case is exactly α + β = 1).

**Example:** α + β = 0.98, ω = 0.02 gives V = 0.02/0.02 = 1 %². With α + β = 1, V = 0.02/0 is undefined.

---

## 15. Persistence, long-run variance and vol, half-life

$$p = \alpha+\beta, \qquad V_L = \frac{\omega}{1-p}, \qquad \sigma_{L,annual} = \frac{\sqrt{V_L}}{100}\sqrt{252}, \qquad h_{1/2} = \frac{\ln 0.5}{\ln p}$$

**Plain English:**

- **Persistence** is how much of today's variance shock is still there tomorrow.
- $V_L$ is the level variance reverts to.
- The **half-life** is the number of days for a shock to decay by half.

**Example (ω = 0.02, α = 0.08, β = 0.90):**

- $p = 0.98$
- $V_L = 1\ \%^2$, i.e. daily vol 1%
- long-run annual vol $= 0.01\cdot\sqrt{252} = 15.87\%$
- $h_{1/2} = \ln0.5/\ln0.98 = 34.3$ days

---

## 16. Volatility term structure (multi-step forecast)

$$E_t[\sigma^2_{t+h}] = V_L + p^{\,h-1}\left(\sigma^2_{t+1} - V_L\right)$$

**Plain English:** the gap between today's forecast and the long-run level shrinks by a factor p every day, so forecasts converge to $V_L$.

**Example (start $\sigma^2_{t+1} = 4$, $V_L = 1$, p = 0.98):**

| Horizon h | Calculation | $E_t[\sigma^2_{t+h}]$ |
|-----------|-------------|-----------------------|
| 1 | — | 4.0 |
| 2 | $1 + 0.98\cdot3$ | 3.94 |
| 10 | — | 3.50 |
| 60 | — | 1.91 |

The code asserts this formula equals `arch`'s `forecast()`.

---

## 17. EWMA is a special case of GARCH

$$\omega = 0,\quad \alpha = 1-\lambda,\quad \beta = \lambda \;\Rightarrow\; \sigma_t^2 = (1-\lambda)r_{t-1}^2 + \lambda\sigma_{t-1}^2$$

**Plain English:** EWMA is a GARCH with no constant and persistence exactly 1. It therefore has no long-run level and no mean reversion: its multi-step forecast is flat at today's value.

**Example:** with λ = 0.94, set α = 0.06, β = 0.94, ω = 0. Using backcast $r_0^2$, `garch_variance` reproduces 3.9214, 4.2209, 4.0282 exactly; `main.py` asserts this on the real data.

---

## 18. Scaling returns by 100

$$\tilde r_t = 100\,r_t \;\Rightarrow\; \tilde\omega = 100^2\,\omega, \qquad \tilde\alpha = \alpha, \qquad \tilde\beta = \beta$$

**Plain English:** working in percent makes ω about 0.02 instead of about 0.000002, so all parameters have similar size and the optimiser's tolerances and finite-difference steps behave.

**Example:** daily variance $1\times10^{-4}$ (1% vol) becomes 1 %². An ω of 0.02 %² equals $2\times10^{-6}$ in decimal units.

---

## 19. Student-t errors

$$r_t = \sigma_t z_t, \qquad z_t \sim \text{standardised } t_\nu \;(\text{variance } 1,\ \nu > 2)$$

**Plain English:** keep the GARCH variance, but let the daily shock have fatter tails than the normal. A small ν means fat tails; as ν → ∞ the shock becomes normal.

**Example (1% quantile):**

- normal: $-2.326$
- unit-variance $t_5$: $t_{5,0.01}\sqrt{3/5} = -2.606$

The 1-in-100 bad day is about 12% worse under $t_5$.

---

## 20. AIC and BIC

$$AIC = 2k - 2\ln L, \qquad BIC = k\ln n - 2\ln L$$

**Plain English:** goodness of fit penalised by the number of parameters k; lower is better. BIC penalises extra parameters more once n > 7.

**Example (ln L = −9.1991, k = 3, n = 4):**

- $AIC = 6 + 18.398 = 24.398$
- $BIC = 3\ln4 + 18.398 = 22.557$

---

## 21. t-statistic

$$t = \frac{\hat\theta}{SE(\hat\theta)}, \qquad \text{p-value} = 2(1-\Phi(|t|))$$

**Plain English:** how many standard errors an estimate is from zero; $|t| > 1.96$ means significant at 5%.

**Example:** $\hat\alpha = 0.08$, SE = 0.02 gives t = 4.0, which is significant.

---

## 22. GJR-GARCH(1,1)

$$\sigma_t^2 = \omega + (\alpha + \gamma I_{t-1})\,r_{t-1}^2 + \beta\,\sigma_{t-1}^2, \qquad I_{t-1} = 1 \text{ if } r_{t-1}<0$$

**Plain English:** a negative return adds an extra γ of reaction, so bad news raises volatility more than good news of the same size (the leverage effect).

**Example (ω = 0.02, α = 0.08, γ = 0.10, β = 0.90, $\sigma^2_{t-1} = 1$):**

- after $r = -2\%$: $0.02 + 0.18\cdot4 + 0.90 = 1.64$
- after $r = +2\%$: $0.02 + 0.08\cdot4 + 0.90 = 1.24$

**Long run:** $V_L = \omega/(1-\alpha-\gamma/2-\beta)$, because $I = 1$ on about half the days. With α = 0.05, γ = 0.10, β = 0.88: $V_L = 0.02/0.02 = 1$.

---

## 23. News impact curve

$$NIC(r) = \omega + (\alpha + \gamma\,\mathbb 1[r<0])\,r^2 + \beta\,V_L$$

**Plain English:** tomorrow's variance plotted against today's return, holding yesterday's variance at its long-run level.

- For GARCH (γ = 0) it is a symmetric parabola.
- For GJR it is steeper on the left.

**Example:** the numbers in §22 are two points of this curve: 1.64 at −2% and 1.24 at +2%. The test asserts $NIC(-2) - NIC(+2) = \gamma\cdot 4$.

---

## 24. Parkinson range-based variance

$$\sigma^2_{P} = \frac{1}{4\ln 2}\left(\ln\frac{H}{L}\right)^2, \qquad \sigma_{P,t}(N) = \sqrt{\frac1N\sum_{i=0}^{N-1}\sigma^2_{P,t-i}}$$

**Plain English:** the day's high–low range of a random walk is proportional to its volatility. The constant $1/(4\ln2) \approx 0.3607$ makes it unbiased.

**Example:** with (H, L) = (102.5, 100), (101, 98.5), (100.5, 98.8), (103.5, 99.8):

- daily $\sigma^2_P$ = 2.199, 2.266, 1.050, 4.780 %²
- 4-day Parkinson vol = 1.604%
- zero-mean close-to-close vol on the same days = 2.376%

The toy ranges were chosen independently. On real data the ratio Parkinson / close-to-close falls below 1 when overnight gaps are large.

**Efficiency:** for a driftless continuous random walk, $\text{Var}(\sigma^2_P) \approx \text{Var}(r^2)/5.2$. 20 days of ranges are about as precise as about 100 days of closes.

**Limitations:**

- it misses the overnight gap (previous close to today's open)
- it assumes zero drift
- discrete prices bias the observed range down
- it needs clean High/Low data

---

## 25. MSE loss

$$MSE = \frac1T\sum_t \left(RV_t - h_t\right)^2, \qquad RV_t = r_t^2$$

**Plain English:** the average squared gap between realised variance and the forecast variance.

**Example (%²):** $RV = (3.92,\ 8.91,\ 1.01,\ 8.74)$ and $h = (2,\ 3,\ 4,\ 3.5)$ give $MSE = 18.753$.

---

## 26. QLIKE loss

$$QLIKE = \frac1T\sum_t \left(\frac{RV_t}{h_t} + \ln h_t\right)$$

**Plain English:** a loss based on the normal likelihood that depends on the ratio $RV/h$. It punishes under-prediction more than over-prediction, and it is lowest when $h = RV$.

**Example:**

- the 4 days above give $QLIKE = 3.0278$
- if RV = 2, the best forecast h = 2 gives 1.693
- h = 4 (over by ×2) gives 1.886
- h = 1 (under by ×2) gives 2.000, the larger penalty

---

## 27. Why QLIKE is more robust to a noisy proxy

$r_t^2$ is an unbiased but very noisy proxy for the true variance: $r_t^2 = \sigma_t^2 z_t^2$, and $z_t^2$ ranges from about 0 to more than 10.

Patton (2011) shows that MSE and QLIKE are the two common losses that still rank forecasts correctly, in expectation, when an unbiased noisy proxy replaces the true variance.

In finite samples, though:

- MSE squares variance errors, so it is dominated by a handful of crash days. Its noise scales like $\sigma^4 z^4$, and one 10% day contributes about 10,000 %⁴.
- QLIKE uses $RV/h$, which is scale-free, so calm and turbulent periods count comparably. Model rankings are much more stable.

**Example:** in §25 the two big days (8.91, 8.74) contribute 83% of the MSE sum.

---

## 28. Mincer–Zarnowitz regression

$$RV_t = a + b\,h_t + e_t, \qquad H_0: a = 0,\ b = 1$$

**Plain English:**

- An unbiased, efficient forecast should predict realised variance one-for-one.
- b < 1 means the forecast moves too much: it over-reacts.
- $R^2$ is the share of the variation in RV that the forecast explains.
- We use HAC (Newey–West) standard errors and an F-test of a = 0, b = 1.

**Example (the 4 points of §25):** a = 7.60, b = −0.62, $R^2$ = 0.019. A toy sample this small means nothing; it only shows the mechanics. With $RV = r^2$ the $R^2$ is low even for a good model, because the proxy is so noisy.
