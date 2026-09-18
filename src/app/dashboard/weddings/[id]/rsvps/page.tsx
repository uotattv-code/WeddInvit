import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Users, MessageSquareHeart, CheckCircle, XCircle } from "lucide-react";
import { RsvpsManagerClient } from "./RsvpsManagerClient";

interface PageProps {
  params: {
    id: string;
  };
}

export const revalidate = 0;

export default async function WeddingRsvpsPage({ params }: PageProps) {
  const wedding = await prisma.wedding.findUnique({
    where: { id: params.id },
    include: {
      rsvps: {
        orderBy: { createdAt: "desc" },
      },
      guestbooks: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!wedding) notFound();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách thiệp</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Khách Mời & Lời Chúc: {wedding.groomName} & {wedding.brideName}
            </h1>
            <p className="text-xs text-neutral-400">
              Quản lý phản hồi tham dự (RSVP), xuất danh sách khách mời ra file CSV và kiểm duyệt sổ lưu bút
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/weddings/${wedding.id}/edit`}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition border border-neutral-700"
            >
              Vào Studio Editor
            </Link>
            <a
              href={`/w/${wedding.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition"
            >
              Mở Thiệp Live
            </a>
          </div>
        </div>

        {/* Client Manager Component */}
        <RsvpsManagerClient wedding={wedding} />
      </div>
    </div>
  );
}
