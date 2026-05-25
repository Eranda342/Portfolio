"use client";

import { useState, useEffect } from "react";
import { CinematicBackground } from "@/components/effects/CinematicBackground";
import { CommandPalette } from "@/components/effects/CommandPalette";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechTicker } from "@/components/sections/TechTicker";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { CompetenciesSection } from "@/components/sections/CompetenciesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GlobeVisualization } from "@/components/effects/GlobeVisualization";

export default function HomePage() {
  const [cmdOpen, setCmdOpen] = useState(false);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Fixed / Global UI ─────────────────────────────────────── */}
      <CinematicBackground />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* ── App Shell ─────────────────────────────────────────────── */}
      <Navbar onOpenCommand={() => setCmdOpen(true)} />

      <main id="main-content" className="relative z-10 pt-20">
        <HeroSection />
        <TechTicker />
        <TechShowcase />
        <GlobeVisualization />
        <CompetenciesSection />
        <ProjectsSection />
        <StatsSection />
        <TimelineSection />
        <GitHubSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
