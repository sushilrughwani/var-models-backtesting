/** Equity valuation: Gordon growth model and FCFF discounted cash flow. */

export interface GordonResult {
  nextDividend: number;
  value: number;
  dividendYield: number;
}

/** Gordon (constant-growth) DDM: V₀ = D₀(1 + g)/(r − g). Requires r > g. */
export function gordonGrowth(d0: number, g: number, r: number): GordonResult {
  const d1 = d0 * (1 + g);
  const value = d1 / (r - g);
  return { nextDividend: d1, value, dividendYield: d1 / value };
}

/** Required return implied by a market price: r = D₁/P₀ + g. */
export function gordonImpliedReturn(d0: number, g: number, price: number): number {
  return (d0 * (1 + g)) / price + g;
}

export interface DcfResult {
  pvExplicit: number;
  terminalValue: number;
  pvTerminal: number;
  enterpriseValue: number;
  equityValue: number;
  valuePerShare: number;
  /** Discounted value of each explicit FCFF. */
  pvByYear: number[];
  terminalShare: number;
}

/**
 * Two-stage FCFF DCF. Explicit FCFF₁…FCFF_N are discounted at the WACC; the terminal value at N is
 * TV_N = FCFF_N(1 + g)/(WACC − g). Enterprise value = PV(explicit) + PV(TV); equity = EV − net debt.
 */
export function fcffDcf(fcff: readonly number[], waccRate: number, g: number, debt: number, cash: number, shares: number): DcfResult {
  const N = fcff.length;
  const pvByYear = fcff.map((c, i) => c / Math.pow(1 + waccRate, i + 1));
  const pvExplicit = pvByYear.reduce((a, b) => a + b, 0);
  const terminalValue = (fcff[N - 1] * (1 + g)) / (waccRate - g);
  const pvTerminal = terminalValue / Math.pow(1 + waccRate, N);
  const ev = pvExplicit + pvTerminal;
  const equity = ev - debt + cash;
  return { pvExplicit, terminalValue, pvTerminal, enterpriseValue: ev, equityValue: equity, valuePerShare: equity / shares, pvByYear, terminalShare: pvTerminal / ev };
}
