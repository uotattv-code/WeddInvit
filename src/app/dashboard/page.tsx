import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  ExternalLink,
  Edit,
  Heart,
  Users,
  MessageSquareHeart,
  Calendar,
  Sparkles,
  QrCode,
  Layers,
} from "lucide-react";

export const revalidate = 0; // Dynamic server rendering

export default async function DashboardPage() {
  const weddings = await prisma.wedding.findMany({
    include: {
      template: true,
      _count: {
        select: {
          rsvps: true,
          guestbooks: true,
          galleryImages: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalRsvps = await prisma.rsvp.count();
  const totalGuestbooks = await prisma.guestbookMessage.count();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-neutral-800 bg-neutral-950 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-bold text-lg shadow">
              W
            </span>
            <span className="font-bold tracking-tight text-white text-lg">
              Weddinvit
            </span>
          </Link>
          <span className="text-xs text-amber-400/90 font-medium px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-800/80">
            Studio Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/weddings/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs sm:text-sm rounded-xl hover:opacity-95 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Thiệp Mới</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Tổng Thiệp Cưới</span>
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-white">{weddings.length}</div>
            <p className="text-xs text-neutral-500">Đang hoạt động trên hệ thống</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Khách RSVP Xác Nhận</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">{totalRsvps}</div>
            <p className="text-xs text-neutral-500">Lượt phản hồi từ khách mời</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Sổ Lưu Bút Online</span>
              <MessageSquareHeart className="w-5 h-5 text-rose-400" />
            </div>
            <div className="text-3xl font-bold text-white">{totalGuestbooks}</div>
            <p className="text-xs text-neutral-500">Lời chúc mừng hạnh phúc</p>
          </div>
        </div>

        {/* Wedding List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Danh Sách Thiệp Cưới</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Quản lý, chỉnh sửa blocks, xem danh sách RSVP và sổ lưu bút
              </p>
            </div>
            <Link
              href="/dashboard/weddings/new"
              className="text-xs font-semibold text-amber-400 hover:underline"
            >
              + Thêm thiệp cưới
            </Link>
          </div>

          {weddings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <Heart className="w-12 h-12 mx-auto text-amber-500/50" />
              <h3 className="text-lg font-bold text-white">Bạn chưa tạo thiệp cưới nào</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Bắt đầu ngay bằng cách chọn một trong 5 template sang trọng và thiết kế website thiệp cưới của riêng bạn.
              </p>
              <Link
                href="/dashboard/weddings/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-bold text-sm rounded-xl hover:bg-amber-400 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Bắt Đầu Tạo Ngay</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weddings.map((item) => {
                const cover =
                  item.coverImage ||
                  item.template?.thumbnail ||
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80";

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-sm hover:border-neutral-700 transition flex flex-col justify-between group"
                  >
                    {/* Top thumbnail & status */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                      <img
                        src={cover}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <span
                        className={`absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-700"
                            : "bg-amber-950/80 text-amber-300 border-amber-700"
                        }`}
                      >
                        {item.status === "PUBLISHED" ? "Đã Xuất Bản" : "Bản Nháp"}
                      </span>

                      <span className="absolute top-3 right-3 text-[10px] bg-black/60 backdrop-blur-md text-neutral-300 px-2.5 py-1 rounded-full border border-white/10 font-mono">
                        {item.template?.name || "Custom"}
                      </span>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-base font-bold truncate">
                          {item.groomName} & {item.brideName}
                        </p>
                        <p className="text-xs text-neutral-300 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{formatDate(item.weddingDate, "short")}</span>
                        </p>
                      </div>
                    </div>

                    {/* Body Info & Stats */}
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 px-3 bg-neutral-900/70 rounded-xl border border-neutral-800/80">
                        <div>
                          <span className="text-[10px] text-neutral-400 block">RSVP</span>
                          <span className="font-bold text-white text-sm">
                            {item._count.rsvps}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Lời Chúc</span>
                          <span className="font-bold text-white text-sm">
                            {item._count.guestbooks}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Ảnh Album</span>
                          <span className="font-bold text-white text-sm">
                            {item._count.galleryImages}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                          URL: /w/{item.slug}
                        </span>
                        <p className="text-xs text-neutral-400 truncate">
                          {item.venueName || "Chưa có địa điểm"}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                        <Link
                          href={`/dashboard/weddings/${item.id}/edit`}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Chỉnh Sửa</span>
                        </Link>

                        <a
                          href={`/w/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition border border-neutral-700"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Xem Thiệp</span>
                        </a>
                      </div>

                      <div className="pt-1">
                        <Link
                          href={`/dashboard/weddings/${item.id}/rsvps`}
                          className="block text-center py-1.5 text-xs text-neutral-400 hover:text-amber-400 transition"
                        >
                          Quản lý RSVP & Sổ lưu bút ({item._count.rsvps}) →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
