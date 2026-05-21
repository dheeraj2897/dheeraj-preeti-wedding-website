"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUDIO_SRC = "/ganesh_mantra.mp3";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.35;

    const playAudio = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // Playback failed (usually due to autoplay restrictions)
          console.log("Audio play failed or was blocked by browser", err);
        });
    };

    // Standard fallback listeners to capture initial user gestures
    const handleGesture = () => {
      playAudio();
      removeListeners();
    };

    const addListeners = () => {
      window.addEventListener("pointerdown", handleGesture, { once: true });
      window.addEventListener("keydown", handleGesture, { once: true });
      window.addEventListener("touchstart", handleGesture, { once: true });
      window.addEventListener("click", handleGesture, { once: true });
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("click", handleGesture);
    };

    // Try starting audio
    playAudio();
    addListeners();

    // Listen for custom envelope opening event
    const handleEnvelopeOpened = () => {
      setIsVisible(true);
      // Synchronous attempt to play inside the event loop of the user's click gesture
      playAudio();
    };

    window.addEventListener("envelope-opened", handleEnvelopeOpened);

    return () => {
      removeListeners();
      window.removeEventListener("envelope-opened", handleEnvelopeOpened);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Playback failed on toggle: ", err);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        playsInline
        aria-hidden="true"
      />

      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={togglePlay}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-[#6d001f]/80 text-accent shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent hover:scale-105 active:scale-95 focus:outline-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label={isPlaying ? "Mute background music" : "Play background music"}
          >
            {isPlaying ? (
              // Playing state: Premium dynamic animated gold audio visualizer lines
              <div className="flex items-end gap-[3px] h-4">
                <motion.div
                  className="w-[3px] bg-accent rounded-full"
                  animate={{ height: ["4px", "16px", "4px"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-[3px] bg-accent rounded-full"
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.div
                  className="w-[3px] bg-accent rounded-full"
                  animate={{ height: ["4px", "18px", "4px"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.div
                  className="w-[3px] bg-accent rounded-full"
                  animate={{ height: ["4px", "10px", "4px"] }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                />
              </div>
            ) : (
              // Muted state: Premium gold music note with a clean slash overlay
              <div className="relative h-5 w-5 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-accent/80"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                {/* Visual strike-through bar indicating muted status */}
                <div 
                  className="absolute w-[26px] h-[2px] bg-accent rotate-45 rounded-full" 
                  style={{ transform: "rotate(45deg)", boxShadow: "0 0 2px rgba(109,0,31,0.8)" }}
                />
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
