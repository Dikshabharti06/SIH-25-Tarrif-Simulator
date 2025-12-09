import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Map, Calendar, TrendingUp, IndianRupee } from 'lucide-react';
import { Data } from 'plotly.js';

// --- 1. FIXED INTERFACE ---
interface StateData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  baseProduction: number; // in '000 MT
  baseRevenue: number;    // in Crores
  affordabilityScore: number; // 0-100
  
  // Added these as optional (?) because they are calculated dynamically later
  currentProduction?: number;
  currentRevenue?: number;
  currentAffordability?: number;
}

// --- 2. FIXED INITIAL DATA (Renamed 'affordability' to 'affordabilityScore') ---
const INITIAL_STATES: StateData[] = [
  { id: 'AP', name: 'Andhra Pradesh', lat: 15.91, lon: 79.74, baseProduction: 450, baseRevenue: 2200, affordabilityScore: 78 },
  { id: 'TS', name: 'Telangana', lat: 17.87, lon: 79.01, baseProduction: 380, baseRevenue: 1900, affordabilityScore: 82 },
  { id: 'KA', name: 'Karnataka', lat: 15.31, lon: 75.71, baseProduction: 210, baseRevenue: 1100, affordabilityScore: 70 },
  { id: 'TN', name: 'Tamil Nadu', lat: 11.12, lon: 78.65, baseProduction: 180, baseRevenue: 950, affordabilityScore: 65 },
  { id: 'AS', name: 'Assam', lat: 26.20, lon: 92.93, baseProduction: 120, baseRevenue: 600, affordabilityScore: 55 },
];

