"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData, EventItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, MapPin, Navigation, Sparkles } from "lucide-react";

interface EventsBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const EventsBlock: React.FC<EventsBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const events: EventItem[] =
    wedding.events && wedding.events.length > 0
      ? wedding.events
      : content.events || [
          {
            id: "1",
            title: "Lễ Thành Hôn",
            time: "09:00 - 10:30",
            date: typeof wedding.weddingDate === "string" ? wedding.weddingDate : new Date(wedding.weddingDate).toISOString(),
            location: "Tư Gia Nhà Trai",
            address: wedding.venueAddress || "123 Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
            dressCode: "Áo dài truyền thống / Lịch sự",
          },
          {
            id: "2",
            title: "Tiệc Cưới Chiêu Đãi",
            time: "11:30 - 14:00",
            date: typeof wedding.weddingDate === "string" ? wedding.weddingDate : new Date(wedding.weddingDate).toISOString(),
            location: wedding.venueName || "Trung Tâm Hội Nghị White Palace",
            address: wedding.venueAddress || "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh",
            mapUrl: wedding.mapUrl || "https://maps.google.com",
            dressCode: "Trang phục dạ tiệc (Tone màu: Trắng, Kem, Pastel)",
          },
        ];

  return (
    <section className="py-16 sm:py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "LỊCH TRÌNH NGÀY CƯỚI"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Sự Kiện Trọng Đại"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {events.map((evt, idx) => (
          <div
            key={evt.id || idx}
            className="p-6 sm:p-8 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-6"
            style={{
              backgroundColor: theme.cardBackgroundColor,
              border: `1px solid ${theme.borderColor}`,
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${theme.accentColor}20`,
                    color: theme.accentColor,
                  }}
                >
                  Sự kiện #{idx + 1}
                </span>
                <Clock className="w-4 h-4 opacity-50" />
              </div>

              <h3
                className="text-2xl font-bold"
                style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
              >
                {evt.title}
              </h3>

              <div className="space-y-2.5 text-sm opacity-85">
                <div className="flex items-center gap-2.5 font-medium">
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                  <span>{formatDate(evt.date, "long")}</span>
                </div>

                <div className="flex items-center gap-2.5 font-medium">
                  <Clock className="w-4 h-4 shrink-0" style={{ color: theme.accentColor }} />
                  <span>{evt.time}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accentColor }} />
                  <div>
                    <strong className="block text-neutral-900 font-semibold">{evt.location}</strong>
                    <span className="text-xs text-neutral-500">{evt.address}</span>
                  </div>
                </div>

                {evt.dressCode && (
                  <div className="flex items-center gap-2.5 pt-2 text-xs text-amber-700 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/50">
                    <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Dress Code: {evt.dressCode}</span>
                  </div>
                )}
              </div>
            </div>

            {evt.mapUrl && (
              <a
                href={evt.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition hover:opacity-90"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: "#FFFFFF",
                }}
              >
                <Navigation className="w-4 h-4" />
                <span>Xem bản đồ & Chỉ đường</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
