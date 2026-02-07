"use client";

import { useRef } from "react";
import { useCursorEyes } from "@/hooks/useCursorEyes";

export function PandaWithTrackingEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pupilOffset = useCursorEyes(containerRef);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed bottom-0 right-0 z-[1] flex items-end justify-end"
      style={{ transform: "translateY(8%)" }}
      aria-hidden
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]"
      >
        {/* Body */}
        <ellipse cx="70" cy="88" rx="32" ry="24" fill="#2d2d2d" />
        <ellipse cx="70" cy="72" rx="28" ry="24" fill="white" />
        {/* Nose */}
        <ellipse cx="70" cy="78" rx="6" ry="5" fill="#2d2d2d" />
        {/* Ears */}
        <ellipse cx="44" cy="52" rx="10" ry="9" fill="#2d2d2d" />
        <ellipse cx="96" cy="52" rx="10" ry="9" fill="#2d2d2d" />
        {/* Left eye (white + patch) */}
        <ellipse cx="54" cy="64" rx="10" ry="9" fill="#2d2d2d" />
        <circle cx="54" cy="64" r="7" fill="white" />
        <g transform={`translate(54, 64)`}>
          <circle
            cx={pupilOffset.x}
            cy={pupilOffset.y}
            r="3"
            fill="#2d2d2d"
          />
          <circle
            cx={pupilOffset.x}
            cy={pupilOffset.y}
            r="1"
            fill="white"
          />
        </g>
        {/* Right eye */}
        <ellipse cx="86" cy="64" rx="10" ry="9" fill="#2d2d2d" />
        <circle cx="86" cy="64" r="7" fill="white" />
        <g transform={`translate(86, 64)`}>
          <circle
            cx={pupilOffset.x}
            cy={pupilOffset.y}
            r="3"
            fill="#2d2d2d"
          />
          <circle
            cx={pupilOffset.x}
            cy={pupilOffset.y}
            r="1"
            fill="white"
          />
        </g>
        {/* Feet */}
        <path
          d="M44 108 Q70 118 96 108"
          stroke="#2d2d2d"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
