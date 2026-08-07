"use client";

import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

const TAB_TITLES: Record<string, string> = {
  stocks: "Stocks",
  watchlist: "Watchlist",
  portfolio: "Portfolio",
  more: "Account",
};

export default function Navbar({ activeTab, onOpenSearch, onOpenProfile }: NavbarProps) {
  const currentTitle = TAB_TITLES[activeTab] || "Stocks";

  return (
    <header className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between">
      {/* Left Clover Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          {/* Logo sized 1.5x larger (48px / h-12 w-12) */}
          <div className="h-12 w-12 flex items-center justify-center shrink-0">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight font-sans">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right Search & Profile Avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <div
          onClick={onOpenProfile}
          className="h-9 w-9 rounded-full bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm shadow-inner cursor-pointer hover:scale-105 transition-transform"
          title="Open Profile"
        >
          A
        </div>
      </div>
    </header>
  );
}
