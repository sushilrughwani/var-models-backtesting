import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import { CalculatorIndex } from "@/components/calculators/CalculatorIndex";

export const metadata: Metadata = { title: "Finance Calculators", description: "30 free finance calculators with formulas and explanations." };

export default function CalculatorsPage() {
  return (
    <Container className="py-14">
      <h1 className="text-4xl font-extrabold tracking-tight">Finance calculators</h1>
      <p className="mt-2 max-w-2xl text-muted">30 calculators covering time value of money, valuation, fixed income, derivatives and risk. Each one shows the formula, step-by-step outputs and an explanation.</p>
      <div className="mt-8"><CalculatorIndex basePath="/calculators" /></div>
    </Container>
  );
}
