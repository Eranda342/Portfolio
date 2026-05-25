import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Download, Github, Linkedin, Mail,
  ExternalLink, Code2, Server, Layers, Copy, Check,
  Command, Zap, Globe, Database, Terminal, ChevronRight,
  Star, GitBranch, Activity
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Projects", "Experience", "About", "Contact"];

const TECH_STACK = [
  { name: "Next.js" }, { name: "React" }, { name: "TypeScript" },
  { name: "Node.js" }, { name: "Tailwind CSS" }, { name: "Docker" },
  { name: "MongoDB" }, { name: "PostgreSQL" }, { name: "GitHub" },
  { name: "Framer Motion" }, { name: "Python" }, { name: "GraphQL" },
];

const COMPETENCIES = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    desc: "Crafting pixel-perfect, performant interfaces with React, Next.js, and TypeScript. Every interaction considered, every millisecond counted.",
    accent: "#2DD4BF",
    glow: "rgba(45,212,191,0.15)",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    desc: "Designing resilient, scalable APIs and microservices. From RESTful patterns to event-driven systems — built to handle real production load.",
    accent: "#14B8A6",
    glow: "rgba(20,184,166,0.15)",
  },
  {
    icon: Layers,
    title: "System Integration",
    desc: "Bridging hardware, cloud, and software into unified platforms. IoT pipelines, third-party APIs, and full DevOps lifecycle experience.",
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.15)",
  },
];

const PROJECTS = [
  {
    title: "AgroBridge",
    desc: "Full-stack agricultural marketplace connecting farmers directly to buyers with real-time pricing, geolocation logistics, and automated settlement.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=420&fit=crop&auto=format",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    github: "#",
    demo: "#",
    accent: "#10B981",
  },
  {
    title: "Smart Laundry System",
    desc: "IoT-integrated laundry management platform with real-time machine status monitoring, slot booking, and automated Stripe payment processing.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=420&fit=crop&auto=format",
    tech: ["React", "Node.js", "MongoDB", "WebSocket"],
    github: "#",
    demo: "#",
    accent: "#2DD4BF",
  },
  {
    title: "AI / Data Dashboard",
    desc: "Enterprise analytics platform powered by ML models for predictive insights, anomaly detection, and interactive data visualization at scale.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop&auto=format",
    tech: ["Python", "React", "TensorFlow", "PostgreSQL"],
    github: "#",
    demo: "#",
    accent: "#14B8A6",
  },
];

const STATS = [
  { value: 3, label: "Years Coding", suffix: "+" },
  { value: 15, label: "Projects Built", suffix: "+" },
  { value: 20, label: "Technologies Used", suffix: "+" },
  { value: 8, label: "Collaborations", suffix: "+" },
];

const TIMELINE = [
  {
    year: "2025",
    title: "Final Year — BSc Computer Science",
    org: "University",
    desc: "Completing honours thesis on distributed caching architectures. Dean's list. Focus on systems design, algorithms, and production-grade engineering.",
    type: "education",
    accent: "#2DD4BF",
  },
  {
    year: "2024",
    title: "AgroBridge — Lead Developer",
    org: "Independent Project",
    desc: "Solo-architected and deployed a full-stack agricultural marketplace. Onboarded 200+ users across 3 regions. Zero downtime since launch.",
    type: "project",
    accent: "#10B981",
  },
  {
    year: "2024",
    title: "Smart Laundry System",
    org: "Team Lead, 3-person squad",
    desc: "Designed real-time IoT pipeline handling 500 concurrent machine state events. Integrated M-Pesa and Stripe for seamless payments.",
    type: "project",
    accent: "#14B8A6",
  },
  {
    year: "2023",
    title: "Open Source Contributor",
    org: "GitHub Community",
    desc: "Merged 25+ pull requests across developer tools, UI libraries, and API clients. Maintained two personal libraries with 120+ combined stars.",
    type: "milestone",
    accent: "#F59E0B",
  },
  {
    year: "2022",
    title: "Began the Engineering Journey",
    org: "Self-taught + University",
    desc: "First line of code, first deployed project, first broken production server. Learned everything matters — from git hygiene to systems thinking.",
    type: "milestone",
    accent: "#06B6D4",
  },
];

