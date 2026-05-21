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
          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-[#6c4550] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", lineHeight: "1.7" }}>
            हमारे जीवन के इस विशेष दिन पर, आपकी गरिमामयी उपस्थिति और आपका स्नेह ही हमारे लिए सर्वोपरि है। आपके आशीर्वाद और साथ से बढ़कर हमारे लिए कुछ नहीं है। कृपया पधारकर अपने आशीर्वाद से हमारे इस नए सफर की शुरुआत को और भी सुंदर बनाएं और इस आनंदमय उत्सव को यादगार बनाएं।
          </p>
        </Reveal>

        <div className="mt-16 flex justify-center">
          <RoseCluster className="scale-[0.65] md:scale-[0.82]" />
        </div>
      </div>
    </section>
  );
}
