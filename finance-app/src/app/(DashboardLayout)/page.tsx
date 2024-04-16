'use client';

import { Box, List, ListItem, Typography } from '@mui/material';
import PageContainer from '@/containers/PageContainer';
import DashboardCard from './components/shared/DashboardCard';

const Dashboard: React.FC = () => (
  <PageContainer title="Dashboard" description="this is Dashboard">
    <DashboardCard title="서비스 소개">
      <Typography variant="body1" color="initial">
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>눈덩이 주식</strong> 서비스는 사용자가 주식 시장을 보다
            효율적으로 탐색하고, 정보를 얻으며, 투자 결정을 내리는 데 도움을
            주기 위해 다음과 같은 기능들을 제공합니다.
          </Typography>
          <List>
            <ListItem>
              <Typography variant="body1">
                <strong>주식 상장사 검색</strong>(개발 완료) : 이 기능을 통해
                사용자는 특정 키워드를 입력하여 관련 주식 회사들을 찾아볼 수
                있습니다. 사용자가 원하는 회사를 쉽게 찾을 수 있도록, 검색
                결과는 명확하고 이해하기 쉬운 리스트 형태로 제공됩니다.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                <strong>종목 스크리닝</strong>(개발 완료) : 6단계의 스크리닝
                프로세스를 통해, 눈덩이 주식을 찾기 위한 과정을 직접 경험하고,
                가치투자 기준을 사용하여 종목을 필터링할 수 있는 기능입니다.
                사용자는 자신의 투자 기준에 맞춰 조건을 설정하고, 해당 조건에
                부합하는 종목들을 찾아볼 수 있습니다. 이를 통해 보다 장기적으로
                투자하기 위한 종목을 필터링할 수 있습니다.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                <strong>매수/매도 알리미</strong>(진행중) : 사용자가 설정한
                목표가에 도달했을 때 매수 또는 매도 신호를 알려주는 기능입니다.
                이를 통해 사용자는 시장의 변동성을 놓치지 않고, 적절한 타이밍에
                투자 결정을 내릴 수 있습니다.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body1">
                <strong>종목 정보 구독</strong>(진행중) : 관심 있는 종목의 최신
                정보(공시, 가격 변동 등)를 구독하고, 이를 메일로 알림 받을 수
                있는 기능입니다. 사용자는 이를 통해 자신이 관심 있는 종목의
                중요한 변화를 실시간으로 파악하고, 빠르게 대응할 수 있습니다.
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body1">
            이 서비스들은 사용자가 주식 시장에서 보다 정보에 기반한 결정을
            내리고, 성공적인 투자 경험을 할 수 있도록 설계되었습니다.
          </Typography>
        </Box>
      </Typography>
    </DashboardCard>
  </PageContainer>
);

export default Dashboard;
