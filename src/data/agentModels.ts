export interface AgentBehavior {
  agentType: string;
  metric: string;
  baseline: number;
  newValue: number;
  change: number;
  x: number;
  y: number;
}

export function calculateAgentBehavior(
  tariff: number,
  globalPrice: number,
  yieldGap: number
): AgentBehavior[] {
  // Farmer Agent - Investment behavior
  const farmerInvestmentBaseline = 50;
  const farmerInvestmentNew = Math.min(100, 50 + (tariff * 2.5) + ((100 - yieldGap) * 0.3));
  
  // Trader Agent - Inventory holding
  const traderInventoryBaseline = 65;
  const traderInventoryNew = Math.max(20, 65 - (tariff * 1.5) + ((globalPrice - 1000) / 50));
  
  // Investor Agent - Domestic sector allocation
  const investorAllocationBaseline = 40;
  const investorAllocationNew = Math.min(90, 40 + (tariff * 2) + ((100 - yieldGap) * 0.4));
  
  // Consumer Agent - Consumption reduction
  const consumerConsumptionBaseline = 100;
  const priceImpact = (tariff * 0.8) + ((globalPrice - 1000) / 20);
  const consumerConsumptionNew = Math.max(75, 100 - (priceImpact * 0.5));
  
  // Importer Agent - Import volume
  const importerVolumeBaseline = 70;
  const importerVolumeNew = Math.max(30, 70 - (tariff * 1.2) + (yieldGap * 0.3));
  
  return [
    {
      agentType: 'Farmer',
      metric: 'Investment in Oilseed Production',
      baseline: farmerInvestmentBaseline,
      newValue: farmerInvestmentNew,
      change: farmerInvestmentNew - farmerInvestmentBaseline,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    },
    {
      agentType: 'Trader',
      metric: 'Import Inventory Holdings',
      baseline: traderInventoryBaseline,
      newValue: traderInventoryNew,
      change: traderInventoryNew - traderInventoryBaseline,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    },
    {
      agentType: 'Investor',
      metric: 'Domestic Sector Allocation',
      baseline: investorAllocationBaseline,
      newValue: investorAllocationNew,
      change: investorAllocationNew - investorAllocationBaseline,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    },
    {
      agentType: 'Consumer',
      metric: 'Consumption Level',
      baseline: consumerConsumptionBaseline,
      newValue: consumerConsumptionNew,
      change: consumerConsumptionNew - consumerConsumptionBaseline,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    },
    {
      agentType: 'Importer',
      metric: 'Import Volume Intent',
      baseline: importerVolumeBaseline,
      newValue: importerVolumeNew,
      change: importerVolumeNew - importerVolumeBaseline,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    }
  ];
}
