"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    // Fast, minimal entrance animation (0.3s)
    tl.fromTo(
      logoRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.5)" }
    );

    // Text reveal (0.25s)
    tl.fromTo(
      textRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
      "-=0.2"
    );

    // Fast snappy progress bar (0.45s)
    tl.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 0.45, ease: "power2.inOut" },
      "-=0.2"
    );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-between p-6 select-none w-full h-full"
    >
      {/* Top Header Version Badge */}
      <div className="w-full pt-4 flex justify-end">
        <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
          v2.4 • Religare
        </span>
      </div>

      {/* Center Branding */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-lg animate-pulse scale-125" />
          <div
            ref={logoRef}
            className="relative h-16 w-16 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center p-2.5"
          >
            <Image
              src="/Clip path group.svg"
              alt="Religare Logo"
              width={56}
              height={56}
              className="h-12 w-12 object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Branding */}
        <div ref={textRef} className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
            Religare
          </h1>
          <p className="text-[11px] font-semibold text-slate-500 tracking-wide max-w-xs leading-normal">
            Religare Broking &amp; Wealth Platform
          </p>
        </div>
      </div>

      {/* Bottom Loading Indicator */}
      <div className="w-full max-w-xs space-y-2 pb-4">
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-emerald-600 rounded-full"
          />
        </div>
        <p className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-widest">
          Loading market data...
        </p>
      </div>
    </div>
  );
}
