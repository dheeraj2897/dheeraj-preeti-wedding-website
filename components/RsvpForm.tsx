"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(120, "Name is too long"),
  attending: z.enum(["yes", "no"], {
    required_error: "Please choose an option",
  }),
  intolerances: z.string().max(500).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  if (status === "success") {
    return (
      <div className="rounded-[2rem] border border-cream/20 bg-white/5 px-8 py-16 text-center shadow-[0_24px_80px_rgba(20,0,6,0.22)] backdrop-blur-sm">
        <p className="eyebrow text-[#d9b7c1]">Thank you</p>
        <h3 className="heading-md mt-4 text-cream">Your RSVP has been received</h3>
        <p className="mt-6 text-[#efd6dc]">
          We can&apos;t wait to celebrate with you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 rounded-[2rem] border border-cream/15 bg-white/5 px-6 py-8 text-left shadow-[0_24px_80px_rgba(20,0,6,0.22)] backdrop-blur-sm md:px-10 md:py-10"
      noValidate
    >
      <div>
        <label htmlFor="name" className="field-label">
          Your name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="First and last name"
          className="field-input"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-700">{errors.name.message}</p>
        )}
      </div>

      <fieldset>
        <legend className="field-label">Will you come?</legend>
        <div className="mt-2 space-y-3">
          <label className="flex items-center gap-3 text-base text-ink">
            <input
              type="radio"
              value="yes"
          className="h-4 w-4 accent-cream"
              {...register("attending")}
            />
            <span>Yes, I will</span>
          </label>
          <label className="flex items-center gap-3 text-base text-ink">
            <input
              type="radio"
              value="no"
          className="h-4 w-4 accent-cream"
              {...register("attending")}
            />
            <span>Unfortunately, I can&apos;t</span>
          </label>
        </div>
        {errors.attending && (
          <p className="mt-2 text-xs text-red-700">{errors.attending.message}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="intolerances" className="field-label">
          Do you have any food intolerances?
        </label>
        <input
          id="intolerances"
          type="text"
          placeholder="Optional"
          className="field-input"
          {...register("intolerances")}
        />
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          A note for the couple
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Optional"
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
          {status === "submitting" ? "Sending..." : "Submit"}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-700">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}
