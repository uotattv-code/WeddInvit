import { PrismaClient } from "@prisma/client";
import { TEMPLATES } from "../src/lib/templates";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu Weddinvit...");

  // 1. Tạo Users
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@weddinvit.com" },
    update: {},
    create: {
      email: "admin@weddinvit.com",
      name: "Weddinvit Administrator",
      role: "ADMIN",
      password: "admin_secure_password_123",
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@weddinvit.com" },
    update: {},
    create: {
      email: "demo@weddinvit.com",
      name: "Nguyễn Minh",
      role: "CUSTOMER",
      password: "demo_password_123",
    },
  });

  console.log("✅ Đã tạo Users (Admin & Demo Customer)");

  // 2. Tạo 5 Templates
  for (const tpl of TEMPLATES) {
    await prisma.template.upsert({
      where: { id: tpl.id },
      update: {
        name: tpl.name,
        slug: tpl.slug,
        thumbnail: tpl.thumbnail,
        description: tpl.description,
        category: tpl.category,
        defaultTheme: JSON.stringify(tpl.defaultTheme),
        defaultBlocks: JSON.stringify(tpl.defaultBlocks),
      },
      create: {
        id: tpl.id,
        name: tpl.name,
        slug: tpl.slug,
        thumbnail: tpl.thumbnail,
        description: tpl.description,
        category: tpl.category,
        defaultTheme: JSON.stringify(tpl.defaultTheme),
        defaultBlocks: JSON.stringify(tpl.defaultBlocks),
      },
    });
  }
  console.log("✅ Đã tạo 5 Templates Luxury");

  // 3. Tạo 5 Demo Weddings
  const demoWeddings = [
    {
      slug: "minh-anh",
      title: "Đám Cưới Minh & Ngọc Anh",
      groomName: "Nguyễn Quang Minh",
      brideName: "Trần Ngọc Anh",
      groomShortName: "Minh",
      brideShortName: "Ngọc Anh",
      weddingDate: new Date("2026-10-24T18:00:00Z"),
      weddingTime: "18:00",
      venueName: "Trung Tâm Hội Nghị White Palace",
      venueAddress: "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=White+Palace+Hoang+Van+Thu",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
      musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
      musicTitle: "A Thousand Years (Acoustic Piano)",
      isMusicAutoPlay: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      templateId: "elegant-ivory",
      themeConfig: JSON.stringify(TEMPLATES[0].defaultTheme),
      galleryUrls: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
      ],
      rsvps: [
        { guestName: "Lê Hoàng Phúc", phone: "0901234567", guestCount: 2, isAttending: true, side: "GROOM", message: "Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử!" },
        { guestName: "Nguyễn Thùy Dung", phone: "0912345678", guestCount: 1, isAttending: true, side: "BRIDE", message: "Cô dâu xinh đẹp nhất quả đất, chúc mừng hạnh phúc nhé!" },
      ],
      guestbooks: [
        { name: "Gia đình Bác Thành", message: "Chúc hai cháu vạn sự hanh thông, tình duyên bền chặt như sắt son!" },
        { name: "Thanh Hằng & Quốc Đạt", message: "Mong chờ ngày được chung vui cùng hai bạn tại White Palace!" },
      ],
    },
    {
      slug: "nam-linh",
      title: "Lễ Thành Hôn Nam & Khánh Linh",
      groomName: "Phạm Hải Nam",
      brideName: "Đỗ Khánh Linh",
      groomShortName: "Nam",
      brideShortName: "Linh",
      weddingDate: new Date("2026-11-15T17:30:00Z"),
      weddingTime: "17:30",
      venueName: "InterContinental Saigon Ballroom",
      venueAddress: "Góc Hai Bà Trưng & Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=InterContinental+Saigon",
      coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80",
      musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
      musicTitle: "Canon in D (Orchestra)",
      isMusicAutoPlay: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      templateId: "burgundy-wedding",
      themeConfig: JSON.stringify(TEMPLATES[1].defaultTheme),
      galleryUrls: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      ],
      rsvps: [
        { guestName: "Vũ Tuấn Anh", phone: "0988776655", guestCount: 2, isAttending: true, side: "GROOM", message: "Đại tiệc hoành tráng quá, chúc hai bạn viên mãn!" },
      ],
      guestbooks: [
        { name: "Khánh Huyền", message: "Chúc Nam và Linh luôn yêu thương nhau như ngày đầu tiên gặp gỡ!" },
      ],
    },
    {
      slug: "hung-mai",
      title: "Đám Cưới Quốc Hùng & Thanh Mai",
      groomName: "Trương Quốc Hùng",
      brideName: "Lâm Thanh Mai",
      groomShortName: "Hùng",
      brideShortName: "Mai",
      weddingDate: new Date("2026-12-20T16:00:00Z"),
      weddingTime: "16:00",
      venueName: "Ana Mandara Villas Dalat Resort",
      venueAddress: "Đường Lê Lai, Phường 5, TP. Đà Lạt, Lâm Đồng",
      mapUrl: "https://maps.google.com/?q=Ana+Mandara+Villas+Dalat",
      coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80",
      musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
      musicTitle: "I Do (Acoustic Guitar)",
      isMusicAutoPlay: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      templateId: "sage-minimal",
      themeConfig: JSON.stringify(TEMPLATES[2].defaultTheme),
      galleryUrls: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      ],
      rsvps: [
        { guestName: "Đỗ Hải Đăng", phone: "0933221144", guestCount: 1, isAttending: true, side: "BOTH", message: "Hẹn gặp hai bạn giữa rừng thông Đà Lạt!" },
      ],
      guestbooks: [
        { name: "Nhóm Bạn Đại Học", message: "Thật ngưỡng mộ chuyện tình đẹp của hai bạn. Mãi hạnh phúc nhé!" },
      ],
    },
    {
      slug: "tuan-vy",
      title: "Wedding Issue: Anh Tuấn & Thảo Vy",
      groomName: "Hoàng Anh Tuấn",
      brideName: "Bùi Thảo Vy",
      groomShortName: "Tuấn",
      brideShortName: "Vy",
      weddingDate: new Date("2027-01-18T18:30:00Z"),
      weddingTime: "18:30",
      venueName: "The Reverie Saigon Grand Hall",
      venueAddress: "22-36 Nguyễn Huệ & 57-69F Đồng Khởi, Bến Nghé, Quận 1",
      mapUrl: "https://maps.google.com/?q=The+Reverie+Saigon",
      coverImage: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1600&q=80",
      musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
      musicTitle: "Until I Found You (Violin & Cello)",
      isMusicAutoPlay: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      templateId: "editorial-magazine",
      themeConfig: JSON.stringify(TEMPLATES[3].defaultTheme),
      galleryUrls: [
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      ],
      rsvps: [],
      guestbooks: [
        { name: "Team Studio 9", message: "Bộ ảnh đẹp xuất sắc! Chúc Tuấn và Vy trọn đời gắn bó hạnh phúc!" },
      ],
    },
    {
      slug: "hoang-thao",
      title: "Lễ Thành Hôn Đức Hoàng & Phương Thảo",
      groomName: "Phan Đức Hoàng",
      brideName: "Dương Phương Thảo",
      groomShortName: "Hoàng",
      brideShortName: "Thảo",
      weddingDate: new Date("2026-11-28T11:00:00Z"),
      weddingTime: "11:00",
      venueName: "Khách Sạn Melia Hanoi",
      venueAddress: "44 Lý Thường Kiệt, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
      mapUrl: "https://maps.google.com/?q=Melia+Hanoi",
      coverImage: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1600&q=80",
      musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
      musicTitle: "Tơ Duyên (Nhạc Dân Tộc Hòa Tấu Hiện Đại)",
      isMusicAutoPlay: false,
      status: "PUBLISHED",
      publishedAt: new Date(),
      templateId: "traditional-luxury",
      themeConfig: JSON.stringify(TEMPLATES[4].defaultTheme),
      galleryUrls: [
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      ],
      rsvps: [
        { guestName: "Nguyễn Văn Tuấn", phone: "0909888999", guestCount: 2, isAttending: true, side: "GROOM", message: "Mừng đám cưới hai cháu, chúc trăm năm hạnh phúc!" },
      ],
      guestbooks: [
        { name: "Cô Ba Hà Nội", message: "Đám cưới cổ truyền trang trọng và đầm ấm lắm. Chúc hai cháu trăm năm đầu bạc răng long!" },
      ],
    },
  ];

  for (const item of demoWeddings) {
    const tpl = TEMPLATES.find((t) => t.id === item.templateId) || TEMPLATES[0];

    // Create or update Wedding
    const wedding = await prisma.wedding.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        groomName: item.groomName,
        brideName: item.brideName,
        groomShortName: item.groomShortName,
        brideShortName: item.brideShortName,
        weddingDate: item.weddingDate,
        weddingTime: item.weddingTime,
        venueName: item.venueName,
        venueAddress: item.venueAddress,
        mapUrl: item.mapUrl,
        coverImage: item.coverImage,
        musicUrl: item.musicUrl,
        musicTitle: item.musicTitle,
        isMusicAutoPlay: item.isMusicAutoPlay,
        status: item.status,
        templateId: item.templateId,
        themeConfig: item.themeConfig,
      },
      create: {
        slug: item.slug,
        title: item.title,
        groomName: item.groomName,
        brideName: item.brideName,
        groomShortName: item.groomShortName,
        brideShortName: item.brideShortName,
        weddingDate: item.weddingDate,
        weddingTime: item.weddingTime,
        venueName: item.venueName,
        venueAddress: item.venueAddress,
        mapUrl: item.mapUrl,
        coverImage: item.coverImage,
        musicUrl: item.musicUrl,
        musicTitle: item.musicTitle,
        isMusicAutoPlay: item.isMusicAutoPlay,
        status: item.status,
        publishedAt: item.publishedAt,
        templateId: item.templateId,
        themeConfig: item.themeConfig,
        userId: demoUser.id,
      },
    });

    // Delete existing child blocks to reseed cleanly
    await prisma.weddingBlock.deleteMany({ where: { weddingId: wedding.id } });
    await prisma.galleryImage.deleteMany({ where: { weddingId: wedding.id } });
    await prisma.rsvp.deleteMany({ where: { weddingId: wedding.id } });
    await prisma.guestbookMessage.deleteMany({ where: { weddingId: wedding.id } });

    // Seed Blocks from Template
    for (const b of tpl.defaultBlocks) {
      await prisma.weddingBlock.create({
        data: {
          weddingId: wedding.id,
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

    // Seed Gallery Images
    for (let i = 0; i < item.galleryUrls.length; i++) {
      await prisma.galleryImage.create({
        data: {
          weddingId: wedding.id,
          url: item.galleryUrls[i],
          caption: `Khoảnh khắc ngọt ngào #${i + 1}`,
          order: i,
          isCover: i === 0,
        },
      });
    }

    // Seed RSVPs
    for (const r of item.rsvps) {
      await prisma.rsvp.create({
        data: {
          weddingId: wedding.id,
          guestName: r.guestName,
          phone: r.phone,
          guestCount: r.guestCount,
          isAttending: r.isAttending,
          side: r.side,
          message: r.message,
        },
      });
    }

    // Seed Guestbook
    for (const g of item.guestbooks) {
      await prisma.guestbookMessage.create({
        data: {
          weddingId: wedding.id,
          name: g.name,
          message: g.message,
          isVisible: true,
        },
      });
    }
  }

  console.log("✅ Đã tạo thành công 5 Wedding Demos kèm blocks, gallery, rsvps & guestbooks!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
