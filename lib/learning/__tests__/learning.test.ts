import { describe, expect, it } from "vitest";
import { review, NEW_CARD, buildQueue } from "../sm2";
import { currentStreak, longestStreak } from "../streak";
import { buildPlan } from "../planner";
import { weakTopics, topicStats, incorrectIds, type Attempt } from "../analytics";
import { addDays, diffDays } from "../dates";

describe("SM-2", () => {
  it("follows the classic interval sequence 1, 6, round(6*EF)", () => {
    let s = review(NEW_CARD, 4, "2026-01-01");
    expect(s.interval).toBe(1);
    expect(s.due).toBe("2026-01-02");
    expect(s.easiness).toBeCloseTo(2.5, 6); // grade 4 leaves EF unchanged
    s = review(s, 4, "2026-01-02");
    expect(s.interval).toBe(6);
    s = review(s, 4, "2026-01-08");
    expect(s.interval).toBe(15); // round(6 * 2.5)
    expect(s.repetitions).toBe(3);
  });
  it("updates easiness: grade 5 +0.1, grade 3 -0.14, floor 1.3", () => {
    expect(review(NEW_CARD, 5, "2026-01-01").easiness).toBeCloseTo(2.6, 6);
    expect(review(NEW_CARD, 3, "2026-01-01").easiness).toBeCloseTo(2.36, 6);
    let s = NEW_CARD;
    for (let i = 0; i < 20; i++) s = review(s, 0, "2026-01-01");
    expect(s.easiness).toBe(1.3);
  });
  it("resets repetitions on a lapse", () => {
    let s = review(NEW_CARD, 5, "2026-01-01");
    s = review(s, 5, "2026-01-02");
    s = review(s, 1, "2026-01-08");
    expect(s.repetitions).toBe(0);
    expect(s.interval).toBe(1);
    expect(s.lapses).toBe(1);
  });
  it("builds a queue of due and new cards", () => {
    const states = { a: { ...NEW_CARD, due: "2026-01-01", repetitions: 1, interval: 1 }, b: { ...NEW_CARD, due: "2026-02-01" } };
    const q = buildQueue(["a", "b", "c", "d"], states, "2026-01-05", 1);
    expect(q.due).toEqual(["a"]);
    expect(q.fresh).toEqual(["c"]);
  });
});

describe("streaks", () => {
  it("counts consecutive days ending today or yesterday", () => {
    const days = ["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-05"];
    expect(currentStreak(days, "2026-03-05")).toBe(1);
    expect(currentStreak(days, "2026-03-04")).toBe(3);
    expect(currentStreak(days, "2026-03-07")).toBe(0);
    expect(longestStreak(days)).toBe(3);
  });
  it("date helpers handle month ends", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(diffDays("2026-03-01", "2026-02-01")).toBe(28);
  });
});

describe("planner", () => {
  const lessons = Array.from({ length: 10 }, (_, i) => ({ slug: `l${i}`, title: `L${i}`, moduleTitle: i < 5 ? "M1" : "M2", duration: 30 }));
  it("places every lesson once and adds revision weeks", () => {
    // each lesson = 30 min * 4 = 2 h; 20 h total; 10 weeks * 5 h
    const p = buildPlan({ lessons, startDate: "2026-01-01", examDate: "2026-03-12", hoursPerWeek: 5 });
    const placed = p.weeks.flatMap((w) => w.lessons.map((l) => l.slug));
    expect(placed).toEqual(lessons.map((l) => l.slug));
    expect(p.feasible).toBe(true);
    expect(p.weeks.filter((w) => w.kind === "revision").length).toBe(2); // round(10*0.15)=2 (actually 1.5 -> 2)
    expect(p.weeks.every((w) => w.kind === "revision" || w.hours <= 5 + 1e-9)).toBe(true);
  });
  it("flags infeasible plans but still schedules everything", () => {
    const p = buildPlan({ lessons, startDate: "2026-01-01", examDate: "2026-01-22", hoursPerWeek: 2 });
    expect(p.feasible).toBe(false);
    expect(p.weeks.flatMap((w) => w.lessons).length).toBe(10);
  });
  it("rejects exam dates in the past", () => {
    expect(buildPlan({ lessons, startDate: "2026-02-01", examDate: "2026-01-01", hoursPerWeek: 5 }).weeks).toEqual([]);
  });
});

describe("analytics", () => {
  const a = (qid: string, topic: string, correct: boolean, at: string): Attempt => ({ qid, course: "c", topic, correct, at, mode: "practice" });
  it("uses the latest attempt per question", () => {
    const at = [a("1", "t", false, "2026-01-01"), a("1", "t", true, "2026-01-02"), a("2", "t", false, "2026-01-01")];
    expect(topicStats(at)[0]).toMatchObject({ attempted: 2, correct: 1, accuracy: 0.5 });
    expect(incorrectIds(at)).toEqual(["2"]);
  });
  it("finds weak topics", () => {
    const at = [a("1", "x", false, "1"), a("2", "x", false, "1"), a("3", "x", true, "1"), a("4", "y", true, "1"), a("5", "y", true, "1"), a("6", "y", true, "1")];
    expect(weakTopics(at).map((s) => s.topic)).toEqual(["x"]);
  });
});
