import { addDays, toDay } from "./dates";

/** Current streak: consecutive active days ending today (or yesterday if today has no activity yet). */
export function currentStreak(activeDays: string[], today: string = toDay()): number {
  const set = new Set(activeDays);
  let cursor = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(cursor)) {
    n++;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export function longestStreak(activeDays: string[]): number {
  const days = [...new Set(activeDays)].sort();
  let best = 0,
    run = 0;
  let prev: string | null = null;
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

/** Last `n` days with activity flags (oldest first) for a heatmap. */
export function lastNDays(activeDays: string[], n: number, today: string = toDay()): { day: string; active: boolean }[] {
  const set = new Set(activeDays);
  return Array.from({ length: n }, (_, i) => {
    const day = addDays(today, i - n + 1);
    return { day, active: set.has(day) };
  });
}
