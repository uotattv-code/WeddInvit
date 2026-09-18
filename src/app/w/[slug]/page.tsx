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
      title: "Không tìm thấy thiệp cưới — Weddinvit",
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
}

export default async function PublicWeddingPage({ params }: PageProps) {
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
}
