export interface StateData {
  name: string;
  code: string;
  perCapitaIncome: number; // in INR per month
  palmOilConsumption: number; // kg per capita per year
  population: number; // in millions
}

export const indianStates: StateData[] = [
  { name: 'Maharashtra', code: 'MH', perCapitaIncome: 18500, palmOilConsumption: 12.5, population: 124 },
  { name: 'Uttar Pradesh', code: 'UP', perCapitaIncome: 9800, palmOilConsumption: 10.2, population: 231 },
  { name: 'Tamil Nadu', code: 'TN', perCapitaIncome: 16200, palmOilConsumption: 14.8, population: 77 },
  { name: 'Karnataka', code: 'KA', perCapitaIncome: 15800, palmOilConsumption: 13.2, population: 68 },
  { name: 'West Bengal', code: 'WB', perCapitaIncome: 11500, palmOilConsumption: 15.6, population: 100 },
  { name: 'Gujarat', code: 'GJ', perCapitaIncome: 17200, palmOilConsumption: 11.8, population: 70 },
  { name: 'Rajasthan', code: 'RJ', perCapitaIncome: 10500, palmOilConsumption: 9.5, population: 81 },
  { name: 'Andhra Pradesh', code: 'AP', perCapitaIncome: 13800, palmOilConsumption: 13.9, population: 54 },
  { name: 'Telangana', code: 'TG', perCapitaIncome: 16500, palmOilConsumption: 12.8, population: 39 },
  { name: 'Kerala', code: 'KL', perCapitaIncome: 15900, palmOilConsumption: 16.2, population: 35 },
  { name: 'Bihar', code: 'BR', perCapitaIncome: 7200, palmOilConsumption: 8.5, population: 128 },
  { name: 'Madhya Pradesh', code: 'MP', perCapitaIncome: 10200, palmOilConsumption: 9.8, population: 85 },
  { name: 'Punjab', code: 'PB', perCapitaIncome: 14800, palmOilConsumption: 11.5, population: 30 },
  { name: 'Haryana', code: 'HR', perCapitaIncome: 19200, palmOilConsumption: 10.8, population: 29 },
  { name: 'Odisha', code: 'OR', perCapitaIncome: 9500, palmOilConsumption: 10.5, population: 47 },
];

export function calculateAffordabilityImpact(
  state: StateData,
  priceIncrease: number
): number {
  // Calculate percentage of income spent on edible oil
  const annualOilExpenditure = state.palmOilConsumption * 120; // Assuming base price of 120 INR/kg
  const annualIncome = state.perCapitaIncome * 12;
  const basePercentage = (annualOilExpenditure / annualIncome) * 100;
  
  // Calculate impact score (0-100, higher = worse impact)
  const newExpenditure = state.palmOilConsumption * 120 * (1 + priceIncrease / 100);
  const newPercentage = (newExpenditure / annualIncome) * 100;
  const impactScore = Math.min(100, ((newPercentage - basePercentage) / basePercentage) * 100);
  
  return impactScore;
}
