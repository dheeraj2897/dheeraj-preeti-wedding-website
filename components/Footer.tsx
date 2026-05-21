import Reveal from "./Reveal";
import { WEDDING } from "@/lib/wedding";
import RoseCluster from "./RoseCluster";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden section-wine py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <RoseCluster className="-translate-y-1/2 scale-[0.65] md:scale-[0.82]" mirrored />
      </div>
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>समारोह में आपकी प्रतीक्षा रहेगी!</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 font-script text-6xl text-cream md:text-8xl">
            {WEDDING.groomName} &amp; {WEDDING.brideName}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-xs uppercase tracking-widest2 text-[#efd6dc]">
            {WEDDING.longDateDisplay}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="divider mt-12 bg-cream/35" />
        </Reveal>
      </div>
    </footer>
  );
}
