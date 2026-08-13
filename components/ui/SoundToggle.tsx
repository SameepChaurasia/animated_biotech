"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/audio";

export const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState<boolean>(soundManager.getMuted());

  const handleToggle = () => {
    const isNowMuted = soundManager.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      soundManager.playClickSound();
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={muted ? "Unmute UI sound effects" : "Mute UI sound effects"}
      className="p-2 rounded-full bg-surface-elevated border border-border text-ink-muted hover:text-accent-lime hover:border-accent-lime/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
      title={muted ? "Sound Effects: Muted" : "Sound Effects: Active"}
    >
      {muted ? <VolumeX className="w-4 h-4 text-ink-muted" /> : <Volume2 className="w-4 h-4 text-accent-lime animate-pulse" />}
    </button>
  );
};
