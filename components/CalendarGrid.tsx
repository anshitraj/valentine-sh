"use client";

import type { DayKey } from "@/app/page";
import { DayTile } from "./DayTile";

const DAYS: DayKey[] = [7, 8, 9, 10, 11, 12, 13, 14];

function getTodayLocal(): { year: number; month: number; date: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), date: now.getDate() };
}

function isUnlocked(day: DayKey): boolean {
  const { month, date } = getTodayLocal();
  const feb = 1;
  if (month < feb) return false;
  if (month > feb) return true;
  return date >= day;
}

function isToday(day: DayKey): boolean {
  const { month, date } = getTodayLocal();
  return month === 1 && date === day;
}

function formatUnlockDate(day: DayKey): string {
  return `Feb ${day}`;
}

type Props = {
  openDay: DayKey | null;
  setOpenDay: (day: DayKey | null) => void;
  setShowFeb8Birthday: (v: boolean) => void;
  sandboxMode: boolean;
  setLockedDayTimer: (day: DayKey | null) => void;
};

export function CalendarGrid({ openDay, setOpenDay, setShowFeb8Birthday, sandboxMode, setLockedDayTimer }: Props) {
  const unlocked = (day: DayKey) => sandboxMode || isUnlocked(day);

  const handleDayClick = (day: DayKey) => {
    if (unlocked(day)) {
      if (day === 8) {
        setShowFeb8Birthday(true);
        setOpenDay(8);
      } else {
        setOpenDay(day);
      }
    } else {
      setLockedDayTimer(day);
    }
  };

  return (
    <div className="mx-auto max-w-2xl relative z-10 px-1">
      {/* Rounded pastel blobs behind cards (decorative) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl -z-10" aria-hidden>
        <div className="absolute w-40 h-40 rounded-full bg-peach/30 blur-2xl -top-8 -left-4" />
        <div className="absolute w-32 h-32 rounded-full bg-lavender/35 blur-2xl top-1/4 right-0" />
        <div className="absolute w-36 h-36 rounded-full bg-baby-blue/25 blur-2xl bottom-1/4 -left-6" />
        <div className="absolute w-28 h-28 rounded-full bg-mint-green/30 blur-2xl bottom-0 right-1/4" />
        <div className="absolute w-24 h-24 rounded-full bg-soft-yellow/25 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 relative z-10">
        {DAYS.map((day) => (
          <div key={day} className="relative z-10">
            <DayTile
              day={day}
              isLocked={!unlocked(day)}
              isToday={isToday(day)}
              unlockDateStr={formatUnlockDate(day)}
              onClick={() => handleDayClick(day)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
