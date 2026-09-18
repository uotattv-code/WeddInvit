"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Rocket,
  Share2,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Palette,
  Settings,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Upload,
  Music,
  Check,
  AlertCircle,
  Loader2,
  X,
  Sliders,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Wifi,
  Battery,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { WeddingFullData, ThemeConfig, WeddingBlockData, GalleryLayout } from "@/lib/types";
import { WeddingEngine } from "../engine/WeddingEngine";
import { TEMPLATES } from "@/lib/templates";
import { ShareModal } from "../common/ShareModal";

interface StudioEditorProps {
  initialWedding: WeddingFullData;
}

type PhoneModel = "iphone-pro" | "iphone-se" | "galaxy" | "tablet" | "desktop";

export const StudioEditor: React.FC<StudioEditorProps> = ({ initialWedding }) => {
  const [wedding, setWedding] = useState<WeddingFullData>(initialWedding);
  const [activeTab, setActiveTab] = useState<"blocks" | "gallery" | "theme" | "settings">("blocks");
  const [phoneModel, setPhoneModel] = useState<PhoneModel>("iphone-pro");
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Parse current theme
  const currentTheme: ThemeConfig =
    typeof wedding.themeConfig === "string"
      ? JSON.parse(wedding.themeConfig || "{}")
      : wedding.themeConfig || TEMPLATES[0].defaultTheme;

  // Handle general info changes
  const handleInfoChange = (field: keyof WeddingFullData, value: any) => {
    setWedding((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle theme update
  const handleThemeChange = (newTheme: ThemeConfig) => {
    setWedding((prev) => ({
      ...prev,
      themeConfig: newTheme,
    }));
  };

  // Handle block toggle
  const toggleBlock = (blockId: string) => {
    setWedding((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId ? { ...b, enabled: !b.enabled } : b
      ),
    }));
  };

  // Move block up
  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    setWedding((prev) => {
      const sorted = [...prev.blocks].sort((a, b) => a.order - b.order);
      const tempOrder = sorted[index].order;
      sorted[index].order = sorted[index - 1].order;
      sorted[index - 1].order = tempOrder;
      return { ...prev, blocks: sorted };
    });
  };

  // Move block down
  const moveBlockDown = (index: number) => {
    const sorted = [...wedding.blocks].sort((a, b) => a.order - b.order);
    if (index === sorted.length - 1) return;
    setWedding((prev) => {
      const copy = [...sorted];
      const tempOrder = copy[index].order;
      copy[index].order = copy[index + 1].order;
      copy[index + 1].order = tempOrder;
      return { ...prev, blocks: copy };
    });
  };

  // Update block content
  const updateBlockContent = (blockId: string, contentUpdates: Record<string, any>) => {
    setWedding((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => {
        if (b.id !== blockId) return b;
        let existing: any = {};
        try {
          existing = typeof b.content === "string" ? JSON.parse(b.content || "{}") : b.content || {};
        } catch {
          existing = {};
        }
        const updated = { ...existing, ...contentUpdates };
        return {
          ...b,
          content: JSON.stringify(updated),
        };
      }),
    }));
  };

  // Update block title/subtitle
  const updateBlockMeta = (blockId: string, field: "title" | "subtitle", val: string) => {
    setWedding((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === blockId ? { ...b, [field]: val } : b)),
    }));
  };

  // Save changes
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/weddings/${wedding.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wedding),
      });

      if (!res.ok) throw new Error("Lỗi khi lưu thiệp cưới!");

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Lỗi lưu dữ liệu.");
    } finally {
      setIsSaving(false);
    }
  };

  // Publish wedding
  const handlePublish = async () => {
    setIsPublishing(true);
    setSaveError("");

    try {
      const res = await fetch(`/api/weddings/${wedding.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...wedding,
          status: "PUBLISHED",
        }),
      });

      if (!res.ok) throw new Error("Lỗi khi xuất bản thiệp!");

      setWedding((prev) => ({ ...prev, status: "PUBLISHED" }));
      setIsShareModalOpen(true);
    } catch (err: any) {
      setSaveError(err.message || "Lỗi xuất bản.");
    } finally {
      setIsPublishing(false);
    }
  };

  // Image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setWedding((prev) => ({
            ...prev,
            galleryImages: [
              ...(prev.galleryImages || []),
              {
                id: `upload-${Date.now()}-${i}`,
                url: data.url,
                caption: "",
                order: (prev.galleryImages?.length || 0) + i,
              },
            ],
          }));
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Add image by URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setWedding((prev) => ({
      ...prev,
      galleryImages: [
        ...(prev.galleryImages || []),
        {
          id: `url-${Date.now()}`,
          url: newImageUrl.trim(),
          caption: "",
          order: prev.galleryImages?.length || 0,
        },
      ],
    }));
    setNewImageUrl("");
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setWedding((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, idx) => idx !== index),
    }));
  };

  // Change Gallery layout
  const handleGalleryLayoutChange = (layout: GalleryLayout) => {
    const galleryBlock = wedding.blocks.find((b) => b.type === "gallery");
    if (galleryBlock) {
      updateBlockContent(galleryBlock.id, { layout });
    }
  };

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/w/${wedding.slug}`
      : `/w/${wedding.slug}`;

  const sortedBlocks = [...(wedding.blocks || [])].sort((a, b) => a.order - b.order);

  // Determine width & height of phone frame
  const getDeviceDimensions = () => {
    switch (phoneModel) {
      case "iphone-pro":
        return { width: "393px", height: "820px", label: "iPhone 15/16 Pro (393px)" };
      case "iphone-se":
        return { width: "375px", height: "720px", label: "iPhone SE / Nhỏ (375px)" };
      case "galaxy":
        return { width: "412px", height: "840px", label: "Samsung / Android (412px)" };
      case "tablet":
        return { width: "768px", height: "860px", label: "iPad / Tablet (768px)" };
      case "desktop":
      default:
        return { width: "100%", height: "100%", label: "Màn Hình Rộng" };
    }
  };

  const deviceDim = getDeviceDimensions();

  // RENDER TOOL PANEL CONTENT (Shared between Desktop sidebar & Mobile Drawer)
  const renderToolsContent = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* TAB 1: BLOCKS */}
      {activeTab === "blocks" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-xs text-neutral-400">
            <span>Kéo/đổi thứ tự & Bật tắt các khối</span>
            <span className="text-amber-400 font-semibold">{sortedBlocks.filter((b) => b.enabled).length} Đang bật</span>
          </div>

          {sortedBlocks.map((block, idx) => {
            const isExpanded = expandedBlockId === block.id;
            let parsedContent: any = {};
            try {
              parsedContent =
                typeof block.content === "string"
                  ? JSON.parse(block.content || "{}")
                  : block.content || {};
            } catch {
              parsedContent = {};
            }

            return (
              <div
                key={block.id}
                className={`rounded-xl border transition-all ${
                  block.enabled
                    ? "bg-neutral-900/90 border-neutral-700"
                    : "bg-neutral-900/40 border-neutral-800 opacity-60"
                }`}
              >
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleBlock(block.id)}
                      className={`p-1 rounded-md transition ${
                        block.enabled
                          ? "text-amber-400 hover:bg-neutral-800"
                          : "text-neutral-600 hover:text-neutral-400"
                      }`}
                      title={block.enabled ? "Tắt khối" : "Bật khối"}
                    >
                      {block.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <div>
                      <p className="text-xs font-bold text-white capitalize">
                        {block.title || block.type}
                      </p>
                      <span className="text-[10px] text-neutral-400 uppercase font-mono">
                        {block.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveBlockUp(idx)}
                      className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30"
                      title="Di chuyển lên"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sortedBlocks.length - 1}
                      onClick={() => moveBlockDown(idx)}
                      className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30"
                      title="Di chuyển xuống"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedBlockId(isExpanded ? null : block.id)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition"
                    >
                      {isExpanded ? "Đóng" : "Sửa"}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-3 border-t border-neutral-800 bg-neutral-950/60 space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-400 uppercase">Tiêu Đề Khối</label>
                      <input
                        type="text"
                        value={block.title || ""}
                        onChange={(e) => updateBlockMeta(block.id, "title", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-400 uppercase">Phụ Đề (Subtitle)</label>
                      <input
                        type="text"
                        value={block.subtitle || ""}
                        onChange={(e) => updateBlockMeta(block.id, "subtitle", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                      />
                    </div>

                    {block.type === "hero" && (
                      <div className="space-y-2 pt-2 border-t border-neutral-800">
                        <label className="text-[10px] text-neutral-400 uppercase">Trích Dẫn Lãng Mạn</label>
                        <input
                          type="text"
                          value={parsedContent.quote || ""}
                          onChange={(e) =>
                            updateBlockContent(block.id, { quote: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                        />
                      </div>
                    )}

                    {block.type === "thank_you" && (
                      <div className="space-y-2 pt-2 border-t border-neutral-800">
                        <label className="text-[10px] text-neutral-400 uppercase">Lời Cảm Ơn</label>
                        <textarea
                          rows={2}
                          value={parsedContent.message || ""}
                          onChange={(e) =>
                            updateBlockContent(block.id, { message: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: GALLERY */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300">Bố Cục Album Ảnh Trên Điện Thoại</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "polaroid-stack", label: "✨ Tập Polaroid (Vuốt rút bài)" },
                { id: "filmstrip", label: "🎞️ Cuộn Phim 35mm (Trôi tự động)" },
                { id: "story-reel", label: "📱 Story Reel (Chuẩn Instagram)" },
                { id: "masonry", label: "Masonry Nghệ Thuật" },
                { id: "grid-2", label: "Lưới 2 Cột" },
                { id: "grid-3", label: "Lưới 3 Cột" },
                { id: "featured", label: "Ảnh Lớn + Thumbnails" },
                { id: "carousel", label: "Vuốt Ngang (Mobile)" },
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => handleGalleryLayoutChange(l.id as GalleryLayout)}
                  className="p-2.5 text-xs text-left rounded-xl border border-neutral-700 hover:border-amber-400 bg-neutral-900 hover:bg-neutral-800 transition"
                >
                  <span className="font-semibold text-white block">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300">
                Danh Sách Ảnh ({wedding.galleryImages?.length || 0})
              </span>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition active:scale-95">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? "Đang tải..." : "Tải Ảnh Lên"}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Dán link ảnh online..."
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold"
              >
                Thêm
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {(wedding.galleryImages || []).map((img, idx) => (
              <div
                key={img.id || idx}
                className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800"
              >
                <img
                  src={img.url}
                  alt={`Ảnh ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md transition shadow"
                  title="Xóa ảnh"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-white font-mono">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: THEME */}
      {activeTab === "theme" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300">
              Chọn Phong Cách (5 Preset Themes)
            </label>
            <div className="space-y-2">
              {TEMPLATES.map((tpl) => {
                const t = tpl.defaultTheme;
                const isSelected = currentTheme.id === t.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleThemeChange(t)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? "border-amber-400 bg-neutral-900 ring-1 ring-amber-400"
                        : "border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{t.name}</p>
                      <p className="text-[10px] text-neutral-400">{tpl.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: t.accentColor }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: t.backgroundColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <label className="text-xs font-semibold text-neutral-300">Tùy Chỉnh Màu Sắc Nhanh</label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase block mb-1">Màu Điểm Nhấn (Accent)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.accentColor}
                    onChange={(e) =>
                      handleThemeChange({ ...currentTheme, accentColor: e.target.value })
                    }
                    className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono">{currentTheme.accentColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 uppercase block mb-1">Màu Nền (Background)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.backgroundColor}
                    onChange={(e) =>
                      handleThemeChange({ ...currentTheme, backgroundColor: e.target.value })
                    }
                    className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono">{currentTheme.backgroundColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === "settings" && (
        <div className="space-y-3 text-xs">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">Tên Chú Rể</label>
            <input
              type="text"
              value={wedding.groomName}
              onChange={(e) => handleInfoChange("groomName", e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">Tên Cô Dâu</label>
            <input
              type="text"
              value={wedding.brideName}
              onChange={(e) => handleInfoChange("brideName", e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">Ngày Cưới</label>
            <input
              type="date"
              value={
                wedding.weddingDate
                  ? new Date(wedding.weddingDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => handleInfoChange("weddingDate", new Date(e.target.value))}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">Địa Điểm Tiệc Cưới</label>
            <input
              type="text"
              value={wedding.venueName}
              onChange={(e) => handleInfoChange("venueName", e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">Địa Chỉ Cụ Thể</label>
            <textarea
              rows={2}
              value={wedding.venueAddress}
              onChange={(e) => handleInfoChange("venueAddress", e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">Nhạc Nền (Audio URL)</label>
            <input
              type="url"
              value={wedding.musicUrl || ""}
              onChange={(e) => handleInfoChange("musicUrl", e.target.value)}
              placeholder="https://...mp3"
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-black">
      {/* 1. TOP HEADER APP BAR */}
      <header className="h-14 border-b border-neutral-800 bg-neutral-900/95 px-3 sm:px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-neutral-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold truncate max-w-[120px] sm:max-w-[200px] text-white">
              {wedding.title}
            </h1>
            <span
              className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                wedding.status === "PUBLISHED"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  : "bg-amber-950 text-amber-400 border border-amber-800"
              }`}
            >
              {wedding.status === "PUBLISHED" ? "Live" : "Nháp"}
            </span>
          </div>
        </div>

        {/* Center: Phone Model Selector (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            type="button"
            onClick={() => setPhoneModel("iphone-pro")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              phoneModel === "iphone-pro"
                ? "bg-amber-500 text-black font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 15 Pro</span>
          </button>
          <button
            type="button"
            onClick={() => setPhoneModel("iphone-se")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              phoneModel === "iphone-se"
                ? "bg-amber-500 text-black font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone SE (375px)</span>
          </button>
          <button
            type="button"
            onClick={() => setPhoneModel("galaxy")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              phoneModel === "galaxy"
                ? "bg-amber-500 text-black font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android (412px)</span>
          </button>
          <button
            type="button"
            onClick={() => setPhoneModel("tablet")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              phoneModel === "tablet"
                ? "bg-amber-500 text-black font-bold shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls (desktop only) */}
          <div className="hidden xl:flex items-center gap-1 bg-neutral-950 px-2 py-1 rounded-xl border border-neutral-800 text-xs text-neutral-400">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(0.75, z - 0.1))}
              className="hover:text-white p-0.5"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] w-9 text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(1.2, z + 0.1))}
              className="hover:text-white p-0.5"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition border border-neutral-700 active:scale-95"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : saveSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{saveSuccess ? "Đã Lưu!" : "Lưu"}</span>
          </button>

          {/* Share & QR */}
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition border border-neutral-700 active:scale-95"
            title="Mã QR & Chia Sẻ"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Chia Sẻ & QR</span>
          </button>

          {/* Publish Button */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition shadow-sm active:scale-95"
          >
            {isPublishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Rocket className="w-3.5 h-3.5" />
            )}
            <span>Xuất Bản</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* DESKTOP LEFT TOOLS PANEL (Hidden on mobile) */}
        <aside className="hidden md:flex w-80 lg:w-96 bg-neutral-950 border-r border-neutral-800 flex-col shrink-0 overflow-hidden">
          {/* Tabs header */}
          <div className="flex border-b border-neutral-800 bg-neutral-900/60 p-1">
            <button
              onClick={() => setActiveTab("blocks")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === "blocks"
                  ? "bg-neutral-800 text-amber-400 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Khối</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === "gallery"
                  ? "bg-neutral-800 text-amber-400 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Album</span>
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === "theme"
                  ? "bg-neutral-800 text-amber-400 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === "settings"
                  ? "bg-neutral-800 text-amber-400 shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Cài Đặt</span>
            </button>
          </div>

          {renderToolsContent()}
        </aside>

        {/* RIGHT AREA: THE ULTRA-REALISTIC SMARTPHONE PREVIEW */}
        <main className="flex-1 bg-neutral-900/90 overflow-y-auto flex flex-col items-center justify-start p-2 sm:p-6 lg:p-8 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px]">
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

          {/* Desktop model badge */}
          <div className="hidden sm:flex items-center gap-2 mb-3 text-xs text-neutral-400 bg-neutral-950/80 px-4 py-1.5 rounded-full border border-neutral-800 shadow-sm backdrop-blur-md">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Mô phỏng điện thoại: <strong>{deviceDim.label}</strong></span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-500">Khách mời sẽ thấy chính xác như thế này</span>
          </div>

          {/* Realistic Phone Case Frame */}
          {phoneModel === "desktop" ? (
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-white">
              <WeddingEngine wedding={wedding} isEditorPreview={true} />
            </div>
          ) : (
            <div
              className="transition-all duration-300 ease-out origin-top flex flex-col items-center"
              style={{
                transform: `scale(${zoomScale})`,
              }}
            >
              {/* iPhone Titanium / Glass Chassis */}
              <div
                className="relative rounded-[48px] sm:rounded-[54px] border-[10px] sm:border-[12px] border-neutral-800/90 ring-1 ring-neutral-700/60 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] overflow-hidden bg-neutral-900 flex flex-col"
                style={{
                  width: deviceDim.width,
                  height: deviceDim.height,
                  maxHeight: "88vh",
                }}
              >
                {/* 1. Realistic Mobile Status Bar & Dynamic Island */}
                <div className="h-10 bg-black/90 text-white flex items-center justify-between px-6 shrink-0 select-none z-30 backdrop-blur-md">
                  <span className="text-xs font-semibold tracking-tight">09:41</span>

                  {/* Dynamic Island Pill */}
                  <div className="w-24 h-5 bg-black rounded-full border border-neutral-800 flex items-center justify-center gap-2 px-2 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 border border-neutral-800" />
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  </div>

                  <div className="flex items-center gap-1.5 opacity-80">
                    <Wifi className="w-3.5 h-3.5" />
                    <Battery className="w-4 h-4 fill-current" />
                  </div>
                </div>

                {/* 2. Scrollable Smartphone Screen Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white relative scrollbar-none">
                  <WeddingEngine wedding={wedding} isEditorPreview={true} />
                </div>

                {/* 3. iOS Home Indicator Bar at the bottom */}
                <div className="h-5 bg-neutral-950 flex items-center justify-center shrink-0 z-30">
                  <div className="w-28 h-1 bg-neutral-500/80 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. MOBILE FLOATING ACTION BAR & BOTTOM SHEET DRAWER (For editing directly on Phone) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-neutral-950/95 border-t border-neutral-800 p-2 backdrop-blur-md flex items-center justify-around">
        <button
          onClick={() => {
            setActiveTab("blocks");
            setIsMobileDrawerOpen(true);
          }}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-semibold transition ${
            isMobileDrawerOpen && activeTab === "blocks"
              ? "text-amber-400 bg-neutral-900"
              : "text-neutral-400"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Khối</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("gallery");
            setIsMobileDrawerOpen(true);
          }}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-semibold transition ${
            isMobileDrawerOpen && activeTab === "gallery"
              ? "text-amber-400 bg-neutral-900"
              : "text-neutral-400"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Album</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("theme");
            setIsMobileDrawerOpen(true);
          }}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-semibold transition ${
            isMobileDrawerOpen && activeTab === "theme"
              ? "text-amber-400 bg-neutral-900"
              : "text-neutral-400"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Theme</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("settings");
            setIsMobileDrawerOpen(true);
          }}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-semibold transition ${
            isMobileDrawerOpen && activeTab === "settings"
              ? "text-amber-400 bg-neutral-900"
              : "text-neutral-400"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Cài Đặt</span>
        </button>

        <button
          onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30"
        >
          <Sliders className="w-4 h-4" />
          <span>{isMobileDrawerOpen ? "Xem Thiệp" : "Chỉnh Sửa"}</span>
        </button>
      </div>

      {/* MOBILE BOTTOM SHEET DRAWER */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-h-[75vh] bg-neutral-950 border-t border-neutral-800 rounded-t-3xl flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Handle & Header */}
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-neutral-700 rounded-full mx-auto" />
                <span className="text-xs font-bold text-white capitalize">
                  Công Cụ: {activeTab === "blocks" ? "Khối (Blocks)" : activeTab === "gallery" ? "Album Ảnh" : activeTab === "theme" ? "Giao Diện Theme" : "Cài Đặt"}
                </span>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content inside drawer */}
            <div className="flex-1 overflow-y-auto pb-16">
              {renderToolsContent()}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={publicUrl}
        title={wedding.title}
        groomName={wedding.groomName}
        brideName={wedding.brideName}
      />
    </div>
  );
};
