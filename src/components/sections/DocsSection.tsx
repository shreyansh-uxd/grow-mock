"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import MagneticButton from "@/components/animations/MagneticButton";
import { Terminal, Copy, Check, ArrowRight, FolderGit2, PackageCheck } from "lucide-react";

export default function DocsSection() {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const command = "git clone https://github.com/your-repo/aura-starter.git && cd aura-starter && npm install";

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(command);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="docs" className="py-24 relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <RevealOnScroll variant="fade-up" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-cyan-300 mb-4 border border-cyan-500/30">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>GET STARTED IN SECONDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Zero Setup Overhead
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Clone the repository, run `npm install`, and launch your next high-performance web project immediately.
          </p>
        </RevealOnScroll>

        {/* Quick Command Box */}
        <RevealOnScroll variant="scale-up" className="max-w-3xl mx-auto mb-16">
          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4 font-mono text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-indigo-400 font-bold">$</span>
              <span className="whitespace-nowrap text-slate-300">{command}</span>
            </div>

            <button
              onClick={handleCopyCmd}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              {copiedCmd ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </RevealOnScroll>

        {/* Project Layout Summary */}
        <RevealOnScroll variant="stagger-children" stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <FolderGit2 className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">1. App Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              src/app/<br />
              ├── layout.tsx<br />
              ├── page.tsx<br />
              └── globals.css
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <PackageCheck className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">2. GSAP Animations</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              src/components/animations/<br />
              ├── RevealOnScroll.tsx<br />
              ├── AnimatedText.tsx<br />
              └── MagneticButton.tsx
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <Terminal className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">3. Design Tokens</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              src/lib/<br />
              ├── gsap.ts (SSR Safe)<br />
              └── utils.ts (Tailwind Merge)
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
