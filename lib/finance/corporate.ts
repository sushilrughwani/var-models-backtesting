/** Corporate finance: cost of capital. */

export interface WaccResult {
  wacc: number;
  weightEquity: number;
  weightDebt: number;
  weightPreferred: number;
  afterTaxCostOfDebt: number;
  totalCapital: number;
}

/**
 * Weighted average cost of capital
 *   WACC = w_d·r_d·(1 − t) + w_p·r_p + w_e·r_e,
 * with weights from market values of equity E, debt D and preferred stock P.
 */
export function wacc(E: number, D: number, P: number, re: number, rd: number, rp: number, tax: number): WaccResult {
  const V = E + D + P;
  const we = E / V;
  const wd = D / V;
  const wp = P / V;
  const afterTax = rd * (1 - tax);
  return { wacc: wd * afterTax + wp * rp + we * re, weightEquity: we, weightDebt: wd, weightPreferred: wp, afterTaxCostOfDebt: afterTax, totalCapital: V };
}
