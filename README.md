# Weddinvit — Nền Tảng Tạo & Kinh Doanh Thiệp Cưới Online (SaaS MVP)

**Weddinvit** là nền tảng tạo và quản lý thiệp cưới online cao cấp, chuẩn **Mobile-First**, sở hữu tư duy "Canva mini dành riêng cho thiệp cưới". Khách hàng dễ dàng lựa chọn trong kho 5 mẫu template sang trọng, nhập thông tin đôi uyên ương, tải album ảnh động không giới hạn, tinh chỉnh màu sắc, phông chữ và xem trước thời gian thực (Live Preview) trên các kích thước màn hình smartphone trước khi xuất bản thành một website thiệp cưới có URL và mã QR riêng biệt.

---

## 🌟 Tính Năng Nổi Bật

1. **Kiến Trúc Template Engine Động (Data-Driven Architecture)**:
   - Không hardcode mã nguồn cho từng khách hàng.
   - Bố cục: `Template + Wedding Data + Blocks + Layout Configuration` $\rightarrow$ Render thành Website Thiệp cưới duy nhất (`/w/[slug]`).
2. **5 Mẫu Template Luxury**:
   - **Elegant Ivory**: Tone kem ngà, chữ serif quý phái, viền chỉ vàng kim, lãng mạn châu Âu.
   - **Burgundy Grandeur**: Sắc đỏ burgundy nồng nàn, chi tiết hoàng gia, tiệc tối sang trọng.
   - **Sage Minimalist**: Sắc xanh xô thơm botanical dịu nhẹ, thanh khiết, tối giản hiện đại.
   - **Editorial Vogue**: Bìa tạp chí thời trang cao cấp, typography ngoại cỡ, full-bleed nghệ thuật.
   - **Traditional Luxury**: Nét đẹp cưới truyền thống Việt Nam hiện đại hóa: đỏ son may mắn, song hỷ, gia tiên và hai họ.
3. **Studio Block Editor (Canva Mini)**:
   - Thêm/xóa, bật/tắt và di chuyển thứ tự (reorder) các khối.
   - Live Preview thời gian thực không cần reload trang.
   - Chuyển đổi khung giả lập kích thước điện thoại: **Mobile 375px**, **Mobile lớn 414px**, **Tablet 768px**, **Desktop**.
4. **Album Ảnh Động Không Giới Hạn**:
   - Hỗ trợ số lượng ảnh linh hoạt (từ 5 đến 50+ ảnh).
   - 5 kiểu bố cục: **Masonry nghệ thuật**, **Lưới 2 cột**, **Lưới 3 cột**, **Ảnh lớn nổi bật (Featured)**, **Vuốt ngang cảm ứng (Touch Carousel)**.
   - Lightbox phóng to ảnh, xem ảnh nét cao.
