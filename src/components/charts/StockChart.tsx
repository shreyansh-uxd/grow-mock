"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface StockChartProps {
  timeline: string;
  isPositive: boolean;
  basePrice: number;
}

// Generate realistic micro-fluctuation data points for Recharts
function generateChartData(timeline: string, basePrice: number) {
  const pointsCount = timeline === "1D" ? 30 : timeline === "1W" ? 40 : 50;
  const data = [];
  let current = basePrice * 0.95;

  for (let i = 0; i < pointsCount; i++) {
    const change = (Math.random() * 4 - 1.8) * (basePrice / 100);
    current = Math.max(10, current + change);
    
    let timeLabel = `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || "00"}`;
    if (timeline === "1W") timeLabel = `Day ${Math.floor(i / 6) + 1}`;
    if (timeline === "1M") timeLabel = `Week ${Math.floor(i / 10) + 1}`;
    if (timeline === "1Y" || timeline === "5Y" || timeline === "ALL") timeLabel = `Month ${Math.floor(i / 4) + 1}`;

    data.push({
      time: timeLabel,
      price: Number(current.toFixed(2)),
    });
  }

  // Ensure last point matches basePrice
  if (data.length > 0) {
    data[data.length - 1].price = basePrice;
  }

  return data;
}

export default function StockChart({ timeline, isPositive, basePrice }: StockChartProps) {
  const data = generateChartData(timeline, basePrice);
  const strokeColor = isPositive ? "#00b386" : "#ef5350";
  const gradientId = `stockGradient-${timeline}-${isPositive ? "green" : "red"}`;

  const minPrice = Math.min(...data.map((d) => d.price)) * 0.99;
  const maxPrice = Math.max(...data.map((d) => d.price)) * 1.01;

  return (
    <div className="w-full h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" hide />
          <YAxis domain={[minPrice, maxPrice]} hide />

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-white text-slate-900 font-mono text-xs p-2.5 rounded-xl shadow-lg border border-slate-200">
                    <div className="text-slate-400 text-[10px]">{item.time}</div>
                    <div className={`font-extrabold text-sm ${isPositive ? "text-emerald-600" : "text-rose-500"}`}>${item.price.toFixed(2)}</div>
                  </div>
                );
              }
              return null;
            }}
          />

          <ReferenceLine y={basePrice * 0.98} stroke="#e2e8f0" strokeDasharray="3 3" />

          <Area
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={true}
            animationDuration={600}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
