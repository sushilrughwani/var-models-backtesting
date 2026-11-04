/**
 * Formula library: original explanations of core CFA / FRM / modelling formulas.
 * LaTeX is rendered with KaTeX; every latex string uses String.raw so backslashes need no escaping.
 * `calculator` links to a slug in lib/calculators/types.ts (CALCULATOR_SLUGS).
 */
import type { Formula } from "@/lib/data/types";

const L1 = "cfa-level-1";
const FRM = "frm-part-1";
const FM = "financial-modeling";
const XL = "excel-for-finance";
const PY = "python-for-finance";

type Var = { symbol: string; meaning: string };
const v = (symbol: string, meaning: string): Var => ({ symbol, meaning });

export const formulaGroups: string[] = [
  "Time Value of Money & Returns",
  "Statistics & Probability",
  "Hypothesis Testing & Regression",
  "Economics & Currencies",
  "Corporate Finance",
  "Financial Statement Analysis",
  "Equity Valuation",
  "Fixed Income",
  "Derivatives",
  "Options",
  "Portfolio Management & Performance",
  "Market Risk (VaR & Volatility)",
  "Credit Risk",
  "Excel & Modeling",
];

const TVM = "Time Value of Money & Returns";
const STATS = "Statistics & Probability";
const HT = "Hypothesis Testing & Regression";
const ECON = "Economics & Currencies";
const CORP = "Corporate Finance";
const FSA = "Financial Statement Analysis";
const EQ = "Equity Valuation";
const FI = "Fixed Income";
const DER = "Derivatives";
const OPT = "Options";
const PM = "Portfolio Management & Performance";
const MR = "Market Risk (VaR & Volatility)";
const CR = "Credit Risk";
const EXL = "Excel & Modeling";

