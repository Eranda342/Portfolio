"use client";

import { Command, ChevronRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CMD_ITEMS } from "@/data/portfolio";

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <Dialog.Root open={open} onOpenChange={(val) => !val && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#08090B]/80 backdrop-blur-sm transition-all" />
        <Dialog.Content className="fixed left-1/2 top-1/4 z-[110] w-full max-w-lg -translate-x-1/2 rounded-2xl bg-[#0E1012] border border-white/[0.08] shadow-2xl overflow-hidden p-2">
          <div className="flex items-center gap-3 px-3 py-4 border-b border-white/[0.05]">
            <Command size={18} className="text-white/40" />
            <input
              type="text"
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent border-none outline-none text-white font-sans text-sm placeholder:text-white/30"
              autoFocus
            />
          </div>
          <div className="p-2 py-4 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            <div className="px-3 pb-2 text-xs font-sans font-medium text-white/30 uppercase tracking-wider">Suggestions</div>
            {CMD_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const actionMap: Record<string, string> = {
                      projects: "#projects",
                      contact: "#contact",
                      about: "#about",
                    };
                    const link = actionMap[item.action];
                    if (link) {
                      const id = link.replace("#", "");
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    } else if (item.action === "github") {
                      window.open("https://github.com", "_blank");
                    } else if (item.action === "linkedin") {
                      window.open("https://linkedin.com", "_blank");
                    } else if (item.action === "resume") {
                      window.open("/resume.pdf", "_blank");
                    }
                  }, 150);
                }}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-teal-500/30 group-hover:bg-teal-500/10 transition-colors">
                    <item.icon size={14} className="text-white/50 group-hover:text-teal-400 transition-colors" />
                  </div>
                  <span className="text-sm font-sans text-white/70 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={14} className="text-white/20 group-hover:text-teal-500 transition-colors" />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
