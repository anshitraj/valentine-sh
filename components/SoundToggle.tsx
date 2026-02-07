"use client";

import { useSound } from "@/contexts/SoundContext";

export function SoundToggle() {
  const { muted, toggleMute } = useSound();
  return (
    <button
      type="button"
      onClick={toggleMute}
      className="rounded-full p-2 text-xl transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-300"
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Turn sound on" : "Turn sound off"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
