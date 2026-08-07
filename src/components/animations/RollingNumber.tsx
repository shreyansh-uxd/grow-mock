"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface RollingNumberProps {
  value: string;
  isPositive: boolean;
  tickTime?: number;
  className?: string;
}

export default function RollingNumber({ value, isPositive, tickTime, className = "" }: RollingNumberProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars = value.split("");

  useGSAP(
    () => {
      if (!tickTime || !containerRef.current) return;

      const digits = containerRef.current.querySelectorAll(".rolling-char");
      const isUp = isPositive;

      // Slot machine digit roll effect
      gsap.fromTo(
        digits,
        {
          y: isUp ? 12 : -12,
          opacity: 0,
          scale: 0.85,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.03,
          ease: "back.out(1.7)",
        }
      );

      // Glow pop pulse
      gsap.fromTo(
        containerRef.current,
        {
          scale: 1.12,
          backgroundColor: isUp ? "#dcfce7" : "#ffe4e6",
        },
        {
          scale: 1,
          backgroundColor: isPositive ? "#f0fdf4" : "#fff1f2",
          duration: 0.7,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [value, tickTime] }
  );

  return (
    <span
      ref={containerRef}
      className={`text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full border transition-all inline-flex items-center gap-0.5 ${
        isPositive
          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
          : "bg-rose-50 text-rose-600 border-rose-200"
      } ${className}`}
    >
      {chars.map((char, index) => (
        <span key={`${index}-${char}`} className="rolling-char inline-block tracking-tighter">
          {char}
        </span>
      ))}
    </span>
  );
}
