"use client";

import React, { useRef } from "react";
import { StockTickState } from "@/context/StockContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface LivePriceTagProps {
  stock: StockTickState;
  size?: "normal" | "large";
}

export default function LivePriceTag({ stock, size = "normal" }: LivePriceTagProps) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!stock.tickTime) return;

      const isUp = stock.lastDirection === "up";
      const glowColor = isUp ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)";

      const tl = gsap.timeline();

      if (priceRef.current) {
        tl.fromTo(
          priceRef.current,
          {
            y: isUp ? 4 : -4,
            opacity: 0.3,
            color: isUp ? "#15803d" : "#be123c",
          },
          {
            y: 0,
            opacity: 1,
            color: "#1e293b",
            duration: 0.4,
            ease: "power3.out",
          }
        );
      }

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          {
            scale: 1.08,
            boxShadow: `0 0 12px ${glowColor}`,
          },
          {
            scale: 1,
            boxShadow: "0 0 0px transparent",
            duration: 0.7,
            ease: "power2.out",
          },
          "<"
        );
      }
    },
    { scope: priceRef, dependencies: [stock.price, stock.tickTime] }
  );

  const priceTextSize = size === "large" ? "text-base font-bold" : "text-sm font-bold";
  const badgeTextSize = size === "large" ? "text-[11px] font-medium" : "text-[10px] font-medium";

  return (
    <div className="inline-flex flex-col items-start">
      {/* Refined lighter price typography */}
      <span ref={priceRef} className={`${priceTextSize} text-slate-800 block tracking-tight font-mono`}>
        ${stock.price.toFixed(2)}
      </span>


      {/* Refined percentage badge */}
      <span
        ref={badgeRef}
        className={`${badgeTextSize} inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-mono ${
          stock.isPositive ? "text-emerald-600 bg-emerald-50/70" : "text-rose-600 bg-rose-50/70"
        }`}
      >
        {stock.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {stock.isPositive
          ? `+${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`
          : `${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`}
      </span>
    </div>
  );
}
