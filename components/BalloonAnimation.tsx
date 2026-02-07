"use client";

import { useEffect, useState } from "react";

const BALLOON_COLORS = [
  "#f9a8d4", // pink
  "#fbcfe8", // light pink
  "#fecaca", // peach/rose
  "#e9d5ff", // lavender
  "#ddd6fe", // light lavender
  "#fed7aa", // peach
];

function Balloon({ color, delay, left }: { color: string; delay: number; left: number }) {
  return (
    <div
      className="absolute bottom-0 w-8 h-10 sm:w-10 sm:h-12 rounded-full opacity-90"
      style={{
        left: `${left}%`,
        background: `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)`,
        boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.4)",
        animation: "balloon-float 3.5s ease-out forwards",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

type Props = { onDone?: () => void };

export function BalloonAnimation({ onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
      aria-hidden
    >
      {BALLOON_COLORS.flatMap((color, i) =>
        [0, 1, 2].map((j) => (
          <Balloon
            key={`${i}-${j}`}
            color={color}
            delay={j * 0.2 + i * 0.15}
            left={12 + (i * 3 + j) * 10}
          />
        ))
      )}
    </div>
  );
}
