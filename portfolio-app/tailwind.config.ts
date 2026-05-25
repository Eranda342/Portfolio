import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ────────────────────────────────────────────────────
      colors: {
        // Backgrounds
        "bg-deep":    "#050816",
        "bg-base":    "#0B1120",
        "bg-surface": "#020617",
        // Primary — Teal/Cyan/Emerald are built-in to Tailwind, we will use those
        // for standard utility classes (e.g. text-teal-300, bg-cyan-500)
        // Text
        "text-primary":   "#F8FAFC",
        "text-secondary": "#CBD5E1",
        "text-muted":     "#64748B",
      },

      // ─── Typography ──────────────────────────────────────────────────────
      fontFamily: {
        sans:  ["var(--font-inter)",  "Inter",         "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit",      "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "JetBrains Mono", "Menlo", "monospace"],
      },

      // ─── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        "section": "clamp(4rem, 8vw, 8rem)",
      },

      // ─── Border Radius ───────────────────────────────────────────────────
      borderRadius: {
        "card":  "1rem",
        "badge": "0.75rem",
        "pill":  "9999px",
      },

      // ─── Animation ───────────────────────────────────────────────────────
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { transform: "translateX(-100%) skewX(-12deg)" },
          to:   { transform: "translateX(300%) skewX(-12deg)" },
        },
        "scanline": {
          "0%":   { top: "0%" },
          "100%": { top: "100%" },
        },
        "orb-drift-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%":      { transform: "translate(80px, -60px)" },
          "66%":      { transform: "translate(-40px, 40px)" },
        },
        "orb-drift-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%":      { transform: "translate(-100px, 80px)" },
          "66%":      { transform: "translate(60px, -40px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.08" },
          "50%":      { opacity: "0.25" },
        },
      },
      animation: {
        ticker:       "ticker 25s linear infinite",
        shimmer:      "shimmer 1.4s ease-out",
        "orb-drift-1": "orb-drift-1 22s ease-in-out infinite",
        "orb-drift-2": "orb-drift-2 28s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },

      // ─── Max Width ───────────────────────────────────────────────────────
      maxWidth: {
        "8xl": "88rem",
      },

      // ─── Backdrop Blur ───────────────────────────────────────────────────
      backdropBlur: {
        soft:   "8px",
        medium: "16px",
        strong: "24px",
      },

      // ─── Box Shadow ──────────────────────────────────────────────────────
      boxShadow: {
        "card":         "0 8px 32px -8px rgba(0,0,0,0.5)",
        "card-hover":   "0 16px 48px -12px rgba(0,0,0,0.6)",
        "glow-teal":    "0 0 40px rgba(45,212,191,0.2)",
        "glow-emerald": "0 0 40px rgba(16,185,129,0.2)",
        "glow-teal-lg": "0 0 80px rgba(45,212,191,0.25)",
        "modal":        "0 25px 50px rgba(0,0,0,0.8), 0 0 60px rgba(45,212,191,0.12)",
      },

      // ─── Transition Timing ───────────────────────────────────────────────
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      // ─── Z-Index ─────────────────────────────────────────────────────────
      zIndex: {
        "-10": "-10",
        "60":  "60",
        "100": "100",
        "110": "110",
        "120": "120",
      },
    },
  },
  plugins: [],
};

export default config;
