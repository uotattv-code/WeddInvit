import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { weddingId, guestName, phone, guestCount, isAttending, side, message } = body;

    if (!weddingId || !guestName) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ thông tin bắt buộc" },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        weddingId,
        guestName: guestName.trim(),
        phone: phone ? phone.trim() : null,
        guestCount: typeof guestCount === "number" ? guestCount : 1,
        isAttending: Boolean(isAttending),
        side: side || "GROOM",
        message: message ? message.trim() : null,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error: any) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json(
      { error: "Không thể gửi RSVP. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
