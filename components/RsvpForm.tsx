"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, "कृपया अपना नाम लिखें / Please enter your name")
    .max(120, "नाम बहुत लंबा है / Name is too long"),
  attending: z.enum(["yes", "no"], {
    required_error: "कृपया एक विकल्प चुनें / Please select an option",
  }),
  intolerances: z.string().max(500).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const TRANSLATIONS = {
  hi: {
    thankYou: "धन्यवाद",
    successHeader: "आपका उत्तर (RSVP) प्राप्त हो गया है",
    successBody: "हम आपके साथ इस उत्सव को मनाने के लिए उत्सुक हैं।",
    labelName: "आपका नाम",
    placeholderName: "पूरा नाम (प्रथम एवं अंतिम नाम)",
    labelAttending: "क्या आप पधार रहे हैं?",
    radioYes: "हाँ, मैं आऊंगा/आऊंगी",
    radioNo: "क्षमा करें, मैं नहीं आ पाऊंगा/पाऊंगी",
    labelDiet: "क्या आपको भोजन से संबंधित कोई परहेज या एलर्जी है?",
    placeholderDiet: "वैकल्पिक (यदि कोई हो)",
    labelMessage: "भावी वर-वधू के लिए शुभकामना संदेश",
    placeholderMessage: "वैकल्पिक",
    buttonSubmit: "भेजें",
    buttonSubmitting: "भेजा जा रहा है...",
  },
  en: {
    thankYou: "Thank You",
    successHeader: "Your RSVP has been received",
    successBody: "We look forward to celebrating this special day with you.",
    labelName: "Your Name",
    placeholderName: "Full Name (First and Last Name)",
    labelAttending: "Are you attending?",
    radioYes: "Yes, I will attend",
    radioNo: "Sorry, I cannot attend",
    labelDiet: "Do you have any dietary restrictions or allergies?",
    placeholderDiet: "Optional (if any)",
    labelMessage: "Wishes / Message for the Couple",
    placeholderMessage: "Optional",
    buttonSubmit: "Submit",
    buttonSubmitting: "Submitting...",
  }
};

export default function RsvpForm() {
  const [lang, setLang] = useState<"hi" | "en">("hi");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", intolerances: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          attending: values.attending === "yes",
          intolerances: values.intolerances?.trim() || null,
          message: values.message?.trim() || null,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error");
    }
  }

  const getErrorMessage = (msg: string | undefined) => {
    if (!msg) return null;
    const parts = msg.split(" / ");
    return lang === "hi" ? parts[0] : parts[1] || parts[0];
  };

  if (status === "success") {
    return (
      <div className="relative rounded-[2rem] border border-cream/20 bg-white/5 px-8 py-16 text-center shadow-[0_24px_80px_rgba(20,0,6,0.22)] backdrop-blur-sm pt-20">
        {/* Language Sliding Toggle */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 flex items-center gap-2">
          <div
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="bg-[#5a0018]/60 border border-cream/25 w-24 h-7 rounded-full p-0.5 flex items-center justify-between relative cursor-pointer select-none"
          >
            <span className="text-[10px] font-sans font-semibold text-cream/50 w-1/2 text-center z-10 transition-colors">
              हिं
            </span>
            <span className="text-[10px] font-sans font-semibold text-cream/50 w-1/2 text-center z-10 transition-colors">
              EN
            </span>
            <div
              className={`w-[44px] h-[22px] bg-cream text-[#6d001f] rounded-full absolute transition-all duration-300 shadow-sm flex items-center justify-center font-bold text-[9px] uppercase tracking-wide z-10 ${
                lang === "hi" ? "left-[3px]" : "left-[49px]"
              }`}
            >
              {lang === "hi" ? "हिं" : "EN"}
            </div>
          </div>
        </div>

        <p className="eyebrow text-[#d9b7c1]" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit", letterSpacing: "0.05em" }}>{t.thankYou}</p>
        <h3 className="heading-md mt-4 text-cream" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit" }}>{t.successHeader}</h3>
        <p className="mt-6 text-[#efd6dc]" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit" }}>
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative space-y-10 rounded-[2rem] border border-cream/15 bg-white/5 px-6 py-8 text-left shadow-[0_24px_80px_rgba(20,0,6,0.22)] backdrop-blur-sm md:px-10 md:py-10 pt-20 md:pt-20"
      noValidate
    >
      {/* Language Sliding Toggle */}
      <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20 flex items-center gap-2">
        <div
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
          className="bg-[#5a0018]/60 border border-cream/25 w-24 h-7 rounded-full p-0.5 flex items-center justify-between relative cursor-pointer select-none"
        >
          <span className="text-[10px] font-sans font-semibold text-cream/50 w-1/2 text-center z-10 transition-colors">
            हिं
          </span>
          <span className="text-[10px] font-sans font-semibold text-cream/50 w-1/2 text-center z-10 transition-colors">
            EN
          </span>
          <div
            className={`w-[44px] h-[22px] bg-cream text-[#6d001f] rounded-full absolute transition-all duration-300 shadow-sm flex items-center justify-center font-bold text-[9px] uppercase tracking-wide z-10 ${
              lang === "hi" ? "left-[3px]" : "left-[49px]"
            }`}
          >
            {lang === "hi" ? "हिं" : "EN"}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="field-label" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit", letterSpacing: "0.05em" }}>
          {t.labelName}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t.placeholderName}
          className="field-input"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-700">{getErrorMessage(errors.name.message)}</p>
        )}
      </div>

      <fieldset>
        <legend className="field-label" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit", letterSpacing: "0.05em" }}>{t.labelAttending}</legend>
        <div className="mt-2 space-y-3">
          <label className="flex items-center gap-3 text-base text-cream/90">
            <input
              type="radio"
              value="yes"
              className="h-4 w-4 accent-cream cursor-pointer"
              {...register("attending")}
            />
            <span style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit" }}>{t.radioYes}</span>
          </label>
          <label className="flex items-center gap-3 text-base text-cream/90">
            <input
              type="radio"
              value="no"
              className="h-4 w-4 accent-cream cursor-pointer"
              {...register("attending")}
            />
            <span style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit" }}>{t.radioNo}</span>
          </label>
        </div>
        {errors.attending && (
          <p className="mt-2 text-xs text-red-700">{getErrorMessage(errors.attending.message)}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="intolerances" className="field-label" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit", letterSpacing: "0.05em" }}>
          {t.labelDiet}
        </label>
        <input
          id="intolerances"
          type="text"
          placeholder={t.placeholderDiet}
          className="field-input"
          {...register("intolerances")}
        />
      </div>

      <div>
        <label htmlFor="message" className="field-label" style={{ fontFamily: lang === "hi" ? "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif" : "inherit", letterSpacing: "0.05em" }}>
          {t.labelMessage}
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder={t.placeholderMessage}
          className="field-input resize-none"
          {...register("message")}
        />
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary"
        >
          {status === "submitting" ? t.buttonSubmitting : t.buttonSubmit}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-700">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}
