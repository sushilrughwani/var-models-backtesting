import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getFormulaGroups, getFormulas } from "@/lib/data";
import { slugify } from "@/lib/slug";
import { Container } from "@/components/ui/Section";
import { FormulaCard } from "@/components/content/FormulaCard";
import { PrintButton } from "@/components/content/PrintButton";

export async function generateStaticParams() {
  return (await getFormulaGroups()).map((g) => ({ group: slugify(g) }));
}

async function find(slug: string) {
  return (await getFormulaGroups()).find((g) => slugify(g) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }): Promise<Metadata> {
  const g = await find((await params).group);
  return { title: g ? `${g} formula sheet` : "Formula sheet" };
}

export default async function FormulaSheet({ params }: { params: Promise<{ group: string }> }) {
  const group = await find((await params).group);
  if (!group) notFound();
  const list = (await getFormulas()).filter((f) => f.group === group);
  return (
    <Container className="py-10 print:py-0">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/resources/formula-sheets" className="text-sm text-muted hover:text-foreground">← All formula sheets</Link>
        <PrintButton />
      </div>
      <header className="mb-6 border-b border-border pb-4">
        <p className="text-sm font-semibold text-primary">{siteConfig.brand.name} · Formula sheet</p>
        <h1 className="text-3xl font-extrabold tracking-tight">{group}</h1>
        <p className="mt-1 text-sm text-muted">{list.length} formulas · original study aid, not official exam material</p>
      </header>
      <div className="columns-1 gap-4 space-y-4 md:columns-2 print:columns-2">
        {list.map((f) => <FormulaCard key={f.id} f={f} />)}
      </div>
      <p className="mt-8 text-xs text-muted">{siteConfig.legal.trademarkDisclaimer}</p>
    </Container>
  );
}
