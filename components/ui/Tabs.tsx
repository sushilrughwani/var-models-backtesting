"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

/** Accessible tabs (WAI-ARIA tabs pattern, arrow-key navigation). */
export function Tabs({
  items,
  defaultTab,
  className,
  onChange,
}: {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (id: string) => {
    setActive(id);
    onChange?.(id);
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next >= 0) {
      e.preventDefault();
      refs.current[next]?.focus();
      select(items[next].id);
    }
  };
  return (
    <div className={className}>
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-border">
        {items.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${baseId}-panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              active === t.id ? "border-primary text-primary" : "border-transparent text-muted hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${baseId}-panel-${t.id}`}
          aria-labelledby={`${baseId}-tab-${t.id}`}
          hidden={active !== t.id}
          className="pt-5"
        >
          {active === t.id && t.content}
        </div>
      ))}
    </div>
  );
}
