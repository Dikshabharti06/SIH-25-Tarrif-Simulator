import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Target, Calculator } from 'lucide-react';
import { Progress } from './ui/progress';

interface NMEOPTargetAnalysisProps {
  currentYieldGap: number;
}

export function NMEOPTargetAnalysis({ currentYieldGap }: NMEOPTargetAnalysisProps) {
  const [targetYear, setTargetYear] = useState('2030');
  const [targetSelfReliance, setTargetSelfReliance] = useState('70');
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState({
    requiredTariff: 0,
    requiredSubsidy: 0,
    annualYieldImprovement: 0,
    investmentNeeded: 0
  });

  const handleCalculate = () => {
    const yearsToTarget = parseInt(targetYear) - 2025;
    const targetGap = 100 - parseInt(targetSelfReliance);
    const gapReduction = currentYieldGap - targetGap;
    
    const annualYieldImprovement = gapReduction / yearsToTarget;
    const requiredTariff = Math.max(8, Math.min(20, 10 + (annualYieldImprovement * 0.5)));
    const requiredSubsidy = annualYieldImprovement * 250; // Million USD per year
    const investmentNeeded = yearsToTarget * annualYieldImprovement * 180; // Million USD total
    
    setResults({
      requiredTariff: Math.round(requiredTariff * 10) / 10,
      requiredSubsidy: Math.round(requiredSubsidy),
      annualYieldImprovement: Math.round(annualYieldImprovement * 10) / 10,
      investmentNeeded: Math.round(investmentNeeded)
    });
    setCalculated(true);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-indigo-600" />
        <h3>NMEO-OP Target Calculator</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Reverse-engineer the policy mix needed to achieve self-reliance goals
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="targetYear">Target Year</Label>
          <Input
            id="targetYear"
            type="number"
            value={targetYear}
            onChange={(e) => setTargetYear(e.target.value)}
            className="mt-2"
            min="2026"
            max="2035"
          />
        </div>

        <div>
          <Label htmlFor="targetSelfReliance">Target Self-Reliance (%)</Label>
          <Input
            id="targetSelfReliance"
            type="number"
            value={targetSelfReliance}
            onChange={(e) => setTargetSelfReliance(e.target.value)}
            className="mt-2"
            min="50"
            max="90"
          />
          <div className="mt-2">
            <Progress value={parseInt(targetSelfReliance)} className="h-2" />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Required Policy Mix
        </Button>
      </div>

      {calculated && (
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Required Policy Actions</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Tariff Rate</p>
              <p className="text-2xl font-bold text-indigo-600">{results.requiredTariff}%</p>
              <p className="text-xs text-gray-600 mt-1">Sustained average</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Annual Subsidy</p>
              <p className="text-2xl font-bold text-blue-600">${results.requiredSubsidy}M</p>
              <p className="text-xs text-gray-600 mt-1">Per year investment</p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Yield Improvement</p>
              <p className="text-2xl font-bold text-green-600">{results.annualYieldImprovement}%</p>
              <p className="text-xs text-gray-600 mt-1">Annual reduction needed</p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Investment</p>
              <p className="text-2xl font-bold text-purple-600">${results.investmentNeeded}M</p>
              <p className="text-xs text-gray-600 mt-1">Infrastructure & R&D</p>
            </div>
          </div>

          <div className="text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="font-medium text-yellow-900 mb-1">Implementation Roadmap</p>
            <ul className="text-yellow-800 space-y-1 text-xs">
              <li>• Maintain tariff at ~{results.requiredTariff}% for {parseInt(targetYear) - 2025} years</li>
              <li>• Invest ${results.requiredSubsidy}M annually in high-yield seed R&D</li>
              <li>• Expand irrigation coverage by {(results.annualYieldImprovement * 2).toFixed(1)}% annually</li>
              <li>• Target {targetSelfReliance}% self-reliance by {targetYear}</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}
