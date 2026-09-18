"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export const FallingPetals: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      left: number;
      size: number;
      duration: number;
      delay: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    // Generate 16 gentle drifting petals/sparks
    const items = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 8 + 8, // 8px to 16px
      duration: Math.random() * 5 + 6, // 6s to 11s
      delay: Math.random() * 5, // 0s to 5s
      color: Math.random() > 0.5 ? "#F4A261" : "#E63946",
    }));
    setPetals(items);
  }, []);

  if (!enabled) {
    return (
      <button
        type="button"
        onClick={() => setEnabled(true)}
        className="fixed top-4 right-4 z-40 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/70 hover:text-white backdrop-blur-md text-xs transition active:scale-95 border border-white/10"
        title="Bật hiệu ứng cánh hoa bay"
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
      </button>
    );
  }

  return (
    <>
      {/* Toggle button on top-right */}
      <button
        type="button"
        onClick={() => setEnabled(false)}
        className="fixed top-4 right-4 z-40 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white/80 backdrop-blur-md text-[11px] transition active:scale-95 border border-white/15"
        title="Tắt hiệu ứng hoa rơi"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
        <span className="hidden sm:inline">Hoa rơi</span>
      </button>

      {/* Petals container */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute -top-6 animate-falling-petal"
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="opacity-70 drop-shadow-xs"
            >
              {/* Organic rose petal shape */}
              <path d="M12 2C8 6 3 10 3 15a9 9 0 0018 0c0-5-5-9-9-13z" />
            </svg>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fallingPetal {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(105vh) translateX(60px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-falling-petal {
          animation-name: fallingPetal;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
};
