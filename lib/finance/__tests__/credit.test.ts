import { describe, expect, it } from "vitest";
import { expectedLoss, hazardFromSpread } from "../credit";
import { meanTest } from "../hypothesis";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value;

describe("expected and unexpected loss", () => {
  it("EL = PD × LGD × EAD and UL", () => {
    const r = expectedLoss(0.02, 0.45, 1e6);
    expect(r.expectedLoss).toBeCloseTo(9000, 8);
    expect(r.unexpectedLoss).toBeCloseTo(62999.99999999999, 6);
    expect(expectedLoss(0.02, 0.45, 1e6, 0.2).unexpectedLoss).toBeCloseTo(69057.9466824782, 6);
  });
  it("calculator", () => {
    const c = getCalculator("expected-loss")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Expected loss") as number).toBeCloseTo(9000, 8);
    expect(c.compute({ ...defaultValues(c), pd: 120 }).error).toBeTruthy();
  });
});

describe("hazard rate", () => {
  it("λ = s/(1−R), survival and PD", () => {
    const r = hazardFromSpread(0.015, 0.4, 5);
    expect(r.hazardRate).toBeCloseTo(0.025, 14);
    expect(r.cumulativePd).toBeCloseTo(0.11750309741540454, 14);
    expect(r.schedule).toHaveLength(5);
    expect(r.schedule.reduce((a, x) => a + x.marginalPd, 0)).toBeCloseTo(r.cumulativePd, 14);
    expect(r.schedule[2].conditionalPd).toBeCloseTo(1 - Math.exp(-0.025), 14);
  });
  it("calculator", () => {
    const c = getCalculator("hazard-rate")!;
    expect(out(c.compute(defaultValues(c)), "Hazard rate") as number).toBeCloseTo(0.025, 14);
    expect(c.compute({ ...defaultValues(c), recovery: 100 }).error).toBeTruthy();
  });
});

describe("hypothesis test for a mean", () => {
  it("t-test two-tailed: t = 1.5, df = 24", () => {
    const r = meanTest(103, 100, 10, 25, 0.05, "t", "two");
    expect(r.statistic).toBeCloseTo(1.5, 14);
    expect(r.pValue).toBeCloseTo(0.14665564606818451, 10);
    expect(r.critical).toBeCloseTo(2.063898561629094, 8);
    expect(r.reject).toBe(false);
  });
  it("t-test right-tailed df = 9", () => {
    const se = 2 / Math.sqrt(10);
    const r = meanTest(100 + 2.1 * se, 100, 2, 10, 0.05, "t", "right");
    expect(r.pValue).toBeCloseTo(0.032559141206144726, 10);
    expect(r.reject).toBe(true);
  });
  it("z-tests", () => {
    const two = meanTest(52, 50, 8, 64, 0.05, "z", "two");
    expect(two.statistic).toBeCloseTo(2, 14);
    expect(two.pValue).toBeCloseTo(0.04550026389635842, 12);
    expect(two.critical).toBeCloseTo(1.959963984540054, 10);
    expect(two.reject).toBe(true);
    const left = meanTest(48.8, 50, 8, 64, 0.05, "z", "left");
    expect(left.pValue).toBeCloseTo(0.11506967022170833, 12);
    expect(left.critical).toBeCloseTo(-1.6448536269514715, 10);
  });
  it("calculator", () => {
    const c = getCalculator("hypothesis-test")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "t-statistic") as number).toBeCloseTo(1.5, 14);
    expect(out(res, "p-value") as number).toBeCloseTo(0.14665564606818451, 10);
    expect(out(res, "Decision")).toMatch(/Fail to reject/);
    expect(c.compute({ ...defaultValues(c), sd: 0 }).error).toBeTruthy();
  });
});
