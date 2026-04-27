import Reveal from "./Reveal";
import { WEDDING } from "@/lib/wedding";

export default function LocationSection() {
  const mapsUrl =
    WEDDING.venue.mapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      WEDDING.venue.mapsQuery,
    )}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    WEDDING.venue.mapsQuery,
  )}&output=embed`;

  return (
    <section className="section section-ivory tear-wine torn-divider-top torn-divider-bottom">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#8e5567]">Location</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-[#4a0015]">{WEDDING.venue.name}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm text-[#6c4550] md:text-base">
            <span className="font-medium text-[#4a0015]">Address:</span>{" "}
            {WEDDING.venue.address}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-[#6d001f]/15 bg-sand/40 shadow-[0_20px_50px_rgba(109,0,31,0.12)]">
            <iframe
              title={`Map of ${WEDDING.venue.name}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-10"
          >
            Open in Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
