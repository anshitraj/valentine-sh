"use client";

import { useEffect, useMemo, useState } from "react";

const FEB = 1;
const DAYS: number[] = [7, 8, 9, 10, 11, 12, 13, 14];

function getNextUnlockDay(): { day: number; target: Date } | null {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  if (month < FEB) {
    return { day: 7, target: new Date(year, FEB, 7, 0, 0, 0, 0) };
  }
  if (month > FEB) return null; // all unlocked

  for (const d of DAYS) {
    if (date < d) {
      const target = new Date(year, FEB, d, 0, 0, 0, 0);
      return { day: d, target };
    }
  }
  return null;
}

function formatDiff(ms: number): { hours: number; minutes: number; seconds: number } {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

type Props = { sandboxMode: boolean; selectedLockedDay?: number | null };

export function CountdownTimer({ sandboxMode, selectedLockedDay }: Props) {
  const [next, setNext] = useState<{ day: number; target: Date } | null>(null);
  const [diff, setDiff] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    setNext(getNextUnlockDay());
  }, []);

  // When user tapped a locked day (e.g. Chocolate Day = Feb 9), show that day's countdown in the header
  const displayDay = useMemo(
    () =>
      selectedLockedDay != null
        ? { day: selectedLockedDay, target: new Date(new Date().getFullYear(), FEB, selectedLockedDay, 0, 0, 0, 0) }
        : next,
    [selectedLockedDay, next]
  );

  useEffect(() => {
    if (sandboxMode || !displayDay) {
      setDiff(null);
      return;
    }
    const tick = () => {
      const ms = displayDay.target.getTime() - Date.now();
      if (ms <= 0 && !selectedLockedDay) {
        setNext(getNextUnlockDay());
        return;
      }
      setDiff(formatDiff(Math.max(0, ms)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sandboxMode, displayDay, selectedLockedDay]);

  if (sandboxMode) {
    return (
      <p className="text-xs sm:text-sm text-muted font-medium">
        Sandbox — all days unlocked
      </p>
    );
  }

  if (!displayDay || !diff) {
    return (
      <p className="text-xs sm:text-sm text-muted font-medium">
        All days unlocked this week
      </p>
    );
  }

  return (
    <p className="text-base sm:text-lg font-medium tabular-nums px-4 py-2 rounded-xl bg-white/90 border border-rose-100 shadow-sm inline-block">
      <span className="text-rose-600 font-bold" style={{ color: "#be123c" }}>{diff.hours}h {diff.minutes}m {diff.seconds}s</span>
      <span className="ml-1.5 text-stone-600">left until Feb {displayDay.day}</span>
    </p>
  );
}
