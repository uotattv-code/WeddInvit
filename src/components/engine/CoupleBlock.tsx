"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { Heart } from "lucide-react";

interface CoupleBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const CoupleBlock: React.FC<CoupleBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const groomImage =
    content.groomImage ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80";
  const brideImage =
    content.brideImage ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80";

  return (
    <section className="py-16 sm:py-24 px-4 max-w-4xl mx-auto text-center">
      {/* Block Header */}
      <div className="mb-12 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "NHÂN VẬT CHÍNH"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Chú Rể & Cô Dâu"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      {/* Couple Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Groom Card */}
        <div
          className="p-6 rounded-2xl transition-all duration-300 hover:shadow-lg space-y-4"
          style={{
            backgroundColor: theme.cardBackgroundColor,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <div
            className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden p-1.5 shadow-md border-2"
            style={{ borderColor: theme.accentColor }}
          >
            <img
              src={groomImage}
              alt={wedding.groomName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
              {content.groomTitle || "CHÚ RỂ"}
            </span>
            <h3
              className="text-2xl font-bold mt-1"
              style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
            >
              {wedding.groomName}
            </h3>
            {content.groomBio ? (
              <p className="text-sm mt-2 opacity-80 font-light leading-relaxed">
                {content.groomBio}
              </p>
            ) : (
              <p className="text-sm mt-2 opacity-80 font-light leading-relaxed">
                "Chàng trai luôn mỉm cười và sẵn sàng đồng hành cùng em trên mọi nẻo đường cuộc sống."
              </p>
            )}
            {content.groomParents && (
              <div className="mt-4 pt-3 border-t text-xs opacity-75" style={{ borderColor: theme.borderColor }}>
                <p className="font-medium text-neutral-500">Con ông bà:</p>
                <p className="font-semibold mt-0.5">{content.groomParents}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bride Card */}
        <div
          className="p-6 rounded-2xl transition-all duration-300 hover:shadow-lg space-y-4"
          style={{
            backgroundColor: theme.cardBackgroundColor,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <div
            className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden p-1.5 shadow-md border-2"
            style={{ borderColor: theme.accentColor }}
          >
            <img
              src={brideImage}
              alt={wedding.brideName}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
              {content.brideTitle || "CÔ DÂU"}
            </span>
            <h3
              className="text-2xl font-bold mt-1"
              style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
            >
              {wedding.brideName}
            </h3>
            {content.brideBio ? (
              <p className="text-sm mt-2 opacity-80 font-light leading-relaxed">
                {content.brideBio}
              </p>
            ) : (
              <p className="text-sm mt-2 opacity-80 font-light leading-relaxed">
                "Cô gái ấm áp, thích nấu ăn và luôn tin vào những điều kỳ diệu và giản dị của tình yêu."
              </p>
            )}
            {content.brideParents && (
              <div className="mt-4 pt-3 border-t text-xs opacity-75" style={{ borderColor: theme.borderColor }}>
                <p className="font-medium text-neutral-500">Con ông bà:</p>
                <p className="font-semibold mt-0.5">{content.brideParents}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
