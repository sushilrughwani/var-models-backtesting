/** Holding-period, annualised and average returns. */

/** Holding-period return (P₁ − P₀ + D)/P₀. */
export function holdingPeriodReturn(beginValue: number, endValue: number, income = 0): number {
  return (endValue - beginValue + income) / beginValue;
}

/** Annualise a holding-period return earned over `years` years: (1 + HPR)^{1/years} − 1. */
export function annualizeReturn(hpr: number, years: number): number {
  return Math.pow(1 + hpr, 1 / years) - 1;
}

/** Continuously compounded equivalent of a holding-period return: ln(1 + HPR). */
export function logReturn(hpr: number): number {
  return Math.log(1 + hpr);
}

/** Arithmetic mean of periodic returns. */
export function arithmeticMeanReturn(returns: readonly number[]): number {
  return returns.reduce((a, b) => a + b, 0) / returns.length;
}

/** Geometric mean return [Π(1 + Rᵢ)]^{1/n} − 1. Returns NaN if any return ≤ −100%. */
export function geometricMeanReturn(returns: readonly number[]): number {
  if (returns.some((r) => r <= -1)) return NaN;
  const logSum = returns.reduce((a, r) => a + Math.log(1 + r), 0);
  return Math.exp(logSum / returns.length) - 1;
}

/** Harmonic mean of positive values n / Σ(1/xᵢ). */
export function harmonicMean(xs: readonly number[]): number {
  if (xs.some((x) => x <= 0)) return NaN;
  return xs.length / xs.reduce((a, x) => a + 1 / x, 0);
}
