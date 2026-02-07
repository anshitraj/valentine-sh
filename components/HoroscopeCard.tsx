"use client";

import { useState } from "react";

const ZODIAC_OPTIONS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const FALLBACK_HOROSCOPE = "There might be someone in your life whose name starts with the letter A, and they could be special ✨";

export function HoroscopeCard() {
  const [zodiac, setZodiac] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = zodiac.trim();
    if (!value) return;
    setLoading(true);
    setResponse(null);
    fetch("/api/fun", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "horoscope", input: value }),
    })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => {
        setResponse(typeof data?.message === "string" ? data.message : FALLBACK_HOROSCOPE);
      })
      .catch(() => setResponse(FALLBACK_HOROSCOPE))
      .finally(() => setLoading(false));
  };

  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/80 p-4 mt-4 space-y-3">
      <p className="text-sm text-stone-700">
        Hey Srushti 👀<br />
        You didn&apos;t tell me your zodiac sign…<br />
        Enter it to see what&apos;s coming for you ✨
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
          className="w-full rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
          disabled={loading}
          required
          aria-label="Zodiac sign"
        >
          <option value="">Choose your sign</option>
          {ZODIAC_OPTIONS.map((sign) => (
            <option key={sign} value={sign}>{sign}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-rose-700 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        >
          {loading ? "Thinking… ✨" : "Generate horoscope 🔮"}
        </button>
      </form>
      {response && !loading && (
        <div className="rounded-xl border border-rose-200/80 bg-white/95 p-3 animate-fade-slide-in">
          <p className="text-xs font-medium text-stone-500 mb-1.5">Your fun horoscope ✨</p>
          <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
