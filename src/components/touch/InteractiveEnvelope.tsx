"use client";

import React, { useState, useEffect } from "react";
import { Heart, Sparkles, MailOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface InteractiveEnvelopeProps {
  groomName: string;
  brideName: string;
  weddingDate: string | Date;
  onOpen?: () => void;
  accentColor?: string;
  themeStyle?: string;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  groomName,
  brideName,
  weddingDate,
  onOpen,
  accentColor = "#D4AF37",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if previously opened in this session
  useEffect(() => {
    const hasOpened = sessionStorage.getItem(`envelope_opened_${groomName}_${brideName}`);
    if (hasOpened) {
      setIsDismissed(true);
    }
  }, [groomName, brideName]);

  const handleOpenEnvelope = () => {
    if (isAnimating || isOpen) return;

    // Trigger haptic vibration on mobile
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([25, 35, 45]);
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      if (onOpen) onOpen();
    }, 400);

    setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem(`envelope_opened_${groomName}_${brideName}`, "true");
    }, 1200);
  };

  const handleReopen = () => {
    setIsDismissed(false);
    setIsOpen(false);
    setIsAnimating(false);
  };

  if (isDismissed) {
    return (
      <button
        type="button"
        onClick={handleReopen}
        className="fixed top-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-md border border-white/20 text-xs font-medium shadow-lg transition active:scale-95"
        title="Mở lại phong bì thiệp cưới"
      >
        <MailOpen className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[11px]">Mở lại phong bì</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 select-none ${
        isOpen
          ? "opacity-0 pointer-events-none scale-110 -translate-y-8"
          : "opacity-100 bg-black/80 backdrop-blur-md"
      }`}
    >
      {/* Outer Envelope Container */}
      <div
        onClick={handleOpenEnvelope}
        className={`relative w-full max-w-sm sm:max-w-md aspect-[16/11] rounded-2xl p-1 shadow-2xl cursor-pointer transition-transform duration-500 hover:scale-[1.02] active:scale-95 ${
          isAnimating ? "animate-envelope-open" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, #FAF7F2 0%, #EDE6DC 100%)",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.2)",
        }}
      >
        {/* Inner Gold Foil Frame */}
        <div className="h-full w-full rounded-xl border-2 border-dashed border-amber-600/40 p-5 flex flex-col justify-between items-center text-center relative overflow-hidden bg-white/40 backdrop-blur-xs">
          {/* Top Stamp / Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-bold text-amber-800/80">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>THIỆP CƯỚI TRÂN QUÝ</span>
              <Sparkles className="w-3 h-3 text-amber-600" />
            </div>
            <p className="text-xs text-neutral-500 font-light">Kính gửi Quý Khách</p>
          </div>

          {/* Couple Typography */}
          <div className="space-y-1 py-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-800 tracking-tight">
              {groomName}
              <span className="mx-2 font-script text-2xl sm:text-3xl font-normal text-amber-700">
                &
              </span>
              {brideName}
            </h2>
            <p className="text-[11px] tracking-wider text-neutral-600 font-medium">
              {formatDate(weddingDate, "short")}
            </p>
          </div>

          {/* 3D Wax Seal (Con Dấu Sáp) in the Center Bottom */}
          <div className="relative group cursor-pointer pt-2">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110 active:scale-90 ${
                isAnimating ? "scale-125 rotate-12" : "animate-pulse-subtle"
              }`}
              style={{
                background: "radial-gradient(circle, #C0392B 0%, #8B0000 70%, #580000 100%)",
                boxShadow: "0 8px 25px rgba(139,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.5)",
                border: "2px solid rgba(212,175,55,0.7)",
              }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-amber-300/40 flex items-center justify-center text-amber-200">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-amber-300 drop-shadow" />
              </div>
            </div>

            {/* Tap instruction */}
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-amber-900 bg-amber-200/70 border border-amber-300/60 shadow-xs animate-bounce">
                👉 Chạm con dấu sáp để mở thiệp
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes envelopeOpen {
          0% { transform: scale(1); }
          50% { transform: scale(1.08) rotate(-1deg); }
          100% { transform: scale(1.2) translateY(-40px); opacity: 0; }
        }
        .animate-envelope-open {
          animation: envelopeOpen 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};
