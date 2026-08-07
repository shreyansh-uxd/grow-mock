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
          {/* Logo slightly reduced to h-6 w-6 */}
          <div className="h-6 w-6 flex items-center justify-center shrink-0">
            <Image
              src="/Clip path group.svg"
              alt="Religare Logo"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
              priority
            />
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <h1 className="text-xl font-semibold text-slate-600 tracking-tight font-sans">
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

        <button
          onClick={onOpenProfile}
          className="h-7 w-7 rounded-full overflow-hidden border border-slate-200 shadow-2xs cursor-pointer hover:scale-105 transition-transform shrink-0"
          title="Open Profile"
        >
          <img
            src="/avatar.png"
            alt="Aditya Sharma"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
