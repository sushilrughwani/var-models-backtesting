/**
 * Registry of all calculator definitions, in the order of CALCULATOR_SLUGS.
 * Definitions live in ./defs; the maths they call lives in /lib/finance.
 */
import { CALCULATOR_SLUGS, type CalculatorDef, type CalculatorSlug } from "./types";
import { hprCalc, loanCalc, meansCalc, npvIrrCalc, tvmCalc } from "./defs/timeValue";
import { capmCalc, riskAdjustedCalc, twoAssetCalc } from "./defs/portfolio";
import { fcffDcfCalc, gordonCalc, waccCalc } from "./defs/corporate";
import { bondPriceYtmCalc, durationCalc, forwardRatesCalc } from "./defs/fixedIncome";
import { binomialCalc, bsmCalc, cipCalc, forwardCarryCalc, fraCalc, putCallParityCalc } from "./defs/derivatives";
import {
  ewmaCalc,
  expectedLossCalc,
  expectedShortfallCalc,
  garchCalc,
  hazardRateCalc,
  historicalVarCalc,
  parametricVarCalc,
  portfolioVarCalc,
} from "./defs/risk";
import { dupontCalc, hypothesisCalc } from "./defs/statsAnalysis";

const BY_SLUG: Record<CalculatorSlug, CalculatorDef> = {
  tvm: tvmCalc,
  "npv-irr": npvIrrCalc,
  "holding-period-return": hprCalc,
  "arithmetic-geometric-mean": meansCalc,
  "two-asset-portfolio": twoAssetCalc,
  "risk-adjusted-performance": riskAdjustedCalc,
  capm: capmCalc,
  wacc: waccCalc,
  "fcff-dcf": fcffDcfCalc,
  "gordon-growth": gordonCalc,
  "bond-price-ytm": bondPriceYtmCalc,
  "duration-convexity": durationCalc,
  "forward-rates": forwardRatesCalc,
  "forward-pricing-cost-of-carry": forwardCarryCalc,
  "fra-valuation": fraCalc,
  "black-scholes": bsmCalc,
  "binomial-option": binomialCalc,
  "put-call-parity": putCallParityCalc,
  "parametric-var": parametricVarCalc,
  "historical-var": historicalVarCalc,
  "expected-shortfall": expectedShortfallCalc,
  "portfolio-var": portfolioVarCalc,
  "ewma-volatility": ewmaCalc,
  "garch-forecast": garchCalc,
  "expected-loss": expectedLossCalc,
  "hazard-rate": hazardRateCalc,
  "hypothesis-test": hypothesisCalc,
  dupont: dupontCalc,
  "loan-amortization": loanCalc,
  "covered-interest-parity": cipCalc,
};

/** All calculators, one per slug, in CALCULATOR_SLUGS order. */
export const calculators: CalculatorDef[] = CALCULATOR_SLUGS.map((s) => BY_SLUG[s]);

/** Look up a calculator by slug. */
export function getCalculator(slug: string): CalculatorDef | undefined {
  return Object.prototype.hasOwnProperty.call(BY_SLUG, slug) ? BY_SLUG[slug as CalculatorSlug] : undefined;
}

/** Default input values of a calculator, keyed by input key. */
export function defaultValues(def: CalculatorDef): Record<string, number | string> {
  return Object.fromEntries(def.inputs.map((i) => [i.key, i.default]));
}
