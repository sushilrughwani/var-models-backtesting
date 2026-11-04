"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, Search } from "lucide-react";
import { calculators } from "@/lib/calculators/registry";
import { Input } from "@/components/ui/Form";

export function CalculatorIndex({ basePath }: { basePath: string }) {
  const [q, setQ] = useState("");
  const list = calculators.filter((c) => !q || `${c.title} ${c.description} ${c.category}`.toLowerCase().includes(q.toLowerCase()));
  const cats = [...new Set(list.map((c) => c.category))];
  return (
    <div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        <Input aria-label="Search calculators" placeholder="Search calculators" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>
      {cats.map((cat) => (
        <section key={cat} className="mt-8">
          <h2 className="text-lg font-semibold">{cat}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.filter((c) => c.category === cat).map((c) => (
              <Link key={c.slug} href={`${basePath}/${c.slug}`} className="group flex gap-3 rounded-xl border border-border bg-surface p-4 hover:border-primary/50">
                <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span><span className="block font-medium group-hover:text-primary">{c.title}</span><span className="mt-0.5 block text-sm text-muted">{c.description}</span></span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      {list.length === 0 && <p className="mt-8 text-muted">No calculators match “{q}”.</p>}
    </div>
  );
}
