import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button'; // Assuming you have a Button component
import { indianStates, calculateAffordabilityImpact } from '../data/stateData';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface StateAffordabilityHeatmapProps {
  priceIncrease: number;
}

export function StateAffordabilityHeatmap({ priceIncrease }: StateAffordabilityHeatmapProps) {
  const [showAll, setShowAll] = useState(false);

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

  const getBorderColor = (impact: number) => {
    if (impact > 60) return 'border-red-200 bg-red-50/50';
    if (impact > 40) return 'border-orange-200 bg-orange-50/50';
    if (impact > 20) return 'border-yellow-200 bg-yellow-50/50';
    return 'border-green-200 bg-green-50/50';
  };

  const getImpactTextColor = (impact: number) => {
    if (impact > 60) return 'text-red-700';
    if (impact > 40) return 'text-orange-700';
    if (impact > 20) return 'text-yellow-700';
    return 'text-green-700';
  };

  const criticalStates = statesWithImpact.filter(s => s.impact > 40);
  const visibleStates = showAll ? statesWithImpact : statesWithImpact.slice(0, 12);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">State-Wise Affordability Impact</h3>
          <p className="text-sm text-gray-500 mt-1">
            Impact based on local per capita income & consumption patterns.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
          <span>Scale:</span>
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Low</span>
          </div>
          <div className="w-px h-3 bg-gray-300 mx-1" />
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
        </div>
      </div>

      {criticalStates.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="p-2 bg-red-100 rounded-full shrink-0">
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-red-900">High Impact Alert</p>
            <p className="text-red-700 mt-0.5 leading-relaxed">
              <span className="font-bold">{criticalStates.length} states</span> (including {criticalStates.slice(0, 2).map(s => s.name).join(', ')}) 
              will experience significant affordability strain (40% impact score).
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {visibleStates.map((state) => (
          <div 
            key={state.code}
            className={`p-3 rounded-xl border transition-all hover:shadow-md cursor-default group ${getBorderColor(state.impact)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-800 truncate pr-2" title={state.name}>
                {state.name}
              </span>
              <div className={`w-2 h-2 rounded-full shrink-0 ${getImpactColor(state.impact)}`} />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Income</span>
                <span className="font-mono">₹{(state.perCapitaIncome / 1000).toFixed(1)}k</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Impact Score</span>
                <span className={`text-sm font-bold font-mono ${getImpactTextColor(state.impact)}`}>
                  {state.impact.toFixed(1)}%
                </span>
              </div>
              
              {/* Mini Bar Chart for Impact */}
              <div className="w-full bg-white/50 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getImpactColor(state.impact)}`} 
                  style={{ width: `${Math.min(state.impact, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center border-t border-gray-100 pt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowAll(!showAll)}
          className="text-gray-500 hover:text-gray-900"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              View All States ({statesWithImpact.length}) <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}