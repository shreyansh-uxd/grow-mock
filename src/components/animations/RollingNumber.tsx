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
      const normalColor = isUp ? "#059669" : "#e11d48";

      gsap.fromTo(
        digits,
        {
          opacity: 0.6,
          color: isUp ? "#10b981" : "#f43f5e",
        },
        {
          opacity: 1,
          color: normalColor,
          duration: 0.35,
          stagger: 0.02,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [value, tickTime] }
  );

  return (
    <span
      ref={containerRef}
      className={`text-[11px] font-extrabold font-mono transition-all inline-flex items-center gap-0.25 ${
        isPositive ? "text-emerald-600" : "text-rose-600"
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
