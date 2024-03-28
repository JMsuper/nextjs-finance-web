export interface FinanceInfo {
    year: number;
    fsDiv: string;
    totalAsset: number;
    totalLiabilities: number;
    totalCapital: number;
    netIncome: number;
}

export interface StockFinanceInfo {
    stockName: string
    stockCd: string;
    shares: number;
    bps: number;
    financeInfoList: FinanceInfo[];
}