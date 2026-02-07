"use client";

import { useState } from "react";

const FALLBACK_MESSAGE = "Even without AI, that's a pretty good wish ✨";
const EMPTY_NUDGE = "You forgot to type a wish 😄";

export function BirthdayWishResponse() {
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [emptyNudge, setEmptyNudge] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = wish.trim();
    if (!trimmed) {
      setEmptyNudge(true);
      setResponse(null);
      return;
    }
    setEmptyNudge(false);
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data?.message === "string") {
        setResponse(data.message);
      } else {
        setResponse(FALLBACK_MESSAGE);
      }
    } catch {
      setResponse(FALLBACK_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={wish}
          onChange={(e) => {
            setWish(e.target.value);
            setEmptyNudge(false);
          }}
          placeholder="Type your wish…"
          className="w-full rounded-xl border border-rose-200 bg-white/90 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
          disabled={loading}
          aria-label="Your birthday wish"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-rose-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-600 disabled:opacity-70"
        >
          {loading ? "Thinking… ✨" : "Make my wish ✨"}
        </button>
      </form>

      {emptyNudge && (
        <p className="text-sm text-rose-600/90 animate-fade-slide-in">{EMPTY_NUDGE}</p>
      )}

      {response && !loading && (
        <div className="rounded-xl border border-rose-200/80 bg-white/95 p-4 shadow-sm animate-fade-slide-in">
          <p className="text-xs font-medium text-stone-500 mb-2">Anshit says 💭</p>
          <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
