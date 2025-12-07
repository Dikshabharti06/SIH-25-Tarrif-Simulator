import { Card } from './ui/card';
import { indianStates, calculateAffordabilityImpact } from '../data/stateData';
import { AlertTriangle } from 'lucide-react';

interface StateAffordabilityHeatmapProps {
  priceIncrease: number;
}

export function StateAffordabilityHeatmap({ priceIncrease }: StateAffordabilityHeatmapProps) {
  const statesWithImpact = indianStates.map(state => ({
    ...state,
    impact: calculateAffordabilityImpact(state, priceIncrease)
  })).sort((a, b) => b.impact - a.impact);

  const getImpactColor = (impact: number) => {
    if (impact > 60) return 'bg-red-500';
    if (impact > 40) return 'bg-orange-500';
    if (impact > 20) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getImpactTextColor = (impact: number) => {
    if (impact > 60) return 'text-red-700';
    if (impact > 40) return 'text-orange-700';
    if (impact > 20) return 'text-yellow-700';
    return 'text-green-700';
  };

  const criticalStates = statesWithImpact.filter(s => s.impact > 40);

  return (
    <Card className="p-6">
      <h3 className="mb-4">State-Wise Affordability Impact</h3>
      <p className="text-sm text-gray-600 mb-6">
        Consumer affordability impact across Indian states based on per capita income and consumption patterns
      </p>

      {criticalStates.length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-orange-900">High Impact Alert</p>
            <p className="text-orange-700">
              {criticalStates.length} state{criticalStates.length > 1 ? 's' : ''} will experience significant affordability strain
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-4">
        {statesWithImpact.slice(0, 15).map((state, idx) => (
          <div 
            key={state.code}
            className="p-3 rounded-lg border-2 transition-all hover:shadow-md"
            style={{
              borderColor: state.impact > 60 ? '#ef4444' : 
                          state.impact > 40 ? '#f97316' : 
                          state.impact > 20 ? '#eab308' : '#22c55e'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{state.name}</span>
              <div className={`w-2 h-2 rounded-full ${getImpactColor(state.impact)}`} />
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Pop: {state.population}M</p>
              <p>Income: ₹{(state.perCapitaIncome / 1000).toFixed(1)}k/mo</p>
              <p className={getImpactTextColor(state.impact)}>
                Impact: {state.impact.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 pt-4 border-t">
        <span>Low Impact</span>
        <div className="flex gap-1">
          <div className="w-8 h-3 bg-green-500 rounded" />
          <div className="w-8 h-3 bg-yellow-500 rounded" />
          <div className="w-8 h-3 bg-orange-500 rounded" />
          <div className="w-8 h-3 bg-red-500 rounded" />
        </div>
        <span>High Impact</span>
      </div>
    </Card>
  );
}
