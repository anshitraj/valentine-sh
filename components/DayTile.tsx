"use client";

import type { DayKey } from "@/app/page";

const DAY_LABELS: Record<DayKey, { label: string; emoji: string }> = {
  7: { label: "Rose Day", emoji: "🌹" },
  8: { label: "Birthday", emoji: "🎂" },
  9: { label: "Chocolate Day", emoji: "🍫" },
  10: { label: "Teddy Day", emoji: "🧸" },
  11: { label: "Promise Day", emoji: "🤍" },
  12: { label: "Hug Day", emoji: "🤗" },
  13: { label: "Mood & Care", emoji: "🎭💧" },
  14: { label: "Valentine's Day", emoji: "❤️" },
};

type Props = {
  day: DayKey;
  isLocked: boolean;
  isToday: boolean;
  unlockDateStr: string;
  onClick: () => void;
};

export function DayTile({ day, isLocked, isToday, unlockDateStr, onClick }: Props) {
  const { label, emoji } = DAY_LABELS[day];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        group relative w-full min-h-[160px] sm:min-h-[180px] rounded-2xl shadow-tile
        flex flex-col items-center py-4 px-2
        transition-all duration-300 ease-out
        cursor-pointer active:scale-[0.99] select-none
        card-hover-tilt
        ${day === 8 ? "bg-rose-200/90 border-2 border-rose-300 text-rose-900" : "bg-warm-white/95 border border-rose-100"}
        ${isLocked ? "justify-between opacity-90 hover:shadow-tile-hover" : "justify-center gap-1 hover:shadow-tile-hover rainbow-glow-hover"}
        ${isToday && !isLocked ? "ring-2 ring-rose-400 ring-offset-2 ring-offset-blush" : ""}
      `}
      style={{ touchAction: "manipulation" }}
    >
      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
        <span className={`font-serif text-2xl sm:text-3xl font-semibold ${day === 8 ? "text-rose-900" : "text-rose-700"}`}>
          Feb {day}
        </span>
        <span className={`text-base sm:text-lg emoji-bounce-hover inline-block ${day === 8 ? "text-rose-800" : "text-muted"}`}>{emoji}</span>
        <span className={`text-xs sm:text-sm font-medium text-center leading-tight max-w-[90%] ${day === 8 ? "text-rose-900" : "text-muted"}`}>
          {label}
        </span>
      </div>
      {isLocked && (
        <span className="flex-shrink-0 text-center text-xs text-muted pointer-events-none pt-2 border-t border-rose-100/60 w-full mt-1">
          <span className="inline-flex items-center justify-center gap-1.5">
            <span className="inline-block animate-lock-shake" aria-hidden>🔒</span>
            Unlocks on {unlockDateStr}
          </span>
          <span className="block text-[10px] opacity-90 mt-0.5">Tap to see timer</span>
        </span>
      )}
    </button>
  );
}
