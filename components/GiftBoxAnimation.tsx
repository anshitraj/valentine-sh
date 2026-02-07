"use client";

import { useEffect, useState } from "react";

type Props = { onComplete: () => void };

export function GiftBoxAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"idle" | "open" | "glow" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("open"), 100);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const t2 = setTimeout(() => setPhase("glow"), 600);
    return () => clearTimeout(t2);
  }, [phase]);

  useEffect(() => {
    if (phase !== "glow") return;
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 800);
    return () => clearTimeout(t3);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 animate-fade-in">
      <div className="relative flex flex-col items-center justify-center">
        {/* Gift box base */}
        <div
          className={`relative w-32 h-28 sm:w-40 sm:h-32 rounded-b-lg transition-all duration-500 ${
            phase === "open" || phase === "glow" || phase === "done"
              ? "scale-110"
              : "scale-100"
          }`}
          style={{
            background: "linear-gradient(180deg, #e11d48 0%, #be123c 50%, #9f1239 100%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {/* Ribbon vertical */}
          <div
            className="absolute left-1/2 top-0 w-3 -translate-x-1/2 h-full rounded-sm bg-rose-300/90"
            style={{ boxShadow: "inset 0 0 8px rgba(255,255,255,0.4)" }}
          />
          {/* Ribbon horizontal */}
          <div
            className="absolute top-1/2 left-0 w-full h-3 -translate-y-1/2 rounded-sm bg-rose-300/90"
            style={{ boxShadow: "inset 0 0 8px rgba(255,255,255,0.4)" }}
          />
          {/* Bow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-8 flex justify-center">
            <div
              className="absolute w-6 h-6 rounded-full bg-rose-400"
              style={{
                boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.2)",
                transform: "translateX(-50%) scaleY(1.2)",
              }}
            />
            <div
              className="absolute w-6 h-6 rounded-full bg-rose-400 left-0"
              style={{
                boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.2)",
                transform: "translateX(-80%) scaleY(1.2)",
              }}
            />
            <div
              className="absolute w-6 h-6 rounded-full bg-rose-400 left-6"
              style={{
                boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.2)",
                transform: "translateX(-20%) scaleY(1.2)",
              }}
            />
          </div>
        </div>

        {/* Lid - opens upward */}
        <div
          className={`absolute w-32 h-6 sm:w-40 sm:h-7 rounded-t-lg origin-bottom transition-transform duration-700 ease-out ${
            phase === "open" || phase === "glow" || phase === "done"
              ? "-translate-y-full rotate-[-55deg]"
              : "translate-y-0 rotate-0"
          }`}
          style={{
            background: "linear-gradient(180deg, #f43f5e 0%, #e11d48 60%, #be123c 100%)",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.25)",
            top: "-1.5rem",
          }}
        >
          <div
            className="absolute left-1/2 top-0 w-3 -translate-x-1/2 h-full rounded-t-sm bg-rose-300/80"
            style={{ boxShadow: "inset 0 0 6px rgba(255,255,255,0.3)" }}
          />
        </div>

        {/* Sparkle / glow when open */}
        {(phase === "glow" || phase === "done") && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full bg-rose-400/30 animate-ping" style={{ animationDuration: "1.5s" }} />
            <div className="absolute text-4xl animate-bounce">✨</div>
          </div>
        )}

        {phase === "idle" && (
          <p className="mt-6 text-white/90 text-sm font-medium animate-pulse">Tap to open...</p>
        )}
        {(phase === "open" || phase === "glow") && (
          <p className="mt-6 text-white/90 text-sm font-medium">Opening...</p>
        )}
      </div>
    </div>
  );
}