5. **Tính Năng Tương Tác Cưới Toàn Diện**:
   - **Đếm ngược thời gian thực**: Tự động hiển thị lời cảm ơn sau ngày cưới.
   - **Floating Music Player**: Trình phát nhạc nền thông minh, tôn trọng Browser Autoplay Policy, nút "🎵 Bật nhạc" trên mobile.
   - **Form RSVP Trực Tiếp**: Lưu vào database, thống kê khách tham dự, nút xuất file CSV cho gia đình.
   - **Sổ Lưu Bút Online**: Khách gửi lời chúc tức thì, chủ thiệp có quyền ẩn/hiện/xóa lời chúc.
   - **Chỉ Đường Bản Đồ**: Tích hợp Google Maps và nút sao chép địa chỉ 1 chạm.
   - **Mã QR Code & Chia Sẻ**: Tự động sinh mã QR, nút tải ảnh PNG chất lượng cao, chia sẻ qua Zalo, Facebook, Web Share API.
   - **Dynamic SEO OpenGraph**: Hiển thị ảnh bìa và tên cô dâu chú rể khi chia sẻ link lên Zalo, Messenger, Facebook.

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: Next.js 14 (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS, CSS Variables, Google Fonts
- **Icon Set**: `lucide-react`
- **Database & ORM**: Prisma ORM
  - *Môi trường Local*: SQLite zero-config (`file:./dev.db`), chạy ngay lập tức không cần cài database server.
  - *Môi trường Production*: Sẵn sàng trỏ sang PostgreSQL (Supabase / Neon / Railway).
- **Mã QR**: `qrcode`
- **Lưu trữ ảnh**: Thư mục `/public/uploads` local hoặc dễ dàng tích hợp Cloudflare R2 / AWS S3.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Local

### 1. Yêu cầu hệ thống
- Node.js version 18.x trở lên
- npm version 9.x trở lên

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```
Nội dung file `.env` mặc định cho môi trường local:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="weddinvit-secret-key-super-secure-production-ready"
```

### 4. Đồng bộ Database & Nạp Dữ Liệu Mẫu (Seed)
Chạy lệnh push schema vào SQLite:
```bash
npx prisma db push
```
Chạy lệnh nạp sẵn 5 mẫu template và 5 website thiệp cưới demo hoàn chỉnh:
```bash
npm run prisma:seed
```

### 5. Chạy ứng dụng ở môi trường phát triển
```bash
npm run dev
```
Mở trình duyệt truy cập:
- **Landing Page thương mại**: [http://localhost:3000](http://localhost:3000)
- **Studio Dashboard quản lý thiệp**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **5 Đám cưới Demo Live**:
  - [http://localhost:3000/w/minh-anh](http://localhost:3000/w/minh-anh) (Elegant Ivory)
  - [http://localhost:3000/w/nam-linh](http://localhost:3000/w/nam-linh) (Burgundy Grandeur)
  - [http://localhost:3000/w/hung-mai](http://localhost:3000/w/hung-mai) (Sage Minimalist)
  - [http://localhost:3000/w/tuan-vy](http://localhost:3000/w/tuan-vy) (Editorial Vogue)
  - [http://localhost:3000/w/hoang-thao](http://localhost:3000/w/hoang-thao) (Traditional Vietnamese Luxury)

---

## 📦 Build & Deploy Production

### 1. Build Production
Kiểm tra và biên dịch mã nguồn:
```bash
npm run build
npm run start
```

### 2. Chuyển đổi sang PostgreSQL (Production Deployment)
Khi đưa lên production (Vercel, Railway, Supabase):
1. Trong file `prisma/schema.prisma`, đổi `provider = "sqlite"` thành `provider = "postgresql"`.
2. Trong biến môi trường Production trên Vercel / Railway, cấu hình:
   ```env
   DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres?sslmode=require"
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```
3. Chạy `npx prisma db push` và `npm run prisma:seed` trên server production.
4. Deploy lên **Vercel** chỉ bằng 1 click hoặc lệnh `vercel deploy`.

---

## 📂 Cấu Trúc Thư Mục Chính

```
Weddinvit/
├── prisma/
│   ├── schema.prisma              # Database schema với các model User, Wedding, Block, Gallery, RSVP, Guestbook
│   └── seed.ts                    # Script nạp 5 template và 5 đám cưới mẫu thực tế
├── public/
│   └── uploads/                   # Thư mục lưu trữ ảnh người dùng tải lên
├── src/
│   ├── app/
│   │   ├── page.tsx               # Landing page thương mại giới thiệu sản phẩm, bảng giá & FAQ
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Quản lý danh sách thiệp cưới & số liệu thống kê
│   │   │   ├── weddings/new/      # Trình tạo thiệp cưới nhanh (chọn 1 trong 5 template)
│   │   │   └── weddings/[id]/
│   │   │       ├── edit/          # Canva-like Studio Block Editor (Live Preview 375px/414px/768px/Desktop)
│   │   │       └── rsvps/         # Quản lý danh sách RSVP, xuất file CSV & kiểm duyệt sổ lưu bút
│   │   ├── w/[slug]/              # Public Wedding Website Route với Dynamic SEO OpenGraph
│   │   └── api/                   # Hệ thống RESTful API cho weddings, rsvp, guestbook, upload ảnh
│   ├── components/
│   │   ├── editor/                # Studio Editor panels (Khối, Album ảnh, Theme, Font, Cài đặt)
│   │   ├── engine/                # Master WeddingEngine & các Block (Hero, Couple, Story, Events, Map, RSVP, v.v.)
│   │   ├── gallery/               # GalleryRenderer đa layout (Masonry, 2-cột, 3-cột, Featured, Carousel)
│   │   └── common/                # Trình phát nhạc nền, Modal chia sẻ & Mã QR Code SVG/PNG
│   └── lib/
│       ├── prisma.ts              # Prisma client singleton
│       ├── templates.ts           # Cấu hình 5 mẫu template luxury & default blocks
│       ├── types.ts               # Định nghĩa TypeScript toàn diện
│       └── utils.ts               # Các hàm tiện ích format ngày, slugify, cn
```

---

## 💍 Giấy Phép & Bản Quyền
Dự án được phát triển theo giấy phép MIT. Phù hợp thương mại hóa và mở rộng thành hệ thống SaaS thiệp cưới trực tuyến quy mô lớn.
