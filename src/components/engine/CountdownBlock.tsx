"use client";

import React, { useState, useEffect } from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { Heart } from "lucide-react";

interface CountdownBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const CountdownBlock: React.FC<CountdownBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const targetDate = new Date(content.targetDate || wedding.weddingDate).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-16 sm:py-20 px-4 max-w-3xl mx-auto text-center">
      <div className="mb-10 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "CÙNG ĐẾM NGƯỢC"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Ngày Chung Đôi Đang Đến Gần"}
        </h2>
      </div>

      {timeLeft.isPassed ? (
        <div
          className="p-8 rounded-2xl shadow-sm space-y-3"
          style={{
            backgroundColor: theme.cardBackgroundColor,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <Heart className="w-8 h-8 mx-auto text-wedding-gold animate-bounce" />
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
          >
            Thank You For Celebrating With Us!
          </h3>
          <p className="text-sm opacity-80 max-w-md mx-auto">
            {content.postWeddingMessage ||
              "Cảm ơn quý khách đã cùng sẻ chia những khoảnh khắc hạnh phúc và thiêng liêng nhất trong ngày trọng đại của chúng mình!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
          {[
            { label: "NGÀY", value: timeLeft.days },
            { label: "GIỜ", value: timeLeft.hours },
            { label: "PHÚT", value: timeLeft.minutes },
            { label: "GIÂY", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-5 rounded-xl text-center shadow-sm transition-transform duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: theme.cardBackgroundColor,
                border: `1px solid ${theme.borderColor}`,
              }}
            >
              <div
                className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: theme.fontHeading, color: theme.accentColor }}
              >
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] sm:text-xs tracking-wider uppercase mt-1 opacity-70 font-semibold">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
