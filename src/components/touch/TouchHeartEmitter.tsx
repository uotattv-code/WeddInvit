"use client";

import React, { useEffect, useState, useCallback } from "react";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const COLORS = [
  "#FF4D6D", // Rose Red
  "#D4AF37", // Gold
  "#FF758F", // Pink
  "#E07A5F", // Warm Coral
  "#C9184A", // Crimson
];

export const TouchHeartEmitter: React.FC = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  const addParticles = useCallback((x: number, y: number) => {
    // Light haptic feedback on supported mobile devices
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }

    const count = Math.floor(Math.random() * 2) + 2; // 2 to 3 hearts per tap
    const newItems: HeartParticle[] = [];

    for (let i = 0; i < count; i++) {
      newItems.push({
        id: Date.now() + Math.random() + i,
        x: x + (Math.random() * 30 - 15),
        y: y + (Math.random() * 20 - 10),
        size: Math.floor(Math.random() * 12) + 14, // 14px to 26px
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.floor(Math.random() * 40 - 20),
      });
    }

    setParticles((prev) => [...prev.slice(-25), ...newItems]); // keep max 30 particles at once
  }, []);

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      // Don't trigger when typing in inputs or textareas
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        return;
      }

      if (e.touches && e.touches[0]) {
        addParticles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        return;
      }
      addParticles(e.clientX, e.clientY);
    };

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("click", handleClick);
    };
  }, [addParticles]);

  // Auto clean particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 900);
    return () => clearTimeout(timer);
  }, [particles]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-heart select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill={p.color}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            className="drop-shadow-sm"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      <style jsx global>{`
        @keyframes floatHeart {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.15) translateY(-35px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.4) translateY(-75px);
          }
        }
        .animate-float-heart {
          animation: floatHeart 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};
