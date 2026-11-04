"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, ChevronDown, Circle, PlayCircle } from "lucide-react";
import type { CourseOutline } from "@/lib/data/types";
import { useProgress } from "./useLearner";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";

export function LessonSidebar({ outline, current }: { outline: CourseOutline; current: string }) {
  const [progress] = useProgress();
  const done = progress[outline.slug] ?? {};
  const all = outline.modules.flatMap((m) => m.lessons);
  const pct = all.length ? (Object.keys(done).filter((k) => all.some((l) => l.slug === k)).length / all.length) * 100 : 0;
  const currentModule = outline.modules.find((m) => m.lessons.some((l) => l.slug === current))?.slug;
  const [open, setOpen] = useState<string[]>(currentModule ? [currentModule] : []);
  return (
    <div className="rounded-2xl border border-border bg-surface">
      <div className="border-b border-border p-4">
        <Link href={`/learn/courses/${outline.slug}`} className="font-semibold hover:text-primary">{outline.shortTitle}</Link>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          <Progress value={pct} label="Course progress" /> <span className="shrink-0">{Math.round(pct)}%</span>
        </div>
      </div>
      <nav aria-label="Course lessons" className="max-h-[70vh] overflow-y-auto p-2">
        {outline.modules.map((m, mi) => {
          const isOpen = open.includes(m.slug);
          const mDone = m.lessons.filter((l) => done[l.slug]).length;
          return (
            <div key={m.slug} className="mb-1">
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen((o) => (o.includes(m.slug) ? o.filter((x) => x !== m.slug) : [...o, m.slug]))} className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold hover:bg-surface-muted">
                <span>{mi + 1}. {m.title}</span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-normal text-muted">{mDone}/{m.lessons.length}<ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} /></span>
              </button>
              {isOpen && (
                <ol className="ml-1 space-y-0.5 border-l border-border pl-2">
                  {m.lessons.map((l) => {
                    const active = l.slug === current;
                    return (
                      <li key={l.slug}>
                        <Link href={`/learn/courses/${outline.slug}/${l.slug}`} aria-current={active ? "page" : undefined} className={cn("flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm", active ? "bg-primary/10 font-medium text-primary" : "text-muted hover:bg-surface-muted hover:text-foreground")}>
                          {done[l.slug] ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-label="Completed" /> : active ? <PlayCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0" />}
                          <span className="flex-1">{l.title}</span>
                          <span className="shrink-0 text-xs">{l.duration}m</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
