import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weddinvit — Nền tảng Tạo Thiệp Cưới Online Thông Minh & Đẳng Cấp",
  description: "Tạo website thiệp cưới online sang trọng, chuẩn mobile-first trong 5 phút. Tích hợp album ảnh động, RSVP, đếm ngược, nhạc nền và chia sẻ Zalo/Facebook.",
  keywords: ["thiệp cưới online", "wedding invitation website", "thiệp cưới điện tử", "weddinvit", "rsvp online"],
  authors: [{ name: "Weddinvit Team" }],
  openGraph: {
    title: "Weddinvit — Nền tảng Tạo Thiệp Cưới Online Thông Minh & Đẳng Cấp",
    description: "Tạo website thiệp cưới online sang trọng, chuẩn mobile-first trong 5 phút.",
    type: "website",
    locale: "vi_VN",
    siteName: "Weddinvit",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#D4AF37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
