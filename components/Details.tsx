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
          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-[#6c4550] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
            अधिक जानकारी या किसी भी प्रश्न के लिए, कृपया हमारे कार्यक्रम संयोजकों से संपर्क करें।
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-[#6c4550] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", lineHeight: "1.6" }}>
            आपकी गरिमामयी उपस्थिति ही हमारे लिए सबसे बड़ा उपहार है। फिर भी, यदि आप हमें कोई आशीर्वाद-स्वरूप उपहार देना चाहते हैं, तो हमारे उज्जवल भविष्य के लिए आपका योगदान अत्यंत सराहनीय होगा।
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-14 flex flex-col items-center">
            <span className="eyebrow text-[#8e5567]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>संपर्क सूत्र</span>
            <span className="mt-3 font-display text-2xl text-[#4a0015] md:text-3xl" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
              {WEDDING.contact.name}
            </span>
            <a
              href={`tel:${WEDDING.contact.phone.replace(/\s+/g, "")}`}
              className="mt-2 text-sm tracking-widest2 text-[#6c4550] hover:text-[#4a0015]"
            >
              {WEDDING.contact.phone}
            </a>
          </div>
        </Reveal>

        <div className="mt-16 flex justify-center">
          <RoseCluster className="scale-[0.65] md:scale-[0.82]" />
        </div>
      </div>
    </section>
  );
}
