import Reveal from "./Reveal";
import PetalField from "./PetalField";

export default function Letter() {
  return (
    <section className="section section-wine">
      <PetalField count={8} className="opacity-40" />
      <div className="container-tight text-center">
        <Reveal>
          <p className="eyebrow mb-6 text-[#d9b7c1]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>प्रिय मित्रों और परिवारजनों,</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-2xl leading-relaxed text-cream/90 md:text-3xl" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", lineHeight: "1.6" }}>
            जब हम जीवन की नई यात्रा की शुरुआत करने जा रहे हैं, हम अपने जीवन में आप जैसे सुंदर लोगों के होने के लिए अत्यंत आभारी हैं। आपकी उपस्थिति हमारे लिए सर्वोपरि है, और हमारे सगाई समारोह में आपकी गरिमामयी उपस्थिति हमारे लिए अत्यंत सम्मान की बात होगी।
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider mt-12 bg-cream/35" />
        </Reveal>
      </div>
    </section>
  );
}
