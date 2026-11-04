/**
 * SM-2 spaced repetition (SuperMemo 2, P. Wozniak 1987).
 * Grade scale 0-5; grades below 3 reset the repetition count.
 */
import { addDays, toDay } from "./dates";

export interface SrsState {
  repetitions: number;
  interval: number; // days
  easiness: number; // EF, minimum 1.3
  due: string; // YYYY-MM-DD
  lastReviewed?: string;
  reviews?: number;
  lapses?: number;
}

export const NEW_CARD: SrsState = { repetitions: 0, interval: 0, easiness: 2.5, due: "1970-01-01", reviews: 0, lapses: 0 };

export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

/** UI buttons map onto SM-2 grades. */
export const GRADE_BUTTONS: { label: string; grade: Grade; hint: string }[] = [
  { label: "Again", grade: 1, hint: "Forgot it" },
  { label: "Hard", grade: 3, hint: "Recalled with effort" },
  { label: "Good", grade: 4, hint: "Recalled after a pause" },
  { label: "Easy", grade: 5, hint: "Instant recall" },
];

export function review(state: SrsState, grade: Grade, today: string = toDay()): SrsState {
  if (grade < 0 || grade > 5) throw new Error("grade must be 0-5");
  let { repetitions, interval } = state;
  if (grade >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * state.easiness);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }
  const q = grade;
  let easiness = state.easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easiness < 1.3) easiness = 1.3;
  easiness = Math.round(easiness * 1000) / 1000;
  return {
    repetitions,
    interval,
    easiness,
    due: addDays(today, interval),
    lastReviewed: today,
    reviews: (state.reviews ?? 0) + 1,
    lapses: (state.lapses ?? 0) + (grade < 3 ? 1 : 0),
  };
}

export function isDue(state: SrsState | undefined, today: string = toDay()): boolean {
  if (!state) return true; // new cards are due
  return state.due <= today;
}

/** Build today's review queue: due review cards first (most overdue first), then up to `newLimit` new cards. */
export function buildQueue(
  cardIds: string[],
  states: Record<string, SrsState | undefined>,
  today: string = toDay(),
  newLimit = 20,
): { due: string[]; fresh: string[] } {
  const due = cardIds
    .filter((id) => states[id] && isDue(states[id], today))
    .sort((a, b) => (states[a]!.due < states[b]!.due ? -1 : 1));
  const fresh = cardIds.filter((id) => !states[id]).slice(0, newLimit);
  return { due, fresh };
}
