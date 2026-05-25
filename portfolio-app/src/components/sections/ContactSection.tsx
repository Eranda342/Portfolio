"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Linkedin, Github, Download, ArrowRight } from "lucide-react";
import { CONTACT } from "@/data/portfolio";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Big cinematic glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(45,212,191,0.1) 0%, rgba(20,184,166,0.08) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div
            className={`relative p-6 sm:p-10 lg:p-16 rounded-3xl glass-medium text-center`}
            style={{
              border: "1px solid rgba(45,212,191,0.22)",
              boxShadow: "0 0 80px rgba(45,212,191,0.08), 0 0 40px rgba(20,184,166,0.05)",
            }}
          >
            {/* Corner brackets — inset to match rounded-3xl, all four corners */}
            {[
              { pos: "top-4 left-4", lines: ["top-0 left-0 w-px h-6", "top-0 left-0 h-px w-6"], color: "rgba(45,212,191,0.6)" },
              { pos: "top-4 right-4", lines: ["top-0 right-0 w-px h-6", "top-0 right-0 h-px w-6"], color: "rgba(6,182,212,0.6)" },
              { pos: "bottom-4 left-4", lines: ["bottom-0 left-0 w-px h-6", "bottom-0 left-0 h-px w-6"], color: "rgba(6,182,212,0.6)" },
              { pos: "bottom-4 right-4", lines: ["bottom-0 right-0 w-px h-6", "bottom-0 right-0 h-px w-6"], color: "rgba(45,212,191,0.6)" },
            ].map((c, i) => (
              <motion.div
                key={i}
                className={`absolute ${c.pos} w-6 h-6 pointer-events-none`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              >
                {c.lines.map((l, j) => (
                  <span key={j} className={`absolute ${l}`} style={{ background: c.color }} />
                ))}
              </motion.div>
            ))}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6 sm:mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-teal-200 font-mono">Open to opportunities</span>
            </div>

            <h2
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              {"Let's Build Something"}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF 0%, #14B8A6 60%, #06B6D4 100%)" }}
              >
                Exceptional.
              </span>
            </h2>
            <p className="text-white/40 font-sans max-w-md mx-auto mb-10">
              Whether it's a full-time role, internship, or a side project worth shipping — reach out. I reply within 24 hours.
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <button
                onClick={onCopy}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-sans group"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : CONTACT.email}
              </button>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-sans"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-sans"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>

            <a
              href={CONTACT.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium text-sm shadow-xl shadow-teal-500/25 hover:opacity-90 transition-opacity font-sans group"
            >
              <Download size={15} />
              Download Resume
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
