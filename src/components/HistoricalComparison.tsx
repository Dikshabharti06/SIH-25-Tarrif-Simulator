"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register chart components
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

interface HistoricalAnalysisProps {
  tariffInput: number;
  currentGlobalPrice: number;
}

const HistoricalAnalysis: React.FC<HistoricalAnalysisProps> = ({
  tariffInput,
  currentGlobalPrice,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const generateData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels: string[] = [];
    
    // Historical Arrays
    const histDomestic: (number | null)[] = [];
    const histFarmer: (number | null)[] = [];
    
    // Projection Arrays
    const projDomestic: (number | null)[] = [];
    const projFarmer: (number | null)[] = [];
    
    // Tariff Array (Continuous)
    const tariffs: number[] = [];

    // --- 1. GENERATE HISTORY (Jan '24 to Dec '25) ---
    // Changed start year to 2024 as requested
    for (let i = 0; i < 24; i++) {
      const year = 2024 + Math.floor(i / 12); 
      const monthIndex = i % 12;
      const label = `${months[monthIndex]} '${year.toString().slice(-2)}`;
      labels.push(label);

      // Simulation of Real-world events
      let tariff = 5.5; 
      
      // Real-World Event: Sep '24 Hike (Import duty jumped to ~27.5%)
      if (year === 2024 && monthIndex >= 8) tariff = 27.5;
      
      // 2025: Assume tariff remained elevated (or simulates current baseline)
      if (year === 2025) tariff = 27.5;

      // Seasonality: Prices dip in May-Jun (Heat), Peak in Oct-Dec
      const seasonalFactor = (monthIndex >= 4 && monthIndex <= 6) ? -15 : (monthIndex >= 9) ? 10 : 0;
      
      // Base Price Fluctuation
      const basePrice = 1000 + Math.sin(i * 0.4) * 80 + seasonalFactor;
      
      // Calculations
      const dPrice = 100 + (tariff * 1.2) + (basePrice - 900) * 0.08;
      // MSP Logic: Income never drops below 90 index
      const fIncome = Math.max(90, 95 + (tariff * 1.5) + (seasonalFactor * 0.5)); 

      histDomestic.push(dPrice);
      histFarmer.push(fIncome);
      
      // Nulls for projection at this stage
      projDomestic.push(null);
      projFarmer.push(null);
      
      tariffs.push(tariff);
    }

    // --- 2. GENERATE PROJECTION (Jan '26 - User Input) ---
    // Updated projection target to Jan '26
    const lastHistDomestic = histDomestic[23] as number;
    const lastHistFarmer = histFarmer[23] as number;

    labels.push("Jan '26 (Proj)");

    // Connect the lines (Last history point is also first projection point)
    projDomestic[23] = lastHistDomestic;
    projFarmer[23] = lastHistFarmer;

    // Calculate Projected Values based on YOUR SLIDERS
    const projectedDomestic = 110 + (tariffInput * 0.9) + ((currentGlobalPrice - 1000) * 0.07);
    const projectedFarmer = Math.max(90, 100 + (tariffInput * 1.6));

    // Push final values
    projDomestic.push(projectedDomestic);
    projFarmer.push(projectedFarmer);
    histDomestic.push(null); // No history for this point
    histFarmer.push(null);
    tariffs.push(tariffInput);

    return { labels, histDomestic, histFarmer, projDomestic, projFarmer, tariffs };
  };

  const updateChart = () => {
    const { labels, histDomestic, histFarmer, projDomestic, projFarmer, tariffs } = generateData();

    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          // --- DOMESTIC PRICE ---
          {
            label: "Domestic Price (History)",
            data: histDomestic,
            borderColor: "#3b82f6", // Blue
            backgroundColor: "#3b82f6",
            borderWidth: 2,
            tension: 0.3,
            yAxisID: "y",
            pointRadius: 0,
          },
          {
            label: "Projected Price",
            data: projDomestic,
            borderColor: "#3b82f6", // Blue
            borderWidth: 2,
            borderDash: [5, 5], // Dotted Line
            tension: 0.3,
            yAxisID: "y",
            pointRadius: 4,
            pointBackgroundColor: "#ffffff",
            pointBorderWidth: 2,
          },

          // --- FARMER INCOME ---
          {
            label: "Farmer Income (History)",
            data: histFarmer,
            borderColor: "#22c55e", // Green
            backgroundColor: "#22c55e",
            borderWidth: 2,
            tension: 0.3,
            yAxisID: "y1",
            pointRadius: 0,
          },
          {
            label: "Projected Income",
            data: projFarmer,
            borderColor: "#22c55e", // Green
            borderWidth: 2,
            borderDash: [5, 5], // Dotted Line
            tension: 0.3,
            yAxisID: "y1",
            pointRadius: 4,
            pointBackgroundColor: "#ffffff",
            pointBorderWidth: 2,
          },

          // --- TARIFF RATE (Area) ---
          {
            label: "Tariff Rate (%)",
            data: tariffs,
            borderColor: "#a855f7", // Purple
            backgroundColor: "rgba(168, 85, 247, 0.1)", // Light purple fill
            borderWidth: 1,
            stepped: true, // Step chart for Tariff
            fill: true,
            yAxisID: "y",
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              font: { size: 11 }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (context.parsed.y === null) return "";
                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            position: "left",
            title: { text: "Price (₹/kg) / Tariff (%)", display: true, font: {size: 10} },
            grid: { color: "#f3f4f6" }
          },
          y1: {
            position: "right",
            title: { text: "Farmer Income Index", display: true, font: {size: 10} },
            grid: { drawOnChartArea: false },
            min: 80, // Set floor to show MSP effect visually
          },
        },
      },
    });
  };

  useEffect(() => {
    updateChart();
  }, [tariffInput, currentGlobalPrice]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Historical vs. Projected Impact (2024 - 2026)
        </h3>
        <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded border border-purple-200">
          Current Tariff: {tariffInput}%
        </span>
      </div>

      <div className="relative h-[400px] mb-6">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 bg-gray-50 border rounded-lg">
          <span className="font-bold text-gray-700 block mb-1">Seasonality Effect</span>
          Notice the dips in May-Jun (Lean Season) and peaks in Oct-Jan (High Oil Content).
        </div>
        <div className="p-3 bg-gray-50 border rounded-lg">
          <span className="font-bold text-gray-700 block mb-1">Sep '24 Duty Hike</span>
          The purple area steps up in late 2024, reflecting the government's protectionist policy.
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="font-bold text-blue-700 block mb-1">Your Projection (Jan '26)</span>
          Dashed lines show where the market goes if you set tariff to {tariffInput}%.
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;