import { describe, expect, it } from "vitest";
import { bondDuration, bondPrice, bondYtm, priceChangeApprox } from "../bonds";
import { forwardRate, oneYearForwards } from "../rates";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value as number;

describe("bond price and YTM", () => {
  it("prices", () => {
    expect(bondPrice(1000, 0.05, 0.06, 10, 2)).toBeCloseTo(925.6126256977221, 9);
    expect(bondPrice(100, 0.08, 0.06, 5, 1)).toBeCloseTo(108.42472757113141, 10);
    expect(bondPrice(100, 0.05, 0.05, 7, 4)).toBeCloseTo(100, 10);
  });
  it("YTM from price and roundtrip", () => {
    expect(bondYtm(950, 1000, 0.05, 10, 2)!).toBeCloseTo(0.05661689076978438, 10);
    for (const y of [0.01, 0.045, 0.12]) {
      const p = bondPrice(1000, 0.07, y, 20, 2);
      expect(bondYtm(p, 1000, 0.07, 20, 2)!).toBeCloseTo(y, 10);
    }
  });
  it("calculator in both modes", () => {
    const c = getCalculator("bond-price-ytm")!;
    const d = defaultValues(c);
    expect(out(c.compute(d), "Price")).toBeCloseTo(925.6126256977221, 8);
    expect(out(c.compute({ ...d, mode: "ytm", price: 950 }), "Yield to maturity")).toBeCloseTo(0.05661689076978438, 9);
    expect(c.compute({ ...d, freq: 3 }).error).toBeTruthy();
  });
});

describe("duration and convexity", () => {
  it("3-year 10% annual bond at 10%: Macaulay 2.7355", () => {
    expect(bondDuration(100, 0.1, 0.1, 3, 1).macaulay).toBeCloseTo(2.735537190082645, 12);
  });
  it("matches finite-difference duration and convexity", () => {
    const d = bondDuration(100, 0.06, 0.05, 5, 2);
    expect(d.price).toBeCloseTo(104.37603196548555, 10);
    expect(d.modified).toBeCloseTo(4.300885456180396, 7);
    expect(d.macaulay).toBeCloseTo(4.408407592584905, 7);
    expect(d.convexity).toBeCloseTo(22.079023631714843, 3);
  });
  it("price-change approximation", () => {
    const a = priceChangeApprox(4.3, 22, 0.01);
    expect(a.total).toBeCloseTo(-0.043 + 0.0011, 14);
    const c = getCalculator("duration-convexity")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Actual % price change")).toBeCloseTo(-0.04192564023637735, 10);
    expect(Math.abs(out(res, "Estimated % price change") - out(res, "Actual % price change"))).toBeLessThan(5e-5);
  });
});

describe("forward rates", () => {
  it("annual and continuous", () => {
    expect(forwardRate(0.035, 2, 0.045, 5)).toBeCloseTo(0.051720286092572954, 13);
    expect(forwardRate(0.035, 2, 0.045, 5, "continuous")).toBeCloseTo(0.05166666666666666, 13);
    const f = oneYearForwards([0.03, 0.035, 0.04, 0.043, 0.045]);
    const ref = [0.03, 0.04002427184465995, 0.05007258045695373, 0.05205202300100242, 0.05303842452098717];
    f.forEach((x, i) => expect(x).toBeCloseTo(ref[i], 13));
  });
  it("calculator", () => {
    const c = getCalculator("forward-rates")!;
    expect(out(c.compute(defaultValues(c)), "Forward rate f(2,5)")).toBeCloseTo(0.051720286092572954, 12);
    expect(c.compute({ ...defaultValues(c), b: 9 }).error).toBeTruthy();
  });
});
