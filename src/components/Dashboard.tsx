// import React, { useState, useEffect, useRef } from 'react';
// import Plot from 'react-plotly.js';
// import { Data, Layout } from 'plotly.js';

// // --- Types ---
// interface ChartProps {
//   data: any; // Passing dynamic data down
//   layout?: Partial<Layout>;
// }

// // --- Helper to generate random noise ---
// const getRandomNoise = (volatility: number) => (Math.random() - 0.5) * volatility;

// // 1. REAL-TIME PRICE CHART
// const PriceForecastChart: React.FC<{ priceHistory: { x: string[], y: number[], upper: number[], lower: number[] } }> = ({ priceHistory }) => {
  
//   const data: Data[] = [
//     // Confidence Band
//     {
//       x: [...priceHistory.x, ...priceHistory.x.slice().reverse()],
//       y: [...priceHistory.upper, ...priceHistory.lower.slice().reverse()],
//       fill: 'toself',
//       fillcolor: 'rgba(0,100,80,0.2)',
//       line: { color: 'transparent' },
//       name: 'Confidence (95%)',
//       type: 'scatter',
//       showlegend: false,
//       hoverinfo: 'skip'
//     },
//     // Main Line
//     {
//       x: priceHistory.x,
//       y: priceHistory.y,
//       type: 'scatter',
//       mode: 'lines+markers',
//       line: { color: '#109618', width: 3 },
//       name: 'Live Price',
//     },
//   ];

//   return (
//     <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: 'white' }}>
//       <h3>📉 Live Price Stream</h3>
//       <Plot
//         data={data}
//         layout={{
//           width: 600,
//           height: 400,
//           margin: { l: 40, r: 20, b: 40, t: 20 },
//           yaxis: { title: 'Price (INR/Liter)', range: [80, 120] }, // Fixed range prevents jitter
//           xaxis: { title: 'Time Sequence' },
//           showlegend: true,
//           legend: { orientation: 'h', y: -0.2 }
//         }}
//         config={{ displayModeBar: false }}
//         // Important: revision tells Plotly to redraw when length changes
//         revision={priceHistory.x.length}
//       />
//     </div>
//   );
// };

// // 2. REAL-TIME SCENARIO RADAR
// const ScenarioRadarChart: React.FC<{ scores: number[] }> = ({ scores }) => {
//   const categories = ['Farmer Revenue', 'Consumer CPI', 'Govt Revenue', 'Import Vol', 'Supply Stability'];

//   const data: Data[] = [
//     {
//       type: 'scatterpolar',
//       r: [80, 40, 60, 90, 70], // Static Baseline
//       theta: categories,
//       fill: 'toself',
//       name: 'Baseline (0%)',
//       line: { color: 'gray', dash: 'dot' }
//     },
//     {
//       type: 'scatterpolar',
//       r: scores, // Dynamic Input
//       theta: categories,
//       fill: 'toself',
//       name: 'Live Simulation',
//       line: { color: '#FF9900' }
//     }
//   ];

//   return (
//     <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: 'white' }}>
//       <h3>⚖️ Dynamic Trade-off</h3>
//       <Plot
//         data={data}
//         layout={{
//           width: 500,
//           height: 400,
//           polar: {
//             radialaxis: { visible: true, range: [0, 100] }
//           },
//           margin: { l: 40, r: 40, b: 40, t: 20 },
//           showlegend: true,
//           legend: { orientation: 'h', y: -0.1 }
//         }}
//         config={{ displayModeBar: false }}
//       />
//     </div>
//   );
// };

// // 3. INTERACTIVE 3D SURFACE (Controlled by Slider Input)
// const ThreeDImpactChart: React.FC<{ globalStress: number }> = ({ globalStress }) => {
  
//   // Recalculate surface based on "Global Stress" input
//   const x_tariff = [0, 10, 20, 30, 0, 10, 20, 30, 0, 10, 20, 30];
//   const y_cpi =    [100, 105, 110, 120, 100, 105, 110, 120, 100, 105, 110, 120];
  
//   // The Z-axis (Consumption) reacts to the global stress input
//   const z_consump = [50, 48, 45, 30, 52, 49, 44, 32, 51, 48, 46, 31].map(v => v - (globalStress * 0.5));

