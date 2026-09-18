import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single wedding by id
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const wedding = await prisma.wedding.findUnique({
      where: { id: params.id },
      include: {
        template: true,
        blocks: {
          orderBy: { order: "asc" },
        },
        events: {
          orderBy: { order: "asc" },
        },
        galleryImages: {
          orderBy: { order: "asc" },
        },
        rsvps: {
          orderBy: { createdAt: "desc" },
        },
        guestbooks: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Không tìm thấy thiệp cưới" }, { status: 404 });
    }

    return NextResponse.json(wedding);
  } catch (error: any) {
    return NextResponse.json({ error: "Lỗi tải thông tin thiệp" }, { status: 500 });
  }
}

// PUT update wedding (blocks, theme, info, gallery)
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const body = await req.json();
    const {
      title,
      groomName,
      brideName,
      weddingDate,
      weddingTime,
      venueName,
      venueAddress,
      mapUrl,
      coverImage,
      musicUrl,
      musicTitle,
      isMusicAutoPlay,
      themeConfig,
      templateId,
      status,
      blocks,
      galleryImages,
    } = body;

    // Update main wedding details
    const updated = await prisma.wedding.update({
      where: { id: params.id },
      data: {
        title,
        groomName,
        brideName,
        weddingDate: weddingDate ? new Date(weddingDate) : undefined,
        weddingTime,
        venueName,
        venueAddress,
        mapUrl,
        coverImage,
        musicUrl,
        musicTitle,
        isMusicAutoPlay: typeof isMusicAutoPlay === "boolean" ? isMusicAutoPlay : undefined,
        themeConfig: typeof themeConfig === "object" ? JSON.stringify(themeConfig) : themeConfig,
        templateId,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : undefined,
      },
    });

    // Update blocks if provided
    if (Array.isArray(blocks)) {
      for (const b of blocks) {
        if (b.id) {
          await prisma.weddingBlock.upsert({
            where: { id: b.id },
            update: {
              order: b.order,
              enabled: b.enabled,
              title: b.title,
              subtitle: b.subtitle,
              layout: b.layout || "default",
              content: typeof b.content === "object" ? JSON.stringify(b.content) : b.content,
            },
            create: {
              id: b.id,
              weddingId: params.id,
              type: b.type,
              order: b.order,
              enabled: b.enabled,
              title: b.title,
              subtitle: b.subtitle,
              layout: b.layout || "default",
              content: typeof b.content === "object" ? JSON.stringify(b.content) : b.content,
            },
          });
        }
      }
    }

    // Update gallery images if provided
    if (Array.isArray(galleryImages)) {
      // Re-sync gallery images
      await prisma.galleryImage.deleteMany({ where: { weddingId: params.id } });
      for (let i = 0; i < galleryImages.length; i++) {
        const img = galleryImages[i];
        await prisma.galleryImage.create({
          data: {
            weddingId: params.id,
            url: img.url,
            caption: img.caption || null,
            order: i,
            isCover: img.isCover || i === 0,
          },
        });
      }
    }

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    console.error("Error saving wedding:", error);
    return NextResponse.json({ error: "Lỗi lưu dữ liệu thiệp cưới" }, { status: 500 });
  }
}
