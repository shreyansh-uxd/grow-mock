"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Stock, MOST_TRADED, RECENTLY_VIEWED, TOP_GAINERS, TOP_LOSERS, TOP_INTRADAY, STOCKS_IN_NEWS } from "@/lib/stocks-data";

export interface StockTickState extends Stock {
  lastDirection?: "up" | "down";
  tickTime?: number;
}

interface StockContextType {
  stocksMap: Record<string, StockTickState>;
  recentlyViewed: StockTickState[];
  mostTraded: StockTickState[];
  topGainers: StockTickState[];
  topLosers: StockTickState[];
  topIntraday: StockTickState[];
  stocksInNews: StockTickState[];
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const initialMap: Record<string, StockTickState> = {};

  const allInitial = [...MOST_TRADED, ...RECENTLY_VIEWED, ...TOP_GAINERS, ...TOP_LOSERS, ...TOP_INTRADAY, ...STOCKS_IN_NEWS];
  allInitial.forEach((s) => {
    initialMap[s.id] = { ...s };
  });

  const [stocksMap, setStocksMap] = useState<Record<string, StockTickState>>(initialMap);

  // High-frequency live price ticks (350ms interval = 2.8 ticks per second)
  useEffect(() => {
    const interval = setInterval(() => {
      setStocksMap((prevMap) => {
        const nextMap = { ...prevMap };
        const keys = Object.keys(nextMap);
        if (keys.length === 0) return prevMap;

        // Pick 4 stocks per tick cycle for rapid live market updates
        const numToTick = 4;
        for (let i = 0; i < numToTick; i++) {
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const current = nextMap[randomKey];
          if (!current) continue;

          const deltaPct = (Math.random() * 0.4 - 0.19) / 100;
          const priceDiff = current.price * deltaPct;
          const newPrice = Math.max(10, current.price + priceDiff);
          const newChange = current.change + priceDiff;
          const newChangePct = (newChange / (newPrice - newChange)) * 100;

          nextMap[randomKey] = {
            ...current,
            price: Number(newPrice.toFixed(2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newChangePct.toFixed(2)),
            isPositive: newChange >= 0,
            lastDirection: priceDiff >= 0 ? "up" : "down",
            tickTime: Date.now(),
          };
        }

        return nextMap;
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const getUpdatedList = (list: Stock[]) =>
    list.map((s) => stocksMap[s.id] || s);

  return (
    <StockContext.Provider
      value={{
        stocksMap,
        recentlyViewed: getUpdatedList(RECENTLY_VIEWED),
        mostTraded: getUpdatedList(MOST_TRADED),
        topGainers: getUpdatedList(TOP_GAINERS),
        topLosers: getUpdatedList(TOP_LOSERS),
        topIntraday: getUpdatedList(TOP_INTRADAY),
        stocksInNews: getUpdatedList(STOCKS_IN_NEWS),
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStocks() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStocks must be used within a StockProvider");
  }
  return context;
}
