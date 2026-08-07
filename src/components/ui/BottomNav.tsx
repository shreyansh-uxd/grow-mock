"use client";

import React, { useRef, useEffect } from "react";
import { TrendingUp, BarChart2, Folder, MoreHorizontal } from "lucide-react";
import gsap from "gsap";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "stocks", label: "Stocks", icon: TrendingUp },
  { id: "watchlist", label: "Watchlist", icon: BarChart2 },
  { id: "portfolio", label: "Portfolio", icon: Folder },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);

  // Animate the sliding indicator pill to the active tab
  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab);
    const activeButton = buttonRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    const nav = navRef.current;

    if (!activeButton || !indicator || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeButton.getBoundingClientRect();

    const targetX = btnRect.left - navRect.left + btnRect.width / 2 - 16; // center 32px pill

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(indicator, { x: targetX, opacity: 1 });
      return;
    }

    // Morphing slide animation with overshoot
    gsap.to(indicator, {
      x: targetX,
      duration: 0.45,
      ease: "elastic.out(1, 0.75)",
    });

    // Pulse the active icon
    gsap.fromTo(
      activeButton.querySelector(".nav-icon"),
      { scale: 0.7, rotate: -8 },
      { scale: 1, rotate: 0, duration: 0.4, ease: "back.out(2)" }
    );

    // Bounce the label
    gsap.fromTo(
      activeButton.querySelector(".nav-label"),
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.08 }
    );
  }, [activeTab]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-4 py-2">
      <div ref={navRef} className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Sliding Active Indicator Pill */}
        <div
          ref={indicatorRef}
          className="absolute -top-2 w-8 h-1 bg-emerald-500 rounded-full opacity-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          style={{ willChange: "transform" }}
        />

        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { buttonRefs.current[idx] = el; }}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center gap-1 py-1 px-3 cursor-pointer group"
            >
              <div className="nav-icon">
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isActive ? "text-emerald-600 stroke-[2.2]" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
              </div>
              <span
                className={`nav-label text-[10px] font-bold transition-colors duration-200 ${
                  isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
