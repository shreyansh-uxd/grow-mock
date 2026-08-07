"use client";

import React, { useRef } from "react";
import AnimatedText from "@/components/animations/AnimatedText";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import MagneticButton from "@/components/animations/MagneticButton";
import { ArrowRight, Terminal, Layers, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.to(cardRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: cardRef }
  );

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Radial Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Pill Badge */}
          <RevealOnScroll variant="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill mb-8 text-xs font-mono text-indigo-300 border border-indigo-500/30">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NEXT.JS APP ROUTER + GSAP ANIMATIONS</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">CLEAN STARTER</span>
            </div>
          </RevealOnScroll>

          {/* Main Animated Headline */}
          <div className="max-w-4xl mb-6">
            <AnimatedText
              text="Uncompromising Precision for Modern Web Applications"
              as="h1"
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] justify-center"
              delay={0.2}
              splitBy="words"
            />
          </div>

          {/* Subtitle */}
          <RevealOnScroll variant="fade-up" delay={0.5} className="max-w-2xl mb-10">
            <p className="text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed">
              An architectural Next.js starter kit crafted with refined typography design tokens, fluid spacing grids, and high-performance GSAP animation primitives.
            </p>
          </RevealOnScroll>

          {/* CTA Buttons */}
          <RevealOnScroll variant="fade-up" delay={0.65} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <MagneticButton strength={0.4}>
              <a
                href="#typography"
                className="px-7 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xl shadow-indigo-600/30 border border-indigo-400/30 flex items-center gap-2 transition-all"
              >
                <span>Explore Typography</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href="#docs"
                className="px-7 py-3.5 text-sm font-semibold text-slate-300 hover:text-white glass-pill hover:bg-white/10 rounded-xl flex items-center gap-2 transition-all"
              >
                <Terminal className="h-4 w-4 text-indigo-400" />
                <span>Quick Start Guide</span>
              </a>
            </MagneticButton>
          </RevealOnScroll>

          {/* Stat Badges */}
          <RevealOnScroll variant="fade-up" delay={0.8} className="w-full max-w-3xl mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border-white/10">
              <div className="flex flex-col items-center p-3 text-center">
                <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">60 FPS</span>
                <span className="text-xs text-slate-400 font-medium">GSAP Render Speed</span>
              </div>
              <div className="flex flex-col items-center p-3 text-center border-l border-white/5">
                <span className="text-2xl md:text-3xl font-extrabold text-indigo-400 font-mono">100%</span>
                <span className="text-xs text-slate-400 font-medium">Lighthouse Score</span>
              </div>
              <div className="flex flex-col items-center p-3 text-center border-l border-white/5">
                <span className="text-2xl md:text-3xl font-extrabold text-purple-400 font-mono">0.0s</span>
                <span className="text-xs text-slate-400 font-medium">CLS / Layout Shift</span>
              </div>
              <div className="flex flex-col items-center p-3 text-center border-l border-white/5">
                <span className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">TypeSafe</span>
                <span className="text-xs text-slate-400 font-medium">Strict TypeScript</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Interactive Code Preview Card */}
          <RevealOnScroll variant="scale-up" delay={0.95} className="w-full max-w-4xl">
            <div
              ref={cardRef}
              className="relative rounded-2xl glass-panel p-1 border border-white/15 shadow-2xl shadow-indigo-950/40 text-left overflow-hidden group"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-white/10 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-slate-400">src/app/page.tsx</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>GSAP ScrollTrigger Active</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-6 bg-slate-950/90 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto">
                <p className="text-slate-500">// Initialize GSAP ScrollTrigger safely inside Next.js App Router</p>
                <p className="mt-2"><span className="text-purple-400">import</span> {"{"} useGSAP {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;@gsap/react&quot;</span>;</p>
                <p><span className="text-purple-400">import</span> gsap <span className="text-purple-400">from</span> <span className="text-emerald-300">&quot;gsap&quot;</span>;</p>
                <br />
                <p><span className="text-blue-400">export default function</span> <span className="text-yellow-300">AnimatedComponent</span>() {"{"}</p>
                <p className="pl-4 text-slate-400"><span className="text-blue-400">const</span> containerRef = <span className="text-yellow-300">useRef</span>(null);</p>
                <br />
                <p className="pl-4"><span className="text-yellow-300">useGSAP</span>(() =&gt; {"{"}</p>
                <p className="pl-8 text-indigo-300">gsap.fromTo(<span className="text-emerald-300">&quot;.card&quot;</span>, {"{"} opacity: 0, y: 30 {"}"}, {"{"} opacity: 1, y: 0, stagger: 0.15 {"}"});</p>
                <p className="pl-4">{"}"}, {"{"} scope: containerRef {"}"});</p>
                <br />
                <p className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-rose-400">div</span> ref=&#123;containerRef&#125;&gt;...&lt;/<span className="text-rose-400">div</span>&gt;;</p>
                <p>{"}"}</p>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
