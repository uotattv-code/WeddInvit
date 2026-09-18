"use client";

import React, { useState } from "react";
import { GalleryImageItem } from "@/lib/types";
import { Film, Play, Pause } from "lucide-react";

interface FilmstripReelProps {
  images: GalleryImageItem[];
  onImageClick?: (index: number) => void;
}

export const FilmstripReel: React.FC<FilmstripReelProps> = ({ images, onImageClick }) => {
  const [isPaused, setIsPaused] = useState(false);

  if (!images || images.length === 0) return null;

  // Duplicate items for continuous seamless loop
  const loopImages = [...images, ...images];

  return (
    <div className="py-4 space-y-3 select-none">
      {/* Film Header / Tag */}
      <div className="flex items-center justify-between px-2 text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-1.5 text-amber-600 font-bold">
          <Film className="w-3.5 h-3.5" />
          <span>KODAK PORTRA 400 • 35MM CINEMA REEL</span>
        </div>
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="hover:text-neutral-900 transition flex items-center gap-1 text-[11px]"
        >
          {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          <span>{isPaused ? "Tiếp tục trôi" : "Tạm dừng"}</span>
        </button>
      </div>

      {/* Film Strip Container */}
      <div
        className="relative overflow-hidden bg-neutral-950 py-3 rounded-2xl shadow-xl border border-neutral-800"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Top Film Sprocket Holes */}
        <div className="flex gap-4 px-2 pb-2 overflow-hidden justify-between border-b border-neutral-800/80">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-2 rounded-[2px] bg-neutral-800 shrink-0 border border-neutral-700/50"
            />
          ))}
        </div>

        {/* Scrolling Reel */}
        <div
          className={`flex gap-3 px-2 py-2 ${
            isPaused ? "animate-none" : "animate-marquee-infinite"
          }`}
          style={{ width: "fit-content" }}
        >
          {loopImages.map((img, idx) => {
            const originalIdx = idx % images.length;
            return (
              <div
                key={idx}
                onClick={() => onImageClick && onImageClick(originalIdx)}
                className="group relative w-48 sm:w-60 aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 shrink-0 cursor-pointer shadow-md transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <img
                  src={img.url}
                  alt={img.caption || `Film ${originalIdx + 1}`}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Film Frame Stamp */}
                <div className="absolute top-1.5 left-2 text-[9px] font-mono font-bold text-amber-400 bg-black/60 px-1.5 py-0.5 rounded">
                  #{originalIdx + 1}A
                </div>

                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-[11px] text-white/90 truncate">
                    {img.caption}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Film Sprocket Holes */}
        <div className="flex gap-4 px-2 pt-2 overflow-hidden justify-between border-t border-neutral-800/80">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-2 rounded-[2px] bg-neutral-800 shrink-0 border border-neutral-700/50"
            />
          ))}
        </div>
      </div>

      <p className="text-center text-[11px] text-neutral-400 font-light">
        🎞️ Cuộn phim tự động trôi • Giữ tay vào phim để dừng ngắm ảnh
      </p>

      <style jsx global>{`
        @keyframes marqueeInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marqueeInfinite 24s linear infinite;
        }
      `}</style>
    </div>
  );
};
