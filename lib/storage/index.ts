/**
 * Client-side persistence interface.
 *
 * All user state (enrollments, progress, notes, bookmarks, quiz attempts, flashcard schedule,
 * admin drafts, …) goes through this module. Today it is backed by window.localStorage; every
 * read and write is wrapped in try/catch so private browsing, quota errors or disabled storage
 * never crash the app.
 *
 * INTEGRATION: replace LocalStorageAdapter with an adapter that syncs to the backend API
 * (e.g. optimistic local cache + POST /api/progress). Keep the same get/set/subscribe contract.
 */

export interface StorageAdapter {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  /** Subscribe to changes of any key. Returns an unsubscribe function. */
  subscribe(listener: (key: string) => void): () => void;
  /** Raw string snapshot for a key (used by React's useSyncExternalStore). */
  raw(key: string): string | null;
}

const PREFIX = "fa:v1:";

class LocalStorageAdapter implements StorageAdapter {
  private listeners = new Set<(key: string) => void>();
  private memory = new Map<string, string>(); // fallback when localStorage is unavailable

  constructor() {
    if (typeof window !== "undefined") {
      try {
        window.addEventListener("storage", (e) => {
          if (e.key && e.key.startsWith(PREFIX)) this.emit(e.key.slice(PREFIX.length));
        });
      } catch {
        /* ignore */
      }
    }
  }

  private emit(key: string) {
    for (const l of this.listeners) {
      try {
        l(key);
      } catch {
        /* ignore listener errors */
      }
    }
  }

  raw(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      const v = window.localStorage.getItem(PREFIX + key);
      return v ?? this.memory.get(key) ?? null;
    } catch {
      return this.memory.get(key) ?? null;
    }
  }

  get<T>(key: string, fallback: T): T {
    const raw = this.raw(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    let json: string;
    try {
      json = JSON.stringify(value);
    } catch {
      return;
    }
    this.memory.set(key, json);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(PREFIX + key, json);
      } catch {
        /* quota exceeded or storage disabled: keep in-memory copy */
      }
    }
    this.emit(key);
  }

  remove(key: string): void {
    this.memory.delete(key);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(PREFIX + key);
      } catch {
        /* ignore */
      }
    }
    this.emit(key);
  }

  subscribe(listener: (key: string) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Remove every key written by this app (used by "Reset demo data"). */
  clearAll(): void {
    if (typeof window === "undefined") return;
    try {
      const keys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(PREFIX)) keys.push(k);
      }
      keys.forEach((k) => window.localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
    const memKeys = [...this.memory.keys()];
    this.memory.clear();
    memKeys.forEach((k) => this.emit(k));
    this.emit("*");
  }

  /** Export all app data as a JSON object (for the profile "download my data" button). */
  exportAll(): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    if (typeof window === "undefined") return out;
    try {
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(PREFIX)) out[k.slice(PREFIX.length)] = this.get(k.slice(PREFIX.length), null);
      }
    } catch {
      /* ignore */
    }
    return out;
  }
}

export const storage = new LocalStorageAdapter();

/** All storage keys used by the app, in one place. */
export const KEYS = {
  auth: "auth",
  enrollments: "enrollments",
  progress: "progress",
  lastLesson: "lastLesson",
  notes: "notes",
  bookmarks: "bookmarks",
  attempts: "attempts",
  flags: "flags",
  quizResults: "quizResults",
  mockResults: "mockResults",
  mockInProgress: "mockInProgress",
  srs: "srs",
  activity: "activity",
  planner: "planner",
  profile: "profile",
  currency: "currency",
  theme: "theme",
  discussions: "discussions",
  orders: "orders",
  adminCourses: "admin:courses",
  adminQuestions: "admin:questions",
  adminCoupons: "admin:coupons",
  adminAnnouncements: "admin:announcements",
  adminPricing: "admin:pricing",
} as const;
