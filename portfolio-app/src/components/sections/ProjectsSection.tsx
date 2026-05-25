"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

export function ProjectsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" className="relative py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs text-cyan-300 font-mono uppercase tracking-widest">Work</span>
          </div>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Professional &{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #14B8A6, #2DD4BF)" }}>
              Modern Solutions
            </span>
          </h2>
          <p className="text-white/40 font-sans max-w-xl mb-16">
            Real projects. Real users. Real production environments.
          </p>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden glass-soft hover:bg-white/[0.06] transition-colors duration-500"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Animated border glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${proj.accent}40, transparent 40%, ${proj.accent}20)`, padding: "1px", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
                />
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1012] via-[#0E1012]/40 to-transparent" />
                  {/* Accent glow overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: proj.accent }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                    {proj.title}
                  </h3>
                  <p className="text-sm text-white/45 font-sans leading-relaxed mb-4">
                    {proj.desc}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tech.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-[11px] text-white/50 font-mono"
                        style={{ background: `${proj.accent}12`, border: `1px solid ${proj.accent}25` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={proj.github}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-medium text-white/60 text-xs hover:text-white transition-colors font-sans"
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                    <a
                      href={proj.demo}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all"
                      style={{
                        background: `${proj.accent}18`,
                        border: `1px solid ${proj.accent}30`,
                        color: proj.accent,
                      }}
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: proj.accent, opacity: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
