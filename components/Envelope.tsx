"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [clicked, setClicked] = useState(false);
  const [done, setDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) onOpen();
  }, [reduceMotion, onOpen]);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
    setTimeout(() => setDone(true), 1600);
    setTimeout(() => onOpen(), 2300);
  };

  const ease = [0.4, 0, 0.2, 1] as const;
  const flap = (delay: number) => ({ duration: 0.65, delay, ease });

  const state = clicked ? "open" : "closed";

  return (
    <div
      className="fixed inset-0 z-[999] flex"
      style={{ background: "hsl(345,80%,8%)" }}
    >
      <audio ref={audioRef} src="/music/invitation.mp3" preload="auto" />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,168,67,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Full-screen envelope wrapper */}
      <motion.div
        className="relative cursor-pointer select-none w-full h-full"
        animate={done ? { scale: 1.04, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease }}
        onClick={handleClick}
        role="button"
        aria-label="Open invitation"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      >
        {/* ── ENVELOPE BODY: DARK INTERIOR ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(345,72%,16%) 0%, hsl(345,80%,7%) 100%)",
            boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)",
          }}
        >
          {/* Subtle dark inner border */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "14px",
              border: "1px solid rgba(212,168,67,0.2)",
            }}
          />

          {/* Gold cross lines meeting at center (envelope fold marks) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 5%, rgba(212,168,67,0.15) 30%, rgba(212,168,67,0.3) 50%, rgba(212,168,67,0.15) 70%, transparent 95%)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(180deg, transparent 5%, rgba(212,168,67,0.15) 30%, rgba(212,168,67,0.3) 50%, rgba(212,168,67,0.15) 70%, transparent 95%)",
            }}
          />

          {/* ── GANESHA at center intersection ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 30,
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                padding: "10px",
                background:
                  "radial-gradient(circle, rgba(212,168,67,0.18) 0%, transparent 70%)",
                filter: "drop-shadow(0 0 30px rgba(212,168,67,0.4))",
              }}
            >
              <motion.div
                animate={clicked ? { scale: 0.6, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: clicked ? 0.9 : 0 }}
              >
                <Image
                  src="/ganesha.png"
                  alt="Ganesha"
                  width={160}
                  height={160}
                  className="object-contain"
                  priority
                  style={{
                    filter:
                      "drop-shadow(0 0 20px rgba(212,168,67,0.55)) drop-shadow(0 4px 14px rgba(0,0,0,0.5))",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* ── TEXT at bottom (on dark bg — gold/cream colors) ── */}
          <AnimatePresence>
            {!clicked && (
              <motion.div
                className="absolute pointer-events-none text-center px-4"
                style={{ bottom: "8%", left: 0, right: 0, zIndex: 25 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.5 }}
              >
                {/* Top divider */}
                <div
                  className="mx-auto mb-4"
                  style={{
                    width: "55%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,168,67,0.7), transparent)",
                  }}
                />
                {/* Hindi text — gold on dark */}
                <p
                  style={{
                    fontFamily:
                      "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif",
                    fontSize: "clamp(1.5rem, 5.5vw, 2rem)",
                    fontWeight: 600,
                    color: "#e8c96a",
                    textShadow:
                      "0 0 24px rgba(212,168,67,0.5), 0 2px 8px rgba(0,0,0,0.6)",
                    lineHeight: 1.4,
                    letterSpacing: "0.03em",
                  }}
                >
                  सप्रेम आमंत्रण
                </p>
                {/* Bottom divider */}
                <div
                  className="mx-auto mt-4 mb-3"
                  style={{
                    width: "55%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,168,67,0.7), transparent)",
                  }}
                />
                {/* Click hint — soft gold */}
                <motion.p
                  className="text-xs uppercase tracking-[0.22em] font-medium"
                  style={{ color: "rgba(232,201,106,0.8)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  ✦&nbsp; खोलने के लिए टैप करें &nbsp;✦
                </motion.p>
                <motion.p
                  className="mt-1 text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "rgba(232,201,106,0.55)" }}
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Tap to Open
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── TOP FLAP — light cream, outer edge bright ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(170deg, #ffffff 0%, #f5ede0 40%, #e8d5b8 100%)",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
              zIndex: 20,
              transformOrigin: "50% 0%",
            }}
            variants={{
              closed: { rotateX: 0, y: "0%", opacity: 1 },
              open: { rotateX: -165, y: "-55%", opacity: 0 },
            }}
            initial="closed"
            animate={state}
            transition={flap(0)}
          >
            <div
              className="absolute"
              style={{
                bottom: 0,
                left: "15%",
                right: "15%",
                height: "1.5px",
                background:
                  "linear-gradient(90deg, transparent, rgba(180,130,60,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* ── BOTTOM FLAP — light cream ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(350deg, #ffffff 0%, #f5ede0 40%, #e8d5b8 100%)",
              clipPath: "polygon(0% 100%, 100% 100%, 50% 50%)",
              zIndex: 20,
              transformOrigin: "50% 100%",
            }}
            variants={{
              closed: { rotateX: 0, y: "0%", opacity: 1 },
              open: { rotateX: 165, y: "55%", opacity: 0 },
            }}
            initial="closed"
            animate={state}
            transition={flap(0.1)}
          >
            <div
              className="absolute"
              style={{
                top: 0,
                left: "15%",
                right: "15%",
                height: "1.5px",
                background:
                  "linear-gradient(90deg, transparent, rgba(180,130,60,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* ── LEFT FLAP — light cream ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(80deg, #ffffff 0%, #f0e4cc 50%, #e5d0ae 100%)",
              clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)",
              zIndex: 19,
              transformOrigin: "0% 50%",
            }}
            variants={{
              closed: { rotateY: 0, x: "0%", opacity: 1 },
              open: { rotateY: -165, x: "-55%", opacity: 0 },
            }}
            initial="closed"
            animate={state}
            transition={flap(0.15)}
          >
            <div
              className="absolute"
              style={{
                right: 0,
                top: "15%",
                bottom: "15%",
                width: "1.5px",
                background:
                  "linear-gradient(180deg, transparent, rgba(180,130,60,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* ── RIGHT FLAP — light cream ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(280deg, #ffffff 0%, #f0e4cc 50%, #e5d0ae 100%)",
              clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
              zIndex: 19,
              transformOrigin: "100% 50%",
            }}
            variants={{
              closed: { rotateY: 0, x: "0%", opacity: 1 },
              open: { rotateY: 165, x: "55%", opacity: 0 },
            }}
            initial="closed"
            animate={state}
            transition={flap(0.15)}
          >
            <div
              className="absolute"
              style={{
                left: 0,
                top: "15%",
                bottom: "15%",
                width: "1.5px",
                background:
                  "linear-gradient(180deg, transparent, rgba(180,130,60,0.5), transparent)",
              }}
            />
          </motion.div>

          {/* Corner ornaments */}
          {[
            "top-5 left-5",
            "top-5 right-5",
            "bottom-5 left-5",
            "bottom-5 right-5",
          ].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} pointer-events-none text-sm`}
              style={{ color: "rgba(212,168,67,0.35)", zIndex: 10 }}
            >
              ✦
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
