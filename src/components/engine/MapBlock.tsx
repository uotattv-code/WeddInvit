"use client";

import React, { useState } from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { MapPin, Navigation, Copy, Check } from "lucide-react";

interface MapBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const MapBlock: React.FC<MapBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const venueName = content.venueName || wedding.venueName || "Trung Tâm Tiệc Cưới White Palace";
  const address = content.address || wedding.venueAddress || "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh";
  const mapUrl = content.mapUrl || wedding.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName + " " + address)}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "HƯỚNG DẪN ĐẾN TIỆC CƯỚI"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Vị Trí & Chỉ Đường"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      <div
        className="p-6 sm:p-8 rounded-2xl shadow-sm space-y-6 text-center"
        style={{
          backgroundColor: theme.cardBackgroundColor,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <div
          className="w-14 h-14 mx-auto rounded-full flex items-center justify-center shadow-inner"
          style={{ backgroundColor: `${theme.accentColor}20`, color: theme.accentColor }}
        >
          <MapPin className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
          >
            {venueName}
          </h3>
          <p className="text-sm opacity-80 max-w-md mx-auto leading-relaxed">
            {address}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition hover:opacity-90 shadow-sm"
            style={{
              backgroundColor: theme.primaryColor,
              color: "#FFFFFF",
            }}
          >
            <Navigation className="w-4 h-4" />
            <span>Mở Google Maps</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition border hover:bg-neutral-50"
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 opacity-70" />
                <span>Sao chép địa chỉ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
