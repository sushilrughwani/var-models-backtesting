import { describe, expect, it } from "vitest";
import { amortize, discountedPayback, irr, npv, tvmFV, tvmN, tvmPMT, tvmPV, tvmRate } from "../tvm";
import { getCalculator, defaultValues } from "@/lib/calculators/registry";
import type { CalcResult } from "@/lib/calculators/types";

const out = (res: CalcResult, label: string) => res.outputs.find((o) => o.label.startsWith(label))?.value;

// Expected values computed independently in Python (closed forms / bisection).
describe("TVM", () => {
  it("FV ordinary annuity and annuity due", () => {
    expect(tvmFV(0.05, 10, -1000, -100, 0)).toBeCloseTo(2886.683880332326, 8);
    expect(tvmFV(0.05, 10, -1000, -100, 1)).toBeCloseTo(2949.57334301007, 8);
  });
  it("PMT of a 200,000 30-year mortgage at 6% monthly", () => {
    expect(tvmPMT(0.005, 360, 200000, 0)).toBeCloseTo(-1199.1010503055138, 8);
  });
  it("PV of an annuity due", () => {
    expect(tvmPV(0.08, 5, 100, 0, 1)).toBeCloseTo(-431.2126840044335, 8);
  });
  it("rate and N for doubling", () => {
    expect(tvmRate(10, -1000, 0, 2000)!).toBeCloseTo(0.07177346253629313, 10);
    expect(tvmN(0.07, -1000, 0, 2000)!).toBeCloseTo(10.244768351058712, 10);
  });
  it("rate with payments (bond-like)", () => {
    expect(tvmRate(10, -950, 60, 1000)!).toBeCloseTo(0.06702116761326515, 10);
  });
  it("zero rate limits", () => {
    expect(tvmFV(0, 10, -100, -10)).toBeCloseTo(200, 10);
    expect(tvmN(0, -100, -10, 300)!).toBeCloseTo(20, 10);
  });
  it("returns null when no solution exists", () => {
    expect(tvmRate(10, 1000, 100, 1000)).toBeNull();
    expect(tvmN(0.05, 1000, 100, 1000)).toBeNull();
  });
  it("roundtrip PV -> FV -> rate", () => {
    const fv = tvmFV(0.0375, 24, -5000, -150, 1);
    expect(tvmRate(24, -5000, -150, fv, 1)!).toBeCloseTo(0.0375, 10);
  });
  it("calculator solves each variable", () => {
    const c = getCalculator("tvm")!;
    const base = defaultValues(c);
    expect(out(c.compute(base), "Future value") as number).toBeCloseTo(2886.683880332326, 6);
    const r = c.compute({ ...base, solveFor: "rate", pv: -1000, pmt: 0, fv: 2000, n: 10 });
    expect(out(r, "Rate") as number).toBeCloseTo(0.07177346253629313, 9);
    const n = c.compute({ ...base, solveFor: "n", rate: 7, pv: -1000, pmt: 0, fv: 2000 });
    expect(out(n, "Number") as number).toBeCloseTo(10.244768351058712, 9);
    const bad = c.compute({ ...base, solveFor: "rate", pv: 1000, pmt: 100, fv: 1000 });
    expect(bad.error).toBeTruthy();
    expect(c.compute({ ...base, n: "abc" }).error).toBeTruthy();
  });
});

describe("NPV and IRR", () => {
  it("NPV and IRR of the default project", () => {
    const cfs = [-1000, 300, 400, 500, 200];
    expect(npv(0.1, cfs)).toBeCloseTo(115.56587664776976, 9);
    expect(irr(cfs).irr!).toBeCloseTo(0.1532213787718154, 10);
  });
  it("IRR of [-100, 60, 60] = 13.0662%", () => {
    expect(irr([-100, 60, 60]).irr!).toBeCloseTo(0.13066238629180738, 10);
  });
  it("multiple IRRs and no IRR", () => {
    const res = irr([-100, 230, -132]);
    expect(res.all.length).toBe(2);
    expect(res.all[0]).toBeCloseTo(0.1, 9);
    expect(res.all[1]).toBeCloseTo(0.2, 9);
    expect(irr([100, 50, 20]).irr).toBeNull();
    expect(irr([-100, 10, 10]).irr).toBeLessThan(0);
  });
  it("discounted payback", () => {
    // Undiscounted case: -100, 50, 50, 50 -> 2 periods exactly.
    expect(discountedPayback(0, [-100, 50, 50, 50])!).toBeCloseTo(2, 12);
    expect(discountedPayback(0.1, [-100, 10, 10])).toBeNull();
  });
  it("calculator outputs and no-IRR message", () => {
    const c = getCalculator("npv-irr")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "NPV") as number).toBeCloseTo(115.56587664776976, 6);
    expect(out(res, "IRR") as number).toBeCloseTo(0.1532213787718154, 9);
    const none = c.compute({ rate: 10, cashFlows: "100, 50, 20" });
    expect(out(none, "IRR")).toBe("No IRR");
  });
});

describe("loan amortization", () => {
  it("payment, total interest and zero ending balance", () => {
    const res = amortize(250000, 0.06, 30, 12);
    const i = 0.005;
    const pmt = (250000 * i) / (1 - Math.pow(1 + i, -360));
    expect(res.payment).toBeCloseTo(1498.8763128818923, 8);
    expect(res.payment).toBeCloseTo(pmt, 10);
    expect(res.schedule).toHaveLength(360);
    expect(res.schedule[359].balance).toBe(0);
    expect(res.schedule[0].interest).toBeCloseTo(1250, 10);
    expect(res.totalInterest).toBeCloseTo(pmt * 360 - 250000, 4);
    const principalSum = res.schedule.reduce((a, r) => a + r.principal, 0);
    expect(principalSum).toBeCloseTo(250000, 6);
  });
  it("zero-rate loan", () => {
    const res = amortize(1200, 0, 1, 12);
    expect(res.payment).toBeCloseTo(100, 12);
    expect(res.schedule[11].balance).toBe(0);
  });
  it("calculator", () => {
    const c = getCalculator("loan-amortization")!;
    const res = c.compute(defaultValues(c));
    expect(out(res, "Payment per period") as number).toBeCloseTo(1498.8763128818923, 6);
    expect(out(res, "Ending balance")).toBe(0);
    expect(res.table!.rows).toHaveLength(360);
    expect(c.compute({ ...defaultValues(c), principal: -5 }).error).toBeTruthy();
  });
});
