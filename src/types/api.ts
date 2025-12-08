// src/types/api.ts

// Inputs sent to Backend
export interface SimulationInput {
  tariff_rate: number;
  global_cpo_price: number;
  yield_gap: number;
  volatility_index: number;
}

// Data for Graphs
export interface TimeSeriesPoint {
  year: number;
  price: number;
  income: number;
}

// Data for Top Cards
export interface KPICard {
  label: string;
  value: string;
  delta: number;
  is_positive: boolean;
}

// Data for Trade-off Scorecard
export interface TradeOffScore {
  welfare: number;
  upliftment: number;
  fiscal: number;
  overall: number;
}

// Full Response from Backend
export interface SimulationResponse {
  kpi_cards: KPICard[];
  trade_off_score: TradeOffScore;
  time_series_data: TimeSeriesPoint[];
  abm_scatter_data?: any[]; // For MarketActorMap
  ai_explanation?: string;  // For ExecutiveMemo
}