"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import AnimatedText from "@/components/animations/AnimatedText";
import { Type, Check, Copy, Sliders, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_SAMPLES = [
  {
    level: "Display 1",
    tag: "96px / 6.0rem",
    weight: "Extrabold 800",
    tracking: "-0.04em",
    preview: "Elevated Visual Craft",
    cssClass: "text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white",
  },
  {
    level: "Heading 1",
    tag: "48px / 3.0rem",
    weight: "Bold 700",
    tracking: "-0.03em",
    preview: "Architectural Next.js Design Systems",
    cssClass: "text-3xl sm:text-5xl font-bold tracking-tight text-white",
  },
  {
    level: "Heading 2",
    tag: "32px / 2.0rem",
    weight: "Semibold 600",
    tracking: "-0.02em",
    preview: "Clean baseline alignment and dynamic scale tokens",
    cssClass: "text-2xl sm:text-3xl font-semibold tracking-tight text-indigo-200",
  },
  {
    level: "Body Lead",
    tag: "18px / 1.125rem",
    weight: "Regular 400",
    tracking: "normal",
    preview: "Typography is the foundation of digital clarity. Every character, baseline ratio, and tracking token has been calibrated for optimal readability across modern high-density screens.",
    cssClass: "text-base sm:text-lg text-slate-300 font-normal leading-relaxed",
  },
  {
    level: "Monospace Spec",
    tag: "14px / 0.875rem",
    weight: "Medium 500",
    tracking: "0.05em",
    preview: "const typography = { fontSans: 'Plus Jakarta Sans', fontMono: 'JetBrains Mono' };",
    cssClass: "font-mono text-xs sm:text-sm text-emerald-400 bg-slate-950 p-4 rounded-xl border border-emerald-500/20",
  },
];

export default function TypographyPlayground() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="typography" className="py-24 relative bg-slate-950/60 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <RevealOnScroll variant="fade-up" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-purple-300 mb-4 border border-purple-500/30">
            <Type className="h-3.5 w-3.5 text-purple-400" />
            <span>TYPOGRAPHY DESIGN SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Harmonious Type Hierarchy
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Clean, legible, and balanced typography built with Google Fonts <span className="text-white font-medium">Plus Jakarta Sans</span> and <span className="text-emerald-400 font-mono">JetBrains Mono</span>.
          </p>
        </RevealOnScroll>

        {/* Type Spec Cards */}
        <RevealOnScroll variant="stagger-children" stagger={0.12} className="space-y-6">
          {TYPE_SAMPLES.map((sample, idx) => (
            <div
              key={sample.level}
              className="glass-card rounded-2xl p-6 sm:p-8 relative group transition-all duration-300 hover:border-indigo-500/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-mono text-xs border border-indigo-500/20">
                    {sample.level}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {sample.tag} • {sample.weight}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(sample.cssClass, idx)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied CSS</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Classes</span>
                    </>
                  )}
                </button>
              </div>

              {/* Text Sample */}
              <div className="pt-2">
                <p className={sample.cssClass}>{sample.preview}</p>
              </div>
            </div>
          ))}
        </RevealOnScroll>

        {/* Feature Quote Callout */}
        <RevealOnScroll variant="fade-up" delay={0.3} className="mt-12">
          <div className="p-8 sm:p-10 rounded-2xl glass-panel border-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="h-44 w-44 text-indigo-400" />
            </div>
            <p className="text-xl sm:text-2xl text-slate-200 font-serif italic mb-4 leading-relaxed">
              &ldquo;Good typography is silent. It communicates clarity and structural order without getting in the way of the user experience.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                AT
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Aura Design Guidelines</p>
                <p className="text-[11px] text-slate-400 font-mono">Typography & Layout Standard</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
