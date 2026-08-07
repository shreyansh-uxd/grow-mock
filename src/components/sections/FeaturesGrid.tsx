"use client";

import React, { useRef } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { Zap, Layout, Cpu, ShieldCheck, Sparkles, Layers, MousePointerClick, RefreshCw } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FEATURES = [
  {
    icon: Zap,
    title: "GSAP Animation Engine",
    description: "Built-in `@gsap/react` integration with `ScrollTrigger` plugin registered safely for Next.js App Router SSR.",
    color: "from-amber-500/20 to-orange-500/5",
    iconColor: "text-amber-400",
    badge: "Hardware Accelerated",
  },
  {
    icon: Layout,
    title: "Clean Typography Tokens",
    description: "Curated Google Font variables (`Plus Jakarta Sans` & `JetBrains Mono`) with fluid font sizes and balanced leading.",
    color: "from-indigo-500/20 to-blue-500/5",
    iconColor: "text-indigo-400",
    badge: "Fluid Scales",
  },
  {
    icon: Cpu,
    title: "Zero Layout Shift",
    description: "Strict baseline alignment and GPU-accelerated transforms ensure crisp 60fps rendering without jank.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-400",
    badge: "100 Performance",
  },
  {
    icon: ShieldCheck,
    title: "Strict TypeScript",
    description: "End-to-end strict type safety for animation props, layout structures, and component variants.",
    color: "from-purple-500/20 to-pink-500/5",
    iconColor: "text-purple-400",
    badge: "Type Safe",
  },
  {
    icon: MousePointerClick,
    title: "Magnetic Micro-Interactions",
    description: "Spring-loaded magnetic buttons and custom cursor tracking using GSAP spring elasticity.",
    color: "from-rose-500/20 to-red-500/5",
    iconColor: "text-rose-400",
    badge: "Interactive",
  },
  {
    icon: Layers,
    title: "Modular App Architecture",
    description: "Clean separation of animation hooks, UI primitives, and layout sections for rapid development.",
    color: "from-cyan-500/20 to-sky-500/5",
    iconColor: "text-cyan-400",
    badge: "Modular",
  },
];

function TiltCard({ feature }: { feature: typeof FEATURES[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  const Icon = feature.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-7 flex flex-col justify-between h-full relative group cursor-pointer overflow-hidden transform-gpu"
    >
      {/* Background Gradient Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
            <Icon className={`h-6 w-6 ${feature.iconColor}`} />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10">
            {feature.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">
        <span>EXPLORE FEATURE</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <RevealOnScroll variant="fade-up" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-indigo-300 mb-4 border border-indigo-500/30">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>ENGINEERED FOR EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything You Need in a Starter
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Pre-configured with modern Web App development standards, responsive component architecture, and smooth GSAP physics.
          </p>
        </RevealOnScroll>

        {/* Bento Grid */}
        <RevealOnScroll variant="stagger-children" stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <TiltCard key={feature.title} feature={feature} />
          ))}
        </RevealOnScroll>

      </div>
    </section>
  );
}
