import Link from "next/link";
import { Calculator } from "lucide-react";
import type { Formula } from "@/lib/data/types";
import { MathText, TeX } from "./MathText";

export function FormulaCard({ f, compact = false, calcHref }: { f: Formula; compact?: boolean; calcHref?: string }) {
  return (
    <article id={f.id} className="break-inside-avoid rounded-xl border border-border bg-surface p-5 print:p-3">
      <h3 className="font-semibold">{f.name}</h3>
      <div className="my-3 overflow-x-auto rounded-lg bg-surface-muted/60 px-3 py-2 print:bg-transparent">
        <TeX tex={f.latex} display />
      </div>
      {f.variables.length > 0 && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          {f.variables.map((v) => (
            <div key={v.symbol} className="contents">
              <dt><TeX tex={v.symbol} /></dt>
              <dd className="text-muted"><MathText text={v.meaning} /></dd>
            </div>
          ))}
        </dl>
      )}
      {!compact && f.intuition && <p className="mt-3 text-sm"><span className="font-semibold">Intuition: </span><MathText text={f.intuition} /></p>}
      {!compact && f.calculator && (
        <Link href={calcHref ?? `/calculators/${f.calculator}`} className="no-print mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <Calculator className="h-4 w-4" /> Open calculator
        </Link>
      )}
    </article>
  );
}
