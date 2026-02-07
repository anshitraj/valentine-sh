"use client";

import { useState } from "react";
import { Sparkles, Heart, Dumbbell } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";

const moods = [
  {
    id: "cute",
    icon: <Heart className="w-5 h-5" />,
    label: "Cute",
    message: "Whatever your mood is today, I hope something small makes it better 💗",
  },
  {
    id: "calm",
    icon: <Sparkles className="w-5 h-5" />,
    label: "Calm",
    message: "Some days don't need fixing. Just understanding.",
  },
  {
    id: "funny",
    icon: <Dumbbell className="w-5 h-5" />,
    label: "Gym Mode",
    message: "Gym day + water + protein = emotional stability 😄",
  },
];

export default function MoodCheck() {
  const { playBubblePop } = useSound();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-[hsl(var(--foreground))]/80 text-sm leading-relaxed mb-4">
        How are you feeling today?
      </p>

      <div className="flex flex-wrap gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => {
              playBubblePop();
              setSelectedMood(mood.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedMood === mood.id
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-soft)]"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))]/20"
            }`}
          >
            {mood.icon}
            {mood.label}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="animate-fade-slide-in mt-4 p-4 rounded-xl bg-[hsl(var(--rose-glow))]/50 border border-[hsl(var(--rose-light))]">
          <p className="text-[hsl(var(--foreground))] text-sm leading-relaxed">
            {moods.find((m) => m.id === selectedMood)?.message}
          </p>
        </div>
      )}

      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4 italic">
        If you want, you can tell me which one you liked later.
      </p>
    </div>
  );
}
