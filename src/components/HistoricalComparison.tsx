import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { historicalPolicies } from '../data/historicalPolicies';
import { Clock } from 'lucide-react';

interface HistoricalComparisonProps {
  currentTariff: number;
  currentGlobalPrice: number;
}

export function HistoricalComparison({ currentTariff, currentGlobalPrice }: HistoricalComparisonProps) {
  // Add projected scenario to historical data
  const dataWithProjection = [
    ...historicalPolicies,
    {
      year: 2025,
      month: 'Projected',
      tariffRate: currentTariff,
      globalPrice: currentGlobalPrice,
      domesticPrice: 120 + (currentTariff * 0.8) + ((currentGlobalPrice - 1000) * 0.06),
      farmerIncome: 105 + (currentTariff * 1.5),
      description: 'Your scenario projection'
    }
  ];

  const chartData = dataWithProjection.map(d => ({
    name: `${d.month.substring(0, 3)} ${d.year}`,
    'Domestic Price (₹/kg)': Math.round(d.domesticPrice),
    'Farmer Income (Index)': Math.round(d.farmerIncome),
    'Tariff Rate (%)': d.tariffRate,
    isProjection: d.month === 'Projected'
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-600">Domestic Price: ₹{data['Domestic Price (₹/kg)']}/kg</p>
            <p className="text-green-600">Farmer Income: {data['Farmer Income (Index)']}</p>
            <p className="text-purple-600">Tariff: {data['Tariff Rate (%)']}%</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3>Historical Policy Impact Analysis</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Learn from past tariff changes and compare your scenario with historical outcomes
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="Domestic Price (₹/kg)" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="Farmer Income (Index)" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="Tariff Rate (%)" 
            stroke="#a855f7" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        <h4 className="font-medium text-sm">Key Historical Lessons:</h4>
        <div className="text-xs text-gray-700 space-y-2">
          <p className="p-2 bg-red-50 border border-red-200 rounded">
            <span className="font-medium">2021 Duty Cut:</span> Reducing tariff to 2.5% during high global prices 
            led to retail price surge (+27%) and farmer income decline (-25%)
          </p>
          <p className="p-2 bg-orange-50 border border-orange-200 rounded">
            <span className="font-medium">2022 Ukraine Crisis:</span> Even with tariff increase to 5.5%, 
            global price shock pushed domestic prices to record highs
          </p>
          <p className="p-2 bg-green-50 border border-green-200 rounded">
            <span className="font-medium">2023 Recovery:</span> Tariff hike to 12.5% with favorable global prices 
            improved farmer income (+8%) with moderate consumer impact
          </p>
        </div>
      </div>
    </Card>
  );
}
