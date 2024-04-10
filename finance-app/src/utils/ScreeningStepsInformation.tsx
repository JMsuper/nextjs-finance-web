interface IScreeningStepsInformation {
  step: number;
  title: string;
  description: React.ReactNode;
}

const ScreeningStepsInformation: IScreeningStepsInformation[] = [
  {
    step: 0,
    title: '1단계 : 대상종목 선정',

    description: (
      <div>
        <p>
          <strong>기대수익률</strong>을 확인하고 싶은 종목을 선택해주세요.
        </p>
        <p>
          표의 우측상단에 있는 박스를 클릭하면 <strong>전체 종목을 선택</strong>
          할 수 있습니다.
        </p>
        <p>
          종목을 선택이후, 하단의 &apos;다음&apos; 버튼을 클릭하여 2단계로
          넘어갑니다.
        </p>
      </div>
    ),
  },
  {
    step: 1,
    title: '2단계 : 현재가치 확인',
    description: (
      <div>
        <p>현재의 주당순자산가치(BPS, Book Value Per Share)를 확인합니다.</p>
        <p>
          <strong>주당순자산가치</strong>는 기업의 순자산을 총발행주식수로 나눈
          값입니다.
        </p>
        <p>계산공식 : 주당순자산가치 = 자본총계 / 총방행주식수</p>
      </div>
    ),
  },
  {
    step: 2,
    title: '3단계 : 미래수익률 예측',
    description: (
      <div>
        <p>
          <strong>미래가치</strong>를 측정하기 위한, 미래 ROE수익률을
          예측합니다.
        </p>
        <p>
          <strong>과거 3개년 ROE 평균</strong>을, 향후 10년간의 예상 ROE 수치의
          기준으로 활용합니다.
        </p>
        <p>계산공식 : ROE = 금년 순이익 / 전년도 순자산</p>
      </div>
    ),
  },
  {
    step: 3,
    title: '4단계 : 미래가치 산정',
    description: (
      <div>
        <p>
          현재 주당순자산가치(BPS)에서 미래 예상ROE를 적용하여, <br />
          미래 주당순자산가치를 산정합니다.
        </p>
        <p>
          미래 주당순자산가치(예측BPS)는 기대수익률을 산정하는데 사용됩니다.
        </p>
        <p>
          계산공식 : 10년 후 주당순자산가치 = 현재 주당순자산가치 * (1 + 예상
          ROE)^10
        </p>
      </div>
    ),
  },
  {
    step: 4,
    title: '5단계 : 기대수익률 산정',
    description: (
      <div>
        <p>
          미래 주당순자산가치에 현재의 주가를 대입해 기대수익률을 산정합니다.
        </p>
        <p>
          산정된 기대수익률이 연 목표수익률을 초과한다면, 매수를 고려하고,
          그렇지 않다면 매도를 고려합니다.
        </p>
        <p>기대수익률 = (10√(10년 후 주당순자산가치 / 현재의 주가)) - 1</p>
      </div>
    ),
  },
  {
    step: 5,
    title: '6단계 : 종목 선정',
    description: (
      <div>
        <p>
          <strong>미래가치</strong>를 측정하기 위한, 미래 ROE수익률을
          예측합니다.
        </p>
        <p>
          <strong>과거 3개년 ROE 평균</strong>을, 향후 10년간의 예상 ROE 수치의
          기준으로 활용합니다.
        </p>
        <p>계산공식 : ROE = 금년 순이익 / 전년도 순자산</p>
      </div>
    ),
  },
];

export default ScreeningStepsInformation;
