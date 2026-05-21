import Reveal from "./Reveal";
import { motion } from "framer-motion";

export default function JourneyMap() {
  // SVG coordinates for cities
  const DELHI = { x: 200, y: 160, name: "दिल्ली (Delhi)", monument: "इंडिया गेट (India Gate)", role: "कर्मक्षेत्र और मिलन भूमि" };
  const BAREILLY = { x: 235, y: 165, name: "बरेली (Bareilly)", monument: "झुमका चौक (Jhumka Chowk)", role: "वर का गृह नगर व उत्सव स्थल" };
  const HYDERABAD = { x: 215, y: 320, name: "हैदराबाद (Hyderabad)", monument: "चारमीनार (Charminar)", role: "वधू का गृह नगर" };

  // Stylized India map outline path
  const indiaOutlinePath = "M 195 35 L 225 35 L 235 55 L 220 75 L 225 105 L 205 130 L 210 150 L 175 155 L 150 165 L 135 180 L 110 190 L 90 205 L 85 225 L 105 235 L 120 235 L 135 255 L 110 275 L 75 285 L 65 300 L 80 315 L 100 315 L 115 295 L 135 300 L 145 320 L 160 345 L 175 375 L 190 405 L 210 435 L 225 465 L 230 475 L 235 465 L 240 435 L 250 405 L 265 375 L 285 345 L 295 315 L 310 285 L 305 275 L 280 265 L 265 265 L 270 250 L 285 245 L 315 250 L 335 235 L 355 230 L 385 230 L 405 210 L 415 185 L 410 170 L 390 175 L 375 190 L 360 185 L 345 195 L 335 200 L 330 185 L 345 170 L 315 165 L 300 175 L 285 175 L 275 160 L 280 140 L 260 140 L 250 120 L 255 105 L 245 95 L 250 85 L 240 75 L 235 55 Z";

  return (
    <section className="section section-wine tear-ivory torn-divider-bottom overflow-hidden">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>सफ़र दो दिलों का (Our Journey)</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>दिलों का जुड़ाव: हैदराबाद से बरेली</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#efd6dc] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
            दो अलग-अलग शहरों से शुरू हुई जीवन यात्राएं, राजधानी दिल्ली में मिलकर एक पावन रिश्ते में बंध गईं, और अब बरेली की धरा पर सगाई के इस मांगलिक उत्सव के साथ नया अध्याय लिखने जा रही हैं।
          </p>
        </Reveal>

        {/* Constellation Map Canvas */}
        <div className="relative mx-auto mt-12 max-w-lg aspect-[9/10] w-full rounded-3xl border border-cream/10 bg-[#4a0015]/40 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-md">
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-cream/20 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-cream/20 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-cream/20 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-cream/20 rounded-br-lg"></div>

          <svg viewBox="0 0 450 500" className="h-full w-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gold Gradient */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f6d365" />
                <stop offset="100%" stopColor="#fda085" />
              </linearGradient>

              {/* Royal Gold Glow Filter */}
              <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              {/* Intense Pulse Glow for Nodes */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComponentTransfer in="blur" result="boost">
                  <feFuncA type="linear" slope="2" />
                </feComponentTransfer>
                <feComposite in="SourceGraphic" in2="boost" operator="over" />
              </filter>
            </defs>

            {/* Background Grid Pattern / Subtle Constellation Stars */}
            <g opacity="0.15">
              <circle cx="100" cy="120" r="1" fill="#fff" />
              <circle cx="340" cy="80" r="1.5" fill="#fff" />
              <circle cx="80" cy="350" r="1.2" fill="#fff" />
              <circle cx="380" cy="400" r="1" fill="#fff" />
              <circle cx="120" cy="450" r="1.5" fill="#fff" />
              <circle cx="280" cy="40" r="1.2" fill="#fff" />
            </g>

            {/* India Map Outline */}
            <path
              d={indiaOutlinePath}
              fill="none"
              stroke="rgba(246, 211, 101, 0.12)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            <path
              d={indiaOutlinePath}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />

            {/* Glowing Golden Connection Trails */}
            {/* Trail 1: Hyderabad -> Delhi */}
            <path
              d={`M ${HYDERABAD.x} ${HYDERABAD.y} Q ${HYDERABAD.x - 20} ${(HYDERABAD.y + DELHI.y) / 2} ${DELHI.x} ${DELHI.y}`}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animated-route"
              style={{
                strokeDasharray: "6, 4",
                animation: "dash 1.5s linear infinite"
              }}
              filter="url(#goldGlow)"
            />

            {/* Trail 2: Bareilly -> Delhi */}
            <path
              d={`M ${BAREILLY.x} ${BAREILLY.y} Q ${(BAREILLY.x + DELHI.x) / 2} ${(BAREILLY.y + DELHI.y) / 2 - 10} ${DELHI.x} ${DELHI.y}`}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animated-route"
              style={{
                strokeDasharray: "6, 4",
                animation: "dash 1.5s linear infinite"
              }}
              filter="url(#goldGlow)"
            />

            {/* Delhi Node */}
            <g transform={`translate(${DELHI.x}, ${DELHI.y})`}>
              <circle r="14" fill="rgba(246, 211, 101, 0.15)" filter="url(#nodeGlow)" />
              <circle r="7" fill="url(#goldGradient)" />
              <circle r="3" fill="#fff" />
              <text y="-18" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="'Noto Serif Devanagari', 'Tiro Devanagari Hindi', sans-serif" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>
                दिल्ली (Delhi)
              </text>
            </g>

            {/* Bareilly Node */}
            <g transform={`translate(${BAREILLY.x}, ${BAREILLY.y})`}>
              <circle r="14" fill="rgba(246, 211, 101, 0.15)" filter="url(#nodeGlow)" />
              <circle r="7" fill="url(#goldGradient)" />
              <circle r="3" fill="#fff" />
              <text x="18" y="4" textAnchor="start" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="'Noto Serif Devanagari', 'Tiro Devanagari Hindi', sans-serif" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>
                बरेली (Bareilly)
              </text>
            </g>

            {/* Hyderabad Node */}
            <g transform={`translate(${HYDERABAD.x}, ${HYDERABAD.y})`}>
              <circle r="14" fill="rgba(246, 211, 101, 0.15)" filter="url(#nodeGlow)" />
              <circle r="7" fill="url(#goldGradient)" />
              <circle r="3" fill="#fff" />
              <text y="22" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="'Noto Serif Devanagari', 'Tiro Devanagari Hindi', sans-serif" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>
                हैदराबाद (Hyderabad)
              </text>
            </g>
          </svg>
        </div>

        {/* Elegant Monument Detail Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1: Hyderabad (Charminar) */}
          <Reveal delay={0.1}>
            <div className="group relative flex h-full flex-col items-center rounded-3xl border border-cream/10 bg-[#4a0015]/30 p-6 text-center shadow-lg transition-all duration-300 hover:border-cream/20 hover:bg-[#4a0015]/50">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream/5 text-2xl text-gold shadow-inner border border-cream/10 group-hover:scale-110 transition-transform duration-300">
                🕌
              </div>
              <p className="text-xs uppercase tracking-widest text-[#d9b7c1]" style={{ letterSpacing: "0.15em" }}>{HYDERABAD.role}</p>
              <h3 className="mt-2 text-xl font-semibold text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>{HYDERABAD.name}</h3>
              <p className="mt-1 text-sm italic text-gold/80 font-medium">{HYDERABAD.monument}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#efd6dc]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
                चारमीनार की ऐतिहासिक नगरी, जहाँ से वधू प्रीति के जीवन का सफ़र शुरू हुआ और दिल्ली की ओर बढ़ा।
              </p>
            </div>
          </Reveal>

          {/* Card 2: Delhi (India Gate) */}
          <Reveal delay={0.2}>
            <div className="group relative flex h-full flex-col items-center rounded-3xl border border-gold/30 bg-[#4a0015]/50 p-6 text-center shadow-[0_10px_30px_rgba(246,211,101,0.06)] scale-105 md:scale-105 border-t-gold/50 transition-all duration-300 hover:border-gold/50 hover:bg-[#4a0015]/70">
              {/* "Meeting point" glowing tag */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4a0015] shadow-md">
                कर्मक्षेत्र व मिलन भूमि
              </span>
              <div className="mt-2 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-2xl text-gold shadow-inner border border-gold/20 group-hover:scale-110 transition-transform duration-300">
                🏛️
              </div>
              <p className="text-xs uppercase tracking-widest text-[#d9b7c1]" style={{ letterSpacing: "0.15em" }}>{DELHI.role}</p>
              <h3 className="mt-2 text-xl font-semibold text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>{DELHI.name}</h3>
              <p className="mt-1 text-sm italic text-gold font-medium">{DELHI.monument}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#efd6dc]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
                ऐतिहासिक इंडिया गेट और देश की राजधानी, जहाँ दोनों की राहें मिलीं, कर्मक्षेत्र बना और प्रेम के बंधन में बंधे।
              </p>
            </div>
          </Reveal>

          {/* Card 3: Bareilly (Jhumka Chowk) */}
          <Reveal delay={0.3}>
            <div className="group relative flex h-full flex-col items-center rounded-3xl border border-cream/10 bg-[#4a0015]/30 p-6 text-center shadow-lg transition-all duration-300 hover:border-cream/20 hover:bg-[#4a0015]/50">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream/5 text-2xl text-gold shadow-inner border border-cream/10 group-hover:scale-110 transition-transform duration-300">
                🔔
              </div>
              <p className="text-xs uppercase tracking-widest text-[#d9b7c1]" style={{ letterSpacing: "0.15em" }}>{BAREILLY.role}</p>
              <h3 className="mt-2 text-xl font-semibold text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>{BAREILLY.name}</h3>
              <p className="mt-1 text-sm italic text-gold/80 font-medium">{BAREILLY.monument}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#efd6dc]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
                झुमका चौक की प्रसिद्ध नगरी, वर धीरज का पैतृक गृह नगर और हमारे इस पावन सगाई समारोह का गरिमामयी स्थल।
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </section>
  );
}
