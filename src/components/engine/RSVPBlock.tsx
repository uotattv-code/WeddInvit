"use client";

import React, { useState } from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { CheckCircle2, Send, Users, HeartHandshake, Loader2 } from "lucide-react";

interface RSVPBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const RSVPBlock: React.FC<RSVPBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    guestCount: 1,
    isAttending: true,
    side: "GROOM",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) {
      setError("Vui lòng nhập họ và tên của bạn");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: wedding.id,
          ...formData,
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể gửi phản hồi. Vui lòng thử lại!");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra. Xin vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-10 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "PHẢN HỒI THAM DỰ"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Xác Nhận Tham Dự (RSVP)"}
        </h2>
        {content.deadline && (
          <p className="text-xs text-amber-700 font-medium pt-1">
            {content.deadline}
          </p>
        )}
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      <div
        className="p-6 sm:p-10 rounded-2xl shadow-md"
        style={{
          backgroundColor: theme.cardBackgroundColor,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
            >
              Gửi Phản Hồi Thành Công!
            </h3>
            <p className="text-sm opacity-80 max-w-md mx-auto leading-relaxed">
              Cảm ơn <strong>{formData.guestName}</strong> đã gửi phản hồi cho gia đình {wedding.groomName} & {wedding.brideName}. Rất mong được đón tiếp bạn trong ngày vui!
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  guestName: "",
                  phone: "",
                  guestCount: 1,
                  isAttending: true,
                  side: "GROOM",
                  message: "",
                });
              }}
              className="mt-4 text-xs font-semibold underline opacity-70 hover:opacity-100"
            >
              Gửi phản hồi cho người khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Attendance Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Bạn sẽ tham dự chứ? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(15);
                    setFormData({ ...formData, isAttending: true });
                  }}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 border flex items-center justify-center gap-2 ${
                    formData.isAttending
                      ? "ring-2 ring-emerald-500 bg-emerald-50 text-emerald-800 border-emerald-400 shadow-sm"
                      : "opacity-70 hover:opacity-100 border-neutral-200"
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Chắc chắn tham dự</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(15);
                    setFormData({ ...formData, isAttending: false });
                  }}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 border flex items-center justify-center gap-2 ${
                    !formData.isAttending
                      ? "ring-2 ring-neutral-500 bg-neutral-100 text-neutral-800 border-neutral-400 shadow-sm"
                      : "opacity-70 hover:opacity-100 border-neutral-200"
                  }`}
                >
                  <span>Rất tiếc không thể đến</span>
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Họ và Tên của bạn *
              </label>
              <input
                type="text"
                required
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Số Điện Thoại (Tùy chọn)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ví dụ: 0912 345 678"
                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              />
            </div>

            {/* Guest count & Side selection */}
            {formData.isAttending && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Số người tham dự</span>
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                    style={{ borderColor: theme.borderColor }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} người
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    Khách của ai?
                  </label>
                  <select
                    value={formData.side}
                    onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
                    style={{ borderColor: theme.borderColor }}
                  >
                    <option value="GROOM">Khách nhà Chú Rể</option>
                    <option value="BRIDE">Khách nhà Cô Dâu</option>
                    <option value="BOTH">Bạn chung của cả hai</option>
                  </select>
                </div>
              </div>
            )}

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Lời nhắn gửi đôi uyên ương
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Gửi lời chúc mừng hoặc lưu ý đặc biệt..."
                className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition resize-none"
                style={{
                  borderColor: theme.borderColor,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: theme.primaryColor,
                color: "#FFFFFF",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang gửi xác nhận...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Xác Nhận Tham Dự</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
