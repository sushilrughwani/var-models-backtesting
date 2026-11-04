"use client";

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { storage } from "./index";

const noopSubscribe = () => () => {};

/** True after hydration on the client (false during SSR and the first client render). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * React hook for a persisted value. SSR-safe: renders `fallback` on the server and on the first
 * client render, then the stored value.
 */
export function useStored<T>(key: string, fallback: T): [T, (next: T | ((prev: T) => T)) => void] {
  const fallbackRef = useRef(fallback);
  const subscribe = useCallback(
    (cb: () => void) =>
      storage.subscribe((k) => {
        if (k === key || k === "*") cb();
      }),
    [key],
  );
  const raw = useSyncExternalStore(
    subscribe,
    () => storage.raw(key),
    () => null,
  );
  const value = useMemo<T>(() => {
    if (raw === null) return fallbackRef.current;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallbackRef.current;
    }
  }, [raw]);
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = storage.get<T>(key, fallbackRef.current);
      const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      storage.set(key, v);
    },
    [key],
  );
  return [value, set];
}
