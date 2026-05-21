import Reveal from "./Reveal";
import { WEDDING } from "@/lib/wedding";

export default function Schedule() {
  return (
    <section className="section section-wine tear-ivory torn-divider-bottom">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>कार्यक्रमों की रूपरेखा</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>दिन की एक झलक</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider mt-8 bg-cream/35" />
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {WEDDING.schedule.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i}>
              <li className="flex flex-col items-center px-2">
                <Ornament />
                <h3 className="mt-6 font-display text-2xl leading-snug text-cream md:text-3xl">
                  {item.title}
                </h3>
                <span className="mt-3 font-display text-2xl tracking-[0.25em] text-[#f0d9c4] md:text-3xl">
                  {item.time}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ornament() {
  return (
    <svg
      width="56"
      height="20"
      viewBox="0 0 56 20"
      fill="none"
      aria-hidden
      className="text-cream/45"
    >
      <path d="M0 10h22" stroke="currentColor" strokeWidth="1" />
      <path d="M34 10h22" stroke="currentColor" strokeWidth="1" />
      <circle cx="28" cy="10" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
