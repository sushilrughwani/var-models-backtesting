/** Financial statement analysis: DuPont decomposition of return on equity. */

export interface DupontResult {
  netMargin: number;
  assetTurnover: number;
  equityMultiplier: number;
  roe3: number;
  taxBurden: number;
  interestBurden: number;
  ebitMargin: number;
  roe5: number;
  roa: number;
}

/**
 * ROE = NI/Sales × Sales/Assets × Assets/Equity (3-step)
 *     = NI/EBT × EBT/EBIT × EBIT/Sales × Sales/Assets × Assets/Equity (5-step).
 */
export function dupont(netIncome: number, ebt: number, ebit: number, revenue: number, assets: number, equity: number): DupontResult {
  const netMargin = netIncome / revenue;
  const assetTurnover = revenue / assets;
  const equityMultiplier = assets / equity;
  const taxBurden = netIncome / ebt;
  const interestBurden = ebt / ebit;
  const ebitMargin = ebit / revenue;
  return {
    netMargin,
    assetTurnover,
    equityMultiplier,
    roe3: netMargin * assetTurnover * equityMultiplier,
    taxBurden,
    interestBurden,
    ebitMargin,
    roe5: taxBurden * interestBurden * ebitMargin * assetTurnover * equityMultiplier,
    roa: netIncome / assets,
  };
}
