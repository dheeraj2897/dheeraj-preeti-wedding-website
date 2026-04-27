import Reveal from "./Reveal";
import PhotoCard from "./PhotoCard";

export default function DressCode() {
  return (
    <section className="section section-wine tear-ivory torn-divider-bottom">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]">Dress Code</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-cream">Elegant Attire</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#efd6dc] md:text-lg">
            We kindly invite you to dress in elegant attire that reflects the
            style and spirit of our special day.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center">
              <PhotoCard
                src="/images/groom-style.jpeg"
                alt="Groom style inspiration"
                className="dress-photo photo-float-slow mx-auto w-full max-w-[14rem] md:max-w-[15rem]"
                imageClassName="groom-style-crop"
                label="For Him"
                caption="Refined Festive Layers"
                sizes="(max-width: 768px) 60vw, 240px"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#efd6dc]">
                Structured festive wear, polished textures, and clean footwear
                create a sharp and celebratory look.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col items-center">
              <PhotoCard
                src="/images/couple-main.jpeg"
                alt="Bride style inspiration"
                className="dress-photo photo-float-reverse mx-auto w-full max-w-[14rem] md:max-w-[15rem]"
                imageClassName="portrait-crop-right"
                label="For Her"
                caption="Classic Red Bridal Grace"
                sizes="(max-width: 768px) 60vw, 240px"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#efd6dc]">
                Rich color, graceful drape, and ornate detailing fit beautifully
                with the warm romantic tone of the celebration.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
