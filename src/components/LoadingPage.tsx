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
  ArrowLeft, // Added for the back button
} from "lucide-react";

import Header from "./Header";
import ImpactSim from "./ImpactSim";
import bgCover from "/bg-cover.jpg";
import GreenFooter from "./footer/Footer";
import { GlobalCompetitorAnalysis } from './GlobalImports'; 

interface LandingPageProps {
  onStart: () => void;
  onLogout: () => void;
}

// Define the possible views inside the Loading Page
type LoadingPageView = 'dashboard' | 'chatbot' | 'global';

export function LoadingPage({ onStart, onLogout }: LandingPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Single state to manage which "sub-page" is open
  const [activeView, setActiveView] = useState<LoadingPageView>('dashboard');

  // --- VIEW 1: CHATBOT ---
  if (activeView === 'chatbot') {
    return (
      <ImpactSim
        onBack={() => setActiveView('dashboard')}
        onLogout={onLogout}
      />
    );
  }

  // --- VIEW 2: GLOBAL COMPETITOR ANALYSIS ---
  if (activeView === 'global') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header onLogout={onLogout} />
        <div className="flex-1 container mx-auto px-6 py-6 max-w-7xl">
          {/* Back Button for Global View */}
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('dashboard')}
            className="mb-6 hover:bg-gray-200 text-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Global Trade Intelligence</h1>
            <p className="text-gray-500">Analyze competitor export levies and bilateral trade flows.</p>
          </div>

          {/* Render the Global Component */}
          <GlobalCompetitorAnalysis />
        </div>
        <GreenFooter />
      </div>
    );
  }

  // --- VIEW 3: MAIN DASHBOARD (Default) ---
  return (
    <>
      <Header onLogout={onLogout} />

      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 shrink-0">
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
            
            {/* GLOBAL IMPORTS CLICK HANDLER */}
            <SidebarItem
              icon={<Globe size={22} />}
              label="Global Imports"
              description="Reliance on foreign edible oil markets."
              onClick={() => setActiveView('global')} 
            />

            {/* FLOATING BOT BUTTON */}
            <button
              onClick={() => setActiveView('chatbot')}
              className="fixed bottom-6 left-6 bg-green-700 hover:bg-green-600 
              text-white p-3 rounded-full shadow shadow-green-300 transition z-50"
            >
              <Bot size={26} />
            </button>
          </nav>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <div className="flex-1 flex flex-col">
          <div className="container mx-auto px-6 py-2 max-w-7xl bg-gray-100 flex-1">
            
            {/* Main CTA Card */}
            <Card className="p-8 mt-4 mb-8 bg-linear-to-r from-green-700 to-green-800 text-white shadow-xl">
              <div className="max-w-3xl mx-auto text-center">
                <p className="p-2 text-white text-3xl border-b border-white font-bold inline-block mb-4">
                  AI Policy Forecast
                </p>
                <p className="mb-6 p-2 text-white text-md">
                  Generate professional executive memos analyzing the impact
                  of tariff policies on consumer affordability, farmer
                  profitability, and import dependency using advanced
                  AI-powered forecasting.
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)} // Open dialog first
                  size="lg"
                  className="bg-white text-md text-green-900 hover:bg-gray-200 cursor-pointer shadow-2xl font-bold px-8"
                >
                  Start Simulation
                </Button>
              </div>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 p-2">
              <Card className="p-4 bg-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg text-gray-700 font-bold mb-2">
                  Real-Time Interactive Sliders
                </h3>
                <p className="text-gray-600 text-sm">
                  Drag sliders to instantly visualize policy trade-offs. Watch
                  consumer prices and farmer income curves update in
                  real-time.
                </p>
              </Card>

              <Card className="p-4 bg-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg text-gray-700 font-bold mb-2">
                  Agent-Based Modeling
                </h3>
                <p className="text-gray-600 text-sm">
                  Simulate behavior shifts of farmers, traders, investors,
                  consumers, and importers using advanced ABM visualization.
                </p>
              </Card>

              <Card className="p-4 bg-white border-0 shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg text-gray-700 font-bold mb-2">
                  State-Wise Impact Heatmap
                </h3>
                <p className="text-gray-600 text-sm">
                  Analyze consumer affordability across all Indian states
                  based on income levels and consumption patterns.
                </p>
              </Card>
            </div>

            {/* Additional Features */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-shadow">
                <p className="text-sm font-bold text-green-900 mb-1">
                  NMEO-OP Target Calculator
                </p>
                <p className="text-xs text-green-700">
                  Reverse-engineer the policy mix needed to achieve
                  self-reliance goals
                </p>
              </Card>
              <Card className="p-6 bg-linear-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-shadow">
                <p className="text-sm font-bold text-orange-900 mb-1">
                  Historical Comparison
                </p>
                <p className="text-xs text-orange-700">
                  Learn from 2019-2025 policy decisions and avoid past mistakes
                </p>
              </Card>
              <Card className="p-6 bg-linear-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-shadow">
                <p className="text-sm font-bold text-purple-900 mb-1">
                  Sensitivity Analysis
                </p>
                <p className="text-xs text-purple-700">
                  Explainable AI showing mathematical rigor and variable
                  interactions
                </p>
              </Card>
              <Card className="p-6 bg-linear-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-shadow">
                <p className="text-sm font-bold text-blue-900 mb-1">
                  Scenario Save & Share
                </p>
                <p className="text-xs text-blue-700">
                  Save and compare multiple scenarios for collaborative policy
                  review
                </p>
              </Card>
            </div>

            {/* Image insertion */}
            <div className="w-full h-64 overflow-hidden rounded-xl shadow-lg mb-6">
              <img src={bgCover} className="w-full h-full object-cover" alt="Cover" />
            </div>

            <div className="p-4 text-center text-sm text-gray-500">
              <p>Designed for India's Ministry of Commerce policy analysis</p>
            </div>
          </div>
          
          <GreenFooter />
        </div>
      </div>

      {/* LAUNCH DIALOG */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-xl max-w-md w-full border-2 border-yellow-500 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-green-800 text-center mb-4 border-b border-green-700 pb-2">
              Launch Simulator?
            </h3>

            <ul className="text-md text-gray-700 space-y-2 mb-8 pl-5 list-disc marker:text-green-600">
              <li>Real-time Agent-Based Market Simulation (ABM)</li>
              <li>Tariff-dependent demand & farmer income projections</li>
              <li>Import bill, trade deficit & forex exposure forecasting</li>
            </ul>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                  onStart();
                }}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold h-12 rounded-lg text-lg shadow-md"
              >
                Initialize System
              </Button>

              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-3 w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-md font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all border group text-left ${
      active
        ? "bg-green-50 border-green-200 shadow-sm"
        : "hover:bg-gray-50 border-transparent bg-white"
    }`}
  >
    <div className={`transition-colors ${active ? "text-green-700" : "text-gray-400 group-hover:text-green-700"}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4
        className={`font-bold text-sm ${
          active ? "text-green-800" : "text-gray-700 group-hover:text-green-800"
        }`}
      >
        {label}
      </h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    {active && <ChevronRight size={16} className="text-green-700" />}
  </button>
);