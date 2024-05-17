interface ICreateTargetPriceAlarm {
  saveCorpInfoId: number;
  buyOrSell: string;
  targetPrice: number;
  infoIndexList: number[];
}

interface ICreatePriceAlarm {
  saveCorpInfoId: number;
  weekDayList: number[];
  time: string;
  infoIndexList: number[];
}
