import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const field =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(field, "h-10", className)} {...props} />;
}
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-24", className)} {...props} />;
}
export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(field, "h-10 pr-8", className)} {...props} />;
}
export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-sm font-medium", className)} {...props} />;
}
export function FieldHint({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-1 text-xs text-muted", className)} {...props} />;
}
export function Checkbox({ className, label, ...props }: ComponentProps<"input"> & { label: string }) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-sm", className)}>
      <input type="checkbox" className="h-4 w-4 rounded border-border accent-[var(--c-primary)]" {...props} />
      {label}
    </label>
  );
}
