/** Hypothesis tests for a population mean (z and t). */
import { normCdf, normInv, tCdf, tInv } from "./stats";

export type Tail = "two" | "left" | "right";
export type TestKind = "z" | "t";

export interface MeanTestResult {
  standardError: number;
  statistic: number;
  df: number | null;
  pValue: number;
  /** Critical value(s): for a two-tailed test ±critical. */
  critical: number;
  reject: boolean;
}

/**
 * Test H₀: μ = μ₀ using statistic (x̄ − μ₀)/(s/√n). The z-test uses the standard normal; the t-test
 * uses Student's t with n − 1 degrees of freedom. Tail "left" tests H₁: μ < μ₀ and "right" H₁: μ > μ₀.
 */
export function meanTest(xbar: number, mu0: number, sd: number, n: number, alpha: number, kind: TestKind, tail: Tail): MeanTestResult {
  const se = sd / Math.sqrt(n);
  const stat = (xbar - mu0) / se;
  const df = kind === "t" ? n - 1 : null;
  const cdf = (x: number) => (df === null ? normCdf(x) : tCdf(x, df));
  const inv = (p: number) => (df === null ? normInv(p) : tInv(p, df));
  let pValue: number;
  let critical: number;
  let reject: boolean;
  if (tail === "two") {
    pValue = 2 * cdf(-Math.abs(stat));
    critical = inv(1 - alpha / 2);
    reject = Math.abs(stat) > critical;
  } else if (tail === "left") {
    pValue = cdf(stat);
    critical = inv(alpha);
    reject = stat < critical;
  } else {
    pValue = cdf(-stat);
    critical = inv(1 - alpha);
    reject = stat > critical;
  }
  return { standardError: se, statistic: stat, df, pValue: Math.min(1, pValue), critical, reject };
}
