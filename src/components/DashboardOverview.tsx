import { Card } from './ui/card';
import { TrendingUp, TrendingDown, AlertCircle, Users, Wheat, DollarSign, Globe } from 'lucide-react';

interface DashboardOverviewProps {
  tariff: number;
  globalPrice: number;
  yieldGap: number;
  volatilityIndex: number;
}

export function DashboardOverview({ tariff, globalPrice, yieldGap, volatilityIndex }: DashboardOverviewProps) {
  // Calculate key metrics
  const domesticPriceIncrease = ((tariff * 0.8) + ((globalPrice - 1000) / 20)).toFixed(1);
  const farmerIncomeIncrease = (tariff * 1.5).toFixed(1);
  const importReduction = Math.min(15, (tariff / 2) + (100 - yieldGap) / 10).toFixed(1);
  const importBill = (globalPrice * 13 * (yieldGap / 100) / 1000).toFixed(2);
  
  const consumerScore = Math.max(0, 100 - parseFloat(domesticPriceIncrease) * 2);
  const farmerScore = Math.min(100, 50 + parseFloat(farmerIncomeIncrease));
  const overallRisk = volatilityIndex > 60 ? 'High' : volatilityIndex > 30 ? 'Moderate' : 'Low';

  return (
    <Card className="p-6 border-2 border-gray-300 shadow bg-gray-100">
      <h3 className="mb-4 text-lg font-bold">Policy Impact Dashboard</h3>
      <p className="text-sm text-gray-600 mb-6">
        Real-time overview of key economic indicators based on your selected parameters
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Consumer Impact */}
        <div className="p-3 rounded-lg bg-linear-to-br from-red-50 to-orange-50 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-red-600" />
            <p className="text-xs text-red-900 font-medium">Consumer Impact</p>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-red-700">+{domesticPriceIncrease}%</p>
            <TrendingUp className="w-4 h-4 text-red-600 mb-1" />
          </div>
          <p className="text-xs text-red-600 mt-1">Retail price increase</p>
        </div>

        {/* Farmer Income */}
        <div className="p-3 rounded-lg bg-linear-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Wheat className="w-4 h-4 text-green-600" />
            <p className="text-xs text-green-900 font-medium">Farmer Welfare</p>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-green-700">+{farmerIncomeIncrease}%</p>
            <TrendingUp className="w-4 h-4 text-green-600 mb-1" />
          </div>
          <p className="text-xs text-green-600 mt-1">Revenue boost</p>
        </div>

        {/* Import Reduction */}
        <div className="p-3 rounded-lg bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <p className="text-xs text-blue-900 font-medium">Import Dependency</p>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-blue-700">-{importReduction}%</p>
            <TrendingDown className="w-4 h-4 text-blue-600 mb-1" />
          </div>
          <p className="text-xs text-blue-600 mt-1">Projected reduction</p>
        </div>

        {/* Annual Import Bill */}
        <div className="p-3 rounded-lg bg-linear-to-br from-purple-50 to-violet-50 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-purple-600" />
            <p className="text-xs text-purple-900 font-medium">Import Bill</p>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-2xl font-bold text-purple-700">${importBill}B</p>
          </div>
          <p className="text-xs text-purple-600 mt-1">Annual forex outflow</p>
        </div>
      </div>

      {/* Risk Indicator */}
      <div className={`mt-4 p-3 rounded-lg flex items-start gap-2 ${
        overallRisk === 'High' ? 'bg-red-50 border border-red-200' :
        overallRisk === 'Moderate' ? 'bg-yellow-50 border border-yellow-200' :
        'bg-green-50 border border-green-200'
      }`}>
        <AlertCircle className={`w-4 h-4 mt-0.5 ${
          overallRisk === 'High' ? 'text-red-600' :
          overallRisk === 'Moderate' ? 'text-yellow-600' :
          'text-green-600'
        }`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${
            overallRisk === 'High' ? 'text-red-900' :
            overallRisk === 'Moderate' ? 'text-yellow-900' :
            'text-green-900'
          }`}>
            Overall Risk Level: {overallRisk}
          </p>
          <p className={`text-xs mt-1 ${
            overallRisk === 'High' ? 'text-red-700' :
            overallRisk === 'Moderate' ? 'text-yellow-700' :
            'text-green-700'
          }`}>
            {overallRisk === 'High' 
              ? 'High market volatility and consumer burden. Consider targeted subsidies and phased implementation.'
              : overallRisk === 'Moderate'
              ? 'Balanced trade-offs. Monitor consumer price index and farmer response closely.'
              : 'Low risk scenario. Policy parameters are within safe operating ranges.'}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-gray-600">Consumer Score</p>
          <p className="font-bold">{Math.round(consumerScore)}/100</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-gray-600">Farmer Score</p>
          <p className="font-bold">{Math.round(farmerScore)}/100</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <p className="text-gray-600">Volatility</p>
          <p className="font-bold">{volatilityIndex}/100</p>
        </div>
      </div>
    </Card>
  );
}
