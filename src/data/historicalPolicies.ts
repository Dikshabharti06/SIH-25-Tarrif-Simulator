export interface HistoricalPolicy {
  year: number;
  month: string;
  tariffRate: number;
  globalPrice: number;
  domesticPrice: number;
  farmerIncome: number; // indexed to 100
  description: string;
}

export const historicalPolicies: HistoricalPolicy[] = [
  {
    year: 2019,
    month: 'Jan',
    tariffRate: 7.5,
    globalPrice: 580,
    domesticPrice: 68,
    farmerIncome: 85,
    description: 'Pre-pandemic baseline'
  },
  {
    year: 2020,
    month: 'Jul',
    tariffRate: 5.0,
    globalPrice: 720,
    domesticPrice: 78,
    farmerIncome: 82,
    description: 'COVID-19 tariff reduction'
  },
  {
    year: 2021,
    month: 'Jan',
    tariffRate: 2.5,
    globalPrice: 1050,
    domesticPrice: 110,
    farmerIncome: 78,
    description: 'Major duty cut to control inflation'
  },
  {
    year: 2021,
    month: 'Sep',
    tariffRate: 2.5,
    globalPrice: 1180,
    domesticPrice: 125,
    farmerIncome: 75,
    description: 'Global price surge'
  },
  {
    year: 2022,
    month: 'Mar',
    tariffRate: 5.5,
    globalPrice: 1420,
    domesticPrice: 152,
    farmerIncome: 88,
    description: 'Ukraine crisis impact'
  },
  {
    year: 2023,
    month: 'Jan',
    tariffRate: 8.0,
    globalPrice: 980,
    domesticPrice: 115,
    farmerIncome: 95,
    description: 'Tariff hike for farmer support'
  },
  {
    year: 2023,
    month: 'Sep',
    tariffRate: 12.5,
    globalPrice: 920,
    domesticPrice: 118,
    farmerIncome: 108,
    description: 'NMEO-OP alignment policy'
  },
  {
    year: 2024,
    month: 'Jun',
    tariffRate: 10.0,
    globalPrice: 1050,
    domesticPrice: 125,
    farmerIncome: 102,
    description: 'Balanced approach'
  },
  {
    year: 2025,
    month: 'Jan',
    tariffRate: 10.0,
    globalPrice: 1180,
    domesticPrice: 138,
    farmerIncome: 105,
    description: 'Current baseline'
  }
];
