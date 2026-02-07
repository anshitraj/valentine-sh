"use client";

import { useState } from "react";
import { Gift, Heart, Cake, Candy, Dog, HandHeart, Users, Smile, HeartHandshake } from "lucide-react";

interface DayCardProps {
  date: string;
  dayName: string;
  title: string;
  emoji: string;
  children: React.ReactNode;
  special?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  "💖": <Heart className="w-5 h-5" />,
  "🎂": <Cake className="w-5 h-5" />,
  "🍫": <Candy className="w-5 h-5" />,
  "🧸": <Dog className="w-5 h-5" />,
  "🤍": <HandHeart className="w-5 h-5" />,
  "🤗": <Users className="w-5 h-5" />,
  "🎭": <Smile className="w-5 h-5" />,
  "❤️": <HeartHandshake className="w-5 h-5" />,
};

export default function DayCard({ date, dayName, title, emoji, children, special }: DayCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`card-valentine card-hover card-hover-tilt rainbow-glow-hover overflow-hidden ${special ? "ring-2 ring-[hsl(var(--primary))]/30" : ""}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{date}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]/70">{dayName}</p>
          </div>
          <div className="flex items-center gap-2 text-[hsl(var(--primary))]">
            {iconMap[emoji.split(" ")[0]] ?? <Gift className="w-5 h-5" />}
            <span className="text-lg">{emoji}</span>
          </div>
        </div>

        <h3 className="font-serif text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
          {title}
        </h3>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="btn-rose w-full flex items-center justify-center gap-2 text-sm"
        >
          <Gift className="w-4 h-4" />
          {isOpen ? "Close" : "Open Gift 🎁"}
        </button>
      </div>

      {isOpen && (
        <div className="animate-fade-slide-in border-t border-[hsl(var(--border))] bg-[hsl(var(--cream-warm))]/50 p-6">
          {children}
        </div>
      )}
    </div>
  );
}
