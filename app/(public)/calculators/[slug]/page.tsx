import type { Metadata } from "next";
import { calculators, getCalculator } from "@/lib/calculators/registry";
import { Container } from "@/components/ui/Section";
import { CalculatorPage } from "@/components/calculators/CalculatorPage";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCalculator((await params).slug);
  return c ? { title: c.title, description: c.description } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <Container className="py-10"><CalculatorPage slug={(await params).slug} basePath="/calculators" /></Container>;
}
