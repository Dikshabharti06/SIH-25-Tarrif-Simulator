import { Card } from './ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AgentBehavior } from '../data/agentModels';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketActorMapProps {
  agents: AgentBehavior[];
}

export function MarketActorMap({ agents }: MarketActorMapProps) {
  const getColor = (change: number) => {
    if (change > 10) return '#22c55e'; // green
    if (change > 0) return '#84cc16'; // lime
    if (change > -10) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium mb-1">{data.agentType} Agent</p>
          <p className="text-sm text-gray-600 mb-2">{data.metric}</p>
          <div className="space-y-1 text-sm">
            <p>Baseline: {data.baseline.toFixed(1)}</p>
            <p>New Value: {data.newValue.toFixed(1)}</p>
            <p className={`flex items-center gap-1 ${data.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              Change: {data.change > 0 ? '+' : ''}{data.change.toFixed(1)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Agent-Based Market Response</h3>
      <p className="text-sm text-gray-600 mb-6">
        Simulated behavior shifts of key market actors in response to policy changes
      </p>
      
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
          <YAxis type="number" dataKey="y" domain={[0, 100]} hide />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={agents} fill="#8884d8">
            {agents.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.change)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-5 gap-2 mt-6">
        {agents.map((agent, idx) => (
          <div key={idx} className="text-center">
            <div 
              className="w-full h-2 rounded mb-1" 
              style={{ backgroundColor: getColor(agent.change) }}
            />
            <p className="text-xs mb-1">{agent.agentType}</p>
            <p className="text-xs text-gray-600">
              {agent.change > 0 ? '+' : ''}{agent.change.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Negative</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Neutral</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Positive</span>
        </div>
      </div>
    </Card>
  );
}
