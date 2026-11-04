import type { Metadata } from "next";
import { Suspense } from "react";
import { getCourseSummaries } from "@/lib/data";
import { Container } from "@/components/ui/Section";
import { Checkout } from "@/components/checkout/Checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage() {
  const courses = await getCourseSummaries();
  const titles = Object.fromEntries(courses.map((c) => [c.slug, c.title]));
  return (
    <Container className="max-w-5xl py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>
      <Suspense>
        <Checkout courseTitles={titles} />
      </Suspense>
    </Container>
  );
}
