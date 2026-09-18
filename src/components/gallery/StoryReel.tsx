"use client";

import React, { useState, useEffect, useRef } from "react";
import { GalleryImageItem } from "@/lib/types";
import { Heart, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";

interface StoryReelProps {
  images: GalleryImageItem[];
  onImageClick?: (index: number) => void;
}

export const StoryReel: React.FC<StoryReelProps> = ({ images }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heartPops, setHeartPops] = useState<{ id: number; x: number; y: number }[]>([]);

  const DURATION_PER_SLIDE = 4000; // 4 seconds
  const INTERVAL = 50; // tick every 50ms

  if (!images || images.length === 0) return null;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (INTERVAL / DURATION_PER_SLIDE) * 100;
        if (next >= 100) {
          setCurrentIdx((c) => (c + 1) % images.length);
          return 0;
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, images.length, currentIdx]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleStoryTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.35) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const triggerHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([15, 25]);
    }
    const newId = Date.now() + Math.random();
    setHeartPops((prev) => [...prev, { id: newId, x: Math.random() * 40 - 20, y: 0 }]);
  };

  const currentImage = images[currentIdx];

  return (
    <div className="flex flex-col items-center justify-center py-4 select-none">
      {/* 9:16 Story Frame */}
      <div
        className="relative w-[300px] sm:w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-neutral-900 cursor-pointer"
        onClick={handleStoryTap}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <img
          src={currentImage.url}
          alt={currentImage.caption || `Story ${currentIdx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Gradient Overlay top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        {/* Top Progress Bars (Like Instagram Story) */}
        <div className="absolute top-3 inset-x-3 z-20 flex gap-1.5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden backdrop-blur-xs"
            >
              <div
                className="h-full bg-white transition-all ease-linear"
                style={{
                  width:
                    idx < currentIdx
                      ? "100%"
                      : idx === currentIdx
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-7 inset-x-4 z-20 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
            </div>
            <span className="text-xs font-bold tracking-tight drop-shadow">
              Wedding Story
            </span>
            <span className="text-[10px] text-white/70 font-mono">
              {currentIdx + 1}/{images.length}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(!isPaused);
            }}
            className="p-1 rounded-full bg-black/40 backdrop-blur-md text-white/80"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom Caption & Interactive Heart Button */}
        <div className="absolute bottom-5 inset-x-4 z-20 flex items-end justify-between gap-3 text-white">
          <div className="space-y-1 max-w-[200px]">
            <p className="text-xs font-medium text-white/95 drop-shadow leading-snug">
              {currentImage.caption || `Khoảnh khắc hạnh phúc #${currentIdx + 1}`}
            </p>
            <span className="text-[10px] text-amber-300 block font-light">
              Chạm giữ để dừng ngắm • Chạm mép phải/trái để lật
            </span>
          </div>

          {/* Floating Heart Button on bottom right */}
          <div className="relative">
            {heartPops.map((h) => (
              <div
                key={h.id}
                className="absolute -top-6 left-1/2 -translate-x-1/2 animate-burst-love text-rose-500 pointer-events-none"
              >
                <Heart className="w-6 h-6 fill-current" />
              </div>
            ))}
            <button
              type="button"
              onClick={triggerHeart}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 shadow-lg active:scale-75 transition-transform"
              title="Thả tim cho ảnh này"
            >
              <Heart className="w-5 h-5 fill-current text-rose-400" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-neutral-500 mt-3 text-center">
        📱 Trải nghiệm xem ảnh cưới chuẩn Instagram / TikTok Story tự động
      </p>
    </div>
  );
};
