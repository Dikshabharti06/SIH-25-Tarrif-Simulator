import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Save, FolderOpen, Trash2, Download } from 'lucide-react';
import { Badge } from './ui/badge';
import PolicyDashboard from './Dashboard';

interface Scenario {
  id: string;
  name: string;
  tariff: number;
  globalPrice: number;
  yieldGap: number;
  volatilityIndex: number;
  timestamp: string;
}

interface ScenarioManagerProps {
  currentScenario: {
    tariff: number;
    globalPrice: number;
    yieldGap: number;
    volatilityIndex: number;
  };
  onLoadScenario: (scenario: Scenario) => void;
}

export function ScenarioManager({ currentScenario, onLoadScenario }: ScenarioManagerProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: 'Conservative Approach',
      tariff: 8,
      globalPrice: 1050,
      yieldGap: 58,
      volatilityIndex: 35,
      timestamp: '2025-01-15'
    },
    {
      id: '2',
      name: 'Aggressive Protection',
      tariff: 18,
      globalPrice: 1180,
      yieldGap: 55,
      volatilityIndex: 65,
      timestamp: '2025-01-16'
    }
  ]);
  const [scenarioName, setScenarioName] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleSave = () => {
    if (!scenarioName.trim()) return;

    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: scenarioName,
      ...currentScenario,
      timestamp: new Date().toISOString().split('T')[0]
    };

    setScenarios([...scenarios, newScenario]);
    setScenarioName('');
    setSaveDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const handleExport = (scenario: Scenario) => {
    const data = JSON.stringify(scenario, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scenario.name.replace(/\s/g, '_')}_scenario.json`;
    a.click();
  };

  return (
    <>
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3>Saved Scenarios</h3>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Current
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Scenario</DialogTitle>
              <DialogDescription>
                Save your current parameter configuration for later comparison
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="scenarioName">Scenario Name</Label>
                <Input
                  id="scenarioName"
                  placeholder="e.g., Option 1: Moderate Hike"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg space-y-1 text-sm">
                <p><span className="font-medium">Tariff:</span> {currentScenario.tariff}%</p>
                <p><span className="font-medium">Global Price:</span> ${currentScenario.globalPrice}/T</p>
                <p><span className="font-medium">Yield Gap:</span> {currentScenario.yieldGap}%</p>
                <p><span className="font-medium">Volatility Index:</span> {currentScenario.volatilityIndex}</p>
              </div>
              <Button onClick={handleSave} className="w-full" disabled={!scenarioName.trim()}>
                Save Scenario
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Save and compare multiple policy scenarios for collaborative review
      </p>

      {scenarios.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderOpen className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No saved scenarios yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{scenario.name}</p>
                  <p className="text-xs text-gray-500">{scenario.timestamp}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleExport(scenario)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(scenario.id)}
                    className="h-8 w-8 p-0 text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">Tariff: {scenario.tariff}%</Badge>
                <Badge variant="outline">Price: ${scenario.globalPrice}</Badge>
                <Badge variant="outline">Gap: {scenario.yieldGap}%</Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onLoadScenario(scenario)}
                className="w-full"
              >
                Load Scenario
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
    <div>
      <PolicyDashboard/>
    </div>
    </>
  );
}
