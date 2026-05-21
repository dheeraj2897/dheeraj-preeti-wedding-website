import Reveal from "./Reveal";
import PhotoCard from "./PhotoCard";

export default function DressCode() {
  return (
    <section className="section section-wine tear-ivory torn-divider-bottom">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="eyebrow text-[#d9b7c1]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", letterSpacing: "0.05em" }}>परिधान संहिता (Dress Code)</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-md mt-4 text-cream" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>भव्य परिधान</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#efd6dc] md:text-lg" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif", lineHeight: "1.6" }}>
            हम आपसे इस विशेष दिन की शोभा और शैली के अनुकूल सुंदर और भव्य परिधान धारण करने का सस्नेह आग्रह करते हैं।
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
                label="पुरुषों के लिए"
                caption="उत्कृष्ट पारंपरिक परिधान"
                sizes="(max-width: 768px) 60vw, 240px"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#efd6dc]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
                पारंपरिक शेरवानी, कुर्ता-पायजामा या उत्सव के अनुकूल सुरुचिपूर्ण वस्त्र।
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
                label="महिलाओं के लिए"
                caption="पारंपरिक लाल परिधान की शोभा"
                sizes="(max-width: 768px) 60vw, 240px"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#efd6dc]" style={{ fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" }}>
                सुरुचिपूर्ण पारंपरिक साड़ी, लहंगा या भव्य उत्सव परिधान।
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
