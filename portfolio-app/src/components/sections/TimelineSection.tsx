"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/data/portfolio";

export function TimelineSection() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden" aria-label="Experience timeline">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-4">
            The <span className="text-teal-400">Journey.</span>
          </h2>
          <p className="text-white/50 font-sans max-w-xl">
            A chronological timeline of my academic and professional milestones.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/[0.08]" />

          <div className="flex flex-col gap-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-20 group"
              >
                {/* Node */}
                <div
                  className="absolute left-[22px] top-1.5 w-[11px] h-[11px] rounded-full bg-[#08090B] border-2 z-10 transition-colors duration-300"
                  style={{ borderColor: item.accent }}
                />
                
                {/* Active glow on hover */}
                <div
                  className="absolute left-[16px] top-[0px] w-[23px] h-[23px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm"
                  style={{ background: item.accent }}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <span className="text-sm font-mono" style={{ color: item.accent }}>
                    {item.year}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight">{item.title}</h3>
                </div>
                
                <div className="text-sm text-white/40 font-sans font-medium mb-3 uppercase tracking-wider">
                  {item.org}
                </div>
                
                <p className="text-white/55 font-sans leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
