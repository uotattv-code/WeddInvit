import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TEMPLATES } from "@/lib/templates";

export async function GET() {
  try {
    // 1. Tạo các bảng nếu chưa có
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
        "password" TEXT NOT NULL DEFAULT 'demo123',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "Template" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL UNIQUE,
        "thumbnail" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "defaultTheme" TEXT NOT NULL,
        "defaultBlocks" TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Wedding" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "title" TEXT NOT NULL,
        "groomName" TEXT NOT NULL,
        "brideName" TEXT NOT NULL,
        "groomShortName" TEXT,
        "brideShortName" TEXT,
        "weddingDate" TIMESTAMP(3) NOT NULL,
        "weddingTime" TEXT,
        "venueName" TEXT NOT NULL,
        "venueAddress" TEXT NOT NULL,
        "mapUrl" TEXT,
        "coverImage" TEXT,
        "musicUrl" TEXT,
        "musicTitle" TEXT,
        "isMusicAutoPlay" BOOLEAN NOT NULL DEFAULT false,
        "status" TEXT NOT NULL DEFAULT 'DRAFT',
        "publishedAt" TIMESTAMP(3),
        "themeConfig" TEXT NOT NULL,
        "customCss" TEXT,
        "templateId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "WeddingBlock" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "weddingId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        "enabled" BOOLEAN NOT NULL DEFAULT true,
        "title" TEXT,
        "subtitle" TEXT,
        "content" TEXT NOT NULL,
        "layout" TEXT NOT NULL DEFAULT 'default',
        "style" TEXT
      );

      CREATE TABLE IF NOT EXISTS "WeddingEvent" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "weddingId" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "time" TEXT NOT NULL,
        "date" TIMESTAMP(3) NOT NULL,
        "location" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "description" TEXT,
        "order" INTEGER NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS "GalleryImage" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "weddingId" TEXT NOT NULL,
        "url" TEXT NOT NULL,
        "caption" TEXT,
        "order" INTEGER NOT NULL DEFAULT 0,
        "isCover" BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS "Rsvp" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "weddingId" TEXT NOT NULL,
        "guestName" TEXT NOT NULL,
        "phone" TEXT,
        "guestCount" INTEGER NOT NULL DEFAULT 1,
        "isAttending" BOOLEAN NOT NULL DEFAULT true,
        "side" TEXT,
        "message" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS "GuestbookMessage" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "weddingId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "isVisible" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Tạo User Demo & Admin
    await prisma.user.upsert({
      where: { email: "admin@weddinvit.com" },
      update: {},
      create: {
        id: "user-admin-1",
        email: "admin@weddinvit.com",
        name: "Weddinvit Admin",
        role: "ADMIN",
        password: "admin_password_123",
      },
    });

    const demoUser = await prisma.user.upsert({
      where: { email: "demo@weddinvit.com" },
      update: {},
      create: {
        id: "user-demo-1",
        email: "demo@weddinvit.com",
        name: "Nguyễn Minh",
        role: "CUSTOMER",
        password: "demo_password_123",
      },
    });

    // 3. Tạo Templates
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

    // 4. Tạo Wedding Mẫu Minh - Anh
    const minhAnh = await prisma.wedding.upsert({
      where: { slug: "minh-anh" },
      update: {},
      create: {
        id: "wed-minh-anh",
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
        status: "PUBLISHED",
        publishedAt: new Date(),
        templateId: "elegant-ivory",
        userId: demoUser.id,
        themeConfig: JSON.stringify(TEMPLATES[0].defaultTheme),
      },
    });

    // Tạo Blocks cho Minh - Anh
    const existingBlocks = await prisma.weddingBlock.count({
      where: { weddingId: minhAnh.id },
    });
    if (existingBlocks === 0) {
      for (const blk of TEMPLATES[0].defaultBlocks) {
        await prisma.weddingBlock.create({
          data: {
            id: `blk-minh-anh-${blk.id}`,
            weddingId: minhAnh.id,
            type: blk.type,
            order: blk.order,
            enabled: blk.enabled,
            title: blk.title || "",
            subtitle: blk.subtitle || "",
            content: JSON.stringify(blk.content),
            layout: blk.layout || "default",
            style: blk.style ? JSON.stringify(blk.style) : "{}",
          },
        });
      }
    }

    // Tạo Gallery cho Minh - Anh
    const existingImages = await prisma.galleryImage.count({
      where: { weddingId: minhAnh.id },
    });
    if (existingImages === 0) {
      const urls = [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
      ];
      for (let i = 0; i < urls.length; i++) {
        await prisma.galleryImage.create({
          data: {
            id: `img-minh-anh-${i}`,
            weddingId: minhAnh.id,
            url: urls[i],
            caption: `Kỷ niệm tình yêu ${i + 1}`,
            order: i,
            isCover: i === 0,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Khởi tạo Database Supabase và nạp thiệp mẫu Minh - Anh thành công 100%!",
    });
  } catch (error: unknown) {
    console.error("Init DB Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
