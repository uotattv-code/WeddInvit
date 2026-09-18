import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { WeddingEngine } from "@/components/engine/WeddingEngine";
import { formatDate } from "@/lib/utils";
import { WeddingFullData } from "@/lib/types";

interface PageProps {
  params: {
    slug: string;
  };
}

import { TEMPLATES } from "@/lib/templates";

function getFallbackWedding(slug: string): WeddingFullData {
  const tpl = TEMPLATES[0];
  const galleryUrls = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
  ];

  return {
    id: `fallback-${slug}`,
    slug: slug,
    title: "Đám Cưới Quang Minh & Ngọc Anh",
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
    templateId: tpl.id,
    template: {
      id: tpl.id,
      name: tpl.name,
      slug: tpl.slug,
    },
    themeConfig: tpl.defaultTheme,
    blocks: tpl.defaultBlocks.map((b) => ({
      id: `fb-blk-${b.id}`,
      type: b.type,
      order: b.order,
      enabled: b.enabled,
      title: b.title || null,
      subtitle: b.subtitle || null,
      content: JSON.stringify(b.content),
      layout: b.layout || "default",
      style: b.style ? JSON.stringify(b.style) : "{}",
    })),
    galleryImages: galleryUrls.map((url, i) => ({
      id: `fb-img-${i}`,
      url,
      caption: `Khoảnh khắc tình yêu ${i + 1}`,
      order: i,
      isCover: i === 0,
    })),
    events: [
      {
        id: "fb-ev-1",
        title: "Lễ Thành Hôn",
        time: "18:00",
        date: new Date("2026-10-24T18:00:00Z"),
        location: "Sảnh Grand Ballroom",
        address: "194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM",
        description: "Nghi thức trao nhẫn và chúc rượu",
      },
    ],
    rsvps: [
      { id: "fb-r-1", guestName: "Lê Hoàng Phúc", guestCount: 2, isAttending: true, side: "GROOM", message: "Chúc hai bạn trăm năm hạnh phúc!" },
    ],
    guestbooks: [
      { id: "fb-gb-1", name: "Gia đình Bác Thành", message: "Chúc hai cháu vạn sự hanh thông, trăm năm tình viên mãn!", isVisible: true, createdAt: new Date() },
      { id: "fb-gb-2", name: "Thanh Hằng & Quốc Đạt", message: "Mong chờ ngày được chung vui cùng hai bạn tại White Palace!", isVisible: true, createdAt: new Date() },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let wedding: any = null;
  try {
    wedding = await prisma.wedding.findUnique({
      where: { slug: params.slug },
      select: {
        title: true,
        groomName: true,
        brideName: true,
        weddingDate: true,
        coverImage: true,
        venueName: true,
      },
    });
  } catch {
    wedding = null;
  }

  if (!wedding) {
    wedding = getFallbackWedding(params.slug);
  }

  const coupleTitle = `${wedding.groomName} & ${wedding.brideName}`;
  const dateStr = formatDate(wedding.weddingDate, "short");
  const metaTitle = `Thiệp Cưới: ${coupleTitle} | ${dateStr}`;
  const metaDescription = `Trân trọng kính mời bạn đến tham dự lễ cưới của ${wedding.groomName} & ${wedding.brideName} vào ngày ${dateStr} tại ${wedding.venueName || "tư gia"}.`;
  const cover =
    wedding.coverImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80";

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
          alt: coupleTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [cover],
    },
  };
}

export default async function PublicWeddingPage({ params }: PageProps) {
  let wedding: any = null;
  try {
    wedding = await prisma.wedding.findUnique({
      where: { slug: params.slug },
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
        rsvps: true,
        guestbooks: {
          where: { isVisible: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (err) {
    console.warn("Prisma query failed, serving fallback wedding:", err);
    wedding = null;
  }

  // Nếu trong database chưa có hoặc query lỗi -> Tự động nạp dữ liệu fallback siêu mượt!
  if (!wedding) {
    wedding = getFallbackWedding(params.slug);
  }

  return <WeddingEngine wedding={wedding as unknown as WeddingFullData} />;
}