export const formulas: Formula[] = [
  // ---------------------------------------------------------------- Time Value of Money & Returns
  {
    id: "future-value-lump-sum",
    name: "Future value of a single sum",
    group: TVM,
    courses: [L1, XL, PY],
    latex: String.raw`FV_N = PV\,(1+r)^N`,
    variables: [
      v(String.raw`FV_N`, "Value after N periods"),
      v(String.raw`PV`, "Amount invested today"),
      v(String.raw`r`, "Interest rate per period"),
      v(String.raw`N`, "Number of compounding periods"),
    ],
    intuition:
      "Each period the balance grows by the factor (1 + r), and interest is earned on prior interest. Repeating that growth N times gives the exponent, which is why long horizons produce dramatically larger values.",
    calculator: "tvm",
  },
  {
    id: "present-value-lump-sum",
    name: "Present value of a single sum",
    group: TVM,
    courses: [L1, XL, PY],
    latex: String.raw`PV = \frac{FV_N}{(1+r)^N}`,
    variables: [
      v(String.raw`PV`, "Value today"),
      v(String.raw`FV_N`, "Cash flow received at time N"),
      v(String.raw`r`, "Discount rate per period"),
      v(String.raw`N`, "Number of periods until receipt"),
    ],
    intuition:
      "Discounting simply runs compounding backwards: it asks how much you would need to invest today to end up with the future amount. Higher rates or longer waits shrink the present value.",
    calculator: "tvm",
  },
  {
    id: "continuous-compounding",
    name: "Continuous compounding",
    group: TVM,
    courses: [L1, FRM, PY],
    latex: String.raw`FV = PV\,e^{r_c T}`,
    variables: [
      v(String.raw`r_c`, "Continuously compounded annual rate"),
      v(String.raw`T`, "Time in years"),
      v(String.raw`e`, "Euler's number, about 2.71828"),
    ],
    intuition:
      "As compounding becomes more and more frequent, the factor (1 + r/m) raised to mT converges to the exponential. It is the natural limit of compounding and makes multi-period maths additive in the exponent.",
  },
  {
    id: "effective-annual-rate",
    name: "Effective annual rate (EAR)",
    group: TVM,
    courses: [L1, XL],
    latex: String.raw`EAR = \left(1 + \frac{r_s}{m}\right)^m - 1`,
    variables: [
      v(String.raw`r_s`, "Stated (quoted) annual rate"),
      v(String.raw`m`, "Compounding periods per year"),
    ],
    intuition:
      "A quoted annual rate is split into m smaller periodic rates that each compound on the last. The EAR states the true one-year growth so that rates with different compounding frequencies can be compared fairly.",
    calculator: "tvm",
  },
  {
    id: "pv-ordinary-annuity",
    name: "Present value of an ordinary annuity",
    group: TVM,
    courses: [L1, XL, FM],
    latex: String.raw`PV = PMT \cdot \frac{1 - (1+r)^{-N}}{r}`,
    variables: [
      v(String.raw`PMT`, "Level payment at the end of each period"),
      v(String.raw`r`, "Periodic discount rate"),
      v(String.raw`N`, "Number of payments"),
    ],
    intuition:
      "An annuity is a perpetuity starting now minus a perpetuity starting after N periods. The bracketed factor captures that difference, so it is a compact sum of N separately discounted payments.",
    calculator: "tvm",
  },
  {
    id: "fv-ordinary-annuity",
    name: "Future value of an ordinary annuity",
    group: TVM,
    courses: [L1, XL],
    latex: String.raw`FV_N = PMT \cdot \frac{(1+r)^N - 1}{r}`,
    variables: [
      v(String.raw`PMT`, "Level payment at the end of each period"),
      v(String.raw`r`, "Periodic interest rate"),
      v(String.raw`N`, "Number of payments"),
    ],
    intuition:
      "Each deposit compounds for a different number of periods: the first for N - 1, the last for zero. Summing that geometric series gives the closed-form factor.",
    calculator: "tvm",
  },
  {
    id: "annuity-due",
    name: "Annuity due adjustment",
    group: TVM,
    courses: [L1, XL],
    latex: String.raw`PV_{\text{due}} = PV_{\text{ordinary}}\,(1+r)`,
    variables: [
      v(String.raw`PV_{\text{due}}`, "Value when payments occur at the start of each period"),
      v(String.raw`PV_{\text{ordinary}}`, "Value when payments occur at the end of each period"),
      v(String.raw`r`, "Periodic rate"),
    ],
    intuition:
      "Shifting every payment one period earlier means each is discounted one period less. That is the same as multiplying the whole ordinary annuity by one period of growth.",
    calculator: "tvm",
  },
  {
    id: "pv-perpetuity",
    name: "Present value of a perpetuity",
    group: TVM,
    courses: [L1, FM],
    latex: String.raw`PV = \frac{PMT}{r}`,
    variables: [
      v(String.raw`PMT`, "Level payment received forever, first one in one period"),
      v(String.raw`r`, "Periodic discount rate"),
    ],
    intuition:
      "If you deposit PV at rate r, you can withdraw exactly r times PV each period forever without touching the principal. Rearranging gives the price of an endless level payment stream.",
    calculator: "tvm",
  },
  {
    id: "pv-growing-annuity",
    name: "Present value of a growing annuity",
    group: TVM,
    courses: [L1, FM],
    latex: String.raw`PV = \frac{PMT_1}{r-g}\left[1 - \left(\frac{1+g}{1+r}\right)^N\right]`,
    variables: [
      v(String.raw`PMT_1`, "First payment, received in one period"),
      v(String.raw`g`, "Growth rate of payments per period"),
      v(String.raw`r`, "Discount rate per period"),
      v(String.raw`N`, "Number of payments"),
    ],
    intuition:
      "It is a growing perpetuity minus the part of it that starts after period N. As N grows large and r exceeds g, the bracket tends to one and the formula collapses to the growing perpetuity.",
  },
  {
    id: "loan-payment",
    name: "Level loan payment",
    group: TVM,
    courses: [L1, XL, FM],
    latex: String.raw`PMT = \frac{PV \cdot r}{1 - (1+r)^{-N}}`,
    variables: [
      v(String.raw`PV`, "Loan principal"),
      v(String.raw`r`, "Periodic interest rate"),
      v(String.raw`N`, "Number of payments"),
    ],
    intuition:
      "The lender wants the present value of all payments to equal the amount lent. Inverting the annuity factor gives the single payment that achieves this, which is what the Excel PMT function computes.",
    calculator: "loan-amortization",
  },
  {
    id: "net-present-value",
    name: "Net present value (NPV)",
    group: TVM,
    courses: [L1, FM, XL, PY],
    latex: String.raw`NPV = \sum_{t=0}^{N} \frac{CF_t}{(1+r)^t}`,
    variables: [
      v(String.raw`CF_t`, "Net cash flow at time t (CF_0 is usually the negative outlay)"),
      v(String.raw`r`, "Required rate of return"),
      v(String.raw`N`, "Final period"),
    ],
    intuition:
      "Bringing every cash flow to today's money lets you add them up honestly. A positive NPV means the project returns more than the required rate, so it adds value.",
    calculator: "npv-irr",
  },
  {
    id: "internal-rate-of-return",
    name: "Internal rate of return (IRR)",
    group: TVM,
    courses: [L1, FM, XL, PY],
    latex: String.raw`0 = \sum_{t=0}^{N} \frac{CF_t}{(1+IRR)^t}`,
    variables: [
      v(String.raw`CF_t`, "Net cash flow at time t"),
      v(String.raw`IRR`, "Discount rate that makes NPV zero"),
    ],
    intuition:
      "The IRR is the break-even discount rate: the project's own implied return. It is found by trial and error, and a project is attractive when its IRR exceeds the cost of capital, subject to the usual caveats with unconventional cash flows.",
    calculator: "npv-irr",
  },
  {
    id: "holding-period-return",
    name: "Holding period return",
    group: TVM,
    courses: [L1, PY],
    latex: String.raw`HPR = \frac{P_1 - P_0 + D_1}{P_0}`,
    variables: [
      v(String.raw`P_0`, "Price at the start"),
      v(String.raw`P_1`, "Price at the end"),
      v(String.raw`D_1`, "Income received during the period"),
    ],
    intuition:
      "Total return combines price change and cash income, both scaled by what you paid. It is the basic building block from which multi-period and annualised returns are constructed.",
    calculator: "holding-period-return",
  },
  {
    id: "arithmetic-mean-return",
    name: "Arithmetic mean return",
    group: TVM,
    courses: [L1, PY],
    latex: String.raw`\bar{R}_A = \frac{1}{T}\sum_{t=1}^{T} R_t`,
    variables: [
      v(String.raw`R_t`, "Return in period t"),
      v(String.raw`T`, "Number of periods"),
    ],
    intuition:
      "A simple average of periodic returns is the best estimate of a single future period's expected return. It ignores compounding, so it overstates the growth an investor actually experiences over many periods.",
    calculator: "arithmetic-geometric-mean",
  },
  {
    id: "geometric-mean-return",
    name: "Geometric mean return",
    group: TVM,
    courses: [L1, PY, XL],
    latex: String.raw`\bar{R}_G = \left[\prod_{t=1}^{T}(1+R_t)\right]^{1/T} - 1`,
    variables: [
      v(String.raw`R_t`, "Return in period t"),
      v(String.raw`T`, "Number of periods"),
    ],
    intuition:
      "It is the constant rate that would turn the starting value into the ending value over the same number of periods. Because volatility drags on compounded wealth, it is never higher than the arithmetic mean.",
    calculator: "arithmetic-geometric-mean",
  },
  {
    id: "time-weighted-return",
    name: "Time-weighted rate of return",
    group: TVM,
    courses: [L1],
    latex: String.raw`R_{TW} = \left[(1+HPR_1)(1+HPR_2)\cdots(1+HPR_n)\right]^{1/n} - 1`,
    variables: [
      v(String.raw`HPR_i`, "Return in sub-period i, measured between external cash flows"),
      v(String.raw`n`, "Number of sub-periods (years if annualising)"),
    ],
    intuition:
      "Splitting the record at each deposit or withdrawal removes the effect of the client's timing decisions. What remains measures the manager's skill, which is why it is the standard for performance reporting.",
    calculator: "holding-period-return",
  },
  {
    id: "money-weighted-return",
    name: "Money-weighted rate of return",
    group: TVM,
    courses: [L1, XL],
    latex: String.raw`\sum_{t=0}^{N} \frac{CF_t}{(1+MWR)^t} = 0`,
    variables: [
      v(String.raw`CF_t`, "Investor cash flow at t (contributions negative, withdrawals and ending value positive)"),
      v(String.raw`MWR`, "Money-weighted return, the IRR of the investor's flows"),
    ],
    intuition:
      "It is the IRR of the investor's own cash flows, so it rewards having more money invested in good periods. It reflects the investor's actual experience rather than the manager's skill alone.",
    calculator: "npv-irr",
  },
  {
    id: "annualized-return",
    name: "Annualising a periodic return",
    group: TVM,
    courses: [L1, PY],
    latex: String.raw`R_{\text{annual}} = (1 + R_{\text{period}})^{c} - 1`,
    variables: [
      v(String.raw`R_{\text{period}}`, "Return over one sub-period"),
      v(String.raw`c`, "Number of such periods in a year, e.g. 12 for monthly or 365/days"),
    ],
    intuition:
      "Compounding the periodic return as many times as it fits into a year converts it to an annual figure. This lets investments with different holding periods be compared on the same footing.",
  },
  {
    id: "fisher-real-return",
    name: "Real return (Fisher relation)",
    group: TVM,
    courses: [L1],
    latex: String.raw`(1 + r_{\text{nominal}}) = (1 + r_{\text{real}})(1 + \pi)`,
    variables: [
      v(String.raw`r_{\text{nominal}}`, "Return in money terms"),
      v(String.raw`r_{\text{real}}`, "Return in purchasing-power terms"),
      v(String.raw`\pi`, "Inflation rate"),
    ],
    intuition:
      "Your money grows by the nominal rate but prices grow by inflation, so purchasing power grows by the ratio of the two growth factors. For small rates, the real return is approximately the nominal rate minus inflation.",
  },
  {
    id: "log-return",
    name: "Continuously compounded (log) return",
    group: TVM,
    courses: [L1, FRM, PY],
    latex: String.raw`r_{t} = \ln\!\left(\frac{P_t}{P_{t-1}}\right) = \ln(1 + R_t)`,
    variables: [
      v(String.raw`P_t`, "Price at time t (including reinvested income)"),
      v(String.raw`R_t`, "Simple return over the period"),
    ],
    intuition:
      "Log returns add across time, so a multi-period log return is just the sum of single-period ones. That additivity is why risk models and Python analyses typically work with them.",
  },

  // ---------------------------------------------------------------- Statistics & Probability
  {
    id: "sample-variance",
    name: "Sample variance and standard deviation",
    group: STATS,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2, \qquad s = \sqrt{s^2}`,
    variables: [
      v(String.raw`X_i`, "Observation i"),
      v(String.raw`\bar{X}`, "Sample mean"),
      v(String.raw`n`, "Sample size"),
    ],
    intuition:
      "Squaring deviations stops positive and negative misses from cancelling and penalises large misses heavily. Dividing by n - 1 corrects for the fact that the sample mean was estimated from the same data, making the estimate unbiased.",
  },
  {
    id: "coefficient-of-variation",
    name: "Coefficient of variation",
    group: STATS,
    courses: [L1],
    latex: String.raw`CV = \frac{s}{\bar{X}}`,
    variables: [
      v(String.raw`s`, "Sample standard deviation"),
      v(String.raw`\bar{X}`, "Sample mean"),
    ],
    intuition:
      "It expresses risk per unit of average outcome, so datasets with different scales can be compared. A lower CV means less dispersion for each unit of mean return.",
  },
  {
    id: "sample-covariance",
    name: "Sample covariance",
    group: STATS,
    courses: [L1, FRM, PY],
    latex: String.raw`\text{Cov}(X,Y) = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})`,
    variables: [
      v(String.raw`X_i, Y_i`, "Paired observations"),
      v(String.raw`\bar{X}, \bar{Y}`, "Sample means"),
      v(String.raw`n`, "Number of pairs"),
    ],
    intuition:
      "When both variables tend to be above or below their means together, the products are positive and covariance is positive. Its units are awkward, which is why it is usually rescaled into a correlation.",
  },
  {
    id: "correlation-coefficient",
    name: "Correlation coefficient",
    group: STATS,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`\rho_{XY} = \frac{\text{Cov}(X,Y)}{\sigma_X\,\sigma_Y}`,
    variables: [
      v(String.raw`\text{Cov}(X,Y)`, "Covariance of X and Y"),
      v(String.raw`\sigma_X, \sigma_Y`, "Standard deviations"),
    ],
    intuition:
      "Dividing covariance by both standard deviations strips out units and bounds the result between -1 and +1. It measures only the strength of a linear relationship, not causation or non-linear links.",
  },
  {
    id: "sample-skewness",
    name: "Sample skewness",
    group: STATS,
    courses: [L1, FRM, PY],
    latex: String.raw`S_k \approx \frac{1}{n}\,\frac{\sum_{i=1}^{n}(X_i - \bar{X})^3}{s^3}`,
    variables: [
      v(String.raw`X_i`, "Observation i"),
      v(String.raw`\bar{X}`, "Sample mean"),
      v(String.raw`s`, "Sample standard deviation"),
    ],
    intuition:
      "Cubing deviations keeps their sign, so a long tail of large losses pushes skewness negative. Many asset returns are negatively skewed, which a normal model cannot capture.",
  },
  {
    id: "excess-kurtosis",
    name: "Sample excess kurtosis",
    group: STATS,
    courses: [L1, FRM, PY],
    latex: String.raw`K_E \approx \frac{1}{n}\,\frac{\sum_{i=1}^{n}(X_i - \bar{X})^4}{s^4} - 3`,
    variables: [
      v(String.raw`X_i`, "Observation i"),
      v(String.raw`s`, "Sample standard deviation"),
      v(String.raw`3`, "Kurtosis of the normal distribution"),
    ],
    intuition:
      "Raising deviations to the fourth power makes extreme observations dominate. Positive excess kurtosis means fatter tails than the normal, so normal-based VaR tends to understate extreme losses.",
  },
  {
    id: "expected-value",
    name: "Expected value and variance of a random variable",
    group: STATS,
    courses: [L1, FRM],
    latex: String.raw`E(X) = \sum_{i} p_i x_i, \qquad \sigma^2(X) = \sum_{i} p_i\,[x_i - E(X)]^2`,
    variables: [
      v(String.raw`p_i`, "Probability of outcome i"),
      v(String.raw`x_i`, "Value of outcome i"),
    ],
    intuition:
      "The expected value is a probability-weighted average of outcomes, the long-run mean if the experiment were repeated. Variance applies the same weighting to squared deviations from that mean.",
  },
  {
    id: "bayes-formula",
    name: "Bayes' formula",
    group: STATS,
    courses: [L1, FRM],
    latex: String.raw`P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}`,
    variables: [
      v(String.raw`P(A)`, "Prior probability of event A"),
      v(String.raw`P(B \mid A)`, "Likelihood of observing B if A is true"),
      v(String.raw`P(B)`, "Unconditional probability of B"),
    ],
    intuition:
      "New information B updates a prior belief about A in proportion to how much more likely B is when A is true. It is the formal way of revising probabilities as evidence arrives.",
  },
  {
    id: "total-probability",
    name: "Total probability rule",
    group: STATS,
    courses: [L1, FRM],
    latex: String.raw`P(A) = \sum_{i} P(A \mid S_i)\,P(S_i)`,
    variables: [
      v(String.raw`S_i`, "Mutually exclusive, exhaustive scenarios"),
      v(String.raw`P(A \mid S_i)`, "Probability of A in scenario i"),
    ],
    intuition:
      "If the world must be in exactly one of several scenarios, the chance of A is a weighted average of its chance in each one. It is often used to compute the denominator in Bayes' formula.",
  },
  {
    id: "binomial-probability",
    name: "Binomial probability",
    group: STATS,
    courses: [L1, FRM, PY],
    latex: String.raw`P(X = x) = \binom{n}{x} p^x (1-p)^{n-x}`,
    variables: [
      v(String.raw`n`, "Number of independent trials"),
      v(String.raw`x`, "Number of successes"),
      v(String.raw`p`, "Probability of success on each trial"),
    ],
    intuition:
      "Any specific sequence with x successes has probability p to the x times (1 - p) to the n - x. The binomial coefficient counts how many such sequences exist, for example how many ways VaR exceptions could fall across a backtest window.",
  },
  {
    id: "z-score",
    name: "Standardisation (z-score)",
    group: STATS,
    courses: [L1, FRM, PY],
    latex: String.raw`z = \frac{X - \mu}{\sigma}`,
    variables: [
      v(String.raw`X`, "Observed value"),
      v(String.raw`\mu`, "Population mean"),
      v(String.raw`\sigma`, "Population standard deviation"),
    ],
    intuition:
      "Subtracting the mean and dividing by the standard deviation measures how unusual an observation is in standard units. Any normal variable becomes a standard normal, so one table serves all.",
  },
  {
    id: "standard-error-mean",
    name: "Standard error of the sample mean",
    group: STATS,
    courses: [L1, FRM, PY],
    latex: String.raw`\sigma_{\bar{X}} = \frac{\sigma}{\sqrt{n}} \approx \frac{s}{\sqrt{n}}`,
    variables: [
      v(String.raw`\sigma`, "Population standard deviation"),
      v(String.raw`s`, "Sample standard deviation"),
      v(String.raw`n`, "Sample size"),
    ],
    intuition:
      "Averages are less noisy than single observations because independent errors partly cancel. The precision improves with the square root of sample size, so quadrupling the data halves the error.",
  },
  {
    id: "chebyshev-inequality",
    name: "Chebyshev's inequality",
    group: STATS,
    courses: [L1],
    latex: String.raw`P\big(|X - \mu| < k\sigma\big) \ge 1 - \frac{1}{k^2}, \quad k > 1`,
    variables: [
      v(String.raw`k`, "Number of standard deviations"),
      v(String.raw`\mu, \sigma`, "Mean and standard deviation"),
    ],
    intuition:
      "Whatever the shape of the distribution, only a limited share of observations can lie far from the mean. It gives a conservative floor, for example at least 75% within two standard deviations.",
  },

  // ---------------------------------------------------------------- Hypothesis Testing & Regression
  {
    id: "t-test-mean",
    name: "t-test for a population mean",
    group: HT,
    courses: [L1, FRM, PY],
    latex: String.raw`t_{n-1} = \frac{\bar{X} - \mu_0}{s/\sqrt{n}}`,
    variables: [
      v(String.raw`\bar{X}`, "Sample mean"),
      v(String.raw`\mu_0`, "Hypothesised mean"),
      v(String.raw`s`, "Sample standard deviation"),
      v(String.raw`n`, "Sample size (degrees of freedom n - 1)"),
    ],
    intuition:
      "The statistic measures how many standard errors the sample mean sits from the hypothesised value. If that distance is larger than chance would plausibly produce, the null is rejected.",
    calculator: "hypothesis-test",
  },
  {
    id: "z-test-mean",
    name: "z-test for a population mean",
    group: HT,
    courses: [L1, FRM],
    latex: String.raw`z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}}`,
    variables: [
      v(String.raw`\sigma`, "Known population standard deviation"),
      v(String.raw`\mu_0`, "Hypothesised mean"),
      v(String.raw`n`, "Sample size"),
    ],
    intuition:
      "When the population variance is known, or the sample is large, the standardised sample mean is approximately standard normal. Compare it to critical values such as 1.96 for a two-sided 5% test.",
    calculator: "hypothesis-test",
  },
  {
    id: "confidence-interval-mean",
    name: "Confidence interval for the mean",
    group: HT,
    courses: [L1, FRM, PY],
    latex: String.raw`\bar{X} \pm t_{\alpha/2}\,\frac{s}{\sqrt{n}}`,
    variables: [
      v(String.raw`t_{\alpha/2}`, "Critical value leaving α/2 in each tail"),
      v(String.raw`s/\sqrt{n}`, "Standard error of the mean"),
    ],
    intuition:
      "The interval spans a chosen number of standard errors either side of the estimate. Across repeated samples, intervals built this way contain the true mean with the stated frequency.",
    calculator: "hypothesis-test",
  },
  {
    id: "chi-square-variance-test",
    name: "Chi-square test of a variance",
    group: HT,
    courses: [L1, FRM],
    latex: String.raw`\chi^2_{n-1} = \frac{(n-1)\,s^2}{\sigma_0^2}`,
    variables: [
      v(String.raw`s^2`, "Sample variance"),
      v(String.raw`\sigma_0^2`, "Hypothesised variance"),
      v(String.raw`n`, "Sample size"),
    ],
    intuition:
      "If the true variance equals the hypothesised one, the ratio of sample to hypothesised variance scaled by n - 1 follows a chi-square distribution. Values far in either tail suggest the variance differs.",
  },
  {
    id: "f-test-variances",
    name: "F-test for equality of two variances",
    group: HT,
    courses: [L1, FRM],
    latex: String.raw`F = \frac{s_1^2}{s_2^2}, \quad df = (n_1 - 1,\; n_2 - 1)`,
    variables: [
      v(String.raw`s_1^2`, "Larger sample variance (placed in the numerator by convention)"),
      v(String.raw`s_2^2`, "Smaller sample variance"),
    ],
    intuition:
      "If two populations have the same variance, their sample variances should be similar and the ratio should be near one. A ratio well above one is evidence that the first population is more volatile.",
  },
  {
    id: "t-test-correlation",
    name: "t-test for a correlation coefficient",
    group: HT,
    courses: [L1, FRM],
    latex: String.raw`t_{n-2} = \frac{r\sqrt{n-2}}{\sqrt{1-r^2}}`,
    variables: [
      v(String.raw`r`, "Sample correlation"),
      v(String.raw`n`, "Number of observations"),
    ],
    intuition:
      "A sample correlation can look sizeable purely by chance in a small sample. The statistic grows with both the strength of the correlation and the sample size, testing whether the true correlation is zero.",
    calculator: "hypothesis-test",
  },
  {
    id: "ols-slope-intercept",
    name: "Simple regression slope and intercept",
    group: HT,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`\hat{b}_1 = \frac{\text{Cov}(X,Y)}{\text{Var}(X)}, \qquad \hat{b}_0 = \bar{Y} - \hat{b}_1 \bar{X}`,
    variables: [
      v(String.raw`\hat{b}_1`, "Estimated slope"),
      v(String.raw`\hat{b}_0`, "Estimated intercept"),
      v(String.raw`\bar{X}, \bar{Y}`, "Sample means"),
    ],
    intuition:
      "Ordinary least squares picks the line that minimises squared vertical errors. The slope is how much Y co-moves with X per unit of X's own variability, and the fitted line always passes through the point of means.",
  },
  {
    id: "coefficient-of-determination",
    name: "Coefficient of determination (R-squared)",
    group: HT,
    courses: [L1, FRM, PY],
    latex: String.raw`R^2 = \frac{SSR}{SST} = 1 - \frac{SSE}{SST}`,
    variables: [
      v(String.raw`SST`, "Total sum of squares of Y around its mean"),
      v(String.raw`SSR`, "Sum of squares explained by the regression"),
      v(String.raw`SSE`, "Sum of squared residuals"),
    ],
    intuition:
      "Total variation splits into an explained part and an unexplained part. R-squared is the explained share; in simple regression it equals the squared correlation between X and Y.",
  },
  {
    id: "adjusted-r-squared",
    name: "Adjusted R-squared",
    group: HT,
    courses: [L1, FRM, PY],
    latex: String.raw`\bar{R}^2 = 1 - \frac{n-1}{n-k-1}\,(1 - R^2)`,
    variables: [
      v(String.raw`n`, "Number of observations"),
      v(String.raw`k`, "Number of independent variables"),
      v(String.raw`R^2`, "Unadjusted R-squared"),
    ],
    intuition:
      "Plain R-squared never falls when you add a variable, even a useless one. The adjustment penalises extra regressors, so it rises only if a new variable explains enough to justify the lost degree of freedom.",
  },
  {
    id: "standard-error-of-estimate",
    name: "Standard error of estimate",
    group: HT,
    courses: [L1, FRM],
    latex: String.raw`SEE = \sqrt{\frac{SSE}{n-k-1}}`,
    variables: [
      v(String.raw`SSE`, "Sum of squared residuals"),
      v(String.raw`n`, "Observations"),
      v(String.raw`k`, "Number of slope coefficients (1 in simple regression)"),
    ],
    intuition:
      "It is the typical size of a residual, measured in the units of Y. A smaller SEE means the data cluster tightly around the fitted line.",
  },
  {
    id: "t-test-regression-coefficient",
    name: "t-test of a regression coefficient",
    group: HT,
    courses: [L1, FRM, PY],
    latex: String.raw`t = \frac{\hat{b}_j - B_j}{s_{\hat{b}_j}}, \quad df = n - k - 1`,
    variables: [
      v(String.raw`\hat{b}_j`, "Estimated coefficient"),
      v(String.raw`B_j`, "Hypothesised value, often zero"),
      v(String.raw`s_{\hat{b}_j}`, "Standard error of the coefficient"),
    ],
    intuition:
      "An estimated coefficient is itself a random variable. Dividing its distance from the hypothesised value by its standard error tells you whether the relationship is statistically distinguishable from that value.",
    calculator: "hypothesis-test",
  },
  {
    id: "regression-f-statistic",
    name: "Regression F-statistic",
    group: HT,
    courses: [L1, FRM],
    latex: String.raw`F = \frac{SSR/k}{SSE/(n-k-1)}`,
    variables: [
      v(String.raw`SSR`, "Explained sum of squares"),
      v(String.raw`SSE`, "Residual sum of squares"),
      v(String.raw`k`, "Number of slope coefficients"),
    ],
    intuition:
      "It compares explained variation per regressor with unexplained variation per remaining degree of freedom. A large F indicates the slopes are jointly significant rather than all zero.",
  },

  // ---------------------------------------------------------------- Economics & Currencies
  {
    id: "price-elasticity-demand",
    name: "Own-price elasticity of demand",
    group: ECON,
    courses: [L1],
    latex: String.raw`E_P = \frac{\%\Delta Q_d}{\%\Delta P} = \frac{\partial Q_d}{\partial P}\cdot\frac{P}{Q_d}`,
    variables: [
      v(String.raw`Q_d`, "Quantity demanded"),
      v(String.raw`P`, "Price of the good"),
    ],
    intuition:
      "Elasticity measures responsiveness in percentage terms, so it does not depend on units. When its absolute value exceeds one, demand is elastic and a price cut raises total revenue.",
  },
  {
    id: "gdp-expenditure",
    name: "GDP: expenditure approach",
    group: ECON,
    courses: [L1],
    latex: String.raw`GDP = C + I + G + (X - M)`,
    variables: [
      v(String.raw`C`, "Household consumption"),
      v(String.raw`I`, "Business investment"),
      v(String.raw`G`, "Government purchases"),
      v(String.raw`X - M`, "Net exports"),
    ],
    intuition:
      "Every final good produced is bought by someone: households, firms, the government or foreigners. Imports are subtracted because they are spending on output produced elsewhere.",
  },
  {
    id: "fiscal-multiplier",
    name: "Fiscal multiplier",
    group: ECON,
    courses: [L1],
    latex: String.raw`\text{Multiplier} = \frac{1}{1 - c\,(1-t)}`,
    variables: [
      v(String.raw`c`, "Marginal propensity to consume"),
      v(String.raw`t`, "Tax rate"),
    ],
    intuition:
      "Government spending becomes someone's income, part of which is spent again, creating further rounds of spending. Taxes and saving leak out at each round, so the geometric series converges to this factor.",
  },
  {
    id: "quantity-theory-money",
    name: "Quantity theory of money",
    group: ECON,
    courses: [L1],
    latex: String.raw`M V = P Y`,
    variables: [
      v(String.raw`M`, "Money supply"),
      v(String.raw`V`, "Velocity of money"),
      v(String.raw`P`, "Price level"),
      v(String.raw`Y`, "Real output"),
    ],
    intuition:
      "Total spending, money times how often it changes hands, must equal the nominal value of what is bought. If velocity and output are stable, faster money growth shows up as higher prices.",
  },
  {
    id: "money-multiplier",
    name: "Money multiplier",
    group: ECON,
    courses: [L1],
    latex: String.raw`\text{Money multiplier} = \frac{1}{\text{reserve requirement}}`,
    variables: [v(String.raw`\text{reserve requirement}`, "Fraction of deposits banks must hold as reserves")],
    intuition:
      "Banks lend out what they do not hold in reserve, and those loans are redeposited and lent again. With a 10% reserve ratio, each unit of new reserves can support up to ten units of deposits.",
  },
  {
    id: "covered-interest-parity",
    name: "Covered interest rate parity",
    group: ECON,
    courses: [L1, FRM],
    latex: String.raw`F_{P/B} = S_{P/B}\,\frac{1 + i_P\,\tau}{1 + i_B\,\tau}`,
    variables: [
      v(String.raw`F_{P/B}`, "Forward rate, price currency per unit of base currency"),
      v(String.raw`S_{P/B}`, "Spot rate, price currency per unit of base currency"),
      v(String.raw`i_P, i_B`, "Interest rates in the price and base currencies"),
      v(String.raw`\tau`, "Contract length as a fraction of a year (actual/360)"),
    ],
    intuition:
      "Investing domestically or converting, investing abroad and locking in the return with a forward must yield the same result, or arbitrage is possible. So the currency with the higher interest rate trades at a forward discount.",
    calculator: "covered-interest-parity",
  },
  {
    id: "forward-points",
    name: "Forward premium or discount (forward points)",
    group: ECON,
    courses: [L1],
    latex: String.raw`F_{P/B} - S_{P/B} = S_{P/B}\,\frac{(i_P - i_B)\,\tau}{1 + i_B\,\tau}`,
    variables: [
      v(String.raw`F_{P/B} - S_{P/B}`, "Forward premium (positive) or discount (negative) on the base currency"),
      v(String.raw`i_P - i_B`, "Interest rate differential"),
      v(String.raw`\tau`, "Year fraction"),
    ],
    intuition:
      "Subtracting spot from covered interest parity shows that the forward premium is driven by the interest differential. If the price currency pays more interest, the base currency trades at a forward premium.",
    calculator: "covered-interest-parity",
  },
  {
    id: "cross-rate",
    name: "Currency cross rate",
    group: ECON,
    courses: [L1],
    latex: String.raw`S_{A/C} = S_{A/B} \times S_{B/C}`,
    variables: [
      v(String.raw`S_{A/B}`, "Units of A per unit of B"),
      v(String.raw`S_{B/C}`, "Units of B per unit of C"),
    ],
    intuition:
      "Converting C into B and then B into A must cost the same as converting C directly into A. The intermediate currency cancels like a fraction, which prevents triangular arbitrage.",
  },
  {
    id: "uncovered-interest-parity",
    name: "Uncovered interest rate parity",
    group: ECON,
    courses: [L1],
    latex: String.raw`\%\Delta S^{e}_{P/B} \approx i_P - i_B`,
    variables: [
      v(String.raw`\%\Delta S^{e}_{P/B}`, "Expected percentage change in the spot rate"),
      v(String.raw`i_P, i_B`, "Interest rates in the price and base currencies"),
    ],
    intuition:
      "Without a forward hedge, a risk-neutral investor would only accept a lower interest rate if that currency is expected to appreciate by the difference. In practice it often fails, which is what carry trades exploit.",
  },
  {
    id: "relative-ppp",
    name: "Relative purchasing power parity",
    group: ECON,
    courses: [L1],
    latex: String.raw`\%\Delta S_{P/B} \approx \pi_P - \pi_B`,
    variables: [
      v(String.raw`\%\Delta S_{P/B}`, "Percentage change in the spot rate"),
      v(String.raw`\pi_P, \pi_B`, "Inflation in the price and base currency countries"),
    ],
    intuition:
      "A currency with higher inflation loses purchasing power, so over time it should depreciate by roughly the inflation gap. It is a long-run anchor rather than a short-term forecast.",
  },

  // ---------------------------------------------------------------- Corporate Finance
  {
    id: "wacc",
    name: "Weighted average cost of capital (WACC)",
    group: CORP,
    courses: [L1, FM, XL],
    latex: String.raw`WACC = w_d\,r_d\,(1-t) + w_p\,r_p + w_e\,r_e`,
    variables: [
      v(String.raw`w_d, w_p, w_e`, "Target market-value weights of debt, preferred and common equity"),
      v(String.raw`r_d`, "Pre-tax cost of debt"),
      v(String.raw`t`, "Marginal tax rate"),
      v(String.raw`r_p, r_e`, "Costs of preferred stock and common equity"),
    ],
    intuition:
      "A firm's assets are financed by a mix of claims, so the required return on the whole firm is the weighted blend of each claim's required return. Debt is cheaper after tax because interest is deductible.",
    calculator: "wacc",
  },
  {
    id: "cost-of-equity-capm",
    name: "Cost of equity (CAPM approach)",
    group: CORP,
    courses: [L1, FM],
    latex: String.raw`r_e = R_f + \beta_i\,[E(R_m) - R_f]`,
    variables: [
      v(String.raw`R_f`, "Risk-free rate"),
      v(String.raw`\beta_i`, "Equity beta of the company"),
      v(String.raw`E(R_m) - R_f`, "Equity market risk premium"),
    ],
    intuition:
      "Shareholders demand the risk-free rate plus compensation for the market risk they cannot diversify away. Beta scales the market premium to the stock's sensitivity.",
    calculator: "capm",
  },
  {
    id: "cost-of-equity-ddm",
    name: "Cost of equity (dividend discount approach)",
    group: CORP,
    courses: [L1, FM],
    latex: String.raw`r_e = \frac{D_1}{P_0} + g`,
    variables: [
      v(String.raw`D_1`, "Expected dividend next year"),
      v(String.raw`P_0`, "Current share price"),
      v(String.raw`g`, "Constant long-run dividend growth rate"),
    ],
    intuition:
      "Rearranging the constant-growth model shows that investors' return comes from the dividend yield plus the growth in value. It infers the required return implied by today's price.",
    calculator: "gordon-growth",
  },
  {
    id: "bond-yield-plus-risk-premium",
    name: "Bond yield plus risk premium",
    group: CORP,
    courses: [L1],
    latex: String.raw`r_e = r_d + RP`,
    variables: [
      v(String.raw`r_d`, "Yield on the company's long-term debt"),
      v(String.raw`RP`, "Additional premium for equity over the firm's debt"),
    ],
    intuition:
      "Equity holders stand behind bondholders in the capital structure, so they require more than the company's own borrowing rate. The approach anchors equity cost to an observable market yield.",
  },
  {
    id: "cost-of-preferred",
    name: "Cost of preferred stock",
    group: CORP,
    courses: [L1],
    latex: String.raw`r_p = \frac{D_p}{P_p}`,
    variables: [
      v(String.raw`D_p`, "Fixed preferred dividend"),
      v(String.raw`P_p`, "Current price of the preferred share"),
    ],
    intuition:
      "Non-callable, non-convertible preferred stock behaves like a perpetuity. Inverting the perpetuity value gives the yield investors require.",
  },
  {
    id: "levered-beta",
    name: "Levering and unlevering beta",
    group: CORP,
    courses: [L1, FM],
    latex: String.raw`\beta_L = \beta_U\left[1 + (1-t)\,\frac{D}{E}\right]`,
    variables: [
      v(String.raw`\beta_L`, "Equity (levered) beta"),
      v(String.raw`\beta_U`, "Asset (unlevered) beta"),
      v(String.raw`t`, "Tax rate"),
      v(String.raw`D/E`, "Debt-to-equity ratio"),
    ],
    intuition:
      "Debt concentrates the firm's business risk on a smaller equity base, so equity beta rises with leverage. Analysts unlever comparable betas to isolate business risk, then relever at the target capital structure.",
    calculator: "capm",
  },
  {
    id: "mm-proposition-2-taxes",
    name: "Modigliani-Miller Proposition II with taxes",
    group: CORP,
    courses: [L1],
    latex: String.raw`r_e = r_0 + (r_0 - r_d)(1-t)\,\frac{D}{E}`,
    variables: [
      v(String.raw`r_0`, "Cost of capital of an all-equity firm"),
      v(String.raw`r_d`, "Cost of debt"),
      v(String.raw`D/E`, "Debt-to-equity ratio"),
    ],
    intuition:
      "Shareholders bear more risk as leverage rises, so their required return climbs linearly with the debt-to-equity ratio. The tax shield dampens the increase, which is why WACC can fall with moderate leverage.",
  },
  {
    id: "mm-value-with-taxes",
    name: "Value of a levered firm (MM with taxes)",
    group: CORP,
    courses: [L1],
    latex: String.raw`V_L = V_U + t\,D`,
    variables: [
      v(String.raw`V_L, V_U`, "Values of levered and unlevered firms"),
      v(String.raw`t`, "Corporate tax rate"),
      v(String.raw`D`, "Value of permanent debt"),
    ],
    intuition:
      "Interest deductions save taxes every year, and for permanent debt their present value equals the tax rate times the debt. Ignoring distress costs, leverage therefore adds that tax shield to firm value.",
  },
  {
    id: "degree-operating-leverage",
    name: "Degree of operating leverage (DOL)",
    group: CORP,
    courses: [L1],
    latex: String.raw`DOL = \frac{\%\Delta EBIT}{\%\Delta Q} = \frac{Q(P - V)}{Q(P - V) - F}`,
    variables: [
      v(String.raw`Q`, "Units sold"),
      v(String.raw`P`, "Price per unit"),
      v(String.raw`V`, "Variable cost per unit"),
      v(String.raw`F`, "Fixed operating costs"),
    ],
    intuition:
      "Fixed costs do not change with volume, so once they are covered every extra sale flows strongly into operating profit. The more fixed costs relative to contribution margin, the more sensitive EBIT is to sales.",
  },
  {
    id: "degree-financial-leverage",
    name: "Degree of financial and total leverage",
    group: CORP,
    courses: [L1],
    latex: String.raw`DFL = \frac{EBIT}{EBIT - I}, \qquad DTL = DOL \times DFL`,
    variables: [
      v(String.raw`EBIT`, "Operating income"),
      v(String.raw`I`, "Interest expense"),
    ],
    intuition:
      "Fixed interest payments magnify changes in operating income into larger percentage changes in net income. Combining operating and financial leverage shows how sales shocks reach earnings per share.",
  },
  {
    id: "breakeven-quantity",
    name: "Breakeven quantity",
    group: CORP,
    courses: [L1, XL],
    latex: String.raw`Q_{BE} = \frac{F + C}{P - V}`,
    variables: [
      v(String.raw`F`, "Fixed operating costs"),
      v(String.raw`C`, "Fixed financing costs (interest)"),
      v(String.raw`P - V`, "Contribution margin per unit"),
    ],
    intuition:
      "Each unit sold contributes its price minus variable cost toward fixed costs. Breakeven is reached when enough units have been sold to cover all fixed costs; dropping C gives operating breakeven.",
  },
  {
    id: "profitability-index",
    name: "Profitability index",
    group: CORP,
    courses: [L1, FM],
    latex: String.raw`PI = \frac{PV(\text{future cash flows})}{\text{Initial investment}} = 1 + \frac{NPV}{\text{Initial investment}}`,
    variables: [
      v(String.raw`PV`, "Present value of future cash flows"),
      v(String.raw`NPV`, "Net present value"),
    ],
    intuition:
      "It measures value created per unit invested, which is useful when capital is rationed. A PI above one is equivalent to a positive NPV.",
    calculator: "npv-irr",
  },

  // ---------------------------------------------------------------- Financial Statement Analysis
  {
    id: "dupont-three-step",
    name: "DuPont analysis (three-step)",
    group: FSA,
    courses: [L1, FM, XL],
    latex: String.raw`ROE = \frac{NI}{\text{Revenue}} \times \frac{\text{Revenue}}{\text{Avg assets}} \times \frac{\text{Avg assets}}{\text{Avg equity}}`,
    variables: [
      v(String.raw`NI/\text{Revenue}`, "Net profit margin"),
      v(String.raw`\text{Revenue}/\text{Avg assets}`, "Asset turnover"),
      v(String.raw`\text{Avg assets}/\text{Avg equity}`, "Financial leverage (equity multiplier)"),
    ],
    intuition:
      "The intermediate terms cancel to leave net income over equity, but the split shows where returns come from. A high ROE driven by leverage is riskier than one driven by margins or efficiency.",
    calculator: "dupont",
  },
  {
    id: "dupont-five-step",
    name: "DuPont analysis (five-step)",
    group: FSA,
    courses: [L1, FM],
    latex: String.raw`ROE = \frac{NI}{EBT} \times \frac{EBT}{EBIT} \times \frac{EBIT}{\text{Revenue}} \times \frac{\text{Revenue}}{\text{Assets}} \times \frac{\text{Assets}}{\text{Equity}}`,
    variables: [
      v(String.raw`NI/EBT`, "Tax burden"),
      v(String.raw`EBT/EBIT`, "Interest burden"),
      v(String.raw`EBIT/\text{Revenue}`, "Operating margin"),
      v(String.raw`\text{Revenue}/\text{Assets}`, "Asset turnover"),
      v(String.raw`\text{Assets}/\text{Equity}`, "Equity multiplier"),
    ],
    intuition:
      "Splitting the profit margin further separates the effects of taxes, financing costs and operations. It shows, for example, whether higher leverage is helping ROE or being eaten by interest expense.",
    calculator: "dupont",
  },
  {
    id: "current-quick-ratios",
    name: "Current and quick ratios",
    group: FSA,
    courses: [L1, XL],
    latex: String.raw`\text{Current} = \frac{CA}{CL}, \qquad \text{Quick} = \frac{\text{Cash} + \text{ST investments} + \text{Receivables}}{CL}`,
    variables: [
      v(String.raw`CA`, "Current assets"),
      v(String.raw`CL`, "Current liabilities"),
    ],
    intuition:
      "Both compare resources that turn into cash within a year to obligations due within a year. The quick ratio excludes inventory and prepaid items, which may be slow or costly to convert.",
  },
  {
    id: "debt-to-equity",
    name: "Debt-to-equity ratio",
    group: FSA,
    courses: [L1, FM],
    latex: String.raw`\frac{D}{E} = \frac{\text{Total debt}}{\text{Total shareholders' equity}}`,
    variables: [
      v(String.raw`\text{Total debt}`, "Interest-bearing short- and long-term debt, including lease liabilities"),
      v(String.raw`\text{Equity}`, "Book value of equity"),
    ],
    intuition:
      "It measures how much of the firm is financed by creditors relative to owners. Higher values mean more fixed claims on cash flow and greater solvency risk.",
  },
  {
    id: "interest-coverage",
    name: "Interest coverage ratio",
    group: FSA,
    courses: [L1, FM],
    latex: String.raw`\text{Interest coverage} = \frac{EBIT}{\text{Interest expense}}`,
    variables: [
      v(String.raw`EBIT`, "Earnings before interest and taxes"),
      v(String.raw`\text{Interest expense}`, "Periodic interest cost"),
    ],
    intuition:
      "It shows how many times operating profit could pay the interest bill. Credit analysts watch it closely because low coverage leaves little cushion if profits fall.",
  },
  {
    id: "activity-ratios",
    name: "Inventory and receivables turnover",
    group: FSA,
    courses: [L1, XL],
    latex: String.raw`DOH = \frac{365}{COGS / \overline{\text{Inventory}}}, \qquad DSO = \frac{365}{\text{Revenue} / \overline{\text{Receivables}}}`,
    variables: [
      v(String.raw`DOH`, "Days of inventory on hand"),
      v(String.raw`DSO`, "Days sales outstanding"),
      v(String.raw`\overline{\text{Inventory}}`, "Average inventory"),
      v(String.raw`\overline{\text{Receivables}}`, "Average accounts receivable"),
    ],
    intuition:
      "Turnover counts how many times a balance is cycled through in a year; dividing 365 by it converts that into days. Fewer days usually means efficient working capital management.",
  },
  {
    id: "cash-conversion-cycle",
    name: "Cash conversion cycle",
    group: FSA,
    courses: [L1, FM, XL],
    latex: String.raw`CCC = DOH + DSO - DPO`,
    variables: [
      v(String.raw`DOH`, "Days of inventory on hand"),
      v(String.raw`DSO`, "Days sales outstanding"),
      v(String.raw`DPO`, "Days payables outstanding"),
    ],
    intuition:
      "Cash leaves when suppliers are paid and comes back when customers pay. The cycle counts how many days the firm must finance its operations in between; shorter is generally better.",
  },
  {
    id: "basic-eps",
    name: "Basic earnings per share",
    group: FSA,
    courses: [L1, FM],
    latex: String.raw`\text{Basic EPS} = \frac{NI - \text{Preferred dividends}}{\text{Weighted average shares outstanding}}`,
    variables: [
      v(String.raw`NI`, "Net income"),
      v(String.raw`\text{Preferred dividends}`, "Dividends owed to preferred shareholders"),
    ],
    intuition:
      "Only income left after preferred holders are paid belongs to common shareholders. Weighting shares by time outstanding matches the income earned over the period with the capital that earned it.",
  },
  {
    id: "diluted-eps",
    name: "Diluted earnings per share",
    group: FSA,
    courses: [L1, FM],
    latex: String.raw`\text{Diluted EPS} = \frac{NI - PD + PD_{\text{conv}} + INT_{\text{conv}}(1-t)}{WASO + N_{\text{conv pref}} + N_{\text{conv debt}} + N_{\text{TSM}}}`,
    variables: [
      v(String.raw`PD`, "Preferred dividends"),
      v(String.raw`PD_{\text{conv}}`, "Dividends on convertible preferred (saved on conversion)"),
      v(String.raw`INT_{\text{conv}}(1-t)`, "After-tax interest on convertible debt (saved on conversion)"),
      v(String.raw`N_{\text{TSM}}`, "Net new shares from options under the treasury stock method"),
    ],
    intuition:
      "It assumes every dilutive security converts, adding back the payments that would disappear and adding the new shares. Securities that would increase EPS are antidilutive and are excluded.",
  },
  {
    id: "fcff-from-cfo",
    name: "FCFF from cash flow from operations",
    group: FSA,
    courses: [L1, FM],
    latex: String.raw`FCFF = CFO + \text{Int}(1-t) - FCInv`,
    variables: [
      v(String.raw`CFO`, "Cash flow from operations"),
      v(String.raw`\text{Int}(1-t)`, "After-tax interest paid (added back if deducted in CFO)"),
      v(String.raw`FCInv`, "Fixed capital investment"),
    ],
    intuition:
      "Operating cash flow already reflects working capital, but under IFRS/GAAP it is after interest. Adding back after-tax interest gives cash available to all capital providers, before reinvestment in fixed assets is subtracted.",
    calculator: "fcff-dcf",
  },
  {
    id: "lifo-fifo-conversion",
    name: "LIFO to FIFO inventory conversion",
    group: FSA,
    courses: [L1],
    latex: String.raw`\text{Inv}_{FIFO} = \text{Inv}_{LIFO} + \text{LIFO reserve}, \quad COGS_{FIFO} = COGS_{LIFO} - \Delta\,\text{LIFO reserve}`,
    variables: [
      v(String.raw`\text{LIFO reserve}`, "Difference between FIFO and LIFO inventory values"),
      v(String.raw`\Delta\,\text{LIFO reserve}`, "Change in the reserve during the year"),
    ],
    intuition:
      "With rising prices LIFO leaves older, cheaper costs on the balance sheet, and the disclosed reserve measures the gap. Adjusting with it lets analysts compare LIFO and FIFO firms on equal terms.",
  },

  // ---------------------------------------------------------------- Equity Valuation
  {
    id: "gordon-growth-model",
    name: "Gordon (constant) growth model",
    group: EQ,
    courses: [L1, FM, XL],
    latex: String.raw`V_0 = \frac{D_1}{r - g} = \frac{D_0(1+g)}{r - g}`,
    variables: [
      v(String.raw`D_0, D_1`, "Current and next-year dividend"),
      v(String.raw`r`, "Required return on equity"),
      v(String.raw`g`, "Constant growth rate, below r"),
    ],
    intuition:
      "It is the present value of a growing perpetuity of dividends. Value is very sensitive to the gap between r and g, so small changes in either assumption move the answer a lot.",
    calculator: "gordon-growth",
  },
  {
    id: "two-stage-ddm",
    name: "Two-stage dividend discount model",
    group: EQ,
    courses: [L1, FM],
    latex: String.raw`V_0 = \sum_{t=1}^{n}\frac{D_t}{(1+r)^t} + \frac{1}{(1+r)^n}\cdot\frac{D_{n+1}}{r - g_L}`,
    variables: [
      v(String.raw`D_t`, "Dividends in the high-growth stage"),
      v(String.raw`n`, "Length of the high-growth stage"),
      v(String.raw`g_L`, "Long-run stable growth rate"),
    ],
    intuition:
      "Companies rarely grow fast forever, so explicit dividends are discounted for a high-growth phase and a Gordon terminal value captures the mature phase. The terminal value is itself discounted back from year n.",
    calculator: "gordon-growth",
  },
  {
    id: "preferred-stock-value",
    name: "Value of non-callable preferred stock",
    group: EQ,
    courses: [L1],
    latex: String.raw`V_0 = \frac{D_p}{r_p}`,
    variables: [
      v(String.raw`D_p`, "Fixed annual preferred dividend"),
      v(String.raw`r_p`, "Required return on preferred"),
    ],
    intuition:
      "A fixed dividend with no maturity is a perpetuity. Its value moves inversely with the required yield, just like a long bond.",
  },
  {
    id: "sustainable-growth-rate",
    name: "Sustainable growth rate",
    group: EQ,
    courses: [L1, FM],
    latex: String.raw`g = b \times ROE`,
    variables: [
      v(String.raw`b`, "Earnings retention rate (1 minus payout ratio)"),
      v(String.raw`ROE`, "Return on equity"),
    ],
    intuition:
      "Retained earnings add to the equity base, and that new equity earns the firm's ROE. Without new share issues or changes in leverage, equity and therefore dividends can grow only this fast.",
    calculator: "gordon-growth",
  },
  {
    id: "justified-forward-pe",
    name: "Justified forward and trailing P/E",
    group: EQ,
    courses: [L1, FM],
    latex: String.raw`\frac{P_0}{E_1} = \frac{1-b}{r-g}, \qquad \frac{P_0}{E_0} = \frac{(1-b)(1+g)}{r-g}`,
    variables: [
      v(String.raw`1-b`, "Dividend payout ratio"),
      v(String.raw`r`, "Required return"),
      v(String.raw`g`, "Dividend growth rate"),
    ],
    intuition:
      "Dividing the Gordon model by earnings turns a price into a multiple. Higher payout, higher growth or lower risk all justify paying more per unit of earnings.",
    calculator: "gordon-growth",
  },
  {
    id: "justified-pb",
    name: "Justified price-to-book",
    group: EQ,
    courses: [L1],
    latex: String.raw`\frac{P_0}{B_0} = \frac{ROE - g}{r - g}`,
    variables: [
      v(String.raw`ROE`, "Return on equity"),
      v(String.raw`g`, "Sustainable growth rate"),
      v(String.raw`r`, "Required return on equity"),
    ],
    intuition:
      "A firm earning exactly its cost of equity should trade at book value. Earning more than r on its equity creates value and justifies a premium to book; earning less implies a discount.",
  },
  {
    id: "pvgo",
    name: "Present value of growth opportunities",
    group: EQ,
    courses: [L1],
    latex: String.raw`V_0 = \frac{E_1}{r} + PVGO`,
    variables: [
      v(String.raw`E_1/r`, "Value of current earnings as a no-growth perpetuity"),
      v(String.raw`PVGO`, "Value attributed to future profitable investments"),
    ],
    intuition:
      "A share is worth the value of its existing earnings power plus whatever the market expects from new projects. A large PVGO shows that much of the price rests on growth that has not yet happened.",
  },
  {
    id: "enterprise-value",
    name: "Enterprise value",
    group: EQ,
    courses: [L1, FM, XL],
    latex: String.raw`EV = \text{Market cap} + \text{Debt} + \text{Preferred} + \text{NCI} - \text{Cash \& investments}`,
    variables: [
      v(String.raw`\text{Market cap}`, "Market value of common equity"),
      v(String.raw`\text{NCI}`, "Non-controlling (minority) interest"),
      v(String.raw`\text{Cash \& investments}`, "Cash and short-term non-operating investments"),
    ],
    intuition:
      "EV is the price of buying the operating business with all its claims, net of the cash you would receive. Because it is capital-structure neutral, it pairs with pre-interest metrics like EBITDA.",
    calculator: "fcff-dcf",
  },
  {
    id: "fcfe-from-fcff",
    name: "FCFE from FCFF",
    group: EQ,
    courses: [L1, FM],
    latex: String.raw`FCFE = FCFF - \text{Int}(1-t) + \text{Net borrowing}`,
    variables: [
      v(String.raw`FCFF`, "Free cash flow to the firm"),
      v(String.raw`\text{Int}(1-t)`, "After-tax interest"),
      v(String.raw`\text{Net borrowing}`, "New debt issued minus debt repaid"),
    ],
    intuition:
      "Shareholders get what is left after debt holders are paid, plus any cash raised from new borrowing. Discounting FCFE at the cost of equity values equity directly.",
    calculator: "fcff-dcf",
  },
  {
    id: "firm-value-fcff",
    name: "Firm value from FCFF",
    group: EQ,
    courses: [L1, FM, XL],
    latex: String.raw`V_{\text{firm}} = \sum_{t=1}^{n}\frac{FCFF_t}{(1+WACC)^t} + \frac{TV_n}{(1+WACC)^n}`,
    variables: [
      v(String.raw`FCFF_t`, "Forecast free cash flow to the firm"),
      v(String.raw`WACC`, "Weighted average cost of capital"),
      v(String.raw`TV_n`, "Terminal value at the end of the forecast"),
    ],
    intuition:
      "Cash flows available to all capital providers are discounted at the blended cost of all capital. Subtracting net debt and other claims afterwards gives equity value.",
    calculator: "fcff-dcf",
  },
  {
    id: "margin-call-price",
    name: "Margin call price",
    group: EQ,
    courses: [L1],
    latex: String.raw`P_{\text{call}} = P_0\,\frac{1 - IM}{1 - MM}`,
    variables: [
      v(String.raw`P_0`, "Purchase price"),
      v(String.raw`IM`, "Initial margin requirement"),
      v(String.raw`MM`, "Maintenance margin requirement"),
    ],
    intuition:
      "The loan is fixed while the collateral falls with the share price. The call price is the point where equity as a share of the position value drops to the maintenance level.",
  },
  {
    id: "leveraged-return",
    name: "Return on a leveraged (margin) position",
    group: EQ,
    courses: [L1],
    latex: String.raw`R_{\text{lev}} = \frac{R_{\text{asset}} \times V_0 - r_{\text{loan}} \times B}{V_0 - B}`,
    variables: [
      v(String.raw`V_0`, "Total position value at purchase"),
      v(String.raw`B`, "Amount borrowed"),
      v(String.raw`r_{\text{loan}}`, "Interest rate on the margin loan"),
    ],
    intuition:
      "Gains and losses on the whole position accrue to the smaller equity stake, after paying interest on the loan. Leverage magnifies returns in both directions; ignoring interest and dividends, the multiplier is one over the initial margin.",
  },
  {
    id: "price-weighted-index",
    name: "Price-weighted index value",
    group: EQ,
    courses: [L1],
    latex: String.raw`V_{PW} = \frac{\sum_{i=1}^{N} P_i}{D}`,
    variables: [
      v(String.raw`P_i`, "Price of constituent i"),
      v(String.raw`D`, "Divisor, adjusted for splits and changes in membership"),
    ],
    intuition:
      "Each stock's influence is proportional to its share price, so high-priced stocks dominate regardless of company size. The divisor is adjusted so that splits do not create jumps in the index.",
  },

  // ---------------------------------------------------------------- Fixed Income
  {
    id: "bond-price",
    name: "Bond price from yield to maturity",
    group: FI,
    courses: [L1, FRM, XL, PY],
    latex: String.raw`P = \sum_{t=1}^{N}\frac{PMT}{(1+r)^t} + \frac{FV}{(1+r)^N}`,
    variables: [
      v(String.raw`PMT`, "Coupon payment per period"),
      v(String.raw`FV`, "Face (par) value"),
      v(String.raw`r`, "Yield to maturity per period"),
      v(String.raw`N`, "Number of periods to maturity"),
    ],
    intuition:
      "A bond is an annuity of coupons plus a single principal repayment, both discounted at one yield. When the yield exceeds the coupon rate, the bond trades below par, and vice versa.",
    calculator: "bond-price-ytm",
  },
  {
    id: "yield-to-maturity",
    name: "Yield to maturity",
    group: FI,
    courses: [L1, FRM, XL],
    latex: String.raw`P_0 = \sum_{t=1}^{N}\frac{CF_t}{(1+YTM)^t} \quad \Rightarrow \quad \text{solve for } YTM`,
    variables: [
      v(String.raw`P_0`, "Observed full price"),
      v(String.raw`CF_t`, "Promised cash flows"),
      v(String.raw`YTM`, "Internal rate of return of the bond"),
    ],
    intuition:
      "YTM is the bond's IRR: the single rate that equates promised cash flows with the price. It equals the realised return only if the bond is held to maturity, pays as promised and coupons are reinvested at the same yield.",
    calculator: "bond-price-ytm",
  },
  {
    id: "current-yield",
    name: "Current yield",
    group: FI,
    courses: [L1],
    latex: String.raw`CY = \frac{\text{Annual coupon}}{\text{Flat price}}`,
    variables: [
      v(String.raw`\text{Annual coupon}`, "Total coupon income per year"),
      v(String.raw`\text{Flat price}`, "Quoted price excluding accrued interest"),
    ],
    intuition:
      "It measures only the income part of return, ignoring any pull to par as maturity approaches. For a discount bond, YTM exceeds current yield because the price gain adds to return.",
    calculator: "bond-price-ytm",
  },
  {
    id: "accrued-interest",
    name: "Accrued interest and full price",
    group: FI,
    courses: [L1],
    latex: String.raw`AI = \frac{t}{T}\times PMT, \qquad PV^{\text{full}} = PV^{\text{flat}} + AI`,
    variables: [
      v(String.raw`t`, "Days since last coupon"),
      v(String.raw`T`, "Days in the coupon period"),
      v(String.raw`PMT`, "Coupon payment"),
    ],
    intuition:
      "The seller has earned part of the next coupon by holding the bond, so the buyer compensates them through accrued interest. Quoting flat prices avoids an artificial saw-tooth pattern around coupon dates.",
  },
  {
    id: "price-with-spot-rates",
    name: "Bond price using spot rates",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`P = \sum_{t=1}^{N}\frac{CF_t}{(1+S_t)^t}`,
    variables: [
      v(String.raw`S_t`, "Spot (zero-coupon) rate for maturity t"),
      v(String.raw`CF_t`, "Cash flow at time t"),
    ],
    intuition:
      "Each cash flow is effectively a zero-coupon bond and should be discounted at the rate for its own maturity. This is the arbitrage-free price; a single YTM is a summary of these spot rates.",
    calculator: "forward-rates",
  },
  {
    id: "implied-forward-rate",
    name: "Implied forward rate from spot rates",
    group: FI,
    courses: [L1, FRM, XL],
    latex: String.raw`(1+S_B)^B = (1+S_A)^A\,(1+f_{A,B-A})^{B-A}`,
    variables: [
      v(String.raw`S_A, S_B`, "Spot rates for A and B years, with B greater than A"),
      v(String.raw`f_{A,B-A}`, "Forward rate starting in A years for B - A years"),
    ],
    intuition:
      "Investing for B years directly must give the same result as investing for A years and rolling into a forward contract for the rest. Solving that no-arbitrage condition gives the implied forward rate.",
    calculator: "forward-rates",
  },
  {
    id: "money-market-discount-yield",
    name: "Money market discount-basis price",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`PV = FV\left(1 - \frac{\text{Days}}{\text{Year}}\times DR\right)`,
    variables: [
      v(String.raw`DR`, "Quoted discount rate"),
      v(String.raw`\text{Days}`, "Days to maturity"),
      v(String.raw`\text{Year}`, "Day-count year, often 360"),
    ],
    intuition:
      "Treasury bills are quoted by the discount from face value as a fraction of face value, not of price. Because the base is face value, the discount rate understates the investor's true return.",
  },
  {
    id: "periodicity-conversion",
    name: "Converting yields between periodicities",
    group: FI,
    courses: [L1, XL],
    latex: String.raw`\left(1 + \frac{APR_m}{m}\right)^m = \left(1 + \frac{APR_n}{n}\right)^n`,
    variables: [
      v(String.raw`APR_m`, "Annual rate quoted with m periods per year"),
      v(String.raw`APR_n`, "Equivalent annual rate with n periods per year"),
    ],
    intuition:
      "Two quotes are equivalent if they grow money by the same amount over a year. Setting their growth factors equal converts, for example, a semiannual bond yield to an annual one.",
  },
  {
    id: "macaulay-duration",
    name: "Macaulay duration",
    group: FI,
    courses: [L1, FRM, XL, PY],
    latex: String.raw`MacDur = \sum_{t=1}^{N} t \cdot \frac{PV(CF_t)}{P}`,
    variables: [
      v(String.raw`t`, "Time of each cash flow, in periods"),
      v(String.raw`PV(CF_t)`, "Present value of the cash flow at t"),
      v(String.raw`P`, "Bond price, the sum of all PVs"),
    ],
    intuition:
      "It is the weighted average time until cash flows arrive, with weights equal to each flow's share of value. A zero-coupon bond's duration equals its maturity; coupons pull duration below maturity.",
    calculator: "duration-convexity",
  },
  {
    id: "modified-duration",
    name: "Modified duration",
    group: FI,
    courses: [L1, FRM, XL],
    latex: String.raw`ModDur = \frac{MacDur}{1 + r}`,
    variables: [
      v(String.raw`MacDur`, "Macaulay duration in periods"),
      v(String.raw`r`, "Yield per period"),
    ],
    intuition:
      "Dividing by one plus the periodic yield converts a time measure into a price sensitivity. It gives the approximate percentage price change for a one-unit change in yield (annualise by dividing by periods per year).",
    calculator: "duration-convexity",
  },
  {
    id: "duration-convexity-price-change",
    name: "Price change with duration and convexity",
    group: FI,
    courses: [L1, FRM, XL],
    latex: String.raw`\frac{\Delta P}{P} \approx -\,ModDur\,\Delta y + \tfrac{1}{2}\,Convexity\,(\Delta y)^2`,
    variables: [
      v(String.raw`ModDur`, "Annual modified duration"),
      v(String.raw`Convexity`, "Annual convexity"),
      v(String.raw`\Delta y`, "Change in yield (decimal)"),
    ],
    intuition:
      "Duration is the slope of the price-yield curve and convexity its curvature, like the first two terms of a Taylor expansion. For option-free bonds, convexity improves the estimate and helps whichever way rates move.",
    calculator: "duration-convexity",
  },
  {
    id: "effective-duration",
    name: "Effective duration",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`EffDur = \frac{PV_{-} - PV_{+}}{2\,(\Delta\text{Curve})\,PV_0}`,
    variables: [
      v(String.raw`PV_{-}, PV_{+}`, "Prices after the curve shifts down and up"),
      v(String.raw`\Delta\text{Curve}`, "Size of the parallel shift"),
      v(String.raw`PV_0`, "Current price"),
    ],
    intuition:
      "When cash flows change with rates, as with callable bonds or MBS, you cannot use a fixed-cash-flow formula. Instead you reprice the bond under small up and down shifts and measure the average slope.",
    calculator: "duration-convexity",
  },
  {
    id: "effective-convexity",
    name: "Effective convexity",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`EffCon = \frac{PV_{-} + PV_{+} - 2\,PV_0}{(\Delta\text{Curve})^2\,PV_0}`,
    variables: [
      v(String.raw`PV_{-}, PV_{+}`, "Prices after the curve shifts down and up"),
      v(String.raw`\Delta\text{Curve}`, "Size of the parallel shift"),
    ],
    intuition:
      "It compares the average of the up and down prices with the current price. If the average is above today's price, the curve bends upward (positive convexity); callable bonds can show negative convexity.",
    calculator: "duration-convexity",
  },
  {
    id: "pvbp-dv01",
    name: "Price value of a basis point (DV01)",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`PVBP = \frac{PV_{-} - PV_{+}}{2} \approx ModDur \times P \times 0.0001`,
    variables: [
      v(String.raw`PV_{-}, PV_{+}`, "Prices after a 1 bp fall and rise in yield"),
      v(String.raw`P`, "Full price of the position"),
    ],
    intuition:
      "It converts percentage sensitivity into a money amount per basis point. Traders use it to size hedges, because it can be added across positions.",
    calculator: "duration-convexity",
  },
  {
    id: "portfolio-duration",
    name: "Portfolio duration",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`D_P = \sum_{i=1}^{n} w_i\,D_i`,
    variables: [
      v(String.raw`w_i`, "Market-value weight of bond i"),
      v(String.raw`D_i`, "Duration of bond i"),
    ],
    intuition:
      "Each bond contributes interest-rate sensitivity in proportion to its weight in the portfolio. The shortcut assumes a parallel shift of the yield curve.",
  },
  {
    id: "z-spread",
    name: "Zero-volatility spread (Z-spread)",
    group: FI,
    courses: [L1, FRM],
    latex: String.raw`P = \sum_{t=1}^{N}\frac{CF_t}{(1 + S_t + Z)^t}`,
    variables: [
      v(String.raw`S_t`, "Benchmark spot rate for maturity t"),
      v(String.raw`Z`, "Constant spread added to every spot rate"),
    ],
    intuition:
      "A risky bond is discounted at the benchmark curve plus a single spread that makes the model price equal the market price. The spread compensates for credit and liquidity risk across the whole curve.",
  },

  // ---------------------------------------------------------------- Derivatives
  {
    id: "forward-price-no-income",
    name: "Forward price (cost of carry, no income)",
    group: DER,
    courses: [L1, FRM, PY],
    latex: String.raw`F_0(T) = S_0\,(1+r)^T = S_0\,e^{r_c T}`,
    variables: [
      v(String.raw`S_0`, "Spot price of the underlying"),
      v(String.raw`r, r_c`, "Risk-free rate (annual or continuous)"),
      v(String.raw`T`, "Time to delivery in years"),
    ],
    intuition:
      "Buying the asset today with borrowed money and holding it replicates a long forward. The forward price must therefore equal the spot price grown at the financing rate, or arbitrage exists.",
    calculator: "forward-pricing-cost-of-carry",
  },
  {
    id: "forward-price-carry",
    name: "Forward price with income and costs",
    group: DER,
    courses: [L1, FRM],
    latex: String.raw`F_0(T) = \big[S_0 - PV(I) + PV(C)\big](1+r)^T`,
    variables: [
      v(String.raw`PV(I)`, "Present value of income from the asset (dividends, coupons)"),
      v(String.raw`PV(C)`, "Present value of carrying costs (storage, insurance)"),
    ],
    intuition:
      "Holding the asset earns any income, which the forward buyer misses out on, and incurs costs, which the forward buyer avoids. Income lowers the fair forward price and costs raise it.",
    calculator: "forward-pricing-cost-of-carry",
  },
  {
    id: "forward-price-continuous-yield",
    name: "Forward price with continuous yield",
    group: DER,
    courses: [FRM, L1, PY],
    latex: String.raw`F_0 = S_0\,e^{(r + u - q - y)T}`,
    variables: [
      v(String.raw`r`, "Continuously compounded risk-free rate"),
      v(String.raw`u`, "Storage cost as a continuous yield"),
      v(String.raw`q`, "Dividend or foreign interest yield"),
      v(String.raw`y`, "Convenience yield (commodities)"),
    ],
    intuition:
      "Each element of carry enters the exponent: financing and storage push the forward above spot, while dividends and convenience yields pull it down. The net cost of carry determines contango or backwardation.",
    calculator: "forward-pricing-cost-of-carry",
  },
  {
    id: "forward-value-during-life",
    name: "Value of a forward during its life",
    group: DER,
    courses: [L1, FRM],
    latex: String.raw`V_t = S_t - PV_t(I) - \frac{F_0(T)}{(1+r)^{T-t}}`,
    variables: [
      v(String.raw`S_t`, "Current spot price"),
      v(String.raw`F_0(T)`, "Forward price agreed at inception"),
      v(String.raw`PV_t(I)`, "PV at t of remaining income on the underlying (zero if none)"),
      v(String.raw`T - t`, "Remaining time to maturity"),
    ],
    intuition:
      "A long forward gives the asset at maturity in exchange for a fixed payment. Its value today is what the asset is worth now, net of income you would miss, minus the present value of that fixed payment.",
    calculator: "forward-pricing-cost-of-carry",
  },
  {
    id: "fra-fixed-rate",
    name: "FRA fixed rate (implied forward rate)",
    group: DER,
    courses: [L1, FRM, XL],
    latex: String.raw`FRA = \left[\frac{1 + L_{\ell}\,\tau_{\ell}}{1 + L_s\,\tau_s} - 1\right]\frac{1}{\tau_{\ell} - \tau_s}`,
    variables: [
      v(String.raw`L_{\ell}, \tau_{\ell}`, "Longer-maturity rate and its year fraction"),
      v(String.raw`L_s, \tau_s`, "Shorter-maturity rate and its year fraction"),
    ],
    intuition:
      "The FRA locks in a rate for a future period, so it must match the forward rate implied by today's short and long money market rates. Otherwise you could borrow at one tenor and lend at another risk-free.",
    calculator: "fra-valuation",
  },
  {
    id: "fra-settlement",
    name: "FRA settlement amount",
    group: DER,
    courses: [L1, FRM],
    latex: String.raw`\text{Payment} = NP \times \frac{(L - FRA)\,\tau}{1 + L\,\tau}`,
    variables: [
      v(String.raw`NP`, "Notional principal"),
      v(String.raw`L`, "Reference rate observed at settlement"),
      v(String.raw`FRA`, "Agreed fixed rate"),
      v(String.raw`\tau`, "Year fraction of the underlying loan period"),
    ],
    intuition:
      "The long party gains when rates rise above the agreed rate, since it locked in borrowing cheaply. Because settlement happens at the start of the loan period, the interest difference is discounted back by one period.",
    calculator: "fra-valuation",
  },
  {
    id: "swap-fixed-rate",
    name: "Par swap fixed rate",
    group: DER,
    courses: [L1, FRM, XL],
    latex: String.raw`s_N = \frac{1 - B_N}{\sum_{i=1}^{N} B_i}`,
    variables: [
      v(String.raw`B_i`, "Discount factor for settlement date i"),
      v(String.raw`N`, "Number of settlement periods"),
      v(String.raw`s_N`, "Fixed rate per period"),
    ],
    intuition:
      "A pay-fixed swap is like issuing a fixed-rate bond and buying a floating-rate note worth par. The swap rate is the coupon that makes that fixed bond also worth par, so the swap starts with zero value.",
    calculator: "forward-rates",
  },
  {
    id: "minimum-variance-hedge-ratio",
    name: "Minimum variance hedge ratio",
    group: DER,
    courses: [FRM],
    latex: String.raw`h^* = \rho\,\frac{\sigma_S}{\sigma_F}, \qquad N^* = h^*\,\frac{Q_A}{Q_F}`,
    variables: [
      v(String.raw`\rho`, "Correlation between spot and futures price changes"),
      v(String.raw`\sigma_S, \sigma_F`, "Volatilities of spot and futures price changes"),
      v(String.raw`Q_A`, "Size of the position being hedged"),
      v(String.raw`Q_F`, "Size of one futures contract"),
    ],
    intuition:
      "It is the regression slope of spot changes on futures changes, the hedge that minimises the variance of the combined position. Imperfect correlation means some basis risk always remains.",
  },
  {
    id: "beta-hedge-futures",
    name: "Changing portfolio beta with index futures",
    group: DER,
    courses: [FRM],
    latex: String.raw`N = (\beta^* - \beta)\,\frac{P}{A}`,
    variables: [
      v(String.raw`\beta, \beta^*`, "Current and target portfolio betas"),
      v(String.raw`P`, "Portfolio value"),
      v(String.raw`A`, "Value of one futures contract (futures price times multiplier)"),
    ],
    intuition:
      "Each futures contract adds market exposure without buying stocks. A negative N means selling contracts to reduce beta, with a target of zero giving a fully hedged position.",
  },

  // ---------------------------------------------------------------- Options
  {
    id: "option-payoffs",
    name: "Option payoffs at expiration",
    group: OPT,
    courses: [L1, FRM, PY],
    latex: String.raw`c_T = \max(0,\, S_T - X), \qquad p_T = \max(0,\, X - S_T)`,
    variables: [
      v(String.raw`S_T`, "Underlying price at expiration"),
      v(String.raw`X`, "Exercise (strike) price"),
    ],
    intuition:
      "An option holder exercises only when doing so is beneficial, so payoffs can never be negative. Profit subtracts the premium paid, which is why a long call breaks even at X plus the premium.",
  },
  {
    id: "put-call-parity",
    name: "Put-call parity",
    group: OPT,
    courses: [L1, FRM, PY],
    latex: String.raw`c_0 + \frac{X}{(1+r)^T} = p_0 + S_0`,
    variables: [
      v(String.raw`c_0, p_0`, "European call and put prices, same strike and expiry"),
      v(String.raw`X`, "Strike price"),
      v(String.raw`S_0`, "Spot price of a non-dividend-paying underlying"),
    ],
    intuition:
      "A call plus a zero-coupon bond paying X (a fiduciary call) has the same payoff as the stock plus a put (a protective put). Identical payoffs must have identical prices, which links call and put values.",
    calculator: "put-call-parity",
  },
  {
    id: "put-call-forward-parity",
    name: "Put-call forward parity",
    group: OPT,
    courses: [L1, FRM],
    latex: String.raw`c_0 - p_0 = \frac{F_0(T) - X}{(1+r)^T}`,
    variables: [
      v(String.raw`F_0(T)`, "Forward price for the option's expiry"),
      v(String.raw`X`, "Strike price"),
    ],
    intuition:
      "A long call and short put together act like a forward purchase at X. Its value is the present value of the difference between the market forward price and X.",
    calculator: "put-call-parity",
  },
  {
    id: "black-scholes-call",
    name: "Black-Scholes-Merton call price",
    group: OPT,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`c_0 = S_0\,N(d_1) - X e^{-rT} N(d_2)`,
    variables: [
      v(String.raw`S_0`, "Current price of the underlying"),
      v(String.raw`X`, "Strike price"),
      v(String.raw`r`, "Continuously compounded risk-free rate"),
      v(String.raw`N(\cdot)`, "Standard normal cumulative distribution function"),
    ],
    intuition:
      "The call is a replicating portfolio: hold N(d1) units of the asset and borrow the present value of the strike weighted by N(d2). N(d2) is the risk-neutral probability of finishing in the money.",
    calculator: "black-scholes",
  },
  {
    id: "black-scholes-put",
    name: "Black-Scholes-Merton put price",
    group: OPT,
    courses: [L1, FRM, PY],
    latex: String.raw`p_0 = X e^{-rT} N(-d_2) - S_0\,N(-d_1)`,
    variables: [
      v(String.raw`N(-d_2)`, "Risk-neutral probability the put finishes in the money"),
      v(String.raw`N(-d_1)`, "Units of the underlying shorted in the replicating portfolio"),
    ],
    intuition:
      "A put is replicated by lending the present value of the strike and short-selling some of the asset. It is consistent with the call formula through put-call parity.",
    calculator: "black-scholes",
  },
  {
    id: "black-scholes-d1-d2",
    name: "Black-Scholes d1 and d2",
    group: OPT,
    courses: [L1, FRM, PY],
    latex: String.raw`d_1 = \frac{\ln(S_0/X) + (r - q + \sigma^2/2)\,T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}`,
    variables: [
      v(String.raw`\sigma`, "Annualised volatility of the underlying"),
      v(String.raw`T`, "Time to expiry in years"),
      v(String.raw`q`, "Continuous dividend yield (zero if none)"),
    ],
    intuition:
      "Both terms measure how far the option is in or out of the money, scaled by the volatility expected over its remaining life. Higher volatility or longer time widens the spread between d1 and d2.",
    calculator: "black-scholes",
  },
  {
    id: "black-scholes-dividend-yield",
    name: "BSM with a continuous dividend yield",
    group: OPT,
    courses: [L1, FRM],
    latex: String.raw`c_0 = S_0 e^{-qT} N(d_1) - X e^{-rT} N(d_2)`,
    variables: [
      v(String.raw`q`, "Continuous dividend yield"),
      v(String.raw`S_0 e^{-qT}`, "Spot price net of the dividends paid before expiry"),
    ],
    intuition:
      "Dividends paid before expiry go to shareholders, not option holders, so the spot price is reduced by their present value. This lowers call values and raises put values.",
    calculator: "black-scholes",
  },
  {
    id: "option-delta",
    name: "Option delta (BSM)",
    group: OPT,
    courses: [L1, FRM, PY],
    latex: String.raw`\Delta_{\text{call}} = e^{-qT}N(d_1), \qquad \Delta_{\text{put}} = e^{-qT}\big[N(d_1) - 1\big]`,
    variables: [
      v(String.raw`\Delta`, "Change in option value per unit change in the underlying"),
      v(String.raw`N(d_1)`, "Standard normal CDF at d1"),
    ],
    intuition:
      "Delta is the slope of the option value with respect to the underlying, and the number of units needed to hedge each option. Calls range from 0 to 1 and puts from -1 to 0.",
    calculator: "black-scholes",
  },
  {
    id: "binomial-up-down",
    name: "Binomial up and down factors (CRR)",
    group: OPT,
    courses: [FRM, L1, PY],
    latex: String.raw`u = e^{\sigma\sqrt{\Delta t}}, \qquad d = \frac{1}{u}`,
    variables: [
      v(String.raw`\sigma`, "Annualised volatility"),
      v(String.raw`\Delta t`, "Length of each step in years"),
    ],
    intuition:
      "Choosing the up and down moves this way makes the tree's variance match the asset's volatility. As steps get smaller, the binomial price converges to the Black-Scholes value.",
    calculator: "binomial-option",
  },
  {
    id: "risk-neutral-probability",
    name: "Risk-neutral probability",
    group: OPT,
    courses: [L1, FRM, PY],
    latex: String.raw`\pi = \frac{1 + r - d}{u - d}`,
    variables: [
      v(String.raw`u, d`, "Up and down gross price factors"),
      v(String.raw`r`, "Risk-free rate per step (use e to the r times Δt for continuous)"),
    ],
    intuition:
      "It is the probability that makes the expected asset return equal to the risk-free rate. Pricing with it works because the option can be hedged, so investor risk preferences drop out.",
    calculator: "binomial-option",
  },
  {
    id: "one-period-binomial-value",
    name: "One-period binomial option value",
    group: OPT,
    courses: [L1, FRM],
    latex: String.raw`c_0 = \frac{\pi\,c_u + (1-\pi)\,c_d}{1+r}`,
    variables: [
      v(String.raw`c_u, c_d`, "Option values after an up and a down move"),
      v(String.raw`\pi`, "Risk-neutral probability of the up move"),
    ],
    intuition:
      "The option is valued as its risk-neutral expected payoff discounted at the risk-free rate. Multi-step trees apply this backwards node by node, checking for early exercise when options are American.",
    calculator: "binomial-option",
  },
  {
    id: "binomial-hedge-ratio",
    name: "Binomial hedge ratio",
    group: OPT,
    courses: [L1, FRM],
    latex: String.raw`h = \frac{c_u - c_d}{S_u - S_d}`,
    variables: [
      v(String.raw`c_u, c_d`, "Option values in the up and down states"),
      v(String.raw`S_u, S_d`, "Underlying prices in the up and down states"),
    ],
    intuition:
      "Holding h shares per short call makes the portfolio's value the same in both states. A riskless portfolio must earn the risk-free rate, which pins down the option price.",
    calculator: "binomial-option",
  },
  {
    id: "option-lower-bounds",
    name: "Lower bounds for European options",
    group: OPT,
    courses: [L1, FRM],
    latex: String.raw`c_0 \ge \max\!\left(0,\; S_0 - \frac{X}{(1+r)^T}\right), \qquad p_0 \ge \max\!\left(0,\; \frac{X}{(1+r)^T} - S_0\right)`,
    variables: [
      v(String.raw`S_0`, "Current underlying price"),
      v(String.raw`X/(1+r)^T`, "Present value of the strike"),
    ],
    intuition:
      "A call is worth at least as much as a forward purchase at the strike, since it has the same upside but no downside. Any lower price would allow a riskless profit.",
    calculator: "put-call-parity",
  },

  // ---------------------------------------------------------------- Portfolio Management & Performance
  {
    id: "portfolio-expected-return",
    name: "Portfolio expected return",
    group: PM,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`E(R_p) = \sum_{i=1}^{n} w_i\,E(R_i)`,
    variables: [
      v(String.raw`w_i`, "Weight of asset i (weights sum to 1)"),
      v(String.raw`E(R_i)`, "Expected return of asset i"),
    ],
    intuition:
      "Expected return is linear: the portfolio earns the weighted average of what each holding earns. Unlike risk, it receives no benefit from diversification.",
    calculator: "two-asset-portfolio",
  },
  {
    id: "two-asset-portfolio-variance",
    name: "Two-asset portfolio variance",
    group: PM,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2\,w_1 w_2\,\rho_{12}\,\sigma_1\sigma_2`,
    variables: [
      v(String.raw`w_1, w_2`, "Portfolio weights"),
      v(String.raw`\sigma_1, \sigma_2`, "Standard deviations of the assets"),
      v(String.raw`\rho_{12}`, "Correlation between the assets"),
    ],
    intuition:
      "The cross term captures how the assets move together. Whenever correlation is below +1, portfolio risk is less than the weighted average of individual risks, which is the essence of diversification.",
    calculator: "two-asset-portfolio",
  },
  {
    id: "minimum-variance-weight",
    name: "Minimum-variance weight (two assets)",
    group: PM,
    courses: [L1, FRM, PY],
    latex: String.raw`w_1^* = \frac{\sigma_2^2 - \rho_{12}\sigma_1\sigma_2}{\sigma_1^2 + \sigma_2^2 - 2\rho_{12}\sigma_1\sigma_2}`,
    variables: [
      v(String.raw`w_1^*`, "Weight in asset 1 that minimises portfolio variance"),
      v(String.raw`\sigma_1, \sigma_2, \rho_{12}`, "Volatilities and correlation"),
    ],
    intuition:
      "Setting the derivative of portfolio variance to zero gives this weight. More weight goes to the less volatile asset, and with perfect negative correlation risk can be eliminated entirely.",
    calculator: "two-asset-portfolio",
  },
  {
    id: "equal-weight-portfolio-variance",
    name: "Variance of an equally weighted portfolio",
    group: PM,
    courses: [L1, FRM],
    latex: String.raw`\sigma_p^2 = \frac{\bar{\sigma}^2}{N} + \frac{N-1}{N}\,\overline{\text{Cov}}`,
    variables: [
      v(String.raw`N`, "Number of assets"),
      v(String.raw`\bar{\sigma}^2`, "Average variance of the assets"),
      v(String.raw`\overline{\text{Cov}}`, "Average pairwise covariance"),
    ],
    intuition:
      "As N grows the first term vanishes, so individual risks diversify away. What remains is the average covariance, the systematic risk that no amount of diversification can remove.",
  },
  {
    id: "investor-utility",
    name: "Mean-variance utility",
    group: PM,
    courses: [L1],
    latex: String.raw`U = E(r) - \tfrac{1}{2}\,A\,\sigma^2`,
    variables: [
      v(String.raw`E(r)`, "Expected return"),
      v(String.raw`A`, "Risk aversion coefficient"),
      v(String.raw`\sigma^2`, "Variance of return"),
    ],
    intuition:
      "Investors like return and dislike risk, and the risk aversion coefficient sets the exchange rate between them. Indifference curves are combinations giving the same utility.",
  },
  {
    id: "capm-sml",
    name: "CAPM and the security market line",
    group: PM,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`E(R_i) = R_f + \beta_i\,[E(R_m) - R_f]`,
    variables: [
      v(String.raw`R_f`, "Risk-free rate"),
      v(String.raw`\beta_i`, "Sensitivity of asset i to the market"),
      v(String.raw`E(R_m)`, "Expected market return"),
    ],
    intuition:
      "In equilibrium only non-diversifiable risk is rewarded, and beta measures that risk. Assets plotting above the line look underpriced because they offer more return than their beta requires.",
    calculator: "capm",
  },
  {
    id: "beta",
    name: "Beta",
    group: PM,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`\beta_i = \frac{\text{Cov}(R_i, R_m)}{\sigma_m^2} = \rho_{i,m}\,\frac{\sigma_i}{\sigma_m}`,
    variables: [
      v(String.raw`\text{Cov}(R_i, R_m)`, "Covariance of the asset with the market"),
      v(String.raw`\sigma_m^2`, "Variance of the market"),
      v(String.raw`\rho_{i,m}`, "Correlation with the market"),
    ],
    intuition:
      "Beta is the slope from regressing the asset's returns on the market's. It captures only the part of volatility that moves with the market, scaled to market volatility.",
    calculator: "capm",
  },
  {
    id: "capital-market-line",
    name: "Capital market line",
    group: PM,
    courses: [L1, FRM],
    latex: String.raw`E(R_p) = R_f + \frac{E(R_m) - R_f}{\sigma_m}\,\sigma_p`,
    variables: [
      v(String.raw`\sigma_p`, "Standard deviation of the efficient portfolio"),
      v(String.raw`\sigma_m`, "Standard deviation of the market portfolio"),
    ],
    intuition:
      "Combining the risk-free asset with the market portfolio gives a straight line in mean-standard deviation space. Its slope is the market's Sharpe ratio, the best available reward per unit of total risk.",
  },
  {
    id: "sharpe-ratio",
    name: "Sharpe ratio",
    group: PM,
    courses: [L1, FRM, PY, XL],
    latex: String.raw`\text{Sharpe} = \frac{R_p - R_f}{\sigma_p}`,
    variables: [
      v(String.raw`R_p`, "Portfolio return"),
      v(String.raw`R_f`, "Risk-free rate"),
      v(String.raw`\sigma_p`, "Standard deviation of portfolio returns"),
    ],
    intuition:
      "It measures excess return per unit of total risk, the slope of a line from the risk-free rate to the portfolio. It suits a portfolio that represents an investor's entire holdings.",
    calculator: "risk-adjusted-performance",
  },
  {
    id: "treynor-ratio",
    name: "Treynor ratio",
    group: PM,
    courses: [L1, FRM],
    latex: String.raw`\text{Treynor} = \frac{R_p - R_f}{\beta_p}`,
    variables: [
      v(String.raw`\beta_p`, "Portfolio beta"),
      v(String.raw`R_p - R_f`, "Excess return"),
    ],
    intuition:
      "It rewards only systematic risk, which is appropriate when the portfolio is one part of a diversified whole. Rankings can differ from Sharpe when portfolios carry different amounts of diversifiable risk.",
    calculator: "risk-adjusted-performance",
  },
  {
    id: "jensens-alpha",
    name: "Jensen's alpha",
    group: PM,
    courses: [L1, FRM, PY],
    latex: String.raw`\alpha_p = R_p - \big[R_f + \beta_p\,(R_m - R_f)\big]`,
    variables: [
      v(String.raw`R_p`, "Realised portfolio return"),
      v(String.raw`\beta_p`, "Portfolio beta"),
      v(String.raw`R_m`, "Realised market return"),
    ],
    intuition:
      "Alpha is the return earned beyond what CAPM says the portfolio's beta deserved. Persistent positive alpha suggests manager skill rather than simply taking more market risk.",
    calculator: "risk-adjusted-performance",
  },
  {
    id: "m-squared",
    name: "M-squared (Modigliani-Modigliani)",
    group: PM,
    courses: [L1, FRM],
    latex: String.raw`M^2 = R_f + (R_p - R_f)\,\frac{\sigma_m}{\sigma_p}`,
    variables: [
      v(String.raw`\sigma_m`, "Market standard deviation"),
      v(String.raw`\sigma_p`, "Portfolio standard deviation"),
    ],
    intuition:
      "It levers or de-levers the portfolio with the risk-free asset until its volatility matches the market's, then reports the resulting return. Comparing that to the market return gives a percentage-based version of the Sharpe comparison.",
    calculator: "risk-adjusted-performance",
  },
  {
    id: "information-ratio",
    name: "Information ratio",
    group: PM,
    courses: [L1, FRM, PY],
    latex: String.raw`IR = \frac{R_p - R_B}{\sigma(R_p - R_B)}`,
    variables: [
      v(String.raw`R_B`, "Benchmark return"),
      v(String.raw`\sigma(R_p - R_B)`, "Tracking error, the volatility of active return"),
    ],
    intuition:
      "It measures how much active return a manager delivers per unit of active risk taken relative to the benchmark. A high IR means consistent outperformance rather than a few lucky bets.",
    calculator: "risk-adjusted-performance",
  },
  {
    id: "sortino-ratio",
    name: "Sortino ratio",
    group: PM,
    courses: [L1, FRM, PY],
    latex: String.raw`\text{Sortino} = \frac{R_p - MAR}{\sqrt{\frac{1}{n}\sum_{t=1}^{n}\min(R_t - MAR,\,0)^2}}`,
    variables: [
      v(String.raw`MAR`, "Minimum acceptable return"),
      v(String.raw`R_t`, "Return in period t"),
    ],
    intuition:
      "Investors rarely mind upside volatility, so only returns below the target count as risk. This makes the ratio more informative for strategies with skewed returns, such as option selling.",
    calculator: "risk-adjusted-performance",
  },
  {
    id: "arbitrage-pricing-theory",
    name: "Arbitrage pricing theory (multifactor)",
    group: PM,
    courses: [FRM, L1],
    latex: String.raw`E(R_i) = R_f + \sum_{k=1}^{K}\beta_{i,k}\,\lambda_k`,
    variables: [
      v(String.raw`\beta_{i,k}`, "Sensitivity of asset i to factor k"),
      v(String.raw`\lambda_k`, "Risk premium for factor k"),
    ],
    intuition:
      "If returns are driven by several common factors, any well-diversified portfolio must earn the risk-free rate plus premiums for its factor exposures. Otherwise factor-matched portfolios would offer arbitrage.",
  },

  // ---------------------------------------------------------------- Market Risk (VaR & Volatility)
  {
    id: "parametric-var",
    name: "Parametric (delta-normal) VaR",
    group: MR,
    courses: [FRM, PY, XL],
    latex: String.raw`VaR_{\alpha} = V\,\big(z_{\alpha}\,\sigma - \mu\big)`,
    variables: [
      v(String.raw`V`, "Position or portfolio value"),
      v(String.raw`z_{\alpha}`, "Standard normal quantile, e.g. 1.645 for 95% or 2.326 for 99%"),
      v(String.raw`\sigma, \mu`, "Volatility and mean return over the horizon"),
    ],
    intuition:
      "If returns are normal, the loss exceeded only (1 - α) of the time sits z standard deviations below the mean. VaR is that loss expressed in money; over short horizons the mean is often set to zero.",
    calculator: "parametric-var",
  },
  {
    id: "square-root-of-time",
    name: "Square-root-of-time scaling",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`\sigma_T = \sigma_1\sqrt{T}, \qquad VaR_T = VaR_1\sqrt{T}`,
    variables: [
      v(String.raw`\sigma_1, VaR_1`, "One-day volatility and VaR"),
      v(String.raw`T`, "Horizon in days"),
    ],
    intuition:
      "With independent, identically distributed returns, variances add across days, so volatility grows with the square root of time. Volatility clustering or mean reversion breaks this assumption.",
    calculator: "parametric-var",
  },
  {
    id: "annualize-volatility",
    name: "Annualising volatility",
    group: MR,
    courses: [FRM, L1, PY, XL],
    latex: String.raw`\sigma_{\text{annual}} = \sigma_{\text{daily}}\,\sqrt{252}`,
    variables: [
      v(String.raw`\sigma_{\text{daily}}`, "Standard deviation of daily returns"),
      v(String.raw`252`, "Approximate trading days per year"),
    ],
    intuition:
      "It is the square-root-of-time rule applied to a year of trading days. Use 52 for weekly or 12 for monthly data.",
    calculator: "ewma-volatility",
  },
  {
    id: "historical-var",
    name: "Historical simulation VaR",
    group: MR,
    courses: [FRM, PY, XL],
    latex: String.raw`VaR_{\alpha} = -\,V \cdot q_{1-\alpha}\big(\{R_t\}_{t=1}^{n}\big)`,
    variables: [
      v(String.raw`q_{1-\alpha}`, "Empirical (1 - α) quantile of historical returns"),
      v(String.raw`R_t`, "Historical return scenarios applied to today's portfolio"),
      v(String.raw`V`, "Current portfolio value"),
    ],
    intuition:
      "Instead of assuming a distribution, it replays past market moves on today's positions and reads off the loss at the chosen percentile. It captures fat tails present in the window but assumes the past is representative.",
    calculator: "historical-var",
  },
  {
    id: "expected-shortfall",
    name: "Expected shortfall",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`ES_{\alpha} = E\big[L \mid L \ge VaR_{\alpha}\big]`,
    variables: [
      v(String.raw`L`, "Portfolio loss"),
      v(String.raw`VaR_{\alpha}`, "Value at risk at confidence α"),
    ],
    intuition:
      "VaR says where the tail starts but nothing about how bad it gets. ES averages the losses beyond VaR, is always at least as large, and is a coherent risk measure that rewards diversification.",
    calculator: "expected-shortfall",
  },
  {
    id: "expected-shortfall-normal",
    name: "Expected shortfall under normality",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`ES_{\alpha} = V\left(\sigma\,\frac{\phi(z_{\alpha})}{1-\alpha} - \mu\right)`,
    variables: [
      v(String.raw`\phi(z_{\alpha})`, "Standard normal density at the VaR quantile"),
      v(String.raw`1-\alpha`, "Tail probability"),
      v(String.raw`\sigma, \mu`, "Volatility and mean return over the horizon"),
    ],
    intuition:
      "For a normal distribution the average of the tail beyond z has a closed form. At 97.5% confidence, normal ES is close to 99% normal VaR, which is why Basel uses that level.",
    calculator: "expected-shortfall",
  },
  {
    id: "portfolio-var-matrix",
    name: "Portfolio VaR (variance-covariance)",
    group: MR,
    courses: [FRM, PY, XL],
    latex: String.raw`VaR_p = z_{\alpha}\,\sqrt{\mathbf{w}^{\top}\Sigma\,\mathbf{w}}\;V`,
    variables: [
      v(String.raw`\mathbf{w}`, "Vector of portfolio weights"),
      v(String.raw`\Sigma`, "Covariance matrix of asset returns"),
      v(String.raw`V`, "Portfolio value"),
    ],
    intuition:
      "The quadratic form gives portfolio variance including all correlations. Because correlations below one offset risks, portfolio VaR is less than the sum of the individual VaRs.",
    calculator: "portfolio-var",
  },
  {
    id: "two-asset-var",
    name: "VaR of two positions",
    group: MR,
    courses: [FRM],
    latex: String.raw`VaR_p = \sqrt{VaR_1^2 + VaR_2^2 + 2\,\rho_{12}\,VaR_1\,VaR_2}`,
    variables: [
      v(String.raw`VaR_1, VaR_2`, "Stand-alone VaRs of the positions"),
      v(String.raw`\rho_{12}`, "Correlation between their returns"),
    ],
    intuition:
      "Under delta-normal assumptions with zero mean, VaR scales with standard deviation, so VaRs combine like volatilities. With perfect correlation VaRs simply add; otherwise there is a diversification benefit.",
    calculator: "portfolio-var",
  },
  {
    id: "component-var",
    name: "Marginal and component VaR",
    group: MR,
    courses: [FRM],
    latex: String.raw`MVaR_i = \frac{VaR_p}{V}\,\beta_i, \qquad CVaR_i = VaR_p\,\beta_i\,w_i`,
    variables: [
      v(String.raw`\beta_i`, "Beta of position i to the portfolio, Cov(R_i, R_p) over Var(R_p)"),
      v(String.raw`w_i`, "Weight of position i"),
      v(String.raw`V`, "Portfolio value"),
    ],
    intuition:
      "Marginal VaR shows how much portfolio VaR changes per unit added to a position. Component VaRs split total VaR into parts that add up exactly, revealing which positions drive risk.",
    calculator: "portfolio-var",
  },
  {
    id: "option-delta-normal-var",
    name: "Delta-normal VaR for an option",
    group: MR,
    courses: [FRM],
    latex: String.raw`VaR_{\text{option}} \approx |\Delta|\,VaR_{\text{underlying}} = |\Delta|\,S\,z_{\alpha}\,\sigma`,
    variables: [
      v(String.raw`\Delta`, "Option delta"),
      v(String.raw`S`, "Price of the underlying"),
      v(String.raw`\sigma`, "Volatility of the underlying return over the horizon"),
    ],
    intuition:
      "For small moves an option behaves like delta units of the underlying, so its risk is delta times the underlying's VaR. Gamma makes this inaccurate for large moves, which is why delta-gamma or full revaluation methods exist.",
    calculator: "parametric-var",
  },
  {
    id: "bond-var-duration",
    name: "Duration-based bond VaR",
    group: MR,
    courses: [FRM],
    latex: String.raw`VaR \approx ModDur \times P \times z_{\alpha}\,\sigma_{\Delta y}`,
    variables: [
      v(String.raw`ModDur`, "Modified duration"),
      v(String.raw`P`, "Bond position value"),
      v(String.raw`\sigma_{\Delta y}`, "Volatility of yield changes over the horizon"),
    ],
    intuition:
      "Duration maps a yield shock into a price change, so a worst-case yield move at the chosen confidence translates into a worst-case loss. Convexity is ignored, making it conservative for option-free bonds.",
    calculator: "parametric-var",
  },
  {
    id: "ewma-variance",
    name: "EWMA variance",
    group: MR,
    courses: [FRM, PY, XL],
    latex: String.raw`\sigma_n^2 = \lambda\,\sigma_{n-1}^2 + (1-\lambda)\,u_{n-1}^2`,
    variables: [
      v(String.raw`\lambda`, "Decay factor, e.g. 0.94 for daily RiskMetrics"),
      v(String.raw`u_{n-1}`, "Most recent daily return"),
      v(String.raw`\sigma_{n-1}^2`, "Previous variance estimate"),
    ],
    intuition:
      "Weights on past squared returns decline geometrically, so recent shocks matter most. Volatility estimates react quickly to market turbulence without an arbitrary cut-off window.",
    calculator: "ewma-volatility",
  },
  {
    id: "garch-11",
    name: "GARCH(1,1) variance",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`\sigma_n^2 = \omega + \alpha\,u_{n-1}^2 + \beta\,\sigma_{n-1}^2`,
    variables: [
      v(String.raw`\omega`, "Constant, equal to γ times the long-run variance"),
      v(String.raw`\alpha`, "Weight on the latest squared return"),
      v(String.raw`\beta`, "Weight on the previous variance"),
    ],
    intuition:
      "It extends EWMA with a constant that pulls variance back toward a long-run level. Shocks raise volatility, which then decays gradually, matching the clustering seen in markets.",
    calculator: "garch-forecast",
  },
  {
    id: "garch-long-run-variance",
    name: "GARCH long-run variance",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`V_L = \frac{\omega}{1 - \alpha - \beta}`,
    variables: [
      v(String.raw`V_L`, "Long-run (unconditional) variance"),
      v(String.raw`\alpha + \beta`, "Persistence, which must be below 1"),
    ],
    intuition:
      "If variance stays at a steady level, the GARCH equation must reproduce it, and solving gives this ratio. Persistence near one means shocks fade slowly.",
    calculator: "garch-forecast",
  },
  {
    id: "garch-variance-forecast",
    name: "GARCH variance forecast",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`E\big[\sigma_{n+t}^2\big] = V_L + (\alpha + \beta)^t\,\big(\sigma_n^2 - V_L\big)`,
    variables: [
      v(String.raw`t`, "Days ahead"),
      v(String.raw`\sigma_n^2`, "Current variance estimate"),
      v(String.raw`V_L`, "Long-run variance"),
    ],
    intuition:
      "Today's gap between current and long-run variance shrinks by a factor of alpha plus beta each day. Forecasts therefore mean-revert, giving a term structure of volatility.",
    calculator: "garch-forecast",
  },
  {
    id: "kupiec-pof-test",
    name: "Kupiec proportion-of-failures backtest",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`LR_{POF} = -2\ln\!\left[\frac{(1-p)^{T-N}\,p^{N}}{\left(1-\frac{N}{T}\right)^{T-N}\left(\frac{N}{T}\right)^{N}}\right] \sim \chi^2_1`,
    variables: [
      v(String.raw`p`, "Expected exception rate, 1 minus the VaR confidence"),
      v(String.raw`N`, "Observed number of VaR exceptions"),
      v(String.raw`T`, "Number of days in the backtest"),
    ],
    intuition:
      "It compares the likelihood of the observed exceptions under the model's stated rate with the likelihood at the observed rate. A value above the chi-square critical value (3.84 at 5%) rejects the model as miscalibrated.",
    calculator: "historical-var",
  },
  {
    id: "var-exception-z-test",
    name: "VaR backtest exception z-test",
    group: MR,
    courses: [FRM, PY],
    latex: String.raw`z = \frac{N - pT}{\sqrt{p(1-p)\,T}}`,
    variables: [
      v(String.raw`N`, "Observed exceptions"),
      v(String.raw`p`, "Expected exception probability"),
      v(String.raw`T`, "Number of observations"),
    ],
    intuition:
      "Exceptions follow a binomial distribution, which is roughly normal over long samples. The statistic measures how many standard deviations the exception count sits from its expected value.",
    calculator: "hypothesis-test",
  },

  // ---------------------------------------------------------------- Credit Risk
  {
    id: "expected-loss",
    name: "Expected credit loss",
    group: CR,
    courses: [FRM, L1, PY],
    latex: String.raw`EL = PD \times LGD \times EAD`,
    variables: [
      v(String.raw`PD`, "Probability of default over the horizon"),
      v(String.raw`LGD`, "Loss given default, 1 minus the recovery rate"),
      v(String.raw`EAD`, "Exposure at default"),
    ],
    intuition:
      "A loss requires the borrower to default, and then you lose a fraction of what is owed at that time. Multiplying the three gives the average loss, which should be covered by pricing and provisions.",
    calculator: "expected-loss",
  },
  {
    id: "loss-given-default",
    name: "Loss given default and recovery",
    group: CR,
    courses: [FRM, L1],
    latex: String.raw`LGD = 1 - RR`,
    variables: [v(String.raw`RR`, "Recovery rate as a fraction of exposure")],
    intuition:
      "Whatever is not recovered from collateral, guarantees or bankruptcy proceedings is lost. Senior secured debt usually has lower LGD than subordinated debt.",
    calculator: "expected-loss",
  },
  {
    id: "unexpected-loss",
    name: "Unexpected loss of a single exposure",
    group: CR,
    courses: [FRM],
    latex: String.raw`UL = EAD\,\sqrt{PD\,\sigma_{LGD}^2 + LGD^2\,\sigma_{PD}^2}, \qquad \sigma_{PD}^2 = PD(1-PD)`,
    variables: [
      v(String.raw`\sigma_{LGD}`, "Standard deviation of LGD"),
      v(String.raw`\sigma_{PD}^2`, "Variance of the default indicator"),
      v(String.raw`LGD`, "Expected loss given default"),
    ],
    intuition:
      "Unexpected loss is the standard deviation of credit losses around their mean, arising from uncertainty both in whether default happens and in how severe it is. Banks hold capital against it, while pricing covers expected loss.",
    calculator: "expected-loss",
  },
  {
    id: "survival-probability",
    name: "Survival probability with a constant hazard rate",
    group: CR,
    courses: [FRM, PY],
    latex: String.raw`S(t) = e^{-\lambda t}, \qquad PD(t) = 1 - e^{-\lambda t}`,
    variables: [
      v(String.raw`\lambda`, "Hazard rate, the instantaneous default intensity"),
      v(String.raw`t`, "Time horizon in years"),
    ],
    intuition:
      "With a constant hazard rate, the chance of surviving each small interval is the same, so survival decays exponentially. Cumulative default probability is simply the complement.",
    calculator: "hazard-rate",
  },
  {
    id: "conditional-default-probability",
    name: "Conditional (forward) default probability",
    group: CR,
    courses: [FRM],
    latex: String.raw`P(t_1 < \tau \le t_2 \mid \tau > t_1) = \frac{S(t_1) - S(t_2)}{S(t_1)}`,
    variables: [
      v(String.raw`\tau`, "Time of default"),
      v(String.raw`S(t)`, "Probability of surviving to time t"),
    ],
    intuition:
      "Among borrowers who make it to t1, the share that default before t2 is the fall in survival over that window relative to survival at t1. It is the credit analogue of a forward rate.",
    calculator: "hazard-rate",
  },
  {
    id: "credit-triangle",
    name: "Credit spread and hazard rate (credit triangle)",
    group: CR,
    courses: [FRM],
    latex: String.raw`\lambda \approx \frac{s}{1 - R}`,
    variables: [
      v(String.raw`s`, "Credit spread over the risk-free rate (or CDS spread)"),
      v(String.raw`R`, "Expected recovery rate"),
    ],
    intuition:
      "The spread compensates for the expected default loss per year, which is roughly the default intensity times the loss given default. Dividing by LGD backs out the market-implied hazard rate.",
    calculator: "hazard-rate",
  },
  {
    id: "spread-expected-loss",
    name: "Yield spread as expected loss",
    group: CR,
    courses: [L1, FRM],
    latex: String.raw`\text{Spread} \approx PD \times LGD`,
    variables: [
      v(String.raw`PD`, "Annual probability of default"),
      v(String.raw`LGD`, "Loss severity given default"),
    ],
    intuition:
      "Ignoring risk premia and liquidity, investors need extra yield at least equal to the loss they expect each year. Actual spreads are wider because investors also demand compensation for bearing the uncertainty.",
    calculator: "expected-loss",
  },
  {
    id: "merton-distance-to-default",
    name: "Merton distance to default",
    group: CR,
    courses: [FRM, PY],
    latex: String.raw`DD = \frac{\ln(V_A/D) + \left(\mu - \tfrac{1}{2}\sigma_A^2\right)T}{\sigma_A\sqrt{T}}, \qquad PD = N(-DD)`,
    variables: [
      v(String.raw`V_A`, "Market value of the firm's assets"),
      v(String.raw`D`, "Face value of debt due at T"),
      v(String.raw`\mu`, "Expected asset return (r under risk-neutral measure)"),
      v(String.raw`\sigma_A`, "Asset volatility"),
    ],
    intuition:
      "Equity is a call option on the firm's assets with strike equal to the debt. Default occurs if assets fall below debt, and DD counts how many standard deviations of asset value separate the firm from that point.",
    calculator: "black-scholes",
  },
  {
    id: "credit-valuation-adjustment",
    name: "Credit valuation adjustment (CVA)",
    group: CR,
    courses: [FRM],
    latex: String.raw`CVA \approx LGD \sum_{i=1}^{n} EE(t_i)\,PD(t_{i-1}, t_i)\,DF(t_i)`,
    variables: [
      v(String.raw`EE(t_i)`, "Expected positive exposure at time t_i"),
      v(String.raw`PD(t_{i-1}, t_i)`, "Probability the counterparty defaults in that interval"),
      v(String.raw`DF(t_i)`, "Risk-free discount factor"),
    ],
    intuition:
      "A derivative's value must be reduced by the expected cost of the counterparty defaulting when it owes you money. Summing discounted exposure times default probability across time buckets gives that cost.",
    calculator: "expected-loss",
  },
  {
    id: "portfolio-expected-loss",
    name: "Portfolio expected loss",
    group: CR,
    courses: [FRM],
    latex: String.raw`EL_P = \sum_{i=1}^{n} PD_i \times LGD_i \times EAD_i`,
    variables: [v(String.raw`PD_i, LGD_i, EAD_i`, "Risk parameters of exposure i")],
    intuition:
      "Expectations add, so portfolio expected loss is the sum of individual expected losses regardless of correlation. Correlation matters only for unexpected loss and capital.",
    calculator: "expected-loss",
  },

  // ---------------------------------------------------------------- Excel & Modeling
  {
    id: "unlevered-free-cash-flow",
    name: "Unlevered free cash flow build",
    group: EXL,
    courses: [FM, XL, L1],
    latex: String.raw`UFCF = EBIT(1-t) + D\&A - \text{CapEx} - \Delta NWC`,
    variables: [
      v(String.raw`EBIT(1-t)`, "Net operating profit after tax (NOPAT)"),
      v(String.raw`D\&A`, "Depreciation and amortisation (non-cash)"),
      v(String.raw`\Delta NWC`, "Increase in net working capital"),
    ],
    intuition:
      "Start from operating profit as if the firm had no debt, add back non-cash charges and subtract the cash reinvested in fixed assets and working capital. The result is the cash available to all investors.",
    calculator: "fcff-dcf",
  },
  {
    id: "terminal-value-gordon",
    name: "Terminal value: perpetuity growth method",
    group: EXL,
    courses: [FM, XL, L1],
    latex: String.raw`TV_N = \frac{FCF_N\,(1+g)}{WACC - g}`,
    variables: [
      v(String.raw`FCF_N`, "Free cash flow in the final forecast year"),
      v(String.raw`g`, "Perpetual growth rate, typically near long-run nominal GDP growth"),
      v(String.raw`WACC`, "Discount rate"),
    ],
    intuition:
      "Beyond the explicit forecast, cash flows are assumed to grow steadily forever, so a growing perpetuity summarises them. It often makes up most of DCF value, so g must be well below WACC and defensible.",
    calculator: "fcff-dcf",
  },
  {
    id: "terminal-value-exit-multiple",
    name: "Terminal value: exit multiple method",
    group: EXL,
    courses: [FM, XL],
    latex: String.raw`TV_N = EBITDA_N \times \left(\frac{EV}{EBITDA}\right)_{\text{exit}}`,
    variables: [
      v(String.raw`EBITDA_N`, "EBITDA in the final forecast year (or next year for a forward multiple)"),
      v(String.raw`(EV/EBITDA)_{\text{exit}}`, "Multiple assumed at exit, based on comparables"),
    ],
    intuition:
      "It assumes the business could be sold at the end of the forecast at a market multiple. It anchors value to observable pricing but imports whatever optimism or pessimism the market holds today.",
    calculator: "fcff-dcf",
  },
  {
    id: "implied-perpetual-growth",
    name: "Implied perpetual growth from an exit multiple",
    group: EXL,
    courses: [FM, XL],
    latex: String.raw`g = \frac{TV_N \times WACC - FCF_N}{TV_N + FCF_N}`,
    variables: [
      v(String.raw`TV_N`, "Terminal value from the exit multiple"),
      v(String.raw`FCF_N`, "Final-year free cash flow"),
    ],
    intuition:
      "Rearranging the perpetuity formula shows what growth rate the chosen multiple implies. It is a sanity check: an implied g above long-run economic growth signals an aggressive multiple.",
    calculator: "fcff-dcf",
  },
  {
    id: "mid-year-discount-factor",
    name: "Mid-year convention discount factor",
    group: EXL,
    courses: [FM, XL],
    latex: String.raw`DF_t = \frac{1}{(1+WACC)^{\,t - 0.5}}`,
    variables: [
      v(String.raw`t`, "Forecast year number (1, 2, 3, ...)"),
      v(String.raw`WACC`, "Discount rate"),
    ],
    intuition:
      "Cash arrives throughout the year rather than all on the last day, so on average it is received at mid-year. Discounting half a period less raises value slightly compared with end-of-year discounting.",
    calculator: "fcff-dcf",
  },
  {
    id: "equity-value-bridge",
    name: "Enterprise-to-equity value bridge",
    group: EXL,
    courses: [FM, XL, L1],
    latex: String.raw`\text{Equity value} = EV - \text{Debt} + \text{Cash} - \text{Preferred} - \text{NCI} + \text{Non-operating assets}`,
    variables: [
      v(String.raw`EV`, "Enterprise value from the DCF"),
      v(String.raw`\text{Debt} - \text{Cash}`, "Net debt"),
      v(String.raw`\text{NCI}`, "Non-controlling interest"),
    ],
    intuition:
      "A DCF on free cash flow to the firm values the operations for every capital provider. To get the shareholders' slice, remove claims senior to or alongside common equity and add back assets not captured in the cash flows.",
    calculator: "fcff-dcf",
  },
  {
    id: "implied-share-price",
    name: "Implied share price",
    group: EXL,
    courses: [FM, XL],
    latex: String.raw`\text{Price per share} = \frac{\text{Equity value}}{\text{Diluted shares outstanding}}`,
    variables: [
      v(String.raw`\text{Equity value}`, "Output of the value bridge"),
      v(String.raw`\text{Diluted shares}`, "Basic shares plus dilutive options and convertibles"),
    ],
    intuition:
      "Equity value belongs to all shareholders, including those who will receive shares through in-the-money options and convertibles. Dividing by diluted shares avoids overstating value per share.",
    calculator: "fcff-dcf",
  },
  {
    id: "treasury-stock-method",
    name: "Treasury stock method",
    group: EXL,
    courses: [FM, XL, L1],
    latex: String.raw`\Delta\text{Shares} = n_{\text{opt}}\,\frac{P - X}{P} \quad \text{if } P > X`,
    variables: [
      v(String.raw`n_{\text{opt}}`, "Number of options or warrants"),
      v(String.raw`P`, "Share price (average price for EPS)"),
      v(String.raw`X`, "Exercise price"),
    ],
    intuition:
      "When options are exercised the company receives cash and is assumed to buy back shares at the market price. Only the shares not covered by those proceeds add to the count.",
  },
  {
    id: "cagr",
    name: "Compound annual growth rate (CAGR)",
    group: EXL,
    courses: [XL, FM, PY],
    latex: String.raw`CAGR = \left(\frac{V_{\text{end}}}{V_{\text{begin}}}\right)^{1/n} - 1`,
    variables: [
      v(String.raw`V_{\text{begin}}, V_{\text{end}}`, "Starting and ending values"),
      v(String.raw`n`, "Number of years"),
    ],
    intuition:
      "It is the steady growth rate that would connect the start and end values, smoothing out year-to-year swings. It is the geometric mean growth rate, often built in Excel with RRI or a power formula.",
    calculator: "arithmetic-geometric-mean",
  },
  {
    id: "xnpv",
    name: "XNPV with irregular dates",
    group: EXL,
    courses: [XL, FM, PY],
    latex: String.raw`XNPV = \sum_{i=1}^{n}\frac{CF_i}{(1+r)^{(d_i - d_1)/365}}`,
    variables: [
      v(String.raw`CF_i`, "Cash flow on date i"),
      v(String.raw`d_i`, "Date of cash flow i (d_1 is the first date)"),
      v(String.raw`r`, "Annual discount rate"),
    ],
    intuition:
      "Real cash flows rarely land on neat annual dates, so the exponent uses the exact year fraction from the first date. XIRR solves for the rate that sets this sum to zero.",
    calculator: "npv-irr",
  },
  {
    id: "amortization-schedule",
    name: "Loan amortisation schedule row",
    group: EXL,
    courses: [XL, FM],
    latex: String.raw`\text{Int}_t = r\,B_{t-1}, \quad \text{Prin}_t = PMT - \text{Int}_t, \quad B_t = B_{t-1} - \text{Prin}_t`,
    variables: [
      v(String.raw`B_t`, "Outstanding balance after payment t"),
      v(String.raw`r`, "Periodic interest rate"),
      v(String.raw`PMT`, "Level payment"),
    ],
    intuition:
      "Each payment first covers interest on the remaining balance, and the rest repays principal. Early payments are mostly interest, but as the balance shrinks more of each payment goes to principal.",
    calculator: "loan-amortization",
  },
  {
    id: "discount-factor",
    name: "Discount factor",
    group: EXL,
    courses: [XL, FM, PY],
    latex: String.raw`DF_t = \frac{1}{(1+r)^t}, \qquad PV = \sum_t CF_t \times DF_t`,
    variables: [
      v(String.raw`r`, "Discount rate per period"),
      v(String.raw`t`, "Period number"),
    ],
    intuition:
      "Building a discount-factor row in a model makes the PV calculation transparent: each cash flow is multiplied by its factor and summed, mirroring SUMPRODUCT. It also makes it easy to switch to spot rates or mid-year timing.",
    calculator: "tvm",
  },
];
