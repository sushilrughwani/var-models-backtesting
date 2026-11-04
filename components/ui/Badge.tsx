import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "primary" | "accent" | "success" | "warning" | "danger" | "highlight";
const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-muted border-border",
  primary: "bg-primary/10 text-primary border-primary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/25",
  danger: "bg-danger/10 text-danger border-danger/20",
  highlight: "bg-highlight/10 text-highlight border-highlight/25",
};

export function Badge({ tone = "neutral", className, ...props }: ComponentProps<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
