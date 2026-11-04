"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { CourseSummary } from "@/lib/data/types";
import { CourseCard } from "./CourseCard";
import { Input, Select } from "@/components/ui/Form";
import { EmptyState } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

const categories = [
  { id: "all", label: "All" },
  { id: "cfa", label: "CFA®" },
  { id: "frm", label: "FRM®" },
  { id: "skills", label: "Skills" },
];

export function CourseCatalog({ courses }: { courses: CourseSummary[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get("category") ?? "all";
  const level = params.get("level") ?? "all";
  const [q, setQ] = useState("");
  const levels = useMemo(
    () => [...new Set(courses.filter((c) => category === "all" || c.category === category).map((c) => c.level))],
    [courses, category],
  );
  const setParam = (k: string, v: string) => {
    const p = new URLSearchParams(params.toString());
    if (v === "all") p.delete(k);
    else p.set(k, v);
    if (k === "category") p.delete("level");
    router.replace(`${pathname}${p.toString() ? `?${p}` : ""}`, { scroll: false });
  };
  const filtered = courses.filter(
    (c) =>
      (category === "all" || c.category === category) &&
      (level === "all" || c.level === level) &&
      (!q || `${c.title} ${c.shortDescription}`.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setParam("category", c.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium",
                category === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-surface-muted",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="level">
            Level
          </label>
          <Select id="level" value={level} onChange={(e) => setParam("level", e.target.value)} className="sm:w-52">
            <option value="all">All levels</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <Input aria-label="Search courses" placeholder="Search courses" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 sm:w-64" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {filtered.length} course{filtered.length === 1 ? "" : "s"}
      </p>
      {filtered.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState title="No courses match these filters">Try a different category or level.</EmptyState>
        </div>
      )}
    </div>
  );
}
