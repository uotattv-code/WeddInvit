"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { Heart } from "lucide-react";

interface ThankYouBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const ThankYouBlock: React.FC<ThankYouBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  return (
    <footer className="py-16 sm:py-24 px-4 text-center border-t" style={{ borderColor: theme.borderColor }}>
      <div className="max-w-xl mx-auto space-y-6">
        <Heart className="w-8 h-8 mx-auto fill-current animate-pulse-subtle" style={{ color: theme.accentColor }} />

        <div className="space-y-2">
          <p
            className="text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ color: theme.accentColor }}
          >
            {block.subtitle || "THANK YOU"}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
          >
            {block.title || "Trân Trọng Cảm Ơn"}
          </h2>
        </div>

        <p className="text-sm sm:text-base opacity-85 leading-relaxed font-light">
          {content.message ||
            "Sự hiện diện và lời chúc phúc của quý khách là món quà vô giá nhất đối với chúng mình trong ngày trọng đại này!"}
        </p>

        <div className="pt-4">
          <p
            className="text-3xl sm:text-4xl italic"
            style={{
              fontFamily: theme.fontScript || theme.fontHeading,
              color: theme.accentColor,
            }}
          >
            {wedding.groomName} & {wedding.brideName}
          </p>
        </div>

        <div className="pt-8 text-xs opacity-50 flex items-center justify-center gap-1">
          <span>Tạo bởi</span>
          <a
            href="/"
            target="_blank"
            className="font-semibold underline hover:opacity-80 transition"
          >
            Weddinvit
          </a>
          <span>• Nền tảng thiệp cưới online cao cấp</span>
        </div>
      </div>
    </footer>
  );
};
