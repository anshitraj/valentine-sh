"use client";

import { useRef, useState, useEffect } from "react";

const PUPIL_MAX_OFFSET = 3.5;
const LERP = 0.12;
const RETURN_LERP = 0.06;

/**
 * Returns smooth pupil offset { x, y } for cursor-following eyes.
 * Uses container's center as "face" reference. Call from a component that has a ref to its container.
 */
export function useCursorEyes(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const mouseInWindowRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getTargetFromMouse = (mouseX: number, mouseY: number) => {
      const rect = container.getBoundingClientRect();
      const faceX = rect.left + rect.width * 0.5;
      const faceY = rect.top + rect.height * 0.42;
      const dx = mouseX - faceX;
      const dy = mouseY - faceY;
      const len = Math.hypot(dx, dy);
      if (len < 15) return { x: 0, y: 0 };
      const scale = Math.min(1, 100 / len);
      return {
        x: (dx / len) * PUPIL_MAX_OFFSET * scale,
        y: (dy / len) * PUPIL_MAX_OFFSET * scale,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseInWindowRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      targetRef.current = getTargetFromMouse(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouseInWindowRef.current = false;
      targetRef.current = { x: 0, y: 0 };
    };

    const tick = () => {
      const container = containerRef.current;
      if (container && mouseInWindowRef.current) {
        const mouse = lastMouseRef.current;
        targetRef.current = getTargetFromMouse(mouse.x, mouse.y);
      }
      const target = targetRef.current;
      const current = currentRef.current;
      const isReturning = target.x === 0 && target.y === 0;
      const t = isReturning ? RETURN_LERP : LERP;
      const next = {
        x: current.x + (target.x - current.x) * t,
        y: current.y + (target.y - current.y) * t,
      };
      currentRef.current = next;
      setPupilOffset({ ...next });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return pupilOffset;
}
