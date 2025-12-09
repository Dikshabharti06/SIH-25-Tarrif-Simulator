import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ExecutiveMemo } from './ExecutiveMemo';
import { generateMemo } from '../utils/memoGenerator';
import { MarketActorMap } from './MarketActorMap';
// import { StateAffordabilityHeatmap } from './StateAffordabilityHeatmap'; // Replaced by StateAnalysis
import { TradeOffScorecard } from './TradeOffScorecard';
import { SensitivityAnalysis } from './SensitivityAnalysis';
import { NMEOPTargetAnalysis } from './NMEOPTargetAnalysis';
import { HistoricalComparison } from './HistoricalComparison';
import { ScenarioManager } from './ScenarioManager';
import { RealTimeImpactGraph } from './RealTimeImpactGraph';
import { FeatureGuide } from './FeatureGuide';
import { QuickPresets } from './QuickPresets';
import { DashboardOverview } from './DashboardOverview';
import { WelcomeDialog } from './WelcomeDialog';
import { StateAnalysis } from './StateAnalysis'; // Ensure this is imported
import { calculateAgentBehavior } from '../data/agentModels';
import Header from './Header';
import GreenFooter from './footer/Footer';

interface PolicySimulatorProps {
  onBack: () => void;
  onLogout: () => void;
}

