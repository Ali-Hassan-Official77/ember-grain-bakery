"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Minus,
  Plus,
  ShoppingBasket,
  ArrowRight,
} from "lucide-react";

import type { Product } from "@/types";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/Button";

export function ProductDetailClient({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const router = useRouter();

  const total = product.price * quantity;

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(20, current + 1)
    );
  }

  function handleAdd() {
    addItem(product.id, quantity);

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  function handleBuyNow() {
    addItem(product.id, quantity);
    router.push("/cart");
  }

  return (
    <div>
      {/* =====================================================
          QUANTITY + ORDER SUMMARY
      ===================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-5
        "
      >
        {/* Quantity */}

        <div
          className="
            inline-flex
            h-12
            items-center
            rounded-full
            border
            border-ink/10
            bg-[#eadbc4]/40
            shadow-[0_8px_20px_-16px_rgba(40,26,18,0.5)]
            backdrop-blur-sm
          "
        >
          <button
            type="button"
            onClick={decreaseQuantity}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              text-ink-soft
              transition-all
              duration-200
              hover:bg-[#d7c1a3]/30
              hover:text-ink
              active:scale-90
            "
            aria-label="Decrease quantity"
          >
            <Minus
              size={14}
              strokeWidth={1.7}
            />
          </button>

          <span
            className="
              w-8
              text-center
              font-display
              text-[14px]
              font-medium
              text-ink
            "
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              text-ink-soft
              transition-all
              duration-200
              hover:bg-[#d7c1a3]/30
              hover:text-ink
              active:scale-90
            "
            aria-label="Increase quantity"
          >
            <Plus
              size={14}
              strokeWidth={1.7}
            />
          </button>
        </div>

        {/* Selection total */}

        <div>
          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-ink-soft
            "
          >
            Order total
          </p>

          <p
            className="
              mt-0.5
              font-display
              text-[17px]
              font-medium
              tracking-[-0.01em]
              text-ink
            "
          >
            {formatPrice(total)}
          </p>
        </div>
      </div>

      {/* =====================================================
          PRIMARY ACTIONS
      ===================================================== */}

      <div
        className="
          mt-6
          grid
          gap-3
          sm:grid-cols-[1fr_0.8fr]
        "
      >
        {/* Add to cart */}

        <Button
          variant="primary"
          onClick={handleAdd}
          className="
            group
            h-14
            w-full
            justify-center
            rounded-full
            text-[11px]
            font-medium
            uppercase
            tracking-[0.08em]
            shadow-[0_14px_28px_rgba(45,29,19,0.22)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_18px_32px_rgba(45,29,19,0.28)]
          "
        >
          {added ? (
            <>
              <Check
                size={16}
                strokeWidth={1.8}
              />

              Added to order
            </>
          ) : (
            <>
              <ShoppingBasket
                size={16}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />

              Add to basket
            </>
          )}
        </Button>

        {/* Buy now */}

        <Button
          variant="secondary"
          onClick={handleBuyNow}
          className="
            group
            h-14
            w-full
            justify-center
            rounded-full
            border
            border-ink/12
            bg-transparent
            text-[11px]
            font-medium
            uppercase
            tracking-[0.08em]
            text-ink
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#eadbc4]
            hover:shadow-[0_12px_24px_-16px_rgba(45,29,19,0.4)]
          "
        >
          Enjoy it now

          <ArrowRight
            size={15}
            strokeWidth={1.6}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Button>
      </div>

      {/* =====================================================
          FRESHNESS NOTE
      ===================================================== */}

      <div
        className="
          mt-5
          flex
          items-center
          gap-2.5
          text-[10px]
          leading-relaxed
          text-ink-soft
        "
      >
        <span
          className="
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#d8c5a9]
            text-ink
          "
        >
          <Check
            size={11}
            strokeWidth={2}
          />
        </span>

        <span>
          Baked fresh, packed with care, and prepared
          especially for your order.
        </span>
      </div>
    </div>
  );
}