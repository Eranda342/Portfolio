"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function CinematicBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      ref.current.style.setProperty("--mx", `${x}%`);
      ref.current.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" style={{ ["--mx" as any]: "50%", ["--my" as any]: "30%" }}>
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
        }}
      />
      {/* Mouse-tracked aurora */}
      <div
        className="absolute inset-0 transition-[background-position] duration-[400ms] ease-out"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(45,212,191,0.18), transparent 60%)",
        }}
      />
      {/* Drifting aurora orbs */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.22), transparent 60%)", filter: "blur(60px)" }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.18), transparent 60%)", filter: "blur(80px)" }}
        animate={{ x: [0, -100, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 60%)", filter: "blur(70px)" }}
        animate={{ x: [0, 60, -80, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />
    </div>
  );
}
