import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getOrderById } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/Button";

const SLOT_LABEL: Record<string, string> = {
  morning: "Morning · 8 – 11 AM",
  afternoon: "Afternoon · 12 – 4 PM",
  evening: "Evening · 5 – 8 PM",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <section className="bg-parchment py-20">
      <div className="container-wide max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-jam/10 text-jam">
            <CheckCircle2 size={30} />
          </span>
          <h1 className="mt-6 font-display text-3xl text-ink md:text-4xl">
            Thank you, {order.customer.fullName.split(" ")[0]}.
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">
            Your order is in — we&apos;re getting it ready. A confirmation has been noted
            against order <span className="text-ink">{order.id}</span>.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-ink/10 bg-flour p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Order {order.id}</h2>
            <span className="rounded-full bg-espresso px-3 py-1 text-[11px] capitalize text-flour">
              {order.status}
            </span>
          </div>

          <ul className="mt-5 divide-y divide-ink/8">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between py-3 text-[14px]">
                <span className="text-ink-soft">
                  {item.name} <span className="text-ink-soft/70">× {item.quantity}</span>
                </span>
                <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="hairline my-5" />

          <div className="space-y-2 text-[14px] text-ink-soft">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-ink">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-ink">
                {order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}
              </span>
            </div>
          </div>
          <div className="hairline my-5" />
          <div className="flex justify-between font-display text-lg text-ink">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>

          <div className="mt-7 grid gap-4 border-t border-ink/8 pt-6 text-[13px] sm:grid-cols-2">
            <div>
              <p className="text-ink-soft">Delivery to</p>
              <p className="mt-1 text-ink">{order.customer.address}, {order.customer.city}</p>
            </div>
            <div>
              <p className="text-ink-soft">Delivery slot</p>
              <p className="mt-1 text-ink">{SLOT_LABEL[order.deliverySlot]}</p>
            </div>
            <div>
              <p className="text-ink-soft">Payment</p>
              <p className="mt-1 text-ink">
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Card on Delivery"}
              </p>
            </div>
            <div>
              <p className="text-ink-soft">Contact</p>
              <p className="mt-1 text-ink">{order.customer.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/shop" variant="secondary">
            Continue Browsing
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
