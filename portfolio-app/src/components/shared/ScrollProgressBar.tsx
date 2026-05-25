"use client";

import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgressBar — Fixed top progress indicator
 * Uses Framer Motion spring for smooth tracking.
 * Sits above the navbar (z-60).
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, rgba(45,212,191,0) 0%, rgba(45,212,191,1) 50%, rgba(6,182,212,1) 100%)",
        boxShadow: "0 0 12px rgba(45,212,191,0.6)",
        zIndex: 60,
      }}
    />
  );
}
