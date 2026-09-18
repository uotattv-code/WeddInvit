"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music2, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string | null;
  musicTitle?: string | null;
  autoPlay?: boolean;
  accentColor?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl,
  musicTitle = "Nhạc Cưới Lãng Mạn",
  autoPlay = false,
  accentColor = "#D4AF37",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const defaultMusic =
    musicUrl ||
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-love-112194.mp3";

  useEffect(() => {
    if (!audioRef.current) return;

    if (autoPlay) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay, defaultMusic]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <audio ref={audioRef} src={defaultMusic} loop preload="auto" />

      {/* Floating play/pause button */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full shadow-xl transition-all duration-300 backdrop-blur-md border ${
          isPlaying
            ? "bg-black/75 text-white border-white/20 ring-2 ring-amber-400/50 scale-105"
            : "bg-white/90 text-neutral-800 border-neutral-200 hover:scale-105"
        }`}
      >
        <div
          className={`p-1.5 rounded-full text-white ${
            isPlaying ? "animate-spin-slow bg-amber-500" : "bg-neutral-400"
          }`}
          style={{ backgroundColor: isPlaying ? accentColor : undefined }}
        >
          <Music2 className="w-3.5 h-3.5" />
        </div>

        <span className="text-xs font-semibold pr-1">
          {isPlaying ? (
            <span className="flex items-center gap-1.5">
              <span>Đang phát</span>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span>🎵 Bật nhạc</span>
              <VolumeX className="w-3.5 h-3.5" />
            </span>
          )}
        </span>
      </button>
    </div>
  );
};
