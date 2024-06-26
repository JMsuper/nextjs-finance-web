export interface StockPriceInfo {
  closingPrice: number;
  difference: number;
  fluctuationRate: number;
  openingPrice: number;
  currentPrice: number;
}

export interface StockInfo {
  searchTime: string;
  name: string;
  stockCd: string;
  corpCd: string;
  market: string;
  stockPriceInfo: StockPriceInfo;
}

export interface SaveStockInfo {
  saveCorpInfoId: number;
  searchTime: string;
  name: string;
  stockCd: string;
  corpCd: string;
  market: string;
  expectedRate: number;
  targetRate: number;
  targetPrice: number;
  bps: number;
  afterTenYearsAverageROE: number;
  stockPriceInfo: StockPriceInfo;
  reportList: DisclosureReport[];
  memoList: IMemo[];
}

export interface DisclosureReport {
  corpName: string;
  reportNm: string;
  rceptNo: string;
  flrNm: string;
  rceptDt: string;
  rm: string;
}

export interface IMemo {
  memoId: number;
  content: string;
  createdAt: Date;
}
