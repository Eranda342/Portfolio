"use client";

import { motion } from "framer-motion";
import { ATTRIBUTES } from "@/data/portfolio";
import { useReveal } from "@/hooks/useReveal";

export function AboutSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden border-t border-white/[0.05]"
      aria-label="About me"
    >
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] rounded-full opacity-10"
             style={{ background: "radial-gradient(circle, #2DD4BF 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] rounded-full opacity-[0.07]"
             style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 60%)", filter: "blur(100px)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-teal-300 font-mono text-sm tracking-wider uppercase mb-4 block">Identity</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Engineered to Ship<span className="text-teal-400">.</span>
          </h2>
        </motion.div>

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Bridging the gap between design and scalable engineering.</h3>
              <p className="text-white/60 font-sans leading-relaxed mb-6">
                I'm a developer obsessed with the entire lifecycle of a product. From the first Figma wireframe to the final Docker deployment, I ensure nothing gets lost in translation.
              </p>
              <p className="text-white/60 font-sans leading-relaxed">
                When I'm not writing code, I'm analyzing system architectures, contributing to open-source tooling, or experimenting with generative UI patterns.
              </p>
            </div>

            {/* Right — attribute cards grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {ATTRIBUTES.map((attr, i) => (
                <motion.div
                  key={attr.label}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="glass-card p-5 hover:border-white/[0.12] transition-colors duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${attr.accent}15`,
                      border: `1px solid ${attr.accent}28`,
                    }}
                  >
                    <attr.icon size={16} style={{ color: attr.accent }} />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mb-1.5">
                    {attr.label}
                  </h4>
                  <p className="text-xs text-white/40 font-sans leading-relaxed">
                    {attr.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
