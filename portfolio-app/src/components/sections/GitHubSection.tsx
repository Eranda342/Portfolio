"use client";

import { motion } from "framer-motion";
import { Activity, Code2, Github, GitBranch, Star } from "lucide-react";
import { LANGUAGES, REPOS } from "@/data/portfolio";

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

export function GitHubSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div
        className="absolute top-1/2 right-0 w-[50vw] h-[50vh] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #14B8A6 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs text-cyan-300 font-mono uppercase tracking-widest">Activity</span>
          </div>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-10 sm:mb-16"
            style={{ letterSpacing: "-0.03em" }}
          >
            GitHub Dashboard
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contribution graph */}
            <div
              className={`lg:col-span-2 min-w-0 p-4 sm:p-6 rounded-2xl glass-soft overflow-hidden`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
                <div className="flex items-center gap-2 min-w-0">
                  <Activity size={15} className="text-teal-300 shrink-0" />
                  <span className="text-sm text-white/70 font-sans font-medium truncate">Contribution Activity</span>
                </div>
                <span className="text-[11px] sm:text-xs text-white/30 font-mono shrink-0">Last 6 months</span>
              </div>
              <ContributionGraph />
              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-[11px] text-white/25 font-sans">Less</span>
                {["#1e293b", "#1e3a5f", "#2563eb50", "#2DD4BF", "#60a5fa"].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
                ))}
                <span className="text-[11px] text-white/25 font-sans">More</span>
              </div>
            </div>

            {/* Languages */}
            <div
              className={`min-w-0 p-4 sm:p-6 rounded-2xl glass-soft`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={15} className="text-cyan-300" />
                <span className="text-sm text-white/70 font-sans font-medium">Top Languages</span>
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
                      <span className="text-sm text-white/60 font-sans">{lang.name}</span>
                    </div>
                    <span className="text-sm text-white/40 font-mono">{lang.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent repos */}
            <div
              className={`lg:col-span-3 min-w-0 p-4 sm:p-6 rounded-2xl glass-soft`}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Github size={15} className="text-teal-300" />
                <span className="text-sm text-white/70 font-sans font-medium">Recent Repositories</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {REPOS.map(repo => (
                  <div
                    key={repo.name}
                    className={`p-4 rounded-xl glass-medium hover:bg-white/[0.09] transition-all duration-200 group cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <GitBranch size={14} className="text-teal-300 mt-0.5" />
                      <div className="flex items-center gap-1 text-[11px] text-white/35 font-mono">
                        <Star size={10} />
                        {repo.stars}
                      </div>
                    </div>
                    <p className="text-sm text-white/80 font-mono mb-1 group-hover:text-white transition-colors">
                      {repo.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-white/30 font-sans">{repo.lang}</span>
                      <span className="text-[11px] text-white/25 font-sans">{repo.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
