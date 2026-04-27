import Reveal from "./Reveal";
import RsvpForm from "./RsvpForm";
import { WEDDING } from "@/lib/wedding";

export default function RsvpSection() {
  return (
    <section id="rsvp" className="section section-wine">
      <div className="container-tight text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]">RSVP</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-lg mt-4 text-cream">Confirm Your Attendance</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-[#efd6dc] md:text-lg">
            To help us prepare for a joyful celebration, kindly confirm your
            attendance before{" "}
            <span className="text-cream">{WEDDING.rsvpDeadlineDisplay}</span>.
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
