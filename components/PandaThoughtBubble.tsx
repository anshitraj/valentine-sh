"use client";

import { usePandaBubble } from "@/contexts/PandaBubbleContext";

export function PandaThoughtBubble() {
  const { visible } = usePandaBubble();

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[100] animate-panda-bubble-pop bottom-20 right-4 sm:bottom-24 sm:right-6 max-w-[260px]"
      aria-live="polite"
      aria-hidden
    >
      <div className="rounded-2xl bg-white px-4 py-3 shadow-lg border border-rose-200 text-left">
        <p className="text-sm leading-snug font-medium" style={{ color: "#292524" }}>
          Ohhh 👀 you clicked something Anshit sent you
        </p>
      </div>
      {/* Small tail pointing toward panda */}
      <div
        className="absolute -right-2 bottom-0 w-3 h-3 rotate-45 bg-white border-r border-b border-rose-200"
        style={{ bottom: "-6px" }}
      />
    </div>
  );
}
