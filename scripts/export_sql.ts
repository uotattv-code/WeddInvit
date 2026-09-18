import fs from "fs";
import { TEMPLATES } from "../src/lib/templates";

let ddl = fs.readFileSync("supabase_setup.sql", "utf8");
ddl = ddl.replace(/CREATE TABLE /g, "CREATE TABLE IF NOT EXISTS ");
ddl = ddl.replace(/CREATE UNIQUE INDEX /g, "CREATE UNIQUE INDEX IF NOT EXISTS ");

let sql = `-- ==========================================
-- WEDDINVIT SUPABASE DATABASE FULL INITIALIZATION
-- ==========================================

${ddl}

-- 1. SEED USERS
INSERT INTO "User" ("id", "email", "name", "role", "password", "updatedAt")
VALUES 
  ('user-admin-1', 'admin@weddinvit.com', 'Weddinvit Administrator', 'ADMIN', 'admin_secure_password_123', NOW()),
  ('user-demo-1', 'demo@weddinvit.com', 'Nguyễn Minh', 'CUSTOMER', 'demo_password_123', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 2. SEED TEMPLATES
`;

for (const tpl of TEMPLATES) {
  const themeStr = JSON.stringify(tpl.defaultTheme).replace(/'/g, "''");
  const blocksStr = JSON.stringify(tpl.defaultBlocks).replace(/'/g, "''");
  sql += `INSERT INTO "Template" ("id", "name", "slug", "thumbnail", "description", "category", "defaultTheme", "defaultBlocks")
VALUES ('${tpl.id}', '${tpl.name}', '${tpl.slug}', '${tpl.thumbnail}', '${tpl.description}', '${tpl.category}', '${themeStr}', '${blocksStr}')
ON CONFLICT ("id") DO UPDATE SET "name" = EXCLUDED."name", "defaultTheme" = EXCLUDED."defaultTheme", "defaultBlocks" = EXCLUDED."defaultBlocks";\n\n`;
}

// 3. SEED DEMO WEDDINGS
const demoWeddings = [
  {
    id: "wed-minh-anh",
    slug: "minh-anh",
    title: "Đám Cưới Minh & Ngọc Anh",
    groomName: "Nguyễn Quang Minh",
    brideName: "Trần Ngọc Anh",
    groomShortName: "Minh",
    brideShortName: "Ngọc Anh",
    weddingDate: "2026-10-24 18:00:00+07",
    weddingTime: "18:00",
    venueName: "Trung Tâm Hội Nghị White Palace",
    venueAddress: "194 Hoàng Văn Thụ, Phường 9, Phú Nhuận, TP. Hồ Chí Minh",
    mapUrl: "https://maps.google.com/?q=White+Palace+Hoang+Van+Thu",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
    musicTitle: "A Thousand Years (Acoustic Piano)",
    templateId: "elegant-ivory",
    themeConfig: JSON.stringify(TEMPLATES[0].defaultTheme).replace(/'/g, "''"),
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80"
    ]
  },
  {
    id: "wed-nam-linh",
    slug: "nam-linh",
    title: "Lễ Thành Hôn Nam & Khánh Linh",
    groomName: "Phạm Hải Nam",
    brideName: "Đỗ Khánh Linh",
    groomShortName: "Nam",
    brideShortName: "Linh",
    weddingDate: "2026-11-15 17:30:00+07",
    weddingTime: "17:30",
    venueName: "InterContinental Saigon Ballroom",
    venueAddress: "Góc Hai Bà Trưng & Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    mapUrl: "https://maps.google.com/?q=InterContinental+Saigon",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80",
    musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3",
    musicTitle: "Canon in D (Orchestra)",
    templateId: "burgundy-wedding",
    themeConfig: JSON.stringify(TEMPLATES[1].defaultTheme).replace(/'/g, "''"),
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
    ]
  }
];

sql += "-- 3. SEED WEDDINGS\n";
for (const w of demoWeddings) {
  sql += `INSERT INTO "Wedding" ("id", "slug", "title", "groomName", "brideName", "groomShortName", "brideShortName", "weddingDate", "weddingTime", "venueName", "venueAddress", "mapUrl", "coverImage", "musicUrl", "musicTitle", "status", "publishedAt", "templateId", "userId", "themeConfig", "updatedAt")
VALUES ('${w.id}', '${w.slug}', '${w.title}', '${w.groomName}', '${w.brideName}', '${w.groomShortName}', '${w.brideShortName}', '${w.weddingDate}', '${w.weddingTime}', '${w.venueName}', '${w.venueAddress}', '${w.mapUrl}', '${w.coverImage}', '${w.musicUrl}', '${w.musicTitle}', 'PUBLISHED', NOW(), '${w.templateId}', 'user-demo-1', '${w.themeConfig}', NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "themeConfig" = EXCLUDED."themeConfig";\n\n`;

  // Gallery
  for (let i = 0; i < w.gallery.length; i++) {
    sql += `INSERT INTO "GalleryImage" ("id", "weddingId", "url", "caption", "order", "isCover")
VALUES ('img-${w.slug}-${i}', '${w.id}', '${w.gallery[i]}', 'Kỷ niệm ${i + 1}', ${i}, ${i === 0})
ON CONFLICT ("id") DO NOTHING;\n`;
  }

  // Blocks
  const tpl = TEMPLATES.find(t => t.id === w.templateId) || TEMPLATES[0];
  for (const blk of tpl.defaultBlocks) {
    const contentStr = JSON.stringify(blk.content).replace(/'/g, "''");
    const styleStr = blk.style ? JSON.stringify(blk.style).replace(/'/g, "''") : "{}";
    sql += `INSERT INTO "WeddingBlock" ("id", "weddingId", "type", "order", "enabled", "title", "subtitle", "content", "layout", "style")
VALUES ('blk-${w.slug}-${blk.id}', '${w.id}', '${blk.type}', ${blk.order}, ${blk.enabled}, '${blk.title || ""}', '${blk.subtitle || ""}', '${contentStr}', '${blk.layout || "default"}', '${styleStr}')
ON CONFLICT ("id") DO NOTHING;\n`;
  }
}

// 4. Sample RSVPs & Guestbook
sql += `\n-- 4. SEED SAMPLE RSVPS & GUESTBOOK
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
`;

fs.writeFileSync("supabase_full_setup.sql", sql);
console.log("SUCCESS: supabase_full_setup.sql generated!");
