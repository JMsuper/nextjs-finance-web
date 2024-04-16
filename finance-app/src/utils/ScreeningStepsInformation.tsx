import { Box, Divider, List, ListItem, Typography } from '@mui/material';

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
          표의 좌측상단에 있는 박스를 클릭하면 <strong>전체 종목을 선택</strong>
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
      <Box>
        <Typography variant="body1" color="initial" sx={{ pb: '12px' }}>
          📐계산공식 : 주당순자산가치 = 자본총계 / 총방행주식수
        </Typography>
        <Typography variant="body1" color="initial">
          현재의 주당순자산가치(BPS, Book Value Per Share)를 확인합니다.
        </Typography>
        <Divider
          sx={{
            padding: '10px 0',
          }}
        />
        <List>
          <ListItem>
            🧾 BPS(주당순자산)의 정의 BPS는 기업의 순자산을 총 발행 주식 수로
            나눈 값으로, 기업의 자산에서 부채를 뺀 순자산을 주식 수로 나눈
            것입니다. 기업의 청산 시 주주 1인당 받을 수 있는 금액을 나타내는
            지표입니다.
          </ListItem>
          <ListItem>
            🧾 BPS는 기업의 순자산을 주식 수로 나누어 계산하므로, 기업의 자산
            가치와 부채 수준을 반영하는 지표라고 할 수 있습니다. 가치투자에서
            BPS의 의미 가치투자에서 BPS는 기업의 내재가치를 평가하는 중요한 지표
            중 하나입니다.
          </ListItem>
          <ListItem>
            🧾 BPS가 높다는 것은 기업의 순자산 가치가 크다는 것을 의미하므로,
            기업의 청산 가치가 높다고 볼 수 있습니다. 따라서 BPS가 높은 기업은
            저평가되어 있을 가능성이 크므로, 가치투자자들은 BPS를 중요한 지표로
            활용합니다. 다만 BPS는 역사적 원가를 기반으로 계산되므로, 시장
            가치와 차이가 날 수 있다는 한계가 있습니다.
          </ListItem>
        </List>
      </Box>
    ),
  },
  {
    step: 2,
    title: '3단계 : 미래수익률 예측',
    description: (
      <Box>
        <Typography variant="body1" color="initial" sx={{ pb: '12px' }}>
          📐계산공식 : ROE = 금년 순이익 / 전년도 순자산
        </Typography>
        <Typography variant="body1" color="initial">
          과거 3개년 ROE 평균을, 향후 10년간의 예상 ROE 수치의 기준으로
          활용합니다. 미래가치를 측정하기 위한 단계로, 미래 ROE수익률을 예측하기
          위함입니다.
        </Typography>
        <Divider
          sx={{
            padding: '10px 0',
          }}
        />
        <List>
          가치투자에서 ROE는 다음과 같은 의미를 가집니다
          <ListItem>
            🧾 수익성 지표: ROE는 기업의 수익성을 나타내는 대표적인 지표로, 높은
            ROE는 기업의 수익성이 좋다는 것을 의미합니다.
          </ListItem>
          <ListItem>
            🧾 성장성 지표: ROE가 높다는 것은 기업이 자기자본을 효율적으로
            활용하여 이익을 창출하고 있다는 것을 의미하므로, 기업의 성장
            잠재력이 높다고 볼 수 있습니다.
          </ListItem>
          <ListItem>
            🧾 투자 매력도: 워렌 버핏 등 유명 투자자들은 ROE가 15% 이상인 기업을
            매력적인 투자 대상으로 여깁니다. 이는 ROE가 높은 기업이 장기적으로
            안정적인 수익을 창출할 가능성이 높기 때문입니다.
          </ListItem>
          <ListItem>
            🧾 주의 필요: 다만 ROE가 지나치게 높거나 일회성 요인으로 인해 높게
            나타나는 경우에는 주의가 필요합니다. 이는 지속 가능성에 대한 의문이
            제기될 수 있기 때문입니다.
          </ListItem>
        </List>
      </Box>
    ),
  },
  {
    step: 3,
    title: '4단계 : 미래가치 산정',
    description: (
      <Box>
        <Typography variant="body1" color="initial" sx={{ pb: '12px' }}>
          📐계산공식 : 10년 후 주당순자산가치 = 현재 주당순자산가치 * (1 + 예상
          ROE)^10
        </Typography>
        <Typography variant="body1" color="initial">
          현재 주당순자산가치(BPS)에서 미래 예상ROE를 적용하여, 미래
          주당순자산가치를 산정합니다. 미래 주당순자산가치(예측BPS)는
          기대수익률을 산정하는데 사용됩니다.
        </Typography>
        <Divider
          sx={{
            padding: '10px 0',
          }}
        />
        <List>
          <ListItem>
            🧾 가치투자에서 '10년 후 주당순자산가치(BPS)'를 예측하는 것은 투자
            대상 기업의 장기적인 가치를 평가하는 중요한 방법 중 하나입니다. 이는
            기업의 현재 순자산가치에 기대되는 수익률(ROE)을 적용하여 미래의
            순자산가치를 계산하는 과정을 포함합니다.
          </ListItem>
          <ListItem>
            🧾 가치투자는 기업의 장기적인 성장 가능성과 내재가치를 중시하는 투자
            방식입니다. '10년 후 주당순자산가치'를 예측하는 것은 이러한
            가치투자의 핵심 원칙 중 하나로, 투자자가 기업의 미래 가치를 평가하고
            장기적인 투자 결정을 내리는 데 도움을 줍니다
          </ListItem>
        </List>
      </Box>
    ),
  },
  {
    step: 4,
    title: '5단계 : 기대수익률 산정',
    description: (
      <Box>
        <Typography variant="body1" color="initial" sx={{ pb: '12px' }}>
          📐계산공식 : 기대수익률 = (10√(10년 후 주당순자산가치 / 현재 주가)) -
          1
        </Typography>
        <Typography variant="body1" color="initial">
          미래 주당순자산가치에 현재 주가를 대입해 기대수익률을 산정합니다.산
          정된 기대수익률이 연 목표수익률을 초과한다면, 매수를 고려하고, 그렇지
          않다면 매도를 고려합니다.
        </Typography>
        <Divider
          sx={{
            padding: '10px 0',
          }}
        />
        <List>
          <ListItem>
            🧾 가치투자에서 '기대수익률'을 계산하는 것은 투자 결정을 내리는 데
            있어 중요한 도구로, 가능한 이익과 손실을 고려하여 정보에 기반한 투자
            결정을 내리는 데 도움을 줍니다. 기대수익률 계산은 투자 위험을
            평가하고 다양한 투자의 기대수익률을 비교하는 데 사용됩니다. 이
            계산은 추정치를 제공하며 미래를 100% 정확하게 예측할 수는 없다는
            점을 유의해야 합니다.
          </ListItem>
          <ListItem>
            🧾 가치투자에서 '기대수익률'을 계산하는 것은 투자자가 장기적인
            관점에서 투자의 가치를 평가하고, 위험을 관리하며, 투자 결정을 내리는
            데 중요한 역할을 합니다.
          </ListItem>
        </List>
      </Box>
    ),
  },
  {
    step: 5,
    title: '6단계 : 종목 선정',
    description: (
      <Box>
        <Typography variant="body1" color="initial" sx={{ pb: '12px' }}>
          🙂 모든 단계를 완료하였습니다. '종목 선정 조건 설정'을 통해, 투자하기
          적합한 종목을 필터링할 수 있습니다. 저장 버튼을 클릭하여, 원하는
          종목을 팔로업하세요.
        </Typography>
        <Divider
          sx={{
            padding: '10px 0',
          }}
        />
        <List>
          <ListItem>
            🧾 금상첨화형 눈덩이주식
            <br />
            가치투자의 관점에서 최고의 투자 대상을 의미합니다. 이는 높은
            수익률을 지속적으로 제공하며, 시간이 지남에 따라 그 가치가
            눈덩이처럼 커지는 주식을 말합니다.
          </ListItem>
          <ListItem>
            🧾 벤저민 그레이엄형 눈덩이주식 <br />
            벤저민 그레이엄은 가치투자의 아버지로 불리며, 그의 투자 철학은
            저평가된 주식을 발견하고, 시장의 비합리성으로 인해 발생하는 가격과
            가치의 차이에서 이익을 얻는 것에 중점을 둡니다. 벤저민 그레이엄형
            눈덩이주식은 이러한 접근 방식을 따르는 주식을 의미하며, 시간이
            지남에 따라 그 가치가 점점 증가하는 주식을 말합니다.
          </ListItem>
          <ListItem>
            🧾 필립 피셔형 눈덩이주식 <br />
            필립 피셔는 품질이 뛰어난 성장주에 투자하는 것을 선호하는
            투자가입니다. 그의 접근 방식은 기업의 관리 품질, 연구개발 투자, 시장
            지배력 등을 중시합니다. 필립 피셔형 눈덩이주식은 이러한 특성을 갖춘
            기업의 주식을 의미하며, 장기적으로 높은 성장률을 보이는 주식을
            지칭합니다.
          </ListItem>
        </List>
      </Box>
    ),
  },
];

export default ScreeningStepsInformation;
