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

    let scrollTimeout: NodeJS.Timeout;
    let animationFrameId: number;
    let isAutoScrolling = false;
    let active = true;

    const startScroll = () => {
      if (isAutoScrolling || !active) return;
      isAutoScrolling = true;

      const tick = () => {
        if (!isAutoScrolling || !active) return;

        // Check if reached bottom
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          isAutoScrolling = false;
          return;
        }

        window.scrollBy(0, 0.45); // Very slow and elegant (0.45px per frame)
        animationFrameId = requestAnimationFrame(tick);
      };

      animationFrameId = requestAnimationFrame(tick);
    };

    const pauseScroll = () => {
      isAutoScrolling = false;
      cancelAnimationFrame(animationFrameId);

      // Clear existing resume timer and schedule a new one to resume in 5 seconds
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        startScroll();
      }, 5000); // Resume after 5 seconds of no interaction
    };

    // Initial delay before starting the scroll
    scrollTimeout = setTimeout(() => {
      startScroll();
    }, 3000); // 3 seconds initial delay

    // Event listeners to detect user activity
    const handleUserInteraction = () => {
      pauseScroll();
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("mousedown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });
    
    // Add scroll event listener to detect manual scrolls
    const handleScroll = () => {
      if (!isAutoScrolling) {
        pauseScroll();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      active = false;
      isAutoScrolling = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("mousedown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleScroll);
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


