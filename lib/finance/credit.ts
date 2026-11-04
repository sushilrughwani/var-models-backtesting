/** Credit risk: expected/unexpected loss and hazard rates implied by credit spreads. */

export interface ExpectedLossResult {
  lgd: number;
  expectedLoss: number;
  /** Unexpected loss (one standard deviation of loss). */
  unexpectedLoss: number;
  /** EL as a fraction of EAD. */
  elRate: number;
}

/**
 * Single exposure: EL = PD × LGD × EAD.
 * Unexpected loss UL = EAD·√(PD·σ²_LGD + LGD²·PD(1 − PD)), treating default as Bernoulli and LGD as an
 * independent random variable with standard deviation σ_LGD (σ_LGD = 0 gives EAD·LGD·√(PD(1 − PD))).
 */
export function expectedLoss(pd: number, lgd: number, ead: number, lgdStd = 0): ExpectedLossResult {
  const el = pd * lgd * ead;
  const ul = ead * Math.sqrt(pd * lgdStd * lgdStd + lgd * lgd * pd * (1 - pd));
  return { lgd, expectedLoss: el, unexpectedLoss: ul, elRate: pd * lgd };
}

export interface HazardResult {
  hazardRate: number;
  survival: number;
  cumulativePd: number;
  /** Year-by-year schedule. */
  schedule: { year: number; survival: number; cumulativePd: number; marginalPd: number; conditionalPd: number }[];
}

/**
 * Constant hazard rate implied by a credit spread s and recovery R: λ ≈ s/(1 − R).
 * Survival to T is Q(T) = e^{−λT}; cumulative PD = 1 − e^{−λT}.
 */
export function hazardFromSpread(spread: number, recovery: number, years: number): HazardResult {
  const lambda = spread / (1 - recovery);
  const schedule: HazardResult["schedule"] = [];
  const whole = Math.floor(years);
  const points = Array.from({ length: whole }, (_, i) => i + 1);
  if (years - whole > 1e-9) points.push(years);
  let prevS = 1;
  for (const t of points) {
    const s = Math.exp(-lambda * t);
    schedule.push({ year: t, survival: s, cumulativePd: 1 - s, marginalPd: prevS - s, conditionalPd: 1 - s / prevS });
    prevS = s;
  }
  const survival = Math.exp(-lambda * years);
  return { hazardRate: lambda, survival, cumulativePd: 1 - survival, schedule };
}
