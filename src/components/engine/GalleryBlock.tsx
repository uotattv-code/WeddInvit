"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData, GalleryLayout, GalleryImageItem } from "@/lib/types";
import { GalleryRenderer } from "../gallery/GalleryRenderer";

interface GalleryBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  // Gallery items can come from wedding.galleryImages OR block content images OR default demo images
  let images: GalleryImageItem[] = [];

  if (wedding.galleryImages && wedding.galleryImages.length > 0) {
    images = wedding.galleryImages;
  } else if (content.images && Array.isArray(content.images) && content.images.length > 0) {
    images = content.images;
  } else {
    // Default fallback images
    images = [
      { id: "1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", caption: "Nụ cười rạng rỡ" },
      { id: "2", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", caption: "Lời thề nguyền" },
      { id: "3", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", caption: "Dưới ánh hoàng hôn" },
      { id: "4", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", caption: "Trọn vẹn tình yêu" },
      { id: "5", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", caption: "Khoảnh khắc bình yên" },
      { id: "6", url: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80", caption: "Bên nhau trọn đời" },
    ];
  }

  const layout: GalleryLayout = content.layout || (block.layout as GalleryLayout) || "masonry";

  return (
    <section className="py-16 sm:py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "KHOẢNH KHẮC YÊU THƯƠNG"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Album Ảnh Cưới"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      <GalleryRenderer images={images} layout={layout} theme={theme} />
    </section>
  );
};
