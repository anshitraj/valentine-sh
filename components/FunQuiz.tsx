"use client";

import { useState } from "react";
import { useSound } from "@/contexts/SoundContext";

export type QuizOption = { label: string; response: string };

type Props = {
  question: string;
  icon: string;
  options: QuizOption[];
  pastelColor?: string;
};

export function FunQuiz({ question, icon, options, pastelColor = "bg-pink-50 border-pink-200" }: Props) {
  const { playBubblePop } = useSound();
  const [selected, setSelected] = useState<QuizOption | null>(null);

  const handleSelect = (opt: QuizOption) => {
    playBubblePop();
    setSelected(opt);
  };

  if (selected) {
    return (
      <div className={`rounded-2xl border-2 ${pastelColor} p-4 mt-4`}>
        <p className="text-sm text-stone-600 font-medium">{selected.response}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 ${pastelColor} p-4 mt-4`}>
      <p className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-3">
        <span aria-hidden>{icon}</span>
        {question}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => handleSelect(opt)}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white/80 border border-rose-100 text-stone-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
