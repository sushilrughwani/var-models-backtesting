import { describe, expect, it } from "vitest";
import { erf, erfc, lnGamma, mean, normCdf, normInv, quantile, regIncBeta, stdev, tCdf, tInv } from "../stats";

// Reference values from Python's math.erf / math.lgamma / statistics.NormalDist and closed-form t CDFs.
describe("normal distribution", () => {
  it("normCdf matches reference values to 1e-12", () => {
    expect(normCdf(-3)).toBeCloseTo(0.0013498980316301035, 14);
    expect(normCdf(-1)).toBeCloseTo(0.15865525393145707, 13);
    expect(normCdf(0)).toBe(0.5);
    expect(normCdf(0.35)).toBeCloseTo(0.636830651175619, 13);
    expect(normCdf(1.96)).toBeCloseTo(0.9750021048517796, 13);
    expect(normCdf(2.5)).toBeCloseTo(0.9937903346742238, 13);
  });
  it("is accurate in the far tail (relative)", () => {
    expect(normCdf(-5) / 2.866515718791946e-7).toBeCloseTo(1, 10);
    expect(normCdf(-8) / 6.220960574271819e-16).toBeCloseTo(1, 9);
  });
  it("erf/erfc", () => {
    expect(erf(0.1)).toBeCloseTo(0.1124629160182849, 14);
    expect(erf(0.5)).toBeCloseTo(0.5204998778130465, 14);
    expect(erf(1)).toBeCloseTo(0.8427007929497149, 14);
    expect(erf(2.4)).toBeCloseTo(0.999311486103355, 14);
    expect(erf(3)).toBeCloseTo(0.9999779095030014, 14);
    expect(erf(-1)).toBeCloseTo(-0.8427007929497149, 14);
    expect(erfc(-1) + erfc(1)).toBeCloseTo(2, 14);
  });
  it("normInv inverts the CDF", () => {
    expect(normInv(0.001)).toBeCloseTo(-3.090232306167813, 11);
    expect(normInv(0.025)).toBeCloseTo(-1.9599639845400538, 11);
    expect(normInv(0.5)).toBeCloseTo(0, 12);
    expect(normInv(0.9)).toBeCloseTo(1.2815515655446008, 11);
    expect(normInv(0.999999)).toBeCloseTo(4.753424308817089, 9);
    expect(normInv(0.99)).toBeCloseTo(2.3263478740408408, 11);
    expect(Number.isNaN(normInv(1.5))).toBe(true);
  });
});

describe("gamma, beta and t distribution", () => {
  it("lnGamma", () => {
    expect(lnGamma(0.5)).toBeCloseTo(0.5723649429247004, 13);
    expect(lnGamma(1)).toBeCloseTo(0, 13);
    expect(lnGamma(3.7)).toBeCloseTo(1.4280723266653883, 13);
    expect(lnGamma(10.3)).toBeCloseTo(13.48203678613836, 12);
    expect(lnGamma(100)).toBeCloseTo(359.1342053695754, 10);
  });
  it("regIncBeta edge and symmetric cases", () => {
    expect(regIncBeta(0, 2, 3)).toBe(0);
    expect(regIncBeta(1, 2, 3)).toBe(1);
    expect(regIncBeta(0.5, 3, 3)).toBeCloseTo(0.5, 13);
    // I_x(1, b) = 1 − (1 − x)^b
    expect(regIncBeta(0.3, 1, 4)).toBeCloseTo(1 - Math.pow(0.7, 4), 13);
  });
  it("tCdf matches closed forms for df = 1, 2, 4", () => {
    expect(tCdf(-2, 1)).toBeCloseTo(0.14758361765043326, 12);
    expect(tCdf(0.7, 1)).toBeCloseTo(0.6944001122142147, 12);
    expect(tCdf(3, 1)).toBeCloseTo(0.8975836176504333, 12);
    expect(tCdf(-2, 2)).toBeCloseTo(0.09175170953613693, 12);
    expect(tCdf(0.7, 2)).toBeCloseTo(0.7218034876835673, 12);
    expect(tCdf(3, 2)).toBeCloseTo(0.9522670168666454, 12);
    expect(tCdf(1.2, 4)).toBeCloseTo(0.8518243033438233, 12);
  });
  it("tCdf matches numerical integration and tends to the normal", () => {
    expect(1 - tCdf(1.5, 24)).toBeCloseTo(0.14665564606818451 / 2, 10);
    expect(1 - tCdf(2.1, 9)).toBeCloseTo(0.032559141206144726, 10);
    expect(tCdf(1.96, 1e6)).toBeCloseTo(normCdf(1.96), 6);
  });
  it("tInv", () => {
    expect(tInv(0.975, 24)).toBeCloseTo(2.063898561629094, 8);
    expect(tCdf(tInv(0.05, 7), 7)).toBeCloseTo(0.05, 12);
  });
});

describe("descriptive statistics", () => {
  it("mean, stdev, quantile", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
    expect(stdev([2, 4, 4, 4, 5, 5, 7, 9], false)).toBeCloseTo(2, 12);
    expect(stdev([1, 2, 3, 4])).toBeCloseTo(Math.sqrt(5 / 3), 12);
    expect(quantile([1, 2, 3, 4, 5], 0.25)).toBeCloseTo(2, 12);
  });
});
