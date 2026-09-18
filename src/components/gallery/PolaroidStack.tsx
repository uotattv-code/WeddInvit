"use client";

import React, { useState } from "react";
import { Sparkles, Heart, ArrowRight, RotateCcw } from "lucide-react";
import { GalleryImageItem } from "@/lib/types";

interface PolaroidStackProps {
  images: GalleryImageItem[];
  onImageClick?: (index: number) => void;
}

const STICKERS = ["Đã Chốt Đơn! 💍", "She Said YES ✨", "Hạ Cánh Nơi Anh 🛬", "Best Day Ever 💖", "Mãi Keo 🥭"];

export const PolaroidStack: React.FC<PolaroidStackProps> = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSwiping) return;

    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }

    setIsSwiping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsSwiping(false);
    }, 280);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(0);
  };

  // Stack of 3 visible cards
  const visibleCards = [0, 1, 2].map((offset) => {
    const idx = (currentIndex + offset) % images.length;
    return {
      image: images[idx],
      index: idx,
      offset,
    };
  });

  const topCard = visibleCards[0];
  const sticker = STICKERS[currentIndex % STICKERS.length];

  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      {/* Interactive Stack Area */}
      <div
        onClick={handleNext}
        className="relative w-[300px] sm:w-[340px] aspect-[4/5] cursor-pointer group flex items-center justify-center"
      >
        {visibleCards.reverse().map(({ image, index, offset }) => {
          const isTop = offset === 0;
          const tilts = [-4, 3, -1, 5, -3];
          const tilt = tilts[index % tilts.length];

          return (
            <div
              key={`${image.id || index}-${offset}`}
              className={`absolute inset-0 bg-white rounded-2xl p-3 pb-6 shadow-2xl transition-all duration-300 flex flex-col justify-between border border-neutral-200/80 ${
                isTop && isSwiping
                  ? "translate-x-32 rotate-12 opacity-0 scale-95"
                  : ""
              }`}
              style={{
                transform: isTop && isSwiping
                  ? undefined
                  : `translateY(${offset * 8}px) scale(${1 - offset * 0.05}) rotate(${isTop ? tilt : offset % 2 === 0 ? -2 : 3}deg)`,
                zIndex: 10 - offset,
              }}
            >
              {/* Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-200/80 backdrop-blur-xs shadow-xs rotate-[-2deg] rounded-xs border border-amber-300/60 z-20" />

              {/* Photo Area */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-100 shadow-inner">
                <img
                  src={image.url}
                  alt={image.caption || "Ảnh Polaroid"}
                  className="w-full h-full object-cover"
                />

                {/* Youthful Gen Z Sticker on Top Card */}
                {isTop && (
                  <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-bold tracking-wider shadow-lg border border-white/20 animate-pulse-subtle">
                    {sticker}
                  </div>
                )}
              </div>

              {/* Handwritten style caption */}
              <div className="pt-3 text-center">
                <p className="font-serif italic text-base text-neutral-800 tracking-wide truncate px-2">
                  {image.caption || `Khoảnh khắc #${index + 1}`}
                </p>
                <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                  {index + 1} / {images.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Tip */}
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-xs shadow-md transition hover:scale-105 active:scale-95"
        >
          <span>Chạm để xem ảnh kế</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 transition active:scale-90 text-xs"
            title="Xem lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <p className="text-[11px] text-neutral-500 mt-2">
        👉 Chạm vào ảnh để rút xem tấm tiếp theo
      </p>
    </div>
  );
};
