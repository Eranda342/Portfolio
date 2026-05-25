"use client";

import { motion } from "framer-motion";
import { COMPETENCIES } from "@/data/portfolio";

export function CompetenciesSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2DD4BF 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-xs text-teal-300 font-mono uppercase tracking-widest">Expertise</span>
          </div>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Digital Solutions For{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF, #14B8A6)" }}>
              Innovation & Growth
            </span>
          </h2>
          <p className="text-white/40 font-sans max-w-xl mb-16">
            Three pillars of engineering excellence — applied with precision and purpose on every project.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {COMPETENCIES.map((comp, i) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.015 }}
                className={`relative group p-8 rounded-2xl glass-soft hover:bg-white/[0.07] transition-colors duration-500 cursor-default`}
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${comp.glow} 0%, transparent 60%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${comp.accent}18`, border: `1px solid ${comp.accent}30` }}
                >
                  <comp.icon size={20} style={{ color: comp.accent }} />
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  {comp.title}
                </h3>
                <p className="text-sm text-white/45 font-sans leading-relaxed">
                  {comp.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${comp.accent}60, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
