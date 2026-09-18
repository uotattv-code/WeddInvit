import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TEMPLATES } from "@/lib/templates";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const weddings = await prisma.wedding.findMany({
      include: {
        template: true,
        _count: {
          select: {
            rsvps: true,
            guestbooks: true,
            galleryImages: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(weddings);
  } catch (error: any) {
    return NextResponse.json({ error: "Lỗi lấy danh sách thiệp" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      templateId = "elegant-ivory",
      groomName,
      brideName,
      weddingDate,
      venueName,
      venueAddress,
      customSlug,
    } = body;

    if (!groomName || !brideName) {
      return NextResponse.json(
        { error: "Vui lòng nhập tên Chú rể và Cô dâu" },
        { status: 400 }
      );
    }

    // Find template
    const tpl = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

    // Find or create default user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "demo@weddinvit.com",
          name: "Nguyễn Minh",
          password: "demo123",
          role: "CUSTOMER",
        },
      });
    }

    // Generate unique slug
    let baseSlug = customSlug ? slugify(customSlug) : slugify(`${groomName}-${brideName}`);
    if (!baseSlug) baseSlug = "thiep-cuoi";

    let slug = baseSlug;
    let counter = 1;
    while (await prisma.wedding.findUnique({ where: { slug } })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const title = `Đám Cưới ${groomName} & ${brideName}`;
    const dateObj = weddingDate ? new Date(weddingDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const newWedding = await prisma.wedding.create({
      data: {
        slug,
        title,
        groomName,
        brideName,
        weddingDate: dateObj,
        venueName: venueName || "Trung Tâm Hội Nghị Tiệc Cưới",
        venueAddress: venueAddress || "Địa chỉ tiệc cưới",
        templateId: tpl.id,
        themeConfig: JSON.stringify(tpl.defaultTheme),
        userId: user.id,
        status: "DRAFT",
      },
    });

    // Create default blocks from template
    for (const b of tpl.defaultBlocks) {
      await prisma.weddingBlock.create({
        data: {
          weddingId: newWedding.id,
          type: b.type,
          order: b.order,
          enabled: b.enabled,
          title: b.title || null,
          subtitle: b.subtitle || null,
          layout: b.layout || "default",
          content: JSON.stringify(b.content),
        },
      });
    }

    return NextResponse.json(newWedding, { status: 201 });
  } catch (error: any) {
    console.error("Error creating wedding:", error);
    return NextResponse.json(
      { error: "Không thể tạo thiệp mới. Vui lòng thử lại!" },
      { status: 500 }
    );
  }
}
