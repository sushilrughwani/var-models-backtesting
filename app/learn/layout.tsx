import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = { title: { default: "Dashboard", template: "%s | Learn" }, robots: { index: false } };

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <AppShell area="student">{children}</AppShell>;
}
