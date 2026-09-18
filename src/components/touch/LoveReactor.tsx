"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LoveReactorProps {
  weddingId: string;
  accentColor?: string;
}

export const LoveReactor: React.FC<LoveReactorProps> = ({
  weddingId,
  accentColor = "#E63946",
}) => {
  const [count, setCount] = useState(128);
  const [isBouncing, setIsBouncing] = useState(false);
  const [burstHearts, setBurstHearts] = useState<{ id: number; offset: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`love_reacts_${weddingId}`);
    if (saved) {
      setCount(parseInt(saved, 10));
    }
  }, [weddingId]);

  const handleHeartClick = () => {
    // Haptic feedback
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([15, 20]);
    }

    const nextCount = count + 1;
    setCount(nextCount);
    localStorage.setItem(`love_reacts_${weddingId}`, nextCount.toString());

    // Trigger bounce
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 250);

    // Spawn 2-3 burst hearts
    const newId = Date.now() + Math.random();
    setBurstHearts((prev) => [
      ...prev.slice(-15),
      { id: newId, offset: Math.random() * 40 - 20 },
      { id: newId + 1, offset: Math.random() * 60 - 30 },
    ]);
  };

  // Cleanup old burst hearts
  useEffect(() => {
    if (burstHearts.length === 0) return;
    const t = setTimeout(() => {
      setBurstHearts((prev) => prev.slice(2));
    }, 800);
    return () => clearTimeout(t);
  }, [burstHearts]);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center">
      {/* Upward floating burst hearts container */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        {burstHearts.map((h) => (
          <div
            key={h.id}
            className="absolute animate-burst-love text-rose-500"
            style={{
              left: `${h.offset}px`,
              bottom: "0px",
            }}
          >
            <Heart className="w-5 h-5 fill-current" />
          </div>
        ))}
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={handleHeartClick}
        aria-label="Thả tim chúc phúc cho đôi uyên ương"
        className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl transition-all duration-200 backdrop-blur-md border border-white/20 bg-black/75 text-white active:scale-90 hover:scale-105 ${
          isBouncing ? "scale-110" : ""
        }`}
      >
        <div className="p-1.5 rounded-full bg-rose-500 text-white shadow-sm transition-transform group-active:scale-125">
          <Heart className="w-3.5 h-3.5 fill-current" />
        </div>
        <div className="text-left pr-1">
          <span className="text-[10px] block opacity-75 leading-none">Chúc phúc</span>
          <span className="text-xs font-extrabold tracking-tight font-mono text-rose-300">
            {count.toLocaleString()}
          </span>
        </div>
      </button>

      <style jsx global>{`
        @keyframes burstLove {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-40px) scale(1.2) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-90px) scale(1.4) rotate(-15deg);
          }
        }
        .animate-burst-love {
          animation: burstLove 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};
