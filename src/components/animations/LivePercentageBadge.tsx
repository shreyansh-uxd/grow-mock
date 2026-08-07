"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface LivePercentageBadgeProps {
  changePercent: number;
  isPositive: boolean;
  tickTime?: number;
  lastDirection?: "up" | "down";
  className?: string;
}

export default function LivePercentageBadge({
  changePercent,
  isPositive,
  tickTime,
  lastDirection,
  className = "",
}: LivePercentageBadgeProps) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!tickTime || !badgeRef.current || !textRef.current) return;

      const isUp = lastDirection === "up";
      const glowColor = isUp ? "rgba(16, 185, 129, 0.35)" : "rgba(244, 63, 94, 0.35)";
      const bgFlash = isUp ? "#dcfce7" : "#ffe4e6";
      const textFlash = isUp ? "#15803d" : "#be123c";

      const tl = gsap.timeline();

      tl.fromTo(
        textRef.current,
        { y: isUp ? 4 : -4, opacity: 0.3 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );

      tl.fromTo(
        badgeRef.current,
        {
          scale: 1.08,
          boxShadow: `0 0 12px ${glowColor}`,
          backgroundColor: bgFlash,
          color: textFlash,
        },
        {
          scale: 1,
          boxShadow: "0 0 0px transparent",
          backgroundColor: isPositive ? "#f0fdf4" : "#fff1f2",
          color: isPositive ? "#16a34a" : "#e11d48",
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      );
    },
    { scope: badgeRef, dependencies: [changePercent, tickTime] }
  );

  const formattedPct = changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;

  return (
    <span
      ref={badgeRef}
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-all inline-flex items-center justify-center ${
        isPositive
          ? "bg-emerald-50 text-emerald-600 border-emerald-200/80"
          : "bg-rose-50 text-rose-600 border-rose-200/80"
      } ${className}`}
    >
      <span ref={textRef} className="inline-block font-mono tracking-tight">
        {formattedPct}
      </span>
    </span>
  );
}
