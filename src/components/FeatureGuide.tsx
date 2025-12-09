import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { HelpCircle, Lightbulb, BarChart3, Map, Target, Clock, Save } from 'lucide-react';
import { Separator } from './ui/separator';

export function FeatureGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="lg">
          <div className='p-2 mt-1.5 flex flex-row text-md text-gray-700 border border-green-400 bg-green-100 hover:text-green-800 rounded-lg shadow-xl cursor-pointer'>
          <HelpCircle className="w-10 h-10 mt-1 mr-1" />
           <span> Feature Guide</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Advanced Features Guide</DialogTitle>
          <DialogDescription>
            Learn about the advanced multi-dimensional predictive modeling features available in this platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Interactive Sliders */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <h3>Interactive Parameter Sliders</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Drag the sliders to instantly see how different tariff rates, global prices, and yield gaps affect policy outcomes. 
              The real-time impact graph updates immediately, showing the trade-offs between consumer welfare and farmer income.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-1">💡 Pro Tip:</p>
              <p className="text-blue-800">
                Watch how the volatility index changes your risk assessment. Higher volatility (60+) reveals scenarios 
                where external market shocks could overwhelm domestic policy measures.
              </p>
            </div>
          </div>

          <Separator />

          {/* ABM */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3>Agent-Based Modeling (ABM)</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Our ABM simulation shows how five key market actors respond to policy changes:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• <span className="font-medium">Farmers:</span> Investment in oilseed production capacity</li>
              <li>• <span className="font-medium">Traders:</span> Import inventory holdings and speculation</li>
              <li>• <span className="font-medium">Investors:</span> Capital allocation to domestic sector</li>
              <li>• <span className="font-medium">Consumers:</span> Consumption levels and substitution effects</li>
              <li>• <span className="font-medium">Importers:</span> Import volume intentions</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              Green indicators show positive behavioral shifts (increased activity), while red shows withdrawal or reduction.
            </p>
          </div>

          <Separator />

          {/* State Heatmap */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Map className="w-5 h-5 text-green-600" />
              <h3>State-Wise Affordability Heatmap</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              This feature analyzes consumer impact across all Indian states, factoring in:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Per capita income levels (lower income = higher impact)</li>
              <li>• Regional consumption patterns (kg per capita/year)</li>
              <li>• Population size (vulnerability scale)</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              States highlighted in orange/red require targeted PDS interventions or subsidies to prevent food security issues.
            </p>
          </div>

          <Separator />

          {/* NMEO-OP Calculator */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-purple-600" />
              <h3>NMEO-OP Target Calculator</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              This reverse-engineering tool helps policymakers determine the exact policy mix needed to achieve self-reliance goals:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Set your target year (e.g., 2030)</li>
              <li>• Define desired self-reliance percentage (e.g., 70%)</li>
              <li>• Get actionable recommendations: required tariff rate, annual subsidy, yield improvement targets, and total infrastructure investment</li>
            </ul>
            <div className="bg-purple-50 p-3 rounded-lg text-sm mt-2">
              <p className="font-medium text-purple-900 mb-1">Example Output:</p>
              <p className="text-purple-800">
                To reach 70% self-reliance by 2030, maintain 15% tariff + invest $450M annually in R&D + 
                reduce yield gap by 3.6% per year.
              </p>
            </div>
          </div>

          <Separator />

          {/* Historical Comparison */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3>Historical Policy Comparison</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Learn from the past! This chart overlays your current scenario with historical tariff decisions from 2019-2025, 
              showing actual outcomes in terms of:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Domestic retail prices (₹/kg)</li>
              <li>• Farmer income index (base 100)</li>
              <li>• Import volumes</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              Key lessons highlighted: 2021 duty cut during high global prices led to farmer income collapse; 
              2023 balanced approach during stable prices yielded optimal results.
            </p>
          </div>

          <Separator />

          {/* Scenario Management */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Save className="w-5 h-5 text-orange-600" />
              <h3>Scenario Save & Share</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Save multiple policy scenarios (e.g., "Option 1: Conservative", "Option 2: Aggressive") for collaborative review:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Quick comparison between different parameter sets</li>
              <li>• Export scenarios as JSON files for documentation</li>
              <li>• Load saved scenarios to continue analysis</li>
            </ul>
          </div>

          <Separator />

          {/* Sensitivity Analysis */}
          <div>
            <div className="bg-linear-to-r from-indigo-50 to-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">🔬 Explainable AI (XAI) - Sensitivity Analysis</h4>
              <p className="text-sm text-gray-700 mb-2">
                Click "View Sensitivity Analysis" to access a detailed mathematical breakdown showing:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• How each 1% change in tariff affects consumer prices, farmer income, and import volumes</li>
                <li>• Why global prices have 3x the impact of tariffs on retail costs</li>
                <li>• Interaction effects between variables (e.g., high tariff + high global price = amplified burden)</li>
                <li>• Model assumptions and elasticity coefficients</li>
              </ul>
              <p className="text-sm text-gray-700 mt-2 font-medium">
                This transparency proves mathematical rigor and helps policymakers understand the "why" behind predictions.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
