"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { WEDDING } from "@/lib/wedding";
import RoseCluster from "./RoseCluster";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function Countdown() {
  const [parts, setParts] = useState<Parts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(diff(WEDDING.date));
    const id = setInterval(() => setParts(diff(WEDDING.date)), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: Array<{ label: string; value: number }> = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    <section className="section section-ivory tear-wine torn-divider-top torn-divider-bottom">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#8e5567]">Countdown Timer</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-[#4a0015]">The Celebration Begins In</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex items-stretch justify-center gap-3 sm:gap-6 md:gap-10">
            {cells.map((c, i) => (
              <div key={c.label} className="flex items-stretch">
                <div className="flex min-w-[70px] flex-col items-center sm:min-w-[110px]">
                  <span
                    className="font-display text-5xl tabular-nums text-[#4a0015] sm:text-7xl md:text-8xl"
                    aria-live="polite"
                  >
                    {mounted ? pad(c.value) : "00"}
                  </span>
                  <span className="mt-3 text-[10px] uppercase tracking-widest2 text-[#8e5567] sm:text-xs">
                    {c.label}
                  </span>
                </div>
                {i < cells.length - 1 && (
                  <span
                    aria-hidden
                    className="self-start pt-2 font-display text-4xl text-[#b98c9a] sm:text-6xl md:text-7xl"
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 flex justify-center">
          <RoseCluster className="scale-[0.62] opacity-90 md:scale-75" mirrored />
        </div>
      </div>
    </section>
  );
}
