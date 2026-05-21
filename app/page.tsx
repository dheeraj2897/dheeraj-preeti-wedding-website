"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Letter from "@/components/Letter";
import Countdown from "@/components/Countdown";
import Schedule from "@/components/Schedule";
import LocationSection from "@/components/Location";
import DressCode from "@/components/DressCode";
import Details from "@/components/Details";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [opened, setOpened] = useState(false);

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
            <DressCode />
            <Details />
            <RsvpSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}


