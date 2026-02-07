"use client";

import { Lock } from "lucide-react";

type DayKey = 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

const DAY_LABELS: Record<DayKey, string> = {
  7: "Rose Day",
  8: "Birthday",
  9: "Chocolate Day",
  10: "Teddy Day",
  11: "Promise Day",
  12: "Hug Day",
  13: "Mood & Care",
  14: "Valentine's Day",
};

type Props = {
  day: DayKey;
  date: string;
  dayName: string;
  emoji: string;
  onClick: () => void;
};

export default function LockedDayCard({ day, date, dayName, emoji, onClick }: Props) {
  const title = DAY_LABELS[day];
  return (
    <button
      type="button"
      onClick={onClick}
      className="card-valentine card-hover w-full text-left overflow-hidden opacity-90 hover:opacity-100 transition-opacity cursor-pointer border-2 border-dashed border-[hsl(var(--border))]"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{date}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]/70">{dayName}</p>
          </div>
          <span className="text-2xl opacity-80" aria-hidden>{emoji}</span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--secondary))]/50 py-3 px-4 text-sm text-[hsl(var(--muted-foreground))]">
          <Lock className="w-4 h-4 shrink-0" />
          <span>Unlocks on Feb {day}</span>
        </div>
        <p className="text-center text-xs text-[hsl(var(--muted-foreground))]/80 mt-2">
          Tap to see timer
        </p>
      </div>
    </button>
  );
}