const LANGUAGES = [
  { name: "TypeScript", pct: 38, color: "#2DD4BF" },
  { name: "Python", pct: 22, color: "#14B8A6" },
  { name: "JavaScript", pct: 20, color: "#F59E0B" },
  { name: "Go", pct: 12, color: "#10B981" },
  { name: "Other", pct: 8, color: "#64748B" },
];

const REPOS = [
  { name: "agrobridge-platform", stars: 47, lang: "TypeScript", updated: "2 days ago" },
  { name: "smart-laundry-iot", stars: 31, lang: "JavaScript", updated: "1 week ago" },
  { name: "ai-dash", stars: 28, lang: "Python", updated: "2 weeks ago" },
  { name: "go-cache-lib", stars: 19, lang: "Go", updated: "1 month ago" },
];

const CMD_ITEMS = [
  { label: "View Projects", icon: Code2, action: "projects" },
  { label: "Download Resume", icon: Download, action: "resume" },
  { label: "GitHub Profile", icon: Github, action: "github" },
  { label: "LinkedIn", icon: Linkedin, action: "linkedin" },
  { label: "Contact Me", icon: Mail, action: "contact" },
  { label: "About", icon: Zap, action: "about" },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target, active, duration]);
  return count;
}

// ─── Styles ────────────────────────────────────────────────────────────────

const glassSoft = "bg-white/[0.03] backdrop-blur-md backdrop-saturate-150 border border-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";
const glassMedium = "bg-white/[0.06] backdrop-blur-xl backdrop-saturate-150 border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_32px_-8px_rgba(0,0,0,0.5)]";
const glassStrong = "bg-white/[0.09] backdrop-blur-2xl backdrop-saturate-200 border border-white/[0.14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_20px_60px_-15px_rgba(0,0,0,0.7)]";

// ─── CinematicBackground ────────────────────────────────────────────────────

function CinematicBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      ref.current.style.setProperty("--mx", `${x}%`);
      ref.current.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" style={{ ["--mx" as any]: "50%", ["--my" as any]: "30%" }}>
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 70%)",
        }}
      />
      {/* Mouse-tracked aurora */}
      <div
        className="absolute inset-0 transition-[background-position] duration-[400ms] ease-out"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(45,212,191,0.18), transparent 60%)",
        }}
      />
      {/* Drifting aurora orbs */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.22), transparent 60%)", filter: "blur(60px)" }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.18), transparent 60%)", filter: "blur(80px)" }}
        animate={{ x: [0, -100, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 60%)", filter: "blur(70px)" }}
        animate={{ x: [0, 60, -80, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.4), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,9,11,0.6) 100%)" }} />
      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

// ─── ShimmerButton ──────────────────────────────────────────────────────────

function ShimmerButton({ children, href = "#", className = "", primary = false }: { children: React.ReactNode; href?: string; className?: string; primary?: boolean }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm font-['Inter'] overflow-hidden group ${
        primary
          ? "text-[#04201D] bg-gradient-to-r from-teal-300 via-teal-200 to-cyan-300 shadow-[0_10px_40px_-10px_rgba(45,212,191,0.6)]"
          : "text-white/85 bg-white/[0.06] backdrop-blur-xl backdrop-saturate-150 border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:bg-white/[0.1]"
      } ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.a>
  );
}

// ─── CommandPalette ─────────────────────────────────────────────────────────

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = CMD_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className={`fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 rounded-2xl ${glassStrong} p-1 shadow-2xl`}
          style={{ boxShadow: "0 0 60px rgba(45,212,191,0.15), 0 25px 50px rgba(0,0,0,0.8)" }}
        >
          <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
          <Dialog.Description className="sr-only">Search and run portfolio actions</Dialog.Description>
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Command size={16} className="text-teal-300 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search commands..."
              className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/30 outline-none font-['Inter']"
            />
            <kbd className="text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5 font-['JetBrains_Mono']">ESC</kbd>
          </div>
          <div className="py-2">
            {filtered.map(item => (
              <button
                key={item.action}
                onClick={onClose}
                className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/[0.06] hover:text-white transition-all duration-150 group"
              >
                <item.icon size={15} className="text-teal-300 group-hover:text-teal-200 transition-colors" />
                <span className="font-['Inter']">{item.label}</span>
                <ChevronRight size={13} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar({
  menuOpen, setMenuOpen, setCmdOpen
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  setCmdOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#08090B]/60 backdrop-blur-2xl backdrop-saturate-200 border-b border-white/[0.08] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2 group"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 12px rgba(45,212,191,0.3)", "0 0 24px rgba(45,212,191,0.6)", "0 0 12px rgba(45,212,191,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center"
            >
              <Terminal size={13} className="text-[#04201D]" />
            </motion.div>
            <span
              className="font-['Outfit'] font-bold text-white tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              dev<motion.span
                className="text-teal-300 inline-block"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >.</motion.span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 px-1.5 py-1 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative px-4 py-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200 rounded-xl font-['Inter'] group"
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute inset-0 rounded-xl bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-6 bg-gradient-to-r from-transparent via-teal-300 to-transparent transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCmdOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${glassSoft} text-white/50 hover:text-white transition-all duration-200 text-xs font-['JetBrains_Mono']`}
            >
              <Command size={12} />
              <span>⌘K</span>
            </motion.button>
            <motion.a
              href="#"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 text-[#04201D] text-sm font-semibold font-['Inter'] shadow-[0_10px_30px_-8px_rgba(45,212,191,0.5)] overflow-hidden group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <Download size={14} className="relative z-10" />
              <span className="relative z-10">Resume</span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`md:hidden p-2 rounded-lg ${glassSoft} text-white/80 hover:text-white transition-colors`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.25 }}
              className="block"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className={`mx-2 mb-4 rounded-2xl ${glassMedium} p-4 flex flex-col gap-1`}>
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all font-['Inter']"
              >
                {link}
              </a>
            ))}
            <div className="border-t border-white/10 mt-2 pt-3 flex gap-2">
              <button
                onClick={() => { setCmdOpen(true); setMenuOpen(false); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl ${glassSoft} text-white/50 text-sm font-['Inter']`}
              >
                <Command size={14} /> ⌘K
              </button>
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-['Inter']"
              >
                <Download size={14} /> Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── HeroSection ───────────────────────────────────────────────────────────

function HeroSection() {
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
          {/* Left */}
          <div
            className={`flex flex-col gap-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Status badge */}
            <div className={`inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full ${glassMedium}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-white/70 font-['Inter'] font-medium">Available for internships & collaborations</span>
            </div>

            {/* Headline */}
            <div>
              <h1
                className="font-['Outfit'] font-extrabold leading-[1.05] tracking-tight text-[2.75rem] sm:text-6xl lg:text-7xl text-white"
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
              <p className="mt-6 text-base lg:text-lg text-white/55 font-['Inter'] leading-relaxed max-w-md">
                Final-year CS student engineering production-grade software. I write code that ships — not code that sits in notebooks.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-300 via-teal-200 to-cyan-300 text-[#04201D] font-semibold text-sm font-['Inter'] shadow-[0_12px_40px_-10px_rgba(45,212,191,0.6)] overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative z-10 flex items-center gap-2.5">
                  View Projects
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl ${glassMedium} text-white/85 text-sm font-medium hover:text-white hover:bg-white/[0.1] transition-colors font-['Inter']`}
              >
                <Download size={14} />
                Download Resume
              </motion.a>
            </div>

            {/* Currently building widget */}
            <div
              className={`inline-flex items-start gap-3 p-4 rounded-2xl ${glassSoft} max-w-sm`}
              style={{ border: "1px solid rgba(45,212,191,0.2)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={14} className="text-teal-300" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-['JetBrains_Mono'] mb-0.5">Currently Building</p>
                <p className="text-sm text-white/85 font-['Inter'] font-medium">AI-powered study assistant for university students</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-emerald-400/80 font-['JetBrains_Mono']">Active Development</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right — portrait */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Glow behind portrait */}
            <div
              className="absolute inset-0 -z-10"
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
                {/* Blue tint */}
                <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply" />
              </div>

              {/* Floating badge — top right */}
              <div
                className={`absolute -top-4 -right-4 px-4 py-3 rounded-2xl ${glassStrong} shadow-xl`}
                style={{ boxShadow: "0 0 30px rgba(45,212,191,0.2)" }}
              >
                <p className="text-[10px] text-white/40 font-['JetBrains_Mono'] mb-0.5">Stack</p>
                <p className="text-sm text-teal-200 font-['Outfit'] font-bold">Full-Stack</p>
              </div>

              {/* Floating badge — bottom left */}
              <div
                className={`absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl ${glassStrong} shadow-xl`}
                style={{ boxShadow: "0 0 30px rgba(20,184,166,0.2)" }}
              >
                <p className="text-[10px] text-white/40 font-['JetBrains_Mono'] mb-0.5">Commits this month</p>
                <div className="flex items-center gap-2">
                  <GitBranch size={13} className="text-cyan-300" />
                  <p className="text-sm text-cyan-200 font-['Outfit'] font-bold">87 commits</p>
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

// ─── TechTicker ─────────────────────────────────────────────────────────────

function TechTicker() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative py-8 overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-transparent to-[#08090B] z-10 pointer-events-none" />
      <div className="flex gap-12 animate-[ticker_25s_linear_infinite]" style={{ width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500/50" />
            <span className="text-sm text-white/30 font-['Inter'] font-medium tracking-wide whitespace-nowrap hover:text-white/60 transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

// ─── TechShowcaseSection ────────────────────────────────────────────────────

const TECH_SHOWCASE = [
  { name: "React", glow: true },
  { name: "Vue.js", glow: false },
  { name: "Tailwind CSS", glow: true },
  { name: "Node.js", glow: false },
  { name: "Laravel", glow: true },
  { name: "Spring", glow: false },
  { name: "mongoDB", glow: false },
  { name: "MySQL", glow: true },
  { name: "Firebase", glow: false },
  { name: "WordPress", glow: true },
  { name: "Webflow", glow: false },
  { name: "Flutter", glow: true },
];

function TechShowcaseSection() {
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
            className="inline-block px-4 py-1.5 rounded-full border border-teal-300/30 text-[11px] text-teal-300 font-['JetBrains_Mono'] uppercase tracking-widest mb-6 bg-teal-500/[0.04]"
          >
            Sub Title
          </motion.span>
          <h2 className="font-['Outfit'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white" style={{ letterSpacing: "-0.03em" }}>
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
              <span className="relative font-['Outfit'] font-semibold text-base text-white/85 group-hover:text-white transition-colors">
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

// ─── GlobeSection ───────────────────────────────────────────────────────────

function GlobeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yGlobe = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacityWave = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Animated waves */}
      <motion.svg
        viewBox="0 0 1200 400"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[400px] pointer-events-none"
        style={{ opacity: opacityWave }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(45,212,191,0)" />
            <stop offset="0.5" stopColor="rgba(45,212,191,0.7)" />
            <stop offset="1" stopColor="rgba(45,212,191,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map(i => (
          <motion.path
            key={i}
            d={`M 0 ${200 + i * 10} Q 300 ${150 - i * 30} 600 ${200 + i * 5} T 1200 ${200 - i * 10}`}
            stroke="url(#waveGrad)"
            strokeWidth={0.8 + i * 0.2}
            fill="none"
            animate={{ d: [
              `M 0 ${200 + i * 10} Q 300 ${150 - i * 30} 600 ${200 + i * 5} T 1200 ${200 - i * 10}`,
              `M 0 ${200 + i * 10} Q 300 ${250 - i * 20} 600 ${160 + i * 5} T 1200 ${220 - i * 10}`,
              `M 0 ${200 + i * 10} Q 300 ${150 - i * 30} 600 ${200 + i * 5} T 1200 ${200 - i * 10}`,
            ] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* moving dots along path */}
        {[0, 1, 2, 3].map(i => (
          <motion.circle
            key={`dot-${i}`}
            r="3"
            fill="#fff"
            animate={{ cx: [0, 600, 1200], cy: [200, 180 - i * 8, 200] }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2 }}
          />
        ))}
      </motion.svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          style={{ y: yGlobe, rotate }}
          className="mx-auto relative w-[min(85vw,420px)] h-[min(85vw,420px)] sm:w-[520px] sm:h-[520px]"
        >
          {/* Globe wireframe */}
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full"
            animate={{ rotateY: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 40px rgba(45,212,191,0.25))" }}
          >
            <defs>
              <radialGradient id="globeFill" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#1a3d3a" />
                <stop offset="60%" stopColor="#0a1a1a" />
                <stop offset="100%" stopColor="#050a0c" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="url(#globeFill)" />
            {/* Latitude lines */}
            {[0, 1, 2, 3, 4, 5, 6].map(i => {
              const ry = 90 * Math.sin(((i + 1) * Math.PI) / 8);
              return (
                <ellipse
                  key={`lat-${i}`}
                  cx="100"
                  cy={100 - 90 * Math.cos(((i + 1) * Math.PI) / 8)}
                  rx={ry}
                  ry={ry * 0.18}
                  fill="none"
                  stroke="rgba(45,212,191,0.25)"
                  strokeWidth="0.4"
                />
              );
            })}
            {/* Longitude lines */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <ellipse
                key={`lon-${i}`}
                cx="100"
                cy="100"
                rx={90 * Math.abs(Math.cos((i * Math.PI) / 6))}
                ry="90"
                fill="none"
                stroke="rgba(45,212,191,0.18)"
                strokeWidth="0.4"
              />
            ))}
            {/* surface highlights */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(45,212,191,0.5)" strokeWidth="0.6" />
          </motion.svg>

          {/* Annotation pins */}
          {[
            { top: "6%", left: "-2%", label: "Ideate. Develop.", line2: "Launch. Grow." },
            { top: "4%", right: "-4%", label: "Think Smart. Build", line2: "Fast. Scale Strong." },
            { bottom: "8%", left: "0%", label: "Ship to Production.", line2: "Every Sprint." },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }}
              className="absolute"
              style={p as any}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className={`relative px-3 py-2 rounded-lg ${glassMedium} text-[11px] text-white/85 font-['Inter'] leading-tight whitespace-nowrap`}
              >
                {p.label}<br />{p.line2}
                <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-teal-300" style={{ boxShadow: "0 0 10px rgba(45,212,191,0.8)" }} />
              </motion.div>
            </motion.div>
          ))}

          {/* pulse anchor dots on globe surface */}
          {[
            { top: "32%", left: "30%" },
            { top: "28%", right: "28%" },
            { bottom: "32%", left: "28%" },
            { top: "55%", left: "55%" },
          ].map((a, i) => (
            <motion.span
              key={`anchor-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white"
              style={a as any}
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-white/50 font-['Inter'] max-w-2xl mx-auto mt-16 leading-relaxed"
        >
          I empower products through cutting-edge software and web solutions —
          engineered to drive growth, streamline operations, and elevate user experiences.
        </motion.p>
      </div>
    </section>
  );
}

// ─── ScrollProgressBar ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgba(45,212,191,0) 0%, rgba(45,212,191,1) 50%, rgba(6,182,212,1) 100%)",
        boxShadow: "0 0 12px rgba(45,212,191,0.6)",
      }}
    />
  );
}

// ─── CompetenciesSection ────────────────────────────────────────────────────

function CompetenciesSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2DD4BF 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-xs text-teal-300 font-['JetBrains_Mono'] uppercase tracking-widest">Expertise</span>
          </div>
          <h2
            className="font-['Outfit'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Digital Solutions For{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF, #14B8A6)" }}>
              Innovation & Growth
            </span>
          </h2>
          <p className="text-white/40 font-['Inter'] max-w-xl mb-16">
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
                className={`relative group p-8 rounded-2xl ${glassSoft} hover:bg-white/[0.07] transition-colors duration-500 cursor-default`}
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

                <h3 className="font-['Outfit'] font-bold text-lg text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  {comp.title}
                </h3>
                <p className="text-sm text-white/45 font-['Inter'] leading-relaxed">
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
        </div>
      </div>
    </section>
  );
}

