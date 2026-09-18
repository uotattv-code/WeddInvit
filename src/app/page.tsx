import React from "react";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import {
  Heart,
  Sparkles,
  Smartphone,
  CheckCircle,
  Share2,
  Image as ImageIcon,
  Music,
  QrCode,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-black">
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-black font-bold text-lg shadow">
              W
            </span>
            <span className="font-bold tracking-tight text-white text-xl">
              Weddinvit
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#templates" className="hover:text-amber-400 transition">
              Bộ Sưu Tập Mẫu
            </a>
            <a href="#features" className="hover:text-amber-400 transition">
              Tính Năng
            </a>
            <a href="#pricing" className="hover:text-amber-400 transition">
              Bảng Giá
            </a>
            <a href="#faq" className="hover:text-amber-400 transition">
              Hỏi Đáp (FAQ)
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-3 py-2 text-neutral-300 hover:text-white transition"
            >
              Vào Studio
            </Link>
            <Link
              href="/dashboard/weddings/new"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs sm:text-sm rounded-xl hover:opacity-95 shadow transition"
            >
              Tạo Thiệp Ngay
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-900 border border-neutral-700/80 text-amber-400 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nền tảng thiệp cưới online thế hệ mới</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Thiệp Cưới Online —{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Đẹp, Riêng Biệt, Dễ Chia Sẻ
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Thiết kế website thiệp cưới sang trọng chuẩn mobile-first trong 5 phút. Tích hợp album ảnh động không giới hạn, RSVP xác nhận khách mời, đếm ngược và chia sẻ Zalo/QR Code tức thì.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard/weddings/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-sm sm:text-base rounded-2xl hover:opacity-95 shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>Chọn Mẫu & Tạo Thiệp</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm sm:text-base rounded-2xl border border-neutral-700 transition"
            >
              <span>Xem 5 Mẫu Demo Live</span>
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Mobile-First 100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>URL & QR Code Riêng</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>Quản Lý Khách RSVP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5 LUXURY TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 sm:px-6 bg-neutral-900/50 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
              BỘ SƯU TẬP CAO CẤP
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              5 Mẫu Thiệp Cưới Đẳng Cấp
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Được thiết kế tinh xảo bởi các UI/UX Designer hàng đầu, áp dụng cùng kiến trúc engine linh hoạt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((tpl) => {
              // Demo wedding slug mapping
              const demoSlugMap: Record<string, string> = {
                "elegant-ivory": "minh-anh",
                "burgundy-wedding": "nam-linh",
                "sage-minimal": "hung-mai",
                "editorial-magazine": "tuan-vy",
                "traditional-luxury": "hoang-thao",
              };
              const demoSlug = demoSlugMap[tpl.id] || "minh-anh";

              return (
                <div
                  key={tpl.id}
                  className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-lg hover:border-amber-400/50 transition duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                    <img
                      src={tpl.thumbnail}
                      alt={tpl.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 border border-amber-400/30">
                      {tpl.category}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg font-bold">{tpl.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                      {tpl.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {tpl.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-800 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800">
                      <a
                        href={`/w/${demoSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded-xl text-xs font-semibold text-center transition border border-neutral-700 flex items-center justify-center gap-1.5"
                      >
                        <span>Xem Demo Live</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>

                      <Link
                        href={`/dashboard/weddings/new?template=${tpl.id}`}
                        className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <span>Dùng Mẫu Này</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURES BREAKDOWN */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
              TRẢI NGHIỆM ĐỈNH CAO
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Tại Sao Hàng Ngàn Cặp Đôi Chọn Weddinvit?
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              Không chỉ là một tấm thiệp, đây là trang web kỷ niệm trọn vẹn tình yêu của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Mobile-First Tuyệt Đối</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hơn 95% khách mời mở thiệp trên smartphone. Weddinvit được tối ưu tỉ mỉ cho màn hình 375px - 414px, mượt mà không giật lag.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Album Ảnh Động Không Giới Hạn</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Tự do tải lên từ 5 ảnh đến 50+ ảnh. Tùy chọn 5 kiểu bố cục: Masonry, 2 Cột, 3 Cột, Featured và vuốt ngang Touch Carousel.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Xác Nhận RSVP & Xuất CSV</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Khách mời xác nhận số lượng tham dự trực tiếp vào hệ thống. Chủ thiệp dễ dàng thống kê và tải file Excel/CSV chuẩn bị cỗ bàn chu đáo.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Nhạc Nền Tự Động & Tinh Tế</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Trình phát nhạc nổi góc màn hình xử lý mượt mà chính sách Browser Autoplay. Khách mời có thể chủ động bật/tắt theo ý thích.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Mã QR Code & Chia Sẻ Zalo</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Tự động sinh mã QR độ nét cao để in lên thiệp giấy, tải file ảnh PNG và tích hợp nút chia sẻ Zalo, Facebook trong 1 chạm.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Canva Mini Cho Thiệp Cưới</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Giao diện kéo thả trực quan, live preview tức thì, chỉnh sửa font và màu sắc theo các nguyên lý thẩm mỹ chuẩn "khó làm xấu".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 bg-neutral-900/50 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
              BẢNG GIÁ MINH BẠCH
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Chi Phí Nhỏ Cho Ngày Trọng Đại
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Không phí ẩn. Sử dụng trọn đời, lưu giữ kỷ niệm tình yêu mãi mãi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Gói Tiết Kiệm (Basic)</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">49.000đ</span>
                  <span className="text-xs text-neutral-400">/ thiệp</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Dành cho cặp đôi cần một thiệp cưới online cơ bản và tiện lợi.
                </p>
                <ul className="space-y-2.5 text-xs text-neutral-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Kho 5 mẫu template chuẩn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Tối đa 10 ảnh album cưới</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Bộ đếm ngược thời gian</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Mã QR Code riêng</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard/weddings/new"
                className="w-full py-3 text-center bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-700 transition"
              >
                Bắt Đầu Tạo Thiệp
              </Link>
            </div>

            {/* Premium Package (Featured) */}
            <div className="relative p-8 rounded-2xl bg-neutral-950 border-2 border-amber-400 shadow-2xl flex flex-col justify-between space-y-6 scale-105">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black font-extrabold text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full shadow">
                ĐƯỢC CHỌN NHIỀU NHẤT
              </span>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Gói Cao Cấp (Premium)</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-amber-400">149.000đ</span>
                  <span className="text-xs text-neutral-400">/ thiệp</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Đầy đủ mọi tính năng tương tác thông minh cho ngày cưới hiện đại.
                </p>
                <ul className="space-y-2.5 text-xs text-neutral-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>Tất cả tính năng của gói Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>Album ảnh không giới hạn (50+ ảnh)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>Form RSVP xác nhận tham dự</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>Xuất danh sách khách ra CSV/Excel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>Sổ lưu bút online cho khách chúc mừng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span>Nhạc nền lãng mạn tùy chọn</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard/weddings/new"
                className="w-full py-3.5 text-center bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-xs rounded-xl hover:opacity-95 shadow-lg transition"
              >
                Tạo Thiệp Premium Ngay
              </Link>
            </div>

            {/* Luxury Package */}
            <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Gói Hoàng Gia (Luxury)</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">299.000đ</span>
                  <span className="text-xs text-neutral-400">/ thiệp</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Dành cho đám cưới đẳng cấp cần thiết kế riêng biệt và hỗ trợ 24/7.
                </p>
                <ul className="space-y-2.5 text-xs text-neutral-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Tất cả tính năng của gói Premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Tên miền riêng (ví dụ: minh-anh.vn)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Designer hỗ trợ tùy chỉnh CSS theo ý muốn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Hỗ trợ VIP 1-1 qua Zalo</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard/weddings/new"
                className="w-full py-3 text-center bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl border border-neutral-700 transition"
              >
                Liên Hệ Gói Luxury
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white">Câu Hỏi Thường Gặp</h2>
            <p className="text-xs text-neutral-400">Giải đáp mọi thắc mắc của bạn về nền tảng thiệp cưới Weddinvit</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Khách mời có cần tải app để mở thiệp không?",
                a: "Hoàn toàn không. Khách mời chỉ cần bấm vào đường link URL hoặc quét mã QR là thiệp sẽ mở trực tiếp trên trình duyệt điện thoại (Safari, Chrome, Zalo browser...) với trải nghiệm mượt mà nhất.",
              },
              {
                q: "Tôi có thể upload bao nhiêu bức ảnh cưới?",
                a: "Weddinvit không giới hạn số lượng ảnh! Bạn có thể tải lên từ vài tấm cho đến hơn 50 tấm ảnh cưới và chọn các kiểu bố cục hiển thị như Masonry nghệ thuật, Lưới ảnh hoặc vuốt ngang.",
              },
              {
                q: "Sau khi xuất bản tôi có thể chỉnh sửa nội dung được không?",
                a: "Có! Bạn có thể quay lại Studio Editor bất cứ lúc nào để sửa thông tin ngày giờ, địa điểm, thêm ảnh hoặc đổi nhạc nền. Mọi thay đổi sẽ cập nhật tức thì trên đường link thiệp cưới mà không cần gửi lại link mới.",
              },
              {
                q: "Làm sao để biết được những ai đã xác nhận tham dự tiệc?",
                a: "Bạn chỉ cần vào Dashboard quản lý thiệp, mục 'Danh Sách RSVP' sẽ hiển thị đầy đủ họ tên khách mời, số điện thoại, số người đi cùng và lời nhắn. Bạn có thể bấm nút 'Xuất Danh Sách CSV' để tải về bảng tính Excel.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed pl-5 font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER CTA */}
      <footer className="py-16 px-4 sm:px-6 bg-neutral-950 border-t border-neutral-800 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Heart className="w-8 h-8 mx-auto text-amber-400 fill-current animate-pulse-subtle" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sẵn Sàng Tạo Thiệp Cưới Trong Mơ?
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Bắt đầu miễn phí ngay hôm nay. Chỉ mất chưa đầy 5 phút để sở hữu một trang web thiệp cưới lộng lẫy và riêng biệt.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/weddings/new"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-sm rounded-2xl hover:opacity-95 shadow-xl transition"
            >
              <span>Tạo Thiệp Cưới Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-12 text-xs text-neutral-600 border-t border-neutral-900 max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Weddinvit SaaS Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-neutral-400 transition">Dashboard</Link>
            <a href="#templates" className="hover:text-neutral-400 transition">Mẫu Thiệp</a>
            <a href="#pricing" className="hover:text-neutral-400 transition">Bảng Giá</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
