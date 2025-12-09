import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { TrendingUp, TrendingDown, AlertCircle, BarChart3 } from 'lucide-react';
import { Progress } from './ui/progress';

interface ExecutiveMemoProps {
  memo: {
    parameters: {
      tariff: number;
      globalPrice: number;
      yieldGap: number;
    };
    paragraphs: {
      consumerAffordability: string;
      farmerProfitability: string;
      importDependency: string;
    };
    xaiRationale: {
      tariffInfluence: number;
      priceInfluence: number;
      gapInfluence: number;
      summary: string;
    };
    recommendations: string[];
    riskLevel: 'low' | 'moderate' | 'high';
  };
}

export function ExecutiveMemo({ memo }: ExecutiveMemoProps) {
  const riskColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Card className="p-8 border-2 border-gray-300 shadow bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="mb-2 text-xl font-bold">Executive Policy Memo</h2>
            <p className="text-sm text-gray-600">
              Chief Economic Advisor | Ministry of Commerce, India
            </p>
          </div>
          <Badge className={riskColors[memo.riskLevel]}>
            {memo.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 mb-1">Tariff Rate</p>
            <p>{memo.parameters.tariff}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Global CPO Price</p>
            <p>${memo.parameters.globalPrice}/T</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Yield Gap</p>
            <p>{memo.parameters.yieldGap}%</p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Analysis Sections */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            <h3>Consumer Affordability Impact</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {memo.paragraphs.consumerAffordability}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3>Farmer Profitability & NMEO-OP Confidence</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {memo.paragraphs.farmerProfitability}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3>Long-Term Import Dependency Forecast</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {memo.paragraphs.importDependency}
          </p>
        </div>
      </div>
      {/* Recommendations */}
      {memo.recommendations.length > 0 && (
        <>
          <Separator className="my-6" />
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="mb-2">Policy Recommendations:</p>
              <ul className="space-y-1">
                {memo.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm">• {rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </>
      )}
    </Card>
  );
}
