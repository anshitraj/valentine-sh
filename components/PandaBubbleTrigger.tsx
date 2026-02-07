"use client";

import { useEffect } from "react";
import { usePandaBubble } from "@/contexts/PandaBubbleContext";

const INTERACTIVE_SELECTOR = "button, a[href], [role='button']";

export function PandaBubbleTrigger() {
  const { showBubble } = usePandaBubble();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        showBubble();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [showBubble]);

  return null;
}
