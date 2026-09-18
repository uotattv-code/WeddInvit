-- ==========================================
-- WEDDINVIT SUPABASE DATABASE FULL INITIALIZATION
-- ==========================================

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
    "password" TEXT NOT NULL DEFAULT 'demo123',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "defaultTheme" TEXT NOT NULL,
    "defaultBlocks" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Wedding" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "groomName" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "groomShortName" TEXT,
    "brideShortName" TEXT,
    "weddingDate" TIMESTAMP(3) NOT NULL,
    "weddingTime" TEXT,
    "venueName" TEXT NOT NULL,
    "venueAddress" TEXT NOT NULL,
    "mapUrl" TEXT,
    "coverImage" TEXT,
    "musicUrl" TEXT,
    "musicTitle" TEXT,
    "isMusicAutoPlay" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "themeConfig" TEXT NOT NULL,
    "customCss" TEXT,
    "templateId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "WeddingBlock" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT,
    "subtitle" TEXT,
    "content" TEXT NOT NULL,
    "layout" TEXT NOT NULL DEFAULT 'default',
    "style" TEXT,

    CONSTRAINT "WeddingBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "WeddingEvent" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WeddingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "GalleryImage" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isCover" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Rsvp" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "phone" TEXT,
    "guestCount" INTEGER NOT NULL DEFAULT 1,
    "isAttending" BOOLEAN NOT NULL DEFAULT true,
    "side" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rsvp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "GuestbookMessage" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestbookMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Template_slug_key" ON "Template"("slug");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Wedding_slug_key" ON "Wedding"("slug");

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeddingBlock" ADD CONSTRAINT "WeddingBlock_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeddingEvent" ADD CONSTRAINT "WeddingEvent_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rsvp" ADD CONSTRAINT "Rsvp_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestbookMessage" ADD CONSTRAINT "GuestbookMessage_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;



