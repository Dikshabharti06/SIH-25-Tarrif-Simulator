export function generateMemo(tariff: number, globalPrice: number, yieldGap: number) {
  // Calculate influences based on parameter values
  const tariffInfluence = Math.min(40, 20 + (tariff / 20) * 20);
  const priceInfluence = Math.min(45, 25 + ((globalPrice - 1000) / 500) * 20);
  const gapInfluence = 100 - tariffInfluence - priceInfluence;

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' = 'moderate';
  if (globalPrice > 1300 && tariff > 15) {
    riskLevel = 'high';
  } else if (globalPrice < 1100 && tariff < 10) {
    riskLevel = 'low';
  }

  // Calculate expected impacts
  const domesticPriceIncrease = ((tariff / 100) + (globalPrice - 1000) / 2000) * 100;
  const farmerRevenueIncrease = tariff * 1.5;
  const importReduction = Math.min(15, (tariff / 2) + (100 - yieldGap) / 10);

  // Generate consumer affordability paragraph
  const consumerAffordability = `Under the proposed ${tariff}% import tariff combined with the elevated global CPO price of $${globalPrice}/ton, domestic edible oil prices are projected to rise by approximately ${domesticPriceIncrease.toFixed(1)}% within the first quarter post-implementation. This increase will disproportionately affect low-income households, where cooking oil constitutes 6-8% of monthly expenditure. To mitigate immediate affordability shocks, the government may need to expand the Public Distribution System (PDS) coverage for edible oils or implement targeted subsidies for vulnerable segments, particularly in urban areas where price sensitivity is highest.`;

  // Generate farmer profitability paragraph
  const farmerProfitability = `The ${tariff}% tariff is expected to boost domestic oilseed farmer revenues by ${farmerRevenueIncrease.toFixed(1)}%, creating favorable margins for palm, soybean, and sunflower cultivation aligned with NMEO-OP objectives. However, with the domestic yield gap still at ${yieldGap}%, achieving self-reliance targets by 2030 remains challenging without concurrent investments in high-yield seed technology, irrigation infrastructure, and farmer training programs. Confidence among farmers will strengthen if the tariff remains stable for at least 3-5 crop cycles, providing predictable market conditions necessary for long-term agricultural planning and capital investment in oilseed production.`;

  // Generate import dependency paragraph
  const importDependency = `Despite the tariff's protective effect, India's import dependency is forecast to decline only moderately by ${importReduction.toFixed(1)} percentage points over the next 3-5 years, given the persistent ${yieldGap}% yield gap and limited arable land expansion potential. At the current global price of $${globalPrice}/ton, the annual import bill for edible oils will remain substantial at approximately $${(globalPrice * 13 * (yieldGap / 100)).toFixed(0)} million (assuming ~13 million tons import volume), representing a significant forex outflow. Long-term reduction in import dependency requires a multi-pronged strategy: sustaining the tariff to incentivize domestic production, accelerating R&D in high-yield cultivars, improving supply chain efficiency to reduce post-harvest losses, and potentially diversifying into alternative oil crops suited to India's agro-climatic zones.`;

  // Generate XAI summary
  const xaiSummary = `The global CPO price (${priceInfluence.toFixed(1)}% influence) is the primary driver of consumer affordability risk in this scenario, as it directly impacts domestic retail prices regardless of tariff adjustments. The tariff rate (${tariffInfluence.toFixed(1)}% influence) moderately affects both farmer incentives and consumer costs, creating a policy trade-off between producer welfare and consumer burden. The domestic yield gap (${gapInfluence.toFixed(1)}% influence) has a longer-term structural impact, determining the baseline import requirement and limiting the effectiveness of tariff-based self-reliance strategies without productivity improvements.`;

  // Generate recommendations
  const recommendations = [];
  
  if (globalPrice > 1200) {
    recommendations.push('Consider temporary consumer subsidies to offset high global price impacts');
  }
  
  if (tariff > 10) {
    recommendations.push('Monitor consumer price index closely; adjust PDS allocations if needed');
  }
  
  if (yieldGap > 50) {
    recommendations.push('Accelerate NMEO-OP implementation with focus on yield improvement programs');
    recommendations.push('Increase R&D funding for high-yield oilseed varieties suited to Indian conditions');
  }
  
  if (tariff < 8 && yieldGap > 55) {
    recommendations.push('Current tariff may be insufficient to meet self-reliance targets; consider gradual increase');
  }

  return {
    parameters: {
      tariff,
      globalPrice,
      yieldGap
    },
    paragraphs: {
      consumerAffordability,
      farmerProfitability,
      importDependency
    },
    xaiRationale: {
      tariffInfluence: Math.round(tariffInfluence),
      priceInfluence: Math.round(priceInfluence),
      gapInfluence: Math.round(gapInfluence),
      summary: xaiSummary
    },
    recommendations,
    riskLevel
  };
}
