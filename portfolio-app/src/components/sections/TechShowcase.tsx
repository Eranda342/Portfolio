"use client";

import { motion } from "framer-motion";
import { TECH_SHOWCASE } from "@/data/portfolio";

export function TechShowcase() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
            className="inline-block px-4 py-1.5 rounded-full border border-teal-300/30 text-[11px] text-teal-300 font-mono uppercase tracking-widest mb-6 bg-teal-500/[0.04]"
          >
            Sub Title
          </motion.span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white" style={{ letterSpacing: "-0.03em" }}>
            Modern Technologies & Platforms I Use<span className="text-teal-300">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5">
          {TECH_SHOWCASE.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.05 }}
              className={`group relative h-24 rounded-2xl flex items-center justify-center cursor-default transition-colors duration-500 ${
                tech.glow
                  ? "bg-[#0A0C0E] border border-teal-300/70"
                  : "bg-transparent border border-white/[0.06] hover:border-white/15"
              }`}
              style={
                tech.glow
                  ? { boxShadow: "0 0 24px rgba(45,212,191,0.35), inset 0 0 12px rgba(45,212,191,0.05)" }
                  : undefined
              }
            >
              {tech.glow && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{ boxShadow: [
                    "0 0 18px rgba(45,212,191,0.3), inset 0 0 8px rgba(45,212,191,0.05)",
                    "0 0 32px rgba(45,212,191,0.55), inset 0 0 14px rgba(45,212,191,0.08)",
                    "0 0 18px rgba(45,212,191,0.3), inset 0 0 8px rgba(45,212,191,0.05)",
                  ] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span className="relative font-display font-semibold text-base text-white/85 group-hover:text-white transition-colors">
                {tech.name}
              </span>
              {/* shimmer on hover */}
              <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
