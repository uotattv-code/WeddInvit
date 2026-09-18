"use client";

import React from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";

interface FamilyBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const FamilyBlock: React.FC<FamilyBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const groomFather = content.groomFather || "Nguyễn Văn Hùng";
  const groomMother = content.groomMother || "Trần Thị Mai";
  const brideFather = content.brideFather || "Lê Văn Đức";
  const brideMother = content.brideMother || "Phạm Thị Lan";

  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "KÍNH BÁO TIN MỪNG"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Đại Diện Hai Họ"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Nhà Trai */}
        <div
          className="p-6 sm:p-8 rounded-2xl text-center space-y-3 shadow-sm"
          style={{
            backgroundColor: theme.cardBackgroundColor,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${theme.accentColor}20`,
              color: theme.accentColor,
            }}
          >
            ĐẠI DIỆN NHÀ TRAI
          </span>
          <div className="pt-2 space-y-1">
            <p className="text-xs text-neutral-500 font-medium uppercase">Ông bà:</p>
            <h4 className="text-lg sm:text-xl font-bold" style={{ color: theme.textColor }}>
              {groomFather} & {groomMother}
            </h4>
          </div>
          <div className="pt-2 border-t text-sm opacity-80" style={{ borderColor: theme.borderColor }}>
            Trưởng nam: <strong className="font-semibold">{wedding.groomName}</strong>
          </div>
        </div>

        {/* Nhà Gái */}
        <div
          className="p-6 sm:p-8 rounded-2xl text-center space-y-3 shadow-sm"
          style={{
            backgroundColor: theme.cardBackgroundColor,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${theme.accentColor}20`,
              color: theme.accentColor,
            }}
          >
            ĐẠI DIỆN NHÀ GÁI
          </span>
          <div className="pt-2 space-y-1">
            <p className="text-xs text-neutral-500 font-medium uppercase">Ông bà:</p>
            <h4 className="text-lg sm:text-xl font-bold" style={{ color: theme.textColor }}>
              {brideFather} & {brideMother}
            </h4>
          </div>
          <div className="pt-2 border-t text-sm opacity-80" style={{ borderColor: theme.borderColor }}>
            Ái nữ: <strong className="font-semibold">{wedding.brideName}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
