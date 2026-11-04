"use client";
/**
 * Typed helpers over /lib/storage for learner state. Components use these instead of raw keys.
 * INTEGRATION: each write here should also be sent to the backend (progress, attempts, notes…).
 */
import { KEYS, storage } from "@/lib/storage";
import { toDay } from "./dates";
import type { Attempt } from "./analytics";
import type { SrsState } from "./sm2";

export type ProgressMap = Record<string, Record<string, string>>; // course -> lesson -> completedAt ISO
export interface Bookmark {
  course: string;
  lesson: string;
  title: string;
  courseTitle?: string;
  at: string;
}
export interface QuizResult {
  score: number;
  total: number;
  at: string;
}
export interface MockResult {
  id: string;
  mockId: string;
  title: string;
  course: string;
  at: string;
  score: number;
  total: number;
  timeTakenSec: number;
  byTopic: Record<string, { correct: number; total: number }>;
  answers: Record<string, string>;
}
export interface PlannerSettings {
  course: string;
  examDate: string;
  hoursPerWeek: number;
  startDate: string;
}
export interface Profile {
  name: string;
  email: string;
  dailyGoalMinutes: number;
  examDate?: string;
  emailReminders: boolean;
}

export const DEFAULT_PROFILE: Profile = { name: "", email: "", dailyGoalMinutes: 60, emailReminders: true };

/** Record a day of study activity (used for streaks). */
export function recordActivity(): void {
  const days = storage.get<string[]>(KEYS.activity, []);
  const today = toDay();
  if (!days.includes(today)) storage.set(KEYS.activity, [...days, today].slice(-400));
}

export function setLessonComplete(course: string, lesson: string, done: boolean): void {
  const p = storage.get<ProgressMap>(KEYS.progress, {});
  const c = { ...(p[course] ?? {}) };
  if (done) c[lesson] = new Date().toISOString();
  else delete c[lesson];
  storage.set(KEYS.progress, { ...p, [course]: c });
  if (done) recordActivity();
}

export function setLastLesson(course: string, lesson: string, title: string): void {
  storage.set(KEYS.lastLesson, { course, lesson, title, at: new Date().toISOString() });
}

export function recordAttempts(list: Attempt[]): void {
  if (!list.length) return;
  const all = storage.get<Attempt[]>(KEYS.attempts, []);
  storage.set(KEYS.attempts, [...all, ...list].slice(-5000));
  recordActivity();
}

export function toggleFlag(qid: string): void {
  const flags = storage.get<string[]>(KEYS.flags, []);
  storage.set(KEYS.flags, flags.includes(qid) ? flags.filter((f) => f !== qid) : [...flags, qid]);
}

export function saveSrs(cardId: string, state: SrsState): void {
  const all = storage.get<Record<string, SrsState>>(KEYS.srs, {});
  storage.set(KEYS.srs, { ...all, [cardId]: state });
  recordActivity();
}