// ─── ProjectsSection ────────────────────────────────────────────────────────

function ProjectsSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" className="relative py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs text-cyan-300 font-['JetBrains_Mono'] uppercase tracking-widest">Work</span>
          </div>
          <h2
            className="font-['Outfit'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Professional &{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #14B8A6, #2DD4BF)" }}>
              Modern Solutions
            </span>
          </h2>
          <p className="text-white/40 font-['Inter'] max-w-xl mb-16">
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
                className={`group relative rounded-2xl overflow-hidden ${glassSoft} hover:bg-white/[0.06] transition-colors duration-500`}
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
                  <h3 className="font-['Outfit'] font-bold text-lg text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
                    {proj.title}
                  </h3>
                  <p className="text-sm text-white/45 font-['Inter'] leading-relaxed mb-4">
                    {proj.desc}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tech.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-[11px] text-white/50 font-['JetBrains_Mono']"
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
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${glassMedium} text-white/60 text-xs hover:text-white transition-colors font-['Inter']`}
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                    <a
                      href={proj.demo}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium font-['Inter'] transition-all"
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

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${proj.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── StatsSection ───────────────────────────────────────────────────────────

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, visible } = useReveal(0.3);
  const count = useCounter(value, visible);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 group">
      <div
        className="font-['Outfit'] font-extrabold text-5xl sm:text-6xl lg:text-7xl bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #F8FAFC 30%, rgba(248,250,252,0.5) 100%)", letterSpacing: "-0.04em" }}
      >
        {count}{suffix}
      </div>
      <p className="text-sm text-white/40 font-['Inter'] font-medium tracking-wide">{label}</p>
    </div>
  );
}

function StatsSection() {
  const { ref, visible } = useReveal();

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
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-xs text-teal-300 font-['JetBrains_Mono'] uppercase tracking-widest mb-6">By the numbers</p>
          <h2
            className="font-['Outfit'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 max-w-3xl mx-auto"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Transformative Digital Solutions For{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF, #14B8A6)" }}>
              Growth & Innovation
            </span>
          </h2>
          <p className="text-white/35 font-['Inter'] max-w-lg mx-auto mb-20">
            Numbers that represent real work, real impact, and an unrelenting drive to build better systems.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map(stat => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TimelineSection ────────────────────────────────────────────────────────

function TimelineSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-xs text-teal-300 font-['JetBrains_Mono'] uppercase tracking-widest">Journey</span>
          </div>
          <h2
            className="font-['Outfit'] font-bold text-3xl sm:text-4xl text-white mb-16"
            style={{ letterSpacing: "-0.03em" }}
          >
            The Path So Far
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-cyan-500/30 to-transparent" />

            <div className="flex flex-col gap-8">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className="relative pl-16 group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-[18px] top-4 w-3 h-3 rounded-full -translate-x-1/2 group-hover:scale-125 transition-transform duration-300 shadow-lg"
                    style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}60` }}
                  />

                  <div
                    className={`p-6 rounded-2xl ${glassSoft} group-hover:bg-white/[0.06] transition-all duration-300`}
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-['Outfit'] font-bold text-base text-white" style={{ letterSpacing: "-0.01em" }}>
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/40 font-['Inter'] mt-0.5">{item.org}</p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] shrink-0"
                        style={{ background: `${item.accent}15`, color: item.accent, border: `1px solid ${item.accent}30` }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-white/45 font-['Inter'] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GitHubSection ──────────────────────────────────────────────────────────

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const levels = ["#1e293b", "#1e3a5f", "#2563eb50", "#2DD4BF", "#60a5fa"];
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      if (w === weeks - 1 && d > 2) return 0;
      const r = Math.random();
      return r < 0.3 ? 0 : r < 0.55 ? 1 : r < 0.75 ? 2 : r < 0.9 ? 3 : 4;
    })
  );

  return (
    <div className="flex gap-[3px] sm:gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
      {grid.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px] sm:gap-1 shrink-0">
          {week.map((level, di) => (
            <div
              key={di}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-transform hover:scale-125 cursor-default"
              style={{ background: levels[level] }}
              title={`Level ${level}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function GitHubSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div
        className="absolute top-1/2 right-0 w-[50vw] h-[50vh] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #14B8A6 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs text-cyan-300 font-['JetBrains_Mono'] uppercase tracking-widest">Activity</span>
          </div>
          <h2
            className="font-['Outfit'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-10 sm:mb-16"
            style={{ letterSpacing: "-0.03em" }}
          >
            GitHub Dashboard
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contribution graph */}
            <div
              className={`lg:col-span-2 min-w-0 p-4 sm:p-6 rounded-2xl ${glassSoft} overflow-hidden`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
                <div className="flex items-center gap-2 min-w-0">
                  <Activity size={15} className="text-teal-300 shrink-0" />
                  <span className="text-sm text-white/70 font-['Inter'] font-medium truncate">Contribution Activity</span>
                </div>
                <span className="text-[11px] sm:text-xs text-white/30 font-['JetBrains_Mono'] shrink-0">Last 6 months</span>
              </div>
              <ContributionGraph />
              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-[11px] text-white/25 font-['Inter']">Less</span>
                {["#1e293b", "#1e3a5f", "#2563eb50", "#2DD4BF", "#60a5fa"].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
                ))}
                <span className="text-[11px] text-white/25 font-['Inter']">More</span>
              </div>
            </div>

            {/* Languages */}
            <div
              className={`min-w-0 p-4 sm:p-6 rounded-2xl ${glassSoft}`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={15} className="text-cyan-300" />
                <span className="text-sm text-white/70 font-['Inter'] font-medium">Top Languages</span>
              </div>

              {/* Bar */}
              <div className="flex h-2 rounded-full overflow-hidden mb-6 gap-0.5">
                {LANGUAGES.map(lang => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.pct}%`, background: lang.color }}
                    className="first:rounded-l-full last:rounded-r-full"
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {LANGUAGES.map(lang => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: lang.color }} />
                      <span className="text-sm text-white/60 font-['Inter']">{lang.name}</span>
                    </div>
                    <span className="text-sm text-white/40 font-['JetBrains_Mono']">{lang.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent repos */}
            <div
              className={`lg:col-span-3 min-w-0 p-4 sm:p-6 rounded-2xl ${glassSoft}`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Github size={15} className="text-teal-300" />
                <span className="text-sm text-white/70 font-['Inter'] font-medium">Recent Repositories</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {REPOS.map(repo => (
                  <div
                    key={repo.name}
                    className={`p-4 rounded-xl ${glassMedium} hover:bg-white/[0.09] transition-all duration-200 group cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <GitBranch size={14} className="text-teal-300 mt-0.5" />
                      <div className="flex items-center gap-1 text-[11px] text-white/35 font-['JetBrains_Mono']">
                        <Star size={10} />
                        {repo.stars}
                      </div>
                    </div>
                    <p className="text-sm text-white/80 font-['JetBrains_Mono'] mb-1 group-hover:text-white transition-colors">
                      {repo.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-white/30 font-['Inter']">{repo.lang}</span>
                      <span className="text-[11px] text-white/25 font-['Inter']">{repo.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AboutSection ───────────────────────────────────────────────────────────

function AboutSection() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[40vw] h-[50vh] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #2DD4BF 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-teal-500/50" />
                <span className="text-xs text-teal-300 font-['JetBrains_Mono'] uppercase tracking-widest">Identity</span>
              </div>
              <h2
                className="font-['Outfit'] font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-8"
                style={{ letterSpacing: "-0.03em" }}
              >
                Engineered to{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #2DD4BF, #14B8A6)" }}>
                  Ship.
                </span>
              </h2>

              <div className="flex flex-col gap-5 text-white/50 font-['Inter'] leading-relaxed text-[15px]">
                <p>
                  I'm a final-year Computer Science student who treats every project like it's going into production — because most of them do. I don't build proof-of-concepts. I build systems.
                </p>
                <p>
                  My engineering philosophy: <span className="text-white/80">systems should be simple enough to understand, resilient enough to fail gracefully, and fast enough that users never notice.</span> That balance is what I chase on every project.
                </p>
                <p>
                  Off the keyboard, I'm studying distributed systems theory, contributing to open source, and thinking deeply about how software shapes the world. I'm actively seeking internship and graduate opportunities where I can contribute to engineering teams building at scale.
                </p>
              </div>
            </div>

            {/* Right — attribute cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: "Systems Thinking", desc: "Architecture-first approach to every problem", accent: "#2DD4BF" },
                { icon: Zap, label: "Velocity", desc: "From zero to shipped in record time", accent: "#F59E0B" },
                { icon: Database, label: "Data-Driven", desc: "Every decision backed by metrics and evidence", accent: "#14B8A6" },
                { icon: Terminal, label: "CLI Native", desc: "At home in the terminal as much as the browser", accent: "#10B981" },
              ].map((attr, i) => (
                <div
                  key={attr.label}
                  className={`p-5 rounded-2xl ${glassSoft} hover:bg-white/[0.07] transition-all duration-300 group`}
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${attr.accent}18`, border: `1px solid ${attr.accent}30` }}
                  >
                    <attr.icon size={16} style={{ color: attr.accent }} />
                  </div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-white mb-1">{attr.label}</h4>
                  <p className="text-xs text-white/40 font-['Inter'] leading-relaxed">{attr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ContactSection ─────────────────────────────────────────────────────────

function ContactSection({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  const { ref, visible } = useReveal();

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
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className={`relative p-6 sm:p-10 lg:p-16 rounded-3xl ${glassMedium} text-center`}
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
              <span className="text-xs text-teal-200 font-['JetBrains_Mono']">Open to opportunities</span>
            </div>

            <h2
              className="font-['Outfit'] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
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
            <p className="text-white/40 font-['Inter'] max-w-md mx-auto mb-10">
              Whether it's a full-time role, internship, or a side project worth shipping — reach out. I reply within 24 hours.
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <button
                onClick={onCopy}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-['Inter'] group"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied!" : "developer@example.com"}
              </button>
              <a
                href="#"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-['Inter']"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-['Inter']"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium text-sm shadow-xl shadow-teal-500/25 hover:opacity-90 transition-opacity font-['Inter'] group"
            >
              <Download size={15} />
              Download Resume
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Terminal size={11} className="text-white" />
            </div>
            <span className="font-['Outfit'] font-bold text-white/70 text-sm" style={{ letterSpacing: "-0.02em" }}>
              dev<span className="text-teal-300">.</span>
            </span>
          </div>

          <p className="text-xs text-white/25 font-['Inter']">
            © {new Date().getFullYear()} — Built with precision. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("developer@example.com").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-[#08090B] text-[#F8FAFC] overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <CinematicBackground />
      <ScrollProgressBar />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCmdOpen={setCmdOpen} />
      <HeroSection />
      <TechTicker />
      <TechShowcaseSection />
      <GlobeSection />
      <CompetenciesSection />
      <ProjectsSection />
      <StatsSection />
      <TimelineSection />
      <GitHubSection />
      <AboutSection />
      <ContactSection copied={copied} onCopy={handleCopyEmail} />
      <Footer />
    </div>
  );
}
