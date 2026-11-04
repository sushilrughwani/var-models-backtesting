"use client";

import type { Currency } from "@/config/site";
import { useCurrency } from "@/lib/payments";
import { useHydrated } from "@/lib/storage/useStored";
import { cn } from "@/lib/cn";

export function CurrencyToggle({ className }: { className?: string }) {
  const [currency, setCurrency] = useCurrency();
  const hydrated = useHydrated();
  const current = hydrated ? currency : "INR";
  return (
    <div className={cn("inline-flex rounded-lg border border-border bg-surface p-0.5 text-xs font-semibold", className)} role="group" aria-label="Display currency">
      {(["INR", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={current === c}
          onClick={() => setCurrency(c)}
          className={cn("rounded-md px-2.5 py-1", current === c ? "bg-primary text-primary-foreground" : "text-muted hover:text-foreground")}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
