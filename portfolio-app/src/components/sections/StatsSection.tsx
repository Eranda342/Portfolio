"use client";

import { motion } from "framer-motion";
import { STATS } from "@/data/portfolio";

export function StatsSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Massive atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(45,212,191,0.12) 0%, rgba(20,184,166,0.07) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs text-teal-300 font-mono uppercase tracking-widest mb-6">By the numbers</p>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 max-w-3xl mx-auto"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Transformative Digital Solutions For{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF, #14B8A6)" }}>
              Growth & Innovation
            </span>
          </h2>
          <p className="text-white/35 font-sans max-w-lg mx-auto mb-20">
            Numbers that represent real work, real impact, and an unrelenting drive to build better systems.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #F8FAFC 30%, rgba(248,250,252,0.5) 100%)", letterSpacing: "-0.04em" }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-sm text-white/40 font-sans font-medium tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
