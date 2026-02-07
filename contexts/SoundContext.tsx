"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY_MUTE = "valentine-sound-muted";
const STORAGE_KEY_FIRST_VISIT = "valentine-first-visit-done";

function getStoredMute(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY_MUTE) === "1";
  } catch {
    return false;
  }
}

function getFirstVisitDone(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(STORAGE_KEY_FIRST_VISIT) === "1";
  } catch {
    return true;
  }
}

function setFirstVisitDone(): void {
  try {
    localStorage.setItem(STORAGE_KEY_FIRST_VISIT, "1");
  } catch {}
}

type SoundContextValue = {
  muted: boolean;
  toggleMute: () => void;
  playWelcome: () => void;
  playGiftOpen: () => void;
  playBirthday: () => void;
  playBubblePop: () => void;
  playCakeCut: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const VOL = 0.22;
const POP_VOL = 0.18;

function useAudioContext(): AudioContext | null {
  const ref = useRef<AudioContext | null>(null);
  if (typeof window === "undefined") return null;
  if (!ref.current) ref.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  return ref.current;
}

function playTone(
  ctx: AudioContext,
  freq: number,
  duration: number,
  vol: number,
  type: OscillatorType = "sine",
  startTime?: number
): void {
  const now = startTime ?? ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

function playNoise(ctx: AudioContext, duration: number, vol: number, startTime?: number): void {
  const now = startTime ?? ctx.currentTime;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * vol;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  src.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(vol, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  src.start(now);
  src.stop(now + duration);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(false);
  const welcomePlayed = useRef(false);
  const audioCtx = useAudioContext();

  useEffect(() => {
    setMutedState(getStoredMute());
  }, []);

  const setMuted = useCallback((value: boolean) => {
    setMutedState(value);
    try {
      localStorage.setItem(STORAGE_KEY_MUTE, value ? "1" : "0");
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    setMutedState((m) => {
      const next = !m;
      try {
        localStorage.setItem(STORAGE_KEY_MUTE, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  const play = useCallback(
    (fn: (ctx: AudioContext) => void) => {
      if (muted || !audioCtx) return;
      try {
        if (audioCtx.state === "suspended") {
          audioCtx.resume().then(() => fn(audioCtx));
        } else {
          fn(audioCtx);
        }
      } catch {}
    },
    [muted, audioCtx]
  );

  const playWelcome = useCallback(() => {
    play((ctx) => {
      const t = ctx.currentTime;
      playTone(ctx, 523.25, 0.12, VOL, "sine", t);
      playTone(ctx, 659.25, 0.12, VOL, "sine", t + 0.14);
      playTone(ctx, 783.99, 0.25, VOL, "sine", t + 0.28);
    });
  }, [play]);

  const playGiftOpen = useCallback(() => {
    play((ctx) => {
      const t = ctx.currentTime;
      playTone(ctx, 523.25, 0.1, VOL, "sine", t);
      playTone(ctx, 783.99, 0.35, VOL, "sine", t + 0.12);
    });
  }, [play]);

  const playBirthday = useCallback(() => {
    play((ctx) => {
      const t = ctx.currentTime;
      const notes = [261.63, 261.63, 293.66, 261.63, 349.23]; // first phrase
      const durs = [0.08, 0.08, 0.12, 0.12, 0.3];
      let at = t;
      notes.forEach((f, i) => {
        playTone(ctx, f, durs[i], VOL, "sine", at);
        at += durs[i] + 0.02;
      });
    });
  }, [play]);

  const playBubblePop = useCallback(() => {
    play((ctx) => {
      const t = ctx.currentTime;
      playTone(ctx, 880, 0.04, POP_VOL, "sine", t);
      playNoise(ctx, 0.06, POP_VOL * 0.6, t);
    });
  }, [play]);

  const playCakeCut = useCallback(() => {
    play((ctx) => {
      const t = ctx.currentTime;
      playTone(ctx, 200, 0.05, VOL * 0.8, "sine", t);
      playNoise(ctx, 0.04, VOL * 0.4, t + 0.02);
    });
  }, [play]);

  // First-visit welcome: play once after a short delay when unmuted and first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (muted || welcomePlayed.current || getFirstVisitDone()) return;
    const id = setTimeout(() => {
      if (welcomePlayed.current || getFirstVisitDone()) return;
      welcomePlayed.current = true;
      setFirstVisitDone();
      playWelcome();
    }, 600);
    return () => clearTimeout(id);
  }, [muted, playWelcome]);

  const value: SoundContextValue = {
    muted,
    toggleMute,
    playWelcome,
    playGiftOpen,
    playBirthday,
    playBubblePop,
    playCakeCut,
  };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return {
      muted: true,
      toggleMute: () => {},
      playWelcome: () => {},
      playGiftOpen: () => {},
      playBirthday: () => {},
      playBubblePop: () => {},
      playCakeCut: () => {},
    };
  }
  return ctx;
}
