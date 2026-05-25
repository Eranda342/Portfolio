// ─── Portfolio Type Definitions ────────────────────────────────────────────
import type React from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface TechItem {
  name: string;
  glow?: boolean;
}

export interface Competency {
  icon: React.ElementType;
  title: string;
  desc: string;
  accent: string;
  glow: string;
}

export interface Project {
  title: string;
  desc: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  accent: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  org: string;
  desc: string;
  type: "education" | "project" | "milestone";
  accent: string;
}

export interface Language {
  name: string;
  pct: number;
  color: string;
}

export interface Repo {
  name: string;
  stars: number;
  lang: string;
  updated: string;
}

export interface CommandItem {
  label: string;
  icon: React.ElementType;
  action: string;
}

export interface AttributeCard {
  icon: React.ElementType;
  label: string;
  desc: string;
  accent: string;
}
