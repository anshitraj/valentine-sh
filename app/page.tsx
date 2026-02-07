"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarGrid } from "@/components/CalendarGrid";
import { GiftModal } from "@/components/GiftModal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LockedDayTimerModal } from "@/components/LockedDayTimerModal";
import { HeaderPanda } from "@/components/CuteDecorations";
import { SoundToggle } from "@/components/SoundToggle";

const SANDBOX_STORAGE_KEY = "valentine-sandbox-mode";

export type DayKey = 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

function getStoredSandbox(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SANDBOX_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Home() {
  const [openDay, setOpenDay] = useState<DayKey | null>(null);
  const [showFeb8Birthday, setShowFeb8Birthday] = useState(false);
  const [sandboxMode, setSandboxModeState] = useState(false);
  const [lockedDayTimer, setLockedDayTimer] = useState<DayKey | null>(null);

  // Hydrate sandbox from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setSandboxModeState(getStoredSandbox());
  }, []);

  const setSandboxMode = (value: boolean) => {
    setSandboxModeState(value);
    try {
      localStorage.setItem(SANDBOX_STORAGE_KEY, value ? "1" : "0");
    } catch {}
  };

  return (
    <main className="min-h-screen px-4 py-8 pb-24 sm:py-12">
      <nav className="flex justify-center items-center gap-4 mb-2">
        <Link
          href="/gentle-days"
          className="text-sm text-muted hover:text-rose-600 transition-colors duration-300"
        >
          View as list →
        </Link>
        <label htmlFor="sandbox-toggle" className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-sm text-muted">Sandbox</span>
          <input
            id="sandbox-toggle"
            type="checkbox"
            checked={sandboxMode}
            onChange={(e) => setSandboxMode(e.target.checked)}
            className="w-4 h-4 rounded border-lavender text-rose-600 focus:ring-rose-500 cursor-pointer accent-peach"
          />
        </label>
      </nav>
      <div className="relative mx-auto max-w-lg mb-10">
        <div className="absolute right-0 top-0 z-10">
          <SoundToggle />
        </div>
        <header className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-rose-600 mb-1 inline-flex items-center justify-center gap-1">
            Valentine&apos;s Week
            <HeaderPanda />
          </h1>
          <p className="text-muted text-sm sm:text-base">
            Feb 7 → Feb 14 · For Srushti <span className="sparkle inline-block">🌸</span>
          </p>
          <div className="mt-3">
            <CountdownTimer sandboxMode={sandboxMode} selectedLockedDay={lockedDayTimer} />
          </div>
        </header>
      </div>

      <CalendarGrid
        openDay={openDay}
        setOpenDay={setOpenDay}
        setShowFeb8Birthday={setShowFeb8Birthday}
        sandboxMode={sandboxMode}
        setLockedDayTimer={setLockedDayTimer}
      />

      {lockedDayTimer && (
        <LockedDayTimerModal
          day={lockedDayTimer}
          onClose={() => setLockedDayTimer(null)}
        />
      )}

      <GiftModal
        day={openDay}
        onClose={() => setOpenDay(null)}
        showFeb8Birthday={showFeb8Birthday}
        setShowFeb8Birthday={setShowFeb8Birthday}
      />
    </main>
  );
}
