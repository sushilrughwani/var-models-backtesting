import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import { StyleguideDemo } from "@/components/marketing/StyleguideDemo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

export default function StyleguidePage() {
  return (
    <Container className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Design system</h1>
          <p className="text-muted">Every UI component in one place. Toggle dark mode to check both themes.</p>
        </div>
        <ThemeToggle className="rounded-lg border border-border p-2" />
      </div>
      <StyleguideDemo />
    </Container>
  );
}
