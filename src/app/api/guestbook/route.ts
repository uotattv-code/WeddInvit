import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Guest posts a message
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { weddingId, name, message } = body;

    if (!weddingId || !name || !message) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên và lời chúc" },
        { status: 400 }
      );
    }

    const newMessage = await prisma.guestbookMessage.create({
      data: {
        weddingId,
        name: name.trim(),
        message: message.trim(),
        isVisible: true,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    console.error("Error creating guestbook message:", error);
    return NextResponse.json(
      { error: "Không thể lưu lời chúc. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

// Admin toggles visibility (PATCH)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, isVisible } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    const updated = await prisma.guestbookMessage.update({
      where: { id },
      data: { isVisible: Boolean(isVisible) },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: "Lỗi cập nhật trạng thái" }, { status: 500 });
  }
}

// Admin deletes message (DELETE)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    await prisma.guestbookMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Lỗi xóa lời chúc" }, { status: 500 });
  }
}
