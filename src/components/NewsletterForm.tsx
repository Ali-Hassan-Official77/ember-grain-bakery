"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="
          mt-5
          flex
          w-full
          items-start
          gap-3
          rounded-2xl
          border
          border-gold/20
          bg-gold/5
          px-4
          py-3.5
          sm:items-center
        "
      >
        <div
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gold
            text-espresso
          "
        >
          <Check size={14} />
        </div>

        <p
          className="
            min-w-0
            text-[12px]
            leading-relaxed
            text-gold-light
            sm:text-[13px]
          "
        >
          You&apos;re on the list — first bake alert
          lands next week.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-5 w-full max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label
        htmlFor="newsletter-email"
        className="sr-only"
      >
        Email address
      </label>

      <div
        className="
          flex
          w-full
          flex-col
          gap-2
          rounded-2xl
          border
          border-flour/15
          bg-flour/[0.045]
          p-1.5
          transition-all
          duration-300
          focus-within:border-gold/60
          focus-within:bg-flour/[0.07]
          sm:flex-row
          sm:gap-0
          sm:rounded-full
        "
      >
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Your email address"
          className="
            min-w-0
            w-full
            flex-1
            rounded-xl
            bg-transparent
            px-4
            py-3
            text-[13px]
            text-flour
            outline-none
            placeholder:text-flour/35
            sm:rounded-full
            sm:px-5
            sm:py-2.5
          "
        />

        <button
          type="submit"
          className="
            premium-button
            inline-flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gold
            px-5
            py-3
            text-[12px]
            font-semibold
            text-espresso
            transition-all
            duration-300
            hover:-translate-y-0.5
            sm:w-auto
            sm:rounded-full
            sm:py-2.5
          "
        >
          Subscribe
          <ArrowRight size={14} />
        </button>
      </div>

      <p
        className="
          mt-3
          px-2
          text-[9px]
          leading-relaxed
          text-flour/35
          sm:text-[10px]
        "
      >
        Occasional bake drops. No noise. Unsubscribe anytime.
      </p>
    </form>
  );
}