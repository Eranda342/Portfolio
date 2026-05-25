"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Download, Command } from "lucide-react";
import { CONTACT } from "@/data/portfolio";

const NAV_LINKS = ["Home", "Projects", "Experience", "About", "Contact"];

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#08090B]/60 backdrop-blur-2xl backdrop-saturate-200 border-b border-white/[0.05] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Animated bottom border sheen */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <motion.div
            className="h-full w-1/3"
            style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.7), transparent)" }}
            animate={{ x: ["-50%", "350%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center shadow-lg">
                  <Terminal size={16} className="text-[#04201D]" />
                </div>
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                dev<span className="text-teal-400">.</span>
              </span>
            </motion.a>

            {/* Desktop Nav Center */}
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
              {NAV_LINKS.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="relative px-4 py-1.5 text-[13px] text-white/60 hover:text-white transition-colors duration-200 rounded-full font-sans tracking-wide group"
                >
                  <span className="relative z-10">{link}</span>
                  <span className="absolute inset-0 rounded-full bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>

            {/* Actions Right */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cmd K Button */}
              <button
                onClick={onOpenCommand}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200 group"
              >
                <div className="flex items-center gap-1">
                  <span className="w-5 h-5 flex items-center justify-center rounded-md bg-black/40 border border-white/10 text-[10px] text-white/50 group-hover:text-white/80 transition-colors">
                    ⌘
                  </span>
                  <span className="w-5 h-5 flex items-center justify-center rounded-md bg-black/40 border border-white/10 text-[10px] text-white/50 group-hover:text-white/80 transition-colors">
                    K
                  </span>
                </div>
              </button>

              {/* Resume Button */}
              <motion.a
                href={CONTACT.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 text-[#04201D] text-[13px] font-semibold font-sans shadow-[0_0_20px_-5px_rgba(45,212,191,0.5)] overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <Download size={15} className="relative z-10" />
                <span className="relative z-10">Resume</span>
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#08090B]/95 backdrop-blur-xl md:hidden flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenCommand(); }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl glass-medium text-white/80"
                >
                  <Command size={18} />
                  Open Command Palette
                </button>
                <a
                  href={CONTACT.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 text-[#04201D] font-semibold font-sans"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
