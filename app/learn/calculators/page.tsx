import { PageHeader } from "@/components/ui/Section";
import { CalculatorIndex } from "@/components/calculators/CalculatorIndex";

export const metadata = { title: "Calculators" };

export default function Page() {
  return (
    <div>
      <PageHeader title="Calculators" description="Check your working on any calculation." />
      <CalculatorIndex basePath="/learn/calculators" />
    </div>
  );
}
