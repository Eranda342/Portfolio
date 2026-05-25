"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Zap, GitBranch } from "lucide-react";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { CONTACT } from "@/data/portfolio";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #2DD4BF 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[60vh] rounded-full opacity-15"
          style={{ background: "radial-gradient(ellipse, #14B8A6 0%, transparent 70%)", filter: "blur(100px)" }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center py-20 lg:py-0 min-h-[calc(100vh-64px)]">
          {/* Left Side */}
          <div
            className={`flex flex-col gap-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Status badge */}
            <div className={`inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full glass-medium`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-white/70 font-sans font-medium">Available for internships & collaborations</span>
            </div>

            {/* Headline */}
            <div>
              <h1
                className="font-display font-extrabold leading-[1.05] tracking-tight text-[2.75rem] sm:text-6xl lg:text-7xl text-white"
                style={{ letterSpacing: "-0.04em" }}
              >
                Building
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF 0%, #14B8A6 50%, #06B6D4 100%)" }}
                >
                  Systems
                </span>
                <br />
                That Scale.
              </h1>
              <p className="mt-6 text-base lg:text-lg text-white/55 font-sans leading-relaxed max-w-md">
                Final-year CS student engineering production-grade software. I write code that ships — not code that sits in notebooks.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
              <ShimmerButton href="#projects" variant="primary">
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </ShimmerButton>
              <ShimmerButton href={CONTACT.resume} variant="ghost" target="_blank" rel="noopener noreferrer">
                <Download size={14} />
                Download Resume
              </ShimmerButton>
            </div>

            {/* Currently building widget */}
            <div
              className="inline-flex items-start gap-3 p-4 rounded-2xl glass-soft max-w-sm"
              style={{ border: "1px solid rgba(45,212,191,0.2)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={14} className="text-teal-300" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-mono mb-0.5">Currently Building</p>
                <p className="text-sm text-white/85 font-sans font-medium">AI-powered study assistant for university students</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-emerald-400/80 font-mono">Active Development</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side — portrait */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Glow behind portrait */}
            <div
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(20,184,166,0.25) 0%, rgba(45,212,191,0.1) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            <div className="relative w-72 h-96 sm:w-80 sm:h-[440px] lg:w-96 lg:h-[520px]">
              {/* Portrait image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=750&fit=crop&auto=format"
                  alt="Developer portrait"
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/40 via-transparent to-transparent" />
                {/* Teal tint */}
                <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Floating badge — top right */}
              <div
                className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl glass-strong shadow-xl"
                style={{ boxShadow: "0 0 30px rgba(45,212,191,0.2)" }}
              >
                <p className="text-[10px] text-white/40 font-mono mb-0.5">Stack</p>
                <p className="text-sm text-teal-200 font-display font-bold">Full-Stack</p>
              </div>

              {/* Floating badge — bottom left */}
              <div
                className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl glass-strong shadow-xl"
                style={{ boxShadow: "0 0 30px rgba(20,184,166,0.2)" }}
              >
                <p className="text-[10px] text-white/40 font-mono mb-0.5">Commits this month</p>
                <div className="flex items-center gap-2">
                  <GitBranch size={13} className="text-cyan-300" />
                  <p className="text-sm text-cyan-200 font-display font-bold">87 commits</p>
                </div>
              </div>

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: "1px solid rgba(45,212,191,0.25)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
