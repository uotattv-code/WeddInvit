"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import {
  Users,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  EyeOff,
  Trash2,
  MessageSquareHeart,
  Search,
} from "lucide-react";

interface RsvpsManagerClientProps {
  wedding: any;
}

export const RsvpsManagerClient: React.FC<RsvpsManagerClientProps> = ({ wedding }) => {
  const [activeTab, setActiveTab] = useState<"rsvp" | "guestbook">("rsvp");
  const [rsvps, setRsvps] = useState<any[]>(wedding.rsvps || []);
  const [guestbooks, setGuestbooks] = useState<any[]>(wedding.guestbooks || []);
  const [searchTerm, setSearchTerm] = useState("");

  // Metrics
  const totalGuests = rsvps.reduce((acc, curr) => acc + (curr.isAttending ? curr.guestCount : 0), 0);
  const attendingCount = rsvps.filter((r) => r.isAttending).length;
  const notAttendingCount = rsvps.filter((r) => !r.isAttending).length;

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter(
    (r) =>
      r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.phone && r.phone.includes(searchTerm))
  );

  // CSV Export Handler
  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      alert("Chưa có dữ liệu khách mời để xuất file CSV!");
      return;
    }

    const headers = ["STT", "Họ và Tên", "Số Điện Thoại", "Số Người", "Trạng Thái", "Khách Nhà", "Lời Nhắn", "Thời Gian"];
    const rows = rsvps.map((r, i) => [
      i + 1,
      `"${r.guestName.replace(/"/g, '""')}"`,
      `"${r.phone || ""}"`,
      r.guestCount,
      r.isAttending ? "Tham dự" : "Không tham dự",
      r.side === "GROOM" ? "Nhà Trai" : r.side === "BRIDE" ? "Nhà Gái" : "Bạn Chung",
      `"${(r.message || "").replace(/"/g, '""')}"`,
      `"${formatDate(r.createdAt, "short")}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `DanhSachKhachMoi-${wedding.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle Guestbook visibility
  const toggleVisibility = async (id: string, current: boolean) => {
    try {
      const res = await fetch("/api/guestbook", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isVisible: !current }),
      });
      if (res.ok) {
        setGuestbooks(
          guestbooks.map((g) => (g.id === id ? { ...g, isVisible: !current } : g))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Guestbook message
  const handleDeleteGuestbook = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa lời chúc này?")) return;
    try {
      const res = await fetch(`/api/guestbook?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGuestbooks(guestbooks.filter((g) => g.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Tổng Phản Hồi</span>
          <p className="text-2xl font-bold text-white">{rsvps.length}</p>
          <span className="text-[10px] text-neutral-500">Lượt gửi RSVP</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Xác Nhận Đến</span>
          <p className="text-2xl font-bold text-emerald-400">{attendingCount}</p>
          <span className="text-[10px] text-neutral-500">Người đại diện</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Tổng Khách Dự</span>
          <p className="text-2xl font-bold text-amber-400">{totalGuests}</p>
          <span className="text-[10px] text-neutral-500">Bao gồm người đi cùng</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-rose-400 font-semibold">Không Tham Dự</span>
          <p className="text-2xl font-bold text-rose-400">{notAttendingCount}</p>
          <span className="text-[10px] text-neutral-500">Gửi lời chúc mừng</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("rsvp")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "rsvp"
                ? "bg-amber-500 text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh Sách RSVP ({rsvps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("guestbook")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "guestbook"
                ? "bg-amber-500 text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white"
            }`}
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Sổ Lưu Bút ({guestbooks.length})</span>
          </button>
        </div>

        {activeTab === "rsvp" && (
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition border border-neutral-700"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Xuất Danh Sách CSV</span>
          </button>
        )}
      </div>

      {/* TAB 1: RSVP TABLE */}
      {activeTab === "rsvp" && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc số điện thoại..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-semibold text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="p-3.5">Khách Mời</th>
                    <th className="p-3.5">Số ĐT</th>
                    <th className="p-3.5">Số Khách</th>
                    <th className="p-3.5">Trạng Thái</th>
                    <th className="p-3.5">Khách Nhà</th>
                    <th className="p-3.5">Lời Nhắn</th>
                    <th className="p-3.5">Thời Gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredRsvps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-500">
                        Chưa có khách mời nào phản hồi.
                      </td>
                    </tr>
                  ) : (
                    filteredRsvps.map((r, idx) => (
                      <tr key={r.id || idx} className="hover:bg-neutral-900/40 transition">
                        <td className="p-3.5 font-bold text-white">{r.guestName}</td>
                        <td className="p-3.5 font-mono text-neutral-400">{r.phone || "—"}</td>
                        <td className="p-3.5 font-semibold text-white">{r.guestCount} người</td>
                        <td className="p-3.5">
                          {r.isAttending ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                              <CheckCircle className="w-3 h-3" />
                              <span>Tham dự</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                              <XCircle className="w-3 h-3" />
                              <span>Không tham dự</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded-md border border-neutral-800">
                            {r.side === "GROOM" ? "Nhà Trai" : r.side === "BRIDE" ? "Nhà Gái" : "Bạn Chung"}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-neutral-300" title={r.message}>
                          {r.message || "—"}
                        </td>
                        <td className="p-3.5 text-neutral-500 text-[10px]">
                          {formatDate(r.createdAt, "short")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GUESTBOOK MODERATION */}
      {activeTab === "guestbook" && (
        <div className="space-y-3">
          <p className="text-xs text-neutral-400">
            Bạn có thể ẩn các lời chúc không phù hợp hoặc xóa vĩnh viễn khỏi website thiệp cưới.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {guestbooks.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-neutral-500 rounded-2xl bg-neutral-950 border border-neutral-800">
                Chưa có lời chúc nào trong sổ lưu bút.
              </div>
            ) : (
              guestbooks.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border transition space-y-2 ${
                    msg.isVisible
                      ? "bg-neutral-950 border-neutral-800"
                      : "bg-neutral-950/40 border-neutral-900 opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{msg.name}</h4>
                      <span className="text-[10px] text-neutral-500">
                        {formatDate(msg.createdAt, "short")}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(msg.id, msg.isVisible)}
                        className={`p-1.5 rounded-lg text-xs transition ${
                          msg.isVisible
                            ? "bg-neutral-800 text-neutral-300 hover:text-white"
                            : "bg-amber-950 text-amber-400 border border-amber-800"
                        }`}
                        title={msg.isVisible ? "Ẩn lời chúc này" : "Hiện lời chúc"}
                      >
                        {msg.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGuestbook(msg.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition"
                        title="Xóa lời chúc"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    "{msg.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
