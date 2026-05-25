"use client";

import { useEffect, useState } from "react";

/**
 * useCounter — animated number counter hook
 *
 * Counts from 0 to `target` over `duration` ms using rAF-based stepping.
 * Only starts when `active` is true (pair with useReveal for scroll-trigger).
 *
 * @param target   - Final value to count to
 * @param active   - Whether to start counting
 * @param duration - Total animation duration in ms (default: 2000)
 */
export function useCounter(
  target: number,
  active: boolean,
  duration = 2000
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let current = 0;
    const step = target / (duration / 16); // ~60fps
    let rafId: number;

    const tick = () => {
      current += step;
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(current));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, active, duration]);

  return count;
}
