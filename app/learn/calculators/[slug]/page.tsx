import { calculators } from "@/lib/calculators/registry";
import { CalculatorPage } from "@/components/calculators/CalculatorPage";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CalculatorPage slug={(await params).slug} basePath="/learn/calculators" />;
}
