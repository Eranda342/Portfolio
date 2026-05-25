"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * GlobeVisualization — The exact Figma SVG wireframe globe restored.
 */
export function GlobeVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yGlobe = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacityWave = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative w-full h-[600px] flex items-center justify-center pointer-events-none">
      {/* Animated waves */}
      <motion.svg
        viewBox="0 0 1200 400"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[400px] pointer-events-none"
        style={{ opacity: opacityWave }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(45,212,191,0)" />
            <stop offset="0.5" stopColor="rgba(45,212,191,0.7)" />
            <stop offset="1" stopColor="rgba(45,212,191,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M 0 ${200 + i * 10} Q 300 ${150 - i * 30} 600 ${200 + i * 5} T 1200 ${200 - i * 10}`}
            stroke="url(#waveGrad)"
            strokeWidth={0.8 + i * 0.2}
            fill="none"
            animate={{
              d: [
                `M 0 ${200 + i * 10} Q 300 ${150 - i * 30} 600 ${200 + i * 5} T 1200 ${200 - i * 10}`,
                `M 0 ${200 + i * 10} Q 300 ${250 - i * 20} 600 ${160 + i * 5} T 1200 ${220 - i * 10}`,
                `M 0 ${200 + i * 10} Q 300 ${150 - i * 30} 600 ${200 + i * 5} T 1200 ${200 - i * 10}`,
              ],
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* moving dots along path */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`dot-${i}`}
            r="3"
            fill="#fff"
            animate={{ cx: [0, 600, 1200], cy: [200, 180 - i * 8, 200] }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2 }}
          />
        ))}
      </motion.svg>

      <motion.div
        style={{ y: yGlobe, rotate }}
        className="mx-auto relative w-[min(85vw,420px)] h-[min(85vw,420px)] sm:w-[520px] sm:h-[520px]"
      >
        {/* Globe wireframe */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          animate={{ rotateY: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ filter: "drop-shadow(0 0 40px rgba(45,212,191,0.25))" }}
        >
          <defs>
            <radialGradient id="globeFill" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#1a3d3a" />
              <stop offset="60%" stopColor="#0a1a1a" />
              <stop offset="100%" stopColor="#050a0c" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#globeFill)" />
          {/* Latitude lines */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const ry = 90 * Math.sin(((i + 1) * Math.PI) / 8);
            return (
              <ellipse
                key={`lat-${i}`}
                cx="100"
                cy={100 - 90 * Math.cos(((i + 1) * Math.PI) / 8)}
                rx={ry}
                ry={ry * 0.18}
                fill="none"
                stroke="rgba(45,212,191,0.25)"
                strokeWidth="0.4"
              />
            );
          })}
          {/* Longitude lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={`lon-${i}`}
              cx="100"
              cy="100"
              rx={90 * Math.abs(Math.cos((i * Math.PI) / 6))}
              ry="90"
              fill="none"
              stroke="rgba(45,212,191,0.18)"
              strokeWidth="0.4"
            />
          ))}
          {/* surface highlights */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(45,212,191,0.5)" strokeWidth="0.6" />
        </motion.svg>

        {/* Annotation pins */}
        {[
          { top: "6%", left: "-2%", label: "Ideate. Develop.", line2: "Launch. Grow." },
          { top: "4%", right: "-4%", label: "Think Smart. Build", line2: "Fast. Scale Strong." },
          { bottom: "8%", left: "0%", label: "Ship to Production.", line2: "Every Sprint." },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }}
            className="absolute"
            // @ts-expect-error style object keys
            style={p}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="relative px-3 py-2 rounded-lg glass-medium text-[11px] text-white/85 font-sans leading-tight whitespace-nowrap"
            >
              {p.label}<br />{p.line2}
              <span
                className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-teal-300"
                style={{ boxShadow: "0 0 10px rgba(45,212,191,0.8)" }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* pulse anchor dots on globe surface */}
        {[
          { top: "32%", left: "30%" },
          { top: "28%", right: "28%" },
          { bottom: "32%", left: "28%" },
          { top: "55%", left: "55%" },
        ].map((a, i) => (
          <motion.span
            key={`anchor-${i}`}
            className="absolute w-2 h-2 rounded-full bg-white"
            // @ts-expect-error style object keys
            style={a}
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
