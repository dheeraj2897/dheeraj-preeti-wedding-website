"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Letter from "@/components/Letter";
import Countdown from "@/components/Countdown";
import Schedule from "@/components/Schedule";
import LocationSection from "@/components/Location";
import Details from "@/components/Details";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;

    let animationFrameId: number;
    let startTimeout: NodeJS.Timeout;
    let active = true;

    const startScroll = () => {
      if (!active) return;

      const tick = () => {
        if (!active) return;

        // Scroll down continuously as long as we are not at the very bottom
        if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) {
          window.scrollBy(0, 0.45); // Very slow and elegant (0.45px per frame)
        }
        animationFrameId = requestAnimationFrame(tick);
      };

      animationFrameId = requestAnimationFrame(tick);
    };

    // Initial delay of 3 seconds before starting auto-scroll
    startTimeout = setTimeout(() => {
      startScroll();
    }, 3000);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(startTimeout);
    };
  }, [opened]);

  return (
    <>
      {/* Envelope overlay — shown fullscreen until opened */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#6d001f]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <Envelope onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site content */}
      <AnimatePresence>
        {opened && (
          <motion.main
            key="site-content"
            className="relative overflow-hidden bg-[#6d001f] text-cream"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          >
            <Hero />
            <Letter />
            <Countdown />
            <Schedule />
            <LocationSection />
            <Details />
            <RsvpSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}


