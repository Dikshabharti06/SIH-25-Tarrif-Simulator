import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Scenario {
  name: string;
  tariff: number;
  globalPrice: number;
  yieldGap: number;
  consumerScore: number;
  farmerScore: number;
  fiscalScore: number;
}

interface ComparisonViewProps {
  scenarios: Scenario[];
}

export function ComparisonView({ scenarios }: ComparisonViewProps) {
  if (scenarios.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">Save multiple scenarios to compare them side-by-side</p>
      </Card>
    );
  }

  const metrics = [
    { key: 'tariff', label: 'Tariff Rate', unit: '%' },
    { key: 'globalPrice', label: 'Global Price', unit: ' USD/T', prefix: '$' },
    { key: 'yieldGap', label: 'Yield Gap', unit: '%' },
    { key: 'consumerScore', label: 'Consumer Score', unit: '/100' },
    { key: 'farmerScore', label: 'Farmer Score', unit: '/100' },
    { key: 'fiscalScore', label: 'Fiscal Score', unit: '/100' }
  ];

  const getChangeIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-3 h-3 text-red-600" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Scenario Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-medium text-gray-700">Metric</th>
              {scenarios.map((scenario, idx) => (
                <th key={idx} className="text-center p-2">
                  <Badge variant="outline" className="font-normal">
                    {scenario.name}
                  </Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2 font-medium text-gray-700">{metric.label}</td>
                {scenarios.map((scenario, sIdx) => {
                  const value = scenario[metric.key as keyof Scenario];
                  const prevValue = sIdx > 0 ? scenarios[sIdx - 1][metric.key as keyof Scenario] : null;
                  return (
                    <td key={sIdx} className="text-center p-2">
                      <div className="flex items-center justify-center gap-1">
                        {prevValue !== null && typeof value === 'number' && typeof prevValue === 'number' && 
                          getChangeIcon(value as number, prevValue as number)
                        }
                        <span>
                          {metric.prefix || ''}{value}{metric.unit}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
