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
  Globe,
  ChevronRight,
  Bot,
} from "lucide-react";

import Header from "./Header";
import ImpactSim from "./ImpactSim";
import bgCover from "/bg-cover.jpg";
import GreenFooter from "./footer/Footer";

interface LandingPageProps {
  onStart: () => void;
  onLogout: () => void;
}

export function LoadingPage({ onStart, onLogout }: LandingPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false); 

  if (showChatBot) {
    return (
      <ImpactSim
        onBack={() => setShowChatBot(false)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <>
      <Header onLogout={onLogout} />

      <div className="flex">
        <aside className="w-72 border-r border-gray-200 flex flex-col shadow-sm z-10">
          <nav className="flex-1 p-4 space-y-2 mt-3">
            <SidebarItem
              icon={<PlayCircle size={22} />}
              label="Policy Simulator"
              description="Run ABM & Tariff Scenarios."
              onClick={() => setIsDialogOpen(true)}
              active
            />
            <SidebarItem
              icon={<History size={22} />}
              label="Simulation History"
              description="Past runs & results."
              onClick={() => alert("History coming soon")}
            />
            <SidebarItem
              icon={<Globe size={22} />}
              label="Global Imports"
              description="Reliance on foreign edible oil markets."
              onClick={() => alert("yet to put")}
            />

            <button
              onClick={() => setShowChatBot(true)}
              className="fixed bottom-6 left-6 bg-green-700 hover:bg-green-600 
              text-white p-3 rounded-full shadow shadow-green-300 transition"
            >
              <Bot size={26} />
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          <div className="container mx-auto px-6 py-2 max-w-7xl bg-gray-100">
            {/* Main CTA Card */}
            <Card className="p-8 mt-4 mb-8 bg-linear-to-r from-green-700 to-green-800 text-white shadow-xl">
              <div className="max-w-3xl mx-auto text-center">
                <p className="p-2 text-white text-3xl border-b border-white font-bold">
                  AI Policy Forecast
                </p>
                <p className="mb-4 p-2 text-white text-md">
                  Generate professional executive memos analyzing the impact
                  of tariff policies on consumer affordability, farmer
                  profitability, and import dependency using advanced
                  AI-powered forecasting.
                </p>
                <Button
                  onClick={onStart}
                  size="lg"
                  className="bg-white text-md text-green-900 hover:bg-gray-300 cursor-pointer shadow-2xl"
                >
                  Start Simulation
                </Button>
              </div>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 p-2">
              <Card className="p-4 bg-white border-0 shadow-xl cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg text-gray-700 font-bold">
                  Real-Time Interactive Sliders
                </h3>
                <p className="text-gray-800 text-md">
                  Drag sliders to instantly visualize policy trade-offs. Watch
                  consumer prices and farmer income curves update in
                  real-time.
                </p>
              </Card>

              <Card className="p-4 bg-white border-0 shadow-xl cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg text-gray-700 font-bold">
                  Agent-Based Modeling
                </h3>
                <p className="text-gray-800 text-md">
                  Simulate behavior shifts of farmers, traders, investors,
                  consumers, and importers using advanced ABM visualization.
                </p>
              </Card>

              <Card className="p-4 bg-white border-0 shadow-xl cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg text-gray-700 font-bold">
                  State-Wise Impact Heatmap
                </h3>
                <p className="text-gray-800 text-md">
                  Analyze consumer affordability across all Indian states
                  based on income levels and consumption patterns.
                </p>
              </Card>
            </div>

            {/* Additional Features */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border-green-200">
                <p className="text-sm font-bold text-green-900 mb-1">
                  NMEO-OP Target Calculator
                </p>
                <p className="text-xs text-green-700">
                  Reverse-engineer policy mix for self-reliance goals
                </p>
              </Card>

              <Card className="p-6 bg-linear-to-br from-orange-50 to-amber-50 border-orange-200">
                <p className="text-sm font-bold text-orange-900 mb-1">
                  Historical Comparison
                </p>
                <p className="text-xs text-orange-700">
                  Learn from policy decisions from 2019–2025
                </p>
              </Card>

              <Card className="p-6 bg-linear-to-br from-purple-50 to-violet-50 border-purple-200">
                <p className="text-sm font-bold text-purple-900 mb-1">
                  Sensitivity Analysis
                </p>
                <p className="text-xs text-purple-700">
                  Mathematical variable interaction breakdown
                </p>
              </Card>

              <Card className="p-6 bg-linear-to-br from-blue-50 to-cyan-50 border-blue-200">
                <p className="text-sm font-bold text-blue-900 mb-1">
                  Scenario Save & Share
                </p>
                <p className="text-xs text-blue-700">
                  Compare multiple policy simulations
                </p>
              </Card>
            </div>

            {/* Image */}
            <div className="w-full h-full overflow-hidden">
              <img src={bgCover} className="w-full h-full rounded-xl" />
            </div>

            <div className="p-4 text-center text-sm text-gray-800">
              Designed for India's Ministry of Commerce policy analysis
            </div>
          </div>
        </div>
      </div>

      {/* Launch popup */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl max-w-md w-full border-2 border-yellow-500 shadow-lg">
            <h3 className="text-2xl font-bold text-green-800 text-center mb-4 border-b border-green-700">
              Launch Simulator?
            </h3>

            <ul className="text-md text-gray-800 space-y-1 mb-6 pl-4 list-disc">
              <li>Real-time Agent-Based Market Simulation (ABM)</li>
              <li>Demand & farmer income projections</li>
              <li>Forex & import dependency forecasting</li>
            </ul>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                  onStart();
                }}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold h-11 rounded-lg"
              >
                Initialize System
              </Button>

              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-2 w-full text-gray-700 hover:text-gray-800 hover:bg-gray-300 text-md font-medium rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <GreenFooter />
    </>
  );
}

// Sidebar helper
const SidebarItem = ({ icon, label, description, onClick, active }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all border ${
      active
        ? "bg-green-50 border-green-200 shadow-sm"
        : "hover:bg-green-50 hover:text-green-800 hover:border-green-200 border-transparent"
    }`}
  >
    <div className={active ? "text-green-700" : "text-gray-400 hover:text-green-800"}>{icon}</div>
    <div className="flex-1 text-left">
      <h4
        className={`font-bold text-sm ${
          active ? "text-green-800" : "text-gray-700  hover:text-green-800"
        }`}
      >
        {label}
      </h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    {active && <ChevronRight size={16} className="text-green-700" />}
  </button>
);
