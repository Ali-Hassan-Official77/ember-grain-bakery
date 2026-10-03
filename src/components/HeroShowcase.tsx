"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";

export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const spring = {
    stiffness: 150,
    damping: 20,
    mass: 0.65,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [7, -7]),
    spring
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-9, 9]),
    spring
  );

  const productX = useSpring(
    useTransform(mouseX, [0, 1], [-20, 20]),
    spring
  );

  const productY = useSpring(
    useTransform(mouseY, [0, 1], [-14, 14]),
    spring
  );

  const productRotate = useSpring(
    useTransform(mouseX, [0, 1], [-3, 3]),
    spring
  );

  const badgeX = useSpring(
    useTransform(mouseX, [0, 1], [-7, 7]),
    spring
  );

  const badgeY = useSpring(
    useTransform(mouseY, [0, 1], [-6, 6]),
    spring
  );

  const spotX = useTransform(
    mouseX,
    (value) => `${value * 100}%`
  );

  const spotY = useTransform(
    mouseY,
    (value) => `${value * 100}%`
  );

  const spotlight = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(
        360px circle at ${x} ${y},
        rgba(255,246,227,0.18),
        transparent 68%
      )`
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        hero-showcase
        relative
        mx-auto
        w-full
        max-w-[590px]
        overflow-visible
        px-2
        sm:px-0
      "
    >
      {/* =====================================================
          BACK ATMOSPHERE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[300px]
          w-[300px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gold/10
          blur-[80px]
          sm:h-[500px]
          sm:w-[500px]
          sm:blur-[120px]
        "
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          h-[190px]
          w-[190px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gold/10
          blur-[60px]
          sm:h-[280px]
          sm:w-[280px]
          sm:blur-[80px]
        "
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          DECORATIVE ORBIT
      ====================================================== */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[270px]
          w-[270px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-gold/20
          sm:h-[390px]
          sm:w-[390px]
        "
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[320px]
          w-[320px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-flour/10
          sm:h-[460px]
          sm:w-[460px]
        "
      />

      {/* =====================================================
          MAIN 3D CARD
      ====================================================== */}

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
        {/* Ground shadow */}

        <motion.div
          style={{
            x: productX,
            y: productY,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[72%]
            h-[45px]
            w-[60%]
            -translate-x-1/2
            rounded-full
            bg-black/40
            blur-[28px]
            sm:top-[76%]
            sm:h-[70px]
            sm:w-[65%]
            sm:blur-[38px]
          "
        />

        {/* =================================================
            CARD
        ================================================== */}

        <div
          className="
            hero-premium-card
            relative
            min-h-[570px]
            w-full
            overflow-hidden
            rounded-[28px]
            border
            border-gold/30
            bg-flour
            shadow-[0_35px_80px_-30px_rgba(0,0,0,0.65)]
            sm:min-h-[650px]
            sm:rounded-[42px]
            sm:shadow-[0_50px_110px_-35px_rgba(0,0,0,0.65)]
          "
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Paper grain */}

          <div
            className="
              grain-paper
              pointer-events-none
              absolute
              inset-0
              z-50
              opacity-[0.035]
              mix-blend-multiply
            "
          />

          {/* Mouse light */}

          <motion.div
            aria-hidden
            className="
              pointer-events-none
              absolute
              inset-0
              z-40
            "
            style={{
              background: spotlight,
            }}
          />

          {/* =================================================
              TOP HEADER
          ================================================== */}

          <div
            className="
              relative
              z-50
              flex
              items-start
              justify-between
              px-5
              pt-5
              sm:px-7
              sm:pt-7
            "
          >
            <div>
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-ink-soft
                  sm:text-[9px]
                  sm:tracking-[0.35em]
                "
              >
                The Daily Bake
              </p>

              <div className="mt-2 h-px w-9 bg-gold sm:w-12" />
            </div>

            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-ink/10
                bg-white/45
                px-2.5
                py-1.5
                backdrop-blur-md
                sm:gap-2
                sm:px-3.5
                sm:py-2
              "
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-50" />
                <span className="relative inline-flex h-full w-full rounded-full bg-gold" />
              </span>

              <span
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-ink
                  sm:text-[9px]
                  sm:tracking-[0.2em]
                "
              >
                Fresh Today
              </span>
            </div>
          </div>

          {/* =================================================
              PRODUCT AREA
          ================================================== */}

          <motion.div
            style={{
              x: productX,
              y: productY,
              rotate: productRotate,
              translateZ: 80,
            }}
            className="
              relative
              z-30
              mx-auto
              mt-2
              flex
              h-[275px]
              w-full
              items-center
              justify-center
              sm:mt-6
              sm:h-[350px]
            "
          >
            {/* Product spotlight */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[190px]
                w-[190px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-gold/15
                blur-[50px]
                sm:h-[260px]
                sm:w-[260px]
                sm:blur-[65px]
              "
            />

            {/* Product ground shadow */}

            <motion.div
              animate={{
                scaleX: [1, 0.88, 1],
                opacity: [0.28, 0.18, 0.28],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-[30px]
                left-1/2
                h-6
                w-[170px]
                -translate-x-1/2
                rounded-full
                bg-espresso/30
                blur-lg
                sm:bottom-[45px]
                sm:h-8
                sm:w-[220px]
                sm:blur-xl
              "
            />

            {/* Actual product */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                z-20
                h-[240px]
                w-[280px]
                drop-shadow-[0_22px_22px_rgba(36,24,17,0.42)]
                sm:h-[330px]
                sm:w-[390px]
                sm:drop-shadow-[0_30px_28px_rgba(36,24,17,0.42)]
              "
            >
              <Image
                src="/products/brezel.png"
                alt="Bavarian Pretzel"
                fill
                priority
                sizes="(max-width: 640px) 280px, 390px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* =================================================
              LEFT FLOATING LABEL
          ================================================== */}

          <motion.div
            style={{
              x: badgeX,
              y: badgeY,
              translateZ: 100,
            }}
            className="
              absolute
              left-[-18px]
              top-[150px]
              z-[60]
              hidden
              rotate-[-7deg]
              sm:block
            "
          >
            <div className="border border-ink/10 bg-parchment/90 px-5 py-3 shadow-[0_18px_35px_rgba(36,24,17,0.2)] backdrop-blur-md">
              <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-ink-soft">
                Handcrafted
              </p>

              <p className="mt-1 font-display text-[15px] text-ink">
                Since 06:30
              </p>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT FLOATING LABEL
          ================================================== */}

          <motion.div
            style={{
              x: useTransform(badgeX, (value) => -value),
              y: useTransform(badgeY, (value) => -value),
              translateZ: 100,
            }}
            className="
              absolute
              right-[-16px]
              top-[365px]
              z-[60]
              hidden
              rotate-[6deg]
              sm:block
            "
          >
            <div className="border border-gold/20 bg-espresso px-5 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <p className="text-[8px] uppercase tracking-[0.28em] text-flour/55">
                Signature
              </p>

              <p className="mt-1 font-display text-[15px] text-flour">
                Bavarian Style
              </p>
            </div>
          </motion.div>

          {/* =================================================
              PRODUCT CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-50
              px-5
              text-center
              sm:px-8
            "
            style={{
              transform: "translateZ(55px)",
            }}
          >
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-gold
                sm:text-[9px]
                sm:tracking-[0.42em]
              "
            >
              Signature Bake
            </p>

            <h2
              className="
                mt-2
                font-display
                text-[31px]
                leading-[0.95]
                tracking-[-0.035em]
                text-ink
                sm:mt-3
                sm:text-[38px]
                md:text-[42px]
              "
            >
              Bavarian
              <br />
              Pretzel
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-[260px]
                text-[11px]
                leading-relaxed
                text-ink-soft
                sm:mt-4
                sm:max-w-[300px]
                sm:text-[12px]
              "
            >
              Twisted by hand at dawn,
              <br />
              finished with sea salt.
            </p>
          </div>

          {/* =================================================
              BOTTOM DETAILS
          ================================================== */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-50
              border-t
              border-ink/10
              bg-white/35
              backdrop-blur-md
            "
          >
            <div className="grid grid-cols-3 divide-x divide-ink/10">
              <div className="px-2 py-4 text-center sm:px-4 sm:py-5">
                <p
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.18em]
                    text-ink-soft
                    sm:text-[8px]
                    sm:tracking-[0.25em]
                  "
                >
                  Texture
                </p>

                <p className="mt-1 font-display text-[11px] text-ink sm:text-xs">
                  Crisp
                </p>
              </div>

              <div className="px-2 py-4 text-center sm:px-4 sm:py-5">
                <p
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.18em]
                    text-ink-soft
                    sm:text-[8px]
                    sm:tracking-[0.25em]
                  "
                >
                  Finish
                </p>

                <p className="mt-1 font-display text-[11px] text-ink sm:text-xs">
                  Sea Salt
                </p>
              </div>

              <div className="px-2 py-4 text-center sm:px-4 sm:py-5">
                <p
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.18em]
                    text-ink-soft
                    sm:text-[8px]
                    sm:tracking-[0.25em]
                  "
                >
                  Batch
                </p>

                <p className="mt-1 font-display text-[11px] text-ink sm:text-xs">
                  No. 01
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}