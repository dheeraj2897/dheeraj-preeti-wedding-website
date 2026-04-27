import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendRsvpEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  name: z.string().min(2).max(120),
  attending: z.boolean(),
  intolerances: z.string().max(500).nullable().optional(),
  message: z.string().max(1000).nullable().optional(),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, attending, intolerances, message } = parsed.data;

  try {
    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        attending,
        intolerances: intolerances ?? null,
        message: message ?? null,
      },
    });

    sendRsvpEmail({ name, attending, intolerances, message }).catch((err) => {
      console.error("[rsvp] email failed:", err);
    });

    return NextResponse.json({ ok: true, id: rsvp.id });
  } catch (err) {
    console.error("[rsvp] save failed:", err);
    return NextResponse.json(
      { error: "Could not save RSVP" },
      { status: 500 },
    );
  }
}