export const StateAnalysis: React.FC = () => {
  // --- State for Subsidy Levers ---
  const [capexSubsidy, setCapexSubsidy] = useState(25);      // % of Cost
  const [maintenanceSubsidy, setMaintenanceSubsidy] = useState(15); // % of Cost
  const [mspSupport, setMspSupport] = useState(11000);       // INR/MT

  // --- Computed Data ---
  const [mapData, setMapData] = useState<any[]>([]);
  const [seasonalData, setSeasonalData] = useState<any>({ x: [], y: [] });
  const [heatmapData, setHeatmapData] = useState<StateData[]>(INITIAL_STATES);

  // --- Simulation Effect ---
  useEffect(() => {
    // 1. Calculate Production Multiplier based on Subsidies
    const totalSubsidyImpact = (capexSubsidy + maintenanceSubsidy) / 200; 
    const priceIncentive = (mspSupport - 10000) / 50000; // MSP impact
    const growthFactor = 1 + totalSubsidyImpact + priceIncentive;

    // 2. Update State Data (Map & Heatmap)
    const updatedStates = INITIAL_STATES.map(state => ({
      ...state,
      currentProduction: state.baseProduction * growthFactor,
      currentRevenue: state.baseRevenue * growthFactor * (1 + priceIncentive),
      // Higher revenue = Better affordability score locally
      currentAffordability: Math.min(100, state.affordabilityScore + (priceIncentive * 20)) 
    }));
    setHeatmapData(updatedStates);
// 3. Prepare Map Plot Data (Bubble Map)
    const bubbles: Data = {
      type: 'scattergeo',
      mode: 'text+markers', // FIXED: Changed order from 'markers+text'
      text: updatedStates.map(s => s.name),
      lon: updatedStates.map(s => s.lon),
      lat: updatedStates.map(s => s.lat),
      marker: {
        size: updatedStates.map(s => (s.currentProduction || 0) / 5),
        color: updatedStates.map(s => s.currentRevenue || 0),
        colorscale: 'Greens',
        cmin: 500,
        cmax: 3000,
        showscale: true,
        colorbar: { 
            title: { text: 'Revenue (Cr)' }, 
            titleside: 'right' 
        } as any,
        line: { color: 'black', width: 1 }
      },
      textposition: 'top center',
      name: 'Production Hubs',
      hoverinfo: 'text',
      hovertext: updatedStates.map(s => 
        `<b>${s.name}</b><br>Prod: ${Math.round(s.currentProduction || 0)}k MT<br>Rev: ₹${Math.round(s.currentRevenue || 0)} Cr`
      )
    };
    setMapData([bubbles]);

    // 4. Seasonal Monthly Forecasting logic
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const seasonality = [1.2, 1.1, 0.9, 0.8, 0.7, 0.7, 0.8, 0.9, 1.0, 1.2, 1.25, 1.2];
    
    const totalAnnualProd = updatedStates.reduce((acc, s) => acc + (s.currentProduction || 0), 0);
    const avgMonthly = totalAnnualProd / 12;

    const monthlyYield = seasonality.map(factor => avgMonthly * factor);
    
    setSeasonalData({ x: months, y: monthlyYield });

  }, [capexSubsidy, maintenanceSubsidy, mspSupport]);

  return (
    <div className="space-y-6">
      
      {/* --- CONTROL PANEL --- */}
      <Card className="p-6 bg-white border-green-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
           <IndianRupee className="text-green-600" />
           <h3 className="text-lg font-bold text-gray-800">Subsidy & Support Controls</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            {/* CapEx Slider */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label className="text-gray-600">CapEx Subsidy (Plantation)</Label>
                    <span className="font-bold text-green-700">{capexSubsidy}%</span>
                </div>
                <Slider 
                    value={[capexSubsidy]} 
                    min={0} max={100} step={5}
                    onValueChange={(v) => setCapexSubsidy(v[0])}
                    className="py-2"
                />
                <p className="text-xs text-gray-400">Subsidy on inputs & irrigation</p>
            </div>

            {/* Maintenance Slider */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label className="text-gray-600">Maintenance Support</Label>
                    <span className="font-bold text-blue-700">{maintenanceSubsidy}%</span>
                </div>
                <Slider 
                    value={[maintenanceSubsidy]} 
                    min={0} max={50} step={1}
                    onValueChange={(v) => setMaintenanceSubsidy(v[0])}
                    className="py-2"
                />
                <p className="text-xs text-gray-400">During gestation period (4 yrs)</p>
            </div>

            {/* MSP Slider */}
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Label className="text-gray-600">MSP / Price Guarantee</Label>
                    <span className="font-bold text-purple-700">₹{mspSupport}</span>
                </div>
                <Slider 
                    value={[mspSupport]} 
                    min={8000} max={15000} step={500}
                    onValueChange={(v) => setMspSupport(v[0])}
                    className="py-2"
                />
                <p className="text-xs text-gray-400">Guaranteed price per MT FFB</p>
            </div>
        </div>
      </Card>

      {/* --- VISUALIZATION GRID --- */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* 1. STATE-WISE MAP */}
        <Card className="p-4 border-2 border-gray-300 shadow bg-gray-100">
            <div className="flex items-center gap-2 mb-2">
                <Map className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-800">Production Hubs (NMEO-OP Clusters)</h3>
            </div>
            <p className="text-xs text-gray-500 mb-2">Bubble size = Production Vol | Color = Revenue Generated</p>
            <div className="h-[400px] w-full bg-gray-50 rounded-lg overflow-hidden relative">
                <Plot
                    data={mapData}
                    layout={{
                        geo: {
                            scope: 'asia', 
                            resolution: 50,
                            center: { lat: 20, lon: 82 }, 
                            projection: { type: 'mercator', scale: 2.5 }, 
                            showland: true,
                            landcolor: 'green-100',
                            countrycolor: 'green-100',
                            coastlinecolor: 'green-200',
                            showocean: true,
                            oceancolor: 'blue-50'
                        },
                        margin: { l: 0, r: 0, t: 0, b: 0 },
                        showlegend: false,
                        autosize: true,
                        height: 400,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                    }}
                    style={{ width: '100%', height: '100%' }}
                    config={{ displayModeBar: false, scrollZoom: false }}
                />
            </div>
        </Card>

        {/* 2. SEASONAL YIELD GRAPH */}
        <Card className="p-4  border-2 border-gray-300 shadow bg-gray-100">
            <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-gray-800">Seasonal Monthly Forecast</h3>
            </div>
            <p className="text-xs text-gray-500 mb-2">Yield fluctuations due to Heat Stress & Monsoon</p>
            <div className="h-[400px] w-full">
                <Plot
                    data={[
                        {
                            x: seasonalData.x,
                            y: seasonalData.y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            line: { shape: 'spline', width: 3, color: '#ea580c' },
                            fill: 'tozeroy',
                            fillcolor: 'rgba(234, 88, 12, 0.1)',
                            name: 'Projected Yield'
                        }
                    ]}
                    layout={{
                        autosize: true,
                        height: 400,
                        margin: { l: 40, r: 20, t: 20, b: 40 },
                        xaxis: { title: 'Month' },
                        yaxis: { title: 'Yield (000 MT)' },
                        shapes: [
                            {
                                type: 'rect',
                                xref: 'x', yref: 'paper',
                                x0: 'Oct', x1: 'Dec',
                                y0: 0, y1: 1,
                                fillcolor: 'green', opacity: 0.1, line: { width: 0 }
                            },
                            {
                                type: 'rect',
                                xref: 'x', yref: 'paper',
                                x0: 'May', x1: 'Jun',
                                y0: 0, y1: 1,
                                fillcolor: 'red', opacity: 0.1, line: { width: 0 }
                            }
                        ],
                        annotations: [
                            { x: 'Nov', y: 0, text: 'Peak Season', showarrow: false, yref: 'paper', yanchor: 'bottom', font: {color:'green', size:10} },
                            { x: 'May', y: 0, text: 'Heat Stress', showarrow: false, yref: 'paper', yanchor: 'bottom', font: {color:'red', size:10} }
                        ]
                    }}
                    style={{ width: '100%', height: '100%' }}
                    config={{ displayModeBar: false }}
                />
            </div>
        </Card>
      </div>

      {/* 3. AFFORDABILITY & REVENUE HEATMAP CARDS */}
      <Card className="p-6 border-2 border-gray-300 shadow bg-gray-100">
        <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-600" />
                <h3 className="font-bold text-gray-800">State-wise Economic Heatmap</h3>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Based on Income + Edible Oil Consumption</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {heatmapData.map((state) => {
                const score = state.currentAffordability || 0;
                let bgClass = "bg-red-50 border-red-200";
                let textClass = "text-red-700";
                
                if (score > 80) { bgClass = "bg-green-50 border-green-200"; textClass = "text-green-700"; }
                else if (score > 65) { bgClass = "bg-yellow-50 border-yellow-200"; textClass = "text-yellow-700"; }

                return (
                    <div key={state.id} className={`p-4 rounded-xl border ${bgClass} transition-all duration-500`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800">{state.id}</span>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-white ${textClass}`}>
                                Score: {Math.round(score)}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Revenue Uplift</p>
                            <p className={`text-lg font-bold ${textClass}`}>
                                ₹{Math.round(state.currentRevenue || 0)} Cr
                            </p>
                            <p className="text-[10px] text-gray-400">
                                {state.name}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
      </Card>

    </div>
  );
};