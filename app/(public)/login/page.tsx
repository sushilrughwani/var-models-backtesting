import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Section";
import { LoginPanel } from "@/components/marketing/LoginPanel";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default function LoginPage() {
  return (
    <Container className="max-w-lg py-16">
      <h1 className="text-3xl font-bold tracking-tight">Log in</h1>
      <p className="mb-6 mt-2 text-muted">Welcome back. Choose how you want to continue.</p>
      <Suspense><LoginPanel /></Suspense>
    </Container>
  );
}
