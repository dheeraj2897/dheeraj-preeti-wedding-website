"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";
import PetalField from "./PetalField";
import PhotoCard from "./PhotoCard";
import RoseCluster from "./RoseCluster";

interface BubbleItem {
  id: number;
  type: "groom" | "bride";
  src: string;
  fallback: string;
  label: string;
  caption: string;
  description: string;
  sizeClass: string;
  positionClass: string;
  animClass: string;
  objectPosition?: string;
}

const BUBBLE_DATA: BubbleItem[] = [
  // Groom's bubbles (on the left side)
  {
    id: 1,
    type: "groom",
    src: "/images/bubble-gallery/groom-1.jpg",
    fallback: "/images/bubble-gallery/groom-1.jpg",
    label: "Dheeraj's Style",
    caption: "The Groom",
    description: "Dheeraj, looking elegant and handsome, anticipating the start of a beautiful journey of togetherness and love.",
    sizeClass: "w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px]",
    positionClass: "top-[4%] left-[2%] md:top-[6%] md:left-[3%] lg:top-[8%] lg:left-[4%]",
    animClass: "bubble-groom-1",
    objectPosition: "center 48%",
  },
  {
    id: 2,
    type: "groom",
    src: "/images/bubble-gallery/groom-parents.jpg",
    fallback: "/images/bubble-gallery/groom-parents.jpg",
    label: "Blessings & Love",
    caption: "Parents",
    description: "Groom's parents - Retd. Indian Air Force Warrior Shri Om Prakash Gupta & Smt. Bindu Gupta. Their blessings are our greatest strength.",
    sizeClass: "w-[65px] h-[65px] sm:w-[85px] sm:h-[85px] md:w-[110px] md:h-[110px] lg:w-[125px] lg:h-[125px]",
    positionClass: "top-[18%] left-[10%] md:top-[20%] md:left-[12%] lg:top-[22%] lg:left-[14%]",
    animClass: "bubble-groom-2",
    objectPosition: "center 53%",
  },
  {
    id: 3,
    type: "groom",
    src: "/images/bubble-gallery/uploaded-5.jpg",
    fallback: "/images/bubble-gallery/uploaded-5.jpg",
    label: "Beloved Brother",
    caption: "Younger Brother Neeraj",
    description: "Groom's younger brother Neeraj, bringing joy, laughter, and lifelong support to Dheeraj's beautiful journey.",
    sizeClass: "w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[135px] lg:h-[135px]",
    positionClass: "top-[32%] left-[1%] md:top-[34%] md:left-[3%] lg:top-[36%] lg:left-[4%]",
    animClass: "bubble-groom-3",
    objectPosition: "center 20%",
  },
  {
    id: 4,
    type: "groom",
    src: "/images/bubble-gallery/groom-sister.jpg",
    fallback: "/images/bubble-gallery/groom-sister.jpg",
    label: "Beloved Sister",
    caption: "Elder Sister",
    description: "Groom's elder sister Neelu, whose affection, guidance, and support are always with us.",
    sizeClass: "w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[95px] md:h-[95px] lg:w-[110px] lg:h-[110px]",
    positionClass: "top-[48%] left-[10%] md:top-[50%] md:left-[12%] lg:top-[52%] lg:left-[14%]",
    animClass: "bubble-groom-4",
    objectPosition: "center 52%",
  },
  {
    id: 5,
    type: "groom",
    src: "/images/bubble-gallery/groom-sister-husband.jpg",
    fallback: "/images/bubble-gallery/groom-sister-husband.jpg",
    label: "Sister & Jijaji",
    caption: "Neelu & Vishal",
    description: "Groom's elder sister Neelu and brother-in-law Vishal (Jijaji), sharing smiles and beautiful family warmth.",
    sizeClass: "w-[75px] h-[75px] sm:w-[95px] sm:h-[95px] md:w-[125px] md:h-[125px] lg:w-[140px] lg:h-[140px]",
    positionClass: "top-[62%] left-[2%] md:top-[64%] md:left-[4%] lg:top-[66%] lg:left-[5%]",
    animClass: "bubble-groom-5",
    objectPosition: "center 20%",
  },

  // Bride's bubbles (on the right side)
  {
    id: 6,
    type: "bride",
    src: "/images/bubble-gallery/uploaded-2.jpg",
    fallback: "/images/bubble-gallery/uploaded-2.jpg",
    label: "Grace & Elegance",
    caption: `${WEDDING.brideName}'s Radiant Grace`,
    description: "Dressed in a spectacular navy blue and pink lehenga with intricate golden embroidery, Preeti radiates pure elegance.",
    sizeClass: "w-[80px] h-[80px] sm:w-[105px] sm:h-[105px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px]",
    positionClass: "top-[4%] right-[2%] md:top-[6%] md:right-[3%] lg:top-[8%] lg:right-[4%]",
    animClass: "bubble-bride-1",
    objectPosition: "center 2%",
  },
  {
    id: 7,
    type: "bride",
    src: "/images/bubble-gallery/uploaded-3.jpg",
    fallback: "/images/bubble-gallery/uploaded-3.jpg",
    label: "Sunny Charm",
    caption: "Preeti in Pink Saree",
    description: "Smiling gracefully in a gorgeous pink/red saree, Preeti radiates joy and elegance under the bright sun.",
    sizeClass: "w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[115px] md:h-[115px] lg:w-[130px] lg:h-[130px]",
    positionClass: "top-[18%] right-[10%] md:top-[20%] md:right-[12%] lg:top-[22%] lg:right-[14%]",
    animClass: "bubble-bride-2",
    objectPosition: "center 40%",
  },
  {
    id: 8,
    type: "bride",
    src: "/images/bubble-gallery/uploaded-1.jpg",
    fallback: "/images/bubble-gallery/uploaded-1.jpg",
    label: "Vibrant Grace",
    caption: "Elegant Blue Saree",
    description: "A serene and elegant portrait of Preeti in a vibrant blue saree, standing gracefully against a backdrop of lush green foliage.",
    sizeClass: "w-[75px] h-[75px] sm:w-[95px] sm:h-[95px] md:w-[125px] md:h-[125px] lg:w-[145px] lg:h-[145px]",
    positionClass: "top-[32%] right-[1%] md:top-[34%] md:right-[3%] lg:top-[36%] lg:right-[4%]",
    animClass: "bubble-bride-3",
    objectPosition: "center 52%",
  },
  {
    id: 9,
    type: "bride",
    src: "/images/bubble-gallery/uploaded-4.jpg",
    fallback: "/images/bubble-gallery/uploaded-4.jpg",
    label: "Warm Blessings",
    caption: "Bride's Parents",
    description: "Bride's loving parents sharing a beautiful moment at the historic Ellora Caves. Their guidance and affection pave our way forward.",
    sizeClass: "w-[65px] h-[65px] sm:w-[80px] sm:h-[80px] md:w-[105px] md:h-[105px] lg:w-[120px] lg:h-[120px]",
    positionClass: "top-[48%] right-[10%] md:top-[50%] md:right-[12%] lg:top-[52%] lg:right-[14%]",
    animClass: "bubble-bride-4",
  },
  {
    id: 10,
    type: "bride",
    src: "/images/bubble-gallery/bride-mehndi.png",
    fallback: "/images/bubble-gallery/bride-mehndi.png",
    label: "Auspicious Mehndi",
    caption: "Mehndi Designs",
    description: "Preeti's hands adorned with intricate, dark crimson Mehndi patterns, symbolizing deep love, prosperity, and joy.",
    sizeClass: "w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[135px] lg:h-[135px]",
    positionClass: "top-[62%] right-[2%] md:top-[64%] md:right-[4%] lg:top-[66%] lg:right-[5%]",
    animClass: "bubble-bride-5",
    objectPosition: "center center",
  },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [selectedBubble, setSelectedBubble] = useState<BubbleItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden hero-bg px-4 pb-28 pt-10 md:px-6 md:pt-14">
      <PetalField count={36} className="opacity-80 animate-soft-pulse" />

      {/* Decorative Radial Gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 14%, rgba(255,255,255,0.22), transparent 20%), radial-gradient(circle at 18% 28%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 82% 68%, rgba(255,213,213,0.08), transparent 34%)",
        }}
      />

      {/* Floating Bubbles Gallery Layer (Over Main Content with Clicks Passed Through) */}
      <div className="absolute inset-0 z-[12] overflow-hidden pointer-events-none">
        {BUBBLE_DATA.map((bubble) => {
          const hasError = imageErrors[bubble.id];
          const currentSrc = hasError ? bubble.fallback : bubble.src;

          return (
            <div
              key={bubble.id}
              className={`bubble-gallery-card absolute group pointer-events-auto ${reduce ? "" : bubble.animClass} ${bubble.positionClass} ${bubble.sizeClass}`}
              style={{
                zIndex: 12 + (bubble.id % 5),
              }}
              onClick={() => setSelectedBubble(bubble)}
            >
              <div className="relative h-full w-full">
                {/* Background Reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe3a3]/5 via-[#ffffff]/10 to-[#ffe3a3]/20 opacity-60 transition-opacity group-hover:opacity-85" />

                {/* The Image inside circular frame */}
                <div className="absolute inset-1.5 overflow-hidden rounded-full border border-[#ffe3a3]/30 bg-[#4a0015]/40 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={currentSrc}
                    alt={bubble.caption}
                    fill
                    sizes="(max-width: 768px) 100px, 160px"
                    className="object-cover transition-all duration-700 group-hover:rotate-2 group-hover:scale-110"
                    style={{ objectPosition: bubble.objectPosition || "center" }}
                    onError={() => handleImageError(bubble.id)}
                  />
                </div>

                {/* Soft glass rim overlay */}
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                <div className="absolute inset-[3px] rounded-full border border-dashed border-[#ffe3a3]/20 pointer-events-none group-hover:border-[#ffe3a3]/45 transition-colors duration-300" />
                
                {/* View indicator tag */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-semibold uppercase tracking-widest2 text-[#ffe3a3]">
                    View
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content (In Front of Bubbles) */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="flex w-full flex-col items-center">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.05 }}
            className="relative mb-5 h-20 w-20 overflow-hidden rounded-full border border-[#ffe3a3]/40 bg-[#4a0015]/20 shadow-[0_12px_30px_rgba(28,0,8,0.28)] md:h-24 md:w-24"
          >
            <Image
              src="/images/Gold Mirror Acrylic Self Adhesive Ganesha Sticker - 14 inch.jpeg"
              alt="Lord Ganesha"
              fill
              sizes="(max-width: 768px) 80px, 96px"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="hero-photo-shell"
          >
            <div className="photo-shimmer relative">
              <PhotoCard
                src="/images/ChatGPT Image May 20, 2026, 04_58_13 PM (2).png"
                alt={`${WEDDING.groomName} and ${WEDDING.brideName}`}
                className="hero-photo-main"
                imageClassName="portrait-crop-center"
                priority
                sizes="(max-width: 768px) 88vw, (max-width: 1280px) 70vw, 760px"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-between px-8 py-8 text-center md:px-10 md:py-10">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="eyebrow font-semibold text-[#ffe3a3]"
                  style={{
                    textShadow: "0 1px 3px rgba(15, 0, 4, 0.95), 0 2px 8px rgba(15, 0, 4, 0.8), 0 4px 16px rgba(15, 0, 4, 0.5)"
                  }}
                >
                  Engagement Day 💎
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.28 }}
                  className="mt-3 font-display text-lg tracking-[0.26em] text-[#fff4d3] md:text-xl"
                  style={{
                    textShadow: "0 1px 3px rgba(15, 0, 4, 0.95), 0 2px 8px rgba(15, 0, 4, 0.8), 0 4px 16px rgba(15, 0, 4, 0.5)"
                  }}
                >
                  {WEDDING.dateDisplay}
                </motion.p>
              </div>
              <motion.h1
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.35 }}
                className="mb-20 font-script text-5xl leading-[0.88] text-[#ffe8b7] md:mb-24 md:text-7xl xl:text-8xl"
                style={{
                  textShadow: "0 2px 4px rgba(15, 0, 4, 0.95), 0 8px 24px rgba(15, 0, 4, 0.8), 0 16px 40px rgba(15, 0, 4, 0.5)"
                }}
              >
                <span className="block">{WEDDING.groomName}</span>
                <span className="my-2 block font-display text-xl tracking-[0.32em] text-[#ffffff] md:text-2xl">
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
              A blissful celebration of love, cherished blessings, and the beautiful beginning of our life together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal (For Bubble Clicks) */}
      <AnimatePresence>
        {selectedBubble && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1c0008]/85 p-4 backdrop-blur-md md:p-6"
            onClick={() => setSelectedBubble(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-[#ffe3a3]/30 bg-[#4a0015]/40 p-1 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer decorative ring border */}
              <div className="absolute inset-4 rounded-[2rem] border border-[#ffe3a3]/10 pointer-events-none" />

              <div className="flex flex-col overflow-hidden rounded-[2.2rem] md:flex-row">
                {/* Photo Side */}
                <div className="relative aspect-[4/5] w-full bg-[#1c0008]/40 md:aspect-square md:w-[48%]">
                  <Image
                    src={imageErrors[selectedBubble.id] ? selectedBubble.fallback : selectedBubble.src}
                    alt={selectedBubble.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                  {/* Photo Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none md:hidden" />
                </div>

                {/* Content Side */}
                <div className="relative flex w-full flex-col justify-center p-8 text-left md:w-[52%] md:p-12 lg:p-14">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedBubble(null)}
                    className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffe3a3]/30 bg-[#3a000f]/80 text-[#ffe3a3] transition-all hover:bg-[#ffe3a3] hover:text-[#4a0015]"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <span className="eyebrow text-[#ffe3a3] mb-2">{selectedBubble.label}</span>
                  <h3 className="font-display text-2xl tracking-wide text-white md:text-3xl lg:text-4xl">
                    {selectedBubble.caption}
                  </h3>
                  
                  <div className="my-6 h-px w-16 bg-[#ffe3a3]/30" />
                  
                  <p className="font-display text-base leading-relaxed text-cream/90 md:text-lg">
                    {selectedBubble.description}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#ffe3a3]" />
                    <span className="font-display text-xs uppercase tracking-widest2 text-[#ffe3a3]/80">
                      {selectedBubble.type === "groom" ? "Groom's Album" : "Bride's Album"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll Indicator */}
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