export function PolicySimulator({ onBack, onLogout }: PolicySimulatorProps) {
  const [tariff, setTariff] = useState(12);
  const [globalPrice, setGlobalPrice] = useState(1180);
  const [yieldGap, setYieldGap] = useState(58);
  const [volatilityIndex, setVolatilityIndex] = useState(50);
  const [memo, setMemo] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Temporary input states for text entry
  const [tariffInput, setTariffInput] = useState(tariff.toString());
  const [priceInput, setPriceInput] = useState(globalPrice.toString());
  const [gapInput, setGapInput] = useState(yieldGap.toString());
  const [volatilityInput, setVolatilityInput] = useState(volatilityIndex.toString());

  // Real-time calculations
  const [agents, setAgents] = useState<any[]>([]);
  const [scores, setScores] = useState({ consumer: 0, farmer: 0, fiscal: 0 });

  // Update real-time data when sliders change
  useEffect(() => {
    // Calculate projected impact
    const domesticPriceIncrease = (tariff * 0.8) + ((globalPrice - 1000) / 20);
    const farmerIncomeIncrease = tariff * 1.5;
    const importReduction = Math.min(15, (tariff / 2) + (100 - yieldGap) / 10);

    // Update agent behaviors
    setAgents(calculateAgentBehavior(tariff, globalPrice, yieldGap));

    // Calculate scores
    const consumerScore = Math.max(0, 100 - domesticPriceIncrease * 2);
    const farmerScore = Math.min(100, 50 + farmerIncomeIncrease);
    const fiscalScore = Math.min(100, 40 + importReduction * 3);
    setScores({
      consumer: Math.round(consumerScore),
      farmer: Math.round(farmerScore),
      fiscal: Math.round(fiscalScore)
    });
  }, [tariff, globalPrice, yieldGap]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedMemo = generateMemo(tariff, globalPrice, yieldGap);
    setMemo(generatedMemo);
    setIsGenerating(false);
  };

  const handleLoadScenario = (scenario: any) => {
    setTariff(scenario.tariff);
    setGlobalPrice(scenario.globalPrice);
    setYieldGap(scenario.yieldGap);
    setVolatilityIndex(scenario.volatilityIndex);
    setTariffInput(scenario.tariff.toString());
    setPriceInput(scenario.globalPrice.toString());
    setGapInput(scenario.yieldGap.toString());
    setVolatilityInput(scenario.volatilityIndex.toString());
  };

  const handleLoadPreset = (preset: any) => {
    setTariff(preset.tariff);
    setGlobalPrice(preset.globalPrice);
    setYieldGap(preset.yieldGap);
    setVolatilityIndex(preset.volatilityIndex);
    setTariffInput(preset.tariff.toString());
    setPriceInput(preset.globalPrice.toString());
    setGapInput(preset.yieldGap.toString());
    setVolatilityInput(preset.volatilityIndex.toString());
  };

  // Input handlers with validation
  const handleTariffInputChange = (value: string) => {
    setTariffInput(value);
  };

  const handleTariffInputBlur = () => {
    const val = parseFloat(tariffInput);
    if (!isNaN(val)) {
      const clamped = Math.max(0, Math.min(30, val));
      setTariff(clamped);
      setTariffInput(clamped.toString());
    } else {
      setTariffInput(tariff.toString());
    }
  };

  const handlePriceInputChange = (value: string) => {
    setPriceInput(value);
  };

  const handlePriceInputBlur = () => {
    const val = parseInt(priceInput);
    if (!isNaN(val)) {
      const clamped = Math.max(800, Math.min(1500, val));
      setGlobalPrice(clamped);
      setPriceInput(clamped.toString());
    } else {
      setPriceInput(globalPrice.toString());
    }
  };

  const handleGapInputChange = (value: string) => {
    setGapInput(value);
  };

  const handleGapInputBlur = () => {
    const val = parseInt(gapInput);
    if (!isNaN(val)) {
      const clamped = Math.max(30, Math.min(70, val));
      setYieldGap(clamped);
      setGapInput(clamped.toString());
    } else {
      setGapInput(yieldGap.toString());
    }
  };

  const handleVolatilityInputChange = (value: string) => {
    setVolatilityInput(value);
  };

  const handleVolatilityInputBlur = () => {
    const val = parseInt(volatilityInput);
    if (!isNaN(val)) {
      const clamped = Math.max(0, Math.min(100, val));
      setVolatilityIndex(clamped);
      setVolatilityInput(clamped.toString());
    } else {
      setVolatilityInput(volatilityIndex.toString());
    }
  };
  

  return (
    <>
      <Header onLogout={onLogout} userName="Admin User" />
      
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        <WelcomeDialog />
        
        {/* Header Section */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 rounded-lg text-gray-700 outline-1 bg-gray-200 hover:text-gray-800 hover:bg-green-100 transition-all duration-200 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className='font-bold text-3xl'>CPO Policy Simulator</h1>
              <p className="text-gray-600 text-lg">
                Advanced Multi-Dimensional Predictive Modelling for the optimization of tarrifs.
              </p>
            </div>
            <FeatureGuide />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Interactive Controls Panel */}
          <div className="lg:col-span-1 space-y-4">
            <QuickPresets onLoadPreset={handleLoadPreset} />

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <p className='text-lg font-bold'>Interactive Parameters</p>
                <p className="text-xs text-gray-500">Drag sliders or type values</p>
              </div>
              
              <div className="space-y-8">
                {/* Tariff Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>CPO Import Tariff</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={tariffInput}
                        onChange={(e) => handleTariffInputChange(e.target.value)}
                        onBlur={handleTariffInputBlur}
                        className="w-20 h-8 text-sm text-right"
                        min={0}
                        max={30}
                        step={0.5}
                      />
                      <span className="text-sm font-medium text-indigo-600">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[tariff]}
                    onValueChange={(value: [number]) => {
                      setTariff(value[0]);
                      setTariffInput(value[0].toString());
                    }}
                    min={0}
                    max={30}
                    step={0.5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Global Price Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Global CPO Price</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">$</span>
                      <Input
                        type="number"
                        value={priceInput}
                        onChange={(e) => handlePriceInputChange(e.target.value)}
                        onBlur={handlePriceInputBlur}
                        className="w-24 h-8 text-sm text-right"
                        min={800}
                        max={1500}
                        step={10}
                      />
                      <span className="text-sm font-medium text-green-600">/T</span>
                    </div>
                  </div>
                  <Slider
                    value={[globalPrice]}
                    onValueChange={(value: [number]) => {
                      setGlobalPrice(value[0]);
                      setPriceInput(value[0].toString());
                    }}
                    min={800}
                    max={1500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$800</span>
                    <span>$1500</span>
                  </div>
                </div>

                {/* Yield Gap Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Domestic Yield Gap</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={gapInput}
                        onChange={(e) => handleGapInputChange(e.target.value)}
                        onBlur={handleGapInputBlur}
                        className="w-20 h-8 text-sm text-right"
                        min={30}
                        max={70}
                        step={1}
                      />
                      <span className="text-sm font-medium text-blue-600">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[yieldGap]}
                    onValueChange={(value: [number]) => {
                      setYieldGap(value[0]);
                      setGapInput(value[0].toString());
                    }}
                    min={30}
                    max={70}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>30%</span>
                    <span>70%</span>
                  </div>
                </div>

                {/* Volatility Index */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Market Volatility Index</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={volatilityInput}
                        onChange={(e) => handleVolatilityInputChange(e.target.value)}
                        onBlur={handleVolatilityInputBlur}
                        className="w-20 h-8 text-sm text-right"
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                  </div>
                  <Slider
                    value={[volatilityIndex]}
                    onValueChange={(value: [number]) => {
                      setVolatilityIndex(value[0]);
                      setVolatilityInput(value[0].toString());
                    }}
                    min={0}
                    max={100}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Stable</span>
                    <span>Volatile</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {volatilityIndex < 30 ? 'Low market instability' :
                     volatilityIndex < 60 ? 'Moderate price fluctuations' :
                     'High uncertainty - stress test scenario'}
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                className="w-full mt-8"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                    Generating Analysis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 bg-black text-white" />
                    Generate Executive Memo
                  </>
                )}
              </Button>
            </Card>

            <RealTimeImpactGraph 
              tariff={tariff}
              globalPrice={globalPrice}
              yieldGap={yieldGap}
            />

            <TradeOffScorecard 
              consumerWelfare={scores.consumer}
              farmerUpliftment={scores.farmer}
              fiscalStability={scores.fiscal}
            />

            <SensitivityAnalysis 
              tariff={tariff}
              globalPrice={globalPrice}
              yieldGap={yieldGap}
            />
          </div>

          {/* Main Content Panel */}
          <div className="lg:col-span-2">
            <DashboardOverview 
              tariff={tariff}
              globalPrice={globalPrice}
              yieldGap={yieldGap}
              volatilityIndex={volatilityIndex}
            />

            <Tabs defaultValue="memo" className="w-full mt-6 ">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="memo">Memo</TabsTrigger>
                <TabsTrigger value="abm">ABM</TabsTrigger>
                <TabsTrigger value="heatmap">States</TabsTrigger>
                <TabsTrigger value="historical">History</TabsTrigger>
                <TabsTrigger value="nmeo">NMEO-OP</TabsTrigger>
              </TabsList>

              <TabsContent value="memo" className="mt-6">
                {memo ? (
                  <ExecutiveMemo memo={memo} />
                ) : (
                  <Card className="p-12 text-center bg-gray-50 border-dashed">
                    <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-gray-600 mb-2">No Analysis Yet</h3>
                    <p className="text-gray-500 text-sm">
                      Adjust the parameters and click "Generate Executive Memo" to see the comprehensive AI-powered policy forecast.
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="abm" className="mt-6">
                <MarketActorMap agents={agents} />
                <div className="mt-4 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-medium mb-2">Agent-Based Modeling Insights:</p>
                  <p>
                    This visualization shows how different market participants (farmers, traders, investors, consumers, importers) 
                    adjust their behavior in response to your policy parameters. Positive changes (green) indicate increased activity 
                    or investment, while negative changes (red) indicate reduction or withdrawal.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="heatmap" className="mt-6">
                {/* NEW STATE ANALYSIS COMPONENT HERE */}
                <StateAnalysis />
              </TabsContent>

              <TabsContent value="historical" className="mt-6">
                <HistoricalComparison 
                  currentTariff={tariff}
                  currentGlobalPrice={globalPrice}
                />
              </TabsContent>

              <TabsContent value="nmeo" className="mt-6">
                <NMEOPTargetAnalysis currentYieldGap={yieldGap} />
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <ScenarioManager 
                currentScenario={{ tariff, globalPrice, yieldGap, volatilityIndex }}
                onLoadScenario={handleLoadScenario}
              />
            </div>
          </div>
        </div>
      </div>
      <GreenFooter/>
    </>
  );
}