"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ShimmerButtonProps {
  children:   React.ReactNode;
  href?:      string;
  onClick?:   () => void;
  variant?:   "primary" | "ghost";
  className?: string;
  target?:    string;
  rel?:       string;
  download?:  boolean;
  id?:        string;
}

export function ShimmerButton({
  children,
  href,
  onClick,
  variant = "ghost",
  className,
  target,
  rel,
  download,
  id,
}: ShimmerButtonProps) {
  const variantClasses = {
    primary:
      "bg-teal-400 text-[#04201D] font-bold shadow-[0_0_40px_-10px_rgba(45,212,191,0.5)] hover:shadow-[0_0_60px_-15px_rgba(45,212,191,0.6)]",
    ghost:
      "bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150 border border-white/[0.08] shadow-xl text-white hover:bg-white/[0.08] font-medium",
  };

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl",
    "font-sans overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]",
    variantClasses[variant],
    className
  );

  const shimmer = variant === "primary" ? (
    <span
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
    />
  ) : null;

  const content = (
    <>
      {shimmer}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={base}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      onClick={onClick}
      className={base}
    >
      {content}
    </button>
  );
}
