export type BlockType =
  | "hero"
  | "couple"
  | "countdown"
  | "story"
  | "events"
  | "gallery"
  | "family"
  | "map"
  | "rsvp"
  | "guestbook"
  | "music"
  | "thank_you"
  | "divider";

export interface HeroBlockContent {
  title?: string;
  subtitle?: string;
  badge?: string;
  coverImage?: string;
  quote?: string;
  overlayOpacity?: number; // 0 to 100
}

export interface CoupleBlockContent {
  groomName: string;
  groomTitle?: string;
  groomBio?: string;
  groomImage?: string;
  groomParents?: string;
  brideName: string;
  brideTitle?: string;
  brideBio?: string;
  brideImage?: string;
  brideParents?: string;
}

export interface CountdownBlockContent {
  targetDate: string; // ISO string
  title?: string;
  subtitle?: string;
  postWeddingMessage?: string;
}

export interface StoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface StoryBlockContent {
  stories: StoryItem[];
}

export interface EventItem {
  id: string;
  title: string;
  time: string;
  date: string;
  location: string;
  address: string;
  mapUrl?: string;
  dressCode?: string;
}

export interface EventsBlockContent {
  events: EventItem[];
}

export type GalleryLayout =
  | "masonry"
  | "grid-2"
  | "grid-3"
  | "featured"
  | "carousel"
  | "polaroid-stack"
  | "filmstrip"
  | "story-reel";

export interface GalleryImageItem {
  id: string;
  url: string;
  caption?: string;
  isCover?: boolean;
}

export interface GalleryBlockContent {
  images: GalleryImageItem[];
  layout: GalleryLayout;
}

export interface FamilyMember {
  name: string;
  role: string;
  side: "groom" | "bride";
}

export interface FamilyBlockContent {
  groomFather?: string;
  groomMother?: string;
  brideFather?: string;
  brideMother?: string;
  title?: string;
}

export interface MapBlockContent {
  venueName: string;
  address: string;
  mapUrl: string;
  embedUrl?: string;
  note?: string;
}

export interface RSVPBlockContent {
  title?: string;
  subtitle?: string;
  deadline?: string;
  enableGuestCount?: boolean;
  enableSideChoice?: boolean;
}

export interface GuestbookBlockContent {
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

export interface MusicBlockContent {
  musicUrl: string;
  musicTitle?: string;
  autoPlay?: boolean;
}

export interface ThankYouBlockContent {
  title: string;
  message: string;
  signature?: string;
  image?: string;
}

export interface WeddingBlockData {
  id: string;
  weddingId?: string;
  type: BlockType;
  order: number;
  enabled: boolean;
  title?: string | null;
  subtitle?: string | null;
  content: string; // JSON string
  layout?: string;
  style?: string | null;
}

export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  fontHeading: string;
  fontBody: string;
  fontScript?: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
  cardStyle: "clean" | "bordered" | "elevated" | "glass";
}

export interface WeddingFullData {
  id: string;
  slug: string;
  title: string;
  groomName: string;
  brideName: string;
  groomShortName?: string | null;
  brideShortName?: string | null;
  weddingDate: string | Date;
  weddingTime?: string | null;
  venueName: string;
  venueAddress: string;
  mapUrl?: string | null;
  coverImage?: string | null;
  musicUrl?: string | null;
  musicTitle?: string | null;
  isMusicAutoPlay: boolean;
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: string | Date | null;
  themeConfig: ThemeConfig | string;
  customCss?: string | null;
  templateId: string;
  template?: {
    id: string;
    name: string;
    slug: string;
  };
  blocks: WeddingBlockData[];
  events?: any[];
  galleryImages?: any[];
  rsvps?: any[];
  guestbooks?: any[];
}
