"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, Download, Share2, Facebook, QrCode } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  groomName: string;
  brideName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  groomName,
  brideName,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#1A1A1A",
          light: "#FFFFFF",
        },
      })
        .then((dataUrl) => setQrDataUrl(dataUrl))
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-ThiepCuoi-${groomName}-${brideName}.png`;
    link.click();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Thiệp Cưới ${groomName} & ${brideName}`,
          text: `Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình!`,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled or not supported");
      }
    } else {
      handleCopy();
    }
  };

  const shareZaloUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
  const shareFacebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3.5">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-neutral-900">
              Chia Sẻ Thiệp Cưới
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code section */}
        <div className="flex flex-col items-center justify-center p-4 bg-amber-50/50 rounded-xl border border-amber-100/80">
          {qrDataUrl ? (
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <img
                src={qrDataUrl}
                alt="Mã QR Thiệp Cưới"
                className="w-44 h-44 object-contain"
              />
            </div>
          ) : (
            <div className="w-44 h-44 flex items-center justify-center bg-white rounded-lg">
              <QrCode className="w-10 h-10 text-neutral-300 animate-pulse" />
            </div>
          )}

          <p className="text-xs text-neutral-600 mt-2 font-medium">
            Quét mã QR để mở trực tiếp thiệp cưới trên điện thoại
          </p>

          <button
            type="button"
            onClick={handleDownloadQr}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/80 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Ảnh Mã QR (PNG)</span>
          </button>
        </div>

        {/* URL Box & Copy */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Đường Dẫn Riêng (URL)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full px-3 py-2 bg-neutral-50 border rounded-xl text-xs font-mono text-neutral-700 select-all outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition flex items-center gap-1 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={handleNativeShare}
            className="py-2.5 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-neutral-600" />
            <span>Chia Sẻ</span>
          </button>

          <a
            href={shareZaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-1.5"
          >
            <span className="font-bold">Zalo</span>
          </a>

          <a
            href={shareFacebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};
