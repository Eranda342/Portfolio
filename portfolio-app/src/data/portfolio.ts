// ─── Portfolio Data Constants ───────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Edit this file to update all portfolio sections.

import {
  Code2, Server, Layers, Download, Github, Linkedin, Mail,
  Zap, Globe, Database, Terminal,
} from "lucide-react";

import type {
  NavLink, TechItem, Competency, Project,
  Stat, TimelineItem, Language, Repo, CommandItem, AttributeCard,
} from "@/types";

// ─── Navigation ────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "Home",       href: "#home"       },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "About",      href: "#about"      },
  { label: "Contact",    href: "#contact"    },
];

// ─── Tech Ticker ────────────────────────────────────────────────────────────

export const TECH_STACK: TechItem[] = [
  { name: "Next.js"       },
  { name: "React"         },
  { name: "TypeScript"    },
  { name: "Node.js"       },
  { name: "Tailwind CSS"  },
  { name: "Docker"        },
  { name: "MongoDB"       },
  { name: "PostgreSQL"    },
  { name: "GitHub"        },
  { name: "Framer Motion" },
  { name: "Python"        },
  { name: "GraphQL"       },
];

// ─── Tech Showcase Grid ─────────────────────────────────────────────────────

export const TECH_SHOWCASE: TechItem[] = [
  { name: "React",        glow: true  },
  { name: "Vue.js",       glow: false },
  { name: "Tailwind CSS", glow: true  },
  { name: "Node.js",      glow: false },
  { name: "Laravel",      glow: true  },
  { name: "Spring",       glow: false },
  { name: "MongoDB",      glow: false },
  { name: "MySQL",        glow: true  },
  { name: "Firebase",     glow: false },
  { name: "WordPress",    glow: true  },
  { name: "Webflow",      glow: false },
  { name: "Flutter",      glow: true  },
];

// ─── Core Competencies ──────────────────────────────────────────────────────

export const COMPETENCIES: Competency[] = [
  {
    icon:   Code2,
    title:  "Frontend Engineering",
    desc:   "Crafting pixel-perfect, performant interfaces with React, Next.js, and TypeScript. Every interaction considered, every millisecond counted.",
    accent: "#2DD4BF",
    glow:   "rgba(45,212,191,0.15)",
  },
  {
    icon:   Server,
    title:  "Backend Architecture",
    desc:   "Designing resilient, scalable APIs and microservices. From RESTful patterns to event-driven systems — built to handle real production load.",
    accent: "#14B8A6",
    glow:   "rgba(20,184,166,0.15)",
  },
  {
    icon:   Layers,
    title:  "System Integration",
    desc:   "Bridging hardware, cloud, and software into unified platforms. IoT pipelines, third-party APIs, and full DevOps lifecycle experience.",
    accent: "#06B6D4",
    glow:   "rgba(6,182,212,0.15)",
  },
];

