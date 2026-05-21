import Reveal from "./Reveal";
import RsvpForm from "./RsvpForm";
import { WEDDING } from "@/lib/wedding";

export default function RsvpSection() {
  return (
    <section id="rsvp" className="section section-wine">
      <div className="container-tight text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>प्रतिउत्तर (RSVP)</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-lg mt-4 text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>अपनी उपस्थिति सुनिश्चित करें</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-[#efd6dc] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", lineHeight: "1.6" }}>
            कृपया इस उत्सव की तैयारियों में हमारा सहयोग करने के लिए{" "}
            <span className="text-cream">{WEDDING.rsvpDeadlineDisplay}</span> से पहले अपनी उपस्थिति की पुष्टि करें।
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="divider mt-8 bg-cream/35" />
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mx-auto mt-14 max-w-xl">
            <RsvpForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
