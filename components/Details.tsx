import Reveal from "./Reveal";
import { WEDDING } from "@/lib/wedding";
import RoseCluster from "./RoseCluster";

export default function Details() {
  return (
    <section className="section section-ivory tear-wine torn-divider-top">
      <div className="container-tight text-center">
        <Reveal>
          <p className="eyebrow text-[#8e5567]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>विवरण</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-[#4a0015]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>विशेष सूचना</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider mt-8" />
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-[#6c4550] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", lineHeight: "1.6" }}>
            आपकी गरिमामयी उपस्थिति ही हमारे लिए सबसे बड़ा उपहार है। फिर भी, यदि आप हमें कोई आशीर्वाद-स्वरूप उपहार देना चाहते हैं, तो हमारे उज्जवल भविष्य के लिए आपका योगदान अत्यंत सराहनीय होगा।
          </p>
        </Reveal>

        <div className="mt-16 flex justify-center">
          <RoseCluster className="scale-[0.65] md:scale-[0.82]" />
        </div>
      </div>
    </section>
  );
}