// ─── Featured Projects ──────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    title:  "AgroBridge",
    desc:   "Full-stack agricultural marketplace connecting farmers directly to buyers with real-time pricing, geolocation logistics, and automated settlement.",
    image:  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=420&fit=crop&auto=format",
    tech:   ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    github: "#",
    demo:   "#",
    accent: "#10B981",
  },
  {
    title:  "Smart Laundry System",
    desc:   "IoT-integrated laundry management platform with real-time machine status monitoring, slot booking, and automated Stripe payment processing.",
    image:  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=420&fit=crop&auto=format",
    tech:   ["React", "Node.js", "MongoDB", "WebSocket"],
    github: "#",
    demo:   "#",
    accent: "#2DD4BF",
  },
  {
    title:  "AI / Data Dashboard",
    desc:   "Enterprise analytics platform powered by ML models for predictive insights, anomaly detection, and interactive data visualization at scale.",
    image:  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=420&fit=crop&auto=format",
    tech:   ["Python", "React", "TensorFlow", "PostgreSQL"],
    github: "#",
    demo:   "#",
    accent: "#14B8A6",
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────

export const STATS: Stat[] = [
  { value: 3,  label: "Years Coding",      suffix: "+" },
  { value: 15, label: "Projects Built",     suffix: "+" },
  { value: 20, label: "Technologies Used",  suffix: "+" },
  { value: 8,  label: "Collaborations",     suffix: "+" },
];

// ─── Experience Timeline ────────────────────────────────────────────────────

export const TIMELINE: TimelineItem[] = [
  {
    year:   "2025",
    title:  "Final Year — BSc Computer Science",
    org:    "University",
    desc:   "Completing honours thesis on distributed caching architectures. Dean's list. Focus on systems design, algorithms, and production-grade engineering.",
    type:   "education",
    accent: "#2DD4BF",
  },
  {
    year:   "2024",
    title:  "AgroBridge — Lead Developer",
    org:    "Independent Project",
    desc:   "Solo-architected and deployed a full-stack agricultural marketplace. Onboarded 200+ users across 3 regions. Zero downtime since launch.",
    type:   "project",
    accent: "#10B981",
  },
  {
    year:   "2024",
    title:  "Smart Laundry System",
    org:    "Team Lead, 3-person squad",
    desc:   "Designed real-time IoT pipeline handling 500 concurrent machine state events. Integrated M-Pesa and Stripe for seamless payments.",
    type:   "project",
    accent: "#14B8A6",
  },
  {
    year:   "2023",
    title:  "Open Source Contributor",
    org:    "GitHub Community",
    desc:   "Merged 25+ pull requests across developer tools, UI libraries, and API clients. Maintained two personal libraries with 120+ combined stars.",
    type:   "milestone",
    accent: "#F59E0B",
  },
  {
    year:   "2022",
    title:  "Began the Engineering Journey",
    org:    "Self-taught + University",
    desc:   "First line of code, first deployed project, first broken production server. Learned everything matters — from git hygiene to systems thinking.",
    type:   "milestone",
    accent: "#06B6D4",
  },
];

// ─── GitHub Dashboard ───────────────────────────────────────────────────────

export const LANGUAGES: Language[] = [
  { name: "TypeScript", pct: 38, color: "#2DD4BF" },
  { name: "Python",     pct: 22, color: "#14B8A6" },
  { name: "JavaScript", pct: 20, color: "#F59E0B" },
  { name: "Go",         pct: 12, color: "#10B981" },
  { name: "Other",      pct: 8,  color: "#64748B" },
];

export const REPOS: Repo[] = [
  { name: "agrobridge-platform", stars: 47, lang: "TypeScript", updated: "2 days ago"  },
  { name: "smart-laundry-iot",   stars: 31, lang: "JavaScript", updated: "1 week ago"  },
  { name: "ai-dash",             stars: 28, lang: "Python",     updated: "2 weeks ago" },
  { name: "go-cache-lib",        stars: 19, lang: "Go",         updated: "1 month ago" },
];

// ─── About — Attribute Cards ────────────────────────────────────────────────

export const ATTRIBUTES: AttributeCard[] = [
  { icon: Globe,    label: "Systems Thinking", desc: "Architecture-first approach to every problem",    accent: "#2DD4BF" },
  { icon: Zap,      label: "Velocity",          desc: "From zero to shipped in record time",             accent: "#10B981" },
  { icon: Database, label: "Data-Driven",       desc: "Every decision backed by metrics and evidence",   accent: "#14B8A6" },
  { icon: Terminal, label: "CLI Native",         desc: "At home in the terminal as much as the browser", accent: "#06B6D4" },
];

// ─── Command Palette ────────────────────────────────────────────────────────

export const CMD_ITEMS: CommandItem[] = [
  { label: "View Projects",   icon: Code2,    action: "projects"  },
  { label: "Download Resume", icon: Download, action: "resume"    },
  { label: "GitHub Profile",  icon: Github,   action: "github"    },
  { label: "LinkedIn",        icon: Linkedin, action: "linkedin"  },
  { label: "Contact Me",      icon: Mail,     action: "contact"   },
  { label: "About",           icon: Zap,      action: "about"     },
];

// ─── Contact ────────────────────────────────────────────────────────────────

export const CONTACT = {
  email:    "developer@yourdomain.dev",
  github:   "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  resume:   "/resume.pdf",
};
