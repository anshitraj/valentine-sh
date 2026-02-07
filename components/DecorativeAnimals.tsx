"use client";

/**
 * Decorative cute animals (capybara, bunny, bear) with cursor-tracking eyes.
 * Idle breathing + eyes follow cursor. Stay in background corners.
 */

import { useRef } from "react";
import { useCursorEyes } from "@/hooks/useCursorEyes";

function CapybaraWithEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilOffset = useCursorEyes(containerRef);
  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-90"
        aria-hidden
      >
        <ellipse cx="45" cy="58" rx="28" ry="18" fill="#8B7355" />
        <ellipse cx="45" cy="50" rx="22" ry="16" fill="#A0826D" />
        <ellipse cx="30" cy="48" rx="8" ry="6" fill="#8B7355" />
        <ellipse cx="60" cy="48" rx="8" ry="6" fill="#8B7355" />
        <circle cx="38" cy="44" r="5" fill="#6B5344" />
        <circle cx="52" cy="44" r="5" fill="#6B5344" />
        <g transform="translate(38, 44)">
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="2.5" fill="#2d2d2d" />
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="0.8" fill="white" />
        </g>
        <g transform="translate(52, 44)">
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="2.5" fill="#2d2d2d" />
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="0.8" fill="white" />
        </g>
        <ellipse cx="45" cy="52" rx="4" ry="3" fill="#5D4E37" />
        <ellipse cx="22" cy="42" rx="6" ry="5" fill="#A0826D" />
        <ellipse cx="68" cy="42" rx="6" ry="5" fill="#A0826D" />
      </svg>
    </div>
  );
}

function BunnyWithEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilOffset = useCursorEyes(containerRef);
  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        width="85"
        height="85"
        viewBox="0 0 85 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-90"
        aria-hidden
      >
        <ellipse cx="42" cy="55" rx="20" ry="16" fill="#f5f5f5" stroke="#ddd" strokeWidth="1" />
        <circle cx="42" cy="42" r="18" fill="#fafafa" stroke="#e0e0e0" strokeWidth="1" />
        <ellipse cx="42" cy="68" rx="6" ry="4" fill="#f5f5f5" />
        <path d="M20 25 L22 8 L24 25" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M61 25 L63 8 L65 25" stroke="#ddd" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="35" cy="40" r="6" fill="#e8e8e8" />
        <circle cx="49" cy="40" r="6" fill="#e8e8e8" />
        <g transform="translate(35, 40)">
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="2.5" fill="#2d2d2d" />
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="0.9" fill="white" />
        </g>
        <g transform="translate(49, 40)">
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="2.5" fill="#2d2d2d" />
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="0.9" fill="white" />
        </g>
        <ellipse cx="42" cy="48" rx="3" ry="2" fill="#f0a0a0" />
        <path d="M38 52 Q42 56 46 52" stroke="#f0a0a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function BearWithEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilOffset = useCursorEyes(containerRef);
  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        width="88"
        height="88"
        viewBox="0 0 88 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-90"
        aria-hidden
      >
        <ellipse cx="44" cy="58" rx="26" ry="18" fill="#6B4423" />
        <ellipse cx="44" cy="42" rx="22" ry="20" fill="#8B6914" />
        <circle cx="36" cy="38" r="7" fill="#7a5a2a" />
        <circle cx="52" cy="38" r="7" fill="#7a5a2a" />
        <g transform="translate(36, 38)">
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="3" fill="#2d2d2d" />
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="1" fill="white" />
        </g>
        <g transform="translate(52, 38)">
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="3" fill="#2d2d2d" />
          <circle cx={pupilOffset.x} cy={pupilOffset.y} r="1" fill="white" />
        </g>
        <ellipse cx="44" cy="46" rx="5" ry="4" fill="#5D4E37" />
        <ellipse cx="26" cy="34" rx="8" ry="7" fill="#6B4423" />
        <ellipse cx="62" cy="34" rx="8" ry="7" fill="#6B4423" />
        <path d="M32 62 Q44 70 56 62" stroke="#6B4423" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function DecorativeAnimals() {
  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[1] w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
        style={{ transform: "translate(4%, 8%)" }}
        aria-hidden
      >
        <div className="w-full h-full animate-idle-breathing flex items-center justify-center">
          <CapybaraWithEyes />
        </div>
      </div>
      <div
        className="pointer-events-none fixed right-0 top-0 z-[1] w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
        style={{ transform: "translate(-4%, 8%)" }}
        aria-hidden
      >
        <div className="w-full h-full animate-idle-breathing flex items-center justify-center" style={{ animationDelay: "0.8s" }}>
          <BunnyWithEyes />
        </div>
      </div>
      <div
        className="pointer-events-none fixed bottom-0 left-0 z-[1] w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
        style={{ transform: "translate(4%, 12%)" }}
        aria-hidden
      >
        <div className="w-full h-full animate-idle-breathing flex items-center justify-center" style={{ animationDelay: "1.2s" }}>
          <BearWithEyes />
        </div>
      </div>
    </>
  );
}
