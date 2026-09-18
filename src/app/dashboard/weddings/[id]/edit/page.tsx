import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StudioEditor } from "@/components/editor/StudioEditor";
import { WeddingFullData } from "@/lib/types";

interface PageProps {
  params: {
    id: string;
  };
}

export const revalidate = 0; // Dynamic server rendering

export default async function EditWeddingPage({ params }: PageProps) {
  const wedding = await prisma.wedding.findUnique({
    where: { id: params.id },
    include: {
      template: true,
      blocks: {
        orderBy: { order: "asc" },
      },
      events: {
        orderBy: { order: "asc" },
      },
      galleryImages: {
        orderBy: { order: "asc" },
      },
      rsvps: true,
      guestbooks: true,
    },
  });

  if (!wedding) {
    notFound();
  }

  return <StudioEditor initialWedding={wedding as unknown as WeddingFullData} />;
}
