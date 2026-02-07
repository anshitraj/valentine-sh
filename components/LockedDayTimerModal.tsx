"use client";

import { useEffect, useState } from "react";
import type { DayKey } from "@/app/page";

const DAY_LABELS: Record<DayKey, string> = {
  7: "Rose Day",
  8: "Propose Day",
  9: "Chocolate Day",
  10: "Teddy Day",
  11: "Promise Day",
  12: "Hug Day",
  13: "Mood & Care",
  14: "Valentine's Day",
};

function getTargetForDay(day: DayKey): Date {
  const now = new Date();
  const year = now.getFullYear();
  const feb = 1;
  return new Date(year, feb, day, 0, 0, 0, 0);
}

function formatUnlockTime(day: DayKey): string {
  const target = getTargetForDay(day);
  return target.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDiff(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

type Props = { day: DayKey; onClose: () => void };

function getInitialCountdown(day: DayKey): string {
  const target = getTargetForDay(day);
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return "Unlocked!";
  return formatDiff(ms);
}

export function LockedDayTimerModal({ day, onClose }: Props) {
  const [countdown, setCountdown] = useState(() => getInitialCountdown(day));

  useEffect(() => {
    const target = getTargetForDay(day);
    const tick = () => {
      const ms = target.getTime() - Date.now();
      if (ms <= 0) {
        setCountdown("Unlocked!");
        return;
      }
      setCountdown(formatDiff(ms));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [day]);

  return (
    <>
      <div
        className="fixed inset-0 z-[110] bg-black/25 animate-fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed left-1/2 top-1/2 z-[120] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-[2rem] p-6 shadow-modal-cute border border-stone-200/80 animate-modal-in relative overflow-visible"
        style={{ backgroundColor: "rgb(255 255 255)" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Countdown for Feb ${day}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute left-4 top-4 text-lg opacity-40" aria-hidden>🔒</span>
        <span className="absolute right-12 top-4 text-lg opacity-30" aria-hidden>💗</span>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted hover:bg-rose-100 hover:text-rose-700 transition-colors"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center pt-2">
          <p className="font-serif text-xl font-semibold text-rose-700">
            Feb {day} — {DAY_LABELS[day]}
          </p>
          <p className="mt-2 text-sm text-stone-600">Unlocks at {formatUnlockTime(day)}</p>
          <p className="mt-5 text-3xl sm:text-4xl font-bold tabular-nums text-rose-600" style={{ color: "#be123c" }}>
            {countdown}
          </p>
          <p className="mt-2 text-sm text-stone-500">left until this gift opens</p>
        </div>
      </div>
    </>
  );
}
