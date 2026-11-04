import Link from "next/link";
import { notFound } from "next/navigation";
import { getCalculator } from "@/lib/calculators/registry";
import { CalculatorView } from "./CalculatorView";
import { Markdown } from "@/components/content/Markdown";
import { Badge } from "@/components/ui/Badge";

/** Shared server wrapper used by the public and student calculator routes. */
export function CalculatorPage({ slug, basePath }: { slug: string; basePath: string }) {
  const def = getCalculator(slug);
  if (!def) notFound();
  return (
    <div>
      <Link href={basePath} className="text-sm text-muted hover:text-foreground">← All calculators</Link>
      <div className="mt-3 flex flex-wrap items-center gap-2"><Badge tone="primary">{def.category}</Badge></div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{def.title}</h1>
      <p className="mt-1 text-muted">{def.description}</p>
      <div className="mt-6"><CalculatorView slug={slug} /></div>
      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-2 text-lg font-semibold">How it works</h2>
        <Markdown>{def.explanation}</Markdown>
      </section>
      <p className="mt-4 text-xs text-muted">Educational tool. Results are for learning purposes and should be checked before any real decision.</p>
    </div>
  );
}
