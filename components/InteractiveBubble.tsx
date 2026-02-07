"use client";

import { useState } from "react";
import { useSound } from "@/contexts/SoundContext";

type Props = {
  title: string;
  icon: string;
  color: string;
  randomResponse?: boolean;
  responses?: string[];
  yesNo?: boolean;
  yesText?: string;
  noText?: string;
};

export function InteractiveBubble({
  title,
  icon,
  color,
  randomResponse,
  responses = [],
  yesNo,
  yesText = "",
  noText = "",
}: Props) {
  const { playBubblePop } = useSound();
  const [reply, setReply] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [justClicked, setJustClicked] = useState(false);

  const handleFirstClick = () => {
    if (reply !== null) return;
    playBubblePop();
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 400);
    if (randomResponse && responses.length) {
      setReply(responses[Math.floor(Math.random() * responses.length)]);
      return;
    }
    if (yesNo) setRevealed(true);
  };

  const handleYes = () => {
    playBubblePop();
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 400);
    setReply(yesText);
  };
  const handleNo = () => {
    playBubblePop();
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 400);
    setReply(noText);
  };

  const showYesNoButtons = yesNo && revealed && reply === null;

  return (
    <div
      className={`rounded-2xl border-2 ${color} p-4 transition-shadow hover:shadow-soft ${justClicked ? "animate-bubble-squish" : ""}`}
    >
      {reply === null ? (
        <button
          type="button"
          onClick={handleFirstClick}
          className="w-full text-left flex items-center gap-3"
        >
          <span className="text-2xl" aria-hidden>{icon}</span>
          <span className="font-medium text-stone-700">{title}</span>
        </button>
      ) : (
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden>{icon}</span>
          <div>
            <p className="font-medium text-stone-700">{title}</p>
            <p className="mt-2 text-sm text-stone-600">{reply}</p>
          </div>
        </div>
      )}

      {showYesNoButtons && (
        <div className="mt-3 flex gap-2 pl-11">
          <button
            type="button"
            onClick={handleYes}
            className="rounded-xl bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-200 transition-colors"
          >
            YES 💦
          </button>
          <button
            type="button"
            onClick={handleNo}
            className="rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-800 hover:bg-rose-200 transition-colors"
          >
            NO 😅
          </button>
        </div>
      )}

    </div>
  );
}
