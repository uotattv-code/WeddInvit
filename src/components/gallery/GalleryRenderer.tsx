"use client";

import React, { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Heart } from "lucide-react";
import { GalleryImageItem, GalleryLayout, ThemeConfig } from "@/lib/types";
import { PolaroidStack } from "./PolaroidStack";
import { FilmstripReel } from "./FilmstripReel";
import { StoryReel } from "./StoryReel";

interface GalleryRendererProps {
  images: GalleryImageItem[];
  layout?: GalleryLayout;
  theme: ThemeConfig;
}

export const GalleryRenderer: React.FC<GalleryRendererProps> = ({
  images = [],
  layout = "masonry",
  theme,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [heartPopIdx, setHeartPopIdx] = useState<number | null>(null);
  const lastTapRef = useRef<{ [key: number]: number }>({});

  if (!images || images.length === 0) {
    return (
      <div className="py-12 text-center text-sm opacity-60">
        Chưa có hình ảnh trong bộ sưu tập.
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  // Handle Double-Tap for Heart Popping
  const handlePhotoClick = (index: number) => {
    const now = Date.now();
    const lastTap = lastTapRef.current[index] || 0;

    if (now - lastTap < 320) {
      // Double tap detected!
      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate([20, 30]);
      }
      setHeartPopIdx(index);
      setTimeout(() => setHeartPopIdx(null), 850);
      lastTapRef.current[index] = 0;
    } else {
      lastTapRef.current[index] = now;
      openLightbox(index);
    }
  };

  // Heart pop overlay
  const renderHeartPop = (index: number) => {
    if (heartPopIdx !== index) return null;
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        <div className="animate-heart-pop text-rose-500 drop-shadow-2xl">
          <Heart className="w-16 h-16 fill-current stroke-white stroke-[1.5]" />
        </div>
      </div>
    );
  };

  // Render Layouts
  const renderLayout = () => {
    switch (layout) {
      case "polaroid-stack":
        return <PolaroidStack images={images} onImageClick={openLightbox} />;

      case "filmstrip":
        return <FilmstripReel images={images} onImageClick={openLightbox} />;

      case "story-reel":
        return <StoryReel images={images} onImageClick={openLightbox} />;

      case "grid-2":
        return (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => handlePhotoClick(idx)}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95"
              >
                {renderHeartPop(idx)}
                <img
                  src={img.url}
                  alt={img.caption || `Ảnh cưới ${idx + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center text-white">
                  <Maximize2 className="h-6 w-6 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        );

      case "grid-3":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => handlePhotoClick(idx)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                {renderHeartPop(idx)}
                <img
                  src={img.url}
                  alt={img.caption || `Ảnh cưới ${idx + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center text-white">
                  <Maximize2 className="h-5 w-5 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        );

      case "featured":
        const featured = images[0];
        const rest = images.slice(1);
        return (
          <div className="space-y-3">
            {featured && (
              <div
                onClick={() => handlePhotoClick(0)}
                className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 shadow-md active:scale-98 transition-transform"
              >
                {renderHeartPop(0)}
                <img
                  src={featured.url}
                  alt={featured.caption || "Ảnh nổi bật"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 flex items-end p-4 text-white">
                  <span className="text-xs uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    Khoảnh khắc nổi bật
                  </span>
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {rest.map((img, idx) => (
                  <div
                    key={img.id || idx + 1}
                    onClick={() => handlePhotoClick(idx + 1)}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-neutral-100 shadow-sm active:scale-95 transition-transform"
                  >
                    {renderHeartPop(idx + 1)}
                    <img
                      src={img.url}
                      alt={img.caption || `Ảnh ${idx + 2}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "carousel":
        return (
          <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex space-x-3 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth">
              {images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  onClick={() => handlePhotoClick(idx)}
                  className="w-[72vw] max-w-[280px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 shadow-md active:scale-95 transition-transform"
                >
                  <div className="aspect-[3/4] relative">
                    {renderHeartPop(idx)}
                    <img
                      src={img.url}
                      alt={img.caption || `Ảnh cưới ${idx + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {img.caption && (
                    <p className="p-2 text-center text-xs opacity-75 truncate">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs opacity-60 mt-2">
              ← Vuốt sang để xem thêm {images.length} hình ảnh (Chạm đúp để thả tim ❤️) →
            </p>
          </div>
        );

      case "masonry":
      default:
        return (
          <div className="columns-2 sm:columns-3 gap-2.5 sm:gap-3 space-y-2.5 sm:space-y-3">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => handlePhotoClick(idx)}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md active:scale-95"
              >
                {renderHeartPop(idx)}
                <img
                  src={img.url}
                  alt={img.caption || `Ảnh cưới ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center text-white">
                  <Maximize2 className="h-5 w-5 drop-shadow" />
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div>
      {renderLayout()}

      {/* Lightbox Modal */}
      {selectedIdx !== null && images[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/30 transition active:scale-90"
            aria-label="Đóng"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 sm:left-6 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 transition backdrop-blur-sm active:scale-90"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 sm:right-6 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 transition backdrop-blur-sm active:scale-90"
                aria-label="Ảnh kế tiếp"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative max-h-[85vh] max-w-[90vw] sm:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIdx].url}
              alt={images[selectedIdx].caption || "Xem ảnh phóng to"}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-3 flex items-center justify-between text-white/80 text-xs sm:text-sm">
              <span>{images[selectedIdx].caption || "Chạm 2 lần vào ảnh để thả tim ❤️"}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-mono">
                {selectedIdx + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes heartPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          40% {
            transform: scale(1.35);
            opacity: 1;
          }
          70% {
            transform: scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.6) translateY(-25px);
            opacity: 0;
          }
        }
        .animate-heart-pop {
          animation: heartPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};
