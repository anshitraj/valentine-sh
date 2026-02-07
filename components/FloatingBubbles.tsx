"use client";

/**
 * Non-interactive floating translucent bubbles in the background.
 * Slow vertical movement, different sizes, very low opacity.
 */
const BUBBLES = [
  { size: 80, left: "5%", delay: 0, duration: 22 },
  { size: 120, left: "15%", delay: 2, duration: 20 },
  { size: 60, left: "25%", delay: 4, duration: 24 },
  { size: 100, left: "35%", delay: 1, duration: 19 },
  { size: 70, left: "45%", delay: 3, duration: 21 },
  { size: 90, left: "55%", delay: 5, duration: 23 },
  { size: 110, left: "65%", delay: 2, duration: 18 },
  { size: 65, left: "75%", delay: 6, duration: 25 },
  { size: 85, left: "85%", delay: 1, duration: 20 },
  { size: 95, left: "92%", delay: 4, duration: 22 },
  { size: 75, left: "8%", delay: 7, duration: 26 },
  { size: 105, left: "50%", delay: 3, duration: 19 },
  { size: 55, left: "70%", delay: 5, duration: 23 },
  { size: 88, left: "22%", delay: 2, duration: 21 },
  { size: 72, left: "78%", delay: 4, duration: 20 },
];

export function FloatingBubbles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-bubble-float"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: "-10%",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
