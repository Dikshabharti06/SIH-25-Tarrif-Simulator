"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  TrendingUp,
  BarChart3,
  FileText,
  PlayCircle,
  History,
  Database,
  ChevronRight,
} from "lucide-react";
import Header from "./Header";
import bgCover from "/bg-cover.jpg";
import GreenFooter from "./footer/Footer";

interface LandingPageProps {
  onStart: () => void;
}

export function LoadingPage({ onStart }: LandingPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Header stays same */}
      <Header onLogout={() => {}} />

      <div className="flex">
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
          <nav className="flex-1 p-4 space-y-2 mt-3">
            <SidebarItem
              icon={<PlayCircle size={22} />}
              label="Policy Simulator"
              description="Run ABM & Tariff Scenarios"
              onClick={() => setIsDialogOpen(true)}
              active
            />
            <SidebarItem
              icon={<History size={22} />}
              label="Simulation History"
              description="Past runs & results"
              onClick={() => alert("History coming soon")}
            />
            <SidebarItem
              icon={<Database size={22} />}
              label="Data Sources"
              description="Market APIs & Import logs"
              onClick={() => alert("Data sources coming soon")}
            />
          </nav>
        </aside>
        <div className="flex-1">
          <div className="container mx-auto px-4 py-2 max-w-6xl">
            <div className="container mx-auto px-4 py-2 max-w-6xl">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="p-4 text-green-900 text-3xl">
                  AI Policy Forecast
                </h1>
                <p className="p-2 text-gray-600 max-w-2xl mx-auto">
                  Advanced Agent-Based Modeling & Interactive Policy Simulation
                  for India's NMEO-OP Self-Reliance Strategy
                </p>
              </div>

              {/* Main CTA Card */}
              <Card className="p-8 mb-8 bg-linear-to-r from-green-700 to-green-800 text-white border-0">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="mb-4 text-white">
                    CPO Import Policy Simulator
                  </h2>
                  <p className="mb-6 text-white">
                    Generate professional executive memos analyzing the impact
                    of tariff policies on consumer affordability, farmer
                    profitability, and import dependency using advanced
                    AI-powered forecasting.
                  </p>
                  <Button
                    onClick={onStart}
                    size="lg"
                    className="bg-white text-green-800 hover:bg-gray-100 cursor-pointer"
                  >
                    Start Simulation
                  </Button>
                </div>
              </Card>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 p-2">
                <Card className="p-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="mb-2">Real-Time Interactive Sliders</h3>
                  <p className="text-gray-600 text-sm">
                    Drag sliders to instantly visualize policy trade-offs. Watch
                    consumer prices and farmer income curves update in
                    real-time.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2">Agent-Based Modeling</h3>
                  <p className="text-gray-600 text-sm">
                    Simulate behavior shifts of farmers, traders, investors,
                    consumers, and importers using advanced ABM visualization.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="mb-2">State-Wise Impact Heatmap</h3>
                  <p className="text-gray-600 text-sm">
                    Analyze consumer affordability across all Indian states
                    based on income levels and consumption patterns.
                  </p>
                </Card>
              </div>

              {/* Additional Features */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border-green-200">
                  <p className="text-sm font-medium text-green-900 mb-1">
                    NMEO-OP Target Calculator
                  </p>
                  <p className="text-xs text-green-700">
                    Reverse-engineer the policy mix needed to achieve
                    self-reliance goals
                  </p>
                </Card>
                <Card className="p-6 bg-linear-to-br from-orange-50 to-amber-50 border-orange-200">
                  <p className="text-sm font-medium text-orange-900 mb-1">
                    Historical Comparison
                  </p>
                  <p className="text-xs text-orange-700">
                    Learn from 2019-2025 policy decisions and avoid past
                    mistakes
                  </p>
                </Card>
                <Card className="p-6 bg-linear-to-br from-purple-50 to-violet-50 border-purple-200">
                  <p className="text-sm font-medium text-purple-900 mb-1">
                    Sensitivity Analysis
                  </p>
                  <p className="text-xs text-purple-700">
                    Explainable AI showing mathematical rigor and variable
                    interactions
                  </p>
                </Card>
                <Card className="p-6 bg-linear-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Scenario Save & Share
                  </p>
                  <p className="text-xs text-blue-700">
                    Save and compare multiple scenarios for collaborative policy
                    review
                  </p>
                </Card>
              </div>

              {/* Image insertion */}
              <div className="w-full h-full overflow-hidden">
                <img src={bgCover} className="w-full h-full rounded-xl" />
              </div>
              {/* Info Section */}
              <div className="p-4 text-center text-sm text-gray-600">
                <p>Designed for India's Ministry of Commerce policy analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDialogOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
    <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-xl">
      <PlayCircle className="w-12 h-12 text-green-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Launch Simulator?
      </h3>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <Button
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold"
          onClick={() => {
            setIsDialogOpen(false);
            onStart();
          }}
        >
          Initialize System
        </Button>

        <button
          onClick={() => setIsDialogOpen(false)}
          className="w-full py-3 text-gray-600 hover:text-black font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
<GreenFooter/>
    </>
  );
}

// Sidebar helper
const SidebarItem = ({
  icon,
  label,
  description,
  onClick,
  active,
}: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all border ${
      active
        ? "bg-green-50 border-green-200 shadow-sm"
        : "hover:bg-green-50 hover:text-green-800 hover:border-green-200 border-transparent"
    }`}
  >
    <div className={active ? "text-green-700" : "text-gray-400"}>{icon}</div>
    <div className="flex-1 text-left">
      <h4
        className={`font-bold text-sm ${
          active ? "text-green-800" : "text-gray-700"
        }`}
      >
        {label}
      </h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    {active && <ChevronRight size={16} className="text-green-700" />}
  </button>
);
