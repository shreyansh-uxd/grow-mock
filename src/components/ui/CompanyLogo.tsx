"use client";

import React from "react";

interface CompanyLogoProps {
  symbol: string;
  className?: string;
  size?: number;
}

export default function CompanyLogo({ symbol, className = "h-10 w-10" }: CompanyLogoProps) {
  const sym = symbol.toUpperCase();

  switch (sym) {
    case "BLUESTONE":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/unnamed.png"
            alt="BlueStone"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "ATHER":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/ather-energy-logo-png_seeklogo-463951.png"
            alt="Ather Energy"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "REDINGTON":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/images.png"
            alt="Redington"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "PINELABS":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/pinelabs_35626_logo_1647258760_eydtd.avif"
            alt="Pine Labs"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "PW":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/physics-wallah-logo-png_seeklogo-474856.png"
            alt="Physics Wallah"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "TATAMOTORS":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/2017-logo-Tata-Motors.jpg"
            alt="Tata Motors"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "UNIONBANK":
      return (
        <div className={`${className} rounded-2xl bg-white border border-slate-100/60 flex items-center justify-center p-1 overflow-hidden shrink-0`}>
          <img
            src="/UNIONBANK.NS-5bba728d.png"
            alt="Union Bank"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
      );

    case "AXISBANK":
      return (
        <div className={`${className} rounded-2xl bg-white border border-rose-50 flex items-center justify-center p-1.5 shrink-0`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect width="100" height="100" rx="20" fill="#fff1f2" />
            <path d="M50 20L80 75H20L50 20Z" fill="#9f1239" />
            <path d="M50 45L65 75H35L50 45Z" fill="#ffffff" />
          </svg>
        </div>
      );

    case "LT":
      return (
        <div className={`${className} rounded-2xl bg-white border border-sky-50 flex items-center justify-center p-1.5 shrink-0`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect width="100" height="100" rx="20" fill="#0369a1" />
            <text x="50%" y="60%" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="bold" fontFamily="sans-serif">L&amp;T</text>
          </svg>
        </div>
      );

    case "RELIANCE":
      return (
        <div className={`${className} rounded-2xl bg-white border border-amber-50 flex items-center justify-center p-1.5 shrink-0`}>
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect width="100" height="100" rx="20" fill="#fef3c7" />
            <circle cx="50" cy="50" r="30" stroke="#ca8a04" strokeWidth="6" fill="#ca8a04" />
            <path d="M42 35H55C60 35 63 38 63 42C63 46 60 49 55 49H48V65H42V35ZM48 42V45H54C56 45 57 44 57 43C57 42 56 42 54 42H48Z" fill="#ffffff" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`${className} rounded-2xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0`}>
          {sym.slice(0, 2)}
        </div>
      );
  }
}
