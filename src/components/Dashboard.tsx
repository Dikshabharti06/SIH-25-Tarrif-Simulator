import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

// --- Types ---
interface ChartProps {
  width?: number | string;
  height?: number;
}

// 1. PRICE FORECAST CHART (Line + Confidence Band)
const PriceForecastChart: React.FC<ChartProps> = () => {
  const dates = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05'];
  
  // Simulated AI Data
  const predictedPrice = [90, 92, 95, 94, 98];
  const upperConf = [95, 98, 102, 100, 105]; // Upper bound
  const lowerConf = [85, 86, 88, 88, 91];   // Lower bound

  const data: Data[] = [
    // The Confidence Band (Background)
    {
      x: [...dates, ...dates.slice().reverse()], // Go forward then backward
      y: [...upperConf, ...lowerConf.slice().reverse()],
      fill: 'toself',
      fillcolor: 'rgba(0,100,80,0.2)',
      line: { color: 'transparent' },
      name: 'Confidence Interval (95%)',
      type: 'scatter',
      showlegend: false,
    },
    // The Main Prediction Line
    {
      x: dates,
      y: predictedPrice,
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#109618', width: 3 }, // Green for Ag
      name: 'Predicted Price (INR/L)',
    },
  ];

  return (
    <div className="chart-container">
      <h3>📉 Price Forecast (LSTM + Prophet)</h3>
      <Plot
        data={data}
        layout={{
          width: 600,
          height: 400,
          margin: { l: 40, r: 20, b: 40, t: 20 },
          yaxis: { title: 'Price (INR/Liter)' },
          showlegend: true,
          legend: { orientation: 'h', y: -0.2 }
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

// 2. SCENARIO COMPARISON (Radar Chart)
// Purpose: Compare "Current Policy" vs "Proposed Tariff Hike"-
const ScenarioRadarChart: React.FC<ChartProps> = () => {
  const categories = ['Farmer Revenue', 'Consumer CPI', 'Govt Revenue', 'Import Vol', 'Supply Stability'];

  const data: Data[] = [
    {
      type: 'scatterpolar',
      r: [80, 40, 60, 90, 70], // Scores out of 100
      theta: categories,
      fill: 'toself',
      name: 'Current Policy (0% Tariff)',
      line: { color: 'gray' }
    },
    {
      type: 'scatterpolar',
      r: [95, 75, 85, 50, 60], // Higher farmer rev, but higher CPI
      theta: categories,
      fill: 'toself',
      name: 'Proposed (20% Tariff)',
      line: { color: '#FF9900' }
    }
  ];

  return (
    <div className="chart-container">
      <h3>⚖️ Policy Impact Trade-off</h3>
      <Plot
        data={data}
        layout={{
          width: 500,
          height: 400,
          polar: {
            radialaxis: { visible: true, range: [0, 100] }
          },
          margin: { l: 40, r: 40, b: 40, t: 20 },
          showlegend: true,
          legend: { orientation: 'h', y: -0.1 }
        }}
      />
    </div>
  );
};

// 3. 3D PRICE-TARIFF-CONSUMPTION (3D Scatter/Surface)
// Purpose: Visualize the "Sweet Spot" for tariff setting.
const ThreeDImpactChart: React.FC<ChartProps> = () => {
  // Generating a mesh surface
  const x_tariff = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10, 20, 30]; // Tariff %
  const y_cpi =    [100, 105, 110, 120, 100, 105, 110, 120, 100, 105, 110, 120]; // Inflation Index
  const z_consump = [50, 48, 45, 30, 52, 49, 44, 32, 51, 48, 46, 31]; // Consumption Vol

  const data: Data[] = [{
    type: 'mesh3d',
    x: x_tariff,
    y: y_cpi,
    z: z_consump,
    opacity: 0.8,
    colorscale: 'Viridis',
  }];

  return (
    <div className="chart-container">
      <h3>🧊 Tariff vs. Inflation vs. Consumption</h3>
      <Plot
        data={data}
        layout={{
          width: 600,
          height: 500,
          margin: { l: 0, r: 0, b: 0, t: 0 },
          scene: {
            xaxis: { title: 'Tariff (%)' },
            yaxis: { title: 'CPI (Inflation)' },
            zaxis: { title: 'Consumption (MT)' },
          }
        }}
      />
    </div>
  );
};

// MAIN DASHBOARD LAYOUT
const PolicyDashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #eee' }}>
        <h1 style={{ color:'black' }}>Policy Impact Dashboard</h1>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/* Top Row: Forecast & Radar */}
        <PriceForecastChart />
        <ScenarioRadarChart />
        
        {/* Bottom Row: 3D Analysis */}
        <ThreeDImpactChart />
      </div>
    </div>
  );
};

export default PolicyDashboard;