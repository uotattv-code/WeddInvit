"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Heart, Calendar, MapPin } from "lucide-react";

interface HeroBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const coverImage =
    wedding.coverImage ||
    content.coverImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80";

  const overlayOpacity = (content.overlayOpacity ?? 35) / 100;

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center overflow-hidden px-4 py-16">
      {/* Background Image with smooth subtle zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src={coverImage}
          alt={wedding.title}
          className="h-full w-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
        />
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        {/* Soft bottom vignette into page background */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t"
          style={{
            backgroundImage: `linear-gradient(to top, ${theme.backgroundColor}, transparent)`,
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-white space-y-6 animate-fade-in drop-shadow-md">
        {/* Top Badge / Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-[0.25em] uppercase font-medium bg-white/15 backdrop-blur-md border border-white/20">
          <Heart className="w-3.5 h-3.5 fill-current text-wedding-gold" />
          <span>{content.badge || "SAVE OUR DATE"}</span>
          <Heart className="w-3.5 h-3.5 fill-current text-wedding-gold" />
        </div>

        {/* Couple Names */}
        <div className="space-y-2 py-4">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: theme.fontHeading }}
          >
            {wedding.groomName}
            <span
              className="block sm:inline my-2 sm:my-0 sm:mx-4 font-normal italic text-3xl sm:text-5xl"
              style={{
                fontFamily: theme.fontScript || theme.fontHeading,
                color: theme.accentColor,
              }}
            >
              &
            </span>
            {wedding.brideName}
          </h1>

          {content.quote && (
            <p className="text-sm sm:text-base italic max-w-md mx-auto text-white/90 font-light pt-2 px-4">
              "{content.quote}"
            </p>
          )}
        </div>

        {/* Date and Venue Card */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-wedding-gold" />
            <span>{formatDate(wedding.weddingDate, "long")}</span>
          </div>
          {wedding.venueName && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-wedding-gold" />
              <span>{wedding.venueName}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
