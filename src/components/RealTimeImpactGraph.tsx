import { Card } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface RealTimeImpactGraphProps {
  tariff: number;
  globalPrice: number;
  yieldGap: number;
}

export function RealTimeImpactGraph({ tariff, globalPrice, yieldGap }: RealTimeImpactGraphProps) {
  // Generate comprehensive data points
  const generateDataPoints = () => {
    const points = [];
    for (let t = 0; t <= 25; t += 1) {
      const consumerPrice = 120 + (t * 0.8) + ((globalPrice - 1000) / 20);
      const farmerIncome = 100 + (t * 1.5);
      const importVolume = 100 - (t * 1.2) + (yieldGap * 0.3);
      
      points.push({
        tariff: t,
        'Consumer Price Index': Math.round(consumerPrice),
        'Farmer Income Index': Math.round(farmerIncome),
        'Import Volume Index': Math.round(Math.max(30, importVolume))
      });
    }
    return points;
  };

  const data = generateDataPoints();
  const currentPoint = data.find(d => d.tariff === Math.round(tariff)) || data[Math.round(tariff)];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">Tariff: {data.tariff}%</p>
          <div className="space-y-1 text-sm">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <h3>Real-Time Policy Impact Simulation</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Live visualization of how different tariff levels affect key economic indicators
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorConsumer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorFarmer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorImport" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="tariff" 
            tick={{ fontSize: 11 }}
            label={{ value: 'Tariff Rate (%)', position: 'insideBottom', offset: -5, fontSize: 11 }}
          />
          <YAxis tick={{ fontSize: 11 }} label={{ value: 'Index (Base=100)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Area 
            type="monotone" 
            dataKey="Consumer Price Index" 
            stroke="#ef4444" 
            fill="url(#colorConsumer)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Farmer Income Index" 
            stroke="#22c55e" 
            fill="url(#colorFarmer)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Import Volume Index" 
            stroke="#3b82f6" 
            fill="url(#colorImport)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      {currentPoint && (
        <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-sm font-medium text-indigo-900 mb-2">
            Current Scenario (Tariff: {Math.round(tariff)}%)
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-600">Consumer Price</p>
              <p className="font-bold text-red-700">{currentPoint['Consumer Price Index']}</p>
            </div>
            <div>
              <p className="text-gray-600">Farmer Income</p>
              <p className="font-bold text-green-700">{currentPoint['Farmer Income Index']}</p>
            </div>
            <div>
              <p className="text-gray-600">Import Volume</p>
              <p className="font-bold text-blue-700">{currentPoint['Import Volume Index']}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