-- 1. SEED USERS
INSERT INTO "User" ("id", "email", "name", "role", "password", "updatedAt")
VALUES 
  ('user-admin-1', 'admin@weddinvit.com', 'Weddinvit Administrator', 'ADMIN', 'admin_secure_password_123', NOW()),
  ('user-demo-1', 'demo@weddinvit.com', 'Nguyễn Minh', 'CUSTOMER', 'demo_password_123', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 2. SEED TEMPLATES
INSERT INTO "Template" ("id", "name", "slug", "thumbnail", "description", "category", "defaultTheme", "defaultBlocks")
VALUES ('elegant-ivory', 'Elegant Ivory', 'elegant-ivory', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', 'Nền kem ngà thanh lịch, typography serif quý phái, viền chỉ vàng kim tinh tế, phong cách quý tộc vượt thời gian.', 'luxury', '{"id":"theme-ivory","name":"Ivory & Gold","primaryColor":"#2A2826","secondaryColor":"#7A7369","accentColor":"#C5A059","backgroundColor":"#FDFBF7","cardBackgroundColor":"#FFFFFF","textColor":"#2D2A26","mutedTextColor":"#827B73","borderColor":"#EADDC8","fontHeading":"''Playfair Display'', serif","fontBody":"''Inter'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"md","cardStyle":"bordered"}', '[{"type":"hero","order":1,"enabled":true,"title":"Save Our Date","subtitle":"Chúng mình sắp về chung một nhà","layout":"centered","content":{"badge":"THE WEDDING CELEBRATION","quote":"Tình yêu là khi hai trái tim tìm thấy cùng một nhịp đập.","overlayOpacity":35}},{"type":"couple","order":2,"enabled":true,"title":"Cô Dâu & Chú Rể","subtitle":"Hai nửa yêu thương","layout":"cards","content":{}},{"type":"countdown","order":3,"enabled":true,"title":"Đếm Ngược Ngày Chung Đôi","subtitle":"Chỉ còn một chút thời gian nữa thôi","layout":"flip","content":{"postWeddingMessage":"Cảm ơn bạn đã cùng chia sẻ khoảnh khắc tuyệt vời nhất cuộc đời chúng mình!"}},{"type":"story","order":4,"enabled":true,"title":"Câu Chuyện Tình Yêu","subtitle":"Hành trình từ người xa lạ đến bạn đời","layout":"timeline","content":{"stories":[{"id":"s1","year":"2021","title":"Lần Đầu Gặp Gỡ","description":"Một chiều thu Hà Nội dưới tán cây Hoàng Diệu, vô tình nhìn thấy ánh mắt ấy và biết rằng định mệnh đã an bài.","image":"https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80"},{"id":"s2","year":"2023","title":"Lời Cầu Hôn Trong Mơ","description":"Giữa bãi biển hoàng hôn Phú Quốc, chiếc nhẫn được trao đi cùng lời hứa bên nhau trọn đời.","image":"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"}]}},{"type":"events","order":5,"enabled":true,"title":"Sự Kiện Cưới","subtitle":"Thời gian & địa điểm diễn ra các nghi lễ","layout":"cards","content":{}},{"type":"gallery","order":6,"enabled":true,"title":"Khoảnh Khắc Hạnh Phúc","subtitle":"Kỷ niệm trước ngày trọng đại","layout":"masonry","content":{"layout":"masonry"}},{"type":"map","order":7,"enabled":true,"title":"Địa Điểm Tiệc Cưới","subtitle":"Rất hân hạnh được đón tiếp quý khách","layout":"card","content":{}},{"type":"rsvp","order":8,"enabled":true,"title":"Xác Nhận Tham Dự (RSVP)","subtitle":"Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng mình","layout":"standard","content":{"deadline":"Vui lòng xác nhận trước 5 ngày diễn ra tiệc","enableGuestCount":true,"enableSideChoice":true}},{"type":"guestbook","order":9,"enabled":true,"title":"Sổ Lưu Bút Chúc Mừng","subtitle":"Hãy để lại những lời chúc thân thương nhất","layout":"wall","content":{"placeholder":"Gửi lời chúc hạnh phúc đến cô dâu & chú rể..."}},{"type":"thank_you","order":10,"enabled":true,"title":"Trân Trọng Cảm Ơn","subtitle":"Thank You","layout":"centered","content":{"message":"Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá nhất đối với chúng mình trong ngày trọng đại này."}}]')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name", "defaultTheme" = EXCLUDED."defaultTheme", "defaultBlocks" = EXCLUDED."defaultBlocks";

INSERT INTO "Template" ("id", "name", "slug", "thumbnail", "description", "category", "defaultTheme", "defaultBlocks")
VALUES ('burgundy-wedding', 'Burgundy Grandeur', 'burgundy-wedding', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', 'Sắc đỏ burgundy nồng nàn quý phái kết hợp cùng điểm nhấn vàng kim hoàng gia, ánh nến lung linh và huyền ảo.', 'luxury', '{"id":"theme-burgundy","name":"Burgundy & Gold Royal","primaryColor":"#E5C158","secondaryColor":"#C99A45","accentColor":"#E5C158","backgroundColor":"#2C0B12","cardBackgroundColor":"#3E121C","textColor":"#F9F3EA","mutedTextColor":"#D6B8BE","borderColor":"#681F2F","fontHeading":"''Cinzel'', serif","fontBody":"''Montserrat'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"sm","cardStyle":"bordered"}', '[{"type":"hero","order":1,"enabled":true,"title":"Royal Wedding","subtitle":"Lễ Thành Hôn Trọng Đại","layout":"editorial","content":{"badge":"CORONATION OF LOVE","quote":"Tình yêu là điều kỳ diệu nhất mà vũ trụ ban tặng.","overlayOpacity":45}},{"type":"couple","order":2,"enabled":true,"title":"Groom & Bride","subtitle":"Cặp Đôi Hoàng Gia","layout":"cards","content":{}},{"type":"countdown","order":3,"enabled":true,"title":"Thời Khắc Linh Thiêng","subtitle":"Đếm ngược đến giờ lành","layout":"boxes","content":{}},{"type":"story","order":4,"enabled":true,"title":"Chương Tình Yêu","subtitle":"Từng cột mốc son sắt","layout":"timeline","content":{"stories":[]}},{"type":"events","order":5,"enabled":true,"title":"Nghi Lễ & Dạ Tiệc","subtitle":"Trân trọng kính mời quý khách","layout":"cards","content":{}},{"type":"gallery","order":6,"enabled":true,"title":"Album Cưới Hoàng Gia","subtitle":"Vẻ đẹp vượt thời gian","layout":"grid-3","content":{"layout":"grid-3"}},{"type":"map","order":7,"enabled":true,"title":"Cung Điện Tiệc Cưới","subtitle":"Grand Ballroom","layout":"card","content":{}},{"type":"rsvp","order":8,"enabled":true,"title":"Phản Hồi Tham Dự (RSVP)","subtitle":"Xin vui lòng xác nhận để chúng mình chu đáo đón tiếp","layout":"standard","content":{}},{"type":"guestbook","order":9,"enabled":true,"title":"Lời Chúc Phúc Kim Cương","subtitle":"Ghi dấu kỷ niệm đáng nhớ","layout":"wall","content":{}},{"type":"thank_you","order":10,"enabled":true,"title":"Tri Ân Quý Khách","subtitle":"With Deepest Gratitude","layout":"centered","content":{"message":"Kính chúc quý khách và gia đình luôn dồi dào sức khỏe, may mắn và ngập tràn hạnh phúc!"}}]')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name", "defaultTheme" = EXCLUDED."defaultTheme", "defaultBlocks" = EXCLUDED."defaultBlocks";

INSERT INTO "Template" ("id", "name", "slug", "thumbnail", "description", "category", "defaultTheme", "defaultBlocks")
VALUES ('sage-minimal', 'Sage Minimalist', 'sage-minimal', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', 'Sắc xanh xô thơm tự nhiên, nền trắng kem tinh khiết, phong cách tối giản thanh khiết cho đám cưới ngoài trời.', 'minimal', '{"id":"theme-sage","name":"Sage Green & Warm Cream","primaryColor":"#4B5E4F","secondaryColor":"#758A79","accentColor":"#67826E","backgroundColor":"#F7F9F7","cardBackgroundColor":"#FFFFFF","textColor":"#2B352E","mutedTextColor":"#6B7C6E","borderColor":"#DCE5DC","fontHeading":"''Cormorant Garamond'', serif","fontBody":"''Plus Jakarta Sans'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"lg","cardStyle":"clean"}', '[{"type":"hero","order":1,"enabled":true,"title":"Tình Yêu Thuần Khiết","subtitle":"Ngày chúng ta chung một mái nhà","layout":"centered","content":{"badge":"WE ARE GETTING MARRIED","quote":"Hạnh phúc đơn giản là cùng nhau già đi.","overlayOpacity":25}},{"type":"couple","order":2,"enabled":true,"title":"Nhân Vật Chính","subtitle":"Minh & Linh","layout":"clean","content":{}},{"type":"countdown","order":3,"enabled":true,"title":"Thời Gian Chờ Đợi","subtitle":"Mỗi giây trôi qua đều là niềm mong đợi","layout":"minimal","content":{}},{"type":"story","order":4,"enabled":true,"title":"Từng Bước Đi Cùng Nhau","subtitle":"Chuyện tình xanh mát như tán lá","layout":"timeline","content":{"stories":[]}},{"type":"events","order":5,"enabled":true,"title":"Chương Trình Tiệc","subtitle":"Những khoảnh khắc không thể bỏ lỡ","layout":"clean","content":{}},{"type":"gallery","order":6,"enabled":true,"title":"Bộ Ảnh Kỷ Niệm (Polaroid)","subtitle":"Chạm vào ảnh để rút xem từng tấm","layout":"polaroid-stack","content":{"layout":"polaroid-stack"}},{"type":"map","order":7,"enabled":true,"title":"Chỉ Dẫn Đường Đi","subtitle":"Khu vườn ngoài trời xanh mát","layout":"clean","content":{}},{"type":"rsvp","order":8,"enabled":true,"title":"Gửi Phản Hồi","subtitle":"Bạn sẽ đến chung vui cùng chúng mình chứ?","layout":"clean","content":{}},{"type":"guestbook","order":9,"enabled":true,"title":"Góc Nhỏ Lưu Bút","subtitle":"Lời chúc từ những người bạn thân thương","layout":"clean","content":{}},{"type":"thank_you","order":10,"enabled":true,"title":"Lời Cảm Ơn Chân Thành","subtitle":"With Love","layout":"centered","content":{"message":"Cảm ơn vì đã luôn yêu thương, đồng hành và là một phần không thể thiếu trong câu chuyện của chúng mình."}}]')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name", "defaultTheme" = EXCLUDED."defaultTheme", "defaultBlocks" = EXCLUDED."defaultBlocks";

INSERT INTO "Template" ("id", "name", "slug", "thumbnail", "description", "category", "defaultTheme", "defaultBlocks")
VALUES ('editorial-magazine', 'Editorial Vogue', 'editorial-magazine', 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80', 'Phong cách bìa tạp chí thời trang cao cấp, typography serif ngoại cỡ sắc nét, bố cục nghệ thuật phá cách.', 'editorial', '{"id":"theme-editorial","name":"Monochrome & High Editorial","primaryColor":"#0D0D0D","secondaryColor":"#404040","accentColor":"#A38655","backgroundColor":"#F4F3EF","cardBackgroundColor":"#FFFFFF","textColor":"#171717","mutedTextColor":"#737373","borderColor":"#E5E4DE","fontHeading":"''Playfair Display'', serif","fontBody":"''Montserrat'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"none","cardStyle":"clean"}', '[{"type":"hero","order":1,"enabled":true,"title":"VOGUE WEDDING ISSUE","subtitle":"Special Edition — Love in Full Bloom","layout":"magazine","content":{"badge":"VOL. 2026 • EXCLUSIVE","quote":"Fashion fades, only love remains eternal.","overlayOpacity":20}},{"type":"couple","order":2,"enabled":true,"title":"The Protagonists","subtitle":"Nhân vật trang bìa","layout":"editorial","content":{}},{"type":"countdown","order":3,"enabled":true,"title":"Counting Down The Seconds","subtitle":"Showtime is coming","layout":"flip","content":{}},{"type":"story","order":4,"enabled":true,"title":"Behind The Scenes","subtitle":"Hành trình yêu như một cuốn phim","layout":"timeline","content":{"stories":[]}},{"type":"events","order":5,"enabled":true,"title":"Event Itinerary","subtitle":"Lịch trình biểu diễn & đón khách","layout":"editorial","content":{}},{"type":"gallery","order":6,"enabled":true,"title":"Editorial Film Reel 35mm","subtitle":"Cuộn phim điện ảnh tự động trôi mượt mà","layout":"filmstrip","content":{"layout":"filmstrip"}},{"type":"map","order":7,"enabled":true,"title":"Venue & Access","subtitle":"Chỉ dẫn lối vào thảm đỏ tiệc cưới","layout":"card","content":{}},{"type":"rsvp","order":8,"enabled":true,"title":"RSVP Invitation","subtitle":"Please confirm your VIP attendance","layout":"standard","content":{}},{"type":"guestbook","order":9,"enabled":true,"title":"Words of Love","subtitle":"Gửi những tâm tình đẹp đẽ nhất","layout":"wall","content":{}},{"type":"thank_you","order":10,"enabled":true,"title":"Merci Beaucoup","subtitle":"Thank You","layout":"centered","content":{"message":"Thank you for being part of our special beginning. Forever grateful."}}]')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name", "defaultTheme" = EXCLUDED."defaultTheme", "defaultBlocks" = EXCLUDED."defaultBlocks";

INSERT INTO "Template" ("id", "name", "slug", "thumbnail", "description", "category", "defaultTheme", "defaultBlocks")
VALUES ('traditional-luxury', 'Traditional Vietnamese Luxury', 'traditional-luxury', 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80', 'Đỏ son may mắn, nhung vàng hoàng gia phối hoa văn Song Hỷ tinh xảo, tôn vinh đạo hiếu và nét đẹp cưới Việt Nam hiện đại.', 'traditional', '{"id":"theme-traditional","name":"Crimson & Imperial Gold","primaryColor":"#A61C2C","secondaryColor":"#80121F","accentColor":"#D4AF37","backgroundColor":"#FCF8F5","cardBackgroundColor":"#FFFFFF","textColor":"#2B191B","mutedTextColor":"#856B6E","borderColor":"#F0DDD2","fontHeading":"''Playfair Display'', serif","fontBody":"''Plus Jakarta Sans'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"md","cardStyle":"bordered"}', '[{"type":"hero","order":1,"enabled":true,"title":"Trăm Năm Tình Viên Mãn","subtitle":"Lễ Vu Quy & Lễ Thành Hôn","layout":"traditional","content":{"badge":"囍 TRĂM NĂM HẠNH PHÚC 囍","quote":"Duyên ba sinh hẹn ước, nghĩa trọn đời phu thê.","overlayOpacity":35}},{"type":"family","order":2,"enabled":true,"title":"Hai Họ Thông Gia","subtitle":"Kính báo tin mừng","layout":"standard","content":{"title":"Đại Diện Hai Họ"}},{"type":"couple","order":3,"enabled":true,"title":"Tân Lang & Tân Nương","subtitle":"Xứng lứa vừa đôi","layout":"cards","content":{}},{"type":"countdown","order":4,"enabled":true,"title":"Ngày Lành Tháng Tốt","subtitle":"Thời khắc nên duyên vợ chồng","layout":"boxes","content":{}},{"type":"events","order":5,"enabled":true,"title":"Nghi Lễ Gia Tiên & Tiệc Mừng","subtitle":"Chương trình chi tiết","layout":"cards","content":{}},{"type":"gallery","order":6,"enabled":true,"title":"Album Áo Dài & Hạnh Phúc","subtitle":"Ghi dấu ngày sum vầy","layout":"grid-2","content":{"layout":"grid-2"}},{"type":"map","order":7,"enabled":true,"title":"Địa Chỉ Nhà Gái & Nhà Trai","subtitle":"Kính mời quý khách tới chung vui","layout":"card","content":{}},{"type":"rsvp","order":8,"enabled":true,"title":"Phúc Đáp Thiệp Mừng (RSVP)","subtitle":"Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình","layout":"standard","content":{}},{"type":"guestbook","order":9,"enabled":true,"title":"Gửi Lời Chúc Phúc","subtitle":"Mừng duyên đôi lứa trăm năm bền chặt","layout":"wall","content":{}},{"type":"thank_you","order":10,"enabled":true,"title":"Chân Thành Cảm Tạ","subtitle":"Gia đình hai họ đồng cảm tạ","layout":"centered","content":{"message":"Gia đình hai bên xin chân thành cảm ơn quý cụ, quý bà, quý cô chú bác cùng toàn thể anh chị em bạn bè đã đến chung vui và chúc phúc cho hai cháu!"}}]')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name", "defaultTheme" = EXCLUDED."defaultTheme", "defaultBlocks" = EXCLUDED."defaultBlocks";

-- 3. SEED WEDDINGS
INSERT INTO "Wedding" ("id", "slug", "title", "groomName", "brideName", "groomShortName", "brideShortName", "weddingDate", "weddingTime", "venueName", "venueAddress", "mapUrl", "coverImage", "musicUrl", "musicTitle", "status", "publishedAt", "templateId", "userId", "themeConfig", "updatedAt")
VALUES ('wed-minh-anh', 'minh-anh', 'Đám Cưới Minh & Ngọc Anh', 'Nguyễn Quang Minh', 'Trần Ngọc Anh', 'Minh', 'Ngọc Anh', '2026-10-24 18:00:00+07', '18:00', 'Trung Tâm Hội Nghị White Palace', '194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh', 'https://maps.google.com/?q=White+Palace+Hoang+Van+Thu', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80', 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3', 'A Thousand Years (Acoustic Piano)', 'PUBLISHED', NOW(), 'elegant-ivory', 'user-demo-1', '{"id":"theme-ivory","name":"Ivory & Gold","primaryColor":"#2A2826","secondaryColor":"#7A7369","accentColor":"#C5A059","backgroundColor":"#FDFBF7","cardBackgroundColor":"#FFFFFF","textColor":"#2D2A26","mutedTextColor":"#827B73","borderColor":"#EADDC8","fontHeading":"''Playfair Display'', serif","fontBody":"''Inter'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"md","cardStyle":"bordered"}', NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "themeConfig" = EXCLUDED."themeConfig";

INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-0', 'wed-minh-anh', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', 'Kỷ niệm 1', 0, true)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-1', 'wed-minh-anh', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', 'Kỷ niệm 2', 1, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-2', 'wed-minh-anh', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', 'Kỷ niệm 3', 2, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-3', 'wed-minh-anh', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', 'Kỷ niệm 4', 3, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-4', 'wed-minh-anh', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', 'Kỷ niệm 5', 4, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-5', 'wed-minh-anh', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', 'Kỷ niệm 6', 5, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-6', 'wed-minh-anh', 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80', 'Kỷ niệm 7', 6, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-minh-anh-7', 'wed-minh-anh', 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80', 'Kỷ niệm 8', 7, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'hero', 1, true, 'Save Our Date', 'Chúng mình sắp về chung một nhà', '{"badge":"THE WEDDING CELEBRATION","quote":"Tình yêu là khi hai trái tim tìm thấy cùng một nhịp đập.","overlayOpacity":35}', 'centered', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'couple', 2, true, 'Cô Dâu & Chú Rể', 'Hai nửa yêu thương', '{}', 'cards', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'countdown', 3, true, 'Đếm Ngược Ngày Chung Đôi', 'Chỉ còn một chút thời gian nữa thôi', '{"postWeddingMessage":"Cảm ơn bạn đã cùng chia sẻ khoảnh khắc tuyệt vời nhất cuộc đời chúng mình!"}', 'flip', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'story', 4, true, 'Câu Chuyện Tình Yêu', 'Hành trình từ người xa lạ đến bạn đời', '{"stories":[{"id":"s1","year":"2021","title":"Lần Đầu Gặp Gỡ","description":"Một chiều thu Hà Nội dưới tán cây Hoàng Diệu, vô tình nhìn thấy ánh mắt ấy và biết rằng định mệnh đã an bài.","image":"https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80"},{"id":"s2","year":"2023","title":"Lời Cầu Hôn Trong Mơ","description":"Giữa bãi biển hoàng hôn Phú Quốc, chiếc nhẫn được trao đi cùng lời hứa bên nhau trọn đời.","image":"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"}]}', 'timeline', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'events', 5, true, 'Sự Kiện Cưới', 'Thời gian & địa điểm diễn ra các nghi lễ', '{}', 'cards', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'gallery', 6, true, 'Khoảnh Khắc Hạnh Phúc', 'Kỷ niệm trước ngày trọng đại', '{"layout":"masonry"}', 'masonry', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'map', 7, true, 'Địa Điểm Tiệc Cưới', 'Rất hân hạnh được đón tiếp quý khách', '{}', 'card', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'rsvp', 8, true, 'Xác Nhận Tham Dự (RSVP)', 'Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng mình', '{"deadline":"Vui lòng xác nhận trước 5 ngày diễn ra tiệc","enableGuestCount":true,"enableSideChoice":true}', 'standard', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'guestbook', 9, true, 'Sổ Lưu Bút Chúc Mừng', 'Hãy để lại những lời chúc thân thương nhất', '{"placeholder":"Gửi lời chúc hạnh phúc đến cô dâu & chú rể..."}', 'wall', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-minh-anh-undefined', 'wed-minh-anh', 'thank_you', 10, true, 'Trân Trọng Cảm Ơn', 'Thank You', '{"message":"Sự hiện diện và lời chúc phúc của quý khách là món quà quý giá nhất đối với chúng mình trong ngày trọng đại này."}', 'centered', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "Wedding" ("id", "slug", "title", "groomName", "brideName", "groomShortName", "brideShortName", "weddingDate", "weddingTime", "venueName", "venueAddress", "mapUrl", "coverImage", "musicUrl", "musicTitle", "status", "publishedAt", "templateId", "userId", "themeConfig", "updatedAt")
VALUES ('wed-nam-linh', 'nam-linh', 'Lễ Thành Hôn Nam & Khánh Linh', 'Phạm Hải Nam', 'Đỗ Khánh Linh', 'Nam', 'Linh', '2026-11-15 17:30:00+07', '17:30', 'InterContinental Saigon Ballroom', 'Góc Hai Bà Trưng & Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh', 'https://maps.google.com/?q=InterContinental+Saigon', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80', 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3', 'Canon in D (Orchestra)', 'PUBLISHED', NOW(), 'burgundy-wedding', 'user-demo-1', '{"id":"theme-burgundy","name":"Burgundy & Gold Royal","primaryColor":"#E5C158","secondaryColor":"#C99A45","accentColor":"#E5C158","backgroundColor":"#2C0B12","cardBackgroundColor":"#3E121C","textColor":"#F9F3EA","mutedTextColor":"#D6B8BE","borderColor":"#681F2F","fontHeading":"''Cinzel'', serif","fontBody":"''Montserrat'', sans-serif","fontScript":"''Alex Brush'', cursive","borderRadius":"sm","cardStyle":"bordered"}', NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "themeConfig" = EXCLUDED."themeConfig";

INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-nam-linh-0', 'wed-nam-linh', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', 'Kỷ niệm 1', 0, true)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-nam-linh-1', 'wed-nam-linh', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', 'Kỷ niệm 2', 1, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-nam-linh-2', 'wed-nam-linh', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', 'Kỷ niệm 3', 2, false)
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'hero', 1, true, 'Royal Wedding', 'Lễ Thành Hôn Trọng Đại', '{"badge":"CORONATION OF LOVE","quote":"Tình yêu là điều kỳ diệu nhất mà vũ trụ ban tặng.","overlayOpacity":45}', 'editorial', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'couple', 2, true, 'Groom & Bride', 'Cặp Đôi Hoàng Gia', '{}', 'cards', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'countdown', 3, true, 'Thời Khắc Linh Thiêng', 'Đếm ngược đến giờ lành', '{}', 'boxes', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'story', 4, true, 'Chương Tình Yêu', 'Từng cột mốc son sắt', '{"stories":[]}', 'timeline', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'events', 5, true, 'Nghi Lễ & Dạ Tiệc', 'Trân trọng kính mời quý khách', '{}', 'cards', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'gallery', 6, true, 'Album Cưới Hoàng Gia', 'Vẻ đẹp vượt thời gian', '{"layout":"grid-3"}', 'grid-3', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'map', 7, true, 'Cung Điện Tiệc Cưới', 'Grand Ballroom', '{}', 'card', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'rsvp', 8, true, 'Phản Hồi Tham Dự (RSVP)', 'Xin vui lòng xác nhận để chúng mình chu đáo đón tiếp', '{}', 'standard', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'guestbook', 9, true, 'Lời Chúc Phúc Kim Cương', 'Ghi dấu kỷ niệm đáng nhớ', '{}', 'wall', '{}')
ON CONFLICT ("id") DO NOTHING;
INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-nam-linh-undefined', 'wed-nam-linh', 'thank_you', 10, true, 'Tri Ân Quý Khách', 'With Deepest Gratitude', '{"message":"Kính chúc quý khách và gia đình luôn dồi dào sức khỏe, may mắn và ngập tràn hạnh phúc!"}', 'centered', '{}')
ON CONFLICT ("id") DO NOTHING;

-- 4. SEED SAMPLE RSVPS & GUESTBOOK
INSERT INTO "Rsvp" ("id", "weddingId", "guestName", "phone", "guestCount", "isAttending", "side", "message")
VALUES 
  ('rsvp-1', 'wed-minh-anh', 'Lê Hoàng Phúc', '0901234567', 2, true, 'GROOM', 'Chúc hai bạn trăm năm hạnh phúc!'),
  ('rsvp-2', 'wed-minh-anh', 'Nguyễn Thùy Dung', '0912345678', 1, true, 'BRIDE', 'Chúc mừng hạnh phúc nhé!')
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "GuestbookMessage" ("id", "weddingId", "name", "message", "isVisible")
VALUES 
  ('gb-1', 'wed-minh-anh', 'Gia đình Bác Thành', 'Chúc hai cháu vạn sự hanh thông, tình duyên bền chặt!', true),
  ('gb-2', 'wed-minh-anh', 'Thanh Hằng & Quốc Đạt', 'Mong chờ ngày được chung vui cùng hai bạn!', true)
ON CONFLICT ("id") DO NOTHING;
