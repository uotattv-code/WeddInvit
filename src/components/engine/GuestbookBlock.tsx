"use client";

import React, { useState } from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { MessageSquareHeart, Send, Loader2, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface GuestbookBlockProps {
  wedding: WeddingFullData;
  block: WeddingBlockData;
  theme: ThemeConfig;
}

export const GuestbookBlock: React.FC<GuestbookBlockProps> = ({ wedding, block, theme }) => {
  let content: any = {};
  try {
    content = typeof block.content === "string" ? JSON.parse(block.content || "{}") : block.content || {};
  } catch (e) {
    content = {};
  }

  const [messages, setMessages] = useState<any[]>(
    wedding.guestbooks?.filter((g) => g.isVisible !== false) || [
      {
        id: "m1",
        name: "Thu Thảo & Hoàng Long",
        message: "Chúc hai bạn trăm năm hòa hợp, đầu bạc răng long, mãi mãi hạnh phúc như ngày đầu nhé!",
        createdAt: new Date().toISOString(),
      },
      {
        id: "m2",
        name: "Minh Quân (Hội bạn thân)",
        message: "Cuối cùng ngày này cũng tới! Chúc cô dâu chú rể sớm có quý tử và một tổ ấm ngập tràn tiếng cười!",
        createdAt: new Date().toISOString(),
      },
    ]
  );

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Vui lòng nhập tên và lời chúc của bạn!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingId: wedding.id,
          name: name.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể gửi lời chúc. Vui lòng thử lại!");
      }

      const newMsg = await res.json();
      setMessages([newMsg, ...messages]);
      setName("");
      setMessage("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10 space-y-2">
        <p
          className="text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: theme.accentColor }}
        >
          {block.subtitle || "SỔ LƯU BÚT ONLINE"}
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: theme.fontHeading, color: theme.textColor }}
        >
          {block.title || "Gửi Lời Chúc Mừng"}
        </h2>
        <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: theme.accentColor }} />
      </div>

      {/* Write Message Form */}
      <div
        className="p-6 sm:p-8 rounded-2xl shadow-sm mb-8 space-y-4"
        style={{
          backgroundColor: theme.cardBackgroundColor,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Cảm ơn bạn! Lời chúc đã được đăng thành công.</span>
            </div>
          )}

          <div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên hoặc biệt danh của bạn *"
              className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition"
              style={{
                borderColor: theme.borderColor,
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            />
          </div>

          <div>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Viết lời chúc yêu thương của bạn gửi đến đôi uyên ương... *"
              className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition resize-none"
              style={{
                borderColor: theme.borderColor,
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold text-xs sm:text-sm transition hover:opacity-90 shadow-sm disabled:opacity-50"
            style={{
              backgroundColor: theme.primaryColor,
              color: "#FFFFFF",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang đăng lời chúc...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Đăng Lời Chúc Phúc</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-xs opacity-60 py-6">
            Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc phúc nhé!
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={msg.id || idx}
              className="p-4 sm:p-5 rounded-xl shadow-xs transition hover:shadow-sm space-y-1.5"
              style={{
                backgroundColor: theme.cardBackgroundColor,
                border: `1px solid ${theme.borderColor}`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareHeart className="w-4 h-4" style={{ color: theme.accentColor }} />
                  <span className="font-semibold text-sm" style={{ color: theme.textColor }}>
                    {msg.name}
                  </span>
                </div>
                <span className="text-[11px] opacity-60">
                  {formatDate(msg.createdAt, "short")}
                </span>
              </div>
              <p className="text-sm opacity-85 leading-relaxed font-light pl-6">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
