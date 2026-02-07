"use client";

/**
 * Cute decorations: floating hearts/sparkles + big panda (cursor-tracking eyes)
 * + decorative animals (capybara, bunny, bear). Header panda stays in page.
 */

import { PandaWithTrackingEyes } from "@/components/PandaWithTrackingEyes";
import { DecorativeAnimals } from "@/components/DecorativeAnimals";
import { PandaThoughtBubble } from "@/components/PandaThoughtBubble";

const FLOATING_ICONS = [
  { icon: "💕", left: "10%", top: "20%", delay: 0 },
  { icon: "✨", left: "85%", top: "15%", delay: 1 },
  { icon: "⭐", left: "20%", top: "60%", delay: 2 },
  { icon: "💗", left: "75%", top: "35%", delay: 0.5 },
  { icon: "🌸", left: "5%", top: "45%", delay: 1.5 },
  { icon: "✨", left: "90%", top: "55%", delay: 2.5 },
  { icon: "💕", left: "50%", top: "25%", delay: 1 },
  { icon: "⭐", left: "30%", top: "75%", delay: 0 },
  { icon: "🌸", left: "65%", top: "70%", delay: 2 },
  { icon: "💗", left: "40%", top: "85%", delay: 1.2 },
];

/* Tiny panda for header */
function PandaTiny() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-panda-bounce opacity-80"
      style={{ animationDelay: "1s" }}
      aria-hidden
    >
      <circle cx="14" cy="15" r="10" fill="#2d2d2d" />
      <circle cx="14" cy="13" r="7" fill="white" />
      <circle cx="11" cy="12" r="2.5" fill="#2d2d2d" />
      <circle cx="17" cy="12" r="2.5" fill="#2d2d2d" />
      <circle cx="11.5" cy="11.5" r="0.8" fill="white" />
      <circle cx="17.5" cy="11.5" r="0.8" fill="white" />
      <ellipse cx="14" cy="15" rx="1.5" ry="1" fill="#2d2d2d" />
      <ellipse cx="9" cy="10" rx="2.5" ry="2" fill="#2d2d2d" />
      <ellipse cx="19" cy="10" rx="2.5" ry="2" fill="#2d2d2d" />
    </svg>
  );
}

export function CuteDecorations() {
  return (
    <>
      {/* Floating tiny hearts / sparkles / stars */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
        {FLOATING_ICONS.map((item, i) => (
          <span
            key={i}
            className="absolute text-lg sm:text-xl animate-float-decor"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: `${item.delay}s`,
              color: ["#fce7f0", "#e6e6fa", "#fff4c4", "#c7f0db", "#ffdab9"][i % 5],
              textShadow: "0 0 8px rgba(255,255,255,0.5)",
            }}
          >
            {item.icon}
          </span>
        ))}
      </div>

      {/* Big panda with cursor-tracking eyes (bottom-right) */}
      <PandaWithTrackingEyes />

      {/* Panda thought bubble (click any interactive element) */}
      <PandaThoughtBubble />

      {/* Decorative animals in corners (capybara, bunny, bear) */}
      <DecorativeAnimals />
    </>
  );
}

export function HeaderPanda() {
  return (
    <span className="inline-block ml-1.5 align-middle" aria-hidden>
      <PandaTiny />
    </span>
  );
}
