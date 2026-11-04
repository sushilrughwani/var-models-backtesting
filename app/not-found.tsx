import Link from "next/link";
import { Compass } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main id="main" className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <Compass className="h-14 w-14 text-primary" aria-hidden />
        <p className="mt-6 text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">This page took an unexpected random walk</h1>
        <p className="mt-4 max-w-md text-muted">We could not find the page you were looking for. It may have moved, or the link may be mistyped.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass("primary", "lg")}>Back to home</Link>
          <Link href="/courses" className={buttonClass("outline", "lg")}>Browse courses</Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
