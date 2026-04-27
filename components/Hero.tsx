"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";
import PetalField from "./PetalField";
import PhotoCard from "./PhotoCard";
import RoseCluster from "./RoseCluster";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden hero-bg px-4 pb-28 pt-10 md:px-6 md:pt-14">
      <PetalField count={16} className="opacity-80" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 14%, rgba(255,255,255,0.22), transparent 20%), radial-gradient(circle at 18% 28%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 82% 68%, rgba(255,213,213,0.08), transparent 34%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10">
        <div className="order-1 flex w-full flex-col items-center">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="hero-photo-shell"
          >
            <div className="photo-shimmer relative">
              <PhotoCard
                src="/images/couple-main.jpeg"
                alt={`${WEDDING.groomName} and ${WEDDING.brideName}`}
                className="hero-photo-main"
                imageClassName="portrait-crop-center"
                priority
                sizes="(max-width: 768px) 88vw, (max-width: 1280px) 70vw, 760px"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center px-8 pt-8 text-center md:px-10 md:pt-10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="eyebrow text-[#f3dde3]"
              >
                Wedding Day
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.28 }}
                className="mt-3 font-display text-lg tracking-[0.26em] text-cream/90 md:text-xl"
              >
                {WEDDING.dateDisplay}
              </motion.p>
              <motion.h1
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.35 }}
                className="mt-20 font-script text-6xl leading-[0.88] text-cream drop-shadow-[0_8px_26px_rgba(24,0,8,0.6)] md:mt-24 md:text-8xl"
              >
                <span className="block">{WEDDING.groomName}</span>
                <span className="my-2 block font-display text-xl tracking-[0.32em] text-[#f0d9c4] md:text-2xl">
                  &
                </span>
                <span className="block">{WEDDING.brideName}</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.82 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
            >
              <RoseCluster className="translate-y-8 scale-[0.74] md:translate-y-10 md:scale-[0.9]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="mt-10 max-w-md text-center"
          >
            <p className="font-display text-xl leading-relaxed text-cream/90 md:text-2xl">
              A joyful celebration wrapped in roses, family, and the beginning
              of our life together.
            </p>
          </motion.div>
        </div>

        <div className="order-2 flex w-full flex-col items-center gap-8">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="w-full"
          >
            <div className="relative mx-auto max-w-[12rem] md:max-w-[13rem]">
              <PhotoCard
                src="/images/groom-style.jpeg"
                alt={`${WEDDING.groomName} outfit inspiration`}
                className="hero-accent-photo photo-float-slow"
                imageClassName="groom-style-crop"
                label="Style Note"
                caption={WEDDING.groomName}
                sizes="(max-width: 768px) 46vw, 240px"
              />
              <div className="photo-card__glow" />
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="w-full"
          >
            <div className="relative mx-auto max-w-[12rem] md:max-w-[13rem]">
              <PhotoCard
                src="/images/couple-main.jpeg"
                alt={`${WEDDING.brideName} portrait`}
                className="hero-accent-photo photo-float-reverse"
                imageClassName="portrait-crop-right"
                label="Bride's Look"
                caption={WEDDING.brideName}
                sizes="(max-width: 768px) 46vw, 240px"
              />
              <div className="photo-card__glow" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.35 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest2 text-cream/70">
            Scroll
          </span>
          <div className="h-10 w-px animate-soft-pulse bg-cream/70" />
        </div>
      </motion.div>
    </section>
  );
}
