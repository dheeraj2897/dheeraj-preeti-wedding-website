import Reveal from "./Reveal";
import PetalField from "./PetalField";

export default function Letter() {
  return (
    <section className="section section-wine">
      <PetalField count={8} className="opacity-40" />
      <div className="container-tight text-center">
        <Reveal>
          <p className="eyebrow mb-6 text-[#d9b7c1]">Dear Friends and Family,</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-display text-2xl leading-relaxed text-cream/90 md:text-3xl">
            As we get ready to say &ldquo;I do,&rdquo; we feel grateful for the
            wonderful people in our lives. Your presence means the world to us,
            and we would be honored to have you with us as we begin our life
            together.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider mt-12 bg-cream/35" />
        </Reveal>
      </div>
    </section>
  );
}
