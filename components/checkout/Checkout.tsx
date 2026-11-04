"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CheckCircle2, Lock, Tag } from "lucide-react";
import { formatPrice, siteConfig } from "@/config/site";
import { buildItems, computeTotals, mockPayments, useCurrency, validateCoupon, type Coupon, type Order } from "@/lib/payments";
import { mockAuth, useSession } from "@/lib/auth";
import { useHydrated } from "@/lib/storage/useStored";
import { Button, buttonClass } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Form";
import { Callout } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { CurrencyToggle } from "@/components/layout/CurrencyToggle";
import { useToast } from "@/components/ui/Toast";

export function Checkout({ courseTitles }: { courseTitles: Record<string, string> }) {
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();
  const hydrated = useHydrated();
  const [currency] = useCurrency();
  const { toast, mockEmail } = useToast();
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [plan, setPlan] = useState(params.get("plan") === "premium" ? "premium" : "selfStudy");

  const course = params.get("course");
  const bundle = params.get("bundle");
  const items = useMemo(() => buildItems({ course, plan, bundle }), [course, plan, bundle]);
  const named = items.map((i) => ({ ...i, name: i.plan === "bundle" ? i.name : `${courseTitles[i.id] ?? i.id} — ${i.plan === "premium" ? "Premium" : "Self-Study"}` }));
  const totals = computeTotals(items, currency, coupon);
  const money = (n: number) => formatPrice({ INR: n, USD: n }, currency);

  if (!items.length) {
    return (
      <Callout tone="warning" title="Nothing to check out">
        Choose a course or bundle first. <Link className="font-semibold text-primary" href="/pricing">See pricing</Link>
      </Callout>
    );
  }

  if (order) {
    return (
      <div className="rounded-2xl border border-success/40 bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h2 className="mt-4 text-2xl font-bold">You are enrolled!</h2>
        <p className="mt-2 text-muted">Order {order.id} · {money(order.total)} (mock payment — no money was charged)</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/learn" className={buttonClass("primary", "lg")}>Go to my dashboard</Link>
          <Link href="/courses" className={buttonClass("outline", "lg")}>Browse more courses</Link>
        </div>
      </div>
    );
  }

  const apply = () => {
    const c = validateCoupon(code);
    if (c) {
      setCoupon(c);
      setCouponError("");
      toast({ title: `Coupon ${c.code} applied`, description: c.description, tone: "success" });
    } else {
      setCoupon(null);
      setCouponError("That code is not valid or has expired.");
    }
  };

  const pay = async () => {
    setBusy(true);
    try {
      if (hydrated && session.role === "guest") mockAuth.signIn("student");
      const o = await mockPayments.checkout(items, currency, coupon?.code);
      setOrder(o);
      toast({ title: "Payment successful (mock)", tone: "success" });
      mockEmail(session.email || "student@example.com", `Receipt for order ${o.id}`);
      router.refresh();
    } catch {
      toast({ title: "Payment failed", description: "Please try again.", tone: "error" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <Callout tone="warning" title="Demo checkout">
          This is a mock payment flow. No card details are collected and nothing is charged. Completing it enrolls you locally in this browser.
        </Callout>
        {course && !bundle && (
          <fieldset className="rounded-2xl border border-border bg-surface p-5">
            <legend className="px-1 text-sm font-semibold">Plan</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["selfStudy", "premium"] as const).map((p) => {
                const price = siteConfig.coursePricing[course]?.[p];
                return (
                  <label key={p} className={`cursor-pointer rounded-xl border p-4 ${plan === p ? "border-primary bg-primary/5" : "border-border"}`}>
                    <input type="radio" name="plan" className="sr-only" checked={plan === p} onChange={() => setPlan(p)} />
                    <span className="flex items-center justify-between font-semibold">
                      {p === "premium" ? "Premium" : "Self-Study"}
                      {plan === p && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </span>
                    {price && <span className="mt-1 block text-lg">{formatPrice(price, currency)}</span>}
                    <span className="mt-1 block text-xs text-muted">{p === "premium" ? "Adds instructor Q&A, live sessions, mocks and certificate" : "All lessons, notes and practice tools"}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm font-semibold">Account</p>
          <p className="mt-1 text-sm text-muted">
            {hydrated && session.role !== "guest" ? `Signed in as ${session.name} (${session.email})` : "You will be signed in as the demo student when you complete checkout."}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <Label htmlFor="coupon">Coupon code</Label>
          <div className="flex gap-2">
            <Input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. WELCOME10" aria-describedby="coupon-help" />
            <Button variant="outline" onClick={apply} disabled={!code.trim()}>
              <Tag className="h-4 w-4" /> Apply
            </Button>
          </div>
          <p id="coupon-help" className="mt-1 text-xs text-muted">Demo codes: {siteConfig.coupons.map((c) => c.code).join(", ")}</p>
          {couponError && <p className="mt-2 text-sm text-danger" role="alert">{couponError}</p>}
        </div>
      </div>
      <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-20">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Order summary</h2>
          <CurrencyToggle />
        </div>
        <ul className="mt-4 space-y-3 text-sm">
          {named.map((i) => (
            <li key={i.id} className="flex justify-between gap-3">
              <span>{i.name}<span className="block text-xs text-muted">{i.accessMonths} months access</span></span>
              <span className="font-medium">{formatPrice(i.price, currency)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{money(totals.subtotal)}</dd></div>
          {coupon && (
            <div className="flex justify-between text-success"><dt>Discount <Badge tone="success">{coupon.code}</Badge></dt><dd>−{money(totals.discount)}</dd></div>
          )}
          <div className="flex justify-between text-lg font-bold"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
        </dl>
        <Button size="lg" className="mt-6 w-full" onClick={pay} disabled={busy}>
          <Lock className="h-4 w-4" /> {busy ? "Processing…" : "Pay now (mock)"}
        </Button>
        <p className="mt-3 text-xs text-muted">{siteConfig.currency.note} By paying you agree to the <Link className="underline" href="/legal/terms">Terms</Link> and <Link className="underline" href="/legal/refund">Refund Policy</Link>.</p>
      </aside>
    </div>
  );
}
