export interface FinanceInfo {
    year: number;
    fsDiv: string;
    totalAsset: number;
    totalLiabilities: number;
    totalCapital: number;
    netIncome: number;
    roe: number;
}

export interface StockFinanceInfo {
    stockName: string
    stockCd: string;
    shares: number;
    bps: number;
    threeYearROEAvg: number;
    tenYearFutureValue: number;
    openingPrice: number;
    expectedReturn: number;
    isPropriate: boolean;
    financeInfoList: FinanceInfo[];
}