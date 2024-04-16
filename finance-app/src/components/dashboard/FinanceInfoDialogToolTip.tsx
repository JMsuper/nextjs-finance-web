interface IFinanceInfoDialogToolTip {
  [key: string]: string;
}

const FinanceInfoDialogToolTip: IFinanceInfoDialogToolTip = {
  fsDiv:
    '연결재무제표는 지배회사와 그 종속회사들을 하나의 경제적 실체로 보고 작성한 재무제표입니다. 개별재무제표는 각 회사별로 작성된 재무제표를 말합니다.',
  currentAsset:
    '1년 내에 현금화될 수 있는 자산으로, 현금, 예금, 주식, 사채 등 유가증권을 말합니다. 유동성과 안정성을 갖추고 있으며, 거래동기, 예비적 동기, 투기적 동기에 따라 현금통화, 예금, 주식, 사채 등으로 구분됩니다.',
  nonCurrentAsset:
    '1년 이상의 장기간 동안 기업 내에 체류하는 자산으로, 투자자산, 유형자산, 무형자산, 기타 비유동자산으로 구분됩니다.',
  totalAsset:
    '기업이 보유한 모든 자산의 합계를 말합니다. 유동자산과 비유동자산을 모두 포함하여 계산됩니다. 자산은 경제적 가치가 있는 재화로, 돈, 부동산, 주식 등이 해당됩니다.',
  currentLiabilities:
    '1년 이내에 상환해야 하는 부채를 말합니다. 단기차입금, 매입채무, 선수금 등이 포함됩니다.',
  nonLiabilities:
    '1년 이후에 상환해야 하는 장기 부채를 말합니다. 장기차입금, 사채 등이 이에 해당됩니다. 비유동부채는 기업의 장기적인 재무 안정성을 평가하는 데 중요한 지표가 됩니다.',
  totalLiabilities:
    '기업이 외부에 지급해야 할 총 부채액을 말합니다. 유동부채와 비유동부채의 합으로 계산되며, 기업의 재무 건전성을 평가하는 데 중요한 지표 중 하나입니다.',
  capital:
    '기업의 자산에서 부채를 제외한 나머지 금액으로, 기업 소유주나 주주들의 순자산 가치를 나타냅니다. 자본은 기업이 경영 활동을 통해 축적한 순자산의 총액을 의미하며, 경제학적으로는 생산 활동에 사용되는 자원의 가치를 말합니다. ',
  retainedEarnings:
    '기업이 벌어들인 순이익 중에서 배당금 등으로 지급되지 않고 기업 내에 유보되어 있는 금액을 말합니다. 이익잉여금은 기업의 재투자, 부채 상환, 미래 위험 대비 등에 사용될 수 있으며, 기업의 재무 건전성과 성장 가능성을 나타내는 중요한 지표입니다.',
  totalCapital:
    '기업의 총 자본금액을 말하며, 주식자본과 이익잉여금 등을 포함한 금액입니다. 자본총계는 기업의 재무 상태표에서 자본의 총액을 나타내며, 기업의 순자산 가치를 평가하는 데 사용됩니다.',
  revenue:
    '제품이나 서비스를 판매하여 얻은 총 수익을 의미합니다. 기업의 규모와 전반적인 판매 성과를 나타내는 중요한 지표입니다.',
  operatingProfit:
    '기업의 주요 영업 활동으로 발생한 이익을 말하며, 매출액에서 매출원가와 판매비 및 관리비를 제외한 금액입니다. 기업의 핵심 사업 활동의 수익성을 평가하는 데 사용됩니다.',
  earningsBeforeTax:
    '기업이 법인세를 제외하고 얻은 순이익을 의미합니다. 영업이익과 영업외 수익을 합한 후, 영업외 비용을 제외한 금액입니다. 이는 기업이 실제로 얼마나 이익을 냈는지를 보여주는 지표로, 세금 계산 전의 순수익을 나타내며, 주주들에게 배당금으로 지급되거나 기업 내부에서 재투자될 수 있습니다. ',
  netIncome:
    '기업이 한 회계 기간 동안 벌어들인 순이익으로, 법인세 등의 세금을 제외한 후 남는 순수익을 말합니다. 기업의 순수한 이익을 나타내며, 주주들에게 배당금으로 지급되거나 기업 내부에서 재투자될 수 있습니다.',
  netLoss:
    '당기순이익과 유사한 개념으로, 기업이 한 회계 기간 동안 얻은 순이익이 손실인 경우를 포함하여 사용되는 용어입니다. 이익이 발생했을 때는 당기순이익으로, 손실이 발생했을 때는 당기순손실로 표현됩니다.',
};

export default FinanceInfoDialogToolTip;