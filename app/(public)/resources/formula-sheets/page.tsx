import type { Metadata } from "next";
import Link from "next/link";
import { Sigma } from "lucide-react";
import { getFormulaGroups, getFormulas } from "@/lib/data";
import { slugify } from "@/lib/slug";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Formula Sheets" };

export default async function FormulaSheetsIndex() {
  const [groups, formulas] = await Promise.all([getFormulaGroups(), getFormulas()]);
  return (
    <Container className="py-14">
      <h1 className="text-4xl font-extrabold tracking-tight">Printable formula sheets</h1>
      <p className="mt-2 max-w-2xl text-muted">One sheet per topic. Open a sheet and use your browser&apos;s print dialog to save it as a PDF.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <Link key={g} href={`/resources/formula-sheets/${slugify(g)}`} className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-primary/50">
            <Sigma className="h-6 w-6 text-primary" />
            <span><span className="block font-semibold">{g}</span><span className="text-sm text-muted">{formulas.filter((f) => f.group === g).length} formulas</span></span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
