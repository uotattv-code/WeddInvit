"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData, StoryItem } from "@/lib/types";

interface StoryBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const StoryBlock: React.FC<StoryBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const stories: StoryItem[] = content.stories || [
    {
      id: "1",
      year: "2020",
      title: "Chạm Mặt Lần Đầu",
      description: "Một ngày mưa bay tại quán cà phê góc phố, chiếc ô che chung đã bắt đầu câu chuyện của hai ta.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
    },
    {
      id: "2",
      year: "2022",
      title: "Chuyến Du Lịch Đầu Tiên",
      description: "Hành trình ngắm bình minh trên đỉnh Tà Xùa, cùng sẻ chia những ước mơ và hoài bão tương lai.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    },
    {
      id: "3",
      year: "2024",
      title: "Lời Cầu Hôn Ngọt Ngào",
      description: "Dưới bầu trời sao lấp lánh, câu nói 'Em đồng ý' mở ra trang mới tràn ngập tình yêu.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
    },
  ];

  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "LOVE STORY"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Câu Chuyện Tình Yêu"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      <div className="relative">
        {/* Central timeline line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2"
          style={{ backgroundColor: theme.borderColor }}
        />

        <div className="space-y-12">
          {stories.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id || index}
                className={`relative flex flex-col md:flex-row items-center gap-6 pl-12 md:pl-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-1/2 top-4 md:top-1/2 w-3.5 h-3.5 rounded-full transform -translate-x-1/2 md:-translate-y-1/2 ring-4 ring-white shadow"
                  style={{ backgroundColor: theme.accentColor }}
                />

                {/* Content Box */}
                <div className="w-full md:w-1/2 px-2 md:px-6">
                  <div
                    className="p-6 rounded-2xl shadow-sm transition duration-300 hover:shadow-md space-y-3"
                    style={{
                      backgroundColor: theme.cardBackgroundColor,
                      border: `1px solid ${theme.borderColor}`,
                    }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                      style={{
                        backgroundColor: `${theme.accentColor}20`,
                        color: theme.accentColor,
                      }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-80 leading-relaxed font-light">
                      {item.description}
                    </p>
                    {item.image && (
                      <div className="mt-4 aspect-video rounded-xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer on opposite side on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