//   const data: Data[] = [{
//     type: 'mesh3d',
//     x: x_tariff,
//     y: y_cpi,
//     z: z_consump,
//     opacity: 0.8,
//     colorscale: 'Viridis',
//     intensity: z_consump, 
//   } as any];

//   return (
//     <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: 'white' }}>
//       <h3>🧊 Sensitivity Analysis</h3>
//       <Plot
//         data={data}
//         layout={{
//           width: 600,
//           height: 500,
//           margin: { l: 0, r: 0, b: 0, t: 0 },
//           scene: {
//             xaxis: { title: 'Tariff (%)' },
//             yaxis: { title: 'CPI (Inflation)' },
//             zaxis: { title: 'Consumption (MT)', range: [0, 60] },
//           }
//         }}
//       />
//     </div>
//   );
// };

// // MAIN CONTROLLER COMPONENT
// const PolicyDashboard: React.FC = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volatility, setVolatility] = useState(5); // User Input 1
  
//   // -- State for Charts --
//   const [priceData, setPriceData] = useState({
//     x: ['T1', 'T2', 'T3', 'T4', 'T5'],
//     y: [90, 92, 95, 94, 98],
//     upper: [95, 98, 102, 100, 105],
//     lower: [85, 86, 88, 88, 91]
//   });

//   const [radarScores, setRadarScores] = useState([95, 75, 85, 50, 60]);
//   const counter = useRef(5);

//   // -- The Simulation Loop --
//   useEffect(() => {
//   let interval: ReturnType<typeof setInterval>;

//     if (isPlaying) {
//       interval = setInterval(() => {
//         counter.current += 1;
//         const tick = `T${counter.current}`;

//         // 1. Update Price Data (Sliding Window)
//         setPriceData(prev => {
//           const lastPrice = prev.y[prev.y.length - 1];
//           const newPrice = lastPrice + getRandomNoise(volatility);
          
//           // Slide window: Remove first, add new
//           return {
//             x: [...prev.x.slice(1), tick],
//             y: [...prev.y.slice(1), newPrice],
//             upper: [...prev.upper.slice(1), newPrice + 5],
//             lower: [...prev.lower.slice(1), newPrice - 5],
//           };
//         });

//         // 2. Update Radar Data (Random Jitter)
//         setRadarScores(prev => prev.map(val => {
//           const newVal = val + getRandomNoise(volatility);
//           return Math.min(100, Math.max(0, newVal)); // Clamp between 0-100
//         }));

//       }, 1000); // Update every 1 second
//     }

//     return () => clearInterval(interval);
//   }, [isPlaying, volatility]);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      
//       {/* HEADER & CONTROLS */}
//       <header style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #ddd' }}>
//         <h1 style={{ color: '#2c3e50', margin: 0 }}>⚡ Real-Time Policy Simulator</h1>
//         <p style={{ color: '#7f8c8d' }}>Adjust parameters to see live impact on Agriculture-Economics</p>
        
//         {/* INPUT CONTROLS */}
//         <div style={{ marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          
//           {/* Start/Stop Button */}
//           <button 
//             onClick={() => setIsPlaying(!isPlaying)}
//             style={{
//               padding: '10px 20px',
//               backgroundColor: isPlaying ? '#e74c3c' : '#27ae60',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               fontSize: '16px'
//             }}
//           >
//             {isPlaying ? '⏸ Pause Simulation' : '▶ Start Simulation'}
//           </button>

//           {/* Slider Input */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
//             <label style={{ fontWeight: 'bold' }}>Market Volatility / Stress: {volatility}</label>
//             <input 
//               type="range" 
//               min="1" max="20" 
//               value={volatility} 
//               onChange={(e) => setVolatility(Number(e.target.value))}
//               style={{ width: '200px' }}
//             />
//           </div>

//           <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#888' }}>
//             Status: {isPlaying ? <span style={{color: 'green'}}>● Live Feed Active</span> : <span style={{color: 'red'}}>● Offline</span>}
//           </div>
//         </div>
//       </header>

//       {/* DASHBOARD GRID */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
//         <PriceForecastChart priceHistory={priceData} />
//         <ScenarioRadarChart scores={radarScores} />
//         <ThreeDImpactChart globalStress={volatility} />
//       </div>

//     </div>
//   );
// };

// export default PolicyDashboard;