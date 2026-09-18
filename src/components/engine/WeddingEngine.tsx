"use client";

import React, { useState } from "react";
import { WeddingFullData, ThemeConfig, WeddingBlockData } from "@/lib/types";
import { HeroBlock } from "./HeroBlock";
import { CoupleBlock } from "./CoupleBlock";
import { CountdownBlock } from "./CountdownBlock";
import { StoryBlock } from "./StoryBlock";
import { EventsBlock } from "./EventsBlock";
import { FamilyBlock } from "./FamilyBlock";
import { GalleryBlock } from "./GalleryBlock";
import { MapBlock } from "./MapBlock";
import { RSVPBlock } from "./RSVPBlock";
import { GuestbookBlock } from "./GuestbookBlock";
import { ThankYouBlock } from "./ThankYouBlock";
import { MusicPlayer } from "../common/MusicPlayer";
import { TouchHeartEmitter } from "../touch/TouchHeartEmitter";
import { InteractiveEnvelope } from "../touch/InteractiveEnvelope";
import { LoveReactor } from "../touch/LoveReactor";
import { FallingPetals } from "../touch/FallingPetals";
import { TEMPLATES } from "@/lib/templates";

interface WeddingEngineProps {
  wedding: WeddingFullData;
  isEditorPreview?: boolean;
}

export const WeddingEngine: React.FC<WeddingEngineProps> = ({
  wedding,
  isEditorPreview = false,
}) => {
  const [shouldAutoPlayMusic, setShouldAutoPlayMusic] = useState(wedding.isMusicAutoPlay);

  // Parse theme config
  let theme: ThemeConfig;
  if (typeof wedding.themeConfig === "string") {
    try {
      theme = JSON.parse(wedding.themeConfig);
    } catch {
      theme = TEMPLATES[0].defaultTheme;
    }
  } else if (wedding.themeConfig) {
    theme = wedding.themeConfig;
  } else {
    theme = TEMPLATES[0].defaultTheme;
  }

  // Ensure blocks exist and sort by order
  const blocks: WeddingBlockData[] = (wedding.blocks || [])
    .filter((b) => b.enabled)
    .sort((a, b) => a.order - b.order);

  // Callback when envelope is touched & opened
  const handleEnvelopeOpen = () => {
    setShouldAutoPlayMusic(true);
  };

  // Render individual block by type
  const renderBlock = (block: WeddingBlockData) => {
    switch (block.type) {
      case "hero":
        return <HeroBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "couple":
        return <CoupleBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "countdown":
        return <CountdownBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "story":
        return <StoryBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "events":
        return <EventsBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "family":
        return <FamilyBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "gallery":
        return <GalleryBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "map":
        return <MapBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "rsvp":
        return <RSVPBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "guestbook":
        return <GuestbookBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      case "thank_you":
        return <ThankYouBlock key={block.id} wedding={wedding} block={block} theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative min-h-screen w-full transition-colors duration-500 selection:bg-amber-400 selection:text-black"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontBody,
      }}
    >
      {/* 1. Touch Heart Burst Emitter (Anywhere tapped on screen) */}
      <TouchHeartEmitter />

      {/* 2. Romantic Falling Petals Effect */}
      <FallingPetals />

      {/* 3. Interactive Envelope & 3D Wax Seal Opening */}
      {!isEditorPreview && (
        <InteractiveEnvelope
          groomName={wedding.groomName}
          brideName={wedding.brideName}
          weddingDate={wedding.weddingDate}
          onOpen={handleEnvelopeOpen}
          accentColor={theme.accentColor}
        />
      )}

      {/* Dynamic CSS Variables injection */}
      <style jsx global>{`
        :root {
          --wedding-primary: ${theme.primaryColor};
          --wedding-accent: ${theme.accentColor};
          --wedding-bg: ${theme.backgroundColor};
          --wedding-card: ${theme.cardBackgroundColor};
          --wedding-text: ${theme.textColor};
          --wedding-border: ${theme.borderColor};
        }
      `}</style>

      {/* Render all active blocks */}
      <main className="w-full overflow-x-hidden">
        {blocks.map((block) => renderBlock(block))}
      </main>

      {/* 4. Interactive Love Reactor Cheer Counter (Bottom Left) */}
      {!isEditorPreview && (
        <LoveReactor weddingId={wedding.id} accentColor={theme.accentColor} />
      )}

      {/* 5. Music Player (Bottom Right) */}
      {!isEditorPreview && (
        <MusicPlayer
          musicUrl={wedding.musicUrl}
          musicTitle={wedding.musicTitle}
          autoPlay={shouldAutoPlayMusic}
          accentColor={theme.accentColor}
        />
      )}
    </div>
  );
};
