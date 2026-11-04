import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = { title: { default: "Instructor", template: "%s | Instructor" }, robots: { index: false } };

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <AppShell area="instructor">{children}</AppShell>;
}
