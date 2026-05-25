"use client";

import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { CONTACT } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Terminal size={11} className="text-white" />
            </div>
            <span className="font-display font-bold text-white/70 text-sm" style={{ letterSpacing: "-0.02em" }}>
              dev<span className="text-teal-300">.</span>
            </span>
          </div>

          <p className="text-xs text-white/25 font-sans">
            © {new Date().getFullYear()} — Built with precision. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <Github size={14} />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
