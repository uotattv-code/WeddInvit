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

// Dynamic Open Graph SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const wedding = await prisma.wedding.findUnique({
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

    if (!wedding) {
      return {
        title: "Thiệp Cưới — Weddinvit",
      };
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
  } catch {
    return {
      title: "Thiệp Cưới Đang Khởi Tạo — Weddinvit",
    };
  }
}

export default async function PublicWeddingPage({ params }: PageProps) {
  try {
    const wedding = await prisma.wedding.findUnique({
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

    if (!wedding) {
      notFound();
    }

    return <WeddingEngine wedding={wedding as unknown as WeddingFullData} />;
  } catch (error) {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-4">
          💍
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2">Cơ sở dữ liệu đang được kết nối</h1>
        <p className="text-stone-400 max-w-md text-sm mb-6">
          Hệ thống đang chuẩn bị các bảng dữ liệu trên Supabase cho đám cưới của bạn.
        </p>
        <a
          href="/api/init-db"
          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl font-medium shadow-lg hover:opacity-90 transition-opacity text-sm"
        >
          Bấm vào đây để Khởi tạo Dữ liệu (1 Giây)
        </a>
      </div>
    );
  }
}

