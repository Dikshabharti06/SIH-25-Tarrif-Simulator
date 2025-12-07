import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Users, TrendingUp, DollarSign } from 'lucide-react';

interface TradeOffScorecardProps {
  consumerWelfare: number;
  farmerUpliftment: number;
  fiscalStability: number;
}

export function TradeOffScorecard({
  consumerWelfare,
  farmerUpliftment,
  fiscalStability
}: TradeOffScorecardProps) {
  const overallScore = Math.round(
    (consumerWelfare + farmerUpliftment + fiscalStability) / 3
  );

  const getScoreColor = (score: number) => {
    if (score >= 70)
      return {
        text: 'text-green-700',
        bar: 'bg-green-600'
      };
    if (score >= 50)
      return {
        text: 'text-yellow-700',
        bar: 'bg-yellow-500'
      };
    return {
      text: 'text-red-700',
      bar: 'bg-red-500'
    };
  };

  const overallColors = getScoreColor(overallScore);

  return (
    <Card className="p-6 border border-green-300 shadow-xl rounded-xl bg-linear-to-br from-green-50 via-white to-emerald-50">
      <h3 className="text-lg font-semibold text-green-900 mb-2">
        📊 Policy Trade-Off Scorecard
      </h3>

      <p className="text-sm text-gray-700 mb-6">
        Holistic performance measure across consumer, farmer and fiscal interests.
      </p>

      {/* Overall Score */}
      <div className="bg-white border border-green-300 p-4 rounded-xl shadow-sm mb-6">
        <p className="text-xs text-gray-600 mb-1">Overall Policy Score</p>
        <div className="flex items-end gap-1">
          <span className={`text-4xl font-extrabold tracking-tight ${overallColors.text}`}>
            {overallScore}
          </span>
          <span className="text-gray-500 font-medium">/100</span>
        </div>

        <Progress
          value={overallScore}
          className="h-3 mt-3 bg-gray-200"
          indicatorClassName={`${overallColors.bar}`}
        />
      </div>

      {/* Individual Scores */}
      <div className="space-y-5">
        {/* Consumers */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-700" />
            <span className="text-sm font-medium">Consumer Welfare</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
              {consumerWelfare}/100
            </span>
          </div>
          <Progress
            value={consumerWelfare}
            className="h-2"
            indicatorClassName="bg-green-600"
          />
        </div>

        {/* Farmers */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-medium">Farmer Upliftment</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
              {farmerUpliftment}/100
            </span>
          </div>
          <Progress
            value={farmerUpliftment}
            className="h-2"
            indicatorClassName="bg-emerald-600"
          />
        </div>

        {/* Finance */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-orange-700" />
            <span className="text-sm font-medium">Fiscal Stability</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-semibold">
              {fiscalStability}/100
            </span>
          </div>
          <Progress
            value={fiscalStability}
            className="h-2"
            indicatorClassName="bg-orange-600"
          />
        </div>
      </div>
    </Card>
  );
}
