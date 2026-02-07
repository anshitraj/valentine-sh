"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const BUBBLE_DURATION_MS = 2500;

type PandaBubbleContextValue = {
  visible: boolean;
  showBubble: () => void;
};

const PandaBubbleContext = createContext<PandaBubbleContextValue | null>(null);

export function PandaBubbleProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showBubble = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, BUBBLE_DURATION_MS);
  }, []);

  return (
    <PandaBubbleContext.Provider value={{ visible, showBubble }}>
      {children}
    </PandaBubbleContext.Provider>
  );
}

export function usePandaBubble() {
  const ctx = useContext(PandaBubbleContext);
  if (!ctx) return { visible: false, showBubble: () => {} };
  return ctx;
}
