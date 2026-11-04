"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  meta?: ReactNode;
  content: ReactNode;
}

export function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = true,
  className,
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const baseId = useId();
  const toggle = (id: string) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : allowMultiple ? [...o, id] : [id]));
  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border bg-surface", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-muted/60"
              >
                <span className="font-semibold">{item.title}</span>
                <span className="flex shrink-0 items-center gap-3 text-sm text-muted">
                  {item.meta}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden />
                </span>
              </button>
            </h3>
            <div id={`${baseId}-${item.id}`} hidden={!isOpen} className="px-5 pb-5">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
