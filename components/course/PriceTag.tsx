"use client";

import { formatPrice, siteConfig, type Price } from "@/config/site";
import { useCurrency } from "@/lib/payments";
import { useHydrated } from "@/lib/storage/useStored";

/** Shows a price in the visitor's chosen display currency (INR default). */
export function PriceTag({ price, listPrice, className }: { price: Price; listPrice?: Price | null; className?: string }) {
  const [currency] = useCurrency();
  const hydrated = useHydrated();
  const c = hydrated ? currency : siteConfig.currency.default;
  return (
    <span className={className}>
      <span className="font-bold">{formatPrice(price, c)}</span>
      {listPrice && <span className="ml-2 text-sm font-normal text-muted line-through">{formatPrice(listPrice, c)}</span>}
    </span>
  );
}
