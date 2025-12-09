import React, { useState, useEffect, useCallback } from 'react';
import Plot from 'react-plotly.js';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Globe, Ship, TrendingUp, Loader2, PlayCircle, Anchor } from 'lucide-react';

// --- TYPES ---
interface CountryData {
  id: string;
  name: string;
  baseExportCap: number; // Max capacity in '000 MT
  basePrice: number;     // $/MT FOB
  exportLevy: number;    // $/MT Export Tax
  distance: number;      // Freight Factor
  
  // Simulated Fields
  simulatedVolume?: number;
  landedCost?: number;
  marketShare?: number;
}

const INITIAL_COUNTRIES: CountryData[] = [
  { id: 'ID', name: 'Indonesia', baseExportCap: 2500, basePrice: 980, exportLevy: 85, distance: 1.0 },
  { id: 'MY', name: 'Malaysia', baseExportCap: 1800, basePrice: 1010, exportLevy: 60, distance: 0.9 },
  { id: 'TH', name: 'Thailand', baseExportCap: 400, basePrice: 1050, exportLevy: 20, distance: 1.2 },
];

export const GlobalCompetitorAnalysis: React.FC = () => {
  // --- INPUTS ---
  const [indiaTariff, setIndiaTariff] = useState(12.5); // India's BCD
  const [indonesiaLevy, setIndonesiaLevy] = useState(85); // Indonesia often changes this
  const [globalDemand, setGlobalDemand] = useState(100);  // Index 100 = Normal

  // --- SIMULATION STATE ---
  const [isSimulating, setIsSimulating] = useState(false);
  const [countryData, setCountryData] = useState<CountryData[]>(INITIAL_COUNTRIES);
  const [chartData, setChartData] = useState<any>({ volume: [], price: [] });

  // --- ENGINE ---
  const runSimulation = useCallback(() => {
    setIsSimulating(true);

    setTimeout(() => {
      // 1. Update Country Data
      const updatedCountries = INITIAL_COUNTRIES.map(country => {
        // Dynamic Levy for Indonesia (controlled by slider)
        const currentLevy = country.id === 'ID' ? indonesiaLevy : country.exportLevy;
        
        // Landed Cost Formula: (Base Price + Levy + Freight) * (1 + IndiaTariff)
        const freight = country.distance * 40; // Approx $40 base freight
        const cifPrice = country.basePrice + currentLevy + freight;
        const landedCost = cifPrice * (1 + indiaTariff / 100);

        // Volume Logic: Cheaper landed cost = Higher Volume
        // Elasticity: For every 1% price diff from avg, volume shifts 2%
        const priceElasticity = 2.5;
        const demandFactor = globalDemand / 100;
        
        // Simple inverse relationship for demo
        // If Landed Cost is high, volume drops.
        const volume = (country.baseExportCap * demandFactor) * (1 - (landedCost - 1000)/2000 * priceElasticity);
        
        return {
          ...country,
          simulatedVolume: Math.max(0, volume), // No negative imports
          landedCost: landedCost,
          exportLevy: currentLevy
        };
      });

      // 2. Calculate Market Share
      const totalVol = updatedCountries.reduce((acc, c) => acc + (c.simulatedVolume || 0), 0);
      const finalCountries = updatedCountries.map(c => ({
        ...c,
        marketShare: ((c.simulatedVolume || 0) / totalVol) * 100
      }));

      setCountryData(finalCountries);

      // 3. Prepare Chart Data
      setChartData({
        volume: [
            {
                x: finalCountries.map(c => c.name),
                y: finalCountries.map(c => c.simulatedVolume),
                type: 'bar',
                name: 'Import Volume (MT)',
                marker: { color: ['#ef4444', '#3b82f6', '#eab308'] } // ID=Red, MY=Blue, TH=Yellow
            }
        ],
        price: [
            {
                x: finalCountries.map(c => c.name),
                y: finalCountries.map(c => c.landedCost),
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Landed Cost ($/MT)',
                line: { color: '#10b981', width: 3 },
                yaxis: 'y2'
            }
        ]
      });

      setIsSimulating(false);
    }, 1200);
  }, [indiaTariff, indonesiaLevy, globalDemand]);

  // Initial Run
  useEffect(() => {
    runSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      
      {/* --- CONTROLS --- */}
      <Card className="p-6 bg-white border-blue-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
           <div className="flex items-center gap-2">
                <Globe className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">Global Trade Simulator</h3>
           </div>
           
           <Button 
             onClick={runSimulation}
             disabled={isSimulating}
             className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 shadow-md transition-all active:scale-95"
           >
             {isSimulating ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Trade Flows...
                </>
             ) : (
                <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Run Trade Simulation
                </>
             )}
           </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* India Tariff */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label className="text-gray-600">India Import Duty</Label>
                    <span className="font-bold text-blue-700">{indiaTariff}%</span>
                </div>
                <Slider 
                    value={[indiaTariff]} 
                    min={0} max={40} step={0.5}
                    onValueChange={(v) => setIndiaTariff(v[0])}
                    className="py-2"
                />
                <p className="text-xs text-gray-400">Impacts all partners</p>
            </div>

            {/* Indonesia Levy */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label className="text-gray-600">Indonesia Export Levy</Label>
                    <span className="font-bold text-red-700">${indonesiaLevy}</span>
                </div>
                <Slider 
                    value={[indonesiaLevy]} 
                    min={0} max={200} step={5}
                    onValueChange={(v) => setIndonesiaLevy(v[0])}
                    className="py-2"
                />
                <p className="text-xs text-gray-400">Policy change in Jakarta</p>
            </div>

            {/* Global Demand */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label className="text-gray-600">Global Demand Index</Label>
                    <span className="font-bold text-green-700">{globalDemand}</span>
                </div>
                <Slider 
                    value={[globalDemand]} 
                    min={80} max={120} step={1}
                    onValueChange={(v) => setGlobalDemand(v[0])}
                    className="py-2"
                />
                <p className="text-xs text-gray-400">100 = Normal Baseline</p>
            </div>
        </div>
      </Card>

      {/* --- VISUALIZATION AREA --- */}
      <div className="relative min-h-[400px]">
        {isSimulating && (
            <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-gray-200">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-3" />
                <p className="text-sm font-semibold text-blue-900">Calculating Bilateral Trade...</p>
            </div>
        )}

        <div className={`grid lg:grid-cols-3 gap-6 transition-opacity duration-300 ${isSimulating ? 'opacity-50' : 'opacity-100'}`}>
            
            {/* 1. MAIN CHART (2/3 width) */}
            <Card className="lg:col-span-2 p-4 border-2 border-gray-200 shadow bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                    <Ship className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">Import Volume vs Landed Cost</h3>
                </div>
                <div className="h-[350px] w-full">
                    <Plot
                        data={[...chartData.volume, ...chartData.price]}
                        layout={{
                            autosize: true,
                            height: 350,
                            margin: { l: 50, r: 50, t: 30, b: 40 },
                            showlegend: true,
                            legend: { orientation: 'h', y: 1.1 },
                            xaxis: { title: 'Partner Country' },
                            yaxis: { title: 'Volume (000 MT)', side: 'left' },
                            yaxis2: { 
                                title: 'Landed Cost ($/MT)', 
                                overlaying: 'y', 
                                side: 'right',
                                showgrid: false 
                            },
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                        }}
                        style={{ width: '100%', height: '100%' }}
                        config={{ displayModeBar: false }}
                    />
                </div>
            </Card>

            {/* 2. COUNTRY CARDS (1/3 width) */}
            <div className="space-y-4">
                {countryData.map((country) => (
                    <Card key={country.id} className="p-4 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{country.name}</h4>
                                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                    Levy: ${country.exportLevy}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-blue-700">
                                    {Math.round(country.marketShare || 0)}%
                                </p>
                                <p className="text-[10px] text-gray-400">Share</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-end mt-3 pt-3 border-t border-gray-100">
                            <div>
                                <p className="text-[10px] text-gray-500">Landed Cost</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    ${Math.round(country.landedCost || 0)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-500">Vol (MT)</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {Math.round(country.simulatedVolume || 0)}k
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
                
                <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                        <Anchor className="w-4 h-4 text-green-700" />
                        <h4 className="font-bold text-green-800 text-sm">Total Imports</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                        {(countryData.reduce((acc, c) => acc + (c.simulatedVolume || 0), 0) / 1000).toFixed(2)} M Tonnes
                    </p>
                </Card>
            </div>

        </div>
      </div>
    </div>
  );
};