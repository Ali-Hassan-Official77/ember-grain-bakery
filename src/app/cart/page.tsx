"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBasket,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import type { Product } from "@/types";
import {
  useCart,
  computeCartTotals,
} from "@/context/CartContext";

import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/Button";
import {
  getProductImage,
} from "@/lib/productImages";

export default function CartPage() {
  const {
    lines,
    updateQuantity,
    removeItem,
    isHydrated,
  } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setProducts(data.products ?? []);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { items, subtotal } =
    computeCartTotals(lines, products);

  const isEmpty =
    isHydrated &&
    !loading &&
    items.length === 0;

  const delivery =
    subtotal >= 2000 ? 0 : 150;

  const total = subtotal + delivery;

  return (
    <section className="relative overflow-hidden bg-parchment py-16 md:py-24">
      {/* background decoration */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-80
          w-80
          rounded-full
          bg-gold/5
          blur-3xl
        "
      />

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-jam/5
          blur-3xl
        "
      />

      <div className="container-wide relative">
        {/* heading */}
        <div className="max-w-xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-jam">
            Your selection
          </p>

          <h1 className="font-display text-5xl leading-none text-ink md:text-6xl">
            Your Cart
          </h1>

          <p className="mt-5 max-w-md text-[14px] leading-7 text-ink-soft">
            A few good things from today&apos;s bake.
            Everything is prepared in small batches and
            packed fresh.
          </p>
        </div>

        {loading || !isHydrated ? (
          <div className="mt-20 flex justify-center">
            <div className="rounded-full border border-ink/10 bg-flour px-6 py-3 text-[13px] text-ink-soft">
              Preparing your basket…
            </div>
          </div>
        ) : isEmpty ? (
          <div className="mt-16 rounded-[36px] border border-ink/10 bg-flour p-12 text-center shadow-[0_30px_70px_-40px_rgba(36,24,17,0.4)] md:p-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-espresso text-flour">
              <ShoppingBasket size={25} />
            </div>

            <h2 className="mt-6 font-display text-2xl text-ink">
              Your basket is empty.
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-[14px] leading-7 text-ink-soft">
              Nothing wrong with that. But we think
              something warm, buttery and fresh would
              improve the situation.
            </p>

            <ButtonLink
              href="/shop"
              variant="primary"
              className="premium-button mt-7"
            >
              Browse the Menu
              <ArrowRight size={15} />
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
            {/* =================================================
                ITEMS
                ================================================= */}

            <div>
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  {items.length}{" "}
                  {items.length === 1 ? "item" : "items"}
                </span>

                <span className="text-[12px] text-ink-muted">
                  Freshly baked
                </span>
              </div>

              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {items.map(
                  ({
                    product,
                    quantity,
                    lineTotal,
                  }) => (
                    <li
                      key={product.id}
                      className="
                        group
                        relative
                        flex
                        gap-5
                        py-7
                        sm:gap-7
                      "
                    >
                      {/* image */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="
                          relative
                          flex
                          h-[108px]
                          w-[108px]
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-[24px]
                          border
                          border-gold/15
                          bg-flour-dim
                        "
                      >
                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-white/25
                            to-transparent
                          "
                        />

                        <img
                          src={getProductImage(product.icon)}
                          alt={product.name}
                          className="
                            relative
                            h-full
                            w-full
                            scale-[1.35]
                            object-contain
                            drop-shadow-[0_12px_10px_rgba(36,24,17,0.28)]
                            transition-transform
                            duration-500
                            group-hover:scale-[1.45]
                          "
                        />
                      </Link>

                      {/* content */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${product.slug}`}
                          className="
                            font-display
                            text-[19px]
                            text-ink
                            transition-colors
                            hover:text-jam
                          "
                        >
                          {product.name}
                        </Link>

                        <p className="mt-1 text-[12px] text-ink-soft">
                          {formatPrice(product.price)} /{" "}
                          {product.unit}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          {/* quantity */}
                          <div
                            className="
                              flex
                              items-center
                              rounded-full
                              border
                              border-ink/15
                              bg-parchment
                            "
                          >
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  quantity - 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-ink-soft transition-colors hover:text-ink"
                              aria-label={`Decrease ${product.name} quantity`}
                            >
                              <Minus size={13} />
                            </button>

                            <span className="w-7 text-center text-[13px] font-medium">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  quantity + 1
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center text-ink-soft transition-colors hover:text-ink"
                              aria-label={`Increase ${product.name} quantity`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* remove */}
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(product.id)
                            }
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-[12px]
                              text-ink-muted
                              transition-colors
                              hover:text-jam
                            "
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* price */}
                      <span className="hidden shrink-0 font-display text-[17px] text-ink sm:block">
                        {formatPrice(lineTotal)}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* =================================================
                SUMMARY
                ================================================= */}

            <aside className="lg:sticky lg:top-28">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-gold/20
                  bg-flour
                  p-7
                  shadow-[0_30px_70px_-35px_rgba(36,24,17,0.5)]
                "
              >
                <div
                  aria-hidden
                  className="
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-gold/10
                    blur-3xl
                  "
                />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={14}
                      className="text-gold"
                    />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                      Order summary
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl text-ink">
                    A good bake is on its way.
                  </h2>

                  <div className="mt-7 space-y-4 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-ink-soft">
                        Subtotal
                      </span>

                      <span className="text-ink">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-ink-soft">
                        Delivery
                      </span>

                      <span className="text-ink">
                        {delivery === 0
                          ? "Free"
                          : formatPrice(delivery)}
                      </span>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-ink/10" />

                  <div className="flex items-end justify-between">
                    <span className="font-display text-lg text-ink">
                      Estimated Total
                    </span>

                    <span className="font-display text-2xl text-jam">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <ButtonLink
                    href="/checkout"
                    variant="primary"
                    className="
                      premium-button
                      mt-7
                      w-full
                      justify-center
                    "
                  >
                    Proceed to Checkout
                    <ArrowRight size={15} />
                  </ButtonLink>

                  <p className="mt-4 text-center text-[11px] leading-5 text-ink-muted">
                    Free delivery on orders over{" "}
                    {formatPrice(2000)}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}