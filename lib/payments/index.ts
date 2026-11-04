"use client";
/**
 * MOCK payments and enrollment.
 *
 * Checkout "succeeds" instantly and enrolls the user in localStorage. Coupons are validated on the
 * client against config/site.ts (plus coupons created in the instructor coupon manager).
 *
 * INTEGRATION: replace with a real gateway (Razorpay for INR, Stripe for international cards):
 *   1. POST /api/checkout creates an order server-side with the server-computed price (never trust
 *      client prices or coupons).
 *   2. Redirect / open the gateway checkout.
 *   3. The gateway calls POST /api/webhooks/<gateway>; verify the signature server-side, mark the
 *      order paid and create the enrollment in the database.
 *   4. The client polls / refreshes the session to see the new enrollment.
 */
import { siteConfig, type Currency, type Price } from "@/config/site";
import { KEYS, storage } from "@/lib/storage";
import { useStored } from "@/lib/storage/useStored";

export type PlanType = "selfStudy" | "premium" | "bundle";

export interface Enrollment {
  course: string;
  plan: PlanType;
  enrolledAt: string;
  expiresAt: string;
  orderId: string;
}

export interface Coupon {
  code: string;
  percentOff: number;
  description: string;
  active: boolean;
}

export interface CheckoutItem {
  /** Course slug for single-course plans, or bundle id. */
  id: string;
  plan: PlanType;
  name: string;
  price: Price;
  courseSlugs: string[];
  accessMonths: number;
}

export interface Order {
  id: string;
  items: CheckoutItem[];
  currency: Currency;
  subtotal: number;
  discount: number;
  total: number;
  coupon?: string;
  createdAt: string;
  status: "paid";
  mock: true;
}

export function allCoupons(): Coupon[] {
  const admin = storage.get<Coupon[]>(KEYS.adminCoupons, []);
  const base = siteConfig.coupons.map((c) => ({ ...c }));
  const merged = new Map<string, Coupon>();
  for (const c of [...base, ...admin]) merged.set(c.code.toUpperCase(), c);
  return [...merged.values()];
}

/** INTEGRATION: coupon validation must happen on the server at order creation time. */
export function validateCoupon(code: string): Coupon | null {
  const c = allCoupons().find((x) => x.code.toUpperCase() === code.trim().toUpperCase());
  return c && c.active ? c : null;
}

export function priceFor(courseSlug: string, plan: Exclude<PlanType, "bundle">): Price | null {
  const p = siteConfig.coursePricing[courseSlug];
  if (!p) return null;
  return plan === "premium" ? p.premium : p.selfStudy;
}

export function computeTotals(items: CheckoutItem[], currency: Currency, coupon: Coupon | null) {
  const subtotal = items.reduce((s, i) => s + i.price[currency], 0);
  const discount = coupon ? Math.round((subtotal * coupon.percentOff) / 100) : 0;
  return { subtotal, discount, total: Math.max(0, subtotal - discount) };
}

function addMonths(d: Date, m: number): Date {
  const x = new Date(d);
  x.setMonth(x.getMonth() + m);
  return x;
}

export interface PaymentProvider {
  checkout(items: CheckoutItem[], currency: Currency, couponCode?: string): Promise<Order>;
}

export const mockPayments: PaymentProvider = {
  async checkout(items, currency, couponCode) {
    // INTEGRATION: create the order on the server and redirect to the payment gateway.
    await new Promise((r) => setTimeout(r, 700)); // simulate network
    const coupon = couponCode ? validateCoupon(couponCode) : null;
    const totals = computeTotals(items, currency, coupon);
    const order: Order = {
      id: `MOCK-${Date.now().toString(36).toUpperCase()}`,
      items,
      currency,
      ...totals,
      coupon: coupon?.code,
      createdAt: new Date().toISOString(),
      status: "paid",
      mock: true,
    };
    // INTEGRATION: enrollment must be created by the verified payment webhook, not by the client.
    const now = new Date();
    const enrollments = storage.get<Record<string, Enrollment>>(KEYS.enrollments, {});
    for (const item of items) {
      for (const course of item.courseSlugs) {
        enrollments[course] = {
          course,
          plan: item.plan === "bundle" ? "premium" : item.plan,
          enrolledAt: now.toISOString(),
          expiresAt: addMonths(now, item.accessMonths).toISOString(),
          orderId: order.id,
        };
      }
    }
    storage.set(KEYS.enrollments, enrollments);
    storage.set(KEYS.orders, [...storage.get<Order[]>(KEYS.orders, []), order]);
    return order;
  },
};

export function useEnrollments(): Record<string, Enrollment> {
  const [e] = useStored<Record<string, Enrollment>>(KEYS.enrollments, {});
  return e;
}

export function useCurrency(): [Currency, (c: Currency) => void] {
  return useStored<Currency>(KEYS.currency, siteConfig.currency.default);
}

/** Build checkout items from URL params (?course=slug&plan=premium or ?bundle=id). */
export function buildItems(params: { course?: string | null; plan?: string | null; bundle?: string | null }): CheckoutItem[] {
  if (params.bundle) {
    const b = siteConfig.bundles.find((x) => x.id === params.bundle);
    if (!b) return [];
    return [{ id: b.id, plan: "bundle", name: b.name, price: b.price, courseSlugs: b.courseSlugs, accessMonths: b.accessMonths }];
  }
  if (params.course) {
    const plan = params.plan === "premium" ? "premium" : "selfStudy";
    const pricing = siteConfig.coursePricing[params.course];
    if (!pricing) return [];
    return [
      {
        id: params.course,
        plan,
        name: params.course,
        price: plan === "premium" ? pricing.premium : pricing.selfStudy,
        courseSlugs: [params.course],
        accessMonths: pricing.accessMonths,
      },
    ];
  }
  return [];
}
