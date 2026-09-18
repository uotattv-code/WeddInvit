"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { ArrowLeft, Sparkles, Heart, Check, Loader2 } from "lucide-react";

export default function NewWeddingPage() {
  const router = useRouter();

  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groomName.trim() || !brideName.trim()) {
      setError("Vui lòng nhập tên Chú Rể và Cô Dâu");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/weddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate,
          groomName: groomName.trim(),
          brideName: brideName.trim(),
          weddingDate: weddingDate ? new Date(weddingDate).toISOString() : undefined,
          venueName: venueName.trim() || undefined,
          venueAddress: venueAddress.trim() || undefined,
          customSlug: customSlug.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Không thể tạo thiệp mới.");
      }

      const created = await res.json();
      router.push(`/dashboard/weddings/${created.id}/edit`);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back link */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách thiệp</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Tạo Website Thiệp Cưới Mới</span>
            <Sparkles className="w-6 h-6 text-amber-400" />
          </h1>
          <p className="text-sm text-neutral-400">
            Chọn một trong 5 template sang trọng và nhập thông tin cơ bản của đôi uyên ương để bắt đầu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* 1. CHOOSE TEMPLATE */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span>Chọn Mẫu Thiệp (Template)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TEMPLATES.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-amber-400 ring-2 ring-amber-400 shadow-xl bg-neutral-950 scale-[1.02]"
                        : "border-neutral-800 bg-neutral-950/80 hover:border-neutral-700 hover:scale-[1.01]"
                    }`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900">
                      <img
                        src={tpl.thumbnail}
                        alt={tpl.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                      <span className="absolute bottom-2 left-2 text-xs font-bold text-white drop-shadow">
                        {tpl.name}
                      </span>
                    </div>

                    <div className="p-3 space-y-1.5">
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {tpl.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {tpl.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] bg-neutral-900 text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. COUPLE INFORMATION */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>Thông Tin Cặp Đôi</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Họ và Tên Chú Rể *
                </label>
                <input
                  type="text"
                  required
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Quang Minh"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:border-amber-400 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Họ và Tên Cô Dâu *
                </label>
                <input
                  type="text"
                  required
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Ví dụ: Trần Ngọc Anh"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:border-amber-400 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Ngày Cưới (Dự kiến)
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:border-amber-400 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Tùy Chọn Tên Đường Dẫn (Slug)
                </label>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="Để trống sẽ tự tạo: /w/minh-anh"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:border-amber-400 focus:outline-none transition font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Tên Trung Tâm / Địa Điểm
                </label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="Ví dụ: White Palace Hoàng Văn Thụ"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:border-amber-400 focus:outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Địa Chỉ Cụ Thể
                </label>
                <input
                  type="text"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder="Ví dụ: 194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-sm text-white focus:border-amber-400 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-end gap-4">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition"
            >
              Hủy
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm rounded-xl transition shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang khởi tạo thiệp...</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Bắt Đầu Thiết Kế Studio</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
