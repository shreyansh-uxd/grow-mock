"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import MagneticButton from "@/components/animations/MagneticButton";
import { Code2, Play, Sparkles, CheckCircle2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "gsap-scroll",
    label: "RevealOnScroll.tsx",
    icon: Play,
    language: "tsx",
    code: `"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollTriggerDemo() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".reveal-item", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });
  }, { scope: container });

  return <div ref={container}>...</div>;
}`,
    highlights: ["useGSAP hook for automatic cleanup", "ScrollTrigger integration", "GPU-accelerated transforms"],
  },
  {
    id: "text-stagger",
    label: "AnimatedText.tsx",
    icon: Code2,
    language: "tsx",
    code: `"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TextReveal({ text }) {
  const headingRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".animated-token",
      { opacity: 0, y: 35, rotateX: -45 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.05, ease: "power4.out" }
    );
  }, { scope: headingRef });

  return <h1 ref={headingRef}>{/* Tokenized words */}</h1>;
}`,
    highlights: ["3D perspective rotation", "Word and character tokenization", "60fps frame rate"],
  },
  {
    id: "magnetic",
    label: "MagneticButton.tsx",
    icon: Sparkles,
    language: "tsx",
    code: `"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function MagneticButton({ children, strength = 0.35 }) {
  const btnRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: btnRef });

  const handleMouseMove = contextSafe((e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(btnRef.current, { x, y, duration: 0.4, ease: "power2.out" });
  });

  return <button ref={btnRef} onMouseMove={handleMouseMove}>{children}</button>;
}`,
    highlights: ["ContextSafe event handlers", "Elastic spring back effect", "Smooth cursor tracking"],
  },
];

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [copied, setCopied] = useState(false);

  const activeData = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="showcase" className="py-24 relative bg-slate-950/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <RevealOnScroll variant="fade-up" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-emerald-300 mb-4 border border-emerald-500/30">
            <Code2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>INTERACTIVE CODE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Production-Ready GSAP Patterns
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Inspect the exact TypeScript & GSAP implementation patterns pre-packed in this starter kit.
          </p>
        </RevealOnScroll>

        {/* Tab Navigation & Code Editor Showcase */}
        <RevealOnScroll variant="scale-up" className="w-full">
          <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl shadow-indigo-950/40">
            
            {/* Tab Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10 overflow-x-auto">
              <div className="flex items-center gap-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap",
                        isActive
                          ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-600/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body & Key Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-slate-950">
              
              {/* Code Snippet */}
              <div className="lg:col-span-2 p-6 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto border-b lg:border-b-0 lg:border-r border-white/10 leading-relaxed">
                <pre>
                  <code>{activeData.code}</code>
                </pre>
              </div>

              {/* Highlights & Architecture Panel */}
              <div className="p-6 bg-slate-900/40 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Key Features</span>
                  </h4>
                  <ul className="space-y-3">
                    {activeData.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                    💡 Tip: All GSAP hooks are scoped with `@gsap/react` to prevent memory leaks during hot module reloading.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
