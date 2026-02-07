"use client";

import { useState } from "react";
import { useSound } from "@/contexts/SoundContext";

const MAX_SLICES = 3;
const FINAL_MESSAGE = "Calories don't count today 😉";
const WISH_RESPONSE = "That wish's a little easier when someone's there for you 💗";

export function CakeCut() {
  const { playCakeCut } = useSound();
  const [slices, setSlices] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [showWishInput, setShowWishInput] = useState(false);
  const [wish, setWish] = useState("");
  const [wishSubmitted, setWishSubmitted] = useState(false);

  const handleCut = () => {
    if (slices >= MAX_SLICES) return;
    playCakeCut();
    if (slices === 0) {
      setShowWishInput(true);
      setSlices(1);
    } else if (slices === 2) {
      setSlices(3);
      setShowFinal(true);
    } else {
      setSlices((n) => n + 1);
    }
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) setWishSubmitted(true);
  };

  return (
    <div className="mt-6 rounded-2xl bg-rose-50/80 border border-rose-200 p-4">
      <p className="text-center text-sm text-stone-600 mb-3">
        You can cut the cake if you want 🎂
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleCut}
          disabled={slices >= MAX_SLICES}
          className="text-5xl focus:outline-none focus:ring-2 focus:ring-rose-300 rounded-lg p-1 transition-transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Cut cake"
        >
          🎂
        </button>
      </div>

      {showWishInput && !wishSubmitted && (
        <form onSubmit={handleWishSubmit} className="mt-4 space-y-2 animate-fade-in">
          <p className="text-sm text-rose-700 font-medium text-center">Make a wish ✨</p>
          <input
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Type your wish..."
            className="w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
            maxLength={120}
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-rose-500 text-white py-2.5 text-sm font-medium hover:bg-rose-600 transition-colors"
          >
            Make my wish
          </button>
        </form>
      )}

      {wishSubmitted && wish.trim() && (
        <div className="mt-4 p-3 rounded-xl bg-white/70 border border-rose-100 animate-fade-in">
          <p className="text-sm text-stone-700 italic">&ldquo;{wish.trim()}&rdquo;</p>
          <p className="text-sm text-rose-700 font-medium mt-2">{WISH_RESPONSE}</p>
        </div>
      )}

      {slices >= 2 && !showFinal && (
        <p className="text-center text-sm text-rose-700 font-medium mt-3 animate-fade-in">
          Something sweet for today
        </p>
      )}

      {showFinal && (
        <div className="text-center mt-3 space-y-1 animate-fade-in">
          <p className="text-sm text-rose-700 font-medium">Okay that&apos;s enough cake 😄</p>
          <p className="text-sm text-rose-600 font-medium">{FINAL_MESSAGE}</p>
        </div>
      )}
    </div>
  );
}
