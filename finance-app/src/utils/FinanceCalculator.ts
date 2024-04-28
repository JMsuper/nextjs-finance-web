// 10년후 예상 BPS = BPS * (1 + 3년 평균 ROE) ^ 10
export const calculateFutureValue = (
  bps: number,
  threeYearAverageROE: number,
) => {
  return Math.round(bps * (1 + threeYearAverageROE) ** 10);
};

// 기대수익률 = (10년후 예상 BPS / 시가) ^ (1 / 10) - 1
/**
 * 소수점 둘째자리까지 반올림하여 기대수익률을 계산.
 */
export const calculateExpectedRate = (
  tenYearFutureValue: number,
  openingPrice: number,
) => {
  let expectedRate = (tenYearFutureValue / openingPrice) ** (1 / 10) - 1;
  return Math.round(expectedRate * 10000) / 100;
};

// 목표주가 = 10년후 예상 BPS / (기대수익률 + 1) ^ 10
/**
 * 소수부 반올림하여 목표주가 계산.
 */
export const calculateTargetPrice = (
  targetRate: number,
  tenYearFutureValue: number,
) => {
  let targetPrice = tenYearFutureValue / (targetRate + 1) ** 10;
  return Math.round(targetPrice);
};
