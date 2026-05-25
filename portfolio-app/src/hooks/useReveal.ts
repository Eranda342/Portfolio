"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useReveal — IntersectionObserver scroll reveal hook
 *
 * Returns a ref to attach to a DOM element and a `visible` boolean
 * that becomes true once the element enters the viewport.
 * Disconnects after first trigger (once: true behaviour).
 *
 * @param threshold - Intersection ratio to trigger at (default: 0.12)
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
