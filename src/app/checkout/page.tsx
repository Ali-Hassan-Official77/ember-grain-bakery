"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import type { Product, DeliverySlot, PaymentMethod } from "@/types";
import { useCart, computeCartTotals } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/Button";

const SLOTS: { value: DeliverySlot; label: string; time: string }[] = [
  { value: "morning", label: "Morning", time: "8 – 11 AM" },
  { value: "afternoon", label: "Afternoon", time: "12 – 4 PM" },
  { value: "evening", label: "Evening", time: "5 – 8 PM" },
];

export default function CheckoutPage() {
  const { lines, clearCart, isHydrated } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [slot, setSlot] = useState<DeliverySlot>("morning");
  const [payment, setPayment] = useState<PaymentMethod>("cod");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data.products ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { items, subtotal } = useMemo(() => computeCartTotals(lines, products), [lines, products]);
  const deliveryFee = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (isHydrated && !loading && items.length === 0 && !submitting) {
      router.replace("/cart");
    }
  }, [isHydrated, loading, items.length, submitting, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      customer: {
        fullName: String(form.get("fullName") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        address: String(form.get("address") ?? ""),
        city: String(form.get("city") ?? ""),
        notes: String(form.get("notes") ?? ""),
      },
      items: lines,
      deliverySlot: slot,
      paymentMethod: payment,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong placing your order.");
      clearCart();
      router.push(`/order/${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-parchment py-16 md:py-20">
      <div className="container-wide">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft transition-colors hover:text-ink"
        >
          <ChevronLeft size={15} /> Back to Cart
        </Link>
        <h1 className="mt-6 font-display text-4xl text-ink md:text-5xl">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl text-ink">Delivery Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="fullName" required />
                <Field label="Phone number" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" className="sm:col-span-2" />
                <Field label="Delivery address" name="address" className="sm:col-span-2" required />
                <Field label="City" name="city" required defaultValue="Rawalpindi" />
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="notes" className="text-[13px] text-ink-soft">
                    Notes for the baker (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="e.g. leave with the guard, ring the bell twice…"
                    className="rounded-2xl border border-ink/12 bg-flour px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/60 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl text-ink">Delivery Slot</h2>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {SLOTS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSlot(s.value)}
                    className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                      slot === s.value
                        ? "border-gold bg-flour"
                        : "border-ink/12 bg-flour/50 hover:border-ink/25"
                    }`}
                  >
                    <span className="block font-display text-[15px] text-ink">{s.label}</span>
                    <span className="block text-[12px] text-ink-soft">{s.time}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl text-ink">Payment</h2>
              <div className="mt-5 space-y-3">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition-colors ${
                    payment === "cod" ? "border-gold bg-flour" : "border-ink/12 bg-flour/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                    className="accent-jam"
                  />
                  <span className="text-[14px] text-ink">Cash on Delivery</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition-colors ${
                    payment === "card" ? "border-gold bg-flour" : "border-ink/12 bg-flour/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                    className="accent-jam"
                  />
                  <span className="text-[14px] text-ink">Card on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-ink/10 bg-flour p-7">
            <h2 className="font-display text-lg text-ink">Order Summary</h2>
            <ul className="mt-5 space-y-3">
              {items.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex justify-between text-[13px] text-ink-soft">
                  <span>
                    {product.name} <span className="text-ink-soft/70">× {quantity}</span>
                  </span>
                  <span className="text-ink">{formatPrice(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="hairline my-5" />
            <div className="space-y-2 text-[14px] text-ink-soft">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-ink">{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
              </div>
            </div>
            <div className="hairline my-5" />
            <div className="flex justify-between font-display text-lg text-ink">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {error && <p className="mt-4 text-[13px] text-jam">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              className="mt-6 w-full"
              disabled={submitting || items.length === 0}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Placing Order…
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={name} className="text-[13px] text-ink-soft">
        {label} {required && <span className="text-jam">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="rounded-full border border-ink/12 bg-flour px-4 py-3 text-[14px] text-ink focus:border-gold focus:outline-none"
      />
    </div>
  );
}
