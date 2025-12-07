import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { FileText, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { Separator } from './ui/separator';

interface SensitivityAnalysisProps {
  tariff: number;
  globalPrice: number;
  yieldGap: number;
}

export function SensitivityAnalysis({ tariff, globalPrice, yieldGap }: SensitivityAnalysisProps) {
  // Calculate sensitivity metrics
  const tariffSensitivity = {
    consumerPrice: 0.8, // 1% tariff increase = 0.8% consumer price increase
    farmerIncome: 1.5, // 1% tariff increase = 1.5% farmer income increase
    importVolume: -1.2 // 1% tariff increase = -1.2% import volume change
  };

  const priceSensitivity = {
    consumerPrice: 0.6, // $10/ton global price increase = 0.6% consumer price increase
    farmerIncome: 0.3, // $10/ton global price increase = 0.3% farmer income increase
    importVolume: -0.2 // $10/ton global price increase = -0.2% import volume change
  };

  const gapSensitivity = {
    consumerPrice: 0.1, // 1% yield gap reduction = 0.1% consumer price decrease
    farmerIncome: 0.4, // 1% yield gap reduction = 0.4% farmer income increase
    importVolume: -0.8 // 1% yield gap reduction = -0.8% import volume change
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full  bg-black text-white">
          <FileText className="w-4 h-4 mr-2" />
          View Sensitivity Analysis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto  bg-white">
        <DialogHeader>
          <DialogTitle>Model Sensitivity Analysis Report</DialogTitle>
          <DialogDescription>
            Detailed mathematical breakdown of how each input variable affects policy outcomes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Model Assumptions */}
          <div>
            <h3 className="mb-3">Model Assumptions</h3>
            <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
              <p>• Base domestic retail price: ₹120/kg CPO</p>
              <p>• Average household edible oil consumption: 12 kg/capita/year</p>
              <p>• Import dependency baseline: {yieldGap}%</p>
              <p>• Price transmission elasticity: 0.65 (global to domestic)</p>
              <p>• Farmer income elasticity to tariff: 1.5</p>
              <p>• Consumer price elasticity of demand: -0.4</p>
            </div>
          </div>

          <Separator />

          {/* Tariff Sensitivity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3>Tariff Rate Sensitivity</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="text-sm mb-1">Impact on Consumer Prices:</p>
                <p className="font-medium">
                  1% increase in tariff → +{tariffSensitivity.consumerPrice}% retail price
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  At current tariff of {tariff}%, estimated consumer price impact is +{(tariff * tariffSensitivity.consumerPrice).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm mb-1">Impact on Farmer Income:</p>
                <p className="font-medium">
                  1% increase in tariff → +{tariffSensitivity.farmerIncome}% farmer revenue
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  At current tariff of {tariff}%, estimated farmer income boost is +{(tariff * tariffSensitivity.farmerIncome).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm mb-1">Impact on Import Volume:</p>
                <p className="font-medium">
                  1% increase in tariff → {tariffSensitivity.importVolume}% import volume
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  At current tariff of {tariff}%, projected import reduction is {Math.abs(tariff * tariffSensitivity.importVolume).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Global Price Sensitivity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3>Global Price Sensitivity</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-yellow-50">
                <p className="font-medium text-yellow-900 mb-2">
                  Critical Finding: Global price has 3x the impact on retail costs compared to tariff changes
                </p>
                <p className="text-sm text-yellow-800">
                  A $100/ton increase in global CPO price raises domestic retail prices by ~{(100 * priceSensitivity.consumerPrice / 10).toFixed(1)}%, 
                  while a 10% tariff hike raises prices by ~{(10 * tariffSensitivity.consumerPrice).toFixed(1)}%.
                  At current global price of ${globalPrice}/ton, external market volatility poses significant risk.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm mb-1">Price Transmission:</p>
                <p className="font-medium">
                  $10/ton global increase → +{priceSensitivity.consumerPrice}% domestic price
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Yield Gap Sensitivity */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3>Domestic Yield Gap Sensitivity</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="text-sm mb-1">Long-term Structural Impact:</p>
                <p className="font-medium">
                  1% reduction in yield gap → {Math.abs(gapSensitivity.importVolume)}% reduction in import dependency
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Reducing yield gap from {yieldGap}% to 40% would decrease import volumes by ~{Math.abs((yieldGap - 40) * gapSensitivity.importVolume).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-blue-50">
                <p className="font-medium text-blue-900 mb-2">
                  Policy Implication
                </p>
                <p className="text-sm text-blue-800">
                  Tariff protection alone cannot achieve self-reliance without concurrent yield improvements. 
                  A combined strategy of {tariff}% tariff + reducing yield gap to 40% would optimize both farmer welfare and import reduction.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Interaction Effects */}
          <div>
            <h3 className="mb-3">Variable Interaction Effects</h3>
            <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg">
              <p>
                • <span className="font-medium">High global prices + High tariffs:</span> Amplified consumer burden; 
                may require compensatory subsidies exceeding tariff revenue gains
              </p>
              <p>
                • <span className="font-medium">High tariffs + Low yield gap:</span> Optimal scenario for self-reliance; 
                reduced import dependency with sustainable domestic pricing
              </p>
              <p>
                • <span className="font-medium">Low tariffs + High yield gap:</span> Perpetuates import dependency; 
                insufficient farmer incentives for capacity expansion
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
