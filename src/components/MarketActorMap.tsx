import React from 'react';
import { Card } from './ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Wheat, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

const scenarios = [
  {
    title: "Inflation Crisis",
    condition: "Global Price > $1,250",
    icon: <TrendingDown className="text-green-600" />,
    borderColor: "border-green-200",
    bgColor: "bg-green-100",
    impacts: [
      { label: "Consumer", status: "Critical", color: "text-red-700", icon: <XCircle size={14}/> },
      { label: "Farmer", status: "Safe", color: "text-green-700", icon: <CheckCircle2 size={14}/> },
    ],
    decision: "Aggressive Tariff Cut",
    action: "Slash BCD to 0% - 5.5%",
    reason: "Cool retail inflation immediately. Sacrifice fiscal revenue to protect household budgets."
  },
  {
    title: "Stable Market",
    condition: "Price $900 - $1,100",
    icon: <Scale className="yellow-blue-600" />,
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
    impacts: [
      { label: "Consumer", status: "Stable", color: "text-blue-700", icon: <CheckCircle2 size={14}/> },
      { label: "Farmer", status: "Stable", color: "text-blue-700", icon: <CheckCircle2 size={14}/> },
    ],
    decision: "Revenue Max",
    action: "Set Standard Tariff (12.5%)",
    reason: "Goldilocks zone. Maximize government revenue for NMEO-OP funding without hurting stakeholders."
  },
  {
    title: "Harvest Peak",
    condition: "Seasonal Event",
    icon: <Wheat className="text-green-600" />,
    borderColor: "border-green-200",
    bgColor: "bg-green-100",
    impacts: [
      { label: "Supply", status: "Glut Risk", color: "text-yellow-700", icon: <AlertTriangle size={14}/> },
    ],
    decision: "Seasonal Barrier",
    action: "Temp Hike (+5% to +10%)",
    reason: "Discourage imports temporarily to force mills to procure domestic fresh fruit bunches first."
  }
];

export const ScenarioAnalysis: React.FC = () => {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-xl font-bold text-gray-800"> Agent Based Modelling </h2>
        <h2 className="text-md font-bold text-gray-600">Strategic Policy Implementations </h2>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {scenarios.map((scenario, index) => (
          <Card 
            key={index} 
            className={`p-5 border-l-4 shadow-sm hover:shadow-md transition-shadow ${scenario.borderColor} ${scenario.bgColor}`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{scenario.title}</h3>
                <span className="text-xs font-semibold px-2 py-1 bg-white/60 rounded border border-black/5 mt-1 inline-block">
                  {scenario.condition}
                </span>
              </div>
              <div className="p-2 bg-white rounded-full shadow-sm">
                {scenario.icon}
              </div>
            </div>

            {/* Impacts */}
            <div className="space-y-2 mb-4">
              {scenario.impacts.map((impact, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-white/50 p-1.5 rounded">
                  <span className="text-gray-600 font-medium">{impact.label}</span>
                  <div className={`flex items-center gap-1 font-bold ${impact.color}`}>
                    {impact.icon}
                    {impact.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Decision Box */}
            <div className="bg-white p-3 rounded-lg border border-black/5 shadow-sm">
              <p className="text-sm font-bold text-gray-800 mb-1">
                {scenario.decision}
              </p>
              <p className="text-xs font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded inline-block mb-2">
                {scenario.action}
              </p>
              <p className="text-[10px] text-gray-500 leading-tight">
                {scenario.reason}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};