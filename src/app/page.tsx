"use client";

import React, { useState, useRef, useCallback } from "react";
import Navbar from "@/components/ui/Navbar";
import LightMarketTicker from "@/components/ui/LightMarketTicker";
import RecentlyViewed from "@/components/sections/RecentlyViewed";
import MostTraded from "@/components/sections/MostTraded";
import FinancialTools from "@/components/sections/FinancialTools";
import TopMovers from "@/components/sections/TopMovers";
import TopIntraday from "@/components/sections/TopIntraday";
import StocksInNews from "@/components/sections/StocksInNews";
import WatchlistView from "@/components/views/WatchlistView";
import PortfolioView from "@/components/views/PortfolioView";
import MoreView from "@/components/views/MoreView";
import BottomNav from "@/components/ui/BottomNav";
import StockDetailModal from "@/components/modals/StockDetailModal";
import SearchModal from "@/components/modals/SearchModal";
import PageTransition from "@/components/animations/PageTransition";
import { Stock } from "@/lib/stocks-data";
import { StockProvider } from "@/context/StockContext";

/* Tab ordering used to determine slide direction */
const TAB_ORDER = ["stocks", "watchlist", "portfolio", "more"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("stocks");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(0);
  const prevTabRef = useRef("stocks");

  const handleTabChange = useCallback(
    (newTab: string) => {
      if (newTab === activeTab) return;

      const prevIdx = TAB_ORDER.indexOf(prevTabRef.current);
      const nextIdx = TAB_ORDER.indexOf(newTab);
      const dir = nextIdx > prevIdx ? 1 : -1;

      setTransitionDirection(dir);
      prevTabRef.current = newTab;
      setActiveTab(newTab);
    },
    [activeTab]
  );

  return (
    <StockProvider>
      <div className="min-h-screen bg-white text-slate-900">
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative border-x border-slate-100 flex flex-col">
          
          {/* Sticky Header with Navbar & Groww Light Mode Ticker Bar */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
            <Navbar
              activeTab={activeTab}
              onOpenSearch={() => setSearchOpen(true)}
              onOpenProfile={() => setProfileDrawerOpen(true)}
            />
            {/* Groww Light Mode Market Indices Bar */}
            <LightMarketTicker />
          </div>

          {/* Dynamic View Router with GSAP Page Transitions */}
          <PageTransition activeKey={activeTab} direction={transitionDirection}>
            {activeTab === "stocks" && (
              <div className="pb-16 bg-white">
                <RecentlyViewed onSelectStock={(stock) => setSelectedStock(stock)} />
                <MostTraded onSelectStock={(stock) => setSelectedStock(stock)} />
                <FinancialTools />
                <TopMovers onSelectStock={(stock) => setSelectedStock(stock)} />
                <TopIntraday onSelectStock={(stock) => setSelectedStock(stock)} />
                <StocksInNews onSelectStock={(stock) => setSelectedStock(stock)} />
              </div>
            )}

            {activeTab === "watchlist" && (
              <WatchlistView
                onSelectStock={(stock) => setSelectedStock(stock)}
                onOpenSearch={() => setSearchOpen(true)}
              />
            )}

            {activeTab === "portfolio" && (
              <PortfolioView
                onSelectStock={(stock) => setSelectedStock(stock)}
              />
            )}

            {activeTab === "more" && (
              <MoreView
                onOpenProfile={() => setProfileDrawerOpen(true)}
                profileDrawerOpen={profileDrawerOpen}
                setProfileDrawerOpen={setProfileDrawerOpen}
              />
            )}
          </PageTransition>

          {/* Bottom Navigation */}
          <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

          {/* Stock Detail Modal */}
          <StockDetailModal
            stock={selectedStock}
            onClose={() => setSelectedStock(null)}
          />

          {/* Search Modal */}
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectStock={(stock) => setSelectedStock(stock)}
          />
        </div>
      </div>
    </StockProvider>
  );
}
