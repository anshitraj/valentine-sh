"use client";

import { useState } from "react";
import type { DayKey } from "@/app/types";
import { CalendarGrid } from "@/components/CalendarGrid";
import { GiftModal } from "@/components/GiftModal";
import { CountdownTimer } from "@/components/CountdownTimer";
import { LockedDayTimerModal } from "@/components/LockedDayTimerModal";
import { HeaderPanda } from "@/components/CuteDecorations";
import { SoundToggle } from "@/components/SoundToggle";

export default function Home() {
  const [openDay, setOpenDay] = useState<DayKey | null>(null);
  const [showFeb8Birthday, setShowFeb8Birthday] = useState(false);
  const [lockedDayTimer, setLockedDayTimer] = useState<DayKey | null>(null);

  return (
    <main className="min-h-screen px-4 py-8 pb-24 sm:py-12">
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
            <CountdownTimer sandboxMode={false} selectedLockedDay={lockedDayTimer} />
          </div>
        </header>
      </div>

      <CalendarGrid
        openDay={openDay}
        setOpenDay={setOpenDay}
        setShowFeb8Birthday={setShowFeb8Birthday}
        sandboxMode={false}
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
